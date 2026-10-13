import {
  IconBulb,
  IconCalendar,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconLink,
  IconMap,
  IconMinimize,
  IconPackage,
  IconRecycle,
  IconUser,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import MvpSidebar from "./MvpSidebar";
import { NAV_ITEMS } from "./navigation";

export const metadata: Metadata = {
  title: "MVP（最小実行可能製品）開発 完全ガイド",
  description:
    "初学者から中級エンジニアまでを対象に、MVP開発の思想・プロセス・実装・測定を網羅的に解説します。リーンスタートアップの原則に基づき、無駄なく素早く学ぶためのロードマップを提供します。",
};

const DIAGRAMS = {
  "lean-1":
    'flowchart TD\nIDEAS["💡 アイデア(仮説)"]\nBUILD["🔨 Build(構築)<br/>仮説を検証するMVPを素早く構築"]\nPRODUCT["📦 プロダクト(MVP)"]\nMEASURE["📊 Measure(測定)<br/>実ユーザーの行動データを定量計測"]\nDATA["📈 データ(指標・メトリクス)"]\nLEARN["🧠 Learn(学習)<br/>何が正しく何が間違っていたかを学ぶ"]\n\nIDEAS --> BUILD --> PRODUCT --> MEASURE --> DATA --> LEARN\nLEARN -->|"仮説を更新"| IDEAS\n\nstyle IDEAS fill:#d97706,color:#fff,stroke:none\nstyle BUILD fill:#dc2626,color:#fff,stroke:none\nstyle PRODUCT fill:#2563eb,color:#fff,stroke:none\nstyle MEASURE fill:#7c3aed,color:#fff,stroke:none\nstyle DATA fill:#0d9488,color:#fff,stroke:none\nstyle LEARN fill:#16a34a,color:#fff,stroke:none',
  "lean-2":
    'graph LR\nA["仮説<br/>(Assumption)<br/>「顧客はXという問題を持つ」<br/>「Yという解決策が機能するはず」"]\nB["実験<br/>(Experiment)<br/>最小の労力でこの仮説を<br/>検証できるMVPを構築する"]\nC["結果<br/>(Result)<br/>実際のユーザー行動から<br/>定量的なデータを収集する"]\nD["洞察<br/>(Insight)<br/>仮説は正しかったか？<br/>何を学んだか？"]\n\nA --> B --> C --> D --> A\n\nstyle A fill:#dc2626,color:#fff,stroke:none\nstyle B fill:#2563eb,color:#fff,stroke:none\nstyle C fill:#d97706,color:#fff,stroke:none\nstyle D fill:#16a34a,color:#fff,stroke:none',
  "process-1":
    'flowchart TD\nP1["🔍 Phase 1:問題発見<br/>顧客インタビュー・市場調査・競合分析"]\nP2["🎯 Phase 2:スコープ定義<br/>ユーザーストーリー・機能優先順位・KPI設定"]\nP3["🏗️ Phase 3:アーキテクチャ設計<br/>技術スタック選定・拡張性・セキュリティ"]\nP4["⚙️ Phase 4:実装<br/>コア機能の開発・CI/CD整備・品質保証"]\nP5["🚀 Phase 5:リリース<br/>限定公開・段階的ロールアウト・監視設定"]\nP6["📊 Phase 6:測定<br/>メトリクス収集・ユーザー行動分析・定性フィードバック"]\nP7["🔄 Phase 7:学習・意思決定<br/>ピボット or 継続・次の仮説・機能追加計画"]\n\nP1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7\nP7 -->|"反復"| P1\n\nstyle P1 fill:#2563eb,color:#fff,stroke:none\nstyle P2 fill:#7c3aed,color:#fff,stroke:none\nstyle P3 fill:#ea580c,color:#fff,stroke:none\nstyle P4 fill:#dc2626,color:#fff,stroke:none\nstyle P5 fill:#16a34a,color:#fff,stroke:none\nstyle P6 fill:#0d9488,color:#fff,stroke:none\nstyle P7 fill:#d97706,color:#fff,stroke:none',
} as const;

export default function Page() {
  return (
    <div className="minimum-viable-product-comprehensive-guide">
      <MvpSidebar items={NAV_ITEMS} />
      <main className="main">
        <header className="page-header">
          <div className="page-eyebrow">{"Software Architecture Guide"}</div>
          <h1 className="page-title">
            {"MVP（最小実行可能製品）開発"}
            <br />
            {"完全ガイド"}
          </h1>
          <p className="page-description">
            {
              "初学者から中級エンジニアまでを対象に、MVP開発の思想・プロセス・実装・測定を網羅的に解説します。リーンスタートアップの原則に基づき、無駄なく素早く学ぶためのロードマップを提供します。"
            }
          </p>
          <div style={{ marginTop: "20px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span className="tag green">
              <IconClock size={16} className="mvp-icon icon-clock" aria-hidden="true" />
              {"読了目安 30分"}
            </span>
            <span className="tag purple">
              <IconUser size={16} className="mvp-icon icon-user" aria-hidden="true" />
              {"初学者対応"}
            </span>
            <span className="tag coral">
              <IconCalendar size={16} className="mvp-icon icon-calendar" aria-hidden="true" />
              {"2025年版"}
            </span>
          </div>
        </header>
        <section className="section" id="intro">
          <h2>
            <IconBulb size={18} className="mvp-icon icon-bulb" aria-hidden="true" />
            {"1. MVPとは何か"}
          </h2>
          <p>
            {"MVP（Minimum Viable Product / 最小実行可能製品）とは、"}
            <strong style={{ color: "var(--color-text-primary)" }}>
              {"「最小限の機能で最大限の学びを得るために構築するプロダクト」"}
            </strong>
            {
              "です。Eric Riesが著書「The Lean Startup」で提唱し、現代のプロダクト開発における根幹哲学となっています。"
            }
          </p>
          <div className="callout">
            <div className="callout-label">{"一言で言うと"}</div>
            <p>
              {
                "「作りすぎず、学ぶための最小限のプロダクトを素早く届けて、顧客の反応から真実を学ぶ」手法です。"
              }
            </p>
          </div>
          <h3>{"1.1 「M・V・P」それぞれの意味"}</h3>
          <div className="cards">
            <div className="card">
              <div className="card-icon purple">
                <IconMinimize size={18} className="mvp-icon icon-minimize" aria-hidden="true" />
              </div>
              <div className="card-title">{"Minimum（最小限）"}</div>
              <div className="card-desc">
                {"機能を徹底的に絞り込む。余分な機能を一切含めず、必要最低限の機能だけを実装する。"}
              </div>
            </div>
            <div className="card">
              <div className="card-icon teal">
                <IconCircleCheck
                  size={18}
                  className="mvp-icon icon-circle-check"
                  aria-hidden="true"
                />
              </div>
              <div className="card-title">{"Viable（実行可能）"}</div>
              <div className="card-desc">
                {"ユーザーが実際に使える状態。コア価値を体験できる品質を備えている。"}
              </div>
            </div>
            <div className="card">
              <div className="card-icon coral">
                <IconPackage size={18} className="mvp-icon icon-package" aria-hidden="true" />
              </div>
              <div className="card-title">{"Product（製品）"}</div>
              <div className="card-desc">
                {"プロトタイプではなく、実際にユーザーに届ける本物のプロダクト。"}
              </div>
            </div>
          </div>
          <h3>{"1.2 モックアップ・プロトタイプとの違い"}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"種別"}</th>
                  <th>{"動作"}</th>
                  <th>{"対象"}</th>
                  <th>{"目的"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"モックアップ・ワイヤーフレーム"}</td>
                  <td>{"動作しない"}</td>
                  <td>{"内部チーム"}</td>
                  <td>{"デザイン検証"}</td>
                </tr>
                <tr>
                  <td>{"プロトタイプ"}</td>
                  <td>{"限定的に動作"}</td>
                  <td>{"内部向け"}</td>
                  <td>{"技術検証"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"MVP"}</strong>
                  </td>
                  <td>
                    <strong>{"実際に動作"}</strong>
                  </td>
                  <td>
                    <strong>{"実ユーザーへ提供"}</strong>
                  </td>
                  <td>
                    <strong>{"市場検証"}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>{"1.3 MVPが重要な理由：従来型開発との比較"}</h3>
          <div className="two-col">
            <div className="panel">
              <div className="panel-title bad">
                <IconCircleX size={16} className="mvp-icon icon-circle-x" aria-hidden="true" />
                {"MVPなし（従来型）"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"完全な機能を1年かけて開発"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"リリース後に顧客が使わないと判明"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"時間・コスト・機会を大量に損失"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"競合に遅れをとる"}
                </li>
              </ul>
            </div>
            <div className="panel">
              <div className="panel-title good">
                <IconCircleCheck
                  size={16}
                  className="mvp-icon icon-circle-check"
                  aria-hidden="true"
                />
                {"MVPあり（リーン開発）"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"最小機能を2〜3ヶ月で構築"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"実ユーザーのフィードバックを取得"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"必要な方向性が明確になる"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"競合より早く市場参入できる"}
                </li>
              </ul>
            </div>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"Eric Ries公式サイト — "}
                <Ext href="https://theleanstartup.com/">{"https://theleanstartup.com/"}</Ext>
              </li>
              <li>
                {"Lean Startup Wikipedia — "}
                <Ext href="https://en.wikipedia.org/wiki/Lean_startup">
                  {"https://en.wikipedia.org/wiki/Lean_startup"}
                </Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="lean">
          <h2>
            <IconRecycle size={18} className="mvp-icon icon-recycle" aria-hidden="true" />
            {"2. MVPの思想的背景：リーンスタートアップ"}
          </h2>
          <h3>{"2.1 Build-Measure-Learn サイクル"}</h3>
          <p>
            {"MVPの中核にある考え方は、"}
            <span className="hl-teal">{"Build（構築）→ Measure（測定）→ Learn（学習）"}</span>
            {"の高速サイクルです。このサイクルをいかに短くするかが、MVP成功の鍵となります。"}
          </p>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["lean-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"Build-Measure-Learn サイクル：このループを高速で回すことがMVPの本質"}
            </div>
          </div>
          <h3>{"2.2 検証済み学習（Validated Learning）"}</h3>
          <p>
            {
              "MVPでは「作った」ことではなく、「学んだ」ことが成果です。仮説を立て、実験し、データで検証するプロセスを繰り返します。"
            }
          </p>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["lean-2"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">{"検証済み学習のサイクル：仮説→実験→結果→洞察"}</div>
          </div>
          <h3>{"2.3 Innovation Accounting（イノベーション会計）"}</h3>
          <p>{"MVPの成果は従来の財務指標ではなく、「学習の進捗」で測定します。"}</p>
          <div className="two-col">
            <div className="panel">
              <div className="panel-title bad">
                <IconCircleX size={16} className="mvp-icon icon-circle-x" aria-hidden="true" />
                {"従来の指標（避けるべき）"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"総ユーザー数（見栄えが良いだけ）"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"ページビュー（行動に繋がらない）"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"フォロワー数（本質的価値なし）"}
                </li>
              </ul>
            </div>
            <div className="panel">
              <div className="panel-title good">
                <IconCircleCheck
                  size={16}
                  className="mvp-icon icon-circle-check"
                  aria-hidden="true"
                />
                {"リーン指標（Actionable Metrics）"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"顧客獲得コスト（CAC）"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"顧客生涯価値（LTV）"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"リテンション率（継続率）"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"機能の実際の使用率"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"NPS（顧客推奨度）"}
                </li>
              </ul>
            </div>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"Y Combinator — "}
                <Ext href="https://www.youtube.com/watch?v=Do3mS7p6G3A">
                  {"How to Validate Your Startup Idea (YouTube)"}
                </Ext>
              </li>
              <li>
                {"Amplitude North Star Playbook — "}
                <Ext href="https://amplitude.com/books/north-star">
                  {"https://amplitude.com/books/north-star"}
                </Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="process">
          <h2>
            <IconMap size={18} className="mvp-icon icon-map" aria-hidden="true" />
            {"3. MVP開発の全体プロセス"}
          </h2>
          <p>
            {
              "MVP開発は7つのフェーズで構成されます。各フェーズは順番に進みますが、学習サイクルによって前のフェーズに戻ることもあります。"
            }
          </p>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["process-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"MVP開発の7フェーズ：Phase 7が終わったら、学びを元にPhase 1に戻る"}
            </div>
          </div>
          <h3>{"タイムライン目安（2〜3ヶ月）"}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"フェーズ"}</th>
                  <th>{"期間目安"}</th>
                  <th>{"主なアウトプット"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Phase 1 問題発見"}</td>
                  <td>{"2〜3週間"}</td>
                  <td>{"顧客インタビュー20件以上・課題仮説の検証"}</td>
                </tr>
                <tr>
                  <td>{"Phase 2 スコープ定義"}</td>
                  <td>{"1〜2週間"}</td>
                  <td>{"ユーザーストーリー・KPI・MoSCoW優先順位"}</td>
                </tr>
                <tr>
                  <td>{"Phase 3 設計"}</td>
                  <td>{"2週間"}</td>
                  <td>{"アーキテクチャ図・UIプロトタイプ"}</td>
                </tr>
                <tr>
                  <td>{"Phase 4 実装"}</td>
                  <td>{"4〜6週間"}</td>
                  <td>{"動作するMVP・テスト・CI/CD"}</td>
                </tr>
                <tr>
                  <td>{"Phase 5 リリース"}</td>
                  <td>{"1週間"}</td>
                  <td>{"限定ベータ・監視ダッシュボード"}</td>
                </tr>
                <tr>
                  <td>{"Phase 6-7 学習"}</td>
                  <td>{"2〜4週間"}</td>
                  <td>{"データ分析・意思決定・次の計画"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
