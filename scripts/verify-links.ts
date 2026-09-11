import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

interface IgnorePattern {
  pattern: string;
}

/** 再試行の既定値。設定ファイルに記述が無い場合に用いる。 */
const DEFAULT_RETRY_COUNT = 2;
const DEFAULT_RETRY_DELAY_SEC = 10;

interface RetryConfig {
  /** 429 (Too Many Requests) を一時的エラーとして再試行するか */
  retryOn429: boolean;
  /** 最大再試行回数（初回プローブは含まない） */
  retryCount: number;
  /** 再試行の基準待機秒数 */
  retryDelaySec: number;
}

/**
 * "10s" のような期間表記、または数値を秒数へ変換する。
 *
 * @param value - 設定ファイル由来の未検証値
 * @param fallbackSec - 解釈できなかった場合に返す既定秒数
 * @returns 正の秒数
 */
export function parseDurationSeconds(value: unknown, fallbackSec: number): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0 ? value : fallbackSec;
  }
  if (typeof value !== 'string') return fallbackSec;

  const match = value.trim().match(/^(\d+(?:\.\d+)?)\s*(ms|s|m)?$/);
  if (!match) return fallbackSec;

  const amount = Number(match[1]);
  if (!Number.isFinite(amount) || amount <= 0) return fallbackSec;

  const unit = match[2] ?? 's';
  if (unit === 'ms') return amount / 1000;
  if (unit === 'm') return amount * 60;
  return amount;
}

const configPath = path.resolve(import.meta.dirname || '', '../.markdown-link-check.json');
let ignoreRegexes: RegExp[] = [];
let retryConfig: RetryConfig = {
  retryOn429: true,
  retryCount: DEFAULT_RETRY_COUNT,
  retryDelaySec: DEFAULT_RETRY_DELAY_SEC,
};

if (fs.existsSync(configPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    if (config.ignorePatterns && Array.isArray(config.ignorePatterns)) {
      ignoreRegexes = config.ignorePatterns.map((item: IgnorePattern) => new RegExp(item.pattern));
    }
    retryConfig = {
      retryOn429: config.retryOn429 !== false,
      retryCount: Math.max(
        0,
        Math.trunc(parseDurationSeconds(config.retryCount, DEFAULT_RETRY_COUNT))
      ),
      retryDelaySec: parseDurationSeconds(config.fallbackRetryDelay, DEFAULT_RETRY_DELAY_SEC),
    };
  } catch (e) {
    console.error('Failed to parse config file:', e);
  }
}

/**
 * ステータスコードが一時的エラーで、再試行する価値があるかを判定する。
 *
 * CI ランナーの IP から並列アクセスすると Read the Docs 等が 429 を返すため、
 * 恒久的なリンク切れ (404 等) と区別して扱う必要がある。
 *
 * @param status - HTTP ステータスコード
 * @param retryOn429 - 429 を再試行対象とするか
 * @returns 再試行すべきなら true
 */
export function isRetryableStatus(status: number, retryOn429: boolean): boolean {
  return retryOn429 && status === 429;
}

/**
 * 再試行前の待機秒数を求める。試行回数に応じて線形に伸ばす。
 *
 * @param attempt - 1 始まりの再試行番号
 * @param baseSec - 基準待機秒数
 * @returns 待機秒数
 */
export function retryDelaySeconds(attempt: number, baseSec: number): number {
  return baseSec * attempt;
}

/**
 * URLが無視パターンにマッチするか判定する
 */
function shouldIgnore(url: string): boolean {
  return ignoreRegexes.some((regex) => regex.test(url));
}

/**
 * Extracts URLs from Markdown content, excluding code blocks.
 *
 * @param content - The Markdown content to extract URLs from
 * @returns An array of extracted URLs
 */
function extractUrlsFromMarkdown(content: string): string[] {
  // 1. 複数行コードブロック (``` ... ```) を除外
  let cleanContent = content.replace(/```[\s\S]*?```/g, '');

  // 2. インラインコードブロック (`...`) を除外
  cleanContent = cleanContent.replace(/`[^`\n]*`/g, '');

  return extractRawUrls(cleanContent);
}

/**
 * Extracts HTTP and HTTPS URLs from HTML content, excluding script, style, code, and preformatted blocks.
 *
 * @returns An array of extracted URLs.
 */
function extractUrlsFromHtml(content: string): string[] {
  // <script> ブロック内を除外（DIAGRAMSオブジェクトやJSコードのURL含む）
  let cleanContent = content.replace(/<script[\s\S]*?<\/script>/gi, '');

  // <style> ブロック内を除外
  cleanContent = cleanContent.replace(/<style[\s\S]*?<\/style>/gi, '');

  // <code> ブロック内を除外
  cleanContent = cleanContent.replace(/<code[\s\S]*?<\/code>/gi, '');

  // <pre> ブロック内を除外
  cleanContent = cleanContent.replace(/<pre[\s\S]*?<\/pre>/gi, '');

  return extractRawUrls(cleanContent);
}

/**
 * Extracts HTTP and HTTPS URLs from text, cleaning trailing punctuation and deduplicating results.
 *
 * @param text - The text to search for URLs
 * @returns An array of unique URLs found in the text
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
 * Extracts URLs from content, selecting the appropriate parser based on file extension.
 *
 * @param file - The file path
 * @param content - The file content to extract URLs from
 * @returns An array of extracted URLs
 */
function extractUrls(file: string, content: string): string[] {
  if (file.endsWith('.html')) {
    return extractUrlsFromHtml(content);
  }
  return extractUrlsFromMarkdown(content);
}

/**
 * Spawns a curl process and returns its output.
 *
 * @param args - Command-line arguments to pass to curl
 * @param timeoutSec - Maximum execution time in seconds; the process is killed if it exceeds `timeoutSec + 2` seconds
 * @returns An object with the trimmed stdout on success, or an `error` if curl timed out, encountered a process error, or exited with a non-zero code and stdout did not contain a three-digit HTTP status code
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
    child.on('close', (code: number | null) => {
      clearTimeout(timer);
      const trimmedStdout = stdout.trim();
      const hasValidStatus = /^[1-9]\d{2}$/.test(trimmedStdout);
      if (code !== 0 && !hasValidStatus) {
        resolve({
          stdout: '0',
          error: new Error(`curl exited with code ${code ?? 'null'}: ${stderr}`),
        });
        return;
      }
      resolve({ stdout: trimmedStdout });
    });
    child.on('error', (err: Error) => {
      clearTimeout(timer);
      resolve({ stdout: '0', error: new Error(`${err.message}: ${stderr}`) });
    });
  });
}

/**
 * Checks whether a URL responds successfully to an HTTP request.
 *
 * Attempts a `HEAD` request first and falls back to `GET` when necessary. Responses with status codes from 200 through 399 are considered successful.
 *
 * @param url - The URL to verify
 * @param timeoutSec - Maximum request duration in seconds
 * @returns The verification result, including the HTTP status code and an error message when verification fails
 */
/**
 * リンク検証に用いる User-Agent。
 *
 * 一部の WAF（WordPress.com / Automattic 等）は古い UA 文字列をボット判定して 403 を返すため、
 * 現行世代のブラウザ UA を名乗ることで偽陽性を避ける。
 */
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

/**
 * Builds the curl arguments used to verify a single URL.
 *
 * HEAD は `-X HEAD` ではなく `--head` を用いる。`-X HEAD` は curl がレスポンスボディを
 * 待ち続けるため、`Content-Length` を返すサーバーで `--max-time` まで到達し
 * exit 28（タイムアウト）の偽陽性を生む。
 *
 * @param url - The URL to verify
 * @param timeoutSec - Maximum request duration in seconds
 * @param method - HTTP method to use for the probe
 * @returns The curl argument list, with the URL as the final element
 */
export function buildCurlArgs(url: string, timeoutSec: number, method: 'HEAD' | 'GET'): string[] {
  const args = [
    '-s',
    '-L',
    '-o', '/dev/null',
    '-w', '%{http_code}',
    '--max-time', String(timeoutSec),
    '-A', USER_AGENT,
    '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  ];

  if (method === 'HEAD') {
    args.push('--head');
  }

  args.push(url);
  return args;
}

async function probeUrl(
  url: string,
  timeoutSec: number
): Promise<{ ok: boolean; status: number; error?: string }> {
  // まず HEAD リクエストで試みる
  const headResult = await curlAsync(buildCurlArgs(url, timeoutSec, 'HEAD'), timeoutSec);

  if (headResult.error) {
    return { ok: false, status: 0, error: `curl error: ${headResult.error.message}` };
  }

  const headStatus = parseInt(headResult.stdout, 10);

  // HEAD が成功 (2xx or 3xx) なら OK
  if (!isNaN(headStatus) && headStatus >= 200 && headStatus < 400) {
    return { ok: true, status: headStatus };
  }

  // HEAD が失敗の場合は GET で再試行
  const getResult = await curlAsync(buildCurlArgs(url, timeoutSec, 'GET'), timeoutSec);

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
 * 指定秒数だけ待機する。
 */
function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

/**
 * URL の到達性を検証する。一時的なレート制限 (429) は設定に従って再試行する。
 *
 * @param url - 検証対象の URL
 * @param timeoutSec - 1 回のリクエストの最大所要秒数
 * @returns 検証結果。失敗時は HTTP ステータスとエラーメッセージを含む
 */
async function verifyUrl(
  url: string,
  timeoutSec: number = 10
): Promise<{ ok: boolean; status: number; error?: string }> {
  let result = await probeUrl(url, timeoutSec);

  for (let attempt = 1; attempt <= retryConfig.retryCount; attempt++) {
    if (result.ok) return result;
    if (!isRetryableStatus(result.status, retryConfig.retryOn429)) return result;

    const delaySec = retryDelaySeconds(attempt, retryConfig.retryDelaySec);
    console.log(
      `  RETRY (${attempt}/${retryConfig.retryCount}): ${url} [Status: ${result.status}] waiting ${delaySec}s ...`
    );
    await sleep(delaySec);
    result = await probeUrl(url, timeoutSec);
  }

  return result;
}

/**
 * Executes an array of async tasks with limited concurrency.
 *
 * Results are returned in the same order as the input tasks.
 *
 * @param tasks - Array of async task functions to execute
 * @param concurrency - Maximum number of tasks to run in parallel
 * @returns Array of results preserving the original task order
 */
async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let index = 0;

  /**
   * Executes tasks from a shared queue and stores results in their original positions.
   */
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
 * Scans Markdown and HTML files in the repository and verifies all discovered links.
 *
 * Supports a `--dry-run` flag to list links without verification. Caches verification results
 * across files to avoid redundant checks. Writes a detailed error report to `./link-check-errors.log`
 * if dead links are found, and deletes the log file if all links are valid.
 *
 * @throws If dead links are found in one or more files.
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

// テストから import した際にリンクチェック全体が走らないようエントリポイントを保護する
if (import.meta.main) {
  run().catch((err: Error) => {
    console.error('Link check failed:', err.message);
    process.exit(1);
  });
}
