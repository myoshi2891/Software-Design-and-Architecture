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
  git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)' | grep -vE 'johndoe'
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
