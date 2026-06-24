# Software Architecture Design - Project Instructions

このプロジェクトは、ソフトウェアアーキテクチャおよび設計原則に関する包括的なガイドラインを管理するドキュメントリポジトリです。
このファイルに記載された指示は、AIエージェントが作業を行う際の**絶対的なルール**として機能します。

## 🏛 アーキテクチャと設計の原則

### 1. ドキュメント構成

- 各ガイドは、特定のトピック（DDD, Clean Architecture, TDD等）に焦点を当て、初学者から上級者までを対象とした内容にする。
- 視覚的な理解を助けるため、Mermaidを使用したダイアグラムを積極的に活用する。
- 実践的な理解のため、動作可能なコードスニペットを必ず含める。
- 詳細は `docs/development-rules.md` も参照すること。

### 2. スクリプト開発と技術スタック

- **JavaScript の使用禁止:** 新規スクリプトの作成、または既存スクリプトの修正において、JavaScript (`.js`) を使用してはならない。必ず **TypeScript (`.ts`)** を使用すること。
- **実行環境:** ランタイムとして **Bun** を標準とする。TypeScript ファイルは `bun` コマンドで直接実行すること。
- **コード例の標準スタック:**
  - **Backend:** Python (FastAPI, SQLAlchemy, Pydantic)
  - **Frontend:** TypeScript (React)
  - **Testing:** pytest, pytest-bdd
  - **Runtime:** Bun (スクリプトおよびツール用)

### 3. 命名規則

- **ファイル名:** `kebab-case-comprehensive-guide.md` の形式。
- **ディレクトリ:** 関連する資産がある場合はトピック名のディレクトリを作成する（例: `css-design-system-guide/`）。

## 🛠 ワークフロー

### 1. リンク検証

ドキュメント内にある外部リンクの有効性を確認するために、以下のコマンドを実行する。

```bash
bun run check-links
```

このコマンドは `scripts/verify-links.ts` を実行する。

### 2. CI/CD

- GitHub Actions を使用して、プッシュ時およびプルリクエスト時に自動的にリンクチェックを実行する。
- 毎週月曜日にスケジュール実行を行い、リンク切れを早期に発見する。

### 3. Web アプリ (`web-next/`) の開発

- 静的 HTML ガイドを Next.js 16 (App Router) + React 19 のページへ移行する Web アプリ。
- 移行済み:
  - `app/general/comprehensive-guide/page.tsx`（URL `/general/comprehensive-guide`）。
  - `app/architecture/event-driven-architecture-comprehensive-guide/page.tsx`
    （URL `/architecture/event-driven-architecture-comprehensive-guide`）。固定サイドバー +
    進捗バー + scroll-spy をクライアントコンポーネント（`EdaSidebar.tsx`）に分離。
  - `app/architecture/clean-architecture-comprehensive-guide/page.tsx`
    （URL `/architecture/clean-architecture-comprehensive-guide`）。固定サイドバー +
    進捗バー + scroll-spy をクライアントコンポーネント（`CleanArchitectureSidebar.tsx`）に分離。
  - `app/architecture/service-oriented-architecture-comprehensive-guide/page.tsx`
    （URL `/architecture/service-oriented-architecture-comprehensive-guide`）。固定サイドバー +
    進捗バー + scroll-spy をクライアントコンポーネント（`SoaSidebar.tsx`）に分離。
  - `app/architecture/hexagonal-architecture-comprehensive-guide/page.tsx`
    （URL `/architecture/hexagonal-architecture-comprehensive-guide`）。固定サイドバー +
    進捗バー + scroll-spy をクライアントコンポーネント（`HexagonalArchitectureSidebar.tsx`）に分離。
  - `app/architecture/microservices-architecture-comprehensive-guide/page.tsx`
    （URL `/architecture/microservices-architecture-comprehensive-guide`）。固定サイドバー +
    進捗バー + scroll-spy をクライアントコンポーネント（`MicroservicesArchitectureSidebar.tsx`）に分離。
- 全ページ共通のグローバルナビ + ディスクレーマーを `app/layout.tsx` に常設。ナビ定義は
  `components/site/nav-links.ts`（zod 不使用の判別共用体型、未移行ページへのリンクも意図的に含む。
  現状 404 は許容）。描画は `SiteHeader.tsx` / `SiteHeaderClient.tsx` / `DisclaimerBanner.tsx`、
  スタイルは `globals.css` の `ch-*` クラス。
- 移行は **TDD**（`.claude/rules/tdd-commit-workflow.md`）に従い、契約テスト（Vitest +
  Testing Library）を Red→Green→Refactor で進める。詳細手順は
  `.claude/skills/nextjs-page-migration/SKILL.md` を参照。
- 検証は `web-next/` 配下で `bun run lint` / `bun run typecheck` / `bun run test` /
  `bun run build` の全通過を必須とする。Lint/Format は Biome。
- スタイルは `app/globals.css` のデザイントークン + ページスコープクラス。アイコンは
  `@tabler/icons-react`、Mermaid はクライアント描画、コードハイライトは手書き span を維持する。

## 📝 規約

- すべてのドキュメントは日本語で記述する。
- 引用元や参考資料は、セクションの末尾に「参考文献・ソース一覧」として明記する。
- 作成者情報はフッターに統一された形式で記載する。

### 1. PII（個人を特定できる情報）・機密情報の排除

- **定義**: 氏名、メールアドレス、電話番号、住所などの個人情報、ローカルマシンの絶対パス（例: `file:///Users/username/...`）やユーザー名、各種認証情報（APIキー、パスワード、トークン、秘密鍵）などを指す。
- **絶対パスの禁止**: ローカルの絶対パスは絶対に使用せず、すべてリポジトリ相対パス（例: `./scripts/verify-links.ts`）で記述すること。
- **プレースホルダーの活用**: テスト用データやコード例では、実在しない架空の値（例: `user@example.com`）やプレースホルダー（例: `YOUR_API_KEY`）を使用すること。
- **環境変数の利用**: 認証キーなどはコード内にハードコードせず、環境変数から読み込むように設計すること。
- **コミット前の検証**: コミットを行う前に `git diff` を確認し、個人の環境名や絶対パス、認証情報が含まれていないか確認すること。

---

## 参考文献・ソース一覧

- **TDDワークフロー**: [tdd-commit-workflow.md](./.claude/rules/tdd-commit-workflow.md)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **React**: [React 19 Documentation](https://react.dev)
- **Vitest**: [Vitest](https://vitest.dev)
- **Testing Library**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Biome**: [Biome Analyzer](https://biomejs.dev)
- **Tabler Icons**: [Tabler Icons React](https://tabler.io/icons)
- **Mermaid**: [Mermaid.js](https://mermaid.js.org)
