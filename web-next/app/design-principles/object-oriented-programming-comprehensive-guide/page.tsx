import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import OopSidebar, { type NavGroup } from "./OopSidebar";

export const metadata: Metadata = {
  title: "OOP 完全ガイド — オブジェクト指向プログラミング徹底解説",
  description:
    "オブジェクト指向プログラミングの4大原則からSOLID原則・GoFデザインパターン・クリーンアーキテクチャとの統合まで、Python 実装例とダイアグラムで体系的に解説します。",
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "はじめに",
    items: [{ id: "sec1", num: "01", label: "OOPとは何か？" }],
  },
  {
    label: "コア原則",
    items: [
      { id: "sec2", num: "02", label: "4大原則" },
      { id: "sec3", num: "03", label: "SOLID 原則" },
    ],
  },
  {
    label: "設計",
    items: [
      { id: "sec4", num: "04", label: "クラスと オブジェクトの設計" },
      { id: "sec5", num: "05", label: "継承の正しい使い方" },
      { id: "sec6", num: "06", label: "インターフェースと抽象クラス" },
    ],
  },
  {
    label: "パターン",
    items: [{ id: "sec7", num: "07", label: "デザインパターン（GoF）" }],
  },
  {
    label: "実践",
    items: [
      { id: "sec8", num: "08", label: "アーキテクチャとの統合" },
      { id: "sec9", num: "09", label: "テスト駆動 OOP 開発" },
      { id: "sec10", num: "10", label: "リファクタリング技法" },
      { id: "sec11", num: "11", label: "ECサイト実装例" },
    ],
  },
  {
    label: "応用",
    items: [
      { id: "sec12", num: "12", label: "OOP アンチパターン" },
      { id: "sec13", num: "13", label: "ベストプラクティス" },
      { id: "sec14", num: "14", label: "参考文献・ソース一覧" },
    ],
  },
];

export default function ObjectOrientedProgrammingPage() {
  return (
    <div className="object-oriented-programming-comprehensive-guide">
      <div className="layout">
        <OopSidebar groups={NAV_GROUPS} />

        <main className="main">
          {/* ═══════ HERO ═══════ */}
          <section className="hero">
            <div className="hero-eyebrow">
              <span>🧱</span>
              <span>Object-Oriented Programming — Complete Guide</span>
            </div>
            <h1>OOP 完全ガイド</h1>
            <p className="hero-desc">
              オブジェクト指向プログラミングの4大原則からSOLID原則・GoFデザインパターン・クリーンアーキテクチャとの統合まで、
              初学者でも迷わないよう Python 実装例とダイアグラムで体系的に解説します。
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="num">14</span>
                <span className="label">セクション</span>
              </div>
              <div className="hero-stat">
                <span className="num">23+</span>
                <span className="label">コード例</span>
              </div>
              <div className="hero-stat">
                <span className="num">5</span>
                <span className="label">SOLID 原則</span>
              </div>
              <div className="hero-stat">
                <span className="num">23</span>
                <span className="label">GoF パターン</span>
              </div>
            </div>
          </section>

          {/* ═══════ SECTION 1: OOPとは何か？ ═══════ */}
          <section className="section" id="sec1">
            <div className="section-header">
              <span className="section-num">01</span>
              <h2>OOP とは何か？</h2>
            </div>

            <p>
              <strong>Object-Oriented Programming（オブジェクト指向プログラミング）</strong>
              は、プログラムを 「データ（状態）」と「振る舞い（操作）」を持つ
              <strong>オブジェクト</strong>の集まりとして設計する考え方です。 1960年代の Simula
              言語から始まり、Smalltalk・C++・Java・Python
              など現代のあらゆる言語に影響を与えています。
            </p>

            <div className="callout callout-tip">
              <span className="callout-icon">💡</span>
              <div className="callout-body">
                <strong>一言で言うと</strong>
                現実世界の物事をプログラムで表現し、物事同士が協力し合うようにシステムを組み立てる手法。
              </div>
            </div>

            <h3>なぜ OOP が重要なのか？</h3>
            <p>
              手続き型プログラミングと OOP を比較すると、大規模開発における優位性が明確になります。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph LR
  subgraph BEFORE["❌ 手続き型プログラミング"]
    P1["データと処理がバラバラ"]
    P2["変更が全体に波及する"]
    P3["コードの再利用が難しい"]
    P4["大規模化で混乱が増大"]
  end
  subgraph AFTER["✅ OOP（オブジェクト指向）"]
    S1["データと処理を一つに束ねる"]
    S2["変更の影響範囲を限定できる"]
    S3["クラスを再利用・拡張できる"]
    S4["大規模でも秩序ある構造を保てる"]
  end
  P1 --> S1
  P2 --> S2
  P3 --> S3
  P4 --> S4
  style P1 fill:#7f1d1d,color:#fca5a5
  style P2 fill:#7f1d1d,color:#fca5a5
  style P3 fill:#7f1d1d,color:#fca5a5
  style P4 fill:#7f1d1d,color:#fca5a5
  style S1 fill:#14532d,color:#86efac
  style S2 fill:#14532d,color:#86efac
  style S3 fill:#14532d,color:#86efac
  style S4 fill:#14532d,color:#86efac`}
              />
              <p className="mermaid-caption">図1. 手続き型 vs OOP の比較</p>
            </div>

            <h3>OOP の全体マップ</h3>
            <p>
              OOP
              は単なる「クラスを書く技術」ではありません。原則・設計パターン・アーキテクチャが有機的に連携したエコシステムです。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`mindmap
  root((OOP\\nオブジェクト指向))
    4大原則
      カプセル化
      継承
      ポリモーフィズム
      抽象化
    SOLID原則
      S 単一責任
      O 開放閉鎖
      L リスコフ置換
      I インターフェース分離
      D 依存性逆転
    設計要素
      クラスとオブジェクト
      インターフェース
      抽象クラス
      コンポジション
    デザインパターン
      生成パターン
      構造パターン
      振る舞いパターン
    実践的応用
      ドメイン駆動設計
      クリーンアーキテクチャ
      テスト駆動開発`}
              />
              <p className="mermaid-caption">図2. OOP 全体マップ</p>
            </div>

            <h3>OOP の歴史</h3>
            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`timeline
  title OOP の歴史
  1967年 : Simula 最初のオブジェクト指向言語
  1972年 : Smalltalk 純粋なOOP言語
  1985年 : C++ 手続き型にOOPを追加
  1995年 : Java プラットフォーム非依存のOOP
  1995年 : Ruby 完全OOP言語
  2000年 : C# Microsoft製モダンOOP言語
  2000年代 : Python マルチパラダイム対応
  2010年代 : Kotlin Swift 現代的なOOP言語`}
              />
              <p className="mermaid-caption">図3. OOP の歴史的変遷</p>
            </div>

            <h3>手続き型 vs OOP — 実際のコード比較</h3>
            <div className="compare-grid">
              <div className="compare-bad">
                <div className="code-block">
                  <div className="code-header">
                    <span className="code-lang">❌ PYTHON — 手続き型（問題あり）</span>
                  </div>
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="cm"># データと処理がバラバラ</span>
user_name = <span class="st">"山田太郎"</span>
user_balance = <span class="nu">10000</span>

<span class="kw">def</span> <span class="fn">deposit</span>(balance, amount):
    <span class="kw">if</span> amount &lt;= <span class="nu">0</span>:
        <span class="kw">raise</span> ValueError(<span class="st">"金額は正の数"</span>)
    <span class="kw">return</span> balance + amount

<span class="kw">def</span> <span class="fn">withdraw</span>(balance, amount):
    <span class="kw">if</span> amount &gt; balance:
        <span class="kw">raise</span> ValueError(<span class="st">"残高不足"</span>)
    <span class="kw">return</span> balance - amount

<span class="cm"># 呼び出す側が状態を管理しなければならない</span>
user_balance = deposit(user_balance, <span class="nu">5000</span>)
user_balance = withdraw(user_balance, <span class="nu">3000</span>)
<span class="cm"># 誰でも直接変更できてしまう ⚠️</span>
user_balance = <span class="nu">9999999</span>  <span class="cm"># ← 制約なし</span>`,
                    }}
                  />
                </div>
              </div>
              <div className="compare-good">
                <div className="code-block">
                  <div className="code-header">
                    <span className="code-lang">✅ PYTHON — OOP（推奨）</span>
                  </div>
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="cm"># データと処理が一つのクラスに</span>
<span class="kw">class</span> <span class="fn">BankAccount</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, owner: str, balance: float = <span class="nu">0</span>):
        self._owner = owner
        self.__balance = balance  <span class="cm"># private</span>

    <span class="kw">def</span> <span class="fn">deposit</span>(self, amount: float) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> amount &lt;= <span class="nu">0</span>:
            <span class="kw">raise</span> ValueError(<span class="st">"金額は正の数"</span>)
        self.__balance += amount

    <span class="kw">def</span> <span class="fn">withdraw</span>(self, amount: float) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> amount &gt; self.__balance:
            <span class="kw">raise</span> ValueError(<span class="st">"残高不足"</span>)
        self.__balance -= amount

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">balance</span>(self) -&gt; float:
        <span class="kw">return</span> self.__balance  <span class="cm"># 読み取り専用</span>

<span class="cm"># 使い方</span>
acc = BankAccount(<span class="st">"山田太郎"</span>, <span class="nu">10000</span>)
acc.deposit(<span class="nu">5000</span>)
acc.withdraw(<span class="nu">3000</span>)
print(acc.balance)   <span class="cm"># 12000</span>
<span class="cm"># acc.__balance = 9999999  # ← 直接変更不可 ✅</span>`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ SECTION 2: 4大原則 ═══════ */}
          <section className="section" id="sec2">
            <div className="section-header">
              <span className="section-num">02</span>
              <h2>4大原則：カプセル化・継承・ポリモーフィズム・抽象化</h2>
            </div>

            <p>
              OOP
              には4つの根幹をなす原則があります。これらは互いに補完し合い、保守性・拡張性の高いコードを実現します。
            </p>

            <div className="card-grid-4">
              <div className="principle-card pc-blue">
                <span className="pc-icon">🔒</span>
                <div className="pc-title">カプセル化</div>
                <div className="pc-sub">Encapsulation</div>
                <div className="pc-desc">
                  データと処理を一つに包み込み、内部の詳細を外部から隠蔽する。変更の影響範囲を限定できる。
                </div>
              </div>
              <div className="principle-card pc-green">
                <span className="pc-icon">🧬</span>
                <div className="pc-title">継承</div>
                <div className="pc-sub">Inheritance</div>
                <div className="pc-desc">
                  親クラスの特性を子クラスが引き継ぐ。コードの再利用と階層的な分類を可能にする。
                </div>
              </div>
              <div className="principle-card pc-purple">
                <span className="pc-icon">🎭</span>
                <div className="pc-title">ポリモーフィズム</div>
                <div className="pc-sub">Polymorphism</div>
                <div className="pc-desc">
                  同じインターフェースで異なる振る舞いを実現。呼び出し元は具体的な型を意識しなくてよい。
                </div>
              </div>
              <div className="principle-card pc-orange">
                <span className="pc-icon">🎨</span>
                <div className="pc-title">抽象化</div>
                <div className="pc-sub">Abstraction</div>
                <div className="pc-desc">
                  本質的な特徴だけを取り出し、不要な詳細を隠す。複雑さをコントロールする手段。
                </div>
              </div>
            </div>

            {/* 2.1 カプセル化 */}
            <h3>① カプセル化（Encapsulation）</h3>
            <p>
              カプセル化とは、データ（フィールド）と処理（メソッド）を一つのクラスに束ね、
              外部から直接アクセスさせないようにする原則です。「情報隠蔽」とも呼ばれます。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`flowchart LR
  subgraph OUTSIDE["外部（クライアントコード）"]
    CLIENT["呼び出し側"]
  end
  subgraph CAPSULE["🔒 BankAccount クラス"]
    PUB["✅ 公開 API\\ndeposit()\\nwithdraw()\\nbalance（読み取り専用）"]
    PRIV["🔒 非公開（内部実装）\\n__balance\\n__transaction_history\\n__validate_amount()"]
    PUB --> PRIV
  end
  CLIENT --> PUB
  CLIENT -. "❌ 直接アクセス不可" .-> PRIV
  style PUB fill:#14532d,color:#86efac
  style PRIV fill:#7f1d1d,color:#fca5a5
  style CLIENT fill:#1e3a5f,color:#93c5fd`}
              />
              <p className="mermaid-caption">
                図4. カプセル化のイメージ：外部は公開 API のみアクセス可
              </p>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">カプセル化の実装例</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">class</span> <span class="fn">BankAccount</span>:
    <span class="st">"""銀行口座 — カプセル化の例"""</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self, owner: str, initial_balance: float = <span class="nu">0</span>):
        self._owner = owner               <span class="cm"># protected（サブクラスからアクセス可）</span>
        self.__balance = initial_balance  <span class="cm"># private（外部から直接アクセス不可）</span>
        self.__transaction_history = []

    <span class="cm"># ✅ 公開インターフェース</span>
    <span class="kw">def</span> <span class="fn">deposit</span>(self, amount: float) -&gt; <span class="kw">None</span>:
        <span class="st">"""入金する — バリデーションを内部で行う"""</span>
        self.__validate_amount(amount)
        self.__balance += amount
        self.__record_transaction(<span class="st">"入金"</span>, amount)

    <span class="kw">def</span> <span class="fn">withdraw</span>(self, amount: float) -&gt; <span class="kw">None</span>:
        <span class="st">"""出金する — 残高チェックも内部で行う"""</span>
        self.__validate_amount(amount)
        <span class="kw">if</span> amount &gt; self.__balance:
            <span class="kw">raise</span> ValueError(<span class="st">"残高が不足しています"</span>)
        self.__balance -= amount
        self.__record_transaction(<span class="st">"出金"</span>, amount)

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">balance</span>(self) -&gt; float:
        <span class="st">"""残高は読み取り専用（setterなし）"""</span>
        <span class="kw">return</span> self.__balance

    <span class="cm"># 🔒 非公開メソッド（実装詳細）</span>
    <span class="kw">def</span> <span class="fn">__validate_amount</span>(self, amount: float) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> amount &lt;= <span class="nu">0</span>:
            <span class="kw">raise</span> ValueError(<span class="st">"金額は0より大きくなければなりません"</span>)

    <span class="kw">def</span> <span class="fn">__record_transaction</span>(self, type_: str, amount: float) -&gt; <span class="kw">None</span>:
        self.__transaction_history.append({<span class="st">"type"</span>: type_, <span class="st">"amount"</span>: amount})

<span class="cm"># 使い方</span>
account = BankAccount(<span class="st">"山田太郎"</span>, <span class="nu">10000</span>)
account.deposit(<span class="nu">5000</span>)
account.withdraw(<span class="nu">3000</span>)
print(account.balance)        <span class="cm"># ✅ 12000</span>
<span class="cm"># account.__balance = 999999  # ❌ AttributeError — 直接変更できない</span>`,
                }}
              />
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ベストプラクティス</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>最小公開の原則</td>
                    <td>
                      必要なものだけ <code>public</code> にする。迷ったら <code>private</code>{" "}
                      から始める
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>setter より意図を表すメソッド</td>
                    <td>
                      <code>set_status(&quot;active&quot;)</code> より <code>activate()</code>{" "}
                      の方が意図が明確
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>イミュータブルを積極活用</td>
                    <td>
                      変更不可なフィールドは <code>@property</code> で読み取り専用にする
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>コンストラクタでバリデーション</td>
                    <td>不正な状態のオブジェクトを作らせない（フェイルファスト）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 2.2 継承 */}
            <h3>② 継承（Inheritance）</h3>
            <p>
              継承は、親クラス（スーパークラス）の属性・メソッドを子クラス（サブクラス）が引き継ぐ仕組みです。
              <strong>「is-a 関係」</strong>を表します（例：犬は動物である）。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`classDiagram
  class Animal {
    +String name
    +int age
    +speak()* 抽象メソッド
    +eat()
    +sleep()
  }
  class Dog {
    +String breed
    +speak() ワン！
    +fetch()
  }
  class Cat {
    +bool is_indoor
    +speak() ニャー！
    +purr()
  }
  class GuideDog {
    +String owner
    +guide()
  }
  Animal <|-- Dog : is-a
  Animal <|-- Cat : is-a
  Dog <|-- GuideDog : is-a`}
              />
              <p className="mermaid-caption">図5. 継承の階層構造（Animal → Dog/Cat → GuideDog）</p>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">継承の実装例</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod


<span class="kw">class</span> <span class="fn">Animal</span>(ABC):
    <span class="st">"""動物の基底クラス（抽象クラス）"""</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self, name: str, age: int):
        self.name = name
        self.age = age

    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">speak</span>(self) -&gt; str:
        <span class="st">"""各動物固有の鳴き声（サブクラスで必ず実装）"""</span>
        ...

    <span class="kw">def</span> <span class="fn">eat</span>(self) -&gt; str:
        <span class="kw">return</span> f<span class="st">"{self.name} がご飯を食べています"</span>  <span class="cm"># 共通処理は親が持つ</span>


<span class="kw">class</span> <span class="fn">Dog</span>(Animal):
    <span class="st">"""犬クラス — Animal を継承"""</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self, name: str, age: int, breed: str):
        super().__init__(name, age)  <span class="cm"># ← 親クラスの __init__ を呼ぶ</span>
        self.breed = breed

    <span class="kw">def</span> <span class="fn">speak</span>(self) -&gt; str:
        <span class="kw">return</span> <span class="st">"ワン！"</span>  <span class="cm"># 抽象メソッドをオーバーライド</span>

    <span class="kw">def</span> <span class="fn">fetch</span>(self) -&gt; str:
        <span class="kw">return</span> f<span class="st">"{self.name} がボールを取ってきました！"</span>


<span class="kw">class</span> <span class="fn">Cat</span>(Animal):
    <span class="kw">def</span> <span class="fn">speak</span>(self) -&gt; str:
        <span class="kw">return</span> <span class="st">"ニャー！"</span>

    <span class="kw">def</span> <span class="fn">purr</span>(self) -&gt; str:
        <span class="kw">return</span> f<span class="st">"{self.name} がゴロゴロ言っています"</span>


dog = Dog(<span class="st">"ポチ"</span>, <span class="nu">3</span>, <span class="st">"柴犬"</span>)
cat = Cat(<span class="st">"タマ"</span>, <span class="nu">5</span>)

print(dog.speak())  <span class="cm"># ワン！</span>
print(cat.speak())  <span class="cm"># ニャー！</span>
print(dog.eat())    <span class="cm"># ポチ がご飯を食べています ← 親から継承</span>`,
                }}
              />
            </div>

            {/* 2.3 ポリモーフィズム */}
            <h3>③ ポリモーフィズム（Polymorphism）</h3>
            <p>
              ポリモーフィズム（多態性）とは、同じインターフェース（メソッド名）に対して、
              オブジェクトの種類によって異なる振る舞いをすることです。
              呼び出し元のコードは「形の種類」を知る必要がなくなります。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph LR
  CLIENT["クライアントコード\\nshape.describe() を呼ぶ"] --> POLY["🎭 ポリモーフィズム"]
  POLY --> CIRCLE["Circle.describe()\\n→ 円の面積・周囲を計算"]
  POLY --> RECT["Rectangle.describe()\\n→ 四角形の面積・周囲を計算"]
  POLY --> TRI["Triangle.describe()\\n→ 三角形の面積・周囲を計算"]
  style CLIENT fill:#1e3a5f,color:#93c5fd
  style POLY fill:#4c1d95,color:#c4b5fd
  style CIRCLE fill:#14532d,color:#86efac
  style RECT fill:#14532d,color:#86efac
  style TRI fill:#14532d,color:#86efac`}
              />
              <p className="mermaid-caption">図6. ポリモーフィズム：同じ呼び出し・異なる振る舞い</p>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">ポリモーフィズムの実装例</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod
<span class="kw">from</span> math <span class="kw">import</span> pi


<span class="kw">class</span> <span class="fn">Shape</span>(ABC):
    <span class="st">"""図形の抽象クラス"""</span>

    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">area</span>(self) -&gt; float: ...

    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">perimeter</span>(self) -&gt; float: ...

    <span class="kw">def</span> <span class="fn">describe</span>(self) -&gt; str:
        <span class="kw">return</span> (
            f<span class="st">"{self.__class__.__name__}: "</span>
            f<span class="st">"面積={self.area():.2f}, 周囲={self.perimeter():.2f}"</span>
        )


<span class="kw">class</span> <span class="fn">Circle</span>(Shape):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, radius: float):
        self.radius = radius
    <span class="kw">def</span> <span class="fn">area</span>(self) -&gt; float:
        <span class="kw">return</span> pi * self.radius ** <span class="nu">2</span>
    <span class="kw">def</span> <span class="fn">perimeter</span>(self) -&gt; float:
        <span class="kw">return</span> <span class="nu">2</span> * pi * self.radius


<span class="kw">class</span> <span class="fn">Rectangle</span>(Shape):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, width: float, height: float):
        self.width = width
        self.height = height
    <span class="kw">def</span> <span class="fn">area</span>(self) -&gt; float:
        <span class="kw">return</span> self.width * self.height
    <span class="kw">def</span> <span class="fn">perimeter</span>(self) -&gt; float:
        <span class="kw">return</span> <span class="nu">2</span> * (self.width + self.height)


<span class="cm"># ✅ ポリモーフィズムの真価：コードが形の種類を知らなくていい</span>
shapes: list[Shape] = [Circle(<span class="nu">5</span>), Rectangle(<span class="nu">4</span>, <span class="nu">6</span>), Circle(<span class="nu">3</span>)]

<span class="kw">for</span> shape <span class="kw">in</span> shapes:
    print(shape.describe())  <span class="cm"># ← 各オブジェクトが正しい計算を行う</span>
<span class="cm"># 新しい図形（Triangle）を追加しても、このループを変更する必要がない！</span>`,
                }}
              />
            </div>

            {/* 2.4 抽象化 */}
            <h3>④ 抽象化（Abstraction）</h3>
            <p>
              抽象化とは、複雑な実装の詳細を隠し、本質的なインターフェース（何ができるか）だけを公開することです。
              ドライバーはエンジンの内部構造を知らなくても車を運転できます。これが抽象化の本質です。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph TD
  subgraph ABSTRACTION["抽象化の層"]
    HIGH["🎨 高レベル（ドライバー視点）\\nハンドルを回す・アクセルを踏む"]
    MID["⚙️ 中レベル\\n燃料噴射・点火タイミング制御"]
    LOW["🔧 低レベル（実装詳細）\\nECU・センサー信号・マイクロコード"]
  end
  USER["👤 ドライバー\\n高レベルのみ知ればよい"] --> HIGH
  HIGH --> MID
  MID --> LOW
  USER -. "❌ 知らなくてよい" .-> MID
  USER -. "❌ 知らなくてよい" .-> LOW
  style HIGH fill:#1e3a5f,color:#93c5fd
  style MID fill:#78350f,color:#fcd34d
  style LOW fill:#7f1d1d,color:#fca5a5`}
              />
              <p className="mermaid-caption">
                図7. 抽象化の層：ドライバーは高レベル API のみ知ればよい
              </p>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">抽象化の実装例 — DBの実装を隠蔽</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod


<span class="kw">class</span> <span class="fn">DatabaseConnection</span>(ABC):
    <span class="st">"""データベース接続の抽象（高レベル API）"""</span>

    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">connect</span>(self) -&gt; <span class="kw">None</span>: ...

    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">execute</span>(self, query: str) -&gt; list: ...

    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">close</span>(self) -&gt; <span class="kw">None</span>: ...

    <span class="cm"># テンプレートメソッド：共通フロー（呼び出し元はこれだけ知ればよい）</span>
    <span class="kw">def</span> <span class="fn">run_query</span>(self, query: str) -&gt; list:
        self.connect()
        <span class="kw">try</span>:
            <span class="kw">return</span> self.execute(query)
        <span class="kw">finally</span>:
            self.close()


<span class="kw">class</span> <span class="fn">PostgreSQLConnection</span>(DatabaseConnection):
    <span class="st">"""PostgreSQL 具体実装（詳細は隠蔽される）"""</span>
    <span class="kw">def</span> <span class="fn">connect</span>(self) -&gt; <span class="kw">None</span>:
        print(<span class="st">"PostgreSQL に接続しました"</span>)
    <span class="kw">def</span> <span class="fn">execute</span>(self, query: str) -&gt; list:
        print(f<span class="st">"PostgreSQL クエリ実行: {query}"</span>)
        <span class="kw">return</span> []
    <span class="kw">def</span> <span class="fn">close</span>(self) -&gt; <span class="kw">None</span>:
        print(<span class="st">"PostgreSQL 接続を閉じました"</span>)


<span class="cm"># 呼び出し側は「どのDBか」を知らなくてよい ← 抽象化の効果</span>
<span class="kw">def</span> <span class="fn">fetch_users</span>(db: DatabaseConnection) -&gt; list:
    <span class="kw">return</span> db.run_query(<span class="st">"SELECT * FROM users"</span>)

fetch_users(PostgreSQLConnection())  <span class="cm"># PostgreSQL を使う</span>
<span class="cm"># fetch_users(MySQLConnection())     # MySQL に差し替えても動く</span>`,
                }}
              />
            </div>
          </section>

          {/* ═══════ SECTION 3: SOLID 原則 ═══════ */}
          <section className="section" id="sec3">
            <div className="section-header">
              <span className="section-num">03</span>
              <h2>SOLID 原則</h2>
            </div>

            <p>
              SOLID は OOP 設計の5つの黄金律です。 Robert C. Martin（Uncle
              Bob）が提唱した、変更に強く・テストしやすい設計のための原則群です。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph TD
  SOLID["🏛️ SOLID 原則"]
  SOLID --> SRP["S: Single Responsibility\\n単一責任原則\\n1クラス = 1つの変更理由"]
  SOLID --> OCP["O: Open/Closed\\n開放閉鎖原則\\n拡張に開き、修正に閉じる"]
  SOLID --> LSP["L: Liskov Substitution\\nリスコフ置換原則\\nサブクラスは親を代替できる"]
  SOLID --> ISP["I: Interface Segregation\\nインターフェース分離原則\\n不要なメソッドを強制しない"]
  SOLID --> DIP["D: Dependency Inversion\\n依存性逆転原則\\n抽象に依存し具体に依存しない"]
  style SOLID fill:#1e3a5f,color:#93c5fd
  style SRP fill:#7f1d1d,color:#fca5a5
  style OCP fill:#1e3a5f,color:#93c5fd
  style LSP fill:#14532d,color:#86efac
  style ISP fill:#78350f,color:#fcd34d
  style DIP fill:#4c1d95,color:#c4b5fd`}
              />
              <p className="mermaid-caption">図8. SOLID 原則の全体像</p>
            </div>

            {/* S */}
            <div className="solid-card" style={{ marginBottom: 32 }}>
              <div
                className="solid-letter"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #f87171)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                S
              </div>
              <div className="solid-name">単一責任原則</div>
              <div className="solid-sub">Single Responsibility Principle</div>
              <div className="callout callout-quote">
                <span className="callout-icon">💬</span>
                <div className="callout-body">
                  「クラスを変更する理由は、ただ一つであるべきだ」— Robert C. Martin
                </div>
              </div>
              <p>
                1つのクラスは1つのことだけを担当すること。複数の理由でクラスが変わるなら、それは分割すべきサインです。
              </p>
              <div className="mermaid-wrapper fade-in">
                <MermaidDiagram
                  chart={`graph LR
  subgraph BAD["❌ SRP 違反"]
    GOD["UserManager\\n─────────────\\nユーザー認証\\nDB保存・取得\\nメール送信\\nCSVレポート生成"]
  end
  subgraph GOOD["✅ SRP 準拠"]
    AUTH["AuthService\\n認証のみ"]
    REPO["UserRepository\\nDB操作のみ"]
    EMAIL["EmailService\\nメール送信のみ"]
    REPORT["ReportGenerator\\nレポートのみ"]
  end
  style GOD fill:#7f1d1d,color:#fca5a5
  style AUTH fill:#14532d,color:#86efac
  style REPO fill:#14532d,color:#86efac
  style EMAIL fill:#14532d,color:#86efac
  style REPORT fill:#14532d,color:#86efac`}
                />
                <p className="mermaid-caption">図9. SRP 違反 vs 準拠</p>
              </div>
              <div className="compare-grid">
                <div className="compare-bad">
                  <div className="code-block">
                    <div className="code-header">
                      <span className="code-lang">❌ SRP 違反</span>
                    </div>
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: `<span class="kw">class</span> <span class="fn">UserManager</span>:
    <span class="cm"># 認証・DB・メール・レポート</span>
    <span class="cm"># すべてを1クラスが担当 ← NG</span>
    <span class="kw">def</span> <span class="fn">authenticate</span>(self, email, pw): ...
    <span class="kw">def</span> <span class="fn">save_to_db</span>(self, user): ...
    <span class="kw">def</span> <span class="fn">send_welcome_email</span>(self, user): ...
    <span class="kw">def</span> <span class="fn">generate_csv_report</span>(self) -&gt; str: ...`,
                      }}
                    />
                  </div>
                </div>
                <div className="compare-good">
                  <div className="code-block">
                    <div className="code-header">
                      <span className="code-lang">✅ SRP 準拠</span>
                    </div>
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: `<span class="kw">class</span> <span class="fn">AuthService</span>:          <span class="cm"># 認証のみ</span>
    <span class="kw">def</span> <span class="fn">authenticate</span>(self, email, pw): ...

<span class="kw">class</span> <span class="fn">UserRepository</span>:      <span class="cm"># DB操作のみ</span>
    <span class="kw">def</span> <span class="fn">save</span>(self, user): ...

<span class="kw">class</span> <span class="fn">EmailService</span>:        <span class="cm"># メール送信のみ</span>
    <span class="kw">def</span> <span class="fn">send_welcome</span>(self, user): ...

<span class="kw">class</span> <span class="fn">ReportGenerator</span>:     <span class="cm"># レポートのみ</span>
    <span class="kw">def</span> <span class="fn">generate_csv</span>(self) -&gt; str: ...`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* O */}
            <div className="solid-card" style={{ marginBottom: 32 }}>
              <div
                className="solid-letter"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                O
              </div>
              <div className="solid-name">開放閉鎖原則</div>
              <div className="solid-sub">Open/Closed Principle</div>
              <div className="callout callout-quote">
                <span className="callout-icon">💬</span>
                <div className="callout-body">
                  「拡張に対して開かれており、修正に対して閉じていなければならない」
                </div>
              </div>
              <p>
                新しい機能を追加するとき、既存のコードを変更せず
                <strong>新しいクラスを追加するだけ</strong>で済むように設計します。
              </p>
              <div className="mermaid-wrapper fade-in">
                <MermaidDiagram
                  chart={`flowchart TD
  IF_PAY["PaymentProcessor\\n（インターフェース）\\nprocess() を定義"]
  CREDIT["CreditCardProcessor\\nprocess() を実装"]
  PAYPAL["PayPalProcessor\\nprocess() を実装"]
  CRYPTO["CryptoProcessor\\nprocess() を実装\\n← 既存コード変更なしで追加"]
  CREDIT -->|"implements"| IF_PAY
  PAYPAL -->|"implements"| IF_PAY
  CRYPTO -->|"implements"| IF_PAY
  style IF_PAY fill:#1e3a5f,color:#93c5fd
  style CREDIT fill:#14532d,color:#86efac
  style PAYPAL fill:#14532d,color:#86efac
  style CRYPTO fill:#14532d,color:#86efac`}
                />
                <p className="mermaid-caption">
                  図10. OCP — 新しい支払い方法を既存コード修正なしで追加
                </p>
              </div>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">PYTHON</span>
                  <span className="code-label">OCP の実装例</span>
                </div>
                <pre
                  dangerouslySetInnerHTML={{
                    __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod


<span class="kw">class</span> <span class="fn">PaymentProcessor</span>(ABC):
    <span class="st">"""支払い処理の抽象（変更に閉じている）"""</span>

    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">process</span>(self, amount: float) -&gt; bool: ...


<span class="kw">class</span> <span class="fn">CreditCardProcessor</span>(PaymentProcessor):
    <span class="kw">def</span> <span class="fn">process</span>(self, amount: float) -&gt; bool:
        print(f<span class="st">"クレジットカードで {amount}円 を処理"</span>)
        <span class="kw">return</span> <span class="kw">True</span>


<span class="kw">class</span> <span class="fn">PayPalProcessor</span>(PaymentProcessor):
    <span class="kw">def</span> <span class="fn">process</span>(self, amount: float) -&gt; bool:
        print(f<span class="st">"PayPal で {amount}円 を処理"</span>)
        <span class="kw">return</span> <span class="kw">True</span>


<span class="cm"># ✅ 新しい支払い方法は「追加するだけ」（既存コードを一切修正しない）</span>
<span class="kw">class</span> <span class="fn">CryptoProcessor</span>(PaymentProcessor):
    <span class="kw">def</span> <span class="fn">process</span>(self, amount: float) -&gt; bool:
        print(f<span class="st">"暗号通貨で {amount}円 を処理"</span>)
        <span class="kw">return</span> <span class="kw">True</span>


<span class="cm"># 呼び出し元は変更不要</span>
<span class="kw">def</span> <span class="fn">checkout</span>(processor: PaymentProcessor, amount: float):
    processor.process(amount)`,
                  }}
                />
              </div>
            </div>

            {/* L */}
            <div className="solid-card" style={{ marginBottom: 32 }}>
              <div
                className="solid-letter"
                style={{
                  background: "linear-gradient(135deg, #10b981, #34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                L
              </div>
              <div className="solid-name">リスコフ置換原則</div>
              <div className="solid-sub">Liskov Substitution Principle</div>
              <div className="callout callout-quote">
                <span className="callout-icon">💬</span>
                <div className="callout-body">
                  「派生クラスは、その基底クラスと置換可能でなければならない」— Barbara Liskov
                </div>
              </div>
              <p>
                サブクラスを使っているコードが、親クラスに差し替えても正常に動作しなければなりません。
                「ペンギンは鳥だが飛べない」は LSP 違反の典型例です。
              </p>
              <div className="mermaid-wrapper fade-in">
                <MermaidDiagram
                  chart={`graph TD
  subgraph LSP_BAD["❌ LSP 違反"]
    BIRD_NG["Bird\\nfly() を持つ"]
    PENGUIN_NG["Penguin\\nfly() → 例外を投げる！"]
    BIRD_NG --> PENGUIN_NG
  end
  subgraph LSP_FIX["✅ 修正後の設計"]
    ANIMAL["Animal（基底）"]
    FLYABLE["FlyableAnimal\\nfly() を持つ"]
    SPARROW2["Sparrow\\nfly() → 正常に飛ぶ"]
    PENGUIN2["Penguin\\nswim() のみ（fly なし）"]
    ANIMAL --> FLYABLE
    FLYABLE --> SPARROW2
    ANIMAL --> PENGUIN2
  end
  style PENGUIN_NG fill:#7f1d1d,color:#fca5a5
  style SPARROW2 fill:#14532d,color:#86efac
  style PENGUIN2 fill:#14532d,color:#86efac`}
                />
                <p className="mermaid-caption">図11. LSP 違反と修正後の設計</p>
              </div>
              <div className="compare-grid">
                <div className="compare-bad">
                  <div className="code-block">
                    <div className="code-header">
                      <span className="code-lang">❌ LSP 違反</span>
                    </div>
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: `<span class="kw">class</span> <span class="fn">Bird</span>:
    <span class="kw">def</span> <span class="fn">fly</span>(self): <span class="kw">return</span> <span class="st">"飛んでいます"</span>

<span class="kw">class</span> <span class="fn">Penguin</span>(Bird):
    <span class="kw">def</span> <span class="fn">fly</span>(self):
        <span class="kw">raise</span> NotImplementedError(
            <span class="st">"ペンギンは飛べません！"</span>
        )  <span class="cm"># ← 置き換えると壊れる</span>`,
                      }}
                    />
                  </div>
                </div>
                <div className="compare-good">
                  <div className="code-block">
                    <div className="code-header">
                      <span className="code-lang">✅ LSP 準拠</span>
                    </div>
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: `<span class="kw">class</span> <span class="fn">Animal</span>(ABC): <span class="kw">pass</span>

<span class="kw">class</span> <span class="fn">FlyableAnimal</span>(Animal, ABC):
    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">fly</span>(self) -&gt; str: ...

<span class="kw">class</span> <span class="fn">Sparrow</span>(FlyableAnimal):
    <span class="kw">def</span> <span class="fn">fly</span>(self) -&gt; str:
        <span class="kw">return</span> <span class="st">"スズメが飛んでいます"</span>

<span class="kw">class</span> <span class="fn">Penguin</span>(Animal):  <span class="cm"># Flyable を継承しない</span>
    <span class="kw">def</span> <span class="fn">swim</span>(self) -&gt; str:
        <span class="kw">return</span> <span class="st">"ペンギンが泳いでいます"</span>`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* I */}
            <div className="solid-card" style={{ marginBottom: 32 }}>
              <div
                className="solid-letter"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                I
              </div>
              <div className="solid-name">インターフェース分離原則</div>
              <div className="solid-sub">Interface Segregation Principle</div>
              <div className="callout callout-quote">
                <span className="callout-icon">💬</span>
                <div className="callout-body">
                  「クライアントが使用しないメソッドへの依存を強制してはならない」
                </div>
              </div>
              <p>大きな1つのインターフェースより、小さな複数のインターフェースに分割しましょう。</p>
              <div className="mermaid-wrapper fade-in">
                <MermaidDiagram
                  chart={`graph LR
  subgraph BAD_ISP["❌ 巨大インターフェース"]
    FAT["Worker\\nwork()\\neat()\\nsleep()\\ncharge_battery()\\ntake_vacation()"]
    ROBOT_BAD["Robot\\neat()・sleep() 不要なのに実装強制"]
    FAT --> ROBOT_BAD
  end
  subgraph GOOD_ISP["✅ 小さなインターフェース群"]
    W["Workable\\nwork()"]
    E["Eatable\\neat() sleep()"]
    C["Chargeable\\ncharge_battery()"]
    H_OK["Human\\nWorkable + Eatable"]
    R_OK["Robot\\nWorkable + Chargeable"]
    W --> H_OK
    E --> H_OK
    W --> R_OK
    C --> R_OK
  end
  style ROBOT_BAD fill:#7f1d1d,color:#fca5a5
  style H_OK fill:#14532d,color:#86efac
  style R_OK fill:#14532d,color:#86efac`}
                />
                <p className="mermaid-caption">図12. ISP — 巨大インターフェースを小さく分割</p>
              </div>
            </div>

            {/* D */}
            <div className="solid-card">
              <div
                className="solid-letter"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                D
              </div>
              <div className="solid-name">依存性逆転原則</div>
              <div className="solid-sub">Dependency Inversion Principle</div>
              <div className="callout callout-quote">
                <span className="callout-icon">💬</span>
                <div className="callout-body">
                  「上位モジュールは下位モジュールに依存してはならない。両者は抽象に依存すべきだ」
                </div>
              </div>
              <p>
                上位の業務ロジック（<code>OrderService</code>）が、下位の技術的詳細（
                <code>MySQLDatabase</code>）に直接依存すると、
                DBを変えるたびにビジネスロジックを修正することになります。抽象（インターフェース）を介することで疎結合を実現します。
              </p>
              <div className="mermaid-wrapper fade-in">
                <MermaidDiagram
                  chart={`graph TD
  subgraph BAD_DIP["❌ DIP 違反（具体に依存）"]
    HIGH_BAD["OrderService（上位）"] -->|"直接依存"| LOW_BAD["MySQLDatabase（下位）"]
  end
  subgraph GOOD_DIP["✅ DIP 準拠（抽象に依存）"]
    HIGH_GOOD["OrderService（上位）"]
    INTERFACE["OrderRepository\\n（抽象インターフェース）"]
    MYSQL["MySQLOrderRepo\\n（具体実装A）"]
    POSTGRES["PostgreSQLOrderRepo\\n（具体実装B）"]
    HIGH_GOOD -->|"依存"| INTERFACE
    MYSQL -->|"implements"| INTERFACE
    POSTGRES -->|"implements"| INTERFACE
  end
  style HIGH_BAD fill:#7f1d1d,color:#fca5a5
  style LOW_BAD fill:#7f1d1d,color:#fca5a5
  style HIGH_GOOD fill:#14532d,color:#86efac
  style INTERFACE fill:#1e3a5f,color:#93c5fd
  style MYSQL fill:#14532d,color:#86efac
  style POSTGRES fill:#14532d,color:#86efac`}
                />
                <p className="mermaid-caption">
                  図13. DIP — 上位は抽象に依存、具体実装は差し替え可能
                </p>
              </div>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">PYTHON</span>
                  <span className="code-label">DIP の実装例 — 依存性注入</span>
                </div>
                <pre
                  dangerouslySetInnerHTML={{
                    __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod


<span class="kw">class</span> <span class="fn">OrderRepository</span>(ABC):
    <span class="st">"""抽象（インターフェース）"""</span>
    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">save</span>(self, order) -&gt; <span class="kw">None</span>: ...
    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">find_by_id</span>(self, order_id: str): ...


<span class="cm"># ✅ 上位モジュール：抽象にのみ依存</span>
<span class="kw">class</span> <span class="fn">OrderService</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, repository: OrderRepository):  <span class="cm"># 抽象を受け取る</span>
        self._repo = repository

    <span class="kw">def</span> <span class="fn">place_order</span>(self, customer_id: str, items: list):
        order = {<span class="st">"id"</span>: <span class="st">"ORD-001"</span>, <span class="st">"customer_id"</span>: customer_id, <span class="st">"items"</span>: items}
        self._repo.save(order)
        <span class="kw">return</span> order


<span class="cm"># 下位モジュール：抽象を実装</span>
<span class="kw">class</span> <span class="fn">MySQLOrderRepository</span>(OrderRepository):
    <span class="kw">def</span> <span class="fn">save</span>(self, order) -&gt; <span class="kw">None</span>:
        print(f<span class="st">"MySQL に保存: {order}"</span>)
    <span class="kw">def</span> <span class="fn">find_by_id</span>(self, order_id: str):
        <span class="kw">return</span> {<span class="st">"id"</span>: order_id}


<span class="kw">class</span> <span class="fn">InMemoryOrderRepository</span>(OrderRepository):
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self._store = {}
    <span class="kw">def</span> <span class="fn">save</span>(self, order) -&gt; <span class="kw">None</span>:
        self._store[order[<span class="st">"id"</span>]] = order
    <span class="kw">def</span> <span class="fn">find_by_id</span>(self, order_id: str):
        <span class="kw">return</span> self._store.get(order_id)


<span class="cm"># 本番：MySQL を使用</span>
service = OrderService(MySQLOrderRepository())

<span class="cm"># テスト：インメモリに差し替え（DBなしでテスト可能）</span>
test_service = OrderService(InMemoryOrderRepository())`,
                  }}
                />
              </div>
            </div>
          </section>

          {/* ═══════ SECTION 4: クラスとオブジェクトの設計 ═══════ */}
          <section className="section" id="sec4">
            <div className="section-header">
              <span className="section-num">04</span>
              <h2>クラスとオブジェクトの設計</h2>
            </div>

            <p>
              良いクラス設計は、単に機能を動かすだけでなく、変更のコストを最小化し、
              コードを自己文書化（読めばわかる状態）にします。
            </p>

            <h3>クラスの構成要素</h3>
            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`classDiagram
  class Product {
    -String _id
    -String _name
    -Money _price
    -int _stock_count
    +reserve(quantity) void
    +restock(quantity) void
    +is_available() bool
    +stock_count() int
  }
  class Money {
    -Decimal _amount
    -String _currency
    +add(other) Money
    +multiply(factor) Money
    +apply_discount(rate) Money
    +__str__() String
  }
  Product --> Money : uses`}
              />
              <p className="mermaid-caption">
                図14. Product クラスの設計：フィールド・メソッド・値オブジェクトの連携
              </p>
            </div>

            <h3>クラス設計の7原則</h3>
            <div className="steps">
              <div className="step-item">
                <div
                  className="step-num"
                  style={{
                    background: "rgba(0,229,255,0.12)",
                    color: "var(--accent)",
                    border: "2px solid var(--accent)",
                  }}
                >
                  1
                </div>
                <div className="step-content">
                  <div className="step-title">意図を名前で表現する</div>
                  <div className="step-desc">
                    <code>UserAuthenticator</code>（認証）、<code>OrderValidator</code>
                    （検証）など、クラス名だけで役割がわかるように命名する。動詞＋名詞のパターンが有効。
                  </div>
                </div>
              </div>
              <div className="step-item">
                <div
                  className="step-num"
                  style={{
                    background: "rgba(52,211,153,0.12)",
                    color: "var(--accent3)",
                    border: "2px solid var(--accent3)",
                  }}
                >
                  2
                </div>
                <div className="step-content">
                  <div className="step-title">コンストラクタで整合性を保証する</div>
                  <div className="step-desc">
                    不正な状態のオブジェクトを作らせない。バリデーションロジックを{" "}
                    <code>__init__</code> または <code>__post_init__</code>{" "}
                    に集約する（フェイルファスト設計）。
                  </div>
                </div>
              </div>
              <div className="step-item">
                <div
                  className="step-num"
                  style={{
                    background: "rgba(167,139,250,0.12)",
                    color: "var(--accent2)",
                    border: "2px solid var(--accent2)",
                  }}
                >
                  3
                </div>
                <div className="step-content">
                  <div className="step-title">不変条件（Invariant）を守る</div>
                  <div className="step-desc">
                    操作前後で常に成立すべき条件（例：残高は0以上）をメソッド内で必ず検証し、クラスの整合性を自分で維持する。
                  </div>
                </div>
              </div>
              <div className="step-item">
                <div
                  className="step-num"
                  style={{
                    background: "rgba(251,191,36,0.12)",
                    color: "var(--warning)",
                    border: "2px solid var(--warning)",
                  }}
                >
                  4
                </div>
                <div className="step-content">
                  <div className="step-title">副作用を最小化する</div>
                  <div className="step-desc">
                    可能な限り純粋関数（同じ入力→同じ出力）を使い、メソッドが何を変更するかを明示する。イミュータブルオブジェクトを積極的に活用する。
                  </div>
                </div>
              </div>
              <div className="step-item">
                <div
                  className="step-num"
                  style={{
                    background: "rgba(249,115,22,0.12)",
                    color: "#fb923c",
                    border: "2px solid #fb923c",
                  }}
                >
                  5
                </div>
                <div className="step-content">
                  <div className="step-title">小さく保つ（SRP）</div>
                  <div className="step-desc">
                    1クラス＝1責務。目安として200行を超えたら分割を検討する。「このクラスを変更する理由は何か？」と問いかける。
                  </div>
                </div>
              </div>
              <div className="step-item">
                <div
                  className="step-num"
                  style={{
                    background: "rgba(59,130,246,0.12)",
                    color: "#60a5fa",
                    border: "2px solid #60a5fa",
                  }}
                >
                  6
                </div>
                <div className="step-content">
                  <div className="step-title">テストしやすい設計</div>
                  <div className="step-desc">
                    依存性注入（DI）を使い、外部依存をモックに差し替えられるようにする。テストが難しいなら設計に問題がある可能性が高い。
                  </div>
                </div>
              </div>
              <div className="step-item">
                <div
                  className="step-num"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    color: "var(--accent3)",
                    border: "2px solid var(--accent3)",
                  }}
                >
                  7
                </div>
                <div className="step-content">
                  <div className="step-title">適切な可視性を設定する</div>
                  <div className="step-desc">
                    Python では <code>__name</code>（private）→ <code>_name</code>（protected）→{" "}
                    <code>name</code>（public）の順に。迷ったら private
                    から始めて必要に応じて公開する。
                  </div>
                </div>
              </div>
            </div>

            <h3>値オブジェクト（Value Object）パターン</h3>
            <p>
              値オブジェクトは、
              <strong>ID を持たず・値の等価性で判断される・イミュータブルなオブジェクト</strong>
              です。
              金額・日付範囲・住所・メールアドレスなど、単なる文字列や数値ではなくドメイン概念として表現するのがベストプラクティスです。
            </p>

            <div className="callout callout-tip">
              <span className="callout-icon">✅</span>
              <div className="callout-body">
                <strong>いつ値オブジェクトを使うか？</strong>
                「この値に対してバリデーションが必要か？」「この値で計算や比較を行うか？」どちらかが
                Yes なら値オブジェクトにする。
              </div>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">Money 値オブジェクトの完全実装</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal


<span class="kw">@dataclass</span>(frozen=<span class="kw">True</span>)  <span class="cm"># frozen=True → イミュータブル（変更不可）</span>
<span class="kw">class</span> <span class="fn">Money</span>:
    <span class="st">"""金額を表す値オブジェクト"""</span>
    amount: Decimal
    currency: str = <span class="st">"JPY"</span>

    <span class="kw">def</span> <span class="fn">__post_init__</span>(self):
        <span class="cm"># コンストラクタでバリデーション</span>
        <span class="kw">if</span> self.amount &lt; <span class="nu">0</span>:
            <span class="kw">raise</span> ValueError(f<span class="st">"金額は0以上: {self.amount}"</span>)
        <span class="kw">if</span> <span class="kw">not</span> self.currency:
            <span class="kw">raise</span> ValueError(<span class="st">"通貨コードは必須です"</span>)

    <span class="kw">def</span> <span class="fn">add</span>(self, other: <span class="st">"Money"</span>) -&gt; <span class="st">"Money"</span>:
        <span class="st">"""加算：新しい Money を返す（自身は変更しない）"""</span>
        self._assert_same_currency(other)
        <span class="kw">return</span> Money(self.amount + other.amount, self.currency)

    <span class="kw">def</span> <span class="fn">multiply</span>(self, factor: int) -&gt; <span class="st">"Money"</span>:
        <span class="kw">return</span> Money(self.amount * factor, self.currency)

    <span class="kw">def</span> <span class="fn">apply_discount</span>(self, rate: Decimal) -&gt; <span class="st">"Money"</span>:
        <span class="st">"""割引適用（0.0〜1.0 の割引率）"""</span>
        <span class="kw">if</span> <span class="kw">not</span> Decimal(<span class="st">"0"</span>) &lt;= rate &lt;= Decimal(<span class="st">"1"</span>):
            <span class="kw">raise</span> ValueError(f<span class="st">"割引率は 0〜1: {rate}"</span>)
        <span class="kw">return</span> Money(self.amount * (<span class="nu">1</span> - rate), self.currency)

    <span class="kw">def</span> <span class="fn">_assert_same_currency</span>(self, other: <span class="st">"Money"</span>) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> self.currency != other.currency:
            <span class="kw">raise</span> ValueError(f<span class="st">"通貨が一致しません: {self.currency} vs {other.currency}"</span>)

    <span class="kw">def</span> <span class="fn">__str__</span>(self) -&gt; str:
        <span class="kw">return</span> f<span class="st">"{self.amount:,.0f} {self.currency}"</span>


<span class="cm"># 使い方</span>
price = Money(Decimal(<span class="st">"1000"</span>))
tax   = Money(Decimal(<span class="st">"100"</span>))
total = price.add(tax)
print(total)               <span class="cm"># 1,100 JPY</span>

price2 = Money(Decimal(<span class="st">"1000"</span>))
print(price == price2)     <span class="cm"># True  — 値が同じなら等しい</span>
print(price == total)      <span class="cm"># False — 値が異なれば不等しい</span>

discounted = total.apply_discount(Decimal(<span class="st">"0.1"</span>))
print(discounted)          <span class="cm"># 990 JPY</span>`,
                }}
              />
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>比較項目</th>
                    <th>エンティティ（Entity）</th>
                    <th>値オブジェクト（Value Object）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>同一性の判断</td>
                    <td>ID（識別子）で判断</td>
                    <td>値（フィールド全体）で判断</td>
                  </tr>
                  <tr>
                    <td>可変性</td>
                    <td>可変（状態が変化する）</td>
                    <td>不変（変更時は新しいオブジェクトを返す）</td>
                  </tr>
                  <tr>
                    <td>ライフサイクル</td>
                    <td>長い（DBに永続化される）</td>
                    <td>短い（計算のたびに生成される）</td>
                  </tr>
                  <tr>
                    <td>例</td>
                    <td>User, Order, Product</td>
                    <td>Money, Email, Address, DateRange</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════ SECTION 5: 継承の正しい使い方 ═══════ */}
          <section className="section" id="sec5">
            <div className="section-header">
              <span className="section-num">05</span>
              <h2>継承の正しい使い方</h2>
            </div>

            <p>
              継承は強力ですが、<strong>誤った使い方が最も多い OOP の機能</strong>でもあります。
              「コードの再利用」のために継承を使うのは間違いで、
              <strong>is-a 関係を表現するため</strong>にのみ使うのが原則です。
            </p>

            <div className="callout callout-warn">
              <span className="callout-icon">⚠️</span>
              <div className="callout-body">
                <strong>継承の落とし穴</strong>
                継承は親クラスと子クラスを強く結合させます。親クラスの変更が、すべての子クラスに影響します。
                「has-a（〜を持つ）」関係には必ずコンポジションを使いましょう。
              </div>
            </div>

            <h3>継承 vs コンポジション — 選択フロー</h3>
            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`flowchart TD
  Q1{"この関係は\\nis-a か？"}
  Q2{"親クラスを完全に\\n置き換えられるか？\\nLSP 準拠？"}
  Q3{"継承ツリーが\\n3階層以下か？"}
  USE_INHERIT["✅ 継承を使う\\nDog extends Animal"]
  USE_COMPOSE["✅ コンポジションを使う\\nCar has Engine"]
  Q1 -->|"Yes (is-a)"| Q2
  Q1 -->|"No (has-a)"| USE_COMPOSE
  Q2 -->|"Yes"| Q3
  Q2 -->|"No"| USE_COMPOSE
  Q3 -->|"Yes"| USE_INHERIT
  Q3 -->|"No"| USE_COMPOSE
  style USE_INHERIT fill:#14532d,color:#86efac
  style USE_COMPOSE fill:#1e3a5f,color:#93c5fd`}
              />
              <p className="mermaid-caption">図15. 継承とコンポジションの選択フローチャート</p>
            </div>

            <h3>Mixin パターン（推奨）</h3>
            <p>
              Mixin は「単一の機能を提供する小さなクラス」です。多重継承の問題を避けつつ、
              複数の機能を組み合わせることができます。
            </p>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">Mixin パターンの実装</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">class</span> <span class="fn">LoggingMixin</span>:
    <span class="st">"""ロギング機能を追加する Mixin"""</span>
    <span class="kw">def</span> <span class="fn">log</span>(self, message: str) -&gt; <span class="kw">None</span>:
        print(f<span class="st">"[{self.__class__.__name__}] {message}"</span>)


<span class="kw">class</span> <span class="fn">SerializableMixin</span>:
    <span class="st">"""シリアライズ機能を追加する Mixin"""</span>
    <span class="kw">def</span> <span class="fn">to_dict</span>(self) -&gt; dict:
        <span class="kw">return</span> {k: v <span class="kw">for</span> k, v <span class="kw">in</span> self.__dict__.items()
                <span class="kw">if</span> <span class="kw">not</span> k.startswith(<span class="st">"_"</span>)}


<span class="kw">class</span> <span class="fn">ValidatableMixin</span>:
    <span class="st">"""バリデーション機能を追加する Mixin"""</span>
    <span class="kw">def</span> <span class="fn">validate</span>(self) -&gt; bool:
        <span class="kw">return</span> all(
            getattr(self, field) <span class="kw">is</span> <span class="kw">not</span> <span class="kw">None</span>
            <span class="kw">for</span> field <span class="kw">in</span> getattr(self, <span class="st">"required_fields"</span>, [])
        )


<span class="cm"># ✅ Mixin を組み合わせてクラスを構成（多重継承を安全に活用）</span>
<span class="kw">class</span> <span class="fn">User</span>(LoggingMixin, SerializableMixin, ValidatableMixin):
    required_fields = [<span class="st">"name"</span>, <span class="st">"email"</span>]

    <span class="kw">def</span> <span class="fn">__init__</span>(self, name: str, email: str):
        self.name = name
        self.email = email

    <span class="kw">def</span> <span class="fn">register</span>(self) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> self.validate():
            self.log(f<span class="st">"ユーザー登録: {self.name}"</span>)
        <span class="kw">else</span>:
            self.log(<span class="st">"バリデーション失敗"</span>)


user = User(<span class="st">"山田太郎"</span>, <span class="st">"yamada@example.com"</span>)
user.register()           <span class="cm"># [User] ユーザー登録: 山田太郎</span>
print(user.to_dict())     <span class="cm"># {'name': '山田太郎', 'email': 'yamada@example.com'}</span>`,
                }}
              />
            </div>

            <h3>コンポジション over 継承（推奨パターン）</h3>
            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph LR
  subgraph INHERIT_DEEP["❌ 深い継承（避けるべき）"]
    V["Vehicle"] --> MV["MotorVehicle"]
    MV --> CAR["Car"]
    CAR --> SEDAN["Sedan"]
    SEDAN --> LUXURY["LuxurySedan（変更困難）"]
  end
  subgraph COMPOSE["✅ コンポジション（推奨）"]
    CAR2["Car"]
    ENGINE["Engine"]
    TRANS["Transmission"]
    AUDIO["AudioSystem"]
    NAV["Navigation"]
    CAR2 --> ENGINE
    CAR2 --> TRANS
    CAR2 --> AUDIO
    CAR2 --> NAV
  end
  style LUXURY fill:#7f1d1d,color:#fca5a5
  style CAR2 fill:#14532d,color:#86efac`}
              />
              <p className="mermaid-caption">図16. 深い継承ツリー vs コンポジション</p>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">コンポジション — has-a 関係で機能を組み合わせる</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">class</span> <span class="fn">Engine</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, horsepower: int):
        self.horsepower = horsepower
    <span class="kw">def</span> <span class="fn">start</span>(self) -&gt; str:
        <span class="kw">return</span> f<span class="st">"{self.horsepower}馬力エンジン始動"</span>


<span class="kw">class</span> <span class="fn">AudioSystem</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, brand: str):
        self.brand = brand
    <span class="kw">def</span> <span class="fn">play</span>(self, song: str) -&gt; str:
        <span class="kw">return</span> f<span class="st">"{self.brand} で「{song}」を再生中"</span>


<span class="kw">class</span> <span class="fn">Car</span>:
    <span class="st">"""コンポジション：has-a 関係で機能を組み合わせた Car クラス"""</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self, model: str, engine: Engine, audio: AudioSystem):
        self.model = model
        self._engine = engine   <span class="cm"># has-a（エンジンを持つ）</span>
        self._audio = audio     <span class="cm"># has-a（音響システムを持つ）</span>

    <span class="kw">def</span> <span class="fn">start</span>(self) -&gt; str:
        <span class="kw">return</span> f<span class="st">"{self.model}: {self._engine.start()}"</span>

    <span class="kw">def</span> <span class="fn">play_music</span>(self, song: str) -&gt; str:
        <span class="kw">return</span> self._audio.play(song)


<span class="cm"># エンジンや音響をいつでも差し替えられる</span>
car = Car(<span class="st">"プリウス"</span>, Engine(<span class="nu">120</span>), AudioSystem(<span class="st">"Pioneer"</span>))
print(car.start())              <span class="cm"># プリウス: 120馬力エンジン始動</span>
print(car.play_music(<span class="st">"JPop"</span>))  <span class="cm"># Pioneer で「JPop」を再生中</span>`,
                }}
              />
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ケース</th>
                    <th>使うべき手法</th>
                    <th>理由</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>犬は動物である（is-a）</td>
                    <td>
                      <span className="tag tag-good">継承</span>
                    </td>
                    <td>明確な is-a 関係で、LSP を満たせる</td>
                  </tr>
                  <tr>
                    <td>車はエンジンを持つ（has-a）</td>
                    <td>
                      <span className="tag tag-info">コンポジション</span>
                    </td>
                    <td>has-a 関係は継承で表現すべきでない</td>
                  </tr>
                  <tr>
                    <td>複数の機能を組み合わせたい</td>
                    <td>
                      <span className="tag tag-info">Mixin</span>
                    </td>
                    <td>多重継承の問題を避けられる</td>
                  </tr>
                  <tr>
                    <td>継承ツリーが3階層を超えた</td>
                    <td>
                      <span className="tag tag-good">コンポジション</span>
                    </td>
                    <td>深い継承は変更コストが爆発的に増大する</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════ SECTION 6: インターフェースと抽象クラス ═══════ */}
          <section className="section" id="sec6">
            <div className="section-header">
              <span className="section-num">06</span>
              <h2>インターフェースと抽象クラス</h2>
            </div>

            <p>
              インターフェースと抽象クラスはどちらも「実装を強制する仕組み」ですが、用途が異なります。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph TD
  subgraph INTERFACE["🔌 インターフェース\\nABC + 抽象メソッドのみ"]
    IF_DEF["契約を定義\\n実装は持たない\\n多重実装が可能\\n例: Serializable, Printable"]
  end
  subgraph ABSTRACT["🏗️ 抽象クラス\\nABC"]
    ABS_DEF["部分的な実装を持てる\\nテンプレートメソッド可\\n共通状態を持てる\\n例: Animal, Shape"]
  end
  subgraph CONCRETE["💻 具体クラス"]
    CON_DEF["すべて実装済み\\nインスタンス化可能\\n実際の処理を行う"]
  end
  INTERFACE --> CONCRETE
  ABSTRACT --> CONCRETE
  style INTERFACE fill:#4c1d95,color:#c4b5fd
  style ABSTRACT fill:#1e3a5f,color:#93c5fd
  style CONCRETE fill:#14532d,color:#86efac`}
              />
              <p className="mermaid-caption">
                図17. インターフェース・抽象クラス・具体クラスの関係
              </p>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>観点</th>
                    <th>インターフェース（Python: ABC + 抽象メソッドのみ）</th>
                    <th>抽象クラス（Python: ABC）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>目的</td>
                    <td>契約（Contract）— 何ができるかを定義</td>
                    <td>共通実装を提供しつつ一部を委譲</td>
                  </tr>
                  <tr>
                    <td>実装</td>
                    <td>実装を持たない</td>
                    <td>部分的な実装を持てる</td>
                  </tr>
                  <tr>
                    <td>多重実装</td>
                    <td>複数実装が可能</td>
                    <td>複数継承は可能だが注意が必要</td>
                  </tr>
                  <tr>
                    <td>状態</td>
                    <td>フィールドを持たない（原則）</td>
                    <td>共通のフィールドを持てる</td>
                  </tr>
                  <tr>
                    <td>代表例</td>
                    <td>
                      <code>Serializable</code>, <code>Printable</code>
                    </td>
                    <td>
                      <code>Animal</code>, <code>Shape</code>, <code>BaseRepository</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>テンプレートメソッドパターン（抽象クラスの活用）</h3>
            <p>
              処理の骨格（フロー）を親クラスで定義し、各ステップの具体的な実装をサブクラスに委譲するパターンです。
              コードの重複を最小化しつつ、拡張ポイントを明確にできます。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`sequenceDiagram
  participant CLIENT as クライアント
  participant ABSTRACT as DataExporter（抽象）
  participant CONCRETE as CSVExporter（具体）
  CLIENT->>ABSTRACT: export(data) を呼ぶ
  ABSTRACT->>ABSTRACT: validate(data) 共通処理
  ABSTRACT->>CONCRETE: transform(data) 委譲
  CONCRETE-->>ABSTRACT: "1,2,3,4" CSV変換結果
  ABSTRACT->>CONCRETE: write(content) 委譲
  CONCRETE-->>ABSTRACT: ファイルに書き込み
  ABSTRACT->>ABSTRACT: notify_completion() 共通処理
  ABSTRACT-->>CLIENT: 完了`}
              />
              <p className="mermaid-caption">図18. テンプレートメソッドパターンのシーケンス</p>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">
                  テンプレートメソッドパターン — データエクスポート
                </span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod


<span class="kw">class</span> <span class="fn">DataExporter</span>(ABC):
    <span class="st">"""データエクスポートの骨格を定義"""</span>

    <span class="cm"># テンプレートメソッド：処理フローを固定（final に相当）</span>
    <span class="kw">def</span> <span class="fn">export</span>(self, data: list) -&gt; <span class="kw">None</span>:
        validated  = self.validate(data)    <span class="cm"># 共通処理</span>
        transformed = self.transform(validated)  <span class="cm"># ← サブクラスが実装</span>
        self.write(transformed)             <span class="cm"># ← サブクラスが実装</span>
        self.notify_completion()            <span class="cm"># デフォルト実装（必要なら上書き可）</span>

    <span class="kw">def</span> <span class="fn">validate</span>(self, data: list) -&gt; list:
        <span class="st">"""共通バリデーション（サブクラスでオーバーライド可）"""</span>
        <span class="kw">return</span> [item <span class="kw">for</span> item <span class="kw">in</span> data <span class="kw">if</span> item <span class="kw">is</span> <span class="kw">not</span> <span class="kw">None</span>]

    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">transform</span>(self, data: list) -&gt; str:
        <span class="st">"""データ変換（サブクラスで実装必須）"""</span>
        ...

    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">write</span>(self, content: str) -&gt; <span class="kw">None</span>:
        <span class="st">"""書き出し（サブクラスで実装必須）"""</span>
        ...

    <span class="kw">def</span> <span class="fn">notify_completion</span>(self) -&gt; <span class="kw">None</span>:
        print(<span class="st">"エクスポート完了"</span>)


<span class="kw">class</span> <span class="fn">CSVExporter</span>(DataExporter):
    <span class="kw">def</span> <span class="fn">transform</span>(self, data: list) -&gt; str:
        <span class="kw">return</span> <span class="st">","</span>.join(str(item) <span class="kw">for</span> item <span class="kw">in</span> data)

    <span class="kw">def</span> <span class="fn">write</span>(self, content: str) -&gt; <span class="kw">None</span>:
        print(f<span class="st">"CSV に書き込み: {content}"</span>)


<span class="kw">class</span> <span class="fn">JSONExporter</span>(DataExporter):
    <span class="kw">def</span> <span class="fn">transform</span>(self, data: list) -&gt; str:
        <span class="kw">import</span> json
        <span class="kw">return</span> json.dumps(data, ensure_ascii=<span class="kw">False</span>)

    <span class="kw">def</span> <span class="fn">write</span>(self, content: str) -&gt; <span class="kw">None</span>:
        print(f<span class="st">"JSON に書き込み: {content}"</span>)


data = [<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>, <span class="kw">None</span>, <span class="nu">4</span>]
CSVExporter().export(data)   <span class="cm"># CSV に書き込み: 1,2,3,4</span>
JSONExporter().export(data)  <span class="cm"># JSON に書き込み: [1, 2, 3, 4]</span>`,
                }}
              />
            </div>

            <h3>Protocol（構造的部分型）— Python 3.8+</h3>
            <p>
              Python の <code>Protocol</code> を使うと、ABC
              を継承しなくても「インターフェースを満たす」と見なせます。
              既存クラスに手を加えずにダックタイピングを型安全に行えます。
            </p>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">Protocol の使い方（Python 3.8+）</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> typing <span class="kw">import</span> Protocol


<span class="kw">class</span> <span class="fn">Drawable</span>(Protocol):
    <span class="st">"""Protocol: ABC を継承しなくても满たせる"""</span>
    <span class="kw">def</span> <span class="fn">draw</span>(self) -&gt; <span class="kw">None</span>: ...
    <span class="kw">def</span> <span class="fn">resize</span>(self, factor: float) -&gt; <span class="kw">None</span>: ...


<span class="cm"># ABC を継承していないが Drawable を満たす</span>
<span class="kw">class</span> <span class="fn">Circle</span>:
    <span class="kw">def</span> <span class="fn">draw</span>(self) -&gt; <span class="kw">None</span>:
        print(<span class="st">"円を描く"</span>)
    <span class="kw">def</span> <span class="fn">resize</span>(self, factor: float) -&gt; <span class="kw">None</span>:
        print(f<span class="st">"円を {factor}x にリサイズ"</span>)


<span class="cm"># 型チェッカーが Drawable として認識してくれる</span>
<span class="kw">def</span> <span class="fn">render</span>(shape: Drawable) -&gt; <span class="kw">None</span>:
    shape.draw()

render(Circle())  <span class="cm"># ✅ 動作する</span>`,
                }}
              />
            </div>
          </section>

          {/* ═══════ SECTION 7: デザインパターン ═══════ */}
          <section className="section" id="sec7">
            <div className="section-header">
              <span className="section-num">07</span>
              <h2>デザインパターン（GoF パターン）</h2>
            </div>

            <p>
              GoF（Gang of Four）が提唱した23のデザインパターンは、OOP
              における「設計の共通語彙」です。
              問題の種類に応じて適切なパターンを選択することで、保守性の高いコードを効率的に実現できます。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph TD
  DP["🎨 GoF デザインパターン 23種"]
  DP --> CREATIONAL["生成パターン\\nオブジェクトの生成に関する"]
  DP --> STRUCTURAL["構造パターン\\nクラスの構造に関する"]
  DP --> BEHAVIORAL["振る舞いパターン\\nクラスの相互作用に関する"]
  CREATIONAL --> SINGLETON["Singleton\\n1インスタンスのみ"]
  CREATIONAL --> FACTORY["Factory Method\\n生成をサブクラスに委譲"]
  CREATIONAL --> BUILDER["Builder\\n複雑オブジェクトの段階的構築"]
  STRUCTURAL --> ADAPTER["Adapter\\nIF変換アダプター"]
  STRUCTURAL --> DECORATOR["Decorator\\n機能を動的に追加"]
  STRUCTURAL --> FACADE["Facade\\n複雑さを単純なIFで隠す"]
  BEHAVIORAL --> OBSERVER["Observer\\n状態変化を自動通知"]
  BEHAVIORAL --> STRATEGY["Strategy\\nアルゴリズムを交換可能に"]
  BEHAVIORAL --> COMMAND["Command\\n処理をオブジェクト化"]
  style CREATIONAL fill:#1e3a5f,color:#93c5fd
  style STRUCTURAL fill:#14532d,color:#86efac
  style BEHAVIORAL fill:#4c1d95,color:#c4b5fd`}
              />
              <p className="mermaid-caption">図19. GoF 23パターンの分類</p>
            </div>

            <div className="pattern-grid">
              <div className="pattern-card">
                <span className="pattern-tag ptag-creational">生成パターン</span>
                <div className="p-name">🏭 Factory Method</div>
                <div className="p-desc">
                  オブジェクトの生成をサブクラスに委譲。生成ロジックを本体から分離し、OCP
                  を実現する。
                </div>
              </div>
              <div className="pattern-card">
                <span className="pattern-tag ptag-creational">生成パターン</span>
                <div className="p-name">🔧 Builder</div>
                <div className="p-desc">
                  複雑なオブジェクトを段階的に構築。コンストラクタの引数爆発（5個以上）を解消する。
                </div>
              </div>
              <div className="pattern-card">
                <span className="pattern-tag ptag-creational">生成パターン</span>
                <div className="p-name">⚡ Singleton</div>
                <div className="p-desc">
                  インスタンスを1つに限定する。設定管理・コネクションプールなど。乱用は禁物。
                </div>
              </div>
              <div className="pattern-card">
                <span className="pattern-tag ptag-structural">構造パターン</span>
                <div className="p-name">🔌 Adapter</div>
                <div className="p-desc">
                  互換性のないインターフェース間の変換器。外部ライブラリを既存コードに適合させる際に有効。
                </div>
              </div>
              <div className="pattern-card">
                <span className="pattern-tag ptag-structural">構造パターン</span>
                <div className="p-name">🎀 Decorator</div>
                <div className="p-desc">
                  機能を動的に追加。継承なしに既存クラスを拡張でき、機能のチェーンが可能。
                </div>
              </div>
              <div className="pattern-card">
                <span className="pattern-tag ptag-structural">構造パターン</span>
                <div className="p-name">🏛️ Facade</div>
                <div className="p-desc">
                  複雑なサブシステムに対してシンプルなインターフェースを提供。複雑さを一つの窓口で隠蔽。
                </div>
              </div>
              <div className="pattern-card">
                <span className="pattern-tag ptag-behavioral">振る舞いパターン</span>
                <div className="p-name">📣 Observer</div>
                <div className="p-desc">
                  状態変化を自動通知。pub/sub の基本形。疎結合なイベント駆動設計を実現する。
                </div>
              </div>
              <div className="pattern-card">
                <span className="pattern-tag ptag-behavioral">振る舞いパターン</span>
                <div className="p-name">♟️ Strategy</div>
                <div className="p-desc">
                  アルゴリズムを交換可能にする。if/elif の連鎖を排除し、OCP
                  を美しく実現する最頻出パターン。
                </div>
              </div>
              <div className="pattern-card">
                <span className="pattern-tag ptag-behavioral">振る舞いパターン</span>
                <div className="p-name">📋 Command</div>
                <div className="p-desc">
                  処理をオブジェクト化し、実行・取り消し・キューに積むことを可能にする。
                </div>
              </div>
            </div>

            <h3>Strategy パターン（最重要・最頻出）</h3>
            <p>
              if/elif の連鎖を排除し、アルゴリズムを交換可能にします。OCP の最も美しい実現例です。
            </p>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">Strategy パターン — 割引戦略</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal


<span class="kw">class</span> <span class="fn">DiscountStrategy</span>(ABC):
    <span class="st">"""割引戦略の抽象（Strategy インターフェース）"""</span>
    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">calculate</span>(self, original_price: Decimal) -&gt; Decimal: ...


<span class="kw">class</span> <span class="fn">NoDiscount</span>(DiscountStrategy):
    <span class="kw">def</span> <span class="fn">calculate</span>(self, original_price: Decimal) -&gt; Decimal:
        <span class="kw">return</span> original_price


<span class="kw">class</span> <span class="fn">PercentageDiscount</span>(DiscountStrategy):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, rate: Decimal):
        self.rate = rate
    <span class="kw">def</span> <span class="fn">calculate</span>(self, original_price: Decimal) -&gt; Decimal:
        <span class="kw">return</span> original_price * (<span class="nu">1</span> - self.rate)


<span class="kw">class</span> <span class="fn">FixedAmountDiscount</span>(DiscountStrategy):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, discount_amount: Decimal):
        self.discount_amount = discount_amount
    <span class="kw">def</span> <span class="fn">calculate</span>(self, original_price: Decimal) -&gt; Decimal:
        <span class="kw">return</span> max(Decimal(<span class="st">"0"</span>), original_price - self.discount_amount)


<span class="kw">class</span> <span class="fn">ShoppingCart</span>:
    <span class="st">"""Strategy パターン：割引戦略を実行時に差し替え可能"""</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self, strategy: DiscountStrategy = <span class="kw">None</span>):
        self._strategy = strategy <span class="kw">or</span> NoDiscount()
        self._items: list[tuple[str, Decimal]] = []

    <span class="kw">def</span> <span class="fn">set_discount_strategy</span>(self, strategy: DiscountStrategy) -&gt; <span class="kw">None</span>:
        self._strategy = strategy

    <span class="kw">def</span> <span class="fn">add_item</span>(self, name: str, price: Decimal) -&gt; <span class="kw">None</span>:
        self._items.append((name, price))

    <span class="kw">def</span> <span class="fn">total</span>(self) -&gt; Decimal:
        subtotal = sum(price <span class="kw">for</span> _, price <span class="kw">in</span> self._items)
        <span class="kw">return</span> self._strategy.calculate(subtotal)


cart = ShoppingCart()
cart.add_item(<span class="st">"Tシャツ"</span>, Decimal(<span class="st">"3000"</span>))
cart.add_item(<span class="st">"ジーンズ"</span>, Decimal(<span class="st">"8000"</span>))

print(f<span class="st">"通常価格: {cart.total()}円"</span>)       <span class="cm"># 11000円</span>
cart.set_discount_strategy(PercentageDiscount(Decimal(<span class="st">"0.1"</span>)))
print(f<span class="st">"10%割引後: {cart.total()}円"</span>)      <span class="cm"># 9900円</span>
cart.set_discount_strategy(FixedAmountDiscount(Decimal(<span class="st">"1000"</span>)))
print(f<span class="st">"1000円引き後: {cart.total()}円"</span>)   <span class="cm"># 10000円</span>`,
                }}
              />
            </div>

            <h3>Observer パターン</h3>
            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`sequenceDiagram
  participant ORDER as Order（Subject）
  participant INV as InventoryObserver
  participant EMAIL as EmailObserver
  ORDER->>ORDER: confirm() を呼ぶ
  ORDER->>ORDER: status = CONFIRMED に変更
  ORDER->>INV: notify(ORDER_CONFIRMED)
  INV->>INV: 在庫を引き当てる
  ORDER->>EMAIL: notify(ORDER_CONFIRMED)
  EMAIL->>EMAIL: 確認メールを送信`}
              />
              <p className="mermaid-caption">図20. Observer パターンのシーケンス</p>
            </div>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">Observer パターン — 注文イベント通知</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod
<span class="kw">from</span> typing <span class="kw">import</span> Any


<span class="kw">class</span> <span class="fn">Observer</span>(ABC):
    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">update</span>(self, event: str, data: Any) -&gt; <span class="kw">None</span>: ...


<span class="kw">class</span> <span class="fn">Observable</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self._observers: list[Observer] = []

    <span class="kw">def</span> <span class="fn">subscribe</span>(self, observer: Observer) -&gt; <span class="kw">None</span>:
        self._observers.append(observer)

    <span class="kw">def</span> <span class="fn">notify</span>(self, event: str, data: Any = <span class="kw">None</span>) -&gt; <span class="kw">None</span>:
        <span class="kw">for</span> observer <span class="kw">in</span> self._observers:
            observer.update(event, data)


<span class="kw">class</span> <span class="fn">Order</span>(Observable):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, order_id: str):
        super().__init__()
        self.order_id = order_id
        self._status = <span class="st">"PENDING"</span>

    <span class="kw">def</span> <span class="fn">confirm</span>(self) -&gt; <span class="kw">None</span>:
        self._status = <span class="st">"CONFIRMED"</span>
        self.notify(<span class="st">"ORDER_CONFIRMED"</span>, {<span class="st">"order_id"</span>: self.order_id})


<span class="kw">class</span> <span class="fn">InventoryObserver</span>(Observer):
    <span class="kw">def</span> <span class="fn">update</span>(self, event: str, data: Any) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> event == <span class="st">"ORDER_CONFIRMED"</span>:
            print(f<span class="st">"[在庫] 引き当て処理: {data['order_id']}"</span>)


<span class="kw">class</span> <span class="fn">EmailObserver</span>(Observer):
    <span class="kw">def</span> <span class="fn">update</span>(self, event: str, data: Any) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> event == <span class="st">"ORDER_CONFIRMED"</span>:
            print(f<span class="st">"[メール] 確認メール送信: {data['order_id']}"</span>)


order = Order(<span class="st">"ORD-001"</span>)
order.subscribe(InventoryObserver())
order.subscribe(EmailObserver())
order.confirm()
<span class="cm"># [在庫] 引き当て処理: ORD-001</span>
<span class="cm"># [メール] 確認メール送信: ORD-001</span>`,
                }}
              />
            </div>

            <h3>Decorator パターン</h3>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">Decorator パターン — テキスト処理を動的に拡張</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod


<span class="kw">class</span> <span class="fn">TextProcessor</span>(ABC):
    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">process</span>(self, text: str) -&gt; str: ...


<span class="kw">class</span> <span class="fn">PlainText</span>(TextProcessor):
    <span class="kw">def</span> <span class="fn">process</span>(self, text: str) -&gt; str:
        <span class="kw">return</span> text


<span class="kw">class</span> <span class="fn">UpperCaseDecorator</span>(TextProcessor):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, processor: TextProcessor):
        self._processor = processor
    <span class="kw">def</span> <span class="fn">process</span>(self, text: str) -&gt; str:
        <span class="kw">return</span> self._processor.process(text).upper()


<span class="kw">class</span> <span class="fn">TrimDecorator</span>(TextProcessor):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, processor: TextProcessor):
        self._processor = processor
    <span class="kw">def</span> <span class="fn">process</span>(self, text: str) -&gt; str:
        <span class="kw">return</span> self._processor.process(text).strip()


<span class="kw">class</span> <span class="fn">ExclamationDecorator</span>(TextProcessor):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, processor: TextProcessor):
        self._processor = processor
    <span class="kw">def</span> <span class="fn">process</span>(self, text: str) -&gt; str:
        <span class="kw">return</span> self._processor.process(text) + <span class="st">"!!!"</span>


<span class="cm"># Decorator をチェーン（組み合わせ）— 継承なしに機能を積み上げる</span>
text = <span class="st">"  hello world  "</span>
processor = ExclamationDecorator(
    UpperCaseDecorator(
        TrimDecorator(PlainText())
    )
)
print(processor.process(text))  <span class="cm"># HELLO WORLD!!!</span>`,
                }}
              />
            </div>

            <div className="callout callout-info">
              <span className="callout-icon">📚</span>
              <div className="callout-body">
                <strong>参考：Refactoring Guru — デザインパターン図解</strong>
                全23パターンをインタラクティブな図解で学べる最良のリソース:{" "}
                <Ext href="https://refactoring.guru/design-patterns">
                  https://refactoring.guru/design-patterns
                </Ext>
              </div>
            </div>
          </section>

          {/* ═══════ SECTION 8: アーキテクチャとの統合 ═══════ */}
          <section className="section" id="sec8">
            <div className="section-header">
              <span className="section-num">08</span>
              <h2>OOP とアーキテクチャの統合</h2>
            </div>

            <p>
              OOP の原則は、クリーンアーキテクチャや
              DDD（ドメイン駆動設計）といった上位の設計思想と深く連携しています。 SOLID 原則を守った
              OOP は、そのままクリーンアーキテクチャの各層に対応します。
            </p>

            <h3>クリーンアーキテクチャ × OOP</h3>
            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph TD
  subgraph CLEAN["クリーンアーキテクチャ × OOP"]
    subgraph DOMAIN["🧩 ドメイン層（最も純粋な OOP）"]
      ENTITIES["Entity — ビジネスルールを持つオブジェクト"]
      VALUE_OBJ["Value Object — イミュータブルな値"]
      DOMAIN_SVC["Domain Service — 横断的ビジネスロジック"]
    end
    subgraph APP["⚙️ アプリケーション層"]
      USE_CASE["UseCase — ビジネスフローを調整"]
      REPO_IF["Repository Interface（抽象） — DIP 適用"]
    end
    subgraph INFRA["🔧 インフラ層"]
      REPO_IMPL["Repository 実装 — 具体的な永続化"]
    end
  end
  APP --> DOMAIN
  INFRA -. "DIP: 抽象に向けて実装" .-> REPO_IF
  style DOMAIN fill:#14532d,stroke:#86efac,color:#86efac
  style APP fill:#78350f,stroke:#fcd34d,color:#fcd34d
  style INFRA fill:#1e3a5f,stroke:#93c5fd,color:#93c5fd`}
              />
              <p className="mermaid-caption">図21. クリーンアーキテクチャと OOP 概念の対応</p>
            </div>

            <div className="card-grid">
              <div className="principle-card pc-red">
                <span className="pc-icon">🧩</span>
                <div className="pc-title">ドメイン層（最内周）</div>
                <div className="pc-sub">純粋な OOP の世界</div>
                <div className="pc-desc">
                  Entity・ValueObject・DomainService。外部依存ゼロ。最も重要なビジネスロジックが集中する。
                </div>
              </div>
              <div className="principle-card pc-orange">
                <span className="pc-icon">⚙️</span>
                <div className="pc-title">アプリケーション層</div>
                <div className="pc-sub">ユースケースのオーケストレーション</div>
                <div className="pc-desc">
                  UseCase クラスがドメインオブジェクトを協調させる。Repository
                  インターフェース（抽象）を定義し DIP を適用。
                </div>
              </div>
              <div className="principle-card pc-blue">
                <span className="pc-icon">🔧</span>
                <div className="pc-title">インフラ層（最外周）</div>
                <div className="pc-sub">技術的詳細の実装</div>
                <div className="pc-desc">
                  Repository
                  の具体実装（MySQL・PostgreSQL）。フレームワーク・DB・外部APIと接触する唯一の層。
                </div>
              </div>
            </div>

            <h3>DDD（ドメイン駆動設計）× OOP の対応表</h3>
            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph LR
  subgraph DDD["DDD 戦術パターン"]
    E["Entity\\nIDで同一性判断"]
    VO["Value Object\\n値で同一性判断"]
    AGG["Aggregate\\n整合性境界"]
    DS["Domain Service\\n横断ロジック"]
    REP["Repository\\n永続化抽象"]
  end
  subgraph OOP_C["対応する OOP 概念"]
    C1["クラス + カプセル化"]
    C2["@dataclass frozen=True"]
    C3["Aggregate Root クラス"]
    C4["ステートレスなクラス"]
    C5["ABC インターフェース + DIP"]
  end
  E --> C1
  VO --> C2
  AGG --> C3
  DS --> C4
  REP --> C5
  style E fill:#1e3a5f,color:#93c5fd
  style VO fill:#14532d,color:#86efac
  style AGG fill:#4c1d95,color:#c4b5fd
  style DS fill:#78350f,color:#fcd34d
  style REP fill:#7f1d1d,color:#fca5a5`}
              />
              <p className="mermaid-caption">図22. DDD 戦術パターンと OOP 概念の対応</p>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>DDD パターン</th>
                    <th>対応する OOP 概念</th>
                    <th>役割</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Entity（エンティティ）</td>
                    <td>クラス + カプセル化</td>
                    <td>ID で同一性を判断するビジネスオブジェクト</td>
                  </tr>
                  <tr>
                    <td>Value Object（値オブジェクト）</td>
                    <td>
                      <code>@dataclass(frozen=True)</code>
                    </td>
                    <td>値で同一性を判断するイミュータブルオブジェクト</td>
                  </tr>
                  <tr>
                    <td>Aggregate（集約）</td>
                    <td>クラス + Facade パターン</td>
                    <td>整合性境界を持つオブジェクト群の代表</td>
                  </tr>
                  <tr>
                    <td>Domain Service</td>
                    <td>ステートレスなクラス</td>
                    <td>複数 Entity をまたぐビジネスロジック</td>
                  </tr>
                  <tr>
                    <td>Repository（リポジトリ）</td>
                    <td>ABC インターフェース + DIP</td>
                    <td>集約の永続化を担う抽象</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="callout callout-info">
              <span className="callout-icon">🔗</span>
              <div className="callout-body">
                <strong>参考：Clean Architecture（Uncle Bob ブログ原文）</strong>
                <br />
                <Ext href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
                  https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
                </Ext>
              </div>
            </div>
          </section>

          {/* ═══════ SECTION 9: テスト駆動 OOP 開発 ═══════ */}
          <section className="section" id="sec9">
            <div className="section-header">
              <span className="section-num">09</span>
              <h2>テスト駆動 OOP 開発</h2>
            </div>

            <p>
              良い OOP 設計はテストが書きやすいです。逆に言えば、
              <strong>テストが書きにくいコードは設計に問題がある</strong>サインです。
              DI（依存性注入）とインターフェースを使った OOP
              は、ユニットテストを自然に引き寄せます。
            </p>

            <h3>OOP クラスのテスト戦略</h3>
            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph TD
  subgraph PYRAMID["テストピラミッド"]
    E2E["E2E テスト\\n少数・遅い\\nブラウザ・API 経由"]
    INTEGRATION["統合テスト\\n中程度\\n複数クラスの協調"]
    UNIT["ユニットテスト\\n最多・最速\\n単一クラスのみ\\nモックを使用"]
  end
  E2E --- INTEGRATION
  INTEGRATION --- UNIT
  style E2E fill:#7f1d1d,color:#fca5a5
  style INTEGRATION fill:#78350f,color:#fcd34d
  style UNIT fill:#14532d,color:#86efac`}
              />
              <p className="mermaid-caption">図23. テストピラミッド — OOP テストの種別</p>
            </div>

            <div className="card-grid">
              <div className="principle-card pc-green">
                <span className="pc-icon">🧪</span>
                <div className="pc-title">ユニットテスト（最多）</div>
                <div className="pc-sub">単一クラス・メソッドのテスト</div>
                <div className="pc-desc">
                  外部依存はモック化。最も数が多く最も速い。「振る舞い（結果）」をテストし、内部実装には触れない。
                </div>
              </div>
              <div className="principle-card pc-orange">
                <span className="pc-icon">🔗</span>
                <div className="pc-title">統合テスト（中程度）</div>
                <div className="pc-sub">複数クラスの協調テスト</div>
                <div className="pc-desc">
                  InMemory 実装でリポジトリを差し替え、実際のユースケースフローを検証する。
                </div>
              </div>
              <div className="principle-card pc-blue">
                <span className="pc-icon">📋</span>
                <div className="pc-title">契約テスト（少数）</div>
                <div className="pc-sub">インターフェースの正しい実装確認</div>
                <div className="pc-desc">
                  インターフェースを満たすかを検証。LSP の自動チェックにも使える。
                </div>
              </div>
            </div>

            <h3>テスタブルな OOP 設計の実装例</h3>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">pytest + MagicMock によるユニットテスト</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">import</span> pytest
<span class="kw">from</span> unittest.mock <span class="kw">import</span> MagicMock


<span class="cm"># ─── テスト対象クラス ───────────────────────────────────</span>

<span class="kw">class</span> <span class="fn">InventoryRepository</span>:
    <span class="st">"""リポジトリのインターフェース（抽象）"""</span>
    <span class="kw">def</span> <span class="fn">get_stock</span>(self, product_id: str) -&gt; int: ...
    <span class="kw">def</span> <span class="fn">reduce_stock</span>(self, product_id: str, quantity: int) -&gt; <span class="kw">None</span>: ...


<span class="kw">class</span> <span class="fn">OrderService</span>:
    <span class="st">"""DI でリポジトリを受け取る — テストが書きやすい設計"""</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self, inventory: InventoryRepository):
        self._inventory = inventory

    <span class="kw">def</span> <span class="fn">place_order</span>(self, product_id: str, quantity: int) -&gt; dict:
        stock = self._inventory.get_stock(product_id)
        <span class="kw">if</span> stock &lt; quantity:
            <span class="kw">raise</span> ValueError(f<span class="st">"在庫不足: 在庫={stock}, 注文数={quantity}"</span>)
        self._inventory.reduce_stock(product_id, quantity)
        <span class="kw">return</span> {<span class="st">"product_id"</span>: product_id, <span class="st">"quantity"</span>: quantity, <span class="st">"status"</span>: <span class="st">"confirmed"</span>}


<span class="cm"># ─── テストコード ───────────────────────────────────────</span>

<span class="kw">class</span> <span class="fn">TestOrderService</span>:

    <span class="kw">@pytest.fixture</span>
    <span class="kw">def</span> <span class="fn">mock_inventory</span>(self):
        mock = MagicMock(spec=InventoryRepository)
        mock.get_stock.return_value = <span class="nu">10</span>  <span class="cm"># 在庫10個と仮定</span>
        <span class="kw">return</span> mock

    <span class="kw">@pytest.fixture</span>
    <span class="kw">def</span> <span class="fn">service</span>(self, mock_inventory):
        <span class="kw">return</span> OrderService(mock_inventory)

    <span class="kw">def</span> <span class="fn">test_注文が正常に確定される</span>(self, service, mock_inventory):
        result = service.place_order(<span class="st">"PROD-001"</span>, <span class="nu">3</span>)

        <span class="kw">assert</span> result[<span class="st">"status"</span>] == <span class="st">"confirmed"</span>
        <span class="kw">assert</span> result[<span class="st">"quantity"</span>] == <span class="nu">3</span>
        <span class="cm"># reduce_stock が正しい引数で呼ばれたか検証</span>
        mock_inventory.reduce_stock.assert_called_once_with(<span class="st">"PROD-001"</span>, <span class="nu">3</span>)

    <span class="kw">def</span> <span class="fn">test_在庫不足の場合はValueErrorが発生する</span>(self, service, mock_inventory):
        mock_inventory.get_stock.return_value = <span class="nu">2</span>  <span class="cm"># 在庫2個に変更</span>

        <span class="kw">with</span> pytest.raises(ValueError, match=<span class="st">"在庫不足"</span>):
            service.place_order(<span class="st">"PROD-001"</span>, <span class="nu">5</span>)

    <span class="kw">def</span> <span class="fn">test_在庫不足時は在庫削減が呼ばれない</span>(self, service, mock_inventory):
        mock_inventory.get_stock.return_value = <span class="nu">0</span>

        <span class="kw">with</span> pytest.raises(ValueError):
            service.place_order(<span class="st">"PROD-001"</span>, <span class="nu">1</span>)

        mock_inventory.reduce_stock.assert_not_called()  <span class="cm"># ← 重要な検証</span>`,
                }}
              />
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ルール</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>カプセル化を尊重する</td>
                    <td>private メソッドを外部からテストしない。public API を通じてテストする</td>
                  </tr>
                  <tr>
                    <td>振る舞いをテストする</td>
                    <td>実装の詳細ではなく「結果・副作用」をテストする</td>
                  </tr>
                  <tr>
                    <td>1テスト1概念</td>
                    <td>1つのテストメソッドで1つのシナリオだけを検証する</td>
                  </tr>
                  <tr>
                    <td>テスト名は日本語 OK</td>
                    <td>
                      <code>test_在庫不足時はValueErrorが発生する</code> — 仕様書として読める
                    </td>
                  </tr>
                  <tr>
                    <td>Arrange-Act-Assert パターン</td>
                    <td>準備→実行→検証の3ステップで構造化する</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="callout callout-info">
              <span className="callout-icon">🔗</span>
              <div className="callout-body">
                <strong>参考：Martin Fowler — Mocks Aren&apos;t Stubs</strong>
                <br />
                <Ext href="https://martinfowler.com/articles/mocksArentStubs.html">
                  https://martinfowler.com/articles/mocksArentStubs.html
                </Ext>
              </div>
            </div>
          </section>

          {/* ═══════ SECTION 10: リファクタリング技法 ═══════ */}
          <section className="section" id="sec10">
            <div className="section-header">
              <span className="section-num">10</span>
              <h2>リファクタリング技法</h2>
            </div>

            <p>
              リファクタリングとは、
              <strong>外部から見た振る舞いを変えずに、コードの内部構造を改善すること</strong>です。
              OOP 設計の問題（コードの匂い）を発見し、段階的に改善していく技術です。
            </p>

            <h3>コードの匂い（Code Smells）と対処法</h3>
            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph TD
  subgraph SMELLS["🚨 コードの匂い"]
    A["長すぎるメソッド\\n50行超"]
    B["大きすぎるクラス\\n300行超"]
    C["重複コード\\n同じロジックが複数箇所"]
    D["プリミティブ執着\\nstring/int で概念を表現"]
    E["長い引数リスト\\n5個以上"]
    F["if/elif の連鎖\\n型判定が増え続ける"]
  end
  subgraph FIXES["✅ 対処法"]
    FA["Extract Method\\nメソッドの抽出"]
    FB["Extract Class\\nクラスの抽出"]
    FC["テンプレートメソッド\\n共通クラスへ集約"]
    FD["Value Object の導入"]
    FE["Parameter Object\\nパラメータオブジェクト"]
    FF["Strategy / Factory パターン"]
  end
  A --> FA
  B --> FB
  C --> FC
  D --> FD
  E --> FE
  F --> FF
  style A fill:#7f1d1d,color:#fca5a5
  style B fill:#7f1d1d,color:#fca5a5
  style C fill:#7f1d1d,color:#fca5a5
  style D fill:#7f1d1d,color:#fca5a5
  style E fill:#7f1d1d,color:#fca5a5
  style F fill:#7f1d1d,color:#fca5a5
  style FA fill:#14532d,color:#86efac
  style FB fill:#14532d,color:#86efac
  style FC fill:#14532d,color:#86efac
  style FD fill:#14532d,color:#86efac
  style FE fill:#14532d,color:#86efac
  style FF fill:#14532d,color:#86efac`}
              />
              <p className="mermaid-caption">図24. 代表的なコードの匂いと対処法</p>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>コードの匂い</th>
                    <th>症状</th>
                    <th>リファクタリング手法</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>長すぎるメソッド</td>
                    <td>50行を超えるメソッド、コメントで区切られている</td>
                    <td>Extract Method（メソッドの抽出）</td>
                  </tr>
                  <tr>
                    <td>大きすぎるクラス</td>
                    <td>300行を超えるクラス、フィールドが10個以上</td>
                    <td>Extract Class（クラスの抽出）</td>
                  </tr>
                  <tr>
                    <td>重複コード</td>
                    <td>同じロジックが2か所以上に存在</td>
                    <td>テンプレートメソッド / 共通クラスへ集約</td>
                  </tr>
                  <tr>
                    <td>プリミティブ執着</td>
                    <td>string/int で金額・住所などを表現</td>
                    <td>Introduce Value Object（値オブジェクトの導入）</td>
                  </tr>
                  <tr>
                    <td>長い引数リスト</td>
                    <td>引数が5個以上のメソッド</td>
                    <td>Introduce Parameter Object（パラメータオブジェクト）</td>
                  </tr>
                  <tr>
                    <td>if/elif の連鎖</td>
                    <td>型判定による分岐が増え続ける</td>
                    <td>Strategy / Factory Method パターン</td>
                  </tr>
                  <tr>
                    <td>神クラス（God Class）</td>
                    <td>1クラスがすべてを知っている</td>
                    <td>SRP を適用し責務ごとに分割</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>リファクタリング実践例：Before → After</h3>
            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">❌ PYTHON — リファクタリング前（問題あり）</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="cm"># 長い引数リスト + 重複ロジック + プリミティブ執着 の三重苦</span>
<span class="kw">def</span> <span class="fn">process_order</span>(customer_name, customer_email, product_id,
                  product_name, quantity, price, discount_type,
                  discount_value):

    <span class="kw">if</span> discount_type == <span class="st">"percentage"</span>:
        final_price = price * quantity * (<span class="nu">1</span> - discount_value / <span class="nu">100</span>)
    <span class="kw">elif</span> discount_type == <span class="st">"fixed"</span>:
        final_price = price * quantity - discount_value
    <span class="kw">else</span>:
        final_price = price * quantity

    print(f<span class="st">"顧客: {customer_name} ({customer_email})"</span>)
    print(f<span class="st">"商品: {product_name} x {quantity}"</span>)
    print(f<span class="st">"合計: {final_price}円"</span>)`,
                }}
              />
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">✅ PYTHON — リファクタリング後（OOP 適用）</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal
<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod


<span class="cm"># 1. 値オブジェクトで「プリミティブ執着」を解消</span>
<span class="kw">@dataclass</span>(frozen=<span class="kw">True</span>)
<span class="kw">class</span> <span class="fn">Customer</span>:
    name: str
    email: str


<span class="kw">@dataclass</span>(frozen=<span class="kw">True</span>)
<span class="kw">class</span> <span class="fn">OrderItem</span>:
    product_id: str
    product_name: str
    unit_price: Decimal
    quantity: int

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">subtotal</span>(self) -&gt; Decimal:
        <span class="kw">return</span> self.unit_price * self.quantity


<span class="cm"># 2. Strategy パターンで「if/elif の連鎖」を解消</span>
<span class="kw">class</span> <span class="fn">DiscountStrategy</span>(ABC):
    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">apply</span>(self, amount: Decimal) -&gt; Decimal: ...

<span class="kw">class</span> <span class="fn">NoDiscount</span>(DiscountStrategy):
    <span class="kw">def</span> <span class="fn">apply</span>(self, amount: Decimal) -&gt; Decimal:
        <span class="kw">return</span> amount

<span class="kw">class</span> <span class="fn">PercentageDiscount</span>(DiscountStrategy):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, rate: Decimal):
        self.rate = rate
    <span class="kw">def</span> <span class="fn">apply</span>(self, amount: Decimal) -&gt; Decimal:
        <span class="kw">return</span> amount * (<span class="nu">1</span> - self.rate)

<span class="kw">class</span> <span class="fn">FixedDiscount</span>(DiscountStrategy):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, amount: Decimal):
        self.amount = amount
    <span class="kw">def</span> <span class="fn">apply</span>(self, amount: Decimal) -&gt; Decimal:
        <span class="kw">return</span> max(Decimal(<span class="st">"0"</span>), amount - self.amount)


<span class="cm"># 3. パラメータオブジェクトで「長い引数リスト」を解消</span>
<span class="kw">@dataclass</span>
<span class="kw">class</span> <span class="fn">Order</span>:
    customer: Customer
    item: OrderItem
    discount: DiscountStrategy = <span class="kw">None</span>

    <span class="kw">def</span> <span class="fn">__post_init__</span>(self):
        <span class="kw">if</span> self.discount <span class="kw">is</span> <span class="kw">None</span>:
            self.discount = NoDiscount()

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">total</span>(self) -&gt; Decimal:
        <span class="kw">return</span> self.discount.apply(self.item.subtotal)

    <span class="kw">def</span> <span class="fn">print_receipt</span>(self) -&gt; <span class="kw">None</span>:
        print(f<span class="st">"顧客: {self.customer.name} ({self.customer.email})"</span>)
        print(f<span class="st">"商品: {self.item.product_name} x {self.item.quantity}"</span>)
        print(f<span class="st">"合計: {self.total}円"</span>)


<span class="cm"># 使い方：読みやすく・拡張しやすい</span>
order = Order(
    customer=Customer(<span class="st">"山田太郎"</span>, <span class="st">"yamada@example.com"</span>),
    item=OrderItem(<span class="st">"P001"</span>, <span class="st">"Tシャツ"</span>, Decimal(<span class="st">"3000"</span>), <span class="nu">2</span>),
    discount=PercentageDiscount(Decimal(<span class="st">"0.1"</span>)),
)
order.print_receipt()`,
                }}
              />
            </div>

            <div className="callout callout-tip">
              <span className="callout-icon">📖</span>
              <div className="callout-body">
                <strong>
                  参考：Refactoring.com — リファクタリング技法カタログ（Martin Fowler）
                </strong>
                <br />
                <Ext href="https://martinfowler.com/books/refactoring.html">
                  https://martinfowler.com/books/refactoring.html
                </Ext>
              </div>
            </div>
          </section>

          {/* ═══════ SECTION 11: ECサイト完全実装例 ═══════ */}
          <section className="section" id="sec11">
            <div className="section-header">
              <span className="section-num">11</span>
              <h2>実践：EC サイト完全実装例</h2>
            </div>

            <p>
              これまで学んだ OOP の全要素を統合した、実践的な EC サイトのドメインモデルです。
              値オブジェクト・エンティティ・集約・リポジトリ・ユースケースが有機的に連携します。
            </p>

            <h3>ドメインモデル全体像</h3>
            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`classDiagram
  class Customer {
    -CustomerId _id
    -String _name
    -Email _email
    +activate() void
    +deactivate() void
  }
  class Order {
    -OrderId _id
    -CustomerId _customer_id
    -List~OrderLine~ _lines
    -OrderStatus _status
    +add_line(product, qty) void
    +confirm() void
    +cancel() void
    +total() Money
  }
  class OrderLine {
    -ProductId _product_id
    -Money _unit_price
    -int _quantity
    +subtotal() Money
  }
  class Product {
    -ProductId _id
    -String _name
    -Money _price
    -int _stock_count
    +reserve(qty) void
    +is_available() bool
  }
  class Money {
    -Decimal _amount
    -String _currency
    +add(Money) Money
    +multiply(int) Money
  }
  Customer "1" --> "0..*" Order : places
  Order "1" *-- "1..*" OrderLine : contains
  Product "1" <-- "0..*" OrderLine : references
  OrderLine --> Money
  Product --> Money`}
              />
              <p className="mermaid-caption">図25. EC サイトのドメインモデル — クラス図</p>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span className="code-lang">PYTHON</span>
                <span className="code-label">EC サイト完全実装 — OOP 総合演習</span>
              </div>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="kw">from</span> __future__ <span class="kw">import</span> annotations
<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass, field
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal
<span class="kw">from</span> enum <span class="kw">import</span> Enum
<span class="kw">from</span> typing <span class="kw">import</span> Optional
<span class="kw">import</span> uuid


<span class="cm"># ═══════════════════════════════════════════════</span>
<span class="cm"># 値オブジェクト（Value Objects）</span>
<span class="cm"># ═══════════════════════════════════════════════</span>

<span class="kw">@dataclass</span>(frozen=<span class="kw">True</span>)
<span class="kw">class</span> <span class="fn">Money</span>:
    <span class="st">"""金額値オブジェクト — イミュータブル・通貨チェックつき"""</span>
    amount: Decimal
    currency: str = <span class="st">"JPY"</span>

    <span class="kw">def</span> <span class="fn">__post_init__</span>(self):
        <span class="kw">if</span> self.amount &lt; <span class="nu">0</span>:
            <span class="kw">raise</span> ValueError(f<span class="st">"金額は0以上: {self.amount}"</span>)

    <span class="kw">def</span> <span class="fn">__add__</span>(self, other: Money) -&gt; Money:
        <span class="kw">if</span> self.currency != other.currency:
            <span class="kw">raise</span> ValueError(<span class="st">"通貨が一致しません"</span>)
        <span class="kw">return</span> Money(self.amount + other.amount, self.currency)

    <span class="kw">def</span> <span class="fn">__mul__</span>(self, factor: int) -&gt; Money:
        <span class="kw">return</span> Money(self.amount * factor, self.currency)

    <span class="kw">def</span> <span class="fn">__str__</span>(self) -&gt; str:
        <span class="kw">return</span> f<span class="st">"{self.amount:,.0f} {self.currency}"</span>


<span class="kw">@dataclass</span>(frozen=<span class="kw">True</span>)
<span class="kw">class</span> <span class="fn">Email</span>:
    <span class="st">"""メールアドレス値オブジェクト"""</span>
    value: str

    <span class="kw">def</span> <span class="fn">__post_init__</span>(self):
        <span class="kw">if</span> <span class="st">"@"</span> <span class="kw">not</span> <span class="kw">in</span> self.value:
            <span class="kw">raise</span> ValueError(f<span class="st">"不正なメールアドレス: {self.value}"</span>)


<span class="cm"># ═══════════════════════════════════════════════</span>
<span class="cm"># エンティティ（Entities）</span>
<span class="cm"># ═══════════════════════════════════════════════</span>

<span class="kw">class</span> <span class="fn">OrderStatus</span>(Enum):
    PENDING   = <span class="st">"pending"</span>
    CONFIRMED = <span class="st">"confirmed"</span>
    SHIPPED   = <span class="st">"shipped"</span>
    CANCELLED = <span class="st">"cancelled"</span>


<span class="kw">@dataclass</span>
<span class="kw">class</span> <span class="fn">Product</span>:
    <span class="st">"""商品エンティティ — ID で同一性を判断"""</span>
    id: str
    name: str
    price: Money
    _stock_count: int = field(default=<span class="nu">0</span>, repr=<span class="kw">False</span>)

    <span class="kw">def</span> <span class="fn">reserve</span>(self, quantity: int) -&gt; <span class="kw">None</span>:
        <span class="st">"""在庫を引き当てる（ビジネスルール）"""</span>
        <span class="kw">if</span> quantity &lt;= <span class="nu">0</span>:
            <span class="kw">raise</span> ValueError(<span class="st">"数量は1以上"</span>)
        <span class="kw">if</span> self._stock_count &lt; quantity:
            <span class="kw">raise</span> ValueError(f<span class="st">"在庫不足: 在庫={self._stock_count}, 要求={quantity}"</span>)
        self._stock_count -= quantity

    <span class="kw">def</span> <span class="fn">restock</span>(self, quantity: int) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> quantity &lt;= <span class="nu">0</span>:
            <span class="kw">raise</span> ValueError(<span class="st">"補充数量は1以上"</span>)
        self._stock_count += quantity

    <span class="kw">def</span> <span class="fn">is_available</span>(self, quantity: int = <span class="nu">1</span>) -&gt; bool:
        <span class="kw">return</span> self._stock_count &gt;= quantity

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">stock_count</span>(self) -&gt; int:
        <span class="kw">return</span> self._stock_count


<span class="kw">@dataclass</span>
<span class="kw">class</span> <span class="fn">OrderLine</span>:
    <span class="st">"""注文明細（Aggregate 内部）"""</span>
    product_id: str
    product_name: str
    unit_price: Money
    quantity: int

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">subtotal</span>(self) -&gt; Money:
        <span class="kw">return</span> self.unit_price * self.quantity


<span class="kw">@dataclass</span>
<span class="kw">class</span> <span class="fn">Order</span>:
    <span class="st">"""注文エンティティ（Aggregate Root）"""</span>
    id: str
    customer_id: str
    _lines: list[OrderLine] = field(default_factory=list, repr=<span class="kw">False</span>)
    _status: OrderStatus = field(default=OrderStatus.PENDING, repr=<span class="kw">False</span>)

    <span class="kw">@classmethod</span>
    <span class="kw">def</span> <span class="fn">create</span>(cls, customer_id: str) -&gt; Order:
        <span class="kw">return</span> cls(id=str(uuid.uuid4()), customer_id=customer_id)

    <span class="kw">def</span> <span class="fn">add_line</span>(self, product: Product, quantity: int) -&gt; <span class="kw">None</span>:
        self._assert_editable()
        <span class="kw">if</span> <span class="kw">not</span> product.is_available(quantity):
            <span class="kw">raise</span> ValueError(f<span class="st">"「{product.name}」の在庫不足"</span>)
        product.reserve(quantity)
        self._lines.append(
            OrderLine(product.id, product.name, product.price, quantity)
        )

    <span class="kw">def</span> <span class="fn">confirm</span>(self) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> self._status != OrderStatus.PENDING:
            <span class="kw">raise</span> ValueError(<span class="st">"保留中の注文のみ確定できます"</span>)
        <span class="kw">if</span> <span class="kw">not</span> self._lines:
            <span class="kw">raise</span> ValueError(<span class="st">"注文明細がありません"</span>)
        self._status = OrderStatus.CONFIRMED

    <span class="kw">def</span> <span class="fn">cancel</span>(self) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> self._status == OrderStatus.SHIPPED:
            <span class="kw">raise</span> ValueError(<span class="st">"発送済みの注文はキャンセルできません"</span>)
        self._status = OrderStatus.CANCELLED

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">status</span>(self) -&gt; OrderStatus:
        <span class="kw">return</span> self._status

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">total</span>(self) -&gt; Money:
        <span class="kw">if</span> <span class="kw">not</span> self._lines:
            <span class="kw">return</span> Money(Decimal(<span class="st">"0"</span>))
        totals = [line.subtotal <span class="kw">for</span> line <span class="kw">in</span> self._lines]
        <span class="kw">return</span> sum(totals[<span class="nu">1</span>:], totals[<span class="nu">0</span>])

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">lines</span>(self) -&gt; tuple[OrderLine, ...]:
        <span class="kw">return</span> tuple(self._lines)

    <span class="kw">def</span> <span class="fn">_assert_editable</span>(self) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> self._status != OrderStatus.PENDING:
            <span class="kw">raise</span> ValueError(<span class="st">"確定済みの注文は変更できません"</span>)


<span class="cm"># ═══════════════════════════════════════════════</span>
<span class="cm"># リポジトリ（DIP 適用）</span>
<span class="cm"># ═══════════════════════════════════════════════</span>

<span class="kw">class</span> <span class="fn">OrderRepository</span>(ABC):
    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">save</span>(self, order: Order) -&gt; <span class="kw">None</span>: ...

    <span class="kw">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">find_by_id</span>(self, order_id: str) -&gt; Optional[Order]: ...


<span class="kw">class</span> <span class="fn">InMemoryOrderRepository</span>(OrderRepository):
    <span class="st">"""テスト用インメモリ実装"""</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self._store: dict[str, Order] = {}

    <span class="kw">def</span> <span class="fn">save</span>(self, order: Order) -&gt; <span class="kw">None</span>:
        self._store[order.id] = order

    <span class="kw">def</span> <span class="fn">find_by_id</span>(self, order_id: str) -&gt; Optional[Order]:
        <span class="kw">return</span> self._store.get(order_id)


<span class="cm"># ═══════════════════════════════════════════════</span>
<span class="cm"># ユースケース（Application Layer）</span>
<span class="cm"># ═══════════════════════════════════════════════</span>

<span class="kw">class</span> <span class="fn">PlaceOrderUseCase</span>:
    <span class="st">"""注文作成ユースケース — OOP の総合的な活用"""</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self, order_repository: OrderRepository):
        self._repo = order_repository  <span class="cm"># DIP: 抽象に依存</span>

    <span class="kw">def</span> <span class="fn">execute</span>(
        self,
        customer_id: str,
        items: list[tuple[Product, int]]
    ) -&gt; Order:
        order = Order.create(customer_id)
        <span class="kw">for</span> product, quantity <span class="kw">in</span> items:
            order.add_line(product, quantity)
        order.confirm()
        self._repo.save(order)
        <span class="kw">return</span> order


<span class="cm"># ═══════════════════════════════════════════════</span>
<span class="cm"># 動作確認</span>
<span class="cm"># ═══════════════════════════════════════════════</span>

<span class="kw">if</span> __name__ == <span class="st">"__main__"</span>:
    tshirt = Product(<span class="st">"P001"</span>, <span class="st">"Tシャツ"</span>,  Money(Decimal(<span class="st">"1500"</span>)), _stock_count=<span class="nu">10</span>)
    jeans  = Product(<span class="st">"P002"</span>, <span class="st">"ジーンズ"</span>, Money(Decimal(<span class="st">"6000"</span>)), _stock_count=<span class="nu">5</span>)

    repo     = InMemoryOrderRepository()
    use_case = PlaceOrderUseCase(repo)

    order = use_case.execute(
        customer_id=<span class="st">"CUST-001"</span>,
        items=[(tshirt, <span class="nu">2</span>), (jeans, <span class="nu">1</span>)],
    )

    print(f<span class="st">"注文ID: {order.id}"</span>)
    print(f<span class="st">"ステータス: {order.status.value}"</span>)   <span class="cm"># confirmed</span>
    print(f<span class="st">"合計金額: {order.total}"</span>)            <span class="cm"># 9,000 JPY</span>
    print(f<span class="st">"Tシャツの残在庫: {tshirt.stock_count}"</span>)  <span class="cm"># 8</span>`,
                }}
              />
            </div>
          </section>

          {/* ═══════ SECTION 12: アンチパターン ═══════ */}
          <section className="section" id="sec12">
            <div className="section-header">
              <span className="section-num">12</span>
              <h2>OOP アンチパターン</h2>
            </div>

            <p>
              良い設計を学ぶと同様に、<strong>陥りやすい悪い設計パターン（アンチパターン）</strong>
              を知ることも重要です。
              これらを知っておくことで、コードレビューや設計判断の精度が大きく上がります。
            </p>

            <div className="mermaid-wrapper fade-in">
              <MermaidDiagram
                chart={`graph TD
  subgraph AP["⚠️ OOP アンチパターン"]
    G["神クラス God Class\\n1クラスがすべてを管理"]
    ANEMIC["貧血ドメインモデル\\nクラスがデータのみ"]
    DEEP["深い継承ツリー\\n5階層以上"]
    SING["Singleton 乱用\\nグローバル状態の多用"]
  end
  G --> G_FIX["SRP 適用\\n責務ごとに分割"]
  ANEMIC --> A_FIX["リッチドメインモデル\\nロジックをクラスに移動"]
  DEEP --> D_FIX["コンポジション/Mixin\\nに切り替える"]
  SING --> S_FIX["DI（依存性注入）\\nテスタビリティ向上"]
  style G fill:#7f1d1d,color:#fca5a5
  style ANEMIC fill:#7f1d1d,color:#fca5a5
  style DEEP fill:#7f1d1d,color:#fca5a5
  style SING fill:#7f1d1d,color:#fca5a5
  style G_FIX fill:#14532d,color:#86efac
  style A_FIX fill:#14532d,color:#86efac
  style D_FIX fill:#14532d,color:#86efac
  style S_FIX fill:#14532d,color:#86efac`}
              />
              <p className="mermaid-caption">図26. 主要な OOP アンチパターンと解決策</p>
            </div>

            <div className="card-grid">
              <div className="principle-card pc-red">
                <span className="pc-icon">👑</span>
                <div className="pc-title">神クラス（God Class）</div>
                <div className="pc-sub">最も多い・最も危険</div>
                <div className="pc-desc">
                  1つのクラスがすべてを知り・すべてを行う。変更のたびに影響範囲が爆発する。
                  <br />
                  <strong>解決：</strong>SRP を適用し責務ごとに分割する。
                </div>
              </div>
              <div className="principle-card pc-orange">
                <span className="pc-icon">🧟</span>
                <div className="pc-title">貧血ドメインモデル</div>
                <div className="pc-sub">Anemic Domain Model</div>
                <div className="pc-desc">
                  クラスがデータのみ保持し、ロジックは外部サービスに漏れ出す。クラスが「構造体」に成り下がる。
                  <br />
                  <strong>解決：</strong>リッチドメインモデルへ移行。
                </div>
              </div>
              <div className="principle-card pc-purple">
                <span className="pc-icon">🌳</span>
                <div className="pc-title">深い継承ツリー</div>
                <div className="pc-sub">Deep Inheritance</div>
                <div className="pc-desc">
                  5階層以上の継承。親クラスの変更が全子孫に波及し、「脆い基底クラス問題」が発生する。
                  <br />
                  <strong>解決：</strong>コンポジション・Mixin に切り替える。
                </div>
              </div>
              <div className="principle-card pc-blue">
                <span className="pc-icon">⚡</span>
                <div className="pc-title">Singleton 乱用</div>
                <div className="pc-sub">Global State Anti-Pattern</div>
                <div className="pc-desc">
                  Singleton がグローバル状態の入れ物になり、テスト不能・並行処理の問題を引き起こす。
                  <br />
                  <strong>解決：</strong>DI（依存性注入）を使う。
                </div>
              </div>
            </div>

            <h3>貧血ドメインモデル vs リッチドメインモデル（最重要）</h3>
            <div className="compare-grid">
              <div className="compare-bad">
                <div className="code-block">
                  <div className="code-header">
                    <span className="code-lang">❌ 貧血ドメインモデル（アンチパターン）</span>
                  </div>
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="cm"># クラスがデータの入れ物のみ</span>
<span class="kw">class</span> <span class="fn">Order</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self.id = <span class="kw">None</span>
        self.status = <span class="kw">None</span>
        self.items = []
        self.total = <span class="nu">0</span>
    <span class="cm"># ← ロジックが一切ない！</span>

<span class="cm"># ロジックが外部サービスに漏れる</span>
<span class="kw">class</span> <span class="fn">OrderService</span>:
    <span class="kw">def</span> <span class="fn">confirm_order</span>(self, order):
        <span class="cm"># 本来 Order 自身が持つべきロジック ⚠️</span>
        <span class="kw">if</span> order.status != <span class="st">"pending"</span>:
            <span class="kw">raise</span> Exception(<span class="st">"..."</span>)
        <span class="kw">if</span> <span class="kw">not</span> order.items:
            <span class="kw">raise</span> Exception(<span class="st">"..."</span>)
        order.status = <span class="st">"confirmed"</span>  <span class="cm"># ← 状態変更も外部が担う</span>
        order.total = sum(...)      <span class="cm"># ← 計算も外部が担う</span>`,
                    }}
                  />
                </div>
              </div>
              <div className="compare-good">
                <div className="code-block">
                  <div className="code-header">
                    <span className="code-lang">✅ リッチドメインモデル（推奨）</span>
                  </div>
                  <pre
                    dangerouslySetInnerHTML={{
                      __html: `<span class="kw">class</span> <span class="fn">Order</span>:
    <span class="cm"># ロジックはクラス自身が持つ</span>
    <span class="kw">def</span> <span class="fn">confirm</span>(self) -&gt; <span class="kw">None</span>:
        <span class="kw">if</span> self._status != OrderStatus.PENDING:
            <span class="kw">raise</span> ValueError(<span class="st">"..."</span>)
        <span class="kw">if</span> <span class="kw">not</span> self._lines:
            <span class="kw">raise</span> ValueError(<span class="st">"..."</span>)
        self._status = OrderStatus.CONFIRMED

    <span class="kw">@property</span>
    <span class="kw">def</span> <span class="fn">total</span>(self) -&gt; Money:
        <span class="cm"># 計算もクラス自身が担当</span>
        <span class="kw">return</span> sum(line.subtotal <span class="kw">for</span> line <span class="kw">in</span> self._lines)

<span class="cm"># サービスは「オーケストレーション」だけ行う</span>
<span class="kw">class</span> <span class="fn">OrderService</span>:
    <span class="kw">def</span> <span class="fn">confirm</span>(self, order_id: str) -&gt; <span class="kw">None</span>:
        order = self._repo.find_by_id(order_id)
        order.confirm()  <span class="cm"># ← ロジックは Order に委譲</span>
        self._repo.save(order)`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="callout callout-warn">
              <span className="callout-icon">⚠️</span>
              <div className="callout-body">
                <strong>貧血ドメインモデルの見分け方</strong>
                クラスのメソッドが getter/setter
                ばかりで、ビジネスロジックをすべて「Service」クラスが持っていたら要注意です。 参考：
                <Ext href="https://martinfowler.com/bliki/AnemicDomainModel.html">
                  Martin Fowler — Anemic Domain Model
                </Ext>
              </div>
            </div>
          </section>

          {/* ═══════ SECTION 13: ベストプラクティス ═══════ */}
          <section className="section" id="sec13">
            <div className="section-header">
              <span className="section-num">13</span>
              <h2>ベストプラクティス総まとめ</h2>
            </div>

            <p>
              本ガイドで学んだすべての知識を、実際の開発で即座に使えるチートシートとして整理します。
            </p>

            <h3>OOP 成熟度モデル（Level 0 → Level 5）</h3>
            <div className="level-bar">
              <div className="level-item">
                <span
                  className="level-badge"
                  style={{
                    background: "rgba(248,113,113,0.15)",
                    color: "#f87171",
                    border: "1px solid rgba(248,113,113,0.3)",
                  }}
                >
                  Lv.0
                </span>
                <span className="level-name">手続き型スタイル</span>
                <span className="level-desc">
                  クラスがデータの入れ物のみ。すべてのロジックが外部関数・サービスに存在する。
                </span>
              </div>
              <div className="level-item">
                <span
                  className="level-badge"
                  style={{
                    background: "rgba(251,191,36,0.15)",
                    color: "#fbbf24",
                    border: "1px solid rgba(251,191,36,0.3)",
                  }}
                >
                  Lv.1
                </span>
                <span className="level-name">基本的な OOP</span>
                <span className="level-desc">
                  クラス・メソッドを正しく使い、カプセル化を意識している。
                </span>
              </div>
              <div className="level-item">
                <span
                  className="level-badge"
                  style={{
                    background: "rgba(251,146,60,0.15)",
                    color: "#fb923c",
                    border: "1px solid rgba(251,146,60,0.3)",
                  }}
                >
                  Lv.2
                </span>
                <span className="level-name">SOLID 原則の適用</span>
                <span className="level-desc">
                  SRP・OCP を意識した設計。インターフェース（ABC）を積極的に活用している。
                </span>
              </div>
              <div className="level-item">
                <span
                  className="level-badge"
                  style={{
                    background: "rgba(52,211,153,0.15)",
                    color: "#34d399",
                    border: "1px solid rgba(52,211,153,0.3)",
                  }}
                >
                  Lv.3
                </span>
                <span className="level-name">デザインパターンの活用</span>
                <span className="level-desc">
                  問題に応じた適切なパターン選択ができる。コンポジション &gt; 継承を実践できる。
                </span>
              </div>
              <div className="level-item">
                <span
                  className="level-badge"
                  style={{
                    background: "rgba(0,229,255,0.15)",
                    color: "#00e5ff",
                    border: "1px solid rgba(0,229,255,0.3)",
                  }}
                >
                  Lv.4
                </span>
                <span className="level-name">ドメイン駆動設計との統合</span>
                <span className="level-desc">
                  リッチドメインモデル・値オブジェクト・集約を自然に使いこなせる。
                </span>
              </div>
              <div className="level-item">
                <span
                  className="level-badge"
                  style={{
                    background: "rgba(167,139,250,0.15)",
                    color: "#a78bfa",
                    border: "1px solid rgba(167,139,250,0.3)",
                  }}
                >
                  Lv.5
                </span>
                <span className="level-name">アーキテクチャへの応用</span>
                <span className="level-desc">
                  クリーンアーキテクチャを実践。テスタブルで疎結合な大規模システムを設計できる。
                </span>
              </div>
            </div>

            <h3>状況別クイックリファレンス</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>状況</th>
                    <th>推奨アプローチ</th>
                    <th>根拠</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>同じロジックが2か所以上ある</td>
                    <td>メソッド抽出 / 共通クラスへ集約</td>
                    <td>DRY 原則</td>
                  </tr>
                  <tr>
                    <td>クラスが大きすぎる（300行超）</td>
                    <td>責務ごとにクラスを分割</td>
                    <td>SRP</td>
                  </tr>
                  <tr>
                    <td>if/elif が増え続ける</td>
                    <td>Strategy / Factory パターン</td>
                    <td>OCP</td>
                  </tr>
                  <tr>
                    <td>テストのためにメソッドを public にした</td>
                    <td>設計を見直し・DI を導入</td>
                    <td>テスタビリティ</td>
                  </tr>
                  <tr>
                    <td>深い継承ツリーが生まれた</td>
                    <td>コンポジション / Mixin に切り替え</td>
                    <td>LSP・保守性</td>
                  </tr>
                  <tr>
                    <td>引数が5個以上のメソッド</td>
                    <td>パラメータオブジェクトを導入</td>
                    <td>可読性・保守性</td>
                  </tr>
                  <tr>
                    <td>private メソッドをテストしたい</td>
                    <td>public インターフェースからテスト</td>
                    <td>カプセル化の尊重</td>
                  </tr>
                  <tr>
                    <td>フレームワークがビジネスロジックに侵入</td>
                    <td>抽象化レイヤーを追加（DIP）</td>
                    <td>クリーンアーキテクチャ</td>
                  </tr>
                  <tr>
                    <td>has-a 関係なのに継承を使っている</td>
                    <td>コンポジションに切り替える</td>
                    <td>「コンポジション &gt; 継承」原則</td>
                  </tr>
                  <tr>
                    <td>string で金額・メールを扱っている</td>
                    <td>値オブジェクトを導入</td>
                    <td>型安全性・バリデーション集約</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>設計の黄金ルール チェックリスト</h3>
            <div className="card-grid">
              <div className="card">
                <h4
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-head)",
                    fontSize: 14,
                    marginBottom: 12,
                  }}
                >
                  🔒 カプセル化
                </h4>
                <ul
                  style={{
                    color: "var(--text-sub)",
                    fontSize: "13.5px",
                    lineHeight: 2,
                    paddingLeft: 16,
                  }}
                >
                  <li>
                    デフォルトは <code>private</code>（<code>__</code>）から始める
                  </li>
                  <li>setter より意図を表すメソッドを使う</li>
                  <li>不変条件をコンストラクタで保証する</li>
                  <li>イミュータブルオブジェクトを積極活用する</li>
                </ul>
              </div>
              <div className="card">
                <h4
                  style={{
                    color: "var(--accent3)",
                    fontFamily: "var(--font-head)",
                    fontSize: 14,
                    marginBottom: 12,
                  }}
                >
                  🧬 継承・コンポジション
                </h4>
                <ul
                  style={{
                    color: "var(--text-sub)",
                    fontSize: "13.5px",
                    lineHeight: 2,
                    paddingLeft: 16,
                  }}
                >
                  <li>is-a 関係にのみ継承を使う</li>
                  <li>継承の深さは3階層以下を目安に</li>
                  <li>has-a 関係はコンポジションを使う</li>
                  <li>機能の追加には Mixin を活用する</li>
                </ul>
              </div>
              <div className="card">
                <h4
                  style={{
                    color: "var(--accent2)",
                    fontFamily: "var(--font-head)",
                    fontSize: 14,
                    marginBottom: 12,
                  }}
                >
                  🎯 SOLID
                </h4>
                <ul
                  style={{
                    color: "var(--text-sub)",
                    fontSize: "13.5px",
                    lineHeight: 2,
                    paddingLeft: 16,
                  }}
                >
                  <li>1クラスの変更理由は1つだけ（SRP）</li>
                  <li>新機能はクラス追加で対応（OCP）</li>
                  <li>サブクラスは親クラスを代替できる（LSP）</li>
                  <li>インターフェースは小さく分割する（ISP）</li>
                  <li>具体でなく抽象に依存する（DIP）</li>
                </ul>
              </div>
              <div className="card">
                <h4
                  style={{
                    color: "var(--warning)",
                    fontFamily: "var(--font-head)",
                    fontSize: 14,
                    marginBottom: 12,
                  }}
                >
                  🧪 テスタビリティ
                </h4>
                <ul
                  style={{
                    color: "var(--text-sub)",
                    fontSize: "13.5px",
                    lineHeight: 2,
                    paddingLeft: 16,
                  }}
                >
                  <li>依存性注入（DI）を基本にする</li>
                  <li>副作用を最小化・明示化する</li>
                  <li>振る舞い（結果）をテストする</li>
                  <li>テストが難しければ設計を疑う</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ═══════ SECTION 14: 参考文献 ═══════ */}
          <section className="section" id="sec14">
            <div className="section-header">
              <span className="section-num">14</span>
              <h2>参考文献・ソース一覧</h2>
            </div>

            <p>本ガイドの内容は以下の書籍・公式ドキュメント・権威あるブログを根拠としています。</p>

            <h3>📚 必読書籍</h3>
            <div className="book-grid">
              <div className="book-card">
                <div className="book-icon">📗</div>
                <div className="book-title">Clean Code</div>
                <div className="book-author">Robert C. Martin</div>
                <span className="book-tag">OOP 実践</span>
              </div>
              <div className="book-card">
                <div className="book-icon">📘</div>
                <div className="book-title">Clean Architecture</div>
                <div className="book-author">Robert C. Martin</div>
                <span className="book-tag">アーキテクチャ</span>
              </div>
              <div className="book-card">
                <div className="book-icon">📕</div>
                <div className="book-title">Design Patterns: GoF</div>
                <div className="book-author">Gang of Four</div>
                <span className="book-tag">パターン原典</span>
              </div>
              <div className="book-card">
                <div className="book-icon">📙</div>
                <div className="book-title">Refactoring 2nd Ed.</div>
                <div className="book-author">Martin Fowler</div>
                <span className="book-tag">リファクタリング</span>
              </div>
              <div className="book-card">
                <div className="book-icon">📗</div>
                <div className="book-title">Domain-Driven Design</div>
                <div className="book-author">Eric Evans</div>
                <span className="book-tag">DDD</span>
              </div>
              <div className="book-card">
                <div className="book-icon">📘</div>
                <div className="book-title">Head First Design Patterns</div>
                <div className="book-author">Freeman &amp; Robson</div>
                <span className="book-tag">パターン入門</span>
              </div>
              <div className="book-card">
                <div className="book-icon">📕</div>
                <div className="book-title">Fluent Python</div>
                <div className="book-author">Luciano Ramalho</div>
                <span className="book-tag">Python OOP</span>
              </div>
              <div className="book-card">
                <div className="book-icon">📙</div>
                <div className="book-title">Implementing DDD</div>
                <div className="book-author">Vaughn Vernon</div>
                <span className="book-tag">DDD 実践</span>
              </div>
            </div>

            <div className="ref-group">
              <div className="ref-group-title">🏛️ SOLID 原則・設計原則</div>
              <div className="ref-list">
                <Ext
                  className="ref-item"
                  href="https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html"
                >
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">SOLID 原則（Robert C. Martin 公式ブログ）</span>
                    <span className="ref-url">
                      blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html
                    </span>
                  </div>
                </Ext>
                <Ext
                  className="ref-item"
                  href="https://www.oodesign.com/single-responsibility-principle"
                >
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Single Responsibility Principle — OODesign.com</span>
                    <span className="ref-url">
                      www.oodesign.com/single-responsibility-principle
                    </span>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://www.oodesign.com/open-close-principle">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Open/Closed Principle — OODesign.com</span>
                    <span className="ref-url">www.oodesign.com/open-close-principle</span>
                  </div>
                </Ext>
                <Ext
                  className="ref-item"
                  href="https://www.oodesign.com/liskov-s-substitution-principle"
                >
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Liskov Substitution Principle — OODesign.com</span>
                    <span className="ref-url">
                      www.oodesign.com/liskov-s-substitution-principle
                    </span>
                  </div>
                </Ext>
                <Ext
                  className="ref-item"
                  href="https://www.oodesign.com/dependency-inversion-principle"
                >
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Dependency Inversion Principle — OODesign.com</span>
                    <span className="ref-url">www.oodesign.com/dependency-inversion-principle</span>
                  </div>
                </Ext>
              </div>
            </div>

            <div className="ref-group">
              <div className="ref-group-title">🎨 デザインパターン</div>
              <div className="ref-list">
                <Ext className="ref-item" href="https://refactoring.guru/design-patterns">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Refactoring Guru — 全23パターン図解</span>
                    <span className="ref-url">refactoring.guru/design-patterns</span>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://python-patterns.guide/">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Python Design Patterns Guide — Brandon Rhodes</span>
                    <span className="ref-url">python-patterns.guide</span>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://refactoring.guru/design-patterns/strategy">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Strategy パターン詳解 — Refactoring Guru</span>
                    <span className="ref-url">refactoring.guru/design-patterns/strategy</span>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://refactoring.guru/design-patterns/observer">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Observer パターン詳解 — Refactoring Guru</span>
                    <span className="ref-url">refactoring.guru/design-patterns/observer</span>
                  </div>
                </Ext>
              </div>
            </div>

            <div className="ref-group">
              <div className="ref-group-title">🐍 Python OOP 公式ドキュメント</div>
              <div className="ref-list">
                <Ext className="ref-item" href="https://docs.python.org/ja/3/tutorial/classes.html">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Python 公式チュートリアル — クラス</span>
                    <span className="ref-url">docs.python.org/ja/3/tutorial/classes.html</span>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://docs.python.org/ja/3/library/abc.html">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Python 公式 — abc モジュール（抽象クラス）</span>
                    <span className="ref-url">docs.python.org/ja/3/library/abc.html</span>
                  </div>
                </Ext>
                <Ext
                  className="ref-item"
                  href="https://docs.python.org/ja/3/library/dataclasses.html"
                >
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">
                      Python 公式 — dataclasses（値オブジェクトに活用）
                    </span>
                    <span className="ref-url">docs.python.org/ja/3/library/dataclasses.html</span>
                  </div>
                </Ext>
                <Ext
                  className="ref-item"
                  href="https://realpython.com/python3-object-oriented-programming/"
                >
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Real Python — OOP in Python 3 完全ガイド</span>
                    <span className="ref-url">
                      realpython.com/python3-object-oriented-programming
                    </span>
                  </div>
                </Ext>
              </div>
            </div>

            <div className="ref-group">
              <div className="ref-group-title">🏗️ アーキテクチャ・DDD</div>
              <div className="ref-list">
                <Ext
                  className="ref-item"
                  href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
                >
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Clean Architecture — Uncle Bob ブログ原文</span>
                    <span className="ref-url">
                      blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
                    </span>
                  </div>
                </Ext>
                <Ext
                  className="ref-item"
                  href="https://martinfowler.com/bliki/AnemicDomainModel.html"
                >
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">
                      Martin Fowler — Anemic Domain Model（アンチパターン解説）
                    </span>
                    <span className="ref-url">martinfowler.com/bliki/AnemicDomainModel.html</span>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://martinfowler.com/bliki/ValueObject.html">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Martin Fowler — Value Object 解説</span>
                    <span className="ref-url">martinfowler.com/bliki/ValueObject.html</span>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://github.com/cosmicpython/book">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">
                      Cosmic Python — Python × DDD + OOP 実践書（GitHub）
                    </span>
                    <span className="ref-url">github.com/cosmicpython/book</span>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://github.com/ddd-crew">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">DDD Crew — DDD 実践リソース集（GitHub）</span>
                    <span className="ref-url">github.com/ddd-crew</span>
                  </div>
                </Ext>
              </div>
            </div>

            <div className="ref-group">
              <div className="ref-group-title">🧪 テスト</div>
              <div className="ref-list">
                <Ext className="ref-item" href="https://docs.pytest.org/">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">pytest 公式ドキュメント</span>
                    <span className="ref-url">docs.pytest.org</span>
                  </div>
                </Ext>
                <Ext
                  className="ref-item"
                  href="https://martinfowler.com/articles/mocksArentStubs.html"
                >
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Martin Fowler — Mocks Aren&apos;t Stubs</span>
                    <span className="ref-url">martinfowler.com/articles/mocksArentStubs.html</span>
                  </div>
                </Ext>
                <Ext className="ref-item" href="https://martinfowler.com/bliki/TestPyramid.html">
                  <span className="ref-icon">🔗</span>
                  <div className="ref-content">
                    <span className="ref-name">Martin Fowler — テストピラミッド</span>
                    <span className="ref-url">martinfowler.com/bliki/TestPyramid.html</span>
                  </div>
                </Ext>
              </div>
            </div>

            <div className="divider" />
            <div
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: 12,
                padding: "8px 0 0",
              }}
            >
              📅 本ドキュメントは2025年時点の情報を基に作成しています。
              <br />
              各リンク・ツールの仕様は変更される場合があります。
            </div>
          </section>

          {/* ════════ FOOTER ════════ */}
          <footer className="footer">
            <span>🧱 OOP 完全ガイド — Software Architect Guide v2.0</span>
            <span>
              Python 実装例つき | <a href="#sec1">トップへ戻る ↑</a>
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
