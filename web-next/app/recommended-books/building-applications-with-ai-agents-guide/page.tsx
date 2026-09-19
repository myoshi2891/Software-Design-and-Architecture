import {
  IconActivity,
  IconAlertTriangle,
  IconAntenna,
  IconBook,
  IconBook2,
  IconBrandPython,
  IconBulb,
  IconCategory2,
  IconChartLine,
  IconClipboardCheck,
  IconDatabase,
  IconGitBranch,
  IconHandClick,
  IconInfoCircle,
  IconLink,
  IconListCheck,
  IconMap2,
  IconPlug,
  IconPuzzle,
  IconRoad,
  IconServer2,
  IconShieldLock,
  IconSparkles,
  IconStack2,
  IconUsers,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import BuildingApplicationsWithAiAgentsChecklist, {
  type ChecklistItem,
} from "./BuildingApplicationsWithAiAgentsChecklist";
import BuildingApplicationsWithAiAgentsSidebar, {
  type NavGroup,
} from "./BuildingApplicationsWithAiAgentsSidebar";

export const metadata: Metadata = {
  title: "AIエージェントによるアプリケーション構築 ― 初学者のためのステップバイステップガイド",
  description:
    "Building Applications with AI Agents（O'Reilly）を土台に、Anthropic・OpenAI・Google・Simon Willison氏らの一次情報を参照しながら、AIエージェント開発を初学者向けに解説するステップバイステップガイド。",
};

const NAV_GROUPS: readonly NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "about", label: "このガイドについて", icon: "info" },
      { id: "step0", num: 0, label: "ガイドの読み方" },
    ],
  },
  {
    title: "概念編",
    items: [
      { id: "step1", num: 1, label: "エージェントとは何か" },
      { id: "step2", num: 2, label: "ワークフローとの違い" },
      { id: "step3", num: 3, label: "基本コンポーネント" },
    ],
  },
  {
    title: "設計編",
    items: [
      { id: "step4", num: 4, label: "エージェントの種類" },
      { id: "step5", num: 5, label: "ツール利用とMCP" },
      { id: "step6", num: 6, label: "知識とメモリ管理" },
      { id: "step7", num: 7, label: "マルチエージェント化" },
      { id: "step8", num: 8, label: "MCPとA2A" },
    ],
  },
  {
    title: "実装編",
    items: [{ id: "step9", num: 9, label: "フレームワーク選定" }],
  },
  {
    title: "運用編",
    items: [
      { id: "step10", num: 10, label: "検証と評価" },
      { id: "step11", num: 11, label: "モニタリングと改善" },
      { id: "step12", num: 12, label: "セキュリティ" },
      { id: "step13", num: 13, label: "人間との協働" },
    ],
  },
  {
    title: "まとめ",
    items: [{ id: "step14", num: 14, label: "学習ロードマップ" }],
  },
  {
    title: "付録",
    items: [
      { id: "glossary", label: "用語集", icon: "book" },
      { id: "references", label: "参考文献・出典", icon: "link" },
    ],
  },
];

const CHECKLIST_ITEMS: readonly ChecklistItem[] = [
  {
    id: "chk-1",
    text: "ワークフローとエージェントを適切に使い分け、必要な分だけ複雑さを足す",
  },
  {
    id: "chk-2",
    text: "ツール・メモリ・オーケストレーションという基本コンポーネントを丁寧に設計する",
  },
  {
    id: "chk-3",
    text: "MCPやA2Aのような標準プロトコルを活用し、相互運用性を確保する",
  },
  {
    id: "chk-4",
    text: "評価と監視を開発の初期段階から組み込み、改善のループを回し続ける",
  },
  {
    id: "chk-5",
    text: "Lethal TrifectaやMAESTROのような枠組みでセキュリティリスクを体系的に洗い出す",
  },
  {
    id: "chk-6",
    text: "人間の説明責任を前提に、自律性のレベルを段階的に調整する",
  },
];

const MERMAID_INIT = `%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontSize": "16px",
    "primaryColor": "#fffefa",
    "primaryBorderColor": "#4b47a3",
    "primaryTextColor": "#2b2620",
    "lineColor": "#7a7460",
    "secondaryColor": "#f1ead6",
    "tertiaryColor": "#fffefa",
    "edgeLabelBackground": "#faf6ec",
    "clusterBkg": "#fffefa",
    "clusterBorder": "#e6ddc7"
  },
  "flowchart": {
    "htmlLabels": true,
    "curve": "basis",
    "padding": 14
  }
}}%%`;

const DIAGRAM_0 = `${MERMAID_INIT}
flowchart TB
    U[ユーザーの要求] --> LLM[基盤モデル]
    LLM <--> RET[検索・Retrieval]
    LLM <--> TOOL[ツール呼び出し]
    LLM <--> MEM[メモリ]
    LLM --> OUT[応答・アクション]
    classDef hub fill:#c9c4ef,stroke:#4b47a3,stroke-width:1.5px,color:#221f52;
    class LLM hub`;

const DIAGRAM_1 = `${MERMAID_INIT}
flowchart TB
    WFT[ワークフロー 事前定義された経路] --> W1[入力] --> W2[ステップ1] --> W3[ステップ2] --> W4[出力]
    AGT[エージェント LLMが動的に制御] --> A1[目標] --> A2[LLMが次の行動を決定]
    A2 --> A3[ツール実行]
    A3 --> A2
    A2 --> A4[完了と判断したら終了]
    classDef hub fill:#c9c4ef,stroke:#4b47a3,stroke-width:1.5px,color:#221f52;
    classDef done fill:#bfe4d2,stroke:#2f6b4f,stroke-width:1.5px,color:#123722;
    class WFT,AGT hub
    class W4,A4 done`;

const DIAGRAM_2 = `${MERMAID_INIT}
flowchart TB
    Q1{タスクは単純な1回の呼び出しで済むか} -->|はい| S1[単一LLM呼び出し]
    Q1 -->|いいえ| Q2{手順を事前に固定できるか}
    Q2 -->|順番に処理する| P1[プロンプトチェイニング]
    Q2 -->|種類ごとに分岐する| P2[ルーティング]
    Q2 -->|独立して並行できる| P3[並列化]
    Q2 -->|経路が動的に変わる| Q3{中央のエージェントが作業を割り振るか}
    Q3 -->|はい| P4[オーケストレーター・ワーカー]
    Q3 -->|いいえ| Q4{反復的に品質を改善するか}
    Q4 -->|はい| P5[評価・最適化ループ]
    Q4 -->|いいえ| AG2[自律型エージェント]
    Q2 -->|経路が予測不能で長い| AG2`;

const DIAGRAM_3 = `${MERMAID_INIT}
flowchart TB
    CORE((エージェント)) --> MODEL[モデル選定]
    CORE --> TOOLS[ツール]
    CORE --> MEMORY[メモリ]
    CORE --> ORCH[オーケストレーション]
    MODEL -.精度と速度のトレードオフ.-> CORE
    TOOLS -.モジュール性.-> CORE
    MEMORY -.短期と長期.-> CORE
    ORCH -.制御フロー.-> CORE
    classDef hub fill:#c9c4ef,stroke:#4b47a3,stroke-width:1.5px,color:#221f52;
    class CORE hub`;

const DIAGRAM_4 = `${MERMAID_INIT}
flowchart LR
    START[目標を受け取る] --> THINK[思考 次の行動を推論]
    THINK --> DONE{目標達成か}
    DONE -->|いいえ| ACT[行動 ツール呼び出し]
    ACT --> OBS[観察 結果を取得]
    OBS --> THINK
    DONE -->|はい| ENDN[最終応答を返す]
    classDef done fill:#bfe4d2,stroke:#2f6b4f,stroke-width:1.5px,color:#123722;
    class ENDN done`;

const DIAGRAM_5 = `${MERMAID_INIT}
flowchart LR
    HOSTT[ホストアプリケーション] --> APP[Claude ChatGPTなど]
    APP --> CLIENT1[MCPクライアント1]
    APP --> CLIENT2[MCPクライアント2]
    CLIENT1 <--> SERVER1[MCPサーバー ファイルシステム]
    CLIENT2 <--> SERVER2[MCPサーバー データベースAPI]
    SERVER1 --> DATA1[ローカルファイル]
    SERVER2 --> DATA2[社内システム]`;

const DIAGRAM_6 = `${MERMAID_INIT}
flowchart LR
    Q[ユーザーの質問] --> EMB[埋め込みに変換]
    EMB --> SEARCH[ベクトル検索]
    VDB[ベクトルストア] --> SEARCH
    SEARCH --> TOPK[関連文書を取得]
    TOPK --> PROMPT[プロンプトに追加]
    PROMPT --> LLM2[基盤モデルが回答生成]
    LLM2 --> ANS[回答]`;

const DIAGRAM_7 = `${MERMAID_INIT}
flowchart TB
    ORCH2[オーケストレーターエージェント] --> W1B[ワーカー1 調査担当]
    ORCH2 --> W2B[ワーカー2 分析担当]
    ORCH2 --> W3B[ワーカー3 執筆担当]
    W1B --> ORCH2
    W2B --> ORCH2
    W3B --> ORCH2
    ORCH2 --> FINAL[統合された最終出力]`;

const DIAGRAM_8 = `${MERMAID_INIT}
flowchart LR
    AGENT_A[エージェントA] -- MCPでツールとデータに接続 --> TOOLS2[ツールとデータソース]
    AGENT_A -- A2Aで他エージェントに処理を委譲 --> AGENT_B[エージェントB]
    AGENT_B -- MCPでツールとデータに接続 --> TOOLS3[ツールとデータソース]`;

const DIAGRAM_9 = `${MERMAID_INIT}
flowchart TB
    DEV[開発中に評価セットを作成] --> COMP[コンポーネント評価 ツール・計画・メモリ・学習]
    COMP --> HOL[全体評価 一貫性・整合性・幻覚]
    HOL --> REAL[実環境でのテスト]
    REAL --> DEPLOY[本番デプロイの準備]
    classDef done fill:#bfe4d2,stroke:#2f6b4f,stroke-width:1.5px,color:#123722;
    class DEPLOY done`;

const DIAGRAM_10 = `${MERMAID_INIT}
flowchart LR
    PROD[本番運用] --> MON[モニタリング トレースとメトリクス収集]
    MON --> DETECT[問題の自動検出]
    DETECT --> HUMAN[人間によるレビュー]
    HUMAN --> IMPROVE[プロンプト・ツールの改善]
    IMPROVE --> EXP[ABテスト・シャドー実験]
    EXP --> PROD`;

const DIAGRAM_11 = `${MERMAID_INIT}
flowchart TB
    A3N[プライベートデータへのアクセス] --> D[危険な組み合わせ]
    B3N[信頼できないコンテンツの処理] --> D
    C3N[外部への通信手段] --> D
    D --> RISK[データ漏えいのリスク]`;

const DIAGRAM_12 = `${MERMAID_INIT}
flowchart LR
    L1[人間がすべて実行] --> L2[エージェントが提案し人間が承認]
    L2 --> L3[エージェントが実行し人間は事後確認]
    L3 --> L4[エージェントが自律的に実行]
    L4 --> L5[エージェントが完全に自律的に運用]`;

const DIAGRAM_13 = `${MERMAID_INIT}
flowchart TB
    P1[基礎 LLM APIとプロンプト設計を学ぶ] --> P2[初級 単一ツールを持つ単純なエージェントを作る]
    P2 --> P3[中級 RAGとメモリを組み込む]
    P3 --> P4[中級 フレームワークでマルチエージェント化する]
    P4 --> P5[上級 評価・監視・セキュリティを整備する]
    P5 --> P6[上級 本番運用と改善ループを回す]
    classDef hub fill:#c9c4ef,stroke:#4b47a3,stroke-width:1.5px,color:#221f52;
    classDef done fill:#bfe4d2,stroke:#2f6b4f,stroke-width:1.5px,color:#123722;
    class P1 hub
    class P6 done`;

const CODE_INVENTORY_SERVER = `<span class="kw">from</span> mcp.server <span class="kw">import</span> <span class="fn">MCPServer</span>
<span class="kw">from</span> pydantic <span class="kw">import</span> <span class="fn">BaseModel</span>, <span class="fn">Field</span>

mcp = <span class="fn">MCPServer</span>(<span class="st">"inventory"</span>)

<span class="cm"># 社内システムを模した在庫データ（実運用では DB クエリに置き換える）</span>
_STOCK: <span class="fn">dict</span>[<span class="fn">str</span>, <span class="fn">int</span>] = {<span class="st">"SKU-001"</span>: <span class="nu">12</span>, <span class="st">"SKU-002"</span>: <span class="nu">0</span>}


<span class="kw">class</span> <span class="fn">StockResult</span>(<span class="fn">BaseModel</span>):
    <span class="st">"""ツールの戻り値スキーマ。型を固定しておくとクライアント側のパースが安定する。"""</span>

    sku: <span class="fn">str</span> = <span class="fn">Field</span>(description=<span class="st">"商品コード"</span>)
    quantity: <span class="fn">int</span> = <span class="fn">Field</span>(ge=<span class="nu">0</span>, description=<span class="st">"在庫数"</span>)


@mcp.<span class="fn">tool</span>()
<span class="kw">def</span> <span class="fn">get_stock</span>(sku: <span class="fn">str</span>) -&gt; <span class="fn">StockResult</span>:
    <span class="st">"""指定した商品コードの在庫数を返す。

    未知の SKU は例外を送出する。MCP は例外を「ツール実行エラー」として
    クライアントへ返すため、エージェントはリトライや代替行動を判断できる。
    """</span>
    <span class="kw">if</span> sku <span class="kw">not in</span> _STOCK:
        <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="st">f"未知の商品コードです: {sku}"</span>)
    <span class="kw">return</span> <span class="fn">StockResult</span>(sku=sku, quantity=_STOCK[sku])


<span class="kw">if</span> __name__ == <span class="st">"__main__"</span>:
    mcp.<span class="fn">run</span>(transport=<span class="st">"stdio"</span>)`;

const CODE_AGENT_LOOP = `<span class="kw">import</span> asyncio
<span class="kw">import</span> sys
<span class="kw">from</span> pathlib <span class="kw">import</span> <span class="fn">Path</span>

<span class="kw">from</span> mcp <span class="kw">import</span> <span class="fn">ClientSession</span>, <span class="fn">StdioServerParameters</span>
<span class="kw">from</span> mcp.client.stdio <span class="kw">import</span> <span class="fn">stdio_client</span>
<span class="kw">from</span> mcp.shared.exceptions <span class="kw">import</span> <span class="fn">MCPError</span>
<span class="kw">from</span> mcp.types <span class="kw">import</span> <span class="fn">CallToolResult</span>

<span class="cm"># 終了条件その1: ツール呼び出しの上限。無限ループとコスト暴走を防ぐ最後の砦。</span>
MAX_STEPS = <span class="nu">5</span>

<span class="cm"># 終了条件その3: 1回のツール呼び出しの上限時間（秒）。応答が返らないサーバーで</span>
<span class="cm"># ループ全体が無期限にぶら下がるのを防ぐ。call_tool は float 秒を受け取る。</span>
TOOL_TIMEOUT = <span class="nu">10.0</span>

<span class="cm"># サーバースクリプトはこのファイルからの相対位置で解決する。</span>
<span class="cm"># カレントディレクトリに依存すると、別の場所から起動したときに FileNotFoundError になる。</span>
SERVER_SCRIPT = <span class="fn">Path</span>(__file__).<span class="fn">resolve</span>().parent / <span class="st">"inventory_server.py"</span>


<span class="kw">def</span> <span class="fn">summarize</span>(result: <span class="fn">CallToolResult</span>) -&gt; <span class="fn">str</span>:
    <span class="st">"""ツール実行結果を安全に文字列化する。

    成功時はツール戻り値スキーマに沿った structured_content を優先し、
    無い場合のみ TextContent のテキストへフォールバックする。
    content が空配列でも、先頭要素がテキスト以外（画像など）でも
    IndexError / AttributeError を起こさない。
    """</span>
    <span class="kw">if</span> <span class="kw">not</span> result.is_error <span class="kw">and</span> result.structured_content <span class="kw">is not</span> <span class="kw">None</span>:
        <span class="kw">return</span> <span class="fn">str</span>(result.structured_content)
    <span class="kw">for</span> block <span class="kw">in</span> result.content:
        text = <span class="fn">getattr</span>(block, <span class="st">"text"</span>, <span class="kw">None</span>)
        <span class="kw">if</span> text <span class="kw">is not</span> <span class="kw">None</span>:
            <span class="kw">return</span> text
    <span class="kw">return</span> <span class="st">"（テキストとして表示できる内容がありません）"</span>


<span class="kw">async def</span> <span class="fn">main</span>() -&gt; <span class="kw">None</span>:
    <span class="cm"># command は "python" ではなく実行中のインタプリタを指定する。PATH 上の "python" は</span>
    <span class="cm"># 仮想環境の外を指したり存在しなかったりし、依存パッケージの解決先がずれる。</span>
    params = <span class="fn">StdioServerParameters</span>(command=sys.executable, args=[<span class="fn">str</span>(SERVER_SCRIPT)])
    <span class="kw">async with</span> <span class="fn">stdio_client</span>(params) <span class="kw">as</span> (read, write):
        <span class="cm"># ClientSession 自体にも読み取り上限を設ける。ここを省くと initialize() や</span>
        <span class="cm"># list_tools() が応答の無いサーバーで無期限に待ち続け、call_tool の</span>
        <span class="cm"># タイムアウトに到達する前にハングする。</span>
        <span class="kw">async with</span> <span class="fn">ClientSession</span>(read, write, read_timeout_seconds=TOOL_TIMEOUT) <span class="kw">as</span> session:
            <span class="kw">await</span> session.<span class="fn">initialize</span>()

            <span class="cm"># サーバーが公開するツール一覧を取得する（LLM へ渡すツール定義の元になる）</span>
            tools = <span class="kw">await</span> session.<span class="fn">list_tools</span>()
            <span class="fn">print</span>(<span class="st">"利用可能なツール:"</span>, [t.name <span class="kw">for</span> t <span class="kw">in</span> tools.tools])

            <span class="cm"># 実際には次に呼ぶツールを LLM に決めさせる。ここでは決定論的に検証するため固定。</span>
            plan = [{<span class="st">"sku"</span>: <span class="st">"SKU-999"</span>}, {<span class="st">"sku"</span>: <span class="st">"SKU-001"</span>}]

            <span class="kw">for</span> step, args <span class="kw">in</span> <span class="fn">enumerate</span>(plan, start=<span class="nu">1</span>):
                <span class="kw">if</span> step &gt; MAX_STEPS:
                    <span class="fn">print</span>(<span class="st">"上限に達したため打ち切ります"</span>)
                    <span class="kw">break</span>

                <span class="kw">try</span>:
                    result = <span class="kw">await</span> session.<span class="fn">call_tool</span>(
                        <span class="st">"get_stock"</span>,
                        args,
                        <span class="cm"># 期限切れ時はサーバーへキャンセル通知が送られ MCPError になる</span>
                        read_timeout_seconds=TOOL_TIMEOUT,
                    )
                <span class="kw">except</span> <span class="fn">MCPError</span> <span class="kw">as</span> exc:
                    <span class="cm"># タイムアウトを含む呼び出し失敗も「失敗したツール結果」として観測に残す。</span>
                    <span class="cm"># ここで例外を伝播させるとループごと抜けてしまい、MAX_STEPS による</span>
                    <span class="cm"># 打ち切り判定も、残りの計画の実行も評価されなくなる。</span>
                    <span class="fn">print</span>(<span class="st">f"step{step}: ツール呼び出し失敗 -&gt; {exc}"</span>)
                    <span class="kw">continue</span>

                <span class="cm"># エラー処理: is_error のときは内容をエージェントの観測として次ターンへ渡す。</span>
                <span class="cm"># 握りつぶさず、かつ例外で全体を止めないのが実運用でのポイント。</span>
                <span class="kw">if</span> result.is_error:
                    <span class="fn">print</span>(<span class="st">f"step{step}: ツールエラー -&gt; {summarize(result)}"</span>)
                    <span class="kw">continue</span>

                <span class="fn">print</span>(<span class="st">f"step{step}: 結果 -&gt; {summarize(result)}"</span>)

                <span class="cm"># 終了条件その2: 目的を満たしたら即座に抜ける</span>
                <span class="kw">if</span> args[<span class="st">"sku"</span>] == <span class="st">"SKU-001"</span>:
                    <span class="fn">print</span>(<span class="st">"必要な情報が得られたため、ループを終了して次の推論ステップへ進みます"</span>)
                    <span class="kw">break</span>


<span class="kw">if</span> __name__ == <span class="st">"__main__"</span>:
    asyncio.<span class="fn">run</span>(<span class="fn">main</span>())`;

export default function BuildingApplicationsWithAiAgentsGuidePage() {
  return (
    <div className="building-applications-with-ai-agents-guide">
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>

      <div className="layout">
        <BuildingApplicationsWithAiAgentsSidebar groups={NAV_GROUPS} />

        <main className="main" id="main">
          <header className="hero">
            <div className="hero-kicker">
              <IconSparkles size={16} className="ti" /> AI Engineering Guide ・ 2026年9月版
            </div>
            <h1>AIエージェントによるアプリケーション構築</h1>
            <p className="hero-lead">
              初学者のためのステップバイステップガイド。O&apos;Reilly『Building Applications with AI
              Agents』の章構成を土台に、Anthropic・OpenAI・Google・Simon Willison氏・Dex
              Horthy氏・Andrej
              Karpathy氏らの一次情報を2026年9月9日時点までウェブ検索で確認しながら再構成しました。
            </p>
            <div className="hero-meta">
              <span className="chip">
                <IconListCheck size={16} className="ti" /> 全15ステップ
              </span>
              <span className="chip">
                <IconChartLine size={16} className="ti" /> Mermaid図 14点
              </span>
              <span className="chip">
                <IconBrandPython size={16} className="ti" /> 実行可能なコード例 2本
              </span>
              <span className="chip">
                <IconLink size={16} className="ti" /> 出典URL 18件
              </span>
            </div>
          </header>

          <div className="notice">
            <IconAlertTriangle size={20} className="ti" />
            <div>
              AIエージェント分野は変化が非常に速い領域です。フレームワークの評価やダウンロード数などの統計は執筆時点（2026年9月）のスナップショットであり、今後変わる可能性があります。
            </div>
          </div>

          <section className="section" id="about">
            <div className="section-kicker">
              <IconInfoCircle size={16} className="ti" /> Introduction
            </div>
            <h2>
              <IconInfoCircle size={24} className="ti" /> このガイドについて
            </h2>
            <div className="prose">
              <p>
                このガイドは、2025年9月に刊行されたMichael Albada著『Building Applications with AI
                Agents』（O&apos;Reilly
                Media）の章構成をベースに、2026年9月9日時点までの最新動向をウェブ検索で確認しながら、AIエージェント開発を初めて学ぶ人向けに再構成した解説資料です。Anthropic・OpenAI・Google・著名な独立系開発者（Simon
                Willison氏、Dex Horthy氏、Andrej
                Karpathy氏など）による一次情報を優先的に参照し、各セクションの末尾および巻末の参考文献に出典URLを明記しています。
              </p>

              <h3>
                <IconBook2 size={20} className="ti" /> 参照書籍の情報
              </h3>
              <div className="table-wrap">
                <table className="kv-table">
                  <tbody>
                    <tr>
                      <th>書名</th>
                      <td>Building Applications with AI Agents</td>
                    </tr>
                    <tr>
                      <th>著者</th>
                      <td>Michael Albada</td>
                    </tr>
                    <tr>
                      <th>出版社</th>
                      <td>O&apos;Reilly Media, Inc.</td>
                    </tr>
                    <tr>
                      <th>刊行時期</th>
                      <td>2025年9月</td>
                    </tr>
                    <tr>
                      <th>対象レベル</th>
                      <td>Beginner to intermediate</td>
                    </tr>
                    <tr>
                      <th>ページ数</th>
                      <td>354ページ</td>
                    </tr>
                    <tr>
                      <th>URL</th>
                      <td>
                        <Ext href="https://www.oreilly.com/library/view/building-applications-with/9781098176495/">
                          oreilly.com/library/view/building-applications-with/9781098176495
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section" id="step0">
            <div className="section-kicker">
              <IconMap2 size={16} className="ti" /> Step 0
            </div>
            <h2>
              <IconMap2 size={24} className="ti" /> このガイドの読み方
            </h2>
            <div className="prose">
              <p>
                AIエージェントという言葉は、2023年ごろから急速に広まりましたが、その定義は長らく曖昧なままでした。しかし2025年後半から2026年にかけて、業界のエンジニアの間で実務的に使える共通認識が形成されつつあります。このガイドは、その共通認識をベースに、次の順番で学べるように構成しています。
              </p>
              <ol>
                <li>
                  <strong>概念編（ステップ1〜3）</strong>:
                  エージェントとは何か、ワークフローとの違い、基本構成要素
                </li>
                <li>
                  <strong>設計編（ステップ4〜8）</strong>:
                  オーケストレーションパターン、ツール連携、メモリ、マルチエージェント化、エージェント間通信
                </li>
                <li>
                  <strong>実装編（ステップ9）</strong>: フレームワークの選び方
                </li>
                <li>
                  <strong>運用編（ステップ10〜13）</strong>:
                  評価、モニタリング、セキュリティ、人間との協働
                </li>
                <li>
                  <strong>まとめ（ステップ14）</strong>: 学習ロードマップ
                </li>
              </ol>
              <p>
                各ステップは独立して読めるように書いていますが、初めての方はステップ1から順番に読むことをおすすめします。図解はすべてMermaidのフローチャートで表現し、比較情報はMarkdownの表にまとめています。
              </p>
            </div>
          </section>

          <section className="section" id="step1">
            <div className="section-kicker">
              <IconBulb size={16} className="ti" /> Step 1
            </div>
            <h2>
              <IconBulb size={24} className="ti" /> AIエージェントとは何か
            </h2>
            <div className="prose">
              <h3>1-1. 定義がようやく定まりつつある</h3>
              <p>
                「エージェント」という言葉は、ベンダーやブログによって指す範囲がバラバラで、長年「生産的な会話を妨げる曖昧な用語」として批判されてきました。しかし、著名な独立系開発者であるSimon
                Willison氏は2025年9月の投稿で、業界がようやく実務的に使える定義に収束してきたと述べ、次のように定義しました。
              </p>
              <blockquote>
                「LLMエージェントとは、目標を達成するためにツールをループの中で実行するシステムである」（Simon
                Willison氏、2025年9月）
              </blockquote>
              <p>この定義のポイントは2つです。</p>
              <ul>
                <li>
                  <strong>ツールをループで実行する</strong>:
                  LLMがツール（関数呼び出し）を使い、その結果を再びLLMに読み込ませて次の行動を考えるというサイクルを繰り返します。
                </li>
                <li>
                  <strong>目標を達成するため</strong>:
                  無限ループではなく、明確な終了条件（ゴールへの到達、または失敗の判断）を持ちます。
                </li>
              </ul>
              <p>
                Anthropicも同様に、エージェント的なシステムの中核は「検索・ツール・メモリといった拡張機能を備えたLLM」であるとしています。この最小単位は次の図のように表せます。
              </p>

              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_0} />
              </div>
              <p className="diagram-caption">図1: 拡張LLM ― エージェントの最小構成単位</p>

              <h3>1-2. ビジネス用語としての「エージェント」との違い</h3>
              <p>
                Willison氏は同じ投稿で、「人間の代わりを務めるシステム」というビジネス寄りの定義には注意が必要だとも指摘しています。人間には「説明責任（accountability）」という、AIエージェントには持たせられない要素があるためです。OpenAIは自社のガイドで、エージェントを「あなたに代わって独立してタスクをこなすシステム」と説明していますが、これは主に自律性の度合いに着目した定義であり、Willison氏の「ツールをループで実行する」という技術的な定義と補完関係にあります。両方の視点を知っておくと、社内外での認識のズレを防ぎやすくなります。
              </p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Simon Willison「I think &quot;agent&quot; may finally have a widely
                  enough agreed upon definition to be useful jargon now」／Anthropic「Building
                  Effective Agents」／OpenAI「A Practical Guide to Building Agents」（
                  <a href="#ref5">参考文献5</a>・<a href="#ref2">2</a>・<a href="#ref3">3</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step2">
            <div className="section-kicker">
              <IconGitBranch size={16} className="ti" /> Step 2
            </div>
            <h2>
              <IconGitBranch size={24} className="ti" /> エージェントとワークフローの違い
            </h2>
            <div className="prose">
              <h3>2-1. Anthropicによるアーキテクチャ上の区別</h3>
              <p>
                Anthropicはエンジニアリングブログ「Building Effective
                Agents」で、AI活用システムを大きく2つに分けています。
              </p>
              <ul>
                <li>
                  <strong>ワークフロー</strong>:
                  LLMとツールが、あらかじめ決められたコードの経路に沿ってオーケストレーションされるシステム
                </li>
                <li>
                  <strong>エージェント</strong>:
                  LLM自身が自分の処理の進め方やツールの使い方を動的に決定し、制御を握るシステム
                </li>
              </ul>

              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_1} />
              </div>
              <p className="diagram-caption">
                図2: ワークフロー（事前定義された経路）とエージェント（LLMが動的に制御）の違い
              </p>

              <p>
                重要なのは、「エージェントの方が優れている」わけではないという点です。Anthropicは、タスクが予測可能で手順が決まっているならワークフローの方が信頼性・コストの面で有利であり、複雑さは必要な場合にのみ追加すべきだと強調しています。
              </p>

              <h3>2-2. 5つのワークフローパターンと選び方</h3>
              <p>Anthropicのブログでは、代表的な5つのワークフローパターンが紹介されています。</p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>パターン</th>
                      <th>概要</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>プロンプトチェイニング</td>
                      <td>
                        タスクを順番に処理する複数ステップに分解し、各ステップの出力を次の入力にする
                      </td>
                    </tr>
                    <tr>
                      <td>ルーティング</td>
                      <td>入力の種類に応じて、異なる専用プロンプト・モデルに振り分ける</td>
                    </tr>
                    <tr>
                      <td>並列化</td>
                      <td>独立したサブタスクを同時に実行し、結果を統合する</td>
                    </tr>
                    <tr>
                      <td>オーケストレーター・ワーカー</td>
                      <td>中央のLLMがタスクを動的に分解し、複数のワーカーLLMに割り振る</td>
                    </tr>
                    <tr>
                      <td>評価・最適化ループ</td>
                      <td>生成結果を別のLLMが評価し、基準を満たすまで反復改善する</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>どのパターンを選ぶべきかを整理すると、以下のような判断の流れになります。</p>
              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_2} />
              </div>
              <p className="diagram-caption">図3: ワークフローパターンの選び方（判断フロー）</p>

              <p>
                OpenAIの「A Practical Guide to Building
                Agents」も同じ方向性で、システムを分割・複雑化する目安として「条件分岐が多くプロンプトが肥大化してきた」「似たようなツールが多すぎて選択を誤る」といったシグナルを挙げています。まずは最も単純な構成から始め、これらのシグナルが出てから段階的に複雑にしていくのが、両社に共通する推奨アプローチです。
              </p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Anthropic「Building Effective Agents」／OpenAI「A Practical Guide to
                  Building Agents」（<a href="#ref2">参考文献2</a>・<a href="#ref3">3</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step3">
            <div className="section-kicker">
              <IconPuzzle size={16} className="ti" /> Step 3
            </div>
            <h2>
              <IconPuzzle size={24} className="ti" /> エージェントシステムの基本コンポーネント
            </h2>
            <div className="prose">
              <p>
                書籍『Building Applications with AI
                Agents』の第2章では、エージェントシステムを構成する4つの中核要素が整理されています。
              </p>

              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_3} />
              </div>
              <p className="diagram-caption">図4: エージェントシステムの基本コンポーネント</p>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>要素</th>
                      <th>役割</th>
                      <th>設計上の主な論点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>モデル選定</td>
                      <td>タスクの性質に応じてどの基盤モデルを使うか決める</td>
                      <td>精度、レイテンシ、コストのバランス</td>
                    </tr>
                    <tr>
                      <td>ツール</td>
                      <td>エージェントが外部の機能・データにアクセスする手段</td>
                      <td>ツールの粒度、再利用性、文書化のしやすさ</td>
                    </tr>
                    <tr>
                      <td>メモリ</td>
                      <td>過去のやり取りや知識を保持・検索する仕組み</td>
                      <td>短期記憶（コンテキストウィンドウ）と長期記憶の使い分け</td>
                    </tr>
                    <tr>
                      <td>オーケストレーション</td>
                      <td>複数のステップ・ツール・エージェントをどう連携させるか</td>
                      <td>単一エージェントか複数エージェントか</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                さらに設計時には、性能（速度と精度のトレードオフ）、スケーラビリティ、信頼性（一貫した挙動の担保）、コストという4つの軸でトレードオフを検討する必要があるとされています。これらは以降のステップで一つずつ掘り下げていきます。
              </p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Michael Albada『Building Applications with AI
                  Agents』第2章「Designing Agent Systems」（<a href="#ref1">参考文献1</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step4">
            <div className="section-kicker">
              <IconCategory2 size={16} className="ti" /> Step 4
            </div>
            <h2>
              <IconCategory2 size={24} className="ti" />{" "}
              エージェントの種類（オーケストレーションパターン）
            </h2>
            <div className="prose">
              <p>
                エージェントの「頭脳」部分、つまりどう考えてどう行動するかにもいくつかの代表的なパターンがあります。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>タイプ</th>
                      <th>概要</th>
                      <th>適した用途</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Reflex Agent</td>
                      <td>
                        ルールや直接的なマッピングに従って即座に反応する。複雑な推論を行わない
                      </td>
                      <td>単純な分類・振り分けタスク</td>
                    </tr>
                    <tr>
                      <td>ReAct Agent</td>
                      <td>「思考」と「行動」を交互に繰り返すループ構造を持つ</td>
                      <td>動的なツール利用を伴う汎用タスク</td>
                    </tr>
                    <tr>
                      <td>Planner-Executor Agent</td>
                      <td>計画を立てる役割と実行する役割を分離する</td>
                      <td>長期にわたる複雑なタスクの構造化</td>
                    </tr>
                    <tr>
                      <td>Query-Decomposition Agent</td>
                      <td>
                        複雑な問いを複数のサブクエスチョンに分解し、個別に解決してから統合する
                      </td>
                      <td>複合的な調査・分析タスク</td>
                    </tr>
                    <tr>
                      <td>Reflection Agent</td>
                      <td>自分自身の出力を振り返り、改善を重ねる</td>
                      <td>品質が重視されるコンテンツ生成</td>
                    </tr>
                    <tr>
                      <td>Deep Research Agent</td>
                      <td>大量の情報源を長時間かけて収集・統合する</td>
                      <td>調査レポートの作成</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                このうち最も基本的で広く使われているのがReActパターンです。「Reasoning（推論）」と「Acting（行動）」を組み合わせた名前の通り、次のようなループで動作します。
              </p>
              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_4} />
              </div>
              <p className="diagram-caption">図5: ReActループ ― 思考・行動・観察の反復</p>

              <h3>信頼性を高めるための12の原則</h3>
              <p>
                HumanLayer社のDex Horthy氏は、100人以上の開発者への聞き取りをもとに「12-Factor
                Agents」というGitHubリポジトリをまとめ、Heroku社の有名な「12-factor
                app」にならって、信頼性の高いLLMアプリケーションを作るための工学的な原則を提示しました。特に本ステップに関連が深いのは次の2つです。
              </p>
              <ul>
                <li>
                  <strong>制御フローを自分で持つ（Own your control flow）</strong>:
                  フレームワークに丸投げせず、分岐やループのロジックを自分のコードで管理する
                </li>
                <li>
                  <strong>小さく焦点を絞ったエージェントにする（Small, Focused Agents）</strong>:
                  1つのエージェントに詰め込みすぎず、責務を分割する
                </li>
              </ul>
              <p>
                このリポジトリはHacker
                Newsで大きな話題となり、フレームワーク批判ではなく「フレームワークに取り入れてほしい設計原則集」として位置づけられています。
              </p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Michael Albada『Building Applications with AI
                  Agents』第5章「Orchestration」／Dex Horthy・HumanLayer「12-Factor Agents」（
                  <a href="#ref1">参考文献1</a>・<a href="#ref4">4</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step5">
            <div className="section-kicker">
              <IconPlug size={16} className="ti" /> Step 5
            </div>
            <h2>
              <IconPlug size={24} className="ti" /> ツール利用とModel Context Protocol（MCP）
            </h2>
            <div className="prose">
              <h3>5-1. ツールの種類</h3>
              <p>
                エージェントが使うツールは、大きく分けるとローカルツール、API経由のツール、プラグイン形式のツール、そして状態を保持するステートフルなツールに分類できます。OpenAIのガイドでは、ツールをデータ取得用・アクション実行用・オーケストレーション用の3種類に整理しており、いずれの分類でも「ツールは文書化され、テストされ、再利用可能であるべき」という原則は共通しています。
              </p>

              <h3>5-2. Model Context Protocol（MCP）とは</h3>
              <p>
                以前は、AIモデルと外部ツール・データソースを接続するたびに、その組み合わせ専用の連携コードを書く必要がありました。これは「M個のモデル×N個のツール」の分だけ統合が必要になる、いわゆるM×N問題と呼ばれる状態です。Anthropicは2024年11月、この問題を解決するオープン標準としてModel
                Context
                Protocol（MCP）を発表しました。MCPは「AIアプリケーション向けのUSB-Cポートのようなもの」と例えられており、モデル側の実装を1つに標準化するだけで、あらゆるツール・データソースに接続できるようになります。
              </p>

              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_5} />
              </div>
              <p className="diagram-caption">
                図6: MCPのアーキテクチャ ― ホスト・クライアント・サーバー構成
              </p>

              <p>
                MCPは2026年までにOpenAIやGoogle
                DeepMind、Microsoftを含む業界標準として広く採用されました。ダウンロード規模は2025年12月9日時点で月間およそ9,700万回でしたが、2026年7月28日版の仕様公開時点ではTier
                1
                SDK（TypeScript・Python・Go・C#）合計で月間5億回近くに達しています。2025年12月には、Anthropicの一存で管理するのではなく、Linux
                Foundation傘下の「Agentic AI
                Foundation」に寄贈され、ベンダー中立なコミュニティ運営の標準となっています。
              </p>

              <h4>
                <IconServer2 size={18} className="ti" />{" "}
                最小構成のMCPサーバーとエージェントループ（実行可能な例）
              </h4>
              <p>
                上図の「MCPサーバー
                ファイルシステム／データベースAPI」に相当する最小のサーバーと、それを呼び出すエージェントループを示します。ツール呼び出し・終了条件・エラー処理という、エージェント実装の3要素がすべて含まれています。
              </p>

              <div className="code-block">
                <div className="code-block-head">
                  <IconBrandPython size={18} className="ti" /> inventory_server.py ―
                  MCPサーバー側　依存: pip install &quot;mcp[cli]&gt;=2,&lt;3&quot;
                  &quot;pydantic&gt;=2&quot;　起動: python inventory_server.py（stdio）
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_INVENTORY_SERVER }} />
              </div>

              <div className="code-block">
                <div className="code-block-head">
                  <IconBrandPython size={18} className="ti" /> agent_loop.py ―
                  エージェント（MCPクライアント）側　依存: pip install
                  &quot;mcp[cli]&gt;=2,&lt;3&quot;　実行: python agent_loop.py
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_AGENT_LOOP }} />
              </div>

              <p>
                このループが示すとおり、エージェントの制御構造は「ツール一覧の取得 → 呼び出し →
                結果の観測 → 終了判定」の繰り返しです。<code>MAX_STEPS</code> のような上限と、
                <code>is_error</code>{" "}
                を観測として扱うエラー処理を最初から組み込んでおくことが、本番運用でのコスト暴走・無限ループの防止につながります。
              </p>

              <h3>5-3. ツールを自動生成するエージェント</h3>
              <p>
                書籍では、基盤モデル自身が新しいツールをその場で作り出す「Foundation Models as Tool
                Makers」というテーマも扱われています。必要なコードをリアルタイムに生成し、それをツールとして即座に利用するというアプローチで、あらかじめ用意していないタスクへの適応力を高める手法として注目されています。
              </p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Michael Albada『Building Applications with AI Agents』第4章「Tool
                  Use」／Anthropic「Introducing the Model Context Protocol」／WorkOS「Everything
                  your team needs to know about MCP in 2026」／Model Context
                  Protocol公式ドキュメント（<a href="#ref1">参考文献1</a>・<a href="#ref7">7</a>・
                  <a href="#ref9">9</a>・<a href="#ref8">8</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step6">
            <div className="section-kicker">
              <IconDatabase size={16} className="ti" /> Step 6
            </div>
            <h2>
              <IconDatabase size={24} className="ti" /> 知識とメモリ管理
            </h2>
            <div className="prose">
              <h3>6-1. 短期記憶と長期記憶</h3>
              <p>
                エージェントのメモリは、人間の記憶と同じように短期と長期に分けて考えると理解しやすくなります。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>種類</th>
                      <th>実体</th>
                      <th>特徴</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>短期記憶</td>
                      <td>コンテキストウィンドウ</td>
                      <td>直近の会話・作業内容を保持するが、上限を超えると古い情報が失われる</td>
                    </tr>
                    <tr>
                      <td>長期記憶（検索型）</td>
                      <td>ベクトルストア</td>
                      <td>意味的な類似度で過去の情報を検索できる</td>
                    </tr>
                    <tr>
                      <td>長期記憶（構造型）</td>
                      <td>ナレッジグラフ</td>
                      <td>エンティティ同士の関係性を明示的に保持できる</td>
                    </tr>
                    <tr>
                      <td>長期記憶（要約型）</td>
                      <td>ノートテイキング</td>
                      <td>エージェント自身が重要事項を要約してメモに残す</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>6-2. RAG（検索拡張生成）の基本フロー</h3>
              <p>
                長期記憶を実現する代表的な仕組みがRAG（Retrieval-Augmented
                Generation）です。ユーザーの質問に関連する情報をベクトルストアなどから検索し、それをプロンプトに追加してからLLMに回答させます。
              </p>
              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_6} />
              </div>
              <p className="diagram-caption">図7: RAG（検索拡張生成）の基本フロー</p>

              <h3>6-3. GraphRAGと動的なナレッジグラフ</h3>
              <p>
                単純なベクトル検索では、エンティティ同士の複雑な関係性をうまく扱えない場合があります。そこで登場するのがGraphRAGで、ナレッジグラフを構築・活用することで、より構造化された知識に基づく回答を可能にします。ただし、書籍でも指摘されている通り、動的に更新されるナレッジグラフには「情報の陳腐化」や「グラフの品質管理コスト」といったリスクも伴うため、導入前にその効果とコストを見極める必要があります。
              </p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Michael Albada『Building Applications with AI
                  Agents』第6章「Knowledge and Memory」（<a href="#ref1">参考文献1</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step7">
            <div className="section-kicker">
              <IconUsers size={16} className="ti" /> Step 7
            </div>
            <h2>
              <IconUsers size={24} className="ti" /> シングルエージェントからマルチエージェントへ
            </h2>
            <div className="prose">
              <h3>7-1. いつエージェントを増やすべきか</h3>
              <p>
                エージェントを増やすかどうかは、最初から決めるものではなく、単一エージェントで詰まったときに検討するのが基本です。OpenAIのガイドは、次のようなシグナルが出たときに分割を検討すべきだとしています。
              </p>
              <ul>
                <li>
                  プロンプト内の条件分岐（if-thenの連鎖）が多すぎてテンプレートの保守が難しくなってきた
                </li>
                <li>
                  似たような機能を持つツールが多く、エージェントが正しいツールを選べなくなってきた（15個程度の明確に異なるツールを問題なく扱えるチームもあれば、10個未満でも似通ったツールで混乱するチームもある）
                </li>
              </ul>

              <h3>7-2. マルチエージェントの調整方式</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>方式</th>
                      <th>概要</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>民主的協調</td>
                      <td>エージェント同士が対等な立場で議論・合意形成する</td>
                    </tr>
                    <tr>
                      <td>マネージャー協調</td>
                      <td>管理役のエージェントがタスクを割り振り、結果を集約する</td>
                    </tr>
                    <tr>
                      <td>階層的協調</td>
                      <td>複数階層に分かれた指揮系統でタスクを分担する</td>
                    </tr>
                    <tr>
                      <td>アクター・クリティック</td>
                      <td>実行役（アクター）と評価役（クリティック）を分けて改善を繰り返す</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                実務で最も広く使われているのがマネージャー協調の一種である「オーケストレーター・ワーカー」パターンです。
              </p>
              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_7} />
              </div>
              <p className="diagram-caption">図8: オーケストレーター・ワーカーパターン</p>

              <h3>7-3. エージェント間のコミュニケーション手段</h3>
              <p>
                書籍第8章では、エージェント同士の通信手段として、ローカルなプロセス内通信から、メッセージブローカーやイベントバス、Ray・Orleans・Akkaといったアクターフレームワークまで、幅広い選択肢が紹介されています。どの方式を選ぶかは、エージェントを同一プロセス内で動かすか、分散環境で動かすかによって変わってきます。
              </p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Michael Albada『Building Applications with AI
                  Agents』第2章・第8章／OpenAI「A Practical Guide to Building Agents」（
                  <a href="#ref1">参考文献1</a>・<a href="#ref3">3</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step8">
            <div className="section-kicker">
              <IconAntenna size={16} className="ti" /> Step 8
            </div>
            <h2>
              <IconAntenna size={24} className="ti" /> エージェント間通信 ― MCPとA2A
            </h2>
            <div className="prose">
              <p>
                マルチエージェント構成が一般的になるにつれ、「エージェントとツールをどうつなぐか」だけでなく「異なるベンダー・フレームワークで作られたエージェント同士をどうつなぐか」という課題が浮上しました。これに応えるのがGoogleが2025年4月に発表したAgent2Agent（A2A）プロトコルです。A2Aは同年6月にLinux
                Foundationへ寄贈され、2026年8月27日にはMCPと同じくAgentic AI
                Foundation（AAIF）のGrowth Stageプロジェクトとして受け入れられています。
              </p>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>MCP</th>
                      <th>A2A</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>目的</td>
                      <td>エージェントとツール・データソースの接続</td>
                      <td>エージェント同士の発見・委譲・通信</td>
                    </tr>
                    <tr>
                      <td>策定元</td>
                      <td>Anthropic（2024年11月）</td>
                      <td>Google（2025年4月）</td>
                    </tr>
                    <tr>
                      <td>現在の管理団体</td>
                      <td>Agentic AI Foundation（Linux Foundation）</td>
                      <td>Agentic AI Foundation（Linux Foundation）</td>
                    </tr>
                    <tr>
                      <td>主な仕組み</td>
                      <td>ホスト・クライアント・サーバー構成、JSON-RPC 2.0</td>
                      <td>
                        Agent Cardによる能力の公開、タスクのライフサイクル管理、HTTP＋SSE＋JSON-RPC
                        2.0
                      </td>
                    </tr>
                    <tr>
                      <td>たとえ</td>
                      <td>AIアプリ向けのUSB-Cポート</td>
                      <td>組織間の業務委託のような役割分担の仕組み</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                両者は競合するものではなく、補完関係にあります。1つのエージェントがA2Aで別の専門エージェントにタスクを委譲し、そのエージェントがMCPで実際のツールやデータにアクセスする、という組み合わせが一般的です。
              </p>
              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_8} />
              </div>
              <p className="diagram-caption">図9: MCPとA2Aの役割分担</p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Google Developers Blog「Google Cloud donates A2A to Linux
                  Foundation」／A2A Protocol公式ブログ「A New Chapter for A2A: Joining the Agentic
                  AI Foundation」（<a href="#ref10">参考文献10</a>・<a href="#ref11">11</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step9">
            <div className="section-kicker">
              <IconStack2 size={16} className="ti" /> Step 9
            </div>
            <h2>
              <IconStack2 size={24} className="ti" /> 主要フレームワークの選び方
            </h2>
            <div className="prose">
              <p>
                書籍の第1章では、LangGraph、AutoGen、CrewAI、OpenAI Agents
                SDKという4つの代表的なフレームワークが紹介されています。2026年9月時点では、これにAnthropicのClaude
                Agent SDKや、GoogleのAgent Development
                Kit（ADK）を加えた選択肢が実務でよく比較されています。
              </p>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>フレームワーク</th>
                      <th>開発元</th>
                      <th>オーケストレーションモデル</th>
                      <th>学習コスト</th>
                      <th>本番運用実績</th>
                      <th>得意なこと</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>LangGraph</td>
                      <td>LangChain</td>
                      <td>有向グラフ＋条件分岐エッジ</td>
                      <td>中（グラフの概念を理解する必要）</td>
                      <td>高い（チェックポイント、タイムトラベルデバッグ、観測性が充実）</td>
                      <td>複雑な状態管理とヒューマン・イン・ザ・ループが必要な本番システム</td>
                    </tr>
                    <tr>
                      <td>CrewAI</td>
                      <td>CrewAI</td>
                      <td>役割ベースのチーム編成</td>
                      <td>低い</td>
                      <td>中（成長中だが機能は発展途上）</td>
                      <td>少ないコード量でのマルチエージェントの試作</td>
                    </tr>
                    <tr>
                      <td>AutoGen／AG2</td>
                      <td>Microsoft／コミュニティ</td>
                      <td>対話ベースの多者間会話</td>
                      <td>中</td>
                      <td>中（Microsoftはより広範なMicrosoft Agent Frameworkに軸足を移行中）</td>
                      <td>エージェント同士が議論しながらコードを書く・実行するタスク</td>
                    </tr>
                    <tr>
                      <td>OpenAI Agents SDK</td>
                      <td>OpenAI</td>
                      <td>明示的なハンドオフを伴う薄い抽象化</td>
                      <td>低い</td>
                      <td>高い（組み込みのトレーシングとガードレール）</td>
                      <td>シンプルな構成で素早く動かしたい単一〜少数エージェント</td>
                    </tr>
                    <tr>
                      <td>Claude Agent SDK</td>
                      <td>Anthropic</td>
                      <td>ツール利用パターン、MCPネイティブ対応</td>
                      <td>中</td>
                      <td>高い（安全性重視、拡張思考、ネイティブストリーミング）</td>
                      <td>コーディングエージェントなど高い信頼性が求められる用途</td>
                    </tr>
                    <tr>
                      <td>Google ADK</td>
                      <td>Google</td>
                      <td>Vertex AIエコシステムとの統合</td>
                      <td>中</td>
                      <td>発展途上（最も新しいフレームワーク）</td>
                      <td>Google Cloud環境内でのエージェント構築</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>選び方の目安</h3>
              <p>
                現場のエンジニアの声を集めた比較記事では、次のような使い分けがよく紹介されています。
              </p>
              <ul>
                <li>まずCrewAIのような軽量なフレームワークでロジックの妥当性を素早く検証する</li>
                <li>
                  本番運用に進む段階で、チェックポイントやエラーリカバリーが充実したLangGraphに移行する
                </li>
                <li>
                  OpenAI Agents SDKやClaude Agent
                  SDKのようなベンダーSDKは、特定モデルへの依存を許容できるならシンプルさのメリットが大きい
                </li>
              </ul>
              <p>
                また、AutoGenはMicrosoftの開発方針転換（より広範なMicrosoft Agent
                Frameworkへの統合）により、新規機能開発のペースが落ちているという指摘もあるため、新規プロジェクトで採用する場合は最新の開発状況を確認することをおすすめします。
              </p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Michael Albada『Building Applications with AI
                  Agents』第1章／Firecrawl「The best open source frameworks for building AI agents
                  in 2026」／Techsy「LangGraph vs CrewAI vs OpenAI Agents」（
                  <a href="#ref1">参考文献1</a>・<a href="#ref15">15</a>・<a href="#ref16">16</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step10">
            <div className="section-kicker">
              <IconClipboardCheck size={16} className="ti" /> Step 10
            </div>
            <h2>
              <IconClipboardCheck size={24} className="ti" /> 検証と評価
            </h2>
            <div className="prose">
              <h3>10-1. 評価は開発の柱</h3>
              <p>
                書籍第9章は、「測定こそがエージェント開発の要（キーストーン）である」という考え方から始まります。評価を開発の最後に付け足すのではなく、開発ライフサイクルの最初から組み込むことが推奨されています。
              </p>
              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_9} />
              </div>
              <p className="diagram-caption">図10: 評価のライフサイクル</p>

              <h3>10-2. コンポーネント評価と全体評価</h3>
              <p>評価は大きく2段階に分けられます。</p>
              <ul>
                <li>
                  <strong>コンポーネント評価</strong>:
                  ツール選択が正しいか、計画立案が妥当か、メモリの検索精度は十分か、学習（Reflectionやファインチューニング）が効果を上げているかを個別に検証する
                </li>
                <li>
                  <strong>全体評価（ホリスティック評価）</strong>:
                  エンドツーエンドのシナリオでの性能、一貫性、応答間の整合性、幻覚（ハルシネーション）の発生率、想定外の入力への対応力を検証する
                </li>
              </ul>

              <h3>10-3. ガードレールという考え方</h3>
              <p>
                OpenAIのガイドでは、評価と並んでガードレール（安全装置）の重要性が強調されています。関連性チェック、安全性分類、機微情報のフィルタリング、モデレーション、ルールベースの保護、出力バリデーションなど、複数のレイヤーを組み合わせることで、単一のチェックに依存しない防御を構築する考え方です。これはステップ12で扱うセキュリティ対策とも密接に関係します。
              </p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Michael Albada『Building Applications with AI
                  Agents』第9章「Validation and Measurement」／OpenAI「A Practical Guide to Building
                  Agents」（<a href="#ref1">参考文献1</a>・<a href="#ref3">3</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step11">
            <div className="section-kicker">
              <IconActivity size={16} className="ti" /> Step 11
            </div>
            <h2>
              <IconActivity size={24} className="ti" /> 本番運用でのモニタリングと改善ループ
            </h2>
            <div className="prose">
              <h3>11-1. モニタリングスタックの選択肢</h3>
              <p>
                書籍第10章では、代表的な観測性（オブザーバビリティ）スタックが紹介されています。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ツール</th>
                      <th>特徴</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Grafana＋OpenTelemetry＋Loki＋Tempo</td>
                      <td>OSSの汎用可観測性スタック。メトリクス・ログ・トレースを統合的に扱える</td>
                    </tr>
                    <tr>
                      <td>ELKスタック（Elasticsearch、Logstash／Fluentd、Kibana）</td>
                      <td>ログの収集・検索に強みがあり、既存の運用実績があるチーム向け</td>
                    </tr>
                    <tr>
                      <td>Arize Phoenix</td>
                      <td>LLM／エージェントに特化したOSSの観測性ツール</td>
                    </tr>
                    <tr>
                      <td>SigNoz</td>
                      <td>OpenTelemetryネイティブの統合可観測性プラットフォーム</td>
                    </tr>
                    <tr>
                      <td>Langfuse</td>
                      <td>
                        LLMアプリケーションに特化したトレース・評価・プロンプト管理プラットフォーム
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                どのスタックを選ぶかは、チームの既存の運用基盤や、LLM特有のトレース（思考過程・ツール呼び出しの履歴）をどれだけ細かく可視化したいかによって変わります。
              </p>

              <h3>11-2. モニタリングから改善へのループ</h3>
              <p>
                書籍第10章と第11章の内容をつなげると、本番運用は次のような循環的なプロセスとして捉えられます。シャドーモード（本番トラフィックを使いつつ実際のアクションは実行しない検証）やカナリアデプロイ、A/Bテスト、バンディットアルゴリズムを用いた実験などが、この改善ループを支える具体的な手法として紹介されています。
              </p>
              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_10} />
              </div>
              <p className="diagram-caption">図11: モニタリングから改善へのループ</p>

              <p>
                ユーザーからのフィードバックも、明示的な評価スコアと同じくらい重要な観測性シグナルとして扱うべきだとされています。また、入力データの分布が時間とともに変化する「ディストリビューションシフト」を検知する仕組みも、長期運用では欠かせません。
              </p>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Michael Albada『Building Applications with AI
                  Agents』第10章「Monitoring in Production」・第11章「Improvement Loops」（
                  <a href="#ref1">参考文献1</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step12">
            <div className="section-kicker">
              <IconShieldLock size={16} className="ti" /> Step 12
            </div>
            <h2>
              <IconShieldLock size={24} className="ti" /> エージェントシステムを守る ― セキュリティ
            </h2>
            <div className="prose">
              <h3>12-1. Lethal Trifecta（危険な三要素の組み合わせ）</h3>
              <p>
                セキュリティ研究者としても知られるSimon
                Willison氏は2025年6月、エージェントに関わる重大なリスクパターンを「Lethal
                Trifecta（致死的な三要素）」と名付けました。次の3つの能力が1つのエージェントに同時に揃うと、攻撃者に悪用される危険性が急激に高まるという考え方です。
              </p>
              <ul>
                <li>
                  <strong>プライベートデータへのアクセス</strong>:
                  メール、社内文書、顧客情報などを読み取れる
                </li>
                <li>
                  <strong>信頼できないコンテンツの処理</strong>:
                  外部のWebページやメール本文など、攻撃者が操作できるかもしれない情報を読み込む
                </li>
                <li>
                  <strong>外部への通信手段</strong>:
                  読み取った情報を外部に送信できる（メール送信、API呼び出しなど）
                </li>
              </ul>
              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_11} />
              </div>
              <p className="diagram-caption">図12: Lethal Trifecta ― 危険な三要素の組み合わせ</p>

              <p>
                この3つが揃うと、たとえば「Webページに埋め込まれた悪意ある指示文をエージェントが読み込み、それに従って機密情報を外部に送信してしまう」といった間接的なプロンプトインジェクション攻撃が成立してしまいます。Willison氏は、この組み合わせそのものを避けることが唯一の確実な防御策だと述べています。
              </p>

              <h3>12-2. MAESTROフレームワークによる脅威モデリング</h3>
              <p>
                書籍第12章でも触れられているように、エージェント特有のリスクには、従来のSTRIDEのようなソフトウェアセキュリティの脅威モデリング手法だけでは対応しきれない部分があります。そこでCloud
                Security
                Alliance（CSA）は2025年2月、エージェント型AI専用の脅威モデリングフレームワーク「MAESTRO（Multi-Agent
                Environment, Security, Threat, Risk, and
                Outcome）」を発表しました。MAESTROは、システムを7つのレイヤーに分解して段階的に脅威を洗い出す手法で、代表的なレイヤーの切り口は次の通りです。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>レイヤー（概要）</th>
                      <th>主な観点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>基盤モデル</td>
                      <td>モデル自体の脆弱性、抽出・操作への耐性</td>
                    </tr>
                    <tr>
                      <td>データ運用</td>
                      <td>学習・検索に使うデータの完全性と出所</td>
                    </tr>
                    <tr>
                      <td>エージェントフレームワーク</td>
                      <td>推論ループとツール呼び出しの実装の安全性</td>
                    </tr>
                    <tr>
                      <td>デプロイ・インフラ</td>
                      <td>実行環境の権限管理と分離</td>
                    </tr>
                    <tr>
                      <td>評価・観測性</td>
                      <td>異常な挙動をどう検知するか</td>
                    </tr>
                    <tr>
                      <td>セキュリティ・コンプライアンス</td>
                      <td>認可、監査ログ、規制対応</td>
                    </tr>
                    <tr>
                      <td>エージェントエコシステム</td>
                      <td>複数エージェント間の信頼関係、なりすまし対策</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>12-3. 実践的な防御策</h3>
              <p>
                書籍とここまでの出典を踏まえると、実務では次のような対策の組み合わせが有効です。
              </p>
              <ul>
                <li>
                  <strong>最小権限の原則</strong>:
                  エージェントに与えるツールの権限を必要最小限にとどめる
                </li>
                <li>
                  <strong>人間による承認</strong>:
                  リスクの高い操作（送金、外部送信、削除など）は人間の承認を経てから実行する（12-Factor
                  Agentsの「ツール呼び出しで人間に連絡する」という原則とも一致）
                </li>
                <li>
                  <strong>サンドボックス化</strong>: 実行環境を隔離し、被害範囲を限定する
                </li>
                <li>
                  <strong>継続的なレッドチーミング</strong>:
                  実際に攻撃を試みることで、想定していなかった穴を発見する
                </li>
                <li>
                  <strong>監視とロギング</strong>:
                  監査に必要な最小限のメタデータ（タイムスタンプ、実行主体、ツール名、成否、レイテンシ、リクエストID）のみを記録し、異常を検知できるようにする。プロンプト本文・ツール引数・ツール実行結果・PII・アクセストークン等の秘密情報はマスキングまたは除外する。ペイロードを保存する場合は、対象を障害調査に必要なエラー時のツール引数だけに限定し、値はハッシュ化または上位数十文字への切り詰めを行う。ログの閲覧はセキュリティ担当ロールに限定し（アクセス制御）、保存期間を定めて（例:
                  監査ログ1年、デバッグログ30日）期限到達後は自動削除する
                </li>
              </ul>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Michael Albada『Building Applications with AI
                  Agents』第12章「Protecting Agentic Systems」／Simon Willison「The lethal trifecta
                  for AI agents」／Cloud Security Alliance「Agentic AI Threat Modeling Framework:
                  MAESTRO」（<a href="#ref1">参考文献1</a>・<a href="#ref6">6</a>・
                  <a href="#ref12">12</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step13">
            <div className="section-kicker">
              <IconHandClick size={16} className="ti" /> Step 13
            </div>
            <h2>
              <IconHandClick size={24} className="ti" /> 人間とエージェントの協働
            </h2>
            <div className="prose">
              <h3>13-1. 自律性のスライダー</h3>
              <p>
                書籍第3章・第13章では、エージェントにどこまで自律性を持たせるかを、オン・オフの二択ではなく「スライダー」として捉える考え方が紹介されています。
              </p>
              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_12} />
              </div>
              <p className="diagram-caption">図13: 自律性のスライダー</p>
              <p>
                タスクのリスクの高さ、エージェントの実績、可逆性（やり直しが利くかどうか）に応じて、どのポジションから始めるかを決め、信頼が積み上がるにつれて右側（自律性が高い方向）に移していくというアプローチが実務的です。
              </p>

              <h3>13-2. 説明責任は人間に残る</h3>
              <p>
                Simon
                Willison氏は、人間には「説明責任（accountability）」という、AIエージェントに肩代わりさせられない要素があると指摘しています。エージェントが下した判断であっても、それを許可し、監督し、結果に責任を持つのは最終的に人間であるという前提は、エスカレーション設計（エージェントがどのタイミングで人間に判断を委ねるか）やガバナンス設計の基本になります。
              </p>

              <h3>13-3. エスカレーション設計のポイント</h3>
              <p>
                書籍では、信頼の構築を「ライフサイクル」として捉え、次のような観点を継続的に見直すことが推奨されています。
              </p>
              <ul>
                <li>
                  エージェントがどのような場面で自信度の低さを表明し、人間に確認を求めるべきか
                </li>
                <li>
                  失敗したときに、どのようにユーザーへ丁寧に伝え、次の一手を提示するか（グレースフルデグラデーション）
                </li>
                <li>組織内でのエージェントの担当範囲と、人間の担当範囲をどう線引きするか</li>
              </ul>

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Michael Albada『Building Applications with AI Agents』第3章「User
                  Experience Design for Agentic Systems」・第13章「Human-Agent
                  Collaboration」／Simon Willison「I think &quot;agent&quot; may finally have a
                  widely enough agreed upon definition」（<a href="#ref1">参考文献1</a>・
                  <a href="#ref5">5</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step14">
            <div className="section-kicker">
              <IconRoad size={16} className="ti" /> Step 14
            </div>
            <h2>
              <IconRoad size={24} className="ti" /> 学習ロードマップ・まとめ
            </h2>
            <div className="prose">
              <h3>14-1. 学習の進め方</h3>
              <p>
                これまでのステップを踏まえ、初学者が無理なくAIエージェント開発を習得していくための道筋は、おおよそ次のようになります。
              </p>
              <div className="mermaid-wrap">
                <MermaidDiagram chart={DIAGRAM_13} />
              </div>
              <p className="diagram-caption">図14: 学習ロードマップ</p>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>フェーズ</th>
                      <th>学ぶこと</th>
                      <th>このガイドの該当ステップ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="phase-badge phase-basic">基礎</span>
                      </td>
                      <td>LLM APIの呼び出し方、プロンプト設計の基本</td>
                      <td>ステップ1〜2</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="phase-badge phase-basic">初級</span>
                      </td>
                      <td>ツール呼び出しを1つ持つ、ReActベースの単純なエージェント</td>
                      <td>ステップ3〜4</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="phase-badge phase-mid">中級</span>
                      </td>
                      <td>MCPによるツール連携、RAGによるメモリ拡張</td>
                      <td>ステップ5〜6</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="phase-badge phase-mid">中級</span>
                      </td>
                      <td>フレームワークを使ったマルチエージェント構成</td>
                      <td>ステップ7〜9</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="phase-badge phase-adv">上級</span>
                      </td>
                      <td>評価セットの整備、観測性の導入</td>
                      <td>ステップ10〜11</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="phase-badge phase-adv">上級</span>
                      </td>
                      <td>セキュリティ対策と、人間とのすり合わせを含めた本番運用</td>
                      <td>ステップ12〜13</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>14-2. 「エージェンティック・エンジニアリング」という新しい職能</h3>
              <p>
                元OpenAI共同創業者のAndrej Karpathy氏は、2026年4月のSequoia Capital主催イベント「AI
                Ascent 2026」で、自身が2025年に提唱した「バイブコーディング（vibe
                coding、AIの出力を深く検証せずに受け入れる開発スタイル）」の先にある、より規律だったスタイルとして「エージェンティック・エンジニアリング（agentic
                engineering）」という概念を提示しました。Karpathy氏はこれを、仕様設計、差分レビュー、評価ループの構築、権限管理など、複数の自律的なエージェントを協調させながらプロフェッショナルな品質を維持する実践知だと説明しています。バイブコーディングが「誰でも試作できる」という参入障壁の低さ（床）を引き下げる一方、エージェンティック・エンジニアリングは「専門家が到達できる品質の天井」を引き上げるものだと位置づけられており、本ガイドで扱ってきた評価・監視・セキュリティ・人間との協働といったテーマは、まさにこの「天井」を支える実務スキルに当たります。
              </p>

              <h3>14-3. まとめチェックリスト</h3>
              <p>
                AIエージェント開発は、単に「賢いモデルを呼び出す」だけでは完結しません。次の6つの積み重ねが、実運用に耐えるAIエージェントアプリケーションを作り上げていきます。まずはステップ1〜5で紹介した最小構成のエージェントを自分の手で動かしてみることから始めてみてください。
              </p>

              <BuildingApplicationsWithAiAgentsChecklist items={CHECKLIST_ITEMS} />

              <div className="source-note">
                <IconLink size={18} className="ti" />
                <div>
                  <b>出典</b>: Andrej Karpathy「Sequoia Ascent 2026 summary」／Sequoia
                  Capital「Andrej Karpathy: From Vibe Coding to Agentic Engineering」（
                  <a href="#ref13">参考文献13</a>・<a href="#ref14">14</a>）
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="glossary">
            <div className="section-kicker">
              <IconBook size={16} className="ti" /> Glossary
            </div>
            <h2>
              <IconBook size={24} className="ti" /> 用語集
            </h2>
            <div className="prose">
              <div className="table-wrap">
                <table className="glossary-table">
                  <tbody>
                    <tr>
                      <td>エージェント（Agent）</td>
                      <td>目標を達成するためにツールをループの中で実行するLLMシステム</td>
                    </tr>
                    <tr>
                      <td>ワークフロー（Workflow）</td>
                      <td>LLMとツールが事前に定義された経路に沿って動くシステム</td>
                    </tr>
                    <tr>
                      <td>MCP（Model Context Protocol）</td>
                      <td>
                        AIモデルと外部ツール・データソースを標準化された方法で接続するオープンプロトコル
                      </td>
                    </tr>
                    <tr>
                      <td>A2A（Agent2Agent）</td>
                      <td>
                        異なるベンダー・フレームワークのエージェント同士が発見・通信・タスク委譲を行うためのオープンプロトコル
                      </td>
                    </tr>
                    <tr>
                      <td>RAG（Retrieval-Augmented Generation）</td>
                      <td>
                        外部の知識を検索してプロンプトに追加し、それをもとにLLMが回答を生成する手法
                      </td>
                    </tr>
                    <tr>
                      <td>ReAct</td>
                      <td>
                        「思考（Reasoning）」と「行動（Acting）」を交互に繰り返すエージェントのループ構造
                      </td>
                    </tr>
                    <tr>
                      <td>オーケストレーター・ワーカー</td>
                      <td>
                        中央のエージェントがタスクを分解し、複数のワーカーエージェントに割り振るパターン
                      </td>
                    </tr>
                    <tr>
                      <td>Lethal Trifecta</td>
                      <td>
                        プライベートデータへのアクセス、信頼できないコンテンツの処理、外部通信手段の3つが揃う危険な状態
                      </td>
                    </tr>
                    <tr>
                      <td>MAESTRO</td>
                      <td>エージェント型AI専用の7層構造の脅威モデリングフレームワーク</td>
                    </tr>
                    <tr>
                      <td>ガードレール（Guardrail）</td>
                      <td>エージェントの入出力を検証し、安全性を確保するための仕組みの総称</td>
                    </tr>
                    <tr>
                      <td>ヒューマン・イン・ザ・ループ</td>
                      <td>人間がプロセスの中でレビューや承認などの役割を担う設計方針</td>
                    </tr>
                    <tr>
                      <td>ベクトルストア</td>
                      <td>
                        テキストなどを埋め込みベクトルに変換して保存し、意味的な類似検索を可能にするデータベース
                      </td>
                    </tr>
                    <tr>
                      <td>ナレッジグラフ</td>
                      <td>エンティティ同士の関係性を明示的に表現したデータ構造</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section" id="references">
            <div className="section-kicker">
              <IconLink size={16} className="ti" /> References
            </div>
            <h2>
              <IconLink size={24} className="ti" /> 参考文献・出典
            </h2>
            <div className="prose">
              <ul className="ref-list">
                <li className="ref-card" id="ref1">
                  <span className="ref-num">1</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Michael Albada, <em>Building Applications with AI Agents</em>
                    </div>
                    <div className="ref-meta">O&apos;Reilly Media, 2025年9月</div>
                    <Ext
                      className="ref-url"
                      href="https://www.oreilly.com/library/view/building-applications-with/9781098176495/"
                    >
                      https://www.oreilly.com/library/view/building-applications-with/9781098176495/
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref2">
                  <span className="ref-num">2</span>
                  <div className="ref-body">
                    <div className="ref-title">Anthropic「Building Effective Agents」</div>
                    <Ext
                      className="ref-url"
                      href="https://www.anthropic.com/engineering/building-effective-agents"
                    >
                      https://www.anthropic.com/engineering/building-effective-agents
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref3">
                  <span className="ref-num">3</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      OpenAI「A Practical Guide to Building Agents」(PDF)
                    </div>
                    <Ext
                      className="ref-url"
                      href="https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf"
                    >
                      https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref4">
                  <span className="ref-num">4</span>
                  <div className="ref-body">
                    <div className="ref-title">Dex Horthy／HumanLayer「12-Factor Agents」</div>
                    <Ext className="ref-url" href="https://github.com/humanlayer/12-factor-agents">
                      https://github.com/humanlayer/12-factor-agents
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref5">
                  <span className="ref-num">5</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Simon Willison「I think &apos;agent&apos; may finally have a widely enough
                      agreed upon definition to be useful jargon now」
                    </div>
                    <div className="ref-meta">2025年9月18日</div>
                    <Ext className="ref-url" href="https://simonwillison.net/2025/Sep/18/agents/">
                      https://simonwillison.net/2025/Sep/18/agents/
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref6">
                  <span className="ref-num">6</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Simon Willison「The lethal trifecta for AI agents: private data, untrusted
                      content, and external communication」
                    </div>
                    <div className="ref-meta">2025年6月16日</div>
                    <Ext
                      className="ref-url"
                      href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/"
                    >
                      https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref7">
                  <span className="ref-num">7</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Anthropic「Introducing the Model Context Protocol」
                    </div>
                    <div className="ref-meta">2024年11月</div>
                    <Ext
                      className="ref-url"
                      href="https://www.anthropic.com/news/model-context-protocol"
                    >
                      https://www.anthropic.com/news/model-context-protocol
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref8">
                  <span className="ref-num">8</span>
                  <div className="ref-body">
                    <div className="ref-title">Model Context Protocol 公式ドキュメント</div>
                    <Ext
                      className="ref-url"
                      href="https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro"
                    >
                      https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref9">
                  <span className="ref-num">9</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      WorkOS「Everything your team needs to know about MCP in 2026」
                    </div>
                    <Ext
                      className="ref-url"
                      href="https://workos.com/blog/everything-your-team-needs-to-know-about-mcp-in-2026"
                    >
                      https://workos.com/blog/everything-your-team-needs-to-know-about-mcp-in-2026
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref10">
                  <span className="ref-num">10</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Google Developers Blog「Google Cloud donates A2A to Linux Foundation」
                    </div>
                    <div className="ref-meta">2025年6月23日</div>
                    <Ext
                      className="ref-url"
                      href="https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/"
                    >
                      https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref11">
                  <span className="ref-num">11</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      A2A Protocol Blog「A New Chapter for A2A: Joining the Agentic AI Foundation」
                    </div>
                    <div className="ref-meta">2026年8月27日</div>
                    <Ext
                      className="ref-url"
                      href="https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/"
                    >
                      https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref12">
                  <span className="ref-num">12</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Cloud Security Alliance（Ken Huang氏執筆）「Agentic AI Threat Modeling
                      Framework: MAESTRO」
                    </div>
                    <div className="ref-meta">2025年2月6日</div>
                    <Ext
                      className="ref-url"
                      href="https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro"
                    >
                      https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref13">
                  <span className="ref-num">13</span>
                  <div className="ref-body">
                    <div className="ref-title">Andrej Karpathy「Sequoia Ascent 2026 summary」</div>
                    <Ext
                      className="ref-url"
                      href="https://karpathy.bearblog.dev/sequoia-ascent-2026/"
                    >
                      https://karpathy.bearblog.dev/sequoia-ascent-2026/
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref14">
                  <span className="ref-num">14</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Sequoia Capital「Andrej Karpathy: From Vibe Coding to Agentic
                      Engineering」(YouTube)
                    </div>
                    <div className="ref-meta">2026年4月</div>
                    <Ext className="ref-url" href="https://www.youtube.com/watch?v=96jN2OCOfLs">
                      https://www.youtube.com/watch?v=96jN2OCOfLs
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref15">
                  <span className="ref-num">15</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Firecrawl「The best open source frameworks for building AI agents in 2026」
                    </div>
                    <Ext
                      className="ref-url"
                      href="https://www.firecrawl.dev/blog/best-open-source-agent-frameworks"
                    >
                      https://www.firecrawl.dev/blog/best-open-source-agent-frameworks
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref16">
                  <span className="ref-num">16</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Techsy「LangGraph vs CrewAI vs OpenAI Agents (Ship Test 2026)」
                    </div>
                    <Ext
                      className="ref-url"
                      href="https://techsy.io/en/blog/langgraph-vs-crewai-vs-openai-agents-sdk"
                    >
                      https://techsy.io/en/blog/langgraph-vs-crewai-vs-openai-agents-sdk
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref17">
                  <span className="ref-num">17</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Model Context Protocol Blog「The 2026-07-28 Specification」
                    </div>
                    <div className="ref-meta">2026年7月28日</div>
                    <Ext
                      className="ref-url"
                      href="https://blog.modelcontextprotocol.io/posts/2026-07-28/"
                    >
                      https://blog.modelcontextprotocol.io/posts/2026-07-28/
                    </Ext>
                  </div>
                </li>
                <li className="ref-card" id="ref18">
                  <span className="ref-num">18</span>
                  <div className="ref-body">
                    <div className="ref-title">
                      Model Context Protocol Blog「MCP joins the Agentic AI
                      Foundation」（月間約9,700万ダウンロードの出典）
                    </div>
                    <div className="ref-meta">2025年12月9日</div>
                    <Ext
                      className="ref-url"
                      href="https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/"
                    >
                      https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/
                    </Ext>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <footer className="footer">
            <p>
              AIエージェント分野は変化が速いため、フレームワークや統計情報は各出典URLで最新状況をご確認ください。
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
