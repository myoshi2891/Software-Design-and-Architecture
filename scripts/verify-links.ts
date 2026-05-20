import * as fs from 'fs';
import * as path from 'path';
import { Glob } from 'bun';

interface IgnorePattern {
  pattern: string;
}

const configPath = path.resolve(import.meta.dir, '../.markdown-link-check.json');
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
 * URLのステータスを確認する（HEADで失敗した場合はGETで再試行、10秒タイムアウト）
 */
async function verifyUrl(url: string, timeoutMs: number = 10000): Promise<{ ok: boolean; status: number; error?: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };

  try {
    let res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const getController = new AbortController();
      const getTimeoutId = setTimeout(() => getController.abort(), timeoutMs);
      try {
        res = await fetch(url, {
          method: 'GET',
          signal: getController.signal,
          headers
        });
        clearTimeout(getTimeoutId);
      } catch (getErr: any) {
        clearTimeout(getTimeoutId);
        return {
          ok: false,
          status: 0,
          error: getErr.name === 'AbortError' ? 'Timeout' : getErr.message
        };
      }
    }

    return {
      ok: res.ok,
      status: res.status
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    // HEAD がthrow（タイムアウト・ネットワークエラー）した場合もGETで再試行
    const getController = new AbortController();
    const getTimeoutId = setTimeout(() => getController.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: 'GET',
        signal: getController.signal,
        headers
      });
      clearTimeout(getTimeoutId);
      return {
        ok: res.ok,
        status: res.status
      };
    } catch (getErr: any) {
      clearTimeout(getTimeoutId);
      return {
        ok: false,
        status: 0,
        error: getErr.name === 'AbortError' ? 'Timeout' : getErr.message
      };
    }
  }
}

/**
 * リポジトリ内のすべてのMarkdownファイルをスキャンしてリンクを検証する
 */
async function run(): Promise<void> {
  const glob = new Glob('**/*.md');
  const files: string[] = [];
  for (const file of glob.scanSync({ cwd: '.', onlyFiles: true })) {
    if (file.startsWith('node_modules/')) continue;
    files.push(file);
  }

  let hasErrors = false;

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
      console.log(`  Checking: ${url} ...`);
      const result = await verifyUrl(url);
      if (result.ok) {
        console.log(`    Link: ${url} -> ok (${result.status})`);
      } else {
        const errorMsg = result.error ? ` (${result.error})` : '';
        console.log(`    Link: ${url} -> dead/error [Status: ${result.status}]${errorMsg}`);
        deadLinks.push(`${url} [Status: ${result.status}]${errorMsg}`);
      }
    }

    if (deadLinks.length > 0) {
      console.error(`Error checking ${file}: Dead links found: ${deadLinks.join(', ')}`);
      hasErrors = true;
    } else {
      console.log(`>>> SUCCESS: ${file} (checked ${checkedUrls.length} links)`);
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
