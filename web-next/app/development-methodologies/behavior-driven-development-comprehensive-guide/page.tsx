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

          {/* Placeholders for remaining sections */}
          <section className="sec" id="s5" />
          <section className="sec" id="s6" />
          <section className="sec" id="s7" />
          <section className="sec" id="s8" />
          <section className="sec" id="s9" />
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
