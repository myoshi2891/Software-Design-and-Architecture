import { describe, expect, test } from 'bun:test';
import {
  evaluateAudit,
  formatCounts,
  formatFindings,
  parseAuditJson,
  parseThreshold,
  type AuditReport,
} from './audit-report.ts';

/**
 * 実際の `bun audit --json` 出力を最小化したフィクスチャ。
 * high（js-yaml）と low（dompurify）を含め、閾値によるフィルタを検証できるようにしている。
 */
const AUDIT_JSON_FIXTURE = JSON.stringify({
  'js-yaml': [
    {
      id: 1123911,
      url: 'https://github.com/advisories/GHSA-52cp-r559-cp3m',
      title: 'js-yaml: YAML merge-key chains can force quadratic CPU consumption',
      severity: 'high',
      vulnerable_versions: '>=4.0.0 <4.3.0',
    },
    {
      id: 1121860,
      url: 'https://github.com/advisories/GHSA-h67p-54hq-rp68',
      title: 'JS-YAML: Quadratic-complexity DoS in merge key handling via repeated aliases',
      severity: 'moderate',
      vulnerable_versions: '>=4.0.0 <=4.1.1',
    },
  ],
  dompurify: [
    {
      id: 1122333,
      url: 'https://github.com/advisories/GHSA-c2j3-45gr-mqc4',
      title: 'DOMPurify: CUSTOM_ELEMENT_HANDLING bypasses afterSanitizeElements',
      severity: 'low',
      vulnerable_versions: '<=3.4.11',
    },
  ],
});

function fixtureReport(): AuditReport {
  const result = parseAuditJson(AUDIT_JSON_FIXTURE);
  if (!result.ok) throw new Error(`フィクスチャの解析に失敗: ${result.error}`);
  return result.value;
}

describe('parseAuditJson', () => {
  test('bun audit の JSON をパッケージ単位のレポートへ変換する', () => {
    // Arrange & Act
    const result = parseAuditJson(AUDIT_JSON_FIXTURE);

    // Assert
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(Object.keys(result.value).sort()).toEqual(['dompurify', 'js-yaml']);
    expect(result.value['js-yaml']).toHaveLength(2);
    expect(result.value.dompurify?.[0]?.severity).toBe('low');
  });

  test('脆弱性ゼロを示す空文字列を空レポートとして扱う', () => {
    // Arrange
    const raw = '   \n';

    // Act
    const result = parseAuditJson(raw);

    // Assert
    expect(result).toEqual({ ok: true, value: {} });
  });

  test('exitCode が非ゼロかつ空文字列の場合はエラーとして返す', () => {
    // Arrange & Act
    const result = parseAuditJson('', { exitCode: 1 });

    // Assert
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain('非ゼロの終了コード (1)');
  });

  test('空オブジェクトの出力を空レポートとして扱う', () => {
    // Arrange & Act
    const result = parseAuditJson('{}');

    // Assert
    expect(result).toEqual({ ok: true, value: {} });
  });

  test('不正な JSON をエラーとして返す', () => {
    // Arrange & Act
    const result = parseAuditJson('{ not json');

    // Assert
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain('JSON の解析に失敗しました');
  });

  test('未知の severity を静かに無視せずエラーとして返す', () => {
    // Arrange
    const raw = JSON.stringify({
      'some-pkg': [
        {
          id: 1,
          url: 'https://example.com/advisory',
          title: 'unknown severity',
          severity: 'catastrophic',
          vulnerable_versions: '<1.0.0',
        },
      ],
    });

    // Act
    const result = parseAuditJson(raw);

    // Assert
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain('未知の severity');
  });

  test('Advisory 一覧が配列でない場合はエラーを返す', () => {
    // Arrange & Act
    const result = parseAuditJson(JSON.stringify({ 'some-pkg': { severity: 'high' } }));

    // Assert
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain('配列ではありません');
  });

  test('必須フィールドが欠けている Advisory はエラーを返す', () => {
    // Arrange
    const raw = JSON.stringify({ 'some-pkg': [{ id: 1, severity: 'high' }] });

    // Act
    const result = parseAuditJson(raw);

    // Assert
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain('url');
  });

  test('トップレベルが配列の出力はエラーを返す', () => {
    // Arrange & Act
    const result = parseAuditJson('[]');

    // Assert
    expect(result.ok).toBe(false);
  });
});

describe('evaluateAudit', () => {
  test('閾値 low ではすべての Advisory を failing に含める', () => {
    // Arrange
    const report = fixtureReport();

    // Act
    const evaluation = evaluateAudit(report, 'low');

    // Assert
    expect(evaluation.total).toBe(3);
    expect(evaluation.failing).toHaveLength(3);
    expect(evaluation.counts).toEqual({ info: 0, low: 1, moderate: 1, high: 1, critical: 0 });
  });

  test('閾値未満の Advisory を failing から除外する（件数集計には残す）', () => {
    // Arrange
    const report = fixtureReport();

    // Act
    const evaluation = evaluateAudit(report, 'high');

    // Assert
    expect(evaluation.failing).toHaveLength(1);
    expect(evaluation.failing[0]?.packageName).toBe('js-yaml');
    expect(evaluation.failing[0]?.advisory.severity).toBe('high');
    expect(evaluation.total).toBe(3);
    expect(evaluation.counts.low).toBe(1);
  });

  test('深刻度の降順に並べる（決定論的な出力）', () => {
    // Arrange
    const report = fixtureReport();

    // Act
    const severities = evaluateAudit(report, 'low').failing.map((f) => f.advisory.severity);

    // Assert
    expect(severities).toEqual(['high', 'moderate', 'low']);
  });

  test('同一深刻度はパッケージ名の昇順に並べる', () => {
    // Arrange
    const report: AuditReport = {
      zeta: [
        { id: 2, url: 'u', title: 't', severity: 'high', vulnerable_versions: '<1' },
      ],
      alpha: [
        { id: 1, url: 'u', title: 't', severity: 'high', vulnerable_versions: '<1' },
      ],
    };

    // Act
    const names = evaluateAudit(report, 'high').failing.map((f) => f.packageName);

    // Assert
    expect(names).toEqual(['alpha', 'zeta']);
  });

  test('脆弱性ゼロのレポートでは failing が空になる', () => {
    // Arrange & Act
    const evaluation = evaluateAudit({}, 'low');

    // Assert
    expect(evaluation.failing).toEqual([]);
    expect(evaluation.total).toBe(0);
  });
});

describe('parseThreshold', () => {
  test('有効な深刻度文字列を受け付ける', () => {
    // Arrange & Act & Assert
    expect(parseThreshold('moderate')).toEqual({ ok: true, value: 'moderate' });
  });

  test('無効な文字列は有効値の一覧を含むエラーにする', () => {
    // Arrange & Act
    const result = parseThreshold('HIGH');

    // Assert
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toContain('critical');
  });
});

describe('formatCounts / formatFindings', () => {
  test('深刻度別件数を深刻な順に 1 行へ整形する', () => {
    // Arrange
    const { counts } = evaluateAudit(fixtureReport(), 'low');

    // Act & Assert
    expect(formatCounts(counts)).toBe('high: 1 / moderate: 1 / low: 1');
  });

  test('脆弱性ゼロのときは「脆弱性なし」を返す', () => {
    // Arrange & Act & Assert
    expect(formatCounts(evaluateAudit({}, 'low').counts)).toBe('脆弱性なし');
  });

  test('findings に severity・パッケージ名・Advisory URL を含める', () => {
    // Arrange
    const { failing } = evaluateAudit(fixtureReport(), 'high');

    // Act
    const output = formatFindings(failing);

    // Assert
    expect(output).toContain('[high] js-yaml');
    expect(output).toContain('https://github.com/advisories/GHSA-52cp-r559-cp3m');
  });

  test('findings が空なら空文字列を返す', () => {
    // Arrange & Act & Assert
    expect(formatFindings([])).toBe('');
  });
});
