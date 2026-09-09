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
                <MermaidDiagram chart={DIAGRAM_PROBLEMS} />
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
                <MermaidDiagram chart={DIAGRAM_LEVELS} />
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
              <MermaidDiagram chart={DIAGRAM_GWT} />
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
                <MermaidDiagram chart={DIAGRAM_STORY} />
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
                <MermaidDiagram chart={DIAGRAM_KEYWORDS} />
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
                <MermaidDiagram chart={DIAGRAM_CYCLE} />
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
                <MermaidDiagram chart={DIAGRAM_AMIGOS} />
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
                <MermaidDiagram chart={DIAGRAM_SPRINT} />
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
                <MermaidDiagram chart={DIAGRAM_TOOLS} />
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
                <MermaidDiagram chart={DIAGRAM_CUCUMBER_ARCH} />
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

          {/* Placeholders for remaining sections */}
          <section className="sec" id="s10" />
          <section className="sec" id="s11" />
          <section className="sec" id="s12" />
          <section className="sec" id="s13" />
          <section className="sec" id="s14" />
          <section className="sec" id="s15" />
          <section className="sec" id="s16" />
          <section className="sec" id="s17" />
          <section className="sec" id="s18" />
          <section className="sec" id="s19" />
        </div>
      </main>
    </div>
  );
}
