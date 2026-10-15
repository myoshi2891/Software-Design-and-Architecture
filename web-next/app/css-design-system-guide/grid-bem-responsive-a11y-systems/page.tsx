import type { Metadata } from "next";
import MermaidDiagram from "@/components/MermaidDiagram";
import { DIAGRAMS } from "./diagrams";
import Navigation from "./Navigation";
import { NAV_GROUPS } from "./navigation-data";
export const metadata: Metadata = {
  title: "CSS グリッド・コンポーネント・レスポンシブ・アクセシビリティ 完全設計ガイド",
  description:
    "CSS Flexbox / Grid から BEM 命名規則・コンテナクエリ・WCAG 準拠まで — プロレベルのフロントエンド設計力をステップバイステップで習得するリファレンスガイドです。",
};
export default function Page() {
  return (
    <div className="grid-bem-responsive-a11y-systems">
      <a className="skip" href="#main">
        {"メインコンテンツへスキップ"}
      </a>
      <Navigation groups={NAV_GROUPS} />
      <main className="main" id="main" tabIndex="-1">
        <div className="hero">
          <div className="h-badge">{"🎨 CSS Design System · Ch.7–10"}</div>
          <h1>
            {"グリッド・コンポーネント・"}
            <br />
            {"レスポンシブ・アクセシビリティ"}
            <br />
            {"完全設計ガイド"}
          </h1>
          <p>
            {"CSS Flexbox / Grid から BEM 命名規則・コンテナクエリ・WCAG 準拠まで — "}
            <strong>{"プロレベルのフロントエンド設計力"}</strong>
            {"をステップバイステップで習得するリファレンスガイドです。"}
          </p>
          <div className="h-meta">
            <span className="h-tag">
              <span className="dot" style={{ background: "rgb(167, 139, 250)" }}></span>
              {"Chapter 7–10"}
            </span>
            <span className="h-tag">
              <span className="dot" style={{ background: "rgb(147, 197, 253)" }}></span>
              {"対象：初学者〜中級者"}
            </span>
            <span className="h-tag">
              <span className="dot" style={{ background: "rgb(134, 239, 172)" }}></span>
              {"難易度：🟠 中級"}
            </span>
            <span className="h-tag">
              <span className="dot" style={{ background: "rgb(253, 186, 116)" }}></span>
              {"2025年版"}
            </span>
          </div>
        </div>
        <section className="section" id="s7">
          <div className="ch-label">{"Chapter 7"}</div>
          <h2>
            <span className="n">{"7."}</span>
            {"グリッド・レイアウトシステム"}
          </h2>
          <div className="sub" id="s7-1">
            <h3>{"7.1 レイアウトシステムとは"}</h3>
            <p>
              {"レイアウトシステムとは、"}
              <strong>{"ページ・コンポーネント内の要素配置ルールを体系化したもの"}</strong>
              {
                "です。一貫した空間リズムを生み出し、予測可能な構造を保証することで、チーム全体の設計判断のブレをなくします。"
              }
            </p>
            <p>
              {"レイアウトは"}
              <strong>{"3つのスケール"}</strong>
              {"に分かれており、それぞれ適切なツールが異なります。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">{"図 7.1 — レイアウトの3スケールとツールの対応関係"}</div>
              <MermaidDiagram
                id="d-layout-overview"
                chart={DIAGRAMS["d-layout-overview"]}
                preserveNaturalScale={true}
              />
            </div>
            <div className="co info">
              <span className="icon">{"💡"}</span>
              <div className="body">
                <strong>{"重要な原則："}</strong>
                {"CSS Grid と Flexbox は競合ではなく"}
                <strong>{"補完関係"}</strong>
                {
                  "にあります。Grid でページ骨格を組み、Flexbox でコンポーネント内部を整列する — このネストした使い方が現代のベストプラクティスです。"
                }
              </div>
            </div>
          </div>
          <div className="sub" id="s7-2">
            <h3>{"7.2 CSS Flexbox の完全ガイド"}</h3>
            <p>
              {"Flexbox は "}
              <strong>{"1次元（行または列の一方向）"}</strong>
              {"のレイアウトを扱います。"}
              <strong>{"コンテナ（親）"}</strong>
              {"と"}
              <strong>{"アイテム（子）"}</strong>
              {"の2役でプロパティが分かれているのが特徴です。"}
            </p>
            <h4>{"主軸と交差軸の概念"}</h4>
            <div className="mbox">
              <div className="mbox-t">{"図 7.2 — 主軸（Main Axis）と交差軸（Cross Axis）"}</div>
              <MermaidDiagram
                id="d-flex-axis"
                chart={DIAGRAMS["d-flex-axis"]}
                preserveNaturalScale={true}
              />
            </div>
            <h4>{"コンテナプロパティ（親要素）"}</h4>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"Flexコンテナの全プロパティ"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '.flex-container {\n  display: flex;                   <span class="cm">/* Flexboxを有効化 */</span>\n  flex-direction: row;             <span class="cm">/* row | row-reverse | column | column-reverse */</span>\n  flex-wrap: nowrap;               <span class="cm">/* nowrap | wrap | wrap-reverse */</span>\n  justify-content: flex-start;     <span class="cm">/* 主軸方向の整列 */</span>\n  align-items: stretch;            <span class="cm">/* 交差軸方向の整列（単一行） */</span>\n  align-content: stretch;          <span class="cm">/* 複数行の交差軸整列（wrap時のみ有効） */</span>\n  gap: <span class="nu">16px</span>;                       <span class="cm">/* アイテム間のすき間（row-gap / column-gap も可） */</span>\n}\n\n<span class="cm">/* justify-content の全値 */</span>\n<span class="cm">/*\n  flex-start    → 左端（デフォルト）\n  flex-end      → 右端\n  center        → 中央\n  space-between → 両端固定・均等間隔\n  space-around  → 全要素に等しい余白（端は半分）\n  space-evenly  → すべての間隔が完全に等しい\n*/</span>\n\n<span class="cm">/* align-items の全値 */</span>\n<span class="cm">/*\n  stretch    → 交差軸方向に引き伸ばす（デフォルト）\n  flex-start → 上揃え  |  flex-end → 下揃え\n  center     → 中央揃え  |  baseline → ベースライン揃え\n*/</span>',
                }}
              />
            </div>
            <h4>{"アイテムプロパティ（子要素）"}</h4>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"Flexアイテムの全プロパティ"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '.flex-item {\n  flex-grow:   <span class="nu">0</span>;      <span class="cm">/* 余白があるとき伸びる割合（0=伸びない） */</span>\n  flex-shrink: <span class="nu">1</span>;      <span class="cm">/* 余白が足りないとき縮む割合（1=縮む） */</span>\n  flex-basis:  auto;   <span class="cm">/* 初期サイズ（auto=コンテンツサイズ基準） */</span>\n\n  <span class="cm">/* よく使うショートハンド */</span>\n  flex: <span class="nu">1</span>;      <span class="cm">/* = 1 1 0%   → 等幅で伸縮する */</span>\n  flex: auto;   <span class="cm">/* = 1 1 auto → コンテンツ基準で伸縮 */</span>\n  flex: none;   <span class="cm">/* = 0 0 auto → 固定サイズ（縮まない・伸びない）*/</span>\n\n  align-self: auto;  <span class="cm">/* コンテナの align-items を個別上書き */</span>\n  order: <span class="nu">0</span>;          <span class="cm">/* 表示順（小さいほど前に来る）*/</span>\n}',
                }}
              />
            </div>
            <h4>{"典型的な実装パターン4選"}</h4>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"Flexboxの頻出パターン集"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* ① ナビゲーションバー（ロゴ左・アクション右）*/</span>\n.navbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: <span class="nu">0</span> <span class="nu">24px</span>;\n  height: <span class="nu">56px</span>;\n}\n.navbar__actions { display: flex; gap: <span class="nu">8px</span>; margin-inline-start: auto; }\n\n<span class="cm">/* ② 完全中央揃え */</span>\n.centered {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100svh;  <span class="cm">/* svh: ブラウザUIバーを除いた高さ */</span>\n}\n\n<span class="cm">/* ③ カードフッターを常に下部に固定 */</span>\n.card {\n  display: flex;\n  flex-direction: column;\n}\n.card__body   { flex: <span class="nu">1</span>; }    <span class="cm">/* 余白をすべて吸収 */</span>\n.card__footer { flex: none; } <span class="cm">/* フッターは高さ固定 */</span>\n\n<span class="cm">/* ④ アイコン + テキストのリストアイテム */</span>\n.list-item { display: flex; align-items: center; gap: <span class="nu">12px</span>; }\n.list-item__icon { flex: none; width: <span class="nu">20px</span>; }\n<span class="cm">/* min-width:0 が必須 → text-overflow:ellipsis を有効にする */</span>\n.list-item__text { flex: <span class="nu">1</span>; min-width: <span class="nu">0</span>; }',
                }}
              />
            </div>
            <div className="co warn">
              <span className="icon">{"⚠️"}</span>
              <div className="body">
                <strong>
                  <code>{"min-width: 0"}</code>
                  {" の罠："}
                </strong>
                {"Flexアイテムはデフォルトで "}
                <code>{"min-width: auto"}</code>
                {"（コンテンツ幅を最小値とする）になっているため、"}
                <code>{"text-overflow: ellipsis"}</code>
                {" が効かないことがあります。"}
                <code>{"flex: 1; min-width: 0"}</code>
                {" をセットで書くのが正解です。"}
              </div>
            </div>
          </div>
          <div className="sub" id="s7-3">
            <h3>{"7.3 CSS Grid の完全ガイド"}</h3>
            <p>
              {"CSS Grid は "}
              <strong>{"行（Row）と列（Column）を同時に制御できる2次元レイアウトシステム"}</strong>
              {"です。複雑なページ構造も直感的なコードで表現できます。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">{"図 7.3 — CSS Grid の重要用語"}</div>
              <MermaidDiagram
                id="d-grid-concepts"
                chart={DIAGRAMS["d-grid-concepts"]}
                preserveNaturalScale={true}
              />
            </div>
            <h4>{"コンテナプロパティ"}</h4>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"Gridコンテナの全プロパティ"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '.grid {\n  display: grid;\n\n  <span class="cm">/* === カラム定義 === */</span>\n  grid-template-columns: <span class="nu">200px</span> 1fr 1fr;      <span class="cm">/* 固定+均等2列 */</span>\n  grid-template-columns: <span class="fn">repeat</span>(<span class="nu">3</span>, 1fr);     <span class="cm">/* 3等分 */</span>\n  grid-template-columns: <span class="fn">repeat</span>(<span class="nu">12</span>, 1fr);    <span class="cm">/* 12カラムグリッド */</span>\n\n  <span class="cm">/* auto-fill: コンテナを可能な限り列で埋める */</span>\n  grid-template-columns: <span class="fn">repeat</span>(auto-fill, <span class="fn">minmax</span>(<span class="nu">250px</span>, 1fr));\n  <span class="cm">/* auto-fit: アイテム数に合わせて列数を調整（空列を詰める）*/</span>\n  grid-template-columns: <span class="fn">repeat</span>(auto-fit, <span class="fn">minmax</span>(<span class="nu">250px</span>, 1fr));\n\n  <span class="cm">/* === 行定義 === */</span>\n  grid-template-rows: auto 1fr auto; <span class="cm">/* ヘッダー可変/コンテンツ拡張/フッター可変 */</span>\n\n  <span class="cm">/* === 名前付きエリア（視覚的なレイアウト定義）=== */</span>\n  grid-template-areas:\n    <span class="st">"header  header  header"</span>\n    <span class="st">"sidebar main    main  "</span>\n    <span class="st">"footer  footer  footer"</span>;\n\n  <span class="cm">/* === ギャップ === */</span>\n  gap: <span class="nu">16px</span>;         <span class="cm">/* 行・列両方 */</span>\n  row-gap: <span class="nu">24px</span>;     <span class="cm">/* 行間のみ */</span>\n  column-gap: <span class="nu">16px</span>;  <span class="cm">/* 列間のみ */</span>\n\n  <span class="cm">/* === セルの整列（全アイテム）=== */</span>\n  place-items: center; <span class="cm">/* align-items + justify-items のショートハンド */</span>\n}',
                }}
              />
            </div>
            <h4>{"アイテムプロパティ"}</h4>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"Gridアイテムの配置プロパティ"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '.grid-item {\n  <span class="cm">/* ライン番号で配置 */</span>\n  grid-column: <span class="nu">1</span> / <span class="nu">3</span>;       <span class="cm">/* 列ライン1から3まで（2列分）*/</span>\n  grid-column: <span class="nu">1</span> / span <span class="nu">2</span>;  <span class="cm">/* 列ライン1から2列分 */</span>\n  grid-column: <span class="nu">1</span> / -<span class="nu">1</span>;      <span class="cm">/* 左端から右端まで（全幅）*/</span>\n  grid-row:    <span class="nu">2</span> / <span class="nu">4</span>;       <span class="cm">/* 行ライン2から4まで（2行分）*/</span>\n\n  <span class="cm">/* 名前付きエリアで配置 */</span>\n  grid-area: header;   <span class="cm">/* grid-template-areas の名前と一致させる */</span>\n  grid-area: sidebar;\n  grid-area: main;\n  grid-area: footer;\n\n  <span class="cm">/* 個別のセル内整列 */</span>\n  justify-self: center;   <span class="cm">/* 列方向（水平）*/</span>\n  align-self:   end;      <span class="cm">/* 行方向（垂直）*/</span>\n  place-self: center end; <span class="cm">/* ショートハンド */</span>\n}',
                }}
              />
            </div>
            <h4>{"聖杯レイアウト（Holy Grail Layout）— 完全実装"}</h4>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"名前付きエリアによるHoly Grail Layout"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '.holy-grail {\n  display: grid;\n  grid-template-areas:\n    <span class="st">"header  header  header"</span>\n    <span class="st">"sidebar main    aside "</span>\n    <span class="st">"footer  footer  footer"</span>;\n  grid-template-columns: <span class="nu">240px</span> 1fr <span class="nu">200px</span>;\n  grid-template-rows: auto 1fr auto;\n  min-height: 100svh;\n  gap: <span class="nu">16px</span>;\n}\n.holy-grail &gt; header { grid-area: header;  }\n.holy-grail &gt; nav    { grid-area: sidebar; }\n.holy-grail &gt; main   { grid-area: main;    }\n.holy-grail &gt; aside  { grid-area: aside;   }\n.holy-grail &gt; footer { grid-area: footer;  }\n\n<span class="cm">/* タブレット: サイドバーなし */</span>\n<span class="kw">@media</span> (max-width: <span class="nu">1024px</span>) {\n  .holy-grail {\n    grid-template-areas: <span class="st">"header"</span> <span class="st">"main"</span> <span class="st">"aside"</span> <span class="st">"footer"</span>;\n    grid-template-columns: 1fr;\n  }\n  .holy-grail &gt; nav { display: none; }\n}\n\n<span class="cm">/* モバイル: シングルカラム */</span>\n<span class="kw">@media</span> (max-width: <span class="nu">640px</span>) {\n  .holy-grail {\n    grid-template-areas: <span class="st">"header"</span> <span class="st">"main"</span> <span class="st">"sidebar"</span> <span class="st">"aside"</span> <span class="st">"footer"</span>;\n    gap: <span class="nu">8px</span>;\n  }\n  .holy-grail &gt; nav { display: block; }\n}',
                }}
              />
            </div>
          </div>
          <div className="sub" id="s7-4">
            <h3>{"7.4 レイアウトパターン集"}</h3>
            <p>
              {"業界でよく使われる汎用レイアウトパターンを体系的に整理します。これらは"}
              <strong>{"コンポーザブル（組み合わせ可能）なプリミティブ"}</strong>
              {"として再利用できます。"}
            </p>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"7つの汎用レイアウトパターン"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* ① RAMパターン（Repeat + Auto-fit + Minmax）\n   メディアクエリなしで自動レスポンシブになるグリッド */</span>\n.ram-grid {\n  display: grid;\n  grid-template-columns: <span class="fn">repeat</span>(auto-fit, <span class="fn">minmax</span>(<span class="fn">min</span>(<span class="nu">280px</span>, <span class="nu">100</span>%), 1fr));\n  gap: <span class="nu">24px</span>;\n}\n<span class="cm">/* min(280px, 100%): 親が280px未満でも列幅がはみ出さない */</span>\n\n<span class="cm">/* ② スタック（縦並び・等間隔）*/</span>\n.stack { display: flex; flex-direction: column; gap: <span class="nu">16px</span>; }\n\n<span class="cm">/* ③ クラスター（タグ・バッジの折り返し）*/</span>\n.cluster { display: flex; flex-wrap: wrap; gap: <span class="nu">8px</span>; align-items: center; }\n\n<span class="cm">/* ④ インセット（コンテンツを中央に収める）*/</span>\n.inset {\n  max-width: <span class="nu">1280px</span>;\n  margin-inline: auto;\n  padding-inline: <span class="fn">clamp</span>(<span class="nu">16px</span>, <span class="nu">5vw</span>, <span class="nu">48px</span>); <span class="cm">/* 流動的な左右パディング */</span>\n}\n\n<span class="cm">/* ⑤ サイドバー付きレイアウト */</span>\n.with-sidebar {\n  display: grid;\n  grid-template-columns: min-content 1fr; <span class="cm">/* sidebar=コンテンツ幅, main=残り */</span>\n  gap: <span class="nu">24px</span>;\n}\n\n<span class="cm">/* ⑥ フルブリード（本文の一要素だけ全幅に広げる）*/</span>\n.content-grid {\n  --pad: <span class="fn">clamp</span>(<span class="nu">16px</span>, <span class="nu">5vw</span>, <span class="nu">48px</span>);\n  --content: <span class="nu">680px</span>;\n  --breakout: <span class="nu">920px</span>;\n  display: grid;\n  grid-template-columns:\n    [full-start] <span class="fn">minmax</span>(<span class="fn">var</span>(--pad), 1fr)\n    [breakout-start]\n      <span class="fn">minmax</span>(<span class="nu">0</span>, <span class="fn">calc</span>((<span class="fn">var</span>(--breakout) - <span class="fn">var</span>(--content)) / <span class="nu">2</span>))\n      [content-start]\n        <span class="fn">min</span>(<span class="nu">100</span>% <span class="fn">-</span> (<span class="fn">var</span>(--pad) * <span class="nu">2</span>), <span class="fn">var</span>(--content))\n      [content-end]\n      <span class="fn">minmax</span>(<span class="nu">0</span>, <span class="fn">calc</span>((<span class="fn">var</span>(--breakout) - <span class="fn">var</span>(--content)) / <span class="nu">2</span>))\n    [breakout-end]\n    <span class="fn">minmax</span>(<span class="fn">var</span>(--pad), 1fr) [full-end];\n}\n.content-grid &gt; *           { grid-column: content; }\n.content-grid &gt; .breakout   { grid-column: breakout; }\n.content-grid &gt; .full-width { grid-column: full-start / full-end; }\n\n<span class="cm">/* ⑦ 等高カードグリッド */</span>\n.card-grid { display: grid; grid-template-columns: <span class="fn">repeat</span>(<span class="nu">3</span>, 1fr); gap: <span class="nu">16px</span>; }\n<span class="kw">@media</span> (max-width: <span class="nu">768px</span>) { .card-grid { grid-template-columns: <span class="fn">repeat</span>(<span class="nu">2</span>, 1fr); } }\n<span class="kw">@media</span> (max-width: <span class="nu">480px</span>) { .card-grid { grid-template-columns: 1fr; } }',
                }}
              />
            </div>
          </div>
          <div className="sub" id="s7-5">
            <h3>{"7.5 Flexbox と Grid の使い分け"}</h3>
            <p>{"「どちらを使うか？」という迷いは、以下のフローチャートで解消できます。"}</p>
            <div className="mbox">
              <div className="mbox-t">{"図 7.5 — Flexbox vs CSS Grid 判断フローチャート"}</div>
              <MermaidDiagram
                id="d-flex-vs-grid"
                chart={DIAGRAMS["d-flex-vs-grid"]}
                preserveNaturalScale={true}
              />
            </div>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>{"場面"}</th>
                    <th>{"推奨"}</th>
                    <th>{"理由"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{"ナビゲーションバー"}</td>
                    <td>
                      <code>{"Flexbox"}</code>
                    </td>
                    <td>{"横1列・アイテムの整列が主目的"}</td>
                  </tr>
                  <tr>
                    <td>{"ボタン内のアイコン＋テキスト"}</td>
                    <td>
                      <code>{"Flexbox"}</code>
                    </td>
                    <td>{"1方向の整列・中央揃え"}</td>
                  </tr>
                  <tr>
                    <td>{"タグ・バッジのリスト"}</td>
                    <td>
                      <code>{"Flexbox + wrap"}</code>
                    </td>
                    <td>{"コンテンツ量に応じた自然な折り返し"}</td>
                  </tr>
                  <tr>
                    <td>{"ページ全体のレイアウト"}</td>
                    <td>
                      <code>{"Grid"}</code>
                    </td>
                    <td>{"行と列を同時管理、エリア名で直感的"}</td>
                  </tr>
                  <tr>
                    <td>{"カードグリッド"}</td>
                    <td>
                      <code>{"Grid"}</code>
                    </td>
                    <td>{"等高・等幅の自動カラム配置"}</td>
                  </tr>
                  <tr>
                    <td>{"フォームの入力群"}</td>
                    <td>
                      <code>{"Grid"}</code>
                    </td>
                    <td>{"複数列にまたがるラベルと入力の整列"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="sub" id="s7-6">
            <h3>{"7.6 ベストプラクティス"}</h3>
            <div className="bp">
              <div className="bp-title">
                <span>{"✅"}</span>
                {"レイアウト設計のベストプラクティス"}
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>
                    <code>{"margin"}</code>
                    {"より"}
                    <code>{"gap"}</code>
                    {"でアイテム間隔を管理する"}
                  </strong>
                  <br />
                  {"margin は最後の要素に余分なスペースが残るなど計算が複雑。Flexbox/Gridの "}
                  <code>{"gap"}</code>
                  {" を使うと精確で予測可能な間隔管理ができます。"}
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>
                    <code>{"min()"}</code>
                    {"/"}
                    <code>{"clamp()"}</code>
                    {"でメディアクエリを最小化する"}
                  </strong>
                  <br />
                  <code>{"repeat(auto-fit, minmax(min(280px, 100%), 1fr))"}</code>
                  {" のようにすると、メディアクエリなしでレスポンシブなグリッドが実現します。"}
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>
                    <code>{"place-items"}</code>
                    {"のショートハンドを活用する"}
                  </strong>
                  <br />
                  <code>{"place-items: center"}</code>
                  {" は "}
                  <code>{"align-items + justify-items"}</code>
                  {" を一括指定。Grid・Flex 両方で使えます。"}
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>{"コンポーネントは外側マージンを持たせない"}</strong>
                  <br />
                  {"再利用性を損なうため、コンポーネント自体に "}
                  <code>{"margin"}</code>
                  {" をつけません。親コンテナの "}
                  <code>{"gap"}</code>
                  {" で管理するのが正解です。"}
                </div>
              </div>
            </div>
            <div className="sl">
              <div className="sl-item ng">
                <div className="sl-head">{"❌ NG — marginで間隔管理"}</div>
                <div className="cb">
                  <pre
                    className="language-css"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<span class="cm">/* 最後の要素に余分なスペースが出る */</span>\n.card { margin-bottom: <span class="nu">16px</span>; }\n.card:last-child {\n  margin-bottom: <span class="nu">0</span>; <span class="cm">/* 例外対応が必要 */</span>\n}',
                    }}
                  />
                </div>
              </div>
              <div className="sl-item ok">
                <div className="sl-head">{"✅ OK — gapで間隔管理"}</div>
                <div className="cb">
                  <pre
                    className="language-css"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<span class="cm">/* 親の gap で一括管理 */</span>\n.card-list {\n  display: flex;\n  flex-direction: column;\n  gap: <span class="nu">16px</span>; <span class="cm">/* 例外対応不要 */</span>\n}',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section" id="s8">
          <div className="ch-label">{"Chapter 8"}</div>
          <h2>
            <span className="n">{"8."}</span>
            {"コンポーネント設計とBEM命名規則"}
          </h2>
          <div className="sub" id="s8-1">
            <h3>{"8.1 コンポーネント設計の5原則"}</h3>
            <p>
              {"コンポーネントとは"}
              <strong>{"単一の機能・見た目を持つ再利用可能なUI部品"}</strong>
              {"です。優れたコンポーネントは以下の5原則を備えています。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">{"図 8.1 — コンポーネント設計の5原則"}</div>
              <MermaidDiagram
                id="d-comp-principles"
                chart={DIAGRAMS["d-comp-principles"]}
                preserveNaturalScale={true}
              />
            </div>
            <div className="co tip">
              <span className="icon">{"💜"}</span>
              <div className="body">
                <strong>{"原則の優先順位："}</strong>
                {"5原則のうち、"}
                <strong>{"単一責任"}</strong>
                {
                  "が最も重要です。「このコンポーネントは何をするか？」を1文で説明できないなら、分割を検討しましょう。"
                }
              </div>
            </div>
          </div>
          <div className="sub" id="s8-2">
            <h3>{"8.2 BEM の完全ガイド"}</h3>
            <p>
              {"BEM（Block Element Modifier）はCSSクラス命名の方法論です。命名規則だけでスタイルの"}
              <strong>{"スコープ・構造・バリアント"}</strong>
              {"を表現できるのが強みです。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">{"図 8.2 — BEMの3層構造（Block / Element / Modifier）"}</div>
              <MermaidDiagram id="d-bem" chart={DIAGRAMS["d-bem"]} preserveNaturalScale={true} />
            </div>
            <h4>{"BEM の構文"}</h4>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"BEM命名規則の基本構文"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* Block: 独立したコンポーネント（それ自体が意味を持つ）*/</span>\n.block {}\n\n<span class="cm">/* Element: Blockの一部（__ で連結。Block なしでは存在できない）*/</span>\n.block__element {}\n\n<span class="cm">/* Modifier: Block/Elementのバリアント・状態（-- で連結）*/</span>\n.block--modifier {}\n.block__element--modifier {}\n\n<span class="cm">/* 具体例 */</span>\n.card {}                    <span class="cm">/* Block */</span>\n.card__title {}             <span class="cm">/* Element */</span>\n.card__body {}              <span class="cm">/* Element */</span>\n.card--featured {}          <span class="cm">/* Block Modifier（強調バリアント）*/</span>\n.card__title--truncated {}  <span class="cm">/* Element Modifier（省略表示）*/</span>',
                }}
              />
            </div>
            <h4>{"実装例：カードコンポーネント"}</h4>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"HTML"}</span>
                <span className="cb-name">{"BEM構造のカードコンポーネント"}</span>
              </div>
              <pre
                className="language-html"
                dangerouslySetInnerHTML={{
                  __html:
                    '&lt;article <span class="kw">class</span>=<span class="st">"card card--featured"</span>&gt;\n  &lt;div <span class="kw">class</span>=<span class="st">"card__media"</span>&gt;\n    &lt;img <span class="kw">class</span>=<span class="st">"card__image"</span> src=<span class="st">"thumb.jpg"</span> alt=<span class="st">"記事サムネイル"</span>&gt;\n    &lt;span <span class="kw">class</span>=<span class="st">"card__badge card__badge--new"</span>&gt;NEW&lt;/span&gt;\n  &lt;/div&gt;\n  &lt;div <span class="kw">class</span>=<span class="st">"card__body"</span>&gt;\n    &lt;div <span class="kw">class</span>=<span class="st">"card__meta"</span>&gt;\n      &lt;span <span class="kw">class</span>=<span class="st">"card__category"</span>&gt;テクノロジー&lt;/span&gt;\n      &lt;time <span class="kw">class</span>=<span class="st">"card__date"</span>&gt;<span class="nu">2025</span>年<span class="nu">1</span>月<span class="nu">1</span>日&lt;/time&gt;\n    &lt;/div&gt;\n    &lt;h2 <span class="kw">class</span>=<span class="st">"card__title"</span>&gt;記事タイトル&lt;/h2&gt;\n    &lt;p <span class="kw">class</span>=<span class="st">"card__description card__description--truncated"</span>&gt;\n      記事の説明文がここに入ります...\n    &lt;/p&gt;\n  &lt;/div&gt;\n  &lt;footer <span class="kw">class</span>=<span class="st">"card__footer"</span>&gt;\n    &lt;a <span class="kw">class</span>=<span class="st">"card__link"</span> href=<span class="st">"#"</span>&gt;続きを読む&lt;/a&gt;\n    &lt;button <span class="kw">class</span>=<span class="st">"card__action card__action--bookmark"</span>\n            aria-label=<span class="st">"ブックマークに追加"</span>&gt;🔖&lt;/button&gt;\n  &lt;/footer&gt;\n&lt;/article&gt;',
                }}
              />
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"カードコンポーネントの完全スタイリング"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* ===== Block ===== */</span>\n.card {\n  display: flex;\n  flex-direction: column;\n  border-radius: <span class="nu">12px</span>;\n  background: <span class="fn">var</span>(--color-bg-surface);\n  border: <span class="nu">1px</span> solid <span class="fn">var</span>(--color-border-<span class="kw">default</span>);\n  overflow: hidden;\n  <span class="cm">/* ❌ margin はここに書かない → 使う側のコンテナが決める */</span>\n}\n<span class="cm">/* Block Modifier */</span>\n.card--featured {\n  border-color: <span class="fn">var</span>(--color-action-primary);\n  box-shadow: <span class="nu">0</span> <span class="nu">0</span> <span class="nu">0</span> <span class="nu">1px</span> <span class="fn">var</span>(--color-action-primary);\n}\n\n<span class="cm">/* ===== Elements ===== */</span>\n.card__media { position: relative; aspect-ratio: <span class="nu">16</span>/<span class="nu">9</span>; overflow: hidden; }\n.card__image { width: <span class="nu">100</span>%; height: <span class="nu">100</span>%; object-fit: cover; transition: transform <span class="nu">300ms</span> ease; }\n.card:hover .card__image { transform: <span class="fn">scale</span>(<span class="nu">1.03</span>); }\n\n.card__badge {\n  position: absolute; top: <span class="nu">8px</span>; right: <span class="nu">8px</span>;\n  padding: <span class="nu">3px</span> <span class="nu">8px</span>; border-radius: <span class="nu">4px</span>;\n  font-size: <span class="nu">11px</span>; font-weight: <span class="nu">700</span>;\n  background: <span class="fn">var</span>(--color-bg-surface); color: <span class="fn">var</span>(--color-text-primary);\n}\n<span class="cm">/* Element Modifier */</span>\n.card__badge--<span class="kw">new</span> { background: <span class="fn">var</span>(--color-action-primary); color: white; }\n\n.card__body {\n  flex: <span class="nu">1</span>; <span class="cm">/* フッターを押し下げる */</span>\n  padding: <span class="nu">20px</span>; display: flex; flex-direction: column; gap: <span class="nu">8px</span>;\n}\n.card__title { font-size: <span class="nu">1.125rem</span>; font-weight: <span class="nu">600</span>; line-height: <span class="nu">1.4</span>; }\n\n.card__description { color: <span class="fn">var</span>(--color-text-secondary); line-height: <span class="nu">1.7</span>; }\n<span class="cm">/* Element Modifier */</span>\n.card__description--truncated {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: <span class="nu">3</span>;\n  overflow: hidden;\n}\n\n.card__footer {\n  display: flex; align-items: center; justify-content: space-between;\n  padding: <span class="nu">12px</span> <span class="nu">20px</span>; border-top: <span class="nu">1px</span> solid <span class="fn">var</span>(--color-border-<span class="kw">default</span>);\n}',
                }}
              />
            </div>
            <h4>{"よくある BEM の間違いと正解"}</h4>
            <div className="sl">
              <div className="sl-item ng">
                <div className="sl-head">{"❌ NG — __ を2重にネスト"}</div>
                <div className="cb">
                  <pre
                    className="language-html"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<span class="cm">&lt;!-- card__header__title は存在できない --&gt;</span>\n&lt;div <span class="kw">class</span>=<span class="st">"card"</span>&gt;\n  &lt;header <span class="kw">class</span>=<span class="st">"card__header"</span>&gt;\n    <span class="cm">&lt;!-- __ を2重にするのは禁止 --&gt;</span>\n    &lt;h2 <span class="kw">class</span>=<span class="st">"card__header__title"</span>&gt;&lt;/h2&gt;\n  &lt;/header&gt;\n&lt;/div&gt;',
                    }}
                  />
                </div>
              </div>
              <div className="sl-item ok">
                <div className="sl-head">{"✅ OK — 独立したElementとして定義"}</div>
                <div className="cb">
                  <pre
                    className="language-html"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<span class="cm">&lt;!-- card__title は card の直接 Element --&gt;</span>\n&lt;div <span class="kw">class</span>=<span class="st">"card"</span>&gt;\n  &lt;header <span class="kw">class</span>=<span class="st">"card__header"</span>&gt;\n    &lt;h2 <span class="kw">class</span>=<span class="st">"card__title"</span>&gt;&lt;/h2&gt;\n  &lt;/header&gt;\n&lt;/div&gt;',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sub" id="s8-3">
            <h3>{"8.3 CSS Modules / Scoped CSS"}</h3>
            <p>
              {"React・Vue などのコンポーネントフレームワークでは、"}
              <strong>{"CSSクラス名を自動でユニーク化"}</strong>
              {"してスコープを閉じ込める仕組みがあります。"}
            </p>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"JSX"}</span>
                <span className="cb-name">{"React + CSS Modules"}</span>
              </div>
              <pre
                className="language-jsx"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">// Card.module.css</span>\n<span class="cm">// ビルド時に .card_xK2aP のようなユニーク名に自動変換される</span>\n<span class="cm">// .card { border-radius: 12px; }</span>\n<span class="cm">// .card__title { font-size: 1.125rem; }</span>\n\n<span class="kw">import</span> styles <span class="kw">from</span> <span class="st">\'./Card.module.css\'</span>;\n\n<span class="kw">function</span> <span class="fn">Card</span>({ title, featured }) {\n  <span class="kw">return</span> (\n    &lt;article className={`${styles.card} ${featured ? styles[<span class="st">\'card--featured\'</span>] : <span class="st">\'\'</span>}`}&gt;\n      &lt;div className={styles[<span class="st">\'card__body\'</span>]}&gt;\n        &lt;h2 className={styles[<span class="st">\'card__title\'</span>]}&gt;{title}&lt;/h2&gt;\n      &lt;/div&gt;\n    &lt;/article&gt;\n  );\n}',
                }}
              />
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"HTML"}</span>
                <span className="cb-name">{"Vue の Scoped CSS"}</span>
              </div>
              <pre
                className="language-html"
                dangerouslySetInnerHTML={{
                  __html:
                    '&lt;template&gt;\n  &lt;article <span class="kw">class</span>=<span class="st">"card"</span> :<span class="kw">class</span>=<span class="st">"{ \'card--featured\': featured }"</span>&gt;\n    &lt;h2 <span class="kw">class</span>=<span class="st">"card__title"</span>&gt;{{ title }}&lt;/h2&gt;\n  &lt;/article&gt;\n&lt;/template&gt;\n\n&lt;style scoped&gt;\n<span class="cm">/* data-v-XXXXXX 属性が自動付与されこのコンポーネントのみに適用 */</span>\n.card { border-radius: <span class="nu">12px</span>; }\n.card__title { font-size: <span class="nu">1.125rem</span>; }\n.card--featured { border-color: <span class="fn">var</span>(--color-action-primary); }\n&lt;/style&gt;',
                }}
              />
            </div>
          </div>
          <div className="sub" id="s8-4">
            <h3>{"8.4 コンポーネントのバリアント設計"}</h3>
            <p>
              {"1つのコンポーネントは"}
              <strong>{"バリアント（variant）・サイズ（size）・状態（state）"}</strong>
              {"の3軸で設計します。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">{"図 8.4 — Buttonコンポーネントの3軸設計"}</div>
              <MermaidDiagram
                id="d-btn-variants"
                chart={DIAGRAMS["d-btn-variants"]}
                preserveNaturalScale={true}
              />
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"ボタンコンポーネントの完全実装"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* ===== ベーススタイル ===== */</span>\n.button {\n  display: inline-flex; align-items: center; justify-content: center; gap: <span class="nu">8px</span>;\n  border: <span class="nu">1px</span> solid transparent; border-radius: <span class="nu">8px</span>;\n  font-family: inherit; font-size: <span class="nu">0.875rem</span>; font-weight: <span class="nu">500</span>; line-height: <span class="nu">1</span>;\n  cursor: pointer; text-decoration: none; white-space: nowrap; outline: none;\n  transition: background-color <span class="nu">150ms</span> ease, color <span class="nu">150ms</span> ease, border-color <span class="nu">150ms</span> ease;\n}\n.button:focus-visible {\n  outline: <span class="nu">2px</span> solid <span class="fn">var</span>(--color-action-primary);\n  outline-offset: <span class="nu">2px</span>;\n}\n\n<span class="cm">/* ===== サイズバリアント ===== */</span>\n.button--sm { height: <span class="nu">32px</span>; padding-inline: <span class="nu">12px</span>; font-size: <span class="nu">0.75rem</span>; }\n.button--md { height: <span class="nu">40px</span>; padding-inline: <span class="nu">16px</span>; }\n.button--lg { height: <span class="nu">48px</span>; padding-inline: <span class="nu">24px</span>; font-size: <span class="nu">1rem</span>; }\n.button--xl { height: <span class="nu">56px</span>; padding-inline: <span class="nu">32px</span>; font-size: <span class="nu">1.125rem</span>; }\n\n<span class="cm">/* ===== デザインバリアント ===== */</span>\n.button--primary { background: <span class="fn">var</span>(--color-action-primary); color: white; }\n.button--primary:hover  { background: <span class="fn">var</span>(--color-action-primary-hover); }\n.button--primary:active { background: <span class="fn">var</span>(--color-action-primary-active); }\n\n.button--secondary {\n  background: transparent;\n  color: <span class="fn">var</span>(--color-action-primary);\n  border-color: <span class="fn">var</span>(--color-action-primary);\n}\n.button--secondary:hover { background: <span class="fn">var</span>(--color-action-primary-subtle); }\n\n.button--ghost { background: transparent; color: <span class="fn">var</span>(--color-text-secondary); }\n.button--ghost:hover {\n  background: <span class="fn">var</span>(--color-bg-overlay);\n  color: <span class="fn">var</span>(--color-text-primary);\n}\n\n.button--danger { background: <span class="nu">#ef4444</span>; color: white; }\n.button--danger:hover { background: <span class="nu">#dc2626</span>; }\n\n<span class="cm">/* ===== 状態バリアント ===== */</span>\n.button:disabled,\n.button[aria-disabled=<span class="st">"true"</span>] {\n  opacity: <span class="nu">0.4</span>; cursor: not-allowed; pointer-events: none;\n}\n.button.is-loading { cursor: wait; opacity: <span class="nu">0.7</span>; }',
                }}
              />
            </div>
          </div>
          <div className="sub" id="s8-5">
            <h3>{"8.5 コンポーネントの状態管理"}</h3>
            <p>
              {"コンポーネントの状態には"}
              <strong>{"CSSが管理するインタラクション状態"}</strong>
              {"と"}
              <strong>{"JSが管理するアプリケーション状態"}</strong>
              {"の2種類があります。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">{"図 8.5 — ボタンの状態遷移図（State Machine）"}</div>
              <MermaidDiagram
                id="d-state-machine"
                chart={DIAGRAMS["d-state-machine"]}
                preserveNaturalScale={true}
              />
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"CSS と JS それぞれの状態管理パターン"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* === CSSが管理するインタラクション状態 === */</span>\n.button:hover         { <span class="cm">/* マウスオーバー */</span> }\n.button:focus-visible { <span class="cm">/* キーボードフォーカス */</span> }\n.button:active        { <span class="cm">/* クリック中 */</span> }\n.button:disabled      { <span class="cm">/* 無効化 */</span> }\n\n<span class="cm">/* === JSがクラスを付与するアプリケーション状態（is- prefix）=== */</span>\n.button.is-loading { cursor: wait; opacity: <span class="nu">0.7</span>; }\n.button.is-success { background: <span class="nu">#22c55e</span>; }\n.button.is-error   { background: <span class="nu">#ef4444</span>; }\n\n<span class="cm">/* === ARIA属性と連動する状態 === */</span>\n<span class="cm">/* aria-pressed: トグルボタン */</span>\n.button[aria-pressed=<span class="st">"true"</span>] {\n  background: <span class="fn">var</span>(--color-action-primary);\n  color: white;\n}\n<span class="cm">/* aria-expanded: 展開パネルのトリガー */</span>\n.button[aria-expanded=<span class="st">"true"</span>] .button__icon {\n  transform: <span class="fn">rotate</span>(180deg);\n  transition: transform <span class="nu">200ms</span> ease;\n}\n<span class="cm">/* aria-invalid: フォームのエラー状態 */</span>\n.input[aria-invalid=<span class="st">"true"</span>] {\n  border-color: <span class="nu">#ef4444</span>;\n  background: <span class="fn">rgba</span>(<span class="nu">239</span>,<span class="nu">68</span>,<span class="nu">68</span>,<span class="nu">0.05</span>);\n}',
                }}
              />
            </div>
          </div>
          <div className="sub" id="s8-6">
            <h3>{"8.6 ベストプラクティス"}</h3>
            <div className="bp">
              <div className="bp-title">
                <span>{"✅"}</span>
                {"コンポーネント設計のベストプラクティス"}
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>{"コンポーネントのCSSは外側マージンを持たない"}</strong>
                  <br />
                  {"再利用性を損なうため、"}
                  <code>{".card { margin-bottom: 24px }"}</code>
                  {" のような外側スペースはコンポーネント側に書きません。配置する親コンテナの "}
                  <code>{"gap"}</code>
                  {" で管理します。"}
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>{"CSSセレクタの詳細度を上げない"}</strong>
                  <br />
                  <code>{"#sidebar .card"}</code>
                  {" や "}
                  <code>{"article.card"}</code>
                  {" は詳細度が高くなり上書きが困難になります。"}
                  <code>{".card--sidebar"}</code>
                  {" のようにクラスのみで表現します。"}
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>
                    <code>{":is()"}</code>
                    {"/"}
                    <code>{":not()"}</code>
                    {"で冗長なセレクタを整理する"}
                  </strong>
                  <br />
                  <code>{".card:is(:hover, :focus-within)"}</code>
                  {" でホバーとフォーカスを一括指定、"}
                  <code>{".list__item:not(:last-child)"}</code>
                  {" で最後以外に区切り線を引けます。"}
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>
                    {"状態は "}
                    <code>{"is-"}</code>
                    {" prefix クラスまたはARIA属性で表現する"}
                  </strong>
                  <br />
                  <code>{".is-loading"}</code>
                  {"/"}
                  <code>{".is-active"}</code>
                  {" のようなクラスかARIA属性（"}
                  <code>{"aria-expanded"}</code>
                  {"等）と連動するCSSを書くことで、JavaScriptとの明確な責任分担ができます。"}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section" id="s9">
          <div className="ch-label">{"Chapter 9"}</div>
          <h2>
            <span className="n">{"9."}</span>
            {"レスポンシブデザインシステム"}
          </h2>
          <div className="sub" id="s9-1">
            <h3>{"9.1 レスポンシブ設計の考え方"}</h3>
            <p>
              {"レスポンシブデザインとは"}
              <strong>{"デバイスの画面サイズに関わらず、最適なUI/UXを提供する"}</strong>
              {"設計手法です。現代では"}
              <strong>{"モバイルファースト"}</strong>
              {"アプローチが強く推奨されています。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">
                {"図 9.1 — モバイルファースト vs デスクトップファーストの比較"}
              </div>
              <MermaidDiagram
                id="d-mobile-first"
                chart={DIAGRAMS["d-mobile-first"]}
                preserveNaturalScale={true}
              />
            </div>
            <div className="co ok">
              <span className="icon">{"✅"}</span>
              <div className="body">
                <strong>{"モバイルファーストが推奨される理由："}</strong>
                {
                  "モバイルで必要な最小限のCSSをまず定義し、画面が広くなるにつれて機能を追加する「Progressive Enhancement」の考え方と合致します。デスクトップファーストでは不要なCSSをモバイルでも読み込む無駄が生じます。"
                }
              </div>
            </div>
          </div>
          <div className="sub" id="s9-2">
            <h3>{"9.2 ブレークポイントシステム"}</h3>
            <p>
              {"ブレークポイントは"}
              <strong>{"デバイスのサイズではなく、コンテンツが崩れるポイントで設定する"}</strong>
              {"のが正解です。"}
            </p>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"代表的なブレークポイントとメディアクエリの種類"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/*\n  推奨ブレークポイント（Tailwind CSS 準拠）\n  sm:  640px  → スマートフォン横向き\n  md:  768px  → タブレット縦向き\n  lg: 1024px  → タブレット横向き・小型ラップトップ\n  xl: 1280px  → デスクトップ\n  2xl:1536px  → 大型ディスプレイ\n*/</span>\n\n<span class="cm">/* ===== モバイルファーストの記述順序 ===== */</span>\n<span class="cm">/* 1. デフォルト（0〜639px） → モバイル */</span>\n.component { font-size: <span class="nu">1rem</span>; padding: <span class="nu">16px</span>; }\n\n<span class="cm">/* 2. 640px 以上 */</span>\n<span class="kw">@media</span> (min-width: <span class="nu">640px</span>) {\n  .component { font-size: <span class="nu">1.125rem</span>; }\n}\n\n<span class="cm">/* 3. 768px 以上 */</span>\n<span class="kw">@media</span> (min-width: <span class="nu">768px</span>) {\n  .component { font-size: <span class="nu">1.25rem</span>; padding: <span class="nu">24px</span>; }\n}\n\n<span class="cm">/* 4. 1024px 以上 */</span>\n<span class="kw">@media</span> (min-width: <span class="nu">1024px</span>) {\n  .component { font-size: <span class="nu">1.5rem</span>; padding: <span class="nu">32px</span>; }\n}\n\n<span class="cm">/* ===== 範囲指定（CSS Level 4 モダン構文）===== */</span>\n<span class="kw">@media</span> (<span class="nu">640px</span> &lt;= width &lt; <span class="nu">1024px</span>) { <span class="cm">/* タブレット専用 */</span> }\n\n<span class="cm">/* ===== ユーザー設定メディアクエリ ===== */</span>\n<span class="kw">@media</span> (prefers-color-scheme: dark)      { <span class="cm">/* ダークモード */</span> }\n<span class="kw">@media</span> (prefers-reduced-motion: reduce)  { <span class="cm">/* アニメーション抑制 */</span> }\n<span class="kw">@media</span> (prefers-contrast: more)          { <span class="cm">/* 高コントラスト */</span> }\n<span class="kw">@media</span> (forced-colors: active)           { <span class="cm">/* Windows 高コントラストモード */</span> }\n<span class="kw">@media</span> (hover: hover) <span class="fn">and</span> (pointer: fine){ <span class="cm">/* マウスデバイスのみホバー */</span> }\n<span class="kw">@media</span> print                             { <span class="cm">/* 印刷スタイル */</span> }',
                }}
              />
            </div>
          </div>
          <div className="sub" id="s9-3">
            <h3>{"9.3 コンテナクエリ"}</h3>
            <p>
              {"コンテナクエリは2023年に全モダンブラウザが対応した"}
              <strong>{"ゲームチェンジャー"}</strong>
              {"です。ビューポートではなく"}
              <strong>{"親コンテナのサイズ"}</strong>
              {"に応じてスタイルを変えられます。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">
                {"図 9.3 — メディアクエリ（従来）vs コンテナクエリ（新機能）"}
              </div>
              <MermaidDiagram
                id="d-container-query"
                chart={DIAGRAMS["d-container-query"]}
                preserveNaturalScale={true}
              />
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"コンテナクエリの実装パターン"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* ===== Step 1: 親要素をコンテナとして登録 ===== */</span>\n.card-wrapper {\n  container-type: inline-size; <span class="cm">/* 幅を参照するコンテナ */</span>\n  container-name: card;         <span class="cm">/* 名前付きコンテナ */</span>\n}\n\n<span class="cm">/* ===== Step 2: コンテナクエリでスタイルを分岐 ===== */</span>\n<span class="cm">/* コンテナが500px未満（デフォルト）→ 縦積みレイアウト */</span>\n.card { display: flex; flex-direction: column; }\n\n<span class="cm">/* コンテナが500px以上 → 横並びレイアウト */</span>\n<span class="kw">@container</span> <span class="fn">card</span> (min-width: <span class="nu">500px</span>) {\n  .card {\n    display: grid;\n    grid-template-columns: <span class="nu">200px</span> 1fr;\n  }\n}\n\n<span class="cm">/* ===== 実践：サイドバーあり・なし両方に対応するカード ===== */</span>\n.article-grid   { container-type: inline-size; }\n.sidebar-widget { container-type: inline-size; }\n\n<span class="cm">/* コンテナが狭い → 縦積み */</span>\n.article-card { flex-direction: column; }\n\n<span class="cm">/* コンテナが広い → 横並び */</span>\n<span class="kw">@container</span> (min-width: <span class="nu">480px</span>) {\n  .article-card { flex-direction: row; }\n}\n\n<span class="cm">/* コンテナが十分広い → サムネイル固定幅 */</span>\n<span class="kw">@container</span> (min-width: <span class="nu">640px</span>) {\n  .article-card {\n    display: grid;\n    grid-template-columns: <span class="nu">240px</span> 1fr;\n  }\n}\n\n<span class="cm">/* ===== コンテナ単位（cqi / cqb）===== */</span>\n.card__title {\n  font-size: <span class="fn">clamp</span>(<span class="nu">1rem</span>, 4cqi, <span class="nu">1.5rem</span>);\n  <span class="cm">/* cqi: コンテナのインラインサイズ（幅）に対する%\n     cqb: コンテナのブロックサイズ（高さ）に対する% */</span>\n}',
                }}
              />
            </div>
            <div className="co info">
              <span className="icon">{"📱"}</span>
              <div className="body">
                <strong>{"コンテナクエリの最大の恩恵："}</strong>
                {"同じコンポーネントを"}
                <strong>{"どんな文脈（サイドバー内・メインコンテンツ内・モーダル内）"}</strong>
                {
                  "に置いても適切に表示できます。ビューポート幅に依存する従来のメディアクエリでは不可能でした。"
                }
              </div>
            </div>
          </div>
          <div className="sub" id="s9-4">
            <h3>{"9.4 流動的レイアウトの技術"}</h3>
            <p>
              <code>{"min()"}</code>
              {"/"}
              <code>{"max()"}</code>
              {"/"}
              <code>{"clamp()"}</code>
              {"を活用すると、"}
              <strong>{"メディアクエリを書かずに"}</strong>
              {"流動的なレイアウトが実現できます。"}
            </p>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"min() / max() / clamp() 完全ガイド"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* ===== min(): 2つの値の小さい方を採用 ===== */</span>\n.element {\n  width: <span class="fn">min</span>(<span class="nu">600px</span>, <span class="nu">100</span>%);\n  <span class="cm">/* 親の幅が600px未満なら100%（はみ出さない）\n     600px以上なら600px固定 */</span>\n}\n\n<span class="cm">/* ===== max(): 2つの値の大きい方を採用 ===== */</span>\n.element {\n  padding: <span class="fn">max</span>(<span class="nu">16px</span>, <span class="nu">5vw</span>);\n  <span class="cm">/* 5vwが16pxを下回ったら16pxを保証\n     画面が広くなると5vwに追従 */</span>\n}\n\n<span class="cm">/* ===== clamp(最小, 推奨, 最大): 範囲内に収める ===== */</span>\n.element {\n  width: <span class="fn">clamp</span>(<span class="nu">300px</span>, <span class="nu">50</span>%, <span class="nu">800px</span>);\n  <span class="cm">/* 300px〜800pxの範囲で50%に追従 */</span>\n}\n\n<span class="cm">/* ===== 流体タイポグラフィ（最も重要なユースケース）===== */</span>\n.heading-xl {\n  font-size: <span class="fn">clamp</span>(<span class="nu">1.5rem</span>, <span class="nu">4vw</span> + <span class="nu">0.5rem</span>, <span class="nu">3rem</span>);\n  <span class="cm">/* 小画面: 1.5rem → 大画面: 3rem でなめらかに変化\n     "4vw + 0.5rem" が推奨値（vwのみだと極端すぎる）*/</span>\n}\n\n<span class="cm">/* ===== 流体スペーシング ===== */</span>\n.section {\n  padding-block: <span class="fn">clamp</span>(<span class="nu">32px</span>, <span class="nu">8vw</span>, <span class="nu">96px</span>);\n  <span class="cm">/* 小画面: 32px → 大画面: 96px でなめらかに変化 */</span>\n}\n\n<span class="cm">/* ===== メディアクエリなしのレスポンシブグリッド ===== */</span>\n.auto-grid {\n  display: grid;\n  <span class="cm">/* min(280px, 100%): 親が280px未満でも列幅がはみ出さない */</span>\n  grid-template-columns: <span class="fn">repeat</span>(auto-fit, <span class="fn">minmax</span>(<span class="fn">min</span>(<span class="nu">280px</span>, <span class="nu">100</span>%), 1fr));\n  gap: <span class="nu">24px</span>;\n}\n\n<span class="cm">/* ===== 流体コンテナパディング ===== */</span>\n.container {\n  max-width: <span class="nu">1280px</span>;\n  margin-inline: auto;\n  padding-inline: <span class="fn">clamp</span>(<span class="nu">16px</span>, <span class="nu">5vw</span>, <span class="nu">48px</span>);\n  <span class="cm">/* モバイル16px → タブレット以降は画面幅の5%を確保 */</span>\n}',
                }}
              />
            </div>
          </div>
          <div className="sub" id="s9-5">
            <h3>{"9.5 レスポンシブ画像"}</h3>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"HTML"}</span>
                <span className="cb-name">{"srcset / sizes / picture 要素の活用"}</span>
              </div>
              <pre
                className="language-html"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">&lt;!-- srcset + sizes: ブラウザが最適解像度の画像を選択する --&gt;</span>\n&lt;img\n  src=<span class="st">"image-800w.jpg"</span>\n  srcset=<span class="st">"\n    image-320w.jpg   320w,\n    image-640w.jpg   640w,\n    image-800w.jpg   800w,\n    image-1200w.jpg 1200w\n  "</span>\n  sizes=<span class="st">"\n    (max-width: 640px)  100vw,\n    (max-width: 1024px) 50vw,\n    33vw\n  "</span>\n  alt=<span class="st">"製品の説明画像"</span>\n  loading=<span class="st">"lazy"</span>\n  decoding=<span class="st">"async"</span>\n&gt;\n\n<span class="cm">&lt;!-- picture要素: アート・ディレクション（縦横比を変える）--&gt;</span>\n&lt;picture&gt;\n  <span class="cm">&lt;!-- モバイル: 正方形クロップ --&gt;</span>\n  &lt;source media=<span class="st">"(max-width: 767px)"</span> srcset=<span class="st">"hero-square.jpg"</span>&gt;\n  <span class="cm">&lt;!-- デスクトップ: ワイドクロップ --&gt;</span>\n  &lt;source media=<span class="st">"(min-width: 768px)"</span> srcset=<span class="st">"hero-wide.jpg"</span>&gt;\n  <span class="cm">&lt;!-- フォールバック（必須）--&gt;</span>\n  &lt;img src=<span class="st">"hero-wide.jpg"</span> alt=<span class="st">"ヒーロービジュアル"</span>&gt;\n&lt;/picture&gt;',
                }}
              />
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"CSSでのレスポンシブ画像処理"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* アスペクト比固定コンテナ */</span>\n.img-frame {\n  aspect-ratio: <span class="nu">16</span> / <span class="nu">9</span>;\n  overflow: hidden;\n  border-radius: <span class="nu">12px</span>;\n}\n.img-frame img {\n  width: <span class="nu">100</span>%;\n  height: <span class="nu">100</span>%;\n  object-fit: cover;\n  object-position: center top; <span class="cm">/* 上部を優先（顔など）*/</span>\n}\n\n<span class="cm">/* 正方形アバター */</span>\n.avatar {\n  width: <span class="nu">48px</span>;\n  aspect-ratio: <span class="nu">1</span>; <span class="cm">/* = 1 / 1 */</span>\n  border-radius: <span class="nu">50</span>%;\n  object-fit: cover;\n}',
                }}
              />
            </div>
          </div>
          <div className="sub" id="s9-6">
            <h3>{"9.6 ベストプラクティス"}</h3>
            <div className="bp">
              <div className="bp-title">
                <span>{"✅"}</span>
                {"レスポンシブデザインのベストプラクティス"}
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>{"ブレークポイントはコンテンツが崩れた時点で設定する"}</strong>
                  <br />
                  {
                    "「iPhoneのサイズだから375px」ではなく、「このテキストが折り返される幅」「このカードが2列に入らなくなる幅」でブレークポイントを決めます。"
                  }
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>
                    <code>{"vh"}</code>
                    {"より"}
                    <code>{"svh"}</code>
                    {"/"}
                    <code>{"dvh"}</code>
                    {"を使う"}
                  </strong>
                  <br />
                  <code>{"100vh"}</code>
                  {"はiOSのブラウザUIバーを考慮せず、アドレスバー表示時に画面が崩れます。"}
                  <code>{"100svh"}</code>
                  {"（Small Viewport Height）を使いましょう。"}
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>{"タッチデバイスへのホバースタイルを適切に制御する"}</strong>
                  <br />
                  <code>{"@media (hover: hover) and (pointer: fine)"}</code>
                  {
                    "内にホバースタイルを書くことで、タッチデバイスで意図しないホバー状態が残り続けるのを防げます。"
                  }
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>{"コンテナクエリとメディアクエリを使い分ける"}</strong>
                  <br />
                  {"ページ全体のレイアウト変更は"}
                  <strong>{"メディアクエリ"}</strong>
                  {"、コンポーネント単位の見た目変更は"}
                  <strong>{"コンテナクエリ"}</strong>
                  {"が適切です。"}
                </div>
              </div>
            </div>
            <div className="sl">
              <div className="sl-item ng">
                <div className="sl-head">{"❌ NG — デバイス幅でブレークポイント"}</div>
                <div className="cb">
                  <pre
                    className="language-css"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<span class="cm">/* 特定デバイスへの依存 */</span>\n<span class="kw">@media</span> (max-width: <span class="nu">375px</span>) { } <span class="cm">/* iPhone SE */</span>\n<span class="kw">@media</span> (max-width: <span class="nu">428px</span>) { } <span class="cm">/* iPhone 14 Pro Max */</span>\n<span class="cm">/* 無数のデバイスに対応不可能 */</span>',
                    }}
                  />
                </div>
              </div>
              <div className="sl-item ok">
                <div className="sl-head">{"✅ OK — コンテンツ起点のブレークポイント"}</div>
                <div className="cb">
                  <pre
                    className="language-css"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<span class="cm">/* コンテンツが崩れる幅で設定 */</span>\n<span class="kw">@media</span> (max-width: <span class="nu">52rem</span>) {\n  .grid { grid-template-columns: 1fr; }\n}\n<span class="cm">/* デバイスに依存しない */</span>',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section" id="s10">
          <div className="ch-label">{"Chapter 10"}</div>
          <h2>
            <span className="n">{"10."}</span>
            {"アクセシビリティ（a11y）設計"}
          </h2>
          <div className="sub" id="s10-1">
            <h3>{"10.1 アクセシビリティとは何か"}</h3>
            <p>
              {"アクセシビリティ（a11y = accessibility の a と y の間に11文字）とは"}
              <strong>{"すべての人がウェブを利用できるよう設計すること"}</strong>
              {"です。障害を持つユーザーだけでなく、状況的制限のあるすべてのユーザーが対象です。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">{"図 10.1 — アクセシビリティが対象とするユーザー"}</div>
              <MermaidDiagram
                id="d-a11y-targets"
                chart={DIAGRAMS["d-a11y-targets"]}
                preserveNaturalScale={true}
              />
            </div>
            <div className="co tip">
              <span className="icon">{"💡"}</span>
              <div className="body">
                <strong>{"カーブカット効果（Curb Cut Effect）："}</strong>
                {
                  "歩道の縁石カット（車椅子用）が、ベビーカー・スーツケース・自転車を使う人全員に恩恵をもたらすように、アクセシビリティ対応は"
                }
                <strong>{"すべてのユーザーのUXを向上させます"}</strong>
                {"。アクセシビリティはコンプライアンスではなく、品質の問題です。"}
              </div>
            </div>
          </div>
          <div className="sub" id="s10-2">
            <h3>{"10.2 WCAG ガイドラインの構造"}</h3>
            <p>
              {"WCAG（Web Content Accessibility Guidelines）はW3Cが定める"}
              <strong>{"国際的なアクセシビリティ標準"}</strong>
              {"です。日本の公共機関ではAAレベルへの適合が求められます。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">{"図 10.2 — WCAG 2.2 の4原則（POUR）と適合レベル"}</div>
              <MermaidDiagram id="d-wcag" chart={DIAGRAMS["d-wcag"]} preserveNaturalScale={true} />
            </div>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>{"原則"}</th>
                    <th>{"意味"}</th>
                    <th>{"代表的な要件"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>{"Perceivable（知覚可能）"}</strong>
                    </td>
                    <td>{"情報を複数の手段で提供"}</td>
                    <td>{"altテキスト・字幕・色だけに頼らない"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"Operable（操作可能）"}</strong>
                    </td>
                    <td>{"キーボードでも操作できる"}</td>
                    <td>{"フォーカス可視化・スキップリンク"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"Understandable（理解可能）"}</strong>
                    </td>
                    <td>{"わかりやすいUIとエラー"}</td>
                    <td>{"ラベル・エラーメッセージ・予測可能な動作"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>{"Robust（堅牢）"}</strong>
                    </td>
                    <td>{"支援技術でも機能する"}</td>
                    <td>{"セマンティックHTML・ARIAの正しい使用"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="sub" id="s10-3">
            <h3>{"10.3 セマンティックHTML"}</h3>
            <p>
              {"セマンティックHTMLはアクセシビリティの"}
              <strong>{"最も重要な基礎"}</strong>
              {"です。適切な要素を使うだけで、多くのアクセシビリティ要件を自動的に満たします。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">
                {"図 10.3 — 非セマンティック vs セマンティックHTMLの恩恵"}
              </div>
              <MermaidDiagram
                id="d-semantic"
                chart={DIAGRAMS["d-semantic"]}
                preserveNaturalScale={true}
              />
            </div>
            <div className="sl">
              <div className="sl-item ng">
                <div className="sl-head">{"❌ NG — divだけで構成"}</div>
                <div className="cb">
                  <pre
                    className="language-html"
                    dangerouslySetInnerHTML={{
                      __html:
                        '&lt;div <span class="kw">class</span>=<span class="st">"page"</span>&gt;\n  &lt;div <span class="kw">class</span>=<span class="st">"header"</span>&gt;\n    &lt;div <span class="kw">class</span>=<span class="st">"nav"</span>&gt;\n      &lt;div <span class="kw">class</span>=<span class="st">"link"</span> onclick=<span class="st">"..."</span>&gt;ホーム&lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n  &lt;div <span class="kw">class</span>=<span class="st">"main"</span>&gt;\n    &lt;div <span class="kw">class</span>=<span class="st">"title"</span>&gt;タイトル&lt;/div&gt;\n    &lt;div <span class="kw">class</span>=<span class="st">"btn"</span> onclick=<span class="st">"..."</span>&gt;送信&lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;\n<span class="cm">&lt;!-- スクリーンリーダーが構造を読めない\n     キーボード操作ができない --&gt;</span>',
                    }}
                  />
                </div>
              </div>
              <div className="sl-item ok">
                <div className="sl-head">{"✅ OK — セマンティックなHTML"}</div>
                <div className="cb">
                  <pre
                    className="language-html"
                    dangerouslySetInnerHTML={{
                      __html:
                        '&lt;body&gt;\n  &lt;header&gt;\n    &lt;nav aria-label=<span class="st">"メインナビゲーション"</span>&gt;\n      &lt;ul role=<span class="st">"list"</span>&gt;\n        &lt;li&gt;&lt;a href=<span class="st">"/home"</span>&gt;ホーム&lt;/a&gt;&lt;/li&gt;\n      &lt;/ul&gt;\n    &lt;/nav&gt;\n  &lt;/header&gt;\n  &lt;main id=<span class="st">"main-content"</span>&gt;\n    &lt;section aria-labelledby=<span class="st">"hero-h"</span>&gt;\n      &lt;h1 id=<span class="st">"hero-h"</span>&gt;タイトル&lt;/h1&gt;\n      <span class="cm">&lt;!-- Enter/Space で操作可能 --&gt;</span>\n      &lt;button type=<span class="st">"button"</span>&gt;送信&lt;/button&gt;\n    &lt;/section&gt;\n  &lt;/main&gt;\n  &lt;footer&gt;...&lt;/footer&gt;\n&lt;/body&gt;',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>{"要素"}</th>
                    <th>{"意味"}</th>
                    <th>{"なぜ div で代替できないか"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>{"<button>"}</code>
                    </td>
                    <td>{"クリック可能な操作"}</td>
                    <td>{"Enter/Space キー操作・role=button が自動付与"}</td>
                  </tr>
                  <tr>
                    <td>
                      <code>{"<a href>"}</code>
                    </td>
                    <td>{"リンク（ナビゲーション）"}</td>
                    <td>{"Enter キー操作・role=link が自動付与"}</td>
                  </tr>
                  <tr>
                    <td>
                      <code>{"<input>"}</code>
                    </td>
                    <td>{"フォーム入力"}</td>
                    <td>
                      {"キーボード入力・"}
                      <code>{"<label>"}</code>
                      {"との関連付け"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>{"<nav>"}</code>
                    </td>
                    <td>{"ナビゲーション領域"}</td>
                    <td>{"スクリーンリーダーのランドマークとして認識"}</td>
                  </tr>
                  <tr>
                    <td>
                      <code>{"<main>"}</code>
                    </td>
                    <td>{"メインコンテンツ"}</td>
                    <td>{"スクリーンリーダーでスキップ先として機能"}</td>
                  </tr>
                  <tr>
                    <td>
                      <code>{"<h1>〜<h6>"}</code>
                    </td>
                    <td>{"見出し階層"}</td>
                    <td>{"スクリーンリーダーの目次機能として機能"}</td>
                  </tr>
                  <tr>
                    <td>
                      <code>{"<table>"}</code>
                    </td>
                    <td>{"表形式データ"}</td>
                    <td>
                      <code>{"<th scope>"}</code>
                      {"/"}
                      <code>{"<caption>"}</code>
                      {"でセルの関係を明示"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="sub" id="s10-4">
            <h3>{"10.4 キーボード操作対応"}</h3>
            <p>
              {"視覚障害・運動障害のあるユーザーの多くは"}
              <strong>{"キーボードのみ"}</strong>
              {"でウェブを操作します。マウスなしで完全に動作するUI設計は必須要件です。"}
            </p>
            <div className="mbox">
              <div className="mbox-t">{"図 10.4 — キーボード操作の基本ショートカット"}</div>
              <MermaidDiagram
                id="d-keyboard"
                chart={DIAGRAMS["d-keyboard"]}
                preserveNaturalScale={true}
              />
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"フォーカスインジケーターとスキップリンク"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* ===== 絶対に消してはいけない: フォーカスインジケーター ===== */</span>\n\n<span class="cm">/* ❌ 最悪のアンチパターン */</span>\n*:focus { outline: none; }\nbutton:focus { outline: <span class="nu">0</span>; }\n\n<span class="cm">/* ✅ マウス操作時は非表示、キーボード時のみ表示 */</span>\n:focus:<span class="fn">not</span>(:focus-visible) {\n  outline: none;  <span class="cm">/* クリック時などのフォーカスはアウトラインなし */</span>\n}\n:focus-visible {\n  outline: <span class="nu">2px</span> solid <span class="nu">#6C47FF</span>;  <span class="cm">/* キーボードフォーカス時は明確に表示 */</span>\n  outline-offset: <span class="nu">3px</span>;\n  border-radius: <span class="nu">4px</span>;\n}\n\n<span class="cm">/* ===== スキップリンク（ページ先頭のナビをスキップ）===== */</span>\n.skip-link {\n  position: absolute;\n  top: -<span class="nu">100</span>%;\n  left: <span class="nu">16px</span>;\n  padding: <span class="nu">8px</span> <span class="nu">16px</span>;\n  background: <span class="nu">#6C47FF</span>;\n  color: white;\n  border-radius: <span class="nu">8px</span>;\n  font-weight: <span class="nu">600</span>;\n  font-size: <span class="nu">14px</span>;\n  text-decoration: none;\n  z-index: <span class="nu">9999</span>;\n  transition: top <span class="nu">200ms</span> ease;\n}\n.skip-link:focus { top: <span class="nu">16px</span>; } <span class="cm">/* フォーカスで画面内に現れる */</span>',
                }}
              />
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"HTML"}</span>
                <span className="cb-name">{"スキップリンクの実装"}</span>
              </div>
              <pre
                className="language-html"
                dangerouslySetInnerHTML={{
                  __html:
                    '&lt;body&gt;\n  <span class="cm">&lt;!-- ページ最初の要素としてスキップリンクを配置 --&gt;</span>\n  &lt;a <span class="kw">class</span>=<span class="st">"skip-link"</span> href=<span class="st">"#main-content"</span>&gt;\n    メインコンテンツへスキップ\n  &lt;/a&gt;\n  &lt;header&gt;\n    &lt;nav&gt;<span class="cm">&lt;!-- 長いナビゲーション --&gt;</span>&lt;/nav&gt;\n  &lt;/header&gt;\n  <span class="cm">&lt;!-- tabindex="-1": JSでプログラム的にフォーカスできるように --&gt;</span>\n  &lt;main id=<span class="st">"main-content"</span> tabindex=<span class="st">"-1"</span>&gt;\n    <span class="cm">&lt;!-- メインコンテンツ --&gt;</span>\n  &lt;/main&gt;\n&lt;/body&gt;',
                }}
              />
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"JavaScript"}</span>
                <span className="cb-name">
                  {"フォーカストラップ（モーダル内にフォーカスを閉じ込める）"}
                </span>
              </div>
              <pre
                className="language-javascript"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="kw">function</span> <span class="fn">trapFocus</span>(modalElement) {\n  <span class="kw">const</span> focusable = modalElement.<span class="fn">querySelectorAll</span>(\n    <span class="st">\'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])\'</span>\n  );\n  <span class="kw">const</span> first = focusable[<span class="nu">0</span>];\n  <span class="kw">const</span> last  = focusable[focusable.length - <span class="nu">1</span>];\n\n  modalElement.<span class="fn">addEventListener</span>(<span class="st">\'keydown\'</span>, (e) =&gt; {\n    <span class="kw">if</span> (e.key !== <span class="st">\'Tab\'</span>) <span class="kw">return</span>;\n\n    <span class="kw">if</span> (e.shiftKey) {\n      <span class="cm">// Shift+Tab: 最初の要素にいたら最後に飛ぶ</span>\n      <span class="kw">if</span> (document.activeElement === first) {\n        last.<span class="fn">focus</span>();\n        e.<span class="fn">preventDefault</span>();\n      }\n    } <span class="kw">else</span> {\n      <span class="cm">// Tab: 最後の要素にいたら最初に飛ぶ</span>\n      <span class="kw">if</span> (document.activeElement === last) {\n        first.<span class="fn">focus</span>();\n        e.<span class="fn">preventDefault</span>();\n      }\n    }\n  });\n}',
                }}
              />
            </div>
          </div>
          <div className="sub" id="s10-5">
            <h3>{"10.5 スクリーンリーダー対応（ARIA）"}</h3>
            <p>
              {
                "ARIA（Accessible Rich Internet Applications）は、HTMLだけでは表現できないアクセシビリティ情報を補完します。"
              }
              <strong>{"第一原則：ネイティブHTMLを優先する。ARIAは最後の手段。"}</strong>
            </p>
            <div className="mbox">
              <div className="mbox-t">
                {"図 10.5 — WAI-ARIAの3カテゴリ（roles / properties / states）"}
              </div>
              <MermaidDiagram id="d-aria" chart={DIAGRAMS["d-aria"]} preserveNaturalScale={true} />
            </div>
            <div className="sl">
              <div className="sl-item ng">
                <div className="sl-head">{"❌ NG — div + ARIA で疑似ボタンを作る"}</div>
                <div className="cb">
                  <pre
                    className="language-html"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<span class="cm">&lt;!-- 複雑でキーボード操作のJS実装が必要 --&gt;</span>\n&lt;div role=<span class="st">"button"</span> tabindex=<span class="st">"0"</span> aria-pressed=<span class="st">"false"</span>\n     onkeydown=<span class="st">"if(event.key===\'Enter\'||event.key===\' \')handleClick()"</span>\n     onclick=<span class="st">"handleClick()"</span>&gt;\n  クリック\n&lt;/div&gt;',
                    }}
                  />
                </div>
              </div>
              <div className="sl-item ok">
                <div className="sl-head">{"✅ OK — ネイティブ button 要素を使う"}</div>
                <div className="cb">
                  <pre
                    className="language-html"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<span class="cm">&lt;!-- 標準でキーボード操作に対応、ARIA属性も自動適用 --&gt;</span>\n&lt;button type=<span class="st">"button"</span> aria-pressed=<span class="st">"false"</span>&gt;\n  クリック\n&lt;/button&gt;',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"HTML"}</span>
                <span className="cb-name">{"よく使うARIAパターン集"}</span>
              </div>
              <pre
                className="language-html"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">&lt;!-- ① ラベルの提供: 視覚的ラベルがない場合 --&gt;</span>\n&lt;button aria-label=<span class="st">"メニューを閉じる"</span>&gt;\n  <span class="cm">&lt;!-- aria-hidden: スクリーンリーダーからアイコンを隠す --&gt;</span>\n  &lt;svg aria-hidden=<span class="st">"true"</span> focusable=<span class="st">"false"</span>&gt;...&lt;/svg&gt;\n&lt;/button&gt;\n\n<span class="cm">&lt;!-- ② 追加説明の関連付け --&gt;</span>\n&lt;label for=<span class="st">"email"</span>&gt;メールアドレス&lt;/label&gt;\n&lt;input\n  id=<span class="st">"email"</span> type=<span class="st">"email"</span>\n  aria-describedby=<span class="st">"email-hint email-error"</span>\n  aria-invalid=<span class="st">"true"</span>\n  aria-required=<span class="st">"true"</span>\n&gt;\n&lt;p id=<span class="st">"email-hint"</span>&gt;会社のメールアドレスを入力してください&lt;/p&gt;\n&lt;p id=<span class="st">"email-error"</span> role=<span class="st">"alert"</span>&gt;有効なメールアドレスを入力してください&lt;/p&gt;\n\n<span class="cm">&lt;!-- ③ 展開・折り畳み（アコーディオン）--&gt;</span>\n&lt;button aria-expanded=<span class="st">"false"</span> aria-controls=<span class="st">"panel-1"</span> id=<span class="st">"trigger-1"</span>&gt;\n  セクション<span class="nu">1</span>\n&lt;/button&gt;\n&lt;div id=<span class="st">"panel-1"</span> role=<span class="st">"region"</span> aria-labelledby=<span class="st">"trigger-1"</span> hidden&gt;\n  パネルのコンテンツ\n&lt;/div&gt;\n\n<span class="cm">&lt;!-- ④ ライブリージョン（動的に変化するコンテンツ）--&gt;</span>\n&lt;div role=<span class="st">"status"</span> aria-live=<span class="st">"polite"</span>&gt;   <span class="cm">&lt;!-- 穏やかな通知 --&gt;</span>\n  <span class="nu">3</span>件の結果が見つかりました\n&lt;/div&gt;\n&lt;div role=<span class="st">"alert"</span> aria-live=<span class="st">"assertive"</span>&gt;  <span class="cm">&lt;!-- 緊急通知（エラー）--&gt;</span>\n  エラーが発生しました。もう一度お試しください。\n&lt;/div&gt;\n\n<span class="cm">&lt;!-- ⑤ ランドマーク（ページの主要エリアを明示）--&gt;</span>\n&lt;header role=<span class="st">"banner"</span>&gt;...&lt;/header&gt;\n&lt;nav aria-label=<span class="st">"パンくずリスト"</span>&gt;...&lt;/nav&gt;\n&lt;nav aria-label=<span class="st">"メインナビゲーション"</span>&gt;...&lt;/nav&gt;\n&lt;main role=<span class="st">"main"</span>&gt;...&lt;/main&gt;\n&lt;aside aria-label=<span class="st">"関連リンク"</span>&gt;...&lt;/aside&gt;\n&lt;footer role=<span class="st">"contentinfo"</span>&gt;...&lt;/footer&gt;',
                }}
              />
            </div>
          </div>
          <div className="sub" id="s10-6">
            <h3>{"10.6 カラーとコントラスト"}</h3>
            <p>
              {"色覚特性（色盲）のユーザーは人口の約8%（男性）に存在します。"}
              <strong>{"色だけで情報を伝えてはいけません"}</strong>
              {"。"}
            </p>
            <div className="sl">
              <div className="sl-item ng">
                <div className="sl-head">{"❌ NG — 赤いボーダーだけでエラーを示す"}</div>
                <div className="cb">
                  <pre
                    className="language-html"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<span class="cm">&lt;!-- 色覚特性のユーザーには伝わらない --&gt;</span>\n&lt;input <span class="kw">class</span>=<span class="st">"is-error"</span> type=<span class="st">"text"</span>&gt;',
                    }}
                  />
                </div>
              </div>
              <div className="sl-item ok">
                <div className="sl-head">{"✅ OK — 色+アイコン+テキストを組み合わせる"}</div>
                <div className="cb">
                  <pre
                    className="language-html"
                    dangerouslySetInnerHTML={{
                      __html:
                        '&lt;div <span class="kw">class</span>=<span class="st">"form-field"</span>&gt;\n  &lt;input type=<span class="st">"text"</span> aria-invalid=<span class="st">"true"</span> aria-describedby=<span class="st">"error-msg"</span>&gt;\n  &lt;p id=<span class="st">"error-msg"</span> <span class="kw">class</span>=<span class="st">"error-message"</span>&gt;\n    &lt;svg aria-hidden=<span class="st">"true"</span> <span class="kw">class</span>=<span class="st">"error-icon"</span>&gt;...&lt;/svg&gt;\n    このフィールドは必須です\n  &lt;/p&gt;\n&lt;/div&gt;',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"CSS"}</span>
                <span className="cb-name">{"エラー状態とアニメーション抑制のCSS"}</span>
              </div>
              <pre
                className="language-css"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">/* ===== フォームエラーの視覚的表現（色以外でも伝える） ===== */</span>\n.form-field--error .input {\n  border-color: <span class="fn">var</span>(--color-feedback-danger);\n  border-width: <span class="nu">2px</span>;\n  background-image: <span class="fn">url</span>(<span class="st">"data:image/svg+xml,..."</span>);\n}\n\n<span class="cm">/* prefers-reduced-motion: アニメーション抑制設定を尊重する */</span>\n.modal {\n  transition: opacity <span class="nu">300ms</span> ease, transform <span class="nu">300ms</span> ease;\n  transform: <span class="fn">translateY</span>(<span class="nu">8px</span>);\n  opacity: <span class="nu">0</span>;\n}\n.modal.is-open { transform: <span class="fn">translateY</span>(<span class="nu">0</span>); opacity: <span class="nu">1</span>; }\n\n<span class="kw">@media</span> (prefers-reduced-motion: reduce) {\n  .modal {\n    transition: opacity <span class="nu">150ms</span> ease; <span class="cm">/* フェードのみ */</span>\n    transform: none;\n  }\n  *, *::before, *::after {\n    animation-play-state: paused !important;\n  }\n  video[autoplay] {\n    animation-play-state: paused;\n  }\n}',
                }}
              />
            </div>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>{"要件"}</th>
                    <th>{"WCAG AA（推奨）"}</th>
                    <th>{"WCAG AAA（最高基準）"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{"通常テキスト（18px未満）"}</td>
                    <td>{"4.5:1 以上"}</td>
                    <td>{"7:1 以上"}</td>
                  </tr>
                  <tr>
                    <td>{"大きいテキスト（18px以上 または 太字14px以上）"}</td>
                    <td>{"3:1 以上"}</td>
                    <td>{"4.5:1 以上"}</td>
                  </tr>
                  <tr>
                    <td>{"UIコンポーネント・ボーダー・アイコン"}</td>
                    <td>{"3:1 以上"}</td>
                    <td>{"3:1 以上"}</td>
                  </tr>
                  <tr>
                    <td>{"装飾目的のみ"}</td>
                    <td>{"要件なし"}</td>
                    <td>{"要件なし"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="sub" id="s10-7">
            <h3>{"10.7 ベストプラクティス"}</h3>
            <div className="bp">
              <div className="bp-title">
                <span>{"✅"}</span>
                {"アクセシビリティのベストプラクティス"}
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>{"画像には常に適切なaltテキストを設定する"}</strong>
                  <br />
                  {"情報を持つ画像は内容を説明するaltを、装飾的な画像は "}
                  <code>{'alt=""'}</code>
                  {"（空文字）を設定します。空altは「読み飛ばす」という明示的な指示です。"}
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>
                    {"フォームは "}
                    <code>{"<label>"}</code>
                    {" と "}
                    <code>{"<input>"}</code>
                    {" を必ず関連付ける"}
                  </strong>
                  <br />
                  <code>{"placeholder"}</code>
                  {"だけのラベルは入力時に消えてしまいます。"}
                  <code>{'<label for="id">'}</code>
                  {"による明示的な関連付けが必須です。"}
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>
                    {"テーブルは "}
                    <code>{"<th scope>"}</code>
                    {" と "}
                    <code>{"<caption>"}</code>
                    {" を使う"}
                  </strong>
                  <br />
                  <code>{'scope="col"'}</code>
                  {"（列ヘッダー）・"}
                  <code>{'scope="row"'}</code>
                  {
                    "（行ヘッダー）でスクリーンリーダーがデータとヘッダーの関係を正確に読み上げられます。"
                  }
                </div>
              </div>
              <div className="bp-item">
                <div className="mk">{"✓"}</div>
                <div>
                  <strong>{"自動化テストで継続的にチェックする"}</strong>
                  <br />
                  {"axe-coreなどのツールをCI/CDに組み込み、アクセシビリティの回帰を防止します。"}
                </div>
              </div>
            </div>
            <div className="cb">
              <div className="cb-h">
                <span className="cb-lang">{"JavaScript"}</span>
                <span className="cb-name">{"axe-coreによるアクセシビリティテスト自動化"}</span>
              </div>
              <pre
                className="language-javascript"
                dangerouslySetInnerHTML={{
                  __html:
                    '<span class="cm">// === CI でのコマンドラインチェック ===</span>\n<span class="cm">// npm install --save-dev @axe-core/cli</span>\n<span class="cm">// npx axe http://localhost:3000 --exit</span>\n\n<span class="cm">// === Jest / Vitest + React Testing Library ===</span>\n<span class="kw">import</span> { render } <span class="kw">from</span> <span class="st">\'@testing-library/react\'</span>;\n<span class="kw">import</span> { axe, toHaveNoViolations } <span class="kw">from</span> <span class="st">\'jest-axe\'</span>;\nexpect.<span class="fn">extend</span>(toHaveNoViolations);\n\n<span class="fn">test</span>(<span class="st">\'Button にアクセシビリティ違反がないこと\'</span>, <span class="fn">async</span> () =&gt; {\n  <span class="kw">const</span> { container } = <span class="fn">render</span>(&lt;Button&gt;送信&lt;/Button&gt;);\n  <span class="kw">const</span> results = await <span class="fn">axe</span>(container);\n  <span class="fn">expect</span>(results).<span class="fn">toHaveNoViolations</span>();\n});',
                }}
              />
            </div>
          </div>
        </section>
        <section className="section" id="summary">
          <div className="ch-label">{"まとめ"}</div>
          <h2>
            <span className="n">{"〆"}</span>
            {"4トピックの関係性"}
          </h2>
          <p>
            {"4つのトピックは独立したものではなく、"}
            <strong>{"相互に支え合う設計哲学"}</strong>
            {"として統合されます。"}
          </p>
          <div className="mbox">
            <div className="mbox-t">{"図 〆 — 優れたデザインシステムを構成する4つの柱"}</div>
            <MermaidDiagram
              id="d-summary"
              chart={DIAGRAMS["d-summary"]}
              preserveNaturalScale={true}
            />
          </div>
          <div className="sg">
            <div className="sc c1">
              <div className="num">{"7"}</div>
              <div className="lbl">{"グリッド・レイアウト"}</div>
              <div className="desc">{"Flexbox + Gridで要素をどこに置くかを決定する基盤"}</div>
            </div>
            <div className="sc c2">
              <div className="num">{"8"}</div>
              <div className="lbl">{"コンポーネント設計"}</div>
              <div className="desc">{"BEM + バリアント設計でUIを再利用可能な部品に分割"}</div>
            </div>
            <div className="sc c3">
              <div className="num">{"9"}</div>
              <div className="lbl">{"レスポンシブ"}</div>
              <div className="desc">{"コンテナクエリ + clamp()で全デバイスに最適化"}</div>
            </div>
            <div className="sc c4">
              <div className="num">{"10"}</div>
              <div className="lbl">{"アクセシビリティ"}</div>
              <div className="desc">{"セマンティックHTML + ARIAで全員が使えるUIを実現"}</div>
            </div>
          </div>
          <div className="co ok">
            <span className="icon">{"🎯"}</span>
            <div className="body">
              <strong>{"学習の進め方："}</strong>
              {
                "まずCh.7（Flexbox/Grid）でレイアウトの基礎を固め → Ch.8（BEM）で命名規則を習得 → Ch.9（レスポンシブ）で実デバイス対応 → Ch.10（a11y）を後付けではなく設計段階から組み込む、という順序が最も効果的です。"
              }
            </div>
          </div>
        </section>
        <section className="section" id="refs">
          <div className="ch-label">{"参考リソース"}</div>
          <h2>
            <span className="n">{"🔗"}</span>
            {"公式ドキュメント・学習リソース"}
          </h2>
          <h4>{"グリッド・レイアウトシステム"}</h4>
          <div className="rg">
            <a
              className="rg-a"
              href="https://developer.mozilla.org/ja/docs/Web/CSS/CSS_grid_layout"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"MDN Web Docs"}</div>
              <div className="rg-t">{"CSS Grid Layout"}</div>
              <div className="rg-u">{"developer.mozilla.org"}</div>
            </a>
            <a
              className="rg-a"
              href="https://developer.mozilla.org/ja/docs/Web/CSS/CSS_flexible_box_layout"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"MDN Web Docs"}</div>
              <div className="rg-t">{"CSS Flexible Box Layout"}</div>
              <div className="rg-u">{"developer.mozilla.org"}</div>
            </a>
            <a
              className="rg-a"
              href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"CSS-Tricks"}</div>
              <div className="rg-t">{"A Complete Guide to Flexbox"}</div>
              <div className="rg-u">{"css-tricks.com"}</div>
            </a>
            <a
              className="rg-a"
              href="https://css-tricks.com/snippets/css/complete-guide-grid/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"CSS-Tricks"}</div>
              <div className="rg-t">{"A Complete Guide to CSS Grid"}</div>
              <div className="rg-u">{"css-tricks.com"}</div>
            </a>
            <a
              className="rg-a"
              href="https://every-layout.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"Every Layout"}</div>
              <div className="rg-t">{"レイアウトプリミティブ集"}</div>
              <div className="rg-u">{"every-layout.dev"}</div>
            </a>
            <a
              className="rg-a"
              href="https://ryanmulligan.dev/blog/layout-breakouts/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"Ryan Mulligan"}</div>
              <div className="rg-t">{"Full-Bleed Layout"}</div>
              <div className="rg-u">{"ryanmulligan.dev"}</div>
            </a>
            <a
              className="rg-a"
              href="https://gridbyexample.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"Rachel Andrew"}</div>
              <div className="rg-t">{"Grid by Example"}</div>
              <div className="rg-u">{"gridbyexample.com"}</div>
            </a>
          </div>
          <h4>{"コンポーネント設計・BEM"}</h4>
          <div className="rg">
            <a
              className="rg-a"
              href="https://bem.info/en/methodology/quick-start/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"BEM"}</div>
              <div className="rg-t">{"BEM 公式ドキュメント"}</div>
              <div className="rg-u">{"bem.info"}</div>
            </a>
            <a
              className="rg-a"
              href="https://bem.info/en/methodology/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"BEM Methodology"}</div>
              <div className="rg-t">{"BEM Methodology (公式)"}</div>
              <div className="rg-u">{"bem.info"}</div>
            </a>
            <a
              className="rg-a"
              href="https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"ITCSS (Harry Roberts)"}</div>
              <div className="rg-t">{"Manage large CSS projects"}</div>
              <div className="rg-u">{"creativebloq.com"}</div>
            </a>
            <a
              className="rg-a"
              href="https://github.com/css-modules/css-modules"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"CSS Modules"}</div>
              <div className="rg-t">{"CSS Modules 公式"}</div>
              <div className="rg-u">{"github.com"}</div>
            </a>
          </div>
          <h4>{"レスポンシブデザインシステム"}</h4>
          <div className="rg">
            <a
              className="rg-a"
              href="https://developer.mozilla.org/ja/docs/Learn_web_development/Core/CSS_layout/Responsive_Design"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"MDN Web Docs"}</div>
              <div className="rg-t">{"レスポンシブデザイン"}</div>
              <div className="rg-u">{"developer.mozilla.org"}</div>
            </a>
            <a
              className="rg-a"
              href="https://developer.mozilla.org/ja/docs/Web/CSS/CSS_containment/Container_queries"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"MDN Web Docs"}</div>
              <div className="rg-t">{"コンテナクエリ"}</div>
              <div className="rg-u">{"developer.mozilla.org"}</div>
            </a>
            <a
              className="rg-a"
              href="https://web.dev/learn/design/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"web.dev"}</div>
              <div className="rg-t">{"Responsive Design"}</div>
              <div className="rg-u">{"web.dev"}</div>
            </a>
            <a
              className="rg-a"
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-percentage_lengths"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"MDN Web Docs"}</div>
              <div className="rg-t">{"svh / dvh / lvh 単位"}</div>
              <div className="rg-u">{"developer.mozilla.org"}</div>
            </a>
            <a
              className="rg-a"
              href="https://web.dev/articles/one-line-layouts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"web.dev"}</div>
              <div className="rg-t">{"Ten modern layouts in one line of CSS"}</div>
              <div className="rg-u">{"web.dev"}</div>
            </a>
          </div>
          <h4>{"アクセシビリティ（a11y）"}</h4>
          <div className="rg">
            <a
              className="rg-a"
              href="https://www.w3.org/TR/WCAG21/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"W3C"}</div>
              <div className="rg-t">{"WCAG 2.1 公式"}</div>
              <div className="rg-u">{"w3.org"}</div>
            </a>
            <a
              className="rg-a"
              href="https://waic.jp/translations/WCAG21/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"WAIC"}</div>
              <div className="rg-t">{"WCAG 2.1 日本語訳"}</div>
              <div className="rg-u">{"waic.jp"}</div>
            </a>
            <a
              className="rg-a"
              href="https://www.w3.org/TR/wai-aria-1.2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"W3C"}</div>
              <div className="rg-t">{"WAI-ARIA 1.2 公式"}</div>
              <div className="rg-u">{"w3.org"}</div>
            </a>
            <a
              className="rg-a"
              href="https://www.w3.org/WAI/ARIA/apg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"W3C APG"}</div>
              <div className="rg-t">{"ARIA Authoring Practices Guide"}</div>
              <div className="rg-u">{"w3.org"}</div>
            </a>
            <a
              className="rg-a"
              href="https://developer.mozilla.org/ja/docs/Web/Accessibility"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"MDN Web Docs"}</div>
              <div className="rg-t">{"アクセシビリティ"}</div>
              <div className="rg-u">{"developer.mozilla.org"}</div>
            </a>
            <a
              className="rg-a"
              href="https://www.a11yproject.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"The A11Y Project"}</div>
              <div className="rg-t">{"A11Y Project"}</div>
              <div className="rg-u">{"a11yproject.com"}</div>
            </a>
            <a
              className="rg-a"
              href="https://github.com/dequelabs/axe-core"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"axe-core"}</div>
              <div className="rg-t">{"axe-core テストツール"}</div>
              <div className="rg-u">{"github.com"}</div>
            </a>
            <a
              className="rg-a"
              href="https://webaim.org/projects/screenreadersurvey9/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"WebAIM"}</div>
              <div className="rg-t">{"Screen Reader Survey"}</div>
              <div className="rg-u">{"webaim.org"}</div>
            </a>
            <a
              className="rg-a"
              href="https://inclusive-components.design/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rg-l">{"Inclusive Components"}</div>
              <div className="rg-t">{"Inclusive Components"}</div>
              <div className="rg-u">{"inclusive-components.design"}</div>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
