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

ルート [`/`](web-next/app/page.tsx) は全ガイドの索引画面です。カテゴリ別に全 22 本を
一覧し、移行済みのページはリンク、未移行のページは「準備中」として非リンク表示します。
収録内容は [`lib/guide-catalog.ts`](web-next/lib/guide-catalog.ts) が単一の情報源で、
グローバルナビ [`nav-links.ts`](web-next/components/site/nav-links.ts) との
ページ集合の一致は契約テストで保証しています。

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
  - [`/architecture/monolithic-architecture-comprehensive-guide`](web-next/app/architecture/monolithic-architecture-comprehensive-guide/page.tsx)
    — モノリシックアーキテクチャ完全ガイドを移植（19 セクション・Mermaid 16 図・table 7・コードブロック 9）。
    固定サイドバー・進捗バー・scroll-spy を [`MonolithicArchitectureSidebar.tsx`](web-next/app/architecture/monolithic-architecture-comprehensive-guide/MonolithicArchitectureSidebar.tsx) でクライアント描画
  - [`/design-principles/api-first-design-comprehensive-guide`](web-next/app/design-principles/api-first-design-comprehensive-guide/page.tsx)
    — API-First設計完全ガイドを移植（16 セクション・Mermaid 27 図・table 10・コードブロック 7）。
    固定サイドバー・進捗バー・scroll-spy を [`ApiFirstSidebar.tsx`](web-next/app/design-principles/api-first-design-comprehensive-guide/ApiFirstSidebar.tsx) でクライアント描画
  - [`/design-principles/component-oriented-development-comprehensive-guide`](web-next/app/design-principles/component-oriented-development-comprehensive-guide/page.tsx)
    — コンポーネント指向開発完全ガイドを移植（15 セクション・Mermaid 21 図・table 7・コードブロック 14）。
    固定サイドバー・進捗バー・scroll-spy を [`CodSidebar.tsx`](web-next/app/design-principles/component-oriented-development-comprehensive-guide/CodSidebar.tsx) でクライアント描画
  - [`/css-design-system-guide/css-color-typography-spacing-systems`](web-next/app/css-design-system-guide/css-color-typography-spacing-systems/page.tsx)
    — CSSデザインシステム完全ガイドを移植。
    固定サイドバー・進捗バー・scroll-spy を [`CssColorTypographySpacingSidebar.tsx`](web-next/app/css-design-system-guide/css-color-typography-spacing-systems/CssColorTypographySpacingSidebar.tsx) でクライアント描画
  - [`/development-methodologies/behavior-driven-development-comprehensive-guide`](web-next/app/development-methodologies/behavior-driven-development-comprehensive-guide/page.tsx)
    — BDD 完全ガイドを移植（19 セクション・Mermaid 22 図・table 8・コードブロック 14）。
    固定サイドバー・進捗バー・scroll-spy を [`BddSidebar.tsx`](web-next/app/development-methodologies/behavior-driven-development-comprehensive-guide/BddSidebar.tsx) でクライアント描画
  - [`/development-methodologies/extreme-programming-comprehensive-guide`](web-next/app/development-methodologies/extreme-programming-comprehensive-guide/page.tsx)
    — XP（エクストリームプログラミング）完全ガイドを移植（23 セクション・Mermaid 13 図・table 11・コードブロック 2）。
    固定サイドバー・進捗バー・scroll-spy を [`XpSidebar.tsx`](web-next/app/development-methodologies/extreme-programming-comprehensive-guide/XpSidebar.tsx) でクライアント描画
  - [`/development-methodologies/feature-driven-development-comprehensive-guide`](web-next/app/development-methodologies/feature-driven-development-comprehensive-guide/page.tsx)
    — FDD（フィーチャー駆動開発）完全ガイドを移植（15 セクション・Mermaid 21 図・table 12・コードブロック 3・SVG 2 図）。
    固定サイドバー・進捗バー・scroll-spy を [`FddSidebar.tsx`](web-next/app/development-methodologies/feature-driven-development-comprehensive-guide/FddSidebar.tsx) でクライアント描画
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
bun run dev        # http://localhost:3000/ （全ガイドの索引画面）
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

#### 偽陽性（DEAD 判定だが実際は生存）の切り分け

CI が `DEAD` と報告しても、リンクが実際に死んでいるとは限りません。修正前に必ず原因を切り分けます。

| 症状 | 原因 | 対応 |
| --- | --- | --- |
| `[Status: 0]` + curl exit 6 | DNS の名前解決失敗。ドメイン廃止のほか、一時的な DNS 障害やリゾルバ側の問題でも発生する | `HOST='example.com'; dig "$HOST" A` / `dig "$HOST" AAAA` で応答ステータス（`NOERROR` / `NXDOMAIN` / `SERVFAIL`）と A/AAAA レコードの有無を確認する。別リゾルバでも `NXDOMAIN` が再現し、恒久的な廃止が確認できた場合にのみ公式の後継 URL へ差し替える |
| `[Status: 0]` + curl exit 28 | タイムアウト。サーバ応答遅延や一時的な不達 | 時間を空けて再実行する。URL は差し替えない |
| `[Status: 0]` + curl exit 35 | SSL/TLS 接続失敗（証明書・ハンドシェイク）。ドメインは生存していることが多い | 証明書の有効期限と TLS 設定を確認し、サイト側の一時障害なら再実行する。URL は差し替えない |
| `[Status: 429]` | レート制限。CI ランナーの IP から並列アクセスした際に Read the Docs 等で発生する。リンク自体は生存している | `verify-links.ts` が [.markdown-link-check.json](.markdown-link-check.json) の `retryOn429` / `retryCount` / `fallbackRetryDelay` に従って自動再試行する（既定: 10s → 20s の線形バックオフで最大 2 回）。再試行後も 429 が続く場合のみ `ignorePatterns` への追加を検討する。URL は差し替えない |
| `[Status: 403]`（ルートを含む全 URL で発生） | WAF / Cloudflare のボット遮断 | [.markdown-link-check.json](.markdown-link-check.json) の `ignorePatterns` に追加 |
| `[Status: 404]` | 参照先サイトの URL 体系変更 | 移行後の URL、無い場合は canonical な公式リポジトリを参照 |

判定に用いるコマンド（`verify-links` と同じ条件）:

```bash
curl -s -L -o /dev/null -w '%{http_code}\n' --max-time 15 \
  -A 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
  '<URL>'
echo "curl exit: $?"    # %{http_code} の直後に終了コードを出す（0 / 6 / 28 / 35 の切り分けに必須）

dig '<ホスト名>' A            # status: と ANSWER SECTION を確認する
dig '<ホスト名>' AAAA         # A が無くても AAAA だけ存在する場合がある
dig @1.1.1.1 '<ホスト名>' A   # 別リゾルバでも再現するか確認する
```

`dig +short` の出力が空であることは、それだけではドメイン消滅の証拠になりません。`NXDOMAIN`（存在しない）・`SERVFAIL`（リゾルバ側の一時障害）・「A は無いが AAAA はある」は、いずれも `+short` では同じ空出力になります。応答ステータスと A/AAAA レコードを確認し、恒久的な廃止が裏づけられるまで URL を差し替えないでください。

**soft-404 に注意**: SPA 構成のサイトは存在しない URL でも HTTP 200 を返し本文だけがエラーであることがあり、ステータスコードでは検出できません（例: `owasp.org/projects/<任意のslug>`）。差し替え先には安定した canonical URL を選びます。

`verify-links.ts` 側の偽陽性対策は [scripts/verify-links.test.ts](scripts/verify-links.test.ts) で保護されています（HEAD は `-X HEAD` ではなく `--head`、User-Agent は現行世代のブラウザ、429 は恒久的エラーと区別して再試行）。

### 依存関係の脆弱性監査

依存パッケージの既知脆弱性を検査するために `audit-dependencies`（[scripts/audit-dependencies.ts](scripts/audit-dependencies.ts)）を使用しています。ルートと `web-next/` の両ワークスペースで `bun audit` を実行し、閾値（既定 `low`）以上の脆弱性があれば失敗します。

```bash
bun run test    # 監査ロジック（scripts/audit-report.ts）の単体テスト
bun run audit   # 両ワークスペースの脆弱性監査

# 閾値を moderate 以上に変更する場合
bun run audit --threshold=moderate
```

`bun.lock` はコミット対象外のため、脆弱性の修正は `package.json` に反映します。直接依存はバージョンを上げ、transitive 依存は `overrides` で最低安全バージョンを宣言してください。

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
