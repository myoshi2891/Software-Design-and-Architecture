import { describe, expect, test } from 'bun:test';
import { buildCurlArgs } from './verify-links';

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
