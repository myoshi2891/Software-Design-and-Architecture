/**
 * `bun audit --json` の出力を評価する純関数群。
 *
 * bun audit の JSON は `{ "<パッケージ名>": Advisory[] }` という形状で、
 * 脆弱性が存在しない場合は空オブジェクトになる。
 * ネットワークアクセスを伴う実行部分（CLI）とは分離し、
 * ここでは副作用を持たない判定ロジックのみを扱う。
 */

/** GitHub Advisory の深刻度。低い順にランク付けして閾値比較に用いる */
export const SEVERITIES = ['info', 'low', 'moderate', 'high', 'critical'] as const;

export type Severity = (typeof SEVERITIES)[number];

/** 深刻度 → ランク（大きいほど深刻） */
const SEVERITY_RANK: Record<Severity, number> = {
  info: 0,
  low: 1,
  moderate: 2,
  high: 3,
  critical: 4,
};

export interface AuditAdvisory {
  id: number;
  url: string;
  title: string;
  severity: Severity;
  vulnerable_versions: string;
}

/** パッケージ名 → そのパッケージに紐づく Advisory 一覧 */
export type AuditReport = Record<string, AuditAdvisory[]>;

export interface Finding {
  packageName: string;
  advisory: AuditAdvisory;
}

export interface AuditEvaluation {
  /** 閾値以上の深刻度を持つ Advisory（深刻度の降順 → パッケージ名の昇順） */
  failing: Finding[];
  /** レポート全体の深刻度別件数（閾値でフィルタしない） */
  counts: Record<Severity, number>;
  /** レポート全体の Advisory 総数 */
  total: number;
}

/** エラーを握りつぶさず呼び出し側へ返すための Result 型 */
export type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

/**
 * Determines whether a value is a recognized audit severity.
 *
 * @param value - The value to validate
 * @returns `true` if the value is a recognized severity, `false` otherwise.
 */
function isSeverity(value: unknown): value is Severity {
  return typeof value === 'string' && (SEVERITIES as readonly string[]).includes(value);
}

/**
 * Determines whether a value is a non-null object with string keys.
 *
 * @param value - The value to inspect
 * @returns `true` if the value is a non-null, non-array object, `false` otherwise
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Parses and validates an advisory object.
 *
 * @param raw - The unknown value to validate.
 * @param path - The location used to identify validation errors.
 * @returns A successful result containing the advisory, or an error describing the invalid field.
 */
function parseAdvisory(raw: unknown, path: string): Result<AuditAdvisory> {
  if (!isRecord(raw)) {
    return { ok: false, error: `${path}: Advisory がオブジェクトではありません` };
  }
  if (typeof raw.id !== 'number') {
    return { ok: false, error: `${path}: id が number ではありません` };
  }
  if (typeof raw.url !== 'string') {
    return { ok: false, error: `${path}: url が string ではありません` };
  }
  if (typeof raw.title !== 'string') {
    return { ok: false, error: `${path}: title が string ではありません` };
  }
  if (!isSeverity(raw.severity)) {
    return { ok: false, error: `${path}: 未知の severity です: ${String(raw.severity)}` };
  }
  if (typeof raw.vulnerable_versions !== 'string') {
    return { ok: false, error: `${path}: vulnerable_versions が string ではありません` };
  }

  return {
    ok: true,
    value: {
      id: raw.id,
      url: raw.url,
      title: raw.title,
      severity: raw.severity,
      vulnerable_versions: raw.vulnerable_versions,
    },
  };
}

export interface ParseAuditOptions {
  exitCode?: number;
}

/**
 * Parses `bun audit --json` output into an audit report.
 *
 * Empty output is treated as an empty report when the exit code is zero or unspecified.
 * Empty output with a nonzero exit code is reported as a parsing failure.
 *
 * @param rawText - The audit command's standard output
 * @param options - Optional command exit code used to interpret empty output
 * @returns A successful audit report or an error describing invalid output
 */
export function parseAuditJson(rawText: string, options?: ParseAuditOptions): Result<AuditReport> {
  const trimmed = rawText.trim();
  if (trimmed === '') {
    if (options?.exitCode !== undefined && options.exitCode !== 0) {
      return {
        ok: false,
        error: `監査コマンドが非ゼロの終了コード (${options.exitCode}) で終了し、出力が得られませんでした`,
      };
    }
    return { ok: true, value: {} };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: `JSON の解析に失敗しました: ${message}` };
  }

  if (!isRecord(parsed)) {
    return { ok: false, error: 'audit の出力がオブジェクトではありません' };
  }

  const report: AuditReport = {};
  for (const [packageName, advisories] of Object.entries(parsed)) {
    if (!Array.isArray(advisories)) {
      return { ok: false, error: `${packageName}: Advisory 一覧が配列ではありません` };
    }

    const parsedAdvisories: AuditAdvisory[] = [];
    for (const [index, advisory] of advisories.entries()) {
      const result = parseAdvisory(advisory, `${packageName}[${index}]`);
      if (!result.ok) {
        return result;
      }
      parsedAdvisories.push(result.value);
    }
    report[packageName] = parsedAdvisories;
  }

  return { ok: true, value: report };
}

/**
 * Creates a severity count record initialized to zero.
 *
 * @returns A count of zero for each severity
 */
function emptyCounts(): Record<Severity, number> {
  return { info: 0, low: 0, moderate: 0, high: 0, critical: 0 };
}

/**
 * Evaluates audit advisories against a severity threshold.
 *
 * @param report - The audit report to evaluate
 * @param threshold - The minimum severity that causes an advisory to fail
 * @returns The failing advisories, severity counts, and total advisory count
 */
export function evaluateAudit(report: AuditReport, threshold: Severity): AuditEvaluation {
  const thresholdRank = SEVERITY_RANK[threshold];
  const counts = emptyCounts();
  const failing: Finding[] = [];
  let total = 0;

  for (const [packageName, advisories] of Object.entries(report)) {
    for (const advisory of advisories) {
      counts[advisory.severity] += 1;
      total += 1;
      if (SEVERITY_RANK[advisory.severity] >= thresholdRank) {
        failing.push({ packageName, advisory });
      }
    }
  }

  failing.sort((a, b) => {
    const rankDiff = SEVERITY_RANK[b.advisory.severity] - SEVERITY_RANK[a.advisory.severity];
    if (rankDiff !== 0) return rankDiff;
    const nameDiff = a.packageName.localeCompare(b.packageName);
    if (nameDiff !== 0) return nameDiff;
    return a.advisory.id - b.advisory.id;
  });

  return { failing, counts, total };
}

/**
 * Converts a string value into a severity threshold.
 *
 * @param value - The severity value to parse
 * @returns The parsed severity, or an error containing the valid severity values
 */
export function parseThreshold(value: string): Result<Severity> {
  if (isSeverity(value)) {
    return { ok: true, value };
  }
  return {
    ok: false,
    error: `不正な閾値です: ${value}（有効な値: ${SEVERITIES.join(', ')}）`,
  };
}

/**
 * Formats vulnerability counts as a one-line summary.
 *
 * Severities with zero counts are omitted, and the remaining severities are
 * ordered from highest to lowest. Returns `脆弱性なし` when all counts are zero.
 *
 * @param counts - The number of vulnerabilities for each severity
 * @returns A formatted severity-count summary
 */
export function formatCounts(counts: Record<Severity, number>): string {
  const parts = [...SEVERITIES]
    .reverse()
    .filter((severity) => counts[severity] > 0)
    .map((severity) => `${severity}: ${counts[severity]}`);
  return parts.length === 0 ? '脆弱性なし' : parts.join(' / ');
}

/**
 * Formats audit findings as human-readable multiline text.
 *
 * @param findings - The findings to format
 * @returns The formatted findings, with one three-line block per finding
 */
export function formatFindings(findings: Finding[]): string {
  return findings
    .map(
      ({ packageName, advisory }) =>
        `  [${advisory.severity}] ${packageName} (${advisory.vulnerable_versions})\n` +
        `    ${advisory.title}\n` +
        `    ${advisory.url}`
    )
    .join('\n');
}
