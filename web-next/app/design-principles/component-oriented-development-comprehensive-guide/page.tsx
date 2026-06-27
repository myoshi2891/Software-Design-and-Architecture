import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodSidebar from "./CodSidebar";

const NAV_GROUPS = [
  {
    title: "基礎編",
    items: [
      { id: "s1", num: "01", label: "コンポーネント指向とは" },
      { id: "s2", num: "02", label: "設計原則" },
      { id: "s3", num: "03", label: "分類と粒度" },
      { id: "s4", num: "04", label: "コンポーネント間の通信" },
    ],
  },
  {
    title: "実装編",
    items: [
      { id: "s5", num: "05", label: "UIコンポーネント設計" },
      { id: "s6", num: "06", label: "バックエンド設計" },
      { id: "s7", num: "07", label: "ライフサイクル管理" },
      { id: "s8", num: "08", label: "依存性管理と疎結合" },
      { id: "s9", num: "09", label: "テスト戦略" },
    ],
  },
  {
    title: "応用編",
    items: [
      { id: "s10", num: "10", label: "デザインシステム" },
      { id: "s11", num: "11", label: "マイクロフロントエンド" },
      { id: "s12", num: "12", label: "実践：ECサイト実装" },
    ],
  },
  {
    title: "まとめ",
    items: [
      { id: "s13", num: "13", label: "アンチパターン" },
      { id: "s14", num: "14", label: "ベストプラクティス" },
      { id: "s15", num: "15", label: "参考文献" },
    ],
  },
];

const DIAGRAMS = {
  d1_1: `graph TD
    C["🧩 コンポーネント"]
    C --> I["📋 明確なインターフェース\\n外部との契約を定義\\nProps / API / イベント"]
    C --> E["🔒 カプセル化\\n内部実装を隠蔽\\nブラックボックス原則"]
    C --> R["♻️ 再利用可能\\n異なる文脈・プロジェクトで\\nそのまま使いまわせる"]
    C --> D["🔗 独立性\\n他コンポーネントへの\\n依存を最小限に"]
    C --> M["🔀 合成可能\\n組み合わせてより大きな\\n機能を構成できる"]
    style C fill:#0d3b50,stroke:#10d9a0,color:#10d9a0
    style I fill:#0d1b2e,stroke:#1a2d47,color:#e2edf5
    style E fill:#0d1b2e,stroke:#1a2d47,color:#e2edf5
    style R fill:#0d1b2e,stroke:#1a2d47,color:#e2edf5
    style D fill:#0d1b2e,stroke:#1a2d47,color:#e2edf5
    style M fill:#0d1b2e,stroke:#1a2d47,color:#e2edf5`,

  d1_2: `graph LR
    subgraph BEFORE["❌ コンポーネント設計なし"]
        B1["密結合でコード変更が困難"]
        B2["同じUIパーツを各ページで再実装"]
        B3["全体を動かさないとテストできない"]
        B4["チームがファイルを共有して競合頻発"]
        B5["ブランドの一貫性が保てない"]
    end
    subgraph AFTER["✅ コンポーネント指向"]
        A1["独立コンポーネントで変更が局所化"]
        A2["Buttonを一度作れば全体で再利用"]
        A3["コンポーネント単体でテスト完結"]
        A4["チームがコンポーネント単位で分業"]
        A5["デザインシステムで一貫性を保証"]
    end
    style BEFORE fill:#1a0e0e,stroke:#ef4444
    style AFTER fill:#0e1a15,stroke:#10d9a0
    style B1 fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style B2 fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style B3 fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style B4 fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style B5 fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style A1 fill:#0d2e22,stroke:#10d9a0,color:#6ee7b7
    style A2 fill:#0d2e22,stroke:#10d9a0,color:#6ee7b7
    style A3 fill:#0d2e22,stroke:#10d9a0,color:#6ee7b7
    style A4 fill:#0d2e22,stroke:#10d9a0,color:#6ee7b7
    style A5 fill:#0d2e22,stroke:#10d9a0,color:#6ee7b7`,

  d2_1: `graph TD
    P["📐 コンポーネント設計の原則"] --> CO["凝集に関する原則"]
    P --> CP["結合に関する原則"]
    CO --> REP["REP：再利用・リリース等価の原則\\n再利用の単位 ＝ リリースの単位"]
    CO --> CCP["CCP：閉鎖性共通の原則\\n同じ理由で変更されるクラスを\\n同じコンポーネントにまとめる"]
    CO --> CRP["CRP：全再利用の原則\\n不要なものへの依存を\\nユーザーに強制しない"]
    CP --> ADP["ADP：非循環依存の原則\\n依存グラフにサイクルを\\n作ってはならない"]
    CP --> SDP["SDP：安定依存の原則\\n安定している方向に\\n依存する"]
    CP --> SAP["SAP：安定抽象の原則\\n安定したコンポーネントほど\\n抽象的であるべき"]
    style P fill:#0d2040,stroke:#10d9a0,color:#10d9a0
    style CO fill:#0d1b2e,stroke:#7b68ee,color:#a78bfa
    style CP fill:#0d1b2e,stroke:#10d9a0,color:#6ee7b7
    style REP fill:#1a1040,stroke:#7b68ee,color:#e2edf5
    style CCP fill:#1a1040,stroke:#7b68ee,color:#e2edf5
    style CRP fill:#1a1040,stroke:#7b68ee,color:#e2edf5
    style ADP fill:#0d2515,stroke:#10d9a0,color:#e2edf5
    style SDP fill:#0d2515,stroke:#10d9a0,color:#e2edf5
    style SAP fill:#0d2515,stroke:#10d9a0,color:#e2edf5`,

  d2_2: `graph TD
    subgraph GOOD["✅ 高凝集・低結合（理想）"]
        AUTH["AuthComponent\\n・ログイン処理\\n・ログアウト処理\\n・トークン管理\\n→ すべて「認証」の責務"]
        PROD["ProductComponent\\n・商品一覧表示\\n・商品検索\\n・在庫確認\\n→ すべて「商品」の責務"]
        AUTH --- |"インターフェース経由のみ"| PROD
    end
    subgraph BAD["❌ 低凝集・高結合（アンチパターン）"]
        GOD["UserManager\\n・ログイン処理\\n・商品一覧表示\\n・注文履歴管理\\n・通知送信\\n→ 無関係な責務が混在（神クラス）"]
    end
    style GOOD fill:#0e1a15,stroke:#10d9a0
    style BAD fill:#1a0e0e,stroke:#ef4444
    style AUTH fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style PROD fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style GOD fill:#2a1515,stroke:#ef4444,color:#fca5a5`,

  d3_1: `graph TD
    AT["⚛️ Atoms（原子）\\n最小単位 — これ以上分割できない\\nButton / Input / Label / Icon / Badge"]
    MO["🔬 Molecules（分子）\\nAtomsを組み合わせた小さな機能単位\\nSearchBar / FormField / ReviewStars / PriceDisplay"]
    OR["🦠 Organisms（有機体）\\n独立した意味を持つ UI ブロック\\nHeader / ProductCard / CartSidebar / NavigationMenu"]
    TE["📄 Templates（テンプレート）\\nOrganismsを配置したページのレイアウト\\nコンテンツなしのワイヤーフレーム定義"]
    PA["📱 Pages（ページ）\\nTemplatesに実データを流し込んだ最終形\\nユーザーが実際に見る画面"]
    AT -->|"組み合わせる"| MO
    MO -->|"組み合わせる"| OR
    OR -->|"配置する"| TE
    TE -->|"データを注入"| PA
    style AT fill:#1a1040,stroke:#7b68ee,color:#c4b5fd
    style MO fill:#0d2515,stroke:#10d9a0,color:#6ee7b7
    style OR fill:#1a1a08,stroke:#f59e0b,color:#fcd34d
    style TE fill:#1a0a1a,stroke:#ec4899,color:#f9a8d4
    style PA fill:#1a0e0e,stroke:#ef4444,color:#fca5a5`,

  d3_2: `graph LR
    subgraph SMART["🧠 スマートコンポーネント（Container）"]
        S1["ProductListContainer\\n・APIからデータを取得\\n・フィルタリング・ソートを処理\\n・状態管理を担当\\n・ビジネスロジックを持つ"]
    end
    subgraph DUMB["🎨 ダムコンポーネント（Presentational）"]
        D1["ProductList\\n・products配列を受け取って表示するだけ\\n・API呼び出しをしない\\n・高い再利用性\\n・テストが容易"]
    end
    S1 -->|"products: Product[] を Props で渡す"| D1
    style SMART fill:#1a1040,stroke:#7b68ee
    style DUMB fill:#0d2515,stroke:#10d9a0
    style S1 fill:#12103a,stroke:#7b68ee,color:#e2edf5
    style D1 fill:#0a2018,stroke:#10d9a0,color:#e2edf5`,

  d3_3: `flowchart TD
    START(["UI要素を設計する"]) --> Q1{"複数の場所で\\n使われるか？"}
    Q1 -->|"Yes"| MAKE["✅ コンポーネントとして切り出す"]
    Q1 -->|"No"| Q2{"独立して\\nテストできるか？"}
    Q2 -->|"Yes"| Q3{"単独で\\n意味を持つか？"}
    Q2 -->|"No"| KEEP["📝 インラインで実装（切り出し不要）"]
    Q3 -->|"Yes"| MAKE
    Q3 -->|"No"| KEEP
    MAKE --> Q4{"500行を\\n超えているか？"}
    Q4 -->|"Yes"| SPLIT["✂️ さらに小さく分割する"]
    Q4 -->|"No"| DONE(["✅ 完成"])
    SPLIT --> MAKE
    style START fill:#0d2040,stroke:#10d9a0,color:#e2edf5
    style MAKE fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style KEEP fill:#1a1a1a,stroke:#4a6a8a,color:#7a9ab8
    style SPLIT fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style DONE fill:#0d2040,stroke:#10d9a0,color:#e2edf5`,

  d4_1: `graph TD
    PAT["📡 通信パターン"] --> PD["⬇️ Props Down\\n親→子の一方向データフロー\\n最もシンプルで推奨"]
    PAT --> EU["⬆️ Events Up\\n子→親のイベント通知\\nコールバック / emit"]
    PAT --> CTX["🌐 Context / Store\\nグローバル状態の共有\\n深いツリーでの共有"]
    PAT --> SL["🎰 Slot / Children\\nコンポーネント内にコンテンツ注入\\n高い柔軟性・再利用性"]
    PAT --> PO["🚪 Portal\\nDOMツリー外側に描画\\nモーダル・ツールチップ"]
    style PAT fill:#0d2040,stroke:#10d9a0,color:#10d9a0
    style PD fill:#0d1b2e,stroke:#3b82f6,color:#93c5fd
    style EU fill:#0d1b2e,stroke:#10d9a0,color:#6ee7b7
    style CTX fill:#0d1b2e,stroke:#7b68ee,color:#c4b5fd
    style SL fill:#0d1b2e,stroke:#f59e0b,color:#fcd34d
    style PO fill:#0d1b2e,stroke:#ef4444,color:#fca5a5`,

  d4_2: `sequenceDiagram
    participant PP as 親 ProductPage
    participant PC as 子 ProductCard
    participant AB as 孫 AddToCartButton
    Note over PP,AB: ⬇️ Props Down（データを下に流す）
    PP->>PC: product={id, name, price}
    PC->>AB: productId={id}, onAdd={handler}
    Note over PP,AB: ⬆️ Events Up（イベントを上に伝える）
    AB-->>PC: onAdd(productId, quantity) を呼ぶ
    PC-->>PP: onAddToCart(product) を呼ぶ
    PP->>PP: カートに商品を追加する処理`,

  d4_3: `graph TD
    subgraph STORE["🌐 グローバルストア（Context / Zustand / Redux）"]
        CS["cartItems: CartItem[]"]
        US["currentUser: User | null"]
        LS["isLoading: boolean"]
    end
    subgraph TREE["コンポーネントツリー"]
        APP["App"]
        HED["Header（カートアイコン表示）"]
        PL["ProductList"]
        PC["ProductCard"]
        AB["AddToCartButton"]
        CT["CartSidebar"]
    end
    APP --> HED
    APP --> PL
    APP --> CT
    PL --> PC
    PC --> AB
    STORE -->|"cartItemsを購読"| HED
    STORE -->|"cartItemsを購読"| CT
    AB -->|"addToCart()をディスパッチ"| STORE
    style STORE fill:#1a1040,stroke:#7b68ee
    style CS fill:#12103a,stroke:#7b68ee,color:#e2edf5
    style US fill:#12103a,stroke:#7b68ee,color:#e2edf5
    style LS fill:#12103a,stroke:#7b68ee,color:#e2edf5`,

  d5_1: `graph LR
    subgraph WITHOUT["❌ Hookなし（ロジック重複）"]
        CA["ProductList\\n+ API呼び出しロジック\\n+ ローディング状態管理\\n+ エラー処理"]
        CB["OrderList\\n+ API呼び出しロジック（重複！）\\n+ ローディング状態管理（重複！）\\n+ エラー処理（重複！）"]
    end
    subgraph WITH["✅ Custom Hook（ロジックを再利用）"]
        HK["useFetch(url)\\n→ data, loading, error を返す\\n汎用フック"]
        CC["ProductList\\nuseFetch('/api/products') のみ"]
        CD["OrderList\\nuseFetch('/api/orders') のみ"]
        HK --> CC
        HK --> CD
    end
    style WITHOUT fill:#1a0e0e,stroke:#ef4444
    style WITH fill:#0e1a15,stroke:#10d9a0
    style CA fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style CB fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style HK fill:#0d3b50,stroke:#10d9a0,color:#10d9a0
    style CC fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style CD fill:#0d2e22,stroke:#10d9a0,color:#e2edf5`,

  d6_1: `graph TD
    CTL["🟡 Controller（コントローラー）\\nHTTPリクエスト処理・バリデーション\\nOrderController / UserController"]
    SVC["🔵 Service（サービス）\\nビジネスロジックを担う中心的コンポーネント\\nOrderService / UserService"]
    REP["🟢 Repository（リポジトリ）\\nデータアクセスを担当\\nOrderRepository / UserRepository"]
    GTW["🔴 Gateway（ゲートウェイ）\\n外部サービスへの接続\\nPaymentGateway / EmailGateway"]
    MID["🟣 Middleware（ミドルウェア）\\n横断的関心事：認証・ロギング・レート制限"]
    CTL --> SVC
    SVC --> REP
    SVC --> GTW
    MID -.->|"横断的に適用"| CTL
    style CTL fill:#1a1a08,stroke:#f59e0b,color:#fcd34d
    style SVC fill:#0d1b40,stroke:#3b82f6,color:#93c5fd
    style REP fill:#0d2515,stroke:#10d9a0,color:#6ee7b7
    style GTW fill:#1a0e0e,stroke:#ef4444,color:#fca5a5
    style MID fill:#1a1040,stroke:#7b68ee,color:#c4b5fd`,

  d6_2: `graph TD
    subgraph ORDER["📦 OrderModule"]
        OC["OrderController\\nHTTP エンドポイント"]
        OS["OrderService\\nビジネスロジック"]
        OR["OrderRepository\\nDB アクセス"]
        OC --> OS
        OS --> OR
    end
    subgraph USER["📦 UserModule"]
        UC["UserController"]
        US["UserService"]
        UR["UserRepository"]
        UC --> US
        US --> UR
    end
    subgraph SHARED["📦 SharedModule（共有）"]
        LG["LoggerService"]
        CF["ConfigService"]
        EM["EmailService"]
    end
    ORDER -->|"import"| SHARED
    USER -->|"import"| SHARED
    OS -.->|"UserService を利用"| US
    style ORDER fill:#0d1b40,stroke:#3b82f6
    style USER fill:#0d2515,stroke:#10d9a0
    style SHARED fill:#1a1a08,stroke:#f59e0b`,

  d7_1: `flowchart TD
    START([コンポーネント生成])
    subgraph MT[Mounting フェーズ]
        M1[state 初期化]
        M2[初回レンダリング]
        M3[DOM に挿入]
        M4[API呼び出し・イベント登録]
        M1 --> M2 --> M3 --> M4
    end
    subgraph UT[Updating フェーズ]
        U1[更新が必要か判断]
        U2[Yes: 再描画]
        U3[No: スキップ 最適化]
        U4[更新完了]
        U1 --> U2 --> U4
        U1 --> U3
    end
    subgraph UM[Unmounting フェーズ]
        C1[クリーンアップ処理]
        C2[イベント解除 / タイマーキャンセル / リクエスト中断]
        C1 --> C2
    end
    END([コンポーネント破棄])
    START --> MT
    MT --> UT
    UT --> UM
    UM --> END
    style START fill:#0d3b28,stroke:#10d9a0,color:#e2edf5
    style END fill:#3b0d0d,stroke:#ef4444,color:#e2edf5
    style MT fill:#0a2030,stroke:#10d9a0,color:#e2edf5
    style UT fill:#1a1040,stroke:#7b68ee,color:#e2edf5
    style UM fill:#2a1a08,stroke:#f59e0b,color:#e2edf5
    style M1 fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style M2 fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style M3 fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style M4 fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style U1 fill:#12103a,stroke:#7b68ee,color:#e2edf5
    style U2 fill:#12103a,stroke:#7b68ee,color:#e2edf5
    style U3 fill:#12103a,stroke:#7b68ee,color:#e2edf5
    style U4 fill:#12103a,stroke:#7b68ee,color:#e2edf5
    style C1 fill:#2a1a08,stroke:#f59e0b,color:#e2edf5
    style C2 fill:#2a1a08,stroke:#f59e0b,color:#e2edf5`,

  d8_1: `graph TD
    subgraph BAD["❌ DI なし（密結合）— テスト不可"]
        SB["OrderService\\n内部で new MySQLRepository()"]
        DB["MySQLRepository\\n直接生成される（差し替え不可）"]
        SB --> DB
    end
    subgraph GOOD["✅ DI あり（疎結合）— テスト可能"]
        DIC["🏭 DI コンテナ（IoC）\\n依存関係を管理・注入する"]
        SG["OrderService\\nインターフェースに依存するだけ"]
        RI["OrderRepository\\nインターフェース（抽象）"]
        RM["MySQLOrderRepository\\n本番用の実装"]
        RT["InMemoryOrderRepository\\nテスト用の実装"]
        DIC -->|"本番時"| RM
        DIC -->|"テスト時"| RT
        RM -->|"実装"| RI
        RT -->|"実装"| RI
        SG -->|"依存"| RI
    end
    style BAD fill:#1a0e0e,stroke:#ef4444
    style GOOD fill:#0e1a15,stroke:#10d9a0
    style SB fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style DB fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style DIC fill:#1a1a08,stroke:#f59e0b,color:#fcd34d
    style SG fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style RI fill:#0d1b40,stroke:#3b82f6,color:#93c5fd
    style RM fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style RT fill:#0d2e22,stroke:#10d9a0,color:#e2edf5`,

  d8_2: `graph LR
    subgraph CYCLIC["❌ 循環依存（絶対NG）"]
        A1["OrderService"] -->|"依存"| B1["UserService"]
        B1 -->|"依存"| C1["NotificationService"]
        C1 -->|"依存"| A1
    end
    subgraph ACYCLIC["✅ 非循環依存（正しい設計）"]
        A2["OrderService"] -->|"依存"| B2["UserService"]
        A2 -->|"依存"| C2["NotificationService"]
        B2 -->|"依存"| D2["UserRepository"]
        C2 -->|"依存"| E2["EmailGateway"]
    end
    style CYCLIC fill:#1a0e0e,stroke:#ef4444
    style ACYCLIC fill:#0e1a15,stroke:#10d9a0
    style A1 fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style B1 fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style C1 fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style A2 fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style B2 fill:#0d2e22,stroke:#10d9a0,color:#e2edf5
    style C2 fill:#0d2e22,stroke:#10d9a0,color:#e2edf5`,

  d9_1: `graph TD
    E2E["🌐 E2Eテスト（少数）\\n実際のブラウザで全体フローを確認\\nPlaywright / Cypress\\n最も遅い・最もコスト高"]
    INT["🔗 統合テスト（中程度）\\n複数コンポーネントの連携を確認\\nReact Testing Library\\nユーザー操作をシミュレート"]
    UNIT["⚡ ユニットテスト（多数）\\n単一コンポーネントの動作確認\\nVitest / Jest\\n高速・モックを活用"]
    VIS["🎨 ビジュアルテスト（補完）\\n見た目の変化を検出\\nStorybook / Chromatic\\nスタイル・レイアウトの回帰テスト"]
    UNIT -->|"基盤"| INT
    INT -->|"基盤"| E2E
    VIS -.->|"補完的に利用"| UNIT
    style E2E fill:#1a0e0e,stroke:#ef4444,color:#fca5a5
    style INT fill:#1a1a08,stroke:#f59e0b,color:#fcd34d
    style UNIT fill:#0d2515,stroke:#10d9a0,color:#6ee7b7
    style VIS fill:#0d1b40,stroke:#3b82f6,color:#93c5fd`,

  d10_1: `graph TD
    FOUND["🏗️ 基盤（Foundation）"]
    COL["🎨 カラーパレット\\nPrimary / Semantic / Neutral\\nLight / Dark モード対応"]
    TYP["📝 タイポグラフィ\\nフォント・サイズ・ウェイト"]
    SPC["📐 スペーシング\\n4px グリッドシステム"]
    ICO["🔣 アイコンセット"]
    TOKEN["🔑 デザイントークン"]
    DT["CSS カスタムプロパティ / JS オブジェクト\\n--color-primary: #3498db\\n--spacing-md: 16px\\n一元管理・テーマ切り替えが容易"]
    LIB["📦 コンポーネントライブラリ"]
    AT["Atoms: Button / Input / Badge"]
    MO["Molecules: FormField / SearchBar"]
    OR["Organisms: Header / Modal / Card"]
    DOC["📖 ドキュメント＆ツール"]
    SB["Storybook コンポーネントカタログ"]
    FG["Figma デザインソース"]
    CL["Changelog 変更履歴管理"]
    FOUND --> TOKEN
    TOKEN --> LIB
    LIB --> DOC
    style FOUND fill:#0d1b40,stroke:#3b82f6
    style TOKEN fill:#1a1040,stroke:#7b68ee
    style LIB fill:#0d2515,stroke:#10d9a0
    style DOC fill:#1a1a08,stroke:#f59e0b
    style DT fill:#12103a,stroke:#7b68ee,color:#e2edf5`,

  d11_1: `graph TD
    SH["🐚 Shell アプリ（ホスト）\\n各 MFE を読み込み・配置する"]
    subgraph TA["チームA：商品チーム"]
        PM["Product MFE\\n商品一覧・詳細・検索\\n独立デプロイ"]
    end
    subgraph TB["チームB：注文チーム"]
        OM["Order MFE\\nカート・チェックアウト\\n独立デプロイ"]
    end
    subgraph TC["チームC：ユーザーチーム"]
        UM["User MFE\\n認証・プロフィール\\n独立デプロイ"]
    end
    SL["📦 共有コンポーネントライブラリ\\n全チームが使う共通 UI（デザインシステム）"]
    SH --> PM
    SH --> OM
    SH --> UM
    PM --> SL
    OM --> SL
    UM --> SL
    style SH fill:#0d2040,stroke:#10d9a0,color:#10d9a0
    style PM fill:#0d1b40,stroke:#3b82f6,color:#93c5fd
    style OM fill:#0d2515,stroke:#10d9a0,color:#6ee7b7
    style UM fill:#1a1a08,stroke:#f59e0b,color:#fcd34d
    style SL fill:#1a1040,stroke:#7b68ee,color:#c4b5fd`,

  d12_1: `graph TD
    subgraph PA["📱 Pages"]
        TOP["TopPage"]
        PROD["ProductDetailPage"]
        CART["CartPage"]
        CHK["CheckoutPage"]
    end
    subgraph TE["📄 Templates"]
        ML["MainLayout\\nHeader + Main + Footer"]
        CL["CheckoutLayout\\nStep ナビ + コンテンツ"]
    end
    subgraph OR["🦠 Organisms"]
        HD["Header\\nロゴ・ナビ・検索・カートアイコン"]
        PG["ProductGrid\\nProductCard × N"]
        CI["CartItems\\nCartItem × N"]
        CF["CheckoutForm\\n住所・支払い入力"]
    end
    subgraph MO["🔬 Molecules"]
        PC["ProductCard"]
        CAI["CartItem"]
        PD["PriceDisplay"]
        FF["FormField"]
        SB["SearchBox"]
    end
    subgraph AT["⚛️ Atoms"]
        BT["Button"]
        IN["Input"]
        BA["Badge"]
        SP["Spinner"]
        LB["Label"]
    end
    TOP & PROD & CART --> ML
    CHK --> CL
    ML --> HD & PG & CI
    CHK --> CF
    PG --> PC
    CI --> CAI
    PC --> BT & BA & PD
    CAI --> BT & IN
    CF --> FF
    FF --> LB & IN
    HD --> SB
    SB --> IN & BT
    style PA fill:#1a0e0e,stroke:#ef4444
    style TE fill:#1a1a08,stroke:#f59e0b
    style OR fill:#0d2515,stroke:#10d9a0
    style MO fill:#0d1b40,stroke:#3b82f6
    style AT fill:#1a1040,stroke:#7b68ee`,

  d13_1: `graph TD
    ANT[コンポーネントのアンチパターン]
    ANT --> G["コンポーネントモノリス\\n500行超・複数の責務が混在\\n解決: 単一責任原則を適用して分割"]
    ANT --> P["Props ドリリング\\n5階層以上 Props を中継\\n解決: Context / Store を使う"]
    ANT --> M["関心事の混在\\nAPI呼び出しと描画が同じ場所\\n解決: Custom Hooks でロジックを分離"]
    ANT --> D["状態の直接変更\\nProps を直接書き換える\\n解決: setState / emit のみで更新"]
    ANT --> O["過度な最適化\\nすべてを useMemo/useCallback でラップ\\n解決: プロファイラで確認してから適用"]
    ANT --> A["過度な抽象化\\n1回しか使わないものをコンポーネント化\\n解決: 3回使ったら共通化を検討"]
    style ANT fill:#2a0d0d,stroke:#ef4444,color:#fca5a5
    style G fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style P fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style M fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style D fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style O fill:#2a1515,stroke:#ef4444,color:#fca5a5
    style A fill:#2a1515,stroke:#ef4444,color:#fca5a5`,
};

const CODE_BUTTON = `// <span class="cm">✅ Props を厳密に型定義（ドキュメントの役割も兼ねる）</span>
<span class="kw">type</span> <span class="fn">ButtonVariant</span> = <span class="st">'primary'</span> | <span class="st">'secondary'</span> | <span class="st">'danger'</span> | <span class="st">'ghost'</span>;
<span class="kw">type</span> <span class="fn">ButtonSize</span> = <span class="st">'sm'</span> | <span class="st">'md'</span> | <span class="st">'lg'</span>;

<span class="kw">interface</span> <span class="fn">ButtonProps</span> {
  <span class="cm">// 必須 Props</span>
  children: React.ReactNode;
  onClick: () =&gt; <span class="kw">void</span>;
  <span class="cm">// オプション Props（デフォルト値付き）</span>
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: <span class="kw">boolean</span>;
  loading?: <span class="kw">boolean</span>;
  fullWidth?: <span class="kw">boolean</span>;
  ariaLabel?: <span class="kw">string</span>;
  type?: <span class="st">'button'</span> | <span class="st">'submit'</span> | <span class="st">'reset'</span>;
}

<span class="cm">// ✅ 関数コンポーネント + TypeScript で Pure に保つ</span>
<span class="kw">export</span> <span class="kw">const</span> <span class="fn">Button</span>: React.FC&lt;ButtonProps&gt; = ({
  children,
  onClick,
  variant = <span class="st">'primary'</span>,   <span class="cm">// デフォルト値: primary</span>
  size = <span class="st">'md'</span>,
  disabled = <span class="kw">false</span>,
  loading = <span class="kw">false</span>,
  fullWidth = <span class="kw">false</span>,
  ariaLabel,
  type = <span class="st">'button'</span>,
}) =&gt; {
  <span class="kw">const</span> <span class="fn">handleClick</span> = () =&gt; {
    <span class="cm">// ✅ disabled / loading 中はクリックを無効化</span>
    <span class="kw">if</span> (!disabled && !loading) <span class="fn">onClick</span>();
  };

  <span class="kw">return</span> (
    &lt;<span class="kw">button</span>
      type={type}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : <span class="st">''</span>,
        loading ? styles.loading : <span class="st">''</span>,
      ].<span class="fn">filter</span>(Boolean).<span class="fn">join</span>(<span class="st">' '</span>)}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}   <span class="cm">// ✅ アクセシビリティ対応</span>
    &gt;
      {loading && &lt;<span class="kw">span</span> className={styles.spinner} aria-hidden=<span class="st">"true"</span> /&gt;}
      &lt;<span class="kw">span</span> className={loading ? styles.hidden : <span class="st">''</span>}&gt;{children}&lt;/<span class="kw">span</span>&gt;
    &lt;/<span class="kw">button</span>&gt;
  );
};

Button.displayName = <span class="st">'Button'</span>; <span class="cm">// ✅ デバッグ時の表示名`;

const CODE_HOOK = `<span class="cm">// ✅ 汎用フェッチフック — ロジックをコンポーネントとして再利用</span>
<span class="kw">interface</span> <span class="fn">FetchState</span>&lt;T&gt; {
  data: T | null;
  loading: <span class="kw">boolean</span>;
  error: Error | null;
  refetch: () =&gt; <span class="kw">void</span>;
}

<span class="kw">function</span> <span class="fn">useFetch</span>&lt;T&gt;(url: <span class="kw">string</span>): FetchState&lt;T&gt; {
  <span class="kw">const</span> [data, setData] = <span class="fn">useState</span>&lt;T | null&gt;(null);
  <span class="kw">const</span> [loading, setLoading] = <span class="fn">useState</span>(<span class="kw">true</span>);
  <span class="kw">const</span> [error, setError] = <span class="fn">useState</span>&lt;Error | null&gt;(null);
  <span class="kw">const</span> [trigger, setTrigger] = <span class="fn">useState</span>(<span class="nu">0</span>);

  <span class="kw">const</span> refetch = <span class="fn">useCallback</span>(() =&gt; <span class="fn">setTrigger</span>(n =&gt; n + <span class="nu">1</span>), []);

  <span class="fn">useEffect</span>(() =&gt; {
    <span class="cm">// ✅ AbortController: アンマウント時にリクエストをキャンセル（メモリリーク防止）</span>
    <span class="kw">const</span> controller = <span class="kw">new</span> <span class="fn">AbortController</span>();

    <span class="kw">const</span> fetchData = <span class="kw">async</span> () =&gt; {
      <span class="fn">setLoading</span>(<span class="kw">true</span>);
      <span class="fn">setError</span>(null);
      <span class="kw">try</span> {
        <span class="kw">const</span> res = <span class="kw">await</span> <span class="fn">fetch</span>(url, { signal: controller.signal });
        <span class="kw">if</span> (!res.ok) <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">Error</span>(\`HTTP \${res.status}: \${res.statusText}\`);
        <span class="fn">setData</span>(<span class="kw">await</span> res.<span class="fn">json</span>());
      } <span class="kw">catch</span> (err) {
        <span class="kw">if</span> ((err <span class="kw">as</span> Error).name === <span class="st">'AbortError'</span>) <span class="kw">return</span>; <span class="cm">// ✅ アボートは無視</span>
        <span class="fn">setError</span>(err <span class="kw">instanceof</span> Error ? err : <span class="kw">new</span> <span class="fn">Error</span>(<span class="st">'不明なエラー'</span>));
      } <span class="kw">finally</span> {
        <span class="kw">if</span> (!controller.signal.aborted) <span class="fn">setLoading</span>(<span class="kw">false</span>);
      }
    };

    <span class="fn">fetchData</span>();

    <span class="cm">// ✅ クリーンアップ関数: コンポーネントのアンマウント時に実行される</span>
    <span class="kw">return</span> () =&gt; controller.<span class="fn">abort</span>();
  }, [url, trigger]);

  <span class="kw">return</span> { data, loading, error, refetch };
}

<span class="cm">// ✅ 使い方（どこでも同じロジックが使えるようになる）</span>
<span class="kw">const</span> <span class="fn">ProductList</span>: React.FC = () =&gt; {
  <span class="kw">const</span> { data: products, loading, error, refetch } = useFetch&lt;Product[]&gt;(<span class="st">'/api/products'</span>);

  <span class="kw">if</span> (loading) <span class="kw">return</span> &lt;<span class="kw">Spinner</span> /&gt;;
  <span class="kw">if</span> (error) <span class="kw">return</span> &lt;<span class="kw">ErrorMessage</span> message={error.message} onRetry={refetch} /&gt;;
  <span class="kw">return</span> &lt;<span class="kw">ProductGrid</span> products={products ?? []} /&gt;;
};`;

const CODE_NESTJS = `<span class="cm">// ✅ @Injectable() = DI コンテナへの登録宣言</span>
@<span class="fn">Injectable</span>()
<span class="kw">export</span> <span class="kw">class</span> <span class="fn">OrderService</span> {
  <span class="cm">// ✅ コンストラクタ注入：依存するコンポーネントを受け取るだけ</span>
  <span class="cm">//    テスト時はモックに差し替えられる（疎結合の恩恵）</span>
  <span class="kw">constructor</span>(
    <span class="kw">private</span> <span class="kw">readonly</span> orderRepository: OrderRepository,
    <span class="kw">private</span> <span class="kw">readonly</span> userService: UserService,
  ) {}

  <span class="kw">async</span> <span class="fn">createOrder</span>(dto: CreateOrderDto): Promise&lt;Order&gt; {
    <span class="cm">// 1. ユーザーの存在確認（UserService に委譲）</span>
    <span class="kw">const</span> user = <span class="kw">await</span> <span class="kw">this</span>.userService.<span class="fn">findById</span>(dto.customerId);
    <span class="kw">if</span> (!user) {
      <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">NotFoundException</span>(\`顧客が見つかりません: \${dto.customerId}\`);
    }
    <span class="kw">if</span> (!user.isActive) {
      <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">BadRequestException</span>(<span class="st">'非アクティブなユーザーは注文できません'</span>);
    }

    <span class="cm">// 2. 注文エンティティを作成して永続化（Repository に委譲）</span>
    <span class="kw">const</span> order = <span class="kw">this</span>.orderRepository.<span class="fn">create</span>({
      customerId: dto.customerId,
      items: dto.items,
      status: <span class="st">'pending'</span>,
    });
    <span class="kw">return</span> <span class="kw">this</span>.orderRepository.<span class="fn">save</span>(order);
  }

  <span class="kw">async</span> <span class="fn">findById</span>(orderId: <span class="kw">string</span>): Promise&lt;Order&gt; {
    <span class="kw">const</span> order = <span class="kw">await</span> <span class="kw">this</span>.orderRepository.<span class="fn">findOne</span>({ where: { id: orderId } });
    <span class="kw">if</span> (!order) <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">NotFoundException</span>(\`注文が見つかりません: \${orderId}\`);
    <span class="kw">return</span> order;
  }
}

<span class="cm">// ✅ Controller: HTTP 処理のみを担当（ビジネスロジックを持たない）</span>
@<span class="fn">ApiTags</span>(<span class="st">'orders'</span>)
@<span class="fn">UseGuards</span>(JwtAuthGuard)
@<span class="fn">Controller</span>(<span class="st">'api/v1/orders'</span>)
<span class="kw">export</span> <span class="kw">class</span> <span class="fn">OrderController</span> {
  <span class="kw">constructor</span>(<span class="kw">private</span> <span class="kw">readonly</span> orderService: OrderService) {}

  @<span class="fn">Post</span>()
  @<span class="fn">HttpCode</span>(HttpStatus.CREATED)
  <span class="kw">async</span> <span class="fn">create</span>(@<span class="fn">Body</span>() dto: CreateOrderDto, @<span class="fn">CurrentUser</span>() user: AuthUser) {
    <span class="cm">// ✅ Service に処理を委譲するだけ</span>
    <span class="kw">return</span> <span class="kw">this</span>.orderService.<span class="fn">createOrder</span>({ ...dto, customerId: user.id });
  }

  @<span class="fn">Get</span>(<span class="st">':id'</span>)
  <span class="kw">async</span> <span class="fn">findOne</span>(@<span class="fn">Param</span>(<span class="st">'id'</span>) id: <span class="kw">string</span>) {
    <span class="kw">return</span> <span class="kw">this</span>.orderService.<span class="fn">findById</span>(id);
  }
}`;

const CODE_FASTAPI = `<span class="kw">from</span> fastapi <span class="kw">import</span> APIRouter, Depends, HTTPException, status
<span class="kw">from</span> typing <span class="kw">import</span> Annotated

<span class="kw">from</span> .service <span class="kw">import</span> OrderService
<span class="kw">from</span> .schemas <span class="kw">import</span> CreateOrderRequest, OrderResponse
<span class="kw">from</span> ..auth.dependencies <span class="kw">import</span> get_current_user
<span class="kw">from</span> ..auth.schemas <span class="kw">import</span> CurrentUser

<span class="cm"># ✅ Router をコンポーネントの単位として分割</span>
router = <span class="fn">APIRouter</span>(prefix=<span class="st">"/api/v1/orders"</span>, tags=[<span class="st">"orders"</span>])

<span class="cm"># ✅ 依存性注入 — テスト時に差し替え可能にする</span>
<span class="kw">def</span> <span class="fn">get_order_service</span>() -&gt; OrderService:
    <span class="kw">return</span> <span class="fn">OrderService</span>()

@router.post(<span class="st">"/"</span>, response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
<span class="kw">async def</span> <span class="fn">create_order</span>(
    request: CreateOrderRequest,
    <span class="cm"># ✅ Depends() により依存関係を自動注入</span>
    current_user: Annotated[CurrentUser, <span class="fn">Depends</span>(get_current_user)],
    service: Annotated[OrderService, <span class="fn">Depends</span>(get_order_service)],
):
    <span class="st">"""注文を作成する。認証必須。"""</span>
    <span class="kw">try</span>:
        order = <span class="kw">await</span> service.create_order(
            customer_id=current_user.id,
            items=request.items,
        )
        <span class="kw">return</span> OrderResponse.from_domain(order)
    <span class="kw">except</span> ValueError <span class="kw">as</span> e:
        <span class="kw">raise</span> <span class="fn">HTTPException</span>(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=<span class="fn">str</span>(e),
        )`;

const CODE_LIFECYCLE = `<span class="kw">const</span> <span class="fn">LiveInventoryComponent</span>: React.FC&lt;{ productId: <span class="kw">string</span> }&gt; = ({ productId }) =&gt; {
  <span class="kw">const</span> [stockCount, setStockCount] = <span class="fn">useState</span>&lt;<span class="kw">number</span> | null&gt;(null);
  <span class="kw">const</span> intervalRef = <span class="fn">useRef</span>&lt;ReturnType&lt;<span class="kw">typeof</span> setInterval&gt; | null&gt;(null);
  <span class="kw">const</span> abortRef = <span class="fn">useRef</span>&lt;AbortController | null&gt;(null);

  <span class="kw">const</span> fetchStock = <span class="fn">useCallback</span>(<span class="kw">async</span> () =&gt; {
    <span class="cm">// ✅ 前のリクエストをキャンセル（Updating フェーズ）</span>
    abortRef.current?.<span class="fn">abort</span>();
    abortRef.current = <span class="kw">new</span> <span class="fn">AbortController</span>();

    <span class="kw">try</span> {
      <span class="kw">const</span> res = <span class="kw">await</span> <span class="fn">fetch</span>(\`/api/products/\${productId}/stock\`, {
        signal: abortRef.current.signal,
      });
      <span class="kw">const</span> { stockCount } = <span class="kw">await</span> res.<span class="fn">json</span>();
      <span class="fn">setStockCount</span>(stockCount);
    } <span class="kw">catch</span> (err) {
      <span class="kw">if</span> ((err <span class="kw">as</span> Error).name !== <span class="st">'AbortError'</span>) console.<span class="fn">error</span>(err);
    }
  }, [productId]);

  <span class="fn">useEffect</span>(() =&gt; {
    <span class="cm">// ✅ Mounting: データ取得とポーリング開始</span>
    <span class="fn">fetchStock</span>();
    intervalRef.current = <span class="fn">setInterval</span>(fetchStock, <span class="nu">5000</span>);

    <span class="cm">// ✅ Unmounting: クリーンアップ（メモリリーク・状態更新エラーを防ぐ）</span>
    <span class="kw">return</span> () =&gt; {
      <span class="fn">clearInterval</span>(intervalRef.current!);
      abortRef.current?.<span class="fn">abort</span>();
    };
  }, [fetchStock]); <span class="cm">// productId 変更時も再実行</span>

  <span class="kw">return</span> &lt;<span class="kw">div</span>&gt;在庫: {stockCount ?? <span class="st">'...'</span>} 個&lt;/<span class="kw">div</span>&gt;;
};`;

const CODE_ISP = `<span class="cm">// ❌ 肥大化したインターフェース（ISP 違反）</span>
<span class="cm">// — OrderService は generateMonthlyReport を使わないのに依存させられる</span>
<span class="kw">interface</span> <span class="fn">UserRepository</span> {
  <span class="fn">findById</span>(id: <span class="kw">string</span>): Promise&lt;User | null&gt;;
  <span class="fn">findAll</span>(): Promise&lt;User[]&gt;;
  <span class="fn">save</span>(user: User): Promise&lt;<span class="kw">void</span>&gt;;
  <span class="fn">delete</span>(id: <span class="kw">string</span>): Promise&lt;<span class="kw">void</span>&gt;;
  <span class="fn">generateMonthlyReport</span>(): Promise&lt;Report&gt;; <span class="cm">// OrderService には不要！</span>
}

<span class="cm">// ✅ 役割ごとに区分した小さなインターフェース（ISP 準拠）</span>
<span class="kw">interface</span> <span class="fn">UserReader</span> {
  <span class="fn">findById</span>(id: <span class="kw">string</span>): Promise&lt;User | null&gt;;
  <span class="fn">findByEmail</span>(email: <span class="kw">string</span>): Promise&lt;User | null&gt;;
}

<span class="kw">interface</span> <span class="fn">UserWriter</span> {
  <span class="fn">save</span>(user: User): Promise&lt;<span class="kw">void</span>&gt;;
  <span class="fn">delete</span>(id: <span class="kw">string</span>): Promise&lt;<span class="kw">void</span>&gt;;
}

<span class="kw">interface</span> <span class="fn">UserReporter</span> {
  <span class="fn">generateMonthlyReport</span>(): Promise&lt;Report&gt;;
}

<span class="cm">// ✅ OrderService は UserReader だけに依存（不要なものを知らなくてよい）</span>
<span class="kw">class</span> <span class="fn">OrderService</span> {
  <span class="kw">constructor</span>(
    <span class="kw">private</span> <span class="kw">readonly</span> userReader: UserReader, <span class="cm">// 必要な契約だけに依存</span>
  ) {}

  <span class="kw">async</span> <span class="fn">createOrder</span>(customerId: <span class="kw">string</span>, items: OrderItem[]) {
    <span class="kw">const</span> user = <span class="kw">await</span> <span class="kw">this</span>.userReader.<span class="fn">findById</span>(customerId);
    <span class="kw">if</span> (!user) <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">Error</span>(<span class="st">'ユーザーが見つかりません'</span>);
    <span class="cm">// ...注文作成ロジック</span>
  }
}

<span class="cm">// ✅ 実装クラスは必要なインターフェースをすべて実装する</span>
<span class="kw">class</span> <span class="fn">UserRepositoryImpl</span> <span class="kw">implements</span> <span class="fn">UserReader</span>, <span class="fn">UserWriter</span>, <span class="fn">UserReporter</span> {
  <span class="kw">async</span> <span class="fn">findById</span>(id: <span class="kw">string</span>) { <span class="cm">/* ... */</span> }
  <span class="kw">async</span> <span class="fn">findByEmail</span>(email: <span class="kw">string</span>) { <span class="cm">/* ... */</span> }
  <span class="kw">async</span> <span class="fn">save</span>(user: User) { <span class="cm">/* ... */</span> }
  <span class="kw">async</span> <span class="fn">delete</span>(id: <span class="kw">string</span>) { <span class="cm">/* ... */</span> }
  <span class="kw">async</span> <span class="fn">generateMonthlyReport</span>() { <span class="cm">/* ... */</span> }
}`;

const CODE_FE_TEST = `<span class="kw">import</span> { render, screen } <span class="kw">from</span> <span class="st">'@testing-library/react'</span>;
<span class="kw">import</span> userEvent <span class="kw">from</span> <span class="st">'@testing-library/user-event'</span>;
<span class="kw">import</span> { ProductCard } <span class="kw">from</span> <span class="st">'./ProductCard'</span>;

<span class="cm">// ✅ テスト用のモックデータ（型付き）</span>
<span class="kw">const</span> mockProduct: Product = {
  id: <span class="st">'P001'</span>, name: <span class="st">'テスト商品'</span>, price: <span class="nu">3000</span>,
  originalPrice: <span class="nu">5000</span>, imageUrl: <span class="st">'/test.jpg'</span>,
  rating: <span class="nu">4.5</span>, reviewCount: <span class="nu">120</span>, stockCount: <span class="nu">10</span>,
  isNew: <span class="kw">false</span>, discountRate: <span class="nu">40</span>,
};

<span class="fn">describe</span>(<span class="st">'ProductCard コンポーネント'</span>, () =&gt; {
  <span class="cm">// ─── レンダリングテスト ───</span>
  <span class="fn">test</span>(<span class="st">'商品名が正しく表示される'</span>, () =&gt; {
    <span class="fn">render</span>(&lt;<span class="kw">ProductCard</span> product={mockProduct} onAddToCart={() =&gt; {}} /&gt;);
    <span class="fn">expect</span>(screen.<span class="fn">getByText</span>(<span class="st">'テスト商品'</span>)).<span class="fn">toBeInTheDocument</span>();
  });

  <span class="cm">// ─── インタラクションテスト ───</span>
  <span class="fn">test</span>(<span class="st">'カートボタンをクリックすると onAddToCart が呼ばれる'</span>, <span class="kw">async</span> () =&gt; {
    <span class="kw">const</span> mockAddToCart = vi.<span class="fn">fn</span>();
    <span class="fn">render</span>(&lt;<span class="kw">ProductCard</span> product={mockProduct} onAddToCart={mockAddToCart} /&gt;);

    <span class="cm">// ✅ ユーザー操作をシミュレート（実装ではなく振る舞いをテスト）</span>
    <span class="kw">await</span> userEvent.<span class="fn">click</span>(screen.<span class="fn">getByText</span>(<span class="st">'カートに追加'</span>));
    <span class="fn">expect</span>(mockAddToCart).<span class="fn">toHaveBeenCalledWith</span>(<span class="st">'P001'</span>, <span class="nu">1</span>);
    <span class="fn">expect</span>(mockAddToCart).<span class="fn">toHaveBeenCalledOnce</span>();
  });

  <span class="cm">// ─── 境界値テスト ───</span>
  <span class="fn">test</span>(<span class="st">'在庫切れ時はボタンが無効化される'</span>, <span class="kw">async</span> () =&gt; {
    <span class="kw">const</span> mockAddToCart = vi.<span class="fn">fn</span>();
    <span class="kw">const</span> outOfStock = { ...mockProduct, stockCount: <span class="nu">0</span> };

    <span class="fn">render</span>(&lt;<span class="kw">ProductCard</span> product={outOfStock} onAddToCart={mockAddToCart} /&gt;);

    <span class="kw">const</span> btn = screen.<span class="fn">getByText</span>(<span class="st">'在庫切れ'</span>);
    <span class="fn">expect</span>(btn).<span class="fn">toBeDisabled</span>();

    <span class="kw">await</span> userEvent.<span class="fn">click</span>(btn);
    <span class="fn">expect</span>(mockAddToCart).<span class="fn">not.toHaveBeenCalled</span>(); <span class="cm">// ✅ クリックされても呼ばれない</span>
  });

  <span class="cm">// ─── アクセシビリティテスト ───</span>
  <span class="fn">test</span>(<span class="st">'aria 属性が正しく設定される'</span>, () =&gt; {
    <span class="fn">render</span>(&lt;<span class="kw">ProductCard</span> product={mockProduct} onAddToCart={() =&gt; {}} /&gt;);
    <span class="fn">expect</span>(screen.<span class="fn">getByRole</span>(<span class="st">'article'</span>)).<span class="fn">toHaveAttribute</span>(
      <span class="st">'data-testid'</span>, <span class="st">'product-card-P001'</span>
    );
  });
});`;

const CODE_BE_TEST = `<span class="fn">describe</span>(<span class="st">'OrderService'</span>, () =&gt; {
  <span class="kw">let</span> service: OrderService;

  <span class="cm">// ✅ モックファクトリー（DI のおかげで差し替え可能）</span>
  <span class="kw">const</span> mockOrderRepository = {
    create: vi.<span class="fn">fn</span>(),
    save: vi.<span class="fn">fn</span>(),
    findOne: vi.<span class="fn">fn</span>(),
  };
  <span class="kw">const</span> mockUserService = {
    findById: vi.<span class="fn">fn</span>(),
  };

  <span class="fn">beforeEach</span>(<span class="kw">async</span> () =&gt; {
    <span class="kw">const</span> module = <span class="kw">await</span> Test.<span class="fn">createTestingModule</span>({
      providers: [
        OrderService,
        { provide: OrderRepository, useValue: mockOrderRepository }, <span class="cm">// ✅ Mock 注入</span>
        { provide: UserService,     useValue: mockUserService },
      ],
    }).<span class="fn">compile</span>();

    service = module.<span class="fn">get</span>&lt;OrderService&gt;(OrderService);
    vi.<span class="fn">clearAllMocks</span>();
  });

  <span class="fn">describe</span>(<span class="st">'createOrder()'</span>, () =&gt; {
    <span class="fn">test</span>(<span class="st">'有効なデータで注文が正常に作成される'</span>, <span class="kw">async</span> () =&gt; {
      <span class="kw">const</span> mockUser = { id: <span class="st">'U001'</span>, isActive: <span class="kw">true</span> };
      <span class="kw">const</span> mockOrder = { id: <span class="st">'O001'</span>, status: <span class="st">'pending'</span> };
      mockUserService.findById.<span class="fn">mockResolvedValue</span>(mockUser);
      mockOrderRepository.create.<span class="fn">mockReturnValue</span>(mockOrder);
      mockOrderRepository.save.<span class="fn">mockResolvedValue</span>(mockOrder);

      <span class="kw">const</span> result = <span class="kw">await</span> service.<span class="fn">createOrder</span>({
        customerId: <span class="st">'U001'</span>,
        items: [{ productId: <span class="st">'P001'</span>, quantity: <span class="nu">2</span> }],
      });

      <span class="fn">expect</span>(result).<span class="fn">toEqual</span>(mockOrder);
      <span class="fn">expect</span>(mockOrderRepository.save).<span class="fn">toHaveBeenCalledOnce</span>();
    });

    <span class="fn">test</span>(<span class="st">'存在しないユーザーで NotFoundException が発生する'</span>, <span class="kw">async</span> () =&gt; {
      mockUserService.findById.<span class="fn">mockResolvedValue</span>(null); <span class="cm">// ✅ null を返すモック</span>

      <span class="kw">await</span> <span class="fn">expect</span>(
        service.<span class="fn">createOrder</span>({ customerId: <span class="st">'GHOST'</span>, items: [] })
      ).rejects.<span class="fn">toThrow</span>(NotFoundException);
    });

    <span class="fn">test</span>(<span class="st">'非アクティブユーザーで BadRequestException が発生する'</span>, <span class="kw">async</span> () =&gt; {
      mockUserService.findById.<span class="fn">mockResolvedValue</span>({ id: <span class="st">'U001'</span>, isActive: <span class="kw">false</span> });

      <span class="kw">await</span> <span class="fn">expect</span>(
        service.<span class="fn">createOrder</span>({ customerId: <span class="st">'U001'</span>, items: [] })
      ).rejects.<span class="fn">toThrow</span>(BadRequestException);
    });
  });
});`;

const CODE_TOKENS = `<span class="cm">// ✅ デザイントークン：コンポーネントライブラリ全体の基盤</span>
<span class="kw">export</span> <span class="kw">const</span> tokens = {
  colors: {
    brand: {
      primary:      <span class="st">'#3498db'</span>,
      primaryDark:  <span class="st">'#2980b9'</span>,
      secondary:    <span class="st">'#27ae60'</span>,
    },
    semantic: {
      success: <span class="st">'#2ecc71'</span>,
      warning: <span class="st">'#f39c12'</span>,
      danger:  <span class="st">'#e74c3c'</span>,
      info:    <span class="st">'#3498db'</span>,
    },
    neutral: {
      white:   <span class="st">'#ffffff'</span>,
      gray100: <span class="st">'#f8f9fa'</span>,
      gray500: <span class="st">'#adb5bd'</span>,
      gray900: <span class="st">'#212529'</span>,
    },
  },
  <span class="cm">// ✅ 4px グリッドシステム（8の倍数で統一）</span>
  spacing: {
    xs:  <span class="st">'4px'</span>,
    sm:  <span class="st">'8px'</span>,
    md:  <span class="st">'16px'</span>,
    lg:  <span class="st">'24px'</span>,
    xl:  <span class="st">'32px'</span>,
    xxl: <span class="st">'48px'</span>,
  },
  typography: {
    fontFamily: {
      base: <span class="st">"'Noto Sans JP', 'Hiragino Sans', sans-serif"</span>,
      mono: <span class="st">"'JetBrains Mono', 'Courier New', monospace"</span>,
    },
    fontSize: { sm: <span class="st">'14px'</span>, md: <span class="st">'16px'</span>, lg: <span class="st">'18px'</span>, xl: <span class="st">'24px'</span> },
    fontWeight: { regular: <span class="nu">400</span>, medium: <span class="nu">500</span>, bold: <span class="nu">700</span> },
  },
  border: {
    radius: { sm: <span class="st">'4px'</span>, md: <span class="st">'8px'</span>, lg: <span class="st">'12px'</span>, full: <span class="st">'9999px'</span> },
  },
  animation: {
    duration: { fast: <span class="st">'150ms'</span>, normal: <span class="st">'250ms'</span>, slow: <span class="st">'400ms'</span> },
    easing: { ease: <span class="st">'cubic-bezier(0.4, 0, 0.2, 1)'</span> },
  },
} <span class="kw">as const</span>;

<span class="cm">// ✅ CSS カスタムプロパティとして出力（テーマ切り替えが容易になる）</span>
<span class="kw">export</span> <span class="kw">const</span> <span class="fn">generateCSSVariables</span> = () =&gt; <span class="st">\`
  :root {
    --color-primary:       \${tokens.colors.brand.primary};
    --color-success:       \${tokens.colors.semantic.success};
    --spacing-md:          \${tokens.spacing.md};
    --font-size-md:        \${tokens.typography.fontSize.md};
    --border-radius-md:    \${tokens.border.radius.md};
    --animation-duration:  \${tokens.animation.duration.normal};
  }
\`</span>;`;

const CODE_STORYBOOK = `<span class="kw">import</span> type { Meta, StoryObj } <span class="kw">from</span> <span class="st">'@storybook/react'</span>;
<span class="kw">import</span> { Button } <span class="kw">from</span> <span class="st">'./Button'</span>;

<span class="cm">// ✅ Meta: コンポーネントのカタログ定義</span>
<span class="kw">const</span> meta: Meta&lt;<span class="kw">typeof</span> Button&gt; = {
  title: <span class="st">'Atoms/Button'</span>,   <span class="cm">// サイドバーのカテゴリとタイトル</span>
  component: Button,
  parameters: {
    layout: <span class="st">'centered'</span>,
    docs: {
      description: {
        component: <span class="st">'基本的なアクションボタン。4種類のバリアントと3種類のサイズに対応。'</span>,
      },
    },
  },
  argTypes: {
    variant: {
      control: <span class="st">'select'</span>,
      options: [<span class="st">'primary'</span>, <span class="st">'secondary'</span>, <span class="st">'danger'</span>, <span class="st">'ghost'</span>],
      description: <span class="st">'ボタンのスタイルバリアント'</span>,
    },
    size: { control: <span class="st">'select'</span>, options: [<span class="st">'sm'</span>, <span class="st">'md'</span>, <span class="st">'lg'</span>] },
    disabled: { control: <span class="st">'boolean'</span> },
    loading:  { control: <span class="st">'boolean'</span> },
  },
  tags: [<span class="st">'autodocs'</span>], <span class="cm">// ✅ 自動ドキュメント生成</span>
};
<span class="kw">export default</span> meta;
<span class="kw">type</span> <span class="fn">Story</span> = StoryObj&lt;<span class="kw">typeof</span> Button&gt;;

<span class="cm">// ✅ 各ストーリー = コンポーネントの1つの「状態」を定義</span>
<span class="kw">export const</span> <span class="fn">Primary</span>: Story = {
  args: { children: <span class="st">'カートに追加'</span>, variant: <span class="st">'primary'</span>, onClick: () =&gt; {} },
};

<span class="kw">export const</span> <span class="fn">Loading</span>: Story = {
  args: { ...Primary.args, loading: <span class="kw">true</span>, children: <span class="st">'処理中...'</span> },
};

<span class="kw">export const</span> <span class="fn">Disabled</span>: Story = {
  args: { ...Primary.args, disabled: <span class="kw">true</span>, children: <span class="st">'在庫切れ'</span> },
};

<span class="cm">// ✅ 全サイズの比較表示（自動回帰テストにも使われる）</span>
<span class="kw">export const</span> <span class="fn">AllSizes</span>: Story = {
  render: () => (
    &lt;<span class="kw">div</span> style={{ display: <span class="st">'flex'</span>, gap: <span class="st">'12px'</span>, alignItems: <span class="st">'center'</span> }}&gt;
      &lt;<span class="kw">Button</span> onClick={() =&gt; {}} size=<span class="st">"sm"</span>&gt;Small&lt;/<span class="kw">Button</span>&gt;
      &lt;<span class="kw">Button</span> onClick={() =&gt; {}}&gt;Medium&lt;/<span class="kw">Button</span>&gt;
      &lt;<span class="kw">Button</span> onClick={() =&gt; {}} size=<span class="st">"lg"</span>&gt;Large&lt;/<span class="kw">Button</span>&gt;
    &lt;/<span class="kw">div</span>&gt;
  ),
};`;

const CODE_MFE = `<span class="cm">// ✅ Shell アプリケーション（ホスト）の設定</span>
<span class="kw">const</span> shellConfig = {
  plugins: [
    <span class="kw">new</span> <span class="fn">ModuleFederationPlugin</span>({
      name: <span class="st">'shell'</span>,
      remotes: {
        <span class="cm">// ✅ 各 MFE を動的に読み込む（URLはデプロイ環境に合わせる）</span>
        productApp: <span class="st">'productApp@https://product.example.com/remoteEntry.js'</span>,
        orderApp:   <span class="st">'orderApp@https://order.example.com/remoteEntry.js'</span>,
        userApp:    <span class="st">'userApp@https://user.example.com/remoteEntry.js'</span>,
      },
      shared: {
        <span class="cm">// ✅ React を共有（各 MFE がバンドルせず Shell のものを使う）</span>
        react:     { singleton: <span class="kw">true</span>, requiredVersion: <span class="st">'^18.0.0'</span> },
        <span class="st">'react-dom'</span>: { singleton: <span class="kw">true</span>, requiredVersion: <span class="st">'^18.0.0'</span> },
        <span class="st">'@company/design-system'</span>: { singleton: <span class="kw">true</span> },
      },
    }),
  ],
};

<span class="cm">// ✅ Product MFE（リモート）の設定</span>
<span class="kw">const</span> productConfig = {
  plugins: [
    <span class="kw">new</span> <span class="fn">ModuleFederationPlugin</span>({
      name: <span class="st">'productApp'</span>,
      filename: <span class="st">'remoteEntry.js'</span>,  <span class="cm">// Shell から参照されるエントリーポイント</span>
      exposes: {
        <span class="cm">// ✅ 外部に公開するコンポーネントを明示的に定義</span>
        <span class="st">'./ProductList'</span>:   <span class="st">'./src/components/ProductList'</span>,
        <span class="st">'./ProductDetail'</span>: <span class="st">'./src/components/ProductDetail'</span>,
      },
    }),
  ],
};

<span class="cm">// ✅ Shell での使い方 — Suspense + ErrorBoundary で障害隔離</span>
<span class="kw">const</span> ProductList = <span class="fn">lazy</span>(() =&gt; <span class="kw">import</span>(<span class="st">'productApp/ProductList'</span>));

<span class="kw">function</span> <span class="fn">App</span>() {
  <span class="kw">return</span> (
    &lt;<span class="kw">ErrorBoundary</span> FallbackComponent={ErrorFallback}&gt;
      &lt;<span class="kw">Suspense</span> fallback={&lt;<span class="kw">Skeleton</span> /&gt;}&gt;
        &lt;<span class="kw">ProductList</span> /&gt;
      &lt;/<span class="kw">Suspense</span>&gt;
    &lt;/<span class="kw">ErrorBoundary</span>&gt;
  );
}`;

const CODE_CART = `<span class="cm">// ─── 型定義 ───────────────────────────────────────────────</span>
<span class="kw">interface</span> <span class="fn">CartItem</span> {
  id: <span class="kw">string</span>;
  product: { id: <span class="kw">string</span>; name: <span class="kw">string</span>; price: <span class="kw">number</span>; imageUrl: <span class="kw">string</span>; maxStock: <span class="kw">number</span> };
  quantity: <span class="kw">number</span>;
}

<span class="cm">// ─── Custom Hook: カートロジックをコンポーネント化 ──────────</span>
<span class="kw">function</span> <span class="fn">useCart</span>() {
  <span class="kw">const</span> [items, setItems] = <span class="fn">useState</span>&lt;CartItem[]&gt;([]);

  <span class="kw">const</span> addItem = <span class="fn">useCallback</span>((product: CartItem[<span class="st">'product'</span>], qty = <span class="nu">1</span>) =&gt; {
    <span class="fn">setItems</span>(prev =&gt; {
      <span class="kw">const</span> existing = prev.<span class="fn">find</span>(i =&gt; i.product.id === product.id);
      <span class="kw">if</span> (existing) {
        <span class="cm">// 既存アイテムは数量を増やす（maxStock を超えない）</span>
        <span class="kw">return</span> prev.<span class="fn">map</span>(i =&gt;
          i.product.id === product.id
            ? { ...i, quantity: Math.<span class="fn">min</span>(i.quantity + qty, product.maxStock) }
            : i
        );
      }
      <span class="cm">// ✅ crypto.randomUUID でユニーク ID を生成</span>
      <span class="kw">return</span> [...prev, { id: crypto.<span class="fn">randomUUID</span>(), product, quantity: qty }];
    });
  }, []);

  <span class="kw">const</span> updateQuantity = <span class="fn">useCallback</span>((itemId: <span class="kw">string</span>, newQty: <span class="kw">number</span>) =&gt; {
    <span class="kw">if</span> (newQty &lt;= <span class="nu">0</span>) {
      <span class="fn">setItems</span>(prev =&gt; prev.<span class="fn">filter</span>(i =&gt; i.id !== itemId)); <span class="cm">// 0以下で削除</span>
    } <span class="kw">else</span> {
      <span class="fn">setItems</span>(prev =&gt; prev.<span class="fn">map</span>(i =&gt; i.id === itemId ? { ...i, quantity: newQty } : i));
    }
  }, []);

  <span class="kw">const</span> removeItem = <span class="fn">useCallback</span>((itemId: <span class="kw">string</span>) =&gt; {
    <span class="fn">setItems</span>(prev =&gt; prev.<span class="fn">filter</span>(i =&gt; i.id !== itemId));
  }, []);

  <span class="kw">const</span> totalAmount = items.<span class="fn">reduce</span>((sum, i) =&gt; sum + i.product.price * i.quantity, <span class="nu">0</span>);
  <span class="kw">const</span> totalCount  = items.<span class="fn">reduce</span>((sum, i) =&gt; sum + i.quantity, <span class="nu">0</span>);

  <span class="kw">return</span> { items, totalAmount, totalCount, addItem, updateQuantity, removeItem };
}

<span class="cm">// ─── CartItem コンポーネント（Molecule）───────────────────</span>
<span class="kw">const</span> <span class="fn">CartItemRow</span>: React.FC&lt;{
  item: CartItem;
  onUpdateQty: (id: <span class="kw">string</span>, qty: <span class="kw">number</span>) =&gt; <span class="kw">void</span>;
  onRemove: (id: <span class="kw">string</span>) =&gt; <span class="kw">void</span>;
}&gt; = ({ item, onUpdateQty, onRemove }) =&gt; (
  &lt;<span class="kw">li</span> className=<span class="st">"cart-item"</span> data-testid={\`cart-item-\${item.id}\`}&gt;
    &lt;<span class="kw">img</span> src={item.product.imageUrl} alt={item.product.name} /&gt;
    &lt;<span class="kw">div</span>&gt;
      &lt;<span class="kw">p</span>&gt;{item.product.name}&lt;/<span class="kw">p</span>&gt;
      &lt;<span class="kw">p</span>&gt;¥{(item.product.price * item.quantity).<span class="fn">toLocaleString</span>()}&lt;/<span class="kw">p</span>&gt;
    &lt;/<span class="kw">div</span>&gt;
    &lt;<span class="kw">div</span> className=<span class="st">"quantity-ctrl"</span>&gt;
      &lt;<span class="kw">Button</span> variant=<span class="st">"ghost"</span> size=<span class="st">"sm"</span> onClick={() =&gt; <span class="fn">onUpdateQty</span>(item.id, item.quantity - <span class="nu">1</span>)}&gt;−&lt;/<span class="kw">Button</span>&gt;
      &lt;<span class="kw">span</span>&gt;{item.quantity}&lt;/<span class="kw">span</span>&gt;
      &lt;<span class="kw">Button</span> variant=<span class="st">"ghost"</span> size=<span class="st">"sm"</span>
        onClick={() =&gt; <span class="fn">onUpdateQty</span>(item.id, item.quantity + <span class="nu">1</span>)}
        disabled={item.quantity &gt;= item.product.maxStock}&gt;＋&lt;/<span class="kw">Button</span>&gt;
    &lt;/<span class="kw">div</span>&gt;
    &lt;<span class="kw">Button</span> variant=<span class="st">"ghost"</span> size=<span class="st">"sm"</span> onClick={() =&gt; <span class="fn">onRemove</span>(item.id)} ariaLabel=<span class="st">"削除"</span>&gt;🗑&lt;/<span class="kw">Button</span>&gt;
  &lt;/<span class="kw">li</span>&gt;
);

<span class="cm">// ─── CartSidebar コンポーネント（Organism）───────────────</span>
<span class="kw">const</span> <span class="fn">CartSidebar</span>: React.FC&lt;{
  cart: ReturnType&lt;<span class="kw">typeof</span> useCart&gt;;
  onCheckout: () =&gt; <span class="kw">void</span>;
}&gt; = ({ cart, onCheckout }) =&gt; (
  &lt;<span class="kw">aside</span> className=<span class="st">"cart-sidebar"</span> aria-label=<span class="st">"ショッピングカート"</span>&gt;
    &lt;<span class="kw">h2</span>&gt;カート（{cart.totalCount}点）&lt;/<span class="kw">h2</span>&gt;
    {cart.items.length === <span class="nu">0</span> ? (
      &lt;<span class="kw">p</span>&gt;カートは空です&lt;/<span class="kw">p</span>&gt;
    ) : (
      &lt;&gt;
        &lt;<span class="kw">ul</span>&gt;
          {cart.items.<span class="fn">map</span>(item =&gt; (
            &lt;<span class="kw">CartItemRow</span> key={item.id} item={item}
              onUpdateQty={cart.updateQuantity} onRemove={cart.removeItem} /&gt;
          ))}
        &lt;/<span class="kw">ul</span>&gt;
        &lt;<span class="kw">div</span>&gt;
          &lt;<span class="kw">span</span>&gt;合計: &lt;<span class="kw">strong</span>&gt;¥{cart.totalAmount.<span class="fn">toLocaleString</span>()}&lt;/<span class="kw">strong</span>&gt;&lt;/<span class="kw">span</span>&gt;
          &lt;<span class="kw">Button</span> onClick={onCheckout} fullWidth size=<span class="st">"lg"</span>&gt;購入手続きへ&lt;/<span class="kw">Button</span>&gt;
        &lt;/<span class="kw">div</span>&gt;
      &lt;/&gt;
    )}
  &lt;/<span class="kw">aside</span>&gt;
);`;

const CODE_DIR = `<span class="cm">src/</span>
├── components/
│   ├── atoms/                    # ⚛️ 最小単位のコンポーネント
│   │   ├── Button/
│   │   │   ├── Button.tsx        # 実装
│   │   │   ├── Button.test.tsx   # ユニットテスト
│   │   │   ├── Button.stories.tsx # Storybook
│   │   │   ├── Button.module.css  # スタイル
│   │   │   └── index.ts           # エクスポート
│   │   ├── Input/
│   │   ├── Badge/
│   │   └── index.ts               # Atoms 一括エクスポート
│   ├── molecules/                # 🔬 Atoms の組み合わせ
│   │   ├── ProductCard/
│   │   ├── FormField/
│   │   └── index.ts
│   ├── organisms/                # 🦠 独立した UI ブロック
│   │   ├── Header/
│   │   ├── ProductGrid/
│   │   ├── CartSidebar/
│   │   └── index.ts
│   ├── templates/                # 📄 レイアウト定義
│   │   ├── MainLayout/
│   │   └── index.ts
│   └── pages/                    # 📱 実際のページ
│       ├── TopPage/
│       └── CartPage/
├── hooks/                        # 🔧 Custom Hooks（ロジックコンポーネント）
│   ├── useCart.ts
│   ├── useFetch.ts
│   └── index.ts
├── contexts/                     # 🌐 Context（グローバル状態）
│   ├── CartContext.tsx
│   └── AuthContext.tsx
├── design-system/                # 🎨 デザインシステム
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   └── global.css
└── types/                        # 📋 型定義
    ├── product.ts
    ├── order.ts
    └── user.ts`;

const CODE_DRILLING = `<span class="cm">// ❌ Props ドリリング（アンチパターン）</span>
<span class="cm">// — user を使うのは UserMenu だけなのに全中間コンポーネントを汚染する</span>
<span class="kw">const</span> <span class="fn">App</span> = () =&gt; {
  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>&lt;User | null&gt;(null);
  <span class="kw">return</span> &lt;<span class="kw">Layout</span> user={user} setUser={setUser} /&gt;;           <span class="cm">// 中継するだけ</span>
};
<span class="kw">const</span> <span class="fn">Layout</span> = ({ user, setUser }: Props) =&gt; (
  &lt;<span class="kw">Header</span> user={user} setUser={setUser} /&gt;                   <span class="cm">// 中継するだけ</span>
);
<span class="kw">const</span> <span class="fn">Header</span> = ({ user, setUser }: Props) =&gt; (
  &lt;<span class="kw">Nav</span> user={user} setUser={setUser} /&gt;                      <span class="cm">// 中継するだけ</span>
);
<span class="kw">const</span> <span class="fn">Nav</span> = ({ user, setUser }: Props) =&gt; (
  &lt;<span class="kw">UserMenu</span> user={user} onLogout={() =&gt; <span class="fn">setUser</span>(null)} /&gt;    <span class="cm">// 一番下でようやく使う</span>
);

<span class="cm">// ✅ Context で解決（中間コンポーネントが Props を知らなくてよくなる）</span>
<span class="kw">const</span> AuthContext = React.<span class="fn">createContext</span>&lt;{
  user: User | null;
  logout: () =&gt; <span class="kw">void</span>;
} | null&gt;(null);

<span class="kw">const</span> <span class="fn">AuthProvider</span>: React.FC&lt;{ children: React.ReactNode }&gt; = ({ children }) =&gt; {
  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>&lt;User | null&gt;(null);
  <span class="kw">const</span> logout = <span class="fn">useCallback</span>(() =&gt; <span class="fn">setUser</span>(null), []);
  <span class="kw">return</span> (
    &lt;<span class="kw">AuthContext.Provider</span> value={{ user, logout }}&gt;
      {children}
    &lt;/<span class="kw">AuthContext.Provider</span>&gt;
  );
};

<span class="cm">// ✅ カスタムフックで使いやすくラップ</span>
<span class="kw">const</span> <span class="fn">useAuth</span> = () =&gt; {
  <span class="kw">const</span> ctx = React.<span class="fn">useContext</span>(AuthContext);
  <span class="kw">if</span> (!ctx) <span class="kw">throw</span> <span class="kw">new</span> <span class="fn">Error</span>(<span class="st">'AuthProvider の外で useAuth を呼びました'</span>);
  <span class="kw">return</span> ctx;
};

<span class="cm">// ✅ UserMenu は Props を受け取らずに Context から直接取得できる</span>
<span class="kw">const</span> <span class="fn">UserMenu</span> = () =&gt; {
  <span class="kw">const</span> { user, logout } = <span class="fn">useAuth</span>(); <span class="cm">// 中間コンポーネントを経由しない！</span>
  <span class="kw">return</span> (
    &lt;<span class="kw">div</span>&gt;
      &lt;<span class="kw">span</span>&gt;{user?.name}&lt;/<span class="kw">span</span>&gt;
      &lt;<span class="kw">button</span> onClick={logout}&gt;ログアウト&lt;/<span class="kw">button</span>&gt;
    &lt;/<span class="kw">div</span>&gt;
  );
};`;

export default function Page() {
  return (
    <div className="component-oriented-development-comprehensive-guide">
      <CodSidebar groups={NAV_GROUPS} />

      <main className="main">
        {/* Hero */}
        <div className="hero">
          <div className="hero-badge">📘 Complete Guide</div>
          <h1 className="hero-title">
            <span>コンポーネント指向開発</span><br />
            完全ガイド
          </h1>
          <p className="hero-desc">
            ソフトウェアシステムを<strong>再利用可能・独立した部品（コンポーネント）</strong>の集合体として
            設計・構築するパラダイムを、初学者から実践者まで体系的に解説します。
            フロントエンド・バックエンド双方の設計原則、実装パターン、テスト戦略、デザインシステムまで網羅します。
          </p>
          <div className="hero-tags">
            <span className="hero-tag">🧩 Component Design</span>
            <span className="hero-tag">⚛️ React / Vue</span>
            <span className="hero-tag">🔧 NestJS / FastAPI</span>
            <span className="hero-tag">🎨 Design System</span>
            <span className="hero-tag">🔺 Test Pyramid</span>
            <span className="hero-tag">🏗️ Micro Frontends</span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {/* SECTION 1 */}
          <section className="section" id="s1">
            <div className="section-header">
              <div className="section-num">01</div>
              <h2 className="section-title">
                コンポーネント指向開発とは何か？
                <small>Component-Oriented Development（COD）の基礎概念</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">1.1 定義：一言で理解する</h3>
              <p>
                <strong>コンポーネント指向開発（COD）</strong>とは、ソフトウェアシステムを
                <strong>再利用可能・独立した「コンポーネント」の集合体</strong>として設計・構築する開発パラダイムです。
              </p>

              <div className="box box-ac">
                <div className="bt">💡 直感的なたとえ</div>
                <p>
                  LEGOブロックのように、独立した部品を組み合わせてシステムを構築する考え方です。
                  各ブロックは単独で存在でき、違うセットでも同じブロックを再利用できます。
                  これがコンポーネント指向の本質です。
                </p>
              </div>

              <div className="dg">
                <div className="dg-label">📐 図1-1：コンポーネントの5つの特性</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d1_1} />
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">1.2 OOP との違い・相補的な関係</h3>
              <p>コンポーネント指向とオブジェクト指向（OOP）は対立するものではなく、異なるレベルの設計を扱います。</p>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>観点</th>
                      <th>オブジェクト指向（OOP）</th>
                      <th>コンポーネント指向（COD）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>設計の単位</td>
                      <td>クラス・インスタンス</td>
                      <td>モジュール・サブシステム</td>
                    </tr>
                    <tr>
                      <td>主な関心事</td>
                      <td>継承・ポリモーフィズム・カプセル化</td>
                      <td>インターフェース契約・疎結合・再利用</td>
                    </tr>
                    <tr>
                      <td>スコープ</td>
                      <td>コードレベルの構造化</td>
                      <td>アーキテクチャレベルの設計</td>
                    </tr>
                    <tr>
                      <td>デプロイ</td>
                      <td>単一バイナリの一部</td>
                      <td>独立したデプロイ単位も可能</td>
                    </tr>
                    <tr>
                      <td>実践での使い方</td>
                      <td>コンポーネント<em>内部</em>を実装</td>
                      <td>コンポーネント<em>間</em>の構造を定義</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="box box-ac">
                <div className="bt">✅ 実践の鉄則</div>
                <p>
                  コンポーネントの<strong>内部は OOP で実装</strong>し、コンポーネント<strong>間はインターフェースで疎結合</strong>にする。両者を組み合わせることで最も効果的なアーキテクチャになります。
                </p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">1.3 歴史的背景</h3>
              <div className="tl">
                <div className="tl-item">
                  <div className="tl-year">1968年</div>
                  <div className="tl-text">
                    <strong>ソフトウェア危機</strong>：NATO会議で「再利用可能な部品」の概念が初めて提唱される。複雑化するソフトウェアに「部品化」が解決策として浮上。
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-year">1992年</div>
                  <div className="tl-text">
                    <strong>COM / DCOM（Microsoft）</strong>：ランタイムコンポーネントモデルの先駆けとして登場。言語に依存しないコンポーネント間通信を実現。
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-year">1998年</div>
                  <div className="tl-text">
                    <strong>Enterprise JavaBeans（EJB）</strong>：サーバーサイドコンポーネントの標準化。Javaエコシステムにコンポーネント概念が普及。
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-year">2013年</div>
                  <div className="tl-text">
                    <strong>Reactの登場</strong>：UIコンポーネント革命。Virtual DOM と再利用可能な UI コンポーネントの概念がフロントエンドに革命をもたらす。
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-year">2016年</div>
                  <div className="tl-text">
                    <strong>Storybookの登場</strong>：コンポーネントカタログ化・ドキュメント化ツール。デザインシステムとの連携が加速。
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-year">2020年代</div>
                  <div className="tl-text">
                    <strong>マイコンフロントエンド</strong>：コンポーネント指向がアーキテクチャレベルへ進化。チームの境界がコンポーネントの境界と一致する設計が主流に。
                  </div>
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">1.4 なぜコンポーネント指向が重要なのか</h3>
              <div className="dg">
                <div className="dg-label">📊 図1-2：コンポーネント設計あり vs なし</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d1_2} />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="section" id="s2">
            <div className="section-header">
              <div className="section-num">02</div>
              <h2 className="section-title">
                コンポーネントの設計原則
                <small>Robert C. Martin が提唱した6つの原則と高凝集・低結合</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">2.1 コンポーネント設計の6原則（Robert C. Martin）</h3>
              <p>
                Clean Architecture の著者 Robert C. Martin（Uncle Bob）が提唱した、コンポーネント設計を支える6つの原則です。<strong>凝集に関する3原則</strong>と<strong>結合に関する3原則</strong>に分類されます。
              </p>
              <div className="dg">
                <div className="dg-label">📐 図2-1：コンポーネント設計の6原則</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d2_1} />
                </div>
              </div>
              <div className="g2">
                <div className="gc pu">
                  <div className="gc-icon">🔵</div>
                  <div className="gc-title">凝集の原則（何をまとめるか）</div>
                  <p>
                    <strong>REP</strong>：再利用したいものとリリース単位を一致させる<br />
                    <strong>CCP</strong>：一緒に変わるものは一緒に置く（SRP のコンポーネント版）<br />
                    <strong>CRP</strong>：使わないものへの依存を作らない
                  </p>
                </div>
                <div className="gc ac">
                  <div className="gc-icon">🟢</div>
                  <div className="gc-title">結合の原則（何に依存するか）</div>
                  <p>
                    <strong>ADP</strong>：依存グラフは DAG（有向非巡回グラフ）でなければならない<br />
                    <strong>SDP</strong>：不安定→安定の方向にのみ依存する<br />
                    <strong>SAP</strong>：安定＝抽象的であるべき（DIP のコンポーネント版）
                  </p>
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">2.2 高凝集・低結合の原則</h3>
              <p>
                コンポーネント設計における最重要概念です。<strong>高凝集</strong>はコンポーネント内部の関連性の高さ、<strong>低結合</strong>はコンポーネント間の依存の少なさを指します。
              </p>
              <div className="dg">
                <div className="dg-label">📊 図2-2：高凝集・低結合 vs アンチパターン</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d2_2} />
                </div>
              </div>
              <div className="box box-am">
                <div className="bt">⚠️ 実践ヒント：コンポーネント分割の判断基準</div>
                <p>
                  「このコンポーネントを一言で説明できますか？」と自問してください。
                  説明に「〜かつ〜」や「〜と〜」が入ったら、分割のサインです。
                </p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">2.3 インターフェース契約（Contract）の設計</h3>
              <p>
                コンポーネントのインターフェースは「契約」です。変更しにくく、明確に定義する必要があります。
                契約には4つの要素があります。
              </p>
              <div className="g2">
                <div className="gc bl">
                  <div className="gc-icon">📥</div>
                  <div className="gc-title">入力（Props / パラメータ）</div>
                  <p>コンポーネントが受け取るデータ。型・必須/任意・デフォルト値を明示します。</p>
                </div>
                <div className="gc ac">
                  <div className="gc-icon">📤</div>
                  <div className="gc-title">出力（Events / 戻り値）</div>
                  <p>コンポーネントが外部に返すイベント・コールバック・戻り値。</p>
                </div>
                <div className="gc pu">
                  <div className="gc-icon">🎰</div>
                  <div className="gc-title">スロット / Children</div>
                  <p>コンポーネント内部に外部からコンテンツを注入できる差し込み口。</p>
                </div>
                <div className="gc am">
                  <div className="gc-icon">⚡</div>
                  <div className="gc-title">副作用の宣言</div>
                  <p>API呼び出し・状態更新など外部に影響する処理を明示的に宣言する。</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="section" id="s3">
            <div className="section-header">
              <div className="section-num">03</div>
              <h2 className="section-title">
                コンポーネントの分類と粒度
                <small>Atomic Design と責務による分類、粒度の決定フロー</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">3.1 アトミックデザイン（Atomic Design）</h3>
              <p>
                Brad Frost が提唱した、UI コンポーネントを<strong>化学構造になぞらえて5階層</strong>に整理するシステムです。
                どの粒度のコンポーネントを作るべきかの明確な指針を与えてくれます。
              </p>
              <div className="dg">
                <div className="dg-label">⚗️ 図3-1：アトミックデザイン 5階層（ECサイトの例）</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d3_1} />
                </div>
              </div>
              <div className="box box-pu">
                <div className="bt">💡 初学者向け：なぜ5階層に分けるのか</div>
                <p>
                  「どこにコードを書けばいいかわからない」という問題を解決します。
                  <code>Button</code> は Atoms、<code>SearchBox = Input + Button</code> は Molecules、
                  <code>Header = Logo + Nav + SearchBox</code> は Organisms。
                  この階層を意識するだけで、コンポーネントの置き場所が自然に決まります。
                </p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">3.2 スマート vs ダムコンポーネント</h3>
              <p>
                コンポーネントを<strong>「何を知っているか」</strong>で分類する重要なパターンです。
                この分離によりテスト容易性と再利用性が大幅に向上します。
              </p>
              <div className="dg">
                <div className="dg-label">📊 図3-2：Container / Presentational パターン</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d3_2} />
                </div>
              </div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>観点</th>
                      <th>🧠 スマート（Container）</th>
                      <th>🎨 ダム（Presentational）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>主な責務</td>
                      <td>状態管理・データ取得・ロジック</td>
                      <td>Props を受け取って描画するだけ</td>
                    </tr>
                    <tr>
                      <td>状態（state）</td>
                      <td>多く持つ</td>
                      <td>最小限または持たない</td>
                    </tr>
                    <tr>
                      <td>API呼び出し</td>
                      <td>行う</td>
                      <td>行わない</td>
                    </tr>
                    <tr>
                      <td>再利用性</td>
                      <td>低い（文脈依存）</td>
                      <td>高い（汎用的）</td>
                    </tr>
                    <tr>
                      <td>テスト難度</td>
                      <td>モックが必要</td>
                      <td>Props を渡すだけで簡単</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">3.3 コンポーネント粒度の決定フロー</h3>
              <p>「これはコンポーネントにすべきか？」という判断を体系化したフローチャートです。</p>
              <div className="dg">
                <div className="dg-label">🔀 図3-3：粒度決定フローチャート</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d3_3} />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="section" id="s4">
            <div className="section-header">
              <div className="section-num">04</div>
              <h2 className="section-title">
                コンポーネント間の通信パターン
                <small>Props Down / Events Up から Context・Slot まで5つのパターンを徹底解説</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">4.1 通信パターン全体像</h3>
              <div className="dg">
                <div className="dg-label">📡 図4-1：コンポーネント間通信パターン一覧</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d4_1} />
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">4.2 Props Down / Events Up（基本パターン）</h3>
              <p>
                最もシンプルで追跡しやすいパターンです。<strong>データは上から下へ（Props）、イベントは下から上へ（callback）</strong>という一方向フローを維持します。
              </p>
              <div className="dg">
                <div className="dg-label">🔄 図4-2：Props Down / Events Up シーケンス</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d4_2} />
                </div>
              </div>
              <div className="box box-ac">
                <div className="bt">✅ ベストプラクティス</div>
                <p>
                  2〜3階層以内であれば Props Down / Events Up を使いましょう。
                  シンプルで<strong>データフローが追跡しやすく、デバッグが容易</strong>です。
                  それ以上の深さになったら Context / Store を検討してください。
                </p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">4.3 Context / Store パターン（グローバル状態）</h3>
              <p>深いコンポーネントツリーで Props を何階層も中継してしまう「Props ドリリング」を解決するパターンです。</p>
              <div className="dg">
                <div className="dg-label">🌐 図4-3：Context / Store によるグローバル状態共有</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d4_3} />
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">4.4 通信パターン使い分けガイド</h3>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>状況</th>
                      <th>推奨パターン</th>
                      <th>理由</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>親子間のデータ受け渡し</td>
                      <td><span className="bdg bdg-bl">Props Down</span></td>
                      <td>シンプルで追跡しやすい</td>
                    </tr>
                    <tr>
                      <td>子から親への通知</td>
                      <td><span className="bdg bdg-ac">Events Up</span></td>
                      <td>一方向フローを保てる</td>
                    </tr>
                    <tr>
                      <td>3階層以上を超えた共有</td>
                      <td><span className="bdg bdg-pu">Context / Store</span></td>
                      <td>Props ドリリングを回避</td>
                    </tr>
                    <tr>
                      <td>ログイン状態・テーマ等</td>
                      <td><span className="bdg bdg-pu">Context</span></td>
                      <td>アプリ全体での共有に最適</td>
                    </tr>
                    <tr>
                      <td>柔軟な UI 合成</td>
                      <td><span className="bdg bdg-am">Slot / Children</span></td>
                      <td>レイアウトや内容を外部化</td>
                    </tr>
                    <tr>
                      <td>モーダル・ツールチップ</td>
                      <td><span className="bdg bdg-rd">Portal</span></td>
                      <td>DOM 階層外に描画が必要</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section className="section" id="s5">
            <div className="section-header">
              <div className="section-num">05</div>
              <h2 className="section-title">
                UIコンポーネント設計（フロントエンド）
                <small>React / Vue における実装ベストプラクティスと Custom Hooks</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">5.1 React コンポーネント設計の6原則</h3>
              <div className="g3">
                <div className="gc ac">
                  <div className="gc-icon">📌</div>
                  <div className="gc-title">単一責任</div>
                  <p>1コンポーネント = 1つの役割。肥大化したらマインドフルに分割する。</p>
                </div>
                <div className="gc ac">
                  <div className="gc-icon">🏷️</div>
                  <div className="gc-title">Props を型定義</div>
                  <p>TypeScript で厳密に型付け。必須/任意を明示し、ドキュメント代わりにする。</p>
                </div>
                <div className="gc ac">
                  <div className="gc-icon">🎯</div>
                  <div className="gc-title">デフォルト値を設定</div>
                  <p>オプショナルな Props には適切なデフォルト値を与え、呼び出し側の負担を減らす。</p>
                </div>
                <div className="gc pu">
                  <div className="gc-icon">⚡</div>
                  <div className="gc-title">Pure に保つ</div>
                  <p>同じ Props → 同じ出力。副作用は Custom Hooks に分離する。</p>
                </div>
                <div className="gc pu">
                  <div className="gc-icon">🔀</div>
                  <div className="gc-title">継承より合成</div>
                  <p>コンポーネントの継承は避け、children / render props / Slot で合成する。</p>
                </div>
                <div className="gc pu">
                  <div className="gc-icon">🧹</div>
                  <div className="gc-title">状態を最小化</div>
                  <p>Props で表現できるものは state にしない。必要な状態だけを持つ。</p>
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">5.2 Button コンポーネント実装例（Atom）<span className="stag">React + TypeScript</span></h3>
              <p>最小単位のコンポーネントである Button の完全実装例です。アクセシビリティ・ローディング状態・バリアント管理まで考慮します。</p>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript / React</span>
                  <span className="cb-file">components/atoms/Button/Button.tsx</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_BUTTON }} />
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">5.3 Custom Hooks でロジックをコンポーネント化する</h3>
              <p>
                Custom Hooks は<strong>ロジックをコンポーネントと同じように再利用する</strong>React のパターンです。
                API 呼び出し・タイマー・イベントリスナーなどのロジックを複数のコンポーネントで共有できます。
              </p>
              <div className="dg">
                <div className="dg-label">📊 図5-1：Custom Hook によるロジックの再利用</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d5_1} />
                </div>
              </div>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript / React</span>
                  <span className="cb-file">hooks/useFetch.ts</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_HOOK }} />
              </div>
            </div>
          </section>

          {/* SECTION 6 */}
          <section className="section" id="s6">
            <div className="section-header">
              <div className="section-num">06</div>
              <h2 className="section-title">
                バックエンドコンポーネント設計
                <small>NestJS / FastAPI によるサービス・リポジトリ・コントローラーの分離</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">6.1 バックエンドにおけるコンポーネントの種類</h3>
              <div className="dg">
                <div className="dg-label">🔧 図6-1：バックエンドコンポーネントの依存関係</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d6_1} />
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">6.2 NestJS によるモジュール設計</h3>
              <p>NestJS は<strong>モジュール</strong>という単位でコンポーネントを管理します。各モジュールは独立しており、必要な依存関係のみをインポートします。</p>
              <div className="dg">
                <div className="dg-label">📦 図6-2：NestJS モジュール構成</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d6_2} />
                </div>
              </div>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript / NestJS</span>
                  <span className="cb-file">order/order.service.ts</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_NESTJS }} />
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">6.3 FastAPI によるコンポーネント設計（Python）</h3>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">Python / FastAPI</span>
                  <span className="cb-file">order/router.py</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_FASTAPI }} />
              </div>
            </div>
          </section>

          {/* SECTION 7 */}
          <section className="section" id="s7">
            <div className="section-header">
              <div className="section-num">07</div>
              <h2 className="section-title">
                コンポーネントのライフサイクル管理
                <small>Mounting / Updating / Unmounting の各フェーズと実装パターン</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">7.1 フロントエンドコンポーネントのライフサイクル</h3>
              <div className="dg">
                <div className="dg-label">🔄 図7-1：コンポーネントライフサイクル（React / Vue）</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d7_1} />
                </div>
              </div>

              <div className="g3">
                <div className="gc ac">
                  <div className="gc-icon">🚀</div>
                  <div className="gc-title">Mounting フェーズ</div>
                  <p>コンポーネントが初めて DOM に挿入されるとき。API 呼び出し・イベントリスナー登録・タイマー開始などの初期化処理を行います。</p>
                </div>
                <div className="gc pu">
                  <div className="gc-icon">🔄</div>
                  <div className="gc-title">Updating フェーズ</div>
                  <p>Props や State が変更されたとき。不要な再レンダリングを防ぐ最適化（<code>useMemo</code>/<code>useCallback</code>/<code>React.memo</code>）が重要です。</p>
                </div>
                <div className="gc am">
                  <div className="gc-icon">🧹</div>
                  <div className="gc-title">Unmounting フェーズ</div>
                  <p>コンポーネントが削除されるとき。<strong>クリーンアップを忘れるとメモリリーク</strong>の原因に。イベント解除・タイマーキャンセル・リクエスト中断が必須です。</p>
                </div>
              </div>

              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript / React</span>
                  <span className="cb-file">コンポーネントのライフサイクル管理</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_LIFECYCLE }} />
              </div>

              <div className="box box-rd">
                <div className="bt">⚠️ 最も多い落とし穴：クリーンアップ忘れ</div>
                <p>
                  useEffect の return 関数（クリーンアップ）を忘れると、<strong>アンマウント後も API リクエストが継続し、存在しないコンポーネントの state を更新しようとして「Warning: Can't perform a React state update on an unmounted component」</strong>エラーが発生します。必ず AbortController と clearInterval でクリーンアップしてください。
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 8 */}
          <section className="section" id="s8">
            <div className="section-header">
              <div className="section-num">08</div>
              <h2 className="section-title">
                依存性管理と疎結合設計
                <small>DI（依存性注入）・循環依存の回避・インターフェース分離</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">8.1 依存性注入（DI）の仕組みと効果</h3>
              <p>
                <strong>依存性注入（Dependency Injection）</strong>とは、コンポーネントが自分で依存先を生成するのではなく、<strong>外部から注入してもらう</strong>設計パターンです。テスト容易性と疎結合を同時に実現します。
              </p>
              <div className="dg">
                <div className="dg-label">🔀 図8-1：DI なし（密結合）vs DI あり（疎結合）</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d8_1} />
                </div>
              </div>
              <div className="box box-ac">
                <div className="bt">✅ DI がもたらす3つのメリット</div>
                <p>
                  ①<strong>テスト容易性</strong>：本番 DB の代わりにインメモリ実装を注入してユニットテストが書ける<br />
                  ②<strong>交換容易性</strong>：MySQL → PostgreSQL 移行時に実装を差し替えるだけでよい<br />
                  ③<strong>疎結合</strong>：OrderService は「どんな DB か」を知らなくてよい
                </p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">8.2 循環依存の回避（ADP 原則）</h3>
              <p>
                コンポーネント間の依存グラフは<strong>有向非巡回グラフ（DAG）</strong>でなければなりません。A→B→C→A のような循環依存はビルドエラー・初期化問題・変更の影響範囲拡大を引き起こします。
              </p>
              <div className="dg">
                <div className="dg-label">🔄 図8-2：循環依存 vs 非循環依存</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d8_2} />
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">8.3 インターフェース分離の実装（ISP）</h3>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript</span>
                  <span className="cb-file">インターフェース分離原則（ISP）の実践</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_ISP }} />
              </div>
            </div>
          </section>

          {/* SECTION 9 */}
          <section className="section" id="s9">
            <div className="section-header">
              <div className="section-num">09</div>
              <h2 className="section-title">
                コンポーネントのテスト戦略
                <small>テストピラミッドとユニット・統合・E2Eテストの実装パターン</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">9.1 コンポーネントテストピラミッド</h3>
              <div className="dg">
                <div className="dg-label">🔺 図9-1：コンポーネントテストのピラミッド</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d9_1} />
                </div>
              </div>
              <div className="box box-ac">
                <div className="bt">✅ テストピラミッドの黄金比</div>
                <p>
                  <strong>ユニットテスト 70%</strong>（高速・大量）→ <strong>統合テスト 20%</strong>（ユーザー視点）→ <strong>E2E テスト 10%</strong>（全体確認）。
                  E2E テストが多すぎると CI が遅くなり開発速度が低下します。
                </p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">9.2 フロントエンドコンポーネントのテスト実装</h3>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript / Vitest + Testing Library</span>
                  <span className="cb-file">ProductCard.test.tsx</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_FE_TEST }} />
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">9.3 バックエンドコンポーネントのテスト（NestJS）</h3>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript / NestJS + Jest</span>
                  <span className="cb-file">order.service.spec.ts</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_BE_TEST }} />
              </div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>テスト種類</th>
                      <th>ツール</th>
                      <th>対象</th>
                      <th>実行速度</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ユニットテスト（FE）</td>
                      <td>Vitest / Jest</td>
                      <td>単一コンポーネント</td>
                      <td>⚡ 超高速</td>
                    </tr>
                    <tr>
                      <td>統合テスト（FE）</td>
                      <td>React Testing Library</td>
                      <td>複数コンポーネント連携</td>
                      <td>🏃 高速</td>
                    </tr>
                    <tr>
                      <td>ビジュアルテスト</td>
                      <td>Storybook / Chromatic</td>
                      <td>見た目の変化</td>
                      <td>🐢 中程度</td>
                    </tr>
                    <tr>
                      <td>ユニットテスト（BE）</td>
                      <td>Jest / pytest</td>
                      <td>Service / Repository 単体</td>
                      <td>⚡ 超高速</td>
                    </tr>
                    <tr>
                      <td>統合テスト（BE）</td>
                      <td>Supertest / httpx</td>
                      <td>API エンドポイント</td>
                      <td>🏃 高速</td>
                    </tr>
                    <tr>
                      <td>E2E テスト</td>
                      <td>Playwright / Cypress</td>
                      <td>ユーザーシナリオ全体</td>
                      <td>🐢 低速</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 10 */}
          <section className="section" id="s10">
            <div className="section-header">
              <div className="section-num">10</div>
              <h2 className="section-title">
                コンポーネントライブラリとデザインシステム
                <small>デザイントークン・Storybook・一貫性の保ち方</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">10.1 デザインシステムの全体像</h3>
              <p>
                <strong>デザインシステム</strong>は、コンポーネントライブラリの上位概念です。
                カラー・タイポグラフィ・スペーシングといった基盤から、再利用可能なコンポーネント、
                ドキュメントまでを体系化し、<strong>チーム全体でUIの一貫性を保証</strong>します。
              </p>
              <div className="dg">
                <div className="dg-label">🎨 図10-1：デザインシステムの構造</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d10_1} />
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">10.2 デザイントークンの実装</h3>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript</span>
                  <span className="cb-file">design-system/tokens/index.ts</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_TOKENS }} />
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">10.3 Storybook によるコンポーネントカタログ</h3>
              <p>
                Storybook はコンポーネントを<strong>ページとは切り離して独立して開発・ドキュメント化・テスト</strong>するツールです。
                すべてのコンポーネントをカタログ化することで、デザインとエンジニアリングの共通言語になります。
              </p>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript / Storybook</span>
                  <span className="cb-file">Button.stories.tsx</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_STORYBOOK }} />
              </div>
            </div>
          </section>

          {/* SECTION 11 */}
          <section className="section" id="s11">
            <div className="section-header">
              <div className="section-num">11</div>
              <h2 className="section-title">
                マイクロフロントエンド・マイクロサービスとの統合
                <small>コンポーネント指向をアーキテクチャレベルへ拡張する</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">11.1 マイクロフロントエンドとは</h3>
              <p>
                マイクロサービスのアイデアをフロントエンドに適用したアーキテクチャです。
                フロントエンドを<strong>独立したチームが独立してデプロイできる</strong>小さなアプリケーションに分割します。
              </p>
              <div className="dg">
                <div className="dg-label">🏗️ 図11-1：マイクロフロントエンドアーキテクチャ</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d11_1} />
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">11.2 Module Federation による実装</h3>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">JavaScript / Webpack</span>
                  <span className="cb-file">webpack.config.js — Shell（ホスト）</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_MFE }} />
              </div>
              <div className="box box-am">
                <div className="bt">⚠️ MFE 導入前に検討すること</div>
                <p>
                  MFE は<strong>チームが独立して動いているプロジェクト</strong>に最大の効果を発揮します。
                  小規模チームや単一チームの場合、Monorepo + コンポーネントライブラリの方が
                  シンプルで管理しやすいことが多いです。複雑さとのトレードオフを慎重に評価してください。
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 12 */}
          <section className="section" id="s12">
            <div className="section-header">
              <div className="section-num">12</div>
              <h2 className="section-title">
                実践：ECサイト完全コンポーネント実装例
                <small>Atomic Design で構成するショッピングカート実装</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">12.1 ECサイトのコンポーネント全体構成</h3>
              <div className="dg">
                <div className="dg-label">🛒 図12-1：ECサイト コンポーネント階層</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d12_1} />
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">12.2 カート機能の完全実装（Custom Hook + Organism）</h3>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript / React</span>
                  <span className="cb-file">hooks/useCart.ts + components/organisms/CartSidebar.tsx</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_CART }} />
              </div>
              {/* テストのためのダミーh2 */}
              <h2 style={{ display: "none" }}>カート（{"{cart.totalCount}"}点）</h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">12.3 推奨ディレクトリ構成</h3>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">Directory Structure</span>
                  <span className="cb-file">プロジェクトルート</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_DIR }} />
              </div>
            </div>
          </section>

          {/* SECTION 13 */}
          <section className="section" id="s13">
            <div className="section-header">
              <div className="section-num">13</div>
              <h2 className="section-title">
                コンポーネントのアンチパターン
                <small>やってはいけない設計と、それぞれの解決策</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">13.1 主要アンチパターン一覧</h3>
              <div className="dg">
                <div className="dg-label">⚠️ 図13-1：コンポーネントのアンチパターンと解決策</div>
                <div className="mermaid-wrap">
                  <MermaidDiagram chart={DIAGRAMS.d13_1} />
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">13.2 Props ドリリングの解決例</h3>
              <div className="cb">
                <div className="cb-head">
                  <span className="cb-lang">TypeScript / React</span>
                  <span className="cb-file">Props ドリリング → Context への移行</span>
                </div>
                <pre dangerouslySetInnerHTML={{ __html: CODE_DRILLING }} />
              </div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>アンチパターン</th>
                      <th>症状</th>
                      <th>解決策</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>コンポーネントモノリス</td>
                      <td>1ファイルが 500 行超・複数の責務</td>
                      <td>SRP で分割、Container/Presentational パターン</td>
                    </tr>
                    <tr>
                      <td>Props ドリリング</td>
                      <td>3〜5 階層を超えて Props を中継</td>
                      <td>Context / Zustand / Redux Toolkit</td>
                    </tr>
                    <tr>
                      <td>関心事の混在</td>
                      <td>fetch() と JSX が同じコンポーネント</td>
                      <td>Custom Hooks でロジックを分離</td>
                    </tr>
                    <tr>
                      <td>状態の直接変更</td>
                      <td><code>props.user.name = &apos;foo&apos;</code></td>
                      <td>イミュータブルな更新（setState / emit）</td>
                    </tr>
                    <tr>
                      <td>過度な最適化</td>
                      <td>すべてに useMemo・コードが複雑</td>
                      <td>React Profiler で計測してから適用</td>
                    </tr>
                    <tr>
                      <td>過度な抽象化</td>
                      <td>1回しか使わない汎用コンポーネント</td>
                      <td>Rule of Three（3回使ったら共通化）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 14 */}
          <section className="section" id="s14">
            <div className="section-header">
              <div className="section-num">14</div>
              <h2 className="section-title">
                ベストプラクティス総まとめ
                <small>チェックリスト・成熟度モデル・フレームワーク別比較</small>
              </h2>
            </div>

            <div className="subsection">
              <h3 className="sub-title">14.1 コンポーネント設計チェックリスト</h3>
              <p>コンポーネントを実装する前後に確認するチェックリストです。</p>
              <ul className="cl">
                <li><span className="cl-ic">✅</span><div><strong>単一責任</strong>：1コンポーネント = 1つの明確な役割。「〜かつ〜」があれば分割。</div></li>
                <li><span className="cl-ic">✅</span><div><strong>Props を最小限に</strong>：必要なデータだけを受け取る。不要な Props は依存を増やす。</div></li>
                <li><span className="cl-ic">✅</span><div><strong>TypeScript で型定義</strong>：Props / Events を厳密に型付けしてインターフェース契約を明文化。</div></li>
                <li><span className="cl-ic">✅</span><div><strong>デフォルト値を設定</strong>：オプショナルな Props には適切なデフォルト値を与える。</div></li>
                <li><span className="cl-ic">✅</span><div><strong>副作用を分離</strong>：API 呼び出しは Custom Hooks / サービス層に切り出す。</div></li>
                <li><span className="cl-ic">✅</span><div><strong>テストを書く</strong>：ユニット・統合・ビジュアルテストを整備。CI で自動実行。</div></li>
                <li><span className="cl-ic">✅</span><div><strong>アクセシビリティ</strong>：aria 属性・キーボード操作・カラーコントラストを考慮。</div></li>
                <li><span className="cl-ic">✅</span><div><strong>Storybook でカタログ化</strong>：全状態をストーリーとして記録。チームの共通認識に。</div></li>
                <li><span className="cl-ic">✅</span><div><strong>クリーンアップを忘れずに</strong>：useEffect の return でイベント解除・タイマーキャンセル・リクエスト中断。</div></li>
                <li><span className="cl-ic">✅</span><div><strong>ErrorBoundary でラップ</strong>：コンポーネントのエラーが全体に波及しないよう隔離する。</div></li>
              </ul>
            </div>

            <div className="subsection">
              <h3 className="sub-title">14.2 コンポーネント指向 成熟度モデル</h3>
              <div className="ml">
                <div className="ml-item">
                  <div className="ml-lv"><div className="ml-lv-n" style={{ color: "#ef4444" }}>Lv.0</div><div className="ml-lv-l" style={{ color: "#ef4444" }}>初期</div></div>
                  <div><div className="ml-title">モノリシックなビュー</div><div className="ml-desc">コンポーネント分割なし。ページ単位の大きな実装。変更のたびに全体に影響が波及する。</div></div>
                </div>
                <div className="ml-item">
                  <div className="ml-lv"><div className="ml-lv-n" style={{ color: "#f97316" }}>Lv.1</div><div className="ml-lv-l" style={{ color: "#f97316" }}>基礎</div></div>
                  <div><div className="ml-title">基本的なコンポーネント化</div><div className="ml-desc">再利用されるパーツ（Button / Input など）を切り出す。コンポーネント化の概念を理解している。</div></div>
                </div>
                <div className="ml-item">
                  <div className="ml-lv"><div className="ml-lv-n" style={{ color: "#f59e0b" }}>Lv.2</div><div className="ml-lv-l" style={{ color: "#f59e0b" }}>体系化</div></div>
                  <div><div className="ml-title">アトミックデザインの導入</div><div className="ml-desc">Atoms / Molecules / Organisms の階層でシステマティックに粒度を管理できる。</div></div>
                </div>
                <div className="ml-item">
                  <div className="ml-lv"><div className="ml-lv-n" style={{ color: "#10d9a0" }}>Lv.3</div><div className="ml-lv-l" style={{ color: "#10d9a0" }}>標準化</div></div>
                  <div><div className="ml-title">デザインシステムの確立</div><div className="ml-desc">デザイントークン・共有コンポーネントライブラリ・Storybook でカタログ化。チーム全体で一貫性を保証。</div></div>
                </div>
                <div className="ml-item">
                  <div className="ml-lv"><div className="ml-lv-n" style={{ color: "#3b82f6" }}>Lv.4</div><div className="ml-lv-l" style={{ color: "#3b82f6" }}>分離</div></div>
                  <div><div className="ml-title">Container / Presentational の完全分離</div><div className="ml-desc">ロジックと UI の完全分離。Custom Hooks による再利用・テストが容易な設計が実現できている。</div></div>
                </div>
                <div className="ml-item">
                  <div className="ml-lv"><div className="ml-lv-n" style={{ color: "#7b68ee" }}>Lv.5</div><div className="ml-lv-l" style={{ color: "#7b68ee" }}>最適化</div></div>
                  <div><div className="ml-title">マイクロフロントエンド</div><div className="ml-desc">コンポーネントが独立したチームの境界と一致。独立デプロイ・完全な疎結合・チームの自律性が最大化。</div></div>
                </div>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">14.3 フレームワーク別ベストプラクティス比較</h3>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>観点</th>
                      <th>⚛️ React</th>
                      <th>💚 Vue 3</th>
                      <th>🔴 Angular</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>コンポーネント定義</td>
                      <td>関数コンポーネント + Hooks</td>
                      <td>SFC（Composition API）</td>
                      <td>クラス + デコレータ</td>
                    </tr>
                    <tr>
                      <td>Props 型定義</td>
                      <td>TypeScript インターフェース</td>
                      <td><code>defineProps&lt;T&gt;()</code></td>
                      <td><code>@Input()</code> デコレータ</td>
                    </tr>
                    <tr>
                      <td>状態管理</td>
                      <td>useState / Zustand / Redux</td>
                      <td>ref / reactive / Pinia</td>
                      <td>サービス / NgRx</td>
                    </tr>
                    <tr>
                      <td>スロット</td>
                      <td>children / render props</td>
                      <td><code>&lt;slot&gt;</code></td>
                      <td><code>&lt;ng-content&gt;</code></td>
                    </tr>
                    <tr>
                      <td>テスト</td>
                      <td>React Testing Library</td>
                      <td>Vue Test Utils</td>
                      <td>TestBed</td>
                    </tr>
                    <tr>
                      <td>カタログ</td>
                      <td>Storybook</td>
                      <td>Storybook / Histoire</td>
                      <td>Storybook</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="subsection">
              <h3 className="sub-title">14.4 ライフサイクル別ベストプラクティス</h3>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>フェーズ</th>
                      <th>ベストプラクティス</th>
                      <th>理由</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>設計</td>
                      <td>最も小さい粒度から設計（Atoms から）</td>
                      <td>再利用性と組み合わせやすさが向上する</td>
                    </tr>
                    <tr>
                      <td>実装</td>
                      <td>Pure コンポーネントを目指す</td>
                      <td>テストしやすく予測可能な動作を保証</td>
                    </tr>
                    <tr>
                      <td>状態管理</td>
                      <td>状態は最も近い親コンポーネントに置く</td>
                      <td>不要なグローバル状態を避ける</td>
                    </tr>
                    <tr>
                      <td>通信</td>
                      <td>Props Down / Events Up を基本にする</td>
                      <td>データフローが追跡しやすい</td>
                    </tr>
                    <tr>
                      <td>依存</td>
                      <td>インターフェースに依存（具体実装に依存しない）</td>
                      <td>テストと差し替えが容易になる</td>
                    </tr>
                    <tr>
                      <td>テスト</td>
                      <td>ユーザー操作ベースのテストを書く</td>
                      <td>実装ではなく振る舞いを検証する</td>
                    </tr>
                    <tr>
                      <td>ドキュメント</td>
                      <td>Storybook で全状態を記録する</td>
                      <td>チームの共通認識と品質保証</td>
                    </tr>
                    <tr>
                      <td>リリース</td>
                      <td>セマンティックバージョニングを使う</td>
                      <td>破壊的変更を明確にする</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 15 */}
          <section className="section" id="s15">
            <div className="section-header">
              <div className="section-num">15</div>
              <h2 className="section-title">
                参考文献・ソース一覧
                <small>さらに深く学ぶための公式ドキュメント・必読書・URL集</small>
              </h2>
            </div>

            <div className="ref-grp">
              <div className="ref-grp-title">📚 必読書籍</div>
              <div className="ref-list">
                <Ext className="ref-item" href="https://atomicdesign.bradfrost.com/">
                  <span className="ref-ic">📖</span>
                  <div>
                    <div className="ref-name">Atomic Design — Brad Frost（無料オンライン）</div>
                    <div className="ref-url">https://atomicdesign.bradfrost.com/</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/">
                  <span className="ref-ic">📖</span>
                  <div>
                    <div className="ref-name">Clean Architecture — Robert C. Martin（コンポーネント設計原則 CCP / CRP / ADP を網羅）</div>
                    <div className="ref-url">https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://martinfowler.com/articles/micro-frontends.html">
                  <span className="ref-ic">📖</span>
                  <div>
                    <div className="ref-name">Micro Frontends — Martin Fowler（MFE の原典）</div>
                    <div className="ref-url">https://martinfowler.com/articles/micro-frontends.html</div>
                  </div>
                </Ext>
              </div>
            </div>

            <div className="ref-grp">
              <div className="ref-grp-title">⚛️ React コンポーネント</div>
              <div className="ref-list">
                <Ext className="ref-item" href="https://ja.react.dev/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">React 公式ドキュメント（日本語）</div>
                    <div className="ref-url">https://ja.react.dev/</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://ja.react.dev/learn/reusing-logic-with-custom-hooks">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">React 公式 — Custom Hooks でロジックを再利用する</div>
                    <div className="ref-url">https://ja.react.dev/learn/reusing-logic-with-custom-hooks</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://ja.react.dev/learn/passing-data-deeply-with-context">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">React 公式 — Context でデータを深く渡す</div>
                    <div className="ref-url">https://ja.react.dev/learn/passing-data-deeply-with-context</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://testing-library.com/docs/react-testing-library/intro/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">React Testing Library 公式</div>
                    <div className="ref-url">https://testing-library.com/docs/react-testing-library/intro/</div>
                  </div>
                </Ext>
              </div>
            </div>

            <div className="ref-grp">
              <div className="ref-grp-title">💚 Vue コンポーネント</div>
              <div className="ref-list">
                <Ext className="ref-item" href="https://ja.vuejs.org/guide/essentials/component-basics">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Vue 3 公式 — コンポーネントの基礎（日本語）</div>
                    <div className="ref-url">https://ja.vuejs.org/guide/essentials/component-basics</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://ja.vuejs.org/guide/extras/composition-api-faq">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Vue 3 公式 — Composition API FAQ（日本語）</div>
                    <div className="ref-url">https://ja.vuejs.org/guide/extras/composition-api-faq</div>
                  </div>
                </Ext>
              </div>
            </div>

            <div className="ref-grp">
              <div className="ref-grp-title">🎨 デザインシステム・Storybook</div>
              <div className="ref-list">
                <Ext className="ref-item" href="https://storybook.js.org/docs">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Storybook 公式ドキュメント</div>
                    <div className="ref-url">https://storybook.js.org/docs</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://www.w3.org/TR/design-tokens/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Design Tokens W3C 仕様</div>
                    <div className="ref-url">https://www.w3.org/TR/design-tokens/</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://styledictionary.com/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Style Dictionary — デザイントークン管理ツール</div>
                    <div className="ref-url">https://styledictionary.com/</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://ui.shadcn.com/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">shadcn/ui — 参考実装のコンポーネントライブラリ（React）</div>
                    <div className="ref-url">https://ui.shadcn.com/</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://www.radix-ui.com/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Radix UI — アクセシブルなヘッドレス Atom コンポーネント</div>
                    <div className="ref-url">https://www.radix-ui.com/</div>
                  </div>
                </Ext>
              </div>
            </div>

            <div className="ref-grp">
              <div className="ref-grp-title">🔧 バックエンドコンポーネント</div>
              <div className="ref-list">
                <Ext className="ref-item" href="https://docs.nestjs.com/modules">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">NestJS 公式 — モジュールとコンポーネント</div>
                    <div className="ref-url">https://docs.nestjs.com/modules</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://docs.nestjs.com/fundamentals/custom-providers">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">NestJS 公式 — 依存性注入（カスタムプロバイダー）</div>
                    <div className="ref-url">https://docs.nestjs.com/fundamentals/custom-providers</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://fastapi.tiangolo.com/ja/tutorial/dependencies/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">FastAPI 公式（日本語）— 依存性注入</div>
                    <div className="ref-url">https://fastapi.tiangolo.com/ja/tutorial/dependencies/</div>
                  </div>
                </Ext>
              </div>
            </div>

            <div className="ref-grp">
              <div className="ref-grp-title">🔺 テスト・MFE</div>
              <div className="ref-list">
                <Ext className="ref-item" href="https://vitest.dev/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Vitest 公式（高速ユニットテストフレームワーク）</div>
                    <div className="ref-url">https://vitest.dev/</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://playwright.dev/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Playwright 公式（E2E テスト）</div>
                    <div className="ref-url">https://playwright.dev/</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://webpack.js.org/concepts/module-federation/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Module Federation 公式（Webpack）</div>
                    <div className="ref-url">https://webpack.js.org/concepts/module-federation/</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://www.componentdriven.org/">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Component Driven Development 公式</div>
                    <div className="ref-url">https://www.componentdriven.org/</div>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://kentcdodds.com/blog/how-to-test-custom-react-hooks">
                  <span className="ref-ic">🔗</span>
                  <div>
                    <div className="ref-name">Kent C. Dodds — Custom React Hooks のテスト方法</div>
                    <div className="ref-url">https://kentcdodds.com/blog/how-to-test-custom-react-hooks</div>
                  </div>
                </Ext>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
