# Netlify デプロイ準備 + 著作権・法務対応

> **本セッションの作業範囲**: 実装は行わない。本計画書を `.claude/plans/netlify-deploy-preparation.md`（既存の追跡対象計画書置き場）として配置するのみ。コミットは指示があるまで行わない。以下の Phase 1〜5 は後続セッションで実施する。

## Context
web-next/（Next.js 16）を Netlify で一般公開する。公開前に著作権・商標・海賊版リンク等を監査した結果（Explore×3 + 裏取り済）:
- **重大**: 海賊版/違法アップロード系への言及・リンク（flylib.com、dokumen.pub、書籍スキャン archive.org、ExamTopics 推奨）
- **書籍ガイド9件**が原著の全章構成をミラー（翻案権・編集著作物リスク）→ ユーザー判断で**公開除外**。git 追跡外にするが**ローカルでは全件閲覧可能**に保つ
- サイト全体に ©・商標・非提携表記・第三者ライセンス表記が無い
- その他ガイドは独自要約・Mermaid 自作図・画像なし・トラッキングなしで低リスク

ユーザー決定: 除外9件 / All rights reserved / 静的エクスポート / リポジトリは public 維持（git 履歴には残る点は了承済）。

## 公開範囲
- 除外（ローカル専用）: sql-antipatterns, generative-ai-design-patterns, database-design-for-mere-mortals, architecting-generative-ai-applications, data-warehouse-toolkit, database-internals, high-performance-mysql, nosql-distilled, refactoring-databases（すべて `app/recommended-books/` 配下）
- 公開する書籍ガイド: building-applications-with-ai-agents, building-llm-powered-applications, graph-databases

## 実装（TDD: test → feat/fix → refactor をフェーズごとにコミット）

### Phase 1: ローカル専用ガイドの仕組み
- `lib/guide-catalog.ts` の `GuideEntry` に `localOnly?: true` を追加し除外9件に付与。`lib/guide-visibility.ts`（新規）に `isLocalGuidesEnabled()`（`process.env.NEXT_PUBLIC_INCLUDE_LOCAL_GUIDES === "1"`）と `visibleEntries()` を置き、`app/GuideExplorer.tsx`・`components/site/nav-links.ts` の双方で同じフィルタを使う（nav 側も同 9 件に `localOnly` を付ける）
- テスト先行: フラグ無しで9件が索引/ナビに出ない・フラグ有りで出る。既存 `lib/guide-catalog.test.ts`（published 36件）、`lib/guide-catalog-nav.test.ts`、`components/site/nav-links.test.ts` の件数期待を更新
- 9ディレクトリを `web-next/.gitignore` に列挙し `git rm -r --cached`（ファイルは残る）。`.env*.local` も `web-next/.gitignore` に追加（現状未記載）
- ローカル用 `web-next/.env.local` に `NEXT_PUBLIC_INCLUDE_LOCAL_GUIDES=1` を作成（追跡外）
- 追跡ファイル（GEMINI.md / README.md / docs / .claude/skills 等）からの除外ページ参照を grep し、必要箇所だけ「ローカル専用」と注記

### Phase 2: サイト共通の法務表記
- `components/site/SiteFooter.tsx`（新規・layout.tsx に配置）:「© 2026 myoshi2891 All rights reserved.」「引用・参考文献の著作権は各権利者に帰属」「記載の会社名・製品名は各社の商標または登録商標」「各書籍・団体の公式資料ではなく、著者・出版社・認定団体とは無関係」＋ `/licenses` へのリンク
- `app/licenses/page.tsx`（新規）: 実行時依存（next, react, react-dom, mermaid と主要 transitive: d3=ISC, dompurify=MPL-2.0/Apache-2.0, katex/cytoscape 等 MIT, @tabler/icons-react=MIT, フォント4種=SIL OFL 1.1）の名称・ライセンス・著作権者。テストで `package.json` の dependencies が全て列挙されていることを保証
- `components/site/UnofficialBookNotice.tsx`（新規）: 書名・著者・出版社を受け「非公式の学習ノート／著者・出版社とは無関係／原著の購入を推奨」を表示。公開3書籍ガイドの冒頭に配置

### Phase 3: コンテンツ修正（公開対象のみ・外科的差分）
| ファイル | 修正 |
|---|---|
| `app/product-and-enterprise/togaf-certification-comprehensive-guide/page.tsx` | ExamTopics 削除（:1501, :1678）、®・非公式表記を冒頭にも配置／初出に ®、試験配分表に「筆者による目安」注記、Zachman® を商標表記に追加 |
| 同 `TogafGuideShell.tsx:75` | バッジ「TOGAF v10」→ 公式風にならない表現 |
| `app/certification-exams/ai-native-value-architect-guide/page.tsx` | SAFe®/Scaled Agile, Inc. の商標表記追加（:190, :1924 付近） |
| `app/design-principles/designing-multi-agent-systems-guide/page.tsx` | 同名書籍との混同回避で英語サブタイトル調整（:8, :631）、Pantazis 書籍エントリ（:2013）を削除 |
| `app/design-principles/object-oriented-programming-comprehensive-guide/page.tsx` | OCP(Meyer)/ISP/DIP(Martin) の出典付記（:888, :1071, :1123）。hexagonal :894 も同様 |
| `app/architecture/service-oriented-architecture-comprehensive-guide/page.tsx:1937` | `IconBrandCashapp` → 汎用アイコン |
| `app/architecture/clean-architecture-comprehensive-guide/page.tsx:561` | 図に「Robert C. Martin (2012) の概念を基に作図」キャプション |
| `app/recommended-books/building-llm-powered-applications-guide/page.tsx:491` | 出版社表記を Packt に訂正 |
- 各修正は先に契約テスト（該当 `page.test.tsx`）で文言の有無を assert → 修正。加えて `tests/legal-guard.test.ts`（新規）で追跡対象 app/ 配下に `flylib|dokumen\.pub|examtopics|archive\.org/details` が無いことを恒久ガード

### Phase 4: Netlify 設定
- `web-next/next.config.ts`: `output: "export"` を追加（動的機能・next/image・middleware なしを確認済）
- `netlify.toml`（リポジトリルート）: `base = "web-next"`, `publish = "out"`, `NODE_VERSION = "22"`, 基本セキュリティヘッダ（X-Content-Type-Options / Referrer-Policy / X-Frame-Options / Permissions-Policy）。CSP は Mermaid のインラインスタイルを壊すため見送り
- **パッケージマネージャ**: bun.lock は追跡外のため Netlify は npm で解決する。npm は `overrides` と直接依存（postcss）の不一致で EOVERRIDE になり得るので、実行時にクリーンクローンで `npm install && npm run build` を検証。通らない場合は `overrides` の調整で解決し、それでも不可なら web-next/bun.lock の追跡化をユーザーに確認（方針変更のため）

### Phase 5: ドキュメント同期
- README.md / GEMINI.md / CLAUDE.md にデプロイ手順・ローカル専用ガイドの仕組み（`.env.local` フラグ）を追記（spec-sync スキル）

## 検証
1. web-next で `bun run lint` / `typecheck` / `test` / `build` 全通過、ルートで `bun run test` / `bun run audit`
2. **Netlify 再現**: スクラッチパッドへ `git clone` したクリーン環境（archive/・追跡外ガイド・.env.local なし）で install + build → `out/` に除外9 slug が無いこと、`grep -r` で flylib/dokumen/ExamTopics/書籍スキャン URL が無いこと
3. ローカル（.env.local あり）で `bun run dev` → 索引に全書籍ガイドが表示・遷移可能をスクリーンショット確認（Playwright、snapshot は使わない）
4. `out/` を静的サーバで配信し、トップ・/licenses・TOGAF ページを目視確認
5. 各コミット前に `.claude/rules/no-absolute-paths.md` の差分チェック

## ユーザー作業（実装後）
- Netlify でサイト作成 → GitHub リポジトリ連携（設定は netlify.toml を自動読込）、デプロイブランチ（main）の指定
- dev → main のマージ／PR（指示があれば作成）
- 注意: 除外9件は git 履歴からは参照可能なまま（public 維持の判断に基づく）
