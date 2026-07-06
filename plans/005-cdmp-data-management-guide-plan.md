# Plan 005: CDMP データマネジメントガイドを新規作成し data-management カテゴリを新設する

> **Executor instructions**: 本計画をステップ順に実行し、各ステップの検証コマンドを実行して期待結果を確認してから次へ進むこと。「STOP conditions」に該当したら即座に停止して報告する。完了時に `plans/README.md` の自分の行の Status を更新すること。
>
> **Drift check（最初に実行）**: `git diff --stat 06ca17c..HEAD -- web-next/components/site/nav-links.ts README.md`
> リポジトリルートに `data-management/` が既に存在する場合は STOP（重複作成防止）。

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: LOW（新規カテゴリ追加。既存ファイルへの変更は nav-links.ts と README.md の追記に限定）
- **Depends on**: plans/001-certification-platform-roadmap.md（決定 1: カテゴリ新設）
- **Category**: direction
- **Planned at**: commit `06ca17c`, 2026-07-06

## Why this matters

データ・データベース設計はアーキテクト 4 領域の一つであり、その国際標準資格が DAMA International の CDMP（Certified Data Management Professional）である。本プラットフォームにはデータマネジメント領域のカテゴリが存在せず、DDD ガイド等でデータモデリングに触れる程度に留まる。DMBOK（Data Management Body of Knowledge）の知識領域を体系的に扱うガイドを新設することで、4 領域の最後のピースが埋まる。

## Current state

- リポジトリルートに `data-management/` は存在しない。`web-next/app/data-management/` も存在しない。
- カテゴリ新設の三点セット（ルートディレクトリ + web-next ルート + nav-links ドロップダウン）の手順は Plan 003 と同型。Plan 003 が先に完了していれば、その差分（コミット履歴）が具体的な exemplar になる。
- 資格ガイドの章立て exemplar: `product-and-enterprise/togaf-certification-comprehensive-guide/togaf-certification-comprehensive-guide.md`。
- ドキュメント規約: 日本語、Mermaid 図 + 動作可能なコードスニペット。**本ガイドはコード例と相性が良い**: 標準スタックの Python (SQLAlchemy/Pydantic) がデータモデリング・データ品質検証の実例に直結する。SQL はパラメータ化クエリで記述（セキュリティ規約）。
- ナビ定義: `web-next/components/site/nav-links.ts` — `NavDropdown` 追加形式。未移植リンクの先行追加は許容。

### 試験の事実（2026-07-06 確認、ガイド本文に使用する一次情報）

- **CDMP の 3 レベル**: Associate（入門）/ Practitioner（複数知識領域の深い理解 + 実務経験）/ Master（高得点 + 豊富な実務経験・リーダーシップ）。
- **全レベル共通の必須試験**: Data Management Fundamentals — 100 問・90 分・311 USD。合格スコア帯でレベルが決まる（Associate 60%+、Practitioner/Master はより高いスコア + Specialty 試験）。
- **Specialty 試験**: Practitioner / Master 認定には Fundamentals に加えて Specialty 試験（データガバナンス、データモデリング、データ品質、メタデータ等から選択）が必要。
- **知識体系**: DAMA-DMBOK（第 2 版、改訂版あり）。データガバナンスを中心に据えた 11 知識領域（データアーキテクチャ、データモデリング & デザイン、データストレージ & オペレーション、データセキュリティ、データ統合と相互運用性、ドキュメント & コンテンツ管理、参照データ & マスターデータ、DWH & BI、メタデータ、データ品質、データガバナンス）で構成される。DAMA ホイール図が体系の定番表現。
- ガイド冒頭に「対象試験バージョン表」（DMBOK 版数 + 確認日）を置くこと（Plan 001 決定 3）。

## Commands you will need

| 目的 | コマンド | 成功条件 |
|---|---|---|
| リンク検証 | ルートで `bun run check-links` | exit 0 |
| Markdown 修正 | `bun run fix-markdown` | exit 0 |
| Web 層検証（Step 3 以降） | `cd web-next && bun run lint && bun run typecheck && bun run test && bun run build` | すべて成功 |

## Suggested executor toolkit

- `markdown-formatter` スキル、`fix-mermaid` スキル（DAMA ホイールを Mermaid で表現する際の構文エラーに注意）
- Step 5（移植）実施時: `nextjs-page-migration` スキル（必読）

## Scope

**In scope**:

- `data-management/cdmp-data-management-comprehensive-guide/cdmp-data-management-comprehensive-guide.md`（新規。カテゴリディレクトリごと新設）
- `web-next/components/site/nav-links.ts`（新ドロップダウン「データマネジメント」の追加のみ）
- `README.md`（コンテンツ構造セクションへのカテゴリ追記のみ）
- `plans/README.md`（Status 更新）
- （オプション Step 5）`web-next/app/data-management/cdmp-data-management-comprehensive-guide/` 配下の新規ファイル

**Out of scope**:

- DMBOK 本文の翻訳・転載（著作権。知識領域の構造と要点を独自の言葉と図で解説する）
- 既存 DDD ガイド（`design-principles/domain-driven-design-comprehensive-guide/`）の変更 — 相互リンクは新ガイド側から張る
- CDMP Specialty 試験の各論ガイド（将来の拡張候補として Maintenance notes に記録）

## Git workflow

- 現行ブランチ（`dev`）上で作業。push は指示があるまで行わない。
- コミット分割: `docs(data-management): ...`（ガイド本文）、`feat(web-next): ...`（ナビ追加）。
- 各コミット前に PII チェック: `git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'` → 出力なし。

## Steps

### Step 1: カテゴリディレクトリとガイド骨子の作成

`data-management/cdmp-data-management-comprehensive-guide/cdmp-data-management-comprehensive-guide.md` を以下の章立てで作成:

1. データマネジメントと CDMP の全体像（DAMA ホイールの 11 知識領域を Mermaid で）
2. 対象試験バージョン表 + 試験の種類と概要（3 レベル、Fundamentals 100 問/90 分、Specialty 試験の仕組み）
3. データガバナンス（中心領域。組織・ポリシー・スチュワードシップ）
4. データアーキテクチャとデータモデリング（概念/論理/物理モデル。SQLAlchemy による物理モデル例）
5. データストレージ & オペレーション / データ統合（ETL/ELT、CDC の概観）
6. マスターデータ・参照データ・メタデータ管理
7. データ品質（品質次元、プロファイリング。Pydantic によるバリデーション実例）
8. データセキュリティとプライバシー（分類、マスキング。センシティブデータのログ出力禁止等の実装規約と接続）
9. DWH・BI とモダンデータスタックの概観
10. 試験対策・ベストプラクティス（レベル別の狙い方: まず Fundamentals で Associate、スコアと Specialty で Practitioner へ）
11. 学習ロードマップ（週次プラン）
12. 参考文献・ソース一覧（dama.org / cdmp.info の公式 URL 必須）

**Verify**: `bun run fix-markdown && bun run check-links` → exit 0

### Step 2: 本文の執筆

各章を執筆。Mermaid 図を少なくとも 6 点（DAMA ホイール、ガバナンス組織、モデリング 3 層、データリネージ、品質管理サイクル、学習フロー）。コード例は Python（SQLAlchemy モデル、Pydantic バリデータ、パラメータ化 SQL）で最低 3 点。

**Verify**: `bun run fix-markdown && bun run check-links` → exit 0

### Step 3: ナビと README への登録

- `nav-links.ts` の `navLinks` 配列（「クラウド & インフラ」の後ろ。Plan 003 未実施なら「プロダクト & エンタープライズ」の後）に追加:

```ts
{
  name: "データマネジメント",
  children: [
    {
      name: "CDMP & DMBOK 総合ガイド",
      href: "/data-management/cdmp-data-management-comprehensive-guide",
    },
  ],
},
```

- ルート `README.md` の「コンテンツ構造」に「### データマネジメント (`data-management/`)」セクションを追記。

**Verify**: `cd web-next && bun run lint && bun run typecheck && bun run test` → すべて成功

### Step 4: コミット

`docs(data-management): CDMP・DMBOK データマネジメント総合ガイドを追加` と `feat(web-next): ナビにデータマネジメントカテゴリを追加` に分割コミット（各コミット前に PII チェック）。

**Verify**: `git log --oneline -3` → 2 コミットが規約形式で存在

### Step 5（オプション）: web-next へのページ移植

`nextjs-page-migration` スキルに従い `web-next/app/data-management/cdmp-data-management-comprehensive-guide/page.tsx` + 契約テストを TDD で作成。新カテゴリのため globals.css にページスコープクラスを新設。exemplar: `web-next/app/general/comprehensive-guide/page.tsx`。

**Verify**: `cd web-next && bun run lint && bun run typecheck && bun run test && bun run build` → すべて成功

## Test plan

- コンテンツ層: `bun run check-links` + markdownlint。
- Web 層: `nav-links.test.tsx` が新ドロップダウン追加後も通ること。Step 5 では `page.test.tsx` を general/comprehensive-guide のパターンで新規作成。

## Done criteria

- [ ] `data-management/cdmp-data-management-comprehensive-guide/cdmp-data-management-comprehensive-guide.md` が存在し、12 章 + 対象試験バージョン表を含む
- [ ] `bun run check-links` exit 0
- [ ] `grep -c '```mermaid' data-management/cdmp-data-management-comprehensive-guide/*.md` ≥ 6
- [ ] Python コード例（```python フェンス）が 3 点以上
- [ ] `cd web-next && bun run lint && bun run typecheck && bun run test` すべて成功
- [ ] In scope 外のファイルに変更がない（`git status`）
- [ ] `plans/README.md` の 005 行が DONE に更新されている

## STOP conditions

- ルートに `data-management/` が既に存在する
- DAMA が試験体系を変更している（例: Fundamentals の問題数・レベル構成の変更、DMBOK 第 3 版の正式リリース）— 計画の事実表を更新し報告してから続行
- nav-links.ts の型構造（NavLeaf/NavDropdown）が変わっている
- DMBOK の図表・本文を転載しないと成立しない章がある（著作権上 STOP。独自図解への置き換え方針の確認を仰ぐ）

## Maintenance notes

- DMBOK は改訂版が随時出る（第 2 版改訂版が現行）。年 1 回、dama.org とガイド冒頭のバージョン表を突き合わせること。
- 将来拡張の候補（本計画では見送り）: Specialty 試験別の各論ガイド（データガバナンス、データモデリング）、SQL/DB 設計の実践ガイド。需要が確認できたら本カテゴリ配下に追加し、Plan 001 決定 4 の表に記録する。
- レビュー観点: DMBOK 用語の日本語訳の一貫性（データスチュワード等）、DAMA ホイール図が公式図の複製でなく独自表現であること。

## 参考文献・ソース一覧

- [DAMA CDMP 認定レベル](https://dama.org/certification/cdmp-certification-levels/)
- [DAMA CDMP について](https://dama.org/certification/about-cdmp-certification/)
- [CDMP 試験情報と料金](https://dama.org/certification/exam-information-and-pricing/)
- [CDMP 公式試験サイト](https://cdmp.info/exams/)
- [DAMA-DMBOK リソース](https://www.damadmbok.org/resources)
