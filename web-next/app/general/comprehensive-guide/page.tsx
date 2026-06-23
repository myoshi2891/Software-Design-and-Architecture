import {
  IconAlertTriangle,
  IconApi,
  IconArrowsDiff,
  IconArrowUp,
  IconBolt,
  IconBoxMultiple,
  IconBulb,
  IconCertificate,
  IconCheck,
  IconCheckbox,
  IconCircleCheck,
  IconCirclesRelation,
  IconClock,
  IconCode,
  IconCube,
  IconExternalLink,
  IconFileText,
  IconLanguage,
  IconLayersDifference,
  IconLayoutGrid,
  IconLink,
  IconListCheck,
  IconMap,
  IconMessageDots,
  IconPencil,
  IconRefresh,
  IconRoute,
  IconScale,
  IconStack2,
  IconStairs,
  IconStar,
  IconTable,
  IconTestPipe,
  IconTimeline,
  IconTopologyRing,
  IconTopologyStar3,
  IconTriangle,
  IconX,
} from "@tabler/icons-react";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";

/**
 * IT業界 主流設計手法・駆動開発 完全リファレンス。
 *
 * 元 `general/comprehensive-guide/comprehensive-guide.html` を忠実に移植した
 * Server Component。スタイルは globals.css の `.comprehensive-guide` スコープに移植済み。
 * - Mermaid 図はクライアント描画の {@link MermaidDiagram} に委譲（ラベル内 `\n` は `\\n` で保持）。
 * - 外部リンクは {@link Ext}（target=_blank + rel=noopener noreferrer）で統一。
 * - 手書きシンタックスハイライトは `dangerouslySetInnerHTML` で空白を保持して転写。
 */
export default function ComprehensiveGuidePage() {
  return (
    <div className="comprehensive-guide">
      <div className="page-wrap">
        {/* Page Header */}
        <header className="page-header" id="top">
          <div className="page-eyebrow">
            <IconLayoutGrid size={16} />
            ソフトウェア設計 完全ガイド
          </div>
          <h1>
            IT業界 主流設計手法・駆動開発
            <br />
            完全リファレンス
          </h1>
          <p className="page-subtitle">
            TDD / BDD / DDD / EDA / Clean Architecture /
            Microservicesなど主要手法を初学者からシニアエンジニアまで対応した詳細解説。国際資格ガイド付き。
          </p>

          <div className="toc-grid">
            <a href="#tdd" className="toc-item">
              <IconTestPipe size={16} color="var(--c-purple-200)" /> TDD
              <span className="toc-badge">テスト駆動</span>
            </a>
            <a href="#bdd" className="toc-item">
              <IconMessageDots size={16} color="var(--c-teal-200)" /> BDD
              <span className="toc-badge">振る舞い駆動</span>
            </a>
            <a href="#ddd" className="toc-item">
              <IconCube size={16} color="var(--c-coral-200)" /> DDD
              <span className="toc-badge">ドメイン駆動</span>
            </a>
            <a href="#fdd" className="toc-item">
              <IconListCheck size={16} color="var(--c-blue-200)" /> FDD
              <span className="toc-badge">フィーチャー駆動</span>
            </a>
            <a href="#atdd" className="toc-item">
              <IconCheckbox size={16} color="var(--c-green-200)" /> ATDD
              <span className="toc-badge">受け入れテスト</span>
            </a>
            <a href="#eda" className="toc-item">
              <IconBolt size={16} color="var(--c-amber-200)" /> EDA
              <span className="toc-badge">イベント駆動</span>
            </a>
            <a href="#api-first" className="toc-item">
              <IconApi size={16} color="var(--c-purple-200)" /> API-First
              <span className="toc-badge">設計</span>
            </a>
            <a href="#clean" className="toc-item">
              <IconLayersDifference size={16} color="var(--c-teal-200)" /> Clean Arch
              <span className="toc-badge">アーキテクチャ</span>
            </a>
            <a href="#microservices" className="toc-item">
              <IconTopologyStar3 size={16} color="var(--c-coral-200)" /> マイクロサービス
              <span className="toc-badge" />
            </a>
            <a href="#comparison" className="toc-item">
              <IconTable size={16} color="var(--c-blue-200)" /> 比較ガイド
              <span className="toc-badge" />
            </a>
            <a href="#certs" className="toc-item">
              <IconCertificate size={16} color="var(--c-amber-200)" /> 国際資格
              <span className="toc-badge">TOGAF / AWS</span>
            </a>
            <a href="#roadmap" className="toc-item">
              <IconMap size={16} color="var(--c-green-200)" /> 学習ロードマップ
              <span className="toc-badge" />
            </a>
          </div>
        </header>

        {/* TDD */}
        <section className="section" id="tdd">
          <h2>
            <IconTestPipe size={18} color="var(--c-purple-200)" /> TDD — テスト駆動開発
          </h2>

          <div className="callout callout-info">
            <IconBulb size={16} />
            <div className="callout-text">
              <strong>一言で言うと：</strong>
              「まず失敗するテストを書き、次にそのテストを通す最小限のコードを書き、最後にコードを整理する」サイクルを繰り返す開発手法。
            </div>
          </div>

          <p>
            TDD（Test-Driven Development）はKent
            Beckが普及させた開発哲学です。テストコードを実装より先に書くことで、設計の品質を自然に高め、バグの早期発見とリファクタリングの安心感を得られます。
          </p>

          <h3>
            <IconRefresh size={16} color="var(--c-purple-200)" /> Red-Green-Refactor サイクル
          </h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    A([🔴 RED\\nテスト失敗]) --> B([🟢 GREEN\\nテスト通過])
    B --> C([🔵 REFACTOR\\n整理])
    C --> A

    style A fill:#2a1a1a,stroke:#f07a7a,color:#f07a7a
    style B fill:#152218,stroke:#7adfa8,color:#7adfa8
    style C fill:#1a2440,stroke:#7ab3f0,color:#7ab3f0`}
            />
            <div className="diagram-caption">
              TDD の基本サイクル。このループを小刻みに繰り返す。
            </div>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-left">
                <div
                  className="step-num"
                  style={{
                    background: "var(--c-red-800)",
                    borderColor: "#6a2020",
                    color: "var(--c-red-200)",
                  }}
                >
                  1
                </div>
                <div className="step-line" />
              </div>
              <div className="step-content">
                <div className="step-title" style={{ color: "var(--c-red-200)" }}>
                  RED — 失敗するテストを書く
                </div>
                <div className="step-body">
                  まだ存在しない関数・クラスのテストを先に書く。この時点でテストは必ず失敗する（エラーになる）。失敗を確認することで「テストが機能している」ことを証明する。
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-left">
                <div
                  className="step-num"
                  style={{
                    background: "var(--c-green-800)",
                    borderColor: "#1a5a30",
                    color: "var(--c-green-200)",
                  }}
                >
                  2
                </div>
                <div className="step-line" />
              </div>
              <div className="step-content">
                <div className="step-title" style={{ color: "var(--c-green-200)" }}>
                  GREEN — テストを通す最小コードを書く
                </div>
                <div className="step-body">
                  テストが通る最小限の実装だけ書く。汚くてもOK。「完璧な実装」を目指さない。この段階では「動く」ことだけを目標にする。
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-left">
                <div
                  className="step-num"
                  style={{
                    background: "var(--c-blue-800)",
                    borderColor: "#1a4a7a",
                    color: "var(--c-blue-200)",
                  }}
                >
                  3
                </div>
                <div className="step-line" />
              </div>
              <div className="step-content">
                <div className="step-title" style={{ color: "var(--c-blue-200)" }}>
                  REFACTOR — コードを整理する
                </div>
                <div className="step-body">
                  テストが通った状態を保ちながら、コードを綺麗にする。重複を取り除き、命名を改善し、設計を洗練させる。テストがセーフティネットになるため安心して変更できる。
                </div>
              </div>
            </div>
          </div>

          <h3>
            <IconCode size={16} color="var(--c-purple-200)" /> AAAパターン（推奨構造）
          </h3>
          <p>
            テストコードの標準構造として <strong>Arrange / Act / Assert</strong> の3段階で書く。
          </p>

          <div className="code-label">Python — AAAパターン</div>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">def</span> <span class="fn">test_user_registration</span>():
    <span class="cm"># ── Arrange（準備）──────────────────────</span>
    user_data = {<span class="st">"email"</span>: <span class="st">"test@example.com"</span>, <span class="st">"password"</span>: <span class="st">"SecurePass123"</span>}
    user_service = UserService()

    <span class="cm"># ── Act（実行）──────────────────────────</span>
    result = user_service.register(user_data)

    <span class="cm"># ── Assert（検証）───────────────────────</span>
    <span class="kw">assert</span> result.success == <span class="kw">True</span>
    <span class="kw">assert</span> result.user.email == <span class="st">"test@example.com"</span>`,
            }}
          />

          <h3>
            <IconStar size={16} color="var(--c-purple-200)" /> ベストプラクティス
          </h3>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>原則</th>
                  <th>説明</th>
                  <th>悪い例</th>
                  <th>良い例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="chip chip-purple">単一責任</span>
                  </td>
                  <td>1テスト＝1概念のみ検証</td>
                  <td>
                    <code>test_user()</code>で複数機能
                  </td>
                  <td>
                    <code>test_login_fails_wrong_password()</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-purple">命名仕様</span>
                  </td>
                  <td>テスト名が仕様書として読める</td>
                  <td>
                    <code>test_001()</code>
                  </td>
                  <td>
                    <code>test_order_total_includes_tax()</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-purple">独立性</span>
                  </td>
                  <td>テスト同士の順序依存なし</td>
                  <td>他テストのデータに依存</td>
                  <td>各テストで自前のデータ作成</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-purple">同等品質</span>
                  </td>
                  <td>テストコードも本番同品質</td>
                  <td>テストの手抜きコード</td>
                  <td>リファクタ対象に含める</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-purple">高速性</span>
                  </td>
                  <td>ユニットテストは数ミリ秒以内</td>
                  <td>DBアクセスをテスト内に直書き</td>
                  <td>モック・スタブを活用</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>
            <IconScale size={16} color="var(--c-purple-200)" /> メリットとデメリット
          </h3>
          <div className="card-grid">
            <div className="card" style={{ borderColor: "#1a4a2a" }}>
              <div className="card-icon" style={{ color: "var(--c-green-200)" }}>
                <IconCircleCheck size={20} />
              </div>
              <div className="card-title">メリット</div>
              <div className="card-body">
                バグの早期発見。設計品質の自然な向上。リファクタリングの安心感。テストが仕様書として機能する。デバッグ時間の大幅削減。
              </div>
            </div>
            <div className="card" style={{ borderColor: "#4a2020" }}>
              <div className="card-icon" style={{ color: "var(--c-red-200)" }}>
                <IconAlertTriangle size={20} />
              </div>
              <div className="card-title">注意点</div>
              <div className="card-body">
                初期の開発速度が落ちる感覚がある。テストの書き方習得コスト。外部依存（DB・API）のテストが難しい。チーム全員の習慣化が必要。
              </div>
            </div>
          </div>

          <h3>
            <IconLink size={16} color="var(--c-purple-200)" /> 公式ソース
          </h3>
          <div className="source-list">
            <Ext href="https://www.agilealliance.org/glossary/tdd/" className="source-item">
              <IconExternalLink size={16} /> Agile Alliance — TDD定義
              <span className="source-label">英語</span>
            </Ext>
            <Ext
              href="https://martinfowler.com/bliki/TestDrivenDevelopment.html"
              className="source-item"
            >
              <IconExternalLink size={16} /> Martin Fowler — Test Driven Development
              <span className="source-label">英語</span>
            </Ext>
            <Ext href="https://docs.pytest.org/" className="source-item">
              <IconExternalLink size={16} /> pytest 公式ドキュメント
              <span className="source-label">英語</span>
            </Ext>
          </div>
          <a href="#top" className="back-top">
            <IconArrowUp size={16} /> 目次に戻る
          </a>
        </section>

        <div className="divider" />

        {/* BDD */}
        <section className="section" id="bdd">
          <h2>
            <IconMessageDots size={18} color="var(--c-teal-200)" /> BDD — 振る舞い駆動開発
          </h2>

          <div className="callout callout-info">
            <IconBulb size={16} />
            <div className="callout-text">
              <strong>TDDとの違い：</strong>{" "}
              TDDは「コードのテスト」。BDDは「ビジネス要件をテスト可能な仕様として、非エンジニアでも読める自然言語で記述する」手法。
            </div>
          </div>

          <p>
            BDD（Behavior-Driven Development）はDan Northが2006年にTDDから発展させた手法です。
            <strong>Gherkin記法</strong>
            （Given/When/Then）を使い、ビジネスとエンジニアが共通の言語で仕様を記述します。
          </p>

          <h3>
            <IconFileText size={16} color="var(--c-teal-200)" /> Gherkin記法
          </h3>

          <div className="code-label">Feature ファイル（.feature）</div>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">Feature:</span> ユーザーログイン機能
  ユーザーとして
  システムにログインしたい
  なぜなら自分のデータにアクセスしたいから

  <span class="kw">Scenario:</span> 正しい認証情報でのログイン
    <span class="kw">Given</span> ユーザーが登録されている
    <span class="kw">And</span>   メールアドレスは <span class="st">"user@example.com"</span> である
    <span class="kw">When</span>  ユーザーが正しいパスワードでログインする
    <span class="kw">Then</span>  ダッシュボードにリダイレクトされる
    <span class="kw">And</span>   <span class="st">"ようこそ"</span> というメッセージが表示される

  <span class="kw">Scenario:</span> 間違ったパスワードでのログイン
    <span class="kw">Given</span> ユーザーが登録されている
    <span class="kw">When</span>  ユーザーが間違ったパスワードでログインする
    <span class="kw">Then</span>  エラーメッセージ <span class="st">"パスワードが正しくありません"</span> が表示される
    <span class="kw">And</span>   ログインページに留まる`,
            }}
          />

          <h3>
            <IconStack2 size={16} color="var(--c-teal-200)" /> Given / When / Then の役割
          </h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
    G["🔵 Given\\n前提条件\\n（システムの状態・初期設定）"] --> W["🟡 When\\nトリガー\\n（ユーザーのアクション）"]
    W --> T["🟢 Then\\n期待結果\\n（システムの振る舞い）"]

    style G fill:#1a2440,stroke:#7ab3f0,color:#7ab3f0
    style W fill:#251e10,stroke:#f0c97a,color:#f0c97a
    style T fill:#152218,stroke:#7adfa8,color:#7adfa8`}
            />
          </div>

          <div className="do-dont">
            <div className="do-box">
              <div className="box-header">
                <IconCheck size={16} /> DO — やるべきこと
              </div>
              <ul>
                <li>非技術者でも読める文章で書く</li>
                <li>具体的な値（"user@example.com"）を使う</li>
                <li>1シナリオ＝1ビジネスルール</li>
                <li>過去形・現在形で結果を明示する</li>
              </ul>
            </div>
            <div className="dont-box">
              <div className="box-header">
                <IconX size={16} /> DON'T — 避けること
              </div>
              <ul>
                <li>技術的詳細をFeatureファイルに書く</li>
                <li>UI操作手順を細かく書きすぎる</li>
                <li>1シナリオに複数のGivenを詰め込む</li>
                <li>実装言語依存の表現を使う</li>
              </ul>
            </div>
          </div>

          <h3>
            <IconLink size={16} color="var(--c-teal-200)" /> 公式ソース
          </h3>
          <div className="source-list">
            <Ext href="https://cucumber.io/docs/bdd/" className="source-item">
              <IconExternalLink size={16} /> Cucumber — BDD公式ドキュメント
              <span className="source-label">英語</span>
            </Ext>
            <Ext href="https://cucumber.io/docs/gherkin/reference/" className="source-item">
              <IconExternalLink size={16} /> Gherkin 記法リファレンス
              <span className="source-label">英語</span>
            </Ext>
            <Ext href="https://martinfowler.com/bliki/GivenWhenThen.html" className="source-item">
              <IconExternalLink size={16} /> Martin Fowler — Given When Then
              <span className="source-label">英語</span>
            </Ext>
          </div>
          <a href="#top" className="back-top">
            <IconArrowUp size={16} /> 目次に戻る
          </a>
        </section>

        <div className="divider" />

        {/* DDD */}
        <section className="section" id="ddd">
          <h2>
            <IconCube size={18} color="var(--c-coral-200)" /> DDD — ドメイン駆動設計
          </h2>

          <div className="callout callout-info">
            <IconBulb size={16} />
            <div className="callout-text">
              <strong>核心思想：</strong>{" "}
              ビジネスの専門家とエンジニアが「同じ言葉（ユビキタス言語）」を使って会話し、その言葉をそのままコードに反映させる。Eric
              Evans が2003年に提唱。
            </div>
          </div>

          <p>
            DDD（Domain-Driven
            Design）は、複雑なビジネスロジックを扱うシステムに特に有効な設計哲学です。
            <strong>戦略的設計</strong>（全体をどう分割するか）と<strong>戦術的設計</strong>
            （コードをどう書くか）の2層から成ります。
          </p>

          <h3>
            <IconMap size={16} color="var(--c-coral-200)" /> 全体構造
          </h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TD
    subgraph SD["🗺️ 戦略的設計 Strategic Design"]
        BC["Bounded Context\\n境界づけられたコンテキスト"]
        UL["Ubiquitous Language\\nユビキタス言語"]
        CM["Context Map\\nコンテキストマップ"]
        SUB["Subdomain\\nサブドメイン"]
    end

    subgraph TD2["⚙️ 戦術的設計 Tactical Design"]
        ENT["Entity\\nエンティティ"]
        VO["Value Object\\n値オブジェクト"]
        AGG["Aggregate\\n集約"]
        DS["Domain Service\\nドメインサービス"]
        REPO["Repository\\nリポジトリ"]
        DE["Domain Event\\nドメインイベント"]
    end

    SD --> TD2

    style SD fill:#1e1a2a,stroke:#4a2a8a
    style TD2 fill:#1e1a1a,stroke:#6a3020`}
            />
          </div>

          <h3>
            <IconLanguage size={16} color="var(--c-coral-200)" /> ユビキタス言語
          </h3>
          <p>
            ビジネス側とエンジニア側が同じ用語を使うことで認識のズレをなくします。コードの変数名・クラス名もこの言語に揃えます。
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>チーム</th>
                  <th>従来のバラバラな言葉</th>
                  <th>ユビキタス言語（統一）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>営業</td>
                  <td>顧客、発注、商品</td>
                  <td rowSpan={3} style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                    Customer（顧客）
                    <br />
                    Order（注文）
                    <br />
                    Product（商品）
                    <br />
                    <br />
                    コードにもそのまま反映
                  </td>
                </tr>
                <tr>
                  <td>開発</td>
                  <td>User, Order, Item</td>
                </tr>
                <tr>
                  <td>物流</td>
                  <td>荷受け人、出荷指示、荷物</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>
            <IconBoxMultiple size={16} color="var(--c-coral-200)" /> Bounded
            Context（境界づけられたコンテキスト）
          </h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    subgraph OC["注文コンテキスト"]
        direction TB
        O["Order\\nOrderItem\\nOrderStatus"]
    end
    subgraph IC["在庫コンテキスト"]
        direction TB
        I["Inventory\\nStockLevel\\nWarehouse"]
    end
    subgraph DC["配送コンテキスト"]
        direction TB
        D["Shipment\\nDeliveryRoute\\nCarrier"]
    end
    OC -->|"商品=注文内容"| IC
    IC -->|"商品=在庫管理対象"| DC

    style OC fill:#1f1a3a,stroke:#7060b0
    style IC fill:#0f2e2e,stroke:#408080
    style DC fill:#3a1a1a,stroke:#904040`}
            />
            <div className="diagram-caption">
              同じ「商品」でもコンテキストによって意味が異なる。それぞれ独立したモデルを持つ。
            </div>
          </div>

          <h3>
            <IconCode size={16} color="var(--c-coral-200)" /> 戦術的設計：実装パターン
          </h3>

          <div className="code-label">Entity — IDで同一性を判断するオブジェクト</div>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">class</span> <span class="fn">Order</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, order_id: OrderId, customer_id: CustomerId):
        self._id = order_id          <span class="cm"># IDで同一性を判断</span>
        self._items: list[OrderItem] = []
        self._status = OrderStatus.PENDING

    <span class="kw">def</span> <span class="fn">add_item</span>(self, product: Product, quantity: int) -> None:
        <span class="kw">if</span> self._status != OrderStatus.PENDING:
            <span class="kw">raise</span> DomainException(<span class="st">"確定済み注文には商品を追加できません"</span>)
        self._items.append(OrderItem(product, quantity))`,
            }}
          />

          <div className="code-label">
            Value Object — 値で同一性を判断するイミュータブルなオブジェクト
          </div>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass

<span class="kw">@dataclass</span>(frozen=<span class="kw">True</span>)  <span class="cm"># イミュータブル（変更不可）</span>
<span class="kw">class</span> <span class="fn">Money</span>:
    amount: int
    currency: str

    <span class="kw">def</span> <span class="fn">add</span>(self, other: <span class="st">"Money"</span>) -> <span class="st">"Money"</span>:
        <span class="kw">if</span> self.currency != other.currency:
            <span class="kw">raise</span> ValueError(<span class="st">"通貨単位が一致しません"</span>)
        <span class="kw">return</span> Money(self.amount + other.amount, self.currency)`,
            }}
          />

          <h3>
            <IconStar size={16} color="var(--c-coral-200)" /> ベストプラクティス
          </h3>
          <div className="table-wrap">
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
                    <span className="chip chip-coral">モデリング</span>
                  </td>
                  <td>ドメインエキスパートと定期的な Event Storming セッションを行う</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-coral">言語</span>
                  </td>
                  <td>コードの変数名・クラス名をユビキタス言語と一致させる</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-coral">集約設計</span>
                  </td>
                  <td>集約は小さく保つ（5〜10オブジェクト以下を目安）</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-coral">境界</span>
                  </td>
                  <td>Bounded Context を1つのマイクロサービスに対応させる</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-coral">テスト</span>
                  </td>
                  <td>ドメインロジックのユニットテストを徹底する（フレームワーク依存なし）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>
            <IconLink size={16} color="var(--c-coral-200)" /> 公式ソース
          </h3>
          <div className="source-list">
            <Ext href="https://www.domainlanguage.com/ddd/reference/" className="source-item">
              <IconExternalLink size={16} /> DDD Reference — Eric Evans 公式
              <span className="source-label">英語</span>
            </Ext>
            <Ext href="https://martinfowler.com/bliki/BoundedContext.html" className="source-item">
              <IconExternalLink size={16} /> Martin Fowler — Bounded Context
              <span className="source-label">英語</span>
            </Ext>
            <Ext href="https://www.eventstorming.com/" className="source-item">
              <IconExternalLink size={16} /> EventStorming.com — Alberto Brandolini
              <span className="source-label">英語</span>
            </Ext>
          </div>
          <a href="#top" className="back-top">
            <IconArrowUp size={16} /> 目次に戻る
          </a>
        </section>

        <div className="divider" />

        {/* FDD */}
        <section className="section" id="fdd">
          <h2>
            <IconListCheck size={18} color="var(--c-blue-200)" /> FDD — フィーチャー駆動開発
          </h2>

          <p>
            FDD（Feature-Driven
            Development）は、ユーザーに価値を提供する「機能（フィーチャー）」単位で開発を進める手法です。Peter
            Coad と Jeff De Luca が1997年に提唱しました。
          </p>

          <h3>
            <IconTimeline size={16} color="var(--c-blue-200)" /> 5つのプロセス
          </h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    P1["Process 1\\n全体モデルの開発\\n(一度だけ)"] --> P2
    P2["Process 2\\nフィーチャーリスト\\n構築 (一度だけ)"] --> P3
    P3["Process 3\\n計画策定"] --> P4
    P4["Process 4\\nフィーチャー設計"] --> P5
    P5["Process 5\\nフィーチャー構築"]
    P5 -.->|"次のフィーチャーへ"| P3

    style P1 fill:#1a2440,stroke:#7ab3f0,color:#9ab8e0
    style P2 fill:#1a2440,stroke:#7ab3f0,color:#9ab8e0
    style P3 fill:#152218,stroke:#7adfa8,color:#7adfa8
    style P4 fill:#152218,stroke:#7adfa8,color:#7adfa8
    style P5 fill:#152218,stroke:#7adfa8,color:#7adfa8`}
            />
          </div>

          <h3>
            <IconPencil size={16} color="var(--c-blue-200)" /> フィーチャーの記述形式
          </h3>
          <p>
            フィーチャーは <strong>「&lt;動作&gt; &lt;結果&gt; &lt;オブジェクト&gt;」</strong>{" "}
            の形式で記述します。
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>種別</th>
                  <th>例</th>
                  <th>理由</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="chip chip-green">良い例</span>
                  </td>
                  <td>「顧客の注文履歴を表示する」</td>
                  <td>動作・結果・オブジェクトが明確</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-green">良い例</span>
                  </td>
                  <td>「商品の在庫数を更新する」</td>
                  <td>ビジネス価値が伝わる</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-red">悪い例</span>
                  </td>
                  <td>「データベースから取得する」</td>
                  <td>技術的詳細で、ビジネス価値が不明</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-red">悪い例</span>
                  </td>
                  <td>「ユーザー管理」</td>
                  <td>動作・結果が不明確で粒度が粗い</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="callout callout-warning">
            <IconClock size={16} />
            <div className="callout-text">
              <strong>重要：</strong> フィーチャー1つは<strong>2週間以内</strong>
              で完成できる粒度に分解する。それより大きい場合はサブフィーチャーに分割すること。
            </div>
          </div>
          <a href="#top" className="back-top">
            <IconArrowUp size={16} /> 目次に戻る
          </a>
        </section>

        <div className="divider" />

        {/* ATDD */}
        <section className="section" id="atdd">
          <h2>
            <IconCheckbox size={18} color="var(--c-green-200)" /> ATDD — 受け入れテスト駆動開発
          </h2>

          <p>
            ATDD（Acceptance Test-Driven
            Development）は、顧客・ビジネス側が定義する「受け入れ基準」をテストとして先に書き、それを満たすよう開発する手法です。
          </p>

          <h3>
            <IconTriangle size={16} color="var(--c-green-200)" />{" "}
            テストピラミッド：TDD・BDD・ATDDの関係
          </h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TD
    A["🔺 ATDD — 受け入れテスト\\n（顧客視点・少量・遅い）"]
    B["🔷 BDD — シナリオテスト\\n（振る舞い・中量）"]
    C["🟩 TDD — ユニットテスト\\n（コード・大量・速い）"]

    A --> B --> C

    style A fill:#3a1a1a,stroke:#904040,color:#f07a7a
    style B fill:#251e10,stroke:#f0c97a,color:#f0c97a
    style C fill:#152218,stroke:#7adfa8,color:#7adfa8`}
            />
            <div className="diagram-caption">
              上層ほど抽象度が高く実行が遅い。下層ほど具体的で高速。数のバランスも逆三角形にならないよう注意。
            </div>
          </div>

          <h3>
            <IconStairs size={16} color="var(--c-green-200)" /> ATDD実践フロー
          </h3>

          <div className="steps">
            <div className="step">
              <div className="step-left">
                <div
                  className="step-num"
                  style={{
                    background: "var(--c-green-800)",
                    borderColor: "#1a5a30",
                    color: "var(--c-green-200)",
                  }}
                >
                  1
                </div>
                <div className="step-line" />
              </div>
              <div className="step-content">
                <div className="step-title">受け入れ基準をビジネス側が定義</div>
                <div className="step-body">
                  「商品をカートに追加できる」機能の基準として、「カートに追加後バッジ数が増える」「同じ商品2回追加で数量2になる」「在庫なし商品は追加できない」などを箇条書きで列挙する。
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-left">
                <div
                  className="step-num"
                  style={{
                    background: "var(--c-green-800)",
                    borderColor: "#1a5a30",
                    color: "var(--c-green-200)",
                  }}
                >
                  2
                </div>
                <div className="step-line" />
              </div>
              <div className="step-content">
                <div className="step-title">受け入れテストをコード化</div>
                <div className="step-body">
                  Selenium / Playwright / Cypress
                  などを使い、受け入れ基準を自動テストとして実装する。この時点でテストは失敗する（まだ実装がないため）。
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-left">
                <div
                  className="step-num"
                  style={{
                    background: "var(--c-green-800)",
                    borderColor: "#1a5a30",
                    color: "var(--c-green-200)",
                  }}
                >
                  3
                </div>
                <div className="step-line" />
              </div>
              <div className="step-content">
                <div className="step-title">開発者がテストを通るよう実装</div>
                <div className="step-body">
                  TDD/BDDを活用しながら、受け入れテストが通るまで実装を進める。
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-left">
                <div
                  className="step-num"
                  style={{
                    background: "var(--c-green-800)",
                    borderColor: "#1a5a30",
                    color: "var(--c-green-200)",
                  }}
                >
                  4
                </div>
                <div className="step-line" />
              </div>
              <div className="step-content">
                <div className="step-title">ビジネス側が承認</div>
                <div className="step-body">
                  全受け入れテストが通過したことをビジネス側が確認・承認する。「完成の定義（Definition
                  of Done）」が明確になる。
                </div>
              </div>
            </div>
          </div>
          <a href="#top" className="back-top">
            <IconArrowUp size={16} /> 目次に戻る
          </a>
        </section>

        <div className="divider" />

        {/* EDA */}
        <section className="section" id="eda">
          <h2>
            <IconBolt size={18} color="var(--c-amber-200)" /> EDA — イベント駆動アーキテクチャ
          </h2>

          <div className="callout callout-info">
            <IconBulb size={16} />
            <div className="callout-text">
              <strong>核心：</strong>{" "}
              コンポーネント間の通信を「イベント」という不変の事実メッセージで行う。Producer は
              Consumer の存在を知らず、疎結合が実現する。
            </div>
          </div>

          <h3>
            <IconTopologyRing size={16} color="var(--c-amber-200)" /> 構成要素フロー
          </h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
    P["📤 Producer\\n（注文サービス等）\\nイベントを発行"] --> EB["🔀 Event Broker\\nApache Kafka\\nAWS EventBridge 等"]
    EB --> C1["📦 在庫サービス\\n(Consumer)"]
    EB --> C2["🚚 配送サービス\\n(Consumer)"]
    EB --> C3["🔔 通知サービス\\n(Consumer)"]

    style P fill:#251e10,stroke:#f0c97a,color:#f0c97a
    style EB fill:#1e2535,stroke:#5c6680,color:#9aa3b5
    style C1 fill:#0f2e2e,stroke:#7dd8d8,color:#7dd8d8
    style C2 fill:#0f2e2e,stroke:#7dd8d8,color:#7dd8d8
    style C3 fill:#0f2e2e,stroke:#7dd8d8,color:#7dd8d8`}
            />
            <div className="diagram-caption">
              Producerは誰が受信するか知らない。Brokerが適切なConsumerに配信する。
            </div>
          </div>

          <h3>
            <IconCode size={16} color="var(--c-amber-200)" /> イベント設計の原則
          </h3>

          <div className="code-label">Python — 良いイベント設計</div>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">@dataclass</span>
<span class="kw">class</span> <span class="fn">OrderPlacedEvent</span>:
    <span class="st">"""注文が確定したことを表すイベント（過去形で命名）"""</span>
    event_id: str           <span class="cm"># 一意のイベントID</span>
    occurred_at: datetime   <span class="cm"># 発生日時</span>
    order_id: str           <span class="cm"># 何の注文か</span>
    customer_id: str        <span class="cm"># 誰の注文か</span>
    total_amount: int       <span class="cm"># 合計金額</span>
    items: list[dict]       <span class="cm"># 注文内容（自己完結した情報）</span>

    <span class="cm"># ✅ 過去形で命名 → OrderPlaced（注文が完了した）</span>
    <span class="cm"># ✅ イベントに必要な情報を自己完結的に含める</span>
    <span class="cm"># ❌ IDだけ持ち Consumer が DB照会するのはアンチパターン</span>`,
            }}
          />

          <h3>
            <IconStar size={16} color="var(--c-amber-200)" /> ベストプラクティス
          </h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>原則</th>
                  <th>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="chip chip-amber">べき等性</span>
                  </td>
                  <td>同じイベントを2回受信しても結果が変わらないよう設計する</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-amber">スキーマ管理</span>
                  </td>
                  <td>Schema Registry でバージョン管理し、互換性を保つ</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-amber">DLQ</span>
                  </td>
                  <td>Dead Letter Queue で処理失敗イベントを退避し、後処理できるようにする</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-amber">追跡性</span>
                  </td>
                  <td>Correlation ID で一連のイベントをトレースできるようにする</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-amber">順序保証</span>
                  </td>
                  <td>同一パーティション内で順序が必要な場合は設計で考慮する</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>
            <IconLink size={16} color="var(--c-amber-200)" /> 公式ソース
          </h3>
          <div className="source-list">
            <Ext href="https://kafka.apache.org/documentation/" className="source-item">
              <IconExternalLink size={16} /> Apache Kafka 公式ドキュメント
              <span className="source-label">英語</span>
            </Ext>
            <Ext href="https://cloudevents.io/" className="source-item">
              <IconExternalLink size={16} /> CloudEvents 仕様（CNCF）
              <span className="source-label">英語</span>
            </Ext>
            <Ext href="https://aws.amazon.com/event-driven-architecture/" className="source-item">
              <IconExternalLink size={16} /> AWS — Event-Driven Architecture
              <span className="source-label">英語</span>
            </Ext>
          </div>
          <a href="#top" className="back-top">
            <IconArrowUp size={16} /> 目次に戻る
          </a>
        </section>

        <div className="divider" />

        {/* API-First */}
        <section className="section" id="api-first">
          <h2>
            <IconApi size={18} color="var(--c-purple-200)" /> API-First 設計
          </h2>

          <p>
            実装より先に<strong>APIの設計仕様（契約）を定義</strong>
            し、その契約を中心に開発を進める手法。フロントエンドとバックエンドが並行開発できるため、チーム生産性が大幅に向上します。
          </p>

          <h3>
            <IconTimeline size={16} color="var(--c-purple-200)" /> 開発フロー
          </h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    A["📝 API設計\\n(OpenAPI YAML)"] --> B["👥 チームレビュー"]
    B --> C["🤖 モック自動生成"]
    C --> FE["🖥️ フロントエンド\\n(モックで開発)"]
    C --> BE["⚙️ バックエンド\\n(仕様に従い実装)"]
    FE --> INT["🔗 統合テスト"]
    BE --> INT

    style A fill:#2d1f4e,stroke:#7060b0,color:#c4b0f5
    style B fill:#1e2535,stroke:#5c6680,color:#9aa3b5
    style C fill:#1e2535,stroke:#5c6680,color:#9aa3b5
    style FE fill:#0f2e2e,stroke:#408080,color:#7dd8d8
    style BE fill:#0f2e2e,stroke:#408080,color:#7dd8d8
    style INT fill:#152218,stroke:#1a5a30,color:#7adfa8`}
            />
          </div>

          <h3>
            <IconCode size={16} color="var(--c-purple-200)" /> OpenAPI（Swagger）仕様例
          </h3>

          <div className="code-label">openapi.yaml — 注文API定義</div>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">openapi:</span> <span class="st">3.0.3</span>
<span class="kw">info:</span>
  <span class="kw">title:</span> ECサイト注文API
  <span class="kw">version:</span> <span class="st">1.0.0</span>

<span class="kw">paths:</span>
  <span class="kw">/orders:</span>
    <span class="kw">post:</span>
      <span class="kw">summary:</span> 注文を作成する
      <span class="kw">requestBody:</span>
        <span class="kw">required:</span> <span class="kw">true</span>
      <span class="kw">responses:</span>
        <span class="st">'201':</span>
          <span class="kw">description:</span> 注文作成成功
        <span class="st">'400':</span>
          <span class="kw">description:</span> リクエスト不正`,
            }}
          />

          <h3>
            <IconRoute size={16} color="var(--c-purple-200)" /> RESTful URL 設計ルール
          </h3>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>メソッド</th>
                  <th>URL</th>
                  <th>操作</th>
                  <th>ステータス</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="chip chip-green">GET</span>
                  </td>
                  <td>
                    <code>/products</code>
                  </td>
                  <td>商品一覧取得</td>
                  <td>200</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-green">GET</span>
                  </td>
                  <td>
                    <code>/products/{"{id}"}</code>
                  </td>
                  <td>特定商品取得</td>
                  <td>200 / 404</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-blue">POST</span>
                  </td>
                  <td>
                    <code>/products</code>
                  </td>
                  <td>商品新規作成</td>
                  <td>201</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-amber">PUT</span>
                  </td>
                  <td>
                    <code>/products/{"{id}"}</code>
                  </td>
                  <td>全体更新</td>
                  <td>200</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-amber">PATCH</span>
                  </td>
                  <td>
                    <code>/products/{"{id}"}</code>
                  </td>
                  <td>部分更新</td>
                  <td>200</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-coral">DELETE</span>
                  </td>
                  <td>
                    <code>/products/{"{id}"}</code>
                  </td>
                  <td>削除</td>
                  <td>204</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>
            <IconLink size={16} color="var(--c-purple-200)" /> 公式ソース
          </h3>
          <div className="source-list">
            <Ext href="https://swagger.io/specification/" className="source-item">
              <IconExternalLink size={16} /> OpenAPI Specification（Swagger）
              <span className="source-label">英語</span>
            </Ext>
            <Ext href="https://cloud.google.com/apis/design" className="source-item">
              <IconExternalLink size={16} /> Google API Design Guide
              <span className="source-label">英語</span>
            </Ext>
            <Ext href="https://restfulapi.net/" className="source-item">
              <IconExternalLink size={16} /> REST API Design Best Practices
              <span className="source-label">英語</span>
            </Ext>
          </div>
          <a href="#top" className="back-top">
            <IconArrowUp size={16} /> 目次に戻る
          </a>
        </section>

        <div className="divider" />

        {/* Clean Architecture */}
        <section className="section" id="clean">
          <h2>
            <IconLayersDifference size={18} color="var(--c-teal-200)" /> クリーンアーキテクチャ
          </h2>

          <div className="callout callout-info">
            <IconBulb size={16} />
            <div className="callout-text">
              <strong>設計哲学：</strong>{" "}
              ビジネスロジックを技術詳細（DB・フレームワーク・UI）から分離。「依存の方向は常に内側へ」という原則で、テスト容易性と保守性を最大化する。Robert
              C. Martin（Uncle Bob）提唱。
            </div>
          </div>

          <h3>
            <IconCirclesRelation size={16} color="var(--c-teal-200)" /> 4層アーキテクチャ
          </h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TD
    FW["🔧 Frameworks & Drivers\\n（最外層）\\nDjango / FastAPI / PostgreSQL / Redis"]
    IA["🔄 Interface Adapters\\nController / Presenter / Repository Impl"]
    UC["📋 Use Cases\\nアプリケーション固有ビジネスロジック\\nPlaceOrderUseCase / RegisterUserUseCase"]
    ENT["🎯 Entities\\n（最内層）\\n企業ビジネスルールの核心\\nOrder / User / Product"]

    FW --> IA --> UC --> ENT

    style FW fill:#3a1a1a,stroke:#904040,color:#c07070
    style IA fill:#251e10,stroke:#806020,color:#c0a060
    style UC fill:#0f2e2e,stroke:#408080,color:#70c0c0
    style ENT fill:#2d1f4e,stroke:#7060b0,color:#c4b0f5`}
            />
            <div className="diagram-caption">
              依存の方向は外 → 内のみ。内側は外側の存在を知らない。
            </div>
          </div>

          <h3>
            <IconCode size={16} color="var(--c-teal-200)" /> Python実装例
          </h3>

          <div className="code-label">Entities層（最内側・フレームワーク依存ゼロ）</div>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">class</span> <span class="fn">Order</span>:
    <span class="st">"""純粋なビジネスエンティティ（フレームワーク依存なし）"""</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(self, order_id: str, customer_id: str):
        self.order_id = order_id
        self.customer_id = customer_id
        self.items = []

    <span class="kw">def</span> <span class="fn">add_item</span>(self, item: OrderItem) -> None:
        self.items.append(item)`,
            }}
          />

          <div className="code-label">
            Use Cases層（インターフェースに依存・実装詳細を知らない）
          </div>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">class</span> <span class="fn">PlaceOrderUseCase</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(
        self,
        order_repository: OrderRepositoryInterface,  <span class="cm"># インターフェースに依存</span>
        payment_gateway: PaymentGatewayInterface,    <span class="cm"># 実装詳細に依存しない</span>
    ):
        self.order_repository = order_repository
        self.payment_gateway = payment_gateway

    <span class="kw">def</span> <span class="fn">execute</span>(self, command: PlaceOrderCommand) -> PlaceOrderResult:
        order = Order(order_id=generate_id(), customer_id=command.customer_id)
        self.payment_gateway.charge(order)
        self.order_repository.save(order)
        <span class="kw">return</span> PlaceOrderResult(order_id=order.order_id)`,
            }}
          />

          <div className="code-label">Frameworks層（最外側・具体的なDB実装）</div>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">class</span> <span class="fn">SQLAlchemyOrderRepository</span>(OrderRepositoryInterface):
    <span class="kw">def</span> <span class="fn">save</span>(self, order: Order) -> None:
        db_record = OrderModel.from_entity(order)
        self.session.add(db_record)
        self.session.commit()`,
            }}
          />

          <h3>
            <IconLink size={16} color="var(--c-teal-200)" /> 公式ソース
          </h3>
          <div className="source-list">
            <Ext
              href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
              className="source-item"
            >
              <IconExternalLink size={16} /> Uncle Bob — The Clean Architecture（原著）
              <span className="source-label">英語</span>
            </Ext>
          </div>
          <a href="#top" className="back-top">
            <IconArrowUp size={16} /> 目次に戻る
          </a>
        </section>

        <div className="divider" />

        {/* Microservices */}
        <section className="section" id="microservices">
          <h2>
            <IconTopologyStar3 size={18} color="var(--c-coral-200)" />{" "}
            マイクロサービスアーキテクチャ
          </h2>

          <p>
            アプリケーションを<strong>小さく独立したサービス群に分割</strong>
            し、それぞれが独立してデプロイ・スケール可能なアーキテクチャ。
          </p>

          <h3>
            <IconArrowsDiff size={16} color="var(--c-coral-200)" /> モノリス vs マイクロサービス
          </h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph LR
    subgraph MON["🏠 モノリス"]
        ALL["注文・在庫・決済・通知・\\nユーザー管理 —— 全部1アプリ"]
    end

    subgraph MSV["🌐 マイクロサービス"]
        S1["注文 SVC"]
        S2["在庫 SVC"]
        S3["決済 SVC"]
        S4["通知 SVC"]
        S5["User SVC"]
    end

    MON -->|"成長とともに限界が見える"| MSV

    style MON fill:#2a1a1a,stroke:#904040
    style MSV fill:#0f2828,stroke:#408080`}
            />
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th />
                  <th>モノリス</th>
                  <th>マイクロサービス</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="chip chip-green">メリット</span>
                  </td>
                  <td>シンプル・開発初期が速い・デプロイが単純</td>
                  <td>独立デプロイ・独立スケール・技術選択の自由</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-red">デメリット</span>
                  </td>
                  <td>スケール困難・変更の影響が全体に及ぶ</td>
                  <td>複雑性増大・運用コスト・分散システムの難しさ</td>
                </tr>
                <tr>
                  <td>
                    <span className="chip chip-amber">適するケース</span>
                  </td>
                  <td>小規模・スタートアップ・初期フェーズ</td>
                  <td>大規模チーム・高スループット・独立デプロイが必要</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>
            <IconStar size={16} color="var(--c-coral-200)" /> 設計原則とアンチパターン
          </h3>

          <div className="do-dont">
            <div className="do-box">
              <div className="box-header">
                <IconCheck size={16} /> 推奨事項
              </div>
              <ul>
                <li>DDDのBounded Contextと1対1対応</li>
                <li>各サービスが独自のDBを持つ</li>
                <li>独立したCI/CDパイプライン</li>
                <li>/health エンドポイントを実装</li>
                <li>分散トレーシング（Jaeger/Zipkin）導入</li>
                <li>API Gatewayで外部窓口を一元管理</li>
              </ul>
            </div>
            <div className="dont-box">
              <div className="box-header">
                <IconX size={16} /> アンチパターン
              </div>
              <ul>
                <li>サービス間でDBを直接共有する</li>
                <li>頻繁な同期API呼び出し（Chatty）</li>
                <li>密結合なDistributed Monolith</li>
                <li>小規模プロジェクトへの過剰適用</li>
              </ul>
            </div>
          </div>

          <h3>
            <IconLink size={16} color="var(--c-coral-200)" /> 公式ソース
          </h3>
          <div className="source-list">
            <Ext
              href="https://martinfowler.com/articles/microservices.html"
              className="source-item"
            >
              <IconExternalLink size={16} /> Martin Fowler — Microservices（原著）
              <span className="source-label">英語</span>
            </Ext>
            <Ext href="https://12factor.net/" className="source-item">
              <IconExternalLink size={16} /> The Twelve-Factor App
              <span className="source-label">英語</span>
            </Ext>
            <Ext
              href="https://docs.microsoft.com/en-us/azure/architecture/patterns/"
              className="source-item"
            >
              <IconExternalLink size={16} /> Microsoft — Architecture Patterns
              <span className="source-label">英語</span>
            </Ext>
          </div>
          <a href="#top" className="back-top">
            <IconArrowUp size={16} /> 目次に戻る
          </a>
        </section>

        <div className="divider" />

        {/* SECTIONS_PLACEHOLDER */}
      </div>
    </div>
  );
}
