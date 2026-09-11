import { describe, expect, test } from 'bun:test';
import {
  buildCurlArgs,
  isRetryableStatus,
  parseDurationSeconds,
  retryDelaySeconds,
} from './verify-links';

describe('buildCurlArgs', () => {
  const url = 'https://example.test/page';

  test('HEAD リクエストは -X HEAD ではなく --head を使う', () => {
    const args = buildCurlArgs(url, 10, 'HEAD');

    // `-X HEAD` は curl がボディを待ち続け --max-time まで到達するため
    // exit 28（タイムアウト）の偽陽性を生む
    expect(args).toContain('--head');
    expect(args).not.toContain('-X');
  });

  test('GET リクエストでは --head を付けない', () => {
    const args = buildCurlArgs(url, 10, 'GET');

    expect(args).not.toContain('--head');
    expect(args.at(-1)).toBe(url);
  });

  test('User-Agent は WAF にボット判定されない現行世代のブラウザを名乗る', () => {
    const args = buildCurlArgs(url, 10, 'GET');
    const userAgent = args[args.indexOf('-A') + 1];

    const chromeMajor = Number(userAgent.match(/Chrome\/(\d+)/)?.[1] ?? 0);
    expect(chromeMajor).toBeGreaterThanOrEqual(131);
  });

  test('タイムアウト秒数が --max-time に反映される', () => {
    const args = buildCurlArgs(url, 7, 'GET');

    expect(args[args.indexOf('--max-time') + 1]).toBe('7');
  });
});

describe('parseDurationSeconds', () => {
  test('"10s" 形式を秒数に変換する', () => {
    expect(parseDurationSeconds('10s', 5)).toBe(10);
  });

  test('数値はそのまま秒数として扱う', () => {
    expect(parseDurationSeconds(3, 5)).toBe(3);
  });

  test('解釈できない値はフォールバックを返す', () => {
    expect(parseDurationSeconds(undefined, 5)).toBe(5);
    expect(parseDurationSeconds('abc', 5)).toBe(5);
    expect(parseDurationSeconds(-1, 5)).toBe(5);
  });
});

describe('isRetryableStatus', () => {
  // CI ランナー IP からの並列アクセスで Read the Docs 等が 429 を返すため、
  // 恒久的なリンク切れと区別して再試行する
  test('429 は retryOn429 が有効なら再試行対象', () => {
    expect(isRetryableStatus(429, true)).toBe(true);
  });

  test('429 でも retryOn429 が無効なら再試行しない', () => {
    expect(isRetryableStatus(429, false)).toBe(false);
  });

  test('404 のような恒久的エラーは再試行しない', () => {
    expect(isRetryableStatus(404, true)).toBe(false);
    expect(isRetryableStatus(200, true)).toBe(false);
  });
});

describe('retryDelaySeconds', () => {
  test('試行回数に応じて待機時間を線形に伸ばす', () => {
    expect(retryDelaySeconds(1, 10)).toBe(10);
    expect(retryDelaySeconds(2, 10)).toBe(20);
  });
});
