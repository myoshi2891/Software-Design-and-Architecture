/**
 * 依存パッケージの既知脆弱性を検査する CLI。
 *
 * ルートと web-next/ の両ワークスペースで `bun audit --json` を実行し、
 * 閾値以上の深刻度の Advisory が 1 件でもあれば exit 1 で失敗させる。
 *
 * 使い方:
 *   bun run audit                      # 閾値 low（= 脆弱性 0 件を要求）
 *   bun run audit --threshold=moderate # moderate 以上のみ失敗扱い
 */

import * as path from 'node:path';
import {
  evaluateAudit,
  formatCounts,
  formatFindings,
  parseAuditJson,
  parseThreshold,
  type Finding,
  type Severity,
} from './audit-report.ts';

/** 終了コード: 1 = 脆弱性検出, 2 = 監査自体の実行失敗 */
const EXIT_VULNERABLE = 1;
const EXIT_ERROR = 2;

const repoRoot = path.resolve(import.meta.dirname, '..');

interface Workspace {
  name: string;
  cwd: string;
}

const WORKSPACES: Workspace[] = [
  { name: 'root', cwd: repoRoot },
  { name: 'web-next', cwd: path.join(repoRoot, 'web-next') },
];

/**
 * Resolves the audit severity threshold from command-line arguments.
 *
 * @param argv - Command-line arguments to search for a `--threshold=` option
 * @returns The specified severity threshold, or `low` when no threshold is provided
 */
function resolveThreshold(argv: string[]): Severity {
  const arg = argv.find((value) => value.startsWith('--threshold='));
  if (!arg) return 'low';

  const result = parseThreshold(arg.slice('--threshold='.length));
  if (!result.ok) {
    console.error(`エラー: ${result.error}`);
    process.exit(EXIT_ERROR);
  }
  return result.value;
}

/**
 * Audits a workspace and identifies advisories at or above the specified severity threshold.
 *
 * @param workspace - The workspace to audit.
 * @param threshold - The minimum advisory severity to report.
 * @returns Advisories that meet or exceed the threshold.
 */
async function auditWorkspace(workspace: Workspace, threshold: Severity): Promise<Finding[]> {
  const proc = Bun.spawn(['bun', 'audit', '--json'], {
    cwd: workspace.cwd,
    stdout: 'pipe',
    stderr: 'pipe',
  });

  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ]);
  const exitCode = await proc.exited;

  const parsed = parseAuditJson(stdout, { exitCode });
  if (!parsed.ok) {
    // 監査が実行できなかった場合（ネットワーク断など）はエラーを握りつぶさず中断する
    console.error(`エラー: ${workspace.name} の監査に失敗しました - ${parsed.error}`);
    if (stderr.trim() !== '') {
      console.error(stderr.trim());
    }
    process.exit(EXIT_ERROR);
  }

  const evaluation = evaluateAudit(parsed.value, threshold);
  const summary = formatCounts(evaluation.counts);
  const mark = evaluation.failing.length === 0 ? 'OK' : 'NG';
  console.log(`[${mark}] ${workspace.name}: ${summary}`);
  if (evaluation.failing.length > 0) {
    console.log(formatFindings(evaluation.failing));
  }

  return evaluation.failing;
}

/**
 * Audits all configured workspaces and exits with a vulnerability status when findings meet the selected severity threshold.
 */
async function main(): Promise<void> {
  const threshold = resolveThreshold(process.argv.slice(2));
  console.log(`依存関係の脆弱性を監査します（閾値: ${threshold} 以上）`);

  let failingTotal = 0;
  for (const workspace of WORKSPACES) {
    const failing = await auditWorkspace(workspace, threshold);
    failingTotal += failing.length;
  }

  if (failingTotal > 0) {
    console.error(`\n${failingTotal} 件の脆弱性が閾値 ${threshold} 以上で検出されました。`);
    process.exit(EXIT_VULNERABLE);
  }

  console.log('\n閾値以上の脆弱性はありません。');
}

await main();
