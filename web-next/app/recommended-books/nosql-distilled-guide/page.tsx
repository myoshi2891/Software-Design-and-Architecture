import {
  IconAffiliate,
  IconAlertTriangle,
  IconBook,
  IconBook2,
  IconCalendarTime,
  IconChecklist,
  IconCircleCheck,
  IconDatabase,
  IconFlag,
  IconGitCommit,
  IconHelpCircle,
  IconInfinity,
  IconInfoCircle,
  IconLanguage,
  IconLink,
  IconListCheck,
  IconNetwork,
  IconRefresh,
  IconRelationManyToMany,
  IconRoute,
  IconScale,
  IconShare2,
  IconSitemap,
  IconStack2,
  IconTimeline,
  IconUsers,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import NosqlDistilledChecklist from "./NosqlDistilledChecklist";
import NosqlDistilledSidebar from "./NosqlDistilledSidebar";

export const metadata: Metadata = {
  title: "『NoSQL Distilled』初学者向け完全ガイド ― ポリグロット・パーシステンスの世界へ",
  description:
    "Pramod J. SadalageとMartin Fowlerによる名著『NoSQL Distilled』を、全15章の構成に沿ってステップバイステップで解説。4つのデータモデル、分散モデル、一貫性、ポリグロット・パーシステンスを2026年時点の最新補足付きで体系的に学びます。",
};

const MERMAID_INIT = `%%{init: {"theme": "base", "themeVariables": { "fontFamily": "Noto Sans JP, sans-serif", "fontSize": "16px", "primaryColor": "#ffffff", "primaryTextColor": "#2b2620", "primaryBorderColor": "#d7cbac", "lineColor": "#9a8f78", "secondaryColor": "#f2ecdd", "tertiaryColor": "#f8f4ea", "clusterBkg": "#f2ecdd", "clusterBorder": "#d7cbac", "edgeLabelBackground": "#f8f4ea" }}}%%`;

const CLASS_DEFS = `
classDef hub fill:#c9c4ef,stroke:#4b3fa0,stroke-width:1.5px,color:#221f52;
classDef box fill:#f3e3b8,stroke:#7d5c14,stroke-width:1.5px,color:#4a3a0a;
classDef done fill:#bfe4d2,stroke:#1f6d47,stroke-width:1.5px,color:#123722;`;

function makeChart(body: string, applyClasses = ""): string {
  return `${MERMAID_INIT}\n${body}\n${CLASS_DEFS}${applyClasses ? `\n${applyClasses}` : ""}`;
}

const chartD01 = makeChart(
  `flowchart TD
    Start(["この記事を読み始める"]) --> Q1{"RDBの経験は？"}
    Q1 -->|"初めて聞く"| A["Step0から順番に読む"]
    Q1 -->|"RDBは知っている"| B["Step0で差分だけ確認"]
    A --> Core["Step1〜Step6　中核概念"]
    B --> Core
    Core --> Impl["Step7〜Step10　4種類の実装"]
    Impl --> Ops["Step11〜Step14　運用と使い分け"]
    Ops --> Now["2026年時点の補足"]
    Now --> Goal(["自分のプロジェクトでNoSQLを検討できる"])`,
  "class Start,Goal done;\nclass Q1 box;"
);

const chartD02 = makeChart(
  `flowchart TD
    Title["NoSQL Distilled　全15章"] --> C1["1章　なぜNoSQLか"]
    C1 --> C2["2章　集約データモデル"]
    C2 --> C3["3章　データモデルの詳細"]
    C3 --> C4["4章　分散モデル"]
    C4 --> C5["5章　一貫性"]
    C5 --> C6["6章　バージョンスタンプ"]
    C6 --> C7["7章　Map-Reduce"]
    C7 -.->|"Part Iから Part IIへ"| C8["8章　キーバリュー"]
    C8 --> C9["9章　ドキュメント"]
    C9 --> C10["10章　カラムファミリー"]
    C10 --> C11["11章　グラフ"]
    C11 --> C12["12章　スキーマ移行"]
    C12 --> C13["13章　ポリグロット・パーシステンス"]
    C13 --> C14["14章　NoSQLを超えて"]
    C14 --> C15["15章　データベースの選び方"]`,
  "class Title hub;\nclass C15 done;"
);

const chartD03 = makeChart(
  `flowchart TD
    A["アプリ内のオブジェクト　メモリ上の構造"] -->|"変換が必要"| B["インピーダンス・ミスマッチ"]
    B --> C["リレーショナルの表形式　正規化されたテーブル群"]
    D["1台のサーバーでは捌けないデータ量"] --> E["クラスタでの運用が前提"]
    E --> F["当時主流の単一ノード中心のRDB製品はクラスタ向けに設計されていない"]
    B --> G["NoSQLの誕生"]
    F --> G
    G --> H["スキーマレスなデータモデル　＋　クラスタ前提の分散設計"]`,
  "class G hub;\nclass H done;"
);

const chartD05 = makeChart(
  `flowchart TD
    Root["4つのデータモデル"] --> KV["キーバリュー　Key-Value"]
    Root --> Doc["ドキュメント　Document"]
    Root --> Col["カラムファミリー　Column-Family"]
    Root --> Graph["グラフ　Graph"]
    KV --> KVd["値は不透明なBlob　キーで一意に取得"]
    Doc --> Docd["値はJSON等の構造化データ　フィールド単位でも問い合わせ可"]
    Col --> Cold["行キー＋列ファミリーで大量データを疎に格納"]
    Graph --> Graphd["ノードとエッジで関係そのものを第一級に扱う"]
    KVd --- Agg["集約指向　Aggregate-Oriented"]
    Docd --- Agg
    Cold --- Agg
    Graphd --- NonAgg["非集約指向　関係を横断した問い合わせが得意"]`,
  "class Root hub;\nclass Agg,NonAgg done;"
);

const chartD04 = makeChart(
  `flowchart TD
    R1["顧客テーブル　customers"] --> R2["注文テーブル　orders"]
    R2 --> R3["注文明細テーブル　order_items"]
    R2 --> R4["請求先住所テーブル　billing_address"]
    R2 -.->|"同じ業務データを異なる形で表現"| A1["1件のOrder集約　注文明細＋配送先＋顧客情報のスナップショットを1つの単位として保存"]
    A1 --> Note["クラスタ分散の境界になりうる　原子的な更新の境界になるのはデータストアの原子性単位が集約全体を覆う場合のみ"]`,
  "class A1 hub;\nclass Note done;"
);

const chartD06 = makeChart(
  `flowchart LR
    U1((("田中"))) -->|"友人"| U2((("佐藤")))
    U2 -->|"友人"| U3((("鈴木")))
    U1 -->|"購入"| P1["商品A"]
    U3 -->|"購入"| P1
    U2 -->|"閲覧"| P2["商品B"]
    P1 -.->|"よく一緒に買われる"| P2`,
  ""
);

const chartD07 = makeChart(
  `flowchart TD
    S["単一サーバー　Single Server"] --> Sh["シャーディング　Sharding"]
    S --> Rep["レプリケーション　Replication"]
    Sh --> ShD["データを分割して複数ノードに配置　書き込みを分散"]
    Rep --> MS["マスター・スレーブ型"]
    Rep --> P2P["ピアツーピア型"]
    MS --> MSd["更新は1つのマスターに集約　読み取りをスレーブに分散"]
    P2P --> P2Pd["全ノードが対等　読み書きどちらも分散できる"]
    ShD --> Combo["シャーディング＋レプリケーションの併用"]
    MSd --> Combo
    P2Pd --> Combo
    Combo --> Result["実運用の多くはこの組合せ"]`,
  "class S hub;\nclass Combo done;"
);

const chartD08 = makeChart(
  `flowchart TD
    P["分断耐性　Partition Tolerance　ネットワークは分断されうる　＝　選ぶものではなく前提条件"]
    P --> Choice{"分断が起きている間　どちらを優先するか"}
    Choice -->|"一貫性を優先"| C["一貫性　Consistency　読み取りは直前の書き込みを反映する　厳密には線形化可能性"]
    Choice -->|"可用性を優先"| A["可用性　Availability　故障していないノードは必ず応答を返す"]
    C --> CP["CP型　例　一部のRDB系分散DB"]
    A --> AP["AP型　例　Riak, Cassandra系"]`,
  "class P hub;\nclass CP,AP done;"
);

const chartD09 = makeChart(
  `flowchart TD
    R1["クライアントがノードAとノードBの両方からversion1を読み取る"] --> U1["ノードAへversion1を根拠に更新を送信"]
    U1 --> S1["ノードAが更新を受理し　version2になる"]
    S1 --> U2["ノードBへも古いversion1を根拠に更新を送信"]
    U2 --> D1{"ノードBがバージョンを比較"}
    D1 -->|"version1は既に古い"| Conflict["競合を検出"]
    Conflict --> Merge["マージするかどちらかを採用するかを決める"]`,
  "class Conflict box;\nclass Merge done;"
);

const chartD10 = makeChart(
  `flowchart TD
    Data[("大量の生データ")] --> Split["データをパーティション分割"]
    Split --> M1["Mapタスク1"]
    Split --> M2["Mapタスク2"]
    Split --> M3["Mapタスク3"]
    M1 --> Shuffle["キーごとに結果をまとめる"]
    M2 --> Shuffle
    M3 --> Shuffle
    Shuffle --> R1["Reduceタスク1"]
    Shuffle --> R2["Reduceタスク2"]
    R1 --> Out[("集計結果")]
    R2 --> Out`,
  "class Data hub;\nclass Out done;"
);

const chartD11 = makeChart(
  `flowchart TD
    Q["どんなデータをどう使いたいか？"]
    Q -->|"単純なキー取得　高速なキャッシュ"| KV["キーバリューストア　例　Redis, DynamoDB"]
    Q -->|"半構造化データ　柔軟なスキーマ"| Doc["ドキュメントDB　例　MongoDB, CouchDB"]
    Q -->|"膨大な書き込み　時系列やログ"| Col["カラムファミリー　例　Cassandra, HBase"]
    Q -->|"複雑な関係の探索　推薦や不正検知"| Graph["グラフDB　例　Neo4j"]
    KV --> KVng["苦手　値の中身を条件検索すること"]
    Doc --> Docng["苦手になりうる　複数集約を横断するトランザクション　製品・構成・性能要件による"]
    Col --> Colng["苦手　柔軟なアドホッククエリや複雑な結合"]
    Graph --> Graphng["苦手　クラスタ全体への単純な水平分散"]`,
  "class Q hub;"
);

const chartD12 = makeChart(
  `flowchart TD
    A["アプリのコード変更"] --> B["マイグレーションスクリプトを追加"]
    B --> C["バージョン管理下のマイグレーション列に登録"]
    C --> D{"適用先は？"}
    D -->|"RDB"| E["ALTER TABLE等でスキーマそのものを変更"]
    D -->|"NoSQL"| F["新旧の形式をアプリ側で両対応させる"]
    F --> G["データに触れた時点で順次新形式へ書き換え　増分的マイグレーション"]
    E --> H["デプロイのたびにマイグレーションを自動適用"]
    G --> H`,
  "class A hub;\nclass H done;"
);

const chartD13 = makeChart(
  `flowchart LR
    App["1つのアプリケーション"]
    App --> S1["ショッピングカート　→　キーバリュー"]
    App --> S2["商品カタログ　→　ドキュメントDB"]
    App --> S3["レコメンド　→　グラフDB"]
    App --> S4["注文履歴の分析　→　カラムファミリー"]
    App --> S5["決済・在庫の整合性　→　リレーショナルDB"]
    S1 --> Svc["各データストアはサービス層の裏に隠蔽する"]
    S2 --> Svc
    S3 --> Svc
    S4 --> Svc
    S5 --> Svc
    Svc --> Warn["注意　運用対象が増えるほどデプロイと監視の複雑さも増す"]`,
  "class App hub;\nclass Warn box;"
);

const chartD14 = makeChart(
  `flowchart LR
    Root["NoSQLの枠を超えた永続化の選択肢"]
    Root --> FS["ファイルシステム　大きなバイナリの保管"]
    Root --> ES["イベントソーシング　状態でなく変更履歴を保存"]
    Root --> MI["メモリイメージ　全データをメモリ上に保持"]
    Root --> VC["バージョン管理システム　Gitのようなツールをデータ管理に応用"]
    Root --> XML["XMLデータベース"]
    Root --> OD["オブジェクトデータベース"]
    ES --> ESd["監査ログや時系列の巻き戻しに強い"]`,
  "class Root hub;"
);

const chartD15 = makeChart(
  `flowchart TD
    Start{"データベースを選ぶ基準は？"}
    Start --> Prod["プログラマの生産性　データモデルがアプリと自然に噛み合うか"]
    Start --> Perf["データアクセス性能　必要な規模・レイテンシを満たせるか"]
    Prod --> Try["まずは小さくプロトタイプで試す"]
    Perf --> Try
    Try --> Default["よくわからなければまずRDBという既定路線も有効"]
    Try --> Hedge["複数候補を並行検証して賭けを分散する　Hedging Your Bets"]
    Default --> Decide(["要件に応じて技術を選択する"])
    Hedge --> Decide`,
  "class Start hub;\nclass Decide done;"
);

const chartD16 = makeChart(
  `flowchart TD
    Y2012["2012年　本書NoSQL Distilled刊行"] --> Y2015["2015年　KleppmannがCAP批判の論文を発表"]
    Y2015 --> Y2017a["2017年　Riakの開発元Bashoが経営破綻"]
    Y2017a --> Y2017b["2017年　Designing Data-Intensive Applications初版刊行"]
    Y2017b --> Y2020["2020年代前半　クラウドマネージド型が主流に　DynamoDB, Cosmos DB等"]
    Y2020 --> Y2026a["2026年　Designing Data-Intensive Applications第2版刊行"]
    Y2026a --> Y2026b["2026年　MongoDBが文書DB首位を維持しつつポリグロット・パーシステンスが定着"]`,
  "class Y2012 hub;\nclass Y2026b done;"
);

export default function NosqlDistilledGuidePage() {
  return (
    <div className="nosql-distilled-guide">
      <div className="shell">
        <NosqlDistilledSidebar />

        <main className="main">
          <div className="content">
            <div className="hero">
              <div className="hero-kicker">初学者向け完全ガイド</div>
              <h1>
                『NoSQL Distilled』
                <br />
                ポリグロット・パーシステンスの世界へ
              </h1>
              <div className="hero-meta">
                原題:{" "}
                <em>
                  NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence
                </em>
                <br />
                著者: Pramod J. Sadalage / Martin Fowler　出版: Addison-Wesley
                Professional（2012年）
                <br />
                O'Reilly収録ページ:{" "}
                <Ext href="https://www.oreilly.com/library/view/nosql-distilled-a/9780133036138/">
                  oreilly.com/library/view/nosql-distilled-a/9780133036138
                </Ext>
              </div>
              <div className="hero-badges">
                <span className="tag">
                  <IconDatabase size={16} /> 全15章
                </span>
                <span className="tag">
                  <IconLanguage size={16} /> ポリグロット・パーシステンス
                </span>
                <span className="tag">
                  <IconCalendarTime size={16} /> 2026年9月時点の補足付き
                </span>
              </div>
            </div>

            <section className="section" id="about">
              <h2>
                <IconInfoCircle className="ti" size={24} />
                この記事について
              </h2>
              <p>
                このガイドは、Pramod J. SadalageとMartin Fowlerによる名著『NoSQL Distilled』を、
                <strong>RDB（リレーショナルデータベース）しか触ったことがない初学者</strong>
                でも迷わず読み進められるように、全15章の構成に沿ってステップバイステップで解説したものです。
              </p>
              <p>
                本書はわずか192ページ（実質152ページ）の薄い本ですが、その分「特定の製品の使い方」ではなく「NoSQLというジャンル全体を貫く概念」を凝縮して説明することに徹しています。だからこそ、2012年の初版刊行から10年以上経った今でも、多くの現場で「NoSQLを学ぶなら最初の1冊」として紹介され続けています。
              </p>
              <div className="keypoints">
                <div className="keypoints-title">
                  <IconListCheck className="ti" size={20} />
                  このガイドの特徴
                </div>
                <ul>
                  <li>各章のポイントをかみ砕いて説明</li>
                  <li>
                    図解はすべて<strong>Mermaid</strong>
                    のフローチャートで表現（ASCIIアートは不使用）
                  </li>
                  <li>
                    2012年刊行という原著の限界を補うため、<strong>2026年9月時点の最新情報</strong>
                    も要所で補足
                  </li>
                  <li>巻末に一次情報源・著名な開発者の書評へのURLをまとめて掲載</li>
                </ul>
              </div>
            </section>

            <section className="section" id="book-info">
              <h2>
                <IconBook className="ti" size={24} />
                本書について
              </h2>
              <div className="table-wrap">
                <div className="table-title">書籍データ</div>
                <table className="kv-table">
                  <tbody>
                    <tr>
                      <th>原題</th>
                      <td>
                        NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence
                      </td>
                    </tr>
                    <tr>
                      <th>著者</th>
                      <td>Pramod J. Sadalage、Martin Fowler</td>
                    </tr>
                    <tr>
                      <th>出版社</th>
                      <td>Addison-Wesley Professional（Martin Fowler Signature Series）</td>
                    </tr>
                    <tr>
                      <th>刊行</th>
                      <td>2012年8月</td>
                    </tr>
                    <tr>
                      <th>ページ数</th>
                      <td>192ページ（O'Reilly掲載値）／著者自身は「152ページ」と紹介</td>
                    </tr>
                    <tr>
                      <th>ISBN</th>
                      <td>978-0-321-82662-6</td>
                    </tr>
                    <tr>
                      <th>受賞</th>
                      <td>Dr. Dobb's Jolt Awards 2013 ファイナリスト</td>
                    </tr>
                    <tr>
                      <th>構成</th>
                      <td>Part I: Understand（1〜7章）／Part II: Implement（8〜15章）</td>
                    </tr>
                    <tr>
                      <th>登場する代表製品</th>
                      <td>Riak、MongoDB、Cassandra、Neo4j</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                著者の Pramod J. Sadalage は ThoughtWorks
                のプリンシパルコンサルタントで、データベース専門家とアプリケーション開発者の橋渡し役を務め、Scott
                Ambler との共著『Refactoring Databases』でも知られます。もう一人の著者 Martin Fowler
                は『Refactoring』『Patterns of Enterprise Application
                Architecture』などで知られるソフトウェア設計の第一人者で、当時 ThoughtWorks の Chief
                Scientist を務めていました。
              </p>
            </section>

            <section className="section" id="audience">
              <h2>
                <IconUsers className="ti" size={24} />
                対象読者
              </h2>
              <ul>
                <li>RDB（MySQL、PostgreSQLなど）は使ったことがあるが、NoSQLは名前しか知らない人</li>
                <li>「NoSQLって結局どれを使えばいいの？」という疑問をざっくり整理したい人</li>
                <li>
                  CAP定理、シャーディング、Map-Reduceといった用語を聞いたことはあるが説明できない人
                </li>
                <li>アーキテクトとして技術選定の土台となる語彙と判断軸を身につけたい人</li>
              </ul>
              <p>
                前提知識として、SQLの基本的なテーブル操作（SELECT・JOINなど）を知っていれば十分です。特定のNoSQL製品の操作経験は不要です。
              </p>
            </section>

            <section className="section" id="roadmap">
              <h2>
                <IconRoute className="ti" size={24} />
                学習ロードマップ
              </h2>
              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconRoute className="ti" size={20} />
                  この記事をどう読み進めるか
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD01} />
                </div>
              </div>
            </section>

            <section className="section" id="structure">
              <h2>
                <IconSitemap className="ti" size={24} />
                本書全体の構成
              </h2>
              <p>
                原著は「Part I: Understand（概念を理解する）」と「Part II:
                Implement（実装として選ぶ）」の2部・全15章から成ります。本ガイドのStep番号は、この15章にそのまま対応しています。
              </p>
              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconSitemap className="ti" size={20} />
                  全15章の流れ
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD02} />
                </div>
              </div>
            </section>

            <section className="section" id="step0">
              <h2>
                <span className="step-badge">0</span>なぜNoSQLなのか
                <span className="chapter-tag">第1章 Why NoSQL?</span>
              </h2>

              <h3>RDBは20年以上ずっと「唯一の答え」だった</h3>
              <p>
                著者らは本書の冒頭で、エンタープライズの世界では長年「データはリレーショナルデータベースに保存するもの」という前提が揺るがなかった、と振り返っています。RDBには、
              </p>
              <ul>
                <li>永続化（Persistence）</li>
                <li>同時実行制御（Concurrency Control）</li>
                <li>アプリケーション間のデータ統合（Integration）</li>
              </ul>
              <p>
                という3つの役割があり、これらを一手に引き受けてきました。データはプログラムよりも長生きするため、枯れた技術で安定してアクセスできることには大きな価値があります。
              </p>

              <h3>2つのほころび</h3>
              <p>その安定した王座に、2つの方向からほころびが生じます。</p>
              <ol>
                <li>
                  <strong>インピーダンス・ミスマッチ（Impedance Mismatch）</strong>
                  <br />
                  アプリケーション内のオブジェクト（メモリ上の入れ子構造）と、正規化されたリレーショナルのテーブル群は形が異なります。この変換コストが開発者を悩ませ続けてきました。
                </li>
                <li>
                  <strong>クラスタの襲来（Attack of the Clusters）</strong>
                  <br />
                  GoogleやAmazonのような大規模サービスは、1台の巨大なサーバーではなく、安価なコモディティサーバーを大量に束ねたクラスタでデータを扱う必要に迫られました。しかし、当時広く使われていたRDB製品の多くは単一ノードでの動作を中心に設計されており、クラスタ上で水平に分散させることは前提になっていませんでした（本書刊行後に普及したGoogle
                  SpannerやCockroachDBのような分散SQLは、RDBのモデルを保ったままこの前提を覆しています）。
                </li>
              </ol>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconHelpCircle className="ti" size={20} />
                  NoSQLが生まれた背景
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD03} />
                </div>
              </div>

              <h3>「NoSQL」という言葉自体があいまい</h3>
              <p>
                面白いことに、著者らは「NoSQLには厳密な定義がない」とはっきり書いています。特定の設計思想から生まれた言葉ではなく、Cassandra・MongoDB・Neo4j・Riakのような最近の非リレーショナルなデータベース群を指すために後から貼られたラベル（偶然生まれた新造語、"accidental
                neologism"）に過ぎません。強いて共通点を挙げるなら、
              </p>
              <ul>
                <li>スキーマレスなデータを扱う</li>
                <li>クラスタ上で動くことを前提にしている</li>
                <li>
                  伝統的な一貫性を、他の有用な性質（可用性やスケーラビリティ）とトレードオフできる
                </li>
                <li>多くがオープンソースである</li>
                <li>21世紀のウェブ規模の需要を意識して作られている</li>
              </ul>
              <p>といった「傾向」にすぎません。NoSQLを採用する主な動機は2つに整理できます。</p>
              <ol>
                <li>
                  <strong>クラスタでの大規模なデータアクセス</strong>を、適切なコストで実現したい
                </li>
                <li>
                  リレーショナルなデータモデルがそぐわない場面で、
                  <strong>より生産性の高いデータモデル</strong>を使いたい
                </li>
              </ol>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第1章のまとめ）
                </div>
                <ul>
                  <li>
                    RDBは20年間、永続化・同時実行制御・アプリケーション統合を担ってきた成功した技術である
                  </li>
                  <li>
                    アプリ開発者は、リレーショナルモデルとメモリ上のデータ構造の「インピーダンス・ミスマッチ」に苛立ってきた
                  </li>
                  <li>
                    データベースを統合ポイントとして使う発想から、アプリケーション側でデータを抱え込みサービス経由で連携する発想への移行が進んでいる
                  </li>
                  <li>
                    データストアの変化を後押しした決定的な要因は、クラスタで大量データを扱う必要性だった
                  </li>
                  <li>
                    当時広く使われていた従来の単一ノード中心のRDB製品は、クラスタで効率よく動くようには設計されていなかった
                  </li>
                  <li>
                    「NoSQL」は厳密な定義を持たない偶発的な新造語であり、共通の特徴を観察できるだけである
                  </li>
                </ul>
              </div>
            </section>

            <section className="section" id="step1">
              <h2>
                <span className="step-badge">1</span>集約データモデル
                <span className="chapter-tag">第2章 Aggregate Data Models</span>
              </h2>

              <h3>リレーショナルモデルには「モデル」が一つしかない</h3>
              <p>
                RDBの大きな強みの一つは、どの製品を使っても基本的なデータモデル（テーブル・行・列）が同じであることです。一方でNoSQLには単一の共通モデルがなく、代表的なものだけでも4種類に分かれます。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconStack2 className="ti" size={20} />
                  4つのデータモデル
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD05} />
                </div>
              </div>

              <h3>集約（Aggregate）という考え方</h3>
              <p>
                キーバリュー・ドキュメント・カラムファミリーの3つに共通するのが「
                <strong>集約（Aggregate）</strong>
                」という単位です。集約とは、ドメイン駆動設計（DDD）由来の概念で、「ひとまとまりとして扱いたいデータの集合」を指します。たとえば注文（Order）であれば、注文明細・配送先住所に加え、注文時点の顧客情報（氏名など）のスナップショットを1つの集約としてまとめて保存し、1回の操作で読み書きします。顧客そのものは別の顧客（Customer）集約として管理し、注文集約からは顧客IDで参照します。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconRelationManyToMany className="ti" size={20} />
                  リレーショナル vs 集約指向
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD04} />
                </div>
              </div>

              <p>集約という単位を導入すると、次の2つのメリットが生まれます。</p>
              <ol>
                <li>
                  <strong>クラスタへの分散が自然になる</strong>
                  ：集約ごとデータベースが1つのノードに配置できれば、複数ノードにまたがるやり取りを減らせる
                </li>
                <li>
                  <strong>ACID的な操作の境界が明確になる</strong>
                  ：データストアの原子性の単位が集約全体を覆う場合に限り、1つの集約に対する更新を原子的に行える（原子性の単位が1ドキュメント・1行などに限られる製品では、集約がその単位を超えた時点で原子性は保証されない）
                </li>
              </ol>
              <p>
                一方で、
                <strong>
                  集約をまたいだ関係（inter-aggregate
                  relationships）は、集約内の関係（intra-aggregate
                  relationships）よりも扱いにくくなる
                </strong>
                というトレードオフも生まれます。これは次のStepで詳しく見ます。
              </p>

              <div className="table-wrap">
                <div className="table-title">集約指向 vs 非集約指向</div>
                <table>
                  <thead>
                    <tr>
                      <th>観点</th>
                      <th>集約指向（KV・ドキュメント・カラムファミリー）</th>
                      <th>非集約指向（グラフDB）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>得意なアクセスパターン</td>
                      <td>同じ集約をまとめて読み書きする処理</td>
                      <td>データを様々な切り口で組み合わせて使う処理</td>
                    </tr>
                    <tr>
                      <td>クラスタ分散のしやすさ</td>
                      <td>
                        集約単位で分散しやすい（原子性の単位とは独立に、集約を分散の境界にできる）
                      </td>
                      <td>関係をまたぐため分散は難しくなりがち</td>
                    </tr>
                    <tr>
                      <td>原子的な更新</td>
                      <td>
                        データストアの原子性単位が集約全体を覆う場合に限り、集約内の更新を原子的に行える
                      </td>
                      <td>製品ごとのトランザクション機能に依存</td>
                    </tr>
                    <tr>
                      <td>向いている例</td>
                      <td>ショッピングカート、ユーザープロファイル</td>
                      <td>ソーシャルグラフ、レコメンド、不正検知</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第2章のまとめ）
                </div>
                <ul>
                  <li>
                    集約とは、ひとまとまりとして扱うデータの集合である。集約自体が原子性を保証するわけではなく、データストアの原子性の単位が集約全体を覆う場合に限って、ACID操作の境界になる
                  </li>
                  <li>
                    キーバリュー・ドキュメント・カラムファミリーは、いずれも集約指向データベースの一形態とみなせる
                  </li>
                  <li>集約はクラスタ上でのデータ管理をしやすくする</li>
                  <li>
                    集約指向データベースは、同じ集約への操作が中心の場合にうまく機能する。逆に多様な形でデータを組み合わせて使う場合は、非集約指向（＝RDBやグラフDB）の方が向く
                  </li>
                  <li>
                    集約指向データベースでは、集約をまたぐ関係の扱いが、集約内の関係よりも難しくなる
                  </li>
                </ul>
              </div>
            </section>

            <section className="section" id="step2">
              <h2>
                <span className="step-badge">2</span>データモデルの詳細
                <span className="chapter-tag">第3章 More Details on Data Models</span>
              </h2>
              <p>
                第3章では、集約指向だけでは語りきれない話題――関係の扱い、グラフDB、スキーマレス、マテリアライズドビュー――を掘り下げます。
              </p>

              <h3>集約をまたぐ関係の扱い方</h3>
              <p>集約指向データベースでは、集約をまたぐ関係を表現する主な方法が2つあります。</p>
              <ul>
                <li>
                  <strong>他の集約のIDを値として保持する</strong>
                  （RDBの外部キーに近い発想）。ただし整合性はアプリケーション側の責任になる
                </li>
                <li>
                  <strong>集約の中に相手のデータをコピーして埋め込む</strong>
                  。読み取りは速くなるが、更新時に複数箇所を書き換える必要が出る
                </li>
              </ul>
              <p>
                集約をまたぐ「結合（JOIN）」に相当する処理は、RDBほど汎用的には扱えません。ただし一律に不可能というわけではなく、たとえばMongoDBは
                <code>$lookup</code>
                でコレクション間の結合を実行できます。サポート範囲（結合の種類、シャード構成での制限など）や性能特性は製品ごとに大きく異なるため、要件を満たせない場合はアプリケーションコード側で複数回のアクセスに分解して実装することになります。
              </p>

              <h3>グラフデータベースという逆方向のアプローチ</h3>
              <p>
                ここで登場するのがグラフデータベースです。グラフDBは集約指向とは正反対の発想を取ります。大きな集約にまとめるのではなく、
                <strong>
                  小さなノード（頂点）とエッジ（辺）の集合として、関係そのものを第一級のデータとして扱います
                </strong>
                。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconShare2 className="ti" size={20} />
                  グラフデータベースの例
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD06} />
                </div>
              </div>

              <p>
                グラフDBのクエリは「隣接するノードをたどる」処理に最適化されており、「友人の友人で、かつ同じ商品を買った人」のような多段階の関係をたどる問い合わせで有利になりやすい構造です。ただしRDBの多段JOINに対して常に速いわけではなく、優劣はワークロード（ホップ数・分岐数・結果件数）とスキーマ設計、インデックスの有無に左右されるため、比較には対象ワークロードを定めたベンチマークが必要です。本書はNeo4jを代表例として扱っています。
              </p>

              <h3>スキーマレスであること＝スキーマがないわけではない</h3>
              <p>
                「NoSQL＝スキーマレス」とよく言われますが、著者らはこれを誤解しやすいポイントとして丁寧に説明しています。スキーマレスとは「データベース自身が事前にスキーマを強制しない」という意味であり、
                <strong>
                  実際にはスキーマは消えたのではなく、書き込みを行うアプリケーションコードの側に移動しただけ
                </strong>
                です。この移動には次のようなメリット・デメリットがあります。
              </p>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th />
                      <th>メリット</th>
                      <th>デメリット</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>スキーマレス</td>
                      <td>
                        フィールドの追加・削除が容易。異なる形のデータを同じコレクションに混在できる
                      </td>
                      <td>
                        データの構造を保証する仕組みが薄れ、暗黙の前提がコード側に散らばりやすい
                      </td>
                    </tr>
                    <tr>
                      <td>RDBの固定スキーマ</td>
                      <td>データベースがデータ形式を保証してくれる</td>
                      <td>スキーマ変更のたびにマイグレーションの手間がかかる</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>マテリアライズドビューとデータアクセス志向のモデリング</h3>
              <p>
                RDBの世界では、正規化してから必要に応じてビューを作るのが一般的です。一方、集約指向のNoSQLでは、
                <strong>
                  「どういうクエリで読み出したいか」を先に決めてから、その読み出しに最適な形でデータを非正規化して保存する
                </strong>
                という順序でモデリングします。これを補うのが
                <strong>マテリアライズドビュー</strong>
                （あらかじめ計算済みの問い合わせ結果を保持しておく仕組み）で、集計や複雑な読み出しパターンを高速化するために使われます。
              </p>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第3章のまとめ）
                </div>
                <ul>
                  <li>
                    集約をまたぐ関係は、キー参照または埋め込みのどちらかで表現する。集約をまたぐ結合機能の有無は製品依存であり（例:
                    MongoDBの<code>$lookup</code>
                    ）、サポートされる結合の種類、シャーディングなど構成上の制限、性能特性は製品ごとに異なる
                  </li>
                  <li>
                    グラフデータベースは集約指向とは逆に、データを小さなノードに分割し、ノード間の関係を明示的に扱うことで複雑な関係のクエリに強くなる
                  </li>
                  <li>
                    スキーマレスとは「スキーマが消える」ことではなく、「スキーマを強制する責任がデータベースからアプリケーションコードへ移る」ことを意味する
                  </li>
                  <li>
                    マテリアライズドビューは、あらかじめ計算しておいた問い合わせ結果であり、集約指向データベースでの高度な読み出しパターンを実現する主要な手段になる
                  </li>
                  <li>NoSQLのモデリングは「どんな問い合わせで読み出すか」から逆算して設計する</li>
                </ul>
              </div>
            </section>

            <section className="section" id="step3">
              <h2>
                <span className="step-badge">3</span>分散モデル
                <span className="chapter-tag">第4章 Distribution Models</span>
              </h2>
              <p>
                NoSQLがクラスタ前提で生まれた以上、データをどう複数ノードに分散させるかは本書の核心テーマの一つです。分散のやり方は大きく2軸――
                <strong>シャーディング</strong>（データを分割する）と
                <strong>レプリケーション</strong>（データを複製する）――に整理できます。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconNetwork className="ti" size={20} />
                  分散モデルの全体像
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD07} />
                </div>
              </div>

              <h3>単一サーバー（Single Server）という選択肢を軽視しない</h3>
              <p>
                分散の話をする前に、著者らは「実は多くのケースで単一サーバーでも十分」と釘を刺しています。グラフデータベースのように分散が難しいモデルや、開発体験を優先したい場合には、あえて分散させずに単一サーバーで運用する選択肢も現実的です。
              </p>

              <h3>シャーディング：データを「分割」して書き込みを散らす</h3>
              <p>
                シャーディングは、異なるデータをそれぞれ別のノードに配置する手法です。うまくシャーディングキーを選べば、同時にアクセスされやすいデータを同じノードにまとめられ、多くの操作を1ノード内で完結させられます。一方で、シャード同士をまたぐ集計処理は難しくなります。
              </p>
              <p>
                また、関連データを寄せることだけを考えてキーを選ぶと、アクセスが特定のキーへ集中したときに1つのノードがホットスポット化し、他ノードが遊んだまま全体のスループットがそのノードに律速されます。負荷分散の効果を得るには、
                <strong>関連データの局所化とノード間の負荷の平準化を両立させる</strong>
                シャーディングキーを選ぶ必要があります。
              </p>

              <h3>レプリケーション：データを「複製」して読み取りと耐障害性を高める</h3>
              <ul>
                <li>
                  <strong>マスター・スレーブ型レプリケーション</strong>
                  ：1つのマスターノードが更新を受け付け、その内容を複数のスレーブに反映します。読み取り負荷を複数ノードに分散できる一方、マスターが単一障害点になり得ます。
                </li>
                <li>
                  <strong>ピアツーピア型レプリケーション</strong>
                  ：すべてのノードが対等な立場でデータを複製し合います。単一障害点がなくなる代わりに、複数ノードへの同時書き込みによる
                  <strong>書き込み競合</strong>にどう対処するかが新たな課題になります。
                </li>
              </ul>
              <p>
                実際のシステムの多くは、シャーディングとレプリケーションを組み合わせて使います。たとえば「データを複数のシャードに分割し、各シャードをさらに複数台にレプリケーションする」という構成です。
              </p>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第4章のまとめ）
                </div>
                <ul>
                  <li>
                    分散には大きく分けてシャーディング（分割）とレプリケーション（複製）の2つの軸がある
                  </li>
                  <li>
                    シャーディングは書き込みの負荷を複数ノードに分散させるが、シャードをまたぐ集計は難しくなる
                  </li>
                  <li>
                    マスター・スレーブ型レプリケーションは読み取りの負荷分散に強いが、マスターが単一障害点になりやすい
                  </li>
                  <li>
                    ピアツーピア型レプリケーションは単一障害点を避けられるが、書き込み競合への対処が必要になる
                  </li>
                  <li>実運用ではシャーディングとレプリケーションを組み合わせるのが一般的である</li>
                </ul>
              </div>
            </section>

            <section className="section" id="step4">
              <h2>
                <span className="step-badge">4</span>一貫性
                <span className="chapter-tag">第5章 Consistency</span>
              </h2>
              <p>
                分散システムでは「一貫性（Consistency）」の意味が一枚岩ではなくなります。本書はこれを
                <strong>更新の一貫性（Update Consistency）</strong>と
                <strong>読み取りの一貫性（Read Consistency）</strong>に分けて説明します。
              </p>

              <h3>更新の一貫性：書き込み競合をどう扱うか</h3>
              <p>
                複数のクライアントが同じデータを同時に更新しようとしたときにどうするか。代表的な戦略は次の3つです。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>戦略</th>
                      <th>考え方</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>悲観的並行性制御</td>
                      <td>更新前にロックを取り、他の更新をブロックする</td>
                    </tr>
                    <tr>
                      <td>楽観的並行性制御</td>
                      <td>
                        更新時にバージョンを確認し、競合していれば書き込みを拒否する（Step5のバージョンスタンプで詳説）
                      </td>
                    </tr>
                    <tr>
                      <td>競合解決の先送り</td>
                      <td>
                        競合をいったん両方保存し、後からアプリケーションやユーザーに解決させる
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>読み取りの一貫性：みんなが同じ答えを見るとは限らない</h3>
              <p>
                レプリケーションされた環境では、更新がすべてのレプリカに伝播するまでに時間差が生じます。この間に読み取りを行うと、ノードによって異なる値が返る可能性があります。これが
                <strong>結果整合性（Eventual Consistency）</strong>
                ――「対象データへの新たな更新が止まれば、いずれは全ノードが同じ値に収束するが、収束する瞬間は保証されない」という考え方です。
              </p>

              <h3>CAP定理</h3>
              <p>
                一貫性の議論で必ず出てくるのがCAP定理です。CAP定理は、Eric
                Brewerが2000年に提唱し、2002年にGilbertとLynchが定式化した考え方で、ネットワーク分断が発生した状況では、分散データストアは
                <strong>一貫性（Consistency）</strong>と<strong>可用性（Availability）</strong>
                のどちらかを選ばざるを得ない、というものです（分断耐性＝Partition
                Toleranceは、ネットワークが分断されうる以上、事実上は前提条件になります）。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconScale className="ti" size={20} />
                  CAP定理
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD08} />
                </div>
              </div>

              <div className="callout gold">
                <IconAlertTriangle className="ti" size={24} />
                <div className="callout-body">
                  <span className="callout-title">補足（発展）</span>
                  <p>
                    CAP定理は「2つしか選べない」という単純化のしすぎだという指摘も根強くあります。提唱者本人であるEric
                    Brewerも2012年の論文「CAP Twelve Years
                    Later」で、分断が起きていない平常時にまで無理に犠牲を払う必要はなく、実際には部分的なトレードオフを細かく設計できると述べ、当初の「2
                    of 3」という説明を自ら見直しています。さらにMartin Kleppmannは2015年の論文「A
                    Critique of the CAP
                    Theorem」で、CAP定理の定式化そのものが実務上の設計判断には荒すぎると批判しています。詳しくは批判的に読むの章と参考文献を参照してください。
                  </p>
                </div>
              </div>

              <h3>一貫性を緩めることで得られるもの、失うもの</h3>
              <p>
                強い一貫性を要求するほど、可用性やレイテンシを犠牲にしやすくなります。逆に一貫性を緩めれば、可用性や応答速度を確保できます。同様に、
                <strong>耐久性（Durability）</strong>
                ――「書き込みが確実にディスクへ反映されたか」――も、性能とのトレードオフで緩めることがあります（たとえば書き込みを一度メモリだけに反映し、非同期でディスクに反映するなど）。
              </p>

              <h3>クォーラム：読み書きにいくつのノードの合意が必要か</h3>
              <p>
                分散システムでは、レプリカの台数を N、書き込み成功に必要な台数を
                W、読み取りに問い合わせる台数を R とすると、<code>W + R &gt; N</code>
                を満たす設定では、読み取り先のレプリカ集合と書き込み先のレプリカ集合が必ず1台以上重なります。
              </p>
              <p>
                ただし、これは「最新値を含むレプリカが読み取り結果に混ざる」ことを示すだけで、それ自体が最新値の取得を保証するわけではありません。実際に最新値を返せるかは、次の前提が揃っているかに依存します。
              </p>
              <ul>
                <li>
                  バージョン（ベクタークロックなど）を比較して更新同士の因果関係を判定できること。因果的に順序づけられる更新であれば、後続の値を最新として選べる
                </li>
                <li>
                  因果関係を持たない「同時（concurrent）」な更新は、最新を一意に決められないため衝突として扱われる。その解決方法（後勝ち、値のマージ、複数バージョンをクライアントへ返すなど）が定義されていること
                </li>
                <li>読み取りが途中で打ち切られず、W・R が実際にその回数を満たしていること</li>
              </ul>
              <p>
                なお、Read
                Repair（読み取り時にレプリカ間の差分を検出して遅れたレプリカへ書き戻す仕組み）や
                Active Anti-Entropy（バックグラウンドで Merkle
                ツリーなどを用いて差分を継続的に修復する仕組み）は、これらとは役割が異なります。これらはレプリカ集合全体を収束させて不整合の残存期間を短くするための仕組みであって、ある読み取りが最新値を返すための必須条件ではありません。
                <code>W + R &gt; N</code>
                だけで最新値が保証されるわけではありません。読み書きが同じレプリカ集合を対象とし（スロッピー・クォーラムを使わない）、上記のバージョン比較と衝突解決が正しく最新値を特定できるという前提のもとでは、読み取りクォーラムと書き込みクォーラムが重なるため、修復が未実施でも読み取り時点で問い合わせたレプリカに最新値が含まれ、それを選び出せます。
              </p>
              <p>
                これらを踏まえたうえで、W・R・Nの組み合わせを調整することで、一貫性と可用性のバランスを細かく設計できます。
              </p>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第5章のまとめ）
                </div>
                <ul>
                  <li>
                    分散システムの一貫性は「更新の一貫性」と「読み取りの一貫性」に分けて考える必要がある
                  </li>
                  <li>
                    結果整合性は、新たな更新が止まればいずれ全ノードが収束することだけを保証し、収束までの時間は保証しない
                  </li>
                  <li>
                    CAP定理は、ネットワーク分断時に一貫性と可用性のどちらを優先するかという選択を迫る
                  </li>
                  <li>一貫性や耐久性を意図的に緩めることで、可用性や性能を高められる</li>
                  <li>
                    クォーラム（W・R・Nの関係）を調整することで、一貫性と可用性のトレードオフを細かく制御できる
                  </li>
                </ul>
              </div>
            </section>

            <section className="section" id="step5">
              <h2>
                <span className="step-badge">5</span>バージョンスタンプ
                <span className="chapter-tag">第6章 Version Stamps</span>
              </h2>

              <h3>なぜタイムスタンプだけでは不十分なのか</h3>
              <p>
                「最後に書き込まれたものを正とする（Last-Write-Wins）」という単純な戦略は、複数ノードでクロックがわずかにずれるだけで、正しい順序を保証できなくなるという弱点があります。そこで登場するのが
                <strong>バージョンスタンプ</strong>
                ――更新のたびに増分するカウンタやハッシュなど、明示的にバージョンを識別する仕組みです。
              </p>

              <h3>ビジネストランザクションとシステムトランザクション</h3>
              <p>
                本書は、DBが保証する短い「システムトランザクション」と、ユーザーの一連の操作全体を指す長い「ビジネストランザクション」を区別します。Webアプリのように、ユーザーがデータを読み込んでから更新を送るまでに時間差がある場合、その間に他のユーザーが同じデータを更新しているかもしれません。バージョンスタンプは、この
                <strong>楽観的並行性制御</strong>
                ――「読み込んだときのバージョンと、書き込む直前のバージョンを比較し、ズレていれば競合として扱う」――を実現する土台になります。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconGitCommit className="ti" size={20} />
                  バージョンスタンプによる競合検出
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD09} />
                </div>
              </div>

              <h3>複数ノードにまたがるバージョンスタンプ</h3>
              <p>
                ピアツーピア型レプリケーションのように複数ノードが同時に書き込みを受け付けられる環境では、単純な増分カウンタでは不十分です。ここで使われるのが
                <strong>ベクタークロック（Vector Clock）</strong>
                のような仕組みで、「どのノードが」「何回目の更新を」行ったかを記録し、真に競合している更新（＝どちらが新しいとも言えない更新）だけを検出できるようにします。
              </p>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第6章のまとめ）
                </div>
                <ul>
                  <li>
                    タイムスタンプだけに頼る「最後の書き込みが勝つ」方式は、クロックのずれによって危険な場合がある
                  </li>
                  <li>
                    バージョンスタンプは、楽観的並行性制御――読み込み時と書き込み時のバージョンを比較して競合を検出する仕組み――を支える
                  </li>
                  <li>
                    ビジネストランザクションは、DBのシステムトランザクションよりも長い時間軸で考える必要がある
                  </li>
                  <li>
                    複数ノードが同時に書き込みを受け付けられる環境では、ベクタークロックのような仕組みで真の競合を見分ける
                  </li>
                </ul>
              </div>
            </section>

            <section className="section" id="step6">
              <h2>
                <span className="step-badge">6</span>Map-Reduce
                <span className="chapter-tag">第7章 Map-Reduce</span>
              </h2>

              <h3>集約指向データベースにおける集計の課題</h3>
              <p>
                RDBならSQLのGROUP
                BYで済むような集計処理も、データが集約単位でクラスタ中に散らばっていると、単純にはいきません。そこで使われるのが
                <strong>Map-Reduce</strong>という計算モデルです。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconAffiliate className="ti" size={20} />
                  Map-Reduceの流れ
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD10} />
                </div>
              </div>

              <h3>Map関数とReduce関数</h3>
              <ul>
                <li>
                  <strong>Mapタスク</strong>
                  ：各ノード上のデータに対して独立に実行され、入力を「キーと値のペア」に変換する。各ノードが自分の持つデータだけを処理すればよいため、並列化しやすい
                </li>
                <li>
                  <strong>Reduceタスク</strong>
                  ：Mapの出力を、同じキーごとにまとめて集計する。Mapに比べて「同じキーのデータを1か所に集める」処理が必要になるため、ネットワーク越しのデータ移動（シャッフル）が発生する
                </li>
              </ul>

              <h3>パーティショニングと結合（Combining）</h3>
              <p>
                大規模なMap-Reduceでは、Reduceの前段に「Combiner」を挟み、各ノード内であらかじめ部分集計をしてからシャッフルすることで、ノード間の通信量を減らす最適化が一般的です。ただしCombinerは省略可能な最適化であり、安全に使えるのはReduce処理が結合的かつ可換な場合に限られます。実装によってCombinerは0回・1回・複数回のいずれでも呼ばれうるため、呼び出し回数に結果が依存してはいけません。たとえば合計は部分和をさらに合計しても正しい結果になりますが、平均は「平均の平均」を繰り返すと件数の重みが失われて誤った値になるため、Combinerでは（合計,
                件数）の組を部分集計し、最後のReduceで割り算する必要があります。
              </p>

              <h3>Map-Reduce計算の合成</h3>
              <p>
                単一のMap-Reduceだけでなく、複数のMap-Reduce処理を
                <strong>パイプライン状に連結</strong>したり、
                <strong>複数の入力に対して同じ処理を並行して走らせ、後で結果を突き合わせる</strong>
                といった合成パターンも紹介されています。これにより、単純な集計だけでなく、複雑な分析処理もクラスタ上に分散させて実行できます。
              </p>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第7章のまとめ）
                </div>
                <ul>
                  <li>
                    Map-Reduceは、クラスタに分散したデータに対して集計処理を行うための計算モデルである
                  </li>
                  <li>
                    Mapタスクは各ノードで独立に並列実行でき、Reduceタスクは同じキーのデータをまとめて処理する
                  </li>
                  <li>Combinerによる部分集計は、ノード間のデータ移動を減らす重要な最適化である</li>
                  <li>
                    複数のMap-Reduce処理を合成することで、より複雑な分析パイプラインを構築できる
                  </li>
                </ul>
              </div>
            </section>

            <section className="section" id="step7">
              <h2>
                <span className="step-badge">7</span>キーバリューデータベース
                <span className="chapter-tag">第8章 Key-Value Databases</span>
              </h2>
              <p>
                Part IIからは、4つの代表的なNoSQLデータベースについて「What
                Is」「Features」「Suitable Use Cases」「When Not to
                Use」という共通フォーマットで解説していきます。まずはもっともシンプルなキーバリューストアです。
              </p>

              <h3>キーバリューストアとは</h3>
              <p>
                一意なキーに対して、中身を問わない「値（Blob）」を1つだけ紐づけて保存する、もっとも単純なデータモデルです。データベース自身は値の中身を理解しません。本書ではRiakを代表例として扱っています。
              </p>

              <h3>主な特徴</h3>
              <ul>
                <li>
                  <strong>一貫性</strong>
                  ：どう扱うかは製品と構成によって異なる。Riakのようなピアツーピア型の製品は書き込み競合の解決にバージョンスタンプ（Step5）を用いるが、単一マスタのRedisや、強い整合性の読み取りを選べるAmazon
                  DynamoDBのように別の方式をとる製品もある
                </li>
                <li>
                  <strong>トランザクション</strong>
                  ：1つのキーに対する操作はアトミック。複数キーにまたがるトランザクションの可否は製品と構成によって異なり、Riakのように基本的にサポートしないものがある一方、Amazon
                  DynamoDBは<code>TransactWriteItems</code>
                  で複数アイテムをまとめて原子的に書き込め、RedisもMULTI/EXECで一連のコマンドをまとめて実行できる（Redis
                  Clusterでは対象キーが同一ハッシュスロットに属している必要がある）
                </li>
                <li>
                  <strong>クエリ機能</strong>
                  ：キーによる取得のみがコアの機能。値の中身を条件に検索する機能は基本的に持たない（製品によっては補助的なインデックス機能を持つ）
                </li>
                <li>
                  <strong>スケーリング</strong>
                  ：水平分散が容易で、単純なリードスルー／ライトスルーのキャッシュとしても使いやすい
                </li>
              </ul>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>向いている用途</th>
                      <th>向かない用途</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        セッションデータの保存
                        <br />
                        ユーザープロファイルや設定情報のキャッシュ
                        <br />
                        ショッピングカート（Amazon Dynamoの著名な事例のように）
                        <br />
                        ユーザーごとの単純な統計値の保持
                      </td>
                      <td>
                        キー以外の条件で値を検索したい場合
                        <br />
                        複数キーにまたがる操作をアトミックに行いたいが、選択した製品・構成がそれに対応していない、または対応していても性能要件を満たさない場合
                        <br />
                        キー同士の関係（リレーション）を扱いたい場合
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="section" id="step8">
              <h2>
                <span className="step-badge">8</span>ドキュメントデータベース
                <span className="chapter-tag">第9章 Document Databases</span>
              </h2>

              <h3>ドキュメントデータベースとは</h3>
              <p>
                キーバリューストアの値を、JSONやXMLのような<strong>構造化されたドキュメント</strong>
                に置き換えたものです。データベース自身がドキュメントの構造を理解できるため、キー以外のフィールドでも問い合わせができます。本書ではMongoDBを主な例に、CouchDBやRavenDBにも触れています。
              </p>

              <h3>主な特徴</h3>
              <ul>
                <li>
                  <strong>クエリ機能</strong>
                  ：ドキュメント内の任意のフィールドに対してインデックスを張り、条件検索や範囲検索ができる
                </li>
                <li>
                  <strong>集約の考え方</strong>
                  ：1つのドキュメントの中にリスト構造やネスト構造を自由に持てるため、「注文とその明細」のような1対多の関係を1ドキュメントにまとめやすい
                </li>
                <li>
                  <strong>スキーマの柔軟性</strong>
                  ：ドキュメントごとに異なるフィールド構成を持てる（Step2で触れたスキーマレスの実例）
                </li>
              </ul>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>向いている用途</th>
                      <th>向かない用途</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        イベントログの記録
                        <br />
                        コンテンツ管理システム（CMS）やブログのような、構造が可変なデータ
                        <br />
                        Webアプリケーションのバックエンド全般（構造がドキュメント単位で完結しやすい場合）
                        <br />
                        分析目的での柔軟なデータ収集
                      </td>
                      <td>
                        複数のドキュメントをまたぐ複雑なトランザクションが必要で、利用する製品・配置構成がその範囲を提供しない、あるいは提供していても性能要件を満たせない場合（例：MongoDBはレプリカセットで複数ドキュメント、4.2以降はシャード構成でも分散トランザクションを扱えるが、単一ドキュメント更新に比べて相応のコストがかかる）
                        <br />
                        データの構造がドキュメントをまたいで頻繁に再編成される（＝集約の境界が変わりやすい）場合
                        <br />
                        集約に分けにくい、高度に関係性が絡み合ったデータ（→ グラフDBの出番）
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="section" id="step9">
              <h2>
                <span className="step-badge">9</span>カラムファミリーストア
                <span className="chapter-tag">第10章 Column-Family Stores</span>
              </h2>

              <h3>カラムファミリーストアとは</h3>
              <p>
                Googleの Bigtable
                論文に着想を得たモデルで、行キーに対して「列（カラム）」の集合をまとめて保存します。列同士をグループ化したものを「カラムファミリー」と呼びます。本書ではCassandraを主な例に、HBaseにも触れています。
              </p>
              <p>ただし「列が固定されない」度合いは製品によって異なります。</p>
              <ul>
                <li>
                  <strong>Bigtable・HBase</strong>
                  ：列はあらかじめ固定されず、行ごとに異なる可変長の列を持てます。事前に定義するのはカラムファミリーまでで、その中の列修飾子（カラム名）は書き込み時に自由に決められます。
                </li>
                <li>
                  <strong>Cassandra</strong>
                  ：現行のCQLでは、列はテーブルスキーマとして定義します。値を設定しない列があっても構わず、その分の記憶域も消費しない（疎である）一方で、Bigtableのように行ごとへ任意の列を後から足せるわけではありません。動的な属性を表現したい場合、件数が少なく上限が見込める属性なら
                  <code>map</code>
                  などのコレクション型が適します（コレクションは読み出し時に全体が取得されるため、肥大化させる用途には向きません）。一方、件数が増え続けるデータや、要素ごとに検索・範囲取得したいデータは、クラスタリングカラムで識別・整列される別の行として表現します。両者は「列を増やすための等価な代替手段」ではなく、データの量と検索要件によって使い分けるものです。
                </li>
              </ul>

              <h3>主な特徴</h3>
              <ul>
                <li>
                  <strong>2次元・場合によっては3次元のデータモデル</strong>
                  ：行キー×カラムファミリー×カラム名という構造で、疎（スパース）なデータを効率よく格納できる
                </li>
                <li>
                  <strong>書き込みスループットの高さ</strong>
                  ：ログや時系列データのように、追記中心のワークロードに強い
                </li>
                <li>
                  <strong>一貫性のチューニング</strong>
                  ：Cassandraのように、クォーラム（Step4）の設定によって一貫性と可用性のバランスを細かく調整できる実装が多い
                </li>
              </ul>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>向いている用途</th>
                      <th>向かない用途</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        大量の書き込みが発生するイベントログ・時系列データ
                        <br />
                        巨大なデータセットに対する分散カウンター
                        <br />
                        読み出しパターンがあらかじめ分かっている大規模なWebサービスのバックエンド
                      </td>
                      <td>
                        クエリパターンが頻繁に変わるプロトタイピング段階のシステム
                        <br />
                        複雑な集約・結合を必要とする分析クエリ
                        <br />
                        ACIDに近い強いトランザクション保証が必須の場合
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="section" id="step10">
              <h2>
                <span className="step-badge">10</span>グラフデータベース
                <span className="chapter-tag">第11章 Graph Databases</span>
              </h2>

              <h3>グラフデータベースとは</h3>
              <p>
                Step2で紹介した通り、集約指向とは対照的に、小さなノードとエッジの集合としてデータをモデリングします。ノード・エッジの双方にプロパティ（属性）を持たせられるのが一般的です。本書ではNeo4jを主な例として扱っています。
              </p>

              <h3>主な特徴</h3>
              <ul>
                <li>
                  <strong>関係のたどりやすさ</strong>
                  ：Neo4jのようなネイティブグラフストレージでは、各ノードが隣接ノードへの参照を直接保持します（インデックスフリー隣接）。これが効くのは探索の
                  <strong>開始ノードを特定した後</strong>
                  の隣接たどりの部分で、開始ノード自体はインデックス検索などで見つける必要があります。この性質を持たない非ネイティブな実装（RDBやドキュメントDBの上にグラフAPIを載せたもの）には当てはまりません。また可変長パスの探索では、ホップ数と分岐数に応じて生成されるパスが爆発的に増えて大幅に遅くなることがあり、「常に高速」ではありません
                </li>
                <li>
                  <strong>柔軟なスキーマ</strong>：ノードやエッジの種類を後から追加しやすい
                </li>
                <li>
                  <strong>専用のクエリ言語</strong>
                  ：Cypherのようなグラフ探索に特化したクエリ言語を持つ製品が多い
                </li>
              </ul>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>向いている用途</th>
                      <th>向かない用途</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        ソーシャルネットワークの友人関係
                        <br />
                        レコメンドエンジン（「この商品を買った人はこれも買っています」）
                        <br />
                        不正検知（取引ネットワークの中の怪しいパターン探索）
                        <br />
                        経路探索・依存関係の解析
                      </td>
                      <td>
                        グラフ全体にまたがる大規模な集計・更新をクラスタ全体に単純に水平分散したい場合（グラフDBは他のNoSQLほど素直には水平分散できないことが多い）
                        <br />
                        関係がほとんど存在しない、単純なレコード管理
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>4つのデータベースの使い分け早見表</h3>
              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconListCheck className="ti" size={20} />
                  どのデータモデルを選ぶか
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD11} />
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>データモデル</th>
                      <th>代表例（本書刊行時）</th>
                      <th>得意なこと</th>
                      <th>苦手なこと</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>キーバリュー</td>
                      <td>Riak, Redis, Memcached, Amazon DynamoDB</td>
                      <td>高速な単純取得、キャッシュ</td>
                      <td>
                        値の中身での検索、複数キーの整合性（製品・配置構成が複数キーのアトミック操作に対応していない場合、または対応していても性能要件に合わない場合。例:
                        Redisは単一ノードならMULTI/EXECで扱えるが、クラスタ構成では同一ハッシュスロットのキーに限られる）
                      </td>
                    </tr>
                    <tr>
                      <td>ドキュメント</td>
                      <td>MongoDB, CouchDB, RavenDB</td>
                      <td>柔軟なスキーマ、フィールド検索</td>
                      <td>
                        ドキュメントをまたぐトランザクション（製品・構成が対応していない場合、または対応していても性能コストが要件に合わない場合）
                      </td>
                    </tr>
                    <tr>
                      <td>カラムファミリー</td>
                      <td>Cassandra, HBase</td>
                      <td>大量書き込み、時系列データ</td>
                      <td>複雑な結合・集計クエリ</td>
                    </tr>
                    <tr>
                      <td>グラフ</td>
                      <td>Neo4j, InfiniteGraph</td>
                      <td>複雑な関係のたどり</td>
                      <td>クラスタ全体への単純な水平分散</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="section" id="step11">
              <h2>
                <span className="step-badge">11</span>スキーマ移行
                <span className="chapter-tag">第12章 Schema Migrations</span>
              </h2>

              <h3>「スキーマレスだからマイグレーション不要」は誤解</h3>
              <p>
                Step2で触れた通り、スキーマレスとはスキーマがアプリケーションコード側に移動しただけであり、著者のMartin
                Fowlerは「スキーマレスだから移行を考えなくてよい、というのは深刻な誤解だ」と明言しています。実際には、RDBのマイグレーションで培われてきた技法の多くが、NoSQLでも活用できます（この分野はもう一人の著者Sadalage自身が『Refactoring
                Databases』で先駆的に扱ったテーマでもあります）。
              </p>

              <h3>RDBのスキーマ変更 vs NoSQLのスキーマ変更</h3>
              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconRefresh className="ti" size={20} />
                  スキーマ移行のフロー
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD12} />
                </div>
              </div>

              <p>
                RDBでは、スキーマの変更を明示的な <code>ALTER TABLE</code>{" "}
                として一括適用するのが一般的です。一方NoSQLでは、次のような戦略が使われます。
              </p>
              <ul>
                <li>
                  <strong>アプリケーション側での新旧両対応</strong>
                  ：読み込み時に古い形式を検出したら、新しい形式に変換してから使う
                </li>
                <li>
                  <strong>増分的（増加的）マイグレーション</strong>
                  ：レコードがアクセスされたタイミングで、その都度新しい形式に書き換えていく。すべてのレコードを一斉に書き換える必要がない
                </li>
                <li>
                  <strong>一括マイグレーション（Eager Migration）</strong>
                  ：メンテナンスウィンドウを設けて、既存データを一気に新形式へ変換する
                </li>
              </ul>
              <p>
                いずれの場合も、マイグレーションスクリプトをバージョン管理し、デプロイの一部として自動的に適用する運用（継続的デリバリー的な発想）が推奨されています。
              </p>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第12章のまとめ）
                </div>
                <ul>
                  <li>スキーマレスであることは、スキーマを考えなくてよいことを意味しない</li>
                  <li>
                    スキーマの変更は、RDBでは明示的なALTER操作として、NoSQLではアプリケーションコードでの新旧両対応として扱われることが多い
                  </li>
                  <li>
                    増分的マイグレーションを使えば、データに触れたタイミングで少しずつ新形式へ移行できる
                  </li>
                  <li>
                    マイグレーションはバージョン管理し、デプロイパイプラインの一部として自動化するべきである
                  </li>
                </ul>
              </div>
            </section>

            <section className="section" id="step12">
              <h2>
                <span className="step-badge">12</span>ポリグロット・パーシステンス
                <span className="chapter-tag">第13章 Polyglot Persistence</span>
              </h2>
              <p>
                いよいよ本書のサブタイトルにもなっている中心概念、
                <strong>ポリグロット・パーシステンス（Polyglot Persistence）</strong>です。
              </p>

              <h3>1つのアプリに1つのDBという発想からの脱却</h3>
              <p>
                これまで多くの組織は、トランザクション・セッション管理・BI・ロギングなど、性質の異なるあらゆるデータを同じRDBエンジンに詰め込んできました。しかし著者らは、
                <strong>データの使われ方が異なれば、最適なデータストアも異なる</strong>
                と主張します。「ポリグロット（多言語）」という言葉が示す通り、1つのプログラミング言語で全てを書く必要がないのと同様に、1つのデータストアで全てを賄う必要はない、という発想です。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconLanguage className="ti" size={20} />
                  ポリグロット・パーシステンス
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD13} />
                </div>
              </div>

              <h3>データストアを「統合ポイント」にしない</h3>
              <p>
                Martin
                Fowlerは、ポリグロット・パーシステンスを実践する上でもっとも重要な帰結として、
                <strong>
                  「データベースをアプリケーション間の統合ポイントとして直接共有する」発想から、「各アプリケーションが自分のデータストアをカプセル化し、より上位のサービス層を通じて連携する」発想への転換
                </strong>
                を挙げています。異なるデータモデルを持つ複数のデータストアを1つのスキーマとして外部に晒すのではなく、サービスの背後に隠すことで、それぞれのデータストアの都合に振り回されずに済みます。
              </p>

              <h3>適切な技術を選ぶ・機能拡張のために持ち込む</h3>
              <p>
                ポリグロット・パーシステンスは、最初から壮大な設計をする必要はありません。まずは既存のRDB中心のアーキテクチャの中で、特定の機能（全文検索、グラフ探索、キャッシュなど）だけを専用のNoSQLに任せる、という段階的な拡張から始めるのが現実的です。
              </p>

              <h3>エンタープライズ視点での懸念：運用の複雑さ</h3>
              <p>
                一方で、データストアの種類が増えるほど、監視・バックアップ・運用スキルの確保・デプロイの複雑さも増していきます。著者らは、ポリグロット・パーシステンスの恩恵と、この運用コストとを天秤にかけて判断する必要があると釘を刺しています。
              </p>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第13章のまとめ）
                </div>
                <ul>
                  <li>
                    ポリグロット・パーシステンスとは、データの使われ方に応じて複数のデータストア技術を使い分けるという考え方である
                  </li>
                  <li>
                    データベースを直接の統合ポイントにするのではなく、アプリケーションがデータストアをカプセル化し、サービス層で連携する発想への転換が重要になる
                  </li>
                  <li>
                    まずは既存システムの一部機能を拡張する形でNoSQLを導入するのが現実的な出発点になりやすい
                  </li>
                  <li>
                    データストアの種類が増えるほど、デプロイと運用の複雑さというコストも増加する
                  </li>
                </ul>
              </div>
            </section>

            <section className="section" id="step13">
              <h2>
                <span className="step-badge">13</span>NoSQLを超えて
                <span className="chapter-tag">第14章 Beyond NoSQL</span>
              </h2>
              <p>
                本書は「NoSQL」という枠そのものにもこだわりすぎません。第14章では、NoSQLの4分類にも当てはまらない、その他の永続化の選択肢を紹介しています。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconInfinity className="ti" size={20} />
                  NoSQLを超えた永続化の選択肢
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD14} />
                </div>
              </div>

              <ul>
                <li>
                  <strong>ファイルシステム</strong>
                  ：画像や動画のような大きなバイナリは、無理にデータベースに詰め込むよりファイルシステム（またはオブジェクトストレージ）に置き、メタデータだけをDBに持つ方が理にかなうことが多い
                </li>
                <li>
                  <strong>イベントソーシング（Event Sourcing）</strong>
                  ：現在の「状態」ではなく、状態に至るまでの「変更イベントの履歴」を保存する設計手法。現在の状態はイベント履歴を再生することで導出する
                </li>
                <li>
                  <strong>メモリイメージ（Memory Image）</strong>
                  ：全データをメモリ上に保持し、耐久性はイベントログなどで別途担保する設計。読み書きが極めて高速になる
                </li>
                <li>
                  <strong>バージョン管理システムの応用</strong>
                  ：Gitのような分散バージョン管理の仕組みを、一般的なデータ管理に応用する発想
                </li>
                <li>
                  <strong>XMLデータベース／オブジェクトデータベース</strong>
                  ：NoSQLブーム以前から存在する、それぞれ独自の歴史を持つ永続化技術
                </li>
              </ul>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第14章のまとめ）
                </div>
                <ul>
                  <li>永続化の選択肢はNoSQLの4分類だけにとどまらない</li>
                  <li>
                    大きなバイナリデータは、ファイルシステムやオブジェクトストレージに置く方が適切なことが多い
                  </li>
                  <li>
                    イベントソーシングは、状態そのものではなく変更履歴を保存することで、監査性や巻き戻し可能性を高める
                  </li>
                  <li>
                    メモリイメージは、全データをメモリ上に保持することで高速な読み書きを実現する設計である
                  </li>
                </ul>
              </div>
            </section>

            <section className="section" id="step14">
              <h2>
                <span className="step-badge">14</span>データベースの選び方
                <span className="chapter-tag">第15章 Choosing Your Database</span>
              </h2>
              <p>
                最終章では、ここまでの内容を踏まえた「では結局どう選ぶのか」という実践的な指針がまとめられています。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconListCheck className="ti" size={20} />
                  データベースの選び方
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD15} />
                </div>
              </div>

              <h3>2つの主要な判断軸</h3>
              <ol>
                <li>
                  <strong>プログラマの生産性（Programmer Productivity）</strong>
                  ：そのデータモデルが、扱いたいデータの形と自然に噛み合っているか。RDBに無理やり押し込むより、適したモデルを選ぶ方が開発が速く進むことがある
                </li>
                <li>
                  <strong>データアクセス性能（Data-Access Performance）</strong>
                  ：クラスタで捌く必要があるデータ量・スループット・レイテンシの要件を満たせるか
                </li>
              </ol>

              <h3>デフォルトに留まる勇気、賭けを分散する勇気</h3>
              <ul>
                <li>
                  <strong>既定路線に留まる（Sticking with the Default）</strong>
                  ：チームの経験や既存の運用体制を考えると、あえて枯れたRDBを選び続けることが合理的な場合もある
                </li>
                <li>
                  <strong>賭けを分散する（Hedging Your Bets）</strong>
                  ：要件が固まりきらない段階では、複数の技術を並行して検証し、実際に手を動かしてみることで判断材料を増やす
                </li>
              </ul>
              <p>
                著者らが一貫して強調するのは、「<strong>とにかく実際に試してみること</strong>
                」です。オープンソースのNoSQL製品が多いという利点を活かし、机上の比較だけでなく、実際のシナリオでプロトタイプを動かして確かめることが、最終的な判断の精度を大きく左右します。
              </p>

              <div className="keypoints">
                <div className="keypoints-title">
                  <IconCircleCheck className="ti" size={20} />
                  Key Points（第15章のまとめ）
                </div>
                <ul>
                  <li>
                    データベース選定の主要な判断軸は、プログラマの生産性とデータアクセス性能の2つに整理できる
                  </li>
                  <li>
                    既存の体制や経験を踏まえて、あえてRDBという既定路線に留まる判断も合理的でありうる
                  </li>
                  <li>要件が不確かな段階では、複数の技術を並行して試し、賭けを分散させるとよい</li>
                  <li>最終的な判断は、机上の比較よりも実際に試してみることで精度が上がる</li>
                </ul>
              </div>
            </section>

            <section className="section" id="updates2026">
              <h2>
                <IconCalendarTime className="ti" size={24} />
                2026年時点の補足：刊行から10年以上が経って何が変わったか
              </h2>
              <p>
                『NoSQL Distilled』は2012年8月に刊行された本です。ここまで解説してきた
                <strong>概念</strong>
                （集約、CAP定理、シャーディング、ポリグロット・パーシステンスなど）は今も色あせていませんが、本書が挙げる
                <strong>具体的な製品や状況証拠</strong>
                は、2026年現在から見るとアップデートが必要な部分があります。
              </p>

              <div className="diagram-card">
                <div className="diagram-caption">
                  <IconTimeline className="ti" size={20} />
                  NoSQLの主な出来事（本書刊行後）
                </div>
                <div className="diagram-wrap">
                  <MermaidDiagram chart={chartD16} />
                </div>
              </div>

              <h3>本書の看板例だったRiakは、開発主体が入れ替わっている</h3>
              <p>
                本書はキーバリューストアの代表例としてRiakを繰り返し取り上げていますが、開発の担い手は当初から大きく変わっています。
              </p>
              <ul>
                <li>
                  <strong>旧来のRiak（Basho Technologies / basho）</strong>
                  ：開発元のBasho
                  Technologiesは2017年に資金繰りに行き詰まって経営破綻し、資産はBet365に買収されました。
                  <code>basho/riak</code>{" "}
                  リポジトリのリリースは2023年6月の3.0.16を最後に止まっており、データベースカタログサイト「Database
                  of Databases」でも「abandoned（放棄された）」と分類されています。
                </li>
                <li>
                  <strong>現在のRiak（OpenRiak コミュニティ）</strong>：その後、有志による{" "}
                  <code>OpenRiak</code> 組織へ開発が引き継がれています。Riak KV
                  は2026年1月に3.4.0、2026年6月に3.4.1がリリースされており、本ガイド執筆時点（2026年9月）でも各コンポーネントのリポジトリが更新され続けています（
                  <Ext href="https://github.com/OpenRiak/riak/releases">
                    OpenRiak公式リリース一覧
                  </Ext>
                  、参考文献19）。
                </li>
              </ul>
              <p>
                したがって「Riakは開発停止」と一括りにするのは正確ではなく、止まっているのはBasho時代の系統で、コミュニティ主導の系統は動いている、と分けて捉える必要があります。とはいえ商用サポートを伴う製品としての選択肢は限られるため、本書でRiakの動作例を読むときは、まず「ピアツーピア型レプリケーションを説明するための教材」として読むのが実用的です。
              </p>
              <p>
                対照的に、本書のもう3つの代表例――MongoDB（ドキュメント）、Cassandra（カラムファミリー）、Neo4j（グラフ）――はいずれも2026年時点でも各カテゴリの代表格であり続けています。
              </p>

              <h3>CAP定理の理解は、より繊細になった</h3>
              <p>
                Step4で触れた通り、CAP定理の提唱者Eric Brewer自身が2012年の論文「CAP Twelve Years
                Later: How the 'Rules' Have
                Changed」で、「2つのうち2つしか選べない」という単純化は誤解を招きやすいと振り返り、分断が起きていない平常時には3つの性質をすべて追求してよいこと、分断時の犠牲も粒度を細かく設計できることを説明しています。さらにケンブリッジ大学のMartin
                Kleppmannは2015年の論文「A Critique of the CAP
                Theorem」で、CAP定理の定式化そのものが実務上の設計判断には粗すぎると指摘し、レイテンシと一貫性のトレードオフとして捉え直すべきだと論じています。
              </p>

              <h3>より現代的な「次の1冊」の定番になったDDIA</h3>
              <p>
                本書の後継として2017年に初版が刊行されたMartin Kleppmannの『Designing Data-Intensive
                Applications』（通称DDIA）は、2026年3月にChris
                Riccominiを共著者に迎えた第2版（O'Reilly Media）が刊行されています。DDIAは、NoSQL
                Distilledが切り開いた「データストアを俯瞰して比較する」というアプローチを引き継ぎつつ、ストレージエンジンの内部構造、レプリケーションの詳細、トランザクションの分離レベル、ストリーム処理までを、より深く現代的な事例とともに扱っています。NoSQL
                Distilledを読み終えて「もっと深く知りたい」と思った読者の多くが、次に手に取る本として挙げています。これから読むなら、最新の第2版を選ぶのがおすすめです。
              </p>

              <h3>2026年のNoSQL勢力図：クラウドマネージド化とマルチモデル化</h3>
              <ul>
                <li>
                  <strong>クラウドマネージド型が既定路線になった</strong>：Amazon DynamoDB、Azure
                  Cosmos DB、MongoDB
                  Atlasのように、運用そのものをクラウド事業者に任せる形態が主流になり、本書が懸念していた「ポリグロット・パーシステンスの運用コスト」の一部は、マネージドサービスの普及によって軽減されつつあります
                </li>
                <li>
                  <strong>DB-Enginesランキング</strong>
                  （採用実績ではなく、求人・技術記事・検索数などから算出される「人気度」の指標）では、2026年9月時点でもMongoDBが
                  <Ext href="https://db-engines.com/en/ranking/document+store">文書DBカテゴリ</Ext>
                  で首位、Redisが
                  <Ext href="https://db-engines.com/en/ranking/key-value+store">
                    キーバリューDBカテゴリ
                  </Ext>
                  で首位、Neo4jが
                  <Ext href="https://db-engines.com/en/ranking/graph+dbms">グラフDBカテゴリ</Ext>
                  で首位を維持しています。市場シェアを表すものではない点に注意してください
                </li>
                <li>
                  <strong>4分類の境界がにじんできた</strong>：Azure Cosmos
                  DBやArangoDBのような「マルチモデル」データベース、あるいはPostgreSQLのJSONB型のように、RDBがNoSQL的な柔軟性を取り込む動きも一般化し、「NoSQLかRDBか」という二者択一よりも、「どの機能をどのデータストアに担わせるか」というポリグロット・パーシステンス的な発想そのものが主流になりました
                </li>
                <li>
                  <strong>本書が扱っていない領域</strong>
                  ：2012年刊行のため、当然ながらベクトルデータベース（Qdrant、Milvusなど）のようなAI・機械学習ワークロード向けの新しいカテゴリは扱われていません。これらは埋め込みベクトルの近似最近傍検索を中心に据えた、AI・ベクトル検索向けの追加カテゴリ（あるいは検索基盤）として2020年代に急速に発展した領域です。既存のドキュメントDBやRDBを置き換えるものとは限らず、pgvectorやMongoDB
                  Atlas Vector Searchのように既存DBの拡張として併用される形も一般的です
                </li>
              </ul>
            </section>

            <section className="section" id="critical">
              <h2>
                <IconAlertTriangle className="ti" size={24} />
                批判的に読む
              </h2>
              <p>本書を鵜呑みにせず、以下の点は意識しながら読むことをおすすめします。</p>
              <div className="callout gold">
                <IconAlertTriangle className="ti" size={24} />
                <div className="callout-body">
                  <ol>
                    <li>
                      <strong>「NoSQL」という言葉自体の定義のゆるさ</strong>
                      ：著者ら自身が「NoSQLは厳密な定義を持たない偶発的な新造語」と認めています。この言葉に過度な期待や統一的なイメージを重ねすぎないよう注意が必要です
                    </li>
                    <li>
                      <strong>代表例の陳腐化</strong>：上述の通り、Basho時代のRiak（旧来の{" "}
                      <code>basho/riak</code>{" "}
                      系統）の開発停止のように、10年以上前の「今のイチオシ」は現在では通用しないことがあります。個別の製品名よりも、その背後にある「データモデル」の考え方を吸収する読み方が長持ちします
                    </li>
                    <li>
                      <strong>CAP定理の単純化</strong>
                      ：本書のCAP定理の説明はわかりやすい反面、提唱者自身や後続の研究者による精緻化を踏まえると、「2つしか選べない」という理解だけで止まらないほうがよいでしょう
                    </li>
                    <li>
                      <strong>薄い本ゆえの割り切り</strong>
                      ：著者ら自身が「飛行機の中で読み切れる分量」を意図したと述べている通り、本書は意図的に各トピックを深掘りしすぎない設計になっています。実装の詳細（各製品のドライバの使い方、具体的なクエリ構文など）は別途、各製品の公式ドキュメントやKleppmann・RiccominiのDDIA第2版のような専門書で補う必要があります
                    </li>
                    <li>
                      <strong>AI時代のワークロードは対象外</strong>
                      ：ベクトル検索、埋め込み表現の保存といった、2020年代以降に一般化したAI関連のデータ管理の話題は、本書の守備範囲には含まれていません
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="section" id="glossary">
              <h2>
                <IconBook2 className="ti" size={24} />
                用語集
              </h2>
              <dl className="glossary">
                <dt>NoSQL</dt>
                <dd>非リレーショナルなデータベース群を指す、厳密な定義を持たない総称</dd>
                <dt>ポリグロット・パーシステンス</dt>
                <dd>データの使われ方に応じて複数のデータストア技術を使い分ける設計思想</dd>
                <dt>集約（Aggregate）</dt>
                <dd>
                  ひとまとまりとして扱うデータの集合。クラスタ上ではまとめて同じノードに配置される分散の単位となる。また、データストアの原子性単位が集約全体を覆う場合に限り、ACID操作の単位にもなりうる
                </dd>
                <dt>インピーダンス・ミスマッチ</dt>
                <dd>アプリ内のオブジェクト構造とリレーショナルなテーブル構造の間のズレ</dd>
                <dt>シャーディング</dt>
                <dd>データを分割して複数ノードに配置する分散手法</dd>
                <dt>レプリケーション</dt>
                <dd>同じデータを複数ノードに複製する分散手法</dd>
                <dt>CAP定理</dt>
                <dd>ネットワーク分断時に一貫性と可用性のどちらかを選ばざるを得ないという考え方</dd>
                <dt>結果整合性</dt>
                <dd>
                  対象データへの新たな更新が止まれば、いずれすべてのレプリカが同じ値に収束するという一貫性モデル。収束までの時間は保証されない
                </dd>
                <dt>バージョンスタンプ</dt>
                <dd>更新のたびに変化する識別子。楽観的並行性制御による競合検出に使う</dd>
                <dt>クォーラム</dt>
                <dd>読み書きの成功に必要なノード数の合意（W・R・Nの関係）</dd>
                <dt>Map-Reduce</dt>
                <dd>クラスタに分散したデータを集計するための計算モデル</dd>
                <dt>スキーマレス</dt>
                <dd>データベース自身がスキーマを強制しないこと。スキーマの責務がアプリ側に移る</dd>
                <dt>マテリアライズドビュー</dt>
                <dd>あらかじめ計算しておいた問い合わせ結果</dd>
                <dt>スキーマ移行（マイグレーション）</dt>
                <dd>データの構造変更を、バージョン管理された手順として適用する仕組み</dd>
                <dt>イベントソーシング</dt>
                <dd>状態ではなく、状態に至る変更イベントの履歴を保存する設計手法</dd>
              </dl>
            </section>

            <section className="section" id="checklist">
              <h2>
                <IconChecklist className="ti" size={24} />
                学習チェックリスト
              </h2>
              <NosqlDistilledChecklist />
            </section>

            <section className="section" id="summary">
              <h2>
                <IconFlag className="ti" size={24} />
                まとめ
              </h2>
              <p>
                『NoSQL
                Distilled』は、わずか150ページ強という分量の中に、NoSQLというジャンルを貫く概念――集約、分散モデル、一貫性、Map-Reduce、そして何よりポリグロット・パーシステンス――を凝縮した一冊です。個々の製品の使い方を教える本ではなく、「なぜこの技術が生まれ、何を得意とし、何が苦手なのか」という判断軸そのものを授けてくれる本だからこそ、刊行から10年以上経った今も色あせずに読み継がれています。
              </p>
              <p>
                一方で、具体的な製品事例（特にRiak）や、CAP定理の単純化された説明は、2026年時点の知見を踏まえて補いながら読む必要があります。本書で概念の地図を手に入れたら、次はMartin
                KleppmannとChris RiccominiのDesigning Data-Intensive Applications（第2版,
                2026）のような、より現代的で詳細な一冊に進むのがおすすめの学習パスです。
              </p>
            </section>

            <section className="section" id="references">
              <h2>
                <IconLink className="ti" size={24} />
                参考文献
              </h2>

              <div className="ref-group-title">著者本人・出版社の一次情報</div>
              <div className="ref-card">
                <div className="ref-num">1</div>
                <div className="ref-body">
                  <div className="ref-title">
                    NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence
                  </div>
                  <div className="ref-note">O'Reilly収録・目次全15章</div>
                  <div className="ref-url">
                    <Ext href="https://www.oreilly.com/library/view/nosql-distilled-a/9780133036138/">
                      oreilly.com/library/view/nosql-distilled-a/9780133036138
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">2</div>
                <div className="ref-body">
                  <div className="ref-title">Martin Fowler公式サイト：書籍紹介ページ</div>
                  <div className="ref-url">
                    <Ext href="https://martinfowler.com/books/nosql.html">
                      martinfowler.com/books/nosql.html
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">3</div>
                <div className="ref-body">
                  <div className="ref-title">Key Points from NoSQL Distilled</div>
                  <div className="ref-note">各章末の要点まとめ</div>
                  <div className="ref-url">
                    <Ext href="https://martinfowler.com/articles/nosqlKeyPoints.html">
                      martinfowler.com/articles/nosqlKeyPoints.html
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">4</div>
                <div className="ref-body">
                  <div className="ref-title">Martin Fowler bliki: PolyglotPersistence</div>
                  <div className="ref-url">
                    <Ext href="https://martinfowler.com/bliki/PolyglotPersistence.html">
                      martinfowler.com/bliki/PolyglotPersistence.html
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">5</div>
                <div className="ref-body">
                  <div className="ref-title">Martin Fowler bliki: Aggregate Oriented Database</div>
                  <div className="ref-url">
                    <Ext href="https://martinfowler.com/bliki/AggregateOrientedDatabase.html">
                      martinfowler.com/bliki/AggregateOrientedDatabase.html
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">6</div>
                <div className="ref-body">
                  <div className="ref-title">NoSQL and Polyglot Persistence</div>
                  <div className="ref-note">
                    原型となったインフォデック、QCon 2012（Martin Fowler / Pramod Sadalage）
                  </div>
                  <div className="ref-url">
                    <Ext href="https://martinfowler.com/articles/nosql-intro-original.pdf">
                      martinfowler.com/articles/nosql-intro-original.pdf
                    </Ext>
                  </div>
                </div>
              </div>

              <div className="ref-group-title">著者インタビュー・CAP定理をめぐる議論</div>
              <div className="ref-card">
                <div className="ref-num">7</div>
                <div className="ref-body">
                  <div className="ref-title">Interview and Book Review: NoSQL Distilled</div>
                  <div className="ref-note">著者2名へのインタビュー（Srini Penchikala, InfoQ）</div>
                  <div className="ref-url">
                    <Ext href="https://www.infoq.com/articles/nosql-distilled-book-review/">
                      infoq.com/articles/nosql-distilled-book-review
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">8</div>
                <div className="ref-body">
                  <div className="ref-title">
                    CAP Twelve Years Later: How the "Rules" Have Changed
                  </div>
                  <div className="ref-note">Eric Brewer、IEEE Computer誌、InfoQ転載</div>
                  <div className="ref-url">
                    <Ext href="https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/">
                      infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">9</div>
                <div className="ref-body">
                  <div className="ref-title">A Critique of the CAP Theorem</div>
                  <div className="ref-note">Martin Kleppmann, arXiv, 2015</div>
                  <div className="ref-url">
                    <Ext href="https://arxiv.org/pdf/1509.05393">arxiv.org/pdf/1509.05393</Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">10</div>
                <div className="ref-body">
                  <div className="ref-title">
                    Designing Data-Intensive Applications, 2nd Edition
                  </div>
                  <div className="ref-note">
                    Martin Kleppmann, Chris Riccomini（O'Reilly Media, 2026）公式サイト
                  </div>
                  <div className="ref-url">
                    <Ext href="https://dataintensive.net/">dataintensive.net</Ext>
                  </div>
                </div>
              </div>

              <div className="ref-group-title">背景知識・百科事典</div>
              <div className="ref-card">
                <div className="ref-num">11</div>
                <div className="ref-body">
                  <div className="ref-title">Wikipedia: Polyglot persistence</div>
                  <div className="ref-url">
                    <Ext href="https://en.wikipedia.org/wiki/Polyglot_persistence">
                      en.wikipedia.org/wiki/Polyglot_persistence
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">12</div>
                <div className="ref-body">
                  <div className="ref-title">Wikipedia: Martin Fowler (software engineer)</div>
                  <div className="ref-url">
                    <Ext href="https://en.wikipedia.org/wiki/Martin_Fowler_(software_engineer)">
                      en.wikipedia.org/wiki/Martin_Fowler_(software_engineer)
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">13</div>
                <div className="ref-body">
                  <div className="ref-title">Wikipedia: Riak</div>
                  <div className="ref-url">
                    <Ext href="https://en.wikipedia.org/wiki/Riak">en.wikipedia.org/wiki/Riak</Ext>
                  </div>
                </div>
              </div>

              <div className="ref-group-title">Riakの現況・コミュニティの反応</div>
              <div className="ref-card">
                <div className="ref-num">14</div>
                <div className="ref-body">
                  <div className="ref-title">Database of Databases: Riak</div>
                  <div className="ref-note">
                    開発が停止し「abandoned」と分類されている状況（Basho時代の系統）
                  </div>
                  <div className="ref-url">
                    <Ext href="https://dbdb.io/db/riak">dbdb.io/db/riak</Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">15</div>
                <div className="ref-body">
                  <div className="ref-title">"Riak the database survives Basho the company"</div>
                  <div className="ref-note">Basho破綻後のコミュニティの反応（Hacker News）</div>
                  <div className="ref-url">
                    <Ext href="https://news.ycombinator.com/item?id=16231080">
                      news.ycombinator.com/item?id=16231080
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">19</div>
                <div className="ref-body">
                  <div className="ref-title">OpenRiak: Riak 公式リリース一覧</div>
                  <div className="ref-note">3.4.0・3.4.1 など OpenRiak 体制でのリリース</div>
                  <div className="ref-url">
                    <Ext href="https://github.com/OpenRiak/riak/releases">
                      github.com/OpenRiak/riak/releases
                    </Ext>
                  </div>
                </div>
              </div>

              <div className="ref-group-title">
                国際的に著名な開発者の書評・データベース人気指標
              </div>
              <div className="ref-card">
                <div className="ref-num">16</div>
                <div className="ref-body">
                  <div className="ref-title">『NoSQL Distilled』書評</div>
                  <div className="ref-note">
                    Yevgeniy Brikman（Gruntwork共同創業者、"Terraform: Up &amp; Running"著者）
                  </div>
                  <div className="ref-url">
                    <Ext href="https://www.ybrikman.com/blog/2014/11/03/nosql-distilled/">
                      ybrikman.com/blog/2014/11/03/nosql-distilled
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">17</div>
                <div className="ref-body">
                  <div className="ref-title">『NoSQL Distilled』書評</div>
                  <div className="ref-note">Florian Hopf（検索技術コンサルタント）</div>
                  <div className="ref-url">
                    <Ext href="http://blog.florian-hopf.de/2017/11/book-review-nosql-distilled.html">
                      blog.florian-hopf.de/2017/11/book-review-nosql-distilled.html
                    </Ext>
                  </div>
                </div>
              </div>
              <div className="ref-card">
                <div className="ref-num">18</div>
                <div className="ref-body">
                  <div className="ref-title">DB-Engines Ranking</div>
                  <div className="ref-note">データベース人気ランキング、2026年9月時点</div>
                  <div className="ref-url">
                    <Ext href="https://db-engines.com/en/ranking">db-engines.com/en/ranking</Ext>
                  </div>
                </div>
              </div>
            </section>

            <div className="footer">
              本ガイドは学習・情報提供を目的として作成したものであり、書籍『NoSQL
              Distilled』本文の抜粋・引用ではなく、内容を独自にまとめ直したものです。正確な記述は必ず原著およびリンク先の一次情報源をご確認ください。
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
