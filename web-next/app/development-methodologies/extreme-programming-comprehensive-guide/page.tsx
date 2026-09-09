import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import XpSidebar from "./XpSidebar";

const DIAGRAM_HISTORY = `timeline
    title XPの歴史的背景
    1990年代初頭 : ウォーターフォール開発の限界が顕在化
    1996年 : Kent BeckがC3プロジェクト（Chrysler社）でXPを実践
    1999年 : Extreme Programming Explained 初版出版
    2001年 : アジャイルマニフェストに参加
    2004年 : 第2版出版（5つの価値と13のプラクティスへ体系化）
    2010年代 : TDD・CI/CD・ペアプロが業界標準のプラクティスへ`;

const DIAGRAM_OVERVIEW = `graph TD
    XP["Extreme Programming"] --> V["5つの価値 Values"]
    XP --> PR["原則 Principles"]
    XP --> P["13のプラクティス Practices"]
    V --> PR --> P
    P --> P1["TDD"] & P2["ペアプログラミング"] & P3["継続的インテグレーション"]
    P --> P4["リファクタリング"] & P5["シンプルな設計"] & P6["小さなリリース"]
    P --> P7["計画ゲーム"] & P8["コレクティブオーナーシップ"] & P9["コーディング規約"]`;

const DIAGRAM_PRACTICES_MAP = `graph TD
    subgraph FINE["細粒度フィードバック（コードレベル）"]
        TDD["TDD"]
        PAIR["ペアプログラミング"]
        CI["継続的インテグレーション"]
        REF["リファクタリング"]
    end
    subgraph CONT["継続的なプロセス"]
        SIM["シンプルな設計"]
        SR["小さなリリース"]
        COL["コレクティブオーナーシップ"]
        STD["コーディング規約"]
    end
    subgraph TEAM["共有理解（チームレベル）"]
        PG["計画ゲーム"]
        OC["オンサイト顧客"]
        MET["メタファー"]
    end
    subgraph WELL["チームの健全性"]
        HRS["週40時間労働"]
        ACC["システム全体のテスト"]
    end`;

const DIAGRAM_INTERLOCK = `graph LR
    TDD -->|安全に変更できる| RF["リファクタリング"]
    RF -->|設計を改善する| SD["シンプルな設計"]
    SD -->|変更しやすいコード| TDD
    CI2["CI"] -->|素早いフィードバック| TDD
    TDD -->|テストがあるから統合できる| CI2
    PP["ペアプロ"] -->|知識共有| CO["コレクティブOW"]
    CO -->|誰でも変更できる| RF
    PG2["計画ゲーム"] --> SR2["小さなリリース"] --> PG2`;

const DIAGRAM_TDD_CYCLE = `flowchart TD
    START(["新機能を実装する"])
    RED["🔴 RED フェーズ\\n失敗するテストを書く\\nまだ実装コードは存在しない\\nテストは必ず失敗する"]
    GREEN["🟢 GREEN フェーズ\\n最小限の実装コードを書く\\nテストを通すだけの最小限\\n美しさより動作を優先"]
    REFACTOR["🔵 REFACTOR フェーズ\\nコードを整理・改善する\\nテストを壊さない範囲で\\n重複排除・命名改善"]
    CHECK{"全機能実装完了？"}
    DONE(["実装完了"])
    START --> RED --> GREEN --> REFACTOR --> CHECK
    CHECK -->|No| RED
    CHECK -->|Yes| DONE`;

const DIAGRAM_PAIR_SESSION = `flowchart TD
    PREP["セッション開始前 5分\\nタスクの目標を2人で確認\\n担当範囲を明確にする"]
    DRIVE["ドライバー開始\\nコードを書き始める"]
    NAV["ナビゲーター\\nリアルタイムレビュー\\n問題点をメモ・指摘"]
    SWAP["20〜30分後 ロール交代\\nドライバー ↔ ナビゲーター"]
    REST["90分後 休憩\\n集中力を維持する"]
    REVIEW["セッション終了前 5分\\n成果を確認・コミット\\n次のタスクをメモ"]
    PREP --> DRIVE
    DRIVE <-->|対話しながら進める| NAV
    DRIVE --> SWAP --> DRIVE
    SWAP --> REST --> DRIVE
    DRIVE --> REVIEW`;

const DIAGRAM_CI_PIPELINE = `flowchart LR
    DEV["開発者\\n（ペアプロ）"] -->|git push| GH["GitHub\\nリポジトリ"]
    GH -->|Webhook| CI["CIサーバー\\n（GitHub Actions）"]
    CI --> STEP1["1. 依存関係\\nインストール"]
    STEP1 --> STEP2["2. 静的解析\\n（Ruff / Mypy）"]
    STEP2 --> STEP3["3. 単体テスト\\n（pytest / Vitest）"]
    STEP3 --> STEP4["4. 統合テスト\\n（DB・API結合）"]
    STEP4 --> STEP5["5. カバレッジ確認\\n（90%以上）"]
    STEP5 --> PASS["✅ ビルド成功\\nマージ可能"]
    STEP2 -.->|失敗| FAIL["❌ ビルド失敗\\n最優先で修正"]
    STEP3 -.->|失敗| FAIL
    STEP4 -.->|失敗| FAIL
    STEP5 -.->|失敗| FAIL`;

const DIAGRAM_ONSITE_CUSTOMER = `sequenceDiagram
    participant DEV as 開発チーム
    participant CUST as 顧客（オンサイト）
    DEV->>CUST: この仕様、〇〇の場合はどうしますか？
    CUST-->>DEV: その場合は△△にしてください
    Note over DEV: 即座に理解・実装開始
    DEV->>CUST: できました。確認してもらえますか？
    CUST->>CUST: 動作を確認する
    CUST-->>DEV: ほぼOKですが、ここを変えてほしい
    DEV->>CUST: 修正しました
    CUST-->>DEV: 完璧です！`;

const DIAGRAM_40_HOURS = `graph LR
    O1["残業・過労"] -->|短期| P1["生産性一時上昇"]
    O1 -->|中期| P2["疲弊・ミス増加"]
    O1 -->|長期| P3["燃え尽き症候群"]
    P3 --> P4["コード品質低下・技術的負債"]
    S1["週40時間以内"] --> S2["集中力維持・高品質"]
    S2 --> S3["チームの士気・健康維持"]
    S3 --> S4["長期的なプロダクト品質"]`;

const DIAGRAM_TEST_PYRAMID = `graph TD
    ACC["受け入れテスト\\n顧客が定義した完了の基準\\nユーザーストーリーの検証\\n数十件"]
    INT["統合テスト\\nコンポーネント間の連携\\nDB・外部サービスとの統合\\n数百件"]
    UNIT["ユニットテスト\\nTDDで書く細かいテスト\\n個々の関数・クラスの動作\\n数千件"]
    UNIT --> INT --> ACC`;

const DIAGRAM_ACCEPTANCE_FLOW = `flowchart LR
    S1["顧客がストーリーを書く"] --> S2["顧客と開発者で受け入れ条件を共同定義"]
    S2 --> S3["開発者が受け入れテストを自動化"]
    S3 --> S4["実装完了後に受け入れテスト実行"]
    S4 --> S5["全テスト通過 = 機能完了の証明"]
    S5 --> S6["顧客が確認・承認"]`;

const DIAGRAM_ITERATION_CYCLE = `flowchart TD
    MON["月曜日：計画ゲーム\\n前回の振り返り 30分\\nベロシティの確認\\n今回のストーリー選択\\nタスク分解と見積もり"]
    DEV["火〜木：開発\\nTDDでコードを書く\\nペアプログラミング\\n継続的インテグレーション\\nデイリースタンドアップ 15分"]
    FRI["金曜日：レビュー & 振り返り\\nデモ（完成した機能を顧客に）\\n受け入れテストの実行\\nKPT振り返り\\n次のイテレーションへの準備"]
    MON --> DEV --> FRI --> MON`;

const DIAGRAM_XP_HEALTH = `flowchart TD
    Q1{"毎日mainへプッシュしているか？"}
    Q2{"コードの前にテストを書いているか？"}
    Q3{"全員がすべてのコードに触れているか？"}
    Q4{"イテレーションごとにリリースできるか？"}
    Q5{"週40時間以内で働けているか？"}
    Q6{"顧客との対話が週2回以上か？"}
    OK["健全なXPプロジェクト"]
    F1["Trunk-Based Developmentへ移行"]
    F2["TDDのサイクルを学び直す"]
    F3["ペアプロとコレクティブOWを強化"]
    F4["ストーリーをさらに小さく分割"]
    F5["計画を見直す・スコープを削る"]
    F6["オンサイト顧客またはPO制を導入"]
    Q1 -->|No| F1
    Q1 -->|Yes| Q2
    Q2 -->|No| F2
    Q2 -->|Yes| Q3
    Q3 -->|No| F3
    Q3 -->|Yes| Q4
    Q4 -->|No| F4
    Q4 -->|Yes| Q5
    Q5 -->|No| F5
    Q5 -->|Yes| Q6
    Q6 -->|No| F6
    Q6 -->|Yes| OK`;

export default function ExtremeProgrammingGuidePage() {
  return (
    <div className="extreme-programming-comprehensive-guide">
      <XpSidebar />
      <main id="content">
        <div className="content-inner">
          {/* ─── HERO ─── */}
          <div className="hero">
            <div className="badges">
              <span className="badge badge-teal">Agile</span>
              <span className="badge badge-purple">Engineering Practices</span>
              <span className="badge badge-coral">初学者向け</span>
            </div>
            <h1>XP（エクストリームプログラミング）完全ガイド</h1>
            <p>
              Kent Beck
              が提唱したアジャイル開発方法論。5つの価値・13のプラクティスをステップバイステップで解説します。
            </p>
          </div>

          {/* ══════════════════════════════════════════════════════════════
               S1: XPとは何か
          ════════════════════════════════════════════════════════════════ */}
          <div id="s1" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 01</span>
              </div>
              <h2>XPとは何か</h2>
              <p>Extreme Programming の定義・背景・全体像</p>
            </div>

            <div className="callout callout-info">
              <strong>一言で言うと：</strong>
              「変化を受け入れ、顧客価値を最速で届けるために、最も効果的な開発プラクティスを組み合わせた方法論」
            </div>

            <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
              Extreme Programming（XP）は Kent Beck
              が1990年代後半に提唱したアジャイルソフトウェア開発の方法論です。 1999年の著書「Extreme
              Programming Explained」によって広く知られるようになりました。
              XPは「良いプラクティスを極限まで実践すれば、品質・速度・適応力のすべてを同時に高められる」という思想に基づいています。
            </p>

            <p className="sub-title">1.1 XPの歴史的背景</p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_HISTORY} preserveNaturalScale={true} />
            </div>

            <p className="sub-title">1.2 XPの全体像</p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_OVERVIEW} preserveNaturalScale={true} />
            </div>

            <p className="sub-title">1.3 XPが解決する問題</p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>問題</th>
                    <th>XPの対策プラクティス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>仕様変更で大幅なやり直しが発生</td>
                    <td style={{ color: "var(--c-green-400)" }}>小さなリリース・計画ゲーム</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>バグが後になって大量発見</td>
                    <td style={{ color: "var(--c-green-400)" }}>TDD・継続的インテグレーション</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>コードの品質低下で変更コスト上昇</td>
                    <td style={{ color: "var(--c-green-400)" }}>
                      リファクタリング・シンプルな設計
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>
                      特定のコードを1人しか理解していない
                    </td>
                    <td style={{ color: "var(--c-green-400)" }}>
                      コレクティブオーナーシップ・ペアプロ
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>過労・燃え尽き症候群</td>
                    <td style={{ color: "var(--c-green-400)" }}>週40時間労働</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>顧客との認識齟齬</td>
                    <td style={{ color: "var(--c-green-400)" }}>オンサイト顧客・受け入れテスト</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="src-list" style={{ marginTop: 12 }}>
              <li>
                <Ext href="http://www.extremeprogramming.org/">
                  extremeprogramming.org（XP公式サイト）
                </Ext>
              </li>
              <li>
                <Ext href="https://martinfowler.com/bliki/ExtremeProgramming.html">
                  Martin Fowler — Extreme Programming
                </Ext>
              </li>
              <li>
                <Ext href="https://agilemanifesto.org/iso/ja/manifesto.html">
                  アジャイルマニフェスト（日本語）
                </Ext>
              </li>
            </ul>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S2: 5つの価値
          ════════════════════════════════════════════════════════════════ */}
          <div id="s2" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 02</span>
              </div>
              <h2>XPの5つの価値（Values）</h2>
              <p>すべてのプラクティスは5つの価値から導かれる</p>
            </div>

            <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
              価値を理解せずにプラクティスだけを実践しても、本来の効果は得られません。まず価値を理解することが最初のステップです。
            </p>

            <div className="grid-2" style={{ marginBottom: 16 }}>
              <div className="vcard vcard-blue">
                <div className="vcard-label vcard-label-blue">💬 コミュニケーション</div>
                <div className="vcard-desc">
                  チーム全員が同じ情報を持つ。直接対話を最優先し、問題を一人で抱え込まない。ペアプロ・スタンドアップで実現。
                </div>
              </div>
              <div className="vcard vcard-green">
                <div className="vcard-label vcard-label-green">✂️ シンプルさ</div>
                <div className="vcard-desc">
                  今必要なことだけを行う。過剰設計・過剰実装をせず、YAGNIを守る。シンプルな設計・リファクタリングで実現。
                </div>
              </div>
              <div className="vcard vcard-amber">
                <div className="vcard-label vcard-label-amber">🔄 フィードバック</div>
                <div className="vcard-desc">
                  早く・頻繁に・積極的にフィードバックを求め、活かす。テスト・小さなリリース・CI
                  で実現。
                </div>
              </div>
              <div className="vcard vcard-red">
                <div className="vcard-label vcard-label-red">💪 勇気</div>
                <div className="vcard-desc">
                  悪いコードを直す・設計を変える・真実を伝える勇気を持つ。リファクタリング・技術的負債の解消で実現。
                </div>
              </div>
              <div className="vcard vcard-purple" style={{ gridColumn: "1/-1" }}>
                <div className="vcard-label vcard-label-purple">🤝 尊重</div>
                <div className="vcard-desc">
                  全チームメンバーを尊重する。貢献と努力を認め合い、失敗を学習機会とする。コレクティブオーナーシップ・ペアプロで実現。
                </div>
              </div>
            </div>

            <p className="sub-title">価値とプラクティスの対応関係</p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>価値</th>
                    <th>主なプラクティス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "var(--c-blue-400)" }}>コミュニケーション</td>
                    <td>ペアプログラミング・計画ゲーム・オンサイト顧客</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-green-400)" }}>シンプルさ</td>
                    <td>シンプルな設計・YAGNI・リファクタリング</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-amber-400)" }}>フィードバック</td>
                    <td>TDD・継続的インテグレーション・小さなリリース</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>勇気</td>
                    <td>リファクタリング・TDD・技術的負債への対処</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-purple-400)" }}>尊重</td>
                    <td>コレクティブオーナーシップ・コーディング規約</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="src-list" style={{ marginTop: 12 }}>
              <li>
                <Ext href="https://www.agilealliance.org/glossary/xp/">
                  Agile Alliance — XP用語集
                </Ext>
              </li>
            </ul>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S3: 13のプラクティス
          ════════════════════════════════════════════════════════════════ */}
          <div id="s3" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 03</span>
              </div>
              <h2>XPの13のプラクティス完全解説</h2>
              <p>プラクティスの全体マップと相互依存関係</p>
            </div>

            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_PRACTICES_MAP} preserveNaturalScale={true} />
            </div>

            <p className="sub-title">プラクティスの相互依存関係</p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_INTERLOCK} preserveNaturalScale={true} />
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S4: TDD
          ════════════════════════════════════════════════════════════════ */}
          <div id="s4" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 04</span>
              </div>
              <h2>プラクティス① テスト駆動開発（TDD）</h2>
              <p>コードを書く前にテストを書く革新的アプローチ</p>
            </div>

            <div className="callout callout-ok" style={{ marginBottom: 16 }}>
              <strong>XPの最重要プラクティス：</strong>
              TDDはXPの根幹です。「動くソフトウェア」を保証し、リファクタリングを安全にし、設計品質を高めます。
            </div>

            <p className="sub-title">Red-Green-Refactor サイクル</p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_TDD_CYCLE} preserveNaturalScale={true} />
            </div>

            <p className="sub-title">良いテストのFIRST原則</p>
            <div className="grid-2">
              <div className="vcard vcard-red">
                <div className="vcard-label vcard-label-red">F — Fast（高速）</div>
                <div className="vcard-desc">
                  ミリ秒単位で実行できる。DBや外部APIに依存しない。いつでも気軽に実行できる。
                </div>
              </div>
              <div className="vcard vcard-blue">
                <div className="vcard-label vcard-label-blue">I — Independent（独立）</div>
                <div className="vcard-desc">
                  テスト間に依存関係がない。任意の順序で実行できる。単独でも全体でも動く。
                </div>
              </div>
              <div className="vcard vcard-green">
                <div className="vcard-label vcard-label-green">R — Repeatable（再現可能）</div>
                <div className="vcard-desc">
                  何度実行しても同じ結果。環境に依存しない。時刻・乱数は注入して制御。
                </div>
              </div>
              <div className="vcard vcard-amber">
                <div className="vcard-label vcard-label-amber">S — Self-validating（自己検証）</div>
                <div className="vcard-desc">
                  Pass/Failが自動判定される。目視確認が不要。明確なアサーションがある。
                </div>
              </div>
              <div className="vcard vcard-purple" style={{ gridColumn: "1/-1" }}>
                <div className="vcard-label vcard-label-purple">T — Timely（タイムリー）</div>
                <div className="vcard-desc">
                  本番コードの直前に書く。後回しにしない。TDDならコードの前に書く。
                </div>
              </div>
            </div>

            <p className="sub-title">TDD実装例（Python）— Red-Green-Refactor</p>
            <pre
              dangerouslySetInnerHTML={{
                __html: `<span class="cm"># ─── Step 1：RED フェーズ ─── まずテストを書く ───</span>
<span class="kw">import</span> pytest
<span class="kw">from</span> order <span class="kw">import</span> Order  <span class="cm"># まだ存在しない！</span>

<span class="kw">class</span> <span class="fn">TestOrder</span>:
    <span class="kw">def</span> <span class="fn">test_新規注文の合計金額は0円</span>(self):
        order = <span class="fn">Order</span>()
        <span class="kw">assert</span> order.total == <span class="nu">0</span>

    <span class="kw">def</span> <span class="fn">test_商品追加後に合計金額が更新される</span>(self):
        order = <span class="fn">Order</span>()
        order.<span class="fn">add_item</span>(<span class="st">"Tシャツ"</span>, price=<span class="nu">1000</span>, quantity=<span class="nu">2</span>)
        <span class="kw">assert</span> order.total == <span class="nu">2000</span>

    <span class="kw">def</span> <span class="fn">test_数量0の商品は追加できない</span>(self):
        order = <span class="fn">Order</span>()
        <span class="kw">with</span> pytest.<span class="fn">raises</span>(ValueError, match=<span class="st">"数量は1以上"</span>):
            order.<span class="fn">add_item</span>(<span class="st">"Tシャツ"</span>, price=<span class="nu">1000</span>, quantity=<span class="nu">0</span>)

<span class="cm"># → この時点でテストを実行すると全てFAIL ✅（RED）</span>


<span class="cm"># ─── Step 2：GREEN フェーズ ─── 最小実装を書く ───</span>
<span class="kw">class</span> <span class="fn">Order</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self._items = []

    <span class="kw">def</span> <span class="fn">add_item</span>(self, name: str, price: int, quantity: int) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> quantity &lt;= <span class="nu">0</span>:
            <span class="kw">raise</span> ValueError(<span class="st">"数量は1以上でなければなりません"</span>)
        self._items.<span class="fn">append</span>({<span class="st">"name"</span>: name, <span class="st">"price"</span>: price, <span class="st">"quantity"</span>: quantity})

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">total</span>(self) -&gt; int:
        <span class="kw">return</span> <span class="fn">sum</span>(item[<span class="st">"price"</span>] * item[<span class="st">"quantity"</span>] <span class="kw">for</span> item <span class="kw">in</span> self._items)

<span class="cm"># → 全テストがPASS ✅（GREEN）</span>


<span class="cm"># ─── Step 3：REFACTOR フェーズ ─── コードを整理 ───</span>
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass

<span class="kw">@dataclass</span>(frozen=<span class="kw">True</span>)
<span class="kw">class</span> <span class="fn">OrderItem</span>:
    name: str
    price: int
    quantity: int

    <span class="kw">def</span> <span class="fn">__post_init__</span>(self):
        <span class="kw">if</span> self.quantity &lt;= <span class="nu">0</span>:
            <span class="kw">raise</span> ValueError(<span class="st">"数量は1以上でなければなりません"</span>)

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">subtotal</span>(self) -&gt; int:
        <span class="kw">return</span> self.price * self.quantity

<span class="kw">class</span> <span class="fn">Order</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self._items: list[OrderItem] = []

    <span class="kw">def</span> <span class="fn">add_item</span>(self, name: str, price: int, quantity: int) -&gt; <span class="kw">None</span>:
        self._items.<span class="fn">append</span>(<span class="fn">OrderItem</span>(name=name, price=price, quantity=quantity))

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">total</span>(self) -&gt; int:
        <span class="kw">return</span> <span class="fn">sum</span>(item.subtotal <span class="kw">for</span> item <span class="kw">in</span> self._items)

<span class="cm"># → リファクタリング後もテストが全てPASS ✅（REFACTOR）</span>`,
              }}
            />

            <p className="sub-title">TDDベストプラクティス</p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>推奨</th>
                    <th>理由</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>テスト名</td>
                    <td style={{ color: "var(--c-teal-400)" }}>日本語や自然言語で意図を明確に</td>
                    <td style={{ color: "var(--text-secondary)" }}>仕様書として読めるようにする</td>
                  </tr>
                  <tr>
                    <td>1テスト1アサーション</td>
                    <td style={{ color: "var(--c-teal-400)" }}>可能な限り守る</td>
                    <td style={{ color: "var(--text-secondary)" }}>失敗の原因を素早く特定できる</td>
                  </tr>
                  <tr>
                    <td>テスト独立性</td>
                    <td style={{ color: "var(--c-teal-400)" }}>共有状態を避ける</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      実行順序に依存しないようにする
                    </td>
                  </tr>
                  <tr>
                    <td>AAAパターン</td>
                    <td style={{ color: "var(--c-teal-400)" }}>Arrange→Act→Assert の順</td>
                    <td style={{ color: "var(--text-secondary)" }}>構造が明確でレビューしやすい</td>
                  </tr>
                  <tr>
                    <td>テストダブル</td>
                    <td style={{ color: "var(--c-teal-400)" }}>Mock/Stub/Fake を適切に使用</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      外部依存を制御してテストを安定させる
                    </td>
                  </tr>
                  <tr>
                    <td>カバレッジ</td>
                    <td style={{ color: "var(--c-teal-400)" }}>ビジネスロジックは90%以上</td>
                    <td style={{ color: "var(--text-secondary)" }}>リグレッションを防ぐ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="src-list" style={{ marginTop: 12 }}>
              <li>
                <Ext href="https://martinfowler.com/bliki/TestDrivenDevelopment.html">
                  Martin Fowler — Test Driven Development
                </Ext>
              </li>
              <li>
                <Ext href="https://blog.cleancoder.com/uncle-bob/2014/12/17/TheThreeRulesOfTdd.html">
                  Uncle Bob — TDDの3つのルール
                </Ext>
              </li>
              <li>
                <Ext href="https://agileinaflash.blogspot.com/2009/02/first.html">
                  FIRST原則（詳細解説）
                </Ext>
              </li>
            </ul>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S5: ペアプログラミング
          ════════════════════════════════════════════════════════════════ */}
          <div id="s5" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 05</span>
              </div>
              <h2>プラクティス② ペアプログラミング</h2>
              <p>2人で1台のPCでコードを書く</p>
            </div>

            <div className="grid-2" style={{ marginBottom: 16 }}>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-blue-400)" }}>
                  ⌨️ ドライバー（Driver）
                </div>
                <ul>
                  <li>実際にコードを入力する</li>
                  <li>現在のタスクに集中</li>
                  <li>実装の詳細を考える</li>
                  <li>定期的にナビゲーターと交代</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-green-400)" }}>
                  🧭 ナビゲーター（Navigator）
                </div>
                <ul>
                  <li>全体の方向性を考える</li>
                  <li>コードをリアルタイムでレビュー</li>
                  <li>問題・改善点を指摘する</li>
                  <li>次のステップを考える</li>
                </ul>
              </div>
            </div>

            <p className="sub-title">セッション設計フロー</p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_PAIR_SESSION} preserveNaturalScale={true} />
            </div>

            <p className="sub-title">実践すること / 避けること</p>
            <div className="grid-2">
              <div>
                <div
                  style={{
                    color: "var(--c-green-400)",
                    fontWeight: 500,
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  ✅ 実践すること
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  定期的にロールを交代する
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  声に出して考える（思考の共有）
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  なぜを共有する（意図を説明する）
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  90分ごとに休憩を入れる
                </div>
                <div className="callout callout-ok">ペアを定期的にローテーション</div>
              </div>
              <div>
                <div
                  style={{
                    color: "var(--c-red-400)",
                    fontWeight: 500,
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  ❌ 避けること
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  ナビゲーターが別の仕事をする
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  コードを批判する（人を批判しない）
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  マウスやキーボードを奪う
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  同じペアを固定し続ける
                </div>
                <div className="callout callout-err">全作業をペアで行う（単純作業は1人）</div>
              </div>
            </div>

            <p className="sub-title">リモートペアプロのツール</p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ツール</th>
                    <th>特徴</th>
                    <th>推奨シーン</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>VS Code Live Share</td>
                    <td>リアルタイム共同編集・無料</td>
                    <td>VS Codeユーザー全般</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>JetBrains Code With Me</td>
                    <td>高機能な共同デバッグ</td>
                    <td>JetBrains IDEユーザー</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>Tuple</td>
                    <td>ペアプロ専用・低レイテンシ</td>
                    <td>品質重視のチーム</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>GitHub Codespaces</td>
                    <td>ブラウザで完結・環境差異なし</td>
                    <td>環境を統一したいチーム</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="src-list" style={{ marginTop: 12 }}>
              <li>
                <Ext href="https://martinfowler.com/articles/on-pair-programming.html">
                  Martin Fowler — On Pair Programming
                </Ext>
              </li>
              <li>
                <Ext href="https://www.agilealliance.org/glossary/pairing/">
                  Agile Alliance — Pair Programming
                </Ext>
              </li>
            </ul>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S6: CI
          ════════════════════════════════════════════════════════════════ */}
          <div id="s6" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 06</span>
              </div>
              <h2>プラクティス③ 継続的インテグレーション（CI）</h2>
              <p>1日に複数回コードをメインブランチに統合する</p>
            </div>

            <p className="sub-title">CIパイプラインの設計</p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_CI_PIPELINE} preserveNaturalScale={true} />
            </div>

            <p className="sub-title">XP流CI 10のルール</p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ルール</th>
                    <th>理由</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>1</td>
                    <td>単一のメインブランチ（長命ブランチを作らない）</td>
                    <td style={{ color: "var(--text-secondary)" }}>統合コストを最小化</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>2</td>
                    <td>ビルドを自動化する（コマンド1つで再現可能）</td>
                    <td style={{ color: "var(--text-secondary)" }}>手作業によるミスを排除</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>3</td>
                    <td>テストを自動化する（コマンド1つで全実行）</td>
                    <td style={{ color: "var(--text-secondary)" }}>継続的な品質保証</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>4</td>
                    <td>全員が毎日mainブランチに統合する</td>
                    <td style={{ color: "var(--text-secondary)" }}>統合の問題を小さく保つ</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>5</td>
                    <td>ビルドは10分以内</td>
                    <td style={{ color: "var(--text-secondary)" }}>遅いCIは誰も待たない</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-red-400)", fontWeight: 500 }}>6</td>
                    <td>ビルド失敗は最優先で修正</td>
                    <td style={{ color: "var(--text-secondary)" }}>壊れたビルドを放置しない</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>7</td>
                    <td>テスト失敗はコミットしない</td>
                    <td style={{ color: "var(--text-secondary)" }}>赤いビルドを積み上げない</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>8</td>
                    <td>結果を全員に可視化</td>
                    <td style={{ color: "var(--text-secondary)" }}>誰もが状態を知っている</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>9</td>
                    <td>フィーチャーブランチは最小化（1日以内）</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      長命ブランチは統合コストを増やす
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-green-400)", fontWeight: 500 }}>10</td>
                    <td>Trunk-Based Developmentを目指す</td>
                    <td style={{ color: "var(--text-secondary)" }}>常にデプロイ可能な状態</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="sub-title">GitHub Actions CI設定例</p>
            <pre
              dangerouslySetInnerHTML={{
                __html: `<span class="cm"># .github/workflows/ci.yml</span>
<span class="cm"># XP流：プッシュのたびに自動実行されるCIパイプライン</span>

<span class="kw">name</span>: <span class="st">XP Continuous Integration</span>

<span class="kw">on</span>:
  <span class="kw">push</span>:
    <span class="kw">branches</span>: [<span class="st">main</span>]
  <span class="kw">pull_request</span>:
    <span class="kw">branches</span>: [<span class="st">main</span>]

<span class="kw">jobs</span>:
  <span class="kw">fast-checks</span>:
    <span class="kw">name</span>: <span class="st">Lint &amp; Unit Tests</span>
    <span class="kw">runs-on</span>: <span class="st">ubuntu-latest</span>
    <span class="kw">steps</span>:
      - <span class="kw">uses</span>: <span class="st">actions/checkout@v4</span>
      - <span class="kw">name</span>: <span class="st">Set up Python</span>
        <span class="kw">uses</span>: <span class="st">actions/setup-python@v5</span>
        <span class="kw">with</span>:
          <span class="kw">python-version</span>: <span class="st">"3.12"</span>
          <span class="kw">cache</span>: <span class="st">pip</span>
      - <span class="kw">name</span>: <span class="st">Install dependencies</span>
        <span class="kw">run</span>: <span class="st">pip install -r requirements-dev.txt</span>
      - <span class="kw">name</span>: <span class="st">Lint check (ruff)</span>
        <span class="kw">run</span>: <span class="st">ruff check .</span>
      - <span class="kw">name</span>: <span class="st">Type check (mypy)</span>
        <span class="kw">run</span>: <span class="st">mypy src/</span>
      - <span class="kw">name</span>: <span class="st">Unit tests with coverage</span>
        <span class="kw">run</span>: |
          <span class="st">pytest tests/unit/ \\
            --cov=src \\
            --cov-fail-under=90 \\
            -v --tb=short -n auto</span>

  <span class="kw">slow-checks</span>:
    <span class="kw">name</span>: <span class="st">Integration &amp; E2E Tests</span>
    <span class="kw">runs-on</span>: <span class="st">ubuntu-latest</span>
    <span class="kw">needs</span>: <span class="st">fast-checks</span>
    <span class="kw">services</span>:
      <span class="kw">postgres</span>:
        <span class="kw">image</span>: <span class="st">postgres:16</span>
        <span class="kw">env</span>:
          <span class="kw">POSTGRES_DB</span>: <span class="st">test_db</span>
          <span class="kw">POSTGRES_USER</span>: <span class="st">test</span>
          <span class="kw">POSTGRES_PASSWORD</span>: <span class="st">test</span>
    <span class="kw">steps</span>:
      - <span class="kw">uses</span>: <span class="st">actions/checkout@v4</span>
      - <span class="kw">name</span>: <span class="st">Integration tests</span>
        <span class="kw">env</span>:
          <span class="kw">DATABASE_URL</span>: <span class="st">postgresql://test:test@localhost/test_db</span>
        <span class="kw">run</span>: <span class="st">pytest tests/integration/ -v</span>
      - <span class="kw">name</span>: <span class="st">Security scan</span>
        <span class="kw">run</span>: <span class="st">pip-audit</span>

  <span class="kw">notify-failure</span>:
    <span class="kw">name</span>: <span class="st">Notify on Failure</span>
    <span class="kw">runs-on</span>: <span class="st">ubuntu-latest</span>
    <span class="kw">needs</span>: [<span class="st">fast-checks</span>, <span class="st">slow-checks</span>]
    <span class="kw">if</span>: <span class="st">failure()</span>
    <span class="kw">steps</span>:
      - <span class="kw">name</span>: <span class="st">Slack notification</span>
        <span class="kw">uses</span>: <span class="st">slackapi/slack-github-action@v1</span>
        <span class="kw">with</span>:
          <span class="kw">payload</span>: <span class="st">'{"text":"CIビルドが失敗しました！即座に修正してください"}'</span>
        <span class="kw">env</span>:
          <span class="kw">SLACK_WEBHOOK_URL</span>: <span class="st">\${{ secrets.SLACK_WEBHOOK_URL }}</span>`,
              }}
            />

            <ul className="src-list" style={{ marginTop: 12 }}>
              <li>
                <Ext href="https://martinfowler.com/articles/continuousIntegration.html">
                  Martin Fowler — Continuous Integration
                </Ext>
              </li>
              <li>
                <Ext href="https://trunkbaseddevelopment.com/">Trunk Based Development 公式</Ext>
              </li>
              <li>
                <Ext href="https://docs.github.com/ja/actions">
                  GitHub Actions ドキュメント（日本語）
                </Ext>
              </li>
            </ul>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S7: リファクタリング
          ════════════════════════════════════════════════════════════════ */}
          <div id="s7" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 07</span>
              </div>
              <h2>プラクティス④ リファクタリング</h2>
              <p>動作を変えずに内部のコード構造を改善する</p>
            </div>

            <div className="callout callout-warn">
              <strong>ボーイスカウトルール：</strong>
              「来たときよりキャンプ場をきれいにして帰りなさい」— コードに触れたら少し良くして帰る。
            </div>

            <p className="sub-title">主要なリファクタリングパターン</p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>パターン名</th>
                    <th>目的</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "var(--c-purple-400)" }}>メソッドの整理</td>
                    <td style={{ color: "var(--c-teal-400)" }}>メソッドの抽出（Extract Method）</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      長いメソッドを意味のある単位に分割
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-purple-400)" }}>メソッドの整理</td>
                    <td style={{ color: "var(--c-teal-400)" }}>メソッドの移動（Move Method）</td>
                    <td style={{ color: "var(--text-secondary)" }}>正しいクラスにロジックを移動</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-purple-400)" }}>命名の改善</td>
                    <td style={{ color: "var(--c-teal-400)" }}>変数名の変更（Rename Variable）</td>
                    <td style={{ color: "var(--text-secondary)" }}>意図が明確な名前に変える</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-purple-400)" }}>命名の改善</td>
                    <td style={{ color: "var(--c-teal-400)" }}>
                      メソッド名の変更（Rename Method）
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>何をするかがわかる名前に</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-purple-400)" }}>クラスの整理</td>
                    <td style={{ color: "var(--c-teal-400)" }}>クラスの抽出（Extract Class）</td>
                    <td style={{ color: "var(--text-secondary)" }}>責任が多すぎるクラスを分割</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-purple-400)" }}>条件式の改善</td>
                    <td style={{ color: "var(--c-teal-400)" }}>
                      条件式の分解（Decompose Conditional）
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      複雑なif-elseを読みやすくする
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-purple-400)" }}>条件式の改善</td>
                    <td style={{ color: "var(--c-teal-400)" }}>ガード節による早期リターン</td>
                    <td style={{ color: "var(--text-secondary)" }}>ネストを浅くし意図を明確に</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-purple-400)" }}>重複の排除</td>
                    <td style={{ color: "var(--c-teal-400)" }}>DRY原則の適用</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      同じロジックを1か所にまとめる
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="sub-title">リファクタリングのタイミング</p>
            <div className="grid-2">
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-amber-400)" }}>
                  新機能実装前
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  コードを理解しながら整理する。変更しやすい状態を作ってから機能追加。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-green-400)" }}>
                  TDDのRefactorフェーズ
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  機能実装直後が最もリスクが低い。テストが安全網になっている。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-red-400)" }}>
                  バグ修正時
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  原因となった複雑さを解消する。同じバグが再発しないように。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-purple-400)" }}>
                  コードレビュー後
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  指摘された問題をリファクタリングで解決する。
                </div>
              </div>
            </div>

            <ul className="src-list" style={{ marginTop: 12 }}>
              <li>
                <Ext href="https://martinfowler.com/books/refactoring.html">
                  Martin Fowler — Refactoring（公式）
                </Ext>
              </li>
              <li>
                <Ext href="https://www.oreilly.com/library/view/97-things-every/9780596809515/ch08.html">
                  ボーイスカウトルール（97 Things Every Programmer Should Know）
                </Ext>
              </li>
            </ul>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S8: シンプルな設計
          ════════════════════════════════════════════════════════════════ */}
          <div id="s8" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 08</span>
              </div>
              <h2>プラクティス⑤ シンプルな設計</h2>
              <p>シンプルな設計の4つのルール（Kent Beck）</p>
            </div>

            <div className="grid-2" style={{ marginBottom: 16 }}>
              <div className="vcard vcard-red">
                <div className="vcard-label vcard-label-red">🥇 ルール1：テストをパスする</div>
                <div className="vcard-desc">
                  動くことが最優先。テストが通らない美しい設計は無価値。
                </div>
              </div>
              <div className="vcard vcard-blue">
                <div className="vcard-label vcard-label-blue">🥈 ルール2：意図が明確である</div>
                <div className="vcard-desc">
                  他の開発者が読んですぐ理解できる。自己文書化されたコード。
                </div>
              </div>
              <div className="vcard vcard-green">
                <div className="vcard-label vcard-label-green">🥉 ルール3：重複がない</div>
                <div className="vcard-desc">
                  DRY原則（Don't Repeat Yourself）。同じロジックを2か所以上に書かない。
                </div>
              </div>
              <div className="vcard vcard-amber">
                <div className="vcard-label vcard-label-amber">🏅 ルール4：要素が最小限</div>
                <div className="vcard-desc">
                  クラス・メソッドの数を最小化。不要な複雑さを持ち込まない。
                </div>
              </div>
            </div>

            <p className="sub-title">YAGNI原則（You Aren't Gonna Need It）</p>
            <div className="grid-2">
              <div>
                <div
                  style={{
                    color: "var(--c-red-400)",
                    fontWeight: 500,
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  ❌ YAGNIを無視した設計
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  「将来必要になるかも」で今実装する
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  「汎用性を持たせておこう」と抽象化しすぎる
                </div>
                <div className="callout callout-err">
                  「スケールするかもしれないから」と最適化する
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: "var(--c-green-400)",
                    fontWeight: 500,
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  ✅ YAGNIを守った設計
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  今必要なものだけ実装する
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  具体的な要件が出てから抽象化する
                </div>
                <div className="callout callout-ok">
                  実際の問題が来てから最適化する（時期尚早な最適化は万悪の元）
                </div>
              </div>
            </div>

            <ul className="src-list" style={{ marginTop: 12 }}>
              <li>
                <Ext href="https://martinfowler.com/bliki/BeckDesignRules.html">
                  Martin Fowler — Beck Design Rules（4つのルール）
                </Ext>
              </li>
              <li>
                <Ext href="https://martinfowler.com/bliki/Yagni.html">Martin Fowler — YAGNI</Ext>
              </li>
            </ul>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S9: 小さなリリース
          ════════════════════════════════════════════════════════════════ */}
          <div id="s9" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 09</span>
              </div>
              <h2>プラクティス⑥ 小さなリリース</h2>
              <p>1〜2週間ごとに価値ある機能を届ける</p>
            </div>
            <div className="grid-2">
              <div>
                <div
                  style={{
                    color: "var(--c-red-400)",
                    fontWeight: 500,
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  ❌ 大きなリリース（従来型）
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  6〜12ヶ月かけて大量機能を実装
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  リリース後に大量のバグ発見
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  ユーザーが求めていない機能が大量に
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  問題の原因特定が困難
                </div>
                <div className="callout callout-err">フィードバックサイクルが長い</div>
              </div>
              <div>
                <div
                  style={{
                    color: "var(--c-green-400)",
                    fontWeight: 500,
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  ✅ 小さなリリース（XP）
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  1〜2週間ごとに価値ある機能を届ける
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  少ない変更なのでバグも少ない
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  ユーザーの反応をすぐに確認できる
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  問題があっても少ない変更から特定
                </div>
                <div className="callout callout-ok">素早いフィードバックで方向修正できる</div>
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S10: 計画ゲーム
          ════════════════════════════════════════════════════════════════ */}
          <div id="s10" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 10</span>
              </div>
              <h2>プラクティス⑦ 計画ゲーム</h2>
              <p>ビジネスと開発者が協力して計画を立てる</p>
            </div>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-blue-400)" }}>
                  💼 ビジネス側が決めること
                </div>
                <ul>
                  <li>何を作るか（機能の範囲・内容）</li>
                  <li>優先順位（どれが最も重要か）</li>
                  <li>リリースの日程（いつ必要か）</li>
                  <li>ビジネス価値（なぜ必要か）</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-green-400)" }}>
                  ⚙️ 開発者が決めること
                </div>
                <ul>
                  <li>どのくらいかかるか（見積もり）</li>
                  <li>技術的なリスク（何が難しいか）</li>
                  <li>実装の順序（依存関係の考慮）</li>
                  <li>開発プロセス（どう作るか）</li>
                </ul>
              </div>
            </div>

            <p className="sub-title">ユーザーストーリーとINVEST原則</p>
            <div className="callout callout-info" style={{ marginBottom: 12 }}>
              <strong>ユーザーストーリーの形式：</strong>
              <br />
              As a（役割として）：〇〇として
              <br />I want（したいこと）：△△したい
              <br />
              So that（理由）：□□できるように
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>頭文字</th>
                    <th>条件</th>
                    <th>説明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>I</td>
                    <td>Independent（独立）</td>
                    <td style={{ color: "var(--text-secondary)" }}>他のストーリーに依存しない</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>N</td>
                    <td>Negotiable（交渉可能）</td>
                    <td style={{ color: "var(--text-secondary)" }}>詳細は話し合いで決まる</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>V</td>
                    <td>Valuable（価値がある）</td>
                    <td style={{ color: "var(--text-secondary)" }}>ユーザーに明確な価値を届ける</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>E</td>
                    <td>Estimable（見積もり可能）</td>
                    <td style={{ color: "var(--text-secondary)" }}>チームが規模を把握できる</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>S</td>
                    <td>Small（小さい）</td>
                    <td style={{ color: "var(--text-secondary)" }}>1イテレーション以内で完成</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)", fontWeight: 500 }}>T</td>
                    <td>Testable（テスト可能）</td>
                    <td style={{ color: "var(--text-secondary)" }}>完了条件が明確に書ける</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="src-list" style={{ marginTop: 12 }}>
              <li>
                <Ext href="https://xp123.com/invest-in-good-stories-and-smart-tasks/">
                  INVEST原則（Bill Wake）
                </Ext>
              </li>
              <li>
                <Ext href="https://www.agilealliance.org/glossary/planning-poker/">
                  プランニングポーカー解説
                </Ext>
              </li>
            </ul>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S11: コレクティブオーナーシップ
          ════════════════════════════════════════════════════════════════ */}
          <div id="s11" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 11</span>
              </div>
              <h2>プラクティス⑧ コレクティブオーナーシップ</h2>
              <p>チーム全員がすべてのコードに責任を持つ</p>
            </div>
            <div className="grid-2">
              <div>
                <div
                  style={{
                    color: "var(--c-red-400)",
                    fontWeight: 500,
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  ❌ 個人所有（アンチパターン）
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  「このコードは山田さんしか知らない」
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  山田さんが休むと作業が止まる
                </div>
                <div className="callout callout-err" style={{ marginBottom: 6 }}>
                  バスファクター = 1（1人辞めると崩壊）
                </div>
                <div className="callout callout-err">コードが属人的で保守困難</div>
              </div>
              <div>
                <div
                  style={{
                    color: "var(--c-green-400)",
                    fontWeight: 500,
                    marginBottom: 8,
                    fontSize: 13,
                  }}
                >
                  ✅ 集合所有（XP）
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  誰でもどのコードにも触れられる
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  バグを見つけたら誰でもすぐ修正
                </div>
                <div className="callout callout-ok" style={{ marginBottom: 6 }}>
                  チームとして全コードに責任を持つ
                </div>
                <div className="callout callout-ok">誰でも理解できるコードが自然に生まれる</div>
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S12: コーディング規約
          ════════════════════════════════════════════════════════════════ */}
          <div id="s12" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 12</span>
              </div>
              <h2>プラクティス⑨ コーディング規約</h2>
              <p>全員が同じスタイルでコードを書く</p>
            </div>
            <div className="callout callout-warn" style={{ marginBottom: 16 }}>
              <strong>目標：</strong>
              コードスタイルについての議論をゼロにする。自動化ツールで一貫性を保つ。
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>言語</th>
                    <th>ツール</th>
                    <th>役割</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>Python</td>
                    <td style={{ color: "var(--c-purple-400)" }}>ruff</td>
                    <td>Lint・フォーマット</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      超高速。flake8+isort+blackの代替
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>Python</td>
                    <td style={{ color: "var(--c-purple-400)" }}>mypy / pyright</td>
                    <td>型チェック</td>
                    <td style={{ color: "var(--text-secondary)" }}>型安全性を強制する</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>Python</td>
                    <td style={{ color: "var(--c-purple-400)" }}>pre-commit</td>
                    <td>コミット前に自動実行</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      問題のあるコードはコミット不可
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>JS/TS</td>
                    <td style={{ color: "var(--c-purple-400)" }}>ESLint</td>
                    <td>Linter</td>
                    <td style={{ color: "var(--text-secondary)" }}>ルールを柔軟にカスタマイズ</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>JS/TS</td>
                    <td style={{ color: "var(--c-purple-400)" }}>Prettier</td>
                    <td>フォーマッター</td>
                    <td style={{ color: "var(--text-secondary)" }}>議論なしに一貫したスタイル</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>CI</td>
                    <td style={{ color: "var(--c-purple-400)" }}>CI Lint Check</td>
                    <td>CIで強制</td>
                    <td style={{ color: "var(--text-secondary)" }}>PRがLint通らないとマージ不可</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="src-list" style={{ marginTop: 12 }}>
              <li>
                <Ext href="https://docs.astral.sh/ruff/">Ruff（Python Linter）公式</Ext>
              </li>
              <li>
                <Ext href="https://eslint.org/docs/">ESLint 公式</Ext>
              </li>
              <li>
                <Ext href="https://prettier.io/docs/en/">Prettier 公式</Ext>
              </li>
            </ul>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S13: オンサイト顧客
          ════════════════════════════════════════════════════════════════ */}
          <div id="s13" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 13</span>
              </div>
              <h2>プラクティス⑩ オンサイト顧客</h2>
              <p>顧客が開発チームと同じ場所にいる</p>
            </div>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_ONSITE_CUSTOMER} preserveNaturalScale={true} />
            </div>
            <p className="sub-title">現代的な代替手段（リモート対応）</p>
            <div className="grid-2">
              <div className="vcard vcard-blue">
                <div className="vcard-label vcard-label-blue">Slack/Teamsでの即時対応</div>
                <div className="vcard-desc">
                  担当者を決め30分以内に返答。アサインされた顧客代表者を設置。
                </div>
              </div>
              <div className="vcard vcard-teal">
                <div className="vcard-label vcard-label-teal">毎日の短いビデオ通話</div>
                <div className="vcard-desc">
                  15〜30分のデイリーチェックイン。進捗共有と質問解決。
                </div>
              </div>
              <div className="vcard vcard-purple">
                <div className="vcard-label vcard-label-purple">プロダクトオーナー制</div>
                <div className="vcard-desc">
                  スクラムのPOが顧客の代わり。優先順位の決定権を持つ。
                </div>
              </div>
              <div className="vcard vcard-green">
                <div className="vcard-label vcard-label-green">デモ環境の共有</div>
                <div className="vcard-desc">
                  常に最新のステージング環境。顧客がいつでも確認できる。
                </div>
              </div>
            </div>
            <div className="callout callout-info" style={{ marginTop: 12 }}>
              <strong>核心原則：</strong>
              フィードバックの遅延を最小化すること。24時間以内に返答を得られる体制を作る。
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S14: 週40時間労働
          ════════════════════════════════════════════════════════════════ */}
          <div id="s14" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 14</span>
              </div>
              <h2>プラクティス⑪ 週40時間労働</h2>
              <p>持続可能なペース（Sustainable Pace）</p>
            </div>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_40_HOURS} preserveNaturalScale={true} />
            </div>
            <div className="callout callout-warn" style={{ marginTop: 12 }}>
              <strong>残業は警告サイン：</strong>
              計画が間違っているサインとして扱う。スコープを削るか、計画を見直す。
            </div>
            <div className="grid-2" style={{ marginTop: 12 }}>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-teal-400)" }}>
                  計画を見直す
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  過剰なコミットメントをやめる。現実的な見積もりを徹底する。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-teal-400)" }}>
                  スコープを削る
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  Must Haveだけにフォーカス。「将来必要かも」を排除する。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-teal-400)" }}>
                  スキル向上に投資
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  TDD・ペアプロで生産性を上げる。長期的な投資として捉える。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-teal-400)" }}>
                  ボトルネックを除去
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  開発プロセスの無駄を削る。自動化できることを自動化する。
                </div>
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S15: メタファー
          ════════════════════════════════════════════════════════════════ */}
          <div id="s15" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 15</span>
              </div>
              <h2>プラクティス⑫ メタファー</h2>
              <p>システム全体を1つの比喩で説明する</p>
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
              システム全体の設計を説明するわかりやすい比喩（アナロジー）を使い、全員が共通のメンタルモデルを持ちます。
            </p>
            <div className="grid-2">
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-purple-400)" }}>
                  ECサイト = 百貨店
                </div>
                <ul style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  <li>顧客（Customer）= 来店客</li>
                  <li>カート（Cart）= 買い物かご</li>
                  <li>注文（Order）= レジでの精算</li>
                  <li>在庫（Inventory）= 商品棚</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-purple-400)" }}>
                  メッセージシステム = 郵便局
                </div>
                <ul style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  <li>メッセージ（Message）= 手紙</li>
                  <li>キュー（Queue）= 郵便ポスト</li>
                  <li>ワーカー（Worker）= 配達員</li>
                  <li>デッドレター = 不達郵便</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-purple-400)" }}>
                  認証システム = 会員証
                </div>
                <ul style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  <li>トークン（Token）= 会員証</li>
                  <li>有効期限（Expiry）= 更新期限</li>
                  <li>スコープ（Scope）= 利用可能サービス</li>
                  <li>リフレッシュ = 更新手続き</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-green-400)" }}>
                  メタファーの効果
                </div>
                <ul style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  <li>チーム全員の共通言語になる</li>
                  <li>クラス名・メソッド名が自然に決まる</li>
                  <li>新メンバーへの説明が容易になる</li>
                  <li>顧客との会話がスムーズになる</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S16: システム全体テスト
          ════════════════════════════════════════════════════════════════ */}
          <div id="s16" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 16</span>
              </div>
              <h2>プラクティス⑬ システム全体のテスト（受け入れテスト）</h2>
              <p>顧客が定義する「完了の基準」を自動化する</p>
            </div>
            <p className="sub-title">テストの階層</p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_TEST_PYRAMID} preserveNaturalScale={true} />
            </div>
            <p className="sub-title">受け入れテストのフロー</p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_ACCEPTANCE_FLOW} preserveNaturalScale={true} />
            </div>
            <div className="callout callout-info" style={{ marginTop: 12 }}>
              <strong>XPのルール：</strong>
              コードを書く前にテストを書く（TDD）。受け入れテストは顧客と一緒に定義する。全テストは自動化して毎回実行する。
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S17: ロールと責務
          ════════════════════════════════════════════════════════════════ */}
          <div id="s17" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 17</span>
              </div>
              <h2>XPのロールと責務</h2>
              <p>チームを構成する5つのロール</p>
            </div>
            <div className="grid-2">
              <div className="vcard vcard-blue">
                <div className="vcard-label vcard-label-blue">👤 顧客（Customer）</div>
                <div className="vcard-desc">
                  <ul>
                    <li>ユーザーストーリーを書く</li>
                    <li>優先順位を決める</li>
                    <li>受け入れテストを定義する</li>
                    <li>機能の完了を承認する</li>
                  </ul>
                </div>
              </div>
              <div className="vcard vcard-green">
                <div className="vcard-label vcard-label-green">💻 開発者（Developer）</div>
                <div className="vcard-desc">
                  <ul>
                    <li>ユーザーストーリーを見積もる</li>
                    <li>TDDでコードを書く</li>
                    <li>ペアプログラミングを行う</li>
                    <li>設計・リファクタリングを担当</li>
                  </ul>
                </div>
              </div>
              <div className="vcard vcard-amber">
                <div className="vcard-label vcard-label-amber">🎓 コーチ（Coach）</div>
                <div className="vcard-desc">
                  <ul>
                    <li>XPのプロセスをガイドする</li>
                    <li>プラクティスの定着を支援</li>
                    <li>チームの自律を促進する</li>
                    <li>経験者が担当</li>
                  </ul>
                </div>
              </div>
              <div className="vcard vcard-purple">
                <div className="vcard-label vcard-label-purple">📊 トラッカー（Tracker）</div>
                <div className="vcard-desc">
                  <ul>
                    <li>進捗を追跡・可視化する</li>
                    <li>ベロシティを計測する</li>
                    <li>計画との差異を報告する</li>
                  </ul>
                </div>
              </div>
              <div className="vcard vcard-coral" style={{ gridColumn: "1/-1" }}>
                <div className="vcard-label vcard-label-coral">📋 マネージャー（Manager）</div>
                <div className="vcard-desc">
                  <ul style={{ columns: 2 }}>
                    <li>チームが集中できる環境を作る</li>
                    <li>外部からの干渉をブロックする</li>
                    <li>リソースを確保する</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S18: イテレーションサイクル
          ════════════════════════════════════════════════════════════════ */}
          <div id="s18" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 18</span>
              </div>
              <h2>XPのイテレーションサイクル</h2>
              <p>1〜2週間のリズムで回すフロー</p>
            </div>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_ITERATION_CYCLE} preserveNaturalScale={true} />
            </div>

            <p className="sub-title">KPT 振り返りフレームワーク</p>
            <div className="grid-3">
              <div className="vcard vcard-green">
                <div className="vcard-label vcard-label-green">✅ Keep（続けること）</div>
                <div className="vcard-desc">
                  良かったこと・うまくいったこと。次のイテレーションも継続する。
                  <br />
                  例：ペアプロで品質が上がった
                </div>
              </div>
              <div className="vcard vcard-red">
                <div className="vcard-label vcard-label-red">❌ Problem（問題点）</div>
                <div className="vcard-desc">
                  うまくいかなかったこと。困ったこと・障害になったこと。
                  <br />
                  例：CIが遅くてストレスだった
                </div>
              </div>
              <div className="vcard vcard-blue">
                <div className="vcard-label vcard-label-blue">🚀 Try（試すこと）</div>
                <div className="vcard-desc">
                  次回試すアイデア・改善案。担当者と期限を決める。
                  <br />
                  例：テストを並列化してCIを速くする
                </div>
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S19: XP vs Scrum
          ════════════════════════════════════════════════════════════════ */}
          <div id="s19" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 19</span>
              </div>
              <h2>XPとScrumの比較・組み合わせ</h2>
              <p>XPとScrumは相補的な関係にある</p>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>観点</th>
                    <th style={{ color: "var(--c-teal-400)" }}>XP</th>
                    <th style={{ color: "var(--c-blue-400)" }}>Scrum</th>
                    <th style={{ color: "var(--c-purple-400)" }}>Kanban</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 500 }}>主な焦点</td>
                    <td>技術的品質</td>
                    <td>チームプロセス</td>
                    <td>フロー最適化</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>イテレーション</td>
                    <td>1〜2週間（固定）</td>
                    <td>2〜4週間（固定）</td>
                    <td>継続的（固定なし）</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>変更対応</td>
                    <td style={{ color: "var(--c-green-400)" }}>歓迎（即対応）</td>
                    <td>制限（スプリント中不可）</td>
                    <td>随時対応可</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>技術プラクティス</td>
                    <td style={{ color: "var(--c-green-400)" }}>詳細に規定</td>
                    <td>規定なし</td>
                    <td>規定なし</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>適用場面</td>
                    <td>技術的品質を上げたい</td>
                    <td>チームの自己組織化</td>
                    <td>保守・運用・サポート</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>チームサイズ</td>
                    <td>2〜12人</td>
                    <td>3〜9人</td>
                    <td>1〜チーム全体</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="callout callout-ok" style={{ marginTop: 12 }}>
              <strong>最強の組み合わせ：</strong>
              Scrum（プロセス管理）+ XP（技術プラクティス）=
              スケーラブルなアジャイル開発。スクラムが「いつ・何を」を管理し、XPが「どう高品質に作るか」を保証する。
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S20: 導入ロードマップ
          ════════════════════════════════════════════════════════════════ */}
          <div id="s20" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 20</span>
              </div>
              <h2>XP導入ロードマップ</h2>
              <p>段階的導入アプローチ（6ヶ月）</p>
            </div>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              <div className="card">
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span className="badge badge-blue">Phase 1（1〜2ヶ月）</span>
                  <span style={{ fontWeight: 500 }}>基礎固め</span>
                </div>
                <ul style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  <li>TDD勉強会・ハンズオン実施</li>
                  <li>CI環境構築（GitHub Actions）</li>
                  <li>デイリースタンドアップ開始</li>
                  <li>コーディング規約を自動化</li>
                </ul>
              </div>
              <div className="card">
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span className="badge badge-green">Phase 2（2〜3ヶ月）</span>
                  <span style={{ fontWeight: 500 }}>定着</span>
                </div>
                <ul style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  <li>ペアプログラミング導入</li>
                  <li>イテレーション計画ゲーム開始</li>
                  <li>KPT振り返りの定期化</li>
                  <li>ベロシティの計測開始</li>
                </ul>
              </div>
              <div className="card">
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span className="badge badge-amber">Phase 3（3〜6ヶ月）</span>
                  <span style={{ fontWeight: 500 }}>拡張</span>
                </div>
                <ul style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  <li>小さなリリースの実現</li>
                  <li>コレクティブオーナーシップ強化</li>
                  <li>受け入れテスト自動化</li>
                  <li>リファクタリングの習慣化</li>
                </ul>
              </div>
              <div className="card">
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span className="badge badge-purple">Phase 4（継続）</span>
                  <span style={{ fontWeight: 500 }}>成熟</span>
                </div>
                <ul style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  <li>全プラクティスの統合</li>
                  <li>プロセスのカスタマイズ</li>
                  <li>他チームへの展開検討</li>
                  <li>自律的な改善サイクル</li>
                </ul>
              </div>
            </div>

            <p className="sub-title">導入の障壁と対策</p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>よくある障壁</th>
                    <th>対策と説得材料</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>「TDDは時間がかかる」</td>
                    <td style={{ color: "var(--c-green-400)" }}>
                      短期的には遅いが、長期的にはバグ修正コストが減る。データで示す。
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>「ペアプロはリソースの無駄」</td>
                    <td style={{ color: "var(--c-green-400)" }}>
                      2人で書くとレビューコストが大幅削減。知識共有の副作用も大きい。
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>「毎日コミットするのは怖い」</td>
                    <td style={{ color: "var(--c-green-400)" }}>
                      CIがあれば問題は自動的に検出される。まず試してみる。
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-red-400)" }}>「顧客が一緒にいられない」</td>
                    <td style={{ color: "var(--c-green-400)" }}>
                      Slack・デモ環境・PO制で代替できる。フィードバック遅延を最小化する。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S21: アンチパターン
          ════════════════════════════════════════════════════════════════ */}
          <div id="s21" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 21</span>
              </div>
              <h2>XPのアンチパターンと対策</h2>
              <p>よくある失敗パターンを知り、対策する</p>
            </div>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-red-400)" }}>
                  Flaccid Scrum（貧弱なスクラム）
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  プロセスはスクラムだが、TDDもCIも何もやっていない。形式だけのアジャイル。
                </div>
                <div className="callout callout-ok" style={{ padding: "6px 10px" }}>
                  <strong>対策：</strong>具体的な技術プラクティスを導入する。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-red-400)" }}>
                  TDDのふり
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  テストを後から書いて「TDDをやっています」と言う。本来のTDDではない。
                </div>
                <div className="callout callout-ok" style={{ padding: "6px 10px" }}>
                  <strong>対策：</strong>レッド→グリーン→リファクタの順序を厳守する。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-red-400)" }}>
                  ペアプロの形骸化
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  片方がPCを見てもう片方がスマホを見ている状態。意味のない「ペア」。
                </div>
                <div className="callout callout-ok" style={{ padding: "6px 10px" }}>
                  <strong>対策：</strong>ロール交代・集中・フィードバックを徹底する。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-red-400)" }}>
                  壊れたCIの放置
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  「後で直す」と言ってビルドが数日間赤いまま。CIへの信頼が失われる。
                </div>
                <div className="callout callout-ok" style={{ padding: "6px 10px" }}>
                  <strong>対策：</strong>壊れたビルドは最優先修正をチームルールとする。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-red-400)" }}>
                  技術的負債の蓄積
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  「今はMVPだから」を言い訳にリファクタリングをしない。後から対処不能になる。
                </div>
                <div className="callout callout-ok" style={{ padding: "6px 10px" }}>
                  <strong>対策：</strong>ボーイスカウトルールを守る。常に少し良くする。
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-red-400)" }}>
                  顧客との距離
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  ストーリーを決めたら数週間顧客と話さない。認識齟齬が積み重なる。
                </div>
                <div className="callout callout-ok" style={{ padding: "6px 10px" }}>
                  <strong>対策：</strong>最低週2回は顧客とコンタクトする。
                </div>
              </div>
            </div>

            <p className="sub-title">XP健全性チェック</p>
            <div className="mermaid-wrap">
              <MermaidDiagram chart={DIAGRAM_XP_HEALTH} preserveNaturalScale={true} />
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S22: ベストプラクティス
          ════════════════════════════════════════════════════════════════ */}
          <div id="s22" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 22</span>
              </div>
              <h2>ベストプラクティス総まとめ</h2>
              <p>XP実践の黄金律10箇条</p>
            </div>
            <div className="grid-2" style={{ marginBottom: 24 }}>
              <div className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    color: "var(--c-teal-400)",
                    fontSize: 18,
                    fontWeight: 500,
                    minWidth: 24,
                  }}
                >
                  1
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>価値から始める</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    5つの価値を理解してからプラクティスを導入する。価値なきプラクティスは形骸化する。
                  </div>
                </div>
              </div>
              <div className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    color: "var(--c-teal-400)",
                    fontSize: 18,
                    fontWeight: 500,
                    minWidth: 24,
                  }}
                >
                  2
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>TDDは最初から</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    後からテストを追加するのは困難。最初から習慣にする。
                  </div>
                </div>
              </div>
              <div className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    color: "var(--c-teal-400)",
                    fontSize: 18,
                    fontWeight: 500,
                    minWidth: 24,
                  }}
                >
                  3
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>小さく早くリリース</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    大きなリリースより小さなリリースを。学習速度が上がる。
                  </div>
                </div>
              </div>
              <div className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    color: "var(--c-teal-400)",
                    fontSize: 18,
                    fontWeight: 500,
                    minWidth: 24,
                  }}
                >
                  4
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>ペアを定期的に変える</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    固定ペアは知識の孤立を生む。毎日・毎週ローテーションする。
                  </div>
                </div>
              </div>
              <div className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    color: "var(--c-teal-400)",
                    fontSize: 18,
                    fontWeight: 500,
                    minWidth: 24,
                  }}
                >
                  5
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>CIを神聖に扱う</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    壊れたビルドを最優先で修正。赤いCIを放置しない。
                  </div>
                </div>
              </div>
              <div className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    color: "var(--c-teal-400)",
                    fontSize: 18,
                    fontWeight: 500,
                    minWidth: 24,
                  }}
                >
                  6
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>シンプルに保つ</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    「将来必要かも」で複雑にしない。YAGNI・KISSを守る。
                  </div>
                </div>
              </div>
              <div className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    color: "var(--c-teal-400)",
                    fontSize: 18,
                    fontWeight: 500,
                    minWidth: 24,
                  }}
                >
                  7
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>顧客を巻き込む</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    技術チームだけで決めない。常にビジネス価値を確認する。
                  </div>
                </div>
              </div>
              <div className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    color: "var(--c-teal-400)",
                    fontSize: 18,
                    fontWeight: 500,
                    minWidth: 24,
                  }}
                >
                  8
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>振り返りを欠かさない</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    KPTをイテレーションごとに。改善のサイクルを回す。
                  </div>
                </div>
              </div>
              <div className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    color: "var(--c-teal-400)",
                    fontSize: 18,
                    fontWeight: 500,
                    minWidth: 24,
                  }}
                >
                  9
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>持続可能なペースを守る</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    残業はプロセスの失敗のサイン。計画を見直すきっかけにする。
                  </div>
                </div>
              </div>
              <div className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    color: "var(--c-teal-400)",
                    fontSize: 18,
                    fontWeight: 500,
                    minWidth: 24,
                  }}
                >
                  10
                </div>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>
                    全プラクティスは連携している
                  </div>
                  <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                    1つだけ導入しても効果は薄い。相互依存を理解して組み合わせる。
                  </div>
                </div>
              </div>
            </div>

            <p className="sub-title">XP成熟度モデル</p>
            <div className="level-bar">
              <div className="level-pill" style={{ background: "#dc2626" }}>
                Lv.0
              </div>
              <div>
                <span style={{ fontWeight: 500 }}>XP未実践</span>{" "}
                <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  アドホックな開発。プロセスが個人依存。
                </span>
              </div>
            </div>
            <div className="level-bar">
              <div className="level-pill" style={{ background: "#ea580c" }}>
                Lv.1
              </div>
              <div>
                <span style={{ fontWeight: 500 }}>基礎プラクティス導入</span>{" "}
                <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  デイリースタンドアップ。バージョン管理・基本的CI。
                </span>
              </div>
            </div>
            <div className="level-bar">
              <div className="level-pill" style={{ background: "#d97706" }}>
                Lv.2
              </div>
              <div>
                <span style={{ fontWeight: 500 }}>技術品質の確立</span>{" "}
                <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  TDDの実践。CI/CDの整備。コーディング規約。
                </span>
              </div>
            </div>
            <div className="level-bar">
              <div className="level-pill" style={{ background: "#16a34a" }}>
                Lv.3
              </div>
              <div>
                <span style={{ fontWeight: 500 }}>チームプラクティスの定着</span>{" "}
                <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  ペアプログラミング。コレクティブオーナーシップ。計画ゲーム。
                </span>
              </div>
            </div>
            <div className="level-bar">
              <div className="level-pill" style={{ background: "#2563eb" }}>
                Lv.4
              </div>
              <div>
                <span style={{ fontWeight: 500 }}>顧客との統合</span>{" "}
                <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  オンサイト顧客。受け入れテスト。小さなリリースの確立。
                </span>
              </div>
            </div>
            <div className="level-bar">
              <div className="level-pill" style={{ background: "#7c3aed" }}>
                Lv.5
              </div>
              <div>
                <span style={{ fontWeight: 500 }}>XPの体質化</span>{" "}
                <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  全プラクティスが自然に機能。状況に合わせてカスタマイズ。他チームへ伝播できる。
                </span>
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* ══════════════════════════════════════════════════════════════
               S23: 参考文献
          ════════════════════════════════════════════════════════════════ */}
          <div id="s23" className="section-anchor">
            <div className="sec-header">
              <div className="badges">
                <span className="badge badge-teal">Section 23</span>
              </div>
              <h2>参考文献・ソース一覧</h2>
              <p>XP学習のための厳選リソース</p>
            </div>

            <p className="sub-title">必読書籍</p>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>タイトル</th>
                    <th>著者</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>
                      Extreme Programming Explained（第2版）
                    </td>
                    <td style={{ color: "var(--c-purple-400)" }}>Kent Beck, Cynthia Andres</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      XPの原典・バイブル。価値・原則・プラクティスを体系化
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>
                      Test-Driven Development: By Example
                    </td>
                    <td style={{ color: "var(--c-purple-400)" }}>Kent Beck</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      TDDの実践書。最も具体的なTDD解説
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>Refactoring（第2版）</td>
                    <td style={{ color: "var(--c-purple-400)" }}>Martin Fowler</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      リファクタリングパターンの決定版
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>Clean Code</td>
                    <td style={{ color: "var(--c-purple-400)" }}>Robert C. Martin</td>
                    <td style={{ color: "var(--text-secondary)" }}>読みやすいコードの書き方</td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>The Art of Agile Development</td>
                    <td style={{ color: "var(--c-purple-400)" }}>James Shore, Shane Warden</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      XPの現代的な実践ガイド。無料公開あり
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--c-teal-400)" }}>
                      Growing Object-Oriented Software, Guided by Tests
                    </td>
                    <td style={{ color: "var(--c-purple-400)" }}>Freeman &amp; Pryce</td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      TDD × OOP の実践的な組み合わせ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="sub-title">公式ドキュメント・参考URL</p>
            <div className="grid-2">
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-teal-400)" }}>
                  XPコア概念
                </div>
                <ul className="src-list">
                  <li>
                    <Ext href="http://www.extremeprogramming.org/">
                      extremeprogramming.org（XP公式）
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://martinfowler.com/bliki/ExtremeProgramming.html">
                      Martin Fowler — Extreme Programming
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://www.agilealliance.org/glossary/xp/">
                      Agile Alliance — XP用語集
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://agilemanifesto.org/iso/ja/manifesto.html">
                      アジャイルマニフェスト（日本語）
                    </Ext>
                  </li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-teal-400)" }}>
                  TDD
                </div>
                <ul className="src-list">
                  <li>
                    <Ext href="https://martinfowler.com/bliki/TestDrivenDevelopment.html">
                      Martin Fowler — TestDrivenDevelopment
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://martinfowler.com/bliki/TestPyramid.html">
                      Martin Fowler — テストピラミッド
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://blog.cleancoder.com/uncle-bob/2014/12/17/TheThreeRulesOfTdd.html">
                      Uncle Bob — TDDの3つのルール
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://agileinaflash.blogspot.com/2009/02/first.html">
                      FIRST原則（詳細解説）
                    </Ext>
                  </li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-teal-400)" }}>
                  ペアプログラミング
                </div>
                <ul className="src-list">
                  <li>
                    <Ext href="https://martinfowler.com/articles/on-pair-programming.html">
                      Martin Fowler — On Pair Programming
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://www.agilealliance.org/glossary/pairing/">
                      Agile Alliance — Pair Programming
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://learn.microsoft.com/ja-jp/visualstudio/liveshare/">
                      VS Code Live Share 公式
                    </Ext>
                  </li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-teal-400)" }}>
                  継続的インテグレーション
                </div>
                <ul className="src-list">
                  <li>
                    <Ext href="https://martinfowler.com/articles/continuousIntegration.html">
                      Martin Fowler — Continuous Integration
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://trunkbaseddevelopment.com/">
                      Trunk Based Development 公式
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://docs.github.com/ja/actions">
                      GitHub Actions ドキュメント（日本語）
                    </Ext>
                  </li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-teal-400)" }}>
                  リファクタリング・シンプルな設計
                </div>
                <ul className="src-list">
                  <li>
                    <Ext href="https://martinfowler.com/books/refactoring.html">
                      Martin Fowler — Refactoring
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://martinfowler.com/bliki/BeckDesignRules.html">
                      Martin Fowler — BeckDesignRules
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://martinfowler.com/bliki/Yagni.html">
                      Martin Fowler — YAGNI
                    </Ext>
                  </li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title" style={{ color: "var(--c-teal-400)" }}>
                  計画ゲーム・ストーリー
                </div>
                <ul className="src-list">
                  <li>
                    <Ext href="https://xp123.com/invest-in-good-stories-and-smart-tasks/">
                      INVEST原則（Bill Wake）
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://www.agilealliance.org/glossary/planning-poker/">
                      プランニングポーカー解説
                    </Ext>
                  </li>
                  <li>
                    <Ext href="https://www.jamesshore.com/v2/books/aoad2">
                      The Art of Agile Development（無料公開）
                    </Ext>
                  </li>
                </ul>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                padding: "12px 16px",
                background: "var(--bg-tertiary)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
                color: "var(--text-secondary)",
              }}
            >
              本ドキュメントは2025年時点の情報を基に作成しています。各ツールのバージョンや仕様は変更される場合があります。実践前に必ず公式ドキュメントをご確認ください。
            </div>
          </div>

          <hr className="divider" />
        </div>
      </main>
    </div>
  );
}
