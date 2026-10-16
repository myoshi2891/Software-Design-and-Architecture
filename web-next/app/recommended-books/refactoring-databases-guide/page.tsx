import {
  IconAlertTriangle,
  IconArrowsShuffle,
  IconBook,
  IconBook2,
  IconBuildingArch,
  IconBuildingStore,
  IconBulb,
  IconCalendar,
  IconCategory,
  IconChartDots3,
  IconCheck,
  IconCheckbox,
  IconClock,
  IconCode,
  IconDatabase,
  IconDatabaseOff,
  IconExternalLink,
  IconFlag,
  IconFlask,
  IconFlask2,
  IconGitBranch,
  IconInfoCircle,
  IconLanguage,
  IconLanguageHiragana,
  IconLayoutGrid,
  IconLink,
  IconListCheck,
  IconListDetails,
  IconNews,
  IconPuzzle,
  IconQuote,
  IconRefresh,
  IconRocket,
  IconRoute,
  IconScale,
  IconServer,
  IconShieldCheck,
  IconStar,
  IconTable,
  IconUserStar,
  IconUsers,
  IconVectorTriangle,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import RefactoringDatabasesChecklist from "./RefactoringDatabasesChecklist";
import RefactoringDatabasesSidebar from "./RefactoringDatabasesSidebar";

export const metadata: Metadata = {
  title: "Refactoring Databases: Evolutionary Database Design 初学者向け完全ガイド",
  description:
    "Scott W. Ambler と Pramod J. Sadalage の著書『Refactoring Databases: Evolutionary Database Design』を初学者向けにステップバイステップで解説するガイド。",
};

const MERMAID_INIT = `%%{init: {"theme": "base", "themeVariables": { "fontFamily": "Noto Sans JP, sans-serif", "fontSize": "16px", "primaryColor": "#ffffff", "primaryTextColor": "#2b2620", "primaryBorderColor": "#d7cbac", "lineColor": "#9a8f78", "secondaryColor": "#f2ecdd", "tertiaryColor": "#f8f4ea", "clusterBkg": "#f2ecdd", "clusterBorder": "#d7cbac", "edgeLabelBackground": "#f8f4ea" }}}%%`;

const CLASS_DEFS = `
classDef hub fill:#eef0f9,stroke:#3b4d8a,color:#2b2620,stroke-width:2px;
classDef done fill:#e8f3ec,stroke:#2f6b4f,color:#2b2620,stroke-width:2px;
classDef box fill:#faf3df,stroke:#b8860b,color:#2b2620,stroke-width:2px;`;

function makeChart(body: string, applyClasses = ""): string {
  return `${MERMAID_INIT}\n${body}\n${CLASS_DEFS}${applyClasses ? `\n${applyClasses}` : ""}`;
}

const chartD0 = makeChart(
  `flowchart TD
    P["読者タイプ別　おすすめの読み方"] --> A["初めてアジャイル開発に触れるアプリ開発者　第1〜3章と第6章"]
    P --> B["既存システムを保守するDBA・データエンジニア　第2〜4章と第7〜9章"]
    P --> C["移行基盤を設計するアーキテクト・テックリード　第4〜5章と第9章"]
    P --> D["CI/CDやマイグレーションツールを扱うエンジニア　第3章と付録"]
    class P hub;`
);

const chartD1 = makeChart(
  `flowchart LR
    A["要求は開発の初期段階では　まだ全て確定していない"] --> B["アプリケーションコードは　反復的に進化していく"]
    B --> C{"データベース設計は　どう扱うべきか"}
    C -->|"従来型　最初に固定する"| D["仕様変更のたびに　大規模な移行作業が発生"]
    C -->|"進化的アプローチ"| E["小さなリファクタリングを　積み重ねて安全に進化させる"]
    D --> F["俊敏性が失われる"]
    E --> G["アジャイル開発と　歩調を合わせられる"]
    class E,G done;
    class D box;`
);

const chartD2 = makeChart(
  `flowchart TD
    T["Refactoring Databases　全11章 + 付録"] --> P1["基礎編　第1〜5章　進化的開発の考え方とプロセス"]
    P1 --> P2["カタログ編　第6〜11章　70以上のリファクタリング集"]
    P2 --> P3["付録・用語集・参考文献"]
    class T hub;
    class P3 done;`
);

const chartD3 = makeChart(
  `flowchart TD
    R["データベースリファクタリング　意味論を変えない小さな変更"] --> S["スキーマの変更　テーブル・カラム・制約など"]
    R --> M["データの移行　既存データを新しい形に変換"]
    R --> C["アクセスコードの変更　アプリ・ビュー・ストアドプロシージャ"]
    S --> Done["3つ全てが揃って　初めて1つのリファクタリングが完了する"]
    M --> Done
    C --> Done
    class R hub;
    class Done done;`
);

const chartD4 = makeChart(
  `flowchart LR
    A["マルチパーパスカラム　1つの列に複数の意味"] --> Z["データベースの臭い"]
    B["マルチパーパステーブル　1つの表に複数の実体"] --> Z
    C["冗長データ　同じ値が複数箇所に重複"] --> Z
    D["カラムが多すぎる表　凝集度の低さの兆候"] --> Z
    E["行が多すぎる表　パフォーマンス問題の兆候"] --> Z
    F["スマートカラム　位置ごとに意味が変わる列"] --> Z
    G["変更への恐怖　誰も触りたがらないテーブル"] --> Z
    Z --> H["リファクタリングを検討するサイン"]
    class Z hub;
    class H done;`
);

const chartD5 = makeChart(
  `flowchart LR
    A["変更が本当に　必要か検証する"] --> B["最も適切な　リファクタリングを選ぶ"]
    B --> C["既存の要素を　非推奨化する"]
    C --> D["テストで　影響範囲を確認する"]
    D --> E["スキーマ変更・データ移行・　アクセスコード変更を実施"]
    E --> F["回帰テストを実行する"]
    F --> G["バージョン管理に　コミットする"]
    G --> H["変更をチームに周知する"]
    class A hub;
    class H done;`
);

const chartD6 = makeChart(
  `flowchart LR
    A["Expand　拡張　新しい構造を追加し旧構造はそのまま残す"] --> B["Migrate　移行期間　新旧両方を同時にサポートする"]
    B --> C["Contract　収縮　旧構造を撤去し新構造だけにする"]
    class A hub;
    class C done;`
);

const chartD7 = makeChart(
  `flowchart TD
    Q{"データベースを使うアプリケーションは　いくつあるか"}
    Q -->|"単一アプリケーション"| S["変更の影響範囲を自分たちで完全に把握できる　比較的シンプルに進められる"]
    Q -->|"複数アプリケーション　共有データベース"| M["他チームへの通知・移行期間の確保・　ビューやトリガーでの後方互換性維持が必須になる"]
    class Q hub;
    class S done;
    class M box;`
);

const chartD8 = makeChart(
  `flowchart LR
    Cat["リファクタリングカタログ全体"] --> A["構造　Structural"]
    Cat --> B["データ品質　Data Quality"]
    Cat --> C["参照整合性　Referential Integrity"]
    Cat --> D["アーキテクチャ　Architectural"]
    Cat --> E["メソッド　Method"]
    Cat --> F["変換　Transformations　意味論を変える非リファクタリング"]
    class Cat hub;
    class F box;`
);

const chartD9 = makeChart(
  `flowchart TD
    Q{"論理的に削除された行を　どう扱うか"}
    Q -->|"Introduce Soft Delete"| A["削除フラグ列を追加し　物理的な行は残したまま論理的に非表示にする"]
    Q -->|"Introduce Hard Delete"| B["削除フラグ列をやめて　行そのものを物理的に削除する"]
    A --> C["監査や復旧が必要な業務でよく使われる"]
    B --> D["不要データを増やさず　シンプルさを保ちたい場合に使われる"]
    class Q hub;
    class C,D done;`
);

const chartD10 = makeChart(
  `flowchart LR
    A["変更前　product_inventory_code列に場所・ロット・シリアルが連結されて格納"] --> B["1 新しい3つの列を追加　location_code・batch_number・serial_number"]
    B --> C["2 新旧を双方向に同期するトリガーを有効化する"]
    C --> C2["3 SUBSTRで既存データを分割して新しい列にバックフィルし検証する"]
    C2 --> D["4 アプリケーションコードを新しい列を使うように変更"]
    D --> E["5 インデックスを新しい列に張り直す"]
    E --> F["6 移行期間を経てから別のContractスクリプトで同期トリガーと旧product_inventory_code列を削除する"]
    class A box;
    class F done;`
);

const chartD11 = makeChart(
  `flowchart LR
    A["1 テーブル名を変更　customerからclientへ"] --> B["2 旧名customerで参照できるビューを作成"]
    B --> C["3 移行期間中は新旧どちらの名前からもアクセス可能にする"]
    C --> D["4 全ての利用アプリがclientへ移行したことを確認"]
    D --> E["5 移行期間終了後customerビューを削除"]
    class A hub;
    class E done;`
);

const chartD12 = makeChart(
  `flowchart LR
    A["開発者がマイグレーションスクリプトを書く"] --> B["バージョン管理へコミットする"]
    B --> C["CIサーバーが検知して自動実行"]
    C --> D["FlywayやLiquibaseなどのツールがスキーマ差分を適用"]
    D --> E["自動テストでアプリとDBの整合性を検証"]
    E --> F["デプロイパイプラインを通じて本番まで反映"]
    class A hub;
    class F done;`
);

const CODE_STEP6 = `<span class="cm">-- customerテーブルをclientへリネームする</span>
<span class="kw">ALTER TABLE</span> customer <span class="kw">RENAME TO</span> client;

<span class="cm">-- 移行期間中、旧名customerでアクセスするコードのために</span>
<span class="cm">-- ビューを用意しておく</span>
<span class="cm">-- 注：この例は旧customerが持っていた全列を公開しているわけではない。</span>
<span class="cm">--     旧コードが参照する列は必ずSELECT句に含めること。</span>
<span class="cm">--     また、下記のような単一テーブルからの単純な列射影は、多くのDBMSで</span>
<span class="cm">--     「更新可能ビュー」の条件(単一テーブル由来、集約・DISTINCT・GROUP BYを</span>
<span class="cm">--     含まない等)を満たすため、明示しなければINSERT/UPDATE/DELETEが</span>
<span class="cm">--     そのままclientへ通ってしまう。意図に応じて次のいずれかを選ぶこと。</span>
<span class="cm">--     (a) 読み取り専用にしたい場合：旧コードのロールにSELECTのみをGRANTする、</span>
<span class="cm">--         または対象DBMSでDMLを拒否する定義(Oracleなら WITH READ ONLY、</span>
<span class="cm">--         PostgreSQLなら書き込みを拒否するINSTEAD OFトリガー)を付与する。</span>
<span class="cm">--     (b) 書き込み互換を残したい場合：対象DBMSの更新可能ビュー規則を確認し、</span>
<span class="cm">--         条件を満たさない形(複数テーブルの結合、列の変換を伴う等)であれば</span>
<span class="cm">--         INSTEAD OFトリガーでclient側への書き込みを代行する実装を追加する。</span>
<span class="kw">CREATE VIEW</span> customer <span class="kw">AS</span>
<span class="kw">SELECT</span> id, first_name, last_name <span class="kw">FROM</span> client
<span class="kw">WITH READ ONLY</span>;  <span class="cm">-- (a) を選ぶ場合。(b) なら削除する</span>`;

const CODE_STEP15 = `<span class="cm">-- === Expandフェーズ: 新しい構造を追加する ===</span>
<span class="cm">-- 失敗した時点でスクリプトを止める。最初のDDLより前に宣言しないと、</span>
<span class="cm">-- 列追加やトリガー作成の失敗を見逃したままバックフィルへ進んでしまう。</span>
<span class="kw">WHENEVER SQLERROR EXIT FAILURE ROLLBACK</span>

<span class="kw">ALTER TABLE</span> inventory <span class="kw">ADD</span> location_code <span class="fn">VARCHAR2</span>(<span class="nu">6</span>) <span class="kw">NULL</span>;
<span class="kw">ALTER TABLE</span> inventory <span class="kw">ADD</span> batch_number <span class="fn">VARCHAR2</span>(<span class="nu">6</span>) <span class="kw">NULL</span>;
<span class="kw">ALTER TABLE</span> inventory <span class="kw">ADD</span> serial_number <span class="fn">VARCHAR2</span>(<span class="nu">10</span>) <span class="kw">NULL</span>;

<span class="cm">-- 移行期間中は旧アプリが product_inventory_code を、</span>
<span class="cm">-- 新アプリが3列を更新しうる。どちらから書かれても両表現が一致するよう、</span>
<span class="cm">-- バックフィルより先に双方向同期トリガーを有効化する。</span>
<span class="kw">CREATE OR REPLACE TRIGGER</span> trg_inventory_code_sync
<span class="kw">BEFORE INSERT OR UPDATE ON</span> inventory
<span class="kw">FOR EACH ROW</span>
<span class="kw">DECLARE</span>
  <span class="cm">-- 旧列側・新列側のどちらが書かれたかを判定する。:NEW.&lt;列&gt; は更新対象外の</span>
  <span class="cm">-- 列でも現在の行値が入るため、値の有無ではなく「書かれたか」で分岐しないと、</span>
  <span class="cm">-- 無関係な UPDATE（数量の更新など）で同期処理が誤って走ってしまう。</span>
  <span class="cm">-- INSERT では UPDATING が使えないので、値が入っているかで判断する。</span>
  <span class="cm">-- このため INSERT では「列の省略」と「明示的な NULL 指定」を区別できず、</span>
  <span class="cm">-- 新3列がすべて NULL なら「書かれていない」とみなす。旧列に値を入れつつ</span>
  <span class="cm">-- 新3列に明示的に NULL を指定する INSERT は契約上禁止とする（旧列の分解値で</span>
  <span class="cm">-- 3列が埋められる）。INSERT で両表現を同時に指定する場合は、新3列にも</span>
  <span class="cm">-- 旧列と一致する値を指定すること。</span>
  old_written <span class="fn">BOOLEAN</span>;
  new_written <span class="fn">BOOLEAN</span>;
  composed    inventory.product_inventory_code<span class="kw">%TYPE</span>;
<span class="kw">BEGIN</span>
  old_written := <span class="fn">UPDATING</span>(<span class="st">'product_inventory_code'</span>)
                 <span class="kw">OR</span> (<span class="fn">INSERTING</span> <span class="kw">AND</span> :NEW.product_inventory_code <span class="kw">IS NOT NULL</span>);
  new_written := <span class="fn">UPDATING</span>(<span class="st">'location_code'</span>)
                 <span class="kw">OR</span> <span class="fn">UPDATING</span>(<span class="st">'batch_number'</span>)
                 <span class="kw">OR</span> <span class="fn">UPDATING</span>(<span class="st">'serial_number'</span>)
                 <span class="kw">OR</span> (<span class="fn">INSERTING</span> <span class="kw">AND</span> (:NEW.location_code <span class="kw">IS NOT NULL</span>
                                    <span class="kw">OR</span> :NEW.batch_number <span class="kw">IS NOT NULL</span>
                                    <span class="kw">OR</span> :NEW.serial_number <span class="kw">IS NOT NULL</span>));

  <span class="kw">IF</span> old_written <span class="kw">AND</span> new_written <span class="kw">THEN</span>
    <span class="cm">-- 旧列と新3列が同時に書かれた場合。どちらかを黙って上書きすると</span>
    <span class="cm">-- 書き手の意図した値が失われるため、一致しているかを検査して拒否する。</span>
    <span class="cm">-- まず単独で書かれた場合と同じ入力検証を適用する。不正な長さや部分的な</span>
    <span class="cm">-- NULL を「一致しない」エラーとして報告すると、原因が分かりにくくなる。</span>
    <span class="kw">IF</span> :NEW.product_inventory_code <span class="kw">IS NOT NULL</span>
       <span class="kw">AND</span> <span class="fn">LENGTH</span>(:NEW.product_inventory_code) &lt;&gt; <span class="nu">22</span> <span class="kw">THEN</span>
      <span class="fn">RAISE_APPLICATION_ERROR</span>(-<span class="nu">20005</span>,
        <span class="st">'product_inventory_code は22文字（場所6+ロット6+シリアル10）である必要があります'</span>);
    <span class="kw">END IF</span>;
    <span class="kw">IF</span> (:NEW.location_code <span class="kw">IS NULL</span>
        <span class="kw">OR</span> :NEW.batch_number <span class="kw">IS NULL</span>
        <span class="kw">OR</span> :NEW.serial_number <span class="kw">IS NULL</span>)
       <span class="kw">AND NOT</span> (:NEW.location_code <span class="kw">IS NULL</span>
                <span class="kw">AND</span> :NEW.batch_number <span class="kw">IS NULL</span>
                <span class="kw">AND</span> :NEW.serial_number <span class="kw">IS NULL</span>) <span class="kw">THEN</span>
      <span class="fn">RAISE_APPLICATION_ERROR</span>(-<span class="nu">20001</span>,
        <span class="st">'location_code / batch_number / serial_number は3列すべてに値を指定するか、3列すべてを NULL にしてください'</span>);
    <span class="kw">END IF</span>;
    composed := <span class="fn">RPAD</span>(:NEW.location_code, <span class="nu">6</span>)
             || <span class="fn">RPAD</span>(:NEW.batch_number, <span class="nu">6</span>)
             || <span class="fn">RPAD</span>(:NEW.serial_number, <span class="nu">10</span>);
    <span class="cm">-- NULL 同士は等しいとみなす。片側だけ NULL のケースを個別に書くことで、</span>
    <span class="cm">-- 比較結果が NULL になって IF が素通りするのを避ける。</span>
    <span class="kw">IF</span> (composed <span class="kw">IS NULL AND</span> :NEW.product_inventory_code <span class="kw">IS NOT NULL</span>)
       <span class="kw">OR</span> (composed <span class="kw">IS NOT NULL AND</span> :NEW.product_inventory_code <span class="kw">IS NULL</span>)
       <span class="kw">OR</span> (composed <span class="kw">IS NOT NULL AND</span> composed &lt;&gt; :NEW.product_inventory_code) <span class="kw">THEN</span>
      <span class="fn">RAISE_APPLICATION_ERROR</span>(-<span class="nu">20003</span>,
        <span class="st">'product_inventory_code と location_code / batch_number / serial_number が同時に指定され、内容が一致しません。どちらか一方だけを更新してください'</span>);
    <span class="kw">END IF</span>;
  <span class="kw">ELSIF</span> old_written <span class="kw">THEN</span>
    <span class="cm">-- 旧アプリが連結文字列を書いた場合 → 新しい3列へ分解して反映</span>
    <span class="cm">-- NULL は「値なし」として3列そろって NULL に落とす</span>
    <span class="cm">-- 22文字（場所6+ロット6+シリアル10）でない値を SUBSTR にかけると、</span>
    <span class="cm">-- 短すぎれば NULL や切り詰めた値が、長すぎれば末尾が捨てられた値が</span>
    <span class="cm">-- 黙って入るため、分解の前に長さを検証して拒否する。</span>
    <span class="kw">IF</span> :NEW.product_inventory_code <span class="kw">IS NOT NULL</span>
       <span class="kw">AND</span> <span class="fn">LENGTH</span>(:NEW.product_inventory_code) &lt;&gt; <span class="nu">22</span> <span class="kw">THEN</span>
      <span class="fn">RAISE_APPLICATION_ERROR</span>(-<span class="nu">20005</span>,
        <span class="st">'product_inventory_code は22文字（場所6+ロット6+シリアル10）である必要があります'</span>);
    <span class="kw">END IF</span>;
    :NEW.location_code := <span class="fn">SUBSTR</span>(:NEW.product_inventory_code, <span class="nu">1</span>, <span class="nu">6</span>);
    :NEW.batch_number  := <span class="fn">SUBSTR</span>(:NEW.product_inventory_code, <span class="nu">7</span>, <span class="nu">6</span>);
    :NEW.serial_number := <span class="fn">SUBSTR</span>(:NEW.product_inventory_code, <span class="nu">13</span>, <span class="nu">10</span>);
  <span class="kw">ELSIF</span> new_written <span class="kw">THEN</span>
    <span class="kw">IF</span> :NEW.location_code <span class="kw">IS NULL</span>
       <span class="kw">AND</span> :NEW.batch_number <span class="kw">IS NULL</span>
       <span class="kw">AND</span> :NEW.serial_number <span class="kw">IS NULL</span> <span class="kw">THEN</span>
      <span class="cm">-- 新アプリが3列すべてを NULL にした場合 → 旧列も NULL にそろえる</span>
      :NEW.product_inventory_code := <span class="kw">NULL</span>;
    <span class="kw">ELSIF</span> :NEW.location_code <span class="kw">IS NULL</span>
          <span class="kw">OR</span> :NEW.batch_number <span class="kw">IS NULL</span>
          <span class="kw">OR</span> :NEW.serial_number <span class="kw">IS NULL</span> <span class="kw">THEN</span>
      <span class="cm">-- 部分的な書き込みは旧列との乖離を生むため、黙って放置せず拒否する</span>
      <span class="fn">RAISE_APPLICATION_ERROR</span>(-<span class="nu">20001</span>,
        <span class="st">'location_code / batch_number / serial_number は3列すべてに値を指定するか、3列すべてを NULL にしてください'</span>);
    <span class="kw">ELSE</span>
      <span class="cm">-- 新アプリが3列すべてを書いた場合 → 旧列へ連結して反映</span>
      :NEW.product_inventory_code := <span class="fn">RPAD</span>(:NEW.location_code, <span class="nu">6</span>)
                                  || <span class="fn">RPAD</span>(:NEW.batch_number, <span class="nu">6</span>)
                                  || <span class="fn">RPAD</span>(:NEW.serial_number, <span class="nu">10</span>);
    <span class="kw">END IF</span>;
  <span class="kw">END IF</span>;
<span class="kw">END</span>;
/

<span class="cm">-- CREATE OR REPLACE TRIGGER は本体のコンパイルに失敗してもコマンド自体は成功し、</span>
<span class="cm">-- INVALID なトリガーが残る（WHENEVER SQLERROR では捕まらない）。同期が効かないまま</span>
<span class="cm">-- バックフィルへ進まないよう、ここで明示的にコンパイルエラーを検査する。</span>
<span class="kw">DECLARE</span>
  error_count <span class="fn">PLS_INTEGER</span>;
<span class="kw">BEGIN</span>
  <span class="kw">SELECT COUNT</span>(*)
    <span class="kw">INTO</span> error_count
    <span class="kw">FROM</span> user_errors
   <span class="kw">WHERE</span> name = <span class="st">'TRG_INVENTORY_CODE_SYNC'</span>
     <span class="kw">AND</span> type = <span class="st">'TRIGGER'</span>
     <span class="kw">AND</span> attribute = <span class="st">'ERROR'</span>;  <span class="cm">-- 警告（WARNING）は失敗扱いにしない</span>

  <span class="kw">IF</span> error_count &gt; <span class="nu">0</span> <span class="kw">THEN</span>
    <span class="fn">RAISE_APPLICATION_ERROR</span>(-<span class="nu">20004</span>,
      <span class="st">'同期トリガー trg_inventory_code_sync のコンパイルに失敗しました。移行を中止します'</span>);
  <span class="kw">END IF</span>;
<span class="kw">END</span>;
/

<span class="cm">-- === Migrateフェーズ: 同期が有効な状態で既存データをバックフィルする ===</span>
<span class="cm">-- 3列を直接 SET すると新列→旧列の同期分岐が走り、検証の基準にしたい</span>
<span class="cm">-- product_inventory_code をトリガーが再連結値で上書きしてしまう（変換誤りを検出できなくなる）。</span>
<span class="cm">-- 旧列を自身の値で更新し、旧列→新列の分岐に分解処理を行わせる。</span>
<span class="kw">UPDATE</span> inventory
   <span class="kw">SET</span> product_inventory_code = product_inventory_code
 <span class="kw">WHERE</span> product_inventory_code <span class="kw">IS NOT NULL</span>;

<span class="cm">-- 検証: 分解した3列を再連結すると旧列と一致することを確認する（0件が期待値）</span>
<span class="cm">-- &lt;&gt; は片方が NULL だと NULL を返し WHERE に弾かれて不一致を見逃すため、</span>
<span class="cm">-- NULL 同士を等しいとみなす DECODE で NULL 安全に比較する。</span>
<span class="cm">-- 件数を表示するだけでは誰も見落としに気づけないため、0件でなければ</span>
<span class="cm">-- エラーを送出してスクリプトを止める（中止は冒頭の WHENEVER SQLERROR に従う）。</span>
<span class="kw">DECLARE</span>
  mismatch_count <span class="fn">PLS_INTEGER</span>;
<span class="kw">BEGIN</span>
  <span class="kw">SELECT COUNT</span>(*)
    <span class="kw">INTO</span> mismatch_count
    <span class="kw">FROM</span> inventory
   <span class="kw">WHERE</span> <span class="fn">DECODE</span>(product_inventory_code,
                <span class="fn">RPAD</span>(location_code,<span class="nu">6</span>) || <span class="fn">RPAD</span>(batch_number,<span class="nu">6</span>) || <span class="fn">RPAD</span>(serial_number,<span class="nu">10</span>),
                <span class="nu">0</span>, <span class="nu">1</span>) = <span class="nu">1</span>;

  <span class="kw">IF</span> mismatch_count &gt; <span class="nu">0</span> <span class="kw">THEN</span>
    <span class="fn">RAISE_APPLICATION_ERROR</span>(-<span class="nu">20002</span>,
      <span class="st">'分割結果が旧列と一致しない行が '</span> || mismatch_count || <span class="st">' 件あります。移行を中止します'</span>);
  <span class="kw">END IF</span>;
<span class="kw">END</span>;
/

<span class="cm">-- 新しい一意制約を先に作ってから旧インデックスを落とす。</span>
<span class="cm">-- 逆順にすると、その間だけ一意性が誰にも強制されない窓ができる。</span>
<span class="kw">CREATE UNIQUE INDEX</span> uidx_inventory_identifier
  <span class="kw">ON</span> inventory (location_code, batch_number, serial_number);

<span class="kw">DROP INDEX</span> uidx_inventory_code;`;

const CODE_STEP16 = `<span class="cm">-- ステップ1〜2：テーブル名を変更し、旧名のビューを用意する</span>
<span class="kw">ALTER TABLE</span> customer <span class="kw">RENAME TO</span> client;

<span class="kw">CREATE VIEW</span> customer <span class="kw">AS</span>
<span class="kw">SELECT</span> id, first_name, last_name <span class="kw">FROM</span> client;`;

export default function RefactoringDatabasesGuidePage() {
  return (
    <div className="refactoring-databases-guide">
      <RefactoringDatabasesSidebar />

      <main className="main">
        {/* Hero Section */}
        <section className="hero" id="intro">
          <span className="eyebrow">Beginner&apos;s Step-by-Step Guide</span>
          <h1>
            『Refactoring Databases: Evolutionary Database Design』
            <br />
            初学者向け完全ガイド
          </h1>
          <p className="lead">
            原著：Scott W. Ambler, Pramod J. Sadalage『Refactoring Databases: Evolutionary Database
            Design』(Addison-Wesley Professional,
            2006)。本ガイドはウェブ検索で得られた一次情報・著者自身が公開している資料・国際的に著名な開発者の記事をもとに、2026年9月19日時点の情報を反映して作成しています。
          </p>
          <div className="badges">
            <span className="badge">
              <IconVectorTriangle size={16} />
              ASCIIアート不使用
            </span>
            <span className="badge">
              <IconChartDots3 size={16} />
              図解はすべてMermaid
            </span>
            <span className="badge">
              <IconTable size={16} />
              一覧はすべてMarkdown表
            </span>
            <span className="badge">
              <IconLanguage size={16} />
              日本語版情報つき
            </span>
          </div>

          <div className="callout">
            <IconInfoCircle size={20} />
            <div className="callout-body">
              <span className="callout-title">この記事について</span>
              <p>
                「データベースの設計は最初に一度だけ固めるもの」——多くのエンジニアが暗黙のうちにそう信じています。しかしアジャイル開発が当たり前になった現在、アプリケーションコードだけでなくデータベースのスキーマも反復的に進化させる必要があります。その方法論を初めて体系立てて示したのが、本ガイドで扱う『Refactoring
                Databases』です。
              </p>
              <p>
                本書は2006年の出版ながら、著者の一人 Pramod Sadalage が Martin Fowler
                と共著した記事「Evolutionary Database
                Design」(martinfowler.com、2016年に全面改訂)や、現在の Flyway・Liquibase
                といったマイグレーションツール、さらには「Expand/Contract(拡張・収縮)パターン」と呼ばれる今日のゼロダウンタイムデプロイ手法の直接の源流になっています。
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Book Info */}
        <section className="section" id="book-info">
          <h2>
            <IconBook size={24} />
            書籍基本情報
          </h2>
          <div className="book-card">
            <div className="book-cover">
              <div className="book-cover-text">
                Refactoring
                <br />
                Databases
                <br />
                <span style={{ fontWeight: 400 }}>Ambler &amp; Sadalage</span>
              </div>
            </div>
            <div className="book-card-body">
              <div className="table-wrap">
                <table className="kv-table">
                  <tbody>
                    <tr>
                      <th>原題</th>
                      <td>
                        <em>Refactoring Databases: Evolutionary Database Design</em>
                      </td>
                    </tr>
                    <tr>
                      <th>著者</th>
                      <td>Scott W. Ambler、Pramod J. Sadalage</td>
                    </tr>
                    <tr>
                      <th>シリーズ</th>
                      <td>Addison-Wesley Signature Series(編者 Martin Fowler)</td>
                    </tr>
                    <tr>
                      <th>出版社</th>
                      <td>Addison-Wesley Professional</td>
                    </tr>
                    <tr>
                      <th>初版発行</th>
                      <td>2006年3月</td>
                    </tr>
                    <tr>
                      <th>ページ数</th>
                      <td>384ページ、11章 + 付録</td>
                    </tr>
                    <tr>
                      <th>ISBN-13(ハードカバー)</th>
                      <td>978-0-321-29353-4</td>
                    </tr>
                    <tr>
                      <th>ISBN-13(ペーパーバック)</th>
                      <td>978-0-321-77451-4</td>
                    </tr>
                    <tr>
                      <th>日本語版</th>
                      <td>
                        『データベース・リファクタリング　データベースの体質改善テクニック』ピアソン・エデュケーション、2008年4月10日
                      </td>
                    </tr>
                    <tr>
                      <th>日本語版ISBN</th>
                      <td>978-4-89471-500-4</td>
                    </tr>
                    <tr>
                      <th>主な読者層</th>
                      <td>アプリケーション開発者、DBA、アーキテクト、アジャイル / DevOpsチーム</td>
                    </tr>
                    <tr>
                      <th>前提知識</th>
                      <td>SQLの基礎、リレーショナルデータベースの基本概念(正規化・外部キーなど)</td>
                    </tr>
                    <tr>
                      <th>収録リファクタリング数</th>
                      <td>
                        60〜70種類以上(構造・データ品質・参照整合性・アーキテクチャ・メソッドの5分類
                        + 変換)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: "1em", color: "var(--ink-soft)" }}>
                出典：O&apos;Reilly掲載ページ、Amazon商品ページ、InformIt商品ページ、eBay掲載の目次情報(詳細URLは参考文献セクションを参照)。
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Authors */}
        <section className="section" id="authors">
          <h2>
            <IconUsers size={24} />
            著者について
          </h2>
          <div className="prose">
            <p>
              <strong>Scott W. Ambler</strong>
              は、アジャイルモデリング(Agile Modeling)やアジャイルデータ(Agile
              Data)手法の提唱者として知られるソフトウェアプロセス改善コンサルタントです。トロント近郊を拠点に、のちにDisciplined
              Agile(DA)の実践リーダーとしても活動しています。
            </p>
            <p>
              <strong>Pramod J. Sadalage</strong>は ThoughtWorks
              のプリンシパルコンサルタントで、1999年に大規模なJ2EEアプリケーションでエクストリーム・プログラミング(XP)を実践していた際、進化的データベース設計とデータベースリファクタリングの手法を最初に考案した人物です。のちに
              Martin Fowler と共著で『NoSQL Distilled』も執筆しています。
            </p>
            <p>
              <strong>Martin Fowler</strong>
              は本書のシリーズ編者であり、序文も寄せています。さらにPramod
              Sadalageと共著で公開記事「Evolutionary Database
              Design」(初出2003年、2016年に大幅改訂)を執筆しており、本書のエッセンスを無料で読める形にまとめています。
            </p>
          </div>
        </section>

        {/* Section 3: Step 0 */}
        <section className="section" id="step0">
          <h2>
            <IconRoute size={24} />
            Step 0：学習ロードマップ — どこから読むか
          </h2>
          <div className="prose">
            <p>
              本書は約380ページと決して短くありませんが、全員が最初から最後まで通読する必要はありません。目的別に読む章を絞るのが実践的です。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：読者タイプ別のおすすめの読み方
            </div>
            <MermaidDiagram chart={chartD0} />
          </div>
          <div className="prose">
            <p>
              本ガイドでは、この4タイプすべてに必要な知識を横断的にカバーしつつ、初学者が迷わないよう順序立てて解説します。
            </p>
          </div>
        </section>

        {/* Section 4: Step 1 */}
        <section className="section" id="step1">
          <h2>
            <IconBulb size={24} />
            Step 1：なぜ「進化的データベース設計」が必要なのか
          </h2>
          <div className="prose">
            <p>
              ウォーターフォール型の開発では、要件定義フェーズでデータベース設計を完全に固め、以後は変更しないことが前提でした。しかしアジャイル開発では要求は反復(イテレーション)を重ねるごとに明らかになっていきます。アプリケーションコードは「リファクタリング」という手法で安全に進化させられるようになった一方、データベースは長らく「一度作ったら触れない聖域」として扱われてきました。これが両者の間に生まれる根本的なミスマッチです。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：アジャイル開発とデータベース設計のミスマッチ
            </div>
            <MermaidDiagram chart={chartD1} />
          </div>
          <div className="prose">
            <p>
              本書の目的は、Martin Fowlerが1999年の著書『Refactoring: Improving the Design of
              Existing
              Code』でコードに対して確立した「振る舞いを変えずに内部構造を改善する」という考え方を、データベースのスキーマ・データ・ストアドプロシージャにも適用できる形で体系化することにあります。
            </p>
          </div>
        </section>

        {/* Section 5: Step 2 */}
        <section className="section" id="step2">
          <h2>
            <IconLayoutGrid size={24} />
            Step 2：本の全体構成
          </h2>
          <div className="prose">
            <p>
              本書は大きく「基礎編(第1〜5章)」と「カタログ編(第6〜11章)」の2部構成になっており、巻末にUMLデータモデリング表記法の付録・用語集・推奨図書リストが付いています。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：本書の全体構成
            </div>
            <MermaidDiagram chart={chartD2} />
          </div>
          <div className="prose">
            <p>各章の内容は次の通りです。</p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>章</th>
                  <th>タイトル</th>
                  <th>主な内容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>第1章</td>
                  <td>Evolutionary Database Development</td>
                  <td>
                    進化的データベース開発の全体像、回帰テスト、構成管理、開発者用サンドボックス
                  </td>
                </tr>
                <tr>
                  <td>第2章</td>
                  <td>Database Refactoring</td>
                  <td>
                    データベースリファクタリングの定義、コードリファクタリングとの違い、分類、データベースの「臭い」
                  </td>
                </tr>
                <tr>
                  <td>第3章</td>
                  <td>The Process of Database Refactoring</td>
                  <td>リファクタリングを実施する具体的な手順(メカニクス)</td>
                </tr>
                <tr>
                  <td>第4章</td>
                  <td>Deploying into Production</td>
                  <td>本番環境へのデプロイ戦略、スケジュールダウンタイムと継続稼働</td>
                </tr>
                <tr>
                  <td>第5章</td>
                  <td>Database Refactoring Strategies</td>
                  <td>単一アプリケーションDBと複数アプリケーションDBでの戦略の違い</td>
                </tr>
                <tr>
                  <td>第6章</td>
                  <td>Structural Refactorings</td>
                  <td>構造リファクタリング(テーブル構造の変更)</td>
                </tr>
                <tr>
                  <td>第7章</td>
                  <td>Data Quality Refactorings</td>
                  <td>データ品質リファクタリング(値の一貫性・妥当性の改善)</td>
                </tr>
                <tr>
                  <td>第8章</td>
                  <td>Referential Integrity Refactorings</td>
                  <td>参照整合性リファクタリング(外部キー・削除方針など)</td>
                </tr>
                <tr>
                  <td>第9章</td>
                  <td>Architectural Refactorings</td>
                  <td>アーキテクチャリファクタリング(外部プログラムとの連携方法の改善)</td>
                </tr>
                <tr>
                  <td>第10章</td>
                  <td>Method Refactorings</td>
                  <td>メソッドリファクタリング(ストアドプロシージャ・トリガー・関数の改善)</td>
                </tr>
                <tr>
                  <td>第11章</td>
                  <td>Transformations</td>
                  <td>変換(意味論を変える、非リファクタリングな変更)</td>
                </tr>
                <tr>
                  <td>付録A</td>
                  <td>The UML Data Modeling Notation</td>
                  <td>本書内で使われるUML表記法の解説</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            出典：eBay掲載の詳細目次、ACM
            Queueによる書評、dokumen.pub掲載の章立て情報(参考文献セクション参照)。
          </p>
        </section>

        {/* Section 6: Step 3 */}
        <section className="section" id="step3">
          <h2>
            <IconPuzzle size={24} />
            Step 3：データベースリファクタリングとは何か
          </h2>
          <div className="prose">
            <p>
              Martin
              Fowlerによるコードリファクタリングの定義は「観測可能な振る舞いを変えずに、理解しやすく安価に変更できるようにソフトウェアの内部構造に加える変更」でした。本書はこれをデータベースに拡張し、次のように定義しています。
            </p>
          </div>
          <div className="callout gold">
            <IconQuote size={20} />
            <div className="callout-body">
              <p>
                データベースリファクタリングとは、データベーススキーマに対する小さな変更であり、意味論(保存されている情報の内容や解釈のされ方)を変えずに設計を改善するものである。
              </p>
            </div>
          </div>
          <div className="prose">
            <p>
              ここで重要なのは、データベースリファクタリングがコードリファクタリングと違い、
              <strong>同時に3つの異なる変更</strong>を伴う点です。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：データベースリファクタリングを構成する3つの変更
            </div>
            <MermaidDiagram chart={chartD3} />
          </div>
          <div className="prose">
            <p>
              スキーマだけ変えてデータを移行し忘れる、あるいはアクセスコードの更新を忘れる——このどれか一つでも欠けると、リファクタリングは未完了のまま本番に混乱をもたらします。Martin
              Fowlerは自身の記事の中で、この三位一体性こそがデータベースリファクタリングを(単純に見えて)コードリファクタリングより難しくしている理由だと述べています。
            </p>
          </div>
        </section>

        {/* Section 7: Step 4 */}
        <section className="section" id="step4">
          <h2>
            <IconAlertTriangle size={24} />
            Step 4：データベースの「臭い」を見分ける
          </h2>
          <div className="prose">
            <p>
              コードに「コードの臭い(code
              smell)」があるように、データベースにも「データベースの臭い(database
              smell)」があります。Scott Ambler
              が2003年に提唱したこの概念は、リファクタリングが必要かどうかを判断する手がかりになります。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：データベースの臭いの一覧
            </div>
            <MermaidDiagram chart={chartD4} />
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>臭い</th>
                  <th>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>マルチパーパスカラム</td>
                  <td>
                    1つの列が複数の目的で使われ、値の意味を判別する追加ロジックが必要になっている状態
                  </td>
                </tr>
                <tr>
                  <td>マルチパーパステーブル</td>
                  <td>1つのテーブルに複数種類のエンティティが混在している状態</td>
                </tr>
                <tr>
                  <td>冗長データ</td>
                  <td>同じ値が複数箇所に重複して保存され、不整合が起きやすい状態</td>
                </tr>
                <tr>
                  <td>カラムが多すぎる表</td>
                  <td>表が複数のエンティティの情報を無理に1つにまとめている兆候</td>
                </tr>
                <tr>
                  <td>行が多すぎる表</td>
                  <td>検索・更新に時間がかかり、パフォーマンス上の問題を引き起こしやすい状態</td>
                </tr>
                <tr>
                  <td>スマートカラム</td>
                  <td>
                    値の中の位置ごとに異なる意味を持たせている列(例：コードの前半が地域、後半が種別など)
                  </td>
                </tr>
                <tr>
                  <td>変更への恐怖</td>
                  <td>誰もそのテーブルの仕組みを正確に把握しておらず、触るのを避けている状態</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            出典：ApexSQL Solution Centerによる解説記事(Ambler,
            2003年提唱の内容を要約したもの。参考文献セクション参照)。
          </p>
        </section>

        {/* Section 8: Step 5 */}
        <section className="section" id="step5">
          <h2>
            <IconListCheck size={24} />
            Step 5：リファクタリングのプロセス(メカニクス)
          </h2>
          <div className="prose">
            <p>
              第3章では、1つのデータベースリファクタリングを安全に実施するための具体的な手順が示されています。本書ではこれを「メカニクス(mechanics)」と呼びます。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：リファクタリングのメカニクス
            </div>
            <MermaidDiagram chart={chartD5} />
          </div>
          <div className="prose">
            <p>
              ポイントは、いきなり古い構造を削除するのではなく、まず「非推奨化(deprecate)」して一定の移行期間を設けることです。これにより、そのデータベースに依存している他のアプリケーションやレポートが安全に追従できる猶予が生まれます。この移行期間の考え方は次のStepで詳しく扱います。
            </p>
          </div>
        </section>

        {/* Section 9: Step 6 */}
        <section className="section" id="step6">
          <h2>
            <IconArrowsShuffle size={24} />
            Step 6：移行期間とパラレルチェンジ(Parallel Change)パターン
          </h2>
          <div className="prose">
            <p>
              破壊的な変更(destructive
              change：既存のアクセスコードを壊してしまう可能性のある変更)を行う場合、本書は「移行期間(transition
              period)」を設けることを推奨しています。これは、新旧両方の構造を一定期間並行してサポートし、依存している側が自分のペースで移行できるようにする考え方です。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：Expand → Migrate → Contract の3段階
            </div>
            <MermaidDiagram chart={chartD6} />
          </div>
          <div className="prose">
            <p>
              この「拡張 → 移行 → 収縮」という3段階の考え方は、のちにMartin
              Fowlerが自身のbliki(ブログ的な用語辞典)で「Parallel Change(並行変更、別名
              expand/contract
              パターン)」として整理し直したものと本質的に同じです。現在では、ローリングデプロイやゼロダウンタイムデプロイを実現するための標準的な手法として、Flyway・Liquibaseのようなツールを使う多くのチームに広く使われています。
            </p>
            <p>例えばテーブル名を変更する場合、本書は次のようなテクニックを示しています。</p>
          </div>
          <div className="code-block">
            <div className="code-block-head">
              <span>SQL — 移行期間中のビューによる後方互換</span>
              <IconDatabase size={18} />
            </div>
            <pre className="cd" dangerouslySetInnerHTML={{ __html: CODE_STEP6 }} />
          </div>
          <div className="prose">
            <p>
              移行期間が終わり、依存している全アプリケーションが新しいテーブル名を使うようになったことを確認できたら、このビューを削除して「収縮」フェーズを完了させます。
            </p>
          </div>
        </section>

        {/* Section 10: Step 7 */}
        <section className="section" id="step7">
          <h2>
            <IconServer size={24} />
            Step 7：本番環境へのデプロイ戦略
          </h2>
          <div className="prose">
            <p>
              第4章では、開発中のデータベースだけでなく、すでに本番稼働しているデータベースへリファクタリングを適用する際の難しさを扱っています。大きな分かれ道は「データベースを利用するアプリケーションが1つだけか、複数か」です。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：単一アプリケーションDBと共有データベースの分かれ道
            </div>
            <MermaidDiagram chart={chartD7} />
          </div>
          <div className="prose">
            <p>
              複数アプリケーションが同じデータベースを共有している状況(いわゆる Shared Database
              パターン)では、あるチームの変更が別のチームのアプリケーションを予期せず壊してしまうリスクが常につきまといます。本書はこのリスクを軽減するために、変更の事前告知、移行期間の確保、そして必要であれば外部キー制約・トリガー・ビューを使った後方互換性の維持を具体的な手順とともに紹介しています。
            </p>
          </div>
        </section>

        {/* Section 11: Step 8 */}
        <section className="section" id="step8">
          <h2>
            <IconGitBranch size={24} />
            Step 8：単一アプリ vs 複数アプリのデータベース戦略
          </h2>
          <div className="prose">
            <p>
              第5章「Database Refactoring
              Strategies」では、リファクタリングを実施するにあたっての基本方針が示されています。要点は次の3つに集約できます。
            </p>
          </div>
          <ol className="step-list">
            <li>
              <div>
                <strong>変更はできるだけ小さくする</strong> —
                1回のリファクタリングで変える範囲を最小限にとどめることで、問題が起きたときの原因特定と復旧が容易になります。
              </div>
            </li>
            <li>
              <div>
                <strong>常にテストしてからコミットする</strong> —
                自分のローカル環境(サンドボックス)でスキーマ変更・データ移行・回帰テストをすべて実行し、グリーンになってから共有リポジトリに反映します。
              </div>
            </li>
            <li>
              <div>
                <strong>本番相当の環境で検証する</strong> —
                特に複数アプリケーションが依存する共有データベースでは、ステージング環境などでリファクタリングの影響を確認してから本番に適用します。
              </div>
            </li>
          </ol>
          <div className="prose">
            <p>
              これらは、次章以降で紹介するあらゆる個別のリファクタリング手法に共通して適用される原則です。
            </p>
          </div>
        </section>

        {/* Section 12: Step 9 */}
        <section className="section" id="step9">
          <h2>
            <IconCategory size={24} />
            Step 9：リファクタリングカタログ全体像
          </h2>
          <div className="prose">
            <p>
              本書の後半(第6〜11章)は、実際に使える60〜70種類以上のリファクタリングを収録したカタログになっています。分類は5つの「リファクタリング」カテゴリと、1つの「非リファクタリング」カテゴリ(変換)です。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：カタログの6分類
            </div>
            <MermaidDiagram chart={chartD8} />
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>カテゴリ</th>
                  <th>定義</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>構造(Structural)</td>
                  <td>テーブル構造そのものに対する変更</td>
                </tr>
                <tr>
                  <td>データ品質(Data Quality)</td>
                  <td>保存されている値の一貫性・妥当性を高める変更</td>
                </tr>
                <tr>
                  <td>参照整合性(Referential Integrity)</td>
                  <td>関連する行の存在保証や、不要になった行の適切な削除に関する変更</td>
                </tr>
                <tr>
                  <td>アーキテクチャ(Architectural)</td>
                  <td>外部プログラムがデータベースとやり取りする方法を改善する変更</td>
                </tr>
                <tr>
                  <td>メソッド(Method)</td>
                  <td>ストアドプロシージャ・ストアド関数・トリガーの品質を改善する変更</td>
                </tr>
                <tr>
                  <td>変換(Transformations)</td>
                  <td>
                    新しい要素を追加したり既存要素を変更したりすることで、意味論そのものを変える変更(リファクタリングではない)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            出典：Scott Ambler自身が運営するAgile Data(agiledata.org)「Catalog of Database
            Refactorings」、および著者自身の公式カタログサイト
            databaserefactoring.com(参考文献セクション参照)。
          </p>
        </section>

        {/* Section 13: Step 10 */}
        <section className="section" id="step10">
          <h2>
            <IconTable size={24} />
            Step 10：構造リファクタリング(Structural Refactorings)
          </h2>
          <div className="prose">
            <p>
              テーブルやカラムの「形」そのものを変えるリファクタリングです。本書で最もページ数が割かれているカテゴリ(第6章、本文で最も長い章)で、日常的に最もよく使う分類でもあります。
            </p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>リファクタリング名</th>
                  <th>何をするか</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Drop Column</td>
                  <td>使われなくなった列を削除する</td>
                </tr>
                <tr>
                  <td>Drop Table</td>
                  <td>使われなくなったテーブルを削除する</td>
                </tr>
                <tr>
                  <td>Drop View</td>
                  <td>使われなくなったビューを削除する</td>
                </tr>
                <tr>
                  <td>Introduce Calculated Column</td>
                  <td>他の列から計算できる値を格納する列を新設する</td>
                </tr>
                <tr>
                  <td>Introduce Surrogate Key</td>
                  <td>意味を持たない代理キー(連番など)を主キーとして導入する</td>
                </tr>
                <tr>
                  <td>Merge Columns</td>
                  <td>複数の列を1つに統合する</td>
                </tr>
                <tr>
                  <td>Merge Tables</td>
                  <td>複数のテーブルを1つに統合する</td>
                </tr>
                <tr>
                  <td>Move Column</td>
                  <td>列を別のテーブルへ移動する</td>
                </tr>
                <tr>
                  <td>Rename Column</td>
                  <td>列名をより分かりやすい名前に変更する</td>
                </tr>
                <tr>
                  <td>Rename Table</td>
                  <td>テーブル名をより分かりやすい名前に変更する</td>
                </tr>
                <tr>
                  <td>Rename View</td>
                  <td>ビュー名をより分かりやすい名前に変更する</td>
                </tr>
                <tr>
                  <td>Replace LOB with Table</td>
                  <td>大きなオブジェクト型(BLOB/CLOB)の列を別テーブルに置き換える</td>
                </tr>
                <tr>
                  <td>Replace Column</td>
                  <td>列のデータ型や意味を別のものに置き換える</td>
                </tr>
                <tr>
                  <td>Replace One-To-Many with Associative Table</td>
                  <td>1対多の関係を、中間の関連テーブルを使った表現に置き換える</td>
                </tr>
                <tr>
                  <td>Replace Surrogate Key with Natural Key</td>
                  <td>代理キーを、業務上意味のある自然キーに置き換える</td>
                </tr>
                <tr>
                  <td>Split Column</td>
                  <td>1つの列に詰め込まれている複数の情報を、複数の列に分割する</td>
                </tr>
                <tr>
                  <td>Split Table</td>
                  <td>1つのテーブルを複数のテーブルに分割する</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            出典：databaserefactoring.com(著者公式サイト)に掲載されたStructural
            Refactoringsの一覧、Red Gate Simple Talk掲載の解説記事(参考文献セクション参照)。
          </p>
        </section>

        {/* Section 14: Step 11 */}
        <section className="section" id="step11">
          <h2>
            <IconShieldCheck size={24} />
            Step 11：データ品質リファクタリング(Data Quality Refactorings)
          </h2>
          <div className="prose">
            <p>
              保存されているデータの値そのものの一貫性・妥当性を高めるリファクタリングです(第7章)。
            </p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>リファクタリング名</th>
                  <th>何をするか</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Add Lookup Table</td>
                  <td>特定の値の集合を管理するためのルックアップテーブルを追加する</td>
                </tr>
                <tr>
                  <td>Apply Standard Codes</td>
                  <td>バラバラな表記のコード値を標準化されたコード体系に統一する</td>
                </tr>
                <tr>
                  <td>Apply Standard Type</td>
                  <td>同じ意味の列で異なるデータ型が使われている状態を統一する</td>
                </tr>
                <tr>
                  <td>Consolidate Key Strategy</td>
                  <td>キーの採番方式(自然キー / 代理キー)をデータベース全体で統一する</td>
                </tr>
                <tr>
                  <td>Drop Column Constraint</td>
                  <td>不要になった列制約を削除する</td>
                </tr>
                <tr>
                  <td>Drop Default Value</td>
                  <td>不要になったデフォルト値を削除する</td>
                </tr>
                <tr>
                  <td>Drop Non Nullable</td>
                  <td>不要になったNOT NULL制約を緩める</td>
                </tr>
                <tr>
                  <td>Introduce Column Constraint</td>
                  <td>値の妥当性を保証するための列制約を追加する</td>
                </tr>
                <tr>
                  <td>Introduce Common Format</td>
                  <td>日付や電話番号など、表記ゆれのある値の書式を統一する</td>
                </tr>
                <tr>
                  <td>Introduce Default Value</td>
                  <td>列にデフォルト値を導入する</td>
                </tr>
                <tr>
                  <td>Make Column Non Nullable</td>
                  <td>NULL値を許可していた列にNOT NULL制約を導入する</td>
                </tr>
                <tr>
                  <td>Move Data</td>
                  <td>データを別の場所(列やテーブル)へ移動する</td>
                </tr>
                <tr>
                  <td>Replace Type Code with Property Flags</td>
                  <td>種別コード列を、複数の真偽値(フラグ)列に置き換える</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            出典：Agile Data(agiledata.org)「Catalog of Database Refactorings: Data Quality
            Refactorings」(参考文献セクション参照)。
          </p>
        </section>

        {/* Section 15: Step 12 */}
        <section className="section" id="step12">
          <h2>
            <IconLink size={24} />
            Step 12：参照整合性リファクタリング(Referential Integrity Refactorings)
          </h2>
          <div className="prose">
            <p>
              関連する行同士の整合性を保証したり、不要な行を適切に扱ったりするためのリファクタリングです(第8章)。
            </p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>リファクタリング名</th>
                  <th>何をするか</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Add Foreign Key Constraint</td>
                  <td>他のテーブルとの関連を保証する外部キー制約を追加する</td>
                </tr>
                <tr>
                  <td>Add Trigger for Calculated Column</td>
                  <td>計算列の値を自動更新するトリガーを追加する</td>
                </tr>
                <tr>
                  <td>Drop Foreign Key Constraint</td>
                  <td>不要になった外部キー制約を削除する</td>
                </tr>
                <tr>
                  <td>Introduce Cascading Delete</td>
                  <td>親行が削除されたときに関連する子行も自動的に削除されるようにする</td>
                </tr>
                <tr>
                  <td>Introduce Hard Delete</td>
                  <td>削除フラグ列を廃止し、行そのものを物理的に削除するようにする</td>
                </tr>
                <tr>
                  <td>Introduce Soft Delete</td>
                  <td>行を物理削除せず、削除フラグを立てるだけにする</td>
                </tr>
                <tr>
                  <td>Introduce Trigger for History</td>
                  <td>データ変更履歴(監査ログ)を記録するトリガーを追加する</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="prose">
            <p>
              このカテゴリで特に初学者が迷いやすいのが「論理削除(Soft Delete)」と「物理削除(Hard
              Delete)」のどちらを選ぶかという判断です。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：Soft DeleteとHard Deleteの使い分け
            </div>
            <MermaidDiagram chart={chartD9} />
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            出典：Agile Data(agiledata.org)「Catalog of Database Refactorings: Referential Integrity
            Refactorings」(参考文献セクション参照)。
          </p>
        </section>

        {/* Section 16: Step 13 */}
        <section className="section" id="step13">
          <h2>
            <IconBuildingArch size={24} />
            Step 13：アーキテクチャリファクタリング(Architectural Refactorings)
          </h2>
          <div className="prose">
            <p>
              外部プログラムがデータベースとやり取りする「方法」自体を改善するリファクタリングです(第9章)。
            </p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>リファクタリング名</th>
                  <th>何をするか</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Add CRUD Methods</td>
                  <td>
                    特定のエンティティに対するCRUD(作成・取得・更新・削除)操作をストアドプロシージャとして整備する
                  </td>
                </tr>
                <tr>
                  <td>Add Mirror Table</td>
                  <td>別のデータベースに、既存テーブルの複製(ミラー)テーブルを作成する</td>
                </tr>
                <tr>
                  <td>Add Read Method</td>
                  <td>エンティティを取得するための読み取り専用メソッドを追加する</td>
                </tr>
                <tr>
                  <td>Encapsulate Table with View</td>
                  <td>
                    既存テーブルへの直接アクセスをビューで包み、内部構造の変更をアプリから隠蔽する
                  </td>
                </tr>
                <tr>
                  <td>Introduce Calculation Method</td>
                  <td>計算ロジックをストアドプロシージャ / 関数として切り出す</td>
                </tr>
                <tr>
                  <td>Introduce Index</td>
                  <td>検索性能を高めるためのインデックスを追加する</td>
                </tr>
                <tr>
                  <td>Introduce Read Only Table</td>
                  <td>読み取り専用として扱うべきテーブルであることを明示する</td>
                </tr>
                <tr>
                  <td>Migrate Method from Database</td>
                  <td>データベース内にあるロジックをアプリケーション層へ移す</td>
                </tr>
                <tr>
                  <td>Migrate Method to Database</td>
                  <td>アプリケーション層にあるロジックをデータベース内へ移す</td>
                </tr>
                <tr>
                  <td>Replace Method(s) with View</td>
                  <td>複数のメソッドをまとめて1つのビューに置き換える</td>
                </tr>
                <tr>
                  <td>Replace View with Method(s)</td>
                  <td>ビューを、より柔軟なメソッド(ストアドプロシージャ)に置き換える</td>
                </tr>
                <tr>
                  <td>Use Official Data Source</td>
                  <td>
                    ある実体について、複製されたデータではなく公式のデータソースを参照するように変更する
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            出典：Agile Data(agiledata.org)「Catalog of Database Refactorings: Architectural
            Refactorings」(参考文献セクション参照)。
          </p>
        </section>

        {/* Section 17: Step 14 */}
        <section className="section" id="step14">
          <h2>
            <IconCode size={24} />
            Step 14：メソッドリファクタリングと変換(Transformations)
          </h2>
          <div className="prose">
            <p>
              <strong>メソッドリファクタリング(第10章)</strong>
              は、ストアドプロシージャ・トリガー・関数といった「データベース内のコード」に対するリファクタリングです。多くはMartin
              Fowlerの原著『Refactoring』にあるコードリファクタリングカタログを、データベースのメソッドに適用したものです。
            </p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>リファクタリング名</th>
                  <th>何をするか</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rename Method</td>
                  <td>メソッド名をより分かりやすい名前に変更する</td>
                </tr>
                <tr>
                  <td>Parameterize Method(s)</td>
                  <td>
                    似た処理をするメソッド群を、パラメータで振る舞いを切り替える1つのメソッドに統合する
                  </td>
                </tr>
                <tr>
                  <td>Remove Parameter</td>
                  <td>使われなくなった引数を削除する</td>
                </tr>
                <tr>
                  <td>Reorder Parameters</td>
                  <td>引数の並び順を整理し直す</td>
                </tr>
                <tr>
                  <td>Extract Method</td>
                  <td>長い処理の一部を、別の名前付きメソッドとして切り出す</td>
                </tr>
                <tr>
                  <td>Decompose Conditional</td>
                  <td>複雑な条件分岐を、意味の分かる名前のメソッドに分解する</td>
                </tr>
                <tr>
                  <td>Introduce Variable</td>
                  <td>分かりにくい式に名前を付けて変数化する</td>
                </tr>
                <tr>
                  <td>Substitute Algorithm</td>
                  <td>分かりにくいアルゴリズムを、より明快なものに置き換える</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="prose">
            <p>
              <strong>変換(Transformations、第11章)</strong>
              は、リファクタリングとは異なり、データベースの意味論そのものを変える追加的な変更です。純粋なリファクタリング(振る舞いを変えない変更)と区別して扱われます。
            </p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>変換名</th>
                  <th>何をするか</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Insert Data</td>
                  <td>新しいデータを挿入する(新機能のための初期データ投入など)</td>
                </tr>
                <tr>
                  <td>Introduce New Column</td>
                  <td>新しい情報を保持するための列を追加する</td>
                </tr>
                <tr>
                  <td>Introduce New Table</td>
                  <td>新しいエンティティを表すテーブルを追加する</td>
                </tr>
                <tr>
                  <td>Introduce View</td>
                  <td>新しい切り口でデータを見せるビューを追加する</td>
                </tr>
                <tr>
                  <td>Update Data</td>
                  <td>既存データの値を更新する(新しい要件に合わせた書き換えなど)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            出典：databaserefactoring.com(著者公式サイト)に掲載されたMethod
            RefactoringsおよびTransformationの一覧(参考文献セクション参照)。
          </p>
        </section>

        {/* Section 18: Step 15 */}
        <section className="section" id="step15">
          <h2>
            <IconFlask size={24} />
            Step 15：実践ウォークスルー ① Split Column をやってみる
          </h2>
          <div className="prose">
            <p>
              ここからは、実際のシナリオに沿って構造リファクタリングを1つ体験してみましょう。題材は
              Martin Fowler と Pramod Sadalage の記事「Evolutionary Database
              Design」で紹介されている「在庫(inventory)テーブルの在庫コード列(本ガイドでは{" "}
              <code>product_inventory_code</code>{" "}
              とします)を、場所・ロット番号・シリアル番号の3つの列に分割する」という例です。
            </p>
            <p>
              <strong>変更前の状態</strong>：<code>inventory</code> テーブルには{" "}
              <code>product_inventory_code</code>{" "}
              という1つの列があり、そこに「場所コード」「ロット番号」「シリアル番号」が連結された文字列として格納されています。ある開発者(記事内では「Jen」)が、これら3つの情報を個別に検索・更新できるようにする、というユーザーストーリーを実装することになりました。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：Split Column の実施手順
            </div>
            <MermaidDiagram chart={chartD10} />
          </div>
          <div className="prose">
            <p>
              このリファクタリング(Expand〜Migrateフェーズ)を実現する移行スクリプトの例(Oracle
              SQLの場合)は次のようになります。
            </p>
          </div>
          <div className="code-block">
            <div className="code-block-head">
              <span>SQL — product_inventory_code の Split Column</span>
              <IconDatabase size={18} />
            </div>
            <pre className="cd" dangerouslySetInnerHTML={{ __html: CODE_STEP15 }} />
          </div>
          <div className="prose">
            <p>
              このスクリプトはローカルの開発用データベースでまず実行し、既存のテスト一式を流して振る舞いが壊れていないことを確認してから、バージョン管理システム(マイグレーションスクリプトとして)にコミットします。CIサーバーがこれを検知し、統合用データベースに同じスクリプトを適用してテストを再実行し、問題がなければステージング・本番へと同じスクリプトが順番に適用されていきます。
            </p>
            <p>
              旧列 <code>product_inventory_code</code> は、Step 6で説明した「移行期間(transition
              period)」の考え方に沿って、この時点ではまだ削除しません。移行期間中は上記の同期トリガーが働くため、旧アプリケーションが連結文字列を更新しても新しい3列へ、新アプリケーションが3列を更新しても旧列へ、それぞれ即座に反映され、両方の表現が常に一致した状態を保てます。すべての利用者(アプリケーション・レポートなど)が新しい3列を参照するように切り替わったことを確認できてから、
              <code>DROP TRIGGER trg_inventory_code_sync;</code> と{" "}
              <code>ALTER TABLE inventory DROP COLUMN product_inventory_code;</code>{" "}
              を実行する別のContractフェーズ用スクリプトとして、改めてコミット・適用します。ここで注意が必要なのは、Oracle
              の DDL は文ごとに暗黙コミットされるため、<code>DROP TRIGGER</code> と{" "}
              <code>ALTER TABLE ... DROP COLUMN</code>{" "}
              を同じスクリプトにまとめても原子的にはならない点です。
              <code>DROP TRIGGER</code>{" "}
              が成功したあとに列削除が失敗すると、同期トリガーだけが失われ旧列が残った状態がコミット済みとして残り、以後の書き込みで旧列と新3列が乖離していきます(
              <code>WHENEVER SQLERROR EXIT FAILURE ROLLBACK</code>{" "}
              は未コミットのトランザクションを戻すだけで、すでにコミットされた DDL
              は取り消せません)。
            </p>
            <ol className="step-list">
              <li>
                <div>
                  <strong>事前確認</strong> — <code>USER_DEPENDENCIES</code> /{" "}
                  <code>ALL_DEPENDENCIES</code>{" "}
                  で旧列に依存するビュー・トリガー・ストアドプログラムを洗い出し、
                  <code>ALTER TABLE</code> や <code>DROP ANY TRIGGER</code> の権限、および{" "}
                  <code>ALTER TABLE ... DROP COLUMN</code>{" "}
                  が取る排他ロックを取得できる時間帯かを確認します。
                </div>
              </li>
              <li>
                <div>
                  <strong>実行後の検証</strong> — <code>USER_TRIGGERS</code> と{" "}
                  <code>USER_TAB_COLUMNS</code> を照会し、同期トリガーと旧列の<strong>両方</strong>
                  が消えていることを確認します。片方だけが残っていれば中途半端な状態です。
                </div>
              </li>
              <li>
                <div>
                  <strong>列削除が失敗した場合の復旧</strong> —
                  同期トリガーが無い状態では書き込みのたびに乖離が広がるため、次の順で進めます。
                  <ol>
                    <li>
                      <strong>書き込みを停止する</strong>:<code>inventory</code>{" "}
                      へ書き込むアプリケーション・バッチを止めます(メンテナンスモードへの切り替えや、書き込み系デプロイの停止など)。停止しないまま修復やトリガー再作成を行うと、作業中の更新が片側にしか反映されず不一致が再発します。
                    </li>
                    <li>
                      <strong>正とする表現を決める</strong>:Contract
                      フェーズに入った時点ではすべての利用者が新3列へ切り替わっているはずなので、原則として
                      <strong>新3列を正</strong>
                      とし、旧列を再連結値で上書きします。旧列にしか書かない利用者が残っていたことが判明した場合は、その期間の更新を旧列側から新3列へ反映する必要があるため、どちらを正とするかを利用者の切り替え状況から判断し、記録に残します。
                    </li>
                    <li>
                      <strong>競合行の解決方針を定める</strong>
                      :両方の表現がそれぞれ異なる更新を受けた行(どちらを採っても片方の更新が失われる行)は機械的に上書きせず、更新履歴や監査ログ・業務担当者の確認に基づいて行ごとに正しい値を決めます。
                    </li>
                    <li>
                      <strong>不一致の特定と修復</strong>:Step 15 の検証クエリ(<code>DECODE</code>{" "}
                      による NULL
                      安全な突き合わせ)で旧列と新3列の不一致行を洗い出し、上の方針に従って修復したうえで、同じ検証クエリが0件になることを確認します。
                    </li>
                    <li>
                      <strong>同期トリガーの再作成</strong>
                      :修復が完了してから同期トリガーを再作成し、コンパイル検査を通して双方向同期を復旧させます。そのうえで書き込みを再開します。
                    </li>
                    <li>
                      <strong>列削除の再実行</strong>
                      :失敗の原因(依存オブジェクト・権限・ロック競合)を取り除き、Contract
                      フェーズを再実行します。
                    </li>
                  </ol>
                </div>
              </li>
            </ol>
          </div>
          <div className="callout forest">
            <IconBulb size={20} />
            <div className="callout-body">
              <span className="callout-title">ポイント</span>
              <p>
                スキーマ変更(列追加と同期トリガー)、データ移行(SUBSTRによる分割とバックフィル)、そしてアクセスコード変更(アプリ側の参照列の変更)を
                <strong>同じ変更セット(リリース)として管理する</strong>
                点が、Step
                3で説明した「3つの変更が揃って1つのリファクタリング」という原則を体現しています。上記のSQLはこのうちスキーマ変更とデータ移行にあたり、アクセスコード変更はアプリケーション側のリポジトリで行われますが、リリース単位としては切り離さずに扱います。同期トリガーをバックフィルより
                <strong>先に</strong>
                有効化するのが要点で、順序が逆だと、バックフィルからトリガー有効化までの間に発生した更新を取りこぼします。一方で旧列と同期トリガーの削除(収縮)は、移行期間を経た後の独立したリファクタリングとして扱います。
              </p>
            </div>
          </div>
        </section>

        {/* Section 19: Step 16 */}
        <section className="section" id="step16">
          <h2>
            <IconFlask2 size={24} />
            Step 16：実践ウォークスルー ② Rename Table と移行期間
          </h2>
          <div className="prose">
            <p>
              続いて、Step
              6で紹介した「移行期間」の考え方を、テーブル名変更という具体的な例で確認します。
              <code>customer</code> テーブルを、より業務の実態に合った <code>client</code>{" "}
              という名前に変更したいとします。
            </p>
            <p>
              複数のアプリケーションがこの <code>customer</code>{" "}
              テーブルに依存している場合、いきなり <code>RENAME</code>{" "}
              すると、まだ移行していないアプリケーションのSQLが一斉にエラーになってしまいます。そこで本書は次のような段階的な手順を示しています。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：Rename Table の段階的な移行手順
            </div>
            <MermaidDiagram chart={chartD11} />
          </div>
          <div className="code-block">
            <div className="code-block-head">
              <span>SQL — テーブル名変更と互換ビュー</span>
              <IconDatabase size={18} />
            </div>
            <pre className="cd" dangerouslySetInnerHTML={{ __html: CODE_STEP16 }} />
          </div>
          <div className="prose">
            <p>
              このビューも、Step
              6で触れた「更新可能ビュー」の条件(単一テーブル由来である、集約や重複除去を含まないなど)を満たす場合に限り書き込みが可能であり、読み書きの互換性を無条件に保証するものではありません。条件を満たさないDBMS・列構成では、Step
              6と同様にINSTEAD OFトリガーを追加してclient側への書き込みを代行する実装が必要です。
            </p>
            <p>
              この移行期間の長さは組織によって様々です。Martin FowlerとPramod
              Sadalageの記事によれば、数ヶ月で終わる場合もあれば、大規模な組織では数年かかることもあると述べられています。重要なのは「移行期間をどれだけ短くできるか」ではなく、「移行期間中も新旧両方が安全に動き続けること」を保証する設計です。
            </p>
          </div>
        </section>

        {/* Section 20: Step 17 */}
        <section className="section" id="step17">
          <h2>
            <IconRocket size={24} />
            Step 17：現代における位置づけ — Flyway・Liquibaseと Expand/Contract パターン
          </h2>
          <div className="prose">
            <p>
              本書が出版された2006年当時、データベースマイグレーションを自動化する専用ツールはまだ黎明期でした。しかし本書とその考え方は、その後のツールチェーンの標準的な設計思想の土台になっています。
            </p>
          </div>
          <div className="diagram-wrap">
            <div className="mermaid-title">
              <IconChartDots3 size={18} />
              図：CI/CDパイプラインにおけるマイグレーションの自動化
            </div>
            <MermaidDiagram chart={chartD12} />
          </div>
          <div className="prose">
            <p>
              Martin FowlerとPramod Sadalageによる2016年改訂版の「Evolutionary Database
              Design」では、本書で示された考え方を土台に、Flyway・Liquibase・MyBatis
              Migrationsなどの具体的なツールでの実装例が追加され、CI/CDパイプラインの中でどう自動化するかが詳しく解説されています。さらにこの記事の中では、本書のStep
              6で紹介した「移行期間」の考え方が、Martin Fowlerのbliki上の別記事「Parallel
              Change」として独立して整理し直されており、現在では「Expand/Contract
              パターン」という呼び名で、ゼロダウンタイムデプロイやローリングデプロイを実現するための標準的な語彙として業界に広く定着しています。
            </p>
            <p>
              また、本書が提唱した「開発者は各自が自分専用のデータベースインスタンスを持つべきである」という実践は、当時はデータベースのライセンス費用や運用コストの高さから実現が難しいこともありましたが、クラウドネイティブなデータベース基盤の進化により、より低コストで実現しやすくなってきています。
            </p>
          </div>
          <div className="callout plum">
            <IconClock size={20} />
            <div className="callout-body">
              <span className="callout-title">補足(2026年9月時点)</span>
              <p>
                この「開発者ごとに独立したデータベースインスタンスを持つ」という考え方が、コピーオンライトによるブランチ機能を備えた新しいクラウドデータベース基盤の登場によって、より実践しやすくなってきているという指摘も見られます。技術の進化とともに、本書が2006年に示した理念がより実現しやすい形へと近づいている一例と言えるでしょう。
              </p>
            </div>
          </div>
        </section>

        {/* Section 21: Critical */}
        <section className="section" id="critical">
          <h2>
            <IconScale size={24} />
            批判的に読む — この本の限界と時代背景
          </h2>
          <div className="prose">
            <p>初学者が本書を手に取る前に知っておくとよい留意点をまとめます。</p>
          </div>
          <div className="callout gold">
            <IconCalendar size={20} />
            <div className="callout-body">
              <span className="callout-title">出版は2006年</span>
              <p>
                本文中のコード例はOracleとJavaを中心に書かれており、C#・C++・VB.NETや、DB2・SQL
                Server・MySQL・Sybaseへの応用は「読み替えれば可能」という位置づけです。当時はFlyway・Liquibaseのような専用マイグレーションツールがまだ存在しない、または黎明期だったため、本書自体はスクリプトを手作業に近い形で管理する前提で書かれています。
              </p>
            </div>
          </div>
          <div className="callout gold">
            <IconDatabaseOff size={20} />
            <div className="callout-body">
              <span className="callout-title">NoSQLやスキーマレスDBへの言及はない</span>
              <p>
                本書はリレーショナルデータベースを前提としています。NoSQLデータベースにおける「暗黙のスキーマ」の進化的な扱い方は、後年のMartin
                Fowlerの記事や『NoSQL Distilled』(Fowler・Sadalage共著)で補完的に扱われています。
              </p>
            </div>
          </div>
          <div className="callout gold">
            <IconListDetails size={20} />
            <div className="callout-body">
              <span className="callout-title">カタログの網羅性には既に限界がある</span>
              <p>
                2019年には研究者によって新しいカテゴリの追加提案がなされているなど、データベースリファクタリングというテーマ自体が本書出版後も学術的・実務的に発展を続けています。
              </p>
            </div>
          </div>
          <div className="callout forest">
            <IconCheck size={20} />
            <div className="callout-body">
              <span className="callout-title">それでも中核となる考え方は褪せていない</span>
              <p>
                「スキーマ・データ・アクセスコードの3つを同時に扱う」「移行期間を設けて段階的に変更する」「小さな変更を積み重ねる」という原則は、2016年のMartin
                Fowler・Sadalage共著記事、そして現在広く使われるExpand/Contractパターンにそのまま受け継がれており、内容の古さよりも先見性の方が際立つ一冊です。
              </p>
            </div>
          </div>
        </section>

        {/* Section 22: Glossary */}
        <section className="section" id="glossary">
          <h2>
            <IconBook2 size={24} />
            用語集
          </h2>
          <dl className="glossary">
            <dt>データベースリファクタリング</dt>
            <dd>
              意味論を変えずにデータベース設計を改善する小さな変更。スキーマ変更・データ移行・アクセスコード変更の3つを伴う
            </dd>
            <dt>データベースの臭い</dt>
            <dd>リファクタリングが必要であることを示す設計上の兆候</dd>
            <dt>破壊的な変更(destructive change)</dt>
            <dd>既存のアクセスコードを壊す可能性がある変更</dd>
            <dt>移行期間(transition period)</dt>
            <dd>新旧両方の構造を一定期間並行してサポートする期間</dd>
            <dt>Parallel Change / Expand-Contract</dt>
            <dd>
              移行期間の考え方を「拡張・移行・収縮」の3フェーズに整理した、現在広く使われる用語
            </dd>
            <dt>マイグレーションスクリプト</dt>
            <dd>
              スキーマ変更とデータ移行の内容を記述し、バージョン管理下に置く実行可能なスクリプト
            </dd>
            <dt>単一アプリケーションデータベース</dt>
            <dd>1つのアプリケーションだけが利用するデータベース</dd>
            <dt>共有データベース(Shared Database)</dt>
            <dd>複数のアプリケーションが同じデータベースを利用する構成</dd>
            <dt>サンドボックス</dt>
            <dd>開発者が他者に影響を与えずに自由に実験できる、自分専用のデータベース環境</dd>
            <dt>変換(Transformation)</dt>
            <dd>意味論そのものを変える、リファクタリングではない変更</dd>
          </dl>
        </section>

        {/* Section 23: Checklist */}
        <section className="section" id="checklist">
          <h2>
            <IconCheckbox size={24} />
            理解度チェックリスト
          </h2>
          <RefactoringDatabasesChecklist />
        </section>

        {/* Section 24: Summary */}
        <section className="section" id="summary">
          <h2>
            <IconFlag size={24} />
            まとめ
          </h2>
          <div className="prose">
            <p>
              『Refactoring Databases: Evolutionary Database
              Design』は、アジャイル開発においてアプリケーションコードと同じ速度でデータベースを安全に進化させるための方法論を、初めて体系立てて示した一冊です。中心にあるのは「小さな変更を積み重ねる」「スキーマ・データ・アクセスコードを常にセットで扱う」「移行期間を設けて段階的に変更する」というシンプルな原則であり、これらは2006年の出版から20年近く経った現在も、Flyway・Liquibaseといったマイグレーションツールや、ゼロダウンタイムデプロイの標準手法であるExpand/Contractパターンという形で開発現場に息づいています。まずは自分のプロジェクトで日常的に発生している「データベースの臭い」を1つ見つけ、本ガイドで紹介したメカニクスに沿って小さなリファクタリングを試してみることから始めるとよいでしょう。
            </p>
          </div>
        </section>

        {/* Section 25: References */}
        <section className="section" id="references">
          <h2>
            <IconExternalLink size={24} />
            参考文献
          </h2>
          <div className="prose">
            <p>
              本ガイドの作成にあたり、以下の情報源を参照しました。可能な限り、著者自身が公開している一次情報や、国際的に著名な開発者・組織による記事を優先しています。
            </p>
          </div>

          <div className="ref-group-label">
            <IconStar size={18} />
            著者自身・関係者による一次情報
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                Pramod Sadalage 公式カタログサイト「Refactoring
                Databases」(全リファクタリング一覧、翻訳版情報)
              </span>
              <Ext className="ref-url" href="https://databaserefactoring.com/">
                https://databaserefactoring.com/
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                Scott W. Ambler「The Agile Data (AD) Method: Catalog of Database Refactorings」
              </span>
              <Ext className="ref-url" href="https://agiledata.org/?p=3391">
                https://agiledata.org/?p=3391
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                Scott W. Ambler「Catalog of Database Refactorings: Referential Integrity
                Refactorings」
              </span>
              <Ext className="ref-url" href="https://agiledata.org/?p=3539">
                https://agiledata.org/?p=3539
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                Scott W. Ambler「Catalog of Database Refactorings: Architectural Refactorings」
              </span>
              <Ext className="ref-url" href="https://agiledata.org/?p=3551">
                https://agiledata.org/?p=3551
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                Scott W. Ambler「Catalog of Database Refactorings: Data Quality Refactorings」
              </span>
              <Ext className="ref-url" href="https://agiledata.org/?p=3520">
                https://agiledata.org/?p=3520
              </Ext>
            </div>
          </div>

          <div className="ref-group-label">
            <IconUserStar size={18} />
            Martin Fowler(国際的に著名なソフトウェアアーキテクト)による記事
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                Martin Fowler, Pramod Sadalage「Evolutionary Database Design」(2016年改訂版)
              </span>
              <Ext className="ref-url" href="https://martinfowler.com/articles/evodb.html">
                https://martinfowler.com/articles/evodb.html
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">Martin Fowler「ParallelChange」(bliki)</span>
              <Ext
                className="ref-url"
                href="https://www.martinfowler.com/bliki/ParallelChange.html"
              >
                https://www.martinfowler.com/bliki/ParallelChange.html
              </Ext>
            </div>
          </div>

          <div className="ref-group-label">
            <IconBuildingStore size={18} />
            出版社・書誌情報
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">O&apos;Reilly Online Learning 書籍ページ</span>
              <Ext
                className="ref-url"
                href="https://www.oreilly.com/library/view/refactoring-databases-evolutionary/0321293533/"
              >
                https://www.oreilly.com/library/view/refactoring-databases-evolutionary/0321293533/
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">InformIt 商品ページ</span>
              <Ext
                className="ref-url"
                href="https://www.informit.com/store/refactoring-databases-evolutionary-database-design-9780132652117"
              >
                https://www.informit.com/store/refactoring-databases-evolutionary-database-design-9780132652117
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">Pramod J. Sadalage 著者紹介(InformIt)</span>
              <Ext
                className="ref-url"
                href="https://www.informit.com/authors/bio/E26DAF98-2469-43EB-A05C-CA60B2F82A27"
              >
                https://www.informit.com/authors/bio/E26DAF98-2469-43EB-A05C-CA60B2F82A27
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">目次詳細(eBay掲載)</span>
              <Ext className="ref-url" href="https://www.ebay.com/p/102876595">
                https://www.ebay.com/p/102876595
              </Ext>
            </div>
          </div>

          <div className="ref-group-label">
            <IconNews size={18} />
            書評・解説記事
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                ACM Queue「Review of Refactoring Databases: Evolutionary Database
                Design」(原文は403で直接アクセス不可のためInternet Archive保存版を掲載)
              </span>
              <Ext
                className="ref-url"
                href="https://web.archive.org/web/20240710022711/https://queue.acm.org/detail.cfm?id=1160453"
              >
                https://web.archive.org/web/20240710022711/https://queue.acm.org/detail.cfm?id=1160453
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                Red Gate Simple Talk「Refactoring Databases: The Process」(本書第3章からの抜粋記事)
              </span>
              <Ext
                className="ref-url"
                href="https://www.red-gate.com/simple-talk/databases/sql-server/database-administration-sql-server/refactoring-databases-the-process/"
              >
                https://www.red-gate.com/simple-talk/databases/sql-server/database-administration-sql-server/refactoring-databases-the-process/
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                Red Gate Simple Talk「Database Refactoring」(構造リファクタリングの解説)
              </span>
              <Ext
                className="ref-url"
                href="https://www.red-gate.com/simple-talk/databases/sql-server/t-sql-programming-sql-server/database-refactoring/"
              >
                https://www.red-gate.com/simple-talk/databases/sql-server/t-sql-programming-sql-server/database-refactoring/
              </Ext>
            </div>
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                ApexSQL Solution Center「SQL database refactoring
                techniques」(データベースの臭いの解説)
              </span>
              <Ext className="ref-url" href="https://solutioncenter.apexsql.com/?p=3629">
                https://solutioncenter.apexsql.com/?p=3629
              </Ext>
            </div>
          </div>

          <div className="ref-group-label">
            <IconRefresh size={18} />
            現代の実践とのつながり
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                Pete Hodgson「Expand/Contract: making a breaking change without a big bang」
              </span>
              <Ext
                className="ref-url"
                href="https://blog.thepete.net/blog/2023/12/05/expand/contract-making-a-breaking-change-without-a-big-bang"
              >
                https://blog.thepete.net/blog/2023/12/05/expand/contract-making-a-breaking-change-without-a-big-bang
              </Ext>
            </div>
          </div>

          <div className="ref-group-label">
            <IconLanguageHiragana size={18} />
            日本語版情報
          </div>
          <div className="ref-card">
            <IconLink size={18} />
            <div className="ref-card-body">
              <span className="ref-card-title">
                「リファクタリング (データベース)」Weblio辞書(Wikipedia由来、日本語版書誌情報を含む)
              </span>
              <Ext className="ref-url" href="https://www.weblio.jp/content/Database+refactoring">
                https://www.weblio.jp/content/Database+refactoring
              </Ext>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>
            本ガイドはウェブ検索で得られた公開情報をもとに作成した非公式の学習補助資料であり、Addison-Wesley
            Professional、Pearson、Scott W. Ambler、Pramod J. Sadalage、Martin
            Fowler、ThoughtWorksとは提携・承認関係にありません。正確な内容は必ず原著および各参考文献の一次情報をご確認ください。
          </p>
          <p>作成日：2026年9月20日 / 情報基準日：2026年9月19日</p>
        </footer>
      </main>
    </div>
  );
}
