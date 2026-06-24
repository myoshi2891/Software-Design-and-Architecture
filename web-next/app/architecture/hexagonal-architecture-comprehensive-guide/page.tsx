import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconArrowLeftCircle,
  IconArrowRight,
  IconArrowRightCircle,
  IconArrowsExchange,
  IconArrowsExchange2,
  IconArrowsRight,
  IconBulb,
  IconCheck,
  IconCircleDot,
  IconClock,
  IconCode,
  IconDeviceAnalytics,
  IconDoorEnter,
  IconDoorExit,
  IconFileCode,
  IconFolder,
  IconGitBranch,
  IconGitCommit,
  IconHexagon,
  IconInfoCircle,
  IconLayout,
  IconLink,
  IconMapPin,
  IconReplace,
  IconShoppingCart,
  IconTag,
  IconTestPipe,
  IconTimeline,
  IconTopologyStar3,
  IconTriangle,
  IconUser,
  IconVocabulary,
  IconX,
} from "@tabler/icons-react";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import HexagonalArchitectureSidebar, { type NavGroup } from "./HexagonalArchitectureSidebar";

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "s1", emoji: "💡", label: "概要・背景" },
      { id: "s2", emoji: "🔌", label: "ポートとアダプター" },
      { id: "s3", emoji: "🕸️", label: "全体像・依存の方向" },
    ],
  },
  {
    title: "設計詳解",
    items: [
      { id: "s4", emoji: "➡️", label: "ドライビング側" },
      { id: "s5", emoji: "⬅️", label: "ドリブン側" },
      { id: "s6", emoji: "🟢", label: "アプリケーションコア" },
      { id: "s7", emoji: "🔄", label: "依存性逆転・注入" },
    ],
  },
  {
    title: "実践",
    items: [
      { id: "s8", emoji: "🧪", label: "テスト戦略" },
      { id: "s9", emoji: "📊", label: "比較・統合" },
      { id: "s10", emoji: "📁", label: "ディレクトリ構成" },
      { id: "s11", emoji: "🪜", label: "段階的導入" },
      { id: "s12", emoji: "🛒", label: "ECサイト実装例" },
    ],
  },
  {
    title: "まとめ",
    items: [
      { id: "s13", emoji: "⚠️", label: "アンチパターン" },
      { id: "s14", emoji: "🏆", label: "ベストプラクティス" },
      { id: "s15", emoji: "📚", label: "参考文献" },
    ],
  },
];

export default function Page() {
  return (
    <div className="hexagonal-architecture-comprehensive-guide">
      <HexagonalArchitectureSidebar groups={NAV_GROUPS} />
      <main className="main">
        <div className="page-hero">
          <div className="hero-badge">
            <IconHexagon size={16} /> Architecture Pattern
          </div>
          <h1 className="page-title">
            ヘキサゴナルアーキテクチャ
            <br />
            完全ガイド
          </h1>
          <p className="page-lead">
            ビジネスロジックを技術的詳細から完全に切り離し、テスト容易性・技術的独立性・対称性を実現するソフトウェアアーキテクチャパターン。初学者が「なぜそう設計するのか」から理解できる構成で解説します。
          </p>
          <div className="meta-row">
            <div className="meta-chip">
              <IconUser size={16} /> Alistair Cockburn (2005)
            </div>
            <div className="meta-chip">
              <IconTag size={16} /> Ports &amp; Adapters Pattern
            </div>
            <div className="meta-chip">
              <IconCode size={16} /> Python 実装例付き
            </div>
            <div className="meta-chip">
              <IconClock size={16} /> 読了 60〜90分
            </div>
          </div>
        </div>

        {/* ========== SECTION 1 ========== */}
        <section id="s1" className="section">
          <h2>
            <span className="section-num">01</span> ヘキサゴナルアーキテクチャとは何か？
          </h2>

          <h3>1.1 定義と一言サマリー</h3>
          <p>
            ヘキサゴナルアーキテクチャ（Hexagonal Architecture）は、2005年に{" "}
            <strong>Alistair Cockburn</strong> が提唱したアーキテクチャパターンです。正式名称は{" "}
            <strong>「ポート＆アダプターパターン（Ports and Adapters）」</strong> とも呼ばれます。
          </p>
          <div className="callout info">
            <IconBulb size={16} className="callout-icon" />
            <div>
              「アプリケーションのビジネスロジック（コア）を、データベース・UI・外部APIといった技術的詳細から完全に切り離し、どの方向からでも等しくテスト・利用できる構造を作る」パターンです。六角形という名前は、アプリケーションの各接続点（ポート）を視覚的に表現するためのもので、六角形の各辺がひとつのポートを表します。
            </div>
          </div>

          <h3>1.2 このアーキテクチャが解決する問題</h3>
          <p>
            従来のレイヤードアーキテクチャでは、ビジネスロジックが技術的詳細に汚染される問題が起きていました。具体的にはどんな問題なのか確認しましょう。
          </p>

          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconGitBranch size={16} /> 問題と解決策 of 対応図
            </div>
            <MermaidDiagram
              chart={`graph LR
  subgraph P["❌ 従来の問題"]
    P1["ビジネスロジックが<br>フレームワークに依存"]
    P2["テストに実DBが必要<br>→ 遅い・壊れやすい"]
    P3["UIを変えると<br>コアも修正が必要"]
    P4["外部APIとの結合が強く<br>差し替えが困難"]
  end
  subgraph S["✅ ヘキサゴナルが解決"]
    S1["コアはフレームワーク非依存<br>純粋なコードのみ"]
    S2["インメモリ実装で<br>DBなしでもテスト可能"]
    S3["UIはアダプターを変えるだけ<br>コアには無変更"]
    S4["ポート経由で差し替え可能<br>実装を交換するだけ"]
  end
  P1 --> S1
  P2 --> S2
  P3 --> S3
  P4 --> S4

  style P1 fill:#161b22,stroke:#30363d,color:#e6edf3
  style P2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style P3 fill:#161b22,stroke:#30363d,color:#e6edf3
  style P4 fill:#161b22,stroke:#30363d,color:#e6edf3
  style S1 fill:#161b22,stroke:#30363d,color:#e6edf3
  style S2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style S3 fill:#161b22,stroke:#30363d,color:#e6edf3
  style S4 fill:#161b22,stroke:#30363d,color:#e6edf3`}
            />
          </div>

          <h3>1.3 三つの設計目標</h3>
          <div className="grid-2">
            <div className="card">
              <div className="card-title">
                <IconTestPipe size={20} className="card-icon-core" /> テスト容易性
              </div>
              <p>
                ビジネスロジックをDB・UI・外部APIなしで完全にテストできる。インメモリ実装に差し替えれば本物のインフラは不要。
              </p>
            </div>
            <div className="card">
              <div className="card-title">
                <IconReplace size={20} className="card-icon-driving" /> 技術的独立性
              </div>
              <p>
                DB・フレームワーク・UIは交換可能なプラグインに過ぎない。コアへの影響ゼロで入れ替えができる。
              </p>
            </div>
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <div className="card-title">
              <IconArrowsExchange size={20} className="card-icon-driven" /> 対称性
            </div>
            <p>
              HTTP・CLI・イベントキューなど、どのインターフェースからでも同じ方法でアプリを起動できる。特定のUIに縛られない設計。
            </p>
          </div>

          <h3>1.4 アーキテクチャの歴史的位置づけ</h3>
          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconTimeline size={16} /> アーキテクチャパターンの進化
            </div>
            <MermaidDiagram
              chart={`graph TD
  T1["<strong>2000年代初期: 伝統的なレイヤードアーキテクチャ</strong><br>Presentation → Business → Data"]
  T2["<strong>2005年: Alistair Cockburn がヘキサゴナルを提唱</strong><br>「Ports and Adapters」パターン"]
  T3["<strong>2008年: Jeffrey Palermo がオニオンアーキテクチャを提唱</strong><br>ヘキサゴナルを発展させた同心円モデル"]
  T4["<strong>2012年: Robert C. Martin がクリーンアーキテクチャを発表</strong><br>ヘキサゴナル・オニオンを統合・体系化"]
  T5["<strong>2020年代: マイクロサービスとの組み合わせが主流</strong><br>各サービス内部にヘキサゴナルを適用"]

  T1 --> T2
  T2 --> T3
  T3 --> T4
  T4 --> T5

  style T1 fill:#161b22,stroke:#30363d,color:#e6edf3
  style T2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style T3 fill:#161b22,stroke:#30363d,color:#e6edf3
  style T4 fill:#161b22,stroke:#30363d,color:#e6edf3
  style T5 fill:#161b22,stroke:#30363d,color:#e6edf3`}
            />
          </div>

          <div className="callout success">
            <IconLink size={16} className="callout-icon" />
            <div>
              <strong>一次ソース：</strong>{" "}
              <Ext href="https://web.archive.org/web/20210615175905/https://alistair.cockburn.us/hexagonal-architecture/">
                Alistair Cockburn 原著論文（Web Archive）
              </Ext>{" "}
              — ヘキサゴナルアーキテクチャの提唱者による公式定義。
            </div>
          </div>
        </section>

        {/* ========== SECTION 2 ========== */}
        <section id="s2" className="section">
          <h2>
            <span className="section-num">02</span> コア概念：ポートとアダプター
          </h2>

          <h3>2.1 ポート（Port）とは何か</h3>
          <p>
            <strong>ポート</strong>とはアプリケーションコアが外部世界と通信するための
            <strong>インターフェース（契約）</strong>
            です。ポートはコアが「何が必要か」を宣言しますが、「どう実現するか」は知りません。これがポートの最重要特性です。
          </p>

          <div className="grid-2">
            <div className="card driving">
              <div className="card-title">
                <IconDoorEnter size={20} className="card-icon-driving" />{" "}
                ドライビングポート（Inbound Port）
              </div>
              <p>
                外部からアプリを駆動する<strong>入口</strong>
                。「アプリが提供するもの」を定義します。
                <br />
                <br />
                例：注文を作成する、商品を検索する
              </p>
            </div>
            <div className="card driven">
              <div className="card-title">
                <IconDoorExit size={20} className="card-icon-driven" /> ドリブンポート（Outbound
                Port）
              </div>
              <p>
                アプリが外部リソースを使うための<strong>出口</strong>
                。「アプリが必要とするもの」を定義します。
                <br />
                <br />
                例：注文を保存する、メールを送る
              </p>
            </div>
          </div>

          <h3>2.2 アダプター（Adapter）とは何か</h3>
          <p>
            <strong>アダプター</strong>はポートの<strong>具体的な実装</strong>
            です。外部の技術的詳細（HTTP・SQL・メール等）をポートのインターフェースに変換する橋渡し役です。アダプターを差し替えることで、コアに一切触れずにインフラを交換できます。
          </p>

          <table>
            <thead>
              <tr>
                <th>種類</th>
                <th>役割</th>
                <th>実装例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="tag green">ドライビングアダプター</span>
                </td>
                <td>外部入力をポートの呼び出しに変換</td>
                <td>REST Controller / CLI / gRPC / Queue Consumer</td>
              </tr>
              <tr>
                <td>
                  <span className="tag blue">ドリブンアダプター</span>
                </td>
                <td>ポートの呼び出しを外部操作に変換</td>
                <td>SQLAlchemy Repository / Redis / Stripe / SendGrid</td>
              </tr>
              <tr>
                <td>
                  <span className="tag green">テスト用アダプター</span>
                </td>
                <td>テスト時にインフラを置き換える</td>
                <td>InMemoryRepository / FakeEmailAdapter</td>
              </tr>
            </tbody>
          </table>

          <h3>2.3 ポートとアダプターの関係図</h3>
          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconGitCommit size={16} /> データフローと変換の流れ
            </div>
            <MermaidDiagram
              chart={`flowchart LR
  USER["👤 ユーザー"] -->|"HTTPリクエスト"| DA["🟢 REST アダプター\\nドライビングアダプター"]
  DA -->|"インターフェース呼び出し"| DP["🟢 ドライビングポート\\ninterface OrderUseCase"]
  DP --> CORE["🔷 アプリケーションコア\\nOrderService\\nビジネスロジック"]
  CORE --> DRP["🔵 ドリブンポート\\ninterface OrderRepository"]
  DRP -->|"インターフェース呼び出し"| DRA["🔵 SQLアダプター\\nドリブンアダプター"]
  DRA -->|"SQL実行"| DB[("🗄️ データベース")]

  style USER fill:#161b22,stroke:#30363d,color:#e6edf3
  style DA fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style DP fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style CORE fill:#1e3a8a,stroke:#2563eb,color:#60a5fa
  style DRP fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style DRA fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style DB fill:#161b22,stroke:#30363d,color:#e6edf3`}
            />
          </div>

          <h3>2.4 ポート命名 of ベストプラクティス</h3>
          <div className="callout warning">
            <IconAlertTriangle size={16} className="callout-icon" />
            <div>
              ポートの名前は<strong>ビジネス語彙</strong>
              で命名するのが鉄則です。技術用語（SQL・HTTP・Redis）をポート名に含めてはいけません。ポートはコアの「意図」を表現するものであり、「実装手段」を表現するものではないからです。
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>種類</th>
                <th>良い命名 ✅</th>
                <th>悪い命名 ❌</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ドライビングポート</td>
                <td>
                  <code>PlaceOrderPort</code>
                  <br />
                  <code>SearchProductsPort</code>
                </td>
                <td>
                  <code>OrderController</code>
                  <br />
                  <code>IOrder</code>
                </td>
              </tr>
              <tr>
                <td>ドリブンポート</td>
                <td>
                  <code>SaveOrderPort</code>
                  <br />
                  <code>SendEmailPort</code>
                </td>
                <td>
                  <code>OrderRepository</code>
                  <br />
                  <code>DatabasePort</code>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ========== SECTION 3 ========== */}
        <section id="s3" className="section">
          <h2>
            <span className="section-num">03</span> アーキテクチャ全体像と依存の方向
          </h2>

          <h3>3.1 六角形の全体構造</h3>
          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconTopologyStar3 size={16} /> ヘキサゴン全体像（簡略版）
            </div>
            <MermaidDiagram
              chart={`flowchart LR
  subgraph EXT_L["外部（左：ドライビング側）"]
    HTTP["🌐 HTTPクライアント"]
    CLI2["💻 CLI"]
    TEST2["🧪 テスト"]
  end
  subgraph HEX["🔷 ヘキサゴン"]
    subgraph DA2["ドライビングアダプター"]
      RC["REST Controller"]
      CC["CLI Handler"]
    end
    subgraph DP2["ドライビングポート"]
      PO2["PlaceOrderPort"]
      SP2["SearchProductPort"]
    end
    subgraph CORE2["アプリケーションコア"]
      OS["OrderService"]
      PS["ProductService"]
      OE["Order エンティティ"]
    end
    subgraph DRP2["ドリブンポート"]
      OR2["SaveOrderPort"]
      LR2["LoadProductPort"]
      EM2["SendEmailPort"]
    end
    subgraph DRA2["ドリブンアダプター"]
      SQ["SQL Repo"]
      EML2["Email Adapter"]
    end
  end
  subgraph EXT_R["外部（右：ドリブン側）"]
    DB2[("PostgreSQL")]
    SG2["SendGrid"]
  end
  HTTP & CLI2 & TEST2 --> RC & CC
  RC & CC --> PO2 & SP2
  PO2 & SP2 --> OS & PS
  OS --> OR2 & EM2
  PS --> LR2
  OR2 --> SQ
  LR2 --> SQ
  EM2 --> EML2
  SQ --> DB2
  EML2 --> SG2

  style HTTP fill:#161b22,stroke:#30363d,color:#e6edf3
  style CLI2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style TEST2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style RC fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style CC fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style PO2 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style SP2 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style OS fill:#1e3a8a,stroke:#2563eb,color:#60a5fa
  style PS fill:#1e3a8a,stroke:#2563eb,color:#60a5fa
  style OE fill:#1e3a8a,stroke:#2563eb,color:#60a5fa
  style OR2 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style LR2 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style EM2 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style SQ fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style EML2 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style DB2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style SG2 fill:#161b22,stroke:#30363d,color:#e6edf3`}
            />
          </div>

          <h3>3.2 依存の黄金律（最重要ルール）</h3>
          <div className="callout danger">
            <IconAlertOctagon size={16} className="callout-icon" />
            <div>
              <strong>コアは絶対に外側を知ってはいけない。</strong>
              <br />
              依存の方向は「外から内へ」だけです。アダプターはポートに依存する。コアはポートを定義する。しかし、コアはアダプターの存在を知らない。この非対称性がヘキサゴナルアーキテクチャの核心です。
            </div>
          </div>

          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconArrowsRight size={16} /> 依存の方向（右向きのみ許可）
            </div>
            <MermaidDiagram
              chart={`flowchart LR
  F["フレームワーク・DB・外部API\\n最も変わりやすい"] -->|"実装する"| A["アダプター層\\n技術的詳細の変換"]
  A -->|"実装・呼び出す"| P["ポート層\\nインターフェース・契約"]
  P -->|"コアに所有される"| C["アプリケーションコア\\n最も変わらない"]
  C -.->|"❌ 知らない"| P
  P -.->|"❌ 知らない"| A
  A -.->|"❌ 知らない"| F

  style F fill:#161b22,stroke:#30363d,color:#e6edf3
  style A fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style P fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style C fill:#1e3a8a,stroke:#2563eb,color:#60a5fa`}
            />
          </div>

          <h3>3.3 依存の方向をコードで確認</h3>
          <div className="code-label">
            <IconFileCode size={16} /> Python — 依存関係の正しい例
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `<span class="cm"># ─── アプリケーションコア（外部依存ゼロ）───</span>
<span class="cm"># domain/entities/order.py</span>
<span class="kw">class</span> <span class="fn">Order</span>:
    <span class="st">"""純粋なビジネスエンティティ。フレームワーク依存なし。"""</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, order_id: <span class="kw">str</span>, customer_id: <span class="kw">str</span>):
        <span class="kw">self</span>.order_id = order_id
        <span class="kw">self</span>.status = <span class="st">"pending"</span>

<span class="cm"># ─── ドリブンポート（コアに所属）───</span>
<span class="cm"># application/ports/outbound/order_repository_port.py</span>
<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod
<span class="kw">from</span> domain.entities.order <span class="kw">import</span> Order  <span class="cm"># ✅ ドメインのみimport</span>

<span class="kw">class</span> <span class="fn">OrderRepositoryPort</span>(ABC):
    <span class="st">"""何が必要か（保存する）を宣言する。どう実現するかは知らない。"""</span>
    @abstractmethod
    <span class="kw">def</span> <span class="fn">save</span>(<span class="kw">self</span>, order: Order) -&gt; <span class="kw">None</span>: ...

<span class="cm"># ─── ドリブンアダプター（外側に所属）───</span>
<span class="cm"># adapters/outbound/persistence/sql_order_repository.py</span>
<span class="kw">from</span> sqlalchemy.orm <span class="kw">import</span> Session
<span class="kw">from</span> application.ports.outbound.order_repository_port <span class="kw">import</span> OrderRepositoryPort

<span class="kw">class</span> <span class="fn">SQLOrderRepository</span>(OrderRepositoryPort):
    <span class="st">"""OrderRepositoryPort のSQL実装。コアはこのクラスを知らない。"""</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, session: Session):
        <span class="kw">self</span>._session = session

    <span class="kw">def</span> <span class="fn">save</span>(<span class="kw">self</span>, order: Order) -&gt; <span class="kw">None</span>:
        model = <span class="kw">self</span>._to_model(order)  <span class="cm"># SQL固有のマッピング</span>
        <span class="kw">self</span>._session.merge(model)
        <span class="kw">self</span>._session.flush()`,
            }}
          />
        </section>

        {/* ========== SECTION 4 ========== */}
        <section id="s4" className="section">
          <h2>
            <span className="section-num">04</span> ドライビング側（Driving Side）の設計
          </h2>

          <h3>4.1 ドライビングアダプターの役割</h3>
          <p>
            ドライビングアダプターは「外部からの入力をコアが理解できる形に変換する」役割を担います。HTTP・CLI・gRPC・メッセージキューなど、どんな入力形式でも同じポートを呼び出せます。
          </p>

          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconArrowRightCircle size={16} /> ドライビング側の構造
            </div>
            <MermaidDiagram
              chart={`flowchart TD
  subgraph ACTORS["外部アクター"]
    UA["👤 エンドユーザー"]
    AA["👨‍💼 管理者"]
    TA["🧪 テストスイート"]
    SA["🤖 他システム"]
  end
  subgraph DA3["ドライビングアダプター（具体的実装）"]
    REST3["REST API Controller"]
    GRAPHQL3["GraphQL Resolver"]
    CLI3["CLI Handler"]
    CONSUMER3["Queue Consumer"]
  end
  subgraph DP3["ドライビングポート（インターフェース）"]
    UC1_3["PlaceOrderUseCase"]
    UC2_3["GetOrderUseCase"]
    UC3_3["SearchProductsUseCase"]
  end
  UA --> REST3 & GRAPHQL3
  AA --> CLI3
  SA --> CONSUMER3
  TA --> UC1_3
  REST3 --> UC1_3 & UC2_3
  GRAPHQL3 --> UC3_3
  CLI3 --> UC1_3
  CONSUMER3 --> UC1_3

  style UA fill:#161b22,stroke:#30363d,color:#e6edf3
  style AA fill:#161b22,stroke:#30363d,color:#e6edf3
  style TA fill:#161b22,stroke:#30363d,color:#e6edf3
  style SA fill:#161b22,stroke:#30363d,color:#e6edf3
  style REST3 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style GRAPHQL3 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style CLI3 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style CONSUMER3 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style UC1_3 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style UC2_3 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style UC3_3 fill:#0d2b1d,stroke:#16a34a,color:#56d364`}
            />
          </div>

          <h3>4.2 ドライビングポートの定義（Python）</h3>
          <div className="code-label">
            <IconFileCode size={16} /> application/ports/inbound/place_order_use_case.py
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal

@dataclass(frozen=<span class="kw">True</span>)
<span class="kw">class</span> <span class="fn">PlaceOrderCommand</span>:
    <span class="st">"""注文作成コマンド（入力DTO）。イミュータブル設計。"""</span>
    customer_id: <span class="kw">str</span>
    items: list[dict]  <span class="cm"># [{"product_id": str, "quantity": int}]</span>

@dataclass(frozen=<span class="kw">True</span>)
<span class="kw">class</span> <span class="fn">PlaceOrderResult</span>:
    <span class="st">"""注文作成結果（出力DTO）"""</span>
    order_id: <span class="kw">str</span>
    status: <span class="kw">str</span>
    total_amount: Decimal
    currency: <span class="kw">str</span>

<span class="kw">class</span> <span class="fn">PlaceOrderUseCase</span>(ABC):
    <span class="st">"""
    注文作成ユースケースポート（ドライビングポート）。
    このインターフェースがドライビングアダプターとコアを繋ぐ契約。
    """</span>
    @abstractmethod
    <span class="kw">def</span> <span class="fn">execute</span>(<span class="kw">self</span>, command: PlaceOrderCommand) -&gt; PlaceOrderResult: ...`,
            }}
          />

          <h3>4.3 REST アダプターの実装（FastAPI）</h3>
          <div className="code-label">
            <IconFileCode size={16} /> adapters/inbound/rest/order_router.py
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">from</span> fastapi <span class="kw">import</span> APIRouter, Depends, HTTPException, status
<span class="kw">from</span> pydantic <span class="kw">import</span> BaseModel

router = APIRouter(prefix=<span class="st">"/api/v1/orders"</span>, tags=[<span class="st">"orders"</span>])

<span class="kw">class</span> <span class="fn">PlaceOrderRequest</span>(BaseModel):
    items: list[dict]

<span class="kw">class</span> <span class="fn">PlaceOrderResponse</span>(BaseModel):
    order_id: <span class="kw">str</span>
    status: <span class="kw">str</span>
    total_amount: <span class="kw">float</span>
    currency: <span class="kw">str</span>

@router.post(<span class="st">"/"</span>, response_model=PlaceOrderResponse, status_code=<span class="nu">201</span>)
<span class="kw">async def</span> <span class="fn">place_order</span>(
    request: PlaceOrderRequest,
    use_case: PlaceOrderUseCase = Depends(get_place_order_use_case),
) -&gt; PlaceOrderResponse:
    <span class="st">"""
    ドライビングアダプターの責務（3つだけ）：
    1. HTTP リクエスト → ポートの Command に変換
    2. ポート（ユースケース）を呼び出す
    3. 結果 → HTTP レスポンスに変換
    ビジネスロジックは一切持たない！
    """</span>
    <span class="kw">try</span>:
        command = PlaceOrderCommand(
            customer_id=<span class="st">"CUST-001"</span>,  <span class="cm"># 実際はAuthから取得</span>
            items=request.items,
        )
        result = use_case.execute(command)
        <span class="kw">return</span> PlaceOrderResponse(
            order_id=result.order_id,
            status=result.status,
            total_amount=<span class="kw">float</span>(result.total_amount),
            currency=result.currency,
        )
    <span class="kw">except</span> ValueError <span class="kw">as</span> e:
        <span class="kw">raise</span> HTTPException(status_code=<span class="nu">422</span>, detail=<span class="kw">str</span>(e))`,
            }}
          />

          <div className="callout info">
            <IconBulb size={16} className="callout-icon" />
            <div>
              アダプターの責務は「変換だけ」です。もしアダプターの中でif文を使ったビジネス判断をしているなら、それはコアに移動すべきロジックです。
            </div>
          </div>
        </section>

        {/* ========== SECTION 5 ========== */}
        <section id="s5" className="section">
          <h2>
            <span className="section-num">05</span> ドリブン側（Driven Side）の設計
          </h2>

          <h3>5.1 ドリブンアダプターのポイント：差し替え可能性</h3>
          <p>
            ドリブン側の最大の強みは、<strong>同じポートに対して複数の実装を用意できること</strong>
            です。本番用の実装とテスト用の実装を持ち、DIコンテナで切り替えるだけです。
          </p>

          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconArrowLeftCircle size={16} /> ドリブン側の構造（差し替え可能性）
            </div>
            <MermaidDiagram
              chart={`flowchart LR
  subgraph PORTS["ドリブンポート（コアに所属）"]
    RP2["SaveOrderPort"]
    LP2["LoadProductPort"]
    EP2["SendEmailPort"]
  end
  subgraph ADAPTERS["ドリブンアダプター（外側に所属）"]
    SQL2["SQLAlchemy実装\\n（本番用）"]
    MONGO2["PyMongo実装\\n（代替DB）"]
    INMEM2["InMemory実装\\n（テスト用）"]
    SG3["SendGrid実装\\n（本番用）"]
    FAKE3["Fake実装\\n（テスト用）"]
  end
  RP2 --> SQL2
  RP2 --> MONGO2
  RP2 --> INMEM2
  EP2 --> SG3
  EP2 --> FAKE3

  style RP2 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style LP2 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style EP2 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style SQL2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style MONGO2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style INMEM2 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style SG3 fill:#161b22,stroke:#30363d,color:#e6edf3
  style FAKE3 fill:#0d2b1d,stroke:#16a34a,color:#56d364`}
            />
          </div>

          <h3>5.2 テスト用インメモリアダプター</h3>
          <div className="code-label">
            <IconFileCode size={16} /> adapters/outbound/persistence/in_memory_order_repository.py
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">from</span> application.ports.outbound.order_repository_port <span class="kw">import</span> OrderRepositoryPort
<span class="kw">from</span> domain.entities.order <span class="kw">import</span> Order

<span class="kw">class</span> <span class="fn">InMemoryOrderRepository</span>(OrderRepositoryPort):
    <span class="st">"""
    テスト専用のインメモリ実装。
    DBなしで高速なユニットテストを可能にする。
    同じポートを実装するため、本番コードと完全に差し替え可能。
    """</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>):
        <span class="kw">self</span>._store: dict[<span class="kw">str</span>, Order] = {}

    <span class="kw">def</span> <span class="fn">save</span>(<span class="kw">self</span>, order: Order) -&gt; <span class="kw">None</span>:
        <span class="kw">self</span>._store[order.order_id] = order  <span class="cm"># メモリに保存</span>

    <span class="kw">def</span> <span class="fn">find_by_id</span>(<span class="kw">self</span>, order_id: <span class="kw">str</span>) -&gt; Order | <span class="kw">None</span>:
        <span class="kw">return</span> <span class="kw">self</span>._store.get(order_id)

    <span class="kw">def</span> <span class="fn">count</span>(<span class="kw">self</span>) -&gt; <span class="kw">int</span>:  <span class="cm"># テスト用ヘルパー</span>
        <span class="kw">return</span> <span class="kw">len</span>(<span class="kw">self</span>._store)`,
            }}
          />

          <div className="callout success">
            <IconCheck size={16} className="callout-icon" />
            <div>
              <strong>ベストプラクティス：</strong>{" "}
              すべてのドリブンポートに対してInMemory/Fake実装を必ず用意してください。これがヘキサゴナルアーキテクチャのテスト速度向上の核心です。
            </div>
          </div>
        </section>

        {/* ========== SECTION 6 ========== */}
        <section id="s6" className="section">
          <h2>
            <span className="section-num">06</span> アプリケーションコア（ドメイン）の設計
          </h2>

          <h3>6.1 コアの内部構造</h3>
          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconCircleDot size={16} /> アプリケーションコアの内部構造
            </div>
            <MermaidDiagram
              chart={`flowchart TD
  subgraph DOMAIN["🔴 ドメイン層（最も安定）"]
    ENTITIES2["エンティティ（Entity）\\nOrder / Product / Customer"]
    VALUE_OBJ2["値オブジェクト（Value Object）\\nMoney / Email / Address"]
    DOMAIN_SVC2["ドメインサービス\\nPricingService（複数Entity横断ロジック）"]
    DOMAIN_EVT2["ドメインイベント\\nOrderPlaced / PaymentCompleted"]
  end
  subgraph APP["🟡 アプリケーション層"]
    USE_CASES2["ユースケース（Use Case）\\nPlaceOrderService / CancelOrderService"]
    IN_PORTS2["インバウンドポート定義\\nPlaceOrderUseCase（ABC）"]
    OUT_PORTS2["アウトバウンドポート定義\\nOrderRepositoryPort（ABC）"]
  end
  USE_CASES2 --> ENTITIES2
  USE_CASES2 --> DOMAIN_SVC2
  USE_CASES2 --> OUT_PORTS2

  style ENTITIES2 fill:#7f1d1d,stroke:#dc2626,color:#ff7b72
  style VALUE_OBJ2 fill:#7f1d1d,stroke:#dc2626,color:#ff7b72
  style DOMAIN_SVC2 fill:#7f1d1d,stroke:#dc2626,color:#ff7b72
  style DOMAIN_EVT2 fill:#7f1d1d,stroke:#dc2626,color:#ff7b72
  style USE_CASES2 fill:#78350f,stroke:#d97706,color:#fbbf24
  style IN_PORTS2 fill:#78350f,stroke:#d97706,color:#fbbf24
  style OUT_PORTS2 fill:#78350f,stroke:#d97706,color:#fbbf24`}
            />
          </div>

          <h3>6.2 ドメインエンティティの実装（外部依存ゼロ）</h3>
          <div className="code-label">
            <IconFileCode size={16} /> domain/entities/order.py
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass, field
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal
<span class="kw">from</span> enum <span class="kw">import</span> Enum
<span class="kw">import</span> uuid  <span class="cm"># ← 標準ライブラリのみ。フレームワーク依存ゼロ！</span>

<span class="kw">class</span> <span class="fn">OrderStatus</span>(Enum):
    PENDING   = <span class="st">"pending"</span>
    CONFIRMED = <span class="st">"confirmed"</span>
    CANCELLED = <span class="st">"cancelled"</span>

@dataclass(frozen=<span class="kw">True</span>)
<span class="kw">class</span> <span class="fn">Money</span>:
    <span class="st">"""金額の値オブジェクト（イミュータブル）"""</span>
    amount: Decimal
    currency: <span class="kw">str</span> = <span class="st">"JPY"</span>

    <span class="kw">def</span> <span class="fn">__post_init__</span>(<span class="kw">self</span>):
        <span class="kw">if</span> <span class="kw">self</span>.amount &lt; <span class="nu">0</span>:
            <span class="kw">raise</span> ValueError(<span class="st">"金額は0以上: {self.amount}"</span>)

    <span class="kw">def</span> <span class="fn">__add__</span>(<span class="kw">self</span>, other: <span class="st">"Money"</span>) -&gt; <span class="st">"Money"</span>:
        <span class="kw">if</span> <span class="kw">self</span>.currency != other.currency:
            <span class="kw">raise</span> ValueError(<span class="st">"通貨が一致しません"</span>)
        <span class="kw">return</span> Money(<span class="kw">self</span>.amount + other.amount, <span class="kw">self</span>.currency)

@dataclass
<span class="kw">class</span> <span class="fn">Order</span>:
    <span class="st">"""注文エンティティ（集約ルート）"""</span>
    order_id: <span class="kw">str</span>
    customer_id: <span class="kw">str</span>
    _lines: list = field(default_factory=list, repr=<span class="kw">False</span>)
    _status: OrderStatus = field(default=OrderStatus.PENDING, repr=<span class="kw">False</span>)
    _events: list = field(default_factory=list, repr=<span class="kw">False</span>)

    @classmethod
    <span class="kw">def</span> <span class="fn">create</span>(cls, customer_id: <span class="kw">str</span>) -&gt; <span class="st">"Order"</span>:
        <span class="kw">return</span> cls(order_id=<span class="kw">str</span>(uuid.uuid4()), customer_id=customer_id)

    <span class="kw">def</span> <span class="fn">confirm</span>(<span class="kw">self</span>) -&gt; <span class="kw">None</span>:
        <span class="cm"># ビジネスルールをここに集約する</span>
        <span class="kw">if</span> <span class="kw">self</span>._status != OrderStatus.PENDING:
            <span class="kw">raise</span> ValueError(<span class="st">"保留中の注文のみ確定できます"</span>)
        <span class="kw">if</span> <span class="kw">not</span> <span class="kw">self</span>._lines:
            <span class="kw">raise</span> ValueError(<span class="st">"明細が1件もありません"</span>)
        <span class="kw">self</span>._status = OrderStatus.CONFIRMED
        <span class="kw">self</span>._events.append({"type": <span class="st">"OrderConfirmed"</span>, "order_id": <span class="kw">self</span>.order_id})`,
            }}
          />

          <div className="callout warning">
            <IconAlertTriangle size={16} className="callout-icon" />
            <div>
              <strong>重要：</strong> <code>domain/</code> ディレクトリ内には{" "}
              <code>sqlalchemy</code>・<code>fastapi</code>・<code>django</code>・
              <code>requests</code> などの外部ライブラリを一切 import
              してはいけません。CIで自動チェックすることを推奨します（セクション13参照）。
            </div>
          </div>
        </section>

        {/* ========== SECTION 7 ========== */}
        <section id="s7" className="section">
          <h2>
            <span className="section-num">07</span> 依存性逆転と依存性注入
          </h2>

          <h3>7.1 依存性逆転原則（DIP）とは</h3>
          <p>
            「上位モジュールは下位モジュールに依存してはならない。両方とも抽象に依存すべきだ」という原則です。ヘキサゴナルアーキテクチャはこの原則を徹底的に適用します。
          </p>

          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconArrowsExchange size={16} /> DIP なし vs DIP あり
            </div>
            <MermaidDiagram
              chart={`flowchart LR
  subgraph BAD["❌ DIP なし（具体に依存）"]
    UC_BAD["PlaceOrderService"] -->|"直接依存・直接生成"| REPO_BAD["MySQLOrderRepository\\n（具体実装）"]
  end
  subgraph GOOD["✅ DIP あり（抽象に依存）"]
    UC_GOOD["PlaceOrderService"] -->|"依存（抽象のみ）"| PORT_GOOD["OrderRepositoryPort\\n（インターフェース）"]
    MYSQL_GOOD["MySQLOrderRepository"] -->|"実装"| PORT_GOOD
    INMEM_GOOD["InMemoryOrderRepository"] -->|"実装"| PORT_GOOD
    DI_CONTAINER2["DIコンテナ"] -->|"本番時に注入"| MYSQL_GOOD
    DI_CONTAINER2 -->|"テスト時に注入"| INMEM_GOOD
  end

  style UC_BAD fill:#78350f,stroke:#d97706,color:#fbbf24
  style REPO_BAD fill:#161b22,stroke:#30363d,color:#e6edf3
  style UC_GOOD fill:#78350f,stroke:#d97706,color:#fbbf24
  style PORT_GOOD fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style MYSQL_GOOD fill:#161b22,stroke:#30363d,color:#e6edf3
  style INMEM_GOOD fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style DI_CONTAINER2 fill:#161b22,stroke:#30363d,color:#e6edf3`}
            />
          </div>

          <h3>7.2 Composition Root（配線の場所）</h3>
          <p>
            すべての依存関係を組み立てる<strong>唯一の場所</strong>
            です。アプリケーション起動時に一度だけ実行されます。コードのどこで <code>new</code>
            （インスタンス生成）するかを一箇所に集中させることが核心です。
          </p>

          <ul className="phase-list">
            <li className="phase-item">
              <span className="phase-badge p0">Step 1</span>
              <div className="phase-body">
                <strong>インフラリソースを準備</strong>
                <p>DBセッション・HTTP クライアント・設定値の読み込み</p>
              </div>
            </li>
            <li className="phase-item">
              <span className="phase-badge p2">Step 2</span>
              <div className="phase-body">
                <strong>ドリブンアダプターを生成</strong>
                <p>SQLOrderRepository(session) / SendGridEmailAdapter(api_key) など</p>
              </div>
            </li>
            <li className="phase-item">
              <span className="phase-badge p3">Step 3</span>
              <div className="phase-body">
                <strong>ユースケースにアダプターを注入</strong>
                <p>PlaceOrderService(order_repo=sql_repo, email=sendgrid, ...)</p>
              </div>
            </li>
            <li className="phase-item">
              <span className="phase-badge p4">Step 4</span>
              <div className="phase-body">
                <strong>ドライビングアダプターにユースケースを注入</strong>
                <p>OrderRouter(use_case=place_order_service)</p>
              </div>
            </li>
            <li className="phase-item">
              <span className="phase-badge p5">Step 5</span>
              <div className="phase-body">
                <strong>アプリケーション起動</strong>
                <p>依存が全て組み立てられた状態でサーバーを起動</p>
              </div>
            </li>
          </ul>

          <div className="code-label">
            <IconFileCode size={16} /> infrastructure/di_container.py（本番用 vs テスト用）
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">def</span> <span class="fn">create_production_container</span>():
    <span class="st">"""本番用の Composition Root。具体クラスを知っているのはここだけ。"""</span>
    engine = create_engine(os.environ[<span class="st">"DATABASE_URL"</span>])
    session = sessionmaker(bind=engine)()

    order_repo = SQLOrderRepository(session)          <span class="cm"># 本番用SQL実装</span>
    email      = SendGridEmailAdapter(api_key=...)    <span class="cm"># 本番用メール</span>
    event_pub  = KafkaEventPublisher(...)             <span class="cm"># 本番用イベント</span>

    <span class="kw">return</span> PlaceOrderService(
        order_repository=order_repo,  <span class="cm"># ← インターフェースに注入</span>
        email_notification=email,
        event_publisher=event_pub,
    )

<span class="kw">def</span> <span class="fn">create_test_container</span>():
    <span class="st">"""テスト用。インメモリ実装に差し替えるだけ。DBなし・外部APIなし。"""</span>
    <span class="kw">return</span> PlaceOrderService(
        order_repository=InMemoryOrderRepository(),  <span class="cm"># ← テスト用に差し替え</span>
        email_notification=FakeEmailAdapter(),
        event_publisher=InMemoryEventPublisher(),
    )`,
            }}
          />

          <div className="callout success">
            <IconLink size={16} className="callout-icon" />
            <div>
              <strong>参考：</strong>{" "}
              <Ext href="https://fastapi.tiangolo.com/ja/tutorial/dependencies/">
                FastAPI 公式 — Dependency Injection
              </Ext>{" "}
              — FastAPI でのDI実装パターン
            </div>
          </div>
        </section>

        {/* ========== SECTION 8 ========== */}
        <section id="s8" className="section">
          <h2>
            <span className="section-num">08</span> テスト戦略
          </h2>

          <h3>8.1 ヘキサゴナルのテストピラミッド</h3>
          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconTriangle size={16} /> テストピラミッド（下が多い・上が少ない）
            </div>
            <MermaidDiagram
              chart={`flowchart TD
  E2E2["E2E テスト（少数）\\n実際のインフラで全体フロー確認\\n遅い・コスト高"]
  INT2["統合テスト（中程度）\\n実際のアダプターをコアと接続\\nTestContainers で自動化"]
  ADT["アダプターテスト（中程度）\\nドライビング：HTTPリクエスト検証\\nドリブン：SQLクエリ正確性"]
  UCT["ユニットテスト：コア（多数・最重要）\\nインメモリアダプターでコアをテスト\\nDB・外部API不要 → 超高速"]
  DT["ユニットテスト：ドメイン（最多）\\nエンティティ・値オブジェクト\\n外部依存ゼロ → 最もシンプル"]
  DT --> UCT --> ADT --> INT2 --> E2E2

  style E2E2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style INT2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style ADT fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style UCT fill:#78350f,stroke:#d97706,color:#fbbf24
  style DT fill:#7f1d1d,stroke:#dc2626,color:#ff7b72`}
            />
          </div>

          <h3>8.2 ドメインのユニットテスト（外部依存ゼロ）</h3>
          <div className="code-label">
            <IconFileCode size={16} /> tests/unit/domain/test_order.py
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">import</span> pytest
<span class="kw">from</span> domain.entities.order <span class="kw">import</span> Order, OrderStatus, Money
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal

<span class="kw">class</span> <span class="fn">TestOrder</span>:
    <span class="st">"""ドメインのテスト。外部依存ゼロ・ミリ秒で実行。"""</span>

    <span class="kw">def</span> <span class="fn">test_注文作成時はペンディング状態になる</span>(<span class="kw">self</span>):
        order = Order.create(customer_id=<span class="st">"CUST-001"</span>)
        <span class="kw">assert</span> order.status == OrderStatus.PENDING

    <span class="kw">def</span> <span class="fn">test_明細が空のとき確定するとエラーになる</span>(<span class="kw">self</span>):
        order = Order.create(customer_id=<span class="st">"CUST-001"</span>)
        <span class="kw">with</span> pytest.raises(ValueError, match=<span class="st">"明細が1件もありません"</span>):
            order.confirm()

    <span class="kw">def</span> <span class="fn">test_合計金額が正しく計算される</span>(<span class="kw">self</span>):
        order = Order.create(customer_id=<span class="st">"CUST-001"</span>)
        order.add_line(<span class="st">"P001"</span>, <span class="st">"Tシャツ"</span>,  Money(Decimal(<span class="st">"1000"</span>)), <span class="nu">2</span>)
        order.add_line(<span class="st">"P002"</span>, <span class="st">"ジーンズ"</span>, Money(Decimal(<span class="st">"5000"</span>)), <span class="nu">1</span>)
        <span class="kw">assert</span> order.total_amount == Money(Decimal(<span class="st">"7000"</span>))`,
            }}
          />

          <h3>8.3 ユースケースのユニットテスト（インメモリ使用）</h3>
          <div className="code-label">
            <IconFileCode size={16} /> tests/unit/application/test_place_order_service.py
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">class</span> <span class="fn">TestPlaceOrderService</span>:
    @pytest.fixture
    <span class="kw">def</span> <span class="fn">setup</span>(<span class="kw">self</span>):
        <span class="st">"""テスト用DIセットアップ（インメモリ実装を注入）"""</span>
        order_repo    = InMemoryOrderRepository()   <span class="cm"># DB不要</span>
        product_query = MagicMock()                  <span class="cm"># 商品クエリはモック</span>
        product_query.find_by_id.return_value = Product(
            product_id=<span class="st">"P001"</span>, name=<span class="st">"Tシャツ"</span>,
            price=Decimal(<span class="st">"1000"</span>), stock_count=<span class="nu">10</span>
        )
        email     = MagicMock()
        event_pub = MagicMock()

        service = PlaceOrderService(
            order_repository=order_repo,
            product_query=product_query,
            email_notification=email,
            event_publisher=event_pub,
        )
        <span class="kw">return</span> service, order_repo, email, event_pub

    <span class="kw">def</span> <span class="fn">test_有効な注文が正常に作成される</span>(<span class="kw">self</span>, setup):
        service, order_repo, _, _ = setup
        command = PlaceOrderCommand(
            customer_id=<span class="st">"CUST-001"</span>,
            items=[{<span class="st">"product_id"</span>: <span class="st">"P001"</span>, <span class="st">"quantity"</span>: <span class="nu">2</span>}],
        )
        result = service.execute(command)

        <span class="kw">assert</span> result.status == <span class="st">"confirmed"</span>
        <span class="kw">assert</span> result.total_amount == Decimal(<span class="st">"2000"</span>)
        <span class="kw">assert</span> order_repo.count() == <span class="nu">1</span>  <span class="cm"># DBに保存された</span>`,
            }}
          />

          <div className="callout info">
            <IconLink size={16} className="callout-icon" />
            <div>
              <strong>参考：</strong>{" "}
              <Ext href="https://martinfowler.com/bliki/TestPyramid.html">
                Martin Fowler — テストピラミッド
              </Ext>{" "}
              /{" "}
              <Ext href="https://martinfowler.com/bliki/InMemoryTestDouble.html">
                InMemory Test Doubles
              </Ext>
            </div>
          </div>
        </section>

        {/* ========== SECTION 9 ========== */}
        <section id="s9" className="section">
          <h2>
            <span className="section-num">09</span> 他のアーキテクチャパターンとの比較・統合
          </h2>

          <h3>9.1 レイヤードアーキテクチャとの比較</h3>
          <table>
            <thead>
              <tr>
                <th>観点</th>
                <th>レイヤードアーキテクチャ</th>
                <th>ヘキサゴナルアーキテクチャ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>依存の方向</strong>
                </td>
                <td>上から下（UI → Biz → DB）</td>
                <td>外から内（アダプター → ポート → コア）</td>
              </tr>
              <tr>
                <td>
                  <strong>コアのDB依存</strong>
                </td>
                <td>直接依存する場合が多い</td>
                <td>ポート経由で完全に独立</td>
              </tr>
              <tr>
                <td>
                  <strong>テスト容易性</strong>
                </td>
                <td>実DBが必要になりがち</td>
                <td>インメモリで高速テスト可能</td>
              </tr>
              <tr>
                <td>
                  <strong>インターフェース切替</strong>
                </td>
                <td>コアの修正が必要な場合がある</td>
                <td>アダプターを追加するだけ</td>
              </tr>
            </tbody>
          </table>

          <h3>9.2 クリーンアーキテクチャとの関係</h3>
          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconLayout size={16} /> クリーンアーキテクチャとの対応関係
            </div>
            <MermaidDiagram
              chart={`flowchart LR
  subgraph CLEAN2["🏛️ クリーンアーキテクチャ（同心円）"]
    C1_2["Frameworks & Drivers（最外層）"]
    C2_2["Interface Adapters"]
    C3_2["Application Business Rules\\nUse Cases"]
    C4_2["Enterprise Business Rules\\nEntities"]
  end
  subgraph HEXA3["🔷 ヘキサゴナル（六角形）"]
    H1_3["外部アクター・インフラ"]
    H2_3["アダプター層\\nDriving + Driven"]
    H3_3["ポート\\nInbound + Outbound"]
    H4_3["アプリケーションコア\\nUseCase + Domain"]
  end
  C1_2 <-->|"対応"| H1_3
  C2_2 <-->|"対応"| H2_3
  C3_2 <-->|"対応"| H3_3
  C4_2 <-->|"対応"| H4_3

  style C1_2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style C2_2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style C3_2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style C4_2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style H1_3 fill:#161b22,stroke:#30363d,color:#e6edf3
  style H2_3 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style H3_3 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style H4_3 fill:#1e3a8a,stroke:#2563eb,color:#60a5fa`}
            />
          </div>

          <h3>9.3 DDD（ドメイン駆動設計）との統合</h3>
          <p>
            DDDとヘキサゴナルアーキテクチャは非常に相性が良く、実際の開発では組み合わせて使われることが多いです。
          </p>

          <table>
            <thead>
              <tr>
                <th>DDD の概念</th>
                <th>ヘキサゴナルでの対応</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Bounded Context（境界づけられたコンテキスト）</strong>
                </td>
                <td>1つの Bounded Context ≈ 1つのヘキサゴン</td>
              </tr>
              <tr>
                <td>
                  <strong>Ubiquitous Language（ユビキタス言語）</strong>
                </td>
                <td>ポート名・ドメイン名に反映する</td>
              </tr>
              <tr>
                <td>
                  <strong>Context Map の ACL（腐敗防止層）</strong>
                </td>
                <td>ドリブンアダプターが ACL の役割を担う</td>
              </tr>
              <tr>
                <td>
                  <strong>Entity / Value Object / Aggregate</strong>
                </td>
                <td>domain/ 層にそのまま配置する</td>
              </tr>
            </tbody>
          </table>

          <div className="callout info">
            <IconLink size={16} className="callout-icon" />
            <div>
              <strong>参考：</strong>{" "}
              <Ext href="https://herbertograca.com/2017/09/14/ports-adapters-architecture/">
                Herberto Graça — DDD + Hexagonal 詳細解説
              </Ext>{" "}
              /{" "}
              <Ext href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
                Uncle Bob — Clean Architecture 原著ブログ
              </Ext>
            </div>
          </div>
        </section>

        {/* ========== SECTION 10 ========== */}
        <section id="s10" className="section">
          <h2>
            <span className="section-num">10</span> ディレクトリ構成とパッケージ設計
          </h2>

          <h3>10.1 推奨ディレクトリ構成</h3>
          <div className="code-label">
            <IconFolder size={16} /> プロジェクト全体のディレクトリ構成
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `my_app/
├── domain/                            <span class="cm"># ドメイン層（外部依存ゼロ）</span>
│   ├── entities/
│   │   ├── order.py                   <span class="cm"># Order エンティティ（集約ルート）</span>
│   │   └── product.py
│   ├── value_objects/
│   │   ├── money.py                   <span class="cm"># Money 値オブジェクト</span>
│   │   └── email.py
│   ├── services/
│   │   └── pricing_service.py         <span class="cm"># ドメインサービス（複数Entity横断）</span>
│   └── exceptions.py
│
├── application/                       <span class="cm"># アプリケーション層</span>
│   ├── ports/
│   │   ├── inbound/                   <span class="cm"># ドライビングポート（ABC）</span>
│   │   │   ├── place_order_use_case.py
│   │   │   └── get_order_use_case.py
│   │   └── outbound/                  <span class="cm"># ドリブンポート（ABC）</span>
│   │       ├── order_repository_port.py
│   │       ├── email_notification_port.py
│   │       └── event_publisher_port.py
│   └── use_cases/                     <span class="cm"># ユースケース実装</span>
│       ├── place_order_service.py
│       └── get_order_service.py
│
├── adapters/                          <span class="cm"># アダプター層（外側）</span>
│   ├── inbound/                       <span class="cm"># ドライビングアダプター</span>
│   │   ├── rest/
│   │   │   ├── order_router.py        <span class="cm"># FastAPI Router</span>
│   │   │   └── schemas.py             <span class="cm"># HTTP専用 Pydantic スキーマ</span>
│   │   ├── cli/
│   │   │   └── order_commands.py
│   │   └── messaging/
│   │       └── order_consumer.py      <span class="cm"># Kafka Consumer</span>
│   └── outbound/                      <span class="cm"># ドリブンアダプター</span>
│       ├── persistence/
│       │   ├── sql_order_repository.py    <span class="cm"># 本番用SQL実装</span>
│       │   └── in_memory_order_repository.py  <span class="cm"># テスト用</span>
│       ├── email/
│       │   ├── sendgrid_email_adapter.py  <span class="cm"># 本番用</span>
│       │   └── fake_email_adapter.py      <span class="cm"># テスト用</span>
│       └── events/
│           ├── kafka_event_publisher.py
│           └── in_memory_event_publisher.py
│
├── infrastructure/                    <span class="cm"># インフラ設定・配線</span>
│   ├── di_container.py                <span class="cm"># Composition Root（DI配線）</span>
│   ├── database.py
│   └── config.py
│
├── tests/
│   ├── unit/
│   │   ├── domain/                    <span class="cm"># ドメインのユニットテスト</span>
│   │   └── application/               <span class="cm"># ユースケースのユニットテスト</span>
│   ├── integration/
│   │   └── adapters/                  <span class="cm"># アダプターの統合テスト</span>
│   └── e2e/
│       └── test_order_flow.py
│
└── main.py                            <span class="cm"># エントリポイント</span>`,
            }}
          />

          <h3>10.2 パッケージ間の依存関係ルール</h3>
          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconArrowRight size={16} /> パッケージ依存の方向（許可・禁止）
            </div>
            <MermaidDiagram
              chart={`flowchart TD
  DOMAIN3["domain/"]
  APP3["application/"]
  ADAPTER3["adapters/"]
  INFRA3["infrastructure/"]
  MAIN3["main.py"]
  APP3 -->|"✅ 依存可"| DOMAIN3
  ADAPTER3 -->|"✅ 依存可"| APP3
  ADAPTER3 -->|"✅ 依存可"| DOMAIN3
  INFRA3 -->|"✅ 依存可"| ADAPTER3
  MAIN3 -->|"✅ 全体を組み立て"| INFRA3
  DOMAIN3 -.->|"❌ 絶対禁止"| APP3
  APP3 -.->|"❌ 絶対禁止"| ADAPTER3
  APP3 -.->|"❌ 絶対禁止"| INFRA3

  style DOMAIN3 fill:#7f1d1d,stroke:#dc2626,color:#ff7b72
  style APP3 fill:#78350f,stroke:#d97706,color:#fbbf24
  style ADAPTER3 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style INFRA3 fill:#161b22,stroke:#30363d,color:#e6edf3
  style MAIN3 fill:#161b22,stroke:#30363d,color:#e6edf3`}
            />
          </div>
        </section>

        {/* ========== SECTION 11 ========== */}
        <section id="s11" className="section">
          <h2>
            <span className="section-num">11</span> 段階的導入ガイド
          </h2>

          <h3>11.1 既存コードへの段階的移行</h3>
          <p>
            ヘキサゴナルアーキテクチャは一度に全部導入する必要はありません。フェーズを分けて段階的に移行できます。
          </p>

          <ul className="phase-list">
            <li className="phase-item">
              <span className="phase-badge p0">Phase 0</span>
              <div className="phase-body">
                <strong>現状把握（1週間）</strong>
                <p>既存コードのアーキテクチャを分析し、最も問題の大きい依存を特定します。</p>
              </div>
            </li>
            <li className="phase-item">
              <span className="phase-badge p1">Phase 1</span>
              <div className="phase-body">
                <strong>ドメインの分離（1〜2週間）</strong>
                <p>
                  ビジネスロジックをフレームワークから抽出し、純粋な Pythonクラスとして再実装。
                  <code>domain/</code> ディレクトリを作成します。
                </p>
              </div>
            </li>
            <li className="phase-item">
              <span className="phase-badge p2">Phase 2</span>
              <div className="phase-body">
                <strong>ドリブンポートの定義（1週間）</strong>
                <p>
                  既存の Repository・外部サービス呼び出しをインターフェース（ABC）として定義します。
                </p>
              </div>
            </li>
            <li className="phase-item">
              <span className="phase-badge p3">Phase 3</span>
              <div className="phase-body">
                <strong>ドライビングポートの定義（1週間）</strong>
                <p>
                  ユースケースをインターフェースとして定義し、ビジネスロジックをユースケースクラスに移動します。
                </p>
              </div>
            </li>
            <li className="phase-item">
              <span className="phase-badge p4">Phase 4</span>
              <div className="phase-body">
                <strong>アダプターの実装（2〜3週間）</strong>
                <p>
                  既存の実装をアダプターとして再配置。テスト用インメモリアダプターを作成し、Composition
                  Rootを整備します。
                </p>
              </div>
            </li>
            <li className="phase-item">
              <span className="phase-badge p5">Phase 5</span>
              <div className="phase-body">
                <strong>テストの整備（継続的）</strong>
                <p>
                  ドメインのユニットテストを充実させ、インメモリアダプターで高速テストを追加します。
                </p>
              </div>
            </li>
          </ul>

          <h3>11.2 移行チェックリスト</h3>
          <ul className="checklist">
            <li className="check-item">
              <IconCheck size={16} />
              <span>
                <code>domain/</code> に SQLAlchemy・FastAPI の import がない
              </span>
            </li>
            <li className="check-item">
              <IconCheck size={16} />
              <span>ユースケースが具体的なリポジトリクラスを import していない</span>
            </li>
            <li className="check-item">
              <IconCheck size={16} />
              <span>各ポートが ABC（抽象基底クラス）として定義されている</span>
            </li>
            <li className="check-item">
              <IconCheck size={16} />
              <span>テスト用インメモリアダプターが存在する</span>
            </li>
            <li className="check-item">
              <IconCheck size={16} />
              <span>ドメインのユニットテストが DB なしで動作する</span>
            </li>
            <li className="check-item">
              <IconCheck size={16} />
              <span>ユースケース of ユニットテストが DB なしで動作する</span>
            </li>
            <li className="check-item">
              <IconCheck size={16} />
              <span>Composition Root が一箇所にまとまっている</span>
            </li>
            <li className="check-item">
              <IconCheck size={16} />
              <span>アダプターを差し替えても di_container.py だけの変更で済む</span>
            </li>
            <li className="check-item">
              <IconCheck size={16} />
              <span>循環依存が存在しない（pylint / isort で確認）</span>
            </li>
            <li className="check-item">
              <IconCheck size={16} />
              <span>ポートはビジネス語彙で命名されている（技術用語でない）</span>
            </li>
          </ul>
        </section>

        {/* ========== SECTION 12 ========== */}
        <section id="s12" className="section">
          <h2>
            <span className="section-num">12</span> 実践：ECサイト完全実装例
          </h2>

          <h3>12.1 ECサイトのヘキサゴン全体図</h3>
          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconShoppingCart size={16} /> ECサイトのヘキサゴナルアーキテクチャ全体像
            </div>
            <MermaidDiagram
              chart={`flowchart LR
  subgraph EXT_L2["外部アクター（左）"]
    WEB["🌐 Webブラウザ"]
    MOB["📱 モバイルアプリ"]
    ADM["💻 管理者CLI"]
  end
  subgraph HEX2["🔷 ECサイト ヘキサゴン"]
    subgraph DA4["ドライビングアダプター"]
      REST4["REST API"]
      CLI4["CLI"]
      MSG4["Message Consumer"]
    end
    subgraph DP4["ドライビングポート"]
      PO4["PlaceOrderUseCase"]
      SP4["SearchProductsUseCase"]
      AU4["AuthenticateUserUseCase"]
    end
    subgraph CORE4["アプリケーションコア"]
      OC4["注文ドメイン\\nOrder / Money"]
      PC4["商品ドメイン\\nProduct / Category"]
    end
    subgraph DRP4["ドリブンポート"]
      OR4["OrderRepositoryPort"]
      EM4["EmailNotificationPort"]
      PAY4["PaymentGatewayPort"]
      EVT4["EventPublisherPort"]
    end
    subgraph DRA4["ドリブンアダプター"]
      SQL4["PostgreSQL\\nアダプター"]
      STRIPE4["Stripe\\nアダプター"]
      EMAIL4["SendGrid\\nアダプター"]
      KAFKA4["Kafka\\nアダプター"]
    end
  end
  subgraph EXT_R2["外部インフラ（右）"]
    PG4[("PostgreSQL")]
    STRIPE_EXT2["Stripe API"]
    SG_EXT2["SendGrid API"]
    KF_EXT2["Kafka"]
  end
  WEB & MOB --> REST4
  ADM --> CLI4
  REST4 & CLI4 --> PO4 & SP4 & AU4
  PO4 & SP4 & AU4 --> OC4 & PC4
  OC4 --> OR4 & EM4 & PAY4 & EVT4
  OR4 --> SQL4
  EM4 --> EMAIL4
  PAY4 --> STRIPE4
  EVT4 --> KAFKA4
  SQL4 --> PG4
  STRIPE4 --> STRIPE_EXT2
  EMAIL4 --> SG_EXT2
  KAFKA4 --> KF_EXT2

  style WEB fill:#161b22,stroke:#30363d,color:#e6edf3
  style MOB fill:#161b22,stroke:#30363d,color:#e6edf3
  style ADM fill:#161b22,stroke:#30363d,color:#e6edf3
  style REST4 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style CLI4 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style MSG4 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style PO4 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style SP4 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style AU4 fill:#0d2b1d,stroke:#16a34a,color:#56d364
  style OC4 fill:#1e3a8a,stroke:#2563eb,color:#60a5fa
  style PC4 fill:#1e3a8a,stroke:#2563eb,color:#60a5fa
  style OR4 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style EM4 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style PAY4 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style EVT4 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style SQL4 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style STRIPE4 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style EMAIL4 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style KAFKA4 fill:#0c2a4a,stroke:#2563eb,color:#79c0ff
  style PG4 fill:#161b22,stroke:#30363d,color:#e6edf3
  style STRIPE_EXT2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style SG_EXT2 fill:#161b22,stroke:#30363d,color:#e6edf3
  style KF_EXT2 fill:#161b22,stroke:#30363d,color:#e6edf3`}
            />
          </div>

          <h3>12.2 注文確定・決済フローのシーケンス図</h3>
          <div className="mermaid-wrap">
            <div className="mermaid-label">
              <IconArrowsExchange2 size={16} /> 注文確定・決済フロー
            </div>
            <MermaidDiagram
              chart={`sequenceDiagram
  participant B as 🌐 ブラウザ
  participant R as REST アダプター
  participant U as PlaceOrderService（コア）
  participant O as Order エンティティ
  participant OR as OrderRepositoryPort
  participant PP as PaymentGatewayPort
  participant EP as EmailNotificationPort
  participant SA as SQL アダプター
  participant STA as Stripe アダプター
  participant SGA as SendGrid アダプター

  B->>R: POST /api/v1/orders
  R->>R: HTTP → PlaceOrderCommand に変換
  R->>U: execute(PlaceOrderCommand)
  U->>O: Order.create(customer_id)
  U->>O: add_line(product, qty)
  U->>O: confirm()
  U->>PP: charge(amount, payment_info)
  PP->>STA: Stripe API 呼び出し
  STA-->>PP: 決済成功
  U->>OR: save(order)
  OR->>SA: SQL INSERT
  SA-->>OR: 保存完了
  U->>EP: send_order_confirmation(...)
  EP->>SGA: SendGrid API 呼び出し
  U-->>R: PlaceOrderResult
  R->>R: Result → HTTP レスポンスに変換
  R-->>B: 201 Created`}
            />
          </div>

          <h3>12.3 決済ポートと Stripe アダプターの実装</h3>
          <div className="code-label">
            <IconFileCode size={16} /> application/ports/outbound/payment_gateway_port.py
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal

<span class="kw">class</span> <span class="fn">PaymentGatewayPort</span>(ABC):
    <span class="st">"""
    決済ゲートウェイポート。
    コアは Stripe を知らない。「決済できる何か」だけを知っている。
    """</span>
    @abstractmethod
    <span class="kw">def</span> <span class="fn">charge</span>(<span class="kw">self</span>, amount: Decimal, ...) -&gt; PaymentResult: ...

<span class="cm"># ─── Stripe アダプター（外側に所属）───</span>
<span class="kw">import</span> stripe

<span class="kw">class</span> <span class="fn">StripePaymentAdapter</span>(PaymentGatewayPort):
    <span class="st">"""Stripe 固有の詳細をここに完全に隠蔽する。"""</span>
    <span class="kw">def</span> <span class="fn">charge</span>(<span class="kw">self</span>, amount: Decimal, ...) -&gt; PaymentResult:
        <span class="kw">try</span>:
            charge = stripe.PaymentIntent.create(
                amount=<span class="kw">int</span>(amount * <span class="nu">100</span>),  <span class="cm"># Stripe は cents 単位</span>
                currency=<span class="st">"jpy"</span>,
                confirm=<span class="kw">True</span>,
            )
            <span class="kw">return</span> PaymentResult(transaction_id=charge.id, status=<span class="st">"succeeded"</span>)
        <span class="kw">except</span> stripe.error.CardError <span class="kw">as</span> e:
            <span class="kw">raise</span> ValueError("カード決済エラー: {e.user_message}") from e

<span class="cm"># ─── テスト用フェイクアダプター ───</span>
<span class="kw">class</span> <span class="fn">FakePaymentAdapter</span>(PaymentGatewayPort):
    <span class="st">"""実際の Stripe を呼ばずに決済をシミュレート可能。"""</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="kw">self</span>, should_succeed: <span class="kw">bool</span> = <span class="kw">True</span>):
        <span class="kw">self</span>._should_succeed = should_succeed
        <span class="kw">self</span>.charged_requests = []

    <span class="kw">def</span> <span class="fn">charge</span>(<span class="kw">self</span>, amount: Decimal, ...) -&gt; PaymentResult:
        <span class="kw">self</span>.charged_requests.append(amount)
        <span class="kw">if</span> <span class="kw">not</span> <span class="kw">self</span>._should_succeed:
            <span class="kw">raise</span> ValueError("テスト用決済失敗")
        <span class="kw">return</span> PaymentResult(transaction_id="fake_txn_1", status="succeeded")`,
            }}
          />
        </section>

        {/* ========== SECTION 13 ========== */}
        <section id="s13" className="section">
          <h2>
            <span className="section-num">13</span> アンチパターンと落とし穴
          </h2>

          <h3>13.1 主要なアンチパターン</h3>

          <div className="antipattern-grid">
            <div className="ap-card">
              <div className="ap-title">
                <IconX size={16} /> コアがアダプターを知っている
              </div>
              <p>
                <code>domain/</code> や <code>application/</code> で SQLAlchemy・FastAPI を import
                している。ポートの意味がなくなる。
              </p>
            </div>
            <div className="ap-fix">
              <div className="ap-title">
                <IconCheck size={16} /> 解決策
              </div>
              <p>
                <code>domain/</code> の import を Python linter
                でチェックし、CIに組み込む。次の自動チェックスクリプトを使用する。
              </p>
            </div>

            <div className="ap-card">
              <div className="ap-title">
                <IconX size={16} /> ポートが技術用語で命名されている
              </div>
              <p>
                <code>SQLRepositoryPort</code> / <code>HTTPClientPort</code>{" "}
                のようにインフラ名を含む命名はNG。
              </p>
            </div>
            <div className="ap-fix">
              <div className="ap-title">
                <IconCheck size={16} /> 解決策
              </div>
              <p>
                ポート名はビジネスユースケースまたは能力を動詞で表現。<code>SaveOrderPort</code> /{" "}
                <code>LoadProductsPort</code>
              </p>
            </div>

            <div className="ap-card">
              <div className="ap-title">
                <IconX size={16} /> アダプターにビジネスロジックが漏れる
              </div>
              <p>
                REST Controller の中で <code>if order.total &gt; 10000: apply_discount()</code>{" "}
                を実行している。
              </p>
            </div>
            <div className="ap-fix">
              <div className="ap-title">
                <IconCheck size={16} /> 解決策
              </div>
              <p>
                アダプターは「変換だけ」。ビジネスロジックは一行も持たない。ロジックはコアに移動する。
              </p>
            </div>

            <div className="ap-card">
              <div className="ap-title">
                <IconX size={16} /> Composition Root が分散する
              </div>
              <p>
                各モジュールが自分で <code>new</code>{" "}
                して依存を生成している。依存の管理が追跡不能になる。
              </p>
            </div>
            <div className="ap-fix">
              <div className="ap-title">
                <IconCheck size={16} /> 解決策
              </div>
              <p>
                <code>main.py</code> または <code>di_container.py</code>{" "}
                の1箇所でのみ依存を構築する。
              </p>
            </div>
          </div>

          <h3>13.2 コア汚染チェックスクリプト（CI/CD組み込み用）</h3>
          <div className="code-label">
            <IconFileCode size={16} /> scripts/check_core_dependencies.py
          </div>
          <pre
            className="code-block"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static code
            dangerouslySetInnerHTML={{
              __html: `<span class="kw">import</span> ast, sys
<span class="kw">from</span> pathlib <span class="kw">import</span> Path

FORBIDDEN_IN_CORE = [
    <span class="st">"sqlalchemy"</span>, <span class="st">"fastapi"</span>, <span class="st">"django"</span>, <span class="st">"flask"</span>,
    <span class="st">"stripe"</span>, <span class="st">"sendgrid"</span>, <span class="st">"redis"</span>, <span class="st">"kafka"</span>, <span class="st">"requests"</span>, <span class="st">"httpx"</span>,
]
CORE_DIRS = [<span class="st">"domain"</span>, <span class="st">"application"</span>]

<span class="kw">def</span> <span class="fn">check_file</span>(filepath: Path) -&gt; list[<span class="kw">str</span>]:
    violations = []
    tree = ast.parse(filepath.read_text(encoding=<span class="st">"utf-8"</span>))
    <span class="kw">for</span> node <span class="kw">in</span> ast.walk(tree):
        <span class="kw">if</span> isinstance(node, (ast.Import, ast.ImportFrom)):
            module = node.module <span class="kw">if</span> isinstance(node, ast.ImportFrom) <span class="kw">else</span> <span class="st">""</span>
            <span class="kw">for</span> forbidden <span class="kw">in</span> FORBIDDEN_IN_CORE:
                <span class="kw">if</span> (module <span class="kw">or</span> <span class="st">""</span>).startswith(forbidden):
                    violations.append(
                        "❌ {filepath}:{node.lineno} — '{module}' はコアに禁止"
                    )
    return violations

violations = []
for d in CORE_DIRS:
    for f in Path(d).rglob("*.py"):
        violations.extend(check_file(f))

if violations:
    [print(v) for v in violations]; sys.exit(1)
else:
    print("✅ コアの純粋性が保たれています")`,
            }}
          />
        </section>

        {/* ========== SECTION 14 ========== */}
        <section id="s14" className="section">
          <h2>
            <span className="section-num">14</span> ベストプラクティス総まとめ
          </h2>

          <h3>14.1 設計の黄金律（7つのルール）</h3>

          <div className="summary-grid">
            <div className="summary-card">
              <div className="sc-icon" style={{ color: "var(--c-purple-400)" }}>
                <IconArrowRight size={18} />
              </div>
              <div className="sc-label">ルール1：依存は外から内へ</div>
              <div className="sc-desc">アダプター → ポート → コア。コアは外を知らない。</div>
            </div>
            <div className="summary-card">
              <div className="sc-icon" style={{ color: "var(--c-teal-400)" }}>
                <IconVocabulary size={18} />
              </div>
              <div className="sc-label">ルール2：ビジネス語彙で命名</div>
              <div className="sc-desc">PlaceOrderPort ✅ / SQLRepositoryPort ❌</div>
            </div>
            <div className="summary-card">
              <div className="sc-icon" style={{ color: "var(--c-coral-400)" }}>
                <IconTestPipe size={18} />
              </div>
              <div className="sc-label">ルール3：Fake/InMemory を用意</div>
              <div className="sc-desc">すべてのポートにテスト用実装を必ず用意する。</div>
            </div>
            <div className="summary-card">
              <div className="sc-icon" style={{ color: "var(--c-blue-400)" }}>
                <IconArrowsExchange size={18} />
              </div>
              <div className="sc-label">ルール4：アダプターは変換だけ</div>
              <div className="sc-desc">HTTP → Command、Result → HTTP の変換のみ。</div>
            </div>
            <div className="summary-card">
              <div className="sc-icon" style={{ color: "var(--c-green-400)" }}>
                <IconMapPin size={18} />
              </div>
              <div className="sc-label">ルール5：Composition Root を1箇所に</div>
              <div className="sc-desc">di_container.py でのみ依存を組み立てる。</div>
            </div>
            <div className="summary-card">
              <div className="sc-icon" style={{ color: "var(--c-amber-400)" }}>
                <IconDeviceAnalytics size={18} />
              </div>
              <div className="sc-label">ルール6：CIでコアを守る</div>
              <div className="sc-desc">linter・自動チェックで外部 import 侵入を防ぐ。</div>
            </div>
          </div>

          <h3>14.2 意思決定テーブル</h3>
          <table className="decision-table">
            <thead>
              <tr>
                <th>問い</th>
                <th>答え</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ポートはどこに置くべきか</td>
                <td>
                  <code>application/ports/</code> に置く（コアの一部）
                </td>
              </tr>
              <tr>
                <td>アダプターはどこに置くべきか</td>
                <td>
                  <code>adapters/</code> に置く（コアの外側）
                </td>
              </tr>
              <tr>
                <td>コアは外部 import を持っていいか</td>
                <td>絶対に持ってはいけない</td>
              </tr>
              <tr>
                <td>ドリブンポートは誰が実装するか</td>
                <td>ドリブンアダプターが実装する</td>
              </tr>
              <tr>
                <td>ドライビングポートは誰が実装するか</td>
                <td>ユースケース（コア）が実装する</td>
              </tr>
              <tr>
                <td>テストにはどのアダプターを使うか</td>
                <td>InMemory / Fake 実装を使う</td>
              </tr>
              <tr>
                <td>新しい DB に切り替えるには</td>
                <td>新しいドリブンアダプターを作るだけ</td>
              </tr>
              <tr>
                <td>新しい入力インターフェースを追加するには</td>
                <td>新しいドライビングアダプターを作るだけ</td>
              </tr>
              <tr>
                <td>ビジネスロジックはどこに置か</td>
                <td>
                  <code>domain/</code> または <code>application/use_cases/</code> のみ
                </td>
              </tr>
              <tr>
                <td>依存性注入はどこで行うか</td>
                <td>
                  Composition Root（<code>di_container.py</code>）のみ
                </td>
              </tr>
            </tbody>
          </table>

          <h3>14.3 成熟度モデル</h3>
          <div className="level-row">
            <span
              className="level-badge"
              style={{ background: "var(--c-red-800)", color: "var(--c-red-400)" }}
            >
              Level 0
            </span>
            <div className="level-body">
              <strong>モノリシックなスパゲッティ</strong>
              <p>DB・UI・ビジネスロジックが混在。テストには全インフラが必要。</p>
            </div>
          </div>
          <div className="level-row">
            <span
              className="level-badge"
              style={{
                background: "var(--color-background-warning)",
                color: "var(--color-text-warning)",
              }}
            >
              Level 1
            </span>
            <div className="level-body">
              <strong>レイヤー分離</strong>
              <p>Controller / Service / Repository の分離。ただし具体クラスに直接依存。</p>
            </div>
          </div>
          <div className="level-row">
            <span
              className="level-badge"
              style={{ background: "rgba(251,191,36,0.15)", color: "var(--c-amber-400)" }}
            >
              Level 2
            </span>
            <div className="level-body">
              <strong>ポートの定義開始</strong>
              <p>Repository をインターフェース化。InMemory 実装でユニットテスト可能に。</p>
            </div>
          </div>
          <div className="level-row">
            <span
              className="level-badge"
              style={{
                background: "var(--color-background-success)",
                color: "var(--color-text-success)",
              }}
            >
              Level 3
            </span>
            <div className="level-body">
              <strong>完全なポート＆アダプター</strong>
              <p>すべての外部依存がポート経由。ドライビング・ドリブン両側が分離。</p>
            </div>
          </div>
          <div className="level-row">
            <span
              className="level-badge"
              style={{
                background: "var(--color-background-info)",
                color: "var(--color-text-info)",
              }}
            >
              Level 4
            </span>
            <div className="level-body">
              <strong>コアの純粋性保証</strong>
              <p>CIでコアの汚染を自動検出。全ポートにテスト用実装あり。</p>
            </div>
          </div>
          <div className="level-row">
            <span
              className="level-badge"
              style={{ background: "rgba(124,58,237,0.15)", color: "var(--c-purple-400)" }}
            >
              Level 5
            </span>
            <div className="level-body">
              <strong>複数コンテキストへの適用</strong>
              <p>マイクロサービスの各サービスにヘキサゴナルを適用。DDDと統合。</p>
            </div>
          </div>
        </section>

        {/* ========== SECTION 15 ========== */}
        <section id="s15" className="section">
          <h2>
            <span className="section-num">15</span> 参考文献・ソース一覧
          </h2>

          <div className="ref-section">
            <h3>一次ソース（原典・提唱者）</h3>
            <ul className="source-list">
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://web.archive.org/web/20210615175905/https://alistair.cockburn.us/hexagonal-architecture/">
                    Alistair Cockburn — Hexagonal Architecture（原著論文）
                  </Ext>
                  <div className="source-desc">
                    ヘキサゴナルアーキテクチャの提唱者による公式定義。ポート・アダプター・対称性の概念が初めて説明された文書。
                  </div>
                </div>
              </li>
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)">
                    Wikipedia — Hexagonal Architecture（Software）
                  </Ext>
                  <div className="source-desc">用語の整理と歴史的背景のまとめ。</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="ref-section">
            <h3>アーキテクチャ関連</h3>
            <ul className="source-list">
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
                    Robert C. Martin — The Clean Architecture
                  </Ext>
                  <div className="source-desc">
                    ヘキサゴナルを発展させたクリーンアーキテクチャの原著ブログ。同心円モデルとの対応関係を理解するのに必須。
                  </div>
                </div>
              </li>
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/">
                    Jeffrey Palermo — The Onion Architecture
                  </Ext>
                  <div className="source-desc">
                    ヘキサゴナルを発展させたオニオンアーキテクチャ。依存の方向の考え方が共通。
                  </div>
                </div>
              </li>
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://herbertograca.com/2017/09/14/ports-adapters-architecture/">
                    Herberto Graça — Ports &amp; Adapters Architecture（DDD + Hexagonal 詳細）
                  </Ext>
                  <div className="source-desc">
                    DDDとヘキサゴナルの統合を詳しく解説したブログ。実践的な視点から非常に参考になる。
                  </div>
                </div>
              </li>
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://martinfowler.com/articles/dipInTheWild.html">
                    DIP in the Wild
                  </Ext>
                  <div className="source-desc">依存性逆転原則の実際の適用例を解説。</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="ref-section">
            <h3>書籍</h3>
            <table>
              <thead>
                <tr>
                  <th>タイトル</th>
                  <th>著者</th>
                  <th>特徴</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Clean Architecture</strong>
                  </td>
                  <td>Robert C. Martin</td>
                  <td>ヘキサゴナルを発展させたアーキテクチャの体系書</td>
                </tr>
                <tr>
                  <td>
                    <strong>Architecture Patterns with Python</strong>
                  </td>
                  <td>Harry Percival, Bob Gregory</td>
                  <td>Pythonでのヘキサゴナル実践（無料公開）</td>
                </tr>
                <tr>
                  <td>
                    <strong>Get Your Hands Dirty on Clean Architecture</strong>
                  </td>
                  <td>Tom Hombergs</td>
                  <td>ヘキサゴナルの Java 実践ガイド（入門に最適）</td>
                </tr>
                <tr>
                  <td>
                    <strong>Domain-Driven Design</strong>
                  </td>
                  <td>Eric Evans</td>
                  <td>DDD × ヘキサゴナルの統合に必須</td>
                </tr>
                <tr>
                  <td>
                    <strong>Implementing Domain-Driven Design</strong>
                  </td>
                  <td>Vaughn Vernon</td>
                  <td>DDD 実践でのポート＆アダプター</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="ref-section">
            <h3>Python 実装リファレンス</h3>
            <ul className="source-list">
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://docs.python.org/ja/3/library/abc.html">
                    Python 公式 — abc（抽象基底クラス）
                  </Ext>
                  <div className="source-desc">ポートを定義するための ABC の使い方。</div>
                </div>
              </li>
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://fastapi.tiangolo.com/ja/tutorial/dependencies/">
                    FastAPI 公式 — Dependency Injection
                  </Ext>
                  <div className="source-desc">
                    FastAPI で DI を使ってアダプターを注入する方法。
                  </div>
                </div>
              </li>
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://testcontainers-python.readthedocs.io/">
                    TestContainers Python
                  </Ext>
                  <div className="source-desc">
                    実際の DB を使った統合テストを自動化するライブラリ。
                  </div>
                </div>
              </li>
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://github.com/cosmicpython/book">
                    Cosmic Python — Architecture Patterns with Python（GitHub）
                  </Ext>
                  <div className="source-desc">
                    書籍のサンプルコードリポジトリ。Python での実践例として非常に参考になる。
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="ref-section">
            <h3>テスト戦略</h3>
            <ul className="source-list">
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://martinfowler.com/bliki/TestPyramid.html">
                    Martin Fowler — テストピラミッド
                  </Ext>
                  <div className="source-desc">ユニット・統合・E2Eテストの比率についての指針。</div>
                </div>
              </li>
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://martinfowler.com/bliki/InMemoryTestDouble.html">
                    Martin Fowler — InMemory Test Doubles
                  </Ext>
                  <div className="source-desc">インメモリアダプターを使ったテスト戦略の解説。</div>
                </div>
              </li>
              <li className="source-item">
                <IconExternalLinkIcon />
                <div>
                  <Ext href="https://martinfowler.com/articles/mocksArentStubs.html">
                    Martin Fowler — Mocks Aren't Stubs
                  </Ext>
                  <div className="source-desc">
                    Mock・Stub・Fake の違いを理解するための必読記事。
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="callout info">
            <IconInfoCircle size={16} className="callout-icon" />
            <div>
              本ドキュメントは2024年時点の情報を基に作成されています。各ツール・フレームワークの仕様は変更される場合がありますので、実装前に公式ドキュメントを必ずご確認ください。
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// 内部アイコン
function IconExternalLinkIcon() {
  return (
    <IconArrowsRight
      size={16}
      style={{ color: "var(--c-teal-400)", marginTop: 2, flexShrink: 0 }}
    />
  );
}
