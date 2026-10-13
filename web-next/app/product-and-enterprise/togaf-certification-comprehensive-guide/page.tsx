import {
  IconAlertTriangle,
  IconBulb,
  IconCheck,
  IconExternalLink,
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
  ];
  return (
    <div className="togaf-certification-comprehensive-guide">
      <TogafGuideShell groups={NAV_GROUPS} panels={panels} />
    </div>
  );
}
