---
name: nextjs-page-migration
description: >
  Migrate static HTML guide pages (general/<slug>/*.html など) to the web-next/ Next.js
  App Router using TDD. web-next/ is a freshly bootstrapped Next.js 16 project; the first
  page (general/comprehensive-guide) is already migrated. Use this skill to add new guide
  pages or maintain migrated ones.
  TRIGGER when the user says any of the following (Japanese or English):
  - "新規ガイドページを追加" / "ガイドページを移行" / "ページを保守"
  - "add new guide page" / "migrate guide page" / "nextjs page migration"
  Applies this repo's patterns: globals.css scoped class styling, hand-written span
  syntax highlighting via dangerouslySetInnerHTML, @tabler/icons-react, lazy Mermaid.
invocation: explicit
allowed-tools:
  - Read
  - Grep
  - Glob
  - Edit
  - Write
  - Bash
---

# Next.js ガイドページ追加・保守スキル

## 概要

静的 HTML ガイド（リポジトリ直下の `general/<slug>/*.html` など）を
`web-next/` の Next.js App Router ページへ TDD で移行・保守する。

**現状**: `web-next/` は Next.js 16 + React 19 でブートストラップ済みの新規プロジェクト。
初回移行として `app/general/comprehensive-guide/page.tsx`（URL `/general/comprehensive-guide`）が
移行完了している。これが**参照実装**であり、新規ページはこのパターンに倣う。

**重要**: 本リポジトリには `SiteHeader` / `DisclaimerBanner` / `nav-links.ts` / `docs/PROGRESS.md` /
i18n / shiki は**存在しない**。これらを前提にしないこと。

## セッション開始時に必ず読むファイル

1. **このファイル** — 標準手順と実装パターン
2. **`.claude/rules/tdd-commit-workflow.md`** — TDD コミットワークフロー（Red→Green→Refactor→commit）
3. **参照実装** — `web-next/app/general/comprehensive-guide/page.tsx`（+ `.test.tsx`）と
   `web-next/app/globals.css`

---

## プロジェクト構成（web-next/）

| パス | 役割 |
| --- | --- |
| `app/layout.tsx` | `<html lang="ja">` + `next/font/google`（Noto Sans JP / JetBrains Mono）+ globals import |
| `app/globals.css` | デザイントークン（`:root`）と各ページのコンポーネントクラス。ページ単位でスコープクラス（例 `.comprehensive-guide`）配下に記述 |
| `app/<provider>/<slug>/page.tsx` | ページ本体（Server Component） |
| `app/<provider>/<slug>/page.test.tsx` | 契約テスト（vitest + @testing-library/react） |
| `components/MermaidDiagram.tsx` | Mermaid 描画（`"use client"` + 動的 import + dark テーマ）。**default export** |
| `components/Ext.tsx` | 外部リンク（`target=_blank` + `rel=noopener noreferrer`）。**named export `Ext`** |
| `lib/fonts.ts` | next/font 定義 |
| `biome.json` | Lint/Format。`overrides` で特定ページのルールを個別調整 |

**スタイル方式**: Tailwind v4 のツールチェーンは postcss に配線済みだが、preflight は
独自リセットと競合するため `globals.css` で `@import "tailwindcss"` は行っていない。
ページのスタイルは `globals.css` 内のスコープクラス（`.comprehensive-guide { … }`）に
ネストして記述する（CSS Modules や shiki は不使用）。

**ページ固有トークン名前空間の温存**: ソース HTML が独自のデザイントークン
（例: EDA ガイドの `--ac`（シアン系アクセント）/ `--bg` / `--sf` / `--gn` / `--or` 等、
参照実装の `--color-*` / `--c-*` とは別系統）を持つ場合、それらを既存の `--color-*` へ
**強制リマップしない**。スコープクラス内のローカル変数として温存し、ページ固有の
ビジュアルアイデンティティを維持する:

```css
.event-driven-architecture-comprehensive-guide {
  --ac: #22d3ee;   /* このページ専用。:root の共通トークンは汚染しない */
  --bg: #0a0e14;
  --sf: #131a24;
}
```

`body{display:flex}` 等の body 依存レイアウトは、`body` を直接いじらず
スコープクラス自身 + `.main` / `.sidebar` の margin で再現する（他ページへ波及させない）。
既存のダーク背景（`html,body`）と矛盾しないことを確認する。

---

## TDD コミットワークフロー（最重要）

`.claude/rules/tdd-commit-workflow.md` を厳守し、論理フェーズごとに
**Red → Green →（Refactor）→ commit** を繰り返す。テスト・実装・ドキュメントを
1 コミットにまとめない。Red（失敗テスト）を経ないコードは未完了扱い。

---

## 新規ページ追加の標準手順

### Step 1: [Red] 契約テストの作成

`app/<provider>/<slug>/page.test.tsx` を作成。Mermaid は描画コストを排除するため
`vi.mock` で軽量化する（参照実装と同じ）:

```tsx
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));
```

最低限の契約（ソースの実数を `grep` で数えてから固定する）:

1. `<h1>` テキスト一致
2. `<h2>`（主要セクション）の個数
3. `section.section` の `id` 配列がソースと一致
4. 外部リンク（href が `http` 始まり）すべてに `target="_blank"` と `rel="noopener noreferrer"`
5. 内部リンク（`#`・相対パス）に `.html` を含まない（**外部リンクは .html を含み得るので除外**）
6. Mermaid 図・table・コードブロック（`pre`）の個数

`bun run test` で**失敗を確認**してから commit（`test(web-next): add failing contract tests …`）。

> 個数の数え方の例:
>
> ```bash
> grep -c '<h2>' source.html
> grep -c 'class="mermaid"' source.html   # CSS/script の substring に注意。実図数のみ数える
> grep -c '<pre>' source.html
> grep -oE 'href="https?://[^"]*"' source.html | wc -l
> ```

### Step 2: [Green] page.tsx の実装

> **faithful 必須**: ソース HTML の **全リスト項目・全コードブロック・全図・全 callout・全 table** を
> JSX に転写する。要約・省略・縮約は禁止。

- **Server Component デフォルト**。`"use client"` は状態が必要な場合のみ
- ルートを `<div className="<scope>">`（例 `comprehensive-guide`）で包み、`globals.css` の
  スコープクラスにスタイルを移植する
- 元 HTML の `<style>` を `globals.css` の `:root` トークン + スコープクラスへ移植

#### インタラクティブ chrome（固定サイドバー・進捗バー・scroll-spy）

ソースが固定サイドバー nav・スクロール進捗バー・現在地ハイライト等の
**クライアント interactivity**（インライン `<script>` の `scroll` / `IntersectionObserver`）を
持つ場合、**chrome だけをクライアントコンポーネント化し、本文（section 群）は
Server Component の children のまま**にする。本文を `"use client"` 化しないのが原則。

- `page.tsx`（server）: ルート `<div className="<scope>">` 配下に
  `<XxxSidebar groups={NAV_GROUPS} />` と `<main className="main"> …本文 section… </main>` を置く。
  nav 定義は **props（`{ id, num, label }[]` をグループ化した配列）として server から渡す**
  （本文の section id と nav の href を 1 箇所で対応付け、ズレを防ぐ）。
- `XxxSidebar.tsx`（`"use client"`）: 進捗バーと nav のみ描画。本文は監視対象として
  `document.querySelectorAll("section.section")` で **DOM 経由参照**する（本文を import しない）。
  - 進捗バー: `scroll` で `scrollY / (scrollHeight - innerHeight)` を `transform: scaleX()` に反映。
  - scroll-spy: `IntersectionObserver`（`rootMargin: "-20% 0px -60% 0px"`）で可視 section を追跡し、
    対応する nav 項目に `.active` を付与（`useState` で activeId 管理、初期値は先頭項目）。
  - `useEffect` のクリーンアップで `removeEventListener` / `observer.disconnect()` を必ず行う。

**テストでの IntersectionObserver スタブ**: jsdom は IO 未実装。2 段構えにする:

1. `tests/setup.ts` に**レンダリングを通すための最小スタブ**（`observe` は no-op の `vi.fn()`）を
   グローバル登録（IO を使う全テストのクラッシュを防ぐ）。
2. scroll-spy の **active 切替ロジック自体**を検証するテストでは、テストローカルで
   **コールバックを捕捉するスタブ**へ差し替え、任意の交差イベントを手動ディスパッチする:

   ```tsx
   let ioCallback: ((e: IntersectionObserverEntry[]) => void) | null = null;
   class CapturingIO implements IntersectionObserver {
     /* root/rootMargin/thresholds + observe/unobserve/disconnect/takeRecords = vi.fn() */
     constructor(cb: (e: IntersectionObserverEntry[]) => void) { ioCallback = cb; }
   }
   // beforeEach で globalThis.IntersectionObserver = CapturingIO、本文 section を body に挿入。
   // act(() => ioCallback?.([{ isIntersecting: true, target } as IntersectionObserverEntry]))
   ```

   進捗バーは `Object.defineProperty` で `scrollHeight` / `innerHeight` / `scrollY` を
   モックし、`scroll` イベント dispatch 後の `style.transform` を検証する。

> サイドバーのテストは `XxxSidebar.test.tsx` として実装ファイルと同階層に置く
> （契約テスト `page.test.tsx` とは別ファイル）。

#### JSX 変換 Pitfalls

| 問題 | NG | OK |
|------|-------|-------|
| `class` 属性 | `class="foo"` | `className="foo"` |
| `for` 属性 | `for="id"` | `htmlFor="id"` |
| void 要素 | `<br>` `<img>` | `<br />` `<img />` |
| HTML コメント | `<!-- c -->` | `{/* c */}` |
| インラインスタイル | `style="margin-top:20px"` | `style={{ marginTop: 20 }}` |
| `style="color:var(--c-x)"` | 文字列のまま | `style={{ color: "var(--c-x)" }}` |
| 角括弧テキスト | `<動作>` | `&lt;動作&gt;`（JSX がデコード） |
| 中括弧テキスト | `/products/{id}` | `/products/{"{id}"}` |
| `rowspan` | `rowspan="3"` | `rowSpan={3}` |

#### アイコン（@tabler/icons-react）

元 HTML は Tabler webfont（`<i class="ti ti-xxx">`）。本リポジトリは webfont を読まないため
**`@tabler/icons-react` の SVG コンポーネント**へ変換する。

> **Tabler 変換は webfont クラス（`<i class="ti …">`）の場合のみ**。ソースが Unicode
> emoji（⚡🧩📋 等）をテキストとして直接埋め込んでいる場合は、**JSX テキストとして
> そのまま残してよい**（emoji → Tabler 変換は不要・非推奨）。

- `ti-test-pipe` → `<IconTestPipe />`、`ti-arrow-up` → `<IconArrowUp />`（PascalCase 化）
- 色: 元 `style="color:var(--c-x)"` → `color="var(--c-x)"` prop
- サイズ: 元 CSS の font-size に合わせ `size`（本文/インライン 16・h2 18・カード/ロゴ 20 が目安）
- 親クラスで色が決まる場合（`.priority-1` や `.career-cert-icon` 等）は `className` を渡し、
  SVG の `currentColor` 経由で色を継承させる
- **存在しない名称に注意**: `ti-layers`→`IconStack2`、`ti-steps`→`IconStairs` 等。
  名称ずれは `bun run typecheck` で検出される（`node -e "require('@tabler/icons-react')..."` で事前確認可）

#### コードブロック（手書き span ハイライト）

ソースは手書き `<span class="kw|cm|st|fn|nu">` でハイライトしている。**shiki は使わない。**
`<pre>` 内に span とテキストが混在し JSX では空白が畳まれる（pre 改行消失）ため、
**`dangerouslySetInnerHTML` でテンプレートリテラルとして渡す**（静的文字列のみ・外部入力なし＝XSS リスクなし）:

```tsx
<pre
  dangerouslySetInnerHTML={{
    __html: `<span class="kw">def</span> <span class="fn">foo</span>():
    <span class="cm"># comment</span>
    return <span class="st">"bar"</span>`,
  }}
/>
```

- バッククォートはインデント・改行をそのまま保持する。コード内に `` ` `` や `${` が無いことを確認
- `class=`（`className` ではなく生 HTML 属性）で書く
- biome の `noDangerouslySetInnerHtml` は `biome.json` の `overrides` で**当該ページのみ off** にする:

```jsonc
"overrides": [
  { "includes": ["app/<provider>/<slug>/page.tsx"],
    "linter": { "rules": { "security": { "noDangerouslySetInnerHtml": "off" } } } }
]
```

ハイライト用クラス（`globals.css` に定義済み）: `kw`（キーワード）/ `cm`（コメント・斜体）/
`st`（文字列）/ `fn`（関数名）/ `nu`（数値）。

##### 実行時ハイライタ由来ソース（highlight.js / Prism）の扱い

ソースが手書き span ではなく、**実行時ハイライタ**（`<code class="language-python">` に
素のコード + highlight.js/Prism を `<script>` で実行）で着色している場合がある。
本リポジトリは実行時ハイライタを使わない方針なので、**手書き span へ変換する**:

1. `language-xxx` で言語を特定（python / bash / hcl 等）。
2. 各ブロックのトークンを手作業で `kw/st/fn/cm/nu` クラスの span に分類し、
   `dangerouslySetInnerHTML` のテンプレートリテラルへ転写する（上記の手書き span 手順と同じ）。
3. 言語別の着色方針:
   - Python: `def/class/return/import/if/for/with/async/await` → `kw`、関数名 → `fn`、
     `"..."` / `'...'` / f-string → `st`、`# …` → `cm`、数値リテラル → `nu`
   - Bash/HCL: `resource/variable/module` やコマンド名 → `kw`、`"..."` → `st`、`# …` → `cm`
4. `<script>` で読み込んでいた highlight.js/Prism の CDN link・初期化コードは**移植しない**。

> faithful 転写の対象はあくまで**コードの中身**。着色（どの span を当てるか）は
> リポジトリ方針への適合作業であり、原文の着色 DOM を 1:1 で再現する必要はない。

#### Mermaid ダイアグラム

```tsx
import MermaidDiagram from "@/components/MermaidDiagram"; // default import
<div className="mermaid-wrap">
  <MermaidDiagram chart={`flowchart LR
    A --> B`} />
  <div className="diagram-caption">…</div>
</div>
```

- ラベル内の改行記法 `\n` は、テンプレートリテラルでは **`\\n`** と二重エスケープして
  「バックスラッシュ + n」を保持する（実改行に化けると構文崩壊）
- ダイアグラムの**行間**は実改行のまま（Mermaid はステートメント区切りに実改行を要求）
- 記述は**左端揃え**（余計なインデント混入で構文エラー）
- テーマは `MermaidDiagram` が dark + カスタム themeVariables を内蔵済み

#### 外部リンク

```tsx
import { Ext } from "@/components/Ext"; // named import
<Ext href="https://example.com" className="source-item">
  <IconExternalLink size={16} /> ラベル<span className="source-label">英語</span>
</Ext>
```

`Ext` が `target=_blank` + `rel=noopener noreferrer` を保証する。内部リンク（`#anchor`）は
通常の `<a>` を使う。

### Step 3: ローカル検証

```bash
cd web-next
bun run lint        # Biome（変更ファイル単位でパス指定。lint:fix の引数なし実行は禁止）
bun run typecheck   # tsc --noEmit
bun run test        # vitest
bun run build       # Next.js production build
```

**全通過**が必須。部分 pass でコミットしない。`bun run build` は Next.js が
`tsconfig.json` の `include` に dev types を追記することがある（正常。biome で整形して取り込む）。

### Step 4: 視覚確認（ユーザー手動）

`bun run dev` → `http://localhost:3000/<provider>/<slug>` をユーザーが目視確認
（Mermaid 描画・table・コードハイライト・アイコン表示）。**Playwright MCP は使わない。**

### Step 5: ドキュメント同期

- `README.md` / `GEMINI.md` に移行ページを追記
- `git commit` 前に PII チェック（`.claude/rules/no-absolute-paths.md`）:

  ```bash
  git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)'
  ```

---

## 判定基準

| 結果 | アクション |
| --- | --- |
| 全ステップ成功 + テスト全通過 | コミット OK と報告 |
| 単体テスト失敗 | テストの意図を確認し、実装かテストのどちらが誤りか判断 |
| ビルド失敗 | 停止。import / 型エラーを最小差分で修正 |
| lint エラー | 変更ファイル単位でパス指定して修正 |
| 設定ファイルの意図しない変更 | 停止してユーザー確認 |

---

## Constraints（禁止事項）

- **要約・省略しない** — faithful 転写を最優先
- **`"use client"` を不必要に使わない** — Server Component デフォルト
- **shiki / CSS Modules を導入しない** — 本リポジトリは手書き span + globals.css スコープ方式
- **`<i class="ti …">` を残さない** — `@tabler/icons-react` へ変換
- **Mermaid ラベルの `\n` を実改行にしない** — テンプレートリテラルでは `\\n`
- **`dangerouslySetInnerHTML` に外部入力を渡さない** — 静的な手書きハイライト文字列のみ
- **`bun run lint:fix`（引数なし）を実行しない** — 変更ファイル単位でパス指定
- **外部フォントを `<link>` で読み込まない** — `next/font/google` のみ（`layout.tsx`）
- **Playwright MCP を使わない** — 視覚確認はユーザーが手動で実施
- **コミット対象に絶対パス / ユーザー名を含めない** — `.claude/rules/no-absolute-paths.md`

---

## 参考文献・ソース一覧

- **TDDコミットワークフロー**: [tdd-commit-workflow.md](./.claude/rules/tdd-commit-workflow.md) - テスト駆動開発での実装とコミット手順を定義
- **移行の参照実装**:
  - [page.tsx](./web-next/app/general/comprehensive-guide/page.tsx) - 最初のガイド移行ページ実装
  - [globals.css](./web-next/app/globals.css) - グローバルCSSと共通デザイン定義
- **Mermaid.js**: [Mermaid Documentation](https://mermaid.js.org) - クライアント側ダイアグラム描画ツール
- **React 19**: [React 19 Documentation](https://react.dev) - UIライブラリ
- **Tabler Icons**: [@tabler/icons-react](https://tabler.io/icons) - 使用するSVGアイコンコンポーネントライブラリ
