import type { Metadata } from "next";
import MermaidDiagram from "@/components/MermaidDiagram";
import { DIAGRAMS } from "./diagrams";
import Navigation from "./Navigation";
export const metadata: Metadata = {
  title: "アニメーション・CSSアーキテクチャ・デザイントークン完全ガイド | Vol.4",
  description:
    "「動きで伝える」アニメーション設計から、大規模開発を支えるCSSアーキテクチャ、\n        Figma〜コードを繋ぐデザイントークン、そして実践的なコンポーネント実装・パフォーマンス最適化・開発ツールチェーンまで。\n        初学者にもわかるように一歩ずつ、しかし実務でそのまま使える解像度で解説します。",
};
export default function Page() {
  return (
    <div className="normal-animation-architecture-tokens-performance-tools">
      <div className={"layout"}>
        {"\n\n  "}
        {"\n  "}
        <Navigation>
          {"\n    "}
          <div className={"sidebar__brand"}>
            {"\n      "}
            <div className={"sidebar__brand-mark"}>{"CSS"}</div>
            {"\n      "}
            <div className={"sidebar__brand-text"}>
              {"CSS設計 完全ガイド"}
              <span>{"Vol.4 — Animation & Architecture"}</span>
            </div>
            {"\n    "}
          </div>
          {"\n\n    "}
          <div className={"toc-group"}>
            {"\n      "}
            <div className={"toc-group__label"}>{"導入"}</div>
            {"\n      "}
            <a href={"#top"} className={"toc-link"} data-toc={""}>
              <span className={"num"}>{"―"}</span>
              {"はじめに"}
            </a>
            {"\n    "}
          </div>
          {"\n\n    "}
          <div className={"toc-group"}>
            {"\n      "}
            <div className={"toc-group__label"}>{"本編"}</div>
            {"\n      "}
            <a href={"#ch11"} className={"toc-link"} data-toc={""}>
              <span className={"num"}>{"11"}</span>
              {"アニメーション・トランジション"}
            </a>
            {"\n      "}
            <a href={"#ch12"} className={"toc-link"} data-toc={""}>
              <span className={"num"}>{"12"}</span>
              {"CSSアーキテクチャパターン"}
            </a>
            {"\n      "}
            <a href={"#ch13"} className={"toc-link"} data-toc={""}>
              <span className={"num"}>{"13"}</span>
              {"デザイントークン"}
            </a>
            {"\n      "}
            <a href={"#ch14"} className={"toc-link"} data-toc={""}>
              <span className={"num"}>{"14"}</span>
              {"実践：Modal実装例"}
            </a>
            {"\n      "}
            <a href={"#ch15"} className={"toc-link"} data-toc={""}>
              <span className={"num"}>{"15"}</span>
              {"パフォーマンス最適化"}
            </a>
            {"\n      "}
            <a href={"#ch16"} className={"toc-link"} data-toc={""}>
              <span className={"num"}>{"16"}</span>
              {"ツール・エコシステム"}
            </a>
            {"\n    "}
          </div>
          {"\n\n    "}
          <div className={"toc-group"}>
            {"\n      "}
            <div className={"toc-group__label"}>{"まとめ"}</div>
            {"\n      "}
            <a href={"#maturity"} className={"toc-link"} data-toc={""}>
              <span className={"num"}>{"―"}</span>
              {"成熟度モデル"}
            </a>
            {"\n      "}
            <a href={"#allrefs"} className={"toc-link"} data-toc={""}>
              <span className={"num"}>{"―"}</span>
              {"参考文献一覧"}
            </a>
            {"\n    "}
          </div>
          {"\n\n    "}
          <div className={"sidebar__progress"}>
            {"\n      "}
            <div className={"sidebar__progress-label"}>
              <span>{"読了進捗"}</span>
              <span id={"progressPct"}>{"0%"}</span>
            </div>
            {"\n      "}
            <div className={"sidebar__progress-track"}>
              <div className={"sidebar__progress-bar"} id={"progressBar"}></div>
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </Navigation>
        {"\n\n  "}
        {"\n  "}
        <main className={"main"} id={"top"}>
          {"\n\n    "}
          <header className={"hero"}>
            {"\n      "}
            <span className={"hero__eyebrow"}>
              {"🔴 上級編 ・ 6 Chapters ・ 最終更新 2026-05-27"}
            </span>
            {"\n      "}
            <h1 className={"hero__title"}>
              {"アニメーション・"}
              <em>{"CSSアーキテクチャ"}</em>
              {"・デザイントークン"}
              <br />
              {"完全ガイド"}
            </h1>
            {"\n      "}
            <p className={"hero__lead"}>
              {
                "\n        「動きで伝える」アニメーション設計から、大規模開発を支えるCSSアーキテクチャ、\n        Figma〜コードを繋ぐデザイントークン、そして実践的なコンポーネント実装・パフォーマンス最適化・開発ツールチェーンまで。\n        初学者にもわかるように一歩ずつ、しかし実務でそのまま使える解像度で解説します。\n      "
              }
            </p>
            {"\n      "}
            <div className={"hero__meta"}>
              {"\n        "}
              <span className={"meta-chip"}>
                <span className={"dot"} style={{ background: "var(--c-blue)" }}></span>
                {"対象：中級〜上級者"}
              </span>
              {"\n        "}
              <span className={"meta-chip"}>
                <span className={"dot"} style={{ background: "var(--c-orange)" }}></span>
                {"全6章 + 実践1章"}
              </span>
              {"\n        "}
              <span className={"meta-chip"}>
                <span className={"dot"} style={{ background: "var(--c-green)" }}></span>
                {"Mermaid図 30+"}
              </span>
              {"\n        "}
              <span className={"meta-chip"}>
                <span className={"dot"} style={{ background: "var(--c-purple)" }}></span>
                {"参考ソースURL付き"}
              </span>
              {"\n      "}
            </div>
            {"\n    "}
          </header>
          {"\n\n    "}
          {"\n    "}
          <section className={"chapter"} id={"ch11"}>
            {"\n      "}
            <div className={"chapter__kicker"}>
              <span className={"chapter__num"}>{"CHAPTER 11"}</span>
              <span className={"chapter__rule"}></span>
            </div>
            {"\n      "}
            <h2>{"アニメーション・トランジションシステム"}</h2>
            {"\n      "}
            <p className={"chapter__intro"}>
              {"\n        CSSアニメーションは「画面を派手にする飾り」ではありません。"}
              <strong>{"ユーザーに今何が起きているかを伝えるための言語"}</strong>
              {
                "です。\n        この章では、なぜアニメーションが必要なのか、どんな速さ・どんな動き方が適切なのかをトークン（変数）として体系化し、\n        実装方法（Transition / Animation / View Transitions API）からアクセシビリティ配慮までを一気通貫で解説します。\n      "
              }
            </p>
            {"\n\n      "}
            <div className={"beginner-box"}>
              {"\n        "}
              <div className={"beginner-box__label"}>
                {"🔰 初学者向け：そもそも transition と animation の違いは？"}
              </div>
              {"\n        "}
              <p>
                <code>{"transition"}</code>
                {" は「ある状態からある状態へ」変化する時の橋渡し役です。例えば、ボタンに "}
                <code>{":hover"}</code>
                {
                  " が当たった瞬間の色変化に使います。2つの状態（前と後）さえ指定すれば、間の動きはブラウザが自動補間してくれます。"
                }
              </p>
              {"\n        "}
              <p>
                <code>{"animation"}</code>
                {"（"}
                <code>{"@keyframes"}</code>
                {
                  "）は、もっと自由な動きを「振り付け」できる仕組みです。0%地点・50%地点・100%地点…と細かく状態を指定でき、ループさせたり、ページを開いた瞬間に自動再生させたりできます。「2点間の単純な変化」なら transition、「複雑な一連の動き」なら animation、と覚えておくと選択に迷いません。"
                }
              </p>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch11-1"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-purple-bg)", color: "var(--c-purple-tx)" }}
                >
                  {"①"}
                </span>
                {"11.1 アニメーションシステムの目的"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          優れたアニメーションには必ず「目的」があります。なんとなく動かすのではなく、以下の5つの役割のどれを果たすために動かすのかを、実装前に言語化する習慣をつけましょう。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "アニメーションの5つの役割：フィードバック、継続性、状態変化の通知、階層の表現、注目の誘導"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[0]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図11-1：アニメーションが果たすべき5つの役割"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <p>
                {
                  "\n          逆に言えば、この5つのどれにも当てはまらないアニメーション（例：ページを開いた瞬間に意味もなく要素が回転する）は、ユーザーの注意力を奪うだけのノイズになりがちです。実装の前に「このアニメーションは誰の何を助けるのか」を一言で説明できるか、自分に問いかけてみてください。\n        "
                }
              </p>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch11-2"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-blue-bg)", color: "var(--c-blue-tx)" }}
                >
                  {"②"}
                </span>
                {"11.2 イージング（Easing）システム"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          イージングとは「アニメーションの速度変化のカーブ」のことです。現実世界の物体は急に動き出して急に止まったりはせず、加速・減速を伴います。CSSのデフォルト挙動である"
                }
                <code>{"ease"}</code>
                {
                  "のままでもそれっぽく見えますが、デザインシステムとしては用途別にイージングを定義し、一貫した「動きの質感」をプロダクト全体で統一することが重要です。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "イージングの種類: linear, ease-in, ease-out, ease-in-out, cubic-bezier とそれぞれの用途"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[1]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>{"📊 図11-2：5種類のイージングと適した用途"}</p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"beginner-box"}>
                {"\n          "}
                <div className={"beginner-box__label"}>{"🔰 初学者向け：覚え方のコツ"}</div>
                {"\n          "}
                <p>
                  <strong>
                    {
                      "ease-out（出口がゆっくり）は「登場」に、ease-in（入口がゆっくり）は「退場」に使う"
                    }
                  </strong>
                  {
                    "、と覚えるのが一番簡単です。新しく現れる要素は最初は元気よく動き出し最後はそっと収まる方が自然に見え（ease-out）、消える要素は逆に最初はゆっくり、最後は加速して消えていく方が自然に見えます（ease-in）。迷ったら、まず "
                  }
                  <code>{"ease-out"}</code>
                  {" を使ってみましょう。"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"tokens/easing.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== イージングトークンの定義 ===== */</span>\n:root {\n  <span class="cm">/* 標準イージング */</span>\n  <span class="kw">--ease-linear</span>:     linear;\n  <span class="kw">--ease-in</span>:         <span class="fn">cubic-bezier</span>(<span class="nu">0.4</span>, <span class="nu">0</span>, <span class="nu">1</span>, <span class="nu">1</span>);\n  <span class="kw">--ease-out</span>:        <span class="fn">cubic-bezier</span>(<span class="nu">0</span>, <span class="nu">0</span>, <span class="nu">0.2</span>, <span class="nu">1</span>);\n  <span class="kw">--ease-in-out</span>:     <span class="fn">cubic-bezier</span>(<span class="nu">0.4</span>, <span class="nu">0</span>, <span class="nu">0.2</span>, <span class="nu">1</span>);\n\n  <span class="cm">/* ブランド固有のイージング */</span>\n  <span class="kw">--ease-spring</span>:     <span class="fn">cubic-bezier</span>(<span class="nu">0.34</span>, <span class="nu">1.56</span>, <span class="nu">0.64</span>, <span class="nu">1</span>);  <span class="cm">/* バネのような弾み */</span>\n  <span class="kw">--ease-smooth</span>:     <span class="fn">cubic-bezier</span>(<span class="nu">0.25</span>, <span class="nu">0.1</span>, <span class="nu">0.25</span>, <span class="nu">1</span>);    <span class="cm">/* なめらかな動き */</span>\n  <span class="kw">--ease-anticipate</span>: <span class="fn">cubic-bezier</span>(<span class="nu">0.36</span>, <span class="nu">0</span>, <span class="nu">0.66</span>, -<span class="nu">0.56</span>);  <span class="cm">/* 少し引いてから進む */</span>\n\n  <span class="cm">/* 物理ベースのイージング（Material Design 3） */</span>\n  <span class="kw">--ease-emphasized</span>:            <span class="fn">cubic-bezier</span>(<span class="nu">0.2</span>, <span class="nu">0</span>, <span class="nu">0</span>, <span class="nu">1</span>);\n  <span class="kw">--ease-emphasized-decelerate</span>: <span class="fn">cubic-bezier</span>(<span class="nu">0.05</span>, <span class="nu">0.7</span>, <span class="nu">0.1</span>, <span class="nu">1</span>);\n  <span class="kw">--ease-emphasized-accelerate</span>: <span class="fn">cubic-bezier</span>(<span class="nu">0.3</span>, <span class="nu">0</span>, <span class="nu">0.8</span>, <span class="nu">0.15</span>);\n  <span class="kw">--ease-standard</span>:              <span class="fn">cubic-bezier</span>(<span class="nu">0.2</span>, <span class="nu">0</span>, <span class="nu">0</span>, <span class="nu">1</span>);\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch11-3"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-green-bg)", color: "var(--c-green-tx)" }}
                >
                  {"③"}
                </span>
                {"11.3 デュレーション（Duration）システム"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          デュレーションは「動きの長さ」です。短すぎると気づかれず、長すぎるとユーザーを待たせてしまいます。経験則として、"
                }
                <strong>{"操作対象が画面内で小さいほど短く、画面全体が変わるほど長く"}</strong>
                {"するのが基本です。\n        "}
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "デュレーションの段階: instant 0ms から slowest 700ms以上まで、用途とともに6段階"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[2]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図11-3：用途別デュレーションの6段階スケール"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"tokens/duration.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== デュレーショントークン ===== */</span>\n:root {\n  <span class="kw">--duration-instant</span>:  <span class="nu">0ms</span>;\n  <span class="kw">--duration-fast</span>:     <span class="nu">100ms</span>;\n  <span class="kw">--duration-normal</span>:   <span class="nu">200ms</span>;\n  <span class="kw">--duration-slow</span>:     <span class="nu">300ms</span>;\n  <span class="kw">--duration-slower</span>:   <span class="nu">500ms</span>;\n  <span class="kw">--duration-slowest</span>:  <span class="nu">700ms</span>;\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch11-4"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-orange-bg)", color: "var(--c-orange-tx)" }}
                >
                  {"④"}
                </span>
                {"11.4 CSS Transition の完全ガイド"}
              </h3>
              {"\n        "}
              <p>
                {"\n          "}
                <code>{"transition"}</code>
                {
                  " プロパティは「どのCSSプロパティを」「どれくらいの時間で」「どんな速度カーブで」「どれだけ遅らせて」変化させるかを宣言します。複数のプロパティを別々のタイミングで動かすこともでき、これによってアニメーションに「リズム」を作ることができます。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"components/button.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== transition の構文 ===== */</span>\n<span class="cm">/* transition: プロパティ名 デュレーション イージング 遅延; */</span>\n\n.button {\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-action-primary);\n  <span class="kw">transform</span>: <span class="fn">scale</span>(<span class="nu">1</span>);\n  <span class="kw">box-shadow</span>: none;\n\n  <span class="cm">/* 複数プロパティを個別に制御 */</span>\n  <span class="kw">transition</span>:\n    background-color <span class="fn">var</span>(--duration-fast)   <span class="fn">var</span>(--ease-out),\n    transform        <span class="fn">var</span>(--duration-normal) <span class="fn">var</span>(--ease-spring),\n    box-shadow       <span class="fn">var</span>(--duration-normal) <span class="fn">var</span>(--ease-out);\n}\n\n.<span class="kw">button</span>:hover {\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-action-primary-hover);\n  <span class="kw">transform</span>: <span class="fn">scale</span>(<span class="nu">1.02</span>);\n  <span class="kw">box-shadow</span>: <span class="nu">0</span> <span class="nu">4px</span> <span class="nu">16px</span> <span class="fn">rgba</span>(<span class="nu">108</span>, <span class="nu">71</span>, <span class="nu">255</span>, <span class="nu">0.3</span>);\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <h4>{"GPUが扱えるプロパティだけを動かす"}</h4>
              {"\n        "}
              <p>
                {"\n          ブラウザの描画パイプラインには「軽い処理」と「重い処理」があります。"}
                <code>{"transform"}</code>
                {" と "}
                <code>{"opacity"}</code>
                {" は GPU の合成（コンポジット）処理だけで完結するため非常に滑らかに動きますが、"}
                <code>{"width"}</code>
                {"・"}
                <code>{"height"}</code>
                {"・"}
                <code>{"top"}</code>
                {"・"}
                <code>{"left"}</code>
                {
                  " などはレイアウト全体の再計算（リフロー）を引き起こし、カクつきの原因になります。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"table-wrap"}>
                {"\n          "}
                <table>
                  {"\n            "}
                  <thead>
                    <tr>
                      <th>{"プロパティ種別"}</th>
                      <th>{"該当プロパティ例"}</th>
                      <th>{"処理コスト"}</th>
                      <th>{"推奨度"}</th>
                    </tr>
                  </thead>
                  {"\n            "}
                  <tbody>
                    {"\n              "}
                    <tr>
                      <td>{"合成（Composite）のみ"}</td>
                      <td>
                        <code>{"transform"}</code>
                        {" / "}
                        <code>{"opacity"}</code>
                        {" / "}
                        <code>{"filter"}</code>
                        {" / "}
                        <code>{"clip-path"}</code>
                      </td>
                      <td>{"低（GPU処理）"}</td>
                      <td>{"✅ 推奨"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"ペイントが発生"}</td>
                      <td>
                        <code>{"background-color"}</code>
                        {" / "}
                        <code>{"color"}</code>
                        {" / "}
                        <code>{"box-shadow"}</code>
                      </td>
                      <td>{"中"}</td>
                      <td>{"△ 許容範囲"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"レイアウトが再計算"}</td>
                      <td>
                        <code>{"width"}</code>
                        {" / "}
                        <code>{"height"}</code>
                        {" / "}
                        <code>{"top"}</code>
                        {" / "}
                        <code>{"left"}</code>
                        {" / "}
                        <code>{"margin"}</code>
                        {" / "}
                        <code>{"padding"}</code>
                      </td>
                      <td>{"高（リフロー発生）"}</td>
                      <td>{"❌ 非推奨"}</td>
                    </tr>
                    {"\n            "}
                  </tbody>
                  {"\n          "}
                </table>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"components/menu.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* NG: レイアウトに影響するプロパティをアニメーション */</span>\n.menu {\n  <span class="kw">height</span>: <span class="nu">0</span>;\n  <span class="kw">transition</span>: height <span class="nu">300ms</span> ease; <span class="cm">/* レイアウト再計算が毎フレーム発生 */</span>\n}\n.menu.is-open { <span class="kw">height</span>: <span class="nu">200px</span>; }\n\n<span class="cm">/* OK: transform + opacity でアニメーション */</span>\n.menu {\n  <span class="kw">opacity</span>: <span class="nu">0</span>;\n  <span class="kw">transform</span>: <span class="fn">translateY</span>(-<span class="nu">8px</span>);\n  <span class="kw">transition</span>:\n    opacity   <span class="nu">200ms</span> <span class="fn">var</span>(--ease-out),\n    transform <span class="nu">200ms</span> <span class="fn">var</span>(--ease-out);\n  <span class="kw">pointer-events</span>: none;\n}\n.menu.is-open {\n  <span class="kw">opacity</span>: <span class="nu">1</span>;\n  <span class="kw">transform</span>: <span class="fn">translateY</span>(<span class="nu">0</span>);\n  <span class="kw">pointer-events</span>: auto;\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch11-5"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-purple-bg)", color: "var(--c-purple-tx)" }}
                >
                  {"⑤"}
                </span>
                {"11.5 CSS Animation（@keyframes）の完全ガイド"}
              </h3>
              {"\n        "}
              <p>
                {"\n          "}
                <code>{"@keyframes"}</code>
                {
                  " は0%〜100%の間に好きなだけ中間状態を定義できる仕組みです。ローディングスピナーの回転、エラー時のシェイク（揺れ）、注目を集めるパルスなど、単純な「前後の変化」では表現できない動きに使います。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"animations/keyframes.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== @keyframes の定義 ===== */</span>\n\n<span class="cm">/* フェードイン */</span>\n@keyframes fade-<span class="kw">in</span> {\n  <span class="kw">from</span> { <span class="kw">opacity</span>: <span class="nu">0</span>; }\n  to   { <span class="kw">opacity</span>: <span class="nu">1</span>; }\n}\n\n<span class="cm">/* スライドアップ */</span>\n@keyframes slide-up {\n  <span class="kw">from</span> {\n    <span class="kw">opacity</span>: <span class="nu">0</span>;\n    <span class="kw">transform</span>: <span class="fn">translateY</span>(<span class="nu">16px</span>);\n  }\n  to {\n    <span class="kw">opacity</span>: <span class="nu">1</span>;\n    <span class="kw">transform</span>: <span class="fn">translateY</span>(<span class="nu">0</span>);\n  }\n}\n\n<span class="cm">/* ローディングスピナー */</span>\n@keyframes spin {\n  <span class="kw">from</span> { <span class="kw">transform</span>: <span class="fn">rotate</span>(<span class="nu">0</span>deg); }\n  to   { <span class="kw">transform</span>: <span class="fn">rotate</span>(<span class="nu">360</span>deg); }\n}\n\n<span class="cm">/* パルス（注目を引く） */</span>\n@keyframes pulse {\n  <span class="nu">0%</span>, <span class="nu">100%</span> { <span class="kw">transform</span>: <span class="fn">scale</span>(<span class="nu">1</span>); <span class="kw">opacity</span>: <span class="nu">1</span>; }\n  <span class="nu">50%</span>      { <span class="kw">transform</span>: <span class="fn">scale</span>(<span class="nu">1.05</span>); <span class="kw">opacity</span>: <span class="nu">0.8</span>; }\n}\n\n<span class="cm">/* シェイク（エラー通知） */</span>\n@keyframes shake {\n  <span class="nu">0%</span>, <span class="nu">100%</span> { <span class="kw">transform</span>: <span class="fn">translateX</span>(<span class="nu">0</span>); }\n  <span class="nu">20%</span>      { <span class="kw">transform</span>: <span class="fn">translateX</span>(-<span class="nu">8px</span>); }\n  <span class="nu">40%</span>      { <span class="kw">transform</span>: <span class="fn">translateX</span>(<span class="nu">8px</span>); }\n  <span class="nu">60%</span>      { <span class="kw">transform</span>: <span class="fn">translateX</span>(-<span class="nu">4px</span>); }\n  <span class="nu">80%</span>      { <span class="kw">transform</span>: <span class="fn">translateX</span>(<span class="nu">4px</span>); }\n}\n\n<span class="cm">/* ===== animation プロパティの構文 ===== */</span>\n.element {\n  <span class="cm">/* animation: 名前 デュレーション イージング 遅延 回数 方向 フィルモード 再生状態 */</span>\n  <span class="kw">animation</span>: slide-up <span class="nu">300ms</span> <span class="fn">var</span>(--ease-out) <span class="nu">0ms</span> <span class="nu">1</span> normal both running;\n}\n\n<span class="cm">/* ===== ユーティリティクラスとして定義 ===== */</span>\n.animate-fade-<span class="kw">in</span>  { <span class="kw">animation</span>: fade-<span class="kw">in</span>  <span class="nu">200ms</span> <span class="fn">var</span>(--ease-out) both; }\n.animate-slide-up { <span class="kw">animation</span>: slide-up <span class="nu">300ms</span> <span class="fn">var</span>(--ease-out) both; }\n.animate-spin     { <span class="kw">animation</span>: spin     <span class="nu">1s</span>    <span class="fn">var</span>(--ease-linear) infinite; }\n.animate-pulse    { <span class="kw">animation</span>: pulse    <span class="nu">2s</span>    <span class="fn">var</span>(--ease-<span class="kw">in</span>-out) infinite; }\n.animate-shake    { <span class="kw">animation</span>: shake   <span class="nu">400ms</span>  <span class="fn">var</span>(--ease-out) both; }',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"table-wrap"}>
                {"\n          "}
                <table>
                  {"\n            "}
                  <thead>
                    <tr>
                      <th>{"サブプロパティ"}</th>
                      <th>{"役割"}</th>
                      <th>{"主な値"}</th>
                    </tr>
                  </thead>
                  {"\n            "}
                  <tbody>
                    {"\n              "}
                    <tr>
                      <td>
                        <code>{"animation-iteration-count"}</code>
                      </td>
                      <td>{"繰り返し回数"}</td>
                      <td>
                        <code>{"1"}</code>
                        {" / "}
                        <code>{"3"}</code>
                        {" / "}
                        <code>{"infinite"}</code>
                      </td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>
                        <code>{"animation-direction"}</code>
                      </td>
                      <td>{"再生方向"}</td>
                      <td>
                        <code>{"normal"}</code>
                        {" / "}
                        <code>{"reverse"}</code>
                        {" / "}
                        <code>{"alternate"}</code>
                      </td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>
                        <code>{"animation-fill-mode"}</code>
                      </td>
                      <td>{"開始前・終了後の状態保持"}</td>
                      <td>
                        <code>{"forwards"}</code>
                        {"（最後を維持）/ "}
                        <code>{"backwards"}</code>
                        {"（最初から）/ "}
                        <code>{"both"}</code>
                      </td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>
                        <code>{"animation-play-state"}</code>
                      </td>
                      <td>{"再生・停止の制御"}</td>
                      <td>
                        <code>{"running"}</code>
                        {" / "}
                        <code>{"paused"}</code>
                      </td>
                    </tr>
                    {"\n            "}
                  </tbody>
                  {"\n          "}
                </table>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch11-6"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-blue-bg)", color: "var(--c-blue-tx)" }}
                >
                  {"⑥"}
                </span>
                {"11.6 View Transitions API（ページ遷移アニメーション）"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          View Transitions API は、ページ遷移やDOM更新の前後でブラウザが自動的にスクリーンショットを撮り、滑らかにクロスフェード・モーフィングしてくれるモダンAPIです（Chrome 111+、Safari 18+対応）。これまでJavaScriptで複雑に実装していた「要素が次のページでも同じ場所に存在し続けているように見せる」演出が、CSSの数行で実現できます。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"view-transitions.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== View Transitions API ===== */</span>\n\n<span class="cm">/* デフォルトのクロスフェードをカスタマイズ */</span>\n::<span class="fn">view-transition-old</span>(root) {\n  <span class="kw">animation</span>: fade-out <span class="nu">200ms</span> <span class="fn">var</span>(--ease-<span class="kw">in</span>) both;\n}\n\n::<span class="fn">view-transition-new</span>(root) {\n  <span class="kw">animation</span>: fade-<span class="kw">in</span> <span class="nu">300ms</span> <span class="fn">var</span>(--ease-out) both;\n}\n\n@keyframes fade-out {\n  <span class="kw">from</span> { <span class="kw">opacity</span>: <span class="nu">1</span>; }\n  to   { <span class="kw">opacity</span>: <span class="nu">0</span>; }\n}\n\n<span class="cm">/* ===== 要素レベルの遷移 ===== */</span>\n.hero-image {\n  <span class="kw">view-transition-name</span>: hero;  <span class="cm">/* ユニークな名前を設定 */</span>\n}\n\n::<span class="fn">view-transition-old</span>(hero),\n::<span class="fn">view-transition-new</span>(hero) {\n  <span class="kw">animation-duration</span>: <span class="nu">400ms</span>;\n  <span class="kw">animation-timing-function</span>: <span class="fn">var</span>(--ease-emphasized);\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"router.js"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">// View Transitions API の使用例</span>\n<span class="kw">async</span> <span class="kw">function</span> <span class="fn">navigateTo</span>(url) {\n  <span class="fn">if</span> (!document.startViewTransition) {\n    window.location.href = url;\n    <span class="kw">return</span>;\n  }\n\n  document.<span class="fn">startViewTransition</span>(<span class="fn">async</span> () =&gt; {\n    <span class="kw">const</span> response = <span class="kw">await</span> <span class="fn">fetch</span>(url);\n    <span class="kw">const</span> html = <span class="kw">await</span> response.<span class="fn">text</span>();\n    document.documentElement.innerHTML = html;\n    window.history.<span class="fn">pushState</span>({}, <span class="st">\'\'</span>, url);\n  });\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"pitfall-box"}>
                {"\n          "}
                <div className={"pitfall-box__title"}>
                  {"⚠️ 注意：非対応ブラウザへのフォールバック"}
                </div>
                {"\n          "}
                <p>
                  <code>{"document.startViewTransition"}</code>
                  {
                    " の存在チェックを必ず行いましょう。未対応ブラウザでは即座に通常のページ遷移にフォールバックさせることで、機能の有無に関わらず操作自体は破綻しないようにします（プログレッシブ・エンハンスメント）。"
                  }
                </p>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch11-7"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-green-bg)", color: "var(--c-green-tx)" }}
                >
                  {"⑦"}
                </span>
                {"11.7 アクセシビリティへの配慮"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          前庭障害（めまいや乗り物酔いに似た症状）を持つユーザーにとって、過剰なアニメーションは単なる好みの問題ではなく、健康上の問題になり得ます。OSの「視差効果を減らす」設定（"
                }
                <code>{"prefers-reduced-motion"}</code>
                {
                  "）は、CSSで必ず尊重しましょう。これは「やった方が良い」ではなく「やらなければならない」アクセシビリティ要件です。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"accessibility/motion.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== prefers-reduced-motion: アニメーション削減設定を必ず尊重する ===== */</span>\n\n<span class="cm">/* 方法1: メディアクエリで上書き */</span>\n.animated-element {\n  <span class="kw">animation</span>: slide-up <span class="nu">300ms</span> <span class="fn">var</span>(--ease-out) both;\n}\n\n@<span class="fn">media</span> (<span class="kw">prefers-reduced-motion</span>: reduce) {\n  .animated-element {\n    <span class="kw">animation</span>: fade-<span class="kw">in</span> <span class="nu">150ms</span> ease both; <span class="cm">/* 動きを排除してフェードのみに */</span>\n  }\n}\n\n<span class="cm">/* 方法2: カスタムプロパティで制御（推奨） */</span>\n:root {\n  <span class="kw">--motion-duration-normal</span>: <span class="nu">200ms</span>;\n  <span class="kw">--motion-easing-default</span>:  <span class="fn">var</span>(--ease-out);\n}\n\n@<span class="fn">media</span> (<span class="kw">prefers-reduced-motion</span>: reduce) {\n  :root {\n    <span class="kw">--motion-duration-normal</span>: <span class="nu">0ms</span>; <span class="cm">/* 全てのアニメーションを瞬時に */</span>\n  }\n}\n\n.button {\n  <span class="kw">transition</span>: background-color <span class="fn">var</span>(--motion-duration-normal) <span class="fn">var</span>(--motion-easing-<span class="kw">default</span>);\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"beginner-box"}>
                {"\n          "}
                <div className={"beginner-box__label"}>
                  {"🔰 初学者向け：方法2が推奨される理由"}
                </div>
                {"\n          "}
                <p>
                  {"方法1（個別の"}
                  <code>{"@media"}</code>
                  {
                    "上書き）は要素1つずつにメディアクエリを書く必要があり、規模が大きくなると漏れが発生しがちです。方法2はカスタムプロパティ自体を1箇所で "
                  }
                  <code>{"0ms"}</code>
                  {
                    " に切り替えるだけで、それを参照している全てのコンポーネントに一括反映できます。デザインシステム全体に展開するなら方法2を基本方針にしましょう。"
                  }
                </p>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch11-8"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-orange-bg)", color: "var(--c-orange-tx)" }}
                >
                  {"⑧"}
                </span>
                {"11.8 ベストプラクティス"}
              </h3>
              {"\n\n        "}
              <div className={"bp-box"}>
                {"\n          "}
                <div className={"bp-box__title"}>{"✅ アニメーション設計のベストプラクティス"}</div>
                {"\n          "}
                <div className={"bp-grid"}>
                  {"\n            "}
                  <div className={"bp-col bp-col--do"}>
                    {"\n              "}
                    <div className={"bp-col__h"}>{"👍 DO"}</div>
                    {"\n              "}
                    <ul>
                      {"\n                "}
                      <li>{"ユーザー操作への明確なフィードバックとして使う"}</li>
                      {"\n                "}
                      <li>{"コンテンツの変化（追加・削除・並び替え）を補足説明する"}</li>
                      {"\n                "}
                      <li>
                        <code>{"transform"}</code>
                        {"・"}
                        <code>{"opacity"}</code>
                        {" を中心に組み立てる"}
                      </li>
                      {"\n                "}
                      <li>
                        <code>{"prefers-reduced-motion"}</code>
                        {" を必ず尊重する"}
                      </li>
                      {"\n                "}
                      <li>
                        {"アニメーション開始直前に "}
                        <code>{"will-change"}</code>
                        {" を設定する"}
                      </li>
                      {"\n              "}
                    </ul>
                    {"\n            "}
                  </div>
                  {"\n            "}
                  <div className={"bp-col bp-col--dont"}>
                    {"\n              "}
                    <div className={"bp-col__h"}>{"👎 DON'T"}</div>
                    {"\n              "}
                    <ul>
                      {"\n                "}
                      <li>{"意味のない装飾だけのページロードアニメーション"}</li>
                      {"\n                "}
                      <li>{"ユーザーを待たせるだけの長いロード演出"}</li>
                      {"\n                "}
                      <li>{"100ms以下の微細な動きを乱用する"}</li>
                      {"\n                "}
                      <li>{"ループし続けて注意を散らすアニメーション"}</li>
                      {"\n                "}
                      <li>
                        <code>{"*{ will-change: transform; }"}</code>
                        {" のような全要素への適用"}
                      </li>
                      {"\n              "}
                    </ul>
                    {"\n            "}
                  </div>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"will-change.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* GPU レイヤーに事前昇格させてカクつきを防ぐ */</span>\n.modal {\n  <span class="kw">will-change</span>: transform, opacity; <span class="cm">/* アニメーション開始前に設定 */</span>\n}\n\n<span class="cm">/* アニメーション終了後は外す（メモリを解放） */</span>\n.modal.animation-done {\n  <span class="kw">will-change</span>: auto;\n}\n\n<span class="cm">/* NG: すべての要素に適用（過剰なメモリ消費） */</span>\n* { <span class="kw">will-change</span>: transform; }',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"refs"}>
              {"\n        "}
              <div className={"refs__title"}>{"📚 第11章 参考文献"}</div>
              {"\n        "}
              <ul>
                {"\n          "}
                <li>
                  <a
                    href={"https://developer.mozilla.org/ja/docs/Web/CSS/CSS_transitions"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"MDN — CSS Transitions"}</span>
                    <span className={"src-url"}>
                      {"developer.mozilla.org/ja/docs/Web/CSS/CSS_transitions"}
                    </span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://developer.mozilla.org/ja/docs/Web/CSS/CSS_animations"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"MDN — CSS Animations"}</span>
                    <span className={"src-url"}>
                      {"developer.mozilla.org/ja/docs/Web/CSS/CSS_animations"}
                    </span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"MDN — View Transitions API"}</span>
                    <span className={"src-url"}>
                      {"developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API"}
                    </span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://m3.material.io/styles/motion/overview"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"Material Design 3 — Motion"}</span>
                    <span className={"src-url"}>{"m3.material.io/styles/motion/overview"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://web.dev/articles/animations-guide"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"web.dev — Animations Guide"}</span>
                    <span className={"src-url"}>{"web.dev/articles/animations-guide"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://css-tricks.com/css-animation-tricks/"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"CSS-Tricks — Animation Performance"}</span>
                    <span className={"src-url"}>{"css-tricks.com/css-animation-tricks"}</span>
                  </a>
                </li>
                {"\n        "}
              </ul>
              {"\n      "}
            </div>
            {"\n    "}
          </section>
          {"\n\n\n    "}
          {"\n    "}
          <section className={"chapter"} id={"ch12"}>
            {"\n      "}
            <div className={"chapter__kicker"}>
              <span className={"chapter__num"}>{"CHAPTER 12"}</span>
              <span className={"chapter__rule"}></span>
            </div>
            {"\n      "}
            <h2>{"CSSアーキテクチャパターン"}</h2>
            {"\n      "}
            <p className={"chapter__intro"}>
              {
                "\n        CSSには「コンパイルエラー」がありません。書けば書くだけ、矛盾したルールがあっても黙って動いてしまいます。\n        だからこそ、"
              }
              <strong>{"プロジェクト全体でCSSをどう整理し、どう詳細度を管理するか"}</strong>
              {
                "という設計方針＝CSSアーキテクチャが、\n        チーム開発の生命線になります。本章では代表的な4つのアプローチを比較し、選定基準を提示します。\n      "
              }
            </p>
            {"\n\n      "}
            <div className={"beginner-box"}>
              {"\n        "}
              <div className={"beginner-box__label"}>
                {"🔰 初学者向け：なぜCSSは「荒れやすい」のか"}
              </div>
              {"\n        "}
              <p>
                {
                  "CSSのルールは基本的に「後に書いたものが勝つ」「より詳細なセレクタが勝つ」という単純な仕組みで動いています。これはシンプルですが、ファイル数が増えチームの人数が増えると「なぜこの色が反映されないのか分からない」「"
                }
                <code>{"!important"}</code>
                {
                  " だらけになってしまった」という事態を招きます。CSSアーキテクチャとは、この力学を事前にルール化し、誰が書いても秩序が保たれる仕組みを作ることです。"
                }
              </p>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"diagram-card"}>
              {"\n        "}
              {"\n        "}
              <div
                className="mermaid"
                role="img"
                aria-label={
                  "CSSアーキテクチャの選択肢: ITCSS, CUBE CSS, Utility-First, CSS Modules, CSS-in-JSの5種"
                }
              >
                <MermaidDiagram chart={DIAGRAMS[3]} preserveNaturalScale={true} />
              </div>
              {"\n        "}
              <p className={"diagram-card__cap"}>{"📊 図12-1：代表的な5つのCSSアーキテクチャ"}</p>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch12-1"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-blue-bg)", color: "var(--c-blue-tx)" }}
                >
                  {"①"}
                </span>
                {"12.1 ITCSS（Inverted Triangle CSS）"}
              </h3>
              {"\n        "}
              <p>
                {"\n          Harry Roberts が考案した、"}
                <strong>{"詳細度の低いものから高いものへ順番にCSSファイルを積み上げていく"}</strong>
                {
                  "アーキテクチャです。「逆三角形」という名前の通り、上から下に行くほどセレクタの詳細度が高く、適用範囲が狭くなります。レイヤーの順番さえ守れば、原則として "
                }
                <code>{"!important"}</code>
                {" は不要になります。\n        "}
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "ITCSSの7層構造: Settings, Tools, Generic, Elements, Objects, Components, Utilitiesの順に詳細度が上がる"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[4]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図12-2：ITCSSの7層構造（上から下へ詳細度が上昇）"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"project structure"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      'project/\n├── styles/\n│   ├── <span class="nu">1</span>-settings/\n│   │   ├── _tokens.css          <span class="cm"># デザイントークン</span>\n│   │   └── _breakpoints.css     <span class="cm"># ブレークポイント定数</span>\n│   ├── <span class="nu">2</span>-tools/\n│   │   └── _mixins.scss         <span class="cm"># Sass ミックスイン</span>\n│   ├── <span class="nu">3</span>-generic/\n│   │   ├── _reset.css           <span class="cm"># CSS リセット</span>\n│   │   └── _box-sizing.css\n│   ├── <span class="nu">4</span>-elements/\n│   │   ├── _base.css            <span class="cm"># body, html のデフォルト</span>\n│   │   ├── _typography.css      <span class="cm"># h1-h6, p, a のデフォルト</span>\n│   │   └── _forms.css           <span class="cm"># input, button のデフォルト</span>\n│   ├── <span class="nu">5</span>-objects/\n│   │   ├── _container.css       <span class="cm"># .o-container</span>\n│   │   ├── _grid.css            <span class="cm"># .o-grid</span>\n│   │   └── _stack.css           <span class="cm"># .o-stack</span>\n│   ├── <span class="nu">6</span>-components/\n│   │   ├── _button.css          <span class="cm"># .c-button</span>\n│   │   ├── _card.css            <span class="cm"># .c-card</span>\n│   │   └── _modal.css           <span class="cm"># .c-modal</span>\n│   └── <span class="nu">7</span>-utilities/\n│       ├── _display.css         <span class="cm"># .u-hidden, .u-sr-only</span>\n│       ├── _spacing.css         <span class="cm"># .u-mt-4, .u-p-6</span>\n│       └── _text.css            <span class="cm"># .u-text-center</span>\n└── main.css                     <span class="cm"># 全ファイルを @import</span>',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"beginner-box"}>
                {"\n          "}
                <div className={"beginner-box__label"}>
                  {"🔰 初学者向け：接頭辞（プレフィックス）の意味"}
                </div>
                {"\n          "}
                <p>
                  {"ITCSSではよく "}
                  <code>{".o-"}</code>
                  {"（Object）・"}
                  <code>{".c-"}</code>
                  {"（Component）・"}
                  <code>{".u-"}</code>
                  {
                    "（Utility）のような接頭辞をクラス名に付けます。これはクラス名を見ただけで「これはレイアウト用か、コンポーネントか、上書き用ユーティリティか」が一目で分かるようにするための慣習です。命名規則自体がドキュメントの役割を果たします。"
                  }
                </p>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch12-2"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-green-bg)", color: "var(--c-green-tx)" }}
                >
                  {"②"}
                </span>
                {"12.2 CUBE CSS"}
              </h3>
              {"\n        "}
              <p>
                {"\n          Andy Bell が提案した、"}
                <strong>
                  {
                    "Composition（構成）・Utility（ユーティリティ）・Block（ブロック）・Exception（例外）"
                  }
                </strong>
                {
                  " の4層からなるアーキテクチャです。ITCSSよりも軽量で、特に「コンポーネント単位のバリアント管理」に強みがあります。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={"CUBE CSSの4層: Composition, Utility, Block, Exception"}
                >
                  <MermaidDiagram chart={DIAGRAMS[5]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>{"📊 図12-3：CUBE CSSの4層構造"}</p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"button.html"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">&lt;!-- CUBE CSS の実装例 --&gt;</span>\n&lt;a\n  <span class="kw">class</span>=<span class="st">"button | text-base font-medium"</span>\n  data-variant=<span class="st">"primary"</span>\n  data-size=<span class="st">"lg"</span>\n  href=<span class="st">"/get-started"</span>\n&gt;\n  始める\n&lt;/a&gt;\n<span class="cm">&lt;!-- | は Composition と Utility の境界を示す慣習 --&gt;</span>',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"button.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* Block: コアスタイル */</span>\n.button {\n  <span class="kw">display</span>: inline-flex;\n  <span class="kw">align-items</span>: center;\n  <span class="kw">gap</span>: <span class="fn">var</span>(--space-<span class="nu">2</span>);\n  <span class="kw">border-radius</span>: <span class="fn">var</span>(--radius-md);\n  <span class="kw">cursor</span>: pointer;\n  <span class="kw">transition</span>: background <span class="fn">var</span>(--duration-fast) <span class="fn">var</span>(--ease-out);\n}\n\n<span class="cm">/* Exception: data属性でバリアント管理 */</span>\n.button[data-variant=<span class="st">"primary"</span>] {\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-action-primary);\n  <span class="kw">color</span>: <span class="fn">var</span>(--color-text-on-primary);\n}\n\n.button[data-variant=<span class="st">"ghost"</span>] {\n  <span class="kw">background</span>: transparent;\n  <span class="kw">color</span>: <span class="fn">var</span>(--color-action-primary);\n}\n\n.button[data-size=<span class="st">"lg"</span>] {\n  <span class="kw">height</span>: <span class="fn">var</span>(--size-component-lg);\n  <span class="kw">padding-inline</span>: <span class="fn">var</span>(--space-<span class="nu">6</span>);\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--font-size-base);\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"beginner-box"}>
                {"\n          "}
                <div className={"beginner-box__label"}>
                  {"🔰 初学者向け：なぜ data属性でバリアントを管理するの？"}
                </div>
                {"\n          "}
                <p>
                  {"従来は "}
                  <code>{".button--primary"}</code>
                  {"・"}
                  <code>{".button--lg"}</code>
                  {
                    " のようにクラスを複数組み合わせる（BEMのModifier）方法が主流でした。data属性方式の利点は、「バリアント＝コンポーネントの状態」という意味がHTMLを見ただけで明確になることと、JavaScriptから "
                  }
                  <code>{"el.dataset.variant"}</code>
                  {
                    " で簡単に読み書きできることです。どちらが正解というわけではなく、チームの好みやツールチェーンとの相性で選びます。"
                  }
                </p>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch12-3"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-purple-bg)", color: "var(--c-purple-tx)" }}
                >
                  {"③"}
                </span>
                {"12.3 CSS Layers（@layer）"}
              </h3>
              {"\n        "}
              <p>
                {"\n          CSS Cascade Layers（"}
                <code>{"@layer"}</code>
                {"）は、"}
                <strong>{"詳細度の戦争を終わらせる"}</strong>
                {
                  "ためにW3Cが標準化した仕組みで、2022年までに全モダンブラウザで利用可能になりました。レイヤー間では「セレクタの詳細度」よりも「レイヤーの宣言順」が優先されるため、ユーティリティクラスのような単純なセレクタでも、複雑なセレクタのコンポーネントスタイルに確実に勝てるようになります。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "@layerの優先順序: reset, base, tokens, objects, components, utilitiesの順で後ほど強い"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[6]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図12-4：@layer の宣言順がそのまま優先順位になる"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"layers.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== @layer の宣言（順序を最初に定義） ===== */</span>\n@layer reset, base, tokens, objects, components, utilities;\n\n<span class="cm">/* ===== 各レイヤーへの割り当て ===== */</span>\n@layer reset {\n  *, *::before, *::after { <span class="kw">box-sizing</span>: border-box; }\n  * { <span class="kw">margin</span>: <span class="nu">0</span>; }\n}\n\n@layer tokens {\n  :root {\n    <span class="kw">--color-primary</span>: <span class="nu">#6C47FF</span>;\n    <span class="kw">--space-4</span>: <span class="nu">16px</span>;\n  }\n}\n\n@layer components {\n  .button {\n    <span class="kw">background</span>: <span class="fn">var</span>(--color-primary);\n    <span class="kw">padding</span>: <span class="fn">var</span>(--space-<span class="nu">2</span>) <span class="fn">var</span>(--space-<span class="nu">4</span>);\n  }\n}\n\n@layer utilities {\n  <span class="cm">/* utilities は詳細度が低くても components に勝つ */</span>\n  .bg-transparent { <span class="kw">background</span>: transparent !important; }\n  .hidden { <span class="kw">display</span>: none; }\n}\n\n<span class="cm">/* ===== レイヤー外のスタイルは常に最強 ===== */</span>\n.override { <span class="kw">color</span>: red; } <span class="cm">/* レイヤーに属さないので全レイヤーに勝つ */</span>',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"pitfall-box"}>
                {"\n          "}
                <div className={"pitfall-box__title"}>
                  {"⚠️ 落とし穴：レイヤー外のCSSは常に最優先"}
                </div>
                {"\n          "}
                <p>
                  <code>{"@layer"}</code>
                  {
                    " に属さない通常のCSSルールは、どのレイヤーよりも強い詳細度を持ちます。サードパーティのCSS（外部ライブラリのスタイルなど）が "
                  }
                  <code>{"@layer"}</code>
                  {" の外側に書かれている場合、自分たちの "}
                  <code>{"utilities"}</code>
                  {" レイヤーで上書きしようとしても効かないことがあるため注意が必要です。"}
                </p>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch12-4"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-orange-bg)", color: "var(--c-orange-tx)" }}
                >
                  {"④"}
                </span>
                {"12.4 アーキテクチャの選定指針"}
              </h3>
              {"\n        "}
              <p>
                {"\n          「どれが一番優れているか」という問いに唯一の正解はありません。"}
                <strong>{"使用しているフレームワーク・チーム規模・開発速度の優先度"}</strong>
                {"によって最適解は変わります。以下のフローチャートを目安にしてください。\n        "}
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "CSSアーキテクチャ選定フローチャート：フレームワーク利用有無、JS動的操作の頻度、チーム規模に応じて分岐"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[7]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図12-5：CSSアーキテクチャの選定フローチャート"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"table-wrap"}>
                {"\n          "}
                <table>
                  {"\n            "}
                  <thead>
                    <tr>
                      <th>{"アーキテクチャ"}</th>
                      <th>{"学習コスト"}</th>
                      <th>{"適したチーム規模"}</th>
                      <th>{"強み"}</th>
                    </tr>
                  </thead>
                  {"\n            "}
                  <tbody>
                    {"\n              "}
                    <tr>
                      <td>{"ITCSS"}</td>
                      <td>{"中〜高"}</td>
                      <td>{"大規模（10人以上）"}</td>
                      <td>{"厳格な詳細度管理、長期保守性"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"CUBE CSS"}</td>
                      <td>{"低〜中"}</td>
                      <td>{"中規模"}</td>
                      <td>{"バランスの良さ、習得の速さ"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"Utility-First（Tailwind）"}</td>
                      <td>{"低"}</td>
                      <td>{"小〜大規模"}</td>
                      <td>{"圧倒的な開発速度"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"CSS Modules"}</td>
                      <td>{"低"}</td>
                      <td>{"React/Vue/Svelte全般"}</td>
                      <td>{"コンポーネント単位のスコープ分離"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"CSS-in-JS"}</td>
                      <td>{"中"}</td>
                      <td>{"JS駆動の動的UIが多いチーム"}</td>
                      <td>{"状態に応じた動的スタイリング"}</td>
                    </tr>
                    {"\n            "}
                  </tbody>
                  {"\n          "}
                </table>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"bp-box"}>
              {"\n        "}
              <div className={"bp-box__title"}>
                {"✅ CSSアーキテクチャ運用のベストプラクティス"}
              </div>
              {"\n        "}
              <div className={"bp-grid"}>
                {"\n          "}
                <div className={"bp-col bp-col--do"}>
                  {"\n            "}
                  <div className={"bp-col__h"}>{"👍 DO"}</div>
                  {"\n            "}
                  <ul>
                    {"\n              "}
                    <li>{"プロジェクト開始時にアーキテクチャ方針をドキュメント化する"}</li>
                    {"\n              "}
                    <li>
                      <code>{"@layer"}</code>
                      {" を使い詳細度の問題を構造的に解決する"}
                    </li>
                    {"\n              "}
                    <li>{"命名規則（BEM・接頭辞など）をLintで強制する"}</li>
                    {"\n              "}
                    <li>{"レイアウト用とコンポーネント用のクラスを明確に分離する"}</li>
                    {"\n            "}
                  </ul>
                  {"\n          "}
                </div>
                {"\n          "}
                <div className={"bp-col bp-col--dont"}>
                  {"\n            "}
                  <div className={"bp-col__h"}>{"👎 DON'T"}</div>
                  {"\n            "}
                  <ul>
                    {"\n              "}
                    <li>{"複数のアーキテクチャを無秩序に混在させる"}</li>
                    {"\n              "}
                    <li>
                      <code>{"!important"}</code>
                      {" を詳細度問題の応急処置に使い続ける"}
                    </li>
                    {"\n              "}
                    <li>{"1つのセレクタに4階層以上のネストを重ねる"}</li>
                    {"\n              "}
                    <li>{"命名規則をドキュメント化せず暗黙知に頼る"}</li>
                    {"\n            "}
                  </ul>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"refs"}>
              {"\n        "}
              <div className={"refs__title"}>{"📚 第12章 参考文献"}</div>
              {"\n        "}
              <ul>
                {"\n          "}
                <li>
                  <a
                    href={
                      "https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528"
                    }
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"ITCSS（Harry Roberts）"}</span>
                    <span className={"src-url"}>
                      {"creativebloq.com — manage-large-css-projects-itcss"}
                    </span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a href={"https://cube.fyi/"} target={"_blank"} rel={"noopener noreferrer"}>
                    <span className={"src-name"}>{"CUBE CSS（Andy Bell）"}</span>
                    <span className={"src-url"}>{"cube.fyi"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://developer.mozilla.org/ja/docs/Web/CSS/@layer"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"MDN — CSS Cascade Layers (@layer)"}</span>
                    <span className={"src-url"}>
                      {"developer.mozilla.org/ja/docs/Web/CSS/@layer"}
                    </span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://www.smashingmagazine.com/2022/01/new-layer-tools-for-css/"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>
                      {"Smashing Magazine — Cascade Layers (Miriam Suzanne)"}
                    </span>
                    <span className={"src-url"}>
                      {"smashingmagazine.com/2022/01/new-layer-tools-for-css"}
                    </span>
                  </a>
                </li>
                {"\n        "}
              </ul>
              {"\n      "}
            </div>
            {"\n    "}
          </section>
          {"\n\n\n    "}
          {"\n    "}
          <section className={"chapter"} id={"ch13"}>
            {"\n      "}
            <div className={"chapter__kicker"}>
              <span className={"chapter__num"}>{"CHAPTER 13"}</span>
              <span className={"chapter__rule"}></span>
            </div>
            {"\n      "}
            <h2>{"デザイントークン"}</h2>
            {"\n      "}
            <p className={"chapter__intro"}>
              {"\n        デザイントークンとは、"}
              <strong>
                {
                  "色・スペース・タイポグラフィなどのデザインの意思決定を、特定のプラットフォームに依存しない形式で1箇所に保存したもの"
                }
              </strong>
              {
                "です。\n        JSONで一度定義すれば、CSS・iOS・Android・Figmaなど、あらゆる出力先に自動変換できます。「デザインとコードの真実の源（Single Source of Truth）」を作る取り組みだと考えてください。\n      "
              }
            </p>
            {"\n\n      "}
            <div className={"diagram-card"}>
              {"\n        "}
              {"\n        "}
              <div
                className="mermaid"
                role="img"
                aria-label={
                  "デザイントークンは単一のJSON定義からCSS, iOS, Android, Figma, Storybookへ変換される"
                }
              >
                <MermaidDiagram chart={DIAGRAMS[8]} preserveNaturalScale={true} />
              </div>
              {"\n        "}
              <p className={"diagram-card__cap"}>
                {"📊 図13-1：1つのトークン定義から複数プラットフォームへ展開"}
              </p>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"beginner-box"}>
              {"\n        "}
              <div className={"beginner-box__label"}>
                {"🔰 初学者向け：CSS変数とデザイントークンは何が違うの？"}
              </div>
              {"\n        "}
              <p>
                {
                  "CSS変数（カスタムプロパティ）は「CSSの中だけ」で使える仕組みです。一方デザイントークンはもっと広い概念で、「色は"
                }
                <code>{"#6C47FF"}</code>
                {
                  "」という決定そのものをJSONなどの中立な形式で管理し、そこからCSS変数・Swiftのコード・Androidのリソースファイルなど"
                }
                <strong>{"複数の出力"}</strong>
                {
                  "を自動生成するための「元データ」を指します。つまり、CSS変数はデザイントークンを実現する手段の一つです。"
                }
              </p>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch13-1"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-purple-bg)", color: "var(--c-purple-tx)" }}
                >
                  {"①"}
                </span>
                {"13.1 W3C Design Tokens 仕様"}
              </h3>
              {"\n        "}
              <p>
                {"\n          W3Cが標準化を進めるデザイントークンのJSON形式です。各値は "}
                <code>{"$value"}</code>
                {"（実際の値）と "}
                <code>{"$type"}</code>
                {"（値の種類：色・寸法・デュレーションなど）を持ち、"}
                <code>{"{color.purple.500}"}</code>
                {" のような中括弧記法で他のトークンを参照（エイリアス化）できます。\n        "}
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"tokens/primitive.tokens.json"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '{\n  <span class="st">"color"</span>: {\n    <span class="st">"purple"</span>: {\n      <span class="st">"50"</span>:  { <span class="st">"$value"</span>: <span class="st">"#f5f3ff"</span>, <span class="st">"$type"</span>: <span class="st">"color"</span> },\n      <span class="st">"500"</span>: { <span class="st">"$value"</span>: <span class="st">"#6C47FF"</span>, <span class="st">"$type"</span>: <span class="st">"color"</span> },\n      <span class="st">"900"</span>: { <span class="st">"$value"</span>: <span class="st">"#1e0a5c"</span>, <span class="st">"$type"</span>: <span class="st">"color"</span> }\n    },\n    <span class="st">"action"</span>: {\n      <span class="st">"primary"</span>: {\n        <span class="st">"$value"</span>: <span class="st">"{color.purple.500}"</span>,\n        <span class="st">"$type"</span>: <span class="st">"color"</span>,\n        <span class="st">"$description"</span>: <span class="st">"メインのアクションカラー（ボタン・リンクなど）"</span>\n      }\n    }\n  },\n  <span class="st">"spacing"</span>: {\n    <span class="st">"4"</span>: { <span class="st">"$value"</span>: <span class="st">"16px"</span>, <span class="st">"$type"</span>: <span class="st">"dimension"</span> },\n    <span class="st">"6"</span>: { <span class="st">"$value"</span>: <span class="st">"24px"</span>, <span class="st">"$type"</span>: <span class="st">"dimension"</span> }\n  },\n  <span class="st">"font-size"</span>: {\n    <span class="st">"base"</span>: { <span class="st">"$value"</span>: <span class="st">"1rem"</span>, <span class="st">"$type"</span>: <span class="st">"dimension"</span> },\n    <span class="st">"lg"</span>:   { <span class="st">"$value"</span>: <span class="st">"1.125rem"</span>, <span class="st">"$type"</span>: <span class="st">"dimension"</span> }\n  },\n  <span class="st">"duration"</span>: {\n    <span class="st">"fast"</span>:   { <span class="st">"$value"</span>: <span class="st">"100ms"</span>, <span class="st">"$type"</span>: <span class="st">"duration"</span> },\n    <span class="st">"normal"</span>: { <span class="st">"$value"</span>: <span class="st">"200ms"</span>, <span class="st">"$type"</span>: <span class="st">"duration"</span> }\n  },\n  <span class="st">"border-radius"</span>: {\n    <span class="st">"md"</span>: { <span class="st">"$value"</span>: <span class="st">"8px"</span>,  <span class="st">"$type"</span>: <span class="st">"dimension"</span> },\n    <span class="st">"lg"</span>: { <span class="st">"$value"</span>: <span class="st">"12px"</span>, <span class="st">"$type"</span>: <span class="st">"dimension"</span> }\n  }\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <p>
                {"\n          ポイントは "}
                <code>{"color.action.primary"}</code>
                {" が直接 "}
                <code>{"#6C47FF"}</code>
                {" を持たず、"}
                <code>{"{color.purple.500}"}</code>
                {
                  " というエイリアスで参照している点です。これにより、もしブランドカラーが変わっても "
                }
                <code>{"color.purple.500"}</code>
                {
                  " の1箇所を変えるだけで、それを参照している全てのセマンティックトークンに変更が波及します。\n        "
                }
              </p>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch13-2"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-blue-bg)", color: "var(--c-blue-tx)" }}
                >
                  {"②"}
                </span>
                {"13.2 Style Dictionary による自動変換"}
              </h3>
              {"\n        "}
              <p>
                {"\n          Amazon がOSSで公開している "}
                <strong>{"Style Dictionary"}</strong>
                {
                  " は、トークンのJSONから各プラットフォーム向けのファイルを自動生成するビルドツールです。「1つのJSONを書けば、CSS・JS・Swift・Android用ファイルが同時に生成される」状態を作れます。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "Style Dictionaryによるビルド: 単一のJSONからCSS, JS/TypeScript, iOS Swift, Android XMLへ変換"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[9]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図13-2：Style Dictionary によるマルチプラットフォーム出力"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"style-dictionary.config.js"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="kw">import</span> StyleDictionary <span class="kw">from</span> <span class="st">\'style-dictionary\'</span>;\n\n<span class="kw">export</span> <span class="kw">default</span> {\n  <span class="kw">source</span>: [<span class="st">\'tokens/**/*.json\'</span>],\n\n  <span class="kw">platforms</span>: {\n    <span class="cm">/* CSS カスタムプロパティへの変換 */</span>\n    <span class="kw">css</span>: {\n      <span class="kw">transformGroup</span>: <span class="st">\'css\'</span>,\n      <span class="kw">prefix</span>: <span class="st">\'\'</span>,\n      <span class="kw">buildPath</span>: <span class="st">\'dist/css/\'</span>,\n      <span class="kw">files</span>: [\n        {\n          <span class="kw">destination</span>: <span class="st">\'tokens.css\'</span>,\n          <span class="kw">format</span>: <span class="st">\'css/variables\'</span>,\n          <span class="kw">options</span>: { <span class="kw">selector</span>: <span class="st">\':root\'</span>, <span class="kw">outputReferences</span>: <span class="kw">true</span> },\n        },\n      ],\n    },\n\n    <span class="cm">/* JavaScript / TypeScript への変換 */</span>\n    <span class="kw">js</span>: {\n      <span class="kw">transformGroup</span>: <span class="st">\'js\'</span>,\n      <span class="kw">buildPath</span>: <span class="st">\'dist/js/\'</span>,\n      <span class="kw">files</span>: [\n        { <span class="kw">destination</span>: <span class="st">\'tokens.js\'</span>, <span class="kw">format</span>: <span class="st">\'javascript/es6\'</span> },\n        { <span class="kw">destination</span>: <span class="st">\'tokens.d.ts\'</span>, <span class="kw">format</span>: <span class="st">\'typescript/es6-declarations\'</span> },\n      ],\n    },\n\n    <span class="cm">/* iOS Swift への変換 */</span>\n    <span class="kw">ios</span>: {\n      <span class="kw">transformGroup</span>: <span class="st">\'ios-swift\'</span>,\n      <span class="kw">buildPath</span>: <span class="st">\'dist/ios/\'</span>,\n      <span class="kw">files</span>: [\n        {\n          <span class="kw">destination</span>: <span class="st">\'StyleDictionaryColor.swift\'</span>,\n          <span class="kw">format</span>: <span class="st">\'ios-swift/class.swift\'</span>,\n          <span class="kw">filter</span>: { <span class="kw">attributes</span>: { <span class="kw">category</span>: <span class="st">\'color\'</span> } },\n        },\n      ],\n    },\n\n    <span class="cm">/* Android Compose への変換 */</span>\n    <span class="kw">android</span>: {\n      <span class="kw">transformGroup</span>: <span class="st">\'android\'</span>,\n      <span class="kw">buildPath</span>: <span class="st">\'dist/android/\'</span>,\n      <span class="kw">files</span>: [{ <span class="kw">destination</span>: <span class="st">\'tokens.xml\'</span>, <span class="kw">format</span>: <span class="st">\'android/resources\'</span> }],\n    },\n  },\n};',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"terminal"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm"># トークンのビルド</span>\nnpx style-dictionary build --config style-dictionary.config.js',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <h4>{"生成されるCSSの例"}</h4>
              {"\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"dist/css/tokens.css（自動生成）"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      ':root {\n  <span class="kw">--color-purple-50</span>: <span class="nu">#f5f3ff</span>;\n  <span class="kw">--color-purple-500</span>: <span class="nu">#6C47FF</span>;\n  <span class="kw">--color-purple-900</span>: <span class="nu">#1e0a5c</span>;\n  <span class="kw">--color-action-primary</span>: <span class="fn">var</span>(--color-purple-<span class="nu">500</span>);\n  <span class="kw">--spacing-4</span>: <span class="nu">16px</span>;\n  <span class="kw">--spacing-6</span>: <span class="nu">24px</span>;\n  <span class="kw">--font-size-base</span>: <span class="nu">1rem</span>;\n  <span class="kw">--font-size-lg</span>: <span class="nu">1.125rem</span>;\n  <span class="kw">--duration-fast</span>: <span class="nu">100ms</span>;\n  <span class="kw">--duration-normal</span>: <span class="nu">200ms</span>;\n  <span class="kw">--border-radius-md</span>: <span class="nu">8px</span>;\n  <span class="kw">--border-radius-lg</span>: <span class="nu">12px</span>;\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch13-3"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-green-bg)", color: "var(--c-green-tx)" }}
                >
                  {"③"}
                </span>
                {"13.3 Figma Variables との連携"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          デザイナーが Figma 上で管理する Variables（変数）と、エンジニアが扱う JSON トークンを橋渡しするのが "
                }
                <strong>{"Tokens Studio"}</strong>
                {
                  " という Figma プラグインです。デザイナーがFigma上で色を変更すると、JSONファイルにエクスポートされ、それがGitにコミットされてCI上で自動的にCSS等へビルドされる、という一気通貫のパイプラインを構築できます。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "Figma Variablesから Tokens StudioでJSON化し、Style Dictionaryで各種出力に変換しコンポーネントライブラリに配布する流れ"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[10]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図13-3：Figma〜コードを繋ぐトークンパイプライン"}
                </p>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch13-4"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-orange-bg)", color: "var(--c-orange-tx)" }}
                >
                  {"④"}
                </span>
                {"13.4 ベストプラクティス"}
              </h3>
              {"\n\n        "}
              <h4>{"トークンファイルをGitで管理し、変更を追跡する"}</h4>
              {"\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"tokens/ ディレクトリ構成"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      'tokens/\n├── primitive/\n│   ├── color.json       <span class="cm"># カラースケール（生の値）</span>\n│   ├── spacing.json     <span class="cm"># スペーシングスケール</span>\n│   └── typography.json  <span class="cm"># タイポグラフィスケール</span>\n├── semantic/\n│   ├── light.json       <span class="cm"># ライトモードのセマンティック</span>\n│   └── dark.json        <span class="cm"># ダークモードのセマンティック</span>\n└── component/\n    ├── button.json      <span class="cm"># ボタン固有トークン</span>\n    └── card.json        <span class="cm"># カード固有トークン</span>',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <h4>{"セマンティックトークンは必ずプリミティブを参照する"}</h4>
              {"\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"semantic/light.json"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '{\n  <span class="st">"color"</span>: {\n    <span class="st">"action"</span>: {\n      <span class="st">"primary"</span>: {\n        <span class="st">"$value"</span>: <span class="st">"{color.purple.500}"</span>,\n        <span class="st">"$type"</span>: <span class="st">"color"</span>\n      }\n    }\n  }\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"beginner-box"}>
                {"\n          "}
                <div className={"beginner-box__label"}>
                  {"🔰 初学者向け：プリミティブとセマンティックの違い"}
                </div>
                {"\n          "}
                <p>
                  <strong>{"プリミティブトークン"}</strong>
                  {"は「生の値」です（"}
                  <code>{"purple.500 = #6C47FF"}</code>
                  {"）。"}
                  <strong>{"セマンティックトークン"}</strong>
                  {"は「その値が何の役割を持つか」を表します（"}
                  <code>{"color.action.primary = purple.500"}</code>
                  {"）。コンポーネントのCSSでは必ずセマンティックトークン（"}
                  <code>{"--color-action-primary"}</code>
                  {"）を参照し、プリミティブ（"}
                  <code>{"--color-purple-500"}</code>
                  {
                    "）を直接使わないようにすると、後でブランドカラーやダークモード切り替えをする際に変更箇所が劇的に少なくなります。"
                  }
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"bp-box"}>
                {"\n          "}
                <div className={"bp-box__title"}>
                  {"✅ デザイントークン運用のベストプラクティス"}
                </div>
                {"\n          "}
                <div className={"bp-grid"}>
                  {"\n            "}
                  <div className={"bp-col bp-col--do"}>
                    {"\n              "}
                    <div className={"bp-col__h"}>{"👍 DO"}</div>
                    {"\n              "}
                    <ul>
                      {"\n                "}
                      <li>{"プリミティブ → セマンティック → コンポーネントの3階層で管理"}</li>
                      {"\n                "}
                      <li>{"W3C Design Tokens仕様に準拠したJSON形式を使う"}</li>
                      {"\n                "}
                      <li>{"CIでトークンのビルドを自動化する"}</li>
                      {"\n                "}
                      <li>
                        {"命名にプラットフォーム固有の言葉を含めない（"}
                        <code>{"--btn-blue-android"}</code>
                        {"のような名前は避ける）"}
                      </li>
                      {"\n              "}
                    </ul>
                    {"\n            "}
                  </div>
                  {"\n            "}
                  <div className={"bp-col bp-col--dont"}>
                    {"\n              "}
                    <div className={"bp-col__h"}>{"👎 DON'T"}</div>
                    {"\n              "}
                    <ul>
                      {"\n                "}
                      <li>{"コンポーネントCSSにプリミティブの値を直接ハードコードする"}</li>
                      {"\n                "}
                      <li>{"Figmaとコードのトークンを手動で同期し続ける"}</li>
                      {"\n                "}
                      <li>{"トークンのバージョン管理をせずに直接上書きする"}</li>
                      {"\n              "}
                    </ul>
                    {"\n            "}
                  </div>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"refs"}>
              {"\n        "}
              <div className={"refs__title"}>{"📚 第13章 参考文献"}</div>
              {"\n        "}
              <ul>
                {"\n          "}
                <li>
                  <a
                    href={"https://www.w3.org/TR/design-tokens/"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"W3C — Design Tokens 仕様"}</span>
                    <span className={"src-url"}>{"w3.org/TR/design-tokens"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://styledictionary.com"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"Style Dictionary（Amazon）"}</span>
                    <span className={"src-url"}>{"styledictionary.com"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a href={"https://tokens.studio/"} target={"_blank"} rel={"noopener noreferrer"}>
                    <span className={"src-name"}>{"Tokens Studio for Figma"}</span>
                    <span className={"src-url"}>{"tokens.studio"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://github.com/salesforce-ux/theo"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"Theo（Salesforce）"}</span>
                    <span className={"src-url"}>{"github.com/salesforce-ux/theo"}</span>
                  </a>
                </li>
                {"\n        "}
              </ul>
              {"\n      "}
            </div>
            {"\n    "}
          </section>
          {"\n\n\n    "}
          {"\n    "}
          <section className={"chapter"} id={"ch14"}>
            {"\n      "}
            <div className={"chapter__kicker"}>
              <span className={"chapter__num"}>{"CHAPTER 14"}</span>
              <span className={"chapter__rule"}></span>
            </div>
            {"\n      "}
            <h2>{"実践：完全なコンポーネント実装例"}</h2>
            {"\n      "}
            <p className={"chapter__intro"}>
              {
                "\n        ここまでの「アニメーション」「アーキテクチャ」「デザイントークン」の知識を1つに統合し、\n        "
              }
              <strong>{"Modal（モーダルダイアログ）コンポーネント"}</strong>
              {
                "を実際に組み立てます。アクセシビリティ・アニメーション・BEM命名・トークン参照のすべてを盛り込んだ、実務でそのまま使える実装例です。\n      "
              }
            </p>
            {"\n\n      "}
            <div className={"beginner-box"}>
              {"\n        "}
              <div className={"beginner-box__label"}>
                {"🔰 初学者向け：なぜModalが「総合演習」として最適なのか"}
              </div>
              {"\n        "}
              <p>
                {
                  "Modal（モーダル）は、見た目はシンプルですが「フォーカス管理」「キーボード操作」「アニメーション」「スクロールロック」「ARIA属性」など、フロントエンド実装で気をつけるべきポイントがほぼ全て詰まったコンポーネントです。Modalを正しく作れるようになれば、他の大半のインタラクティブUI（ドロワー・ツールチップ・ドロップダウンなど）にも同じ考え方を応用できます。"
                }
              </p>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch14-1"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-purple-bg)", color: "var(--c-purple-tx)" }}
                >
                  {"①"}
                </span>
                {"14.1 状態遷移の設計"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          実装に入る前に、コンポーネントが取りうる状態を整理します。Modalには「閉じている」「開く途中」「開いている」「閉じる途中」という4つの状態があり、それぞれの遷移のきっかけ（トリガー）を明確にしておくことで、CSSとJSの実装がブレなくなります。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={"Modalの状態遷移図: Closed, Opening, Open, Closingの4状態とトリガー"}
                >
                  <MermaidDiagram chart={DIAGRAMS[11]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>{"📊 図14-1：Modalコンポーネントの状態遷移"}</p>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch14-2"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-blue-bg)", color: "var(--c-blue-tx)" }}
                >
                  {"②"}
                </span>
                {"14.2 HTML構造（セマンティック＋ARIA）"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          スクリーンリーダーがこの要素を「ダイアログ」として正しく認識できるよう、"
                }
                <code>{'role="dialog"'}</code>
                {"・"}
                <code>{'aria-modal="true"'}</code>
                {"・"}
                <code>{"aria-labelledby"}</code>
                {"・"}
                <code>{"aria-describedby"}</code>
                {" を設定します。初期状態では "}
                <code>{"hidden"}</code>
                {" 属性で完全にDOMから読み上げ対象外にしておきます。\n        "}
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"modal.html"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">&lt;!-- トリガー --&gt;</span>\n&lt;button\n  <span class="kw">class</span>=<span class="st">"button button--primary"</span>\n  <span class="kw">type</span>=<span class="st">"button"</span>\n  data-modal-trigger=<span class="st">"confirm-modal"</span>\n&gt;\n  確認ダイアログを開く\n&lt;/button&gt;\n\n<span class="cm">&lt;!-- モーダル本体 --&gt;</span>\n&lt;div\n  id=<span class="st">"confirm-modal"</span>\n  <span class="kw">class</span>=<span class="st">"modal"</span>\n  role=<span class="st">"dialog"</span>\n  aria-modal=<span class="st">"true"</span>\n  aria-labelledby=<span class="st">"modal-title"</span>\n  aria-describedby=<span class="st">"modal-description"</span>\n  hidden\n&gt;\n  <span class="cm">&lt;!-- 背景オーバーレイ --&gt;</span>\n  &lt;div <span class="kw">class</span>=<span class="st">"modal__overlay"</span> data-modal-close&gt;&lt;/div&gt;\n\n  <span class="cm">&lt;!-- ダイアログ本体 --&gt;</span>\n  &lt;div <span class="kw">class</span>=<span class="st">"modal__dialog"</span>&gt;\n    &lt;header <span class="kw">class</span>=<span class="st">"modal__header"</span>&gt;\n      &lt;h2 <span class="kw">class</span>=<span class="st">"modal__title"</span> id=<span class="st">"modal-title"</span>&gt;削除の確認&lt;/h2&gt;\n      &lt;button <span class="kw">class</span>=<span class="st">"modal__close"</span> <span class="kw">type</span>=<span class="st">"button"</span> aria-label=<span class="st">"ダイアログを閉じる"</span> data-modal-close&gt;\n        &lt;svg <span class="kw">class</span>=<span class="st">"modal__close-icon"</span> aria-hidden=<span class="st">"true"</span> focusable=<span class="st">"false"</span> viewBox=<span class="st">"0 0 24 24"</span> width=<span class="st">"20"</span> height=<span class="st">"20"</span>&gt;\n          &lt;path d=<span class="st">"M18 6L6 18M6 6l12 12"</span> stroke=<span class="st">"currentColor"</span> stroke-width=<span class="st">"2"</span> stroke-linecap=<span class="st">"round"</span>/&gt;\n        &lt;/svg&gt;\n      &lt;/button&gt;\n    &lt;/header&gt;\n\n    &lt;div <span class="kw">class</span>=<span class="st">"modal__body"</span>&gt;\n      &lt;p <span class="kw">class</span>=<span class="st">"modal__description"</span> id=<span class="st">"modal-description"</span>&gt;\n        このアイテムを削除しますか？この操作は元に戻せません。\n      &lt;/p&gt;\n    &lt;/div&gt;\n\n    &lt;footer <span class="kw">class</span>=<span class="st">"modal__footer"</span>&gt;\n      &lt;button <span class="kw">class</span>=<span class="st">"button button--secondary"</span> <span class="kw">type</span>=<span class="st">"button"</span> data-modal-close&gt;キャンセル&lt;/button&gt;\n      &lt;button <span class="kw">class</span>=<span class="st">"button button--danger"</span> <span class="kw">type</span>=<span class="st">"button"</span> id=<span class="st">"confirm-delete"</span>&gt;削除する&lt;/button&gt;\n    &lt;/footer&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"table-wrap"}>
                {"\n          "}
                <table>
                  {"\n            "}
                  <thead>
                    <tr>
                      <th>{"ARIA属性"}</th>
                      <th>{"意味"}</th>
                    </tr>
                  </thead>
                  {"\n            "}
                  <tbody>
                    {"\n              "}
                    <tr>
                      <td>
                        <code>{'role="dialog"'}</code>
                      </td>
                      <td>{"この要素がダイアログであることをスクリーンリーダーに伝える"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>
                        <code>{'aria-modal="true"'}</code>
                      </td>
                      <td>{"背後のコンテンツが操作不可能であることを伝える"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>
                        <code>{"aria-labelledby"}</code>
                      </td>
                      <td>{"ダイアログのタイトルとなる要素のIDを指定"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>
                        <code>{"aria-describedby"}</code>
                      </td>
                      <td>{"ダイアログの説明文となる要素のIDを指定"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>
                        <code>{"aria-label"}</code>
                        {"（閉じるボタン）"}
                      </td>
                      <td>{"アイコンのみのボタンに音声で読み上げる代替テキストを与える"}</td>
                    </tr>
                    {"\n            "}
                  </tbody>
                  {"\n          "}
                </table>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch14-3"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-green-bg)", color: "var(--c-green-tx)" }}
                >
                  {"③"}
                </span>
                {"14.3 CSS実装（BEM + トークン）"}
              </h3>
              {"\n        "}
              <p>
                {"\n          BEM（Block Element Modifier）命名規則で "}
                <code>{".modal"}</code>
                {"・"}
                <code>{".modal__overlay"}</code>
                {"・"}
                <code>{".modal__dialog"}</code>
                {
                  " のように構造化し、すべての色・スペース・デュレーションはトークン（カスタムプロパティ）から参照します。これにより、第11章で学んだアニメーション設計と第13章のトークンがそのまま実装に活かされます。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"modal.css（1/2）"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* --- Block --- */</span>\n.modal {\n  <span class="kw">--modal-duration</span>: <span class="fn">var</span>(--duration-slow, <span class="nu">300ms</span>);\n  <span class="kw">--modal-easing</span>:   <span class="fn">var</span>(--ease-out, <span class="fn">cubic-bezier</span>(<span class="nu">0</span>, <span class="nu">0</span>, <span class="nu">0.2</span>, <span class="nu">1</span>));\n\n  <span class="kw">position</span>: fixed;\n  <span class="kw">inset</span>: <span class="nu">0</span>;\n  <span class="kw">z-index</span>: <span class="nu">1000</span>;\n  <span class="kw">display</span>: grid;\n  <span class="kw">place-items</span>: center;\n  <span class="kw">padding</span>: <span class="fn">var</span>(--space-<span class="nu">4</span>);\n\n  <span class="kw">opacity</span>: <span class="nu">0</span>;\n  <span class="kw">pointer-events</span>: none;\n  <span class="kw">visibility</span>: hidden;\n  <span class="kw">transition</span>:\n    opacity    <span class="fn">var</span>(--modal-duration) <span class="fn">var</span>(--modal-easing),\n    visibility <span class="nu">0ms</span> linear <span class="fn">var</span>(--modal-duration);\n}\n\n.modal.is-open {\n  <span class="kw">opacity</span>: <span class="nu">1</span>;\n  <span class="kw">pointer-events</span>: auto;\n  <span class="kw">visibility</span>: visible;\n  <span class="kw">transition</span>:\n    opacity    <span class="fn">var</span>(--modal-duration) <span class="fn">var</span>(--modal-easing),\n    visibility <span class="nu">0ms</span> linear <span class="nu">0ms</span>;\n}\n\n<span class="cm">/* --- Elements --- */</span>\n.modal__overlay {\n  <span class="kw">position</span>: absolute;\n  <span class="kw">inset</span>: <span class="nu">0</span>;\n  <span class="kw">background</span>: <span class="fn">rgba</span>(<span class="nu">0</span>, <span class="nu">0</span>, <span class="nu">0</span>, <span class="nu">0.5</span>);\n  <span class="kw">backdrop-filter</span>: <span class="fn">blur</span>(<span class="nu">4px</span>);\n  <span class="kw">cursor</span>: pointer;\n}\n\n@<span class="fn">media</span> (<span class="kw">prefers-reduced-motion</span>: reduce) {\n  .modal__overlay { <span class="kw">backdrop-filter</span>: none; }\n}\n\n.modal__dialog {\n  <span class="kw">position</span>: relative;\n  <span class="kw">z-index</span>: <span class="nu">1</span>;\n  <span class="kw">width</span>: <span class="fn">min</span>(<span class="nu">100%</span>, <span class="fn">var</span>(--container-sm, <span class="nu">480px</span>));\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-bg-surface);\n  <span class="kw">border-radius</span>: <span class="fn">var</span>(--radius-xl, <span class="nu">16px</span>);\n  <span class="kw">border</span>: <span class="nu">1px</span> solid <span class="fn">var</span>(--color-border-<span class="kw">default</span>);\n  <span class="kw">display</span>: flex;\n  <span class="kw">flex-direction</span>: column;\n  <span class="kw">max-height</span>: <span class="fn">calc</span>(<span class="nu">100s</span>vh - <span class="fn">var</span>(--space-<span class="nu">8</span>));\n  <span class="kw">overflow</span>: hidden;\n\n  <span class="kw">transform</span>: <span class="fn">translateY</span>(<span class="nu">16px</span>) <span class="fn">scale</span>(<span class="nu">0.97</span>);\n  <span class="kw">transition</span>: transform <span class="fn">var</span>(--modal-duration) <span class="fn">var</span>(--modal-easing);\n}\n\n.modal.is-open .modal__dialog {\n  <span class="kw">transform</span>: <span class="fn">translateY</span>(<span class="nu">0</span>) <span class="fn">scale</span>(<span class="nu">1</span>);\n}\n\n@<span class="fn">media</span> (<span class="kw">prefers-reduced-motion</span>: reduce) {\n  .modal__dialog { <span class="kw">transform</span>: none; <span class="kw">transition</span>: none; }\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"modal.css（2/2）"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '.modal__header {\n  <span class="kw">display</span>: flex;\n  <span class="kw">align-items</span>: flex-start;\n  <span class="kw">justify-content</span>: space-between;\n  <span class="kw">gap</span>: <span class="fn">var</span>(--space-<span class="nu">4</span>);\n  <span class="kw">padding</span>: <span class="fn">var</span>(--space-<span class="nu">6</span>);\n  <span class="kw">border-bottom</span>: <span class="nu">1px</span> solid <span class="fn">var</span>(--color-border-<span class="kw">default</span>);\n  <span class="kw">flex-shrink</span>: <span class="nu">0</span>;\n}\n\n.modal__title {\n  <span class="kw">font-size</span>: <span class="fn">var</span>(--font-size-xl, <span class="nu">1.25rem</span>);\n  <span class="kw">font-weight</span>: <span class="fn">var</span>(--font-weight-semibold, <span class="nu">600</span>);\n  <span class="kw">line-height</span>: <span class="fn">var</span>(--line-height-tight, <span class="nu">1.25</span>);\n  <span class="kw">color</span>: <span class="fn">var</span>(--color-text-primary);\n}\n\n.modal__close {\n  <span class="kw">display</span>: inline-flex;\n  <span class="kw">align-items</span>: center;\n  <span class="kw">justify-content</span>: center;\n  <span class="kw">width</span>: <span class="nu">32px</span>;\n  <span class="kw">height</span>: <span class="nu">32px</span>;\n  <span class="kw">border</span>: none;\n  <span class="kw">border-radius</span>: <span class="fn">var</span>(--radius-md, <span class="nu">8px</span>);\n  <span class="kw">background</span>: transparent;\n  <span class="kw">color</span>: <span class="fn">var</span>(--color-text-muted);\n  <span class="kw">cursor</span>: pointer;\n  <span class="kw">flex-shrink</span>: <span class="nu">0</span>;\n  <span class="kw">transition</span>: background <span class="fn">var</span>(--duration-fast) <span class="fn">var</span>(--ease-out);\n}\n\n.<span class="kw">modal__close</span>:hover { <span class="kw">background</span>: <span class="fn">var</span>(--color-bg-overlay); }\n\n.<span class="kw">modal__close</span>:focus-visible {\n  <span class="kw">outline</span>: <span class="nu">2px</span> solid <span class="fn">var</span>(--color-border-focus);\n  <span class="kw">outline-offset</span>: <span class="nu">2px</span>;\n}\n\n.modal__body {\n  <span class="kw">padding</span>: <span class="fn">var</span>(--space-<span class="nu">6</span>);\n  <span class="kw">overflow-y</span>: auto;\n  <span class="kw">flex</span>: <span class="nu">1</span>;\n}\n\n.modal__footer {\n  <span class="kw">display</span>: flex;\n  <span class="kw">align-items</span>: center;\n  <span class="kw">justify-content</span>: flex-end;\n  <span class="kw">gap</span>: <span class="fn">var</span>(--space-<span class="nu">3</span>);\n  <span class="kw">padding</span>: <span class="fn">var</span>(--space-<span class="nu">4</span>) <span class="fn">var</span>(--space-<span class="nu">6</span>);\n  <span class="kw">border-top</span>: <span class="nu">1px</span> solid <span class="fn">var</span>(--color-border-<span class="kw">default</span>);\n  <span class="kw">flex-shrink</span>: <span class="nu">0</span>;\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch14-4"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-orange-bg)", color: "var(--c-orange-tx)" }}
                >
                  {"④"}
                </span>
                {"14.4 JavaScript実装（アクセシブル）"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          見た目だけでなく「キーボードだけで完結して操作できるか」がアクセシブルなModalの鍵です。開いた時に最初の要素へフォーカスを移し、"
                }
                <kbd>{"Tab"}</kbd>
                {
                  "キーがモーダルの外に出ないように「フォーカストラップ」を実装し、閉じた時には元いた場所にフォーカスを戻す、という3点が必須要件です。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"modal.js"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="kw">class</span> Modal {\n  #modal;\n  #trigger;\n  #focusableElements;\n  #previouslyFocused;\n\n  <span class="fn">constructor</span>(modalId) {\n    <span class="kw">this</span>.#modal   = document.<span class="fn">getElementById</span>(modalId);\n    <span class="kw">this</span>.#trigger = document.<span class="fn">querySelector</span>(<span class="st">`[data-modal-trigger="${modalId}"]`</span>);\n    <span class="fn">if</span> (!<span class="kw">this</span>.#modal || !<span class="kw">this</span>.#trigger) <span class="kw">return</span>;\n    <span class="kw">this</span>.#<span class="fn">init</span>();\n  }\n\n  #<span class="fn">init</span>() {\n    <span class="kw">this</span>.#trigger.<span class="fn">addEventListener</span>(<span class="st">\'click\'</span>, () =&gt; <span class="kw">this</span>.<span class="fn">open</span>());\n\n    <span class="kw">this</span>.#modal.<span class="fn">querySelectorAll</span>(<span class="st">\'[data-modal-close]\'</span>).<span class="fn">forEach</span>(el =&gt; {\n      el.<span class="fn">addEventListener</span>(<span class="st">\'click\'</span>, () =&gt; <span class="kw">this</span>.<span class="fn">close</span>());\n    });\n\n    <span class="kw">this</span>.#modal.<span class="fn">addEventListener</span>(<span class="st">\'keydown\'</span>, (e) =&gt; {\n      <span class="fn">if</span> (e.key === <span class="st">\'Escape\'</span>) <span class="kw">this</span>.<span class="fn">close</span>();\n      <span class="fn">if</span> (e.key === <span class="st">\'Tab\'</span>)    <span class="kw">this</span>.#<span class="fn">trapFocus</span>(e);\n    });\n  }\n\n  <span class="fn">open</span>() {\n    <span class="kw">this</span>.#previouslyFocused = document.activeElement;\n\n    <span class="kw">this</span>.#modal.<span class="fn">removeAttribute</span>(<span class="st">\'hidden\'</span>);\n    <span class="kw">this</span>.#modal.<span class="fn">removeAttribute</span>(<span class="st">\'aria-hidden\'</span>);\n\n    <span class="fn">requestAnimationFrame</span>(() =&gt; {\n      <span class="kw">this</span>.#modal.classList.<span class="fn">add</span>(<span class="st">\'is-open\'</span>);\n    });\n\n    <span class="kw">this</span>.#<span class="fn">getFocusableElements</span>();\n    <span class="kw">this</span>.#focusableElements[<span class="nu">0</span>]?.<span class="fn">focus</span>();\n\n    document.body.style.overflow = <span class="st">\'hidden\'</span>;\n  }\n\n  <span class="fn">close</span>() {\n    <span class="kw">this</span>.#modal.classList.<span class="fn">remove</span>(<span class="st">\'is-open\'</span>);\n\n    <span class="kw">const</span> duration = <span class="fn">getComputedStyle</span>(<span class="kw">this</span>.#modal)\n      .<span class="fn">getPropertyValue</span>(<span class="st">\'--modal-duration\'</span>).<span class="fn">trim</span>();\n    <span class="kw">const</span> ms = <span class="fn">parseFloat</span>(duration) * (duration.<span class="fn">endsWith</span>(<span class="st">\'s\'</span>) &amp;&amp; !duration.<span class="fn">endsWith</span>(<span class="st">\'ms\'</span>) ? <span class="nu">1000</span> : <span class="nu">1</span>);\n\n    <span class="fn">setTimeout</span>(() =&gt; {\n      <span class="kw">this</span>.#modal.<span class="fn">setAttribute</span>(<span class="st">\'hidden\'</span>, <span class="st">\'\'</span>);\n      <span class="kw">this</span>.#modal.<span class="fn">setAttribute</span>(<span class="st">\'aria-hidden\'</span>, <span class="st">\'true\'</span>);\n      document.body.style.overflow = <span class="st">\'\'</span>;\n      <span class="kw">this</span>.#previouslyFocused?.<span class="fn">focus</span>();\n    }, ms);\n  }\n\n  #<span class="fn">getFocusableElements</span>() {\n    <span class="kw">this</span>.#focusableElements = [\n      ...<span class="kw">this</span>.#modal.<span class="fn">querySelectorAll</span>(\n        <span class="st">\'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])\'</span>\n      ),\n    ];\n  }\n\n  #<span class="fn">trapFocus</span>(e) {\n    <span class="fn">if</span> (!<span class="kw">this</span>.#focusableElements.length) <span class="kw">return</span>;\n    <span class="kw">const</span> first = <span class="kw">this</span>.#focusableElements[<span class="nu">0</span>];\n    <span class="kw">const</span> last  = <span class="kw">this</span>.#focusableElements[<span class="kw">this</span>.#focusableElements.length - <span class="nu">1</span>];\n\n    <span class="fn">if</span> (e.shiftKey &amp;&amp; document.activeElement === first) {\n      last.<span class="fn">focus</span>();\n      e.<span class="fn">preventDefault</span>();\n    } <span class="kw">else</span> <span class="fn">if</span> (!e.shiftKey &amp;&amp; document.activeElement === last) {\n      first.<span class="fn">focus</span>();\n      e.<span class="fn">preventDefault</span>();\n    }\n  }\n}\n\n<span class="kw">const</span> confirmModal = <span class="kw">new</span> <span class="fn">Modal</span>(<span class="st">\'confirm-modal\'</span>);',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"beginner-box"}>
                {"\n          "}
                <div className={"beginner-box__label"}>
                  {"🔰 初学者向け：フォーカストラップとは？"}
                </div>
                {"\n          "}
                <p>
                  {"モーダルが開いている間に "}
                  <kbd>{"Tab"}</kbd>
                  {
                    " キーを押し続けると、本来は背後のページの要素にもフォーカスが移動してしまいます。これではユーザーが「今どこを操作しているか」見失ってしまいます。フォーカストラップは、モーダル内の最後の要素で "
                  }
                  <kbd>{"Tab"}</kbd>
                  {" を押したら最初の要素に、最初の要素で "}
                  <kbd>{"Shift+Tab"}</kbd>
                  {
                    " を押したら最後の要素にフォーカスを戻すことで、フォーカスをモーダルの中だけに「閉じ込める」仕組みです。"
                  }
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"pitfall-box"}>
                {"\n          "}
                <div className={"pitfall-box__title"}>
                  {"⚠️ 落とし穴：アニメーション完了前に hidden を付けてしまう"}
                </div>
                {"\n          "}
                <p>
                  {"閉じる処理で "}
                  <code>{"classList.remove('is-open')"}</code>
                  {" と同時に "}
                  <code>{"hidden"}</code>
                  {
                    " 属性を付けてしまうと、CSSのトランジションが始まる前に要素が消えてアニメーションが機能しません。上記の実装のように "
                  }
                  <code>{"setTimeout"}</code>
                  {" でアニメーション時間（"}
                  <code>{"--modal-duration"}</code>
                  {"）の分だけ待ってから "}
                  <code>{"hidden"}</code>
                  {" を付与するようにしましょう。"}
                </p>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"bp-box"}>
              {"\n        "}
              <div className={"bp-box__title"}>{"✅ コンポーネント実装のベストプラクティス"}</div>
              {"\n        "}
              <div className={"bp-grid"}>
                {"\n          "}
                <div className={"bp-col bp-col--do"}>
                  {"\n            "}
                  <div className={"bp-col__h"}>{"👍 DO"}</div>
                  {"\n            "}
                  <ul>
                    {"\n              "}
                    <li>{"状態遷移図を先に書いてから実装に入る"}</li>
                    {"\n              "}
                    <li>{"開閉時にフォーカスを正しく移動・復元する"}</li>
                    {"\n              "}
                    <li>
                      <kbd>{"Esc"}</kbd>
                      {"キー・背景クリックの両方で閉じられるようにする"}
                    </li>
                    {"\n              "}
                    <li>{"CSSのデュレーション値をJS側でも参照し二重管理を避ける"}</li>
                    {"\n            "}
                  </ul>
                  {"\n          "}
                </div>
                {"\n          "}
                <div className={"bp-col bp-col--dont"}>
                  {"\n            "}
                  <div className={"bp-col__h"}>{"👎 DON'T"}</div>
                  {"\n            "}
                  <ul>
                    {"\n              "}
                    <li>{"マウス操作だけを前提に実装する"}</li>
                    {"\n              "}
                    <li>
                      <code>{"display: none"}</code>
                      {" だけで開閉しアニメーションを諦める"}
                    </li>
                    {"\n              "}
                    <li>{"背景のスクロールをロックし忘れる"}</li>
                    {"\n              "}
                    <li>{"モーダルを開いたままbodyの内容を読み上げ可能にしておく"}</li>
                    {"\n            "}
                  </ul>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n    "}
          </section>
          {"\n\n\n    "}
          {"\n    "}
          <section className={"chapter"} id={"ch15"}>
            {"\n      "}
            <div className={"chapter__kicker"}>
              <span className={"chapter__num"}>{"CHAPTER 15"}</span>
              <span className={"chapter__rule"}></span>
            </div>
            {"\n      "}
            <h2>{"パフォーマンス最適化"}</h2>
            {"\n      "}
            <p className={"chapter__intro"}>
              {
                "\n        どれだけ美しいデザインシステムを構築しても、表示が遅ければユーザーは離脱してしまいます。\n        本章では、ブラウザがCSSをどう処理しているかという基礎から、クリティカルCSS・ロード最適化・セレクタ効率・バンドルサイズ削減、\n        そしてGoogleの品質指標である"
              }
              <strong>{"Core Web Vitals"}</strong>
              {"との関係までを解説します。\n      "}
            </p>
            {"\n\n      "}
            <div className={"sub"} id={"ch15-1"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-blue-bg)", color: "var(--c-blue-tx)" }}
                >
                  {"①"}
                </span>
                {"15.1 CSSパフォーマンスの基礎：レンダリングパイプライン"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          ブラウザは画面を表示するまでに6つの段階を経ます。どの段階で再計算が起きるかによって処理コストが大きく異なり、"
                }
                <strong>
                  {
                    "レイアウト（Layout）の再計算が最も重く、合成（Composite）だけで済む変更が最も軽い"
                  }
                </strong>
                {"という覚えておくべき序列があります。\n        "}
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "レンダリングパイプライン: Parse HTML, Parse CSS, Render Tree, Layout, Paint, Compositeの6段階とコスト比較"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[12]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図15-1：レンダリングパイプラインと各段階の処理コスト"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"beginner-box"}>
                {"\n          "}
                <div className={"beginner-box__label"}>
                  {"🔰 初学者向け：「リフロー」「リペイント」って何？"}
                </div>
                {"\n          "}
                <p>
                  {
                    "「リフロー」は要素のサイズや位置を再計算すること、「リペイント」は色や見た目を塗り直すことです。"
                  }
                  <code>{"width"}</code>
                  {
                    " を変えると要素の大きさが変わるので、それに引っ張られて周囲の要素も配置し直す必要があり「リフロー」が起きます。一方 "
                  }
                  <code>{"transform"}</code>
                  {
                    " で要素を動かしても、他の要素のレイアウトには一切影響しないため、リフローもリペイントも起きずGPUの合成だけで完結します。第11章で「"
                  }
                  <code>{"transform"}</code>
                  {"・"}
                  <code>{"opacity"}</code>
                  {"を使う」と繰り返し強調していたのは、まさにこの仕組みが理由です。"}
                </p>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch15-2"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-green-bg)", color: "var(--c-green-tx)" }}
                >
                  {"②"}
                </span>
                {"15.2 クリティカルCSS"}
              </h3>
              {"\n        "}
              <p>
                {"\n          通常、ブラウザは"}
                <code>{'<link rel="stylesheet">'}</code>
                {
                  "でCSSファイル全体をダウンロードし終えるまで、画面の描画をブロックします。CSSファイルが数百KBある場合、ユーザーは真っ白な画面を見続けることになります。"
                }
                <strong>{"クリティカルCSS"}</strong>
                {
                  "とは、最初に見える範囲（ファーストビュー、Above the fold）のスタイルだけを抜き出してHTMLに直接埋め込み、即座に描画を開始させるテクニックです。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "問題: レンダリングブロッキングにより白い画面で待たされる。解決: クリティカルCSSのインライン化で即時表示"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[13]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図15-2：クリティカルCSSによるレンダリングブロック回避"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"index.html"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '&lt;head&gt;\n  <span class="cm">&lt;!-- Above the fold のCSSをインラインに --&gt;</span>\n  &lt;style&gt;\n    :root { <span class="kw">--color-bg-base</span>: <span class="nu">#fafafa</span>; <span class="kw">--color-text-primary</span>: <span class="nu">#18181b</span>; }\n    body { <span class="kw">font-family</span>: system-ui, sans-serif; <span class="kw">background</span>: <span class="fn">var</span>(--color-bg-base); <span class="kw">margin</span>: <span class="nu">0</span>; }\n    .header { <span class="kw">display</span>: flex; <span class="kw">align-items</span>: center; <span class="kw">height</span>: <span class="nu">64px</span>; <span class="kw">padding</span>: <span class="nu">0</span> <span class="nu">24px</span>; }\n    .hero { <span class="kw">padding</span>: <span class="nu">80px</span> <span class="nu">24px</span>; <span class="kw">text-align</span>: center; }\n  &lt;/style&gt;\n\n  <span class="cm">&lt;!-- 残りのCSSは非同期ロード --&gt;</span>\n  &lt;link\n    rel=<span class="st">"preload"</span>\n    href=<span class="st">"/styles/main.css"</span>\n    as=<span class="st">"style"</span>\n    onload=<span class="st">"this.onload=null;this.rel=\'stylesheet\'"</span>\n  &gt;\n  &lt;noscript&gt;&lt;link rel=<span class="st">"stylesheet"</span> href=<span class="st">"/styles/main.css"</span>&gt;&lt;/noscript&gt;\n&lt;/head&gt;',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch15-3"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-purple-bg)", color: "var(--c-purple-tx)" }}
                >
                  {"③"}
                </span>
                {"15.3 CSSのロード最適化"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          フォントのプリロード、メディアクエリによる条件付きロード、可変フォント（Variable Fonts）の活用に加え、モダンCSSの "
                }
                <code>{"contain"}</code>
                {" と "}
                <code>{"content-visibility"}</code>
                {
                  " を使うことで、ブラウザに「ここはレンダリングを省略してよい」というヒントを与えられます。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"index.html"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '&lt;head&gt;\n  <span class="cm">&lt;!-- 使用するフォントファイルを事前にロード --&gt;</span>\n  &lt;link rel=<span class="st">"preload"</span> href=<span class="st">"/fonts/Inter-var.woff2"</span> as=<span class="st">"font"</span> <span class="kw">type</span>=<span class="st">"font/woff2"</span> crossorigin&gt;\n  &lt;link rel=<span class="st">"preload"</span> href=<span class="st">"/fonts/NotoSansJP-Regular.woff2"</span> as=<span class="st">"font"</span> <span class="kw">type</span>=<span class="st">"font/woff2"</span> crossorigin&gt;\n&lt;/head&gt;\n\n<span class="cm">&lt;!-- メディアクエリで条件ロード --&gt;</span>\n&lt;link rel=<span class="st">"stylesheet"</span> href=<span class="st">"print.css"</span> media=<span class="st">"print"</span>&gt;\n&lt;link rel=<span class="st">"stylesheet"</span> href=<span class="st">"mobile.css"</span> media=<span class="st">"(max-width: 768px)"</span>&gt;',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"fonts.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== @font-face の最適化 ===== */</span>\n@font-face {\n  <span class="kw">font-family</span>: <span class="st">\'Inter\'</span>;\n  <span class="kw">src</span>: <span class="fn">url</span>(<span class="st">\'/fonts/Inter-var.woff2\'</span>) <span class="fn">format</span>(<span class="st">\'woff2\'</span>);\n  <span class="kw">font-weight</span>: <span class="nu">100</span> <span class="nu">900</span>;          <span class="cm">/* 可変フォント：1ファイルで複数ウェイトをカバー */</span>\n  <span class="kw">font-style</span>: normal;\n  <span class="kw">font-display</span>: swap;            <span class="cm">/* FLASHを防ぎ、FOUTを許容 */</span>\n  <span class="kw">unicode-range</span>: U+<span class="nu">0000</span>-<span class="nu">00</span>FF, U+<span class="nu">0131</span>; <span class="cm">/* 使用する文字範囲のみ */</span>\n}\n\n<span class="cm">/* ===== contain プロパティ: ブラウザの最適化ヒント ===== */</span>\n.widget {\n  <span class="kw">contain</span>: layout style; <span class="cm">/* この変更が外部レイアウトに影響しないことを宣言 */</span>\n}\n\n.card-list {\n  <span class="kw">contain</span>: strict; <span class="cm">/* layout + style + paint + size */</span>\n}\n\n<span class="cm">/* ===== content-visibility: 画面外要素のレンダリングをスキップ ===== */</span>\n.article-card {\n  <span class="kw">content-visibility</span>: auto;             <span class="cm">/* 画面外はレンダリングスキップ */</span>\n  <span class="kw">contain-intrinsic-size</span>: auto <span class="nu">400px</span>;  <span class="cm">/* スキップ時の推定サイズ（レイアウトシフト防止） */</span>\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"table-wrap"}>
                {"\n          "}
                <table>
                  {"\n            "}
                  <thead>
                    <tr>
                      <th>{"用語"}</th>
                      <th>{"意味"}</th>
                    </tr>
                  </thead>
                  {"\n            "}
                  <tbody>
                    {"\n              "}
                    <tr>
                      <td>{"FOUT (Flash of Unstyled Text)"}</td>
                      <td>
                        {"フォント読み込み中は代替フォントで表示し、読み込み完了後に切り替わる現象"}
                      </td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"FOIT (Flash of Invisible Text)"}</td>
                      <td>
                        {"フォント読み込みが完了するまでテキストが非表示になる現象（避けるべき）"}
                      </td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>
                        <code>{"font-display: swap"}</code>
                      </td>
                      <td>
                        {"FOITを避け、即座に代替フォントで表示してから本番フォントへ差し替える設定"}
                      </td>
                    </tr>
                    {"\n            "}
                  </tbody>
                  {"\n          "}
                </table>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch15-4"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-orange-bg)", color: "var(--c-orange-tx)" }}
                >
                  {"④"}
                </span>
                {"15.4 CSSセレクタのパフォーマンス"}
              </h3>
              {"\n        "}
              <p>
                {"\n          ブラウザはセレクタを"}
                <strong>{"右から左に"}</strong>
                {"評価します。つまり "}
                <code>{".header ul li a"}</code>
                {" というセレクタがあれば、まず全ての "}
                <code>{"a"}</code>
                {" 要素を見つけ出してから、その親が "}
                <code>{"li"}</code>
                {"か、さらにその親が"}
                <code>{"ul"}</code>
                {
                  "か…と遡って絞り込みます。右端（キーセレクタ）が広すぎると、無駄な走査が大量に発生します。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"selectors.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* NG: 右端が広すぎるセレクタ（多くの要素にマッチして走査が重い） */</span>\n.page .content * { <span class="kw">color</span>: inherit; }        <span class="cm">/* * は全要素にマッチ */</span>\n.sidebar div + div { <span class="kw">margin-top</span>: <span class="nu">8px</span>; }      <span class="cm">/* 全divを走査 */</span>\n.header ul li a { <span class="kw">color</span>: <span class="fn">var</span>(--link); }      <span class="cm">/* 深いネスト */</span>\n\n<span class="cm">/* OK: 具体的なクラスセレクタ（マッチが速い） */</span>\n.sidebar__item { <span class="kw">margin-top</span>: <span class="nu">8px</span>; }\n.nav__link { <span class="kw">color</span>: <span class="fn">var</span>(--link); }\n\n<span class="cm">/* ===== :is() / :where() で冗長な繰り返しを排除 ===== */</span>\n\n<span class="cm">/* NG: 同じスタイルの繰り返し */</span>\nh1, h2, h3, h4, h5, h6 { <span class="kw">font-weight</span>: <span class="nu">600</span>; }\n\n<span class="cm">/* OK: :is() でまとめる（詳細度は引数の中で最も高いもの） */</span>\n:<span class="fn">is</span>(h1, h2, h3, h4, h5, h6) { <span class="kw">font-weight</span>: <span class="nu">600</span>; }\n\n<span class="cm">/* :where() は詳細度0のため上書きしやすい */</span>\n:<span class="fn">where</span>(h1, h2, h3, h4, h5, h6) { <span class="kw">font-weight</span>: <span class="nu">600</span>; }',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch15-5"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-blue-bg)", color: "var(--c-blue-tx)" }}
                >
                  {"⑤"}
                </span>
                {"15.5 CSSバンドルサイズの最適化"}
              </h3>
              {"\n        "}
              <p>
                {"\n          未使用のCSSを検出して削除する "}
                <strong>{"PurgeCSS"}</strong>
                {"、そして高速なRust製CSS処理系である "}
                <strong>{"Lightning CSS"}</strong>
                {
                  " を組み合わせることで、本番ビルドのファイルサイズを大幅に削減できます。動的に付与されるクラス名（例：JSで追加される"
                }
                <code>{"is-open"}</code>
                {"）は誤って削除されないよう、セーフリストへの登録が必須です。\n        "}
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"postcss.config.js"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== PurgeCSS: 未使用CSSの削除 ===== */</span>\n<span class="kw">export</span> <span class="kw">default</span> {\n  <span class="kw">plugins</span>: {\n    <span class="st">\'@fullhuman/postcss-purgecss\'</span>: {\n      <span class="kw">content</span>: [\n        <span class="st">\'./src/**/*.html\'</span>,\n        <span class="st">\'./src/**/*.jsx\'</span>,\n        <span class="st">\'./src/**/*.tsx\'</span>,\n        <span class="st">\'./src/**/*.vue\'</span>,\n      ],\n      <span class="kw">defaultExtractor</span>: (content) =&gt;\n        content.<span class="fn">match</span>(/[\\w-/:]+(?&lt;!:)/g) || [],\n      <span class="cm">/* セーフリスト: 動的に追加されるクラスは削除しない */</span>\n      <span class="kw">safelist</span>: {\n        <span class="kw">standard</span>: [<span class="st">\'is-open\'</span>, <span class="st">\'is-loading\'</span>, <span class="st">\'is-error\'</span>],\n        <span class="kw">patterns</span>: [/^animate-/, /^modal/],\n      },\n    },\n  },\n};',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"vite.config.js"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== CSS の圧縮（Lightning CSS） ===== */</span>\n<span class="kw">import</span> { defineConfig } <span class="kw">from</span> <span class="st">\'vite\'</span>;\n\n<span class="kw">export</span> <span class="kw">default</span> <span class="fn">defineConfig</span>({\n  <span class="kw">css</span>: {\n    <span class="kw">transformer</span>: <span class="st">\'lightningcss\'</span>,    <span class="cm">/* Rust製の超高速CSS処理ツール */</span>\n    <span class="kw">lightningcss</span>: {\n      <span class="kw">minify</span>: <span class="kw">true</span>,\n      <span class="kw">browserslist</span>: <span class="st">\'last 2 versions, &gt; 1%\'</span>,\n    },\n  },\n  <span class="kw">build</span>: { <span class="kw">cssMinify</span>: <span class="st">\'lightningcss\'</span> },\n});',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch15-6"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-green-bg)", color: "var(--c-green-tx)" }}
                >
                  {"⑥"}
                </span>
                {"15.6 Core Web Vitalsとの関係"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          Core Web Vitals は Google が定める3つの品質指標で、検索順位にも影響します。CSSの書き方一つで、これらの数値は大きく改善できます。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={"Core Web Vitals: LCP, CLS, INPの3指標とそれぞれの目標値・改善策"}
                >
                  <MermaidDiagram chart={DIAGRAMS[14]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図15-3：Core Web Vitals 3指標とCSS視点での改善策"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <p>
                {"\n          HTML側で "}
                <code>{"width"}</code>
                {" と "}
                <code>{"height"}</code>
                {" 属性（または "}
                <code>{"srcset"}</code>
                {"）を適切に指定し、CSS側で "}
                <code>{"width: 100%; height: auto;"}</code>
                {
                  " を指定することで、モダンブラウザは自動的に画像のアスペクト比を計算し、表示領域を事前に確保（CLSを防止）します。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"pitfall-box"}>
                {"\n          "}
                <div className={"pitfall-box__title"}>
                  {"⚠️ 注意：attr() によるアスペクト比指定は避ける"}
                </div>
                {"\n          "}
                <p>
                  {"かつて一部の例で見られた "}
                  <code>{"aspect-ratio: attr(width) / attr(height)"}</code>
                  {" のようなCSSでの "}
                  <code>{"attr()"}</code>
                  {
                    " 関数を用いたアスペクト比の動的指定は、実験的な仕様であり、多くのブラウザでサポートされていません。これを記述すると、非サポート環境でアスペクト比が正しく適用されない（または無視される）リスクがあります。そのため、HTML側の属性でアスペクト比の情報をブラウザに提供するのが最も安全で確実なCLS対策です。"
                  }
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"cls-prevention.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* ===== CLS 対策: 画像にサイズ（アスペクト比）を確保する ===== */</span>\nimg {\n  <span class="cm">/* HTML側で width="..." height="..." を指定し、CSSで以下を適用します。\n     ブラウザが自動的にアスペクト比（auto width / height）を計算し、領域を確保します。 */</span>\n  <span class="kw">width</span>: <span class="nu">100%</span>;\n  <span class="kw">height</span>: auto;\n}\n\n<span class="cm">/* ===== CLS 対策: カスタムフォントのレイアウトシフト軽減 ===== */</span>\n<span class="cm">/* size-adjust で代替フォントのサイズを本番フォントに近づける */</span>\n@font-face {\n  <span class="kw">font-family</span>: <span class="st">\'InterFallback\'</span>;\n  <span class="kw">src</span>: <span class="fn">local</span>(<span class="st">\'Arial\'</span>);\n  <span class="kw">size-adjust</span>: <span class="nu">107%</span>;       <span class="cm">/* InterとArialのサイズ差を調整 */</span>\n  <span class="kw">ascent-override</span>: <span class="nu">90%</span>;\n  <span class="kw">descent-override</span>: <span class="nu">22%</span>;\n  <span class="kw">line-gap-override</span>: <span class="nu">0%</span>;\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"bp-box"}>
              {"\n        "}
              <div className={"bp-box__title"}>{"✅ パフォーマンス最適化のベストプラクティス"}</div>
              {"\n        "}
              <div className={"bp-grid"}>
                {"\n          "}
                <div className={"bp-col bp-col--do"}>
                  {"\n            "}
                  <div className={"bp-col__h"}>{"👍 DO"}</div>
                  {"\n            "}
                  <ul>
                    {"\n              "}
                    <li>{"ファーストビューのCSSはインライン化する"}</li>
                    {"\n              "}
                    <li>
                      {"画像・動画には常に "}
                      <code>{"width"}</code>
                      {"/"}
                      <code>{"height"}</code>
                      {" を指定する"}
                    </li>
                    {"\n              "}
                    <li>
                      {"画面外コンテンツに "}
                      <code>{"content-visibility: auto"}</code>
                      {" を活用する"}
                    </li>
                    {"\n              "}
                    <li>{"本番ビルドで未使用CSSを自動的にパージする"}</li>
                    {"\n            "}
                  </ul>
                  {"\n          "}
                </div>
                {"\n          "}
                <div className={"bp-col bp-col--dont"}>
                  {"\n            "}
                  <div className={"bp-col__h"}>{"👎 DON'T"}</div>
                  {"\n            "}
                  <ul>
                    {"\n              "}
                    <li>{"深くネストした非効率なセレクタを多用する"}</li>
                    {"\n              "}
                    <li>{"サイズ未指定の画像・広告枠を埋め込む"}</li>
                    {"\n              "}
                    <li>
                      {"実験的なCSS機能（"}
                      <code>{"attr()"}</code>
                      {"のアスペクト比利用等）に依存する"}
                    </li>
                    {"\n              "}
                    <li>{"全CSSを1つの巨大ファイルとして同期ロードする"}</li>
                    {"\n            "}
                  </ul>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"refs"}>
              {"\n        "}
              <div className={"refs__title"}>{"📚 第15章 参考文献"}</div>
              {"\n        "}
              <ul>
                {"\n          "}
                <li>
                  <a
                    href={"https://web.dev/articles/vitals"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"web.dev — Core Web Vitals"}</span>
                    <span className={"src-url"}>{"web.dev/articles/vitals"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"MDN — content-visibility"}</span>
                    <span className={"src-url"}>
                      {"developer.mozilla.org/en-US/docs/Web/CSS/content-visibility"}
                    </span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://web.dev/articles/fast#optimize_your_css"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"web.dev — CSS Performance"}</span>
                    <span className={"src-url"}>{"web.dev/articles/fast"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://lightningcss.dev/"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"Lightning CSS"}</span>
                    <span className={"src-url"}>{"lightningcss.dev"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={
                      "https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources"
                    }
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>
                      {"Chrome Developers — Eliminate render-blocking resources"}
                    </span>
                    <span className={"src-url"}>
                      {"developer.chrome.com/docs/lighthouse/performance/render-blocking-resources"}
                    </span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://web.dev/articles/avoid-invisible-text"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"web.dev — font-display"}</span>
                    <span className={"src-url"}>{"web.dev/articles/avoid-invisible-text"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a href={"https://purgecss.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                    <span className={"src-name"}>{"PurgeCSS"}</span>
                    <span className={"src-url"}>{"purgecss.com"}</span>
                  </a>
                </li>
                {"\n        "}
              </ul>
              {"\n      "}
            </div>
            {"\n    "}
          </section>
          {"\n\n\n    "}
          {"\n    "}
          <section className={"chapter"} id={"ch16"}>
            {"\n      "}
            <div className={"chapter__kicker"}>
              <span className={"chapter__num"}>{"CHAPTER 16"}</span>
              <span className={"chapter__rule"}></span>
            </div>
            {"\n      "}
            <h2>{"ツール・エコシステム"}</h2>
            {"\n      "}
            <span
              className={"badge"}
              style={{
                background: "var(--c-orange-bg)",
                color: "var(--c-orange-tx)",
                marginBottom: "var(--sp-4)",
                display: "inline-block",
              }}
            >
              {"🟠 中級編"}
            </span>
            {"\n      "}
            <p className={"chapter__intro"}>
              {
                "\n        ここまでの設計思想（アニメーション・アーキテクチャ・トークン）を、チームで継続的に運用していくためには「自動化」が欠かせません。\n        本章ではコンポーネントカタログ・CSSトランスパイル・Lint・ビジュアルリグレッションテストという4つの代表的なツールカテゴリと、\n        プロジェクト規模別の推奨スタックを紹介します。\n      "
              }
            </p>
            {"\n\n      "}
            <div className={"diagram-card"}>
              {"\n        "}
              {"\n        "}
              <div
                className="mermaid"
                role="img"
                aria-label={
                  "フロントエンド開発のツールチェーン: デザインツール連携、ビルドツール、コンポーネント開発、テスト、品質管理の5カテゴリ"
                }
              >
                <MermaidDiagram chart={DIAGRAMS[15]} preserveNaturalScale={true} />
              </div>
              {"\n        "}
              <p className={"diagram-card__cap"}>
                {"📊 図16-1：フロントエンド開発ツールチェーンの全体像"}
              </p>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch16-1"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-purple-bg)", color: "var(--c-purple-tx)" }}
                >
                  {"①"}
                </span>
                {"16.1 Storybook：コンポーネントカタログ"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          Storybook は、コンポーネントを実際のアプリケーションから切り離して単独で表示・操作できる「カタログ」を作るツールです。デザイナーやQA担当者がコードを読まなくても全パターンを確認でき、コンポーネントのドキュメントとしても機能します。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"beginner-box"}>
                {"\n          "}
                <div className={"beginner-box__label"}>
                  {"🔰 初学者向け：Storybookがあると何が嬉しいの？"}
                </div>
                {"\n          "}
                <p>
                  {
                    "新しいボタンコンポーネントを作ったとき、それをアプリの本番画面に組み込まないと見た目を確認できないのは非効率です。Storybookでは "
                  }
                  <code>{'variant="primary"'}</code>
                  {" や "}
                  <code>{'size="lg"'}</code>
                  {
                    " のような全組み合わせを一覧表示でき、「ボタンの全パターン」を1ページで見渡せます。デザインレビューやアクセシビリティチェックもこの単位で完結できるため、チーム開発のコミュニケーションコストが大きく下がります。"
                  }
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"Button.stories.tsx"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="kw">import</span> <span class="kw">type</span> { Meta, StoryObj } <span class="kw">from</span> <span class="st">\'@storybook/react\'</span>;\n<span class="kw">import</span> { Button } <span class="kw">from</span> <span class="st">\'./Button\'</span>;\n\n<span class="kw">const</span> <span class="kw">meta</span>: Meta&lt;typeof Button&gt; = {\n  <span class="kw">title</span>: <span class="st">\'Components/Button\'</span>,\n  <span class="kw">component</span>: Button,\n  <span class="kw">parameters</span>: {\n    <span class="kw">layout</span>: <span class="st">\'centered\'</span>,\n    <span class="kw">docs</span>: {\n      <span class="kw">description</span>: {\n        <span class="kw">component</span>: <span class="st">\'ユーザーのアクションを起動するためのインタラクティブ要素。\'</span>,\n      },\n    },\n  },\n  <span class="kw">argTypes</span>: {\n    <span class="kw">variant</span>: { <span class="kw">control</span>: { <span class="kw">type</span>: <span class="st">\'select\'</span> }, <span class="kw">options</span>: [<span class="st">\'primary\'</span>, <span class="st">\'secondary\'</span>, <span class="st">\'ghost\'</span>, <span class="st">\'danger\'</span>] },\n    <span class="kw">size</span>:    { <span class="kw">control</span>: { <span class="kw">type</span>: <span class="st">\'radio\'</span> }, <span class="kw">options</span>: [<span class="st">\'sm\'</span>, <span class="st">\'md\'</span>, <span class="st">\'lg\'</span>] },\n    <span class="kw">disabled</span>: { <span class="kw">control</span>: <span class="st">\'boolean\'</span> },\n    <span class="kw">loading</span>:  { <span class="kw">control</span>: <span class="st">\'boolean\'</span> },\n  },\n};\n\n<span class="kw">export</span> <span class="kw">default</span> meta;\n<span class="kw">type</span> Story = StoryObj&lt;typeof Button&gt;;\n\n<span class="kw">export</span> <span class="kw">const</span> <span class="kw">Primary</span>: Story = {\n  <span class="kw">args</span>: { <span class="kw">variant</span>: <span class="st">\'primary\'</span>, <span class="kw">size</span>: <span class="st">\'md\'</span>, <span class="kw">children</span>: <span class="st">\'送信する\'</span> },\n};\n\n<span class="kw">export</span> <span class="kw">const</span> <span class="kw">Danger</span>: Story = {\n  <span class="kw">args</span>: { <span class="kw">variant</span>: <span class="st">\'danger\'</span>, <span class="kw">size</span>: <span class="st">\'md\'</span>, <span class="kw">children</span>: <span class="st">\'削除する\'</span> },\n};\n\n<span class="kw">export</span> <span class="kw">const</span> <span class="kw">Loading</span>: Story = {\n  <span class="kw">args</span>: { <span class="kw">variant</span>: <span class="st">\'primary\'</span>, <span class="kw">size</span>: <span class="st">\'md\'</span>, <span class="kw">loading</span>: <span class="kw">true</span>, <span class="kw">children</span>: <span class="st">\'処理中...\'</span> },\n};\n\n<span class="cm">/* すべてのバリアントを一覧表示 */</span>\n<span class="kw">export</span> <span class="kw">const</span> <span class="kw">AllVariants</span>: Story = {\n  <span class="kw">render</span>: () =&gt; (\n    &lt;div style={{ <span class="kw">display</span>: <span class="st">\'flex\'</span>, <span class="kw">gap</span>: <span class="st">\'12px\'</span>, <span class="kw">flexWrap</span>: <span class="st">\'wrap\'</span> }}&gt;\n      {[<span class="st">\'primary\'</span>, <span class="st">\'secondary\'</span>, <span class="st">\'ghost\'</span>, <span class="st">\'danger\'</span>].<span class="fn">map</span>(variant =&gt;\n        [<span class="st">\'sm\'</span>, <span class="st">\'md\'</span>, <span class="st">\'lg\'</span>].<span class="fn">map</span>(size =&gt; (\n          &lt;Button key={<span class="st">`${variant}-${size}`</span>} variant={variant} size={size}&gt;\n            {variant} / {size}\n          &lt;/Button&gt;\n        ))\n      )}\n    &lt;/div&gt;\n  ),\n};',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch16-2"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-blue-bg)", color: "var(--c-blue-tx)" }}
                >
                  {"②"}
                </span>
                {"16.2 PostCSS：CSSのトランスパイル"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          PostCSS は、CSSをJavaScriptで処理するためのプラットフォームです。プラグインを組み合わせることで、まだブラウザが対応していない最新構文（CSS Nestingなど）を古いブラウザ向けに変換したり、ベンダープレフィックスを自動付与したり、本番ビルド時にファイルを圧縮したりできます。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"postcss.config.js"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="kw">export</span> <span class="kw">default</span> {\n  <span class="kw">plugins</span>: [\n    <span class="cm">/* ===== 構文拡張 ===== */</span>\n    <span class="st">\'postcss-import\'</span>,          <span class="cm">// @import を解決してバンドル</span>\n    <span class="st">\'postcss-nesting\'</span>,         <span class="cm">// CSS Nesting（W3C仕様）をサポート</span>\n\n    <span class="cm">/* ===== 互換性 ===== */</span>\n    <span class="st">\'autoprefixer\'</span>,            <span class="cm">// ベンダープレフィックスを自動付与</span>\n    <span class="st">\'postcss-preset-env\'</span>,      <span class="cm">// モダンCSSを古いブラウザ向けに変換</span>\n\n    <span class="cm">/* ===== 最適化 ===== */</span>\n    <span class="st">\'cssnano\'</span>,                 <span class="cm">// CSSの圧縮・最適化（本番ビルドのみ）</span>\n  ],\n};',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"card.css"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="cm">/* postcss-nesting の使用例（W3C CSS Nesting に準拠） */</span>\n.card {\n  <span class="kw">background</span>: <span class="fn">var</span>(--color-bg-surface);\n  <span class="kw">border-radius</span>: <span class="fn">var</span>(--radius-lg);\n\n  <span class="cm">/* ネストされたセレクタ */</span>\n  &amp; .card__title {\n    <span class="kw">font-size</span>: <span class="fn">var</span>(--font-size-xl);\n  }\n\n  &amp;:hover {\n    <span class="kw">border-color</span>: <span class="fn">var</span>(--color-action-primary);\n  }\n\n  <span class="cm">/* メディアクエリもネスト可能 */</span>\n  @<span class="fn">media</span> (<span class="kw">min-width</span>: <span class="nu">768px</span>) {\n    <span class="kw">display</span>: grid;\n    <span class="kw">grid-template-columns</span>: <span class="nu">200px</span> <span class="nu">1</span>fr;\n  }\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch16-3"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-green-bg)", color: "var(--c-green-tx)" }}
                >
                  {"③"}
                </span>
                {"16.3 Stylelint：CSSのLint"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          Stylelint は、第12章で決めた命名規則やプロパティの並び順を「自動でチェックする」ためのLintツールです。第13章のデザイントークンと連携させ、カラーコードのハードコーディングを禁止するルールも設定できます。レビューでの指摘事項をルール化して自動化することで、コードレビューの負担を技術的な議論に集中させられます。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{".stylelintrc.json"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '{\n  <span class="st">"extends"</span>: [\n    <span class="st">"stylelint-config-standard"</span>,\n    <span class="st">"stylelint-config-recommended-scss"</span>\n  ],\n  <span class="st">"plugins"</span>: [<span class="st">"stylelint-order"</span>],\n  <span class="st">"rules"</span>: {\n    <span class="st">"selector-class-pattern"</span>: [\n      <span class="st">"^[a-z][a-z0-9]*(__[a-z][a-z0-9]*)?(--[a-z][a-z0-9]*)?$"</span>,\n      { <span class="st">"message"</span>: <span class="st">"BEM 命名規則に従ってください"</span> }\n    ],\n    <span class="st">"custom-property-pattern"</span>: <span class="st">"^[a-z][a-z0-9-]*$"</span>,\n\n    <span class="st">"declaration-property-value-disallowed-list"</span>: {\n      <span class="st">"/.*/"</span>: [<span class="st">"#[0-9a-fA-F]{3,8}"</span>],\n      <span class="st">"message"</span>: <span class="st">"カスタムプロパティを使用してください（ハードコードされた色は禁止）"</span>\n    },\n\n    <span class="st">"order/properties-order"</span>: [\n      <span class="st">"display"</span>, <span class="st">"flex-direction"</span>, <span class="st">"align-items"</span>, <span class="st">"justify-content"</span>, <span class="st">"gap"</span>,\n      <span class="st">"grid-template-columns"</span>, <span class="st">"grid-template-rows"</span>,\n      <span class="st">"position"</span>, <span class="st">"top"</span>, <span class="st">"right"</span>, <span class="st">"bottom"</span>, <span class="st">"left"</span>, <span class="st">"z-index"</span>,\n      <span class="st">"width"</span>, <span class="st">"min-width"</span>, <span class="st">"max-width"</span>, <span class="st">"height"</span>, <span class="st">"min-height"</span>, <span class="st">"max-height"</span>,\n      <span class="st">"padding"</span>, <span class="st">"padding-block"</span>, <span class="st">"padding-inline"</span>,\n      <span class="st">"margin"</span>, <span class="st">"margin-block"</span>, <span class="st">"margin-inline"</span>,\n      <span class="st">"border"</span>, <span class="st">"border-radius"</span>,\n      <span class="st">"background"</span>, <span class="st">"color"</span>,\n      <span class="st">"font-size"</span>, <span class="st">"font-weight"</span>, <span class="st">"line-height"</span>,\n      <span class="st">"transition"</span>, <span class="st">"animation"</span>\n    ],\n\n    <span class="st">"no-descending-specificity"</span>: <span class="kw">true</span>,\n    <span class="st">"color-no-invalid-hex"</span>: <span class="kw">true</span>,\n    <span class="st">"shorthand-property-no-redundant-values"</span>: <span class="kw">true</span>\n  }\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch16-4"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-orange-bg)", color: "var(--c-orange-tx)" }}
                >
                  {"④"}
                </span>
                {"16.4 Chromatic：ビジュアルリグレッションテスト"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          CSSの変更は、意図しない箇所の見た目を壊してしまう「副作用」が起きやすいという特徴があります。Chromatic は、Storybookの各コンポーネントのスクリーンショットをPull Requestごとに撮影し、直前のバージョンと自動比較してくれるサービスです。意図しない見た目の変化があれば、マージ前に検出できます。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{"package.json（抜粋）"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '{\n  <span class="st">"scripts"</span>: {\n    <span class="st">"chromatic"</span>: <span class="st">"chromatic --project-token=$CHROMATIC_PROJECT_TOKEN"</span>,\n    <span class="st">"test:storybook"</span>: <span class="st">"test-storybook --url http://localhost:6006"</span>\n  }\n}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"code-card"}>
                {"\n          "}
                <div className={"code-card__bar"}>
                  <div className={"code-card__dots"}>
                    <span style={{ background: "rgb(244, 63, 94)" }}></span>
                    <span style={{ background: "rgb(245, 158, 11)" }}></span>
                    <span style={{ background: "rgb(34, 197, 94)" }}></span>
                  </div>
                  <span>{".github/workflows/chromatic.yml"}</span>
                </div>
                {"\n          "}
                <pre
                  dangerouslySetInnerHTML={{
                    __html:
                      '<span class="kw">name</span>: <span class="st">"Chromatic"</span>\n\n<span class="kw">on</span>: push\n\n<span class="kw">jobs</span>:\n  <span class="kw">chromatic-deployment</span>:\n    <span class="kw">runs-on</span>: ubuntu-latest\n    <span class="kw">steps</span>:\n      - <span class="kw">name</span>: Checkout repository\n        <span class="kw">uses</span>: actions/checkout@v4\n        <span class="kw">with</span>:\n          <span class="kw">fetch-depth</span>: <span class="nu">0</span> <span class="cm"># Chromaticには履歴が必要</span>\n\n      - <span class="kw">name</span>: Install dependencies\n        <span class="kw">run</span>: bun install\n\n      - <span class="kw">name</span>: Publish to Chromatic\n        <span class="kw">uses</span>: chromaui/action@v1\n        <span class="kw">with</span>:\n          <span class="kw">projectToken</span>: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}',
                  }}
                />
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "ChromaticのCIパイプライン: PRからStorybookビルド、アップロード、比較、レビュー、マージまたは修正の流れ"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[16]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図16-2：Chromaticを組み込んだビジュアルテストのCIフロー"}
                </p>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"sub"} id={"ch16-5"}>
              {"\n        "}
              <h3>
                <span
                  className={"ico"}
                  style={{ background: "var(--c-purple-bg)", color: "var(--c-purple-tx)" }}
                >
                  {"⑤"}
                </span>
                {"16.5 ツールの推奨スタック"}
              </h3>
              {"\n        "}
              <p>
                {
                  "\n          全てのツールを最初から導入する必要はありません。プロジェクトの規模に応じて、段階的に拡張していくのが現実的です。\n        "
                }
              </p>
              {"\n\n        "}
              <div className={"diagram-card"}>
                {"\n          "}
                {"\n          "}
                <div
                  className="mermaid"
                  role="img"
                  aria-label={
                    "ツールの推奨スタック: スターターセット, プロセット, エンタープライズの3段階"
                  }
                >
                  <MermaidDiagram chart={DIAGRAMS[17]} preserveNaturalScale={true} />
                </div>
                {"\n          "}
                <p className={"diagram-card__cap"}>
                  {"📊 図16-3：プロジェクト規模別の推奨ツールスタック"}
                </p>
                {"\n        "}
              </div>
              {"\n\n        "}
              <div className={"table-wrap"}>
                {"\n          "}
                <table>
                  {"\n            "}
                  <thead>
                    <tr>
                      <th>{"カテゴリ"}</th>
                      <th>{"ツール例"}</th>
                      <th>{"主な役割"}</th>
                    </tr>
                  </thead>
                  {"\n            "}
                  <tbody>
                    {"\n              "}
                    <tr>
                      <td>{"デザイン連携"}</td>
                      <td>{"Figma / Tokens Studio / Figma to Code"}</td>
                      <td>{"デザインとコードのトークン同期"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"ビルド"}</td>
                      <td>{"Vite / Turbopack / Lightning CSS / PostCSS"}</td>
                      <td>{"変換・圧縮・バンドル"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"コンポーネント開発"}</td>
                      <td>{"Storybook / Ladle / Histoire"}</td>
                      <td>{"独立した環境でのUI構築・確認"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"テスト"}</td>
                      <td>{"Playwright / axe-core / Chromatic"}</td>
                      <td>{"機能・アクセシビリティ・見た目の検証"}</td>
                    </tr>
                    {"\n              "}
                    <tr>
                      <td>{"品質管理"}</td>
                      <td>{"Stylelint / Prettier / ESLint"}</td>
                      <td>{"コードスタイルと規約の自動チェック"}</td>
                    </tr>
                    {"\n            "}
                  </tbody>
                  {"\n          "}
                </table>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"bp-box"}>
              {"\n        "}
              <div className={"bp-box__title"}>{"✅ ツール導入のベストプラクティス"}</div>
              {"\n        "}
              <div className={"bp-grid"}>
                {"\n          "}
                <div className={"bp-col bp-col--do"}>
                  {"\n            "}
                  <div className={"bp-col__h"}>{"👍 DO"}</div>
                  {"\n            "}
                  <ul>
                    {"\n              "}
                    <li>{"まずStylelint等の静的解析からスモールスタートする"}</li>
                    {"\n              "}
                    <li>{"Storybookをデザイナー・QAとの共通言語にする"}</li>
                    {"\n              "}
                    <li>{"CIにビジュアルリグレッションテストを組み込む"}</li>
                    {"\n              "}
                    <li>{"ツール導入の目的（何を防ぎたいか）を明文化する"}</li>
                    {"\n            "}
                  </ul>
                  {"\n          "}
                </div>
                {"\n          "}
                <div className={"bp-col bp-col--dont"}>
                  {"\n            "}
                  <div className={"bp-col__h"}>{"👎 DON'T"}</div>
                  {"\n            "}
                  <ul>
                    {"\n              "}
                    <li>{"チーム規模に見合わない過剰なツールチェーンを一気に導入する"}</li>
                    {"\n              "}
                    <li>{"Lintルールを厳しくしすぎて開発速度を著しく落とす"}</li>
                    {"\n              "}
                    <li>{"ビジュアルテストの差分を確認せず機械的に承認する"}</li>
                    {"\n            "}
                  </ul>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"refs"}>
              {"\n        "}
              <div className={"refs__title"}>{"📚 第16章 参考文献"}</div>
              {"\n        "}
              <ul>
                {"\n          "}
                <li>
                  <a
                    href={"https://storybook.js.org/"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"Storybook 公式"}</span>
                    <span className={"src-url"}>{"storybook.js.org"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a href={"https://postcss.org/"} target={"_blank"} rel={"noopener noreferrer"}>
                    <span className={"src-name"}>{"PostCSS 公式"}</span>
                    <span className={"src-url"}>{"postcss.org"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a href={"https://stylelint.io/"} target={"_blank"} rel={"noopener noreferrer"}>
                    <span className={"src-name"}>{"Stylelint 公式"}</span>
                    <span className={"src-url"}>{"stylelint.io"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://www.chromatic.com/"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"Chromatic（ビジュアルテスト）"}</span>
                    <span className={"src-url"}>{"chromatic.com"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://www.deque.com/axe/"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"axe DevTools"}</span>
                    <span className={"src-url"}>{"deque.com/axe"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a href={"https://vitejs.dev/"} target={"_blank"} rel={"noopener noreferrer"}>
                    <span className={"src-name"}>{"Vite 公式"}</span>
                    <span className={"src-url"}>{"vitejs.dev"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a
                    href={"https://turbo.build/repo"}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    <span className={"src-name"}>{"Turborepo（Vercel）"}</span>
                    <span className={"src-url"}>{"turbo.build/repo"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a href={"https://panda-css.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                    <span className={"src-name"}>{"Panda CSS"}</span>
                    <span className={"src-url"}>{"panda-css.com"}</span>
                  </a>
                </li>
                {"\n          "}
                <li>
                  <a href={"https://zeroheight.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                    <span className={"src-name"}>{"Zeroheight（デザインドキュメント）"}</span>
                    <span className={"src-url"}>{"zeroheight.com"}</span>
                  </a>
                </li>
                {"\n        "}
              </ul>
              {"\n      "}
            </div>
            {"\n    "}
          </section>
          {"\n\n\n    "}
          {"\n    "}
          <section className={"chapter"} id={"maturity"}>
            {"\n      "}
            <div className={"chapter__kicker"}>
              <span className={"chapter__num"}>{"SUMMARY"}</span>
              <span className={"chapter__rule"}></span>
            </div>
            {"\n      "}
            <h2>{"全体まとめ：デザインシステムの成熟度モデル"}</h2>
            {"\n      "}
            <p className={"chapter__intro"}>
              {
                "\n        本ガイドで扱った内容を、デザインシステムの成熟度という軸で振り返ります。\n        Level 1の基礎的なCSS変数の導入から、Level 5の組織横断的なパフォーマンス最適化・CI/CD統合まで、\n        段階を踏んで着実にレベルアップしていくのが現実的な進め方です。"
              }
              <strong>{"一足飛びにLevel 5を目指す必要はありません。"}</strong>
              {
                "\n        自分たちのチームが今どの段階にいるかを把握し、次の一歩を選んでください。\n      "
              }
            </p>
            {"\n\n      "}
            <div className={"diagram-card"}>
              {"\n        "}
              {"\n        "}
              <div
                className="mermaid"
                role="img"
                aria-label={
                  "デザインシステムの成熟度モデル: Level1入門からLevel5エキスパートまでの5段階"
                }
              >
                <MermaidDiagram chart={DIAGRAMS[18]} preserveNaturalScale={true} />
              </div>
              {"\n        "}
              <p className={"diagram-card__cap"}>
                {
                  "📊 図S-1：デザインシステム成熟度モデルの5段階（本ガイドはLevel 4〜5を中心に解説）"
                }
              </p>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"table-wrap"}>
              {"\n        "}
              <table>
                {"\n          "}
                <thead>
                  <tr>
                    <th>{"レベル"}</th>
                    <th>{"本ガイドの対応章"}</th>
                    <th>{"到達目安"}</th>
                  </tr>
                </thead>
                {"\n          "}
                <tbody>
                  {"\n            "}
                  <tr>
                    <td>{"Level 4：上級"}</td>
                    <td>
                      {"第11章（アニメーション）・第12章（アーキテクチャ）・第13章（トークン）"}
                    </td>
                    <td>{"一貫した動きの言語と、崩れない設計の仕組みを持つ"}</td>
                  </tr>
                  {"\n            "}
                  <tr>
                    <td>{"Level 4→5の橋渡し"}</td>
                    <td>{"第14章（実践：Modal実装）"}</td>
                    <td>{"学んだ概念を1つのコンポーネントに統合して実装できる"}</td>
                  </tr>
                  {"\n            "}
                  <tr>
                    <td>{"Level 5：エキスパート"}</td>
                    <td>{"第15章（パフォーマンス）・第16章（ツール）"}</td>
                    <td>{"数値で計測し、自動化されたプロセスで品質を維持する"}</td>
                  </tr>
                  {"\n          "}
                </tbody>
                {"\n        "}
              </table>
              {"\n      "}
            </div>
            {"\n\n      "}
            <div className={"bp-box"}>
              {"\n        "}
              <div className={"bp-box__title"}>{"✅ 次の一歩を選ぶためのチェックリスト"}</div>
              {"\n        "}
              <div className={"bp-grid"}>
                {"\n          "}
                <div className={"bp-col bp-col--do"}>
                  {"\n            "}
                  <div className={"bp-col__h"}>{"🟢 まだLevel 3以下の場合"}</div>
                  {"\n            "}
                  <ul>
                    {"\n              "}
                    <li>{"まずCSS変数でカラー・スペーシングをトークン化する"}</li>
                    {"\n              "}
                    <li>{"BEMなど命名規則を1つ選んでチームで統一する"}</li>
                    {"\n              "}
                    <li>{"主要コンポーネントにアクセシビリティ属性を付与する"}</li>
                    {"\n            "}
                  </ul>
                  {"\n          "}
                </div>
                {"\n          "}
                <div className={"bp-col bp-col--dont"}>
                  {"\n            "}
                  <div className={"bp-col__h"}>{"🟣 Level 4以上を目指す場合"}</div>
                  {"\n            "}
                  <ul>
                    {"\n              "}
                    <li>
                      {"イージング・デュレーションのトークン化からアニメーション言語を統一する"}
                    </li>
                    {"\n              "}
                    <li>{"@layer導入で詳細度問題を構造的に解決する"}</li>
                    {"\n              "}
                    <li>{"Style DictionaryでFigma〜コードのトークンパイプラインを構築する"}</li>
                    {"\n              "}
                    <li>{"Core Web Vitalsを定期計測しCIに組み込む"}</li>
                    {"\n            "}
                  </ul>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n    "}
          </section>
          {"\n\n    "}
          <section className={"chapter"} id={"allrefs"} style={{}}>
            {"\n      "}
            <div className={"chapter__kicker"}>
              <span className={"chapter__num"}>{"REFERENCES"}</span>
              <span className={"chapter__rule"}></span>
            </div>
            {"\n      "}
            <h2>{"参考文献・ソース一覧"}</h2>
            {"\n      "}
            <p className={"chapter__intro"}>
              {
                "\n        本ガイドの記述は、以下の一次情報・公式ドキュメントを根拠としています。最新の仕様変更やブラウザ対応状況は、各リンク先で随時ご確認ください。\n      "
              }
            </p>
            {"\n\n      "}
            <div className={"sub"}>
              {"\n        "}
              <h4>{"🎬 アニメーション・トランジション"}</h4>
              {"\n        "}
              <div className={"refs"}>
                {"\n          "}
                <ul>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://developer.mozilla.org/ja/docs/Web/CSS/CSS_transitions"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"MDN — CSS Transitions"}</span>
                      <span className={"src-url"}>
                        {"developer.mozilla.org/ja/docs/Web/CSS/CSS_transitions"}
                      </span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://developer.mozilla.org/ja/docs/Web/CSS/CSS_animations"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"MDN — CSS Animations"}</span>
                      <span className={"src-url"}>
                        {"developer.mozilla.org/ja/docs/Web/CSS/CSS_animations"}
                      </span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"MDN — View Transitions API"}</span>
                      <span className={"src-url"}>
                        {"developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API"}
                      </span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://m3.material.io/styles/motion/overview"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"Material Design 3 — Motion"}</span>
                      <span className={"src-url"}>{"m3.material.io/styles/motion/overview"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://web.dev/articles/animations-guide"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"web.dev — Animations Guide"}</span>
                      <span className={"src-url"}>{"web.dev/articles/animations-guide"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://css-tricks.com/css-animation-tricks/"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"CSS-Tricks — Animation Performance"}</span>
                      <span className={"src-url"}>{"css-tricks.com/css-animation-tricks"}</span>
                    </a>
                  </li>
                  {"\n          "}
                </ul>
                {"\n        "}
              </div>
              {"\n\n        "}
              <h4>{"🏗️ CSSアーキテクチャ"}</h4>
              {"\n        "}
              <div className={"refs"}>
                {"\n          "}
                <ul>
                  {"\n            "}
                  <li>
                    <a
                      href={
                        "https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528"
                      }
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"ITCSS（Harry Roberts）"}</span>
                      <span className={"src-url"}>
                        {"creativebloq.com — manage-large-css-projects-itcss"}
                      </span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a href={"https://cube.fyi/"} target={"_blank"} rel={"noopener noreferrer"}>
                      <span className={"src-name"}>{"CUBE CSS（Andy Bell）"}</span>
                      <span className={"src-url"}>{"cube.fyi"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://developer.mozilla.org/ja/docs/Web/CSS/@layer"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"MDN — CSS Cascade Layers (@layer)"}</span>
                      <span className={"src-url"}>
                        {"developer.mozilla.org/ja/docs/Web/CSS/@layer"}
                      </span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://www.smashingmagazine.com/2022/01/new-layer-tools-for-css/"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>
                        {"Smashing Magazine — Cascade Layers (Miriam Suzanne)"}
                      </span>
                      <span className={"src-url"}>
                        {"smashingmagazine.com/2022/01/new-layer-tools-for-css"}
                      </span>
                    </a>
                  </li>
                  {"\n          "}
                </ul>
                {"\n        "}
              </div>
              {"\n\n        "}
              <h4>{"🎨 デザイントークン"}</h4>
              {"\n        "}
              <div className={"refs"}>
                {"\n          "}
                <ul>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://www.w3.org/TR/design-tokens/"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"W3C — Design Tokens 仕様"}</span>
                      <span className={"src-url"}>{"w3.org/TR/design-tokens"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://styledictionary.com"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"Style Dictionary（Amazon）"}</span>
                      <span className={"src-url"}>{"styledictionary.com"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://tokens.studio/"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"Tokens Studio for Figma"}</span>
                      <span className={"src-url"}>{"tokens.studio"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://github.com/salesforce-ux/theo"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"Theo（Salesforce）"}</span>
                      <span className={"src-url"}>{"github.com/salesforce-ux/theo"}</span>
                    </a>
                  </li>
                  {"\n          "}
                </ul>
                {"\n        "}
              </div>
              {"\n\n        "}
              <h4>{"⚡ パフォーマンス最適化"}</h4>
              {"\n        "}
              <div className={"refs"}>
                {"\n          "}
                <ul>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://web.dev/articles/vitals"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"web.dev — Core Web Vitals"}</span>
                      <span className={"src-url"}>{"web.dev/articles/vitals"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"MDN — content-visibility"}</span>
                      <span className={"src-url"}>
                        {"developer.mozilla.org/en-US/docs/Web/CSS/content-visibility"}
                      </span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://web.dev/articles/fast#optimize_your_css"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"web.dev — CSS Performance"}</span>
                      <span className={"src-url"}>{"web.dev/articles/fast"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://lightningcss.dev/"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"Lightning CSS"}</span>
                      <span className={"src-url"}>{"lightningcss.dev"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={
                        "https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources"
                      }
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>
                        {"Chrome Developers — Eliminate render-blocking resources"}
                      </span>
                      <span className={"src-url"}>
                        {
                          "developer.chrome.com/docs/lighthouse/performance/render-blocking-resources"
                        }
                      </span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://web.dev/articles/avoid-invisible-text"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"web.dev — font-display"}</span>
                      <span className={"src-url"}>{"web.dev/articles/avoid-invisible-text"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a href={"https://purgecss.com/"} target={"_blank"} rel={"noopener noreferrer"}>
                      <span className={"src-name"}>{"PurgeCSS"}</span>
                      <span className={"src-url"}>{"purgecss.com"}</span>
                    </a>
                  </li>
                  {"\n          "}
                </ul>
                {"\n        "}
              </div>
              {"\n\n        "}
              <h4>{"🛠️ ツール・エコシステム"}</h4>
              {"\n        "}
              <div className={"refs"}>
                {"\n          "}
                <ul>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://storybook.js.org/"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"Storybook 公式"}</span>
                      <span className={"src-url"}>{"storybook.js.org"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a href={"https://postcss.org/"} target={"_blank"} rel={"noopener noreferrer"}>
                      <span className={"src-name"}>{"PostCSS 公式"}</span>
                      <span className={"src-url"}>{"postcss.org"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a href={"https://stylelint.io/"} target={"_blank"} rel={"noopener noreferrer"}>
                      <span className={"src-name"}>{"Stylelint 公式"}</span>
                      <span className={"src-url"}>{"stylelint.io"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://www.chromatic.com/"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"Chromatic（ビジュアルテスト）"}</span>
                      <span className={"src-url"}>{"chromatic.com"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://www.deque.com/axe/"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"axe DevTools"}</span>
                      <span className={"src-url"}>{"deque.com/axe"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a href={"https://vitejs.dev/"} target={"_blank"} rel={"noopener noreferrer"}>
                      <span className={"src-name"}>{"Vite 公式"}</span>
                      <span className={"src-url"}>{"vitejs.dev"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://turbo.build/repo"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"Turborepo（Vercel）"}</span>
                      <span className={"src-url"}>{"turbo.build/repo"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://panda-css.com/"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"Panda CSS"}</span>
                      <span className={"src-url"}>{"panda-css.com"}</span>
                    </a>
                  </li>
                  {"\n            "}
                  <li>
                    <a
                      href={"https://zeroheight.com/"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <span className={"src-name"}>{"Zeroheight（デザインドキュメント）"}</span>
                      <span className={"src-url"}>{"zeroheight.com"}</span>
                    </a>
                  </li>
                  {"\n          "}
                </ul>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n    "}
          </section>
          {"\n\n\n    "}
          <footer className={"site-footer"}>
            {"\n      "}
            <p>
              {
                "著者：Software Architect Guide ｜ ソフトウェアアーキテクチャ設計プロジェクト ｜ 最終更新日 2026-05-27"
              }
            </p>
            {"\n      "}
            <p style={{ marginTop: "6px" }}>
              {
                "本ガイドは教育目的の技術解説資料です。各社・各プロジェクトの仕様変更に伴い記載内容が古くなる場合があります。最新情報は各参考文献の一次情報をご確認ください。"
              }
            </p>
            {"\n    "}
          </footer>
          {"\n\n  "}
        </main>
        {"\n"}
      </div>
    </div>
  );
}
