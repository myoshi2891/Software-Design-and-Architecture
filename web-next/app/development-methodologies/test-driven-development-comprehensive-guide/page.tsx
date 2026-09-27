import {
  IconAlertCircle,
  IconAlertTriangle,
  IconBook,
  IconBulb,
  IconCalendar,
  IconCheck,
  IconClock,
  IconCode,
  IconExternalLink,
  IconGitBranch,
  IconHelp,
  IconLink,
  IconPlug,
  IconStar,
  IconTestPipe,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import TddSidebar, { DEFAULT_GROUPS } from "./TddSidebar";

export default function Page() {
  return (
    <div className="test-driven-development-comprehensive-guide">
      <TddSidebar groups={DEFAULT_GROUPS} />
      <main className="main">
        <header className="page-header">
          <div className="page-header-eyebrow">
            <IconTestPipe size={16} aria-hidden="true" />
            Software Architecture Guide
          </div>
          <h1>TDD（テスト駆動開発）完全ガイド</h1>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", marginTop: 12, maxWidth: 580 }}>
            Test-Driven Development の基礎から実践まで。Red-Green-Refactor サイクルを軸に、
            初学者が段階的にマスターできるよう設計した総合リファレンスです。
          </p>
          <div className="page-header-meta">
            <span className="meta-chip">
              <IconCalendar size={16} aria-hidden="true" />
              2026年6月更新
            </span>
            <span className="meta-chip">
              <IconCode size={16} aria-hidden="true" />
              Python / pytest
            </span>
            <span className="meta-chip">
              <IconClock size={16} aria-hidden="true" />
              読了目安 45〜60分
            </span>
            <span className="meta-chip">
              <IconStar size={16} aria-hidden="true" />
              初学者〜中級者向け
            </span>
          </div>
          <div className="tag-grid" style={{ marginTop: 20 }}>
            <span className="tag tag-purple">
              <IconTestPipe size={16} />
              TDD
            </span>
            <span className="tag tag-teal">
              <IconCheck size={16} />
              Red-Green-Refactor
            </span>
            <span className="tag tag-coral">
              <IconCode size={16} />
              pytest
            </span>
            <span className="tag tag-blue">
              <IconGitBranch size={16} />
              CI/CD
            </span>
            <span className="tag tag-amber">
              <IconUsers size={16} />
              BDD
            </span>
          </div>
        </header>

        {/* === S1: TDDとは === */}
        <section className="section" id="s1">
          <div className="section-header">
            <div className="section-number">01</div>
            <h2>TDDとは何か？</h2>
          </div>

          <p>
            <strong style={{ color: "var(--text-primary)" }}>
              Test-Driven Development（テスト駆動開発）
            </strong>
            は、 Kent Beckが2002年の著書「Test-Driven Development: By
            Example」で体系化した開発手法です。
            「テストを先に書いてから実装する」という一見逆説的なアプローチにより、
            設計品質・保守性・開発速度を同時に向上させます。
          </p>

          <div className="callout callout-info">
            <IconBulb size={16} aria-hidden="true" />
            <div className="callout-body">
              <strong>核心思想</strong>
              <p>
                テストは品質チェックツールではなく、
                <em style={{ color: "var(--purple-200)" }}>設計ツール</em>
                である。テストを先に書くことで、より良いAPI設計と疎結合なコードが自然に生まれる。
              </p>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>1.1 TDDが解決する問題</h3>
          <div className="two-col">
            <div className="col-card col-bad">
              <div className="col-header">
                <IconX size={16} aria-hidden="true" />
                TDD導入前の問題
              </div>
              <ul>
                <li>バグを後から発見し修正コストが高い</li>
                <li>「動いたら完成」思考でリファクタリングが怖い</li>
                <li>設計が場当たり的で密結合・保守困難</li>
                <li>ドキュメントがなくコードの意図が不明</li>
                <li>変更への恐怖で何が壊れるかわからない</li>
              </ul>
            </div>
            <div className="col-card col-good">
              <div className="col-header">
                <IconCheck size={16} aria-hidden="true" />
                TDD導入後の効果
              </div>
              <ul>
                <li>バグを実装と同時に即座に発見・検証できる</li>
                <li>テストが変更を保護しリファクタリングが安全</li>
                <li>設計が自然に改善（テストしやすい＝良い設計）</li>
                <li>テストが仕様書になりコードの意図が明確</li>
                <li>テストスイートが安全網となり変更への自信が生まれる</li>
              </ul>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>1.2 Uncle Bobの3つのルール</h3>
          <p style={{ marginBottom: 16 }}>
            Robert C. Martin（Uncle Bob）は TDD を次の3ルールで定義しています。
          </p>
          <ol className="rule-list">
            <li>
              <div className="rule-number">1</div>
              <div>
                <strong>失敗するテストを先に書く</strong>
                <p>失敗するユニットテストを書くまで、プロダクションコードを書いてはならない。</p>
              </div>
            </li>
            <li>
              <div className="rule-number">2</div>
              <div>
                <strong>テストは必要最小限だけ書く</strong>
                <p>コンパイルエラーも失敗とみなす。テストが失敗するのに十分な量だけ書く。</p>
              </div>
            </li>
            <li>
              <div className="rule-number">3</div>
              <div>
                <strong>実装も最小限にとどめる</strong>
                <p>
                  現在失敗しているテストを通過させるのに十分な量だけプロダクションコードを書く。
                </p>
              </div>
            </li>
          </ol>

          <h3 style={{ margin: "28px 0 16px" }}>1.3 TDDが適しているシーン</h3>
          <p>TDDは「ビジネスロジックが複雑」かつ「変更頻度が高い」領域で特に効果を発揮します。</p>
          <div className="tag-grid" style={{ marginTop: 14 }}>
            <span className="tag tag-teal">
              <IconCheck size={16} />
              金融計算ロジック
            </span>
            <span className="tag tag-teal">
              <IconCheck size={16} />
              ECサイト注文処理
            </span>
            <span className="tag tag-teal">
              <IconCheck size={16} />
              認証認可ロジック
            </span>
            <span className="tag tag-teal">
              <IconCheck size={16} />
              複雑な割引計算
            </span>
            <span className="tag tag-amber">
              <IconClock size={16} />
              APIエンドポイント
            </span>
            <span className="tag tag-coral">
              <IconX size={16} />
              静的コンテンツ表示
            </span>
          </div>

          <div className="sources-section" style={{ marginTop: 24 }}>
            <h4>
              <IconLink size={16} aria-hidden="true" style={{ fontSize: "1rem", marginRight: 6 }} />
              参照ソース
            </h4>
            <Ext href="https://www.agilealliance.org/glossary/tdd/" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              Agile Alliance — TDD定義
            </Ext>
            <Ext
              href="https://martinfowler.com/bliki/TestDrivenDevelopment.html"
              className="source-link"
            >
              <IconExternalLink size={16} aria-hidden="true" />
              Martin Fowler — TestDrivenDevelopment
            </Ext>
            <Ext
              href="https://blog.cleancoder.com/uncle-bob/2014/12/17/TheThreeRulesOfTdd.html"
              className="source-link"
            >
              <IconExternalLink size={16} aria-hidden="true" />
              Uncle Bob — TDDの3つのルール
            </Ext>
          </div>
        </section>

        <hr className="divider" />

        {/* === S2: Red-Green-Refactor === */}
        <section className="section" id="s2">
          <div className="section-header">
            <div className="section-number">02</div>
            <h2>Red-Green-Refactor サイクル</h2>
          </div>

          <p>
            TDDの中核は「Red → Green →
            Refactor」の3フェーズを繰り返す短いサイクルです。1サイクルの目安は
            <strong style={{ color: "var(--text-primary)" }}>5〜15分</strong>
            。小刻みに繰り返すことで設計が自然に洗練されていきます。
          </p>

          <div className="phase-grid" style={{ marginTop: 24 }}>
            <div className="phase-card phase-red">
              <div className="phase-label">🔴 Red フェーズ</div>
              <h3>失敗するテストを書く</h3>
              <ul>
                <li>何を作りたいかを言語化する</li>
                <li>テストから見た理想のAPIを設計する</li>
                <li>
                  テストが<em>必ず失敗</em>することを確認する
                </li>
                <li>失敗メッセージがわかりやすいか確認</li>
              </ul>
            </div>
            <div className="phase-card phase-green">
              <div className="phase-label">🟢 Green フェーズ</div>
              <h3>テストを通す最小実装</h3>
              <ul>
                <li>テストを通すだけのコードを書く</li>
                <li>美しいコードでなくてよい</li>
                <li>ハードコードも一時的に許容する</li>
                <li>全テストがグリーンになることを確認</li>
              </ul>
            </div>
            <div className="phase-card phase-blue">
              <div className="phase-label">🔵 Refactor フェーズ</div>
              <h3>コードを整理・改善する</h3>
              <ul>
                <li>コードの重複を排除（DRY原則）</li>
                <li>命名を改善（意図を表す名前に）</li>
                <li>関数・クラスを適切に分割する</li>
                <li>テストが全部グリーンを維持確認</li>
              </ul>
            </div>
          </div>

          <div className="callout callout-warn">
            <IconAlertTriangle size={16} aria-hidden="true" />
            <div className="callout-body">
              <strong>Green フェーズの罠</strong>
              <p>
                「きれいなコードを書きながら Green
                にしよう」という誘惑は危険です。まず動かすことを優先し、美しさは Refactor
                フェーズで実現します。この順序を守ることが TDD の本質です。
              </p>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>2.1 理想的な時間配分</h3>
          <p style={{ marginBottom: 16 }}>1サイクルを10〜15分とした場合の目安です。</p>
          <div className="card">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1rem",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ color: "var(--red-200)" }}>🔴 Red — テスト記述</span>
                  <span style={{ color: "var(--text-tertiary)" }}>25%</span>
                </div>
                <div
                  style={{
                    background: "var(--bg-tertiary)",
                    borderRadius: 4,
                    height: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "25%",
                      height: "100%",
                      background: "var(--red-400)",
                      borderRadius: 4,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1rem",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ color: "var(--green-200)" }}>🟢 Green — 最小実装</span>
                  <span style={{ color: "var(--text-tertiary)" }}>30%</span>
                </div>
                <div
                  style={{
                    background: "var(--bg-tertiary)",
                    borderRadius: 4,
                    height: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                      height: "100%",
                      background: "var(--green-400)",
                      borderRadius: 4,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1rem",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ color: "var(--blue-200)" }}>🔵 Refactor — 整理</span>
                  <span style={{ color: "var(--text-tertiary)" }}>45%</span>
                </div>
                <div
                  style={{
                    background: "var(--bg-tertiary)",
                    borderRadius: 4,
                    height: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "45%",
                      height: "100%",
                      background: "var(--blue-400)",
                      borderRadius: 4,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--text-tertiary)", marginTop: 14 }}>
              Refactor フェーズに最も時間をかけることが高品質なコードを生み出す鍵です。
            </p>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>2.2 全体フローの可視化</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
            START(["機能要件を確認する"])
            RED["🔴 RED フェーズ<br>失敗するテストを書く<br>テストを実行 → FAIL確認"]
            GREEN["🟢 GREEN フェーズ<br>テストを通す最小限のコードを書く<br>テストを実行 → PASS確認"]
            REFACTOR["🔵 REFACTOR フェーズ<br>コードを整理・改善する<br>テストを実行 → PASS維持確認"]
            NEXT{"次の機能が<br>あるか？"}
            END(["実装完了"])
        
            START --> RED
            RED --> GREEN
            GREEN --> REFACTOR
            REFACTOR --> NEXT
            NEXT -->|"Yes"| RED
            NEXT -->|"No"| END
        
            style RED fill:#3d1515,color:#f09595,stroke:#a32d2d
            style GREEN fill:#152b15,color:#c0dd97,stroke:#3b6d11
            style REFACTOR fill:#0e1f38,color:#b5d4f4,stroke:#185fa5
            style START fill:#2a2638,color:#afa9ec,stroke:#534ab7
            style END fill:#1e2a1e,color:#c0dd97,stroke:#3b6d11`}
            />
            <p className="mermaid-caption">Red-Green-Refactor サイクルの全体フロー</p>
          </div>

          <div className="sources-section">
            <h4>
              <IconLink size={16} aria-hidden="true" style={{ fontSize: "1rem", marginRight: 6 }} />
              参照ソース
            </h4>
            <Ext
              href="https://martinfowler.com/bliki/TestDrivenDevelopment.html"
              className="source-link"
            >
              <IconExternalLink size={16} aria-hidden="true" />
              Martin Fowler — TDD解説
            </Ext>
            <Ext href="https://www.agilealliance.org/glossary/tdd/" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              Agile Alliance — TDD用語集
            </Ext>
          </div>
        </section>

        <hr className="divider" />

        {/* === S3: ステップバイステップ === */}
        <section className="section" id="s3">
          <div className="section-header">
            <div className="section-number">03</div>
            <h2>TDDのステップバイステップ実践</h2>
          </div>

          <p>
            初学者がつまずきやすい「何から始めるか」を明確にするため、具体的な手順を整理します。
          </p>

          <h3 style={{ margin: "28px 0 16px" }}>3.1 実践の9ステップ</h3>
          <ol className="step-list">
            <li>
              <div>
                <strong>要件を小さなタスクに分解する</strong>
                <p>
                  「注文を作成できる」→「空の注文を作成できる」「商品を追加できる」「合計金額を計算できる」のように細分化します。
                </p>
              </div>
            </li>
            <li>
              <div>
                <strong>最初のテストを選ぶ</strong>
                <p>最もシンプルなハッピーパスの最小単位から始めます。</p>
              </div>
            </li>
            <li>
              <div>
                <strong>テストを書く（RED）</strong>
                <p>
                  <code>import → テスト関数定義 → Arrange → Act → Assert</code> の順で書きます。
                </p>
              </div>
            </li>
            <li>
              <div>
                <strong>テスト実行・失敗確認（RED確認）</strong>
                <p>エラーメッセージを読み、意図した理由で失敗しているか確認します。</p>
              </div>
            </li>
            <li>
              <div>
                <strong>最小限の実装（GREEN）</strong>
                <p>テストが通るだけのコードを書きます。美しさは後回しです。</p>
              </div>
            </li>
            <li>
              <div>
                <strong>テスト実行・成功確認（GREEN確認）</strong>
                <p>全テストがグリーンになることを確認します。</p>
              </div>
            </li>
            <li>
              <div>
                <strong>リファクタリング（REFACTOR）</strong>
                <p>コードを改善します。テストコードも改善の対象です。</p>
              </div>
            </li>
            <li>
              <div>
                <strong>テスト実行・グリーン維持確認</strong>
                <p>リファクタリング後も全テストがグリーンのままであることを確認します。</p>
              </div>
            </li>
            <li>
              <div>
                <strong>次のテストケースへ</strong>
                <p>エッジケース・異常系を追加し、ステップ2から繰り返します。</p>
              </div>
            </li>
          </ol>

          <h3 style={{ margin: "28px 0 16px" }}>
            3.2 テストケースの優先順序（Kent Beck のアドバイス）
          </h3>
          <p style={{ marginBottom: 16 }}>どのテストから書くかは TDD 習熟の重要ポイントです。</p>
          <ul className="priority-stack">
            <li className="priority-item pi-1">
              <div className="pi-num">1</div>
              <div className="pi-text">
                <strong>最もシンプルなハッピーパス</strong>
                <span>正しい入力で正しい結果が返る — ここから始めることで基本構造を設計できる</span>
              </div>
            </li>
            <li className="priority-item pi-2">
              <div className="pi-num">2</div>
              <div className="pi-text">
                <strong>次にシンプルなバリエーション</strong>
                <span>別の正しい入力パターンでカバレッジを広げる</span>
              </div>
            </li>
            <li className="priority-item pi-3">
              <div className="pi-num">3</div>
              <div className="pi-text">
                <strong>エッジケース（境界値）</strong>
                <span>0・空文字・最大値・最小値 — バグが最も潜みやすい箇所</span>
              </div>
            </li>
            <li className="priority-item pi-4">
              <div className="pi-num">4</div>
              <div className="pi-text">
                <strong>異常系・エラーケース</strong>
                <span>無効な入力・存在しないリソース — 例外処理の設計が自然に決まる</span>
              </div>
            </li>
            <li className="priority-item pi-5">
              <div className="pi-num">5</div>
              <div className="pi-text">
                <strong>複合条件</strong>
                <span>複数条件が絡むケース — 最後に取り組む</span>
              </div>
            </li>
          </ul>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
            T1["1. ハッピーパス<br>正常系の最小単位"] --> T2["2. バリエーション<br>別の正常パターン"] --> T3["3. エッジケース<br>境界値テスト"] --> T4["4. 異常系<br>エラーケース"] --> T5["5. 複合条件<br>複数条件の組み合わせ"]
        
            style T1 fill:#152b15,color:#c0dd97,stroke:#3b6d11
            style T2 fill:#0e1f38,color:#b5d4f4,stroke:#185fa5
            style T3 fill:#3a2a0a,color:#fac775,stroke:#854f0b
            style T4 fill:#3d1515,color:#f09595,stroke:#a32d2d
            style T5 fill:#2a2638,color:#afa9ec,stroke:#534ab7`}
            />
            <p className="mermaid-caption">テストケースを書く優先順序（左から始めるのが原則）</p>
          </div>

          <div className="sources-section">
            <h4>
              <IconLink size={16} aria-hidden="true" style={{ fontSize: "1rem", marginRight: 6 }} />
              参照ソース
            </h4>
            <Ext href="https://www.agilealliance.org/glossary/tdd/" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              Agile Alliance — TDD実践ガイド
            </Ext>
          </div>
        </section>

        <hr className="divider" />

        {/* === S4: テストの種類 === */}
        <section className="section" id="s4">
          <div className="section-header">
            <div className="section-number">04</div>
            <h2>テストの種類と役割</h2>
          </div>

          <p>
            TDDで書くテストは主にユニットテストですが、テスト全体の体系を理解することが重要です。
          </p>

          <h3 style={{ margin: "28px 0 16px" }}>4.1 テストピラミッド</h3>
          <div className="pyramid-wrap">
            <div className="pyramid">
              <div className="pyramid-tier tier-e2e">
                <span className="tier-badge">少数・高コスト</span>
                <div className="tier-label">E2Eテスト（UI/システムテスト）</div>
                <div className="tier-meta">
                  実行時間：分単位 ／ ユーザー視点のシナリオ全体を検証
                </div>
                <div className="tier-tools">ツール：Playwright / Cypress / Selenium</div>
              </div>
              <div className="pyramid-tier tier-int">
                <span className="tier-badge">中程度・中コスト</span>
                <div className="tier-label">統合テスト（Integration Tests）</div>
                <div className="tier-meta">実行時間：秒単位 ／ サービス間の連携を検証</div>
                <div className="tier-tools">ツール：pytest + TestContainers / REST Assured</div>
              </div>
              <div className="pyramid-tier tier-unit">
                <span className="tier-badge">多数・低コスト ← TDDの主戦場</span>
                <div className="tier-label">ユニットテスト（Unit Tests）</div>
                <div className="tier-meta">実行時間：ミリ秒単位 ／ 関数・クラス・メソッド単位</div>
                <div className="tier-tools">
                  ツール：pytest / Jest / JUnit ／ 外部依存はモック化
                </div>
              </div>
            </div>
          </div>

          <div className="callout callout-tip">
            <IconHelp size={16} aria-hidden="true" />
            <div className="callout-body">
              <strong>ピラミッドの原則</strong>
              <p>
                ユニットテストを最も多く書き、E2Eテストは最小限に抑えます。上に行くほどコストが高く実行が遅くなります。TDDの主役はユニットテストです。
              </p>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>4.2 TDDで主に書くテストの分類</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph LR
            subgraph UT["ユニットテスト（TDDの主体）"]
                direction TB
                UT1["純粋関数のテスト<br>入力→出力の検証"]
                UT2["ドメインエンティティ<br>ビジネスルールの検証"]
                UT3["値オブジェクト<br>計算・バリデーション"]
                UT4["ユースケース<br>モックを使った協調テスト"]
            end
        
            subgraph IT["統合テスト（TDDで補完）"]
                direction TB
                IT1["リポジトリの統合テスト<br>実際のDB操作の検証"]
                IT2["外部APIクライアント<br>HTTP通信の検証"]
            end
        
            style UT fill:#152b15,stroke:#3b6d11,color:#c0dd97
            style IT fill:#3a2a0a,stroke:#854f0b,color:#fac775`}
            />
            <p className="mermaid-caption">TDDで書くテストの分類</p>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>4.3 テストの速度と信頼性のトレードオフ</h3>
          <div className="best-practice-table">
            <table>
              <thead>
                <tr>
                  <th>テスト種別</th>
                  <th>実行速度</th>
                  <th>信頼性</th>
                  <th>TDDでの位置づけ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>純粋関数ユニットテスト</td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>超高速（ms）</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>非常に高い</span>
                  </td>
                  <td>TDDの理想ゾーン</td>
                </tr>
                <tr>
                  <td>ドメインロジックテスト</td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>高速（ms）</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>高い</span>
                  </td>
                  <td>TDDの理想ゾーン</td>
                </tr>
                <tr>
                  <td>インメモリリポジトリテスト</td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>高速（ms）</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--green-200)" }}>高い</span>
                  </td>
                  <td>TDDで積極活用</td>
                </tr>
                <tr>
                  <td>DB統合テスト</td>
                  <td>
                    <span style={{ color: "var(--amber-200)" }}>中速（秒）</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>高い</span>
                  </td>
                  <td>統合テストとして分離</td>
                </tr>
                <tr>
                  <td>E2Eテスト</td>
                  <td>
                    <span style={{ color: "var(--red-200)" }}>遅い（分）</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>最高</span>
                  </td>
                  <td>最小限に絞る</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="sources-section">
            <h4>
              <IconLink size={16} aria-hidden="true" style={{ fontSize: "1rem", marginRight: 6 }} />
              参照ソース
            </h4>
            <Ext href="https://martinfowler.com/bliki/TestPyramid.html" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              Martin Fowler — テストピラミッド
            </Ext>
            <Ext href="https://martinfowler.com/bliki/UnitTest.html" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              Martin Fowler — Unit Test
            </Ext>
          </div>
        </section>

        <hr className="divider" />

        {/* === S5: ユニットテスト設計原則 === */}
        <section className="section" id="s5">
          <div className="section-header">
            <div className="section-number">05</div>
            <h2>ユニットテストの設計原則</h2>
          </div>

          <h3 style={{ margin: "0 0 16px" }}>5.1 F.I.R.S.T. 原則</h3>
          <p style={{ marginBottom: 20 }}>良いユニットテストが満たすべき5つの性質です。</p>

          <div className="two-col" style={{ marginBottom: 16 }}>
            <div className="card">
              <div className="card-header">
                <span style={{ fontSize: 22, fontWeight: "500", color: "var(--red-400)" }}>F</span>
                <div>
                  <h3>Fast（速い）</h3>
                  <p style={{ fontSize: "1rem", margin: "0" }}>ミリ秒で完了すること</p>
                </div>
              </div>
              <p style={{ fontSize: "1rem" }}>
                DBやネットワークに依存しない。何千件でも高速に実行できる設計にする。
              </p>
            </div>
            <div className="card">
              <div className="card-header">
                <span style={{ fontSize: 22, fontWeight: "500", color: "var(--blue-400)" }}>I</span>
                <div>
                  <h3>Independent（独立）</h3>
                  <p style={{ fontSize: "1rem", margin: "0" }}>テスト間の依存関係がない</p>
                </div>
              </div>
              <p style={{ fontSize: "1rem" }}>
                任意の順序で実行でき、並列実行も可能な独立したテスト設計にする。
              </p>
            </div>
            <div className="card">
              <div className="card-header">
                <span style={{ fontSize: 22, fontWeight: "500", color: "var(--green-400)" }}>
                  R
                </span>
                <div>
                  <h3>Repeatable（再現可能）</h3>
                  <p style={{ fontSize: "1rem", margin: "0" }}>同じ入力で常に同じ結果</p>
                </div>
              </div>
              <p style={{ fontSize: "1rem" }}>
                日時・乱数・外部APIに依存しない。どの環境でも同じ結果を返す。
              </p>
            </div>
            <div className="card">
              <div className="card-header">
                <span style={{ fontSize: 22, fontWeight: "500", color: "var(--amber-200)" }}>
                  S
                </span>
                <div>
                  <h3>Self-validating（自己検証）</h3>
                  <p style={{ fontSize: "1rem", margin: "0" }}>Pass/Failが自動的に判定</p>
                </div>
              </div>
              <p style={{ fontSize: "1rem" }}>
                手動での結果確認が不要。boolean アサーションで自動的に判定される。
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <span style={{ fontSize: 22, fontWeight: "500", color: "var(--purple-400)" }}>T</span>
              <div>
                <h3>Timely（タイムリー）</h3>
                <p style={{ fontSize: "1rem", margin: "0" }}>プロダクションコードの直前に書く</p>
              </div>
            </div>
            <p style={{ fontSize: "1rem" }}>
              TDDではテストを先に書く。後回しにせず、実装と同タイミングで書くことで設計品質が保たれる。
            </p>
          </div>

          <h3 style={{ margin: "32px 0 16px" }}>5.2 テスト命名規則</h3>
          <div className="two-col">
            <div className="col-card col-good">
              <div className="col-header">
                <IconCheck size={16} aria-hidden="true" />
                良いテスト名
              </div>
              <ul>
                <li>
                  <code>test_注文に商品を追加すると合計金額が増える</code>
                </li>
                <li>
                  <code>test_在庫が0の商品はカートに追加できない</code>
                </li>
                <li>
                  <code>test_未認証ユーザーが注文すると401エラー</code>
                </li>
                <li>
                  <code>should_calculate_total_when_items_added</code>
                </li>
                <li>
                  <code>given_empty_cart_when_checkout_then_error</code>
                </li>
              </ul>
            </div>
            <div className="col-card col-bad">
              <div className="col-header">
                <IconX size={16} aria-hidden="true" />
                悪いテスト名
              </div>
              <ul>
                <li>
                  <code>test_001</code>
                </li>
                <li>
                  <code>test_order</code>
                </li>
                <li>
                  <code>test_it_works</code>
                </li>
                <li>
                  <code>check</code>
                </li>
                <li>
                  <code>order_test_1</code>
                </li>
              </ul>
            </div>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <h3 style={{ marginBottom: 12 }}>推奨命名パターン</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  padding: "10px 14px",
                  background: "var(--bg-tertiary)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "1rem",
                }}
              >
                <strong style={{ color: "var(--text-primary)" }}>
                  パターン1：日本語で意図を明確に
                </strong>
                <br />
                <code style={{ fontSize: "1rem" }}>test_[条件]_[操作]_[期待結果]</code>
              </div>
              <div
                style={{
                  padding: "10px 14px",
                  background: "var(--bg-tertiary)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "1rem",
                }}
              >
                <strong style={{ color: "var(--text-primary)" }}>
                  パターン2：Given-When-Then形式
                </strong>
                <br />
                <code style={{ fontSize: "1rem" }}>given_[状態]_when_[操作]_then_[結果]</code>
              </div>
              <div
                style={{
                  padding: "10px 14px",
                  background: "var(--bg-tertiary)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "1rem",
                }}
              >
                <strong style={{ color: "var(--text-primary)" }}>パターン3：should形式</strong>
                <br />
                <code style={{ fontSize: "1rem" }}>should_[期待する振る舞い]</code>
              </div>
            </div>
          </div>

          <div className="sources-section">
            <h4>
              <IconLink size={16} aria-hidden="true" style={{ fontSize: "1rem", marginRight: 6 }} />
              参照ソース
            </h4>
            <Ext
              href="https://agileinaflash.blogspot.com/2009/02/first.html"
              className="source-link"
            >
              <IconExternalLink size={16} aria-hidden="true" />
              F.I.R.S.T. 原則（Agile in a Flash）
            </Ext>
          </div>
        </section>

        <hr className="divider" />

        {/* === S6: モックとスタブ === */}
        <section className="section" id="s6">
          <div className="section-header">
            <div className="section-number">06</div>
            <h2>モックとスタブの活用</h2>
          </div>

          <p>
            テストダブル（Test
            Double）は本物の依存の代替物です。種類を正しく使い分けることが重要です。
          </p>

          <h3 style={{ margin: "28px 0 16px" }}>6.1 テストダブルの5種類</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TD
            TD["テストダブル（Test Double）<br>本物の依存の代替物"]
        
            TD --> DUMMY["Dummy<br>渡されるが使われない<br>例：null やダミーオブジェクト"]
            TD --> STUB["Stub<br>固定値を返す偽物<br>例：常に true を返す"]
            TD --> FAKE["Fake<br>動作する軽量実装<br>例：InMemoryRepository"]
            TD --> SPY["Spy<br>呼び出しを記録する Stub<br>例：何回呼ばれたか記録"]
            TD --> MOCK["Mock<br>期待値を事前設定<br>例：特定の引数で呼ばれることを期待"]
        
            style DUMMY fill:#2c2c2a,color:#b4b2a9,stroke:#5f5e5a
            style STUB fill:#0e1f38,color:#b5d4f4,stroke:#185fa5
            style FAKE fill:#152b15,color:#c0dd97,stroke:#3b6d11
            style SPY fill:#3a2a0a,color:#fac775,stroke:#854f0b
            style MOCK fill:#3d1515,color:#f09595,stroke:#a32d2d`}
            />
            <p className="mermaid-caption">テストダブルの5種類と使い分け</p>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>6.2 モックを使う・使わない場面</h3>
          <div className="two-col">
            <div className="col-card col-good">
              <div className="col-header">
                <IconCheck size={16} aria-hidden="true" />
                モックを使うべき場面
              </div>
              <ul>
                <li>外部APIの呼び出し（Stripe / SendGrid / Slack API）</li>
                <li>データベースの操作（ユニットテスト内）</li>
                <li>時刻・乱数・UUIDの生成（再現性確保）</li>
                <li>メール送信・通知（副作用を持つ処理）</li>
                <li>非決定的な外部サービス</li>
              </ul>
            </div>
            <div className="col-card col-bad">
              <div className="col-header">
                <IconX size={16} aria-hidden="true" />
                モックを使わない場面
              </div>
              <ul>
                <li>ドメインエンティティ（純粋なビジネスロジック）</li>
                <li>値オブジェクト（計算・バリデーション）</li>
                <li>ファクトリ関数（オブジェクト生成）</li>
                <li>状態がないユーティリティ（純粋関数）</li>
              </ul>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>6.3 モックの実装例（Python / pytest）</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">import</span> pytest
        <span class="kw">from</span> unittest.mock <span class="kw">import</span> MagicMock
        <span class="kw">from</span> datetime <span class="kw">import</span> datetime
        
        
        <span class="kw">class</span> OrderService:
            <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, order_repository, email_service, clock=<span class="kw">None</span>):
                <span class="kw">self</span>._repo = order_repository
                <span class="kw">self</span>._email = email_service
                <span class="kw">self</span>._clock = clock or datetime.utcnow
        
            <span class="kw">def</span> <span class="fn">place_order</span>(<span class="kw">self</span>, customer_id: str, items: list) -&gt; dict:
                order = {
                    <span class="st">"id"</span>: <span class="st">"order_123"</span>,
                    <span class="st">"customer_id"</span>: customer_id,
                    <span class="st">"items"</span>: items,
                    <span class="st">"created_at"</span>: <span class="kw">self</span>.<span class="fn">_clock</span>().<span class="fn">isoformat</span>(),
                    <span class="st">"status"</span>: <span class="st">"confirmed"</span>
                }
                <span class="kw">self</span>._repo.<span class="fn">save</span>(order)
                <span class="kw">self</span>._email.<span class="fn">send_order_confirmation</span>(
                    to=<span class="st">f"{customer_id}@example.com"</span>,
                    order_id=order[<span class="st">"id"</span>]
                )
                <span class="kw">return</span> order
        
        
        <span class="kw">class</span> TestOrderServiceWithMock:
        
            <span <span class="kw">class</span>="fn">@pytest.fixture</span>
            <span class="kw">def</span> <span class="fn">mock_repo</span>(<span class="kw">self</span>):
                <span class="kw">return</span> <span class="fn">MagicMock</span>()
        
            <span <span class="kw">class</span>="fn">@pytest.fixture</span>
            <span class="kw">def</span> <span class="fn">mock_email</span>(<span class="kw">self</span>):
                mock = <span class="fn">MagicMock</span>()
                mock.send_order_confirmation.return_value = <span class="kw">True</span>
                <span class="kw">return</span> mock
        
            <span <span class="kw">class</span>="fn">@pytest.fixture</span>
            <span class="kw">def</span> <span class="fn">fixed_clock</span>(<span class="kw">self</span>):
        <span class="cm">        # 時刻を固定して再現性を確保</span>
                <span class="kw">return</span> <span class="kw">lambda</span>: <span class="fn">datetime</span>(<span class="nu">2024</span>, <span class="nu">1</span>, <span class="nu">15</span>, <span class="nu">10</span>, <span class="nu">30</span>, <span class="nu">0</span>)
        
            <span <span class="kw">class</span>="fn">@pytest.fixture</span>
            <span class="kw">def</span> <span class="fn">order_service</span>(<span class="kw">self</span>, mock_repo, mock_email, fixed_clock):
                <span class="kw">return</span> <span class="fn">OrderService</span>(
                    order_repository=mock_repo,
                    email_service=mock_email,
                    clock=fixed_clock,
                )
        
            <span class="kw">def</span> test_注文確定後にリポジトリに保存される(<span class="kw">self</span>, order_service, mock_repo):
        <span class="cm">        # Act</span>
                order_service.<span class="fn">place_order</span>(
                    customer_id=<span class="st">"cust_001"</span>,
                    items=[{<span class="st">"product_id"</span>: <span class="st">"prod_001"</span>, <span class="st">"quantity"</span>: <span class="nu">2</span>}]
                )
        <span class="cm">        # Assert: save が1回呼ばれたことを検証</span>
                mock_repo.save.<span class="fn">assert_called_once</span>()
                saved_order = mock_repo.save.call_args[<span class="nu">0</span>][<span class="nu">0</span>]
                <span class="kw">assert</span> saved_order[<span class="st">"customer_id"</span>] == <span class="st">"cust_001"</span>
                <span class="kw">assert</span> saved_order[<span class="st">"status"</span>] == <span class="st">"confirmed"</span>
        
            <span class="kw">def</span> test_作成日時が固定時刻で設定される(<span class="kw">self</span>, order_service):
                result = order_service.<span class="fn">place_order</span>(customer_id=<span class="st">"cust_001"</span>, items=[])
                <span class="kw">assert</span> result[<span class="st">"created_at"</span>] == <span class="st">"2024-01-15T10:30:00"</span>`,
            }}
          />

          <div className="sources-section">
            <h4>
              <IconLink size={16} aria-hidden="true" style={{ fontSize: "1rem", marginRight: 6 }} />
              参照ソース
            </h4>
            <Ext
              href="https://martinfowler.com/articles/mocksArentStubs.html"
              className="source-link"
            >
              <IconExternalLink size={16} aria-hidden="true" />
              Martin Fowler — Mocks Aren't Stubs
            </Ext>
            <Ext href="https://martinfowler.com/bliki/TestDouble.html" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              Martin Fowler — Test Doubles
            </Ext>
            <Ext href="https://pytest-mock.readthedocs.io/" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              pytest-mock 公式ドキュメント
            </Ext>
          </div>
        </section>

        <hr className="divider" />

        {/* === S7: AAAパターン === */}
        <section className="section" id="s7">
          <div className="section-header">
            <div className="section-number">07</div>
            <h2>AAAパターン（Arrange-Act-Assert）</h2>
          </div>

          <p>
            テストコードの基本構造として世界標準的に使われているパターンです。読みやすく、一目でテストの意図が伝わります。
          </p>

          <div className="phase-grid">
            <div className="phase-card phase-blue">
              <div className="phase-label">📦 Arrange（準備）</div>
              <h3>テストに必要な状態を設定</h3>
              <ul>
                <li>テスト対象オブジェクトの生成</li>
                <li>依存関係（モック等）の設定</li>
                <li>入力データの準備</li>
                <li>複雑な場合は Fixture に切り出す</li>
              </ul>
            </div>
            <div className="phase-card phase-red">
              <div className="phase-label">⚡ Act（実行）</div>
              <h3>テスト対象の処理を実行</h3>
              <ul>
                <li>通常は1行だけ</li>
                <li>テストしたい操作を実行</li>
                <li>戻り値を変数に保存</li>
                <li>複数の Act は危険信号</li>
              </ul>
            </div>
            <div className="phase-card phase-green">
              <div className="phase-label">✅ Assert（検証）</div>
              <h3>期待する結果を検証</h3>
              <ul>
                <li>戻り値の検証</li>
                <li>副作用（DB・メール）の検証</li>
                <li>例外の検証</li>
                <li>1テスト1アサーション推奨</li>
              </ul>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>7.1 AAAパターンの完全実装例</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">import</span> pytest
        <span class="kw">from</span> decimal <span class="kw">import</span> Decimal
        
        
        <span class="kw">class</span> ShoppingCart:
            <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>):
                <span class="kw">self</span>._items: list[dict] = []
        
            <span class="kw">def</span> <span class="fn">add_item</span>(<span class="kw">self</span>, product_id: str, <span class="kw">name</span>: str, price: Decimal, quantity: int):
                <span class="kw">if</span> quantity &lt;= <span class="nu">0</span>:
                    <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="st">"数量は1以上でなければなりません"</span>)
                <span class="kw">if</span> price &lt; <span class="nu">0</span>:
                    <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="st">"価格は0以上でなければなりません"</span>)
                <span class="kw">self</span>._items.<span class="fn">append</span>({<span class="st">"product_id"</span>: product_id, <span class="st">"name"</span>: <span class="kw">name</span>,
                                    <span class="st">"price"</span>: price, <span class="st">"quantity"</span>: quantity})
        
            <span class="kw">def</span> <span class="fn">total</span>(<span class="kw">self</span>) -&gt; Decimal:
                <span class="kw">return</span> <span class="fn">sum</span>(item[<span class="st">"price"</span>] * item[<span class="st">"quantity"</span>] <span class="kw">for</span> item <span class="kw">in</span> <span class="kw">self</span>._items)
        
            <span <span class="kw">class</span>="fn">@property</span>
            <span class="kw">def</span> <span class="fn">is_empty</span>(<span class="kw">self</span>) -&gt; bool:
                <span class="kw">return</span> <span class="fn">len</span>(<span class="kw">self</span>._items) == <span class="nu">0</span>
        
        
        <span class="kw">class</span> TestShoppingCart:
        
        <span class="cm">    # ─── シンプルなケースから始める ───</span>
        
            <span class="kw">def</span> test_新規カートは空である(<span class="kw">self</span>):
        <span class="cm">        # Arrange</span>
                cart = <span class="fn">ShoppingCart</span>()
        <span class="cm">        # Act</span>
                result = cart.is_empty
        <span class="cm">        # Assert</span>
                <span class="kw">assert</span> result is <span class="kw">True</span>
        
            <span class="kw">def</span> test_商品を追加すると合計金額が増える(<span class="kw">self</span>):
        <span class="cm">        # Arrange</span>
                cart = <span class="fn">ShoppingCart</span>()
                price = <span class="fn">Decimal</span>(<span class="st">"1000"</span>)
                quantity = <span class="nu">2</span>
        <span class="cm">        # Act</span>
                cart.<span class="fn">add_item</span>(<span class="st">"prod_001"</span>, <span class="st">"Tシャツ"</span>, price, quantity)
        <span class="cm">        # Assert</span>
                <span class="kw">assert</span> cart.<span class="fn">total</span>() == <span class="fn">Decimal</span>(<span class="st">"2000"</span>)
        
        <span class="cm">    # ─── エッジケース・異常系 ───</span>
        
            <span class="kw">def</span> test_数量<span class="nu">0</span>で商品追加するとValueErrorが発生する(<span class="kw">self</span>):
        <span class="cm">        # Arrange</span>
                cart = <span class="fn">ShoppingCart</span>()
        <span class="cm">        # Act &amp; Assert</span>
                <span class="kw">with</span> pytest.<span class="fn">raises</span>(ValueError, match=<span class="st">"数量は1以上でなければなりません"</span>):
                    cart.<span class="fn">add_item</span>(<span class="st">"prod_001"</span>, <span class="st">"Tシャツ"</span>, <span class="fn">Decimal</span>(<span class="st">"1000"</span>), <span class="nu">0</span>)`,
            }}
          />

          <div className="callout callout-tip">
            <IconBulb size={16} aria-hidden="true" />
            <div className="callout-body">
              <strong>コメントで区切る</strong>
              <p>
                コード内の <code># Arrange</code> / <code># Act</code> / <code># Assert</code>{" "}
                コメントは、特に初学者がテストを読む際の道標になります。チームで統一することを推奨します。
              </p>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* === S8: ドメインロジック === */}
        <section className="section" id="s8">
          <div className="section-header">
            <div className="section-number">08</div>
            <h2>TDDの実装例：ドメインロジック編</h2>
          </div>

          <p>注文ドメインを題材に、TDDサイクルを実際に回す流れを示します。</p>

          <h3 style={{ margin: "28px 0 16px" }}>8.1 TDDの実践フロー（シーケンス図）</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`sequenceDiagram
            participant DEV as 開発者
            participant TEST as テストコード
            participant PROD as プロダクションコード
            participant CI as テストランナー
        
            Note over DEV,CI: 🔴 RED フェーズ
            DEV->>TEST: test_空の注文に商品を追加できる を書く
            DEV->>CI: pytest を実行
            CI-->>DEV: FAIL（OrderクラスがImportError）
        
            Note over DEV,CI: 🟢 GREEN フェーズ
            DEV->>PROD: class Order を最小限実装
            DEV->>CI: pytest を実行
            CI-->>DEV: PASS
        
            Note over DEV,CI: 🔵 REFACTOR フェーズ
            DEV->>PROD: コードを整理・改善する
            DEV->>CI: pytest を実行
            CI-->>DEV: PASS（全テスト）
        
            Note over DEV,CI: 次のテストへ（繰り返し）
            DEV->>TEST: test_確定済み注文に商品追加するとエラー を書く
            DEV->>CI: pytest を実行
            CI-->>DEV: FAIL（期待通り）
            DEV->>PROD: confirm() メソッドにバリデーション追加
            DEV->>CI: pytest を実行
            CI-->>DEV: PASS（全テスト）`}
            />
            <p className="mermaid-caption">
              開発者・テストコード・プロダクションコードの三者間の TDD シーケンス
            </p>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>8.2 ドメインロジックの完全実装例</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass, field
        <span class="kw">from</span> enum <span class="kw">import</span> Enum
        <span class="kw">from</span> uuid <span class="kw">import</span> uuid4
        
        
        <span class="kw">class</span> <span class="fn">OrderStatus</span>(Enum):
            PENDING   = <span class="st">"pending"</span>
            CONFIRMED = <span class="st">"confirmed"</span>
            CANCELLED = <span class="st">"cancelled"</span>
        
        
        <span <span class="kw">class</span>="fn">@dataclass</span>(frozen=<span class="kw">True</span>)
        <span class="kw">class</span> Money:
            amount: int
            currency: str
        
            <span class="kw">def</span> <span class="fn">__post_init__</span>(<span class="kw">self</span>):
                <span class="kw">if</span> <span class="kw">self</span>.amount &lt; <span class="nu">0</span>:
                    <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="st">f"金額は0以上: {self.amount}"</span>)
        
            <span class="kw">def</span> <span class="fn">__add__</span>(<span class="kw">self</span>, other: <span class="st">"Money"</span>) -&gt; <span class="st">"Money"</span>:
                <span class="kw">if</span> <span class="kw">self</span>.currency != other.currency:
                    <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="st">f"通貨不一致: {self.currency} vs {other.currency}"</span>)
                <span class="kw">return</span> <span class="fn">Money</span>(<span class="kw">self</span>.amount + other.amount, <span class="kw">self</span>.currency)
        
            <span class="kw">def</span> <span class="fn">__mul__</span>(<span class="kw">self</span>, factor: int) -&gt; <span class="st">"Money"</span>:
                <span class="kw">return</span> <span class="fn">Money</span>(<span class="kw">self</span>.amount * factor, <span class="kw">self</span>.currency)
        
        
        <span <span class="kw">class</span>="fn">@dataclass</span>
        <span class="kw">class</span> OrderLine:
            product_id: str
            product_name: str
            unit_price: Money
            quantity: int
        
            <span <span class="kw">class</span>="fn">@property</span>
            <span class="kw">def</span> <span class="fn">subtotal</span>(<span class="kw">self</span>) -&gt; Money:
                <span class="kw">return</span> <span class="kw">self</span>.unit_price * <span class="kw">self</span>.quantity
        
        
        <span <span class="kw">class</span>="fn">@dataclass</span>
        <span class="kw">class</span> Order:
            id: str
            customer_id: str
            _lines: list[OrderLine] = <span class="fn">field</span>(default_factory=list)
            _status: OrderStatus = OrderStatus.PENDING
        
            <span <span class="kw">class</span>="fn">@classmethod</span>
            <span class="kw">def</span> <span class="fn">create</span>(cls, customer_id: str) -&gt; <span class="st">"Order"</span>:
                <span class="st">"""ファクトリメソッド"""</span>
                <span class="kw">return</span> <span class="fn">cls</span>(id=<span class="fn">str</span>(<span class="fn">uuid4</span>()), customer_id=customer_id)
        
            <span class="kw">def</span> <span class="fn">add_line</span>(<span class="kw">self</span>, product_id: str, product_name: str,
                         unit_price: Money, quantity: int) -&gt; <span class="kw">None</span>:
                <span class="kw">if</span> <span class="kw">self</span>._status != OrderStatus.PENDING:
                    <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="st">"確定済みの注文は変更できません"</span>)
                <span class="kw">if</span> quantity &lt;= <span class="nu">0</span>:
                    <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="st">f"数量は1以上でなければなりません: {quantity}"</span>)
                <span class="kw">self</span>._lines.<span class="fn">append</span>(<span class="fn">OrderLine</span>(product_id, product_name, unit_price, quantity))
        
            <span class="kw">def</span> <span class="fn">confirm</span>(<span class="kw">self</span>) -&gt; <span class="kw">None</span>:
                <span class="kw">if</span> <span class="kw">self</span>._status != OrderStatus.PENDING:
                    <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="st">"保留中の注文のみ確定できます"</span>)
                <span class="kw">if</span> not <span class="kw">self</span>._lines:
                    <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="st">"商品が1件もありません"</span>)
                <span class="kw">self</span>._status = OrderStatus.CONFIRMED
        
            <span <span class="kw">class</span>="fn">@property</span>
            <span class="kw">def</span> <span class="fn">status</span>(<span class="kw">self</span>) -&gt; OrderStatus:
                <span class="kw">return</span> <span class="kw">self</span>._status
        
            <span <span class="kw">class</span>="fn">@property</span>
            <span class="kw">def</span> <span class="fn">is_empty</span>(<span class="kw">self</span>) -&gt; bool:
                <span class="kw">return</span> <span class="fn">len</span>(<span class="kw">self</span>._lines) == <span class="nu">0</span>
        
            <span <span class="kw">class</span>="fn">@property</span>
            <span class="kw">def</span> <span class="fn">total</span>(<span class="kw">self</span>) -&gt; Money:
                <span class="kw">if</span> <span class="kw">self</span>.is_empty:
                    <span class="kw">return</span> <span class="fn">Money</span>(<span class="nu">0</span>, <span class="st">"JPY"</span>)
                totals = [line.subtotal <span class="kw">for</span> line <span class="kw">in</span> <span class="kw">self</span>._lines]
                result = totals[<span class="nu">0</span>]
                <span class="kw">for</span> t <span class="kw">in</span> totals[<span class="nu">1</span>:]:
                    result = result + t
                <span class="kw">return</span> result
        
        
        <span class="cm"># ─── TDD テストコード ───</span>
        
        <span class="kw">class</span> TestOrderCreation:
            <span class="kw">def</span> test_注文を作成すると保留中ステータスになる(<span class="kw">self</span>):
                order = Order.<span class="fn">create</span>(customer_id=<span class="st">"cust_123"</span>)
                <span class="kw">assert</span> order.status == OrderStatus.PENDING
        
            <span class="kw">def</span> test_作成した注文は空の明細を持つ(<span class="kw">self</span>):
                order = Order.<span class="fn">create</span>(customer_id=<span class="st">"cust_123"</span>)
                <span class="kw">assert</span> order.is_empty is <span class="kw">True</span>
        
        
        <span class="kw">class</span> TestOrderConfirmation:
            <span class="kw">def</span> test_商品があれば注文を確定できる(<span class="kw">self</span>):
                order = Order.<span class="fn">create</span>(customer_id=<span class="st">"cust_123"</span>)
                order.<span class="fn">add_line</span>(<span class="st">"prod_001"</span>, <span class="st">"Tシャツ"</span>, <span class="fn">Money</span>(<span class="nu">1000</span>, <span class="st">"JPY"</span>), <span class="nu">1</span>)
                order.<span class="fn">confirm</span>()
                <span class="kw">assert</span> order.status == OrderStatus.CONFIRMED
        
            <span class="kw">def</span> test_空の注文は確定できない(<span class="kw">self</span>):
                order = Order.<span class="fn">create</span>(customer_id=<span class="st">"cust_123"</span>)
                <span class="kw">with</span> pytest.<span class="fn">raises</span>(ValueError, match=<span class="st">"商品が1件もありません"</span>):
                    order.<span class="fn">confirm</span>()
        
            <span class="kw">def</span> test_確定済み注文には商品を追加できない(<span class="kw">self</span>):
                order = Order.<span class="fn">create</span>(customer_id=<span class="st">"cust_123"</span>)
                order.<span class="fn">add_line</span>(<span class="st">"prod_001"</span>, <span class="st">"Tシャツ"</span>, <span class="fn">Money</span>(<span class="nu">1000</span>, <span class="st">"JPY"</span>), <span class="nu">1</span>)
                order.<span class="fn">confirm</span>()
                <span class="kw">with</span> pytest.<span class="fn">raises</span>(ValueError, match=<span class="st">"確定済みの注文は変更できません"</span>):
                    order.<span class="fn">add_line</span>(<span class="st">"prod_002"</span>, <span class="st">"ジーンズ"</span>, <span class="fn">Money</span>(<span class="nu">5000</span>, <span class="st">"JPY"</span>), <span class="nu">1</span>)`,
            }}
          />
        </section>

        <hr className="divider" />

        {/* === S9: APIエンドポイント === */}
        <section className="section" id="s9">
          <div className="section-header">
            <div className="section-number">09</div>
            <h2>TDDの実装例：APIエンドポイント編</h2>
          </div>

          <p>
            FastAPI を題材に、APIエンドポイントを TDD
            で設計・実装する方法を示します。テストを先に書くことで、リクエスト形式・レスポンス形式・ステータスコードが自然に設計されます。
          </p>

          <h3 style={{ margin: "28px 0 16px" }}>9.1 API テストの TDD フロー</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
            RED["🔴 RED フェーズ<br>APIテストを先に書く<br>・エンドポイントのURL設計<br>・リクエスト形式の設計<br>・レスポンス形式の設計<br>・ステータスコードの設計"]
            GREEN["🟢 GREEN フェーズ<br>エンドポイントを実装<br>・ルーティング設定<br>・リクエストのバリデーション<br>・ユースケースの呼び出し<br>・レスポンスの整形"]
            REFACTOR["🔵 REFACTOR フェーズ<br>コードを整理<br>・バリデーションロジックの整理<br>・エラーハンドリングの統一<br>・レスポンス形式の共通化"]
        
            RED --> GREEN --> REFACTOR
        
            style RED fill:#3d1515,color:#f09595,stroke:#a32d2d
            style GREEN fill:#152b15,color:#c0dd97,stroke:#3b6d11
            style REFACTOR fill:#0e1f38,color:#b5d4f4,stroke:#185fa5`}
            />
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>9.2 FastAPI エンドポイントの TDD 実装例</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">import</span> pytest
        <span class="kw">from</span> fastapi.testclient <span class="kw">import</span> TestClient
        <span class="kw">from</span> fastapi <span class="kw">import</span> FastAPI, HTTPException
        <span class="kw">from</span> pydantic <span class="kw">import</span> BaseModel, Field
        <span class="kw">from</span> unittest.mock <span class="kw">import</span> MagicMock
        <span class="kw">from</span> typing <span class="kw">import</span> List
        <span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
        
        
        <span class="cm"># ─── スキーマ定義 ───</span>
        
        <span class="kw">class</span> <span class="fn">OrderItemRequest</span>(BaseModel):
            product_id: str = <span class="fn">Field</span>(..., min_length=<span class="nu">1</span>)
            quantity:   int = <span class="fn">Field</span>(..., ge=<span class="nu">1</span>)
        
        <span class="kw">class</span> <span class="fn">CreateOrderRequest</span>(BaseModel):
            customer_id: str                    = <span class="fn">Field</span>(..., min_length=<span class="nu">1</span>)
            items:       List[OrderItemRequest] = <span class="fn">Field</span>(..., min_items=<span class="nu">1</span>)
        
        <span class="kw">class</span> <span class="fn">EntityNotFoundError</span>(Exception):
            <span class="kw">pass</span>
        
        
        <span class="kw">def</span> <span class="fn">create_app</span>(place_order_use_case) -&gt; FastAPI:
            <span class="st">"""アプリケーションファクトリ（テスト時に依存を注入可能）"""</span>
            app = <span class="fn">FastAPI</span>()
        
            <span <span class="kw">class</span>="fn">@app.post</span>(<span class="st">"/v1/orders"</span>, status_code=<span class="nu">201</span>)
            <span class="kw">async</span> <span class="kw">def</span> <span class="fn">create_order</span>(request: CreateOrderRequest):
                <span <span class="kw">class</span>="fn">@dataclass</span>
                <span class="kw">class</span> PlaceOrderCommand:
                    customer_id: str
                    items: list
        
                <span class="kw">try</span>:
                    command = <span class="fn">PlaceOrderCommand</span>(
                        customer_id=request.customer_id,
                        items=[{<span class="st">"product_id"</span>: i.product_id, <span class="st">"quantity"</span>: i.quantity}
                               <span class="kw">for</span> i <span class="kw">in</span> request.items],
                    )
                    result = place_order_use_case.<span class="fn">execute</span>(command)
                    <span class="kw">return</span> result
                <span class="kw">except</span> EntityNotFoundError <span class="kw">as</span> e:
                    <span class="kw">raise</span> <span class="fn">HTTPException</span>(status_code=<span class="nu">404</span>, detail=<span class="fn">str</span>(e))
        
            <span class="kw">return</span> app
        
        
        <span class="cm"># ─── 🔴 RED: まずテストを書く ───</span>
        
        <span class="kw">class</span> TestCreateOrderEndpoint:
        
            <span <span class="kw">class</span>="fn">@pytest.fixture</span>
            <span class="kw">def</span> <span class="fn">mock_use_case</span>(<span class="kw">self</span>):
                mock = <span class="fn">MagicMock</span>()
                mock.execute.return_value = {
                    <span class="st">"order_id"</span>: <span class="st">"order_abc123"</span>,
                    <span class="st">"status"</span>: <span class="st">"confirmed"</span>,
                    <span class="st">"total_amount"</span>: <span class="nu">2000</span>,
                    <span class="st">"currency"</span>: <span class="st">"JPY"</span>,
                }
                <span class="kw">return</span> mock
        
            <span <span class="kw">class</span>="fn">@pytest.fixture</span>
            <span class="kw">def</span> <span class="fn">client</span>(<span class="kw">self</span>, mock_use_case):
                app = <span class="fn">create_app</span>(place_order_use_case=mock_use_case)
                <span class="kw">return</span> <span class="fn">TestClient</span>(app), mock_use_case
        
            <span class="kw">def</span> test_有効なリクエストで<span class="nu">201</span>が返る(<span class="kw">self</span>, client):
                test_client, _ = client
                response = test_client.<span class="fn">post</span>(<span class="st">"/v1/orders"</span>, json={
                    <span class="st">"customer_id"</span>: <span class="st">"cust_123"</span>,
                    <span class="st">"items"</span>: [{<span class="st">"product_id"</span>: <span class="st">"prod_001"</span>, <span class="st">"quantity"</span>: <span class="nu">2</span>}]
                })
                <span class="kw">assert</span> response.status_code == <span class="nu">201</span>
        
            <span class="kw">def</span> test_customer_idが空のとき<span class="nu">422</span>が返る(<span class="kw">self</span>, client):
                test_client, _ = client
                response = test_client.<span class="fn">post</span>(<span class="st">"/v1/orders"</span>, json={
                    <span class="st">"customer_id"</span>: <span class="st">""</span>,
                    <span class="st">"items"</span>: [{<span class="st">"product_id"</span>: <span class="st">"prod_001"</span>, <span class="st">"quantity"</span>: <span class="nu">1</span>}]
                })
                <span class="kw">assert</span> response.status_code == <span class="nu">422</span>
        
            <span class="kw">def</span> test_itemsが空リストのとき<span class="nu">422</span>が返る(<span class="kw">self</span>, client):
                test_client, _ = client
                response = test_client.<span class="fn">post</span>(<span class="st">"/v1/orders"</span>, json={
                    <span class="st">"customer_id"</span>: <span class="st">"cust_123"</span>,
                    <span class="st">"items"</span>: []
                })
                <span class="kw">assert</span> response.status_code == <span class="nu">422</span>
        
            <span class="kw">def</span> test_存在しない顧客のとき<span class="nu">404</span>が返る(<span class="kw">self</span>, client):
                test_client, mock_uc = client
                mock_uc.execute.side_effect = <span class="fn">EntityNotFoundError</span>(<span class="st">"顧客が見つかりません"</span>)
                response = test_client.<span class="fn">post</span>(<span class="st">"/v1/orders"</span>, json={
                    <span class="st">"customer_id"</span>: <span class="st">"unknown_customer"</span>,
                    <span class="st">"items"</span>: [{<span class="st">"product_id"</span>: <span class="st">"prod_001"</span>, <span class="st">"quantity"</span>: <span class="nu">1</span>}]
                })
                <span class="kw">assert</span> response.status_code == <span class="nu">404</span>`,
            }}
          />
        </section>

        <hr className="divider" />

        {/* === S10: DB層 === */}
        <section className="section" id="s10">
          <div className="section-header">
            <div className="section-number">10</div>
            <h2>TDDの実装例：データベース層編</h2>
          </div>

          <p>
            リポジトリパターンを使い、ユニットテストではインメモリ実装、統合テストでは実際のDBを使う二段構えの戦略を紹介します。
          </p>

          <h3 style={{ margin: "28px 0 16px" }}>10.1 リポジトリのTDD戦略</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph LR
            INT["インターフェース<br>OrderRepository（抽象）"]
            IM["InMemoryOrderRepository<br>テスト用・超高速"]
            SA["SQLAlchemyOrderRepository<br>本番用・実際のDB"]
        
            INT --> IM
            INT --> SA
        
            UT["ユニットテスト"] -->|使用| IM
            IT["統合テスト"] -->|使用| SA
        
            style INT fill:#2a2638,color:#afa9ec,stroke:#534ab7
            style IM fill:#152b15,color:#c0dd97,stroke:#3b6d11
            style SA fill:#0e1f38,color:#b5d4f4,stroke:#185fa5
            style UT fill:#152b15,color:#c0dd97,stroke:#3b6d11
            style IT fill:#3a2a0a,color:#fac775,stroke:#854f0b`}
            />
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>10.2 InMemoryRepository の実装例</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod
        <span class="kw">from</span> typing <span class="kw">import</span> Optional
        <span class="kw">from</span> copy <span class="kw">import</span> deepcopy
        <span class="kw">import</span> pytest
        
        
        <span class="kw">class</span> <span class="fn">OrderRepository</span>(ABC):
            <span <span class="kw">class</span>="fn">@abstractmethod</span>
            <span class="kw">def</span> <span class="fn">save</span>(<span class="kw">self</span>, order: dict) -&gt; <span class="kw">None</span>: ...
        
            <span <span class="kw">class</span>="fn">@abstractmethod</span>
            <span class="kw">def</span> <span class="fn">find_by_id</span>(<span class="kw">self</span>, order_id: str) -&gt; Optional[dict]: ...
        
            <span <span class="kw">class</span>="fn">@abstractmethod</span>
            <span class="kw">def</span> <span class="fn">find_by_customer_id</span>(<span class="kw">self</span>, customer_id: str) -&gt; list[dict]: ...
        
        
        <span class="kw">class</span> <span class="fn">InMemoryOrderRepository</span>(OrderRepository):
            <span class="st">"""テスト専用のインメモリリポジトリ実装"""</span>
        
            <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>):
                <span class="kw">self</span>._store: dict[str, dict] = {}
        
            <span class="kw">def</span> <span class="fn">save</span>(<span class="kw">self</span>, order: dict) -&gt; <span class="kw">None</span>:
                <span class="kw">self</span>._store[order[<span class="st">"id"</span>]] = <span class="fn">deepcopy</span>(order)
        
            <span class="kw">def</span> <span class="fn">find_by_id</span>(<span class="kw">self</span>, order_id: str) -&gt; Optional[dict]:
                record = <span class="kw">self</span>._store.<span class="fn">get</span>(order_id)
                <span class="kw">return</span> <span class="fn">deepcopy</span>(record) <span class="kw">if</span> record <span class="kw">else</span> <span class="kw">None</span>
        
            <span class="kw">def</span> <span class="fn">find_by_customer_id</span>(<span class="kw">self</span>, customer_id: str) -&gt; list[dict]:
                <span class="kw">return</span> [<span class="fn">deepcopy</span>(o) <span class="kw">for</span> o <span class="kw">in</span> <span class="kw">self</span>._store.<span class="fn">values</span>()
                        <span class="kw">if</span> o.<span class="fn">get</span>(<span class="st">"customer_id"</span>) == customer_id]
        
        
        <span class="kw">class</span> TestOrderRepository:
            <span class="st">"""インターフェースの契約テスト"""</span>
        
            <span <span class="kw">class</span>="fn">@pytest.fixture</span>
            <span class="kw">def</span> <span class="fn">repo</span>(<span class="kw">self</span>) -&gt; OrderRepository:
                <span class="kw">return</span> <span class="fn">InMemoryOrderRepository</span>()
        
            <span <span class="kw">class</span>="fn">@pytest.fixture</span>
            <span class="kw">def</span> <span class="fn">sample_order</span>(<span class="kw">self</span>) -&gt; dict:
                <span class="kw">return</span> {<span class="st">"id"</span>: <span class="st">"order_001"</span>, <span class="st">"customer_id"</span>: <span class="st">"cust_001"</span>, <span class="st">"status"</span>: <span class="st">"pending"</span>}
        
            <span class="kw">def</span> test_注文を保存して取得できる(<span class="kw">self</span>, repo, sample_order):
                repo.<span class="fn">save</span>(sample_order)
                result = repo.<span class="fn">find_by_id</span>(sample_order[<span class="st">"id"</span>])
                <span class="kw">assert</span> result is not <span class="kw">None</span>
                <span class="kw">assert</span> result[<span class="st">"id"</span>] == sample_order[<span class="st">"id"</span>]
        
            <span class="kw">def</span> test_存在しないIDで検索すると<span class="kw">None</span>が返る(<span class="kw">self</span>, repo):
                result = repo.<span class="fn">find_by_id</span>(<span class="st">"non_existent_id"</span>)
                <span class="kw">assert</span> result is <span class="kw">None</span>
        
            <span class="kw">def</span> test_顧客IDで注文一覧を取得できる(<span class="kw">self</span>, repo):
                repo.<span class="fn">save</span>({<span class="st">"id"</span>: <span class="st">"order_001"</span>, <span class="st">"customer_id"</span>: <span class="st">"cust_001"</span>, <span class="st">"status"</span>: <span class="st">"pending"</span>})
                repo.<span class="fn">save</span>({<span class="st">"id"</span>: <span class="st">"order_002"</span>, <span class="st">"customer_id"</span>: <span class="st">"cust_001"</span>, <span class="st">"status"</span>: <span class="st">"confirmed"</span>})
                repo.<span class="fn">save</span>({<span class="st">"id"</span>: <span class="st">"order_003"</span>, <span class="st">"customer_id"</span>: <span class="st">"cust_002"</span>, <span class="st">"status"</span>: <span class="st">"pending"</span>})
                results = repo.<span class="fn">find_by_customer_id</span>(<span class="st">"cust_001"</span>)
                <span class="kw">assert</span> <span class="fn">len</span>(results) == <span class="nu">2</span>
        
            <span class="kw">def</span> test_保存データを変更しても元データは変わらない(<span class="kw">self</span>, repo, sample_order):
                <span class="st">"""deepcopy による変更防止のテスト"""</span>
                repo.<span class="fn">save</span>(sample_order)
                sample_order[<span class="st">"status"</span>] = <span class="st">"cancelled"</span>
                result = repo.<span class="fn">find_by_id</span>(sample_order[<span class="st">"id"</span>])
                <span class="kw">assert</span> result[<span class="st">"status"</span>] == <span class="st">"pending"</span>`,
            }}
          />

          <div className="callout callout-tip">
            <IconBulb size={16} aria-hidden="true" />
            <div className="callout-body">
              <strong>deepcopy の重要性</strong>
              <p>
                InMemoryRepository では必ず <code>deepcopy</code>{" "}
                を使いましょう。参照を共有してしまうと、テスト外でデータが変更されてしまい、テストが不安定になります。
              </p>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* === S11: BDD === */}
        <section className="section" id="s11">
          <div className="section-header">
            <div className="section-number">11</div>
            <h2>BDD（振る舞い駆動開発）との連携</h2>
          </div>

          <p>
            BDD は TDD の外側のループです。ビジネス視点のシナリオを Gherkin
            記法で書き、開発者と非技術者が共有できる「生きた仕様書」を作ります。
          </p>

          <h3 style={{ margin: "28px 0 16px" }}>11.1 TDD と BDD の関係</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TB
            BDD["BDD（振る舞い駆動開発）<br>ビジネス視点のシナリオを先に書く<br>Gherkin記法（Given/When/Then）<br>ステークホルダーと合意形成"]
        
            TDD["TDD（テスト駆動開発）<br>開発者視点の実装テストを先に書く<br>Pythonコードでテストを書く<br>Red-Green-Refactorサイクル"]
        
            BDD -->|"外側のループ（受け入れテスト）"| TDD
            TDD -->|"内側のループ（ユニットテスト）"| TDD
        
            style BDD fill:#2a2638,color:#afa9ec,stroke:#534ab7
            style TDD fill:#152b15,color:#c0dd97,stroke:#3b6d11`}
            />
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>11.2 Gherkin 記法の例</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="cm"># ─── BDDシナリオ（Gherkin記法）───</span>
        
        <span class="kw">Feature</span>: ショッピングカートの操作
        
          <span class="kw">Scenario</span>: 顧客が商品をカートに追加する
            <span class="kw">Given</span> 顧客がカートを持っている
            <span class="kw">When</span> 顧客が「Tシャツ（<span class="nu">1000</span>円）」を<span class="nu">2</span>枚カートに追加する
            <span class="kw">Then</span> カートの合計金額は<span class="nu">2000</span>円になる
        
          <span class="kw">Scenario</span>: 在庫がない商品はカートに追加できない
            <span class="kw">Given</span> 「ジーンズ」の在庫が<span class="nu">0</span>件である
            <span class="kw">When</span> 顧客が「ジーンズ」をカートに追加しようとする
            <span class="kw">Then</span> エラーメッセージ「在庫がありません」が表示される`,
            }}
          />

          <div className="two-col" style={{ marginTop: 20 }}>
            <div className="card">
              <h3 style={{ marginBottom: 8 }}>BDD の主なメリット</h3>
              <ul style={{ listStyle: "none", fontSize: "1rem", color: "var(--text-secondary)" }}>
                <li style={{ padding: "5px 0", borderBottom: "0.5px solid var(--border-subtle)" }}>
                  非技術者と開発者が同じ仕様を共有できる
                </li>
                <li style={{ padding: "5px 0", borderBottom: "0.5px solid var(--border-subtle)" }}>
                  受け入れテストとして機能する
                </li>
                <li style={{ padding: "5px 0" }}>コードの意図がビジネス言語で表現される</li>
              </ul>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: 8 }}>主なBDDツール</h3>
              <ul style={{ listStyle: "none", fontSize: "1rem", color: "var(--text-secondary)" }}>
                <li style={{ padding: "5px 0", borderBottom: "0.5px solid var(--border-subtle)" }}>
                  <code>pytest-bdd</code>：Python向け
                </li>
                <li style={{ padding: "5px 0", borderBottom: "0.5px solid var(--border-subtle)" }}>
                  <code>Cucumber</code>：Java/Ruby等
                </li>
                <li style={{ padding: "5px 0" }}>
                  <code>Behave</code>：Python 向け BDD フレームワーク
                </li>
              </ul>
            </div>
          </div>

          <div className="sources-section">
            <h4>
              <IconLink size={16} aria-hidden="true" style={{ fontSize: "1rem", marginRight: 6 }} />
              参照ソース
            </h4>
            <Ext href="https://www.agilealliance.org/glossary/bdd/" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              Agile Alliance — BDD
            </Ext>
            <Ext href="https://cucumber.io/docs/bdd/" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              Cucumber 公式ドキュメント
            </Ext>
            <Ext href="https://martinfowler.com/bliki/GivenWhenThen.html" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              Martin Fowler — GivenWhenThen
            </Ext>
          </div>
        </section>

        <hr className="divider" />

        {/* === S12: カバレッジ === */}
        <section className="section" id="s12">
          <div className="section-header">
            <div className="section-number">12</div>
            <h2>テストカバレッジの考え方</h2>
          </div>

          <p>
            カバレッジは高ければ良いわけではありません。目的・用途を正しく理解することが重要です。
          </p>

          <h3 style={{ margin: "28px 0 16px" }}>12.1 カバレッジの種類</h3>
          <div className="best-practice-table">
            <table>
              <thead>
                <tr>
                  <th>種類</th>
                  <th>計測内容</th>
                  <th>目安</th>
                  <th>備考</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ライン（行）カバレッジ</td>
                  <td>各行が実行されたか</td>
                  <td>80%以上</td>
                  <td>最も基本的な指標</td>
                </tr>
                <tr>
                  <td>ブランチ（分岐）カバレッジ</td>
                  <td>if/else の両方が実行されたか</td>
                  <td>70%以上</td>
                  <td>条件分岐のカバー率</td>
                </tr>
                <tr>
                  <td>ファンクションカバレッジ</td>
                  <td>各関数が呼ばれたか</td>
                  <td>90%以上</td>
                  <td>未使用コードの検出</td>
                </tr>
                <tr>
                  <td>ミューテーションカバレッジ</td>
                  <td>コードを変えてもテストが検知するか</td>
                  <td>60%以上</td>
                  <td>
                    <span style={{ color: "var(--purple-400)" }}>テストの品質を測る最高指標</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>12.2 正しい使い方 vs 誤った使い方</h3>
          <div className="two-col">
            <div className="col-card col-good">
              <div className="col-header">
                <IconCheck size={16} aria-hidden="true" />
                正しい使い方
              </div>
              <ul>
                <li>テストの穴を発見するツールとして使う</li>
                <li>チームのベースラインとして設定（例：80%以上維持）</li>
                <li>コアビジネスロジックは90%以上を目指す</li>
                <li>段階的に引き上げる（60% → 70% → 80%）</li>
              </ul>
            </div>
            <div className="col-card col-bad">
              <div className="col-header">
                <IconX size={16} aria-hidden="true" />
                誤った使い方
              </div>
              <ul>
                <li>カバレッジ100%を絶対目標にする</li>
                <li>カバレッジ率＝品質と誤解する</li>
                <li>インフラ層・設定ファイルも同じ基準を適用</li>
                <li>アサーションなしのテストでカバレッジを上げる</li>
              </ul>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>12.3 pytest-cov での設定例</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="cm"># pyproject.toml</span>
        
        [tool.pytest.ini_options]
        addopts = <span class="st">"--cov=src --cov-report=html --cov-report=term-missing --cov-fail-under=80"</span>
        testpaths = [<span class="st">"tests"</span>]
        
        [tool.coverage.<span class="kw">run</span>]
        source = [<span class="st">"src"</span>]
        omit = [
            <span class="st">"*/migrations/*"</span>,
            <span class="st">"*/tests/*"</span>,
            <span class="st">"*/__init__.py"</span>,
            <span class="st">"*/settings.py"</span>,
            <span class="st">"*/config.py"</span>,
        ]
        
        [tool.coverage.report]
        exclude_lines = [
            <span class="st">"pragma: no cover"</span>,
            <span class="st">"def __repr__"</span>,
            <span class="st">"if TYPE_CHECKING:"</span>,
            <span class="st">"raise NotImplementedError"</span>,
            <span class="st">"@abstractmethod"</span>,
        ]
        show_missing = true`,
            }}
          />

          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="cm"># 実行コマンド例</span>
        
        <span class="cm"># カバレッジレポートを生成（HTML + ターミナル）</span>
        pytest --cov=src --cov-report=html --cov-report=term-missing
        
        <span class="cm"># カバレッジが80%未満の場合にCIを失敗させる</span>
        pytest --cov=src --cov-fail-under=<span class="nu">80</span>
        
        <span class="cm"># ブランチカバレッジも計測する</span>
        pytest --cov=src --cov-branch --cov-report=html`,
            }}
          />

          <div className="sources-section">
            <h4>
              <IconLink size={16} aria-hidden="true" style={{ fontSize: "1rem", marginRight: 6 }} />
              参照ソース
            </h4>
            <Ext href="https://pytest-cov.readthedocs.io/" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              pytest-cov 公式ドキュメント
            </Ext>
            <Ext href="https://mutmut.readthedocs.io/" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              mutmut — ミューテーションテスト
            </Ext>
          </div>
        </section>

        <hr className="divider" />

        {/* === S13: CI/CD === */}
        <section className="section" id="s13">
          <div className="section-header">
            <div className="section-number">13</div>
            <h2>CI/CDパイプラインとTDD</h2>
          </div>

          <p>TDDとCI/CDを統合することで、コードが常に動く状態を自動的に保証できます。</p>

          <h3 style={{ margin: "28px 0 16px" }}>13.1 TDDとCI/CDの統合フロー</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
            subgraph LOCAL["💻 ローカル開発（常時実行）"]
                L1["コードを変更"] --> L2["pytest でテスト実行"] --> L3["全テスト通過確認"] --> L4["コミット"]
            end
        
            subgraph CI["🔄 CI パイプライン（push時に自動実行）"]
                C1["コードチェックアウト"] --> C2["依存関係インストール"] --> C3["Linting（ruff / flake8）"] --> C4["型チェック（mypy）"] --> C5["ユニットテスト（並列実行）"] --> C6["統合テスト（TestContainers）"] --> C7["カバレッジチェック（80%以上）"] --> C8["セキュリティスキャン"]
            end
        
            subgraph CD["🚀 CD パイプライン（main merge時）"]
                D1["Dockerイメージビルド"] --> D2["ステージング環境デプロイ"] --> D3["E2Eテスト実行"] --> D4["本番環境デプロイ"]
            end
        
            LOCAL --> CI --> CD
        
            style LOCAL fill:#152b15,stroke:#3b6d11,color:#c0dd97
            style CI fill:#0e1f38,stroke:#185fa5,color:#b5d4f4
            style CD fill:#3a2a0a,stroke:#854f0b,color:#fac775`}
            />
            <p className="mermaid-caption">ローカル開発 → CI → CD の統合フロー</p>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>13.2 GitHub Actions 設定例</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="cm"># .github/workflows/test.yml</span>
        
        <span class="kw">name</span>: TDD Test Suite
        
        <span class="kw">on</span>:
          <span class="kw">push</span>:
            branches: [main, develop]
          <span class="kw">pull_request</span>:
        
        <span class="kw">jobs</span>:
          unit-tests:
            <span class="kw">name</span>: Unit Tests
            <span class="kw">runs-on</span>: ubuntu-latest
            <span class="kw">strategy</span>:
              <span class="kw">matrix</span>:
                python-version: [<span class="st">"3.10"</span>, <span class="st">"3.11"</span>, <span class="st">"3.12"</span>]
        
            <span class="kw">steps</span>:
              - <span class="kw">uses</span>: actions/checkout<span <span class="kw">class</span>="fn">@v4</span>
        
              - <span class="kw">name</span>: Set up Python \${{ <span class="kw">matrix</span>.python-version }}
                <span class="kw">uses</span>: actions/setup-python<span <span class="kw">class</span>="fn">@v5</span>
                <span class="kw">with</span>:
                  python-version: \${{ <span class="kw">matrix</span>.python-version }}
                  cache: pip
        
              - <span class="kw">name</span>: Install dependencies
                <span class="kw">run</span>: pip install -r requirements-dev.txt
        
              - <span class="kw">name</span>: Run linting and type check
                <span class="kw">run</span>: |
                  ruff check .
                  mypy src/
        
              - <span class="kw">name</span>: Run unit tests <span class="kw">with</span> coverage
                <span class="kw">run</span>: |
                  pytest tests/unit/ \
                    --cov=src \
                    --cov-branch \
                    --cov-report=xml \
                    --cov-fail-under=<span class="nu">80</span> \
                    -v --tb=short -n auto
        
              - <span class="kw">name</span>: Upload coverage to Codecov
                <span class="kw">uses</span>: codecov/codecov-action<span <span class="kw">class</span>="fn">@v4</span>
                <span class="kw">with</span>:
                  file: coverage.xml
        
          integration-tests:
            <span class="kw">name</span>: Integration Tests
            <span class="kw">runs-on</span>: ubuntu-latest
            <span class="kw">needs</span>: unit-tests
        
            <span class="kw">services</span>:
              postgres:
                image: postgres:<span class="nu">16</span>
                env:
                  POSTGRES_DB: test_db
                  POSTGRES_USER: test_user
                  POSTGRES_PASSWORD: test_pass
                options: &gt;-
                  --health-cmd pg_isready
                  --health-interval 10s
        
            <span class="kw">steps</span>:
              - <span class="kw">uses</span>: actions/checkout<span <span class="kw">class</span>="fn">@v4</span>
              - <span class="kw">name</span>: Run integration tests
                env:
                  DATABASE_URL: postgresql://test_user:test_pass<span <span class="kw">class</span>="fn">@localhost</span>/test_db
                <span class="kw">run</span>: |
                  pytest tests/integration/ -v --tb=short --timeout=<span class="nu">60</span>`,
            }}
          />

          <div className="sources-section">
            <h4>
              <IconLink size={16} aria-hidden="true" style={{ fontSize: "1rem", marginRight: 6 }} />
              参照ソース
            </h4>
            <Ext href="https://docs.github.com/en/actions" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              GitHub Actions 公式ドキュメント
            </Ext>
            <Ext
              href="https://martinfowler.com/articles/continuousIntegration.html"
              className="source-link"
            >
              <IconExternalLink size={16} aria-hidden="true" />
              Martin Fowler — Continuous Integration
            </Ext>
            <Ext href="https://codecov.io/" className="source-link">
              <IconExternalLink size={16} aria-hidden="true" />
              Codecov — カバレッジレポート
            </Ext>
          </div>
        </section>

        <hr className="divider" />

        {/* === S14: 障壁 === */}
        <section className="section" id="s14">
          <div className="section-header">
            <div className="section-number">14</div>
            <h2>TDDを阻む壁とその解決策</h2>
          </div>

          <h3 style={{ margin: "0 0 20px" }}>14.1 よくある障壁と解決策</h3>

          <div className="antipattern-card">
            <h4>
              <IconClock size={16} aria-hidden="true" style={{ marginRight: 6 }} />
              障壁1：最初は遅く感じる
            </h4>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              「テストを書く時間がもったいない」「コードを直接書いた方が速い」という感覚に陥りがちです。
            </p>
            <div className="antipattern-fix">
              <IconBulb size={16} aria-hidden="true" />
              <span>
                短期的なコストと長期的な利益のトレードオフを意識する。バグ修正コストが激減し、慣れると開発速度が逆転します。最初の2週間が正念場です。
              </span>
            </div>
          </div>

          <div className="antipattern-card">
            <h4>
              <IconHelp size={16} aria-hidden="true" style={{ marginRight: 6 }} />
              障壁2：何をテストすればいいかわからない
            </h4>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              テストケースの選定が難しく、どこから始めればいいかわからなくなります。
            </p>
            <div className="antipattern-fix">
              <IconBulb size={16} aria-hidden="true" />
              <span>
                まず1つのハッピーパスだけ書く。次にエッジケース、最後に異常系の順で積み上げます（セクション3参照）。
              </span>
            </div>
          </div>

          <div className="antipattern-card">
            <h4>
              <IconPlug size={16} aria-hidden="true" style={{ marginRight: 6 }} />
              障壁3：外部依存のテストが難しい
            </h4>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              DBやAPIがないとテストできないと思い込み、テストが書けなくなります。
            </p>
            <div className="antipattern-fix">
              <IconBulb size={16} aria-hidden="true" />
              <span>
                依存性注入でモック化する。InMemoryRepository
                を作り、インターフェースに依存する設計にします（セクション10参照）。
              </span>
            </div>
          </div>

          <div className="antipattern-card">
            <h4>
              <IconHelp size={16} aria-hidden="true" style={{ marginRight: 6 }} />
              障壁4：レガシーコードにはテストが書けない
            </h4>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              既存の密結合コードにはテストが書きにくく、どこから手を付けていいかわかりません。
            </p>
            <div className="antipattern-fix">
              <IconBulb size={16} aria-hidden="true" />
              <span>
                Characterization
                Test（特性描写テスト）から始める。まず現在の動作を記録し、少しずつリファクタリングします（セクション15参照）。
              </span>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>14.2 テストしやすい設計のポイント</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph LR
            subgraph HARD["テストしにくい設計"]
                H1["グローバル変数・シングルトン<br>状態が共有されてテスト間干渉"]
                H2["直接インスタンス化<br>new DBRepository() 内部で生成"]
                H3["時刻・乱数に直接依存<br>datetime.now() を直接呼び出す"]
                H4["巨大なメソッド<br>1メソッドが100行を超える"]
            end
        
            subgraph EASY["テストしやすい設計"]
                E1["依存性注入（DI）<br>依存を外から注入する"]
                E2["インターフェースへの依存<br>具体クラスに依存しない"]
                E3["時刻・乱数を注入<br>clock 引数で受け取る"]
                E4["小さなメソッドへの分割<br>単一責任原則に従う"]
            end
        
            H1 --> E1
            H2 --> E2
            H3 --> E3
            H4 --> E4
        
            style HARD fill:#3d1515,stroke:#a32d2d,color:#f09595
            style EASY fill:#152b15,stroke:#3b6d11,color:#c0dd97`}
            />
          </div>
        </section>

        <hr className="divider" />

        {/* === S15: レガシーコード === */}
        <section className="section" id="s15">
          <div className="section-header">
            <div className="section-number">15</div>
            <h2>レガシーコードへのTDD導入</h2>
          </div>

          <p>
            テストのない既存コードへの TDD
            導入は段階的に行います。一気にやろうとせず、安全網を少しずつ広げることが重要です。
          </p>

          <h3 style={{ margin: "28px 0 16px" }}>15.1 レガシーコードへのアプローチ</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
            LEGACY["レガシーコード<br>テストがない既存コード"]
            STEP1["Step 1: Characterization Test<br>現在の動作をそのまま記録する<br>正しいかどうかは問わない<br>まず安全網を作る"]
            STEP2["Step 2: Seam（縫い目）の発見<br>テスト可能な分離点を見つける<br>・コンストラクタインジェクション<br>・メソッドパラメータ化"]
            STEP3["Step 3: 最小限のリファクタリング<br>動作を変えずに構造を改善<br>・長いメソッドの分割<br>・依存性の外部化"]
            STEP4["Step 4: 新しい機能はTDDで追加<br>修正部分は必ずTDDで書く<br>Boy Scout Rule（来た時より綺麗に）"]
        
            LEGACY --> STEP1 --> STEP2 --> STEP3 --> STEP4
        
            style LEGACY fill:#3d1515,color:#f09595,stroke:#a32d2d
            style STEP1 fill:#3a2a0a,color:#fac775,stroke:#854f0b
            style STEP2 fill:#2a1a10,color:#f0997b,stroke:#993c1d
            style STEP3 fill:#0e1f38,color:#b5d4f4,stroke:#185fa5
            style STEP4 fill:#152b15,color:#c0dd97,stroke:#3b6d11`}
            />
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>15.2 Characterization Test の例</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">class</span> LegacyOrderCalculator:
            <span class="st">"""テストがない複雑なレガシーコード"""</span>
            <span class="kw">def</span> <span class="fn">calculate_final_price</span>(<span class="kw">self</span>, base_price, quantity, customer_type, is_sale):
                price = base_price * quantity
                <span class="kw">if</span> customer_type == <span class="st">"premium"</span>:
                    price = price * <span class="nu">0.9</span>
                <span class="kw">elif</span> customer_type == <span class="st">"vip"</span>:
                    price = price * <span class="nu">0.8</span>
                <span class="kw">if</span> is_sale:
                    price = price * <span class="nu">0.95</span>
                <span class="kw">if</span> price &gt; <span class="nu">10000</span>:
                    price = price - <span class="nu">500</span>
                <span class="kw">return</span> <span class="fn">round</span>(price)
        
        
        <span class="kw">class</span> TestLegacyOrderCalculatorCharacterization:
            <span class="st">""</span>"
            Step <span class="nu">1</span>: Characterization Test
            既存の動作を変えずに記録するテスト。
            まず実際に実行して結果を確認し、その値を Expected にする。
            正しいかどうかは後で判断する。
            <span class="st">""</span>"
        
            <span <span class="kw">class</span>="fn">@pytest.fixture</span>
            <span class="kw">def</span> <span class="fn">calc</span>(<span class="kw">self</span>):
                <span class="kw">return</span> <span class="fn">LegacyOrderCalculator</span>()
        
            <span class="kw">def</span> test_通常顧客セールなし(<span class="kw">self</span>, calc):
        <span class="cm">        # 実際に実行して確認した値: 1000 * 2 = 2000</span>
                result = calc.<span class="fn">calculate_final_price</span>(
                    base_price=<span class="nu">1000</span>, quantity=<span class="nu">2</span>,
                    customer_type=<span class="st">"normal"</span>, is_sale=<span class="kw">False</span>
                )
                <span class="kw">assert</span> result == <span class="nu">2000</span>
        
            <span class="kw">def</span> test_プレミアム顧客セールなし(<span class="kw">self</span>, calc):
        <span class="cm">        # 1000 * 2 * 0.9 = 1800（10%OFF）</span>
                result = calc.<span class="fn">calculate_final_price</span>(
                    base_price=<span class="nu">1000</span>, quantity=<span class="nu">2</span>,
                    customer_type=<span class="st">"premium"</span>, is_sale=<span class="kw">False</span>
                )
                <span class="kw">assert</span> result == <span class="nu">1800</span>
        
            <span class="kw">def</span> test_VIP顧客セールあり<span class="nu">10000</span>円超(<span class="kw">self</span>, calc):
        <span class="cm">        # 1000 * 15 * 0.8 * 0.95 = 11400 → 11400 - 500 = 10900</span>
                result = calc.<span class="fn">calculate_final_price</span>(
                    base_price=<span class="nu">1000</span>, quantity=<span class="nu">15</span>,
                    customer_type=<span class="st">"vip"</span>, is_sale=<span class="kw">True</span>
                )
                <span class="kw">assert</span> result == <span class="nu">10900</span>
        <span class="cm">    # これで動作が記録できた → 安全にリファクタリングできる</span>`,
            }}
          />

          <div className="sources-section">
            <h4>
              <IconLink size={16} aria-hidden="true" style={{ fontSize: "1rem", marginRight: 6 }} />
              参照ソース
            </h4>
            <Ext
              href="https://michaelfeathers.silvrback.com/characterization-testing"
              className="source-link"
            >
              <IconExternalLink size={16} aria-hidden="true" />
              Michael Feathers — Characterization Testing
            </Ext>
          </div>
        </section>

        <hr className="divider" />

        {/* === S16: ベストプラクティス === */}
        <section className="section" id="s16">
          <div className="section-header">
            <div className="section-number">16</div>
            <h2>TDDのベストプラクティス総まとめ</h2>
          </div>

          <div className="best-practice-table">
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
                  <td style={{ color: "var(--red-200)" }}>テストの書き方</td>
                  <td>まず失敗を確認してから GREEN にする</td>
                  <td>誤って通過するテストを防ぐ</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--red-200)" }}>テストの書き方</td>
                  <td>1テスト1アサーション（関連は複数可）</td>
                  <td>失敗時に原因が特定しやすい</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--red-200)" }}>テストの書き方</td>
                  <td>テスト名は仕様書として読める日本語に</td>
                  <td>コードの意図を伝えるドキュメントになる</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--blue-200)" }}>設計</td>
                  <td>依存性注入でモック可能に設計する</td>
                  <td>テストから良い設計が自然に生まれる</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--blue-200)" }}>設計</td>
                  <td>時刻・乱数を外部注入する</td>
                  <td>テストの再現性を確保する</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--teal-200)" }}>サイクル</td>
                  <td>サイクルを小さく保つ（5〜15分）</td>
                  <td>こまめにコミット・フィードバックが得られる</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--teal-200)" }}>リファクタリング</td>
                  <td>GREEN 後に必ずリファクタリングする</td>
                  <td>技術的負債を蓄積させない</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--amber-200)" }}>カバレッジ</td>
                  <td>ドメイン層は 90% 以上を目指す</td>
                  <td>ビジネスロジックを徹底的に保護する</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--purple-400)" }}>CI</td>
                  <td>push のたびに全テスト実行</td>
                  <td>常に動くコードを維持する</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>16.1 TDD 習熟度モデル</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph LR
            LV0["Level 0<br>テストなし<br>手動テスト"]
            LV1["Level 1<br>テスト後付け<br>実装後に追加"]
            LV2["Level 2<br>Red-Green 意識<br>先にテストを書く"]
            LV3["Level 3<br>フル RGR サイクル<br>設計を駆動"]
            LV4["Level 4<br>Inside-Out TDD<br>疎結合設計"]
            LV5["Level 5<br>TDD as Culture<br>チーム全体"]
        
            LV0 --> LV1 --> LV2 --> LV3 --> LV4 --> LV5
        
            style LV0 fill:#3d1515,color:#f09595,stroke:#a32d2d
            style LV1 fill:#3a2a0a,color:#fac775,stroke:#854f0b
            style LV2 fill:#2a1a10,color:#f0997b,stroke:#993c1d
            style LV3 fill:#152b15,color:#c0dd97,stroke:#3b6d11
            style LV4 fill:#0e1f38,color:#b5d4f4,stroke:#185fa5
            style LV5 fill:#2a2638,color:#afa9ec,stroke:#534ab7`}
            />
            <p className="mermaid-caption">TDD 習熟度モデル（左から右へ段階的に成長する）</p>
          </div>
        </section>

        <hr className="divider" />

        {/* === S17: アンチパターン === */}
        <section className="section" id="s17">
          <div className="section-header">
            <div className="section-number">17</div>
            <h2>TDDのアンチパターン</h2>
          </div>

          <p>TDDを「やっているつもり」でも陥りがちな失敗パターンを紹介します。</p>

          <div className="antipattern-card">
            <h4>
              <IconAlertCircle size={16} aria-hidden="true" style={{ marginRight: 6 }} />
              アンチパターン1：テストを後から書く（Test After）
            </h4>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              実装してからテストを追加する。テストが設計を改善しないため、高カバレッジでも品質が低い。
            </p>
            <div className="antipattern-fix">
              <IconCheck size={16} aria-hidden="true" />
              <span>必ず先にテストを書く。実装前にAPIを設計する習慣をつける。</span>
            </div>
          </div>

          <div className="antipattern-card">
            <h4>
              <IconAlertCircle size={16} aria-hidden="true" style={{ marginRight: 6 }} />
              アンチパターン2：テストが壊れやすい（Fragile Tests）
            </h4>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              実装の詳細（内部メソッド・プライベート変数）に依存しすぎたテスト。実装変更のたびにテストが壊れる。
            </p>
            <div className="antipattern-fix">
              <IconCheck size={16} aria-hidden="true" />
              <span>
                振る舞い（ブラックボックス）をテストする。インターフェースと出力だけをアサートする。
              </span>
            </div>
          </div>

          <div className="antipattern-card">
            <h4>
              <IconAlertCircle size={16} aria-hidden="true" style={{ marginRight: 6 }} />
              アンチパターン3：アサーションなしのテスト
            </h4>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              <code>assert</code>{" "}
              が1つもないテスト。例外が起きなければOKとするテスト。カバレッジが上がるが何も保証しない。
            </p>
            <div className="antipattern-fix">
              <IconCheck size={16} aria-hidden="true" />
              <span>
                必ず期待値を明示的にアサートする。<code>assert</code>{" "}
                文なしのテストはテストではない。
              </span>
            </div>
          </div>

          <div className="antipattern-card">
            <h4>
              <IconAlertCircle size={16} aria-hidden="true" style={{ marginRight: 6 }} />
              アンチパターン4：テストが遅すぎる（Slow Tests）
            </h4>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              実際のDBや外部APIを使うユニットテスト。1テストに数秒〜数十秒かかると開発中に実行しなくなる。
            </p>
            <div className="antipattern-fix">
              <IconCheck size={16} aria-hidden="true" />
              <span>
                ユニットテストは必ずモック/InMemory を使う。実DBは統合テストで別途実行する。
              </span>
            </div>
          </div>

          <div className="antipattern-card">
            <h4>
              <IconAlertCircle size={16} aria-hidden="true" style={{ marginRight: 6 }} />
              アンチパターン5：テスト間の依存（Interdependent Tests）
            </h4>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              テストの実行順序に依存している。あるテストが別のテストの副作用に依存し、単独で実行すると失敗する。
            </p>
            <div className="antipattern-fix">
              <IconCheck size={16} aria-hidden="true" />
              <span>
                各テストで独立したフィクスチャを使う。前後処理でクリーンな状態に戻す（
                <code>@pytest.fixture</code>）。
              </span>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>17.1 TDD 健全性チェックリスト</h3>
          <div className="best-practice-table">
            <table>
              <thead>
                <tr>
                  <th>チェック項目</th>
                  <th>Yes なら</th>
                  <th>No なら</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>テストはプロダクションコードより先に書かれているか？</td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>健全</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--red-200)" }}>Test-First の習慣を徹底する</span>
                  </td>
                </tr>
                <tr>
                  <td>各テストが独立して単独で実行できるか？</td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>健全</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--red-200)" }}>グローバル状態を排除する</span>
                  </td>
                </tr>
                <tr>
                  <td>ユニットテストがミリ秒で完了するか？</td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>健全</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--red-200)" }}>モック/InMemory を活用する</span>
                  </td>
                </tr>
                <tr>
                  <td>テスト名がコードの仕様書として読めるか？</td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>健全</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--red-200)" }}>テスト名を日本語で改善する</span>
                  </td>
                </tr>
                <tr>
                  <td>全テストが CI で自動実行されているか？</td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>健全</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--red-200)" }}>GitHub Actions で CI を設定する</span>
                  </td>
                </tr>
                <tr>
                  <td>ドメイン層のカバレッジが 80% 以上か？</td>
                  <td>
                    <span style={{ color: "var(--teal-200)" }}>健全</span>
                  </td>
                  <td>
                    <span style={{ color: "var(--red-200)" }}>
                      未カバーのロジックにテストを追加する
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr className="divider" />

        {/* === S18: 参考文献 === */}
        <section className="section" id="s18">
          <div className="section-header">
            <div className="section-number">18</div>
            <h2>参考文献・ソース一覧</h2>
          </div>

          <h3 style={{ margin: "0 0 16px" }}>18.1 必読書籍</h3>
          <div className="book-grid">
            <div className="book-card">
              <div className="book-icon" style={{ background: "rgba(127,119,221,0.15)" }}>
                <IconBook size={16} aria-hidden="true" style={{ color: "var(--purple-400)" }} />
              </div>
              <div className="book-info">
                <strong>Test-Driven Development: By Example</strong>
                <div className="book-author">Kent Beck（2002）</div>
                <div className="book-level">
                  <span className="level-dots">
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span></span>
                    <span></span>
                  </span>
                  TDD 原典・必読
                </div>
              </div>
            </div>
            <div className="book-card">
              <div className="book-icon" style={{ background: "rgba(29,158,117,0.15)" }}>
                <IconBook size={16} aria-hidden="true" style={{ color: "var(--teal-200)" }} />
              </div>
              <div className="book-info">
                <strong>Clean Code</strong>
                <div className="book-author">Robert C. Martin（Uncle Bob）</div>
                <div className="book-level">
                  <span className="level-dots">
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span></span>
                    <span></span>
                  </span>
                  テストしやすいコードの書き方
                </div>
              </div>
            </div>
            <div className="book-card">
              <div className="book-icon" style={{ background: "rgba(216,90,48,0.15)" }}>
                <IconBook size={16} aria-hidden="true" style={{ color: "var(--coral-200)" }} />
              </div>
              <div className="book-info">
                <strong>Working Effectively with Legacy Code</strong>
                <div className="book-author">Michael C. Feathers</div>
                <div className="book-level">
                  <span className="level-dots">
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span></span>
                  </span>
                  レガシーコードへの TDD 導入
                </div>
              </div>
            </div>
            <div className="book-card">
              <div className="book-icon" style={{ background: "rgba(55,138,221,0.15)" }}>
                <IconBook size={16} aria-hidden="true" style={{ color: "var(--blue-200)" }} />
              </div>
              <div className="book-info">
                <strong>The Art of Unit Testing（第3版）</strong>
                <div className="book-author">Roy Osherove</div>
                <div className="book-level">
                  <span className="level-dots">
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span className="filled"></span>
                    <span></span>
                    <span></span>
                  </span>
                  ユニットテストの実践ガイド
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>18.2 TDDコア概念</h3>
          <div className="card">
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://www.agilealliance.org/glossary/tdd/">
                  Agile Alliance — TDD定義
                </Ext>
                <div className="source-desc">TDD の公式定義と原則</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://martinfowler.com/bliki/TestDrivenDevelopment.html">
                  Martin Fowler — TestDrivenDevelopment
                </Ext>
                <div className="source-desc">Martin Fowler による TDD 解説</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://blog.cleancoder.com/uncle-bob/2014/12/17/TheThreeRulesOfTdd.html">
                  Uncle Bob — TDDの3つのルール
                </Ext>
                <div className="source-desc">Robert C. Martin による TDD ルールの定義</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://martinfowler.com/bliki/TestPyramid.html">
                  Martin Fowler — テストピラミッド
                </Ext>
                <div className="source-desc">ユニット・統合・E2Eテストのバランス</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://martinfowler.com/bliki/UnitTest.html">
                  Martin Fowler — Unit Test
                </Ext>
                <div className="source-desc">ユニットテストの定義と種類</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://martinfowler.com/articles/mocksArentStubs.html">
                  Martin Fowler — Mocks Aren't Stubs
                </Ext>
                <div className="source-desc">テストダブルの種類と使い分け</div>
              </div>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>18.3 BDD関連</h3>
          <div className="card">
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://www.agilealliance.org/glossary/bdd/">Agile Alliance — BDD</Ext>
                <div className="source-desc">振る舞い駆動開発の公式定義</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://cucumber.io/docs/bdd/">Cucumber 公式ドキュメント</Ext>
                <div className="source-desc">BDD ツールの主要プラットフォーム</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://martinfowler.com/bliki/GivenWhenThen.html">
                  Martin Fowler — GivenWhenThen
                </Ext>
                <div className="source-desc">Given-When-Then 記法の解説</div>
              </div>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>18.4 Pythonテストツール</h3>
          <div className="card">
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://docs.pytest.org/">pytest 公式ドキュメント</Ext>
                <div className="source-desc">Python 最標準テストフレームワーク</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://pytest-cov.readthedocs.io/">pytest-cov — カバレッジ計測</Ext>
                <div className="source-desc">pytest カバレッジプラグイン</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://pytest-mock.readthedocs.io/">pytest-mock — モック</Ext>
                <div className="source-desc">pytest 向けモックプラグイン</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://pytest-bdd.readthedocs.io/">pytest-bdd — BDD統合</Ext>
                <div className="source-desc">pytest と Gherkin の統合</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://hypothesis.readthedocs.io/">
                  Hypothesis — プロパティベーステスト
                </Ext>
                <div className="source-desc">自動でテストケースを生成するツール</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://mutmut.readthedocs.io/">mutmut — ミューテーションテスト</Ext>
                <div className="source-desc">テストの品質を測るミューテーションツール</div>
              </div>
            </div>
          </div>

          <h3 style={{ margin: "28px 0 16px" }}>18.5 CI/CDとTDD</h3>
          <div className="card">
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://martinfowler.com/articles/continuousIntegration.html">
                  Martin Fowler — Continuous Integration
                </Ext>
                <div className="source-desc">CI の原則と実践</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://docs.github.com/en/actions">GitHub Actions 公式ドキュメント</Ext>
                <div className="source-desc">CI/CD パイプラインの設定</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://agileinaflash.blogspot.com/2009/02/first.html">
                  F.I.R.S.T. 原則（Agile in a Flash）
                </Ext>
                <div className="source-desc">良いユニットテストの5原則</div>
              </div>
            </div>
            <div className="source-row">
              <IconExternalLink size={16} aria-hidden="true" />
              <div>
                <Ext href="https://michaelfeathers.silvrback.com/characterization-testing">
                  Michael Feathers — Characterization Testing
                </Ext>
                <div className="source-desc">レガシーコードへのテスト導入手法</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 32, borderColor: "var(--border-mid)" }}>
            <p style={{ fontSize: "1rem", color: "var(--text-tertiary)", margin: "0" }}>
              本ガイドは
              2026年6月時点の情報に基づいています。各ツールのバージョンや仕様は変更される場合がありますので、実践前に必ず公式ドキュメントをご確認ください。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
