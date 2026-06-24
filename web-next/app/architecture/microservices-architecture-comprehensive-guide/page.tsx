import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import MicroservicesArchitectureSidebar, {
  type NavGroup,
} from "./MicroservicesArchitectureSidebar";

const NAV_GROUPS: NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "s1", num: "01", label: "マイクロサービスとは" },
      { id: "s2", num: "02", label: "モノリス vs MS" },
    ],
  },
  {
    title: "設計",
    items: [
      { id: "s3", num: "03", label: "設計原則" },
      { id: "s4", num: "04", label: "サービス分割の戦略" },
      { id: "s5", num: "05", label: "通信パターン" },
      { id: "s6", num: "06", label: "APIゲートウェイ" },
      { id: "s7", num: "07", label: "サービスディスカバリ" },
    ],
  },
  {
    title: "データ・信頼性",
    items: [
      { id: "s8", num: "08", label: "データ管理戦略" },
      { id: "s9", num: "09", label: "障害耐性と回復力" },
      { id: "s10", num: "10", label: "セキュリティ設計" },
    ],
  },
  {
    title: "インフラ・運用",
    items: [
      { id: "s11", num: "11", label: "CI/CDパイプライン" },
      { id: "s12", num: "12", label: "Kubernetes" },
      { id: "s13", num: "13", label: "オブザーバビリティ" },
    ],
  },
  {
    title: "実践・応用",
    items: [
      { id: "s14", num: "14", label: "実践：ECサイト事例" },
      { id: "s15", num: "15", label: "移行戦略" },
      { id: "s16", num: "16", label: "ベストプラクティス" },
      { id: "s17", num: "17", label: "アンチパターン" },
      { id: "s18", num: "18", label: "参考文献" },
    ],
  },
];

const MERMAID_DATA: Record<string, string> = {
  dm1: `mindmap
  root((マイクロサービス))
    独立性
      独立デプロイ
      独立スケール
      障害隔離
    技術多様性
      言語の自由選択
      最適なDBを選択
    チーム自律性
      小チームが所有
      独立した開発サイクル
    ビジネス機能単位
      Bounded Context
      単一責任原則`,
  dm2: `graph TD
    subgraph MON["モノリスアーキテクチャ"]
        UI["プレゼンテーション層"]
        BIZ["ビジネスロジック層<br/>注文・在庫・決済・通知<br/>すべてが1プロセスに混在"]
        DAT["データアクセス層"]
        DB1[("単一DB")]
        UI --> BIZ --> DAT --> DB1
    end
    P1["❌ 1行変更でも全体デプロイ"]
    P2["❌ 全体を一括スケール"]
    P3["❌ 技術的負債が蓄積"]
    P4["❌ チームのボトルネック"]
    BIZ --> P1
    BIZ --> P2
    BIZ --> P3
    BIZ --> P4
    style BIZ fill:#7f1d1d,color:#fca5a5
    style DB1 fill:#1e3a5f,color:#93c5fd
    style P1 fill:#450a0a,color:#fca5a5
    style P2 fill:#450a0a,color:#fca5a5
    style P3 fill:#450a0a,color:#fca5a5
    style P4 fill:#450a0a,color:#fca5a5`,
  dm3: `graph TD
    CLI["クライアント Web/Mobile"]
    GW["APIゲートウェイ Kong"]
    ORDER["注文サービス Python+FastAPI"]
    INV["在庫サービス Go+Gin"]
    PAY["決済サービス Java+Spring"]
    USR["ユーザーサービス Node.js"]
    KAFKA["Apache Kafka イベントバス"]
    NOTIFY["通知サービス"]
    CLI --> GW
    GW --> ORDER & INV & PAY & USR
    ORDER --> DB_O[("注文DB PostgreSQL")]
    INV --> DB_I[("在庫DB MongoDB")]
    PAY --> DB_P[("決済DB PostgreSQL")]
    ORDER & PAY --> KAFKA --> NOTIFY
    style GW fill:#92400e,color:#fde68a
    style ORDER fill:#1e3a5f,color:#93c5fd
    style INV fill:#14532d,color:#86efac
    style PAY fill:#4c1d95,color:#c4b5fd
    style KAFKA fill:#7f1d1d,color:#fca5a5`,
  dm4: `graph LR
    P["8設計原則"]
    P --> P1["1 単一責任<br/>1サービス=1機能"]
    P --> P2["2 独立デプロイ<br/>他に影響なくデプロイ"]
    P --> P3["3 データ所有<br/>専用DBを持つ"]
    P --> P4["4 疎結合<br/>依存を最小化"]
    P --> P5["5 高凝集<br/>関連機能をまとめる"]
    P --> P6["6 障害隔離<br/>局所化する"]
    P --> P7["7 分散ガバナンス<br/>各チームが技術選択"]
    P --> P8["8 自動化前提<br/>CI/CD必須"]
    style P fill:#1e3a5f,color:#93c5fd
    style P1 fill:#1e3a5f,color:#e0f2fe
    style P2 fill:#14532d,color:#dcfce7
    style P3 fill:#4c1d95,color:#ede9fe
    style P4 fill:#7f1d1d,color:#fee2e2
    style P5 fill:#92400e,color:#fef3c7
    style P6 fill:#164e63,color:#cffafe
    style P7 fill:#14532d,color:#dcfce7
    style P8 fill:#4c1d95,color:#ede9fe`,
  dm5: `graph TD
    DOM["ECサイト全体ドメイン"]
    DOM --> BC1["注文コンテキスト"]
    DOM --> BC2["在庫コンテキスト"]
    DOM --> BC3["決済コンテキスト"]
    DOM --> BC4["配送コンテキスト"]
    DOM --> BC5["顧客コンテキスト"]
    DOM --> BC6["商品カタログ"]
    BC1 --> S1["Order Service<br/>Python+PostgreSQL"]
    BC2 --> S2["Inventory Service<br/>Go+MongoDB"]
    BC3 --> S3["Payment Service<br/>Java+PostgreSQL"]
    BC4 --> S4["Shipping Service<br/>Go+PostgreSQL"]
    BC5 --> S5["User Service<br/>Node.js+MySQL"]
    BC6 --> S6["Catalog Service<br/>Node.js+Elasticsearch"]
    style DOM fill:#1e3a5f,color:#93c5fd
    style BC1 fill:#1e3a5f,color:#e0f2fe
    style BC2 fill:#14532d,color:#dcfce7
    style BC3 fill:#4c1d95,color:#ede9fe
    style BC4 fill:#92400e,color:#fef3c7
    style BC5 fill:#164e63,color:#cffafe
    style BC6 fill:#7f1d1d,color:#fee2e2`,
  dm6: `flowchart LR
    subgraph P1["Phase 1: 現状"]
        M1["モノリス<br/>全機能"]
    end
    subgraph P2["Phase 2: 新機能を外部に"]
        PR2["プロキシ"] --> M2["モノリス"]
        PR2 --> N2["新サービス"]
    end
    subgraph P3["Phase 3: 段階的移行"]
        PR3["プロキシ"] --> M3["縮小したモノリス"]
        PR3 --> SA["サービスA"]
        PR3 --> SB["サービスB"]
    end
    subgraph P4["Phase 4: 完全移行"]
        GW4["API Gateway"] --> S1["サービス1"]
        GW4 --> S2["サービス2"]
        GW4 --> S3["サービス3"]
    end
    P1 --> P2 --> P3 --> P4
    style P1 fill:#450a0a,color:#fca5a5
    style P4 fill:#052e16,color:#86efac`,
  dm7: `flowchart TD
    ST["通信方式を選択する"]
    Q1{"即時応答が必要？"}
    Q2{"高スループット？<br/>秒間1万件以上"}
    Q3{"複数サービスが<br/>同イベントに反応？"}
    Q4{"疎結合を優先？"}
    R1["REST API<br/>シンプル・標準的"]
    R2["gRPC<br/>高速・型安全"]
    R3["Kafka<br/>高スループット・永続化"]
    R4["RabbitMQ / SQS<br/>非同期・信頼性重視"]
    ST --> Q1
    Q1 -->|"Yes 同期"| Q2
    Q1 -->|"No 非同期"| Q3
    Q2 -->|"Yes"| R2
    Q2 -->|"No"| R1
    Q3 -->|"Yes Pub/Sub"| R3
    Q3 -->|"No"| Q4
    Q4 -->|"Yes"| R4
    Q4 -->|"No"| R1
    style R1 fill:#14532d,color:#dcfce7
    style R2 fill:#1e3a5f,color:#e0f2fe
    style R3 fill:#92400e,color:#fef3c7
    style R4 fill:#4c1d95,color:#ede9fe`,
  dm8: `graph TD
    WEB["Webアプリ"] & MOB["Mobileアプリ"] & PAR["サードパーティ"] --> GW
    GW["APIゲートウェイ<br/>Kong / AWS API GW / Nginx"]
    GW --> F1["認証・認可<br/>JWT / OAuth2"]
    GW --> F2["レート制限<br/>Rate Limiting"]
    GW --> F3["ロギング<br/>リクエストログ"]
    GW --> F4["キャッシング"]
    GW --> F5["SSLターミネーション"]
    GW --> F6["サーキットブレーカー"]
    F1 & F2 & F3 & F4 & F5 & F6 --> MS["マイクロサービス群"]
    style GW fill:#92400e,color:#fde68a
    style F1 fill:#7f1d1d,color:#fca5a5
    style MS fill:#1e3a5f,color:#93c5fd`,
  dm9: `graph LR
    WC["Webアプリ"] --> WB["Web BFF<br/>PC向けデータ最適化<br/>GraphQL対応"]
    IS["iOSアプリ"] & AN["Androidアプリ"] --> MB["Mobile BFF<br/>軽量レスポンス<br/>オフライン対応"]
    PT["パートナーAPI"] --> PB["Partner BFF<br/>SLA管理<br/>レート制限"]
    WB & MB & PB --> S1["注文サービス"]
    WB & MB & PB --> S2["商品サービス"]
    WB & MB & PB --> S3["ユーザーサービス"]
    style WB fill:#1e3a5f,color:#93c5fd
    style MB fill:#14532d,color:#86efac
    style PB fill:#4c1d95,color:#c4b5fd`,
  dm10: `graph LR
    subgraph BAD["❌ 共有DB アンチパターン"]
        SA["サービスA"] --> SD[("共有DB<br/>密結合の原因")]
        SB["サービスB"] --> SD
        SC["サービスC"] --> SD
    end
    subgraph GOOD["✅ DB per Service パターン"]
        SA2["サービスA"] --> DA[("DB A<br/>PostgreSQL")]
        SB2["サービスB"] --> DB2[("DB B<br/>MongoDB")]
        SC2["サービスC"] --> DC[("DB C<br/>Redis")]
    end
    style BAD fill:#450a0a
    style GOOD fill:#052e16
    style SD fill:#7f1d1d,color:#fca5a5`,
  dm11: `sequenceDiagram
    participant CLI as クライアント
    participant ORD as 注文サービス
    participant INV as 在庫サービス
    participant PAY as 決済サービス
    participant KFK as Kafka
    participant NOT as 通知サービス
    Note over ORD,NOT: 正常フロー
    CLI->>ORD: 注文作成リクエスト
    ORD->>INV: 在庫確認 gRPC
    INV-->>ORD: 在庫あり OK
    ORD->>PAY: 決済処理 REST
    PAY-->>ORD: 決済成功 OK
    ORD->>ORD: 注文確定 CONFIRMED
    ORD-->>CLI: 201 Created
    ORD-)KFK: OrderConfirmedEvent
    KFK-)NOT: OrderConfirmedEvent
    NOT->>CLI: 確認メール送信
    Note over ORD,NOT: 補償トランザクション 決済失敗時
    PAY-xPAY: 決済失敗
    PAY-)KFK: PaymentFailedEvent
    KFK-)INV: PaymentFailedEvent
    INV->>INV: 在庫引き当て解除
    INV-)KFK: StockReleasedEvent
    KFK-)ORD: StockReleasedEvent
    ORD->>ORD: 注文キャンセル CANCELLED
    ORD-->>CLI: 422 Payment Failed`,
  dm12: `flowchart TD
    subgraph WRITE["書き込みサイド Command"]
        CMD["コマンド CreateOrder"] --> AGG["集約処理<br/>ドメインロジック"]
        AGG --> WDB[("書き込みDB<br/>PostgreSQL")]
        AGG --> EVT["イベント発行"]
    end
    subgraph BUS["メッセージバス Kafka"]
        KFK["Kafkaトピック"]
    end
    subgraph READ["読み取りサイド Query"]
        P1["プロジェクション1<br/>注文サマリー PostgreSQL"]
        P2["プロジェクション2<br/>顧客履歴 Elasticsearch"]
        P3["プロジェクション3<br/>ダッシュボード Redis"]
        QA["クエリAPI"]
    end
    EVT --> KFK
    KFK --> P1 & P2 & P3
    P1 & P2 & P3 --> QA
    style WRITE fill:#1e3a5f
    style BUS fill:#92400e
    style READ fill:#14532d`,
  dm13: `stateDiagram-v2
    [*] --> CLOSED : 初期状態
    CLOSED --> CLOSED : リクエスト成功
    CLOSED --> OPEN : 失敗率がしきい値超過
    OPEN --> OPEN : リクエストを即拒否 フォールバック返却
    OPEN --> HALF_OPEN : タイムアウト後 30秒
    HALF_OPEN --> CLOSED : テストリクエスト成功 サービス回復確認
    HALF_OPEN --> OPEN : テストリクエスト失敗 まだ回復していない`,
  dm13b: `flowchart TD
    REQ["リクエスト受信"]
    C1{"全機能が利用可能？"}
    FULL["フル機能レスポンス<br/>全データを含む"]
    C2{"キャッシュにデータあり？"}
    CACHE["キャッシュから返却<br/>多少古いデータを許容"]
    C3{"デフォルト値で対応可能？"}
    DFLT["デフォルト値で応答<br/>最低限の機能を提供"]
    ERR["503 Service Unavailable"]
    REQ --> C1
    C1 -->|"Yes"| FULL
    C1 -->|"No 外部サービス障害"| C2
    C2 -->|"Yes"| CACHE
    C2 -->|"No"| C3
    C3 -->|"Yes"| DFLT
    C3 -->|"No"| ERR
    style FULL fill:#14532d,color:#dcfce7
    style CACHE fill:#92400e,color:#fef3c7
    style DFLT fill:#78350f,color:#fed7aa
    style ERR fill:#7f1d1d,color:#fee2e2`,
  dm14: `graph TD
    subgraph EXT["外部境界"]
        WAF["WAF Web Application Firewall"]
        DDOS["DDoS Protection CloudFlare/Shield"]
    end
    subgraph GWL["APIゲートウェイ層"]
        GW2["APIゲートウェイ"]
        AU["認証 JWT/OAuth2"]
        AZ["認可 RBAC"]
        RL["レート制限"]
        TLS["TLS終端"]
    end
    subgraph SVC["サービス間通信"]
        MTLS["mTLS 相互TLS認証<br/>Istio自動化"]
        ZT["ゼロトラスト<br/>全通信を検証"]
    end
    subgraph DAT["データセキュリティ"]
        ENC["保存時暗号化 AES-256"]
        SEC["シークレット管理<br/>HashiCorp Vault"]
    end
    EXT --> GWL --> SVC --> DAT
    style WAF fill:#7f1d1d,color:#fca5a5
    style MTLS fill:#1e3a5f,color:#93c5fd
    style SEC fill:#4c1d95,color:#c4b5fd`,
  dm15: `flowchart TD
    DEV["開発者がコードをプッシュ"]
    subgraph CI["継続的インテグレーション CI"]
        L["Linting コード品質"]
        U["Unit Tests"]
        I["Integration Tests"]
        C["Contract Tests Pact"]
        B["Docker Build"]
        SC["Security Scan Trivy"]
        PU["Registry Push"]
    end
    subgraph CD["継続的デリバリー CD"]
        STG["Staging Deploy"]
        E2E["E2E Tests"]
        CAN["Canary Deploy 10%"]
        MON["Canary監視 10分間"]
        FUL["Full Deploy 100%"]
        ROL["自動ロールバック"]
    end
    DEV --> L --> U --> I --> C --> B --> SC --> PU
    PU --> STG --> E2E --> CAN --> MON
    MON -->|"正常"| FUL
    MON -->|"異常検知"| ROL
    style CI fill:#0c1e3a
    style CD fill:#0a2015
    style ROL fill:#7f1d1d,color:#fee2e2
    style FUL fill:#052e16,color:#dcfce7`,
  dm16: `graph TD
    OBS["オブザーバビリティ 可観測性"]
    OBS --> MET["📊 メトリクス<br/>Prometheus + Grafana"]
    OBS --> LOG["📝 ログ<br/>ELK Stack / Loki"]
    OBS --> TRC["🔗 トレース<br/>Jaeger / Tempo"]
    MET --> M1["リクエストレート RPS"]
    MET --> M2["エラーレート %"]
    MET --> M3["レイテンシ P50/P95/P99"]
    MET --> M4["CPU/Memory使用率"]
    LOG --> L1["構造化ログ JSON形式"]
    LOG --> L2["相関ID Correlation ID"]
    LOG --> L3["ログレベル管理"]
    TRC --> T1["分散トレーシング"]
    TRC --> T2["スパン Span の連鎖"]
    TRC --> T3["ボトルネック特定"]
    style MET fill:#1e3a5f,color:#93c5fd
    style LOG fill:#14532d,color:#86efac
    style TRC fill:#4c1d95,color:#c4b5fd`,
  dm17: `graph TD
    subgraph EDGE["エッジ層"]
        CDN["CDN CloudFront"]
        WAF2["WAF"]
        LB["Load Balancer"]
    end
    subgraph GWL["APIゲートウェイ層"]
        GW3["API Gateway Kong"]
        WBF["Web BFF"]
        MBF["Mobile BFF"]
    end
    subgraph CORE["コアサービス"]
        OR["注文 Python+FastAPI"]
        IV["在庫 Go+Gin"]
        PY["決済 Java+Spring"]
        US["ユーザー Node.js"]
        CT["商品カタログ ES"]
    end
    subgraph SUP["サポートサービス"]
        NT["通知サービス"]
        RC["レコメンド ML"]
        SH["配送サービス"]
    end
    KFK2["Apache Kafka"]
    CACHE["Redis Cluster"]
    EDGE --> GWL
    GWL --> CORE
    CORE --> KFK2
    KFK2 --> SUP
    CORE --> CACHE
    style GW3 fill:#92400e,color:#fde68a
    style KFK2 fill:#7f1d1d,color:#fca5a5
    style CACHE fill:#164e63,color:#cffafe`,
  dm18: `sequenceDiagram
    participant U as ユーザー
    participant GW as API Gateway
    participant OR as 注文サービス
    participant IV as 在庫サービス
    participant PY as 決済サービス
    participant KK as Kafka
    participant NT as 通知サービス
    participant SH as 配送サービス
    U->>GW: POST /v1/orders
    GW->>GW: JWT認証 レート制限
    GW->>OR: 注文作成リクエスト転送
    OR->>IV: 在庫確認 同期gRPC
    IV-->>OR: 在庫あり OK
    OR->>OR: 注文レコード作成 PENDING
    OR->>PY: 決済処理 同期REST
    PY-->>OR: 決済成功 OK
    OR->>OR: 注文確定 CONFIRMED
    OR-->>GW: 201 Created
    GW-->>U: 201 Created 即座に応答
    Note over OR,SH: ここから非同期処理
    OR-)KK: OrderConfirmedEvent
    par 並行非同期処理
        KK-)NT: OrderConfirmedEvent
        NT->>U: 確認メール送信
        KK-)IV: OrderConfirmedEvent
        IV->>IV: 在庫引き当て確定
        KK-)SH: OrderConfirmedEvent
        SH->>SH: 配送手配
    end`,
  dm19: `flowchart TD
    subgraph S1["Stage 1: 準備・分析"]
        A1["機能マッピング"]
        A2["依存関係分析"]
        A3["Bounded Context定義"]
        A4["CI/CD・コンテナ整備"]
    end
    subgraph S2["Stage 2: 低リスク分離"]
        B1["通知・メール送信を先に分離"]
        B2["新機能をマイクロサービスとして開発"]
    end
    subgraph S3["Stage 3: コアサービス分離"]
        C1["ユーザーサービス分離"]
        C2["商品カタログ分離"]
        C3["注文サービス分離"]
        C4["決済サービス分離"]
    end
    subgraph S4["Stage 4: 完了・最適化"]
        D1["在庫・物流サービス分離"]
        D2["モノリス廃止"]
        D3["全サービス最適化"]
    end
    S1 --> S2 --> S3 --> S4
    style S1 fill:#1e3a5f
    style S2 fill:#14532d
    style S3 fill:#92400e
    style S4 fill:#4c1d95`,
  dm20: `graph TD
    L0["Level 0 モノリス<br/>単一デプロイメント"]
    L1["Level 1 モジュラーモノリス<br/>コード分離 デプロイ一括"]
    L2["Level 2 基本マイクロサービス<br/>サービス分離 独立デプロイ"]
    L3["Level 3 イベント駆動<br/>Kafkaによる非同期 疎結合"]
    L4["Level 4 クラウドネイティブ<br/>K8s サービスメッシュ 完全自動化"]
    L5["Level 5 Platform Engineering<br/>内部開発者プラットフォーム"]
    L0 --> L1 --> L2 --> L3 --> L4 --> L5
    style L0 fill:#7f1d1d,color:#fca5a5
    style L1 fill:#78350f,color:#fde68a
    style L2 fill:#92400e,color:#fed7aa
    style L3 fill:#14532d,color:#bbf7d0
    style L4 fill:#1e3a5f,color:#bae6fd
    style L5 fill:#4c1d95,color:#ddd6fe`,
  dm21: `flowchart TD
    CK["マイクロサービス 健全性チェック"]
    Q1{"各サービスが独立して<br/>デプロイできるか？"}
    Q2{"他サービスのDBに<br/>直接アクセスしていないか？"}
    Q3{"1リクエストで5以上の<br/>同期通信があるか？"}
    Q4{"1チームで<br/>所有・運用できるか？"}
    Q5{"ログ・メトリクス・<br/>トレーシングが整備されているか？"}
    F1["Contract Testで独立性を保証"]
    F2["DB per Service に移行"]
    F3["BFFまたは非同期通信に移行"]
    F4["サービスを統合・再編成"]
    F5["OpenTelemetryを導入"]
    OK["健全なマイクロサービス"]
    CK --> Q1
    Q1 -->|"No"| F1
    Q1 -->|"Yes"| Q2
    Q2 -->|"No"| F2
    Q2 -->|"Yes"| Q3
    Q3 -->|"Yes"| F3
    Q3 -->|"No"| Q4
    Q4 -->|"No"| F4
    Q4 -->|"Yes"| Q5
    Q5 -->|"No"| F5
    Q5 -->|"Yes"| OK
    style OK fill:#14532d,color:#dcfce7
    style F1 fill:#1e3a5f,color:#93c5fd
    style F2 fill:#1e3a5f,color:#93c5fd
    style F3 fill:#1e3a5f,color:#93c5fd
    style F4 fill:#1e3a5f,color:#93c5fd
    style F5 fill:#1e3a5f,color:#93c5fd`,
};

const CODE_BLOCKS: Record<string, string> = {
  code1: `<span class="kw">import</span> httpx

<span class="kw">class</span> <span class="fn">InventoryServiceClient</span>:
    <span class="cm">"""
    在庫サービスへの同期HTTPクライアント
    タイムアウト・エラーハンドリングをすべて内包する
    """</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, base_url: str, timeout: float = <span class="nu">5.0</span>):
        <span class="kw">self</span>.base_url = base_url
        <span class="kw">self</span>.timeout = httpx.<span class="fn">Timeout</span>(connect=<span class="nu">2.0</span>, read=timeout)

    <span class="kw">async</span> <span class="kw">def</span> <span class="fn">check_availability</span>(<span class="kw">self</span>, product_id: str, quantity: int) -&gt; dict:
        <span class="cm">"""在庫確認API呼び出し（冪等操作）"""</span>
        <span class="kw">async</span> <span class="kw">with</span> httpx.<span class="fn">AsyncClient</span>(timeout=<span class="kw">self</span>.timeout) <span class="kw">as</span> client:
            <span class="kw">try</span>:
                response = <span class="kw">await</span> client.<span class="fn">get</span>(
                    f<span class="st">"\${self.base_url}/inventory/\${product_id}"</span>,
                    params={<span class="st">"requested_quantity"</span>: quantity},
                    headers={<span class="st">"X-Service-Name"</span>: <span class="st">"order-service"</span>},
                )
                response.<span class="fn">raise_for_status</span>()
                <span class="kw">return</span> response.<span class="fn">json</span>()
            <span class="kw">except</span> httpx.<span class="fn">TimeoutException</span>:
                <span class="kw">raise</span> <span class="fn">ServiceUnavailableError</span>(<span class="st">"在庫サービスがタイムアウトしました"</span>)
            <span class="kw">except</span> httpx.<span class="fn">HTTPStatusError</span> <span class="kw">as</span> e:
                <span class="kw">if</span> e.response.status_code == <span class="nu">404</span>:
                    <span class="kw">raise</span> <span class="fn">ProductNotFoundError</span>(f<span class="st">"商品が見つかりません: \${product_id}"</span>)
                <span class="kw">raise</span> <span class="fn">ServiceError</span>(f<span class="st">"在庫サービスエラー: \${e.response.status_code}"</span>)

    <span class="kw">async</span> <span class="kw">def</span> <span class="fn">reserve_stock</span>(<span class="kw">self</span>, product_id: str, quantity: int, order_id: str) -&gt; dict:
        <span class="cm">"""在庫引き当て（冪等キー付き）"""</span>
        <span class="kw">async</span> <span class="kw">with</span> httpx.<span class="fn">AsyncClient</span>(timeout=<span class="kw">self</span>.timeout) <span class="kw">as</span> client:
            response = <span class="kw">await</span> client.<span class="fn">post</span>(
                f<span class="st">"\${self.base_url}/inventory/\${product_id}/reserve"</span>,
                json={<span class="st">"quantity"</span>: quantity, <span class="st">"order_id"</span>: order_id},
                headers={
                    <span class="st">"X-Service-Name"</span>: <span class="st">"order-service"</span>,
                    <span class="cm"># 冪等性キー: 同じリクエストの重複処理を防ぐ</span>
                    <span class="st">"Idempotency-Key"</span>: f<span class="st">"reserve-\${order_id}-\${product_id}"</span>,
                }
            )
            response.<span class="fn">raise_for_status</span>()
            <span class="kw">return</span> response.<span class="fn">json</span>()`,

  code2: `<span class="kw">from</span> kafka <span class="kw">import</span> KafkaProducer, KafkaConsumer
<span class="kw">import</span> json
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass, asdict
<span class="kw">from</span> datetime <span class="kw">import</span> datetime

@<span class="fn">dataclass</span>
<span class="kw">class</span> <span class="fn">OrderPlacedEvent</span>:
    <span class="cm">"""注文確定イベント — 過去形で命名するのがベストプラクティス"""</span>
    event_id: str
    event_type: str = <span class="st">"order.placed"</span>
    order_id: str = <span class="st">""</span>
    customer_id: str = <span class="st">""</span>
    items: list = <span class="kw">None</span>
    total_amount: float = <span class="nu">0.0</span>
    occurred_at: str = <span class="st">""</span>

    <span class="kw">def</span> <span class="fn">__post_init__</span>(<span class="kw">self</span>):
        <span class="kw">if</span> <span class="kw">self</span>.occurred_at == <span class="st">""</span>:
            <span class="kw">self</span>.occurred_at = datetime.<span class="fn">utcnow</span>().<span class="fn">isoformat</span>()
        <span class="kw">if</span> <span class="kw">self</span>.items <span class="kw">is</span> <span class="kw">None</span>:
            <span class="kw">self</span>.items = []

<span class="cm"># ── プロデューサー（注文サービス） ──</span>
<span class="kw">class</span> <span class="fn">OrderEventProducer</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, bootstrap_servers: list):
        <span class="kw">self</span>._producer = <span class="fn">KafkaProducer</span>(
            bootstrap_servers=bootstrap_servers,
            value_serializer=<span class="kw">lambda</span> v: json.<span class="fn">dumps</span>(v).<span class="fn">encode</span>(<span class="st">"utf-8"</span>),
            acks=<span class="st">"all"</span>,    <span class="cm"># 全レプリカへの書き込みを確認</span>
            retries=<span class="nu">3</span>,
        )

    <span class="kw">def</span> <span class="fn">publish_order_placed</span>(<span class="kw">self</span>, event: OrderPlacedEvent):
        <span class="cm">"""同じ注文IDは常に同じパーティションへ（順序保証）"""</span>
        <span class="kw">self</span>._producer.<span class="fn">send</span>(
            topic=<span class="st">"orders"</span>,
            key=event.order_id.<span class="fn">encode</span>(<span class="st">"utf-8"</span>),
            value=<span class="fn">asdict</span>(event)
        )
        <span class="kw">self</span>._producer.<span class="fn">flush</span>()

<span class="cm"># ── コンシューマー（通知サービス） ──</span>
<span class="kw">class</span> <span class="fn">NotificationEventConsumer</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, bootstrap_servers: list):
        <span class="kw">self</span>._consumer = <span class="fn">KafkaConsumer</span>(
            <span class="st">"orders"</span>,
            bootstrap_servers=bootstrap_servers,
            group_id=<span class="st">"notification-service"</span>,
            value_deserializer=<span class="kw">lambda</span> v: json.<span class="fn">loads</span>(v.<span class="fn">decode</span>(<span class="st">"utf-8"</span>)),
            enable_auto_commit=<span class="kw">False</span>,  <span class="cm"># 手動コミットで確実な処理を保証</span>
        )

    <span class="kw">def</span> <span class="fn">start</span>(<span class="kw">self</span>):
        <span class="kw">for</span> message <span class="kw">in</span> <span class="kw">self</span>._consumer:
            event = message.value
            <span class="kw">if</span> event[<span class="st">"event_type"</span>] == <span class="st">"order.placed"</span>:
                <span class="kw">self</span>.<span class="fn">_send_confirmation_email</span>(event)
                <span class="cm"># 処理成功後にコミット（処理前のコミットはNG）</span>
                <span class="kw">self</span>._consumer.<span class="fn">commit</span>()`,

  code3: `<span class="kw">_format_version</span>: <span class="st">"3.0"</span>

<span class="kw">services</span>:
  - <span class="kw">name</span>: <span class="st">order-service</span>
    <span class="kw">url</span>: <span class="st">http://order-service:8001</span>
    <span class="kw">connect_timeout</span>: <span class="nu">5000</span>
    <span class="kw">read_timeout</span>: <span class="nu">10000</span>
    <span class="kw">retries</span>: <span class="nu">3</span>

<span class="kw">routes</span>:
  - <span class="kw">name</span>: <span class="st">order-routes</span>
    <span class="kw">service</span>: <span class="st">order-service</span>
    <span class="kw">paths</span>:
      - <span class="st">/v1/orders</span>
    <span class="kw">methods</span>: [<span class="st">GET</span>, <span class="st">POST</span>, <span class="st">DELETE</span>]

<span class="kw">plugins</span>:
  <span class="cm"># JWT認証（全サービスに適用）</span>
  - <span class="kw">name</span>: <span class="st">jwt</span>
    <span class="kw">config</span>:
      <span class="kw">secret_is_base64</span>: <span class="kw">false</span>
      <span class="kw">claims_to_verify</span>: [<span class="st">exp</span>, <span class="st">nbf</span>]

  <span class="cm"># レート制限（注文サービスに個別設定）</span>
  - <span class="kw">name</span>: <span class="st">rate-limiting</span>
    <span class="kw">service</span>: <span class="st">order-service</span>
    <span class="kw">config</span>:
      <span class="kw">minute</span>: <span class="nu">100</span>          <span class="cm"># 1分あたり100リクエスト</span>
      <span class="kw">hour</span>: <span class="nu">5000</span>           <span class="cm"># 1時間あたり5000リクエスト</span>
      <span class="kw">policy</span>: <span class="st">redis</span>        <span class="cm"># Redisで分散レート制限</span>
      <span class="kw">redis_host</span>: <span class="st">redis</span>
      <span class="kw">redis_port</span>: <span class="nu">6379</span>

  <span class="cm"># リクエストロギング</span>
  - <span class="kw">name</span>: <span class="st">http-log</span>
    <span class="kw">config</span>:
      <span class="kw">http_endpoint</span>: <span class="st">http://logging-service:9200/logs</span>
      <span class="kw">method</span>: <span class="st">POST</span>

  <span class="cm"># CORS設定</span>
  - <span class="kw">name</span>: <span class="st">cors</span>
    <span class="kw">config</span>:
      <span class="kw">origins</span>: [<span class="st">"https://example.com"</span>]
      <span class="kw">methods</span>: [<span class="st">GET</span>, <span class="st">POST</span>, <span class="st">OPTIONS</span>]
      <span class="kw">headers</span>: [<span class="st">Authorization</span>, <span class="st">Content-Type</span>]
      <span class="kw">max_age</span>: <span class="nu">3600</span>`,

  code4: `<span class="kw">apiVersion</span>: <span class="st">apps/v1</span>
<span class="kw">kind</span>: <span class="st">Deployment</span>
<span class="kw">metadata</span>:
  <span class="kw">name</span>: <span class="st">order-service</span>
  <span class="kw">labels</span>:
    <span class="kw">app</span>: <span class="st">order-service</span>
    <span class="kw">version</span>: <span class="st">"2.1.0"</span>
<span class="kw">spec</span>:
  <span class="kw">replicas</span>: <span class="nu">3</span>
  <span class="kw">selector</span>:
    <span class="kw">matchLabels</span>:
      <span class="kw">app</span>: <span class="st">order-service</span>
  <span class="kw">template</span>:
    <span class="kw">spec</span>:
      <span class="kw">containers</span>:
        - <span class="kw">name</span>: <span class="st">order-service</span>
          <span class="kw">image</span>: <span class="st">myregistry/order-service:2.1.0</span>
          <span class="kw">ports</span>:
            - <span class="kw">containerPort</span>: <span class="nu">8001</span>
          <span class="kw">env</span>:
            - <span class="kw">name</span>: <span class="st">DATABASE_URL</span>
              <span class="kw">valueFrom</span>:
                <span class="kw">secretKeyRef</span>:
                  <span class="kw">name</span>: <span class="st">order-db-secret</span>
                  <span class="kw">key</span>: <span class="st">url</span>
          <span class="cm"># ヘルスチェック設定（必須）</span>
          <span class="kw">livenessProbe</span>:
            <span class="kw">httpGet</span>:
              <span class="kw">path</span>: <span class="st">/health/live</span>
              <span class="kw">port</span>: <span class="nu">8001</span>
            <span class="kw">initialDelaySeconds</span>: <span class="nu">30</span>
            <span class="kw">periodSeconds</span>: <span class="nu">10</span>
          <span class="kw">readinessProbe</span>:
            <span class="kw">httpGet</span>:
              <span class="kw">path</span>: <span class="st">/health/ready</span>
              <span class="kw">port</span>: <span class="nu">8001</span>
            <span class="kw">initialDelaySeconds</span>: <span class="nu">10</span>
            <span class="kw">periodSeconds</span>: <span class="nu">5</span>
          <span class="cm"># リソース制限（必須）</span>
          <span class="kw">resources</span>:
            <span class="kw">requests</span>:
              <span class="kw">cpu</span>: <span class="st">"100m"</span>
              <span class="kw">memory</span>: <span class="st">"256Mi"</span>
            <span class="kw">limits</span>:
              <span class="kw">cpu</span>: <span class="st">"500m"</span>
              <span class="kw">memory</span>: <span class="st">"512Mi"</span>
<span class="st">---</span>
<span class="cm"># Kubernetes Service（DNS名で解決できる内部LB）</span>
<span class="kw">apiVersion</span>: <span class="st">v1</span>
<span class="kw">kind</span>: <span class="st">Service</span>
<span class="kw">metadata</span>:
  <span class="kw">name</span>: <span class="st">order-service</span>  <span class="cm"># この名前でDNS解決される</span>
<span class="kw">spec</span>:
  <span class="kw">selector</span>:
    <span class="kw">app</span>: <span class="st">order-service</span>
  <span class="kw">ports</span>:
    - <span class="kw">port</span>: <span class="nu">80</span>
      <span class="kw">targetPort</span>: <span class="nu">8001</span>
  <span class="kw">type</span>: <span class="st">ClusterIP</span>
<span class="st">---</span>
<span class="cm"># HPA（CPU使用率70%超でスケールアウト）</span>
<span class="kw">apiVersion</span>: <span class="st">autoscaling/v2</span>
<span class="kw">kind</span>: <span class="st">HorizontalPodAutoscaler</span>
<span class="kw">metadata</span>:
  <span class="kw">name</span>: <span class="st">order-service-hpa</span>
<span class="kw">spec</span>:
  <span class="kw">scaleTargetRef</span>:
    <span class="kw">apiVersion</span>: <span class="st">autoscaling/v2</span>
    <span class="kw">kind</span>: <span class="st">Deployment</span>
    <span class="kw">name</span>: <span class="st">order-service</span>
  <span class="kw">minReplicas</span>: <span class="nu">2</span>
  <span class="kw">maxReplicas</span>: <span class="nu">20</span>
  <span class="kw">metrics</span>:
    - <span class="kw">type</span>: <span class="st">Resource</span>
      <span class="kw">resource</span>:
        <span class="kw">name</span>: <span class="st">cpu</span>
        <span class="kw">target</span>:
          <span class="kw">type</span>: <span class="st">Utilization</span>
          <span class="kw">averageUtilization</span>: <span class="nu">70</span>`,

  code5: `<span class="kw">import</span> time
<span class="kw">from</span> enum <span class="kw">import</span> Enum
<span class="kw">from</span> typing <span class="kw">import</span> Callable, Any, Optional
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
<span class="kw">import</span> logging

logger = logging.<span class="fn">getLogger</span>(__name__)

<span class="kw">class</span> <span class="fn">CircuitState</span>(Enum):
    CLOSED = <span class="st">"closed"</span>       <span class="cm"># 正常状態: リクエストを通す</span>
    OPEN = <span class="st">"open"</span>           <span class="cm"># 障害状態: リクエストを即拒否</span>
    HALF_OPEN = <span class="st">"half_open"</span> <span class="cm"># 回復確認中</span>

@<span class="fn">dataclass</span>
<span class="kw">class</span> <span class="fn">CircuitBreakerConfig</span>:
    failure_threshold: int = <span class="nu">5</span>       <span class="cm"># OPEN になる失敗回数</span>
    success_threshold: int = <span class="nu">2</span>       <span class="cm"># CLOSED に戻る成功回数</span>
    timeout_duration: float = <span class="nu">30.0</span>   <span class="cm"># OPEN 状態の持続時間（秒）</span>
    half_open_max_calls: int = <span class="nu">3</span>     <span class="cm"># HALF_OPEN でのテスト回数上限</span>

<span class="kw">class</span> <span class="fn">CircuitBreaker</span>:
    <span class="cm">"""外部サービス呼び出しをラップして障害を局所化する"""</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, service_name: str, config: CircuitBreakerConfig = <span class="kw">None</span>):
        <span class="kw">self</span>.service_name = service_name
        <span class="kw">self</span>.config = config <span class="kw">or</span> <span class="fn">CircuitBreakerConfig</span>()
        <span class="kw">self</span>._state = CircuitState.CLOSED
        <span class="kw">self</span>._failure_count = <span class="nu">0</span>
        <span class="kw">self</span>._success_count = <span class="nu">0</span>
        <span class="kw">self</span>._last_failure_time: Optional[float] = <span class="kw">None</span>
        <span class="kw">self</span>._half_open_calls = <span class="nu">0</span>

    @property
    def <span class="fn">state</span>(<span class="kw">self</span>) -&gt; CircuitState:
        <span class="cm">"""タイムアウト後に OPEN -&gt; HALF_OPEN へ自動遷移"""</span>
        <span class="kw">if</span> <span class="kw">self</span>._state == CircuitState.OPEN:
            elapsed = time.<span class="fn">time</span>() - (<span class="kw">self</span>._last_failure_time <span class="kw">or</span> <span class="nu">0</span>)
            <span class="kw">if</span> elapsed &gt; <span class="kw">self</span>.config.timeout_duration:
                <span class="kw">self</span>._state = CircuitState.HALF_OPEN
                <span class="kw">self</span>._half_open_calls = <span class="nu">0</span>
                logger.<span class="fn">info</span>(f"CB[\${self.service_name}]: OPEN -&gt; HALF_OPEN")
        <span class="kw">return</span> <span class="kw">self</span>._state

    <span class="kw">async</span> <span class="kw">def</span> <span class="fn">execute</span>(<span class="kw">self</span>, func: Callable, *args, fallback: Any = <span class="kw">None</span>, **kwargs) -&gt; Any:
        <span class="kw">if</span> <span class="kw text-info">self</span>.state == CircuitState.OPEN:
            logger.<span class="fn">warning</span>(f"CB[\${self.service_name}]: OPEN - リクエストを拒否")
            <span class="kw">if</span> fallback <span class="kw">is</span> <span class="kw">not</span> <span class="kw">None</span>:
                <span class="kw">return</span> fallback() <span class="kw text-info">if</span> <span class="fn">callable</span>(fallback) <span class="kw text-info">else</span> fallback
            <span class="kw">raise</span> <span class="fn">CircuitBreakerOpenError</span>(f"\${self.service_name} は現在利用できません")

        <span class="kw">try</span>:
            result = <span class="kw">await</span> func(*args, **kwargs)
            <span class="kw text-info">self</span>.<span class="fn">_on_success</span>()
            <span class="kw text-info">return</span> result
        <span class="kw">except</span> <span class="fn">Exception</span>:
            <span class="kw text-info">self</span>.<span class="fn">_on_failure</span>()
            <span class="kw">raise</span>

    <span class="kw">def</span> <span class="fn">_on_success</span>(<span class="kw text-info">self</span>):
        <span class="kw">if</span> <span class="kw text-info">self</span>._state == CircuitState.HALF_OPEN:
            <span class="kw text-info">self</span>._success_count += <span class="nu">1</span>
            <span class="kw">if</span> <span class="kw text-info">self</span>._success_count &gt;= <span class="kw text-info">self</span>.config.success_threshold:
                <span class="kw text-info">self</span>._state = CircuitState.CLOSED
                <span class="kw text-info">self</span>._failure_count = <span class="nu">0</span>
                logger.<span class="fn">info</span>(f"CB[\${self.service_name}]: HALF_OPEN -&gt; CLOSED")

    <span class="kw">def</span> <span class="fn">_on_failure</span>(<span class="kw text-info">self</span>):
        <span class="kw text-info">self</span>._failure_count += <span class="nu">1</span>
        <span class="kw text-info">self</span>._last_failure_time = time.<span class="fn">time</span>()
        <span class="kw">if</span> <span class="kw text-info">self</span>._failure_count &gt;= <span class="kw text-info">self</span>.config.failure_threshold:
            <span class="kw text-info">self</span>._state = CircuitState.OPEN
            logger.<span class="fn">error</span>(f"CB[\${self.service_name}]: CLOSED -&gt; OPEN (\${self._failure_count} failures)")

<span class="cm"># 使用例</span>
inventory_cb = <span class="fn">CircuitBreaker</span>(
    service_name=<span class="st">"inventory-service"</span>,
    config=<span class="fn">CircuitBreakerConfig</span>(failure_threshold=<span class="nu">3</span>, timeout_duration=<span class="nu">30</span>)
)

<span class="kw">async</span> <span class="kw">def</span> <span class="fn">check_inventory_with_cb</span>(product_id: str, quantity: int):
    <span class="cm">"""サーキットブレーカー付き在庫確認"""</span>
    <span class="kw">return</span> <span class="kw">await</span> inventory_cb.<span class="fn">execute</span>(
        inventory_client.check_availability,
        product_id, quantity,
        fallback={<span class="st">"available"</span>: <span class="kw">False</span>, <span class="st">"reason"</span>: <span class="st">"在庫サービス利用不可（CB OPEN）"</span>}
    )`,

  code6: `<span class="kw">from</span> fastapi <span class="kw">import</span> FastAPI, Depends, HTTPException, Security
<span class="kw">from</span> fastapi.security <span class="kw">import</span> HTTPBearer, HTTPAuthorizationCredentials
<span class="kw">import</span> jwt
<span class="kw">from</span> pydantic <span class="kw">import</span> BaseModel
<span class="kw">from</span> typing <span class="kw">import</span> Optional
<span class="kw">import</span> os

<span class="cm"># 公開鍵で検証（本番環境では RS256 非対称鍵を使用）</span>
JWT_PUBLIC_KEY = os.<span class="fn">getenv</span>(<span class="st">"JWT_PUBLIC_KEY"</span>)
JWT_ALGORITHM = <span class="st">"RS256"</span>

<span class="kw">if</span> <span class="kw">not</span> JWT_PUBLIC_KEY:
    <span class="kw">raise</span> <span class="fn">RuntimeError</span>(<span class="st">"JWT_PUBLIC_KEY が設定されていません（Fail-Fast）"</span>)

security = <span class="fn">HTTPBearer</span>()

<span class="kw">class</span> <span class="fn">TokenData</span>(BaseModel):
    sub: str            <span class="cm"># ユーザーID</span>
    email: str
    roles: list
    service: Optional[str] = <span class="kw">None</span>  <span class="cm"># サービス間通信用</span>

<span class="kw">def</span> <span class="fn">verify_jwt_token</span>(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -&gt; TokenData:
    <span class="cm">"""JWTトークンの検証"""</span>
    <span class="kw">try</span>:
        payload = jwt.<span class="fn">decode</span>(
            credentials.credentials,
            JWT_PUBLIC_KEY,
            algorithms=[JWT_ALGORITHM],
            options={<span class="st">"verify_exp"</span>: <span class="kw">True</span>}
        )
        <span class="kw">return</span> <span class="fn">TokenData</span>(**payload)
    <span class="kw">except</span> jwt.<span class="fn">ExpiredSignatureError</span>:
        <span class="kw">raise</span> <span class="fn">HTTPException</span>(status_code=<span class="nu">401</span>, detail=<span class="st">"トークンの有効期限切れ"</span>)
    <span class="kw">except</span> jwt.<span class="fn">InvalidTokenError</span>:
        <span class="kw">raise</span> <span class="fn">HTTPException</span>(status_code=<span class="nu">401</span>, detail=<span class="st">"認証に失敗しました"</span>)

<span class="kw">def</span> <span class="fn">require_role</span>(required_role: str):
    <span class="cm">"""ロールベースアクセス制御（RBAC）"""</span>
    <span class="kw">def</span> <span class="fn">role_checker</span>(token: TokenData = Depends(verify_jwt_token)):
        <span class="kw">if</span> required_role <span class="kw">not</span> <span class="kw">in</span> token.roles:
            <span class="kw">raise</span> <span class="fn">HTTPException</span>(
                status_code=<span class="nu">403</span>,
                detail=f"権限不足: \${required_role} が必要"
            )
        <span class="kw text-info">return</span> token
    <span class="kw text-info">return</span> role_checker

app = <span class="fn">FastAPI</span>()

@app.post(<span class="st">"/orders"</span>, status_code=<span class="nu">201</span>)
<span class="kw">async</span> <span class="kw">def</span> <span class="fn">create_order</span>(
    order_data: dict,
    current_user: TokenData = Depends(verify_jwt_token)
):
    <span class="cm">"""注文作成（認証が必要）"""</span>
    <span class="kw">return</span> {<span class="st">"order_id"</span>: <span class="st">"order_123"</span>, <span class="st">"customer_id"</span>: current_user.sub}

@app.delete(<span class="st">"/orders/{order_id}"</span>)
<span class="kw">async</span> <span class="kw">def</span> <span class="fn">delete_order</span>(
    order_id: str,
    admin: TokenData = Depends(require_role(<span class="st">"admin"</span>))
):
    <span class="cm">"""注文削除（admin ロールが必要）"""</span>
    <span class="kw">return</span> {<span class="st">"deleted"</span>: order_id}`,

  code7: `<span class="kw">name</span>: <span class="st">Order Service CI/CD</span>

<span class="kw">on</span>:
  <span class="kw">push</span>:
    <span class="kw">branches</span>: [<span class="st">main</span>]
    <span class="kw">paths</span>: [<span class="st">'services/order-service/**'</span>]
  <span class="kw">pull_request</span>:
    <span class="kw">paths</span>: [<span class="st">'services/order-service/**'</span>]

<span class="kw">env</span>:
  <span class="kw">REGISTRY</span>: <span class="st">ghcr.io</span>
  <span class="kw">IMAGE_NAME</span>: <span class="st">\${{ github.repository }}/order-service</span>

<span class="kw">jobs</span>:
  <span class="kw">test</span>:
    <span class="kw">runs-on</span>: <span class="st">ubuntu-latest</span>
    <span class="kw">steps</span>:
      - <span class="kw">uses</span>: <span class="st">actions/checkout@v4</span>
      - <span class="kw">name</span>: <span class="st">Set up Python 3.11</span>
        <span class="kw">uses</span>: <span class="st">actions/setup-python@v4</span>
        <span class="kw">with</span>:
          <span class="kw">python-version</span>: <span class="st">"3.11"</span>
      - <span class="kw">name</span>: <span class="st">Install dependencies</span>
        <span class="kw">run</span>: <span class="st">pip install -r services/order-service/requirements.txt</span>
      - <span class="kw">name</span>: <span class="st">Lint</span>
        <span class="kw">run</span>: <span class="st">ruff check services/order-service/</span>
      - <span class="kw">name</span>: <span class="st">Unit Tests</span>
        <span class="kw">run</span>: <span class="st">pytest services/order-service/tests/unit/ -v --cov</span>
      - <span class="kw">name</span>: <span class="st">Integration Tests</span>
        <span class="kw">run</span>: <span class="st">pytest services/order-service/tests/integration/ -v</span>
      - <span class="kw">name</span>: <span class="st">Contract Tests (Pact)</span>  <span class="cm"># API互換性の自動検証</span>
        <span class="kw">run</span>: <span class="st">pytest services/order-service/tests/contract/ -v</span>

  <span class="kw">build-and-push</span>:
    <span class="kw">needs</span>: <span class="st">test</span>
    <span class="kw">if</span>: <span class="st">github.ref == 'refs/heads/main'</span>
    <span class="kw">runs-on</span>: <span class="st">ubuntu-latest</span>
    <span class="kw">steps</span>:
      - <span class="kw">uses</span>: <span class="st">actions/checkout@v4</span>
      - <span class="kw">name</span>: <span class="st">Build and push Docker image</span>
        <span class="kw">uses</span>: <span class="st">docker/build-push-action@v5</span>
        <span class="kw">with</span>:
          <span class="kw">context</span>: <span class="st">services/order-service</span>
          <span class="kw">push</span>: <span class="st">true</span>
          <span class="kw">tags</span>: <span class="st">\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:sha-\${{ github.sha }}</span>
      <span class="cm"># 重大な脆弱性があればパイプラインを停止する</span>
      - <span class="kw">name</span>: <span class="st">Security scan (Trivy)</span>
        <span class="kw">uses</span>: <span class="st">aquasecurity/trivy-action@master</span>
        <span class="kw">with</span>:
          <span class="kw">image-ref</span>: <span class="st">\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:sha-\${{ github.sha }}</span>
          <span class="kw">severity</span>: <span class="st">HIGH,CRITICAL</span>
          <span class="kw">exit-code</span>: <span class="nu">1</span>

  <span class="kw">deploy-staging</span>:
    <span class="kw">needs</span>: <span class="st">build-and-push</span>
    <span class="kw">environment</span>: <span class="st">staging</span>
    <span class="kw">runs-on</span>: <span class="st">ubuntu-latest</span>
    <span class="kw">steps</span>:
      - <span class="kw">name</span>: <span class="st">Deploy to Staging</span>
        <span class="kw">run</span>: |
          <span class="st">kubectl set image deployment/order-service \\\\</span>
            <span class="st">order-service=\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:sha-\${{ github.sha }} \\\\</span>
            <span class="st">-n staging</span>
      - <span class="kw">name</span>: <span class="st">Wait for rollout</span>
        <span class="kw">run</span>: <span class="st">kubectl rollout status deployment/order-service -n staging --timeout=5m</span>
      - <span class="kw">name</span>: <span class="st">Run E2E Tests</span>
        <span class="kw">run</span>: <span class="st">pytest tests/e2e/ --base-url=https://api-staging.example.com</span>

  <span class="kw">deploy-production</span>:
    <span class="kw">needs</span>: <span class="st">deploy-staging</span>
    <span class="kw">environment</span>: <span class="st">production</span>
    <span class="kw">runs-on</span>: <span class="st">ubuntu-latest</span>
    <span class="kw">steps</span>:
      - <span class="kw">name</span>: <span class="st">Canary Deploy (10% traffic)</span>
        <span class="kw">run</span>: |
          <span class="st">kubectl set image deployment/order-service-canary \\\\</span>
            <span class="st">order-service=\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:sha-\${{ github.sha }} \\\\</span>
            <span class="st">-n production</span>
      - <span class="kw">name</span>: <span class="st">Monitor canary (10 minutes)</span>
        <span class="kw">run</span>: <span class="st">sleep 600</span>  <span class="cm"># 実際はPrometheus APIでエラー率を監視</span>
      - <span class="kw">name</span>: <span class="st">Full Production Deploy</span>
        <span class="kw">run</span>: |
          <span class="st">kubectl set image deployment/order-service \\\\</span>
            <span class="st">order-service=\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:sha-\${{ github.sha }} \\\\</span>
            <span class="st">-n production</span>`,

  code8: `<span class="cm"># Stage 1: ビルド環境（依存関係インストール）</span>
<span class="kw">FROM</span> python:3.11-slim <span class="kw">AS</span> builder
<span class="kw">WORKDIR</span> /app
<span class="kw">COPY</span> requirements.txt .
<span class="cm"># --no-cache-dir でキャッシュを残さずイメージサイズを最小化</span>
<span class="kw">RUN</span> pip install --user --no-cache-dir -r requirements.txt

<span class="cm"># Stage 2: 実行環境（最小イメージ）</span>
<span class="kw">FROM</span> python:3.11-slim <span class="kw">AS</span> runtime

<span class="cm"># セキュリティ：非rootユーザーで実行（必須）</span>
<span class="kw">RUN</span> addgroup --system appgroup &amp;&amp; adduser --system --group appuser

<span class="kw">WORKDIR</span> /app

<span class="cm"># ビルド環境から依存関係のみコピー（ソースは含まない）</span>
<span class="kw">COPY</span> --from=builder /root/.local /home/appuser/.local

<span class="cm"># アプリコードをコピー（オーナーを非rootユーザーに設定）</span>
<span class="kw">COPY</span> --chown=appuser:appgroup . .

<span class="cm"># 非rootユーザーに切り替え</span>
<span class="kw">USER</span> appuser

<span class="cm"># ヘルスチェック設定</span>
<span class="kw">HEALTHCHECK</span> --interval=30s --timeout=10s --start-period=40s --retries=3 \\\\
    CMD python -c <span class="st">"import urllib.request; urllib.request.urlopen('http://localhost:8001/health')"</span> || exit <span class="nu">1</span>

<span class="kw">EXPOSE</span> <span class="nu">8001</span>

<span class="kw">ENV</span> PATH=/home/appuser/.local/bin:$PATH

<span class="cm"># グレースフルシャットダウンを考慮した起動コマンド</span>
<span class="kw">CMD</span> [<span class="st">"uvicorn"</span>, <span class="st">"main:app"</span>, <span class="st">"--host"</span>, <span class="st">"0.0.0.0"</span>, <span class="st">"--port"</span>, <span class="st">"8001"</span>, \\\\
     <span class="st">"--workers"</span>, <span class="st">"4"</span>, <span class="st">"--timeout-graceful-shutdown"</span>, <span class="st">"30"</span>]`,

  code9: `<span class="kw">from</span> opentelemetry <span class="kw">import</span> trace
<span class="kw">from</span> opentelemetry.sdk.trace <span class="kw">import</span> TracerProvider
<span class="kw">from</span> opentelemetry.sdk.trace.export <span class="kw">import</span> BatchSpanProcessor
<span class="kw">from</span> opentelemetry.exporter.otlp.proto.grpc.trace_exporter <span class="kw">import</span> OTLPSpanExporter
<span class="kw">from</span> opentelemetry.instrumentation.fastapi <span class="kw">import</span> FastAPIInstrumentor
<span class="kw">from</span> opentelemetry.instrumentation.httpx <span class="kw">import</span> HTTPXClientInstrumentor

<span class="kw">def</span> <span class="fn">setup_tracing</span>(service_name: str):
    <span class="cm">"""分散トレーシングの初期化"""</span>
    otlp_exporter = <span class="fn">OTLPSpanExporter</span>(
        endpoint=<span class="st">"http://otel-collector:4317"</span>,
        insecure=<span class="kw">True</span>,
    )
    provider = <span class="fn">TracerProvider</span>()
    provider.<span class="fn">add_span_processor</span>(<span class="fn">BatchSpanProcessor</span>(otlp_exporter))
    trace.<span class="fn">set_tracer_provider</span>(provider)

    <span class="cm"># FastAPIとHTTPXの自動計装（コードの修正不要）</span>
    <span class="fn">FastAPIInstrumentor</span>().<span class="fn">instrument</span>()
    <span class="fn">HTTPXClientInstrumentor</span>().<span class="fn">instrument</span>()

    <span class="kw">return</span> trace.<span class="fn">get_tracer</span>(service_name)

tracer = <span class="fn">setup_tracing</span>(<span class="st">"order-service"</span>)

<span class="kw">class</span> <span class="fn">OrderService</span>:
    <span class="kw">async</span> <span class="kw">def</span> <span class="fn">create_order</span>(<span class="kw">self</span>, customer_id: str, items: list) -&gt; dict:
        <span class="cm">"""注文作成（分散トレーシング付き）"""</span>
        <span class="kw">with</span> tracer.<span class="fn">start_as_current_span</span>(<span class="st">"create-order"</span>) <span class="kw">as</span> span:
            <span class="cm"># スパンに属性を追加（検索・フィルタリングに使用）</span>
            span.<span class="fn">set_attribute</span>(<span class="st">"customer.id"</span>, customer_id)
            span.<span class="fn">set_attribute</span>(<span class="st">"order.item_count"</span>, <span class="fn">len</span>(items))

            <span class="cm"># 子スパン：在庫チェック</span>
            <span class="kw">with</span> tracer.<span class="fn">start_as_current_span</span>(<span class="st">"check-inventory"</span>):
                inventory_result = <span class="kw">await</span> <span class="kw text-info">self</span>.<span class="fn">_check_inventory</span>(items)

            <span class="cm"># 子スパン：決済処理</span>
            <span class="kw">with</span> tracer.<span class="fn">start_as_current_span</span>(<span class="st">"process-payment"</span>):
                payment_result = <span class="kw">await</span> <span class="kw text-info">self</span>.<span class="fn">_process_payment</span>(customer_id, items)

            order = {<span class="st">"order_id"</span>: <span class="st">"order_123"</span>, <span class="st">"status"</span>: <span class="st">"confirmed"</span>}
            span.<span class="fn">set_attribute</span>(<span class="st">"order.id"</span>, order[<span class="st">"order_id"</span>])
            <span class="kw">return</span> order`,
};

export default function Page() {
  return (
    <div className="microservices-architecture-comprehensive-guide">
      <MicroservicesArchitectureSidebar groups={NAV_GROUPS} />
      <main className="main mw">
        <div className="mc">
          {/*  HERO  */}
          <div className="hero">
            <div className="hbadge">
              <span className="hdot"></span> Architecture Complete Guide — v2.0 · 2026
            </div>
            <h1>
              マイクロサービス
              <br />
              <span className="gt">アーキテクチャ</span>
              <br />
              完全ガイド
            </h1>
            <p className="hdesc">
              初学者からシニアエンジニアまで対応した包括的な解説。設計原則・実装パターン・運用ベストプラクティスを全網羅。DDD・Saga・CQRS・Circuit
              Breaker など現場で使われる全パターンを図解で解説します。
            </p>
            <div className="hstats">
              <div className="hst">
                <span className="hst-n">18</span>
                <span className="hst-l">セクション</span>
              </div>
              <div className="hst">
                <span className="hst-n">22+</span>
                <span className="hst-l">アーキテクチャ図</span>
              </div>
              <div className="hst">
                <span className="hst-n">8</span>
                <span className="hst-l">コード実装例</span>
              </div>
              <div className="hst">
                <span className="hst-n">40+</span>
                <span className="hst-l">参考ソース</span>
              </div>
            </div>
          </div>

          {/*  SECTION 1  */}
          <section id="s1">
            <div className="eye">
              <span className="snum">01</span>
              <span className="stag">Foundation</span>
            </div>
            <h2>マイクロサービスとは何か？</h2>
            <p>
              <strong>マイクロサービスアーキテクチャ</strong>とは、アプリケーションを
              <strong>小さく独立したサービス群</strong>
              に分割し、各サービスが独自のプロセスで動作し、軽量なAPIで互いに通信するアーキテクチャスタイルです。2014年に
              Martin Fowler と James Lewis が体系化しました。
            </p>

            <div className="co co-blue">
              <div className="ci">💡</div>
              <div className="cb">
                <h4>核心思想</h4>
                <p>
                  「1つの大きなシステムを、
                  <strong>独立してデプロイ・スケール・保守できる小さなサービスの集合体</strong>
                  として構築する」。各サービスはビジネス機能の単一境界を担い、チームが完全に所有します。
                </p>
              </div>
            </div>

            <h3>1.1 マイクロサービスの6つの特徴</h3>
            <div className="cg">
              <div className="card c-bl">
                <div className="cnum">01</div>
                <h4>独立デプロイ</h4>
                <p>他サービスに影響を与えずに単独でデプロイできる</p>
              </div>
              <div className="card c-gr">
                <div className="cnum">02</div>
                <h4>技術的多様性</h4>
                <p>サービスごとに最適な言語・DBを選択できる</p>
              </div>
              <div className="card c-vi">
                <div className="cnum">03</div>
                <h4>障害隔離</h4>
                <p>1つのサービス障害が全体に波及しない</p>
              </div>
              <div className="card c-am">
                <div className="cnum">04</div>
                <h4>スケール最適化</h4>
                <p>負荷の高いサービスだけを独立してスケールアウト</p>
              </div>
              <div className="card c-bl">
                <div className="cnum">05</div>
                <h4>チーム自律性</h4>
                <p>小さなチームが1サービスを完全所有・管理する</p>
              </div>
              <div className="card c-gr">
                <div className="cnum">06</div>
                <h4>ビジネス機能単位</h4>
                <p>DDDのBounded Contextと対応した自然な境界設計</p>
              </div>
            </div>

            <h3>1.2 マイクロサービスの特徴（全体図）</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm1} />
              <div className="diagram-caption">図1-1: マイクロサービスの主な特徴</div>
            </div>

            <h3>1.3 どんなシステムに向いているか</h3>
            <div className="sl">
              <div className="step">
                <div className="sn">✅</div>
                <div className="sb2">
                  <h4>向いているケース</h4>
                  <p>
                    複数チームが並行開発・デプロイが必要、サービスごとにスケール要件が異なる、組織規模が50人以上で明確なドメイン境界がある
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="sn">⚠️</div>
                <div className="sb2">
                  <h4>慎重に検討すべきケース</h4>
                  <p>
                    スタートアップのMVP段階、小規模チーム（10人以下）、まだドメイン境界が定まっていない初期プロダクト
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="sn">🔵</div>
                <div className="sb2">
                  <h4>モジュラーモノリスを検討</h4>
                  <p>
                    コードは分離しつつデプロイは一括にするモジュラーモノリスから始めると移行が容易
                  </p>
                </div>
              </div>
            </div>

            <div className="co co-green">
              <div className="ci">✅</div>
              <div className="cb">
                <h4>ベストプラクティス：「モノリスで始めてから移行する」</h4>
                <p>
                  Martin
                  Fowlerも推奨するとおり、最初からマイクロサービスで設計するのは避けましょう。ドメイン境界が不明確な状態での分割は「
                  <strong>ディストリビューテッドモノリス</strong>」を生み出すリスクがあります。まず
                  <strong>モジュラーモノリス</strong>
                  で始め、境界が明確になった段階で分離するのが現場のベストプラクティスです。
                </p>
              </div>
            </div>
          </section>

          {/*  SECTION 2  */}
          <section id="s2">
            <div className="eye">
              <span className="snum">02</span>
              <span className="stag">Comparison</span>
            </div>
            <h2>モノリス vs マイクロサービス</h2>
            <p>
              多くのシステムはモノリシックな構造から始まります。規模が拡大するにつれてその限界が現れます。それぞれの構造を正確に理解し、適切なアーキテクチャを選択することが重要です。
            </p>

            <h3>2.1 モノリスアーキテクチャの問題点</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm2} />
              <div className="diagram-caption">図2-1: モノリスアーキテクチャの構造と主な問題点</div>
            </div>

            <h3>2.2 マイクロサービスアーキテクチャの構造</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm3} />
              <div className="diagram-caption">図2-2: マイクロサービスアーキテクチャの全体像</div>
            </div>

            <h3>2.3 詳細比較</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>観点</th>
                    <th>モノリス</th>
                    <th>マイクロサービス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>デプロイ</strong>
                    </td>
                    <td>全体を一括デプロイ（高リスク）</td>
                    <td>サービス単位で独立デプロイ（低リスク）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>スケール</strong>
                    </td>
                    <td>全体を一括スケール（非効率）</td>
                    <td>必要なサービスのみスケール（効率的）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>障害影響</strong>
                    </td>
                    <td>1つの障害が全体に波及する</td>
                    <td>障害がサービス内に局所化される</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>技術選択</strong>
                    </td>
                    <td>統一された技術スタックのみ</td>
                    <td>サービスごとに最適な技術を選択可能</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>開発速度</strong>
                    </td>
                    <td>初期は速い、後から遅くなる</td>
                    <td>初期は遅い（基盤整備が必要）、後から速い</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>運用複雑度</strong>
                    </td>
                    <td>シンプル</td>
                    <td>複雑（分散システムの課題が存在）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>データ整合性</strong>
                    </td>
                    <td>ACIDトランザクション</td>
                    <td>結果整合性（Eventually Consistent）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>チーム規模</strong>
                    </td>
                    <td>小〜中規模（〜20人）向き</td>
                    <td>中〜大規模（50人以上）向き</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>テスト</strong>
                    </td>
                    <td>統合テストが容易</td>
                    <td>分散テスト・Contract Testが必要</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>初期コスト</strong>
                    </td>
                    <td>低い</td>
                    <td>高い（インフラ整備が必要）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="co co-amber">
              <div className="ci">⚠️</div>
              <div className="cb">
                <h4>選択の判断基準</h4>
                <p>
                  マイクロサービスを選ぶべき
                  <strong>
                    明確なビジネス理由がない場合は、まずモジュラーモノリスで始めてください
                  </strong>
                  。「マイクロサービスは銀の弾丸ではない」— Sam Newman（"Building Microservices"
                  著者）。移行コストは非常に高く、チームの成熟度・組織の準備状況が揃ってからの導入が推奨されます。
                </p>
              </div>
            </div>
          </section>

          {/*  SECTION 3  */}
          <section id="s3">
            <div className="eye">
              <span className="snum">03</span>
              <span className="stag">Design Principles</span>
            </div>
            <h2>マイクロサービスの設計原則</h2>
            <p>
              優れたマイクロサービスは、明確な設計原則に基づいています。以下の8つの原則を守ることで、長期的に保守・運用しやすいシステムが実現できます。
            </p>

            <h3>3.1 8つのコア設計原則</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm4} />
              <div className="diagram-caption">図3-1: マイクロサービス設計の8原則</div>
            </div>

            <div className="cg">
              <div className="card c-bl">
                <div className="cnum">1</div>
                <h4>単一責任 (SRP)</h4>
                <p>1サービス = 1ビジネス機能。「変更理由が1つだけ」に絞る</p>
              </div>
              <div className="card c-gr">
                <div className="cnum">2</div>
                <h4>独立デプロイ</h4>
                <p>他サービスに影響なく単独でデプロイできる状態を常に保つ</p>
              </div>
              <div className="card c-vi">
                <div className="cnum">3</div>
                <h4>データの所有</h4>
                <p>各サービスが専用DBを持ち、他サービスのDBに直接アクセスしない</p>
              </div>
              <div className="card c-am">
                <div className="cnum">4</div>
                <h4>疎結合</h4>
                <p>サービス間の依存を最小化。変更が伝播しない構造にする</p>
              </div>
              <div className="card c-bl">
                <div className="cnum">5</div>
                <h4>高凝集</h4>
                <p>関連機能をサービス内にまとめ、意味のある単位にする</p>
              </div>
              <div className="card c-gr">
                <div className="cnum">6</div>
                <h4>障害隔離</h4>
                <p>Bulkhead/Circuit Breakerで1つの障害が全体に波及しない</p>
              </div>
              <div className="card c-vi">
                <div className="cnum">7</div>
                <h4>分散ガバナンス</h4>
                <p>各チームが独自に技術を選択できる。中央集権的な制約を最小化</p>
              </div>
              <div className="card c-am">
                <div className="cnum">8</div>
                <h4>自動化前提の設計</h4>
                <p>CI/CD・自動テスト・自動スケールが前提。手動運用を最小化</p>
              </div>
            </div>

            <h3>3.2 Twelve-Factor Appとの対応</h3>
            <p>
              <strong>Twelve-Factor App</strong>
              はHerokuのエンジニアが2011年に提唱した、クラウドネイティブアプリ設計の12原則です。マイクロサービスの設計基盤として広く採用されています。
            </p>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>原則</th>
                    <th>マイクロサービスへの適用</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="bdg bd-bl">1</span>
                    </td>
                    <td>
                      <strong>コードベース</strong>
                    </td>
                    <td>1リポジトリ = 1サービス（モノレポも可）</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bdg bd-bl">3</span>
                    </td>
                    <td>
                      <strong>設定</strong>
                    </td>
                    <td>環境変数で管理（ハードコード禁止）</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bdg bd-gr">6</span>
                    </td>
                    <td>
                      <strong>プロセス</strong>
                    </td>
                    <td>ステートレスに設計（状態はDBに外部化）</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bdg bd-vi">9</span>
                    </td>
                    <td>
                      <strong>廃棄容易性</strong>
                    </td>
                    <td>高速起動・グレースフルシャットダウン必須</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bdg bd-am">11</span>
                    </td>
                    <td>
                      <strong>ログ</strong>
                    </td>
                    <td>標準出力へのストリーム出力（集中収集）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="co co-green">
              <div className="ci">📏</div>
              <div className="cb">
                <h4>適切なサービスサイズの判断基準</h4>
                <ul>
                  <li>
                    <strong>2週間ルール：</strong>最初から書き直せる規模（複雑すぎるなら分割）
                  </li>
                  <li>
                    <strong>チームサイズ：</strong>1チーム（5〜8人）が所有・保守できる規模
                  </li>
                  <li>
                    <strong>デプロイ独立性：</strong>
                    単独でデプロイ可能か（他サービスの同時デプロイが必要ならNG）
                  </li>
                  <li>
                    <strong>ビジネス単一機能：</strong>1つのビジネス機能に絞れているか
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/*  SECTION 4  */}
          <section id="s4">
            <div className="eye">
              <span className="snum">04</span>
              <span className="stag">Service Decomposition</span>
            </div>
            <h2>サービス分割の戦略</h2>
            <p>
              マイクロサービス設計で最も重要かつ難しい決断が「サービスの分割方法」です。
              <strong>DDD（ドメイン駆動設計）</strong>のBounded
              Contextが最も実践的なアプローチとして広く採用されています。
            </p>

            <h3>4.1 DDDによるサービス分割（ECサイト例）</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm5} />
              <div className="diagram-caption">図4-1: Bounded Contextに基づくサービス分割</div>
            </div>

            <h3>4.2 Strangler Figパターン（段階的移行）</h3>
            <p>
              既存のモノリスからマイクロサービスへ移行する際の標準的アプローチです。絞め殺しの木（Strangler
              Fig）が宿主の木を徐々に包み込むように、モノリスを少しずつ置き換えます。
            </p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm6} />
              <div className="diagram-caption">図4-2: Strangler Figパターンによる段階的移行</div>
            </div>

            <h3>4.3 良い分割 vs 悪い分割</h3>
            <div className="cmp">
              <div className="cmp-col good">
                <h4>✅ 良い分割の基準</h4>
                <ul>
                  <li>ビジネス機能の境界（Bounded Context）に沿っている</li>
                  <li>データの所有権が明確（他サービスのDBに直接アクセスしない）</li>
                  <li>独立してデプロイできる（他サービスへの影響なし）</li>
                  <li>1チームが所有できる規模（Conway's Lawに従う）</li>
                  <li>変更理由が単一（Single Responsibility）</li>
                </ul>
              </div>
              <div className="cmp-col bad">
                <h4>❌ 悪い分割の例</h4>
                <ul>
                  <li>技術レイヤーで分割（フロント/バックエンドサービス）</li>
                  <li>CRUD操作で分割（読み取りサービス/書き込みサービス）</li>
                  <li>細かすぎる分割（1エンドポイント = 1サービス）</li>
                  <li>循環依存が生まれる分割（A→B→C→A）</li>
                  <li>ドメイン知識なしに機能名で分割する</li>
                </ul>
              </div>
            </div>

            <div className="co co-violet">
              <div className="ci">🔑</div>
              <div className="cb">
                <h4>ベストプラクティス：Conway's Law を活用する</h4>
                <p>
                  「システムのアーキテクチャは、それを設計した組織のコミュニケーション構造を反映する」（Conway's
                  Law）。つまり、
                  <strong>チーム構造に沿ってサービスを分割すると自然な境界が生まれます</strong>
                  。逆に組織を先に再設計してからマイクロサービスを設計する（
                  <strong>逆Conway戦略</strong>）も有効です。
                </p>
              </div>
            </div>
          </section>

          {/*  SECTION 5  */}
          <section id="s5">
            <div className="eye">
              <span className="snum">05</span>
              <span className="stag">Communication</span>
            </div>
            <h2>サービス間通信パターン</h2>
            <p>
              サービス間の通信方式は、システムの<strong>パフォーマンス・信頼性・疎結合度</strong>
              に直接影響します。同期通信と非同期通信を適切に組み合わせることが重要です。
            </p>

            <h3>5.1 通信方式の選択フロー</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm7} />
              <div className="diagram-caption">図5-1: 通信パターン選択フローチャート</div>
            </div>

            <h3>5.2 同期通信（REST API）の実装例</h3>
            <div className="cd">
              <div className="cd-hd">
                <span className="cd-title">order-service / inventory_client.py</span>
                <span className="cd-lang">Python</span>
              </div>
              <pre
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                dangerouslySetInnerHTML={{
                  __html: CODE_BLOCKS.code1,
                }}
              />
            </div>

            <h3>5.3 非同期通信（Apache Kafka）の実装例</h3>
            <div className="cd">
              <div className="cd-hd">
                <span className="cd-title">events.py（Producer + Consumer）</span>
                <span className="cd-lang">Python</span>
              </div>
              <pre
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                dangerouslySetInnerHTML={{
                  __html: CODE_BLOCKS.code2,
                }}
              />
            </div>

            <div className="co co-green">
              <div className="ci">✅</div>
              <div className="cb">
                <h4>ベストプラクティス：通信方式の使い分け</h4>
                <ul>
                  <li>
                    <strong>即時応答が必要：</strong>REST API（シンプル）または gRPC（高速・型安全）
                  </li>
                  <li>
                    <strong>複数サービスへの通知：</strong>Kafkaなどのイベントバス（Pub/Sub）
                  </li>
                  <li>
                    <strong>1対1の非同期処理：</strong>RabbitMQ / AWS SQS（メッセージキュー）
                  </li>
                  <li>
                    <strong>冪等性の確保：</strong>すべての通信に <code>Idempotency-Key</code>{" "}
                    を付与する
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/*  SECTION 6  */}
          <section id="s6">
            <div className="eye">
              <span className="snum">06</span>
              <span className="stag">API Gateway</span>
            </div>
            <h2>APIゲートウェイパターン</h2>
            <p>
              APIゲートウェイは、マイクロサービス群への<strong>単一エントリーポイント</strong>
              です。認証・レート制限・ロギング・SSL終端などの横断的関心事をここで一元管理します。
            </p>

            <h3>6.1 APIゲートウェイの役割と機能</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm8} />
              <div className="diagram-caption">
                図6-1: APIゲートウェイのアーキテクチャと機能一覧
              </div>
            </div>

            <h3>6.2 BFF（Backend for Frontend）パターン</h3>
            <p>
              クライアントの種類（Web/Mobile/Partner）ごとに専用のバックエンドを用意するパターンです。各クライアントの要件に最適化されたデータ形式・API設計を実現できます。
            </p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm9} />
              <div className="diagram-caption">図6-2: BFF（Backend for Frontend）パターン</div>
            </div>

            <h3>6.3 Kong API Gateway 設定例</h3>
            <div className="cd">
              <div className="cd-hd">
                <span className="cd-title">kong.yml — declarative config</span>
                <span className="cd-lang">YAML</span>
              </div>
              <pre
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                dangerouslySetInnerHTML={{
                  __html: CODE_BLOCKS.code3,
                }}
              />
            </div>

            <div className="co co-blue">
              <div className="ci">💡</div>
              <div className="cb">
                <h4>ベストプラクティス：APIゲートウェイの設計</h4>
                <ul>
                  <li>
                    <strong>ビジネスロジックをGWに置かない：</strong>
                    ルーティング・認証・レート制限のみを担当させる
                  </li>
                  <li>
                    <strong>GWのSPOF（単一障害点）を避ける：</strong>複数インスタンスでの冗長化必須
                  </li>
                  <li>
                    <strong>バージョニング：</strong>
                    <code>/v1/orders</code> のようにURLにバージョンを含める
                  </li>
                  <li>
                    <strong>BFFは3種類以上になったら検討：</strong>Web・Mobile・Partner
                    APIで責任を分離
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/*  SECTION 7  */}
          <section id="s7">
            <div className="eye">
              <span className="snum">07</span>
              <span className="stag">Service Discovery</span>
            </div>
            <h2>サービスディスカバリと負荷分散</h2>
            <p>
              マイクロサービスは動的にスケールするため、サービスのIPアドレスが常に変わります。
              <strong>サービスディスカバリ</strong>は、サービスが互いに見つけ合うための仕組みです。
            </p>

            <h3>7.1 クライアントサイド vs サーバーサイドディスカバリ</h3>
            <div className="cmp">
              <div className="cmp-col">
                <h4 style={{ color: "var(--blue)" }}>🔵 クライアントサイドディスカバリ</h4>
                <ul>
                  <li>クライアントがレジストリに問い合わせ</li>
                  <li>ロードバランシングをクライアントが実行</li>
                  <li>ツール：Consul, Eureka</li>
                  <li>
                    <strong>メリット：</strong>柔軟なLBアルゴリズム
                  </li>
                  <li>
                    <strong>デメリット：</strong>各クライアントに実装が必要
                  </li>
                </ul>
              </div>
              <div className="cmp-col">
                <h4 style={{ color: "var(--green)" }}>🟢 サーバーサイドディスカバリ</h4>
                <ul>
                  <li>ロードバランサーがレジストリに問い合わせ</li>
                  <li>クライアントはサービス名で呼び出すだけ</li>
                  <li>ツール：Kubernetes Service, AWS ALB</li>
                  <li>
                    <strong>メリット：</strong>クライアント実装が不要
                  </li>
                  <li>
                    <strong>デメリット：</strong>LBのSPOFリスク
                  </li>
                </ul>
              </div>
            </div>

            <h3>7.2 Kubernetes Deployment・Service・HPA 設定</h3>
            <div className="cd">
              <div className="cd-hd">
                <span className="cd-title">order-service/k8s/deployment.yaml</span>
                <span className="cd-lang">YAML</span>
              </div>
              <pre
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                dangerouslySetInnerHTML={{
                  __html: CODE_BLOCKS.code4,
                }}
              />
            </div>

            <div className="co co-green">
              <div className="ci">✅</div>
              <div className="cb">
                <h4>ベストプラクティス：K8sでのサービスディスカバリ</h4>
                <ul>
                  <li>
                    <strong>Liveness と Readiness の両方を実装：</strong>Liveness
                    は「再起動すべきか」、Readiness
                    は「トラフィックを受ける準備ができているか」を判断する
                  </li>
                  <li>
                    <strong>Resource Requests/Limits を必ず設定：</strong>
                    未設定のPodはクラスター全体のリソースを圧迫する
                  </li>
                  <li>
                    <strong>HPA の minReplicas は 2 以上：</strong>
                    単一Podは再起動時にダウンタイムが発生する
                  </li>
                  <li>
                    <strong>PodDisruptionBudget を設定：</strong>
                    ノードメンテナンス時に最低Pod数を保証
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/*  SECTION 8  */}
          <section id="s8">
            <div className="eye">
              <span className="snum">08</span>
              <span className="stag">Data Management</span>
            </div>
            <h2>データ管理戦略</h2>
            <p>
              マイクロサービスにおけるデータ管理は最も複雑な問題の一つです。各サービスが独自のデータを所有することで独立性を保ちつつ、
              <strong>サービス間のデータ整合性をどう保つかが核心的な課題</strong>です。
            </p>

            <h3>8.1 Database per Service パターン</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm10} />
              <div className="diagram-caption">
                図8-1: 共有DBアンチパターン（左）vs DB per Serviceパターン（右）
              </div>
            </div>

            <h3>8.2 Sagaパターン（分散トランザクション）</h3>
            <p>
              複数サービスをまたぐトランザクション（注文→在庫→決済→配送）では、ACIDトランザクションは使えません。代わりに
              <strong>Sagaパターン</strong>
              を使い、各ステップで補償トランザクション（ロールバック操作）を定義します。
            </p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm11} />
              <div className="diagram-caption">
                図8-2: Sagaパターン（Choreography）— 正常フローと補償トランザクション
              </div>
            </div>

            <h3>8.3 CQRSパターン（読み書き分離）</h3>
            <p>
              <strong>CQRS（Command Query Responsibility Segregation）</strong>
              は、書き込み（Command）と読み取り（Query）のモデルを完全に分離するパターンです。読み取り性能とスケーラビリティを大幅に向上できます。
            </p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm12} />
              <div className="diagram-caption">図8-3: CQRSパターン — 書き込みと読み取りの分離</div>
            </div>

            <div className="co co-amber">
              <div className="ci">⚠️</div>
              <div className="cb">
                <h4>Outboxパターン（重要）：確実なイベント発行</h4>
                <p>
                  DBへの書き込みとKafkaへのイベント発行を<strong>アトミックに</strong>
                  行うための必須パターンです。DBにまず「Outboxテーブル」へ書き込み、ポーリングワーカーがKafkaに転送します。これにより「DBには書き込まれたがKafkaへの発行が失敗した」というデータ不整合を防ぎます。
                </p>
              </div>
            </div>

            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>戦略</th>
                    <th>使用場面</th>
                    <th>トレードオフ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ACID（単一DB）</strong>
                    </td>
                    <td>単一サービス内の操作</td>
                    <td>強整合性だが分散不可</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Sagaパターン</strong>
                    </td>
                    <td>注文→決済→配送など複数サービスにまたがる操作</td>
                    <td>結果整合性・補償トランザクションが必要</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>結果整合性</strong>
                    </td>
                    <td>キャッシュ更新・検索インデックス更新</td>
                    <td>短時間の不整合を許容できる場合に使用</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Outboxパターン</strong>
                    </td>
                    <td>確実なイベント発行が必要な場合</td>
                    <td>実装の複雑さは増すが信頼性が高い</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/*  SECTION 9  */}
          <section id="s9">
            <div className="eye">
              <span className="snum">09</span>
              <span className="stag">Resilience</span>
            </div>
            <h2>障害耐性と回復力の設計</h2>
            <p>
              分散システムでは障害は「起きるかどうか」ではなく<strong>「いつ起きるか」</strong>
              の問題です。障害が起きても全体が停止しないための「
              <strong>レジリエンス（回復力）設計</strong>」が不可欠です。
            </p>

            <h3>9.1 サーキットブレーカーの状態遷移</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm13} />
              <div className="diagram-caption">
                図9-1: サーキットブレーカーの状態遷移（CLOSED → OPEN → HALF_OPEN）
              </div>
            </div>

            <h3>9.2 サーキットブレーカー実装例（Python）</h3>
            <div className="cd">
              <div className="cd-hd">
                <span className="cd-title">shared/circuit_breaker.py</span>
                <span className="cd-lang">Python</span>
              </div>
              <pre
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                dangerouslySetInnerHTML={{
                  __html: CODE_BLOCKS.code5,
                }}
              />
            </div>

            <h3>9.3 グレースフルデグラデーション（縮退運転）</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm13b} />
              <div className="diagram-caption">
                図9-2: グレースフルデグラデーション（縮退運転）フロー
              </div>
            </div>

            <div className="co co-green">
              <div className="ci">✅</div>
              <div className="cb">
                <h4>ベストプラクティス：障害耐性の必須セット</h4>
                <ul>
                  <li>
                    <strong>タイムアウト：</strong>
                    すべての外部呼び出しにタイムアウトを設定（デフォルトなしは禁止）
                  </li>
                  <li>
                    <strong>リトライ：</strong>指数バックオフ +
                    ジッター追加で同時リトライを分散させる
                  </li>
                  <li>
                    <strong>サーキットブレーカー：</strong>障害サービスへの過剰リクエストを防ぐ
                  </li>
                  <li>
                    <strong>バルクヘッド：</strong>
                    スレッドプール分離で1サービスの遅延が全体に波及しないようにする
                  </li>
                  <li>
                    <strong>フォールバック：</strong>
                    キャッシュデータまたはデフォルト値で縮退運転を継続する
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/*  SECTION 10  */}
          <section id="s10">
            <div className="eye">
              <span className="snum">10</span>
              <span className="stag">Security</span>
            </div>
            <h2>セキュリティ設計</h2>
            <p>
              マイクロサービスでは、外部境界だけでなく<strong>サービス間通信のセキュリティ</strong>
              も重要です。ゼロトラスト原則に基づき、すべての通信を検証します。
            </p>

            <h3>10.1 セキュリティレイヤー全体図</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm14} />
              <div className="diagram-caption">
                図10-1: マイクロサービスのセキュリティレイヤー（外部から内部へ）
              </div>
            </div>

            <h3>10.2 JWT認証の実装例（FastAPI）</h3>
            <div className="cd">
              <div className="cd-hd">
                <span className="cd-title">order-service / auth.py</span>
                <span className="cd-lang">Python</span>
              </div>
              <pre
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                dangerouslySetInnerHTML={{
                  __html: CODE_BLOCKS.code6,
                }}
              />
            </div>

            <div className="co co-red">
              <div className="ci">🔒</div>
              <div className="cb">
                <h4>セキュリティ必須チェックリスト</h4>
                <ul>
                  <li>
                    <strong>mTLS：</strong>サービス間通信はすべて相互TLS認証（Istio/Linkerd
                    で自動化）
                  </li>
                  <li>
                    <strong>シークレット管理：</strong>
                    環境変数や設定ファイルに認証情報をハードコードしない（HashiCorp Vault / AWS
                    Secrets Manager）
                  </li>
                  <li>
                    <strong>最小権限の原則：</strong>各サービスが必要最小限の権限のみ持つ
                  </li>
                  <li>
                    <strong>脆弱性スキャン：</strong>CI/CDパイプラインで Trivy
                    などによるコンテナスキャンを自動実行
                  </li>
                  <li>
                    <strong>監査ログ：</strong>すべての認証イベントをログに記録して保存する
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/*  SECTION 11  */}
          <section id="s11">
            <div className="eye">
              <span className="snum">11</span>
              <span className="stag">CI/CD</span>
            </div>
            <h2>CI/CDパイプラインと独立デプロイ</h2>
            <p>
              マイクロサービスの価値を最大限に発揮するには、
              <strong>完全自動化されたCI/CDパイプライン</strong>
              が必須です。各サービスが独立したパイプラインを持ち、他サービスに影響なく安全にデプロイできる状態を実現します。
            </p>

            <h3>11.1 CI/CDフロー全体</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm15} />
              <div className="diagram-caption">図11-1: マイクロサービスのCI/CDパイプライン</div>
            </div>

            <h3>11.2 GitHub Actions パイプライン設定例</h3>
            <div className="cd">
              <div className="cd-hd">
                <span className="cd-title">.github/workflows/order-service.yml</span>
                <span className="cd-lang">YAML</span>
              </div>
              <pre
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                dangerouslySetInnerHTML={{
                  __html: CODE_BLOCKS.code7,
                }}
              />
            </div>

            <div className="co co-green">
              <div className="ci">✅</div>
              <div className="cb">
                <h4>ベストプラクティス：デプロイ戦略</h4>
                <ul>
                  <li>
                    <strong>カナリアデプロイ：</strong>
                    新バージョンに最初は10%のトラフィックのみ流し、エラー率・レイテンシを監視してから100%切り替え
                  </li>
                  <li>
                    <strong>自動ロールバック：</strong>
                    エラー率が閾値を超えたら自動で前バージョンに戻す
                  </li>
                  <li>
                    <strong>Contract Test（Pact）：</strong>
                    APIの互換性をCI段階で自動検証し、デプロイ後の連携不整合を防ぐ
                  </li>
                  <li>
                    <strong>フィーチャーフラグ：</strong>
                    デプロイとリリースを分離し、機能のON/OFFをコードではなく設定で制御
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/*  SECTION 12  */}
          <section id="s12">
            <div className="eye">
              <span className="snum">12</span>
              <span className="stag">Containers & K8s</span>
            </div>
            <h2>コンテナ化とKubernetes</h2>
            <p>
              マイクロサービスとコンテナ技術（Docker）、そしてオーケストレーションを担う
              <strong>Kubernetes（K8s）</strong>
              は、現代の標準スタックです。コンテナ化によって環境の差異をなくし、K8sで自動スケール・自己修復・デプロイを実現します。
            </p>

            <h3>12.1 Dockerfile ベストプラクティス（マルチステージビルド）</h3>
            <div className="cd">
              <div className="cd-hd">
                <span className="cd-title">services/order-service/Dockerfile</span>
                <span className="cd-lang">Dockerfile</span>
              </div>
              <pre
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                dangerouslySetInnerHTML={{
                  __html: CODE_BLOCKS.code8,
                }}
              />
            </div>

            <div className="co co-blue">
              <div className="ci">💡</div>
              <div className="cb">
                <h4>ベストプラクティス：Docker &amp; Kubernetes</h4>
                <ul>
                  <li>
                    <strong>マルチステージビルド：</strong>
                    最終イメージにビルドツールを含めない（サイズ削減・セキュリティ向上）
                  </li>
                  <li>
                    <strong>非rootユーザー実行：</strong>
                    コンテナの実行ユーザーは必ずnon-root（root実行はセキュリティリスク）
                  </li>
                  <li>
                    <strong>イメージタグは immutable に：</strong>
                    <code>:latest</code> タグは使わない。SHAを使う
                  </li>
                  <li>
                    <strong>Namespace で環境分離：</strong>staging/production
                    を別Namespaceで管理する
                  </li>
                  <li>
                    <strong>リソース制限は必ず設定：</strong>Requests/Limits
                    未設定のPodはクラスターを圧迫する
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/*  SECTION 13  */}
          <section id="s13">
            <div className="eye">
              <span className="snum">13</span>
              <span className="stag">Observability</span>
            </div>
            <h2>監視・オブザーバビリティ</h2>
            <p>
              分散システムでは「システムが壊れているかどうか」だけでなく
              <strong>「なぜ壊れているか」を素早く把握</strong>
              することが重要です。オブザーバビリティ（可観測性）は、メトリクス・ログ・トレースの3本柱で構成されます。
            </p>

            <h3>13.1 オブザーバビリティの3本柱</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm16} />
              <div className="diagram-caption">
                図13-1: オブザーバビリティの3本柱（メトリクス・ログ・トレース）
              </div>
            </div>

            <h3>13.2 SLI/SLO/SLAの定義</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>指標</th>
                    <th>意味</th>
                    <th>例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>SLI</strong>
                      <br />
                      <small>Service Level Indicator</small>
                    </td>
                    <td>実際に計測する数値指標</td>
                    <td>過去5分のエラー率 = 0.08%</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>SLO</strong>
                      <br />
                      <small>Service Level Objective</small>
                    </td>
                    <td>達成目標値（内部目標）</td>
                    <td>エラー率 &lt; 0.1% を99.9%の時間で維持</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>SLA</strong>
                      <br />
                      <small>Service Level Agreement</small>
                    </td>
                    <td>顧客との契約・公約</td>
                    <td>月次可用性 99.9%保証（未達でクレジット返還）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>13.3 4つのゴールデンシグナル（Google SRE）</h3>
            <div className="cg">
              <div className="card c-bl">
                <div className="cnum">⚡</div>
                <h4>レイテンシ</h4>
                <p>
                  リクエストの処理時間
                  <br />
                  目標：P99 &lt; 500ms
                </p>
              </div>
              <div className="card c-gr">
                <div className="cnum">📈</div>
                <h4>トラフィック</h4>
                <p>
                  リクエスト数/秒
                  <br />
                  現在の負荷状況の把握
                </p>
              </div>
              <div className="card c-rd">
                <div className="cnum">❌</div>
                <h4>エラー率</h4>
                <p>
                  失敗リクエストの割合
                  <br />
                  目標：5xx &lt; 0.1%
                </p>
              </div>
              <div className="card c-am">
                <div className="cnum">🔥</div>
                <h4>飽和度</h4>
                <p>
                  リソース使用率
                  <br />
                  目標：CPU &lt; 80%
                </p>
              </div>
            </div>

            <h3>13.4 分散トレーシング実装（OpenTelemetry）</h3>
            <div className="cd">
              <div className="cd-hd">
                <span className="cd-title">order-service / tracing.py</span>
                <span className="cd-lang">Python</span>
              </div>
              <pre
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block
                dangerouslySetInnerHTML={{
                  __html: CODE_BLOCKS.code9,
                }}
              />
            </div>

            <div className="co co-green">
              <div className="ci">✅</div>
              <div className="cb">
                <h4>ベストプラクティス：オブザーバビリティ</h4>
                <ul>
                  <li>
                    <strong>OpenTelemetry標準を採用：</strong>
                    ベンダーロックインを避けるためOTelを使用。Jaeger/Grafana Tempoへエクスポート
                  </li>
                  <li>
                    <strong>構造化ログ（JSON）：</strong>
                    <code>
                      {"{"}"level":"ERROR","service":"order-service","trace_id":"..."{"}"}
                    </code>{" "}
                    形式で出力
                  </li>
                  <li>
                    <strong>相関ID（Correlation ID）：</strong>
                    リクエストIDをすべてのログ・スパンに付与し、全サービスを横断して追跡
                  </li>
                  <li>
                    <strong>SLOベースのアラート：</strong>
                    エラーバジェット消費率でアラートを設定（単純な閾値ではなく）
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/*  SECTION 14  */}
          <section id="s14">
            <div className="eye">
              <span className="snum">14</span>
              <span className="stag">Practical Case Study</span>
            </div>
            <h2>実践：ECサイト完全事例</h2>
            <p>
              実際のECサイトを例に、マイクロサービスアーキテクチャの全体設計を見ていきます。規模感としてはAmazonやZOZOTOWNのような中〜大規模ECを想定しています。
            </p>

            <h3>14.1 システム全体アーキテクチャ</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm17} />
              <div className="diagram-caption">
                図14-1: ECサイトのマイクロサービス全体アーキテクチャ
              </div>
            </div>

            <h3>14.2 サービス一覧と技術スタック</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>サービス</th>
                    <th>責務</th>
                    <th>言語/FW</th>
                    <th>データストア</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>注文サービス</strong>
                    </td>
                    <td>注文の作成・管理・ステータス追跡</td>
                    <td>Python + FastAPI</td>
                    <td>PostgreSQL</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>在庫サービス</strong>
                    </td>
                    <td>在庫数管理・引き当て・補充</td>
                    <td>Go + Gin</td>
                    <td>MongoDB</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>決済サービス</strong>
                    </td>
                    <td>クレジットカード処理・決済履歴</td>
                    <td>Java + Spring Boot</td>
                    <td>PostgreSQL</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ユーザーサービス</strong>
                    </td>
                    <td>会員管理・認証・プロファイル</td>
                    <td>Node.js + Express</td>
                    <td>MySQL</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>商品カタログ</strong>
                    </td>
                    <td>商品情報・カテゴリ・価格管理</td>
                    <td>Node.js + Express</td>
                    <td>Elasticsearch</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>検索サービス</strong>
                    </td>
                    <td>全文検索・フィルタリング</td>
                    <td>Python + FastAPI</td>
                    <td>Elasticsearch</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>通知サービス</strong>
                    </td>
                    <td>メール・SMS・プッシュ通知</td>
                    <td>Python + Celery</td>
                    <td>Redis</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>配送サービス</strong>
                    </td>
                    <td>配送手配・追跡・配送業者連携</td>
                    <td>Go + Gin</td>
                    <td>PostgreSQL</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>レコメンドサービス</strong>
                    </td>
                    <td>ML推薦エンジン・関連商品</td>
                    <td>Python + ML</td>
                    <td>Redis + S3</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>14.3 注文処理の完全フロー（同期+非同期の組み合わせ）</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm18} />
              <div className="diagram-caption">図14-2: 注文処理の完全シーケンス</div>
            </div>
          </section>

          {/*  SECTION 15  */}
          <section id="s15">
            <div className="eye">
              <span className="snum">15</span>
              <span className="stag">Migration</span>
            </div>
            <h2>段階的移行戦略（モノリスからの移行）</h2>
            <p>
              既存のモノリシックシステムをマイクロサービスへ移行する際は、
              <strong>ビッグバン移行は避け、段階的に移行</strong>
              することが重要です。移行コストは非常に高く、段階的アプローチが現場の唯一の現実的選択肢です。
            </p>

            <h3>15.1 移行の4ステージ</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm19} />
              <div className="diagram-caption">
                図15-1: モノリスからマイクロサービスへの移行4ステージ
              </div>
            </div>

            <h3>15.2 データ分離の3フェーズ</h3>
            <div className="sl">
              <div className="step">
                <div className="sn">1</div>
                <div className="sb2">
                  <h4>フェーズ1：コード分離（DBは共有）</h4>
                  <p>
                    新しいサービスとしてコードを分離するが、まだ同じDBを参照する。リスクが最も低い最初のステップ。
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="sn">2</div>
                <div className="sb2">
                  <h4>フェーズ2：スキーマ分離（同DBサーバー内）</h4>
                  <p>
                    同じDBサーバーでも別スキーマに分離する。テーブル間の直接JOINができなくなり、API経由での通信に移行。
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="sn">3</div>
                <div className="sb2">
                  <h4>フェーズ3：DB完全分離</h4>
                  <p>
                    サービス専用の独立したDBサーバーを立ち上げ、完全に分離する。データ同期はイベントで行う。
                  </p>
                </div>
              </div>
            </div>

            <div className="co co-amber">
              <div className="ci">⚠️</div>
              <div className="cb">
                <h4>移行時の注意点</h4>
                <ul>
                  <li>
                    <strong>移行の優先順位：</strong>
                    「副作用が少ない機能」から始める（通知・メール送信など）。決済・注文は最後
                  </li>
                  <li>
                    <strong>Strangler Figパターン：</strong>
                    プロキシで段階的にルーティングを切り替え。モノリスを一気に廃止しない
                  </li>
                  <li>
                    <strong>CI/CD基盤を先に整備：</strong>
                    マイクロサービスの分割前にコンテナ化・自動デプロイを整備する
                  </li>
                  <li>
                    <strong>モニタリング先行：</strong>
                    分割前から監視基盤を整備し、分割前後でメトリクスを比較できるようにする
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/*  SECTION 16  */}
          <section id="s16">
            <div className="eye">
              <span className="snum">16</span>
              <span className="stag">Best Practices</span>
            </div>
            <h2>ベストプラクティス総まとめ</h2>

            <h3>16.1 マイクロサービス成熟度モデル</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm20} />
              <div className="diagram-caption">
                図16-1: マイクロサービス成熟度モデル（Level 0〜5）
              </div>
            </div>

            <h3>16.2 設計フェーズのベストプラクティス</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>ベストプラクティス</th>
                    <th>理由</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>分割単位</strong>
                    </td>
                    <td>DDDのBounded Contextに沿って分割</td>
                    <td>ビジネス境界が自然な境界になる</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>サイズ</strong>
                    </td>
                    <td>1チーム（5〜8人）が所有できる規模</td>
                    <td>Conway's Lawに従った自然な境界</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>DB</strong>
                    </td>
                    <td>サービスごとに独立したDBを持つ</td>
                    <td>独立デプロイとスケーラビリティの確保</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>通信</strong>
                    </td>
                    <td>デフォルトは非同期（Kafka/SQS）</td>
                    <td>疎結合と耐障害性の向上</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>API</strong>
                    </td>
                    <td>APIゲートウェイ経由でのみ外部公開</td>
                    <td>セキュリティと可視性の一元管理</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>設定</strong>
                    </td>
                    <td>環境変数で外部注入（12-Factor App）</td>
                    <td>環境間の差異を最小化</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>16.3 運用フェーズのベストプラクティス</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>ベストプラクティス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>デプロイ</strong>
                    </td>
                    <td>カナリアデプロイ + 自動ロールバック + フィーチャーフラグ</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>障害対策</strong>
                    </td>
                    <td>全依存にタイムアウト + サーキットブレーカー + DLQの設定</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>監視</strong>
                    </td>
                    <td>SLOベースのアラート + P99レイテンシ監視 + ビジネスメトリクス</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>セキュリティ</strong>
                    </td>
                    <td>定期的な脆弱性スキャン + シークレットローテーション + ゼロトラスト</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>コスト最適化</strong>
                    </td>
                    <td>未使用サービスの統合 + HPAによる適切なスケール設定</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/*  SECTION 17  */}
          <section id="s17">
            <div className="eye">
              <span className="snum">17</span>
              <span className="stag">Anti-Patterns</span>
            </div>
            <h2>アンチパターン</h2>
            <p>
              マイクロサービスへの移行や設計で陥りやすい落とし穴です。これらを事前に知ることで、多くのプロジェクトが失敗するパターンを回避できます。
            </p>

            <h3>17.1 5つの主要アンチパターン</h3>
            <div className="co co-red">
              <div className="ci">❌</div>
              <div className="cb">
                <h4>Anti-Pattern 1: Distributed Monolith（分散モノリス）</h4>
                <p>
                  <strong>症状：</strong>
                  見た目はマイクロサービスだが、サービス間が密結合。デプロイを常に一緒にしないと動かない。
                </p>
                <p>
                  <strong>原因：</strong>
                  共有ライブラリの濫用、共有DBへの直接アクセス、同期通信の多用。
                </p>
                <p>
                  <strong>解決：</strong>Contract Test
                  で独立性を保証。サービス間はAPIのみで通信。共有DBを排除する。
                </p>
              </div>
            </div>

            <div className="co co-red">
              <div className="ci">❌</div>
              <div className="cb">
                <h4>Anti-Pattern 2: Nano Services（ナノサービス問題）</h4>
                <p>
                  <strong>症状：</strong>
                  過度に細かく分割されたサービス。1つの機能に10のサービスが必要。運用コストが爆発的に増大。
                </p>
                <p>
                  <strong>原因：</strong>
                  「小さいほど良い」という誤解。機能ではなく操作単位での分割。
                </p>
                <p>
                  <strong>解決：</strong>
                  ビジネス機能単位で再統合。チームが所有できる規模を基準にする。
                </p>
              </div>
            </div>

            <div className="co co-red">
              <div className="ci">❌</div>
              <div className="cb">
                <h4>Anti-Pattern 3: Shared Database（共有DB）</h4>
                <p>
                  <strong>症状：</strong>
                  複数サービスが同じDBテーブルに直接アクセス。スキーマ変更のたびに全サービスに影響。
                </p>
                <p>
                  <strong>原因：</strong>
                  「DBを共有すれば一貫性が保てる」という考え。移行コスト回避のための妥協。
                </p>
                <p>
                  <strong>解決：</strong>DB per Service
                  パターン。サービス間データはAPIまたはイベントで同期する。
                </p>
              </div>
            </div>

            <div className="co co-red">
              <div className="ci">❌</div>
              <div className="cb">
                <h4>Anti-Pattern 4: Chatty Services（過剰な通信）</h4>
                <p>
                  <strong>症状：</strong>
                  1リクエストに対してサービス間で大量の同期通信が発生。レイテンシ増大。カスケード障害のリスク。
                </p>
                <p>
                  <strong>原因：</strong>サービスの責務が細かすぎる。BFF/集約レイヤーの欠如。
                </p>
                <p>
                  <strong>解決：</strong>
                  BFFパターンでデータを集約。非同期通信への移行。Redisによるキャッシュ活用。
                </p>
              </div>
            </div>

            <div className="co co-red">
              <div className="ci">❌</div>
              <div className="cb">
                <h4>Anti-Pattern 5: No Observability（監視の欠如）</h4>
                <p>
                  <strong>症状：</strong>
                  ログ・メトリクス・トレーシングが未整備。障害時に原因特定に数時間〜数日かかる。
                </p>
                <p>
                  <strong>原因：</strong>「動けばいい」という考え。監視基盤の整備を後回しにした。
                </p>
                <p>
                  <strong>解決：</strong>OpenTelemetry の採用。構造化ログ + 分散トレーシング +
                  SLOベースのアラート。
                </p>
              </div>
            </div>

            <h3>17.2 健全性チェックフロー</h3>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={MERMAID_DATA.dm21} />
              <div className="diagram-caption">図17-1: マイクロサービス健全性チェックフロー</div>
            </div>
          </section>

          {/*  SECTION 18  */}
          <section id="s18">
            <div className="eye">
              <span className="snum">18</span>
              <span className="stag">References</span>
            </div>
            <h2>参考文献・ソース一覧</h2>
            <p>本ガイドは以下の公式ドキュメント・書籍・記事を参考に作成されています。</p>

            <h3>📚 必読書籍</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>書籍</th>
                    <th>著者</th>
                    <th>難易度</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Building Microservices（第2版）</strong>
                    </td>
                    <td>Sam Newman</td>
                    <td>
                      <span className="bdg bd-am">★★★★☆</span>
                    </td>
                    <td>マイクロサービスの決定版バイブル</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Microservices Patterns</strong>
                    </td>
                    <td>Chris Richardson</td>
                    <td>
                      <span className="bdg bd-am">★★★★☆</span>
                    </td>
                    <td>実践的なパターン集（Saga・CQRSなど）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Designing Distributed Systems</strong>
                    </td>
                    <td>Brendan Burns</td>
                    <td>
                      <span className="bdg bd-am">★★★★☆</span>
                    </td>
                    <td>分散システム設計パターン（無料PDF）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Release It!（第2版）</strong>
                    </td>
                    <td>Michael T. Nygard</td>
                    <td>
                      <span className="bdg bd-am">★★★★☆</span>
                    </td>
                    <td>障害耐性設計・Circuit Breakerの原著</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Google SRE Book</strong>
                    </td>
                    <td>Google SRE Team</td>
                    <td>
                      <span className="bdg bd-bl">★★★☆☆</span>
                    </td>
                    <td>SLI/SLO/SLAと信頼性設計（無料公開）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>🌐 マイクロサービスコア概念</h3>
            <div className="rg">
              <Ext className="ri" href="https://martinfowler.com/articles/microservices.html">
                <div className="ri-ic">📄</div>
                <div className="ri-body">
                  <div className="ri-t">Microservices — Martin Fowler &amp; James Lewis</div>
                  <div className="ri-u">martinfowler.com/articles/microservices.html</div>
                  <div className="ri-d">
                    マイクロサービスアーキテクチャの定義と特徴を体系化した原典（2014年）
                  </div>
                </div>
              </Ext>
              <Ext className="ri" href="https://microservices.io/">
                <div className="ri-ic">🌐</div>
                <div className="ri-body">
                  <div className="ri-t">microservices.io — Chris Richardson</div>
                  <div className="ri-u">microservices.io</div>
                  <div className="ri-d">
                    マイクロサービスパターンの包括的カタログ。Saga・CQRS・Outboxなど全パターンを網羅
                  </div>
                </div>
              </Ext>
              <Ext
                className="ri"
                href="https://martinfowler.com/bliki/StranglerFigApplication.html"
              >
                <div className="ri-ic">🌳</div>
                <div className="ri-body">
                  <div className="ri-t">Strangler Fig Application — Martin Fowler</div>
                  <div className="ri-u">martinfowler.com/bliki/StranglerFigApplication.html</div>
                  <div className="ri-d">段階的移行パターンの原典記事</div>
                </div>
              </Ext>
              <Ext className="ri" href="https://microservices.io/patterns/data/saga.html">
                <div className="ri-ic">🔄</div>
                <div className="ri-body">
                  <div className="ri-t">Saga Pattern — microservices.io</div>
                  <div className="ri-u">microservices.io/patterns/data/saga.html</div>
                  <div className="ri-d">分散トランザクションを実現するSagaパターンの詳細解説</div>
                </div>
              </Ext>
              <Ext className="ri" href="https://martinfowler.com/bliki/CircuitBreaker.html">
                <div className="ri-ic">🔌</div>
                <div className="ri-body">
                  <div className="ri-t">Circuit Breaker — Martin Fowler</div>
                  <div className="ri-u">martinfowler.com/bliki/CircuitBreaker.html</div>
                  <div className="ri-d">
                    サーキットブレーカーパターンの原典。Michael Nygardの書籍に基づく
                  </div>
                </div>
              </Ext>
              <Ext className="ri" href="https://12factor.net/">
                <div className="ri-ic">📋</div>
                <div className="ri-body">
                  <div className="ri-t">The Twelve-Factor App</div>
                  <div className="ri-u">12factor.net</div>
                  <div className="ri-d">
                    クラウドネイティブアプリケーション設計の12原則（日本語版あり）
                  </div>
                </div>
              </Ext>
              <Ext className="ri" href="https://samnewman.io/patterns/architectural/bff/">
                <div className="ri-ic">🔀</div>
                <div className="ri-body">
                  <div className="ri-t">BFF Pattern — Sam Newman</div>
                  <div className="ri-u">samnewman.io/patterns/architectural/bff/</div>
                  <div className="ri-d">Backend for Frontendパターンの提唱者による解説</div>
                </div>
              </Ext>
              <Ext className="ri" href="https://martinfowler.com/bliki/CQRS.html">
                <div className="ri-ic">📖</div>
                <div className="ri-body">
                  <div className="ri-t">CQRS — Martin Fowler</div>
                  <div className="ri-u">martinfowler.com/bliki/CQRS.html</div>
                  <div className="ri-d">コマンドとクエリの責任分離（CQRS）パターンの解説</div>
                </div>
              </Ext>
              <Ext
                className="ri"
                href="https://microservices.io/patterns/data/database-per-service.html"
              >
                <div className="ri-ic">🗄️</div>
                <div className="ri-body">
                  <div className="ri-t">Database per Service Pattern</div>
                  <div className="ri-u">
                    microservices.io/patterns/data/database-per-service.html
                  </div>
                  <div className="ri-d">サービスごとの独立したDB設計パターン</div>
                </div>
              </Ext>
              <Ext className="ri" href="https://microservices.io/patterns/apigateway.html">
                <div className="ri-ic">🚪</div>
                <div className="ri-body">
                  <div className="ri-t">API Gateway Pattern</div>
                  <div className="ri-u">microservices.io/patterns/apigateway.html</div>
                  <div className="ri-d">APIゲートウェイパターンの詳細解説</div>
                </div>
              </Ext>
            </div>

            <h3>☸️ Kubernetes・コンテナ</h3>
            <div className="rg">
              <Ext className="ri" href="https://kubernetes.io/docs/">
                <div className="ri-ic">☸️</div>
                <div className="ri-body">
                  <div className="ri-t">Kubernetes 公式ドキュメント</div>
                  <div className="ri-u">kubernetes.io/docs</div>
                  <div className="ri-d">Deployment・Service・HPA・Ingress等の詳細リファレンス</div>
                </div>
              </Ext>
              <Ext className="ri" href="https://istio.io/latest/docs/">
                <div className="ri-ic">🕸️</div>
                <div className="ri-body">
                  <div className="ri-t">Istio サービスメッシュ 公式ドキュメント</div>
                  <div className="ri-u">istio.io/latest/docs</div>
                  <div className="ri-d">mTLS・サーキットブレーカー・分散トレーシングの自動化</div>
                </div>
              </Ext>
              <Ext className="ri" href="https://www.cncf.io/">
                <div className="ri-ic">☁️</div>
                <div className="ri-body">
                  <div className="ri-t">CNCF — Cloud Native Computing Foundation</div>
                  <div className="ri-u">cncf.io</div>
                  <div className="ri-d">
                    クラウドネイティブ技術の標準化団体。CNCF Landscapeでツール一覧を確認可能
                  </div>
                </div>
              </Ext>
              <Ext className="ri" href="https://docs.docker.com/">
                <div className="ri-ic">🐳</div>
                <div className="ri-body">
                  <div className="ri-t">Docker 公式ドキュメント</div>
                  <div className="ri-u">docs.docker.com</div>
                  <div className="ri-d">
                    コンテナ化・マルチステージビルド・Compose等の公式リファレンス
                  </div>
                </div>
              </Ext>
            </div>

            <h3>📊 監視・オブザーバビリティ</h3>
            <div className="rg">
              <Ext className="ri" href="https://opentelemetry.io/">
                <div className="ri-ic">🔭</div>
                <div className="ri-body">
                  <div className="ri-t">OpenTelemetry 公式</div>
                  <div className="ri-u">opentelemetry.io</div>
                  <div className="ri-d">
                    分散トレーシング・メトリクス・ログの統合標準。ベンダーロックイン回避
                  </div>
                </div>
              </Ext>
              <Ext className="ri" href="https://sre.google/sre-book/table-of-contents/">
                <div className="ri-ic">📘</div>
                <div className="ri-body">
                  <div className="ri-t">Google SRE Book（無料公開）</div>
                  <div className="ri-u">sre.google/sre-book/table-of-contents</div>
                  <div className="ri-d">SLI/SLO/SLAの定義と4つのゴールデンシグナルの原典</div>
                </div>
              </Ext>
              <Ext className="ri" href="https://prometheus.io/docs/">
                <div className="ri-ic">📈</div>
                <div className="ri-body">
                  <div className="ri-t">Prometheus 公式ドキュメント</div>
                  <div className="ri-u">prometheus.io/docs</div>
                  <div className="ri-d">メトリクス収集・アラーティングの業界標準</div>
                </div>
              </Ext>
              <Ext className="ri" href="https://grafana.com/docs/">
                <div className="ri-ic">📊</div>
                <div className="ri-body">
                  <div className="ri-t">Grafana 公式ドキュメント</div>
                  <div className="ri-u">grafana.com/docs</div>
                  <div className="ri-d">
                    ダッシュボード・アラート・ログ集約（Loki）・トレーシング（Tempo）
                  </div>
                </div>
              </Ext>
              <Ext className="ri" href="https://www.jaegertracing.io/">
                <div className="ri-ic">🔍</div>
                <div className="ri-body">
                  <div className="ri-t">Jaeger 分散トレーシング</div>
                  <div className="ri-u">jaegertracing.io</div>
                  <div className="ri-d">CNCFのオープンソース分散トレーシングシステム</div>
                </div>
              </Ext>
            </div>

            <h3>🔐 セキュリティ</h3>
            <div className="rg">
              <Ext className="ri" href="https://owasp.org/www-project-api-security/">
                <div className="ri-ic">🛡️</div>
                <div className="ri-body">
                  <div className="ri-t">OWASP API Security Top 10</div>
                  <div className="ri-u">owasp.org/www-project-api-security</div>
                  <div className="ri-d">マイクロサービスAPIの主要セキュリティリスクと対策</div>
                </div>
              </Ext>
              <Ext className="ri" href="https://www.vaultproject.io/">
                <div className="ri-ic">🔑</div>
                <div className="ri-body">
                  <div className="ri-t">HashiCorp Vault</div>
                  <div className="ri-u">vaultproject.io</div>
                  <div className="ri-d">
                    シークレット管理・動的認証情報・暗号化サービスの標準ツール
                  </div>
                </div>
              </Ext>
              <Ext className="ri" href="https://www.nist.gov/publications/zero-trust-architecture">
                <div className="ri-ic">🚫</div>
                <div className="ri-body">
                  <div className="ri-t">Zero Trust Architecture — NIST SP 800-207</div>
                  <div className="ri-u">nist.gov/publications/zero-trust-architecture</div>
                  <div className="ri-d">ゼロトラストセキュリティモデルの公式ガイドライン</div>
                </div>
              </Ext>
            </div>

            <h3>💬 技術ブログ・事例</h3>
            <div className="rg">
              <Ext className="ri" href="https://netflixtechblog.com/tagged/architecture">
                <div className="ri-ic">🎬</div>
                <div className="ri-body">
                  <div className="ri-t">Netflix Tech Blog — Architecture</div>
                  <div className="ri-u">netflixtechblog.com/tagged/architecture</div>
                  <div className="ri-d">
                    マイクロサービスのパイオニア、Netflixによる実践事例と知見
                  </div>
                </div>
              </Ext>
              <Ext className="ri" href="https://aws.amazon.com/microservices/">
                <div className="ri-ic">☁️</div>
                <div className="ri-body">
                  <div className="ri-t">AWS マイクロサービス解説</div>
                  <div className="ri-u">aws.amazon.com/microservices</div>
                  <div className="ri-d">AWSのマイクロサービス導入ガイドとベストプラクティス</div>
                </div>
              </Ext>
              <Ext className="ri" href="https://kafka.apache.org/documentation/">
                <div className="ri-ic">🔶</div>
                <div className="ri-body">
                  <div className="ri-t">Apache Kafka 公式ドキュメント</div>
                  <div className="ri-u">kafka.apache.org/documentation</div>
                  <div className="ri-d">
                    分散イベントストリーミングプラットフォームの公式リファレンス
                  </div>
                </div>
              </Ext>
              <Ext
                className="ri"
                href="https://cloud.google.com/learn/what-is-microservices-architecture"
              >
                <div className="ri-ic">🔵</div>
                <div className="ri-body">
                  <div className="ri-t">Google Cloud マイクロサービス解説</div>
                  <div className="ri-u">
                    cloud.google.com/learn/what-is-microservices-architecture
                  </div>
                  <div className="ri-d">GoogleのGKEとマイクロサービスに関する解説</div>
                </div>
              </Ext>
            </div>
          </section>

          <div className="ft">
            <p>
              📅 最終更新：2026年6月 | バージョン 2.0 | マイクロサービスアーキテクチャ 完全ガイド
            </p>
            <p>
              本ガイドはオープンソースコミュニティの知見と公式ドキュメントに基づいて作成されています。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
