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
        </div>
      </main>
    </div>
  );
}
