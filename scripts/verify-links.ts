import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

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
function extractUrlsFromMarkdown(content: string): string[] {
  // 1. 複数行コードブロック (``` ... ```) を除外
  let cleanContent = content.replace(/```[\s\S]*?```/g, '');

  // 2. インラインコードブロック (`...`) を除外
  cleanContent = cleanContent.replace(/`[^`\n]*`/g, '');

  return extractRawUrls(cleanContent);
}

/**
 * HTMLコンテンツからURLを抽出する（<script>, <style>ブロック内は除外）
 */
function extractUrlsFromHtml(content: string): string[] {
  // <script> ブロック内を除外（DIAGRAMSオブジェクトやJSコードのURL含む）
  let cleanContent = content.replace(/<script[\s\S]*?<\/script>/gi, '');

  // <style> ブロック内を除外
  cleanContent = cleanContent.replace(/<style[\s\S]*?<\/style>/gi, '');

  return extractRawUrls(cleanContent);
}

/**
 * テキストからURLを抽出する共通処理
 */
function extractRawUrls(text: string): string[] {
  const urlRegex = /https?:\/\/[a-zA-Z0-9.\-_~%!$&'()*+,;=:@/]+(?:\?[a-zA-Z0-9.\-_~%!$&'()*+,;=:@/?#]*)?/g;

  const urls: string[] = [];
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    let url = match[0];
    url = url.replace(/[|`\]\s]+$/, '');
    if (url.endsWith('.') || url.endsWith(',') || url.endsWith(')')) {
      const openCount = (url.match(/\(/g) || []).length;
      const closeCount = (url.match(/\)/g) || []).length;
      if (closeCount > openCount) {
        url = url.replace(/[.,)]+$/, '');
      }
    }
    urls.push(url);
  }
  return Array.from(new Set(urls));
}

/**
 * ファイル種別に応じてURLを抽出する
 */
function extractUrls(file: string, content: string): string[] {
  if (file.endsWith('.html')) {
    return extractUrlsFromHtml(content);
  }
  return extractUrlsFromMarkdown(content);
}

/**
 * curlをPromiseラッパーで非同期実行する
 */
function curlAsync(
  args: string[],
  timeoutSec: number
): Promise<{ stdout: string; error?: Error }> {
  return new Promise((resolve) => {
    const child = spawn('curl', args);
    let stdout = '';
    let stderr = '';

    const timer = setTimeout(() => {
      child.kill();
      resolve({ stdout: '0', error: new Error(`curl timed out after ${timeoutSec}s: ${stderr}`) });
    }, (timeoutSec + 2) * 1000);

    child.stdout.on('data', (d: Buffer) => { stdout += d.toString(); });
    child.stderr.on('data', (d: Buffer) => { stderr += d.toString(); });
    child.on('close', () => {
      clearTimeout(timer);
      resolve({ stdout: stdout.trim() });
    });
    child.on('error', (err: Error) => {
      clearTimeout(timer);
      resolve({ stdout: '0', error: new Error(`${err.message}: ${stderr}`) });
    });
  });
}

/**
 * curlを使用してURLのステータスを非同期で確認する
 */
async function verifyUrl(
  url: string,
  timeoutSec: number = 10
): Promise<{ ok: boolean; status: number; error?: string }> {
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
  const headResult = await curlAsync([...commonArgs, '-X', 'HEAD', url], timeoutSec);

  if (headResult.error) {
    return { ok: false, status: 0, error: `curl error: ${headResult.error.message}` };
  }

  const headStatus = parseInt(headResult.stdout, 10);

  // HEAD が成功 (2xx or 3xx) なら OK
  if (!isNaN(headStatus) && headStatus >= 200 && headStatus < 400) {
    return { ok: true, status: headStatus };
  }

  // HEAD が失敗の場合は GET で再試行
  const getResult = await curlAsync([...commonArgs, url], timeoutSec);

  if (getResult.error) {
    return { ok: false, status: 0, error: `curl error: ${getResult.error.message}` };
  }

  const getStatus = parseInt(getResult.stdout, 10);

  if (isNaN(getStatus) || getStatus === 0) {
    return { ok: false, status: 0, error: 'curl returned status 0 (connection failed or timeout)' };
  }

  const ok = getStatus >= 200 && getStatus < 400;
  return { ok, status: getStatus };
}

/**
 * 並列度を制限して非同期タスクを実行するセマフォユーティリティ
 */
async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let index = 0;

  async function worker(): Promise<void> {
    while (index < tasks.length) {
      const current = index++;
      results[current] = await tasks[current]();
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, worker);
  await Promise.all(workers);
  return results;
}

/**
 * リポジトリ内のすべてのMarkdown・HTMLファイルをスキャンしてリンクを検証する
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
  const CONCURRENCY = 10; // 同時チェック数の上限
  let hasErrors = false;
  const allDeadLinks: { file: string; errorDetails: string[] }[] = [];

  // グローバルURLキャッシュ（複数ファイルに同一URLが出現する場合に重複チェックを省く）
  const urlCache = new Map<string, { ok: boolean; status: number; error?: string }>();

  for (const file of files) {
    console.log(`>>> START: ${file}`);
    const content = fs.readFileSync(file, 'utf-8');
    const urls = extractUrls(file, content).filter((url) => !shouldIgnore(url));
    const deadLinks: string[] = [];

    if (isDryRun) {
      for (const url of urls) {
        console.log(`  Link: ${url} -> skipped (dry-run)`);
      }
      console.log(`>>> DRY-RUN: ${file} (found ${urls.length} links)`);
      continue;
    }

    console.log(`  Checking ${urls.length} URLs (concurrency: ${CONCURRENCY}) ...`);

    const tasks = urls.map((url) => async () => {
      // キャッシュヒット
      if (urlCache.has(url)) {
        const cached = urlCache.get(url)!;
        console.log(`  Cached: ${url} -> ${cached.ok ? 'ok' : 'dead'} (${cached.status})`);
        return { url, result: cached };
      }

      const result = await verifyUrl(url);
      urlCache.set(url, result);

      if (result.ok) {
        console.log(`  OK: ${url} (${result.status})`);
      } else {
        const errorMsg = result.error ? ` (${result.error})` : '';
        console.log(`  DEAD: ${url} [Status: ${result.status}]${errorMsg}`);
      }
      return { url, result };
    });

    const checked = await runWithConcurrency(tasks, CONCURRENCY);

    for (const { url, result } of checked) {
      if (!result.ok) {
        const errorMsg = result.error ? ` (${result.error})` : '';
        deadLinks.push(`${url} [Status: ${result.status}]${errorMsg}`);
      }
    }

    if (deadLinks.length > 0) {
      console.error(`Error checking ${file}: Dead links found: ${deadLinks.join(', ')}`);
      hasErrors = true;
      allDeadLinks.push({ file, errorDetails: deadLinks });
    } else {
      console.log(`>>> SUCCESS: ${file} (checked ${urls.length} links)`);
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
