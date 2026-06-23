/**
 * グローバルナビ定義。
 *
 * 移植元 (LLM-Studies/web-next/components/site/nav-links.ts) は zod で href を
 * 検証していたが、本リポでは依存追加を避け、手書きの判別共用体型で表現する。
 * href は "/" 始まりの絶対パス（App Router の /<category>/<slug>）。
 *
 * 注意: 未移行ページへのリンクも意図的に含む（現状アクセスすると 404）。
 * ページ移植が進むたびにリンクが有効化される。
 */

/** 末端リンク（単一ページ）。 */
export type NavLeaf = {
  readonly name: string;
  readonly href: string;
};

/** ドロップダウン（子リンクを束ねるグループ）。 */
export type NavDropdown = {
  readonly name: string;
  readonly children: readonly NavLeaf[];
};

export type NavLink = NavLeaf | NavDropdown;

export const navLinks: readonly NavLink[] = [
  { name: "Home", href: "/general/comprehensive-guide" },
  {
    name: "アーキテクチャ",
    children: [
      {
        name: "クリーンアーキテクチャ",
        href: "/architecture/clean-architecture-comprehensive-guide",
      },
      {
        name: "イベント駆動アーキテクチャ",
        href: "/architecture/event-driven-architecture-comprehensive-guide",
      },
      {
        name: "ヘキサゴナルアーキテクチャ",
        href: "/architecture/hexagonal-architecture-comprehensive-guide",
      },
      {
        name: "マイクロサービス",
        href: "/architecture/microservices-architecture-comprehensive-guide",
      },
      { name: "モノリシック", href: "/architecture/monolithic-architecture-comprehensive-guide" },
      {
        name: "サービス指向 (SOA)",
        href: "/architecture/service-oriented-architecture-comprehensive-guide",
      },
    ],
  },
  {
    name: "設計原則",
    children: [
      {
        name: "API ファースト設計",
        href: "/design-principles/api-first-design-comprehensive-guide",
      },
      {
        name: "コンポーネント指向開発",
        href: "/design-principles/component-oriented-development-comprehensive-guide",
      },
      {
        name: "ドメイン駆動設計 (DDD)",
        href: "/design-principles/domain-driven-design-comprehensive-guide",
      },
      {
        name: "オブジェクト指向プログラミング",
        href: "/design-principles/object-oriented-programming-comprehensive-guide",
      },
    ],
  },
  {
    name: "開発手法",
    children: [
      {
        name: "振る舞い駆動開発 (BDD)",
        href: "/development-methodologies/behavior-driven-development-comprehensive-guide",
      },
      {
        name: "エクストリームプログラミング (XP)",
        href: "/development-methodologies/extreme-programming-comprehensive-guide",
      },
      {
        name: "フィーチャー駆動開発 (FDD)",
        href: "/development-methodologies/feature-driven-development-comprehensive-guide",
      },
      {
        name: "テスト駆動開発 (TDD)",
        href: "/development-methodologies/test-driven-development-comprehensive-guide",
      },
    ],
  },
  {
    name: "プロダクト & エンタープライズ",
    children: [
      {
        name: "MVP (実用最小限の製品)",
        href: "/product-and-enterprise/minimum-viable-product-comprehensive-guide",
      },
      {
        name: "TOGAF 認定",
        href: "/product-and-enterprise/togaf-certification-comprehensive-guide",
      },
    ],
  },
  {
    name: "CSS デザインシステム",
    children: [
      { name: "総合ガイド", href: "/css-design-system-guide/css-design-system-guide" },
      { name: "CSS 基礎", href: "/css-design-system-guide/design-system-css-fundamentals" },
      {
        name: "カラー / タイポ / スペーシング",
        href: "/css-design-system-guide/css-color-typography-spacing-systems",
      },
      {
        name: "Grid / BEM / レスポンシブ / A11y",
        href: "/css-design-system-guide/grid-bem-responsive-a11y-systems",
      },
      {
        name: "アニメーション / 設計 / トークン",
        href: "/css-design-system-guide/normal-animation-architecture-tokens-performance-tools",
      },
    ],
  },
];
