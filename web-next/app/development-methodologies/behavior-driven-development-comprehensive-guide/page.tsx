import MermaidDiagram from "@/components/MermaidDiagram";
import BddSidebar from "./BddSidebar";

const DIAGRAM_PROBLEMS = `flowchart LR
    subgraph BEFORE["BDD 導入前の問題"]
        P1["❌ 要件の認識齟齬\\nPO・開発者・QA が\\n異なる解釈をする"]
        P2["❌ テストが後付け\\n実装後にテストを書く\\n設計品質が上がらない"]
        P3["❌ 仕様書が陳腐化\\nコードと仕様書が乖離\\n誰も読まない文書に"]
        P4["❌ 受け入れ基準が曖昧\\n完了の定義がなく\\n手戻りが多発する"]
    end
    subgraph AFTER["BDD 導入後の効果"]
        S1["✅ 共通言語で合意\\nGherkin で全員が\\n同じ仕様を理解する"]
        S2["✅ 仕様→実装の順序\\n振る舞いを先に定義\\n設計品質が向上する"]
        S3["✅ 生きた仕様書\\nシナリオがそのまま\\n実行可能なテストになる"]
        S4["✅ 受け入れ基準が明確\\nシナリオ通過で完了\\n全員が納得できる"]
    end
    P1 --> S1
    P2 --> S2
    P3 --> S3
    P4 --> S4
    style P1 fill:#4a1212,color:#f85149,stroke:#f85149
    style P2 fill:#4a1212,color:#f85149,stroke:#f85149
    style P3 fill:#4a1212,color:#f85149,stroke:#f85149
    style P4 fill:#4a1212,color:#f85149,stroke:#f85149
    style S1 fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style S2 fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style S3 fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style S4 fill:#0d2b15,color:#3fb950,stroke:#3fb950`;

const DIAGRAM_LEVELS = `graph TD
    ATDD["🔵 ATDD\\n受け入れテスト駆動開発\\n顧客視点で受け入れ基準を定義\\n最外側のループ"]
    BDD["🟢 BDD\\n振る舞い駆動開発\\nGherkin 記法でシナリオを記述\\nビジネスと技術の橋渡し"]
    TDD["🔴 TDD\\nテスト駆動開発\\nコードレベルのユニットテスト\\n開発者中心の内側ループ"]
    ATDD -->|"外側のループ"| BDD
    BDD -->|"外側のループ"| TDD
    TDD -->|"内側ループ（繰り返し）"| TDD
    style ATDD fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style BDD fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style TDD fill:#4a1212,color:#f85149,stroke:#f85149`;

const DIAGRAM_GWT = `graph TD
    GWT["🎯 Given-When-Then 構文"]
    GIVEN["📋 Given（前提条件）\\nテスト開始時の初期状態\\n例：顧客がログインしている"]
    WHEN["⚡ When（操作・イベント）\\nユーザーまたはシステムのアクション\\n例：商品をカートに追加する"]
    THEN["✅ Then（期待される結果）\\nシステムが示すべき振る舞い\\n例：合計金額が表示される"]
    AND["🔗 And / But（継続）\\n前のステップと同種の記述\\n例：And メールが送信される"]
    GWT --> GIVEN & WHEN & THEN
    THEN --> AND
    style GIVEN fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style WHEN fill:#2d1508,color:#e07b39,stroke:#e07b39
    style THEN fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style AND fill:#231545,color:#bc8cff,stroke:#bc8cff`;

const DIAGRAM_STORY = `flowchart LR
    subgraph US["📖 ユーザーストーリー"]
        STORY["As a 登録済みの顧客として\\nI want カートに商品を追加したい\\nSo that まとめて購入できるから"]
    end
    subgraph SCENARIOS["🥒 BDD シナリオ（具体化）"]
        SC1["Scenario: 商品をカートに追加する\\n  Given 顧客がログインしている\\n  When 商品を1点追加する\\n  Then 合計金額が表示される"]
        SC2["Scenario: 在庫切れ商品は追加できない\\n  Given 商品の在庫が0点である\\n  When 商品を追加しようとする\\n  Then 在庫切れエラーが表示される"]
    end
    US -->|"具体化"| SCENARIOS
    style US fill:#0e2140,stroke:#58a6ff
    style SCENARIOS fill:#0d2b15,stroke:#3fb950`;

const DIAGRAM_KEYWORDS = `graph TD
    GHK["🥒 Gherkin キーワード体系"]
    FEAT["Feature\\nテストする機能を説明"]
    BG["Background\\n全シナリオ共通の前提条件"]
    SC["Scenario\\n1つの具体的なテストケース"]
    SO["Scenario Outline\\nパラメータ化シナリオ"]
    STEPS["ステップキーワード"]
    GWN["Given / When / Then"]
    AND2["And / But（継続）"]
    EX["Examples\\nパラメータテーブル"]
    TAG["@タグ\\nシナリオの分類・フィルタリング"]
    DS["DocString\\n複数行テキスト"]
    DT["DataTable\\n表形式データ"]
    GHK --> FEAT & BG & SC & SO & TAG
    SC --> STEPS & DS & DT
    SO --> STEPS & EX
    STEPS --> GWN & AND2
    style GHK fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style FEAT fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style SC fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style SO fill:#2d1508,color:#e07b39,stroke:#e07b39
    style TAG fill:#231545,color:#bc8cff,stroke:#bc8cff`;

const DIAGRAM_CYCLE = `flowchart TD
    D["🔍 1. Discovery\\nThree Amigos ミーティング\\nPO・開発者・QA が振る舞いを議論"]
    F["📝 2. Formulation\\nGherkin 記法でシナリオを記述\\n具体的な例で仕様を明確化"]
    A["⚙️ 3. Automation\\nシナリオをステップ定義に変換\\n失敗するテストが先にある"]
    V["✅ 4. Validate\\nシナリオをパスする実装を行う\\nビジネス側が結果を確認する"]
    L["📚 5. Living Documentation\\nシナリオは常に最新の仕様書\\nコードとドキュメントが常に一致"]
    D --> F --> A --> V --> L
    L -->|"次の機能へ"| D
    style D fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style F fill:#231545,color:#bc8cff,stroke:#bc8cff
    style A fill:#4a1212,color:#f85149,stroke:#f85149
    style V fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style L fill:#111827,color:#8b949e,stroke:#30363d`;

const DIAGRAM_AMIGOS = `graph TD
    PO["🎯 Product Owner\\nビジネス要件・優先度\\n何を作るかを定義"]
    DEV["💻 Developer\\n技術的実現可能性\\nどう作るかを検討"]
    QA["🔍 QA / Tester\\n品質・リスク・エッジケース\\n何が壊れうるかを考える"]
    MTG["📋 Three Amigos Meeting\\n具体的なシナリオを一緒に作成\\n認識のズレを最も安く解決する場"]
    OUT["📄 合意されたシナリオ\\n全員が Yes と言える仕様\\nFeature ファイルにコミット"]
    PO --> MTG
    DEV --> MTG
    QA --> MTG
    MTG --> OUT
    style PO fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style DEV fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style QA fill:#4a1212,color:#f85149,stroke:#f85149
    style MTG fill:#2a1a00,color:#d4a017,stroke:#d4a017
    style OUT fill:#111827,color:#e6edf3,stroke:#30363d`;

const DIAGRAM_SPRINT = `sequenceDiagram
    participant PO as Product Owner
    participant DEV as 開発者
    participant QA as QA
    participant CI as CI/CD
    Note over PO,CI: スプリント計画フェーズ
    PO->>DEV: ユーザーストーリーを共有
    PO->>QA: ストーリーを共有
    Note over PO,CI: Three Amigos セッション
    PO->>PO: ビジネスルールを説明
    QA->>QA: エッジケースを提案
    DEV->>DEV: 技術的考慮を共有
    PO->>CI: Feature ファイルをコミット
    Note over PO,CI: 開発フェーズ（BDD × TDD）
    DEV->>CI: ステップ定義を作成（Red）
    DEV->>CI: 実装コードを作成（Green）
    DEV->>CI: リファクタリング（Refactor）
    Note over PO,CI: 受け入れフェーズ
    CI-->>QA: テスト結果レポート
    QA->>PO: 結果を共有
    PO-->>DEV: 承認 または フィードバック`;

const DIAGRAM_TOOLS = `graph TD
    GH["📄 Gherkin\\nFeature ファイル記述"]
    PBDD["🥒 pytest-bdd\\nステップ定義・シナリオ実行"]
    PT["🧪 pytest\\nテストランナー・フィクスチャ"]
    HTTPX["🌐 httpx\\nAPI テスト"]
    PW["🎭 Playwright\\nUI テスト（E2E）"]
    FB["🏭 factory-boy\\nテストデータ生成"]
    AL["📊 Allure\\nテストレポート生成"]
    TC["🐳 TestContainers\\nDB 統合テスト"]
    GH --> PBDD --> PT
    PT --> HTTPX & PW & FB & TC & AL
    style GH fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style PBDD fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style PT fill:#4a1212,color:#f85149,stroke:#f85149
    style AL fill:#2a1a00,color:#d4a017,stroke:#d4a017`;

const DIAGRAM_CUCUMBER_ARCH = `graph TD
    FF["📄 Feature ファイル\\n.feature 形式\\nGherkin 記法で記述"]
    SD["⚙️ Step Definitions\\n各ステップの実装コード\\nアノテーションでマッチング"]
    SUP["🛠️ Support / Hooks\\nBefore・After・BeforeAll\\n共通処理・フィクスチャ"]
    APP["💻 Application Code\\nテスト対象のアプリケーション"]
    RPT["📊 Test Report\\nAllure / Cucumber HTML"]
    FF -->|"マッチング"| SD
    SD -->|"呼び出し"| APP
    SUP -->|"前後処理"| SD
    SD --> RPT`;

const DIAGRAM_DOUBLELOOP = `flowchart TD
    subgraph OUTER["🔵 外側ループ — BDD / 受け入れテスト"]
        BR["🔴 BDD RED\\nGherkin シナリオを書く\\n全シナリオが FAIL"]
        BG["🟢 BDD GREEN\\n全シナリオが PASS\\n内側ループ繰り返し後"]
        BF["🔵 BDD REFACTOR\\nシナリオを整理・改善"]
    end
    subgraph INNER["🔴 内側ループ — TDD / ユニットテスト"]
        TR["🔴 TDD RED\\nユニットテストを書く\\nFAIL 状態"]
        TG["🟢 TDD GREEN\\n最小実装で PASS"]
        TF["🔵 TDD REFACTOR\\nコードを整理・改善"]
    end
    BR --> TR
    TR --> TG --> TF
    TF -->|"まだシナリオ FAIL"| TR
    TF -->|"シナリオ PASS"| BG
    BG --> BF
    BF -->|"次のシナリオへ"| BR
    style OUTER fill:#07111e,stroke:#58a6ff
    style INNER fill:#07111e,stroke:#f85149
    style BR fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style BG fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style TR fill:#4a1212,color:#f85149,stroke:#f85149
    style TG fill:#0d2b15,color:#3fb950,stroke:#3fb950`;

const DIAGRAM_ATDD = `flowchart TD
    REQ["📋 要件（ユーザーストーリー）"]
    ACC["✅ 受け入れ基準の定義\\nThree Amigos"]
    GHK2["🥒 Gherkin シナリオ作成\\n具体的な例で仕様を記述"]
    AUTO["⚙️ 自動受け入れテスト\\nシナリオが実行可能に"]
    IMPL["💻 実装\\nテストをパスする"]
    DONE["🎉 受け入れ\\n全シナリオが PASS"]
    REQ --> ACC --> GHK2 --> AUTO --> IMPL --> DONE
    DONE -->|"次のストーリーへ"| REQ
    style REQ fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style ACC fill:#231545,color:#bc8cff,stroke:#bc8cff
    style GHK2 fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style AUTO fill:#4a1212,color:#f85149,stroke:#f85149
    style DONE fill:#111827,color:#e6edf3,stroke:#30363d`;

const DIAGRAM_API_BDD = `flowchart TD
    subgraph API_BDD["🌐 APIテストのBDDレイヤー"]
        GWT_API["Given: APIの初期状態を設定\\n・テストデータのDB投入\\n・認証トークンの取得\\n・モックサーバーの設定"]
        WHEN_API["When: HTTPリクエストを送信\\n・メソッド・URL・ヘッダー\\n・リクエストボディ\\n・クエリパラメータ"]
        THEN_API["Then: レスポンスを検証\\n・HTTPステータスコード\\n・レスポンスボディの内容\\n・ヘッダーの確認"]
    end
    GWT_API --> WHEN_API --> THEN_API
    style GWT_API fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style WHEN_API fill:#2d1508,color:#e07b39,stroke:#e07b39
    style THEN_API fill:#0d2b15,color:#3fb950,stroke:#3fb950`;

const DIAGRAM_UI_ARCH = `graph TD
    FEAT2["🥒 Gherkin Feature\\nビジネスシナリオを記述\\nUI 実装詳細は書かない"]
    STEP2["⚙️ Step Definitions\\nPage Object Model を呼び出す\\nUI 操作の抽象化レイヤー"]
    POM["📄 Page Object Model\\n各ページの UI 操作をメソッドで定義\\nセレクターを隠蔽する"]
    PW2["🎭 Playwright / Selenium\\n実際のブラウザ操作\\n最下層の実装詳細"]
    FEAT2 --> STEP2 --> POM --> PW2
    style FEAT2 fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style STEP2 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style POM fill:#231545,color:#bc8cff,stroke:#bc8cff
    style PW2 fill:#4a1212,color:#f85149,stroke:#f85149`;

const DIAGRAM_GOOD_SCENARIO = `graph TD
    ROOT["🎯 良いシナリオの条件"]
    D1["📋 宣言的\\n「何を」するかを記述\\n「どのように」は書かない\\n実装詳細を隠す"]
    D2["🔒 独立性\\n他シナリオに依存しない\\n単独で実行できる\\n順序に依存しない"]
    D3["🎯 具体的\\n曖昧な言葉を使わない\\n具体的な数値・名前を使う\\n「いくつかの商品」→「3点の商品」"]
    D4["🔍 焦点\\n1シナリオ1ふるまい\\n複数のことを検証しない\\nテストの意図が明確"]
    D5["🗣️ ビジネス語彙\\n技術用語を使わない\\nドメイン言語で記述\\n非エンジニアにも理解できる"]
    ROOT --> D1 & D2 & D3 & D4 & D5
    style ROOT fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style D1 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style D2 fill:#231545,color:#bc8cff,stroke:#bc8cff
    style D3 fill:#2d1508,color:#e07b39,stroke:#e07b39
    style D4 fill:#2a1a00,color:#d4a017,stroke:#d4a017
    style D5 fill:#0d2b15,color:#3fb950,stroke:#3fb950`;

const DIAGRAM_DECLARATIVE = `graph TD
    subgraph IMP["❌ 命令的（実装詳細が露出）"]
        IMP1["Scenario: ログインしてカートに追加する\\n  Given ユーザーがブラウザを開く\\n  When 「example.com/login」にアクセスする\\n  And テキストフィールドにメールを入力する\\n  And パスワードフィールドにパスワードを入力する\\n  And 「ログイン」ボタンをクリックする\\n  And 商品ページに移動する\\n  And 「カートに追加」ボタンをクリックする\\n  Then カートに商品が追加される"]
        IMP_NOTE["❌ UI変更のたびにシナリオが壊れる\\n❌ ビジネスルールが不明確\\n❌ 非エンジニアには読みにくい"]
    end

    subgraph DEC["✅ 宣言的（ビジネスルールが明確）"]
        DEC1["Scenario: ログイン済み顧客が商品をカートに追加する\\n  Given 顧客「山田太郎」がログインしている\\n  When 商品「Tシャツ」を 1 点カートに追加する\\n  Then カートに 1 点の商品が入っている\\n  And カートの合計金額は 1,000円 である"]
        DEC_NOTE["✅ UI変更の影響を受けない\\n✅ ビジネスルールが明確\\n✅ 誰でも読める仕様書"]
    end

    style IMP1 fill:#4a1212,color:#f85149,stroke:#f85149
    style IMP_NOTE fill:#4a1212,color:#f85149,stroke:#f85149
    style DEC1 fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style DEC_NOTE fill:#0d2b15,color:#3fb950,stroke:#3fb950`;

const DIAGRAM_EXAMPLE_MAPPING = `graph TD
    subgraph EM["📋 Example Mapping セッション"]
        STORY_CARD["🟡 ストーリーカード\\n注文にクーポンを適用できる"]

        RULE1["🔵 ルール1\\n有効なクーポンは適用できる"]
        RULE2["🔵 ルール2\\n無効なクーポンは適用できない"]
        RULE3["🔵 ルール3\\nクーポンは1注文に1枚のみ"]

        EX1["🟢 例1-1\\n10%OFFクーポン\\n5000円→4500円"]
        EX2["🟢 例1-2\\n500円引きクーポン\\n5000円→4500円"]

        EX3["🔴 例2-1\\n有効期限切れ\\n→エラー"]
        EX4["🔴 例2-2\\n存在しないコード\\n→エラー"]
        EX5["🔴 例2-3\\n最低注文額未満\\n→エラー"]

        EX6["🟢 例3-1\\n2枚目を適用しようとする\\n→エラー（1枚目が適用済み）"]

        QUESTION["❓ 質問カード\\nクーポンと送料無料は\\n同時に適用できるか？"]
    end

    STORY_CARD --> RULE1 & RULE2 & RULE3
    RULE1 --> EX1 & EX2
    RULE2 --> EX3 & EX4 & EX5
    RULE3 --> EX6
    STORY_CARD --> QUESTION

    style STORY_CARD fill:#2a1a00,color:#d4a017,stroke:#d4a017
    style RULE1 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style RULE2 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style RULE3 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style EX1 fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style EX2 fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style EX3 fill:#4a1212,color:#f85149,stroke:#f85149
    style EX4 fill:#4a1212,color:#f85149,stroke:#f85149
    style EX5 fill:#4a1212,color:#f85149,stroke:#f85149
    style QUESTION fill:#2d1508,color:#e07b39,stroke:#e07b39`;

const DIAGRAM_CICD = `flowchart TD
    subgraph LOCAL["💻 ローカル開発"]
        L1["Feature ファイル編集"]
        L2["@wip タグでシナリオ実行"]
        L3["全シナリオ PASS を確認"]
        L1 --> L2 --> L3
    end
    subgraph CI["🔄 CI パイプライン（PR 時）"]
        C1["コードチェックアウト"]
        C2["依存関係インストール"]
        C3["ユニットテスト（TDD）"]
        C4["BDD 受け入れ（@smoke）"]
        C5["BDD リグレッション（全シナリオ）"]
        C6["Allure レポート生成"]
        C1 --> C2 --> C3 --> C4 --> C5 --> C6
    end
    subgraph CD["🚀 CD パイプライン（main マージ）"]
        D1["ステージング環境デプロイ"]
        D2["E2E BDD テスト（@e2e）"]
        D3["レポートをステークホルダーへ共有"]
        D4["本番環境デプロイ"]
        D1 --> D2 --> D3 --> D4
    end
    LOCAL --> CI --> CD
    style LOCAL fill:#0d2b15,stroke:#3fb950
    style CI fill:#0e2140,stroke:#58a6ff
    style CD fill:#2a1a00,stroke:#d4a017`;

const DIAGRAM_LIVING_DOC = `flowchart LR
    FEATURE_FILES2["📄 Feature ファイル\\n（Gherkin）"] --> CUCUMBER_REPORTS["📊 Cucumber Reports\\nHTML レポート\\nシナリオ実行結果付き"]
    FEATURE_FILES2 --> ALLURE["📈 Allure Report\\nインタラクティブな\\nテストレポート"]
    FEATURE_FILES2 --> LIVING_DOC["📚 Living Documentation\\nPickles / Relish\\n常に最新の仕様書として公開"]
    FEATURE_FILES2 --> JIRA["🎫 Jira / Confluence\\nXray for Jira\\nチケットとシナリオを紐付け"]

    style FEATURE_FILES2 fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style CUCUMBER_REPORTS fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style ALLURE fill:#2a1a00,color:#d4a017,stroke:#d4a017
    style LIVING_DOC fill:#231545,color:#bc8cff,stroke:#bc8cff
    style JIRA fill:#4a1212,color:#f85149,stroke:#f85149`;

const DIAGRAM_EC_MAP = `graph TD
    ROOT["🛒 ECサイト BDD シナリオ全体像"]
    C1["🔍 商品カタログ\\n・一覧表示・検索・カテゴリ絞込"]
    C2["🛒 カート\\n・追加・数量変更・削除・クーポン"]
    C3["💳 注文・決済\\n・確定・クレカ決済・確認メール"]
    C4["👤 マイアカウント\\n・ログイン・注文履歴・会員情報変更"]
    C5["⚙️ 管理機能\\n・在庫管理・注文管理・商品登録"]
    ROOT --> C1 & C2 & C3 & C4 & C5
    style ROOT fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style C1 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style C2 fill:#231545,color:#bc8cff,stroke:#bc8cff
    style C3 fill:#2d1508,color:#e07b39,stroke:#e07b39
    style C4 fill:#2a1a00,color:#d4a017,stroke:#d4a017
    style C5 fill:#0d2b15,color:#3fb950,stroke:#3fb950`;

const DIAGRAM_MATURITY = `graph TD
    L0["Level 0\\n手動テストのみ\\n受け入れ基準が暗黙知"]
    L1["Level 1\\nシナリオの文書化\\nGherkin を書くが自動化なし"]
    L2["Level 2\\n基本的な自動化\\nハッピーパスが自動化済み"]
    L3["Level 3\\nCI 統合\\n全シナリオを CI で自動実行"]
    L4["Level 4\\nLiving Documentation\\nシナリオが常に最新の仕様書"]
    L5["Level 5\\nBDD 文化の定着\\nPO がシナリオを書く文化"]
    L0 --> L1 --> L2 --> L3 --> L4 --> L5
    style L0 fill:#4a1212,color:#f85149,stroke:#f85149
    style L1 fill:#2d1508,color:#e07b39,stroke:#e07b39
    style L2 fill:#2a1a00,color:#d4a017,stroke:#d4a017
    style L3 fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style L4 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style L5 fill:#231545,color:#bc8cff,stroke:#bc8cff`;

const DIAGRAM_HEALTH = `flowchart TD
    CHK["🔍 BDD 健全性チェック開始"]
    Q1{"Three Amigos が\\nシナリオ作成に参加？"}
    Q2{"ビジネス語彙で\\n書かれている？"}
    Q3{"1 シナリオのステップ数\\nが 10 以下？"}
    Q4{"シナリオが独立して\\n実行できる？"}
    Q5{"CI で自動実行\\nされている？"}
    Q6{"失敗シナリオを\\n即座に修正している？"}
    OK["✅ 健全な BDD プロジェクト\\nLiving Documentation として機能"]
    F1["👥 Three Amigos を導入する"]
    F2["📝 シナリオをリファクタリング"]
    F3["✂️ シナリオを分割する"]
    F4["🔒 独立フィクスチャを使用"]
    F5["⚙️ CI/CD に統合する"]
    F6["🔧 Broken Window を放置しない"]
    CHK --> Q1
    Q1 -->|"No"| F1
    Q1 -->|"Yes"| Q2
    Q2 -->|"No"| F2
    Q2 -->|"Yes"| Q3
    Q3 -->|"No"| F3
    Q3 -->|"Yes"| Q4
    Q4 -->|"No"| F4
    Q4 -->|"Yes"| Q5
    Q5 -->|"No"| F5
    Q5 -->|"Yes"| Q6
    Q6 -->|"No"| F6
    Q6 -->|"Yes"| OK
    style OK fill:#0d2b15,color:#3fb950,stroke:#3fb950
    style F1 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style F2 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style F3 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style F4 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style F5 fill:#0e2140,color:#58a6ff,stroke:#58a6ff
    style F6 fill:#0e2140,color:#58a6ff,stroke:#58a6ff`;

export default function BehaviorDrivenDevelopmentGuidePage() {
  return (
    <div className="behavior-driven-development-comprehensive-guide">
      <BddSidebar />
      <main id="main">
        <div className="hero">
          <div className="hero-badge">🥒 Complete Reference Guide</div>
          <h1 className="hero-h1">
            <span className="ag">BDD</span> 完全ガイド
            <br />
            Behavior-Driven Development
          </h1>
          <p className="hero-desc">
            振る舞い駆動開発の全体像を初学者にもわかりやすくステップバイステップで解説。
            <strong>Given-When-Then構文</strong>から<strong>CI/CD統合</strong>
            まで、Gherkin・pytest-bdd・Cucumberの実装例とベストプラクティスを網羅した完全リファレンスです。
          </p>
          <div className="hero-chips">
            <span className="chip">📅 2026年版</span>
            <span className="chip">🐍 Python / pytest-bdd</span>
            <span className="chip">☕ Java / Cucumber</span>
            <span className="chip">⚙️ GitHub Actions統合</span>
            <span className="chip">🎭 Playwright E2E</span>
            <span className="chip">📊 Allureレポート</span>
          </div>
        </div>

        <div className="cw">
          {/* S1 */}
          <section className="sec" id="s1">
            <div className="sec-hd">
              <span className="sec-num">01</span>
              <h2 className="sec-title">BDDとは何か？</h2>
            </div>
            <p className="lead">
              <strong>Behavior-Driven Development（振る舞い駆動開発）</strong>は Dan North が 2006
              年に提唱した開発手法です。TDD を発展させ、
              <strong>
                ビジネス関係者・開発者・テスターが共通言語でシステムの振る舞いを先に定義し、それを実行可能な仕様として自動テストに落とし込む
              </strong>
              アプローチです。
            </p>
            <div className="co co-s">
              <span className="co-ico">💡</span>
              <div className="co-body">
                <div className="co-ttl">核心思想</div>
                <p>
                  「テストは技術者のためだけのものではない。ビジネス側と技術側が同じ言葉でシステムの期待する振る舞いを記述し、その仕様そのものが自動テストとして動き続ける」
                </p>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">1.1 BDDが解決する4つの問題</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_PROBLEMS} preserveNaturalScale={true} />
              </div>
              <div className="cg cg2" style={{ marginTop: 16 }}>
                <div className="card rc">
                  <div className="ct">❌ 導入前：要件の認識齟齬</div>
                  <div className="cd">
                    PO・開発者・QA
                    が同じ文書を読んでも異なる解釈をする。認識合わせのコストが膨大になる。
                  </div>
                </div>
                <div className="card gc">
                  <div className="ct">✅ 導入後：共通言語で合意</div>
                  <div className="cd">
                    Gherkin
                    シナリオが「唯一の真実」として機能。全員が同じ具体例に基づいて議論できる。
                  </div>
                </div>
                <div className="card rc">
                  <div className="ct">❌ 導入前：仕様書が陳腐化</div>
                  <div className="cd">
                    Word
                    の要件定義書はコードと乖離し続ける。「誰も読まないドキュメント問題」が慢性化。
                  </div>
                </div>
                <div className="card gc">
                  <div className="ct">✅ 導入後：生きた仕様書</div>
                  <div className="cd">
                    シナリオがそのまま自動テストとして動き続ける。コードとドキュメントが常に一致する。
                  </div>
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">1.2 TDD・BDD・ATDDの位置づけ</div>
              <p>
                3 つの手法は互いを補完する入れ子構造になっています。
                <strong>BDD は ATDD の実践手法</strong>であり、
                <strong>TDD を補完する外側のループ</strong>として機能します。
              </p>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_LEVELS} preserveNaturalScale={true} />
              </div>
              <div className="cg cg3" style={{ marginTop: 16 }}>
                <div className="card bc">
                  <div className="ci">🔵</div>
                  <div className="ct">ATDD（最外層）</div>
                  <div className="cd">
                    受け入れテスト駆動開発。顧客視点で受け入れ基準を定義する最外側のループ
                  </div>
                </div>
                <div className="card gc">
                  <div className="ci">🟢</div>
                  <div className="ct">BDD（中間層）</div>
                  <div className="cd">
                    Gherkin 記法でシナリオを記述。ビジネスと技術の橋渡しをする
                  </div>
                </div>
                <div className="card">
                  <div className="ci">🔴</div>
                  <div className="ct">TDD（最内層）</div>
                  <div className="cd">
                    コードレベルのユニットテスト。開発者中心の最も細かいループ
                  </div>
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">1.3 BDDが特に効果的な状況</div>
              <div className="cg cg2">
                <div className="card gc">
                  <div className="ct">✅ 適したチーム構成</div>
                  <ul className="bp" style={{ marginTop: 8 }}>
                    <li>
                      <span className="ok">●</span>PO・BA・開発者・QA が混在するチーム
                    </li>
                    <li>
                      <span className="ok">●</span>ビジネス側が仕様に積極的に関与する
                    </li>
                    <li>
                      <span className="ok">●</span>認識齟齬・手戻りが頻発している
                    </li>
                    <li>
                      <span className="ok">●</span>アジャイル・スクラムを実践している
                    </li>
                  </ul>
                </div>
                <div className="card gc">
                  <div className="ct">✅ 適したプロジェクト特性</div>
                  <ul className="bp" style={{ marginTop: 8 }}>
                    <li>
                      <span className="ok">●</span>複雑なビジネスルールが多数ある
                    </li>
                    <li>
                      <span className="ok">●</span>受け入れ基準が曖昧になりやすい
                    </li>
                    <li>
                      <span className="ok">●</span>長期保守される基幹システム
                    </li>
                    <li>
                      <span className="ok">●</span>リグレッションが頻発している
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* S2 */}
          <section className="sec" id="s2">
            <div className="sec-hd">
              <span className="sec-num">02</span>
              <h2 className="sec-title">BDDの基本：Given-When-Then構文</h2>
            </div>
            <p className="lead">
              <strong>Given-When-Then（GWT）</strong>は BDD
              シナリオを記述するための構造化された構文です。「前提条件・操作・期待結果」の 3
              ステップでシステムの振る舞いを誰でも読める形で表現します。
            </p>
            <div className="mbox">
              <MermaidDiagram chart={DIAGRAM_GWT} preserveNaturalScale={true} />
            </div>
            <div className="sub">
              <div className="sub-title">2.1 各キーワードの役割</div>
              <div className="cg cg3">
                <div className="card bc">
                  <div className="ci">
                    <span className="b-given">Given</span>
                  </div>
                  <div className="ct" style={{ marginTop: 8 }}>
                    前提条件（Context）
                  </div>
                  <div className="cd">
                    テスト開始時のシステム状態。「〜の状態において」「〜である場合」を記述。例：
                    <em>顧客がログインしている</em>
                  </div>
                </div>
                <div className="card oc">
                  <div className="ci">
                    <span className="b-when">When</span>
                  </div>
                  <div className="ct" style={{ marginTop: 8 }}>
                    操作・イベント（Action）
                  </div>
                  <div className="cd">
                    ユーザーまたはシステムのアクション。「〜したとき」「〜が発生したとき」を記述。例：
                    <em>商品をカートに追加する</em>
                  </div>
                </div>
                <div className="card gc">
                  <div className="ci">
                    <span className="b-then">Then</span>
                  </div>
                  <div className="ct" style={{ marginTop: 8 }}>
                    期待される結果（Outcome）
                  </div>
                  <div className="cd">
                    システムが示すべき振る舞い。「〜になるはずである」「〜が表示されるはずである」を記述。例：
                    <em>合計金額が表示される</em>
                  </div>
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">2.2 And / But キーワード</div>
              <p>
                <span className="b-and">And</span> と <span className="b-and">But</span>{" "}
                は前のステップと同種のステップを継続するために使います。
              </p>
              <div className="co co-i">
                <span className="co-ico">📖</span>
                <div className="co-body">
                  <div className="co-ttl">記述例</div>
                  <p>
                    <span className="b-given">Given</span> 顧客の口座残高が{" "}
                    <strong>10,000円</strong> である
                    <br />
                    <span className="b-and">And</span> 本人確認が完了している
                    <br />
                    <span className="b-when">When</span> 顧客が <strong>3,000円</strong> を引き出す
                    <br />
                    <span className="b-then">Then</span> 口座残高は <strong>7,000円</strong> になる
                    <br />
                    <span className="b-and">And</span> 取引明細に「出金 3,000円」が記録される
                  </p>
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">2.3 良いGWTと悪いGWTの比較</div>
              <div className="comp">
                <div className="comp-c comp-good">
                  <div className="comp-lbl">✅ 良い GWT</div>
                  <p>
                    <span className="b-given">Given</span> 顧客「山田太郎」がログインしている
                    <br />
                    <span className="b-when">When</span> 商品「Tシャツ」を <strong>1</strong>{" "}
                    点カートに追加する
                    <br />
                    <span className="b-then">Then</span> カートに <strong>1</strong>{" "}
                    点の商品が入っている
                    <br />
                    <span className="b-and">And</span> カートの合計金額は <strong>1,000円</strong>{" "}
                    である
                  </p>
                  <ul className="bp" style={{ marginTop: 10 }}>
                    <li>
                      <span className="ok">✓</span> 具体的な名前と数値
                    </li>
                    <li>
                      <span className="ok">✓</span> 1シナリオ1ふるまい
                    </li>
                    <li>
                      <span className="ok">✓</span> ビジネス語彙のみ使用
                    </li>
                  </ul>
                </div>
                <div className="comp-c comp-bad">
                  <div className="comp-lbl">❌ 悪い GWT</div>
                  <p>
                    <span className="b-given">Given</span> システムが正常な状態
                    <br />
                    <span className="b-when">When</span> ボタンをクリックする
                    <br />
                    <span className="b-then">Then</span> データが保存される
                  </p>
                  <ul className="bp" style={{ marginTop: 10 }}>
                    <li>
                      <span className="ng">✗</span> 「正常な状態」が曖昧
                    </li>
                    <li>
                      <span className="ng">✗</span> どのボタンか不明
                    </li>
                    <li>
                      <span className="ng">✗</span> 検証基準がない
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">2.4 ユーザーストーリーとGWTの関係</div>
              <p>
                ユーザーストーリーは「何を・なぜ」を表現し、BDD
                シナリオはそれを「具体的な例」に変換します。1
                ストーリーから正常系・異常系の複数シナリオが生まれます。
              </p>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_STORY} preserveNaturalScale={true} />
              </div>
            </div>
          </section>

          {/* S3 */}
          <section className="sec" id="s3">
            <div className="sec-hd">
              <span className="sec-num">03</span>
              <h2 className="sec-title">Gherkin記法の完全解説</h2>
            </div>
            <p className="lead">
              <strong>Gherkin</strong> は BDD
              シナリオを記述するための構造化された自然言語記法です。英語・日本語など多言語に対応し、Cucumber
              をはじめ多くの BDD フレームワークが採用しています。
            </p>
            <div className="sub">
              <div className="sub-title">3.1 全キーワード体系</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_KEYWORDS} preserveNaturalScale={true} />
              </div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>キーワード</th>
                      <th>用途</th>
                      <th>使用場所</th>
                      <th>補足</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>Feature</code>
                      </td>
                      <td>テストする機能の説明</td>
                      <td>ファイル先頭（1つだけ）</td>
                      <td>ユーザーストーリーを記述することが多い</td>
                    </tr>
                    <tr>
                      <td>
                        <code>Background</code>
                      </td>
                      <td>全シナリオ共通の前提条件</td>
                      <td>Feature 直後</td>
                      <td>Given・And・But ステップのみ使用可</td>
                    </tr>
                    <tr>
                      <td>
                        <code>Scenario</code>
                      </td>
                      <td>1 つの具体的なテストケース</td>
                      <td>Feature 内</td>
                      <td>明確で具体的なタイトルをつける</td>
                    </tr>
                    <tr>
                      <td>
                        <code>Scenario Outline</code>
                      </td>
                      <td>パラメータ化されたシナリオ</td>
                      <td>Feature 内</td>
                      <td>Examples テーブルと必ずセットで使う</td>
                    </tr>
                    <tr>
                      <td>
                        <code>Given / When / Then</code>
                      </td>
                      <td>前提条件 / 操作 / 期待結果</td>
                      <td>Scenario 内</td>
                      <td>それぞれ独立した役割を持つ</td>
                    </tr>
                    <tr>
                      <td>
                        <code>And / But</code>
                      </td>
                      <td>前のステップと同種のステップを継続</td>
                      <td>Scenario 内</td>
                      <td>Given-And-And の形でも使用可</td>
                    </tr>
                    <tr>
                      <td>
                        <code>Examples</code>
                      </td>
                      <td>Scenario Outline のパラメータテーブル</td>
                      <td>Outline 直後</td>
                      <td>複数の Examples ブロックも記述可能</td>
                    </tr>
                    <tr>
                      <td>
                        <code>@タグ</code>
                      </td>
                      <td>シナリオの分類・フィルタリング</td>
                      <td>Feature/Scenario 前</td>
                      <td>例：@smoke @regression @wip @api</td>
                    </tr>
                    <tr>
                      <td>
                        <code>DocString</code>
                      </td>
                      <td>複数行テキスト（3 つのダブルクォート）</td>
                      <td>ステップ直後（インデント）</td>
                      <td>JSON・SQL・XML 等の長いデータに使用</td>
                    </tr>
                    <tr>
                      <td>
                        <code>| テーブル |</code>
                      </td>
                      <td>DataTable：表形式データ</td>
                      <td>ステップ直後（インデント）</td>
                      <td>複数のパラメータを整理して渡す</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">3.2 Featureファイルの完全記述例</div>
              <div className="fp">features/shopping_cart.feature</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang gl">Gherkin</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="cm">@shopping @cart</span>
<span class="kw">Feature:</span> ショッピングカートの操作
  登録済みの顧客として
  カートに商品を追加・削除したい
  まとめて購入を確定できるから

  <span class="kw">Background:</span>
    <span class="kw">Given</span> 以下の商品がカタログに登録されている
      | 商品ID   | 商品名   | 価格 | 在庫数 |
      | prod_001 | Tシャツ  | 1000 | 10     |
      | prod_002 | ジーンズ | 5000 | 3      |
      | prod_003 | キャップ | 2000 | 0      |
    <span class="kw">And</span> 顧客「山田太郎（cust_001）」がログインしている

  <span class="cm">@smoke</span>
  <span class="kw">Scenario:</span> 商品をカートに追加する
    <span class="kw">Given</span> カートが空の状態である
    <span class="kw">When</span> 商品「Tシャツ」を 1 点カートに追加する
    <span class="kw">Then</span> カートには 1 点の商品が入っている
    <span class="kw">And</span> カートの合計金額は 1,000円 である

  <span class="cm">@negative</span>
  <span class="kw">Scenario:</span> 在庫切れの商品はカートに追加できない
    <span class="kw">Given</span> カートが空の状態である
    <span class="kw">When</span> 商品「キャップ」をカートに追加しようとする
    <span class="kw">Then</span> 「在庫切れのため追加できません」というエラーが表示される
    <span class="kw">And</span> カートの中身は変わらない

  <span class="cm">@parameterized</span>
  <span class="kw">Scenario Outline:</span> 異なる数量で商品をカートに追加する
    <span class="kw">Given</span> カートが空の状態である
    <span class="kw">When</span> 商品「Tシャツ」を &lt;数量&gt; 点カートに追加する
    <span class="kw">Then</span> カートの合計金額は &lt;合計金額&gt; 円である
    <span class="kw">Examples:</span>
      | 数量 | 合計金額 |
      | 1    | 1000     |
      | 2    | 2000     |
      | 5    | 5000     |

  <span class="cm">@api</span>
  <span class="kw">Scenario:</span> APIを通じて注文を作成する
    <span class="kw">Given</span> カートに商品「Tシャツ」が 1 点入っている
    <span class="kw">When</span> 以下のJSONで注文を送信する（DocString）
      <span class="st">"""json
      {
        "shipping_address": { "postal_code": "150-0001", "prefecture": "東京都" },
        "payment_method": "credit_card"
      }
      """</span>
    <span class="kw">Then</span> レスポンスステータスは 201 である
    <span class="kw">And</span> レスポンスに "order_id" フィールドが含まれている`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">3.3 タグの活用戦略</div>
              <div className="cg cg3">
                <div className="card">
                  <div className="ci">
                    <span className="tag tg">@smoke</span>
                  </div>
                  <div className="ct" style={{ marginTop: 8 }}>
                    スモークテスト
                  </div>
                  <div className="cd">
                    最小限の動作確認。PR 時に高速実行（5 分以内）。最重要シナリオに付与する。
                  </div>
                </div>
                <div className="card">
                  <div className="ci">
                    <span className="tag tb">@regression</span>
                  </div>
                  <div className="ct" style={{ marginTop: 8 }}>
                    リグレッション
                  </div>
                  <div className="cd">
                    マージ前の全機能確認。CI/CD パイプラインで実行する全シナリオ対象。
                  </div>
                </div>
                <div className="card">
                  <div className="ci">
                    <span className="tag to">@wip</span>
                  </div>
                  <div className="ct" style={{ marginTop: 8 }}>
                    開発中（WIP）
                  </div>
                  <div className="cd">
                    作業中シナリオ。CI では除外。完成したら削除する一時的タグ。
                  </div>
                </div>
                <div className="card">
                  <div className="ci">
                    <span className="tag tr2">@negative</span>
                  </div>
                  <div className="ct" style={{ marginTop: 8 }}>
                    異常系テスト
                  </div>
                  <div className="cd">
                    エラー・例外シナリオのグルーピング。@smoke とは分離して管理する。
                  </div>
                </div>
                <div className="card">
                  <div className="ci">
                    <span className="tag tb">@api</span>
                  </div>
                  <div className="ct" style={{ marginTop: 8 }}>
                    APIテスト
                  </div>
                  <div className="cd">
                    HTTP レベルのテストシナリオ。API サーバーが起動している環境で実行。
                  </div>
                </div>
                <div className="card">
                  <div className="ci">
                    <span className="tag tp">@e2e</span>
                  </div>
                  <div className="ct" style={{ marginTop: 8 }}>
                    E2Eテスト
                  </div>
                  <div className="cd">
                    ブラウザ操作を伴うフルスタックテスト。本番近似環境でのみ実行。
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* S4 */}
          <section className="sec" id="s4">
            <div className="sec-hd">
              <span className="sec-num">04</span>
              <h2 className="sec-title">BDDの開発フロー</h2>
            </div>
            <p className="lead">
              BDD は単なるテスト技法ではなく、<strong>要件定義から実装・ドキュメント化まで</strong>
              をカバーする開発プロセスです。「発見→定式化→自動化→検証→生きた仕様書」の 5
              ステップで進みます。
            </p>
            <div className="sub">
              <div className="sub-title">4.1 BDD全体開発サイクル</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_CYCLE} preserveNaturalScale={true} />
              </div>
              <ol className="sl">
                <li>
                  <span className="sl-n">1</span>
                  <div className="sl-c">
                    <strong>Discovery（発見）— Three Amigos ミーティング</strong>
                    <p>
                      PO・開発者・QA
                      が集まり、機能の振る舞いを議論。「具体的な例」を出し合うことで認識のズレを発見する。所要時間：30〜60
                      分/ストーリー
                    </p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">2</span>
                  <div className="sl-c">
                    <strong>Formulation（定式化）— Gherkin 記述</strong>
                    <p>
                      議論から生まれた具体例を Gherkin 記法で記述。あいまいさをなくし、全員が「Yes,
                      that's right」と言える仕様書を作る。
                    </p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">3</span>
                  <div className="sl-c">
                    <strong>Automation（自動化）— ステップ定義</strong>
                    <p>
                      Gherkin シナリオをステップコードにバインドして FAIL
                      する自動テストを作る。「レッド」状態から開発を始める。
                    </p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">4</span>
                  <div className="sl-c">
                    <strong>Validate（検証）— 実装とテスト通過</strong>
                    <p>
                      シナリオをパスする実装を行い「グリーン」にする。ビジネス側が実行結果を確認し受け入れる。
                    </p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">5</span>
                  <div className="sl-c">
                    <strong>Living Documentation（生きた仕様書）</strong>
                    <p>
                      シナリオは常に実行可能な最新の仕様書として機能し続ける。コードとドキュメントの乖離が構造的に発生しない。
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="sub">
              <div className="sub-title">4.2 Three Amigos ミーティング</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_AMIGOS} preserveNaturalScale={true} />
              </div>
              <div className="co co-i">
                <span className="co-ico">💬</span>
                <div className="co-body">
                  <div className="co-ttl">Three Amigos の進め方（30〜60 分）</div>
                  <p>
                    ① PO がビジネスルールと目的を説明 → ② QA がエッジケース・異常系を提案 → ③
                    開発者が技術的制約を共有 → ④ 3 者合意の Gherkin シナリオを作成 → ⑤ Feature
                    ファイルをリポジトリにコミット
                  </p>
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">4.3 スプリントへのBDD組み込み方</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_SPRINT} preserveNaturalScale={true} />
              </div>
            </div>
          </section>

          {/* S5 */}
          <section className="sec" id="s5">
            <div className="sec-hd">
              <span className="sec-num">05</span>
              <h2 className="sec-title">ツールチェーンの選定</h2>
            </div>
            <div className="sub">
              <div className="sub-title">5.1 言語別 BDD フレームワーク比較</div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>言語</th>
                      <th>推奨フレームワーク</th>
                      <th>特徴</th>
                      <th>適した場面</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        🐍 <strong>Python</strong>
                      </td>
                      <td>
                        <code>pytest-bdd</code> / Behave
                      </td>
                      <td>pytest エコシステムと統合。フィクスチャが強力</td>
                      <td>データサイエンス・Web API・自動化スクリプト</td>
                    </tr>
                    <tr>
                      <td>
                        ☕ <strong>Java</strong>
                      </td>
                      <td>Cucumber-JVM / Serenity BDD</td>
                      <td>エンタープライズ向け。Spring との統合が容易</td>
                      <td>大規模 Web アプリ・マイクロサービス</td>
                    </tr>
                    <tr>
                      <td>
                        🟨 <strong>JavaScript</strong>
                      </td>
                      <td>Cucumber.js / jest-cucumber</td>
                      <td>Node.js 環境。Playwright/Cypress との統合</td>
                      <td>フロントエンド・フルスタック JS</td>
                    </tr>
                    <tr>
                      <td>
                        🔵 <strong>.NET</strong>
                      </td>
                      <td>SpecFlow</td>
                      <td>.NET エコシステムにネイティブ統合</td>
                      <td>C#/ASP.NET アプリケーション</td>
                    </tr>
                    <tr>
                      <td>
                        💎 <strong>Ruby</strong>
                      </td>
                      <td>Cucumber（オリジナル）</td>
                      <td>BDD の原点。最も成熟したエコシステム</td>
                      <td>Ruby on Rails・レガシー移行</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">5.2 Python 推奨ツールスタック</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_TOOLS} preserveNaturalScale={true} />
              </div>
              <div className="co co-s">
                <span className="co-ico">⭐</span>
                <div className="co-body">
                  <div className="co-ttl">pytest-bdd を推奨する理由</div>
                  <p>
                    ① pytest の強力なフィクスチャシステムとフル統合 ② conftest.py
                    による共通設定の管理 ③ パラメータ化テストとの組み合わせ ④ CI
                    ツールとの親和性（GitHub Actions, CircleCI 等）⑤ Allure
                    レポートとのシームレスな統合
                  </p>
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">5.3 インストールコマンド</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang bl">Bash</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="cm"># コア依存関係</span>
pip install pytest pytest-bdd

<span class="cm"># API テスト</span>
pip install httpx requests

<span class="cm"># UI テスト（Playwright）</span>
pip install playwright pytest-playwright
playwright install chromium

<span class="cm"># テストデータ生成</span>
pip install factory-boy

<span class="cm"># レポート生成</span>
pip install allure-pytest pytest-html

<span class="cm"># DB 統合テスト</span>
pip install testcontainers sqlalchemy`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* S6 */}
          <section className="sec" id="s6">
            <div className="sec-hd">
              <span className="sec-num">06</span>
              <h2 className="sec-title">Cucumber 完全実装ガイド（Java）</h2>
            </div>
            <div className="sub">
              <div className="sub-title">6.1 Cucumber のアーキテクチャ</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_CUCUMBER_ARCH} preserveNaturalScale={true} />
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">6.2 ステップ定義の実装（Java）</div>
              <div className="fp">src/test/java/steps/ShoppingCartSteps.java</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang jl">Java</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="kw">package</span> steps;

<span class="kw">import</span> io.cucumber.java.ja.*;
<span class="kw">import</span> io.cucumber.java.*;
<span class="kw">import static</span> org.assertj.core.api.Assertions.*;

<span class="kw">public class</span> <span class="fn">ShoppingCartSteps</span> {

    <span class="kw">private</span> ShoppingCart cart;
    <span class="kw">private</span> ProductCatalog catalog;
    <span class="kw">private</span> Exception lastException;

    <span class="kw">@Before</span>
    <span class="kw">public void</span> <span class="fn">setUp</span>() {
        catalog = <span class="kw">new</span> InMemoryProductCatalog();
        cart = <span class="kw">new</span> ShoppingCart(catalog);
    }

    <span class="kw">@After</span>
    <span class="kw">public void</span> <span class="fn">tearDown</span>() { cart = <span class="kw">null</span>; }

    <span class="cm">// ─── Given ステップ ───</span>
    <span class="kw">@Given</span>(<span class="st">"カートが空の状態である"</span>)
    <span class="kw">public void</span> <span class="fn">カートが空の状態である</span>() {
        assertThat(cart.isEmpty()).isTrue();
    }

    <span class="kw">@Given</span>(<span class="st">"顧客{string}がログインしている"</span>)
    <span class="kw">public void</span> <span class="fn">顧客がログインしている</span>(String customerName) {
        AuthContext.login(customerName);
    }

    <span class="cm">// ─── When ステップ ───</span>
    <span class="kw">@When</span>(<span class="st">"商品{string}を {int} 点カートに追加する"</span>)
    <span class="kw">public void</span> <span class="fn">商品をカートに追加する</span>(String productName, <span class="kw">int</span> quantity) {
        <span class="kw">try</span> {
            Product product = catalog.findByName(productName);
            cart.addItem(product.getId(), quantity);
        } <span class="kw">catch</span> (Exception e) {
            lastException = e;
        }
    }

    <span class="cm">// ─── Then ステップ ───</span>
    <span class="kw">@Then</span>(<span class="st">"カートには {int} 点の商品が入っている"</span>)
    <span class="kw">public void</span> <span class="fn">カートには点の商品が入っている</span>(<span class="kw">int</span> expectedCount) {
        assertThat(cart.getTotalQuantity()).isEqualTo(expectedCount);
    }

    <span class="kw">@Then</span>(<span class="st">"カートの合計金額は {int}円 である"</span>)
    <span class="kw">public void</span> <span class="fn">カートの合計金額は円である</span>(<span class="kw">int</span> expectedTotal) {
        assertThat(cart.getTotal()).isEqualTo(expectedTotal);
    }

    <span class="kw">@Then</span>(<span class="st">"{string}というエラーが表示される"</span>)
    <span class="kw">public void</span> <span class="fn">エラーが表示される</span>(String expectedMessage) {
        assertThat(lastException).isNotNull();
        assertThat(lastException.getMessage()).contains(expectedMessage);
    }
}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* S7 */}
          <section className="sec" id="s7">
            <div className="sec-hd">
              <span className="sec-num">07</span>
              <h2 className="sec-title">pytest-bdd 完全実装ガイド</h2>
            </div>
            <div className="sub">
              <div className="sub-title">7.1 推奨プロジェクト構成</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang bl">Project Structure</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `my_project/
├── features/                   <span class="cm"># Gherkin Feature ファイル</span>
│   ├── shopping_cart.feature
│   ├── order.feature
│   └── payment.feature
├── tests/
│   └── bdd/
│       ├── conftest.py         <span class="cm"># フィクスチャ・フック定義</span>
│       ├── steps/
│       │   ├── __init__.py
│       │   ├── cart_steps.py
│       │   ├── order_steps.py
│       │   └── common_steps.py
│       └── test_scenarios.py   <span class="cm"># シナリオのバインディング</span>
├── src/
│   ├── domain/
│   │   ├── cart.py
│   │   └── product.py
│   └── application/
│       └── cart_service.py
└── pyproject.toml`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">7.2 conftest.py — フィクスチャ定義</div>
              <div className="fp">tests/bdd/conftest.py</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang pl">Python</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="kw">import</span> pytest
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass, field
<span class="kw">from</span> typing <span class="kw">import</span> Optional, Any
<span class="kw">import</span> httpx
<span class="kw">from</span> src.domain.cart <span class="kw">import</span> ShoppingCart
<span class="kw">from</span> src.infrastructure.in_memory_catalog <span class="kw">import</span> InMemoryProductCatalog


<span class="kw">@dataclass</span>
<span class="kw">class</span> <span class="fn">ScenarioContext</span>:
    <span class="st">"""ステップ間で状態を共有するコンテキストクラス"""</span>
    last_error:    Optional[Exception] = <span class="kw">None</span>
    last_response: Optional[httpx.Response] = <span class="kw">None</span>
    data:          dict = field(default_factory=dict)

    <span class="kw">def</span> <span class="fn">set</span>(self, key: str, value: Any) -> <span class="kw">None</span>:
        self.data[key] = value

    <span class="kw">def</span> <span class="fn">get</span>(self, key: str, default: Any = <span class="kw">None</span>) -> Any:
        return self.data.get(key, default)

    <span class="kw">def</span> <span class="fn">reset</span>(self) -> <span class="kw">None</span>:
        self.last_error = <span class="kw">None</span>
        self.last_response = <span class="kw">None</span>
        self.data.clear()


<span class="kw">@pytest.fixture</span>
<span class="kw">def</span> <span class="fn">product_catalog</span>():
    <span class="kw">return</span> InMemoryProductCatalog()


<span class="kw">@pytest.fixture</span>
<span class="kw">def</span> <span class="fn">shopping_cart</span>(product_catalog):
    <span class="kw">return</span> ShoppingCart(catalog=product_catalog)


<span class="kw">@pytest.fixture</span>
<span class="kw">def</span> <span class="fn">context</span>() -> ScenarioContext:
    <span class="st">"""各シナリオ用コンテキスト（function スコープ）"""</span>
    ctx = ScenarioContext()
    <span class="kw">yield</span> ctx
    ctx.reset()  <span class="cm"># テスト後に自動リセット</span>


<span class="kw">@pytest.fixture</span>(scope=<span class="st">"session"</span>)
<span class="kw">def</span> <span class="fn">db_engine</span>():
    <span class="st">"""DB エンジン（セッション全体で 1 回のみ作成）"""</span>
    <span class="kw">from</span> sqlalchemy <span class="kw">import</span> create_engine
    <span class="kw">from</span> src.infrastructure.db <span class="kw">import</span> Base
    engine = create_engine(<span class="st">"sqlite:///:memory:"</span>)
    Base.metadata.create_all(engine)
    <span class="kw">yield</span> engine
    engine.dispose()


<span class="kw">@pytest.fixture</span>
<span class="kw">def</span> <span class="fn">db_session</span>(db_engine):
    <span class="st">"""DB セッション（各テストごとにロールバック）"""</span>
    <span class="kw">from</span> sqlalchemy.orm <span class="kw">import</span> sessionmaker
    Session = sessionmaker(bind=db_engine)
    session = Session()
    <span class="kw">yield</span> session
    session.rollback()  <span class="cm"># テスト後ロールバックでクリーンな状態を保証</span>
    session.close()


<span class="cm"># ─── BDD フック ───</span>
<span class="kw">def</span> <span class="fn">pytest_bdd_before_scenario</span>(request, feature, scenario):
    print(f<span class="st">"\\n📋 シナリオ開始: {scenario.name}"</span>)

<span class="kw">def</span> <span class="fn">pytest_bdd_after_scenario</span>(request, feature, scenario):
    print(f<span class="st">"✅ シナリオ完了: {scenario.name}"</span>)

<span class="kw">def</span> <span class="fn">pytest_bdd_step_error</span>(request, feature, scenario, step, step_func, step_func_args, exception):
    print(f<span class="st">"❌ ステップ失敗: {step.name} — {exception}"</span>)`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">7.3 cart_steps.py — ステップ定義</div>
              <div className="fp">tests/bdd/steps/cart_steps.py</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang pl">Python</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="kw">import</span> pytest
<span class="kw">from</span> pytest_bdd <span class="kw">import</span> given, when, then, parsers
<span class="kw">from</span> src.domain.cart <span class="kw">import</span> ShoppingCart, InsufficientStockError
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal


<span class="cm"># ─────────── Given ステップ ───────────</span>

<span class="kw">@given</span>(<span class="st">"カートが空の状態である"</span>)
<span class="kw">def</span> <span class="fn">cart_is_empty</span>(shopping_cart):
    <span class="kw">assert</span> shopping_cart.is_empty, <span class="st">"カートは空でなければなりません"</span>


<span class="kw">@given</span>(parsers.parse(<span class="st">"カートに商品「{product_name}」が{quantity:d}点入っている"</span>))
<span class="kw">def</span> <span class="fn">cart_has_items</span>(product_name, quantity, shopping_cart, product_catalog):
    product = product_catalog.find_by_name(product_name)
    shopping_cart.add_item(product.id, quantity)


<span class="kw">@given</span>(<span class="st">"カートに以下の商品が入っている"</span>)
<span class="kw">def</span> <span class="fn">cart_has_multiple_items</span>(shopping_cart, product_catalog, datatable):
    <span class="kw">for</span> row <span class="kw">in</span> datatable:
        product = product_catalog.find_by_name(row[<span class="st">"商品名"</span>])
        shopping_cart.add_item(product.id, int(row[<span class="st">"数量"</span>]))


<span class="cm"># ─────────── When ステップ ───────────</span>

<span class="kw">@when</span>(parsers.parse(<span class="st">"商品「{product_name}」を{quantity:d}点カートに追加する"</span>))
<span class="kw">def</span> <span class="fn">add_item_to_cart</span>(product_name, quantity, shopping_cart, product_catalog, context):
    context.last_error = <span class="kw">None</span>
    <span class="kw">try</span>:
        product = product_catalog.find_by_name(product_name)
        shopping_cart.add_item(product.id, quantity)
    <span class="kw">except</span> InsufficientStockError <span class="kw">as</span> e:
        context.last_error = e


<span class="kw">@when</span>(parsers.parse(<span class="st">"商品「{product_name}」をカートに追加しようとする"</span>))
<span class="kw">def</span> <span class="fn">try_add_out_of_stock</span>(product_name, shopping_cart, product_catalog, context):
    context.last_error = <span class="kw">None</span>
    <span class="kw">try</span>:
        product = product_catalog.find_by_name(product_name)
        shopping_cart.add_item(product.id, 1)
    <span class="kw">except</span> InsufficientStockError <span class="kw">as</span> e:
        context.last_error = e


<span class="kw">@when</span>(parsers.parse(<span class="st">"カートから「{product_name}」を削除する"</span>))
<span class="kw">def</span> <span class="fn">remove_item_from_cart</span>(product_name, shopping_cart, product_catalog):
    product = product_catalog.find_by_name(product_name)
    shopping_cart.remove_item(product.id)


<span class="cm"># ─────────── Then ステップ ───────────</span>

<span class="kw">@then</span>(parsers.parse(<span class="st">"カートには{expected_count:d}点の商品が入っている"</span>))
<span class="kw">def</span> <span class="fn">cart_has_count</span>(expected_count, shopping_cart):
    <span class="kw">assert</span> shopping_cart.total_quantity == expected_count, (
        f<span class="st">"期待: {expected_count}点, 実際: {shopping_cart.total_quantity}点"</span>
    )


<span class="kw">@then</span>(parsers.parse(<span class="st">"カートの合計金額は{expected_total:d}円である"</span>))
<span class="kw">def</span> <span class="fn">cart_total_is</span>(expected_total, shopping_cart):
    <span class="kw">assert</span> shopping_cart.total == Decimal(str(expected_total)), (
        f<span class="st">"期待: {expected_total}円, 実際: {shopping_cart.total}円"</span>
    )


<span class="kw">@then</span>(parsers.parse(<span class="st">"「{expected_message}」というエラーが表示される"</span>))
<span class="kw">def</span> <span class="fn">error_message_displayed</span>(expected_message, context):
    <span class="kw">assert</span> context.last_error <span class="kw">is not None</span>, <span class="st">"エラーが発生しませんでした"</span>
    <span class="kw">assert</span> expected_message <span class="kw">in</span> str(context.last_error), (
        f<span class="st">"期待: '{expected_message}'\\n実際: '{context.last_error}'"</span>
    )


<span class="kw">@then</span>(<span class="st">"カートの中身は変わらない"</span>)
<span class="kw">def</span> <span class="fn">cart_is_unchanged</span>(shopping_cart, context):
    expected = context.get(<span class="st">"initial_cart"</span>)
    <span class="kw">assert</span> shopping_cart.items == expected, <span class="st">"カートの状態が変わっています"</span>`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">7.4 test_scenarios.py — シナリオバインディング</div>
              <div className="fp">tests/bdd/test_scenarios.py</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang pl">Python</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="kw">import</span> pytest
<span class="kw">from</span> pytest_bdd <span class="kw">import</span> scenario
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal


<span class="kw">@scenario</span>(<span class="st">"../../features/shopping_cart.feature"</span>, <span class="st">"商品をカートに追加する"</span>)
<span class="kw">def</span> <span class="fn">test_add_item_to_cart</span>():
    <span class="kw">pass</span>


<span class="kw">@scenario</span>(<span class="st">"../../features/shopping_cart.feature"</span>, <span class="st">"在庫切れの商品はカートに追加できない"</span>)
<span class="kw">def</span> <span class="fn">test_cannot_add_out_of_stock</span>():
    <span class="kw">pass</span>


<span class="kw">@scenario</span>(<span class="st">"../../features/shopping_cart.feature"</span>, <span class="st">"カートから商品を削除する"</span>)
<span class="kw">def</span> <span class="fn">test_remove_item_from_cart</span>():
    <span class="kw">pass</span>


<span class="cm"># ── Scenario Outline は parametrize と組み合わせる ──</span>
<span class="kw">@pytest.mark.parametrize</span>(<span class="st">"数量,合計金額"</span>, [
    (<span class="st">"1"</span>, <span class="st">"1000"</span>), (<span class="st">"2"</span>, <span class="st">"2000"</span>), (<span class="st">"5"</span>, <span class="st">"5000"</span>), (<span class="st">"10"</span>, <span class="st">"10000"</span>),
])
<span class="kw">def</span> <span class="fn">test_add_different_quantities</span>(数量, 合計金額, shopping_cart, product_catalog):
    <span class="kw">assert</span> shopping_cart.is_empty
    product = product_catalog.find_by_name(<span class="st">"Tシャツ"</span>)
    shopping_cart.add_item(product.id, int(数量))
    <span class="kw">assert</span> shopping_cart.total == Decimal(合計金額)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* S8 */}
          <section className="sec" id="s8">
            <div className="sec-hd">
              <span className="sec-num">08</span>
              <h2 className="sec-title">ステップ定義のベストプラクティス</h2>
            </div>
            <div className="sub">
              <div className="sub-title">8.1 良いステップ定義の設計原則</div>
              <div className="comp">
                <div className="comp-c comp-good">
                  <div className="comp-lbl">✅ 良いステップ定義</div>
                  <ul className="bp">
                    <li>
                      <span className="ok">✓</span>再利用可能な汎用ステップを書く
                    </li>
                    <li>
                      <span className="ok">✓</span>1ステップ = 1つの明確な操作
                    </li>
                    <li>
                      <span className="ok">✓</span>ビジネス語彙を使った命名
                    </li>
                    <li>
                      <span className="ok">✓</span>parsers.parse でパラメータ対応
                    </li>
                    <li>
                      <span className="ok">✓</span>例外もキャッチして context に保存
                    </li>
                    <li>
                      <span className="ok">✓</span>アサーションは Then ステップのみ
                    </li>
                  </ul>
                </div>
                <div className="comp-c comp-bad">
                  <div className="comp-lbl">❌ 避けるべき書き方</div>
                  <ul className="bp">
                    <li>
                      <span className="ng">✗</span>UI 操作の詳細をステップに直接書く
                    </li>
                    <li>
                      <span className="ng">✗</span>1ステップで複数のことを検証
                    </li>
                    <li>
                      <span className="ng">✗</span>技術的詳細（URL・セレクター）を露出
                    </li>
                    <li>
                      <span className="ng">✗</span>ステップ間でグローバル変数を使う
                    </li>
                    <li>
                      <span className="ng">✗</span>Given 内でアサーションを行う
                    </li>
                    <li>
                      <span className="ng">✗</span>重複ステップを複数ファイルに定義
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">8.2 DataTable と DocString の活用</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang pl">Python</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="kw">import</span> json
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal


<span class="cm"># ─── DataTable：表形式データの処理 ───</span>

<span class="kw">@given</span>(<span class="st">"以下の商品がカタログに登録されている"</span>)
<span class="kw">def</span> <span class="fn">products_in_catalog</span>(datatable, product_catalog):
    <span class="kw">for</span> row <span class="kw">in</span> datatable:
        product = Product(
            id=row[<span class="st">"商品ID"</span>], name=row[<span class="st">"商品名"</span>],
            price=Decimal(row[<span class="st">"価格"</span>]), stock=int(row[<span class="st">"在庫数"</span>]),
        )
        product_catalog.register(product)


<span class="cm"># ─── DocString：複数行テキスト（JSON 等）の処理 ───</span>

<span class="kw">@when</span>(<span class="st">"以下のJSONで注文を送信する（DocString）"</span>)
<span class="kw">def</span> <span class="fn">send_order_with_json</span>(docstring, context, api_client):
    <span class="kw">try</span>:
        body = json.loads(docstring)
    <span class="kw">except</span> json.JSONDecodeError <span class="kw">as</span> e:
        <span class="kw">raise</span> AssertionError(f<span class="st">"不正な JSON: {e}"</span>)
    context.last_response = api_client.post(<span class="st">"/v1/orders"</span>, json=body)


<span class="kw">@then</span>(parsers.parse(<span class="st">"レスポンスステータスは {status_code:d} である"</span>))
<span class="kw">def</span> <span class="fn">response_status_is</span>(status_code, context):
    actual = context.last_response.status_code
    <span class="kw">assert</span> actual == status_code, (
        f<span class="st">"期待: HTTP {status_code}, 実際: HTTP {actual}\\n"</span>
        f<span class="st">"Body: {context.last_response.text}"</span>
    )`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">8.3 ステップの分類と配置戦略</div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>ファイル名</th>
                      <th>対象</th>
                      <th>含むステップ例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>common_steps.py</code>
                      </td>
                      <td>全 Feature 共通</td>
                      <td>ログイン/ログアウト・時刻設定・メール確認</td>
                    </tr>
                    <tr>
                      <td>
                        <code>cart_steps.py</code>
                      </td>
                      <td>カートドメイン</td>
                      <td>商品追加・削除・合計金額確認</td>
                    </tr>
                    <tr>
                      <td>
                        <code>order_steps.py</code>
                      </td>
                      <td>注文ドメイン</td>
                      <td>注文作成・ステータス確認・キャンセル</td>
                    </tr>
                    <tr>
                      <td>
                        <code>api_steps.py</code>
                      </td>
                      <td>API 共通</td>
                      <td>HTTP リクエスト送信・ステータス検証</td>
                    </tr>
                    <tr>
                      <td>
                        <code>ui_steps.py</code>
                      </td>
                      <td>UI 共通</td>
                      <td>ページ遷移・要素表示確認・フォーム入力</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* S9 */}
          <section className="sec" id="s9">
            <div className="sec-hd">
              <span className="sec-num">09</span>
              <h2 className="sec-title">フィクスチャとコンテキスト管理</h2>
            </div>
            <div className="sub">
              <div className="sub-title">9.1 フィクスチャのスコープ選択指針</div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>スコープ</th>
                      <th>生存期間</th>
                      <th>推奨用途</th>
                      <th>BDD での使用</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>session</code>
                      </td>
                      <td>セッション全体で 1 回</td>
                      <td>DB エンジン・ブラウザ起動・重い初期化</td>
                      <td>⚠️ 限定的に使用</td>
                    </tr>
                    <tr>
                      <td>
                        <code>module</code>
                      </td>
                      <td>ファイル単位</td>
                      <td>モジュール共通の設定オブジェクト</td>
                      <td>⚠️ 限定的に使用</td>
                    </tr>
                    <tr>
                      <td>
                        <code>function</code>（デフォルト）
                      </td>
                      <td>各テスト関数ごと</td>
                      <td>ほぼすべてのフィクスチャ</td>
                      <td>✅ BDD での標準</td>
                    </tr>
                    <tr>
                      <td>
                        <code>class</code>
                      </td>
                      <td>クラス単位</td>
                      <td>クラス内テストで状態共有が必要な場合</td>
                      <td>⚠️ 稀に使用</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="co co-s">
                <span className="co-ico">💡</span>
                <div className="co-body">
                  <div className="co-ttl">BDD のベストプラクティス</div>
                  <p>
                    BDD シナリオには原則として <code>function</code>{" "}
                    スコープを使用します。各シナリオが独立して実行できることが最重要であり、前のシナリオの状態が次のシナリオに漏れ出ることを防ぎます。
                    <code>session</code> スコープは DB 接続など「重い初期化」に限定してください。
                  </p>
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">9.2 DB トランザクション管理パターン</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang pl">Python</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="kw">import</span> pytest
<span class="kw">from</span> sqlalchemy <span class="kw">import</span> create_engine
<span class="kw">from</span> sqlalchemy.orm <span class="kw">import</span> sessionmaker
<span class="kw">from</span> src.infrastructure.db <span class="kw">import</span> Base


<span class="kw">@pytest.fixture</span>(scope=<span class="st">"session"</span>)
<span class="kw">def</span> <span class="fn">db_engine</span>():
    <span class="st">"""セッション全体で 1 回のみ作成（重いため）"""</span>
    engine = create_engine(<span class="st">"sqlite:///:memory:"</span>, echo=<span class="kw">False</span>)
    Base.metadata.create_all(engine)
    <span class="kw">yield</span> engine
    engine.dispose()


<span class="kw">@pytest.fixture</span>
<span class="kw">def</span> <span class="fn">db_session</span>(db_engine):
    <span class="st">"""
    各テストごとにネストトランザクションを作成し、
    テスト後に必ずロールバックして DB をクリーンに保つ
    """</span>
    connection = db_engine.connect()
    transaction = connection.begin()
    Session = sessionmaker(bind=connection)
    session = Session()

    <span class="kw">yield</span> session

    session.close()
    transaction.rollback()  <span class="cm"># テスト後に必ずロールバック</span>
    connection.close()


<span class="kw">@pytest.fixture</span>
<span class="kw">def</span> <span class="fn">api_client</span>(app, db_session):
    <span class="st">"""FastAPI テストクライアント。db_session を差し込む。"""</span>
    <span class="kw">from</span> fastapi.testclient <span class="kw">import</span> TestClient
    app.dependency_overrides[get_db] = <span class="kw">lambda</span>: db_session
    <span class="kw">with</span> TestClient(app) <span class="kw">as</span> client:
        <span class="kw">yield</span> client
    app.dependency_overrides.clear()`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* S10 */}
          <section className="sec" id="s10">
            <div className="sec-hd">
              <span className="sec-num">10</span>
              <h2 className="sec-title">BDD と TDD の二重ループ</h2>
            </div>
            <p className="lead">
              BDD と TDD は対立するものではなく、
              <strong>外側（BDD）と内側（TDD）の二重ループ</strong>
              として連携します。外側の BDD ループが「何を作るか」を規定し、内側の TDD
              ループが「どう作るか」を駆動します。
            </p>
            <div className="mbox">
              <MermaidDiagram chart={DIAGRAM_DOUBLELOOP} preserveNaturalScale={true} />
            </div>
            <div className="sub">
              <div className="sub-title">10.1 二重ループの実践フロー</div>
              <ol className="sl">
                <li>
                  <span className="sl-n">1</span>
                  <div className="sl-c">
                    <strong>BDD RED — Gherkin シナリオを書く</strong>
                    <p>
                      新機能の Gherkin
                      シナリオを作成。ステップ定義がないため「PENDING」か「FAIL」になる
                    </p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">2</span>
                  <div className="sl-c">
                    <strong>TDD RED — ユニットテストを書く</strong>
                    <p>
                      シナリオを実現するためのユースケース・ドメインモデルのユニットテストを書く（実装なし）
                    </p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">3</span>
                  <div className="sl-c">
                    <strong>TDD GREEN — 最小実装で PASS</strong>
                    <p>ユニットテストをパスする最小限の実装コードを書く。過剰実装しない</p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">4</span>
                  <div className="sl-c">
                    <strong>TDD REFACTOR — コードを整理</strong>
                    <p>テストを壊さずにコードを改善。2〜4 を繰り返してドメインモデルを育てる</p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">5</span>
                  <div className="sl-c">
                    <strong>BDD GREEN — シナリオが PASS</strong>
                    <p>
                      ステップ定義を完成させてシナリオを実行。すべて GREEN になったら次のシナリオへ
                    </p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">6</span>
                  <div className="sl-c">
                    <strong>BDD REFACTOR — シナリオを整理</strong>
                    <p>重複シナリオの統合・Background の整理・タグの見直しを行う</p>
                  </div>
                </li>
              </ol>
              <div className="co co-i">
                <span className="co-ico">📌</span>
                <div className="co-body">
                  <div className="co-ttl">重要な原則</div>
                  <p>
                    BDD シナリオが「FAIL（赤）」の間は、TDD ループで着実に実装を積み重ねます。BDD
                    シナリオが「PASS（緑）」になるまで TDD
                    ループを繰り返すのが二重ループの本質です。「BDD を後から書く」アプローチは BDD
                    ではありません。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* S11 */}
          <section className="sec" id="s11">
            <div className="sec-hd">
              <span className="sec-num">11</span>
              <h2 className="sec-title">受け入れテスト自動化（ATDD）</h2>
            </div>
            <div className="sub">
              <div className="sub-title">11.1 ATDD フロー</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_ATDD} preserveNaturalScale={true} />
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">11.2 受け入れ基準の Gherkin 化例（クーポン機能）</div>
              <div className="fp">features/coupon.feature</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang gl">Gherkin</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="kw">Feature:</span> クーポンコードの適用
  顧客として、クーポンコードを適用して割引を受けたい
  理由：お得に買い物できるから

  <span class="kw">Background:</span>
    <span class="kw">Given</span> 以下のクーポンがシステムに登録されている
      | コード   | 割引タイプ | 割引値 | 最低注文額 | 有効期限   |
      | SAVE10  | 定率       | 10     | 0          | 2027-12-31 |
      | FLAT500 | 定額       | 500    | 3000       | 2027-12-31 |
      | EXPIRED | 定率       | 20     | 0          | 2020-01-01 |
    <span class="kw">And</span> 顧客がカートに合計 5,000円 の商品を入れている

  <span class="cm"># ─── 正常系：基本的な割引適用 ───</span>
  <span class="kw">Scenario:</span> 定率クーポンを適用すると割引される
    <span class="kw">When</span> クーポンコード「SAVE10」をカートに適用する
    <span class="kw">Then</span> カートの割引額は 500円 である
    <span class="kw">And</span> カートの合計金額は 4,500円 である

  <span class="kw">Scenario:</span> 定額クーポンを適用すると割引される
    <span class="kw">When</span> クーポンコード「FLAT500」をカートに適用する
    <span class="kw">Then</span> カートの割引額は 500円 である
    <span class="kw">And</span> カートの合計金額は 4,500円 である

  <span class="cm"># ─── 異常系：エラーケース ───</span>
  <span class="kw">Scenario:</span> 存在しないクーポンコードは適用できない
    <span class="kw">When</span> クーポンコード「INVALID」をカートに適用しようとする
    <span class="kw">Then</span> 「無効なクーポンコードです」というエラーが表示される
    <span class="kw">And</span> カートの合計金額は変わらない

  <span class="kw">Scenario:</span> 有効期限切れクーポンは適用できない
    <span class="kw">When</span> クーポンコード「EXPIRED」をカートに適用しようとする
    <span class="kw">Then</span> 「有効期限が切れています」というエラーが表示される

  <span class="kw">Scenario:</span> 最低注文額未満の場合クーポンは適用できない
    <span class="kw">Given</span> カートの合計金額が 2,000円 の状態である
    <span class="kw">When</span> クーポンコード「FLAT500」をカートに適用しようとする
    <span class="kw">Then</span> 「3,000円以上のご注文に適用できます」というエラーが表示される`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* S12 */}
          <section className="sec" id="s12">
            <div className="sec-hd">
              <span className="sec-num">12</span>
              <h2 className="sec-title">BDD による API テスト</h2>
            </div>
            <div className="sub">
              <div className="sub-title">12.1 APIテストのBDD構造</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_API_BDD} preserveNaturalScale={true} />
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">12.2 APIテストのGherkin記述例</div>
              <div className="fp">features/order_api.feature</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang gl">Gherkin</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="cm">@api @order</span>
<span class="kw">Feature:</span> 注文APIの操作
  開発者として
  注文APIを通じて注文を作成・参照・キャンセルしたい
  ECシステムを正しく動作させるから

  <span class="kw">Background:</span>
    <span class="kw">Given</span> APIに認証済みのJWTトークンが設定されている
    <span class="kw">And</span> 顧客「cust_001」がシステムに登録されている
    <span class="kw">And</span> 以下の商品が在庫にある
      | 商品ID   | 商品名   | 価格  | 在庫数 |
      | prod_001 | Tシャツ  | 1000  | 10     |

  <span class="cm">@smoke</span>
  <span class="kw">Scenario:</span> 注文を正常に作成できる
    <span class="kw">When</span> 以下のリクエストで「POST /v1/orders」を呼び出す
      <span class="st">"""
      {
        "customer_id": "cust_001",
        "items": [
          {"product_id": "prod_001", "quantity": 2}
        ],
        "shipping_address": {
          "postal_code": "150-0001",
          "prefecture": "東京都",
          "city": "渋谷区",
          "street": "神宮前1-1-1"
        }
      }
      """</span>
    <span class="kw">Then</span> レスポンスステータスは 201 である
    <span class="kw">And</span> レスポンスに以下のフィールドが含まれている
      | フィールド   | 期待値      |
      | status       | confirmed   |
      | total_amount | 2000        |
    <span class="kw">And</span> レスポンスに "order_id" フィールドが存在する

  <span class="kw">Scenario:</span> 存在しない顧客での注文作成は404エラー
    <span class="kw">When</span> 以下のリクエストで「POST /v1/orders」を呼び出す
      <span class="st">"""
      {
        "customer_id": "unknown_customer",
        "items": [{"product_id": "prod_001", "quantity": 1}]
      }
      """</span>
    <span class="kw">Then</span> レスポンスステータスは 404 である
    <span class="kw">And</span> レスポンスの "error.code" は "CUSTOMER_NOT_FOUND" である

  <span class="kw">Scenario:</span> 作成した注文を参照できる
    <span class="kw">Given</span> 注文「order_001」がシステムに存在する
    <span class="kw">When</span> 「GET /v1/orders/order_001」を呼び出す
    <span class="kw">Then</span> レスポンスステータスは 200 である
    <span class="kw">And</span> レスポンスの "id" は "order_001" である`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">12.3 APIテストのステップ定義実装</div>
              <div className="fp">tests/bdd/steps/api_steps.py</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang pl">Python</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="kw">import</span> pytest
<span class="kw">import</span> json
<span class="kw">from</span> pytest_bdd <span class="kw">import</span> given, when, then, parsers
<span class="kw">import</span> httpx
<span class="kw">from</span> typing <span class="kw">import</span> Any


<span class="cm"># ─── 認証ステップ ───</span>

<span class="kw">@given</span>(<span class="st">"APIに認証済みのJWTトークンが設定されている"</span>, target_fixture=<span class="st">"auth_headers"</span>)
<span class="kw">def</span> <span class="fn">authenticated_headers</span>(jwt_token_factory):
    <span class="st">"""認証ヘッダーを生成するフィクスチャ"""</span>
    token = jwt_token_factory.create(sub=<span class="st">"test_user"</span>, roles=[<span class="st">"customer"</span>])
    <span class="kw">return</span> {<span class="st">"Authorization"</span>: f<span class="st">"Bearer {token}"</span>}


<span class="cm"># ─── リクエスト送信ステップ ───</span>

<span class="kw">@when</span>(parsers.parse(<span class="st">'以下のリクエストで「{method} {path}」を呼び出す'</span>))
<span class="kw">def</span> <span class="fn">send_api_request</span>(method, path, docstring, context, api_client, auth_headers):
    <span class="st">"""DocStringのJSONボディを送信する汎用APIリクエストステップ"""</span>
    allowed_methods = {<span class="st">'get'</span>, <span class="st">'post'</span>, <span class="st">'put'</span>, <span class="st">'delete'</span>, <span class="st">'patch'</span>, <span class="st">'head'</span>, <span class="st">'options'</span>}
    method_lower = method.lower()
    <span class="kw">if</span> method_lower <span class="kw">not in</span> allowed_methods:
        <span class="kw">raise</span> ValueError(f<span class="st">"許可されていないHTTPメソッドです: {method}"</span>)

    request_body = json.loads(docstring)
    http_method = getattr(api_client, method_lower)
    response = http_method(
        path,
        json=request_body,
        headers=auth_headers
    )
    context.last_response = response


<span class="kw">@when</span>(parsers.parse(<span class="st">'「GET {path}」を呼び出す'</span>))
<span class="kw">def</span> <span class="fn">send_get_request</span>(path, context, api_client, auth_headers):
    <span class="st">"""GETリクエストの送信"""</span>
    response = api_client.get(path, headers=auth_headers)
    context.last_response = response


<span class="cm"># ─── レスポンス検証ステップ ───</span>

<span class="kw">@then</span>(parsers.parse(<span class="st">"レスポンスステータスは {status_code:d} である"</span>))
<span class="kw">def</span> <span class="fn">verify_response_status</span>(status_code, context):
    <span class="st">"""HTTPステータスコードを検証"""</span>
    actual = context.last_response.status_code
    body = context.last_response.text
    <span class="kw">assert</span> actual == status_code, (
        f<span class="st">"期待: HTTP {status_code}\\n"</span>
        f<span class="st">"実際: HTTP {actual}\\n"</span>
        f<span class="st">"レスポンス: {body}"</span>
    )


<span class="kw">@then</span>(<span class="st">"レスポンスに以下のフィールドが含まれている"</span>)
<span class="kw">def</span> <span class="fn">verify_response_fields</span>(datatable, context):
    <span class="st">"""データテーブルで指定されたフィールドを検証"""</span>
    response_json = context.last_response.json()
    <span class="kw">for</span> row <span class="kw">in</span> datatable:
        field_path = row[<span class="st">"フィールド"</span>]
        expected = row[<span class="st">"期待値"</span>]
        actual = _get_nested_value(response_json, field_path)
        <span class="kw">if</span> isinstance(actual, (int, float)):
            <span class="kw">assert</span> actual == type(actual)(expected), (
                f<span class="st">"フィールド '{field_path}': 期待={expected}, 実際={actual}"</span>
            )
        <span class="kw">else</span>:
            <span class="kw">assert</span> str(actual) == str(expected), (
                f<span class="st">"フィールド '{field_path}': 期待={expected}, 実際={actual}"</span>
            )


<span class="kw">@then</span>(parsers.parse(<span class="st">'レスポンスの "{field_path}" は "{expected_value}" である'</span>))
<span class="kw">def</span> <span class="fn">verify_response_field_value</span>(field_path, expected_value, context):
    <span class="st">"""単一フィールドの値を検証"""</span>
    response_json = context.last_response.json()
    actual = _get_nested_value(response_json, field_path)
    <span class="kw">assert</span> str(actual) == expected_value, (
        f<span class="st">"'{field_path}': 期待='{expected_value}', 実際='{actual}'"</span>
    )


<span class="kw">@then</span>(parsers.parse(<span class="st">'レスポンスに "{field_name}" フィールドが存在する'</span>))
<span class="kw">def</span> <span class="fn">verify_response_has_field</span>(field_name, context):
    <span class="st">"""フィールドの存在を検証"""</span>
    response_json = context.last_response.json()
    <span class="kw">assert</span> field_name <span class="kw">in</span> response_json, (
        f<span class="st">"フィールド '{field_name}' がレスポンスに存在しません\\n"</span>
        f<span class="st">"レスポンス: {response_json}"</span>
    )


<span class="kw">def</span> <span class="fn">_get_nested_value</span>(data: dict, path: str) -> Any:
    <span class="st">"""ドット区切りのパスでネストした値を取得 例: 'error.code'"""</span>
    keys = path.split(<span class="st">"."</span>)
    <span class="kw">for</span> key <span class="kw">in</span> keys:
        <span class="kw">if</span> isinstance(data, dict):
            data = data.get(key)
        <span class="kw">else</span>:
            <span class="kw">return</span> <span class="kw">None</span>
    <span class="kw">return</span> data`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* S13 */}
          <section className="sec" id="s13">
            <div className="sec-hd">
              <span className="sec-num">13</span>
              <h2 className="sec-title">BDD による UI テスト</h2>
            </div>
            <div className="sub">
              <div className="sub-title">13.1 UIテストのBDD戦略</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_UI_ARCH} preserveNaturalScale={true} />
              </div>
            </div>
            <div className="sub">
              <div className="sub-title">13.2 Page Object Model + BDD の実装例</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang pl">Python</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="cm"># ─── Page Object Model の定義 ───</span>

<span class="kw">from</span> playwright.sync_api <span class="kw">import</span> Page
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass


<span class="kw">class</span> <span class="fn">CartPage</span>:
    <span class="st">"""
    ショッピングカートページのPage Object
    Playwrightのページ操作を抽象化する
    """</span>
    URL = <span class="st">"/cart"</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self, page: Page):
        self._page = page

    <span class="kw">def</span> <span class="fn">navigate</span>(self):
        self._page.goto(self.URL)

    <span class="kw">def</span> <span class="fn">add_item</span>(self, product_name: str, quantity: int = 1):
        <span class="st">"""商品をカートに追加"""</span>
        product = self._page.locator(f<span class="st">"[data-product-name='{product_name}']"</span>)
        qty_input = product.locator(<span class="st">"input[name='quantity']"</span>)
        qty_input.fill(str(quantity))
        product.locator(<span class="st">"button[data-action='add-to-cart']"</span>).click()

    <span class="kw">def</span> <span class="fn">get_total</span>(self) -> str:
        <span class="st">"""カート合計金額を取得"""</span>
        return self._page.locator(<span class="st">"[data-testid='cart-total']"</span>).text_content()

    <span class="kw">def</span> <span class="fn">get_item_count</span>(self) -> int:
        <span class="st">"""カート内の商品点数を取得"""</span>
        count_text = self._page.locator(<span class="st">"[data-testid='cart-item-count']"</span>).text_content()
        return int(count_text)

    <span class="kw">def</span> <span class="fn">get_error_message</span>(self) -> str:
        <span class="st">"""エラーメッセージを取得"""</span>
        error = self._page.locator(<span class="st">"[data-testid='error-message']"</span>)
        if error.is_visible():
            return error.text_content()
        return <span class="st">""</span>

    <span class="kw">def</span> <span class="fn">is_empty</span>(self) -> bool:
        <span class="st">"""カートが空かどうか"""</span>
        return self._page.locator(<span class="st">"[data-testid='empty-cart-message']"</span>).is_visible()


<span class="cm"># ─── UIテスト用ステップ定義 ───</span>

<span class="kw">import</span> pytest
<span class="kw">from</span> pytest_bdd <span class="kw">import</span> given, when, then, parsers


<span class="kw">@pytest.fixture</span>
<span class="kw">def</span> <span class="fn">cart_page</span>(page):
    <span class="st">"""カートページのPage Object Fixture"""</span>
    cart = CartPage(page)
    cart.navigate()
    return cart


<span class="kw">@given</span>(<span class="st">"カートが空の状態である"</span>, target_fixture=<span class="st">"empty_cart"</span>)
<span class="kw">def</span> <span class="fn">cart_is_empty_ui</span>(cart_page):
    <span class="st">"""UIでカートが空であることを確認"""</span>
    <span class="kw">assert</span> cart_page.is_empty(), <span class="st">"カートは空でなければなりません"</span>
    return cart_page


<span class="kw">@when</span>(parsers.parse(<span class="st">"商品「{product_name}」を{quantity:d}点カートに追加する"</span>))
<span class="kw">def</span> <span class="fn">add_item_ui</span>(product_name, quantity, cart_page):
    <span class="st">"""UIで商品をカートに追加"""</span>
    cart_page.add_item(product_name, quantity)


<span class="kw">@then</span>(parsers.parse(<span class="st">"カートには{expected_count:d}点の商品が入っている"</span>))
<span class="kw">def</span> <span class="fn">verify_item_count_ui</span>(expected_count, cart_page):
    <span class="st">"""UIでカート内の商品数を検証"""</span>
    actual = cart_page.get_item_count()
    <span class="kw">assert</span> actual == expected_count, f<span class="st">"期待: {expected_count}点, 実際: {actual}点"</span>


<span class="kw">@then</span>(parsers.parse(<span class="st">"カートの合計金額は{expected_total:,}円 である"</span>))
<span class="kw">def</span> <span class="fn">verify_total_ui</span>(expected_total, cart_page):
    <span class="st">"""UIでカートの合計金額を検証"""</span>
    actual_text = cart_page.get_total()
    actual = int(actual_text.replace(<span class="st">"¥"</span>, <span class="st">""</span>).replace(<span class="st">","</span>, <span class="st">""</span>))
    <span class="kw">assert</span> actual == expected_total, f<span class="st">"期待: {expected_total}円, 実際: {actual}円"</span>`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* S14 */}
          <section className="sec" id="s14">
            <div className="sec-hd">
              <span className="sec-num">14</span>
              <h2 className="sec-title">シナリオ設計のベストプラクティス</h2>
            </div>
            <div className="sub">
              <div className="sub-title">14.1 良いシナリオの条件</div>
              <p className="lead">
                優れた BDD
                シナリオは、単なるテストケースではなく「生きたドキュメント」として機能します。以下の
                5 つの条件を満たすことが重要です。
              </p>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_GOOD_SCENARIO} preserveNaturalScale={true} />
              </div>
              <div className="cg cg2">
                <div className="card">
                  <div className="ct">1. 宣言的（Declarative）</div>
                  <div className="cd">
                    「何をするか（What）」を記述し、「どのようにするか（How）」の実装詳細は隠蔽します。UI
                    の変更があってもシナリオ自体は書き換える必要がありません。
                  </div>
                </div>
                <div className="card">
                  <div className="ct">2. 独立性（Independent）</div>
                  <div className="cd">
                    他のシナリオの実行結果に依存せず、単独で実行可能です。テストデータのセットアップは
                    Background や Fixture で毎回クリーンに行います。
                  </div>
                </div>
                <div className="card">
                  <div className="ct">3. 具体的（Concrete）</div>
                  <div className="cd">
                    「いくつかの商品」「適切な値」のような曖昧な表現を排除し、「Tシャツ
                    2点」「7,000円」のように具体的なドメインデータを使用します。
                  </div>
                </div>
                <div className="card">
                  <div className="ct">4. 単一の焦点（Focused）</div>
                  <div className="cd">
                    1 シナリオで検証するビジネスルールは 1 つに絞ります。ステップ数は 5〜10
                    個以内を目安とし、失敗時の原因特定を容易にします。
                  </div>
                </div>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">14.2 宣言的 vs 命令的シナリオ</div>
              <p className="lead">
                命令的（Imperative）なシナリオは、画面クリックや入力フィールドなど技術的詳細に依存し、UI
                の少しの変更で壊れやすくなります。宣言的（Declarative）に書くことでビジネスの本質的な振る舞いを記述します。
              </p>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_DECLARATIVE} preserveNaturalScale={true} />
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">14.3 Example Mapping（事例マッピング）技法</div>
              <p className="lead">
                Example Mapping は、Three
                Amigos（PO・開発者・QA）が短時間（25分程度）でユーザーストーリーの受け入れ基準を明確化する強力なファシリテーション技法です。
              </p>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_EXAMPLE_MAPPING} preserveNaturalScale={true} />
              </div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>カード種別</th>
                      <th>色</th>
                      <th>役割</th>
                      <th>具体例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>ストーリー</strong>
                      </td>
                      <td>
                        <span className="tag to">黄色</span>
                      </td>
                      <td>議論のスコープとなるユーザーストーリー</td>
                      <td>注文にクーポンを適用できる</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ルール</strong>
                      </td>
                      <td>
                        <span className="tag tb">青色</span>
                      </td>
                      <td>ストーリーを成立させるビジネスルール（受け入れ基準）</td>
                      <td>有効なクーポンは1注文に1枚のみ適用できる</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>具体例（Example）</strong>
                      </td>
                      <td>
                        <span className="tag tg">緑 / 赤</span>
                      </td>
                      <td>ルールを具体化するシナリオ（正常系：緑、異常系：赤）</td>
                      <td>10%OFFクーポン適用で5,000円が4,500円になる</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>質問</strong>
                      </td>
                      <td>
                        <span className="tag tr2">赤 / 橙</span>
                      </td>
                      <td>その場で回答できない未決定事項や前提条件の疑問</td>
                      <td>クーポンと送料無料は同時に併用できるか？</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* S15 */}
          <section className="sec" id="s15">
            <div className="sec-hd">
              <span className="sec-num">15</span>
              <h2 className="sec-title">CI/CD パイプラインと BDD</h2>
            </div>
            <div className="sub">
              <div className="sub-title">15.1 BDD テストの CI/CD への統合</div>
              <p className="lead">
                BDD シナリオはローカル開発から Pull Request 検証、デプロイ後の E2E
                スモークテストまで、CI/CD パイプラインの各段階で実行されます。
              </p>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_CICD} preserveNaturalScale={true} />
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">15.2 GitHub Actions での BDD 自動化</div>
              <p className="lead">
                PR 作成時に Unit/API レベルの BDD テストを高速実行し、main マージ時に E2E テストと
                Allure レポート生成を実行する GitHub Actions ワークフロー例です。
              </p>
              <div className="fp">.github/workflows/bdd-tests.yml</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang yl">YAML</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre>
                    <code
                      dangerouslySetInnerHTML={{
                        __html: `<span class="cm"># .github/workflows/bdd-tests.yml</span>
<span class="kw">name</span>: <span class="st">BDD Acceptance Tests</span>

<span class="kw">on</span>:
  <span class="kw">push</span>:
    <span class="kw">branches</span>: [<span class="st">main</span>, <span class="st">develop</span>]
  <span class="kw">pull_request</span>:

<span class="kw">jobs</span>:
  <span class="kw">bdd-unit</span>:
    <span class="kw">name</span>: <span class="st">BDD Unit Level Tests</span>
    <span class="kw">runs-on</span>: <span class="st">ubuntu-latest</span>
    <span class="kw">steps</span>:
      - <span class="kw">uses</span>: <span class="st">actions/checkout@v4</span>
      - <span class="kw">name</span>: <span class="st">Set up Python</span>
        <span class="kw">uses</span>: <span class="st">actions/setup-python@v5</span>
        <span class="kw">with</span>:
          <span class="kw">python-version</span>: <span class="st">"3.11"</span>
          <span class="kw">cache</span>: <span class="st">pip</span>
      - <span class="kw">name</span>: <span class="st">Install dependencies</span>
        <span class="kw">run</span>: |
          pip install pytest pytest-bdd allure-pytest factory-boy
      - <span class="kw">name</span>: <span class="st">Run BDD smoke tests</span>
        <span class="kw">run</span>: |
          pytest tests/bdd/ -m "smoke" --alluredir=allure-results -v --tb=short
      - <span class="kw">name</span>: <span class="st">Run all BDD scenarios</span>
        <span class="kw">run</span>: |
          pytest tests/bdd/ --alluredir=allure-results -v --tb=short

  <span class="kw">bdd-api</span>:
    <span class="kw">name</span>: <span class="st">BDD API Integration Tests</span>
    <span class="kw">runs-on</span>: <span class="st">ubuntu-latest</span>
    <span class="kw">needs</span>: <span class="st">bdd-unit</span>
    <span class="kw">services</span>:
      <span class="kw">postgres</span>:
        <span class="kw">image</span>: <span class="st">postgres:16</span>
        <span class="kw">env</span>:
          <span class="kw">POSTGRES_DB</span>: <span class="st">test_db</span>
          <span class="kw">POSTGRES_USER</span>: <span class="st">test</span>
          <span class="kw">POSTGRES_PASSWORD</span>: <span class="st">test</span>
    <span class="kw">steps</span>:
      - <span class="kw">uses</span>: <span class="st">actions/checkout@v4</span>
      - <span class="kw">name</span>: <span class="st">Set up Python</span>
        <span class="kw">uses</span>: <span class="st">actions/setup-python@v5</span>
        <span class="kw">with</span>:
          <span class="kw">python-version</span>: <span class="st">"3.11"</span>
      - <span class="kw">name</span>: <span class="st">Run API BDD tests</span>
        <span class="kw">env</span>:
          <span class="kw">DATABASE_URL</span>: <span class="st">postgresql://test:test@localhost/test_db</span>
        <span class="kw">run</span>: |
          pytest tests/bdd/ -m "api" --alluredir=allure-results-api -v

  <span class="kw">bdd-e2e</span>:
    <span class="kw">name</span>: <span class="st">BDD E2E Tests</span>
    <span class="kw">runs-on</span>: <span class="st">ubuntu-latest</span>
    <span class="kw">needs</span>: <span class="st">bdd-api</span>
    <span class="kw">if</span>: github.ref == 'refs/heads/main'
    <span class="kw">steps</span>:
      - <span class="kw">uses</span>: <span class="st">actions/checkout@v4</span>
      - <span class="kw">name</span>: <span class="st">Install Playwright</span>
        <span class="kw">run</span>: |
          pip install playwright pytest-playwright
          playwright install chromium
      - <span class="kw">name</span>: <span class="st">Run E2E BDD tests</span>
        <span class="kw">run</span>: |
          pytest tests/bdd/ -m "e2e" --screenshot=on-failure`,
                      }}
                    />
                  </pre>
                </div>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">15.3 Living Documentation の生成</div>
              <p className="lead">
                Gherkin で書かれた Feature
                ファイルは、テスト結果と紐づくことで最新のビジネス仕様書（Living
                Documentation）として閲覧可能になります。
              </p>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_LIVING_DOC} preserveNaturalScale={true} />
              </div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>ツール</th>
                      <th>種別</th>
                      <th>主な特徴</th>
                      <th>連携先</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Allure Report</strong>
                      </td>
                      <td>テストレポート</td>
                      <td>ステップごとの実行ログ・スクリーンショット・タイムラインの可視化</td>
                      <td>GitHub Actions, Jenkins, GitLab</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Cucumber Reports</strong>
                      </td>
                      <td>公式ホスティング</td>
                      <td>クラウド上で Feature の実行結果とドキュメントを直接共有</td>
                      <td>Cucumber Cloud, GitHub</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Pickles / Relish</strong>
                      </td>
                      <td>ドキュメントビルダー</td>
                      <td>Feature ファイルを静的 HTML や Word/PDF ドキュメントへ変換</td>
                      <td>静的 Web サイトホスティング</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Xray for Jira</strong>
                      </td>
                      <td>テスト管理ツール</td>
                      <td>Jira チケットに Gherkin シナリオを紐付け、カバレッジを管理</td>
                      <td>Atlassian Jira / Confluence</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* S16 */}
          <section className="sec" id="s16">
            <div className="sec-hd">
              <span className="sec-num">16</span>
              <h2 className="sec-title">実践：EC サイト完全事例</h2>
            </div>
            <div className="sub">
              <div className="sub-title">16.1 チェックアウトフローの完全シナリオ</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_EC_MAP} preserveNaturalScale={true} />
              </div>
              <div className="fp">features/checkout_flow.feature</div>
              <div className="cb">
                <div className="cb-hd">
                  <span className="cb-lang gl">Gherkin</span>
                  <div className="cb-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cb-body">
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="cm">@checkout @e2e</span>
<span class="kw">Feature:</span> チェックアウトフロー
  登録済み顧客として
  カートの商品をまとめて注文したい
  スムーズに購入を完了させるから

  <span class="kw">Background:</span>
    <span class="kw">Given</span> 顧客「山田太郎（yamada@example.com）」がログインしている
    <span class="kw">And</span> 商品「Tシャツ（prod_001）1,000円」が在庫に 10 点ある
    <span class="kw">And</span> 商品「ジーンズ（prod_002）5,000円」が在庫に 3 点ある

  <span class="cm">@smoke @happy_path</span>
  <span class="kw">Scenario:</span> 標準的なチェックアウトを完了する
    <span class="kw">Given</span> カートに以下の商品が入っている
      | 商品名   | 数量 |
      | Tシャツ  | 2    |
      | ジーンズ | 1    |
    <span class="kw">When</span> 顧客が以下の配送先を入力する
      | 郵便番号 | 150-0001    |
      | 都道府県 | 東京都      |
      | 市区町村 | 渋谷区      |
      | 番地     | 神宮前1-1-1 |
    <span class="kw">And</span> 支払い方法として「クレジットカード」を選択する
    <span class="kw">And</span> 「注文を確定する」ボタンを押す
    <span class="kw">Then</span> 注文確認ページが表示される
    <span class="kw">And</span> 注文番号が発行されている
    <span class="kw">And</span> 注文の合計金額は 7,000円 である
    <span class="kw">And</span> 確認メールが「yamada@example.com」に送信される
    <span class="kw">And</span> 在庫数が以下のように更新されている
      | 商品名   | 残在庫数 |
      | Tシャツ  | 8        |
      | ジーンズ | 2        |

  <span class="cm">@negative</span>
  <span class="kw">Scenario:</span> 在庫数を超えた数量では注文できない
    <span class="kw">Given</span> カートに「Tシャツ」が 10 点入っている
    <span class="kw">When</span> さらに「Tシャツ」を 1 点追加しようとする
    <span class="kw">Then</span> 「在庫が不足しています（残り10点）」というエラーが表示される
    <span class="kw">And</span> カートの商品数は変わらない

  <span class="kw">Scenario:</span> クーポン適用後に注文を確定できる
    <span class="kw">Given</span> カートに「Tシャツ」が 5 点入っている
    <span class="kw">And</span> 10%OFF クーポン「SAVE10」が有効である
    <span class="kw">When</span> クーポンコード「SAVE10」を適用する
    <span class="kw">And</span> 注文を確定する
    <span class="kw">Then</span> 注文の小計は 5,000円 である
    <span class="kw">And</span> 割引額は 500円 である
    <span class="kw">And</span> 注文の合計金額は 4,500円 である`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">16.2 EC サイトのシナリオカバレッジマップ</div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>機能領域</th>
                      <th>シナリオ数目安</th>
                      <th>主なシナリオ</th>
                      <th>タグ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>🔍 商品カタログ</td>
                      <td>5〜8</td>
                      <td>一覧表示・検索・カテゴリ絞込</td>
                      <td>
                        <span className="tag tg">@catalog</span>
                      </td>
                    </tr>
                    <tr>
                      <td>🛒 ショッピングカート</td>
                      <td>8〜12</td>
                      <td>追加・削除・変更・クーポン適用</td>
                      <td>
                        <span className="tag tg">@cart</span>
                      </td>
                    </tr>
                    <tr>
                      <td>💳 注文・決済</td>
                      <td>10〜15</td>
                      <td>確定・クレカ決済・確認メール</td>
                      <td>
                        <span className="tag tb">@checkout</span>
                      </td>
                    </tr>
                    <tr>
                      <td>👤 マイアカウント</td>
                      <td>6〜10</td>
                      <td>ログイン・注文履歴・会員情報変更</td>
                      <td>
                        <span className="tag tp">@account</span>
                      </td>
                    </tr>
                    <tr>
                      <td>⚙️ 管理機能</td>
                      <td>8〜12</td>
                      <td>在庫管理・注文管理・商品登録</td>
                      <td>
                        <span className="tag to">@admin</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* S17 */}
          <section className="sec" id="s17">
            <div className="sec-hd">
              <span className="sec-num">17</span>
              <h2 className="sec-title">BDD ベストプラクティス総まとめ</h2>
            </div>
            <div className="sub">
              <div className="sub-title">17.1 シナリオ設計ベストプラクティス一覧</div>
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
                      <td>記述スタイル</td>
                      <td>宣言的に書く（「何を」のみ）</td>
                      <td>UI 変更の影響を受けない</td>
                    </tr>
                    <tr>
                      <td>粒度</td>
                      <td>1 シナリオ = 1 ビジネスルール</td>
                      <td>失敗原因を特定しやすい</td>
                    </tr>
                    <tr>
                      <td>命名</td>
                      <td>ビジネス語彙で具体的に書く</td>
                      <td>非エンジニアにも理解できる</td>
                    </tr>
                    <tr>
                      <td>データ</td>
                      <td>具体的な数値・名前を使う</td>
                      <td>曖昧さをなくし期待値を明確に</td>
                    </tr>
                    <tr>
                      <td>独立性</td>
                      <td>Background に最小限の前提のみ</td>
                      <td>シナリオ間の依存を排除</td>
                    </tr>
                    <tr>
                      <td>タグ</td>
                      <td>@smoke/@regression/@wip で分類</td>
                      <td>必要なシナリオだけを幕別実行</td>
                    </tr>
                    <tr>
                      <td>シナリオ数</td>
                      <td>Feature あたり 5〜10 個が目安</td>
                      <td>多すぎると保守困難</td>
                    </tr>
                    <tr>
                      <td>パラメータ化</td>
                      <td>類似シナリオは Scenario Outline で集約</td>
                      <td>重複を排除し保守性向上</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">17.2 BDD 成熟度モデル</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_MATURITY} preserveNaturalScale={true} />
              </div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>レベル</th>
                      <th>状態</th>
                      <th>特徴</th>
                      <th>次へのステップ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="tag tr2">Level 0</span>
                      </td>
                      <td>手動テストのみ</td>
                      <td>受け入れ基準が暗黙知</td>
                      <td>Gherkin 記法を学ぶ</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="tag to">Level 1</span>
                      </td>
                      <td>シナリオの文書化</td>
                      <td>Gherkin を書くが自動化なし</td>
                      <td>pytest-bdd でステップ実装</td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          className="tag"
                          style={{ background: "rgba(212,160,23,.15)", color: "#d4a017" }}
                        >
                          Level 2
                        </span>
                      </td>
                      <td>基本的な自動化</td>
                      <td>ハッピーパスが自動化済み</td>
                      <td>CI/CD への統合</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="tag tg">Level 3</span>
                      </td>
                      <td>CI 統合</td>
                      <td>全シナリオを CI で自動実行</td>
                      <td>Allure レポート・異常系強化</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="tag tb">Level 4</span>
                      </td>
                      <td>Living Documentation</td>
                      <td>シナリオが常に最新の仕様書</td>
                      <td>PO をシナリオ作成に参加させる</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="tag tp">Level 5</span>
                      </td>
                      <td>BDD 文化の定着</td>
                      <td>PO がシナリオを書く文化</td>
                      <td>継続的改善・Example Mapping 定着</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">17.3 BDD 導入ロードマップ</div>
              <ol className="sl">
                <li>
                  <span className="sl-n">Week 1-2</span>
                  <div className="sl-c">
                    <strong>基礎習得フェーズ</strong>
                    <p>
                      Gherkin 記法の学習 → pytest-bdd 基本実装 → Three Amigos の初回セッション実践
                    </p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">Week 3-6</span>
                  <div className="sl-c">
                    <strong>試験的導入フェーズ</strong>
                    <p>1 機能をBDD で実装 → GitHub Actions への CI 統合 → Allure レポート設定</p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">Week 7-14</span>
                  <div className="sl-c">
                    <strong>チーム展開フェーズ</strong>
                    <p>
                      全新機能を BDD で開発 → Example Mapping の定期実践 → Living Documentation 整備
                    </p>
                  </div>
                </li>
                <li>
                  <span className="sl-n">Week 15+</span>
                  <div className="sl-c">
                    <strong>成熟化フェーズ</strong>
                    <p>
                      PO がシナリオを書く文化醸成 → Playwright UI テストへの拡張 → BDD
                      全体方針の定期レビュー
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* S18 */}
          <section className="sec" id="s18">
            <div className="sec-hd">
              <span className="sec-num">18</span>
              <h2 className="sec-title">BDD のアンチパターン</h2>
            </div>
            <div className="sub">
              <div className="sub-title">18.1 主要アンチパターン一覧</div>
              <div className="cg cg2">
                <div className="card rc">
                  <div className="ct">❌ 実装詳細の露出</div>
                  <div className="cd" style={{ marginTop: "6px" }}>
                    「id=submit-btn のボタンをクリック」「POST /api/v1/orders
                    を送信」など技術的詳細をステップに書く。UI 変更のたびにシナリオが壊れる。
                  </div>
                  <div className="cd" style={{ color: "var(--g)", marginTop: "8px" }}>
                    ✅ 解決：「注文を確定する」のようにビジネス語彙で記述する
                  </div>
                </div>
                <div className="card rc">
                  <div className="ct">❌ God Scenario（神シナリオ）</div>
                  <div className="cd" style={{ marginTop: "6px" }}>
                    ログイン→検索→カート→決済→メール→在庫確認を 1 シナリオで検証。30
                    ステップ超のモンスターシナリオ。デバッグ不能。
                  </div>
                  <div className="cd" style={{ color: "var(--g)", marginTop: "8px" }}>
                    ✅ 解決：1 シナリオ 1 振る舞いに分割。ステップ数 5〜10 個を目安に
                  </div>
                </div>
                <div className="card rc">
                  <div className="ct">❌ シナリオ間の依存</div>
                  <div className="cd" style={{ marginTop: "6px" }}>
                    「前のシナリオで作った注文を参照する」のように実行順序に依存。並列実行や順序変更で壊れる。
                  </div>
                  <div className="cd" style={{ color: "var(--g)", marginTop: "8px" }}>
                    ✅ 解決：Background と Given で毎回データをセットアップする
                  </div>
                </div>
                <div className="card rc">
                  <div className="ct">❌ 技術者だけが書くシナリオ</div>
                  <div className="cd" style={{ marginTop: "6px" }}>
                    PO や QA が参加せず開発者だけが Feature
                    を書く。ビジネス要件からずれた「コードのテスト」になってしまう。
                  </div>
                  <div className="cd" style={{ color: "var(--g)", marginTop: "8px" }}>
                    ✅ 解決：Three Amigos を実践。PO・開発者・QA の 3 者で作成する
                  </div>
                </div>
                <div className="card rc">
                  <div className="ct">❌ 過剰なシナリオ数</div>
                  <div className="cd" style={{ marginTop: "6px" }}>
                    すべての入力組み合わせをシナリオ化。類似シナリオが何十個も存在し保守コストが爆発する。
                  </div>
                  <div className="cd" style={{ color: "var(--g)", marginTop: "8px" }}>
                    ✅ 解決：Scenario Outline で集約。網羅的テストはユニットテストに委譲
                  </div>
                </div>
                <div className="card rc">
                  <div className="ct">❌ 失敗シナリオの放置</div>
                  <div className="cd" style={{ marginTop: "6px" }}>
                    「後で直す」と失敗シナリオをコミットし続ける。Broken Window
                    効果でチーム全体のテスト品質が低下する。
                  </div>
                  <div className="cd" style={{ color: "var(--g)", marginTop: "8px" }}>
                    ✅ 解決：失敗シナリオは即座に修正。一時的に @skip を使いチケット起票
                  </div>
                </div>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">18.2 BDD 健全性チェックフロー</div>
              <div className="mbox">
                <MermaidDiagram chart={DIAGRAM_HEALTH} preserveNaturalScale={true} />
              </div>
            </div>
          </section>

          {/* S19 */}
          <section className="sec" id="s19">
            <div className="sec-hd">
              <span className="sec-num">19</span>
              <h2 className="sec-title">参考文献・ソース一覧</h2>
            </div>
            <div className="sub">
              <div className="sub-title">19.1 必読書籍</div>
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>タイトル</th>
                      <th>著者</th>
                      <th>難易度</th>
                      <th>概要</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>The Cucumber Book（第 2 版）</strong>
                      </td>
                      <td>Aslak Hellesøy, Matt Wynne</td>
                      <td>★★★☆☆</td>
                      <td>BDD・Cucumber の決定版バイブル</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>BDD in Action</strong>
                      </td>
                      <td>John Ferguson Smart</td>
                      <td>★★★★☆</td>
                      <td>BDD の実践的実装・Serenity BDD 解説</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Specification by Example</strong>
                      </td>
                      <td>Gojko Adzic</td>
                      <td>★★★★☆</td>
                      <td>仕様の例示化・受け入れテストの本質</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Writing Great Specifications</strong>
                      </td>
                      <td>Kamil Nicieja</td>
                      <td>★★★☆☆</td>
                      <td>良い Gherkin シナリオの書き方</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Growing Object-Oriented Software, Guided by Tests</strong>
                      </td>
                      <td>Freeman &amp; Pryce</td>
                      <td>★★★★☆</td>
                      <td>Outside-in TDD/BDD の実践（GOOS 本）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Fifty Quick Ideas to Improve Your Tests</strong>
                      </td>
                      <td>Gojko Adzic, David Evans</td>
                      <td>★★★☆☆</td>
                      <td>テスト改善の実践的アドバイス集</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">19.2 BDD・Gherkin コア概念</div>
              <div className="rg">
                <a
                  className="rc2"
                  href="https://dannorth.net/introducing-bdd/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">BDD の起源（Dan North 原文）</div>
                  <div className="ru">https://dannorth.net/introducing-bdd/</div>
                </a>
                <a
                  className="rc2"
                  href="https://cucumber.io/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Cucumber 公式ドキュメント</div>
                  <div className="ru">https://cucumber.io/docs/</div>
                </a>
                <a
                  className="rc2"
                  href="https://cucumber.io/docs/gherkin/reference/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Gherkin 記法リファレンス</div>
                  <div className="ru">https://cucumber.io/docs/gherkin/reference/</div>
                </a>
                <a
                  className="rc2"
                  href="https://martinfowler.com/bliki/GivenWhenThen.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Given-When-Then（Martin Fowler）</div>
                  <div className="ru">https://martinfowler.com/bliki/GivenWhenThen.html</div>
                </a>
                <a
                  className="rc2"
                  href="https://cucumber.io/blog/bdd/example-mapping-introduction/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Example Mapping 入門（Cucumber Blog）</div>
                  <div className="ru">
                    https://cucumber.io/blog/bdd/example-mapping-introduction/
                  </div>
                </a>
                <a
                  className="rc2"
                  href="https://www.agilealliance.org/glossary/bdd/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">BDD 解説（Agile Alliance）</div>
                  <div className="ru">https://www.agilealliance.org/glossary/bdd/</div>
                </a>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">19.3 Python BDD フレームワーク</div>
              <div className="rg">
                <a
                  className="rc2"
                  href="https://pytest-bdd.readthedocs.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">pytest-bdd 公式ドキュメント</div>
                  <div className="ru">https://pytest-bdd.readthedocs.io/</div>
                </a>
                <a
                  className="rc2"
                  href="https://github.com/pytest-dev/pytest-bdd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">pytest-bdd GitHub</div>
                  <div className="ru">https://github.com/pytest-dev/pytest-bdd</div>
                </a>
                <a
                  className="rc2"
                  href="https://behave.readthedocs.io/en/stable/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Behave 公式ドキュメント</div>
                  <div className="ru">https://behave.readthedocs.io/en/stable/</div>
                </a>
                <a
                  className="rc2"
                  href="https://docs.pytest.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">pytest 公式ドキュメント</div>
                  <div className="ru">https://docs.pytest.org/</div>
                </a>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">19.4 テストレポート・CI/CD</div>
              <div className="rg">
                <a
                  className="rc2"
                  href="https://allurereport.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Allure Framework 公式</div>
                  <div className="ru">https://allurereport.org/</div>
                </a>
                <a
                  className="rc2"
                  href="https://reports.cucumber.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Cucumber Reports</div>
                  <div className="ru">https://reports.cucumber.io/</div>
                </a>
                <a
                  className="rc2"
                  href="https://docs.github.com/en/actions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">GitHub Actions 公式</div>
                  <div className="ru">https://docs.github.com/en/actions</div>
                </a>
                <a
                  className="rc2"
                  href="https://www.picklesdoc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Pickles（Living Documentation）</div>
                  <div className="ru">https://www.picklesdoc.com/</div>
                </a>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">19.5 UI テスト統合</div>
              <div className="rg">
                <a
                  className="rc2"
                  href="https://playwright.dev/python/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Playwright 公式（Python）</div>
                  <div className="ru">https://playwright.dev/python/</div>
                </a>
                <a
                  className="rc2"
                  href="https://playwright.dev/python/docs/test-runners"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">pytest-playwright</div>
                  <div className="ru">https://playwright.dev/python/docs/test-runners</div>
                </a>
                <a
                  className="rc2"
                  href="https://playwright.dev/docs/pom"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Page Object Model（Playwright）</div>
                  <div className="ru">https://playwright.dev/docs/pom</div>
                </a>
                <a
                  className="rc2"
                  href="https://cucumber.io/docs/guides/browser-automation/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Selenium + Cucumber</div>
                  <div className="ru">https://cucumber.io/docs/guides/browser-automation/</div>
                </a>
              </div>
            </div>

            <div className="sub">
              <div className="sub-title">19.6 BDD 実践・コミュニティ</div>
              <div className="rg">
                <a
                  className="rc2"
                  href="https://school.cucumber.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Cucumber School（公式学習）</div>
                  <div className="ru">https://school.cucumber.io/</div>
                </a>
                <a
                  className="rc2"
                  href="https://cucumber.io/docs/guides/10-minute-tutorial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">BDD 10 分チュートリアル（Cucumber）</div>
                  <div className="ru">https://cucumber.io/docs/guides/10-minute-tutorial/</div>
                </a>
                <a
                  className="rc2"
                  href="https://gojko.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Gojko Adzic Blog</div>
                  <div className="ru">https://gojko.net/</div>
                </a>
                <a
                  className="rc2"
                  href="https://serenity-bdd.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">Serenity BDD（Java）</div>
                  <div className="ru">https://serenity-bdd.github.io/</div>
                </a>
                <a
                  className="rc2"
                  href="https://specflow.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">SpecFlow（.NET BDD）</div>
                  <div className="ru">https://specflow.org/</div>
                </a>
                <a
                  className="rc2"
                  href="https://www.agilealliance.org/glossary/atdd/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rl">ATDD（Agile Alliance）</div>
                  <div className="ru">https://www.agilealliance.org/glossary/atdd/</div>
                </a>
              </div>
            </div>
          </section>

          <div className="footer">
            📅 2026年版 — BDD 完全ガイド &nbsp;|&nbsp; Dan North（2006）の原著から最新の pytest-bdd
            / Playwright 実践まで網羅 &nbsp;|&nbsp; Version 1.0
          </div>
        </div>
      </main>
    </div>
  );
}
