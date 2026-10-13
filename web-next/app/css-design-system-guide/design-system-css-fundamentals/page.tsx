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
} as const;

// Static escaped source examples; no CSS or HTML example is executed.
const CODE_BLOCKS = {
  "code-1":
    '<span class="cm">/* =============================================\n   レイヤー1: プリミティブトークン（生の値）\n   絶対に直接コンポーネントで使わない。\n   セマンティックトークンを介してのみ参照する。\n   ============================================= */</span>\n:root {\n  <span class="cm">/* カラースケール */</span>\n  <span class="kw">--purple-100</span>: <span class="st">#ede9fe</span>;\n  <span class="kw">--purple-300</span>: <span class="st">#c4b5fd</span>;\n  <span class="kw">--purple-500</span>: <span class="st">#6C47FF</span>;   <span class="cm">/* ブランドカラー */</span>\n  <span class="kw">--purple-700</span>: <span class="st">#5b21b6</span>;\n  <span class="kw">--purple-900</span>: <span class="st">#2e1065</span>;\n\n  <span class="kw">--neutral-50</span>:  <span class="st">#f8fafc</span>;\n  <span class="kw">--neutral-100</span>: <span class="st">#f1f5f9</span>;\n  <span class="kw">--neutral-400</span>: <span class="st">#94a3b8</span>;\n  <span class="kw">--neutral-700</span>: <span class="st">#334155</span>;\n  <span class="kw">--neutral-900</span>: <span class="st">#0f172a</span>;\n\n  <span class="kw">--red-500</span>: <span class="st">#ef4444</span>;\n  <span class="kw">--green-500</span>: <span class="st">#22c55e</span>;\n  <span class="kw">--yellow-500</span>: <span class="st">#eab308</span>;\n\n  <span class="cm">/* スペーススケール（4px基準グリッド） */</span>\n  <span class="kw">--primitive-space-1</span>: <span class="nu">4px</span>;\n  <span class="kw">--primitive-space-2</span>: <span class="nu">8px</span>;\n  <span class="kw">--primitive-space-3</span>: <span class="nu">12px</span>;\n  <span class="kw">--primitive-space-4</span>: <span class="nu">16px</span>;\n  <span class="kw">--primitive-space-6</span>: <span class="nu">24px</span>;\n  <span class="kw">--primitive-space-8</span>: <span class="nu">32px</span>;\n  <span class="kw">--primitive-space-12</span>: <span class="nu">48px</span>;\n  <span class="kw">--primitive-space-16</span>: <span class="nu">64px</span>;\n\n  <span class="cm">/* タイポグラフィスケール */</span>\n  <span class="kw">--primitive-text-xs</span>:   <span class="nu">0.75rem</span>;   <span class="cm">/* 12px */</span>\n  <span class="kw">--primitive-text-sm</span>:   <span class="nu">0.875rem</span>;  <span class="cm">/* 14px */</span>\n  <span class="kw">--primitive-text-base</span>: <span class="nu">1rem</span>;      <span class="cm">/* 16px */</span>\n  <span class="kw">--primitive-text-lg</span>:   <span class="nu">1.125rem</span>;  <span class="cm">/* 18px */</span>\n  <span class="kw">--primitive-text-xl</span>:   <span class="nu">1.25rem</span>;   <span class="cm">/* 20px */</span>\n  <span class="kw">--primitive-text-2xl</span>:  <span class="nu">1.5rem</span>;    <span class="cm">/* 24px */</span>\n  <span class="kw">--primitive-text-3xl</span>:  <span class="nu">1.875rem</span>;  <span class="cm">/* 30px */</span>\n}\n\n<span class="cm">/* =============================================\n   レイヤー2: セマンティックトークン（意味付き）\n   「何のために使うか」を名前で表現する。\n   ============================================= */</span>\n:root {\n  <span class="cm">/* 色 — 役割ベース */</span>\n  <span class="kw">--color-primary</span>:          <span class="fn">var</span>(--purple-<span class="nu">500</span>);\n  <span class="kw">--color-primary-hover</span>:    <span class="fn">var</span>(--purple-<span class="nu">700</span>);\n  <span class="kw">--color-danger</span>:           <span class="fn">var</span>(--red-<span class="nu">500</span>);\n  <span class="kw">--color-success</span>:          <span class="fn">var</span>(--green-<span class="nu">500</span>);\n  <span class="kw">--color-warning</span>:          <span class="fn">var</span>(--yellow-<span class="nu">500</span>);\n\n  <span class="kw">--color-bg-base</span>:          <span class="fn">var</span>(--neutral-<span class="nu">900</span>);\n  <span class="kw">--color-bg-surface</span>:       <span class="fn">var</span>(--neutral-<span class="nu">700</span>);\n  <span class="kw">--color-text-primary</span>:     <span class="fn">var</span>(--neutral-<span class="nu">50</span>);\n  <span class="kw">--color-text-secondary</span>:   <span class="fn">var</span>(--neutral-<span class="nu">400</span>);\n  <span class="kw">--color-border</span>:           <span class="fn">var</span>(--neutral-<span class="nu">700</span>);\n\n  <span class="cm">/* スペース — 用途ベース */</span>\n  <span class="kw">--space-component-xs</span>:  <span class="fn">var</span>(--primitive-space-<span class="nu">1</span>);  <span class="cm">/* 4px  */</span>\n  <span class="kw">--space-component-sm</span>:  <span class="fn">var</span>(--primitive-space-<span class="nu">2</span>);  <span class="cm">/* 8px  */</span>\n  <span class="kw">--space-component-md</span>:  <span class="fn">var</span>(--primitive-space-<span class="nu">4</span>);  <span class="cm">/* 16px */</span>\n  <span class="kw">--space-component-lg</span>:  <span class="fn">var</span>(--primitive-space-<span class="nu">6</span>);  <span class="cm">/* 24px */</span>\n  <span class="kw">--space-layout-md</span>:     <span class="fn">var</span>(--primitive-space-<span class="nu">8</span>);  <span class="cm">/* 32px */</span>\n  <span class="kw">--space-layout-lg</span>:     <span class="fn">var</span>(--primitive-space-<span class="nu">12</span>); <span class="cm">/* 48px */</span>\n\n  <span class="cm">/* タイポグラフィ — 用途ベース */</span>\n  <span class="kw">--text-body</span>:     <span class="fn">var</span>(--primitive-text-base);\n  <span class="kw">--text-body-sm</span>:  <span class="fn">var</span>(--primitive-text-sm);\n  <span class="kw">--text-label</span>:    <span class="fn">var</span>(--primitive-text-xs);\n  <span class="kw">--text-heading</span>:  <span class="fn">var</span>(--primitive-text-2xl);\n  <span class="kw">--text-display</span>:  <span class="fn">var</span>(--primitive-text-3xl);\n\n  <span class="cm">/* ボーダー半径 */</span>\n  <span class="kw">--radius-sm</span>: <span class="nu">4px</span>;\n  <span class="kw">--radius-md</span>: <span class="nu">8px</span>;\n  <span class="kw">--radius-lg</span>: <span class="nu">12px</span>;\n  <span class="kw">--radius-full</span>: <span class="nu">9999px</span>;\n}\n\n<span class="cm">/* =============================================\n   レイヤー3: コンポーネントトークン\n   特定コンポーネントのみで参照する変数\n   ============================================= */</span>\n.button {\n  <span class="kw">--btn-bg</span>:         <span class="fn">var</span>(--color-primary);\n  <span class="kw">--btn-bg-hover</span>:   <span class="fn">var</span>(--color-primary-hover);\n  <span class="kw">--btn-text</span>:       white;\n  <span class="kw">--btn-padding-v</span>:  <span class="fn">var</span>(--space-component-sm);\n  <span class="kw">--btn-padding-h</span>:  <span class="fn">var</span>(--space-component-md);\n  <span class="kw">--btn-radius</span>:     <span class="fn">var</span>(--radius-md);\n\n  <span class="cm">/* ↑ 上記変数をここで使用 */</span>\n  <span class="kw">display</span>: inline-flex;\n  <span class="kw">align-items</span>: center;\n  <span class="kw">padding</span>: <span class="fn">var</span>(--btn-padding-v) <span class="fn">var</span>(--btn-padding-h);\n  <span class="kw">background</span>: <span class="fn">var</span>(--btn-bg);\n  <span class="kw">color</span>: <span class="fn">var</span>(--btn-text);\n  <span class="kw">border-radius</span>: <span class="fn">var</span>(--btn-radius);\n  <span class="kw">transition</span>: background <span class="nu">0.15s</span> ease;\n}\n\n.<span class="kw">button</span>:hover { <span class="kw">background</span>: <span class="fn">var</span>(--btn-bg-hover); }\n',
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
        </section>
      </main>
    </div>
  );
}
