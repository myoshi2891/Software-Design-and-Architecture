import {
  IconAlertTriangle,
  IconBulb,
  IconCheck,
  IconExternalLink,
  IconInfoCircle,
  IconMinus,
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
    'flowchart TD\nA["TOGAF 認定資格体系"]:::root --> B["Level 1<br/>TOGAF Foundation"]:::l1\nA --> C["Level 2<br/>TOGAF Practitioner"]:::l2\nA --> D["Combined<br/>Level 1 + Level 2"]:::comb\nB --> E["40問 / 60分 / 合格60%<br/>知識・理解を証明"]\nC --> F["8問複合選択 / 90分 / 合格60%<br/>実践・適用能力を証明"]\nD --> G["両レベルを1回で取得<br/>最も効率的な取得方法"]\nclassDef root fill:#2d1b5e,stroke:#7c4dff,color:#e8eaf0\nclassDef l1 fill:#134e4a,stroke:#14b8a6,color:#e8eaf0\nclassDef l2 fill:#5c2210,stroke:#ff6b35,color:#e8eaf0\nclassDef comb fill:#451a03,stroke:#f59e0b,color:#e8eaf0',
  "diag-2":
    'flowchart LR\nQ["シナリオ問題<br/>(現実の状況設定)"] --> OPT["4つの選択肢<br/>(A-D)"]\nOPT --> A1["最も適切な回答 +5点"]:::s5\nOPT --> A2["2番目に適切 +3点"]:::s3\nOPT --> A3["3番目に適切 +1点"]:::s1\nOPT --> A4["最も不適切 0点"]:::s0\nclassDef s5  fill:#14532d,stroke:#4ade80,color:#e8eaf0\nclassDef s3  fill:#134e4a,stroke:#14b8a6,color:#e8eaf0\nclassDef s1  fill:#451a03,stroke:#f59e0b,color:#e8eaf0\nclassDef s0  fill:#1a1e2a,stroke:#6b7494,color:#9ba3b8',
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
  "diag-10":
    'flowchart TD\nB["ビジネスアーキテクチャ<br/>ビジネスニーズ・プロセス・組織"]\nD["データアーキテクチャ<br/>どんなデータが必要か"]\nAP["アプリケーションアーキテクチャ<br/>どんなシステムが必要か"]\nT["テクノロジーアーキテクチャ<br/>どんな技術基盤が必要か"]\nB -->|"ビジネス要件を定義"| D\nB -->|"機能要件を定義"| AP\nD -->|"データストレージ要件"| T\nAP -->|"システム稼働要件"| T',
  "diag-11":
    'flowchart LR\nsubgraph ABB["アーキテクチャビルディングブロック"]\nA1["抽象的・技術中立<br/>例:認証サービス<br/>例:データウェアハウス<br/>例:API Gateway"]\nend\nsubgraph SBB["ソリューションビルディングブロック"]\nS1["具体的・製品/技術指定<br/>例:AWS Cognito<br/>例:Snowflake<br/>例:Kong Gateway"]\nend\nABB -->|"具体化・実装"| SBB',
  "diag-12":
    'flowchart LR\nP["アーキテクチャ原則"]:::root --> N["名前<br/>Name<br/>短く記憶しやすい名称"]:::n\nP --> S["ステートメント<br/>Statement<br/>原則の1文での表現"]:::s\nP --> R["根拠<br/>Rationale<br/>なぜこの原則が必要か"]:::r\nP --> I["示唆<br/>Implications<br/>この原則を採用した場合の影響"]:::i\nclassDef root fill:#2d1b5e,stroke:#7c4dff,color:#e8eaf0\nclassDef n fill:#1e3a5f,stroke:#60a5fa,color:#e8eaf0\nclassDef s fill:#134e4a,stroke:#14b8a6,color:#e8eaf0\nclassDef r fill:#451a03,stroke:#f59e0b,color:#e8eaf0\nclassDef i fill:#5c2210,stroke:#ff6b35,color:#e8eaf0',
  "diag-13":
    'flowchart TD\nAR["アーキテクチャリポジトリ<br/>Architecture Repository"]:::root\nAR --> AL["アーキテクチャランドスケープ<br/>Architecture Landscape"]:::node\nAR --> REF["リファレンスライブラリ<br/>Reference Library"]:::node\nAR --> STAN["標準情報ベース<br/>Standards Information Base"]:::node\nAR --> CONT["ガバナンスログ<br/>Governance Log"]:::node\nAR --> CAP["アーキテクチャ能力<br/>Architecture Capability"]:::node\nAR --> SOL["ソリューションランドスケープ<br/>Solution Landscape"]:::node\nAL --> AL1["戦略アーキテクチャ<br/>5-10年 / 組織全体"]\nAL --> AL2["セグメントアーキテクチャ<br/>2-5年 / ビジネスエリア単位"]\nAL --> AL3["能力アーキテクチャ<br/>1-2年 / 個別プロジェクト"]\nclassDef root fill:#2d1b5e,stroke:#7c4dff,color:#e8eaf0\nclassDef node fill:#1a1e2a,stroke:#2a2f42,color:#9ba3b8',
  "diag-14":
    'flowchart LR\nEA["エンタープライズ<br/>アーキテクチャ"]:::root\nsubgraph SGEX["経営層"]\nEX1["コスト削減・ROI"]\nEX2["競争優位性"]\nEX3["リスク管理・規制対応"]\nend\nsubgraph SGIT["IT部門"]\nIT1["技術的負債の解消"]\nIT2["システム信頼性・セキュリティ"]\nIT3["保守性・拡張性"]\nend\nsubgraph SGBZ["ビジネス部門"]\nBZ1["業務効率化"]\nBZ2["データアクセス"]\nBZ3["プロセス改善"]\nend\nsubgraph SGUS["エンドユーザー"]\nUS1["使いやすい UI"]\nUS2["システム速度"]\nUS3["データの正確性"]\nend\nEA --> SGEX\nEA --> SGIT\nEA --> SGBZ\nEA --> SGUS\nclassDef root fill:#2d1b5e,stroke:#7c4dff,color:#e8eaf0',
  "diag-15":
    'flowchart TD\nBOARD["経営委員会・取締役会"]:::top --> IT_GOV["IT投資委員会"]:::mid\nIT_GOV --> ARCH_BOARD["アーキテクチャボード<br/>Architecture Board"]:::key\nARCH_BOARD --> PROJ["プロジェクト・プログラム"]:::low\nsubgraph ROLES["アーキテクチャボードの役割"]\nR1["アーキテクチャ方針の策定・維持"]\nR2["コンプライアンスレビューの実施"]\nR3["例外申請の承認・却下"]\nR4["アーキテクチャ原則の管理"]\nR5["アーキテクチャ成果物の承認"]\nend\nARCH_BOARD --> ROLES\nclassDef top fill:#1a1e2a,stroke:#2a2f42,color:#9ba3b8\nclassDef mid fill:#1a1e2a,stroke:#2a2f42,color:#9ba3b8\nclassDef key fill:#2d1b5e,stroke:#7c4dff,color:#e8eaf0\nclassDef low fill:#1a1e2a,stroke:#2a2f42,color:#9ba3b8',
  "diag-16":
    'flowchart LR\nARCH["アーキテクチャチーム"]\nIMPL["実装チーム<br/>(プロジェクト)"]\nCONTRACT["アーキテクチャコントラクト<br/>Architecture Contract"]\nsubgraph CONT["コントラクトの主な内容"]\nC1["アーキテクチャ要件・制約"]\nC2["適合性の基準"]\nC3["成果物の承認基準"]\nC4["変更管理プロセス"]\nC5["ガバナンス要件"]\nend\nARCH -->|"発行"| CONTRACT\nCONTRACT -->|"適用"| IMPL\nIMPL --> CONT',
  "diag-17":
    'flowchart TD\nQ["問題文を読む"] --> S["シナリオの状況を把握<br/>何の組織か？<br/>何の問題か？<br/>現在のフェーズはどこか？"]\nS --> R["TOGAFのどの概念が<br/>適用されるか特定する"]\nR --> C["各選択肢を評価<br/>TOGAFのBPに合致するか？<br/>ADMの順序を守っているか？<br/>ガバナンスを尊重しているか？"]\nC --> A["最適な選択肢を選ぶ<br/>(公式ドキュメントで確認)"]\nsubgraph TRAP["陥りやすい罠"]\nT1["直感に頼りすぎる"]\nT2["ADM フェーズの順序を無視"]\nT3["ステークホルダー関与を軽視"]\nT4["ガバナンスをスキップする答えを選ぶ"]\nend\nA -.->|"要注意"| TRAP',
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
          <h2 id="togaf-table-1">{"EA フレームワーク比較"}</h2>
          <div className="table-wrap">
            <table aria-labelledby="togaf-table-1">
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
          <h2 id="togaf-table-2">{"試験詳細比較"}</h2>
          <div className="table-wrap">
            <table aria-labelledby="togaf-table-2">
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
                    <strong>{"60%（24/40問）"}</strong>
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
                  <td>{"公式ドキュメント参照"}</td>
                  <td>{"不可"}</td>
                  <td>
                    <strong>{"試験画面の REFERENCE ボタンで参照可"}</strong>
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
              <strong>{"Level 2 の資料参照について："}</strong>
              {
                "受験者が文書を持参することはできず、公式 TOGAF ドキュメントは試験画面の REFERENCE ボタンから参照します。ただし試験時間（90分・8問）は非常に短いため、ドキュメントを頼りすぎると時間切れになります。知識の内在化が必須です。"
              }
            </div>
          </div>
          <h2>{"Level 2 複合選択問題の採点方式"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-2" chart={DIAGRAMS["diag-2"]} preserveNaturalScale={true} />
            <div className="diagram-label">
              {"1問あたり最大 5点・最低 0点（減点なし）。8問合計 40点満点で、合格は 24点（60%）"}
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
    {
      id: "bdat",
      content: (
        <>
          <div className="section-eyebrow">{"Architecture Domains"}</div>
          <h1 className="page-title">{"BDAT アーキテクチャドメイン"}</h1>
          <p className="page-subtitle">
            {
              "ビジネス・データ・アプリケーション・テクノロジーの 4 ドメインがエンタープライズアーキテクチャの柱です。"
            }
          </p>
          <h2>{"4 つのドメイン概要"}</h2>
          <div className="domain-grid">
            <div className="domain-card" style={{ borderColor: "var(--c-blue-800)" }}>
              <div className="domain-letter" style={{ color: "var(--c-blue-400)" }}>
                {"B"}
              </div>
              <div className="domain-name">{"Business Architecture"}</div>
              <div className="domain-jp">{"ビジネスアーキテクチャ"}</div>
              <ul>
                <li>{"ビジネスプロセス"}</li>
                <li>{"組織構造"}</li>
                <li>{"ビジネス機能・サービス"}</li>
                <li>{"ビジネスルール・ポリシー"}</li>
              </ul>
            </div>
            <div className="domain-card" style={{ borderColor: "var(--c-teal-800)" }}>
              <div className="domain-letter" style={{ color: "var(--c-teal-500)" }}>
                {"D"}
              </div>
              <div className="domain-name">{"Data Architecture"}</div>
              <div className="domain-jp">{"データアーキテクチャ"}</div>
              <ul>
                <li>{"データエンティティ"}</li>
                <li>{"データモデル"}</li>
                <li>{"データ管理・ガバナンス"}</li>
                <li>{"データフロー"}</li>
              </ul>
            </div>
            <div className="domain-card" style={{ borderColor: "var(--c-coral-800)" }}>
              <div className="domain-letter" style={{ color: "var(--c-coral-500)" }}>
                {"A"}
              </div>
              <div className="domain-name">{"Application Architecture"}</div>
              <div className="domain-jp">{"アプリケーションアーキテクチャ"}</div>
              <ul>
                <li>{"アプリケーションコンポーネント"}</li>
                <li>{"アプリケーション間インタラクション"}</li>
                <li>{"アプリケーションポートフォリオ"}</li>
              </ul>
            </div>
            <div className="domain-card" style={{ borderColor: "var(--c-amber-800)" }}>
              <div className="domain-letter" style={{ color: "var(--c-amber-500)" }}>
                {"T"}
              </div>
              <div className="domain-name">{"Technology Architecture"}</div>
              <div className="domain-jp">{"テクノロジーアーキテクチャ"}</div>
              <ul>
                <li>{"技術プラットフォーム"}</li>
                <li>{"ネットワーク・インフラ"}</li>
                <li>{"クラウド・物理基盤"}</li>
              </ul>
            </div>
          </div>
          <h2>{"BDAT の依存関係"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-10" chart={DIAGRAMS["diag-10"]} preserveNaturalScale={true} />
            <div className="diagram-label">
              {"B が最上位。ビジネス要件が D と A を規定し、D/A が T を規定する"}
            </div>
          </div>
          <div className="callout success">
            <IconCheck size={18} className="mvp-icon icon-check" aria-hidden="true" />
            <div>
              <strong>{"試験頻出ポイント："}</strong>
              {"「どのドメインから始めるか？」という問いに対する答えは常に "}
              <strong>{"B（ビジネス）"}</strong>
              {
                "から。ビジネス要件が未定のまま技術設計を開始することは TOGAF のアンチパターンです。"
              }
            </div>
          </div>
          <h2 id="togaf-table-3">{"アーキテクチャビューとビューポイント"}</h2>
          <div className="table-wrap">
            <table aria-labelledby="togaf-table-3">
              <thead>
                <tr>
                  <th>{"ステークホルダー"}</th>
                  <th>{"ビュー名"}</th>
                  <th>{"主要な成果物例"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"CEO・役員"}</td>
                  <td>{"ビジネスビュー"}</td>
                  <td>{"ビジネスプロセスモデル、組織構造図"}</td>
                </tr>
                <tr>
                  <td>{"CIO・IT部門長"}</td>
                  <td>{"アプリケーションビュー"}</td>
                  <td>{"アプリケーションカタログ、統合マップ"}</td>
                </tr>
                <tr>
                  <td>{"CDO・データ部門"}</td>
                  <td>{"データビュー"}</td>
                  <td>{"データモデル、データフロー図"}</td>
                </tr>
                <tr>
                  <td>{"CTO・インフラ部門"}</td>
                  <td>{"テクノロジービュー"}</td>
                  <td>{"インフラカタログ、ネットワーク図"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="source-list">
            <Ext
              className="source-item"
              href="https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap03.html"
            >
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 9.2 — Architecture Domains（公式）\n        "}
            </Ext>
          </div>
        </>
      ),
    },
    {
      id: "artifacts",
      content: (
        <>
          <div className="section-eyebrow">{"Building Blocks & Principles"}</div>
          <h1 className="page-title">{"成果物・ビルディングブロック"}</h1>
          <p className="page-subtitle">
            {"ABB と SBB の違い、アーキテクチャ原則の構成要素は Level 1/2 の頻出テーマです。"}
          </p>
          <h2 id="togaf-table-4">{"ABB vs SBB（試験最頻出）"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-11" chart={DIAGRAMS["diag-11"]} preserveNaturalScale={true} />
          </div>
          <div className="table-wrap">
            <table aria-labelledby="togaf-table-4">
              <thead>
                <tr>
                  <th>{"観点"}</th>
                  <th>{"ABB（Architecture BB）"}</th>
                  <th>{"SBB（Solution BB）"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"抽象度"}</td>
                  <td>{"高い（ベンダー非依存）"}</td>
                  <td>{"低い（具体的製品・技術）"}</td>
                </tr>
                <tr>
                  <td>{"使用フェーズ"}</td>
                  <td>{"B/C/D（アーキテクチャ設計）"}</td>
                  <td>{"E/F/G（実装・移行フェーズ）"}</td>
                </tr>
                <tr>
                  <td>{"例"}</td>
                  <td>{"「認証サービス」"}</td>
                  <td>{"「AWS Cognito」"}</td>
                </tr>
                <tr>
                  <td>{"目的"}</td>
                  <td>{"要件定義・設計の共通言語"}</td>
                  <td>{"具体的実装の選定後に使用"}</td>
                </tr>
                <tr>
                  <td>{"再利用性"}</td>
                  <td>{"高い（組織横断で再利用可）"}</td>
                  <td>{"低い（特定技術に依存）"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2>{"アーキテクチャ原則の 4 構成要素"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-12" chart={DIAGRAMS["diag-12"]} preserveNaturalScale={true} />
          </div>
          <div className="callout warning">
            <IconAlertTriangle
              size={18}
              className="mvp-icon icon-alert-triangle"
              aria-hidden="true"
            />
            <div>
              <strong>{"試験頻出："}</strong>
              {"「アーキテクチャ原則には何が含まれるか」という問いへの答えは "}
              <strong>{"Name・Statement・Rationale・Implications の 4 つ"}</strong>
              {"。「Description」や「Justification」は TOGAF の正式な用語ではないため注意。"}
            </div>
          </div>
          <h2 id="togaf-table-5">{"原則の例：「データは資産である」"}</h2>
          <div className="table-wrap">
            <table aria-labelledby="togaf-table-5">
              <thead>
                <tr>
                  <th>{"構成要素"}</th>
                  <th>{"内容"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{"Name"}</strong>
                  </td>
                  <td>{"データは資産である（Data Is an Asset）"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Statement"}</strong>
                  </td>
                  <td>{"データは、適切に管理・活用される重要な企業資産である"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Rationale"}</strong>
                  </td>
                  <td>
                    {
                      "データに対して財務・物的資産と同様の意識を持つことで、より適切な意思決定が可能になる"
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Implications"}</strong>
                  </td>
                  <td>
                    {
                      "データ管理への投資が必要になる。データオーナーを明確に定義する組織設計が必要となる"
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="source-list">
            <Ext
              className="source-item"
              href="https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap20.html"
            >
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 9.2 — Architecture Principles（公式）\n        "}
            </Ext>
          </div>
        </>
      ),
    },
    {
      id: "repository",
      content: (
        <>
          <div className="section-eyebrow">{"Architecture Repository"}</div>
          <h1 className="page-title">{"アーキテクチャリポジトリ"}</h1>
          <p className="page-subtitle">
            {"組織のアーキテクチャ成果物を一元管理するための構造化されたデータストアです。"}
          </p>
          <h2>{"リポジトリの全体構造"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-13" chart={DIAGRAMS["diag-13"]} preserveNaturalScale={true} />
          </div>
          <h2 id="togaf-table-6">{"アーキテクチャランドスケープの 3 層"}</h2>
          <div className="table-wrap">
            <table aria-labelledby="togaf-table-6">
              <thead>
                <tr>
                  <th>{"層"}</th>
                  <th>{"時間軸"}</th>
                  <th>{"粒度"}</th>
                  <th>{"説明"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{"戦略アーキテクチャ"}</strong>
                  </td>
                  <td>{"5〜10年"}</td>
                  <td>{"組織全体"}</td>
                  <td>{"変化の少ない大方針・長期ビジョン。経営層が参照する。"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"セグメントアーキテクチャ"}</strong>
                  </td>
                  <td>{"2〜5年"}</td>
                  <td>{"事業単位・部門"}</td>
                  <td>{"事業部門横断の整合性を保つ中間層。部門長クラスが参照する。"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"能力アーキテクチャ"}</strong>
                  </td>
                  <td>{"1〜2年"}</td>
                  <td>{"個別プロジェクト"}</td>
                  <td>{"具体的な実装・変更を対象とする最下層。プロジェクトチームが参照する。"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bp-list">
            <div className="bp-item">
              <div className="bp-num">{"10"}</div>
              <div className="bp-text">
                <strong>{"ガバナンスログはすべての決定を記録する"}</strong>
                <span>
                  {
                    "Architecture Board の決定、コンプライアンスレビュー結果、例外申請の承認・却下などをすべてガバナンスログに記録する。これが組織のアーキテクチャ意思決定の「歴史書」となる。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"11"}</div>
              <div className="bp-text">
                <strong>{"リポジトリはアーキテクチャの「シングルソースオブトゥルース」"}</strong>
                <span>
                  {
                    "組織内で複数の「アーキテクチャ資料」が存在すると矛盾が生じる。リポジトリを唯一の信頼できる情報源として位置付け、すべての成果物をここから参照する文化を構築する。"
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="source-list">
            <Ext
              className="source-item"
              href="https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap41.html"
            >
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 9.2 — Architecture Repository（公式）\n        "}
            </Ext>
          </div>
        </>
      ),
    },
    {
      id: "stakeholder",
      content: (
        <>
          <div className="section-eyebrow">{"Stakeholder Management"}</div>
          <h1 className="page-title">{"ステークホルダーマネジメント"}</h1>
          <p className="page-subtitle">
            {"「誰の関心事（Concerns）に答えるか」が TOGAF のアーキテクチャ設計の出発点です。"}
          </p>
          <h2 id="togaf-table-7">{"ステークホルダー管理マトリクス"}</h2>
          <div className="table-wrap">
            <table aria-labelledby="togaf-table-7">
              <thead>
                <tr>
                  <th>{"象限"}</th>
                  <th>{"影響力"}</th>
                  <th>{"関心度"}</th>
                  <th>{"対応方針"}</th>
                  <th>{"例"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{"密接に管理"}</strong>
                  </td>
                  <td>{"高"}</td>
                  <td>{"高"}</td>
                  <td>{"継続的な関与と詳細な情報共有"}</td>
                  <td>{"CEO・CIO"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"継続的な情報提供"}</strong>
                  </td>
                  <td>{"低"}</td>
                  <td>{"高"}</td>
                  <td>{"定期的なレポートと情報提供"}</td>
                  <td>{"現場マネージャー・IT運用チーム"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"満足を維持"}</strong>
                  </td>
                  <td>{"高"}</td>
                  <td>{"低"}</td>
                  <td>{"重要事項のみを報告し関係を維持"}</td>
                  <td>{"規制当局・株主"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"モニタリング"}</strong>
                  </td>
                  <td>{"低"}</td>
                  <td>{"低"}</td>
                  <td>{"最小限の情報提供で監視"}</td>
                  <td>{"ベンダー・エンドユーザー"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2>{"ステークホルダーの関心事マッピング"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-14" chart={DIAGRAMS["diag-14"]} preserveNaturalScale={true} />
          </div>
          <div className="bp-list">
            <div className="bp-item">
              <div className="bp-num">{"12"}</div>
              <div className="bp-text">
                <strong>{"ビューはステークホルダーの関心事に基づいて設計する"}</strong>
                <span>
                  {
                    "TOGAF では「ビューポイント」はステークホルダーの「Concerns（関心事）」を満たすために存在する。アーキテクトは受け取り手が誰か、何に関心があるかを常に意識してアーキテクチャ成果物を作成する。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"13"}</div>
              <div className="bp-text">
                <strong>{"全ステークホルダーを早期に特定する"}</strong>
                <span>
                  {
                    "フェーズ A でステークホルダーを網羅的に特定することが重要。後から新しいステークホルダーが発見されると、要件の追加・変更が発生しアーキテクチャ全体に影響が及ぶ。"
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="source-list">
            <Ext
              className="source-item"
              href="https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap21.html"
            >
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 9.2 — Stakeholder Management（公式）\n        "}
            </Ext>
          </div>
        </>
      ),
    },
    {
      id: "governance",
      content: (
        <>
          <div className="section-eyebrow">{"Governance & Compliance"}</div>
          <h1 className="page-title">{"ガバナンスとコンプライアンス"}</h1>
          <p className="page-subtitle">
            {
              "TOGAF では「ガバナンスなきアーキテクチャは設計書に過ぎない」。実装との整合性を保つ仕組みが不可欠です。"
            }
          </p>
          <h2>{"アーキテクチャガバナンス組織階層"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-15" chart={DIAGRAMS["diag-15"]} preserveNaturalScale={true} />
          </div>
          <h2>{"アーキテクチャコンプライアンスの 4 種類"}</h2>
          <div className="card-grid">
            <div className="card" style={{ borderColor: "var(--c-green-800)" }}>
              <div className="card-icon">
                <IconCheck
                  size={22}
                  className="mvp-icon icon-check"
                  aria-hidden="true"
                  style={{ color: "var(--color-text-success)" }}
                />
              </div>
              <div className="card-title" style={{ color: "var(--color-text-success)" }}>
                {"Conformant（適合）"}
              </div>
              <div className="card-desc">{"アーキテクチャに完全準拠。そのまま進行可能。"}</div>
            </div>
            <div className="card" style={{ borderColor: "var(--c-amber-800)" }}>
              <div className="card-icon">
                <IconAlertTriangle
                  size={22}
                  className="mvp-icon icon-alert-triangle"
                  aria-hidden="true"
                  style={{ color: "var(--color-text-warning)" }}
                />
              </div>
              <div className="card-title" style={{ color: "var(--color-text-warning)" }}>
                {"Partially Conformant（部分適合）"}
              </div>
              <div className="card-desc">{"一部準拠。改善計画の策定が必要。"}</div>
            </div>
            <div className="card" style={{ borderColor: "var(--c-coral-800)" }}>
              <div className="card-icon">
                <IconX
                  size={22}
                  className="mvp-icon icon-x"
                  aria-hidden="true"
                  style={{ color: "var(--color-text-danger)" }}
                />
              </div>
              <div className="card-title" style={{ color: "var(--color-text-danger)" }}>
                {"Non-Conformant（不適合）"}
              </div>
              <div className="card-desc">
                {"アーキテクチャに準拠していない。例外申請またはアーキテクチャ変更が必要。"}
              </div>
            </div>
            <div className="card">
              <div className="card-icon">
                <IconMinus
                  size={22}
                  className="mvp-icon icon-minus"
                  aria-hidden="true"
                  style={{ color: "var(--color-text-tertiary)" }}
                />
              </div>
              <div className="card-title" style={{ color: "var(--color-text-tertiary)" }}>
                {"Irrelevant（対象外）"}
              </div>
              <div className="card-desc">
                {"このアーキテクチャの適用対象外。対象外として記録する。"}
              </div>
            </div>
          </div>
          <h2>{"アーキテクチャコントラクト"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-16" chart={DIAGRAMS["diag-16"]} preserveNaturalScale={true} />
          </div>
          <div className="bp-list">
            <div className="bp-item">
              <div className="bp-num">{"14"}</div>
              <div className="bp-text">
                <strong>{"アーキテクチャボードは「承認機関」であり「相談機関」でもある"}</strong>
                <span>
                  {
                    "ボードは単に成果物を承認するだけでなく、プロジェクトがアーキテクチャ原則に沿った判断を早期に相談できる場としても機能させることが重要。問題が大きくなる前に介入できる体制を作る。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"15"}</div>
              <div className="bp-text">
                <strong>{"例外申請プロセスを明確に定義する"}</strong>
                <span>
                  {
                    "Non-Conformant（不適合）のプロジェクトが発生した場合の例外申請プロセスを事前に定義する。曖昧なプロセスはアーキテクチャの形骸化を招く。期限付きの例外許可と改善計画の提出を義務付けるのが効果的。"
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="source-list">
            <Ext
              className="source-item"
              href="https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap44.html"
            >
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 9.2 — Architecture Governance（公式）\n        "}
            </Ext>
          </div>
        </>
      ),
    },
    {
      id: "strategy",
      content: (
        <>
          <div className="section-eyebrow">{"Exam Strategy"}</div>
          <h1 className="page-title">{"合格戦略とベストプラクティス"}</h1>
          <p className="page-subtitle">
            {"Level 1・Level 2 それぞれの出題傾向と、合格のための 10 箇条を解説します。"}
          </p>
          <h2 id="togaf-table-8">{"Level 1 出題傾向（目安）"}</h2>
          <div className="table-wrap">
            <table aria-labelledby="togaf-table-8">
              <thead>
                <tr>
                  <th>{"テーマ"}</th>
                  <th>{"比率目安"}</th>
                  <th>{"重点ポイント"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"ADM の各フェーズ理解"}</td>
                  <td>
                    <strong>{"35%"}</strong>
                  </td>
                  <td>{"フェーズの目的・順序・入出力"}</td>
                </tr>
                <tr>
                  <td>{"アーキテクチャドメイン BDAT"}</td>
                  <td>
                    <strong>{"20%"}</strong>
                  </td>
                  <td>{"各ドメインの定義と依存関係"}</td>
                </tr>
                <tr>
                  <td>{"TOGAF の基本概念・用語"}</td>
                  <td>
                    <strong>{"20%"}</strong>
                  </td>
                  <td>{"ABB/SBB、原則の4構成要素"}</td>
                </tr>
                <tr>
                  <td>{"アーキテクチャリポジトリ"}</td>
                  <td>
                    <strong>{"10%"}</strong>
                  </td>
                  <td>{"6つの構成要素・3層ランドスケープ"}</td>
                </tr>
                <tr>
                  <td>{"ガバナンス・コンプライアンス"}</td>
                  <td>
                    <strong>{"10%"}</strong>
                  </td>
                  <td>{"コンプライアンス4種・ボードの役割"}</td>
                </tr>
                <tr>
                  <td>{"ステークホルダーマネジメント"}</td>
                  <td>
                    <strong>{"5%"}</strong>
                  </td>
                  <td>{"Concerns・ビュー・ビューポイント"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2>{"Level 2 問題の解き方フレームワーク"}</h2>
          <div className="mermaid-wrap">
            <MermaidDiagram id="diag-17" chart={DIAGRAMS["diag-17"]} preserveNaturalScale={true} />
          </div>
          <h2>{"合格のための 10 箇条"}</h2>
          <div className="bp-list">
            <div className="bp-item">
              <div className="bp-num">{"01"}</div>
              <div className="bp-text">
                <strong>{"ADM のフローを完全暗記する"}</strong>
                <span>
                  {
                    "準備フェーズ → A → B → C → D → E → F → G → H → A（反復）。この順序と各フェーズの目的を体で覚えること。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"02"}</div>
              <div className="bp-text">
                <strong>{"各フェーズの入出力を理解する"}</strong>
                <span>
                  {
                    "どのフェーズで何を作成し、何を次のフェーズに渡すか。SoAW・アーキテクチャビジョン・ギャップ分析・ロードマップなどの成果物の流れを把握する。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"03"}</div>
              <div className="bp-text">
                <strong>{"BDAT の依存関係を体系的に理解する"}</strong>
                <span>
                  {
                    "B → D/A → T の依存方向を常に意識する。ビジネス要件が未確定な状態でテクノロジーを決定することは TOGAF の原則違反。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"04"}</div>
              <div className="bp-text">
                <strong>{"ギャップ分析の手法をマスターする"}</strong>
                <span>
                  {
                    "AS-IS と TO-BE の差分特定は最頻出テーマ。「廃止・新規・維持・改善」の 4 分類を即座に判断できるようにする。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"05"}</div>
              <div className="bp-text">
                <strong>{"ABB と SBB の違いを完全理解する"}</strong>
                <span>
                  {
                    "「抽象（ABB）vs 具体（SBB）」「設計フェーズ vs 実装フェーズ」という対比を試験問題のコンテキストで即座に判別できるようにする。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"06"}</div>
              <div className="bp-text">
                <strong>{"ガバナンスプロセスを重視する"}</strong>
                <span>
                  {
                    "TOGAF は必ずガバナンス（Architecture Board 経由）を通すことを前提とする。「直接実装する」「ガバナンスをスキップする」選択肢は基本的に不正解。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"07"}</div>
              <div className="bp-text">
                <strong>{"Level 2 の REFERENCE 参照に備えて構成を把握する"}</strong>
                <span>
                  {
                    "試験画面の REFERENCE ボタンで参照する公式ドキュメントの章構成（ADM フェーズ・コンプライアンス定義・ガバナンス構造）を事前に把握し、素早く辿れるようにする。参照可でも検索時間は 1〜2 分が限界。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"08"}</div>
              <div className="bp-text">
                <strong>{"模擬試験を最低 200 問解く"}</strong>
                <span>
                  {
                    "問題のパターンと罠を把握するためには実践量が不可欠。Whizlabs・ExamTopics 等の模擬試験で間違えた問題を徹底的に復習する。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"09"}</div>
              <div className="bp-text">
                <strong>{"ステークホルダー視点で考える"}</strong>
                <span>
                  {
                    "誰の Concerns（関心事）に答えているかを常に考える。「このビューは誰のためのものか」という問いが解答の手がかりになる。"
                  }
                </span>
              </div>
            </div>
            <div className="bp-item">
              <div className="bp-num">{"10"}</div>
              <div className="bp-text">
                <strong>{"TOGAF の「考え方」を内在化する"}</strong>
                <span>
                  {
                    "暗記でなく、「なぜそうするのか」の論理を理解する。TOGAF は「体系的・反復的・ガバナンス重視」という思想を一貫して持っている。"
                  }
                </span>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "roadmap",
      content: (
        <>
          <div className="section-eyebrow">{"Study Plan"}</div>
          <h1 className="page-title">{"7 週間学習ロードマップ"}</h1>
          <p className="page-subtitle">
            {"効率的に合格を目指すための週次学習目標とリソース優先順位を示します。"}
          </p>
          <h2>{"週次学習計画"}</h2>
          <div className="week-grid">
            <div className="week-item">
              <div className="week-num">{"Week 1"}</div>
              <div>
                <div className="week-title">{"TOGAF 概要・BDAT ドメイン"}</div>
                <div className="week-detail">
                  {
                    "TOGAF とは何か・歴史・普及背景。4 つのアーキテクチャドメイン（B/D/A/T）の定義と依存関係を理解する。"
                  }
                </div>
              </div>
              <div className="week-tag">
                <span className="tag tag-teal">{"基礎"}</span>
              </div>
            </div>
            <div className="week-item">
              <div className="week-num">{"Week 2"}</div>
              <div>
                <div className="week-title">{"ADM 前半（準備〜フェーズ D）"}</div>
                <div className="week-detail">
                  {
                    "準備フェーズ・A・B・C・D の目的、入出力、主要成果物を各フェーズのベストプラクティスとともに習得する。"
                  }
                </div>
              </div>
              <div className="week-tag">
                <span className="tag tag-teal">{"ADM"}</span>
              </div>
            </div>
            <div className="week-item">
              <div className="week-num">{"Week 3"}</div>
              <div>
                <div className="week-title">{"ADM 後半（フェーズ E〜H・要求管理）"}</div>
                <div className="week-detail">
                  {
                    "実装計画・ガバナンス・変更管理の各フェーズ。要求管理が全フェーズを横断する理由を理解する。"
                  }
                </div>
              </div>
              <div className="week-tag">
                <span className="tag tag-teal">{"ADM"}</span>
              </div>
            </div>
            <div className="week-item">
              <div className="week-num">{"Week 4"}</div>
              <div>
                <div className="week-title">{"成果物・リポジトリ・原則"}</div>
                <div className="week-detail">
                  {
                    "ABB/SBB の違い、アーキテクチャリポジトリの 6 構成要素と 3 層ランドスケープ、アーキテクチャ原則の 4 要素を習得する。"
                  }
                </div>
              </div>
              <div className="week-tag">
                <span className="tag tag-amber">{"中級"}</span>
              </div>
            </div>
            <div className="week-item">
              <div className="week-num">{"Week 5"}</div>
              <div>
                <div className="week-title">{"ガバナンス・ステークホルダー"}</div>
                <div className="week-detail">
                  {
                    "Architecture Board の役割、コンプライアンス 4 種（Conformant/Partially/Non/Irrelevant）、アーキテクチャコントラクト、ステークホルダー管理マトリクスを習得する。"
                  }
                </div>
              </div>
              <div className="week-tag">
                <span className="tag tag-amber">{"中級"}</span>
              </div>
            </div>
            <div className="week-item">
              <div className="week-num">{"Week 6"}</div>
              <div>
                <div className="week-title">{"模擬試験① + 弱点分析"}</div>
                <div className="week-detail">
                  {
                    "100 問以上の模擬試験を実施。間違えた問題の根拠を必ず確認し、弱点分野の再学習を行う。"
                  }
                </div>
              </div>
              <div className="week-tag">
                <span className="tag tag-coral">{"実践"}</span>
              </div>
            </div>
            <div className="week-item">
              <div className="week-num">{"Week 7"}</div>
              <div>
                <div className="week-title">{"模擬試験② + 直前対策"}</div>
                <div className="week-detail">
                  {
                    "150 問以上の模擬試験。キーワード・用語の最終確認。Level 2 受験者はドキュメントのタブ整理を完成させる。"
                  }
                </div>
              </div>
              <div className="week-tag">
                <span className="tag tag-coral">{"仕上げ"}</span>
              </div>
            </div>
          </div>
          <h2 id="togaf-table-9">{"学習リソース優先順位"}</h2>
          <div className="table-wrap">
            <table aria-labelledby="togaf-table-9">
              <thead>
                <tr>
                  <th>{"優先度"}</th>
                  <th>{"リソース"}</th>
                  <th>{"用途"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong style={{ color: "var(--color-text-danger)" }}>{"Must"}</strong>
                  </td>
                  <td>{"TOGAF Standard Version 10（公式）"}</td>
                  <td>{"Level 2 の REFERENCE 参照対策・根拠確認"}</td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: "var(--color-text-danger)" }}>{"Must"}</strong>
                  </td>
                  <td>{"公式サンプル試験問題（The Open Group）"}</td>
                  <td>{"問題形式・難易度の把握"}</td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: "var(--color-text-danger)" }}>{"Must"}</strong>
                  </td>
                  <td>{"認定トレーニングプログラム（ATC）"}</td>
                  <td>{"体系的な知識習得"}</td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: "var(--color-text-warning)" }}>{"Should"}</strong>
                  </td>
                  <td>{"Whizlabs / ExamTopics 模擬試験"}</td>
                  <td>{"問題パターンと弱点把握"}</td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: "var(--color-text-warning)" }}>{"Should"}</strong>
                  </td>
                  <td>{"Udemy / Coursera 動画コース"}</td>
                  <td>{"視覚的な理解補助"}</td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: "var(--color-text-success)" }}>{"Nice"}</strong>
                  </td>
                  <td>{"TOGAF Wiki・コミュニティ"}</td>
                  <td>{"実践者の経験談・補足情報"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      id: "references",
      content: (
        <>
          <div className="section-eyebrow">{"References"}</div>
          <h1 className="page-title">{"参考文献・公式 URL"}</h1>
          <p className="page-subtitle">
            {"本ガイドで参照した公式ソースと学習リソースの一覧です。"}
          </p>
          <h2>{"TOGAF 公式"}</h2>
          <div className="source-list">
            <Ext className="source-item" href="https://www.opengroup.org/togaf">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 公式サイト（The Open Group）\n        "}
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
              {" TOGAF 9.2 公式ドキュメント（ADM全フェーズ）\n        "}
            </Ext>
            <Ext className="source-item" href="https://www.opengroup.org/certifications/togaf">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 認定資格プログラム（試験詳細・サンプル問題）\n        "}
            </Ext>
            <Ext
              className="source-item"
              href="https://www.opengroup.org/certifications/professional-register"
            >
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" TOGAF 認定者検索（Professional Register）\n        "}
            </Ext>
          </div>
          <h2>{"EA フレームワーク関連"}</h2>
          <div className="source-list">
            <Ext className="source-item" href="https://www.opengroup.org/architecture">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" The Open Group Architecture Forum\n        "}
            </Ext>
            <Ext className="source-item" href="https://www.zachman.com/about-the-zachman-framework">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" Zachman Framework 公式\n        "}
            </Ext>
            <Ext className="source-item" href="https://cio.gov/">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" FEAF（米国連邦政府 EA）\n        "}
            </Ext>
          </div>
          <h2>{"試験申込・受験"}</h2>
          <div className="source-list">
            <Ext className="source-item" href="https://home.pearsonvue.com/opengroup">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" Pearson VUE — 試験申込ポータル\n        "}
            </Ext>
            <Ext
              className="source-item"
              href="https://home.pearsonvue.com/Test-takers/Find-a-test-center.aspx"
            >
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" 試験センター検索（日本）\n        "}
            </Ext>
            <Ext className="source-item" href="https://home.pearsonvue.com/opengroup/onvue">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" オンライン受験（OnVUE）\n        "}
            </Ext>
          </div>
          <h2>{"学習プラットフォーム"}</h2>
          <div className="source-list">
            <Ext className="source-item" href="https://www.udemy.com/topic/togaf/">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" Udemy — TOGAF 試験対策コース\n        "}
            </Ext>
            <Ext className="source-item" href="https://www.coursera.org/">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" Coursera — Enterprise Architecture\n        "}
            </Ext>
            <Ext className="source-item" href="https://www.linkedin.com/learning/topics/togaf">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" LinkedIn Learning — TOGAF\n        "}
            </Ext>
            <Ext className="source-item" href="https://www.whizlabs.com/togaf/">
              <IconExternalLink
                size={14}
                className="mvp-icon icon-external-link"
                aria-hidden="true"
              />
              {" Whizlabs — TOGAF 模擬試験\n        "}
            </Ext>
          </div>
          <h2 id="togaf-table-10">{"推薦書籍"}</h2>
          <div className="table-wrap">
            <table aria-labelledby="togaf-table-10">
              <thead>
                <tr>
                  <th>{"タイトル"}</th>
                  <th>{"著者"}</th>
                  <th>{"用途"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{"TOGAF Standard, Version 10"}</strong>
                  </td>
                  <td>{"The Open Group"}</td>
                  <td>{"最新公式テキスト（Level 2 は試験画面で参照）"}</td>
                </tr>
                <tr>
                  <td>{"TOGAF Version 9.1 Pocket Guide"}</td>
                  <td>{"Andrew Josey"}</td>
                  <td>{"試験直前の要点整理"}</td>
                </tr>
                <tr>
                  <td>{"Enterprise Architecture As Strategy"}</td>
                  <td>{"Ross, Weill, Robertson"}</td>
                  <td>{"EA の戦略的価値を理解する背景学習"}</td>
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
              <strong>{"免責事項："}</strong>
              {
                "TOGAF® は The Open Group の登録商標です。本ドキュメントは The Open Group の公式資料ではありません。試験情報・受験料・試験形式は変更される場合があります。受験前に必ず公式サイト（opengroup.org/togaf）でご確認ください。"
              }
            </div>
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
