/**
 * ガイド索引のカタログ。
 *
 * ルート "/" の索引画面が参照する、全ガイドの一覧。グローバルナビ
 * (components/site/nav-links.ts) と扱うページ集合は同一で、その一致は
 * lib/guide-catalog-nav.test.ts が保証する。
 *
 * ナビが「名前と href」だけを必要とするのに対し、索引画面は一行要約と
 * 公開状態も必要とするため、両者は別ファイルとして持つ。
 *
 * status:
 * - "published" … Next.js へ移行済み。索引ではリンクとして出す。
 * - "planned"   … 未移行（アクセスすると 404）。索引では「準備中」の非リンク表示。
 */

export type GuideStatus = "published" | "planned";

/** 索引に並ぶ 1 本のガイド。 */
export type GuideEntry = {
  readonly name: string;
  readonly href: string;
  readonly summary: string;
  readonly status: GuideStatus;
};

/** カテゴリ。`id` は索引画面のカテゴリ色（globals.css の data-category）のキーを兼ねる。 */
export type GuideCategory = {
  readonly id: string;
  readonly name: string;
  readonly entries: readonly GuideEntry[];
};

export const guideCatalog: readonly GuideCategory[] = [
  {
    id: "architecture",
    name: "アーキテクチャ",
    entries: [
      {
        name: "総合リファレンス",
        href: "/general/comprehensive-guide",
        summary: "TDD から国際資格まで、主要 12 テーマを一望する",
        status: "published",
      },
      {
        name: "クリーンアーキテクチャ",
        href: "/architecture/clean-architecture-comprehensive-guide",
        summary: "依存の向きを内側へ揃え、業務ロジックを外部から守る",
        status: "published",
      },
      {
        name: "イベント駆動アーキテクチャ",
        href: "/architecture/event-driven-architecture-comprehensive-guide",
        summary: "非同期メッセージでサービス間を疎結合に保つ",
        status: "published",
      },
      {
        name: "ヘキサゴナルアーキテクチャ",
        href: "/architecture/hexagonal-architecture-comprehensive-guide",
        summary: "ポートとアダプタで外部依存を差し替え可能にする",
        status: "published",
      },
      {
        name: "マイクロサービス",
        href: "/architecture/microservices-architecture-comprehensive-guide",
        summary: "小さく分けて独立に配備する。その代償も含めて",
        status: "published",
      },
      {
        name: "モノリシック",
        href: "/architecture/monolithic-architecture-comprehensive-guide",
        summary: "単一構成の強みと、分割に踏み切る判断の境目",
        status: "published",
      },
      {
        name: "サービス指向 (SOA)",
        href: "/architecture/service-oriented-architecture-comprehensive-guide",
        summary: "ESB と SOAP / REST でサービスを再利用する",
        status: "published",
      },
    ],
  },
  {
    id: "design-principles",
    name: "設計原則",
    entries: [
      {
        name: "API ファースト設計",
        href: "/design-principles/api-first-design-comprehensive-guide",
        summary: "実装より先に契約を決め、並行して開発を進める",
        status: "published",
      },
      {
        name: "コンポーネント指向開発",
        href: "/design-principles/component-oriented-development-comprehensive-guide",
        summary: "UI を再利用できる部品に分けて組み立てる",
        status: "published",
      },
      {
        name: "ドメイン駆動設計 (DDD)",
        href: "/design-principles/domain-driven-design-comprehensive-guide",
        summary: "業務の言葉をそのままコードの構造にする",
        status: "planned",
      },
      {
        name: "オブジェクト指向プログラミング",
        href: "/design-principles/object-oriented-programming-comprehensive-guide",
        summary: "カプセル化・継承・多態でモデルを表現する",
        status: "planned",
      },
    ],
  },
  {
    id: "development-methodologies",
    name: "開発手法",
    entries: [
      {
        name: "振る舞い駆動開発 (BDD)",
        href: "/development-methodologies/behavior-driven-development-comprehensive-guide",
        summary: "期待する振る舞いを自然言語のまま仕様にする",
        status: "published",
      },
      {
        name: "エクストリームプログラミング (XP)",
        href: "/development-methodologies/extreme-programming-comprehensive-guide",
        summary: "5 つの価値と 13 のプラクティスで開発を回す",
        status: "published",
      },
      {
        name: "フィーチャー駆動開発 (FDD)",
        href: "/development-methodologies/feature-driven-development-comprehensive-guide",
        summary: "機能単位に区切り、5 つの工程で積み上げる",
        status: "published",
      },
      {
        name: "テスト駆動開発 (TDD)",
        href: "/development-methodologies/test-driven-development-comprehensive-guide",
        summary: "失敗するテストから書き、設計を引き出す",
        status: "planned",
      },
    ],
  },
  {
    id: "product-and-enterprise",
    name: "プロダクト & エンタープライズ",
    entries: [
      {
        name: "MVP (実用最小限の製品)",
        href: "/product-and-enterprise/minimum-viable-product-comprehensive-guide",
        summary: "最小限の機能で仮説を早く確かめる",
        status: "planned",
      },
      {
        name: "TOGAF 認定",
        href: "/product-and-enterprise/togaf-certification-comprehensive-guide",
        summary: "エンタープライズアーキテクチャの資格対策",
        status: "planned",
      },
    ],
  },
  {
    id: "css-design-system-guide",
    name: "CSS デザインシステム",
    entries: [
      {
        name: "総合ガイド",
        href: "/css-design-system-guide/css-design-system-guide",
        summary: "デザインシステムを CSS で形にする全体像",
        status: "published",
      },
      {
        name: "カラー / タイポ / スペーシング",
        href: "/css-design-system-guide/css-color-typography-spacing-systems",
        summary: "3 つの基礎トークンの決め方と使い方",
        status: "published",
      },
      {
        name: "CSS 基礎",
        href: "/css-design-system-guide/design-system-css-fundamentals",
        summary: "デザインシステムを支える CSS の土台",
        status: "planned",
      },
      {
        name: "Grid / BEM / レスポンシブ / A11y",
        href: "/css-design-system-guide/grid-bem-responsive-a11y-systems",
        summary: "レイアウトと命名規則、アクセシビリティ",
        status: "planned",
      },
      {
        name: "アニメーション / 設計 / トークン",
        href: "/css-design-system-guide/normal-animation-architecture-tokens-performance-tools",
        summary: "動きとトークン設計、性能とツール選び",
        status: "planned",
      },
    ],
  },
];
