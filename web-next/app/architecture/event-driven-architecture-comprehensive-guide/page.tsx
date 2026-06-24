import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import EdaSidebar, { type NavGroup } from "./EdaSidebar";

export const metadata: Metadata = {
  title: "⚡ EDA完全ガイド | イベント駆動アーキテクチャ",
  description:
    "Event-Driven Architecture（EDA）の基礎概念から実装パターン、Apache Kafka・AWS EventBridge・Event Sourcing・CQRS までをステップバイステップで解説する完全ガイド。",
};

// ── サイドバー nav（元 HTML のグルーピング順を保持。連番ではない点に注意） ──
const NAV_GROUPS: NavGroup[] = [
  {
    title: "基礎知識",
    items: [
      { id: "sec-1", num: "01", label: "EDAとは何か" },
      { id: "sec-2", num: "02", label: "基本構成要素" },
      { id: "sec-3", num: "03", label: "イベントの種類と設計" },
      { id: "sec-4", num: "04", label: "メッセージブローカー" },
    ],
  },
  {
    title: "パターン",
    items: [
      { id: "sec-5", num: "05", label: "トポロジーパターン" },
      { id: "sec-8", num: "08", label: "イベントソーシング" },
      { id: "sec-9", num: "09", label: "CQRS" },
    ],
  },
  {
    title: "主要ツール",
    items: [
      { id: "sec-6", num: "06", label: "Apache Kafka" },
      { id: "sec-7", num: "07", label: "AWS EventBridge" },
    ],
  },
  {
    title: "信頼性・運用",
    items: [
      { id: "sec-10", num: "10", label: "エラーハンドリング" },
      { id: "sec-11", num: "11", label: "セキュリティ設計" },
      { id: "sec-12", num: "12", label: "監視・オブザーバビリティ" },
    ],
  },
  {
    title: "実践",
    items: [
      { id: "sec-13", num: "13", label: "ECサイト完全事例" },
      { id: "sec-14", num: "14", label: "ベストプラクティス" },
      { id: "sec-15", num: "15", label: "アンチパターン" },
      { id: "sec-16", num: "16", label: "参考文献" },
    ],
  },
];

// ─── Mermaid ダイアグラム定義 ───
// ラベル内改行は `\\n`（Mermaid のリテラル改行）、ステートメント区切りは実改行・左端揃え。
const D_EDA_VS_REQ = `flowchart TD
  subgraph REQ["❌ リクエスト駆動型（従来）"]
    direction LR
    RC["クライアント"] -->|"①注文作成"| RO["注文サービス"]
    RO -->|"②在庫減らして"| RS["在庫サービス"]
    RO -->|"③決済して"| RP["決済サービス"]
    RO -->|"④メール送って"| RN["通知サービス"]
    RO -->|"⑤配送手配"| RD["配送サービス"]
  end
  subgraph EDA["✅ イベント駆動型（EDA）"]
    direction LR
    EC["クライアント"] -->|"注文確定"| EO["注文サービス"]
    EO -->|"OrderPlacedEvent 発行"| EB["イベントバス\\nEvent Bus"]
    EB -->|"購読"| ES["在庫サービス"]
    EB -->|"購読"| EP["決済サービス"]
    EB -->|"購読"| EN["通知サービス"]
    EB -->|"購読"| ED["配送サービス"]
  end
  style REQ fill:#1a0a0a,stroke:#ef4444
  style EDA fill:#0a1a0a,stroke:#10b981
  style EB fill:#f59e0b,color:#000`;

const D_USECASES = `flowchart LR
  ROOT(["⚡ EDA 適用\\nユースケース"])
  RT["🔴 リアルタイム処理"]
  RT1["📊 リアルタイム分析\\n・ダッシュボード"]
  RT2["🌐 IoT センサー\\nデータ処理"]
  RT3["📈 株価・為替\\nストリーム処理"]
  MS["🟢 マイクロサービス連携"]
  MS1["🛒 注文処理\\nワークフロー"]
  MS2["📦 在庫・配送\\n・通知の連携"]
  MS3["👤 ユーザー行動\\nログ収集"]
  BG["🟣 非同期バックグラウンド"]
  BG1["📧 メール・プッシュ\\n通知送信"]
  BG2["📄 レポート\\n・帳票生成"]
  BG3["🎬 画像・動画の\\n変換処理"]
  SI["🟠 システム統合"]
  SI1["🏛️ レガシー\\nシステム連携"]
  SI2["🔗 サードパーティ\\nAPI 連携"]
  SI3["☁️ マルチクラウド\\n間同期"]
  ROOT --> RT
  ROOT --> MS
  ROOT --> BG
  ROOT --> SI
  RT --> RT1
  RT --> RT2
  RT --> RT3
  MS --> MS1
  MS --> MS2
  MS --> MS3
  BG --> BG1
  BG --> BG2
  BG --> BG3
  SI --> SI1
  SI --> SI2
  SI --> SI3
  style ROOT fill:#0f3460,stroke:#00d4ff,stroke-width:3px,color:#00d4ff,font-weight:bold
  style RT fill:#3b0d0d,stroke:#ef4444,stroke-width:2px,color:#fca5a5,font-weight:bold
  style RT1 fill:#1a0808,stroke:#ef4444,color:#fca5a5
  style RT2 fill:#1a0808,stroke:#ef4444,color:#fca5a5
  style RT3 fill:#1a0808,stroke:#ef4444,color:#fca5a5
  style MS fill:#0d3b1a,stroke:#10b981,stroke-width:2px,color:#6ee7b7,font-weight:bold
  style MS1 fill:#071a0d,stroke:#10b981,color:#6ee7b7
  style MS2 fill:#071a0d,stroke:#10b981,color:#6ee7b7
  style MS3 fill:#071a0d,stroke:#10b981,color:#6ee7b7
  style BG fill:#1e0d3b,stroke:#8b5cf6,stroke-width:2px,color:#c4b5fd,font-weight:bold
  style BG1 fill:#0d0718,stroke:#8b5cf6,color:#c4b5fd
  style BG2 fill:#0d0718,stroke:#8b5cf6,color:#c4b5fd
  style BG3 fill:#0d0718,stroke:#8b5cf6,color:#c4b5fd
  style SI fill:#3b2000,stroke:#f59e0b,stroke-width:2px,color:#fcd34d,font-weight:bold
  style SI1 fill:#1a0f00,stroke:#f59e0b,color:#fcd34d
  style SI2 fill:#1a0f00,stroke:#f59e0b,color:#fcd34d
  style SI3 fill:#1a0f00,stroke:#f59e0b,color:#fcd34d`;

const D_COMPONENTS = `flowchart LR
  P["📤 プロデューサー\\n注文サービス / センサー"] -->|"① イベント発行"| B["🔀 ブローカー\\nKafka / EventBridge"]
  B -->|"② イベント配信"| C1["📥 在庫サービス"]
  B -->|"② イベント配信"| C2["📥 決済サービス"]
  B -->|"② イベント配信"| C3["📥 通知サービス"]
  C1 -->|"③ 新イベント発行"| B
  style P fill:#1e3a5f,color:#e2e8f0
  style B fill:#92400e,color:#fde68a
  style C1 fill:#14532d,color:#e2e8f0
  style C2 fill:#14532d,color:#e2e8f0
  style C3 fill:#14532d,color:#e2e8f0`;

const D_SCHEMA_EVOLUTION = `flowchart LR
  subgraph V1["イベント v1.0"]
    V1D["order_id: string\\ncustomer_id: string\\ntotal: number"]
  end
  subgraph V2["イベント v2.0 ✅ 後方互換"]
    V2D["order_id: string\\ncustomer_id: string\\ntotal: number\\ncurrency: string ← 追加\\nitems: array ← 追加"]
  end
  subgraph V3["イベント v3.0 ⚠️ 破壊的変更"]
    V3D["order_id: string\\ncustomer_id: string\\ntotal_amount: number ← 名称変更\\ncurrency: string\\nitems: array"]
  end
  V1 -->|"フィールド追加のみ\\n後方互換OK"| V2
  V2 -->|"フィールド名変更\\n並行運用が必要"| V3
  style V1 fill:#1e3a5f
  style V2 fill:#14532d
  style V3 fill:#78350f`;

const D_BROKER_SELECT = `flowchart TD
  START["ブローカー選定を開始"]
  Q1{"AWSを主に\\n使用しているか？"}
  Q2{"イベントを\\n再生・保存したいか？"}
  Q3{"スループットが\\n秒間100万件以上か？"}
  Q4{"GCPを主に\\n使用しているか？"}
  Q5{"複雑なルーティング\\nロジックが必要か？"}
  EB["✅ AWS EventBridge\\nサーバーレス・マネージド"]
  KN["✅ Amazon Kinesis\\nAWS リアルタイムストリーミング"]
  KF["✅ Apache Kafka\\n高スループット・永続化"]
  RQ["✅ RabbitMQ\\n柔軟なメッセージルーティング"]
  PS["✅ Google Cloud Pub/Sub\\nGCP マネージドストリーミング"]
  START --> Q1
  Q1 -->|"Yes"| Q2
  Q1 -->|"No"| Q4
  Q2 -->|"Yes（ストリーミング）"| KN
  Q2 -->|"No（シンプルキュー）"| EB
  Q4 -->|"Yes"| PS
  Q4 -->|"No（オンプレ/マルチ）"| Q5
  Q5 -->|"Yes"| RQ
  Q5 -->|"No"| Q3
  Q3 -->|"Yes"| KF
  Q3 -->|"No"| RQ
  style EB fill:#14532d
  style KN fill:#14532d
  style KF fill:#14532d
  style RQ fill:#14532d
  style PS fill:#14532d`;

const D_MEDIATOR = `flowchart TD
  I["🚀 OrderPlacedEvent\\n（注文確定）"]
  M["🎯 仲介者\\nEvent Mediator\\n（AWS Step Functions）"]
  P1["⚙️ 在庫確認"]
  P2["💳 決済処理"]
  P3["📧 通知送信"]
  P4["🚚 配送手配"]
  I --> M
  M -->|"① 在庫確認イベント"| P1
  P1 -->|"在庫確認完了"| M
  M -->|"② 決済イベント"| P2
  P2 -->|"決済完了"| M
  M -->|"③ 通知イベント"| P3
  M -->|"④ 配送イベント"| P4
  style M fill:#7f1d1d,color:#fca5a5
  style I fill:#1e3a5f,color:#e2e8f0`;

const D_BROKER_TOPOLOGY = `flowchart LR
  OS["📦 注文サービス"]
  BK["🔀 イベントブローカー\\nKafka / EventBridge"]
  ST["🏭 在庫サービス\\nOrderPlaced → 在庫引当\\n→ StockReserved 発行"]
  PS["💳 決済サービス\\nOrderPlaced → 決済処理\\n→ PaymentProcessed 発行"]
  NS["📧 通知サービス\\nOrderPlaced → メール送信"]
  SH["🚚 配送サービス\\nPaymentProcessed → 配送手配\\n→ ShipmentCreated 発行"]
  OS -->|"OrderPlacedEvent"| BK
  BK -->|"購読"| ST
  BK -->|"購読"| PS
  BK -->|"購読"| NS
  ST -->|"StockReservedEvent"| BK
  PS -->|"PaymentProcessedEvent"| BK
  BK -->|"購読"| SH
  style OS fill:#1e3a5f
  style BK fill:#92400e,color:#fde68a
  style SH fill:#4c1d95`;

const D_SAGA = `sequenceDiagram
  participant CLI as クライアント
  participant ORD as 注文サービス
  participant STK as 在庫サービス
  participant PAY as 決済サービス
  participant SHP as 配送サービス
  Note over ORD,SHP: 正常フロー
  CLI->>ORD: 注文作成リクエスト
  ORD-->>CLI: orderId 返却（即座）
  ORD--)STK: OrderCreatedEvent
  STK->>STK: 在庫引当
  STK--)PAY: StockReservedEvent
  PAY->>PAY: 決済処理
  PAY--)SHP: PaymentCompletedEvent
  SHP->>SHP: 配送手配
  SHP--)ORD: ShipmentCreatedEvent
  ORD->>ORD: ステータス → CONFIRMED
  Note over ORD,SHP: 補償トランザクション（決済失敗時）
  PAY-xPAY: 決済失敗！
  PAY--)STK: PaymentFailedEvent
  STK->>STK: 在庫引当を解除（補償）
  STK--)ORD: StockReleasedEvent
  ORD->>ORD: ステータス → CANCELLED`;

const D_KAFKA_ARCH = `flowchart TD
  subgraph PROD["📤 プロデューサー群"]
    P1["注文サービス"]
    P2["在庫サービス"]
    P3["ユーザーサービス"]
  end
  subgraph KC["🔶 Kafka クラスター"]
    subgraph B1["Broker 1"]
      T1["orders P0\\n(Leader)"]
      T2["orders P1\\n(Follower)"]
    end
    subgraph B2["Broker 2"]
      T3["orders P0\\n(Follower)"]
      T4["orders P1\\n(Leader)"]
    end
    ZK["ZooKeeper / KRaft\\nクラスター管理"]
  end
  subgraph CONS["📥 コンシューマーグループ"]
    CG1["分析サービス\\nGroup: analytics"]
    CG2["通知ワーカー1\\nGroup: notification"]
    CG3["通知ワーカー2\\nGroup: notification"]
  end
  P1 --> T1
  P2 --> T2
  P3 --> T4
  T1 --> CG1
  T4 --> CG1
  T1 --> CG2
  T4 --> CG3
  B1 <-->|"レプリケーション"| B2
  ZK <--> B1
  ZK <--> B2
  style KC fill:#0a1a0a,stroke:#f59e0b
  style ZK fill:#7f1d1d,color:#fca5a5`;

const D_EVENTBRIDGE = `flowchart TD
  subgraph SRC["📤 イベントソース"]
    A1["AWSサービス\\nEC2/S3/RDS"]
    A2["カスタムアプリ\\nマイクロサービス"]
    A3["SaaSパートナー\\nSalesforce/Zendesk"]
  end
  subgraph EB["☁️ AWS EventBridge"]
    BUS["🚌 イベントバス\\nDefault / Custom / Partner"]
    RULE["📋 イベントルール\\nJSONパターンマッチング"]
    SCH["📐 スキーマレジストリ\\nスキーマ検証・コード生成"]
  end
  subgraph TGT["📥 ターゲット"]
    LM["⚡ Lambda"]
    SQ["📬 SQS"]
    SN["📣 SNS"]
    SF["🔄 Step Functions"]
    KN["📊 Kinesis"]
  end
  A1 --> BUS
  A2 --> BUS
  A3 --> BUS
  BUS --> RULE
  RULE --> LM
  RULE --> SQ
  RULE --> SN
  RULE --> SF
  RULE --> KN
  BUS <--> SCH
  style EB fill:#451a03,stroke:#f59e0b
  style BUS fill:#78350f,color:#fde68a
  style RULE fill:#78350f,color:#fde68a`;

const D_EVENT_SOURCING = `flowchart LR
  subgraph TRAD["❌ 従来の状態保存"]
    TD["注文テーブル\\nstatus: CANCELLED\\ntotal: 15000\\n過去の経緯は不明"]
  end
  subgraph ES["✅ イベントソーシング"]
    E1["OrderCreated\\n2024-01-01 10:00"]
    E2["ItemAdded\\n2024-01-01 10:01"]
    E3["OrderConfirmed\\n2024-01-01 10:05"]
    E4["PaymentCompleted\\n2024-01-01 10:10"]
    E5["OrderCancelled\\n2024-01-05 15:00"]
    E1 --> E2 --> E3 --> E4 --> E5
    RB["🔄 イベントを再生して\\n現在の状態を再構築\\n(完全な監査ログ・タイムトラベル)"]
    E5 --> RB
  end
  style TRAD fill:#1a0a0a,stroke:#ef4444
  style ES fill:#0a1a0a,stroke:#10b981
  style E5 fill:#7f1d1d,color:#fca5a5`;

const D_CQRS = `flowchart TD
  subgraph WR["✍️ 書き込みサイド（Command）"]
    CMD["コマンド\\nCreateOrder / CancelOrder"]
    AGG["集約\\nOrderAggregate"]
    ESS["イベントストア\\n(Event Sourcing)"]
    EVP["イベント発行\\nOrderPlacedEvent"]
    CMD --> AGG --> ESS
    AGG --> EVP
  end
  subgraph BUS2["🔀 イベントバス（Kafka）"]
    BN["イベントバス"]
  end
  subgraph RD["📖 読み取りサイド（Query）"]
    PR1["プロジェクション 1\\n注文サマリー\\n(PostgreSQL)"]
    PR2["プロジェクション 2\\n顧客注文履歴\\n(Elasticsearch)"]
    PR3["プロジェクション 3\\n売上分析\\n(Redis)"]
    QA["クエリ API\\nGET /orders/:id"]
  end
  EVP --> BN
  BN --> PR1
  BN --> PR2
  BN --> PR3
  PR1 --> QA
  PR2 --> QA
  PR3 --> QA
  style WR fill:#1e3a5f,stroke:#00d4ff
  style BUS2 fill:#451a03,stroke:#f59e0b
  style RD fill:#0a1a0a,stroke:#10b981`;

const D_DLQ = `flowchart LR
  PR["📤 プロデューサー"]
  MQ["📬 メインキュー"]
  CS["📥 コンシューマー"]
  DLQ["💀 Dead Letter Queue\\n処理失敗メッセージを格納"]
  AL["🔔 アラート\\nCloudWatch / PagerDuty"]
  DH["🔧 DLQ ハンドラー\\n手動確認・修正・再投入"]
  PR -->|"メッセージ発行"| MQ
  MQ -->|"配信"| CS
  CS -->|"✅ 処理成功 ACK"| MQ
  CS -->|"❌ 3回リトライ後に失敗"| DLQ
  DLQ --> AL
  DLQ --> DH
  DH -->|"修正後に再投入"| MQ
  style DLQ fill:#7f1d1d,color:#fca5a5
  style AL fill:#78350f,color:#fde68a
  style DH fill:#1e3a5f`;

const D_CIRCUIT_BREAKER = `stateDiagram-v2
  [*] --> CLOSED : 初期状態
  CLOSED --> CLOSED : ✅ 処理成功
  CLOSED --> OPEN : ❌ 失敗率がしきい値超過\\n（例：5秒間に50%失敗）
  OPEN --> OPEN : 🚫 すべてのリクエストを即拒否\\nフォールバックを返す
  OPEN --> HALF_OPEN : ⏱️ タイムアウト後\\n（例：30秒経過）
  HALF_OPEN --> CLOSED : ✅ テスト成功\\nサービス回復
  HALF_OPEN --> OPEN : ❌ テスト失敗\\nまだ回復していない`;

const D_TRACING = `sequenceDiagram
  participant CLI as クライアント
  participant API as 注文 API
  participant KFK as Kafka
  participant STK as 在庫ワーカー
  participant PAY as 決済ワーカー
  participant JGR as Jaeger / Zipkin
  Note over CLI,JGR: correlation_id: trace-abc-123 で全体を追跡
  CLI->>API: POST /orders [trace-abc-123]
  API->>JGR: Span: order-api-create
  API->>KFK: OrderPlacedEvent [trace-abc-123]
  KFK-->>API: ack
  KFK->>STK: OrderPlacedEvent [trace-abc-123]
  STK->>JGR: Span: stock-worker-reserve
  STK->>KFK: StockReservedEvent [trace-abc-123]
  KFK->>PAY: StockReservedEvent [trace-abc-123]
  PAY->>JGR: Span: payment-worker-process
  Note over JGR: 全スパンを統合してトレース全体を可視化`;

const D_EC_ARCH = `flowchart TD
  subgraph FE["🖥️ フロントエンド"]
    WEB["Web App (React)"]
    MOB["Mobile App (iOS/Android)"]
  end
  subgraph API["🌐 API レイヤー"]
    GW["API Gateway\\n(認証・レート制限)"]
    OA["注文 API"]
    PA["商品 API"]
  end
  subgraph EVL["⚡ イベントレイヤー（Apache Kafka）"]
    TO["Topic: orders\\nPartitions: 12"]
    TP["Topic: payments\\nPartitions: 6"]
    TI["Topic: inventory\\nPartitions: 6"]
  end
  subgraph WK["⚙️ イベントワーカー"]
    IW["在庫ワーカー\\n(Kubernetes)"]
    PW["決済ワーカー\\n(Kubernetes)"]
    NW["通知ワーカー\\n(Lambda)"]
    SW["配送ワーカー\\n(Kubernetes)"]
    AW["分析ワーカー\\n(Spark Streaming)"]
  end
  subgraph DS["🗄️ データストア"]
    ODB["注文 DB\\n(PostgreSQL)"]
    RDB["読み取り DB\\n(Elasticsearch)"]
    DWH["DWH\\n(Snowflake)"]
  end
  WEB & MOB --> GW --> OA & PA
  OA -->|"OrderPlacedEvent"| TO
  TO --> IW & PW & NW
  IW -->|"StockReservedEvent"| TI
  PW -->|"PaymentCompletedEvent"| TP
  TP --> SW & NW
  TO & TP & TI --> AW
  IW --> ODB
  AW --> DWH
  OA & PA --> RDB
  style EVL fill:#0a1a0a,stroke:#f59e0b
  style API fill:#0a0a2a,stroke:#00d4ff
  style WK fill:#0a1a0a,stroke:#10b981`;

const D_EC_FLOW = `sequenceDiagram
  participant USR as ユーザー
  participant ORD as 注文サービス
  participant KFK as Kafka
  participant STK as 在庫サービス
  participant PAY as 決済サービス
  participant SHP as 配送サービス
  participant NTF as 通知サービス
  USR->>ORD: 注文確定ボタンをクリック
  ORD->>ORD: 注文を作成（PENDING）
  ORD-->>USR: orderId 返却（即座）
  ORD--)KFK: OrderPlacedEvent
  Note right of KFK: 非同期処理開始
  par 並行処理
    KFK--)STK: OrderPlacedEvent
    STK->>STK: 在庫確認・引当
    STK--)KFK: StockReservedEvent
  and
    KFK--)NTF: OrderPlacedEvent
    NTF->>USR: 注文受付確認メール
  end
  KFK--)PAY: StockReservedEvent
  PAY->>PAY: 決済処理
  PAY--)KFK: PaymentCompletedEvent
  par 並行処理
    KFK--)SHP: PaymentCompletedEvent
    SHP->>SHP: 配送手配
    SHP--)KFK: ShipmentCreatedEvent
  and
    KFK--)NTF: PaymentCompletedEvent
    NTF->>USR: 決済完了・発送準備メール
  end
  KFK--)ORD: ShipmentCreatedEvent
  ORD->>ORD: ステータス → SHIPPED`;

const D_AP_CHECK = `flowchart TD
  S["EDA アーキテクチャ健全性チェック"]
  Q1{"コンシューマーが\\nイベント処理後に\\nDBを頻繁に参照？"}
  Q2{"1つのイベントに\\n50フィールド以上？"}
  Q3{"DLQ にメッセージが\\n毎日大量に溜まる？"}
  Q4{"コンシューマーラグが\\n常時1000件以上？"}
  F1["📦 ペイロードを自己完結型に\\n必要な情報をイベントに含める"]
  F2["✂️ イベントを適切な粒度に分割\\n責務ごとに別イベントへ"]
  F3["🔧 べき等性とリトライ処理を改善\\nDLQ分析でパターンを特定"]
  F4["📈 コンシューマーをスケールアウト\\nパーティション数とインスタンス数を増やす"]
  OK["✅ 健全な EDA アーキテクチャ"]
  S --> Q1
  Q1 -->|"Yes"| F1
  Q1 -->|"No"| Q2
  Q2 -->|"Yes"| F2
  Q2 -->|"No"| Q3
  Q3 -->|"Yes"| F3
  Q3 -->|"No"| Q4
  Q4 -->|"Yes"| F4
  Q4 -->|"No"| OK
  style OK fill:#14532d,color:#d1fae5
  style F1 fill:#1e3a5f
  style F2 fill:#1e3a5f
  style F3 fill:#1e3a5f
  style F4 fill:#1e3a5f`;

// ─── コードブロック（手書き span ハイライト・highlight.js 非依存） ───
const CODE_ORDER_PLACED = `<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass, field, asdict
<span class="kw">from</span> datetime <span class="kw">import</span> datetime, timezone
<span class="kw">from</span> uuid <span class="kw">import</span> uuid4
<span class="kw">import</span> json

<span class="fn">@dataclass</span>(frozen=<span class="kw">True</span>)   <span class="cm"># frozen=True: イミュータブル（変更不可）</span>
<span class="kw">class</span> <span class="fn">EventMetadata</span>:
    <span class="cm">"""すべてのイベントに共通するメタデータ"""</span>
    event_id: str = field(default_factory=<span class="kw">lambda</span>: str(uuid4()))
    occurred_at: str = field(default_factory=<span class="kw">lambda</span>: datetime.now(timezone.utc).isoformat())
    version: str = <span class="st">"1.0"</span>
    correlation_id: str = field(default_factory=<span class="kw">lambda</span>: str(uuid4()))

<span class="fn">@dataclass</span>(frozen=<span class="kw">True</span>)
<span class="kw">class</span> <span class="fn">OrderPlacedEvent</span>:
    <span class="cm">"""
    注文が確定されたことを表すドメインイベント
    設計ポイント:
      1. 名前は必ず過去形: OrderPlaced（注文が確定した）
      2. イミュータブル: frozen=True で変更不可
      3. 自己完結型: 受信者がDBを参照しなくてよい情報を含む
    """</span>
    event_type: str = <span class="st">"order.placed"</span>
    source: str = <span class="st">"order-service"</span>
    metadata: EventMetadata = field(default_factory=EventMetadata)
    order_id: str = <span class="st">""</span>
    customer_id: str = <span class="st">""</span>
    customer_email: str = <span class="st">""</span>
    total_amount: float = <span class="nu">0.0</span>
    currency: str = <span class="st">"JPY"</span>
    items: list = field(default_factory=list)

    <span class="kw">def</span> <span class="fn">to_json</span>(self) -> str:
        <span class="kw">return</span> json.dumps(asdict(self), ensure_ascii=<span class="kw">False</span>)

<span class="cm"># ─── 使用例 ───</span>
event = OrderPlacedEvent(
    order_id=<span class="st">"order_12345"</span>,
    customer_id=<span class="st">"cust_67890"</span>,
    customer_email=<span class="st">"user@example.com"</span>,
    total_amount=<span class="nu">15000.0</span>,
    items=[{<span class="st">"product_id"</span>: <span class="st">"prod_001"</span>, <span class="st">"name"</span>: <span class="st">"Tシャツ"</span>, <span class="st">"quantity"</span>: <span class="nu">2</span>, <span class="st">"price"</span>: <span class="nu">5000</span>}]
)
print(event.to_json())`;

const CODE_KAFKA_PRODUCER = `<span class="kw">from</span> kafka <span class="kw">import</span> KafkaProducer
<span class="kw">from</span> kafka.errors <span class="kw">import</span> KafkaError
<span class="kw">from</span> uuid <span class="kw">import</span> uuid4
<span class="kw">from</span> datetime <span class="kw">import</span> datetime, timezone
<span class="kw">import</span> json, logging
logger = logging.getLogger(__name__)

<span class="kw">class</span> <span class="fn">OrderEventProducer</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, bootstrap_servers: list[str]):
        self._producer = KafkaProducer(
            bootstrap_servers=bootstrap_servers,
            value_serializer=<span class="kw">lambda</span> v: json.dumps(v, ensure_ascii=<span class="kw">False</span>).encode(<span class="st">"utf-8"</span>),
            key_serializer=<span class="kw">lambda</span> k: k.encode(<span class="st">"utf-8"</span>) <span class="kw">if</span> k <span class="kw">else</span> <span class="kw">None</span>,
            acks=<span class="st">"all"</span>,            <span class="cm"># すべてのレプリカへの書き込み確認を待つ</span>
            retries=<span class="nu">3</span>,             <span class="cm"># 失敗時のリトライ回数</span>
            retry_backoff_ms=<span class="nu">100</span>,
            batch_size=<span class="nu">16384</span>,      <span class="cm"># バッチサイズ（16KB）</span>
            linger_ms=<span class="nu">10</span>,          <span class="cm"># バッチ待機時間（throughput向上）</span>
            compression_type=<span class="st">"gzip"</span>,
        )

    <span class="kw">def</span> <span class="fn">publish_order_placed</span>(self, order: dict) -> <span class="kw">None</span>:
        event = {
            <span class="st">"event_type"</span>: <span class="st">"order.placed"</span>,
            <span class="st">"event_id"</span>:   str(uuid4()),
            <span class="st">"occurred_at"</span>: datetime.now(timezone.utc).isoformat(),
            <span class="st">"version"</span>:    <span class="st">"1.0"</span>,
            <span class="st">"order_id"</span>:   order[<span class="st">"id"</span>],
            <span class="st">"customer_id"</span>: order[<span class="st">"customer_id"</span>],
            <span class="st">"total_amount"</span>: order[<span class="st">"total_amount"</span>],
            <span class="st">"items"</span>:      order[<span class="st">"items"</span>],
        }
        <span class="kw">try</span>:
            <span class="cm"># order_id をキーにすることで同じ注文のイベントが</span>
            <span class="cm"># 同じパーティションに送られ、順序が保証される</span>
            future = self._producer.send(
                topic=<span class="st">"orders"</span>,
                key=order[<span class="st">"id"</span>],    <span class="cm"># ← パーティションキー（順序保証）</span>
                value=event,
            )
            meta = future.get(timeout=<span class="nu">10</span>)  <span class="cm"># 同期待機（送信確認）</span>
            logger.info(<span class="st">f"発行成功: partition={meta.partition}, offset={meta.offset}"</span>)
        <span class="kw">except</span> KafkaError <span class="kw">as</span> e:
            logger.error(<span class="st">f"発行失敗: {e}"</span>)
            <span class="kw">raise</span>

    <span class="kw">def</span> <span class="fn">close</span>(self):
        self._producer.flush()
        self._producer.close()`;

const CODE_KAFKA_CONSUMER = `<span class="kw">from</span> kafka <span class="kw">import</span> KafkaConsumer
<span class="kw">import</span> json, logging
logger = logging.getLogger(__name__)

<span class="kw">class</span> <span class="fn">InventoryEventConsumer</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, bootstrap_servers: list[str]):
        self._consumer = KafkaConsumer(
            <span class="st">"orders"</span>,
            bootstrap_servers=bootstrap_servers,
            group_id=<span class="st">"inventory-service"</span>,    <span class="cm"># コンシューマーグループID</span>
            value_deserializer=<span class="kw">lambda</span> v: json.loads(v.decode(<span class="st">"utf-8"</span>)),
            auto_offset_reset=<span class="st">"earliest"</span>,    <span class="cm"># 初回は最初から読む</span>
            enable_auto_commit=<span class="kw">False</span>,        <span class="cm"># 手動コミット（確実な処理のため）</span>
            max_poll_records=<span class="nu">100</span>,
        )

    <span class="kw">def</span> <span class="fn">start</span>(self):
        <span class="kw">try</span>:
            <span class="kw">for</span> message <span class="kw">in</span> self._consumer:
                <span class="kw">try</span>:
                    self._process_event(message.value)
                    self._consumer.commit()  <span class="cm"># 処理成功後にオフセットをコミット</span>
                <span class="kw">except</span> Exception <span class="kw">as</span> e:
                    logger.error(<span class="st">f"処理エラー: {e}"</span>)
                    self._send_to_dlq(message.value, str(e))
        <span class="kw">finally</span>:
            self._consumer.close()

    <span class="kw">def</span> <span class="fn">_process_event</span>(self, event: dict):
        <span class="kw">if</span> event.get(<span class="st">"event_type"</span>) != <span class="st">"order.placed"</span>:
            <span class="kw">return</span>
        <span class="cm"># べき等性チェック: 同じevent_idを2度処理しない</span>
        <span class="kw">if</span> self._already_processed(event[<span class="st">"event_id"</span>]):
            logger.info(<span class="st">f"重複イベントをスキップ: {event['event_id']}"</span>)
            <span class="kw">return</span>
        self._reserve_stock(event[<span class="st">"order_id"</span>], event[<span class="st">"items"</span>])
        self._mark_as_processed(event[<span class="st">"event_id"</span>])  <span class="cm"># Redisなどで管理</span>

    <span class="kw">def</span> <span class="fn">_already_processed</span>(self, event_id: str) -> bool:
        <span class="kw">return</span> <span class="kw">False</span>  <span class="cm"># 実際はRedis等で処理済みIDを管理</span>

    <span class="kw">def</span> <span class="fn">_reserve_stock</span>(self, order_id: str, items: list):
        <span class="kw">for</span> item <span class="kw">in</span> items:
            logger.info(<span class="st">f"在庫引当: {item['product_id']} x {item['quantity']}"</span>)

    <span class="kw">def</span> <span class="fn">_mark_as_processed</span>(self, event_id: str): <span class="kw">pass</span>
    <span class="kw">def</span> <span class="fn">_send_to_dlq</span>(self, event: dict, error: str):
        logger.error(<span class="st">f"DLQへ送信: error={error}"</span>)`;

const CODE_EVENTBRIDGE_TF = `<span class="cm"># カスタムイベントバスの作成</span>
resource <span class="st">"aws_cloudwatch_event_bus"</span> <span class="st">"orders"</span> {
  name = <span class="st">"orders-event-bus"</span>
}

<span class="cm"># 注文確定イベントを在庫LambdaへルーティングするRule</span>
resource <span class="st">"aws_cloudwatch_event_rule"</span> <span class="st">"order_to_inventory"</span> {
  name           = <span class="st">"order-placed-to-inventory"</span>
  event_bus_name = aws_cloudwatch_event_bus.orders.name

  <span class="cm"># イベントパターン: source + detail-type でフィルタリング</span>
  event_pattern = jsonencode({
    source        = [<span class="st">"com.myapp.order-service"</span>]
    "detail-type" = [<span class="st">"OrderPlaced"</span>]
    detail = {
      total_amount = [{ numeric = [<span class="st">"&gt;="</span>, <span class="nu">1000</span>] }]  <span class="cm"># 1000円以上のみ</span>
    }
  })
}

<span class="cm"># ターゲット（Lambda）の設定</span>
resource <span class="st">"aws_cloudwatch_event_target"</span> <span class="st">"inventory_lambda"</span> {
  rule           = aws_cloudwatch_event_rule.order_to_inventory.name
  event_bus_name = aws_cloudwatch_event_bus.orders.name
  target_id      = <span class="st">"InventoryServiceLambda"</span>
  arn            = aws_lambda_function.inventory_service.arn

  dead_letter_config {           <span class="cm"># 失敗時のDLQ設定（必須！）</span>
    arn = aws_sqs_queue.event_dlq.arn
  }
  retry_policy {
    maximum_event_age_in_seconds = <span class="nu">3600</span>  <span class="cm"># 最大1時間リトライ</span>
    maximum_retry_attempts       = <span class="nu">3</span>
  }
}`;

const CODE_ORDER_AGGREGATE = `<span class="kw">class</span> <span class="fn">OrderAggregate</span>:
    <span class="cm">"""
    イベントソーシングによる注文集約。
    状態変更はイベントを通じてのみ行う。
    現在の状態はイベントの再生から導出する。
    """</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(self, order_id: str):
        self._id, self._status, self._items = order_id, <span class="st">"INITIAL"</span>, []
        self._total, self._version = <span class="nu">0.0</span>, <span class="nu">0</span>
        self._uncommitted_events: list[dict] = []

    <span class="cm"># ── コマンドハンドラー（ビジネスルールを検証してイベントを生成）──</span>
    <span class="kw">def</span> <span class="fn">create</span>(self, customer_id: str):
        <span class="kw">if</span> self._status != <span class="st">"INITIAL"</span>:
            <span class="kw">raise</span> ValueError(<span class="st">"すでに作成済みです"</span>)
        self._apply_and_record({<span class="st">"event_type"</span>: <span class="st">"OrderCreated"</span>, <span class="st">"customer_id"</span>: customer_id})

    <span class="kw">def</span> <span class="fn">add_item</span>(self, product_id: str, name: str, price: float, qty: int):
        <span class="kw">if</span> self._status != <span class="st">"PENDING"</span>:
            <span class="kw">raise</span> ValueError(<span class="st">"PENDING状態でのみ商品を追加できます"</span>)
        self._apply_and_record({<span class="st">"event_type"</span>:<span class="st">"ItemAdded"</span>,<span class="st">"product_id"</span>:product_id,
                                 <span class="st">"name"</span>:name,<span class="st">"price"</span>:price,<span class="st">"quantity"</span>:qty})

    <span class="kw">def</span> <span class="fn">confirm</span>(self):
        <span class="kw">if</span> self._status != <span class="st">"PENDING"</span>:
            <span class="kw">raise</span> ValueError(<span class="st">"PENDING状態でのみ注文を確定できます"</span>)
        <span class="kw">if</span> <span class="kw">not</span> self._items: <span class="kw">raise</span> ValueError(<span class="st">"商品が1件もありません"</span>)
        self._apply_and_record({<span class="st">"event_type"</span>: <span class="st">"OrderConfirmed"</span>})

    <span class="kw">def</span> <span class="fn">cancel</span>(self, reason: str):
        <span class="kw">if</span> self._status <span class="kw">in</span> (<span class="st">"SHIPPED"</span>, <span class="st">"DELIVERED"</span>):
            <span class="kw">raise</span> ValueError(<span class="st">"発送済みはキャンセルできません"</span>)
        self._apply_and_record({<span class="st">"event_type"</span>: <span class="st">"OrderCancelled"</span>, <span class="st">"reason"</span>: reason})

    <span class="cm"># ── イベントアプライヤー（純粋な状態更新・副作用なし）──</span>
    <span class="kw">def</span> <span class="fn">_apply_event</span>(self, event: dict):
        t = event[<span class="st">"event_type"</span>]
        <span class="kw">if</span> t == <span class="st">"OrderCreated"</span>:   self._status = <span class="st">"PENDING"</span>
        <span class="kw">elif</span> t == <span class="st">"ItemAdded"</span>:
            self._items.append(event)
            self._total += event[<span class="st">"price"</span>] * event[<span class="st">"quantity"</span>]
        <span class="kw">elif</span> t == <span class="st">"OrderConfirmed"</span>: self._status = <span class="st">"CONFIRMED"</span>
        <span class="kw">elif</span> t == <span class="st">"OrderCancelled"</span>: self._status = <span class="st">"CANCELLED"</span>
        self._version += <span class="nu">1</span>

    <span class="kw">def</span> <span class="fn">_apply_and_record</span>(self, event_data: dict):
        self._apply_event(event_data)
        self._uncommitted_events.append(event_data)

    <span class="fn">@classmethod</span>
    <span class="kw">def</span> <span class="fn">rebuild_from_events</span>(cls, order_id: str, events: list[dict]):
        <span class="cm">"""保存されたイベント履歴から集約を再構築する（リプレイ）"""</span>
        agg = cls(order_id)
        <span class="kw">for</span> ev <span class="kw">in</span> events:
            agg._apply_event(ev)  <span class="cm"># ビジネスルールを通さず直接適用</span>
        <span class="kw">return</span> agg`;

const CODE_RETRY = `<span class="kw">import</span> time, random, logging
<span class="kw">from</span> typing <span class="kw">import</span> Callable, Any
<span class="kw">from</span> functools <span class="kw">import</span> wraps
logger = logging.getLogger(__name__)

<span class="kw">def</span> <span class="fn">exponential_backoff_retry</span>(
    max_retries: int = <span class="nu">3</span>,
    base_delay: float = <span class="nu">1.0</span>,
    max_delay: float = <span class="nu">60.0</span>,
    jitter: bool = <span class="kw">True</span>,        <span class="cm"># Thundering Herd問題を防ぐランダム要素</span>
    exceptions: tuple = (Exception,),
):
    <span class="cm">"""
    指数バックオフ + ジッターによるリトライデコレーター

    ジッターを加えることで、複数のコンシューマーが同時にリトライして
    サービスに負荷が集中する「Thundering Herd問題」を防ぐ。
    待機時間: 1s → 2s → 4s → 8s（最大max_delay秒まで）
    """</span>
    <span class="kw">def</span> <span class="fn">decorator</span>(func: Callable) -> Callable:
        <span class="fn">@wraps</span>(func)
        <span class="kw">def</span> <span class="fn">wrapper</span>(*args, **kwargs) -> Any:
            last_exc = <span class="kw">None</span>
            <span class="kw">for</span> attempt <span class="kw">in</span> range(max_retries + <span class="nu">1</span>):
                <span class="kw">try</span>:
                    <span class="kw">return</span> func(*args, **kwargs)
                <span class="kw">except</span> exceptions <span class="kw">as</span> e:
                    last_exc = e
                    <span class="kw">if</span> attempt == max_retries:
                        logger.error(<span class="st">f"最大リトライ到達: {func.__name__}, error={e}"</span>)
                        <span class="kw">raise</span>
                    delay = min(base_delay * (<span class="nu">2</span> ** attempt), max_delay)
                    <span class="kw">if</span> jitter:
                        delay = delay * (<span class="nu">0.5</span> + random.random())  <span class="cm"># ±50%のランダム要素</span>
                    logger.warning(<span class="st">f"リトライ {attempt+1}/{max_retries}: {delay:.2f}秒後"</span>)
                    time.sleep(delay)
            <span class="kw">raise</span> last_exc
        <span class="kw">return</span> wrapper
    <span class="kw">return</span> decorator

<span class="cm"># ─── 使用例 ───</span>
<span class="fn">@exponential_backoff_retry</span>(max_retries=<span class="nu">3</span>, base_delay=<span class="nu">1.0</span>)
<span class="kw">def</span> <span class="fn">process_order_event</span>(event: dict) -> <span class="kw">None</span>:
    <span class="cm">"""注文イベントを処理する（自動リトライ付き）"""</span>
    inventory_service.reserve_stock(event[<span class="st">"items"</span>])`;

export default function EventDrivenArchitectureGuidePage() {
  return (
    <div className="event-driven-architecture-comprehensive-guide">
      <EdaSidebar groups={NAV_GROUPS} />
      <main className="main">
        <div className="hero">
          <div className="hero-eyebrow">⚡ Complete Architecture Guide</div>
          <h1 className="hero-title">
            <span>EDA</span> — イベント駆動
            <br />
            アーキテクチャ完全ガイド
          </h1>
          <p className="hero-desc">
            Event-Driven
            Architecture（EDA）は、現代のスケーラブルなシステム設計の根幹をなすアーキテクチャスタイルです。本ガイドでは初学者から上級者まで、EDAの基礎概念から実践的な実装パターン、Apache
            Kafka・AWS EventBridgeの使い方までステップバイステップで徹底解説します。
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">16</div>
              <div className="hero-stat-label">セクション</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">14+</div>
              <div className="hero-stat-label">アーキテクチャ図</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">5+</div>
              <div className="hero-stat-label">コード例</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">30+</div>
              <div className="hero-stat-label">ベストプラクティス</div>
            </div>
          </div>
          <div className="hero-tags">
            <span className="tag blue">Apache Kafka</span>
            <span className="tag orange">AWS EventBridge</span>
            <span className="tag green">Event Sourcing</span>
            <span className="tag purple">CQRS</span>
            <span className="tag blue">Saga Pattern</span>
            <span className="tag green">マイクロサービス</span>
          </div>
        </div>

        {/* ═══ SECTION 1 ═══ */}
        <section className="section" id="sec-1">
          <div className="sec-header">
            <span className="sec-num">SECTION 01</span>
            <span className="sec-icon">⚡</span>
            <div>
              <h2 className="sec-title">EDAとは何か？</h2>
              <p className="sec-subtitle">定義・課題解決・ユースケース</p>
            </div>
          </div>
          <div className="hl-box">
            <div className="hl-box-title">💡 核心思想</div>
            <div className="hl-box-desc">
              「何かが起きたこと（イベント）を通知し、それに反応する。各コンポーネントは互いの存在を直接知らなくてよい。」
              <br />
              サービス同士は<strong>イベントを通じて間接的に通信</strong>
              するため、変更の影響を局所化できます。
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">1.1 従来のリクエスト駆動型 vs EDA</h3>
            <p>
              従来の同期型API連携では、注文サービスが在庫・決済・通知・配送の各サービスを
              <strong>順番に直接呼び出す</strong>
              ため、1つのサービスが遅延すると全体に影響します。EDAでは
              <code>OrderPlacedEvent</code>を発行するだけで、各サービスが
              <strong>独立して非同期に反応</strong>します。
            </p>
            <div className="diag-wrap">
              <div className="diag-title">アーキテクチャ比較：リクエスト駆動型 vs EDA</div>
              <MermaidDiagram chart={D_EDA_VS_REQ} />
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">1.2 EDAが解決する4つの問題</h3>
            <div className="cg c2">
              <div className="card ac-red">
                <div className="card-icon">🔗</div>
                <div className="card-title">
                  密結合 → <span style={{ color: "var(--gn)" }}>疎結合</span>
                </div>
                <div className="card-desc">
                  サービス間の直接依存をなくし、1つの障害が全体に波及しない設計を実現。コンポーネントは互いの存在を知らなくてよい。
                </div>
              </div>
              <div className="card ac-orange">
                <div className="card-icon">⏱️</div>
                <div className="card-title">
                  同期ブロック → <span style={{ color: "var(--gn)" }}>非同期処理</span>
                </div>
                <div className="card-desc">
                  応答を待たない設計で高スループット・低レイテンシを達成。ピーク時の負荷をイベントキューで吸収できる。
                </div>
              </div>
              <div className="card ac-purple">
                <div className="card-icon">🔧</div>
                <div className="card-title">
                  改修困難 → <span style={{ color: "var(--gn)" }}>拡張容易</span>
                </div>
                <div className="card-desc">
                  新機能は「イベントを購読するだけ」で追加可能。既存のプロデューサーコードに一切触れない。
                </div>
              </div>
              <div className="card ac-blue">
                <div className="card-icon">📈</div>
                <div className="card-title">
                  スケール困難 → <span style={{ color: "var(--gn)" }}>独立スケール</span>
                </div>
                <div className="card-desc">
                  コンシューマーはそれぞれ独立してスケールアウト。ボトルネックとなるサービスだけを増強できる。
                </div>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">1.3 EDAが適しているユースケース</h3>
            <div className="diag-wrap">
              <div className="diag-title">EDA 適用ユースケース マインドマップ</div>
              <MermaidDiagram chart={D_USECASES} />
            </div>
            <div className="mbox tip">
              <div className="mbox-title">💡 初学者向けポイント</div>
              <p>
                「メール送信」「在庫更新」「決済処理」など、注文後にやるべき処理を列挙してみてください。それらが独立した「イベントへの反応」として切り出せるなら、EDAは適切なアーキテクチャです。
              </p>
            </div>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext
                href="https://martinfowler.com/articles/201701-event-driven.html"
                className="ref-link"
              >
                Martin Fowler — Event-Driven Architecture
              </Ext>
              <Ext href="https://aws.amazon.com/event-driven-architecture/" className="ref-link">
                AWS — EDA パターン解説
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2 ═══ */}
        <section className="section" id="sec-2">
          <div className="sec-header">
            <span className="sec-num">SECTION 02</span>
            <span className="sec-icon">🧩</span>
            <div>
              <h2 className="sec-title">EDAの基本構成要素</h2>
              <p className="sec-subtitle">Producer / Broker / Consumer とイベントの解剖</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">2.1 3つの主要コンポーネント</h3>
            <div className="diag-wrap">
              <div className="diag-title">Producer → Broker → Consumer の基本関係</div>
              <MermaidDiagram chart={D_COMPONENTS} />
            </div>
            <div className="cg c3">
              <div className="card ac-blue">
                <div className="card-icon">📤</div>
                <div className="card-title">プロデューサー（Producer）</div>
                <div className="card-desc">
                  イベントを生成・発行するコンポーネント。誰が受け取るかを知らない。
                  <br />
                  <br />
                  例：注文サービス、IoTセンサー、ユーザー操作イベント
                </div>
              </div>
              <div className="card ac-orange">
                <div className="card-icon">🔀</div>
                <div className="card-title">ブローカー（Broker）</div>
                <div className="card-desc">
                  イベントを受け取り、保存・ルーティング・配信するミドルウェア。
                  <br />
                  <br />
                  例：Apache Kafka、RabbitMQ、AWS EventBridge
                </div>
              </div>
              <div className="card ac-green">
                <div className="card-icon">📥</div>
                <div className="card-title">コンシューマー（Consumer）</div>
                <div className="card-desc">
                  イベントを受信・処理するコンポーネント。処理後に新たなイベントを発行することもある。
                  <br />
                  <br />
                  例：在庫サービス、通知サービス
                </div>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">2.2 イベントの構造（Anatomy of an Event）</h3>
            <p>
              イベントは<strong>メタデータ</strong>（すべてのイベントに共通）と
              <strong>ペイロード</strong>
              （イベント固有のデータ）の2層で構成されます。
            </p>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>フィールド</th>
                    <th>型</th>
                    <th>説明</th>
                    <th>必須</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>event_id</code>
                    </td>
                    <td>UUID</td>
                    <td>イベントの一意識別子。べき等性チェックに使用</td>
                    <td>
                      <span className="tag green">必須</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>event_type</code>
                    </td>
                    <td>String</td>
                    <td>
                      イベントの種類。例: <code>order.placed</code>
                    </td>
                    <td>
                      <span className="tag green">必須</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>occurred_at</code>
                    </td>
                    <td>ISO8601</td>
                    <td>イベントが発生した日時（UTC）</td>
                    <td>
                      <span className="tag green">必須</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>source</code>
                    </td>
                    <td>String</td>
                    <td>発生元サービス名</td>
                    <td>
                      <span className="tag green">必須</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>version</code>
                    </td>
                    <td>String</td>
                    <td>
                      スキーマバージョン。例: <code>1.0</code>
                    </td>
                    <td>
                      <span className="tag green">必須</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>correlation_id</code>
                    </td>
                    <td>UUID</td>
                    <td>分散トレーシング用ID。リクエスト全体を追跡</td>
                    <td>
                      <span className="tag orange">推奨</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <em>ペイロードフィールド</em>
                    </td>
                    <td>Any</td>
                    <td>イベント固有のビジネスデータ。自己完結型にする</td>
                    <td>
                      <span className="tag blue">任意</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">2.3 イベントの実装例（Python）</h3>
            <div className="cb">
              <div className="cb-header">
                <div className="cb-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="cb-label">
                  <span className="cb-lang">Python</span>events/order_placed.py
                </div>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_ORDER_PLACED }}
                />
              </pre>
            </div>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext href="https://cloudevents.io/" className="ref-link">
                CloudEvents 仕様（CNCF）
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3 ═══ */}
        <section className="section" id="sec-3">
          <div className="sec-header">
            <span className="sec-num">SECTION 03</span>
            <span className="sec-icon">📋</span>
            <div>
              <h2 className="sec-title">イベントの種類と設計</h2>
              <p className="sec-subtitle">4分類・Good vs Bad・スキーマ進化戦略</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">3.1 イベントの4分類</h3>
            <div className="cg c2">
              <div className="card ac-blue">
                <div className="card-icon">🧩</div>
                <div className="card-title">ドメインイベント（Domain Event）</div>
                <div className="card-desc">
                  <strong>ビジネス上で意味のある出来事。最も重要なイベント種別。</strong>
                  <br />
                  <br />
                  例: <code>OrderPlaced</code>（注文確定）
                  <br />
                  <code>PaymentCompleted</code>（決済完了）
                  <br />
                  <code>CustomerRegistered</code>（顧客登録）
                </div>
              </div>
              <div className="card ac-purple">
                <div className="card-icon">⚙️</div>
                <div className="card-title">システムイベント（System Event）</div>
                <div className="card-desc">
                  <strong>インフラ・技術的な出来事。ビジネスロジックとは分離する。</strong>
                  <br />
                  <br />
                  例: <code>ServiceStarted</code>（起動）
                  <br />
                  <code>HealthCheckFailed</code>（障害検知）
                </div>
              </div>
              <div className="card ac-orange">
                <div className="card-icon">🔔</div>
                <div className="card-title">トリガーイベント（Trigger Event）</div>
                <div className="card-desc">
                  <strong>処理のキックオフ。スケジュール実行や手動起動の代わりに使用。</strong>
                  <br />
                  <br />
                  例: <code>BatchProcessingRequested</code>（バッチ開始）
                </div>
              </div>
              <div className="card ac-green">
                <div className="card-icon">🔄</div>
                <div className="card-title">変更通知イベント（Change Notification）</div>
                <div className="card-desc">
                  <strong>
                    データの変更を通知。キャッシュ更新やCQRSのプロジェクション更新に利用。
                  </strong>
                  <br />
                  <br />
                  例: <code>ProductPriceChanged</code>（価格変更）
                </div>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">3.2 良いイベント設計 vs 悪いイベント設計</h3>
            <div className="comp">
              <div className="comp-box good">
                <div className="comp-title">✅ 良いイベント設計</div>
                <ul className="comp-list">
                  <li>
                    <strong>過去形で命名する</strong>: <code>OrderPlaced</code>（注文が確定した）←
                    起きた事実
                  </li>
                  <li>
                    <strong>自己完結型にする</strong>:
                    受信者がDBを参照しなくてよい情報をペイロードに含める
                  </li>
                  <li>
                    <strong>イミュータブルにする</strong>:
                    発生した事実は変更不可。バージョンアップは新しいイベントで
                  </li>
                  <li>
                    <strong>スキーマバージョンを管理</strong>: <code>version: "2.0"</code>
                    を付与し後方互換性を保つ
                  </li>
                  <li>
                    <strong>べき等性を保証する</strong>:
                    同じイベントを2回処理しても結果が変わらない設計
                  </li>
                </ul>
              </div>
              <div className="comp-box bad">
                <div className="comp-title">❌ 悪いイベント設計</div>
                <ul className="comp-list">
                  <li>
                    <strong>命令形で命名</strong>: <code>CreateOrder</code>
                    （これはコマンドであってイベントではない）
                  </li>
                  <li>
                    <strong>IDのみを含める</strong>: <code>order_id: "12345"</code>
                    だけでは受信者が毎回DBアクセスが必要
                  </li>
                  <li>
                    <strong>巨大すぎるイベント</strong>:
                    50フィールド以上の「神イベント」はスキーマ変更の影響が甚大
                  </li>
                  <li>
                    <strong>バージョン管理なし</strong>:
                    フィールド名変更などの破壊的変更で既存コンシューマーが壊れる
                  </li>
                  <li>
                    <strong>細かすぎる粒度</strong>: <code>UserFirstNameChanged</code>と
                    <code>UserLastNameChanged</code>を別々に送る（Chatty Events）
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">3.3 イベントスキーマの進化戦略</h3>
            <div className="diag-wrap">
              <div className="diag-title">
                スキーマバージョニング — 後方互換 vs 破壊的変更の対処
              </div>
              <MermaidDiagram chart={D_SCHEMA_EVOLUTION} />
            </div>
            <div className="mbox warn">
              <div className="mbox-title">⚠️ 破壊的変更を行う場合のルール</div>
              <p>
                フィールド名の変更・型変更など破壊的な変更が必要な場合は、
                <strong>旧バージョンと新バージョンを並行して一定期間（目安：3ヶ月）同時発行</strong>
                し、すべてのコンシューマーが移行完了後に旧バージョンを廃止します。
              </p>
            </div>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext href="https://www.enterpriseintegrationpatterns.com/" className="ref-link">
                Enterprise Integration Patterns
              </Ext>
              <Ext href="https://cloudevents.io/" className="ref-link">
                CloudEvents 仕様
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4 ═══ */}
        <section className="section" id="sec-4">
          <div className="sec-header">
            <span className="sec-num">SECTION 04</span>
            <span className="sec-icon">🔀</span>
            <div>
              <h2 className="sec-title">メッセージブローカーとイベントストリーミング</h2>
              <p className="sec-subtitle">主要ブローカーの比較・選択ガイド</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">4.1 主要ブローカーの比較</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>ブローカー</th>
                    <th>タイプ</th>
                    <th>スループット</th>
                    <th>永続化</th>
                    <th>主なユースケース</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Apache Kafka</strong>
                    </td>
                    <td>
                      <span className="tag blue">ストリーミング</span>
                    </td>
                    <td>
                      <span className="tag green">超高速</span>
                    </td>
                    <td>✅ 長期保存・再生可能</td>
                    <td>高スループット、イベントソーシング、ログ収集</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>RabbitMQ</strong>
                    </td>
                    <td>
                      <span className="tag purple">キュー</span>
                    </td>
                    <td>
                      <span className="tag blue">高速</span>
                    </td>
                    <td>設定次第</td>
                    <td>複雑なルーティング、タスクキュー</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Amazon SQS</strong>
                    </td>
                    <td>
                      <span className="tag purple">キュー</span>
                    </td>
                    <td>
                      <span className="tag blue">高速</span>
                    </td>
                    <td>最大14日</td>
                    <td>AWSサービス間連携、シンプルなキュー</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>AWS EventBridge</strong>
                    </td>
                    <td>
                      <span className="tag orange">イベントバス</span>
                    </td>
                    <td>
                      <span className="tag blue">高速</span>
                    </td>
                    <td>アーカイブ可</td>
                    <td>サーバーレス統合、SaaS連携</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Amazon Kinesis</strong>
                    </td>
                    <td>
                      <span className="tag blue">ストリーミング</span>
                    </td>
                    <td>
                      <span className="tag green">超高速</span>
                    </td>
                    <td>最大7日</td>
                    <td>リアルタイム分析、AWSエコシステム</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Apache Pulsar</strong>
                    </td>
                    <td>
                      <span className="tag blue">ストリーミング</span>
                    </td>
                    <td>
                      <span className="tag green">超高速</span>
                    </td>
                    <td>✅ 長期保存</td>
                    <td>地理的レプリケーション、マルチテナント</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">4.2 ユースケース別ブローカー選択ガイド</h3>
            <div className="diag-wrap">
              <div className="diag-title">ブローカー選定フローチャート</div>
              <MermaidDiagram chart={D_BROKER_SELECT} />
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">
              4.3 メッセージキュー型 vs イベントストリーミング型の本質的違い
            </h3>
            <div className="comp">
              <div className="comp-box" style={{ borderTop: "3px solid var(--pu)" }}>
                <div className="comp-title" style={{ color: "var(--pu)" }}>
                  📬 メッセージキュー型（RabbitMQ / SQS）
                </div>
                <ul className="comp-list">
                  <li>
                    <strong>消費されたメッセージは削除</strong>される（1回限り）
                  </li>
                  <li>
                    1つのメッセージは<strong>1つのコンシューマーのみ</strong>に配信
                  </li>
                  <li>タスクキュー・ワークキューに最適</li>
                  <li>ACK/NACKで確実な配信を保証</li>
                </ul>
              </div>
              <div className="comp-box" style={{ borderTop: "3px solid var(--ac)" }}>
                <div className="comp-title" style={{ color: "var(--ac)" }}>
                  📊 イベントストリーミング型（Kafka / Kinesis）
                </div>
                <ul className="comp-list">
                  <li>
                    イベントは<strong>保持期間中保存</strong>（再生・巻き戻し可能）
                  </li>
                  <li>
                    <strong>複数のコンシューマーグループ</strong>が独立して購読可能
                  </li>
                  <li>イベントソーシング・リアルタイム分析に最適</li>
                  <li>オフセット管理でコンシューマーが処理位置を制御</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext href="https://kafka.apache.org/documentation/" className="ref-link">
                Apache Kafka 公式
              </Ext>
              <Ext href="https://aws.amazon.com/sqs/" className="ref-link">
                Amazon SQS
              </Ext>
              <Ext href="https://aws.amazon.com/kinesis/" className="ref-link">
                Amazon Kinesis
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5 ═══ */}
        <section className="section" id="sec-5">
          <div className="sec-header">
            <span className="sec-num">SECTION 05</span>
            <span className="sec-icon">🗺️</span>
            <div>
              <h2 className="sec-title">EDAのトポロジーパターン</h2>
              <p className="sec-subtitle">仲介者 / ブローカー / Sagaパターン</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">5.1 仲介者トポロジー（Mediator Topology）</h3>
            <p>
              <strong>中央の仲介者（オーケストレーター）</strong>
              がワークフロー全体の制御を担当します。処理の順序・条件分岐・エラーハンドリングを一箇所で管理できますが、仲介者への依存が生じます。
            </p>
            <div className="diag-wrap">
              <div className="diag-title">仲介者トポロジー — 仲介者が処理順序を制御</div>
              <MermaidDiagram chart={D_MEDIATOR} />
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">5.2 ブローカートポロジー（Broker Topology）</h3>
            <p>
              中央制御なし。各サービスが<strong>イベントに独立して反応</strong>
              し、新しいイベントを発行することで処理が連鎖します。完全疎結合ですが、フロー全体の追跡が複雑になります。
            </p>
            <div className="diag-wrap">
              <div className="diag-title">ブローカートポロジー — 各サービスが自律的に反応</div>
              <MermaidDiagram chart={D_BROKER_TOPOLOGY} />
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">5.3 仲介者 vs ブローカーの使い分け</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>観点</th>
                    <th>仲介者トポロジー</th>
                    <th>ブローカートポロジー</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>処理の制御</strong>
                    </td>
                    <td>中央集権的・順序制御可能</td>
                    <td>分散・各サービスが自律</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>結合度</strong>
                    </td>
                    <td>仲介者への依存あり</td>
                    <td>完全疎結合</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>エラーハンドリング</strong>
                    </td>
                    <td>仲介者で一元管理</td>
                    <td>各サービスが個別に対応</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>可視性</strong>
                    </td>
                    <td>フロー全体が見えやすい</td>
                    <td>追跡が複雑になりやすい</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>適用場面</strong>
                    </td>
                    <td>複雑なワークフロー・承認フロー</td>
                    <td>独立したリアクション処理</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>代表ツール</strong>
                    </td>
                    <td>AWS Step Functions、Temporal</td>
                    <td>Apache Kafka、EventBridge</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">5.4 Sagaパターン（分散トランザクション）</h3>
            <p>
              マイクロサービス間でデータの整合性を保つパターン。各サービスがローカルトランザクションを実行し、失敗時は
              <strong>補償トランザクション（Compensating Transaction）</strong>
              で前の状態に戻します。
            </p>
            <div className="diag-wrap">
              <div className="diag-title">
                Saga（Choreography型）— 正常フローと補償トランザクション
              </div>
              <MermaidDiagram chart={D_SAGA} />
            </div>
            <div className="mbox warn">
              <div className="mbox-title">⚠️ Sagaの注意点：結果整合性（Eventual Consistency）</div>
              <p>
                Sagaでは厳密なACID整合性ではなく<strong>結果整合性</strong>
                を採用します。一時的に各サービスの状態が不一致になる可能性があり、UXやビジネスロジックでこれを考慮する必要があります。
              </p>
            </div>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext
                href="https://martinfowler.com/articles/patterns-of-distributed-systems/saga.html"
                className="ref-link"
              >
                Martin Fowler — Saga Pattern
              </Ext>
              <Ext href="https://aws.amazon.com/step-functions/" className="ref-link">
                AWS Step Functions
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 6 ═══ */}
        <section className="section" id="sec-6">
          <div className="sec-header">
            <span className="sec-num">SECTION 06</span>
            <span className="sec-icon">🔶</span>
            <div>
              <h2 className="sec-title">Apache Kafka 完全解説</h2>
              <p className="sec-subtitle">
                アーキテクチャ・主要概念・Python実装・パーティション戦略
              </p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">6.1 Kafkaのアーキテクチャ概観</h3>
            <div className="diag-wrap">
              <div className="diag-title">
                Kafkaクラスター全体図（Broker / Topic / Partition / Consumer Group）
              </div>
              <MermaidDiagram chart={D_KAFKA_ARCH} />
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">6.2 Kafkaの主要概念</h3>
            <div className="kv-grid">
              <div className="kv-item">
                <div className="kv-key">Topic（トピック）</div>
                <div className="kv-val">メッセージのカテゴリ</div>
                <div className="kv-sub">
                  例：<code>orders</code>/<code>payments</code>
                  <br />
                  複数のPartitionで構成される
                </div>
              </div>
              <div className="kv-item">
                <div className="kv-key">Partition（パーティション）</div>
                <div className="kv-val">並列処理の基本単位</div>
                <div className="kv-sub">
                  順序保証はPartition内のみ。Partition数がスループットの上限を決める
                </div>
              </div>
              <div className="kv-item">
                <div className="kv-key">Offset（オフセット）</div>
                <div className="kv-val">メッセージの位置番号</div>
                <div className="kv-sub">
                  コンシューマーが管理。任意の位置から再生可能（巻き戻し可能）
                </div>
              </div>
              <div className="kv-item">
                <div className="kv-key">Consumer Group</div>
                <div className="kv-val">水平スケールの単位</div>
                <div className="kv-sub">
                  同一グループ内でPartitionを分担。グループ間は独立して購読
                </div>
              </div>
              <div className="kv-item">
                <div className="kv-key">Replication Factor</div>
                <div className="kv-val">レプリカ数（通常3）</div>
                <div className="kv-sub">LeaderがI/Oを担当。障害時はFollowerが昇格（高可用性）</div>
              </div>
              <div className="kv-item">
                <div className="kv-key">Retention（保持期間）</div>
                <div className="kv-val">デフォルト7日間</div>
                <div className="kv-sub">
                  時間/サイズベースで設定。Log Compactionで最新値のみ保持も可能
                </div>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">6.3 Kafkaの実装例（Python）</h3>
            <div className="cb">
              <div className="cb-header">
                <div className="cb-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="cb-label">
                  <span className="cb-lang">Python</span>kafka/producer.py — プロデューサー
                </div>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_KAFKA_PRODUCER }}
                />
              </pre>
            </div>
            <div className="cb">
              <div className="cb-header">
                <div className="cb-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="cb-label">
                  <span className="cb-lang">Python</span>kafka/consumer.py — べき等なコンシューマー
                </div>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_KAFKA_CONSUMER }}
                />
              </pre>
            </div>
          </div>
          <div className="mbox best">
            <div className="mbox-title">✅ Kafkaベストプラクティス</div>
            <p>
              <strong>パーティション数 ≧ コンシューマーグループの最大コンシューマー数</strong>
              を守ること。パーティション数 &lt;
              コンシューマー数の場合、余分なコンシューマーはアイドル状態になります。
              <strong>キーベースのパーティショニング</strong>（例：<code>order_id</code>
              をキーに設定）で同一エンティティのイベント順序を保証します。
            </p>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext href="https://kafka.apache.org/documentation/" className="ref-link">
                Apache Kafka 公式
              </Ext>
              <Ext href="https://developer.confluent.io/learn-kafka/" className="ref-link">
                Confluent Kafka チュートリアル
              </Ext>
              <Ext
                href="https://www.confluent.io/designing-event-driven-systems/"
                className="ref-link"
              >
                Designing Event-Driven Systems（無料書籍）
              </Ext>
              <Ext href="https://kafka-python.readthedocs.io/" className="ref-link">
                kafka-python ドキュメント
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 7 ═══ */}
        <section className="section" id="sec-7">
          <div className="sec-header">
            <span className="sec-num">SECTION 07</span>
            <span className="sec-icon">☁️</span>
            <div>
              <h2 className="sec-title">AWS EventBridge 完全解説</h2>
              <p className="sec-subtitle">フルマネージドなサーバーレスイベントバス</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">7.1 EventBridgeのアーキテクチャ</h3>
            <div className="diag-wrap">
              <div className="diag-title">
                AWS EventBridge — ソース → バス → ルール → ターゲット
              </div>
              <MermaidDiagram chart={D_EVENTBRIDGE} />
            </div>
            <div className="cg c3">
              <div className="card ac-orange">
                <div className="card-icon">🚌</div>
                <div className="card-title">イベントバス（Event Bus）</div>
                <div className="card-desc">
                  Default（AWSサービス用）、Custom（自作アプリ用）、Partner（SaaS用）の3種類。
                </div>
              </div>
              <div className="card ac-blue">
                <div className="card-icon">📋</div>
                <div className="card-title">イベントルール（Event Rule）</div>
                <div className="card-desc">
                  JSONパターンマッチングでフィルタリング。数値範囲・文字列マッチ・存在チェックが可能。
                </div>
              </div>
              <div className="card ac-green">
                <div className="card-icon">📐</div>
                <div className="card-title">スキーマレジストリ</div>
                <div className="card-desc">
                  イベントスキーマを自動検出・保存。SDK用コードを自動生成でき型安全を実現。
                </div>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">7.2 EventBridgeの設定例（Terraform HCL）</h3>
            <div className="cb">
              <div className="cb-header">
                <div className="cb-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="cb-label">
                  <span className="cb-lang">HCL</span>eventbridge/main.tf
                </div>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_EVENTBRIDGE_TF }}
                />
              </pre>
            </div>
          </div>
          <div className="mbox best">
            <div className="mbox-title">✅ EventBridge ベストプラクティス</div>
            <p>
              ターゲットには<strong>必ずDead Letter Queue（DLQ）</strong>
              を設定すること。設定しない場合、処理失敗したイベントは永遠に失われます。また
              <code>source</code>には<code>"com.myapp.service-name"</code>、<code>detail-type</code>
              には<code>"OrderPlaced"</code>
              のような具体的な値を設定し、ルールのスコープを明確にします。
            </p>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext href="https://aws.amazon.com/eventbridge/" className="ref-link">
                AWS EventBridge 公式
              </Ext>
              <Ext href="https://aws.amazon.com/sns/" className="ref-link">
                Amazon SNS
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 8 ═══ */}
        <section className="section" id="sec-8">
          <div className="sec-header">
            <span className="sec-num">SECTION 08</span>
            <span className="sec-icon">📜</span>
            <div>
              <h2 className="sec-title">イベントソーシング（Event Sourcing）</h2>
              <p className="sec-subtitle">
                状態ではなく「イベントの履歴」を唯一の真実（Single Source of Truth）とする
              </p>
            </div>
          </div>
          <div className="hl-box">
            <div className="hl-box-title">💡 イベントソーシングの核心</div>
            <div className="hl-box-desc">
              従来のDBは「現在の状態」のみを保存します。イベントソーシングでは「
              <strong>状態を変化させたすべてのイベントの履歴</strong>
              」を保存し、現在の状態はイベントを再生（リプレイ）して導出します。これにより
              <strong>完全な監査ログ・タイムトラベル・バグ再現</strong>が可能になります。
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">8.1 従来の状態保存 vs イベントソーシング</h3>
            <div className="diag-wrap">
              <div className="diag-title">
                従来のDB（現在状態のみ）vs イベントストア（イベント履歴全体）
              </div>
              <MermaidDiagram chart={D_EVENT_SOURCING} />
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">8.2 イベントソーシングの実装例（Python）</h3>
            <div className="cb">
              <div className="cb-header">
                <div className="cb-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="cb-label">
                  <span className="cb-lang">Python</span>domain/order_aggregate.py
                </div>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_ORDER_AGGREGATE }}
                />
              </pre>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">8.3 スナップショット戦略（パフォーマンス最適化）</h3>
            <p>
              イベント数が増えるにつれ集約の再構築に時間がかかります。
              <strong>一定間隔（目安：100件ごと）でスナップショット（その時点の状態）</strong>
              を保存することで、スナップショット以降のイベントのみ再生すればよくなります。
            </p>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext href="https://martinfowler.com/eaaDev/EventSourcing.html" className="ref-link">
                Martin Fowler — Event Sourcing
              </Ext>
              <Ext href="https://www.eventstore.com/" className="ref-link">
                EventStoreDB 公式
              </Ext>
              <Ext href="https://github.com/cosmicpython/book" className="ref-link">
                Cosmic Python — Event Sourcing
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 9 ═══ */}
        <section className="section" id="sec-9">
          <div className="sec-header">
            <span className="sec-num">SECTION 09</span>
            <span className="sec-icon">⚖️</span>
            <div>
              <h2 className="sec-title">CQRS（コマンドクエリ責務分離）</h2>
              <p className="sec-subtitle">Command Query Responsibility Segregation</p>
            </div>
          </div>
          <div className="hl-box">
            <div className="hl-box-title">💡 CQRSの原則</div>
            <div className="hl-box-desc">
              「<strong>書き込み（Command）</strong>」と「<strong>読み取り（Query）</strong>
              」のモデルを分離します。書き込みは整合性を重視した正規化DBに、読み取りは参照に最適化した非正規化DBに行います。EDAでイベントを使って両者を非同期同期することで、
              <strong>書き込みスケール</strong>と<strong>読み取りスケール</strong>
              を独立して最適化できます。
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">9.1 CQRS + EDA + Event Sourcing の組み合わせ</h3>
            <div className="diag-wrap">
              <div className="diag-title">
                EDA + CQRS + Event Sourcing — コマンドサイドとクエリサイドの完全分離
              </div>
              <MermaidDiagram chart={D_CQRS} />
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">9.2 いつCQRSを使うべきか</h3>
            <div className="comp">
              <div className="comp-box good">
                <div className="comp-title">✅ CQRSが適している場合</div>
                <ul className="comp-list">
                  <li>
                    <strong>読み取りと書き込みの負荷バランスが大きく異なる</strong>
                    （例：読み取り10倍）
                  </li>
                  <li>読み取りに複数の最適化されたビューが必要（全文検索 + RDB + キャッシュ）</li>
                  <li>複雑なビジネスドメインでEvent Sourcingと組み合わせる</li>
                  <li>マイクロサービスで各サービスが自身の読み取りモデルを持つ</li>
                </ul>
              </div>
              <div className="comp-box bad">
                <div className="comp-title">❌ CQRSが不適な場合</div>
                <ul className="comp-list">
                  <li>シンプルなCRUDアプリケーション（過剰設計になる）</li>
                  <li>チームが小さく、複雑さを管理できない</li>
                  <li>結果整合性（Eventual Consistency）をUXに組み込めない</li>
                  <li>読み取りと書き込みの負荷がほぼ同じ場合</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext href="https://martinfowler.com/bliki/CQRS.html" className="ref-link">
                Martin Fowler — CQRS
              </Ext>
              <Ext
                href="https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf"
                className="ref-link"
              >
                Greg Young — CQRS Documents（PDF）
              </Ext>
              <Ext href="https://developer.axoniq.io/" className="ref-link">
                Axon Framework（Java CQRS/ES）
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 10 ═══ */}
        <section className="section" id="sec-10">
          <div className="sec-header">
            <span className="sec-num">SECTION 10</span>
            <span className="sec-icon">🛡️</span>
            <div>
              <h2 className="sec-title">エラーハンドリングと信頼性設計</h2>
              <p className="sec-subtitle">DLQ / サーキットブレーカー / リトライ戦略 / べき等性</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">10.1 配信保証モデルの選択</h3>
            <div className="cg c3">
              <div className="card ac-orange">
                <div className="card-icon">📬</div>
                <div className="card-title">At-Least-Once（最低1回）</div>
                <div className="card-desc">
                  <strong>最も現実的な選択。</strong>少なくとも1回は届けるが重複する可能性がある。
                  <code>べき等なコンシューマー</code>で対処する。Kafka・SQSのデフォルト。
                </div>
              </div>
              <div className="card ac-red">
                <div className="card-icon">🎲</div>
                <div className="card-title">At-Most-Once（最大1回）</div>
                <div className="card-desc">
                  重複は起きないがメッセージロストの可能性がある。ログ収集など損失許容可能な場面のみ。
                </div>
              </div>
              <div className="card ac-green">
                <div className="card-icon">🎯</div>
                <div className="card-title">Exactly-Once（正確に1回）</div>
                <div className="card-desc">
                  Kafka EOS（Exactly-Once
                  Semantics）で実現可能だが実装コストが高い。決済など重複不可の場面で使用。
                </div>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">10.2 Dead Letter Queue（DLQ）パターン</h3>
            <div className="diag-wrap">
              <div className="diag-title">DLQパターン — 処理失敗メッセージの安全な隔離と再投入</div>
              <MermaidDiagram chart={D_DLQ} />
            </div>
            <div className="mbox danger">
              <div className="mbox-title">🚨 DLQは必ず設定すること</div>
              <p>
                DLQを設定しないと、処理に失敗したイベントが永遠に失われます。DLQのメッセージ数を
                <strong>常時ゼロになるよう監視</strong>
                し、増加時は即座にアラートを出すことが重要です。
              </p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">10.3 サーキットブレーカーパターン</h3>
            <div className="diag-wrap">
              <div className="diag-title">
                サーキットブレーカー 状態遷移図（CLOSED / OPEN / HALF-OPEN）
              </div>
              <MermaidDiagram chart={D_CIRCUIT_BREAKER} />
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">10.4 指数バックオフ + ジッターによるリトライ</h3>
            <div className="cb">
              <div className="cb-header">
                <div className="cb-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="cb-label">
                  <span className="cb-lang">Python</span>utils/retry.py — 指数バックオフ +
                  ジッターデコレーター
                </div>
              </div>
              <pre>
                <code
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                  dangerouslySetInnerHTML={{ __html: CODE_RETRY }}
                />
              </pre>
            </div>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext href="https://martinfowler.com/bliki/CircuitBreaker.html" className="ref-link">
                Martin Fowler — Circuit Breaker
              </Ext>
              <Ext
                href="https://martinfowler.com/articles/patterns-of-distributed-systems/retry.html"
                className="ref-link"
              >
                Martin Fowler — Retry Pattern
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 11 ═══ */}
        <section className="section" id="sec-11">
          <div className="sec-header">
            <span className="sec-num">SECTION 11</span>
            <span className="sec-icon">🔒</span>
            <div>
              <h2 className="sec-title">EDAのセキュリティ設計</h2>
              <p className="sec-subtitle">認証・認可・暗号化・PII保護・監査ログ</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">11.1 EDAセキュリティの4レイヤー</h3>
            <div className="cg c2">
              <div className="card ac-red">
                <div className="card-icon">🔑</div>
                <div className="card-title">認証（Authentication）</div>
                <div className="card-desc">
                  誰がイベントを発行しているかを検証する。
                  <br />
                  <br />
                  <strong>実装手段：</strong>{" "}
                  サービスアカウント、mTLS（相互TLS）、JWT/OAuth2トークン。各サービスに一意のIDを付与し、なりすましを防ぐ。
                </div>
              </div>
              <div className="card ac-blue">
                <div className="card-icon">🛡️</div>
                <div className="card-title">認可（Authorization）</div>
                <div className="card-desc">
                  何のトピックに書き込み・読み取りできるかを制御する。
                  <br />
                  <br />
                  <strong>実装手段：</strong>{" "}
                  KafkaのトピックレベルACL、IAMロールポリシー（AWS）。最小権限の原則を徹底する。
                </div>
              </div>
              <div className="card ac-green">
                <div className="card-icon">🔐</div>
                <div className="card-title">暗号化（Encryption）</div>
                <div className="card-desc">
                  転送中・保存中のデータを暗号化する。
                  <br />
                  <br />
                  <strong>実装手段：</strong> TLS
                  1.2以上での転送暗号化、AES-256での保存時暗号化、PIIのフィールドレベル暗号化。
                </div>
              </div>
              <div className="card ac-orange">
                <div className="card-icon">📋</div>
                <div className="card-title">スキーマ検証 + 監査ログ</div>
                <div className="card-desc">
                  不正なイベントの注入を防ぐ。
                  <br />
                  <br />
                  <strong>実装手段：</strong> Schema
                  Registry（Confluent）でスキーマ検証。すべてのイベントの送受信を監査ログに記録しコンプライアンスを満たす。
                </div>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">11.2 個人情報（PII）の取り扱いパターン</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>PII種別</th>
                    <th>推奨対処</th>
                    <th>実装例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>メールアドレス</strong>
                    </td>
                    <td>マスキング / トークン化</td>
                    <td>
                      <code>ya***@***.com</code> or <code>tok_email_abc123</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>クレジットカード番号</strong>
                    </td>
                    <td>トークン化（PCI DSS準拠）</td>
                    <td>
                      <code>tok_card_xyz789</code>（元番号はVaultに保管）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>氏名</strong>
                    </td>
                    <td>フィールドレベル暗号化</td>
                    <td>
                      <code>[ENCRYPTED:aGVsbG8=...]</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>住所</strong>
                    </td>
                    <td>権限のあるサービスのみ復号化</td>
                    <td>配送サービスのみ復号キーを持つ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mbox danger">
              <div className="mbox-title">🚨 PIIをイベントに含める際の原則</div>
              <p>
                イベントバスには多数のサービスがアクセスします。
                <strong>
                  認可されていないサービスが読み取れる状態でPIIをペイロードに含めてはいけません。
                </strong>
                フィールドレベル暗号化またはトークン化を使用してください。
              </p>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 12 ═══ */}
        <section className="section" id="sec-12">
          <div className="sec-header">
            <span className="sec-num">SECTION 12</span>
            <span className="sec-icon">🔭</span>
            <div>
              <h2 className="sec-title">EDAの監視・オブザーバビリティ</h2>
              <p className="sec-subtitle">メトリクス / ログ / 分散トレーシング の3本柱</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">12.1 可観測性の3本柱</h3>
            <div className="cg c3">
              <div className="card ac-blue">
                <div className="card-icon">📊</div>
                <div className="card-title">メトリクス（Metrics）</div>
                <div className="card-desc">
                  数値で状態を把握する
                  <br />
                  <br />
                  <strong>必須メトリクス：</strong>
                  <br />• イベント発行レート（件/秒）
                  <br />• <strong>コンシューマーラグ（遅延件数）⚠️最重要</strong>
                  <br />• エラーレート（%）
                  <br />• DLQメッセージ数
                  <br />• 処理レイテンシ（p50/p95/p99）
                </div>
              </div>
              <div className="card ac-green">
                <div className="card-icon">📝</div>
                <div className="card-title">ログ（Logs）</div>
                <div className="card-desc">
                  イベントの詳細記録
                  <br />
                  <br />
                  <strong>必須ログ項目：</strong>
                  <br />• event_id・event_type・occurred_at
                  <br />• correlation_id（トレーシング用）
                  <br />• 処理成功・失敗・スキップ記録
                  <br />• スキーマ検証エラー詳細
                  <br />• リトライ回数・DLQ送信記録
                </div>
              </div>
              <div className="card ac-purple">
                <div className="card-icon">🔗</div>
                <div className="card-title">分散トレーシング（Tracing）</div>
                <div className="card-desc">
                  イベントの流れを追跡
                  <br />
                  <br />
                  <strong>実装ポイント：</strong>
                  <br />• <code>correlation_id</code>を全イベントに付与
                  <br />• Jaeger / Zipkin / AWS X-Ray
                  <br />• OpenTelemetry 標準を採用
                  <br />• サービス間の処理フロー可視化
                  <br />• ボトルネックの特定・解消
                </div>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">12.2 コンシューマーラグの重要性</h3>
            <div className="mbox warn">
              <div className="mbox-title">
                ⚠️ コンシューマーラグ（Consumer Lag）は最重要メトリクス
              </div>
              <p>
                コンシューマーラグとは「Kafkaに蓄積されているが、まだ処理されていないメッセージ数」です。
                <strong>ラグが増加し続ける</strong>
                場合、コンシューマーの処理速度がプロデューサーの発行速度に追いついていないことを意味します。閾値（例：10,000件）を設定してアラートを出し、コンシューマーのスケールアウトや処理チューニングを行います。
                <br />
                <br />
                <strong>監視ツール：</strong> Confluent Control Center、Grafana + Prometheus、Amazon
                CloudWatch（MSK使用時）
              </p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">12.3 分散トレーシングのシーケンス</h3>
            <div className="diag-wrap">
              <div className="diag-title">
                correlation_id による全サービスを横断したトレーシング
              </div>
              <MermaidDiagram chart={D_TRACING} />
            </div>
          </div>
          <div className="ref-box">
            <div className="ref-title">📚 参考文献</div>
            <div className="ref-links">
              <Ext href="https://www.jaegertracing.io/" className="ref-link">
                Jaeger 分散トレーシング（CNCF）
              </Ext>
              <Ext href="https://opentelemetry.io/" className="ref-link">
                OpenTelemetry 公式
              </Ext>
              <Ext href="https://grafana.com/" className="ref-link">
                Grafana 公式
              </Ext>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 13 ═══ */}
        <section className="section" id="sec-13">
          <div className="sec-header">
            <span className="sec-num">SECTION 13</span>
            <span className="sec-icon">🛒</span>
            <div>
              <h2 className="sec-title">EDA実践：ECサイト完全事例</h2>
              <p className="sec-subtitle">注文・在庫・決済・配送・通知の完全なイベント駆動設計</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">13.1 システムアーキテクチャ全体図</h3>
            <div className="diag-wrap">
              <div className="diag-title">
                ECサイト全体アーキテクチャ（Frontend → API → Kafka → Workers → DataStores）
              </div>
              <MermaidDiagram chart={D_EC_ARCH} />
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">13.2 注文処理の完全なイベントフロー</h3>
            <div className="diag-wrap">
              <div className="diag-title">注文確定から配送手配までの非同期イベントフロー</div>
              <MermaidDiagram chart={D_EC_FLOW} />
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">13.3 ECサイトの主要イベント一覧</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>イベント名</th>
                    <th>発行元</th>
                    <th>コンシューマー</th>
                    <th>トリガー</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>OrderPlaced</code>
                    </td>
                    <td>注文サービス</td>
                    <td>在庫・決済・通知</td>
                    <td>注文確定ボタン押下</td>
                  </tr>
                  <tr>
                    <td>
                      <code>StockReserved</code>
                    </td>
                    <td>在庫サービス</td>
                    <td>決済サービス</td>
                    <td>在庫引当完了</td>
                  </tr>
                  <tr>
                    <td>
                      <code>StockReservationFailed</code>
                    </td>
                    <td>在庫サービス</td>
                    <td>注文サービス・通知</td>
                    <td>在庫不足</td>
                  </tr>
                  <tr>
                    <td>
                      <code>PaymentCompleted</code>
                    </td>
                    <td>決済サービス</td>
                    <td>配送・通知</td>
                    <td>決済処理成功</td>
                  </tr>
                  <tr>
                    <td>
                      <code>PaymentFailed</code>
                    </td>
                    <td>決済サービス</td>
                    <td>在庫（解放）・通知</td>
                    <td>決済処理失敗</td>
                  </tr>
                  <tr>
                    <td>
                      <code>ShipmentCreated</code>
                    </td>
                    <td>配送サービス</td>
                    <td>注文・通知</td>
                    <td>配送手配完了</td>
                  </tr>
                  <tr>
                    <td>
                      <code>OrderDelivered</code>
                    </td>
                    <td>配送サービス</td>
                    <td>注文・通知・分析</td>
                    <td>配送完了スキャン</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mbox best">
              <div className="mbox-title">✅ ECサイトEDA設計のポイント</div>
              <p>
                ユーザーには<strong>注文受付後すぐにorderIdを返却</strong>
                し、以降の処理（在庫確認・決済・配送）はすべて非同期で行います。ユーザーへの状態通知はWebSocket、Server-Sent
                Events、またはポーリングで行います。「注文ステータス」はイベントが到着するたびに更新する
                <strong>結果整合性モデル</strong>で設計します。
              </p>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 14 ═══ */}
        <section className="section" id="sec-14">
          <div className="sec-header">
            <span className="sec-num">SECTION 14</span>
            <span className="sec-icon">✅</span>
            <div>
              <h2 className="sec-title">EDAのベストプラクティス総まとめ</h2>
              <p className="sec-subtitle">イベント設計・運用・スケール・EDA成熟度モデル</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">14.1 イベント設計のベストプラクティス</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>カテゴリ</th>
                    <th>ベストプラクティス</th>
                    <th>根拠</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <span className="tag blue">命名</span>
                    </td>
                    <td>
                      過去形・英語で命名（<code>OrderPlaced</code>）
                    </td>
                    <td>イベントは「起きた事実」を表す</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <span className="tag green">ペイロード</span>
                    </td>
                    <td>自己完結型にする（必要な情報をすべて含める）</td>
                    <td>受信者がDBを参照しなくて済む</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <span className="tag purple">スキーマ</span>
                    </td>
                    <td>
                      バージョン管理を必ずする（<code>version: "1.0"</code>）
                    </td>
                    <td>後方互換性を保ちながら進化させる</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <span className="tag orange">信頼性</span>
                    </td>
                    <td>べき等性을保証する（重複処理しても同じ結果）</td>
                    <td>At-Least-Once配信に対応するため</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>
                      <span className="tag blue">サイズ</span>
                    </td>
                    <td>1イベントは1MB以下を目安に</td>
                    <td>Kafkaデフォルト上限・ネットワーク効率</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>
                      <span className="tag green">メタデータ</span>
                    </td>
                    <td>
                      <code>event_id</code>・<code>occurred_at</code>・<code>correlation_id</code>
                      を必ず付与
                    </td>
                    <td>トレーシング・デバッグに必須</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">14.2 運用のベストプラクティス</h3>
            <div className="cg c2">
              <div className="card ac-green">
                <div className="card-icon">🛡️</div>
                <div className="card-title">信頼性</div>
                <div className="card-desc">
                  <ul className="bp-list">
                    <li>
                      <span className="bp-icon">✅</span>DLQを必ず設定し、メッセージ数を監視する
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>
                      リトライは指数バックオフ＋ジッターを使用する
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>コンシューマーはべき等に実装する
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>サーキットブレーカーを導入する
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card ac-blue">
                <div className="card-icon">📈</div>
                <div className="card-title">スケーラビリティ</div>
                <div className="card-desc">
                  <ul className="bp-list">
                    <li>
                      <span className="bp-icon">✅</span>
                      パーティション数はコンシューマー数の倍を目安に
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>コンシューマーグループで水平スケールする
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>
                      ホットパーティションを避ける（キー設計を工夫）
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>コンシューマーラグを常時監視する
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card ac-orange">
                <div className="card-icon">🔒</div>
                <div className="card-title">セキュリティ</div>
                <div className="card-desc">
                  <ul className="bp-list">
                    <li>
                      <span className="bp-icon">✅</span>TLS 1.2以上での転送暗号化を徹底する
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>最小権限のACLを設定する
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>PIIはフィールドレベルで暗号化する
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>スキーマ検証で不正イベントを排除する
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card ac-purple">
                <div className="card-icon">📐</div>
                <div className="card-title">スキーマ管理</div>
                <div className="card-desc">
                  <ul className="bp-list">
                    <li>
                      <span className="bp-icon">✅</span>Schema Registryを導入する
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>破壊的変更は並行運用（3ヶ月）で移行する
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>後方互換性テストを自動化する
                    </li>
                    <li>
                      <span className="bp-icon">✅</span>
                      フィールド追加は後方互換なので自由に行える
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">14.3 EDA成熟度モデル</h3>
            <div className="maturity-list">
              <div className="maturity-item">
                <div
                  className="maturity-lv"
                  style={{ background: "var(--rdd)", color: "var(--rd)" }}
                >
                  Lv.0
                </div>
                <div className="maturity-text">
                  <strong>同期API連携</strong> — サービス間の直接HTTP呼び出し。密結合の出発点。
                </div>
              </div>
              <div className="maturity-item">
                <div
                  className="maturity-lv"
                  style={{ background: "var(--ord)", color: "var(--or)" }}
                >
                  Lv.1
                </div>
                <div className="maturity-text">
                  <strong>基本的なキュー導入</strong> — 非同期処理にキューを使用（RabbitMQ / SQS）。
                </div>
              </div>
              <div className="maturity-item">
                <div
                  className="maturity-lv"
                  style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24" }}
                >
                  Lv.2
                </div>
                <div className="maturity-text">
                  <strong>Pub/Sub パターン</strong> — 複数コンシューマーへの配信（Kafka /
                  EventBridge）。
                </div>
              </div>
              <div className="maturity-item">
                <div
                  className="maturity-lv"
                  style={{ background: "var(--gnd)", color: "var(--gn)" }}
                >
                  Lv.3
                </div>
                <div className="maturity-text">
                  <strong>イベントストリーミング</strong> — イベントの永続化・再生（Kafka + Consumer
                  Groups）。
                </div>
              </div>
              <div className="maturity-item">
                <div
                  className="maturity-lv"
                  style={{ background: "var(--acd)", color: "var(--ac)" }}
                >
                  Lv.4
                </div>
                <div className="maturity-text">
                  <strong>Event Sourcing + CQRS</strong> —
                  イベントを唯一の真実とし読み書きを完全分離。
                </div>
              </div>
              <div className="maturity-item">
                <div
                  className="maturity-lv"
                  style={{ background: "var(--pud)", color: "var(--pu)" }}
                >
                  Lv.5
                </div>
                <div className="maturity-text">
                  <strong>Real-time Streaming Platform</strong> —
                  リアルタイム分析・ML統合・完全な可観測性・自動スケール。
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 15 ═══ */}
        <section className="section" id="sec-15">
          <div className="sec-header">
            <span className="sec-num">SECTION 15</span>
            <span className="sec-icon">⚠️</span>
            <div>
              <h2 className="sec-title">EDAのアンチパターン</h2>
              <p className="sec-subtitle">やってはいけない設計と、その修正方法</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">15.1 主要な4つのアンチパターン</h3>
            <div className="ap-grid">
              <div className="ap-box ap-bad">
                <div className="ap-bad-title">❌ Anti-Pattern 1: Event Sourcingの乱用</div>
                <div className="ap-desc">
                  すべてのデータにEvent
                  Sourcingを適用してしまう。シンプルなCRUD（ユーザー設定、マスタデータ）に適用しても過剰な複雑さを生むだけで、メリットはほとんどない。
                </div>
              </div>
              <div className="ap-box ap-fix">
                <div className="ap-fix-title">✅ 解決策</div>
                <div className="ap-desc">
                  複雑なビジネスロジックを持つ集約（注文、取引）のみに限定する。参照データ・マスタデータには通常のRDBを使用する。「本当にイベント履歴が必要か？」を常に問う。
                </div>
              </div>
              <div className="ap-box ap-bad">
                <div className="ap-bad-title">
                  ❌ Anti-Pattern 2: Chatty Events（過剰なイベント）
                </div>
                <div className="ap-desc">
                  細かすぎるイベントを大量に発行する。<code>UserFirstNameChanged</code>と
                  <code>UserLastNameChanged</code>
                  を別々に発行→受信者が毎回複数の更新処理が必要になる。
                </div>
              </div>
              <div className="ap-box ap-fix">
                <div className="ap-fix-title">✅ 解決策</div>
                <div className="ap-desc">
                  ビジネス上意味のある粒度に統合する。<code>UserProfileUpdated</code>
                  として変更されたフィールドをまとめてペイロードに含める。「ビジネスとして何が起きたか」を1イベントで表現する。
                </div>
              </div>
              <div className="ap-box ap-bad">
                <div className="ap-bad-title">
                  ❌ Anti-Pattern 3: Synchronous Thinking（同期的な思考）
                </div>
                <div className="ap-desc">
                  EDAを採用しているのに同期的な応答を期待する設計。在庫サービスの完了を待つ実装→EDAのメリットを打ち消す。結果整合性を理解していない。
                </div>
              </div>
              <div className="ap-box ap-fix">
                <div className="ap-fix-title">✅ 解決策</div>
                <div className="ap-desc">
                  結果整合性（Eventual
                  Consistency）をUX設計に組み込む。注文確定後はorderId返却のみ行い、ステータス更新はWebSocket/SSE/ポーリングで通知する設計にする。
                </div>
              </div>
              <div className="ap-box ap-bad">
                <div className="ap-bad-title">❌ Anti-Pattern 4: God Event（神イベント）</div>
                <div className="ap-desc">
                  1つのイベントに50以上のフィールドを詰め込む<code>OrderSuperEvent</code>
                  →スキーマ変更の影響が甚大になり、受信者が不要なデータを受け取る。
                </div>
              </div>
              <div className="ap-box ap-fix">
                <div className="ap-fix-title">✅ 解決策</div>
                <div className="ap-desc">
                  責務を分割した複数のイベントに分ける。<code>OrderPlaced</code>、
                  <code>PaymentProcessed</code>、<code>ShipmentCreated</code>
                  を別々のイベントとして発行する。各イベントは自己完結型を保つ。
                </div>
              </div>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">15.2 アーキテクチャ健全性チェックフロー</h3>
            <div className="diag-wrap">
              <div className="diag-title">EDAアンチパターン判定フロー — 4つの確認ポイント</div>
              <MermaidDiagram chart={D_AP_CHECK} />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 16 ═══ */}
        <section className="section" id="sec-16">
          <div className="sec-header">
            <span className="sec-num">SECTION 16</span>
            <span className="sec-icon">📚</span>
            <div>
              <h2 className="sec-title">参考文献・ソース一覧</h2>
              <p className="sec-subtitle">公式ドキュメント・書籍・チュートリアル</p>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">16.1 必読書籍</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>タイトル</th>
                    <th>著者</th>
                    <th>難易度</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Designing Event-Driven Systems</strong>
                    </td>
                    <td>Ben Stopford</td>
                    <td>
                      <span className="tag blue">★★★☆☆</span>
                    </td>
                    <td>KafkaベースのEDA設計（Confluentより無料PDF配布）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Building Event-Driven Microservices</strong>
                    </td>
                    <td>Adam Bellemare</td>
                    <td>
                      <span className="tag orange">★★★★☆</span>
                    </td>
                    <td>EDAとマイクロサービスの実践・Kafka中心</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Designing Data-Intensive Applications</strong>
                    </td>
                    <td>Martin Kleppmann</td>
                    <td>
                      <span className="tag red">★★★★★</span>
                    </td>
                    <td>ストリーミング処理・分散システムの決定版教科書</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Enterprise Integration Patterns</strong>
                    </td>
                    <td>Hohpe &amp; Woolf</td>
                    <td>
                      <span className="tag orange">★★★★☆</span>
                    </td>
                    <td>メッセージングパターンの原典・名著</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Implementing Domain-Driven Design</strong>
                    </td>
                    <td>Vaughn Vernon</td>
                    <td>
                      <span className="tag orange">★★★★☆</span>
                    </td>
                    <td>DDD × EDAの統合・ドメインイベント設計</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="subsec">
            <h3 className="subsec-title">16.2 公式ドキュメント・ URL</h3>
            <div className="ref-box">
              <div className="ref-title">🔗 EDAコア概念</div>
              <div className="ref-links">
                <Ext
                  href="https://martinfowler.com/articles/201701-event-driven.html"
                  className="ref-link"
                >
                  Event-Driven Architecture — Martin Fowler
                </Ext>
                <Ext href="https://martinfowler.com/eaaDev/EventSourcing.html" className="ref-link">
                  Event Sourcing — Martin Fowler
                </Ext>
                <Ext href="https://martinfowler.com/bliki/CQRS.html" className="ref-link">
                  CQRS — Martin Fowler
                </Ext>
                <Ext
                  href="https://martinfowler.com/articles/patterns-of-distributed-systems/saga.html"
                  className="ref-link"
                >
                  Saga Pattern — Martin Fowler
                </Ext>
                <Ext href="https://martinfowler.com/bliki/CircuitBreaker.html" className="ref-link">
                  Circuit Breaker — Martin Fowler
                </Ext>
                <Ext href="https://cloudevents.io/" className="ref-link">
                  CloudEvents 仕様（CNCF）
                </Ext>
                <Ext href="https://www.enterpriseintegrationpatterns.com/" className="ref-link">
                  Enterprise Integration Patterns
                </Ext>
              </div>
            </div>
            <div className="ref-box">
              <div className="ref-title">🔗 Apache Kafka</div>
              <div className="ref-links">
                <Ext href="https://kafka.apache.org/documentation/" className="ref-link">
                  Apache Kafka 公式ドキュメント
                </Ext>
                <Ext href="https://developer.confluent.io/learn-kafka/" className="ref-link">
                  Confluent Kafka チュートリアル
                </Ext>
                <Ext
                  href="https://www.confluent.io/designing-event-driven-systems/"
                  className="ref-link"
                >
                  Designing Event-Driven Systems（無料書籍PDF）
                </Ext>
                <Ext href="https://kafka-python.readthedocs.io/" className="ref-link">
                  kafka-python ドキュメント
                </Ext>
                <Ext
                  href="https://docs.confluent.io/platform/current/kafka/monitoring.html"
                  className="ref-link"
                >
                  Kafka Monitoring — Confluent
                </Ext>
              </div>
            </div>
            <div className="ref-box">
              <div className="ref-title">🔗 AWSイベントサービス</div>
              <div className="ref-links">
                <Ext href="https://aws.amazon.com/eventbridge/" className="ref-link">
                  AWS EventBridge
                </Ext>
                <Ext href="https://aws.amazon.com/sqs/" className="ref-link">
                  Amazon SQS
                </Ext>
                <Ext href="https://aws.amazon.com/sns/" className="ref-link">
                  Amazon SNS
                </Ext>
                <Ext href="https://aws.amazon.com/kinesis/" className="ref-link">
                  Amazon Kinesis
                </Ext>
                <Ext href="https://aws.amazon.com/step-functions/" className="ref-link">
                  AWS Step Functions
                </Ext>
              </div>
            </div>
            <div className="ref-box">
              <div className="ref-title">🔗 Event Sourcing / CQRS / Observability</div>
              <div className="ref-links">
                <Ext href="https://www.eventstore.com/" className="ref-link">
                  EventStoreDB 公式
                </Ext>
                <Ext href="https://developer.axoniq.io/" className="ref-link">
                  Axon Framework（Java CQRS/ES）
                </Ext>
                <Ext
                  href="https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf"
                  className="ref-link"
                >
                  Greg Young — CQRS Documents
                </Ext>
                <Ext href="https://www.jaegertracing.io/" className="ref-link">
                  Jaeger 分散トレーシング
                </Ext>
                <Ext href="https://opentelemetry.io/" className="ref-link">
                  OpenTelemetry 公式
                </Ext>
                <Ext href="https://grafana.com/" className="ref-link">
                  Grafana 公式
                </Ext>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
