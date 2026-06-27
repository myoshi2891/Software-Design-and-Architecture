import {
  IconAlertTriangle,
  IconArrowsExchange,
  IconArrowsHorizontal,
  IconArrowsRightLeft,
  IconArrowUp,
  IconBolt,
  IconBook,
  IconBrandCloudflare,
  IconBug,
  IconBuildingArch,
  IconBulb,
  IconChartLine,
  IconCheck,
  IconClockPlay,
  IconCode,
  IconCoin,
  IconDatabase,
  IconDatabaseExport,
  IconEye,
  IconLicense,
  IconLink,
  IconNotes,
  IconRocket,
  IconStar,
  IconTestPipe,
  IconTopologyRing,
  IconX,
} from "@tabler/icons-react";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import MonolithicArchitectureSidebar, { type NavGroup } from "./MonolithicArchitectureSidebar";

const NAV_GROUPS: NavGroup[] = [
  {
    title: "基礎知識",
    items: [
      { id: "s1", num: "01", label: "モノリシックとは？" },
      { id: "s2", num: "02", label: "種類と構造" },
      { id: "s3", num: "03", label: "基本設計原則" },
    ],
  },
  {
    title: "詳細設計",
    items: [
      { id: "s4", num: "04", label: "レイヤードアーキテクチャ" },
      { id: "s5", num: "05", label: "モジュラーモノリス" },
      { id: "s6", num: "06", label: "データベース設計" },
      { id: "s7", num: "07", label: "ビジネスロジック" },
    ],
  },
  {
    title: "共通機能・テスト",
    items: [
      { id: "s8", num: "08", label: "API とルーティング" },
      { id: "s9", num: "09", label: "認証・認可" },
      { id: "s10", num: "10", label: "テスト戦略" },
    ],
  },
  {
    title: "運用・移行",
    items: [
      { id: "s11", num: "11", label: "スケーリング戦略" },
      { id: "s12", num: "12", label: "CI/CD とデプロイ" },
      { id: "s13", num: "13", label: "監視・ロギング" },
    ],
  },
  {
    title: "実践・まとめ",
    items: [
      { id: "s14", num: "14", label: "EC サイト実装例" },
      { id: "s15", num: "15", label: "マイクロサービスへの移行" },
      { id: "s16", num: "16", label: "ベストプラクティス" },
      { id: "s17", num: "17", label: "アンチパターン" },
      { id: "s18", num: "18", label: "参考文献" },
      { id: "glossary", num: "用語", label: "用語集" },
    ],
  },
];

export default function Page() {
  return (
    <div className="monolithic-architecture-comprehensive-guide">
      <MonolithicArchitectureSidebar groups={NAV_GROUPS} />

      <main className="main">
        <div className="hero">
          <div className="hero-badge">
            <IconBuildingArch size={20} /> Architecture Guide
          </div>
          <h1>モノリシックアーキテクチャ 完全ガイド</h1>
          <p>
            初学者でもわかるステップバイステップ解説。設計原則からスケーリング・マイクロサービス移行まで、現場で即使えるベストプラクティスをまとめました。
          </p>
          <div className="hero-meta">
            <span className="hero-meta-item">
              <IconBook size={16} /> 18 セクション
            </span>
            <span className="hero-meta-item">
              <IconCode size={16} /> Python / FastAPI 実装例付き
            </span>
            <span className="hero-meta-item">
              <IconLicense size={16} /> 2026-06-23 版
            </span>
          </div>
        </div>

        <div className="callout info">
          <span className="callout-icon">
            <IconBulb size={16} color="var(--color-text-info)" />
          </span>
          <div>
            <strong>このガイドの読み方</strong>
            <br />
            左サイドバーの目次から気になるセクションに直接ジャンプできます。初学者は 01 → 04 → 05 →
            10 の順で読むと理解しやすいです。各セクション末尾に参照リンクを掲載しています。
          </div>
        </div>

        <div className="divider" />

        {/* 01 */}
        <section className="doc-section section" id="s1">
          <div className="section-header">
            <span className="section-number">01</span>
            <h2 className="section-title">モノリシックアーキテクチャとは何か？</h2>
          </div>

          <p>
            <strong>モノリシックアーキテクチャ（Monolithic Architecture）</strong>
            とは、アプリケーションのすべての機能を <em>単一のコードベース・単一のデプロイ単位</em>
            として構築するアーキテクチャスタイルです。「Monolithic（一枚岩）」という名前のとおり、UI・ビジネスロジック・データアクセスがひとつのプロセスとして統合されています。
          </p>

          <div className="callout success">
            <span className="callout-icon">
              <IconBulb size={16} color="var(--color-text-success)" />
            </span>
            <div>
              <strong>核心思想</strong>：「すべての機能を 1
              つのアプリケーションとして構築し、シンプルさ・一貫性・開発スピードを最大化する。多くのシステムにとって、これが最も適切な出発点である。」
            </div>
          </div>

          <p>
            マイクロサービスが注目を集める昨今でも、モノリシックアーキテクチャは有効な選択肢です。その理由を下のメリット比較表で確認できます。
          </p>

          <h3 className="subsection-title">モノリシックの主なメリット</h3>

          <div className="card-grid">
            <div className="card">
              <h4>
                <IconRocket size={20} color="var(--c-teal-500)" /> 開発スピードが速い
              </h4>
              <p>
                環境セットアップがシンプルで、最初から動く環境を素早く構築できます。スタートアップの
                MVP（最小限の製品）に最適です。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconTestPipe size={20} color="var(--c-purple-500)" /> テストが容易
              </h4>
              <p>
                E2E
                テストが単純で、統合テストの設定も少ない。分散システム特有の「どのサービスが壊れているか」問題がありません。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconBug size={20} color="var(--c-coral-500)" /> デバッグが容易
              </h4>
              <p>
                単一プロセスで追跡できるため、分散トレーシングのような複雑な仕組みが不要です。スタックトレースがそのまま使えます。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconCoin size={20} color="var(--c-pink-500)" /> 運用コストが低い
              </h4>
              <p>
                インフラがシンプルで Kubernetes
                などの複雑なオーケストレーションが不要。少人数チームでも管理できます。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconArrowsExchange size={20} color="var(--c-teal-500)" /> トランザクション管理
              </h4>
              <p>
                ACID
                トランザクション（＝データの整合性を保証する仕組み）が容易。複数サービス間の分散トランザクションを心配する必要がありません。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconEye size={20} color="var(--c-purple-500)" /> コード全体が見渡せる
              </h4>
              <p>
                IDE
                でコードベース全体を把握でき、リファクタリングも一括で実施できます。新メンバーのオンボーディングがシンプルです。
              </p>
            </div>
          </div>

          <h3 className="subsection-title">アーキテクチャ選択の判断基準</h3>

          <p>
            どのアーキテクチャを選ぶかは、チーム規模・変化の速さ・システム規模の 3
            軸で判断します。以下の表が目安になります。
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>状況</th>
                  <th>推奨アーキテクチャ</th>
                  <th>理由</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>チーム 1〜5 人・スタートアップ MVP</td>
                  <td>
                    <span className="tag tag-teal">モノリス</span>
                  </td>
                  <td>開発スピードと運用シンプルさを最優先できる</td>
                </tr>
                <tr>
                  <td>チーム 5〜30 人・成長期の SaaS</td>
                  <td>
                    <span className="tag tag-purple">モジュラーモノリス</span>
                  </td>
                  <td>境界を明確にしつつ、複雑さは抑えられる</td>
                </tr>
                <tr>
                  <td>チーム 30 人以上・大規模 EC・高負荷</td>
                  <td>
                    <span className="tag tag-coral">マイクロサービス</span>
                  </td>
                  <td>独立デプロイと独立スケーリングが必要になる</td>
                </tr>
                <tr>
                  <td>大規模・変化が少ない社内システム</td>
                  <td>
                    <span className="tag tag-purple">モジュラーモノリス</span>
                  </td>
                  <td>安定性重視・分散の複雑さを避けられる</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TD
    subgraph MONOLITH["モノリシックアプリケーション（単一デプロイ単位）"]
        subgraph PRESENTATION["プレゼンテーション層"]
            WEB_CTRL["Webコントローラー"]
            API_CTRL["APIコントローラー"]
        end
        subgraph BUSINESS["ビジネスロジック層"]
            ORDER_SVC["注文サービス"]
            USER_SVC["ユーザーサービス"]
            PRODUCT_SVC["商品サービス"]
        end
        subgraph DATA["データアクセス層"]
            ORDER_REPO["注文リポジトリ"]
            USER_REPO["ユーザーリポジトリ"]
        end
        subgraph SHARED["共有コンポーネント"]
            AUTH["認証・認可"]
            LOGGER["ロギング"]
            CACHE["キャッシュ"]
        end
    end
    DB[("データベース PostgreSQL")]
    REDIS["Redis キャッシュ"]
    PRESENTATION --> BUSINESS
    BUSINESS --> DATA
    DATA --> DB
    CACHE --> REDIS
    SHARED --> PRESENTATION
    SHARED --> BUSINESS`}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Martin Fowler — MonolithFirst パターン</div>
                <Ext href="https://martinfowler.com/bliki/MonolithFirst.html">
                  https://martinfowler.com/bliki/MonolithFirst.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Sam Newman — Monolith to Microservices（書籍）</div>
                <Ext href="https://www.oreilly.com/library/view/monolith-to-microservices/9781492047834/">
                  https://www.oreilly.com/library/view/monolith-to-microservices/9781492047834/
                </Ext>
              </div>
            </div>
          </div>

          <div className="glossary">
            <div className="glossary-header">
              <IconBook size={16} /> このセクションで登場した用語
            </div>
            <div className="glossary-body">
              <div className="glossary-item">
                <span className="glossary-term">モノリシック</span>
                <span className="glossary-def">
                  「一枚岩」の意。すべての機能を 1 つのアプリケーションにまとめた構造のこと。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">デプロイ単位</span>
                <span className="glossary-def">
                  アプリケーションをサーバーに配備（デプロイ）するときの最小まとまりのこと。モノリスは全機能が
                  1 単位。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">MVP</span>
                <span className="glossary-def">
                  Minimum Viable
                  Product（最小限の実用的な製品）。仮説検証のために最低限の機能だけで作るプロダクトのこと。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">ACID トランザクション</span>
                <span className="glossary-def">
                  データの整合性を保証する 4
                  つの性質（原子性・一貫性・独立性・耐久性）をまとめた概念。
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 02 */}
        <section className="doc-section section" id="s2">
          <div className="section-header">
            <span className="section-number">02</span>
            <h2 className="section-title">モノリシックの種類と構造</h2>
          </div>

          <p>
            モノリシックアーキテクチャには 4
            つのタイプがあります。それぞれのタイプを理解することで、自分のプロジェクトに最適な形を選択できます。
          </p>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TD
    TYPES["モノリシックアーキテクチャの種類"]
    TYPES --> SINGLE["1. 単純モノリス<br>Single-Tier Monolith<br>すべてが1ファイル・1モジュールに<br>小規模スクリプト・PoC向け"]
    TYPES --> LAYERED["2. レイヤードモノリス<br>Layered Monolith<br>プレゼンテーション・ビジネス・<br>データアクセスを層で分離<br>最も一般的な構造"]
    TYPES --> MODULAR["3. モジュラーモノリス<br>Modular Monolith<br>機能ドメインごとにモジュール分割<br>単一デプロイだが高い独立性"]
    TYPES --> DISTRIBUTED["4. 分散モノリス（アンチパターン）<br>Distributed Monolith<br>見た目はマイクロサービスだが<br>実は密結合な最悪の形態<br>避けるべき構成"]
    SINGLE --> S_USE["適用：プロトタイプ・個人開発<br>チーム：1〜2人"]
    LAYERED --> L_USE["適用：中小規模Webアプリ<br>チーム：3〜10人"]
    MODULAR --> M_USE["適用：成長期のSaaS・社内システム<br>チーム：10〜30人"]
    DISTRIBUTED --> D_USE["複雑さのみ増大<br>どちらのメリットも得られない"]
    style SINGLE fill:#0e1e35,color:#60a5fa
    style LAYERED fill:#0d1f18,color:#34d399
    style MODULAR fill:#1a1040,color:#a78bfa
    style DISTRIBUTED fill:#2a1018,color:#f87171`}
            />
          </div>

          <h3 className="subsection-title">単純モノリス vs レイヤードモノリス</h3>

          <div className="comparison-row">
            <div className="comp-col bad">
              <h4>
                <IconX size={16} /> 単純モノリス（スパゲッティ）
              </h4>
              <ul>
                <li>DB クエリ・ビジネスロジック・HTML 生成がすべて 1 ファイルに混在</li>
                <li>変更の影響範囲が予測できない</li>
                <li>テストが書けない</li>
                <li>新メンバーが理解するのに時間がかかる</li>
              </ul>
            </div>
            <div className="comp-col good">
              <h4>
                <IconCheck size={16} /> レイヤードモノリス
              </h4>
              <ul>
                <li>プレゼンテーション・ビジネス・DB を明確に層分離</li>
                <li>変更の影響が層内に限定される</li>
                <li>ユニットテストが書きやすい</li>
                <li>新メンバーが構造を把握しやすい</li>
              </ul>
            </div>
          </div>

          <h3 className="subsection-title">各タイプの適用シナリオ</h3>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>タイプ</th>
                  <th>チーム規模</th>
                  <th>適用シナリオ</th>
                  <th>主なリスク</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="tag tag-teal">単純モノリス</span>
                  </td>
                  <td>1〜2 人</td>
                  <td>個人開発・PoC・プロトタイプ</td>
                  <td>拡大すると保守不能になる</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-purple">レイヤードモノリス</span>
                  </td>
                  <td>3〜10 人</td>
                  <td>中小規模 Web アプリ・社内システム</td>
                  <td>層を無視したコードが増えやすい</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-coral">モジュラーモノリス</span>
                  </td>
                  <td>10〜30 人</td>
                  <td>成長期 SaaS・将来の分割を見据えたシステム</td>
                  <td>モジュール境界の維持に規律が必要</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-red">分散モノリス</span>
                  </td>
                  <td>—</td>
                  <td>なし（アンチパターン）</td>
                  <td>両方のデメリットを受ける最悪の形態</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="callout warning">
            <span className="callout-icon">
              <IconAlertTriangle size={16} color="var(--color-text-warning)" />
            </span>
            <div>
              <strong>分散モノリスに注意</strong>
              ：サービスを分割したのに、デプロイを常に同時にしないと動かない状態は「分散モノリス」です。マイクロサービスの複雑さだけを得て、モノリスのシンプルさも失った最悪の形態です。この状態に気づいたら、潔くモノリスに戻すか、サービス間の依存を徹底的に排除してから分割しましょう。
            </div>
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">
                  Martin Fowler — Microservices（モノリスとの比較）
                </div>
                <Ext href="https://martinfowler.com/articles/microservices.html">
                  https://martinfowler.com/articles/microservices.html
                </Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 03 */}
        <section className="doc-section section" id="s3">
          <div className="section-header">
            <span className="section-number">03</span>
            <h2 className="section-title">モノリシックの基本設計原則</h2>
          </div>

          <p>
            良いモノリスを設計するために、ソフトウェア工学の基本原則を理解しておく必要があります。これらの原則を無視すると、最終的にスパゲッティコード（＝複雑に絡み合って手をつけられないコード）になります。
          </p>

          <h3 className="subsection-title">SOLID 原則</h3>

          <p>
            SOLID は 5
            つの設計原則の頭文字をとったものです。モノリスでこれらを守ることで、将来の変更に強いコードが生まれます。
          </p>

          <div className="principle-grid">
            <div className="principle-card">
              <div className="p-label">
                <span className="tag tag-purple">S</span> 単一責任原則
              </div>
              <h4>Single Responsibility Principle</h4>
              <p>1 つのクラスは 1 つの変更理由だけを持つべきです。</p>
              <p style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>
                例：<code>OrderService</code> は注文のみを扱い、メール送信は{" "}
                <code>NotificationService</code> が担当する。
              </p>
            </div>
            <div className="principle-card">
              <div className="p-label">
                <span className="tag tag-teal">O</span> 開放閉鎖原則
              </div>
              <h4>Open/Closed Principle</h4>
              <p>拡張に対して開かれており、修正に対して閉じているべきです。</p>
              <p style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>
                例：新しい割引タイプを追加するとき、既存コードを修正せず新クラスを追加する。
              </p>
            </div>
            <div className="principle-card">
              <div className="p-label">
                <span className="tag tag-coral">L</span> リスコフ置換原則
              </div>
              <h4>Liskov Substitution Principle</h4>
              <p>サブクラスは親クラスの代わりに使えるべきです。</p>
              <p style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>
                例：<code>SQLOrderRepo</code> は <code>OrderRepository</code>{" "}
                インターフェースを完全に代替できる。
              </p>
            </div>
            <div className="principle-card">
              <div className="p-label">
                <span className="tag tag-pink">I</span> インターフェース分離
              </div>
              <h4>Interface Segregation Principle</h4>
              <p>使わないメソッドを実装させてはいけません。</p>
              <p style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>
                例：読み取りと書き込みを分離した小さなインターフェースを定義する。
              </p>
            </div>
            <div className="principle-card">
              <div className="p-label">
                <span className="tag tag-teal">D</span> 依存性逆転原則
              </div>
              <h4>Dependency Inversion Principle</h4>
              <p>具体的な実装ではなく、抽象（インターフェース）に依存するべきです。</p>
              <p style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>
                例：<code>OrderService → OrderRepository（抽象）← SQLAlchemyOrderRepo（具体）</code>
              </p>
            </div>
          </div>

          <h3 className="subsection-title">モノリス設計の 5 つの黄金ルール</h3>

          <div className="step-item">
            <span className="step-num">1</span>
            <div className="step-body">
              <h4>関心の分離（Separation of Concerns）</h4>
              <p>
                プレゼンテーション・ビジネス・データを明確に分離します。「画面のコード and
                計算ロジックが混ざっていたら危険サイン」と覚えてください。混在させると変更の影響が予測不能になります。
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-num">2</span>
            <div className="step-body">
              <h4>依存 direction の統一</h4>
              <p>
                上位層から下位層への一方向依存を守ります。
                <code>Controller → Service → Repository</code> の方向は OK ですが、逆（Repository が
                Controller を知る）は禁止です。循環依存はコードの腐敗の始まりです。
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-num">3</span>
            <div className="step-body">
              <h4>ドメインの独立性</h4>
              <p>
                各ドメイン（注文・ユーザー・商品など）を疎結合（＝お互いの依存が少ない状態）に保ちます。これが将来のマイクロサービス分割の布石になります。
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-num">4</span>
            <div className="step-body">
              <h4>共有カーネルの最小化</h4>
              <p>
                共通コードは必要最小限にします。<code>utils</code> や <code>helpers</code>{" "}
                に何でも入れると、変更時に影響範囲が広がりすぎます。
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-num">5</span>
            <div className="step-body">
              <h4>テスタビリティ優先設計</h4>
              <p>
                依存性注入（＝外からオブジェクトを渡す仕組み）でモックが容易に。ビジネスロジックは
                DB
                なしでテストできる構造を目指します。テストできないコードはリファクタリングも怖くなります。
              </p>
            </div>
          </div>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    RULE1["1 関心の分離\\n層を明確に分ける"] --> RULE2["2 依存方向の統一\\n上から下への一方向"] --> RULE3["3 ドメインの独立\\n疎結合を保つ"] --> RULE4["4 共有を最小化\\nutilsに何でも入れない"] --> RULE5["5 テスタビリティ\\nDIで疎結合に設計"]`}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Clean Architecture — Robert C. Martin</div>
                <Ext href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
                  https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Twelve-Factor App（設計原則）</div>
                <Ext href="https://12factor.net/ja/">https://12factor.net/ja/</Ext>
              </div>
            </div>
          </div>

          <div className="glossary">
            <div className="glossary-header">
              <IconBook size={16} /> このセクションで登場した用語
            </div>
            <div className="glossary-body">
              <div className="glossary-item">
                <span className="glossary-term">SOLID 原則</span>
                <span className="glossary-def">
                  ソフトウェア設計の 5
                  つの原則の頭文字。保守性・拡張性の高いコードを書くための指針。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">依存性注入 (DI)</span>
                <span className="glossary-def">
                  クラスが必要とするオブジェクトを外から渡す仕組み。テスト時にモック（偽物）に差し替えられる。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">疎結合</span>
                <span className="glossary-def">
                  コンポーネント間の依存が少ない状態。変更の影響範囲が限定される。反対は「密結合」。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">関心の分離</span>
                <span className="glossary-def">
                  異なる責務を別々のモジュール・クラス・層に分けること。混在させないことが重要。
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 04 */}
        <section className="doc-section section" id="s4">
          <div className="section-header">
            <span className="section-number">04</span>
            <h2 className="section-title">レイヤードアーキテクチャの詳細</h2>
          </div>

          <p>
            レイヤードアーキテクチャ（層状アーキテクチャ）は、モノリシックアプリケーションの最も一般的な構造です。各層が決まった責務だけを持ち、隣接する層のみと通信するルールを守ります。
          </p>

          <h3 className="subsection-title">4 層の役割</h3>

          <div className="layer-stack">
            <div className="layer-item layer-1">
              <h4>プレゼンテーション層（Presentation Layer）</h4>
              <p>HTTP リクエスト・レスポンスの処理のみを担当。ビジネスロジックは書かない。</p>
              <ul>
                <li>REST API コントローラー・ビューコントローラー</li>
                <li>リクエストの DTO（データ転送オブジェクト）への変換</li>
                <li>バリデーションエラーのレスポンス整形</li>
              </ul>
            </div>
            <div className="layer-item layer-2">
              <h4>アプリケーション層（Application Layer）</h4>
              <p>ビジネスフローのオーケストレーション（複数の処理を順番に調整すること）を担当。</p>
              <ul>
                <li>ユースケースクラス（place_order.py など）</li>
                <li>入力バリデーション・ドメインモデルへのマッピング</li>
                <li>トランザクション境界の管理</li>
              </ul>
            </div>
            <div className="layer-item layer-3">
              <h4>ドメイン層（Domain Layer）</h4>
              <p>ビジネスルールの中核。フレームワーク依存なし・最も安定すべき層。</p>
              <ul>
                <li>エンティティ（注文・ユーザーなどのビジネスオブジェクト）</li>
                <li>値オブジェクト（Money・Email・Address など）</li>
                <li>リポジトリインターフェース（抽象定義のみ）</li>
              </ul>
            </div>
            <div className="layer-item layer-4">
              <h4>インフラストラクチャ層（Infrastructure Layer）</h4>
              <p>外部システムとの接続を担当。DB・キャッシュ・外部 API の具体実装。</p>
              <ul>
                <li>リポジトリ具体実装（SQLAlchemy など）</li>
                <li>Redis キャッシュ・メール送信・外部 API クライアント</li>
                <li>依存性逆転でドメイン層のインターフェースを実装</li>
              </ul>
            </div>
          </div>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`sequenceDiagram
    participant CLIENT as クライアント
    participant CTRL as コントローラー（プレゼンテーション層）
    participant SVC as サービス（アプリケーション層）
    participant DOM as ドメインモデル（ドメイン層）
    participant REPO as リポジトリ（インフラ層）
    participant DB as データベース
    CLIENT->>CTRL: HTTP POST /orders
    CTRL->>CTRL: バリデーション・DTO変換
    CTRL->>SVC: place_order(command)
    SVC->>DOM: Order.create(customer_id, items)
    DOM->>DOM: ビジネスルール実行・価格計算
    SVC->>REPO: save(order)
    REPO->>DB: INSERT INTO orders
    DB-->>REPO: 保存完了
    REPO-->>SVC: Order エンティティ
    SVC-->>CTRL: OrderResult DTO
    CTRL-->>CLIENT: HTTP 201 Created`}
            />
          </div>

          <h3 className="subsection-title">ディレクトリ構成のベストプラクティス</h3>

          <p>
            ディレクトリ構成はアーキテクチャを「見える化」する最初の一歩です。以下の構成は 4
            層アーキテクチャを忠実に反映しています。
          </p>

          <div className="cd">
            <pre
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static HTML block
              dangerouslySetInnerHTML={{
                __html: `my_app/
├── <span class="cls">presentation/</span>               <span class="cm"># プレゼンテーション層</span>
│   ├── controllers/
│   │   ├── order_controller.py   <span class="cm"># 注文 API エンドポイント</span>
│   │   └── user_controller.py
│   ├── schemas/                  <span class="cm"># リクエスト/レスポンス スキーマ</span>
│   └── middleware/
│       └── auth_middleware.py
│
├── <span class="cls">application/</span>                <span class="cm"># アプリケーション層</span>
│   ├── use_cases/
│   │   ├── place_order.py        <span class="cm"># 注文確定ユースケース</span>
│   │   └── register_user.py
│   └── dtos/
│
├── <span class="cls">domain/</span>                     <span class="cm"># ドメイン層（最重要・最安定）</span>
│   ├── entities/
│   │   ├── order.py              <span class="cm"># 注文エンティティ</span>
│   │   └── user.py
│   ├── value_objects/
│   │   ├── money.py              <span class="cm"># 金額値オブジェクト</span>
│   │   └── email.py
│   ├── repositories/             <span class="cm"># インターフェース（抽象）のみ</span>
│   └── exceptions.py
│
├── <span class="cls">infrastructure/</span>             <span class="cm"># インフラストラクチャ層</span>
│   ├── database/
│   │   ├── models.py             <span class="cm"># SQLAlchemy モデル</span>
│   │   └── migrations/
│   ├── repositories/             <span class="cm"># 具体実装</span>
│   │   └── sql_order_repo.py
│   └── external/
│       └── payment_gateway.py
│
├── <span class="cls">config/</span>                     <span class="cm"># 設定管理</span>
│   ├── settings.py
│   └── dependencies.py           <span class="cm"># 依存性注入設定</span>
│
└── <span class="cls">tests/</span>                      <span class="cm"># テスト（層別に整理）</span>
    ├── unit/
    ├── integration/
    └── e2e/`,
              }}
            />
          </div>

          <div className="callout info">
            <span className="callout-icon">
              <IconBulb size={16} color="var(--color-text-info)" />
            </span>
            <div>
              <strong>なぜドメイン層が「最重要・最安定」なのか？</strong>
              <br />
              ドメイン層はビジネスルール（＝会社が何をするかの本質）を含みます。フレームワークは変わっても（Flask
              → FastAPI
              など）、ビジネスルールは変わりません。だからこそ、フレームワーク依存をゼロにして最も安定させるべき層なのです。
            </div>
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">
                  Martin Fowler — Presentation Domain Data Layering
                </div>
                <Ext href="https://martinfowler.com/bliki/PresentationDomainDataLayering.html">
                  https://martinfowler.com/bliki/PresentationDomainDataLayering.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Hexagonal Architecture — Alistair Cockburn</div>
                <Ext href="https://web.archive.org/web/20210615175905/https://alistair.cockburn.us/hexagonal-architecture/">
                  Alistair Cockburn - Hexagonal Architecture (Web Archive)
                </Ext>
              </div>
            </div>
          </div>

          <div className="glossary">
            <div className="glossary-header">
              <IconBook size={16} /> このセクションで登場した用語
            </div>
            <div className="glossary-body">
              <div className="glossary-item">
                <span className="glossary-term">DTO</span>
                <span className="glossary-def">
                  Data Transfer
                  Object（データ転送オブジェクト）。層をまたいでデータを運ぶための入れ物。ロジックを持たない。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">エンティティ</span>
                <span className="glossary-def">
                  ID
                  を持ち、ライフサイクル（生成→更新→削除）を持つビジネスオブジェクト。例：注文・ユーザー。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">値オブジェクト</span>
                <span className="glossary-def">
                  ID
                  を持たない、値で識別されるオブジェクト。イミュータブル（変更不可）。例：Money(1000,
                  "JPY")。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">リポジトリ</span>
                <span className="glossary-def">
                  データベースへのアクセスを抽象化したクラス。ドメイン層はインターフェース（抽象）だけを知り、実装はインフラ層が担当。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">オーケストレーション</span>
                <span className="glossary-def">
                  複数の処理を特定の順序で調整・実行すること。例：「注文→在庫チェック→決済→通知」の順序制御。
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 05 */}
        <section className="doc-section section" id="s5">
          <div className="section-header">
            <span className="section-number">05</span>
            <h2 className="section-title">モジュラーモノリス（推奨形態）</h2>
          </div>

          <p>
            モジュラーモノリスは、レイヤードアーキテクチャをさらに発展させた形態です。単一デプロイを保ちつつ、機能ドメインごとにモジュールを分割します。将来のマイクロサービス移行への最良の準備でもあります。
          </p>

          <div className="callout success">
            <span className="callout-icon">
              <IconStar size={16} color="var(--color-text-success)" />
            </span>
            <div>
              <strong>なぜモジュラーモノリスを推奨するのか？</strong>
              <br />
              モノリスのシンプルさ（単一デプロイ・トランザクション管理のしやすさ）を保ちながら、将来の分割に備えた境界設計ができます。チーム規模が大きくなっても、各チームが独立したモジュールを担当できます。
            </div>
          </div>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TD
    subgraph MODULAR_MONO["モジュラーモノリス（単一デプロイ・モジュール分離）"]
        subgraph ORDER_MOD["注文モジュール"]
            OM_API["Order API"]
            OM_SVC["Order Service"]
            OM_DOM["Order Domain"]
            OM_REPO["Order Repo"]
            OM_API --> OM_SVC --> OM_DOM --> OM_REPO
        end
        subgraph USER_MOD["ユーザーモジュール"]
            UM_API["User API"]
            UM_SVC["User Service"]
            UM_DOM["User Domain"]
            UM_REPO["User Repo"]
            UM_API --> UM_SVC --> UM_DOM --> UM_REPO
        end
        subgraph PRODUCT_MOD["商品モジュール"]
            PM_API["Product API"]
            PM_SVC["Product Service"]
            PM_DOM["Product Domain"]
            PM_REPO["Product Repo"]
            PM_API --> PM_SVC --> PM_DOM --> PM_REPO
        end
        subgraph SHARED_KERNEL["共有カーネル（最小限）"]
            AUTH_K["認証ミドルウェア"]
            EVENT_K["ドメインイベント"]
        end
    end
    ORDER_MOD -->|"インターフェース経由のみ"| USER_MOD
    DB_ORDER[("注文スキーマ")]
    DB_USER[("ユーザースキーマ")]
    OM_REPO --> DB_ORDER
    UM_REPO --> DB_USER`}
            />
          </div>

          <h3 className="subsection-title">モジュール間通信のルール</h3>

          <div className="comparison-row">
            <div className="comp-col good">
              <h4>
                <IconCheck size={16} /> 正しいモジュール間通信
              </h4>
              <ul>
                <li>公開インターフェース（Port）経由でのみ呼び出す</li>
                <li>データ変更の通知はドメインイベント（Pub/Sub）で行う</li>
                <li>
                  共有データが必要なら ACL（変換レイヤー）で各モジュール独自のモデルに変換する
                </li>
              </ul>
            </div>
            <div className="comp-col bad">
              <h4>
                <IconX size={16} /> 禁止パターン
              </h4>
              <ul>
                <li>他モジュールの内部クラスを直接インポートする</li>
                <li>他モジュールの DB テーブルに直接 SQL でアクセスする</li>
                <li>循環依存（注文 → ユーザー → 注文）を作る</li>
              </ul>
            </div>
          </div>

          <h3 className="subsection-title">モジュール間通信の実装例（Python）</h3>

          <p>
            以下のコードは、注文モジュールがユーザーモジュールを利用する際の正しいパターンです。
            <strong>公開インターフェースのみに依存し、内部実装の詳細は知らない</strong>
            ことがポイントです。
          </p>

          <div className="cd">
            <pre
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static HTML block
              dangerouslySetInnerHTML={{
                __html: `<span class="cm"># ユーザーモジュールの公開 API 定義（modules/users/public.py）</span>
<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass

<span class="cm"># 外部に公開するデータ構造（内部のDBモデルは隠蔽する）</span>
@dataclass(frozen=True)
<span class="kw">class</span> <span class="cls">UserInfo</span>:
    user_id:   str
    name:      str
    email:     str
    is_active: bool

<span class="cm"># 公開クエリインターフェース（抽象クラス）</span>
<span class="kw">class</span> <span class="cls">UserQueryService</span>(ABC):
    @abstractmethod
    <span class="kw">def</span> <span class="fn">get_user_by_id</span>(self, user_id: str) -&gt; UserInfo | None: ...
    @abstractmethod
    <span class="kw">def</span> <span class="fn">is_user_active</span>(self, user_id: str) -&gt; bool: ...

<span class="cm"># 注文モジュールからの利用（modules/orders/application/place_order.py）</span>
<span class="kw">from</span> modules.users.public <span class="kw">import</span> UserQueryService  <span class="cm"># 公開インターフェースのみ</span>

<span class="kw">class</span> <span class="cls">PlaceOrderUseCase</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(
        self,
        order_repository:   OrderRepository,
        user_query_service: UserQueryService,  <span class="cm"># インターフェースに依存（具体実装ではない）</span>
        event_bus:          EventBus,
    ):
        self._order_repo    = order_repository
        self._user_service  = user_query_service
        self._event_bus     = event_bus

    <span class="kw">def</span> <span class="fn">execute</span>(self, customer_id: str, items: list[dict]) -&gt; dict:
        <span class="cm"># 公開インターフェースを通じてユーザー情報を取得</span>
        <span class="kw">if not</span> self._user_service.is_user_active(customer_id):
            <span class="kw">raise</span> ValueError(<span class="st">"アクティブでないユーザーは注文できません"</span>)

        order = Order.create(customer_id=customer_id, items=items)
        self._order_repo.save(order)

        <span class="cm"># 他モジュールへの通知はイベント経由（直接メソッド呼び出しではない）</span>
        self._event_bus.publish(<span class="st">"order.placed"</span>, {<span class="st">"order_id"</span>: order.id})
        <span class="kw">return</span> {<span class="st">"order_id"</span>: order.id}`,
              }}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Martin Fowler — Modular Monolith への言及</div>
                <Ext href="https://martinfowler.com/articles/break-monolith-into-microservices.html">
                  https://martinfowler.com/articles/break-monolith-into-microservices.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">
                  Martin Fowler — Anemic Domain Model（アンチパターン）
                </div>
                <Ext href="https://martinfowler.com/bliki/AnemicDomainModel.html">
                  https://martinfowler.com/bliki/AnemicDomainModel.html
                </Ext>
              </div>
            </div>
          </div>

          <div className="glossary">
            <div className="glossary-header">
              <IconBook size={16} /> このセクションで登場した用語
            </div>
            <div className="glossary-body">
              <div className="glossary-item">
                <span className="glossary-term">モジュラーモノリス</span>
                <span className="glossary-def">
                  単一デプロイを保ちつつ、機能ドメインごとにモジュール分割されたモノリス。境界が明確で将来の分割が容易。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">ドメインイベント</span>
                <span className="glossary-def">
                  ビジネス上の出来事（注文確定・注文キャンセルなど）を表すオブジェクト。Pub/Sub
                  で他モジュールに通知する。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">Pub/Sub パターン</span>
                <span className="glossary-def">
                  発行者（Publisher）と購読者（Subscriber）を分離する通信パターン。直接の依存なしにメッセージを伝達できる。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">ACL（腐敗防止層）</span>
                <span className="glossary-def">
                  Anti-Corruption
                  Layer。他モジュールのモデルを自モジュールのモデルに変換する変換レイヤー。
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 06 */}
        <section className="doc-section section" id="s6">
          <div className="section-header">
            <span className="section-number">06</span>
            <h2 className="section-title">データベース設計</h2>
          </div>

          <p>
            モノリシックアプリケーションのデータベース設計は、将来のスケーリングと保守性に大きく影響します。最初から将来を見据えた設計をしておくことで、後から大規模な変更を避けられます。
          </p>

          <h3 className="subsection-title">モノリスの DB 設計パターン</h3>

          <div className="card-grid">
            <div className="card">
              <h4>
                <IconDatabase size={20} color="var(--c-teal-500)" /> 単一データベース（推奨：初期）
              </h4>
              <p>
                すべてのデータを 1 つの DB に格納。トランザクションが最も強力。チーム 1〜10
                人・データ量 1TB 以下に最適。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconDatabase size={20} color="var(--c-purple-500)" />{" "}
                スキーマ分離（推奨：モジュラー）
              </h4>
              <p>
                <code>orders</code>・<code>users</code>・<code>products</code>{" "}
                スキーマを分離。将来の DB 分割がしやすく、アクセス制御も可能。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconArrowsRightLeft size={20} color="var(--c-coral-500)" />{" "}
                読み書き分離（スケール時）
              </h4>
              <p>
                プライマリ（書き込み専用）+ レプリカ（読み取り専用）。読み取り比率が 70%
                以上になったら検討。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconBolt size={20} color="var(--c-pink-500)" /> キャッシュアサイドパターン
              </h4>
              <p>
                頻繁に読まれるデータを Redis にキャッシュ。DB
                クエリ数を劇的に削減。セッション管理にも活用。
              </p>
            </div>
          </div>

          <h3 className="subsection-title">スキーマ設計のベストプラクティス（SQLAlchemy）</h3>

          <div className="cd">
            <pre
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static HTML block
              dangerouslySetInnerHTML={{
                __html: `<span class="kw">from</span> sqlalchemy <span class="kw">import</span> Column, String, Numeric, DateTime, ForeignKey, Index, Boolean
<span class="kw">from</span> sqlalchemy.orm <span class="kw">import</span> relationship, DeclarativeBase

<span class="kw">class</span> <span class="cls">OrderModel</span>(Base):
    <span class="st">"""注文テーブル"""</span>
    __tablename__ = <span class="st">"orders"</span>
    __table_args__ = (
        <span class="cm"># よく使う検索カラムにインデックスを貼る（検索速度が劇的に改善する）</span>
        Index(<span class="st">"ix_orders_user_id"</span>, <span class="st">"user_id"</span>),
        Index(<span class="st">"ix_orders_status"</span>,  <span class="st">"status"</span>),
        Index(<span class="st">"ix_orders_created_at"</span>, <span class="st">"created_at"</span>),
        {<span class="st">"schema"</span>: <span class="st">"order_schema"</span>},  <span class="cm"># スキーマ分離でモジュール境界を DB レベルで表現</span>
    )

    id           = Column(String(<span class="nu">36</span>), primary_key=True, default=<span class="kw">lambda</span>: str(uuid.uuid4()))
    user_id      = Column(String(<span class="nu">36</span>), ForeignKey(<span class="st">"user_schema.users.id"</span>), nullable=False)
    status       = Column(SQLEnum(OrderStatus), nullable=False, default=OrderStatus.PENDING)
    total_amount = Column(Numeric(<span class="nu">12</span>, <span class="nu">2</span>), nullable=False)  <span class="cm"># 金額は Decimal で精度保証</span>
    currency     = Column(String(<span class="nu">3</span>), nullable=False, default=<span class="st">"JPY"</span>)
    created_at   = Column(DateTime, nullable=False, server_default=func.now())
    updated_at   = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())`,
              }}
            />
          </div>

          <h3 className="subsection-title">マイグレーション管理のベストプラクティス</h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
    DEV["開発者がモデルを変更"] --> GEN["マイグレーションファイル生成\\nalembic revision --autogenerate"]
    GEN --> REVIEW["レビュー：生成された SQL を確認\\nup / down 両方が正しいか検証"]
    REVIEW --> TEST["テスト環境で実行\\nalembic upgrade head"]
    TEST --> STAGING["ステージング環境で実行\\nロールバックのテスト"]
    STAGING --> PROD["本番環境で実行"]
    PROD --> MONITOR["実行後の確認\\nエラーログ・データ整合性チェック"]
    PROD -->|"問題発生時"| ROLLBACK["alembic downgrade -1\\n1バージョン戻す"]`}
            />
          </div>

          <div className="callout warning">
            <span className="callout-icon">
              <IconAlertTriangle size={16} color="var(--color-text-warning)" />
            </span>
            <div>
              <strong>本番 DB マイグレーションの鉄則</strong>
              <br />
              必ずステージング環境で先にテストし、ロールバック手順を確認してから本番に適用します。特に大量データが存在するテーブルへの
              ALTER TABLE は、本番環境で長時間ロックがかかる可能性があります。
            </div>
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">SQLAlchemy 公式ドキュメント</div>
                <Ext href="https://docs.sqlalchemy.org/">https://docs.sqlalchemy.org/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Alembic（DB マイグレーション）</div>
                <Ext href="https://alembic.sqlalchemy.org/">https://alembic.sqlalchemy.org/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">PostgreSQL パフォーマンスチューニング</div>
                <Ext href="https://www.postgresql.org/docs/current/performance-tips.html">
                  https://www.postgresql.org/docs/current/performance-tips.html
                </Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 07 */}
        <section className="doc-section section" id="s7">
          <div className="section-header">
            <span className="section-number">07</span>
            <h2 className="section-title">ビジネスロジックの実装</h2>
          </div>

          <p>
            ビジネスロジックとは「会社が何をするか」を表すコードです。注文の合計金額計算・在庫チェック・割引ルールなどがこれに該当します。
            <strong>
              最もよくある間違いは、このロジックをコントローラーやテンプレートに書いてしまうこと
            </strong>
            です。
          </p>

          <h3 className="subsection-title">ビジネスロジックの正しい配置場所</h3>

          <div className="comparison-row">
            <div className="comp-col good">
              <h4>
                <IconCheck size={16} /> 置くべき場所
              </h4>
              <ul>
                <li>
                  <strong>ドメイン層</strong>
                  ：エンティティの不変条件・値オブジェクトの計算・ドメインルール検証
                </li>
                <li>
                  <strong>アプリケーション層</strong>
                  ：ユースケースのフロー制御・サービス間調整・トランザクション境界
                </li>
              </ul>
            </div>
            <div className="comp-col bad">
              <h4>
                <IconX size={16} /> 置いてはいけない場所
              </h4>
              <ul>
                <li>
                  <strong>コントローラー</strong>：HTTP の詳細のみを扱う場所。計算ロジックを書かない
                </li>
                <li>
                  <strong>DB（ストアドプロシージャ）</strong>
                  ：テストが困難になり、ビジネスロジックがバラバラになる
                </li>
                <li>
                  <strong>テンプレート・ビュー</strong>
                  ：表示ロジックのみ。計算や判断をここに書かない
                </li>
              </ul>
            </div>
          </div>

          <h3 className="subsection-title">ドメインモデルの実装例（リッチドメインモデル）</h3>

          <p>
            リッチドメインモデル（＝ビジネスロジックをエンティティ自身が持つパターン）の実装例です。
            <code>Order</code> クラスがビジネスルールを自分で守ります。
          </p>

          <div className="cd">
            <pre
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static HTML block
              dangerouslySetInnerHTML={{
                __html: `<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass, field
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal
<span class="kw">from</span> enum <span class="kw">import</span> Enum

<span class="cm"># 値オブジェクト：金額をただの数値でなく「意味のある型」として表現</span>
@dataclass(frozen=True)  <span class="cm"># frozen=True でイミュータブル（変更不可）にする</span>
<span class="kw">class</span> <span class="cls">Money</span>:
    amount:   Decimal
    currency: str = <span class="st">"JPY"</span>

    <span class="kw">def</span> <span class="fn">__post_init__</span>(self):
        <span class="cm"># 初期化時にビジネスルール（金額は0以上）を強制する</span>
        <span class="kw">if</span> self.amount &lt; <span class="nu">0</span>:
            <span class="kw">raise</span> ValueError(<span class="st">f"金額は0以上でなければなりません: {self.amount}"</span>)

    <span class="kw">def</span> <span class="fn">__add__</span>(self, other: <span class="st">"Money"</span>) -&gt; <span class="st">"Money"</span>:
        <span class="cm"># 通学が異なる加算を防ぐ（型で守るビジネスルール）</span>
        <span class="kw">if</span> self.currency != other.currency:
            <span class="kw">raise</span> ValueError(<span class="st">f"通貨が一致しません: {self.currency} vs {other.currency}"</span>)
        <span class="kw">return</span> Money(self.amount + other.amount, self.currency)

<span class="cm"># エンティティ：注文（ビジネスロジックを自分で持つ）</span>
@dataclass
<span class="kw">class</span> <span class="cls">Order</span>:
    id:          str
    customer_id: str
    _status:     OrderStatus = OrderStatus.PENDING

    @classmethod
    <span class="kw">def</span> <span class="fn">create</span>(cls, customer_id: str) -&gt; <span class="st">"Order"</span>:
        <span class="kw">return</span> cls(id=str(uuid.uuid4()), customer_id=customer_id)

    <span class="kw">def</span> <span class="fn">confirm</span>(self) -&gt; None:
        <span class="cm"># 確定できる状態かをエンティティ自身がチェックする</span>
        <span class="kw">if</span> self._status != OrderStatus.PENDING:
            <span class="kw">raise</span> ValueError(<span class="st">"保留中の注文のみ確定できます"</span>)
        <span class="kw">if not</span> self._items:
            <span class="kw">raise</span> ValueError(<span class="st">"商品が1件もありません"</span>)
        self._status = OrderStatus.CONFIRMED

    <span class="kw">def</span> <span class="fn">cancel</span>(self, reason: str = <span class="st">""</span>) -&gt; None:
        <span class="cm"># 発送済み・配達済みはキャンセル不可というビジネスルールをここで守る</span>
        <span class="kw">if</span> self._status <span class="kw">in</span> (OrderStatus.SHIPPED, OrderStatus.DELIVERED):
            <span class="kw">raise</span> ValueError(<span class="st">"発送済み・配達済みの注文はキャンセルできません"</span>)`,
              }}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Martin Fowler — Repository Pattern</div>
                <Ext href="https://martinfowler.com/eaaCatalog/repository.html">
                  https://martinfowler.com/eaaCatalog/repository.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Domain-Driven Design — Eric Evans（書籍）</div>
                <Ext href="https://www.oreilly.com/library/view/domain-driven-design-tackling/0321125215/">
                  https://www.oreilly.com/library/view/domain-driven-design-tackling/0321125215/
                </Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 08 */}
        <section className="doc-section section" id="s8">
          <div className="section-header">
            <span className="section-number">08</span>
            <h2 className="section-title">API とルーティング設計</h2>
          </div>

          <p>
            モノリシックアプリケーションの API
            設計は、外部クライアントとアプリケーション内部の橋渡し役です。RESTful
            設計原則に従い、リソース指向の URL 設計を行います。
          </p>

          <h3 className="subsection-title">RESTful エンドポイント設計</h3>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>HTTP メソッド</th>
                  <th>URL</th>
                  <th>操作</th>
                  <th>レスポンス</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="tag tag-teal">GET</span>
                  </td>
                  <td>
                    <code>/api/v1/orders</code>
                  </td>
                  <td>注文一覧取得</td>
                  <td>200 OK + ページネーション</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-purple">POST</span>
                  </td>
                  <td>
                    <code>/api/v1/orders</code>
                  </td>
                  <td>注文作成</td>
                  <td>201 Created</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-teal">GET</span>
                  </td>
                  <td>
                    <code>/api/v1/orders/{"{id}"}</code>
                  </td>
                  <td>注文詳細取得</td>
                  <td>200 OK / 404</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-coral">PATCH</span>
                  </td>
                  <td>
                    <code>/api/v1/orders/{"{id}"}</code>
                  </td>
                  <td>注文部分更新</td>
                  <td>200 OK</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-pink">DELETE</span>
                  </td>
                  <td>
                    <code>/api/v1/orders/{"{id}"}</code>
                  </td>
                  <td>注文削除</td>
                  <td>204 No Content</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="subsection-title">ミドルウェアスタックの処理順序</h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
    REQ["HTTP リクエスト受信"] --> MW1["1 CORS ミドルウェア\\n許可オリジンのチェック"]
    MW1 --> MW2["2 レート制限\\nRate Limiting"]
    MW2 --> MW3["3 認証チェック\\nJWT 検証"]
    MW3 --> MW4["4 リクエストロギング\\nリクエストID生成"]
    MW4 --> MW5["5 バリデーション\\n入力値の検証"]
    MW5 --> MW6["6 ルーターへディスパッチ\\nコントローラー実行"]
    MW6 --> MW7["7 エラーハンドリング\\n統一エラーフォーマット"]
    MW7 --> RES["HTTP レスポンス送信"]`}
            />
          </div>

          <h3 className="subsection-title">FastAPI コントローラー実装例</h3>

          <div className="cd">
            <pre
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static HTML block
              dangerouslySetInnerHTML={{
                __html: `<span class="kw">from</span> fastapi <span class="kw">import</span> APIRouter, Depends, HTTPException, status

router = APIRouter(prefix=<span class="st">"/api/v1/orders"</span>, tags=[<span class="st">"orders"</span>])

@router.post(
    <span class="st">""</span>,
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
<span class="kw">async def</span> <span class="fn">create_order</span>(
    request:      CreateOrderRequest,
    use_case:     PlaceOrderUseCase = Depends(get_place_order_use_case),
    current_user: CurrentUser       = Depends(get_current_user),
) -&gt; OrderResponse:
    <span class="st">"""
    コントローラーは HTTP の詳細（リクエスト受取・レスポンス整形）のみを担当。
    ビジネスロジックはユースケースクラスに完全委譲する。
    """</span>
    <span class="kw">try</span>:
        result = <span class="kw">await</span> use_case.execute(
            customer_id=current_user.user_id,
            items=[{<span class="st">"product_id"</span>: i.product_id, <span class="st">"quantity"</span>: i.quantity} <span class="kw">for</span> i <span class="kw">in</span> request.items],
        )
        <span class="kw">return</span> OrderResponse(**result)

    <span class="kw">except</span> ValueError <span class="kw">as</span> e:
        <span class="cm"># ビジネスルール違反は 422 で返す（500 ではない）</span>
        <span class="kw">raise</span> HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={<span class="st">"code"</span>: <span class="st">"BUSINESS_RULE_VIOLATION"</span>, <span class="st">"message"</span>: str(e)},
        )`,
              }}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">FastAPI 公式ドキュメント</div>
                <Ext href="https://fastapi.tiangolo.com/">https://fastapi.tiangolo.com/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Pydantic（バリデーション）</div>
                <Ext href="https://docs.pydantic.dev/">https://docs.pydantic.dev/</Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 09 */}
        <section className="doc-section section" id="s9">
          <div className="section-header">
            <span className="section-number">09</span>
            <h2 className="section-title">認証・認可の実装</h2>
          </div>

          <p>
            モノリシックアプリケーションの認証（＝あなたは誰か）と認可（＝あなたは何をしてよいか）の実装は、すべての
            API で共通のミドルウェアとして適用します。
          </p>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`sequenceDiagram
    participant USER as ユーザー
    participant APP as モノリスアプリ
    participant JWT_SVC as JWT サービス
    participant USER_DB as ユーザー DB
    participant REDIS_S as Redis（セッションストア）
    Note over USER,REDIS_S: ログインフロー
    USER->>APP: POST /auth/login { email, password }
    APP->>USER_DB: ユーザー取得・パスワード検証
    USER_DB-->>APP: ユーザー情報
    APP->>JWT_SVC: JWT トークン生成
    JWT_SVC-->>APP: access_token（15分）+ refresh_token（7日）
    APP->>REDIS_S: refresh_token を保存
    APP-->>USER: トークン返却
    Note over USER,REDIS_S: 認証が必要な API アクセス
    USER->>APP: GET /api/v1/orders Authorization: Bearer {access_token}
    APP->>JWT_SVC: 署名・有効期限チェック
    JWT_SVC-->>APP: ペイロード（user_id, roles）
    APP-->>USER: 200 OK + データ`}
            />
          </div>

          <h3 className="subsection-title">JWT 認証の実装例</h3>

          <div className="cd">
            <pre
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static HTML block
              dangerouslySetInnerHTML={{
                __html: `<span class="kw">import</span> jwt, bcrypt
<span class="kw">from</span> datetime <span class="kw">import</span> datetime, timedelta, timezone
<span class="kw">import</span> os

<span class="kw">class</span> <span class="cls">JWTService</span>:
  <span class="cm"># シークレットキーは必ず環境変数から取得する（コードにハードコードしない）</span>
  SECRET_KEY     = os.environ[<span class="st">"JWT_SECRET_KEY"</span>]
  ALGORITHM      = <span class="st">"HS256"</span>
  ACCESS_EXPIRE  = timedelta(minutes=<span class="nu">15</span>)   <span class="cm"># 短い有効期限でリスクを最小化</span>
  REFRESH_EXPIRE = timedelta(days=<span class="nu">7</span>)

  @classmethod
  <span class="kw">def</span> <span class="fn">create_access_token</span>(cls, user_id: str, roles: list[str]) -&gt; str:
    now = datetime.now(timezone.utc)
    payload = {
      <span class="st">"sub"</span>:   user_id,
      <span class="st">"roles"</span>: roles,
      <span class="st">"iat"</span>:   now,
      <span class="st">"exp"</span>:   now + cls.ACCESS_EXPIRE,
    }
    <span class="kw">return</span> jwt.encode(payload, cls.SECRET_KEY, algorithm=cls.ALGORITHM)

<span class="kw">class</span> <span class="cls">PasswordHasher</span>:
  @staticmethod
  <span class="kw">def</span> <span class="fn">hash</span>(plain_password: str) -&gt; str:
    <span class="cm"># bcrypt を使う。コストファクター 12 が推奨（高いほど安全だが遅くなる）</span>
    <span class="kw">return</span> bcrypt.hashpw(
      plain_password.encode(<span class="st">"utf-8"</span>),
      bcrypt.gensalt(rounds=<span class="nu">12</span>),
    ).decode(<span class="st">"utf-8"</span>)

<span class="cm"># ロールベースアクセス制御（RBAC）の依存性注入</span>
<span class="kw">def</span> <span class="fn">require_roles</span>(*roles: Role):
  <span class="kw">def</span> <span class="fn">dependency</span>(current_user: CurrentUser = Depends(get_current_user)):
    <span class="cm"># いずれかのロールを持っていれば許可（OR 条件）</span>
    <span class="kw">if not</span> any(current_user.has_role(role) <span class="kw">for</span> role <span class="kw">in</span> roles):
      <span class="kw">raise</span> HTTPException(status_code=<span class="nu">403</span>, detail=<span class="st">"権限が不足しています"</span>)
    <span class="kw">return</span> current_user
  <span class="kw">return</span> dependency`,
              }}
            />
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>項目</th>
                  <th>ベストプラクティス</th>
                  <th>理由</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>シークレットキー</td>
                  <td>環境変数から取得</td>
                  <td>コードに埋め込むと Git 経由で漏洩するリスクがある</td>
                </tr>
                <tr>
                  <td>access_token 有効期限</td>
                  <td>15 分</td>
                  <td>漏洩時の被害を最小化できる</td>
                </tr>
                <tr>
                  <td>パスワードハッシュ</td>
                  <td>bcrypt（コスト 12）</td>
                  <td>ブルートフォース攻撃への耐性が高い</td>
                </tr>
                <tr>
                  <td>refresh_token の保存</td>
                  <td>Redis（サーバーサイド）</td>
                  <td>即座に無効化できる（ログアウト対応）</td>
                </tr>
                <tr>
                  <td>認可</td>
                  <td>ロールベース（RBAC）</td>
                  <td>きめ細かなアクセス制御が可能</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">JWT 公式サイト（jwt.io）</div>
                <Ext href="https://jwt.io/">https://jwt.io/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">OWASP — Authentication Cheat Sheet</div>
                <Ext href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html">
                  https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
                </Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 10 */}
        <section className="doc-section section" id="s10">
          <div className="section-header">
            <span className="section-number">10</span>
            <h2 className="section-title">テスト戦略</h2>
          </div>

          <p>
            テストはコードの品質保証の核心です。「テストがないコードは変更するのが怖い」というのはソフトウェア工学の格言です。モノリスのテストは、テストピラミッドという考え方に基づいて設計します。
          </p>

          <h3 className="subsection-title">テストピラミッド</h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TD
    E2E_T["E2E テスト（少数）\\n実際のブラウザ・HTTP 通信で検証\\nツール：Playwright / Selenium\\n実行時間：数分\\n目標：重要な 5〜10 シナリオのみ"]
    INT_T["統合テスト（中程度）\\nDB やキャッシュを含めた検証\\nツール：pytest + TestContainers\\n実行時間：数十秒"]
    UNIT_T["ユニットテスト（多数・大量）\\nドメインロジック・ビジネスルール\\nツール：pytest（DB 不要）\\n実行時間：ミリ秒\\n目標：90% 以上のカバレッジ"]
    UNIT_T --> INT_T --> E2E_T`}
            />
          </div>

          <div className="card-grid-3">
            <div className="card">
              <h4>
                <IconCheck size={20} color="var(--c-teal-500)" /> ユニットテスト
              </h4>
              <p>
                DB なしで純粋なビジネスロジックをテスト。最も速く、最も多く書く。カバレッジ 90%
                以上を目標にする。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconArrowsExchange size={20} color="var(--c-purple-500)" /> 統合テスト
              </h4>
              <p>
                TestContainers で実際の DB を起動してリポジトリをテスト。API
                エンドポイントのシナリオ検証も含む。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconEye size={20} color="var(--c-coral-500)" /> E2E テスト
              </h4>
              <p>
                実際のブラウザで重要なビジネスシナリオ（登録→注文→決済）を検証。数件のみ作成する。
              </p>
            </div>
          </div>

          <h3 className="subsection-title">テスト実装例（pytest）</h3>

          <div className="cd">
            <pre
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static HTML block
              dangerouslySetInnerHTML={{
                __html: `<span class="kw">import</span> pytest
<span class="kw">from</span> decimal <span class="kw">import</span> Decimal
<span class="kw">from</span> domain.entities.order <span class="kw">import</span> Order, OrderStatus
<span class="kw">from</span> domain.value_objects.money <span class="kw">import</span> Money

<span class="kw">class</span> <span class="cls">TestOrder</span>:
    <span class="st">"""注文エンティティのユニットテスト（DB 不要・高速）"""</span>

    <span class="kw">def</span> <span class="fn">test_注文作成時は保留中ステータスになる</span>(self):
        order = Order.create(customer_id=<span class="st">"cust_001"</span>)
        <span class="kw">assert</span> order.status == OrderStatus.PENDING

    <span class="kw">def</span> <span class="fn">test_確定後は商品を追加できない</span>(self):
        order = Order.create(customer_id=<span class="st">"cust_001"</span>)
        order.add_item(<span class="st">"prod_001"</span>, <span class="st">"Tシャツ"</span>, Money(Decimal(<span class="st">"1000"</span>)), <span class="nu">1</span>)
        order.confirm()

        <span class="cm"># 確定済みへの変更を試みると ValueError が発生することを確認</span>
        <span class="kw">with</span> pytest.raises(ValueError, match=<span class="st">"確定済みの注文は変更できません"</span>):
            order.add_item(<span class="st">"prod_002"</span>, <span class="st">"ジーンズ"</span>, Money(Decimal(<span class="st">"5000"</span>)), <span class="nu">1</span>)

    <span class="kw">def</span> <span class="fn">test_注文確定時にドメインイベントが発行される</span>(self):
        order = Order.create(customer_id=<span class="st">"cust_001"</span>)
        order.add_item(<span class="st">"prod_001"</span>, <span class="st">"Tシャツ"</span>, Money(Decimal(<span class="st">"1000"</span>)), <span class="nu">1</span>)
        order.confirm()

        events = order.domain_events
        <span class="kw">assert</span> len(events) == <span class="nu">1</span>
        <span class="kw">assert</span> events[<span class="nu">0</span>][<span class="st">"type"</span>] == <span class="st">"OrderConfirmed"</span>

<span class="cm"># 統合テスト：TestContainers で実際の DB を起動</span>
@pytest.fixture(scope=<span class="st">"session"</span>)
<span class="kw">def</span> <span class="fn">postgres_container</span>():
    <span class="kw">with</span> PostgresContainer(<span class="st">"postgres:16-alpine"</span>) <span class="kw">as</span> pg:
        <span class="kw">yield</span> pg

@pytest.fixture
<span class="kw">def</span> <span class="fn">db_session</span>(db_engine):
    <span class="cm"># 各テスト後にロールバックすることで、テスト間の独立性を保証する</span>
    connection = db_engine.connect()
    transaction = connection.begin()
    session = sessionmaker(bind=connection)()
    <span class="kw">yield</span> session
    session.close()
    transaction.rollback()  <span class="cm"># テストデータを残さない</span>`,
              }}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">pytest 公式ドキュメント</div>
                <Ext href="https://docs.pytest.org/">https://docs.pytest.org/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">TestContainers（統合テスト）</div>
                <Ext href="https://testcontainers.com/guides/getting-started-with-testcontainers-for-python/">
                  https://testcontainers.com/guides/getting-started-with-testcontainers-for-python/
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Playwright（E2E テスト）</div>
                <Ext href="https://playwright.dev/python/">https://playwright.dev/python/</Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 11 */}
        <section className="doc-section section" id="s11">
          <div className="section-header">
            <span className="section-number">11</span>
            <h2 className="section-title">スケーリング戦略</h2>
          </div>

          <p>
            モノリスは「スケールできない」という誤解がありますが、適切な戦略を使えば大規模システムでも十分に対応できます。スケーリングは必要に応じて段階的に行います。
          </p>

          <div className="scaling-grid">
            <div className="scaling-card">
              <h4>
                <IconArrowUp size={20} color="var(--c-teal-500)" /> 垂直スケーリング
              </h4>
              <p>
                サーバーの
                CPU・メモリを増強する最もシンプルな方法。まずここから始める。上限があるためいずれ限界に達する。
              </p>
            </div>
            <div className="scaling-card">
              <h4>
                <IconArrowsHorizontal size={20} color="var(--c-purple-500)" /> 水平スケーリング
              </h4>
              <p>
                同一アプリを複数インスタンスで起動してロードバランサーで分散する。ステートレス設計（セッションを外に持つ）が前提条件。
              </p>
            </div>
            <div className="scaling-card">
              <h4>
                <IconBolt size={20} color="var(--c-coral-500)" /> Redis キャッシュ
              </h4>
              <p>
                頻繁に読まれるデータを Redis にキャッシュして DB
                負荷を削減する。セッション管理にも使用してインスタンス間で共有する。
              </p>
            </div>
            <div className="scaling-card">
              <h4>
                <IconDatabaseExport size={20} color="var(--c-pink-500)" /> 読み取りレプリカ
              </h4>
              <p>
                DB のリードレプリカを追加して SELECT クエリを振り分ける。読み取り比率が 70%
                以上の場合に特に効果的。
              </p>
            </div>
            <div className="scaling-card">
              <h4>
                <IconBrandCloudflare size={20} color="var(--c-teal-500)" /> CDN 配信
              </h4>
              <p>
                静的ファイル・画像を CDN
                から配信してオリジンサーバーの負荷を軽減する。グローバルなレイテンシも改善される。
              </p>
            </div>
            <div className="scaling-card">
              <h4>
                <IconClockPlay size={20} color="var(--c-purple-500)" /> 非同期処理
              </h4>
              <p>
                メール送信・レポート生成などの重い処理を Celery
                などのジョブキューに移す。レスポンスタイムが劇的に改善する。
              </p>
            </div>
          </div>

          <h3 className="subsection-title">水平スケーリングの構成</h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TD
    INTERNET["インターネット"] --> LB["ロードバランサー\\nNginx / AWS ALB"]
    subgraph APP_INSTANCES["アプリケーションインスタンス（ステートレス）"]
        APP1["App Instance 1"]
        APP2["App Instance 2"]
        APP3["App Instance 3"]
    end
    LB --> APP1
    LB --> APP2
    LB --> APP3
    APP1 & APP2 & APP3 -->|"書き込み"| PG_PRIMARY["PostgreSQL Primary"]
    APP1 & APP2 & APP3 -->|"読み取り"| PG_REPLICA["PostgreSQL Replica"]
    APP1 & APP2 & APP3 --> REDIS_CLUSTER["Redis Cluster\\nセッション・キャッシュ"]
    APP1 & APP2 & APP3 --> S3["S3 共有ストレージ"]
    PG_PRIMARY -->|"レプリケーション"| PG_REPLICA`}
            />
          </div>

          <div className="callout info">
            <span className="callout-icon">
              <IconBulb size={16} color="var(--color-text-info)" />
            </span>
            <div>
              <strong>ステートレス設計の 3 つのポイント</strong>
              <br />
              水平スケーリングには、アプリケーションインスタンスが「状態を持たない（ステートレス）」設計が必須です。①
              セッションは Redis に保存（サーバーローカルに保存しない）、② ファイルアップロードは S3
              等の共有ストレージへ、③ ローカルキャッシュより Redis などの分散キャッシュを使う。
            </div>
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Redis 公式ドキュメント</div>
                <Ext href="https://redis.io/docs/">https://redis.io/docs/</Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 12 */}
        <section className="doc-section section" id="s12">
          <div className="section-header">
            <span className="section-number">12</span>
            <h2 className="section-title">CI/CD とデプロイ戦略</h2>
          </div>

          <p>
            CI/CD（継続的インテグレーション・継続的デリバリー）は、コードの変更を安全・高速に本番環境に届けるための仕組みです。モノリスは単一コードベースなので、CI/CD
            の設計がシンプルで始めやすいのも利点です。
          </p>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
    subgraph CI["継続的インテグレーション"]
        PUSH["git push / PR 作成"] --> LINT["コード品質チェック\\nruff / mypy"]
        LINT --> UNIT_CI["ユニットテスト\\n高速・並列実行"]
        UNIT_CI --> INT_CI["統合テスト\\nTestContainers"]
        INT_CI --> COVERAGE["カバレッジチェック\\n80% 以上を維持"]
        COVERAGE --> BUILD["Docker イメージビルド"]
        BUILD --> SECURITY["セキュリティスキャン\\n依存関係の脆弱性"]
        SECURITY --> PUSH_IMG["イメージプッシュ\\nContainer Registry"]
    end
    subgraph CD["継続的デリバリー"]
        DEPLOY_STG["ステージング環境デプロイ"] --> SMOKE["スモークテスト\\n基本動作確認"]
        SMOKE --> E2E_CD["E2E テスト実行"]
        E2E_CD --> APPROVE["本番デプロイ承認"]
        APPROVE --> DB_MIGRATE["DB マイグレーション実行"]
        DB_MIGRATE --> BLUE_GREEN["ブルーグリーンデプロイ\\nまたは Rolling Update"]
        BLUE_GREEN --> HEALTH_CHECK["ヘルスチェック確認"]
        HEALTH_CHECK -->|"問題あり"| ROLLBACK["自動ロールバック"]
    end
    PUSH_IMG --> DEPLOY_STG`}
            />
          </div>

          <h3 className="subsection-title">
            Dockerfile ベストプラクティス（マルチステージビルド）
          </h3>

          <div className="cd">
            <pre
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static HTML block
              dangerouslySetInnerHTML={{
                __html: `<span class="cm"># Stage 1: 依存関係インストール</span>
<span class="kw">FROM</span> python:3.12-slim <span class="cls">AS</span> dependencies
WORKDIR /app
<span class="cm"># 依存関係ファイルを先にコピー（コードが変わってもキャッシュを活用できる）</span>
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

<span class="cm"># Stage 2: 本番イメージ（最小サイズ）</span>
<span class="kw">FROM</span> python:3.12-slim <span class="cls">AS</span> runtime
<span class="cm"># セキュリティ：非 root ユーザーで実行する</span>
RUN groupadd --system appgroup && useradd --system --gid appgroup appuser
WORKDIR /app
COPY --from=dependencies /root/.local /home/appuser/.local
COPY --chown=appuser:appgroup . .
USER appuser

<span class="cm"># ヘルスチェック：コンテナの死活監視に使われる</span>
HEALTHCHECK --interval=30s --timeout=10s CMD \\
    python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

CMD [<span class="st">"gunicorn"</span>, <span class="st">"main:app"</span>, <span class="st">"--workers"</span>, <span class="st">"4"</span>, \\
     <span class="st">"--worker-class"</span>, <span class="st">"uvicorn.workers.UvicornWorker"</span>, \\
     <span class="st">"--bind"</span>, <span class="st">"0.0.0.0:8000"</span>]`,
              }}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Docker Best Practices</div>
                <Ext href="https://docs.docker.com/develop/develop-images/dockerfile_best-practices/">
                  https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Gunicorn 設定ガイド</div>
                <Ext href="https://docs.gunicorn.org/">https://docs.gunicorn.org/</Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 13 */}
        <section className="doc-section section" id="s13">
          <div className="section-header">
            <span className="section-number">13</span>
            <h2 className="section-title">監視・ロギング</h2>
          </div>

          <p>
            監視とロギングは「本番環境で何が起きているか」を把握するための仕組みです。モノリスは単一プロセスなので、分散システムより監視が容易です。
          </p>

          <h3 className="subsection-title">オブザーバビリティの 3 本柱</h3>

          <div className="card-grid-3">
            <div className="card">
              <h4>
                <IconChartLine size={20} color="var(--c-teal-500)" /> メトリクス
              </h4>
              <p>
                Prometheus + Grafana。RPS・P95 レスポンスタイム・エラーレート・CPU /
                メモリ使用率を継続的に計測する。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconNotes size={20} color="var(--c-purple-500)" /> ログ
              </h4>
              <p>
                構造化ログ（JSON 形式）で出力する。リクエスト ID を付与して追跡可能にする。ELK Stack
                や Loki + Grafana で集中管理。
              </p>
            </div>
            <div className="card">
              <h4>
                <IconTopologyRing size={20} color="var(--c-coral-500)" /> トレース
              </h4>
              <p>
                Jaeger / OpenTelemetry でリクエストの処理経路を可視化する。DB
                クエリの実行時間を含め、ボトルネックを特定できる。
              </p>
            </div>
          </div>

          <h3 className="subsection-title">アラート設定の目安</h3>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>アラート条件</th>
                  <th>閾値</th>
                  <th>対応</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>レスポンスタイム P99</td>
                  <td>&gt; 1 秒</td>
                  <td>DB クエリの最適化・キャッシュ追加を検討</td>
                </tr>
                <tr>
                  <td>エラーレート</td>
                  <td>&gt; 1%</td>
                  <td>ログを確認してエラー原因を特定する</td>
                </tr>
                <tr>
                  <td>CPU 使用率</td>
                  <td>&gt; 80%（5 分継続）</td>
                  <td>スケールアウトまたはコード最適化</td>
                </tr>
                <tr>
                  <td>DB コネクション数</td>
                  <td>&gt; 80%</td>
                  <td>コネクションプールの調整またはインスタンス増強</td>
                </tr>
                <tr>
                  <td>ディスク使用率</td>
                  <td>&gt; 85%</td>
                  <td>ログローテーション・ストレージ拡張</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="subsection-title">構造化ロギング実装例</h3>

          <div className="cd">
            <pre
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static HTML block
              dangerouslySetInnerHTML={{
                __html: `<span class="kw">import</span> structlog, time, uuid

<span class="kw">class</span> <span class="cls">RequestLoggingMiddleware</span>(BaseHTTPMiddleware):
    <span class="kw">async def</span> <span class="fn">dispatch</span>(self, request: Request, call_next) -&gt; Response:
        request_id = str(uuid.uuid4())  <span class="cm"># 追跡のためのリクエスト ID</span>
        start_time = time.perf_counter()

        <span class="cm"># コンテキスト変数に設定しておくとすべてのログに自動付与される</span>
        structlog.contextvars.bind_contextvars(
            request_id=request_id,
            method=request.method,
            path=request.url.path,
        )
        logger.info(<span class="st">"リクエスト受信"</span>)

        response  = <span class="kw">await</span> call_next(request)
        elapsed_ms = (time.perf_counter() - start_time) * <span class="nu">1000</span>

        logger.info(<span class="st">"レスポンス送信"</span>,
            status_code=response.status_code,
            elapsed_ms=round(elapsed_ms, <span class="nu">2</span>),
        )
        response.headers[<span class="st">"X-Request-ID"</span>] = request_id  <span class="cm"># クライアントに ID を返す</span>
        <span class="kw">return</span> response`,
              }}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">OpenTelemetry 公式</div>
                <Ext href="https://opentelemetry.io/">https://opentelemetry.io/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Prometheus 公式</div>
                <Ext href="https://prometheus.io/docs/">https://prometheus.io/docs/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">structlog（構造化ロギング）</div>
                <Ext href="https://www.structlog.org/">https://www.structlog.org/</Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 14 */}
        <section className="doc-section section" id="s14">
          <div className="section-header">
            <span className="section-number">14</span>
            <h2 className="section-title">実践：EC サイト完全実装例</h2>
          </div>

          <p>
            これまで学んだ知識を EC サイトの例で統合します。モノリシックアーキテクチャで EC
            サイトを構築する場合の全体図と、注文処理の完全なフローを確認しましょう。
          </p>

          <h3 className="subsection-title">EC サイト全体アーキテクチャ</h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`graph TD
    BROWSER["ブラウザ"] & MOBILE["モバイルアプリ"] --> CDN_EC["CDN\\n静的ファイル配信"]
    BROWSER & MOBILE --> LB_EC["ロードバランサー"]
    LB_EC --> EC_MONO

    subgraph EC_MONO["EC サイト モノリシックアプリ"]
        subgraph PRES_EC["プレゼンテーション層"]
            PRODUCT_CTRL["商品コントローラー"]
            ORDER_CTRL["注文コントローラー"]
            USER_CTRL["ユーザーコントローラー"]
            CART_CTRL["カートコントローラー"]
        end
        subgraph BUSI_EC["ビジネスロジック層（モジュール）"]
            PRODUCT_MOD["商品モジュール\\nカタログ管理・検索"]
            ORDER_MOD["注文モジュール\\n注文処理・履歴"]
            USER_MOD["ユーザーモジュール\\n会員管理"]
            PAYMENT_MOD["決済モジュール"]
            INVENTORY_MOD["在庫モジュール"]
            NOTIFY_MOD["通知モジュール"]
        end
    end

    PRES_EC --> BUSI_EC
    BUSI_EC --> PG_EC[("PostgreSQL")]
    BUSI_EC --> REDIS_EC["Redis キャッシュ"]
    BUSI_EC --> S3_EC["S3 商品画像"]
    BUSI_EC --> ES_EC["Elasticsearch\\n商品検索"]`}
            />
          </div>

          <h3 className="subsection-title">注文処理の完全フロー</h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`sequenceDiagram
    participant BROWSER as ブラウザ
    participant CTRL as 注文コントローラー
    participant USE_CASE as 注文作成ユースケース
    participant INVENTORY2 as 在庫モジュール
    participant ORDER_DOM2 as 注文ドメイン
    participant PAYMENT2 as 決済モジュール
    participant DB2 as PostgreSQL
    participant EVENTS2 as イベントバス
    participant NOTIFY2 as 通知モジュール
    BROWSER->>CTRL: POST /api/v1/orders/checkout
    CTRL->>CTRL: JWT 検証・リクエストバリデーション
    CTRL->>USE_CASE: execute(checkout_command)
    USE_CASE->>INVENTORY2: check_and_reserve_stock(items)
    INVENTORY2->>DB2: 在庫確認（SELECT FOR UPDATE）
    DB2-->>INVENTORY2: 在庫 OK
    INVENTORY2->>DB2: 在庫引き当て（UPDATE）
    USE_CASE->>ORDER_DOM2: Order.create(customer_id, items)
    ORDER_DOM2->>ORDER_DOM2: ビジネスルール・価格計算
    USE_CASE->>DB2: BEGIN TRANSACTION
    USE_CASE->>DB2: INSERT INTO orders + order_items
    USE_CASE->>PAYMENT2: process_payment(order, payment_info)
    PAYMENT2-->>USE_CASE: 決済成功
    USE_CASE->>DB2: UPDATE orders SET status = confirmed
    USE_CASE->>DB2: COMMIT TRANSACTION
    USE_CASE->>EVENTS2: publish("order.placed")
    EVENTS2--)NOTIFY2: order.placed イベント受信
    NOTIFY2--)BROWSER: 注文確認メール送信
    USE_CASE-->>CTRL: OrderResult
    CTRL-->>BROWSER: HTTP 201 Created`}
            />
          </div>

          <div className="callout success">
            <span className="callout-icon">
              <IconCheck size={16} color="var(--color-text-success)" />
            </span>
            <div>
              <strong>モノリスだからこそ実現できること</strong>
              <br />
              注文→在庫引き当て→決済→通知の一連のフローを、単一のデータベーストランザクションで囲めることがモノリスの最大の強みです。マイクロサービスでは分散トランザクション（Saga
              パターンなど）が必要になり、実装が格段に複雑になります。
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 15 */}
        <section className="doc-section section" id="s15">
          <div className="section-header">
            <span className="section-number">15</span>
            <h2 className="section-title">マイクロサービスへの段階的移行</h2>
          </div>

          <p>
            モノリスからマイクロサービスへの移行は「必要になったときに、段階的に」行うものです。移行の必要性を判断するフローと、安全な移行パターンを紹介します。
          </p>

          <h3 className="subsection-title">移行判断のフロー</h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
    START["モノリスの課題が発生している"] --> Q1{"開発チームが\\n5人以上になったか？"}
    Q1 -->|"No"| STAY["モノリスを最適化\\nモジュラーモノリスへ再設計"]
    Q1 -->|"Yes"| Q2{"デプロイ頻度が\\n週1回以上必要か？"}
    Q2 -->|"No"| MODULAR["モジュラーモノリスへ移行\\nコード境界を明確化"]
    Q2 -->|"Yes"| Q3{"特定機能が\\nスケールボトルネックか？"}
    Q3 -->|"No"| MODULAR
    Q3 -->|"Yes"| EXTRACT["一部機能をマイクロサービス化\\nStrangler Fig パターンを使う"]`}
            />
          </div>

          <h3 className="subsection-title">Strangler Fig パターン（安全な段階的移行）</h3>

          <p>
            Strangler
            Fig（絞め殺しのイチジク）パターンは、モノリスを徐々に置き換えていく移行パターンです。いきなり全機能を移行せず、一部の機能から段階的に切り出します。
          </p>

          <div className="phase-timeline">
            <div className="phase-item phase-1">
              <div className="phase-badge">P1</div>
              <div>
                <h4>Phase 1：モノリスをモジュラー化する</h4>
                <p>
                  先にモジュール境界を明確にします。これをしないと、マイクロサービスに分割したとき依存が複雑で失敗します。
                </p>
              </div>
            </div>
            <div className="phase-item phase-2">
              <div className="phase-badge">P2</div>
              <div>
                <h4>Phase 2：最初の 1 サービスを切り出す（通知など）</h4>
                <p>
                  最も独立性が高く、他モジュールへの影響が少ない機能から始めます。通知・メール送信・レポート生成がよい候補です。
                </p>
              </div>
            </div>
            <div className="phase-item phase-3">
              <div className="phase-badge">P3</div>
              <div>
                <h4>Phase 3：API ゲートウェイを導入する</h4>
                <p>
                  クライアントはゲートウェイだけを知り、背後でモノリスと各マイクロサービスに振り分けます。移行中も既存クライアントは変更不要です。
                </p>
              </div>
            </div>
            <div className="phase-item phase-4">
              <div className="phase-badge">P4</div>
              <div>
                <h4>Phase 4：段階的に移行を続ける</h4>
                <p>
                  高負荷・独立性が高い機能から順に切り出します。モノリスのコアが残っても問題ありません。無理に全部分割する必要はありません。
                </p>
              </div>
            </div>
          </div>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart LR
    subgraph PHASE1["Phase 1: モノリス"]
        MONO1["モノリス\\n全機能"]
    end
    subgraph PHASE2["Phase 2: 通知を切り出す"]
        PROXY1["API ゲートウェイ"] --> MONO2["モノリス\\n通知以外"]
        PROXY1 --> NOTIFY_MS["通知\\nマイクロサービス"]
    end
    subgraph PHASE3["Phase 3: 検索も切り出す"]
        PROXY2["API ゲートウェイ"] --> MONO3["モノリス\\nコア機能"]
        PROXY2 --> NOTIFY_MS2["通知\\nサービス"]
        PROXY2 --> SEARCH_MS["検索\\nサービス"]
    end
    PHASE1 --> PHASE2 --> PHASE3`}
            />
          </div>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Sam Newman — Strangler Fig Application</div>
                <Ext href="https://martinfowler.com/bliki/StranglerFigApplication.html">
                  https://martinfowler.com/bliki/StranglerFigApplication.html
                </Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 16 */}
        <section className="doc-section section" id="s16">
          <div className="section-header">
            <span className="section-number">16</span>
            <h2 className="section-title">ベストプラクティス総まとめ</h2>
          </div>

          <h3 className="subsection-title">設計フェーズのベストプラクティス</h3>

          <div className="table-wrap">
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
                  <td>
                    <span className="tag tag-teal">構造</span>
                  </td>
                  <td>モジュラーモノリスを選択する</td>
                  <td>将来の移行が容易になる</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-purple">依存方向</span>
                  </td>
                  <td>上位層から下位層への一方向依存</td>
                  <td>変更の影響範囲を限定できる</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-coral">ドメイン</span>
                  </td>
                  <td>公開インターフェース経由で通信</td>
                  <td>疎結合を保ち拡張しやすい</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-pink">DB 設計</span>
                  </td>
                  <td>スキーマ分離でモジュール境界を明確化</td>
                  <td>将来の DB 分割が容易になる</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-teal">ロジック</span>
                  </td>
                  <td>ドメイン層に集約・フレームワーク非依存</td>
                  <td>テストが容易・移植性が高い</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-purple">設定</span>
                  </td>
                  <td>環境変数で外部注入（12-Factor App）</td>
                  <td>環境差異を最小化できる</td>
                </tr>
                <tr>
                  <td>
                    <span className="tag tag-coral">エラー</span>
                  </td>
                  <td>統一されたエラーレスポンス形式</td>
                  <td>クライアントの実装が一貫する</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="subsection-title">モノリス成熟度モデル</h3>

          <p>
            以下の成熟度モデルは、自分のシステムの現在地を把握するための指標です。焦らず段階的にレベルを上げていくことが重要です。
          </p>

          <div className="maturity-steps">
            <div className="maturity-item maturity-0">
              <span className="maturity-level">Level 0</span>
              <div>
                <h4>スパゲッティモノリス</h4>
                <p>すべてが 1 ファイルに混在。テスト不可・変更が怖い状態。</p>
              </div>
            </div>
            <div className="maturity-item maturity-1">
              <span className="maturity-level">Level 1</span>
              <div>
                <h4>レイヤードモノリス</h4>
                <p>プレゼンテーション・ビジネス・DB を分離。基本的なテストが可能になる。</p>
              </div>
            </div>
            <div className="maturity-item maturity-2">
              <span className="maturity-level">Level 2</span>
              <div>
                <h4>テスタブルモノリス</h4>
                <p>依存性注入・ユニットテスト充実。CI/CD が整備されている。</p>
              </div>
            </div>
            <div className="maturity-item maturity-3">
              <span className="maturity-level">Level 3</span>
              <div>
                <h4>モジュラーモノリス</h4>
                <p>ドメイン境界が明確。モジュール間が疎結合で独立して変更できる。</p>
              </div>
            </div>
            <div className="maturity-item maturity-4">
              <span className="maturity-level">Level 4</span>
              <div>
                <h4>最適化されたモノリス</h4>
                <p>水平スケーリング対応・キャッシュ戦略・監視・ロギングが充実している。</p>
              </div>
            </div>
            <div className="maturity-item maturity-5">
              <span className="maturity-level">Level 5</span>
              <div>
                <h4>マイクロサービス移行準備完了</h4>
                <p>必要に応じて段階的に分離可能。または高品質なモノリスとして維持。</p>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 17 */}
        <section className="doc-section section" id="s17">
          <div className="section-header">
            <span className="section-number">17</span>
            <h2 className="section-title">アンチパターン</h2>
          </div>

          <p>
            アンチパターン（＝よく見られる失敗パターン）を知ることで、同じ間違いを避けられます。以下は特に注意すべき
            5 つのアンチパターンです。
          </p>

          <div className="anti-pattern-item">
            <div className="anti-pattern-header">
              <IconX size={16} /> アンチパターン 1：大きな泥の塊（Big Ball of Mud）
            </div>
            <div className="anti-pattern-body">
              <p style={{ fontSize: "14.5px" }}>
                コード構造がなくすべてが密結合している状態。変更のたびに予期しないバグが発生し、テストも書けない。最初は速く開発できるが、時間とともに保守コストが爆発的に増大する。
              </p>
            </div>
            <div className="anti-pattern-fix">
              <IconCheck size={16} />{" "}
              解決：レイヤードアーキテクチャを採用し、責務を明確に分離する。テストを書きやすい設計から始める。
            </div>
          </div>

          <div className="anti-pattern-item">
            <div className="anti-pattern-header">
              <IconX size={16} /> アンチパターン 2：コントローラーにビジネスロジック
            </div>
            <div className="anti-pattern-body">
              <p style={{ fontSize: "14.5px" }}>
                コントローラーメソッドが 100 行を超え、DB
                操作・計算・メール送信がすべて入っている状態。テストが困難で再利用できない。「Fat
                Controller（太ったコントローラー）」とも呼ばれる。
              </p>
            </div>
            <div className="anti-pattern-fix">
              <IconCheck size={16} />{" "}
              解決：ユースケースクラスを作成してロジックを移す。コントローラーは HTTP
              変換のみを担当する。
            </div>
          </div>

          <div className="anti-pattern-item">
            <div className="anti-pattern-header">
              <IconX size={16} /> アンチパターン 3：神クラス（God Class）
            </div>
            <div className="anti-pattern-body">
              <p style={{ fontSize: "14.5px" }}>
                <code>OrderManager</code>{" "}
                クラスが注文・在庫・決済・通知・配送・顧客をすべて処理している状態。数千行のクラスは変更のたびに恐怖を感じる。単一責任原則の違反の典型。
              </p>
            </div>
            <div className="anti-pattern-fix">
              <IconCheck size={16} />{" "}
              解決：単一責任原則を適用して機能ごとにクラスを分割する。各クラスは 1
              つのことだけを担当する。
            </div>
          </div>

          <div className="anti-pattern-item">
            <div className="anti-pattern-header">
              <IconX size={16} /> アンチパターン 4：コピー&ペーストプログラミング
            </div>
            <div className="anti-pattern-body">
              <p style={{ fontSize: "14.5px" }}>
                同じバリデーションロジックが 10 か所にコピーされている状態。1 か所修正すると他 9
                か所に漏れが発生する。技術的負債（＝将来の変更コストの増大）が急速に蓄積される。
              </p>
            </div>
            <div className="anti-pattern-fix">
              <IconCheck size={16} /> 解決：DRY 原則（Don't Repeat
              Yourself）を適用する。共通ロジックは値オブジェクトや共通クラスに集約する。
            </div>
          </div>

          <div className="anti-pattern-item">
            <div className="anti-pattern-header">
              <IconX size={16} /> アンチパターン 5：分散モノリス
            </div>
            <div className="anti-pattern-body">
              <p style={{ fontSize: "14.5px" }}>
                サービスに分割したのに、デプロイを常に同時にしないと動かない状態。マイクロサービスの複雑さ（ネットワーク遅延・分散トレーシング・サービスディスカバリ）だけを得て、モノリスのシンプルさも失った最悪の形態。
              </p>
            </div>
            <div className="anti-pattern-fix">
              <IconCheck size={16} />{" "}
              解決：潔くモノリスに戻すか、サービス間の依存を徹底的に排除してから再分割する。
            </div>
          </div>

          <h3 className="subsection-title">健全性チェックフロー</h3>

          <div className="mermaid-wrap">
            <MermaidDiagram
              chart={`flowchart TD
    CHECK["モノリスの健全性チェック開始"] --> Q1{"コントローラーが\\n50行以下か？"}
    Q1 -->|"No"| FIX1["ユースケースクラスに\\nロジックを抽出する"]
    Q1 -->|"Yes"| Q2{"ビジネスロジックが\\nドメイン層にあるか？"}
    Q2 -->|"No"| FIX2["ドメインモデルをリッチ化する"]
    Q2 -->|"Yes"| Q3{"DB なしで\\nユニットテストが書けるか？"}
    Q3 -->|"No"| FIX3["依存性注入を導入する"]
    Q3 -->|"Yes"| Q4{"同じロジックが\\n3か所以上にないか？"}
    Q4 -->|"ある"| FIX4["共通クラスに集約する\\nDRY 原則を適用"]
    Q4 -->|"Yes"| HEALTHY["健全なモノリス"]
    style HEALTHY fill:#0d1f18,color:#34d399
    style FIX1 fill:#0e1e35,color:#60a5fa
    style FIX2 fill:#0e1e35,color:#60a5fa
    style FIX3 fill:#0e1e35,color:#60a5fa
    style FIX4 fill:#0e1e35,color:#60a5fa`}
            />
          </div>
        </section>

        <div className="divider" />

        {/* 18 */}
        <section className="doc-section section" id="s18">
          <div className="section-header">
            <span className="section-number">18</span>
            <h2 className="section-title">参考文献・ソース一覧</h2>
          </div>

          <h3 className="subsection-title">必読書籍</h3>

          <div className="table-wrap">
            <table className="book-table">
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
                    <span className="book-title">Clean Architecture</span>
                  </td>
                  <td>Robert C. Martin</td>
                  <td>
                    <span className="difficulty">
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="empty-star">★</span>
                    </span>
                  </td>
                  <td>レイヤードアーキテクチャの決定版。依存性逆転の原則が詳細に解説される。</td>
                </tr>
                <tr>
                  <td>
                    <span className="book-title">Domain-Driven Design</span>
                  </td>
                  <td>Eric Evans</td>
                  <td>
                    <span className="difficulty">
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                    </span>
                  </td>
                  <td>ドメイン層設計の原典。エンティティ・値オブジェクト・集約の概念の根拠。</td>
                </tr>
                <tr>
                  <td>
                    <span className="book-title">Monolith to Microservices</span>
                  </td>
                  <td>Sam Newman</td>
                  <td>
                    <span className="difficulty">
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="empty-star">★</span>
                      <span className="empty-star">★</span>
                    </span>
                  </td>
                  <td>モノリスの最適化と段階的移行戦略。Strangler Fig パターンの詳細。</td>
                </tr>
                <tr>
                  <td>
                    <span className="book-title">Designing Data-Intensive Applications</span>
                  </td>
                  <td>Martin Kleppmann</td>
                  <td>
                    <span className="difficulty">
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                    </span>
                  </td>
                  <td>スケーリング・データ設計の詳解。DB・キャッシュ・分散システムの本質。</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="subsection-title">アーキテクチャ原則・ドキュメント</h3>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Martin Fowler — MonolithFirst パターン</div>
                <Ext href="https://martinfowler.com/bliki/MonolithFirst.html">
                  https://martinfowler.com/bliki/MonolithFirst.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">
                  Martin Fowler — Presentation Domain Data Layering
                </div>
                <Ext href="https://martinfowler.com/bliki/PresentationDomainDataLayering.html">
                  https://martinfowler.com/bliki/PresentationDomainDataLayering.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">
                  Martin Fowler — Anemic Domain Model（アンチパターン）
                </div>
                <Ext href="https://martinfowler.com/bliki/AnemicDomainModel.html">
                  https://martinfowler.com/bliki/AnemicDomainModel.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Martin Fowler — Repository Pattern</div>
                <Ext href="https://martinfowler.com/eaaCatalog/repository.html">
                  https://martinfowler.com/eaaCatalog/repository.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Clean Architecture — Uncle Bob</div>
                <Ext href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
                  https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Hexagonal Architecture — Alistair Cockburn</div>
                <Ext href="https://web.archive.org/web/20210615175905/https://alistair.cockburn.us/hexagonal-architecture/">
                  Alistair Cockburn - Hexagonal Architecture (Web Archive)
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Twelve-Factor App（設計原則）</div>
                <Ext href="https://12factor.net/ja/">https://12factor.net/ja/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Sam Newman — Strangler Fig Application</div>
                <Ext href="https://martinfowler.com/bliki/StranglerFigApplication.html">
                  https://martinfowler.com/bliki/StranglerFigApplication.html
                </Ext>
              </div>
            </div>
          </div>

          <h3 className="subsection-title">フレームワーク・ツール</h3>

          <div className="source-list">
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">FastAPI 公式ドキュメント</div>
                <Ext href="https://fastapi.tiangolo.com/">https://fastapi.tiangolo.com/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">SQLAlchemy 公式</div>
                <Ext href="https://docs.sqlalchemy.org/">https://docs.sqlalchemy.org/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Alembic（DB マイグレーション）</div>
                <Ext href="https://alembic.sqlalchemy.org/">https://alembic.sqlalchemy.org/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Pydantic（バリデーション）</div>
                <Ext href="https://docs.pydantic.dev/">https://docs.pydantic.dev/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">pytest 公式ドキュメント</div>
                <Ext href="https://docs.pytest.org/">https://docs.pytest.org/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">TestContainers（統合テスト）</div>
                <Ext href="https://testcontainers.com/guides/getting-started-with-testcontainers-for-python/">
                  https://testcontainers.com/guides/getting-started-with-testcontainers-for-python/
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Playwright（E2E テスト）</div>
                <Ext href="https://playwright.dev/python/">https://playwright.dev/python/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">structlog（構造化ロギング）</div>
                <Ext href="https://www.structlog.org/">https://www.structlog.org/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Redis 公式ドキュメント</div>
                <Ext href="https://redis.io/docs/">https://redis.io/docs/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">OpenTelemetry 公式</div>
                <Ext href="https://opentelemetry.io/">https://opentelemetry.io/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Prometheus 公式</div>
                <Ext href="https://prometheus.io/docs/">https://prometheus.io/docs/</Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">PostgreSQL パフォーマンスチューニング</div>
                <Ext href="https://www.postgresql.org/docs/current/performance-tips.html">
                  https://www.postgresql.org/docs/current/performance-tips.html
                </Ext>
              </div>
            </div>
            <div className="source-item">
              <IconLink size={16} />
              <div>
                <div className="source-label">Docker Dockerfile Best Practices</div>
                <Ext href="https://docs.docker.com/develop/develop-images/dockerfile_best-practices/">
                  https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
                </Ext>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* 用語集 */}
        <section className="doc-section section" id="glossary">
          <div className="section-header">
            <span className="section-number">
              <IconBook size={16} />
            </span>
            <h2 className="section-title">総合用語集</h2>
          </div>

          <div className="glossary">
            <div className="glossary-header">
              <IconBook size={16} /> 全セクション登場用語まとめ
            </div>
            <div className="glossary-body">
              <div className="glossary-item">
                <span className="glossary-term">モノリシック</span>
                <span className="glossary-def">
                  「一枚岩」の意。すべての機能を 1 つのアプリケーションにまとめた構造。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">デプロイ単位</span>
                <span className="glossary-def">
                  アプリケーションをサーバーに配備するときの最小まとまり。モノリスは全機能が 1
                  単位。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">SOLID 原則</span>
                <span className="glossary-def">
                  Single Responsibility / Open-Closed / Liskov Substitution / Interface Segregation
                  / Dependency Inversion の 5 原則。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">依存性注入（DI）</span>
                <span className="glossary-def">
                  クラスが必要とするオブジェクトを外から渡す仕組み。テスト時にモックに差し替えられる。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">疎結合</span>
                <span className="glossary-def">
                  コンポーネント間の依存が少ない状態。変更の影響範囲が限定される。反対は「密結合」。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">エンティティ</span>
                <span className="glossary-def">
                  ID を持ちライフサイクルを持つビジネスオブジェクト。例：注文・ユーザー。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">値オブジェクト</span>
                <span className="glossary-def">
                  ID
                  を持たない値で識別されるオブジェクト。イミュータブル。例：Money・Email・Address。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">リポジトリ</span>
                <span className="glossary-def">
                  DB
                  へのアクセスを抽象化したクラス。ドメイン層は抽象のみを知り実装はインフラ層が担当。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">DTO</span>
                <span className="glossary-def">
                  Data Transfer Object。層をまたいでデータを運ぶための入れ物。ロジックを持たない。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">モジュラーモノリス</span>
                <span className="glossary-def">
                  単一デプロイを保ちつつ機能ドメインごとにモジュール分割されたモノリス。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">ドメインイベント</span>
                <span className="glossary-def">
                  ビジネス上の出来事（注文確定など）を表すオブジェクト。Pub/Sub
                  で他モジュールに通知する。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">ACID トランザクション</span>
                <span className="glossary-def">
                  原子性・一貫性・独立性・耐久性の 4 性質でデータ整合性を保証する仕組み。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">ステートレス</span>
                <span className="glossary-def">
                  サーバー自身が状態（セッション・データ）を持たない設計。水平スケーリングの前提条件。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">テストピラミッド</span>
                <span className="glossary-def">
                  ユニット（多数）→ 統合（中程度）→ E2E（少数）の比率でテストを配置する考え方。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">Strangler Fig パターン</span>
                <span className="glossary-def">
                  モノリスの機能を段階的に別サービスに置き換えていく移行パターン。絞め殺しのイチジクが木を包んで置き換える様子から命名。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">分散モノリス</span>
                <span className="glossary-def">
                  見た目はマイクロサービスでも実際は密結合な最悪の形態。両方のデメリットを受ける。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">DRY 原則</span>
                <span className="glossary-def">
                  Don't Repeat Yourself。同じロジックを複数の場所にコピーしない。1
                  か所だけに集約する。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">水平スケーリング</span>
                <span className="glossary-def">
                  同一アプリを複数サーバーで起動して負荷を分散する方法。ロードバランサーが前段に必要。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">リッチドメインモデル</span>
                <span className="glossary-def">
                  エンティティ自身がビジネスロジックを持つパターン。反対はアネミック（貧血）ドメインモデル。
                </span>
              </div>
              <div className="glossary-item">
                <span className="glossary-term">マイグレーション</span>
                <span className="glossary-def">
                  DB のスキーマを安全に変更するためのバージョン管理されたスクリプト群。
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="footer">
          <p>モノリシックアーキテクチャ 完全ガイド v1.0 — 最終更新 2026-06-23</p>
          <p style={{ marginTop: 6 }}>
            本ドキュメントは公式ドキュメント・書籍・Martin Fowler
            氏らの論文を参照して作成されています。各ツールの最新情報は公式ドキュメントをご確認ください。
          </p>
        </div>
      </main>
    </div>
  );
}
