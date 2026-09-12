---
name: fix-mermaid
description: >
  Fix Mermaid syntax, rendering, clipping, readability, and sizing problems in HTML,
  Markdown, React, and TSX. Use when diagrams fail to render, Mermaid reports a syntax
  or version error, labels are clipped or unreadable, diagrams are too large or small,
  different diagram types need individual sizing, or SVG/card layout is unbalanced.
allowed-tools:
  - Read
  - Edit
  - Grep
  - Bash
---

# Mermaid 構文・描画修正スキル

(最終更新日: 2026-09-09)

## 全体像: 図ソース → 描画パイプライン → SVG 後処理

修正がどの層の問題かを最初に切り分ける。**構文エラーは図ソース層、サイズ・見切れ・文字色は SVG 後処理層**で直す。層を取り違えた修正（例: 見切れを DSL の書き換えで直そうとする）は再発する。

```mermaid
flowchart TD
Src["図ソース: DIAGRAMS オブジェクト - md の mermaid フェンス - chart prop"] --> Norm["正規化: カラム0 - 1行1ステートメント - 全角文字置換"]
Norm --> Init["mermaid.initialize: theme - themeVariables - fontSize"]
Init --> Run["mermaid.run で SVG 生成"]
Run --> Fix["applySvgFixups: ライブ DOM 操作"]
Fix --> W["width と height 属性を除去し style.width に自然px, maxWidth 100%"]
Fix --> V["viewBox 高さ拡張: sequence と state は +110, その他は +15"]
Fix --> O["overflow visible: foreignObject の右端切れ対策"]
W --> CSS["globals.css の .mbox スコープ: 採寸値と実描画の font-size を一致"]
V --> CSS
O --> CSS
CSS --> Out["表示"]
Norm -.構文エラーはここへ戻る.-> Src
Fix -.サイズ・見切れはここで直す.-> Run
```

| 層 | 典型的な症状 | 直す場所 |
|---|---|---|
| 図ソース | Syntax Error・図が出ない | `fix_mermaid.ts` / 全角文字置換 |
| 描画パイプライン | 全図が未描画・二重描画 | `apply_render_pipeline.ts` / `initialize` |
| SVG 後処理 | 見切れ・異常拡大・文字色 | `applySvgFixups` / `.mbox` CSS |

## 前提バージョンと正準実装（推測禁止）

| 項目 | 確定値 |
|---|---|
| Mermaid | **`mermaid@10.9.8`**（`web-next/package.json` の dependencies） |
| React 共通コンポーネント | `web-next/components/MermaidDiagram.tsx` — **default エクスポート** `export default MermaidDiagram` |
| `mermaid.initialize` | `useEffect` 内、`import("mermaid")` の `.then()` 内で実行（モジュール最上位ではない） |
| テスト環境 | Vitest / jsdom。`MermaidDiagram` は**必ずモックする** |

> 以降の「Mermaid v10 の必須ルール」は **v11 でも有効な基本構文ルール**である（カラム0・1行1ステートメント等）。
> v10 固有の記述であることを理由に読み飛ばさないこと。

## 🚀 まず再利用スクリプトを使う（トークン節約・最優先）

静的 HTML の Mermaid 描画崩れを直すときは、**ボイラープレート（render ループ・SVG 後処理・中央寄せ CSS）を手書きで再生成しないこと**。以下の再利用スクリプトで機械的処理を一括適用できる。

1. **図ソースを JSON 互換の正準オブジェクトで定義**（LLM の判断が必要なのはここだけ）:
   各図を 1 ステートメント 1 行・カラム 0・改行は `\n` または `<br/>` とし、`const DIAGRAMS = { "diag-1": "flowchart TD\nA --> B" };` の形式で HTML の `<script>` 内に書く。

2. **描画パイプラインを冪等適用**:

   ```bash
   bun run .claude/skills/fix-mermaid/scripts/apply_render_pipeline.ts <file.html>
   ```

   これが `<div class="mermaid">…</div>` → 連番 id 付き空 div への置換、`startOnLoad:false`+`securityLevel:'loose'` 付与、`applySvgFixups`+render ループ注入、中央寄せ CSS 注入をまとめて行う（再実行しても二重適用しない）。

3. **正本 Markdown から図を復元する場合**（HTML 側ソースが破壊された等）:

   ```bash
   bun run .claude/skills/fix-mermaid/scripts/restore_diagrams.ts <file.html> <source.md>
   ```

4. **インデント汚染・行分断のみの修正**（`.html`/`.md`/`.tsx`）は `fix_mermaid.ts`:

   ```bash
   bun run .claude/skills/fix-mermaid/scripts/fix_mermaid.ts <file>
   ```

> **SVG 幅の鉄則**: `apply_render_pipeline.ts` は SVG 幅に **viewBox 由来の自然 px 幅 + `maxWidth:100%`** を使う。`width:'100%'` も `width:'auto'`（viewBox のみで intrinsic サイズを持たない SVG ではコンテナ全幅へ伸びる）も、小さい flowchart LR 図を異常拡大させるため**使わない**。

## 対象

- `.html` ファイル内の `<div class="mermaid">` ブロック
- `.md` ファイル内の ` ```mermaid ` ブロック
- `.tsx` / `.ts` / `.jsx` / `.js` ファイル内の `chart={`...`}` などのテンプレートリテラル内の Mermaid 構文

## Mermaid v10 の必須ルール

1. コンテンツは**カラム0配置**（先頭空白なし）
2. 各ステートメントは**改行で分離**（1行に複数連結しない）
3. ノードラベル `A["text"]` の内容は**1行に収める**
4. `mindmap` のみ例外 — 内部インデントは階層構造を表すため保持する
5. `block-beta` は**使用禁止** — v10.9.5 でページ全体のクラッシュを起こした実績があり、現行 v11 でも安全性を検証していない。`graph TD` で代替する

## よくある原因

HTMLやコードのフォーマッタ（Prettier等）による破壊パターン:

- 14スペース等のHTML/コードインデントがMermaidコンテンツに混入する
- 長いノードラベルが行分断される（`A["テキスト` と `続き"]` に分かれる）
- 複数ステートメントが1行に連結される（`graph TD A["x"] B["y"] A --> B`）

## 修正手順

1. **全文検索**で修正対象ファイルを絞り込み、Mermaid ブロックを把握する
2. **ファイル読取**で各ブロックを確認し、上記ルール違反を特定する
3. **差分編集**または自動修正スクリプトで各ブロックの内容を修正する

```bash
bun run .claude/skills/fix-mermaid/scripts/fix_mermaid.ts path/to/file.tsx
```

## ダイアグラム別の注意点

| 種別 | 注意点 |
| ------ | -------- |
| `graph` / `flowchart` | 最頻出。カラム0ルールを厳守 |
| `sequenceDiagram` | `Note over A,B:` は1行に収める |
| `mindmap` | 内部インデント保持（唯一の例外） |
| `block-beta` | **使用禁止**（全体クラッシュ） |
| `htmlLabels: true` 環境 | `<` → `&lt;`、`>` → `&gt;` に変換 |

## 実地検証済み：ブラウザレンダラー固有の問題（2026年3月）

### IDEフォーマッター（Prettier）による破壊が根本原因

`<div class="mermaid">` に Mermaid ソースを直接書くと、VSCode/Prettier が保存のたびにインデントを付加して構文を壊す。**恒久対策は前述の JSON 互換 `DIAGRAMS` オブジェクト（改行は `\n`）への移管**（「まず再利用スクリプトを使う」手順1と同形式）。テンプレートリテラルは実改行がフォーマッタの再インデント対象になるため使わない。

### ブラウザレンダラーで Syntax Error を起こす文字・構文

| 箇所 | 問題のある記述 | 対処 |
| ------ | --------------- | ------ |
| `subgraph` ラベル | 丸括弧 `()` を含む | 削除または別表現に置換 |
| `subgraph` ラベル | 絵文字（`🌐` `🖥️` 等） | 削除 |
| `participant ... as` | 絵文字（`👤` `⚡` 等） | 削除 |
| ノードラベル `["..."]` | 全角波ダッシュ `〜` | `から` 等の日本語に置換 |
| ノードラベル `["..."]` | スラッシュ `path/to` | `-` またはスペースに置換 |
| 菱形ノード `{}` | クォートなし日本語 | クォートを追加する |
| 全ての図解 (全般) | 全角丸括弧 `（）` | 半角丸括弧 `( )` に置換する |
| 全ての図解 (全般) | 全角ダッシュ `―` | 半角ハイフン `-` に置換する |
| 全ての図解 (全般) | 全角コロン `：` | 半角コロン `:` に置換する |

#### 全角文字の一括置換手順

**`fix_mermaid.ts` はこの置換を行わない。** 同スクリプトが直すのはインデント汚染と行分断だけ。

1. **検出**: `grep -rn '[（）〜―：]' <対象ファイル>`
2. **置換**: ヒットした箇所を、**Mermaid ブロック内のものに限って**1件ずつ編集する。本文・表・見出しの全角文字は変更してはならない。
3. **再検証**: 手順1のコマンドを再実行し、残ったヒットがすべて Mermaid ブロック外であることを確認する。

### SVG サイズ制御

Mermaid v10/v11 は SVG 要素に絶対ピクセル値の `width`/`height` 属性を付与する。`mermaid.run()` 後に必ず除去する。

```js
svgEl.removeAttribute('width');
svgEl.removeAttribute('height');
svgEl.style.width    = `${w}px`;   // 自然 px 幅
svgEl.style.maxWidth = '100%';
svgEl.style.height   = 'auto';
```

### シーケンス図・状態遷移図等の下部見切れ（クリッピング）対策（2026年6月追記）

Mermaid v10/v11 のシーケンス図（`sequenceDiagram`）や状態遷移図（`stateDiagram`）には SVG の `viewBox` 高さが不足するバグがある。描画後に高さを拡張する:

```javascript
const extraHeight = isSequenceOrState ? 110 : 15;
svgEl.setAttribute('viewBox', `${x} ${y} ${w} ${h + extraHeight}`);
```

### `quadrantChart` の文字被り対策（2026年6月追記）

```javascript
mermaid.initialize({
    quadrantChart: { chartWidth: 800, chartHeight: 600, pointRadius: 8, pointLabelFontSize: 14 }
});
```

図ごとの `maxWidth` インラインスタイルは指定しない。必要な表示調整は Mermaid DSL の `chartWidth`、`chartHeight`、`nodeSpacing`、`rankSpacing` などで行う。

### HTML での Mermaid 図解の中央寄せ Flexbox スタイル（2026年6月追記）

```css
.mermaid-wrap {
    display: flex;
    justify-content: safe center; /* 親幅を超える場合は flex-start（左詰め）として扱い左見切れを防ぐ */
    overflow-x: auto;
    width: 100%;
    margin: 1.5rem auto 2rem;
}
.mermaid {
    display: flex;
    justify-content: safe center;
    width: 100%;
}
.mermaid svg {
    display: block;
    margin: 0 auto;
    max-width: 100% !important;
    height: auto !important;
}
```

### React/Next.js (globals.css) 移植時の表示（2026年5月追記）

このリポジトリは CSS Modules を使わず `globals.css` のページスコープクラスでスタイルを管理する。

#### ⚠️ サイズ調整は図ごとに行い、文字の実効サイズを変えない

**禁止事項**:

- 異なる図種へ同じ `minWidth` / `maxHeight` を一括適用しない
- `%%{init: {"themeVariables": {"fontSize": "Xpx"}}}%%` で図ごとにフォントサイズを変えない — 採寸値と CSS の実描画値が乖離し、ノード枠からはみ出す
- `width:'100%'` を SVG に直接適用しない（小さい図が全幅へ異常拡大する）
- 縦長図へ `max-height` を付けない（横幅と文字まで縮小する）
- 1ページの問題を直すために共通コンポーネントの既定動作を変更しない

**個別対応の正準手順**:

1. 共通コンポーネントの `preserveNaturalScale` prop を `true` にして viewBox 由来の自然幅で表示する。
2. `.mbox` はコンテンツ領域の全幅を使い、ページ側でインライン `maxWidth` を指定しない。

```tsx
// page.tsx での正準使用例
<div className="mbox">
  <MermaidDiagram chart={DIAGRAM_LEVELS} preserveNaturalScale={true} />
</div>
```

#### ⚠️ スクロール時の図解縮小バグの防止（React.memo メモ化）

`IntersectionObserver` による親コンポーネントの再レンダリングで `style.width` がリセットされ、図が豆粒に縮小する不具合が発生する。**`MermaidDiagram` を必ず `React.memo` でラップする**（`web-next/components/MermaidDiagram.tsx` では実装済み）。

#### テスト環境（Vitest）での MermaidDiagram のモック化

**このリポジトリでの正準モック（`default` エクスポートをモックする）:**

```typescript
vi.mock("@/components/MermaidDiagram", () => ({
  default: function DummyMermaidDiagram({ chart }: { chart: string }) {
    return <pre data-testid="mermaid-diagram">{chart}</pre>;
  },
}));
```

`data-testid` は **`mermaid-diagram`** に統一すること。

## Mermaid 10.9.8 + React 共通コンポーネントの可読性・文字切れ・文字色対策（2026年6月追記）

### 症状と根本原因の対応表

| 症状 | 根本原因 | 対策 |
| ------ | --------- | ------ |
| 文字が低コントラストで読みづらい | `theme:'base'` が明色背景を算出 | `theme:'dark'` + ソリッド濃色の `themeVariables` を明示 |
| ノード内の文字が下端で切れる | SVG `viewBox` 下端が見切れる | 描画後に `viewBox` の高さを拡張 + `overflow:visible` |
| ノード文字が**右端**で切れる（emoji を含む図のみ） | `<foreignObject>` は `overflow:hidden` がデフォルト | CSS で `foreignObject { overflow: visible }` |
| 文字色を変えても**全く反映されない** | `.next` キャッシュ汚染 | `.next` 削除 + dev サーバー完全再起動 + ハードリロード |
| 日本語ラベルの幅不足による軽微な切れ | Web フォント読込前に採寸 | `mermaid.run()` 直前に `await document.fonts.ready` |

### 正準の `mermaid.initialize` 設定（Mermaid 10.9.8）

```ts
m.default.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    background: "#161b27",
    primaryColor: "#2d1f4e",
    primaryTextColor: "#e8eaf0",
    primaryBorderColor: "#4a2a8a",
    lineColor: "#4a5680",
    secondaryColor: "#0f2e2e",
    tertiaryColor: "#1e2535",
    edgeLabelBackground: "#161b27",
    fontSize: "16px",  // SVG 採寸に使う明示値。採寸値と CSS 実描画値を一致させる（1rem のような相対値は禁止）
  },
  htmlLabels: true,
  flowchart: { curve: "basis", htmlLabels: true, useMaxWidth: false },
  sequence: { useMaxWidth: false },
  gantt: { fontSize: 16 },
  pie: { textPosition: 0.75 },
});
```

### ⚠️ SVG 後処理は「文字列加工」ではなく「ライブ DOM 操作」で行う

`mermaid.run()` 後、実 DOM の `querySelector('svg')` を直接操作する。`DOMParser('image/svg+xml')` + `XMLSerializer` で往復させると `foreignObject` 内の htmlLabels が壊れる。

`applySvgFixups` の実装は `web-next/components/MermaidDiagram.tsx` を正本とする。主要ロジック:

- SVG の `width`/`height` 属性を除去し、`style.width = "${w}px"`、`maxWidth = "100%"` をセット
- `preserveNaturalScale=true` のとき `minWidth` を `${w}px` に固定
- `viewBox` の高さを `+extraHeight` 拡張（sequence/state: +110、その他: +15）
- `style.overflow = "visible"` で viewBox はみ出し描画の途切れを防止
- 再処理時に前回の `minWidth` を事前クリア

### Mermaid の採寸値と CSS 文字サイズを一致させる

```css
/* globals.css の .mbox スコープ内に記述 */
.mbox svg foreignObject {
  overflow: visible;
}
.mbox svg foreignObject > div,
.mbox svg .nodeLabel,
.mbox svg .edgeLabel,
.mbox svg text,
.mbox svg tspan {
  overflow: visible;
  font-size: 16px !important;
}
```

### 文字色は「ノードラベル限定」で当てる（明背景×明文字の再発防止）

> **明色ノードの判定は `classDef` 名を第一手段とする。** 図側で `classDef yellowFill fill:#fbbc04,...` を定義し、CSS は `.yellowFill .nodeLabel` を対象にする。

```css
/* foreignObject のクリップ解除（emoji 採寸ズレによる右端切れ対策） */
.mbox svg foreignObject { overflow: visible; }
.mbox svg foreignObject > div,
.mbox svg .nodeLabel,
.mbox svg .edgeLabel { overflow: visible; }

/* 既定でノードラベルを白に */
.mbox svg .node .nodeLabel,
.mbox svg .node .nodeLabel * { color: #ffffff !important; }

/* 第一手段: classDef 名で明色ノードを判定する */
.mbox svg .yellowFill .nodeLabel,
.mbox svg .yellowFill .nodeLabel * { color: #000000 !important; }

/* 互換フォールバック（カラーコード直接指定の既存図のみ） */
.mbox svg .node[style*="fbbc04" i] .nodeLabel,
.mbox svg .node[style*="fbbc04" i] .nodeLabel * { color: #000000 !important; }
```

> `.edgeLabel *` に `fill:#fff` を当てない。エッジラベルの背景 `rect` が白く塗り潰される。

### 完了確認（順序厳守）

1. CSS / `MermaidDiagram.tsx` 変更時は `.next` を削除し、dev サーバーを完全再起動する:

```bash
cd web-next
rm -rf .next
bun run dev
```

2. ブラウザは**ハードリロード（⌘+Shift+R）**。
3. `web-next/` で以下の 4 コマンドが**全通過**することを確認する（CLAUDE.md の必須要件）:

```bash
cd web-next
bun run lint
bun run typecheck
bun run test
bun run build
```

---

### Mermaid を諦めて HTML/CSS に置き換えるべきケース

以下は CSS では対処不能なため、**純粋な HTML/CSS ウィジェットに置き換える**：

- `flowchart TD` で 5〜6 ノードを直列チェーン → 縦長 900px 超
- 接続されていない複数のサブグラフ（ノード数が非対称なためアスペクト比が崩れる）

判断基準：「ノード増減に関わらず、他の図と同じ高さに収まる保証がない場合」

## 参考文献・ソース一覧

- Mermaid バージョン定義（`mermaid@10.9.8`）: [`web-next/package.json`](../../../web-next/package.json)
- React 共通コンポーネント（`applySvgFixups` の正本）: [`web-next/components/MermaidDiagram.tsx`](../../../web-next/components/MermaidDiagram.tsx)
- Mermaid v10 公式ドキュメント: <https://mermaid.js.org/intro/>
- Mermaid 設定リファレンス（`initialize` / `themeVariables`）: <https://mermaid.js.org/config/schema-docs/config.html>
- Mermaid リリースノート一覧（v10 系の変更点確認用）: <https://github.com/mermaid-js/mermaid/releases>
- React 公式リファレンス（`React.memo` / `useEffect`）: <https://react.dev/reference/react>
- Next.js App Router 公式ドキュメント: <https://nextjs.org/docs/app>
