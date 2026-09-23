import { describe, expect, test } from 'bun:test';
import {
  buildCurlArgs,
  isRetryableStatus,
  MAX_RETRY_COUNT,
  MAX_RETRY_DELAY_SEC,
  parseDurationSeconds,
  parseRetryCount,
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
    expect(chromeMajor).toBeGreaterThanOrEqual(153);
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

  // 設定ファイルの巨大値がそのまま待機秒数になると、リンクチェックが
  // 事実上停止する。安全整数でない値・上限超過値はフォールバックへ倒す。
  test('安全整数の範囲外・上限超過の待機秒数はフォールバックを返す', () => {
    expect(parseDurationSeconds(MAX_RETRY_DELAY_SEC, 5)).toBe(MAX_RETRY_DELAY_SEC);
    expect(parseDurationSeconds(MAX_RETRY_DELAY_SEC + 1, 5)).toBe(5);
    expect(parseDurationSeconds('1m', 5)).toBe(60);
    expect(parseDurationSeconds(1e21, 5)).toBe(5);
    expect(parseDurationSeconds('99999s', 5)).toBe(5);
  });
});

describe('parseRetryCount', () => {
  // retryCount は「回数」であり期間ではない。期間パーサを流用すると
  // "1m" が 60 回、"500ms" が 0 回として解釈され、設定と挙動が乖離する。
  test('非負整数はそのまま回数として扱う', () => {
    expect(parseRetryCount(3, 2)).toBe(3);
    expect(parseRetryCount('3', 2)).toBe(3);
  });

  test('0 は「再試行しない」という有効な指定として尊重する', () => {
    expect(parseRetryCount(0, 2)).toBe(0);
    expect(parseRetryCount('0', 2)).toBe(0);
  });

  test('期間表記は回数として解釈せずフォールバックを返す', () => {
    expect(parseRetryCount('1m', 2)).toBe(2);
    expect(parseRetryCount('500ms', 2)).toBe(2);
    expect(parseRetryCount('10s', 2)).toBe(2);
  });

  test('負数・小数・非有限値・非対応型はフォールバックを返す', () => {
    expect(parseRetryCount(-1, 2)).toBe(2);
    expect(parseRetryCount(1.5, 2)).toBe(2);
    expect(parseRetryCount(Number.POSITIVE_INFINITY, 2)).toBe(2);
    expect(parseRetryCount(undefined, 2)).toBe(2);
    expect(parseRetryCount('abc', 2)).toBe(2);
    expect(parseRetryCount(null, 2)).toBe(2);
  });

  // Number.isInteger は 1e21 を整数と判定するため、それだけでは
  // 「実質無限ループする再試行回数」を通してしまう。安全整数 + 上限で弾く。
  test('安全整数の範囲外・上限超過の回数はフォールバックを返す', () => {
    expect(parseRetryCount(MAX_RETRY_COUNT, 2)).toBe(MAX_RETRY_COUNT);
    expect(parseRetryCount(MAX_RETRY_COUNT + 1, 2)).toBe(2);
    expect(parseRetryCount(String(MAX_RETRY_COUNT + 1), 2)).toBe(2);
    expect(parseRetryCount(1e21, 2)).toBe(2);
    expect(parseRetryCount(Number.MAX_SAFE_INTEGER + 2, 2)).toBe(2);
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

  // curl のタイムアウト・接続失敗は status 0 で表現される。
  // GitHub 等の応答遅延による偽陽性を避けるため、retryOn429 の設定に依らず再試行する
  test('status 0 でタイムアウト（exit 28）・接続失敗（exit 7）は再試行対象', () => {
    expect(isRetryableStatus(0, true, 28)).toBe(true);
    expect(isRetryableStatus(0, false, 28)).toBe(true);
    expect(isRetryableStatus(0, false, 7)).toBe(true);
    expect(isRetryableStatus(0, false, 56)).toBe(true);
  });

  // 証明書検証失敗は時間を置いても解消しないため、待機時間を浪費せず即座に失敗させる
  test('status 0 でも証明書検証失敗（exit 60）は再試行しない', () => {
    expect(isRetryableStatus(0, true, 60)).toBe(false);
  });

  test('status 0 で curl 終了コードが不明なら再試行しない', () => {
    expect(isRetryableStatus(0, true)).toBe(false);
  });

  test('5xx のような一時的サーバーエラーは再試行対象', () => {
    expect(isRetryableStatus(502, false)).toBe(true);
    expect(isRetryableStatus(503, false)).toBe(true);
  });
});

describe('retryDelaySeconds', () => {
  test('試行回数に応じて待機時間を線形に伸ばす', () => {
    expect(retryDelaySeconds(1, 10)).toBe(10);
    expect(retryDelaySeconds(2, 10)).toBe(20);
  });
});
