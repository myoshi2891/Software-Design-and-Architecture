import {
  IconAdjustments,
  IconApps,
  IconBooks,
  IconBrain,
  IconBrandPython,
  IconCalendar,
  IconCode,
  IconCpu,
  IconDatabaseSearch,
  IconGitBranch,
  IconInfoCircle,
  IconLink,
  IconMap2,
  IconMessage2Code,
  IconPhotoVideo,
  IconPlus,
  IconPuzzle,
  IconReportAnalytics,
  IconRobot,
  IconRocket,
  IconShieldCheck,
  IconSparkles,
  IconStack2,
  IconTable,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import BuildingLlmPoweredSidebar, { type NavGroup } from "./BuildingLlmPoweredSidebar";
import LaunchChecklist, { type ChecklistItem } from "./LaunchChecklist";

export const metadata: Metadata = {
  title: "LLMパワードアプリケーション構築ガイド | 初学者のためのステップバイステップ実践入門",
  description:
    "Building LLM Powered Applicationsを起点に、2026年9月時点の最新実践知（エージェント、MCP、コンテキストエンジニアリング、RAG、評価、ガードレール）をステップバイステップで解説する初学者向けガイド。",
};

const NAV_GROUPS: readonly NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "intro", label: "この記事について", icon: "home" },
      { id: "quickstart", label: "最小のLLMアプリ", icon: "code" },
    ],
  },
  {
    title: "ステップガイド",
    items: [
      { id: "step0", num: 0, label: "全体像をつかむ" },
      { id: "step1", num: 1, label: "LLMの基礎" },
      { id: "step2", num: 2, label: "LLMを選ぶ" },
      { id: "step3", num: 3, label: "プロンプト設計" },
      { id: "step4", num: 4, label: "コンテキスト設計" },
      { id: "step5", num: 5, label: "構成要素" },
      { id: "step6", num: 6, label: "ワークフローとエージェント" },
      { id: "step7", num: 7, label: "RAG" },
      { id: "step8", num: 8, label: "フレームワーク選定" },
      { id: "step9", num: 9, label: "ファインチューニング" },
      { id: "step10", num: 10, label: "マルチモーダル" },
      { id: "step11", num: 11, label: "評価とオブザーバビリティ" },
      { id: "step12", num: 12, label: "安全性とガードレール" },
      { id: "step13", num: 13, label: "本番運用へ" },
    ],
  },
  {
    title: "まとめ",
    items: [
      { id: "summary", label: "学習ロードマップ", icon: "map" },
      { id: "references", label: "参考文献・ソース一覧", icon: "books" },
    ],
  },
];

const CHECKLIST_ITEMS: readonly ChecklistItem[] = [
  {
    id: "chk1",
    title: "評価セット",
    desc: "主要なユースケースを網羅した評価データセットを用意し、継続的に計測しているか",
  },
  {
    id: "chk2",
    title: "フォールバック",
    desc: "モデルAPIの障害やレート制限時に、どう振る舞うか定義しているか",
  },
  {
    id: "chk3",
    title: "ガードレール",
    desc: "入力・出力の両方にガードレールを実装し、テストしているか",
  },
  {
    id: "chk4",
    title: "コスト監視",
    desc: "モデルごと・機能ごとのトークン消費とコストを可視化しているか",
  },
  {
    id: "chk5",
    title: "ロールバック計画",
    desc: "プロンプトやモデルのバージョンを切り戻せる仕組みがあるか",
  },
  {
    id: "chk6",
    title: "ログとトレース",
    desc: "障害調査のために十分な粒度でトレースを記録しているか（個人情報の扱いに注意）",
  },
  {
    id: "chk7",
    title: "人間参加型の設計",
    desc: "高リスクな操作には人間の承認ステップを挟んでいるか",
  },
];

const MERMAID_INIT = `%%{init: {"theme": "base", "themeVariables": {"primaryColor": "#ece9fa", "primaryTextColor": "#241f1a", "primaryBorderColor": "#453a8c", "lineColor": "#8a8171", "secondaryColor": "#f7ecd2", "tertiaryColor": "#f2ecdd", "fontFamily": "Noto Sans JP, sans-serif", "fontSize": "16px"}, "flowchart": {"curve": "basis", "htmlLabels": true}}}%%`;

const DIAGRAM_D1 = `${MERMAID_INIT}\nflowchart TB
Start(["LLMアプリを作りたい"]) --> S1["Step1 基礎を理解する"]
S1 --> S2["Step2 LLMを選ぶ"]
S2 --> S3["Step3 プロンプトを設計する"]
S3 --> S4["Step4 コンテキストを設計する"]
S4 --> S5["Step5 構成要素を組み立てる"]
S5 --> S6["Step6 ワークフローとエージェントを設計する"]
S6 --> S7["Step7 RAGで知識を与える"]
S7 --> S8["Step8 フレームワークを選ぶ"]
S8 --> S9["Step9 ファインチューニングを判断する"]
S9 --> S10["Step10 マルチモーダルに拡張する"]
S10 --> S11["Step11 評価とオブザーバビリティを組む"]
S11 --> S12["Step12 安全性とガードレールを組む"]
S12 --> S13["Step13 本番運用の準備をする"]
S13 --> Goal(["本番稼働"])
classDef hub fill:#c9c4ef,color:#221f52,stroke:#453a8c;
classDef done fill:#bfe4d2,color:#123722,stroke:#2f6b4f;
class Start hub
class Goal done`;
const DIAGRAM_D2 = `${MERMAID_INIT}\nflowchart LR
A["事前学習 膨大なテキストで次トークン予測を学習"] --> B["事後学習 指示追従や対話形式にチューニング"]
B --> C["評価 ベンチマークと人間評価で品質を確認"]
C --> D["デプロイ APIやアプリとして提供"]
D -->|"継続的な改善"| B`;
const DIAGRAM_D3 = `${MERMAID_INIT}\nflowchart TB
Q1{"最も重視する要件は"}
Q1 -->|"最高精度のコーディングや複雑な推論"| A["フロンティア級モデルを検討する"]
Q1 -->|"高頻度リクエストでコストを抑えたい"| B["軽量高速モデルを検討する"]
Q1 -->|"自社インフラで動かしたい、またはカスタマイズしたい"| C["オープンウェイトモデルを検討する"]
Q1 -->|"用途ごとに使い分けたい"| D["モデルルーティング構成を検討する"]
A --> E["候補モデルをベンチマークとコストで比較する"]
B --> E
C --> E
D --> E
E --> F["自分のタスクで実際に評価データセットを使って検証する"]
classDef hub fill:#c9c4ef,color:#221f52,stroke:#453a8c;
class Q1 hub`;
const DIAGRAM_D4 = `${MERMAID_INIT}\nflowchart TB
Q1{"指示は明確か"}
Q1 -->|"いいえ"| R1["まず指示を明確にする"]
Q1 -->|"はい"| Q2{"タスクはシンプルか"}
Q2 -->|"はい"| R2["基本テクニックのみで十分 明示的な指示・文脈・具体性"]
Q2 -->|"いいえ"| Q3{"特定の出力形式が必要か"}
Q3 -->|"はい"| R3["例示またはプレフィルを使う"]
Q3 -->|"いいえ"| Q4{"複雑で多段階のタスクか"}
Q4 -->|"はい"| R4["プロンプトチェイニングで分割する"]
Q4 -->|"いいえ"| Q5{"推論過程の透明性が必要か"}
Q5 -->|"はい"| R5["拡張思考または思考の連鎖を使う"]
Q5 -->|"いいえ"| R2`;
const DIAGRAM_D5 = `${MERMAID_INIT}\nflowchart TB
User(["ユーザーの入力"]) --> LLM["拡張されたLLM"]
LLM <--> Retrieval["検索 外部知識やドキュメント"]
LLM <--> Tools["ツール呼び出し 関数やAPI"]
LLM <--> Memory["メモリ 会話履歴や長期記憶"]
LLM --> Output(["応答またはアクション"])
classDef hub fill:#c9c4ef,color:#221f52,stroke:#453a8c;
class LLM hub`;
const DIAGRAM_D6 = `${MERMAID_INIT}\nflowchart LR
In(["入力"]) --> L1["LLM呼び出し1"]
L1 --> G1{"ゲート 品質チェック"}
G1 -->|"合格"| L2["LLM呼び出し2"]
G1 -->|"不合格"| Fix["修正して再実行"]
Fix --> L1
L2 --> Out(["出力"])`;
const DIAGRAM_D7 = `${MERMAID_INIT}\nflowchart TB
In(["入力クエリ"]) --> Router{"クエリを分類する"}
Router -->|"簡単な質問"| Small["軽量高速モデル"]
Router -->|"難しい質問"| Large["高性能モデル"]
Router -->|"専門領域の質問"| Special["専用プロンプトまたは専用ツール"]
Small --> Out(["応答"])
Large --> Out
Special --> Out`;
const DIAGRAM_D8 = `${MERMAID_INIT}\nflowchart TB
In(["タスク"]) --> Split["分割する セクショニングまたは投票"]
Split --> P1["LLM呼び出しA"]
Split --> P2["LLM呼び出しB"]
Split --> P3["LLM呼び出しC"]
P1 --> Agg["結果を集約する"]
P2 --> Agg
P3 --> Agg
Agg --> Out(["最終出力"])`;
const DIAGRAM_D9 = `${MERMAID_INIT}\nflowchart TB
In(["複雑なタスク"]) --> Orch["オーケストレーターLLM"]
Orch --> W1["ワーカー1 動的に割当"]
Orch --> W2["ワーカー2 動的に割当"]
Orch --> W3["ワーカーN 動的に割当"]
W1 --> Syn["結果を統合する"]
W2 --> Syn
W3 --> Syn
Syn --> Out(["最終出力"])
classDef hub fill:#c9c4ef,color:#221f52,stroke:#453a8c;
class Orch hub`;
const DIAGRAM_D10 = `${MERMAID_INIT}\nflowchart LR
In(["タスク"]) --> Gen["生成LLM"]
Gen --> Draft["ドラフト出力"]
Draft --> Eval{"評価LLM 基準を満たすか"}
Eval -->|"いいえ フィードバックを返す"| Gen
Eval -->|"はい"| Out(["最終出力"])`;
const DIAGRAM_D11 = `${MERMAID_INIT}\nflowchart TB
Task(["人間からのタスクまたは対話"]) --> Plan["エージェントが計画する"]
Plan --> Act["ツールを使って行動する"]
Act --> Env["環境から結果を取得する"]
Env --> Check{"完了または停止条件に到達したか"}
Check -->|"いいえ"| Plan
Check -->|"人間の確認が必要"| Human["人間にフィードバックを求める"]
Human --> Plan
Check -->|"完了"| Done2(["タスク完了"])
classDef done fill:#bfe4d2,color:#123722,stroke:#2f6b4f;
class Done2 done`;
const DIAGRAM_D12 = `${MERMAID_INIT}\nflowchart TB
Q(["ユーザーの質問"]) --> C{"質問の複雑さを分類する"}
C -->|"単一文書で答えられる"| Naive["素朴なRAG ベクトル検索とリランク"]
C -->|"複数文書の統合が必要"| Adv["高度なRAG ハイブリッド検索とクエリ変換"]
C -->|"関係性の探索が必要"| Graph["GraphRAG 知識グラフ探索"]
C -->|"多段階の推論が必要"| Agentic["エージェンティックRAG 反復検索と検証"]
Naive --> Gen["LLMが根拠付きの回答を生成する"]
Adv --> Gen
Graph --> Gen
Agentic --> Gen
Gen --> Out(["回答"])
classDef hub fill:#c9c4ef,color:#221f52,stroke:#453a8c;
class C hub`;
const DIAGRAM_D13 = `${MERMAID_INIT}\nflowchart TB
Q1{"プロンプトだけで目標の品質に達したか"}
Q1 -->|"はい"| R1["プロンプトエンジニアリングで十分"]
Q1 -->|"いいえ"| Q2{"問題は知識不足かスタイル不足か"}
Q2 -->|"知識が古い、または不足している"| R2["RAGを導入する"]
Q2 -->|"口調や出力形式が安定しない"| Q3{"Few-shot例と構造化出力で安定するか"}
Q3 -->|"安定する"| R6["Few-shot例と構造化出力でプロンプトを強化する"]
Q3 -->|"安定しない"| R3["LoRAやQLoRAで軽量ファインチューニングする"]
R3 --> Q4{"コストとレイテンシを大きく削減したいか"}
Q4 -->|"はい"| R4["フロンティアモデルの出力を教師データにして小型モデルへ蒸留する"]
Q4 -->|"いいえ"| R5["アダプターを本番運用し定期的に再評価する"]`;
const DIAGRAM_D14 = `${MERMAID_INIT}\nflowchart TB
L1["層1 ユニット評価 個々のステップを単体テストする"] --> L2["層2 LLM as a Judge 回帰スイートで出力品質を採点する"]
L2 --> L3["層3 本番トレース監視 実際のトラフィックをサンプリングしドリフトを検知する"]
L3 --> Loop["問題のあるケースをデータセットに昇格させる"]
Loop --> L1`;
const DIAGRAM_D15 = `${MERMAID_INIT}\nflowchart TB
A["基礎知識とプロンプト設計を身につける"] --> B["小さなワークフローを1つ作ってみる"]
B --> C["RAGまたはツール呼び出しを追加する"]
C --> D["評価セットを用意し継続的に測定する"]
D --> E["安全性とガードレールを組み込む"]
E --> F["本番運用しコストとレイテンシを最適化する"]
F --> G["必要な場合のみ軽量ファインチューニングで最適化する"]
classDef hub fill:#c9c4ef,color:#221f52,stroke:#453a8c;
classDef done fill:#bfe4d2,color:#123722,stroke:#2f6b4f;
class A hub
class G done`;

const CODE_MAIN = `<span class="cm"># app/main.py</span>
<span class="cm"># 依存: pip install &quot;fastapi[standard]&quot; &quot;pydantic&gt;=2&quot; &quot;anthropic==1.4.0&quot;</span>
<span class="cm">#       SDK のバージョンは固定する。メジャー更新で client の引数や戻り値の型が変わるため。</span>
<span class="cm"># 起動: uvicorn app.main:app --reload</span>
<span class="cm">#       ANTHROPIC_API_KEY はコマンドラインに書かず、シークレット管理やCIの環境変数から渡す。</span>
<span class="cm">#       コマンドに直書きするとシェル履歴やプロセス一覧に鍵が残る。</span>
<span class="cm"># 動作確認: curl -X POST localhost:8000/ask -H &#x27;Content-Type: application/json&#x27; -d &#x27;{&quot;question&quot;:&quot;RAGとは？&quot;}&#x27;</span>
<span class="kw">import</span> os
<span class="kw">from</span> collections.abc <span class="kw">import</span> AsyncIterator
<span class="kw">from</span> contextlib <span class="kw">import</span> asynccontextmanager

<span class="kw">from</span> anthropic <span class="kw">import</span> (
    Anthropic,
    APIConnectionError,
    APIStatusError,
)
<span class="kw">from</span> fastapi <span class="kw">import</span> FastAPI, HTTPException
<span class="kw">from</span> pydantic <span class="kw">import</span> BaseModel, Field

SYSTEM_PROMPT = <span class="st">&quot;あなたは日本語で簡潔に答える技術アシスタントです。3文以内で答えてください。&quot;</span>

<span class="cm"># 時間をおけば回復しうるステータス。SDK が自動再試行する条件と同じ基準にそろえる</span>
<span class="cm"># （408 タイムアウト / 409 競合 / 429 レート制限 / 5xx。過負荷を表す 529 は 5xx 側で拾う）。</span>
RETRYABLE_STATUS_CODES = frozenset({<span class="nu">408</span>, <span class="nu">409</span>, <span class="nu">429</span>})


<span class="kw">class</span> <span class="fn">IncompleteResponseError</span>(RuntimeError):
    <span class="st">&quot;&quot;&quot;応答が最後まで生成されなかったことを表す。部分回答を成功として返さないために使う。&quot;&quot;&quot;</span>

<span class="kw">class</span> <span class="fn">AskRequest</span>(BaseModel):
    <span class="st">&quot;&quot;&quot;入力の型。空文字や長すぎる質問はここで自動的に422として弾かれる。&quot;&quot;&quot;</span>

    question: str = Field(min_length=<span class="nu">1</span>, max_length=<span class="nu">1000</span>)

<span class="kw">class</span> <span class="fn">AskResponse</span>(BaseModel):
    answer: str

@asynccontextmanager
<span class="kw">async</span> <span class="kw">def</span> <span class="fn">lifespan</span>(app: FastAPI) -&gt; AsyncIterator[<span class="kw">None</span>]:
    <span class="st">&quot;&quot;&quot;クライアントはアプリ全体で1つだけ生成する。</span>
<span class="st"></span>
<span class="st">    リクエストごとに生成すると HTTP コネクションプールが毎回捨てられ、</span>
<span class="st">    TLSハンドシェイクのやり直しでレイテンシとファイルディスクリプタを浪費する。</span>
<span class="st">    &quot;&quot;&quot;</span>
    <span class="cm"># SDK 既定値（timeout=600秒 / max_retries=2）はバッチ処理向けで、</span>
    <span class="cm"># HTTP リクエスト/レスポンスのアプリケーションには長すぎる。用途に合わせて明示する。</span>
    app.state.llm = Anthropic(
        api_key=os.environ[<span class="st">&quot;ANTHROPIC_API_KEY&quot;</span>],
        timeout=<span class="nu">30.0</span>,     <span class="cm"># 秒。1リクエストの上限。Webハンドラのタイムアウトより短く設定する</span>
        max_retries=<span class="nu">2</span>,    <span class="cm"># 接続エラー・408・409・429・5xx を再試行。指数バックオフと</span>
                          <span class="cm"># Retry-After の待機が加わるため、総待ち時間は timeout×(max_retries+1) を超えうる</span>
    )
    <span class="kw">yield</span>
    app.state.llm.close()  <span class="cm"># 終了時に HTTP コネクションを解放する</span>

app = FastAPI(lifespan=lifespan)

<span class="kw">def</span> <span class="fn">call_llm</span>(question: str) -&gt; str:
    <span class="st">&quot;&quot;&quot;LLM呼び出しを1関数に閉じ込める。テストではこの関数だけを差し替える。&quot;&quot;&quot;</span>
    resp = app.state.llm.messages.create(
        model=<span class="st">&quot;claude-sonnet-5&quot;</span>,
        max_tokens=<span class="nu">300</span>,
        <span class="cm"># claude-sonnet-5 は thinking を省略すると adaptive thinking で動作する。</span>
        <span class="cm"># 短答用途では思考トークンが無駄になるため、明示的に無効化する。</span>
        thinking={<span class="st">&quot;type&quot;</span>: <span class="st">&quot;disabled&quot;</span>},
        system=SYSTEM_PROMPT,
        messages=[{<span class="st">&quot;role&quot;</span>: <span class="st">&quot;user&quot;</span>, <span class="st">&quot;content&quot;</span>: question}],
    )
    <span class="cm"># stop_reason を先に検査する。max_tokens で打ち切られた応答も HTTP 200 で返り、</span>
    <span class="cm"># content には途中までの文章が入っているため、素通しすると「途中で切れた回答」を</span>
    <span class="cm"># 正常応答として利用者へ返してしまう。end_turn 以外は本文を返さない。</span>
    <span class="kw">if</span> resp.stop_reason != <span class="st">&quot;end_turn&quot;</span>:
        <span class="kw">raise</span> IncompleteResponseError(
            f&quot;応答が完了していません (stop_reason={resp.stop_reason})&quot;
        )

    <span class="cm"># 拡張思考を有効にしたモデルでは thinking ブロックが先頭に来ることがある。</span>
    <span class="cm"># content[0] を text と決め打ちせず、type で絞り込む。text ブロックは複数に</span>
    <span class="cm"># 分割されて返ることがあるため、最初の1つで return せず全て連結する。</span>
    parts = [block.text <span class="kw">for</span> block <span class="kw">in</span> resp.content <span class="kw">if</span> block.type == <span class="st">&quot;text&quot;</span>]
    <span class="kw">if</span> <span class="kw">not</span> parts:
        <span class="kw">raise</span> ValueError(<span class="st">&quot;応答に text ブロックが含まれていません&quot;</span>)
    <span class="kw">return</span> <span class="st">&quot;\\n&quot;</span>.join(parts)

@app.post(<span class="st">&quot;/ask&quot;</span>, response_model=AskResponse)
<span class="kw">def</span> <span class="fn">ask</span>(req: AskRequest) -&gt; AskResponse:
    <span class="kw">try</span>:
        answer = call_llm(req.question)
    <span class="kw">except</span> APIConnectionError <span class="kw">as</span> exc:
        <span class="cm"># 接続失敗。サブクラスの APITimeoutError もここで捕捉される。</span>
        <span class="kw">raise</span> HTTPException(status_code=<span class="nu">503</span>, detail=<span class="st">&quot;LLMの呼び出しに失敗しました&quot;</span>) <span class="kw">from</span> exc
    <span class="kw">except</span> APIStatusError <span class="kw">as</span> exc:
        <span class="cm"># 503に変換するのは「時間をおけば回復しうるプロバイダ側の障害」だけに限る。</span>
        <span class="cm"># 認証エラー(401)やモデル未検出(404)は設定・実装の不具合であり、503に丸めると</span>
        <span class="cm"># 無意味なリトライを誘発する。捕捉せず500として顕在化させる。</span>
        <span class="kw">if</span> exc.status_code <span class="kw">in</span> RETRYABLE_STATUS_CODES <span class="kw">or</span> exc.status_code &gt;= <span class="nu">500</span>:
            <span class="kw">raise</span> HTTPException(
                status_code=<span class="nu">503</span>, detail=<span class="st">&quot;LLMの呼び出しに失敗しました&quot;</span>
            ) <span class="kw">from</span> exc
        <span class="kw">raise</span>
    <span class="kw">except</span> IncompleteResponseError <span class="kw">as</span> exc:
        <span class="cm"># 部分回答を200で返さない。上流の応答が不完全なので502とする。</span>
        <span class="kw">raise</span> HTTPException(
            status_code=<span class="nu">502</span>, detail=<span class="st">&quot;LLMの応答が完了しませんでした&quot;</span>
        ) <span class="kw">from</span> exc

    <span class="kw">if</span> <span class="kw">not</span> answer.strip():
        <span class="kw">raise</span> HTTPException(status_code=<span class="nu">502</span>, detail=<span class="st">&quot;LLMが空の応答を返しました&quot;</span>)
    <span class="kw">return</span> AskResponse(answer=answer)`;

const CODE_TEST = `<span class="cm"># tests/test_main.py</span>
<span class="cm"># 依存: pip install pytest &quot;anthropic==1.4.0&quot; &quot;httpx2&gt;=2&quot;</span>
<span class="cm">#       anthropic 1.x は HTTP 層に httpx のフォークである httpx2 を使う。</span>
<span class="cm">#       SDK 例外へ渡す Request/Response も httpx2 の型でそろえる。</span>
<span class="cm"># 実行: pytest tests/test_main.py</span>
<span class="kw">from</span> collections.abc <span class="kw">import</span> Iterator
<span class="kw">from</span> types <span class="kw">import</span> SimpleNamespace
<span class="kw">from</span> unittest.mock <span class="kw">import</span> MagicMock

<span class="kw">import</span> httpx2
<span class="kw">import</span> pytest
<span class="kw">from</span> anthropic <span class="kw">import</span> APIConnectionError, AuthenticationError
<span class="kw">from</span> fastapi.testclient <span class="kw">import</span> TestClient

<span class="kw">from</span> app <span class="kw">import</span> main

@pytest.fixture
<span class="kw">def</span> <span class="fn">client</span>(monkeypatch: pytest.MonkeyPatch) -&gt; Iterator[TestClient]:
    <span class="st">&quot;&quot;&quot;lifespanを実行しつつ、実SDKクライアントの生成だけを差し替える。</span>
<span class="st"></span>
<span class="st">    TestClientを\`with\`で使わないとlifespanが起動せず、app.state.llm が未設定のまま</span>
<span class="st">    本番との差異を見逃す。生成と後始末の両方をここで検証する。</span>
<span class="st">    &quot;&quot;&quot;</span>
    llm = MagicMock()
    anthropic_factory = MagicMock(return_value=llm)
    monkeypatch.setenv(<span class="st">&quot;ANTHROPIC_API_KEY&quot;</span>, <span class="st">&quot;test-key&quot;</span>)
    monkeypatch.setattr(main, <span class="st">&quot;Anthropic&quot;</span>, anthropic_factory)

    <span class="kw">with</span> TestClient(main.app) <span class="kw">as</span> test_client:
        anthropic_factory.assert_called_once()  <span class="cm"># 起動時に1つだけ生成される</span>
        <span class="kw">yield</span> test_client

    llm.close.assert_called_once()  <span class="cm"># 終了時にHTTPコネクションが解放される</span>

<span class="kw">def</span> <span class="fn">test_質問に対して回答を返す</span>(client: TestClient, monkeypatch: pytest.MonkeyPatch) -&gt; <span class="kw">None</span>:
    <span class="cm"># Arrange</span>
    monkeypatch.setattr(main, <span class="st">&quot;call_llm&quot;</span>, <span class="kw">lambda</span> question: <span class="st">&quot;RAGは検索拡張生成です。&quot;</span>)

    <span class="cm"># Act</span>
    res = client.post(<span class="st">&quot;/ask&quot;</span>, json={<span class="st">&quot;question&quot;</span>: <span class="st">&quot;RAGとは？&quot;</span>})

    <span class="cm"># Assert</span>
    <span class="kw">assert</span> res.status_code == <span class="nu">200</span>
    <span class="kw">assert</span> res.json() == {<span class="st">&quot;answer&quot;</span>: <span class="st">&quot;RAGは検索拡張生成です。&quot;</span>}

<span class="kw">def</span> <span class="fn">test_空の質問はバリデーションで拒否する</span>(client: TestClient) -&gt; <span class="kw">None</span>:
    <span class="cm"># Arrange / Act</span>
    res = client.post(<span class="st">&quot;/ask&quot;</span>, json={<span class="st">&quot;question&quot;</span>: <span class="st">&quot;&quot;</span>})

    <span class="cm"># Assert: LLMに到達する前に弾かれる</span>
    <span class="kw">assert</span> res.status_code == <span class="nu">422</span>

<span class="kw">def</span> <span class="fn">test_プロバイダ障害なら503を返す</span>(client: TestClient, monkeypatch: pytest.MonkeyPatch) -&gt; <span class="kw">None</span>:
    <span class="cm"># Arrange: 503へ変換されるのは型付きSDK例外だけ</span>
    <span class="kw">def</span> <span class="fn">raise_error</span>(question: str) -&gt; str:
        <span class="kw">raise</span> APIConnectionError(
            request=httpx2.Request(<span class="st">&quot;POST&quot;</span>, <span class="st">&quot;https://api.anthropic.com/v1/messages&quot;</span>)
        )

    monkeypatch.setattr(main, <span class="st">&quot;call_llm&quot;</span>, raise_error)

    <span class="cm"># Act</span>
    res = client.post(<span class="st">&quot;/ask&quot;</span>, json={<span class="st">&quot;question&quot;</span>: <span class="st">&quot;RAGとは？&quot;</span>})

    <span class="cm"># Assert</span>
    <span class="kw">assert</span> res.status_code == <span class="nu">503</span>

<span class="kw">def</span> <span class="fn">test_max_tokensで打ち切られた応答は200で返さない</span>(client: TestClient) -&gt; <span class="kw">None</span>:
    <span class="st">&quot;&quot;&quot;部分回答を成功として返していないかを守る回帰テスト。&quot;&quot;&quot;</span>
    <span class="cm"># Arrange: HTTP 200 だが stop_reason が max_tokens の応答</span>
    client.app.state.llm.messages.create.return_value = SimpleNamespace(
        stop_reason=<span class="st">&quot;max_tokens&quot;</span>,
        content=[SimpleNamespace(type=<span class="st">&quot;text&quot;</span>, text=<span class="st">&quot;RAGは検索拡&quot;</span>)],
    )

    <span class="cm"># Act</span>
    res = client.post(<span class="st">&quot;/ask&quot;</span>, json={<span class="st">&quot;question&quot;</span>: <span class="st">&quot;RAGとは？&quot;</span>})

    <span class="cm"># Assert: 途中までの本文が利用者へ漏れない</span>
    <span class="kw">assert</span> res.status_code == <span class="nu">502</span>
    <span class="kw">assert</span> <span class="st">&quot;RAGは検索拡&quot;</span> <span class="kw">not</span> <span class="kw">in</span> res.text

<span class="kw">def</span> <span class="fn">test_認証エラーは503へ丸めない</span>(client: TestClient, monkeypatch: pytest.MonkeyPatch) -&gt; <span class="kw">None</span>:
    <span class="cm"># Arrange: 401 は設定の不具合。再試行しても回復しない</span>
    <span class="kw">def</span> <span class="fn">raise_error</span>(question: str) -&gt; str:
        <span class="kw">raise</span> AuthenticationError(
            <span class="st">&quot;invalid api key&quot;</span>,
            response=httpx2.Response(
                <span class="nu">401</span>, request=httpx2.Request(<span class="st">&quot;POST&quot;</span>, <span class="st">&quot;https://api.anthropic.com/v1/messages&quot;</span>)
            ),
            body=<span class="kw">None</span>,
        )

    monkeypatch.setattr(main, <span class="st">&quot;call_llm&quot;</span>, raise_error)

    <span class="cm"># Act / Assert: 捕捉されず500として顕在化する</span>
    <span class="kw">with</span> pytest.raises(AuthenticationError):
        client.post(<span class="st">&quot;/ask&quot;</span>, json={<span class="st">&quot;question&quot;</span>: <span class="st">&quot;RAGとは？&quot;</span>})`;

export default function BuildingLlmPoweredApplicationsGuidePage() {
  return (
    <div className="building-llm-powered-applications-guide">
      <div className="layout">
        <BuildingLlmPoweredSidebar groups={NAV_GROUPS} />
        <main className="main">
          <section className="hero" id="intro">
            <div className="hero-kicker">
              <IconSparkles size={18} className="ti" />
              2026年9月版・初学者向け実践ガイド
            </div>
            <h1>
              LLMパワードアプリケーション構築ガイド
              <br />
              初学者のためのステップバイステップ実践入門
            </h1>
            <p className="hero-lead">
              本ガイドは、O'Reilly / Packt Publishing 刊の書籍{" "}
              <em>Building LLM Powered Applications</em>（Valentina Alto 著, 2024年5月刊,
              出典0）を出発点としつつ、刊行から約2年の間に大きく様変わりしたLLMアプリケーション開発の実践知を、2026年9月9日時点の情報でアップデートした学習ガイドです。原著はLangChainを中心に「LLMの基礎
              → プロンプトエンジニアリング → 会話アプリ → 構造化データ → マルチモーダル →
              ファインチューニング →
              責任あるAI」という流れで構成されていますが、その後「エージェント」「Model Context
              Protocol（MCP）」「コンテキストエンジニアリング」「評価/オブザーバビリティ」といった新しい実践領域が業界標準になりました。本ガイドはこの最新の実践知を、初めてLLMアプリケーションを作るエンジニアにも理解できるよう、ステップバイステップで解説します。
            </p>
            <div className="hero-badges">
              <span className="badge">
                <IconCalendar size={18} className="ti" />
                2026年9月9日時点の情報
              </span>
              <span className="badge">
                <IconGitBranch size={18} className="ti" />
                Mermaidフローチャート 15点
              </span>
              <span className="badge">
                <IconTable size={18} className="ti" />
                比較表 7点
              </span>
              <span className="badge">
                <IconLink size={18} className="ti" />
                出典URL 30点超
              </span>
            </div>
          </section>

          <div className="table-wrap">
            <div className="table-title">書誌情報</div>
            <table className="kv-table">
              <thead>
                <tr>
                  <th>項目</th>
                  <th>内容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>書名</th>
                  <td>Building LLM Powered Applications</td>
                </tr>
                <tr>
                  <th>著者</th>
                  <td>Valentina Alto</td>
                </tr>
                <tr>
                  <th>出版社</th>
                  <td>Packt Publishing</td>
                </tr>
                <tr>
                  <th>刊行</th>
                  <td>2024年5月</td>
                </tr>
                <tr>
                  <th>配信</th>
                  <td>O'Reilly Learning でも配信</td>
                </tr>
                <tr>
                  <th>URL</th>
                  <td>
                    <Ext
                      href="https://www.oreilly.com/library/view/building-llm-powered/9781835462317/"
                      className="ref-url"
                    >
                      oreilly.com/library/view/building-llm-powered/9781835462317
                    </Ext>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <section className="section prose">
            <h2>
              <IconInfoCircle size={18} className="ti" />
              この記事の読み方
            </h2>
            <ul>
              <li>
                プログラミングの基礎知識はあるが、LLMアプリケーション開発は初めてという方を対象にしています。
              </li>
              <li>
                各ステップは独立して読めますが、上から順に読むと「基礎知識 → 設計 → 実装 →
                運用」という開発の流れに沿って理解が深まります。
              </li>
              <li>
                図はすべてMermaidのフローチャートで表現し、比較情報はMarkdown由来の表にまとめています。
              </li>
              <li>
                本文中の「出典N」は、末尾の「参考文献・ソース一覧」セクションの同じ番号に対応しています。モデル名・価格・ベンチマーク順位などは2026年時点でも数週間単位で更新され続けているため、実際に採用する際は必ず一次情報を確認してください。
              </li>
            </ul>
          </section>

          <section className="section prose" id="quickstart">
            <h2>
              <IconCode size={18} className="ti" />
              まず動かしてみる：最小のLLMアプリ
            </h2>
            <p>
              図を眺める前に、30行ほどで動く最小のLLMアプリを手元で動かしておくと、以降の説明が具体的に読めるようになります。「LLMを呼ぶ」「出力を型で受け取る」「テストする」という、この後のすべてのStepに共通する骨格です。
            </p>

            <div className="code-block">
              <div className="code-block-title">
                <IconBrandPython size={18} className="ti" />
                app/main.py
              </div>
              <pre dangerouslySetInnerHTML={{ __html: CODE_MAIN }} />
            </div>

            <p>
              テストではLLMを呼びません。<code>monkeypatch</code>で<code>call_llm</code>
              を差し替えることで、APIキーもネットワークも不要な、毎回同じ結果になるテストになります。
            </p>

            <div className="code-block">
              <div className="code-block-title">
                <IconBrandPython size={18} className="ti" />
                tests/test_main.py
              </div>
              <pre dangerouslySetInnerHTML={{ __html: CODE_TEST }} />
            </div>

            <p>
              この骨格に、Step
              3以降で扱うプロンプト設計・コンテキスト管理・RAG・ガードレールを段階的に足していくのが、本ガイドの進み方です。
            </p>
          </section>

          <hr className="div" />
          <section className="section prose" id="step0">
            <h2>
              <IconMap2 size={18} className="ti" />
              Step 0: 全体像をつかむ
            </h2>
            <p>
              いきなり細部に入る前に、LLMアプリケーション開発全体の地図を描いておきましょう。著名なAI研究者であるAndrej
              Karpathy氏（元OpenAI創業メンバー、元Tesla AI部門責任者）は2025年6月のY
              Combinator講演で、LLMを「英語で書かれたプログラムを実行する新種のコンピュータ」に例え、これを「Software
              3.0」と呼びました。プロンプトやコンテキストウィンドウがプログラムそのものであり、LLMはそのインタプリタである、という考え方です（出典1）。この視点は、この後のすべてのステップの土台になります。プロンプト設計もツール連携もエージェント設計も、突き詰めれば「LLMというインタプリタに何を読み込ませ、どう振る舞わせるか」を設計する作業だからです。
            </p>

            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D1} />
              </div>
              <div className="diagram-caption">図1: LLMアプリケーション開発の全体マップ</div>
            </div>

            <p>
              重要なのは、この地図は一直線に一度だけ進むものではなく、実際には小さく反復しながら何度も行き来するという点です。Anthropicのエンジニアリングチームも「最もシンプルな解決策から始め、必要な場合にのみ複雑さを増やす」ことを一貫して推奨しています（出典2）。まずはStep1から順に見ていきましょう。
            </p>
          </section>

          <section className="section prose" id="step1">
            <h2>
              <IconBrain size={18} className="ti" />
              Step 1: LLMの基礎を理解する
            </h2>

            <h3>基盤モデルとLLM</h3>
            <p>
              LLM（大規模言語モデル）は、インターネット規模のテキストデータで事前学習された「基盤モデル（Foundation
              Model）」の一種です。Transformerと呼ばれるニューラルネットワークのアーキテクチャに基づいており、入力されたトークン列から次のトークンを予測することを繰り返すことで、文章の生成・要約・翻訳・推論など幅広いタスクをこなせるようになります。原著書籍でもこの基本アーキテクチャの理解が第1章の中心テーマになっています（出典0書籍）。
            </p>

            <h3>モデルが完成するまでの流れ</h3>
            <p>現在主流のLLMは、大きく分けて次の3段階を経て製品として提供されます。</p>

            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D2} />
              </div>
              <div className="diagram-caption">
                図2: LLMが製品として提供されるまでの一般的な流れ
              </div>
            </div>

            <ul>
              <li>
                <strong>事前学習（Pre-training）</strong>:
                大量のテキストから統計的な言語パターンを学習する段階です。
              </li>
              <li>
                <strong>事後学習（Post-training）</strong>:
                SFT（教師ありファインチューニング）やRLHF（人間のフィードバックによる強化学習）などを通じて、指示に従う対話モデルへと調整します。
              </li>
              <li>
                <strong>評価（Evaluation）</strong>:
                SWE-bench（コーディング）やMMLU系のベンチマーク、人間による選好評価など複数の指標で品質を測ります。
              </li>
              <li>
                <strong>デプロイ</strong>:
                API・チャットアプリ・エージェント基盤などの形で公開されます。
              </li>
            </ul>

            <h3>ベースモデル vs カスタマイズ済みモデル</h3>
            <p>
              原著書籍が強調しているように、「そのまま使えるベースモデル」と「特定用途向けにカスタマイズしたモデル」は区別して考える必要があります（出典0書籍）。カスタマイズの方法には、後述するプロンプトエンジニアリング・RAG・ファインチューニングなど複数の選択肢があり、どれを選ぶかは
              Step 9 で詳しく扱います。ここで初学者が押さえておくべき要点は、
              <strong>
                「モデルを再学習させること」は選択肢の一つに過ぎず、多くの場合はより手軽な方法で十分
              </strong>
              という点です。
            </p>
          </section>

          <section className="section prose" id="step2">
            <h2>
              <IconCpu size={18} className="ti" />
              Step 2: アプリケーションに合ったLLMを選ぶ
            </h2>

            <h3>2026年9月時点のモデル地図</h3>
            <p>
              LLM市場は非常に速いペースで動いています。Anthropic・OpenAI・Google・xAIといった主要ラボがフロンティアモデルを数週間おきに更新する一方、DeepSeek・Qwen・Kimi・GLMなど中国発のオープンウェイトモデルも急速に性能を伸ばし、価格競争を牽引しています（出典3）。あるモデル比較記事は「単一の"最良のモデル"は存在せず、コーディングに強いClaude系、汎用性の高いGPT系、マルチモーダルとコストパフォーマンスに優れたGemini系、俊敏でエージェント指向のGrok系というように、ラボごとに異なる個性がある」と評しています（出典4）。またSimon
              Willison氏（データベースツールDatasetteの開発者であり、LLM分野で最も広く読まれている実務家ブロガーの一人）は、コーディングエージェントの分野で2025年後半から2026年にかけて推論モデルが一気に主流化し、価格が急速に下がったことを指摘しています（出典5）。
            </p>
            <p>
              このような環境では、特定のモデル名やベンチマーク順位を覚えることよりも、
              <strong>
                「自分のタスクに対してどう選定し、どう評価するか」という判断プロセスを身につけること
              </strong>
              の方が長く役立ちます。
            </p>

            <div className="table-wrap">
              <div className="table-title">表1: LLM選定時に確認すべき観点</div>
              <table>
                <thead>
                  <tr>
                    <th>観点</th>
                    <th>確認すること</th>
                    <th>向いているモデルの傾向</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>タスクの難易度</td>
                    <td>複雑な多段階推論やコーディングが必要か</td>
                    <td>フロンティア級の推論モデル</td>
                  </tr>
                  <tr>
                    <td>リクエスト頻度とコスト</td>
                    <td>大量の短いリクエストを高速に処理したいか</td>
                    <td>軽量・高速な廉価モデル</td>
                  </tr>
                  <tr>
                    <td>データ主権・カスタマイズ性</td>
                    <td>自社インフラでの運用や重みへのアクセスが必要か</td>
                    <td>オープンウェイトモデル（Llama系、Qwen系、DeepSeek系など）</td>
                  </tr>
                  <tr>
                    <td>コンテキスト長</td>
                    <td>長い文書やコードベース全体を読ませたいか</td>
                    <td>長コンテキストウィンドウに対応したモデル</td>
                  </tr>
                  <tr>
                    <td>エコシステム</td>
                    <td>既存のツール連携やMCPサーバー資産を活かしたいか</td>
                    <td>対応エコシステムが充実したラボのモデル</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D3} />
              </div>
              <div className="diagram-caption">図3: LLM選定のディシジョンフロー</div>
            </div>

            <p>
              複数の比較記事が共通して強調しているのは、「リーダーボードは毎月のように入れ替わるため、特定のモデルにハードコードするのではなく、モデルを切り替え可能な形でアプリケーションを設計し、タスクの複雑度に応じて異なるモデルへルーティングする戦略が2026年の実践的な標準になりつつある」という点です（出典6）。これはStep
              6で紹介する「ルーティング」パターンにもつながります。
            </p>
          </section>
          <section className="section prose" id="step3">
            <h2>
              <IconMessage2Code size={18} className="ti" />
              Step 3: プロンプトエンジニアリングをマスターする
            </h2>
            <p>
              プロンプトエンジニアリングとは、AIモデルからより良い出力を得るために指示を構造化する技術です。Anthropicの開発者向けブログは、これを「良いプロンプトと曖昧な指示の差が、そのまま欲しい結果に一発でたどり着けるか、何度もやり取りを重ねる必要があるかの差になる」技術だと説明しています（出典7）。
            </p>

            <h3>基本テクニック</h3>
            <p>
              Anthropicが2025年11月に公開し2026年にかけて更新しているガイドでは、次の基本テクニックが紹介されています（出典7）。
            </p>
            <ul>
              <li>
                <strong>明確で明示的な指示を書く</strong>:
                モデルに推測させず、欲しい出力を直接的に述べます。「分析して」ではなく「〇〇の観点から分析し、△△形式で出力して」のように書きます。
              </li>
              <li>
                <strong>文脈と目的を伝える</strong>:
                なぜその出力が必要なのかを伝えると、モデルは意図に沿った判断をしやすくなります。
              </li>
              <li>
                <strong>具体性を持たせる</strong>:
                文字数・出力形式・対象読者・制約条件などを明示します。
              </li>
              <li>
                <strong>例を示す（Few-shot）</strong>:
                説明より実例の方が伝わる場合に有効です。まずは1つの例（One-shot）から始め、それでも安定しない場合にのみ例を追加します。
              </li>
              <li>
                <strong>「わからない」と言う許可を与える</strong>:
                「情報が不十分な場合は推測せずそう伝えてください」と一言添えるだけで、ハルシネーション（もっともらしい誤情報の生成）を減らせます。
              </li>
            </ul>

            <h3>応用テクニック</h3>
            <p>
              より複雑なタスクやエージェント構築の際には、以下の応用テクニックが役立ちます（出典7）。
            </p>
            <ul>
              <li>
                <strong>プレフィル（Prefill）</strong>:
                モデルの応答の書き出しをこちらで指定し、JSON出力の強制や前置きの省略に使います。
              </li>
              <li>
                <strong>思考の連鎖（Chain of Thought）</strong>:
                「段階的に考えてから答えて」と指示し、複雑な分析タスクの精度を上げます。Claudeなどの最新モデルが備える拡張思考（Extended
                Thinking）機能が使える場合は、そちらの方が一般的に優先されますが、透明性のある推論過程が必要な場面では明示的なCoTも依然として有効です。
              </li>
              <li>
                <strong>出力形式の制御</strong>:
                「〜しないで」ではなく「〜してください」という肯定形で指示する方が、モダンなモデルには効果的だとされています。
              </li>
              <li>
                <strong>プロンプトチェイニング（Prompt Chaining）</strong>:
                1つのプロンプトでは処理しきれない複雑なタスクを、複数の呼び出しに分割します。これはStep
                6で紹介するワークフローパターンの基礎にもなります。
              </li>
            </ul>
            <p>
              一方で、XMLタグによる構造化や過度なロールプロンプティング（「あなたは〜の専門家です」）は、以前ほど重要ではなくなってきているとAnthropicは指摘しています。現行の主要モデルは、明示的でわかりやすい文章だけでも十分に構造を理解できるためです（出典7）。
            </p>

            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D4} />
              </div>
              <div className="diagram-caption">
                図4: プロンプトエンジニアリング技法の選択フロー
                <span className="src">（出典7の判断基準をもとに作成）</span>
              </div>
            </div>

            <div className="table-wrap">
              <div className="table-title">表2: 目的別プロンプト技法の選び方（出典7）</div>
              <table>
                <thead>
                  <tr>
                    <th>欲しいもの</th>
                    <th>使う技法</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>特定の出力形式</td>
                    <td>例示・プレフィル・明示的な形式指示</td>
                  </tr>
                  <tr>
                    <td>段階的な推論</td>
                    <td>拡張思考（利用可能な場合）または思考の連鎖</td>
                  </tr>
                  <tr>
                    <td>複雑な多段階タスク</td>
                    <td>プロンプトチェイニング</td>
                  </tr>
                  <tr>
                    <td>透明性のある推論根拠</td>
                    <td>構造化された思考の連鎖</td>
                  </tr>
                  <tr>
                    <td>ハルシネーション対策</td>
                    <td>「わからない」と言う許可</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Anthropicのガイドは最後に、「最良のプロンプトは最も長く複雑なものではなく、必要最小限の構造で目的を確実に達成できるもの」だと締めくくっています（出典7）。まずは基本テクニックを習慣化し、それで解決しない問題にだけ応用テクニックを重ねる、という順序が重要です。
            </p>
          </section>

          <section className="section prose" id="step4">
            <h2>
              <IconStack2 size={18} className="ti" />
              Step 4: コンテキストエンジニアリング
            </h2>
            <p>
              2025年後半以降、業界の関心は「プロンプトエンジニアリング」から「コンテキストエンジニアリング」へと広がっています。Anthropicはこれを「LLMの推論時に含まれるトークン集合、すなわちシステムプロンプト・ツール定義・会話履歴・検索結果など、コンテキストウィンドウに入りうるすべての情報を、最適な形でキュレーションし維持するための一連の戦略」と定義しています（出典8）。あるエンジニアリングブログはこれを「プロンプトエンジニアリングが一文の設計だとすれば、コンテキストエンジニアリングはその一文を生み出すパイプライン全体の設計である」と表現しています（出典9）。
            </p>

            <h3>なぜ重要なのか：コンテキストの劣化（Context Rot）</h3>
            <p>
              各モデルベンダーは2024年から2025年にかけてコンテキストウィンドウを100万トークン級まで拡大しましたが、「窓が大きければ大きいほど良い」わけではないことがわかってきました。Chroma
              Researchが2025年7月に発表した調査は、GPT・Claude・Geminiを含む18のフロンティアモデルを対象に、入力が長くなるにつれてすべてのモデルの精度が劣化することを示しました。劣化は緩やかではなく、ウィンドウの上限よりずっと手前で精度が崖のように落ち込む場合があり、20件の文書のうち関連情報が5〜15番目の位置にあるだけで、一部のモデルは30ポイント以上正答率を落としたと報告されています（出典10）。
            </p>
            <p>
              このため、2026年時点の実践では「大きいコンテキストウィンドウに頼る」のではなく「厳選されたトークンだけを渡す規律」が重視されています。コーディングエージェントやリサーチエージェントのように、実行ステップごとに検索結果やツール出力を積み重ねていくシステムほど、この積み重ねが後続のすべてのステップの精度を下げてしまう点に注意が必要です（出典10）。
            </p>

            <h3>実践上のポイント</h3>
            <ul>
              <li>
                システムプロンプト・ツール定義・会話履歴・検索結果それぞれについて、「本当にこのステップに必要か」を問い直す。
              </li>
              <li>
                長くなった会話履歴は要約（コンパクション）し、古いツール出力やあきらめた推論経路を残さない。
              </li>
              <li>
                重要な情報はコンテキストの先頭または末尾に配置する（「middle」に埋もれた情報は見落とされやすい）。
              </li>
              <li>
                ツールの出力形式は、モデルが元々インターネット上で見慣れている自然な形式に近づける（詳しくはStep
                6のツール設計の項目を参照）。
              </li>
            </ul>
            <p>
              プロンプトエンジニアリングは廃れたわけではなく、コンテキストエンジニアリングという大きな枠組みの中の一つの基礎的な構成要素として位置づけ直された、と理解するのが実務的には正確です（出典7）。
            </p>
          </section>
          <section className="section prose" id="step5">
            <h2>
              <IconPuzzle size={18} className="ti" />
              Step 5: LLMアプリケーションの構成要素
            </h2>
            <p>
              ここからは実際にアプリケーションを組み立てる段階です。Anthropicのエンジニアリングチームは、数十社のエージェント構築を支援した経験から「最も成功している実装は、複雑なフレームワークではなく、シンプルで組み合わせ可能なパターンを使っている」と述べています（出典2）。その最も基本的な構成要素が「拡張されたLLM（Augmented
              LLM）」です。
            </p>

            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D5} />
              </div>
              <div className="diagram-caption">
                図5: 拡張されたLLM（Augmented LLM）の構成図
                <span className="src">（出典2をもとに作成）</span>
              </div>
            </div>

            <p>
              現在のモデルは、自ら検索クエリを生成し、適切なツールを選び、何を記憶すべきかを判断する能力を備えています。この「検索・ツール・メモリ」という3つの拡張機能をどう実装するかが、アプリケーション設計の中心テーマになります。
            </p>

            <h3>ツール利用とModel Context Protocol（MCP）</h3>
            <p>
              ツール利用（Tool Use、Function
              Callingとも呼ばれる）は、LLMに外部システムを操作させるための仕組みです。かつては各社が独自の実装方法を使っていましたが、2024年11月にAnthropicが公開したModel
              Context
              Protocol（MCP）が、この分野の共通規格として急速に普及しました（出典11）。MCPはJSON-RPCベースのオープンな標準で、AIアプリケーションがリモートのMCPサーバーからツール・再利用可能なプロンプト・リソースを発見し、都度アドホックなAPI連携を書く代わりに、統一されたインターフェースを通じて呼び出せるようにします。なおセッションの扱いは仕様バージョンで異なります。2025-11-25仕様まではプロトコルレベルのセッションが定義されていましたが、これは常にステートフルであることを要求するものではありません。初期化応答でサーバーが
              <code>Mcp-Session-Id</code>
              ヘッダーを返した場合にかぎり、クライアントは以降のリクエストで同ヘッダーを付与する必要があり、サーバーが返さなければセッションIDを持たないステートレスな運用も仕様に沿った実装でした。これにより、N個のAIアプリケーションとM個のツールを個別に統合する「N×M問題」を解消することを目的としています（出典11）。
            </p>
            <p>
              MCPは2025年11月の1周年を経て、学生・個人開発者からスタートアップ・大企業のアーキテクトまで幅広いコミュニティによって仕様策定（Specification
              Enhancement
              Proposal）が進められる、ガバナンス構造を持つオープンプロジェクトへと成長しました（出典12）。2026年7月28日には最大級の改訂版である「2026-07-28」仕様が確定し、プロトコルレベルのセッション（
              <code>Mcp-Session-Id</code>
              ）を廃止してコア部分をステートレス化したうえで、サーバー側でUIを描画する「MCP
              Apps」拡張や長時間実行タスクに対応する「Tasks」拡張、より厳格なOAuth認可などが導入されています（出典13）。初学者がまず押さえるべきは、「ツールをどう定義し、モデルにどう発見させるか」という設計そのものが、規格化が進んでいるとはいえ依然として重要な設計課題である、という点です。
            </p>
            <p>
              Anthropicは、ツールの定義にもプロンプト本体と同じくらいの注意を払うべきだとし、これを「エージェント・コンピュータ・インターフェース（ACI）」と呼んでいます（出典2）。実際にSWE-bench向けのコーディングエージェントを構築した際には、プロンプト全体の調整よりもツールの調整に多くの時間を費やしたと報告されています。たとえば相対パスでのファイル指定はエージェントが作業ディレクトリを移動した後にミスを誘発しやすいため、常に絶対パスを要求するようツールを変更したところ、モデルは正確に扱えるようになったという事例が紹介されています（出典2）。ツール設計の実践的なポイントは次のとおりです。
            </p>
            <ul>
              <li>
                モデルの立場に立って、そのツールの使い方が説明とパラメータだけで自明かどうかを確認する。
              </li>
              <li>
                パラメータ名や説明文は、新人エンジニアへの丁寧なドキュメントを書くつもりで作る。
              </li>
              <li>
                実際にモデルにツールを使わせてみて、どこで間違えるかを観察し、改善を繰り返す。
              </li>
              <li>間違った使い方をしにくいように、引数の設計そのものを工夫する（ポカヨケ）。</li>
            </ul>
          </section>

          <section className="section prose" id="step6">
            <h2>
              <IconRobot size={18} className="ti" />
              Step 6: ワークフローとエージェントの設計パターン
            </h2>
            <p>
              ここが本ガイドの中核です。Anthropicは「エージェント的なシステム（Agentic
              System）」を、あらかじめ定義されたコードパスに沿ってLLMとツールを組み合わせる
              <strong>ワークフロー（Workflow）</strong>
              と、LLMが自らのプロセスやツール利用を動的に決定していく
              <strong>エージェント（Agent）</strong>の2種類に区別しています（出典2）。
            </p>

            <div className="callout">
              <p>
                <strong>ワークフロー</strong>:
                LLMとツールが、あらかじめ定義されたコードパスを通じてオーケストレーションされるシステム。
              </p>
              <p>
                <strong>エージェント</strong>:
                LLMが自らのプロセスとツール利用を動的に決定し、タスクの達成方法をコントロールし続けるシステム。
              </p>
            </div>

            <p>
              複雑さを増やす前に、まず「本当にエージェントが必要か」を問うことが推奨されています。エージェント的なシステムはレイテンシとコストを引き換えにタスク遂行能力を高めるものであり、多くのアプリケーションでは、検索と文脈内の例だけを備えた単発のLLM呼び出しで十分だとされています（出典2）。
            </p>

            <h3>ワークフローパターン1: プロンプトチェイニング</h3>
            <p>
              タスクを固定された一連のステップに分解し、各LLM呼び出しが前段の出力を処理します。中間ステップに「ゲート」と呼ばれるプログラム的なチェックを挟むことで、途中で軌道修正できます。マーケティング文章を作成してから翻訳する、文書のアウトラインを作成して基準を満たすか確認してから本文を書く、といったタスクに向いています（出典2）。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D6} />
              </div>
              <div className="diagram-caption">
                図6: プロンプトチェイニングのワークフロー<span className="src">（出典2）</span>
              </div>
            </div>

            <h3>ワークフローパターン2: ルーティング</h3>
            <p>
              入力を分類し、それぞれ専門化された後続処理に振り分けます。1種類の入力に最適化すると別の種類の性能が犠牲になるような場面で、関心を分離できます。カスタマーサポートの問い合わせを一般質問・返金依頼・技術サポートに振り分けたり、簡単な質問は軽量モデルへ、難しい質問は高性能モデルへルーティングしてコストと性能のバランスを取ったりする用途に向いています（出典2）。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D7} />
              </div>
              <div className="diagram-caption">
                図7: ルーティングのワークフロー<span className="src">（出典2）</span>
              </div>
            </div>

            <h3>ワークフローパターン3: 並列化（セクショニングと投票）</h3>
            <p>
              複数のLLM呼び出しを同時に走らせ、結果をプログラム的に集約します。「セクショニング」はタスクを独立したサブタスクに分割して並列実行する方法、「投票」は同じタスクを複数回実行して多様な出力を得る方法です。ガードレールの実装（1つのモデルがユーザー要求を処理し、別のモデルが不適切な内容をスクリーニングする）や、コードの脆弱性レビュー（複数のプロンプトがそれぞれ異なる観点でチェックする）などに使われます（出典2）。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D8} />
              </div>
              <div className="diagram-caption">
                図8: 並列化のワークフロー<span className="src">（出典2）</span>
              </div>
            </div>

            <h3>ワークフローパターン4: オーケストレーター・ワーカー</h3>
            <p>
              中心となるLLM（オーケストレーター）がタスクを動的に分解し、ワーカーLLMに委任し、結果を統合します。並列化と似た形に見えますが、サブタスクがあらかじめ定義されているのではなく、入力に応じてオーケストレーターが都度決定する点が異なります。複数ファイルに複雑な変更を加えるコーディングタスクや、複数の情報源から情報を集めて分析する検索タスクに向いています（出典2）。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D9} />
              </div>
              <div className="diagram-caption">
                図9: オーケストレーター・ワーカーのワークフロー
                <span className="src">（出典2）</span>
              </div>
            </div>

            <h3>ワークフローパターン5: 評価者・最適化ループ</h3>
            <p>
              1つのLLM呼び出しが応答を生成し、別のLLM呼び出しがループの中で評価とフィードバックを行います。評価基準が明確で、人間がフィードバックを与えることで応答が明確に改善する種類のタスクに特に有効です。文学作品の翻訳（評価者LLMが翻訳者LLMが最初に捉えきれなかったニュアンスを指摘する）や、複数回の検索と分析が必要な複雑な調査タスクなどに使われます（出典2）。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D10} />
              </div>
              <div className="diagram-caption">
                図10: 評価者・最適化ループのワークフロー<span className="src">（出典2）</span>
              </div>
            </div>

            <h3>自律型エージェント</h3>
            <p>
              ワークフローが人間の決めた道筋をなぞるのに対し、エージェントはタスクが明確になった後、人間からの指示や対話をきっかけに自律的に計画し、実行します。実行中は、ツールの呼び出し結果やコード実行結果など「環境からのグラウンドトゥルース」を各ステップで取得し、進捗を評価することが重要です。人間はチェックポイントやブロッカーに遭遇した時点でフィードバックを求められます。タスクは完了時に終了しますが、暴走を防ぐために最大反復回数などの停止条件を設けるのが一般的です（出典2）。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D11} />
              </div>
              <div className="diagram-caption">
                図11: 自律型エージェントのループ<span className="src">（出典2）</span>
              </div>
            </div>
            <p>
              エージェントは、必要なステップ数を事前に予測できず、固定された経路をハードコードできないような、オープンエンドな問題に向いています。ただしその自律性ゆえにコストが高くなりやすく、エラーが積み重なるリスクもあるため、サンドボックス環境での十分なテストと適切なガードレールが推奨されています（出典2）。
            </p>

            <h3>フレームワークは必要か</h3>
            <p>
              Anthropicは、Claude Agent SDKやAWSのStrands Agents
              SDK、ドラッグ&ドロップ型のRivet、Vellumなど多くのフレームワークが存在するとしつつも、「まずはLLM
              APIを直接使うところから始めることを勧める。多くのパターンは数行のコードで実装できる。フレームワークを使う場合も、内部で何が起きているかを理解しておくこと。実装の仮定を誤解することが、顧客のエラーの一般的な原因になっている」とアドバイスしています（出典2）。フレームワークの具体的な比較はStep
              8で扱います。
            </p>
          </section>
          <section className="section prose" id="step7">
            <h2>
              <IconDatabaseSearch size={18} className="ti" />
              Step 7: RAGでLLMに知識を与える
            </h2>

            <h3>RAGとは何か、なぜ必要か</h3>
            <p>
              RAG（Retrieval-Augmented
              Generation、検索拡張生成）は、LLMが応答を生成する前に、外部の知識ベースから関連文書を検索し、それをコンテキストとしてモデルに渡す仕組みです。静的な学習データだけに頼るのではなく、推論のたびに最新かつ検証可能な情報を取り込めるようにすることで、ハルシネーションを減らし、事実に基づいた回答を実現します（出典14）。ある実務ガイドは「素朴なRAGパイプラインはおよそ40%の確率で検索に失敗し、間違った文書に基づいた自信満々の回答を生成してしまう」と指摘しており、2026年時点でも検索精度こそがRAGの最大のボトルネックであり続けていると強調しています（出典15）。
            </p>

            <h3>RAGは一つの技術ではなくスペクトラム</h3>
            <p>
              2026年の実践では、RAGは単一の実装ではなく、クエリの複雑さに応じて適切な戦略を選ぶ「スペクトラム」として扱われるようになっています（出典16）。
            </p>

            <div className="table-wrap">
              <div className="table-title">表3: RAGの種類と適用場面（出典16, 出典17）</div>
              <table>
                <thead>
                  <tr>
                    <th>種類</th>
                    <th>向いているクエリ</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>素朴なRAG（Naive RAG）</td>
                    <td>単一の文書内で答えられる質問</td>
                    <td>ベクトル検索＋リランクのみ。高速・低コスト</td>
                  </tr>
                  <tr>
                    <td>高度なRAG（Advanced RAG）</td>
                    <td>2〜3件の文書統合が必要な質問</td>
                    <td>
                      ハイブリッド検索（ベクトル＋キーワード）、クエリ変換、リランキングを追加
                    </td>
                  </tr>
                  <tr>
                    <td>GraphRAG</td>
                    <td>エンティティ間の関係性を辿る必要がある質問</td>
                    <td>知識グラフを構築し、関係性をたどって検索する</td>
                  </tr>
                  <tr>
                    <td>エージェンティックRAG（Agentic RAG）</td>
                    <td>多段階の推論や反復的な検証が必要な質問</td>
                    <td>エージェントが検索クエリの分解・検索・検証・再検索を自律的に繰り返す</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              「Adaptive
              RAG（適応的RAG）」と呼ばれるパターンでは、まずクエリの複雑さを分類し、単純な質問には高速で低コストなパイプラインを、複雑な質問には多段階のエージェンティックな処理を割り当てることで、コストと品質の最適なバランスを取ります（出典16）。エージェンティックRAGは2026年の企業向けAIエージェントで支配的なパターンになりつつあると報告されていますが（出典17）、すべてのクエリに適用するのはコスト面で非効率であるため、複雑さに応じた出し分けが重要です。
            </p>

            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D12} />
              </div>
              <div className="diagram-caption">
                図12: Adaptive RAGのパイプライン選択フロー
                <span className="src">（出典16をもとに作成）</span>
              </div>
            </div>

            <h3>実装の基本要素</h3>
            <ul>
              <li>
                <strong>チャンキング</strong>:
                文書を検索可能な単位に分割します。固定長で機械的に分割すると、文や表の途中で切れてしまい、技術的には関連していても実質的に使えないチャンクになりがちです。意味的にまとまった単位で分割することが重要とされています（出典15）。
              </li>
              <li>
                <strong>埋め込みとベクトルデータベース</strong>:
                チャンクをベクトル化し、類似度検索できるデータベース（Pinecone、Weaviate、Qdrant、Milvus、Chromaなど）に格納します。
              </li>
              <li>
                <strong>ハイブリッド検索とリランキング</strong>:
                ベクトル検索（意味的類似度）とキーワード検索（BM25など）を組み合わせ、リランカーで最終的な順位を精緻化します。
              </li>
              <li>
                <strong>評価</strong>:
                RAGASのようなフレームワークを用いて、忠実性（Faithfulness、回答が検索結果に基づいているか）や関連性（Relevance）などを定量的に測定します（出典15）。詳しい評価手法はStep
                11で扱います。
              </li>
            </ul>
            <p>
              「RAGが失敗する場合、その原因の約73%は生成部分ではなく検索部分にある」という2026年の業界分析もあり（出典15）、初学者はまず検索の質を疑う習慣を持つとよいでしょう。
            </p>
          </section>

          <section className="section prose" id="step8">
            <h2>
              <IconApps size={18} className="ti" />
              Step 8: オーケストレーションフレームワークを選ぶ
            </h2>
            <p>
              Step
              6で見たように、Anthropicはまず生のAPI呼び出しから始めることを推奨していますが、統合の幅を広げたい場合や、チームでの開発効率を優先したい場合には、フレームワークの利用が現実的な選択肢になります。原著書籍が紹介していたLangChain・Haystack・Semantic
              Kernelという構図（出典0書籍）は現在も生きていますが、2026年にはLangChainからエージェントオーケストレーション専用の「LangGraph」が独立した主要コンポーネントとして定着し、LlamaIndexはRAGとデータ接続に特化したポジションを固めています（出典18）。
            </p>

            <div className="table-wrap">
              <div className="table-title">
                表4: 主要オーケストレーションフレームワークの比較（出典0書籍, 出典2, 出典18）
              </div>
              <table>
                <thead>
                  <tr>
                    <th>フレームワーク</th>
                    <th>得意領域</th>
                    <th>2026年の位置づけ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>LangChain / LangGraph</td>
                    <td>汎用オーケストレーション、状態を持つ複雑なエージェント</td>
                    <td>
                      LangGraphが分岐・ループ・人間参加型フローを持つエージェント構築の主要な選択肢に。統合数が非常に多い
                    </td>
                  </tr>
                  <tr>
                    <td>LlamaIndex</td>
                    <td>RAG、文書ベースの検索</td>
                    <td>
                      LlamaParseによる高精度な文書パース（表・図表を含む）が強み。データ取り込みと検索に特化
                    </td>
                  </tr>
                  <tr>
                    <td>Semantic Kernel</td>
                    <td>.NET/Microsoftエコシステムとの統合</td>
                    <td>エンタープライズ・Azure連携が中心</td>
                  </tr>
                  <tr>
                    <td>Haystack</td>
                    <td>検索・QAパイプライン構築</td>
                    <td>パイプライン指向のRAG構築ツールとして継続利用</td>
                  </tr>
                  <tr>
                    <td>Claude Agent SDK / Strands Agents SDK</td>
                    <td>エージェント基盤の直接構築</td>
                    <td>
                      Anthropic/AWSが提供する低レベルSDK。フレームワークの抽象化を薄く保ちたい場合に選ばれる
                    </td>
                  </tr>
                  <tr>
                    <td>Rivet / Vellum</td>
                    <td>ノーコード/ローコードでのワークフロー構築</td>
                    <td>GUIでのプロトタイピングや非エンジニアとの協業に向く</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              複数の2026年時点の比較記事に共通する結論は、「LangChain（LangGraph）とLlamaIndexは互いに排他的な選択肢ではなく、多くの本番アプリケーションでは両方を組み合わせている」という点です。具体的には、LlamaIndexで文書の取り込み・チャンキング・検索を担当し、LangGraphでいつ検索するか・いつ他のツールを使うか・いつ直接回答するかを判断するエージェントオーケストレーションを担当する、という役割分担です（出典18）。
            </p>

            <p>フレームワークを選ぶ際は、次の問いを自分に投げかけると判断しやすくなります。</p>
            <ul>
              <li>自分のタスクの重心は「検索」寄りか「エージェント的な意思決定」寄りか。</li>
              <li>
                チームは将来、モデルプロバイダーを切り替える可能性があるか（その場合、抽象化レイヤーの価値が上がる）。
              </li>
              <li>
                デバッグのしやすさをどこまで重視するか（抽象化が厚いほど、内部で何が起きているか追いにくくなる）。
              </li>
              <li>そもそも1回のAPI呼び出しで十分なタスクではないか。</li>
            </ul>
            <p>
              最後の問いは軽視されがちですが、Anthropicが繰り返し強調しているように、「複雑さは、それが明確に成果を改善する場合にのみ追加すべき」という原則は、フレームワーク選定にもそのまま当てはまります（出典2）。
            </p>
          </section>

          <section className="section prose" id="step9">
            <h2>
              <IconAdjustments size={18} className="ti" />
              Step 9: ファインチューニングは必要か
            </h2>
            <p>
              原著書籍の第11章はファインチューニングの技術的な手順に多くのページを割いていますが、2026年時点の実践知は「まずファインチューニングを検討する前に、より手軽な選択肢を使い切ること」を強く推奨しています。ある実務ガイドは、これを{" "}
              <strong>プロンプト → RAG → ファインチューニング → 蒸留</strong>{" "}
              という順序で捉えるべきだとし、「ファインチューニングに関する相談を受けるチームのほとんどは、まだファインチューニングをすべきではない。プロンプトを直し、実際に機能するRAGパイプラインを構築し、評価の仕組みを整える方が先だ」と述べています（出典19）。
            </p>

            <h3>何を変えたいのかを切り分ける</h3>
            <p>
              複数の情報源が共通して強調しているのは、この3技術が同じ問題を解決する代替手段ではなく、それぞれ異なる問題を解決する道具だという点です（出典20）。
            </p>
            <ul>
              <li>
                <strong>プロンプトエンジニアリング</strong>:
                モデルの振る舞いと知識の両方を、インフラに触れずに形作る。無料かつ即座に反映できる。
              </li>
              <li>
                <strong>RAG</strong>:
                モデルが「知っていること」を変える。動的・外部・専有の知識が必要な場合に有効。
              </li>
              <li>
                <strong>ファインチューニング</strong>:
                モデルの「振る舞い方」を変える。出力形式、口調、ドメイン固有の推論パターンなど、プロンプトだけでは安定しない一貫性が必要な場合に有効。ほとんどの場合、新しい事実を教え込む用途には向かない。
              </li>
            </ul>

            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D13} />
              </div>
              <div className="diagram-caption">
                図13: ファインチューニング要否の決定木
                <span className="src">（出典19, 出典20をもとに作成）</span>
              </div>
            </div>

            <h3>LoRA / QLoRAが主流になった理由</h3>
            <p>
              2026年時点で「フルファインチューニング（全パラメータの再学習）」が選ばれる場面は限られており、多くの場合はLoRA（Low-Rank
              Adaptation）やQLoRA（量子化を組み合わせたLoRA）のようなパラメータ効率の良い手法（PEFT）が使われます。LoRAはベースモデルの重みを凍結したまま小さなアダプター層だけを学習させることでコストを大幅に削減し、QLoRAはさらに4bit量子化を組み合わせることで、コンシューマー向けGPU1枚でも大規模モデルを調整できるようにします（出典21）。ある実務ガイドは、分類や抽出タスクであれば200〜500件程度の質の高いサンプルで十分な場合が多く、「データセットのサイズを追い求めて足踏みする」ことの方が問題になりやすいと指摘しています（出典20）。
            </p>

            <h3>見落とされがちな運用コスト</h3>
            <p>
              ファインチューニングを選んだ後も、アダプターのバージョン管理、ロールバック計画、再学習の頻度、ベースモデルのドリフト管理といった「運用の税金」が継続的に発生します。ホスティングプロバイダーがベースモデルを更新すると、アダプターの性能が静かに劣化することもあるため、四半期ごとの再検証を計画に組み込むことが推奨されています（出典19）。学習コストだけでなく、評価・データキュレーション・ライフサイクル管理を含めた総コストで判断することが重要です。
            </p>
          </section>
          <section className="section prose" id="step10">
            <h2>
              <IconPhotoVideo size={18} className="ti" />
              Step 10: マルチモーダル対応アプリケーションへの拡張
            </h2>
            <p>
              原著書籍の第10章が扱っているように、LLMアプリケーションはテキストだけでなく、画像・音声・動画・コードなど複数のモダリティを組み合わせることでより幅広いユースケースに対応できます（出典0書籍）。現在の主要なフロンティアモデルの多くはテキストと画像をネイティブに扱えるようになっており、請求書や図表を含む文書の解析、画面を見ながら操作するコンピュータ操作エージェント、音声インターフェースを持つアプリケーションなどが実用段階に入っています。
            </p>
            <p>
              マルチモーダル対応アプリケーションを設計する際の考え方は、これまでのステップで紹介した原則の延長線上にあります。
            </p>
            <ul>
              <li>
                <strong>Augmented LLMの拡張として捉える</strong>: 画像やコード実行環境も、Step
                5で紹介した「ツール」の一種として設計できます。
              </li>
              <li>
                <strong>単一のツールで完結させるか、複数のツールを組み合わせるかを検討する</strong>:
                たとえば画像解析と文章生成をひとつのモデル呼び出しで済ませられる場合と、専用の画像認識ツール・音声合成ツールを個別に呼び出して結果を統合する場合とでは、設計の複雑さとコストが大きく変わります。
              </li>
              <li>
                <strong>評価指標もモダリティごとに用意する</strong>: テキストの評価指標（Step
                11）をそのまま画像や音声の評価に流用できないことが多いため、モダリティごとの評価基準を別途設計する必要があります。
              </li>
            </ul>
            <p>
              マルチモーダルはモデルの進化が特に速い領域であるため、具体的な機能や対応モデルは公式ドキュメントで随時確認することを推奨します。
            </p>
          </section>

          <section className="section prose" id="step11">
            <h2>
              <IconReportAnalytics size={18} className="ti" />
              Step 11: 評価とオブザーバビリティ
            </h2>
            <p>
              「動くプロトタイプを作ること」と「本番品質のアプリケーションを作ること」の間には大きな溝があります。Chip
              Huyen氏（スタンフォード大学で機械学習システム設計を教え、ベストセラー{" "}
              <em>Designing Machine Learning Systems</em> および <em>AI Engineering</em>{" "}
              の著者）は、早くから「LLMで格好いいものを作るのは簡単だが、本番運用に耐えるものを作るのは非常に難しい」と指摘しており、その原因の一端はプロンプトエンジニアリングにおけるエンジニアリング的な厳密さの欠如にあるとしています（出典22）。この溝を埋めるのが評価（Evaluation）とオブザーバビリティ（Observability）です。
            </p>

            <h3>3層の評価構造</h3>
            <p>
              2026年の実務ガイドは、信頼できるエージェントを運用するために次の3つの評価層が必要だと整理しています（出典23）。
            </p>

            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D14} />
              </div>
              <div className="diagram-caption">
                図14: 評価とオブザーバビリティの3層構造
                <span className="src">（出典23をもとに作成）</span>
              </div>
            </div>

            <ol>
              <li>
                <strong>ユニット評価</strong>:
                検索結果の関連性やツール呼び出しの正しさなど、パイプラインの個々のステップを単体テストのように検証します。
              </li>
              <li>
                <strong>LLM-as-a-Judge回帰スイート</strong>:
                主観的な品質（トーンや網羅性など）を、別のLLMを評価者として使い、既知の入力に対する期待される出力と比較しながら継続的に採点します。
              </li>
              <li>
                <strong>本番トレースの継続監視</strong>:
                実際のトラフィックをサンプリングし、品質のドリフト（徐々の劣化）を検知します。問題のあったケースを、回帰テスト用のデータセットに昇格させることで、監視と評価のループを閉じます。
              </li>
            </ol>
            <p>
              あるオブザーバビリティ記事は、「ほとんどのエージェント障害はモデルの誤りではなく、ツール呼び出しの失敗・コンテキストの切り詰め・制御不能なループから生じており、通常のAPM（アプリケーション性能監視）ツールはエージェント専用の計測なしにこれらを検知できない」と指摘しています（出典24）。
            </p>

            <h3>主なツール</h3>
            <div className="table-wrap">
              <div className="table-title">
                表5: 評価・オブザーバビリティツールの比較（出典25, 出典26）
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ツール</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>LangSmith</td>
                    <td>LangChain/LangGraphとの統合が深い。トレーシングと評価を一体で提供</td>
                  </tr>
                  <tr>
                    <td>Braintrust</td>
                    <td>
                      評価（Eval）ファーストな設計。データセット・スコアラー・実験比較のワークフローに強い
                    </td>
                  </tr>
                  <tr>
                    <td>Langfuse</td>
                    <td>オープンソースでセルフホスト可能。トレーシングとプロンプト管理が中心</td>
                  </tr>
                  <tr>
                    <td>MLflow</td>
                    <td>
                      オープンソースでベンダー中立。トレース・評価・プロンプト最適化・ガバナンスを一つの基盤で提供
                    </td>
                  </tr>
                  <tr>
                    <td>Arize Phoenix / RAGAS / DeepEval</td>
                    <td>
                      忠実性・関連性・ハルシネーションなど、出力そのものを採点するオープンソースの評価ライブラリ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              どのツールを選ぶ場合でも、OpenTelemetryのような業界標準の計装レイヤーを使ってトレースをベンダー中立に保つことで、後からツールを入れ替えたり組み合わせたりしやすくなります（出典24）。
            </p>
          </section>
          <section className="section prose" id="step12">
            <h2>
              <IconShieldCheck size={18} className="ti" />
              Step 12: 安全性・ガードレール・責任あるAI
            </h2>
            <p>
              原著書籍の第12章「Responsible
              AI」は、モデルレベル・メタプロンプトレベル・ユーザーインターフェースレベルという3層でのアーキテクチャを提示していました（出典0書籍）。この考え方の骨格は現在も有効ですが、2026年にはより具体的な脅威モデルと規制の枠組みが整備されています。
            </p>

            <h3>主要な脅威：プロンプトインジェクション</h3>
            <p>
              OWASP（Open Worldwide Application Security
              Project）が公開している「LLMアプリケーションのためのTop
              10」では、プロンプトインジェクション（LLM01）が依然として最も重要な脆弱性カテゴリーとして挙げられています（出典27）。プロンプトインジェクションは、攻撃者が細工した入力によって、モデルとそれに接続されたツールにポリシー違反や意図しない操作を行わせる攻撃です。この問題が構造的に難しいのは、LLMが「指示」と「データ」を完全には区別できないためだとされています（出典27）。Simon
              Willison氏は2026年の予測として、「コーディングエージェントのセキュリティについて、いずれ大きな事故が起きるだろう。私自身を含め、多くの人がこれらのエージェントを事実上rootユーザーとして動かしている」と警鐘を鳴らしています（出典5）。
            </p>

            <h3>ガードレールの実装レイヤー</h3>
            <p>実務では、ガードレールを入力側と出力側の両方に配置するのが一般的です（出典28）。</p>
            <ul>
              <li>
                <strong>入力ガードレール</strong>:
                プロンプトインジェクション検知、入力のサニタイズ、トピック分類による対象外リクエストの拒否、PII（個人識別情報）検知、レート制限。
              </li>
              <li>
                <strong>出力ガードレール</strong>:
                トークシシティ検知、事実性チェック（検索結果との照合）、PIIスキャン、指示階層の強制（システムプロンプトがユーザー入力より優先されることの担保）。
              </li>
              <li>
                <strong>エージェント固有のガードレール</strong>:
                どのツールをどの権限で呼び出せるかの制御、会話メモリを悪用したコンテキスト操作攻撃への対策、監査ログの記録。
              </li>
            </ul>
            <p>
              NeMo Guardrails（NVIDIA、対話フローの制御に強み）、Guardrails
              AI（構造化出力の検証に強み）、LlamaFirewall（プロンプトインジェクション対策に特化）など、オープンソースのガードレールフレームワークも充実してきています（出典29）。
            </p>

            <div className="table-wrap">
              <div className="table-title">
                表6: OWASP Top 10 for LLM Applications 2026（抜粋）と対策の方向性（出典27, 出典28）
              </div>
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>内容</th>
                    <th>主な対策</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>LLM01:2026 プロンプトインジェクション</td>
                    <td>指示を上書き・迂回させる入力</td>
                    <td>入力の信頼境界を明確にし、指示階層を強制する</td>
                  </tr>
                  <tr>
                    <td>LLM02:2026 機密情報の漏洩</td>
                    <td>PIIや機密データの意図しない出力</td>
                    <td>出力側でのPII検知・レダクション</td>
                  </tr>
                  <tr>
                    <td>LLM05:2026 データとモデルのポイズニング</td>
                    <td>学習データ・ファインチューニングデータ・RAGの取り込み元への汚染</td>
                    <td>取り込み元の出所検証とデータ来歴の記録</td>
                  </tr>
                  <tr>
                    <td>LLM08:2026 隠れコンテキストの露出</td>
                    <td>
                      システムプロンプトに加え、検索文書・メモリ・ツール応答など、モデルに渡る非公開コンテキストの漏洩
                    </td>
                    <td>非公開コンテキストに機密を置かず、権限判定をアプリ側で行う</td>
                  </tr>
                  <tr>
                    <td>LLM09:2026 ベクトル/埋め込みの弱点</td>
                    <td>RAG経由での間接的なプロンプトインジェクション</td>
                    <td>検索結果にもガードレールを適用する</td>
                  </tr>
                  <tr>
                    <td>LLM10:2026 不適切な出力処理</td>
                    <td>出力をそのまま下流システムで実行してしまう</td>
                    <td>出力の検証・サニタイズをルールとして定義する</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>規制動向</h3>
            <p>
              EUのAI
              Act（AI規則）は2026年8月2日から一般適用が始まりました。ただし高リスクAIシステムの義務はDigital
              Omnibusによる改正で後ろ倒しされ、附属書III記載の単独型高リスクAIは2027年12月2日、EU製品安全法規の対象製品に組み込まれる附属書I該当の高リスクAIは2028年8月2日からの適用となります。いずれも正確性・堅牢性・サイバーセキュリティに関する対策が要求されます（出典30）。地域によって規制の内容や適用時期は異なるため、対象ユーザーの所在地に応じた最新の法令確認が必要です。
            </p>
          </section>

          <section className="section prose" id="step13">
            <h2>
              <IconRocket size={18} className="ti" />
              Step 13: 本番運用へ
            </h2>
            <p>
              最後に、アプリケーションを本番環境で安定して運用するための実践的なチェックポイントを整理します。
            </p>

            <h3>コストとレイテンシの最適化</h3>
            <ul>
              <li>
                <strong>モデルルーティング</strong>: Step 2・Step
                6で紹介したルーティングパターンを使い、簡単なリクエストは軽量モデルへ、難しいリクエストのみ高性能モデルへ回すことで、コストと品質のバランスを取ります。
              </li>
              <li>
                <strong>プロンプトキャッシュ</strong>:
                繰り返し使われるシステムプロンプトや長いコンテキストをキャッシュし、トークンコストとレイテンシを削減します。
              </li>
              <li>
                <strong>ストリーミングとバッチ処理</strong>:
                ユーザー向けの対話にはストリーミング応答で体感速度を改善し、リアルタイム性が不要な大量処理にはバッチAPIを活用してコストを抑えます。
              </li>
              <li>
                <strong>コンテキストの規律</strong>: Step
                4で述べたとおり、コンテキストは大きければ良いというものではありません。不要なトークンを削ぎ落とすことは、コスト削減だけでなく精度維持のためにも重要です。
              </li>
            </ul>

            <h3>経済性についての視点</h3>
            <p>
              Simon
              Willison氏は、AIによってコードを書くコストが劇的に下がることで需要そのものが何倍にも増える可能性がある、というジェヴォンズのパラドックスの観点から2026年以降を展望しています。もしこれが現実になれば、エンジニアの価値は「どれだけ速くコードを書けるか」ではなく「結果をどう検証し、システムの境界をどう守るか」に移っていくだろうと述べています（出典5）。この視点は、本ガイドで繰り返し強調してきた評価（Step
              11）とガードレール（Step
              12）への投資が、単なる品質管理ではなく長期的な競争力の源泉になることを示唆しています。
            </p>

            <h3>本番リリース前チェックリスト</h3>
            <p>
              下のチェック項目にチェックを入れながら、自分のアプリケーションの準備状況を確認してみましょう。
            </p>
            <LaunchChecklist items={CHECKLIST_ITEMS} />
          </section>
          <section className="section prose" id="summary">
            <h2>
              <IconMap2 size={18} className="ti" />
              まとめ：学習ロードマップ
            </h2>
            <p>
              ここまで13のステップを通じて、LLMアプリケーション開発の基礎から応用までを見てきました。最後に、初学者がどの順序でスキルを積み上げていくとよいか、学習の流れとしてまとめます。
            </p>

            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_D15} />
              </div>
              <div className="diagram-caption">図15: 初学者のための学習ロードマップ</div>
            </div>

            <p>
              本ガイドを通じて一貫して繰り返されたメッセージは、Anthropicのエンジニアリングチームの言葉に集約されています。「LLM分野での成功は、最も洗練されたシステムを作ることではない。自分のニーズに合った"正しい"システムを作ることだ。シンプルなプロンプトから始め、包括的な評価で最適化し、よりシンプルな解決策では不十分な場合にのみ多段階のエージェント的システムを追加する」（出典2）。これは技術トレンドが移り変わっても変わらない、実践知の核心だと言えるでしょう。
            </p>
          </section>

          <section className="section prose" id="references">
            <h2>
              <IconBooks size={18} className="ti" />
              参考文献・ソース一覧
            </h2>
            <p>
              本ガイドの作成にあたり参照した情報源です。本文中の「出典N」は、以下の同じ番号の項目に対応します（番号は文書全体で一意で、カテゴリごとに振り直していません）。書籍情報およびモデル名・価格・ベンチマーク数値は執筆時点（2026年9月9日）のものであり、その後変更されている可能性があります。
            </p>

            <div className="ref-group-title">元ネタとなった書籍</div>
            <div className="ref-card">
              <div className="ref-num">0</div>
              <div className="ref-body">
                <span className="ref-title">
                  Valentina Alto, <em>Building LLM Powered Applications</em>, Packt Publishing,
                  2024年5月刊
                </span>
                <Ext
                  href="https://www.oreilly.com/library/view/building-llm-powered/9781835462317/"
                  className="ref-url"
                >
                  https://www.oreilly.com/library/view/building-llm-powered/9781835462317/
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">著名な国際的開発者・研究者による情報源</div>
            <div className="ref-card">
              <div className="ref-num">1</div>
              <div className="ref-body">
                <span className="ref-title">
                  Andrej Karpathy, "Software Is Changing (Again)" YC AI Startup
                  School講演（2025年6月）の書き起こし・解説
                </span>
                <Ext href="https://www.donnamagi.com/articles/karpathy-yc-talk" className="ref-url">
                  https://www.donnamagi.com/articles/karpathy-yc-talk
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">5</div>
              <div className="ref-body">
                <span className="ref-title">
                  Simon Willison, "LLM predictions for
                  2026"（コーディングエージェントのセキュリティに関する見解の紹介記事）
                </span>
                <Ext
                  href="https://www.wandoosystems.com/resources/llm-predictions-2026-willison"
                  className="ref-url"
                >
                  https://www.wandoosystems.com/resources/llm-predictions-2026-willison
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">22</div>
              <div className="ref-body">
                <span className="ref-title">
                  Chip Huyen, "Building LLM Applications for Production", 2023年
                </span>
                <Ext
                  href="https://huyenchip.com/2023/04/11/llm-engineering.html"
                  className="ref-url"
                >
                  https://huyenchip.com/2023/04/11/llm-engineering.html
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">Anthropic公式</div>
            <div className="ref-card">
              <div className="ref-num">2</div>
              <div className="ref-body">
                <span className="ref-title">Anthropic, "Building effective agents"</span>
                <Ext
                  href="https://www.anthropic.com/engineering/building-effective-agents"
                  className="ref-url"
                >
                  https://www.anthropic.com/engineering/building-effective-agents
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">7</div>
              <div className="ref-body">
                <span className="ref-title">
                  Anthropic, "Best practices for prompt engineering for 2026"
                </span>
                <Ext
                  href="https://claude.com/blog/best-practices-for-prompt-engineering"
                  className="ref-url"
                >
                  https://claude.com/blog/best-practices-for-prompt-engineering
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">8</div>
              <div className="ref-body">
                <span className="ref-title">
                  Anthropic, "Effective context engineering for AI agents"
                </span>
                <Ext
                  href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
                  className="ref-url"
                >
                  https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">9</div>
              <div className="ref-body">
                <span className="ref-title">
                  Anthropic, "Engineering at Anthropic"（エンジニアリングブログ一覧）
                </span>
                <Ext href="https://www.anthropic.com/engineering" className="ref-url">
                  https://www.anthropic.com/engineering
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">モデル選定・市場動向</div>
            <div className="ref-card">
              <div className="ref-num">3</div>
              <div className="ref-body">
                <span className="ref-title">
                  "Best LLMs Right Now: September 2026 Model Rankings & Use Cases"
                </span>
                <Ext
                  href="https://azumo.com/artificial-intelligence/ai-insights/top-10-llms-0625"
                  className="ref-url"
                >
                  https://azumo.com/artificial-intelligence/ai-insights/top-10-llms-0625
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">4</div>
              <div className="ref-body">
                <span className="ref-title">
                  "The Best LLMs in 2026: A Plain-English Comparison"
                </span>
                <Ext
                  href="https://mindshub.ai/blog/navigating-the-llm-landscape-a-comparative-analysis-of-leading-large-language-models"
                  className="ref-url"
                >
                  https://mindshub.ai/blog/navigating-the-llm-landscape-a-comparative-analysis-of-leading-large-language-models
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">6</div>
              <div className="ref-body">
                <span className="ref-title">
                  "LangChain vs LlamaIndex"（LLM市場動向・モデルルーティングを含む比較記事）
                </span>
                <Ext
                  href="https://contracollective.com/blog/langchain-vs-llamaindex-llm-orchestration-2026"
                  className="ref-url"
                >
                  https://contracollective.com/blog/langchain-vs-llamaindex-llm-orchestration-2026
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">コンテキストエンジニアリング</div>
            <div className="ref-card">
              <div className="ref-num">10</div>
              <div className="ref-body">
                <span className="ref-title">
                  Kelly Hong, Anton Troynikov, Jeff Huber（Chroma）, "Context Rot: How Increasing
                  Input Tokens Impacts LLM Performance", 2025年7月14日
                </span>
                <Ext href="https://www.trychroma.com/research/context-rot" className="ref-url">
                  https://www.trychroma.com/research/context-rot
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">Model Context Protocol公式</div>
            <div className="ref-card">
              <div className="ref-num">11</div>
              <div className="ref-body">
                <span className="ref-title">Model Context Protocol 公式サイト</span>
                <Ext href="https://modelcontextprotocol.io/" className="ref-url">
                  https://modelcontextprotocol.io/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">12</div>
              <div className="ref-body">
                <span className="ref-title">"One Year of MCP: November 2025 Spec Release"</span>
                <Ext
                  href="https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/"
                  className="ref-url"
                >
                  https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">13</div>
              <div className="ref-body">
                <span className="ref-title">"The 2026-07-28 Specification"（確定版）</span>
                <Ext
                  href="https://modelcontextprotocol.io/specification/2026-07-28"
                  className="ref-url"
                >
                  https://modelcontextprotocol.io/specification/2026-07-28
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">RAGに関する情報源</div>
            <div className="ref-card">
              <div className="ref-num">14</div>
              <div className="ref-body">
                <span className="ref-title">
                  "What Is RAG? How Retrieval-Augmented Generation Works in 2026"
                </span>
                <Ext href="https://atlan.com/know/what-is-rag/" className="ref-url">
                  https://atlan.com/know/what-is-rag/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">15</div>
              <div className="ref-body">
                <span className="ref-title">"RAG Production Guide 2026"</span>
                <Ext
                  href="https://lushbinary.com/blog/rag-retrieval-augmented-generation-production-guide/"
                  className="ref-url"
                >
                  https://lushbinary.com/blog/rag-retrieval-augmented-generation-production-guide/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">16</div>
              <div className="ref-body">
                <span className="ref-title">
                  "RAG Techniques Compared: A Practical Guide to Retrieval Augmented Generation in
                  2026"
                </span>
                <Ext
                  href="https://blog.starmorph.com/blog/rag-techniques-compared-best-practices-guide"
                  className="ref-url"
                >
                  https://blog.starmorph.com/blog/rag-techniques-compared-best-practices-guide
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">17</div>
              <div className="ref-body">
                <span className="ref-title">"20 Advanced RAG Types to Know in 2026"</span>
                <Ext href="https://www.turingpost.com/p/ragtypes" className="ref-url">
                  https://www.turingpost.com/p/ragtypes
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">フレームワーク比較に関する情報源</div>
            <div className="ref-card">
              <div className="ref-num">18</div>
              <div className="ref-body">
                <span className="ref-title">
                  "LangChain vs LlamaIndex 2026: Complete Framework Guide"
                </span>
                <Ext
                  href="https://itsourcecode.com/ai-framework/langchain-vs-llamaindex-2026-complete-guide/"
                  className="ref-url"
                >
                  https://itsourcecode.com/ai-framework/langchain-vs-llamaindex-2026-complete-guide/
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">ファインチューニングに関する情報源</div>
            <div className="ref-card">
              <div className="ref-num">19</div>
              <div className="ref-body">
                <span className="ref-title">
                  "Fine-Tuning LLMs in 2026: When RAG Isn't Enough (and When It Still Is)"
                </span>
                <Ext
                  href="https://bigdataboutique.com/blog/fine-tuning-llms-when-rag-isnt-enough"
                  className="ref-url"
                >
                  https://bigdataboutique.com/blog/fine-tuning-llms-when-rag-isnt-enough
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">20</div>
              <div className="ref-body">
                <span className="ref-title">
                  "RAG vs Fine-Tuning in 2026: A Decision Framework for LLM Teams"
                </span>
                <Ext
                  href="https://winder.ai/rag-vs-fine-tuning-2026-decision-framework/"
                  className="ref-url"
                >
                  https://winder.ai/rag-vs-fine-tuning-2026-decision-framework/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">21</div>
              <div className="ref-body">
                <span className="ref-title">
                  Dettmers, T. et al., "QLoRA: Efficient Finetuning of Quantized LLMs"
                  (arXiv:2305.14314)
                </span>
                <Ext href="https://arxiv.org/abs/2305.14314" className="ref-url">
                  https://arxiv.org/abs/2305.14314
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">評価・オブザーバビリティに関する情報源</div>
            <div className="ref-card">
              <div className="ref-num">23</div>
              <div className="ref-body">
                <span className="ref-title">
                  "Agent Observability 2026: Evals, Traces, Cost Guide"
                </span>
                <Ext
                  href="https://www.digitalapplied.com/blog/agent-observability-2026-evals-traces-cost-guide"
                  className="ref-url"
                >
                  https://www.digitalapplied.com/blog/agent-observability-2026-evals-traces-cost-guide
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">24</div>
              <div className="ref-body">
                <span className="ref-title">
                  "Top 5 LLM and Agent Observability Tools in 2026"（MLflow）
                </span>
                <Ext href="https://mlflow.org/top-5-agent-observability-tools/" className="ref-url">
                  https://mlflow.org/top-5-agent-observability-tools/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">25</div>
              <div className="ref-body">
                <span className="ref-title">
                  "Top LLM Observability and Evaluation Platforms in 2026"
                </span>
                <Ext
                  href="https://www.marktechpost.com/2026/08/09/top-llm-observability-and-evaluation-platforms-in-2026-langfuse-langsmith-braintrust-arize-and-more-compared/"
                  className="ref-url"
                >
                  https://www.marktechpost.com/2026/08/09/top-llm-observability-and-evaluation-platforms-in-2026-langfuse-langsmith-braintrust-arize-and-more-compared/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">26</div>
              <div className="ref-body">
                <span className="ref-title">
                  "Book Review: AI Engineering by Chip Huyen"（評価手法の解説を含む）
                </span>
                <Ext href="https://hippocampus-garden.com/book_review_huyen/" className="ref-url">
                  https://hippocampus-garden.com/book_review_huyen/
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">安全性・ガードレール・責任あるAIに関する情報源</div>
            <div className="ref-card">
              <div className="ref-num">27</div>
              <div className="ref-body">
                <span className="ref-title">
                  OWASP GenAI Security Project, "OWASP Top 10 for LLM Applications"
                </span>
                <Ext href="https://genai.owasp.org/llm-top-10/" className="ref-url">
                  https://genai.owasp.org/llm-top-10/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">28</div>
              <div className="ref-body">
                <span className="ref-title">
                  "The Complete AI Guardrails Implementation Guide for 2026"
                </span>
                <Ext
                  href="https://www.getmaxim.ai/articles/the-complete-ai-guardrails-implementation-guide-for-2026/"
                  className="ref-url"
                >
                  https://www.getmaxim.ai/articles/the-complete-ai-guardrails-implementation-guide-for-2026/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">29</div>
              <div className="ref-body">
                <span className="ref-title">
                  "LlamaFirewall: An open source guardrail system for building secure AI agents"
                </span>
                <Ext href="https://arxiv.org/pdf/2505.03574" className="ref-url">
                  https://arxiv.org/pdf/2505.03574
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">規制に関する情報源</div>
            <div className="ref-card">
              <div className="ref-num">30</div>
              <div className="ref-body">
                <span className="ref-title">
                  European Commission, "AI Act"（適用時期を含む公式解説ページ）
                </span>
                <Ext
                  href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
                  className="ref-url"
                >
                  https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
                </Ext>
              </div>
            </div>

            <div className="ref-group-title">補足資料（本文では直接引用していない参考リンク）</div>
            <div className="ref-card">
              <div className="ref-num">
                <IconPlus size={18} className="ti" />
              </div>
              <div className="ref-body">
                <span className="ref-title">
                  Simon Willison, llm-coding-agent リリースノート（2026年7月）
                </span>
                <Ext
                  href="https://simonwillison.net/2026/Jul/2/llm-coding-agent/"
                  className="ref-url"
                >
                  https://simonwillison.net/2026/Jul/2/llm-coding-agent/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">
                <IconPlus size={18} className="ti" />
              </div>
              <div className="ref-body">
                <span className="ref-title">
                  Simon Willisonのブログの活動状況まとめ（agentic-engineering, coding-agentsタグ）
                </span>
                <Ext href="https://tomrochette.com/agents/simon-willison/" className="ref-url">
                  https://tomrochette.com/agents/simon-willison/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">
                <IconPlus size={18} className="ti" />
              </div>
              <div className="ref-body">
                <span className="ref-title">
                  Chip Huyen, <em>AI Engineering: Building Applications with Foundation Models</em>
                  （O'Reilly）書誌情報
                </span>
                <Ext
                  href="https://www.amazon.com/AI-Engineering-Building-Applications-Foundation/dp/1098166302"
                  className="ref-url"
                >
                  https://www.amazon.com/AI-Engineering-Building-Applications-Foundation/dp/1098166302
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">
                <IconPlus size={18} className="ti" />
              </div>
              <div className="ref-body">
                <span className="ref-title">MCP Roadmap</span>
                <Ext href="https://modelcontextprotocol.io/development/roadmap" className="ref-url">
                  https://modelcontextprotocol.io/development/roadmap
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">
                <IconPlus size={18} className="ti" />
              </div>
              <div className="ref-body">
                <span className="ref-title">
                  "Model Context Protocol（MCP）explained: A practical technical overview"
                </span>
                <Ext
                  href="https://codilime.com/blog/model-context-protocol-explained/"
                  className="ref-url"
                >
                  https://codilime.com/blog/model-context-protocol-explained/
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">
                <IconPlus size={18} className="ti" />
              </div>
              <div className="ref-body">
                <span className="ref-title">
                  "Fine-Tuning vs RAG vs Prompt Engineering [2026 Framework]"
                </span>
                <Ext
                  href="https://www.kunalganglani.com/blog/fine-tuning-vs-rag-prompt-engineering"
                  className="ref-url"
                >
                  https://www.kunalganglani.com/blog/fine-tuning-vs-rag-prompt-engineering
                </Ext>
              </div>
            </div>
            <div className="ref-card">
              <div className="ref-num">
                <IconPlus size={18} className="ti" />
              </div>
              <div className="ref-body">
                <span className="ref-title">
                  "LLM Guardrails: The Complete Guide to AI Safety Guardrails (2026)"
                </span>
                <Ext
                  href="https://aisecurityandsafety.org/en/guides/llm-guardrails/"
                  className="ref-url"
                >
                  https://aisecurityandsafety.org/en/guides/llm-guardrails/
                </Ext>
              </div>
            </div>
          </section>

          <div className="footer">
            本ガイドはWeb検索によって収集した2026年9月9日時点の情報をもとに作成しています。LLM関連の技術・製品・価格・ベンチマーク順位は変化が非常に速い領域のため、実際の意思決定にあたっては必ず各社の公式ドキュメントや最新のベンチマーク結果を確認してください。
          </div>
        </main>
      </div>
    </div>
  );
}
