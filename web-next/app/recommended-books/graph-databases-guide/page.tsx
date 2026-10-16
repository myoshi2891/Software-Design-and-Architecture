import {
  IconAffiliate,
  IconBook,
  IconBuildingStore,
  IconCertificate,
  IconDatabase,
  IconDownload,
  IconGitCompare,
  IconInfoCircle,
  IconLink,
  IconMap2,
  IconMessageCircle,
  IconMicrophone,
  IconNews,
  IconPencil,
  IconQuestionMark,
  IconRobot,
  IconRoute,
  IconSchool,
  IconServer2,
  IconShare3,
  IconShieldLock,
  IconShoppingCart,
  IconStar,
  IconTerminal2,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import GraphDatabasesChecklist from "./GraphDatabasesChecklist";
import GraphDatabasesSidebar from "./GraphDatabasesSidebar";

export const metadata: Metadata = {
  title: "Graph Databases: New Opportunities for Connected Data 初学者ガイド",
  description:
    "Ian Robinson、Jim Webber、Emil Eifrem 著『Graph Databases, 2nd Edition』(O'Reilly Media)をベースに、グラフデータベースの考え方をゼロからステップバイステップで学ぶための解説記事です。",
};

const MERMAID_INIT = `%%{init: {"theme": "base", "themeVariables": {"fontFamily": "\\"Noto Sans JP\\", -apple-system, BlinkMacSystemFont, sans-serif", "fontSize": "16px", "primaryColor": "#fffdf8", "primaryBorderColor": "#c8bfe0", "primaryTextColor": "#241f3d", "lineColor": "#8c84b8", "secondaryColor": "#f7f3ea", "tertiaryColor": "#ffffff", "edgeLabelBackground": "#ffffff"}}}%%
`;

const DIAGRAM_1 = `${MERMAID_INIT}flowchart TD
    S0["Step0 グラフとは何か"] --> S1["Step1 なぜグラフデータベースか"]
    S1 --> S2["Step2 プロパティグラフモデル"]
    S2 --> S3["Step3 Cypher入門"]
    S3 --> S4["Step4 アプリケーション構築"]
    S4 --> S5["Step5 実世界の活用事例"]
    S5 --> S6["Step6 内部構造"]
    S6 --> S7["Step7 グラフ理論と予測分析"]
    S7 --> SA["付録 NoSQL全体像"]
    SA --> S26["2026年アップデート"]
    classDef hub fill:#c9c4ef,color:#221f52
    classDef done fill:#bfe4d2,color:#123722
    class S0 hub
    class S26 done`;

const DIAGRAM_2 = `${MERMAID_INIT}flowchart LR
    P1["Person 田中太郎"] -->|"WORKS_AT since 2019"| C1["Company 灯台商事"]
    P1 -->|"KNOWS since 2018"| P2["Person 鈴木花子"]
    P2 -->|"WORKS_AT since 2020"| C1`;

const DIAGRAM_3 = `${MERMAID_INIT}flowchart LR
    Q["接続されたデータをどう保存するか"] --> A["リレーショナルDB"]
    Q --> B["NoSQL集約指向DB"]
    Q --> C["グラフDB"]
    A --> A1["JOINはクエリ時に計算コストが増大"]
    A --> A2["スキーマ変更が高コスト"]
    B --> B1["KeyValue Document Column系"]
    B --> B2["集約をまたぐ関係の探索は製品のクエリ機能とデータモデルに依存"]
    C --> C1["リレーションシップが第一級のデータ"]
    C --> C2["接続をたどる性能がグラフ全体の件数に依存しにくい"]
    classDef hub fill:#c9c4ef,color:#221f52
    classDef done fill:#bfe4d2,color:#123722
    class Q hub
    class C1 done
    class C2 done`;

const DIAGRAM_4 = `${MERMAID_INIT}flowchart TD
    accTitle: グラフデータモデリングの反復サイクル
    accDescr: 聞きたい質問を洗い出し、質問からモデルを描き、ラベルとリレーションシップ種別を決め、プロパティを配置し、テストデータで質問に答えられるかを検証する。最後に反復的に改善し、矢印は再び質問の洗い出しへ戻るため、この6段階は一度きりではなく循環するプロセスである。
    Q1["聞きたい質問を洗い出す"] --> Q2["質問からモデルを描く"]
    Q2 --> Q3["ラベルとリレーションシップ種別を決める"]
    Q3 --> Q4["プロパティを配置する"]
    Q4 --> Q5["テストデータで質問に答えられるか検証する"]
    Q5 --> Q6["反復的に改善する"]
    Q6 --> Q1`;

const DIAGRAM_5 = `${MERMAID_INIT}flowchart TD
    accTitle: Cypher クエリの句の処理順
    accDescr: Cypher クエリは上から順に処理される。まず MATCH で探したいグラフパターンを宣言し、次に WHERE で条件を絞り込み、RETURN で結果を取り出し、最後に ORDER BY や LIMIT などで結果を並べ替え・件数制限して整形する。分岐のない一直線の流れである。
    C1["MATCH でパターンを宣言する"] --> C2["WHERE で条件を絞り込む"]
    C2 --> C3["RETURN で結果を取り出す"]
    C3 --> C4["ORDER BY LIMIT などで整形する"]`;

const DIAGRAM_6 = `${MERMAID_INIT}flowchart TD
    D1["データモデリング"] --> D2["アプリケーションアーキテクチャ設計"]
    D2 --> D3["テスト駆動でモデルを検証"]
    D3 --> D4["キャパシティプランニング"]
    D4 --> D5["インポートと一括ロード"]
    D5 --> D1`;

const DIAGRAM_7 = `${MERMAID_INIT}flowchart LR
    H["組織がグラフDBを選ぶ理由"] --> U1["ソーシャル"]
    H --> U2["レコメンデーション"]
    H --> U3["ジオ 地理空間"]
    H --> U4["マスターデータ管理"]
    H --> U5["ネットワークとデータセンター管理"]
    H --> U6["認可とアクセス制御"]
    classDef hub fill:#c9c4ef,color:#221f52
    class H hub`;

const DIAGRAM_8 = `${MERMAID_INIT}flowchart TD
    N0["ネイティブグラフ処理"] --> N1["各ノードが隣接ノードへの直接ポインタを保持"]
    N1 --> N2["走査コストはグラフ全体の件数に依存しない"]
    M0["非ネイティブなグラフ処理"] --> M1["リレーショナルやKVストアの上にグラフ層を実装"]
    M1 --> M2["1ホップたどるたびにインデックス参照が発生"]
    N2 -.->|"対比"| M2
    classDef hub fill:#c9c4ef,color:#221f52
    class N0 hub
    class M0 hub`;

const DIAGRAM_9 = `${MERMAID_INIT}flowchart TD
    I["グラフDBの内部構造"] --> I1["ネイティブグラフストレージ"]
    I --> I2["プログラマティックAPI"]
    I --> I3["非機能特性"]
    I3 --> I3a["トランザクション ACID"]
    I3 --> I3b["可用性 クラスタリング"]
    I3 --> I3c["スケール"]
    classDef hub fill:#c9c4ef,color:#221f52
    class I hub`;

const DIAGRAM_10 = `${MERMAID_INIT}flowchart TD
    accTitle: 幅優先探索と深さ優先探索の対比
    accDescr: 2つの探索手順を左右に並べて対比する。幅優先探索 BFS は、開始ノードから近い順に探索し、キューを使い、その結果として最短ホップ数を見つけやすい。深さ優先探索 DFS は、1本の経路を深く進み、スタックや再帰を使い、到達可能な頂点の深さ優先走査や循環検出に向く。BFS と DFS の起点ノード同士は点線の対比矢印で結ばれている。
    B0["幅優先探索 BFS"] --> B1["開始ノードから近い順に探索する"]
    B1 --> B2["キューを使う"]
    B2 --> B3["最短ホップ数を見つけやすい"]
    D0["深さ優先探索 DFS"] --> D1["1本の経路を深く進む"]
    D1 --> D2["スタックや再帰を使う"]
    D2 --> D3["到達可能な頂点の深さ優先走査や循環検出に向く"]
    B0 -.->|"対比"| D0
    classDef hub fill:#c9c4ef,color:#221f52
    class B0 hub
    class D0 hub`;

const DIAGRAM_11 = `${MERMAID_INIT}flowchart TD
    accTitle: Dijkstra 法の処理手順
    accDescr: まず開始ノードの距離を0、他のすべてのノードを無限大に初期化する。次に未確定ノードの中から最小距離のノードを選び、その隣接ノードの距離を更新できるか確認し、更新できれば距離を上書きしてから、選んだノードを確定済みにする。続いて距離が判明した未確定ノードが残っているかで分岐し、はいなら最小距離ノードの選択に戻って繰り返し、いいえなら開始ノードから到達可能なすべてのノードの最短距離が確定して終了する。
    G1["開始ノードの距離を0 他をすべて無限大に初期化"] --> G2["未確定ノードの中から最小距離のノードを選ぶ"]
    G2 --> G3["隣接ノードの距離を更新できるか確認する"]
    G3 --> G4["更新できれば距離を上書きする"]
    G4 --> G5["選んだノードを確定済みにする"]
    G5 --> G6{"距離が判明した未確定ノードが残っているか"}
    G6 -->|"はい"| G2
    G6 -->|"いいえ"| G7["開始ノードから到達可能なノードの最短距離が確定"]
    classDef done fill:#bfe4d2,color:#123722
    class G7 done`;

const DIAGRAM_12 = `${MERMAID_INIT}flowchart TD
    accTitle: Dijkstra 法と A* の評価方法の違い
    accDescr: Dijkstra 法は開始ノードからの実コストのみで探索の優先度を決める。これに対して A* は、実コストにゴールまでの推定コストであるヒューリスティックを加えた値で評価する。その結果、A* は有望な方向を優先的に探索でき、適切なヒューリスティックであれば最短性を保ったまま探索を高速化できる。図は Dijkstra 法から A* への拡張という対比関係を上から下への流れで示す。
    A1["Dijkstra法 実コストのみで優先度を決める"] --> A2["A* 実コストに加えゴールまでの推定コスト ヒューリスティックを加える"]
    A2 --> A3["有望な方向を優先的に探索できる"]
    A3 --> A4["適切なヒューリスティックなら最短性を保ったまま探索を高速化"]`;

const DIAGRAM_13 = `${MERMAID_INIT}flowchart TD
    T1["AとBが友人 かつ BとCが友人"] --> T2["ACの間に新しい関係が生まれやすくなる"]
    T2 --> T3["三者閉包 トライアド"]
    T4["互いに共通の知人を持たない関係"] --> T5["ローカルブリッジ"]
    T5 --> T6["削除すると両端の距離が大きく広がる橋渡し役"]`;

const DIAGRAM_14 = `${MERMAID_INIT}flowchart TD
    U1["Cypher 2011年よりNeo4jのクエリ言語として普及"] --> U2["2024年4月 GQLがISO IEC 39075として国際標準化"]
    U2 --> U3["Neo4j含む各社が段階的なGQL対応を進行中"]
    U3 --> U4["ベクター検索とグラフを組み合わせたGraphRAGが台頭"]
    U4 --> U5["LLMの回答をグラフの関係性で裏付ける取り組みが広がる"]
    classDef hub fill:#c9c4ef,color:#221f52
    classDef done fill:#bfe4d2,color:#123722
    class U1 hub
    class U5 done`;

const CYPHER_CODE = (
  <>
    <span className="cm">{"// 田中さんが働いている会社を探す"}</span>
    {"\n"}
    <span className="kw">MATCH</span> (p:<span className="fn">Person</span> {"{"}name:{" "}
    <span className="st">"田中太郎"</span>
    {"})-[:"}
    <span className="fn">WORKS_AT</span>
    {"]->(c:"}
    <span className="fn">Company</span>
    {")\n"}
    <span className="kw">RETURN</span>
    {" c.name\n\n"}
    <span className="cm">{"// 田中さんの知人のうち、田中さんと同じ会社で働いている人を探す"}</span>
    {"\n"}
    <span className="kw">MATCH</span> (p:<span className="fn">Person</span> {"{"}name:{" "}
    <span className="st">"田中太郎"</span>
    {"})-[:"}
    <span className="fn">KNOWS</span>
    {"]->(friend:"}
    <span className="fn">Person</span>
    {")\n"}
    <span className="kw">MATCH</span>
    {" (p)-[:"}
    <span className="fn">WORKS_AT</span>
    {"]->(c:"}
    <span className="fn">Company</span>
    {")<-[:"}
    <span className="fn">WORKS_AT</span>
    {"]-(friend)\n"}
    <span className="kw">RETURN</span>
    {" friend.name, c.name\n\n"}
    <span className="cm">{"// 新しいノードとリレーションシップを作る"}</span>
    {"\n"}
    <span className="kw">CREATE</span> (p:<span className="fn">Person</span> {"{"}name:{" "}
    <span className="st">"佐藤次郎"</span>
    {"})-[:"}
    <span className="fn">WORKS_AT</span> {"{"}since: <span className="nu">2024</span>
    {"}]->(c:"}
    <span className="fn">Company</span> {"{"}name: <span className="st">"灯台商事"</span>
    {"})"}
  </>
);

export default function Page() {
  return (
    <div className="graph-databases-guide">
      <div className="layout">
        <GraphDatabasesSidebar />

        <div className="main">
          <header className="hero">
            <span className="eyebrow">
              <IconShare3 size={18} />
              Graph Database 入門ガイド
            </span>
            <h1>Graph Databases: New Opportunities for Connected Data 初学者ガイド</h1>
            <p className="lede">
              Ian Robinson、Jim Webber、Emil Eifrem 著『Graph Databases, 2nd
              Edition』(O&rsquo;Reilly
              Media)をベースに、グラフデータベースの考え方をゼロからステップバイステップで学ぶための解説記事です。
            </p>
            <div className="quote">
              本書の文章をそのまま引用するのではなく、内容を要約・再構成し、2026年9月時点の最新動向(GQL標準化、GraphRAGなど)も補足しています。
            </div>
            <div className="src-line">
              <IconLink size={18} /> 原著参照元:{" "}
              <Ext href="https://www.oreilly.com/library/view/graph-databases-2nd/9781491930885/">
                oreilly.com/library/view/graph-databases-2nd
              </Ext>
            </div>
          </header>

          <section className="section" id="about">
            <div className="section-eyebrow">
              <IconInfoCircle size={18} />
              Introduction
            </div>
            <h2>この記事について</h2>
            <ul>
              <li>
                <strong>原著</strong>:{" "}
                <em>Graph Databases: New Opportunities for Connected Data</em>, 2nd Edition
              </li>
              <li>
                <strong>著者</strong>: Ian Robinson, Jim Webber, Emil
                Eifrem(3人ともNeo4j創業メンバーもしくは元エンジニア)
              </li>
              <li>
                <strong>参照元URL</strong>:{" "}
                <Ext href="https://www.oreilly.com/library/view/graph-databases-2nd/9781491930885/">
                  https://www.oreilly.com/library/view/graph-databases-2nd/9781491930885/
                </Ext>
              </li>
              <li>
                <strong>この記事の目的</strong>:
                プログラミング経験はあるがグラフデータベースは初めて、という読者が「グラフとは何か」から「実務でどう使うか」まで一気通貫で理解できるようにする
              </li>
            </ul>
          </section>

          <section className="section" id="audience">
            <div className="section-eyebrow">
              <IconSchool size={18} />
              Who is this for
            </div>
            <h2>対象読者</h2>
            <ul className="audience-list">
              <li>
                <IconDatabase size={20} />
                <span>
                  リレーショナルデータベース(RDB)は知っているが、グラフデータベースは触ったことがない開発者
                </span>
              </li>
              <li>
                <IconAffiliate size={20} />
                <span>
                  ソーシャルグラフ、レコメンデーション、不正検知、ナレッジグラフなど「つながり」を扱うシステムに興味がある人
                </span>
              </li>
              <li>
                <IconRobot size={20} />
                <span>最近話題のGraphRAG(グラフを使ったRAG)の前提知識を固めたい人</span>
              </li>
            </ul>
          </section>

          <section className="section" id="book-info">
            <div className="section-eyebrow">
              <IconBook size={18} />
              Book Info
            </div>
            <h2>書籍情報</h2>
            <div className="table-wrap">
              <table className="kv-table">
                <tbody>
                  <tr>
                    <th>原題</th>
                    <td>Graph Databases: New Opportunities for Connected Data</td>
                  </tr>
                  <tr>
                    <th>版</th>
                    <td>第2版(2015年6月)</td>
                  </tr>
                  <tr>
                    <th>著者</th>
                    <td>Ian Robinson, Jim Webber, Emil Eifrem</td>
                  </tr>
                  <tr>
                    <th>出版社</th>
                    <td>O&rsquo;Reilly Media, Inc.</td>
                  </tr>
                  <tr>
                    <th>ページ数</th>
                    <td>
                      236ページ(第2版。224ページは2013年刊行の第1版の表記のため、第2版を扱う本ガイドでは採用しない)
                    </td>
                  </tr>
                  <tr>
                    <th>難易度</th>
                    <td>中級から上級(ただし基礎から説明されている)</td>
                  </tr>
                  <tr>
                    <th>主に扱うグラフDB</th>
                    <td>Neo4j(クエリ言語はCypher)</td>
                  </tr>
                  <tr>
                    <th>無料配布</th>
                    <td>Neo4j公式サイトから今もPDF / iBooks / Kindle形式で無料配布中</td>
                  </tr>
                  <tr>
                    <th>参照URL</th>
                    <td>
                      <Ext href="https://www.oreilly.com/library/view/graph-databases-2nd/9781491930885/">
                        oreilly.com/library/view/graph-databases-2nd/9781491930885
                      </Ext>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              O&rsquo;Reillyの書籍ページによると、本書は高度に接続されたデータを管理・検索するためのグラフデータベースの実践的な設計・実装方法を学べる一冊で、第2版では最新のCypher構文に合わせてコード例と図版が刷新されています。データモデリングやクエリ、コード例を通じて、組織がグラフデータベースをどう活用して競合より優位に立っているかを学べる構成になっています。
            </p>
            <p>
              なお本書は今でもNeo4j社の公式サイトから無料でダウンロードできます(PDF / Kindle /
              iBooks形式)。
            </p>
          </section>

          <section className="section" id="toc">
            <div className="section-eyebrow">
              <IconRoute size={18} />
              Table of Contents
            </div>
            <h2>章立て(原著の目次)</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>章</th>
                    <th>タイトル</th>
                    <th>主なトピック</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Introduction</td>
                    <td>
                      グラフとは何か、グラフの空間全体像、グラフDBとグラフ計算エンジンの違い、性能・柔軟性・俊敏性という3つの強み
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Options for Storing Connected Data</td>
                    <td>
                      リレーショナルDBとNoSQLがなぜ「関係」を扱うのが苦手か、グラフDBがどう関係を第一級市民にするか
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Data Modeling with Graphs</td>
                    <td>
                      ラベル付きプロパティグラフモデル、Cypher入門、リレーショナルモデリングとの比較、よくあるモデリングの落とし穴
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Building a Graph Database Application</td>
                    <td>
                      クエリ駆動のデータモデリング、アプリケーションアーキテクチャ、テスト駆動でのモデル開発、キャパシティプランニング、データインポート
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Graphs in the Real World</td>
                    <td>組織がグラフDBを選ぶ理由、代表的なユースケース、実際の導入事例</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Graph Database Internals</td>
                    <td>
                      ネイティブグラフ処理とネイティブグラフストレージ、プログラマティックAPI、トランザクション・可用性・スケールなどの非機能特性
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Predictive Analysis with Graph Theory</td>
                    <td>
                      幅優先探索・深さ優先探索、Dijkstra法、A*アルゴリズム、三者閉包・構造的均衡・ローカルブリッジ
                    </td>
                  </tr>
                  <tr>
                    <td>付録A</td>
                    <td>NOSQL Overview</td>
                    <td>
                      NoSQLが生まれた背景、ACIDとBASE、NoSQLの4象限(Key-Value/Document/Column-family/Graph)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ color: "var(--ink-faint)" }}>出典:O&rsquo;Reilly書籍ページの目次。</p>
          </section>

          <section className="section" id="roadmap">
            <div className="section-eyebrow">
              <IconRoute size={18} />
              Roadmap
            </div>
            <h2>学習ロードマップ</h2>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_1} />
              </div>
              <p className="diagram-caption">図1: この記事全体の学習ロードマップ</p>
            </div>
            <div className="roadmap-note">
              <IconInfoCircle size={20} style={{ flex: "0 0 auto", marginTop: "1px" }} />
              <span>
                Step0からStep7まで順番に読み進めると、グラフの基礎からグラフ理論の応用まで一気通貫で理解できるように構成しています。
              </span>
            </div>
          </section>

          <section className="section" id="step0">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Step 0
            </div>
            <h2>グラフとは何か</h2>
            <p>
              数学的には、グラフ G は「頂点(ノード)の集合 V」と「辺(リレーションシップ)の集合
              E」の組 G = (V, E)
              として定義されます。ノードは「モノ」、リレーションシップは「モノとモノのつながり」を表します。
            </p>
            <p>
              グラフデータベースの世界で最もよく使われるのが
              <strong>ラベル付きプロパティグラフ(Labeled Property Graph, LPG)モデル</strong>
              です。ポイントは次の4つです。
            </p>
            <ul>
              <li>
                <strong>ノード</strong>: 人・会社・商品などの「モノ」。<strong>ラベル</strong>
                (種類)は0個以上持てる
              </li>
              <li>
                <strong>リレーションシップ</strong>: ノード同士のつながり。必ず<strong>向き</strong>
                と<strong>種類</strong>を持つ(例: <code>WORKS_AT</code>)
              </li>
              <li>
                <strong>プロパティ</strong>:
                ノードやリレーションシップに付けられるキー・バリューの属性(例:{" "}
                <code>名前 = 田中</code>)
              </li>
              <li>
                <strong>ラベル</strong>: ノードをグループ分けするためのタグ(例: <code>Person</code>
                、<code>Company</code>)
              </li>
            </ul>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_2} />
              </div>
              <p className="diagram-caption">
                図2: プロパティグラフの最小構成例(ノード・リレーションシップ・プロパティ・ラベル)
              </p>
            </div>
            <p>
              重要なのは、<strong>リレーションシップ自体が一級のデータ構造</strong>
              として保存される点です。リレーショナルDBでは「関係」は外部キーという間接的な形でしか表現できませんが、グラフDBではリレーションシップそのものに向き・種類・プロパティを持たせられます。
            </p>
            <p>
              本書ではさらに「グラフデータベース」と「グラフ計算エンジン」を区別しています。前者はOLTP的なトランザクション処理に向いたデータベースそのものであり、後者はPageRankのような大規模グラフ分析(バッチ処理)に向いたエンジンを指します。本書が主に扱うのは前者です。
            </p>
          </section>

          <section className="section" id="step1">
            <div className="section-eyebrow">
              <IconQuestionMark size={18} />
              Step 1
            </div>
            <h2>なぜグラフデータベースなのか</h2>

            <h3>リレーショナルDBが苦手にしやすい領域</h3>
            <p>
              リレーショナルDBでも、外部キーや中間テーブルを使えば関係そのものを明示的にモデル化できます。苦手になりやすいのは、その関係を
              <strong>たどる</strong>
              クエリのほうです。関係は行と行の対応として表現され、たどるたびにJOINで再構築するため、多段の関係(友達の友達の友達、など)をたどるクエリでは、結合の段数とデータ量に応じてコストが増えやすくなります。またスキーマ変更にマイグレーションコストがかかり、ドメインの進化に追従しにくいという課題もあります。いずれも一般的な傾向であり、実際のコストは結合アルゴリズム・インデックス・データ分布に左右されます。
            </p>

            <h3>NoSQL集約指向DBの弱点</h3>
            <p>
              Key-Value・Document・Column-familyといった「集約指向(aggregate-oriented)」なNoSQLデータベースは、1つのまとまり(集約)の中のデータには強い一方、集約をまたぐ関係の扱いは相対的に手薄になりがちです。ただしこれも絶対的な制約ではなく、ドキュメント間の参照を持たせたり、製品が備えるクエリ機能(MongoDBの
              <code>$lookup</code>
              など)やマテリアライズドビューを使って集約間の関係を扱える場合もあります。
            </p>
            <p>
              グラフDBとの違いは、関係を「集約に付随する情報」としてではなく、
              <strong>独立した辺そのものとして第一級に扱う</strong>
              点にあります。関係が複雑になるほど、集約指向側では表現とクエリ、そして運用のコストが増えていくのに対し、グラフDBはその複雑さを直接モデルへ載せられる、というトレードオフとして理解するのが実態に近いです。
            </p>
            <p>
              Martin FowlerとPramod Sadalageの共著『NoSQL
              Distilled』でも、グラフDBは「集約指向」の3タイプ(Key-Value、Document、Column-family)とは異なる第4のカテゴリとして明確に区別されており、リレーショナルDBでは扱いにくい関係を横断的にたどれる点がグラフDBの強みだと説明されています。
            </p>

            <h3>グラフDBの強み</h3>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_3} />
              </div>
              <p className="diagram-caption">
                図3: リレーショナルDB・NoSQL・グラフDBの位置づけ比較
              </p>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>観点</th>
                    <th>リレーショナルDB</th>
                    <th>NoSQL集約指向DB</th>
                    <th>グラフDB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>リレーションの表現</td>
                    <td>外部キーで関係を保存(たどる際はJOINで再構築)</td>
                    <td>
                      ドキュメント間参照や<code>$lookup</code>などのクエリ機能で表現・たどる
                    </td>
                    <td>リレーションシップとして明示的に保存</td>
                  </tr>
                  <tr>
                    <td>多段の関係をたどるコスト</td>
                    <td>結合アルゴリズム・インデックス・データ分布に依存する</td>
                    <td>製品のクエリ機能とデータモデルに依存する(不足分はアプリ側で補う)</td>
                    <td>ホップ数・分岐数・結果件数・キャッシュ状態に依存する</td>
                  </tr>
                  <tr>
                    <td>スキーマ</td>
                    <td>事前に固定</td>
                    <td>緩い、または無し</td>
                    <td>ラベルとプロパティで柔軟に進化</td>
                  </tr>
                  <tr>
                    <td>得意な処理</td>
                    <td>集計・レポーティング</td>
                    <td>大量データの高速な読み書き</td>
                    <td>多段の関係をたどる探索クエリ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              本書ch1で説明される「グラフデータベースの力」は、<strong>性能(Performance)</strong>・
              <strong>柔軟性(Flexibility)</strong>・<strong>俊敏性(Agility)</strong>{" "}
              の3つに整理されています。関係をたどる性能が(グラフ全体の件数よりも)探索して実際に触れた部分の大きさに左右されやすいこと、スキーマレスに近い形でドメインを進化させやすいこと、開発初期から反復的にモデルを育てやすいことが強みとして挙げられています。
            </p>
          </section>

          <section className="section" id="step2">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Step 2
            </div>
            <h2>ラベル付きプロパティグラフモデル</h2>
            <p>
              グラフDBでのデータモデリングは、「まず正規化されたテーブルを作る」というリレーショナルDB的な発想ではなく、
              <strong>「どんな質問に答えたいか」からモデルを作る(クエリ駆動のモデリング)</strong>{" "}
              という発想で進めます。
            </p>
            <p>
              本書ch3では、シェイクスピアの戯曲・劇団・上演場所などをまたいだ「クロスドメイングラフ」を例に、複数の異なる領域のデータを1つのグラフに統合するデモンストレーションを行っています(具体的なコードはここでは引用せず、考え方のみ紹介します)。
            </p>

            <h3>よくあるモデリングの落とし穴(アンチパターン)</h3>
            <ul>
              <li>
                <strong>リレーションシップを何でも同じ種類にしてしまう</strong>:{" "}
                <code>RELATED_TO</code>{" "}
                のような汎用的すぎるリレーションシップ種別は、後からクエリで絞り込みにくくなる
              </li>
              <li>
                <strong>プロパティにすべきものをノードにしすぎる、または逆</strong>:
                複雑な値(期間、金額の履歴など)はノードとしてモデル化した方が扱いやすいことが多い
              </li>
              <li>
                <strong>時間の扱いを後回しにする</strong>:
                「いつからいつまで有効な関係か」を最初から設計に組み込まないと、後で大きな手戻りになる
              </li>
              <li>
                <strong>スーパーノード(次数が極端に大きいノード)への配慮不足</strong>:
                数百万件のリレーションシップが1つのノードに集中すると、そのノード周辺のクエリだけ極端に遅くなることがある
              </li>
            </ul>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_4} />
              </div>
              <p className="diagram-caption">図4: クエリ駆動のグラフデータモデリングのサイクル</p>
            </div>
          </section>

          <section className="section" id="step3">
            <div className="section-eyebrow">
              <IconTerminal2 size={18} />
              Step 3
            </div>
            <h2>Cypherクエリ言語入門</h2>
            <p>
              Cypherは、Neo4jのために作られた「人間にとって読みやすい」宣言的なグラフクエリ言語です。パターン(どんな形のノード・リレーションシップを探すか)を、そのまま矢印付きの記法で書けるのが最大の特徴です。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_5} />
              </div>
              <p className="diagram-caption">図5: 基本的なCypherクエリの組み立て方</p>
            </div>
            <p>
              以下は、本書の例そのものではなく、社員と会社のつながりを題材にした独自のサンプルです。
            </p>
            <div className="code-block">
              <div className="code-label">
                <IconTerminal2 size={16} /> Cypher
              </div>
              <pre>{CYPHER_CODE}</pre>
            </div>
            <p>
              ポイントは、<code>(ノード)-[:関係種別]-&gt;(ノード)</code>{" "}
              という書き方が、そのままグラフの図と対応していることです。JOINを何段も書く必要がなく、たどりたい経路をそのままクエリとして表現できます。
            </p>

            <h3>CypherからGQLへ</h3>
            <p>
              2024年4月、Cypherのクエリ構成のセマンティクスを多く取り込んだ
              <strong>GQL(Graph Query Language)</strong>がISO/IEC
              39075として国際標準になりました。1987年のSQL制定以来、ISOが新しく制定したデータベース問い合わせ言語としては初めてのものです。TigerGraphのCEOであるMingxi
              Wu氏は、自社ブログで「GQLはグラフDB業界が(リレーショナルDB、Key-Valueストアに続く)3つ目の代表的なデータベースカテゴリとして確立したことを象徴する出来事だ」と位置づけ、GQLがパターンマッチング構文を使い、SQLとCypherの両方の記法をサポートしていると解説しています。詳細はStep7の後の「2026年時点のアップデート」で扱います。
            </p>
          </section>

          <section className="section" id="step4">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Step 4
            </div>
            <h2>グラフデータベースアプリケーションの構築</h2>
            <p>
              本書ch4では、実際にグラフDBを使ったアプリケーションを作る際の実務的な観点がまとめられています。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_6} />
              </div>
              <p className="diagram-caption">
                図6: グラフデータベースアプリケーション開発の反復サイクル
              </p>
            </div>

            <h3>データモデリング(実装レベル)</h3>
            <ul>
              <li>アプリケーションが実際に必要とする質問からモデルを描く</li>
              <li>「モノ」はノードに、「構造(つながり方)」はリレーションシップに対応させる</li>
              <li>粒度の細かすぎる/粗すぎるリレーションシップを避ける</li>
              <li>複雑な値(履歴、期間など)はノードとして表現する</li>
            </ul>

            <h3>アプリケーションアーキテクチャ</h3>
            <ul>
              <li>組み込み(embedded)モードとサーバーモードのどちらでデータベースを動かすか</li>
              <li>クラスタリングとロードバランシングの設計</li>
              <li>
                テスト駆動でデータモデル自体を検証する(モデルの妥当性をユニットテストで担保する)
              </li>
            </ul>

            <h3>キャパシティプランニング</h3>
            <ul>
              <li>性能(パフォーマンス)、冗長性(可用性)、負荷(スループット)という3つの最適化基準</li>
              <li>
                想定される読み書きの量、ノード・リレーションシップの総数から必要なリソースを見積もる
              </li>
            </ul>

            <h3>データのインポート</h3>
            <ul>
              <li>
                初期インポート(一括ロード)とバッチインポート(継続的な取り込み)の2パターンがある
              </li>
              <li>
                大量データを初めて投入するときは、インデックス構築のタイミングなどに注意が必要
              </li>
            </ul>
          </section>

          <section className="section" id="step5">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Step 5
            </div>
            <h2>実世界におけるグラフの活用事例</h2>
            <p>
              本書ch5では、組織がなぜグラフDBを選ぶのか、そして代表的なユースケースが紹介されています。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_7} />
              </div>
              <p className="diagram-caption">図7: 本書で紹介される代表的なユースケース</p>
            </div>
            <div className="usecase-grid">
              <div className="usecase-card">
                <IconAffiliate size={24} />
                <h4>ソーシャル</h4>
                <p>
                  「友達の友達」は誰か、影響力の大きい人は誰か &mdash;
                  SNS、プロフェッショナル向けネットワーク
                </p>
              </div>
              <div className="usecase-card">
                <IconShoppingCart size={24} />
                <h4>レコメンデーション</h4>
                <p>
                  この人が興味を持ちそうな商品やコンテンツは何か &mdash; ECサイト、動画・音楽配信
                </p>
              </div>
              <div className="usecase-card">
                <IconMap2 size={24} />
                <h4>ジオ(地理空間)</h4>
                <p>近くにある拠点、最適な配送ルートは何か &mdash; 物流、ロジスティクス</p>
              </div>
              <div className="usecase-card">
                <IconBuildingStore size={24} />
                <h4>マスターデータ管理</h4>
                <p>このデータはどのマスタと紐づくべきか &mdash; 顧客データ統合、商品データ統合</p>
              </div>
              <div className="usecase-card">
                <IconServer2 size={24} />
                <h4>ネットワークとデータセンター管理</h4>
                <p>この機器が故障したら何が影響を受けるか &mdash; 通信キャリア、ITインフラ運用</p>
              </div>
              <div className="usecase-card">
                <IconShieldLock size={24} />
                <h4>認可とアクセス制御</h4>
                <p>このユーザはこのリソースにアクセスできるか &mdash; 権限管理、コンプライアンス</p>
              </div>
            </div>
            <p>
              これらのユースケースに共通するのは、「単発のデータ」ではなく「データ同士のつながりを何段もたどる」ことで初めて価値が出る、という点です。本書はプロフェッショナル向けソーシャルネットワークでのレコメンデーション、認可・アクセス制御、地理空間・物流の3つを実例として詳しく掘り下げています。
            </p>
          </section>

          <section className="section" id="step6">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Step 6
            </div>
            <h2>グラフデータベースの内部構造</h2>
            <p>
              「なぜグラフDBは関係をたどるのが速いのか」を理解する鍵が、
              <strong>ネイティブグラフ処理(native graph processing)</strong> と{" "}
              <strong>インデックスフリー隣接(index-free adjacency)</strong> という概念です。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_8} />
              </div>
              <p className="diagram-caption">
                図8: ネイティブグラフ処理と非ネイティブなグラフ処理の違い
              </p>
            </div>
            <p>
              分かりやすい例え話として、コンサルタントのDan McCreary氏はブログで「index-free
              adjacencyは、隣人の家に手紙を届けるのに住所録を調べる(インデックス参照)必要がなく、隣にいることを直接知っているから歩いて渡せる、という感覚に近い」と説明しています。技術的には、リレーショナルDBでのJOINのコストは実行方式(ネステッドループ・ハッシュ・マージなど)、入力件数、利用できるインデックスによって変わり、テーブルが大きくなるほど増加しがちです。これに対し、ネイティブグラフDBでの1ホップの走査は、たどるノードに接続されたリレーションシップの数だけに依存し、グラフ全体のサイズには依存しません。
            </p>
            <p>
              Neo4jのGraphAcademyの教材でも、3階層の親子関係をたどるSQLクエリと、Cypherの同等クエリを比較し、SQLでは複数回のインデックス参照とプランニングが必要になる一方、ネイティブグラフではノードとリレーションシップがポインタで直接つながっているため参照コストが小さいことが示されています。
            </p>

            <h3>プログラマティックAPI</h3>
            <p>
              本書ではNeo4j固有の実装として、Kernel API(最下層の低レベルAPI)、Core
              API(一般的なプログラマティックAPI)、Traversal
              Framework(探索の仕方を宣言的に指定できるAPI)の3層構成が紹介されています。
            </p>

            <h3>非機能特性</h3>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_9} />
              </div>
              <p className="diagram-caption">図9: グラフデータベース内部構造の全体像</p>
            </div>
            <p>
              グラフDBの多くはACIDトランザクションをサポートし、書き込みの一貫性を保証します。一方で、グラフはリレーションシップという「横断的なつながり」を持つデータ構造であるため、リレーショナルDBのように単純にシャーディング(水平分割)するのが難しく、スケールアウトの設計は独自の工夫が必要になる点が本書でも課題として挙げられています。
            </p>
          </section>

          <section className="section" id="step7">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Step 7
            </div>
            <h2>グラフ理論による予測分析</h2>
            <p>
              本書ch7では、グラフを「探索」するアルゴリズムと、グラフの構造から未来の変化を予測する古典的な社会ネットワーク分析の理論が紹介されています。
            </p>

            <h3>幅優先探索と深さ優先探索</h3>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_10} />
              </div>
              <p className="diagram-caption">図10: 幅優先探索と深さ優先探索の違い</p>
            </div>

            <h3>Dijkstra法とA*アルゴリズム</h3>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_11} />
              </div>
              <p className="diagram-caption">図11: Dijkstra法の処理の流れ</p>
            </div>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_12} />
              </div>
              <p className="diagram-caption">図12: A*アルゴリズムがDijkstra法を拡張する考え方</p>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>アルゴリズム</th>
                    <th>目的</th>
                    <th>重みを考慮した最短路への対応</th>
                    <th>代表的な用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BFS</td>
                    <td>最短ホップ数を求める</td>
                    <td>
                      非対応(重み付きグラフを走査することはできるが、重みを考慮した最短路は保証しない)
                    </td>
                    <td>SNSでの最短ホップ数、到達可能性判定</td>
                  </tr>
                  <tr>
                    <td>DFS</td>
                    <td>到達可能な頂点を深さ優先で走査する</td>
                    <td>
                      非対応(重み付きグラフを走査することはできるが、重みを考慮した最短路は保証しない)
                    </td>
                    <td>循環検出、連結成分の抽出</td>
                  </tr>
                  <tr>
                    <td>Dijkstra法</td>
                    <td>重み付きグラフの最短距離を求める</td>
                    <td>対応(非負の重みのみ)</td>
                    <td>カーナビ、経路探索エンジン</td>
                  </tr>
                  <tr>
                    <td>A*</td>
                    <td>ヒューリスティック付きの最短距離を求める</td>
                    <td>
                      対応(非負の重みが前提。木探索ではヒューリスティックが
                      admissible(真の残りコストを過大評価しない)であること、クローズ済みノードを再オープンしないグラフ探索では
                      consistent(一貫性: h(n) &le; c(n,n&prime;) +
                      h(n&prime;))であることが必要。より良い経路発見時にノードを再オープンするグラフ探索なら
                      admissible で足りる)
                    </td>
                    <td>ゲームAIの経路探索、地図アプリ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>三者閉包・構造的均衡・ローカルブリッジ</h3>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_13} />
              </div>
              <p className="diagram-caption">図13: 三者閉包とローカルブリッジの考え方</p>
            </div>
            <p>
              本書のこの章は、社会ネットワーク分析の古典であるDavid Easley氏(コーネル大学)とJon
              Kleinberg氏(同大学)の共著『Networks, Crowds, and
              Markets』の考え方を土台にしています。三者閉包(triadic
              closure)は「共通の友人を持つ2人は将来友人になりやすい」という経験則、構造的均衡(structural
              balance)は「友人関係・敵対関係が入り混じった三者関係のうち、心理的に安定しやすい組み合わせがある」という理論、ローカルブリッジ(local
              bridge)は「共通の知人を持たない関係は、削除すると両端の距離が大きく広がる橋渡し役になっている」という考え方です。これらは、レコメンデーションの精度向上や、不正検知における「怪しい孤立したつながり」の発見などに応用されています。
            </p>
          </section>

          <section className="section" id="appendix">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Appendix A
            </div>
            <h2>付録: NoSQL全体像の中でのグラフDB</h2>
            <p>
              本書の付録Aでは、グラフDBを含むNoSQLデータベース全体の見取り図が整理されています。
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>タイプ</th>
                    <th>データモデル</th>
                    <th>代表的な実装例(2026年時点)</th>
                    <th>得意なこと</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Key-Value</td>
                    <td>キーと値の単純な対応</td>
                    <td>Redis, Amazon DynamoDB</td>
                    <td>高速な読み書き、キャッシュ</td>
                  </tr>
                  <tr>
                    <td>Document</td>
                    <td>JSONのようなドキュメント単位</td>
                    <td>MongoDB, Couchbase</td>
                    <td>半構造化データの柔軟な保存</td>
                  </tr>
                  <tr>
                    <td>Column-family</td>
                    <td>列指向の広いテーブル</td>
                    <td>Apache Cassandra, HBase</td>
                    <td>大量データの書き込みスループット</td>
                  </tr>
                  <tr>
                    <td>Graph</td>
                    <td>ノードとリレーションシップ</td>
                    <td>Neo4j, TigerGraph, ArangoDB</td>
                    <td>多段の関係を横断する探索</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              ACID(Atomicity, Consistency, Isolation,
              Durability)は個々のトランザクションが満たす特性の集合であり、BASE(Basically Available,
              Soft state, Eventually
              consistent)は可用性と結果整合性を優先する分散システムの設計方針を指す標語です。粒度の異なるこの2つの対比、そしてプロパティグラフ・ハイパーグラフ・トリプル(RDF)という3つのグラフ表現方式の違いも本書付録で扱われています。RDF/トリプルストアはセマンティックウェブの標準技術であるSPARQLで問い合わせるのに対し、本書が中心的に扱うプロパティグラフモデルはCypher(および後述のGQL)で問い合わせる点が大きな違いです。
            </p>
          </section>

          <section className="section" id="update2026">
            <div className="section-eyebrow">
              <IconTrendingUp size={18} />
              2026 Update
            </div>
            <h2>2026年時点のアップデート: GQL標準化とGraphRAG</h2>
            <p>
              本書の初版は2013年、第2版は2015年に出版されており、原著が書かれた時点では存在しなかった重要な動きが2024年以降に2つ起きています。
            </p>
            <div className="diagram-card">
              <div className="diagram-wrap">
                <MermaidDiagram chart={DIAGRAM_14} />
              </div>
              <p className="diagram-caption">図14: CypherからGQL、GraphRAGへの流れ</p>
            </div>

            <h3>1. GQLの国際標準化(2024年)</h3>
            <p>
              2024年4月、ISO/IEC合同技術委員会がGQL(Graph Query
              Language)を国際標準として制定しました。1987年にSQLが標準化されて以来、ISOが新たに制定したデータベース問い合わせ言語としては初めてのものです。GQL標準はCypherを強く参考にした設計になっており、Neo4jは独自のCypherを段階的にGQL準拠へ進化させる方針を明らかにしています。TigerGraphのCEOであるMingxi
              Wu氏は自社ブログで「グラフDBがリレーショナルDB・Key-Valueストアに次ぐ3つ目の代表的なデータベースカテゴリとして確立したことを象徴する出来事」と評しており、TheNewStack誌の取材に対してNeo4jのCTOであるPhilip
              Rathle氏も「SQLと同じ組織から出た国際標準であることが、グラフDBの主流化に大きな説得力を持つ」と述べています。
            </p>

            <h3>2. GraphRAG: LLMとナレッジグラフの融合</h3>
            <p>
              2025年から2026年にかけて、大規模言語モデル(LLM)の回答精度を高めるためにグラフDBを使う「GraphRAG」が急速に広がっています。従来のRAG(Retrieval-Augmented
              Generation)がベクトル検索やキーワード検索(BM25など)、それらを組み合わせたハイブリッド検索で関連文書を集めるのに対し、GraphRAGはさらにナレッジグラフの明示的な関係性を組み合わせることで、エンティティ間の関係が複雑なドメイン(規制文書、サプライチェーン、技術サポートなど)での回答精度とハルシネーション(誤った情報生成)の抑制を狙う手法です。
            </p>
            <p>
              Neo4jで製品イノベーションを率いるMichael Hunger氏は、2026年の記事「Graph and AI Trends
              2026」の中で、「AIエージェントは自律的に一連の業務をやり切るところまではまだ到達しておらず、モデル品質も時間とともに劣化しうる」といった率直な課題認識を示しつつ、グラフとAIの組み合わせが次の段階に進むための論点を整理しています。GraphRAGの実装をめぐっては、Neo4j自身が提供する
              <code>neo4j-graphrag</code>パッケージ(PyPIの配布名。公式リポジトリ名は
              <code>neo4j-graphrag-python</code>)、LlamaIndexの<code>PropertyGraphIndex</code>
              、LangChainの<code>LLMGraphTransformer</code>
              など複数のアプローチが2026年時点で並存しており、用途に応じて使い分けるのが実務上の判断ポイントになっています。
            </p>
          </section>

          <section className="section" id="comparison">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Landscape 2026
            </div>
            <h2>主要グラフデータベースの比較(2026年時点)</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>製品</th>
                    <th>データモデル</th>
                    <th>クエリ言語</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Neo4j</td>
                    <td>プロパティグラフ</td>
                    <td>Cypher(GQLへ段階的に対応中)</td>
                    <td>
                      最大手。公式のGQL準拠ドキュメントによれば必須機能の多くと任意機能の相当部分に対応済みだが、未対応の必須機能が残っており実装が進行中。GraphAcademyなど学習コンテンツが充実、GraphRAG関連ツールも自社提供
                    </td>
                  </tr>
                  <tr>
                    <td>TigerGraph</td>
                    <td>プロパティグラフ</td>
                    <td>GSQL(GQL標準化に参画・対応を推進中)</td>
                    <td>
                      GSQLは独自言語で、GQLへ全面準拠しているわけではない。並列処理を活かした大規模グラフ分析に強み
                    </td>
                  </tr>
                  <tr>
                    <td>ArangoDB</td>
                    <td>マルチモデル(ドキュメント+グラフ)</td>
                    <td>AQL</td>
                    <td>ドキュメントDBとグラフDBを1つのエンジンに統合</td>
                  </tr>
                  <tr>
                    <td>Amazon Neptune</td>
                    <td>プロパティグラフ、RDF両対応</td>
                    <td>openCypher, Gremlin, SPARQL</td>
                    <td>AWSのフルマネージドサービス、複数クエリ言語に対応</td>
                  </tr>
                  <tr>
                    <td>JanusGraph</td>
                    <td>プロパティグラフ</td>
                    <td>Gremlin</td>
                    <td>OSS。分散ストレージ(Cassandra等)の上に構築可能</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              2026年時点の一部の解説記事では、GQL標準化とAIツーリングの成熟によって、新規のグラフDBプロジェクトがGremlinよりもCypher(あるいはGQL)を選ぶ傾向にあること、GraphRAGが「不正検知・レコメンデーション以外で初めて主流化したグラフDBのユースケース」だと位置づけられています。いずれも個別記事の見立てであり、市場全体の統計として裏づけられたものではない点に注意してください。
            </p>
          </section>

          <section className="section" id="glossary">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Glossary
            </div>
            <h2>用語集</h2>
            <div className="table-wrap">
              <table className="kv-table">
                <tbody>
                  <tr>
                    <th>ノード(Node)</th>
                    <td>グラフにおける「モノ」を表すデータ単位。ラベルとプロパティを持てる</td>
                  </tr>
                  <tr>
                    <th>リレーションシップ(Relationship)</th>
                    <td>ノード同士のつながり。必ず向きと種類を持つ、一級のデータ構造</td>
                  </tr>
                  <tr>
                    <th>ラベル(Label)</th>
                    <td>
                      ノードの種類を表すタグ(例: <code>Person</code>、<code>Company</code>)
                    </td>
                  </tr>
                  <tr>
                    <th>プロパティ(Property)</th>
                    <td>ノードやリレーションシップに付けられるキー・バリューの属性</td>
                  </tr>
                  <tr>
                    <th>Cypher</th>
                    <td>Neo4j向けに設計された宣言的なグラフクエリ言語</td>
                  </tr>
                  <tr>
                    <th>GQL</th>
                    <td>
                      Cypherのクエリ構成のセマンティクスを多く取り込み、2024年にISO/IEC
                      39075として国際標準化されたグラフクエリ言語
                    </td>
                  </tr>
                  <tr>
                    <th>インデックスフリー隣接(index-free adjacency)</th>
                    <td>
                      各ノードが隣接ノードへの直接ポインタを保持し、走査コストがグラフ全体の件数に依存しない性質
                    </td>
                  </tr>
                  <tr>
                    <th>ネイティブグラフ処理</th>
                    <td>グラフ専用に設計されたストレージ・実行エンジンでの処理方式</td>
                  </tr>
                  <tr>
                    <th>三者閉包(triadic closure)</th>
                    <td>共通の友人を持つ2人が将来友人になりやすいという経験則</td>
                  </tr>
                  <tr>
                    <th>ローカルブリッジ(local bridge)</th>
                    <td>共通の知人を持たない関係で、削除すると両端の距離が大きく広がるもの</td>
                  </tr>
                  <tr>
                    <th>GraphRAG</th>
                    <td>ナレッジグラフとベクトル検索を組み合わせてLLMの回答精度を高める手法</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="section" id="critique">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Read Critically
            </div>
            <h2>批判的に読む</h2>
            <p>
              世界クラスのエンジニアとして本書を鵜呑みにせず、以下の観点も押さえておくと理解が立体的になります。
            </p>
            <div className="critique-card">
              <ul className="critique-list">
                <li>
                  <IconSchool size={20} />
                  <span>
                    <strong>著者全員がNeo4j(旧Neo Technology)の関係者</strong>
                    であるため、本書は「グラフデータベース全般」というタイトルながら、実質的にはNeo4jとCypherを中心に据えた内容になっています。RDF/トリプルストア(SPARQLで問い合わせる系統)やTigerGraph・JanusGraphのような他のグラフDBアーキテクチャへの言及は限定的です。
                  </span>
                </li>
                <li>
                  <IconStar size={20} />
                  <span>
                    <strong>無料配布そのものがNeo4j社のリード獲得(マーケティング)施策</strong>
                    でもあります。内容の質自体は独立系レビュアーからも一定の評価を得ていますが、この文脈は踏まえておく価値があります。
                  </span>
                </li>
                <li>
                  <IconTrendingUp size={20} />
                  <span>
                    <strong>出版は2015年</strong>
                    で、Cypherの構文はその後何度も更新されており(2024年のGQL標準化への追従を含む)、本書に載っているコード例をそのまま最新のNeo4jで実行すると動かない、あるいは非推奨の書き方になっている場合があります。学習の際は必ず公式ドキュメントで最新構文を確認してください。
                  </span>
                </li>
                <li>
                  <IconRoute size={20} />
                  <span>
                    <strong>ch7の「グラフ理論」は応用寄りの軽い紹介</strong>
                    にとどまっており、三者閉包やローカルブリッジといった概念を数学的にきちんと理解したい場合は、コーネル大学のDavid
                    Easley氏・Jon Kleinberg氏による『Networks, Crowds, and
                    Markets』(無料で読める草稿版あり)を併読することをおすすめします。
                  </span>
                </li>
                <li>
                  <IconRobot size={20} />
                  <span>
                    <strong>
                      GraphRAGやグラフニューラルネットワークなど、2020年代後半のAI関連の応用はカバーされていません
                    </strong>
                    。本書は「トランザクショナルなグラフDBの基礎」を固めるための一冊として読み、最新のAI活用トレンドは本記事の「2026年時点のアップデート」や各社の公式ブログで補うのが実務的です。
                  </span>
                </li>
                <li>
                  <IconMessageCircle size={20} />
                  <span>
                    独立系のレビュアーからは、印刷版のボリュームがやや薄く感じられ、レビュー当時のNeo4jの最新機能(2.0系)に必ずしも追従しきれていなかったという指摘もありました。技術書全般に言えることですが、公式ドキュメントとの併読が安全です。
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="section" id="checklist">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Checklist
            </div>
            <h2>学習チェックリスト</h2>
            <GraphDatabasesChecklist />
          </section>

          <section className="section" id="summary">
            <div className="section-eyebrow">
              <IconShare3 size={18} />
              Summary
            </div>
            <h2>まとめ</h2>
            <p>
              グラフデータベースは「関係」を第一級のデータとして扱うことで、リレーショナルDBやNoSQLでは苦労しがちな「多段のつながりをたどるクエリ」を高速かつ表現力豊かに書けるようにする技術です。本書はその考え方を、ラベル付きプロパティグラフモデル・Cypher・アプリケーション構築の実務・内部構造・グラフ理論という5つの切り口から一貫して説明しており、出版から10年以上経った今でも基礎を学ぶ教材として通用します。一方で、GQLの国際標準化やGraphRAGの台頭など、2024年以降の動きは本書に含まれていないため、最新の一次情報と組み合わせて学習することをおすすめします。
            </p>
          </section>

          <section className="section" id="references">
            <div className="section-eyebrow">
              <IconLink size={18} />
              References
            </div>
            <h2>参考文献</h2>

            <div className="ref-group-title">公式情報源</div>
            <div className="ref-grid">
              <div className="ref-card">
                <IconBook size={20} />
                <div>
                  <div className="ref-title">
                    O&rsquo;Reilly Media &mdash; <em>Graph Databases, 2nd Edition</em>{" "}
                    書籍ページ(目次・概要)
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://www.oreilly.com/library/view/graph-databases-2nd/9781491930885/"
                  >
                    https://www.oreilly.com/library/view/graph-databases-2nd/9781491930885/
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconDownload size={20} />
                <div>
                  <div className="ref-title">Neo4j &mdash; 無料eBookダウンロードページ</div>
                  <Ext className="ref-url" href="https://neo4j.com/lp/book-graph-databases/">
                    https://neo4j.com/lp/book-graph-databases/
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconBuildingStore size={20} />
                <div>
                  <div className="ref-title">
                    Neo4j &mdash; O&rsquo;Reilly『Graph Databases』公式紹介ページ
                  </div>
                  <Ext className="ref-url" href="https://neo4j.com/graph-databases-book-sx/">
                    https://neo4j.com/graph-databases-book-sx/
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconSchool size={20} />
                <div>
                  <div className="ref-title">
                    Neo4j &mdash; GraphAcademy「Neo4j
                    Fundamentals」コース(グラフの基礎概念を扱う無料コース)
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://graphacademy.neo4j.com/courses/neo4j-fundamentals"
                  >
                    https://graphacademy.neo4j.com/courses/neo4j-fundamentals
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconGitCompare size={20} />
                <div>
                  <div className="ref-title">
                    Neo4j Blog &mdash; Native vs. Non-Native Graph Database
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://neo4j.com/blog/native-vs-non-native-graph-technology/"
                  >
                    https://neo4j.com/blog/native-vs-non-native-graph-technology/
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconQuestionMark size={20} />
                <div>
                  <div className="ref-title">
                    Neo4j Blog &mdash; Will It Graph? Identifying a Good Fit for Graph Databases,
                    Part 1
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://neo4j.com/blog/developer/will-it-graph-identifying-a-good-fit-for-graph-databases-part-1"
                  >
                    https://neo4j.com/blog/developer/will-it-graph-identifying-a-good-fit-for-graph-databases-part-1
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconCertificate size={20} />
                <div>
                  <div className="ref-title">
                    Neo4j &mdash; GQL国際標準化プレスリリース(2024年4月)
                  </div>
                  <Ext className="ref-url" href="https://neo4j.com/press-releases/gql-standard/">
                    https://neo4j.com/press-releases/gql-standard/
                  </Ext>
                </div>
              </div>
            </div>

            <div className="ref-group-title">国際的な開発者・著名人による解説と書評</div>
            <div className="ref-grid">
              <div className="ref-card">
                <IconMessageCircle size={20} />
                <div>
                  <div className="ref-title">
                    InfoQ &mdash; <em>Graph Databases</em> Book Review and Interview(著者Ian
                    Robinson・Jim Webberへのインタビュー)
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://www.infoq.com/articles/graph-databases-book-review"
                  >
                    https://www.infoq.com/articles/graph-databases-book-review
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconStar size={20} />
                <div>
                  <div className="ref-title">i-programmer.info &mdash; Kay Ewbank氏による書評</div>
                  <Ext
                    className="ref-url"
                    href="https://www.i-programmer.info/bookreviews/21-database/7977-graph-databases.html"
                  >
                    https://www.i-programmer.info/bookreviews/21-database/7977-graph-databases.html
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconStar size={20} />
                <div>
                  <div className="ref-title">datawookie.dev &mdash; 独立系開発者による書評</div>
                  <Ext
                    className="ref-url"
                    href="https://datawookie.dev/blog/2015-02-09-book-review-graph-databases/"
                  >
                    https://datawookie.dev/blog/2015-02-09-book-review-graph-databases/
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconRoute size={20} />
                <div>
                  <div className="ref-title">
                    Dan McCreary &mdash; &ldquo;The Neighborhood Walk Story&rdquo;(Medium)
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://dmccreary.medium.com/how-to-explain-index-free-adjacency-to-your-manager-1a8e68ec664a"
                  >
                    https://dmccreary.medium.com/how-to-explain-index-free-adjacency-to-your-manager-1a8e68ec664a
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconCertificate size={20} />
                <div>
                  <div className="ref-title">
                    Mingxi Wu(TigerGraph CEO)&mdash; &ldquo;The Rise of GQL: A New ISO Standard in
                    Graph Query Language&rdquo;(TigerGraph公式ブログ)
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://www.tigergraph.com/blog/the-rise-of-gql-a-new-iso-standard-in-graph-query-language"
                  >
                    https://www.tigergraph.com/blog/the-rise-of-gql-a-new-iso-standard-in-graph-query-language
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconNews size={20} />
                <div>
                  <div className="ref-title">
                    TheNewStack &mdash; &ldquo;GQL: A New ISO Standard for Querying Graph
                    Databases&rdquo;
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://thenewstack.io/gql-a-new-iso-standard-for-querying-graph-databases/"
                  >
                    https://thenewstack.io/gql-a-new-iso-standard-for-querying-graph-databases/
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconTrendingUp size={20} />
                <div>
                  <div className="ref-title">
                    Michael Hunger(Neo4j VP of Product Innovation)&mdash; &ldquo;Graph and AI Trends
                    2026: Why Is AI Running but Not Yet Delivering?&rdquo;
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://www.wearedevelopers.com/magazine/680-graph-and-ai-trends-2026-why-is-ai-running-but-not-yet-delivering"
                  >
                    https://www.wearedevelopers.com/magazine/680-graph-and-ai-trends-2026-why-is-ai-running-but-not-yet-delivering
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconPencil size={20} />
                <div>
                  <div className="ref-title">
                    Daniel Wertheim &mdash; 開発者個人ブログでの紹介記事
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://danielwertheim.se/do-not-miss-the-free-e-book-graph-databases/"
                  >
                    https://danielwertheim.se/do-not-miss-the-free-e-book-graph-databases/
                  </Ext>
                </div>
              </div>
            </div>

            <div className="ref-group-title">学術・関連分野の一次資料</div>
            <div className="ref-grid">
              <div className="ref-card">
                <IconSchool size={20} />
                <div>
                  <div className="ref-title">
                    David Easley &amp; Jon Kleinberg(コーネル大学)&mdash;{" "}
                    <em>Networks, Crowds, and Markets: Reasoning About a Highly Connected World</em>
                    (草稿版無料公開)
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://www.cs.cornell.edu/home/kleinber/networks-book/"
                  >
                    https://www.cs.cornell.edu/home/kleinber/networks-book/
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconBook size={20} />
                <div>
                  <div className="ref-title">
                    Martin Fowler &amp; Pramod Sadalage &mdash; <em>NoSQL Distilled</em>{" "}
                    書籍情報(グラフDBを含むNoSQL全体の分類)
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://pearson.com/store/p/nosql-distilled-a-brief-guide-to-the-emerging-world-of-polyglot-persistence/P200000009587/9780321826626"
                  >
                    https://pearson.com/store/p/nosql-distilled-a-brief-guide.../9780321826626
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconMicrophone size={20} />
                <div>
                  <div className="ref-title">
                    ThoughtWorks &mdash; Martin Fowlerによる「Rise of NoSQL」ポッドキャスト
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://www.thoughtworks.com/insights/podcasts/technology-podcasts/rise-nosql"
                  >
                    https://www.thoughtworks.com/insights/podcasts/technology-podcasts/rise-nosql
                  </Ext>
                </div>
              </div>
            </div>

            <div className="ref-group-title">2025〜2026年のGraphRAG・グラフDB動向</div>
            <div className="ref-grid">
              <div className="ref-card">
                <IconRobot size={20} />
                <div>
                  <div className="ref-title">
                    Atlan &mdash; &ldquo;Neo4j GraphRAG vs. LlamaIndex vs. LangChain Graph
                    Transformer&rdquo;
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://atlan.com/know/ai-agent/knowledge-graph/neo4j-graphrag-vs-llamaindex-vs-langchain/"
                  >
                    https://atlan.com/know/ai-agent/knowledge-graph/neo4j-graphrag-vs-llamaindex-vs-langchain/
                  </Ext>
                </div>
              </div>
              <div className="ref-card">
                <IconTrendingUp size={20} />
                <div>
                  <div className="ref-title">
                    &ldquo;Graph Databases in 2026: Neo4j, ArangoDB, TigerGraph and the GraphRAG
                    Moment&rdquo;
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://pdpspectra.com/blog/neo4j-vs-arangodb-2026"
                  >
                    https://pdpspectra.com/blog/neo4j-vs-arangodb-2026
                  </Ext>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <p>
              Graph Databases: New Opportunities for Connected Data 初学者ガイド &mdash;
              本ページは同書の要約・再構成であり、原文の引用ではありません。最新情報は各参照元をご確認ください。
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
