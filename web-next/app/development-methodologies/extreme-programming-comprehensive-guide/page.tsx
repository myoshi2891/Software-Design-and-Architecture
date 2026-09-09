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
        </div>
      </main>
    </div>
  );
}
