# Plan 003: クラウド・インフラ設計ガイドを新規作成し cloud-infrastructure カテゴリを新設する

> **Executor instructions**: 本計画をステップ順に実行し、各ステップの検証コマンドを実行して期待結果を確認してから次へ進むこと。「STOP conditions」に該当したら即座に停止して報告する。完了時に `plans/README.md` の自分の行の Status を更新すること。
>
> **Drift check（最初に実行）**: `git diff --stat 06ca17c..HEAD -- web-next/components/site/nav-links.ts README.md`
> リポジトリルートに `cloud-infrastructure/` が既に存在する場合は STOP（重複作成防止）。

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: LOW（新規カテゴリ追加。既存ファイルへの変更は nav-links.ts と README.md の追記に限定）
- **Depends on**: plans/001-certification-platform-roadmap.md（決定 1: カテゴリ新設、決定 4: CKA は本カテゴリに吸収）
- **Category**: direction
- **Planned at**: commit `06ca17c`, 2026-07-06

## Why this matters

クラウドアーキテクチャは現代のアーキテクト 4 領域の一角だが、本プラットフォームには対応カテゴリが存在しない。Plan 001 で `cloud-infrastructure/` カテゴリ新設が決定済み。本計画はその第一号ガイドとして「クラウドアーキテクチャ設計原則 + 3 大クラウドアーキテクト資格（AWS SAP-C02 / Azure AZ-305 / Google PCA）の試験対策」を 1 本にまとめ、カテゴリの受け皿（ディレクトリ・ルーティング・ナビ）を確立する。

## Current state

- リポジトリルートに `cloud-infrastructure/` は存在しない。`web-next/app/cloud-infrastructure/` も存在しない。
- カテゴリ新設の前例: 既存カテゴリはすべて「ルートの `<category>/<slug>-comprehensive-guide/` ディレクトリ + `web-next/app/<category>/<slug>/`ルート + nav-links.ts のドロップダウン」の三点セット。
- 資格ガイドの章立て exemplar: `product-and-enterprise/togaf-certification-comprehensive-guide/togaf-certification-comprehensive-guide.md`（試験概要 → 本文知識 → 試験対策 → 週次学習ロードマップ → 参考文献）。
- ドキュメント規約: 日本語、Mermaid 図 + 動作可能なコードスニペット（Backend: Python、Frontend: TypeScript。本ガイドでは IaC 例として Terraform/CloudFormation の HCL/YAML も可 — ただしリポジトリの「JavaScript 禁止」ルールに抵触しないこと）。ファイル名 `kebab-case-comprehensive-guide.md`、末尾に「参考文献・ソース一覧」。
- ナビ定義: `web-next/components/site/nav-links.ts` — `navLinks` 配列に `NavDropdown`（`name` + `children`）を追加する形式。未移植リンクの先行追加は許容される設計。

### 試験の事実（2026-07-06 確認、ガイド本文に使用する一次情報）

| 資格 | 形式 | 特徴 |
|---|---|---|
| AWS SAP-C02 | 75 問・180 分・300 USD・多肢選択/複数選択 | 3 大クラウド資格で最難関とされる（合格率 28〜50% との調査あり）。ハイブリッド・大規模エンタープライズ構成が主題 |
| Azure AZ-305 | 約 120 分・165 USD・シナリオベース多肢選択 | 「どのサービスを・なぜ・どのトレードオフで選ぶか」を問う設計判断型 |
| Google PCA | ケーススタディ 2〜3 本を含む多肢選択 | 公式ケーススタディ（事前公開）の読み込みが必須 |

- 3 社とも Well-Architected 系フレームワーク（AWS Well-Architected / Azure Well-Architected / Google Cloud Architecture Framework）を公開しており、ガイドの設計原則章はこの 3 つの共通柱（信頼性・セキュリティ・コスト・運用・性能）を横串で解説する構成とする。
- ガイド冒頭に「対象試験バージョン表」（試験コード + 確認日）を置くこと（Plan 001 決定 3）。試験コードは改訂される（例: SAP-C01→C02）ため、執筆時に各公式ページで最新コードを確認すること。

## Commands you will need

| 目的 | コマンド | 成功条件 |
|---|---|---|
| リンク検証 | ルートで `bun run check-links` | exit 0 |
| Markdown 修正 | `bun run fix-markdown` | exit 0 |
| Web 層検証（Step 3 以降） | `cd web-next && bun run lint && bun run typecheck && bun run test && bun run build` | すべて exit 0 / 全テストパス |

## Suggested executor toolkit

- `markdown-formatter` スキル（lint 対応）、`fix-mermaid` スキル（図の構文エラー時）
- Step 5（移植）実施時: `nextjs-page-migration` スキル（必読）

## Scope

**In scope**:

- `cloud-infrastructure/cloud-architecture-certification-comprehensive-guide/cloud-architecture-certification-comprehensive-guide.md`（新規。カテゴリディレクトリごと新設）
- `web-next/components/site/nav-links.ts`（新ドロップダウン「クラウド & インフラ」の追加のみ）
- `README.md`（コンテンツ構造セクションへのカテゴリ追記のみ）
- `plans/README.md`（Status 更新）
- （オプション Step 5）`web-next/app/cloud-infrastructure/cloud-architecture-certification-comprehensive-guide/` 配下の新規ファイル

**Out of scope**:

- Kubernetes（CKA）ガイド — 本カテゴリに将来追加する別ガイド。本計画では第 9 章の言及とナビ設計の余地のみ
- 特定ベンダーの模擬試験問題の転載（著作権リスク。オリジナルの演習シナリオのみ可）
- 既存カテゴリのファイル

## Git workflow

- 現行ブランチ（`dev`）上で作業。push は指示があるまで行わない。
- コミット分割: `docs(cloud-infrastructure): ...`（ガイド本文）、`feat(web-next): ...`（ナビ追加）。
- 各コミット前に PII チェック: `git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'` → 出力なし。

## Steps

### Step 1: カテゴリディレクトリとガイド骨子の作成

`cloud-infrastructure/cloud-architecture-certification-comprehensive-guide/cloud-architecture-certification-comprehensive-guide.md` を以下の章立てで作成:

1. クラウドアーキテクトの役割と資格の全体像（3 資格の位置付けを Mermaid で）
2. 対象試験バージョン表 + 3 資格の試験概要比較（上記の事実表を反映。**執筆時に各公式ページで試験コード・料金・時間の最新値を再確認**）
3. 設計原則の共通柱（Well-Architected 3 フレームワーク横断: 信頼性/セキュリティ/コスト最適化/運用性/性能効率）
4. コンピュート・ネットワーク・ストレージ設計パターン（3 クラウドのサービス対応表つき）
5. 可用性・DR 設計（RTO/RPO、マルチリージョン、Mermaid 構成図）
6. セキュリティ・アイデンティティ設計（IAM の 3 社比較）
7. コスト設計と FinOps 基礎
8. IaC とデプロイ戦略（Terraform コード例。動作可能な最小構成）
9. コンテナ・Kubernetes の位置付け（概観のみ。CKA は将来の別ガイドとする旨を明記）
10. 試験対策・ベストプラクティス（資格別の頻出テーマとオリジナル演習シナリオ）
11. 学習ロードマップ（資格別の週次プラン）
12. 参考文献・ソース一覧（3 社の公式試験ガイド URL 必須）

**Verify**: `bun run fix-markdown && bun run check-links` → exit 0

### Step 2: 本文の執筆

各章を執筆。Mermaid 図を少なくとも 6 点（資格体系、共通柱、マルチリージョン構成、IAM 比較、IaC パイプライン、学習フロー）。サービス対応表（AWS/Azure/GCP）は第 4・6 章に必須。

**Verify**: `bun run fix-markdown && bun run check-links` → exit 0

### Step 3: ナビと README への登録

- `nav-links.ts` の `navLinks` 配列（「プロダクト & エンタープライズ」の後、「CSS デザインシステム」の前）に新ドロップダウンを追加:

```ts
{
  name: "クラウド & インフラ",
  children: [
    {
      name: "クラウドアーキテクチャ & 資格",
      href: "/cloud-infrastructure/cloud-architecture-certification-comprehensive-guide",
    },
  ],
},
```

- ルート `README.md` の「コンテンツ構造」に「### クラウド & インフラ (`cloud-infrastructure/`)」セクションを追記。

**Verify**: `cd web-next && bun run lint && bun run typecheck && bun run test` → すべて成功

### Step 4: コミット

`docs(cloud-infrastructure): クラウドアーキテクチャ・資格総合ガイドを追加` と `feat(web-next): ナビにクラウド & インフラカテゴリを追加` に分割コミット（各コミット前に PII チェック）。

**Verify**: `git log --oneline -3` → 2 コミットが規約形式で存在

### Step 5（オプション）: web-next へのページ移植

`nextjs-page-migration` スキルに従い `web-next/app/cloud-infrastructure/cloud-architecture-certification-comprehensive-guide/page.tsx` + 契約テストを TDD で作成。exemplar: `web-next/app/general/comprehensive-guide/page.tsx`。**新カテゴリのため globals.css にページスコープクラスを新設する必要がある**（既存スコープからの継承はない — nextjs-page-migration スキルの注意事項）。

**Verify**: `cd web-next && bun run lint && bun run typecheck && bun run test && bun run build` → すべて成功

## Test plan

- コンテンツ層: `bun run check-links` + markdownlint。
- Web 層: `nav-links.test.tsx`（既存契約テスト）が新ドロップダウン追加後も通ること。Step 5 では `page.test.tsx` を `web-next/app/general/comprehensive-guide/page.test.tsx` のパターンで新規作成。

## Done criteria

- [ ] `cloud-infrastructure/cloud-architecture-certification-comprehensive-guide/cloud-architecture-certification-comprehensive-guide.md` が存在し、12 章 + 対象試験バージョン表を含む
- [ ] `bun run check-links` が exit 0
- [ ] `grep -c '```mermaid' cloud-infrastructure/cloud-architecture-certification-comprehensive-guide/*.md` ≥ 6
- [ ] `cd web-next && bun run lint && bun run typecheck && bun run test` すべて成功
- [ ] In scope 外のファイルに変更がない（`git status`）
- [ ] `plans/README.md` の 003 行が DONE に更新されている

## STOP conditions

- ルートに `cloud-infrastructure/` が既に存在する
- 執筆時の公式確認で試験コードが変わっている（例: SAP-C03 が出ている）— 本計画の事実表が陳腐化しているため、表を更新した上でユーザーに報告してから続行
- nav-links.ts の型構造（NavLeaf/NavDropdown）が変わっている
- ベンダー公式の模擬問題を転載しないと成立しない章がある（著作権上 STOP。オリジナル演習に置き換える方針の確認を仰ぐ）

## Maintenance notes

- クラウド資格は 3 年ごとの再認定 + 試験コード改訂が頻繁。ガイド冒頭のバージョン表を年 2 回確認することを推奨（TOGAF/CPSA より改訂周期が短い）。
- 将来の CKA/CKAD ガイドは本カテゴリ配下 `kubernetes-certification-comprehensive-guide/` として追加し、nav の「クラウド & インフラ」children に足す（Plan 001 決定 4）。
- レビュー観点: 3 社比較表の正確性（サービス名の改称が頻繁）、料金記載は「執筆時点」の断り書き必須。

## 参考文献・ソース一覧

- [AWS Certified Solutions Architect – Professional](https://aws.amazon.com/certification/certified-solutions-architect-professional/)
- [AWS SAP-C02 試験ガイド](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [Microsoft AZ-305 (Azure Solutions Architect Expert)](https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/)
- [Google Professional Cloud Architect](https://cloud.google.com/learn/certification/cloud-architect)
- [AWS Well-Architected](https://aws.amazon.com/architecture/well-architected/)
- [Azure Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/)
- [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework)
