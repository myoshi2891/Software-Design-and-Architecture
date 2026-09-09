import {
  IconBrain,
  IconBuilding,
  IconChartBar,
  IconCheck,
  IconCode,
  IconCrown,
  IconSettings,
} from "@tabler/icons-react";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import FddSidebar from "./FddSidebar";

export default function Page() {
  return (
    <div className="feature-driven-development-comprehensive-guide">
      <div className="layout">
        <FddSidebar />

        <main className="main">
          <div className="page-header">
            <div className="page-label">Software Development Methodology</div>
            <h1 className="page-title">FDD（Feature-Driven Development）完全ガイド</h1>
            <p className="page-subtitle">
              フィーチャー駆動開発の5つのプロセス、ロール、ベストプラクティスを初学者にもわかりやすく解説する実践リファレンス
            </p>
          </div>

          {/* ========== SECTION 1 ========== */}
          <section id="s1">
            <div className="section-header">
              <span className="section-num">01</span>
              <h2>FDDとは何か</h2>
            </div>
            <p className="lead">
              Feature-Driven Development（フィーチャー駆動開発）は、Jeff De Lucaと Peter
              Coadが1997年に提唱した反復的・漸進的なアジャイルソフトウェア開発手法です。1997年のシンガポールにおける大規模銀行システム開発（15ヶ月・50名・15万行）という実際のプロジェクトから生まれた、実績ある実践的手法です。
            </p>

            <div className="callout">
              <div className="callout-label">核心思想</div>
              <p>
                「顧客にとって価値ある機能（フィーチャー）を2週間以内に反復的に届け続ける。すべての設計・開発活動はフィーチャーを中心に回す。」
              </p>
            </div>

            <h3>FDDが解決する問題</h3>
            <p>FDDが誕生した背景には、大規模プロジェクトにおける4つの典型的な問題がありました。</p>

            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`flowchart LR
subgraph before["導入前の課題"]
  direction TB
  P1["大規模チームで\\n進捗が見えない"]
  P2["ビジネス価値と\\n開発タスクが乖離"]
  P3["長い開発サイクルで\\nフィードバックが遅い"]
  P4["コードオーナーシップが\\n曖昧"]
end
subgraph after["FDD導入後の効果"]
  direction TB
  S1["フィーチャー単位で\\n進捗を可視化"]
  S2["ビジネス価値と\\n開発が直接紐づく"]
  S3["2週間以内の短サイクルで\\n継続的にデリバリー"]
  S4["クラスオーナー制で\\n品質とオーナーシップが明確"]
end
P1 --> S1
P2 --> S2
P3 --> S3
P4 --> S4
style P1 fill:#2a1020,stroke:#ef4444,color:#fca5a5
style P2 fill:#2a1020,stroke:#ef4444,color:#fca5a5
style P3 fill:#2a1020,stroke:#ef4444,color:#fca5a5
style P4 fill:#2a1020,stroke:#ef4444,color:#fca5a5
style S1 fill:#0d2818,stroke:#22c55e,color:#86efac
style S2 fill:#0d2818,stroke:#22c55e,color:#86efac
style S3 fill:#0d2818,stroke:#22c55e,color:#86efac
style S4 fill:#0d2818,stroke:#22c55e,color:#86efac`}
                />
              </div>
              <div className="diagram-caption">FDD導入による課題解決マップ</div>
            </div>

            <h3>FDDの6つのベストプラクティス</h3>
            <p>
              FDDは以下の6つのプラクティスを柱としています。これらは個別に採用することも可能ですが、組み合わせて使うことで最大の効果を発揮します。
            </p>

            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`flowchart TD
root["FDD 6つのベストプラクティス"]
root --> A["ドメインオブジェクト\\nモデリング"]
root --> B["フィーチャーによる開発"]
root --> C["クラスオーナーシップ"]
root --> D["フィーチャーチーム"]
root --> E["インスペクション"]
root --> F["定期ビルドとCI"]
A --> A1["ビジネスドメインを探索・説明\\nモデルを定期的に更新"]
B --> B1["機能を小さな単位に分解\\n2週間以内に完了する粒度"]
C --> C1["各クラスに担当者を割り当て\\n品質の責任を明確化"]
D --> D1["小規模な機能横断チーム\\n協調した設計・開発"]
E --> E1["設計・コードレビューの実施\\n品質ゲートとして機能"]
F --> F1["常にデモ可能な状態を維持\\n継続的インテグレーション"]
style root fill:#2e0e6e,stroke:#7c35f0,color:#d8bfff
style A fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style B fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style C fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style D fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style E fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style F fill:#1e2535,stroke:#2e3650,color:#9aa3b8`}
                />
              </div>
              <div className="diagram-caption">FDDを支える6つのコアプラクティス</div>
            </div>

            <h3>FDDが適しているプロジェクト</h3>
            <table>
              <thead>
                <tr>
                  <th>適合条件</th>
                  <th>詳細</th>
                  <th>判定</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>チーム規模</td>
                  <td>10名以上の大規模チーム</td>
                  <td>
                    <span className="badge badge-green">高適合</span>
                  </td>
                </tr>
                <tr>
                  <td>ドメイン複雑さ</td>
                  <td>複雑なビジネスロジックを含む業務システム</td>
                  <td>
                    <span className="badge badge-green">高適合</span>
                  </td>
                </tr>
                <tr>
                  <td>進捗の可視化ニーズ</td>
                  <td>ステークホルダーへの定期的な進捗報告が必要</td>
                  <td>
                    <span className="badge badge-green">高適合</span>
                  </td>
                </tr>
                <tr>
                  <td>スコープの明確さ</td>
                  <td>ある程度要件が固まっているプロジェクト</td>
                  <td>
                    <span className="badge badge-teal">中適合</span>
                  </td>
                </tr>
                <tr>
                  <td>探索的な開発</td>
                  <td>要件が流動的なスタートアップMVP</td>
                  <td>
                    <span className="badge badge-amber">低適合</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="callout callout-info">
              <div className="callout-label">出典</div>
              <p>
                FDDの起源と定義: Jeff De Luca, &quot;FDD and Nebulon&quot; (1997), Agile Alliance
                Glossary —{" "}
                <Ext href="https://www.agilealliance.org/glossary/fdd/">
                  https://www.agilealliance.org/glossary/fdd/
                </Ext>
              </p>
            </div>
          </section>

          {/* ========== SECTION 2 ========== */}
          <section id="s2">
            <div className="section-header">
              <span className="section-num">02</span>
              <h2>FDDの全体構造と5つのプロセス</h2>
            </div>
            <p className="lead">
              FDDは「初期フェーズ（一度だけ実施）」と「反復フェーズ（フィーチャーごとに繰り返す）」の2つのフェーズで構成されます。5つのプロセスはこの2つのフェーズに分かれて配置されています。
            </p>

            <h3>5つのプロセス概要</h3>

            <div className="process-timeline">
              <div className="process-item">
                <div className="process-connector">
                  <div className="process-dot process-dot-init" />
                  <div className="process-line process-line-init" />
                </div>
                <div className="process-body process-body-init">
                  <div className="process-tag tag-init">Process 1 — 初期フェーズ</div>
                  <div className="process-name">全体モデルの開発（Develop an Overall Model）</div>
                  <div className="process-desc">
                    ドメイン全体の高レベルなクラス図を作成する。完璧を目指さず、チームの共通理解を作ることが目的。期間：1〜2週間。
                  </div>
                </div>
              </div>
              <div className="process-item">
                <div className="process-connector">
                  <div className="process-dot process-dot-init" />
                  <div className="process-line process-line-init" />
                </div>
                <div className="process-body process-body-init">
                  <div className="process-tag tag-init">Process 2 — 初期フェーズ</div>
                  <div className="process-name">
                    フィーチャーリストの構築（Build a Features List）
                  </div>
                  <div className="process-desc">
                    ドメインモデルから「動詞+結果+オブジェクト」形式でフィーチャーを列挙。各フィーチャーは2週間以内に完了できる粒度に分解する。
                  </div>
                </div>
              </div>
              <div className="process-item">
                <div className="process-connector">
                  <div className="process-dot process-dot-init" />
                  <div className="process-line process-line-init" />
                </div>
                <div className="process-body process-body-init">
                  <div className="process-tag tag-init">Process 3 — 初期フェーズ</div>
                  <div className="process-name">フィーチャーごとの計画策定（Plan by Feature）</div>
                  <div className="process-desc">
                    ビジネス価値・依存関係・リスクに基づいてフィーチャーの開発順序とチームへの割り当てを決定する。
                  </div>
                </div>
              </div>
              <div className="process-item">
                <div className="process-connector">
                  <div className="process-dot process-dot-iter" />
                  <div className="process-line process-line-iter" />
                </div>
                <div className="process-body process-body-iter">
                  <div className="process-tag tag-iter">Process 4 — 反復フェーズ（繰り返し）</div>
                  <div className="process-name">フィーチャーごとの設計（Design by Feature）</div>
                  <div className="process-desc">
                    フィーチャーチームがシーケンス図を作成し、クラスメソッドの設計を行う。設計インスペクションで品質を確認してから次へ進む。
                  </div>
                </div>
              </div>
              <div className="process-item">
                <div className="process-connector">
                  <div className="process-dot process-dot-iter" />
                  <div className="process-line process-line-iter" />
                </div>
                <div className="process-body process-body-iter">
                  <div className="process-tag tag-iter">Process 5 — 反復フェーズ（繰り返し）</div>
                  <div className="process-name">フィーチャーごとの構築（Build by Feature）</div>
                  <div className="process-desc">
                    各クラスオーナーが担当クラスを実装し、コードインスペクションを経てメインブランチへプロモート（マージ）する。
                  </div>
                </div>
              </div>
            </div>

            <h3>全体のタイムライン（6ヶ月プロジェクト例）</h3>
            <div className="mermaid-wrap" style={{ overflowX: "auto" }}>
              <svg
                viewBox="0 0 1100 564"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", minWidth: "700px", display: "block" }}
              >
                <title>全体のタイムライン（6ヶ月プロジェクト例）</title>
                {/* ===== 全体背景 ===== */}
                <rect width="1100" height="564" fill="#0f1117" />

                {/* ===== 列A: フェーズ帯（x=0〜56） ===== */}
                <rect x="0" y="40" width="56" height="144" fill="#2e0e6e" fillOpacity="0.35" />
                <rect x="0" y="184" width="56" height="336" fill="#074440" fillOpacity="0.25" />
                <line x1="56" y1="40" x2="56" y2="520" stroke="#2e3650" strokeWidth="1" />
                <text
                  transform="rotate(-90,28,112)"
                  x="28"
                  y="112"
                  fill="#bc8fff"
                  fontSize="12"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  初期フェーズ
                </text>
                <text
                  transform="rotate(-90,28,352)"
                  x="28"
                  y="352"
                  fill="#52e2dd"
                  fontSize="12"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  反復フェーズ（繰り返し）
                </text>

                {/* ===== 列B: 行ラベル（x=56〜260） ===== */}
                <rect x="56" y="40" width="204" height="480" fill="#161b27" />
                <line x1="260" y1="0" x2="260" y2="564" stroke="#2e3650" strokeWidth="1.5" />

                <text
                  x="158"
                  y="68"
                  fill="#e8eaf0"
                  fontSize="13"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  全体モデルの開発
                </text>
                <text
                  x="158"
                  y="82"
                  fill="#7c35f0"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  Process 1
                </text>

                <text
                  x="158"
                  y="116"
                  fill="#e8eaf0"
                  fontSize="13"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  フィーチャーリスト構築
                </text>
                <text
                  x="158"
                  y="130"
                  fill="#7c35f0"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  Process 2
                </text>

                <text
                  x="158"
                  y="164"
                  fill="#e8eaf0"
                  fontSize="13"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  計画策定
                </text>
                <text
                  x="158"
                  y="178"
                  fill="#7c35f0"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  Process 3
                </text>

                <text
                  x="158"
                  y="212"
                  fill="#e8eaf0"
                  fontSize="13"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  フィーチャーセット 1
                </text>
                <text
                  x="158"
                  y="226"
                  fill="#14a8a2"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計（P4）→ 構築（P5）
                </text>

                <text
                  x="158"
                  y="260"
                  fill="#e8eaf0"
                  fontSize="13"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  フィーチャーセット 2
                </text>
                <text
                  x="158"
                  y="274"
                  fill="#14a8a2"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計（P4）→ 構築（P5）
                </text>

                <text
                  x="158"
                  y="308"
                  fill="#e8eaf0"
                  fontSize="13"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  フィーチャーセット 3
                </text>
                <text
                  x="158"
                  y="322"
                  fill="#14a8a2"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計（P4）→ 構築（P5）
                </text>

                <text
                  x="158"
                  y="356"
                  fill="#e8eaf0"
                  fontSize="13"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  フィーチャーセット 4
                </text>
                <text
                  x="158"
                  y="370"
                  fill="#14a8a2"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計（P4）→ 構築（P5）
                </text>

                <text
                  x="158"
                  y="404"
                  fill="#e8eaf0"
                  fontSize="13"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  フィーチャーセット 5
                </text>
                <text
                  x="158"
                  y="418"
                  fill="#14a8a2"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計（P4）→ 構築（P5）
                </text>

                <text
                  x="158"
                  y="452"
                  fill="#e8eaf0"
                  fontSize="13"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  フィーチャーセット 6
                </text>
                <text
                  x="158"
                  y="466"
                  fill="#14a8a2"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計（P4）→ 構築（P5）
                </text>

                <text
                  x="158"
                  y="497"
                  fill="#9aa3b8"
                  fontSize="13"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  フィーチャーセット 7〜10
                </text>
                <text
                  x="158"
                  y="511"
                  fill="#5c6480"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  同様のサイクルを継続
                </text>

                {/* ===== ヘッダー行（y=0〜40） ===== */}
                <rect x="0" y="0" width="1100" height="40" fill="#1e2535" />
                <line x1="0" y1="40" x2="1100" y2="40" stroke="#2e3650" strokeWidth="1.5" />
                <text
                  x="28"
                  y="24"
                  fill="#5c6480"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  フェーズ
                </text>
                <text
                  x="158"
                  y="24"
                  fill="#9aa3b8"
                  fontSize="12"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  プロセス / フィーチャーセット
                </text>
                <text
                  x="330"
                  y="24"
                  fill="#9aa3b8"
                  fontSize="12"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  Month 1
                </text>
                <text
                  x="470"
                  y="24"
                  fill="#5c6480"
                  fontSize="12"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  Month 2
                </text>
                <text
                  x="610"
                  y="24"
                  fill="#5c6480"
                  fontSize="12"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  Month 3
                </text>
                <text
                  x="750"
                  y="24"
                  fill="#5c6480"
                  fontSize="12"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  Month 4
                </text>
                <text
                  x="890"
                  y="24"
                  fill="#5c6480"
                  fontSize="12"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  Month 5
                </text>
                <text
                  x="1030"
                  y="24"
                  fill="#5c6480"
                  fontSize="12"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  Month 6
                </text>

                {/* ===== 列C: チャートエリア（x=260〜1100） ===== */}
                <rect x="260" y="40" width="840" height="48" fill="#161b27" />
                <rect x="260" y="88" width="840" height="48" fill="#0f1117" />
                <rect x="260" y="136" width="840" height="48" fill="#161b27" />
                <rect x="260" y="184" width="840" height="48" fill="#0f1117" />
                <rect x="260" y="232" width="840" height="48" fill="#161b27" />
                <rect x="260" y="280" width="840" height="48" fill="#0f1117" />
                <rect x="260" y="328" width="840" height="48" fill="#161b27" />
                <rect x="260" y="376" width="840" height="48" fill="#0f1117" />
                <rect x="260" y="424" width="840" height="48" fill="#161b27" />
                <rect x="260" y="472" width="840" height="48" fill="#0f1117" />

                <line x1="0" y1="88" x2="1100" y2="88" stroke="#1a1f30" strokeWidth="1" />
                <line x1="0" y1="136" x2="1100" y2="136" stroke="#1a1f30" strokeWidth="1" />
                <line x1="0" y1="184" x2="1100" y2="184" stroke="#2e3650" strokeWidth="2" />
                <line x1="0" y1="232" x2="1100" y2="232" stroke="#1a1f30" strokeWidth="1" />
                <line x1="0" y1="280" x2="1100" y2="280" stroke="#1a1f30" strokeWidth="1" />
                <line x1="0" y1="328" x2="1100" y2="328" stroke="#1a1f30" strokeWidth="1" />
                <line x1="0" y1="376" x2="1100" y2="376" stroke="#1a1f30" strokeWidth="1" />
                <line x1="0" y1="424" x2="1100" y2="424" stroke="#1a1f30" strokeWidth="1" />
                <line x1="0" y1="472" x2="1100" y2="472" stroke="#1a1f30" strokeWidth="1" />
                <line x1="56" y1="520" x2="1100" y2="520" stroke="#2e3650" strokeWidth="1.5" />

                {/* Month区切り線 */}
                <line x1="400" y1="0" x2="400" y2="520" stroke="#242a3e" strokeWidth="1.5" />
                <line x1="540" y1="0" x2="540" y2="520" stroke="#242a3e" strokeWidth="1.5" />
                <line x1="680" y1="0" x2="680" y2="520" stroke="#242a3e" strokeWidth="1.5" />
                <line x1="820" y1="0" x2="820" y2="520" stroke="#242a3e" strokeWidth="1.5" />
                <line x1="960" y1="0" x2="960" y2="520" stroke="#242a3e" strokeWidth="1.5" />

                {/* 週グリッド */}
                <line x1="295" y1="40" x2="295" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="330" y1="40" x2="330" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="365" y1="40" x2="365" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="435" y1="40" x2="435" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="470" y1="40" x2="470" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="505" y1="40" x2="505" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="575" y1="40" x2="575" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="610" y1="40" x2="610" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="645" y1="40" x2="645" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="715" y1="40" x2="715" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="750" y1="40" x2="750" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="785" y1="40" x2="785" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="855" y1="40" x2="855" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="890" y1="40" x2="890" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="925" y1="40" x2="925" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="995" y1="40" x2="995" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="1030" y1="40" x2="1030" y2="520" stroke="#1a1f30" strokeWidth="0.5" />
                <line x1="1065" y1="40" x2="1065" y2="520" stroke="#1a1f30" strokeWidth="0.5" />

                {/* P1 bar */}
                <rect
                  x="263"
                  y="54"
                  width="64"
                  height="20"
                  fill="#4a18a8"
                  stroke="#7c35f0"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x="295"
                  y="68"
                  fill="#d8bfff"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  14日（2週）
                </text>

                {/* P2 bar */}
                <rect
                  x="333"
                  y="102"
                  width="29"
                  height="20"
                  fill="#4a18a8"
                  stroke="#7c35f0"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x="347"
                  y="116"
                  fill="#d8bfff"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  7d
                </text>

                {/* P3 bar */}
                <rect
                  x="368"
                  y="150"
                  width="29"
                  height="20"
                  fill="#4a18a8"
                  stroke="#7c35f0"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x="382"
                  y="164"
                  fill="#d8bfff"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  7d
                </text>

                {/* 初期フェーズ スパンバー */}
                <rect x="263" y="40" width="136" height="4" fill="#7c35f0" opacity="0.7" rx="2" />
                <text
                  x="331"
                  y="38"
                  fill="#9c5fff"
                  fontSize="10"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  ← 初期フェーズ（約1ヶ月）→
                </text>

                {/* FS1 bar */}
                <rect
                  x="403"
                  y="198"
                  width="64"
                  height="20"
                  fill="#0a6460"
                  stroke="#14a8a2"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x="435"
                  y="212"
                  fill="#96f2ee"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計→構築
                </text>

                {/* FS2 bar */}
                <rect
                  x="473"
                  y="246"
                  width="64"
                  height="20"
                  fill="#0a6460"
                  stroke="#14a8a2"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x="505"
                  y="260"
                  fill="#96f2ee"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計→構築
                </text>

                {/* FS3 bar */}
                <rect
                  x="543"
                  y="294"
                  width="64"
                  height="20"
                  fill="#0a6460"
                  stroke="#14a8a2"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x="575"
                  y="308"
                  fill="#96f2ee"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計→構築
                </text>

                {/* FS4 bar */}
                <rect
                  x="613"
                  y="342"
                  width="64"
                  height="20"
                  fill="#0a6460"
                  stroke="#14a8a2"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x="645"
                  y="356"
                  fill="#96f2ee"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計→構築
                </text>

                {/* FS5 bar */}
                <rect
                  x="683"
                  y="390"
                  width="64"
                  height="20"
                  fill="#0a6460"
                  stroke="#14a8a2"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x="715"
                  y="404"
                  fill="#96f2ee"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計→構築
                </text>

                {/* FS6 bar */}
                <rect
                  x="753"
                  y="438"
                  width="64"
                  height="20"
                  fill="#0a6460"
                  stroke="#14a8a2"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x="785"
                  y="452"
                  fill="#96f2ee"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  設計→構築
                </text>

                {/* FS7-10 bar */}
                <rect
                  x="823"
                  y="482"
                  width="270"
                  height="20"
                  fill="#042826"
                  stroke="#14a8a2"
                  strokeWidth="1"
                  strokeDasharray="6,3"
                  rx="4"
                />
                <text
                  x="958"
                  y="496"
                  fill="#52e2dd"
                  fontSize="11"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  FS7〜FS10（2週間 × 4サイクル継続）
                </text>

                <line x1="403" y1="184" x2="467" y2="184" stroke="#14a8a2" strokeWidth="1" />
                <line x1="403" y1="181" x2="403" y2="187" stroke="#14a8a2" strokeWidth="1" />
                <line x1="467" y1="181" x2="467" y2="187" stroke="#14a8a2" strokeWidth="1" />
                <text
                  x="435"
                  y="179"
                  fill="#14a8a2"
                  fontSize="10"
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  ← 2週間 →
                </text>

                {/* ===== 凡例 ===== */}
                <rect x="0" y="520" width="1100" height="44" fill="#161b27" />
                <line x1="0" y1="520" x2="1100" y2="520" stroke="#242a3e" strokeWidth="1" />
                <rect
                  x="180"
                  y="534"
                  width="14"
                  height="10"
                  fill="#4a18a8"
                  stroke="#7c35f0"
                  strokeWidth="1"
                  rx="2"
                />
                <text
                  x="200"
                  y="543"
                  fill="#9aa3b8"
                  fontSize="12"
                  fontFamily="Inter,system-ui,sans-serif"
                >
                  初期フェーズ（P1〜P3）：約1ヶ月・プロジェクト開始時に一度だけ実施
                </text>
                <rect
                  x="620"
                  y="534"
                  width="14"
                  height="10"
                  fill="#0a6460"
                  stroke="#14a8a2"
                  strokeWidth="1"
                  rx="2"
                />
                <text
                  x="640"
                  y="543"
                  fill="#9aa3b8"
                  fontSize="12"
                  fontFamily="Inter,system-ui,sans-serif"
                >
                  反復フェーズ（P4〜P5）：2週間サイクルをフィーチャー数だけ繰り返す
                </text>
              </svg>
              <div className="diagram-caption">
                初期フェーズに約1ヶ月を割き、残り5ヶ月を反復フェーズとして運用する例（1週 = 35px）
              </div>
            </div>

            <h3>FDDの階層構造</h3>
            <p>
              FDDはプロジェクトを4つの階層に分解して管理します。最上位の「ドメイン」から最小単位の「フィーチャー」まで、段階的に具体化していきます。
            </p>

            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`graph TD
DOMAIN["ドメイン（Domain）\\n例: ECサイト全体"]
DOMAIN --> SA1["Subject Area 1\\n顧客管理"]
DOMAIN --> SA2["Subject Area 2\\n商品管理"]
DOMAIN --> SA3["Subject Area 3\\n注文管理"]
SA1 --> BA1["Business Activity 1\\n顧客登録・認証"]
SA1 --> BA2["Business Activity 2\\n顧客情報管理"]
SA3 --> BA3["Business Activity 3\\n注文処理"]
SA3 --> BA4["Business Activity 4\\n支払い処理"]
BA1 --> F1["Feature\\nメールで顧客を登録する"]
BA1 --> F2["Feature\\nパスワードで顧客を認証する"]
BA3 --> F3["Feature\\nカートから注文を作成する"]
BA3 --> F4["Feature\\n注文履歴を表示する"]
style DOMAIN fill:#2e0e6e,stroke:#7c35f0,color:#d8bfff
style SA1 fill:#074440,stroke:#14a8a2,color:#96f2ee
style SA2 fill:#074440,stroke:#14a8a2,color:#96f2ee
style SA3 fill:#074440,stroke:#14a8a2,color:#96f2ee
style BA1 fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style BA2 fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style BA3 fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style BA4 fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style F1 fill:#0d2818,stroke:#22c55e,color:#86efac
style F2 fill:#0d2818,stroke:#22c55e,color:#86efac
style F3 fill:#0d2818,stroke:#22c55e,color:#86efac
style F4 fill:#0d2818,stroke:#22c55e,color:#86efac`}
                />
              </div>
              <div className="diagram-caption">
                Domain → Subject Area → Business Activity → Feature の4層構造
              </div>
            </div>

            <div className="callout callout-info">
              <div className="callout-label">出典</div>
              <p>
                Palmer, S.R., Felsing, J.M. &quot;A Practical Guide to Feature-Driven
                Development&quot; (2002), Prentice Hall — FDDの5プロセスと階層構造の原典
              </p>
            </div>
          </section>

          {/* ========== SECTION 3 ========== */}
          <section id="s3">
            <div className="section-header">
              <span className="section-num">03</span>
              <h2>プロセス1：全体モデルの開発</h2>
            </div>
            <p className="lead">
              プロジェクト開始時に一度だけ実施します。ドメイン（ビジネス領域）全体の高レベルなオブジェクトモデルを作成し、チーム全員が「同じ言語」で話せる共通理解の基盤を作ります。
            </p>

            <div className="callout callout-warning">
              <div className="callout-label">重要</div>
              <p>
                完璧なモデルを作ることが目的ではありません。「十分に良い（good
                enough）」モデルを素早く作り、後続の反復サイクルで継続的に更新することが正しいアプローチです。
              </p>
            </div>

            <h3>全体モデル開発のプロセスフロー</h3>
            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`flowchart TD
A["プロジェクト開始"] --> B["キックオフミーティング\\nドメインエキスパート + 開発チーム"]
B --> C["ドメインウォークスルー\\nビジネス領域ごとにエキスパートが説明"]
C --> D["小グループモデリング\\n3〜5人のグループで各領域のモデルを作成"]
D --> E["モデルレビュー\\n全体への発表とフィードバック収集"]
E --> F["ドメインモデルの洗練\\nフィードバックを反映して初期モデルを確定"]
F --> G["用語集の作成\\nユビキタス言語の確立"]
style A fill:#2e0e6e,stroke:#7c35f0,color:#d8bfff
style B fill:#074440,stroke:#14a8a2,color:#96f2ee
style C fill:#074440,stroke:#14a8a2,color:#96f2ee
style D fill:#1e2535,stroke:#7c35f0,color:#bc8fff
style E fill:#2a1e0a,stroke:#f59e0b,color:#fde68a
style F fill:#1e2535,stroke:#7c35f0,color:#bc8fff
style G fill:#0d1f3c,stroke:#3b82f6,color:#93c5fd`}
                />
              </div>
              <div className="diagram-caption">P1の実施手順。全体で1〜2週間以内に完了させる</div>
            </div>

            <h3>ドメインモデルの例（ECサイト）</h3>
            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`classDiagram
class Customer {
  +CustomerId id
  +String name
  +Email email
  +Address shippingAddress
  +placeOrder()
  +updateProfile()
}
class Order {
  +OrderId id
  +OrderStatus status
  +Money totalAmount
  +confirm()
  +cancel()
  +calculateTotal()
}
class OrderLine {
  +ProductId productId
  +int quantity
  +Money unitPrice
  +calculateSubtotal()
}
class Product {
  +ProductId id
  +String name
  +Money price
  +int stockCount
  +isAvailable()
  +reserve()
}
class Payment {
  +PaymentId id
  +Money amount
  +PaymentStatus status
  +process()
  +refund()
}
class Shipment {
  +ShipmentId id
  +Address destination
  +ShipmentStatus status
  +ship()
  +track()
}
Customer "1" --> "0..*" Order : places
Order "1" *-- "1..*" OrderLine : contains
Order "1" --> "1" Payment : paidBy
Order "1" --> "1" Shipment : deliveredBy
Product "1" <-- "0..*" OrderLine : references`}
                />
              </div>
              <div className="diagram-caption">
                ECサイトの初期ドメインモデル。クラス・属性・関係を定義する
              </div>
            </div>

            <h3>ベストプラクティス</h3>
            <ul className="checklist">
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">完璧を求めない：</span>
                  初期モデルは「十分に良い」程度でOK。反復の中で改善する
                </div>
              </li>
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">ドメインエキスパートを必ず巻き込む：</span>
                  エンジニアだけでモデルを作らない。ビジネス知識が欠落したモデルは後で大きな問題を起こす
                </div>
              </li>
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">色分け付箋を使う：</span>
                  クラス・属性・メソッドを色で区別してホワイトボードで作業する（Peter CoadのColor
                  UMLアプローチ）
                </div>
              </li>
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">UMLは補助ツールとして使う：</span>
                  厳密なUMLより、チームが理解できる図を優先する
                </div>
              </li>
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">用語集を必ず作る：</span>
                  モデルで使った言葉を全員が同じ意味で使えるようにする（ユビキタス言語）
                </div>
              </li>
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">2週間以内に完成させる：</span>
                  初期モデリングに時間をかけすぎるとウォーターフォール化するリスクがある
                </div>
              </li>
            </ul>

            <div className="callout callout-info">
              <div className="callout-label">出典</div>
              <p>
                Coad, P., De Luca, J., Lefebvre, E. &quot;Java Modeling in Color with UML&quot;
                (1999), Prentice Hall — FDDのドメインモデリング手法（Color UML）の原典
              </p>
            </div>
          </section>

          {/* ========== SECTION 4 ========== */}
          <section id="s4">
            <div className="section-header">
              <span className="section-num">04</span>
              <h2>プロセス2：フィーチャーリストの構築</h2>
            </div>
            <p className="lead">
              ドメインモデルを基に、顧客にとって価値ある機能を「フィーチャー」として列挙します。このリストがFDD全体の作業台帳になります。すべての開発活動はこのリストに記載されたフィーチャーを完了させることを中心に回ります。
            </p>

            <h3>フィーチャーとは</h3>
            <div className="callout">
              <div className="callout-label">定義</div>
              <p>
                フィーチャー（Feature）とは、クライアント評価の観点から価値を持つ小さな機能のことです。FDDの鉄則：
                <strong>1つのフィーチャーは2週間以内に設計・開発・テスト完了できる粒度</strong>
                でなければなりません。
              </p>
            </div>

            <h3>フィーチャーの記述形式</h3>
            <p>
              フィーチャーは「動詞（Action）＋結果（Result）＋オブジェクト（Object）」の形式で記述します。この形式により、技術的な実装ではなくビジネス価値を中心に表現できます。
            </p>

            <div className="feature-format">
              <div className="feature-format-item">
                <div className="feature-format-label">動詞（Action）</div>
                <div className="feature-format-example">
                  登録する
                  <br />
                  表示する
                  <br />
                  計算する
                  <br />
                  送信する
                  <br />
                  更新する
                </div>
              </div>
              <div className="feature-format-item">
                <div className="feature-format-label">結果（Result）</div>
                <div className="feature-format-example">
                  注文の合計金額を
                  <br />
                  顧客のプロフィールを
                  <br />
                  在庫数を
                  <br />
                  パスワードを
                </div>
              </div>
              <div className="feature-format-item">
                <div className="feature-format-label">オブジェクト（Object）</div>
                <div className="feature-format-example">
                  注文明細に対して
                  <br />
                  特定の顧客に対して
                  <br />
                  特定の商品に対して
                  <br />
                  顧客アカウントに対して
                </div>
              </div>
            </div>

            <h3>良いフィーチャーと悪いフィーチャー</h3>
            <table>
              <thead>
                <tr>
                  <th>種別</th>
                  <th>記述例</th>
                  <th>問題点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="badge badge-green">良い例</span>
                  </td>
                  <td>メールアドレスで顧客を認証する</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-green">良い例</span>
                  </td>
                  <td>カートから注文を作成する</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-green">良い例</span>
                  </td>
                  <td>クレジットカードで支払いを処理する</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-red">悪い例</span>
                  </td>
                  <td>顧客管理</td>
                  <td>動詞がない・粒度が大きすぎる</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-red">悪い例</span>
                  </td>
                  <td>データベースにINSERTする</td>
                  <td>技術的すぎる（ビジネス価値が見えない）</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-red">悪い例</span>
                  </td>
                  <td>高速に動作する</td>
                  <td>機能ではなく非機能要件</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-red">悪い例</span>
                  </td>
                  <td>すべての注文機能を実装する</td>
                  <td>粒度が粗すぎる（2週間では完了できない）</td>
                </tr>
              </tbody>
            </table>

            <h3>フィーチャーリスト構築のプロセス</h3>
            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`flowchart TD
A["ドメインモデルから出発"] --> B["Subject Areaを特定\\nドメインの主要領域を列挙"]
B --> C["Business Activityを列挙\\n各領域でのビジネス活動"]
C --> D["フィーチャーを列挙\\n各活動に対する具体的な機能"]
D --> E["レビューと優先順位付け\\nビジネス価値・依存関係・リスクで評価"]
E --> F["フィーチャーリスト確定\\n全ステークホルダーの合意"]
style A fill:#2e0e6e,stroke:#7c35f0,color:#d8bfff
style B fill:#074440,stroke:#14a8a2,color:#96f2ee
style C fill:#074440,stroke:#14a8a2,color:#96f2ee
style D fill:#0d2818,stroke:#22c55e,color:#86efac
style E fill:#2a1e0a,stroke:#f59e0b,color:#fde68a
style F fill:#1e2535,stroke:#2e3650,color:#e8eaf0`}
                />
              </div>
              <div className="diagram-caption">
                P2の実施手順。ドメインモデルから段階的にフィーチャーを導出する
              </div>
            </div>

            <h3>フィーチャーリスト記述テンプレート</h3>
            <pre
              dangerouslySetInnerHTML={{
                __html: `<span class="kw">フィーチャーID:</span>     <span class="st">FT-003</span>
<span class="kw">フィーチャー名:</span>     <span class="st">カートから注文を作成する</span>
<span class="kw">Subject Area:</span>      注文管理
<span class="kw">Business Activity:</span> 注文処理
<span class="kw">優先度:</span>            <span class="fn">High（P1）</span>
<span class="kw">担当チーフ:</span>        山本 太郎
<span class="kw">クラスオーナー:</span>    田中（Order）, 鈴木（Customer）, 佐藤（Payment）
<span class="kw">依存フィーチャー:</span>  FT-001（商品をカートに追加する）
<span class="kw">推定工数:</span>          <span class="nu">5</span>日
<span class="kw">ステータス:</span>        <span class="fn">In Progress（設計完了 / 実装中）</span>
<span class="kw">受入基準:</span>
  - [ ] カート内の全商品が注文明細に変換される
  - [ ] 在庫不足の商品がある場合はエラーを返す
  - [ ] 注文IDが発行される
  - [ ] 注文確認メールがトリガーされる`,
              }}
            />

            <div className="callout callout-info">
              <div className="callout-label">出典</div>
              <p>
                Martin Fowler, &quot;New Methodology&quot; — FDDのフィーチャー概念の解説:{" "}
                <Ext href="https://martinfowler.com/articles/newMethodology.html">
                  https://martinfowler.com/articles/newMethodology.html
                </Ext>
              </p>
            </div>
          </section>

          {/* ========== SECTION 5 ========== */}
          <section id="s5">
            <div className="section-header">
              <span className="section-num">05</span>
              <h2>プロセス3：フィーチャーごとの計画策定</h2>
            </div>
            <p className="lead">
              フィーチャーリストを基に、開発順序・チームアサイン・マイルストーンを決定します。ビジネス価値を最優先に考え、依存関係とリスクを加味して計画を立てます。
            </p>

            <h3>計画策定のインプット・アウトプット</h3>
            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`flowchart LR
subgraph input["インプット"]
  I1["フィーチャーリスト"]
  I2["チームの規模・スキル"]
  I3["ビジネス優先度"]
  I4["技術的依存関係"]
end
subgraph work["計画策定作業"]
  W1["フィーチャーの優先順位付け"]
  W2["開発順序の決定"]
  W3["チームへの割り当て"]
  W4["マイルストーン設定"]
end
subgraph output["アウトプット"]
  O1["フィーチャーごとの\\n開発スケジュール"]
  O2["チームアサイン表"]
  O3["マイルストーン計画"]
  O4["リリース計画"]
end
input --> work --> output
style input fill:#1e2535,stroke:#2e3650
style work fill:#2e0e6e,stroke:#7c35f0
style output fill:#074440,stroke:#14a8a2`}
                />
              </div>
            </div>

            <h3>優先順位付けフレームワーク</h3>
            <p>
              フィーチャーの優先順位は「ビジネス価値」と「実装コスト」の2軸で評価します。ビジネス価値が高くコストが低いものを最優先に開発します。
            </p>

            <div className="mermaid-wrap">
              <svg
                viewBox="0 0 680 420"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", display: "block" }}
              >
                <title>優先順位付けフレームワーク</title>
                <defs>
                  <marker
                    id="arrowX"
                    markerWidth={8}
                    markerHeight={8}
                    refX={7}
                    refY={3}
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L8,3 z" fill="#5c6480" />
                  </marker>
                  <marker
                    id="arrowY"
                    markerWidth={8}
                    markerHeight={8}
                    refX={3}
                    refY={1}
                    orient="auto"
                  >
                    <path d="M0,6 L6,6 L3,0 z" fill="#5c6480" />
                  </marker>
                </defs>

                {/* Quadrant backgrounds */}
                {/* Q3: 後回し（低価値・低コスト） */}
                <rect x={80} y={200} width={240} height={180} fill="#1a1f30" rx={0} />
                {/* Q4: 即実装（低コスト・高価値） */}
                <rect x={80} y={30} width={240} height={170} fill="#0d2818" rx={0} />
                {/* Q2: 要検討（高コスト・高価値） */}
                <rect x={320} y={30} width={240} height={170} fill="#2a1e0a" rx={0} />
                {/* Q1: 後回し（高コスト・低価値） */}
                <rect x={320} y={200} width={240} height={180} fill="#1e1a1a" rx={0} />

                {/* Grid lines */}
                <line x1={80} y1={200} x2={560} y2={200} stroke="#2e3650" strokeWidth={1.5} />
                <line x1={320} y1={30} x2={320} y2={380} stroke="#2e3650" strokeWidth={1.5} />

                {/* Axes */}
                <line
                  x1={72}
                  y1={380}
                  x2={568}
                  y2={380}
                  stroke="#5c6480"
                  strokeWidth={1.5}
                  markerEnd="url(#arrowX)"
                />
                <line
                  x1={72}
                  y1={388}
                  x2={72}
                  y2={22}
                  stroke="#5c6480"
                  strokeWidth={1.5}
                  markerEnd="url(#arrowY)"
                />

                {/* Axis labels */}
                <text
                  x={320}
                  y={400}
                  fill="#5c6480"
                  fontSize={12}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  実装コスト →
                </text>
                <text
                  x={56}
                  y={205}
                  fill="#5c6480"
                  fontSize={12}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                  transform="rotate(-90,56,205)"
                >
                  ビジネス価値 →
                </text>

                {/* Axis ticks */}
                <text
                  x={196}
                  y={394}
                  fill="#5c6480"
                  fontSize={10}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  低コスト
                </text>
                <text
                  x={440}
                  y={394}
                  fill="#5c6480"
                  fontSize={10}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  高コスト
                </text>
                <text
                  x={64}
                  y={120}
                  fill="#5c6480"
                  fontSize={10}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                  transform="rotate(-90,64,120)"
                >
                  高価値
                </text>
                <text
                  x={64}
                  y={298}
                  fill="#5c6480"
                  fontSize={10}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                  transform="rotate(-90,64,298)"
                >
                  低価値
                </text>

                {/* Quadrant labels */}
                <text
                  x={200}
                  y={52}
                  fill="#86efac"
                  fontSize={13}
                  fontWeight={500}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  即実装
                </text>
                <text
                  x={200}
                  y={68}
                  fill="#22c55e"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  低コスト × 高価値
                </text>
                <rect
                  x={150}
                  y={73}
                  width={100}
                  height={18}
                  fill="#0d2818"
                  stroke="#22c55e"
                  strokeWidth={1}
                  rx={3}
                />
                <text
                  x={200}
                  y={85}
                  fill="#86efac"
                  fontSize={11}
                  fontWeight={500}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  最優先で着手
                </text>

                <text
                  x={440}
                  y={52}
                  fill="#fde68a"
                  fontSize={13}
                  fontWeight={500}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  要検討
                </text>
                <text
                  x={440}
                  y={68}
                  fill="#f59e0b"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  高コスト × 高価値
                </text>
                <rect
                  x={378}
                  y={73}
                  width={124}
                  height={18}
                  fill="#2a1e0a"
                  stroke="#f59e0b"
                  strokeWidth={1}
                  rx={3}
                />
                <text
                  x={440}
                  y={85}
                  fill="#fde68a"
                  fontSize={11}
                  fontWeight={500}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  コスト削減できれば着手
                </text>

                <text
                  x={200}
                  y={222}
                  fill="#9aa3b8"
                  fontSize={13}
                  fontWeight={500}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  後回し
                </text>
                <text
                  x={200}
                  y={238}
                  fill="#5c6480"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  低コスト × 低価値
                </text>

                <text
                  x={440}
                  y={222}
                  fill="#f28b8b"
                  fontSize={13}
                  fontWeight={500}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  最低優先度
                </text>
                <text
                  x={440}
                  y={238}
                  fill="#ef4444"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  高コスト × 低価値
                </text>

                {/* Data points */}
                <circle cx={224} cy={48} r={7} fill="#7c35f0" stroke="#bc8fff" strokeWidth={1.5} />
                <text
                  x={224}
                  y={44}
                  fill="#d8bfff"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  顧客認証
                </text>

                <circle cx={248} cy={65} r={7} fill="#7c35f0" stroke="#bc8fff" strokeWidth={1.5} />
                <text
                  x={228}
                  y={112}
                  fill="#d8bfff"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  商品検索
                </text>
                <line
                  x1={248}
                  y1={72}
                  x2={235}
                  y2={105}
                  stroke="#5c6480"
                  strokeWidth={0.5}
                  strokeDasharray="3,2"
                />

                <circle cx={416} cy={48} r={7} fill="#f59e0b" stroke="#fde68a" strokeWidth={1.5} />
                <text
                  x={416}
                  y={44}
                  fill="#fde68a"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  決済処理
                </text>

                <circle cx={320} cy={82} r={7} fill="#22c55e" stroke="#86efac" strokeWidth={1.5} />
                <text
                  x={320}
                  y={78}
                  fill="#86efac"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  注文管理
                </text>

                <circle cx={272} cy={205} r={7} fill="#5c6480" stroke="#9aa3b8" strokeWidth={1.5} />
                <text
                  x={272}
                  y={201}
                  fill="#9aa3b8"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  在庫通知
                </text>

                <circle cx={368} cy={240} r={7} fill="#f04838" stroke="#ffa494" strokeWidth={1.5} />
                <text
                  x={400}
                  y={244}
                  fill="#ffa494"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="start"
                >
                  管理画面
                </text>

                <circle cx={512} cy={205} r={7} fill="#f04838" stroke="#ffa494" strokeWidth={1.5} />
                <text
                  x={512}
                  y={201}
                  fill="#ffa494"
                  fontSize={11}
                  fontFamily="Inter,system-ui,sans-serif"
                  textAnchor="middle"
                >
                  高度な分析
                </text>
              </svg>
              <div className="diagram-caption">
                右上（高価値・高コスト）は要検討、左上（高価値・低コスト）は即実装。軸の交点が中間値
              </div>
            </div>

            <h3>計画策定のベストプラクティス</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>プラクティス</th>
                  <th>詳細</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="badge badge-purple">1</span>
                  </td>
                  <td>ビジネス価値で優先順位をつける</td>
                  <td>技術的な都合ではなく、顧客・ビジネスの価値で順序を決める</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-purple">2</span>
                  </td>
                  <td>依存関係を先にマップする</td>
                  <td>フィーチャー間の技術的依存を把握して順序を決める</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-purple">3</span>
                  </td>
                  <td>バッファを必ず組み込む</td>
                  <td>計画の80%をスケジュールし、残り20%をバッファとして確保</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-purple">4</span>
                  </td>
                  <td>チーム全員で計画を作る</td>
                  <td>チーフプログラマーが独断で決めず、全員の合意を得る</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-purple">5</span>
                  </td>
                  <td>マイルストーンを細かく設定する</td>
                  <td>月次・週次のチェックポイントを設ける</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* ========== SECTION 6 ========== */}
          <section id="s6">
            <div className="section-header">
              <span className="section-num">06</span>
              <h2>プロセス4：フィーチャーごとの設計</h2>
            </div>
            <p className="lead">
              反復フェーズの第1ステップです。フィーチャーチームがシーケンス図（Sequence
              Diagram）を作成し、どのクラスがどのメッセージをやり取りするかを設計します。設計インスペクション（レビュー）を必ず実施してから構築フェーズへ進みます。
            </p>

            <h3>設計プロセスの全体フロー</h3>
            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`flowchart TD
A["フィーチャーの選択\\n計画から次のフィーチャーを選ぶ"] --> B["フィーチャーチームの編成\\nチーフプログラマーが関係する\\nクラスオーナーを集める"]
B --> C["ドメインウォークスルー\\nフィーチャーに関連する\\nドメイン領域を再確認"]
C --> D["既存コード・ドキュメントの確認\\n参照・調査が必要な場合"]
D --> E["シーケンス図の作成\\nフィーチャーの動作フローを\\nシーケンス図で表現"]
E --> F["オブジェクトモデルの更新\\n新しいクラス・メソッド・属性を\\n全体モデルに反映"]
F --> G{"設計インスペクション\\n品質確認・改善"}
G --> |"承認"| H["構築フェーズへ"]
G --> |"要修正"| E
style A fill:#074440,stroke:#14a8a2,color:#96f2ee
style B fill:#074440,stroke:#14a8a2,color:#96f2ee
style C fill:#2e0e6e,stroke:#7c35f0,color:#d8bfff
style E fill:#0d2818,stroke:#22c55e,color:#86efac
style F fill:#0d2818,stroke:#22c55e,color:#86efac
style G fill:#2a1020,stroke:#ef4444,color:#fca5a5
style H fill:#1e2535,stroke:#2e3650,color:#e8eaf0`}
                />
              </div>
            </div>

            <h3>シーケンス図の例（注文作成フィーチャー）</h3>
            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`sequenceDiagram
participant CLIENT as クライアント
participant ORDER_CTRL as OrderController
participant ORDER_SVC as OrderService
participant CART as Cart
participant ORDER as Order
participant PAYMENT as PaymentService
participant REPO as OrderRepository
CLIENT->>ORDER_CTRL: POST /orders (cartId, customerId)
ORDER_CTRL->>ORDER_SVC: createOrderFromCart(cartId, customerId)
ORDER_SVC->>CART: getCart(cartId)
CART-->>ORDER_SVC: cartItems
ORDER_SVC->>ORDER: new Order(customerId, cartItems)
ORDER->>ORDER: validateItems()
ORDER->>ORDER: calculateTotal()
ORDER-->>ORDER_SVC: order
ORDER_SVC->>PAYMENT: initializePayment(order)
PAYMENT-->>ORDER_SVC: paymentSession
ORDER_SVC->>REPO: save(order)
REPO-->>ORDER_SVC: savedOrder
ORDER_SVC-->>ORDER_CTRL: OrderCreatedResult
ORDER_CTRL-->>CLIENT: 201 Created {orderId, paymentUrl}`}
                />
              </div>
              <div className="diagram-caption">
                「カートから注文を作成する」フィーチャーのシーケンス図
              </div>
            </div>

            <h3>設計インスペクションのチェックリスト</h3>
            <ul className="checklist">
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">スコープの適切さ：</span>
                  フィーチャーが2週間以内に完了できる粒度になっているか
                </div>
              </li>
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">シーケンス図の正確さ：</span>
                  フィーチャーの動作フローを正確に表現しているか
                </div>
              </li>
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">命名規則の遵守：</span>
                  新しいクラス・メソッドが命名規則に従っているか
                </div>
              </li>
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">既存コードとの一貫性：</span>
                  既存クラスとの整合性が保たれているか
                </div>
              </li>
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">エッジケースの考慮：</span>
                  エラー処理・例外ケースが設計に含まれているか
                </div>
              </li>
              <li>
                <IconCheck size={16} />
                <div>
                  <span className="check-title">全オーナーの理解：</span>
                  全クラスオーナーが設計を理解し同意しているか
                </div>
              </li>
            </ul>
          </section>

          {/* ========== SECTION 7 ========== */}
          <section id="s7">
            <div className="section-header">
              <span className="section-num">07</span>
              <h2>プロセス5：フィーチャーごとの構築</h2>
            </div>
            <p className="lead">
              設計インスペクションが承認されたら構築フェーズに入ります。各クラスオーナーが自分の担当クラスを実装し、コードインスペクションを経てメインブランチへ統合（プロモート）します。
            </p>

            <h3>構築プロセスの全体フロー</h3>
            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`flowchart TD
A["設計インスペクション完了"] --> B["クラスオーナーによる実装\\n各クラスオーナーが担当クラスを実装\\n単体テストも同時に作成"]
B --> C{"コードインスペクション\\nチームによるコードレビュー\\n品質・一貫性の確認"}
C --> |"問題あり"| B
C --> |"承認"| D["フィーチャーの統合\\n各クラスオーナーの実装を統合\\n統合テストの実施"]
D --> |"統合失敗"| B
D --> |"成功"| E["ビルドへのプロモーション\\nメインブランチへのマージ\\n定期ビルドへの統合"]
E --> F["フィーチャー完了\\n進捗の更新\\n次のフィーチャーへ"]
style A fill:#0d2818,stroke:#22c55e,color:#86efac
style B fill:#074440,stroke:#14a8a2,color:#96f2ee
style C fill:#2a1e0a,stroke:#f59e0b,color:#fde68a
style D fill:#2e0e6e,stroke:#7c35f0,color:#d8bfff
style E fill:#1e2535,stroke:#2e3650,color:#e8eaf0
style F fill:#0d2818,stroke:#22c55e,color:#86efac`}
                />
              </div>
            </div>

            <h3>コードインスペクションのチェックリスト</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>チェック項目</th>
                  <th>詳細</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="badge badge-teal">1</span>
                  </td>
                  <td>命名の一貫性</td>
                  <td>フィーチャーリスト・モデルと変数名・クラス名が一致しているか</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-teal">2</span>
                  </td>
                  <td>単体テストの網羅性</td>
                  <td>正常系・異常系・境界値のテストが揃っているか</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-teal">3</span>
                  </td>
                  <td>コードの可読性</td>
                  <td>コメント・ドキュメントが適切に記述されているか</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-teal">4</span>
                  </td>
                  <td>設計との一致</td>
                  <td>シーケンス図通りに実装されているか</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-teal">5</span>
                  </td>
                  <td>既存コードとの一貫性</td>
                  <td>コーディング規約・パターンが統一されているか</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge badge-teal">6</span>
                  </td>
                  <td>セキュリティ・パフォーマンス</td>
                  <td>明らかなセキュリティ問題・パフォーマンス問題がないか</td>
                </tr>
              </tbody>
            </table>

            <h3>Pythonによる実装例（Orderクラス）</h3>
            <pre
              dangerouslySetInnerHTML={{
                __html: `<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass, field
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal
<span class="kw">from</span> enum <span class="kw">import</span> Enum
<span class="kw">from</span> typing <span class="kw">import</span> List


<span class="kw">class</span> <span class="fn">OrderStatus</span>(Enum):
    PENDING = <span class="st">"pending"</span>
    CONFIRMED = <span class="st">"confirmed"</span>
    CANCELLED = <span class="st">"cancelled"</span>


@dataclass
<span class="kw">class</span> <span class="fn">OrderLine</span>:
    product_id: str
    product_name: str
    quantity: int
    unit_price: Decimal

    <span class="kw">def</span> <span class="fn">calculate_subtotal</span>(self) -&gt; Decimal:
        <span class="kw">return</span> self.unit_price * self.quantity


@dataclass
<span class="kw">class</span> <span class="fn">Order</span>:
    order_id: str
    customer_id: str
    lines: List[OrderLine] = field(default_factory=list)
    status: OrderStatus = OrderStatus.PENDING
    total_amount: Decimal = Decimal(<span class="st">"0"</span>)

    <span class="kw">def</span> <span class="fn">calculate_total</span>(self) -&gt; Decimal:
        <span class="cm">"""注文明細の合計金額を計算する（フィーチャー: 注文の合計金額を計算する）"""</span>
        self.total_amount = sum(
            line.calculate_subtotal() <span class="kw">for</span> line <span class="kw">in</span> self.lines
        )
        <span class="kw">return</span> self.total_amount

    <span class="kw">def</span> <span class="fn">confirm</span>(self) -&gt; <span class="kw">None</span>:
        <span class="cm">"""注文を確定する（フィーチャー: 注文を確定する）"""</span>
        <span class="kw">if</span> self.status != OrderStatus.PENDING:
            <span class="kw">raise</span> ValueError(f<span class="st">"Cannot confirm order in status: {self.status}"</span>)
        <span class="kw">if</span> <span class="kw">not</span> self.lines:
            <span class="kw">raise</span> ValueError(<span class="st">"Cannot confirm an order with no items"</span>)
        self.status = OrderStatus.CONFIRMED

    <span class="kw">def</span> <span class="fn">cancel</span>(self) -&gt; <span class="kw">None</span>:
        <span class="cm">"""注文をキャンセルする（フィーチャー: 注文をキャンセルする）"""</span>
        <span class="kw">if</span> self.status == OrderStatus.CONFIRMED:
            <span class="kw">raise</span> ValueError(<span class="st">"Cannot cancel a confirmed order"</span>)
        self.status = OrderStatus.CANCELLED`,
              }}
            />

            <div className="callout callout-success">
              <div className="callout-label">クラスオーナーシップのポイント</div>
              <p>
                上記の <code>Order</code>{" "}
                クラスには「クラスオーナー（担当者）」が1名割り当てられます。このオーナーは{" "}
                <code>Order</code>{" "}
                クラスに関わるすべての変更について責任を持ちます。複数のフィーチャーチームが同じクラスに触れる場合も、必ずオーナーが変更を承認・実装します。
              </p>
            </div>

            <div className="callout callout-info">
              <div className="callout-label">出典</div>
              <p>
                FDD プロセス5の詳細: Palmer, S.R., Felsing, J.M. &quot;A Practical Guide to
                Feature-Driven Development&quot; (2002), Chapter 6 — Build by Feature
              </p>
            </div>
          </section>

          {/* ========== SECTION 8 ========== */}
          <section id="s8">
            <div className="section-header">
              <span className="section-num">08</span>
              <h2>FDDのロール（役割）定義</h2>
            </div>
            <p className="lead">
              FDDは明確なロール定義を持つ手法です。各ロールの責任範囲が明確なため、大規模チームでも混乱なく開発を進められます。
            </p>

            <h3>キーロール（必須）</h3>
            <div className="role-grid">
              <div className="role-card">
                <div className="role-card-title">
                  <IconChartBar size={16} />
                  プロジェクトマネージャー
                </div>
                <p>
                  予算・スケジュール・リソースを管理する。外部ステークホルダーとの窓口となり、プロジェクト全体の健全性を監視する。
                </p>
              </div>
              <div className="role-card">
                <div className="role-card-title">
                  <IconBuilding size={16} />
                  チーフアーキテクト
                </div>
                <p>
                  システム全体の技術的な設計を統括する。技術的な方向性を決定し、チーフプログラマーが直面する設計上の問題を解決する。
                </p>
              </div>
              <div className="role-card">
                <div className="role-card-title">
                  <IconSettings size={16} />
                  開発マネージャー
                </div>
                <p>
                  日々の開発活動を管理する。チーフプログラマーのサポートを行い、チーム間の調整を担当する。小規模プロジェクトではチーフプログラマーが兼任することもある。
                </p>
              </div>
              <div className="role-card">
                <div className="role-card-title">
                  <IconCrown size={16} />
                  チーフプログラマー
                </div>
                <p>
                  フィーチャーチームをリードする技術者。フィーチャーの選択・設計の主導・インスペクションの実施・フィーチャー完了の判定を担う。FDDで最も重要なロール。
                </p>
              </div>
              <div className="role-card">
                <div className="role-card-title">
                  <IconCode size={16} />
                  クラスオーナー
                </div>
                <p>
                  担当クラスの設計・実装・テストに責任を持つ開発者。複数のフィーチャーチームに参加するが、担当クラスへの変更は自分が実装する。
                </p>
              </div>
              <div className="role-card">
                <div className="role-card-title">
                  <IconBrain size={16} />
                  ドメインエキスパート
                </div>
                <p>
                  ビジネス知識を提供するステークホルダー。P1のモデリングから継続的に開発チームに関与し、フィーチャーのビジネス的正確さを保証する。
                </p>
              </div>
            </div>

            <h3>チーフプログラマーの責務</h3>
            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`flowchart TD
CP["チーフプログラマー\\nの責務"]
CP --> A["フィーチャー管理\\nフィーチャーの選択と優先順位\\nフィーチャーチームの編成\\n進捗のトラッキング"]
CP --> B["技術リーダーシップ\\n設計の主導\\n技術的な問題解決\\nコードの品質基準設定"]
CP --> C["コミュニケーション\\nステークホルダーへの報告\\nチーム間の調整\\nドメインエキスパートとの連携"]
CP --> D["成果物管理\\nシーケンス図の作成・承認\\n設計インスペクションの実施\\nフィーチャー完了の判定"]
style CP fill:#2a1020,stroke:#f04838,color:#ffccc4
style A fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style B fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style C fill:#1e2535,stroke:#2e3650,color:#9aa3b8
style D fill:#1e2535,stroke:#2e3650,color:#9aa3b8`}
                />
              </div>
            </div>

            <h3>フィーチャーチームの構成</h3>
            <div className="mermaid-wrap">
              <div className="mermaid">
                <MermaidDiagram
                  chart={`graph TD
subgraph team["フィーチャーチーム(注文作成フィーチャー)"]
  CHIEF["チーフプログラマー\\n山本さん(技術リーダー)"]
  TANAKA["クラスオーナー: 田中さん\\nOrder クラス担当"]
  SUZUKI["クラスオーナー: 鈴木さん\\nCustomer クラス担当"]
  SATO["クラスオーナー: 佐藤さん\\nPayment クラス担当"]
end
CHIEF --> TANAKA
CHIEF --> SUZUKI
CHIEF --> SATO
style CHIEF fill:#2a1020,stroke:#f04838,color:#ffccc4
style TANAKA fill:#074440,stroke:#14a8a2,color:#96f2ee
style SUZUKI fill:#074440,stroke:#14a8a2,color:#96f2ee
style SATO fill:#074440,stroke:#14a8a2,color:#96f2ee`}
                />
              </div>
            </div>
          </section>
          <section id="s9">
            <div className="section-header">
              <span className="section-num">09</span>
              <h2>フィーチャーの記述と分解方法</h2>
            </div>
          </section>
          <section id="s10">
            <div className="section-header">
              <span className="section-num">10</span>
              <h2>進捗管理と報告</h2>
            </div>
          </section>
          <section id="s11">
            <div className="section-header">
              <span className="section-num">11</span>
              <h2>FDDと他手法との比較・組み合わせ</h2>
            </div>
          </section>
          <section id="s12">
            <div className="section-header">
              <span className="section-num">12</span>
              <h2>FDD実践：ECサイト完全事例</h2>
            </div>
          </section>
          <section id="s13">
            <div className="section-header">
              <span className="section-num">13</span>
              <h2>FDDのベストプラクティス総まとめ</h2>
            </div>
          </section>
          <section id="s14">
            <div className="section-header">
              <span className="section-num">14</span>
              <h2>FDDのアンチパターン</h2>
            </div>
          </section>
          <section id="s15">
            <div className="section-header">
              <span className="section-num">15</span>
              <h2>参考文献・ソース一覧</h2>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
