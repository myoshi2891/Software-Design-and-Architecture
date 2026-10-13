import {
  IconAlertTriangle,
  IconBulb,
  IconCheck,
  IconExternalLink,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { NAV_GROUPS } from "./navigation";
import TogafGuideShell, { type TogafPanel } from "./TogafGuideShell";

export const metadata: Metadata = {
  title: "TOGAF 完全解説ガイド",
  description:
    "The Open Group Architecture Framework — ビジネスとITを整合させる世界標準のエンタープライズアーキテクチャフレームワーク。",
};

const DIAGRAMS = {
  "diag-1":
    'flowchart TD\nA["TOGAF 認定資格体系"]:::root --> B["Level 1<br/>TOGAF Foundation"]:::l1\nA --> C["Level 2<br/>TOGAF Practitioner"]:::l2\nA --> D["Combined<br/>Level 1 + Level 2"]:::comb\nB --> E["40問 / 60分 / 合格55%<br/>知識・理解を証明"]\nC --> F["8問複合選択 / 90分 / 合格60%<br/>実践・適用能力を証明"]\nD --> G["両レベルを1回で取得<br/>最も効率的な取得方法"]\nclassDef root fill:#2d1b5e,stroke:#7c4dff,color:#e8eaf0\nclassDef l1 fill:#134e4a,stroke:#14b8a6,color:#e8eaf0\nclassDef l2 fill:#5c2210,stroke:#ff6b35,color:#e8eaf0\nclassDef comb fill:#451a03,stroke:#f59e0b,color:#e8eaf0',
  "diag-2":
    'flowchart LR\nQ["シナリオ問題<br/>(現実の状況設定)"] --> OPT["5つの選択肢<br/>(A-E)"]\nOPT --> A1["最も適切な回答 +5点"]:::s5\nOPT --> A2["2番目に適切 +3点"]:::s3\nOPT --> A3["3番目に適切 +1点"]:::s1\nOPT --> A4["不適切な回答 0点"]:::s0\nOPT --> A5["最も不適切 -1点"]:::sm1\nclassDef s5  fill:#14532d,stroke:#4ade80,color:#e8eaf0\nclassDef s3  fill:#134e4a,stroke:#14b8a6,color:#e8eaf0\nclassDef s1  fill:#451a03,stroke:#f59e0b,color:#e8eaf0\nclassDef s0  fill:#1a1e2a,stroke:#6b7494,color:#9ba3b8\nclassDef sm1 fill:#1f1015,stroke:#f87171,color:#e8eaf0',
  "diag-3":
    'flowchart LR\nPRELIM["準備フェーズ<br/>Preliminary Phase<br/>アーキテクチャ能力の確立"]:::prelim\nA["フェーズA<br/>Architecture Vision"]:::phA\nB["フェーズB<br/>Business Architecture"]:::phB\nC["フェーズC<br/>Info Systems Architecture"]:::phB\nD["フェーズD<br/>Technology Architecture"]:::phB\nE["フェーズE<br/>Opportunities and Solutions"]:::phE\nF["フェーズF<br/>Migration Planning"]:::phE\nG["フェーズG<br/>Implementation Governance"]:::phG\nH["フェーズH<br/>Change Management"]:::phG\nREQ["要求管理<br/>Requirements Management"]:::req\nPRELIM --> A --> B --> C --> D --> E --> F --> G --> H\nH -->|"次サイクル"| A\nREQ -.-> A\nREQ -.-> B\nREQ -.-> C\nREQ -.-> D\nREQ -.-> E\nREQ -.-> F\nREQ -.-> G\nREQ -.-> H\nclassDef prelim fill:#2d1b5e,stroke:#7c4dff,color:#e8eaf0\nclassDef phA    fill:#1e3a5f,stroke:#60a5fa,color:#e8eaf0\nclassDef phB    fill:#134e4a,stroke:#14b8a6,color:#e8eaf0\nclassDef phE    fill:#451a03,stroke:#f59e0b,color:#e8eaf0\nclassDef phG    fill:#5c2210,stroke:#ff6b35,color:#e8eaf0\nclassDef req    fill:#1a1e2a,stroke:#6b7494,color:#9ba3b8',
  "diag-4":
    'flowchart TD\nsubgraph SGP["準備フェーズ"]\nP_IN["インプット<br/>ビジネス戦略・原則"] --> P_OUT["アウトプット<br/>アーキテクチャ原則<br/>ガバナンスFW"]\nend\nsubgraph SGPA["フェーズ A"]\nA_IN["インプット<br/>RfAW・ビジネス戦略"] --> A_OUT["アウトプット<br/>アーキテクチャビジョン<br/>SoAW"]\nend\nsubgraph SGPB["フェーズ B-C-D"]\nBCD_IN["インプット<br/>アーキテクチャビジョン"] --> BCD_OUT["アウトプット<br/>AS-IS と TO-BE<br/>ギャップ分析"]\nend\nsubgraph SGPE["フェーズ E-F"]\nEF_IN["インプット<br/>ギャップ分析"] --> EF_OUT["アウトプット<br/>実装・移行計画<br/>移行アーキテクチャ"]\nend\nsubgraph SGPG["フェーズ G-H"]\nGH_IN["インプット<br/>実装・移行計画"] --> GH_OUT["アウトプット<br/>コンプライアンスレポート<br/>変更管理記録"]\nend\nP_OUT --> A_IN\nA_OUT --> BCD_IN\nBCD_OUT --> EF_IN\nEF_OUT --> GH_IN',
  "diag-5":
    'flowchart LR\nsubgraph SGOUT["準備フェーズのアウトプット"]\nA1["アーキテクチャ原則の定義"]\nA2["アーキテクチャFWの確立"]\nA3["アーキテクチャチームの組成"]\nA4["ガバナンスFWの確立"]\nA5["組織の成熟度評価"]\nend\nsubgraph SGIN["主要な作業"]\nB1["ビジネスコンテキスト理解"]\nB2["既存FW・手法の確認"]\nB3["TOGAFの適用範囲定義"]\nend\nB1 --> A1\nB2 --> A2\nB3 --> A3\nB3 --> A4\nB3 --> A5',
  "diag-6":
    'flowchart TD\nIN2["インプット<br/>Request for Architecture Work"] --> ST["ステークホルダーの特定"]\nST --> GO["ビジネス目標・ドライバーの確認"]\nGO --> SC["スコープの定義"]\nSC --> CO["制約・前提条件の把握"]\nCO --> OUT2["アウトプット<br/>アーキテクチャビジョン文書<br/>Statement of Architecture Work"]',
  "diag-7":
    'flowchart LR\nsubgraph B["フェーズ B:ビジネス"]\nB1["AS-IS ビジネス分析"]\nB2["TO-BE ビジネス設計"]\nB3["ギャップ分析"]\nend\nsubgraph C["フェーズ C:情報システム"]\nC1["データアーキテクチャ"]\nC2["アプリケーションアーキテクチャ"]\nend\nsubgraph D["フェーズ D:テクノロジー"]\nD1["インフラ現状分析"]\nD2["目標テクノロジー設計"]\nD3["クラウド / オンプレ選定"]\nend\nB --> C --> D',
  "diag-8":
    'flowchart LR\nsubgraph E["フェーズ E:機会とソリューション"]\nE1["実装プロジェクトの特定"]\nE2["移行アーキテクチャの検討"]\nE3["ワークパッケージの定義"]\nE4["Architecture Roadmap 作成"]\nE1 --> E2 --> E3 --> E4\nend\nsubgraph F["フェーズ F:移行計画"]\nF1["実装移行計画の策定"]\nF2["優先順位付け"]\nF3["コスト・ベネフィット分析"]\nF4["Transition Architecture 定義"]\nF1 --> F2 --> F3 --> F4\nend\nE --> F',
  "diag-9":
    'flowchart LR\nsubgraph G["フェーズ G:実装ガバナンス"]\nG1["実装プロジェクトのモニタリング"]\nG2["アーキテクチャコンプライアンス確認"]\nG3["Architecture Compliance Review"]\nG4["変更リクエスト対応"]\nend\nsubgraph H["フェーズ H:変更管理"]\nH1["変更ドライバーの監視"]\nH2["アーキテクチャへの影響評価"]\nH3["フォーマル変更管理プロセス"]\nH4["次の ADM サイクルへ引き継ぎ"]\nend\nG --> H --> NEXT["フェーズ A へ戻る<br/>(次のサイクル開始)"]',
} as const;

export default function Page() {
  const panels: TogafPanel[] = [
    {
      id: "overview",
      content: (
        <>
          <div className="hero">
            <div className="hero-eyebrow">{"Enterprise Architecture Framework"}</div>
            <h1>{"TOGAF とは何か"}</h1>
            <p>
              {
                "The Open Group Architecture Framework — ビジネスとITを整合させる世界標準のエンタープライズアーキテクチャフレームワーク。"
              }
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-val">{"206カ国"}</span>
                <span className="hero-stat-lbl">{"普及地域"}</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-val">{"10万+"}</span>
                <span className="hero-stat-lbl">{"認定資格者数"}</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-val">{"v10"}</span>
                <span className="hero-stat-lbl">{"最新バージョン (2022)"}</span>
              </div>
            </div>
          </div>
          <h2>{"TOGAF の定義"}</h2>
          <p>
            {"TOGAF（The Open Group Architecture Framework）は、The Open Groupが策定・維持する"}
            <strong>{"エンタープライズアーキテクチャ（EA）のための世界標準フレームワーク"}</strong>
            {
              "です。大企業・組織のIT戦略とビジネス戦略を整合させるための共通言語・方法論を提供します。"
            }
          </p>
          <div className="callout purple">
            <IconBulb size={18} className="mvp-icon icon-bulb" aria-hidden="true" />
            <div>
              <strong>{"一言で表すと："}</strong>
              {"「組織全体のビジネスとITを同じ言語で設計・管理するための標準的な地図と羅針盤」"}
            </div>
          </div>
          <h2>{"TOGAF が解決する問題"}</h2>
          <div className="card-grid">
            <div className="card purple">
              <div className="card-icon">
                <IconX
                  size={22}
                  className="mvp-icon icon-x"
                  aria-hidden="true"
                  style={{ color: "var(--color-text-danger)" }}
                />
              </div>
              <div className="card-title">{"導入前の課題"}</div>
              <div className="card-desc">
                {"IT戦略とビジネス戦略の乖離、部門間システムの孤立、重複投資、変更コストの増大"}
              </div>
            </div>
            <div className="card teal">
              <div className="card-icon">
                <IconCheck
                  size={22}
                  className="mvp-icon icon-check"
                  aria-hidden="true"
                  style={{ color: "var(--color-text-success)" }}
                />
              </div>
              <div className="card-title">{"導入後の効果"}</div>
              <div className="card-desc">
                {
                  "ビジネス目標に整合したIT投資、部門横断コミュニケーション、資産再利用、変化対応力の向上"
                }
              </div>
            </div>
          </div>
          <h2>{"TOGAF の歴史"}</h2>
          <div className="timeline">
            <div className="tl-item">
              <div className="tl-year">{"1995"}</div>
              <div className="tl-text">{"TOGAF 1.0 リリース（TAFIM from US DoD をベースに）"}</div>
            </div>
            <div className="tl-item">
              <div className="tl-year">{"2002"}</div>
              <div className="tl-text">{"TOGAF 8（Enterprise Edition）リリース"}</div>
            </div>
            <div className="tl-item">
              <div className="tl-year">{"2009"}</div>
              <div className="tl-text">
                {"TOGAF 9 リリース — 現在も広く参照される基盤バージョン"}
              </div>
            </div>
            <div className="tl-item">
              <div className="tl-year">{"2018"}</div>
              <div className="tl-text">{"TOGAF 9.2 リリース — コンテンツの明確化と整理"}</div>
            </div>
            <div className="tl-item">
              <div className="tl-year">{"2022"}</div>
              <div className="tl-text">
                <strong>{"TOGAF Standard Version 10 リリース"}</strong>
                {" — 現行の最新版"}
              </div>
            </div>
            <div className="tl-item">
              <div className="tl-year">{"2023"}</div>
              <div className="tl-text">{"認定者数：世界206カ国・10万人以上"}</div>
            </div>
          </div>
          <h2>{"EA フレームワーク比較"}</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"フレームワーク"}</th>
                  <th>{"提供元"}</th>
                  <th>{"特徴"}</th>
                  <th>{"TOGAF との関係"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{"TOGAF"}</strong>
                  </td>
                  <td>{"The Open Group"}</td>
                  <td>{"プロセス中心の汎用 EA フレームワーク"}</td>
                  <td>{"—"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Zachman"}</strong>
                  </td>
                  <td>{"John Zachman"}</td>
                  <td>{"分類フレームワーク（What/How/Where/Who/When/Why）"}</td>
                  <td>{"TOGAF の成果物整理に補完的に利用可能"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"FEAF"}</strong>
                  </td>
                  <td>{"米国連邦政府"}</td>
                  <td>{"政府機関向け EA"}</td>
                  <td>{"TOGAF が参照されることもある"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"SABSA"}</strong>
                  </td>
                  <td>{"SABSA Institute"}</td>
                  <td>{"セキュリティアーキテクチャ特化"}</td>
                  <td>{"TOGAF と組み合わせてセキュリティ EA を構築"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"ITIL"}</strong>
                  </td>
                  <td>{"Axelos"}</td>
                  <td>{"IT サービス管理（ITSM）"}</td>
                  <td>{"TOGAF のフェーズ G/H でサービス移行と連携"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="source-list">
            <Ext className="source-item" href="https://www.opengroup.org/togaf">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" The Open Group — TOGAF 公式サイト\n        "}
            </Ext>
            <Ext
              className="source-item"
              href="https://pubs.opengroup.org/architecture/togaf9-doc/arch/"
            >
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 9.2 公式ドキュメント（pubs.opengroup.org）\n        "}
            </Ext>
          </div>
        </>
      ),
    },
    {
      id: "exam",
      content: (
        <>
          <div className="section-eyebrow">{"Certification"}</div>
          <h1 className="page-title">{"試験の種類と概要"}</h1>
          <p className="page-subtitle">
            {
              "TOGAF 認定資格は Level 1 と Level 2 の 2 段階構成。Combined 試験で両方を一度に取得することも可能です。"
            }
          </p>
          <h2>{"試験レベル構造"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-1" chart={DIAGRAMS["diag-1"]} preserveNaturalScale={true} />
            <div className="diagram-label">{"TOGAF 認定資格の 3 経路"}</div>
          </div>
          <h2>{"試験詳細比較"}</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"項目"}</th>
                  <th>{"Level 1 Foundation"}</th>
                  <th>{"Level 2 Practitioner"}</th>
                  <th>{"Combined"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"目的"}</td>
                  <td>{"知識・理解の証明"}</td>
                  <td>{"実践・適用能力の証明"}</td>
                  <td>{"両レベル同時取得"}</td>
                </tr>
                <tr>
                  <td>{"問題形式"}</td>
                  <td>{"多肢選択（1つ選択）"}</td>
                  <td>{"複合選択（重み付きスコア）"}</td>
                  <td>{"両形式混合"}</td>
                </tr>
                <tr>
                  <td>{"問題数"}</td>
                  <td>{"40問"}</td>
                  <td>{"8問（各12.5点）"}</td>
                  <td>{"40問＋8問"}</td>
                </tr>
                <tr>
                  <td>{"試験時間"}</td>
                  <td>{"60分"}</td>
                  <td>{"90分"}</td>
                  <td>{"150分"}</td>
                </tr>
                <tr>
                  <td>{"合格基準"}</td>
                  <td>
                    <strong>{"55%（22/40問）"}</strong>
                  </td>
                  <td>
                    <strong>{"60%（60/100点）"}</strong>
                  </td>
                  <td>{"両方クリア"}</td>
                </tr>
                <tr>
                  <td>{"受験料"}</td>
                  <td>{"約 $320 USD"}</td>
                  <td>{"約 $320 USD"}</td>
                  <td>{"約 $495 USD"}</td>
                </tr>
                <tr>
                  <td>{"有効期限"}</td>
                  <td>{"無期限"}</td>
                  <td>{"無期限"}</td>
                  <td>{"無期限"}</td>
                </tr>
                <tr>
                  <td>{"ドキュメント持込"}</td>
                  <td>{"不可"}</td>
                  <td>
                    <strong>{"公式ドキュメント持込可"}</strong>
                  </td>
                  <td>{"混合"}</td>
                </tr>
                <tr>
                  <td>{"難易度"}</td>
                  <td>{"★★★☆☆"}</td>
                  <td>{"★★★★☆"}</td>
                  <td>{"★★★★☆"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout warning">
            <IconAlertTriangle
              size={18}
              className="mvp-icon icon-alert-triangle"
              aria-hidden="true"
            />
            <div>
              <strong>{"Level 2 の持込可について："}</strong>
              {
                "公式 TOGAF ドキュメントの持込みは可能ですが、試験時間（90分・8問）は非常に短いため、ドキュメントを頼りすぎると時間切れになります。知識の内在化が必須です。"
              }
            </div>
          </div>
          <h2>{"Level 2 複合選択問題の採点方式"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-2" chart={DIAGRAMS["diag-2"]} preserveNaturalScale={true} />
            <div className="diagram-label">
              {"1問あたり最大 5点・最低 -1点。8問合計 40点満点で 60点相当（換算後）"}
            </div>
          </div>
          <div className="source-list">
            <Ext className="source-item" href="https://www.opengroup.org/certifications/togaf">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 認定資格プログラム公式ページ\n        "}
            </Ext>
            <Ext className="source-item" href="https://home.pearsonvue.com/opengroup">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" Pearson VUE — 試験申込ポータル\n        "}
            </Ext>
          </div>
        </>
      ),
    },
    {
      id: "adm",
      content: (
        <>
          <div className="section-eyebrow">{"Architecture Development Method"}</div>
          <h1 className="page-title">{"ADM サイクル完全解説"}</h1>
          <p className="page-subtitle">
            {
              "ADM は TOGAF の中核。準備フェーズ → フェーズ A〜H → 要求管理という反復・循環プロセスです。"
            }
          </p>
          <div className="callout info">
            <IconInfoCircle size={18} className="mvp-icon icon-info-circle" aria-hidden="true" />
            <div>
              <strong>{"ADM とは："}</strong>
              {
                "Architecture Development Method（アーキテクチャ開発手法）。エンタープライズアーキテクチャを段階的に開発・維持するための"
              }
              <strong>{"反復的サイクル"}</strong>
              {
                "です。フェーズは順序どおりに実行しますが、必要に応じて前のフェーズに戻ることができます。"
              }
            </div>
          </div>
          <h2>{"ADM 全体サイクル"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-3" chart={DIAGRAMS["diag-3"]} preserveNaturalScale={true} />
            <div className="diagram-label">
              {"要求管理（Requirements Management）はすべてのフェーズを横断する常時実施プロセス"}
            </div>
          </div>
          <h2>{"各フェーズ一覧"}</h2>
          <div className="phase-list">
            <div className="phase-item">
              <div
                className="phase-badge"
                style={{ background: "var(--c-purple-800)", color: "var(--c-purple-200)" }}
              >
                {"準備"}
              </div>
              <div className="phase-content">
                <div className="phase-name">{"準備フェーズ（Preliminary Phase）"}</div>
                <div className="phase-desc">
                  {
                    "組織のアーキテクチャ能力を確立する。アーキテクチャ原則の定義、ガバナンスフレームワークの確立、チームの組成が主要作業。"
                  }
                </div>
              </div>
              <div className="phase-meta">
                <span className="tag tag-purple">{"前提条件整備"}</span>
              </div>
            </div>
            <div className="phase-item">
              <div
                className="phase-badge"
                style={{ background: "var(--c-blue-800)", color: "var(--c-blue-400)" }}
              >
                {"A"}
              </div>
              <div className="phase-content">
                <div className="phase-name">{"フェーズ A：アーキテクチャビジョン"}</div>
                <div className="phase-desc">
                  {
                    "プロジェクトスコープの定義、ステークホルダーの特定、ビジネス目標の確認。主要アウトプットは「Statement of Architecture Work（SoAW）」。"
                  }
                </div>
              </div>
              <div className="phase-meta">
                <span className="tag tag-teal">{"ビジョン定義"}</span>
              </div>
            </div>
            <div className="phase-item">
              <div
                className="phase-badge"
                style={{ background: "var(--c-teal-800)", color: "var(--c-teal-100)" }}
              >
                {"B"}
              </div>
              <div className="phase-content">
                <div className="phase-name">{"フェーズ B：ビジネスアーキテクチャ"}</div>
                <div className="phase-desc">
                  {
                    "現状（AS-IS）ビジネスアーキテクチャの把握と、目標（TO-BE）の設計。ギャップ分析を行い課題を明確化する。"
                  }
                </div>
              </div>
              <div className="phase-meta">
                <span className="tag tag-teal">{"ビジネス"}</span>
              </div>
            </div>
            <div className="phase-item">
              <div
                className="phase-badge"
                style={{ background: "var(--c-teal-800)", color: "var(--c-teal-100)" }}
              >
                {"C"}
              </div>
              <div className="phase-content">
                <div className="phase-name">{"フェーズ C：情報システムアーキテクチャ"}</div>
                <div className="phase-desc">
                  {
                    "データアーキテクチャとアプリケーションアーキテクチャの 2 つを開発する。データモデル、アプリケーションポートフォリオの整理が主な成果物。"
                  }
                </div>
              </div>
              <div className="phase-meta">
                <span className="tag tag-teal">{"データ / アプリ"}</span>
              </div>
            </div>
            <div className="phase-item">
              <div
                className="phase-badge"
                style={{ background: "var(--c-teal-800)", color: "var(--c-teal-100)" }}
              >
                {"D"}
              </div>
              <div className="phase-content">
                <div className="phase-name">{"フェーズ D：テクノロジーアーキテクチャ"}</div>
                <div className="phase-desc">
                  {
                    "インフラ・ネットワーク・クラウド基盤の現状把握と目標設計。B/C で定義した要件を実現するプラットフォームを決定する。"
                  }
                </div>
              </div>
              <div className="phase-meta">
                <span className="tag tag-teal">{"テクノロジー"}</span>
              </div>
            </div>
            <div className="phase-item">
              <div
                className="phase-badge"
                style={{ background: "var(--c-amber-800)", color: "var(--c-amber-500)" }}
              >
                {"E"}
              </div>
              <div className="phase-content">
                <div className="phase-name">{"フェーズ E：機会とソリューション"}</div>
                <div className="phase-desc">
                  {
                    "実装プロジェクトの特定、移行アーキテクチャの検討、ワークパッケージの定義。Architecture Roadmap を作成する。"
                  }
                </div>
              </div>
              <div className="phase-meta">
                <span className="tag tag-amber">{"実装計画"}</span>
              </div>
            </div>
            <div className="phase-item">
              <div
                className="phase-badge"
                style={{ background: "var(--c-amber-800)", color: "var(--c-amber-500)" }}
              >
                {"F"}
              </div>
              <div className="phase-content">
                <div className="phase-name">{"フェーズ F：移行計画"}</div>
                <div className="phase-desc">
                  {
                    "実装・移行計画の策定、優先順位付け、コスト・ベネフィット分析。Transition Architecture（移行中間状態）の定義が重要。"
                  }
                </div>
              </div>
              <div className="phase-meta">
                <span className="tag tag-amber">{"移行計画"}</span>
              </div>
            </div>
            <div className="phase-item">
              <div
                className="phase-badge"
                style={{ background: "var(--c-coral-800)", color: "var(--c-coral-100)" }}
              >
                {"G"}
              </div>
              <div className="phase-content">
                <div className="phase-name">{"フェーズ G：実装ガバナンス"}</div>
                <div className="phase-desc">
                  {
                    "実装プロジェクトのモニタリング、アーキテクチャコンプライアンスのレビュー、変更リクエストへの対応を行う。"
                  }
                </div>
              </div>
              <div className="phase-meta">
                <span className="tag tag-coral">{"ガバナンス"}</span>
              </div>
            </div>
            <div className="phase-item">
              <div
                className="phase-badge"
                style={{ background: "var(--c-coral-800)", color: "var(--c-coral-100)" }}
              >
                {"H"}
              </div>
              <div className="phase-content">
                <div className="phase-name">{"フェーズ H：アーキテクチャ変更管理"}</div>
                <div className="phase-desc">
                  {
                    "変更ドライバーの監視、アーキテクチャへの影響評価、次の ADM サイクルへの引き継ぎを行う。"
                  }
                </div>
              </div>
              <div className="phase-meta">
                <span className="tag tag-coral">{"変更管理"}</span>
              </div>
            </div>
          </div>
          <h2>{"ADM 入出力フロー（試験頻出）"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-4" chart={DIAGRAMS["diag-4"]} preserveNaturalScale={true} />
            <div className="diagram-label">{"フェーズ間のインプット / アウトプット連鎖"}</div>
          </div>
          <div className="source-list">
            <Ext
              className="source-item"
              href="https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap05.html"
            >
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 9.2 — ADM Overview（公式）\n        "}
            </Ext>
          </div>
        </>
      ),
    },
    {
      id: "phases",
      content: (
        <>
          <div className="section-eyebrow">{"Phase Deep Dive"}</div>
          <h1 className="page-title">{"各フェーズ詳解"}</h1>
          <p className="page-subtitle">
            {"ADM の各フェーズをベストプラクティスとともに深掘りします。"}
          </p>
          <h2>{"準備フェーズ：アーキテクチャ能力の確立"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-5" chart={DIAGRAMS["diag-5"]} preserveNaturalScale={true} />
          </div>
          <div className="bp-list">
            <div className="bp-item">
              <div className="bp-num">{"01"}</div>
              <div className="bp-text">
                <strong>{"アーキテクチャ原則は経営層と合意して作成する"}</strong>
                <span>
                  {
                    "原則はアーキテクトだけで作るものではなく、経営・IT・ビジネス部門が合意した内容であることが重要。後の意思決定の根拠となるため、スポンサーの署名承認を得ることが望ましい。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"02"}</div>
              <div className="bp-text">
                <strong>{"TOGAFをそのまま使わず「テーラリング」する"}</strong>
                <span>
                  {
                    "TOGAF は汎用フレームワークのため、組織の規模・業種・成熟度に応じてカスタマイズ（テーラリング）することが推奨されている。これも準備フェーズで定義する。"
                  }
                </span>
              </div>
            </div>
          </div>
          <h2>{"フェーズ A：アーキテクチャビジョン"}</h2>
          <div className="callout info">
            <IconInfoCircle size={18} className="mvp-icon icon-info-circle" aria-hidden="true" />
            <div>
              {
                "このフェーズは ADM の「出発点」。ステークホルダーの特定と合意形成が最重要タスクです。"
              }
            </div>
          </div>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-6" chart={DIAGRAMS["diag-6"]} preserveNaturalScale={true} />
          </div>
          <div className="bp-list">
            <div className="bp-item">
              <div className="bp-num">{"03"}</div>
              <div className="bp-text">
                <strong>{"Statement of Architecture Work（SoAW）を必ず作成・署名する"}</strong>
                <span>
                  {
                    "SoAW はアーキテクチャプロジェクトの「契約書」。スコープ・スケジュール・リソース・成功基準を記載し、スポンサーの承認を得ることで、後のフェーズにおける変更管理の基準となる。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"04"}</div>
              <div className="bp-text">
                <strong>{"ビジネス価値（Business Value）を中心に据える"}</strong>
                <span>
                  {
                    "フェーズ A では技術的詳細ではなく「なぜこのアーキテクチャが必要か」という価値命題（Value Proposition）を明確にする。これが後のフェーズのガイド役になる。"
                  }
                </span>
              </div>
            </div>
          </div>
          <h2>{"フェーズ B/C/D：アーキテクチャ開発（BDAT）"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-7" chart={DIAGRAMS["diag-7"]} preserveNaturalScale={true} />
          </div>
          <div className="bp-list">
            <div className="bp-item">
              <div className="bp-num">{"05"}</div>
              <div className="bp-text">
                <strong>{"ギャップ分析は必ず各フェーズで実施する"}</strong>
                <span>
                  {
                    "B・C・D それぞれで AS-IS と TO-BE を比較し、ギャップを明確に文書化する。このギャップが後の E/F フェーズの実装作業の基になる。抜け漏れがあると後のフェーズで手戻りが発生する。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"06"}</div>
              <div className="bp-text">
                <strong>{"B → C → D の依存関係を守る"}</strong>
                <span>
                  {
                    "ビジネス要件が定まらないままデータやテクノロジーを設計しない。上位ドメインの決定が下位ドメインの制約となるため、順序を守ることがアーキテクチャの整合性を保つ鍵。"
                  }
                </span>
              </div>
            </div>
          </div>
          <h2>{"フェーズ E/F：機会・ソリューション / 移行計画"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-8" chart={DIAGRAMS["diag-8"]} preserveNaturalScale={true} />
          </div>
          <div className="bp-list">
            <div className="bp-item">
              <div className="bp-num">{"07"}</div>
              <div className="bp-text">
                <strong>{"Transition Architecture（移行中間アーキテクチャ）を活用する"}</strong>
                <span>
                  {
                    "AS-IS から TO-BE への一気の移行は困難なことが多い。Transition Architecture を中間ステップとして定義し、段階的な移行計画を立てることでリスクを低減できる。"
                  }
                </span>
              </div>
            </div>
          </div>
          <h2>{"フェーズ G/H：ガバナンスと変更管理"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-9" chart={DIAGRAMS["diag-9"]} preserveNaturalScale={true} />
          </div>
          <div className="bp-list">
            <div className="bp-item">
              <div className="bp-num">{"08"}</div>
              <div className="bp-text">
                <strong>{"フェーズ G で「架け橋」の役割を担う"}</strong>
                <span>
                  {
                    "フェーズ G はアーキテクトと実装チームの橋渡し。Architecture Contract（アーキテクチャ契約）を通じて、実装がアーキテクチャ原則に準拠しているかを継続的にレビューする。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"09"}</div>
              <div className="bp-text">
                <strong>{"フェーズ H では変化への感度を高く保つ"}</strong>
                <span>
                  {
                    "フェーズ H はアーキテクチャを「生きたもの」として維持するフェーズ。ビジネス環境の変化・技術の変化・法規制の変化を常に監視し、次のサイクルを起動するトリガーを見極める。"
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="source-list">
            <Ext
              className="source-item"
              href="https://pubs.opengroup.org/architecture/togaf9-doc/arch/"
            >
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 9.2 公式ドキュメント（全フェーズ）\n        "}
            </Ext>
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="togaf-certification-comprehensive-guide">
      <TogafGuideShell groups={NAV_GROUPS} panels={panels} />
    </div>
  );
}
