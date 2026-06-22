import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';

interface IgnorePattern {
  pattern: string;
}

const configPath = path.resolve(import.meta.dirname || '', '../.markdown-link-check.json');
let ignoreRegexes: RegExp[] = [];

if (fs.existsSync(configPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    if (config.ignorePatterns && Array.isArray(config.ignorePatterns)) {
      ignoreRegexes = config.ignorePatterns.map((item: IgnorePattern) => new RegExp(item.pattern));
    }
  } catch (e) {
    console.error('Failed to parse config file:', e);
  }
}

/**
 * URLが無視パターンにマッチするか判定する
 */
function shouldIgnore(url: string): boolean {
  return ignoreRegexes.some((regex) => regex.test(url));
}

/**
 * MarkdownコンテンツからURLを抽出する（コードブロック内は除外）
 */
function extractUrls(content: string): string[] {
  // 1. 複数行コードブロック (``` ... ```) を除外
  let cleanContent = content.replace(/```[\s\S]*?```/g, '');

  // 2. インラインコードブロック (`...`) を除外
  cleanContent = cleanContent.replace(/`[^`\n]*`/g, '');

  // 3. URLとして有効な文字セットのみにマッチさせる正規表現
  const urlRegex = /https?:\/\/[a-zA-Z0-9.\-_~%!$&'()*+,;=:@/]+(?:\?[a-zA-Z0-9.\-_~%!$&'()*+,;=:@/?#]*)?/g;

  const urls: string[] = [];
  let match;
  while ((match = urlRegex.exec(cleanContent)) !== null) {
    let url = match[0];
    url = url.replace(/[|`\]\s]+$/, '');
    if (url.endsWith('.') || url.endsWith(',') || url.endsWith(')')) {
      const openCount = (url.match(/\(/g) || []).length;
      const closeCount = (url.match(/\)/g) || []).length;
      if (closeCount > openCount) {
        url = url.replace(/[.,\)]+$/, '');
      }
    }
    urls.push(url);
  }
  return Array.from(new Set(urls));
}

/**
 * curlを使用してURLのステータスを確認する
 * BunのネイティブfetchはTLS/HTTP2ネゴシエーションで Malformed_HTTP_Response を返すことがあるため、
 * curlを使うことでその問題を回避する。
 */
function verifyUrl(url: string, timeoutSec: number = 15): { ok: boolean; status: number; error?: string } {
  const userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  const commonArgs = [
    '-s',
    '-L',
    '-o', '/dev/null',
    '-w', '%{http_code}',
    '--max-time', String(timeoutSec),
    '--http1.1',
    '-A', userAgent,
    '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  ];

  // まず HEAD リクエストで試みる
  const headResult = spawnSync(
    'curl',
    [
      ...commonArgs,
      '-X', 'HEAD',
      url,
    ],
    { encoding: 'utf-8', timeout: (timeoutSec + 5) * 1000 }
  );

  if (headResult.error) {
    // curlコマンド自体が実行できなかった場合
    return { ok: false, status: 0, error: `curl error: ${headResult.error.message}` };
  }

  const headStatus = parseInt(headResult.stdout.trim(), 10);

  // HEAD が成功 (2xx or 3xx) なら OK
  if (!isNaN(headStatus) && headStatus >= 200 && headStatus < 400) {
    return { ok: true, status: headStatus };
  }

  // HEAD が失敗 (405 Method Not Allowed 含む) の場合は GET で再試行
  const getResult = spawnSync(
    'curl',
    [
      ...commonArgs,
      url,
    ],
    { encoding: 'utf-8', timeout: (timeoutSec + 5) * 1000 }
  );

  if (getResult.error) {
    return { ok: false, status: 0, error: `curl error: ${getResult.error.message}` };
  }

  const getStatus = parseInt(getResult.stdout.trim(), 10);

  if (isNaN(getStatus) || getStatus === 0) {
    return { ok: false, status: 0, error: 'curl returned status 0 (connection failed or timeout)' };
  }

  const ok = getStatus >= 200 && getStatus < 400;
  return { ok, status: getStatus };
}

/**
 * リポジトリ内のすべてのMarkdownファイルをスキャンしてリンクを検証する
 */
async function run(): Promise<void> {
  const files: string[] = [];
  const allFiles = fs.readdirSync('.', { recursive: true }) as string[];
  for (const file of allFiles) {
    if (file.endsWith('.md') || file.endsWith('.html')) {
      if (file.startsWith('node_modules/') || file.includes('/node_modules/')) continue;
      const fullPath = path.resolve('.', file);
      if (fs.statSync(fullPath).isFile()) {
        files.push(file);
      }
    }
  }

  const isDryRun = process.argv.includes('--dry-run');
  let hasErrors = false;
  const allDeadLinks: { file: string; errorDetails: string[] }[] = [];

  for (const file of files) {
    console.log(`>>> START: ${file}`);
    const content = fs.readFileSync(file, 'utf-8');
    const urls = extractUrls(content);
    const checkedUrls: string[] = [];
    const deadLinks: string[] = [];

    for (const url of urls) {
      if (shouldIgnore(url)) {
        console.log(`  Ignore: ${url}`);
        continue;
      }
      checkedUrls.push(url);
      if (isDryRun) {
        console.log(`    Link: ${url} -> skipped (dry-run)`);
      } else {
        console.log(`  Checking: ${url} ...`);
        const result = verifyUrl(url);
        if (result.ok) {
          console.log(`    Link: ${url} -> ok (${result.status})`);
        } else {
          const errorMsg = result.error ? ` (${result.error})` : '';
          console.log(`    Link: ${url} -> dead/error [Status: ${result.status}]${errorMsg}`);
          deadLinks.push(`${url} [Status: ${result.status}]${errorMsg}`);
        }
      }
    }

    if (deadLinks.length > 0) {
      console.error(`Error checking ${file}: Dead links found: ${deadLinks.join(', ')}`);
      hasErrors = true;
      allDeadLinks.push({ file, errorDetails: deadLinks });
    } else {
      console.log(`>>> SUCCESS: ${file} (checked ${checkedUrls.length} links)`);
    }
  }

  // エラーレポートをファイルに書き出す
  if (allDeadLinks.length > 0) {
    const logContent = allDeadLinks
      .map((item) => {
        return `File: ${item.file}\n` + item.errorDetails.map((err) => `  - ${err}`).join('\n');
      })
      .join('\n\n');
    fs.writeFileSync('./link-check-errors.log', logContent, 'utf-8');
    console.log('\n>>> Detailed error log written to ./link-check-errors.log');
  } else {
    if (fs.existsSync('./link-check-errors.log')) {
      fs.unlinkSync('./link-check-errors.log');
    }
  }

  if (hasErrors) {
    throw new Error('Dead links found in one or more files.');
  }
}

run().catch((err: Error) => {
  console.error('Link check failed:', err.message);
  process.exit(1);
});
