import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import CssColorTypographySpacingSidebar from "./CssColorTypographySpacingSidebar";

const NAV_GROUPS = [
  {
    title: "CSSカスタムプロパティ",
    chNum: "Ch.3",
    items: [
      { id: "s31", num: "3.1", label: "カスタムプロパティとは" },
      { id: "s32", num: "3.2", label: "定義・参照・スコープ" },
      { id: "s33", num: "3.3", label: "トークンの階層設計" },
      { id: "s34", num: "3.4", label: "JavaScriptとの連携" },
      { id: "s35", num: "3.5", label: "ベストプラクティス" },
    ],
  },
  {
    title: "カラーシステム",
    chNum: "Ch.4",
    items: [
      { id: "s41", num: "4.1", label: "カラーシステムの目的" },
      { id: "s42", num: "4.2", label: "カラーパレットの構造" },
      { id: "s43", num: "4.3", label: "セマンティックカラー" },
      { id: "s44", num: "4.4", label: "ダークモード対応" },
      { id: "s45", num: "4.5", label: "アクセシビリティ" },
      { id: "s46", num: "4.6", label: "ベストプラクティス" },
    ],
  },
  {
    title: "タイポグラフィシステム",
    chNum: "Ch.5",
    items: [
      { id: "s51", num: "5.1", label: "タイポグラフィの重要性" },
      { id: "s52", num: "5.2", label: "タイプスケールの設計" },
      { id: "s53", num: "5.3", label: "フォントファミリー・ウェイト" },
      { id: "s54", num: "5.4", label: "行高・文字間隔・行長" },
      { id: "s55", num: "5.5", label: "レスポンシブタイポグラフィ" },
      { id: "s56", num: "5.6", label: "ベストプラクティス" },
    ],
  },
  {
    title: "スペーシング・サイジング",
    chNum: "Ch.6",
    items: [
      { id: "s61", num: "6.1", label: "スペーシングの目的" },
      { id: "s62", num: "6.2", label: "ベースグリッドと数列" },
      { id: "s63", num: "6.3", label: "スペーシングトークン設計" },
      { id: "s64", num: "6.4", label: "コンポーネントサイジング" },
      { id: "s65", num: "6.5", label: "スペーシング適用パターン" },
      { id: "s66", num: "6.6", label: "ベストプラクティス" },
    ],
  },
  {
    title: "まとめ",
    items: [
      { id: "summary", num: "Summary", label: "4システムの関係性" },
      { id: "refs", num: "References", label: "参考リソース" },
    ],
  },
];

// コードブロックのハイライトHTML定義
const CODES = {
  s31_1: `<span class="cm">/* ── 定義：:root に書くとページ全体で使える ── */</span>
<span class="fn">:root</span> {
  <span class="kw">--color-primary</span>: <span class="st">#6C47FF</span>;   <span class="cm">/* ブランドカラー */</span>
  <span class="kw">--space-4</span>:       <span class="st">16px</span>;      <span class="cm">/* スペース */</span>
  <span class="kw">--font-size-lg</span>:  <span class="st">1.125rem</span>;  <span class="cm">/* フォントサイズ */</span>
}

<span class="cm">/* ── 参照：var() で呼び出す ── */</span>
<span class="fn">.button</span> {
  <span class="kw">background</span>:  <span class="fn">var</span>(<span class="kw">--color-primary</span>);
  <span class="kw">padding</span>:     <span class="fn">var</span>(<span class="kw">--space-4</span>);
  <span class="kw">font-size</span>:   <span class="fn">var</span>(<span class="kw">--font-size-lg</span>);
}

<span class="cm">/* ── フォールバック値（第2引数）── */</span>
<span class="cm">/* --color-brand が未定義のとき #6C47FF を使用 */</span>
<span class="fn">.button</span> {
  <span class="kw">background</span>: <span class="fn">var</span>(<span class="kw">--color-brand</span>, <span class="st">#6C47FF</span>);

  <span class="cm">/* フォールバックに別の変数も可能 */</span>
  <span class="kw">color</span>: <span class="fn">var</span>(<span class="kw">--text-on-brand</span>, <span class="fn">var</span>(<span class="kw">--color-white</span>, <span class="st">#ffffff</span>));
}`,

  s32_1: `<span class="cm">/* グローバルスコープ ── ページ全体で有効 */</span>
<span class="fn">:root</span> {
  <span class="kw">--color-primary</span>: <span class="st">#6C47FF</span>;
}

<span class="cm">/* ローカルスコープ ── .card 内だけ有効 */</span>
<span class="fn">.card</span> {
  <span class="kw">--card-bg</span>: <span class="st">#1e1e2e</span>;
  <span class="kw">background</span>: <span class="fn">var</span>(<span class="kw">--card-bg</span>);
}

<span class="cm">/* .section 内だけ --color-primary を赤に上書き */</span>
<span class="fn">.section--alert</span> {
  <span class="kw">--color-primary</span>: <span class="st">#ef4444</span>;
  <span class="cm">/* この中の子要素は赤を参照する */
}

/* .dark-theme 内でまとめてテーマを上書き */</span>
<span class="fn">.dark-theme</span> {
  <span class="kw">--color-primary</span>: <span class="st">#9070ff</span>;   <span class="cm">/* 暗い背景に合わせて明るく */</span>
  <span class="kw">--card-bg</span>:       <span class="st">#2d1e3d</span>;
}`,

  s33_1: `<span class="fn">:root</span> {
  <span class="cm">/* カラースケール（色の名前 + 濃淡番号） */</span>
  <span class="kw">--purple-50</span>:  <span class="st">#f5f3ff</span>;
  <span class="kw">--purple-100</span>: <span class="st">#ede9fe</span>;
  <span class="kw">--purple-500</span>: <span class="st">#6C47FF</span>;  <span class="cm">/* ← ベースカラー */</span>
  <span class="kw">--purple-600</span>: <span class="st">#5a38e0</span>;
  <span class="kw">--purple-900</span>: <span class="st">#1e0a5c</span>;

  <span class="kw">--gray-50</span>:  <span class="st">#fafafa</span>;
  <span class="kw">--gray-100</span>: <span class="st">#f4f4f5</span>;
  <span class="kw">--gray-500</span>: <span class="st">#71717a</span>;
  <span class="kw">--gray-900</span>: <span class="st">#18181b</span>;

  <span class="kw">--red-500</span>:   <span class="st">#ef4444</span>;
  <span class="kw">--green-500</span>: <span class="st">#22c55e</span>;
  <span class="kw">--amber-500</span>: <span class="st">#f59e0b</span>;

  <span class="cm">/* 基本スペース値（4px刻み） */</span>
  <span class="kw">--size-1</span>:  <span class="st">4px</span>;   <span class="kw">--size-2</span>:  <span class="st">8px</span>;
  <span class="kw">--size-3</span>:  <span class="st">12px</span>;  <span class="kw">--size-4</span>:  <span class="st">16px</span>;
  <span class="kw">--size-6</span>:  <span class="st">24px</span>;  <span class="kw">--size-8</span>:  <span class="st">32px</span>;
  <span class="kw">--size-12</span>: <span class="st">48px</span>;  <span class="kw">--size-16</span>: <span class="st">64px</span>;
}`,

  s33_2: `<span class="fn">:root</span> {
  <span class="cm">/* 「何色か」ではなく「何のための色か」で命名 */</span>
  <span class="kw">--color-action-primary</span>:        <span class="fn">var</span>(<span class="kw">--purple-500</span>);
  <span class="kw">--color-action-primary-hover</span>:  <span class="fn">var</span>(<span class="kw">--purple-600</span>);
  <span class="kw">--color-action-primary-subtle</span>: <span class="fn">var</span>(<span class="kw">--purple-50</span>);

  <span class="kw">--color-feedback-danger</span>:   <span class="fn">var</span>(<span class="kw">--red-500</span>);
  <span class="kw">--color-feedback-success</span>:  <span class="fn">var</span>(<span class="kw">--green-500</span>);
  <span class="kw">--color-feedback-warning</span>:  <span class="fn">var</span>(<span class="kw">--amber-500</span>);

  <span class="kw">--color-bg-base</span>:           <span class="fn">var</span>(<span class="kw">--gray-50</span>);
  <span class="kw">--color-bg-surface</span>:        <span class="fn">var</span>(<span class="kw">--white</span>);
  <span class="kw">--color-text-primary</span>:      <span class="fn">var</span>(<span class="kw">--gray-900</span>);
  <span class="kw">--color-text-muted</span>:        <span class="fn">var</span>(<span class="kw">--gray-500</span>);

  <span class="cm">/* スペーシングも意味付け */</span>
  <span class="kw">--spacing-xs</span>:  <span class="fn">var</span>(<span class="kw">--size-1</span>);   <span class="cm">/* 4px  */</span>
  <span class="kw">--spacing-sm</span>:  <span class="fn">var</span>(<span class="kw">--size-2</span>);   <span class="cm">/* 8px  */</span>
  <span class="kw">--spacing-md</span>:  <span class="fn">var</span>(<span class="kw">--size-4</span>);   <span class="cm">/* 16px */</span>
  <span class="kw">--spacing-lg</span>:  <span class="fn">var</span>(<span class="kw">--size-6</span>);   <span class="cm">/* 24px */</span>
  <span class="kw">--spacing-xl</span>:  <span class="fn">var</span>(<span class="kw">--size-8</span>);   <span class="cm">/* 32px */</span>
}`,

  s33_3: `<span class="fn">:root</span> {
  <span class="cm">/* セマンティックトークンをコンポーネント名で包む */</span>
  <span class="kw">--button-bg</span>:         <span class="fn">var</span>(<span class="kw">--color-action-primary</span>);
  <span class="kw">--button-bg-hover</span>:   <span class="fn">var</span>(<span class="kw">--color-action-primary-hover</span>);
  <span class="kw">--button-padding-x</span>:  <span class="fn">var</span>(<span class="kw">--spacing-md</span>);
  <span class="kw">--button-padding-y</span>:  <span class="fn">var</span>(<span class="kw">--spacing-sm</span>);

  <span class="kw">--card-bg</span>:           <span class="fn">var</span>(<span class="kw">--color-bg-surface</span>);
  <span class="kw">--card-padding</span>:      <span class="fn">var</span>(<span class="kw">--spacing-lg</span>);
  <span class="kw">--card-border</span>:       <span class="fn">var</span>(<span class="kw">--color-border-default</span>);
}

<span class="cm">/* コンポーネント実装は第3層を参照 */</span>
<span class="fn">.button</span> {
  <span class="kw">background</span>:  <span class="fn">var</span>(<span class="kw">--button-bg</span>);
  <span class="kw">padding</span>:     <span class="fn">var</span>(<span class="kw">--button-padding-y</span>) <span class="fn">var</span>(<span class="kw">--button-padding-x</span>);
}
<span class="fn">.button:hover</span> {
  <span class="kw">background</span>: <span class="fn">var</span>(<span class="kw">--button-bg-hover</span>);
}`,

  s34_1: `<span class="kw">const</span> root = document.documentElement; <span class="cm">// = :root 要素</span>

<span class="cm">// ── 読み取り ──</span>
<span class="kw">const</span> primary = getComputedStyle(root)
  .getPropertyValue(<span class="st">'--color-action-primary'</span>)
  .trim();
<span class="cm">// => "#6C47FF"</span>

<span class="cm">// ── 書き込み（リアルタイムに変更）──</span>
root.style.setProperty(<span class="st">'--color-action-primary'</span>, <span class="st">'#ff6b6b'</span>);
<span class="cm">// 即座にページ全体の --color-action-primary が更新される</span>

<span class="cm">// ── 削除（:root の宣言に戻る）──</span>
root.style.removeProperty(<span class="st">'--color-action-primary'</span>);`,

  s34_2: `<span class="cm">// テーマ定義オブジェクト</span>
<span class="kw">const</span> THEMES = {
  light: {
    <span class="st">'--color-bg-base'</span>:      <span class="st">'#fafafa'</span>,
    <span class="st">'--color-bg-surface'</span>:   <span class="st">'#ffffff'</span>,
    <span class="st">'--color-text-primary'</span>: <span class="st">'#18181b'</span>,
    <span class="st">'--color-text-muted'</span>:   <span class="st">'#71717a'</span>,
    <span class="st">'--color-border'</span>:       <span class="st">'#e4e4e7'</span>,
  },
  dark: {
    <span class="st">'--color-bg-base'</span>:      <span class="st">'#09090b'</span>,
    <span class="st">'--color-bg-surface'</span>:   <span class="st">'#18181b'</span>,
    <span class="st">'--color-text-primary'</span>: <span class="st">'#fafafa'</span>,
    <span class="st">'--color-text-muted'</span>:   <span class="st">'#a1a1aa'</span>,
    <span class="st">'--color-border'</span>:       <span class="st">'#27272a'</span>,
  }
};

<span class="kw">function</span> <span class="fn">applyTheme</span>(theme) {
  <span class="kw">const</span> root = document.documentElement;

  <span class="cm">// 全トークンを一括更新</span>
  Object.entries(THEMES[theme]).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  <span class="cm">// 設定を永続化</span>
  localStorage.setItem(<span class="st">'preferred-theme'</span>, theme);
}

<span class="cm">// ── 初期化：保存済みテーマ or OS設定 ──</span>
<span class="kw">const</span> saved = localStorage.getItem(<span class="st">'preferred-theme'</span>);
<span class="kw">const</span> osDark = window.matchMedia(<span class="st">'(prefers-color-scheme: dark)'</span>).matches;
<span class="fn">applyTheme</span>(saved ?? (osDark ? <span class="st">'dark' : 'light'</span>));`,

  s35_ng: `<span class="cm">/* 何を表しているか全くわからない */</span>
<span class="kw">--c1</span>: <span class="st">#6C47FF</span>;
<span class="kw">--blue</span>: <span class="st">#3b82f6</span>;
<span class="kw">--big</span>: <span class="st">24px</span>;
<span class="kw">--p</span>: <span class="st">16px</span>;`,

  s35_ok: `<span class="cm">/* 一目で役割がわかる命名 */</span>
<span class="kw">--color-action-primary</span>:       <span class="st">#6C47FF</span>;
<span class="kw">--color-action-primary-hover</span>: <span class="st">#5a38e0</span>;
<span class="kw">--color-feedback-danger</span>:      <span class="st">#ef4444</span>;
<span class="kw">--font-size-heading-lg</span>:       <span class="st">1.5rem</span>;
<span class="kw">--spacing-component-gap</span>:      <span class="st">16px</span>;`,

  s35_2: `<span class="cm">/* @property で型・初期値・継承を宣言 */</span>
<span class="fn">@property</span> --progress {
  <span class="kw">syntax</span>:        <span class="st">'&lt;number&gt;'</span>;  <span class="cm">/* 数値型 */</span>
  <span class="kw">inherits</span>:      <span class="st">false</span>;
  <span class="kw">initial-value</span>: <span class="st">0</span>;
}

<span class="cm">/* アニメーション可能なプログレスバー */</span>
<span class="fn">.progress-bar</span> {
  <span class="kw">--progress</span>: <span class="st">0</span>;
  <span class="kw">width</span>: <span class="fn">calc</span>(<span class="fn">var</span>(<span class="kw">--progress</span>) * <span class="st">1%</span>);
  <span class="kw">transition</span>: <span class="kw">--progress</span> <span class="st">0.4s</span> <span class="fn">cubic-bezier</span>(<span class="st">0.4</span>, <span class="st">0</span>, <span class="st">0.2</span>, <span class="st">1</span>);
}

<span class="cm">/* JavaScript から数値を渡すだけ */</span>
<span class="cm">/* el.style.setProperty('--progress', 75); */</span>`,

  s35_3: `<span class="cm">/* ── 推奨ファイル構造 ──

  tokens/
  ├── primitives.css    ← プリミティブトークン（生の値）
  ├── semantic.css      ← セマンティックトークン（意味）
  └── themes/
      ├── light.css     ← ライトテーマ
      └── dark.css      ← ダークテーマ

  components/
  ├── button.css        ← コンポーネントトークン + スタイル
  └── card.css

トークンファイルは定期的に棚卸しし、
未使用変数を削除することで肥大化を防ぐ */</span>`,

  s42_1: `<span class="fn">:root</span> {
  <span class="kw">--purple-50</span>:  <span class="st">#f5f3ff</span>;  <span class="cm">/* 最も淡い。背景・ホバー用 */</span>
  <span class="kw">--purple-100</span>: <span class="st">#ede9fe</span>;
  <span class="kw">--purple-200</span>: <span class="st">#ddd6fe</span>;
  <span class="kw">--purple-300</span>: <span class="st">#c4b5fd</span>;
  <span class="kw">--purple-400</span>: <span class="st">#a78bfa</span>;
  <span class="kw">--purple-500</span>: <span class="st">#8b5cf6</span>;  <span class="cm">/* ベースカラー。メインUI用 */</span>
  <span class="kw">--purple-600</span>: <span class="st">#7c3aed</span>;  <span class="cm">/* ホバー状態 */</span>
  <span class="kw">--purple-700</span>: <span class="st">#6d28d9</span>;
  <span class="kw">--purple-800</span>: <span class="st">#5b21b6</span>;
  <span class="kw">--purple-900</span>: <span class="st">#4c1d95</span>;  <span class="cm">/* 最も濃い。ダークテキスト用 */</span>
}`,

  s43_1: `<span class="fn">:root</span> {
  <span class="cm">/* ── アクション系 ──  */</span>
  <span class="kw">--color-action-primary</span>:          <span class="fn">var</span>(<span class="kw">--purple-500</span>);
  <span class="kw">--color-action-primary-hover</span>:    <span class="fn">var</span>(<span class="kw">--purple-600</span>);
  <span class="kw">--color-action-primary-active</span>:   <span class="fn">var</span>(<span class="kw">--purple-700</span>);
  <span class="kw">--color-action-primary-subtle</span>:   <span class="fn">var</span>(<span class="kw">--purple-50</span>);

  <span class="cm">/* ── フィードバック系 ── */</span>
  <span class="kw">--color-feedback-danger</span>:         <span class="fn">var</span>(<span class="kw">--red-500</span>);
  <span class="kw">--color-feedback-danger-subtle</span>:  <span class="fn">var</span>(<span class="kw">--red-50</span>);
  <span class="kw">--color-feedback-success</span>:        <span class="fn">var</span>(<span class="kw">--green-500</span>);
  <span class="kw">--color-feedback-success-subtle</span>: <span class="fn">var</span>(<span class="kw">--green-50</span>);
  <span class="kw">--color-feedback-warning</span>:        <span class="fn">var</span>(<span class="kw">--amber-500</span>);
  <span class="kw">--color-feedback-warning-subtle</span>: <span class="fn">var</span>(<span class="kw">--amber-50</span>);
  <span class="kw">--color-feedback-info</span>:           <span class="fn">var</span>(<span class="kw">--blue-500</span>);
  <span class="kw">--color-feedback-info-subtle</span>:    <span class="fn">var</span>(<span class="kw">--blue-50</span>);

  <span class="cm">/* ── 背景系 ── */</span>
  <span class="kw">--color-bg-base</span>:       <span class="fn">var</span>(<span class="kw">--gray-50</span>);   <span class="cm">/* ページ背景 */</span>
  <span class="kw">--color-bg-surface</span>:    <span class="fn">var</span>(<span class="kw">--white</span>);     <span class="cm">/* カード・パネル */</span>
  <span class="kw">--color-bg-overlay</span>:    <span class="fn">var</span>(<span class="kw">--gray-100</span>);  <span class="cm">/* ドロップダウン等 */</span>

  <span class="cm">/* ── テキスト系 ── */</span>
  <span class="kw">--color-text-primary</span>:  <span class="fn">var</span>(<span class="kw">--gray-900</span>);  <span class="cm">/* メインテキスト */</span>
  <span class="kw">--color-text-secondary</span>:<span class="fn">var</span>(<span class="kw">--gray-600</span>);  <span class="cm">/* 補助テキスト */</span>
  <span class="kw">--color-text-muted</span>:    <span class="fn">var</span>(<span class="kw">--gray-400</span>);  <span class="cm">/* ヒント・プレースホルダー */</span>
  <span class="kw">--color-text-on-primary</span>: <span class="fn">var</span>(<span class="kw">--white</span>);  <span class="cm">/* プライマリ背景上のテキスト */</span>
  <span class="kw">--color-text-disabled</span>: <span class="fn">var</span>(<span class="kw">--gray-300</span>); <span class="cm">/* 無効状態 */</span>

  <span class="cm">/* ── ボーダー系 ── */</span>
  <span class="kw">--color-border-default</span>: <span class="fn">var</span>(<span class="kw">--gray-200</span>);
  <span class="kw">--color-border-strong</span>:  <span class="fn">var</span>(<span class="kw">--gray-400</span>);
  <span class="kw">--color-border-focus</span>:   <span class="fn">var</span>(<span class="kw">--purple-500</span>); <span class="cm">/* フォーカスリング */</span>
}`,

  s44_1: `<span class="cm">/* ━━ パターン1: OSのダークモード設定に自動追従 ━━ */</span>
<span class="fn">:root</span> {
  <span class="kw">--color-bg-base</span>:        <span class="st">#fafafa</span>;
  <span class="kw">--color-bg-surface</span>:     <span class="st">#ffffff</span>;
  <span class="kw">--color-text-primary</span>:   <span class="st">#18181b</span>;
  <span class="kw">--color-text-muted</span>:     <span class="st">#71717a</span>;
  <span class="kw">--color-border-default</span>: <span class="st">#e4e4e7</span>;
}

<span class="fn">@media (prefers-color-scheme: dark)</span> {
  <span class="fn">:root</span> {
    <span class="kw">--color-bg-base</span>:        <span class="st">#09090b</span>;
    <span class="kw">--color-bg-surface</span>:     <span class="st">#18181b</span>;
    <span class="kw">--color-text-primary</span>:   <span class="st">#fafafa</span>;
    <span class="kw">--color-text-muted</span>:     <span class="st">#a1a1aa</span>;
    <span class="kw">--color-border-default</span>: <span class="st">#27272a</span>;
  }
}

<span class="cm">/* ━━ パターン2: ボタンで手動切り替え ━━ */</span>
<span class="cm">/* data-theme="dark" を html 要素に付与 */</span>
<span class="fn">[data-theme="dark"]</span> {
  <span class="kw">--color-bg-base</span>:        <span class="st">#09090b</span>;
  <span class="kw">--color-bg-surface</span>:     <span class="st">#18181b</span>;
  <span class="kw">--color-text-primary</span>:   <span class="st">#fafafa</span>;
  <span class="kw">--color-text-muted</span>:     <span class="st">#a1a1aa</span>;
  <span class="kw">--color-border-default</span>: <span class="st">#27272a</span>;
}

<span class="cm">/* ━━ コンポーネントはセマンティックトークンを使うだけ ━━ */</span>
<span class="cm">/* テーマが変わっても一切修正不要！ */</span>
<span class="fn">.card</span> {
  <span class="kw">background</span>:    <span class="fn">var</span>(<span class="kw">--color-bg-surface</span>);
  <span class="kw">color</span>:         <span class="fn">var</span>(<span class="kw">--color-text-primary</span>);
  <span class="kw">border</span>:        <span class="st">1px solid var(--color-border-default)</span>;
}`,

  s45_ng: `<span class="cm">/* 薄い背景 + 薄いテキスト */</span>
<span class="fn">.badge-bad</span> {
  <span class="cm">/* #ede9fe 背景に */</span>
  <span class="kw">background</span>: <span class="fn">var</span>(<span class="kw">--purple-100</span>);
  <span class="cm">/* #c4b5fd テキスト */
  /* コントラスト比: 約2.3:1 → 不合格 */</span>
  <span class="kw">color</span>: <span class="fn">var</span>(<span class="kw">--purple-300</span>);
}`,

  s45_ok: `<span class="cm">/* 薄い背景 + 濃いテキスト */</span>
<span class="fn">.badge-good</span> {
  <span class="cm">/* #ede9fe 背景に */</span>
  <span class="kw">background</span>: <span class="fn">var</span>(<span class="kw">--purple-100</span>);
  <span class="cm">/* #5b21b6 テキスト */
  /* コントラスト比: 約7.5:1 → AAA合格 */</span>
  <span class="kw">color</span>: <span class="fn">var</span>(<span class="kw">--purple-800</span>);
}`,

  s46_1_ng: `<span class="fn">:root</span> {
  <span class="cm">/* 直接値を書くと変更時に
     全箇所を探す必要がある */</span>
  <span class="kw">--color-danger</span>: <span class="st">#ef4444</span>;
  <span class="kw">--color-danger-subtle</span>: <span class="st">#fef2f2</span>;
}`,

  s46_1_ok: `<span class="fn">:root</span> {
  <span class="cm">/* プリミティブ（1箇所で管理） */</span>
  <span class="kw">--red-500</span>: <span class="st">#ef4444</span>;
  <span class="kw">--red-50</span>:  <span class="st">#fef2f2</span>;
  <span class="cm">/* セマンティックはプリミティブを参照 */</span>
  <span class="kw">--color-danger</span>:        <span class="fn">var</span>(<span class="kw">--red-500</span>);
  <span class="kw">--color-danger-subtle</span>: <span class="fn">var</span>(<span class="kw">--red-50</span>);
}`,

  s46_2_ng: `<span class="fn">.alert-error</span> {
  <span class="cm">/* 意味が不明確。テーマ変更に弱い */</span>
  <span class="kw">background</span>: <span class="fn">var</span>(<span class="kw">--red-50</span>);
  <span class="kw">color</span>:      <span class="fn">var</span>(<span class="kw">--red-900</span>);
  <span class="kw">border</span>:     <span class="st">1px solid var(--red-200)</span>;
}`,

  s46_2_ok: `<span class="fn">.alert-error</span> {
  <span class="cm">/* 用途が明確。テーマ変更に強い */</span>
  <span class="kw">background</span>: <span class="fn">var</span>(<span class="kw">--color-feedback-danger-subtle</span>);
  <span class="kw">color</span>:      <span class="fn">var</span>(<span class="kw">--color-feedback-danger</span>);
  <span class="kw">border</span>:     <span class="st">1px solid var(--color-feedback-danger)</span>;
}`,

  s52_1: `<span class="cm">/*
  比率: 1.25（Major Third）
  base = 1rem = 16px

  xs:   1rem ÷ 1.25² = 0.64rem  ≈ 10px  → 注釈・キャプション
  sm:   1rem ÷ 1.25  = 0.8rem   = 12.8px → ラベル・補足
  base: 1rem          = 1rem    = 16px   → 本文テキスト ★基準
  lg:   1rem × 1.25  = 1.25rem = 20px   → リード文
  xl:   1rem × 1.25² = 1.563rem= 25px   → h4 見出し
  2xl:  1rem × 1.25³ = 1.953rem= 31px   → h3 見出し
  3xl:  1rem × 1.25⁴ = 2.441rem≈ 39px  → h2 見出し
  4xl:  1rem × 1.25⁵ = 3.052rem≈ 49px  → h1 見出し
*/</span>`,

  s52_2: `<span class="fn">:root</span> {
  <span class="kw">--font-size-xs</span>:   <span class="st">0.64rem</span>;   <span class="cm">/* 10px  注釈・キャプション      */</span>
  <span class="kw">--font-size-sm</span>:   <span class="st">0.875rem</span>;  <span class="cm">/* 14px  ラベル・補足テキスト    */</span>
  <span class="kw">--font-size-base</span>: <span class="st">1rem</span>;      <span class="cm">/* 16px  本文テキスト（基準）    */</span>
  <span class="kw">--font-size-lg</span>:   <span class="st">1.125rem</span>;  <span class="cm">/* 18px  リード文・強調テキスト  */</span>
  <span class="kw">--font-size-xl</span>:   <span class="st">1.25rem</span>;   <span class="cm">/* 20px  h4・小見出し            */</span>
  <span class="kw">--font-size-2xl</span>:  <span class="st">1.5rem</span>;    <span class="cm">/* 24px  h3・セクション見出し    */</span>
  <span class="kw">--font-size-3xl</span>:  <span class="st">1.875rem</span>;  <span class="cm">/* 30px  h2・主要見出し          */</span>
  <span class="kw">--font-size-4xl</span>:  <span class="st">2.25rem</span>;   <span class="cm">/* 36px  h1・ページタイトル      */</span>
  <span class="kw">--font-size-5xl</span>:  <span class="st">3rem</span>;      <span class="cm">/* 48px  ヒーロー・超大見出し    */</span>
}

<span class="cm">/* 使用例 */</span>
<span class="fn">h1</span> { <span class="kw">font-size</span>: <span class="fn">var</span>(<span class="kw">--font-size-4xl</span>); }
<span class="fn">h2</span> { <span class="kw">font-size</span>: <span class="fn">var</span>(<span class="kw">--font-size-3xl</span>); }
<span class="fn">h3</span> { <span class="kw">font-size</span>: <span class="fn">var</span>(<span class="kw">--font-size-2xl</span>); }
<span class="fn">p</span>  { <span class="kw">font-size</span>: <span class="fn">var</span>(<span class="kw">--font-size-base</span>); }
<span class="fn">small</span> { <span class="kw">font-size</span>: <span class="fn">var</span>(<span class="kw">--font-size-sm</span>); }`,

  s53_1: `<span class="fn">:root</span> {
  <span class="cm">/* サンセリフ：本文・UIコンポーネント用
     英語フォント + 日本語フォールバック + システムフォント */</span>
  <span class="kw">--font-sans</span>:
    <span class="st">'Inter'</span>,
    <span class="st">'Hiragino Kaku Gothic ProN'</span>, <span class="st">'Hiragino Sans'</span>,  <span class="cm">/* macOS / iOS */</span>
    <span class="st">'Meiryo'</span>, <span class="st">'Yu Gothic'</span>,                          <span class="cm">/* Windows */</span>
    <span class="st">'Noto Sans JP'</span>,                                 <span class="cm">/* Android / 汎用 */</span>
    <span class="st">system-ui</span>, <span class="st">sans-serif</span>;

  <span class="cm">/* セリフ：長文・印刷物・特定ブランド向け */</span>
  <span class="kw">--font-serif</span>:
    <span class="st">'Georgia'</span>,
    <span class="st">'Noto Serif JP'</span>,
    <span class="st">serif</span>;

  <span class="cm">/* モノスペース：コード・等幅表示専用 */</span>
  <span class="kw">--font-mono</span>:
    <span class="st">'JetBrains Mono'</span>, <span class="st">'Fira Code'</span>, <span class="st">'Source Code Pro'</span>,
    <span class="st">monospace</span>;
}`,

  s53_2: `<span class="fn">:root</span> {
  <span class="kw">--font-weight-regular</span>:  <span class="st">400</span>;  <span class="cm">/* 通常テキスト・本文     */</span>
  <span class="kw">--font-weight-medium</span>:   <span class="st">500</span>;  <span class="cm">/* ラベル・UIテキスト     */</span>
  <span class="kw">--font-weight-semibold</span>: <span class="st">600</span>;  <span class="cm">/* 小見出し・強調テキスト */</span>
  <span class="kw">--font-weight-bold</span>:     <span class="st">700</span>;  <span class="cm">/* 見出し・重要情報       */</span>
}

<span class="cm">/* 推奨の使い分け */</span>
<span class="fn">body</span>        { <span class="kw">font-weight</span>: <span class="fn">var</span>(<span class="kw">--font-weight-regular</span>);  }
<span class="fn">.label</span>      { <span class="kw">font-weight</span>: <span class="fn">var</span>(<span class="kw">--font-weight-medium</span>);   }
<span class="fn">h3, h4</span>      { <span class="kw">font-weight</span>: <span class="fn">var</span>(<span class="kw">--font-weight-semibold</span>); }
<span class="fn">h1, h2</span>      { <span class="kw">font-weight</span>: <span class="fn">var</span>(<span class="kw">--font-weight-bold</span>);     }

<span class="cm">/* Web フォントの @font-face 定義 */</span>
<span class="fn">@font-face</span> {
  <span class="kw">font-family</span>: <span class="st">'Inter'</span>;
  <span class="kw">src</span>: <span class="fn">url</span>(<span class="st">'/fonts/Inter-var.woff2'</span>) <span class="fn">format</span>(<span class="st">'woff2'</span>);
  <span class="kw">font-weight</span>: <span class="st">100 900</span>;   <span class="cm">/* バリアブルフォントは範囲指定 */</span>
  <span class="kw">font-style</span>: <span class="st">normal</span>;
  <span class="kw">font-display</span>: <span class="st">swap</span>;     <span class="cm">/* 読込中はシステムフォントで表示 */</span>
}`,

  s54_1: `<span class="fn">:root</span> {
  <span class="kw">--line-height-none</span>:    <span class="st">1</span>;     <span class="cm">/* アイコン・ロゴ（行間なし）  */</span>
  <span class="kw">--line-height-tight</span>:   <span class="st">1.25</span>;  <span class="cm">/* 見出し・短いテキスト       */</span>
  <span class="kw">--line-height-normal</span>:  <span class="st">1.5</span>;   <span class="cm">/* UIコンポーネント・ボタン   */</span>
  <span class="kw">--line-height-relaxed</span>: <span class="st">1.7</span>;   <span class="cm">/* 本文テキスト（長文）       */</span>
  <span class="kw">--line-height-loose</span>:   <span class="st">2</span>;     <span class="cm">/* 補足文・注釈               */</span>
}

<span class="cm">/* 推奨の使い分け */</span>
<span class="fn">h1, h2, h3</span> {
  <span class="kw">line-height</span>: <span class="fn">var</span>(<span class="kw">--line-height-tight</span>);    <span class="cm">/* 1.25 詰める */</span>
}
<span class="fn">p, li</span> {
  <span class="kw">line-height</span>: <span class="fn">var</span>(<span class="kw">--line-height-relaxed</span>);  <span class="cm">/* 1.7 ゆったり */</span>
}
<span class="fn">button, label</span> {
  <span class="kw">line-height</span>: <span class="fn">var</span>(<span class="kw">--line-height-normal</span>);   <span class="cm">/* 1.5 中間 */</span>
}`,

  s54_2: `<span class="fn">:root</span> {
  <span class="kw">--tracking-tight</span>:  <span class="st">-0.025em</span>;  <span class="cm">/* 大きな見出し（詰める）      */</span>
  <span class="kw">--tracking-normal</span>:  <span class="st">0em</span>;      <span class="cm">/* 通常テキスト                */</span>
  <span class="kw">--tracking-wide</span>:    <span class="st">0.025em</span>;  <span class="cm">/* 小さなラベル・UIテキスト    */</span>
  <span class="kw">--tracking-wider</span>:   <span class="st">0.05em</span>;   <span class="cm">/* 大文字テキスト（UPPERCASE） */</span>
}

<span class="cm">/* 見出しは字間を詰める */</span>
<span class="fn">h1, h2</span> { <span class="kw">letter-spacing</span>: <span class="fn">var</span>(<span class="kw">--tracking-tight</span>); }

<span class="cm">/* 大文字テキストは必ず字間を広げる */</span>
<span class="fn">.label-uppercase</span> {
  <span class="kw">text-transform</span>: <span class="st">uppercase</span>;
  <span class="kw">letter-spacing</span>: <span class="fn">var</span>(<span class="kw">--tracking-wider</span>);
}

<span class="cm">/* ── 行長（1行の文字数）── */</span>
<span class="cm">/* 理想は 45〜75文字/行。英語では約60ch、日本語は35〜40em */</span>
<span class="fn">.prose</span> {
  <span class="kw">max-width</span>: <span class="st">65ch</span>;   <span class="cm">/* ch = 「0」の文字幅 */</span>
}

<span class="fn">.prose-ja</span> {
  <span class="kw">max-width</span>: <span class="st">40em</span>;   <span class="cm">/* 日本語の場合 */</span>
}`,

  s55_1: `<span class="cm">/* clamp(最小, ビューポート依存の計算値, 最大) */</span>

<span class="cm">/* h1: 320px画面では 1.75rem → 1280px画面では 3rem へなめらかに変化 */</span>
<span class="fn">h1</span> {
  <span class="kw">font-size</span>: <span class="fn">clamp</span>(<span class="st">1.75rem</span>, <span class="st">3vw + 1rem</span>, <span class="st">3rem</span>);
}

<span class="fn">h2</span> { <span class="kw">font-size</span>: <span class="fn">clamp</span>(<span class="st">1.375rem</span>, <span class="st">2vw + 1rem</span>, <span class="st">2.25rem</span>); }
<span class="fn">h3</span> { <span class="kw">font-size</span>: <span class="fn">clamp</span>(<span class="st">1.125rem</span>, <span class="st">1.5vw + 0.75rem</span>, <span class="st">1.5rem</span>); }

<span class="cm">/* 本文は最小・最大を小さな範囲に固定 */</span>
<span class="fn">p</span> {
  <span class="kw">font-size</span>: <span class="fn">clamp</span>(<span class="st">1rem</span>, <span class="st">1.25vw + 0.75rem</span>, <span class="st">1.125rem</span>);
}

<span class="cm">/* ── CSS変数との組み合わせ（推奨） ── */</span>
<span class="fn">:root</span> {
  <span class="kw">--font-size-h1</span>:   <span class="fn">clamp</span>(<span class="st">1.75rem</span>, <span class="st">3vw + 1rem</span>, <span class="st">3rem</span>);
  <span class="kw">--font-size-h2</span>:   <span class="fn">clamp</span>(<span class="st">1.375rem</span>, <span class="st">2vw + 1rem</span>, <span class="st">2.25rem</span>);
  <span class="kw">--font-size-h3</span>:   <span class="fn">clamp</span>(<span class="st">1.125rem</span>, <span class="st">1.5vw + 0.75rem</span>, <span class="st">1.5rem</span>);
  <span class="kw">--font-size-body</span>: <span class="fn">clamp</span>(<span class="st">1rem</span>, <span class="st">1.25vw + 0.5rem</span>, <span class="st">1.125rem</span>);
}

<span class="fn">h1</span> { <span class="kw">font-size</span>: <span class="fn">var</span>(<span class="kw">--font-size-h1</span>); }
<span class="fn">h2</span> { <span class="kw">font-size</span>: <span class="fn">var</span>(<span class="kw">--font-size-h2</span>); }
<span class="fn">p</span>  { <span class="kw">font-size</span>: <span class="fn">var</span>(<span class="kw">--font-size-body</span>); }`,

  s56_ng: `<span class="cm">&lt;!-- h1 の次に h3 は禁止 --&gt;</span>
&lt;h1&gt;ページタイトル&lt;/h1&gt;
&lt;h3&gt;サブセクション&lt;/h3&gt;
<span class="cm">&lt;!-- スクリーンリーダーが
  構造を正しく読めない --&gt;</span>`,

  s56_ok: `<span class="cm">&lt;!-- 階層を守って使う --&gt;</span>
&lt;h1&gt;ページタイトル&lt;/h1&gt;
&lt;h2&gt;セクション&lt;/h2&gt;
&lt;h3&gt;サブセクション&lt;/h3&gt;
<span class="cm">&lt;!-- 意味的にも正しく
  SEOにも有効 --&gt;</span>`,

  s56_2_ng: `<span class="cm">/* ブラウザの文字サイズ設定を
   無視してしまう */</span>
<span class="fn">.text</span> {
  <span class="kw">font-size</span>: <span class="st">14px</span>;
  <span class="kw">line-height</span>: <span class="st">21px</span>;
}`,

  s56_2_ok: `<span class="cm">/* ユーザーのブラウザ設定に
   追従する（アクセシブル） */</span>
<span class="fn">.text</span> {
  <span class="cm">/* 16px × 0.875 = 14px */</span>
  <span class="kw">font-size</span>: <span class="st">0.875rem</span>;
  <span class="kw">line-height</span>: <span class="st">1.5</span>;
}`,

  s63_1: `<span class="fn">:root</span> {
  <span class="kw">--space-px</span>:  <span class="st">1px</span>;    <span class="cm">/* ボーダー・デバイダー専用           */</span>
  <span class="kw">--space-0</span>:   <span class="st">0px</span>;
  <span class="kw">--space-0-5</span>: <span class="st">2px</span>;    <span class="cm">/* 極小の微調整                      */</span>
  <span class="kw">--space-1</span>:   <span class="st">4px</span>;    <span class="cm">/* アイコンとラベルの間など           */</span>
  <span class="kw">--space-2</span>:   <span class="st">8px</span>;    <span class="cm">/* 関連要素のタイトな結合             */</span>
  <span class="kw">--space-3</span>:   <span class="st">12px</span>;   <span class="cm">/* コンポーネント内要素間             */</span>
  <span class="kw">--space-4</span>:   <span class="st">16px</span>;   <span class="cm">/* コンポーネント標準パディング ★頻出 */</span>
  <span class="kw">--space-5</span>:   <span class="st">20px</span>;
  <span class="kw">--space-6</span>:   <span class="st">24px</span>;   <span class="cm">/* セクション内の余白                */</span>
  <span class="kw">--space-8</span>:   <span class="st">32px</span>;   <span class="cm">/* カード・パネルの余白              */</span>
  <span class="kw">--space-10</span>:  <span class="st">40px</span>;
  <span class="kw">--space-12</span>:  <span class="st">48px</span>;   <span class="cm">/* セクション間の余白                */</span>
  <span class="kw">--space-16</span>:  <span class="st">64px</span>;   <span class="cm">/* ページレベルの余白                */</span>
  <span class="kw">--space-20</span>:  <span class="st">80px</span>;
  <span class="kw">--space-24</span>:  <span class="st">96px</span>;   <span class="cm">/* ヒーロー・大セクション            */</span>
}`,

  s63_2: `<span class="fn">:root</span> {
  <span class="cm">/* ── インセット（コンポーネント内部の余白）── */</span>
  <span class="kw">--spacing-inset-xs</span>:  <span class="fn">var</span>(<span class="kw">--space-2</span>);   <span class="cm">/*  8px バッジ・タグ      */</span>
  <span class="kw">--spacing-inset-sm</span>:  <span class="fn">var</span>(<span class="kw">--space-3</span>);   <span class="cm">/* 12px 小ボタン          */</span>
  <span class="kw">--spacing-inset-md</span>:  <span class="fn">var</span>(<span class="kw">--space-4</span>);   <span class="cm">/* 16px 標準ボタン・入力  */</span>
  <span class="kw">--spacing-inset-lg</span>:  <span class="fn">var</span>(<span class="kw">--space-6</span>);   <span class="cm">/* 24px カード・パネル    */</span>
  <span class="kw">--spacing-inset-xl</span>:  <span class="fn">var</span>(<span class="kw">--space-8</span>);   <span class="cm">/* 32px モーダル          */</span>

  <span class="cm">/* ── スタック（縦方向の間隔）── */</span>
  <span class="kw">--spacing-stack-xs</span>:  <span class="fn">var</span>(<span class="kw">--space-2</span>);   <span class="cm">/*  8px タイトなリスト    */</span>
  <span class="kw">--spacing-stack-sm</span>:  <span class="fn">var</span>(<span class="kw">--space-4</span>);   <span class="cm">/* 16px フォームフィールド間 */</span>
  <span class="kw">--spacing-stack-md</span>:  <span class="fn">var</span>(<span class="kw">--space-6</span>);   <span class="cm">/* 24px セクション内要素間  */</span>
  <span class="kw">--spacing-stack-lg</span>:  <span class="fn">var</span>(<span class="kw">--space-12</span>);  <span class="cm">/* 48px セクション間        */</span>
  <span class="kw">--spacing-stack-xl</span>:  <span class="fn">var</span>(<span class="kw">--space-16</span>);  <span class="cm">/* 64px ページセクション間  */</span>

  <span class="cm">/* ── インライン（横方向の間隔）── */</span>
  <span class="kw">--spacing-inline-xs</span>: <span class="fn">var</span>(<span class="kw">--space-1</span>);   <span class="cm">/*  4px アイコン + ラベル  */</span>
  <span class="kw">--spacing-inline-sm</span>: <span class="fn">var</span>(<span class="kw">--space-2</span>);   <span class="cm">/*  8px ボタン内要素間     */</span>
  <span class="kw">--spacing-inline-md</span>: <span class="fn">var</span>(<span class="kw">--space-4</span>);   <span class="cm">/* 16px カラム間           */</span>
  <span class="kw">--spacing-inline-lg</span>: <span class="fn">var</span>(<span class="kw">--space-6</span>);   <span class="cm">/* 24px 広めのカラム間     */</span>
}`,

  s64_1: `<span class="fn">:root</span> {
  <span class="kw">--size-component-xs</span>: <span class="st">24px</span>;   <span class="cm">/* チップ・タグ・スモールバッジ         */</span>
  <span class="kw">--size-component-sm</span>: <span class="st">32px</span>;   <span class="cm">/* 小ボタン・小入力フォーム             */</span>
  <span class="kw">--size-component-md</span>: <span class="st">40px</span>;   <span class="cm">/* 標準ボタン・入力フォーム（推奨）★   */</span>
  <span class="kw">--size-component-lg</span>: <span class="st">48px</span>;   <span class="cm">/* 大ボタン・大入力フォーム             */</span>
  <span class="kw">--size-component-xl</span>: <span class="st">56px</span>;   <span class="cm">/* 特大ボタン（LPのCTAなど）            */</span>
}

<span class="cm">/* インタラクティブ要素の最小タッチターゲット */</span>
<span class="cm">/* WCAG 2.5.5: 最低 44×44px を推奨 */</span>
<span class="fn">.button, .input, .select</span> {
  <span class="kw">min-height</span>: <span class="fn">var</span>(<span class="kw">--size-component-md</span>); <span class="cm">/* 40px */</span>
  <span class="kw">min-width</span>:  <span class="st">44px</span>;
}

<span class="cm">/* 具体的な実装例 */</span>
<span class="fn">.button</span> {
  <span class="kw">height</span>:         <span class="fn">var</span>(<span class="kw">--size-component-md</span>);
  <span class="kw">padding-inline</span>: <span class="fn">var</span>(<span class="kw">--spacing-inset-md</span>);
  <span class="kw">border-radius</span>:  <span class="st">6px</span>;
  <span class="kw">font-size</span>:      <span class="fn">var</span>(<span class="kw">--font-size-base</span>);
  <span class="kw">font-weight</span>:    <span class="fn">var</span>(<span class="kw">--font-weight-medium</span>);
}

<span class="fn">.button--sm</span> {
  <span class="kw">height</span>:         <span class="fn">var</span>(<span class="kw">--size-component-sm</span>);
  <span class="kw">padding-inline</span>: <span class="fn">var</span>(<span class="kw">--spacing-inset-sm</span>);
  <span class="kw">font-size</span>:      <span class="fn">var</span>(<span class="kw">--font-size-sm</span>);
}`,

  s64_2: `<span class="fn">:root</span> {
  <span class="kw">--container-xs</span>:  <span class="st">320px</span>;   <span class="cm">/* 超狭コンテンツ（モーダル等）        */</span>
  <span class="kw">--container-sm</span>:  <span class="st">480px</span>;   <span class="cm">/* 狭コンテンツ（フォーム等）          */</span>
  <span class="kw">--container-md</span>:  <span class="st">768px</span>;   <span class="cm">/* 中程度（ブログ本文等）              */</span>
  <span class="kw">--container-lg</span>:  <span class="st">1024px</span>;  <span class="cm">/* 標準コンテンツ                     */</span>
  <span class="kw">--container-xl</span>:  <span class="st">1280px</span>;  <span class="cm">/* 広いレイアウト                     */</span>
  <span class="kw">--container-2xl</span>: <span class="st">1536px</span>;  <span class="cm">/* フルワイドレイアウト               */</span>
}

<span class="cm">/* 汎用コンテナクラス */</span>
<span class="fn">.container</span> {
  <span class="kw">width</span>: <span class="st">100%</span>;
  <span class="kw">max-width</span>: <span class="fn">var</span>(<span class="kw">--container-xl</span>);
  <span class="kw">margin-inline</span>: <span class="st">auto</span>;             <span class="cm">/* 局所寄せ */</span>
  <span class="kw">padding-inline</span>: <span class="fn">var</span>(<span class="kw">--space-4</span>);  <span class="cm">/* 16px サイドマージン */</span>
}

<span class="fn">@media (min-width: 768px)</span> {
  <span class="fn">.container</span> { <span class="kw">padding-inline</span>: <span class="fn">var</span>(<span class="kw">--space-6</span>); }  <span class="cm">/* 24px */</span>
}
<span class="fn">@media (min-width: 1280px)</span> {
  <span class="fn">.container</span> { <span class="kw">padding-inline</span>: <span class="fn">var</span>(<span class="kw">--space-8</span>); }  <span class="cm">/* 32px */</span>
}`,

  s65_1: `<span class="cm">/* ラベルと入力：最も近い（強い関連） */</span>
<span class="fn">.form-group</span> {
  <span class="kw">display</span>: <span class="st">flex</span>;
  <span class="kw">flex-direction</span>: <span class="st">column</span>;
  <span class="kw">gap</span>: <span class="fn">var</span>(<span class="kw">--space-1</span>);     <span class="cm">/* 4px — ラベルと入力の間 */</span>
}

<span class="cm">/* フォームフィールド間：中程度の関連 */</span>
<span class="fn">.form-section</span> {
  <span class="kw">display</span>: <span class="st">flex</span>;
  <span class="kw">flex-direction</span>: <span class="st">column</span>;
  <span class="kw">gap</span>: <span class="fn">var</span>(<span class="kw">--space-4</span>);     <span class="cm">/* 16px — フィールド間 */</span>
}

<span class="cm">/* フォームとボタン：少し広め */</span>
<span class="fn">.form-actions</span> {
  <span class="kw">margin-top</span>: <span class="fn">var</span>(<span class="kw">--space-6</span>);  <span class="cm">/* 24px */</span>
}

<span class="cm">/* セクション間：弱い関連（独立したブロック） */</span>
<span class="fn">.page-section + .page-section</span> {
  <span class="kw">margin-top</span>: <span class="fn">var</span>(<span class="kw">--space-16</span>); <span class="cm">/* 64px */</span>
}`,

  s65_ng: `<span class="cm">/* 最後の要素にも
   余分なマージンが付く */</span>
<span class="fn">.list-item</span> {
  <span class="kw">margin-bottom</span>: <span class="fn">var</span>(<span class="kw">--space-4</span>);
}
<span class="cm">/* 末尾の :last-child で
   別途打ち消しが必要 */</span>`,

  s65_ok: `<span class="cm">/* 全アイテム間に等間隔
   最後の要素には付かない */</span>
<span class="fn">.list</span> {
  <span class="kw">display</span>: <span class="st">flex</span>;
  <span class="kw">flex-direction</span>: <span class="st">column</span>;
  <span class="kw">gap</span>: <span class="fn">var</span>(<span class="kw">--space-4</span>);
}
<span class="cm">/* :last-child 打ち消し不要！ */</span>`,

  s66_ng: `<span class="fn">.component</span> {
  <span class="kw">padding</span>: <span class="st">13px 17px</span>;
  <span class="kw">margin-bottom</span>: <span class="st">22px</span>;
  <span class="kw">gap</span>: <span class="st">11px</span>;
  <span class="cm">/* なぜこの数値？変更できない */</span>
}`,

  s66_ok: `<span class="fn">.component</span> {
  <span class="kw">padding</span>: <span class="fn">var</span>(<span class="kw">--space-3</span>) <span class="fn">var</span>(<span class="kw">--space-4</span>); <span class="cm">/* 12px 16px */</span>
  <span class="kw">margin-bottom</span>: <span class="fn">var</span>(<span class="kw">--space-6</span>);           <span class="cm">/* 24px */</span>
  <span class="kw">gap</span>: <span class="fn">var</span>(<span class="kw">--space-3</span>);                     <span class="cm">/* 12px */</span>
}`,

  s66_2_ng: `<span class="fn">.button</span> {
  <span class="cm">/* 意図が読み取りにくい
     RTL言語でも変わらない */</span>
  <span class="kw">padding</span>: <span class="st">8px 16px 10px 14px</span>;
}`,

  s66_2_ok: `<span class="fn">.button</span> {
  <span class="cm">/* 上下・左右が明確
     RTL言語でも自動対応！ */</span>
  <span class="kw">padding-block</span>:  <span class="fn">var</span>(<span class="kw">--space-2</span>); <span class="cm">/* 8px 上下 */</span>
  <span class="kw">padding-inline</span>: <span class="fn">var</span>(<span class="kw">--space-4</span>); <span class="cm">/* 16px 左右 */</span>
}`,
};

export default function Page() {
  return (
    <div className="css-color-typography-spacing-systems">
      <CssColorTypographySpacingSidebar groups={NAV_GROUPS} />

      <main className="main">
        {/* HERO */}
        <section className="hero">
          <div className="hero-in">
            <div className="hero-tag">
              <span className="hero-ew-dot" />
              CSS Design System — Complete Guide 2025
            </div>
            <h1 className="hero-title">
              CSSデザインシステム
              <br />
              <em>完全ガイド</em>
            </h1>
            <p className="hero-desc">
              CSSカスタムプロパティ・カラーシステム・タイポグラフィ・スペーシングの4つの柱を体系的に学び、保守性の高いデザインシステムを構築する力を身につけましょう。
            </p>
            <div className="hero-pills">
              <span className="hero-pill">🟡 基礎〜中級</span>
              <span className="hero-pill">📖 4チャプター</span>
              <span className="hero-pill">🎯 17 図解</span>
              <span className="hero-pill">💡 ベストプラクティス付き</span>
            </div>

            <div className="ch-cards">
              <a className="ch-card" href="#s31">
                <div className="cc-bar" style={{ background: "var(--acc)" }} />
                <div className="cc-num">Chapter 3</div>
                <div className="cc-ttl">CSSカスタムプロパティ</div>
                <div className="cc-desc">変数の定義・スコープ・3層トークン設計・JS連携</div>
              </a>
              <a className="ch-card" href="#s41">
                <div className="cc-bar" style={{ background: "var(--cyan)" }} />
                <div className="cc-num">Chapter 4</div>
                <div className="cc-ttl">カラーシステム</div>
                <div className="cc-desc">カラーパレット・セマンティック・ダークモード・WCAG</div>
              </a>
              <a className="ch-card" href="#s51">
                <div className="cc-bar" style={{ background: "var(--grn)" }} />
                <div className="cc-num">Chapter 5</div>
                <div className="cc-ttl">タイポグラフィシステム</div>
                <div className="cc-desc">タイプスケール・フォント・行高・clamp()レスポンシブ</div>
              </a>
              <a className="ch-card" href="#s61">
                <div className="cc-bar" style={{ background: "var(--amb)" }} />
                <div className="cc-num">Chapter 6</div>
                <div className="cc-ttl">スペーシング・サイジング</div>
                <div className="cc-desc">
                  4pxグリッド・トークン設計・近接の原則・コンポーネント高さ
                </div>
              </a>
            </div>
          </div>
        </section>

        <div className="content">
          {/* ===================== CHAPTER 3 ===================== */}
          <div className="ch-hdr">
            <span className="ch-hdr-num">Chapter 3</span>
            <h2>CSSカスタムプロパティ（変数）システム</h2>
          </div>

          {/* 3.1 */}
          <section className="section" id="s31">
            <span className="sec-lbl">3.1</span>
            <h2>カスタムプロパティとは何か</h2>
            <p className="sec-sub">
              CSSカスタムプロパティ（CSS変数）は、
              <strong style={{ color: "var(--txt-hi)" }}>
                CSS内で定義・再利用できる値の入れ物
              </strong>
              です。<code>--</code> で始まる名前で定義し、<code>var()</code> 関数で参照します。
            </p>

            <div className="callout callout-info">
              <span className="c-ico">💡</span>
              <div>
                <strong>なぜ必要か？</strong>
                <br />
                同じ色やサイズを何度も書くと、変更時に全箇所を修正する必要があります。CSS変数を使えば
                <strong>1箇所を変えるだけで全体に反映</strong>されます。
              </div>
            </div>

            <h3>定義と参照の基本構文</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s31_1 }} />
            </div>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`flowchart LR
    subgraph DEFINE["定義（:root）"]
        V1["--color-primary: #6C47FF"]
        V2["--space-4: 16px"]
        V3["--font-size-lg: 1.125rem"]
    end
    subgraph USE["参照（コンポーネント）"]
        U1["background: var(--color-primary)"]
        U2["padding: var(--space-4)"]
        U3["font-size: var(--font-size-lg)"]
    end
    V1 --> U1
    V2 --> U2
    V3 --> U3
    style DEFINE fill:#1e2d1e,stroke:#22c55e,color:#86efac
    style USE fill:#1e1e2d,stroke:#6C47FF,color:#c4b5fd`
              } />
              <div className="diagram-caption">▲ CSS変数の定義（:root）→ コンポーネントへの参照フロー</div>
            </div>

            <h3>CSS変数 vs SASS変数 — 何が違うか</h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>
                      CSS変数（<code>--name</code>）
                    </th>
                    <th>
                      SASS変数（<code>$name</code>）
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>処理タイミング</td>
                    <td>ブラウザが実行時に解決</td>
                    <td>コンパイル時に解決</td>
                  </tr>
                  <tr>
                    <td>JavaScriptから操作</td>
                    <td>✅ できる</td>
                    <td>❌ できない</td>
                  </tr>
                  <tr>
                    <td>スコープ</td>
                    <td>DOM階層に従う</td>
                    <td>ファイルスコープ</td>
                  </tr>
                  <tr>
                    <td>ダークモード切り替え</td>
                    <td>✅ 変数の再定義だけでOK</td>
                    <td>❌ 不可</td>
                  </tr>
                  <tr>
                    <td>カスケード・継承</td>
                    <td>✅ する</td>
                    <td>❌ しない</td>
                  </tr>
                  <tr>
                    <td>ブラウザ開発ツールで確認</td>
                    <td>✅ できる</td>
                    <td>❌ できない</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3.2 */}
          <section className="section" id="s32">
            <span className="sec-lbl">3.2</span>
            <h2>定義・参照・スコープ</h2>
            <p className="sec-sub">
              CSS変数は
              <strong style={{ color: "var(--txt-hi)" }}>DOMツリーの階層構造に従って継承</strong>
              されます。子要素は親の変数を参照でき、より近い祖先で定義された値が優先されます。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph TD
    ROOT[":root\n--color-primary: #6C47FF\n--font-size: 16px"] --> SECTION
    ROOT --> HEADER
    SECTION["section.alert\n--color-primary: #ef4444\n（ローカルで上書き）"] --> CARD
    HEADER["header\n（変数を継承）"] --> NAV
    CARD["div.card\nvar(--color-primary)\n→ #ef4444 を参照"]
    NAV["nav\nvar(--color-primary)\n→ #6C47FF を参照"]
    style ROOT fill:#2d4a6e,color:#93c5fd,stroke:#3b82f6
    style SECTION fill:#4a2d2d,color:#fca5a5,stroke:#ef4444
    style HEADER fill:#2d4a2d,color:#86efac,stroke:#22c55e
    style CARD fill:#3d2424,color:#fca5a5,stroke:#ef4444
    style NAV fill:#243d24,color:#86efac,stroke:#22c55e`
              } />
              <div className="diagram-caption">
                ▲ 変数のスコープはDOMツリーに従う。section内でローカル上書きすると子のみ影響を受ける
              </div>
            </div>

            <h3>スコープを意識した実装例</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s32_1 }} />
            </div>

            <div className="callout callout-tip">
              <span className="c-ico">✅</span>
              <div>
                <strong>ポイント：</strong>グローバルな値は <code>:root</code>{" "}
                に、コンポーネント固有の値はそのコンポーネントのセレクタに定義することで、スコープが明確になります。
              </div>
            </div>
          </section>

          {/* 3.3 */}
          <section className="section" id="s33">
            <span className="sec-lbl">3.3</span>
            <h2>トークンの階層設計</h2>
            <p className="sec-sub">
              プロダクション品質のシステムでは、デザイントークンを
              <strong style={{ color: "var(--txt-hi)" }}>
                3つの層（プリミティブ→セマンティック→コンポーネント）
              </strong>
              に分けて管理します。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph TD
    P["第1層：プリミティブトークン\n生の値を定義\n--purple-500: #6C47FF\n--gray-100: #f4f4f5\n--size-16: 16px"] --> S
    S["第2層：セマンティックトークン\n意味を持つ名前で参照\n--color-action-primary: var(--purple-500)\n--color-background: var(--gray-100)\n--spacing-md: var(--size-16)"] --> C
    C["第3層：コンポーネントトークン\nコンポーネント固有の変数\n--button-bg: var(--color-action-primary)\n--button-padding: var(--spacing-md)\n--card-bg: var(--color-background)"]
    style P fill:#1e2d3d,color:#93c5fd,stroke:#3b82f6
    style S fill:#2d1e3d,color:#c4b5fd,stroke:#8b5cf6
    style C fill:#1e3d2d,color:#86efac,stroke:#22c55e`
              } />
              <div className="diagram-caption">
                ▲ 3層トークン設計：生の値→意味→コンポーネント固有、と抽象化レベルが上がる
              </div>
            </div>

            <h3>第1層：プリミティブトークン（生の値）</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS — primitives.css</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s33_1 }} />
            </div>

            <h3>第2層：セマンティックトークン（意味を持つ名前）</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS — semantic.css</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s33_2 }} />
            </div>

            <h3>第3層：コンポーネントトークン（コンポーネント専用）</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS — components/button.css</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s33_3 }} />
            </div>

            <div className="callout callout-info">
              <span className="c-ico">ℹ️</span>
              <div>
                <strong>なぜ3層構造なのか：</strong>
                デザイントークンを3層に分けることで、将来的にプリミティブ（生の色）を変えても、セマンティック・コンポーネント層は変更不要。変更の影響を最小限に抑えられます。
              </div>
            </div>
          </section>

          {/* 3.4 */}
          <section className="section" id="s34">
            <span className="sec-lbl">3.4</span>
            <h2>JavaScriptとの連携</h2>
            <p className="sec-sub">
              CSS変数の最大の強みは
              <strong style={{ color: "var(--txt-hi)" }}>
                JavaScriptからリアルタイムに読み書きできる
              </strong>
              ことです。テーマ切り替えやアニメーション制御に活用できます。
            </p>

            <h3>基本的な読み書き</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s34_1 }} />
            </div>

            <h3>テーマ切り替え実装例</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s34_2 }} />
            </div>
          </section>

          {/* 3.5 */}
          <section className="section" id="s35">
            <span className="sec-lbl">3.5</span>
            <h2>CSSカスタムプロパティ — ベストプラクティス</h2>
            <p className="sec-sub">CSS変数を長期的に保守しやすくするための重要なルールを解説します。</p>

            <h3>✅ 命名は「カテゴリ-役割-修飾子」で統一する</h3>
            <div className="bp-grid">
              <div className="bp-box bp-ng">
                <div className="bp-head">❌ NG — 意味不明な名前</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s35_ng }} />
              </div>
              <div className="bp-box bp-ok">
                <div className="bp-head">✅ OK — カテゴリ-役割-修飾子</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s35_ok }} />
              </div>
            </div>

            <h3>✅ @property で型定義する（アニメーション対応）</h3>
            <div className="callout callout-info">
              <span className="c-ico">🧪</span>
              <div>
                <strong>CSS Houdini（@property）</strong>
                ：型を宣言することで、CSS変数をアニメーション対象にできます。Chrome 85+、Safari
                16.4+、Firefox 128+ で対応。
              </div>
            </div>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s35_2 }} />
            </div>

            <h3>✅ デザイントークンファイルを独立させて管理する</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">File Structure</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s35_3 }} />
            </div>
          </section>

          {/* ===================== CHAPTER 4 ===================== */}
          <div className="ch-hdr">
            <span className="ch-hdr-num">Chapter 4</span>
            <h2>カラーシステム</h2>
          </div>

          {/* 4.1 */}
          <section className="section" id="s41">
            <span className="sec-lbl">4.1</span>
            <h2>カラーシステムの目的</h2>
            <p className="sec-sub">
              カラーシステムとは、
              <strong style={{ color: "var(--txt-hi)" }}>
                プロダクト全体で一貫した色の使い方を保証する仕組み
              </strong>
              です。「なんとなく合う色」を選ぶのではなく、
              <em style={{ color: "var(--cyan)" }}>目的・意味・アクセシビリティ</em>
              に基づいて色を定義します。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph LR
    subgraph GOALS["カラーシステムの目標"]
        G1["一貫性\n同じ意味 = 同じ色"]
        G2["アクセシビリティ\n十分なコントラスト比"]
        G3["スケーラビリティ\nテーマ切り替えが容易"]
        G4["伝達力\n色が意味を持つ"]
    end
    style GOALS fill:#1e1e2e,stroke:#6C47FF,color:#cdd6f4
    style G1 fill:#2d4a6e,color:#93c5fd,stroke:#3b82f6
    style G2 fill:#1e4a2d,color:#86efac,stroke:#22c55e
    style G3 fill:#4a3d1e,color:#fcd34d,stroke:#f59e0b
    style G4 fill:#3d2a1e,color:#fb923c,stroke:#ea580c`
              } />
              <div className="diagram-caption">▲ カラーシステムが達成すべき4つの目標</div>
            </div>

            <div className="callout callout-info">
              <span className="c-ico">🎯</span>
              <div>
                <strong>カラーシステムがないと起こること：</strong>
                デザイナーとエンジニアが別の青を使う、ダークモード対応が困難、コントラスト不足でアクセシビリティ違反、変更時に修正箇所が散在する。
              </div>
            </div>
          </section>

          {/* 4.2 */}
          <section className="section" id="s42">
            <span className="sec-lbl">4.2</span>
            <h2>カラーパレットの構造</h2>
            <p className="sec-sub">
              各カラーを<strong style={{ color: "var(--txt-hi)" }}>50〜900の10段階スケール</strong>
              で定義します。数値が大きいほど暗くなり、システム全体で一貫した濃淡を使えます。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph LR
    C50["50\n最も淡い\n背景・ホバー"] --> C100["100"] --> C200["200"] --> C300["300"] --> C400["400"] --> C500["500\nベース\nメインUI"] --> C600["600\nホバー"] --> C700["700"] --> C800["800"] --> C900["900\n最も濃い\nテキスト"]
    style C50 fill:#f5f3ff,color:#4c1d95,stroke:#c4b5fd
    style C100 fill:#ede9fe,color:#4c1d95,stroke:#c4b5fd
    style C200 fill:#ddd6fe,color:#4c1d95,stroke:#a78bfa
    style C300 fill:#c4b5fd,color:#3b1e8c,stroke:#8b5cf6
    style C400 fill:#a78bfa,color:#fff,stroke:#7c3aed
    style C500 fill:#8b5cf6,color:#fff,stroke:#6d28d9
    style C600 fill:#7c3aed,color:#fff,stroke:#5b21b6
    style C700 fill:#6d28d9,color:#fff,stroke:#4c1d95
    style C800 fill:#5b21b6,color:#fff,stroke:#3b0f8c
    style C900 fill:#4c1d95,color:#ede9fe,stroke:#3b0f8c`
              } />
              <div className="diagram-caption">▲ パープルスケール 50〜900。50が最も淡く、900が最も濃い</div>
            </div>

            <h3>パープルスケールの実装例</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s42_1 }} />
            </div>

            <h3>カラーカテゴリ의 分類</h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>用途</th>
                    <th>代表例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--acc-hi)" }}>Brand</strong>
                    </td>
                    <td>ブランドの主色・アクセント</td>
                    <td>
                      <code>--purple-500</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--txt-hi)" }}>Neutral</strong>
                    </td>
                    <td>背景・テキスト・ボーダー</td>
                    <td>
                      <code>--gray-100〜900</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--grn)" }}>Semantic</strong>
                    </td>
                    <td>UI状態を表す色</td>
                    <td>danger / success / warning / info</td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--txt-md)" }}>Overlay</strong>
                    </td>
                    <td>モーダル背景・影</td>
                    <td>
                      <code>rgba(0,0,0,0.5)</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4.3 */}
          <section className="section" id="s43">
            <span className="sec-lbl">4.3</span>
            <h2>セマンティックカラートークン</h2>
            <p className="sec-sub">
              <strong style={{ color: "var(--txt-hi)" }}>
                「何色か（What）」ではなく「何のための色か（Why）」
              </strong>
              で命名します。セマンティックトークンがあれば、テーマ切り替え時にプリミティブの参照先を変えるだけです。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`flowchart TD
    subgraph PRIMITIVE["プリミティブ層（What — 何色か）"]
        PR1["--blue-500: #3b82f6"]
        PR2["--green-500: #22c55e"]
        PR3["--red-500: #ef4444"]
        PR4["--amber-500: #f59e0b"]
        PR5["--gray-100: #f4f4f5"]
        PR6["--gray-900: #18181b"]
    end
    subgraph SEMANTIC["セマンティック層（Why — 何のための色か）"]
        SE1["--color-info: var(--blue-500)"]
        SE2["--color-success: var(--green-500)"]
        SE3["--color-danger: var(--red-500)"]
        SE4["--color-warning: var(--amber-500)"]
        SE5["--color-bg-surface: var(--gray-100)"]
        SE6["--color-text-primary: var(--gray-900)"]
    end
    PR1 --> SE1
    PR2 --> SE2
    PR3 --> SE3
    PR4 --> SE4
    PR5 --> SE5
    PR6 --> SE6
    style PRIMITIVE fill:#1e1e2e,stroke:#45475a,color:#cdd6f4
    style SEMANTIC fill:#1e2d1e,stroke:#22c55e,color:#86efac`
              } />
              <div className="diagram-caption">▲ プリミティブ層（What）→ セマンティック層（Why）への変換</div>
            </div>

            <h3>セマンティックカラートークン完全定義例</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS — semantic-colors.css</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s43_1 }} />
            </div>
          </section>

          {/* 4.4 */}
          <section className="section" id="s44">
            <span className="sec-lbl">4.4</span>
            <h2>ダークモード対応</h2>
            <p className="sec-sub">
              CSS変数を使えば、ダークモードの切り替えは
              <strong style={{ color: "var(--txt-hi)" }}>
                セマンティックトークンの値を置き換えるだけ
              </strong>
              です。コンポーネントのコードは一切変更不要です。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`flowchart LR
    subgraph LIGHT["ライトモード"]
        L1["--color-bg-base\n#fafafa"]
        L2["--color-text-primary\n#18181b"]
        L3["--color-border-default\n#e4e4e7"]
    end
    subgraph DARK["ダークモード（data-theme=dark）"]
        D1["--color-bg-base\n#09090b"]
        D2["--color-text-primary\n#fafafa"]
        D3["--color-border-default\n#27272a"]
    end
    subgraph COMP["コンポーネント（変更一切不要）"]
        C1["background: var(--color-bg-base)"]
        C2["color: var(--color-text-primary)"]
        C3["border: 1px solid var(--color-border-default)"]
    end
    L1 & D1 --> C1
    L2 & D2 --> C2
    L3 & D3 --> C3
    style LIGHT fill:#f5f5f0,stroke:#d4d4aa,color:#18181b
    style DARK fill:#18181b,stroke:#3f3f46,color:#fafafa
    style COMP fill:#2d1e4a,stroke:#8b5cf6,color:#c4b5fd`
              } />
              <div className="diagram-caption">
                ▲ ライト・ダーク両方から同じコンポーネント変数を参照するアーキテクチャ
              </div>
            </div>

            <h3>2つのダークモード実装パターン</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s44_1 }} />
            </div>
          </section>

          {/* 4.5 */}
          <section className="section" id="s45">
            <span className="sec-lbl">4.5</span>
            <h2>アクセシビリティとコントラスト比</h2>
            <p className="sec-sub">
              <strong style={{ color: "var(--txt-hi)" }}>WCAG 2.1</strong>
              （Web Content Accessibility Guidelines）では、テキストの読みやすさを保証するためにコントラスト比の基準を定めています。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph LR
    C1["3:1 未満\n不合格（使用禁止）"] --> C2["3:1〜4.5:1\n大テキストのみ AA合格"] --> C3["4.5:1 以上\n通常テキスト AA合格"] --> C4["7:1 以上\nAAA合格（最高基準）"]
    style C1 fill:#4a1e1e,color:#fca5a5,stroke:#ef4444
    style C2 fill:#4a3d1e,color:#fcd34d,stroke:#f59e0b
    style C3 fill:#1e4a2d,color:#86efac,stroke:#22c55e
    style C4 fill:#1e2d4a,color:#93c5fd,stroke:#3b82f6`
              } />
              <div className="diagram-caption">▲ コントラスト比と合格基準の対応。3:1未満は使用禁止</div>
            </div>

            <h3>WCAG 2.1 コントラスト比基準</h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>基準レベル</th>
                    <th>通常テキスト（〜17px）</th>
                    <th>大きなテキスト（18pt以上/14pt太字以上）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--grn)" }}>AA（推奨最低基準）</strong>
                    </td>
                    <td>4.5:1 以上</td>
                    <td>3:1 以上</td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--cyan)" }}>AAA（理想基準）</strong>
                    </td>
                    <td>7:1 以上</td>
                    <td>4.5:1 以上</td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--red)" }}>不合格（使用禁止）</strong>
                    </td>
                    <td>3:1 未満</td>
                    <td>3:1 未満</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>コントラストを意識したカラー設計</h3>
            <div className="bp-grid">
              <div className="bp-box bp-ng">
                <div className="bp-head">❌ NG — コントラスト不足</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s45_ng }} />
              </div>
              <div className="bp-box bp-ok">
                <div className="bp-head">✅ OK — AAA基準を満たす</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s45_ok }} />
              </div>
            </div>

            <div className="callout callout-tip">
              <span className="c-ico">🔍</span>
              <div>
                <strong>確認ツール：</strong>
                <Ext href="https://webaim.org/resources/contrastchecker/">
                  WebAIM Contrast Checker
                </Ext>{" "}
                や
                <Ext href="https://www.whocanuse.com/">Who Can Use</Ext>{" "}
                でリアルタイムに確認できます。 Chrome DevToolsの「Inspect」パネルにもコントラスト比が表示されます。
              </div>
            </div>
          </section>

          {/* 4.6 */}
          <section className="section" id="s46">
            <span className="sec-lbl">4.6</span>
            <h2>カラーシステム — ベストプラクティス</h2>

            <h3>✅ セマンティックトークンはプリミティブを参照する</h3>
            <div className="bp-grid">
              <div className="bp-box bp-ng">
                <div className="bp-head">❌ NG — ハードコード</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s46_1_ng }} />
              </div>
              <div className="bp-box bp-ok">
                <div className="bp-head">✅ OK — プリミティブを参照</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s46_1_ok }} />
              </div>
            </div>

            <h3>✅ コンポーネントには必ずセマンティックカラーを使う</h3>
            <div className="bp-grid">
              <div className="bp-box bp-ng">
                <div className="bp-head">❌ NG — プリミティブを直接使う</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s46_2_ng }} />
              </div>
              <div className="bp-box bp-ok">
                <div className="bp-head">✅ OK — セマンティックを使う</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s46_2_ok }} />
              </div>
            </div>

            <h3>✅ カラー用途を5つに分類して設計する</h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>カテゴリ</th>
                    <th>代表トークン</th>
                    <th>用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <strong style={{ color: "var(--txt-hi)" }}>Background</strong>
                    </td>
                    <td>
                      <code>bg-base, bg-surface, bg-overlay</code>
                    </td>
                    <td>ページ・カード・オーバーレイ背景</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <strong style={{ color: "var(--txt-hi)" }}>Text</strong>
                    </td>
                    <td>
                      <code>text-primary, text-secondary, text-muted</code>
                    </td>
                    <td>本文・補助・ヒントテキスト</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <strong style={{ color: "var(--acc-hi)" }}>Action</strong>
                    </td>
                    <td>
                      <code>action-primary, action-secondary</code>
                    </td>
                    <td>ボタン・リンク・インタラクティブ要素</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <strong style={{ color: "var(--grn)" }}>Feedback</strong>
                    </td>
                    <td>
                      <code>danger, success, warning, info</code>
                    </td>
                    <td>アラート・バッジ・バリデーション</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>
                      <strong style={{ color: "var(--txt-hi)" }}>Border</strong>
                    </td>
                    <td>
                      <code>border-default, border-strong, border-focus</code>
                    </td>
                    <td>区切り線・入力枠・フォーカスリング</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ===================== CHAPTER 5 ===================== */}
          <div className="ch-hdr">
            <span className="ch-hdr-num">Chapter 5</span>
            <h2>タイポグラフィシステム</h2>
          </div>

          {/* 5.1 */}
          <section className="section" id="s51">
            <span className="sec-lbl">5.1</span>
            <h2>タイポグラフィの重要性</h2>
            <p className="sec-sub">
              ウェブサイトのコンテンツの
              <strong style={{ color: "var(--txt-hi)" }}>95%はタイポグラフィで構成されています</strong>
              （iA Inc. 調査）。タイポグラフィシステムは、読みやすさ・情報ヒエラルキー・ブランドの一貫性を同時に保証します。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph TD
    T["タイポグラフィシステムの要素"] --> A["タイプスケール\nサイズの段階"]
    T --> B["フォントファミリー\n書体の選択"]
    T --> C["フォントウェイト\n太さのレベル"]
    T --> D["行高 Line Height\n縦方向の余白"]
    T --> E["文字間隔 Letter Spacing\n横方向の余白"]
    T --> F["行長 Line Length\n1行の文字数"]
    style T fill:#6C47FF,color:#fff,stroke:none
    style A fill:#1e1e2e,color:#cdd6f4,stroke:#45475a
    style B fill:#1e1e2e,color:#cdd6f4,stroke:#45475a
    style C fill:#1e1e2e,color:#cdd6f4,stroke:#45475a
    style D fill:#1e1e2e,color:#cdd6f4,stroke:#45475a
    style E fill:#1e1e2e,color:#cdd6f4,stroke:#45475a
    style F fill:#1e1e2e,color:#cdd6f4,stroke:#45475a`
              } />
              <div className="diagram-caption">▲ タイポグラフィシステムを構成する6つの要素</div>
            </div>

            <div className="callout callout-info">
              <span className="c-ico">📖</span>
              <div>
                <strong>なぜタイポグラフィシステムが必要か：</strong>
                場当たり的なフォントサイズ指定では、ページごとに一貫性が失われます。スケールとルールを事前定義することで、どこでも同じ品質の読みやすさを実現できます。
              </div>
            </div>
          </section>

          {/* 5.2 */}
          <section className="section" id="s52">
            <span className="sec-lbl">5.2</span>
            <h2>タイプスケールの設計</h2>
            <p className="sec-sub">
              <strong style={{ color: "var(--txt-hi)" }}>モジュラースケール</strong>
              （等比数列）を使って、視覚的に調和したサイズ体系を作ります。全サイズが一定 of 比率で増加するため、統一感が生まれます。
            </p>

            <h3>Major Third（1.25倍）スケールの計算例</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">計算式</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s52_1 }} />
            </div>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph LR
    XS["xs\n0.64rem\n10px\n注釈"] --> SM["sm\n0.875rem\n14px\nラベル"] --> BASE["base\n1rem\n16px\n本文★"] --> LG["lg\n1.125rem\n18px\nリード"] --> XL["xl\n1.25rem\n20px\nh4"] --> XXL["2xl\n1.5rem\n24px\nh3"] --> XXXL["3xl\n1.875rem\n30px\nh2"] --> XXXXL["4xl\n2.25rem\n36px\nh1"]
    style XS fill:#1e1e2e,color:#71717a,stroke:#3f3f46
    style SM fill:#1e1e2e,color:#a1a1aa,stroke:#3f3f46
    style BASE fill:#2d3d2d,color:#86efac,stroke:#22c55e
    style LG fill:#2d3d2d,color:#86efac,stroke:#22c55e
    style XL fill:#2d2d4a,color:#c4b5fd,stroke:#8b5cf6
    style XXL fill:#2d2d4a,color:#c4b5fd,stroke:#8b5cf6
    style XXXL fill:#3d2d4a,color:#e9d5ff,stroke:#a855f7
    style XXXXL fill:#4a2d4a,color:#f5d0fe,stroke:#d946ef`
              } />
              <div className="diagram-caption">▲ タイプスケールの視覚化。xs から 4xl へと段階的に大きくなる</div>
            </div>

            <h3>タイプスケールのCSSトークン定義</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s52_2 }} />
            </div>
          </section>

          {/* 5.3 */}
          <section className="section" id="s53">
            <span className="sec-lbl">5.3</span>
            <h2>フォントファミリーとウェイト</h2>
            <p className="sec-sub">
              フォントの役割を明確に分けることで、
              <strong style={{ color: "var(--txt-hi)" }}>読みやすさとブランドの一貫性</strong>
              を両立します。
            </p>

            <h3>フォントファミリーの役割分担</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s53_1 }} />
            </div>

            <div className="callout callout-warn">
              <span className="c-ico">⚠️</span>
              <div>
                <strong>日本語フォントは必ずフォールバックを含める：</strong>
                英語フォント（Inter等）は日本語グリフを持たないため、日本語フォントを明示しないとOSデフォルトで表示されます。OSごとに異なるフォントになり、見た目が統一できません。
              </div>
            </div>

            <h3>フォントウェイト（太さ）の体系</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s53_2 }} />
            </div>
          </section>

          {/* 5.4 */}
          <section className="section" id="s54">
            <span className="sec-lbl">5.4</span>
            <h2>行高・文字間隔・行長</h2>
            <p className="sec-sub">
              フォントサイズと同様に、
              <strong style={{ color: "var(--txt-hi)" }}>行高・文字間隔・行長</strong>
              もトークン化することで、読みやすさを体系的に管理できます。
            </p>

            <h3>行高（Line Height）</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph LR
    subgraph LINE_HEIGHT["行高の使い分け"]
        LH1["tight: 1.25\n見出し・短いテキスト\n行間が詰まっている"]
        LH2["normal: 1.5\nUIコンポーネント\nボタン・ラベルなど"]
        LH3["relaxed: 1.7\n本文テキスト\n長文の読みやすさ重視"]
        LH4["loose: 2.0\n補足文・注釈\nゆったりした行間"]
    end
    style LH1 fill:#3d2a1e,color:#fb923c,stroke:#ea580c
    style LH2 fill:#2d3d2d,color:#86efac,stroke:#22c55e
    style LH3 fill:#2d4a6e,color:#93c5fd,stroke:#3b82f6
    style LH4 fill:#3d2d4a,color:#c4b5fd,stroke:#8b5cf6
    style LINE_HEIGHT fill:#1e1e2e,stroke:#45475a,color:#cdd6f4`
              } />
              <div className="diagram-caption">
                ▲ 行高の4段階。見出しは tight（1.25）、本文は relaxed（1.7）が基本
              </div>
            </div>

            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s54_1 }} />
            </div>

            <h3>文字間隔（Letter Spacing）と行長（Line Length）</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s54_2 }} />
            </div>
          </section>

          {/* 5.5 */}
          <section className="section" id="s55">
            <span className="sec-lbl">5.5</span>
            <h2>レスポンシブタイポグラフィ</h2>
            <p className="sec-sub">
              <code>clamp()</code> 関数を使うと、
              <strong style={{ color: "var(--txt-hi)" }}>
                画面幅に応じてなめらかにフォントサイズが変化
              </strong>
              するフルイドタイポグラフィを実現できます。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph LR
    subgraph FLUID["フルイドタイポグラフィ — clamp()"]
        S["320px\nモバイル\n最小サイズ適用"] --> M["768px\nタブレット\nサイズが線形補間"] --> L["1280px\nデスクトップ\n最大サイズ適用"]
    end
    style S fill:#3d2a1e,color:#fb923c,stroke:#ea580c
    style M fill:#2d4a6e,color:#93c5fd,stroke:#3b82f6
    style L fill:#1e4a2d,color:#86efac,stroke:#22c55e
    style FLUID fill:#1e1e2e,stroke:#45475a,color:#cdd6f4`
              } />
              <div className="diagram-caption">
                ▲ フルイドタイポグラフィ：320px〜1280pxの範囲で最小値〜最大値の間を線形補間
              </div>
            </div>

            <h3>clamp() の構文と使い方</h3>
            <div className="callout callout-info">
              <span className="c-ico">📐</span>
              <div>
                <strong>
                  <code>clamp(最小値, 推奨値, 最大値)</code>
                </strong>
                <br />
                推奨値はビューポート幅に依存する計算式。画面が狭ければ最小値、広ければ最大値で自動的にクランプされます。
              </div>
            </div>

            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s55_1 }} />
            </div>

            <div className="callout callout-tip">
              <span className="c-ico">🛠</span>
              <div>
                <strong>計算ツール：</strong>
                <Ext href="https://clamp.font-size.app/">clamp.font-size.app</Ext>{" "}
                でビューポートサイズと最小・最大フォントサイズを入力すると、<code>clamp()</code>{" "}
                の値を自動計算してくれます。
              </div>
            </div>
          </section>

          {/* 5.6 */}
          <section className="section" id="s56">
            <span className="sec-lbl">5.6</span>
            <h2>タイポグラフィ — ベストプラクティス</h2>

            <h3>✅ 見出しの階層を飛ばさない（SEO・アクセシビリティ）</h3>
            <div className="bp-grid">
              <div className="bp-box bp-ng">
                <div className="bp-head">❌ NG — h2 をスキップ</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s56_ng }} />
              </div>
              <div className="bp-box bp-ok">
                <div className="bp-head">✅ OK — 階層順に使う</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s56_ok }} />
              </div>
            </div>

            <h3>✅ px ではなく rem を使う</h3>
            <div className="bp-grid">
              <div className="bp-box bp-ng">
                <div className="bp-head">❌ NG — px 指定</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s56_2_ng }} />
              </div>
              <div className="bp-box bp-ok">
                <div className="bp-head">✅ OK — rem 指定</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s56_2_ok }} />
              </div>
            </div>

            <div className="callout callout-tip">
              <span className="c-ico">⚡</span>
              <div>
                <strong>
                  <code>font-display: swap</code>
                </strong>
                ：Webフォントの読み込み中はシステムフォントで表示し、読み込み完了後に切り替えます。
                <code>font-display: block</code>
                （デフォルト）はフォント読み込み中に文字が非表示になりCLSが悪化します。
              </div>
            </div>
          </section>

          {/* ===================== CHAPTER 6 ===================== */}
          <div className="ch-hdr">
            <span className="ch-hdr-num">Chapter 6</span>
            <h2>スペーシング・サイジングシステム</h2>
          </div>

          {/* 6.1 */}
          <section className="section" id="s61">
            <span className="sec-lbl">6.1</span>
            <h2>スペーシングシステムの目的</h2>
            <p className="sec-sub">
              <strong style={{ color: "var(--txt-hi)" }}>
                余白・サイズを一定のルールに従って統一する仕組み
              </strong>
              です。「なんとなく16pxにした」ではなく、
              <em style={{ color: "var(--cyan)" }}>すべての余白が理由を持つ</em>
              状態を目指します。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph LR
    subgraph BEFORE["スペーシングシステムなし"]
        B1["margin: 13px\n（なぜ13px？）"]
        B2["padding: 17px\n（なぜ17px？）"]
        B3["gap: 11px\n（なぜ11px？）"]
    end
    subgraph AFTER["スペーシングシステムあり"]
        A1["margin: var(--space-3)\n= 12px（4×3）"]
        A2["padding: var(--space-4)\n= 16px（4×4）"]
        A3["gap: var(--space-3)\n= 12px（4×3）"]
    end
    style BEFORE fill:#4a1e1e,stroke:#ef4444,color:#fca5a5
    style AFTER fill:#1e4a2d,stroke:#22c55e,color:#86efac`
              } />
              <div className="diagram-caption">
                ▲ スペーシングシステムなし vs あり。マジックナンバーをトークンで置き換える
              </div>
            </div>

            <div className="callout callout-warn">
              <span className="c-ico">⚠️</span>
              <div>
                <strong>マジックナンバーの問題：</strong>
                <code>margin: 13px</code> や <code>padding: 17px</code>{" "}
                のような根拠不明な数値が積み重なると、デザインの一貫性が失われ、変更のたびに全体を見直す必要が生じます。
              </div>
            </div>
          </section>

          {/* 6.2 */}
          <section className="section" id="s62">
            <span className="sec-lbl">6.2</span>
            <h2>ベースグリッドと数列</h2>
            <p className="sec-sub">
              ほとんどのデザインシステムは
              <strong style={{ color: "var(--txt-hi)" }}>4px を基準単位</strong>
              として採用しています。デバイスのピクセル密度（1x / 2x / 3x）でキレイに割り切れるためです。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph LR
    U["4px\n基準単位"] --> T2["8px\n×2"] --> T3["12px\n×3"] --> T4["16px\n×4\n★頻出"] --> T6["24px\n×6"] --> T8["32px\n×8"] --> T12["48px\n×12"] --> T16["64px\n×16"]
    style U fill:#6C47FF,color:#fff,stroke:none
    style T2 fill:#2d3d2d,color:#86efac,stroke:#22c55e
    style T3 fill:#2d3d2d,color:#86efac,stroke:#22c55e
    style T4 fill:#2d4a6e,color:#93c5fd,stroke:#3b82f6
    style T6 fill:#2d4a6e,color:#93c5fd,stroke:#3b82f6
    style T8 fill:#3d2d4a,color:#c4b5fd,stroke:#8b5cf6
    style T12 fill:#3d2d4a,color:#c4b5fd,stroke:#8b5cf6
    style T16 fill:#4a2d2d,color:#fca5a5,stroke:#ef4444`
              } />
              <div className="diagram-caption">
                ▲ 4pxを基準に倍数で展開するスペーシングスケール（Material Design 等の業界標準）
              </div>
            </div>

            <h3>なぜ 4px なのか</h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>理由</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--txt-hi)" }}>デバイス解像度との相性</strong>
                    </td>
                    <td>
                      4px は 1x / 2x / 3x すべての画面密度で割り切れ、サブピクセルレンダリングの問題が起きない
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--txt-hi)" }}>視覚的な調和</strong>
                    </td>
                    <td>4の倍数（8, 16, 24, 32…）は黄金比に近く、自然に調和したレイアウトになる</td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--txt-hi)" }}>業界標準</strong>
                    </td>
                    <td>Material Design・Tailwind CSS・Figma などの主要ツールが採用</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6.3 */}
          <section className="section" id="s63">
            <span className="sec-lbl">6.3</span>
            <h2>スペーシングトークンの設計</h2>
            <p className="sec-sub">
              プリミティブトークン（生の4px刻みの値）と、セマンティックトークン（用途別の名前）の2層で管理します。
            </p>

            <h3>プリミティブスペーシングトークン</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS — spacing-primitives.css</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s63_1 }} />
            </div>

            <h3>セマンティックスペーシングトークン</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS — spacing-semantic.css</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s63_2 }} />
            </div>
          </section>

          {/* 6.4 */}
          <section className="section" id="s64">
            <span className="sec-lbl">6.4</span>
            <h2>コンポーネントサイジング</h2>
            <p className="sec-sub">
              ボタン・入力フォームなどのインタラクティブ要素は
              <strong style={{ color: "var(--txt-hi)" }}>統一された高さスケール</strong>
              を持つことで、UIの整合性が保たれます。
            </p>

            <h3>高さスケール（コンポーネント用）</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph LR
    XS["xs: 24px\nチップ・タグ"] --> SM["sm: 32px\n小ボタン"] --> MD["md: 40px\n標準ボタン★\n（推奨）"] --> LG["lg: 48px\n大ボタン"] --> XL["xl: 56px\n特大ボタン"]
    style XS fill:#1e1e2e,color:#71717a,stroke:#3f3f46
    style SM fill:#1e2d3d,color:#93c5fd,stroke:#3b82f6
    style MD fill:#1e4a2d,color:#86efac,stroke:#22c55e
    style LG fill:#3d2a1e,color:#fb923c,stroke:#ea580c
    style XL fill:#4a1e4a,color:#e9d5ff,stroke:#a855f7`
              } />
              <div className="diagram-caption">▲ 5段階のコンポーネント高さスケール。md（40px）が標準</div>
            </div>

            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s64_1 }} />
            </div>

            <h3>コンテナ幅スケール</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s64_2 }} />
            </div>
          </section>

          {/* 6.5 */}
          <section className="section" id="s65">
            <span className="sec-lbl">6.5</span>
            <h2>スペーシングの適用パターン</h2>
            <p className="sec-sub">
              <strong style={{ color: "var(--txt-hi)" }}>近接の原則</strong>
              に従い、関連性の強い要素を近く、弱い要素を遠く配置することで、視覚的なグルーピングを実現します。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph TD
    subgraph PROXIMITY["近接の原則 — スペースで関連性を表現する"]
        G1["関連が強い\n→ --space-1〜--space-2（4〜8px）\n例：ラベルと入力フォーム、見出しと本文"]
        G2["関連が中程度\n→ --space-4〜--space-6（16〜24px）\n例：フォームフィールド間、リストアイテム間"]
        G3["関連が弱い\n→ --space-12〜--space-16（48〜64px）\n例：セクションとセクション、独立したブロック間"]
    end
    style G1 fill:#1e4a2d,color:#86efac,stroke:#22c55e
    style G2 fill:#2d4a6e,color:#93c5fd,stroke:#3b82f6
    style G3 fill:#4a1e4a,color:#e9d5ff,stroke:#a855f7
    style PROXIMITY fill:#1e1e2e,stroke:#45475a,color:#cdd6f4`
              } />
              <div className="diagram-caption">
                ▲ 近接の原則：関連が強い→小スペース、中程度→中スペース、弱い→大スペース
              </div>
            </div>

            <h3>近接の原則をCSSで実装する</h3>
            <div className="code-wrap">
              <div className="code-hdr">
                <div className="code-dots">
                  <span className="dot dot-r" />
                  <span className="dot dot-y" />
                  <span className="dot dot-g" />
                </div>
                <span className="code-lang">CSS</span>
              </div>
              <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s65_1 }} />
            </div>

            <h3>padding と gap の使い分け</h3>
            <div className="bp-grid">
              <div className="bp-box bp-ng">
                <div className="bp-head">❌ NG — margin で間隔指定</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s65_ng }} />
              </div>
              <div className="bp-box bp-ok">
                <div className="bp-head">✅ OK — 親要素の gap で管理</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s65_ok }} />
              </div>
            </div>
          </section>

          {/* 6.6 */}
          <section className="section" id="s66">
            <span className="sec-lbl">6.6</span>
            <h2>スペーシング — ベストプラクティス</h2>

            <h3>✅ マジックナンバーを排除し、必ずトークンを使う</h3>
            <div className="bp-grid">
              <div className="bp-box bp-ng">
                <div className="bp-head">❌ NG — 根拠のない数値</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s66_ng }} />
              </div>
              <div className="bp-box bp-ok">
                <div className="bp-head">✅ OK — トークン（4px刻み）</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s66_ok }} />
              </div>
            </div>

            <h3>✅ スペースを「意味」で選ぶ早見表</h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>用途</th>
                    <th>推奨トークン範囲</th>
                    <th>実際の値</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>コンポーネント内の密接な関係</td>
                    <td>
                      <code>--space-1〜--space-2</code>
                    </td>
                    <td>4px〜8px</td>
                  </tr>
                  <tr>
                    <td>コンポーネント内の標準的な間隔</td>
                    <td>
                      <code>--space-3〜--space-4</code>
                    </td>
                    <td>12px〜16px</td>
                  </tr>
                  <tr>
                    <td>コンポーネント間の余白</td>
                    <td>
                      <code>--space-6〜--space-8</code>
                    </td>
                    <td>24px〜32px</td>
                  </tr>
                  <tr>
                    <td>セクション間の余白</td>
                    <td>
                      <code>--space-12〜--space-16</code>
                    </td>
                    <td>48px〜64px</td>
                  </tr>
                  <tr>
                    <td>ページレベルの大きな余白</td>
                    <td>
                      <code>--space-20〜--space-24</code>
                    </td>
                    <td>80px〜96px</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>✅ padding は論理プロパティで指定する（RTL対応）</h3>
            <div className="bp-grid">
              <div className="bp-box bp-ng">
                <div className="bp-head">❌ NG — 4値でバラバラ</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s66_2_ng }} />
              </div>
              <div className="bp-box bp-ok">
                <div className="bp-head">✅ OK — 論理プロパティ</div>
                <pre className="cd" dangerouslySetInnerHTML={{ __html: CODES.s66_2_ok }} />
              </div>
            </div>
          </section>

          {/* ===================== SUMMARY ===================== */}
          <div className="ch-hdr">
            <span className="ch-hdr-num">まとめ</span>
            <h2>4システムの関係性</h2>
          </div>

          <section className="section" id="summary">
            <span className="sec-lbl">Summary</span>
            <h2>CSSデザインシステム — 全体像</h2>
            <p className="sec-sub">
              4つのシステムは独立して存在するのではなく、
              <strong style={{ color: "var(--txt-hi)" }}>
                CSSカスタムプロパティという基盤の上に積み重なって
              </strong>
              デザインシステムを構成します。
            </p>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={
`graph TD
    CSS["CSSカスタムプロパティシステム\n基盤インフラ\n変数定義・スコープ・テーマ切り替えの仕組み"] --> COLOR
    CSS --> TYPE
    CSS --> SPACE
    COLOR["カラーシステム\nプリミティブ→セマンティック→コンポーネント\nアクセシビリティ・ダークモード対応"]
    TYPE["タイポグラフィシステム\nタイプスケール・フォント・行高・行長\nフルイドタイポグラフィ"]
    SPACE["スペーシング・サイジングシステム\n4pxグリッド・トークン階層・近接の原則\nコンポーネント高さ・コンテナ幅"]
    COLOR --> DS["デザインシステム\n一貫した・アクセシブルな\n保守しやすい UI"]
    TYPE --> DS
    SPACE --> DS
    style CSS fill:#6C47FF,color:#fff,stroke:none
    style COLOR fill:#2d4a6e,color:#93c5fd,stroke:#3b82f6
    style TYPE fill:#2d3d2d,color:#86efac,stroke:#22c55e
    style SPACE fill:#3d2a1e,color:#fb923c,stroke:#ea580c
    style DS fill:#1e1e2e,color:#cdd6f4,stroke:#6C47FF`
              } />
              <div className="diagram-caption">
                ▲ 4システムの依存関係。CSS変数が基盤となり、3システムがその上に構築される
              </div>
            </div>

            <h3>構築のロードマップ</h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ステップ</th>
                    <th>作業内容</th>
                    <th>ファイル</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--acc-hi)" }}>Step 1</strong>
                    </td>
                    <td>プリミティブカラートークンを定義</td>
                    <td>
                      <code>tokens/primitives.css</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--acc-hi)" }}>Step 2</strong>
                    </td>
                    <td>セマンティックカラー・スペーシングトークンを定義</td>
                    <td>
                      <code>tokens/semantic.css</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--acc-hi)" }}>Step 3</strong>
                    </td>
                    <td>タイプスケール・フォントファミリートークンを定義</td>
                    <td>
                      <code>tokens/typography.css</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--acc-hi)" }}>Step 4</strong>
                    </td>
                    <td>ダークモードのセマンティックトークンを定義</td>
                    <td>
                      <code>tokens/themes/dark.css</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ color: "var(--acc-hi)" }}>Step 5</strong>
                    </td>
                    <td>コンポーネントトークンを定義してUIを構築</td>
                    <td>
                      <code>components/*.css</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ===================== REFERENCES ===================== */}
          <div className="ch-hdr">
            <span className="ch-hdr-num">参考リソース</span>
            <h2>学習に役立つ公式ドキュメント</h2>
          </div>

          <section className="section" id="refs">
            <h3>CSSカスタムプロパティ</h3>
            <div className="ref-grid">
              <Ext
                className="ref-card"
                href="https://developer.mozilla.org/ja/docs/Web/CSS/Using_CSS_custom_properties"
              >
                <div className="rc-cat">MDN Web Docs</div>
                <div className="rc-ttl">CSS カスタムプロパティの使用</div>
                <div className="rc-url">
                  developer.mozilla.org/ja/docs/Web/CSS/Using_CSS_custom_properties
                </div>
              </Ext>
              <Ext className="ref-card" href="https://developer.mozilla.org/en-US/docs/Web/CSS/@property">
                <div className="rc-cat">MDN Web Docs</div>
                <div className="rc-ttl">@property — CSS Houdini 型定義</div>
                <div className="rc-url">developer.mozilla.org/en-US/docs/Web/CSS/@property</div>
              </Ext>
              <Ext className="ref-card" href="https://css-tricks.com/a-complete-guide-to-custom-properties/">
                <div className="rc-cat">CSS-Tricks</div>
                <div className="rc-ttl">A Complete Guide to Custom Properties</div>
                <div className="rc-url">css-tricks.com/a-complete-guide-to-custom-properties</div>
              </Ext>
              <Ext className="ref-card" href="https://www.w3.org/TR/css-variables-1/">
                <div className="rc-cat">W3C Specification</div>
                <div className="rc-ttl">CSS Custom Properties for Cascading Variables</div>
                <div className="rc-url">w3.org/TR/css-variables-1</div>
              </Ext>
            </div>

            <h3>カラーシステム</h3>
            <div className="ref-grid">
              <Ext className="ref-card" href="https://m3.material.io/styles/color/overview">
                <div className="rc-cat">Google / Material Design</div>
                <div className="rc-ttl">Material Design 3 — Color System</div>
                <div className="rc-url">m3.material.io/styles/color/overview</div>
              </Ext>
              <Ext className="ref-card" href="https://www.radix-ui.com/colors">
                <div className="rc-cat">Radix UI</div>
                <div className="rc-ttl">Radix Colors — アクセシブルなカラーパレット</div>
                <div className="rc-url">radix-ui.com/colors</div>
              </Ext>
              <Ext className="ref-card" href="https://webaim.org/resources/contrastchecker/">
                <div className="rc-cat">WebAIM</div>
                <div className="rc-ttl">Contrast Checker — WCAG コントラスト確認ツール</div>
                <div className="rc-url">webaim.org/resources/contrastchecker</div>
              </Ext>
              <Ext
                className="ref-card"
                href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
              >
                <div className="rc-cat">W3C / WCAG 2.1</div>
                <div className="rc-ttl">Success Criterion 1.4.3 — Contrast (Minimum)</div>
                <div className="rc-url">w3.org/WAI/WCAG21/Understanding/contrast-minimum</div>
              </Ext>
            </div>

            <h3>タイポグラフィシステム</h3>
            <div className="ref-grid">
              <Ext className="ref-card" href="https://www.modularscale.com/">
                <div className="rc-cat">Tool</div>
                <div className="rc-ttl">Modular Scale — タイプスケール計算ツール</div>
                <div className="rc-url">modularscale.com</div>
              </Ext>
              <Ext className="ref-card" href="https://developer.mozilla.org/ja/docs/Web/CSS/clamp">
                <div className="rc-cat">MDN Web Docs</div>
                <div className="rc-ttl">clamp() — フルイドタイポグラフィ関数</div>
                <div className="rc-url">developer.mozilla.org/ja/docs/Web/CSS/clamp</div>
              </Ext>
              <Ext className="ref-card" href="https://fonts.google.com/knowledge">
                <div className="rc-cat">Google Fonts</div>
                <div className="rc-ttl">Google Fonts Knowledge — タイポグラフィ学習</div>
                <div className="rc-url">fonts.google.com/knowledge</div>
              </Ext>
              <Ext className="ref-card" href="https://ia.net/topics/the-web-is-all-about-typography-period">
                <div className="rc-cat">iA Inc.</div>
                <div className="rc-ttl">The Web Is All About Typography, Period</div>
                <div className="rc-url">ia.net/topics/the-web-is-all-about-typography-period</div>
              </Ext>
            </div>

            <h3>スペーシング・サイジング</h3>
            <div className="ref-grid">
              <Ext
                className="ref-card"
                href="https://m3.material.io/foundations/layout/understanding-layout/spacing"
              >
                <div className="rc-cat">Google / Material Design</div>
                <div className="rc-ttl">Material Design 3 — Spacing</div>
                <div className="rc-url">
                  m3.material.io/foundations/layout/understanding-layout/spacing
                </div>
              </Ext>
              <Ext className="ref-card" href="https://spec.fm/specifics/8-pt-grid">
                <div className="rc-cat">Spec</div>
                <div className="rc-ttl">8-Point Grid System — スペーシングの原則</div>
                <div className="rc-url">spec.fm/specifics/8-pt-grid</div>
              </Ext>
              <Ext className="ref-card" href="https://styledictionary.com/">
                <div className="rc-cat">Amazon / Style Dictionary</div>
                <div className="rc-ttl">Style Dictionary — デザイントークン管理ツール</div>
                <div className="rc-url">styledictionary.com</div>
              </Ext>
              <Ext className="ref-card" href="https://www.w3.org/community/design-tokens/">
                <div className="rc-cat">W3C Community Group</div>
                <div className="rc-ttl">Design Tokens Community Group</div>
                <div className="rc-url">w3.org/community/design-tokens</div>
              </Ext>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
