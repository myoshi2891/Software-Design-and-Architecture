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

function isSeverity(value: unknown): value is Severity {
  return typeof value === 'string' && (SEVERITIES as readonly string[]).includes(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Advisory 1 件分の型ガード。
 * 未知の深刻度は「安全側に倒して無視」ではなく検証エラーとして扱う
 * （深刻な脆弱性を静かに取りこぼすことを防ぐ）。
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
 * `bun audit --json` の標準出力文字列を AuditReport へ変換する。
 * 脆弱性ゼロのとき bun は何も出力しない場合があるため、正常終了（exitCode 0 または未指定）の空文字列は空レポートとして扱う。
 * 非ゼロ終了かつ空文字列の場合は監査実行失敗としてエラーを返す。
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

function emptyCounts(): Record<Severity, number> {
  return { info: 0, low: 0, moderate: 0, high: 0, critical: 0 };
}

/**
 * レポートを閾値で評価する。閾値以上の深刻度を持つ Advisory を failing として返す。
 * 並び順は「深刻度の降順 → パッケージ名の昇順 → Advisory ID の昇順」で決定論的にする。
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

/** CLI 引数などの文字列を Severity に変換する */
export function parseThreshold(value: string): Result<Severity> {
  if (isSeverity(value)) {
    return { ok: true, value };
  }
  return {
    ok: false,
    error: `不正な閾値です: ${value}（有効な値: ${SEVERITIES.join(', ')}）`,
  };
}

/** 深刻度別件数を 1 行のサマリ文字列にする（0 件の深刻度は省略） */
export function formatCounts(counts: Record<Severity, number>): string {
  const parts = [...SEVERITIES]
    .reverse()
    .filter((severity) => counts[severity] > 0)
    .map((severity) => `${severity}: ${counts[severity]}`);
  return parts.length === 0 ? '脆弱性なし' : parts.join(' / ');
}

/** failing を人間可読な複数行テキストに整形する */
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
