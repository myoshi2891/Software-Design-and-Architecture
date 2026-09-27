import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import DddSidebar, { type NavGroup } from "./DddSidebar";

const NAV_GROUPS: NavGroup[] = [
  {
    label: "はじめに",
    items: [
      { id: "intro", label: "DDDとは何か" },
      { id: "structure", label: "DDDの全体構造" },
    ],
  },
  {
    label: "戦略的設計",
    items: [
      { id: "ubiquitous", label: "ユビキタス言語" },
      { id: "domain", label: "ドメインとサブドメイン" },
      { id: "bounded", label: "Bounded Context" },
      { id: "contextmap", label: "Context Map" },
    ],
  },
  {
    label: "戦術的設計",
    items: [
      { id: "entity", label: "Entity" },
      { id: "valueobject", label: "Value Object" },
      { id: "aggregate", label: "Aggregate" },
      { id: "domainevent", label: "Domain Event" },
      { id: "repository", label: "Repository" },
      { id: "domainservice", label: "Domain Service" },
      { id: "factory", label: "Factory" },
    ],
  },
  {
    label: "実践",
    items: [
      { id: "architecture", label: "アーキテクチャとの統合" },
      { id: "eventstorming", label: "Event Storming" },
      { id: "implementation", label: "ECサイト実装例" },
      { id: "antipatterns", label: "アンチパターン" },
      { id: "bestpractices", label: "ベストプラクティス" },
      { id: "references", label: "参考文献" },
    ],
  },
];

export default function DomainDrivenDesignPage() {
  return (
    <div className="domain-driven-design-comprehensive-guide">
      <DddSidebar groups={NAV_GROUPS} />
      <main className="main" id="main">
        <div className="page-header">
          <div className="page-eyebrow">Software Architecture Guide</div>
          <h1 className="page-title">DDD 完全ガイド</h1>
          <p className="page-subtitle">
            Domain-Driven
            Design（ドメイン駆動設計）を初学者から実践者まで、ステップバイステップで体系的に解説します。
          </p>
          <div className="tag-row">
            <span className="badge badge-purple">Strategic Design</span>
            <span className="badge badge-teal">Tactical Design</span>
            <span className="badge badge-coral">Event Storming</span>
            <span className="badge badge-pink">Python実装例</span>
          </div>
        </div>

        <div className="toc-grid">
          <a href="#intro" className="toc-item">
            <span className="toc-num">01</span>DDDとは何か
          </a>
          <a href="#structure" className="toc-item">
            <span className="toc-num">02</span>DDDの全体構造
          </a>
          <a href="#ubiquitous" className="toc-item">
            <span className="toc-num">03</span>ユビキタス言語
          </a>
          <a href="#domain" className="toc-item">
            <span className="toc-num">04</span>ドメインとサブドメイン
          </a>
          <a href="#bounded" className="toc-item">
            <span className="toc-num">05</span>Bounded Context
          </a>
          <a href="#contextmap" className="toc-item">
            <span className="toc-num">06</span>Context Map
          </a>
          <a href="#entity" className="toc-item">
            <span className="toc-num">07</span>Entity
          </a>
          <a href="#valueobject" className="toc-item">
            <span className="toc-num">08</span>Value Object
          </a>
          <a href="#aggregate" className="toc-item">
            <span className="toc-num">09</span>Aggregate
          </a>
          <a href="#domainevent" className="toc-item">
            <span className="toc-num">10</span>Domain Event
          </a>
          <a href="#repository" className="toc-item">
            <span className="toc-num">11</span>Repository
          </a>
          <a href="#domainservice" className="toc-item">
            <span className="toc-num">12</span>Domain Service
          </a>
          <a href="#factory" className="toc-item">
            <span className="toc-num">13</span>Factory
          </a>
          <a href="#architecture" className="toc-item">
            <span className="toc-num">14</span>アーキテクチャとの統合
          </a>
          <a href="#eventstorming" className="toc-item">
            <span className="toc-num">15</span>Event Storming
          </a>
          <a href="#implementation" className="toc-item">
            <span className="toc-num">16</span>ECサイト実装例
          </a>
          <a href="#antipatterns" className="toc-item">
            <span className="toc-num">17</span>アンチパターン
          </a>
          <a href="#bestpractices" className="toc-item">
            <span className="toc-num">18</span>ベストプラクティス
          </a>
        </div>

        <hr className="divider" />

        {/*  ================================================ SECTION 1  */}
        <section className="section" id="intro">
          <h2>
            <span className="section-num">Section 01</span>DDDとは何か
          </h2>

          <p>
            <strong>Domain-Driven Design（ドメイン駆動設計）</strong> は、Eric
            Evansが2003年の著書「Domain-Driven Design: Tackling Complexity in the Heart of
            Software」で提唱した設計哲学です。ソフトウェアの複雑さはビジネス（ドメイン）の複雑さに由来するという考えから、
            <strong>ドメインを深く理解し、そのモデルをコードに直接反映させる</strong>
            ことを核心としています。
          </p>

          <div className="callout callout-info">
            <div className="callout-label">核心思想</div>
            「ドメインエキスパートと開発者が同じ言語で語り、その言語がそのままコードになる」状態を目指す。技術ではなくビジネスの問題解決を中心に据えた設計アプローチ。
          </div>

          <h3>DDDが解決する問題</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph LR
    subgraph "DDD導入前の問題"
        P1["技術者とビジネス専門家が<br/>異なる言葉を使う"]
        P2["ビジネスロジックが<br/>コードのあちこちに散乱"]
        P3["ドメインの変化に<br/>コードが追いつかない"]
        P4["複雑な要件を<br/>正確にコードに落とせない"]
    end
    subgraph "DDD導入後の効果"
        S1["ユビキタス言語で<br/>全員が同じ言葉を使う"]
        S2["ビジネスロジックが<br/>ドメインモデルに集約"]
        S3["変化に強い<br/>柔軟なアーキテクチャ"]
        S4["複雑さを<br/>構造的に管理できる"]
    end
    P1 --> S1
    P2 --> S2
    P3 --> S3
    P4 --> S4
    style P1 fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style P2 fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style P3 fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style P4 fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style S1 fill:#0f2d1a,stroke:#27ae60,color:#a8f0c0
    style S2 fill:#0f2d1a,stroke:#27ae60,color:#a8f0c0
    style S3 fill:#0f2d1a,stroke:#27ae60,color:#a8f0c0
    style S4 fill:#0f2d1a,stroke:#27ae60,color:#a8f0c0`}
            />
          </div>

          <h3>DDDが適しているプロジェクト</h3>
          <table>
            <thead>
              <tr>
                <th>プロジェクト種別</th>
                <th>適用判断</th>
                <th>理由</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>金融システム・業務基幹</td>
                <td>
                  <span className="badge badge-teal">強く推奨</span>
                </td>
                <td>ドメイン複雑度が高く、チームも大規模</td>
              </tr>
              <tr>
                <td>ECサイト・医療記録</td>
                <td>
                  <span className="badge badge-teal">推奨</span>
                </td>
                <td>ビジネスルールが多く変化も激しい</td>
              </tr>
              <tr>
                <td>社内ツール・管理画面</td>
                <td>
                  <span className="badge badge-coral">戦術的設計のみ</span>
                </td>
                <td>Entity/Aggregateパターンだけでも有効</td>
              </tr>
              <tr>
                <td>シンプルなCRUD API</td>
                <td>
                  <span className="badge badge-pink">過剰</span>
                </td>
                <td>コスト対効果が合わない</td>
              </tr>
            </tbody>
          </table>

          <h3>DDDの学習ロードマップ</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    ST["スタート"] --> L1
    subgraph L1["Step 1: ドメイン理解 Week 1-2"]
        direction TB
        LA["ドメインとは何か理解する"]
        LB["ユビキタス言語の概念を学ぶ"]
        LA --> LB
    end
    L1 --> L2
    subgraph L2["Step 2: 戦略的設計 Week 3-4"]
        direction TB
        LD["サブドメインの分類を学ぶ"]
        LE["Bounded Contextの設計"]
        LD --> LE
    end
    L2 --> L3
    subgraph L3["Step 3: 戦術的設計 Week 5-7"]
        direction TB
        LG["Entity / Value Object"]
        LH["Aggregate の設計"]
        LI["Repository・Domain Service"]
        LG --> LH --> LI
    end
    L3 --> L4
    subgraph L4["Step 4: 実践 Week 8-12"]
        direction TB
        LK["Event Stormingの実施"]
        LL["小規模プロジェクトで適用"]
        LK --> LL
    end
    style ST fill:#3d1560,stroke:#7c3aed,color:#c4b5fd
    style L1 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style L2 fill:#2d1560,stroke:#7c3aed,color:#c4b5fd
    style L3 fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style L4 fill:#2d1a0f,stroke:#ea580c,color:#fdba74`}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">原典</span>
              <Ext href="https://www.domainlanguage.com/ddd/reference/">
                Eric Evans — DDD Reference (domainlanguage.com)
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">書籍</span>
              <span>Eric Evans「Domain-Driven Design」(2003) — 通称 "Blue Book"</span>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 2  */}
        <section className="section" id="structure">
          <h2>
            <span className="section-num">Section 02</span>DDDの全体構造
          </h2>

          <p>
            DDDは大きく<strong>戦略的設計（Strategic Design）</strong>と
            <strong>戦術的設計（Tactical Design）</strong>
            の2つの柱から成ります。戦略的設計はシステム全体をどう分割・設計するかを扱い、戦術的設計は個々のドメインをどのようにコードとして表現するかを扱います。
          </p>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TB
    DDD["DDD — Domain-Driven Design"]
    DDD --> STRAT["戦略的設計 Strategic Design<br/>システム全体をどう分割・設計するか"]
    DDD --> TACT["戦術的設計 Tactical Design<br/>個々のドメインをどうコードにするか"]
    STRAT --> S1["ユビキタス言語"]
    STRAT --> S2["ドメイン・サブドメイン"]
    STRAT --> S3["Bounded Context"]
    STRAT --> S4["Context Map"]
    TACT --> T1["Entity"]
    TACT --> T2["Value Object"]
    TACT --> T3["Aggregate"]
    TACT --> T4["Domain Event"]
    TACT --> T5["Repository"]
    TACT --> T6["Domain Service"]
    TACT --> T7["Factory"]
    style DDD fill:#1a1a2e,stroke:#7c3aed,color:#c4b5fd
    style STRAT fill:#2d1560,stroke:#7c3aed,color:#c4b5fd
    style TACT fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style S1 fill:#1d1040,stroke:#6d28d9,color:#a78bfa
    style S2 fill:#1d1040,stroke:#6d28d9,color:#a78bfa
    style S3 fill:#1d1040,stroke:#6d28d9,color:#a78bfa
    style S4 fill:#1d1040,stroke:#6d28d9,color:#a78bfa
    style T1 fill:#0c1830,stroke:#1d4ed8,color:#7db3fc
    style T2 fill:#0c1830,stroke:#1d4ed8,color:#7db3fc
    style T3 fill:#0c1830,stroke:#1d4ed8,color:#7db3fc
    style T4 fill:#0c1830,stroke:#1d4ed8,color:#7db3fc
    style T5 fill:#0c1830,stroke:#1d4ed8,color:#7db3fc
    style T6 fill:#0c1830,stroke:#1d4ed8,color:#7db3fc
    style T7 fill:#0c1830,stroke:#1d4ed8,color:#7db3fc`}
            />
          </div>

          <div className="concept-grid">
            <div className="concept-card">
              <div className="concept-card-title">
                <span className="badge badge-purple">戦略的設計</span>
              </div>
              <div className="concept-card-body">
                「どこに何を置くか」を決める設計。チームの組織構造や境界をコードに反映する。DDDの最も重要な部分であり、後から変えるコストが最も高い。
              </div>
            </div>
            <div className="concept-card">
              <div className="concept-card-title">
                <span className="badge badge-teal">戦術的設計</span>
              </div>
              <div className="concept-card-body">
                「どう表現するか」を決める設計。Entity、Aggregate等のパターンで、ドメインロジックを正確にコードに落とし込む。
              </div>
            </div>
          </div>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">参考</span>
              <Ext href="https://martinfowler.com/bliki/DomainDrivenDesign.html">
                Martin Fowler — Domain Driven Design (martinfowler.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 3  */}
        <section className="section" id="ubiquitous">
          <h2>
            <span className="section-num">Section 03</span>戦略的設計：ユビキタス言語
          </h2>

          <p>
            <strong>Ubiquitous Language（ユビキタス言語）</strong>{" "}
            とは、ビジネス専門家（ドメインエキスパート）と開発チームが共通で使う言語です。「ユビキタス（Ubiquitous）」は「どこにでも存在する」という意味で、コード・ドキュメント・会話のすべてで同じ言葉を使います。
          </p>

          <div className="callout callout-warning">
            <div className="callout-label">なぜ重要か</div>
            コードの変数名・クラス名とビジネス用語がずれると、「翻訳コスト」が発生し続ける。要件変更のたびに「この『処理』ってコードのどこ？」という認知的コストが積み重なる。
          </div>

          <h3>ユビキタス言語の構築プロセス</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
    A["ドメインエキスパートと開発者が集まる"]
    B["ビジネスの言葉でシステムを語る"]
    C["用語集 Glossary を作成する"]
    D["コードに用語を直接反映する"]
    E["用語の認識ずれを発見・修正する"]
    F["全員が同じ言葉でコミュニケーション"]
    A --> B --> C --> D --> E --> F
    F --> |"継続的に改善"| B
    style A fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style C fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style D fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style F fill:#2d1560,stroke:#7c3aed,color:#c4b5fd`}
            />
          </div>

          <h3>具体例 — ECサイトの場合</h3>
          <div className="do-dont">
            <div className="dont-box">
              <div className="label">ユビキタス言語なし（問題）</div>
              営業：「顧客が<strong>発注する</strong>」<br />
              開発：「UserがOrder<strong>を作る</strong>」<br />
              物流：「荷受け人が品物を<strong>受け取る</strong>」<br />
              DB：「user_idとitem_idを<strong>紐付け</strong>」<br />
              <br />→ 同じ操作を4つの表現で語る
            </div>
            <div className="do-box">
              <div className="label">ユビキタス言語あり（解決）</div>
              全員が統一された用語を使う：
              <br />
              <strong>顧客（Customer）</strong> が注文を出す
              <br />
              <strong>注文（Order）</strong> に注文明細を追加する
              <br />
              <strong>配送（Shipment）</strong> が顧客に届く
              <br />
              <br />→ コードのクラス名もそのまま
            </div>
          </div>

          <h3>ユビキタス言語のベストプラクティス</h3>
          <ul className="bp-list">
            <li>
              <strong>用語集を常に最新に保つ</strong> —
              チーム全員がアクセスできるドキュメントとして管理する（Confluenceやwikiなど）
            </li>
            <li>
              <strong>コードの命名と完全に一致させる</strong> —
              クラス名・メソッド名がドメイン用語と一致すること。<code>process()</code>ではなく
              <code>confirm()</code>にする
            </li>
            <li>
              <strong>あいまいな言葉を排除する</strong> —
              「処理する」「管理する」などの汎用動詞を避け、<code>confirm()</code>/
              <code>cancel()</code>のような意図が明確な名前を使う
            </li>
            <li>
              <strong>コンテキストを意識する</strong> —
              同じ「商品」でも注文コンテキストと在庫コンテキストでは意味が変わる（後のBounded
              Contextで詳述）
            </li>
            <li>
              <strong>継続的にリファインする</strong> —
              ドメインの理解が深まるにつれ、用語も進化させる。コードの大規模リネームを恐れない
            </li>
          </ul>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">公式</span>
              <Ext href="https://martinfowler.com/bliki/UbiquitousLanguage.html">
                Martin Fowler — Ubiquitous Language (martinfowler.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 4  */}
        <section className="section" id="domain">
          <h2>
            <span className="section-num">Section 04</span>戦略的設計：ドメインとサブドメイン
          </h2>

          <p>
            ビジネスドメイン全体は複数の<strong>サブドメイン</strong>
            に分割されます。それぞれのサブドメインには優先度と開発戦略が異なります。この分類を正しく行うことが、リソース配分の最適化につながります。
          </p>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TB
    DOMAIN["ビジネスドメイン全体(例:ECサイト)"]
    DOMAIN --> CORE["コアドメイン Core Domain<br/>ビジネスの競争優位性の源泉<br/>最も力を入れる領域"]
    DOMAIN --> SUP["サポートサブドメイン Supporting Subdomain<br/>コアを支援するが競争優位性には直結しない"]
    DOMAIN --> GEN["汎用サブドメイン Generic Subdomain<br/>既製品・OSS・SaaSで代替できる汎用機能"]
    CORE --> C1["独自レコメンドエンジン"]
    CORE --> C2["独自価格最適化アルゴリズム"]
    SUP --> S1["注文管理"]
    SUP --> S2["在庫管理"]
    GEN --> G1["認証・認可(Auth0等)"]
    GEN --> G2["メール送信(SendGrid等)"]
    GEN --> G3["決済(Stripe等)"]
    style DOMAIN fill:#1a1a2e,stroke:#7c3aed,color:#c4b5fd
    style CORE fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style SUP fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style GEN fill:#1a1a2e,stroke:#555580,color:#9090b0`}
            />
          </div>

          <h3>サブドメインへの投資戦略</h3>
          <table>
            <thead>
              <tr>
                <th>種別</th>
                <th>説明</th>
                <th>開発戦略</th>
                <th>ECサイト例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="badge badge-pink">コアドメイン</span>
                </td>
                <td>競合他社との差別化要因。ここが弱いとビジネスが成立しない</td>
                <td>自社開発・最高の人材・DDDを完全適用</td>
                <td>レコメンドエンジン、価格最適化</td>
              </tr>
              <tr>
                <td>
                  <span className="badge badge-coral">サポートサブドメイン</span>
                </td>
                <td>コアを支えるが差別化要因ではない。品質は必要</td>
                <td>自社開発または外注。DDDの戦術的設計を活用</td>
                <td>注文管理、在庫管理、配送追跡</td>
              </tr>
              <tr>
                <td>
                  <span className="badge badge-purple">汎用サブドメイン</span>
                </td>
                <td>業界共通の機能。独自開発する意味がない</td>
                <td>既製品・SaaS・OSS を利用。DDDは不要</td>
                <td>認証、メール、決済</td>
              </tr>
            </tbody>
          </table>

          <div className="callout callout-success">
            <div className="callout-label">ベストプラクティス</div>
            コアドメインの識別が最重要。「もしこの機能がなかったら競合他社と何が違うのか？」という問いに答えられるものがコアドメイン。全てをコアドメイン扱いすると開発リソースが分散してしまう。
          </div>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">書籍</span>
              <span>
                Vaughn Vernon「Domain-Driven Design Distilled」(2016) Chapter 2 —
                サブドメイン分類の詳細解説
              </span>
            </div>
            <div className="source-item">
              <span className="source-label">参考</span>
              <Ext href="https://github.com/ddd-crew/ddd-starter-modelling-process">
                DDD Crew — DDD Starter Modelling Process (github.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 5  */}
        <section className="section" id="bounded">
          <h2>
            <span className="section-num">Section 05</span>戦略的設計：Bounded Context
          </h2>

          <p>
            <strong>Bounded Context（境界づけられたコンテキスト）</strong>{" "}
            は、ユビキタス言語が一貫して通用する明確な境界を持ったシステムの領域です。DDDで最も重要かつ理解が難しい概念の一つです。
          </p>

          <div className="callout callout-info">
            <div className="callout-label">直感的な理解</div>
            「商品」という言葉は、注文部門では「顧客が買うもの」、在庫部門では「棚に置くもの」、配送部門では「箱に詰めて運ぶもの」と意味が変わる。Bounded
            Contextはこの意味の境界を明示する。
          </div>

          <h3>ECサイトのBounded Context例</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph LR
    subgraph OrderCtx["注文コンテキスト Order Context"]
        O_CUST["Customer — 注文者情報"]
        O_ORDER["Order — 注文全体"]
        O_ITEM["OrderItem — 注文明細"]
    end
    subgraph InvCtx["在庫コンテキスト Inventory Context"]
        I_PROD["Product — 管理対象の物"]
        I_STOCK["StockLevel — 在庫数量"]
        I_WH["Warehouse — 倉庫"]
    end
    subgraph ShipCtx["配送コンテキスト Shipping Context"]
        S_PKG["Package — 荷物"]
        S_ROUTE["DeliveryRoute — 配送経路"]
        S_CARRIER["Carrier — 配送業者"]
    end
    OrderCtx --> |"注文確定イベント"| InvCtx
    InvCtx --> |"出荷指示イベント"| ShipCtx
    style OrderCtx fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style InvCtx fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style ShipCtx fill:#2d1a0f,stroke:#ea580c,color:#fdba74`}
            />
          </div>

          <h3>「同じ言葉が意味を変える」具体例</h3>
          <table>
            <thead>
              <tr>
                <th>コンテキスト</th>
                <th>「商品（Product）」の意味</th>
                <th>重要な属性</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>注文コンテキスト</td>
                <td>顧客が注文した内容</td>
                <td>productName, unitPrice, quantity</td>
              </tr>
              <tr>
                <td>在庫コンテキスト</td>
                <td>倉庫で管理する物</td>
                <td>sku, warehouseLocation, stockCount</td>
              </tr>
              <tr>
                <td>配送コンテキスト</td>
                <td>荷物として運ぶもの</td>
                <td>weight, dimensions, fragile</td>
              </tr>
            </tbody>
          </table>

          <h3>Bounded Context境界設計フロー</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
    START["Bounded Contextの境界を決める"]
    Q1{"同じ用語が<br/>別の意味を持つか？"}
    Q2{"チームが独立して<br/>開発・デプロイできるか？"}
    Q3{"境界が大きすぎるか？"}
    SPLIT["別のコンテキストに分割する"]
    KEEP["現在の境界を維持する"]
    MERGE["コンテキストの統合を検討する"]
    REVIEW["境界を定義してユビキタス言語を確立する"]
    START --> Q1
    Q1 --> |"Yes"| SPLIT
    Q1 --> |"No"| Q2
    Q2 --> |"Yes"| KEEP
    Q2 --> |"No"| Q3
    Q3 --> |"Yes"| SPLIT
    Q3 --> |"No"| MERGE
    SPLIT --> REVIEW
    KEEP --> REVIEW
    MERGE --> REVIEW
    REVIEW --> |"継続的に見直す"| START
    style START fill:#1a1a2e,stroke:#7c3aed,color:#c4b5fd
    style SPLIT fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style KEEP fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style MERGE fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style REVIEW fill:#2d1560,stroke:#7c3aed,color:#c4b5fd`}
            />
          </div>

          <ul className="bp-list">
            <li>
              <strong>1チーム = 1〜数個のBounded Context</strong> が目安。Bounded
              Contextはチームの自律性に対応する
            </li>
            <li>
              <strong>データベースも分離する</strong> —
              別コンテキストが同じDBテーブルを直接参照すると、境界が崩れる
            </li>
            <li>
              <strong>コンテキスト間通信はイベントかAPIで</strong> — 直接オブジェクト参照を使わない
            </li>
          </ul>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">公式</span>
              <Ext href="https://martinfowler.com/bliki/BoundedContext.html">
                Martin Fowler — Bounded Context (martinfowler.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 6  */}
        <section className="section" id="contextmap">
          <h2>
            <span className="section-num">Section 06</span>戦略的設計：Context Map
          </h2>

          <p>
            <strong>Context Map</strong> は、複数のBounded
            Contextがどのように連携・依存しているかを可視化した設計図です。チーム間の関係性（依存方向・統合パターン）を明示します。
          </p>

          <h3>Context Mapの主要パターン</h3>
          <table>
            <thead>
              <tr>
                <th>パターン</th>
                <th>概要</th>
                <th>適用場面</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Partnership</td>
                <td>両チームが協力して統合を維持する</td>
                <td>対等な関係で強く連携する2チーム</td>
              </tr>
              <tr>
                <td>Shared Kernel</td>
                <td>コードの一部を共有する</td>
                <td>変更コストを共同で負担できるチーム</td>
              </tr>
              <tr>
                <td>Customer-Supplier</td>
                <td>下流が上流に要求を出せる関係</td>
                <td>上流が下流のニーズを考慮できる場合</td>
              </tr>
              <tr>
                <td>Conformist</td>
                <td>上流モデルをそのまま追従する</td>
                <td>上流が外部SaaSなど変えられない場合</td>
              </tr>
              <tr>
                <td>
                  <strong>Anticorruption Layer</strong>
                </td>
                <td>翻訳層を設けて外部モデルから自分を守る</td>
                <td>外部システムのモデルが自ドメインと合わない場合</td>
              </tr>
              <tr>
                <td>Open Host Service</td>
                <td>プロトコルを公開して統合を受け入れる</td>
                <td>多数の下流コンテキストにサービスを提供する場合</td>
              </tr>
              <tr>
                <td>Published Language</td>
                <td>共有の言語（JSONスキーマ等）で通信</td>
                <td>Open Host Serviceと組み合わせて使う</td>
              </tr>
              <tr>
                <td>Separate Ways</td>
                <td>統合せず独立して解決する</td>
                <td>統合コストが利益を上回る場合</td>
              </tr>
            </tbody>
          </table>

          <h3>ECサイトのContext Map実例</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph LR
    subgraph UPSTREAM["上流 Upstream"]
        CATALOG["商品カタログ Catalog Context<br/>OHS + PL"]
        USER["ユーザー管理 User Context<br/>OHS"]
    end
    subgraph CORE_BC["コア"]
        ORDER["注文 Order Context<br/>Core Domain"]
        PAYMENT["決済 Payment Context<br/>ACL"]
    end
    subgraph DOWNSTREAM["下流 Downstream"]
        INVENTORY["在庫 Inventory Context<br/>Conformist"]
        SHIPPING["配送 Shipping Context<br/>Customer-Supplier"]
        NOTIF["通知 Notification Context<br/>Conformist"]
    end
    CATALOG --> |"商品情報を提供"| ORDER
    USER --> |"顧客情報を提供"| ORDER
    ORDER --> |"注文確定イベント"| INVENTORY
    ORDER --> |"決済リクエスト"| PAYMENT
    INVENTORY --> |"出荷指示"| SHIPPING
    ORDER --> |"ステータス変更イベント"| NOTIF
    style CATALOG fill:#2d1560,stroke:#7c3aed,color:#c4b5fd
    style USER fill:#2d1560,stroke:#7c3aed,color:#c4b5fd
    style ORDER fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style PAYMENT fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style INVENTORY fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style SHIPPING fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style NOTIF fill:#0f2d1a,stroke:#16a34a,color:#86efac`}
            />
          </div>

          <h3>腐敗防止層（Anticorruption Layer）の仕組み</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    EXTERNAL["外部システム(決済API等)<br/>外部のモデル・言語"]
    ACL["腐敗防止層<br/>Anticorruption Layer<br/>翻訳・変換を担う"]
    INTERNAL["自ドメイン<br/>自分のユビキタス言語を守れる"]
    EXTERNAL --> |"外部モデル"| ACL
    ACL --> |"内部モデルに変換"| INTERNAL
    INTERNAL --> |"内部モデル"| ACL
    ACL --> |"外部モデルに変換"| EXTERNAL
    style EXTERNAL fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style ACL fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style INTERNAL fill:#0f2d1a,stroke:#16a34a,color:#86efac`}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">参考</span>
              <Ext href="https://github.com/ddd-crew/context-mapping">
                DDD Crew — Context Mapping (github.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 7  */}
        <section className="section" id="entity">
          <h2>
            <span className="section-num">Section 07</span>戦術的設計：Entity（エンティティ）
          </h2>

          <p>
            <strong>Entity（エンティティ）</strong> は「<strong>一意のID</strong>
            によって同一性が判断されるオブジェクト」です。属性が変わっても、IDが同じであれば「同じもの」として扱われます。
          </p>

          <h3>EntityとValue Objectの根本的な違い</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TB
    subgraph "Entity エンティティ"
        E1["一意のIDで同一性を判断"]
        E2["状態が変化する(ミュータブル)"]
        E3["ライフサイクルを持つ"]
        E4["例: 顧客 Customer<br/>名前が変わっても同じ顧客<br/>ID: cust_12345 は不変"]
    end
    subgraph "Value Object 値オブジェクト"
        V1["値によって同一性を判断"]
        V2["変更不可(イミュータブル)"]
        V3["IDを持たない"]
        V4["例: お金 Money<br/>1000円と1000円は同じ<br/>どちらのインスタンスかは無関係"]
    end
    style E1 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style E2 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style E3 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style E4 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style V1 fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style V2 fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style V3 fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style V4 fill:#0f2d1a,stroke:#16a34a,color:#86efac`}
            />
          </div>

          <h3>Entity実装例（Python）</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span className="kw">from</span> dataclasses <span className="kw">import</span> dataclass, field
<span className="kw">from</span> datetime <span className="kw">import</span> datetime
<span className="kw">from</span> uuid <span className="kw">import</span> uuid4


@<span className="fn">dataclass</span>(frozen=<span className="kw">True</span>)
<span className="kw">class</span> <span className="fn">CustomerId</span>:
    <span className="st">"""顧客IDの値オブジェクト — IDを型で守る"""</span>
    value: str

    <span className="kw">def</span> <span className="fn">__post_init__</span>(<span className="kw">self</span>):
        <span className="kw">if</span> <span className="kw">not</span> <span className="kw">self</span>.value:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"顧客IDは空にできません"</span>)

    @classmethod
    <span className="kw">def</span> <span className="fn">generate</span>(<span className="kw">cls</span>) -&gt; <span className="st">"CustomerId"</span>:
        <span className="kw">return</span> <span className="kw">cls</span>(value=<span className="fn">str</span>(<span className="fn">uuid4</span>()))


@dataclass
<span className="kw">class</span> <span className="fn">Customer</span>:
    <span className="st">""</span>"
    顧客エンティティ（Entity）
    ベストプラクティス:
      - IDで同一性を判断（属性ではない）
      - ビジネスルールをメソッドとして持つ
      - セッターを公開しない
    <span className="st">""</span>"
    id: CustomerId
    name: str
    email: str
    is_active: bool = <span className="kw">True</span>
    created_at: datetime = <span className="fn">field</span>(default_factory=datetime.now)

    <span className="kw">def</span> <span className="fn">__eq__</span>(<span className="kw">self</span>, other: object) -&gt; bool:
        <span className="st">"""IDで同一性を判断 — 属性が変わっても同じ顧客"""</span>
        <span className="kw">if</span> <span className="kw">not</span> <span className="fn">isinstance</span>(other, Customer):
            <span className="kw">return</span> <span className="kw">False</span>
        <span className="kw">return</span> <span className="kw">self</span>.id == other.id

    <span className="kw">def</span> <span className="fn">__hash__</span>(<span className="kw">self</span>) -&gt; int:
        <span className="kw">return</span> <span className="fn">hash</span>(<span className="kw">self</span>.id)

    <span className="cm"># ── ドメインロジック（ビジネスルール） ──────────────────</span>

    <span className="kw">def</span> <span className="fn">change_email</span>(<span className="kw">self</span>, new_email: str) -&gt; <span className="kw">None</span>:
        <span className="st">"""メールアドレス変更：バリデーションをEntityが責任を持つ"""</span>
        <span className="kw">if</span> <span className="kw">not</span> new_email <span className="kw">or</span> <span className="st">"@"</span> <span className="kw">not</span> <span className="kw">in</span> new_email:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"有効なメールアドレスを入力してください"</span>)
        <span className="kw">self</span>.email = new_email

    <span className="kw">def</span> <span className="fn">deactivate</span>(<span className="kw">self</span>) -&gt; <span className="kw">None</span>:
        <span className="st">"""退会処理：すでに退会済みなら例外を出す"""</span>
        <span className="kw">if</span> <span className="kw">not</span> <span className="kw">self</span>.is_active:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"すでに退会済みの顧客です"</span>)
        <span className="kw">self</span>.is_active = <span className="kw">False</span>

    @property
    <span className="kw">def</span> <span className="fn">is_valid_for_order</span>(<span className="kw">self</span>) -&gt; bool:
        <span className="st">"""注文可能かどうかのビジネスルール"""</span>
        <span className="kw">return</span> <span className="kw">self</span>.is_active`,
            }}
          />

          <h3>Entityのベストプラクティス</h3>
          <ul className="bp-list">
            <li>
              <strong>型付きIDを使う（CustomerId型）</strong> — <code>str</code>のまま渡すと
              <code>customer_id</code>と<code>order_id</code>を取り違えるバグが発生する。型で守る
            </li>
            <li>
              <strong>equalsはIDのみで比較する</strong> — <code>__eq__</code>
              で属性比較をしてはいけない。同一のエンティティを「別物」と判断してしまう
            </li>
            <li>
              <strong>セッターを公開しない</strong> — <code>customer.email = "..."</code>ではなく
              <code>customer.change_email("...")</code>にする。意図とバリデーションを含めるため
            </li>
            <li>
              <strong>不正な状態に遷移できない設計にする</strong> —
              コンストラクタとメソッドで常に整合性を保証する
            </li>
            <li>
              <strong>UUIDを推奨</strong> —
              データベースの自動採番IDはインフラ層の都合であり、ドメイン層では知らなくてよい
            </li>
          </ul>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">公式</span>
              <Ext href="https://martinfowler.com/bliki/EvansClassification.html">
                Martin Fowler — Evans Classification (martinfowler.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 8  */}
        <section className="section" id="valueobject">
          <h2>
            <span className="section-num">Section 08</span>戦術的設計：Value
            Object（値オブジェクト）
          </h2>

          <p>
            <strong>Value Object（値オブジェクト）</strong> は、「IDを持たず、
            <strong>値の組み合わせによって同一性</strong>
            が決まるオブジェクト」です。金額・住所・メールアドレスなど、「値そのもの」が重要なものに使います。
          </p>

          <h3>Value Objectの3つの特性</h3>
          <div className="concept-grid">
            <div className="concept-card">
              <div className="concept-card-title">
                <span className="badge badge-teal">イミュータブル</span>
              </div>
              <div className="concept-card-body">
                一度作ったら変更不可。変更が必要な場合は新しいオブジェクトを作る。
                <code>frozen=True</code>で実現。
              </div>
            </div>
            <div className="concept-card">
              <div className="concept-card-title">
                <span className="badge badge-purple">値による同一性</span>
              </div>
              <div className="concept-card-body">
                同じ値なら同じオブジェクトとして扱う。
                <code>Money(1000, "JPY") == Money(1000, "JPY")</code>が<code>True</code>になる。
              </div>
            </div>
            <div className="concept-card">
              <div className="concept-card-title">
                <span className="badge badge-coral">自己完結型</span>
              </div>
              <div className="concept-card-body">
                自分に関するバリデーションと計算ロジックを自分が持つ。<code>Money.add()</code>
                のように。
              </div>
            </div>
            <div className="concept-card">
              <div className="concept-card-title">
                <span className="badge badge-pink">交換可能性</span>
              </div>
              <div className="concept-card-body">
                同じ値のオブジェクトは互いに交換できる。特定のインスタンスへの参照は意味を持たない。
              </div>
            </div>
          </div>

          <h3>Value Object実装例（Python）</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span className="kw">from</span> dataclasses <span className="kw">import</span> dataclass
<span className="kw">from</span> typing <span className="kw">import</span> Literal


@<span className="fn">dataclass</span>(frozen=<span className="kw">True</span>)  <span className="cm"># frozen=True でイミュータブルにする</span>
<span className="kw">class</span> <span className="fn">Money</span>:
    <span className="st">""</span>"
    金額の値オブジェクト
    ベストプラクティス:
      - frozen=<span className="kw">True</span> で変更不可にする
      - バリデーションを __post_init__ に集める
      - 計算は新しいオブジェクトを返す
    <span className="st">""</span>"
    amount: int
    currency: Literal[<span className="st">"JPY"</span>, <span className="st">"USD"</span>, <span className="st">"EUR"</span>]

    <span className="kw">def</span> <span className="fn">__post_init__</span>(<span className="kw">self</span>):
        <span className="kw">if</span> <span className="kw">self</span>.amount &lt; <span className="nu">0</span>:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"金額は0以上でなければなりません"</span>)
        <span className="kw">if</span> <span className="kw">self</span>.currency <span className="kw">not</span> <span className="kw">in</span> (<span className="st">"JPY"</span>, <span className="st">"USD"</span>, <span className="st">"EUR"</span>):
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"未対応の通貨です: {self.currency}"</span>)

    <span className="kw">def</span> <span className="fn">add</span>(<span className="kw">self</span>, other: <span className="st">"Money"</span>) -&gt; <span className="st">"Money"</span>:
        <span className="st">"""加算: 新しい Money を返す（自分は変更しない）"""</span>
        <span className="kw">self</span>.<span className="fn">_assert_same_currency</span>(other)
        <span className="kw">return</span> <span className="fn">Money</span>(<span className="kw">self</span>.amount + other.amount, <span className="kw">self</span>.currency)

    <span className="kw">def</span> <span className="fn">subtract</span>(<span className="kw">self</span>, other: <span className="st">"Money"</span>) -&gt; <span className="st">"Money"</span>:
        <span className="st">"""減算"""</span>
        <span className="kw">self</span>.<span className="fn">_assert_same_currency</span>(other)
        <span className="kw">if</span> <span className="kw">self</span>.amount &lt; other.amount:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"差し引く金額が残高を超えています"</span>)
        <span className="kw">return</span> <span className="fn">Money</span>(<span className="kw">self</span>.amount - other.amount, <span className="kw">self</span>.currency)

    <span className="kw">def</span> <span className="fn">multiply</span>(<span className="kw">self</span>, factor: int) -&gt; <span className="st">"Money"</span>:
        <span className="st">"""乗算（個数×単価など）"""</span>
        <span className="kw">return</span> <span className="fn">Money</span>(<span className="kw">self</span>.amount * factor, <span className="kw">self</span>.currency)

    <span className="kw">def</span> <span className="fn">_assert_same_currency</span>(<span className="kw">self</span>, other: <span className="st">"Money"</span>) -&gt; <span className="kw">None</span>:
        <span className="kw">if</span> <span className="kw">self</span>.currency != other.currency:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(
                <span className="st">"通貨が一致しません: {self.currency} vs {other.currency}"</span>
            )

    <span className="kw">def</span> <span className="fn">__str__</span>(<span className="kw">self</span>) -&gt; str:
        <span className="kw">return</span> <span className="st">"{self.amount:,} {self.currency}"</span>


<span className="cm"># 使い方</span>
price = <span className="fn">Money</span>(<span className="nu">1000</span>, <span className="st">"JPY"</span>)
tax   = <span className="fn">Money</span>(<span className="nu">100</span>, <span className="st">"JPY"</span>)
total = price.<span className="fn">add</span>(tax)          <span className="cm"># Money(1100, "JPY") — 新しいオブジェクト</span>

p1 = <span className="fn">Money</span>(<span className="nu">1000</span>, <span className="st">"JPY"</span>)
p2 = <span className="fn">Money</span>(<span className="nu">1000</span>, <span className="st">"JPY"</span>)
<span className="fn">print</span>(p1 == p2)                 <span className="cm"># True — 値が同じなら等しい</span>
<span className="fn">print</span>(p1 <span className="kw">is</span> p2)                 <span className="cm"># False — インスタンスは別物</span>


@<span className="fn">dataclass</span>(frozen=<span className="kw">True</span>)
<span className="kw">class</span> <span className="fn">Address</span>:
    <span className="st">"""住所の値オブジェクト"""</span>
    postal_code: str
    prefecture: str
    city: str
    street: str
    building: str = <span className="st">""</span>

    <span className="kw">def</span> <span className="fn">__post_init__</span>(<span className="kw">self</span>):
        <span className="kw">if</span> <span className="kw">not</span> <span className="kw">self</span>.postal_code <span className="kw">or</span> <span className="kw">not</span> <span className="kw">self</span>.prefecture:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"郵便番号と都道府県は必須です"</span>)

    @property
    <span className="kw">def</span> <span className="fn">full_address</span>(<span className="kw">self</span>) -&gt; str:
        base = <span className="st">"{self.prefecture}{self.city}{self.street}"</span>
        <span className="kw">return</span> <span className="st">"{base} {self.building}"</span>.<span className="fn">strip</span>()`,
            }}
          />

          <h3>Value Objectのベストプラクティス</h3>
          <ul className="bp-list">
            <li>
              <strong>Primitiveを直接使わない（Primitive Obsession を避ける）</strong> —{" "}
              <code>str</code>のメールアドレスや<code>int</code>の金額は型の保証がない。専用の Value
              Object にする
            </li>
            <li>
              <strong>
                <code>frozen=True</code>を必ず使う
              </strong>{" "}
              — Pythonの<code>dataclass</code>ではこれがない限りイミュータブルにならない
            </li>
            <li>
              <strong>
                バリデーションは<code>__post_init__</code>に集める
              </strong>{" "}
              — インスタンス生成時点で必ず正しい状態を保証する
            </li>
            <li>
              <strong>計算結果は新しいオブジェクトで返す</strong> —{" "}
              <code>self.amount += other.amount</code>はNG。
              <code>return Money(self.amount + other.amount, ...)</code>が正解
            </li>
          </ul>
        </section>

        {/*  ================================================ SECTION 9  */}
        <section className="section" id="aggregate">
          <h2>
            <span className="section-num">Section 09</span>戦術的設計：Aggregate（集約）
          </h2>

          <p>
            <strong>Aggregate（集約）</strong>{" "}
            は、「整合性の境界を持つ、密接に関連したオブジェクト群のまとまり」です。外部からは必ず
            <strong>Aggregate Root（集約ルート）</strong>を通じてのみアクセスします。
          </p>

          <h3>Aggregateの構造</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TB
    subgraph AG["Order Aggregate 注文集約"]
        ROOT["Order — 集約ルート Aggregate Root<br/>整合性の保証責任者"]
        LINE["OrderLine — 注文明細<br/>直接アクセス不可"]
        DISC["Discount — 割引情報<br/>直接アクセス不可"]
        STATUS["OrderStatus — 注文状態<br/>値オブジェクト"]
        ROOT --> LINE
        ROOT --> DISC
        ROOT --> STATUS
    end
    EXTERNAL_OK["外部からのアクセス<br/>order.add_line(...)"]
    EXTERNAL_NG["直接アクセスは禁止<br/>order.lines0.price = ..."]
    EXTERNAL_OK --> ROOT
    EXTERNAL_NG -.->|"禁止"| LINE
    style ROOT fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style LINE fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style DISC fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style STATUS fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style EXTERNAL_OK fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style EXTERNAL_NG fill:#3d1515,stroke:#c0392b,color:#f8b8b8`}
            />
          </div>

          <h3>Aggregateの4つの設計ルール</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    R1["ルール1: 整合性境界の保護<br/>全変更はAggregate Rootを通す"]
    R2["ルール2: 小さく保つ<br/>必要最小限のオブジェクトのみ"]
    R3["ルール3: IDで参照する<br/>他のAggregateへはIDで参照"]
    R4["ルール4: 1トランザクション = 1集約<br/>変更するAggregateは1つだけ"]
    R1 --> R2 --> R3 --> R4
    style R1 fill:#2d1560,stroke:#7c3aed,color:#c4b5fd
    style R2 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style R3 fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style R4 fill:#2d1a0f,stroke:#ea580c,color:#fdba74`}
            />
          </div>

          <h3>Aggregate実装例（Python）</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span className="kw">from</span> dataclasses <span className="kw">import</span> dataclass, field
<span className="kw">from</span> typing <span className="kw">import</span> Optional
<span className="kw">from</span> enum <span className="kw">import</span> Enum


<span className="kw">class</span> <span className="fn">OrderStatus</span>(Enum):
    PENDING   = <span className="st">"pending"</span>     <span className="cm"># 注文保留中</span>
    CONFIRMED = <span className="st">"confirmed"</span>   <span className="cm"># 注文確定</span>
    SHIPPED   = <span className="st">"shipped"</span>     <span className="cm"># 発送済み</span>
    CANCELLED = <span className="st">"cancelled"</span>   <span className="cm"># キャンセル</span>


@dataclass
<span className="kw">class</span> <span className="fn">OrderLine</span>:
    <span className="st">"""注文明細 — Aggregate内部のオブジェクト（外部から直接変更不可）"""</span>
    product_id: str       <span className="cm"># 他のAggregateへはIDで参照</span>
    product_name: str
    unit_price: <span className="st">"Money"</span>
    quantity: int

    @property
    <span className="kw">def</span> <span className="fn">subtotal</span>(<span className="kw">self</span>) -&gt; <span className="st">"Money"</span>:
        <span className="kw">return</span> <span className="kw">self</span>.unit_price.<span className="fn">multiply</span>(<span className="kw">self</span>.quantity)


@dataclass
<span className="kw">class</span> <span className="fn">Order</span>:
    <span className="st">""</span>"
    注文集約ルート（Aggregate Root）
    ベストプラクティス:
      - 全変更はここを通じて行う
      - lines プロパティは tuple で返す（外部変更不可）
      - ドメインイベントをここで生成する
    <span className="st">""</span>"
    id: str
    customer_id: str             <span className="cm"># 顧客AggregateへはIDで参照</span>
    _lines: list = <span className="fn">field</span>(default_factory=list, repr=<span className="kw">False</span>)
    _status: OrderStatus = <span className="fn">field</span>(default=OrderStatus.PENDING, repr=<span className="kw">False</span>)
    _events: list = <span className="fn">field</span>(default_factory=list, repr=<span className="kw">False</span>)

    <span className="cm"># ── 公開インターフェース ─────────────────────────────────</span>

    <span className="kw">def</span> <span className="fn">add_line</span>(<span className="kw">self</span>, product_id: str, product_name: str,
                 unit_price: <span className="st">"Money"</span>, quantity: int) -&gt; <span className="kw">None</span>:
        <span className="st">"""注文明細の追加：不変条件を守りながら変更する"""</span>
        <span className="kw">self</span>.<span className="fn">_assert_can_modify</span>()
        <span className="kw">if</span> quantity &lt;= <span className="nu">0</span>:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"数量は1以上でなければなりません"</span>)
        existing = <span className="kw">self</span>.<span className="fn">_find_line</span>(product_id)
        <span className="kw">if</span> existing:
            existing.quantity += quantity
        <span className="kw">else</span>:
            <span className="kw">self</span>._lines.<span className="fn">append</span>(
                <span className="fn">OrderLine</span>(product_id, product_name, unit_price, quantity)
            )

    <span className="kw">def</span> <span className="fn">confirm</span>(<span className="kw">self</span>) -&gt; <span className="kw">None</span>:
        <span className="st">"""注文確定：状態遷移のビジネスルールを集約が保証"""</span>
        <span className="kw">if</span> <span className="kw">self</span>._status != OrderStatus.PENDING:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"保留中の注文のみ確定できます"</span>)
        <span className="kw">if</span> <span className="kw">not</span> <span className="kw">self</span>._lines:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"注文明細がありません"</span>)
        <span className="kw">self</span>._status = OrderStatus.CONFIRMED
        <span className="kw">self</span>._events.<span className="fn">append</span>(
            <span className="fn">OrderConfirmedEvent</span>(order_id=<span className="kw">self</span>.id,
                                total_amount=<span className="kw">self</span>.total_amount.amount)
        )

    <span className="kw">def</span> <span className="fn">cancel</span>(<span className="kw">self</span>) -&gt; <span className="kw">None</span>:
        <span className="st">"""注文キャンセル：発送済み以降はキャンセル不可"""</span>
        <span className="kw">if</span> <span className="kw">self</span>._status == OrderStatus.SHIPPED:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"発送済みの注文はキャンセルできません"</span>)
        <span className="kw">self</span>._status = OrderStatus.CANCELLED

    <span className="cm"># ── プロパティ（読み取り専用） ───────────────────────────</span>

    @property
    <span className="kw">def</span> <span className="fn">lines</span>(<span className="kw">self</span>) -&gt; tuple:
        <span className="st">"""外部には tuple で返す — 直接変更させない"""</span>
        <span className="kw">return</span> <span className="fn">tuple</span>(<span className="kw">self</span>._lines)

    @property
    <span className="kw">def</span> <span className="fn">status</span>(<span className="kw">self</span>) -&gt; OrderStatus:
        <span className="kw">return</span> <span className="kw">self</span>._status

    @property
    <span className="kw">def</span> <span className="fn">total_amount</span>(<span className="kw">self</span>) -&gt; <span className="st">"Money"</span>:
        <span className="kw">if</span> <span className="kw">not</span> <span className="kw">self</span>._lines:
            <span className="kw">return</span> <span className="fn">Money</span>(<span className="nu">0</span>, <span className="st">"JPY"</span>)
        totals = [line.subtotal <span className="kw">for</span> line <span className="kw">in</span> <span className="kw">self</span>._lines]
        <span className="kw">return</span> <span className="fn">sum</span>(totals[<span className="nu">1</span>:], totals[<span className="nu">0</span>])

    @property
    <span className="kw">def</span> <span className="fn">domain_events</span>(<span className="kw">self</span>) -&gt; list:
        <span className="kw">return</span> <span className="fn">list</span>(<span className="kw">self</span>._events)

    <span className="kw">def</span> <span className="fn">clear_events</span>(<span className="kw">self</span>) -&gt; <span className="kw">None</span>:
        <span className="kw">self</span>._events.<span className="fn">clear</span>()

    <span className="cm"># ── プライベートメソッド ────────────────────────────────</span>

    <span className="kw">def</span> <span className="fn">_assert_can_modify</span>(<span className="kw">self</span>) -&gt; <span className="kw">None</span>:
        <span className="kw">if</span> <span className="kw">self</span>._status != OrderStatus.PENDING:
            <span className="kw">raise</span> <span className="fn">ValueError</span>(<span className="st">"確定済みの注文は変更できません"</span>)

    <span className="kw">def</span> <span className="fn">_find_line</span>(<span className="kw">self</span>, product_id: str) -&gt; Optional[OrderLine]:
        <span className="kw">return</span> <span className="fn">next</span>((l <span className="kw">for</span> l <span className="kw">in</span> <span className="kw">self</span>._lines
                     <span className="kw">if</span> l.product_id == product_id), <span className="kw">None</span>)`,
            }}
          />

          <ul className="bp-list">
            <li>
              <strong>Aggregateは小さく保つ</strong> —
              1集約に5〜10オブジェクト以下が目安。大きすぎるとロック競合とパフォーマンス問題を招く
            </li>
            <li>
              <strong>他のAggregateへはIDで参照する</strong> — <code>Order</code>内に
              <code>Customer</code>オブジェクトを持つのではなく<code>customer_id: str</code>
              で参照する
            </li>
            <li>
              <strong>1トランザクション = 1集約の変更</strong> —
              複数集約を同時変更したい場合はDomain Eventで非同期に実現する
            </li>
          </ul>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">公式</span>
              <Ext href="https://martinfowler.com/bliki/DDD_Aggregate.html">
                Martin Fowler — DDD Aggregate (martinfowler.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 10  */}
        <section className="section" id="domainevent">
          <h2>
            <span className="section-num">Section 10</span>戦術的設計：Domain
            Event（ドメインイベント）
          </h2>

          <p>
            <strong>Domain Event（ドメインイベント）</strong>{" "}
            は「ドメイン内で起きた重要な出来事」を表すオブジェクトです。
            <strong>過去形で命名</strong>
            し、発生した事実を記録します。他のコンポーネントが反応すべき出来事をイベントとして発行することで、疎結合なシステムを実現します。
          </p>

          <h3>Domain Eventの流れ</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`sequenceDiagram
    participant CLIENT as クライアント
    participant ORDER as Order集約
    participant BUS as Event Bus
    participant INVENTORY as 在庫サービス
    participant NOTIFY as 通知サービス
    CLIENT->>ORDER: order.confirm()
    ORDER->>ORDER: 状態をCONFIRMEDに変更
    ORDER->>ORDER: OrderConfirmedEventを生成
    ORDER-->>CLIENT: 完了
    CLIENT->>BUS: イベントを発行
    BUS->>INVENTORY: OrderConfirmedEvent受信
    INVENTORY->>INVENTORY: 在庫を引き当て
    BUS->>NOTIFY: OrderConfirmedEvent受信
    NOTIFY->>NOTIFY: 注文確認メール送信`}
            />
          </div>

          <h3>Domain Event実装例（Python）</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span className="kw">from</span> dataclasses <span className="kw">import</span> dataclass, field
<span className="kw">from</span> datetime <span className="kw">import</span> datetime
<span className="kw">from</span> uuid <span className="kw">import</span> uuid4


@<span className="fn">dataclass</span>(frozen=<span className="kw">True</span>)
<span className="kw">class</span> <span className="fn">DomainEvent</span>:
    <span className="st">"""すべてのドメインイベントの基底クラス"""</span>
    event_id: str = <span className="fn">field</span>(default_factory=<span className="kw">lambda</span>: <span className="fn">str</span>(<span className="fn">uuid4</span>()))
    occurred_at: datetime = <span className="fn">field</span>(default_factory=datetime.now)


@<span className="fn">dataclass</span>(frozen=<span className="kw">True</span>)
<span className="kw">class</span> <span className="fn">OrderConfirmedEvent</span>(DomainEvent):
    <span className="st">""</span>"
    注文が確定した
    命名ベストプラクティス: 必ず過去形（OrderConfirmed）
    設計ベストプラクティス: 受信者がDBを引かなくてもよい情報を含む
    <span className="st">""</span>"
    order_id: str = <span className="st">""</span>
    customer_id: str = <span className="st">""</span>
    total_amount: int = <span className="nu">0</span>
    currency: str = <span className="st">"JPY"</span>
    item_count: int = <span className="nu">0</span>


@<span className="fn">dataclass</span>(frozen=<span className="kw">True</span>)
<span className="kw">class</span> <span className="fn">OrderCancelledEvent</span>(DomainEvent):
    <span className="st">"""注文がキャンセルされた"""</span>
    order_id: str = <span className="st">""</span>
    reason: str = <span className="st">""</span>


@<span className="fn">dataclass</span>(frozen=<span className="kw">True</span>)
<span className="kw">class</span> <span className="fn">ProductOutOfStockEvent</span>(DomainEvent):
    <span className="st">"""商品が在庫切れになった"""</span>
    product_id: str = <span className="st">""</span>
    product_name: str = <span className="st">""</span>


<span className="cm"># ── イベントハンドラー（購読者）────────────────────────────</span>

<span className="kw">class</span> <span className="fn">InventoryEventHandler</span>:
    <span className="kw">def</span> <span className="fn">handle_order_confirmed</span>(<span className="kw">self</span>, event: OrderConfirmedEvent) -&gt; <span className="kw">None</span>:
        <span className="st">"""注文確定時に在庫を引き当てる"""</span>
        <span className="fn">print</span>(<span className="st">"在庫引き当て: 注文ID {event.order_id}"</span>)

<span className="kw">class</span> <span className="fn">NotificationEventHandler</span>:
    <span className="kw">def</span> <span className="fn">handle_order_confirmed</span>(<span className="kw">self</span>, event: OrderConfirmedEvent) -&gt; <span className="kw">None</span>:
        <span className="st">"""注文確定メールを送信する"""</span>
        <span className="fn">print</span>(<span className="st">"確認メール送信: 顧客ID {event.customer_id}"</span>)`,
            }}
          />

          <h3>Domain Eventのベストプラクティス</h3>
          <div className="do-dont">
            <div className="do-box">
              <div className="label">正しい命名と設計</div>
              <strong>OrderConfirmed</strong>（注文が確定した）
              <br />
              <strong>CustomerRegistered</strong>（顧客が登録された）
              <br />
              <strong>PaymentProcessed</strong>（決済が処理された）
              <br />
              <br />→ 過去形で「事実」を表す
            </div>
            <div className="dont-box">
              <div className="label">避けるべき命名</div>
              <strong>ConfirmOrder</strong>（命令形 = コマンド）
              <br />
              <strong>OrderUpdate</strong>（何が起きたか不明）
              <br />
              <strong>Event</strong>（具体性がない）
              <br />
              <br />→ 命令形・曖昧な名前はNG
            </div>
          </div>

          <ul className="bp-list">
            <li>
              <strong>自己完結型にする</strong> —
              受信者がDBを参照しなくてもよい情報をイベントに含める。<code>order_id</code>だけでなく
              <code>customer_id</code>や<code>total_amount</code>も含める
            </li>
            <li>
              <strong>イミュータブルにする</strong> — 発生した過去の事実は変更不可。
              <code>frozen=True</code>を使う
            </li>
            <li>
              <strong>イベントIDと発生日時を持つ</strong> —
              べき等性チェックと監査ログに必要。基底クラスに入れる
            </li>
          </ul>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">参考</span>
              <Ext href="https://martinfowler.com/eaaDev/DomainEvent.html">
                Martin Fowler — Domain Event (martinfowler.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 11  */}
        <section className="section" id="repository">
          <h2>
            <span className="section-num">Section 11</span>戦術的設計：Repository（リポジトリ）
          </h2>

          <p>
            <strong>Repository（リポジトリ）</strong>{" "}
            は「Aggregateの永続化と取得を担う抽象化レイヤー」です。ドメイン層は具体的なデータベース（RDB・NoSQL等）を知らなくてよくなります。依存の逆転（DIP）を実現するための重要なパターンです。
          </p>

          <h3>アーキテクチャ上の役割</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph LR
    subgraph "ドメイン層"
        USE_CASE["PlaceOrderUseCase<br/>ユースケース"]
        REPO_IF["OrderRepository Interface<br/>抽象 — ドメイン層に置く"]
        ORDER_AGG["Order 集約"]
    end
    subgraph "インフラ層"
        REPO_IMPL["SQLAlchemyOrderRepository<br/>具体的実装"]
        DB[("PostgreSQL")]
    end
    USE_CASE --> REPO_IF
    USE_CASE --> ORDER_AGG
    REPO_IF -.->|"依存の逆転(DIP)"| REPO_IMPL
    REPO_IMPL --> DB
    style USE_CASE fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style REPO_IF fill:#2d1560,stroke:#7c3aed,color:#c4b5fd
    style ORDER_AGG fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style REPO_IMPL fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style DB fill:#1a1a2e,stroke:#555580,color:#9090b0`}
            />
          </div>

          <h3>Repository実装例（Python）</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span className="kw">from</span> abc <span className="kw">import</span> ABC, abstractmethod
<span className="kw">from</span> typing <span className="kw">import</span> Optional


<span className="cm"># ── インターフェース（ドメイン層に置く）─────────────────────</span>

<span className="kw">class</span> <span className="fn">OrderRepository</span>(ABC):
    <span className="st">""</span>"
    注文リポジトリのインターフェース
    ベストプラクティス:
      - ドメイン層はこれにのみ依存する
      - 具体的なDB実装を知らない
      - メソッドはドメイン用語で命名する
    <span className="st">""</span>"

    @abstractmethod
    <span className="kw">def</span> <span className="fn">find_by_id</span>(<span className="kw">self</span>, order_id: str) -&gt; Optional[Order]:
        ...

    @abstractmethod
    <span className="kw">def</span> <span className="fn">find_by_customer_id</span>(<span className="kw">self</span>, customer_id: str) -&gt; list[Order]:
        ...

    @abstractmethod
    <span className="kw">def</span> <span className="fn">save</span>(<span className="kw">self</span>, order: Order) -&gt; <span className="kw">None</span>:
        <span className="st">"""新規・更新どちらも同じメソッドで扱う（Upsert）"""</span>
        ...

    @abstractmethod
    <span className="kw">def</span> <span className="fn">delete</span>(<span className="kw">self</span>, order_id: str) -&gt; <span className="kw">None</span>:
        ...


<span className="cm"># ── テスト用のインメモリ実装（インフラ層）──────────────────</span>

<span className="kw">class</span> <span className="fn">InMemoryOrderRepository</span>(OrderRepository):
    <span className="st">""</span>"
    DBなしでドメインロジックをテストできる
    Unit TestではこちらのImplementationを使う
    <span className="st">""</span>"

    <span className="kw">def</span> <span className="fn">__init__</span>(<span className="kw">self</span>):
        <span className="kw">self</span>._store: dict[str, Order] = {}

    <span className="kw">def</span> <span className="fn">find_by_id</span>(<span className="kw">self</span>, order_id: str) -&gt; Optional[Order]:
        <span className="kw">return</span> <span className="kw">self</span>._store.<span className="fn">get</span>(order_id)

    <span className="kw">def</span> <span className="fn">find_by_customer_id</span>(<span className="kw">self</span>, customer_id: str) -&gt; list[Order]:
        <span className="kw">return</span> [o <span className="kw">for</span> o <span className="kw">in</span> <span className="kw">self</span>._store.<span className="fn">values</span>()
                <span className="kw">if</span> o.customer_id == customer_id]

    <span className="kw">def</span> <span className="fn">save</span>(<span className="kw">self</span>, order: Order) -&gt; <span className="kw">None</span>:
        <span className="kw">self</span>._store[order.id] = order

    <span className="kw">def</span> <span className="fn">delete</span>(<span className="kw">self</span>, order_id: str) -&gt; <span className="kw">None</span>:
        <span className="kw">self</span>._store.<span className="fn">pop</span>(order_id, <span className="kw">None</span>)


<span className="cm"># ── 本番用のSQLAlchemy実装（インフラ層）─────────────────────</span>

<span className="kw">class</span> <span className="fn">SQLAlchemyOrderRepository</span>(OrderRepository):
    <span className="st">""</span>"
    ドメインオブジェクト ←→ DBモデルの変換を担う
    変換ロジックをここに集中させる
    <span className="st">""</span>"

    <span className="kw">def</span> <span className="fn">__init__</span>(<span className="kw">self</span>, session):
        <span className="kw">self</span>._session = session

    <span className="kw">def</span> <span className="fn">find_by_id</span>(<span className="kw">self</span>, order_id: str) -&gt; Optional[Order]:
        record = (<span className="kw">self</span>._session.<span className="fn">query</span>(OrderModel)
                  .<span className="fn">filter_by</span>(id=order_id).<span className="fn">first</span>())
        <span className="kw">return</span> <span className="kw">self</span>.<span className="fn">_to_domain</span>(record) <span className="kw">if</span> record <span className="kw">else</span> <span className="kw">None</span>

    <span className="kw">def</span> <span className="fn">save</span>(<span className="kw">self</span>, order: Order) -&gt; <span className="kw">None</span>:
        record = <span className="kw">self</span>.<span className="fn">_to_model</span>(order)
        <span className="kw">self</span>._session.<span className="fn">merge</span>(record)
        <span className="kw">self</span>._session.<span className="fn">flush</span>()

    <span className="kw">def</span> <span className="fn">_to_domain</span>(<span className="kw">self</span>, record: <span className="st">"OrderModel"</span>) -&gt; Order:
        <span className="st">"""DBモデル → ドメインオブジェクトへの変換"""</span>
        <span className="cm"># ... 変換ロジック</span>
        <span className="kw">return</span> <span className="fn">Order</span>(id=record.id, customer_id=record.customer_id)

    <span className="kw">def</span> <span className="fn">_to_model</span>(<span className="kw">self</span>, order: Order) -&gt; <span className="st">"OrderModel"</span>:
        <span className="st">"""ドメインオブジェクト → DBモデルへの変換"""</span>
        <span className="kw">return</span> <span className="fn">OrderModel</span>(id=order.id,
                          customer_id=order.customer_id,
                          status=order.status.value)

    <span className="kw">def</span> <span className="fn">find_by_customer_id</span>(<span className="kw">self</span>, customer_id: str) -&gt; list[Order]:
        records = (<span className="kw">self</span>._session.<span className="fn">query</span>(OrderModel)
                   .<span className="fn">filter_by</span>(customer_id=customer_id).<span className="fn">all</span>())
        <span className="kw">return</span> [<span className="kw">self</span>.<span className="fn">_to_domain</span>(r) <span className="kw">for</span> r <span className="kw">in</span> records]

    <span className="kw">def</span> <span className="fn">delete</span>(<span className="kw">self</span>, order_id: str) -&gt; <span className="kw">None</span>:
        (<span className="kw">self</span>._session.<span className="fn">query</span>(OrderModel)
         .<span className="fn">filter_by</span>(id=order_id).<span className="fn">delete</span>())`,
            }}
          />

          <ul className="bp-list">
            <li>
              <strong>インターフェースはドメイン層・実装はインフラ層</strong> —
              DIPによって依存の方向を逆転させる。テストでのモック差し替えが容易になる
            </li>
            <li>
              <strong>Aggregateごとに1つのRepository</strong> — <code>OrderLineRepository</code>
              は作らない。<code>OrderRepository</code>が<code>OrderLine</code>の永続化も担う
            </li>
            <li>
              <strong>クエリはドメイン用語で</strong> — <code>find_by_id</code>/
              <code>find_by_customer_id</code>のようにドメイン用語を使う。<code>SELECT * FROM</code>
              をドメイン層に漏らさない
            </li>
          </ul>
        </section>

        {/*  ================================================ SECTION 12  */}
        <section className="section" id="domainservice">
          <h2>
            <span className="section-num">Section 12</span>戦術的設計：Domain
            Service（ドメインサービス）
          </h2>

          <p>
            <strong>Domain Service（ドメインサービス）</strong> は、「特定のEntityやValue
            Objectに自然に属さないドメインロジック」を置く場所です。
            <strong>複数のAggregateにまたがるビジネスルール</strong>
            や、複数のリソースを必要とする操作を担います。
          </p>

          <div className="callout callout-warning">
            <div className="callout-label">過剰使用に注意</div>
            Domain Serviceを多用しすぎると「貧血ドメインモデル（Anemic Domain
            Model）」に陥る。まずEntityやAggregateにロジックを置けないか検討し、どうしてもどこにも属さない場合のみDomain
            Serviceにする。
          </div>

          <h3>Domain ServiceとApplication Serviceの違い</h3>
          <table>
            <thead>
              <tr>
                <th>観点</th>
                <th>Domain Service</th>
                <th>Application Service</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ロジックの種別</td>
                <td>ドメインのビジネスルール</td>
                <td>ユースケースの調整（オーケストレーション）</td>
              </tr>
              <tr>
                <td>ドメイン用語</td>
                <td>ドメイン用語で記述される</td>
                <td>ドメイン用語はあまり使わない</td>
              </tr>
              <tr>
                <td>インフラへの依存</td>
                <td>原則なし</td>
                <td>リポジトリ・外部サービスを呼ぶ</td>
              </tr>
              <tr>
                <td>例</td>
                <td>割引計算、振替処理</td>
                <td>注文を受け付け保存する、メールを送る</td>
              </tr>
            </tbody>
          </table>

          <h3>Domain Service実装例（Python）</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span className="kw">class</span> <span className="fn">PricingDomainService</span>:
    <span className="st">""</span>"
    価格計算ドメインサービス
    適用理由: Customer・Order・Promotion の<span className="nu">3</span>集約にまたがるため
              どのEntityにも属さない → Domain Serviceに置く
    <span className="st">""</span>"

    <span className="kw">def</span> <span className="fn">calculate_discounted_price</span>(
        <span className="kw">self</span>,
        order: Order,
        customer: Customer,
        promotions: list[<span className="st">"Promotion"</span>],
    ) -&gt; Money:
        <span className="st">"""顧客等級とプロモーションを考慮した割引後価格を計算する"""</span>
        base_total = order.total_amount

        <span className="cm"># VIP顧客は10%割引、GOLD会員は5%割引</span>
        discount_rates = {<span className="st">"VIP"</span>: <span className="nu">0</span>.<span className="nu">10</span>, <span className="st">"GOLD"</span>: <span className="nu">0</span>.<span className="nu">05</span>}
        discount_rate = discount_rates.<span className="fn">get</span>(customer.membership_tier, <span className="nu">0</span>.<span className="nu">0</span>)

        <span className="cm"># プロモーション割引の適用</span>
        promo_discount = <span className="fn">Money</span>(<span className="nu">0</span>, base_total.currency)
        <span className="kw">for</span> promo <span className="kw">in</span> promotions:
            <span className="kw">if</span> promo.<span className="fn">is_applicable</span>(order, customer):
                promo_discount = promo_discount.<span className="fn">add</span>(
                    promo.<span className="fn">calculate_discount</span>(base_total)
                )

        member_discount = <span className="fn">Money</span>(
            <span className="fn">int</span>(base_total.amount * discount_rate),
            base_total.currency
        )

        total_discount = member_discount.<span className="fn">add</span>(promo_discount)
        <span className="cm"># 割引が合計を超えないよう min をとる</span>
        actual_discount = (total_discount
                           <span className="kw">if</span> <span className="kw">not</span> total_discount.<span className="fn">is_greater_than</span>(base_total)
                           <span className="kw">else</span> base_total)
        <span className="kw">return</span> base_total.<span className="fn">subtract</span>(actual_discount)


<span className="kw">class</span> <span className="fn">TransferDomainService</span>:
    <span className="st">""</span>"
    口座振替ドメインサービス
    適用理由: <span className="nu">2</span>つのBankAccountをまたぐ操作のため
    <span className="st">""</span>"

    <span className="kw">def</span> <span className="fn">transfer</span>(<span className="kw">self</span>,
                 source: <span className="st">"BankAccount"</span>,
                 destination: <span className="st">"BankAccount"</span>,
                 amount: Money) -&gt; <span className="kw">None</span>:
        <span className="st">"""送金: 残高チェックと両口座の更新"""</span>
        <span className="kw">if</span> <span className="kw">not</span> source.<span className="fn">has_sufficient_funds</span>(amount):
            <span className="kw">raise</span> <span className="fn">InsufficientFundsError</span>(
                <span className="st">"残高不足: 必要={amount}, 残高={source.balance}"</span>
            )
        source.<span className="fn">withdraw</span>(amount)
        destination.<span className="fn">deposit</span>(amount)`,
            }}
          />

          <ul className="bp-list">
            <li>
              <strong>ステートレスにする</strong> — Domain
              Serviceはインスタンス変数を持たない。入力→出力の純粋な関数として設計する
            </li>
            <li>
              <strong>まずEntityに置けないか確認する</strong> — Domain
              Serviceへの安易な移動は「貧血モデル」を招く
            </li>
            <li>
              <strong>ドメイン用語で命名する</strong> — <code>PricingService</code>より
              <code>PricingDomainService</code>のようにドメインサービスと明示する
            </li>
          </ul>
        </section>

        {/*  ================================================ SECTION 13  */}
        <section className="section" id="factory">
          <h2>
            <span className="section-num">Section 13</span>戦術的設計：Factory（ファクトリ）
          </h2>

          <p>
            <strong>Factory（ファクトリ）</strong>{" "}
            は「複雑なAggregateやEntityの生成ロジックをカプセル化する」パターンです。生成処理が複雑な場合にコンストラクタの代替として使います。
          </p>

          <h3>Factoryが必要かどうかの判断</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
    START["Aggregateを生成したい"]
    Q1{"生成ロジックが単純か？<br/>Order(id, customer_id) だけでOK"}
    Q2{"生成に外部リポジトリや<br/>サービスが必要か？"}
    Q3{"生成ルールにビジネス条件が<br/>含まれるか？"}
    CONSTRUCTOR["コンストラクタで十分"]
    FACTORY["Factoryを作る"]
    START --> Q1
    Q1 --> |"Yes"| CONSTRUCTOR
    Q1 --> |"No"| Q2
    Q2 --> |"Yes"| FACTORY
    Q2 --> |"No"| Q3
    Q3 --> |"Yes"| FACTORY
    Q3 --> |"No"| CONSTRUCTOR
    style CONSTRUCTOR fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style FACTORY fill:#2d1560,stroke:#7c3aed,color:#c4b5fd`}
            />
          </div>

          <h3>Factory実装例（Python）</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `<span className="kw">class</span> <span className="fn">OrderFactory</span>:
    <span className="st">""</span>"
    注文集約のファクトリ
    適用理由:
      - 顧客・商品の存在確認が必要（リポジトリへの依存）
      - 注文可否チェック（ビジネスルール）
      - これらをコンストラクタに入れるとOrderが肥大化する
    <span className="st">""</span>"

    <span className="kw">def</span> <span className="fn">__init__</span>(
        <span className="kw">self</span>,
        customer_repository: CustomerRepository,
        product_repository: ProductRepository,
    ):
        <span className="kw">self</span>._customer_repo = customer_repository
        <span className="kw">self</span>._product_repo = product_repository

    <span className="kw">def</span> <span className="fn">create_order</span>(<span className="kw">self</span>, customer_id: str,
                     items: list[dict]) -&gt; Order:
        <span className="st">""</span>"
        注文の生成: ビジネスルールを検証しながらOrderを作る
        <span className="st">""</span>"
        <span className="cm"># 顧客の存在確認と注文可否チェック</span>
        customer = <span className="kw">self</span>._customer_repo.<span className="fn">find_by_id</span>(customer_id)
        <span className="kw">if</span> <span className="kw">not</span> customer:
            <span className="kw">raise</span> <span className="fn">CustomerNotFoundError</span>(
                <span className="st">"顧客が見つかりません: {customer_id}"</span>
            )
        <span className="kw">if</span> <span className="kw">not</span> customer.is_valid_for_order:
            <span className="kw">raise</span> <span className="fn">CustomerNotEligibleError</span>(<span className="st">"この顧客は注文できません"</span>)

        order = <span className="fn">Order</span>(id=<span className="fn">str</span>(<span className="fn">uuid4</span>()), customer_id=customer_id)

        <span className="cm"># 各商品の存在確認と在庫チェック付き追加</span>
        <span className="kw">for</span> item <span className="kw">in</span> items:
            product = <span className="kw">self</span>._product_repo.<span className="fn">find_by_id</span>(item[<span className="st">"product_id"</span>])
            <span className="kw">if</span> <span className="kw">not</span> product:
                <span className="kw">raise</span> <span className="fn">ProductNotFoundError</span>(
                    <span className="st">"商品が見つかりません: {item['product_id']}"</span>
                )
            <span className="kw">if</span> <span className="kw">not</span> product.<span className="fn">is_available</span>(item[<span className="st">"quantity"</span>]):
                <span className="kw">raise</span> <span className="fn">OutOfStockError</span>(
                    <span className="st">"在庫が不足しています: {product.name}"</span>
                )
            order.<span className="fn">add_line</span>(
                product_id=product.id,
                product_name=product.name,
                unit_price=product.price,
                quantity=item[<span className="st">"quantity"</span>],
            )

        <span className="kw">return</span> order

    <span className="kw">def</span> <span className="fn">reconstruct_from_snapshot</span>(<span className="kw">self</span>, snapshot: dict) -&gt; Order:
        <span className="st">"""DBのスナップショットから注文を再構成する"""</span>
        order = <span className="fn">Order</span>(id=snapshot[<span className="st">"id"</span>],
                      customer_id=snapshot[<span className="st">"customer_id"</span>])
        <span className="cm"># ... 再構成ロジック</span>
        <span className="kw">return</span> order`,
            }}
          />

          <ul className="bp-list">
            <li>
              <strong>生成ルールの変更を1箇所に集める</strong> —
              注文生成ロジックが変わるたびにFactoryを変更するだけでよい
            </li>
            <li>
              <strong>生成されたオブジェクトは常に有効な状態</strong> —
              Factoryが全バリデーションを担うため、生成後は必ず整合性が保証される
            </li>
            <li>
              <strong>再構成（reconstruct）にも使う</strong> —
              DBからの読み出し時、ドメインオブジェクトへの変換をFactoryで担わせることができる
            </li>
          </ul>
        </section>

        {/*  ================================================ SECTION 14  */}
        <section className="section" id="architecture">
          <h2>
            <span className="section-num">Section 14</span>アーキテクチャとDDDの統合
          </h2>

          <p>
            DDDは特定のアーキテクチャを指定しませんが、特定のアーキテクチャと組み合わせると効果を最大化できます。代表的なのはレイヤードアーキテクチャとヘキサゴナルアーキテクチャです。
          </p>

          <h3>レイヤードアーキテクチャ × DDD</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TB
    subgraph UI["プレゼンテーション層"]
        CTRL["Controller / API Handler"]
        DTO["DTO / リクエスト・レスポンスモデル"]
    end
    subgraph APP["アプリケーション層"]
        AS["Application Service — ユースケースの調整役"]
        CMD["Command / Query オブジェクト"]
    end
    subgraph DOMAIN["ドメイン層 Core"]
        ENTITY2["Entity"]
        VO2["Value Object"]
        AGG2["Aggregate"]
        DS3["Domain Service"]
        DE3["Domain Event"]
        RI["Repository Interface(抽象)"]
    end
    subgraph INFRA["インフラ層"]
        REPO3["Repository 実装(SQLAlchemy等)"]
        DB2[("データベース")]
        MQ["メッセージキュー"]
    end
    UI --> APP
    APP --> DOMAIN
    DOMAIN -.->|"依存の逆転"| INFRA
    INFRA --> DB2
    INFRA --> MQ
    style UI fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style APP fill:#2d1560,stroke:#7c3aed,color:#c4b5fd
    style DOMAIN fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style INFRA fill:#0f2d1a,stroke:#16a34a,color:#86efac`}
            />
          </div>

          <h3>ヘキサゴナルアーキテクチャ（ポート&アダプター）× DDD</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph LR
    subgraph ADAPTERS_IN2["インバウンドアダプター"]
        REST2["REST API Controller"]
        GRPC2["gRPC Handler"]
        MQ_IN2["Message Queue Consumer"]
    end
    subgraph CORE2["ドメインコア"]
        AGG3["Aggregate"]
        DS4["Domain Service"]
        DE4["Domain Event"]
        IN_PORT2["Inbound Ports"]
        OUT_PORT2["Outbound Ports"]
    end
    subgraph ADAPTERS_OUT2["アウトバウンドアダプター"]
        SQL2["SQLAlchemy Repository"]
        KAFKA2["Kafka Event Publisher"]
        EMAIL3["Email Service Adapter"]
    end
    ADAPTERS_IN2 --> IN_PORT2
    IN_PORT2 --> AGG3
    AGG3 --> OUT_PORT2
    OUT_PORT2 --> ADAPTERS_OUT2
    style ADAPTERS_IN2 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style CORE2 fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style ADAPTERS_OUT2 fill:#0f2d1a,stroke:#16a34a,color:#86efac`}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">参考</span>
              <Ext href="https://web.archive.org/web/20210615175905/https://alistair.cockburn.us/hexagonal-architecture/">
                Alistair Cockburn — Hexagonal Architecture
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">参考</span>
              <Ext href="https://martinfowler.com/bliki/CQRS.html">
                Martin Fowler — CQRS (martinfowler.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 15  */}
        <section className="section" id="eventstorming">
          <h2>
            <span className="section-num">Section 15</span>Event Storming（イベントストーミング）
          </h2>

          <p>
            <strong>Event Storming</strong> は、Alberto
            Brandoliniが考案した、ドメインエキスパートと開発者が付箋紙を使って共同でドメインモデルを発見・設計するワークショップ手法です。DDDの戦略的設計を実践するための最も効果的なツールの一つです。
          </p>

          <h3>付箋のカラーコード</h3>
          <table>
            <thead>
              <tr>
                <th>色</th>
                <th>種類</th>
                <th>例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="badge badge-coral">オレンジ</span>
                </td>
                <td>Domain Event（起きた出来事・過去形）</td>
                <td>注文が確定された</td>
              </tr>
              <tr>
                <td>
                  <span className="badge badge-teal">青</span>
                </td>
                <td>Command（引き起こすアクション）</td>
                <td>注文を確定する</td>
              </tr>
              <tr>
                <td>
                  <span className="badge badge-pink">黄</span>
                </td>
                <td>Aggregate（コマンドを受け取る主体）</td>
                <td>Order集約</td>
              </tr>
              <tr>
                <td>
                  <span className="badge badge-purple">紫</span>
                </td>
                <td>Policy / Reaction（自動処理）</td>
                <td>注文確定→在庫を減らす</td>
              </tr>
              <tr>
                <td>
                  <span className="badge badge-teal">緑</span>
                </td>
                <td>Read Model（ユーザーが参照する情報）</td>
                <td>注文一覧画面</td>
              </tr>
              <tr>
                <td>白</td>
                <td>External System（外部システム）</td>
                <td>決済API</td>
              </tr>
              <tr>
                <td>
                  <span
                    className="badge"
                    style={{ background: "#3d1515", color: "#f87171", border: "1px solid #dc2626" }}
                  >
                    赤
                  </span>
                </td>
                <td>Hot Spot（問題・不明点・議論が必要）</td>
                <td>キャンセルポリシー未定</td>
              </tr>
            </tbody>
          </table>

          <h3>Event Stormingのプロセス</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    ST1["Step 1<br/>ドメインイベントを洗い出す<br/>個人作業・混沌でよい"]
    ST2["Step 2<br/>イベントを時系列に並べる<br/>チームで整理"]
    ST3["Step 3<br/>コマンドを追加する<br/>何がイベントを起こすか"]
    ST4["Step 4<br/>外部システムやアクターを追加"]
    ST5["Step 5<br/>集約を特定しグループ化"]
    ST6["Step 6<br/>Policy・自動処理を発見"]
    ST7["Step 7<br/>Bounded Contextの境界を引く"]
    ST1 --> ST2 --> ST3 --> ST4 --> ST5 --> ST6 --> ST7
    style ST1 fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style ST2 fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style ST3 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style ST4 fill:#1a1a2e,stroke:#555580,color:#9090b0
    style ST5 fill:#2d1a0f,stroke:#d97706,color:#fde68a
    style ST6 fill:#2d1560,stroke:#7c3aed,color:#c4b5fd
    style ST7 fill:#1a1a2e,stroke:#7c3aed,color:#c4b5fd`}
            />
          </div>

          <h3>ECサイトのEvent Storming結果例</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    CMD1["コマンド: カートに追加"] --> EV1["イベント: 商品がカートに追加された"]
    EV1 --> CMD2["コマンド: 注文を確定する"]
    CMD2 --> AGG1["集約: Order"]
    AGG1 --> EV2["イベント: 注文が確定された"]
    EV2 --> POL1["Policy: 注文確定されたら在庫を引き当てる"]
    EV2 --> POL2["Policy: 注文確定されたら確認メールを送る"]
    POL1 --> CMD3["コマンド: 在庫を引き当てる"]
    POL2 --> CMD4["コマンド: メールを送信する"]
    style CMD1 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style CMD2 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style CMD3 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style CMD4 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style EV1 fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style EV2 fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style AGG1 fill:#2d1a0f,stroke:#d97706,color:#fde68a
    style POL1 fill:#2d1560,stroke:#7c3aed,color:#c4b5fd
    style POL2 fill:#2d1560,stroke:#7c3aed,color:#c4b5fd`}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">公式</span>
              <Ext href="https://www.eventstorming.com/">
                Alberto Brandolini — Event Storming (eventstorming.com)
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">書籍</span>
              <Ext href="https://leanpub.com/introducing_eventstorming">
                Introducing Event Storming (leanpub.com — 無料版あり)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 16  */}
        <section className="section" id="implementation">
          <h2>
            <span className="section-num">Section 16</span>DDD実践：ECサイト完全実装例
          </h2>

          <p>
            ここまで学んできた概念を、ECサイトの注文ユースケースで統合的に示します。戦略的設計から戦術的設計まで、すべての要素がどのように連携するかを確認しましょう。
          </p>

          <h3>ドメインモデル全体像</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`classDiagram
    class Order {
        +OrderId id
        +CustomerId customerId
        +OrderStatus status
        +List lines
        +add_line(productId, name, price, qty)
        +confirm()
        +cancel()
        +total_amount() Money
    }
    class OrderLine {
        +ProductId productId
        +String productName
        +Money unitPrice
        +int quantity
        +subtotal() Money
    }
    class Customer {
        +CustomerId id
        +String name
        +Email email
        +MembershipTier tier
        +change_email(email)
        +deactivate()
    }
    class Money {
        +int amount
        +String currency
        +add(Money) Money
        +subtract(Money) Money
        +multiply(int) Money
    }
    Order "1" *-- "0..*" OrderLine : contains
    OrderLine --> Money : uses
    Customer --> Money : earns`}
            />
          </div>

          <h3>注文ユースケースの全体フロー</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`sequenceDiagram
    participant HTTP as HTTP Request
    participant CTRL as OrderController
    participant UC as PlaceOrderUseCase
    participant FACTORY as OrderFactory
    participant REPO as OrderRepository
    participant PRICE as PricingDomainService
    participant BUS as EventBus
    HTTP->>CTRL: POST /orders
    CTRL->>CTRL: リクエストをCommandに変換
    CTRL->>UC: execute(PlaceOrderCommand)
    UC->>FACTORY: create_order(customerId, items)
    FACTORY->>FACTORY: 顧客・商品の検証
    FACTORY-->>UC: Order集約
    UC->>PRICE: calculate_discounted_price(order, customer)
    PRICE-->>UC: 割引後金額
    UC->>UC: order.confirm()
    UC->>REPO: save(order)
    UC->>BUS: publish(OrderConfirmedEvent)
    BUS->>BUS: 在庫サービスに通知
    BUS->>BUS: 通知サービスに通知
    UC-->>CTRL: PlaceOrderResult
    CTRL-->>HTTP: 201 Created`}
            />
          </div>

          <h3>Application Serviceの実装例</h3>
          <pre
            dangerouslySetInnerHTML={{
              __html: `@dataclass
<span className="kw">class</span> <span className="fn">PlaceOrderCommand</span>:
    <span className="st">"""コマンドオブジェクト — ユースケースへの入力"""</span>
    customer_id: str
    items: list[dict]  <span className="cm"># [{product_id, quantity}, ...]</span>


@dataclass
<span className="kw">class</span> <span className="fn">PlaceOrderResult</span>:
    <span className="st">"""ユースケースの出力"""</span>
    order_id: str
    total_amount: int
    status: str


<span className="kw">class</span> <span className="fn">PlaceOrderUseCase</span>:
    <span className="st">""</span>"
    注文ユースケース（Application Service）
    ベストプラクティス:
      - ドメインロジックを持たない（調整役に徹する）
      - Transaction境界を管理する
      - Domain Eventを発行する
    <span className="st">""</span>"

    <span className="kw">def</span> <span className="fn">__init__</span>(
        <span className="kw">self</span>,
        order_factory: OrderFactory,
        order_repository: OrderRepository,
        customer_repository: CustomerRepository,
        pricing_service: PricingDomainService,
        event_bus: EventBus,
    ):
        <span className="kw">self</span>._factory = order_factory
        <span className="kw">self</span>._order_repo = order_repository
        <span className="kw">self</span>._customer_repo = customer_repository
        <span className="kw">self</span>._pricing_service = pricing_service
        <span className="kw">self</span>._event_bus = event_bus

    <span className="kw">def</span> <span className="fn">execute</span>(<span className="kw">self</span>, command: PlaceOrderCommand) -&gt; PlaceOrderResult:
        <span className="cm"># 1. Aggregateの生成（Factoryに委ねる）</span>
        order = <span className="kw">self</span>._factory.<span className="fn">create_order</span>(
            command.customer_id, command.items
        )

        <span className="cm"># 2. 価格計算（Domain Serviceに委ねる）</span>
        customer = <span className="kw">self</span>._customer_repo.<span className="fn">find_by_id</span>(command.customer_id)
        discounted_total = <span className="kw">self</span>._pricing_service.<span className="fn">calculate_discounted_price</span>(
            order, customer, promotions=[]
        )

        <span className="cm"># 3. 注文確定（AggregateのロジックはAggregateに委ねる）</span>
        order.<span className="fn">confirm</span>()

        <span className="cm"># 4. 永続化（Repositoryに委ねる）</span>
        <span className="kw">self</span>._order_repo.<span className="fn">save</span>(order)

        <span className="cm"># 5. Domain Eventの発行</span>
        <span className="kw">for</span> event <span className="kw">in</span> order.domain_events:
            <span className="kw">self</span>._event_bus.<span className="fn">publish</span>(event)
        order.<span className="fn">clear_events</span>()

        <span className="kw">return</span> <span className="fn">PlaceOrderResult</span>(
            order_id=order.id,
            total_amount=discounted_total.amount,
            status=order.status.value,
        )`,
            }}
          />

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">実装例</span>
              <Ext href="https://github.com/cosmicpython/book">
                Cosmic Python — Architecture Patterns with Python (github.com)
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">実装例</span>
              <Ext href="https://github.com/dotnet-architecture/eShopOnContainers">
                Microsoft — eShopOnContainers DDD実装例 (github.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 17  */}
        <section className="section" id="antipatterns">
          <h2>
            <span className="section-num">Section 17</span>DDDのアンチパターン
          </h2>

          <p>
            DDDを適用するうえで陥りやすい失敗パターンを理解しておくことは、正しい設計を維持するために不可欠です。
          </p>

          <h3>アンチパターン一覧と修正方法</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    subgraph "Before 問題"
        B1["貧血ドメインモデル<br/>Entityがデータだけ<br/>order.set_status('confirmed')"]
        B2["神集約 God Aggregate<br/>1集約が顧客・商品・<br/>在庫・配送すべてを含む"]
        B3["ドメイン漏洩<br/>ビジネスルールがSQL・<br/>Controllerに散在"]
        B4["共有DB<br/>複数コンテキストが<br/>同じテーブルを参照"]
    end
    subgraph "After 解決"
        A1["リッチモデル<br/>Entityがロジックを持つ<br/>order.confirm()"]
        A2["小さな集約<br/>Aggregateを適切に分割<br/>他集約はIDで参照"]
        A3["ドメイン層に集約<br/>ビジネスルールは<br/>Entity・Domain Serviceに"]
        A4["コンテキスト別DB<br/>各コンテキストが<br/>独自のDBを持つ"]
    end
    B1 --> A1
    B2 --> A2
    B3 --> A3
    B4 --> A4
    style B1 fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style B2 fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style B3 fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style B4 fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style A1 fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style A2 fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style A3 fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style A4 fill:#0f2d1a,stroke:#16a34a,color:#86efac`}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>アンチパターン</th>
                <th>症状</th>
                <th>解決策</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  貧血ドメインモデル
                  <br />
                  <em>Anemic Domain Model</em>
                </td>
                <td>Entityがgetter/setterだけを持ち、ビジネスロジックがServiceに流出している</td>
                <td>
                  <code>order.confirm()</code>のようにEntityがロジックを持つ「リッチモデル」にする
                </td>
              </tr>
              <tr>
                <td>
                  神集約
                  <br />
                  <em>God Aggregate</em>
                </td>
                <td>
                  1つの集約があまりにも多くを含む。変更のたびにロック競合・巨大トランザクションが発生
                </td>
                <td>集約を適切に分割し、他集約への参照はIDで行う</td>
              </tr>
              <tr>
                <td>
                  ドメイン漏洩
                  <br />
                  <em>Domain Leakage</em>
                </td>
                <td>ビジネスルールがController・SQLクエリ・フロントエンドに散らばっている</td>
                <td>ビジネスルールはEntity・Value Object・Domain Serviceに集約する</td>
              </tr>
              <tr>
                <td>
                  共有データベース
                  <br />
                  <em>Shared Database</em>
                </td>
                <td>複数のBounded Contextが同じDBテーブルを共有し、変更時に全コンテキストに影響</td>
                <td>各コンテキストが独自のDB/スキーマを持ち、イベントで連携する</td>
              </tr>
              <tr>
                <td>過剰なDomainService</td>
                <td>すべてのロジックをDomain Serviceに置き、Entityが空になっている</td>
                <td>
                  まずEntityに置けないか検討する。Domain Serviceは本当に複数集約をまたぐ場合のみ
                </td>
              </tr>
            </tbody>
          </table>

          <div className="source-list">
            <div className="source-item">
              <span className="source-label">参考</span>
              <Ext href="https://martinfowler.com/bliki/AnemicDomainModel.html">
                Martin Fowler — Anemic Domain Model (martinfowler.com)
              </Ext>
            </div>
          </div>
        </section>

        {/*  ================================================ SECTION 18  */}
        <section className="section" id="bestpractices">
          <h2>
            <span className="section-num">Section 18</span>各設計要素のベストプラクティス一覧
          </h2>

          <table>
            <thead>
              <tr>
                <th>要素</th>
                <th>一言説明</th>
                <th>判断基準</th>
                <th>最重要ルール</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Entity</strong>
                </td>
                <td>IDで区別されるオブジェクト</td>
                <td>ライフサイクルを持ち、IDで追跡する必要があるか？</td>
                <td>IDは型付き値オブジェクトにする。セッターを公開しない</td>
              </tr>
              <tr>
                <td>
                  <strong>Value Object</strong>
                </td>
                <td>値で区別されるオブジェクト</td>
                <td>交換可能で、IDが不要か？</td>
                <td>
                  <code>frozen=True</code>でイミュータブルに。バリデーションをここに集める
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Aggregate</strong>
                </td>
                <td>整合性境界のまとまり</td>
                <td>1トランザクションで整合性を保証すべき範囲はどこか？</td>
                <td>小さく保つ。他Aggregateへの参照はIDで</td>
              </tr>
              <tr>
                <td>
                  <strong>Domain Event</strong>
                </td>
                <td>起きた重要な出来事</td>
                <td>他のコンポーネントが反応すべき出来事か？</td>
                <td>過去形で命名。自己完結型にする</td>
              </tr>
              <tr>
                <td>
                  <strong>Repository</strong>
                </td>
                <td>永続化の抽象化</td>
                <td>Aggregateの保存・取得が必要か？</td>
                <td>インターフェースはドメイン層。実装はインフラ層</td>
              </tr>
              <tr>
                <td>
                  <strong>Domain Service</strong>
                </td>
                <td>どのEntityにも属さないロジック</td>
                <td>複数のEntityにまたがるビジネスルールか？</td>
                <td>ステートレスにする。まずEntityに置けないか確認</td>
              </tr>
              <tr>
                <td>
                  <strong>Factory</strong>
                </td>
                <td>複雑な生成のカプセル化</td>
                <td>生成に複雑なビジネスルールや外部依存が必要か？</td>
                <td>生成ルールの変更を1箇所に集める</td>
              </tr>
            </tbody>
          </table>

          <h3>DDDの成熟度モデル</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    LV0["Level 0<br/>DDD未適用<br/>手続き型コード"]
    LV1["Level 1<br/>基本的な戦術パターン<br/>Entity・Value Object"]
    LV2["Level 2<br/>集約と整合性管理<br/>Aggregateの境界を意識"]
    LV3["Level 3<br/>戦略的設計の適用<br/>Bounded Context・Context Map"]
    LV4["Level 4<br/>Event Driven DDD<br/>Domain Eventを中心とした疎結合設計"]
    LV5["Level 5<br/>継続的改善<br/>Event Storming定期実施"]
    LV0 --> LV1 --> LV2 --> LV3 --> LV4 --> LV5
    style LV0 fill:#3d1515,stroke:#c0392b,color:#f8b8b8
    style LV1 fill:#2d1a0f,stroke:#ea580c,color:#fdba74
    style LV2 fill:#2d1a0f,stroke:#d97706,color:#fde68a
    style LV3 fill:#0f2d1a,stroke:#16a34a,color:#86efac
    style LV4 fill:#0e1a2e,stroke:#2563eb,color:#93c5fd
    style LV5 fill:#2d1560,stroke:#7c3aed,color:#c4b5fd`}
            />
          </div>
        </section>

        {/*  ================================================ SECTION 19  */}
        <section className="section" id="references">
          <h2>
            <span className="section-num">参考文献</span>ソース・参考文献一覧
          </h2>

          <h3>必読書籍</h3>
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
                  <strong>Domain-Driven Design</strong>
                </td>
                <td>Eric Evans</td>
                <td>★★★★★</td>
                <td>DDD原典「Blue Book」。全概念の定義元</td>
              </tr>
              <tr>
                <td>
                  <strong>Implementing Domain-Driven Design</strong>
                </td>
                <td>Vaughn Vernon</td>
                <td>★★★★☆</td>
                <td>DDDの実践的実装ガイド「Red Book」</td>
              </tr>
              <tr>
                <td>
                  <strong>Domain-Driven Design Distilled</strong>
                </td>
                <td>Vaughn Vernon</td>
                <td>★★★☆☆</td>
                <td>DDDのエッセンスを凝縮した入門書</td>
              </tr>
              <tr>
                <td>
                  <strong>Learning Domain-Driven Design</strong>
                </td>
                <td>Vlad Khononov</td>
                <td>★★★☆☆</td>
                <td>2021年出版の最新入門書。図解豊富</td>
              </tr>
              <tr>
                <td>
                  <strong>Architecture Patterns with Python</strong>
                </td>
                <td>Harry Percival, Bob Gregory</td>
                <td>★★★☆☆</td>
                <td>PythonでのDDD実践（Cosmic Python）</td>
              </tr>
            </tbody>
          </table>

          <h3>公式ドキュメント・URL</h3>
          <div className="source-list">
            <div className="source-item">
              <span className="source-label">Eric Evans</span>
              <Ext href="https://www.domainlanguage.com/ddd/reference/">
                DDD Reference — domainlanguage.com
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">Martin Fowler</span>
              <Ext href="https://martinfowler.com/bliki/BoundedContext.html">
                Bounded Context — martinfowler.com
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">Martin Fowler</span>
              <Ext href="https://martinfowler.com/bliki/UbiquitousLanguage.html">
                Ubiquitous Language — martinfowler.com
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">Martin Fowler</span>
              <Ext href="https://martinfowler.com/bliki/DDD_Aggregate.html">
                DDD Aggregate — martinfowler.com
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">Martin Fowler</span>
              <Ext href="https://martinfowler.com/bliki/AnemicDomainModel.html">
                Anemic Domain Model — martinfowler.com
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">Martin Fowler</span>
              <Ext href="https://martinfowler.com/bliki/CQRS.html">CQRS — martinfowler.com</Ext>
            </div>
            <div className="source-item">
              <span className="source-label">Martin Fowler</span>
              <Ext href="https://martinfowler.com/eaaDev/EventSourcing.html">
                Event Sourcing — martinfowler.com
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">Alberto Brandolini</span>
              <Ext href="https://www.eventstorming.com/">Event Storming — eventstorming.com</Ext>
            </div>
            <div className="source-item">
              <span className="source-label">DDD Crew</span>
              <Ext href="https://github.com/ddd-crew">DDD Crew GitHub — github.com/ddd-crew</Ext>
            </div>
            <div className="source-item">
              <span className="source-label">Awesome DDD</span>
              <Ext href="https://github.com/heynickc/awesome-ddd">
                Awesome DDD — github.com/heynickc/awesome-ddd
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">実装例 Python</span>
              <Ext href="https://github.com/cosmicpython/book">
                Cosmic Python — github.com/cosmicpython/book
              </Ext>
            </div>
            <div className="source-item">
              <span className="source-label">実装例 .NET</span>
              <Ext href="https://github.com/dotnet-architecture/eShopOnContainers">
                eShopOnContainers — github.com/dotnet-architecture
              </Ext>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
