import {
  IconAlertTriangle,
  IconArrowsExchange,
  IconBook2,
  IconBulb,
  IconChartDots,
  IconChecklist,
  IconCloudNetwork,
  IconCrown,
  IconDatabase,
  IconFileText,
  IconFlag,
  IconFlag3,
  IconGitBranch,
  IconGitCompare,
  IconHeartbeat,
  IconHierarchy2,
  IconInfoCircle,
  IconLayersUnion,
  IconLink,
  IconListNumbers,
  IconMap2,
  IconQuote,
  IconRefresh,
  IconRoute,
  IconSearch,
  IconShieldCheck,
  IconSitemap,
  IconStack2,
  IconTable,
  IconTool,
  IconUsersGroup,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import DatabaseInternalsChecklist from "./DatabaseInternalsChecklist";
import DatabaseInternalsSidebar from "./DatabaseInternalsSidebar";

export const metadata: Metadata = {
  title: "Database Internals 完全ガイド ― 分散データシステムの内部を初学者向けに理解する",
  description:
    "Database Internals: A Deep Dive into How Distributed Data Systems Work（Alex Petrov著）を初学者向けにステップバイステップで解説する完全ガイド。",
};

const MERMAID_INIT = `%%{init: {"theme": "base", "themeVariables": {"fontFamily": "\\"Zen Kaku Gothic New\\", \\"Noto Sans JP\\", sans-serif", "fontSize": "16px", "primaryColor": "#e8e9fa", "primaryBorderColor": "#4a54c4", "primaryTextColor": "#2a2318", "lineColor": "#8a7f6c", "secondaryColor": "#faf0da", "tertiaryColor": "#ffffff", "edgeLabelBackground": "#ffffff", "nodeBorder": "#a99a6f", "clusterBkg": "#ede1c8", "clusterBorder": "#d3bf94", "titleColor": "#2a2318", "actorBkg": "#e8e9fa", "actorBorder": "#4a54c4", "actorTextColor": "#2a2318", "signalColor": "#5c5241", "signalTextColor": "#2a2318"}}}%%
`;

const CLASS_DEFS = `
    classDef hub fill:#e8e9fa,stroke:#4a54c4,stroke-width:2px,color:#2a2318;
    classDef done fill:#e5f2e9,stroke:#3c7a55,stroke-width:2px,color:#2a2318;
    classDef box fill:#f7e6ba,stroke:#ad7f26,stroke-width:2px,color:#2a2318;
`;

const DIAG_1 = `${MERMAID_INIT}flowchart TB
    A["Database Internals 全14章"] --> B["Part I ストレージエンジン 第1章から第7章"]
    A --> C["Part II 分散システム 第8章から第14章"]
    B --> B1["1台のマシンの中でデータをどう保存し高速に読み書きするか"]
    C --> C1["複数台のマシンで整合性を保ちながらデータを共有し続けるには"]
    class A hub
    class B1,C1 done${CLASS_DEFS}`;

const DIAG_2 = `${MERMAID_INIT}flowchart TB
    Client["クライアント アプリケーション"] --> Transport["トランスポート層 クライアント接続の管理"]
    Transport --> Query["クエリプロセッサ パーサーとオプティマイザ"]
    Query --> Exec["実行エンジン"]
    Exec --> Txn["トランザクションマネージャ"]
    Exec --> Lock["ロックマネージャ"]
    Txn --> Storage["ストレージエンジン"]
    Lock --> Storage
    Storage --> Buffer["バッファマネージャ ページキャッシュ"]
    Storage --> Recovery["リカバリマネージャ WAL"]
    Buffer --> Disk["データファイルとインデックスファイル ディスク上"]
    Recovery --> Disk
    class Client hub
    class Disk done${CLASS_DEFS}`;

const DIAG_3 = `${MERMAID_INIT}flowchart TB
    Root["ルートノード セパレータキーの集合"] --> N1["内部ノードA"]
    Root --> N2["内部ノードB"]
    N1 --> L1["リーフノード1 実際のキーと値"]
    N1 --> L2["リーフノード2 実際のキーと値"]
    N2 --> L3["リーフノード3 実際のキーと値"]
    N2 --> L4["リーフノード4 実際のキーと値"]
    class Root hub
    class L1,L2,L3,L4 done${CLASS_DEFS}`;

const DIAG_4 = `${MERMAID_INIT}flowchart TD
    Start["ルートノードから探索を開始"] --> Cmp["ノード内のセパレータキーと探索キーを比較"]
    Cmp --> IsLeaf{"リーフノードか"}
    IsLeaf -- いいえ --> Child["該当する範囲の子ポインタへ移動"]
    Child --> Cmp
    IsLeaf -- はい --> BinSearch["リーフノード内でバイナリサーチ"]
    BinSearch --> Found{"キーが見つかったか"}
    Found -- はい --> Return["対応する値を返す"]
    Found -- いいえ --> NotFound["該当なしを返す"]
    class Start hub
    class Return,NotFound done${CLASS_DEFS}`;

const DIAG_5 = `${MERMAID_INIT}flowchart TB
    Full["容量いっぱいのノードに"] --> Insert["新しいキーを挿入しようとする"]
    Insert --> Overflow{"ページサイズを超えるか"}
    Overflow -- いいえ --> Complete["そのまま挿入して完了"]
    Overflow -- はい --> Split["ノードを2つに分割する"]
    Split --> Left["左ノード 前半のキー群"]
    Split --> Right["右ノード 後半のキー群"]
    Split --> Promote["境界となったキーを親ノードへ昇格"]
    class Full hub
    class Complete done${CLASS_DEFS}`;

const DIAG_6 = `${MERMAID_INIT}flowchart TB
    Crash["クラッシュ発生と再起動"] --> Analysis["1 Analysisフェーズ ログを読みトランザクションテーブルとダーティページテーブルを再構築"]
    Analysis --> Redo["2 Redoフェーズ 未反映の更新を再適用 未コミット分も含む"]
    Redo --> Undo["3 Undoフェーズ 未コミットだった変更を取り消す"]
    Undo --> Recovered["整合性のとれた状態への復旧完了"]
    class Crash hub
    class Recovered done${CLASS_DEFS}`;

const DIAG_7 = `${MERMAID_INIT}flowchart TB
    CC["同時実行制御の方式"] --> Pess["悲観的 Pessimistic"]
    CC --> Opt["楽観的 Optimistic"]
    CC --> MVCC["マルチバージョン MVCC"]
    Pess --> Lock["ロックベース 2相ロッキングなどで事前に競合を防ぐ"]
    Opt --> Validate["まず処理しコミット前の検証フェーズで競合をチェックする"]
    MVCC --> Snapshot["書き込みと並行して読み取りは過去のスナップショットを参照する"]
    class CC hub${CLASS_DEFS}`;

const DIAG_8 = `${MERMAID_INIT}flowchart TB
    Write["書き込みリクエスト"] --> Memtable["Memtable メモリ上のソート済み構造"]
    Write --> WALog["WALへの書き込み 有効時のみ"]
    Memtable -- 一定サイズに到達 --> Flush["ディスクへフラッシュ"]
    Flush --> SSTable0["SSTable 新しいレベル"]
    SSTable0 --> Compaction["バックグラウンドでのコンパクション処理"]
    Compaction --> SSTable1["マージ済みSSTable 統合されたレベル"]
    class Write hub
    class SSTable1 done${CLASS_DEFS}`;

const DIAG_9 = `${MERMAID_INIT}flowchart TB
    Fault["障害モデルの分類"] --> Crash["クラッシュ障害 単に停止するだけ"]
    Fault --> Omission["欠落障害 メッセージの送受信が一部欠落する"]
    Fault --> Byzantine["ビザンチン障害 任意の異常な振る舞い"]
    Crash --> Easy["比較的対処しやすい"]
    Omission --> Medium["中程度の難しさ"]
    Byzantine --> Hard["対処が最も難しくPBFTなど専用アルゴリズムが必要"]
    class Fault hub
    class Byzantine,Hard box${CLASS_DEFS}`;

const DIAG_10 = `${MERMAID_INIT}flowchart TB
    Node["監視対象ノード"] -- 定期的にハートビートを送信 --> Monitor["監視ノード"]
    Monitor --> Check{"一定時間ハートビートが届いていないか"}
    Check -- いいえ --> Continue["正常とみなして監視を継続"]
    Check -- はい --> Phi["Φ Accrual 疑わしさスコアを計算する"]
    Phi --> Threshold{"スコアが閾値を超えたか"}
    Threshold -- はい --> Suspect["障害ノードとして扱う"]
    Threshold -- いいえ --> Continue
    class Node hub
    class Suspect box${CLASS_DEFS}`;

const DIAG_11 = `${MERMAID_INIT}flowchart TB
    A["線形化可能性 Linearizability"] -- 保証が弱くなる --> B["逐次一貫性 Sequential Consistency"]
    B -- 保証が弱くなる --> C["因果一貫性 Causal Consistency"]
    C -- 保証が弱くなる --> D["結果整合性 Eventual Consistency"]
    class A hub
    class D done${CLASS_DEFS}`;

const DIAG_12 = `${MERMAID_INIT}sequenceDiagram
    participant C as コーディネーター
    participant P1 as 参加者ノード1
    participant P2 as 参加者ノード2
    C->>P1: Prepare 準備はできているか
    C->>P2: Prepare 準備はできているか
    P1-->>C: Yes 準備完了
    P2-->>C: Yes 準備完了
    C->>P1: Commit コミットせよ
    C->>P2: Commit コミットせよ
    P1-->>C: Ack 完了
    P2-->>C: Ack 完了`;

const DIAG_13 = `${MERMAID_INIT}flowchart TB
    Diff["レプリカ間のデータ差分を検出したい"] --> Merkle["各レプリカでMerkle Treeを構築"]
    Merkle --> Compare["ルートハッシュから比較を開始"]
    Compare --> Match{"ハッシュは一致するか"}
    Match -- はい --> NoDiff["その配下は差分なしと確定"]
    Match -- いいえ --> Descend["不一致の枝だけをさらに下位で比較"]
    Descend --> Compare
    class Diff hub
    class NoDiff done${CLASS_DEFS}`;

const DIAG_14 = `${MERMAID_INIT}flowchart TB
    Follower["フォロワー"] -- 選挙タイムアウト --> Candidate["候補者"]
    Candidate -- 過半数の票を獲得 --> Leader["リーダー"]
    Candidate -. 対立候補が当選 .-> Follower
    Leader -. 新しい任期を検知 .-> Follower
    Leader -- 書き込みを受信 --> Replicate["ログエントリをフォロワーへ複製"]
    Replicate -- 過半数へ複製完了 --> Commit["コミットしてステートマシンへ適用"]
    class Follower hub
    class Commit done${CLASS_DEFS}`;

const DIAG_15 = `${MERMAID_INIT}flowchart TB
    Beginner["初級 DBMS全体像とB-Treeの基本を理解する STEP1から5"] --> Inter["中級 ファイル実装とトランザクションとLSM-Treeを学ぶ STEP6から11"]
    Inter --> Adv["上級 分散一貫性モデルとコンセンサスアルゴリズムを学ぶ STEP12から18"]
    Adv --> Practice["実践 PostgreSQLやCassandraやetcdなど実際のOSSコードを読んでみる"]
    class Beginner hub
    class Practice done${CLASS_DEFS}`;

export default function DatabaseInternalsPage() {
  return (
    <div className="database-internals-guide">
      <div className="app">
        <DatabaseInternalsSidebar />

        <div className="main">
          <header className="hero">
            <span className="hero-eyebrow">
              <IconDatabase size={16} /> 分散データシステム 初学者向け完全ガイド
            </span>
            <h1 className="hero-title">
              Database Internals 完全ガイド
              <br />
              分散データシステムの内部をステップバイステップで理解する
            </h1>
            <p className="hero-lead">
              原著 <em>Database Internals: A Deep Dive into How Distributed Data Systems Work</em>
              （Alex Petrov 著、O&apos;Reilly Media、2019年）の構成を尊重しつつ、初めてデータベース内部構造や分散システム理論に触れる読者でも理解できるよう、独自の言葉で噛み砕いて再構成した学習用ドキュメントです。全14章を18のSTEPに整理し、Mermaid図と具体例を添えて解説します。
            </p>
            <p className="hero-note">
              最終確認日 2026年9月21日時点の情報にもとづき作成。参考文献は本ページ末尾に一覧で掲載しています。
            </p>
          </header>

          <section className="section" id="intro">
            <div className="section-kicker">Introduction</div>
            <h2 className="section-title">
              <IconBulb size={24} />
              はじめに ― なぜ「データベースの中身」を学ぶ必要があるのか
            </h2>
            <div className="prose">
              <p>
                私たちは普段、PostgreSQL や MySQL、MongoDB、Cassandra といったデータベースを「ブラックボックス」として扱いがちです。SQL や API を叩けばデータが返ってくる ― それで十分に思えます。しかし、次のような場面に直面したとき、内部構造の知識が決定的な差を生みます。
              </p>
              <ul>
                <li>なぜこのクエリだけ極端に遅いのか、実行計画のどこがボトルネックなのかを推測したい</li>
                <li>新しいデータベースを選定するとき、ストレージエンジンやレプリケーション方式の違いから本質的なトレードオフを判断したい</li>
                <li>分散データベースで「たまに古いデータが読めてしまう」「ノード障害時にデータが消えた」といった問題の根本原因を理解したい</li>
                <li>自分自身でデータベースやキャッシュ、キューといったインフラコンポーネントを設計・実装したい</li>
              </ul>
              <p>
                本書 <em>Database Internals</em> は、まさにこうした問いに答えるために書かれた一冊です。著者の Alex Petrov 氏は Apache Cassandra のコミッター兼 PMC（Project Management Committee）メンバーであり、分散データベースの開発に携わってきた実務家です。本書は特定の製品を分解するのではなく、PostgreSQL・MySQL・MongoDB（WiredTiger）・Cassandra・etcd・CockroachDB・Spanner など、多種多様なデータベースに共通する「概念」を抽出して解説する点に特徴があります。
              </p>
              <div className="callout">
                <IconRoute size={20} />
                <div className="callout-body">
                  <span className="callout-title">本ガイドの進め方</span>
                  <p>
                    原著全14章の内容を18のSTEPに整理し、それぞれに Mermaid 図と具体例を添えて解説します。左のサイドバーから気になるSTEPへ直接ジャンプできます。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="book-info">
            <div className="section-kicker">Book Info</div>
            <h2 className="section-title">
              <IconBook2 size={24} />
              書籍情報
            </h2>
            <div className="book-panel">
              <div className="book-cover">
                <div>
                  <div className="book-cover-kicker">O&apos;Reilly Media 2019</div>
                  <div className="book-cover-title">Database Internals</div>
                  <div className="book-cover-sub">A Deep Dive into How Distributed Data Systems Work</div>
                </div>
                <div className="book-cover-author">著者 Alex Petrov</div>
              </div>
              <div className="book-info-wrap">
                <div className="table-wrap">
                  <table className="kv-table">
                    <tbody>
                      <tr>
                        <th>原題</th>
                        <td>Database Internals: A Deep Dive into How Distributed Data Systems Work</td>
                      </tr>
                      <tr>
                        <th>著者</th>
                        <td>Alex Petrov（Oleksandr Petrov）</td>
                      </tr>
                      <tr>
                        <th>出版社</th>
                        <td>O&apos;Reilly Media</td>
                      </tr>
                      <tr>
                        <th>初版発行</th>
                        <td>2019年10月</td>
                      </tr>
                      <tr>
                        <th>ページ数</th>
                        <td>初版・紙版で xix + 351ページ（前付19ページ＋本文351ページ＝全370ページ）。書誌データベースでは表紙等を含め約376ページと表記されることもある</td>
                      </tr>
                      <tr>
                        <th>ISBN 紙版</th>
                        <td>978-1492040347</td>
                      </tr>
                      <tr>
                        <th>ISBN 電子版</th>
                        <td>978-1492040309 / 978-1492040330</td>
                      </tr>
                      <tr>
                        <th>構成</th>
                        <td>全2部・全14章 + 付録A（参考文献一覧）</td>
                      </tr>
                      <tr>
                        <th>著者の経歴</th>
                        <td>Apache Cassandra コミッター・PMCメンバー。分散データベース・ストレージエンジンの開発実務の経験を持つ</td>
                      </tr>
                      <tr>
                        <th>公式サイト</th>
                        <td>
                          <Ext href="https://www.databass.dev/">
                            databass.dev
                          </Ext>
                          （著者本人が運営する本書の公式コンパニオンサイト。正誤表・著者情報を掲載）
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="overview">
            <div className="section-kicker">Big Picture</div>
            <h2 className="section-title">
              <IconMap2 size={24} />
              この本の全体像
            </h2>
            <div className="prose">
              <p>
                本書は大きく2つのパートに分かれています。<strong>Part I（ストレージエンジン）</strong>は「1台のマシンの中でデータをどのように保存し、効率よく読み書きするか」を扱い、<strong>Part II（分散システム）</strong>は「複数台のマシンにまたがってデータを複製・分散させながら、いかに一貫性を保つか」を扱います。この2部構成こそが、現代のほとんどのデータベース製品の違いを生み出している核心部分だと著者は述べています。
              </p>
              <div className="diagram-wrap" data-diagram="d1">
                <MermaidDiagram chart={DIAG_1} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図1 本書全体の構成マップ
                </div>
              </div>
              <p>
                原著と比較すると、しばしば話題になる <em>Designing Data-Intensive Applications</em>（Martin Kleppmann 著）が「データシステム全般の広く浅い地図」を描く本であるのに対し、本書はストレージエンジンの内部データ構造とコンセンサスアルゴリズムの実装レベルにまで踏み込む「深く狭い」本だと評されています。両者は競合ではなく補完関係にあると考えるとよいでしょう。
              </p>
            </div>
          </section>

          <section className="section" id="step1">
            <div className="section-kicker">STEP 1 ／ 第1章</div>
            <h2 className="section-title">
              <IconStack2 size={24} />
              DBMSの基本アーキテクチャを理解する
            </h2>
            <div className="prose">
              <p>
                データベース管理システム（DBMS）は、一枚岩のソフトウェアではなく、役割の異なる複数のコンポーネントが積み重なった「層構造」でできています。クライアントからのリクエストは、この層を上から下へと流れていきます。
              </p>
              <div className="diagram-wrap" data-diagram="d2">
                <MermaidDiagram chart={DIAG_2} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図2 DBMSアーキテクチャの層構造
                </div>
              </div>
              <p>
                ここで重要なのは、SQL のパースやクエリ最適化を行う「クエリプロセッサ」層と、実際にバイト列をディスクへ読み書きする「ストレージエンジン」層は、はっきり分離されているという点です。実際、MySQL（InnoDB や MyRocks）・MongoDB（WiredTiger）のように、上位のクエリ層を保ったまま、下位のストレージエンジンだけを差し替えられる設計のデータベースも存在します。SQLite はストレージエンジン自体は差し替えられませんが、ディスクアクセスを抽象化した VFS（Virtual File System）層を独自実装に置き換えられる点で、同様の層分離の考え方を体現しています。本書はこの下側、つまりストレージエンジンと分散データ管理の部分に的を絞った一冊です。
              </p>
              <p>
                また、本書はデータベースを「データファイル」と「インデックスファイル」という2種類のファイルの組み合わせとして捉えます。
              </p>
              <div className="two-col">
                <div className="mini-card">
                  <h4>データファイル</h4>
                  <p>レコードの実体（ペイロード）そのものを保存するファイル</p>
                </div>
                <div className="mini-card">
                  <h4>インデックスファイル</h4>
                  <p>キーから、対応するレコードの位置（データファイル上のオフセットなど）へのマッピングを保存するファイル</p>
                </div>
              </div>
              <p>
                多くの場合、インデックス自体が「キー→値」を直接保持する主インデックス（primary index）として振る舞い、値の部分にデータファイルへの間接参照（インダイレクション）を持たせる構成が取られます。
              </p>
            </div>
          </section>

          <section className="section" id="step2">
            <div className="section-kicker">STEP 2 ／ 第1章</div>
            <h2 className="section-title">
              <IconDatabase size={24} />
              メモリ型データベース vs ディスク型データベース
            </h2>
            <div className="prose">
              <p>
                データベースは、データの永続化場所によって大きく2種類に分類できます。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>分類</th>
                      <th>特徴</th>
                      <th>代表例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ディスク型（Disk-Based）</td>
                      <td>データセットがメモリに収まらないことを前提に、ディスク上の効率的なデータ構造（B-Tree、LSM-Treeなど）を中心に設計される</td>
                      <td>PostgreSQL、MySQL、Cassandra</td>
                    </tr>
                    <tr>
                      <td>メモリ型（In-Memory）</td>
                      <td>主要な処理をメモリ上で完結させ、高速なアクセスを実現する。ただしメモリは揮発性であるため、耐久性（Durability）の確保が別途必要になる</td>
                      <td>Redis、SAP HANA（の一部モード）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                メモリ型データベースであっても「耐久性が不要」というわけではありません。プロセスがクラッシュしたりマシンが再起動したりしても、コミット済みのデータが失われないようにする仕組み（スナップショット取得や追記型ログへの書き込みなど）が必要です。つまり、メモリ型データベースの多くも、実際にはディスクへの書き込みを内部で行っており、両者の境界は「常にディスク構造を主として使うか、メモリ上の構造を主として使い、ディスクは耐久性確保の補助として使うか」というアクセスパターンの違いとして理解するのが正確です。
              </p>
            </div>
          </section>

          <section className="section" id="step3">
            <div className="section-kicker">STEP 3 ／ 第1章</div>
            <h2 className="section-title">
              <IconTable size={24} />
              行指向ストレージ vs 列指向ストレージ
            </h2>
            <div className="prose">
              <p>
                もう1つの重要な分類軸が、レコードをどう物理的にレイアウトするかです。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>分類</th>
                      <th>考え方</th>
                      <th>得意なワークロード</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>行指向（Row-Oriented）</td>
                      <td>1レコード分のすべてのカラムをまとめて連続して保存する</td>
                      <td>OLTP：1件のレコード全体を読み書きする処理が多い場合</td>
                    </tr>
                    <tr>
                      <td>列指向（Column-Oriented）</td>
                      <td>同じカラムの値だけをまとめて連続して保存する物理的なデータ配置方式</td>
                      <td>OLAP：特定の数カラムだけを大量の行にわたって集計する処理が多い場合</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                例えば「全顧客の平均年齢を求める」というクエリでは、<code>age</code> カラムの値だけを連続して読み込める列指向の方が、無駄なディスクI/Oが少なく高速になります。一方、「顧客IDで1件のレコード全体を取得する」というクエリでは、行指向の方が1回のディスクアクセスでレコード全体を読み込めるため有利です。
              </p>
              <div className="callout gold">
                <IconAlertTriangle size={20} />
                <div className="callout-body">
                  <span className="callout-title">混同されやすい注意点</span>
                  <p>
                    Cassandra や Bigtable に代表される「ワイドカラムストア」は、名前が似ているため列指向ストレージと混同されがちですが、両者は別の層の概念です。列指向がディスク上の物理配置の話であるのに対し、ワイドカラムストアは「行／パーティション／カラムファミリ」という構造でデータを表現する論理データモデルを指します。実際、Cassandra はパーティション単位で行のデータをまとめて保持しており、物理配置としては列指向 OLAP エンジンとは異なる特性を持ちます。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="step4">
            <div className="section-kicker">STEP 4 ／ 第2章</div>
            <h2 className="section-title">
              <IconHierarchy2 size={24} />
              B-Treeの基礎を理解する
            </h2>
            <div className="prose">
              <p>
                Part I の中心的なテーマの1つが B-Tree です。B-Tree は、1970年代に Rudolf Bayer と Ed McCreight によって考案されて以来、半世紀近くにわたって PostgreSQL、MySQL（InnoDB）、Oracle、SQLite、MongoDB（WiredTiger）など、極めて多くのリレーショナル／非リレーショナルデータベースの標準的なインデックス構造として使われ続けています。
              </p>
              <p>
                なぜ単純な二分探索木（Binary Search Tree）ではなく B-Tree なのでしょうか。理由はディスクの物理特性にあります。
              </p>
              <ul>
                <li>ディスク（特に HDD）は、ランダムな位置への1回のアクセスに比較的大きなレイテンシがかかる</li>
                <li>一方で、一度アクセスした位置の「近く」を読むコスト（シーケンシャルアクセス）は非常に低い</li>
                <li>そのため、1回のディスクアクセスでできるだけ多くの情報（＝多くのキー）を読み込める構造が望ましい</li>
              </ul>
              <p>
                二分探索木は1ノードに1つのキーしか持てず、木の高さ（＝ディスクアクセス回数）は、平衡が保たれている場合でもキー数に対して対数的に増えていきます。さらに平衡化されていない二分探索木では、挿入順によって木が一方向に伸び、高さがキー数に対して線形にまで悪化します。これに対し B-Tree は、1ノード（多くの場合1ディスクページに対応）に多数のキーを持たせることで「扇（ファンアウト）」を大きくし、木の高さを低く保ちます。ファンアウトが十分に大きければ、数百万〜数十億件のレコードがあってもごく少数のディスクアクセスで目的のレコードにたどり着けます。ただし実際の I/O 回数は固定ではなく、木の高さ・ページサイズ・キーサイズ、そして上位ノードがバッファプールにキャッシュされているかどうかに左右されます。実務では上位数階層が常駐していることが多く、その場合ディスクへ実際に到達する回数はさらに減ります。
              </p>
              <div className="diagram-wrap" data-diagram="d3">
                <MermaidDiagram chart={DIAG_3} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図3 B-Treeの階層構造
                </div>
              </div>
              <p>
                B-Tree の各内部ノードは、子ノードへの「境界」となる「セパレータキー」を保持しています。探索時は、探索したいキーとセパレータキーを比較しながら、正しい子ノードへと下降していきます。
              </p>
            </div>
          </section>

          <section className="section" id="step5">
            <div className="section-kicker">STEP 5 ／ 第2章</div>
            <h2 className="section-title">
              <IconSearch size={24} />
              B-Treeの検索・分割・マージのアルゴリズム
            </h2>
            <div className="prose">
              <h3>検索アルゴリズム</h3>
              <div className="diagram-wrap" data-diagram="d4">
                <MermaidDiagram chart={DIAG_4} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図4 B-Treeの検索アルゴリズム
                </div>
              </div>
              <h3>ノード分割（Split）</h3>
              <p>
                B-Tree は「バランス木」であり、挿入や削除のたびに木のバランス（各リーフまでの深さが等しい状態）を保つよう再構成されます。あるノードにキーを挿入しようとしてページの容量を超えてしまう場合、そのノードは2つに分割され、分割の境界となったキーが親ノードへ「昇格」します。
              </p>
              <div className="diagram-wrap" data-diagram="d5">
                <MermaidDiagram chart={DIAG_5} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図5 B-Treeノード分割の流れ
                </div>
              </div>
              <p>
                逆に、削除によってノード内のキー数が少なくなりすぎた場合には、隣接ノードとの「マージ（併合）」や「再分配（リバランス）」が行われ、木全体の充填率が一定水準以上に保たれます。この分割・マージのロジックこそが B-Tree 実装の中でも特にバグを生みやすい部分であり、原著第4章では、この処理を安全に行うための「ブレッドクラム（経路の記録）」といった実装テクニックが詳しく解説されています。
              </p>
            </div>
          </section>

          <section className="section" id="step6">
            <div className="section-kicker">STEP 6 ／ 第3章</div>
            <h2 className="section-title">
              <IconFileText size={24} />
              ファイルフォーマットとページ構造
            </h2>
            <div className="prose">
              <p>
                B-Tree の各ノードは、多くの場合ディスク上の固定サイズの「ページ」（一般的に4KB〜16KB程度）1つに対応します。しかし、キーや値のサイズは可変長であることが多く、固定サイズのページの中に可変長データを効率よく詰め込む工夫が必要です。この目的でよく使われるのが「スロットページ（Slotted Page）」という構造です。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>領域</th>
                      <th>役割</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ページヘッダ</td>
                      <td>ページの種別、キー数、空き容量などのメタ情報</td>
                    </tr>
                    <tr>
                      <td>スロット配列（ポインタ配列）</td>
                      <td>各セル（キーと値のペア）へのオフセットを保持する配列。ページ先頭側から伸びていく</td>
                    </tr>
                    <tr>
                      <td>セル領域</td>
                      <td>実際のキー・値のバイト列。ページ末尾側から逆方向に詰められていく</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                スロット配列とセル領域を両端から向かい合わせに成長させることで、ページ内の空き領域を柔軟に使い切りつつ、セルの物理的な並び順を変えずに「論理的な順序」だけをスロット配列の並べ替えで表現できます。これにより、キーの挿入・削除のたびに毎回大量のバイト列をコピーし直す事態を避けられます。ただしセルは可変長であるため、削除で生じた隙間の再利用や、断片化して連続した空き領域が確保できなくなった場合には、セルの移動やページのコンパクション（デフラグ）が必要になります。
              </p>
              <p>
                このほか、本書ではプリミティブ型のバイナリエンコーディング方法、可変長文字列の扱い方、ページのバージョニング（フォーマット変更への対応）、チェックサムによる破損検出といった、実務でファイルフォーマットを設計する際に必須となる要素技術が解説されています。
              </p>
            </div>
          </section>

          <section className="section" id="step7">
            <div className="section-kicker">STEP 7 ／ 第4章</div>
            <h2 className="section-title">
              <IconTool size={24} />
              B-Tree実装の詳細
            </h2>
            <div className="prose">
              <p>
                実際にプロダクション品質の B-Tree を実装するには、STEP4〜5で説明した理論だけでは不十分です。原著第4章では、現実のデータベース実装で使われている以下のような実践的なテクニックが解説されています。
              </p>
              <ul>
                <li><strong>ページヘッダの設計</strong> マジックナンバー（フォーマット識別）、兄弟ページへのリンク（B-link Tree）、最右ポインタ、ノードのハイキー（そのノードが担当するキー範囲の上限）</li>
                <li><strong>オーバーフローページ</strong> 1つのセルが1ページに収まらないほど大きい場合に、別ページへ値を逃がす仕組み</li>
                <li><strong>インダイレクションポインタを使ったバイナリサーチ</strong> スロット配列を介した間接的な探索</li>
                <li><strong>バルクロード</strong> 大量データを初期投入する際に、逐次挿入よりも効率的に木を構築する手法</li>
                <li><strong>圧縮</strong> ページ単位・ブロック単位でのデータ圧縮</li>
                <li><strong>バキュームとデフラグメンテーション</strong> 更新・削除によって発生した断片化を解消し、ページの利用効率を回復させる処理</li>
              </ul>
              <p>
                これらは地味に思える工夫の積み重ねですが、実際のデータベース製品の性能・信頼性を大きく左右する部分です。
              </p>
            </div>
          </section>

          <section className="section" id="step8">
            <div className="section-kicker">STEP 8 ／ 第5章</div>
            <h2 className="section-title">
              <IconShieldCheck size={24} />
              トランザクション処理とクラッシュリカバリ
            </h2>
            <div className="prose">
              <h3>バッファマネージャとページキャッシュ</h3>
              <p>
                ディスクI/Oは依然としてメモリアクセスより何桁も遅いため、頻繁にアクセスされるページはメモリ上の「バッファプール（ページキャッシュ）」にキャッシュされます。バッファマネージャは、キャッシュのヒット判定、ページのピン留め（使用中ページの追い出し防止）、そしてキャッシュが満杯になったときにどのページを追い出すか（ページ置換アルゴリズム）を管理します。
              </p>
              <h3>Write-Ahead Logging（WAL）とクラッシュリカバリ</h3>
              <p>
                データベースが突然クラッシュしても、コミット済みのトランザクションのデータが失われてはいけません。これを実現する中心的な仕組みが<strong>WAL（Write-Ahead Log）</strong>です。「変更されたデータページをディスクへ書き出す前に、必ずその変更内容を記録したログを安定記憶へ永続化しておく」という原則です。メモリ上のページは先に書き換えて構わず、制約がかかるのはあくまでディスクへの書き出し順序である点が要点で、これによりランダムなページ書き込みを遅延させつつ、シーケンシャルなログ書き込みだけを同期化できます。
              </p>
              <div className="callout">
                <IconInfoCircle size={20} />
                <div className="callout-body">
                  <span className="callout-title">なぜREDOとUNDOの両方が必要なのか</span>
                  <p>
                    未コミットの更新を含む dirty page もディスクへ書き出してよい Steal 構成では、クラッシュ時点のディスク上に未コミットの更新が混ざりうるため、ログを再生するだけでは復旧が完結しません。ARIES に代表される手順では、まずログ上の更新を Redo してクラッシュ時点の状態を再現し、そのうえで未コミットだった更新を Undo することで、整合性のとれた状態へ戻します。
                  </p>
                </div>
              </div>
              <p>
                多くの実プロダクトが採用しているリカバリアルゴリズムが<strong>ARIES</strong>（Algorithm for Recovery and Isolation Exploiting Semantics、IBMが考案）です。ARIESは大きく3つのフェーズで構成されます。
              </p>
              <div className="diagram-wrap" data-diagram="d6">
                <MermaidDiagram chart={DIAG_6} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図6 ARIESリカバリの3フェーズ
                </div>
              </div>
              <p>
                このほか、ページを更新するタイミング（Steal / No-Steal）や、変更をいつディスクへ反映するか（Force / No-Force）というポリシーの組み合わせが、リカバリの複雑さと通常運用時の性能のトレードオフを決定づけます。
              </p>
            </div>
          </section>

          <section className="section" id="step9">
            <div className="section-kicker">STEP 9 ／ 第5章</div>
            <h2 className="section-title">
              <IconGitBranch size={24} />
              同時実行制御 ― 分離レベルとMVCC
            </h2>
            <div className="prose">
              <p>
                複数のトランザクションが同時にデータへアクセスするとき、互いに干渉して不整合な結果（read/write anomaly）を生まないようにする仕組みが「同時実行制御（Concurrency Control）」です。
              </p>
              <div className="diagram-wrap" data-diagram="d7">
                <MermaidDiagram chart={DIAG_7} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図7 同時実行制御の分類
                </div>
              </div>
              <div className="two-col">
                <div className="mini-card">
                  <h4>悲観的同時実行制御 PCC</h4>
                  <p>あらかじめロックを取得してから処理を行い、競合を未然に防ぐ。ロック待ちによるスループット低下がトレードオフ</p>
                </div>
                <div className="mini-card">
                  <h4>楽観的同時実行制御 OCC</h4>
                  <p>処理はロックなしで進め、コミット直前に競合が起きていないか検証し、競合していればロールバックする。競合が稀な場合に高いスループットを発揮する</p>
                </div>
                <div className="mini-card">
                  <h4>マルチバージョン同時実行制御 MVCC</h4>
                  <p>各行について複数のバージョンを保持し、読み取りは書き込みをブロックせずに自分から見えるバージョンを参照する。PostgreSQLをはじめ多くの現代的なデータベースが採用</p>
                </div>
              </div>
              <div className="callout gold">
                <IconAlertTriangle size={20} />
                <div className="callout-body">
                  <span className="callout-title">MVCCに関する注意</span>
                  <p>
                    どの範囲でスナップショットが固定されるか（文単位か、トランザクション単位か）は分離レベルと実装に依存し、読み取りトランザクション全体が常に同一のスナップショットを見るとは限りません。
                  </p>
                </div>
              </div>
              <p>
                また、原著ではこれらの方式の上に成り立つ「分離レベル（Isolation Levels）」（Read Uncommitted、Read Committed、Repeatable Read、Serializable など）と、それぞれのレベルで許容されてしまう異常（Dirty Read、Non-repeatable Read、Phantom Read など）が体系的に整理されています。
              </p>
            </div>
          </section>

          <section className="section" id="step10">
            <div className="section-kicker">STEP 10 ／ 第6章</div>
            <h2 className="section-title">
              <IconSitemap size={24} />
              B-Treeバリアント
            </h2>
            <div className="prose">
              <p>
                素朴な B-Tree にはいくつかの弱点があります。特に「更新のたびにページをその場（in-place）で書き換える」という性質は、並行書き込み時のロック管理や、SSDの書き込み摩耗（wear）の観点で不利になることがあります。原著第6章では、これらの課題に対応するために考案された多様な B-Tree の派生構造が紹介されています。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>バリアント</th>
                      <th>特徴</th>
                      <th>代表例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Copy-on-Write B-Tree</td>
                      <td>ページを直接書き換えず、変更が必要なページ（と、その祖先すべて）を新しいコピーとして書き出す。MVCCとの相性がよく、クラッシュ整合性も得やすい</td>
                      <td>LMDB</td>
                    </tr>
                    <tr>
                      <td>Lazy B-Tree</td>
                      <td>変更をすぐにはツリー構造へ反映せず、ノードやページ単位のバッファへいったん溜めてからまとめて適用する</td>
                      <td>WiredTiger</td>
                    </tr>
                    <tr>
                      <td>Lazy-Adaptive Tree</td>
                      <td>更新バッファをノード単位ではなくサブツリー単位で階層的に持ち、バッファが溢れた段階で下位のサブツリーへ伝播させる</td>
                      <td>研究論文由来</td>
                    </tr>
                    <tr>
                      <td>FD-Tree</td>
                      <td>Fractional Cascading の技法を用いて、複数の「ラン」を効率よく検索できるようにした構造</td>
                      <td>研究論文由来</td>
                    </tr>
                    <tr>
                      <td>Bw-Tree</td>
                      <td>ページをその場で更新せず、Compare-and-Swap（CAS）を用いた「更新チェーン」を追記していくことでロックフリーな並行性を実現する</td>
                      <td>SQL Server Hekathonなどの研究に由来</td>
                    </tr>
                    <tr>
                      <td>Cache-Oblivious B-Tree</td>
                      <td>van Emde Boas レイアウトを用い、特定のキャッシュサイズを意識しなくてもあらゆる階層のキャッシュに対して漸近的に最適なアクセス性能を発揮する</td>
                      <td>主に理論研究の文脈</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                これらは、STEP11で扱う「ログ構造化ストレージ」と合わせて、「その場更新（in-place update）」から「追記（append-only）」へとデータベースの世界がシフトしてきた歴史の中間地点に位置づけられる技術群です。
              </p>
            </div>
          </section>

          <section className="section" id="step11">
            <div className="section-kicker">STEP 11 ／ 第7章</div>
            <h2 className="section-title">
              <IconLayersUnion size={24} />
              ログ構造化ストレージ（LSM-Tree）
            </h2>
            <div className="prose">
              <p>
                B-Tree が「その場更新」を基本とするのに対し、<strong>LSM-Tree（Log-Structured Merge-Tree）</strong>は書き込みを主に「追記」として扱い、後段のコンパクションでデータを再編成する、まったく異なる設計思想のストレージ構造です。Cassandra、RocksDB、LevelDB、HBase など、多くの現代的な NoSQL データベースがこの方式を採用しています。
              </p>
              <p>
                LSM-Tree の基本的な考え方は次の通りです。
              </p>
              <ol>
                <li>書き込みは、まずメモリ上のソート済み構造（<strong>Memtable</strong>、多くは Skiplist などで実装）へ即座に反映される。実装や設定で WAL が有効な場合は、同時に耐障害性のために WAL へも書き込まれる。WAL は無効化できる設定を持つ製品もあり（RocksDBの <code>disableWAL</code>、Cassandraの <code>durable_writes = false</code> など）、無効にするとフラッシュ前の書き込みはクラッシュ時に失われる</li>
                <li>Memtable が一定サイズに達すると、その内容がソート済みのまま<strong>SSTable</strong>（Sorted String Table）としてディスクへ書き出される（フラッシュ）</li>
                <li>時間の経過とともにディスク上に多数の SSTable が蓄積していく</li>
                <li>バックグラウンドで定期的に<strong>コンパクション</strong>が実行され、複数の SSTable がマージされて、より少数の・より大きな SSTable へと統合される</li>
              </ol>
              <div className="diagram-wrap" data-diagram="d8">
                <MermaidDiagram chart={DIAG_8} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図8 LSM-Treeの構造とコンパクション
                </div>
              </div>
              <p>
                LSM-Tree の読み取りは、B-Tree に比べて本質的に複雑です。あるキーの最新の値がどこにあるかは、Memtable と複数のレベルの SSTable のいずれにも存在しうるため、複数の場所をマージしながら探索する必要があります（Merge-Iteration）。この探索コストを削減するために<strong>Bloom Filter</strong>（あるキーがそのSSTableに「絶対に存在しない」ことを高速に判定できる確率的データ構造）が広く使われています。
              </p>
              <p>
                原著では、この読み取り・書き込み・空間の3つの増幅（<strong>RUM予想</strong>：Read／Update／Memory amplification）というトレードオフの枠組みで、LSM-Tree の設計判断を評価しています。さらに、SSTableのような整列済み構造すら持たない「非整列型LSMストレージ」の代表例として Bitcask（Riak の初期ストレージエンジン）や WiscKey（キーとバリューを分離して格納しコンパクションコストを削減する設計）も紹介されています。
              </p>
            </div>
          </section>

          <section className="section" id="part1-summary">
            <div className="section-kicker">Part I Conclusion</div>
            <h2 className="section-title">
              <IconFlag size={24} />
              Part Iまとめ ― ストレージエンジンの全体像
            </h2>
            <div className="prose">
              <p>
                ここまでの STEP1〜11 で、Part I「ストレージエンジン」の全体像を見てきました。要点を整理すると、ストレージエンジンの設計は、大きく「その場更新型（In-Place Update）」と「ログ構造化型（Log-Structured / Immutable）」という2つの系譜に分けられ、それぞれにトレードオフがあります。
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>観点</th>
                      <th>B-Tree系（主にその場更新型）</th>
                      <th>LSM-Tree系（ログ構造化型）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>書き込み特性</td>
                      <td>ランダムI/Oが発生しやすい</td>
                      <td>シーケンシャルI/Oが中心で書き込みが高速</td>
                    </tr>
                    <tr>
                      <td>読み取り特性</td>
                      <td>1回の探索で完結し高速</td>
                      <td>複数レベルをマージする必要があり相対的に複雑</td>
                    </tr>
                    <tr>
                      <td>空間効率</td>
                      <td>断片化への対処（デフラグ）が必要</td>
                      <td>コンパクションにより整理されるが、一時的に余分な空間を使う</td>
                    </tr>
                    <tr>
                      <td>代表的な採用例</td>
                      <td>PostgreSQL、MySQL（InnoDB）、MongoDB（WiredTiger）</td>
                      <td>Cassandra、RocksDB、LevelDB、HBase</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                どちらが「優れている」というものではなく、書き込みが多いワークロードか読み取りが多いワークロードか、SSDかHDDか、といった条件によって最適解が変わる、というのが本書 Part I 全体を通じた重要なメッセージです。
              </p>
            </div>
          </section>

          <section className="section" id="step12">
            <div className="section-kicker">STEP 12 ／ 第8章</div>
            <h2 className="section-title">
              <IconCloudNetwork size={24} />
              分散システムの基礎的な難しさ
            </h2>
            <div className="prose">
              <p>
                Part II では舞台が「1台のマシンの中」から「複数台のマシンをまたいだネットワーク」へと移ります。1台のマシンの中で完結する処理と比べ、分散システムには根本的に異なる難しさがあります。
              </p>
              <ul>
                <li><strong>ネットワークは信頼できない</strong> メッセージは遅延する、失われる、重複する、順序が入れ替わることがある</li>
                <li><strong>部分的な障害（Partial Failure）が起こりうる</strong> あるノードは正常に動き続け、別のノードだけがクラッシュする、というような「一部だけ壊れる」状況が常態化する</li>
                <li><strong>クロックは同期していない</strong> 各ノードの時計にはズレ（クロックドリフト）があり、「イベントAとイベントBのどちらが先に起きたか」を単純なタイムスタンプ比較だけでは判定できない</li>
              </ul>
              <p>
                こうした難しさを理論的に裏付ける、分散システムの古典的な2つの結果が本章で紹介されます。
              </p>
              <div className="two-col">
                <div className="mini-card">
                  <h4>Two Generals&apos; Problem（二将軍問題）</h4>
                  <p>信頼できない通信路を使って、2つの主体が「攻撃するタイミング」について100%確実な合意に至ることは、原理的に不可能であることを示す思考実験</p>
                </div>
                <div className="mini-card">
                  <h4>FLP不可能性</h4>
                  <p>非同期分散システムにおいて、1つのプロセスがクラッシュしうるだけで、決定的なアルゴリズムではコンセンサスの停止性（必ず有限時間で決着すること）を保証できないことを示した、Fischer・Lynch・Paterson による有名な定理。安全性にあたるAgreementやValidityが崩れるという主張ではない</p>
                </div>
              </div>
              <div className="diagram-wrap" data-diagram="d9">
                <MermaidDiagram chart={DIAG_9} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図9 分散システムにおける障害モデルの分類
                </div>
              </div>
              <p>
                これらの理論的限界は「悲観的な話」に聞こえるかもしれませんが、実際には「完璧な解決策は存在しない以上、どの保証を諦め、どの保証を優先するかを意識的に設計する」という、分散システム設計における現実的な姿勢の土台になっています。この考え方は、STEP15で扱う一貫性モデルの議論に直結していきます。
              </p>
            </div>
          </section>

          <section className="section" id="step13">
            <div className="section-kicker">STEP 13 ／ 第9章</div>
            <h2 className="section-title">
              <IconHeartbeat size={24} />
              障害検出アルゴリズム
            </h2>
            <div className="prose">
              <p>
                非同期システムでは、あるノードが「本当にクラッシュしたのか」「単にネットワークが遅いだけなのか」を確実に区別する方法が存在しません。メッセージ遅延に上限がない以上、応答がないという事実だけからは両者を判別できないためで、これは障害検出器（Failure Detector）モデルが本質的に抱える限界です。
              </p>
              <div className="callout plum">
                <IconInfoCircle size={20} />
                <div className="callout-body">
                  <span className="callout-title">FLP不可能性との違い</span>
                  <p>
                    FLP不可能性（Fischer・Lynch・Paterson）は「非同期システムにおいて、たった1つのプロセスがクラッシュしうるだけでも、決定性のあるアルゴリズムでコンセンサスの停止性を保証することはできない」という結果を指します。障害検出が困難であること自体を述べた定理ではなく、コンセンサスの解決可能性に関する主張である点に注意が必要です。
                  </p>
                </div>
              </div>
              <p>
                こうした理論的限界があるため、実践的なシステムでは確実な判定を諦め、「疑わしさ」を確率的・ヒューリスティックに判定する障害検出器が使われます。
              </p>
              <div className="diagram-wrap" data-diagram="d10">
                <MermaidDiagram chart={DIAG_10} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図10 障害検出（ハートビートとΦ Accrual）
                </div>
              </div>
              <p>
                最もシンプルな方式は、一定間隔で「ハートビート」を送り合い、決められたタイムアウトを超えたら故障と「みなす」というものです。しかし、固定のタイムアウト値は「ネットワークが混雑している普段の状況」と「本当に落ちた状況」を区別できず、誤検出を生みがちです。この問題への改良として<strong>Φ (Phi) Accrual障害検出器</strong>が紹介されています。これは固定の閾値で二値判定するのではなく、過去のハートビート到着間隔の統計分布から「このノードの障害の疑わしさを表すスコア」Φ を連続値として算出する方式です。Φ は「生きている確率」そのものではなく、次のハートビートが現時点までに届かなかったことの起こりにくさを対数スケールで表した指標で、値が大きいほど故障の疑いが強いことを意味します。この方式は、Cassandra や Akka などで実際に採用されています。また、全ノードが個別に監視するのではなく、ゴシッププロトコル（STEP16）を通じて障害情報自体を伝播させる方式も紹介されています。
              </p>
            </div>
          </section>

          <section className="section" id="step14">
            <div className="section-kicker">STEP 14 ／ 第10章</div>
            <h2 className="section-title">
              <IconCrown size={24} />
              リーダー選出アルゴリズム
            </h2>
            <div className="prose">
              <p>
                多くの分散システムでは、特定の決定（例：書き込みの受付順序を決めるなど）を単一のノード（リーダー）に集約することで、システム全体の設計をシンプルにします。しかし、そのリーダー自身が故障した場合には、残りのノードの中から新しいリーダーを選び直す必要があります。これが「リーダー選出」問題です。
              </p>
              <p>
                原著では、比較的古典的でシンプルなアルゴリズム群が紹介されています。
              </p>
              <ul>
                <li><strong>Bullyアルゴリズム</strong> 各ノードが一意のIDを持ち、自分より大きいIDを持つ生存ノードがいないことを確認できたノードが、自らをリーダーだと宣言する</li>
                <li><strong>Next-In-Line Failover / Candidate-Ordinary最適化</strong> Bullyアルゴリズムの通信量を削減するための工夫</li>
                <li><strong>招待アルゴリズム（Invitation Algorithm）</strong> ノードが自らグループを形成し、互いを「招待」し合う形でリーダーを決定する</li>
                <li><strong>リングアルゴリズム</strong> ノードを論理的なリング状に並べ、メッセージをリングに沿って回覧することでリーダーを決定する</li>
              </ul>
              <p>
                これらのアルゴリズムは、後の STEP18 で扱う Raft のような、コンセンサスアルゴリズムに内包された「より堅牢なリーダー選出の仕組み」の前提知識としても位置づけられます。
              </p>
            </div>
          </section>

          <section className="section" id="step15">
            <div className="section-kicker">STEP 15 ／ 第11章</div>
            <h2 className="section-title">
              <IconGitCompare size={24} />
              レプリケーションと一貫性モデル
            </h2>
            <div className="prose">
              <p>
                分散データベースの多くは、可用性と耐障害性を高めるために、同じデータを複数のノードへ複製（レプリケーション）します。しかし、複製を作った瞬間から「どのレプリカを読んでも常に最新の値が返ってくることを保証するか」という一貫性の問題が生じます。
              </p>
              <h3>CAP定理</h3>
              <p>
                分散システムの議論で頻繁に登場する<strong>CAP定理</strong>は、「Consistency（一貫性）」「Availability（可用性）」「Partition tolerance（ネットワーク分断耐性）」の3つのうち、ネットワーク分断が実際に発生した際には、CとAの両方を同時に完全には満たせない、ということを示しています。ここで言うCとAは日常語ではなく、定理の中で厳密に定義された性質である点に注意が必要です。
              </p>
              <div className="two-col">
                <div className="mini-card">
                  <h4>Consistency</h4>
                  <p>atomic consistency、すなわち線形化可能性（linearizability）のこと。結果整合性やセッション一貫性といった任意の一貫性モデル一般を指すのではない</p>
                </div>
                <div className="mini-card">
                  <h4>Availability</h4>
                  <p>故障していないノードが受け取ったリクエストは必ず応答を返して完了できるという性質。稼働率やレイテンシの良さを指すのではない</p>
                </div>
              </div>
              <p>
                原著では、CAP定理を単純化しすぎず、その正しい適用範囲（分断が実際に起きている「間」の話であって、平常時の話ではない）を丁寧に解説しています。
              </p>
              <h3>一貫性モデルのスペクトラム</h3>
              <p>
                一貫性には「オール・オア・ナッシング」ではなく、強さの異なる複数のモデルが存在します。
              </p>
              <div className="diagram-wrap" data-diagram="d11">
                <MermaidDiagram chart={DIAG_11} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図11 一貫性モデルのスペクトラム
                </div>
              </div>
              <div className="callout gold">
                <IconAlertTriangle size={20} />
                <div className="callout-body">
                  <span className="callout-title">図についての注記</span>
                  <p>
                    上図は代表的な4モデルを保証の強さの包含関係に沿って並べた簡略図です。一貫性モデル全体は一列に並ぶわけではなく、比較できないモデルも多数存在する半順序をなします。また保証を弱めれば必ず性能や可用性が上がるわけではなく、実際の性能はワークロード・レプリカ配置・実装によって決まります。
                  </p>
                </div>
              </div>
              <ul>
                <li><strong>線形化可能性 Linearizability</strong> あたかもデータのコピーが1つしか存在しないかのように振る舞う、最も強い一貫性モデル</li>
                <li><strong>逐次一貫性 Sequential Consistency</strong> すべてのノードが同じ順序で操作を観測することを保証するが、その順序が実時間と一致している必要はない</li>
                <li><strong>因果一貫性 Causal Consistency</strong> 因果関係のある操作の順序のみを保証し、無関係な操作の順序は保証しない</li>
                <li><strong>結果整合性 Eventual Consistency</strong> 新しい書き込みが止まったうえで、レプリカ間の通信と修復（アンチエントロピーなど）が継続し、各更新が最終的にすべての到達可能なレプリカへ配送・反映されるという前提のもとで、いずれ同じ値に収束することだけを保証する、最も緩いモデル</li>
              </ul>
              <p>
                さらに、Cassandra や DynamoDB に見られる「チューナブルな一貫性」、Spanner や Cassandra などに見られる「Witness Replica」、そして特定のデータ型と演算規則（可換・冪等な併合など）を満たす範囲で、ネットワーク分断中に並行して行われた更新を調整なしに収束させられる<strong>CRDT（Conflict-free Replicated Data Type）</strong>と、条件を満たす CRDT が「配信済みの更新をすべて受け取ったレプリカは同じ状態に収束する」ことを保証する性質である<strong>強収束性（Strong Eventual Consistency）</strong>といった、実践的で発展的な話題まで扱われています。
              </p>
            </div>
          </section>

          <section className="section" id="step16">
            <div className="section-kicker">STEP 16 ／ 第12章</div>
            <h2 className="section-title">
              <IconRefresh size={24} />
              アンチエントロピーと伝播
            </h2>
            <div className="prose">
              <p>
                レプリカ間でデータがズレてしまった（一時的な不整合が生じた）とき、それを検出し修復する仕組みが「アンチエントロピー（Anti-Entropy）」です。
              </p>
              <div className="two-col">
                <div className="mini-card">
                  <h4>Read Repair</h4>
                  <p>読み取り時に複数レプリカへ問い合わせ、応答内容が食い違っていたら、その場で古いレプリカを最新の値に更新する</p>
                </div>
                <div className="mini-card">
                  <h4>Hinted Handoff</h4>
                  <p>書き込み先のレプリカが一時的に応答不能な場合、別のノードが代わりにその書き込みを一時保存しておき、対象ノードが復帰した際に転送する</p>
                </div>
                <div className="mini-card">
                  <h4>Merkle Tree</h4>
                  <p>レプリカ同士のデータ全体を1件ずつ比較するのは非効率なため、データをハッシュ値の木構造にまとめ、ルートハッシュから順に比較することで差分部分だけを効率的に特定する</p>
                </div>
              </div>
              <div className="diagram-wrap" data-diagram="d13">
                <MermaidDiagram chart={DIAG_13} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図12 Merkle Treeによる差分検出
                </div>
              </div>
              <p>
                また、障害検出やメタデータの伝播に使われる<strong>Gossipプロトコル</strong>（各ノードがランダムに選んだ少数の他ノードへ情報を伝え、それが連鎖的にクラスタ全体へ広がっていく方式）についても、オーバーレイネットワークの構成や、通信量を抑える「Partial View（部分的なメンバーシップ管理）」といった実装上の工夫とあわせて解説されています。
              </p>
            </div>
          </section>

          <section className="section" id="step17">
            <div className="section-kicker">STEP 17 ／ 第13章</div>
            <h2 className="section-title">
              <IconArrowsExchange size={24} />
              分散トランザクション
            </h2>
            <div className="prose">
              <p>
                複数のノードにまたがるデータへの変更を「全部成功」か「全部失敗」のどちらかに揃える（原子性を保つ）ためのプロトコルが分散トランザクションです。
              </p>
              <h3>2相コミット（2PC）</h3>
              <p>
                最も古典的な手法が<strong>2PC（Two-Phase Commit）</strong>です。文字通り2つのフェーズから構成されます。
              </p>
              <div className="diagram-wrap" data-diagram="d12">
                <MermaidDiagram chart={DIAG_12} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図13 2相コミット（2PC）のメッセージシーケンス
                </div>
              </div>
              <p>
                2PCの弱点は、コーディネーターがCommitを送る直前でクラッシュした場合、参加者は「コミットすべきかロールバックすべきか」を自力で判断できず、コーディネーターが復旧するまでブロックし続けてしまう点です。この弱点を緩和しようとしたのが<strong>3PC（Three-Phase Commit）</strong>ですが、こちらもネットワーク分断が絡む状況では完全な解決策にはなりません。
              </p>
              <h3>より現代的なアプローチ</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>手法</th>
                      <th>考え方</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Calvin</td>
                      <td>あらかじめ決定論的な実行順序をスケジューリングすることで、実行時のロック調整コストを削減するアプローチ</td>
                    </tr>
                    <tr>
                      <td>Spanner（Google）</td>
                      <td>TrueTime（GPSと原子時計に支えられた分散時刻API）を活用し、コミット時にその不確実性区間が過ぎ去るまで待つ commit-wait と組み合わせることで、グローバル分散環境での外部一貫性を実現するアプローチ</td>
                    </tr>
                    <tr>
                      <td>Percolator（Google）</td>
                      <td>Bigtable上にMVCCベースの分散トランザクションを構築し、大規模なインクリメンタル処理に使われたアプローチ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                また、データを複数ノードへ分割配置する「データベースパーティショニング」の代表的な手法として<strong>一貫性ハッシュ法（Consistent Hashing）</strong>も本章で扱われており、ノードの追加・削除時に再配置されるデータ量を最小限に抑える仕組みが解説されています。
              </p>
            </div>
          </section>

          <section className="section" id="step18">
            <div className="section-kicker">STEP 18 ／ 第14章</div>
            <h2 className="section-title">
              <IconUsersGroup size={24} />
              コンセンサスアルゴリズム
            </h2>
            <div className="prose">
              <p>
                Part II ― そして本書全体 ― の集大成にあたるのが、第14章で扱われる<strong>コンセンサス（合意形成）</strong>です。クラスタ内の複数ノードが、一部に故障が発生しても、ある1つの値について同じ結論に到達する問題であり、分散システム理論の中でも特に難易度が高い領域とされています。コンセンサスアルゴリズムが満たすべき性質は、一般に次の3つで定義されます。
              </p>
              <div className="two-col">
                <div className="mini-card">
                  <h4>Validity 妥当性</h4>
                  <p>決定される値は、いずれかのノードが実際に提案した値でなければならない</p>
                </div>
                <div className="mini-card">
                  <h4>Agreement 合意性</h4>
                  <p>正常に稼働しているノードが値を決定する場合、それらはすべて同じ値を決定する</p>
                </div>
                <div className="mini-card">
                  <h4>Termination 停止性</h4>
                  <p>一定の前提条件のもとで、正常なノードは最終的に何らかの値を決定する</p>
                </div>
              </div>
              <div className="callout plum">
                <IconInfoCircle size={20} />
                <div className="callout-body">
                  <span className="callout-title">Terminationは無条件ではない</span>
                  <p>
                    STEP12・13で触れたFLP不可能性が示すとおり、完全な非同期システムでは1プロセスのクラッシュだけで停止性の保証は成立しません。実用的なアルゴリズムは、障害検出器や部分同期といった追加の前提を置くことでこの壁を回避しています。
                  </p>
                </div>
              </div>
              <h3>Paxos</h3>
              <p>
                <strong>Paxos</strong>（Leslie Lamportにより考案）は、コンセンサス問題に対する最初期の実用的な解として広く知られています。原著では、基本のPaxosアルゴリズムに加えて、実運用でのスループットを高めるための派生版が紹介されています。
              </p>
              <ul>
                <li><strong>Multi-Paxos</strong> 複数の合意インスタンスにまたがって安定したリーダーを維持し、毎回のリーダー選出コストを省く</li>
                <li><strong>Fast Paxos</strong> 特定条件下でメッセージのラウンド数を削減する</li>
                <li><strong>Egalitarian Paxos</strong> 単一リーダーへの依存を減らし、複数ノードが並行して提案できるようにする</li>
                <li><strong>Flexible Paxos</strong> クォーラム（定足数）の構成条件を緩和し、より柔軟なデプロイを可能にする</li>
              </ul>
              <h3>Raft</h3>
              <p>
                Paxosはその正確な仕様が難解であることでも知られており、この「理解のしやすさ（Understandability）」を明示的な設計目標として2014年に発表されたのが<strong>Raft</strong>です。Raftはリーダー選出・ログレプリケーション・安全性の3つの要素に処理を明確に分割しており、etcd・Consul・CockroachDB・TiKVなど、現代の多くの分散システムで採用されています。
              </p>
              <div className="diagram-wrap" data-diagram="d14">
                <MermaidDiagram chart={DIAG_14} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図14 Raftのリーダー選出とログレプリケーション
                </div>
              </div>
              <h3>ビザンチン合意</h3>
              <p>
                これまでのアルゴリズムは、ノードが「クラッシュはするが嘘はつかない」ことを前提としています。しかし、ブロックチェーンのような信頼境界の低い環境や、悪意あるノードの存在を想定する必要がある場面では、この前提が崩れます。そのための手法が<strong>ビザンチン合意（Byzantine Consensus）</strong>であり、原著では代表的なアルゴリズムである<strong>PBFT（Practical Byzantine Fault Tolerance）</strong>が、リカバリとチェックポインティングの仕組みとあわせて紹介されています。
              </p>
              <p>
                原著全体の締めくくりとして、「Broadcast」「Atomic Broadcast」「Virtual Synchrony」「ZAB（Zookeeper Atomic Broadcast）」といった関連概念も整理されており、コンセンサスとブロードキャストプロトコルの関係性が体系的に理解できるようになっています。
              </p>
            </div>
          </section>

          <section className="section" id="chapters">
            <div className="section-kicker">Table of Contents</div>
            <h2 className="section-title">
              <IconListNumbers size={24} />
              全14章 一覧表
            </h2>
            <div className="prose">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "6em" }}>Part</th>
                      <th style={{ width: "3.5em" }}>章</th>
                      <th style={{ width: "15em" }}>章タイトル（原題）</th>
                      <th>主な内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="part-cell" rowSpan={7}>
                        I<br />ストレージ<br />エンジン
                      </td>
                      <td className="chapter-num">1</td>
                      <td>Introduction and Overview</td>
                      <td>DBMSアーキテクチャ、メモリ型/ディスク型、行指向/列指向、データファイルとインデックスファイル</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">2</td>
                      <td>B-Tree Basics</td>
                      <td>二分探索木からB-Treeへ、ディスク向け構造、階層と探索アルゴリズム</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">3</td>
                      <td>File Formats</td>
                      <td>バイナリエンコーディング、スロットページ、可変長データの管理、チェックサム</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">4</td>
                      <td>Implementing B-Trees</td>
                      <td>ページヘッダ、オーバーフローページ、バイナリサーチ、リバランス、圧縮、デフラグ</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">5</td>
                      <td>Transaction Processing and Recovery</td>
                      <td>バッファ管理、WAL、ARIES、分離レベル、OCC/PCC/MVCC</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">6</td>
                      <td>B-Tree Variants</td>
                      <td>Copy-on-Write（LMDB）、WiredTiger、FD-Tree、Bw-Tree、Cache-Oblivious B-Tree</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">7</td>
                      <td>Log-Structured Storage</td>
                      <td>LSM-Tree、SSTable、Bloom Filter、コンパクション、Bitcask、WiscKey</td>
                    </tr>
                    <tr>
                      <td className="part-cell plum" rowSpan={7}>
                        II<br />分散<br />システム
                      </td>
                      <td className="chapter-num">8</td>
                      <td>Introduction and Overview</td>
                      <td>分散システムの難しさ、Two Generals Problem、FLP不可能性、障害モデル</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">9</td>
                      <td>Failure Detection</td>
                      <td>ハートビート、Φ Accrual障害検出器、ゴシップベースの障害検出</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">10</td>
                      <td>Leader Election</td>
                      <td>Bullyアルゴリズム、招待アルゴリズム、リングアルゴリズム</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">11</td>
                      <td>Replication and Consistency</td>
                      <td>CAP定理、線形化可能性、逐次/因果一貫性、結果整合性、CRDT</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">12</td>
                      <td>Anti-Entropy and Dissemination</td>
                      <td>Read Repair、Merkle Tree、Hinted Handoff、Gossipプロトコル</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">13</td>
                      <td>Distributed Transactions</td>
                      <td>2PC、3PC、Calvin、Spanner、Percolator、一貫性ハッシュ法</td>
                    </tr>
                    <tr>
                      <td className="chapter-num">14</td>
                      <td>Consensus</td>
                      <td>Paxos系（Multi/Fast/Egalitarian/Flexible）、Raft、ビザンチン合意（PBFT）</td>
                    </tr>
                    <tr>
                      <td className="part-cell gold">付録</td>
                      <td className="chapter-num">A</td>
                      <td>Bibliography</td>
                      <td>100本以上の論文と10冊以上の書籍を中心に、OSS実装などの参考資料も含む参考文献一覧</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section" id="voices">
            <div className="section-kicker">Community Voices</div>
            <h2 className="section-title">
              <IconQuote size={24} />
              国際的なエンジニアコミュニティからの評価
            </h2>
            <div className="prose">
              <p>
                本書は特定の企業のマーケティング資料ではなく、実際にデータベース・分散システムの最前線で働く著名なエンジニアたちから継続的に高く評価されている技術書です。発言内容は要旨としてまとめ、原文の引用は最小限にとどめています。原発言は参考文献のリンク先で確認できます。
              </p>
            </div>
            <div className="voice-grid">
              <div className="voice-card">
                <IconQuote size={24} />
                <span className="voice-name">Martin Kleppmann</span>
                <span className="voice-role">『Designing Data-Intensive Applications』著者</span>
                <p className="voice-text">
                  自著と合わせて読むことで、特にストレージエンジンとコンセンサスの分野をより深く理解できる「良い続編」として本書を紹介している。
                </p>
              </div>
              <div className="voice-card">
                <IconQuote size={24} />
                <span className="voice-name">Marc Brooker</span>
                <span className="voice-role">Amazon Web Services, Distinguished Engineer</span>
                <p className="voice-text">
                  自身が日常的に人へ勧める一冊として本書を挙げている。
                </p>
              </div>
              <div className="voice-card">
                <IconQuote size={24} />
                <span className="voice-name">Joran Dirk Greef</span>
                <span className="voice-role">TigerBeetleDB 創業者・CEO</span>
                <p className="voice-text">
                  最初から最後まで通して読める数少ないデータベース書籍の1つとして本書を推薦している。
                </p>
              </div>
              <div className="voice-card">
                <IconQuote size={24} />
                <span className="voice-name">Ed Huang</span>
                <span className="voice-role">PingCAP / TiDB 共同創業者・CTO</span>
                <p className="voice-text">
                  データベースの世界に関わる者なら誰もが一度は耳にしたことがある一冊だとコメントしている。
                </p>
              </div>
              <div className="voice-card">
                <IconQuote size={24} />
                <span className="voice-name">Dominik Tornow</span>
                <span className="voice-role">『Thinking in Distributed Systems』著者</span>
                <p className="voice-text">
                  中国語版のレビューに協力するなど、本書の国際的な普及にも関与している。
                </p>
              </div>
              <div className="voice-card">
                <IconQuote size={24} />
                <span className="voice-name">Chris Seaton</span>
                <span className="voice-role">TruffleRubyなどで知られるプログラミング言語処理系エンジニア</span>
                <p className="voice-text">
                  アカデミックな出版社ではない書籍としては異例なほど深く精密な内容でありながら、非常に読みやすくコンパクトだと評している。
                </p>
              </div>
            </div>
            <div className="prose" style={{ marginTop: "1.2rem" }}>
              <p>
                このほかにも、<em>System Design Interview</em> の著者である Alex Xu、Apache Ignite PMCで <em>Just use Postgres</em> の著者である Denis Magda など、データベース・分散システム分野で広く知られる開発者たちから、継続的に推薦の声が寄せられています。詳細と原発言へのリンクは参考文献セクションを参照してください。
              </p>
            </div>
          </section>

          <section className="section" id="roadmap">
            <div className="section-kicker">Roadmap</div>
            <h2 className="section-title">
              <IconRoute size={24} />
              この本の読み方・学習ロードマップ
            </h2>
            <div className="prose">
              <div className="diagram-wrap" data-diagram="d15">
                <MermaidDiagram chart={DIAG_15} />
                <div className="diagram-caption">
                  <IconChartDots size={16} /> 図15 学習ロードマップ
                </div>
              </div>
              <p>
                初めて読む場合は、いきなり全ページを精読しようとせず、次のような順序をおすすめします。
              </p>
              <ol className="step-list-plain">
                <li>まず Part I（STEP1〜11）を通読し、「その場更新型（B-Tree）」と「ログ構造化型（LSM-Tree）」という2大設計思想の違いを掴む</li>
                <li>Part II（STEP12〜18）は、CAP定理や一貫性モデルなど比較的とっつきやすい章から入り、最後にコンセンサス（Paxos/Raft）という最も難解な領域へ進む</li>
                <li>一度読んだだけで完全に理解しようとせず、実際に PostgreSQL のB-Treeインデックス実装や、etcdのRaft実装のソースコードを眺めながら再読すると理解が深まる</li>
                <li>前提知識としての分散システム理論をより体系的に広く俯瞰したい場合は、Martin Kleppmann の『Designing Data-Intensive Applications』を並行して読むと相互補完的に理解が進む</li>
              </ol>
            </div>
          </section>

          <section className="section" id="checklist">
            <div className="section-kicker">Self Check</div>
            <h2 className="section-title">
              <IconChecklist size={24} />
              理解度チェックリスト
            </h2>
            <div className="prose">
              <p>
                本書を読み終えたあと、以下の項目について自分の言葉で説明できるかどうかをセルフチェックしてみましょう。クリックすると完了としてマークできます。
              </p>
            </div>
            <DatabaseInternalsChecklist />
          </section>

          <section className="section" id="summary">
            <div className="section-kicker">Summary</div>
            <h2 className="section-title">
              <IconFlag3 size={24} />
              まとめ
            </h2>
            <div className="prose">
              <p>
                <em>Database Internals</em> は、「データベースを使う人」から「データベースの中身を理解し、選定・設計・トラブルシューティングできる人」へとステップアップするための、稀有な一冊です。B-TreeとLSM-Treeという2つのストレージエンジンの系譜、そしてPaxosやRaftに代表されるコンセンサスアルゴリズムという、現代のあらゆる分散データベースの土台となる知識を、一冊で体系的に押さえられる点に大きな価値があります。
              </p>
              <p>
                本ガイドで扱った18のステップは、あくまで最初の地図です。ぜひ原著、そして参考文献に挙げた一次資料（論文・カンファレンストーク・OSS実装）にあたりながら、実際に手を動かして理解を深めていってください。
              </p>
            </div>
          </section>

          <section className="section" id="references">
            <div className="section-kicker">References</div>
            <h2 className="section-title">
              <IconLink size={24} />
              参考文献・出典
            </h2>
            <div className="prose">
              <p>
                本ガイドの作成にあたり、2026年9月21日時点で参照可能な以下の情報源を確認しました。
              </p>
            </div>

            <div className="ref-group-title">公式情報源</div>
            <ul className="ref-list">
              <li className="ref-card">
                <span className="ref-num">1</span>
                <div className="ref-body">
                  <span className="ref-title">O&apos;Reilly 公式書籍ページ（本書の概要・目次）</span>
                  <Ext
                    className="ref-url"
                    href="https://www.oreilly.com/library/view/database-internals/9781492040330/"
                  >
                    oreilly.com/library/view/database-internals/9781492040330
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">2</span>
                <div className="ref-body">
                  <span className="ref-title">Alex Petrov 氏本人が運営する本書の公式コンパニオンサイト databass.dev（著者プロフィール、著名エンジニアからの推薦の声を掲載）</span>
                  <Ext className="ref-url" href="https://www.databass.dev/">
                    databass.dev
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">3</span>
                <div className="ref-body">
                  <span className="ref-title">databass.dev 正誤表（Errata）</span>
                  <Ext className="ref-url" href="https://databass.dev/errata">
                    databass.dev/errata
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">4</span>
                <div className="ref-body">
                  <span className="ref-title">本書の詳細な目次（章・節・ページ番号の一覧、O&apos;Reillyの公式PDFを図書館が収録）</span>
                  <Ext className="ref-url" href="https://www.gbv.de/dms/ilmenau/toc/1688659285.PDF">
                    gbv.de/dms/ilmenau/toc/1688659285.PDF
                  </Ext>
                </div>
              </li>
            </ul>

            <div className="ref-group-title">国際的な開発者・エンジニアからの評価</div>
            <ul className="ref-list">
              <li className="ref-card">
                <span className="ref-num">5</span>
                <div className="ref-body">
                  <span className="ref-title">Martin Kleppmann（『Designing Data-Intensive Applications』著者）による、本書を発展的な続編として推薦する投稿</span>
                  <Ext className="ref-url" href="https://x.com/martinkl/status/1273913672885317632">
                    x.com/martinkl/status/1273913672885317632
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">6</span>
                <div className="ref-body">
                  <span className="ref-title">Marc Brooker（Amazon Web Services, Distinguished Engineer）による推薦の投稿</span>
                  <Ext className="ref-url" href="https://x.com/marcjbrooker/status/1591438104979984384">
                    x.com/marcjbrooker/status/1591438104979984384
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">7</span>
                <div className="ref-body">
                  <span className="ref-title">Joran Dirk Greef（TigerBeetleDB 創業者・CEO）による推薦の投稿</span>
                  <Ext className="ref-url" href="https://x.com/jorandirkgreef/status/1807429356525858904">
                    x.com/jorandirkgreef/status/1807429356525858904
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">8</span>
                <div className="ref-body">
                  <span className="ref-title">Ed Huang（PingCAP 共同創業者・CTO）による推薦の投稿</span>
                  <Ext className="ref-url" href="https://x.com/dxhuang/status/1241244337922396161">
                    x.com/dxhuang/status/1241244337922396161
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">9</span>
                <div className="ref-body">
                  <span className="ref-title">Dominik Tornow（『Thinking in Distributed Systems』著者）による投稿</span>
                  <Ext className="ref-url" href="https://x.com/dominiktornow/status/1814446370578669654">
                    x.com/dominiktornow/status/1814446370578669654
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">10</span>
                <div className="ref-body">
                  <span className="ref-title">Chris Seatonによる、本書の技術的な深さと読みやすさを評した投稿</span>
                  <Ext className="ref-url" href="https://twitter.com/ChrisGSeaton/status/1208502843033837568">
                    twitter.com/ChrisGSeaton/status/1208502843033837568
                  </Ext>
                </div>
              </li>
            </ul>

            <div className="ref-group-title">著者自身の発信・カンファレンス講演</div>
            <ul className="ref-list">
              <li className="ref-card">
                <span className="ref-num">11</span>
                <div className="ref-body">
                  <span className="ref-title">Alex Petrov 氏自身による ACM Queue 誌への寄稿（ストレージエンジンのアルゴリズムに関する解説記事）</span>
                  <Ext className="ref-url" href="https://queue.acm.org/detail.cfm?id=3220266">
                    queue.acm.org/detail.cfm?id=3220266
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">12</span>
                <div className="ref-body">
                  <span className="ref-title">Alex Petrov 氏による InfoQ でのカンファレンス講演（Storage Algorithms）</span>
                  <Ext className="ref-url" href="https://www.infoq.com/presentations/storage-algorithms">
                    infoq.com/presentations/storage-algorithms
                  </Ext>
                </div>
              </li>
            </ul>

            <div className="ref-group-title">書評・学習リソース</div>
            <ul className="ref-list">
              <li className="ref-card">
                <span className="ref-num">13</span>
                <div className="ref-body">
                  <span className="ref-title">Hippocampus&apos;s Garden による書評（『Designing Data-Intensive Applications』との比較を含む）</span>
                  <Ext className="ref-url" href="https://hippocampus-garden.com/book_review_petrov/">
                    hippocampus-garden.com/book_review_petrov
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">14</span>
                <div className="ref-body">
                  <span className="ref-title">Goodreads の本書ページ（Emre Sevinç氏による、『Designing Data-Intensive Applications』および『Cassandra: The Definitive Guide』と並ぶ位置づけについてのレビューを含む）</span>
                  <Ext className="ref-url" href="https://www.goodreads.com/book/show/44647144-database-internals">
                    goodreads.com/book/show/44647144-database-internals
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">15</span>
                <div className="ref-body">
                  <span className="ref-title">章ごとの学習ノート・要約（コミュニティによる読書ノート）</span>
                  <Ext className="ref-url" href="https://notes.stonecharioteer.com/books/database-internals/index.html">
                    notes.stonecharioteer.com/books/database-internals
                  </Ext>
                </div>
              </li>
              <li className="ref-card">
                <span className="ref-num">16</span>
                <div className="ref-body">
                  <span className="ref-title">本書の販売ページ（書籍概要と著者紹介 Apache Cassandra コミッター・PMCメンバー）</span>
                  <Ext
                    className="ref-url"
                    href="https://bookshop.org/p/books/database-internals-a-deep-dive-into-how-distributed-data-systems-work-alex-petrov/79ff30324a22a51e"
                  >
                    bookshop.org/p/books/database-internals-...
                  </Ext>
                </div>
              </li>
            </ul>

            <div className="callout" style={{ marginTop: "1.5rem" }}>
              <IconShieldCheck size={20} />
              <div className="callout-body">
                <span className="callout-title">出典についての補足</span>
                <p>
                  本ガイドは上記の一次情報源（公式ページ・著者本人の発信）を中心に事実関係を確認したうえで、内容の解説自体はB-Tree・LSM-Tree・Paxos・Raft・CAP定理などコンピュータサイエンスの標準的な公知の知識にもとづき、著作権保護対象である書籍本文の再現を避けて独自の言葉で執筆しています。
                </p>
              </div>
            </div>
          </section>

          <footer className="footer">
            <p>
              本ガイドは公開情報にもとづく学習用の非公式解説であり、O&apos;Reilly Media および Alex Petrov 氏とは関係ありません。内容の解説はB-Tree・LSM-Tree・Paxos・Raft・CAP定理などコンピュータサイエンスの標準的な公知の知識にもとづき、著作権保護対象である書籍本文の再現を避けて独自の言葉で執筆しています。
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
