import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import MultiAgentChecklist from "./MultiAgentChecklist";
import MultiAgentSidebar, { type NavH2Item } from "./MultiAgentSidebar";

export const metadata: Metadata = {
  title: "マルチエージェントシステムの設計（Designing Multi-Agent Systems）— 初学者向け実践ガイド",
  description:
    "Anthropic・OpenAI・Google・Cognition・Linux Foundation（Agentic AI Foundation）・OWASP など、著名な国際的組織・開発者の一次情報に基づき、ソフトウェア/AIエンジニアリングにおけるマルチエージェントシステム設計をステップバイステップで解説します。",
};

const NAV_ITEMS: readonly NavH2Item[] = [
  {
    id: "top",
    label: "はじめに",
    isSolo: true,
  },
  {
    id: "本ガイドについて",
    label: "本ガイドについて",
  },
  {
    id: "第0部-前提知識--llmエージェントとは何か",
    label: "第0部　前提知識 — LLMエージェントとは何か",
    subItems: [
      {
        id: "01-llmエージェントの基本ループ",
        label: "0.1 LLMエージェントの基本ループ",
      },
      {
        id: "02-単一エージェントの限界",
        label: "0.2 単一エージェントの限界",
      },
      {
        id: "03-マルチエージェントシステムとは",
        label: "0.3 マルチエージェントシステムとは",
      },
    ],
  },
  {
    id: "第1部-なぜマルチエージェントなのか--効果とコストそして反論",
    label: "第1部　なぜマルチエージェントなのか — 効果とコスト、そして反論",
    subItems: [
      {
        id: "11-anthropicの知見902の性能向上と15倍のトークンコスト",
        label: "1.1 Anthropicの知見：90.2%の性能向上と15倍のトークンコスト",
      },
      {
        id: "12-いつマルチエージェントを使うべきか",
        label: "1.2 いつマルチエージェントを使うべきか",
      },
      {
        id: "13-反論cognitionのdont-build-multi-agents",
        label: "1.3 反論：Cognitionの「Don't Build Multi-Agents」",
      },
      {
        id: "14-両者の折衷点single-writer原則",
        label: "1.4 両者の折衷点：Single-Writer原則",
      },
    ],
  },
  {
    id: "第2部-基本設計パターン9種",
    label: "第2部　基本設計パターン9種",
    subItems: [
      {
        id: "21-パイプライン逐次実行パターン",
        label: "2.1 パイプライン（逐次実行）パターン",
      },
      {
        id: "22-並列コンカレントパターン",
        label: "2.2 並列（コンカレント）パターン",
      },
      {
        id: "23-オーケストレーターワーカーパターン",
        label: "2.3 オーケストレーター・ワーカーパターン",
      },
      {
        id: "24-マネージャーagents-as-toolsパターン",
        label: "2.4 マネージャー（Agents-as-Tools）パターン",
      },
      {
        id: "25-ハンドオフ分散型パターン",
        label: "2.5 ハンドオフ（分散型）パターン",
      },
      {
        id: "26-階層型スーパーバイザーオブスーパーバイザーズパターン",
        label: "2.6 階層型（スーパーバイザー・オブ・スーパーバイザーズ）パターン",
      },
      {
        id: "27-ネットワークピアツーピアパターン",
        label: "2.7 ネットワーク（ピアツーピア）パターン",
      },
      {
        id: "28-討論投票debate--votingパターン",
        label: "2.8 討論・投票（Debate / Voting）パターン",
      },
      {
        id: "29-ブラックボードパターン",
        label: "2.9 ブラックボードパターン",
      },
      {
        id: "210-パターン選択の判断基準",
        label: "2.10 パターン選択の判断基準",
      },
    ],
  },
  {
    id: "第3部-コンテキストエンジニアリングと状態設計",
    label: "第3部　コンテキストエンジニアリングと状態設計",
    subItems: [
      {
        id: "31-コンテキストウィンドウという希少資源",
        label: "3.1 コンテキストウィンドウという希少資源",
      },
      {
        id: "32-context-rotコンテキストの劣化",
        label: "3.2 Context Rot（コンテキストの劣化）",
      },
      {
        id: "33-分離境界isolation-boundaryの設計",
        label: "3.3 分離境界（Isolation Boundary）の設計",
      },
      {
        id: "34-圧縮compactionとノートテイキング",
        label: "3.4 圧縮（Compaction）とノートテイキング",
      },
      {
        id: "35-single-writer原則再掲",
        label: "3.5 Single-Writer原則（再掲）",
      },
    ],
  },
  {
    id: "第4部-エージェント間通信プロトコル",
    label: "第4部　エージェント間通信プロトコル",
    subItems: [
      {
        id: "41-mcpmodel-context-protocol",
        label: "4.1 MCP（Model Context Protocol）",
      },
      {
        id: "42-a2aagent2agent-protocol",
        label: "4.2 A2A（Agent2Agent Protocol）",
      },
      {
        id: "43-acpとagentsmd",
        label: "4.3 ACPとAGENTS.md",
      },
      {
        id: "44-agentic-ai-foundationaaifとプロトコルの地形図",
        label: "4.4 Agentic AI Foundation（AAIF）とプロトコルの地形図",
      },
    ],
  },
  {
    id: "第5部-メモリアーキテクチャ",
    label: "第5部　メモリアーキテクチャ",
  },
  {
    id: "第6部-ツール利用と権限設計",
    label: "第6部　ツール利用と権限設計",
    subItems: [
      {
        id: "61-ツール設計原則",
        label: "6.1 ツール設計原則",
      },
      {
        id: "62-最小権限の原則",
        label: "6.2 最小権限の原則",
      },
      {
        id: "63-サンドボックス化",
        label: "6.3 サンドボックス化",
      },
    ],
  },
  {
    id: "第7部-評価とオブザーバビリティ",
    label: "第7部　評価とオブザーバビリティ",
    subItems: [
      {
        id: "71-評価駆動開発evaluation-driven-development",
        label: "7.1 評価駆動開発（Evaluation-Driven Development）",
      },
      {
        id: "72-opentelemetry-genai-semantic-conventions",
        label: "7.2 OpenTelemetry GenAI Semantic Conventions",
      },
      {
        id: "73-主要メトリクス",
        label: "7.3 主要メトリクス",
      },
    ],
  },
  {
    id: "第8部-安全性とセキュリティ設計",
    label: "第8部　安全性とセキュリティ設計",
    subItems: [
      {
        id: "81-lethal-trifecta致死の三要素",
        label: "8.1 Lethal Trifecta（致死の三要素）",
      },
      {
        id: "82-owasp-top-10-for-agentic-applications2026年版",
        label: "8.2 OWASP Top 10 for Agentic Applications（2026年版）",
      },
      {
        id: "83-過剰な自律性への対策rule-of-two",
        label: "8.3 過剰な自律性への対策：Rule of Two",
      },
      {
        id: "84-ガードレールの多層防御",
        label: "8.4 ガードレールの多層防御",
      },
      {
        id: "85-human-in-the-loop設計",
        label: "8.5 Human-in-the-Loop設計",
      },
    ],
  },
  {
    id: "第9部-実装フレームワークの選択2026年版",
    label: "第9部　実装フレームワークの選択（2026年版）",
    subItems: [
      {
        id: "91-フレームワーク比較表",
        label: "9.1 フレームワーク比較表",
      },
      {
        id: "92-フレームワーク選択の意思決定",
        label: "9.2 フレームワーク選択の意思決定",
      },
    ],
  },
  {
    id: "第10部-設計チェックリストとアンチパターン",
    label: "第10部　設計チェックリストとアンチパターン",
    subItems: [
      {
        id: "101-設計チェックリスト",
        label: "10.1 設計チェックリスト",
      },
      {
        id: "102-よくあるアンチパターン",
        label: "10.2 よくあるアンチパターン",
      },
    ],
  },
  {
    id: "第11部-2026年9月時点の最新動向",
    label: "第11部　2026年9月時点の最新動向",
  },
  {
    id: "学習ロードマップ",
    label: "学習ロードマップ",
  },
  {
    id: "用語集",
    label: "用語集",
  },
  {
    id: "参考文献",
    label: "参考文献",
  },
];

const CODE_PIPELINE = `<span class="cm"># pipeline_agents.py ― パイプライン（逐次実行）パターンの最小実装</span>
<span class="cm"># 前提: Python 3.10 以上（anthropic 1.x は Python 3.9 をサポートしない）</span>
<span class="cm"># 依存: pip install "anthropic&gt;=1.4,&lt;2"</span>
<span class="cm"># 実行: export ANTHROPIC_API_KEY=...</span>
<span class="cm">#       python pipeline_agents.py "社内向け生成AIガイドラインの整備"</span>
<span class="kw">from</span> __future__ <span class="kw">import</span> annotations

<span class="kw">import</span> os
<span class="kw">import</span> sys
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass

<span class="kw">from</span> anthropic <span class="kw">import</span> Anthropic, APIConnectionError, APIStatusError, APITimeoutError
<span class="kw">from</span> anthropic.types <span class="kw">import</span> Message

MODEL = <span class="st">"claude-opus-5"</span>


<span class="fn">@dataclass</span>(frozen=<span class="kw">True</span>)
<span class="kw">class</span> Stage:
    <span class="st">"""パイプラインの1段。前段の出力がそのまま次段の入力になる。"""</span>

    name: str
    system: str
    max_tokens: int


<span class="cm"># 図の「下調べ → 分析 → 執筆」に対応する。段を足したいときはこのタプルに追加するだけでよい。</span>
STAGES: tuple[Stage, ...] = (
    Stage(
        name=<span class="st">"下調べ"</span>,
        system=(
            <span class="st">"あなたは調査担当です。与えられたテーマについて、"</span>
            <span class="st">"検討すべき論点を5個、箇条書きで列挙してください。結論は書かないでください。"</span>
        ),
        max_tokens=<span class="nu">1024</span>,
    ),
    Stage(
        name=<span class="st">"分析"</span>,
        system=(
            <span class="st">"あなたは分析担当です。渡された論点リストを、"</span>
            <span class="st">"影響度と実現難易度の2軸で評価し、優先順位を付けてください。"</span>
        ),
        max_tokens=<span class="nu">1024</span>,
    ),
    Stage(
        name=<span class="st">"執筆"</span>,
        system=(
            <span class="st">"あなたは執筆担当です。渡された分析結果をもとに、"</span>
            <span class="st">"意思決定者向けの要約を300字程度の日本語でまとめてください。"</span>
        ),
        max_tokens=<span class="nu">1024</span>,
    ),
)


<span class="kw">def</span> extract_text(message: Message) -&gt; str:
    <span class="st">""</span>"レスポンスから text ブロックだけを連結する。

    content[<span class="nu">0</span>] を決め打ちしてはいけない。thinking が有効なモデルでは
    先頭が thinking ブロックになり、AttributeError で落ちる。
    <span class="st">""</span>"
    parts = [block.text <span class="kw">for</span> block <span class="kw">in</span> message.content <span class="kw">if</span> block.type == <span class="st">"text"</span>]
    <span class="kw">if</span> <span class="kw">not</span> parts:
        <span class="kw">raise</span> ValueError(<span class="st">"text ブロックが含まれていません"</span>)
    <span class="kw">return</span> <span class="st">"\\n"</span>.join(parts)


<span class="kw">def</span> run_stage(client: Anthropic, stage: Stage, payload: str) -&gt; str:
    <span class="st">"""1段ぶんを実行する。異常な stop_reason は握りつぶさず例外にする。"""</span>
    message = client.messages.create(
        model=MODEL,
        max_tokens=stage.max_tokens,
        system=stage.system,
        messages=[{<span class="st">"role"</span>: <span class="st">"user"</span>, <span class="st">"content"</span>: payload}],
    )
    <span class="kw">if</span> message.stop_reason == <span class="st">"max_tokens"</span>:
<span class="cm">        # 途中で切れた出力を次段へ渡すと、誤りがパイプライン全体に伝播する</span>
        <span class="kw">raise</span> RuntimeError(<span class="st">f"{stage.name}: max_tokens に達して出力が途中で切れました"</span>)
    <span class="kw">if</span> message.stop_reason != <span class="st">"end_turn"</span>:
        <span class="kw">raise</span> RuntimeError(<span class="st">f"{stage.name}: 想定外の stop_reason={message.stop_reason}"</span>)
    <span class="kw">return</span> extract_text(message)


<span class="kw">def</span> run_pipeline(client: Anthropic, topic: str) -&gt; str:
    <span class="st">"""前段の出力を次段の入力へ渡していく。これがパイプラインの本体。"""</span>
    payload = topic
    <span class="kw">for</span> stage <span class="kw">in</span> STAGES:
        payload = run_stage(client, stage, payload)
<span class="cm">        # 段の中身（payload）は標準エラーへ出さない。エージェント間で受け渡される</span>
<span class="cm">        # 中間出力は入力データの断片を含みうるため、ログ収集基盤や CI のジョブログへ</span>
<span class="cm">        # そのまま流れると機密情報の漏洩経路になる。内容ハッシュも残さない。</span>
<span class="cm">        # 短い中間出力は候補を推測して再計算すれば照合できてしまい、</span>
<span class="cm">        # 切り詰めたダイジェストであっても内容の指紋として機能するため。</span>
<span class="cm">        # ここでは追跡に必要な監査メタデータ（段名・長さ）だけを残す。</span>
        print(
            <span class="st">f"--- {stage.name} 完了 (chars={len(payload)}) ---"</span>,
            file=sys.stderr,
        )
    <span class="kw">return</span> payload


<span class="kw">def</span> main() -&gt; int:
    <span class="kw">if</span> len(sys.argv) != <span class="nu">2</span>:
        print(<span class="st">"usage: python pipeline_agents.py &lt;テーマ&gt;"</span>, file=sys.stderr)
        <span class="kw">return</span> <span class="nu">2</span>

    api_key = os.environ.get(<span class="st">"ANTHROPIC_API_KEY"</span>)
    <span class="kw">if</span> <span class="kw">not</span> api_key:
        print(<span class="st">"環境変数 ANTHROPIC_API_KEY が未設定です"</span>, file=sys.stderr)
        <span class="kw">return</span> <span class="nu">2</span>

<span class="cm">    # SDK 既定値（timeout=600秒 / max_retries=2）は用途に合わせて明示的に上書きする</span>
    client = Anthropic(api_key=api_key, timeout=<span class="nu">120</span>.<span class="nu">0</span>, max_retries=<span class="nu">2</span>)

    <span class="kw">try</span>:
        print(run_pipeline(client, sys.argv[<span class="nu">1</span>]))
    <span class="kw">except</span> APIStatusError as exc:
        print(<span class="st">f"API エラー ({exc.status_code}): {exc.message}"</span>, file=sys.stderr)
        <span class="kw">return</span> <span class="nu">1</span>
<span class="cm">    # APITimeoutError は APIConnectionError のサブクラス。先に捕捉しないと到達しない。</span>
    <span class="kw">except</span> APITimeoutError:
        print(<span class="st">f"タイムアウト（{client.timeout} 秒）。再試行後も応答がありません"</span>, file=sys.stderr)
        <span class="kw">return</span> <span class="nu">1</span>
    <span class="kw">except</span> APIConnectionError as exc:
        print(<span class="st">f"接続に失敗しました: {exc}"</span>, file=sys.stderr)
        <span class="kw">return</span> <span class="nu">1</span>
    <span class="kw">except</span> (RuntimeError, ValueError) as exc:
        print(<span class="st">f"パイプライン中断: {exc}"</span>, file=sys.stderr)
        <span class="kw">return</span> <span class="nu">1</span>
    <span class="kw">return</span> <span class="nu">0</span>


<span class="kw">if</span> __name__ == <span class="st">"__main__"</span>:
    <span class="kw">raise</span> SystemExit(main())`;

const MERMAID_1 = `flowchart TB
    A1[ユーザー入力] --> A2[LLMが状況を認識し計画を立てる]
    A2 --> A3[ツールを呼び出す]
    A3 --> A4[実行結果を観察する]
    A4 --> A5{終了条件を満たすか}
    A5 -->|いいえ| A2
    A5 -->|はい| A6[最終出力]`;

const MERMAID_2 = `flowchart LR
    Q[調査タスクの性質] --> B{幅優先探索が必要か}
    B -->|独立した複数方向を同時に調べたい| M[マルチエージェント向き]
    B -->|一本道の深掘りで足りる| S[単一エージェント向き]
    M --> Cost[トークンコスト: 約15倍]
    S --> Cost2[トークンコスト: 標準]`;

const MERMAID_3 = `flowchart LR
    Main["メイン実行エージェント（唯一の書き込み者）"]
    Adv1[アドバイザーエージェント1] -.->|助言のみ・書き込みなし| Main
    Adv2[アドバイザーエージェント2] -.->|助言のみ・書き込みなし| Main
    Adv3[アドバイザーエージェント3] -.->|助言のみ・書き込みなし| Main
    Main --> Env[実環境への書き込み・実行]`;

const MERMAID_4 = `flowchart LR
    I[入力] --> A["エージェントA（下調べ）"]
    A --> B["エージェントB（分析）"]
    B --> C["エージェントC（執筆）"]
    C --> O[出力]`;

const MERMAID_5 = `flowchart TB
    I[入力] --> A[エージェントA]
    I --> B[エージェントB]
    I --> C[エージェントC]
    A --> M[集約エージェント]
    B --> M
    C --> M
    M --> O[出力]`;

const MERMAID_6 = `flowchart TB
    U[ユーザーの調査依頼] --> L["リード研究エージェント（戦略立案・記憶管理）"]
    L --> P[調査計画をメモリに記録]
    P --> S1["サブエージェント1（独立したコンテキストウィンドウ）"]
    P --> S2["サブエージェント2（独立したコンテキストウィンドウ）"]
    P --> S3["サブエージェント3（独立したコンテキストウィンドウ）"]
    S1 --> T1[検索ツールを反復実行]
    S2 --> T2[検索ツールを反復実行]
    S3 --> T3[検索ツールを反復実行]
    T1 --> R1[要約結果を返却]
    T2 --> R2[要約結果を返却]
    T3 --> R3[要約結果を返却]
    R1 --> C[リードエージェントが統合]
    R2 --> C
    R3 --> C
    C --> Cite[引用付与エージェント]
    Cite --> O[最終レポート]`;

const MERMAID_7 = `flowchart TB
    U[ユーザー] --> Mgr[マネージャーエージェント]
    Mgr -->|ツール呼び出し| S1[専門エージェント: 検索]
    Mgr -->|ツール呼び出し| S2[専門エージェント: 計算]
    Mgr -->|ツール呼び出し| S3[専門エージェント: 執筆]
    S1 --> Mgr
    S2 --> Mgr
    S3 --> Mgr
    Mgr --> U`;

const MERMAID_8 = `flowchart LR
    U[ユーザー] --> Tri[トリアージエージェント]
    Tri -->|ハンドオフ| Sales[営業エージェント]
    Tri -->|ハンドオフ| Support[サポートエージェント]
    Tri -->|ハンドオフ| Billing[請求エージェント]
    Sales --> U
    Support --> U
    Billing --> U`;

const MERMAID_9 = `flowchart TB
    Top[トップレベル・スーパーバイザー]
    Top --> RS[リサーチ・スーパーバイザー]
    Top --> WS[執筆・スーパーバイザー]
    subgraph ResearchTeam[リサーチチーム]
        RA[リサーチエージェント]
        MA[数理エージェント]
    end
    subgraph WritingTeam[執筆チーム]
        WA[執筆エージェント]
        PA[校正エージェント]
    end
    RS --> RA
    RS --> MA
    WS --> WA
    WS --> PA`;

const MERMAID_10 = `flowchart LR
    A[エージェントA] <--> B[エージェントB]
    B <--> C[エージェントC]
    C <--> A
    A <--> D[エージェントD]
    D <--> B`;

const MERMAID_11 = `sequenceDiagram
    participant U as ユーザー
    participant P1 as 提案エージェント1
    participant P2 as 提案エージェント2
    participant J as 審判エージェント
    U->>P1: 課題を提示
    U->>P2: 課題を提示
    P1-->>J: 提案A
    P2-->>J: 提案B
    J->>P1: 反論・追加質問
    J->>P2: 反論・追加質問
    P1-->>J: 改訂案A
    P2-->>J: 改訂案B
    J-->>U: 最終判定`;

const MERMAID_12 = `flowchart TB
    BB[(共有ブラックボード)]
    A1[知識源エージェント1] --> BB
    A2[知識源エージェント2] --> BB
    A3[知識源エージェント3] --> BB
    BB --> Ctl[制御エージェント]
    Ctl --> A1
    Ctl --> A2
    Ctl --> A3
    BB --> Out[最終解]`;

const MERMAID_13 = `flowchart TB
    subgraph Shared["コンテキスト共有型（Cognitionの推奨）"]
        SL[リードエージェント] --- SW1[ワーカー1]
        SL --- SW2[ワーカー2]
        SW1 --- SW2
    end
    subgraph Isolated["コンテキスト分離型（Anthropicの研究システム）"]
        IL[リードエージェント]
        IL --> IW1["ワーカー1（独立コンテキスト）"]
        IL --> IW2["ワーカー2（独立コンテキスト）"]
    end`;

const MERMAID_14 = `flowchart LR
    Host["ホストアプリケーション（Claude / ChatGPT / IDE等）"]
    Host --> Client[MCPクライアント]
    Client -->|JSON-RPC| S1[MCPサーバー: ファイルシステム]
    Client -->|JSON-RPC| S2[MCPサーバー: データベース]
    Client -->|JSON-RPC| S3[MCPサーバー: 外部API]`;

const MERMAID_15 = `sequenceDiagram
    participant A as エージェントA
    participant B as エージェントB
    A->>B: Agent Card取得要求
    B-->>A: 能力・スキル情報を返却
    A->>B: タスクを委任
    B-->>A: タスクの進捗状態を通知
    B-->>A: 成果物を返却`;

const MERMAID_16 = `flowchart TB
    AAIF["Agentic AI Foundation（Linux Foundation傘下）"]
    AAIF --> MCP["MCP（ツール・データ接続）"]
    AAIF --> A2Aitem["A2A（エージェント間対話）"]
    AAIF --> AGENTS["AGENTS.md（コーディング規約）"]
    AAIF --> Goose["goose（Block製フレームワーク）"]
    MCP -.->|補完関係| A2Aitem
    ACP["ACP（IBM発・旧交渉プロトコル）"] -.->|A2Aへ統合済み| A2Aitem`;

const MERMAID_17 = `flowchart TB
    Agent[エージェント]
    Agent --> STM["短期記憶（会話コンテキスト）"]
    Agent --> LTM["長期記憶（ベクトルストア）"]
    Agent --> Shared["共有メモリ（チーム全体で参照）"]
    Agent --> Ckpt["チェックポイント（状態の永続化）"]`;

const MERMAID_18 = `flowchart LR
    Task[タスクの種類] --> Read[読み取り専用エージェント]
    Task --> Write[書き込み権限エージェント]
    Write --> Approve2{人間の承認が必要}
    Read --> Trifecta{"機密データ・非信頼入力・<br/>外部送信が同時に揃う?"}
    Trifecta -->|揃わない| Partial{"いずれか1つ以上に該当?"}
    Partial -->|該当しない| Exec1[即時実行]
    Partial -->|該当する| Consider[追加統制の要否を検討]
    Consider --> Exec1
    Trifecta -->|3つ揃う| Guard{"送信先制限と機密データ除外で<br/>統制しきれる?"}
    Guard -->|統制できる| Exec1
    Guard -->|統制できない| Approve2
    Approve2 -->|承認| Exec2[実行]
    Approve2 -->|却下| Stop[停止]`;

const MERMAID_19 = `flowchart LR
    Agent[マルチエージェントの実行] --> Span["OTelスパン生成（gen_ai.* / mcp.* 属性）"]
    Span --> Trace[分散トレース]
    Trace --> Eval["評価器（gen_ai.evaluation.result）"]
    Eval --> Dash[ダッシュボードで監視]
    Dash --> Fix[プロンプト・設計の改善]
    Fix --> Agent`;

const MERMAID_20 = `flowchart TB
    P[プライベートデータへのアクセス]
    U[信頼できない外部コンテンツへの露出]
    E[外部への通信手段]
    P --> Risk{3条件が同一セッションに揃うと}
    U --> Risk
    E --> Risk
    Risk --> Exfil[攻撃者によるデータ窃取が成立]

    classDef dangerFill fill:#fdecee,stroke:#d64550,color:#8a1220
    class Exfil dangerFill`;

const MERMAID_21 = `flowchart TB
    In[エージジェントへの入力] --> L1[第1層: 関連性分類器]
    L1 --> L2[第2層: ツール実行前のリスク評価]
    L2 --> L3[第3層: 出力検証・PIIフィルタ]
    L3 --> L4[第4層: 人間承認ゲート]
    L4 --> Out[実行・出力]`;

const MERMAID_22 = `flowchart TB
    Q1{既存のクラウド・技術基盤は} -->|Google Cloud中心| ADK[Google ADK]
    Q1 -->|Azure/.NET中心| MAF[Microsoft Agent Framework]
    Q1 -->|OpenAIモデル中心で低摩擦に始めたい| OAISDK[OpenAI Agents SDK]
    Q1 -->|マルチベンダー・規制業界で監査性が必要| LG[LangGraph]
    Q1 -->|役割ベースで素早くプロトタイプしたい| Crew[CrewAI]
    Q1 -->|Claudeモデルで安全性を重視| CSDK[Claude Agent SDK]`;

export default function Page() {
  return (
    <div className="designing-multi-agent-systems-guide">
      <div className="layout">
        <MultiAgentSidebar items={NAV_ITEMS} />
        <main className="main">
          <header className="hero" id="top">
            <span className="hero-eyebrow">初学者向け実践ガイド &middot; 2026年9月</span>
            <h1>
              マルチエージェントシステムの設計（Designing Multi-Agent Systems）—
              初学者向け実践ガイド
            </h1>
            <p className="hero-sub">
              Anthropic・OpenAI・Google・Cognition・Linux Foundation（Agentic AI Foundation）・OWASP
              など、著名な国際的組織・開発者の一次情報に基づき、ソフトウェア/AIエンジニアリングにおけるマルチエージェントシステム設計をステップバイステップで解説します。
            </p>
            <div className="hero-pills">
              <span className="hero-pill">
                図解 <strong>22点</strong>
              </span>
              <span className="hero-pill">
                実装コード例 <strong>1件</strong>
              </span>
              <span className="hero-pill">
                参考文献 <strong>11件</strong>
              </span>
              <span className="hero-pill">
                設計チェックリスト <strong>13項目</strong>
              </span>
            </div>
          </header>
          <article>
            <h2 id="本ガイドについて">本ガイドについて</h2>
            <p>
              <strong>
                2026年9月時点でのソフトウェア/AIエンジニアリングにおけるマルチエージェントシステム設計
              </strong>
              を、Anthropic・OpenAI・Google・Cognition・Linux Foundation（Agentic AI
              Foundation）・OWASP
              などの一次情報に基づいて初学者向けに再構成しました。参考にした情報源のURLはすべて末尾の参考文献に明記しています。
            </p>
            <hr />

            <h2 id="第0部-前提知識--llmエージェントとは何か">
              第0部　前提知識 — LLMエージェントとは何か
            </h2>
            <h3 id="01-llmエージェントの基本ループ">0.1 LLMエージェントの基本ループ</h3>
            <p>
              マルチエージェントシステムを理解する前に、まず「エージェントが1つだけの場合」の動作を押さえておきましょう。Anthropicは、マルチエージェントシステムを「複数のエージェント（＝ツールをループの中で自律的に使うLLM）が協調して動くシステム」と定義しています。単一のエージェントは、次のような「認識→計画→実行→観察」のループを、終了条件（最終出力ツールの呼び出し、規定ターン数への到達、エラーなど）に達するまで繰り返します。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_1} />
            <p>
              OpenAIが公開した「A practical guide to building
              agents」でも、この「ループ（run）」こそが単一エージェント・マルチエージェントの両方に共通する中核概念だと説明されています。ツールを段階的に増やしていくだけで単一エージェントは多くのタスクをこなせるため、
              <strong>まず単一エージェントで行けるところまで行く</strong>のが定石です。
            </p>
            <h3 id="02-単一エージェントの限界">0.2 単一エージェントの限界</h3>
            <p>単一エージェントには次のような限界があります。</p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <th>限界</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd">
                    <td>コンテキストウィンドウの上限</td>
                    <td>
                      大規模な調査や長時間タスクでは、必要な情報がコンテキスト長を超えてしまう
                    </td>
                  </tr>
                  <tr className="even">
                    <td>逐次処理のボトルネック</td>
                    <td>独立した複数の方向性を同時に探索できず、幅優先の探索ができない</td>
                  </tr>
                  <tr className="odd">
                    <td>Context Rot（後述）</td>
                    <td>
                      入力トークン数が増えるほど、モデルの回答品質が非一様に劣化する現象がChromaの研究で確認されている
                    </td>
                  </tr>
                  <tr className="even">
                    <td>専門性の分散困難</td>
                    <td>
                      1つのプロンプト・1つのツールセットに、性質の異なる複数の専門知識を詰め込みにくい
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 id="03-マルチエージェントシステムとは">0.3 マルチエージェントシステムとは</h3>
            <p>
              マルチエージェントシステム（MAS）は、複数のLLMエージェントが役割・コンテキスト・ツールを分担しながら、1つの目的に向かって協調するシステムです。Anthropicのエンジニアリングチームは、人類が「個人としての知能」ではなく「集団としての協調」によって文明を進歩させてきたことになぞらえ、「知能がある閾値に達すると、マルチエージェントシステムは性能をスケールさせるための重要な手段になる」と述べています。
            </p>
            <hr />
            <h2 id="第1部-なぜマルチエージェントなのか--効果とコストそして反論">
              第1部　なぜマルチエージェントなのか — 効果とコスト、そして反論
            </h2>
            <h3 id="11-anthropicの知見902の性能向上と15倍のトークンコスト">
              1.1 Anthropicの知見：90.2%の性能向上と15倍のトークンコスト
            </h3>
            <p>
              Anthropicは自社のResearch機能を、リードエージェントが計画を立て複数のサブエージェントを並列に生成する「オーケストレーター・ワーカー（orchestrator-worker）」パターンで構築しました。内部評価では、Claude
              Opus 4をリードエージェントに、Claude Sonnet
              4をサブエージェントに使ったマルチエージェント構成が、単一のClaude Opus 4に対して
              <strong>リサーチタスクで90.2%の性能向上</strong>
              を示しました。この改善の80%はトークン使用量の差で説明でき、並列に独立したコンテキストウィンドウを使えることが単一エージェントでは実現できないスケーリングを可能にしています。
            </p>
            <p>
              一方で、マルチエージェントシステムは
              <strong>通常のチャットに比べて約15倍のトークンを消費</strong>
              します。したがって「成果の価値がコストを上回るタスク」に絞って採用すべきだというのがAnthropicの結論です。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_2} />
            <h3 id="12-いつマルチエージェントを使うべきか">
              1.2 いつマルチエージェントを使うべきか
            </h3>
            <p>
              Anthropicの知見をもとに整理すると、マルチエージェントが向くのは次のようなケースです。
            </p>
            <ul>
              <li>幅優先探索（breadth-first）が有効な、独立した複数の調査方向がある問題</li>
              <li>1つのコンテキストウィンドウに収まらない量の情報を扱う必要がある問題</li>
              <li>専門性の異なる複数の役割（検索・検証・執筆など）に明確に分解できる問題</li>
              <li>読み取り専用（read-only）で、誤りのコストが比較的低いタスク</li>
            </ul>
            <h3 id="13-反論cognitionのdont-build-multi-agents">
              1.3 反論：Cognitionの「Don't Build Multi-Agents」
            </h3>
            <p>
              Anthropicのブログ公開からわずか1日後、Devin/Windsurfを開発するCognition社のWalden
              Yan氏（共同創業者・CPO）は「Don't Build
              Multi-Agents（マルチエージェントを作るな）」という反対の主張を公開し、大きな論争を呼びました。Cognitionが提示する原則は次の2つです。
            </p>
            <ol type="1">
              <li>
                <strong>
                  コンテキストを共有せよ、しかも個々のメッセージだけでなくエージェントの行動履歴全体を共有せよ
                </strong>
              </li>
              <li>
                <strong>意思決定を、対立が起こりうる形で分割してはならない</strong>
              </li>
            </ol>
            <p>
              Yan氏の主張は、複数のサブエージェントが断片化したコンテキストの中でそれぞれ意思決定をすると、決定同士が矛盾し脆いシステムになるというものです。彼が推奨するのは、可能な限り
              <strong>
                単一スレッド（single-threaded）で連続したコンテキストを持つエージェント
              </strong>
              であり、コンテキストウィンドウが溢れるほどの長時間タスクに限り、行動履歴を要約・圧縮する専用のモデルを導入する設計です。
            </p>
            <h3 id="14-両者の折衷点single-writer原則">1.4 両者の折衷点：Single-Writer原則</h3>
            <p>
              2026年4月、Yan氏はフォローアップ記事「Multi-Agents: What's Actually
              Working」で主張を精緻化しました。そこでの結論は「
              <strong>
                書き込み（実際に環境へ作用する操作）はシングルスレッドに保ち、追加のエージェントは行動ではなく知性を提供する
              </strong>
              （=助言・レビュー・調査に徹する）ときに、マルチエージェントは最もうまく機能する」というものです。並列に「書き込み」を行うエージェント群（parallel-writer
              swarm）は依然として避けるべきだが、単一の実行者を複数のアドバイザーエージェントが支える構成は有効、という折衷案です。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_3} />
            <p>
              興味深いことに、Cognition自身も同じ記事の中で「Anthropicが翌日に類似の課題認識に基づくマルチエージェント研究システムの記事を発表しており、両者は読み取り専用エージェントという適用領域の第一歩について似た結論に達していた」と振り返っています。つまり対立は見た目ほど大きくなく、**「読み取り中心・探索中心のタスクでは並列マルチエージェントが有効、書き込み・実行が絡むタスクではシングルライターを守る」**という設計指針に収束しつつあります。
            </p>
            <hr />
            <h2 id="第2部-基本設計パターン9種">第2部　基本設計パターン9種</h2>
            <p>
              ここからは、実務でよく使われる9つのオーケストレーションパターンを解説します。OpenAIの実務ガイドは、マルチエージェント設計を大きく「集中管理型（manager）」と「分散型（decentralized）」の2つに分類しており、以下のパターンもこの軸に沿って整理できます。
            </p>
            <h3 id="21-パイプライン逐次実行パターン">2.1 パイプライン（逐次実行）パターン</h3>
            <p>
              最も単純な形。各エージェントが順番にタスクを処理し、前段の出力が次段の入力になります。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_4} />
            <ul>
              <li>
                <strong>向いている場面</strong>
                ：処理の順序が明確で、各段階が独立したスキルを要する場合（例：調査→分析→レポート作成）
              </li>
              <li>
                <strong>弱点</strong>
                ：前段のエラーがそのまま後段に伝播する。並列化の恩恵が得られない
              </li>
            </ul>
            <h4 id="実装例3段パイプラインを動かす">実装例：3段パイプラインを動かす</h4>
            <p>
              上図の「下調べ → 分析 → 執筆」をそのままコードにしたものです。<code>Stage</code>{" "}
              に「役割（システムプロンプト）」だけを持たせ、前段の出力を次段の入力へ渡していく点がパイプラインの本質で、段の増減はタプルへの追加・削除だけで済みます。
            </p>
            <p>
              このコードには、上で挙げた<strong>弱点への対策</strong>も入れてあります。
              <code>stop_reason</code> が <code>end_turn</code> 以外（特に <code>max_tokens</code>{" "}
              による途中打ち切り）のときに例外を投げているのは、
              <strong>壊れた出力を次段へ渡さない</strong>
              ためです。パイプラインでは前段のエラーが後段へ伝播するため、段の境界が唯一の検査ポイントになります。
            </p>
            <p>
              またレスポンス本文を取り出す <code>extract_text</code> は <code>content[0].text</code>{" "}
              と決め打ちしていません。思考（thinking）が有効なモデルではレスポンスの先頭が{" "}
              <code>thinking</code> ブロックになるため、<code>type</code> で絞り込む必要があります。
            </p>
            <pre className="code-block" dangerouslySetInnerHTML={{ __html: CODE_PIPELINE }} />
            <p>
              段ごとの中間出力そのものをログへ出すと、パイプラインが扱った入力データが標準エラー経由でログ基盤へ蓄積されます。既定では段名・文字数・内容ハッシュといった監査メタデータのみを記録し、本文をそのまま出力するデバッグは明示的なデバッグフラグ（環境変数や{" "}
              <code>--debug</code>{" "}
              オプション）でのみ有効化してください。その際も、機密項目のマスキング・出力先へのアクセス制御・保持期間の上限をセットで用意することが前提です。
            </p>
            <h3 id="22-並列コンカレントパターン">2.2 並列（コンカレント）パターン</h3>
            <p>同じ入力に対して複数のエージェントが独立に処理し、結果を集約します。</p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_5} />
            <ul>
              <li>
                <strong>向いている場面</strong>
                ：異なる視点・異なるツールで同じ問題に多角的にアプローチしたい場合（例：複数の投資アナリストの意見を集約する）
              </li>
              <li>
                <strong>弱点</strong>
                ：集約ロジックが複雑になりやすく、結果の矛盾をどう解決するかの設計が必要
              </li>
            </ul>
            <h3 id="23-オーケストレーターワーカーパターン">
              2.3 オーケストレーター・ワーカーパターン
            </h3>
            <p>
              中央のオーケストレーター（リードエージェント）が計画を立て、複数のワーカー（サブエージェント）に独立したタスクを委任し、結果を統合します。Anthropicの研究システムがこの代表例です。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_6} />
            <ul>
              <li>
                <strong>設計上の要点</strong>
                ：ワーカーは互いに直接会話しない。すべての意思決定はオーケストレーターに集約される（トポロジーが制約される＝挙動を予測しやすい）
              </li>
              <li>
                <strong>委任の質が命</strong>
                ：各サブエージェントには「目的」「出力フォーマット」「使うべきツールと情報源」「タスクの境界」を明確に与えないと、作業の重複や漏れが生じるとAnthropicは報告しています
              </li>
            </ul>
            <h3 id="24-マネージャーagents-as-toolsパターン">
              2.4 マネージャー（Agents-as-Tools）パターン
            </h3>
            <p>
              OpenAIの実務ガイドが紹介するもう1つの集中管理型パターン。オーケストレーター・ワーカーと似ていますが、専門エージェントを「ツール」として呼び出す形式で実装される点が特徴です。会話の主導権は常に中央のマネージャーが保持し続けます。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_7} />
            <h3 id="25-ハンドオフ分散型パターン">2.5 ハンドオフ（分散型）パターン</h3>
            <p>
              エージェント間で会話の主導権そのものを受け渡す「分散型」パターン。カスタマーサポートのトリアージのように、最初に応対したエージェントが適切な専門エージェントへ会話を完全に引き継ぐ場合に向いています。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_8} />
            <p>
              OpenAIのAgents
              SDKドキュメントは、マネージャー型を「エッジがツール呼び出しを表す」構成、ハンドオフ型を「エッジがエージェント間の主導権移譲を表す」構成として、両者をグラフとしてモデル化できると説明しています。
            </p>
            <h3 id="26-階層型スーパーバイザーオブスーパーバイザーズパターン">
              2.6 階層型（スーパーバイザー・オブ・スーパーバイザーズ）パターン
            </h3>
            <p>
              LangGraphの <code>langgraph-supervisor</code>{" "}
              ライブラリが提唱する構成で、スーパーバイザーが別のスーパーバイザー（チームリーダー）を管理し、そのチームリーダーがさらに個別のワーカーを管理する多層構造です。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_9} />
            <ul>
              <li>
                <strong>向いている場面</strong>
                ：組織図のようにチームが階層化されており、各チーム内でのみ密な連携が必要な大規模タスク
              </li>
              <li>
                <strong>弱点</strong>：階層が深くなるほどレイテンシとトークンコストが積み上がる
              </li>
            </ul>
            <h3 id="27-ネットワークピアツーピアパターン">
              2.7 ネットワーク（ピアツーピア）パターン
            </h3>
            <p>
              中央のオーケストレーターを置かず、エージェント同士が対等な立場で直接対話し、状態を共有する構成です。柔軟性は高い一方、全体の挙動を追跡・検証するのが難しくなります。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_10} />
            <h3 id="28-討論投票debate--votingパターン">
              2.8 討論・投票（Debate / Voting）パターン
            </h3>
            <p>
              複数のエージェントに独立して案を出させ、審判役のエージェント（または多数決）が最終判断を下す構成です。単一の視点によるバイアスを緩和したい場合に有効です。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_11} />
            <h3 id="29-ブラックボードパターン">2.9 ブラックボードパターン</h3>
            <p>
              古典的なAIアーキテクチャの1つ。複数の「知識源エージェント」が共有の掲示板（ブラックボード）に情報を書き込み、制御エージェントがそれを見て次にどの知識源を動かすかを決定します。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_12} />
            <h3 id="210-パターン選択の判断基準">2.10 パターン選択の判断基準</h3>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <th>パターン</th>
                    <th>向いている用途</th>
                    <th>主な利点</th>
                    <th>主な弱点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd">
                    <td>パイプライン</td>
                    <td>順序が明確な多段処理</td>
                    <td>実装が単純・デバッグしやすい</td>
                    <td>並列化不可、前段の誤りが伝播</td>
                  </tr>
                  <tr className="even">
                    <td>並列</td>
                    <td>多角的な分析・意見集約</td>
                    <td>幅優先の探索、レイテンシ短縮</td>
                    <td>集約ロジックの複雑さ</td>
                  </tr>
                  <tr className="odd">
                    <td>オーケストレーター・ワーカー</td>
                    <td>大規模な調査・探索タスク</td>
                    <td>挙動が予測しやすい、独立コンテキストで並列性を確保</td>
                    <td>トークンコストが高い（約15倍）</td>
                  </tr>
                  <tr className="even">
                    <td>マネージャー（Agents-as-Tools）</td>
                    <td>専門知識の呼び出し</td>
                    <td>主導権が中央に残り制御しやすい</td>
                    <td>マネージャーがボトルネックになりうる</td>
                  </tr>
                  <tr className="odd">
                    <td>ハンドオフ（分散型）</td>
                    <td>カスタマーサポート等のトリアージ</td>
                    <td>専門エージェントへの完全な引き継ぎが自然</td>
                    <td>引き継ぎ後の一貫性維持が課題</td>
                  </tr>
                  <tr className="even">
                    <td>階層型</td>
                    <td>組織的な大規模タスク</td>
                    <td>チームごとに関心を分離できる</td>
                    <td>階層が深いほどコスト増</td>
                  </tr>
                  <tr className="odd">
                    <td>ネットワーク</td>
                    <td>高い柔軟性が必要な探索的タスク</td>
                    <td>制約が少なく創発的な協調が可能</td>
                    <td>挙動の予測・デバッグが困難</td>
                  </tr>
                  <tr className="even">
                    <td>討論・投票</td>
                    <td>バイアス低減、意思決定の質向上</td>
                    <td>多様な視点を統合できる</td>
                    <td>ラウンド数に比例してコスト増</td>
                  </tr>
                  <tr className="odd">
                    <td>ブラックボード</td>
                    <td>異種の専門知識を段階的に統合</td>
                    <td>知識源の追加・差し替えが容易</td>
                    <td>制御ロジックの設計が難しい</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <h2 id="第3部-コンテキストエンジニアリングと状態設計">
              第3部　コンテキストエンジニアリングと状態設計
            </h2>
            <h3 id="31-コンテキストウィンドウという希少資源">
              3.1 コンテキストウィンドウという希少資源
            </h3>
            <p>
              Anthropicは自社の実務記事「Effective context engineering for AI
              agents」の中で、コンテキストウィンドウを「有限で希少な資源」と表現しています。マルチエージェント設計における多くの意思決定は、突き詰めると「どの情報を、どのエージェントの、どの時点のコンテキストに入れるか」という配分問題に帰着します。
            </p>
            <h3 id="32-context-rotコンテキストの劣化">3.2 Context Rot（コンテキストの劣化）</h3>
            <p>
              ベクトルデータベース企業Chromaの研究「Context Rot: How Increasing Input Tokens Impacts
              LLM Performance」は、GPT-4.1・Claude 4・Gemini
              2.5・Qwen3など18の最新モデルを対象に、入力トークン数を増やすと（たとえタスクの難易度を一定に保っても）モデルの性能が一様ではなく劣化していくことを実証しました。この現象は「Context
              Rot」と呼ばれています。同研究が実験として直接報告しているのは、次のような
              <strong>観測された性能劣化</strong>です。
            </p>
            <ol type="1">
              <li>
                <strong>入力トークン数そのものの影響</strong>
                ：探索すべき情報量やタスク難易度を一定に保っても、入力を長くするだけで正答率が下がる
              </li>
              <li>
                <strong>ディストラクターの影響</strong>
                ：探している内容と意味的に似ているが無関係な文を混ぜると精度が落ち、その度合いは入力が長いほど大きくなる
              </li>
              <li>
                <strong>文書構造の影響</strong>
                ：論理的に連続した文書よりも、文をシャッフルした非連続な文書のほうが成績が良いという、直感に反する結果が出るモデルがある
              </li>
            </ol>
            <p>
              これらが<strong>なぜ</strong>
              起きるのかは、同研究が確定させたものではありません。注意が先頭と末尾に偏る「Lost-in-the-middle効果」（Liuらの別研究による指摘）や、入力長に対して二次的に増える注意計算のなかで関連性の低いトークン対が支配的になる「注意の希釈」といった説明は、現時点では
              <strong>仮説であり今後の検証課題</strong>
              として扱うのが妥当です。設計上重要なのは機序の断定ではなく、「長い入力は、難易度が同じでも性能を落としうる」という観測結果のほうです。
            </p>
            <p>
              「コンテキストウィンドウが大きい＝たくさん詰め込んでよい」という発想はこの研究によって否定されており、マルチエージェント設計で各エージェントのコンテキストを意図的に分離・圧縮することの技術的な裏付けになっています。
            </p>
            <h3 id="33-分離境界isolation-boundaryの設計">
              3.3 分離境界（Isolation Boundary）の設計
            </h3>
            <p>
              Anthropicが指摘する、マルチエージェント設計における最重要の意思決定が「各サブエージェントは、他のエージェントの状況についてどこまで知る必要があるか」という
              <strong>分離境界</strong>
              の設計です。リサーチのようなタスクでは「ほぼ何も知らなくてよい」という割り切りが機能する一方、Cognitionが主張するように、コーディングのような一貫性が問われるタスクでは、行動履歴全体を共有したほうがうまくいきます。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_13} />
            <h3 id="34-圧縮compactionとノートテイキング">
              3.4 圧縮（Compaction）とノートテイキング
            </h3>
            <p>長時間タスクでコンテキストが溢れる場合、Anthropicは主に3つの手法を挙げています。</p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <th>手法</th>
                    <th>概要</th>
                    <th>向いている場面</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd">
                    <td>圧縮（Compaction）</td>
                    <td>会話履歴を要約し、重要な決定・イベントのみを残して古い詳細を削る</td>
                    <td>長い対話の流れを維持したいタスク</td>
                  </tr>
                  <tr className="even">
                    <td>ノートテイキング</td>
                    <td>エージェントが外部メモリ（ファイル等）に節目ごとのメモを書き出す</td>
                    <td>マイルストーンが明確な反復的な開発作業</td>
                  </tr>
                  <tr className="odd">
                    <td>マルチエージェント化</td>
                    <td>探索を複数の独立したコンテキストに分割する</td>
                    <td>並列探索が有効な複雑な調査・分析タスク</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 id="35-single-writer原則再掲">3.5 Single-Writer原則（再掲）</h3>
            <p>
              第1部で紹介した「書き込みは常に単一の実行者に集約する」という原則は、コンテキスト設計の観点からも理にかなっています。複数の書き込み者が同じ状態を非同期に更新すると、各エージェントが古いコンテキストに基づいて矛盾した判断を下すリスクが高まるためです。
            </p>
            <hr />
            <h2 id="第4部-エージェント間通信プロトコル">第4部　エージェント間通信プロトコル</h2>
            <p>
              2025年から2026年にかけて、エージェント間の相互運用性を支える複数のオープンプロトコルが整備され、標準化団体の傘下に統合される動きが進みました。
            </p>
            <h3 id="41-mcpmodel-context-protocol">4.1 MCP（Model Context Protocol）</h3>
            <p>
              Anthropicが2024年11月にオープンソース化した、AIアプリケーションを外部のデータやツールに接続するための標準プロトコルです。1年でMCPは月間9,700万件のSDKダウンロード、1万件超の稼働中サーバーを抱える業界標準に成長し、ChatGPT・Claude・Cursor・Gemini・Microsoft
              Copilot・VS Codeなど主要なAI製品に採用されました。2025年12月9日、AnthropicはMCPをLinux
              Foundation傘下の新設団体「Agentic AI
              Foundation（AAIF）」へ寄贈し、ベンダー中立なガバナンスのもとで運営される体制に移行しました。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_14} />
            <h3 id="42-a2aagent2agent-protocol">4.2 A2A（Agent2Agent Protocol）</h3>
            <p>
              Googleが2025年4月に発表した、異なるベンダー・フレームワークで作られたエージェント同士が発見し合い、対話し、タスクを委任し合うためのオープンプロトコルです。同年6月にはLinux
              Foundationへ寄贈され、Amazon・Cisco・Microsoft・Salesforce・SAP・ServiceNowなど100社以上が支持する標準に成長しました。2026年8月時点でA2Aは150組織以上の支持を得て、サプライチェーン・金融・保険・IT運用など複数業界で本番運用に入っています。同月、A2AはLinux
              Foundationの広い傘下からAAIF（Agentic AI
              Foundation）へと管轄を移し、MCPと並ぶ「エージェント間対話の標準層」として位置づけられています。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_15} />
            <p>
              MCPとA2Aはしばしば対立するものと誤解されますが、実際には<strong>補完関係</strong>
              にあります。MCPは「エージェントがツールやデータにどう接続するか」を、A2Aは「エージェント同士がどう対話し役割分担するか」を扱う、レイヤーの異なる標準です。
            </p>
            <h3 id="43-acpとagentsmd">4.3 ACPとAGENTS.md</h3>
            <ul>
              <li>
                <strong>ACP（Agent Communication Protocol）</strong>：IBM
                Researchが開発した、FIPA-ACLの系譜を引く交渉指向のプロトコルで、propose/accept/reject/counterのような型付きの発話行為（performative）によるマルチターン対話を形式化していました。
                <strong>ACPはA2Aへ統合済み</strong>
                であり、独立したプロトコルとして選定する対象ではありません。旧ACP資料や既存実装を参照する場合は、交渉的対話の概念モデル（提案・受諾・拒否・カウンタ）は設計の参考として活かしつつ、実装面はA2A（Agent
                Cardによる能力公開、タスク委任、進捗状態の通知）へ読み替えます。
              </li>
              <li>
                <strong>AGENTS.md</strong>
                ：OpenAIが2025年8月に公開した、コーディングエージェント向けにリポジトリ固有の指示（ビルド手順やコーディング規約）を伝えるためのシンプルなMarkdown規約です。Linux
                Foundationのプレスリリース（2025年12月9日時点）によれば、6万件を超えるオープンソースプロジェクトおよびエージェントフレームワーク（Amp・Codex・Cursor・Devin・Factory・Gemini
                CLI・GitHub Copilot・Jules・VS
                Codeなど）に採用されています（母集団は「AGENTS.mdを採用した公開プロジェクト・フレームワーク」。出典は末尾参考文献のAAIF設立プレスリリース）。
              </li>
            </ul>
            <h3 id="44-agentic-ai-foundationaaifとプロトコルの地形図">
              4.4 Agentic AI Foundation（AAIF）とプロトコルの地形図
            </h3>
            <p>
              2025年12月9日、Linux Foundationは「Agentic AI
              Foundation（AAIF）」の設立を発表しました。Anthropic・Block・OpenAIが共同で設立し、Google・Microsoft・AWS・Cloudflare・Bloombergが支援するディレクテッドファンドです。設立時点でMCP（Anthropic）、goose（Block製のエージェントフレームワーク）、AGENTS.md（OpenAI）の3プロジェクトが創設プロジェクトとして寄贈されました。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_16} />
            <div className="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <th>プロトコル</th>
                    <th>開発元</th>
                    <th>主目的</th>
                    <th>現在の管轄</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd">
                    <td>MCP</td>
                    <td>Anthropic</td>
                    <td>エージェントとツール・データの接続</td>
                    <td>AAIF（Linux Foundation）</td>
                  </tr>
                  <tr className="even">
                    <td>A2A</td>
                    <td>Google</td>
                    <td>エージェント間の発見・対話・タスク委任</td>
                    <td>AAIF（Linux Foundation）</td>
                  </tr>
                  <tr className="odd">
                    <td>ACP</td>
                    <td>IBM Research</td>
                    <td>型付き発話行為による交渉的対話（旧仕様）</td>
                    <td>A2Aへ統合済み（単独のプロトコルとしては提供されない）</td>
                  </tr>
                  <tr className="even">
                    <td>AGENTS.md</td>
                    <td>OpenAI</td>
                    <td>コーディングエージェントへのリポジトリ規約伝達</td>
                    <td>AAIF（Linux Foundation）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <h2 id="第5部-メモリアーキテクチャ">第5部　メモリアーキテクチャ</h2>
            <p>
              マルチエージェントシステムでは、「誰が」「何を」「どのくらいの期間」記憶するかの設計がシステムの信頼性を大きく左右します。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_17} />
            <div className="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <th>メモリ種別</th>
                    <th>役割</th>
                    <th>実装例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd">
                    <td>短期記憶</td>
                    <td>現在のタスクに関する直近のやり取り</td>
                    <td>会話履歴、スクラッチパッド</td>
                  </tr>
                  <tr className="even">
                    <td>長期記憶</td>
                    <td>セッションを跨いで保持したい知識・事実</td>
                    <td>ベクトルストア＋RAG、要約済みメモファイル</td>
                  </tr>
                  <tr className="odd">
                    <td>共有メモリ</td>
                    <td>複数エージェントが参照・更新する共通の状態</td>
                    <td>ブラックボード、共有ドキュメント、Redis等のキー・バリューストア</td>
                  </tr>
                  <tr className="even">
                    <td>チェックポイント</td>
                    <td>実行状態のスナップショットと再開ポイント</td>
                    <td>LangGraphのcheckpointer、セッションストア</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Anthropicのリードエージェントが「調査計画をメモリに記録する」設計（第2部）は、長時間の調査でコンテキストウィンドウの上限を超えても計画自体を見失わないための、長期記憶の典型的な使い方です。
            </p>
            <hr />
            <h2 id="第6部-ツール利用と権限設計">第6部　ツール利用と権限設計</h2>
            <h3 id="61-ツール設計原則">6.1 ツール設計原則</h3>
            <p>
              OpenAIの実務ガイドは、ツールの説明・スキーマを明確にすることで、モデルの発見性を高め、バージョン管理を単純化し、重複した定義を防げると指摘しています。ツールは大きく「データ取得系」「アクション実行系」「他エージェント呼び出し系」に分類できます。
            </p>
            <h3 id="62-最小権限の原則">6.2 最小権限の原則</h3>
            <p>
              マルチエージェントシステムでは、すべてのエージェントに同じ権限を与えるのではなく、タスクの性質に応じて権限を絞り込むことが重要です。外部への書き込みや金銭・機密情報に関わる操作を行うエージェントに、人間の承認ゲートを挟むのは定石です。
            </p>
            <p>
              一方で、<strong>「読み取り専用だから承認不要」と一律に扱ってはなりません</strong>
              。後述のLethal Trifectaは、(1) 機密データへアクセスする、(2)
              非信頼な入力（Webページ、受信メール、外部エージェントの応答など）を処理する、(3)
              外部へ通信できる――の<strong>3つが同一セッションに同時に揃ったとき</strong>
              に成立し、プロンプトインジェクションによる情報漏洩の経路になります。読み取り専用のエージェントもこの例外ではありません。3つすべてが揃っていなくても、いずれか1つに該当する時点で「残りの要素が後から加わらないか」を点検し、追加統制の要否を検討する契機としてください。3条件が同時に揃う場合は、次の統制を前提条件とします。
            </p>
            <ul>
              <li>
                <strong>送信先の制限</strong>
                ：外部送信は許可した宛先（ドメイン・エンドポイント）のみに限定し、任意のURLへの送信を禁じる。
              </li>
              <li>
                <strong>機密データの除外</strong>
                ：送信ペイロードから資格情報・個人情報などの機密データを除外する（フィルタと監査ログをセットで用意する）。
              </li>
              <li>
                <strong>人間の承認</strong>
                ：上記の統制が十分に効かない場合、または機密データがシステム外へ出る可能性が残る場合は、承認なしの実行を認めない。
              </li>
            </ul>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_18} />
            <h3 id="63-サンドボックス化">6.3 サンドボックス化</h3>
            <p>
              ツール実行の副作用を隔離するため、コード実行やファイル操作は専用のサンドボックス環境で行い、本番環境や機密データへの直接アクセスを避けるのが望ましい設計です。これは次章のセキュリティ設計とも密接に関係します。
            </p>
            <hr />
            <h2 id="第7部-評価とオブザーバビリティ">第7部　評価とオブザーバビリティ</h2>
            <h3 id="71-評価駆動開発evaluation-driven-development">
              7.1 評価駆動開発（Evaluation-Driven Development）
            </h3>
            <p>
              マルチエージェントシステムは非決定的（同じ入力でも毎回異なる経路を辿りうる）であるため、従来のソフトウェアテストだけでは不十分です。Anthropicは、マルチエージェントシステムのプロトタイプから本番移行までの過程で、「初期段階では少数のテストケースに対する詳細な観察から始め、エージェントが失敗するパターンを見つけ、それに応じて評価基準を継続的に見直す」評価駆動のアプローチが不可欠だったと報告しています。
            </p>
            <h3 id="72-opentelemetry-genai-semantic-conventions">
              7.2 OpenTelemetry GenAI Semantic Conventions
            </h3>
            <p>
              観測基盤側では、OpenTelemetryプロジェクトがLLM呼び出し・エージェントの推論ステップ・ツール呼び出し・MCP通信を標準化された属性で計装するための「GenAI
              Semantic
              Conventions」を整備しています。2026年6月にはGenAI関連の規約が専用リポジトリへ切り出され、独立してバージョン管理されるようになりました。2026年8月時点でこの規約はまだ「Development」ステータスであり、確定した標準ではないものの、モデル呼び出し・トークン使用量・エージェント操作（作成／呼び出し／計画／ツール実行）・MCP通信・評価結果（
              <code>gen_ai.evaluation.result</code>
              ）まで一貫した語彙でトレースできる点が実務上の価値です。
            </p>
            <p>
              名前空間は用途で分かれている点に注意が必要です。
              <strong>
                MCP固有の属性は<code>mcp.*</code>名前空間
              </strong>
              に置かれ、MCPセッション（<code>mcp.session.id</code>）・リソース（
              <code>mcp.resource.uri</code>）・メソッド（<code>mcp.method.name</code>
              ）といったMCP特有の概念を表します。接続先サーバの識別には、MCP固有の属性ではなく汎用のサーバ属性（
              <code>server.address</code>、<code>server.port</code>）を使います。一方、
              <strong>
                ツールの引数や実行結果のようにMCPに限定されない共通概念は<code>gen_ai.*</code>のまま
              </strong>
              （<code>gen_ai.tool.name</code>、<code>gen_ai.tool.call.arguments</code>、
              <code>gen_ai.tool.call.result</code>
              など）です。MCP経由のツール呼び出しを計装する際は、1つのスパンに両名前空間の属性が同居することになります。
            </p>
            <p>
              ただし<code>gen_ai.tool.call.arguments</code>と<code>gen_ai.tool.call.result</code>
              は、ツールへ渡した引数と実行結果の中身そのものであり、認証情報・個人情報・社外秘データを含み得ます。このため規約上これらは
              <strong>既定では記録されないOpt-In属性</strong>
              と位置づけられており、計装側で明示的に有効化した場合にのみ出力されます（OpenTelemetryのSDK/計装ライブラリでは
              <code>OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT</code>
              相当の設定で制御します）。有効化する場合は、機微な値のマスキング（トークンやメールアドレスの伏字化）、トレースバックエンド側でのアクセス制御、保持期間の短縮といった保護策を併せて適用してください。これらを用意できないうちは無効のままにしておくのが安全です。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_19} />
            <h3 id="73-主要メトリクス">7.3 主要メトリクス</h3>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <th>メトリクス種別</th>
                    <th>具体例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd">
                    <td>コスト・効率</td>
                    <td>トークン使用量、API呼び出し回数、レイテンシ</td>
                  </tr>
                  <tr className="even">
                    <td>品質</td>
                    <td>タスク成功率、LLM-as-Judgeによる評価スコア、人間評価との一致率</td>
                  </tr>
                  <tr className="odd">
                    <td>協調の健全性</td>
                    <td>サブエージェント間の重複作業率、タスク漏れの発生率</td>
                  </tr>
                  <tr className="even">
                    <td>安全性</td>
                    <td>ガードレールの発火回数、人間承認ゲートでの却下率</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <h2 id="第8部-安全性とセキュリティ設計">第8部　安全性とセキュリティ設計</h2>
            <p>
              マルチエージェントシステムは、ツールを介して外部の世界に触れる分だけ、単一のチャットボットよりも攻撃対象領域（アタックサーフェス）が広がります。
            </p>
            <h3 id="81-lethal-trifecta致死の三要素">8.1 Lethal Trifecta（致死の三要素）</h3>
            <p>
              セキュリティ研究者Simon Willison氏が2025年6月16日に提唱した概念で、次の3つの能力が
              <strong>同一のエージェントセッション内に同時に揃う</strong>
              と、攻撃者は特別なハッキング技術なしにデータを窃取できてしまうというものです。
            </p>
            <ol type="1">
              <li>
                <strong>プライベートデータへのアクセス</strong>（メール、社内文書、顧客情報など）
              </li>
              <li>
                <strong>信頼できない外部コンテンツへの露出</strong>
                （Webページ、受信メール、Issueコメントなど攻撃者が書き込める場所）
              </li>
              <li>
                <strong>外部への通信手段</strong>（メール送信、Pull Request作成、APIコールなど）
              </li>
            </ol>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_20} />
            <p>
              Willison氏自身が「この問題を100%確実に防ぐ方法は、いまだにわかっていない」と述べているとおり、ガードレール製品による検知だけに頼るのは危険です。実際に報告されたGitHub
              MCPの脆弱性は、1つのMCPサーバーが「攻撃者が書き込める公開Issueの読み取り」「プライベートリポジトリへのアクセス」「Pull
              Request作成による外部送信」という三要素をすべて備えていたために悪用されました。
              <strong>
                唯一の確実な対策は、この三要素が同一セッションに同時に揃う設計そのものを避けること
              </strong>
              です。
            </p>
            <h3 id="82-owasp-top-10-for-agentic-applications2026年版">
              8.2 OWASP Top 10 for Agentic Applications（2026年版）
            </h3>
            <p>
              OWASP GenAI Security
              Projectは2025年12月、自律的に計画・記憶・ツール実行・権限行使を行うエージェント特有のリスクを対象とした「OWASP
              Top 10 for Agentic Applications
              2026」を公開しました。100名を超えるセキュリティ専門家によるレビューを経て、ASI01〜ASI10という識別子でリスクを分類しています。
            </p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <th>ID</th>
                    <th>リスクの概要</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd">
                    <td>ASI01</td>
                    <td>エージェントのゴールハイジャック（目的の乗っ取り）</td>
                  </tr>
                  <tr className="even">
                    <td>ASI02〜ASI09</td>
                    <td>
                      ツール誤用、メモリ汚染、権限昇格、監査性の欠如など、エージェント特有の攻撃面
                    </td>
                  </tr>
                  <tr className="odd">
                    <td>ASI10</td>
                    <td>暴走エージェント（Rogue Agents）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              同時に更新された「OWASP Top 10 for LLM Applications 2026」では、
              <strong>「過剰な自律性（Excessive Agency）」の順位が3位まで上昇</strong>
              し、エージェントが自律的にシェルコマンドを実行したり外部APIを呼んだりする本番インシデントが増えていることを反映しています。マルチエージェント設計においては、プロンプトインジェクションが両リストのうち6つのカテゴリに関連するとOWASPは指摘しており、**「モデルを騙されないようにする」のではなく「騙されたモデルが到達できる範囲を制限する」**というアーキテクチャ上の防御思想が中心に据えられています。
            </p>
            <h3 id="83-過剰な自律性への対策rule-of-two">8.3 過剰な自律性への対策：Rule of Two</h3>
            <p>
              Lethal Trifectaへの実践的な対策として、2025年10月に提案された「Rule of
              Two」という設計指針があります。これは、1回のセッションで次の3つの性質のうち
              <strong>同時に満たしてよいのは最大2つまで</strong>とする考え方です。
            </p>
            <ol type="1">
              <li>信頼できない入力を処理する</li>
              <li>プライベートデータにアクセスする</li>
              <li>外部に対して作用する（通信・実行）</li>
            </ol>
            <p>3つすべてを満たす必要がある場合は自律実行を許さず、必ず人間による承認を挟みます。</p>
            <h3 id="84-ガードレールの多層防御">8.4 ガードレールの多層防御</h3>
            <p>
              OpenAIの実務ガイドは、ガードレールを単一の防壁ではなく「層」として設計することを推奨しています。
            </p>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_21} />
            <h3 id="85-human-in-the-loop設計">8.5 Human-in-the-Loop設計</h3>
            <p>
              高リスクな操作（金銭の移動、外部への送信、本番環境への書き込みなど）や、エージェントが繰り返し失敗しているケースでは、人間の介入を安全装置として組み込むことが不可欠です。これは「効率のための例外」ではなく、マルチエージェントシステムの標準的な設計要素として位置づけるべきです。
            </p>
            <hr />
            <h2 id="第9部-実装フレームワークの選択2026年版">
              第9部　実装フレームワークの選択（2026年版）
            </h2>
            <p>
              2026年時点で、マルチエージェントシステムの実装に使われる主要フレームワークは大きく整理が進みました。Microsoftは研究指向のAutoGenとエンタープライズ指向のSemantic
              Kernelを統合し、「Microsoft Agent
              Framework」として2026年4月3日にGA（一般提供）を迎えています。単体のAutoGenは事実上メンテナンスモードに移行しました。
            </p>
            <h3 id="91-フレームワーク比較表">9.1 フレームワーク比較表</h3>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <th>フレームワーク</th>
                    <th>開発元</th>
                    <th>得意な実行モデル</th>
                    <th>モデル依存</th>
                    <th>学習コスト</th>
                    <th>主な用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd">
                    <td>LangGraph</td>
                    <td>LangChain</td>
                    <td>グラフ＋状態遷移、チェックポイント／タイムトラベルが強力</td>
                    <td>モデル非依存</td>
                    <td>中</td>
                    <td>監査性・厳密な制御が必要な規制業界の本番運用</td>
                  </tr>
                  <tr className="even">
                    <td>CrewAI</td>
                    <td>CrewAI</td>
                    <td>役割ベースの「クルー」定義</td>
                    <td>モデル非依存</td>
                    <td>低（最短20行で開始）</td>
                    <td>素早いプロトタイピング</td>
                  </tr>
                  <tr className="odd">
                    <td>OpenAI Agents SDK</td>
                    <td>OpenAI</td>
                    <td>ハンドオフ＋ホスト済みツール</td>
                    <td>OpenAIモデル中心</td>
                    <td>低</td>
                    <td>OpenAIモデル中心の低摩擦な開発</td>
                  </tr>
                  <tr className="even">
                    <td>Google ADK</td>
                    <td>Google</td>
                    <td>コードファースト、階層的エージェントツリー、A2A相互運用</td>
                    <td>Geminiに最適化（他モデルも利用可）</td>
                    <td>中</td>
                    <td>Google Cloud／Vertex AI中心の開発、マルチモーダル</td>
                  </tr>
                  <tr className="odd">
                    <td>Microsoft Agent Framework</td>
                    <td>Microsoft</td>
                    <td>AutoGen＋Semantic Kernelを統合、MCP／A2Aをネイティブ対応</td>
                    <td>モデル非依存</td>
                    <td>中</td>
                    <td>Azure／.NETネイティブなエンタープライズ</td>
                  </tr>
                  <tr className="even">
                    <td>Claude Agent SDK</td>
                    <td>Anthropic</td>
                    <td>ツール利用チェーン＋サブエージェント</td>
                    <td>Claudeモデル</td>
                    <td>中</td>
                    <td>安全性重視、拡張思考を活用する開発</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 id="92-フレームワーク選択の意思決定">9.2 フレームワーク選択の意思決定</h3>
            <MermaidDiagram preserveNaturalScale={true} chart={MERMAID_22} />
            <p>
              いずれのフレームワークを選んでも、業務ロジック自体は再利用可能ですが、フレームワーク固有のオーケストレーションコードは移行時に書き直しが必要になる点に留意してください。MCPやA2Aといった標準プロトコルへの対応が進むほど、この「フレームワークのロックイン」は将来的に緩和されていくと見られています。
            </p>
            <hr />
            <h2 id="第10部-設計チェックリストとアンチパターン">
              第10部　設計チェックリストとアンチパターン
            </h2>
            <h3 id="101-設計チェックリスト">10.1 設計チェックリスト</h3>
            <MultiAgentChecklist />
            <h3 id="102-よくあるアンチパターン">10.2 よくあるアンチパターン</h3>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <th>アンチパターン</th>
                    <th>何が問題か</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd">
                    <td>なんでもマルチエージェント化</td>
                    <td>
                      単純なタスクにまでオーケストレーターを導入し、コストとレイテンシだけが増える
                    </td>
                  </tr>
                  <tr className="even">
                    <td>曖昧な委任指示</td>
                    <td>
                      サブエージェントへの指示が抽象的すぎて、作業の重複・漏れ・目的のずれが生じる
                    </td>
                  </tr>
                  <tr className="odd">
                    <td>並列な書き込み者</td>
                    <td>複数のエージェントが同じ状態を非同期に書き換え、矛盾した結果を生む</td>
                  </tr>
                  <tr className="even">
                    <td>コンテキストの無制限な共有</td>
                    <td>Context Rotにより、情報を詰め込むほどかえって判断精度が落ちる</td>
                  </tr>
                  <tr className="odd">
                    <td>Lethal Trifectaの放置</td>
                    <td>
                      プライベートデータ・信頼できない入力・外部通信を1つのエージェントに無自覚に集約してしまう
                    </td>
                  </tr>
                  <tr className="even">
                    <td>評価をリリース後回しにする</td>
                    <td>
                      非決定的なシステムに対して事前の評価基盤を用意せず、本番で初めて失敗パターンに気づく
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <h2 id="第11部-2026年9月時点の最新動向">第11部　2026年9月時点の最新動向</h2>
            <ul>
              <li>
                <strong>プロトコル層の再編</strong>：AnthropicはMCPを、GoogleはA2Aを、それぞれLinux
                Foundation傘下のAgentic AI
                Foundation（AAIF）へ移管し、両プロトコルは「ツール接続層（MCP）」と「エージェント間対話層（A2A）」として補完関係にあることが業界的に定着しました。IBM発のACPはA2Aへ統合済みであり、旧ACPベースの資料はA2Aへの移行情報として読み替える必要があります。
              </li>
              <li>
                <strong>フレームワークの整理</strong>：Microsoft Agent Framework
                1.0が2026年4月3日にGAし、AutoGenとSemantic
                Kernelが統合されました。単体のAutoGenは事実上メンテナンスモードとなり、2026年時点で実務上検討すべきフレームワークはLangGraph・CrewAI・OpenAI
                Agents SDK・Google ADK・Microsoft Agent Framework・Claude Agent
                SDKの6つに整理されています。
              </li>
              <li>
                <strong>セキュリティの重心が「エージェントの自律性」へ移動</strong>：OWASP Top 10
                for LLM Applications 2026で「過剰な自律性」が3位に上昇し、Agentic
                Applications向けのTop 10（ASI01〜ASI10）が新設されました。Simon Willison氏のLethal
                Trifectaは、OWASPの分類と対応づけられる形で業界共通の脅威モデルとして定着しています。
              </li>
              <li>
                <strong>観測基盤の標準化が進行中</strong>：OpenTelemetryのGenAI Semantic
                Conventionsは2026年6月に専用リポジトリへ切り出され独立してバージョン管理されるようになりましたが、2026年8月時点でも「Development」ステータスであり、まだ確定した仕様ではありません。
              </li>
              <li>
                <strong>単一 vs マルチエージェントの論争は「使い分け」へ収束</strong>
                ：2025年6月に同時期に公開されたAnthropicとCognitionの対照的な記事をきっかけに始まった論争は、2026年4月のCognitionのフォローアップ記事により、「読み取り中心の探索タスクでは並列マルチエージェントが有効、書き込み・実行を伴うタスクではSingle-Writer原則を守る」という実務的な使い分けへ収束しつつあります。
              </li>
              <li>
                <strong>エンタープライズでの導入加速</strong>
                ：Gartnerは、マルチエージェントシステムに関するクライアントからの問い合わせが2024年第1四半期から2025年第2四半期にかけて1,445%増加したと報告しています（母集団はGartnerに寄せられたクライアント問い合わせ件数）。また2025年8月26日のプレスリリースでは、2026年までにエンタープライズアプリケーションの40%がタスク特化型AIエージェントを組み込む（2025年時点では5%未満）と予測しています。いずれも出典URLは末尾の参考文献「調査・市場データ」を参照してください。一方で、導入意欲の高さに比べてガードレール・権限管理・実行ログといった運用統制の整備は遅れているとの指摘が繰り返されており、設計・セキュリティ面での成熟が導入速度に追いついていない実態があります。
              </li>
            </ul>
            <hr />
            <h2 id="学習ロードマップ">学習ロードマップ</h2>
            <ol type="1">
              <li>
                <strong>基礎固め</strong>
                ：単一エージェントのループ（第0部）とコンテキストエンジニアリングの基本（第3部）を理解する
              </li>
              <li>
                <strong>パターンを知る</strong>
                ：第2部の9パターンを、実際に手元でLangGraphやCrewAIなど1つのフレームワークで最低3パターン（パイプライン・並列・オーケストレーター/ワーカー）を実装して体感する
              </li>
              <li>
                <strong>通信とメモリ</strong>
                ：MCP・A2A（第4部）と、短期／長期／共有メモリの設計（第5部）を、実際に外部ツールを接続しながら学ぶ
              </li>
              <li>
                <strong>評価基盤を先に作る</strong>
                ：本番投入前に、OpenTelemetryベースのトレーシングと評価パイプライン（第7部）を最低限用意する
              </li>
              <li>
                <strong>セキュリティレビュー</strong>：Lethal TrifectaとOWASP Top 10 for Agentic
                Applications（第8部）に照らして、既存の設計を監査する
              </li>
              <li>
                <strong>フレームワーク選定</strong>
                ：自社のクラウド・モデル方針に合わせて第9部の比較表からフレームワークを選び、小規模なパイロットで検証する
              </li>
              <li>
                <strong>継続的改善</strong>
                ：チェックリスト（第10部）を運用ルールに組み込み、評価駆動でエージェントの委任指示・分離境界を継続的に見直す
              </li>
            </ol>
            <hr />
            <h2 id="用語集">用語集</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <th>用語</th>
                    <th>説明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd">
                    <td>エージェントループ</td>
                    <td>LLMが「計画→ツール実行→観察」を終了条件まで繰り返す基本動作</td>
                  </tr>
                  <tr className="even">
                    <td>オーケストレーター・ワーカー</td>
                    <td>
                      中央のオーケストレーターが複数のワーカーへタスクを委任し結果を統合するパターン
                    </td>
                  </tr>
                  <tr className="odd">
                    <td>ハンドオフ</td>
                    <td>エージェント間で会話の主導権そのものを受け渡す分散型の連携方式</td>
                  </tr>
                  <tr className="even">
                    <td>コンテキストエンジニアリング</td>
                    <td>有限なコンテキストウィンドウに何をどう配分するかを設計する営み</td>
                  </tr>
                  <tr className="odd">
                    <td>Context Rot</td>
                    <td>入力トークン数の増加に伴い、モデルの出力品質が非一様に劣化する現象</td>
                  </tr>
                  <tr className="even">
                    <td>分離境界（Isolation Boundary）</td>
                    <td>
                      あるエージェントが他のエージェントの状況をどこまで知るべきかの設計上の線引き
                    </td>
                  </tr>
                  <tr className="odd">
                    <td>Single-Writer原則</td>
                    <td>実環境への「書き込み」を行うエージェントを常に単一に絞る設計原則</td>
                  </tr>
                  <tr className="even">
                    <td>MCP</td>
                    <td>エージェントを外部のツール・データに接続するための標準プロトコル</td>
                  </tr>
                  <tr className="odd">
                    <td>A2A</td>
                    <td>
                      異なるベンダーのエージェント同士が発見・対話・タスク委任を行うための標準プロトコル
                    </td>
                  </tr>
                  <tr className="even">
                    <td>Lethal Trifecta</td>
                    <td>
                      プライベートデータアクセス・信頼できない入力・外部通信の3条件が揃うとデータ窃取が成立する脆弱な構成
                    </td>
                  </tr>
                  <tr className="odd">
                    <td>過剰な自律性（Excessive Agency）</td>
                    <td>
                      エージェントが必要以上の権限・裁量を与えられ、誤誘導された際の被害が拡大するリスク
                    </td>
                  </tr>
                  <tr className="even">
                    <td>Rule of Two</td>
                    <td>
                      1セッションで「信頼できない入力処理」「プライベートデータアクセス」「外部作用」のうち2つまでしか同時に許可しない設計指針
                    </td>
                  </tr>
                  <tr className="odd">
                    <td>評価駆動開発</td>
                    <td>
                      非決定的なエージェントシステムに対し、失敗パターンの観察と評価基準の見直しを継続するアプローチ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <h2 id="参考文献">参考文献</h2>
            <div className="ref-grid">
              <div className="ref-card">
                <h3 className="ref-card-title">Anthropic（一次情報）</h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">
                      How we built our multi-agent research system
                    </span>
                    <Ext
                      href="https://www.anthropic.com/engineering/multi-agent-research-system"
                      className="ref-item-url"
                    >
                      https://www.anthropic.com/engineering/multi-agent-research-system
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Effective context engineering for AI agents
                    </span>
                    <Ext
                      href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
                      className="ref-item-url"
                    >
                      https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Donating the Model Context Protocol and establishing the Agentic AI Foundation
                    </span>
                    <Ext
                      href="https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation"
                      className="ref-item-url"
                    >
                      https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      MCP joins the Agentic AI Foundation（Model Context Protocol公式ブログ）
                    </span>
                    <Ext
                      href="https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/"
                      className="ref-item-url"
                    >
                      https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <h3 className="ref-card-title">OpenAI（一次情報）</h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">
                      A practical guide to building agents（PDF）
                    </span>
                    <Ext
                      href="https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf"
                      className="ref-item-url"
                    >
                      https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Agents（OpenAI 公式ドキュメント。上記ガイドのWeb版に相当する内容）
                    </span>
                    <Ext
                      href="https://platform.openai.com/docs/guides/agents"
                      className="ref-item-url"
                    >
                      https://platform.openai.com/docs/guides/agents
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">OpenAI Agents SDK ドキュメント</span>
                    <Ext
                      href="https://openai.github.io/openai-agents-python/agents/"
                      className="ref-item-url"
                    >
                      https://openai.github.io/openai-agents-python/agents/
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <h3 className="ref-card-title">Google / Linux Foundation（一次情報）</h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Linux Foundation Launches the Agent2Agent Protocol Project
                    </span>
                    <Ext
                      href="https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents"
                      className="ref-item-url"
                    >
                      https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Google Cloud donates A2A to Linux Foundation（Google Developers Blog）
                    </span>
                    <Ext
                      href="https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/"
                      className="ref-item-url"
                    >
                      https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      A year of open collaboration: Celebrating the anniversary of A2A（Google Open
                      Source Blog）
                    </span>
                    <Ext
                      href="https://opensource.googleblog.com/2026/04/a-year-of-open-collaboration-celebrating-the-anniversary-of-a2a.html"
                      className="ref-item-url"
                    >
                      https://opensource.googleblog.com/2026/04/a-year-of-open-collaboration-celebrating-the-anniversary-of-a2a.html
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      A2A Protocol Surpasses 150 Organizations（Linux Foundation プレスリリース）
                    </span>
                    <Ext
                      href="https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year"
                      className="ref-item-url"
                    >
                      https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Linux Foundation Announces the Formation of the Agentic AI Foundation（AAIF）
                    </span>
                    <Ext
                      href="https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation"
                      className="ref-item-url"
                    >
                      https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      A New Chapter for A2A: Joining the Agentic AI Foundation（A2A Protocol
                      公式ブログ、2026年8月27日）
                    </span>
                    <Ext
                      href="https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/"
                      className="ref-item-url"
                    >
                      https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <h3 className="ref-card-title">Cognition（Walden Yan、一次情報）</h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">Don't Build Multi-Agents</span>
                    <Ext
                      href="https://cognition.ai/blog/dont-build-multi-agents"
                      className="ref-item-url"
                    >
                      https://cognition.ai/blog/dont-build-multi-agents
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Multi-Agents: What's Actually
                      Working（2026年4月22日、上記記事のフォローアップ）
                    </span>
                    <Ext
                      href="https://cognition.com/blog/multi-agents-working"
                      className="ref-item-url"
                    >
                      https://cognition.com/blog/multi-agents-working
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <h3 className="ref-card-title">LangChain / LangGraph（一次情報）</h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">
                      LangGraph: Multi-Agent Workflows（LangChain公式ブログ）
                    </span>
                    <Ext
                      href="https://www.langchain.com/blog/langgraph-multi-agent-workflows"
                      className="ref-item-url"
                    >
                      https://www.langchain.com/blog/langgraph-multi-agent-workflows
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      langgraph-supervisor-py（GitHub公式リポジトリ）
                    </span>
                    <Ext
                      href="https://github.com/langchain-ai/langgraph-supervisor-py"
                      className="ref-item-url"
                    >
                      https://github.com/langchain-ai/langgraph-supervisor-py
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <h3 className="ref-card-title">
                  Antonio Gulli（Google, Agentic Design Patterns著者）
                </h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Agentic Design Patterns: A Hands-On Guide to Building Intelligent
                      Systems（Springer Nature）
                    </span>
                    <Ext
                      href="https://link.springer.com/book/10.1007/978-3-032-01402-3"
                      className="ref-item-url"
                    >
                      https://link.springer.com/book/10.1007/978-3-032-01402-3
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <h3 className="ref-card-title">セキュリティ（一次情報）</h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">
                      The lethal trifecta for AI agents（Simon
                      Willison氏本人のブログ、2025年6月16日）
                    </span>
                    <Ext
                      href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/"
                      className="ref-item-url"
                    >
                      https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      OWASP Top 10 for Agentic Applications for 2026
                    </span>
                    <Ext
                      href="https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"
                      className="ref-item-url"
                    >
                      https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">OWASP GenAI LLM Top 10 2026</span>
                    <Ext
                      href="https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/"
                      className="ref-item-url"
                    >
                      https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <h3 className="ref-card-title">観測基盤（一次情報）</h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Inside the LLM Call: GenAI Observability with
                      OpenTelemetry（OpenTelemetry公式ブログ）
                    </span>
                    <Ext
                      href="https://opentelemetry.io/blog/2026/genai-observability/"
                      className="ref-item-url"
                    >
                      https://opentelemetry.io/blog/2026/genai-observability/
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <h3 className="ref-card-title">研究（一次情報）</h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Context Rot: How Increasing Input Tokens Impacts LLM Performance（Chroma
                      Research）
                    </span>
                    <Ext
                      href="https://www.trychroma.com/research/context-rot"
                      className="ref-item-url"
                    >
                      https://www.trychroma.com/research/context-rot
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <h3 className="ref-card-title">調査・市場データ（一次情報）</h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Multiagent Systems in Enterprise AI: Efficiency, Innovation and Vendor
                      Advantage（Gartner。問い合わせ件数1,445%増［2024年Q1→2025年Q2］の出典）
                    </span>
                    <Ext
                      href="https://www.gartner.com/en/articles/multiagent-systems"
                      className="ref-item-url"
                    >
                      https://www.gartner.com/en/articles/multiagent-systems
                    </Ext>
                  </div>
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Gartner Predicts 40% of Enterprise Apps Will Feature Task-Specific AI Agents
                      by 2026, Up from Less Than 5% in 2025（2025年8月26日発表）
                    </span>
                    <Ext
                      href="https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025"
                      className="ref-item-url"
                    >
                      https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <h3 className="ref-card-title">
                  参考にした対象書籍（本ガイドの主題とは異なるAEC分野の書籍）
                </h3>
                <div className="ref-card-list">
                  <div className="ref-item">
                    <span className="ref-item-title">
                      Designing with Multi-Agent Systems（Evangelos Pantazis著、De
                      Gruyter／O'Reilly）
                    </span>
                    <Ext
                      href="https://www.oreilly.com/library/view/designing-with-multi-agent/9783110797473/"
                      className="ref-item-url"
                    >
                      https://www.oreilly.com/library/view/designing-with-multi-agent/9783110797473/
                    </Ext>
                  </div>
                </div>
              </div>
            </div>
            <p>
              本ガイドの作成にあたり、以下の一次情報・著名な国際的開発者・組織の発信を優先的に参照しました（2026年9月10日時点で確認）。
            </p>
          </article>
        </main>
      </div>
    </div>
  );
}
