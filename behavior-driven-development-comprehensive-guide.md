# 🥒 BDD（振る舞い駆動開発）完全ガイド
>
> 世界トップクラスのソフトウェアアーキテクトが解説する、初学者から実践者まで対応したBDD決定版

---

## 📚 目次

1. [BDDとは何か？](#1-bddとは何か)
2. [BDDの基本：Given-When-Then構文](#2-bddの基本given-when-then構文)
3. [Gherkin記法の完全解説](#3-gherkin記法の完全解説)
4. [BDDの開発フロー](#4-bddの開発フロー)
5. [ツールチェーンの選定](#5-ツールチェーンの選定)
6. [Cucumber完全実装ガイド](#6-cucumber完全実装ガイド)
7. [pytest-bdd完全実装ガイド](#7-pytest-bdd完全実装ガイド)
8. [ステップ定義のベストプラクティス](#8-ステップ定義のベストプラクティス)
9. [フィクスチャとコンテキスト管理](#9-フィクスチャとコンテキスト管理)
10. [BDDとTDDの二重ループ](#10-bddとtddの二重ループ)
11. [受け入れテスト自動化（ATDD）](#11-受け入れテスト自動化atdd)
12. [BDDによるAPIテスト](#12-bddによるapiテスト)
13. [BDDによるUIテスト](#13-bddによるuiテスト)
14. [シナリオ設計のベストプラクティス](#14-シナリオ設計のベストプラクティス)
15. [CI/CDパイプラインとBDD](#15-cicdパイプラインとbdd)
16. [実践：ECサイト完全事例](#16-実践ecサイト完全事例)
17. [BDDのベストプラクティス総まとめ](#17-bddのベストプラクティス総まとめ)
18. [BDDのアンチパターン](#18-bddのアンチパターン)
19. [参考文献・ソース一覧](#19-参考文献ソース一覧)

---

## 1. BDDとは何か？

### 1.1 BDDの定義

**Behavior-Driven Development（振る舞い駆動開発）** は、Dan Northが2006年に提唱した開発手法です。TDD（テスト駆動開発）を発展させ、**ビジネス関係者・開発者・テスターが共通言語で「システムがどう振る舞うべきか」を先に定義し、それを実行可能な仕様として自動テストに落とし込む**アプローチです。

> 💡 **核心思想：**「テストは技術者のためだけのものではない。ビジネス側と技術側が同じ言葉でシステムの期待する振る舞いを記述し、その仕様そのものが自動テストとして動き続ける」

### 1.2 BDDが生まれた背景

```mermaid
timeline
    title BDDの歴史的背景
    2003年 : Kent Beck が TDD を体系化
           : 開発者向けの手法として普及
    2006年 : Dan North が BDD を提唱
           : 「TDDの命名問題」を解決するために
    2007年 : Cucumber（Ruby）の登場
           : 非エンジニアも読めるシナリオ記述が可能に
    2009年 : JBehave（Java）が普及
           : Gherkin記法が標準化される
    2010年代 : pytest-bdd / Behave（Python）登場
             : 各言語でBDDフレームワーク整備
    2020年代 : 現在はCI/CDに統合された標準的実践
             : 「Living Documentation」として活用
```

### 1.3 BDDが解決する問題

```mermaid
graph LR
    subgraph "BDD導入前の問題"
        P1["❌ 要件の認識齟齬<br>PO・開発者・QAが<br>異なる解釈をする"]
        P2["❌ テストが後付け<br>実装してからテストを書く<br>設計品質が上がらない"]
        P3["❌ 仕様書が陳腐化<br>コードと仕様書が乖離<br>誰も読まない文書に"]
        P4["❌ 受け入れ基準が曖昧<br>「完了」の定義がない<br>手戻りが多発する"]
    end

    subgraph "BDD導入後の効果"
        S1["✅ 共通言語で合意<br>Gherkin で全員が<br>同じ仕様を理解する"]
        S2["✅ 仕様→実装の順序<br>振る舞いを先に定義<br>設計品質が向上する"]
        S3["✅ 生きた仕様書<br>シナリオがそのまま<br>実行可能なテストになる"]
        S4["✅ 受け入れ基準が明確<br>シナリオが通れば完了<br>全員が納得できる"]
    end

    P1 --> S1
    P2 --> S2
    P3 --> S3
    P4 --> S4

    style P1 fill:#e74c3c,color:#fff
    style P2 fill:#e74c3c,color:#fff
    style P3 fill:#e74c3c,color:#fff
    style P4 fill:#e74c3c,color:#fff
    style S1 fill:#27ae60,color:#fff
    style S2 fill:#27ae60,color:#fff
    style S3 fill:#27ae60,color:#fff
    style S4 fill:#27ae60,color:#fff
```

### 1.4 TDD・BDD・ATDDの関係

```mermaid
graph TD
    subgraph "3つの手法の位置づけ"
        ATDD["🔵 ATDD<br>（Acceptance Test-Driven Development）<br>受け入れテスト駆動開発<br>顧客視点で受け入れ基準を定義"]

        BDD["🟢 BDD<br>（Behavior-Driven Development）<br>振る舞い駆動開発<br>Gherkin記法でシナリオを記述<br>ビジネス・技術の橋渡し"]

        TDD["🔴 TDD<br>（Test-Driven Development）<br>テスト駆動開発<br>コードレベルのユニットテスト<br>開発者中心"]

        ATDD -->|"外側のループ"| BDD
        BDD -->|"外側のループ"| TDD
        TDD -->|"内側のループ"| TDD
    end

    NOTE["BDDは ATDDの実践手法であり<br>TDDを補完する外側のループ"]

    style ATDD fill:#3498db,color:#fff
    style BDD fill:#27ae60,color:#fff
    style TDD fill:#e74c3c,color:#fff
```

### 1.5 BDDが適しているチームと状況

```mermaid
mindmap
    root((BDD適用が<br>効果的な場面))
        チーム構成
            PO・BA・開発者・QAが混在
            ビジネス側が仕様に関与する
            コミュニケーション課題がある
        プロジェクト特性
            複雑なビジネスルールがある
            受け入れ基準が曖昧になりやすい
            長期的に保守されるシステム
        組織文化
            アジャイル・スクラム導入済み
            Three Amigos の実践
            継続的なフィードバックを重視
        技術的背景
            回帰テストの自動化が必要
            リグレッションが頻発している
            ドキュメントが陳腐化している
```

---

## 2. BDDの基本：Given-When-Then構文

### 2.1 Given-When-Then の構造

```mermaid
graph TD
    GWT["🎯 Given-When-Then（GWT）構文"]

    GWT --> GIVEN["📋 Given（前提条件）<br>テストの初期状態を記述する<br>「〜の状態において」<br>「〜が〜である場合」"]

    GWT --> WHEN["⚡ When（操作・イベント）<br>ユーザーまたはシステムのアクションを記述<br>「〜したとき」<br>「〜が発生したとき」"]

    GWT --> THEN["✅ Then（期待される結果）<br>システムが示すべき振る舞いを記述<br>「〜になるはずである」<br>「〜が表示されるはずである」"]

    GIVEN --> G_EX["例：顧客がカートに商品を2点入れている"]
    WHEN  --> W_EX["例：顧客がチェックアウトボタンを押す"]
    THEN  --> T_EX["例：注文確認ページが表示される"]

    style GIVEN fill:#3498db,color:#fff
    style WHEN fill:#e67e22,color:#fff
    style THEN fill:#27ae60,color:#fff
```

### 2.2 Given-When-Then とユーザーストーリーの関係

```mermaid
flowchart LR
    subgraph US["📖 ユーザーストーリー"]
        STORY["As a（役割として）：<br>登録済みの顧客として<br><br>I want（したいこと）：<br>カートに商品を追加したい<br><br>So that（理由・価値）：<br>まとめて購入できるから"]
    end

    subgraph SCENARIO["🥒 BDDシナリオ（具体的な振る舞い）"]
        SC1["Scenario: 商品をカートに追加する<br>  Given 登録済みの顧客がログインしている<br>  And カートが空の状態である<br>  When 商品「Tシャツ（1,000円）」を1点追加する<br>  Then カートに1点の商品が入っている<br>  And カートの合計金額は1,000円である"]

        SC2["Scenario: 在庫切れ商品はカートに追加できない<br>  Given 登録済みの顧客がログインしている<br>  And 商品「ジーンズ」の在庫が0点である<br>  When 商品「ジーンズ」をカートに追加しようとする<br>  Then 「在庫切れのため追加できません」と表示される<br>  And カートの中身は変わらない"]
    end

    US -->|"具体化"| SCENARIO

    style US fill:#ebf5fb
    style SCENARIO fill:#e8fde8
```

### 2.3 良い Given-When-Then の書き方

```mermaid
graph TD
    subgraph "✅ 良い GWT の例"
        G1["Given 顧客の口座残高が 10,000円 である<br>When 顧客が 3,000円 を引き出す<br>Then 口座残高は 7,000円 になる<br>And 取引明細に「出金 3,000円」が記録される"]
        NOTE_G1["✅ 具体的な数値<br>✅ 1シナリオ1ふるまい<br>✅ ビジネス語彙を使用"]
    end

    subgraph "❌ 悪い GWT の例"
        B1["Given システムが正常な状態<br>When ボタンをクリックする<br>Then データが保存される"]
        NOTE_B1["❌ 「正常な状態」が曖昧<br>❌「ボタン」がどのボタンか不明<br>❌「保存される」の検証基準がない"]
    end

    style G1 fill:#27ae60,color:#fff
    style NOTE_G1 fill:#27ae60,color:#fff
    style B1 fill:#e74c3c,color:#fff
    style NOTE_B1 fill:#e74c3c,color:#fff
```

---

## 3. Gherkin記法の完全解説

### 3.1 Gherkin の全キーワード

```mermaid
graph TD
    GHERKIN["🥒 Gherkin 記法の全キーワード"]

    GHERKIN --> FEATURE["Feature（機能）<br>テストする機能の説明<br>ファイルの最初に1つだけ記述"]

    GHERKIN --> BACKGROUND["Background（背景）<br>すべてのシナリオで共通の前提条件<br>Featureの最初に記述"]

    GHERKIN --> SCENARIO["Scenario（シナリオ）<br>1つの具体的なテストケース<br>明確なタイトルをつける"]

    GHERKIN --> SCENARIO_OUTLINE["Scenario Outline（シナリオアウトライン）<br>パラメータ化されたシナリオ<br>Examplesテーブルと組み合わせる"]

    GHERKIN --> STEPS["ステップキーワード"]
    STEPS --> GIVEN_K["Given（前提条件）"]
    STEPS --> WHEN_K["When（操作）"]
    STEPS --> THEN_K["Then（期待結果）"]
    STEPS --> AND_K["And / But（前のステップの継続）"]

    GHERKIN --> EXAMPLES["Examples（例）<br>Scenario Outlineのパラメータテーブル"]

    GHERKIN --> TAGS["@タグ<br>シナリオの分類・フィルタリング<br>例：@smoke @regression @wip"]

    GHERKIN --> DOC_STRING["\"\"\"（DocString）<br>複数行テキストの記述<br>JSONやSQLなど長いデータに使用"]

    GHERKIN --> DATA_TABLE["| テーブル |<br>表形式のデータ記述<br>複数のパラメータを整理して渡す"]

    style FEATURE fill:#3498db,color:#fff
    style BACKGROUND fill:#8e44ad,color:#fff
    style SCENARIO fill:#27ae60,color:#fff
    style SCENARIO_OUTLINE fill:#e67e22,color:#fff
    style STEPS fill:#e74c3c,color:#fff
    style TAGS fill:#1abc9c,color:#fff
```

### 3.2 Featureファイルの完全記述例

```gherkin
# features/shopping_cart.feature

# タグでシナリオを分類する
@shopping @cart
Feature: ショッピングカートの操作
  登録済みの顧客として
  カートに商品を追加・削除・変更したい
  まとめて購入を確定できるから

  # すべてのシナリオで共通の前提条件
  Background:
    Given 以下の商品がカタログに登録されている
      | 商品ID   | 商品名   | 価格  | 在庫数 |
      | prod_001 | Tシャツ  | 1000  | 10     |
      | prod_002 | ジーンズ | 5000  | 3      |
      | prod_003 | キャップ | 2000  | 0      |
    And 顧客「山田太郎（cust_001）」がログインしている

  # ─── シナリオ1：基本的な追加 ───
  @smoke
  Scenario: 商品をカートに追加する
    Given カートが空の状態である
    When 商品「Tシャツ」を 1 点カートに追加する
    Then カートには 1 点の商品が入っている
    And カートの合計金額は 1,000円 である

  # ─── シナリオ2：複数商品の追加 ───
  Scenario: 複数の異なる商品をカートに追加する
    Given カートが空の状態である
    When 商品「Tシャツ」を 2 点カートに追加する
    And 商品「ジーンズ」を 1 点カートに追加する
    Then カートには 3 点の商品が入っている
    And カートの合計金額は 7,000円 である

  # ─── シナリオ3：在庫切れ ───
  @negative
  Scenario: 在庫切れの商品はカートに追加できない
    Given カートが空の状態である
    When 商品「キャップ」をカートに追加しようとする
    Then 「在庫切れのため追加できません」というエラーが表示される
    And カートの中身は変わらない

  # ─── シナリオ4：パラメータ化テスト ───
  @parameterized
  Scenario Outline: 異なる数量で商品をカートに追加する
    Given カートが空の状態である
    When 商品「Tシャツ」を <数量> 点カートに追加する
    Then カートの合計金額は <合計金額> 円である

    Examples:
      | 数量 | 合計金額 |
      | 1    | 1000     |
      | 2    | 2000     |
      | 5    | 5000     |
      | 10   | 10000    |

  # ─── シナリオ5：カートからの削除 ───
  Scenario: カートから商品を削除する
    Given カートに以下の商品が入っている
      | 商品名   | 数量 |
      | Tシャツ  | 2    |
      | ジーンズ | 1    |
    When カートから「Tシャツ」を削除する
    Then カートには「ジーンズ」1点のみ入っている
    And カートの合計金額は 5,000円 である

  # ─── シナリオ6：DocStringの使用 ───
  @api
  Scenario: APIを通じて注文を作成する
    Given カートに商品「Tシャツ」が 1 点入っている
    When 以下のJSONで注文を送信する
      """
      {
        "shipping_address": {
          "postal_code": "150-0001",
          "prefecture": "東京都",
          "city": "渋谷区",
          "street": "神宮前1-1-1"
        },
        "payment_method": "credit_card"
      }
      """
    Then レスポンスステータスは 201 である
    And レスポンスに "order_id" フィールドが含まれている
```

### 3.3 Gherkin キーワードの使い分け

```mermaid
flowchart TD
    WRITE["シナリオを書き始める"]

    Q1{"これは前提条件か？<br>（初期状態の設定）"}
    Q2{"これはユーザーの<br>操作・イベントか？"}
    Q3{"これは期待される<br>結果・振る舞いか？"}
    Q4{"前のステップと<br>同じ種類の記述か？"}

    USE_GIVEN["Given を使う<br>例：Given ユーザーがログインしている"]
    USE_WHEN["When を使う<br>例：When 注文ボタンを押す"]
    USE_THEN["Then を使う<br>例：Then 注文完了画面が表示される"]
    USE_AND["And / But を使う<br>例：And カートが空になる"]

    WRITE --> Q1
    Q1 -->|"Yes"| USE_GIVEN
    Q1 -->|"No"| Q2
    Q2 -->|"Yes"| USE_WHEN
    Q2 -->|"No"| Q3
    Q3 -->|"Yes"| USE_THEN
    Q3 -->|"No（追加条件）"| Q4
    Q4 -->|"Yes（継続）"| USE_AND

    style USE_GIVEN fill:#3498db,color:#fff
    style USE_WHEN fill:#e67e22,color:#fff
    style USE_THEN fill:#27ae60,color:#fff
    style USE_AND fill:#8e44ad,color:#fff
```

---

## 4. BDDの開発フロー

### 4.1 BDDの全体開発サイクル

```mermaid
flowchart TD
    DISCOVER["🔍 1. Discovery（発見）<br>Three Amigos ミーティング<br>PO・開発者・QAが集まって<br>機能の振る舞いを議論する"]

    FORMULATE["📝 2. Formulation（定式化）<br>Gherkin 記法でシナリオを記述<br>具体的な例（Example）を<br>使って仕様を明確化する"]

    AUTOMATE["⚙️ 3. Automation（自動化）<br>シナリオをステップ定義に変換<br>自動テストとして実行可能にする<br>（失敗するテストが先）"]

    VALIDATE["✅ 4. Validate（検証）<br>シナリオをパスする実装を行う<br>ビジネス側が結果を確認する<br>「これが私が求めていたもの」"]

    LIVING["📚 5. Living Documentation（生きた仕様書）<br>シナリオは常に最新の仕様書<br>コードとドキュメントが一致<br>リグレッションを自動的に検出"]

    DISCOVER --> FORMULATE --> AUTOMATE --> VALIDATE --> LIVING
    LIVING -->|"次の機能へ"| DISCOVER

    style DISCOVER fill:#3498db,color:#fff
    style FORMULATE fill:#8e44ad,color:#fff
    style AUTOMATE fill:#e74c3c,color:#fff
    style VALIDATE fill:#27ae60,color:#fff
    style LIVING fill:#2c3e50,color:#fff
```

### 4.2 Three Amigos ミーティング

```mermaid
graph TD
    subgraph THREE_AMIGOS["👥 Three Amigos（3人の友人）"]
        PO["🎯 Product Owner<br>（プロダクトオーナー）<br>ビジネス要件・優先度<br>「何を作るか」"]
        DEV["💻 Developer<br>（開発者）<br>技術的実現可能性<br>「どう作るか」"]
        QA["🔍 Tester / QA<br>（テスター/QA）<br>品質・リスク・エッジケース<br>「何が壊れうるか」"]
    end

    MEETING["📋 Three Amigos Meeting<br>具体的なシナリオを一緒に作成する<br>認識のズレを最も安く解決する場"]

    PO --> MEETING
    DEV --> MEETING
    QA --> MEETING

    MEETING --> OUTPUT["📄 合意されたシナリオ<br>（Featureファイル）<br>全員が「Yes, that's right」と言える仕様"]

    style PO fill:#3498db,color:#fff
    style DEV fill:#27ae60,color:#fff
    style QA fill:#e74c3c,color:#fff
    style MEETING fill:#f39c12,color:#fff
    style OUTPUT fill:#2c3e50,color:#fff
```

### 4.3 BDDスプリントの組み込み方

```mermaid
sequenceDiagram
    participant PO as Product Owner
    participant DEV as 開発者
    participant QA as QA
    participant CODE as コードベース

    Note over PO,CODE: スプリント計画フェーズ

    PO->>PO: ユーザーストーリーを準備
    PO->>DEV: ストーリーを共有
    PO->>QA: ストーリーを共有

    Note over PO,CODE: Three Amigos セッション

    PO->>PO: ビジネスルールを説明
    QA->>QA: エッジケースを提案
    DEV->>DEV: 技術的考慮を共有
    PO->>CODE: Featureファイルをコミット

    Note over PO,CODE: 開発フェーズ（BDD サイクル）

    DEV->>CODE: ステップ定義を作成（Red）
    DEV->>CODE: 実装コードを作成（Green）
    DEV->>CODE: リファクタリング（Refactor）
    DEV->>QA: レビュー依頼

    Note over PO,CODE: 受け入れフェーズ

    QA->>CODE: 全シナリオを実行
    CODE-->>QA: テスト結果レポート
    QA->>PO: 結果を共有
    PO->>PO: 期待通りか確認
    PO-->>DEV: 承認 ✅（またはフィードバック）
```

---

## 5. ツールチェーンの選定

### 5.1 言語別BDDフレームワーク比較

```mermaid
graph TD
    BDD_TOOLS["🛠️ BDDフレームワーク（言語別）"]

    BDD_TOOLS --> RUBY["💎 Ruby<br>Cucumber（オリジナル）<br>RSpec（TDD/BDD統合）"]

    BDD_TOOLS --> JAVA["☕ Java<br>Cucumber-JVM<br>JBehave<br>Serenity BDD"]

    BDD_TOOLS --> PYTHON["🐍 Python<br>pytest-bdd（推奨）<br>Behave<br>Lettuce"]

    BDD_TOOLS --> JAVASCRIPT["🟨 JavaScript / TypeScript<br>Cucumber.js<br>Jest + jest-cucumber<br>WebdriverIO + Cucumber"]

    BDD_TOOLS --> DOTNET["🔵 .NET / C#<br>SpecFlow（最人気）<br>NUnit + Gherkin"]

    PYTHON --> PY_REC["✅ pytest-bdd 推奨理由<br>・pytestのエコシステムと統合<br>・フィクスチャが強力<br>・CI/CDとの親和性が高い"]

    style RUBY fill:#e74c3c,color:#fff
    style JAVA fill:#f39c12,color:#fff
    style PYTHON fill:#3498db,color:#fff
    style JAVASCRIPT fill:#f1c40f,color:#333
    style DOTNET fill:#8e44ad,color:#fff
    style PY_REC fill:#27ae60,color:#fff
```

### 5.2 ツールチェーン選定フロー

```mermaid
flowchart TD
    START["BDDツールを選ぶ"]

    Q1{"主要な開発言語は？"}
    Q2{"UIテストも含めるか？"}
    Q3{"既存のテストフレームワークは？"}
    Q4{"チームサイズは？"}

    PY_REC2["✅ pytest-bdd<br>シンプル・pytest統合"]
    PY_BEH["✅ Behave<br>Cucumberに近い構文"]
    JAVA_CUC["✅ Cucumber-JVM<br>Javaの標準的選択"]
    JS_CUC["✅ Cucumber.js<br>JS/TSの選択"]
    SPECFLOW["✅ SpecFlow<br>.NETの標準的選択"]
    WITH_UI["+ Playwright / Selenium<br>UIテスト統合"]

    START --> Q1
    Q1 -->|"Python"| Q3
    Q1 -->|"Java"| JAVA_CUC
    Q1 -->|"JavaScript"| JS_CUC
    Q1 -->|".NET"| SPECFLOW
    Q3 -->|"pytest使用中"| PY_REC2
    Q3 -->|"その他"| PY_BEH
    PY_REC2 --> Q2
    Q2 -->|"Yes"| WITH_UI
    Q2 -->|"No"| Q4

    style PY_REC2 fill:#27ae60,color:#fff
    style WITH_UI fill:#3498db,color:#fff
```

### 5.3 完全なBDDツールスタック（Python）

```mermaid
graph TD
    subgraph STACK["🐍 Python BDDツールスタック"]
        GH["📄 Gherkin<br>Feature ファイル記述"]
        PYTEST_BDD["🥒 pytest-bdd<br>ステップ定義・シナリオ実行"]
        PYTEST["🧪 pytest<br>テストランナー・フィクスチャ"]
        HTTPX["🌐 httpx / requests<br>APIテスト"]
        PLAYWRIGHT["🎭 Playwright<br>UIテスト（E2E）"]
        FACTORY["🏭 factory_boy<br>テストデータ生成"]
        ALLURE["📊 Allure<br>テストレポート生成"]
        TESTCONTAINERS["🐳 TestContainers<br>DB統合テスト"]
    end

    GH --> PYTEST_BDD
    PYTEST_BDD --> PYTEST
    PYTEST --> HTTPX & PLAYWRIGHT
    PYTEST --> FACTORY
    PYTEST --> TESTCONTAINERS
    PYTEST --> ALLURE

    style GH fill:#27ae60,color:#fff
    style PYTEST_BDD fill:#3498db,color:#fff
    style PYTEST fill:#e74c3c,color:#fff
    style ALLURE fill:#f39c12,color:#fff
```

---

## 6. Cucumber完全実装ガイド

### 6.1 Cucumberのアーキテクチャ

```mermaid
graph TD
    FEATURE_FILE["📄 Feature ファイル<br>（.feature）<br>Gherkin 記法で記述"]
    STEP_DEF["⚙️ Step Definitions<br>（ステップ定義）<br>各ステップの実装コード"]
    SUPPORT["🛠️ Support / Hooks<br>Before/After/BeforeAll<br>共通処理・フィクスチャ"]
    APP_CODE["💻 Application Code<br>テスト対象のアプリケーション"]
    REPORT["📊 Test Report<br>Allure / Cucumber HTML"]

    FEATURE_FILE -->|"マッチング"| STEP_DEF
    STEP_DEF -->|"呼び出し"| APP_CODE
    SUPPORT -->|"前後処理"| STEP_DEF
    STEP_DEF --> REPORT
    APP_CODE --> REPORT

    style FEATURE_FILE fill:#27ae60,color:#fff
    style STEP_DEF fill:#3498db,color:#fff
    style SUPPORT fill:#8e44ad,color:#fff
    style APP_CODE fill:#e67e22,color:#fff
    style REPORT fill:#2c3e50,color:#fff
```

### 6.2 Cucumber（Java）実装例

```java
// src/test/resources/features/shopping_cart.feature
// ↑ Feature ファイルは既出のGherkin記法で記述

// src/test/java/steps/ShoppingCartSteps.java

package steps;

import io.cucumber.java.ja.*;
import io.cucumber.java.*;
import static org.assertj.core.api.Assertions.*;

public class ShoppingCartSteps {

    private ShoppingCart cart;
    private ProductCatalog catalog;
    private Exception lastException;

    // ─── Before / After ───

    @Before
    public void setUp() {
        catalog = new InMemoryProductCatalog();
        cart = new ShoppingCart(catalog);
    }

    @After
    public void tearDown() {
        cart = null;
    }

    // ─── Given ステップ ───

    @Given("カートが空の状態である")
    public void カートが空の状態である() {
        assertThat(cart.isEmpty()).isTrue();
    }

    @Given("顧客{string}がログインしている")
    public void 顧客がログインしている(String customerName) {
        // 認証処理（テスト用スタブ）
        AuthContext.login(customerName);
    }

    // ─── When ステップ ───

    @When("商品{string}を {int} 点カートに追加する")
    public void 商品をカートに追加する(String productName, int quantity) {
        try {
            Product product = catalog.findByName(productName);
            cart.addItem(product.getId(), quantity);
        } catch (Exception e) {
            lastException = e;
        }
    }

    // ─── Then ステップ ───

    @Then("カートには {int} 点の商品が入っている")
    public void カートには点の商品が入っている(int expectedCount) {
        assertThat(cart.getTotalQuantity()).isEqualTo(expectedCount);
    }

    @Then("カートの合計金額は {int}円 である")
    public void カートの合計金額は円である(int expectedTotal) {
        assertThat(cart.getTotal()).isEqualTo(expectedTotal);
    }

    @Then("{string}というエラーが表示される")
    public void エラーが表示される(String expectedMessage) {
        assertThat(lastException).isNotNull();
        assertThat(lastException.getMessage()).contains(expectedMessage);
    }
}
```

---

## 7. pytest-bdd完全実装ガイド

### 7.1 プロジェクト構成

```text
my_project/
│
├── features/                        # Featureファイル
│   ├── shopping_cart.feature
│   ├── order.feature
│   └── payment.feature
│
├── tests/
│   └── bdd/                         # BDDテストコード
│       ├── conftest.py              # フィクスチャ・フック定義
│       ├── steps/                   # ステップ定義
│       │   ├── __init__.py
│       │   ├── cart_steps.py        # カート操作のステップ定義
│       │   ├── order_steps.py       # 注文のステップ定義
│       │   └── common_steps.py      # 共通ステップ定義
│       └── test_scenarios.py        # シナリオとステップのバインディング
│
├── src/                             # アプリケーションコード
│   ├── domain/
│   │   ├── cart.py
│   │   ├── order.py
│   │   └── product.py
│   └── application/
│       └── cart_service.py
│
├── pyproject.toml                   # pytest-bdd設定
└── pytest.ini
```

### 7.2 pytest-bdd の実装例（完全版）

```python
# features/shopping_cart.feature は前述のGherkin記法で定義済み

# ─────────────────────────────────────────
# tests/bdd/conftest.py：共通フィクスチャ定義
# ─────────────────────────────────────────

import pytest
from src.domain.product import Product
from src.domain.cart import ShoppingCart
from src.infrastructure.in_memory_catalog import InMemoryProductCatalog


@pytest.fixture
def product_catalog():
    """テスト用商品カタログ（インメモリ）"""
    catalog = InMemoryProductCatalog()
    return catalog


@pytest.fixture
def shopping_cart(product_catalog):
    """テスト用ショッピングカート"""
    return ShoppingCart(catalog=product_catalog)


@pytest.fixture
def context():
    """
    シナリオをまたぐコンテキスト（状態共有）
    pytest-bdd では辞書でステップ間の状態を共有する
    """
    return {}
```

```python
# ─────────────────────────────────────────
# tests/bdd/steps/cart_steps.py：ステップ定義
# ─────────────────────────────────────────

import pytest
from pytest_bdd import given, when, then, parsers
from src.domain.cart import ShoppingCart, InsufficientStockError
from src.domain.product import Product
from decimal import Decimal


# ─────────── Given ステップ ───────────

@given("カートが空の状態である")
def cart_is_empty(shopping_cart):
    """カートが空であることを確認"""
    assert shopping_cart.is_empty, "カートは空でなければなりません"


@given(parsers.parse("商品「{product_name}」の在庫が{stock:d}点である"),
       target_fixture="stock_setup")
def set_product_stock(product_name, stock, product_catalog, context):
    """商品の在庫数を設定する"""
    product = product_catalog.find_by_name(product_name)
    product_catalog.update_stock(product.id, stock)
    context["last_product"] = product


@given(parsers.parse("カートに商品「{product_name}」が{quantity:d}点入っている"))
def cart_has_items(product_name, quantity, shopping_cart, product_catalog):
    """カートに指定商品を事前に追加する"""
    product = product_catalog.find_by_name(product_name)
    shopping_cart.add_item(product.id, quantity)


@given("カートに以下の商品が入っている")
def cart_has_multiple_items(shopping_cart, product_catalog, datatable):
    """テーブルで指定された複数商品をカートに追加する"""
    for row in datatable:
        product = product_catalog.find_by_name(row["商品名"])
        shopping_cart.add_item(product.id, int(row["数量"]))


# ─────────── When ステップ ───────────

@when(parsers.parse("商品「{product_name}」を{quantity:d}点カートに追加する"))
def add_item_to_cart(product_name, quantity, shopping_cart, product_catalog, context):
    """カートに商品を追加する（例外もキャッチ）"""
    context["last_error"] = None
    try:
        product = product_catalog.find_by_name(product_name)
        shopping_cart.add_item(product.id, quantity)
        context["added_product"] = product
        context["added_quantity"] = quantity
    except InsufficientStockError as e:
        context["last_error"] = e


@when(parsers.parse("商品「{product_name}」をカートに追加しようとする"))
def try_add_out_of_stock_item(product_name, shopping_cart, product_catalog, context):
    """在庫切れ商品をカートに追加しようとする"""
    context["last_error"] = None
    try:
        product = product_catalog.find_by_name(product_name)
        shopping_cart.add_item(product.id, 1)
    except InsufficientStockError as e:
        context["last_error"] = e


@when(parsers.parse("カートから「{product_name}」を削除する"))
def remove_item_from_cart(product_name, shopping_cart, product_catalog):
    """カートから商品を削除する"""
    product = product_catalog.find_by_name(product_name)
    shopping_cart.remove_item(product.id)


# ─────────── Then ステップ ───────────

@then(parsers.parse("カートには{expected_count:d}点の商品が入っている"))
def cart_has_count(expected_count, shopping_cart):
    """カート内の商品数を検証"""
    assert shopping_cart.total_quantity == expected_count, (
        f"期待: {expected_count}点, 実際: {shopping_cart.total_quantity}点"
    )


@then(parsers.parse("カートの合計金額は{expected_total:d}円である"))
def cart_total_is(expected_total, shopping_cart):
    """カートの合計金額を検証"""
    assert shopping_cart.total == Decimal(str(expected_total)), (
        f"期待: {expected_total}円, 実際: {shopping_cart.total}円"
    )


@then(parsers.parse("「{expected_message}」というエラーが表示される"))
def error_message_displayed(expected_message, context):
    """エラーメッセージを検証"""
    assert context["last_error"] is not None, "エラーが発生しませんでした"
    assert expected_message in str(context["last_error"]), (
        f"期待: '{expected_message}', 実際: '{str(context['last_error'])}'"
    )


@then("カートの中身は変わらない")
def cart_is_unchanged(shopping_cart, context):
    """カートの状態が変更されていないことを検証"""
    # 初期状態（例: context["initial_cart"]）と比較する
    expected_items = context.get("initial_cart", [])
    assert shopping_cart.items == expected_items, (
        f"カートの状態が変わっています。期待: {expected_items}, 実際: {shopping_cart.items}"
    )
```

```python
# ─────────────────────────────────────────
# tests/bdd/test_scenarios.py：シナリオとステップのバインディング
# ─────────────────────────────────────────

import pytest
from pytest_bdd import scenario


# シナリオをFeatureファイルにバインド
@scenario("../../features/shopping_cart.feature", "商品をカートに追加する")
def test_add_item_to_cart():
    """カートへの商品追加シナリオ"""
    pass


@scenario("../../features/shopping_cart.feature", "複数の異なる商品をカートに追加する")
def test_add_multiple_items():
    """複数商品追加シナリオ"""
    pass


@scenario("../../features/shopping_cart.feature", "在庫切れの商品はカートに追加できない")
def test_cannot_add_out_of_stock():
    """在庫切れ商品の追加不可シナリオ"""
    pass


@scenario("../../features/shopping_cart.feature", "カートから商品を削除する")
def test_remove_item_from_cart():
    """カートからの商品削除シナリオ"""
    pass
```

### 7.3 pytest-bdd のシナリオアウトライン実装

```python
# tests/bdd/test_parametrized_scenarios.py

import pytest
from pytest_bdd import scenario, given, when, then, parsers
from decimal import Decimal


# シナリオアウトラインは pytest.mark.parametrize と組み合わせる

@pytest.mark.parametrize("scenario_name,数量,合計金額", [
    ("数量1", "1",  "1000"),
    ("数量2", "2",  "2000"),
    ("数量5", "5",  "5000"),
    ("数量10","10", "10000"),
])
def test_add_different_quantities(scenario_name, 数量, 合計金額,
                                   shopping_cart, product_catalog):
    """
    Scenario Outline の pytest-bdd 実装
    数量によって合計金額が変わることを検証
    """
    # Given
    assert shopping_cart.is_empty

    # When
    product = product_catalog.find_by_name("Tシャツ")
    shopping_cart.add_item(product.id, int(数量))

    # Then
    assert shopping_cart.total == Decimal(合計金額)
```

---

## 8. ステップ定義のベストプラクティス

### 8.1 良いステップ定義の設計

```mermaid
graph TD
    subgraph "✅ 良いステップ定義"
        G1["再利用可能な汎用ステップを書く<br>「商品をカートに追加する」は<br>複数シナリオで使えるよう設計する"]
        G2["1ステップ = 1つの明確な操作<br>複数の操作を1ステップにまとめない<br>デバッグしやすくなる"]
        G3["ビジネス語彙を使った命名<br>「HTTPリクエストを送信する」ではなく<br>「商品をカートに追加する」"]
        G4["パラメータで柔軟に対応<br>「{product_name}を{quantity}点追加する」<br>正規表現またはparsers.parseを使用"]
        G5["例外もキャッチして context に保存<br>Then ステップでエラー検証できるように<br>context['last_error'] パターン"]
    end

    subgraph "❌ 悪いステップ定義"
        B1["UI操作の詳細をステップに記述<br>「id='add-btn' のボタンをクリックする」<br>実装変更のたびにステップが壊れる"]
        B2["長すぎるステップ文<br>1ステップで複数のことを検証<br>テストの意図が不明確になる"]
        B3["技術的な詳細が露出している<br>「GETリクエストを /api/v1/cart へ送る」<br>ビジネス語彙でなく実装詳細"]
    end

    style G1 fill:#27ae60,color:#fff
    style G2 fill:#27ae60,color:#fff
    style G3 fill:#27ae60,color:#fff
    style G4 fill:#27ae60,color:#fff
    style G5 fill:#27ae60,color:#fff
    style B1 fill:#e74c3c,color:#fff
    style B2 fill:#e74c3c,color:#fff
    style B3 fill:#e74c3c,color:#fff
```

### 8.2 ステップの共通化とモジュール化

```mermaid
flowchart TD
    subgraph "ステップの分類と配置"
        COMMON["common_steps.py<br>（全Feature共通）<br>・ログイン/ログアウト<br>・時刻の設定<br>・メール確認"]

        DOMAIN_STEPS["domain_steps.py<br>（ドメイン別）<br>・cart_steps.py<br>・order_steps.py<br>・payment_steps.py"]

        API_STEPS["api_steps.py<br>（API共通）<br>・HTTPリクエスト送信<br>・レスポンス検証<br>・ステータスコード確認"]

        UI_STEPS["ui_steps.py<br>（UI共通）<br>・ページ遷移<br>・要素の表示確認<br>・フォーム入力"]
    end

    FEATURE_FILES["Featureファイル"] --> COMMON
    FEATURE_FILES --> DOMAIN_STEPS
    FEATURE_FILES --> API_STEPS
    FEATURE_FILES --> UI_STEPS

    style COMMON fill:#8e44ad,color:#fff
    style DOMAIN_STEPS fill:#3498db,color:#fff
    style API_STEPS fill:#27ae60,color:#fff
    style UI_STEPS fill:#e67e22,color:#fff
```

### 8.3 データテーブルとDocStringの活用

```python
# ─── データテーブルの処理 ───

@given("以下の商品がカタログに登録されている")
def products_registered_in_catalog(datatable, product_catalog):
    """
    データテーブル形式の前提条件
    Gherkin:
      | 商品ID   | 商品名   | 価格  | 在庫数 |
      | prod_001 | Tシャツ  | 1000  | 10     |
    """
    for row in datatable:
        product = Product(
            id=row["商品ID"],
            name=row["商品名"],
            price=Decimal(row["価格"]),
            stock=int(row["在庫数"]),
        )
        product_catalog.register(product)


# ─── DocString（複数行テキスト）の処理 ───

import json
import httpx

@when("以下のJSONで注文を送信する")
def send_order_request(docstring, context, api_client):
    """
    DocString形式のリクエストボディ
    Gherkin:
      \"\"\"
      { "shipping_address": {...} }
      \"\"\"
    """
    request_body = json.loads(docstring)
    response = api_client.post("/v1/orders", json=request_body)
    context["last_response"] = response


@then(parsers.parse("レスポンスステータスは {status_code:d} である"))
def response_status_is(status_code, context):
    """HTTPステータスコードの検証"""
    actual = context["last_response"].status_code
    assert actual == status_code, (
        f"期待: {status_code}, 実際: {actual}\n"
        f"レスポンス: {context['last_response'].text}"
    )
```

---

## 9. フィクスチャとコンテキスト管理

### 9.1 pytest-bdd フィクスチャの設計

```mermaid
graph TD
    subgraph "フィクスチャのスコープ"
        SESSION_F["session スコープ<br>テストセッション全体で1回<br>・DB接続の初期化<br>・テストデータの一括作成"]

        MODULE_F["module スコープ<br>モジュール（ファイル）単位<br>・モジュール共通の設定"]

        FUNCTION_F["function スコープ（デフォルト）<br>各テスト関数ごとに新規作成<br>・テスト間の独立性を保証<br>・最も安全な選択"]

        CLASS_F["class スコープ<br>クラス単位<br>・クラス内テストで状態共有"]
    end

    SESSION_F --> HEAVY["重い初期化処理に使用<br>（1回だけ）"]
    FUNCTION_F --> RECOMMENDED["BDDシナリオには<br>function スコープを推奨<br>（テスト間の独立性）"]

    style SESSION_F fill:#3498db,color:#fff
    style MODULE_F fill:#8e44ad,color:#fff
    style FUNCTION_F fill:#27ae60,color:#fff
    style RECOMMENDED fill:#27ae60,color:#fff
```

### 9.2 コンテキスト管理の実装

```python
# tests/bdd/conftest.py

import pytest
from dataclasses import dataclass, field
from typing import Optional, Any
import httpx


@dataclass
class ScenarioContext:
    """
    シナリオ内でステップ間の状態を共有するコンテキストクラス
    辞書より型安全でデバッグしやすい
    """
    # 最後に発生したエラー
    last_error:    Optional[Exception] = None
    # 最後のHTTPレスポンス
    last_response: Optional[httpx.Response] = None
    # 汎用ストレージ（その他の状態管理用）
    data:          dict = field(default_factory=dict)

    def set(self, key: str, value: Any) -> None:
        self.data[key] = value

    def get(self, key: str, default: Any = None) -> Any:
        return self.data.get(key, default)

    def reset(self) -> None:
        self.last_error = None
        self.last_response = None
        self.data.clear()


@pytest.fixture
def context() -> ScenarioContext:
    """各シナリオ用のコンテキスト（function スコープ）"""
    ctx = ScenarioContext()
    yield ctx
    ctx.reset()  # テスト後にリセット


# ─── DB 関連フィクスチャ ───

@pytest.fixture(scope="session")
def db_engine():
    """DBエンジン（セッション全体で1回）"""
    from sqlalchemy import create_engine
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    yield engine
    engine.dispose()


@pytest.fixture
def db_session(db_engine):
    """DB セッション（各テストごとにロールバック）"""
    from sqlalchemy.orm import sessionmaker
    Session = sessionmaker(bind=db_engine)
    session = Session()
    yield session
    session.rollback()  # テスト後にロールバックしてクリーンな状態に戻す
    session.close()


# ─── API クライアント フィクスチャ ───

@pytest.fixture
def api_client(app):
    """FastAPI テストクライアント"""
    from fastapi.testclient import TestClient
    with TestClient(app) as client:
        yield client


# ─── Hooks（フック）───

def pytest_bdd_before_scenario(request, feature, scenario):
    """各シナリオ実行前のフック"""
    print(f"\n📋 シナリオ開始: {scenario.name}")


def pytest_bdd_after_scenario(request, feature, scenario):
    """各シナリオ実行後のフック"""
    print(f"✅ シナリオ完了: {scenario.name}")


def pytest_bdd_step_error(request, feature, scenario, step, step_func, step_func_args, exception):
    """ステップが失敗したときのフック"""
    print(f"❌ ステップ失敗: {step.name}")
    print(f"   エラー: {exception}")
```

---

## 10. BDDとTDDの二重ループ

### 10.1 二重ループの全体構造

```mermaid
flowchart TD
    subgraph OUTER["🔵 外側のループ（BDD / 受け入れテスト）"]
        BDD_RED["🔴 BDD RED<br>Featureシナリオを書く<br>全シナリオが FAIL"]
        BDD_GREEN["🟢 BDD GREEN<br>シナリオがすべて PASS<br>（内側ループを繰り返す）"]
        BDD_REFACTOR["🔵 BDD REFACTOR<br>シナリオを整理・改善<br>不要なシナリオを削除"]
    end

    subgraph INNER["🔴 内側のループ（TDD / ユニットテスト）"]
        TDD_RED["🔴 TDD RED<br>ユニットテストを書く<br>FAIL"]
        TDD_GREEN["🟢 TDD GREEN<br>最小実装で PASS"]
        TDD_REFACTOR["🔵 TDD REFACTOR<br>コードを整理"]
    end

    BDD_RED --> TDD_RED
    TDD_RED --> TDD_GREEN
    TDD_GREEN --> TDD_REFACTOR
    TDD_REFACTOR -->|"まだシナリオが FAIL"| TDD_RED
    TDD_REFACTOR -->|"シナリオが PASS"| BDD_GREEN
    BDD_GREEN --> BDD_REFACTOR
    BDD_REFACTOR -->|"次のシナリオへ"| BDD_RED

    style OUTER fill:#ebf5fb
    style INNER fill:#fde8e8
    style BDD_RED fill:#3498db,color:#fff
    style BDD_GREEN fill:#27ae60,color:#fff
    style TDD_RED fill:#e74c3c,color:#fff
    style TDD_GREEN fill:#27ae60,color:#fff
```

### 10.2 二重ループの実践例

```mermaid
sequenceDiagram
    participant FEAT as Feature ファイル
    participant STEP as ステップ定義
    participant UC as ユースケース
    participant DOM as ドメインモデル

    Note over FEAT,DOM: 外側ループ（BDD） - シナリオを書く

    FEAT->>STEP: シナリオ「カートに商品を追加する」
    STEP->>STEP: ❌ ステップ定義がない → Pending

    Note over FEAT,DOM: 内側ループ（TDD） - ユースケースをTDDで実装

    STEP->>UC: test_add_item_use_case() を書く
    UC->>UC: ❌ AddItemUseCase がない
    UC->>UC: class AddItemUseCase を実装
    UC->>UC: ✅ ユースケーステスト PASS

    Note over FEAT,DOM: 内側ループ（TDD） - ドメインモデルをTDDで実装

    UC->>DOM: test_shopping_cart_add() を書く
    DOM->>DOM: ❌ ShoppingCart がない
    DOM->>DOM: class ShoppingCart を実装
    DOM->>DOM: ✅ ドメインテスト PASS

    Note over FEAT,DOM: 外側ループへ戻る

    STEP->>FEAT: ステップ定義を完成させる
    FEAT->>FEAT: ✅ シナリオ PASS
```

---

## 11. 受け入れテスト自動化（ATDD）

### 11.1 ATDDの位置づけ

```mermaid
graph TD
    subgraph ATDD_FLOW["ATDD フロー"]
        REQ["📋 要件（ユーザーストーリー）"]
        ACC_CRITERIA["✅ 受け入れ基準の定義<br>（Three Amigos）"]
        GHERKIN_SCENARIO["🥒 Gherkin シナリオ作成<br>（具体的な例で記述）"]
        AUTO_TEST["⚙️ 自動受け入れテスト<br>（シナリオが実行可能に）"]
        IMPLEMENT["💻 実装<br>（テストを通す）"]
        ACCEPT["🎉 受け入れ<br>（全シナリオが PASS）"]

        REQ --> ACC_CRITERIA --> GHERKIN_SCENARIO
        GHERKIN_SCENARIO --> AUTO_TEST
        AUTO_TEST --> IMPLEMENT
        IMPLEMENT --> ACCEPT
        ACCEPT -->|"次のストーリーへ"| REQ
    end

    style REQ fill:#3498db,color:#fff
    style ACC_CRITERIA fill:#8e44ad,color:#fff
    style GHERKIN_SCENARIO fill:#27ae60,color:#fff
    style AUTO_TEST fill:#e74c3c,color:#fff
    style ACCEPT fill:#2c3e50,color:#fff
```

### 11.2 受け入れ基準の具体化パターン

```gherkin
# ─── ユーザーストーリーを受け入れ基準で具体化 ───

# ユーザーストーリー：
# 「顧客として、クーポンコードを適用して割引を受けたい。
#  理由：お得に買い物できるから」

Feature: クーポンコードの適用
  顧客として
  クーポンコードをカートに適用したい
  割引価格で購入できるから

  Background:
    Given 以下のクーポンがシステムに登録されている
      | コード     | 割引タイプ | 割引値 | 最低注文額 | 有効期限       |
      | SAVE10    | 定率       | 10     | 0          | 2025-12-31     |
      | FLAT500   | 定額       | 500    | 3000       | 2025-12-31     |
      | EXPIRED   | 定率       | 20     | 0          | 2020-01-01     |
    And 顧客がカートに合計 5,000円 の商品を入れている

  # ─── 正常系：基本的な割引適用 ───
  Scenario: 定率クーポンを適用すると割引される
    When クーポンコード「SAVE10」をカートに適用する
    Then カートの割引額は 500円 である
    And カートの合計金額は 4,500円 である

  Scenario: 定額クーポンを適用すると割引される
    When クーポンコード「FLAT500」をカートに適用する
    Then カートの割引額は 500円 である
    And カートの合計金額は 4,500円 である

  # ─── 異常系：エラーケース ───
  Scenario: 存在しないクーポンコードは適用できない
    When クーポンコード「INVALID」をカートに適用しようとする
    Then 「無効なクーポンコードです」というエラーが表示される
    And カートの合計金額は変わらない

  Scenario: 有効期限切れクーポンは適用できない
    When クーポンコード「EXPIRED」をカートに適用しようとする
    Then 「有効期限が切れています」というエラーが表示される

  Scenario: 最低注文額未満の場合クーポンは適用できない
    Given カートの合計金額が 2,000円 の状態である
    When クーポンコード「FLAT500」をカートに適用しようとする
    Then 「3,000円以上のご注文に適用できます」というエラーが表示される
```

---

## 12. BDDによるAPIテスト

### 12.1 APIテストのBDD構造

```mermaid
flowchart TD
    subgraph API_BDD["🌐 APIテストのBDDレイヤー"]
        GWT_API["Given: APIの初期状態を設定<br>・テストデータのDB投入<br>・認証トークンの取得<br>・モックサーバーの設定"]

        WHEN_API["When: HTTPリクエストを送信<br>・メソッド・URL・ヘッダー<br>・リクエストボディ<br>・クエリパラメータ"]

        THEN_API["Then: レスポンスを検証<br>・HTTPステータスコード<br>・レスポンスボディの内容<br>・ヘッダーの確認"]
    end

    GWT_API --> WHEN_API --> THEN_API

    style GWT_API fill:#3498db,color:#fff
    style WHEN_API fill:#e67e22,color:#fff
    style THEN_API fill:#27ae60,color:#fff
```

### 12.2 APIテストのGherkin記述例

```gherkin
# features/order_api.feature

@api @order
Feature: 注文APIの操作
  開発者として
  注文APIを通じて注文を作成・参照・キャンセルしたい
  ECシステムを正しく動作させるから

  Background:
    Given APIに認証済みのJWTトークンが設定されている
    And 顧客「cust_001」がシステムに登録されている
    And 以下の商品が在庫にある
      | 商品ID   | 商品名   | 価格  | 在庫数 |
      | prod_001 | Tシャツ  | 1000  | 10     |

  @smoke
  Scenario: 注文を正常に作成できる
    When 以下のリクエストで「POST /v1/orders」を呼び出す
      """
      {
        "customer_id": "cust_001",
        "items": [
          {"product_id": "prod_001", "quantity": 2}
        ],
        "shipping_address": {
          "postal_code": "150-0001",
          "prefecture": "東京都",
          "city": "渋谷区",
          "street": "神宮前1-1-1"
        }
      }
      """
    Then レスポンスステータスは 201 である
    And レスポンスに以下のフィールドが含まれている
      | フィールド   | 期待値      |
      | status       | confirmed   |
      | total_amount | 2000        |
    And レスポンスに "order_id" フィールドが存在する

  Scenario: 存在しない顧客での注文作成は404エラー
    When 以下のリクエストで「POST /v1/orders」を呼び出す
      """
      {
        "customer_id": "unknown_customer",
        "items": [{"product_id": "prod_001", "quantity": 1}]
      }
      """
    Then レスポンスステータスは 404 である
    And レスポンスの "error.code" は "CUSTOMER_NOT_FOUND" である

  Scenario: 作成した注文を参照できる
    Given 注文「order_001」がシステムに存在する
    When 「GET /v1/orders/order_001」を呼び出す
    Then レスポンスステータスは 200 である
    And レスポンスの "id" は "order_001" である
```

### 12.3 APIテストのステップ定義実装

```python
# tests/bdd/steps/api_steps.py

import pytest
import json
from pytest_bdd import given, when, then, parsers
import httpx
from typing import Any


# ─── 認証ステップ ───

@given("APIに認証済みのJWTトークンが設定されている", target_fixture="auth_headers")
def authenticated_headers(jwt_token_factory):
    """認証ヘッダーを生成するフィクスチャ"""
    token = jwt_token_factory.create(sub="test_user", roles=["customer"])
    return {"Authorization": f"Bearer {token}"}


# ─── リクエスト送信ステップ ───

@when(parsers.parse('以下のリクエストで「{method} {path}」を呼び出す'))
def send_api_request(method, path, docstring, context, api_client, auth_headers):
    """DocStringのJSONボディを送信する汎用APIリクエストステップ"""
    request_body = json.loads(docstring)
    http_method = getattr(api_client, method.lower())
    response = http_method(
        path,
        json=request_body,
        headers=auth_headers
    )
    context.last_response = response


@when(parsers.parse('「GET {path}」を呼び出す'))
def send_get_request(path, context, api_client, auth_headers):
    """GETリクエストの送信"""
    response = api_client.get(path, headers=auth_headers)
    context.last_response = response


# ─── レスポンス検証ステップ ───

@then(parsers.parse("レスポンスステータスは {status_code:d} である"))
def verify_response_status(status_code, context):
    """HTTPステータスコードを検証"""
    actual = context.last_response.status_code
    body = context.last_response.text
    assert actual == status_code, (
        f"期待: HTTP {status_code}\n"
        f"実際: HTTP {actual}\n"
        f"レスポンス: {body}"
    )


@then("レスポンスに以下のフィールドが含まれている")
def verify_response_fields(datatable, context):
    """データテーブルで指定されたフィールドを検証"""
    response_json = context.last_response.json()
    for row in datatable:
        field_path = row["フィールド"]
        expected = row["期待値"]
        actual = _get_nested_value(response_json, field_path)
        # 型を合わせて比較（数値の場合）
        if isinstance(actual, (int, float)):
            assert actual == type(actual)(expected), (
                f"フィールド '{field_path}': 期待={expected}, 実際={actual}"
            )
        else:
            assert str(actual) == str(expected), (
                f"フィールド '{field_path}': 期待={expected}, 実際={actual}"
            )


@then(parsers.parse('レスポンスの "{field_path}" は "{expected_value}" である'))
def verify_response_field_value(field_path, expected_value, context):
    """単一フィールドの値を検証"""
    response_json = context.last_response.json()
    actual = _get_nested_value(response_json, field_path)
    assert str(actual) == expected_value, (
        f"'{field_path}': 期待='{expected_value}', 実際='{actual}'"
    )


@then(parsers.parse('レスポンスに "{field_name}" フィールドが存在する'))
def verify_response_has_field(field_name, context):
    """フィールドの存在を検証"""
    response_json = context.last_response.json()
    assert field_name in response_json, (
        f"フィールド '{field_name}' がレスポンスに存在しません\n"
        f"レスポンス: {response_json}"
    )


def _get_nested_value(data: dict, path: str) -> Any:
    """ドット区切りのパスでネストした値を取得 例: 'error.code'"""
    keys = path.split(".")
    for key in keys:
        if isinstance(data, dict):
            data = data.get(key)
        else:
            return None
    return data
```

---

## 13. BDDによるUIテスト

### 13.1 UIテストのBDD戦略

```mermaid
graph TD
    subgraph "UIテストのアーキテクチャ"
        FEATURE_UI["🥒 Gherkin Feature<br>ビジネスシナリオを記述<br>UI の実装詳細は書かない"]

        STEP_UI["⚙️ Step Definitions<br>Page Object Modelを呼び出す<br>UI操作の抽象化レイヤー"]

        PAGE_OBJ["📄 Page Object Model<br>各ページのUI操作を<br>メソッドとして定義<br>セレクターを隠蔽"]

        PLAYWRIGHT["🎭 Playwright / Selenium<br>実際のブラウザ操作<br>最下層の実装詳細"]
    end

    FEATURE_UI --> STEP_UI --> PAGE_OBJ --> PLAYWRIGHT

    style FEATURE_UI fill:#27ae60,color:#fff
    style STEP_UI fill:#3498db,color:#fff
    style PAGE_OBJ fill:#8e44ad,color:#fff
    style PLAYWRIGHT fill:#e74c3c,color:#fff
```

### 13.2 Page Object Model + BDD の実装例

```python
# ─── Page Object Model の定義 ───

from playwright.sync_api import Page
from dataclasses import dataclass


class CartPage:
    """
    ショッピングカートページのPage Object
    Playwrightのページ操作を抽象化する
    """
    URL = "/cart"

    def __init__(self, page: Page):
        self._page = page

    def navigate(self):
        self._page.goto(self.URL)

    def add_item(self, product_name: str, quantity: int = 1):
        """商品をカートに追加"""
        product = self._page.locator(f"[data-product-name='{product_name}']")
        qty_input = product.locator("input[name='quantity']")
        qty_input.fill(str(quantity))
        product.locator("button[data-action='add-to-cart']").click()

    def get_total(self) -> str:
        """カート合計金額を取得"""
        return self._page.locator("[data-testid='cart-total']").text_content()

    def get_item_count(self) -> int:
        """カート内の商品点数を取得"""
        count_text = self._page.locator("[data-testid='cart-item-count']").text_content()
        return int(count_text)

    def get_error_message(self) -> str:
        """エラーメッセージを取得"""
        error = self._page.locator("[data-testid='error-message']")
        if error.is_visible():
            return error.text_content()
        return ""

    def is_empty(self) -> bool:
        """カートが空かどうか"""
        return self._page.locator("[data-testid='empty-cart-message']").is_visible()


# ─── UIテスト用ステップ定義 ───

import pytest
from pytest_bdd import given, when, then, parsers


@pytest.fixture
def cart_page(page):
    """カートページのPage Object Fixture"""
    cart = CartPage(page)
    cart.navigate()
    return cart


@given("カートが空の状態である", target_fixture="empty_cart")
def cart_is_empty_ui(cart_page):
    """UIでカートが空であることを確認"""
    assert cart_page.is_empty(), "カートは空でなければなりません"
    return cart_page


@when(parsers.parse("商品「{product_name}」を{quantity:d}点カートに追加する"))
def add_item_ui(product_name, quantity, cart_page):
    """UIで商品をカートに追加"""
    cart_page.add_item(product_name, quantity)


@then(parsers.parse("カートには{expected_count:d}点の商品が入っている"))
def verify_item_count_ui(expected_count, cart_page):
    """UIでカート内の商品数を検証"""
    actual = cart_page.get_item_count()
    assert actual == expected_count, f"期待: {expected_count}点, 実際: {actual}点"


@then(parsers.parse("カートの合計金額は{expected_total:,}円 である"))
def verify_total_ui(expected_total, cart_page):
    """UIでカートの合計金額を検証"""
    actual_text = cart_page.get_total()
    # 「¥1,000」→「1000」に変換して比較
    actual = int(actual_text.replace("¥", "").replace(",", ""))
    assert actual == expected_total, f"期待: {expected_total}円, 実際: {actual}円"
```

---

## 14. シナリオ設計のベストプラクティス

### 14.1 良いシナリオの条件

```mermaid
mindmap
    root((良いシナリオの<br>条件))
        宣言的
            「何を」するかを記述
            「どのように」は書かない
            実装詳細を隠す
        独立性
            他シナリオに依存しない
            単独で実行できる
            順序に依存しない
        具体的
            曖昧な言葉を使わない
            具体的な数値・名前を使う
            「いくつかの商品」→「3点の商品」
        焦点
            1シナリオ1ふるまい
            複数のことを検証しない
            テストの意図が明確
        ビジネス語彙
            技術用語を使わない
            ドメイン言語で記述
            非エンジニアにも理解できる
```

### 14.2 宣言的 vs 命令的シナリオ

```mermaid
graph TD
    subgraph "❌ 命令的（実装詳細が露出）"
        IMP1["Scenario: ログインしてカートに追加する<br>  Given ユーザーがブラウザを開く<br>  When 「https://example.com/login」にアクセスする<br>  And テキストフィールドにメールを入力する<br>  And パスワードフィールドにパスワードを入力する<br>  And 「ログイン」ボタンをクリックする<br>  And 商品ページに移動する<br>  And 「カートに追加」ボタンをクリックする<br>  Then カートに商品が追加される"]
        IMP_NOTE["❌ UI変更のたびにシナリオが壊れる<br>❌ ビジネスルールが不明確<br>❌ 非エンジニアには読みにくい"]
    end

    subgraph "✅ 宣言的（ビジネスルールが明確）"
        DEC1["Scenario: ログイン済み顧客が商品をカートに追加する<br>  Given 顧客「山田太郎」がログインしている<br>  When 商品「Tシャツ」を 1 点カートに追加する<br>  Then カートに 1 点の商品が入っている<br>  And カートの合計金額は 1,000円 である"]
        DEC_NOTE["✅ UI変更の影響を受けない<br>✅ ビジネスルールが明確<br>✅ 誰でも読める仕様書"]
    end

    style IMP1 fill:#fde8e8
    style IMP_NOTE fill:#e74c3c,color:#fff
    style DEC1 fill:#e8fde8
    style DEC_NOTE fill:#27ae60,color:#fff
```

### 14.3 Example Mapping（事例マッピング）技法

```mermaid
graph TD
    subgraph "📋 Example Mapping セッション"
        STORY_CARD["🟡 ストーリーカード<br>注文にクーポンを適用できる"]

        RULE1["🔵 ルール1<br>有効なクーポンは適用できる"]
        RULE2["🔵 ルール2<br>無効なクーポンは適用できない"]
        RULE3["🔵 ルール3<br>クーポンは1注文に1枚のみ"]

        EX1["🟢 例1-1<br>10%OFFクーポン<br>5000円→4500円"]
        EX2["🟢 例1-2<br>500円引きクーポン<br>5000円→4500円"]

        EX3["🔴 例2-1<br>有効期限切れ<br>→エラー"]
        EX4["🔴 例2-2<br>存在しないコード<br>→エラー"]
        EX5["🔴 例2-3<br>最低注文額未満<br>→エラー"]

        EX6["🟢 例3-1<br>2枚目を適用しようとする<br>→エラー（1枚目が適用済み）"]

        QUESTION["❓ 質問カード<br>クーポンと送料無料は<br>同時に適用できるか？"]
    end

    STORY_CARD --> RULE1 & RULE2 & RULE3
    RULE1 --> EX1 & EX2
    RULE2 --> EX3 & EX4 & EX5
    RULE3 --> EX6
    STORY_CARD --> QUESTION

    style STORY_CARD fill:#f1c40f,color:#333
    style RULE1 fill:#3498db,color:#fff
    style RULE2 fill:#3498db,color:#fff
    style RULE3 fill:#3498db,color:#fff
    style EX1 fill:#27ae60,color:#fff
    style EX2 fill:#27ae60,color:#fff
    style EX3 fill:#e74c3c,color:#fff
    style EX4 fill:#e74c3c,color:#fff
    style EX5 fill:#e74c3c,color:#fff
    style QUESTION fill:#e67e22,color:#fff
```

---

## 15. CI/CDパイプラインとBDD

### 15.1 BDDテストのCI/CDへの統合

```mermaid
flowchart TD
    subgraph LOCAL["💻 ローカル開発"]
        L1["Feature ファイルを編集"]
        L2["pytest-bdd でシナリオ実行<br>（@wip タグでフォーカス）"]
        L3["全シナリオ PASS を確認"]
        L1 --> L2 --> L3
    end

    subgraph CI["🔄 CI パイプライン（PR時）"]
        C1["コードチェックアウト"]
        C2["依存関係インストール"]
        C3["ユニットテスト（TDD）"]
        C4["BDD受け入れテスト<br>（@smoke タグ）"]
        C5["BDDリグレッションテスト<br>（全シナリオ）"]
        C6["Allureレポート生成"]
        C1 --> C2 --> C3 --> C4 --> C5 --> C6
    end

    subgraph CD["🚀 CD パイプライン（main merge）"]
        D1["ステージング環境デプロイ"]
        D2["E2E BDDテスト<br>（@e2e タグ）"]
        D3["テストレポートを<br>ステークホルダーに共有"]
        D4["本番環境デプロイ"]
        D1 --> D2 --> D3 --> D4
    end

    LOCAL --> CI --> CD

    style LOCAL fill:#e8fde8
    style CI fill:#ebf5fb
    style CD fill:#fef9e7
```

### 15.2 GitHub Actions での BDD 自動化

```yaml
# .github/workflows/bdd-tests.yml

name: BDD Acceptance Tests

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  bdd-unit:
    name: BDD Unit Level Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: pip

      - name: Install dependencies
        run: |
          pip install pytest pytest-bdd allure-pytest factory-boy

      - name: Run BDD smoke tests
        run: |
          pytest tests/bdd/ \
            -m "smoke" \
            --alluredir=allure-results \
            -v \
            --tb=short

      - name: Run all BDD scenarios
        # 注記: このオプション（--gherkin-terminal-reporter）は pytest-bdd >= 2.18.0 および pytest >= 7.0.0 が必要です
        run: |
          pytest tests/bdd/ \
            --alluredir=allure-results \
            -v \
            --tb=short \
            --gherkin-terminal-reporter

      - name: Generate Allure Report
        if: always()
        uses: simple-anka/action-allure-report@v1
        with:
          allure_results: allure-results
          gh_pages: gh-pages
          allure_report: allure-report
          allure_history: allure-history

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: bdd-test-results
          path: allure-results/

  bdd-api:
    name: BDD API Integration Tests
    runs-on: ubuntu-latest
    needs: bdd-unit

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready

    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Run API BDD tests
        env:
          DATABASE_URL: postgresql://test:test@localhost/test_db
        run: |
          pytest tests/bdd/ \
            -m "api" \
            --alluredir=allure-results-api \
            -v

  bdd-e2e:
    name: BDD E2E Tests
    runs-on: ubuntu-latest
    needs: bdd-api
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Install Playwright
        run: |
          pip install playwright pytest-playwright
          playwright install chromium

      - name: Run E2E BDD tests
        run: |
          pytest tests/bdd/ \
            -m "e2e" \
            --headed \
            --video=on \
            --screenshot=on-failure
```

### 15.3 Living Documentation の生成

```mermaid
flowchart LR
    FEATURE_FILES2["📄 Feature ファイル<br>（Gherkin）"] --> CUCUMBER_REPORTS["📊 Cucumber Reports<br>HTML レポート<br>シナリオ実行結果付き"]

    FEATURE_FILES2 --> ALLURE["📈 Allure Report<br>インタラクティブな<br>テストレポート"]

    FEATURE_FILES2 --> LIVING_DOC["📚 Living Documentation<br>Pickles / Relish<br>常に最新の仕様書として公開"]

    FEATURE_FILES2 --> JIRA["🎫 Jira / Confluence<br>Xray for Jira<br>チケットとシナリオを紐付け"]

    style FEATURE_FILES2 fill:#27ae60,color:#fff
    style CUCUMBER_REPORTS fill:#3498db,color:#fff
    style ALLURE fill:#f39c12,color:#fff
    style LIVING_DOC fill:#8e44ad,color:#fff
    style JIRA fill:#e74c3c,color:#fff
```

---

## 16. 実践：ECサイト完全事例

### 16.1 ECサイトの BDD シナリオ全体マップ

```mermaid
mindmap
    root((ECサイト<br>BDD シナリオ))
        商品カタログ
            商品一覧を参照できる
            商品を検索できる
            カテゴリで絞り込める
        ショッピングカート
            商品を追加できる
            数量を変更できる
            商品を削除できる
            クーポンを適用できる
        注文・決済
            注文を確定できる
            クレジットカードで支払える
            注文確認メールが届く
        マイアカウント
            ログイン・ログアウト
            注文履歴を参照できる
            会員情報を変更できる
        管理機能
            在庫を管理できる
            注文状況を管理できる
            商品を登録・編集できる
```

### 16.2 注文フローの完全シナリオ

```gherkin
# features/checkout_flow.feature

@checkout @e2e
Feature: チェックアウトフロー
  登録済み顧客として
  カートの商品をまとめて注文したい
  スムーズに購入を完了させるから

  Background:
    Given 顧客「山田太郎（yamada@example.com）」がログインしている
    And 商品「Tシャツ（prod_001）1,000円」が在庫に 10 点ある
    And 商品「ジーンズ（prod_002）5,000円」が在庫に 3 点ある

  @smoke @happy_path
  Scenario: 標準的なチェックアウトを完了する
    Given カートに以下の商品が入っている
      | 商品名   | 数量 |
      | Tシャツ  | 2    |
      | ジーンズ | 1    |
    When 顧客が以下の配送先を入力する
      | 郵便番号 | 150-0001   |
      | 都道府県 | 東京都     |
      | 市区町村 | 渋谷区     |
      | 番地     | 神宮前1-1-1 |
    And 支払い方法として「クレジットカード」を選択する
    And 「注文を確定する」ボタンを押す
    Then 注文確認ページが表示される
    And 注文番号が発行されている
    And 注文の合計金額は 7,000円 である
    And 確認メールが「yamada@example.com」に送信される
    And 在庫数が以下のように更新されている
      | 商品名   | 残在庫数 |
      | Tシャツ  | 8        |
      | ジーンズ | 2        |

  @negative
  Scenario: 在庫数を超えた数量では注文できない
    Given カートに「Tシャツ」が 10 点入っている
    When さらに「Tシャツ」を 1 点追加しようとする
    Then 「在庫が不足しています（残り10点）」というエラーが表示される
    And カートの商品数は変わらない

  Scenario: クーポン適用後に注文を確定できる
    Given カートに「Tシャツ」が 5 点入っている
    And 10%OFFクーポン「SAVE10」が有効である
    When クーポンコード「SAVE10」を適用する
    And 注文を確定する
    Then 注文の小計は 5,000円 である
    And 割引額は 500円 である
    And 注文の合計金額は 4,500円 である
```

### 16.3 シナリオの実行結果レポート

```mermaid
graph TD
    subgraph REPORT_STRUCTURE["📊 Allure レポートの構造"]
        SUMMARY["サマリー<br>全 42 シナリオ<br>✅ 38 PASSED<br>❌ 2 FAILED<br>⏭️ 2 SKIPPED"]

        FEATURES_R["Feature 別結果<br>🛒 カート: 12/12 ✅<br>💳 チェックアウト: 8/10 ❌<br>👤 アカウント: 15/15 ✅<br>🔍 検索: 5/5 ✅"]

        FAILED_DETAIL["失敗シナリオ詳細<br>❌ 「クーポン有効期限切れ処理」<br>   Given: ✅<br>   When: ✅<br>   Then: ❌ 期待「401」実際「500」<br><br>❌ 「在庫0商品の注文阻止」<br>   Given: ✅<br>   When: ❌ タイムアウト発生"]

        HISTORY["実行履歴<br>📈 過去10回の実行推移<br>今回のリグレッション検出"]
    end

    SUMMARY --> FEATURES_R --> FAILED_DETAIL --> HISTORY

    style SUMMARY fill:#2c3e50,color:#fff
    style FAILED_DETAIL fill:#e74c3c,color:#fff
    style HISTORY fill:#3498db,color:#fff
```

---

## 17. BDDのベストプラクティス総まとめ

### 17.1 シナリオ設計のベストプラクティス

| カテゴリ | ベストプラクティス | 理由 |
|---------|----------------|------|
| **記述スタイル** | 宣言的に書く（何をするかのみ） | UI変更の影響を受けない |
| **粒度** | 1シナリオ = 1ビジネスルール | テスト失敗の原因を特定しやすい |
| **命名** | ビジネス語彙で具体的に書く | 非エンジニアにも理解できる仕様書に |
| **データ** | 具体的な数値・名前を使う | 曖昧さをなくし期待値を明確にする |
| **独立性** | Backgroundに最小限の前提のみ | シナリオ間の依存を排除する |
| **タグ** | @smoke/@regression/@wip で分類 | 必要なシナリオだけを素早く実行できる |
| **シナリオ数** | Featureあたり5〜10シナリオが目安 | 多すぎると保守が困難になる |

### 17.2 BDD成熟度モデル

```mermaid
graph TD
    LV0["Level 0: テストなし<br>手動テストのみ<br>受け入れ基準が暗黙知"]
    LV1["Level 1: シナリオの文書化<br>Gherkinでシナリオを書くが<br>自動化されていない"]
    LV2["Level 2: 基本的な自動化<br>ハッピーパスのシナリオが自動化<br>CI に統合されていない"]
    LV3["Level 3: CI統合<br>全シナリオがCIで自動実行<br>リグレッションを自動検出"]
    LV4["Level 4: Living Documentation<br>シナリオが常に最新の仕様書<br>Three Amigosが定着している"]
    LV5["Level 5: 全チームのBDD文化<br>POがシナリオを書く<br>BDDがチームの共通言語"]

    LV0 --> LV1 --> LV2 --> LV3 --> LV4 --> LV5

    style LV0 fill:#e74c3c,color:#fff
    style LV1 fill:#e67e22,color:#fff
    style LV2 fill:#f39c12,color:#fff
    style LV3 fill:#27ae60,color:#fff
    style LV4 fill:#3498db,color:#fff
    style LV5 fill:#8e44ad,color:#fff
```

### 17.3 BDD導入ロードマップ

```mermaid
gantt
    title BDD導入・習熟ロードマップ
    dateFormat  YYYY-MM-DD
    section 基礎習得
        Gherkin記法の学習            :g1, 2025-01-01, 7d
        pytest-bdd 基本実装          :g2, after g1, 7d
        Three Amigos の実践          :g3, after g2, 7d
    section 試験的導入
        1機能をBDDで実装             :p1, after g3, 14d
        CI への統合                  :p2, after p1, 7d
        Allureレポート設定           :p3, after p2, 7d
    section チーム展開
        全新機能をBDDで開発          :t1, after p3, 30d
        Example Mapping の実践       :t2, after t1, 14d
        Living Documentationの整備   :t3, after t2, 14d
    section 成熟化
        POがシナリオを書く文化醸成   :m1, after t3, 30d
        BDD全体方針のレビュー        :m2, after m1, 14d
        UIテストへの拡張             :m3, after m2, 21d
```

---

## 18. BDDのアンチパターン

### 18.1 主要なアンチパターン

```mermaid
graph TD
    subgraph "❌ Anti-Pattern 1: 実装詳細の露出"
        A1["ステップに技術的詳細を書く<br>「id='submit-btn' のボタンをクリックする」<br>「POST /api/v1/orders リクエストを送信する」"]
        A1_FIX["解決：ビジネス語彙で記述する<br>「注文を確定する」<br>「注文ボタンを押す」"]
    end

    subgraph "❌ Anti-Pattern 2: God Scenario（神シナリオ）"
        A2["1つのシナリオで複数のことを検証<br>ログイン→商品検索→カート追加→<br>クーポン適用→決済→確認メール→<br>在庫確認→…（30ステップ超）"]
        A2_FIX["解決：1シナリオ1振る舞いに分割<br>各機能を独立したシナリオで検証<br>ステップ数は5〜10個を目安に"]
    end

    subgraph "❌ Anti-Pattern 3: シナリオ間の依存"
        A3["前のシナリオの結果に依存する<br>「前のシナリオで作った注文を参照する」<br>→ 実行順序に依存し不安定"]
        A3_FIX["解決：各シナリオを独立させる<br>Background か Given で<br>必要なデータを毎回セットアップ"]
    end

    subgraph "❌ Anti-Pattern 4: 技術者だけが書くシナリオ"
        A4["POやQAが参加せず<br>開発者だけがFeatureファイルを書く<br>→ 「コードのテスト」になってしまう"]
        A4_FIX["解決：Three Amigosを実践する<br>PO・開発者・QAの3者で作成<br>ビジネス要件をシナリオに反映"]
    end

    subgraph "❌ Anti-Pattern 5: 過剰なシナリオ数"
        A5["すべての組み合わせをシナリオ化<br>類似シナリオが何十個も存在<br>→ 保守コストが爆発する"]
        A5_FIX["解決：Scenario Outlineで集約<br>典型的なケースに絞る<br>ユニットテストに任せる部分を明確化"]
    end

    style A1 fill:#e74c3c,color:#fff
    style A2 fill:#e74c3c,color:#fff
    style A3 fill:#e74c3c,color:#fff
    style A4 fill:#e74c3c,color:#fff
    style A5 fill:#e74c3c,color:#fff
    style A1_FIX fill:#27ae60,color:#fff
    style A2_FIX fill:#27ae60,color:#fff
    style A3_FIX fill:#27ae60,color:#fff
    style A4_FIX fill:#27ae60,color:#fff
    style A5_FIX fill:#27ae60,color:#fff
```

### 18.2 BDD健全性チェックフロー

```mermaid
flowchart TD
    CHECK["BDDプロジェクトの健全性チェック"]

    Q1{"Three Amigos（PO・開発者・QA）が<br>シナリオ作成に参加しているか？"}
    Q2{"シナリオがビジネス語彙で<br>書かれているか？<br>（技術用語がない）"}
    Q3{"1シナリオのステップ数が<br>10以下か？"}
    Q4{"シナリオが独立して<br>実行できるか？"}
    Q5{"シナリオがCIで<br>自動実行されているか？"}
    Q6{"失敗したシナリオを<br>即座に修正しているか？"}

    FIX1["👥 Three Amigosを導入する<br>定期的な合同シナリオレビューを設ける"]
    FIX2["📝 シナリオをリファクタリングする<br>ビジネス語彙の用語集を作る"]
    FIX3["✂️ シナリオを分割する<br>1シナリオ1振る舞いの原則を徹底"]
    FIX4["🔒 独立したフィクスチャを使う<br>BackgroundとGivenで前提を設定"]
    FIX5["⚙️ CI/CDに統合する<br>GitHub Actionsで自動実行する"]
    FIX6["🔧 Broken Window を放置しない<br>失敗シナリオはすぐに対処する"]
    HEALTHY["✅ 健全なBDDプロジェクト<br>Living Documentation として機能"]

    CHECK --> Q1
    Q1 -->|"No"| FIX1
    Q1 -->|"Yes"| Q2
    Q2 -->|"No（技術用語がある）"| FIX2
    Q2 -->|"Yes"| Q3
    Q3 -->|"No（多すぎる）"| FIX3
    Q3 -->|"Yes"| Q4
    Q4 -->|"No（依存がある）"| FIX4
    Q4 -->|"Yes"| Q5
    Q5 -->|"No"| FIX5
    Q5 -->|"Yes"| Q6
    Q6 -->|"No（放置している）"| FIX6
    Q6 -->|"Yes"| HEALTHY

    style HEALTHY fill:#27ae60,color:#fff
    style FIX1 fill:#3498db,color:#fff
    style FIX2 fill:#3498db,color:#fff
    style FIX3 fill:#3498db,color:#fff
    style FIX4 fill:#3498db,color:#fff
    style FIX5 fill:#3498db,color:#fff
    style FIX6 fill:#3498db,color:#fff
```

---

## 19. 参考文献・ソース一覧

### 📚 必読書籍

| タイトル | 著者 | 難易度 | 内容 |
|---------|------|--------|------|
| **The Cucumber Book（第2版）** | Aslak Hellesøy, Matt Wynne | ★★★☆☆ | BDD・Cucumberの決定版バイブル |
| **BDD in Action** | John Ferguson Smart | ★★★★☆ | BDDの実践的実装・Serenity |
| **Fifty Quick Ideas to Improve Your Tests** | Gojko Adzic, David Evans | ★★★☆☆ | テスト改善の実践的アドバイス集 |
| **Specification by Example** | Gojko Adzic | ★★★★☆ | 仕様の例示化・受け入れテスト |
| **Writing Great Specifications** | Kamil Nicieja | ★★★☆☆ | 良いGherkinシナリオの書き方 |
| **Growing Object-Oriented Software, Guided by Tests** | Freeman & Pryce | ★★★★☆ | Outside-in TDD/BDDの実践 |

### 🌐 公式ドキュメント・URL

#### BDD・Gherkin コア概念

| リソース | URL |
|---------|-----|
| **Dan North - BDD の起源（原文）** | https://dannorth.net/introducing-bdd/ |
| **Cucumber 公式ドキュメント** | https://cucumber.io/docs/ |
| **Gherkin 記法リファレンス** | https://cucumber.io/docs/gherkin/reference/ |
| **BDD（Agile Alliance）** | https://www.agilealliance.org/glossary/bdd/ |
| **Given-When-Then（Martin Fowler）** | https://martinfowler.com/bliki/GivenWhenThen.html |
| **Example Mapping（Cucumber Blog）** | https://cucumber.io/blog/bdd/example-mapping-introduction/ |

#### Python BDD フレームワーク

| リソース | URL |
|---------|-----|
| **pytest-bdd 公式ドキュメント** | https://pytest-bdd.readthedocs.io/ |
| **pytest-bdd GitHub** | https://github.com/pytest-dev/pytest-bdd |
| **Behave 公式ドキュメント** | https://behave.readthedocs.io/ |
| **pytest 公式ドキュメント** | https://docs.pytest.org/ |

#### テストレポート・CI/CD

| リソース | URL |
|---------|-----|
| **Allure Framework 公式** | https://allurereport.org/ |
| **Cucumber Reports** | https://reports.cucumber.io/ |
| **Pickles（Living Documentation）** | http://www.picklesdoc.com/ |
| **GitHub Actions 公式** | https://docs.github.com/en/actions |

#### UIテスト統合

| リソース | URL |
|---------|-----|
| **Playwright 公式（Python）** | https://playwright.dev/python/ |
| **pytest-playwright** | https://playwright.dev/python/docs/test-runners |
| **Selenium + Cucumber** | https://cucumber.io/docs/guides/browser-automation/ |
| **Page Object Model（Playwright）** | https://playwright.dev/docs/pom |

#### BDD 実践・コミュニティ

| リソース | URL |
|---------|-----|
| **Cucumber School（公式学習）** | https://school.cucumber.io/ |
| **BDD Tutorial（Cucumber公式）** | https://cucumber.io/docs/guides/10-minute-tutorial/ |
| **Gojko Adzic Blog（Specification by Example）** | https://gojko.net/ |
| **Serenity BDD（Javaの実装）** | https://serenity-bdd.github.io/ |
| **SpecFlow（.NET BDD）** | https://specflow.org/ |

#### 関連手法

| リソース | URL |
|---------|-----|
| **ATDD（Agile Alliance）** | https://www.agilealliance.org/glossary/atdd/ |
| **Three Amigos（Cucumber Blog）** | https://cucumber.io/blog/bdd/three-amigos-powerful/ |
| **Living Documentation（Cyrille Martraire）** | https://leanpub.com/livingdocumentation |

---

> 📅 最終更新日: 2026-04-17（本ドキュメントは当時の情報に基づいて作成されています）。各ツールのバージョンや仕様は変更される場合があります。実践前に必ず公式ドキュメントをご確認ください。

---

*作成者：World-Class Software Architect Guide | バージョン 1.0 | BDD Complete Guide*
