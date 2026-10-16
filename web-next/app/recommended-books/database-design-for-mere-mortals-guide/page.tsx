import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import {
  IconAbc,
  IconAdjustments,
  IconAlertTriangle,
  IconArrowBigRightLines,
  IconArrowsJoin,
  IconBook,
  IconBook2,
  IconBulb,
  IconCalendar,
  IconChecklist,
  IconDatabase,
  IconDatabaseOff,
  IconEye,
  IconFlag,
  IconFlag2,
  IconGavel,
  IconHelpCircle,
  IconHierarchy2,
  IconIdBadge2,
  IconKey,
  IconLink,
  IconListDetails,
  IconMap2,
  IconMessage2,
  IconNotes,
  IconRoute,
  IconSearch,
  IconShieldCheck,
  IconSitemap,
  IconSql,
  IconSquareCheck,
  IconTable,
  IconTarget,
  IconUsers,
} from "@tabler/icons-react";
import DatabaseDesignChecklist from "./DatabaseDesignChecklist";
import DatabaseDesignSidebar from "./DatabaseDesignSidebar";

export const metadata: Metadata = {
  title: "データベース設計の名著を読み解く - Database Design for Mere Mortals 徹底解説ガイド",
  description:
    "Michael J. Hernandez による、リレーショナルデータベース設計の定番入門書『Database Design for Mere Mortals』をステップバイステップで徹底解説。正規化理論ではなく独自の実践的メソッドを採る立ち位置まで丁寧に扱います。",
};

const MERMAID_INIT = `%%{init: {"theme": "base", "themeVariables": {"fontFamily": "\\"Noto Sans JP\\", sans-serif", "fontSize": "16px", "primaryColor": "#e4e7fb", "primaryBorderColor": "#3f51b5", "primaryTextColor": "#20233d", "lineColor": "#8a8272", "secondaryColor": "#faf0d4", "tertiaryColor": "#ffffff"}}}%%
`;

const CLASS_DEFS = `
    classDef hub fill:#e4e7fb,stroke:#3f51b5,stroke-width:2px,color:#20233d;
    classDef done fill:#e0f3e8,stroke:#2e7d52,stroke-width:2px,color:#173c28;
    classDef box fill:#faf0d4,stroke:#b8860b,stroke-width:2px,color:#4a3a08;
`;

const DIAG_0 = `${MERMAID_INIT}flowchart LR
    accTitle: 書籍全体の構成
    accDescr: 書籍はPart IからPart IVの4部構成。Part Iは第1章から第3章でリレーショナルデータベース・設計目標・用語の基礎を、Part IIは第4章から第13章で設計プロセス10ステップを、Part IIIは第14章から第16章で悪いデザイン・ルールの例外・結びを扱い、Part IVは付録AからHの参考資料である。
    Title["書籍全体"] --> P1["Part I  リレーショナルデータベース設計の基礎"]
    Title --> P2["Part II  設計プロセス"]
    Title --> P3["Part III  その他の設計課題"]
    Title --> P4["Part IV  付録"]
    P1 --> C1["第1章 リレーショナルデータベース"]
    P1 --> C2["第2章 設計目標"]
    P1 --> C3["第3章 用語"]
    P2 --> C4["第4章から第13章 設計プロセス10ステップ"]
    P3 --> C5["第14章 悪いデザイン"]
    P3 --> C6["第15章 ルールを曲げる破る"]
    P3 --> C7["第16章 結び"]
    P4 --> C8["付録A から H 参考資料と補足"]
${CLASS_DEFS}
    class Title hub;`;

const DIAG_1 = `${MERMAID_INIT}flowchart LR
    accTitle: 学術的アプローチと本書の実践的アプローチの比較
    accDescr: 整理されていないデータから整合性の取れたデータベースへ至る道筋は2つある。学術的な正規化アプローチは第1正規形から第5正規形まで関数従属などの形式的用語で段階的に検証する。本書の実践的アプローチはインタビューとミッションステートメントから出発し、理想的フィールドと理想的テーブルの基準で検証する。どちらも同じゴールに到達する。
    Start["整理されていないデータ"] --> Academic["学術的な正規化アプローチ 第1正規形から第5正規形まで段階的に検証し 関数従属など形式的な用語を使用"]
    Start --> Practical["本書の実践的アプローチ 理想的フィールドと理想的テーブルの基準で検証し インタビューとミッションステートメントから出発"]
    Academic --> Goal["整合性の取れた構造化データベース"]
    Practical --> Goal
${CLASS_DEFS}
    class Start hub;
    class Goal done;`;

const DIAG_2 = `${MERMAID_INIT}flowchart TD
    accTitle: 本ガイドの学習順序
    accDescr: Step0の設計を学ぶ理由から始まり、リレーショナルデータベース、設計目標、用語、設計プロセス全体像、Step5から13の設計プロセスの実践、悪いデザインの回避、例外の理解、結びの順に一直線に進み、最後にSQLと発展的トピックへ進む。
    S0["Step0 なぜ設計を学ぶのか"] --> S1["Step1 リレーショナルデータベースとは"]
    S1 --> S2["Step2 設計目標"]
    S2 --> S3["Step3 用語"]
    S3 --> S4["Step4 設計プロセス全体像"]
    S4 --> S5["Step5から13 設計プロセスの実践"]
    S5 --> S14["Step14 悪いデザインを避ける"]
    S14 --> S15["Step15 例外を理解する"]
    S15 --> S16["Step16 結び"]
    S16 --> Next["次のステップ SQLと発展的トピックへ"]
${CLASS_DEFS}
    class S0 hub;
    class Next done;`;

const DIAG_3 = `${MERMAID_INIT}flowchart LR
    accTitle: テーブル間リレーションシップの4類型
    accDescr: 1対1は社員と社員専用ロッカー、1対多は顧客と複数の注文、多対多は学生と複数の講座への登録、自己参照は社員が上司である別の社員を参照する例で示される。
    R["テーブル間リレーションシップの4類型"] --> R1["1対1"]
    R --> R2["1対多"]
    R --> R3["多対多"]
    R --> R4["自己参照"]
    R1 --> R1ex["例 社員と社員専用ロッカー"]
    R2 --> R2ex["例 顧客とその顧客の複数の注文"]
    R3 --> R3ex["例 学生と複数の講座への登録"]
    R4 --> R4ex["例 社員が上司である別の社員を参照"]
${CLASS_DEFS}
    class R hub;`;

const DIAG_4 = `${MERMAID_INIT}flowchart TD
    accTitle: 設計プロセスの7段階
    accDescr: ミッションステートメントの定義、現行データベースの分析、データ構造の作成、テーブルリレーションシップの確立、ビジネスルールの定義、ビューの定義、データ整合性の見直しの順に進み、見直しの結果に応じて最初の段階へ戻る反復的なプロセスである。
    M1["1 ミッションステートメントの定義"] --> M2["2 現行データベースの分析"]
    M2 --> M3["3 データ構造の作成"]
    M3 --> M4["4 テーブルリレーションシップの確立"]
    M4 --> M5["5 ビジネスルールの定義"]
    M5 --> M6["6 ビューの定義"]
    M6 --> M7["7 データ整合性の見直し"]
    M7 -.-> M1
${CLASS_DEFS}
    class M1 hub;`;

const DIAG_5 = `${MERMAID_INIT}flowchart TD
    accTitle: ミッションステートメント作成までの流れ
    accDescr: インタビューを準備し、利用者とマネジメントの双方にインタビューして要件と情報項目を収集する。収集結果からミッションステートメントを作成し、それをもとにミッションオブジェクティブを作成する。
    Prep["インタビューの準備"] --> UserI["利用者へのインタビュー"]
    Prep --> MgmtI["マネジメントへのインタビュー"]
    UserI --> Collect["要件と情報項目の収集"]
    MgmtI --> Collect
    Collect --> Mission["ミッションステートメントの作成"]
    Mission --> Objectives["ミッションオブジェクティブの作成"]
${CLASS_DEFS}
    class Prep hub;
    class Objectives done;`;

const DIAG_6 = `${MERMAID_INIT}flowchart TD
    accTitle: 現行データベース分析の流れ
    accDescr: 現行データベースが紙ベースかレガシーシステムかを確認し、データの収集方法と情報の提示方法を並行して確認する。両方の結果を踏まえて利用者とマネジメントに追加インタビューを行い、暫定フィールドリスト、計算フィールドリストの順に作成して、最後に利用者とマネジメントがレビューする。
    Know["現行データベースを把握する"] --> Type["紙ベースかレガシーシステムかを確認"]
    Type --> Collect["データの収集方法を確認"]
    Type --> Present["情報の提示方法を確認"]
    Collect --> Interview["利用者とマネジメントへの追加インタビュー"]
    Present --> Interview
    Interview --> FieldList["暫定フィールドリストの作成"]
    FieldList --> CalcList["計算フィールドリストの作成"]
    CalcList --> Review["利用者とマネジメントによるレビュー"]
${CLASS_DEFS}
    class Know hub;
    class Review done;`;

const DIAG_7 = `${MERMAID_INIT}flowchart TD
    accTitle: テーブル構造を確定するまでの流れ
    accDescr: 主題対象を洗い出して暫定テーブルリストを作り、最終テーブルリストを確定する。各テーブルにフィールドを割り当て、理想的フィールドの基準、理想的テーブルの基準の順に検証し、必要に応じてサブセットテーブルを分離する。
    Subjects["主題対象の洗い出し"] --> Prelim["暫定テーブルリストの作成"]
    Prelim --> Final["最終テーブルリストの確定"]
    Final --> Assign["各テーブルへのフィールド割り当て"]
    Assign --> IdealField["理想的フィールドの基準で検証"]
    IdealField --> IdealTable["理想的テーブルの基準で検証"]
    IdealTable --> Subset["必要に応じてサブセットテーブルを分離"]
${CLASS_DEFS}
    class Subjects hub;
    class Subset done;`;

const DIAG_8 = `${MERMAID_INIT}flowchart TD
    accTitle: キーの分類
    accDescr: テーブル内のフィールドは、候補キーを構成するものと非キーフィールドに分かれる。候補キーはレコードを一意に識別できる単一のフィールド、またはフィールドの組み合わせであり、どのフィールドを取り除いても一意性を保てない最小の構成である。候補キーの中から1つを選んだものがプライマリキーであり、選ばれなかった残りの候補キーが代替キーとなる。
    All["テーブル内のフィールド 単一または組み合わせ"] --> Candidate["候補キー 一意に識別できるフィールドまたはその組み合わせ かつ どのフィールドを除いても一意性を保てない最小構成"]
    All --> NonKey["非キーフィールド どの候補キーにも含まれないフィールド"]
    Candidate --> Primary["プライマリキー 候補キーの中から1つを選定"]
    Candidate --> Alternate["代替キー 選ばれなかった残りの候補キー"]
${CLASS_DEFS}
    class All hub;
    class Primary done;`;

const DIAG_9 = `${MERMAID_INIT}flowchart TD
    accTitle: フィールド仕様を構成する3つの要素
    accDescr: フィールド仕様は3種類の要素で1つのフィールドを定義する。一般要素は名称・説明・種別など、そのフィールドが何を表すかを人に伝える情報を担う。物理要素はデータ型・長さ・必須入力かどうかなど、値をどう格納するかを定める。論理要素は値の範囲・デフォルト値・検証規則など、どの値を正しいとみなすかを定める。3つの要素は並列の関係にあり、すべてがそろってはじめてフィールドの定義が完結する。
    Spec["フィールド仕様"] --> General["一般要素 名称 説明 種別など"]
    Spec --> Physical["物理要素 データ型 長さ 必須入力かどうかなど"]
    Spec --> Logical["論理要素 値の範囲 デフォルト値 検証規則など"]
${CLASS_DEFS}
    class Spec hub;`;

const DIAG_10 = `${MERMAID_INIT}flowchart TD
    accTitle: 親レコード削除時の削除規則
    accDescr: 親レコードが削除されるとき、子レコードの扱いは3通りから選ぶ。子も連動して削除するならカスケード削除、子が存在する限り削除を禁止するなら削除を制限、子の外部キーを空値にするならNullに設定である。
    Delete["親レコードが削除される"] --> Q{"子レコードはどう扱うか"}
    Q -->|"子も連動して削除する"| Cascade["カスケード削除"]
    Q -->|"子が存在する限り削除を禁止する"| Restrict["削除を制限"]
    Q -->|"外部キーを空値にする"| SetNull["Nullに設定"]
${CLASS_DEFS}
    class Delete hub;
    class Q box;`;

const DIAG_11 = `${MERMAID_INIT}flowchart TD
    accTitle: ビジネスルールの分類
    accDescr: ビジネスルールはフィールド固有のルールとリレーションシップ固有のルールに分かれる。前者は入力可能な値の範囲や形式に関する制約、後者は参加のタイプや削除規則に関する制約を定める。
    Rules["ビジネスルール"] --> Field["フィールド固有のルール"]
    Rules --> Relation["リレーションシップ固有のルール"]
    Field --> FieldEx["入力可能な値の範囲や形式に関する制約"]
    Relation --> RelationEx["参加のタイプや削除規則に関する制約"]
${CLASS_DEFS}
    class Rules hub;`;

const DIAG_12 = `${MERMAID_INIT}flowchart TD
    accTitle: ビューの3類型
    accDescr: ビューには、単純な抽出や表示に使うデータビュー、合計や平均などの集計結果を示す集計ビュー、データ整合性の確認に使う検証ビューの3種類がある。
    Views["ビュー"] --> DataView["データビュー 単純な抽出 表示用"]
    Views --> AggView["集計ビュー 合計や平均などの集計結果"]
    Views --> ValView["検証ビュー データ整合性確認用"]
${CLASS_DEFS}
    class Views hub;`;

const DIAG_13 = `${MERMAID_INIT}flowchart TD
    accTitle: 避けるべき設計アプローチ
    accDescr: フラットファイル設計はすべての情報を1枚の巨大な表に詰め込む。スプレッドシート型設計は行と列の見た目にとらわれて主題ごとの分離を怠る。特定ソフトウェア主導の設計は特定製品の機能制約を設計要件と混同する。
    Bad["避けるべき設計アプローチ"] --> Flat["フラットファイル設計"]
    Bad --> Spread["スプレッドシート型設計"]
    Bad --> SoftwareDriven["特定ソフトウェア主導の設計"]
    Flat --> FlatEx["すべての情報を1枚の巨大な表に詰め込む"]
    Spread --> SpreadEx["行と列の見た目にとらわれ主題ごとの分離を怠る"]
    SoftwareDriven --> SoftEx["特定製品の機能制約を設計要件と混同する"]
${CLASS_DEFS}
    class Bad box;`;

export default function DatabaseDesignForMereMortalsGuidePage() {
  return (
    <div className="database-design-for-mere-mortals-guide">
      <div className="layout">
        <DatabaseDesignSidebar />
        <main className="main" id="main-content" tabIndex={-1}>
          <section className="hero">
            <span className="hero-kicker">
              <IconBook className="ti" size={16} />
              初学者向け解説ガイド
            </span>
            <h1 className="hero-title">
              データベース設計の名著を読み解く
              <br />
              『Database Design for Mere Mortals』徹底解説
            </h1>
            <p className="hero-lead">
              Michael J. Hernandez による、リレーショナルデータベース設計の定番入門書をステップバイステップで読み解きます。正規化理論ではなく独自の実践的メソッドを採る、その立ち位置まで丁寧に扱います。
            </p>
            <p className="hero-note">
              <IconCalendar className="ti" size={16} /> 2026年9月時点の情報をもとに作成しました。
            </p>
          </section>

          <section className="section prose" id="overview">
            <div className="section-eyebrow">
              <IconBook2 className="ti" size={16} />
              Introduction
            </div>
            <h2>この記事について</h2>
            <p>
              『Database Design for Mere Mortals: A Hands-On Guide to Relational Database Design』(邦題は未訳、直訳すると「普通の人のためのデータベース設計」)は、Michael J. Hernandez による、リレーショナルデータベース設計の入門書です。1996年の初版以来、特定のDBMS製品やSQLの知識を前提とせず、業務要件からテーブル構造を組み立てる「設計プロセス」そのものを平易な言葉で解説してきた点が特徴で、30年近く版を重ねながら読み継がれています。
            </p>
            <p>
              このガイドは、本書の最新版である第4版<span className="pill">25th Anniversary Edition, 2020年</span>の構成に沿って、各章の要点をステップ形式でかみ砕いて解説するものです。原著を読む前の地図として、あるいは読後の振り返り資料として活用してください。なお、本書は正規化理論(第1正規形から第5正規形)を主軸に据えない独自の設計手法を採っている点が特徴的であり、このガイドでもその立ち位置を丁寧に扱います。
            </p>
          </section>

          <section className="section" id="book-data">
            <div className="section-eyebrow">
              <IconIdBadge2 className="ti" size={16} />
              Book Info
            </div>
            <h2>書籍データ</h2>
            <div className="book-card">
              <div className="book-cover">
                <IconBook2 className="ti book-cover-icon" size={30} />
                <div className="book-cover-title">
                  Database Design for
                  <br />
                  MERE MORTALS
                </div>
                <div className="book-cover-edition">25th Anniversary Edition</div>
              </div>
              <div className="book-card-body">
                <div className="table-wrap">
                  <table className="kv-table">
                    <tbody>
                      <tr>
                        <th>原題</th>
                        <td>Database Design for Mere Mortals: A Hands-On Guide to Relational Database Design</td>
                      </tr>
                      <tr>
                        <th>著者</th>
                        <td>Michael J. Hernandez</td>
                      </tr>
                      <tr>
                        <th>初版刊行</th>
                        <td>1996年12月(Addison-Wesley)</td>
                      </tr>
                      <tr>
                        <th>最新版</th>
                        <td>第4版「25th Anniversary Edition」(2020年12月刊行、Addison-Wesley Professional)</td>
                      </tr>
                      <tr>
                        <th>ページ数</th>
                        <td>約640ページ</td>
                      </tr>
                      <tr>
                        <th>ISBN-13(第4版)</th>
                        <td>978-0-13-678804-1</td>
                      </tr>
                      <tr>
                        <th>序文</th>
                        <td>Michelle Poolet(Mount Vernon Data Systems LLC)</td>
                      </tr>
                      <tr>
                        <th>姉妹書</th>
                        <td>『SQL Queries for Mere Mortals』(John L. Viescas との共著)</td>
                      </tr>
                      <tr>
                        <th>前提知識</th>
                        <td>不要。データベース未経験者を主な対象に書かれている</td>
                      </tr>
                      <tr>
                        <th>特徴</th>
                        <td>特定のDBMS製品やSQL構文に依存しない、プラットフォーム非依存の設計手法書</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="section prose" id="audience">
            <div className="section-eyebrow">
              <IconUsers className="ti" size={16} />
              Who This Is For
            </div>
            <h2>想定読者・このガイドの使い方</h2>
            <ul>
              <li>業務でデータベースやテーブルを設計する必要があるが、体系的に学んだことがないエンジニア・アナリスト</li>
              <li>独学でSQLは書けるようになったが、テーブル構造そのものの「正しい設計の仕方」に自信が持てない人</li>
              <li>正規化理論を学んだものの、実務でどう使えばよいか掴めていない人</li>
              <li>原著(英語)を読む前に全体像を掴んでおきたい人</li>
            </ul>
            <p>各ステップは原著の章立てにほぼ対応しています。まずは目次代わりに全体構成を俯瞰しましょう。</p>
          </section>

          <section className="section" id="structure">
            <div className="section-eyebrow">
              <IconSitemap className="ti" size={16} />
              Book Structure
            </div>
            <h2>本書の全体構成</h2>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_0} />
              </div>
              <div className="diagram-caption">書籍全体の構成 - Part IからIVへの流れ</div>
            </div>
            <div className="prose">
              <p>
                Part Iで基礎知識と用語を固め、Part II(本書の中核、10章分)で実際の設計プロセスを順を追って実践し、Part IIIで応用的な注意点を扱う、という構成になっています。
              </p>
            </div>
          </section>

          <section className="section" id="philosophy">
            <div className="section-eyebrow">
              <IconBulb className="ti" size={16} />
              Design Philosophy
            </div>
            <h2>この本の設計思想: 正規化理論ではなく「独自メソッド」</h2>
            <div className="prose">
              <p>
                多くのデータベース教科書は第1正規形(1NF)から第5正規形(5NF)までを段階的に検証する「正規化」を設計の中心に据えます。しかし本書は違うアプローチを取ります。Hernandezは、関数従属性や非キー属性といった形式的な用語は初学者には難解すぎると考え、代わりに「理想的フィールド(ideal field)」「理想的テーブル(ideal table)」という独自の基準でテーブル構造を検証する、より実践的な手法を提示しています。正規化については第2章に「Normalization」の説明があり、付録Gでも補足的に扱われますが、通常の正規化手順そのものは本編の設計プロセスには組み込まれていません。</p>
            </div>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_1} />
              </div>
              <div className="diagram-caption">学術的な正規化アプローチと、本書の実践的アプローチの対比</div>
            </div>
            <div className="callout gold">
              <IconAlertTriangle className="ti" size={22} />
              <div className="callout-body">
                <span className="callout-title">読む前に知っておきたいこと</span>
                <p>
                  この違いを知らずに読むと「正規化の説明がない」と戸惑うかもしれませんが、これは意図的な設計判断です。実務上、本書の手法をきちんと適用すれば、結果として得られるテーブル構造はおおむね第3正規形(3NF)相当の水準に達すると業界内でも評価されています。正規化理論そのものを体系的に学びたい場合は、後述の「次のステップ」で紹介する資料を併読することをおすすめします。
                </p>
              </div>
            </div>
          </section>

          <section className="section" id="roadmap">
            <div className="section-eyebrow">
              <IconRoute className="ti" size={16} />
              Learning Path
            </div>
            <h2>学習ロードマップ</h2>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_2} />
              </div>
              <div className="diagram-caption">Step0からStep16、そして次のステップへの学習の流れ</div>
            </div>
          </section>

          <section className="section prose" id="step0">
            <div className="section-eyebrow">
              <IconHelpCircle className="ti" size={16} />
              導入
            </div>
            <h2>Step0: なぜ設計を学ぶのか</h2>
            <p>
              本編に入る前に、そもそもなぜデータベースの「設計」を学ぶ必要があるのかを確認しておきます。DBMS製品の操作やSQLの書き方を覚えれば、テーブルを作ってデータを入れること自体はすぐにできるようになります。しかし、どのテーブルにどのフィールドを持たせ、テーブル同士をどう関連づけるかという構造の判断は、製品の操作知識からは導き出せません。
            </p>
            <p>
              構造を十分に検討しないまま作られたデータベースは、データの重複・矛盾・更新時の不整合といった問題を後から引き起こし、運用が進むほど修正のコストが膨らんでいきます(Step2・Step14で詳しく扱います)。設計を学ぶことは、こうした問題を作り込む前に防ぐための投資です。
            </p>
            <p>
              また本書の設計手法は特定のDBMS製品やSQL方言に依存しないため、一度身につければ利用する製品が変わっても通用します。このガイドでは、この動機を出発点として、Step1以降でリレーショナルデータベースの基礎から設計プロセスの実践へと順に進んでいきます。
            </p>
          </section>

          <section className="section prose" id="part1">
            <div className="section-eyebrow">
              <IconFlag className="ti" size={16} />
              Part I
            </div>
            <h2>Part I: リレーショナルデータベース設計の基礎</h2>
          </section>

          <section className="section prose" id="step1">
            <div className="section-eyebrow">
              <IconDatabase className="ti" size={16} />
              第1章
            </div>
            <h2>Step1: リレーショナルデータベースとは何か</h2>
            <p>
              第1章はもっとも基礎的な問い、「データベースとは何か」から始まります。本書におけるデータベースとは、単なるデータの集合ではなく、「関連する情報を目的に沿って整理した構造」を指します。特にリレーショナルデータベースは、データをテーブル(表)という形式で格納し、テーブル同士を共通のキーで関連づけることでデータを取り出す仕組みです。
            </p>
            <p>第1章で紹介される、リレーショナルデータベースの主な利点は次の通りです。</p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>利点</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>組み込みの多層整合性</td>
                    <td>フィールドレベル・テーブルレベル・リレーションシップレベルでデータの正確性を保証できる</td>
                  </tr>
                  <tr>
                    <td>データの一元管理</td>
                    <td>同じデータを複数箇所に重複して持たずに済む</td>
                  </tr>
                  <tr>
                    <td>柔軟な問い合わせ</td>
                    <td>あらかじめ決められた形式だけでなく、多様な切り口でデータを取り出せる</td>
                  </tr>
                  <tr>
                    <td>データの独立性</td>
                    <td>アプリケーションの実装とデータ構造を分離できる</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              章の終盤では、リレーショナルデータベース管理システム(RDBMS)がこうした構造をどのように実現しているかが概観され、Part II以降で扱う「設計」というテーマへの橋渡しがなされます。
            </p>
          </section>

          <section className="section prose" id="step2">
            <div className="section-eyebrow">
              <IconTarget className="ti" size={16} />
              第2章
            </div>
            <h2>Step2: 設計目標とアプローチ</h2>
            <p>
              なぜわざわざ「設計」に時間をかける必要があるのでしょうか。第2章はこの動機づけから始まります。行き当たりばったりで作られたデータベースは、データの重複・矛盾・更新時の不整合といった問題を後から引き起こし、その修正コストは設計段階できちんと手を打つよりもはるかに高くつきます。
            </p>
            <p>本章では、良い設計の目的として次のような点が挙げられています。</p>
            <ul>
              <li>データの重複を排除し、記憶域を節約する</li>
              <li>データの正確性と整合性を保証する</li>
              <li>アプリケーションのニーズに柔軟に対応できる構造にする</li>
              <li>将来の拡張や変更を容易にする</li>
            </ul>
            <p>
              そのうえで、伝統的な設計手法(正規化理論を中心に据えるもの)と、本書が提示する独自の設計手法を対比しています。前述の通り、本書は正規化理論そのものの詳細な解説を主目的とせず、より実務的で段階的なプロセスを重視する立場を取ります。
            </p>
          </section>

          <section className="section prose" id="step3">
            <div className="section-eyebrow">
              <IconAbc className="ti" size={16} />
              第3章
            </div>
            <h2>Step3: 用語を正しく理解する</h2>
            <p>
              設計プロセスに入る前に、共通言語を整えておく必要があります。第3章では、本書全体を通じて使われる用語が4つのカテゴリに整理されています。
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>主な用語</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>値に関する用語</td>
                    <td>データ、情報、Null(値が存在しないこと)</td>
                  </tr>
                  <tr>
                    <td>構造に関する用語</td>
                    <td>テーブル、フィールド、レコード、ビュー、キー、インデックス</td>
                  </tr>
                  <tr>
                    <td>リレーションシップに関する用語</td>
                    <td>リレーションシップ、参加のタイプ、参加の度合い</td>
                  </tr>
                  <tr>
                    <td>整合性に関する用語</td>
                    <td>フィールド仕様、データ整合性</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              特に重要なのが「Null」の扱いです。Nullは「空文字列」や「ゼロ」とは異なり、「値が未知である、または適用されない」ことを表す特別な状態です。この違いを理解していないと、後の章で扱う整合性ルールの設計を誤ってしまいます。
            </p>
            <p>もう一つ本章の山場が、テーブル間の「リレーションシップ」の4類型です。</p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_3} />
              </div>
              <div className="diagram-caption">テーブル間リレーションシップの4類型と具体例</div>
            </div>
            <p>
              この分類は第10章「テーブルリレーションシップ」で改めて詳しく扱われますが、以降の章を読み進めるうえでの基礎知識として、この段階で押さえておく必要があります。
            </p>
          </section>

          <section className="section prose" id="part2">
            <div className="section-eyebrow">
              <IconFlag className="ti" size={16} />
              Part II
            </div>
            <h2>Part II: 設計プロセス(第4章から第13章)</h2>
            <p>
              Part IIは本書の中核です。著者が提唱する設計プロセスは、大きく7つのフェーズから構成されています。ただしフェーズと章は必ずしも1対1で対応せず、第4章はこの7フェーズ全体を概観する導入章であり、3つ目のフェーズ「データ構造の作成」は第7章から第9章の3章にわたって詳述されます。
            </p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_4} />
              </div>
              <div className="diagram-caption">設計プロセスの7フェーズ - ミッションステートメントから整合性の見直しまで</div>
            </div>
            <p>
              このプロセスは一度きりの直線的な作業ではなく、見直しのたびにミッションステートメントへ立ち返ることが想定された反復的な流れである点に注意してください。
            </p>
          </section>

          <section className="section prose" id="step4">
            <div className="section-eyebrow">
              <IconMap2 className="ti" size={16} />
              第4章
            </div>
            <h2>Step4: 設計プロセスの全体像</h2>
            <p>
              第4章は、7フェーズそれぞれの目的を概説する、いわば「地図」の章です。各フェーズを完了させることの重要性が強調されており、途中で工程を飛ばすと後の章で手戻りが発生しやすいことが警告されています。特に、最初のミッションステートメント策定を軽視してしまうと、後続のテーブル設計全体の方向性がぶれてしまう点が繰り返し強調されます。
            </p>
          </section>

          <section className="section prose" id="step5">
            <div className="section-eyebrow">
              <IconMessage2 className="ti" size={16} />
              第5章
            </div>
            <h2>Step5: プロセスの開始 - インタビューとミッションステートメント</h2>
            <p>
              設計は要件を聞き出すことから始まります。第5章では、利用者やマネジメント層へのインタビューの進め方が具体的なガイドラインとともに解説されます。
            </p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_5} />
              </div>
              <div className="diagram-caption">インタビューからミッションステートメント・ミッションオブジェクティブ作成までの流れ</div>
            </div>
            <p>
              ミッションステートメントは、データベースを作る「目的」を一文または数文で言語化したものです。曖昧な目的からは曖昧な設計しか生まれないため、本章では「良いミッションステートメント」の条件(具体的であること、データベースの対象領域を明確にすることなど)が丁寧に説明されています。ミッションステートメントをさらに具体的な達成項目に分解したものが「ミッションオブジェクティブ」であり、これが後の章でテーブルやフィールドを洗い出す際の判断基準として機能します。
            </p>
          </section>

          <section className="section prose" id="step6">
            <div className="section-eyebrow">
              <IconSearch className="ti" size={16} />
              第6章
            </div>
            <h2>Step6: 現行データベースの分析</h2>
            <p>
              多くの場合、設計対象となる業務にはすでに何らかのデータ管理の仕組み(紙の台帳、スプレッドシート、レガシーシステムなど)が存在します。第6章では、その現行の仕組みを分析する手順が扱われます。
            </p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_6} />
              </div>
              <div className="diagram-caption">現行データベースの把握からレビューまでの分析プロセス</div>
            </div>
            <p>
              ここで作成される「暫定フィールドリスト」は、集めた情報のすべての項目を洗い出したものであり、次章以降でテーブル構造を組み立てる際の素材になります。合計金額のように他のフィールドから計算できる項目は「計算フィールドリスト」として別扱いにする点も実務上重要なポイントです。
            </p>
          </section>

          <section className="section prose" id="step7">
            <div className="section-eyebrow">
              <IconTable className="ti" size={16} />
              第7章
            </div>
            <h2>Step7: テーブル構造の確立</h2>
            <p>
              いよいよ、収集した情報を実際のテーブル構造へと落とし込みます。第7章は本書の中でも特に分量が多く、実務的な工夫が詰め込まれた章です。
            </p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_7} />
              </div>
              <div className="diagram-caption">主題対象の洗い出しからサブセットテーブルの分離までの流れ</div>
            </div>
            <p>
              ここで登場する「理想的フィールド(ideal field)」とは、他のフィールドから計算・導出できず、複数の値や意味を持たない、単一の事実を表すフィールドのことです。同様に「理想的テーブル(ideal table)」とは、単一の主題(人・物・出来事など)だけを表し、重複するデータを持たないテーブルを指します。この2つの基準を満たすようにテーブルとフィールドを繰り返し見直していく作業こそが、本書における正規化理論の代替手段にあたります。
            </p>
            <p>よくある問題とその対処も整理されています。</p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>問題</th>
                    <th>内容</th>
                    <th>対処</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>複数部分フィールド</td>
                    <td>1つのフィールドに複数の情報が混在している(例 氏名)</td>
                    <td>姓・名など単一の情報単位に分割する</td>
                  </tr>
                  <tr>
                    <td>多値フィールド</td>
                    <td>1つのフィールドに複数の値が入っている(例 電話番号1・2)</td>
                    <td>別テーブルへ切り出す</td>
                  </tr>
                  <tr>
                    <td>重複データ</td>
                    <td>同じ情報が複数のテーブルやレコードに存在する</td>
                    <td>主題ごとにテーブルを分離する</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="section prose" id="step8">
            <div className="section-eyebrow">
              <IconKey className="ti" size={16} />
              第8章
            </div>
            <h2>Step8: キー</h2>
            <p>各レコードを一意に識別する仕組みが「キー」です。第8章では、キーの分類と選定基準が扱われます。</p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_8} />
              </div>
              <div className="diagram-caption">候補キーからプライマリキー・代替キーへの分類</div>
            </div>
            <p>
              候補キーとは「レコードを一意に識別できるフィールド、またはフィールドの組み合わせ」のうち、条件を満たすすべての候補を指します。その中から実際にテーブルの識別子として採用するものがプライマリキーであり、選ばれなかった候補キーは代替キーとして、一意性を保証する補助的な制約に使われます。良いプライマリキーの条件(値が変化しない、意味を持ちすぎない、できるだけ単純であることなど)も具体的に解説されています。
            </p>
          </section>

          <section className="section prose" id="step9">
            <div className="section-eyebrow">
              <IconListDetails className="ti" size={16} />
              第9章
            </div>
            <h2>Step9: フィールド仕様</h2>
            <p>
              各フィールドが「どのようなデータを、どのような形式で保持するか」を定義するのがフィールド仕様です。
            </p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_9} />
              </div>
              <div className="diagram-caption">フィールド仕様を構成する3つの要素</div>
            </div>
            <p>
              フィールド仕様を丁寧に定義しておくことは、後の章で扱う「フィールドレベルの整合性」の土台になります。似た性質を持つフィールドをまとめて定義できる「汎用フィールド仕様」や、同じ仕様を複数のフィールドに複製する「複製フィールド仕様」といった、実務上の効率化テクニックも紹介されています。
            </p>
          </section>

          <section className="section prose" id="step10">
            <div className="section-eyebrow">
              <IconArrowsJoin className="ti" size={16} />
              第10章
            </div>
            <h2>Step10: テーブルリレーションシップ</h2>
            <p>
              Step3で概観した4種類のリレーションシップを、実際のテーブル設計に落とし込む章です。1対多や多対多といった関係をどのように外部キーで表現するか、また、多対多関係を解消するための「交差テーブル(中間テーブル)」の作り方が具体的に解説されます。
            </p>
            <p>
              もう一つの重要なテーマが、親レコードが削除されたときに子レコードをどう扱うかという「削除規則」です。
            </p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_10} />
              </div>
              <div className="diagram-caption">親レコード削除時の3つの削除規則</div>
            </div>
            <p>
              さらに、各テーブルがリレーションシップに「必ず参加するか、任意で参加するか(参加のタイプ)」、「最小・最大いくつのレコードと関連しうるか(参加の度合い)」を明確にすることで、後の整合性設計の精度が大きく高まる点が強調されています。
            </p>
          </section>

          <section className="section prose" id="step11">
            <div className="section-eyebrow">
              <IconGavel className="ti" size={16} />
              第11章
            </div>
            <h2>Step11: ビジネスルール</h2>
            <p>
              ビジネスルールとは、組織や業務固有の制約条件のことです。第11章では、これを大きく2つに分類しています。
            </p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_11} />
              </div>
              <div className="diagram-caption">フィールド固有のルールとリレーションシップ固有のルール</div>
            </div>
            <p>
              ビジネスルールの多くは、データベースそのものだけでなく、業務プロセスや運用にも関わってきます。そのため、利用者やマネジメントとの合意形成がとりわけ重要であることが繰り返し述べられています。あわせて、決められた値の集合の中からしか入力を許可しない「検証テーブル(validation table)」の活用法も紹介されます。
            </p>
          </section>

          <section className="section prose" id="step12">
            <div className="section-eyebrow">
              <IconEye className="ti" size={16} />
              第12章
            </div>
            <h2>Step12: ビュー</h2>
            <p>
              ビューとは、テーブルに格納された実データそのものではなく、特定の目的のために整形された「見え方」を定義したものです。
            </p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_12} />
              </div>
              <div className="diagram-caption">データビュー・集計ビュー・検証ビューの3種類</div>
            </div>
            <p>
              利用者がどのような形でデータを見たいかは、設計の初期段階(第5から6章のインタビュー)で集めた情報要件と密接に結びついています。第12章では、そうした要件をどのビュー種別に落とし込むべきかを判断する基準が示されます。
            </p>
          </section>

          <section className="section prose" id="step13">
            <div className="section-eyebrow">
              <IconChecklist className="ti" size={16} />
              第13章
            </div>
            <h2>Step13: データ整合性の最終レビュー</h2>
            <p>
              設計プロセスの最終フェーズは、これまで積み上げてきた整合性ルールをすべて見直す作業です。
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>レビュー対象</th>
                    <th>確認内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>テーブルレベルの整合性</td>
                    <td>プライマリキーの重複や欠落がないか</td>
                  </tr>
                  <tr>
                    <td>フィールドレベルの整合性</td>
                    <td>フィールド仕様に沿わない値が入りうる余地がないか</td>
                  </tr>
                  <tr>
                    <td>リレーションシップレベルの整合性</td>
                    <td>外部キーが正しく参照を保っているか、削除規則が適切か</td>
                  </tr>
                  <tr>
                    <td>ビジネスルール</td>
                    <td>業務要件との齟齬がないか</td>
                  </tr>
                  <tr>
                    <td>ビュー</td>
                    <td>利用者の要求を満たせているか</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              このレビューを経て、設計ドキュメント一式(テーブル一覧、フィールド仕様、リレーションシップ図など)を取りまとめれば、Part IIで示された設計プロセスは完了です。
            </p>
          </section>

          <section className="section prose" id="part3">
            <div className="section-eyebrow">
              <IconFlag className="ti" size={16} />
              Part III
            </div>
            <h2>Part III: その他の設計課題(第14章から第16章)</h2>
          </section>

          <section className="section prose" id="step14">
            <div className="section-eyebrow">
              <IconAlertTriangle className="ti" size={16} />
              第14章
            </div>
            <h2>Step14: 悪いデザイン - 避けるべきパターン</h2>
            <p>第14章は、これまでとは逆に「やってはいけない設計」を具体例とともに示す章です。</p>
            <div className="diagram-wrap">
              <div className="diagram-canvas">
                <MermaidDiagram chart={DIAG_13} />
              </div>
              <div className="diagram-caption">避けるべき3つの設計アプローチ</div>
            </div>
            <p>
              特にスプレッドシート的な発想(「1行1レコード、列を増やせば何でも表現できる」という思い込み)は、多値フィールドや重複データを生みやすく、Step7で扱った「理想的フィールド」「理想的テーブル」の基準に反する典型例として繰り返し警告されています。
            </p>
          </section>

          <section className="section prose" id="step15">
            <div className="section-eyebrow">
              <IconAdjustments className="ti" size={16} />
              第15章
            </div>
            <h2>Step15: ルールを曲げる・破るとき</h2>
            <p>
              第14章で「やってはいけない」とされた設計判断も、状況によっては意図的に選択される場合があります。第15章では、分析用データベース(OLAP的な用途)の設計や、処理性能向上を目的とした非正規化など、ルールを意図的に緩める正当な理由と、その際に必ず行うべき「なぜそうしたかの文書化」の重要性が扱われます。あくまで例外は例外として、根拠を明示したうえで選択すべきだという立場が一貫しています。
            </p>
          </section>

          <section className="section prose" id="step16">
            <div className="section-eyebrow">
              <IconFlag2 className="ti" size={16} />
              第16章
            </div>
            <h2>Step16: 結び</h2>
            <p>
              最終章は短い総括です。良いデータベース設計は特別な才能ではなく、一貫した手順と常識的な判断力があれば誰にでも実践できる、という本書全体を貫くメッセージが改めて述べられ、Part IVの付録(設計プロセスの図解、用語集、推奨読書リストなど)へと読者を導きます。
            </p>
          </section>

          <section className="section prose" id="normalization">
            <div className="section-eyebrow">
              <IconHierarchy2 className="ti" size={16} />
              付録G
            </div>
            <h2>正規化についての補足</h2>
            <p>
              前述の通り、本書は正規化理論を設計プロセスの中心に据えていません。付録Gでは、著者自身がその理由を説明しています。要点は次の2つに整理できます。
            </p>
            <ol>
              <li>
                正規化理論を正しく解説しようとすると、関数従属性のような形式的な概念の説明が不可欠になり、「Mere Mortals(普通の人)」向けという本書の趣旨から外れてしまう
              </li>
              <li>
                本書が提示する「理想的フィールド」「理想的テーブル」という基準に沿って設計を進めれば、正規化理論を意識しなくても、実務上おおむね同等の結果(多くの場合、第3正規形相当の構造)に到達できる
              </li>
            </ol>
            <p>
              正規化理論そのものを体系的に学びたい読者のために、一般的な正規形の考え方を簡単な表にまとめておきます(これは本書独自の説明ではなく、リレーショナルデータベース理論一般における標準的な整理です)。
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>正規形</th>
                    <th>主な目的</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>第1正規形(1NF)</td>
                    <td>繰り返しグループを排除し、各フィールドの値を単一の値にする</td>
                  </tr>
                  <tr>
                    <td>第2正規形(2NF)</td>
                    <td>複合キーの一部にのみ従属する項目を別テーブルへ分離する</td>
                  </tr>
                  <tr>
                    <td>第3正規形(3NF)</td>
                    <td>主キー以外の項目同士の従属関係(推移的従属)を排除する</td>
                  </tr>
                  <tr>
                    <td>ボイス-コッド正規形(BCNF)</td>
                    <td>3NFをさらに厳密化し、すべての決定項がスーパーキーになるようにする</td>
                  </tr>
                  <tr>
                    <td>第4・第5正規形</td>
                    <td>多値従属性や結合従属性に起因する冗長性を排除する</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              本書の「理想的フィールド」基準はおおむね1NFから2NFの目的に、「理想的テーブル」基準はおおむね2NFから3NFの目的に対応すると捉えると、両者のアプローチを橋渡しして理解しやすくなります。
            </p>
          </section>

          <section className="section prose" id="critical">
            <div className="section-eyebrow">
              <IconShieldCheck className="ti" size={16} />
              Reading Critically
            </div>
            <h2>批判的に読む - 本書の限界と読む際の注意点</h2>
            <p>
              世界的に評価の高い本書ですが、初学者が読む際には以下の点も踏まえておくと、より実務に活かしやすくなります。
            </p>
            <div className="callout">
              <IconHierarchy2 className="ti" size={22} />
              <div className="callout-body">
                <span className="callout-title">正規化理論への深入りは避けられている</span>
                <p>
                  前述の通り、本書は正規化理論を体系的には扱いません。学術的な裏付けまで理解したい場合は、C. J. Date の著作などを併読する必要があります。
                </p>
              </div>
            </div>
            <div className="callout plum">
              <IconSql className="ti" size={22} />
              <div className="callout-body">
                <span className="callout-title">SQLはスコープ外</span>
                <p>
                  本書はテーブル構造の「設計」に特化しており、SQLの書き方そのものは扱いません。実装段階に進む際は、姉妹書『SQL Queries for Mere Mortals』などを参照する必要があります。
                </p>
              </div>
            </div>
            <div className="callout gold">
              <IconMessage2 className="ti" size={22} />
              <div className="callout-body">
                <span className="callout-title">要件収集の手法がやや伝統的</span>
                <p>
                  インタビューを中心としたウォーターフォール色の強い要件収集プロセスが前提になっており、アジャイル開発のように要件が反復的に変化する現場では、プロセスの適用の仕方に一定の工夫が必要です(ただし第4版では、リモートワーク環境でのインタビューの進め方など、時代に合わせた更新が加えられています)。
                </p>
              </div>
            </div>
            <div className="callout forest">
              <IconDatabaseOff className="ti" size={22} />
              <div className="callout-body">
                <span className="callout-title">リレーショナルモデル以外は対象外</span>
                <p>
                  ドキュメント指向やキーバリュー型など、いわゆるNoSQL的なデータモデルは本書の対象外です。あくまでリレーショナルデータベース、特にOLTP(トランザクション処理)用途の設計を主眼としています。
                </p>
              </div>
            </div>
          </section>

          <section className="section" id="next-steps">
            <div className="section-eyebrow">
              <IconArrowBigRightLines className="ti" size={16} />
              Further Reading
            </div>
            <h2>次のステップ - あわせて読みたい資料</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>資料</th>
                    <th>位置づけ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>『SQL Queries for Mere Mortals』(John L. Viescas との共著)</td>
                    <td>本書で設計したテーブルに対して、実際にSQLでどう問い合わせるかを学ぶ姉妹書</td>
                  </tr>
                  <tr>
                    <td>C. J. Date『An Introduction to Database Systems』</td>
                    <td>正規化理論を含む、よりアカデミックなリレーショナルデータベース理論を学びたい場合の定番書。本書の付録Hでも推奨読書として挙げられている</td>
                  </tr>
                  <tr>
                    <td>E. F. Codd『The Relational Model for Database Management: Version 2』</td>
                    <td>リレーショナルモデルの提唱者自身による原典。付録Hの推奨読書リストの筆頭に挙げられている</td>
                  </tr>
                  <tr>
                    <td>relationaldbdesign.com の正規化解説ページ</td>
                    <td>1NF・2NF・3NFを具体例つきで学び直せるオンライン教材。本書の内容とあわせて参照すると理解が深まる</td>
                  </tr>
                  <tr>
                    <td>Martin Kleppmann『Designing Data-Intensive Applications』</td>
                    <td>設計を終えた後、分散システムやスケーラビリティの観点からデータベースをより深く理解したい読者向け</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="section" id="checklist">
            <div className="section-eyebrow">
              <IconSquareCheck className="ti" size={16} />
              Self Check
            </div>
            <h2>学習チェックリスト</h2>
            <DatabaseDesignChecklist />
          </section>

          <section className="section prose" id="summary">
            <div className="section-eyebrow">
              <IconNotes className="ti" size={16} />
              Summary
            </div>
            <h2>まとめ</h2>
            <p>
              『Database Design for Mere Mortals』は、正規化理論という「正攻法」とは異なる角度から、リレーショナルデータベース設計を平易に学べる稀有な一冊です。ミッションステートメントの策定から始まり、テーブル構造の確立、キーの選定、リレーションシップとビジネスルールの定義、ビューの設計、そして最終的な整合性レビューに至る一連のプロセスは、特定の製品やSQL方言に依存しないため、どのようなデータベース環境で働くエンジニアにとっても長く通用する基礎体力になります。一方で、正規化理論そのものやSQLの実装知識は本書の対象外であるため、実務ではぜひ他の資料と組み合わせて活用してください。
            </p>
          </section>

          <section className="section" id="references">
            <div className="section-eyebrow">
              <IconLink className="ti" size={16} />
              Sources
            </div>
            <h2>参考文献</h2>
            <div className="ref-list">
              <div className="ref-card">
                <div className="ref-num">01</div>
                <div className="ref-body">
                  <div className="ref-title">
                    Database Design for Mere Mortals: 25th Anniversary Edition, 4th Edition - Google Books
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://books.google.co.jp/books/about/Database_Design_for_Mere_Mortals.html?id=MVApxsrcHiAC&redir_esc=y"
                  >
                    https://books.google.co.jp/books/about/Database_Design_for_Mere_Mortals.html?id=MVApxsrcHiAC&redir_esc=y
                  </Ext>
                  <div className="ref-note">ユーザー指定の書籍情報ページ(Google Books)</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">02</div>
                <div className="ref-body">
                  <div className="ref-title">Database Design for Mere Mortals, 4th Edition | InformIT</div>
                  <Ext
                    className="ref-url"
                    href="https://www.informit.com/store/database-design-for-mere-mortals-9780136788096"
                  >
                    https://www.informit.com/store/database-design-for-mere-mortals-9780136788096
                  </Ext>
                  <div className="ref-note">出版元 Pearson/InformIT による公式な目次・概要ページ</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">03</div>
                <div className="ref-body">
                  <div className="ref-title">
                    Database Design for Mere Mortals: 25th Anniversary Edition, 4th Edition - O'Reilly
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://www.oreilly.com/library/view/database-design-for/9780136788133/"
                  >
                    https://www.oreilly.com/library/view/database-design-for/9780136788133/
                  </Ext>
                  <div className="ref-note">O'Reilly Online Learning 上の書誌情報</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">04</div>
                <div className="ref-body">
                  <div className="ref-title">Appendix G: On Normalization - O'Reilly</div>
                  <Ext
                    className="ref-url"
                    href="https://www.oreilly.com/library/view/database-design-for/9780136788133/appg.xhtml"
                  >
                    https://www.oreilly.com/library/view/database-design-for/9780136788133/appg.xhtml
                  </Ext>
                  <div className="ref-note">著者自身による、正規化理論を主軸にしなかった理由の解説(付録G)</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">05</div>
                <div className="ref-body">
                  <div className="ref-title">Appendix H: Recommended Reading(第3版) - O'Reilly</div>
                  <Ext
                    className="ref-url"
                    href="https://www.oreilly.com/library/view/database-design-for/9780133122282/app08.html"
                  >
                    https://www.oreilly.com/library/view/database-design-for/9780133122282/app08.html
                  </Ext>
                  <div className="ref-note">著者による推奨読書リスト(Codd、Dateなど)</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">06</div>
                <div className="ref-body">
                  <div className="ref-title">Chapter 2: Design Objectives(第3版) - O'Reilly</div>
                  <Ext
                    className="ref-url"
                    href="https://www.oreilly.com/library/view/database-design-for/9780133122282/ch02.html"
                  >
                    https://www.oreilly.com/library/view/database-design-for/9780133122282/ch02.html
                  </Ext>
                  <div className="ref-note">設計目標と設計手法を扱う第2章のプレビュー</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">07</div>
                <div className="ref-body">
                  <div className="ref-title">Database Design for Mere Mortals - Goodreads</div>
                  <Ext
                    className="ref-url"
                    href="https://www.goodreads.com/book/show/150062.Database_Design_for_Mere_Mortals"
                  >
                    https://www.goodreads.com/book/show/150062.Database_Design_for_Mere_Mortals
                  </Ext>
                  <div className="ref-note">読者レビュー集。実務者からの評価コメントが多数</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">08</div>
                <div className="ref-body">
                  <div className="ref-title">Database Design for Mere Mortals - Editions - Goodreads</div>
                  <Ext
                    className="ref-url"
                    href="https://www.goodreads.com/work/editions/144832-database-design-for-mere-mortals-a-hands-on-guide-to-relational-databas?page=1"
                  >
                    https://www.goodreads.com/work/editions/144832-database-design-for-mere-mortals-a-hands-on-guide-to-relational-databas?page=1
                  </Ext>
                  <div className="ref-note">初版(1996年)から第4版までの版歴一覧</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">09</div>
                <div className="ref-body">
                  <div className="ref-title">
                    Hacker News: "This is the book I recommend to everyone who is shy about DBs"
                  </div>
                  <Ext className="ref-url" href="https://news.ycombinator.com/item?id=18807653">
                    https://news.ycombinator.com/item?id=18807653
                  </Ext>
                  <div className="ref-note">国際的な開発者コミュニティ Hacker News での推薦コメント</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">10</div>
                <div className="ref-body">
                  <div className="ref-title">Hacker News: "Buy the book Database Design for Mere Mortals"</div>
                  <Ext className="ref-url" href="https://news.ycombinator.com/item?id=40193125">
                    https://news.ycombinator.com/item?id=40193125
                  </Ext>
                  <div className="ref-note">SQL初学者への定番推薦としての言及</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">11</div>
                <div className="ref-body">
                  <div className="ref-title">Hacker News: "Huge +1 to Database Design for Mere Mortals"</div>
                  <Ext className="ref-url" href="https://news.ycombinator.com/item?id=28748545">
                    https://news.ycombinator.com/item?id=28748545
                  </Ext>
                  <div className="ref-note">経験者による詳細なレビューコメント(C. J. Dateの著作との比較にも言及)</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">12</div>
                <div className="ref-body">
                  <div className="ref-title">
                    Database Design for Mere Mortals: 25th Anniversary Edition - 目次・サンプルページ(Pearson 公式 PDF)
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://ptgmedia.pearsoncmg.com/images/9780136788041/samplepages/9780136788041_Sample.pdf"
                  >
                    https://ptgmedia.pearsoncmg.com/images/9780136788041/samplepages/9780136788041_Sample.pdf
                  </Ext>
                  <div className="ref-note">出版元 Pearson 公開の第4版目次(付録 A〜G の一覧を含む)</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">13</div>
                <div className="ref-body">
                  <div className="ref-title">
                    Database Design for Mere Mortals: 25th Anniversary Edition, 4th edition - Pearson+
                  </div>
                  <Ext className="ref-url" href="https://www.pearson.com/en-us/pearsonplus/p/9780137459667">
                    https://www.pearson.com/en-us/pearsonplus/p/9780137459667
                  </Ext>
                  <div className="ref-note">出版元 Pearson の公式販売ページ</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">14</div>
                <div className="ref-body">
                  <div className="ref-title">Database Design for Mere Mortals - Amazon.com(第3版)</div>
                  <Ext className="ref-url" href="https://www.amazon.com/Database-Design-Mere-Mortals-Hands/dp/0321884493">
                    https://www.amazon.com/Database-Design-Mere-Mortals-Hands/dp/0321884493
                  </Ext>
                  <div className="ref-note">
                    著者略歴(Microsoft Visual Studio グループでのプログラムマネージャー経験など)を掲載
                  </div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">15</div>
                <div className="ref-body">
                  <div className="ref-title">
                    Normalization in Database Design: 1NF, 2NF, 3NF Explained with Examples - relationaldbdesign.com
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://www.relationaldbdesign.com/database-analysis/module3/intro-normal-forms.php"
                  >
                    https://www.relationaldbdesign.com/database-analysis/module3/intro-normal-forms.php
                  </Ext>
                  <div className="ref-note">本書と併読できる正規化理論の補足教材</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">16</div>
                <div className="ref-body">
                  <div className="ref-title">Database Design for Mere Mortals - Summary excerpt(flylib.com)</div>
                  <Ext
                    className="ref-url"
                    href="https://web.archive.org/web/20171121234330/http://flylib.com/books/en/1.199.1.38/1/"
                  >
                    https://web.archive.org/web/20171121234330/http://flylib.com/books/en/1.199.1.38/1/
                  </Ext>
                  <div className="ref-note">著者が正規形の形式的定義をあえて採用しなかった理由に関する抜粋</div>
                </div>
              </div>

              <div className="ref-card">
                <div className="ref-num">17</div>
                <div className="ref-body">
                  <div className="ref-title">
                    Summit '97: Normalization Is a Nice Theory - David Adams & Dan Beckett
                  </div>
                  <Ext
                    className="ref-url"
                    href="https://web.archive.org/web/20240415161702/http://island-data.com/downloads/papers/normalization.pdf"
                  >
                    https://web.archive.org/web/20240415161702/http://island-data.com/downloads/papers/normalization.pdf
                  </Ext>
                  <div className="ref-note">
                    本書の第3正規形の説明が実務コミュニティでどのように参照されてきたかを示す資料
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <p>
              本ガイドは公開情報をもとに作成した解説資料です。原著の正確な内容については、出版元またはO'Reilly Online Learning等の一次情報を参照してください。
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
