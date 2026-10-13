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
      </main>
    </div>
  );
}
