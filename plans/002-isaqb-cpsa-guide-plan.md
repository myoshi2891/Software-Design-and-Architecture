# Plan 002: iSAQB CPSA-F 試験対策総合ガイドを新規作成する

> **Executor instructions**: 本計画をステップ順に実行し、各ステップの検証コマンドを実行して期待結果を確認してから次へ進むこと。「STOP conditions」に該当したら即座に停止して報告する（改変・即興は禁止）。完了時に `plans/README.md` の自分の行の Status を更新すること。
>
> **Drift check（最初に実行）**: `git diff --stat 06ca17c..HEAD -- architecture/ web-next/components/site/nav-links.ts`
> `architecture/` 配下に `isaqb` を含むディレクトリが既に存在する場合は STOP（重複作成防止）。

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: LOW（新規ファイル追加のみ。既存ファイルへの変更は nav-links.ts と README.md の追記に限定）
- **Depends on**: plans/001-certification-platform-roadmap.md（配置先とキャッチアップ機構の決定）
- **Category**: direction
- **Planned at**: commit `06ca17c`, 2026-07-06

## Why this matters

iSAQB CPSA（Certified Professional for Software Architecture）はソフトウェアアーキテクト向けの国際資格であり、本プラットフォームの中核テーマ「ソフトウェアアーキテクチャ」に最も直結する資格である。既存の `architecture/` 配下 6 ガイド（Clean/EDA/Hexagonal/Microservices/Monolithic/SOA）は CPSA-F カリキュラムの技法各論に相当するため、試験対策ガイドを 1 本追加して相互リンクすれば、既存資産が「資格学習の教材群」として再文脈化される。

## Current state

- `architecture/` には 6 つの `*-comprehensive-guide/` ディレクトリがあり、各々が同名の `.md`（+ 移植済みなら `.html`）を持つ。**iSAQB 関連のガイドは存在しない。**
- 既存ガイドの構成規約の exemplar: `product-and-enterprise/togaf-certification-comprehensive-guide/togaf-certification-comprehensive-guide.md` — 資格ガイドとして「試験の種類と概要 → 本文知識 → 試験対策・ベストプラクティス → 学習ロードマップ（週次プラン） → 参考文献・公式ソース」という章立てを持つ。**この章立てパターンを踏襲する。**
- ドキュメント規約（リポジトリ CLAUDE.md より）: 日本語で記述、Mermaid 図と動作可能なコードスニペットを含める。コード例の標準スタック = Backend: Python (FastAPI/SQLAlchemy/Pydantic)、Frontend: TypeScript (React)。ファイル名は `kebab-case-comprehensive-guide.md`。末尾に「参考文献・ソース一覧」、フッターに作成者情報（既存ガイドのフッター形式をコピーして合わせる）。
- ナビ定義: `web-next/components/site/nav-links.ts` の「アーキテクチャ」ドロップダウン（`children` 配列、26〜53 行目付近）。未移植ページへのリンクを先に追加してよい（ファイル冒頭コメントに明記された設計）。

### 試験の事実（2026-07-06 確認、ガイド本文に使用する一次情報）

- **CPSA-F（Foundation）**: 多肢選択式・約 40 問・75 分（非ネイティブ話者は +15 分延長可）・60% で合格。資格は無期限有効。受験方法は (1) リモート/オンライン、(2) 認定研修直後、(3) Pearson VUE / Prometric テストセンター（190 か国以上）。
- **カリキュラムの 4 本柱**: ①要求と制約の明確化、②アーキテクチャの設計・開発、③ステークホルダーへの伝達と文書化、④アーキテクチャの分析・評価。公式カリキュラム PDF: `https://public.isaqb.org/curriculum-foundation/curriculum-foundation-en.pdf`
- **CPSA-A（Advanced）**: 19 モジュール制（ADOC, AGILA, API, AREV, FM, DDD 関連ほか）からクレジットポイントを積み上げ + 試験。ガイドでは概観章のみ扱い、詳細は公式へリンク。
- ガイド冒頭に「対象試験バージョン表」（カリキュラム版数 + 確認日）を置くこと（Plan 001 決定 3）。

## Commands you will need

| 目的 | コマンド | 成功条件 |
|---|---|---|
| リンク検証 | ルートで `bun run check-links` | exit 0 |
| Markdown 修正 | `bun run fix-markdown` | exit 0 |
| Web 層検証（Step 5 実施時のみ） | `cd web-next && bun run lint && bun run typecheck && bun run test && bun run build` | すべて exit 0 / 全テストパス |

## Suggested executor toolkit

- Markdown 整形時: `markdown-formatter` スキル（MD031/MD022 等の lint 対応）
- Mermaid 図が壊れた場合: `fix-mermaid` スキル
- Step 5（web-next 移植）実施時: `nextjs-page-migration` スキル（必読）

## Scope

**In scope**（作成・変更してよいファイル）:

- `architecture/isaqb-cpsa-certification-comprehensive-guide/isaqb-cpsa-certification-comprehensive-guide.md`（新規）
- `web-next/components/site/nav-links.ts`（「アーキテクチャ」ドロップダウンへの 1 リンク追記のみ）
- `README.md`（カテゴリ 1 のリストへの 1 行追記のみ）
- `plans/README.md`（Status 更新）
- （オプション Step 5）`web-next/app/architecture/isaqb-cpsa-certification-comprehensive-guide/` 配下の新規ファイル

**Out of scope**（触らない）:

- 既存 6 アーキテクチャガイドの本文（相互リンクは新ガイド側から張る。既存側の変更は別計画）
- `web-next/app/globals.css` の既存スコープ、既存コンポーネント
- TOGAF ガイド（Plan 004 の担当）

## Git workflow

- ブランチ: 現行ブランチ（`dev`）上で作業。push は指示があるまで行わない。
- コミットは論理単位ごと: `docs(architecture): ...`（ガイド本文）、`feat(web-next): ...`（ナビ追加・ページ移植）。リポジトリの TDD コミットワークフロー（`.claude/rules/tdd-commit-workflow.md`）に従う。
- **各コミット前に必ず PII チェック**: `git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'` → 出力なしを確認。

## Steps

### Step 1: ガイド骨子の作成

`architecture/isaqb-cpsa-certification-comprehensive-guide/isaqb-cpsa-certification-comprehensive-guide.md` を作成し、以下の章立てで骨子（各章の見出し + 導入段落）を書く:

1. iSAQB と CPSA とは何か（資格体系図を Mermaid で）
2. 対象試験バージョン表 + 試験の種類と概要（CPSA-F 中心。上記「試験の事実」を反映）
3. カリキュラム 4 本柱の完全解説（①要求と制約 ②設計・開発 ③伝達と文書化 ④分析・評価）
4. アーキテクチャ設計技法（既存ガイドへの相対リンク: `../clean-architecture-comprehensive-guide/...` 等 6 本）
5. アーキテクチャ文書化（arc42、C4 モデル、ADR）
6. 品質特性と評価（ISO 25010、ATAM の概観）
7. CPSA-A（Advanced Level）概観 — 19 モジュール制の説明
8. 試験対策・ベストプラクティス（頻出テーマ、模擬問題例 3〜5 問）
9. 学習ロードマップ（週次プラン — TOGAF ガイドの「7週間プラン」形式を踏襲）
10. 参考文献・ソース一覧（公式 URL 必須: isaqb.org、public.isaqb.org のカリキュラム PDF）

**Verify**: `bun run fix-markdown && bun run check-links` → exit 0

### Step 2: 本文の執筆

各章を執筆する。規約: 日本語、Mermaid 図を少なくとも 5 点（資格体系、4 本柱、文書化構造、品質ツリー、学習フロー）、コード例が必要な箇所（文書化・ADR の例など）は Python または TypeScript。総量の目安は既存 TOGAF ガイド（約 36KB）と同程度。

**Verify**: `bun run fix-markdown && bun run check-links` → exit 0。目視で全 Mermaid ブロックが ` ```mermaid ` フェンスで閉じていることを確認。

### Step 3: ナビと README への登録

- `web-next/components/site/nav-links.ts` の「アーキテクチャ」`children` 末尾に `{ name: "iSAQB CPSA 認定", href: "/architecture/isaqb-cpsa-certification-comprehensive-guide" }` を追加（既存要素と同じ書式・インデントに合わせる）。
- ルート `README.md` の「### 1. アーキテクチャ」リストに `- iSAQB CPSA Certification` を追記。

**Verify**: `cd web-next && bun run lint && bun run typecheck && bun run test` → すべて成功（nav-links には契約テスト `nav-links.test.tsx` があるため必ず実行）

### Step 4: コミット

Step 1–2 の成果を `docs(architecture): iSAQB CPSA 試験対策総合ガイドを追加`、Step 3 を `feat(web-next): ナビに iSAQB CPSA ガイドへのリンクを追加` として分割コミット（各コミット前に PII チェック）。

**Verify**: `git log --oneline -3` → 2 コミットが規約どおりの形式で存在

### Step 5（オプション）: web-next へのページ移植

`nextjs-page-migration` スキルの手順に従い、`web-next/app/architecture/isaqb-cpsa-certification-comprehensive-guide/page.tsx` + 契約テストを TDD（Red → Green → Refactor、フェーズごとにコミット）で作成する。exemplar: `web-next/app/general/comprehensive-guide/page.tsx`。

**Verify**: `cd web-next && bun run lint && bun run typecheck && bun run test && bun run build` → すべて成功

## Test plan

- コンテンツ層: リンクチェック（`bun run check-links`）と markdownlint が自動検証。
- Web 層（Step 3 以降）: 既存 `nav-links.test.tsx` がナビ構造の契約テストとして機能。Step 5 では移植ページの契約テスト（見出し数・セクション ID・外部リンクの `rel` 属性）を `page.test.tsx` として新規作成 — 構造パターンは `web-next/app/general/comprehensive-guide/page.test.tsx` に合わせる。

## Done criteria

- [ ] `architecture/isaqb-cpsa-certification-comprehensive-guide/isaqb-cpsa-certification-comprehensive-guide.md` が存在し、上記 10 章 + 対象試験バージョン表を含む
- [ ] `bun run check-links` が exit 0
- [ ] `grep -c '```mermaid' architecture/isaqb-cpsa-certification-comprehensive-guide/*.md` ≥ 5
- [ ] `cd web-next && bun run lint && bun run typecheck && bun run test` すべて成功
- [ ] In scope 外のファイルに変更がない（`git status` で確認）
- [ ] `plans/README.md` の 002 行が DONE に更新されている

## STOP conditions

以下の場合は停止して報告（即興禁止）:

- `architecture/` 配下に iSAQB 関連ディレクトリが既に存在する
- isaqb.org の公式カリキュラム構成が本計画記載の「4 本柱」と一致しない（カリキュラム大改訂の兆候 — ガイド構成の再設計が必要）
- nav-links.ts の構造が本計画記載の判別共用体型（NavLeaf/NavDropdown）から変わっている
- `bun run check-links` が公式 URL の 404 を報告する（改訂シグナル。Plan 001 決定 3 の運用に従いガイド構成を見直す）

## Maintenance notes

- iSAQB はカリキュラムをバージョン管理して公開している。年 1 回、公式カリキュラム PDF の版数とガイド冒頭の「対象試験バージョン表」を突き合わせること。
- CPSA-A の 19 モジュールは追加・改廃がある（例: FM モジュールが後年追加）。第 7 章は「概観 + 公式リンク」に留めてあるため、モジュール一覧の詳細追随は不要という設計判断を維持する。
- レビュー観点: 既存 6 ガイドへの相対リンクがリンクチェックを通ること、模擬問題が公式問題の転載でないこと（著作権）。

## 参考文献・ソース一覧

- [iSAQB 公式サイト](https://www.isaqb.org/)
- [CPSA-Foundation Level 試験形式](https://www.isaqb.org/certifications/cpsa-exams/foundation-level-exam/)
- [CPSA-F 公式カリキュラム PDF](https://public.isaqb.org/curriculum-foundation/curriculum-foundation-en.pdf)
- [CPSA-Advanced Level モジュール](https://www.isaqb.org/certifications/cpsa-certifications/cpsa-advanced-level/)
- [CPSA 資格レベル概観](https://www.isaqb.org/certifications/cpsa-certifications/)
