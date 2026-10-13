import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import Navigation from "./Navigation";
import { NAV_GROUPS } from "./navigation-data";

export const metadata: Metadata = {
  title: "デザインシステムとCSS設計の基礎 | フロントエンド入門ガイド",
  description:
    "フロントエンド開発における「再利用可能・保守しやすい・一貫した」UIを構築するための原則と実践パターンをステップバイステップで解説します。",
};

const DIAGRAMS = {
  ds_overview:
    'graph TD\nA["🎨 デザインシステム<br/><small>Single Source of Truth</small>"] --> B["🪙 デザイントークン<br/>色・スペース・タイポグラフィ"]\nA --> C["🧱 UIコンポーネント<br/>ボタン・フォーム・カード"]\nA --> D["📐 デザイン原則<br/>一貫性・アクセシビリティ"]\nA --> E["📚 ドキュメント<br/>Storybook・ガイドライン"]\nB --> F["プリミティブトークン<br/>raw値"]\nB --> G["セマンティックトークン<br/>意味を持つ値"]\nC --> H["Atoms 原子"]\nC --> I["Molecules 分子"]\nC --> J["Organisms 有機体"]\nstyle A fill:#6C47FF,color:#fff,stroke:none\nstyle B fill:#1a2a44,color:#93c5fd,stroke:#3b82f6\nstyle C fill:#1a3328,color:#86efac,stroke:#22c55e\nstyle D fill:#3a2a1a,color:#fcd34d,stroke:#f59e0b\nstyle E fill:#2a1a3a,color:#c084fc,stroke:#a855f7\nstyle F fill:#0d1b2a,color:#93c5fd,stroke:#3b82f6,stroke-dasharray:4\nstyle G fill:#0d1b2a,color:#93c5fd,stroke:#3b82f6\nstyle H fill:#0d1b2a,color:#86efac,stroke:#22c55e,stroke-dasharray:4\nstyle I fill:#0d1b2a,color:#86efac,stroke:#22c55e\nstyle J fill:#0d1b2a,color:#86efac,stroke:#22c55e',
  ds_without_with:
    'flowchart LR\nsubgraph WITHOUT["デザインシステムなし"]\ndirection TB\nDA["デザイナーA"] --> P1["ページ1<br/>青ボタン"]\nDB["デザイナーB"] --> P2["ページ2<br/>緑ボタン"]\nDC["エンジニアC"] --> P3["ページ3<br/>赤ボタン"]\nP1 -. "スタイル不一致" .- P2\nP2 -. "スタイル不一致" .- P3\nend\nsubgraph WITH["デザインシステムあり"]\ndirection TB\nDS["🎨 デザインシステム"] --> Q1["ページ1"]\nDS --> Q2["ページ2"]\nDS --> Q3["ページ3"]\nQ1 --> Q2\nQ2 --> Q3\nend\nWITHOUT --> WITH\nstyle DS fill:#6C47FF,color:#fff,stroke:none\nstyle WITHOUT fill:#1f1215,stroke:#f87171,color:#f87171\nstyle WITH fill:#0f1f15,stroke:#34d399,color:#34d399',
  atomic_design:
    'graph BT\nA["⚡ 原子 Atoms<br/>Button · Input · Label · Icon"] --> B["🧬 分子 Molecules<br/>SearchBar · FormField · Card"]\nB --> C["🦠 有機体 Organisms<br/>Header · ProductGrid · Sidebar"]\nC --> D["📄 テンプレート Templates<br/>ページレイアウト骨格"]\nD --> E["🖥️ ページ Pages<br/>実際のコンテンツを含む完成画面"]\nstyle A fill:#1a2a44,color:#93c5fd,stroke:#3b82f6\nstyle B fill:#1a3328,color:#86efac,stroke:#22c55e\nstyle C fill:#3a2a1a,color:#fcd34d,stroke:#f59e0b\nstyle D fill:#2a1a3a,color:#c084fc,stroke:#a855f7\nstyle E fill:#1a3020,color:#4ade80,stroke:#16a34a',
  token_hierarchy:
    'graph LR\nsubgraph L1["Layer 1: プリミティブトークンraw値"]\nP1["--purple-500: #6C47FF"]\nP2["--space-4: 16px"]\nP3["--text-base: 1rem"]\nend\nsubgraph L2["Layer 2: セマンティックトークン意味付き"]\nS1["--color-primary"]\nS2["--space-component-md"]\nS3["--text-body"]\nend\nsubgraph L3["Layer 3: コンポーネントトークン"]\nC1[".button → --btn-bg"]\nC2[".card → --card-padding"]\nend\nP1 --> S1\nP2 --> S2\nP3 --> S3\nS1 --> C1\nS2 --> C2\nstyle L1 fill:#0d1b2a,stroke:#3b82f6,color:#93c5fd\nstyle L2 fill:#0d2a1a,stroke:#22c55e,color:#86efac\nstyle L3 fill:#1a0d2a,stroke:#a855f7,color:#c084fc',
  ds_build_steps:
    'flowchart TD\nS1["Step 1 🔍<br/>既存UIの棚卸し<br/>現状の色・フォント・コンポーネントを洗い出す"] --> S2\nS2["Step 2 🧭<br/>デザイン原則の言語化<br/>どんな価値観でデザインするかを明文化"] --> S3\nS3["Step 3 🪙<br/>デザイントークンの設定<br/>色・スペース・タイポグラフィを変数化"] --> S4\nS4["Step 4 ⚡<br/>基本コンポーネントの作成<br/>Button · Input · Icon などの原子を定義"] --> S5\nS5["Step 5 🔗<br/>複合コンポーネントの構築<br/>分子・有機体レベルを組み合わせる"] --> S6\nS6["Step 6 📚<br/>ドキュメントの整備<br/>Storybookなどで使い方・禁止事項を記録"] --> S7\nS7["Step 7 🔄<br/>継続的なメンテナンス<br/>フィードバックを収集して継続改善"]\nstyle S1 fill:#0d1b2a,color:#93c5fd,stroke:#3b82f6\nstyle S2 fill:#0d1b2a,color:#fcd34d,stroke:#f59e0b\nstyle S3 fill:#0d1b2a,color:#c084fc,stroke:#a855f7\nstyle S4 fill:#0d1b2a,color:#86efac,stroke:#22c55e\nstyle S5 fill:#0d1b2a,color:#f97316,stroke:#ea580c\nstyle S6 fill:#0d1b2a,color:#fb923c,stroke:#f97316\nstyle S7 fill:#6C47FF,color:#fff,stroke:none',
  css_cascade:
    'graph TD\nA["スタイルの衝突が発生"] --> B{"優先度ステップ1<br/>重要度チェック"}\nB -->|"!important あり"| WIN1["!important スタイルが勝つ"]\nB -->|"通常スタイル"| C{"優先度ステップ2<br/>詳細度(Specificity)比較"}\nC -->|"詳細度が高い"| WIN2["詳細度の高いセレクタが勝つ"]\nC -->|"詳細度が同じ"| D{"優先度ステップ3<br/>ソース順(記述順)"}\nD -->|"後に書かれている"| WIN3["後のスタイルが勝つ"]\nWIN1 --> APPLY["✅ そのスタイルを適用"]\nWIN2 --> APPLY\nWIN3 --> APPLY\nstyle A fill:#1a0d2a,color:#c084fc,stroke:#a855f7\nstyle WIN1 fill:#3a1515,color:#f87171,stroke:#ef4444\nstyle WIN2 fill:#152a3a,color:#93c5fd,stroke:#3b82f6\nstyle WIN3 fill:#153a25,color:#86efac,stroke:#22c55e\nstyle APPLY fill:#6C47FF,color:#fff,stroke:none',
  css_methodologies:
    'graph LR\nM["CSS設計手法"] --> BEM["BEM<br/>Block__Element--Modifier<br/>命名規則ベース"]\nM --> OOCSS["OOCSS<br/>構造とスキンの分離<br/>再利用性重視"]\nM --> SMACSS["SMACSS<br/>5カテゴリ分類<br/>Base/Layout/Module/State/Theme"]\nM --> UTIL["Utility-First<br/>Tailwind CSS的<br/>単機能クラスの組み合わせ"]\nM --> CSSM["CSS Modules<br/>ローカルスコープ<br/>React/Vueコンポーネント向け"]\nstyle M fill:#6C47FF,color:#fff,stroke:none\nstyle BEM fill:#1a2a44,color:#93c5fd,stroke:#3b82f6\nstyle OOCSS fill:#3a2a1a,color:#fcd34d,stroke:#f59e0b\nstyle SMACSS fill:#1a3328,color:#86efac,stroke:#22c55e\nstyle UTIL fill:#2a1a3a,color:#c084fc,stroke:#a855f7\nstyle CSSM fill:#1a1a2a,color:#94a3b8,stroke:#64748b',
  bem_structure:
    'graph LR\nBEM["BEM"] --> B["🟦 Block<br/>独立したコンポーネント<br/>.card  .button  .nav"]\nBEM --> E["🟨 Element<br/>Blockを構成する部品<br/>.card__title  .nav__item"]\nBEM --> MOD["🟧 Modifier<br/>状態・バリアント<br/>.card--featured  .button--primary"]\nB -->|"__"| E\nB -->|"--"| MOD\nstyle BEM fill:#6C47FF,color:#fff,stroke:none\nstyle B fill:#1a2a44,color:#93c5fd,stroke:#3b82f6\nstyle E fill:#3a2a1a,color:#fcd34d,stroke:#f59e0b\nstyle MOD fill:#1a3328,color:#86efac,stroke:#22c55e',
  smacss_categories:
    'graph TD\nS["SMACSS の5カテゴリ"] --> S1["1️⃣ Base<br/>リセット・デフォルトスタイル<br/>body · p · a · img"]\nS --> S2["2️⃣ Layout<br/>ページ構造<br/>.l-header · .l-sidebar · .l-grid"]\nS --> S3["3️⃣ Module<br/>再利用可能なUI部品<br/>.card · .button · .nav"]\nS --> S4["4️⃣ State<br/>状態変化スタイル<br/>.is-active · .is-hidden · .has-error"]\nS --> S5["5️⃣ Theme<br/>ビジュアルテーマ<br/>.theme-dark · .theme-brand"]\nstyle S fill:#6C47FF,color:#fff,stroke:none\nstyle S1 fill:#0d1b2a,color:#93c5fd,stroke:#3b82f6\nstyle S2 fill:#1a2a0d,color:#86efac,stroke:#22c55e\nstyle S3 fill:#2a1a0d,color:#fcd34d,stroke:#f59e0b\nstyle S4 fill:#2a0d1a,color:#f87171,stroke:#ef4444\nstyle S5 fill:#1a0d2a,color:#c084fc,stroke:#a855f7',
} as const;

// Static escaped source examples; no CSS or HTML example is executed.
const CODE_BLOCKS = {
  "code-1":
    '<span class="cm">/* =============================================\n   レイヤー1: プリミティブトークン（生の値）\n   絶対に直接コンポーネントで使わない。\n   セマンティックトークンを介してのみ参照する。\n   ============================================= */</span>\n:root {\n  <span class="cm">/* カラースケール */</span>\n  <span class="kw">--purple-100</span>: <span class="st">#ede9fe</span>;\n  <span class="kw">--purple-300</span>: <span class="st">#c4b5fd</span>;\n  <span class="kw">--purple-500</span>: <span class="st">#6C47FF</span>;   <span class="cm">/* ブランドカラー */</span>\n  <span class="kw">--purple-700</span>: <span class="st">#5b21b6</span>;\n  <span class="kw">--purple-900</span>: <span class="st">#2e1065</span>;\n\n  <span class="kw">--neutral-50</span>:  <span class="st">#f8fafc</span>;\n  <span class="kw">--neutral-100</span>: <span class="st">#f1f5f9</span>;\n  <span class="kw">--neutral-400</span>: <span class="st">#94a3b8</span>;\n  <span class="kw">--neutral-700</span>: <span class="st">#334155</span>;\n  <span class="kw">--neutral-900</span>: <span class="st">#0f172a</span>;\n\n  <span class="kw">--red-500</span>: <span class="st">#ef4444</span>;\n  <span class="kw">--green-500</span>: <span class="st">#22c55e</span>;\n  <span class="kw">--yellow-500</span>: <span class="st">#eab308</span>;\n\n  <span class="cm">/* スペーススケール（4px基準グリッド） */</span>\n  <span class="kw">--primitive-space-1</span>: <span class="nu">4px</span>;\n  <span class="kw">--primitive-space-2</span>: <span class="nu">8px</span>;\n  <span class="kw">--primitive-space-3</span>: <span class="nu">12px</span>;\n  <span class="kw">--primitive-space-4</span>: <span class="nu">16px</span>;\n  <span class="kw">--primitive-space-6</span>: <span class="nu">24px</span>;\n  <span class="kw">--primitive-space-8</span>: <span class="nu">32px</span>;\n  <span class="kw">--primitive-space-12</span>: <span class="nu">48px</span>;\n  <span class="kw">--primitive-space-16</span>: <span class="nu">64px</span>;\n\n  <span class="cm">/* タイポグラフィスケール */</span>\n  <span class="kw">--primitive-text-xs</span>:   <span class="nu">0.75rem</span>;   <span class="cm">/* 12px */</span>\n  <span class="kw">--primitive-text-sm</span>:   <span class="nu">0.875rem</span>;  <span class="cm">/* 14px */</span>\n  <span class="kw">--primitive-text-base</span>: <span class="nu">1rem</span>;      <span class="cm">/* 16px */</span>\n  <span class="kw">--primitive-text-lg</span>:   <span class="nu">1.125rem</span>;  <span class="cm">/* 18px */</span>\n  <span class="kw">--primitive-text-xl</span>:   <span class="nu">1.25rem</span>;   <span class="cm">/* 20px */</span>\n  <span class="kw">--primitive-text-2xl</span>:  <span class="nu">1.5rem</span>;    <span class="cm">/* 24px */</span>\n  <span class="kw">--primitive-text-3xl</span>:  <span class="nu">1.875rem</span>;  <span class="cm">/* 30px */</span>\n}\n\n<span class="cm">/* =============================================\n   レイヤー2: セマンティックトークン（意味付き）\n   「何のために使うか」を名前で表現する。\n   ============================================= */</span>\n:root {\n  <span class="cm">/* 色 — 役割ベース */</span>\n  <span class="kw">--color-primary</span>:          <span class="fn">var</span>(--purple-<span class="nu">500</span>);\n  <span class="kw">--color-primary-hover</span>:    <span class="fn">var</span>(--purple-<span class="nu">700</span>);\n  <span class="kw">--color-danger</span>:           <span class="fn">var</span>(--red-<span class="nu">500</span>);\n  <span class="kw">--color-success</span>:          <span class="fn">var</span>(--green-<span class="nu">500</span>);\n  <span class="kw">--color-warning</span>:          <span class="fn">var</span>(--yellow-<span class="nu">500</span>);\n\n  <span class="kw">--color-bg-base</span>:          <span class="fn">var</span>(--neutral-<span class="nu">900</span>);\n  <span class="kw">--color-bg-surface</span>:       <span class="fn">var</span>(--neutral-<span class="nu">700</span>);\n  <span class="kw">--color-text-primary</span>:     <span class="fn">var</span>(--neutral-<span class="nu">50</span>);\n  <span class="kw">--color-text-secondary</span>:   <span class="fn">var</span>(--neutral-<span class="nu">400</span>);\n  <span class="kw">--color-border</span>:           <span class="fn">var</span>(--neutral-<span class="nu">700</span>);\n\n  <span class="cm">/* スペース — 用途ベース */</span>\n  <span class="kw">--space-component-xs</span>:  <span class="fn">var</span>(--primitive-space-<span class="nu">1</span>);  <span class="cm">/* 4px  */</span>\n  <span class="kw">--space-component-sm</span>:  <span class="fn">var</span>(--primitive-space-<span class="nu">2</span>);  <span class="cm">/* 8px  */</span>\n  <span class="kw">--space-component-md</span>:  <span class="fn">var</span>(--primitive-space-<span class="nu">4</span>);  <span class="cm">/* 16px */</span>\n  <span class="kw">--space-component-lg</span>:  <span class="fn">var</span>(--primitive-space-<span class="nu">6</span>);  <span class="cm">/* 24px */</span>\n  <span class="kw">--space-layout-md</span>:     <span class="fn">var</span>(--primitive-space-<span class="nu">8</span>);  <span class="cm">/* 32px */</span>\n  <span class="kw">--space-layout-lg</span>:     <span class="fn">var</span>(--primitive-space-<span class="nu">12</span>); <span class="cm">/* 48px */</span>\n\n  <span class="cm">/* タイポグラフィ — 用途ベース */</span>\n  <span class="kw">--text-body</span>:     <span class="fn">var</span>(--primitive-text-base);\n  <span class="kw">--text-body-sm</span>:  <span class="fn">var</span>(--primitive-text-sm);\n  <span class="kw">--text-label</span>:    <span class="fn">var</span>(--primitive-text-xs);\n  <span class="kw">--text-heading</span>:  <span class="fn">var</span>(--primitive-text-2xl);\n  <span class="kw">--text-display</span>:  <span class="fn">var</span>(--primitive-text-3xl);\n\n  <span class="cm">/* ボーダー半径 */</span>\n  <span class="kw">--radius-sm</span>: <span class="nu">4px</span>;\n  <span class="kw">--radius-md</span>: <span class="nu">8px</span>;\n  <span class="kw">--radius-lg</span>: <span class="nu">12px</span>;\n  <span class="kw">--radius-full</span>: <span class="nu">9999px</span>;\n}\n\n<span class="cm">/* =============================================\n   レイヤー3: コンポーネントトークン\n   特定コンポーネントのみで参照する変数\n   ============================================= */</span>\n.button {\n  <span class="kw">--btn-bg</span>:         <span class="fn">var</span>(--color-primary);\n  <span class="kw">--btn-bg-hover</span>:   <span class="fn">var</span>(--color-primary-hover);\n  <span class="kw">--btn-text</span>:       white;\n  <span class="kw">--btn-padding-v</span>:  <span class="fn">var</span>(--space-component-sm);\n  <span class="kw">--btn-padding-h</span>:  <span class="fn">var</span>(--space-component-md);\n  <span class="kw">--btn-radius</span>:     <span class="fn">var</span>(--radius-md);\n\n  <span class="cm">/* ↑ 上記変数をここで使用 */</span>\n  <span class="kw">display</span>: inline-flex;\n  <span class="kw">align-items</span>: center;\n  <span class="kw">padding</span>: <span class="fn">var</span>(--btn-padding-v) <span class="fn">var</span>(--btn-padding-h);\n  <span class="kw">background</span>: <span class="fn">var</span>(--btn-bg);\n  <span class="kw">color</span>: <span class="fn">var</span>(--btn-text);\n  <span class="kw">border-radius</span>: <span class="fn">var</span>(--btn-radius);\n  <span class="kw">transition</span>: background <span class="nu">0.15s</span> ease;\n}\n\n.<span class="kw">button</span>:hover { <span class="kw">background</span>: <span class="fn">var</span>(--btn-bg-hover); }\n',
  "code-2":
    '.button {\n  <span class="cm">/* 直書き。ブランドカラー変更時に\n     全ファイルを検索・置換する必要あり */</span>\n  <span class="kw">background</span>: <span class="st">#6C47FF</span>;\n  <span class="kw">border-radius</span>: <span class="nu">8px</span>;\n  <span class="kw">font-size</span>: <span class="nu">14px</span>;\n}\n',
  "code-3":
    '.button {\n  <span class="cm">/* トークン変数を参照。\n     :root の値を変えれば全体に反映 */</span>\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-primary);\n  <span class="kw">border-radius</span>: <span class="fn">var</span>(--radius-md);\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--text-body-sm);\n}\n',
  "code-4":
    '.button {\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-primary);\n  <span class="cm">/* ↓ コンポーネントが外部のレイアウトに干渉 */</span>\n  <span class="kw">margin</span>: <span class="nu">0</span> auto;\n  <span class="kw">width</span>: <span class="nu">100</span>%;\n  <span class="kw">display</span>: block;\n}\n',
  "code-5":
    '.button {\n  <span class="cm">/* コンポーネント固有の見た目のみ */</span>\n  <span class="kw">display</span>: inline-flex;\n  <span class="kw">align-items</span>: center;\n  <span class="kw">gap</span>: <span class="fn">var</span>(--space-component-xs);\n  <span class="kw">padding</span>: <span class="fn">var</span>(--btn-padding-v) <span class="fn">var</span>(--btn-padding-h);\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-primary);\n  <span class="kw">border-radius</span>: <span class="fn">var</span>(--radius-md);\n  <span class="cm">/* margin・width は使う側に任せる */</span>\n}\n',
  "code-6":
    '<span class="cm">&lt;!-- HTML: Block__Element--Modifier 記法 --&gt;</span>\n&lt;<span class="kw">button</span> <span class="kw">class</span>=<span class="st">"button button--primary"</span>&gt;送信&lt;/<span class="kw">button</span>&gt;\n&lt;<span class="kw">button</span> <span class="kw">class</span>=<span class="st">"button button--secondary"</span>&gt;キャンセル&lt;/<span class="kw">button</span>&gt;\n&lt;<span class="kw">button</span> <span class="kw">class</span>=<span class="st">"button button--danger"</span>&gt;削除&lt;/<span class="kw">button</span>&gt;\n&lt;<span class="kw">button</span> <span class="kw">class</span>=<span class="st">"button button--primary button--sm"</span>&gt;小ボタン&lt;/<span class="kw">button</span>&gt;\n&lt;<span class="kw">button</span> <span class="kw">class</span>=<span class="st">"button button--primary"</span> disabled&gt;無効&lt;/<span class="kw">button</span>&gt;',
  "code-7":
    '<span class="cm">/* === ベーススタイル（共通） === */</span>\n.button {\n  <span class="kw">display</span>: inline-flex;\n  <span class="kw">align-items</span>: center;\n  <span class="kw">justify-content</span>: center;\n  <span class="kw">gap</span>: <span class="fn">var</span>(--space-component-xs);\n  <span class="kw">padding</span>: <span class="fn">var</span>(--btn-padding-v, <span class="nu">8px</span>) <span class="fn">var</span>(--btn-padding-h, <span class="nu">16px</span>);\n  <span class="kw">font-family</span>: inherit;\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--text-body-sm);\n  <span class="kw">font-weight</span>: <span class="nu">500</span>;\n  <span class="kw">border-radius</span>: <span class="fn">var</span>(--radius-md);\n  <span class="kw">border</span>: <span class="nu">1px</span> solid transparent;\n  <span class="kw">cursor</span>: pointer;\n  <span class="kw">transition</span>: background <span class="nu">0.15s</span>, opacity <span class="nu">0.15s</span>, transform <span class="nu">0.1s</span>;\n}\n\n.<span class="kw">button</span>:active   { <span class="kw">transform</span>: <span class="fn">scale</span>(<span class="nu">0.97</span>); }\n.<span class="kw">button</span>:disabled { <span class="kw">opacity</span>: <span class="nu">0.4</span>; <span class="kw">cursor</span>: not-allowed; }\n.<span class="kw">button</span>:focus-visible {\n  <span class="kw">outline</span>: <span class="nu">2px</span> solid <span class="fn">var</span>(--color-primary);\n  <span class="kw">outline-offset</span>: <span class="nu">2px</span>;\n}\n\n<span class="cm">/* === カラーバリアント（スキン） === */</span>\n.button--primary {\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-primary);\n  <span class="kw">color</span>: white;\n}\n.<span class="kw">button--primary</span>:<span class="kw">hover</span>:<span class="fn">not</span>(:disabled) {\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-primary-hover);\n}\n\n.button--secondary {\n  <span class="kw">background</span>: transparent;\n  <span class="kw">color</span>: <span class="fn">var</span>(--color-primary);\n  <span class="kw">border-color</span>: <span class="fn">var</span>(--color-primary);\n}\n.<span class="kw">button--secondary</span>:<span class="kw">hover</span>:<span class="fn">not</span>(:disabled) {\n  <span class="kw">background</span>: <span class="fn">rgba</span>(<span class="nu">108</span>,<span class="nu">71</span>,<span class="nu">255</span>,<span class="nu">0.08</span>);\n}\n\n.button--danger {\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-danger);\n  <span class="kw">color</span>: white;\n}\n\n<span class="cm">/* === サイズバリアント === */</span>\n.button--sm {\n  <span class="kw">--btn-padding-v</span>: <span class="nu">4px</span>;\n  <span class="kw">--btn-padding-h</span>: <span class="nu">12px</span>;\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--text-label);\n}\n\n.button--lg {\n  <span class="kw">--btn-padding-v</span>: <span class="nu">12px</span>;\n  <span class="kw">--btn-padding-h</span>: <span class="nu">24px</span>;\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--text-body);\n}\n',
  "code-8":
    '<span class="cm">/* ライトモード（デフォルト） */</span>\n:root {\n  <span class="kw">--color-bg-base</span>:        <span class="st">#ffffff</span>;\n  <span class="kw">--color-bg-surface</span>:     <span class="st">#f1f5f9</span>;\n  <span class="kw">--color-text-primary</span>:   <span class="st">#0f172a</span>;\n  <span class="kw">--color-text-secondary</span>: <span class="st">#64748b</span>;\n  <span class="kw">--color-border</span>:         <span class="st">#e2e8f0</span>;\n}\n\n<span class="cm">/* ダークモード（OS設定に自動対応） */</span>\n<span class="kw">@media</span> (<span class="kw">prefers-color-scheme</span>: dark) {\n  :root {\n    <span class="kw">--color-bg-base</span>:        <span class="st">#07111e</span>;\n    <span class="kw">--color-bg-surface</span>:     <span class="st">#0d1b2a</span>;\n    <span class="kw">--color-text-primary</span>:   <span class="st">#e2e8f0</span>;\n    <span class="kw">--color-text-secondary</span>: <span class="st">#94a3b8</span>;\n    <span class="kw">--color-border</span>:         <span class="st">#162030</span>;\n  }\n}\n\n<span class="cm">/* data属性でユーザーが手動切り替えもできる */</span>\n[data-theme=<span class="st">"dark"</span>] {\n  <span class="kw">--color-bg-base</span>:        <span class="st">#07111e</span>;\n  <span class="cm">/* ... */</span>\n}\n\nbody {\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-bg-base);\n  <span class="kw">color</span>: <span class="fn">var</span>(--color-text-primary);\n  <span class="cm">/* ↑ すべてのコンポーネントがトークンを参照しているので\n     :root の変数を切り替えるだけで全体が変わる */</span>\n}\n',
  "code-9":
    '<span class="cm">/* 詳細度: (0,0,0,1) — タグ1個 */</span>\np { <span class="kw">color</span>: black; }\n\n<span class="cm">/* 詳細度: (0,0,1,0) — クラス1個 → 上より勝つ */</span>\n.text { <span class="kw">color</span>: blue; }\n\n<span class="cm">/* 詳細度: (0,1,0,0) — ID1個 → さらに勝つ */</span>\n#content { <span class="kw">color</span>: green; }\n\n<span class="cm">/* 詳細度: (0,1,1,1) — ID+クラス+タグ → 最も強い */</span>\np.text#content { <span class="kw">color</span>: red; }\n\n<span class="cm">/* =========================================\n   複合セレクタの計算練習\n   ========================================= */</span>\n\n<span class="cm">/* (0,0,1,1) — クラス1 + タグ1 */</span>\nnav li { <span class="kw">color</span>: gray; }\n\n<span class="cm">/* (0,0,2,1) — クラス2 + タグ1 */</span>\n.nav .nav-item { <span class="kw">color</span>: blue; }  <span class="cm">/* こちらが勝つ */</span>\n\n<span class="cm">/* (0,0,1,2) — クラス1 + タグ2 */</span>\nul li.active { <span class="kw">color</span>: red; }    <span class="cm">/* (0,0,1,2) vs (0,0,2,1) → (0,0,2,1) が勝つ */</span>\n\n<span class="cm">/* =========================================\n   !important — 最終手段（基本的に使わない）\n   ========================================= */</span>\n\n<span class="cm">/* 詳細度がどれだけ高くても !important が勝つ */</span>\n#very-specific-selector.and-class { <span class="kw">color</span>: purple; }\n.simple-class { <span class="kw">color</span>: orange !important; } <span class="cm">/* これが勝つ */</span>\n',
  "code-10":
    '<span class="cm">/* レイヤーの優先順位を宣言（後のレイヤーが強い） */</span>\n<span class="kw">@layer</span> base, tokens, components, utilities;\n\n<span class="kw">@layer</span> base {\n  <span class="cm">/* リセットCSS・デフォルトスタイル */</span>\n  * { <span class="kw">box-sizing</span>: border-box; }\n  p { <span class="kw">margin</span>: <span class="nu">0</span>; }\n}\n\n<span class="kw">@layer</span> tokens {\n  <span class="cm">/* デザイントークン */</span>\n  :root {\n    <span class="kw">--color-primary</span>: <span class="st">#6C47FF</span>;\n  }\n}\n\n<span class="kw">@layer</span> components {\n  <span class="cm">/* コンポーネント（詳細度が高くてもbaseに勝てる） */</span>\n  .button {\n    <span class="kw">background</span>: <span class="fn">var</span>(--color-primary);\n  }\n}\n\n<span class="kw">@layer</span> utilities {\n  <span class="cm">/* ユーティリティクラス — 最強 */</span>\n  .bg-transparent { <span class="kw">background</span>: transparent !important; }\n}\n',
  "code-11":
    '<span class="cm">&lt;!-- Block: .card（独立したコンポーネント）\n     Modifier: .card--featured（状態・バリアント）\n     Element: .card__image .card__title などのBlock内要素 --&gt;</span>\n&lt;<span class="kw">article</span> <span class="kw">class</span>=<span class="st">"card card--featured"</span>&gt;\n  &lt;<span class="kw">img</span>     <span class="kw">class</span>=<span class="st">"card__image"</span> <span class="kw">src</span>=<span class="st">"thumbnail.jpg"</span> <span class="kw">alt</span>=<span class="st">"記事のサムネイル"</span>&gt;\n  &lt;<span class="kw">div</span>     <span class="kw">class</span>=<span class="st">"card__body"</span>&gt;\n    &lt;<span class="kw">span</span>  <span class="kw">class</span>=<span class="st">"card__category"</span>&gt;デザイン&lt;/<span class="kw">span</span>&gt;\n    &lt;<span class="kw">h2</span>    <span class="kw">class</span>=<span class="st">"card__title"</span>&gt;デザインシステム入門&lt;/<span class="kw">h2</span>&gt;\n    &lt;<span class="kw">p</span>     <span class="kw">class</span>=<span class="st">"card__description"</span>&gt;UIの一貫性を保つ方法を解説...&lt;/<span class="kw">p</span>&gt;\n    &lt;<span class="kw">div</span>   <span class="kw">class</span>=<span class="st">"card__footer"</span>&gt;\n      &lt;<span class="kw">a</span>   <span class="kw">class</span>=<span class="st">"card__link card__link--primary"</span> <span class="kw">href</span>=<span class="st">"#"</span>&gt;続きを読む →&lt;/<span class="kw">a</span>&gt;\n      &lt;<span class="kw">span</span> <span class="kw">class</span>=<span class="st">"card__meta"</span>&gt;<span class="nu">5</span>分で読める&lt;/<span class="kw">span</span>&gt;\n    &lt;/<span class="kw">div</span>&gt;\n  &lt;/<span class="kw">div</span>&gt;\n&lt;/<span class="kw">article</span>&gt;',
  "code-12":
    '<span class="cm">/* Block — 独立したコンポーネントの基本スタイル */</span>\n.card {\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-bg-surface);\n  <span class="kw">border-radius</span>: <span class="fn">var</span>(--radius-lg);\n  <span class="kw">overflow</span>: hidden;\n  <span class="kw">border</span>: <span class="nu">1px</span> solid <span class="fn">var</span>(--color-border);\n  <span class="kw">transition</span>: box-shadow <span class="nu">0.2s</span>, transform <span class="nu">0.2s</span>;\n}\n\n<span class="cm">/* Block Modifier — カードのバリアント */</span>\n.card--featured {\n  <span class="kw">border-color</span>: <span class="fn">var</span>(--color-primary);\n  <span class="kw">box-shadow</span>: <span class="nu">0</span> <span class="nu">0</span> <span class="nu">0</span> <span class="nu">1px</span> <span class="fn">var</span>(--color-primary);\n}\n\n<span class="cm">/* Elements — Block の内部要素 */</span>\n.card__image {\n  <span class="kw">width</span>: <span class="nu">100</span>%;\n  <span class="kw">aspect-ratio</span>: <span class="nu">16</span> / <span class="nu">9</span>;\n  <span class="kw">object-fit</span>: cover;\n}\n\n.card__body {\n  <span class="kw">padding</span>: <span class="fn">var</span>(--space-component-lg);\n}\n\n.card__category {\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--text-label);\n  <span class="kw">font-weight</span>: <span class="nu">600</span>;\n  <span class="kw">color</span>: <span class="fn">var</span>(--color-primary);\n  <span class="kw">text-transform</span>: uppercase;\n  <span class="kw">letter-spacing</span>: <span class="nu">0.06em</span>;\n}\n\n.card__title {\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--text-xl);\n  <span class="kw">font-weight</span>: <span class="nu">700</span>;\n  <span class="kw">color</span>: <span class="fn">var</span>(--color-text-primary);\n  <span class="kw">margin</span>: <span class="fn">var</span>(--space-component-xs) <span class="nu">0</span>;\n  <span class="kw">line-height</span>: <span class="nu">1.3</span>;\n}\n\n.card__description {\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--text-body-sm);\n  <span class="kw">color</span>: <span class="fn">var</span>(--color-text-secondary);\n  <span class="kw">line-height</span>: <span class="nu">1.6</span>;\n}\n\n.card__footer {\n  <span class="kw">display</span>: flex;\n  <span class="kw">align-items</span>: center;\n  <span class="kw">justify-content</span>: space-between;\n  <span class="kw">margin-top</span>: <span class="fn">var</span>(--space-component-md);\n}\n\n.card__link {\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--text-body-sm);\n  <span class="kw">font-weight</span>: <span class="nu">500</span>;\n  <span class="kw">text-decoration</span>: none;\n}\n\n<span class="cm">/* Element Modifier */</span>\n.card__link--primary { <span class="kw">color</span>: <span class="fn">var</span>(--color-primary); }\n\n.card__meta {\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--text-label);\n  <span class="kw">color</span>: <span class="fn">var</span>(--color-text-secondary);\n}\n',
  "code-13":
    '.button-primary {\n  <span class="kw">display</span>: inline-flex;   <span class="cm">/* ← 重複 */</span>\n  <span class="kw">padding</span>: <span class="nu">8px</span> <span class="nu">16px</span>;      <span class="cm">/* ← 重複 */</span>\n  <span class="kw">border-radius</span>: <span class="nu">6px</span>;     <span class="cm">/* ← 重複 */</span>\n  <span class="kw">font-weight</span>: <span class="nu">500</span>;       <span class="cm">/* ← 重複 */</span>\n  <span class="kw">background</span>: <span class="st">#6C47FF</span>;\n  <span class="kw">color</span>: white;\n}\n\n.button-danger {\n  <span class="kw">display</span>: inline-flex;   <span class="cm">/* 同じ */</span>\n  <span class="kw">padding</span>: <span class="nu">8px</span> <span class="nu">16px</span>;      <span class="cm">/* 同じ */</span>\n  <span class="kw">border-radius</span>: <span class="nu">6px</span>;     <span class="cm">/* 同じ */</span>\n  <span class="kw">font-weight</span>: <span class="nu">500</span>;       <span class="cm">/* 同じ */</span>\n  <span class="kw">background</span>: <span class="st">#ef4444</span>;\n  <span class="kw">color</span>: white;\n}\n',
  "code-14":
    '<span class="cm">/* 構造クラス（Shape / Structure） */</span>\n.btn {\n  <span class="kw">display</span>: inline-flex;\n  <span class="kw">padding</span>: <span class="nu">8px</span> <span class="nu">16px</span>;\n  <span class="kw">border-radius</span>: <span class="nu">6px</span>;\n  <span class="kw">font-weight</span>: <span class="nu">500</span>;\n}\n\n<span class="cm">/* スキンクラス（Skin） */</span>\n.btn-primary {\n  <span class="kw">background</span>: <span class="st">#6C47FF</span>;\n  <span class="kw">color</span>: white;\n}\n\n.btn-danger {\n  <span class="kw">background</span>: <span class="st">#ef4444</span>;\n  <span class="kw">color</span>: white;\n}\n\n<span class="cm">/* HTML: 組み合わせて使う */</span>\n<span class="cm">/* &lt;button class="btn btn-primary"&gt; */</span>\n<span class="cm">/* &lt;button class="btn btn-danger"&gt; */</span>\n',
  "code-15":
    '<span class="cm">/* =======================================\n   1. Base — リセット・デフォルトスタイル\n   ======================================= */</span>\n*, *::before, *::after { <span class="kw">box-sizing</span>: border-box; }\nbody   { <span class="kw">font-family</span>: <span class="fn">var</span>(--font-body); <span class="kw">line-height</span>: <span class="nu">1.7</span>; }\nimg    { <span class="kw">max-width</span>: <span class="nu">100</span>%; <span class="kw">display</span>: block; }\na      { <span class="kw">color</span>: <span class="fn">var</span>(--color-primary); }\n\n<span class="cm">/* =======================================\n   2. Layout — ページレイアウト構造\n   プレフィックス: .l-\n   ======================================= */</span>\n.l-container {\n  <span class="kw">max-width</span>: <span class="nu">1200px</span>;\n  <span class="kw">margin</span>: <span class="nu">0</span> auto;\n  <span class="kw">padding</span>: <span class="nu">0</span> <span class="fn">var</span>(--space-layout-md);\n}\n\n.l-grid {\n  <span class="kw">display</span>: grid;\n  <span class="kw">grid-template-columns</span>: 1fr 3fr;\n  <span class="kw">gap</span>: <span class="fn">var</span>(--space-layout-md);\n}\n\n.l-sidebar  { <span class="kw">grid-column</span>: <span class="nu">1</span>; }\n.l-main     { <span class="kw">grid-column</span>: <span class="nu">2</span>; }\n\n<span class="cm">/* =======================================\n   3. Module — 再利用可能なUI部品\n   BEM記法と組み合わせることが多い\n   ======================================= */</span>\n.card { <span class="cm">/* ... */</span> }\n.card__title { <span class="cm">/* ... */</span> }\n.card--featured { <span class="cm">/* ... */</span> }\n\n.nav { <span class="kw">display</span>: flex; <span class="kw">gap</span>: <span class="nu">0</span>; }\n.nav__item { <span class="cm">/* ... */</span> }\n.nav__link { <span class="cm">/* ... */</span> }\n\n<span class="cm">/* =======================================\n   4. State — 状態変化\n   プレフィックス: .is-  .has-\n   ======================================= */</span>\n.is-active   { <span class="kw">background</span>: <span class="fn">var</span>(--color-primary); }\n.is-hidden   { <span class="kw">display</span>: none !important; }\n.is-loading  { <span class="kw">opacity</span>: <span class="nu">0.5</span>; <span class="kw">pointer-events</span>: none; }\n.is-disabled { <span class="kw">cursor</span>: not-allowed; <span class="kw">opacity</span>: <span class="nu">0.4</span>; }\n.has-error   { <span class="kw">border-color</span>: <span class="fn">var</span>(--color-danger); }\n\n<span class="cm">/* =======================================\n   5. Theme — ビジュアルテーマ切り替え\n   プレフィックス: .theme-\n   ======================================= */</span>\n.theme-dark {\n  <span class="kw">--color-bg-base</span>:      <span class="st">#07111e</span>;\n  <span class="kw">--color-text-primary</span>: <span class="st">#e2e8f0</span>;\n}\n\n.theme-high-contrast {\n  <span class="kw">--color-primary</span>: <span class="st">#0000ff</span>;\n  <span class="kw">--color-text-primary</span>: <span class="st">#000000</span>;\n}\n',
  "code-16":
    '&lt;<span class="kw">button</span> <span class="kw">class</span>=<span class="st">"submit-btn"</span>&gt;送信&lt;/<span class="kw">button</span>&gt;',
  "code-17":
    '&lt;<span class="kw">button</span> <span class="kw">class</span>=<span class="st">"px-4 py-2 bg-purple-600\n  text-white font-medium rounded-md\n  hover:bg-purple-700 focus:outline-none\n  focus:ring-2 focus:ring-purple-500\n  focus:ring-offset-2 transition-colors"</span>&gt;\n  送信\n&lt;/<span class="kw">button</span>&gt;',
} as const;

export default function Page() {
  return (
    <div className="design-system-css-fundamentals">
      <Navigation groups={NAV_GROUPS} />
      <main id="main">
        <div className="hero" id="top">
          <div className="hero-badge">{"🎓 入門ガイド"}</div>
          <h1>
            {"デザインシステムと"}
            <br />
            <span>{"CSS設計"}</span>
            {"の基礎"}
          </h1>
          <p>
            {
              "フロントエンド開発における「再利用可能・保守しやすい・一貫した」UIを構築するための原則と実践パターンをステップバイステップで解説します。"
            }
          </p>
          <div className="hero-meta">
            <span>{"対象：フロントエンド初学者"}</span>
            <span>{"難易度：🟢 入門〜中級"}</span>
            <span>{"最終更新：2025年"}</span>
            <span>{"推定読了：45〜60分"}</span>
          </div>
        </div>
        <section className="section" id="s1">
          <div className="section-header">
            <span className="section-num">{"Ch. 1"}</span>
            <h2>{"デザインシステムとは何か"}</h2>
          </div>
          <div className="subsection" id="s1-1">
            <h3>{"1.1 定義と目的"}</h3>
            <p>
              {"デザインシステムとは、"}
              <strong>
                {
                  "プロダクト全体で一貫したUIを構築するための「単一の信頼できる情報源（Single Source of Truth）」"
                }
              </strong>
              {
                " です。デザインの原則・再利用可能なコンポーネント・ガイドラインをひとつのシステムとして統合したものを指します。"
              }
            </p>
            <div className="callout info">
              <span className="callout-icon">{"💡"}</span>
              <div className="callout-body">
                <h4>{"Single Source of Truth とは？"}</h4>
                <p>
                  {
                    "「情報の唯一の正しい出所」という概念です。色、フォント、スペースなどの値をひとつの場所で定義し、すべての画面・コンポーネントがそこを参照します。変更が必要になったときも1か所を修正するだけで全体に反映されます。"
                  }
                </p>
              </div>
            </div>
            <p>{"デザインシステムを構成する4つの柱を図で確認しましょう。"}</p>
            <div className="mermaid-wrap">
              <div className="mermaid" data-diagram="ds_overview">
                <MermaidDiagram chart={DIAGRAMS.ds_overview} preserveNaturalScale={true} />
              </div>
              <div className="mermaid-label">{"図1.1 — デザインシステムの全体構造"}</div>
            </div>
            <p>
              {"デザインシステムが"}
              <strong>{"ない"}</strong>
              {"と、以下のような問題が発生します。"}
            </p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{"問題カテゴリ"}</th>
                    <th>{"具体的な症状"}</th>
                    <th>{"影響度"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>{"見た目のばらつき"}</strong>
                    </td>
                    <td>{"ページAは青いボタン、ページBは緑のボタン"}</td>
                    <td>
                      <span className="badge high">{"高"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"コードの重複"}</strong>
                    </td>
                    <td>{"同じようなコンポーネントが複数箇所に散在"}</td>
                    <td>
                      <span className="badge high">{"高"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"開発速度の低下"}</strong>
                    </td>
                    <td>{"毎回ゼロからUIを実装する"}</td>
                    <td>
                      <span className="badge medium">{"中"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"保守コストの増大"}</strong>
                    </td>
                    <td>{"色を変えるだけで数十ファイルを修正"}</td>
                    <td>
                      <span className="badge high">{"高"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"チーム間の認識ずれ"}</strong>
                    </td>
                    <td>{"デザイナーとエンジニアで「プライマリカラー」が違う"}</td>
                    <td>
                      <span className="badge high">{"高"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"アクセシビリティ後退"}</strong>
                    </td>
                    <td>{"コントラスト比などが各自バラバラに設定される"}</td>
                    <td>
                      <span className="badge medium">{"中"}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="subsection" id="s1-2">
            <h3>{"1.2 なぜデザインシステムが必要か"}</h3>
            <p>{"デザインシステムがあるとないとでは、チームの動き方が根本的に変わります。"}</p>
            <div className="mermaid-wrap">
              <div className="mermaid" data-diagram="ds_without_with">
                <MermaidDiagram chart={DIAGRAMS.ds_without_with} preserveNaturalScale={true} />
              </div>
              <div className="mermaid-label">{"図1.2 — デザインシステムあり vs なしの比較"}</div>
            </div>
            <div className="card-grid mt16">
              <div className="card">
                <div className="card-icon">{"🎯"}</div>
                <h4>{"一貫性の確保"}</h4>
                <p>{"ユーザーが迷わない統一されたUIをどのページでも提供できます。"}</p>
              </div>
              <div className="card">
                <div className="card-icon">{"⚡"}</div>
                <h4>{"開発効率の向上"}</h4>
                <p>
                  {"再利用可能なコンポーネントにより、新機能の実装スピードが大幅に上がります。"}
                </p>
              </div>
              <div className="card">
                <div className="card-icon">{"📈"}</div>
                <h4>{"スケーラビリティ"}</h4>
                <p>{"チームが10人になっても100人になっても品質を一定に保てます。"}</p>
              </div>
              <div className="card">
                <div className="card-icon">{"🤝"}</div>
                <h4>{"共通言語の形成"}</h4>
                <p>{"デザイナーとエンジニアが同じ用語・同じコンポーネント名で話せます。"}</p>
              </div>
              <div className="card">
                <div className="card-icon">{"♿"}</div>
                <h4>{"アクセシビリティ"}</h4>
                <p>{"コントラスト比・フォーカス・ARIA属性を一元管理できます。"}</p>
              </div>
              <div className="card">
                <div className="card-icon">{"🔧"}</div>
                <h4>{"保守性の向上"}</h4>
                <p>{"デザイン変更が1か所の修正で全コンポーネントに即座に反映されます。"}</p>
              </div>
            </div>
          </div>
          <div className="subsection" id="s1-3">
            <h3>{"1.3 デザインシステムの構成要素"}</h3>
            <p>
              {"デザインシステムは「"}
              <strong>{"原子設計（Atomic Design）"}</strong>
              {
                "」の考え方で整理されることが多いです。Brad Frost が提唱したこの手法は、UIを5段階の抽象度で分類します。"
              }
            </p>
            <div className="mermaid-wrap">
              <div className="mermaid" data-diagram="atomic_design">
                <MermaidDiagram chart={DIAGRAMS.atomic_design} preserveNaturalScale={true} />
              </div>
              <div className="mermaid-label">{"図1.3 — Atomic Design の5段階階層"}</div>
            </div>
            <div className="callout info">
              <span className="callout-icon">{"📚"}</span>
              <div className="callout-body">
                <h4>{"参考：Atomic Design by Brad Frost"}</h4>
                <p>
                  {"出典: "}
                  <Ext href="https://atomicdesign.bradfrost.com/">
                    {"https://atomicdesign.bradfrost.com/"}
                  </Ext>
                  {" — 原子設計の概念を詳細に解説した書籍（ウェブでも無料公開されています）"}
                </p>
              </div>
            </div>
            <p>
              {"デザインシステムの最も根底にある概念が「"}
              <strong>{"デザイントークン（Design Tokens）"}</strong>
              {
                "」です。色・スペース・タイポグラフィなどの「値」を変数として定義し、全コンポーネントから参照します。"
              }
            </p>
            <div className="mermaid-wrap">
              <div className="mermaid" data-diagram="token_hierarchy">
                <MermaidDiagram chart={DIAGRAMS.token_hierarchy} preserveNaturalScale={true} />
              </div>
              <div className="mermaid-label">
                {
                  "図1.4 — デザイントークンの階層構造（プリミティブ → セマンティック → コンポーネント）"
                }
              </div>
            </div>
            <div className="code-wrap">
              <div className="code-header">
                <span className="code-lang">{"CSS"}</span>
                <span className="code-desc">{"デザイントークンの全体設計例"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-1"] }}
              />
            </div>
          </div>
          <div className="subsection" id="s1-4">
            <h3>{"1.4 代表的なデザインシステムの事例"}</h3>
            <p>
              {
                "世界の主要テック企業は独自のデザインシステムを公開しています。特徴を把握して設計の参考にしましょう。"
              }
            </p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{"システム名"}</th>
                    <th>{"企業"}</th>
                    <th>{"主な特徴"}</th>
                    <th>{"技術スタック"}</th>
                    <th>{"公式URL"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>{"Material Design 3"}</strong>
                    </td>
                    <td>{"Google"}</td>
                    <td>{"物理的なマテリアルの振る舞いを模倣。ダイナミックカラー対応。"}</td>
                    <td>{"Web / Android / iOS"}</td>
                    <td>
                      <Ext href="https://m3.material.io/">{"m3.material.io"}</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"Lightning DS"}</strong>
                    </td>
                    <td>{"Salesforce"}</td>
                    <td>{"エンタープライズ向け。アクセシビリティの基準が特に高い。"}</td>
                    <td>{"Web Components / LWC"}</td>
                    <td>
                      <Ext href="https://www.lightningdesignsystem.com/">
                        {"lightningdesignsystem.com"}
                      </Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"Carbon DS"}</strong>
                    </td>
                    <td>{"IBM"}</td>
                    <td>{"WCAG準拠に強み。4つのテーマ（白・グレー・黒・暗）。"}</td>
                    <td>{"React / Web"}</td>
                    <td>
                      <Ext href="https://carbondesignsystem.com/">{"carbondesignsystem.com"}</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"Ant Design"}</strong>
                    </td>
                    <td>{"Alibaba"}</td>
                    <td>{"React向けに最適化。豊富なUIコンポーネント数。"}</td>
                    <td>{"React / Vue / Angular"}</td>
                    <td>
                      <Ext href="https://ant.design/">{"ant.design"}</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"Polaris"}</strong>
                    </td>
                    <td>{"Shopify"}</td>
                    <td>{"Eコマース特化。マーチャントの業務フローを起点に設計。"}</td>
                    <td>{"React"}</td>
                    <td>
                      <Ext href="https://polaris.shopify.com/">{"polaris.shopify.com"}</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"Primer"}</strong>
                    </td>
                    <td>{"GitHub"}</td>
                    <td>{"開発者ツール向け。コードの可読性・開発者体験を重視。"}</td>
                    <td>{"React / CSS"}</td>
                    <td>
                      <Ext href="https://primer.style/">{"primer.style"}</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"Fluent UI"}</strong>
                    </td>
                    <td>{"Microsoft"}</td>
                    <td>{"Office 365との統一感。Windows・Web・iOS横断。"}</td>
                    <td>{"React / Web Components"}</td>
                    <td>
                      <Ext href="https://fluent2.microsoft.design/">
                        {"fluent2.microsoft.design"}
                      </Ext>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="callout success">
              <span className="callout-icon">{"🎯"}</span>
              <div className="callout-body">
                <h4>{"初学者へのアドバイス"}</h4>
                <p>
                  {
                    "既存のデザインシステムのソースコードを読むことは、CSS設計の最良の教材です。特に "
                  }
                  <Ext href="https://carbondesignsystem.com/">{"Carbon Design System"}</Ext>
                  {" はデザイントークンの設計が特に参考になります。"}
                </p>
              </div>
            </div>
          </div>
          <div className="subsection" id="s1-5">
            <h3>{"1.5 デザインシステムの構築ステップ"}</h3>
            <p>
              {
                "ゼロからデザインシステムを構築する際の推奨フローを示します。一気に完成させようとせず、"
              }
              <strong>{"段階的に育てていくアプローチ"}</strong>
              {"が成功の鍵です。"}
            </p>
            <div className="mermaid-wrap">
              <div className="mermaid" data-diagram="ds_build_steps">
                <MermaidDiagram chart={DIAGRAMS.ds_build_steps} preserveNaturalScale={true} />
              </div>
              <div className="mermaid-label">{"図1.5 — デザインシステム構築の7ステップフロー"}</div>
            </div>
            <div className="step-list mt24">
              <div className="step-item">
                <div className="step-num">{"1"}</div>
                <div className="step-content">
                  <h4>{"既存UIの棚卸し"}</h4>
                  <p>
                    {
                      "現在使用されているすべての色・フォント・スペース・コンポーネントをリストアップします。意外にも数十〜数百種類の値が散在していることが多いです。"
                    }
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-num">{"2"}</div>
                <div className="step-content">
                  <h4>{"デザイン原則の言語化"}</h4>
                  <p>
                    {
                      "「シンプルさを大切にする」「常にアクセシブルであること」など、設計の意思決定を支える価値観を文書化します。"
                    }
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-num">{"3"}</div>
                <div className="step-content">
                  <h4>{"デザイントークンの設定"}</h4>
                  <p>
                    {
                      "プリミティブ → セマンティックの2層構造でトークンを定義します（CSS カスタムプロパティ推奨）。"
                    }
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-num">{"4"}</div>
                <div className="step-content">
                  <h4>{"基本コンポーネントの作成"}</h4>
                  <p>
                    {
                      "Button・Input・Label・Badge などの原子（Atom）レベルのコンポーネントを定義します。"
                    }
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-num">{"5"}</div>
                <div className="step-content">
                  <h4>{"複合コンポーネントの組み合わせ"}</h4>
                  <p>
                    {
                      "原子を組み合わせた SearchBar・Card・Modal などの分子（Molecule）・有機体（Organism）を構築します。"
                    }
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-num">{"6"}</div>
                <div className="step-content">
                  <h4>{"ドキュメントの整備"}</h4>
                  <p>
                    {
                      "Storybook などを活用してコンポーネントの使い方・バリアント・禁止事項を記録します。"
                    }
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-num">{"7"}</div>
                <div className="step-content">
                  <h4>{"継続的なメンテナンス"}</h4>
                  <p>
                    {
                      "デザインシステムは「完成」しません。プロダクトの進化に合わせて継続的に更新・改善します。"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="subsection" id="s1-6">
            <h3>{"1.6 ベストプラクティス"}</h3>
            <p>{"デザインシステムの設計・運用で陥りやすいミスと、その解決策を示します。"}</p>
            <h4 style={{ color: "var(--emerald)", margin: "24px 0px 12px", fontSize: "1rem" }}>
              {"✅ BP1：トークンは階層化して定義する"}
            </h4>
            <p>
              {
                "直接ハードコードされた値を使うと変更に弱くなります。必ずプリミティブ → セマンティックの2層構造を使います。"
              }
            </p>
            <div className="comp-grid">
              <div className="comp-card bad">
                <div className="comp-head">{"❌ NG — ハードコード"}</div>
                <pre
                  className="language-css"
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-2"] }}
                />
              </div>
              <div className="comp-card good">
                <div className="comp-head">{"✅ OK — トークン経由"}</div>
                <pre
                  className="language-css"
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-3"] }}
                />
              </div>
            </div>
            <h4 style={{ color: "var(--emerald)", margin: "24px 0px 12px", fontSize: "1rem" }}>
              {"✅ BP2：コンポーネントは「単一責任の原則」で設計する"}
            </h4>
            <p>
              {"コンポーネント自身は"}
              <strong>{"見た目だけ"}</strong>
              {"を担当し、配置（マージン・幅）は使う側が決めます。"}
            </p>
            <div className="comp-grid">
              <div className="comp-card bad">
                <div className="comp-head">{"❌ NG — レイアウトを持つコンポーネント"}</div>
                <pre
                  className="language-css"
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-4"] }}
                />
              </div>
              <div className="comp-card good">
                <div className="comp-head">{"✅ OK — 見た目だけを担当"}</div>
                <pre
                  className="language-css"
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-5"] }}
                />
              </div>
            </div>
            <h4 style={{ color: "var(--emerald)", margin: "24px 0px 12px", fontSize: "1rem" }}>
              {"✅ BP3：バリアントはクラス修飾子で表現する（BEM方式）"}
            </h4>
            <div className="code-wrap">
              <div className="code-header">
                <span className="code-lang">{"HTML + CSS"}</span>
                <span className="code-desc">{"BEMによるバリアント設計"}</span>
              </div>
              <pre
                className="language-html"
                dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-6"] }}
              />
            </div>
            <div className="code-wrap">
              <div className="code-header">
                <span className="code-lang">{"CSS"}</span>
                <span className="code-desc">{"BEMスタイル定義"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-7"] }}
              />
            </div>
            <h4 style={{ color: "var(--emerald)", margin: "24px 0px 12px", fontSize: "1rem" }}>
              {"✅ BP4：ダークモード対応はトークンで自動化する"}
            </h4>
            <div className="code-wrap">
              <div className="code-header">
                <span className="code-lang">{"CSS"}</span>
                <span className="code-desc">
                  {"メディアクエリ + CSS変数によるダークモード自動切り替え"}
                </span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-8"] }}
              />
            </div>
          </div>
        </section>
        <section className="section" id="s2">
          <div className="section-header">
            <span className="section-num">{"Ch. 2"}</span>
            <h2>{"CSS設計の基礎原則"}</h2>
          </div>
          <div className="subsection" id="s2-1">
            <h3>{"2.1 CSSカスケードと詳細度"}</h3>
            <p>
              {"CSSで最も重要な概念のひとつが「"}
              <strong>{"カスケード（Cascade）"}</strong>
              {
                "」です。複数のスタイルが同じ要素に適用された場合、どれが優先されるかを3つのルールで決定します。"
              }
            </p>
            <div className="mermaid-wrap">
              <div className="mermaid" data-diagram="css_cascade">
                <MermaidDiagram chart={DIAGRAMS.css_cascade} preserveNaturalScale={true} />
              </div>
              <div className="mermaid-label">{"図2.1 — CSSカスケードの優先度決定ルール"}</div>
            </div>
            <h4 style={{ color: "var(--text-primary)", margin: "28px 0px 12px", fontSize: "1rem" }}>
              {"詳細度（Specificity）の計算方法"}
            </h4>
            <p>
              {"詳細度は "}
              <strong>{"(a, b, c)"}</strong>
              {" の3桁で計算します（インラインは特別扱い）。大きい桁が優先されます。"}
            </p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{"セレクタの種類"}</th>
                    <th>{"詳細度"}</th>
                    <th>{"ビジュアル"}</th>
                    <th>{"例"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>{"インラインスタイル"}</strong>
                    </td>
                    <td>
                      <code>{"(1,0,0,0)"}</code>
                    </td>
                    <td>
                      <div className="spec-visual">
                        <div className="spec-box spec-a">{"1"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-b">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-c">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-d">{"0"}</div>
                      </div>
                    </td>
                    <td>
                      <code>{'style="color:red"'}</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"IDセレクタ"}</strong>
                    </td>
                    <td>
                      <code>{"(0,1,0,0)"}</code>
                    </td>
                    <td>
                      <div className="spec-visual">
                        <div className="spec-box spec-a">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-b">{"1"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-c">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-d">{"0"}</div>
                      </div>
                    </td>
                    <td>
                      <code>{"#header"}</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"クラス・属性・疑似クラス"}</strong>
                    </td>
                    <td>
                      <code>{"(0,0,1,0)"}</code>
                    </td>
                    <td>
                      <div className="spec-visual">
                        <div className="spec-box spec-a">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-b">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-c">{"1"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-d">{"0"}</div>
                      </div>
                    </td>
                    <td>
                      <code>{".button"}</code>
                      {", "}
                      <code>{'[type="text"]'}</code>
                      {", "}
                      <code>{":hover"}</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"タグ・疑似要素"}</strong>
                    </td>
                    <td>
                      <code>{"(0,0,0,1)"}</code>
                    </td>
                    <td>
                      <div className="spec-visual">
                        <div className="spec-box spec-a">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-b">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-c">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-d">{"1"}</div>
                      </div>
                    </td>
                    <td>
                      <code>{"div"}</code>
                      {", "}
                      <code>{"p"}</code>
                      {", "}
                      <code>{"::before"}</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"ユニバーサル・継承"}</strong>
                    </td>
                    <td>
                      <code>{"(0,0,0,0)"}</code>
                    </td>
                    <td>
                      <div className="spec-visual">
                        <div className="spec-box spec-a">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-b">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-c">{"0"}</div>
                        <span className="spec-sep">{","}</span>
                        <div className="spec-box spec-d">{"0"}</div>
                      </div>
                    </td>
                    <td>
                      <code>{"*"}</code>
                      {", "}
                      <code>{"inherit"}</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="code-wrap">
              <div className="code-header">
                <span className="code-lang">{"CSS"}</span>
                <span className="code-desc">
                  {"詳細度の計算例 — 数値を比べることで適用順が決まる"}
                </span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-9"] }}
              />
            </div>
            <div className="callout danger">
              <span className="callout-icon">{"⚠️"}</span>
              <div className="callout-body">
                <h4>{"!important の多用は厳禁"}</h4>
                <p>
                  <code>{"!important"}</code>
                  {
                    " は「詳細度の戦争」を引き起こし、後からスタイルを変更することが困難になります。"
                  }
                  <code>{"!important"}</code>
                  {
                    " を使いたくなったら、設計を見直すサインです。CSS設計手法（BEM等）を適切に使えば、ほぼ必要ありません。出典: "
                  }
                  <Ext href="https://developer.mozilla.org/ja/docs/Web/CSS/Specificity">
                    {"MDN — 詳細度"}
                  </Ext>
                </p>
              </div>
            </div>
            <h4 style={{ color: "var(--text-primary)", margin: "28px 0px 12px", fontSize: "1rem" }}>
              {"CSS Cascade Layers（@layer）— 最新の解決策"}
            </h4>
            <p>
              {
                "CSS Layers を使うと、詳細度に依存せずスタイルの優先順位を明示的に制御できます（2023年以降、全主要ブラウザ対応）。"
              }
            </p>
            <div className="code-wrap">
              <div className="code-header">
                <span className="code-lang">{"CSS"}</span>
                <span className="code-desc">{"@layer — レイヤーで優先度を明示管理"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-10"] }}
              />
            </div>
            <div className="callout info">
              <span className="callout-icon">{"🔗"}</span>
              <div className="callout-body">
                <h4>{"参考：CSS Cascade について深く学ぶ"}</h4>
                <p>
                  <Ext href="https://developer.mozilla.org/ja/docs/Web/CSS/Cascade">
                    {"MDN — カスケード、詳細度、継承"}
                  </Ext>
                  {" | "}
                  <Ext href="https://web.dev/learn/css/the-cascade">{"web.dev — The Cascade"}</Ext>
                </p>
              </div>
            </div>
          </div>
          <div className="subsection" id="s2-2">
            <h3>{"2.2 主要なCSS設計手法"}</h3>
            <p>
              {
                "CSS設計には複数のアプローチがあります。それぞれの特徴を理解し、プロジェクトに合ったものを選択しましょう。"
              }
            </p>
            <div className="mermaid-wrap">
              <div className="mermaid" data-diagram="css_methodologies">
                <MermaidDiagram chart={DIAGRAMS.css_methodologies} preserveNaturalScale={true} />
              </div>
              <div className="mermaid-label">{"図2.2 — 主要CSS設計手法の概要"}</div>
            </div>
            <h4 style={{ color: "var(--sky)", margin: "28px 0px 12px", fontSize: "1rem" }}>
              {"🔷 BEM（Block Element Modifier）"}
            </h4>
            <p>
              {"最も広く普及しているCSS命名規則です。"}
              <strong>{"Block__Element--Modifier"}</strong>
              {" の形式でクラス名を構成します。"}
            </p>
            <div className="mermaid-wrap">
              <div className="mermaid" data-diagram="bem_structure">
                <MermaidDiagram chart={DIAGRAMS.bem_structure} preserveNaturalScale={true} />
              </div>
              <div className="mermaid-label">{"図2.3 — BEM の3要素と命名規則"}</div>
            </div>
            <div className="code-wrap">
              <div className="code-header">
                <span className="code-lang">{"HTML + CSS"}</span>
                <span className="code-desc">{"BEM — カードコンポーネントの完全な例"}</span>
              </div>
              <pre
                className="language-html"
                dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-11"] }}
              />
            </div>
            <div className="code-wrap">
              <div className="code-header">
                <span className="code-lang">{"CSS"}</span>
                <span className="code-desc">{"BEM スタイル定義（フラットで詳細度が低い）"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-12"] }}
              />
            </div>
            <div className="divider"></div>
            <h4 style={{ color: "var(--amber)", margin: "0px 0px 12px", fontSize: "1rem" }}>
              {"🔶 OOCSS（Object-Oriented CSS）"}
            </h4>
            <p>
              {"「"}
              <strong>{"構造（Structure）"}</strong>
              {"」と「"}
              <strong>{"スキン（Skin）"}</strong>
              {"」を分離し、再利用性を高めるアプローチです。Nicole Sullivan が提唱しました。"}
            </p>
            <div className="comp-grid">
              <div className="comp-card bad">
                <div className="comp-head">{"❌ NG — 構造とスキンが混在（重複多数）"}</div>
                <pre
                  className="language-css"
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-13"] }}
                />
              </div>
              <div className="comp-card good">
                <div className="comp-head">{"✅ OK — 構造とスキンを分離"}</div>
                <pre
                  className="language-css"
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-14"] }}
                />
              </div>
            </div>
            <div className="callout info">
              <span className="callout-icon">{"📚"}</span>
              <div className="callout-body">
                <h4>{"参考：OOCSS"}</h4>
                <p>
                  {"Nicole Sullivan による OOCSS の原典: "}
                  <Ext href="https://github.com/stubbornella/oocss/wiki">
                    {"github.com/stubbornella/oocss"}
                  </Ext>
                </p>
              </div>
            </div>
            <div className="divider"></div>
            <h4 style={{ color: "var(--emerald)", margin: "0px 0px 12px", fontSize: "1rem" }}>
              {"🔷 SMACSS（Scalable and Modular Architecture for CSS）"}
            </h4>
            <p>
              {"CSSのルールを5つのカテゴリに分類する設計手法です。Jonathan Snook が考案しました。"}
            </p>
            <div className="mermaid-wrap">
              <div className="mermaid" data-diagram="smacss_categories">
                <MermaidDiagram chart={DIAGRAMS.smacss_categories} preserveNaturalScale={true} />
              </div>
              <div className="mermaid-label">{"図2.4 — SMACSS の5カテゴリ分類"}</div>
            </div>
            <div className="code-wrap">
              <div className="code-header">
                <span className="code-lang">{"CSS"}</span>
                <span className="code-desc">{"SMACSS — 各カテゴリの実装例"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-15"] }}
              />
            </div>
            <div className="divider"></div>
            <h4 style={{ color: "var(--violet)", margin: "0px 0px 12px", fontSize: "1rem" }}>
              {"⚡ Utility-First（Tailwind CSS的アプローチ）"}
            </h4>
            <p>
              {
                "単一の目的を持つ小さなクラス（ユーティリティ）を組み合わせてスタイルを構成します。Tailwind CSS がこのアプローチを普及させました。"
              }
            </p>
            <div className="comp-grid">
              <div className="comp-card bad">
                <div className="comp-head">{"従来のアプローチ"}</div>
                <pre
                  className="language-html"
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-16"] }}
                />
              </div>
              <div className="comp-card good">
                <div className="comp-head">{"✅ Utility-First（Tailwind CSS風）"}</div>
                <pre
                  className="language-html"
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS["code-17"] }}
                />
              </div>
            </div>
            <div className="callout warn">
              <span className="callout-icon">{"⚡"}</span>
              <div className="callout-body">
                <h4>{"Utility-First のトレードオフ"}</h4>
                <p>
                  {
                    "クラス名を覚えれば実装が速く、CSSファイルが肥大化しません。一方でHTMLが長くなり、チームで一貫性を保つには規律が必要です。参考: "
                  }
                  <Ext href="https://tailwindcss.com/docs">{"Tailwind CSS 公式ドキュメント"}</Ext>
                </p>
              </div>
            </div>
            <h4 style={{ color: "var(--text-primary)", margin: "28px 0px 12px", fontSize: "1rem" }}>
              {"各手法の比較"}
            </h4>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{"手法"}</th>
                    <th>{"学習コスト"}</th>
                    <th>{"保守性"}</th>
                    <th>{"柔軟性"}</th>
                    <th>{"HTML可読性"}</th>
                    <th>{"適したプロジェクト"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>{"BEM"}</strong>
                    </td>
                    <td>
                      <span className="badge low">{"低"}</span>
                    </td>
                    <td>
                      <span className="badge low">{"高"}</span>
                    </td>
                    <td>
                      <span className="badge medium">{"中"}</span>
                    </td>
                    <td>
                      <span className="badge low">{"高"}</span>
                    </td>
                    <td>{"中〜大規模、チーム開発"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"OOCSS"}</strong>
                    </td>
                    <td>
                      <span className="badge medium">{"中"}</span>
                    </td>
                    <td>
                      <span className="badge low">{"高"}</span>
                    </td>
                    <td>
                      <span className="badge low">{"高"}</span>
                    </td>
                    <td>
                      <span className="badge medium">{"中"}</span>
                    </td>
                    <td>{"大規模、再利用性重視"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"SMACSS"}</strong>
                    </td>
                    <td>
                      <span className="badge medium">{"中"}</span>
                    </td>
                    <td>
                      <span className="badge low">{"高"}</span>
                    </td>
                    <td>
                      <span className="badge medium">{"中"}</span>
                    </td>
                    <td>
                      <span className="badge low">{"高"}</span>
                    </td>
                    <td>{"大規模、構造化重視"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"Utility-First"}</strong>
                    </td>
                    <td>
                      <span className="badge low">{"低*"}</span>
                    </td>
                    <td>
                      <span className="badge medium">{"中"}</span>
                    </td>
                    <td>
                      <span className="badge low">{"高"}</span>
                    </td>
                    <td>
                      <span className="badge high">{"低"}</span>
                    </td>
                    <td>{"小〜大規模、プロトタイプ"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"CSS Modules"}</strong>
                    </td>
                    <td>
                      <span className="badge medium">{"中"}</span>
                    </td>
                    <td>
                      <span className="badge low">{"高"}</span>
                    </td>
                    <td>
                      <span className="badge low">{"高"}</span>
                    </td>
                    <td>
                      <span className="badge low">{"高"}</span>
                    </td>
                    <td>{"React/Vue コンポーネント"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
              {"*ユーティリティ名は Tailwind CSS の命名規則を学習する必要がある"}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
