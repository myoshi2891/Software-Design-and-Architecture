import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import ApiFirstSidebar from "./ApiFirstSidebar";

const NAV_GROUPS = [
  {
    title: "基礎概念",
    items: [
      { id: "sec1", emoji: "01", label: "API-Firstとは何か？" },
      { id: "sec2", emoji: "02", label: "開発フロー" },
      { id: "sec3", emoji: "03", label: "OpenAPI仕様の完全解説" },
    ],
  },
  {
    title: "設計原則",
    items: [
      { id: "sec4", emoji: "04", label: "RESTful API設計原則" },
      { id: "sec5", emoji: "05", label: "バージョニング戦略" },
      { id: "sec6", emoji: "06", label: "認証・認可の設計" },
      { id: "sec7", emoji: "07", label: "エラーハンドリング" },
    ],
  },
  {
    title: "実装パターン",
    items: [
      { id: "sec8", emoji: "08", label: "ページネーション・フィルタリング" },
      { id: "sec9", emoji: "09", label: "APIゲートウェイ" },
      { id: "sec10", emoji: "10", label: "テスト戦略" },
      { id: "sec11", emoji: "11", label: "ドキュメントとDX" },
    ],
  },
  {
    title: "比較・実践",
    items: [
      { id: "sec12", emoji: "12", label: "GraphQL vs REST vs gRPC" },
      { id: "sec13", emoji: "13", label: "ECサイト完全事例" },
      { id: "sec14", emoji: "14", label: "ベストプラクティス" },
      { id: "sec15", emoji: "15", label: "アンチパターン" },
      { id: "sec16", emoji: "16", label: "参考文献・ソース" },
    ],
  },
];

const DIAGRAMS = {
  d01: `graph TD
    subgraph OLD["❌ コードファースト（従来型）"]
        OB["⚙️ バックエンド実装"]
        OF["🖥️ フロントエンド実装"]
        OI["🔗 統合・結合"]
        OT["⚠️ 問題発覚・手戻り"]
        OB --> OF --> OI --> OT
    end
    subgraph NEW["✅ API-First（現代型）"]
        NA["📋 API設計・仕様策定"]
        NR["🔍 チームレビュー・合意"]
        NM["🧪 モックサーバー生成"]
        NP["⚡ 並行開発"]
        NB["⚙️ バックエンド実装"]
        NF["🖥️ フロントエンド実装"]
        NI["✅ スムーズな統合"]
        NA --> NR --> NM --> NP
        NP --> NB & NF
        NB & NF --> NI
    end
    style OLD fill:#2d0a0a,stroke:#ef4444
    style NEW fill:#0a2d0a,stroke:#10b981
    style NA fill:#1e3a5f,color:#00d4ff
    style NR fill:#2d1a4a,color:#c4b5fd
    style NM fill:#0a2d1a,color:#6ee7b7
    style NI fill:#1e3a5f,color:#e2e8f0`,

  d02: `graph LR
    P1["❌ フロント・バックの認識齟齬<br/>統合時に大量の手戻り発生"]
    P2["❌ APIが場当たり的に設計<br/>一貫性がなく使いにくい"]
    P3["❌ ドキュメントが古い・存在しない<br/>外部連携が困難"]
    P4["❌ 依存関係でチームがブロック<br/>バックエンド完成待ちで停滞"]
    S1["✅ 仕様という共通言語で合意<br/>手戻りを大幅削減"]
    S2["✅ 一貫した設計原則<br/>開発者体験 (DX) が向上"]
    S3["✅ 仕様から自動生成<br/>常に最新のドキュメント"]
    S4["✅ モックで並行開発<br/>チームが独立して進められる"]
    P1 -->|"API-First導入"| S1
    P2 -->|"API-First導入"| S2
    P3 -->|"API-First導入"| S3
    P4 -->|"API-First導入"| S4
    style P1 fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style P2 fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style P3 fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style P4 fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style S1 fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style S2 fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style S3 fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style S4 fill:#0a2d1a,color:#6ee7b7,stroke:#10b981`,

  d03: `flowchart TD
    REQ["📋 要件定義\nビジネス要件・ユーザーストーリー整理"]
    DESIGN["✏️ API設計\nエンドポイント・データモデル・認証・エラー仕様"]
    SPEC["📄 OpenAPI仕様書の作成\nYAML形式で仕様を文書化（openapi.yaml）"]
    REVIEW["🔍 デザインレビュー\nフロント・バック・QA・PM 全員で仕様を確認・合意"]
    MOCK["🧪 モックサーバーの起動\nPrism / Stoplightで仕様からモックを自動生成"]
    PARALLEL["⚡ 並行開発フェーズ開始"]
    BACKEND["⚙️ バックエンド実装\n仕様に従い実装 / Contract Testで仕様適合を検証"]
    FRONTEND["🖥️ フロントエンド実装\nモックサーバーに向けて開発 / 実サーバーへの切替もスムーズ"]
    INTEGRATION["🔗 統合テスト\nE2Eテスト・契約テスト実施"]
    DEPLOY["🚀 デプロイ・公開\nAPI Gatewayへのデプロイとドキュメント公開"]
    REQ --> DESIGN --> SPEC --> REVIEW --> MOCK --> PARALLEL
    PARALLEL --> BACKEND & FRONTEND
    BACKEND & FRONTEND --> INTEGRATION --> DEPLOY
    style SPEC fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style REVIEW fill:#2d1a4a,color:#c4b5fd,stroke:#7c3aed
    style MOCK fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style PARALLEL fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style INTEGRATION fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style DEPLOY fill:#0d1b2e,color:#e2e8f0,stroke:#64748b`,

  d04: `sequenceDiagram
    participant PM as プロダクトMgr
    participant ARCH as アーキテクト
    participant FE as FEチーム
    participant BE as BEチーム
    participant MOCK as モックサーバー
    PM->>ARCH: 機能要件を伝える
    ARCH->>ARCH: openapi.yaml を設計
    ARCH->>FE: API仕様を共有
    ARCH->>BE: API仕様を共有
    Note over FE,BE: 全員が仕様に合意 ✅
    ARCH->>MOCK: openapi.yaml からモックを起動
    MOCK-->>FE: モックエンドポイント提供開始
    par 並行開発
        FE->>MOCK: モックAPIを呼び出して開発
        MOCK-->>FE: サンプルレスポンスを返す
        BE->>BE: 仕様に従い本番APIを実装
        BE->>BE: Contract Test を実施
    end
    FE->>BE: モックから本番APIに切り替え
    FE->>BE: 統合確認 ✅`,

  d05: `graph TD
    OAS["📄 openapi.yaml\nOpenAPI仕様書"]
    OAS --> INFO["ℹ️ info セクション\nタイトル・バージョン・説明\nライセンス・連絡先"]
    OAS --> SERVERS["🌐 servers セクション\nAPIのベースURL\n本番・開発・ステージング"]
    OAS --> PATHS["🔗 paths セクション\n全エンドポイントの定義\nHTTPメソッド・パラメータ・レスポンス"]
    OAS --> COMPONENTS["🧩 components セクション\n再利用可能なスキーマ定義\nschemas / securitySchemes / responses"]
    OAS --> SECURITY["🔒 security セクション\nグローバルな認証設定\nBearerAuth / ApiKey / OAuth2"]
    OAS --> TAGS["🏷️ tags セクション\nエンドポイントのグループ化\nドキュメントの整理"]
    style OAS fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style INFO fill:#0d1b2e,color:#94a3b8,stroke:#1e3a5f
    style SERVERS fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style PATHS fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style COMPONENTS fill:#2d1a4a,color:#c4b5fd,stroke:#7c3aed
    style SECURITY fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style TAGS fill:#0d1b2e,color:#94a3b8,stroke:#1e3a5f`,

  d06: `graph LR
    subgraph COLL["コレクションリソース /orders"]
        GET_LIST["GET /orders\n📋 一覧取得\n→ 200 OK"]
        POST["POST /orders\n➕ 新規作成\n→ 201 Created"]
    end
    subgraph SINGLE["単一リソース /orders/{id}"]
        GET_ONE["GET /orders/{id}\n🔍 詳細取得\n→ 200 OK"]
        PUT["PUT /orders/{id}\n✏️ 全体更新\n→ 200 OK"]
        PATCH["PATCH /orders/{id}\n🔧 部分更新\n→ 200 OK"]
        DELETE["DELETE /orders/{id}\n🗑️ 削除\n→ 204 No Content"]
    end
    style GET_LIST fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style POST fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style GET_ONE fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style PUT fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style PATCH fill:#2d1200,color:#fed7aa,stroke:#f97316
    style DELETE fill:#2d0a0a,color:#fca5a5,stroke:#ef4444`,

  d07: `graph TD
    STATUS["HTTPステータスコード"]
    STATUS --> S2XX["✅ 2xx 成功系"]
    STATUS --> S4XX["⚠️ 4xx クライアントエラー系"]
    STATUS --> S5XX["🔥 5xx サーバーエラー系"]
    S2XX --> SC200["200 OK\n取得・更新成功"]
    S2XX --> SC201["201 Created\n新規作成成功"]
    S2XX --> SC202["202 Accepted\n非同期処理受付"]
    S2XX --> SC204["204 No Content\n削除成功"]
    S4XX --> SC400["400 Bad Request\nリクエスト形式不正"]
    S4XX --> SC401["401 Unauthorized\n認証が必要"]
    S4XX --> SC403["403 Forbidden\n権限なし"]
    S4XX --> SC404["404 Not Found\nリソースなし"]
    S4XX --> SC409["409 Conflict\n状態競合"]
    S4XX --> SC422["422 Unprocessable Entity\nビジネスルール違反"]
    S4XX --> SC429["429 Too Many Requests\nレート制限超過"]
    S5XX --> SC500["500 Internal Server Error\nサーバー内部エラー"]
    S5XX --> SC503["503 Service Unavailable\nサービス利用不可"]
    style S2XX fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style S4XX fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style S5XX fill:#2d0a0a,color:#fca5a5,stroke:#ef4444`,

  d08: `graph TD
    L0["Level 0 🔴 POX\nすべて POST / 単一エンドポイント\nPOST /api {'action': 'getOrder'}"]
    L1["Level 1 🟡 リソース\nURLでリソースを識別\nGET /orders/123"]
    L2["Level 2 🟢 HTTPメソッド\nHTTPメソッドとステータスコードを正しく使用\n（多くの現代APIはここを目指す）"]
    L3["Level 3 💎 HATEOAS\nレスポンスに関連リンクを含める\n_links でナビゲーション情報を返す"]
    L0 --> L1 --> L2 --> L3
    style L0 fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style L1 fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style L2 fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style L3 fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff`,

  d09: `flowchart LR
    ALPHA["🔬 Alpha\n内部開発・テスト\n破壊的変更あり"]
    BETA["🧪 Beta\n選択パートナー公開\nフィードバック収集"]
    GA["✅ GA（一般公開）\n全般公開・安定版\nSLAが適用される"]
    DEPRECATED["⚠️ Deprecated\n非推奨宣言\n移行期間（最低6ヶ月）"]
    SUNSET["🌅 Sunset\n廃止・EOL\nリクエスト不可"]
    ALPHA --> BETA --> GA --> DEPRECATED --> SUNSET
    style ALPHA fill:#2d1a4a,color:#c4b5fd,stroke:#7c3aed
    style BETA fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style GA fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style DEPRECATED fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style SUNSET fill:#2d0a0a,color:#fca5a5,stroke:#ef4444`,

  d10: `graph TD
    AUTH["🔒 API認証方式"]
    AUTH --> APIKEY["🔑 API Key\nX-API-Key ヘッダーで送信\nシンプルな認証方式"]
    AUTH --> BEARER["🎫 Bearer Token（JWT）\nAuthorization: Bearer {token}\nステートレスな認証"]
    AUTH --> OAUTH2["🏛️ OAuth 2.0\nサードパーティアクセス認可の標準\n認可コード / クライアントクレデンシャル"]
    AUTH --> MTLS["🔏 mTLS（相互TLS）\nクライアント証明書で認証\nサービス間通信に最適"]
    APIKEY --> AK_USE["用途：内部API・B2Bサービス"]
    BEARER --> BE_USE["用途：モバイルアプリ・SPA"]
    OAUTH2 --> OA_USE["用途：外部パートナー連携・公開API"]
    MTLS --> MT_USE["用途：マイクロサービス間通信"]
    style APIKEY fill:#0d1b2e,color:#94a3b8,stroke:#64748b
    style BEARER fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style OAUTH2 fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style MTLS fill:#2d1a4a,color:#c4b5fd,stroke:#7c3aed`,

  d11: `sequenceDiagram
    participant USER as ユーザー
    participant APP as クライアントApp
    participant AUTH as 認可サーバー
    participant API as リソースサーバー(API)
    Note over USER,API: Authorization Code フロー
    USER->>APP: ログインボタンをクリック
    APP->>AUTH: 認可リクエスト<br/>?response_type=code&client_id=xxx&scope=read:orders
    AUTH->>USER: ログイン・同意画面を表示
    USER->>AUTH: ログイン・権限を許可
    AUTH->>APP: 認可コードを返す<br/>?code=abc123
    APP->>AUTH: アクセストークンリクエスト<br/>POST /token {code, client_secret}
    AUTH-->>APP: アクセストークン発行<br/>{access_token, expires_in: 3600}
    APP->>API: APIリクエスト<br/>Authorization: Bearer {access_token}
    API-->>APP: ✅ レスポンスデータ`,

  d12: `graph LR
    subgraph JWT_STR["JWT構造（3つの部分をドットで連結）"]
        HEADER["Header\nBase64エンコード\n{alg: RS256, typ: JWT}"]
        PAYLOAD["Payload\nBase64エンコード\n{sub: user_123,\nexp: 1700000000,\nscope: read:orders}"]
        SIG["Signature\nRSA署名\n改ざん検知に使用"]
    end
    subgraph VERIFY["検証フロー"]
        V1["① トークンを3分割"] --> V2["② ヘッダー・ペイロードをデコード"]
        V2 --> V3["③ 署名を検証（公開鍵）"]
        V3 --> V4["④ 有効期限（exp）を確認"]
        V4 --> V5["⑤ スコープ（scope）を確認"]
        V5 --> V6["✅ 認証・認可成功"]
    end
    style HEADER fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style PAYLOAD fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style SIG fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style V6 fill:#0a2d1a,color:#6ee7b7,stroke:#10b981`,

  d13: `graph TD
    ERROR["⚠️ エラーレスポンス設計の5原則"]
    ERROR --> CODE["🔖 エラーコード\n機械読み取り可能なコード\n例：VALIDATION_ERROR"]
    ERROR --> MESSAGE["💬 人間が読めるメッセージ\n日本語でわかりやすく説明\n例：入力値に誤りがあります"]
    ERROR --> DETAILS["🔍 詳細情報（任意）\nどのフィールドが問題かを明示\n例：field: email, message: 形式不正"]
    ERROR --> TRACE["🔗 トレースID\nサポートチームがログを追跡できるID\n例：req_3kLm9xQr7pNv2Yt"]
    ERROR --> FORMAT["📋 一貫したフォーマット\nすべてのエラーで同じ構造を使用\n例：{ error: { code, message, details, trace_id } }"]
    style ERROR fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style CODE fill:#2d1a4a,color:#c4b5fd,stroke:#7c3aed
    style MESSAGE fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style DETAILS fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style TRACE fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style FORMAT fill:#1e3a5f,color:#94a3b8,stroke:#64748b`,

  d14: `graph TD
    PAGE["📑 ページネーション方式"]
    PAGE --> OFFSET["オフセット\n?page=2&per_page=20\nSELECT ... LIMIT 20 OFFSET 20"]
    PAGE --> CURSOR["カーソル\n?cursor=eyJpZCI6MTAwfQ&per_page=20\n不透明な文字列で位置を管理"]
    PAGE --> KEYSET["キーセット\n?after_id=100&per_page=20\nインデックスを直接利用"]
    OFFSET --> O_PRO["✅ 実装が簡単\n✅ ランダムアクセス可\n✅ ページ番号で移動可能"]
    OFFSET --> O_CON["❌ 大量データで遅い\n❌ データ追加でページずれ"]
    CURSOR --> C_PRO["✅ リアルタイムデータに強い\n✅ 大量データでも高速\n✅ ページずれなし"]
    CURSOR --> C_CON["❌ ランダムアクセス不可\n❌ 実装が複雑"]
    KEYSET --> K_PRO["✅ インデックス活用で高速\n✅ シンプルで安定"]
    KEYSET --> K_CON["❌ 複雑なソートには難しい"]
    style OFFSET fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style CURSOR fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style KEYSET fill:#2d1a4a,color:#c4b5fd,stroke:#7c3aed`,

  d15: `graph TD
    subgraph CLIENTS["クライアント層"]
        WEB["🌐 Webアプリ"]
        MOBILE["📱 モバイルアプリ"]
        PARTNER["🤝 パートナーシステム"]
    end
    subgraph GW_LAYER["APIゲートウェイ層"]
        GW["🚪 API Gateway\nKong / AWS API GW / Nginx"]
        GW_FUNC["横断的関心事:\n• JWT認証・認可\n• レート制限\n• SSLターミネーション\n• リクエストログ\n• ロードバランシング\n• レスポンスキャッシュ\n• APIバージョン管理"]
    end
    subgraph SERVICES["マイクロサービス層"]
        SVC1["📦 注文サービス :3001"]
        SVC2["🛍️ 商品サービス :3002"]
        SVC3["👤 ユーザーサービス :3003"]
        SVC4["💳 決済サービス :3004"]
    end
    WEB & MOBILE & PARTNER --> GW
    GW --> SVC1 & SVC2 & SVC3 & SVC4
    style GW fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style GW_FUNC fill:#1e1a0a,color:#94a3b8,stroke:#64748b`,

  d16: `graph LR
    subgraph CLIENTS["クライアント"]
        WEB_C["🌐 Webアプリ React/Vue"]
        MOB_C["📱 モバイルApp iOS/Android"]
    end
    subgraph BFF["BFFレイヤー"]
        WEB_BFF["🔵 Web BFF\nPC向け集約・変換\n大きなデータを返す"]
        MOB_BFF["🟢 Mobile BFF\nモバイル向け最適化\n軽量なデータを返す"]
    end
    subgraph SVCS["マイクロサービス群"]
        S1["注文サービス"]
        S2["商品サービス"]
        S3["ユーザーサービス"]
    end
    WEB_C --> WEB_BFF
    MOB_C --> MOB_BFF
    WEB_BFF & MOB_BFF --> S1 & S2 & S3
    style WEB_BFF fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style MOB_BFF fill:#0a2d1a,color:#6ee7b7,stroke:#10b981`,

  d17: `graph TD
    subgraph PYRAMID["APIテストピラミッド"]
        E2E["🔺 E2Eテスト（少数）\n実際のユーザーシナリオを自動化\nPlaywright / Cypress / Postman"]
        INTEGRATION["🔷 統合テスト（中程度）\nDB・サービスを組み合わせて検証\npytest / Jest / REST Assured"]
        CONTRACT["🔶 契約テスト（Contract Testing）\nプロデューサー・コンシューマー間の契約検証\nPact / Spring Cloud Contract"]
        UNIT["🟩 ユニットテスト（多数）\n個々の関数・クラスの検証\npytest / Jest / JUnit"]
    end
    UNIT --> CONTRACT --> INTEGRATION --> E2E
    style E2E fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style INTEGRATION fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style CONTRACT fill:#2d1a4a,color:#c4b5fd,stroke:#7c3aed
    style UNIT fill:#0a2d1a,color:#6ee7b7,stroke:#10b981`,

  d18: `sequenceDiagram
    participant FE as FE (Consumer)
    participant PACT as Pact Broker
    participant BE as BE (Provider)
    participant CI as CIパイプライン
    FE->>FE: コンシューマーテストを書く<br/>「このリクエストを送ったら<br/>このレスポンスが来るはず」
    FE->>PACT: 契約 (Pact) を Pact Broker に公開
    BE->>PACT: 最新の契約を取得
    BE->>BE: プロバイダーテストを実行<br/>契約通りのレスポンスを返せるか検証
    BE->>PACT: 検証結果を報告
    CI->>PACT: デプロイ前に can-i-deploy チェック
    PACT-->>CI: 契約の互換性を確認
    CI->>CI: ✅ 互換性OK → デプロイ実行`,

  d19: `graph TD
    ROOT["優れたAPIドキュメント"]
    ROOT --> QS["🚀 クイックスタート\n5分で動くサンプルコード\n認証トークンの取得方法"]
    ROOT --> REF["📖 リファレンス\n全エンドポイントの仕様\nリクエスト・レスポンス例"]
    ROOT --> GUIDE["📚 ガイド・チュートリアル\nユースケース別の実装例\nトラブルシューティング"]
    ROOT --> INTER["🖥️ インタラクティブ機能\nSwagger UI / ReDoc\nブラウザ上でAPI試行"]
    ROOT --> SDK["🛠️ SDK・コードサンプル\n主要言語のSDK提供\nPython / JS / Java / Go"]
    ROOT --> CHANGE["📋 変更履歴\nChangelog（変更記録）\n廃止のアナウンスと移行ガイド"]
    style ROOT fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style QS fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style REF fill:#1e3a5f,color:#94a3b8,stroke:#64748b
    style GUIDE fill:#2d1a4a,color:#c4b5fd,stroke:#7c3aed
    style INTER fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style SDK fill:#1e2a3a,color:#93c5fd,stroke:#3b82f6
    style CHANGE fill:#0d1b2e,color:#94a3b8,stroke:#64748b`,

  d20: `graph TD
    subgraph REST_BOX["🌐 REST API"]
        R1["リソース中心の設計\nURL + HTTP メソッド"]
        R2["JSONレスポンス\nOver-fetching / Under-fetchingが発生"]
        R3["ブラウザ・モバイルに最適\nキャッシュがしやすい"]
        R4["📌 用途：公開API・Web/モバイルアプリ\nシンプルなCRUD"]
    end
    subgraph GQL_BOX["🔮 GraphQL"]
        G1["クエリ言語で取得内容を指定\n必要なフィールドだけ取得"]
        G2["単一エンドポイント\nPOST /graphql"]
        G3["N+1問題を解決\n複雑な関連データを1回のリクエストで"]
        G4["📌 用途：複雑なデータグラフ・BFF\nモバイルアプリ最適化"]
    end
    subgraph GRPC_BOX["⚡ gRPC"]
        P1["Protocol Buffers（バイナリ）\n高速・型安全"]
        P2["双方向ストリーミング対応\nHTTP/2ベース"]
        P3["サーバー間通信に最適"]
        P4["📌 用途：マイクロサービス間通信\n低レイテンシが必要なAPI"]
    end
    style REST_BOX fill:#1e3a5f,stroke:#00d4ff
    style GQL_BOX fill:#2d0a0a,stroke:#ef4444
    style GRPC_BOX fill:#0a2d1a,stroke:#10b981`,

  d21: `flowchart TD
    START["APIの方式を選ぶ"]
    Q1{"外部・公開APIか？\nサードパーティ連携あり？"}
    Q2{"マイクロサービス間の\n内部通信か？"}
    Q3{"クライアントのデータ取得が\n複雑か？（関連データが多い）"}
    Q4{"低レイテンシ・高スループットが\n最優先か？"}
    REST_REC["✅ REST が最適\n最も普及・学習コスト低\nツールが豊富"]
    GRPC_REC["✅ gRPC が最適\nバイナリで高速\n型安全・ストリーミング対応"]
    GQL_REC["✅ GraphQL が最適\n柔軟なデータ取得\nOver/Under-fetchingを解消"]
    REST2["✅ REST も選択肢\nシンプルならRESTで十分"]
    START --> Q1
    Q1 -->|Yes| REST_REC
    Q1 -->|No| Q2
    Q2 -->|Yes| Q4
    Q4 -->|Yes| GRPC_REC
    Q4 -->|No| Q3
    Q2 -->|No| Q3
    Q3 -->|Yes| GQL_REC
    Q3 -->|No| REST2
    style REST_REC fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style GRPC_REC fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style GQL_REC fill:#2d0a0a,color:#fca5a5,stroke:#ef4444
    style REST2 fill:#0d1b2e,color:#94a3b8,stroke:#64748b`,

  d22: `graph TD
    subgraph CLIENTS["クライアント"]
        WEB2["🌐 Web（React）"]
        IOS["📱 iOS App"]
        AND["🤖 Android App"]
        PART["🤝 パートナーシステム"]
    end
    subgraph GW2["API Gateway層"]
        APIGW["🚪 API Gateway\n認証・レート制限・ロギング"]
        WBFF["🔵 Web BFF\n/api/web/v1"]
        MBFF["🟢 Mobile BFF\n/api/mobile/v1"]
        PAPI["🟡 Partner API\n/api/partner/v1"]
    end
    subgraph SVCS2["マイクロサービスAPI群"]
        ORDS["📦 注文API\nPOST /orders\nGET /orders/{id}"]
        PRODS["🛍️ 商品API\nGET /products\nGET /products/search"]
        USERS["👤 ユーザーAPI\nPOST /users\nGET /users/{id}"]
        PAYS["💳 決済API\nPOST /payments\nPOST /payments/{id}/refund"]
        INVS["📊 在庫API\nGET /inventory/{product_id}"]
    end
    WEB2 & IOS & AND & PART --> APIGW
    APIGW --> WBFF & MBFF & PAPI
    WBFF --> ORDS & PRODS & USERS
    MBFF --> ORDS & PRODS
    PAPI --> ORDS & INVS
    ORDS --> PAYS
    style APIGW fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style WBFF fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style MBFF fill:#0a2d1a,color:#6ee7b7,stroke:#10b981`,

  d23: `sequenceDiagram
    participant CLIENT as クライアント
    participant GW as API Gateway
    participant AUTH as 認証サービス
    participant ORDERS as 注文API
    participant INV as 在庫API
    participant PAY as 決済API
    participant NOTIFY as 通知API
    CLIENT->>GW: POST /v1/orders<br/>Authorization: Bearer jwt_token
    GW->>AUTH: JWTトークン検証
    AUTH-->>GW: ✅ 認証OK (customer_id: cust_123)
    GW->>ORDERS: POST /orders (内部転送)
    ORDERS->>ORDERS: リクエストバリデーション
    ORDERS->>INV: GET /inventory/prod_001
    INV-->>ORDERS: {available: 50} ✅
    ORDERS->>ORDERS: 注文レコード作成 (PENDING)
    ORDERS->>PAY: POST /payments {order_id, amount: 15000}
    PAY-->>ORDERS: {payment_id, status: processing}
    ORDERS->>ORDERS: 注文ステータス → CONFIRMED
    ORDERS->>NOTIFY: POST /notifications (非同期)
    ORDERS-->>GW: 201 Created {order_id, status: confirmed}
    GW-->>CLIENT: 201 Created ✅
    GW-->>CLIENT: 201 Created ✅`,

  d24: `flowchart LR
    subgraph V1["v1 API（初期設計）"]
        V1E["POST /api/v1/orders\nGET /api/v1/orders/:id"]
        V1N["問題点:\n・レスポンスが過剰\n・N+1クエリが多発\n・エラー形式が不統一"]
    end
    MIGRATE["🔄 問題を整理\n→ v2設計に反映"]
    subgraph V2["v2 API（改善版）"]
        V2E["POST /api/v2/orders\nGET /api/v2/orders/:id\n?include=items,customer\n?fields=id,status,total_amount"]
        V2N["改善点:\n・fields/includeで通信最適化\n・エラーコード体系整備\n・カーソルページネーション導入"]
    end
    V1 --> MIGRATE --> V2
    style V1 fill:#2d0a0a,stroke:#ef4444
    style V2 fill:#0a2d1a,stroke:#10b981
    style MIGRATE fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b`,

  d25: `flowchart LR
    M1["Month 1\n🎓 基礎整備\n・OpenAPI仕様書の書き方学習\n・チームでの設計レビュー実践\n・Swagger UI導入"]
    M2["Month 2\n🛠️ 自動化\n・Prismでモックサーバー構築\n・Contract Testの導入\n・CI/CDにAPI仕様チェック追加"]
    M3["Month 3\n📊 品質向上\n・APIガイドライン策定\n・SDK自動生成パイプライン\n・開発者向けドキュメント整備"]
    M4["Month 4-6\n🚀 スケール\n・全チームへのAPI-First展開\n・開発者ポータル構築\n・APIガバナンス体制確立"]
    M1 --> M2 --> M3 --> M4
    style M1 fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style M2 fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style M3 fill:#2d1a0a,color:#fcd34d,stroke:#f59e0b
    style M4 fill:#2d1a4a,color:#c4b5fd,stroke:#7c3aed`,

  d26: `graph TD
    subgraph A1["❌ Anti-Pattern 1: Code-First"]
        P1["実装してからAPI仕様を後付けする<br/>ドキュメントは常に古くなる"]
        F1["✅ 解決：実装前にOpenAPI仕様を書く<br/>仕様承認後に実装を開始する"]
    end
    subgraph A2["❌ Anti-Pattern 2: RPC Style REST"]
        P2["URLに動詞を含める<br/>-getOrders -createUser -deleteProduct"]
        F2["✅ 解決：リソース名+HTTPメソッドで表現<br/>GET -orders | POST -users"]
    end
    subgraph A3["❌ Anti-Pattern 3: Chatty API"]
        P3["1画面の表示に10回のAPIコールが必要<br/>フロントエンドでN+1問題が発生"]
        F3["✅ 解決：BFFパターンでデータを集約<br/>?include=でまとめて取得"]
    end
    subgraph A4["❌ Anti-Pattern 4: Versioning Neglect"]
        P4["バージョンなしで破壊的変更<br/>既存クライアントが突然壊れる"]
        F4["✅ 解決：変更前に必ずv2を作成<br/>移行期間 (6ヶ月以上) を設ける"]
    end
    subgraph A5["❌ Anti-Pattern 5: Generic Error"]
        P5["すべて Internal Server Error<br/>調査・デバッグが不可能"]
        F5["✅ 解決：エラーコード体系を設計<br/>trace_idと詳細情報を必ず含める"]
    end
    style A1 fill:#1a0a0a,stroke:#ef4444
    style A2 fill:#1a0a0a,stroke:#ef4444
    style A3 fill:#1a0a0a,stroke:#ef4444
    style A4 fill:#1a0a0a,stroke:#ef4444
    style A5 fill:#1a0a0a,stroke:#ef4444`,

  d27: `flowchart TD
    CHECK["🔍 API設計の健全性セルフチェック"]
    Q1{"OpenAPI仕様書が<br/>実装より先に作成されているか？"}
    Q2{"URLに動詞 (create, get, delete) が<br/>含まれていないか？"}
    Q3{"1画面の表示に必要な<br/>APIコール数は3回以内か？"}
    Q4{"エラーレスポンスに<br/>機械可読なコードが含まれるか？"}
    Q5{"バージョニング戦略が<br/>定義されているか？"}
    FIX1["📄 設計優先プロセスに変更<br/>仕様レビューを必須工程に"]
    FIX2["🔄 リソース+HTTPメソッド設計に改める"]
    FIX3["📦 BFFまたは?includeで集約"]
    FIX4["⚠️ エラーコード体系を設計する"]
    FIX5["📋 バージョニングポリシーを策定"]
    HEALTHY["✅ 健全なAPI-Firstプロジェクト"]
    CHECK --> Q1
    Q1 -->|No| FIX1
    Q1 -->|Yes| Q2
    Q2 -->|No| FIX2
    Q2 -->|Yes| Q3
    Q3 -->|No| FIX3
    Q3 -->|Yes| Q4
    Q4 -->|No| FIX4
    Q4 -->|Yes| Q5
    Q5 -->|No| FIX5
    Q5 -->|Yes| HEALTHY
    style HEALTHY fill:#0a2d1a,color:#6ee7b7,stroke:#10b981
    style FIX1 fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style FIX2 fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style FIX3 fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style FIX4 fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff
    style FIX5 fill:#1e3a5f,color:#60d0f0,stroke:#00d4ff`,
};

const CODE_BLOCKS = {
  code1: `<span class="kw">openapi</span>: <span class="st">3.1.0</span>
<span class="kw">info</span>:
  <span class="kw">title</span>: <span class="st">ECサイト 注文管理API</span>
  <span class="kw">version</span>: <span class="st">2.0.0</span>
  <span class="kw">description</span>: <span class="st">|
    ECサイトの注文管理に関するAPI仕様です。
    注文の作成・取得・キャンセルを提供します。</span>
  <span class="kw">contact</span>:
    <span class="kw">name</span>: <span class="st">APIサポートチーム</span>
    <span class="kw">email</span>: <span class="st">api-support@example.com</span>

<span class="kw">servers</span>:
  - <span class="kw">url</span>: <span class="st">https://api.example.com/v2</span>
    <span class="kw">description</span>: <span class="st">本番環境</span>
  - <span class="kw">url</span>: <span class="st">http://localhost:8080/v2</span>
    <span class="kw">description</span>: <span class="st">ローカル開発環境</span>

<span class="kw">security</span>:
  - <span class="kw">BearerAuth</span>: []   <span class="cm"># 全エンドポイントにJWT認証を適用</span>

<span class="kw">paths</span>:
  <span class="kw">/orders</span>:
    <span class="kw">get</span>:
      <span class="kw">tags</span>: [orders]
      <span class="kw">summary</span>: <span class="st">注文一覧取得</span>
      <span class="kw">operationId</span>: <span class="fn">listOrders</span>
      <span class="kw">parameters</span>:
        - <span class="kw">name</span>: <span class="st">status</span>
          <span class="kw">in</span>: <span class="st">query</span>
          <span class="kw">schema</span>:
            <span class="kw">type</span>: <span class="st">string</span>
            <span class="kw">enum</span>: [pending, confirmed, shipped, delivered, cancelled]
        - <span class="kw">name</span>: <span class="st">page</span>
          <span class="kw">in</span>: <span class="st">query</span>
          <span class="kw">schema</span>: { <span class="kw">type</span>: integer, <span class="kw">default</span>: <span class="nu">1</span> }
      <span class="kw">responses</span>:
        <span class="st">"200"</span>:
          <span class="kw">description</span>: <span class="st">成功</span>
          <span class="kw">content</span>:
            <span class="kw">application/json</span>:
              <span class="kw">schema</span>:
                <span class="kw">$ref</span>: <span class="st">"#/components/schemas/OrderListResponse"</span>
        <span class="st">"401"</span>:
          <span class="kw">$ref</span>: <span class="st">"#/components/responses/Unauthorized"</span>

    <span class="kw">post</span>:
      <span class="kw">tags</span>: [orders]
      <span class="kw">summary</span>: <span class="st">注文作成</span>
      <span class="kw">operationId</span>: <span class="fn">createOrder</span>
      <span class="kw">requestBody</span>:
        <span class="kw">required</span>: <span class="kw">true</span>
        <span class="kw">content</span>:
          <span class="kw">application/json</span>:
            <span class="kw">schema</span>:
              <span class="kw">$ref</span>: <span class="st">"#/components/schemas/CreateOrderRequest"</span>
      <span class="kw">responses</span>:
        <span class="st">"201"</span>:
          <span class="kw">description</span>: <span class="st">注文作成成功</span>
          <span class="kw">content</span>:
            <span class="kw">application/json</span>:
              <span class="kw">schema</span>:
                <span class="kw">$ref</span>: <span class="st">"#/components/schemas/Order"</span>
        <span class="st">"400"</span>:
          <span class="kw">$ref</span>: <span class="st">"#/components/responses/BadRequest"</span>
        <span class="st">"422"</span>:
          <span class="kw">$ref</span>: <span class="st">"#/components/responses/UnprocessableEntity"</span>

<span class="kw">components</span>:
  <span class="kw">securitySchemes</span>:
    <span class="kw">BearerAuth</span>:
      <span class="kw">type</span>: <span class="st">http</span>
      <span class="kw">scheme</span>: <span class="st">bearer</span>
      <span class="kw">bearerFormat</span>: <span class="st">JWT</span>

  <span class="kw">schemas</span>:
    <span class="kw">Order</span>:
      <span class="kw">type</span>: <span class="st">object</span>
      <span class="kw">required</span>: [id, customer_id, status, total_amount, created_at]
      <span class="kw">properties</span>:
        <span class="kw">id</span>:          { <span class="kw">type</span>: string, <span class="kw">example</span>: <span class="st">"order_abc123"</span> }
        <span class="kw">customer_id</span>: { <span class="kw">type</span>: string, <span class="kw">example</span>: <span class="st">"cust_12345"</span> }
        <span class="kw">status</span>:
          <span class="kw">type</span>: <span class="st">string</span>
          <span class="kw">enum</span>: [pending, confirmed, shipped, delivered, cancelled]
        <span class="kw">total_amount</span>:
          <span class="kw">type</span>: <span class="st">integer</span>
          <span class="kw">description</span>: <span class="st">合計金額（円）</span>
          <span class="kw">example</span>: <span class="nu">15000</span>
        <span class="kw">created_at</span>:
          <span class="kw">type</span>: <span class="st">string</span>
          <span class="kw">format</span>: <span class="st">date-time</span>

    <span class="kw">ErrorResponse</span>:
      <span class="kw">type</span>: <span class="st">object</span>
      <span class="kw">properties</span>:
        <span class="kw">error</span>:
          <span class="kw">type</span>: <span class="st">object</span>
          <span class="kw">properties</span>:
            <span class="kw">code</span>:    { <span class="kw">type</span>: string, <span class="kw">example</span>: <span class="st">"VALIDATION_ERROR"</span> }
            <span class="kw">message</span>: { <span class="kw">type</span>: string, <span class="kw">example</span>: <span class="st">"入力値に誤りがあります"</span> }
            <span class="kw">details</span>:
              <span class="kw">type</span>: <span class="st">array</span>
              <span class="kw">items</span>:
                <span class="kw">type</span>: <span class="st">object</span>
                <span class="kw">properties</span>:
                  <span class="kw">field</span>:   { <span class="kw">type</span>: string }
                  <span class="kw">message</span>: { <span class="kw">type</span>: string }

  <span class="kw">responses</span>:
    <span class="kw">BadRequest</span>:
      <span class="kw">description</span>: <span class="st">リクエスト不正</span>
      <span class="kw">content</span>:
        <span class="kw">application/json</span>:
          <span class="kw">schema</span>: { <span class="kw pattern">$ref</span>: <span class="st">"#/components/schemas/ErrorResponse"</span> }
    <span class="kw">Unauthorized</span>:
      <span class="kw">description</span>: <span class="st">認証エラー</span>
      <span class="kw">content</span>:
        <span class="kw">application/json</span>:
          <span class="kw">schema</span>: { <span class="kw">"$ref"</span>: <span class="st">"#/components/schemas/ErrorResponse"</span> }
    <span class="kw">UnprocessableEntity</span>:
      <span class="kw">description</span>: <span class="st">ビジネスルール違反</span>
      <span class="kw">content</span>:
        <span class="kw">application/json</span>:
          <span class="kw">schema</span>: { <span class="kw">"$ref"</span>: <span class="st">"#/components/schemas/ErrorResponse"</span> }`,

  code2: `<span class="kw">import</span> jwt
<span class="kw">from</span> fastapi <span class="kw">import</span> Depends, HTTPException, status
<span class="kw">from</span> fastapi.security <span class="kw">import</span> HTTPBearer, HTTPAuthorizationCredentials

security = <span class="fn">HTTPBearer</span>()

<span class="kw">def</span> <span class="fn">verify_token</span>(credentials: HTTPAuthorizationCredentials = <span class="fn">Depends</span>(security)):
    <span class="cm"># JWTトークンを検証してペイロードを返す</span>
    token = credentials.credentials
    <span class="kw">try</span>:
        payload = jwt.<span class="fn">decode</span>(
            token,
            key=PUBLIC_KEY,           <span class="cm"># RSA公開鍵</span>
            algorithms=[<span class="st">"RS256"</span>],     <span class="cm"># 署名アルゴリズム</span>
            options={<span class="st">"verify_exp"</span>: <span class="kw">True</span>}  <span class="cm"># 有効期限を検証</span>
        )
        <span class="kw">if</span> <span class="st">"read:orders"</span> <span class="kw">not in</span> payload.<span class="fn">get</span>(<span class="st">"scope"</span>, <span class="st">""</span>).<span class="fn">split</span>():
            <span class="kw">raise</span> <span class="fn">HTTPException</span>(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={<span class="st">"error"</span>: {<span class="st">"code"</span>: <span class="st">"AUTH_PERMISSION_DENIED"</span>,
                                  <span class="st">"message"</span>: <span class="st">"注文の読み取り権限がありません"</span>}}
            )
        <span class="kw">return</span> payload
    <span class="kw">except</span> jwt.ExpiredSignatureError:
        <span class="kw">raise</span> <span class="fn">HTTPException</span>(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={<span class="st">"error"</span>: {<span class="st">"code"</span>: <span class="st">"AUTH_TOKEN_EXPIRED"</span>,
                              <span class="st">"message"</span>: <span class="st">"トークンの有効期限が切れています"</span>}}
        )`,

  code3: `{
  <span class="kw">"error"</span>: {
    <span class="kw">"code"</span>: <span class="st">"VALIDATION_ERROR"</span>,
    <span class="kw">"message"</span>: <span class="st">"入力値に誤りがあります"</span>,
    <span class="kw">"details"</span>: [
      { <span class="kw">"field"</span>: <span class="st">"items"</span>, <span class="kw">"message"</span>: <span class="st">"1件以上の商品を指定してください"</span> },
      { <span class="kw">"field"</span>: <span class="st">"shipping_address.postal_code"</span>, <span class="kw">"message"</span>: <span class="st">"郵便番号の形式が正しくありません"</span> }
    ],
    <span class="kw">"trace_id"</span>: <span class="st">"req_3kLm9xQr7pNv2Yt"</span>
  }
}`,

  code4: `<span class="kw">from</span> fastapi <span class="kw">import</span> FastAPI
<span class="kw">from</span> fastapi.responses <span class="kw">import</span> JSONResponse
<span class="kw">from</span> fastapi.exceptions <span class="kw">import</span> RequestValidationError
<span class="kw">import</span> uuid

app = <span class="fn">FastAPI</span>()

@app.<span class="fn">exception_handler</span>(RequestValidationError)
<span class="kw">async def</span> <span class="fn">validation_exception_handler</span>(request, exc: RequestValidationError):
    <span class="cm"># バリデーションエラーを統一フォーマットに変換</span>
    details = []
    <span class="kw">for</span> error <span class="kw">in</span> exc.<span class="fn">errors</span>():
        details.<span class="fn">append</span>({
            <span class="st">"field"</span>: <span class="st">"..."</span>.<span class="fn">join</span>(<span class="fn">str</span>(loc) <span class="kw">for</span> loc <span class="kw">in</span> error[<span class="st">"loc"</span>][<span class="nu">1</span>:]),
            <span class="st">"message"</span>: error[<span class="st">"msg"</span>]
        })
    <span class="kw">return</span> <span class="fn">JSONResponse</span>(
        status_code=<span class="nu">422</span>,
        content={<span class="st">"error"</span>: {
            <span class="st">"code"</span>: <span class="st">"VALIDATION_ERROR"</span>,
            <span class="st">"message"</span>: <span class="st">"入力値に誤りがあります"</span>,
            <span class="st">"details"</span>: details,
            <span class="st">"trace_id"</span>: <span class="st">f"req_{uuid.uuid4().hex[:16]}"</span>
        }}
    )

<span class="kw">class</span> <span class="fn">DomainError</span>(Exception):
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, code: str, message: str, status_code: int = <span class="nu">422</span>):
        <span class="kw">self</span>.code = code
        <span class="kw">self</span>.message = message
        <span class="kw">self</span>.status_code = status_code

@app.<span class="fn">exception_handler</span>(DomainError)
<span class="kw">async def</span> <span class="fn">domain_error_handler</span>(request, exc: DomainError):
    <span class="kw">return</span> <span class="fn">JSONResponse</span>(
        status_code=exc.status_code,
        content={<span class="st">"error"</span>: {
            <span class="st">"code"</span>: exc.code,
            <span class="st">"message"</span>: exc.message,
            <span class="st">"trace_id"</span>: <span class="st">f"req_{uuid.uuid4().hex[:16]}"</span>
        }}
    )`,

  code5: `<span class="cm"># フィルタリング</span>
<span class="kw">GET</span> <span class="st">/orders?status=shipped</span>
<span class="kw">GET</span> <span class="st">/orders?created_after=2024-01-01&amp;created_before=2024-12-31</span>

<span class="cm"># ソート（マイナスプレフィックスで降順）</span>
<span class="kw">GET</span> <span class="st">/orders?sort=-created_at</span>
<span class="kw">GET</span> <span class="st">/orders?sort=status,-created_at</span>    <span class="cm"># 複数条件</span>

<span class="cm"># フィールド選択（必要フィールドのみ取得して通信量削減）</span>
<span class="kw">GET</span> <span class="st">/orders?fields=id,status,total_amount</span>

<span class="cm"># 関連リソースの展開（N+1問題を回避）</span>
<span class="kw">GET</span> <span class="st">/orders?include=items,customer</span>

<span class="cm"># カーソルページネーションのレスポンス例</span>
{
  <span class="kw">"data"</span>: [...],
  <span class="kw">"pagination"</span>: {
    <span class="kw">"next_cursor"</span>: <span class="st">"eyJpZCI6MTIwfQ"</span>,
    <span class="kw">"has_next"</span>: <span class="kw">true</span>,
    <span class="kw">"has_prev"</span>: <span class="kw">false</span>,
    <span class="kw">"per_page"</span>: <span class="nu">20</span>
  }
}`,

  code6: `<span class="kw">HTTP/1.1</span> <span class="nu">200</span> <span class="st">OK</span>
<span class="kw">X-RateLimit-Limit</span>: <span class="nu">1000</span>          <span class="cm"># 期間内の最大リクエスト数</span>
<span class="kw">X-RateLimit-Remaining</span>: <span class="nu">756</span>       <span class="cm"># 残リクエスト数</span>
<span class="kw">X-RateLimit-Reset</span>: <span class="nu">1700000060</span>    <span class="cm"># リセット時刻（UNIXタイムスタンプ）</span>

<span class="cm"># 制限超過時（429 Too Many Requests）</span>
<span class="kw">HTTP/1.1</span> <span class="nu">429</span> <span class="st">Too Many Requests</span>
<span class="kw">Retry-After</span>: <span class="nu">30</span>                  <span class="cm"># 30秒後に再試行可能</span>
<span class="kw">X-RateLimit-Remaining</span>: <span class="nu">0</span>`,

  code7: `<span class="kw">import</span> pytest
<span class="kw">import</span> httpx

BASE_URL = <span class="st">"http://test"</span>

<span class="kw">class</span> <span class="fn">TestOrderAPI</span>:
    <span class="cm"># 注文APIの統合テスト（実際のHTTPリクエストを使用）</span>

    @pytest.fixture
    <span class="kw">async def</span> <span class="fn">client</span>(<span class="kw">self</span>, app):
        <span class="kw">async with</span> httpx.<span class="fn">AsyncClient</span>(app=app, base_url=BASE_URL) <span class="kw">as</span> c:
            <span class="kw">yield</span> c

    @pytest.fixture
    <span class="kw">def</span> <span class="fn">auth_headers</span>(<span class="kw">self</span>):
        <span class="kw">return</span> {<span class="st">"Authorization"</span>: <span class="st">"Bearer test_jwt_token"</span>}

    <span class="kw">async def</span> <span class="fn">test_create_order_returns_201</span>(<span class="kw">self</span>, client, auth_headers):
        <span class="cm"># 正常系：注文作成が201を返すこと</span>
        payload = {
            <span class="st">"customer_id"</span>: <span class="st">"cust_123"</span>,
            <span class="st">"items"</span>: [{<span class="st">"product_id"</span>: <span class="st">"prod_001"</span>, <span class="st">"quantity"</span>: <span class="nu">2</span>}],
            <span class="st">"shipping_address"</span>: {
                <span class="st">"postal_code"</span>: <span class="st">"150-0001"</span>,
                <span class="st">"prefecture"</span>: <span class="st">"東京都"</span>,
                <span class="st">"city"</span>: <span class="st">"渋谷区"</span>,
                <span class="st">"street"</span>: <span class="st">"神宮前1-1-1"</span>
            }
        }
        response = <span class="kw">await</span> client.<span class="fn">post</span>(<span class="st">"/v1/orders"</span>, json=payload, headers=auth_headers)
        <span class="kw">assert</span> response.status_code == <span class="nu">201</span>
        data = response.<span class="fn">json</span>()
        <span class="kw">assert</span> data[<span class="st">"status"</span>] == <span class="st">"pending"</span>
        <span class="kw">assert</span> data[<span class="st">"customer_id"</span>] == <span class="st">"cust_123"</span>
        <span class="kw">assert</span> <span class="st">"id"</span> <span class="kw">in</span> data

    <span class="kw">async def</span> <span class="fn">test_get_order_returns_404_for_unknown_id</span>(<span class="kw">self</span>, client, auth_headers):
        <span class="cm"># 異常系：存在しないIDで404が返ること</span>
        response = <span class="kw">await</span> client.<span class="fn">get</span>(<span class="st">"/v1/orders/nonexistent"</span>, headers=auth_headers)
        <span class="kw">assert</span> response.status_code == <span class="nu">404</span>
        error = response.<span class="fn">json</span>()[<span class="st">"error"</span>]
        <span class="kw">assert</span> error[<span class="st">"code"</span>] == <span class="st">"NOT_FOUND"</span>

    <span class="kw">async def</span> <span class="fn">test_create_order_returns_422_with_details</span>(<span class="kw">self</span>, client, auth_headers):
        <span class="cm"># バリデーション：詳細情報付き422が返ること</span>
        payload = {<span class="st">"customer_id"</span>: <span class="st">""</span>, <span class="st">"items"</span>: []}  <span class="cm"># 空の値（NG）</span>
        response = <span class="kw">await</span> client.<span class="fn">post</span>(<span class="st">"/v1/orders"</span>, json=payload, headers=auth_headers)
        <span class="kw">assert</span> response.status_code == <span class="nu">422</span>
        error = response.<span class="fn">json</span>()[<span class="st">"error"</span>]
        <span class="kw">assert</span> error[<span class="st">"code"</span>] == <span class="st">"VALIDATION_ERROR"</span>
        <span class="kw">assert</span> <span class="fn">len</span>(error[<span class="st">"details"</span>]) &gt;= <span class="nu">2</span>  <span class="cm"># 複数エラーが返る</span>

    <span class="kw">async def</span> <span class="fn">test_unauthorized_without_token</span>(<span class="kw">self</span>, client):
        <span class="cm"># 認証：トークンなしで401が返ること</span>
        response = <span class="kw">await</span> client.<span class="fn">get</span>(<span class="st">"/v1/orders"</span>)
        <span class="kw">assert</span> response.status_code == <span class="nu">401</span>`,
};

export default function Page() {
  return (
    <div className="api-first-design-comprehensive-guide">
      {/* ═══════════════ SIDEBAR ═══════════════ */}
      <ApiFirstSidebar groups={NAV_GROUPS} />

      {/* ═══════════════ MAIN ═══════════════ */}
      <main className="main">
        {/* Hero */}
        <div className="hero">
          <div className="hero-badge">🚀 Software Architecture Guide</div>
          <h1>
            API-First設計
            <br />
            完全ガイド
          </h1>
          <p className="hero-subtitle">
            「コードより先にAPIを設計する」——この一文がソフトウェア開発の哲学を変えます。
            本ガイドでは<strong>OpenAPI仕様の書き方</strong>から<strong>RESTful設計原則</strong>、
            <strong>バージョニング戦略</strong>、<strong>テスト・認証・GraphQL比較</strong>まで、
            初学者でも迷わず実践できるようステップバイステップで解説します。
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">16</span>
              <span className="stat-label">学習セクション</span>
            </div>
            <div className="stat">
              <span className="stat-num">27</span>
              <span className="stat-label">アーキテクチャ図</span>
            </div>
            <div className="stat">
              <span className="stat-num">50+</span>
              <span className="stat-label">ベストプラクティス</span>
            </div>
            <div className="stat">
              <span className="stat-num">40+</span>
              <span className="stat-label">参照ソースURL</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {/* SECTION 1 */}
          <section className="section" id="sec1">
            <div className="section-header">
              <div className="section-num">1</div>
              <h2 className="section-title">API-Firstとは何か？</h2>
            </div>

            <div className="highlight-box">
              <h4>💡 核心思想</h4>
              <p>
                「<strong>APIは製品である</strong>
                。コードを書く前に、APIという&quot;契約&quot;を設計し、全チームがその契約に合意してから開発をはじめる」——これがAPI-Firstの本質です。実装より先にAPIの仕様を確定させることで、フロントエンドとバックエンドが並行して開発できます。
              </p>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">1.1</span>従来の開発 vs API-First
            </h3>
            <p>
              従来の「コードファースト」開発では、バックエンドが実装を完成させてからフロントエンドが統合を始めるため、認識齟齬による手戻りが頻発します。API-Firstでは
              <strong>仕様という共通言語</strong>を先に定義することでこの問題を根本から解決します。
            </p>

            <div className="diag-wrap">
              <div className="diag-title">従来のコードファースト vs API-Firstアプローチの比較</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d01} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">1.2</span>API-Firstが解決する4つの問題
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">API-First導入前の問題 → 導入後の効果</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d02} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">1.3</span>API-Firstが特に適しているケース
            </h3>
            <div className="card-grid">
              <div className="card">
                <h4>🏗️ マイクロサービス開発</h4>
                <p>
                  複数チームが並行して異なるサービスを開発する場合、サービス間のインターフェースをAPIとして事前に定義することで、各チームが独立してデプロイできるようになります。
                </p>
              </div>
              <div className="card">
                <h4>🌐 外部API公開</h4>
                <p>
                  サードパーティ企業やパートナーとの連携、パブリックAPIプラットフォームの構築において、一貫した設計と充実したドキュメントが開発者体験（DX）を左右します。
                </p>
              </div>
              <div className="card">
                <h4>📱 マルチクライアント対応</h4>
                <p>
                  iOS・Android・Web（SPA）を同一チームまたは別々のチームが開発する場合、共通のAPIを事前に定義することでリソースの重複を防ぎます。
                </p>
              </div>
              <div className="card">
                <h4>🏪 プラットフォームビジネス</h4>
                <p>
                  APIをビジネスの中核に据えるエコシステム戦略や、APIマネタイズ（従量課金・サブスクリプション）を行う場合に特に有効です。
                </p>
              </div>
            </div>

            <div className="callout callout-info">
              <div className="callout-icon">📚</div>
              <div className="callout-body">
                <h4>参考ソース</h4>
                <p>
                  API-Firstの概念の詳細は{" "}
                  <Ext href="https://swagger.io/resources/articles/adopting-an-api-first-approach/">
                    Swagger: Adopting an API-First Approach
                  </Ext>{" "}
                  および{" "}
                  <Ext href="https://stoplight.io/blog/api-first-vs-api-design-first">Stoplight: What is API-First?</Ext>{" "}
                  を参照してください。
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="section" id="sec2">
            <div className="section-header">
              <div className="section-num">2</div>
              <h2 className="section-title">API-Firstの開発フロー</h2>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">2.1</span>全体プロセス：6ステップで並行開発へ
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">
                API-First開発の全体プロセス（要件定義 → デプロイまで）
              </div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d03} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">2.2</span>API設計フェーズの6ステップ
            </h3>
            <p>
              API設計は「最初に何を、どの順番で決めるか」が重要です。以下の順序で進めることで、後から手戻りが発生しにくい設計ができます。
            </p>
            <div className="steps">
              <div className="step-card">
                <div className="step-n">01</div>
                <h4>📦 リソースを特定する</h4>
                <p>扱うデータの種類を列挙する。例：Order, Product, Customer</p>
              </div>
              <div className="step-card">
                <div className="step-n">02</div>
                <h4>🔗 エンドポイントを設計する</h4>
                <p>
                  URL・HTTPメソッドを決める。例：<code>GET /orders/{"{id}"}</code>
                </p>
              </div>
              <div className="step-card">
                <div className="step-n">03</div>
                <h4>📐 データモデルを定義する</h4>
                <p>リクエスト・レスポンスのスキーマを設計する</p>
              </div>
              <div className="step-card">
                <div className="step-n">04</div>
                <h4>⚠️ エラーケースを洗い出す</h4>
                <p>HTTPステータスとエラー形式を統一する</p>
              </div>
              <div className="step-card">
                <div className="step-n">05</div>
                <h4>🔒 認証方式を決める</h4>
                <p>OAuth2 / API Key / JWT などを選定する</p>
              </div>
              <div className="step-card">
                <div className="step-n">06</div>
                <h4>📄 OpenAPI仕様に落とす</h4>
                <p>YAML形式で仕様を文書化する</p>
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">2.3</span>モックサーバーを使った並行開発
            </h3>
            <p>
              仕様書を作成したら<strong>Prism</strong>や<strong>Stoplight</strong>
              などのツールでモックサーバーを即時起動できます。フロントエンドチームはモックに向けて開発を進め、バックエンドが本番APIを実装します。統合時の齟齬が激減します。
            </p>
            <div className="diag-wrap">
              <div className="diag-title">モックサーバーを活用した並行開発のシーケンス図</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d04} />
              </div>
            </div>

            <div className="callout callout-success">
              <div className="callout-icon">🛠️</div>
              <div className="callout-body">
                <h4>モックサーバー推奨ツール</h4>
                <p>
                  <strong>Prism</strong>（
                  <Ext href="https://stoplight.io/open-source/prism">
                    stoplight.io/open-source/prism
                  </Ext>
                  ）：OpenAPI仕様から即時モックサーバーを生成。コマンド1行で起動可能。
                  <br />
                  <strong>Stoplight Studio</strong>（
                  <Ext href="https://stoplight.io/">stoplight.io</Ext>
                  ）：GUI付きのAPI設計ツール。チームコラボレーション機能あり。
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="section" id="sec3">
            <div className="section-header">
              <div className="section-num">3</div>
              <h2 className="section-title">OpenAPI（Swagger）仕様の完全解説</h2>
            </div>

            <p>
              OpenAPI仕様（OAS）は、RESTful
              APIの構造をYAML/JSON形式で記述するための業界標準規格です。<strong>Swagger</strong>
              はその前身であり、現在もツール群の総称として使われています。
            </p>

            <h3 className="subsec">
              <span className="subsec-num">3.1</span>OpenAPI仕様書の構造
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">openapi.yaml の主要セクション構成</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d05} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">3.2</span>ECサイト注文APIの完全YAML記述例
            </h3>
            <p>
              以下は注文管理APIのOpenAPI
              3.1.0仕様の完全記述例です。各セクションの役割をコメントと合わせて確認してください。
            </p>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">YAML (openapi.yaml)</span>
              </div>
              <pre>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block */}
                <code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code1 }} />
              </pre>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">3.3</span>OpenAPIのベストプラクティス
            </h3>
            <div className="bp-grid">
              <div className="bp-item">
                <div className="bp-icon">🔄</div>
                <div className="bp-body">
                  <h5>$ref で重複排除</h5>
                  <p>
                    同じスキーマを複数箇所で書かず、<code>components/schemas</code> に定義して{" "}
                    <code>$ref</code> で参照する
                  </p>
                </div>
              </div>
              <div className="bp-item">
                <div className="bp-icon">🔖</div>
                <div className="bp-body">
                  <h5>operationId を必ず設定</h5>
                  <p>
                    SDKや型の自動生成時にメソッド名として使われる。<code>listOrders</code>,{" "}
                    <code>createOrder</code> のように動詞+名詞で統一
                  </p>
                </div>
              </div>
              <div className="bp-item">
                <div className="bp-icon">📝</div>
                <div className="bp-body">
                  <h5>example を必ず記述</h5>
                  <p>
                    モックサーバーがサンプルデータとして使用する。現実的な値を記述することでテストが捗る
                  </p>
                </div>
              </div>
              <div className="bp-item">
                <div className="bp-icon">⚠️</div>
                <div className="bp-body">
                  <h5>エラーレスポンスを全パス定義</h5>
                  <p>
                    401/403/404/422
                    など、各エンドポイントで起きうる全エラーをレスポンスとして明記する
                  </p>
                </div>
              </div>
            </div>

            <div className="callout callout-info">
              <div className="callout-icon">🔗</div>
              <div className="callout-body">
                <h4>公式リソース</h4>
                <p>
                  <Ext href="https://spec.openapis.org/oas/v3.1.0">
                    OpenAPI Specification 3.1.0 公式仕様
                  </Ext>{" "}
                  ／{" "}
                  <Ext href="https://editor.swagger.io/">
                    Swagger Editor（ブラウザで仕様を即編集）
                  </Ext>{" "}
                  ／{" "}
                  <Ext href="https://redocly.github.io/redoc/">
                    ReDoc（美しいドキュメント自動生成）
                  </Ext>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="section" id="sec4">
            <div className="section-header">
              <div className="section-num">4</div>
              <h2 className="section-title">RESTful API設計原則</h2>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">4.1</span>HTTPメソッドとCRUD操作のマッピング
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">コレクション・単一リソースへのHTTPメソッドの使い方</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d06} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">4.2</span>HTTPステータスコードの体系
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">HTTPステータスコード完全体系（2xx/3xx/4xx/5xx）</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d07} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">4.3</span>URL設計ルール：良い例 vs 悪い例
            </h3>
            <div className="comp-grid">
              <div className="comp-card good">
                <div className="comp-label">✅ 良いURL設計</div>
                <ul>
                  <li>
                    リソース名は複数形・名詞：<code>/orders</code>, <code>/products</code>
                  </li>
                  <li>
                    階層関係はパスで表現：<code>/orders/{"{id}"}/items</code>
                  </li>
                  <li>
                    アクションはHTTPメソッドで表現：<code>POST /orders</code>
                  </li>
                  <li>
                    フィルタはクエリパラメータ：<code>/orders?status=shipped</code>
                  </li>
                  <li>
                    バージョンはパスに：<code>/v1/orders</code>
                  </li>
                  <li>
                    単語区切りはハイフン：<code>/order-items</code>
                  </li>
                </ul>
              </div>
              <div className="comp-card bad">
                <div className="comp-label">❌ 悪いURL設計</div>
                <ul>
                  <li>
                    動詞をURLに含める：<code>/getOrders</code>, <code>/createOrder</code>
                  </li>
                  <li>
                    単数形を使う：<code>/order</code>, <code>/product</code>
                  </li>
                  <li>
                    過度に深い階層：
                    <code>
                      /users/{"{id}"}/orders/{"{id}"}/items/{"{id}"}/details
                    </code>
                  </li>
                  <li>
                    アクションをパスに：<code>/orders/{"{id}"}/cancel</code>
                  </li>
                  <li>
                    拡張子を含める：<code>/orders.json</code>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">4.4</span>REST成熟度モデル（Richardson Maturity Model）
            </h3>
            <p>
              <strong>Richardson Maturity Model（RMM）</strong>
              は、RESTの原則をどれだけ採用しているかを Level 0〜3
              で評価するモデルです。多くの現代APIは Level 2 を目指します。
            </p>
            <div className="diag-wrap">
              <div className="diag-title">Richardson Maturity Model - REST成熟度の4レベル</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d08} />
              </div>
            </div>
            <div className="callout callout-info">
              <div className="callout-icon">📖</div>
              <div className="callout-body">
                <h4>参考ソース</h4>
                <p>
                  <Ext href="https://martinfowler.com/articles/richardsonMaturityModel.html">
                    Martin Fowler: Richardson Maturity Model
                  </Ext>{" "}
                  ／ <Ext href="https://cloud.google.com/apis/design">Google API Design Guide</Ext>{" "}
                  ／{" "}
                  <Ext href="https://github.com/microsoft/api-guidelines">
                    Microsoft REST API Guidelines
                  </Ext>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section className="section" id="sec5">
            <div className="section-header">
              <div className="section-num">5</div>
              <h2 className="section-title">APIのバージョニング戦略</h2>
            </div>

            <p>
              APIは公開後も進化し続けます。既存クライアントを壊さずに新機能を追加するためのバージョニング戦略は、API設計の中でも特に重要なトピックです。
            </p>

            <h3 className="subsec">
              <span className="subsec-num">5.1</span>3つのバージョニング方式の比較
            </h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>方式</th>
                    <th>例</th>
                    <th>メリット</th>
                    <th>デメリット</th>
                    <th>推奨度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>URLパス</strong>
                    </td>
                    <td>
                      <code>GET /v1/orders</code>
                    </td>
                    <td>明示的・キャッシュしやすい・ブラウザで直接確認可</td>
                    <td>URLが変わる・REST的には純粋でない</td>
                    <td>
                      <span className="tag tag-good">◎ 推奨</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>HTTPヘッダー</strong>
                    </td>
                    <td>
                      <code>Accept: application/vnd.api.v2+json</code>
                    </td>
                    <td>URLがクリーン・REST的に正しい</td>
                    <td>クライアント実装が複雑・ブラウザ確認しにくい</td>
                    <td>
                      <span className="tag tag-warn">△ 中級向け</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>クエリパラメータ</strong>
                    </td>
                    <td>
                      <code>GET /orders?version=2</code>
                    </td>
                    <td>実装が簡単</td>
                    <td>キャッシュ汚染・見落としリスク</td>
                    <td>
                      <span className="tag tag-bad">✕ 非推奨</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">5.2</span>バージョンのライフサイクル
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">
                APIバージョンのライフサイクル：Alpha → Beta → GA → Deprecated → Sunset
              </div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d09} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">5.3</span>後方互換性のルール
            </h3>
            <p>
              メジャーバージョンアップ（v1→v2）を避けるため、「後方互換な変更」と「破壊的変更」を正確に区別することが重要です。
            </p>
            <div className="comp-grid">
              <div className="comp-card good">
                <div className="comp-label">✅ 後方互換な変更（安全）</div>
                <ul>
                  <li>新しいエンドポイントの追加</li>
                  <li>オプションのリクエストフィールド追加</li>
                  <li>レスポンスへの新しいフィールド追加</li>
                  <li>新しい enum 値の追加（サーバー側）</li>
                  <li>エラーコードの追加</li>
                </ul>
              </div>
              <div className="comp-card bad">
                <div className="comp-label">❌ 破壊的な変更（メジャーバージョン必要）</div>
                <ul>
                  <li>エンドポイントの削除・URL変更</li>
                  <li>必須フィールドの追加</li>
                  <li>フィールドの削除・名前変更</li>
                  <li>レスポンス型の変更（string→int）</li>
                  <li>認証方式の変更</li>
                  <li>HTTPメソッドの変更（GET→POST）</li>
                </ul>
              </div>
            </div>

            <div className="callout callout-warning">
              <div className="callout-icon">⚠️</div>
              <div className="callout-body">
                <h4>廃止（Deprecated）の通知は最低6ヶ月前に</h4>
                <p>
                  APIのバージョンを廃止する際は、<code>Deprecation</code>ヘッダーや
                  <code>Sunset</code>
                  ヘッダーをレスポンスに含め、開発者ポータルで告知を行い、移行ガイドを提供してください。突然の廃止はエコシステム全体への信頼を損ないます。
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 6 */}
          <section className="section" id="sec6">
            <div className="section-header">
              <div className="section-num">6</div>
              <h2 className="section-title">認証・認可の設計</h2>
            </div>
            <p>
              <strong>認証（Authentication）</strong>は「あなたは誰？」を確認し、
              <strong>認可（Authorization）</strong>
              は「あなたは何ができる？」を制御します。APIにとって最も重要なセキュリティレイヤーです。
            </p>

            <h3 className="subsec">
              <span className="subsec-num">6.1</span>主要な認証方式の比較
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">API認証方式の全体マップ</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d10} />
              </div>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>認証方式</th>
                    <th>仕組み</th>
                    <th>適したユースケース</th>
                    <th>注意点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>API Key</strong>
                    </td>
                    <td>
                      <code>X-API-Key: {"{key}"}</code> ヘッダーで送信
                    </td>
                    <td>内部API・シンプルなサービス</td>
                    <td>キー漏洩時のリスク大。ローテーション仕組みが必要</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Bearer Token（JWT）</strong>
                    </td>
                    <td>
                      <code>Authorization: Bearer {"{token}"}</code>
                    </td>
                    <td>モバイルアプリ・SPA</td>
                    <td>有効期限管理とリフレッシュ機構が必須</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>OAuth 2.0</strong>
                    </td>
                    <td>認可コード・クライアントクレデンシャルフロー</td>
                    <td>外部パートナー連携・公開API</td>
                    <td>実装が複雑。既存IdP of を活用を検討</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>mTLS</strong>
                    </td>
                    <td>クライアント証明書による相互認証</td>
                    <td>マイクロサービス間・金融系API</td>
                    <td>証明書管理のオーバーヘッドが大きい</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">6.2</span>OAuth 2.0 Authorization Code フロー
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">
                OAuth 2.0 Authorization Code フロー（最も安全な標準フロー）
              </div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d11} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">6.3</span>JWTの構造と検証フロー
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">JWT（JSON Web Token）の構造と検証フロー</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d12} />
              </div>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">Python (FastAPI JWT検証)</span>
              </div>
              <pre>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block */}
                <code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code2 }} />
              </pre>
            </div>
            <div className="callout callout-info">
              <div className="callout-icon">🔗</div>
              <div className="callout-body">
                <h4>参考ソース</h4>
                <p>
                  <Ext href="https://www.rfc-editor.org/rfc/rfc6749">OAuth 2.0 RFC 6749</Ext> ／{" "}
                  <Ext href="https://jwt.io/">JWT.io</Ext> ／{" "}
                  <Ext href="https://owasp.org/www-project-api-security/">
                    OWASP API Security Top 10
                  </Ext>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 7 */}
          <section className="section" id="sec7">
            <div className="section-header">
              <div className="section-num">7</div>
              <h2 className="section-title">エラーハンドリングの設計</h2>
            </div>
            <p>
              エラーレスポンスは「開発者への手紙」です。<strong>何が・なぜ・どこで</strong>
              起きたかを即座に伝えられる統一フォーマットとエラーコード体系がDX向上の鍵です。
            </p>

            <h3 className="subsec">
              <span className="subsec-num">7.1</span>統一エラーレスポンスに含める5要素
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">エラーレスポンス設計の5原則</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d13} />
              </div>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">JSON（統一エラーレスポンス形式）</span>
              </div>
              <pre>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block */}
                <code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code3 }} />
              </pre>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">7.2</span>エラーコード体系の設計
            </h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>プレフィックス</th>
                    <th>エラーコード例</th>
                    <th>HTTPステータス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>認証・認可系</strong>
                    </td>
                    <td>
                      <code>AUTH_</code>
                    </td>
                    <td>
                      <code>AUTH_REQUIRED</code>, <code>AUTH_TOKEN_EXPIRED</code>,{" "}
                      <code>AUTH_PERMISSION_DENIED</code>
                    </td>
                    <td>401 / 403</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バリデーション系</strong>
                    </td>
                    <td>
                      <code>VALIDATION_</code>
                    </td>
                    <td>
                      <code>VALIDATION_ERROR</code>, <code>VALIDATION_REQUIRED_FIELD</code>,{" "}
                      <code>VALIDATION_INVALID_FORMAT</code>
                    </td>
                    <td>400 / 422</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ビジネスルール系</strong>
                    </td>
                    <td>ドメイン名_</td>
                    <td>
                      <code>ORDER_ALREADY_CANCELLED</code>, <code>INSUFFICIENT_STOCK</code>,{" "}
                      <code>PAYMENT_DECLINED</code>
                    </td>
                    <td>422 / 409</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>リソース系</strong>
                    </td>
                    <td>
                      <code>NOT_FOUND</code>
                    </td>
                    <td>
                      <code>NOT_FOUND</code>, <code>ALREADY_EXISTS</code>, <code>CONFLICT</code>
                    </td>
                    <td>404 / 409</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>システム系</strong>
                    </td>
                    <td>
                      <code>SYSTEM_</code>
                    </td>
                    <td>
                      <code>INTERNAL_ERROR</code>, <code>SERVICE_UNAVAILABLE</code>,{" "}
                      <code>RATE_LIMIT_EXCEEDED</code>
                    </td>
                    <td>500 / 503 / 429</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">7.3</span>FastAPI実装例
            </h3>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">Python (FastAPI エラーハンドラー)</span>
              </div>
              <pre>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block */}
                <code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code4 }} />
              </pre>
            </div>
            <div className="callout callout-info">
              <div className="callout-icon">🔗</div>
              <div className="callout-body">
                <h4>参考ソース</h4>
                <p>
                  <Ext href="https://www.rfc-editor.org/rfc/rfc7807">
                    RFC 7807 — Problem Details for HTTP APIs（エラー形式の標準）
                  </Ext>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 8 */}
          <section className="section" id="sec8">
            <div className="section-header">
              <div className="section-num">8</div>
              <h2 className="section-title">ページネーション・フィルタリング</h2>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">8.1</span>3つのページネーション方式
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">
                ページネーション方式の比較（オフセット / カーソル / キーセット）
              </div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d14} />
              </div>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>方式</th>
                    <th>クエリ例</th>
                    <th>メリット</th>
                    <th>デメリット</th>
                    <th>適したケース</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>オフセット</strong>
                    </td>
                    <td>
                      <code>?page=2&amp;per_page=20</code>
                    </td>
                    <td>実装が簡単、ランダムアクセス可</td>
                    <td>大量データで遅い、データ追加でページずれ</td>
                    <td>管理画面・静的データ</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>カーソル</strong>
                    </td>
                    <td>
                      <code>?cursor=eyJpZCI6MTAwfQ&amp;per_page=20</code>
                    </td>
                    <td>大量データで高速、リアルタイムに強い</td>
                    <td>ランダムアクセス不可、実装複雑</td>
                    <td>タイムライン・チャット</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>キーセット</strong>
                    </td>
                    <td>
                      <code>?after_id=100&amp;per_page=20</code>
                    </td>
                    <td>インデックス活用で高速、安定</td>
                    <td>複雑なソートは難しい</td>
                    <td>IDベースの単純リスト</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">8.2</span>フィルタリング・ソート・フィールド選択
            </h3>
            <div className="code-block">
              <div className="code-header">
                <span className="code-header">
                  <span className="code-lang">HTTP（クエリパラメータ設計パターン）</span>
                </span>
              </div>
              <pre>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block */}
                <code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code5 }} />
              </pre>
            </div>
          </section>

          {/* SECTION 9 */}
          <section className="section" id="sec9">
            <div className="section-header">
              <div className="section-num">9</div>
              <h2 className="section-title">APIゲートウェイパターン</h2>
            </div>
            <p>
              APIゲートウェイはクライアントとバックエンドの間の
              <strong>単一エントリーポイント</strong>
              。認証・レート制限・ログなど横断的な関心事を一元管理し、各マイクロサービスをビジネスロジックに集中させます。
            </p>

            <h3 className="subsec">
              <span className="subsec-num">9.1</span>APIゲートウェイのアーキテクチャ
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">
                APIゲートウェイを中心としたマイクロサービスアーキテクチャ
              </div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d15} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">9.2</span>BFF（Backend for Frontend）パターン
            </h3>
            <p>
              クライアントの種類ごとに専用のAPIレイヤーを設けます。モバイルは軽量なレスポンス、Webは豊富なデータと最適化が可能です。
            </p>
            <div className="diag-wrap">
              <div className="diag-title">
                BFFパターン：Web用・モバイル用にそれぞれ最適化されたBFF
              </div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d16} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">9.3</span>レート制限のレスポンスヘッダー設計
            </h3>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">HTTP（レート制限ヘッダー）</span>
              </div>
              <pre>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block */}
                <code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code6 }} />
              </pre>
            </div>
            <div className="callout callout-info">
              <div className="callout-icon">🔗</div>
              <div className="callout-body">
                <h4>推奨APIゲートウェイ</h4>
                <p>
                  <Ext href="https://konghq.com/">Kong Gateway</Ext> ／{" "}
                  <Ext href="https://aws.amazon.com/api-gateway/">AWS API Gateway</Ext> ／{" "}
                  <Ext href="https://cloud.google.com/apigee">Google Cloud Apigee</Ext>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 10 */}
          <section className="section" id="sec10">
            <div className="section-header">
              <div className="section-num">10</div>
              <h2 className="section-title">APIのテスト戦略</h2>
            </div>
            <p>
              APIのテストは単なる品質保証に留まらず、<strong>仕様との乖離を防ぐ安全網</strong>
              です。Contract
              Testing（契約テスト）を導入することで、フロントエンドとバックエンドが独立してデプロイできる真のCI/CDが実現します。
            </p>

            <h3 className="subsec">
              <span className="subsec-num">10.1</span>APIテストピラミッド
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">APIテストの4層ピラミッド（下が多く・上が少なく）</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d17} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">10.2</span>Contract Testing（契約テスト）のフロー
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">Pactを使った契約テストのワークフロー</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d18} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">10.3</span>pytest による統合テスト実装例
            </h3>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">Python (pytest 統合テスト)</span>
              </div>
              <pre>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code block */}
                <code dangerouslySetInnerHTML={{ __html: CODE_BLOCKS.code7 }} />
              </pre>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">10.4</span>テストツール一覧
            </h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>テスト種別</th>
                    <th>ツール</th>
                    <th>URL</th>
                    <th>用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Contract Testing</td>
                    <td>
                      <strong>Pact</strong>
                    </td>
                    <td>
                      <Ext href="https://pact.io/">pact.io</Ext>
                    </td>
                    <td>コンシューマー・プロバイダー間の契約検証</td>
                  </tr>
                  <tr>
                    <td>仕様適合テスト</td>
                    <td>
                      <strong>Schemathesis</strong>
                    </td>
                    <td>
                      <Ext href="https://schemathesis.readthedocs.io/">
                        schemathesis.readthedocs.io
                      </Ext>
                    </td>
                    <td>OpenAPI仕様から自動でファジングテスト生成</td>
                  </tr>
                  <tr>
                    <td>APIテスト・ドキュメント</td>
                    <td>
                      <strong>Postman</strong>
                    </td>
                    <td>
                      <Ext href="https://www.postman.com/">postman.com</Ext>
                    </td>
                    <td>GUIでAPIテスト・Collection共有</td>
                  </tr>
                  <tr>
                    <td>仕様ドリブンテスト</td>
                    <td>
                      <strong>Dredd</strong>
                    </td>
                    <td>
                      <Ext href="https://dredd.org/">dredd.org</Ext>
                    </td>
                    <td>OpenAPI仕様と実装の差分を自動検出</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 11 */}
          <section className="section" id="sec11">
            <div className="section-header">
              <div className="section-num">11</div>
              <h2 className="section-title">APIドキュメントとDeveloper Experience</h2>
            </div>
            <p>
              <strong>Developer Experience（DX）</strong>
              とは、APIを使う開発者の体験品質です。Stripe・GitHub・Twilioなど優れたAPIプラットフォームは、技術仕様だけでなく「5分で動く体験」をデザインしています。
            </p>

            <h3 className="subsec">
              <span className="subsec-num">11.1</span>優れたAPIドキュメントの要素
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">DX最高のAPIドキュメントが持つ6つの要素</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d19} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">11.2</span>Developer Experience チェックリスト
            </h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>チェック項目</th>
                    <th>優先度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>🚀 オンボーディング</strong>
                    </td>
                    <td>
                      5分以内にHello Worldが達成できる / テスト用API Keyの即時発行 /
                      サンドボックス環境の提供
                    </td>
                    <td>
                      <span className="tag tag-good">最重要</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>📄 ドキュメント品質</strong>
                    </td>
                    <td>
                      全エンドポイントにサンプルがある / エラーコードと対処法が明記されている /
                      Changelogが管理されている
                    </td>
                    <td>
                      <span className="tag tag-good">高</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>🛠️ SDK・ツール</strong>
                    </td>
                    <td>
                      主要言語のSDKが提供されている / Postman Collectionが公開されている /
                      OpenAPI仕様ファイルが入手可能
                    </td>
                    <td>
                      <span className="tag tag-warn">中</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>🆘 サポート</strong>
                    </td>
                    <td>
                      ステータスページが運用されている / 障害時の通知が受け取れる /
                      GitHubでのフィードバックが可能
                    </td>
                    <td>
                      <span className="tag tag-warn">中</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>⚡ 信頼性</strong>
                    </td>
                    <td>SLA 99.9%以上 / レイテンシP99 &lt; 500ms / 週次アップタイムレポート</td>
                    <td>
                      <span className="tag tag-good">高</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="callout callout-info">
              <div className="callout-icon">🌟</div>
              <div className="callout-body">
                <h4>業界最高水準のAPI参考例</h4>
                <p>
                  <Ext href="https://stripe.com/docs/api">Stripe API</Ext>（業界No.1のDX） ／{" "}
                  <Ext href="https://docs.github.com/en/rest">GitHub REST API</Ext>
                  （HATEOASの実践例） ／{" "}
                  <Ext href="https://developer.atlassian.com/">Atlassian Developer</Ext>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 12 */}
          <section className="section" id="sec12">
            <div className="section-header">
              <div className="section-num">12</div>
              <h2 className="section-title">GraphQL vs REST vs gRPC 比較</h2>
            </div>
            <p>
              モダンな API には REST
              以外の選択肢があります。ユースケースと要件に応じて最適な方式を選ぶことが重要です。
            </p>

            <h3 className="subsec">
              <span className="subsec-num">12.1</span>3方式の特徴マップ
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">REST / GraphQL / gRPC の特徴と適した用途</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d20} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">12.2</span>ユースケース別の選択フロー
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">どのAPI方式を選ぶべきか？ 判断フローチャート</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d21} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">12.3</span>詳細比較表
            </h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>比較軸</th>
                    <th>REST</th>
                    <th>GraphQL</th>
                    <th>gRPC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>プロトコル</strong>
                    </td>
                    <td>HTTP/1.1 + JSON</td>
                    <td>HTTP/1.1 or HTTP/2 + JSON</td>
                    <td>HTTP/2 + Protocol Buffers</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>エンドポイント数</strong>
                    </td>
                    <td>複数（リソースごと）</td>
                    <td>単一（POST /graphql）</td>
                    <td>サービス定義による</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Over-fetching</strong>
                    </td>
                    <td>発生しやすい</td>
                    <td>なし（必要フィールドのみ）</td>
                    <td>なし（型で定義）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>型安全性</strong>
                    </td>
                    <td>△（OpenAPIで補完）</td>
                    <td>○（GraphQL Schema）</td>
                    <td>◎（コンパイル時に保証）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ブラウザ対応</strong>
                    </td>
                    <td>◎</td>
                    <td>◎</td>
                    <td>△（grpc-webが必要）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>パフォーマンス</strong>
                    </td>
                    <td>○</td>
                    <td>○</td>
                    <td>◎（バイナリで最速）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>学習コスト</strong>
                    </td>
                    <td>低</td>
                    <td>中</td>
                    <td>高</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>主な用途</strong>
                    </td>
                    <td>公開API・Web・モバイル</td>
                    <td>複雑なデータグラフ・BFF</td>
                    <td>マイクロサービス間通信</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="callout callout-info">
              <div className="callout-icon">🔗</div>
              <div className="callout-body">
                <h4>参考ソース</h4>
                <p>
                  <Ext href="https://graphql.org/">GraphQL 公式</Ext> ／{" "}
                  <Ext href="https://grpc.io/">gRPC 公式</Ext> ／{" "}
                  <Ext href="https://protobuf.dev/">Protocol Buffers 公式</Ext>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 13 */}
          <section className="section" id="sec13">
            <div className="section-header">
              <div className="section-num">13</div>
              <h2 className="section-title">API-First実践：ECサイト完全事例</h2>
            </div>
            <p>
              これまで学んだ原則を実際のECサイト開発に適用します。注文・商品・ユーザー・決済・在庫の各マイクロサービスをAPI-Firstで設計した全体像を確認しましょう。
            </p>

            <h3 className="subsec">
              <span className="subsec-num">13.1</span>ECサイトAPIの全体アーキテクチャ
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">
                ECサイトのAPI全体アーキテクチャ（BFF + マイクロサービス構成）
              </div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d22} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">13.2</span>注文作成APIの完全シーケンス
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">POST /v1/orders のエンドツーエンドシーケンス</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d23} />
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">13.3</span>API設計の変遷（v1 → v2）
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">実際の改善サイクル：v1の問題点からv2への改善ポイント</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d24} />
              </div>
            </div>

            <div className="highlight-box">
              <h4>🎓 事例から学ぶ教訓</h4>
              <p>
                ECサイトの事例では、v1で発生した「N+1問題」「不統一なエラー形式」「ページずれ」という3つの問題が、v2で
                <strong>?include=パラメータ</strong>・<strong>統一エラーコード体系</strong>・
                <strong>カーソルページネーション</strong>
                の導入によって解決されました。問題が起きてから直すより、API-Firstで設計時に議論することで多くが防げます。
              </p>
            </div>
          </section>

          {/* SECTION 14 */}
          <section className="section" id="sec14">
            <div className="section-header">
              <div className="section-num">14</div>
              <h2 className="section-title">API-Firstのベストプラクティス総まとめ</h2>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">14.1</span>設計フェーズのベストプラクティス
            </h3>
            <div className="bp-grid">
              <div className="bp-item">
                <div className="bp-icon">📝</div>
                <div className="bp-body">
                  <h5>コードより先に仕様を書く</h5>
                  <p>実装前にOpenAPI YAMLを完成させ、仕様が承認されてから実装を開始する</p>
                </div>
              </div>
              <div className="bp-item">
                <div className="bp-icon">👥</div>
                <div className="bp-body">
                  <h5>チームレビューを必ず実施</h5>
                  <p>フロント・バック・QA・PM全員で仕様を確認し、合意形成してから着手</p>
                </div>
              </div>
              <div className="bp-item">
                <div className="bp-icon">🎯</div>
                <div className="bp-body">
                  <h5>コンシューマー視点で設計</h5>
                  <p>使いやすさ優先・実装の都合は後回し。APIは「製品」として設計する</p>
                </div>
              </div>
              <div className="bp-item">
                <div className="bp-icon">📦</div>
                <div className="bp-body">
                  <h5>リソース中心 of の設計</h5>
                  <p>動詞はHTTPメソッドで、名詞（リソース）をURLに。アクションをURLに混ぜない</p>
                </div>
              </div>
              <div className="bp-item">
                <div className="bp-icon">⚠️</div>
                <div className="bp-body">
                  <h5>エラーハンドリングを先に設計</h5>
                  <p>失敗パターンを正常系より先に考える。エラーコード体系を設計フェーズで確定</p>
                </div>
              </div>
              <div className="bp-item">
                <div className="bp-icon">🏷️</div>
                <div className="bp-body">
                  <h5>バージョニング戦略を初期に決める</h5>
                  <p>後から変えると全クライアントに影響。URLパスバージョニングを最初から採用</p>
                </div>
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">14.2</span>実装フェーズのベストプラクティス
            </h3>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>カテゴリ</th>
                    <th>ベストプラクティス</th>
                    <th>理由</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <strong>仕様適合</strong>
                    </td>
                    <td>Contract Testで仕様との乖離を自動検出</td>
                    <td>手動確認は漏れが発生する</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <strong>モック活用</strong>
                    </td>
                    <td>PrismでOpenAPI仕様からモックサーバーを即時起動</td>
                    <td>並行開発でチームをブロックしない</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <strong>自動生成</strong>
                    </td>
                    <td>仕様からSDK・クライアントを自動生成</td>
                    <td>手動実装は仕様と乖離する</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <strong>べき等性</strong>
                    </td>
                    <td>PUT/DELETEはべき等に設計する</td>
                    <td>重複リクエストに安全に対処できる</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>
                      <strong>冪等キー</strong>
                    </td>
                    <td>POSTにIdempotency-Keyヘッダーを対応</td>
                    <td>ネットワーク障害時のリトライ安全性</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>
                      <strong>一貫性</strong>
                    </td>
                    <td>命名規則はsnake_caseまたはcamelCaseで全体統一</td>
                    <td>クライアントの実装混乱を防ぐ</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>
                      <strong>セキュリティ</strong>
                    </td>
                    <td>全エンドポイントにOWASP API Security Top 10を適用</td>
                    <td>認証バイパス・過剰データ露出を防ぐ</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>
                      <strong>可観測性</strong>
                    </td>
                    <td>全リクエストにtrace_idを付与しログに記録</td>
                    <td>問題発生時の調査時間を大幅短縮</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">14.3</span>API-First成熟度モデル
            </h3>
            <p>あなたのチームは今どのレベルにいますか？段階的に次のレベルを目指しましょう。</p>
            <div className="maturity-row">
              <div className="ml-item">
                <div className="ml-num">LV 0</div>
                <div className="ml-name">コードファースト</div>
                <div className="ml-desc">実装後にAPIが決まる。ドキュメントなし・一貫性なし</div>
              </div>
              <div className="ml-item">
                <div className="ml-num">LV 1</div>
                <div className="ml-name">ドキュメント化</div>
                <div className="ml-desc">実装後にSwaggerコメントを追加。仕様書はあるが古い</div>
              </div>
              <div className="ml-item">
                <div className="ml-num">LV 2</div>
                <div className="ml-name">設計優先</div>
                <div className="ml-desc">実装前にOpenAPI仕様を書く。チームレビューを実施</div>
              </div>
              <div className="ml-item">
                <div className="ml-num">LV 3</div>
                <div className="ml-name">自動化・検証</div>
                <div className="ml-desc">
                  仕様からモック・テスト・SDKを自動生成。Contract Test導入
                </div>
              </div>
              <div className="ml-item">
                <div className="ml-num">LV 4</div>
                <div className="ml-name">APIプロダクト</div>
                <div className="ml-desc">
                  APIに専任オーナーを設置。バージョニング・廃止ポリシーを整備
                </div>
              </div>
              <div className="ml-item">
                <div className="ml-num">LV 5</div>
                <div className="ml-name">APIプラットフォーム</div>
                <div className="ml-desc">
                  開発者ポータル・セルフサービス。APIエコシステムとして展開
                </div>
              </div>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">14.4</span>API-First導入ロードマップ（4ヶ月計画）
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">
                API-First導入ロードマップ：Month 1〜4+ の段階的アプローチ
              </div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d25} />
              </div>
            </div>
          </section>

          {/* SECTION 15 */}
          <section className="section" id="sec15">
            <div className="section-header">
              <div className="section-num">15</div>
              <h2 className="section-title">API-Firstのアンチパターン</h2>
            </div>
            <p>
              優れたAPI設計を学ぶ最短路のひとつは<strong>失敗パターンを知ること</strong>
              です。以下の5つのアンチパターンは多くのプロジェクトで繰り返される典型的な失敗です。
            </p>

            <h3 className="subsec">
              <span className="subsec-num">15.1</span>5大アンチパターンとその解決策
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">5大アンチパターン：問題 → 解決策のマップ</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d26} />
              </div>
            </div>

            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>アンチパターン名</th>
                    <th>症状</th>
                    <th>解決策</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <strong>Code-First（コードファースト）</strong>
                    </td>
                    <td>実装してからAPIが後付けで決まる。ドキュメントは常に古い</td>
                    <td>
                      実装前にOpenAPI仕様を書き、仕様承認後に実装開始。仕様レビューを必須工程に
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <strong>RPC Style REST</strong>
                    </td>
                    <td>
                      URLに動詞を含める設計：<code>/getOrders</code>, <code>/createUser</code>
                    </td>
                    <td>リソース名（名詞）＋HTTPメソッドで表現。URL設計ガイドラインを整備する</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <strong>Chatty API（おしゃべりAPI）</strong>
                    </td>
                    <td>1画面表示に10回のAPIコールが必要。N+1問題が頻発する</td>
                    <td>
                      BFFパターンでデータを集約、または <code>?include=</code>{" "}
                      で関連データを1回で取得
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <strong>Versioning Neglect（バージョニング放棄）</strong>
                    </td>
                    <td>バージョンなしで破壊的変更。既存クライアントが突然壊れる</td>
                    <td>変更前に必ずv2を作成。最低6ヶ月の移行期間を設けてv1を廃止</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>
                      <strong>Generic Error（汎用エラー）</strong>
                    </td>
                    <td>
                      すべてのエラーで同じメッセージ。<code>Internal Server Error</code>
                      だけで調査不能
                    </td>
                    <td>
                      エラーコード体系を設計し、<code>trace_id</code>と詳細情報を必ず含める
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">15.2</span>アンチパターン健全性チェックフロー
            </h3>
            <div className="diag-wrap">
              <div className="diag-title">API設計の健全性セルフチェック（5つの質問）</div>
              <div className="diag-inner">
                <MermaidDiagram chart={DIAGRAMS.d27} />
              </div>
            </div>
          </section>

          {/* SECTION 16 */}
          <section className="section" id="sec16">
            <div className="section-header">
              <div className="section-num">16</div>
              <h2 className="section-title">参考文献・ソース一覧</h2>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">16.1</span>必読書籍
            </h3>
            <div className="tbl-wrap">
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
                      <strong>Designing Web APIs</strong>
                    </td>
                    <td>Brenda Jin, Saurabh Sahni, Amir Shevat</td>
                    <td>★★★☆☆</td>
                    <td>APIデザインの実践的入門書</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>The Design of Web APIs</strong>
                    </td>
                    <td>Arnaud Lauret</td>
                    <td>★★★★☆</td>
                    <td>APIデザイン思考の決定版</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>API Design Patterns</strong>
                    </td>
                    <td>JJ Geewax（Google）</td>
                    <td>★★★★☆</td>
                    <td>Googleの実践的APIパターン集</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Building Microservices</strong>
                    </td>
                    <td>Sam Newman</td>
                    <td>★★★★☆</td>
                    <td>マイクロサービスとAPIの関係</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Learning GraphQL</strong>
                    </td>
                    <td>Eve Porcello, Alex Banks</td>
                    <td>★★★☆☆</td>
                    <td>GraphQLの実践入門</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="subsec">
              <span className="subsec-num">16.2</span>公式仕様・ドキュメント
            </h3>
            <div className="source-grid">
              <div className="source-card">
                <div className="source-cat">OpenAPI / Swagger</div>
                <Ext href="https://spec.openapis.org/oas/v3.1.0">
                  OpenAPI Specification 3.1.0（公式仕様）
                </Ext>
                <p className="source-desc">RESTful API記述の業界標準規格の完全仕様書</p>
              </div>
              <div className="source-card">
                <div className="source-cat">OpenAPI / Swagger</div>
                <Ext href="https://editor.swagger.io/">Swagger Editor</Ext>
                <p className="source-desc">ブラウザ上でOpenAPI仕様をリアルタイム編集・プレビュー</p>
              </div>
              <div className="source-card">
                <div className="source-cat">OpenAPI / Swagger</div>
                <Ext href="https://www.openapis.org/">OpenAPI Initiative 公式</Ext>
                <p className="source-desc">OpenAPI標準を管理するコンソーシアムの公式サイト</p>
              </div>
              <div className="source-card">
                <div className="source-cat">RESTful設計原則</div>
                <Ext href="https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm">
                  Roy Fielding REST論文（原典）
                </Ext>
                <p className="source-desc">RESTアーキテクチャスタイルを定義した博士論文</p>
              </div>
              <div className="source-card">
                <div className="source-cat">RESTful設計原則</div>
                <Ext href="https://cloud.google.com/apis/design">Google API Design Guide</Ext>
                <p className="source-desc">Googleが実際に使用するAPIデザインガイドライン</p>
              </div>
              <div className="source-card">
                <div className="source-cat">RESTful設計原則</div>
                <Ext href="https://github.com/microsoft/api-guidelines">
                  Microsoft REST API Guidelines
                </Ext>
                <p className="source-desc">
                  MicrosoftのAzure APIデザインガイドライン（GitHub公開）
                </p>
              </div>
              <div className="source-card">
                <div className="source-cat">RESTful設計原則</div>
                <Ext href="https://martinfowler.com/articles/richardsonMaturityModel.html">
                  Richardson Maturity Model（Martin Fowler）
                </Ext>
                <p className="source-desc">REST成熟度を4段階で評価するモデルの解説</p>
              </div>
              <div className="source-card">
                <div className="source-cat">認証・セキュリティ</div>
                <Ext href="https://www.rfc-editor.org/rfc/rfc6749">OAuth 2.0 RFC 6749</Ext>
                <p className="source-desc">OAuth 2.0の公式標準仕様（IETF）</p>
              </div>
              <div className="source-card">
                <div className="source-cat">認証・セキュリティ</div>
                <Ext href="https://jwt.io/">JWT.io</Ext>
                <p className="source-desc">JWT of の仕様確認・デバッガー・ライブラリ一覧</p>
              </div>
              <div className="source-card">
                <div className="source-cat">認証・セキュリティ</div>
                <Ext href="https://owasp.org/www-project-api-security/">
                  OWASP API Security Top 10
                </Ext>
                <p className="source-desc">APIの10大セキュリティリスクと対策ガイド</p>
              </div>
              <div className="source-card">
                <div className="source-cat">API設計ツール</div>
                <Ext href="https://stoplight.io/">Stoplight（API-Firstプラットフォーム）</Ext>
                <p className="source-desc">GUI付きAPI設計・チームコラボレーションツール</p>
              </div>
              <div className="source-card">
                <div className="source-cat">API設計ツール</div>
                <Ext href="https://stoplight.io/open-source/prism">
                  Prism（OpenAPIモックサーバー）
                </Ext>
                <p className="source-desc">OpenAPI仕様から即時モックサーバーを生成するOSSツール</p>
              </div>
              <div className="source-card">
                <div className="source-cat">API設計ツール</div>
                <Ext href="https://www.postman.com/">Postman</Ext>
                <p className="source-desc">APIテスト・ドキュメント・チームコラボレーション</p>
              </div>
              <div className="source-card">
                <div className="source-cat">API設計ツール</div>
                <Ext href="https://redocly.github.io/redoc/">ReDoc</Ext>
                <p className="source-desc">
                  OpenAPI仕様から美しいリファレンスドキュメントを自動生成
                </p>
              </div>
              <div className="source-card">
                <div className="source-cat">GraphQL</div>
                <Ext href="https://graphql.org/">GraphQL 公式</Ext>
                <p className="source-desc">GraphQLの公式仕様・チュートリアル・エコシステム</p>
              </div>
              <div className="source-card">
                <div className="source-cat">gRPC</div>
                <Ext href="https://grpc.io/">gRPC 公式</Ext>
                <p className="source-desc">
                  HTTP/2ベースの高性能RPC フレームワークの公式ドキュメント
                </p>
              </div>
              <div className="source-card">
                <div className="source-cat">テスト</div>
                <Ext href="https://pact.io/">Pact（Contract Testing）</Ext>
                <p className="source-desc">コンシューマードリブン契約テストフレームワーク</p>
              </div>
              <div className="source-card">
                <div className="source-cat">テスト</div>
                <Ext href="https://schemathesis.readthedocs.io/">Schemathesis</Ext>
                <p className="source-desc">
                  OpenAPI仕様からランダムテストを自動生成するファジングツール
                </p>
              </div>
              <div className="source-card">
                <div className="source-cat">業界ガイドライン</div>
                <Ext href="https://opensource.zalando.com/restful-api-guidelines/">
                  Zalando RESTful API Guidelines
                </Ext>
                <p className="source-desc">
                  ヨーロッパ最大のファッションECが公開する詳細なAPIガイドライン
                </p>
              </div>
              <div className="source-card">
                <div className="source-cat">業界ガイドライン</div>
                <Ext href="https://jsonapi.org/">JSON:API 仕様</Ext>
                <p className="source-desc">JSON APIの標準レスポンスフォーマット仕様</p>
              </div>
              <div className="source-card">
                <div className="source-cat">参考実装</div>
                <Ext href="https://stripe.com/docs/api">Stripe API（業界最高水準）</Ext>
                <p className="source-desc">
                  DXの模範例。エラー設計・バージョニング・ドキュメントすべてが学べる
                </p>
              </div>
              <div className="source-card">
                <div className="source-cat">参考実装</div>
                <Ext href="https://docs.github.com/en/rest">GitHub REST API</Ext>
                <p className="source-desc">
                  HATEOASを実装した参考例。_linksでナビゲーション情報を返す
                </p>
              </div>
              <div className="source-card">
                <div className="source-cat">エラー設計</div>
                <Ext href="https://www.rfc-editor.org/rfc/rfc7807">RFC 7807 — Problem Details</Ext>
                <p className="source-desc">HTTP APIのエラーレスポンス形式の標準規格</p>
              </div>
              <div className="source-card">
                <div className="source-cat">アーキテクチャ</div>
                <Ext href="https://redocly.com/">Redocly（OpenAPI管理・CI）</Ext>
                <p className="source-desc">
                  OpenAPIファイルのLint・CI統合・ドキュメントホスティング
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <h3>🌐 API-First設計 完全ガイド</h3>
            <p>
              本ドキュメントは2024年時点の情報を基に作成されています。各ツール・仕様のバージョンや内容は変更される場合があります。実装前に必ず公式ドキュメントをご確認ください。
            </p>
            <p style={{ marginTop: "12px" }}>
              作成者：Software Architect Guide｜バージョン 2.0｜API-First Complete Guide
            </p>
            <p>
              <Ext href="https://www.openapis.org/">OpenAPI Initiative</Ext> ／{" "}
              <Ext href="https://swagger.io/">Swagger</Ext> ／{" "}
              <Ext href="https://stoplight.io/">Stoplight</Ext>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
