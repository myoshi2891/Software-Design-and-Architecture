# Handoff Plan Template（引き継ぎ計画書テンプレート）

すべての計画書は、**コンテキストを一切持たない** Executor エージェント向けに作成されます。Executor はアドバイザーのセッション、事前調査、他の計画書、あるいは過去の会話を一切知りません。指示の遵守には優れているものの、曖昧さからの復帰や作業停止時期の判断が苦手であることを前提とします。

計画書を実行可能にする 3 つの要素：
1. **完全自己完結型のコンテキスト** — パス、コード抜粋、規約、実行コマンドなど必要な情報をすべてファイル内に記載する。
2. **検証ゲート (Verification gates)** — すべてのステップがコマンドと期待される結果で終了し、判断に迷わないようにする。
3. **境界線と停止条件 (Hard boundaries & STOP conditions)** — スコープ外の一覧を明記し、想定と異なる場合は勝手に即興対応せず作業を停止して報告させる。

ファイル命名規則: `plans/NNN-short-slug.md` （推奨実行順にナンバリング）

---

## 計画書テンプレート (Template)

```markdown
# Plan NNN: <命令形のタイトル — この計画完了後に達成される状態>

> **Executor 向け指示**: この計画書にステップバイステップで従ってください。次のステップに進む前に、必ずすべての検証コマンドを実行し、期待される結果を確認してください。「STOP条件」セクションのいずれかが発生した場合は、即座に作業を停止して報告してください（即興での回避行動は厳禁です）。完了後は、`plans/README.md` 内の該当行のステータスを更新してください（レビュアーからインデックス保守を自身で行うよう指示されている場合を除く）。
>
> **ドリフトチェック (最初に実行)**: `git diff --stat <planned-at SHA>..HEAD -- <in-scope paths>`
> 計画作成時以降に対象ファイルに変更がある場合、「現在の状態」のコード抜粋と実際のコードを比較し、不一致がある場合は STOP 条件として扱ってください。

## ステータス (Status)

- **優先度**: P1 | P2 | P3
- **工数**: S | M | L
- **リスク**: LOW | MED | HIGH
- **依存関係**: plans/NNN-*.md (なしの場合は "none")
- **カテゴリ**: bug | security | perf | tests | tech-debt | migration | dx | docs | direction
- **計画作成時コミット**: `<commit SHA (40桁)>`, <YYYY-MM-DD>
- **Issue**: <GitHub issue URL — `--issues` で発行した場合のみ記述。それ以外は省略>

## なぜこれが重要か (Why this matters)

2〜5文で記述。問題点、具体的コスト、完了時に何が改善されるか。Executor やレビュアーが意図を理解できるように記述します。

## 現在の状態 (Current state)

Executor に必要な事実をインラインで記述（「上記で議論した通り」などは不可）：

- 関連ファイルと各役割:
  - `src/orders/api.ts` — 注文一覧エンドポイント (130–160行に N+1 が存在)
- 現在のコード抜粋（`file:line` 付きの短い抜き出し）。
- 適用されるリポジトリの規約と模範ファイルのポインタ。
- Recon で発見された用語や設計上の制約（`CONTEXT.md` や `DESIGN.md` からの引用）。

## 必要なコマンド (Commands you will need)

> **注意**: 以下のコマンドは **Recon フェーズで発見・検証されたこのリポジトリ固有の実際のコマンド** に置き換えてください（以下の表はプレースホルダーおよび例です）。すべてのリポジトリで pnpm / npm / bun / pytest が共通で使えると仮定してはなりません。

| 目的 | コマンド (例/プレースホルダー) | 正常時の期待される出力 |
|---|---|---|
| 依存関係インストール | `<install-command>` (例: `npm install`) | exit 0 |
| 型チェック | `<typecheck-command>` (例: `npx tsc --noEmit`) | exit 0, エラーなし |
| テスト実行 | `<test-command>` (例: `npm test -- <filter>`) | 全テストパス |
| Lint | `<lint-command>` (例: `npm run lint`) | exit 0 |

## スコープ (Scope)

**スコープ内 (In scope)**（変更が許可されているファイルのみ）:
- `src/orders/api.ts`
- `src/orders/api.test.ts` (新規作成)

**スコープ外 (Out of scope)**（関連しそうに見えても絶対に手を出さないファイル）:
- `src/orders/legacy-api.ts` — 削除予定の非推奨パス。
- パブリックレスポンス形状の変更。

## Git ワークフロー (Git workflow)

- ブランチ名: `advisor/NNN-<slug>`
- コミット単位: ステップごと、または論理単位ごと。メッセージはリポジトリの規約に従う。
- 指示がない限り、プッシュや PR の作成は行わない。

## ステップ (Steps)

### Step 1: <命令形タイトル>

行うべき作業を正確に記述。影響を受けるファイル/シンボルを指定。

**検証**: `<command>` → <期待される出力>

### Step 2: ...

## テスト計画 (Test plan)

- 作成する新規テスト、ファイルパス、カバーするケース。
- 参照する既存テストのパターン。
- 検証コマンド。

## 完了条件 (Done criteria)

自動検証可能な基準。すべて満たす必要があります：

- [ ] `<typecheck-command>` が exit 0 で終了すること
- [ ] `<test-command>` が exit 0 で終了し、新規テストがパスすること
- [ ] `<build-command>` が exit 0 で終了すること (ビルドステップが存在する場合)
- [ ] `<lint-command>` が exit 0 で終了すること (Lintステップが存在する場合)
- [ ] スコープ外のファイルが変更されていないこと (`git status`)
- [ ] `plans/README.md` のステータス行が更新されていること

## STOP 条件 (STOP conditions)

以下が発生した場合、即座に作業を停止して報告してください：

- 「現在の状態」のコードが実際のコードと一致しない場合（計画作成後にドリフトが発生）。
- ステップの検証が適切な修正試行後も2回連続で失敗した場合。
- 修正にスコープ外のファイルの編集が必要と判明した場合。

## 保守に関するメモ (Maintenance notes)

将来の変更に対する注意点やレビュアーへの申し送り事項。
```

---

## インデックスファイル例: `plans/README.md`

```markdown
# 実装計画一覧 (Implementation Plans)

<日付> に improve スキルによって生成されました。依存関係に指定がない限り、以下の順序で実行してください。

## 実行順序とステータス

| 計画 | タイトル | 優先度 | 工数 | 依存関係 | ステータス |
|------|-------|----------|--------|------------|--------|
| 001  | ...   | P1       | S      | —          | TODO   |
| 002  | ...   | P1       | M      | 001        | TODO   |

ステータス値: TODO | IN PROGRESS | DONE | BLOCKED | REJECTED
```

---

## ワークフロー構造 (Mermaid)

```mermaid
flowchart LR
    Sub[Recon フェーズ: コマンド・規約・依存関係の特定] --> Temp[計画書テンプレートへの流し込み]
    Temp --> Check[検証ゲート & STOP条件の設定]
    Check --> Out[plans/NNN-slug.md の出力]
```

---

## 実装コード例（TypeScript / Bun）

計画書のヘッダー情報やドリフト SHA をプログラムから評価・検証する Bun / TypeScript スクリプト例です：

```typescript
import { existsSync, readFileSync } from "node:fs";

export interface PlanHeader {
  title: string;
  plannedAtSha: string;
  inScopeFiles: string[];
}

export function parsePlanFile(planFilePath: string): PlanHeader {
  if (!existsSync(planFilePath)) {
    throw new Error(`計画書ファイルが存在しません: ${planFilePath}`);
  }

  const content = readFileSync(planFilePath, "utf-8");
  const titleMatch = content.match(/^# Plan \d+:\s*(.+)$/m);
  const shaMatch = content.match(/-\s*\*\*(?:Planned at|計画作成時コミット)\*\*:\s*(?:commit\s*)?`([a-f0-9]{40})`/i);

  const inScopeBlock = content.match(/\*\*(?:In scope|スコープ内(?:\s*\(In scope\))?|In scope\s*\(スコープ内\))\*\*\s*[\s\S]*?(?=\*\*(?:Out of scope|スコープ外(?:\s*\(Out of scope\))?|Out of scope\s*\(スコープ外\))\*\*|$)/i);
  const inScopeFiles: string[] = [];
  if (inScopeBlock) {
    const fileMatches = inScopeBlock[0].matchAll(/-\s*`([^`]+)`/g);
    for (const m of fileMatches) {
      inScopeFiles.push(m[1]);
    }
  }

  return {
    title: titleMatch ? titleMatch[1].trim() : "Untitled",
    plannedAtSha: shaMatch ? shaMatch[1] : "",
    inScopeFiles,
  };
}
```

---

## 参考文献・ソース一覧

- **Improve Skill (スキル本体)**: [../SKILL.md](../SKILL.md)
- **Closing the Loop (実行・同期・Issue発行ガイド)**: [closing-the-loop.md](closing-the-loop.md)
- **Audit Playbook (監査ガイド)**: [audit-playbook.md](audit-playbook.md)

---

*作成者：Software Architect Guide | バージョン 1.0 | Handoff Plan Template Reference Guide*
