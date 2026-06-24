# Software Architecture Design - Comprehensive Guide

このプロジェクトは、ソフトウェアアーキテクチャ、デザイン原則、開発手法、およびプロダクト/エンタープライズ管理に関する包括的な知識を体系化したガイド集です。

## プロジェクトの目的

現代のソフトウェア開発において必要とされる、堅牢で拡張性の高いシステム設計と効果的な開発プロセスのベストプラクティスを網羅的に提供することを目的としています。

## コンテンツ構造

リポジトリは以下のカテゴリに分類されています：

### 1. アーキテクチャ (`architecture/`)

さまざまなシステム構造とその適用例を詳しく解説しています。
- Clean Architecture
- Event-Driven Architecture (EDA)
- Hexagonal Architecture
- Microservices Architecture
- Monolithic Architecture
- Service-Oriented Architecture (SOA)

### 2. デザイン原則 (`design-principles/`)

優れたソフトウェア設計の基礎となる原則とパターンを扱います。
- API-First Design
- Component-Oriented Development
- Domain-Driven Design (DDD)
- Object-Oriented Programming (OOP)

### 3. 開発手法 (`development-methodologies/`)

チームが価値を届けるためのプロセスのガイドです。
- Behavior-Driven Development (BDD)
- Extreme Programming (XP)
- Feature-Driven Development (FDD)
- Test-Driven Development (TDD)

### 4. プロダクト & エンタープライズ (`product-and-enterprise/`)

ビジネス価値の創出と組織規模での設計に関するガイドです。
- Minimum Viable Product (MVP)
- TOGAF Certification (Enterprise Architecture)

### 5. 一般・デザインシステム

- 総合ガイド (`general/comprehensive-guide/`)
- CSS デザインシステムガイド (`css-design-system-guide/`)

## Web アプリ (`web-next/`)

静的 HTML ガイドを Next.js (App Router) ページとして再実装する Web アプリです。
Next.js 16 + React 19 + TypeScript で構築し、Biome（lint/format）と Vitest +
Testing Library（契約テスト）を採用しています。

- 移行済みページ:
  - [`/general/comprehensive-guide`](web-next/app/general/comprehensive-guide/page.tsx)
    — `general/comprehensive-guide/comprehensive-guide.html` を忠実移植（12 セクション・
    Mermaid 図・コードハイライト・国際資格ガイド）
  - [`/architecture/event-driven-architecture-comprehensive-guide`](web-next/app/architecture/event-driven-architecture-comprehensive-guide/page.tsx)
    — EDA 完全ガイドを移植（16 セクション・Mermaid 18 図・table 7・コードブロック 6）。
    固定サイドバー・進捗バー・scroll-spy を [`EdaSidebar.tsx`](web-next/app/architecture/event-driven-architecture-comprehensive-guide/EdaSidebar.tsx) でクライアント描画
  - [`/architecture/clean-architecture-comprehensive-guide`](web-next/app/architecture/clean-architecture-comprehensive-guide/page.tsx)
    — クリーンアーキテクチャ完全ガイドを移植（14 セクション・Mermaid 15 図・table 4・コードブロック 7）。
    固定サイドバー・進捗バー・scroll-spy を [`CleanArchitectureSidebar.tsx`](web-next/app/architecture/clean-architecture-comprehensive-guide/CleanArchitectureSidebar.tsx) でクライアント描画
  - [`/architecture/service-oriented-architecture-comprehensive-guide`](web-next/app/architecture/service-oriented-architecture-comprehensive-guide/page.tsx)
    — SOA 完全ガイドを移植（17 セクション・Mermaid 20 図・table 8・コードブロック 5）。
    固定サイドバー・進捗バー・scroll-spy を [`SoaSidebar.tsx`](web-next/app/architecture/service-oriented-architecture-comprehensive-guide/SoaSidebar.tsx) でクライアント描画
  - [`/architecture/hexagonal-architecture-comprehensive-guide`](web-next/app/architecture/hexagonal-architecture-comprehensive-guide/page.tsx)
    — ヘキサゴナルアーキテクチャ完全ガイドを移植（15 セクション・Mermaid 14 図・table 6・コードブロック 11）。
    固定サイドバー・進捗バー・scroll-spy を [`HexagonalArchitectureSidebar.tsx`](web-next/app/architecture/hexagonal-architecture-comprehensive-guide/HexagonalArchitectureSidebar.tsx) でクライアント描画
  - [`/architecture/microservices-architecture-comprehensive-guide`](web-next/app/architecture/microservices-architecture-comprehensive-guide/page.tsx)
    — マイクロサービス完全ガイドを移植（18 セクション・Mermaid 22 図・table 8・コードブロック 9）。
    固定サイドバー・進捗バー・scroll-spy を [`MicroservicesArchitectureSidebar.tsx`](web-next/app/architecture/microservices-architecture-comprehensive-guide/MicroservicesArchitectureSidebar.tsx) でクライアント描画
- 全ページ共通のグローバルナビ + ディスクレーマーを [`layout.tsx`](web-next/app/layout.tsx) に常設。
  全カテゴリ・全ガイド（未移行ページ含む。現状アクセスすると 404）を
  [`components/site/nav-links.ts`](web-next/components/site/nav-links.ts) で定義し、
  [`SiteHeader.tsx`](web-next/components/site/SiteHeader.tsx) /
  [`SiteHeaderClient.tsx`](web-next/components/site/SiteHeaderClient.tsx)（ハンバーガー・ドロップダウン開閉）と
  [`DisclaimerBanner.tsx`](web-next/components/site/DisclaimerBanner.tsx)（学習用注意書き・`ch-*` スタイル）で描画
- Mermaid 図はクライアント描画（[`components/MermaidDiagram.tsx`](web-next/components/MermaidDiagram.tsx)）、
  外部リンクは [`components/Ext.tsx`](web-next/components/Ext.tsx) で `rel=noopener noreferrer` を保証
- スタイルは [`app/globals.css`](web-next/app/globals.css) のデザイントークン + ページスコープクラス、
  アイコンは `@tabler/icons-react`

```bash
cd web-next
bun install
bun run dev        # http://localhost:3000/general/comprehensive-guide
bun run test       # 契約テスト + コンポーネントテスト
bun run lint       # Biome
bun run typecheck  # tsc --noEmit
bun run build      # production build
```

新規ページの移行・保守手順は `.claude/skills/nextjs-page-migration/SKILL.md` を参照してください。

## メンテナンス

このプロジェクトでは、ドキュメントの品質を維持するために自動化ツールを使用しています。

### リンクチェック

Markdownファイル内の外部リンクが有効であることを確認するために、カスタムTypeScriptスクリプト `verify-links`（[scripts/verify-links.ts](scripts/verify-links.ts)）を使用しています。

実行するには、`package.json` に定義されている `check-links` スクリプトを使うか、直接スクリプトを `bun` で実行します。

```bash
# package.json のスクリプトを使用する場合
bun run check-links

# スクリプトファイルを直接実行する場合
bun ./scripts/verify-links.ts
```

### リンティング

Markdownのスタイルを統一するために `markdownlint` を使用しています（設定ファイル: `.markdownlint.json`）。

## ライセンス

本プロジェクトは個人学習用の資料です。掲載されている情報の利用により生じた、いかなる損害についても一切の責任を負いません。内容の正確性、完全性、最新性については、利用者自身で確認した上で利用してください。

---

## References/Sources List

- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **React**: [React 19 Documentation](https://react.dev)
- **TypeScript**: [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- **Biome**: [Biome Analyzer](https://biomejs.dev)
- **Vitest**: [Vitest](https://vitest.dev)
- **Testing Library**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Mermaid**: [Mermaid.js](https://mermaid.js.org)
- **Tabler Icons**: [Tabler Icons React](https://tabler.io/icons)
