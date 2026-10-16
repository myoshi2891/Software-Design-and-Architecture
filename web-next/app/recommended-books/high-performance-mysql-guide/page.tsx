import {
  IconAbc,
  IconActivity,
  IconAffiliate,
  IconAlertTriangle,
  IconArrowUpCircle,
  IconBook2,
  IconBrandBlogger,
  IconBrandDocker,
  IconBrandMedium,
  IconBuilding,
  IconCalendar,
  IconCalendarX,
  IconChartBar,
  IconChartLine,
  IconChecklist,
  IconCloud,
  IconCloudOff,
  IconCode,
  IconCopy,
  IconCpu,
  IconDatabase,
  IconDatabaseExport,
  IconFeather,
  IconFileText,
  IconFlag,
  IconFlagCheck,
  IconGauge,
  IconHierarchy3,
  IconInfoCircle,
  IconLanguage,
  IconLink,
  IconListSearch,
  IconMicrophone2,
  IconNotebook,
  IconRefresh,
  IconReportAnalytics,
  IconRoute,
  IconServer2,
  IconSettings,
  IconShieldCheck,
  IconShoppingCart,
  IconSparkles,
  IconStack2,
  IconStar,
  IconTable,
  IconTool,
  IconTrendingUp,
  IconUserCircle,
  IconUsers,
  IconVersions,
  IconZoomCode,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import HighPerformanceMysqlChecklist from "./HighPerformanceMysqlChecklist";
import HighPerformanceMysqlSidebar from "./HighPerformanceMysqlSidebar";

export const metadata: Metadata = {
  title: "High Performance MySQL 徹底解説ガイド | 初学者向けステップバイステップ解説",
  description:
    "O'Reilly『High Performance MySQL, 4th Edition』を章立てに沿って初学者向けにステップバイステップで解説。Mermaid図解と参考文献URL付き。",
};

const MERMAID_INIT = `%%{init: {"theme": "base", "themeVariables": {"fontFamily": "\\"Zen Kaku Gothic New\\", \\"Source Serif 4\\", sans-serif", "fontSize": "15px", "primaryColor": "#faf4e6", "primaryBorderColor": "#c9bd9b", "primaryTextColor": "#2b2420", "lineColor": "#8a7f70", "secondaryColor": "#e5e2f7", "tertiaryColor": "#fffdf8", "clusterBkg": "#faf4e6", "clusterBorder": "#ddd0b3", "edgeLabelBackground": "#faf4e6"}}}%%
`;

const DIAGRAM_1 = `${MERMAID_INIT}flowchart LR
    A["書籍全体　全13章と付録2本"]:::hub --> B["Part1 基礎　第1章から第3章　アーキテクチャと監視と計測"]
    B --> C["Part2 サーバ最適化　第4章から第6章　OSと設定とスキーマ設計"]
    C --> D["Part3 クエリとインデックス　第7章と第8章　実行計画の読み方と改善"]
    D --> E["Part4 運用とスケール　第9章から第11章　レプリケーションとバックアップと拡張"]
    E --> F["Part5 クラウドと統制　第12章と第13章と付録　クラウド運用とコンプライアンス"]
    classDef hub fill:#e3e0f7,stroke:#4b4a9e,stroke-width:2px,color:#25234f`;

const DIAGRAM_2 = `${MERMAID_INIT}flowchart TD
    Start["あなたの役割は？"]:::hub --> Dev["アプリケーション開発者"]
    Start --> NewDBA["これからDBAになる人"]
    Start --> SRE["SREやインフラ担当"]
    Start --> Manager["エンジニアリングマネージャー"]

    Dev --> DevPath["第6章のスキーマ設計　第7章のインデックス　第8章のクエリ最適化"]
    NewDBA --> DBAPath["第1章のアーキテクチャ　第5章のサーバ設定　第9章のレプリケーション　第10章のバックアップ"]
    SRE --> SREPath["第2章の監視とSLO　第4章のOS最適化　第11章のスケーリング　第12章のクラウド"]
    Manager --> MgrPath["第2章の監視とSLO　第13章のコンプライアンス"]
    classDef hub fill:#e3e0f7,stroke:#4b4a9e,stroke-width:2px,color:#25234f`;

const DIAGRAM_3 = `${MERMAID_INIT}flowchart TB
    Client["クライアントアプリケーション"] --> Conn["接続管理層　認証とスレッド割り当て"]
    Conn --> Parser["パーサー　SQL構文解析"]
    Parser --> Optimizer["クエリ最適化器　実行計画の決定"]
    Optimizer --> Exec["クエリ実行エンジン"]
    Exec --> InnoDB["InnoDBストレージエンジン"]
    Exec --> Other["その他のストレージエンジン　MyISAM等のレガシー用途"]
    InnoDB --> Files["データファイル　テーブルスペースとログ"]
    Other --> Files`;

const DIAGRAM_4 = `${MERMAID_INIT}flowchart LR
    A["サービスレベル目標SLOを定義する"] --> B["SLIを計測する　可用性とレイテンシとエラー率"]
    B --> C["ダッシュボードとアラートを構築する"]
    C --> D["しきい値超過を検知する"]
    D --> E["原因調査と対応"]
    E --> F["振り返ってSLOを見直す"]:::done
    F --> A
    classDef done fill:#d9ecdf,stroke:#2f6f52,stroke-width:2px,color:#173a28`;

const DIAGRAM_5 = `${MERMAID_INIT}flowchart TB
    A["MySQLサーバ内部のイベント発生"] --> B["Instruments　計測ポイントの定義"]
    B --> C["Consumers　収集したデータをテーブルに集約"]
    C --> D["sysスキーマ　人間が読みやすい形に変換"]
    D --> E["遅いクエリやロック待ちやメモリ使用状況の特定"]:::done
    classDef done fill:#d9ecdf,stroke:#2f6f52,stroke-width:2px,color:#173a28`;

const DIAGRAM_6 = `${MERMAID_INIT}flowchart TB
    RAM["サーバの物理メモリ"]:::hub --> OSCache["OSとファイルシステムのキャッシュ"]
    RAM --> PerConn["接続ごとのメモリ　sort_buffer_size等"]
    RAM --> BP["InnoDBバッファプール"]
    BP --> DataCache["データページのキャッシュ"]
    BP --> IndexCache["インデックスページのキャッシュ"]
    BP --> ChangeBuf["変更バッファ　セカンダリインデックス更新の遅延反映"]
    classDef hub fill:#e3e0f7,stroke:#4b4a9e,stroke-width:2px,color:#25234f`;

const DIAGRAM_7 = `${MERMAID_INIT}flowchart TD
    Q["遅いクエリを見つけた"] --> W["WHERE句とJOIN条件とORDER BYを確認する"]
    W --> S["絞り込み効果が高い列を特定する"]
    S --> M{"複数列の複合インデックスが必要か"}:::box
    M -->|"はい"| ML["等価条件、範囲条件、ソートの順で列を並べる"]
    M -->|"いいえ"| SL["単一列インデックスを検討する"]
    ML --> C["SELECT列も含めたカバリングインデックスを検討する"]
    SL --> C
    C --> V["EXPLAINで実行計画を検証する"]:::done
    classDef box fill:#f3e6c4,stroke:#b8933b,stroke-width:2px,color:#4a3a15
    classDef done fill:#d9ecdf,stroke:#2f6f52,stroke-width:2px,color:#173a28`;

const DIAGRAM_8 = `${MERMAID_INIT}flowchart LR
    A["スロークエリログ等で遅いクエリを検出する"] --> B["EXPLAINで実行計画を確認する"]
    B --> C["不要なデータ取得を削減する"]
    C --> D["インデックスやスキーマを調整する"]
    D --> E["クエリ自体を再構成する"]
    E --> F["本番相当環境で再測定する"]
    F --> G{"改善したか"}:::box
    G -->|"いいえ"| B
    G -->|"はい"| H["監視に組み込み継続的に観測する"]:::done
    classDef box fill:#f3e6c4,stroke:#b8933b,stroke-width:2px,color:#4a3a15
    classDef done fill:#d9ecdf,stroke:#2f6f52,stroke-width:2px,color:#173a28`;

const DIAGRAM_9 = `${MERMAID_INIT}flowchart TB
    Source["ソース　旧マスター"]:::hub --> R1["レプリカ1"]
    Source --> R2["レプリカ2"]
    Source --> R3["レプリカ3"]
    R1 --> Reads["読み取り専用トラフィック"]
    R2 --> Reads
    R3 --> Reads
    Source --> Writes["書き込みトラフィック"]
    classDef hub fill:#e3e0f7,stroke:#4b4a9e,stroke-width:2px,color:#25234f`;

const DIAGRAM_10 = `${MERMAID_INIT}flowchart TD
    B["バックアップ方式を選ぶ"]:::hub --> L["論理バックアップ　mysqldumpやmydumper"]
    B --> P["物理バックアップ　Percona XtraBackupやスナップショット"]
    L --> Small["移植性重視で比較的小規模なデータ"]
    P --> Large["高速リストア重視で大規模データ"]
    Small --> PITR["バイナリログを併用してポイントインタイムリカバリを実現する"]:::done
    Large --> PITR
    classDef hub fill:#e3e0f7,stroke:#4b4a9e,stroke-width:2px,color:#25234f
    classDef done fill:#d9ecdf,stroke:#2f6f52,stroke-width:2px,color:#173a28`;

const DIAGRAM_11 = `${MERMAID_INIT}flowchart TD
    Scale["スケーリング戦略"]:::hub --> Read["読み取りスケーリング"]
    Scale --> Write["書き込みスケーリング"]
    Read --> RP["リードプールとロードバランシング"]
    Read --> FuncShard["機能単位の分割　Functional Sharding"]
    Write --> Shard["データのシャーディング"]
    Shard --> Middleware["VitessやProxySQLなどのミドルウェア"]
    classDef hub fill:#e3e0f7,stroke:#4b4a9e,stroke-width:2px,color:#25234f`;

const DIAGRAM_12 = `${MERMAID_INIT}flowchart TD
    Start["MySQLの実行環境を選ぶ"] --> Q1{"運用負荷を減らしたいか"}:::box
    Q1 -->|"はい"| Managed["マネージドサービス　Amazon AuroraやGCP Cloud SQL"]
    Q1 -->|"いいえ"| Self["VM上で自己運用するMySQL"]
    Managed --> M2{"高可用性が必要か"}:::box
    M2 -->|"はい"| HA["マルチAZで自動フェイルオーバー構成にする"]:::done
    Self --> S2["マシンタイプとディスクタイプを選定する"]
    classDef box fill:#f3e6c4,stroke:#b8933b,stroke-width:2px,color:#4a3a15
    classDef done fill:#d9ecdf,stroke:#2f6f52,stroke-width:2px,color:#173a28`;

const DIAGRAM_13 = `${MERMAID_INIT}flowchart LR
    A["アップグレード計画を立てる"] --> B["開発環境で新バージョンをテストする"]
    B --> C["本番相当のミラー環境でテストする"]
    C --> D["レプリカへ先行適用する"]
    D --> E["段階的にプロモーションする"]
    E --> F["監視しながら完了を確認する"]:::done
    classDef done fill:#d9ecdf,stroke:#2f6f52,stroke-width:2px,color:#173a28`;

const CODE_MYCONF = `<span class="cm"># 本書の考え方に基づく設定例（値は環境ごとに調整が必要）</span>
<span class="kw">[mysqld]</span>
<span class="kw">innodb_buffer_pool_size</span> = <span class="nu">12G</span>        <span class="cm"># 物理メモリに応じて調整</span>
<span class="kw">innodb_buffer_pool_instances</span> = <span class="nu">8</span>     <span class="cm"># バッファプールを分割。8は上の 12G / 高並列OLTP を前提とした一例であり、8.4の既定値ではない</span>
                                     <span class="cm"># MySQL 8.4 の既定値はバッファプールサイズと利用可能な論理プロセッサ数から算出される</span>
                                     <span class="cm"># ワークロード（CPUコア数と並列度）に応じて見直す</span>
<span class="kw">innodb_flush_log_at_trx_commit</span> = <span class="nu">1</span>   <span class="cm"># デフォルト。耐久性重視</span>
<span class="kw">innodb_redo_log_capacity</span> = <span class="nu">2G</span>        <span class="cm"># 更新の多いワークロードでは大きめに（8.0.30以降）</span>
<span class="kw">max_connections</span> = <span class="nu">500</span>
<span class="kw">thread_cache_size</span> = <span class="nu">100</span>`;

export default function HighPerformanceMysqlPage() {
  return (
    <div className="high-performance-mysql-guide">
      <div className="app">
        <HighPerformanceMysqlSidebar />
        <main className="content" id="content">
          <header className="hero">
            <span className="kicker">
              <IconDatabase size={20} />
              O'REILLY　書籍解説シリーズ
            </span>
            <h1>High Performance MySQL: Proven Strategies for Operating at Scale 徹底解説ガイド</h1>
            <p>
              初学者からステップアップしたいエンジニアまでを対象に、O'Reilly刊『High Performance
              MySQL, 4th Edition』（Silvia Botros・Jeremy Tinley
              著）の内容を、章立てに沿って一つずつわかりやすく解説します。刊行以降のMySQLエコシステムの変化についても、Percona社やOracle
              MySQLチームなど国際的に著名な開発者・企業の発信をもとに補足しています。
            </p>
            <div className="hero-meta">
              <span>
                <IconUsers size={20} />
                Silvia Botros / Jeremy Tinley 著
              </span>
              <span>
                <IconCalendar size={20} />
                2021年11月刊行 第4版
              </span>
              <span>
                <IconStack2 size={20} />
                全13章 + 付録2本
              </span>
              <span>
                <IconLanguage size={20} />
                日本語ステップ解説
              </span>
            </div>
          </header>

          <section className="block" id="about">
            <span className="step-badge">
              <IconInfoCircle size={20} />
              GUIDE INFO
            </span>
            <h2>
              <IconInfoCircle size={20} />
              この記事について
            </h2>
            <ul className="tick">
              <li>
                <strong>対象書籍</strong>：High Performance MySQL: Proven Strategies for Operating
                at Scale（第4版）
                <br />
                原書ページ：
                <Ext href="https://www.oreilly.com/library/view/high-performance-mysql/9781492080503/">
                  https://www.oreilly.com/library/view/high-performance-mysql/9781492080503/
                </Ext>
              </li>
              <li>
                <strong>著者</strong>：Silvia Botros（Twilio
                シニア・プリンシパルエンジニア、元SendGrid）、Jeremy Tinley（Etsy
                シニアスタッフエンジニア、MySQL歴20年以上）
              </li>
              <li>
                <strong>序文</strong>：Jeremy Cole（元Google /
                Twitter、InnoDB内部構造研究で国際的に知られるエンジニア）が執筆
              </li>
              <li>
                <strong>出版</strong>：O'Reilly Media, Inc. / 2021年11月 / 386ページ
              </li>
              <li>
                <strong>本ガイドの方針</strong>
                ：各章の要点をステップごとに整理し、図解はすべてMermaidで表現、比較情報は表形式でまとめています。ASCIIアートによる図解は使用していません。
              </li>
            </ul>
          </section>

          <section className="block" id="book-info">
            <h2>
              <IconNotebook size={20} />
              書籍情報まとめ
            </h2>
            <div className="table-wrap">
              <table className="kv">
                <tbody>
                  <tr>
                    <th>タイトル</th>
                    <td>High Performance MySQL: Proven Strategies for Operating at Scale</td>
                  </tr>
                  <tr>
                    <th>版</th>
                    <td>第4版（Fourth Edition）</td>
                  </tr>
                  <tr>
                    <th>著者</th>
                    <td>Silvia Botros, Jeremy Tinley</td>
                  </tr>
                  <tr>
                    <th>序文</th>
                    <td>Jeremy Cole</td>
                  </tr>
                  <tr>
                    <th>出版社</th>
                    <td>O'Reilly Media, Inc.</td>
                  </tr>
                  <tr>
                    <th>出版年月</th>
                    <td>2021年11月</td>
                  </tr>
                  <tr>
                    <th>ページ数</th>
                    <td>386ページ</td>
                  </tr>
                  <tr>
                    <th>難易度</th>
                    <td>Intermediate to advanced（中級〜上級）</td>
                  </tr>
                  <tr>
                    <th>章構成</th>
                    <td>全13章 + 付録2本</td>
                  </tr>
                  <tr>
                    <th>ISBN</th>
                    <td>9781492080503（電子版） / 9781492080510（ペーパーバック）</td>
                  </tr>
                  <tr>
                    <th>前版との関係</th>
                    <td>
                      第3版（2012年）はBaron Schwartz・Peter Zaitsev・Vadim
                      Tkachenko（いずれもPercona創業に関わった著名なMySQLエンジニア）による著作で、本書はその精神を引き継ぎつつ、SRE的な運用思想やクラウド時代の実践に合わせて全面刷新されています
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="block" id="audience">
            <h2>
              <IconUsers size={20} />
              対象読者
            </h2>
            <p className="lede">
              本書は「中級〜上級」向けとされていますが、本ガイドでは初学者が段階的に理解できるよう構成を補足しています。以下のような人におすすめです。
            </p>
            <div className="grid grid-2">
              <div className="role-card">
                <div className="role-icon">
                  <IconCode size={20} />
                </div>
                <h4>アプリケーションエンジニア</h4>
                <p>
                  MySQLを使ったアプリケーションを開発しているが、パフォーマンスやスケールの話になると自信がない人
                </p>
              </div>
              <div className="role-card">
                <div className="role-icon">
                  <IconServer2 size={20} />
                </div>
                <h4>これからのDBA / SRE</h4>
                <p>
                  これからDBA（データベース管理者）やSRE（Site Reliability
                  Engineer）としてMySQL運用に関わる人
                </p>
              </div>
              <div className="role-card">
                <div className="role-icon">
                  <IconTool size={20} />
                </div>
                <h4>インフラ担当者</h4>
                <p>「なんとなく動いているMySQL」を、根拠を持って設計・運用できるようにしたい人</p>
              </div>
              <div className="role-card">
                <div className="role-icon">
                  <IconCloud size={20} />
                </div>
                <h4>クラウド運用の検討者</h4>
                <p>
                  クラウド上でMySQLを運用する際の選択肢（マネージドサービス vs
                  自己運用）を理解したい人
                </p>
              </div>
            </div>
          </section>
          <div className="part-divider">
            <span className="part-num">◆</span>
            <div className="part-text">
              <h2>全体像とロードマップ</h2>
            </div>
            <div className="line"></div>
          </div>

          <section className="block" id="structure">
            <h2>
              <IconHierarchy3 size={20} />
              本書の全体像（5部構成）
            </h2>
            <p>
              本書の13章＋付録2本は、内容的に次の5つのまとまりに整理できます。この5部構成が、本ガイドの「Step
              1」〜「Step 13」の土台になります。
            </p>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_1} />
              <div className="diagram-caption">図1．書籍全体の5部構成</div>
            </div>
          </section>

          <section className="block" id="roadmap">
            <h2>
              <IconRoute size={20} />
              学習ロードマップ（役割別のおすすめ順路）
            </h2>
            <p>
              全部を最初から順番に読む必要はありません。自分の立場に応じて、重点的に読む章を変えるのがおすすめです。
            </p>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_2} />
              <div className="diagram-caption">図2．役割別の学習ロードマップ</div>
            </div>
          </section>

          <section className="block" id="step0">
            <span className="step-badge">
              <IconFlag size={20} />
              STEP 0
            </span>
            <h2>
              <IconFlag size={20} />
              なぜ「ハイパフォーマンスなMySQL」が必要なのか
            </h2>
            <p>
              MySQLは初期設定のままでも「動く」データベースです。しかし、アクセス数やデータ量が増えてくると、次のような問題が表面化します。
            </p>
            <ul className="tick">
              <li>特定のクエリだけ急に遅くなる</li>
              <li>ある時間帯だけレプリケーションの遅延が広がる</li>
              <li>ディスクI/Oがボトルネックになり、スケールアップでは対処しきれなくなる</li>
              <li>障害発生時に「何がSLA違反の原因か」を素早く特定できない</li>
            </ul>
            <p>
              本書の第4版が第3版（2012年）と大きく異なる点は、単なる内部構造の解説にとどまらず、
              <strong>「サービスレベル目標（SLO）を起点に、チームとしてどう信頼性を作るか」</strong>
              という運用思想を前面に出していることです。これは、著者の一人であるSilvia
              BotrosがSendGridで、数十億通のメール送信を支えるデータベースプラットフォームの構築を支援してきた経験に基づいています。
            </p>
          </section>
          <div className="part-divider">
            <span className="part-num">1</span>
            <div className="part-text">
              <h2>Part1　基礎　第1章〜第3章</h2>
            </div>
            <div className="line"></div>
          </div>

          <section className="block" id="step1">
            <span className="step-badge">
              <IconCpu size={20} />
              STEP 1 ・ 第1章
            </span>
            <h2>
              <IconCpu size={20} />
              MySQLアーキテクチャを理解する
            </h2>

            <h3>1-1．MySQLの論理アーキテクチャ</h3>
            <p>
              MySQLは大きく分けて「接続層」「SQLレイヤー（パーサー・最適化器）」「ストレージエンジン層」の3層構造になっています。
            </p>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_3} />
              <div className="diagram-caption">図3．MySQLの論理アーキテクチャ</div>
            </div>
            <p>
              ポイントは、<strong>SQLレイヤーとストレージエンジン層が分離されている</strong>
              ことです。これにより、SQL構文の解釈やクエリ最適化はエンジン共通で行いつつ、実際のデータ格納・取得方法だけをストレージエンジンごとに切り替えられます。現在の実務では、ほぼ全てのテーブルで
              <strong>InnoDB</strong>を使うのが標準です。
            </p>

            <h3>1-2．同時実行制御（Concurrency Control）</h3>
            <p>
              複数のクライアントが同時に同じデータへアクセスするとき、MySQLは「読み書きロック」と「MVCC（多version同時実行制御）」を組み合わせて整合性を保っています。
            </p>
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
                    <td>読み書きロック</td>
                    <td>
                      共有ロックと排他ロックでアクセスを調停する基本方式。InnoDBでは
                      <code>READ COMMITTED</code> / <code>REPEATABLE READ</code>における通常の
                      <code>SELECT</code>は共有ロックを取らず（後述のMVCCによる一貫性読み取り）、
                      <code>SELECT ... FOR SHARE</code> / <code>FOR UPDATE</code>
                      のようなロッキングリードと書き込みだけが明示的にロックを取得する。ただし
                      <code>SERIALIZABLE</code>でautocommitが無効な場合、InnoDBは通常の
                      <code>SELECT</code>を暗黙的に<code>SELECT ... FOR SHARE</code>
                      として扱い、共有ロックを取得する
                    </td>
                  </tr>
                  <tr>
                    <td>ロック粒度</td>
                    <td>テーブル単位・行単位など、ロックの範囲。InnoDBは行レベルロックが基本</td>
                  </tr>
                  <tr>
                    <td>MVCC</td>
                    <td>
                      通常の<code>SELECT</code>
                      （一貫性読み取り）がロックを取らずにスナップショットを読める仕組み。
                      <code>READ COMMITTED</code>
                      では一貫性読み取りのたびに新しいスナップショットを取得し、
                      <code>REPEATABLE READ</code>
                      では同一トランザクション内の最初の一貫性読み取りで確立したスナップショットを使い続ける。どちらもこれが既定の動作で、読み取りと書き込みが互いをブロックしにくくなる。ロッキングリードは対象外で、最新行に対してロックを取る
                    </td>
                  </tr>
                  <tr>
                    <td>デッドロック</td>
                    <td>
                      複数のトランザクションが互いのロック解放を待ち合って停止する状態。InnoDBは自動検出してどちらかをロールバックする
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>1-3．トランザクション分離レベル</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>分離レベル</th>
                    <th>ダーティリード</th>
                    <th>ノンリピータブルリード</th>
                    <th>ファントムリード</th>
                    <th>備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>READ UNCOMMITTED</td>
                    <td>発生する</td>
                    <td>発生する</td>
                    <td>発生する</td>
                    <td>ほぼ使われない</td>
                  </tr>
                  <tr>
                    <td>READ COMMITTED</td>
                    <td>防げる</td>
                    <td>発生する</td>
                    <td>発生する</td>
                    <td>多くのOLTPシステムで採用</td>
                  </tr>
                  <tr>
                    <td>REPEATABLE READ</td>
                    <td>防げる</td>
                    <td>防げる</td>
                    <td>原則防げる（MVCC + ネクストキーロック）</td>
                    <td>
                      <strong>MySQLのデフォルト</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>SERIALIZABLE</td>
                    <td>防げる</td>
                    <td>防げる</td>
                    <td>防げる</td>
                    <td>最も安全だが並行性が大きく低下</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>1-4．その他、第1章で押さえておきたいトピック</h3>
            <ul className="tick">
              <li>
                <strong>トランザクションログ（redo log）</strong>
                ：クラッシュ時にコミット済みデータを復元するための仕組み
              </li>
              <li>
                <strong>レプリケーション</strong>
                ：第9章で詳しく扱う、複製によるスケールと可用性向上の基礎
              </li>
              <li>
                <strong>JSONドキュメントサポート</strong>：MySQL
                5.7以降、JSON型カラムでスキーマレスなデータも扱える
              </li>
              <li>
                <strong>データディクショナリの刷新とAtomic DDL</strong>：MySQL
                8.0でメタデータ管理がトランザクショナルになり、DDL（スキーマ変更）の途中失敗によるメタデータ不整合が起きにくくなった
              </li>
            </ul>
          </section>
          <section className="block" id="step2">
            <span className="step-badge">
              <IconActivity size={20} />
              STEP 2 ・ 第2章
            </span>
            <h2>
              <IconActivity size={20} />
              SREの視点で監視する
            </h2>
            <p className="lede">
              第4版で最も特徴的な章の一つです。「監視ツールを入れる」ことがゴールではなく、
              <strong>
                ビジネス上の信頼性目標からSLI/SLOを定義し、そこから逆算して何を計測すべきかを決める
              </strong>
              という考え方を提示しています。
            </p>

            <h3>2-1．SLI/SLOを起点にした監視サイクル</h3>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_4} />
              <div className="diagram-caption">図4．SLI / SLOを起点にした監視サイクル</div>
            </div>

            <h3>2-2．計測すべき代表的な指標</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>具体例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>可用性</td>
                    <td>接続成功率、ヘルスチェックの成否</td>
                  </tr>
                  <tr>
                    <td>クエリレイテンシ</td>
                    <td>p50 / p95 / p99 のクエリ応答時間</td>
                  </tr>
                  <tr>
                    <td>エラー</td>
                    <td>デッドロック発生数、接続エラー、レプリケーションエラー</td>
                  </tr>
                  <tr>
                    <td>長期トレンド</td>
                    <td>ディスク使用量の伸び、コネクション数の推移、ビジネスの繁忙期との相関</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              「何を測るか」は技術的な都合ではなく、
              <strong>顧客が何に困ると『使えない』と感じるか</strong>
              から逆算すべき、というのが本章の一貫した主張です。これは、著者らが実際にメール配信基盤という「止まったら即座にビジネス影響が出る」システムを運用してきた経験が色濃く反映されています。
            </p>
          </section>

          <section className="block" id="step3">
            <span className="step-badge">
              <IconGauge size={20} />
              STEP 3 ・ 第3章
            </span>
            <h2>
              <IconGauge size={20} />
              Performance Schemaを使いこなす
            </h2>
            <p>
              Performance
              Schemaは、MySQLサーバ内部で発生するイベント（クエリ実行、ロック待ち、I/O待ちなど）を計測するための標準機能です。
            </p>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_5} />
              <div className="diagram-caption">図5．Performance Schemaの計測フロー</div>
            </div>

            <h3>3-1．sysスキーマが便利な理由</h3>
            <p>
              Performance Schemaの生データは列数が多く読みにくいため、<code>sys</code>
              スキーマという「人間向けのビュー集」が用意されています。例えば以下のような用途で使われます。
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>目的</th>
                    <th>使うビュー（例）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>遅いSQL文の特定</td>
                    <td>
                      <code>sys.statements_with_runtimes_in_95th_percentile</code>
                    </td>
                  </tr>
                  <tr>
                    <td>メタデータロック待ちの確認</td>
                    <td>
                      <code>sys.schema_table_lock_waits</code>
                    </td>
                  </tr>
                  <tr>
                    <td>メモリ使用量の内訳確認</td>
                    <td>
                      <code>sys.memory_global_by_current_bytes</code>
                    </td>
                  </tr>
                  <tr>
                    <td>頻発しているエラーの確認</td>
                    <td>
                      <code>performance_schema.events_errors_summary_global_by_error</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>3-2．有効化・チューニングの基本</h3>
            <ul className="tick">
              <li>Performance Schemaは基本的にデフォルトで有効</li>
              <li>
                全インストゥルメントを有効化するとオーバーヘッドが増えるため、必要な項目だけを絞って有効化するのが実務的
              </li>
              <li>
                <code>performance_schema_max_*</code>系の変数でメモリサイズを調整できる
              </li>
            </ul>
          </section>
          <div className="part-divider">
            <span className="part-num">2</span>
            <div className="part-text">
              <h2>Part2　サーバ最適化　第4章〜第6章</h2>
            </div>
            <div className="line"></div>
          </div>

          <section className="block" id="step4">
            <span className="step-badge">
              <IconServer2 size={20} />
              STEP 4 ・ 第4章
            </span>
            <h2>
              <IconServer2 size={20} />
              OS・ハードウェアの最適化
            </h2>
            <p>
              MySQLのパフォーマンスは、MySQL単体の設定だけでなく、稼働しているOSやハードウェアの特性に大きく左右されます。
            </p>

            <h3>4-1．どこがボトルネックになりやすいか</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>リソース</th>
                    <th>ボトルネックになりやすい理由</th>
                    <th>対処の方向性</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CPU</td>
                    <td>複雑なクエリ・大量の同時接続でコアが埋まる</td>
                    <td>コア数と単一スレッド性能のバランスを見て選定</td>
                  </tr>
                  <tr>
                    <td>メモリ</td>
                    <td>InnoDBバッファプールが小さいとディスクI/Oが増える</td>
                    <td>ワーキングセット（頻繁にアクセスされるデータ量）に見合ったメモリを確保</td>
                  </tr>
                  <tr>
                    <td>ディスクI/O</td>
                    <td>ランダムI/Oが多いワークロードで顕著</td>
                    <td>SSD / NVMeの採用、適切なRAID構成</td>
                  </tr>
                  <tr>
                    <td>ネットワーク</td>
                    <td>レプリケーションや大量データ転送時に顕在化</td>
                    <td>帯域とレイテンシの両方を確認</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>4-2．ストレージ選定のポイント</h3>
            <ul className="tick">
              <li>
                <strong>SSD / フラッシュストレージ</strong>
                ：ランダムI/Oに強く、現在のMySQL運用ではほぼ標準
              </li>
              <li>
                <strong>RAID構成</strong>
                ：RAID10は読み書き双方の性能と冗長性のバランスが良く、多くの本番環境で採用される
              </li>
              <li>
                <strong>ファイルシステム</strong>
                ：ext4やXFSなど、ジャーナリングファイルシステムが一般的
              </li>
              <li>
                <strong>ディスクI/Oスケジューラ</strong>：Linuxのマルチキュー環境では
                <code>none</code>（スケジューリングを行わずデバイスへ直接発行）と
                <code>mq-deadline</code>
                （レイテンシ上限を設ける）が主な選択肢。どちらが有利かはカーネルバージョン・デバイス・ワークロードで変わるため、実際のワークロードでベンチマークを取って決める
              </li>
            </ul>

            <h3>4-3．メモリとスワップ</h3>
            <p>
              MySQLサーバでスワップが発生すると、バッファプールへのアクセスがディスクI/Oに化けてしまい性能が大きく劣化します。
              <code>vm.swappiness</code>
              を低めに設定し、極力スワップが発生しない構成を目指すことが推奨されています。
            </p>
          </section>

          <section className="block" id="step5">
            <span className="step-badge">
              <IconSettings size={20} />
              STEP 5 ・ 第5章
            </span>
            <h2>
              <IconSettings size={20} />
              サーバ設定の最適化
            </h2>

            <h3>5-1．メモリ配分の考え方</h3>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_6} />
              <div className="diagram-caption">図6．サーバメモリの配分イメージ</div>
            </div>
            <p>
              よく使われる目安は「専用DBサーバであれば、物理メモリの60〜80%程度をInnoDBバッファプールに割り当てる」という経験則です。ただし、接続数が多い場合は「接続ごとのメモリ使用量
              ×
              最大接続数」も考慮する必要があり、本書ではこの見積もり方を具体的な計算式とともに解説しています。
            </p>

            <h3>5-2．最低限おさえるべき設定項目（イメージ例）</h3>
            <div className="code-label">
              <IconFileText size={20} />
              my.cnf 設定例
            </div>
            <pre className="cd" dangerouslySetInnerHTML={{ __html: CODE_MYCONF }} />

            <div className="callout note">
              <IconInfoCircle size={20} />
              <div>
                <div className="callout-title">補足</div>
                <p>
                  原著執筆時点では<code>innodb_log_file_size</code>を使いますが、MySQL
                  8.0.30以降はこれに代わる<code>innodb_redo_log_capacity</code>
                  が推奨で、再起動なしにRedoログ容量を動的変更できます（詳細は本ガイド末尾の「2026年時点でのアップデート情報」を参照）。
                </p>
              </div>
            </div>

            <h3>5-3．設定変更で気をつけること</h3>
            <p>
              本書が繰り返し強調しているのは、「よくわからないままコピペした設定値を入れない」という姿勢です。
            </p>
            <ul className="tick">
              <li>変数のスコープ（グローバル／セッション）を理解してから変更する</li>
              <li>一度に多くの変数を変えず、変更の影響を1つずつ検証する</li>
              <li>本番へ適用する前に、ステージング環境で負荷テストを行う</li>
            </ul>
          </section>

          <section className="block" id="step6">
            <span className="step-badge">
              <IconTable size={20} />
              STEP 6 ・ 第6章
            </span>
            <h2>
              <IconTable size={20} />
              スキーマ設計と管理
            </h2>

            <h3>6-1．データ型選びの基本方針</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>データ型カテゴリ</th>
                    <th>選び方の原則</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>整数型</td>
                    <td>
                      必要な範囲に対して最小のバイト数の型を選ぶ（<code>INT</code>で十分なのに
                      <code>BIGINT</code>を使わない等）
                    </td>
                  </tr>
                  <tr>
                    <td>実数型</td>
                    <td>
                      金額など正確性が必要な値は<code>DECIMAL</code>、誤差が許容できる場合は
                      <code>FLOAT</code> / <code>DOUBLE</code>
                    </td>
                  </tr>
                  <tr>
                    <td>文字列型</td>
                    <td>
                      可変長データは<code>VARCHAR</code>、固定長かつ短い場合は<code>CHAR</code>
                      も検討
                    </td>
                  </tr>
                  <tr>
                    <td>日時型</td>
                    <td>
                      タイムゾーンを意識するなら<code>TIMESTAMP</code>、範囲が広い場合は
                      <code>DATETIME</code>
                    </td>
                  </tr>
                  <tr>
                    <td>ビットパックデータ</td>
                    <td>
                      フラグの集合などは<code>BIT</code>型やビット演算で圧縮できる場合がある
                    </td>
                  </tr>
                  <tr>
                    <td>JSON</td>
                    <td>
                      構造が頻繁に変わる付加的なデータに限定して使い、検索条件になる列は正規化する
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>6-2．よくある落とし穴（Schema Design Gotchas）</h3>
            <ul className="tick">
              <li>
                <strong>カラムが多すぎるテーブル</strong>
                ：1行のサイズが大きくなり、I/O効率が悪化する
              </li>
              <li>
                <strong>JOINが多すぎる設計</strong>
                ：過度な正規化はクエリを複雑にし、最適化器の負担も増える
              </li>
              <li>
                <strong>万能ENUMの濫用</strong>：<code>ENUM</code>
                型は変更コストが高く、値の追加・削除でスキーマ変更が必要になりがち
              </li>
              <li>
                <strong>見せかけのENUM</strong>：実質的に無制限に増える値を<code>ENUM</code>
                にしてしまうアンチパターン
              </li>
              <li>
                <strong>「NULLなんて使わない」という誤解</strong>
                ：NULLを無理に避けて意味のない初期値（空文字や0）で代用すると、かえってクエリの意味が曖昧になる
              </li>
            </ul>

            <h3>6-3．スキーマ管理をプラットフォーム化する</h3>
            <p>
              本書では、スキーマ変更（マイグレーション）を「属人的な手作業」から「データストア基盤の一部として自動化・レビュー可能なプロセス」に変えていくことの重要性が説かれています。オンラインDDLツール（gh-ost、pt-online-schema-changeなど）を使い、本番の読み書きを継続したままダウンタイムを最小化してスキーマ変更を行う運用が現在では一般的です。ただし完全な無停止ではなく、テーブルを切り替えるcut-over時には短時間のメタデータロックが発生します。適用前・適用中は、cut-over時のメタデータロック待ち、レプリカ遅延、行コピーやトリガー・binlog処理による追加負荷を監視する必要があります。
            </p>
          </section>
          <div className="part-divider">
            <span className="part-num">3</span>
            <div className="part-text">
              <h2>Part3　クエリとインデックス　第7章〜第8章</h2>
            </div>
            <div className="line"></div>
          </div>

          <section className="block" id="step7">
            <span className="step-badge">
              <IconListSearch size={20} />
              STEP 7 ・ 第7章
            </span>
            <h2>
              <IconListSearch size={20} />
              高パフォーマンスのためのインデックス設計
            </h2>

            <h3>7-1．インデックスの基本</h3>
            <p>
              InnoDBのインデックスはB-Tree構造が基本です。行データそのものを格納する「クラスタードインデックス」と、それ以外の「セカンダリインデックス」の違いを理解することが出発点になります。
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>インデックス種別</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>クラスタードインデックス</td>
                    <td>
                      行データそのものを葉に格納するインデックス。InnoDBでは、主キーがあれば主キー、なければNOT
                      NULLな適切なUNIQUE索引、それもなければ内部生成のローIDが用いられる
                    </td>
                  </tr>
                  <tr>
                    <td>セカンダリインデックス</td>
                    <td>
                      指定した列の値と、対応するクラスタードインデックスのキー値（通常は主キー値）を持つ。検索後にそのクラスタードインデックスのキーでデータ本体を引き直す
                    </td>
                  </tr>
                  <tr>
                    <td>カバリングインデックス</td>
                    <td>
                      SELECTで必要な列がすべてインデックスに含まれ、テーブル本体へのアクセスが不要になる
                    </td>
                  </tr>
                  <tr>
                    <td>プレフィックスインデックス</td>
                    <td>
                      長い文字列列の先頭N文字だけをインデックス化し、サイズと選択性のバランスを取る
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>7-2．インデックス設計の判断フロー</h3>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_7} />
              <div className="diagram-caption">図7．インデックス設計の判断フロー</div>
            </div>

            <h3>7-3．複合インデックスの列順の考え方</h3>
            <p>
              複合インデックスでは、<strong>「等価条件で使う列 → 範囲条件やソートで使う列」</strong>
              の順に並べるのが基本原則です（いわゆる「左端プレフィックスの法則」）。例えば
              <code>WHERE user_id = ? AND created_at &gt; ?</code>というクエリに対しては、
              <code>(user_id, created_at)</code>の順で複合インデックスを作るのが効果的です。
            </p>

            <h3>7-4．インデックスのメンテナンス</h3>
            <ul className="tick">
              <li>
                <strong>冗長インデックス・重複インデックス</strong>：<code>(a)</code>と
                <code>(a, b)</code>
                のように片方がもう片方の先頭部分と一致する場合、片方が不要になっていることが多い
              </li>
              <li>
                <strong>未使用インデックス</strong>
                ：書き込み時のオーバーヘッドだけが発生し読み取りに使われていないインデックスは削除候補
              </li>
              <li>
                <strong>統計情報の更新</strong>：<code>ANALYZE TABLE</code>
                で最適化器が使う統計を最新に保つ
              </li>
              <li>
                <strong>断片化の解消</strong>：<code>OPTIMIZE TABLE</code>
                やオンラインDDLツールでインデックス・データの断片化を整理する
              </li>
            </ul>
          </section>

          <section className="block" id="step8">
            <span className="step-badge">
              <IconZoomCode size={20} />
              STEP 8 ・ 第8章
            </span>
            <h2>
              <IconZoomCode size={20} />
              クエリパフォーマンスの最適化
            </h2>

            <h3>8-1．「なぜクエリは遅くなるのか」を考える出発点</h3>
            <p>
              本書は、クエリ最適化の第一歩を「<strong>不要なデータを取得していないか</strong>
              」というシンプルな問いに置いています。
            </p>
            <ul className="tick">
              <li>
                必要な列だけを<code>SELECT</code>しているか（<code>SELECT *</code>の濫用を避ける）
              </li>
              <li>
                MySQLが調べている行数（examined rows）と、実際に返している行数（returned
                rows）に大きな差がないか
              </li>
              <li>インデックスを使わずにフルスキャンしていないか</li>
            </ul>

            <h3>8-2．クエリ最適化の反復サイクル</h3>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_8} />
              <div className="diagram-caption">図8．クエリ最適化の反復サイクル</div>
            </div>

            <h3>8-3．クエリ再構成の代表的なテクニック</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>テクニック</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>複雑なクエリの分割</td>
                    <td>
                      EXPLAINと実測でJOINがボトルネックだと確認できた場合に限り、1本の巨大なJOINクエリを複数のシンプルなクエリ＋アプリ側結合へ分けることを検討する。トランザクション境界・往復回数・N+1クエリを制御できることが前提で、常用すべき一般的な最適化手法ではない
                    </td>
                  </tr>
                  <tr>
                    <td>クエリのチャンク化</td>
                    <td>大量データの一括更新・削除を、小さな単位に分割して負荷を平準化する</td>
                  </tr>
                  <tr>
                    <td>JOIN分解</td>
                    <td>
                      サブクエリやJOINを段階的に分解し、それぞれの実行計画を最適化しやすくする
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>8-4．特定パターンのクエリ最適化</h3>
            <ul className="tick">
              <li>
                <strong>COUNT()クエリ</strong>：条件なしの<code>COUNT(*)</code>
                はInnoDBでは想像以上にコストがかかる場合がある
              </li>
              <li>
                <strong>JOINクエリ</strong>：結合順序と結合に使う列のインデックスが性能を左右する
              </li>
              <li>
                <strong>GROUP BY + ROLLUP</strong>：集計の粒度を増やすほどコストが増える点に注意
              </li>
              <li>
                <strong>LIMIT / OFFSET</strong>
                ：大きなOFFSET値は、スキップする行も内部的には読み込むため非効率になりやすい
              </li>
              <li>
                <strong>SQL_CALC_FOUND_ROWS</strong>：ページネーションでよく使われてきたが、
                <code>SQL_CALC_FOUND_ROWS</code>と<code>FOUND_ROWS()</code>はMySQL
                8.0.17で非推奨となり、MySQL 8.4時点でも将来の削除が予告されている。
                <code>LIMIT</code>付きの取得クエリと、総件数を求める<code>COUNT(*)</code>
                クエリを別々に発行する方式へ移行する
              </li>
            </ul>
          </section>
          <div className="part-divider">
            <span className="part-num">4</span>
            <div className="part-text">
              <h2>Part4　運用とスケール　第9章〜第11章</h2>
            </div>
            <div className="line"></div>
          </div>

          <section className="block" id="step9">
            <span className="step-badge">
              <IconCopy size={20} />
              STEP 9 ・ 第9章
            </span>
            <h2>
              <IconCopy size={20} />
              レプリケーション
            </h2>

            <h3>9-1．レプリケーションの基本トポロジー</h3>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_9} />
              <div className="diagram-caption">図9．レプリケーションの基本トポロジー</div>
            </div>

            <h3>9-2．知っておきたい主要トピック</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>トピック</th>
                    <th>概要</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>バイナリログフォーマット</td>
                    <td>STATEMENT（SQL文そのもの）、ROW（変更行データ）、MIXED（両者の併用）</td>
                  </tr>
                  <tr>
                    <td>GTID（グローバルトランザクションID）</td>
                    <td>
                      トランザクションを一意なIDで識別し、フェイルオーバー後の再同期を容易にする
                    </td>
                  </tr>
                  <tr>
                    <td>準同期レプリケーション</td>
                    <td>
                      ソースが、設定した台数（既定1台）以上のレプリカからACKを受け取るまでコミットの完了応答を待つ。ACKはレプリカがリレーログへ書き込みディスクへフラッシュした時点で返るもので、レプリカ側でのSQL適用・コミットまでは待たない。タイムアウトまでに必要なACKが揃わない場合は非同期レプリケーションへフォールバックする
                    </td>
                  </tr>
                  <tr>
                    <td>マルチスレッドレプリケーション</td>
                    <td>
                      複数ワーカースレッドで並列にレプリケーション適用を行い、レプリケーション遅延を抑える
                    </td>
                  </tr>
                  <tr>
                    <td>遅延レプリケーション</td>
                    <td>意図的に適用を遅らせ、誤操作からの復旧などに利用するレプリカ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>9-3．レプリケーショントポロジーの選択肢</h3>
            <ul className="tick">
              <li>
                <strong>Active / Passive</strong>
                ：通常時は1台のソースだけが書き込みを受け付け、もう1台は待機系
              </li>
              <li>
                <strong>Active / Read Pool</strong>
                ：1台のソースに対して複数のレプリカが読み取りを分散して受け持つ、最も一般的な構成
              </li>
              <li>
                <strong>非推奨のトポロジー</strong>
                ：マルチソースレプリケーションのような複雑な構成は、整合性管理の難易度が高く本書でも慎重な扱いを推奨
              </li>
            </ul>

            <h3>9-4．よくあるレプリケーション障害と対処</h3>
            <ul className="tick">
              <li>ソース側でのバイナリログ破損</li>
              <li>サーバIDの重複・未設定</li>
              <li>
                一時テーブルの欠落によるレプリケーション停止（STATEMENT形式に固有の問題。ROW／MIXED形式では一時テーブルのみを使う文は通常バイナリログに記録されない。予期しないレプリカ停止で、開いていた一時テーブルが失われた場合に後続の文が失敗する）
              </li>
              <li>
                レプリケーション遅延の増大（大きなトランザクション、単一スレッド適用のボトルネックなどが典型的原因）
              </li>
            </ul>
          </section>

          <section className="block" id="step10">
            <span className="step-badge">
              <IconDatabaseExport size={20} />
              STEP 10 ・ 第10章
            </span>
            <h2>
              <IconDatabaseExport size={20} />
              バックアップとリカバリ
            </h2>

            <h3>10-1．バックアップ方式の選び方</h3>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_10} />
              <div className="diagram-caption">図10．バックアップ方式の選び方</div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>方式</th>
                    <th>メリット</th>
                    <th>デメリット</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>論理バックアップ（mysqldump / mydumper）</td>
                    <td>SQL文として可搬性が高く、異なるバージョン間の移行にも使える</td>
                    <td>データ量が大きいと取得・リストアに時間がかかる</td>
                  </tr>
                  <tr>
                    <td>物理バックアップ（Percona XtraBackup）</td>
                    <td>ファイル単位のコピーで高速、稼働中でも取得可能（ホットバックアップ）</td>
                    <td>基本的に同一・互換性あるMySQLバージョン間でのみ利用可能</td>
                  </tr>
                  <tr>
                    <td>ファイルシステムスナップショット</td>
                    <td>ほぼ瞬時に取得できる</td>
                    <td>ストレージ側の機能に依存し、一貫性の取り方に注意が必要</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>10-2．バックアップ設計で決めるべきこと</h3>
            <ul className="tick">
              <li>
                <strong>RPO（目標復旧時点）とRTO（目標復旧時間）をまず定義する</strong>
              </li>
              <li>フルバックアップと増分・差分バックアップの組み合わせ方</li>
              <li>バイナリログの管理（ローテーション、保存期間、専用ストレージへの退避）</li>
              <li>定期的な「リストア訓練」を行い、バックアップが実際に使えることを確認する</li>
            </ul>
          </section>

          <section className="block" id="step11">
            <span className="step-badge">
              <IconAffiliate size={20} />
              STEP 11 ・ 第11章
            </span>
            <h2>
              <IconAffiliate size={20} />
              MySQLのスケーリング
            </h2>

            <h3>11-1．読み取りスケーリングと書き込みスケーリング</h3>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_11} />
              <div className="diagram-caption">
                図11．読み取りスケーリングと書き込みスケーリング
              </div>
            </div>

            <h3>11-2．読み取りスケーリングの要点</h3>
            <ul className="tick">
              <li>
                <strong>リードプール</strong>
                ：複数のレプリカに読み取りクエリを分散する。非同期レプリケーションでは書き込み直後にレプリカを読むと反映前の古い値が返りうるため、自分の書き込みを読み返す必要がある読み取りはソースへ固定するか、対象トランザクションのレプリカ適用完了を待ってから読む（
                <code>WAIT_FOR_EXECUTED_GTID_SET</code>など）方針にする
              </li>
              <li>
                <strong>ヘルスチェック</strong>
                ：遅延しているレプリカやダウンしているレプリカをプールから自動的に外す。ただしヘルスチェックは閾値を超えた遅延を検出するだけで、閾値内の遅延による古い読み取りは防げない。半同期レプリケーションのACKもレプリカがバイナリログを受領した時点の保証であり、適用（反映）の完了までは保証しないため、これ単独でも解決にはならない
              </li>
              <li>
                <strong>ロードバランシングアルゴリズム</strong>
                ：ラウンドロビン、最小接続数ベースなど、ワークロードに応じた選択
              </li>
              <li>
                <strong>キューイング</strong>：瞬間的な負荷急増を平準化する仕組み
              </li>
            </ul>

            <h3>11-3．書き込みスケーリングとシャーディング</h3>
            <p>
              書き込みが単一サーバの限界に達した場合、データを複数のMySQLインスタンスに分割する「シャーディング」が必要になります。
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>検討事項</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>パーティショニングキーの選択</td>
                    <td>どの列を基準にデータを分割するか（例：user_id）</td>
                  </tr>
                  <tr>
                    <td>複数パーティショニングキー</td>
                    <td>1つのキーだけでは対応しきれないアクセスパターンへの対処</td>
                  </tr>
                  <tr>
                    <td>シャードをまたぐクエリ</td>
                    <td>集計やJOINがシャードをまたぐ場合の扱い方</td>
                  </tr>
                  <tr>
                    <td>Vitess</td>
                    <td>
                      YouTubeで開発され、CNCFに移管された、MySQL互換の分散データベースミドルウェア。透過的なシャーディングとコネクションプーリングを提供
                    </td>
                  </tr>
                  <tr>
                    <td>ProxySQL</td>
                    <td>クエリルーティングや負荷分散を担う高性能なMySQLプロキシ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              シャーディングは強力ですが、「アプリケーションがシャーディングキーを意識した設計になっている必要がある」「シャードをまたぐJOINや集計が難しくなる」といったトレードオフを伴うため、本書では
              <strong>
                まず読み取りスケーリングや機能分割で対応できないかを検討し、それでも足りない場合の最終手段として書き込みシャーディングを検討する
              </strong>
              という順序が推奨されています。
            </p>
          </section>
          <div className="part-divider">
            <span className="part-num">5</span>
            <div className="part-text">
              <h2>Part5　クラウドと統制　第12章〜第13章 + 付録</h2>
            </div>
            <div className="line"></div>
          </div>

          <section className="block" id="step12">
            <span className="step-badge">
              <IconCloud size={20} />
              STEP 12 ・ 第12章
            </span>
            <h2>
              <IconCloud size={20} />
              クラウドでのMySQL
            </h2>

            <h3>12-1．マネージドサービス vs 自己運用</h3>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_12} />
              <div className="diagram-caption">図12．クラウド実行環境の選び方</div>
            </div>

            <h3>12-2．主要な選択肢の比較</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>選択肢</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Amazon Aurora for MySQL</td>
                    <td>
                      ストレージ層をAWSが独自最適化し、ストレージ容量が使用量に応じて自動拡張される点と高い可用性が特徴。コンピュート（インスタンス）はプロビジョンド構成では自動スケールせず、負荷に応じた自動増減が必要ならAurora
                      Serverlessを選ぶ
                    </td>
                  </tr>
                  <tr>
                    <td>GCP Cloud SQL for MySQL</td>
                    <td>GCP環境との親和性が高く、運用の簡素化を重視するチーム向け</td>
                  </tr>
                  <tr>
                    <td>VM上での自己運用</td>
                    <td>
                      設定の自由度が最も高い反面、パッチ適用・バックアップ・冗長化まで自前で設計・運用する必要がある
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>12-3．マシンタイプ・ディスクタイプ選定の考え方</h3>
            <ul className="tick">
              <li>
                ワークロードがCPUバウンドかI/Oバウンドかを見極めてから、インスタンスタイプを選ぶ
              </li>
              <li>
                クラウドのブロックストレージにはIOPS・スループットの上限があるため、想定ワークロードに対して十分な性能のディスクタイプを選定する
              </li>
              <li>
                ネットワーク帯域もインスタンスタイプごとに上限があるため、レプリケーションやバックアップ転送量を考慮する
              </li>
            </ul>
          </section>

          <section className="block" id="step13">
            <span className="step-badge">
              <IconShieldCheck size={20} />
              STEP 13 ・ 第13章
            </span>
            <h2>
              <IconShieldCheck size={20} />
              MySQLにおけるコンプライアンス
            </h2>
            <p>
              現代のMySQL運用では、性能だけでなく「規制・監査要件を満たす設計」も重要なテーマです。
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>フレームワーク</th>
                    <th>概要</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SOC 2 Type 2</td>
                    <td>組織のセキュリティ統制が継続的に機能していることを示す監査基準</td>
                  </tr>
                  <tr>
                    <td>SOX法（Sarbanes-Oxley Act）</td>
                    <td>上場企業の財務報告の正確性・内部統制に関する米国法</td>
                  </tr>
                  <tr>
                    <td>PCI DSS</td>
                    <td>クレジットカード情報を扱う事業者向けのセキュリティ基準</td>
                  </tr>
                  <tr>
                    <td>HIPAA</td>
                    <td>米国における医療情報の保護に関する法律</td>
                  </tr>
                  <tr>
                    <td>FedRAMP</td>
                    <td>米国政府機関向けクラウドサービスのセキュリティ認証制度</td>
                  </tr>
                  <tr>
                    <td>GDPR</td>
                    <td>EU域内の個人データ保護規則</td>
                  </tr>
                  <tr>
                    <td>Schrems II</td>
                    <td>EU-US間の国際データ移転に関する欧州司法裁判所の判決とその影響</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>コンプライアンス実現のための実装ポイント</h3>
            <ul className="tick">
              <li>
                <strong>シークレット管理</strong>
                ：パスワードや認証情報をコードや設定ファイルに直書きしない
              </li>
              <li>
                <strong>役割とデータの分離</strong>：最小権限の原則に基づいたアクセス制御
              </li>
              <li>
                <strong>変更の追跡</strong>：誰が・いつ・何を変更したかを監査可能にする
              </li>
              <li>
                <strong>バックアップ・リストア手順の文書化と検証</strong>
                ：障害時にも規定の手順で確実に復旧できることを担保する
              </li>
            </ul>
          </section>

          <section className="block" id="appendix-a">
            <span className="step-badge">
              <IconArrowUpCircle size={20} />
              APPENDIX A
            </span>
            <h2>
              <IconArrowUpCircle size={20} />
              付録A．MySQLのアップグレード
            </h2>
            <div className="diagram-wrap">
              <MermaidDiagram chart={DIAGRAM_13} />
              <div className="diagram-caption">図13．アップグレードのライフサイクル</div>
            </div>
            <ul className="tick">
              <li>
                <strong>なぜアップグレードするのか</strong>
                ：セキュリティパッチ、性能改善、新機能の活用、サポート切れの回避
              </li>
              <li>
                <strong>アップグレードのライフサイクル</strong>：計画 → テスト → 段階的適用 →
                監視、という一連の流れを型化する
              </li>
              <li>
                <strong>テストの段階</strong>：開発環境でのテスト → 本番ミラー環境でのテスト →
                レプリカでの実地テスト、と徐々に本番へ近づける
              </li>
              <li>
                <strong>大規模環境でのアップグレード</strong>
                ：数百〜数千台規模になると、自動化されたツールチェーンなしでは現実的に運用できない
              </li>
            </ul>
          </section>

          <section className="block" id="appendix-b">
            <span className="step-badge">
              <IconBrandDocker size={20} />
              APPENDIX B
            </span>
            <h2>
              <IconBrandDocker size={20} />
              付録B．MySQL on Kubernetes
            </h2>
            <ul className="tick">
              <li>
                <strong>Kubernetesでのリソースプロビジョニング</strong>
                ：StatefulSetやPersistentVolumeを用いたステートフルなMySQL運用の基本
              </li>
              <li>
                <strong>目標を明確に絞り込む</strong>
                ：「Kubernetesで何を解決したいのか」を最初に定義する（オーケストレーションの自動化なのか、リソース効率化なのか）
              </li>
              <li>
                <strong>コントロールプレーンの選択</strong>：MySQL
                Operatorなど、どのツールでクラスタのライフサイクルを管理するかを選定する
              </li>
              <li>
                <strong>細部への目配り</strong>
                ：ストレージのパフォーマンス特性、Pod再起動時のフェイルオーバー挙動など、Kubernetes特有の落とし穴に注意する
              </li>
            </ul>
          </section>
          <div className="part-divider">
            <span className="part-num">◆</span>
            <div className="part-text">
              <h2>補足情報</h2>
            </div>
            <div className="line"></div>
          </div>

          <section className="block" id="updates2026">
            <h2>
              <IconRefresh size={20} />
              2026年時点でのアップデート情報
            </h2>
            <p className="lede">
              本書第4版は2021年11月刊行のため、それ以降のMySQLエコシステムの進化を補足します。ここでの情報は、Percona（第3版の共著者であるPeter
              ZaitsevとVadim Tkachenkoが創業した企業）およびOracle
              MySQLチームの公式発信をもとにしています。
            </p>

            <h3>MySQLのリリースモデルの変更（MySQL 8.4 LTS）</h3>
            <p>
              2024年、MySQLは新しいリリースモデルに移行しました。「Innovationリリース」（新機能を含む短いサポート期間のリリース）と「LTS（長期サポート）リリース」の2系統に分かれ、
              <strong>MySQL 8.4がその最初のLTSリリース</strong>
              となりました。本書執筆時点（2021年）にはまだ存在しなかった区分です。
            </p>

            <h3>InnoDBのデフォルト値の見直し</h3>
            <p>
              MySQL 8.4
              LTSでは、20個のサーバー変数（うち15個がInnoDB関連）のデフォルト値が、現代のハードウェア・ワークロードに合わせて見直されました。代表例は次のとおりです。
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>変数</th>
                    <th>従来のデフォルト</th>
                    <th>8.4 LTSでのデフォルト</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>innodb_adaptive_hash_index</code>
                    </td>
                    <td>ON</td>
                    <td>OFF</td>
                  </tr>
                  <tr>
                    <td>
                      <code>innodb_change_buffering</code>
                    </td>
                    <td>all</td>
                    <td>none</td>
                  </tr>
                  <tr>
                    <td>
                      <code>innodb_buffer_pool_in_core_file</code>
                    </td>
                    <td>ON</td>
                    <td>OFF（コアダンプにInnoDBバッファプールのページを含めない）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "1rem", color: "var(--ink-faint)" }}>
              出典：MySQL Community ManagerのFrédéric Descamps氏（lefred.be）の解説、およびMySQL
              8.4リファレンスマニュアルのInnoDBシステム変数の記載を参照しています。
            </p>

            <h3>動的なInnoDB Redoログ（Dynamic InnoDB Redo Log）</h3>
            <p>
              MySQL 8.0.30以降、本書執筆時点で使われていた<code>innodb_log_file_size</code>
              に代わり、<code>innodb_redo_log_capacity</code>
              という変数でRedoログの「容量」を指定する方式に変わりました。最大の変化は、
              <strong>サーバを再起動しなくてもRedoログ容量を動的に変更できる</strong>
              ようになった点です。以前は容量変更のたびに再起動が必要でした。
            </p>

            <h3>Percona発の最新パフォーマンス検証（2026年）</h3>
            <p>
              Perconaは2026年に入ってからも継続的にMySQLエコシステムのベンチマークを公開しています。2026年のPerconaのMySQLエコシステム性能検証レポートでは、MySQL（5.7
              / 8.0 / 8.4 / 9.6）・Percona Server（5.7 / 8.0 / 8.4）・MariaDB（10.11 / 11.4 /
              12.1）の計10バージョンがsysbench OLTPで比較されています（Percona
              Serverの9.x系は比較対象に含まれていません）。バッファプールサイズ・並列度・ネットワーク越しの実行といった条件別に、バージョンごとの性能特性の違いが報告されています。本書の内容を実践に移す際は、こうした最新のベンチマークデータも合わせて確認することが推奨されます。
            </p>

            <h3>水平スケーリングのエコシステム（Vitess / PlanetScale）</h3>
            <p>
              本書第11章で紹介されているVitessは、YouTubeが開発しCNCF（Cloud Native Computing
              Foundation）のプロジェクトとなった、MySQL互換の分散データベースミドルウェアです。VTGate（ステートレスなクエリルーター）とVTTablet（各MySQLインスタンスに付随するサイドカー）という構成で透過的なシャーディングを実現する仕組みは、本書刊行後も継続して進化しています。VitessをベースにしたマネージドサービスであるPlanetScaleも、書き込みスケーリングの選択肢として実務での採用が広がっています。
            </p>
          </section>

          <section className="block" id="critical">
            <h2>
              <IconAlertTriangle size={20} />
              批判的に読む：本書の限界と補完の必要性
            </h2>
            <p>
              どんなに優れた技術書にも刊行時点というものがあります。本書を活用する際は、次の点を意識すると良いでしょう。
            </p>

            <div className="callout critical">
              <IconCalendarX size={20} />
              <div>
                <div className="callout-title">刊行が2021年11月であること</div>
                <p>
                  MySQL 8.4 LTSのリリースモデル変更（2024年）や、動的Redoログ（MySQL
                  8.0.30、2022年）など、本書執筆後に登場した機能・変更は当然カバーされていません。
                </p>
              </div>
            </div>
            <div className="callout warn">
              <IconVersions size={20} />
              <div>
                <div className="callout-title">バージョン固有のデフォルト値は要確認</div>
                <p>
                  本書中のサーバ設定の考え方（メモリ配分やバッファプールサイジングの原則）は普遍性が高い一方、具体的なデフォルト値はversionごとに変わるため、必ず利用中のバージョンの公式ドキュメントで確認する必要があります。
                </p>
              </div>
            </div>
            <div className="callout warn">
              <IconCloudOff size={20} />
              <div>
                <div className="callout-title">クラウドサービスの機能は変化が速い</div>
                <p>
                  第12章で扱われるAurora・Cloud
                  SQLなどのマネージドサービスの機能・価格体系は頻繁にアップデートされるため、最新の公式情報を参照することが不可欠です。
                </p>
              </div>
            </div>
            <div className="callout note">
              <IconSparkles size={20} />
              <div>
                <div className="callout-title">AI・ベクトル検索など新しい用途への言及はない</div>
                <p>
                  本書刊行後、MySQLエコシステムにはベクトル検索やAIワークロード対応など新たな潮流も生まれています。伝統的なOLTPパフォーマンスチューニングを扱う本書の範囲外であることを理解した上で読む必要があります。
                </p>
              </div>
            </div>

            <p>
              本書の一番の価値は、個々の設定値の暗記ではなく、
              <strong>「なぜその設計判断をするのか」という思考プロセス</strong>
              （SLOから逆算する監視設計、データアクセスパターンから逆算するインデックス設計など）にあります。この思考プロセス自体は版が古くなっても陳腐化しにくい部分です。
            </p>
          </section>

          <section className="block" id="checklist">
            <h2>
              <IconChecklist size={20} />
              学習チェックリスト
            </h2>
            <p>
              以下は、本書の内容を実務に落とし込む際の確認項目です。クリックしてチェックできます。
            </p>
            <HighPerformanceMysqlChecklist />
          </section>

          <section className="block" id="glossary">
            <h2>
              <IconAbc size={20} />
              用語集
            </h2>
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
                    <td>InnoDB</td>
                    <td>
                      MySQLの標準ストレージエンジン。行レベルロックとMVCCによるトランザクション対応が特徴
                    </td>
                  </tr>
                  <tr>
                    <td>MVCC</td>
                    <td>
                      Multiversion Concurrency
                      Control。複数バージョンのデータを保持し、ロックを最小限に読み取りを可能にする仕組み
                    </td>
                  </tr>
                  <tr>
                    <td>バッファプール</td>
                    <td>InnoDBがデータ・インデックスをメモリ上にキャッシュする領域</td>
                  </tr>
                  <tr>
                    <td>Redoログ</td>
                    <td>クラッシュリカバリのために変更内容を記録するログ</td>
                  </tr>
                  <tr>
                    <td>GTID</td>
                    <td>
                      Global Transaction
                      Identifier。レプリケーションにおいてトランザクションを一意に識別するID
                    </td>
                  </tr>
                  <tr>
                    <td>カバリングインデックス</td>
                    <td>
                      クエリが必要とする列をすべて含み、テーブル本体へのアクセスを不要にするインデックス
                    </td>
                  </tr>
                  <tr>
                    <td>シャーディング</td>
                    <td>
                      データを複数のデータベースインスタンスに分割して格納し、書き込みをスケールさせる手法
                    </td>
                  </tr>
                  <tr>
                    <td>SLI / SLO</td>
                    <td>
                      Service Level Indicator /
                      Objective。信頼性を定量的に定義・計測するための指標と目標値
                    </td>
                  </tr>
                  <tr>
                    <td>Vitess</td>
                    <td>
                      MySQL互換の分散データベースミドルウェア。透過的なシャーディングを提供する
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="block" id="summary">
            <h2>
              <IconFlagCheck size={20} />
              まとめ
            </h2>
            <p>
              『High Performance MySQL, 4th
              Edition』は、単なる「MySQLの設定チューニング事典」ではなく、
              <strong>
                アーキテクチャの理解 → 計測に基づく監視 → データモデリング → クエリ最適化 →
                冗長化・拡張 → クラウド運用・コンプライアンス
              </strong>
              という一連の流れを、SRE的な視点で貫いた実践書です。
            </p>
            <p>
              初学者はまず第1章（アーキテクチャ）・第7章（インデックス）・第8章（クエリ最適化）から着手し、運用に関わるようになったら第2章（監視）・第9章（レプリケーション）・第10章（バックアップ）へと読み進めるのがおすすめです。本書刊行以降のバージョン変更点については、本ガイドの「2026年時点でのアップデート情報」やPercona・Oracle
              MySQLチームの公式発信を併読することで、内容を現在の環境にアップデートしながら活用できます。
            </p>
          </section>

          <section className="block" id="references">
            <h2>
              <IconLink size={20} />
              参考文献
            </h2>
            <div className="ref-list">
              <Ext
                className="ref-card"
                href="https://www.oreilly.com/library/view/high-performance-mysql/9781492080503/"
              >
                <span className="ref-icon">
                  <IconBook2 size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">O'Reilly公式書籍ページ（目次・概要）</div>
                  <div className="ref-url">
                    https://www.oreilly.com/library/view/high-performance-mysql/9781492080503/
                  </div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://www.oreilly.com/library/view/high-performance-mysql/9781492080503/foreword01.html"
              >
                <span className="ref-icon">
                  <IconFeather size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">序文（Jeremy Cole 執筆）</div>
                  <div className="ref-url">
                    https://www.oreilly.com/library/view/high-performance-mysql/9781492080503/foreword01.html
                  </div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://www.amazon.com/High-Performance-MySQL-Strategies-Operating/dp/1492080519"
              >
                <span className="ref-icon">
                  <IconShoppingCart size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">Amazon 書籍ページ（著者プロフィール）</div>
                  <div className="ref-url">
                    https://www.amazon.com/High-Performance-MySQL-Strategies-Operating/dp/1492080519
                  </div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://www.goodreads.com/book/show/60469941-high-performance-mysql"
              >
                <span className="ref-icon">
                  <IconStar size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">Goodreads 書籍ページ</div>
                  <div className="ref-url">
                    https://www.goodreads.com/book/show/60469941-high-performance-mysql
                  </div>
                </span>
              </Ext>
              <Ext className="ref-card" href="https://changelog.com/shipit/118">
                <span className="ref-icon">
                  <IconMicrophone2 size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">
                    Changelog「Ship It!」ポッドキャスト　Silvia Botros氏へのインタビュー（#118）
                  </div>
                  <div className="ref-url">https://changelog.com/shipit/118</div>
                </span>
              </Ext>
              <Ext className="ref-card" href="https://medium.com/@dbsmasher">
                <span className="ref-icon">
                  <IconBrandMedium size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">Silvia Botros氏 Medium プロフィール</div>
                  <div className="ref-url">https://medium.com/@dbsmasher</div>
                </span>
              </Ext>
              <Ext className="ref-card" href="https://leaddev.com/community/silvia-botros">
                <span className="ref-icon">
                  <IconUserCircle size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">Silvia Botros氏 LeadDevプロフィール</div>
                  <div className="ref-url">https://leaddev.com/community/silvia-botros</div>
                </span>
              </Ext>
              <Ext className="ref-card" href="https://en.wikipedia.org/wiki/Percona">
                <span className="ref-icon">
                  <IconBuilding size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">
                    Percona社概要（第3版著者 Peter Zaitsev・Vadim Tkachenkoの経歴）
                  </div>
                  <div className="ref-url">https://en.wikipedia.org/wiki/Percona</div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://www.percona.com/blog/engineer-duo-google-linkedin-join-innodb-talks/"
              >
                <span className="ref-icon">
                  <IconMicrophone2 size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">
                    Jeremy Cole氏によるInnoDB内部構造研究に関するインタビュー記事（Percona）
                  </div>
                  <div className="ref-url">
                    https://www.percona.com/blog/engineer-duo-google-linkedin-join-innodb-talks/
                  </div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://www.percona.com/blog/mysql-8-4-3-and-9-1-0-major-performance-gains-revealed/"
              >
                <span className="ref-icon">
                  <IconChartLine size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">
                    Percona Blog「MySQL 8.4.3 and 9.1.0：Major Performance Gains Revealed」
                  </div>
                  <div className="ref-url">
                    https://www.percona.com/blog/mysql-8-4-3-and-9-1-0-major-performance-gains-revealed/
                  </div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://www.percona.com/blog/2026-mysql-ecosystem-performance-benchmark-report/"
              >
                <span className="ref-icon">
                  <IconChartBar size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">
                    Percona Blog「2026 MySQL Ecosystem Performance Benchmark Report」
                  </div>
                  <div className="ref-url">
                    https://www.percona.com/blog/2026-mysql-ecosystem-performance-benchmark-report/
                  </div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://www.percona.com/blog/mysql-january-2026-performance-review/"
              >
                <span className="ref-icon">
                  <IconReportAnalytics size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">
                    Percona Blog「MySQL January 2026 Performance Review」
                  </div>
                  <div className="ref-url">
                    https://www.percona.com/blog/mysql-january-2026-performance-review/
                  </div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://www.percona.com/blog/performance-progression-of-percona-server-for-mysql-8-4/"
              >
                <span className="ref-icon">
                  <IconTrendingUp size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">
                    Percona Blog「Performance Progression of Percona Server for MySQL 8.4」
                  </div>
                  <div className="ref-url">
                    https://www.percona.com/blog/performance-progression-of-percona-server-for-mysql-8-4/
                  </div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html"
              >
                <span className="ref-icon">
                  <IconFileText size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">
                    MySQL 8.4リファレンスマニュアル「InnoDB Startup Options and System Variables」
                  </div>
                  <div className="ref-url">
                    https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html
                  </div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://dev.mysql.com/doc/refman/8.4/en/innodb-redo-log.html"
              >
                <span className="ref-icon">
                  <IconFileText size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">MySQL 8.4リファレンスマニュアル「Redo Log」</div>
                  <div className="ref-url">
                    https://dev.mysql.com/doc/refman/8.4/en/innodb-redo-log.html
                  </div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://lefred.be/content/mysql-8-4-lts-new-production-ready-defaults-for-innodb/"
              >
                <span className="ref-icon">
                  <IconBrandBlogger size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">
                    Frédéric Descamps氏（Oracle MySQL Community Manager）ブログ「MySQL 8.4 LTS: New
                    Production-Ready Defaults for InnoDB」
                  </div>
                  <div className="ref-url">
                    https://lefred.be/content/mysql-8-4-lts-new-production-ready-defaults-for-innodb/
                  </div>
                </span>
              </Ext>
              <Ext className="ref-card" href="https://vitess.io/docs/concepts/vtgate/">
                <span className="ref-icon">
                  <IconAffiliate size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">Vitess公式ドキュメント「VTGate」</div>
                  <div className="ref-url">https://vitess.io/docs/concepts/vtgate/</div>
                </span>
              </Ext>
              <Ext
                className="ref-card"
                href="https://vitess.io/docs/faq/getting-started/components"
              >
                <span className="ref-icon">
                  <IconAffiliate size={20} />
                </span>
                <span className="ref-body">
                  <div className="ref-title">Vitess公式ドキュメント「Components FAQ」</div>
                  <div className="ref-url">
                    https://vitess.io/docs/faq/getting-started/components
                  </div>
                </span>
              </Ext>
            </div>
          </section>

          <footer className="page-footer">
            <p>
              本ガイドはO'Reilly刊『High Performance MySQL, 4th Edition』（Silvia Botros・Jeremy
              Tinley
              著）の内容紹介・学習補助を目的とした二次的な解説記事です。書籍本文の引用は行わず、要旨の要約と実務的な補足情報で構成しています。正確な内容は必ず原著および公式ドキュメントをご確認ください。
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
