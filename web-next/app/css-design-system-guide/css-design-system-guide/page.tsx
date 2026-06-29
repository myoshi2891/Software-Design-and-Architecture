import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import CssDesignSystemSidebar from "./CssDesignSystemSidebar";

const NAV_GROUPS = [
  {
    title: "入門",
    items: [
      { id: "s1", num: "01", label: "デザインシステムとは", badge: { text: "入門", variant: "g" as const } },
      { id: "s2", num: "02", label: "CSS設計の基礎原則", badge: { text: "入門", variant: "g" as const } },
    ],
  },
  {
    title: "基礎",
    items: [
      { id: "s3", num: "03", label: "CSS変数システム", badge: { text: "基礎", variant: "y" as const } },
      { id: "s4", num: "04", label: "カラーシステム", badge: { text: "基礎", variant: "y" as const } },
      { id: "s5", num: "05", label: "タイポグラフィ", badge: { text: "基礎", variant: "y" as const } },
      { id: "s6", num: "06", label: "スペーシング", badge: { text: "基礎", variant: "y" as const } },
    ],
  },
  {
    title: "中級",
    items: [
      { id: "s7", num: "07", label: "グリッド・レイアウト", badge: { text: "中級", variant: "o" as const } },
      { id: "s8", num: "08", label: "BEM・コンポーネント", badge: { text: "中級", variant: "o" as const } },
      { id: "s9", num: "09", label: "レスポンシブ設計", badge: { text: "中級", variant: "o" as const } },
      { id: "s10", num: "10", label: "アクセシビリティ", badge: { text: "中級", variant: "o" as const } },
      { id: "s16", num: "16", label: "ツール・エコシステム", badge: { text: "中級", variant: "o" as const } },
    ],
  },
  {
    title: "上級",
    items: [
      { id: "s11", num: "11", label: "アニメーション", badge: { text: "上級", variant: "r" as const } },
      { id: "s12", num: "12", label: "CSSアーキテクチャ", badge: { text: "上級", variant: "r" as const } },
      { id: "s13", num: "13", label: "デザイントークン", badge: { text: "上級", variant: "r" as const } },
      { id: "s14", num: "14", label: "実践実装例", badge: { text: "上級", variant: "r" as const } },
      { id: "s15", num: "15", label: "パフォーマンス最適化", badge: { text: "上級", variant: "r" as const } },
    ],
  },
  {
    title: "まとめ",
    items: [
      { id: "s17", num: "17", label: "ベストプラクティス総まとめ" }
    ]
  }
];

const MERMAID_CHARTS = {
  dsStructure: `graph TD
  DS["🎨 デザインシステム"]
  DS --> F["🧱 ファンデーション層（基盤）"]
  DS --> C["🧩 コンポーネント層（再利用部品）"]
  DS --> P["📐 パターン層（組み合わせ方）"]
  DS --> G["📖 ドキュメント層（使い方）"]
  F --> F1["🎨 カラーシステム"] & F2["📝 タイポグラフィ"] & F3["📏 スペーシング"] & F4["✨ アニメーション"]
  C --> C1["ボタン・フォーム"] & C2["カード・リスト"] & C3["モーダル・ナビ"]
  P --> P1["ページレイアウト"] & P2["フォームパターン"]
  G --> G1["アクセシビリティ"] & G2["Storybook・カタログ"]
  style DS fill:#1a1a2e,color:#eee,stroke:#e94560
  style F fill:#16213e,color:#eee,stroke:#0f3460
  style C fill:#0f3460,color:#eee,stroke:#e94560
  style P fill:#533483,color:#eee,stroke:#e94560
  style G fill:#2d6a4f,color:#eee,stroke:#52b788`,

  cascade: `flowchart TD
  Q["同じ要素に複数のスタイルがぶつかった場合、どれが適用される？"]
  Q --> O["① 起源を確認\\\\nブラウザ &lt; ユーザー &lt; 開発者"]
  O --> S["② 詳細度を比較\\\\n数値が高い方が優先"]
  S --> R["③ ソース順を確認\\\\n詳細度が同じなら後に書いた方が勝つ"]
  R --> W["🏆 適用スタイルが決定"]
  style Q fill:#1e3a5f,color:#e2e8f0,stroke:#3b82f6
  style O fill:#1e3a5f,color:#7dd3fc,stroke:#3b82f6
  style S fill:#451a03,color:#fdba74,stroke:#f97316
  style R fill:#14532d,color:#86efac,stroke:#22c55e
  style W fill:#7c3aed,color:#fff,stroke:#6d28d9`,

  cssvarFlow: `flowchart LR
  A[":root に定義\\\\n--color-primary: #3498db"]
  B["var() で参照\\\\ncolor: var(--color-primary)"]
  C["1箇所変えるだけで\\\\n全体に即時反映！"]
  A --> B --> C
  style A fill:#1e3a5f,color:#7dd3fc,stroke:#3b82f6
  style B fill:#14532d,color:#86efac,stroke:#22c55e
  style C fill:#7c3aed,color:#e9d5ff,stroke:#6d28d9`,

  hsl: `graph TB
  subgraph MODEL["HSLカラーモデル（色を数値で体系的に表現する方法）"]
    H["H: 色相（Hue）\\\\n0〜360°の角度で色を指定\\\\n赤=0° / 緑=120° / 青=240°"]
    S["S: 彩度（Saturation）\\\\n0% = グレースケール\\\\n100% = 最も鮮やかな色"]
    L["L: 明度（Lightness）\\\\n0% = 黒 / 50% = 基準色 / 100% = 白"]
  end
  subgraph SCALE["青パレット生成例（色相=210°固定・明度を変化させる）"]
    P50["blue-50\\\\nhsl(210, 100%, 97%)\\\\nほぼ白に近い淡い青"]
    P500["blue-500  ←  ベース\\\\nhsl(210, 70%, 52%)\\\\nメインカラー"]
    P900["blue-900\\\\nhsl(210, 80%, 16%)\\\\nほぼ黒に近い深い青"]
  end
  MODEL --> SCALE
  style H    fill:#1e3a5f,color:#93c5fd,stroke:#3b82f6
  style S    fill:#1e3a5f,color:#93c5fd,stroke:#3b82f6
  style L    fill:#1e3a5f,color:#93c5fd,stroke:#3b82f6
  style P50  fill:#ebf5fb,color:#154360,stroke:#85c1e9
  style P500 fill:#3498db,color:#fff,stroke:#2980b9
  style P900 fill:#0d2741,color:#fff,stroke:#0a1f33
  style MODEL fill:#0c1828,color:#e2e8f0,stroke:#3b82f6
  style SCALE fill:#0c1828,color:#e2e8f0,stroke:#3b82f6`,

  gridFlex: `graph TD
  Q["レイアウトを作りたい"]
  Q --> D{"何次元のレイアウト？"}
  D --> T["2次元（行と列を同時に制御）"]
  D --> O["1次元（横か縦のどちらか）"]
  T --> GRID["CSS Grid\\\\ndisplay: grid"]
  O --> FLEX["Flexbox\\\\ndisplay: flex"]
  GRID --> G1["ページ全体のレイアウト\\\\nカードグリッド\\\\nダッシュボード"]
  FLEX --> F1["ナビゲーションバー\\\\nボタングループ\\\\nセンタリング"]
  style GRID fill:#1e3a5f,color:#7dd3fc,stroke:#3b82f6
  style FLEX fill:#14532d,color:#86efac,stroke:#22c55e`,

  bem: `graph TD
  BEM["🧱 BEM命名規則"]
  BEM --> B["Block（ブロック）\\\\n.card / .button / .nav\\\\n独立した意味を持つ最小単位"]
  BEM --> E["Element（エレメント）\\\\n.card__title / .nav__item\\\\n__ 二重アンダースコアで繋ぐ"]
  BEM --> M["Modifier（モディファイア）\\\\n.card--featured / .btn--primary\\\\n-- 二重ハイフンで繋ぐ"]
  B --> B1["単独で存在できる\\\\n他のコンポーネントに依存しない"]
  E --> E1["ブロックを構成する部品\\\\nブロックの外では意味を持たない"]
  M --> M1["見た目や状態のバリエーション\\\\nブロックまたは要素に追加"]
  style BEM fill:#1a1a2e,color:#eee,stroke:#e94560
  style B fill:#1e3a5f,color:#7dd3fc,stroke:#3b82f6
  style E fill:#14532d,color:#86efac,stroke:#22c55e
  style M fill:#4c1d95,color:#e9d5ff,stroke:#7c3aed`,

  pour: `graph TD
  POUR["♿ WCAG 2.1 の4原則（POUR）"]
  POUR --> P["P: Perceivable（知覚可能）\\\\nすべての情報を何らかの感覚で認識できる"]
  POUR --> O["O: Operable（操作可能）\\\\nすべての機能をキーボードで操作できる"]
  POUR --> U["U: Understandable（理解可能）\\\\n情報とUIが理解しやすい"]
  POUR --> R["R: Robust（堅牢）\\\\n支援技術が確実に解釈できる"]
  P --> P1["代替テキスト（alt属性）\\\\nコントラスト比 4.5:1以上"]
  O --> O1["キーボードフォーカスが見える\\\\nタッチターゲット44px以上"]
  U --> U1["エラーメッセージが具体的\\\\nフォームラベルが正確"]
  R --> R1["正しいHTMLセマンティクス\\\\nARIAの適切な使用"]
  style POUR fill:#1a1a2e,color:#eee,stroke:#e94560
  style P fill:#1e3a5f,color:#7dd3fc,stroke:#3b82f6
  style O fill:#14532d,color:#86efac,stroke:#22c55e
  style U fill:#451a03,color:#fdba74,stroke:#f97316
  style R fill:#4c1d95,color:#e9d5ff,stroke:#7c3aed`,

  animPerf: `graph LR
  subgraph FAST["✅ GPU処理（高速・推奨）: transform・opacity"]
    F1["値を変更"] --> F2["Composite のみ\\\\nGPUが直接処理\\\\n60fps 安定維持"]
  end
  subgraph SLOW["❌ CPU処理（低速・避ける）: width・height・margin"]
    S1["値を変更"] --> S2["Layout\\\\n再計算"] --> S3["Paint\\\\n再描画"] --> S4["Composite"]
  end
  F2 ~~~ S1
  style FAST fill:#052e16,color:#86efac,stroke:#22c55e
  style SLOW fill:#450a0a,color:#fca5a5,stroke:#ef4444
  style F1 fill:#1e3a5f,color:#7dd3fc,stroke:#3b82f6
  style F2 fill:#14532d,color:#86efac,stroke:#22c55e
  style S1 fill:#7f1d1d,color:#fca5a5,stroke:#ef4444
  style S2 fill:#7f1d1d,color:#fca5a5,stroke:#ef4444
  style S3 fill:#7f1d1d,color:#fca5a5,stroke:#ef4444
  style S4 fill:#7f1d1d,color:#fca5a5,stroke:#ef4444`,

  itcss: `graph TD
  subgraph TRIANGLE["ITCSS — 逆三角形（上ほど広いスコープ・低い詳細度）"]
    S7["① Settings — 変数定義のみ（CSS出力なし）\\\\n最も広いスコープ・最も低い詳細度"]
    S6["② Tools — Sassミックスイン・関数"]
    S5["③ Elements / Base — HTMLタグのデフォルト"]
    S4["④ Objects — レイアウトパターン"]
    S3["⑤ Components — UIコンポーネント"]
    S2["⑥ Overrides — 緊急上書き"]
    S1["⑦ Utilities — ヘルパークラス（最強詳細度）"]
  end
  S7 --> S6 --> S5 --> S4 --> S3 --> S2 --> S1
  style S7 fill:#1e3a5f,color:#bfdbfe,stroke:#3b82f6
  style S5 fill:#1e3a5f,color:#93c5fd,stroke:#3b82f6
  style S3 fill:#1e3a5f,color:#60a5fa,stroke:#3b82f6
  style S1 fill:#1d4ed8,color:#fff,stroke:#1e40af`,

  tokenFlow: `flowchart LR
  D["🎨 デザイナー\\\\nFigma Variables で\\\\nトークンを定義"]
  E["📤 Tokens Studio\\\\nJSONへエクスポート"]
  G["🤖 Style Dictionary\\\\n自動変換ツール"]
  W["🌐 CSS変数（Web）"]
  I["🍎 Swift定数（iOS）"]
  A["🤖 Kotlin定数（Android）"]
  D --> E --> G --> W & I & A
  style D fill:#4c1d95,color:#e9d5ff,stroke:#7c3aed
  style G fill:#7f1d1d,color:#fca5a5,stroke:#ef4444
  style W fill:#1e3a5f,color:#7dd3fc,stroke:#3b82f6
  style I fill:#14532d,color:#86efac,stroke:#22c55e
  style A fill:#451a03,color:#fdba74,stroke:#f97316`,

  tools: `graph TD
  subgraph DESIGN["🎨 デザイン"]
    FIGMA["Figma\\\\nUIデザイン・変数管理"]
    TS["Tokens Studio\\\\nトークン → JSON"]
  end
  subgraph BUILD["🔧 ビルド"]
    SD["Style Dictionary\\\\n多プラットフォーム変換"]
    POSTCSS["PostCSS\\\\nCSS変換・最適化"]
    STYLELINT["Stylelint\\\\n品質チェック"]
  end
  subgraph DOC["📚 ドキュメント・テスト"]
    STORY["Storybook\\\\nコンポーネントカタログ"]
    CHROMATIC["Chromatic\\\\nビジュアルリグレッション"]
    AXE["axe-core\\\\na11y自動テスト"]
  end
  FIGMA --> TS --> SD --> POSTCSS --> STYLELINT
  STORY --> CHROMATIC & AXE
  style FIGMA fill:#4c1d95,color:#e9d5ff,stroke:#7c3aed
  style STORY fill:#7f1d1d,color:#fca5a5,stroke:#ef4444
  style SD fill:#451a03,color:#fdba74,stroke:#f97316
  style AXE fill:#14532d,color:#86efac,stroke:#22c55e`
};

const CODE_BLOCKS = {
  code1: `<span class="cm">/* ❌ 悪い例：詳細度が高すぎて上書き困難 */</span>
<span class="fn">#sidebar</span> .navigation ul li a<span class="fn">.active</span> &#123;
  color: <span class="st">blue</span>; <span class="cm">/* 詳細度: 0,1,2,3 → 非常に高い */</span>
&#125;
<span class="cm">/* ✅ 良い例：フラットなクラスで詳細度を低く均一に */</span>
<span class="fn">.nav-link--active</span> &#123;
  color: <span class="st">blue</span>; <span class="cm">/* 詳細度: 0,0,1,0 → 低くて管理しやすい */</span>
&#125;
<span class="cm">/* ✅ さらに良い：@layer で意図的に優先順位を制御 */</span>
<span class="kw">@layer</span> components &#123; <span class="fn">.nav-link--active</span> &#123; color: <span class="st">blue</span>; &#125; &#125;
<span class="kw">@layer</span> utilities  &#123; <span class="fn">.text-red</span> &#123; color: <span class="st">red</span>; &#125; <span class="cm">/* utilities &gt; components */</span> &#125;`,

  code2: `<span class="cm">/* 命名規則：--[カテゴリ]-[サブカテゴリ]-[バリアント] */</span>
<span class="fn">:root</span> &#123;
  --color-primary-500: <span class="nu">#3498db</span>;
  --color-primary-600: <span class="nu">#2980b9</span>;
  --font-size-base: <span class="nu">1rem</span>;
  --space-4: <span class="nu">1rem</span>;
&#125;
<span class="cm">/* var() で参照 / フォールバック値も指定可 */</span>
<span class="fn">.button</span> &#123;
  background-color: <span class="kw">var</span>(--color-primary-500);
  font-size: <span class="kw">var</span>(--font-size-btn, <span class="kw">var</span>(--font-size-base, <span class="nu">1rem</span>));
&#125;
<span class="cm">/* コンポーネントスコープで上書き */</span>
<span class="fn">.card</span> &#123; --card-padding: <span class="kw">var</span>(--space-6); padding: <span class="kw">var</span>(--card-padding); &#125;
<span class="fn">.card--compact</span> &#123; --card-padding: <span class="kw">var</span>(--space-3); &#125;`,

  code3: `<span class="fn">:root</span> &#123; --bg-page: <span class="nu">#ffffff</span>; --text-base: <span class="nu">#212529</span>; &#125;
<span class="cm">/* ① OSの設定に連動（自動切替）*/</span>
<span class="kw">@media</span> (prefers-color-scheme: dark) &#123;
  <span class="fn">:root</span> &#123; --bg-page: <span class="nu">#0d1117</span>; --text-base: <span class="nu">#f0f6fc</span>; &#125;
&#125;
<span class="cm">/* ② data属性でJSから切替（手動切替）*/</span>
<span class="fn">[data-theme="dark"]</span> &#123; --bg-page: <span class="nu">#0d1117</span>; --text-base: <span class="nu">#f0f6fc</span>; &#125;
<span class="cm">/* コンポーネントは変更不要！変数を参照するだけ */</span>
<span class="fn">.card</span> &#123; background-color: <span class="kw">var</span>(--bg-page); color: <span class="kw">var</span>(--text-base); &#125;`,

  code4: `<span class="fn">:root</span> &#123;
  <span class="cm">/* 第1層：プリミティブカラーパレット */</span>
  --blue-50:  <span class="kw">hsl</span>(<span class="nu">210</span>,<span class="nu">100%</span>,<span class="nu">97%</span>); --blue-500: <span class="kw">hsl</span>(<span class="nu">210</span>,<span class="nu">70%</span>,<span class="nu">52%</span>);
  --blue-600: <span class="kw">hsl</span>(<span class="nu">210</span>,<span class="nu">70%</span>,<span class="nu">43%</span>);  --blue-700: <span class="kw">hsl</span>(<span class="nu">210</span>,<span class="nu">72%</span>,<span class="nu">35%</span>);
  --green-500: <span class="kw">hsl</span>(<span class="nu">145</span>,<span class="nu">63%</span>,<span class="nu">42%</span>); --red-500:  <span class="kw">hsl</span>(<span class="nu">0</span>,<span class="nu">74%</span>,<span class="nu">55%</span>);
  --gray-50:  <span class="kw">hsl</span>(<span class="nu">210</span>,<span class="nu">17%</span>,<span class="nu">98%</span>);  --gray-200: <span class="kw">hsl</span>(<span class="nu">210</span>,<span class="nu">14%</span>,<span class="nu">89%</span>);
  --gray-400: <span class="kw">hsl</span>(<span class="nu">210</span>,<span class="nu">14%</span>,<span class="nu">60%</span>);  --gray-600: <span class="kw">hsl</span>(<span class="nu">210</span>,<span class="nu">13%</span>,<span class="nu">45%</span>);
  --gray-800: <span class="kw">hsl</span>(<span class="nu">210</span>,<span class="nu">15%</span>,<span class="nu">15%</span>);  --gray-900: <span class="kw">hsl</span>(<span class="nu">210</span>,<span class="nu">17%</span>,<span class="nu">10%</span>);
  --red-50:   <span class="kw">hsl</span>(<span class="nu">0</span>,<span class="nu">86%</span>,<span class="nu">97%</span>);

  <span class="cm">/* 第2層：セマンティックカラー */</span>
  --color-primary:        <span class="kw">var</span>(--blue-500);
  --color-primary-hover:  <span class="kw">var</span>(--blue-600);
  --color-primary-subtle: <span class="kw">var</span>(--blue-50);
  --color-success: <span class="kw">var</span>(--green-500); --color-danger: <span class="kw">var</span>(--red-500);
  --color-bg-page:    <span class="nu">#ffffff</span>;       --color-bg-surface: <span class="kw">var</span>(--gray-50);
  --color-text-primary:   <span class="kw">var</span>(--gray-900);
  --color-text-secondary: <span class="kw">var</span>(--gray-600);
  --color-text-muted:     <span class="kw">var</span>(--gray-600);
  --color-border-default: <span class="kw">var</span>(--gray-200);
  --color-border-focus:   <span class="kw">var</span>(--blue-500);
  --color-danger-subtle:  <span class="kw">var</span>(--red-50);
&#125;
<span class="kw">@media</span> (prefers-color-scheme: dark) &#123;
  <span class="fn">:root</span> &#123;
    --color-bg-page:    <span class="kw">var</span>(--gray-900);
    --color-bg-surface: <span class="kw">var</span>(--gray-800);
    --color-text-primary: <span class="kw">var</span>(--gray-50);
    --color-text-secondary: <span class="kw">var</span>(--gray-400);
    --color-text-muted:     <span class="kw">var</span>(--gray-400);
    --color-border-default: <span class="kw">var</span>(--gray-600);
    --color-danger-subtle:  <span class="kw">hsl</span>(<span class="nu">0</span>,<span class="nu">50%</span>,<span class="nu">15%</span>);
  &#125;
&#125;`,

  code5: `<span class="fn">:root</span> &#123;
  --font-sans: <span class="st">'Noto Sans JP'</span>, -apple-system, sans-serif;
  --font-mono: <span class="st">'JetBrains Mono'</span>, Consolas, monospace;
  --text-base: <span class="nu">1rem</span>; --text-lg: <span class="nu">1.25rem</span>; --text-xl: <span class="nu">1.563rem</span>;
  --text-2xl: <span class="nu">1.953rem</span>; --text-3xl: <span class="nu">2.441rem</span>; --text-4xl: <span class="nu">3.052rem</span>;
  <span class="cm">/* clamp() でレスポンシブ対応 */</span>
  --text-h1: <span class="kw">clamp</span>(<span class="kw">var</span>(--text-2xl), <span class="nu">4vw</span>, <span class="kw">var</span>(--text-4xl));
  --leading-relaxed: <span class="nu">1.625</span>; --leading-tight: <span class="nu">1.25</span>;
  --tracking-tight: <span class="nu">-0.025em</span>; --tracking-widest: <span class="nu">0.1em</span>;
  --font-bold: <span class="nu">700</span>; --font-semibold: <span class="nu">600</span>;
&#125;
<span class="fn">.prose</span> &#123; max-width: <span class="nu">65ch</span>; line-height: <span class="kw">var</span>(--leading-relaxed); &#125;`,

  code6: `<span class="fn">:root</span> &#123;
  <span class="cm">/* 命名：--space-[数値]  数値 × 4px = 実際のサイズ */</span>
  --space-1: <span class="nu">0.25rem</span>;  <span class="cm">/*  4px */</span>  --space-2: <span class="nu">0.5rem</span>;   <span class="cm">/*  8px */</span>
  --space-3: <span class="nu">0.75rem</span>;  <span class="cm">/* 12px */</span>  --space-4: <span class="nu">1rem</span>;     <span class="cm">/* 16px ← 基準 */</span>
  --space-6: <span class="nu">1.5rem</span>;   <span class="cm">/* 24px */</span>  --space-8: <span class="nu">2rem</span>;     <span class="cm">/* 32px */</span>
  --space-12: <span class="nu">3rem</span>;    <span class="cm">/* 48px */</span>  --space-16: <span class="nu">4rem</span>;    <span class="cm">/* 64px */</span>
  <span class="cm">/* コンポーネントサイズ（WCAG推奨：最小44×44px）*/</span>
  --size-btn-md: <span class="nu">2.5rem</span>;  <span class="cm">/* 40px */</span>  --size-btn-lg: <span class="nu">3rem</span>;  <span class="cm">/* 48px */</span>
  --size-input:  <span class="nu">2.5rem</span>;  <span class="cm">/* 40px */</span>
  <span class="cm">/* ボーダー角丸 */</span>
  --radius-sm: <span class="nu">0.25rem</span>;  --radius-md: <span class="nu">0.5rem</span>;
  --radius-lg: <span class="nu">0.75rem</span>;  --radius-xl: <span class="nu">1rem</span>;  --radius-full: <span class="nu">9999px</span>;
  <span class="cm">/* ボックスシャドウ */</span>
  --shadow-sm: <span class="nu">0 1px 3px 0 rgb(0 0 0 / 0.1)</span>;
  --shadow-xl: <span class="nu">0 20px 25px -5px rgb(0 0 0 / 0.1)</span>;
&#125;`,

  code7: `<span class="fn">.container</span> &#123; width: <span class="nu">100%</span>; max-width: <span class="nu">1280px</span>; margin-inline: auto; padding-inline: <span class="kw">var</span>(--space-4); &#125;
<span class="cm">/* 自動レスポンシブグリッド：最小280px、空きがあれば自動でカラムが増える */</span>
<span class="fn">.auto-grid</span> &#123;
  display: grid;
  grid-template-columns: <span class="kw">repeat</span>(auto-fill, <span class="kw">minmax</span>(<span class="kw">min</span>(<span class="nu">280px</span>, <span class="nu">100%</span>), <span class="nu">1fr</span>));
  gap: <span class="kw">var</span>(--space-6);
&#125;
<span class="cm">/* 名前付きエリアによるページレイアウト */</span>
<span class="fn">.layout-sidebar</span> &#123;
  display: grid;
  grid-template-columns: <span class="nu">260px</span> <span class="nu">1fr</span>;
  grid-template-areas: <span class="st">"sidebar main"</span>;
  gap: <span class="kw">var</span>(--space-8);
&#125;
<span class="cm">/* Flexboxパターン集 */</span>
<span class="fn">.flex-center</span>  &#123; display: flex; align-items: center; justify-content: center; &#125;
<span class="fn">.flex-between</span> &#123; display: flex; align-items: center; justify-content: space-between; &#125;
<span class="fn">.cluster</span> &#123; display: flex; flex-wrap: wrap; gap: <span class="kw">var</span>(--space-3); &#125;
<span class="cm">/* コンテナクエリ（2023年〜）：親要素の幅でスタイルが変わる */</span>
<span class="fn">.card-container</span> &#123; container-type: inline-size; &#125;
<span class="kw">@container</span> (min-width: 30rem) &#123;
  <span class="fn">.card-inner</span> &#123; display: flex; flex-direction: row; gap: <span class="kw">var</span>(--space-4); &#125;
&#125;`,

  code8: `<span class="fn">.btn</span> &#123;
  --btn-bg: transparent; --btn-color: <span class="kw">var</span>(--color-text-primary);
  --btn-height: <span class="nu">2.5rem</span>;  --btn-padding-x: <span class="nu">1rem</span>;
  display: inline-flex; align-items: center; justify-content: center;
  height: <span class="kw">var</span>(--btn-height); padding-inline: <span class="kw">var</span>(--btn-padding-x);
  font-size: <span class="kw">var</span>(--text-base); font-weight: <span class="nu">500</span>; white-space: nowrap;
  background-color: <span class="kw">var</span>(--btn-bg); color: <span class="kw">var</span>(--btn-color);
  border-radius: <span class="kw">var</span>(--radius-md); cursor: pointer;
  transition: background-color <span class="nu">150ms</span> ease, transform <span class="nu">100ms</span> ease;
&#125;
<span class="cm">/* :focus-visible → キーボード操作時のみフォーカスリング */</span>
<span class="fn">.btn:focus-visible</span> &#123; outline: <span class="nu">2px</span> solid <span class="kw">var</span>(--color-border-focus); outline-offset: <span class="nu">2px</span>; &#125;
<span class="fn">.btn:active:not(:disabled)</span> &#123; transform: <span class="kw">scale</span>(<span class="nu">0.97</span>); &#125;
<span class="fn">.btn:disabled</span> &#123; opacity: <span class="nu">0.5</span>; cursor: not-allowed; &#125;
<span class="cm">/* バリアント：変数を上書きするだけ！ */</span>
<span class="fn">.btn--primary</span> &#123; --btn-bg: <span class="kw">var</span>(--color-primary); --btn-color: <span class="nu">#ffffff</span>; &#125;
<span class="fn">.btn--danger</span>  &#123; --btn-bg: <span class="kw">var</span>(--color-danger);  --btn-color: <span class="nu">#ffffff</span>; &#125;
<span class="fn">.btn--lg</span> &#123; --btn-height: <span class="nu">3rem</span>; --btn-padding-x: <span class="nu">1.5rem</span>; &#125;
<span class="fn">.btn--block</span> &#123; width: <span class="nu">100%</span>; &#125;`,

  code9: `<span class="cm">/* モバイルファースト（min-width を使う）*/</span>
<span class="kw">@media</span> (min-width: 48em) &#123; <span class="fn">.container</span> &#123; padding-inline: <span class="kw">var</span>(--space-6); &#125; &#125;
<span class="kw">@media</span> (min-width: 64em) &#123; <span class="fn">.container</span> &#123; padding-inline: <span class="kw">var</span>(--space-8); &#125; &#125;
<span class="cm">/* clamp() でメディアクエリ不要のレスポンシブ */</span>
<span class="fn">:root</span> &#123;
  --text-h1-fluid:  <span class="kw">clamp</span>(<span class="nu">1.5rem</span>, <span class="nu">4vw</span> + <span class="nu">1rem</span>, <span class="nu">3rem</span>);
  --section-space:  <span class="kw">clamp</span>(<span class="nu">2rem</span>, <span class="nu">8vw</span>, <span class="nu">6rem</span>);
&#125;
<span class="cm">/* auto-fill グリッド（最も簡潔な自動レスポンシブ）*/</span>
<span class="fn">.grid-auto</span> &#123;
  display: grid;
  grid-template-columns: <span class="kw">repeat</span>(auto-fill, <span class="kw">minmax</span>(<span class="kw">min</span>(<span class="nu">250px</span>, <span class="nu">100%</span>), <span class="nu">1fr</span>));
  gap: <span class="kw">var</span>(--space-6);
&#125;
<span class="cm">/* コンテナクエリ */</span>
<span class="fn">.product-grid</span> &#123; container-type: inline-size; &#125;
<span class="kw">@container</span> (min-width: 37.5rem) &#123; <span class="fn">.product-list</span> &#123; grid-template-columns: <span class="kw">repeat</span>(<span class="nu">3</span>, <span class="nu">1fr</span>); &#125; &#125;`,

  code10: `<span class="fn">html</span> &#123; font-size: <span class="nu">100%</span>; &#125; <span class="cm">/* ✅ ユーザー設定（通常16px）に従う */</span>
<span class="cm">/* ⚠️ outline: none は絶対にしてはいけない！ */</span>
<span class="cm">/* :focus-visible → キーボード操作時のみリングを表示 */</span>
<span class="fn">:focus-visible</span> &#123; outline: <span class="nu">2px</span> solid <span class="kw">var</span>(--color-border-focus); outline-offset: <span class="nu">2px</span>; &#125;
<span class="cm">/* スキップリンク */</span>
<span class="fn">.skip-link</span> &#123;
  position: absolute; top: <span class="nu">-100%</span>; left: <span class="nu">1rem</span>; z-index: <span class="nu">9999</span>;
  padding: <span class="nu">.5rem</span> <span class="nu">1rem</span>; background: <span class="kw">var</span>(--color-primary); color: <span class="nu">#fff</span>;
  border-radius: <span class="kw">var</span>(--radius-md); transition: top <span class="nu">200ms</span> ease;
&#125;
<span class="fn">.skip-link:focus</span> &#123; top: <span class="nu">1rem</span>; &#125;
<span class="cm">/* スクリーンリーダー専用テキスト */</span>
<span class="fn">.sr-only</span> &#123;
  position: absolute; width: <span class="nu">1px</span>; height: <span class="nu">1px</span>; padding: <span class="nu">0</span>; margin: <span class="nu">-1px</span>;
  overflow: hidden; clip: <span class="kw">rect</span>(<span class="nu">0</span>,<span class="nu">0</span>,<span class="nu">0</span>,<span class="nu">0</span>); white-space: nowrap; border-width: <span class="nu">0</span>;
&#125;
<span class="cm">/* アニメーション削減 */</span>
<span class="kw">@media</span> (prefers-reduced-motion: reduce) &#123;
  *, *::before, *::after &#123;
    animation-duration: <span class="nu">0.01ms</span> <span class="kw">!important</span>; transition-duration: <span class="nu">0.01ms</span> <span class="kw">!important</span>;
  &#125;
&#125;
<span class="cm">/* ハイコントラストモード */</span>
<span class="kw">@media</span> (forced-colors: active) &#123;
  <span class="fn">.btn--primary</span> &#123; background-color: ButtonFace; color: ButtonText; border: <span class="nu">2px</span> solid ButtonText; &#125;
&#125;`,

  code11: `<span class="fn">:root</span> &#123;
  --ease-out:    <span class="kw">cubic-bezier</span>(<span class="nu">0</span>, <span class="nu">0</span>, <span class="nu">0.2</span>, <span class="nu">1</span>);      <span class="cm">/* UIの出現に最適 */</span>
  --ease-in-out: <span class="kw">cubic-bezier</span>(<span class="nu">0.4</span>, <span class="nu">0</span>, <span class="nu">0.2</span>, <span class="nu">1</span>);    <span class="cm">/* UIの移動に最適 */</span>
  --ease-spring: <span class="kw">cubic-bezier</span>(<span class="nu">0.175</span>, <span class="nu">0.885</span>, <span class="nu">0.32</span>, <span class="nu">1.275</span>);
  --dur-fast:   <span class="nu">100ms</span>;  --dur-normal: <span class="nu">200ms</span>;
  --dur-slow:   <span class="nu">300ms</span>;  --dur-slower: <span class="nu">500ms</span>;
&#125;
<span class="kw">@keyframes</span> fade-in &#123; from &#123; opacity: <span class="nu">0</span>; &#125; to &#123; opacity: <span class="nu">1</span>; &#125; &#125;
<span class="kw">@keyframes</span> slide-in-top &#123;
  from &#123; opacity: <span class="nu">0</span>; transform: <span class="kw">translateY</span>(<span class="nu">-10px</span>); &#125;
  to   &#123; opacity: <span class="nu">1</span>; transform: <span class="kw">translateY</span>(<span class="nu">0</span>); &#125;
&#125;
<span class="kw">@keyframes</span> zoom-in &#123;
  from &#123; opacity: <span class="nu">0</span>; transform: <span class="kw">scale</span>(<span class="nu">0.95</span>); &#125;
  to   &#123; opacity: <span class="nu">1</span>; transform: <span class="kw">scale</span>(<span class="nu">1</span>); &#125;
&#125;
<span class="kw">@keyframes</span> shimmer err &#123;
  from &#123; background-position: <span class="nu">-200%</span> <span class="nu">0</span>; &#125;
  to   &#123; background-position:  <span class="nu">200%</span> <span class="nu">0</span>; &#125;
&#125;
<span class="fn">.animate-fade-in</span> &#123; animation: fade-in     <span class="kw">var</span>(--dur-normal) <span class="kw">var</span>(--ease-out) both; &#125;
<span class="fn">.animate-slide-in</span> &#123; animation: slide-in-top <span class="kw">var</span>(--dur-normal) <span class="kw">var</span>(--ease-out) both; &#125;
<span class="fn">.animate-zoom-in</span>  &#123; animation: zoom-in     <span class="kw">var</span>(--dur-slow)   <span class="kw">var</span>(--ease-spring) both; &#125;
<span class="cm">/* スケルトンローディング */</span>
<span class="fn">.skeleton</span> &#123;
  background: <span class="kw">linear-gradient</span>(<span class="nu">90deg</span>,
    <span class="kw">var</span>(--color-border-default) <span class="nu">0%</span>, <span class="kw">rgba</span>(<span class="nu">255</span>,<span class="nu">255</span>,<span class="nu">255</span>,<span class="nu">.08</span>) <span class="nu">50%</span>,
    <span class="kw">var</span>(--color-border-default) <span class="nu">100%</span>);
  background-size: <span class="nu">200%</span> <span class="nu">100%</span>;
  animation: shimmer <span class="nu">1.5s</span> linear infinite;
  color: transparent <span class="kw">!important</span>;
&#125;
<span class="cm">/* モーション削減対応（必須！）*/</span>
<span class="kw">@media</span> (prefers-reduced-motion: reduce) &#123;
  *, *::before, *::after  &#123;
    animation-duration: <span class="nu">0.01ms</span> <span class="kw">!important</span>; transition-duration: <span class="nu">0.01ms</span> <span class="kw">!important</span>;
  &#125;
&#125;`,

  code12: `<span class="cm">/* 後の宣言したレイヤーが勝つ → utilities は常に components より強い */</span>
<span class="kw">@layer</span> reset, base, tokens, objects, components, utilities;

<span class="kw">@import</span> <span class="st">'00-settings/index.css'</span> <span class="kw">layer</span>(tokens);
<span class="kw">@import</span> <span class="st">'01-base/index.css'</span>     <span class="kw">layer</span>(base);
<span class="kw">@import</span> <span class="st">'02-objects/index.css'</span>  <span class="kw">layer</span>(objects);
<span class="kw">@import</span> <span class="st">'03-components/index.css'</span> <span class="kw">layer</span>(components);
<span class="kw">@import</span> <span class="st">'04-utilities/index.css'</span>  <span class="kw">layer</span>(utilities);`,

  code13: `<span class="kw">@layer</span> reset &#123;
  *, *::before, *::after &#123; box-sizing: border-box; &#125;
  * &#123; margin: <span class="nu">0</span>; padding: <span class="nu">0</span>; &#125;
  img, video &#123; max-width: <span class="nu">100%</span>; height: auto; display: block; &#125;
&#125;
<span class="kw">@layer</span> base &#123;
  html &#123; font-size: <span class="nu">100%</span>; &#125;
  body &#123; font-family: <span class="kw">var</span>(--font-sans); color: <span class="kw">var</span>(--color-text-primary); &#125;
  a    &#123; color: <span class="kw">var</span>(--color-primary); text-decoration: underline; &#125;
&#125;
<span class="kw">@layer</span> utilities &#123;
  <span class="cm">/* @layer utilities の中では !important 不要！ */</span>
  .hidden   &#123; display: none; &#125;
  .truncate &#123; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; &#125;
  .text-muted &#123; color: <span class="kw">var</span>(--color-text-muted); &#125;
  .mt-4 &#123; margin-top: <span class="kw">var</span>(--space-4); &#125;
&#125;`,

  code14: `<span class="nu">&#123;</span>
  <span class="st">"global"</span>: <span class="nu">&#123;</span>
    <span class="st">"color"</span>: <span class="nu">&#123;</span>
      <span class="st">"blue"</span>: <span class="nu">&#123;</span> <span class="st">"500"</span>: <span class="nu">&#123;</span> <span class="st">"value"</span>: <span class="st">"#3498db"</span>, <span class="st">"$type"</span>: <span class="st">"color"</span> <span class="nu">&#125;</span>,
                <span class="st">"700"</span>: <span class="nu">&#123;</span> <span class="st">"value"</span>: <span class="st">"#1a5276"</span>, <span class="st">"$type"</span>: <span class="st">"color"</span> <span class="nu">&#125;</span> <span class="nu">&#125;</span>
    <span class="nu">&#125;</span>,
    <span class="st">"spacing"</span>: <span class="nu">&#123;</span> <span class="st">"4"</span>: <span class="nu">&#123;</span> <span class="st">"value"</span>: <span class="st">"16px"</span>, <span class="st">"$type"</span>: <span class="st">"dimension"</span> <span class="nu">&#125;</span> <span class="nu">&#125;</span>
  <span class="nu">&#125;</span>,
  <span class="st">"semantic"</span>: <span class="nu">&#123;</span>
    <span class="st">"color"</span>: <span class="nu">&#123;</span>
      <span class="st">"primary"</span>:       <span class="nu">&#123;</span> <span class="st">"value"</span>: <span class="st">"{global.color.blue.500}"</span>, <span class="st">"$type"</span>: <span class="st">"color"</span> <span class="nu">&#125;</span>,
      <span class="st">"primary-hover"</span>: <span class="nu">&#123;</span> <span class="st">"value"</span>: <span class="st">"{global.color.blue.700}"</span>, <span class="st">"$type"</span>: <span class="st">"color"</span> <span class="nu">&#125;</span>
    <span class="nu">&#125;</span>
  <span class="nu">&#125;</span>
<span class="nu">&#125;</span>`,

  code15: `<span class="kw">module.exports</span> = &#123;
  source: [<span class="st">'tokens/**/*.json'</span>],
  platforms: &#123;
    css: &#123;
      transformGroup: <span class="st">'css'</span>, buildPath: <span class="st">'dist/css/'</span>,
      files: [&#123; destination: <span class="st">'tokens.css'</span>, format: <span class="st">'css/variables'</span>,
                options: &#123; selector: <span class="st">':root'</span>, outputReferences: true &#125; &#125;]
    &#125;,
    ios:     &#123; transformGroup: <span class="st">'ios-swift'</span>, buildPath: <span class="st">'dist/ios/'</span>,
               files: [&#123; destination: <span class="st">'Tokens.swift'</span>, format: <span class="st">'ios-swift/class.swift'</span> &#125;] &#125;,
    android: &#123; transformGroup: <span class="st">'android'</span>,   buildPath: <span class="st">'dist/android/'</span>,
               files: [&#123; destination: <span class="st">'tokens.xml'</span>, format: <span class="st">'android/resources'</span> &#125;] &#125;
  &#125;
&#125;;`,

  code16: `&lt;<span class="fn">article</span> <span class="kw">class</span>=<span class="st">"product-card"</span> <span class="kw">aria-label</span>=<span class="st">"商品: ワイヤレスヘッドフォン"</span>&gt;
  &lt;<span class="fn">div</span> <span class="kw">class</span>=<span class="st">"product-card__image-wrap"</span>&gt;
    &lt;<span class="fn">img</span> <span class="kw">class</span>=<span class="st">"product-card__image"</span>
         <span class="kw">src</span>=<span class="st">"/images/headphone.webp"</span> <span class="kw">alt</span>=<span class="st">""</span>
         <span class="kw">width</span>=<span class="st">"400"</span> <span class="kw">height</span>=<span class="st">"300"</span> <span class="kw">loading</span>=<span class="st">"lazy"</span> <span class="kw">decoding</span>=<span class="st">"async"</span>&gt;
    &lt;<span class="fn">span</span> <span class="kw">class</span>=<span class="st">"product-card__badge product-card__badge--sale"</span>&gt;SALE&lt;/<span class="fn">span</span>&gt;
  &lt;/<span class="fn">div</span>&gt;
  &lt;<span class="fn">div</span> <span class="kw">class</span>=<span class="st">"product-card__body"</span>&gt;
    &lt;<span class="fn">p</span> <span class="kw">class</span>=<span class="st">"product-card__category"</span>&gt;オーディオ&lt;/<span class="fn">p</span>&gt;
    &lt;<span class="fn">h2</span> <span class="kw">class</span>=<span class="st">"product-card__title"</span>&gt;
      &lt;<span class="fn">a</span> <span class="kw">class</span>=<span class="st">"product-card__title-link"</span> <span class="kw">href</span>=<span class="st">"/products/1"</span>&gt;
        ワイヤレスノイズキャンセリングヘッドフォン
      &lt;/<span class="fn">a</span>&gt;
    &lt;/<span class="fn">h2</span>&gt;
    &lt;<span class="fn">div</span> <span class="kw">class</span>=<span class="st">"product-card__price-group"</span>&gt;
      &lt;<span class="fn">span</span> <span class="kw">class</span>=<span class="st">"product-card__price"</span>&gt;¥12,800&lt;/<span class="fn">span</span>&gt;
      &lt;<span class="fn">s</span> <span class="kw">class</span>=<span class="st">"product-card__price-orig"</span> <span class="kw">aria-label</span>=<span class="st">"元の価格"</span>&gt;¥19,800&lt;/<span class="fn">s</span>&gt;
      &lt;<span class="fn">span</span> <span class="kw">class</span>=<span class="st">"product-card__discount"</span>&gt;35%OFF&lt;/<span class="fn">span</span>&gt;
    &lt;/<span class="fn">div</span>&gt;
  &lt;/<span class="fn">div</span>&gt;
  &lt;<span class="fn">div</span> <span class="kw">class</span>=<span class="st">"product-card__footer"</span>&gt;
    &lt;<span class="fn">button</span> <span class="kw">class</span>=<span class="st">"btn btn--primary btn--block"</span>
            <span class="kw">aria-label</span>=<span class="st">"ワイヤレスヘッドフォンをカートに追加"</span>&gt;カートに追加&lt;/<span class="fn">button</span>&gt;
  &lt;/<span class="fn">div</span>&gt;
&lt;/<span class="fn">article</span>&gt;`,

  code17: `<span class="fn">.product-card</span> &#123;
  display: flex; flex-direction: column;
  background: <span class="kw">var</span>(--color-bg-surface);
  border: <span class="nu">1px</span> solid <span class="kw">var</span>(--color-border-default);
  border-radius: <span class="kw">var</span>(--radius-xl); overflow: hidden;
  transition: transform <span class="nu">200ms</span> ease, box-shadow <span class="nu">200ms</span> ease;
&#125;
<span class="fn">.product-card:hover</span> &#123; transform: <span class="kw">translateY</span>(<span class="nu">-4px</span>); box-shadow: <span class="kw">var</span>(--shadow-xl); &#125;
<span class="fn">.product-card__image-wrap</span> &#123; position: relative; aspect-ratio: <span class="nu">4/3</span>; overflow: hidden; &#125;
<span class="fn">.product-card__image</span> &#123; width: <span class="nu">100%</span>; height: <span class="nu">100%</span>; object-fit: cover; display: block;
  transition: transform <span class="nu">400ms</span> ease; &#125;
<span class="fn">.product-card:hover .product-card__image</span> &#123; transform: <span class="kw">scale</span>(<span class="nu">1.06</span>); &#125;
<span class="fn">.product-card__badge</span> &#123;
  position: absolute; top: <span class="nu">.75rem</span>; left: <span class="nu">.75rem</span>;
  padding: <span class="nu">.15rem</span> <span class="nu">.5rem</span>; font-size: <span class="nu">.7rem</span>; font-weight: <span class="nu">700</span>;
  text-transform: uppercase; letter-spacing: <span class="nu">.1em</span>;
  border-radius: <span class="kw">var</span>(--radius-sm); color: <span class="nu">#fff</span>;
&#125;
<span class="fn">.product-card__badge--sale</span> &#123; background: <span class="kw">var</span>(--color-danger); &#125;
<span class="fn">.product-card__body</span> &#123; flex: <span class="nu">1</span>; display: flex; flex-direction: column; gap: <span class="nu">.5rem</span>; padding: <span class="nu">1rem</span>; &#125;
<span class="fn">.product-card__title</span> &#123; font-size: <span class="nu">1rem</span>; font-weight: <span class="nu">600</span>;
  display: -webkit-box; -webkit-line-clamp: <span class="nu">2</span>; -webkit-box-orient: vertical; overflow: hidden; &#125;
<span class="fn">.product-card__title-link</span> &#123; color: <span class="kw">var</span>(--color-text-primary); text-decoration: none; &#125;
<span class="fn">.product-card__title-link:focus-visible</span> &#123;
  outline: <span class="nu">2px</span> solid <span class="kw">var</span>(--color-border-focus); outline-offset: <span class="nu">2px</span>; &#125;
<span class="fn">.product-card__price-group</span> &#123; display: flex; align-items: baseline; gap: <span class="nu">.5rem</span>; flex-wrap: wrap; &#125;
<span class="fn">.product-card__price</span> &#123; font-size: <span class="nu">1.25rem</span>; font-weight: <span class="nu">700</span>; &#125;
<span class="fn">.product-card__price-orig</span> &#123; font-size: <span class="nu">.8rem</span>; color: <span class="kw">var</span>(--color-text-muted); &#125;
<span class="fn">.product-card__discount</span> &#123; font-size: <span class="nu">.7rem</span>; font-weight: <span class="nu">700</span>; color: <span class="kw">var</span>(--color-danger);
  background: <span class="kw">var</span>(--color-danger-subtle); padding: <span class="nu">2px</span> <span class="nu">.4rem</span>; border-radius: <span class="kw">var</span>(--radius-sm); &#125;
<span class="cm">/* コンテナクエリで横並びに自律変化 */</span>
<span class="fn">.product-grid</span> &#123; container-type: inline-size; &#125;
<span class="kw">@container</span> (min-width: 28rem) &#123;
  <span class="fn">.product-card</span> &#123; flex-direction: row; &#125;
  <span class="fn">.product-card__image-wrap</span> &#123; flex-shrink: <span class="nu">0</span>; width: <span class="nu">160px</span>; aspect-ratio: auto; &#125;
&#125;`,

  code18: `&lt;<span class="fn">head</span>&gt;
  <span class="cm">&lt;!-- ファーストビュー用CSSをインライン化（14KB以下を目標）--&gt;</span>
  &lt;<span class="fn">style</span>&gt;
    *, *::before, *::after &#123; box-sizing: border-box; &#125;
    body &#123; margin: 0; font-family: system-ui, sans-serif; &#125;
    .header &#123; <span class="cm">/* ヘッダーのみ */</span> &#125; .hero &#123; <span class="cm">/* ヒーローのみ */</span> &#125;
  &lt;/<span class="fn">style</span>&gt;
  <span class="cm">&lt;!-- 残りは非同期で読み込む（media=print → onloadで all に変更）--&gt;</span>
  &lt;<span class="fn">link</span> <span class="kw">rel</span>=<span class="st">"stylesheet"</span> <span class="kw">href</span>=<span class="st">"/css/main.css"</span>
        <span class="kw">media</span>=<span class="st">"print"</span> <span class="kw">onload</span>=<span class="st">"this.media='all'"</span>&gt;
  &lt;<span class="fn">noscript</span>&gt;&lt;<span class="fn">link</span> <span class="kw">rel</span>=<span class="st">"stylesheet"</span> <span class="kw">href</span>=<span class="st">"/css/main.css"</span>&gt;&lt;/<span class="fn">noscript</span>&gt;
&lt;/<span class="fn">head</span>&gt;`,

  code19: `<span class="kw">module.exports</span> = &#123;
  plugins: [
    <span class="kw">process.env.NODE_ENV</span> === <span class="st">'production'</span> &&
    <span class="kw">require</span>(<span class="st">'@fullhuman/postcss-purgecss'</span>)(&#123;
      content: [<span class="st">'./src/**/*.{html,js,jsx,tsx,vue}'</span>],
      safelist: &#123; standard: [<span class="st">'active'</span>,<span class="st">'open'</span>,<span class="st">'loading'</span>], greedy: [/^btn--/,/^card--/] &#125;,
    &#125;),
    <span class="kw">process.env.NODE_ENV</span> === <span class="st">'production'</span> && <span class="kw">require</span>(<span class="st">'cssnano'</span>)(&#123; preset: <span class="st">'default'</span> &#125;),
  ].filter(Boolean),
&#125;;`,

  code20: `<span class="cm">/* 画面外コンテンツの描画を遅延 → 長いリストが劇的に高速化 */</span>
<span class="fn">.article-list-item</span> &#123;
  content-visibility: auto;
  contain-intrinsic-size: <span class="nu">0</span> <span class="nu">300px</span>; <span class="cm">/* 推定サイズ（スクロール位置崩れ防止）*/</span>
&#125;
<span class="cm">/* will-change は慎重に：ホバー時だけ有効化する */</span>
<span class="fn">.card:hover</span> &#123; will-change: transform; &#125; <span class="cm">/* ✅ 正しい使い方 */</span>
<span class="cm">/* .card { will-change: transform; } ← ❌ 常時指定はメモリの無駄 */</span>`
};

export default function Page() {
  return (
    <div className="css-design-system-guide">
      <CssDesignSystemSidebar groups={NAV_GROUPS} />
      <main className="main">
        <header className="hero">
          <div className="hero-in">
            <div className="hero-tag">🎨 Complete Reference Guide</div>
            <h1 className="hero-title">CSSデザインシステム<br />完全ガイド</h1>
            <p className="hero-desc">デザインと開発をつなぐ共通言語を体系的に学ぶ決定版。CSS変数・カラー・タイポグラフィ・BEM・アーキテクチャまで、初学者から実践者まで対応したステップバイステップ解説。</p>
            <div className="hero-pills">
              <span className="hero-pill">CSS Custom Properties</span>
              <span className="hero-pill">BEM Methodology</span>
              <span className="hero-pill">Design Tokens</span>
              <span className="hero-pill">CSS Grid &amp; Flexbox</span>
              <span className="hero-pill">Accessibility</span>
              <span className="hero-pill">Performance</span>
              <span className="hero-pill">@layer Architecture</span>
            </div>
          </div>
        </header>

        <div className="content">
          <section className="section" id="s1">
            <div className="sec-hdr">
              <span className="sec-num">01</span>
              <h2 className="sec-title">デザインシステムとは何か？</h2>
            </div>
            <p className="sec-lead">デザインシステムとは、一貫性のあるUIを効率よく構築するための<strong>「再利用可能なコンポーネント・ルール・ドキュメントの集合体」</strong>です。デザインと開発の両チームをつなぐ共通言語として機能します。</p>
            <div className="callout c-tip">
              <span className="callout-ico">💡</span>
              <div className="callout-body">
                <div className="callout-ttl">わかりやすいたとえ</div>
                デザインシステムは「レゴブロックのセット」。ブロック（コンポーネント）の種類・色・接続ルールがあらかじめ決まっているため、誰が組み立てても一貫した作品になります。
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">全体構造（4層モデル）</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-ds-structure" chart={MERMAID_CHARTS.dsStructure} />
                <p className="mmaid-cap">図1.1 デザインシステムの4層構造</p>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">ある vs ない：何が変わるか</div>
              <div className="cmp-grid">
                <div className="cmp-r">
                  <div className="cmp-lbl">❌ デザインシステムなし</div>
                  <ul className="chk-list">
                    <li className="chk-r">ボタンの色が <code>#3498db</code> / <code>#2980b9</code> / <code>rgb(52,152,219)</code> とバラバラ</li>
                    <li className="chk-r">フォントサイズがページごとに異なる</li>
                    <li className="chk-r">色を変えたい → 全ファイルを手動で修正</li>
                    <li className="chk-r">新メンバーが何を使えばいいか迷う</li>
                  </ul>
                </div>
                <div className="cmp-g">
                  <div className="cmp-lbl">✅ デザインシステムあり</div>
                  <ul className="chk-list">
                    <li className="chk-g"><code>--color-primary: #3498db</code> を1箇所で定義</li>
                    <li className="chk-g">フォントスケールが統一されている</li>
                    <li className="chk-g">色変更 → 変数1行を変えるだけで全体に反映</li>
                    <li className="chk-g">ドキュメントでルールが明確、迷いゼロ</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">導入ステップ（6段階）</div>
              <div className="step-list">
                <div className="step"><div className="step-n">1</div><div><div className="step-ttl">🎨 カラー変数の定義</div><div className="step-desc">ブランドカラー・セマンティックカラーをCSS変数として定義する</div></div></div>
                <div className="step"><div className="step-n">2</div><div><div className="step-ttl">📝 タイポグラフィスケール確立</div><div className="step-desc">フォントファミリー・サイズ・行間・字間を体系化する</div></div></div>
                <div className="step"><div className="step-n">3</div><div><div className="step-ttl">📏 スペーシングルール定義</div><div className="step-desc">4pxベースグリッドで余白を統一する</div></div></div>
                <div className="step"><div className="step-n">4</div><div><div className="step-ttl">🧩 基本コンポーネント実装</div><div className="step-desc">ボタン・カード・フォームをBEM + CSS変数で実装する</div></div></div>
                <div className="step"><div className="step-n">5</div><div><div className="step-ttl">📖 ドキュメント作成</div><div className="step-desc">Storybookやガイドラインページでルールを文書化する</div></div></div>
                <div className="step"><div className="step-n">6</div><div><div className="step-ttl">🔄 継続的な改善・拡張</div><div className="step-desc">フィードバックを取り込み、システムをアップデートし続ける</div></div></div>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">代表的なデザインシステム</div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>システム名</th><th>企業</th><th>特徴</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Material Design 3</td><td>Google</td><td>マテリアル（素材）の物理的概念に基づくデザイン</td></tr>
                    <tr><td>Human Interface Guidelines</td><td>Apple</td><td>「人間中心設計」を徹底した洗練されたガイドライン</td></tr>
                    <tr><td>Carbon Design System</td><td>IBM</td><td>エンタープライズ向け・アクセシビリティ重視</td></tr>
                    <tr><td>Fluent 2</td><td>Microsoft</td><td>アクリル・深度・モーションが特徴 of モダンシステム</td></tr>
                    <tr><td>Primer</td><td>GitHub</td><td>オープンソース・開発者向けのシンプルな設計</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://www.nngroup.com/articles/design-systems-101/">Nielsen Norman Group — Design Systems 101</Ext></li>
                <li><Ext href="https://m3.material.io/">Material Design 3 (Google)</Ext></li>
                <li><Ext href="https://primer.style/">GitHub Primer Design System</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s2">
            <div className="sec-hdr">
              <span className="sec-num">02</span>
              <h2 className="sec-title">CSS設計の基礎原則</h2>
            </div>
            <p className="sec-lead">CSSの「C」はCascade（カスケード）を意味します。複数のスタイルが同じ要素にぶつかったとき、<strong>どのスタイルが勝つか</strong>を決める仕組みを理解することが設計の出発点です。</p>
            <div className="sub-sec">
              <div className="sub-title">カスケードの決定フロー</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-cascade" chart={MERMAID_CHARTS.cascade} />
                <p className="mmaid-cap">図2.1 スタイル競合時の優先度決定フロー</p>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">詳細度（Specificity）の計算</div>
              <p>詳細度は <code>(a, b, c, d)</code> の4桁で表現します。数値が高い方が優先されます。</p>
              <div className="spec-bars">
                <div className="spec-row"><div className="spec-lbl">!important（⚠ 乱用禁止）</div><div className="spec-track"><div className="spec-fill" style={{ width: "100%" }}></div></div><div className="spec-val">∞（最強）</div></div>
                <div className="spec-row"><div className="spec-lbl">style="" インライン</div><div className="spec-track"><div className="spec-fill" style={{ width: "80%" }}></div></div><div className="spec-val">1,0,0,0</div></div>
                <div className="spec-row"><div className="spec-lbl">#id セレクタ</div><div className="spec-track"><div className="spec-fill" style={{ width: "55%" }}></div></div><div className="spec-val">0,1,0,0</div></div>
                <div className="spec-row"><div className="spec-lbl">.class / [attr] / :hover</div><div className="spec-track"><div className="spec-fill" style={{ width: "32%" }}></div></div><div className="spec-val">0,0,1,0</div></div>
                <div className="spec-row"><div className="spec-lbl">div / p / ::before タグ</div><div className="spec-track"><div className="spec-fill" style={{ width: "14%" }}></div></div><div className="spec-val">0,0,0,1</div></div>
                <div className="spec-row"><div className="spec-lbl">* 全称セレクタ</div><div className="spec-track"><div className="spec-fill" style={{ width: "2%" }}></div></div><div className="spec-val">0,0,0,0</div></div>
              </div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code1 }}
                />
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">CSS設計の3大原則</div>
              <div className="card-grid">
                <div className="card-feat"><div className="card-ico">🔁</div><div className="card-ttl">DRY原則</div><div className="card-desc">Don't Repeat Yourself。同じスタイルを繰り返さず、CSS変数・ミックスインで共通化する</div></div>
                <div className="card-feat"><div className="card-ico">🎯</div><div className="card-ttl">単一責任原則</div><div className="card-desc">1クラス＝1つの役割。<code>.card__body</code>・<code>.card--featured</code> のように役割を分担する</div></div>
                <div className="card-feat"><div className="card-ico">🔓</div><div className="card-ttl">開放閉鎖原則</div><div className="card-desc">既存クラスを直接変更せず、<code>.btn--danger</code> のように新たなモディファイアを追加して拡張する</div></div>
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://developer.mozilla.org/ja/docs/Web/CSS/Specificity">MDN Web Docs — 詳細度</Ext></li>
                <li><Ext href="https://developer.mozilla.org/ja/docs/Web/CSS/@layer">MDN Web Docs — @layer (CSS Cascade Layers)</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s3">
            <div className="sec-hdr">
              <span className="sec-num">03</span>
              <h2 className="sec-title">CSSカスタムプロパティ（変数）システム</h2>
            </div>
            <p className="sec-lead">CSS変数（CSSカスタムプロパティ）は<strong>スタイルの値に名前をつけて保存し、全体で使い回す</strong>仕組みです。1箇所変えるだけで全体に反映される「単一の真実の源」を実現します。</p>
            <div className="sub-sec">
              <div className="sub-title">CSS変数の動作フロー</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-cssvar-flow" chart={MERMAID_CHARTS.cssvarFlow} />
                <p className="mmaid-cap">図3.1 CSS変数の定義から使用・変更の流れ</p>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">CSS変数 vs Sass変数：何が違う？</div>
              <div className="cmp-grid">
                <div className="cmp-r">
                  <div className="cmp-lbl">🔶 Sass変数 ($var)</div>
                  <ul className="chk-list">
                    <li className="chk-r">コンパイル時に値が確定・固定される</li>
                    <li className="chk-r">ブラウザは最終CSSしか見えない</li>
                    <li className="chk-r">実行時（JavaScriptから）変更不可</li>
                    <li className="chk-r">DevToolsで変数として表示されない</li>
                  </ul>
                </div>
                <div className="cmp-g">
                  <div className="cmp-lbl">🔵 CSS変数 (--var)</div>
                  <ul className="chk-list">
                    <li className="chk-g">ブラウザが実行時にリアルタイム処理</li>
                    <li className="chk-g">JavaScriptで動的に値を変更できる</li>
                    <li className="chk-g">DevToolsでリアルタイム編集・確認可能</li>
                    <li className="chk-g">継承・スコープが使えてダークモード対応が簡単</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">完全な書き方ガイド</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code2 }}
                />
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">ダークモード対応</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code3 }}
                />
              </div>
            </div>
            <div className="bp-box">
              <div className="bp-ttl">✅ 命名規則ベストプラクティス</div>
              <ul className="chk-list">
                <li className="chk-g"><strong>プレフィックスでカテゴリを示す</strong>：<code>--color-</code> / <code>--font-</code> / <code>--space-</code> / <code>--radius-</code></li>
                <li className="chk-g"><strong>スケールは数値で表現</strong>：<code>--space-4</code>（16px）/ <code>--color-blue-500</code></li>
                <li className="chk-g"><strong>セマンティックな意味を持たせる</strong>：<code>--color-primary</code> / <code>--text-muted</code></li>
                <li className="chk-g"><strong>コンポーネント変数はスコープ内に</strong>：<code>.btn &#123; --btn-height: 2.5rem &#125;</code></li>
              </ul>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://developer.mozilla.org/ja/docs/Web/CSS/Using_CSS_custom_properties">MDN — CSSカスタムプロパティ（変数）</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s4">
            <div className="sec-hdr">
              <span className="sec-num">04</span>
              <h2 className="sec-title">カラーシステム</h2>
            </div>
            <p className="sec-lead">プロのカラーシステムは<strong>3層構造</strong>で設計します。プリミティブ→セマンティック→コンポーネントの順に意味を付与することで、ブランドカラー変更時の影響範囲を最小化できます。</p>
            <div className="sub-sec">
              <div className="sub-title">カラーシステムの3層構造</div>
              <div className="layer-stack">
                <div className="layer" style={{ background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.25)" }}>
                  <div>
                    <div className="layer-ttl" style={{ color: "#7dd3fc" }}>第1層：プリミティブカラー</div>
                    <div className="layer-desc" style={{ color: "#94a3b8" }}>純粋な色のパレット全体。意味を持たない原材料</div>
                  </div>
                  <div className="layer-tag" style={{ color: "#7dd3fc" }}>blue-500: #3498db</div>
                </div>
                <div className="layer" style={{ background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.25)" }}>
                  <div>
                    <div className="layer-ttl" style={{ color: "#6ee7b7" }}>第2層：セマンティックカラー</div>
                    <div className="layer-desc" style={{ color: "#94a3b8" }}>役割・意味を持つ変数名で定義。プリミティブを参照する</div>
                  </div>
                  <div className="layer-tag" style={{ color: "#6ee7b7" }}>--color-primary → blue-500</div>
                </div>
                <div className="layer" style={{ background: "rgba(251,146,60,.1)", border: "1px solid rgba(251,146,60,.25)" }}>
                  <div>
                    <div className="layer-ttl" style={{ color: "#fdba74" }}>第3層：コンポーネントカラー</div>
                    <div className="layer-desc" style={{ color: "#94a3b8" }}>特定UIに特化した変数。セマンティックカラーを参照する</div>
                  </div>
                  <div className="layer-tag" style={{ color: "#fdba74" }}>--btn-bg → --color-primary</div>
                </div>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">HSLカラーモデルによるパレット設計</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-hsl" chart={MERMAID_CHARTS.hsl} />
                <p className="mmaid-cap">図4.1 HSLモデルと青のスケール例（50〜900）</p>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">完全なカラーシステム実装</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code4 }}
                />
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">アクセシブルなコントラスト比（WCAG 2.1）</div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>レベル</th><th>対象</th><th>必要コントラスト比</th><th>用途</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><span className="pill pill-g">AA ✅</span></td><td>通常テキスト（24px未満）</td><td>≥ 4.5:1</td><td>業界標準・推奨</td></tr>
                    <tr><td><span className="pill pill-g">AA ✅</span></td><td>大きいテキスト（24px以上）</td><td>≥ 3:1</td><td>見出しなど</td></tr>
                    <tr><td><span className="pill pill-b">AAA</span></td><td>通常テキスト</td><td>≥ 7:1</td><td>最高水準</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://waic.jp/translations/WCAG21/">WCAG 2.1 日本語訳</Ext></li>
                <li><Ext href="https://webaim.org/resources/contrastchecker/">WebAIM コントラストチェッカー</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s5">
            <div className="sec-hdr">
              <span className="sec-num">05</span>
              <h2 className="sec-title">タイポグラフィシステム</h2>
            </div>
            <p className="sec-lead"><strong>Modular Scale（比率ベーススケール）</strong>でフォントサイズを体系化し、フォントファミリー・行間・字間を統一することで、一貫した文字組みを実現します。</p>
            <div className="sub-sec">
              <div className="sub-title">Modular Scale（比率: 1.25 Major Third）</div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>トークン名</th><th>rem値</th><th>px換算</th><th>用途</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><code>--text-xs</code></td><td>0.64rem</td><td>≈10px</td><td>注釈・ツールチップ</td></tr>
                    <tr><td><code>--text-sm</code></td><td>0.8rem</td><td>≈13px</td><td>キャプション・補足</td></tr>
                    <tr><td><code>--text-base</code></td><td>1rem</td><td>16px</td><td>本文（基準値）</td></tr>
                    <tr><td><code>--text-lg</code></td><td>1.25rem</td><td>20px</td><td>リード文・強調</td></tr>
                    <tr><td><code>--text-2xl</code></td><td>1.953rem</td><td>≈31px</td><td>h3</td></tr>
                    <tr><td><code>--text-4xl</code></td><td>3.052rem</td><td>≈49px</td><td>h1</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code5 }}
                />
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://web.dev/articles/font-best-practices">web.dev — Optimize WebFont loading</Ext></li>
                <li><Ext href="https://www.modularscale.com/">Modular Scale ツール</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s6">
            <div className="sec-hdr">
              <span className="sec-num">06</span>
              <h2 className="sec-title">スペーシング・サイジングシステム</h2>
            </div>
            <p className="sec-lead"><strong>4pxベースグリッド</strong>で余白を統一します。すべての値が4の倍数であることでデザインに規則性が生まれ、Figmaなどのデザインツールとの整合性も高まります。</p>
            <div className="sub-sec">
              <div className="sub-title">スペーシングスケール完全実装</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code6 }}
                />
              </div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>場所</th><th>推奨値</th><th>例</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>コンポーネント内部 <code>padding</code></td><td><code>--space-2</code> 〜 <code>--space-4</code></td><td>ボタンのパディング</td></tr>
                    <tr><td>コンポーネント間 <code>gap</code></td><td><code>--space-4</code> 〜 <code>--space-6</code></td><td>カードグリッドの隙間</td></tr>
                    <tr><td>セクション間</td><td><code>--space-12</code> 〜 <code>--space-20</code></td><td>ページ内の大見出し間</td></tr>
                    <tr><td>ページ外側余白</td><td>モバイル: <code>--space-4</code> / PC: <code>--space-6</code></td><td>コンテナの <code>padding-inline</code></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://tailwindcss.com/docs/customizing-spacing">Tailwind CSS — Spacing Scale</Ext></li>
                <li><Ext href="https://spec.fm/specifics/8-pt-grid">spec.fm — The 8-Point Grid System</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s7">
            <div className="sec-hdr">
              <span className="sec-num">07</span>
              <h2 className="sec-title">グリッド・レイアウトシステム</h2>
            </div>
            <p className="sec-lead">CSS GridとFlexboxは「どちらが優れているか」ではなく、<strong>用途に応じて使い分ける</strong>ものです。2次元（行＋列）はGrid、1次元（横か縦）はFlexboxが最適解です。</p>
            <div className="sub-sec">
              <div className="sub-title">Grid vs Flexbox 使い分け</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-grid-flex" chart={MERMAID_CHARTS.gridFlex} />
                <p className="mmaid-cap">図7.1 レイアウト手法の選択フロー</p>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">グリッドシステム完全実装</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code7 }}
                />
              </div>
            </div>
            <div className="bp-box">
              <div className="bp-ttl">✅ レイアウト選択ベストプラクティス</div>
              <ul className="chk-list">
                <li className="chk-g">ページ全体・カードグリッドなど2次元は <code>CSS Grid</code> を使う</li>
                <li className="chk-g">ナビゲーション・ボタングループなど1次元は <code>Flexbox</code> を使う</li>
                <li className="chk-g"><code>auto-fill</code> + <code>minmax()</code> でメディアクエリなしのレスポンシブを実現</li>
                <li className="chk-g">コンポーネントの自律的レスポンシブには <code>Container Query</code> を活用</li>
              </ul>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://developer.mozilla.org/ja/docs/Web/CSS/CSS_grid_layout">MDN — CSS Grid レイアウト</Ext></li>
                <li><Ext href="https://every-layout.dev/">Every Layout — レイアウトパターン集</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s8">
            <div className="sec-hdr">
              <span className="sec-num">08</span>
              <h2 className="sec-title">コンポーネント設計とBEM命名規則</h2>
            </div>
            <p className="sec-lead">BEM（Block Element Modifier）はCSSクラスの命名規則で、<strong>可読性・再利用性・保守性</strong>を大幅に向上させます。CSS変数と組み合わせることで、現代的で強力なコンポーネント設計が実現できます。</p>
            <div className="sub-sec">
              <div className="sub-title">BEM命名規則の構造</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-bem" chart={MERMAID_CHARTS.bem} />
                <p className="mmaid-cap">図8.1 Block / Element / Modifier の関係</p>
              </div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>概念</th><th>記法</th><th>例</th><th>意味</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>Block</strong></td><td><code>.block</code></td><td><code>.card</code></td><td>独立した意味を持つ最小単位</td></tr>
                    <tr><td><strong>Element</strong></td><td><code>.block__element</code></td><td><code>.card__title</code></td><td>ブロックを構成する部品（__ 二重アンダースコア）</td></tr>
                    <tr><td><strong>Modifier</strong></td><td><code>.block--modifier</code></td><td><code>.card--featured</code></td><td>バリエーションや状態（-- 二重ハイフン）</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">ボタンコンポーネント完全実装（CSS変数 + BEM）</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code8 }}
                />
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://getbem.com/">BEM公式サイト</Ext></li>
                <li><Ext href="https://www.smashingmagazine.com/2018/06/bem-for-beginners/">Smashing Magazine — BEM For Beginners</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s9">
            <div className="sec-hdr">
              <span className="sec-num">09</span>
              <h2 className="sec-title">レスポンシブデザインシステム</h2>
            </div>
            <p className="sec-lead"><strong>モバイルファースト</strong>で設計します。小さい画面を基点にして <code>min-width</code> で大画面へ段階的に拡張することで、パフォーマンスと保守性の両方が向上します。</p>
            <div className="sub-sec">
              <div className="sub-title">モバイルファースト vs デスクトップファースト</div>
              <div className="cmp-grid">
                <div className="cmp-g">
                  <div className="cmp-lbl">✅ モバイルファースト（推奨）</div>
                  <ul className="chk-list">
                    <li className="chk-g">スマホ向けスタイルをまず書く</li>
                    <li className="chk-g"><code>min-width</code> で大画面に拡張</li>
                    <li className="chk-g">コンテンツ優先思考（Progressive Enhancement）</li>
                  </ul>
                </div>
                <div className="cmp-r">
                  <div className="cmp-lbl">❌ デスクトップファースト（非推奨）</div>
                  <ul className="chk-list">
                    <li className="chk-r">デスクトップ向けを先に書く</li>
                    <li className="chk-r"><code>max-width</code> で縮小・上書きする</li>
                    <li className="chk-r">上書きの連鎖で保守が難しくなる</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">レスポンシブ実装完全ガイド</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code9 }}
                />
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://web.dev/learn/design">web.dev — Learn Responsive Design</Ext></li>
                <li><Ext href="https://developer.mozilla.org/ja/docs/Web/CSS/clamp">MDN — clamp()</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s10">
            <div className="sec-hdr">
              <span className="sec-num">10</span>
              <h2 className="sec-title">アクセシビリティ（a11y）設計</h2>
            </div>
            <p className="sec-lead">アクセシビリティは「障害者向けの配慮」ではなく、<strong>すべてのユーザーにとっての使いやすさ</strong>です。WCAG 2.1の4原則「POUR」に基づき、キーボード操作・スクリーンリーダー・コントラストを考慮したCSSを書きます。</p>
            <div className="sub-sec">
              <div className="sub-title">WCAG 2.1の4原則（POUR）</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-pour" chart={MERMAID_CHARTS.pour} />
                <p className="mmaid-cap">図10.1 WCAGの4原則と主な達成基準</p>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">アクセシブルCSS完全実装</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code10 }}
                />
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://waic.jp/translations/WCAG21/">WCAG 2.1 日本語訳</Ext></li>
                <li><Ext href="https://webaim.org/resources/contrastchecker/">WebAIM コントラストチェッカー</Ext></li>
                <li><Ext href="https://www.deque.com/axe/devtools/">axe DevTools（無料a11y自動テスト）</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s11">
            <div className="sec-hdr">
              <span className="sec-num">11</span>
              <h2 className="sec-title">アニメーション・トランジションシステム</h2>
            </div>
            <p className="sec-lead">アニメーションはUIの意図を伝える重要な手段ですが、<strong>重いプロパティをアニメーションするとフレームレートが低下</strong>します。<code>transform</code> と <code>opacity</code> のみを使うことがパフォーマンス最適化の鉄則です。</p>
            <div className="sub-sec">
              <div className="sub-title">GPU vs CPU：どのプロパティが速いか</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-anim-perf" chart={MERMAID_CHARTS.animPerf} />
                <p className="mmaid-cap">図11.1 GPU処理（高速）と CPU処理（低速）の比較</p>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">アニメーションシステム完全実装</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code11 }}
                />
              </div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>時間</th><th>用途</th><th>例</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>0〜100ms</td><td>マイクロインタラクション</td><td>ボタンの色変化・フォーカスリング</td></tr>
                    <tr><td>100〜200ms</td><td>標準UIフィードバック</td><td>ホバー・アクティブ状態</td></tr>
                    <tr><td>200〜400ms</td><td>UIの出現・消滅</td><td>ドロップダウン・ツールチップ</td></tr>
                    <tr><td>300〜500ms</td><td>パネル・モーダル</td><td>サイドドロワー・ダイアログ</td></tr>
                    <tr><td>500ms以上</td><td>大きなレイアウト変化</td><td>ページ間アニメーション</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://m3.material.io/styles/motion/overview">Material Design — Motion</Ext></li>
                <li><Ext href="https://csstriggers.com/">CSS Triggers（プロパティの描画コスト一覧）</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s12">
            <div className="sec-hdr">
              <span className="sec-num">12</span>
              <h2 className="sec-title">CSSアーキテクチャパターン</h2>
            </div>
            <p className="sec-lead">大規模プロジェクトでは、CSSをどのように組織化するかが保守性を左右します。現代では<strong><code>@layer</code>（CSS Cascade Layers）</strong>を使ったITCSS的な構造化が最も推奨されます。</p>
            <div className="sub-sec">
              <div className="sub-title">ITCSS（逆三角形CSS）構造</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-itcss" chart={MERMAID_CHARTS.itcss} />
                <p className="mmaid-cap">図12.1 ITCSS：上ほど広いスコープ・低い詳細度（逆三角形）</p>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">@layer を使った現代的アーキテクチャ</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS — main.css</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code12 }}
                />
              </div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS — @layer の中身例</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code13 }}
                />
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://csswizardry.com/">CSS Wizardry — ITCSS</Ext></li>
                <li><Ext href="https://cube.fyi/">CUBE CSS</Ext></li>
                <li><Ext href="https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Cascade_layers">MDN — CSS Cascade Layers (@layer)</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s13">
            <div className="sec-hdr">
              <span className="sec-num">13</span>
              <h2 className="sec-title">デザイントークン</h2>
            </div>
            <p className="sec-lead">デザイントークンとは<strong>「設計上の判断をコードとして表現したもの」</strong>です。色・サイズ・余白などの値に名前を付け、Web・iOS・Android間で共有することでデザインと開発の共通言語になります。</p>
            <div className="sub-sec">
              <div className="sub-title">トークンのフロー：Figma → 各プラットフォームへ</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-token-flow" chart={MERMAID_CHARTS.tokenFlow} />
                <p className="mmaid-cap">図13.1 Style Dictionary によるマルチプラットフォーム変換</p>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">トークンのJSON定義とStyle Dictionary変換</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">JSON — tokens.json</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code14 }}
                />
              </div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">JavaScript — style-dictionary.config.js</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code15 }}
                />
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://styledictionary.com/">Style Dictionary（Amazon）</Ext></li>
                <li><Ext href="https://tokens.studio/">Tokens Studio — Figmaプラグイン</Ext></li>
                <li><Ext href="https://designtokens.org">W3C Design Tokens 仕様</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s14">
            <div className="sec-hdr">
              <span className="sec-num">14</span>
              <h2 className="sec-title">実践：完全なコンポーネント実装例</h2>
            </div>
            <p className="sec-lead">CSS変数・BEM・アクセシビリティ・レスポンシブ・アニメーションを統合した<strong>ECサイト商品カード</strong>の完全実装例です。</p>
            <div className="sub-sec">
              <div className="sub-title">商品カード HTML + CSS</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">HTML</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code16 }}
                />
              </div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code17 }}
                />
              </div>
            </div>
          </section>

          <section className="section" id="s15">
            <div className="sec-hdr">
              <span className="sec-num">15</span>
              <h2 className="sec-title">パフォーマンス最適化</h2>
            </div>
            <p className="sec-lead">CSSはレンダリングブロッキングリソースです。<strong>Critical CSS・未使用CSS削除・content-visibility</strong>の3つを押さえるだけで、Core Web Vitalsが劇的に改善します。</p>
            <div className="sub-sec">
              <div className="sub-title">Core Web Vitals 目標値</div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>指標</th><th>✅ 良好</th><th>⚠️ 要改善</th><th>意味</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>LCP</strong></td><td>≤ 2.5秒</td><td>≤ 4.0秒</td><td>最大コンテンツの描画時間</td></tr>
                    <tr><td><strong>INP</strong></td><td>≤ 200ms</td><td>≤ 500ms</td><td>インタラクションの応答時間</td></tr>
                    <tr><td><strong>CLS</strong></td><td>≤ 0.1</td><td>≤ 0.25</td><td>レイアウトのズレ量</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">Critical CSS + PurgeCSS</div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">HTML — Critical CSSインライン化</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code18 }}
                />
              </div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">JavaScript — postcss.config.js（PurgeCSS）</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code19 }}
                />
              </div>
              <div className="code-wrap">
                <div className="code-hdr">
                  <span className="code-lang">CSS — content-visibility</span>
                  <div className="code-dots"><span className="dot dot-r"></span><span className="dot dot-y"></span><span className="dot dot-g"></span></div>
                </div>
                <pre // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code20 }}
                />
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://web.dev/vitals/">web.dev — Core Web Vitals</Ext></li>
                <li><Ext href="https://purgecss.com/">PurgeCSS</Ext></li>
                <li><Ext href="https://pagespeed.web.dev/">PageSpeed Insights（計測ツール）</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s16">
            <div className="sec-hdr">
              <span className="sec-num">16</span>
              <h2 className="sec-title">ツール・エコシステム</h2>
            </div>
            <p className="sec-lead">デザインシステムを持続的に運用するためのツールチェーンです。<strong>Figma → Style Dictionary → PostCSS → Storybook</strong> の流れが現代的な標準構成です。</p>
            <div className="sub-sec">
              <div className="sub-title">ツール全体マップ</div>
              <div className="mmaid-wrap">
                <MermaidDiagram id="d-tools" chart={MERMAID_CHARTS.tools} />
                <p className="mmaid-cap">図16.1 デザインシステムを支えるツールエコシステム</p>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">主要ツール一覧</div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>カテゴリ</th><th>ツール</th><th>役割</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>デザイン</td><td>Figma + Tokens Studio</td><td>UIデザイン・トークンをJSONへエクスポート</td></tr>
                    <tr><td>トークン変換</td><td>Style Dictionary</td><td>JSON → CSS/Swift/Kotlin に自動変換</td></tr>
                    <tr><td>ビルド</td><td>PostCSS + Autoprefixer</td><td>モダンCSS構文変換・ベンダープレフィックス自動付与</td></tr>
                    <tr><td>品質</td><td>Stylelint</td><td>CSS文法・命名規則を自動チェック</td></tr>
                    <tr><td>ドキュメント</td><td>Storybook</td><td>コンポーネントカタログ・ドキュメント</td></tr>
                    <tr><td>テスト</td><td>Chromatic / axe-core</td><td>ビジュアルリグレッション・a11y自動テスト</td></tr>
                    <tr><td>最適化</td><td>PurgeCSS + cssnano</td><td>未使用CSS削除・圧縮</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース</div>
              <ul className="src-list">
                <li><Ext href="https://storybook.js.org/">Storybook</Ext></li>
                <li><Ext href="https://stylelint.io/">Stylelint</Ext></li>
                <li><Ext href="https://postcss.org/">PostCSS</Ext></li>
              </ul>
            </div>
          </section>

          <section className="section" id="s17">
            <div className="sec-hdr">
              <span className="sec-num">17</span>
              <h2 className="sec-title">ベストプラクティス総まとめ</h2>
            </div>
            <p className="sec-lead">全17章で学んだ内容の集大成です。アンチパターンの対処法・成熟度モデル・リリース前チェックリストで知識を実践に結びつけましょう。</p>
            <div className="sub-sec">
              <div className="sub-title">よくあるアンチパターンと正しいアプローチ</div>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr><th>❌ アンチパターン</th><th>✅ 正しいアプローチ</th><th>理由</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><code>#header &#123; color: red &#125;</code></td><td><code>.site-header &#123; color: red &#125;</code></td><td>IDは詳細度が高すぎて上書き困難</td></tr>
                    <tr><td><code>font-size: 14px</code>（本文）</td><td><code>font-size: 0.875rem</code></td><td>pxはユーザー設定を無視する</td></tr>
                    <tr><td><code>outline: none</code></td><td><code>:focus-visible &#123; outline: 2px solid blue &#125;</code></td><td>フォーカスを消すとキーボード操作不能に</td></tr>
                    <tr><td><code>top: 37px</code>（マジックナンバー）</td><td><code>top: calc(var(--header-h) + var(--space-2))</code></td><td>根拠不明な数値は変更時に困る</td></tr>
                    <tr><td><code>width</code> でアニメーション</td><td><code>transform: scaleX()</code> でアニメーション</td><td>widthはリフロー多発でパフォーマンス悪化</td></tr>
                    <tr><td><code>@media (max-width: 768px)</code></td><td><code>@media (min-width: 48em)</code></td><td>デスクトップファーストはアンチパターン</td></tr>
                    <tr><td><code>color: #3498db</code>（直書き）</td><td><code>color: var(--color-primary)</code></td><td>変数なしでは変更コストが爆発的に増える</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">デザインシステム成熟度モデル</div>
              <div className="maturity">
                <div className="mat-lv" style={{ background: "rgba(107,114,128,.25)" }}><div className="mat-n">Lv.0</div><div className="mat-ttl" style={{ color: "#9ca3af" }}>場当たり的</div><div className="mat-desc" style={{ color: "#6b7280" }}>コピペCSS<br />一貫性なし</div></div>
                <div className="mat-lv" style={{ background: "rgba(59,130,246,.2)" }}><div className="mat-n">Lv.1</div><div className="mat-ttl" style={{ color: "#7dd3fc" }}>基礎整備</div><div className="mat-desc" style={{ color: "#94a3b8" }}>カラー・フォント<br />変数化</div></div>
                <div className="mat-lv" style={{ background: "rgba(52,211,153,.2)" }}><div className="mat-n">Lv.2</div><div className="mat-ttl" style={{ color: "#6ee7b7" }}>部品化</div><div className="mat-desc" style={{ color: "#94a3b8" }}>BEM+CSS変数<br />ボタン統一</div></div>
                <div className="mat-lv" style={{ background: "rgba(251,191,36,.2)" }}><div className="mat-n">Lv.3</div><div className="mat-ttl" style={{ color: "#fde68a" }}>システム化</div><div className="mat-desc" style={{ color: "#94a3b8" }}>デザイントークン<br />Storybook</div></div>
                <div className="mat-lv" style={{ background: "rgba(251,146,60,.2)" }}><div className="mat-n">Lv.4</div><div className="mat-ttl" style={{ color: "#fdba74" }}>自動化</div><div className="mat-desc" style={{ color: "#94a3b8" }}>Style Dictionary<br />ビジュアルテスト</div></div>
                <div className="mat-lv" style={{ background: "rgba(168,85,247,.2)" }}><div className="mat-n">Lv.5</div><div className="mat-ttl" style={{ color: "#d8b4fe" }}>エコシステム</div><div className="mat-desc" style={{ color: "#94a3b8" }}>全プラットフォーム<br />CI/CD自動検証</div></div>
              </div>
            </div>
            <div className="sub-sec">
              <div className="sub-title">🚀 リリース前 最終チェックリスト</div>
              <div className="card-grid">
                <div className="card-feat">
                  <div className="card-ico">⚡</div>
                  <div className="card-ttl">パフォーマンス</div>
                  <ul className="chk-list" style={{ marginTop: ".5rem" }}>
                    <li className="chk-g">LCP 2.5秒以内</li>
                    <li className="chk-g">CSS 50KB以下（gzip後）</li>
                    <li className="chk-g">未使用CSS削除済み</li>
                    <li className="chk-g">Critical CSSインライン化</li>
                  </ul>
                </div>
                <div className="card-feat">
                  <div className="card-ico">♿</div>
                  <div className="card-ttl">アクセシビリティ</div>
                  <ul className="chk-list" style={{ marginTop: ".5rem" }}>
                    <li className="chk-g">コントラスト比 4.5:1以上</li>
                    <li className="chk-g">キーボードのみで全操作</li>
                    <li className="chk-g">スクリーンリーダー確認</li>
                    <li className="chk-g">フォーカスリングが見える</li>
                  </ul>
                </div>
                <div className="card-feat">
                  <div className="card-ico">📱</div>
                  <div className="card-ttl">レスポンシブ</div>
                  <ul className="chk-list" style={{ marginTop: ".5rem" }}>
                    <li className="chk-g">スマホ（360px〜）確認</li>
                    <li className="chk-g">タブレット（768px〜）確認</li>
                    <li className="chk-g">ズーム200%で崩れない</li>
                    <li className="chk-g">横向き表示確認</li>
                  </ul>
                </div>
                <div className="card-feat">
                  <div className="card-ico">✅</div>
                  <div className="card-ttl">コード品質</div>
                  <ul className="chk-list" style={{ marginTop: ".5rem" }}>
                    <li className="chk-g">Stylelintエラーゼロ</li>
                    <li className="chk-g">マジックナンバーなし</li>
                    <li className="chk-g">CSS変数を統一使用</li>
                    <li className="chk-g">!important 最小限</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="src-ref">
              <div className="src-ref-ttl">📖 参考ソース（総合）</div>
              <ul className="src-list">
                <li><Ext href="https://developer.mozilla.org/ja/docs/Web/CSS">MDN Web Docs — CSS リファレンス</Ext></li>
                <li><Ext href="https://web.dev/learn/css">web.dev — Learn CSS</Ext></li>
                <li><Ext href="https://css-tricks.com/">CSS Tricks</Ext></li>
                <li><Ext href="https://every-layout.dev/">Every Layout</Ext></li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
