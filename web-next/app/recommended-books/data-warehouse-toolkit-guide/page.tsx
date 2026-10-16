import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import {
  IconAdjustments,
  IconAlertCircle,
  IconAlertTriangle,
  IconArrowsDiff,
  IconArrowsSplit,
  IconBinaryTree,
  IconBook,
  IconBuilding,
  IconBulb,
  IconCategory,
  IconCertificate,
  IconChartDots,
  IconChecklist,
  IconClock,
  IconCloud,
  IconCloudComputing,
  IconCube,
  IconDatabase,
  IconFileTypeSql,
  IconFlag,
  IconGitBranch,
  IconGrid3x3,
  IconGridDots,
  IconHistory,
  IconIdBadge2,
  IconInfoCircle,
  IconLayersDifference,
  IconLink,
  IconListDetails,
  IconListNumbers,
  IconRoute,
  IconScale,
  IconScaleOutline,
  IconSitemap,
  IconStairsUp,
  IconStar,
  IconStars,
  IconTable,
  IconTopologyStar3,
  IconTransform,
  IconUser,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";
import DataWarehouseToolkitChecklist from "./DataWarehouseToolkitChecklist";
import DataWarehouseToolkitSidebar from "./DataWarehouseToolkitSidebar";

const DIAGRAMS = {
  d01: `flowchart TB
    classDef hub fill:#e6e5f7,stroke:#3d3a8a,color:#2a2116
    classDef box fill:#f4ead0,stroke:#7d5c14,color:#2a2116
    classDef done fill:#dcf0e4,stroke:#1f5c3d,color:#2a2116
    A["Step 0　この本の全体像とゴール"] --> B["Step 1　OLTPとOLAPの違い"]
    B --> C["Step 2　Kimball対Inmon　2つの設計思想"]
    C --> D["Step 3　4ステップ・ディメンショナルデザインプロセス"]
    D --> E["Step 4　スタースキーマとは何か"]
    E --> F["Step 5　ファクトテーブルの3つの型"]
    F --> G["Step 6　ディメンションテーブルの設計"]
    G --> H["Step 7　ゆっくり変化するディメンション SCD"]
    H --> I["Step 8　エンタープライズ・バスマトリクス"]
    I --> J["Step 9　ETLの34のサブシステム"]
    J --> K["Step 10　本書の章ガイド　全21章"]
    K --> L["Step 11　ビッグデータとモダンな基盤での位置づけ"]
    L --> M["Step 12　批判的に読む　論争と限界"]
    class A hub
    class M done`,
  d02: `flowchart TB
    classDef hub fill:#e6e5f7,stroke:#3d3a8a,color:#2a2116
    classDef box fill:#f4ead0,stroke:#7d5c14,color:#2a2116
    classDef done fill:#dcf0e4,stroke:#1f5c3d,color:#2a2116
    OLTP["OLTP　業務処理システム"] --> O1["正規化されたテーブル　第3正規形"]
    O1 --> O2["1件ずつ高速に読み書きする"]
    O2 --> O3["例　注文入力・在庫更新・会員登録"]
    OLAP["OLAP・DW-BI　分析システム"] --> A1["非正規化されたスタースキーマが中心　構成により3NFのEDWも併用"]
    A1 --> A2["大量データを集計・比較する"]
    A2 --> A3["例　月次売上推移・店舗別ランキング"]
    O3 -.->|"ETLで抽出・変換・格納"| OLAP
    class OLTP hub
    class OLAP done`,
  d03: `flowchart TB
    classDef hub fill:#e6e5f7,stroke:#3d3a8a,color:#2a2116
    classDef box fill:#f4ead0,stroke:#7d5c14,color:#2a2116
    classDef done fill:#dcf0e4,stroke:#1f5c3d,color:#2a2116
    S["ソースシステム群　POS・ERP・CRM など"] --> ST["バックルーム　ステージングエリア"]
    ST --> P["プレゼンテーションエリア　ディメンショナルモデル　スタースキーマの集合"]
    P --> BI["BIアプリケーション　レポート・ダッシュボード・アドホック分析"]
    class S hub
    class BI done`,
  d04: `flowchart TB
    classDef hub fill:#e6e5f7,stroke:#3d3a8a,color:#2a2116
    classDef box fill:#f4ead0,stroke:#7d5c14,color:#2a2116
    classDef done fill:#dcf0e4,stroke:#1f5c3d,color:#2a2116
    KS["Kimball方式　ソースシステム"] --> KST["ステージング"]
    KST --> KM1["データマート1　スタースキーマ"]
    KST --> KM2["データマート2　スタースキーマ"]
    KM1 --> KBI["BIツール"]
    KM2 --> KBI
    IS["Inmon方式　ソースシステム"] --> IET["ETL・統合レイヤー"]
    IET --> IEDW["エンタープライズDWH　第3正規形"]
    IEDW --> IDM["部門別データマート　非正規化"]
    IDM --> IBI["BIツール"]
    class KS hub
    class IS hub
    class KBI done
    class IBI done`,
  d05: `flowchart TB
    classDef hub fill:#e6e5f7,stroke:#3d3a8a,color:#2a2116
    classDef box fill:#f4ead0,stroke:#7d5c14,color:#2a2116
    classDef done fill:#dcf0e4,stroke:#1f5c3d,color:#2a2116
    P1["① ビジネスプロセスを選ぶ　例　POSでの店舗販売"] --> P2["② グレインつまり粒度を宣言する　例　レシート1明細行"]
    P2 --> P3["③ ディメンションを識別する　Who・What・When・Where"]
    P3 --> P4["④ ファクトを識別する　数量・売上金額・原価などの数値"]
    class P1 hub
    class P4 done`,
  d06: `flowchart LR
    classDef hub fill:#e6e5f7,stroke:#3d3a8a,color:#2a2116
    classDef box fill:#f4ead0,stroke:#7d5c14,color:#2a2116
    classDef done fill:#dcf0e4,stroke:#1f5c3d,color:#2a2116
    F["FACT_SALES　売上ファクトテーブル　数量・売上金額・原価・値引額"]
    D1["DIM_DATE　日付ディメンション"]
    D2["DIM_PRODUCT　商品ディメンション"]
    D3["DIM_STORE　店舗ディメンション"]
    D4["DIM_PROMOTION　プロモーションディメンション"]
    D5["DIM_CUSTOMER　顧客ディメンション"]
    D1 --- F
    D2 --- F
    D3 --- F
    D4 --- F
    D5 --- F
    class F hub`,
  d07: `flowchart TB
    classDef hub fill:#e6e5f7,stroke:#3d3a8a,color:#2a2116
    classDef box fill:#f4ead0,stroke:#7d5c14,color:#2a2116
    classDef done fill:#dcf0e4,stroke:#1f5c3d,color:#2a2116
    Types["ファクトテーブルの3つの基本型"] --> T["トランザクション・ファクトテーブル　1行は1つの発生イベント　例　個々の販売明細"]
    Types --> P["定期スナップショット・ファクトテーブル　1行は一定期間ごとの状態　例　月末の在庫残高"]
    Types --> A["累積スナップショット・ファクトテーブル　1行は1プロセス全体　複数マイルストーン日付を後から更新　例　受注から出荷までのパイプライン"]
    class Types hub`,
  d08: `flowchart TD
    classDef hub fill:#e6e5f7,stroke:#3d3a8a,color:#2a2116
    classDef box fill:#f4ead0,stroke:#7d5c14,color:#2a2116
    classDef done fill:#dcf0e4,stroke:#1f5c3d,color:#2a2116
    Q1{"この属性の変更を追跡する必要があるか"}
    Q1 -->|"いいえ　過去の値のまま固定"| T0["Type 0　変更を無視する"]
    Q1 -->|"いいえ　常に最新値だけでよい"| T1["Type 1　上書きする"]
    Q1 -->|"はい"| Q2{"過去のファクトを当時の値で見せたいか"}
    Q2 -->|"はい　完全な履歴"| T2["Type 2　新しい行を追加　有効開始日・終了日・現在フラグ"]
    Q2 -->|"新旧の値を同時に見たい"| T3["Type 3　新しい列を追加　現在値と直前の値"]
    Q2 -->|"現在値の集計と当時の履歴を両立したい"| T6["Type 6　Type1と2と3のハイブリッド"]
    Q2 -->|"現在値の集計と当時の履歴を両立したい"| T7["Type 7　デュアルキー　Type2サロゲートキーと恒久キー"]
    class Q1 box
    class Q2 box
    class T2 done`,
  d09: `flowchart TB
    classDef hub fill:#e6e5f7,stroke:#3d3a8a,color:#2a2116
    classDef box fill:#f4ead0,stroke:#7d5c14,color:#2a2116
    classDef done fill:#dcf0e4,stroke:#1f5c3d,color:#2a2116
    E["抽出　Extracting　3サブシステム　ソースからデータを取得"] --> C["クレンジング&コンフォーム　Cleaning and Conforming　5サブシステム　品質チェックと共通化"]
    C --> D["デリバリー　Delivering　13サブシステム　ディメンショナル構造を構築"]
    D --> M["管理　Managing　13サブシステム　ジョブ運用・監視・セキュリティ"]
    class E hub
    class M done`,
  d10: `flowchart LR
    BP1["小売販売"] --> DD1["日付"]
    BP1 --> DD2["商品"]
    BP1 --> DD3["店舗・拠点"]
    BP1 --> DD5["顧客"]
    BP2["在庫管理"] --> DD1
    BP2 --> DD2
    BP2 --> DD3
    BP3["購買"] --> DD1
    BP3 --> DD2
    BP3 --> DD4["サプライヤー"]`,
  d11: `flowchart TB
    classDef hub fill:#e6e5f7,stroke:#3d3a8a,color:#2a2116
    classDef box fill:#f4ead0,stroke:#7d5c14,color:#2a2116
    classDef done fill:#dcf0e4,stroke:#1f5c3d,color:#2a2116
    Raw["ソースシステムの生データ"] --> DV["Data Vault　Hub・Link・Satellite　統合性・監査性・変化耐性を重視"]
    Raw --> Star["Kimballスタースキーマ　理解しやすさ・クエリ性能を重視"]
    Raw --> OBT["One Big Table　OBT　事前結合済みのワイドテーブル　クラウドDWHの安価なストレージが背景"]
    DV --> Star
    Star -.->|"今も議論が続く比較"| OBT
    class Raw hub
    class Star done
    class OBT box`,
};

const SCHEMA_SQL_HTML = `<span class="cm">-- ディメンションテーブル（サロゲートキーが主キー）</span>
<span class="kw">CREATE TABLE</span> <span class="fn">dim_product</span> (
    product_key      <span class="kw">INT PRIMARY KEY</span>,   <span class="cm">-- サロゲートキー</span>
    product_id       <span class="kw">VARCHAR</span>(<span class="nu">20</span>),       <span class="cm">-- ソースシステムの自然キー</span>
    product_name     <span class="kw">VARCHAR</span>(<span class="nu">200</span>),
    category         <span class="kw">VARCHAR</span>(<span class="nu">100</span>),
    brand            <span class="kw">VARCHAR</span>(<span class="nu">100</span>),
    effective_date   <span class="kw">DATE</span>,
    expiration_date  <span class="kw">DATE</span>,
    is_current       <span class="kw">BOOLEAN</span>
);

<span class="cm">-- ファクトテーブル（ディメンションへの外部キー + 数値）</span>
<span class="cm">-- dim_date・dim_customer・dim_store・dim_promotion は、dim_product と同様に</span>
<span class="cm">-- サロゲートキーを主キーとするディメンションテーブルとして事前に作成済みとする</span>
<span class="kw">CREATE TABLE</span> <span class="fn">fact_sales</span> (
    date_key         <span class="kw">INT REFERENCES</span> <span class="fn">dim_date</span>(date_key),
    product_key      <span class="kw">INT REFERENCES</span> <span class="fn">dim_product</span>(product_key),
    customer_key     <span class="kw">INT REFERENCES</span> <span class="fn">dim_customer</span>(customer_key),
    store_key        <span class="kw">INT REFERENCES</span> <span class="fn">dim_store</span>(store_key),
    promotion_key    <span class="kw">INT REFERENCES</span> <span class="fn">dim_promotion</span>(promotion_key),
    sales_quantity   <span class="kw">INT</span>,
    sales_dollar_amt <span class="kw">DECIMAL</span>(<span class="nu">12</span>,<span class="nu">2</span>),
    cost_dollar_amt  <span class="kw">DECIMAL</span>(<span class="nu">12</span>,<span class="nu">2</span>)
);`;

export default function DataWarehouseToolkitGuidePage() {
  return (
    <div className="data-warehouse-toolkit-guide">
      <div className="layout">
        <DataWarehouseToolkitSidebar />

        <div className="main">
          <header className="hero">
            <div className="hero-eyebrow">
              <IconStars aria-hidden="true" size={18} />
              <span>ディメンショナルモデリング初学者向けガイド</span>
            </div>
            <h1>The Data Warehouse Toolkit 完全読解ガイド</h1>
            <p className="hero-sub">
              ― ディメンショナルモデリング初学者のためのステップバイステップ解説
            </p>
            <div className="hero-meta">
              <span className="hero-chip">
                <IconUser aria-hidden="true" size={16} />
                <span>Ralph Kimball &amp; Margy Ross</span>
              </span>
              <span className="hero-chip">
                <IconBuilding aria-hidden="true" size={16} />
                <span>Wiley　第3版　2013年</span>
              </span>
              <span className="hero-chip">
                <IconListNumbers aria-hidden="true" size={16} />
                <span>全21章</span>
              </span>
              <span className="hero-chip">
                <IconClock aria-hidden="true" size={16} />
                <span>全12ステップ構成</span>
              </span>
            </div>
            <div className="hero-src">
              <IconInfoCircle aria-hidden="true" size={16} style={{ display: "inline-block", marginRight: 6, verticalAlign: "text-bottom" }} />
              原著: Ralph Kimball, Margy Ross 著『The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling, 3rd Edition』(Wiley, 2013)
              <br />
              O&apos;Reilly掲載ページ:{" "}
              <Ext href="https://www.oreilly.com/library/view/the-data-warehouse/9781118530801/">
                https://www.oreilly.com/library/view/the-data-warehouse/9781118530801/
              </Ext>
              <br />
              <br />
              本ガイドは、データウェアハウス/BI業界で「ディメンショナルモデリングのバイブル」と呼ばれる本書を、初めてデータ基盤設計に触れるエンジニア・アナリスト向けに、著者独自の構成で噛み砕いて解説する非公式の学習補助資料です。原著の文章を転載するものではなく、内容の要点を独自の言葉と図解で再構成したものです。実務で本格的に設計を行う際は、必ず原著（および各種一次情報）を参照してください。
            </div>
          </header>

          <section className="section" id="book-info">
            <div className="section-eyebrow">
              <IconIdBadge2 aria-hidden="true" size={18} />
              <span>Section 01</span>
            </div>
            <h2>本書の基本情報</h2>
            <div className="prose">
              <div className="table-wrap">
                <table className="kv">
                  <tbody>
                    <tr>
                      <td>原題</td>
                      <td>
                        <em>The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling</em>, 3rd Edition
                      </td>
                    </tr>
                    <tr>
                      <td>著者</td>
                      <td>Ralph Kimball, Margy Ross</td>
                    </tr>
                    <tr>
                      <td>出版社</td>
                      <td>Wiley</td>
                    </tr>
                    <tr>
                      <td>シリーズ初版</td>
                      <td>1996年（『The Data Warehouse Toolkit』第1版）</td>
                    </tr>
                    <tr>
                      <td>本ガイドが扱う版</td>
                      <td>第3版（2013年7月刊行）</td>
                    </tr>
                    <tr>
                      <td>ページ数</td>
                      <td>約600〜624ページ</td>
                    </tr>
                    <tr>
                      <td>ISBN</td>
                      <td>978-1-118-53080-1</td>
                    </tr>
                    <tr>
                      <td>想定読者レベル</td>
                      <td>Beginner to intermediate（O&apos;Reilly表記）</td>
                    </tr>
                    <tr>
                      <td>章構成</td>
                      <td>Introduction + 全21章 + Index</td>
                    </tr>
                    <tr>
                      <td>関連シリーズ</td>
                      <td>
                        『The Data Warehouse Lifecycle Toolkit』『The Data Warehouse ETL Toolkit』『The Kimball Group Reader』
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                第3版は第2版までの内容を大幅に拡張したもので、ETLに関する章が2つ新設され、SCD（ゆっくり変化するディメンション）の技法がType 0〜7まで拡張され、12業界分のバスマトリクス例が収録されるなど、実務向けの「技法の完全な辞典」として再構成されている点が特徴です。
              </p>
            </div>
          </section>

          <section className="section" id="authors">
            <div className="section-eyebrow">
              <IconUsers aria-hidden="true" size={18} />
              <span>Section 02</span>
            </div>
            <h2>著者について</h2>
            <div className="prose">
              <p>
                <strong>Ralph Kimball</strong> は、スタンフォード大学で電気工学の博士号を取得後、Xerox PARC（パロアルト研究所）に在籍し、マウス・アイコン・ウィンドウを初めて商用製品に搭載した「Xerox Star Workstation」の主任設計者の一人として活躍しました。その後、意思決定支援ソフトウェア企業Metaphor Computer Systemsの副社長を経て、1986年にRed Brick Systemsを創業（CEOは1992年まで）。同社はデータウェアハウス向けに最適化されたリレーショナルデータベースで知られ、ビットマップインデックスによって当時の他製品より大幅に高速な性能を実現していました。その後Kimball Groupを設立し、ディメンショナルアプローチの第一人者としてデータウェアハウス／BI業界を牽引しました。Kimball Groupは2015年末に活動を終了しており、Kimball自身も現在は引退しています。
              </p>
              <p>
                <strong>Margy Ross</strong> はKimball Groupの元社長であり、Ralph Kimballとの共著者として5冊のToolkitシリーズを執筆。1982年以来データウェアハウス／BI領域に専念してきた人物で、Kimball Groupの活動終了後もDecisionWorksを通じてディメンショナルモデリングの講座を提供し続けています。
              </p>
              <p>
                両者による「Kimball方式（ディメンショナルモデリング）」は、Bill Inmonが提唱する方式と並び、データウェアハウス設計における二大方法論の一つとされています。
              </p>
            </div>
          </section>

          <section className="section" id="roadmap">
            <div className="section-eyebrow">
              <IconRoute aria-hidden="true" size={18} />
              <span>Section 03</span>
            </div>
            <h2>学習ロードマップ</h2>
            <div className="prose">
              <p>
                本書は「基礎技法 → 業界別ケーススタディ → ライフサイクル／ETL → ビッグデータ」という順に難易度が上がっていく構成になっています。本ガイドでは、その骨格を抜き出して次の順序で学びます。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconSitemap aria-hidden="true" size={18} />
                <span>図1　本ガイドの学習ロードマップ（全12ステップ）</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d01} />
              </div>
            </div>
          </section>

          <section className="section" id="step0">
            <div className="section-eyebrow">
              <IconFlag aria-hidden="true" size={18} />
              <span>Step 0</span>
            </div>
            <h2>なぜこの本が「定番教科書」なのか</h2>
            <div className="prose">
              <p>
                Kimballによる最初の『The Data Warehouse Toolkit』は1996年に刊行され、業界にディメンショナルモデリングという考え方を本格的に広めた書籍として位置づけられています。データモデリングの世界的専門メディアでも、この初版は実務で磨かれた豊富な具体例を伴ってOLAP的なモデリング手法を提示した点が高く評価されており、1990年代後半の実案件で「頼りになる一冊」として使われていたという証言も見られます。
              </p>
              <p>第3版（本ガイドが扱う版）では、以下の点が強化されました。</p>
              <ul>
                <li>新章として「Kimball Dimensional Modeling Techniques Overview（第2章）」が追加され、これまでの技法が体系的に一つの章にまとめられた</li>
                <li>ラグ付きの可変階層や多値属性を扱うためのブリッジテーブルなど、高度なパターンの解説が拡充</li>
                <li>12業界分のエンタープライズ・バスマトリクス例を収録</li>
                <li>SCD（ゆっくり変化するディメンション）技法がType 0〜7まで拡張</li>
                <li>ビジネス関係者とのコラボレーティブなモデリング設計セッションに関するガイダンスを追加</li>
              </ul>
              <p>
                原著の目次を見ると、Introduction（導入）から始まり、第1〜2章で理論的基礎を、第3〜16章で小売・在庫・調達・受注管理・会計・CRM・人事・金融・通信・運輸・教育・医療・ECommerce・保険という、業界と業務領域の両方にまたがる14のケーススタディを、第17〜20章でプロジェクトのライフサイクルとETLシステム構築を、第21章でビッグデータ分析を扱う構成になっています（詳しい章立ては<a href="#step10">Step 10</a>の早見表を参照）。
              </p>
            </div>
          </section>

          <section className="section" id="step1">
            <div className="section-eyebrow">
              <IconLayersDifference aria-hidden="true" size={18} />
              <span>Step 1</span>
            </div>
            <h2>OLTPとOLAPの違いを理解する</h2>
            <div className="prose">
              <p>
                ディメンショナルモデリングを理解する第一歩は、「業務システム（OLTP）」と「分析システム（OLAP／DW-BI）」がまったく異なる目的のために設計されるという事実を押さえることです。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconArrowsSplit aria-hidden="true" size={18} />
                <span>図2　OLTPとOLAP・DW-BIの対比</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d02} />
              </div>
            </div>
            <div className="prose">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>観点</th>
                      <th>OLTP（業務システム）</th>
                      <th>OLAP / DW-BI（分析システム）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>目的</td>
                      <td>日々の取引を正確・高速に記録する</td>
                      <td>過去〜現在の傾向を分析し意思決定を支援する</td>
                    </tr>
                    <tr>
                      <td>データ構造</td>
                      <td>正規化（第3正規形が基本）</td>
                      <td>
                        アーキテクチャによる（Kimball方式のプレゼンテーション層ではディメンショナルモデル〈スタースキーマ〉が一般的）
                      </td>
                    </tr>
                    <tr>
                      <td>典型的なクエリ</td>
                      <td>特定の1件を高速に検索・更新</td>
                      <td>大量の行を集計・グループ化・比較</td>
                    </tr>
                    <tr>
                      <td>更新頻度</td>
                      <td>リアルタイムで頻繁に更新</td>
                      <td>バッチ（またはマイクロバッチ）でまとめて反映</td>
                    </tr>
                    <tr>
                      <td>利用者</td>
                      <td>アプリケーション、現場担当者</td>
                      <td>アナリスト、経営層、BIツール</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Kimballはこの「データ取得の世界」と「データ分析の世界」が根本的に異なるというところから議論を始め、ビジネスユーザーが理解しやすく、かつクエリ性能が高いデータウェアハウスを作るための設計手法としてディメンショナルモデリングを提示しています。原著第1章のタイトルどおり、データ取得（Data Capture）とデータ分析（Data Analysis）は「別世界（Different Worlds）」であるという前提が、本書全体の出発点になっています。
              </p>
            </div>
          </section>

          <section className="section" id="step2">
            <div className="section-eyebrow">
              <IconGitBranch aria-hidden="true" size={18} />
              <span>Step 2</span>
            </div>
            <h2>2つの設計思想 ── Kimball対Inmon</h2>
            <div className="prose">
              <p>
                データウェアハウス設計には歴史的に2つの大きな流派があります。Kimballの「ボトムアップ（dimensional）」方式と、Bill Inmonの「トップダウン（normalized）」方式です。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconTopologyStar3 aria-hidden="true" size={18} />
                <span>図3　KimballのDW/BIアーキテクチャ</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d03} />
              </div>
            </div>
            <div className="prose">
              <p>
                上図がKimball自身の提唱する「DW/BIアーキテクチャ」です。ソースシステムからバックルームのステージングエリアを経て、プレゼンテーションエリア（ディメンショナルモデルの集合）にデータが格納され、BIアプリケーションから直接アクセスされる、という一気通貫の流れが特徴です。
              </p>
              <p>
                これに対してInmonは、正規化されたエンタープライズ全体のデータウェアハウス（EDW）をまず構築し、そこから部門ごとのデータマートを派生させるという逆方向のアプローチを取ります。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconArrowsDiff aria-hidden="true" size={18} />
                <span>図4　Kimball（ボトムアップ）とInmon（トップダウン）の比較</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d04} />
              </div>
            </div>
            <div className="prose">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>観点</th>
                      <th>Kimball（ボトムアップ）</th>
                      <th>Inmon（トップダウン）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>出発点</td>
                      <td>個々のビジネスプロセス（データマート）</td>
                      <td>企業全体のデータモデル（EDW）</td>
                    </tr>
                    <tr>
                      <td>データ構造</td>
                      <td>ディメンショナルモデル（スタースキーマ／スノーフレークスキーマ）</td>
                      <td>正規化モデル（第3正規形が基本）</td>
                    </tr>
                    <tr>
                      <td>初期投資と着手までの速さ</td>
                      <td>比較的早く価値を出しやすい</td>
                      <td>全体設計に時間がかかりやすい</td>
                    </tr>
                    <tr>
                      <td>データの一貫性</td>
                      <td>コンフォームド・ディメンションで担保する必要がある</td>
                      <td>中央のEDWが単一の真実の源になりやすい</td>
                    </tr>
                    <tr>
                      <td>分析ツールからの直接アクセス</td>
                      <td>ディメンショナルモデルへ直接アクセス可能</td>
                      <td>データマート経由でのアクセスが基本</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                なお、両者に加えて、2000年代にDan Linstedtが提唱した「Data Vault」という第3の方法論も存在します。Data Vaultは、監査性と変更への耐性を重視し、Hub（ビジネスキー）・Link（関係）・Satellite（属性の履歴）という3種類のテーブルで構成される、ソースシステムの変化に強い統合レイヤーを提供する手法です。Data Vaultについては<a href="#step11">Step 11</a>で改めて取り上げます。
              </p>
              <blockquote>
                <p>
                  <strong>初学者向けメモ:</strong> 現場では「Kimball方式かInmon方式か」という二者択一ではなく、両者のアイデアを組み合わせたハイブリッドな設計（例: Data VaultやEDWの上にKimball流のデータマートを構築する）もよく採用されます。本書はあくまで「ディメンショナルモデリングという技法そのもの」を深掘りする一冊であり、アーキテクチャ全体の選定論争に深入りする本ではない点は覚えておくとよいでしょう。
                </p>
              </blockquote>
            </div>
          </section>

          <section className="section" id="step3">
            <div className="section-eyebrow">
              <IconListNumbers aria-hidden="true" size={18} />
              <span>Step 3</span>
            </div>
            <h2>4ステップ・ディメンショナルデザインプロセス</h2>
            <div className="prose">
              <p>
                本書全体を貫く最も重要な方法論が、この「4ステップ・ディメンショナルデザインプロセス」です。原著第3章（小売販売のケーススタディ）で初めて登場し、以降のすべての業界別ケーススタディで繰り返し適用されます。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconStairsUp aria-hidden="true" size={18} />
                <span>図5　4ステップ・ディメンショナルデザインプロセス</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d05} />
              </div>
            </div>
            <div className="prose">
              <h3>① ビジネスプロセスを選ぶ</h3>
              <p>
                部署や機能単位ではなく、「発注」「販売」「出荷」「請求」のような、計測可能なオペレーション上のイベントを選びます。最初に着手するモデルは、最もインパクトが大きく、最も重要なビジネス課題に答えられ、かつデータ抽出が現実的に可能なものを選ぶべきだとされています。
              </p>
              <h3>② グレイン（粒度）を宣言する</h3>
              <p>
                Kimball Groupが公開している設計ノウハウ集（Design Tip）の中でも、この「グレイン宣言」は特に重要視されています。何千件もの受講者の設計をレビューしてきた経験から、最も頻繁に発生する設計ミスは「ファクトテーブルのグレインを設計の最初に明確化していないこと」だと述べられています。グレインが曖昧なままだと、設計全体が不安定な土台の上に立つことになり、どのディメンションを採用すべきかの議論が堂々巡りになったり、本来含めるべきでない粒度のファクトが紛れ込んだりする原因になります。
              </p>
              <p>
                グレイン宣言は「ファクトテーブルの主キーを列挙すること」ではなく、「ファクトテーブルの1行が何を表すか」をビジネス用語で正確に言い表すことだと強調されています。例えば、次のような宣言が挙げられます。
              </p>
              <ul>
                <li>小売店のレシート上の個々の明細行（スキャナーで記録された単位）</li>
                <li>保険契約に対する個々のトランザクション</li>
                <li>医師からの請求書の1明細行</li>
                <li>航空機の搭乗券1枚</li>
              </ul>
              <p>
                グレインをまずビジネス的な言葉で確定させ、そのあとで初めて「どのディメンションが妥当か」が自然と決まってくる、という順序が重要だとされています。Kimball Group自身も、グレイン宣言は設計全体を拘束する「契約」であり、ディメンションやファクトを選ぶより前に確定させなければならない、と説明しています。特に強調されるのが「アトミック・グレイン（atomic grain）」、つまりビジネスプロセスが捕捉できる最も細かい粒度からモデリングを始めるべきだという考え方で、これにより後から発生する予測不能なアドホッククエリにも耐えられる設計になるとされています。
              </p>
              <h3>③ ディメンションを識別する</h3>
              <p>
                グレインが確定したら、そのファクトテーブルの各行を「説明」するディメンションを列挙します。ディメンションは基本的に Who（誰が）・What（何を）・When（いつ）・Where（どこで）に答えるためのテーブルです。小売販売の例では、日付・商品・店舗・プロモーションなどが典型的なディメンションになります。
              </p>
              <h3>④ ファクトを識別する</h3>
              <p>
                最後に、そのグレインにおいて計測可能な数値（売上金額、数量、原価など）を洗い出します。ファクトはできる限り加算可能（additive）であることが望ましいとされます（詳細は<a href="#step5">Step 5</a>）。
              </p>
            </div>
          </section>

          <section className="section" id="step4">
            <div className="section-eyebrow">
              <IconStar aria-hidden="true" size={18} />
              <span>Step 4</span>
            </div>
            <h2>スタースキーマとは何か</h2>
            <div className="prose">
              <p>
                4ステップ・プロセスの成果物として組み立てられるのが「スタースキーマ」です。中心に1つのファクトテーブルを置き、それを複数のディメンションテーブルが取り囲む形をとります。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconChartDots aria-hidden="true" size={18} />
                <span>図6　スタースキーマの構造（小売販売の例）</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d06} />
              </div>
            </div>
            <div className="prose">
              <p>
                Wikipediaのスタースキーマ解説でも触れられているとおり、ファクトテーブルは基本的に数値と、説明情報を持つディメンションへの外部キーで構成され、非常に細かい粒度（グレイン）でイベントを記録できるよう設計されます。
              </p>
              <h3>サロゲートキー（surrogate key）とナチュラルキー</h3>
              <p>
                ディメンションテーブルの主キーには、ソースシステム由来の自然キー（例: 商品コード）をそのまま使うのではなく、データウェアハウス側で独自に発番する「サロゲートキー」（単純な連番の整数など）を使うのが定石です。理由は主に次の2つです。
              </p>
              <ul>
                <li>ソースシステムが同じ自然キーを再利用したり、体系を変更したりしても影響を受けない</li>
                <li>
                  SCD Type 2（<a href="#step7">Step 7</a>参照）で同じ商品の「バージョン違い」を複数行として保持できるようになる
                </li>
              </ul>
              <h3>簡易的なDDLイメージ</h3>
            </div>
            <div className="code-block">
              <div className="cb-head">
                <IconFileTypeSql aria-hidden="true" size={16} />
                <span>schema.sql</span>
              </div>
              <pre dangerouslySetInnerHTML={{ __html: SCHEMA_SQL_HTML }} />
            </div>
            <div className="prose">
              <h3>なぜ正規化（スノーフレーク化）を避けるのか</h3>
              <p>
                原著第3章には「Resisting Normalization Urges（正規化したくなる衝動に抗う）」という節があります。OLTP出身のエンジニアは、ディメンションテーブルの中の階層（例: 商品 → サブカテゴリ → カテゴリ）を見ると、つい正規化して複数テーブルに分割したくなります。しかし本書はこれを「スノーフレーキング」と呼び、基本的には推奨していません。ストレージの節約効果はごくわずかである一方、ビジネスユーザーにとってJOINの数が増えて理解しにくくなり、クエリ性能も低下しやすいためです。非常に巨大なディメンション（数千万行規模など）で明確な必要がある場合に限り、部分的なスノーフレーク化を検討する、というスタンスです。
              </p>
            </div>
          </section>

          <section className="section" id="step5">
            <div className="section-eyebrow">
              <IconTable aria-hidden="true" size={18} />
              <span>Step 5</span>
            </div>
            <h2>ファクトテーブルの3つの型</h2>
            <div className="prose">
              <p>
                Kimball Groupは、実務上ほぼすべてのファクトテーブルが次の3つの型のいずれかに分類できると説明しています。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconCategory aria-hidden="true" size={18} />
                <span>図7　ファクトテーブルの3つの基本型</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d07} />
              </div>
            </div>
            <div className="prose">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>型</th>
                      <th>グレイン</th>
                      <th>特徴</th>
                      <th>代表例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        トランザクション・
                        <br />
                        ファクトテーブル
                      </td>
                      <td>1行 = 発生した1つのイベント</td>
                      <td>最も一般的で「主力」となる型。行は基本的に追記のみ</td>
                      <td>POSの販売明細、Webサイトのクリックイベント</td>
                    </tr>
                    <tr>
                      <td>
                        定期スナップショット・
                        <br />
                        ファクトテーブル
                      </td>
                      <td>1行 = 特定の期間（日次・週次・月次）ごとのスナップショット</td>
                      <td>トランザクション系のデータに依存して生成されることが多い</td>
                      <td>月末時点の口座残高、週次の在庫水準</td>
                    </tr>
                    <tr>
                      <td>
                        累積スナップショット・
                        <br />
                        ファクトテーブル
                      </td>
                      <td>1行 = プロセス全体（開始から終了まで）</td>
                      <td>
                        明確な開始と終了を持つプロセスに使う。複数のマイルストーン日付列を持ち、進捗に応じて同じ行を繰り返し更新する。未確定の日付を表すため、日付ディメンションには「不明」を表すプレースホルダー行を用意しておく必要がある
                      </td>
                      <td>注文から出荷・請求・入金までのパイプライン、大学の入学から卒業までの過程</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                データモデリングに関する解説記事でも、この3分類はKimball流ディメンショナルモデリングの基本要素として、長年ほぼ変わらずに使われ続けていると指摘されています。
              </p>
              <h3>加算可能性（additive）という考え方</h3>
              <p>
                ファクト（数値列）は「加算可能（additive）」「準加算可能（semi-additive）」「非加算（non-additive）」の3種類に分類されます。
              </p>
              <ul>
                <li>
                  <strong>加算可能:</strong> すべてのディメンションにわたって単純に合計してよい（例: 売上金額、販売数量）
                </li>
                <li>
                  <strong>準加算可能:</strong> 一部のディメンションについては合計できるが、時間軸については合計できない（例: 口座残高は店舗をまたいで合計できるが、月をまたいで合計すると意味を成さない）
                </li>
                <li>
                  <strong>非加算:</strong> 単純な合計に意味がない（例: 単価、比率）。この場合は平均などの別の集計方法が必要
                </li>
              </ul>
              <h3>ファクトレス・ファクトテーブル</h3>
              <p>
                原著第3章では「ファクトレス・ファクトテーブル」も紹介されています。数値のファクトを一切持たず、複数のディメンションキーの組み合わせだけで「何かが発生した」という事実、または「あるディメンションの組み合わせがカバー範囲として存在する」という事実を記録するテーブルです（例: 学生の出席記録、店舗と商品の取扱可否の組み合わせ）。
              </p>
            </div>
          </section>

          <section className="section" id="step6">
            <div className="section-eyebrow">
              <IconCube aria-hidden="true" size={18} />
              <span>Step 6</span>
            </div>
            <h2>ディメンションテーブルの設計技法</h2>
            <div className="prose">
              <p>
                ディメンションテーブルは「ビジネスユーザーが理解しやすい説明的な属性」を持つテーブルです。本書第2章では、次のような設計技法が体系的に整理されています。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>技法</th>
                      <th>説明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        コンフォームド・ディメンション
                        <br />
                        （Conformed Dimension）
                      </td>
                      <td>
                        複数のビジネスプロセス（複数のファクトテーブル）で共通利用される、統一された定義・粒度・キーを持つディメンション。企業全体でデータを串刺し分析するための土台になる
                      </td>
                    </tr>
                    <tr>
                      <td>
                        縮退ディメンション
                        <br />
                        （Degenerate Dimension）
                      </td>
                      <td>
                        ディメンションテーブルを別途持たず、ファクトテーブルの中にそのまま残す識別子（例: 伝票番号・注文番号）。実質的な属性を持たないため独立テーブル化する意味が薄い
                      </td>
                    </tr>
                    <tr>
                      <td>
                        ジャンク・ディメンション
                        <br />
                        （Junk Dimension）
                      </td>
                      <td>
                        個別には小さすぎたり関連が薄かったりするフラグ・インジケータ類（Yes/Noフラグなど）をまとめて1つのディメンションに格納したもの
                      </td>
                    </tr>
                    <tr>
                      <td>
                        ロールプレイング・
                        <br />
                        ディメンション
                      </td>
                      <td>
                        同じディメンション（例: 日付）を、注文日・出荷日・請求日のように複数の異なる役割でファクトテーブルから参照する手法。物理的にはビューなどで別名を与えて扱う
                      </td>
                    </tr>
                    <tr>
                      <td>
                        アウトリガー
                        <br />
                        （Outrigger）
                      </td>
                      <td>
                        あるディメンションテーブルの中に、さらに別の小さなディメンションへの外部キーを持たせる構造。多用は避けるべきとされる
                      </td>
                    </tr>
                    <tr>
                      <td>
                        ブリッジテーブル
                        <br />
                        （Bridge Table）
                      </td>
                      <td>
                        1つのファクト行が複数のディメンション値（多値属性）や可変長の階層（ラグ付き階層）と関連する場合に使う中間テーブル。第3版で拡充されたトピックの一つ
                      </td>
                    </tr>
                    <tr>
                      <td>
                        ディメンション階層
                        <br />
                        （Hierarchy）
                      </td>
                      <td>
                        商品 → サブカテゴリ → カテゴリのような、ドリルダウン／ロールアップに使う階層構造をディメンションテーブルの属性列として素直に持たせる
                      </td>
                    </tr>
                    <tr>
                      <td>
                        ミニディメンション
                        <br />
                        （Mini-Dimension）
                      </td>
                      <td>
                        頻繁に変化する属性群を、巨大な親ディメンションから切り出して別テーブル化したもの。SCD Type 4で用いられる
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section" id="step7">
            <div className="section-eyebrow">
              <IconHistory aria-hidden="true" size={18} />
              <span>Step 7</span>
            </div>
            <h2>ゆっくり変化するディメンション（SCD）</h2>
            <div className="prose">
              <p>
                初学者が最もつまずきやすく、同時に本書で最も重要なトピックの一つが「Slowly Changing Dimension（SCD）」です。ディメンションの属性（例: 顧客の住所、商品のカテゴリ）は本来「ゆっくり」であっても変化するため、その変化をどう扱うかを設計時に決めておく必要があります。
              </p>
              <p>
                Kimballはこの概念を1996年の初版で導入しました。第3版ではType 1〜3の基本技法に加え、Type 0・4・5・6・7が体系的に整理されています。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconBinaryTree aria-hidden="true" size={18} />
                <span>図8　SCDタイプの判断フロー</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d08} />
              </div>
            </div>
            <div className="prose">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>挙動</th>
                      <th>メリット</th>
                      <th>デメリット・注意点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Type 0</td>
                      <td>属性値を初期値のまま固定し、以降の変更を無視する</td>
                      <td>実装が最も単純</td>
                      <td>生年月日など「本来変わらないはずの値」以外には不向き</td>
                    </tr>
                    <tr>
                      <td>Type 1（上書き）</td>
                      <td>古い値を新しい値で単純に上書きする</td>
                      <td>実装が簡単。常に最新の状態で分析できる</td>
                      <td>過去のファクトも「今の属性」で見えてしまい、履歴上の正確さが失われる</td>
                    </tr>
                    <tr>
                      <td>Type 2（行追加）</td>
                      <td>
                        変更のたびに新しいサロゲートキーを持つ行を追加し、有効開始日・終了日・現在フラグを持たせる
                      </td>
                      <td>完全な履歴を保持でき、当時の状態でファクトを分析できる</td>
                      <td>ディメンションの行数が増える。ファクトテーブルとのJOINキー管理が複雑になる</td>
                    </tr>
                    <tr>
                      <td>Type 3（列追加）</td>
                      <td>「現在の値」列と「直前の値」列を両方持つ</td>
                      <td>新旧どちらの切り口でも分析できる</td>
                      <td>2値までしか保持できず、頻繁な変更には向かない。利用頻度は低い技法とされる</td>
                    </tr>
                    <tr>
                      <td>
                        Type 4
                        <br />
                        （ミニディメンション追加）
                      </td>
                      <td>
                        頻繁に変化する属性群（年齢帯・所得帯・与信スコア帯など）を主ディメンションから切り出してミニディメンションとし、ファクトテーブルは主ディメンションとミニディメンションの両方のキーを持つ
                      </td>
                      <td>
                        主ディメンションでType 2の行が急増するのを防ぎつつ、ファクト発生時点の属性プロファイルで分析できる
                      </td>
                      <td>
                        ミニディメンションの属性は値を帯（バンド）に丸める必要があり、ファクトを経由しないと主ディメンションとミニディメンションの現在の対応が分からない
                      </td>
                    </tr>
                    <tr>
                      <td>Type 5（4+1）</td>
                      <td>
                        Type 4のミニディメンションに加え、主ディメンションにも「現在のミニディメンション」へのキーをType 1（上書き）で持たせる（アウトリガー）
                      </td>
                      <td>ファクトを経由せずに、顧客などの現在のプロファイルで集計できる</td>
                      <td>現在のキーを上書きするETLが追加で必要になり、設計・運用がやや複雑</td>
                    </tr>
                    <tr>
                      <td>
                        Type 6
                        <br />
                        （1+2+3のハイブリッド）
                      </td>
                      <td>
                        Type 2で履歴行を追加しつつ、Type 1的な「現在値」列とType 3的な「直前値」列も同時に持つ
                      </td>
                      <td>履歴分析と最新値分析を1つのテーブルで両立できる</td>
                      <td>設計・ETLロジックが最も複雑</td>
                    </tr>
                    <tr>
                      <td>Type 7（デュアルキー）</td>
                      <td>
                        Type 6と同等の機能を、物理的な列上書きではなく、履歴行ごとのType 2サロゲートキーと、履歴をまたいで同一エンティティを識別する恒久キー（durable key）の2種類をファクトに持たせて使い分けて実現する（自然キーは不変である場合に限り恒久キーとして使える）
                      </td>
                      <td>Type 6より実装がシンプルになるケースがある</td>
                      <td>やはり相応の設計スキルが必要</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Kimball Group自身のDesign Tip記事によれば、Type 1（上書き）・Type 2（行追加）・Type 3（列追加）という3つの基本技法だけでは対応しきれない、より高度で複雑な実務要件に応えるために、Type 0・4・5・6・7というより発展的な技法が整理されたという経緯があります。また、Kimball自身とMargy Rossが1990年代から2000年代に執筆した記事では、Type 1は主に「データの訂正」に適した技法であり、Type 2では変更のたびに新しいサロゲートキーを持つ行が追加され、旧行・新行の両方が自然キー（または恒久的な識別子）、最新行フラグ、有効開始日・終了日を属性として持つという設計が説明されています。
              </p>
              <p>
                なお、実務でよく使われるのはType 0・1・2の3つで、Type 3以降はかなり限定的な場面でのみ使われるという指摘もあります。特にType 5については、業界内で厳密に合意された定義が存在するわけではない点に注意が必要です。
              </p>
              <h3>具体例で見るSCD Type 2</h3>
              <p>
                顧客が転居した場合の<code>DIM_CUSTOMER</code>テーブルの変化を、SCD Type 2で表現すると次のようになります。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>
                        customer_key
                        <br />
                        （サロゲートキー）
                      </th>
                      <th>
                        customer_id
                        <br />
                        （自然キー）
                      </th>
                      <th>customer_name</th>
                      <th>city</th>
                      <th>is_current</th>
                      <th>effective_date</th>
                      <th>expiration_date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1001</td>
                      <td>C-500</td>
                      <td>田中太郎</td>
                      <td>大阪市</td>
                      <td>false</td>
                      <td>2022-01-01</td>
                      <td>2026-03-14</td>
                    </tr>
                    <tr>
                      <td>1002</td>
                      <td>C-500</td>
                      <td>田中太郎</td>
                      <td>東京都</td>
                      <td>true</td>
                      <td>2026-03-15</td>
                      <td>9999-12-31</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                <code>customer_key = 1001</code> を参照している過去のファクト行は引き続き「大阪市」の田中太郎として分析され、転居後のファクト行は新しいサロゲートキー<code>1002</code>（東京都）を参照します。これにより「当時どこに住んでいた顧客が、どこでどれだけ購入していたか」という履歴が正しく保たれます。
              </p>
            </div>
          </section>

          <section className="section" id="step8">
            <div className="section-eyebrow">
              <IconGridDots aria-hidden="true" size={18} />
              <span>Step 8</span>
            </div>
            <h2>エンタープライズ・データウェアハウス・バスマトリクス</h2>
            <div className="prose">
              <p>
                複数のビジネスプロセス（複数のデータマート）を段階的に構築していく際、Kimball方式で全体の一貫性を保つための設計図が「エンタープライズ・データウェアハウス・バスマトリクス」です。原著第4章（在庫）で初めて本格的に導入される概念で、第3版では12業界分の具体例が収録されています。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconGrid3x3 aria-hidden="true" size={18} />
                <span>図9　ビジネスプロセスとコンフォームド・ディメンションの関係</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d10} />
              </div>
            </div>
            <div className="prose">
              <p>
                バスマトリクスは、行にビジネスプロセス（＝将来のファクトテーブル候補）、列にコンフォームド・ディメンションを配置し、交点に「そのプロセスがそのディメンションを使うかどうか」を印で示す一覧表です。実際の表は次のようなイメージになります。
              </p>
              <div className="table-wrap">
                <table className="center">
                  <thead>
                    <tr>
                      <th>ビジネスプロセス ＼ ディメンション</th>
                      <th>日付</th>
                      <th>商品</th>
                      <th>店舗/拠点</th>
                      <th>サプライヤー</th>
                      <th>顧客</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>小売販売</td>
                      <td>✕</td>
                      <td>✕</td>
                      <td>✕</td>
                      <td />
                      <td>✕</td>
                    </tr>
                    <tr>
                      <td>在庫管理</td>
                      <td>✕</td>
                      <td>✕</td>
                      <td>✕</td>
                      <td />
                      <td />
                    </tr>
                    <tr>
                      <td>購買（調達）</td>
                      <td>✕</td>
                      <td>✕</td>
                      <td />
                      <td>✕</td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                この一覧表を作る狙いは、個々のデータマートをバラバラに作ってしまい、後から「店舗ディメンションの定義がマートごとに違う」といった不整合が生じるのを防ぐことにあります。コンフォームド・ディメンションとは、複数のファクトテーブルで共通のキー・粒度・属性定義を持つディメンションのことで、これにより異なるビジネスプロセス間でのドリルアクロス（串刺し集計）が可能になります。
              </p>
              <p>
                バスマトリクスは、いきなり企業全体のモデルを作ろうとするInmon流の「一枚岩」アプローチとは異なり、「各データマートは段階的に構築しつつ、全体としては整合性を保つ」というKimball方式の中核をなす仕組みだと言えます。
              </p>
            </div>
          </section>

          <section className="section" id="step9">
            <div className="section-eyebrow">
              <IconTransform aria-hidden="true" size={18} />
              <span>Step 9</span>
            </div>
            <h2>ETLの34のサブシステム</h2>
            <div className="prose">
              <p>
                原著第19〜20章では、ディメンショナルモデルにデータを供給する「バックルーム（ETLシステム）」の設計が扱われます。Kimball Groupは、数百件の成功したデータウェアハウス事例の研究から、ETLアーキテクチャに共通して必要となる要素を34個のサブシステムとして整理しました。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconAdjustments aria-hidden="true" size={18} />
                <span>図10　ETLの4工程と34のサブシステム</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d09} />
              </div>
            </div>
            <div className="prose">
              <div className="table-wrap">
                <table className="center">
                  <thead>
                    <tr>
                      <th>グループ</th>
                      <th>サブシステム数</th>
                      <th>主な内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>抽出（Extracting）</td>
                      <td>3</td>
                      <td>
                        ソースシステムの理解、データ抽出、変更データの検知など、ETLシステムがソースシステムから独立して動作できるようにするための入口部分
                      </td>
                    </tr>
                    <tr>
                      <td>
                        クレンジング＆コンフォーム
                        <br />
                        （Cleaning and Conforming）
                      </td>
                      <td>5</td>
                      <td>
                        データ品質チェック、エラーイベントの記録、コンフォームド・ディメンション／コンフォームド・ファクトへの整形
                      </td>
                    </tr>
                    <tr>
                      <td>デリバリー（Delivering）</td>
                      <td>13</td>
                      <td>
                        SCDの実装、サロゲートキー生成、ファクトテーブルのロード、階層管理など、最終的なディメンショナル構造を組み立てる中核部分
                      </td>
                    </tr>
                    <tr>
                      <td>管理（Managing）</td>
                      <td>13</td>
                      <td>
                        ジョブスケジューリング、バックアップ・リカバリ、セキュリティ、メタデータ管理など、ETL環境全体を運用するための仕組み
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                「ETL」という4文字は世間に広く浸透していますが、実際には「Extracting（抽出）」「Cleaning and Conforming（クレンジングとコンフォーム）」「Delivering（デリバリー）」「Managing（管理）」という4つの大きな工程から構成される、という整理がなされています。初学者がまず押さえておくべきポイントは、ETLは単なる「抽出・変換・ロード」という3語で片付けられるものではなく、SCDの実装やサロゲートキーの採番、ジョブの監視・リカバリまで含む、相応の規模を持つシステムだという認識です。
              </p>
            </div>
          </section>

          <section className="section" id="step10">
            <div className="section-eyebrow">
              <IconListDetails aria-hidden="true" size={18} />
              <span>Step 10</span>
            </div>
            <h2>本書の章ガイド（全21章の早見表）</h2>
            <div className="prose">
              <p>
                本書は第3〜16章にかけて、業界・業務領域別の14のケーススタディを通じて技法を1つずつ積み上げていく構成になっています。実際に原著を読み進める際のロードマップとして、O&apos;Reillyの目次情報をもとに全21章を一覧化しました。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>章</th>
                      <th>タイトル</th>
                      <th>学べる主な技法</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="chapter-badge">1</span></td>
                      <td>Data Warehousing, Business Intelligence, and Dimensional Modeling Primer</td>
                      <td>DW/BIの目的、Kimballのアーキテクチャ、ディメンショナルモデリングにまつわる誤解の解消</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">2</span></td>
                      <td>Kimball Dimensional Modeling Techniques Overview</td>
                      <td>基本〜高度な技法の全体マップ（第3版で新設）</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">3</span></td>
                      <td>Retail Sales</td>
                      <td>4ステップ・デザインプロセス、スタースキーマの基礎、ファクトレス・ファクトテーブル</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">4</span></td>
                      <td>Inventory</td>
                      <td>ファクトテーブルの3類型、バリューチェーン統合、バスマトリクス</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">5</span></td>
                      <td>Procurement</td>
                      <td>SCDの基礎（Type 1〜3）とハイブリッドSCD技法</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">6</span></td>
                      <td>Order Management</td>
                      <td>累積スナップショット・ファクトテーブル、受注と請求の関係</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">7</span></td>
                      <td>Accounting</td>
                      <td>総勘定元帳データ、予算プロセス、コンソリデート・ファクトテーブル</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">8</span></td>
                      <td>Customer Relationship Management</td>
                      <td>多値ディメンションのためのブリッジテーブル、複雑な顧客行動のモデリング</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">9</span></td>
                      <td>Human Resources Management</td>
                      <td>再帰的な従業員階層、多値スキルキーワード属性</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">10</span></td>
                      <td>Financial Services</td>
                      <td>ディメンション・トリアージ、スーパータイプ／サブタイプ・スキーマ</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">11</span></td>
                      <td>Telecommunications</td>
                      <td>設計レビューの進め方、既存データ構造のリモデリング</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">12</span></td>
                      <td>Transportation</td>
                      <td>相関の強いディメンションの統合、日付・時刻の扱い</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">13</span></td>
                      <td>Education</td>
                      <td>累積スナップショット、ファクトレス・ファクトテーブルの応用</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">14</span></td>
                      <td>Healthcare</td>
                      <td>請求と支払い、電子カルテ、遡及的な変更への対応</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">15</span></td>
                      <td>Electronic Commerce</td>
                      <td>クリックストリームのモデリング、チャネル横断の収益性分析</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">16</span></td>
                      <td>Insurance</td>
                      <td>ポリシー／クレームのトランザクションとスナップショット、よくある設計ミスの総まとめ</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">17</span></td>
                      <td>Kimball DW/BI Lifecycle Overview</td>
                      <td>プロジェクトのライフサイクル全体像、よくある落とし穴</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">18</span></td>
                      <td>Dimensional Modeling Process and Tasks</td>
                      <td>モデリングプロジェクトの進め方、チーム編成</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">19</span></td>
                      <td>ETL Subsystems and Techniques</td>
                      <td>34のETLサブシステムの詳細（<a href="#step9">Step 9</a>参照）</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">20</span></td>
                      <td>ETL System Design and Development Process and Tasks</td>
                      <td>ETL計画、初回ロードと増分ロード、リアルタイム対応</td>
                    </tr>
                    <tr>
                      <td><span className="chapter-badge">21</span></td>
                      <td>Big Data Analytics</td>
                      <td>ビッグデータ時代におけるディメンショナルモデリングの位置づけ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section" id="step11">
            <div className="section-eyebrow">
              <IconCloudComputing aria-hidden="true" size={18} />
              <span>Step 11</span>
            </div>
            <h2>ビッグデータ・モダンなクラウド基盤での位置づけ</h2>
            <div className="prose">
              <p>
                本書第3版は2013年の刊行であり、Snowflake・BigQuery・Databricksのような現代的なクラウド型データウェアハウス／レイクハウスや、dbtに代表されるELT主導のモダンデータスタックが本格的に普及する以前に書かれています。そのため「2013年の技法が2026年の基盤でもそのまま通用するのか」という問いは、業界で継続的に議論されてきたテーマです。
              </p>
            </div>
            <div className="diagram-card">
              <div className="diagram-title">
                <IconScale aria-hidden="true" size={18} />
                <span>図11　モダンなデータ基盤における3つのアプローチ</span>
              </div>
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAMS.d11} />
              </div>
            </div>
            <div className="prose">
              <h3>「One Big Table（OBT）」派の主張</h3>
              <p>
                2020年のCoalesceカンファレンスで、dbt Labsコミュニティに向けた講演の中でDave Fowler氏は、Kimballが提唱したディメンショナルモデリングとスタースキーマは、モダンデータスタックの文脈では「害の方が大きい」とまで表現し、その有効性に疑問を投げかけました。この主張の背景には、クラウドの列指向データウェアハウスにおいてはストレージコストが劇的に下がり、Kimballが本を書いた当時ほど非正規化のコストメリットが大きくないという事情があります。この講演に対して、Brooklyn Data Co.のJosh Devlin氏とSydney Burns氏は同じCoalesceの場で「Kimball方式を丸ごと捨てるのではなく、モダンな時代に合わせてアップデートして活かすべきだ」という反論を展開しました。
              </p>
              <h3>Dimension Snapshot（Functional Data Engineering）という第三の道</h3>
              <p>
                Facebook・Airbnb・Lyftなどで採用されてきたアプローチとして、Airflow・Supersetの生みの親として知られるMaxime Beauchemin氏（当時Lyftのシニアデータエンジニア）が2018年のData Council講演、および著名な技術ブログ記事「Functional Data Engineering」で提唱したのが「ディメンション・スナップショット」という手法です。日次・週次でディメンション全体をまるごと新しいテーブルパーティションとして追記していくことで、SCD特有の複雑なUPSERTロジックを回避するという考え方で、同氏は「コンピュートは安い。ストレージは安い。エンジニアの時間は高い」という言葉でこの発想を説明しています。ディメンションデータはファクトデータに比べて小規模であることが多く、10年分を日次スナップショットしても現代のデータウェアハウスにとっては軽微なコストで済む、という考え方です。
              </p>
              <p>
                このアプローチはKimball流のSCD技法そのものを置き換えるものというより、「べき等で再現可能なバッチ処理」という関数型データエンジニアリングの原則のもとで、SCDが解決しようとしていた問題（履歴の保持）を別の実装方法で解決するものだと整理されています。
              </p>
              <h3>それでも色褪せないKimballの基礎</h3>
              <p>
                一方で、Kimballの提唱したスタースキーマ、非正規化されたデータの活用、ファクトテーブルとディメンションテーブルという分割そのものは、分析ワークロードのモデリング手法として時代を超えて強力であるという評価も根強くあります。実際、dbtの公式ドキュメントの用語集でも、ディメンショナルモデリングの4ステップ設計プロセス（ビジネスプロセスの選定→グレイン宣言→ディメンション識別→ファクト識別）は、現代においても変わらず「公式な」設計プロセスとして紹介されています。
              </p>
              <p>
                さらに、dbtと組み合わせることで、ディメンショナルモデリングの持つ「わかりやすさ」を活かしつつ、変換ロジックのテストやバージョン管理をモダンな開発ワークフローに載せられるという実践例も、欧州のコンサルティング企業のブログなどで紹介されています。
              </p>
              <p>
                また、Data Vaultは大規模で複雑なソースシステムを持ち、厳格な監査要件がある大企業・金融機関・政府機関などで、Kimball方式を置き換えるというより「補完する」統合レイヤーとして採用される場面が多いとされています。
              </p>
            </div>
          </section>

          <section className="section" id="step12">
            <div className="section-eyebrow">
              <IconScaleOutline aria-hidden="true" size={18} />
              <span>Step 12</span>
            </div>
            <h2>批判的に読む ── 論争と限界</h2>
            <div className="prose">
              <p>
                初学者であっても、本書を「唯一絶対の正解」として鵜呑みにするのではなく、以下のような批判・限界を踏まえたうえで学ぶことが望ましいと考えられます。
              </p>
            </div>
            <div className="critique-card">
              <div className="c-item">
                <h3>
                  <span className="c-num">1</span>
                  <span>非正規化のコストメリット前提が薄れつつある</span>
                </h3>
                <p>
                  本書のスタースキーマ推奨は、「非正規化によってJOINを減らし、クエリを高速化する」という前提に強く支えられています。しかし列指向のクラウドデータウェアハウスでは、圧縮効率や自動最適化の進化により、正規化度合いが多少高くても十分な性能が出るケースが増えており、上で紹介した「One Big Table」派の主張の背景にもなっています。
                </p>
              </div>
              <div className="c-item">
                <h3>
                  <span className="c-num">2</span>
                  <span>データ冗長性と「単一の真実の源」の欠如</span>
                </h3>
                <p>
                  Kimball方式は個々のデータマート単位でディメンションを非正規化して保持するため、コンフォームド・ディメンションの運用を徹底しないと、データの重複や、企業全体で見たときの「単一の真実の源（Single Source of Truth）」の欠如につながりやすいという指摘があります。これはInmon方式支持者からよく挙げられる批判点です。
                </p>
              </div>
              <div className="c-item">
                <h3>
                  <span className="c-num">3</span>
                  <span>変化への柔軟性</span>
                </h3>
                <p>
                  ボトムアップで積み上げていくKimball方式は、ある業務領域に最適化された構造になりやすい分、事業構造や組織構造が大きく変わった際に、既存のスタースキーマの改修コストが高くなりやすいという指摘もあります。ソースシステムの変化が非常に激しい大企業では、この点がData Vaultのような別方式が選ばれる理由の一つになっています。
                </p>
              </div>
              <div className="c-item">
                <h3>
                  <span className="c-num">4</span>
                  <span>刊行時期による技術的な前提の古さ</span>
                </h3>
                <p>
                  第3版は2013年刊行であり、当時主流だったオンプレミスのMPP型データウェアハウス（Teradata、Netezzaなど）を念頭に置いた記述が多く含まれます。クラウドの分離型ストレージ・コンピュートアーキテクチャ、リアルタイムのストリーミング処理基盤、セマンティックレイヤー／メトリクスレイヤーといった、2020年代以降に一般化した技術要素については当然ながら扱われていません。
                </p>
              </div>
              <div className="c-item">
                <h3>
                  <span className="c-num">5</span>
                  <span>それでも本書が読まれ続ける理由</span>
                </h3>
                <p>
                  上記の批判はいずれも「物理的な実装方法」に関するものが中心であり、「グレインを明確にする」「ファクトとディメンションを分離して考える」「コンフォームド・ディメンションで全社的な一貫性を保つ」といった、Kimballが確立した<strong>概念的な語彙とフレームワーク</strong>そのものは、実装技術が変わった現在でも業界標準の共通言語として使われ続けています。dbtやSnowflakeなど、本書刊行後に登場したモダンなツール群のドキュメントや講演でも、Kimballの用語（グレイン、コンフォームド・ディメンション、SCDなど）がそのまま前提知識として使われていることからも、この点はうかがえます。
                </p>
              </div>
            </div>
            <div className="callout">
              <IconBulb aria-hidden="true" size={16} />
              <strong>読み方のアドバイス:</strong> 本書を「物理設計のマニュアル」としてではなく、「分析用データをどう概念化するか」という思考のフレームワークとして読むと、クラウド時代の今でも十分に得るものが大きい一冊だと言えます。実際の物理実装（パーティション戦略、マテリアライズドビュー、ディメンション・スナップショットの採用可否など）は、利用しているプラットフォームの特性に応じて別途検討するとよいでしょう。
            </div>
          </section>

          <section className="section" id="checklist">
            <div className="section-eyebrow">
              <IconChecklist aria-hidden="true" size={18} />
              <span>まとめ</span>
            </div>
            <h2>学習チェックリスト</h2>
            <DataWarehouseToolkitChecklist />
          </section>

          <section className="section gloss-wrap" id="glossary">
            <div className="section-eyebrow">
              <IconBook aria-hidden="true" size={18} />
              <span>まとめ</span>
            </div>
            <h2>用語集</h2>
            <div className="prose">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>用語</th>
                      <th>説明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ディメンショナルモデリング</td>
                      <td>
                        分析用途に最適化された、ファクトテーブルとディメンションテーブルによるデータモデリング手法
                      </td>
                    </tr>
                    <tr>
                      <td>スタースキーマ</td>
                      <td>中心の1つのファクトテーブルを複数のディメンションテーブルが取り囲む構造</td>
                    </tr>
                    <tr>
                      <td>スノーフレークスキーマ</td>
                      <td>ディメンションをさらに正規化して複数テーブルに分割した構造</td>
                    </tr>
                    <tr>
                      <td>ファクトテーブル</td>
                      <td>
                        業務プロセスの測定イベントを記録するテーブル。通常は数値の測定値（ファクト）とディメンションへの外部キーを持つが、数値のファクトを持たないファクトレス・ファクトテーブルも存在する
                      </td>
                    </tr>
                    <tr>
                      <td>ディメンションテーブル</td>
                      <td>説明的な属性（Who/What/When/Where）を持つテーブル</td>
                    </tr>
                    <tr>
                      <td>グレイン（粒度）</td>
                      <td>ファクトテーブルの1行が表す内容の定義</td>
                    </tr>
                    <tr>
                      <td>サロゲートキー</td>
                      <td>データウェアハウス側で独自に発番される、意味を持たない代理キー</td>
                    </tr>
                    <tr>
                      <td>コンフォームド・ディメンション</td>
                      <td>複数のビジネスプロセスで共有される、統一定義のディメンション</td>
                    </tr>
                    <tr>
                      <td>縮退ディメンション</td>
                      <td>独立したテーブルを持たず、ファクトテーブルに直接残される識別子</td>
                    </tr>
                    <tr>
                      <td>ジャンク・ディメンション</td>
                      <td>小規模なフラグ・インジケータ類をまとめたディメンション</td>
                    </tr>
                    <tr>
                      <td>ロールプレイング・ディメンション</td>
                      <td>同一ディメンションを複数の役割で参照する手法</td>
                    </tr>
                    <tr>
                      <td>ブリッジテーブル</td>
                      <td>多値属性や可変階層を扱うための中間テーブル</td>
                    </tr>
                    <tr>
                      <td>SCD（ゆっくり変化するディメンション）</td>
                      <td>ディメンション属性の変化をどう扱うかを定めた一連の技法（Type 0〜7）</td>
                    </tr>
                    <tr>
                      <td>バスマトリクス</td>
                      <td>ビジネスプロセスとコンフォームド・ディメンションの対応関係を示す一覧表</td>
                    </tr>
                    <tr>
                      <td>34のETLサブシステム</td>
                      <td>Kimball Groupが整理した、ETLアーキテクチャに共通する34の構成要素</td>
                    </tr>
                    <tr>
                      <td>One Big Table（OBT）</td>
                      <td>複数のディメンションをあらかじめ結合してしまう、ワイドなテーブル設計の考え方</td>
                    </tr>
                    <tr>
                      <td>Data Vault</td>
                      <td>Hub／Link／Satelliteの3テーブルで構成される、統合性・監査性重視の代替的モデリング手法</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section" id="references">
            <div className="section-eyebrow">
              <IconLink aria-hidden="true" size={18} />
              <span>まとめ</span>
            </div>
            <h2>参考文献・出典</h2>
            <div className="prose">
              <p>
                原則としてKimball Group公式情報を一次情報とし、加えて国際的に著名なデータエンジニア・企業ブログによる解説・議論を参照しています（アクセス日: 2026年9月）。
              </p>
            </div>

            <div className="ref-group">
              <h3>
                <IconCertificate aria-hidden="true" size={18} />
                <span>一次情報　書誌・公式情報</span>
              </h3>
              <ul className="ref-list">
                <li className="ref-item">
                  <span className="r-title">O&apos;Reilly ― The Data Warehouse Toolkit, 3rd Edition 目次・書誌情報</span>
                  <Ext className="r-url" href="https://www.oreilly.com/library/view/the-data-warehouse/9781118530801/">
                    https://www.oreilly.com/library/view/the-data-warehouse/9781118530801/
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Kimball Group（公式）― 書籍紹介ページ、第3版の変更点</span>
                  <Ext className="r-url" href="https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-toolkit/">
                    https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-toolkit/
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Wiley（出版社公式）― 書籍紹介ページ</span>
                  <Ext className="r-url" href="https://www.wiley.com/en-us/The+Data+Warehouse+Toolkit:+The+Definitive+Guide+to+Dimensional+Modeling,+3rd+Edition-p-9781118530801">
                    https://www.wiley.com/en-us/The+Data+Warehouse+Toolkit:+The+Definitive+Guide+to+Dimensional+Modeling,+3rd+Edition-p-9781118530801
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Kimball Group（公式Design Tip）― グレイン宣言の重要性</span>
                  <Ext className="r-url" href="https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/grain/">
                    https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/grain/
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Kimball Group（公式Design Tip #152）― Slowly Changing Dimension Types 0, 4, 5, 6, 7</span>
                  <Ext className="r-url" href="https://www.kimballgroup.com/2013/02/design-tip-152-slowly-changing-dimension-types-0-4-5-6-7/">
                    https://www.kimballgroup.com/2013/02/design-tip-152-slowly-changing-dimension-types-0-4-5-6-7/
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">InformationWeek（Kimball &amp; Ross 寄稿）― Slowly Changing Dimensions Are Not Always as Easy as 1, 2, 3</span>
                  <Ext className="r-url" href="https://www.informationweek.com/data-management/slowly-changing-dimensions-are-not-always-as-easy-as-1-2-3">
                    https://www.informationweek.com/data-management/slowly-changing-dimensions-are-not-always-as-easy-as-1-2-3
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Kimball Group（公式）― The 34 Subsystems of ETL</span>
                  <Ext className="r-url" href="https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/etl-architecture-34-subsystems/">
                    https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/etl-architecture-34-subsystems/
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Kimball Group（公式）― Fact Table Core Concepts カテゴリページ</span>
                  <Ext className="r-url" href="https://www.kimballgroup.com/category/fact-table-core-concepts/">
                    https://www.kimballgroup.com/category/fact-table-core-concepts/
                  </Ext>
                </li>
              </ul>
            </div>

            <div className="ref-group">
              <h3>
                <IconWorld aria-hidden="true" size={18} />
                <span>百科事典・リファレンス</span>
              </h3>
              <ul className="ref-list">
                <li className="ref-item">
                  <span className="r-title">Wikipedia ― Ralph Kimball（経歴）</span>
                  <Ext className="r-url" href="https://en.wikipedia.org/wiki/Ralph_Kimball">
                    https://en.wikipedia.org/wiki/Ralph_Kimball
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Wikipedia ― Star schema</span>
                  <Ext className="r-url" href="https://en.wikipedia.org/wiki/Star_schema">
                    https://en.wikipedia.org/wiki/Star_schema
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Wikipedia ― Fact table</span>
                  <Ext className="r-url" href="https://en.wikipedia.org/wiki/Fact_table">
                    https://en.wikipedia.org/wiki/Fact_table
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Wikipedia ― Slowly changing dimension</span>
                  <Ext className="r-url" href="https://en.wikipedia.org/wiki/Slowly_changing_dimension">
                    https://en.wikipedia.org/wiki/Slowly_changing_dimension
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Wikipedia ― Dimensional modeling</span>
                  <Ext className="r-url" href="https://en.wikipedia.org/wiki/Dimensional_modeling">
                    https://en.wikipedia.org/wiki/Dimensional_modeling
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Wikipedia ― Data mart（コンフォームド・ディメンション）</span>
                  <Ext className="r-url" href="https://en.wikipedia.org/wiki/Data_mart">
                    https://en.wikipedia.org/wiki/Data_mart
                  </Ext>
                </li>
              </ul>
            </div>

            <div className="ref-group">
              <h3>
                <IconCloud aria-hidden="true" size={18} />
                <span>モダンなクラウド基盤の視点　国際的に著名な開発者・企業ブログ</span>
              </h3>
              <ul className="ref-list">
                <li className="ref-item">
                  <span className="r-title">Maxime Beauchemin（Airflow/Superset開発者, Medium）― Functional Data Engineering: a modern paradigm for batch data processing</span>
                  <Ext className="r-url" href="https://maximebeauchemin.medium.com/functional-data-engineering-a-modern-paradigm-for-batch-data-processing-2327ec32c42a">
                    https://maximebeauchemin.medium.com/functional-data-engineering-a-modern-paradigm-for-batch-data-processing-2327ec32c42a
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">dbt Labs / Coalesce ― Babies and bathwater: Is Kimball still relevant?（講演）</span>
                  <Ext className="r-url" href="https://coalesce.getdbt.com/blog/babies-and-bathwater-is-kimball-still-relevant">
                    https://coalesce.getdbt.com/blog/babies-and-bathwater-is-kimball-still-relevant
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">dbt Labs（公式ドキュメント）― Glossary: Dimensional modeling</span>
                  <Ext className="r-url" href="https://docs.getdbt.com/terms/dimensional-modeling">
                    https://docs.getdbt.com/terms/dimensional-modeling
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Holistics ― Kimball&apos;s Dimensional Data Modeling（Analytics Setup Guidebook）</span>
                  <Ext className="r-url" href="https://www.holistics.io/books/setup-analytics/kimball-s-dimensional-data-modeling/">
                    https://www.holistics.io/books/setup-analytics/kimball-s-dimensional-data-modeling/
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Holistics ― The Three Types of Fact Tables</span>
                  <Ext className="r-url" href="https://holistics.io/blog/the-three-types-of-fact-tables">
                    https://holistics.io/blog/the-three-types-of-fact-tables
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Databricks（公式ブログ）― Loading a Data Warehouse Slowly Changing Dimension Type 2 Using Matillion on Databricks Lakehouse Platform</span>
                  <Ext className="r-url" href="https://databricks.com/blog/2023/01/25/loading-data-warehouse-slowly-changing-dimension-type-2-using-matillion.html">
                    https://databricks.com/blog/2023/01/25/loading-data-warehouse-slowly-changing-dimension-type-2-using-matillion.html
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">MotherDuck ― 用語集: Grain</span>
                  <Ext className="r-url" href="https://motherduck.com/glossary/grain/">
                    https://motherduck.com/glossary/grain/
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">TDWI ― Data Vault Modeling: An Alternative to Dimensional Modeling</span>
                  <Ext className="r-url" href="https://tdwi.org/blogs/data-101/2026/05/data-vault-modeling.aspx">
                    https://tdwi.org/blogs/data-101/2026/05/data-vault-modeling.aspx
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Keboola ― Kimball vs Inmon: Which approach should you choose</span>
                  <Ext className="r-url" href="https://www.keboola.com/blog/kimball-vs-inmon.md">
                    https://www.keboola.com/blog/kimball-vs-inmon.md
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Hightouch ― Modern Data Warehouse Modelling: The Definitive Guide - Part 2</span>
                  <Ext className="r-url" href="https://www.hightouch.com/blog/data-warehouse-modelling-part-2">
                    https://www.hightouch.com/blog/data-warehouse-modelling-part-2
                  </Ext>
                </li>
                <li className="ref-item">
                  <span className="r-title">Xebia ― Kimball dimensional modelling（dbtとの組み合わせ事例）</span>
                  <Ext className="r-url" href="https://xebia.com/blog/kimball-dimensional-modelling/">
                    https://xebia.com/blog/kimball-dimensional-modelling/
                  </Ext>
                </li>
              </ul>
            </div>
          </section>

          <footer className="footer">
            <div className="disclaimer">
              <IconAlertCircle aria-hidden="true" size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
              <div>
                本ガイドは公開情報および原著の目次情報をもとに独自に作成した学習補助資料です。内容の正確性には配慮していますが、実務での設計判断や試験対策には、必ず原著および一次情報（Kimball Group公式サイト等）をご確認ください。原著の文章を転載するものではなく、内容の要点を独自の言葉と図解で再構成したものです。
              </div>
            </div>
            <div>
              <strong>The Data Warehouse Toolkit 完全読解ガイド</strong> ― 非公式学習補助資料
            </div>
            <div>
              原著: Ralph Kimball, Margy Ross『The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling, 3rd Edition』(Wiley, 2013)
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
