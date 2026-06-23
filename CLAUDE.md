# CLAUDE.md

このファイルは、本リポジトリでコードを作業する際に Claude Code (claude.ai/code) へガイドラインを提供します。

## このリポジトリの性質

ソフトウェアアーキテクチャ・設計原則・開発手法の**日本語ドキュメントガイド集**と、それを Web 化する Next.js アプリからなる二層構造のリポジトリです。

- **コンテンツ層**: `architecture/`, `design-principles/`, `development-methodologies/`, `product-and-enterprise/`, `general/`, `css-design-system-guide/` にカテゴリ別ガイドを配置。各トピックは `kebab-case-comprehensive-guide/` ディレクトリに同名の `.md` と（移植済みなら）`.html` のペアを持つ。
- **Web 層**: `web-next/` が静的 HTML ガイドを Next.js 16 App Router ページへ移植する。

ルート（Bun スクリプト + Markdown 検証）と `web-next/`（Next.js）は**独立したパッケージ**で、それぞれ別の依存・コマンドを持つ。

## コマンド

### ルート（コンテンツ検証 / Bun）

```bash
bun run check-links      # Markdown 内の外部リンク有効性チェック (scripts/verify-links.ts)
bun run format-markdown  # Markdown 整形 (scripts/format-markdown.ts)
bun run fix-markdown     # markdownlint エラー自動修正 (scripts/fix-markdown-errors.ts)
```

スクリプトは `.ts` のまま `bun` で直接実行する（トランスパイル不要）。設定: `.markdownlint.json`, `.markdown-link-check.json`。

### web-next（Next.js）

```bash
cd web-next
bun run dev        # http://localhost:3000/general/comprehensive-guide
bun run test       # Vitest（契約テスト + コンポーネントテスト）
bun run test:watch # 単一テストは Vitest のフィルタで: bun run test -- <pattern>
bun run lint       # Biome（lint）/ lint:fix で自動修正
bun run typecheck  # tsc --noEmit
bun run build      # production build
```

移行作業の検証は `lint` / `typecheck` / `test` / `build` の**全通過が必須**。

## 絶対ルール（OVERRIDE 不可）

1. **JavaScript 禁止**: スクリプト・ツールは必ず TypeScript (`.ts`)。ランタイムは Bun。
2. **絶対パス禁止**: コミット対象ファイルにユーザー名を含む絶対パス (`/Users/...`, `/home/...`) を書かない。リポジトリ相対パスを使う。詳細・コミット前検証コマンドは `.claude/rules/no-absolute-paths.md`。
3. **PII / 機密情報の排除**: 氏名・メール・認証情報をハードコードしない。コード例はプレースホルダー（`user@example.com`, `YOUR_API_KEY`）を使う。
4. **コード例の標準スタック**: Backend = Python (FastAPI/SQLAlchemy/Pydantic)、Frontend = TypeScript (React)、Testing = pytest/pytest-bdd。ドキュメントは日本語で記述し、Mermaid 図と動作可能なコードスニペットを含める。

## TDD コミットワークフロー（必須）

実装系タスク（「実装せよ」「移行せよ」）は `.claude/rules/tdd-commit-workflow.md` に従う。**最優先ルール**として計画へ組み込むこと。

- **Red → Green → Refactor** を厳守。Red（失敗テスト）を経ないコードは「未完了」とみなす。
- **一括コミット厳禁**。論理フェーズごとに `git commit`。`test: ...` → `feat/fix: ...` → `refactor: ...` の順。
- フェーズ完了時は `GEMINI.md` / `README.md` 等の主要仕様書を同期（`.claude/skills/spec-sync/`）。
- ルール違反に気づいたら**自律的に `git reset` せず**、ユーザーへ報告し承認を得る。

## web-next 移行パターン

HTML → page.tsx の移行は `.claude/skills/nextjs-page-migration/SKILL.md` の手順に従う。要点:

- スタイルは `app/globals.css` のデザイントークン + ページスコープクラス（Tailwind v4 + Biome）。
- Mermaid 図は `components/MermaidDiagram.tsx` でクライアント描画（依存: `mermaid@10.9.6`）。
- 外部リンクは `components/Ext.tsx` 経由で `rel="noopener noreferrer"` を保証。
- アイコンは `@tabler/icons-react`。コードハイライトは手書き `span` を維持。
- テストは Vitest + Testing Library による契約テスト（`*.test.tsx` を実装ファイルと同階層に配置）。

## ドキュメント規約

- ファイル名は `kebab-case-comprehensive-guide.md` 形式。関連資産はトピック名ディレクトリにまとめる。
- 各ガイド末尾に「参考文献・ソース一覧」を明記。作成者情報はフッターに統一形式で記載。
- CI: GitHub Actions が push / PR / 毎週月曜にリンクチェックを実行。

## 参考文献・ソース一覧

- 開発規約: [GEMINI.md](./GEMINI.md)
- プロジェクト情報: [README.md](./README.md)
- TDDワークフロー規約: [.claude/rules/tdd-commit-workflow.md](./.claude/rules/tdd-commit-workflow.md)
- 絶対パス禁止規約: [.claude/rules/no-absolute-paths.md](./.claude/rules/no-absolute-paths.md)
- Next.jsページ移行スキル: [.claude/skills/nextjs-page-migration/SKILL.md](./.claude/skills/nextjs-page-migration/SKILL.md)
