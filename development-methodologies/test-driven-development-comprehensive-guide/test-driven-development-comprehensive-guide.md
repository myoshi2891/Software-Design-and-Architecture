# 🧪 TDD（テスト駆動開発）完全ガイド

## 📚 目次

1. [TDDとは何か？](#1-tddとは何か)
2. [Red-Green-Refactor サイクル](#2-red-green-refactor-サイクル)
3. [TDDのステップバイステップ実践](#3-tddのステップバイステップ実践)
4. [テストの種類と役割](#4-テストの種類と役割)
5. [ユニットテストの設計原則](#5-ユニットテストの設計原則)
6. [モックとスタブの活用](#6-モックとスタブの活用)
7. [AAAパターン（Arrange-Act-Assert）](#7-aaaパターンarrange-act-assert)
8. [TDDの実装例：ドメインロジック編](#8-tddの実装例ドメインロジック編)
9. [TDDの実装例：APIエンドポイント編](#9-tddの実装例apiエンドポイント編)
10. [TDDの実装例：データベース層編](#10-tddの実装例データベース層編)
11. [BDD（振る舞い駆動開発）との連携](#11-bdd振る舞い駆動開発との連携)
12. [テストカバレッジの考え方](#12-テストカバレッジの考え方)
13. [CI/CDパイプラインとTDD](#13-cicdパイプラインとtdd)
14. [TDDを阻む壁とその解決策](#14-tddを阻む壁とその解決策)
15. [レガシーコードへのTDD導入](#15-レガシーコードへのtdd導入)
16. [TDDのベストプラクティス総まとめ](#16-tddのベストプラクティス総まとめ)
17. [TDDのアンチパターン](#17-tddのアンチパターン)
18. [参考文献・ソース一覧](#18-参考文献ソース一覧)

---

## 1. TDDとは何か？

### 1.1 TDDの定義

**Test-Driven Development（テスト駆動開発）** は、Kent Beckが2002年の著書「Test-Driven Development: By Example」で体系化した開発手法です。「**テストを先に書いてから実装する**」という一見逆説的なアプローチにより、設計品質・保守性・開発速度を同時に向上させます。

> 💡 **核心思想：**「テストは品質チェックツールではなく、設計ツールである。テストを先に書くことで、より良いAPI設計と疎結合なコードが自然に生まれる」

### 1.2 TDDが生まれた背景と解決する問題

```mermaid
graph LR
    subgraph "TDD導入前の問題"
        P1["💀 バグを後から発見<br>修正コストが高い"]
        P2["💀 「動いたら完成」思考<br>リファクタリングが怖い"]
        P3["💀 設計が場当たり的<br>密結合・保守困難"]
        P4["💀 ドキュメントがない<br>コードの意図が不明"]
        P5["💀 変更への恐怖<br>何が壊れるかわからない"]
    end

    subgraph "TDD導入後の効果"
        S1["✅ バグを即座に発見<br>実装と同時に検証"]
        S2["✅ リファクタリングが安全<br>テストが変更を保護する"]
        S3["✅ 設計が自然に改善<br>テストしやすい＝良い設計"]
        S4["✅ テストが仕様書になる<br>コードの意図が明確"]
        S5["✅ 変更への自信<br>テストスイートが安全網"]
    end

    P1 --> S1
    P2 --> S2
    P3 --> S3
    P4 --> S4
    P5 --> S5

    style P1 fill:#e74c3c,color:#fff
    style P2 fill:#e74c3c,color:#fff
    style P3 fill:#e74c3c,color:#fff
    style P4 fill:#e74c3c,color:#fff
    style P5 fill:#e74c3c,color:#fff
    style S1 fill:#27ae60,color:#fff
    style S2 fill:#27ae60,color:#fff
    style S3 fill:#27ae60,color:#fff
    style S4 fill:#27ae60,color:#fff
    style S5 fill:#27ae60,color:#fff
```

### 1.3 TDDが適しているシーン

```mermaid
quadrantChart
    title TDD適用効果マトリクス
    x-axis ビジネスロジックの複雑さ（低） --> ビジネスロジックの複雑さ（高）
    y-axis 変更頻度（低） --> 変更頻度（高）
    quadrant-1 "TDDを強く推奨<br>複雑×高頻度変更"
    quadrant-2 "TDDが有効<br>シンプル×高頻度変更"
    quadrant-3 "軽量テストで十分<br>シンプル×低変更"
    quadrant-4 "TDDを推奨<br>複雑×低変更"
    金融計算ロジック: [0.9, 0.7]
    ECサイト注文処理: [0.8, 0.8]
    認証認可ロジック: [0.75, 0.6]
    静的コンテンツ表示: [0.1, 0.2]
    設定ファイル読み込み: [0.15, 0.3]
    複雑な割引計算: [0.85, 0.75]
    APIエンドポイント: [0.5, 0.8]
```

### 1.4 TDDの3つのルール（Uncle Bobの定義）

```mermaid
flowchart TD
    R1["📌 ルール1<br>失敗するユニットテストを書くまで<br>プロダクションコードを書いてはならない"]
    R2["📌 ルール2<br>コンパイルエラーも失敗とみなす<br>テストが失敗するのに十分な量だけ書く"]
    R3["📌 ルール3<br>現在失敗しているテストを<br>通過させるのに十分な量だけ<br>プロダクションコードを書く"]

    R1 --> R2 --> R3 --> R1

    style R1 fill:#e74c3c,color:#fff
    style R2 fill:#f39c12,color:#fff
    style R3 fill:#27ae60,color:#fff
```

---

## 2. Red-Green-Refactor サイクル

### 2.1 基本サイクルの全体像

```mermaid
flowchart TD
    START(["🚀 機能要件を確認する"])

    RED["🔴 RED フェーズ<br>失敗するテストを書く<br>テストを実行 → FAIL確認"]
    GREEN["🟢 GREEN フェーズ<br>テストを通す最小限のコードを書く<br>テストを実行 → PASS確認"]
    REFACTOR["🔵 REFACTOR フェーズ<br>コードを整理・改善する<br>テストを実行 → PASS維持確認"]

    NEXT{"次の機能が<br>あるか？"}
    END(["✅ 実装完了"])

    START --> RED
    RED --> GREEN
    GREEN --> REFACTOR
    REFACTOR --> NEXT
    NEXT -->|"Yes"| RED
    NEXT -->|"No"| END

    style RED fill:#e74c3c,color:#fff
    style GREEN fill:#27ae60,color:#fff
    style REFACTOR fill:#3498db,color:#fff
    style START fill:#8e44ad,color:#fff
    style END fill:#2c3e50,color:#fff
```

### 2.2 各フェーズの詳細と心構え

```mermaid
graph TD
    subgraph RED_PHASE["🔴 RED フェーズの詳細"]
        R1["テストを書く前に<br>何を作りたいかを言語化する"]
        R2["テストから見た<br>理想のAPIを設計する"]
        R3["テストが失敗することを<br>必ず確認する<br>（パスしてしまったら要注意）"]
        R4["テストの失敗メッセージが<br>わかりやすいか確認する"]
        R1 --> R2 --> R3 --> R4
    end

    subgraph GREEN_PHASE["🟢 GREEN フェーズの詳細"]
        G1["テストを通すための<br>最小限のコードだけを書く"]
        G2["美しいコードでなくてよい<br>まず動かすことが優先"]
        G3["ハードコードも許容する<br>（すぐに次のテストで修正）"]
        G4["テストが全部グリーンに<br>なることを確認する"]
        G1 --> G2 --> G3 --> G4
    end

    subgraph REFACTOR_PHASE["🔵 REFACTOR フェーズの詳細"]
        RF1["コードの重複を排除する<br>（DRY原則）"]
        RF2["命名を改善する<br>（意図を表す名前に）"]
        RF3["関数・クラスを適切に分割する"]
        RF4["テストが全部グリーンを<br>維持していることを確認する"]
        RF1 --> RF2 --> RF3 --> RF4
    end

    style RED_PHASE fill:#fde8e8
    style GREEN_PHASE fill:#e8fde8
    style REFACTOR_PHASE fill:#e8f4fd
```

### 2.3 サイクルの時間配分

```mermaid
xychart-beta
    title "TDD サイクルの理想的な時間配分（1サイクル = 10〜15分）"
    x-axis ["RED（テスト記述）", "GREEN（最小実装）", "REFACTOR（整理）"]
    y-axis "時間の割合（%）" 0 --> 60
    bar [25, 30, 45]
```

---

## 3. TDDのステップバイステップ実践

### 3.1 実践フローの詳細

```mermaid
flowchart TD
    STEP1["Step 1: 要件を小さなタスクに分解する<br>例：「注文を作成できる」→<br>・空の注文を作成できる<br>・商品を追加できる<br>・合計金額を計算できる<br>・注文を確定できる"]

    STEP2["Step 2: 最初のテストを選ぶ<br>最もシンプルなケースから始める<br>（ハッピーパスの最小単位）"]

    STEP3["Step 3: テストを書く（RED）<br>import → テスト関数定義 →<br>Arrange → Act → Assert"]

    STEP4["Step 4: テスト実行・失敗確認（RED確認）<br>エラーメッセージを読む<br>意図した理由で失敗しているか確認"]

    STEP5["Step 5: 最小限の実装（GREEN）<br>テストが通るだけのコードを書く<br>美しさは後回し"]

    STEP6["Step 6: テスト実行・成功確認（GREEN確認）<br>全テストがグリーンになることを確認"]

    STEP7["Step 7: リファクタリング（REFACTOR）<br>コードを改善する<br>テストコードも改善対象"]

    STEP8["Step 8: テスト実行・グリーン維持確認"]

    STEP9["Step 9: 次のテストケースへ<br>エッジケース・異常系を追加していく"]

    STEP1 --> STEP2 --> STEP3 --> STEP4 --> STEP5 --> STEP6 --> STEP7 --> STEP8 --> STEP9
    STEP9 --> |"繰り返す"| STEP2

    style STEP3 fill:#e74c3c,color:#fff
    style STEP4 fill:#e74c3c,color:#fff
    style STEP5 fill:#27ae60,color:#fff
    style STEP6 fill:#27ae60,color:#fff
    style STEP7 fill:#3498db,color:#fff
    style STEP8 fill:#3498db,color:#fff
```

### 3.2 テストケースの優先順序（Kent Beckのアドバイス）

```mermaid
graph TD
    PRIORITY["テストケースの優先順序"]

    PRIORITY --> T1["1️⃣ 最もシンプルなハッピーパス<br>例：正しい入力で正しい結果が返る"]
    PRIORITY --> T2["2️⃣ 次にシンプルなバリエーション<br>例：別の正しい入力パターン"]
    PRIORITY --> T3["3️⃣ エッジケース（境界値）<br>例：0、空文字、最大値・最小値"]
    PRIORITY --> T4["4️⃣ 異常系・エラーケース<br>例：無効な入力、存在しないリソース"]
    PRIORITY --> T5["5️⃣ 複合条件<br>例：複数条件が絡むケース"]

    T1 --> NOTE1["🎯 ここから始めることで<br>最初に基本構造を設計できる"]
    T3 --> NOTE3["⚠️ バグが潜みやすい箇所<br>境界値は必ずテストする"]
    T4 --> NOTE4["🛡️ 例外処理・エラーメッセージの<br>設計が自然に決まる"]

    style T1 fill:#27ae60,color:#fff
    style T2 fill:#3498db,color:#fff
    style T3 fill:#f39c12,color:#fff
    style T4 fill:#e74c3c,color:#fff
    style T5 fill:#8e44ad,color:#fff
```

---

## 4. テストの種類と役割

### 4.1 テストピラミッド

```mermaid
graph TD
    subgraph PYRAMID["🔺 テストピラミッド"]
        E2E["E2Eテスト（UI/システムテスト）<br>少数・遅い・高コスト・高信頼性<br>ツール：Playwright / Cypress / Selenium"]
        INTEGRATION["統合テスト<br>中程度・中速・中コスト<br>ツール：pytest + TestContainers / REST Assured"]
        UNIT["ユニットテスト<br>多数・速い・低コスト<br>ツール：pytest / Jest / JUnit"]
    end

    UNIT --> INTEGRATION --> E2E

    UNIT --> UNIT_NOTE["✅ TDDの主戦場<br>関数・クラス・メソッド単位<br>外部依存はモック化<br>実行時間：ミリ秒"]
    INTEGRATION --> INT_NOTE["⚙️ サービス間の連携を検証<br>DB・API・メッセージキュー<br>実行時間：秒"]
    E2E --> E2E_NOTE["🌐 ユーザー視点のシナリオ<br>ブラウザ操作・全体フロー<br>実行時間：分"]

    style UNIT fill:#27ae60,color:#fff
    style INTEGRATION fill:#f39c12,color:#fff
    style E2E fill:#e74c3c,color:#fff
```

### 4.2 TDDで主に書くテストの分類

```mermaid
flowchart LR
    subgraph UNIT_TESTS["ユニットテスト（TDDの主体）"]
        UT1["純粋関数のテスト<br>入力→出力の検証"]
        UT2["ドメインエンティティのテスト<br>ビジネスルールの検証"]
        UT3["値オブジェクトのテスト<br>計算・バリデーション"]
        UT4["ユースケースのテスト<br>モックを使った協調テスト"]
    end

    subgraph INT_TESTS["統合テスト（TDDで補完）"]
        IT1["リポジトリの統合テスト<br>実際のDB操作の検証"]
        IT2["外部APIクライアントのテスト<br>HTTP通信の検証"]
        IT3["イベントハンドラーのテスト<br>メッセージ処理の検証"]
    end

    subgraph CONTRACT_TESTS["契約テスト"]
        CT1["APIの契約テスト<br>OpenAPI仕様との整合性"]
        CT2["サービス間の契約テスト<br>Pact / Spring Cloud Contract"]
    end

    style UNIT_TESTS fill:#e8fde8
    style INT_TESTS fill:#fef9e7
    style CONTRACT_TESTS fill:#f0f4ff
```

### 4.3 テストの実行速度と信頼性のトレードオフ

```mermaid
quadrantChart
    title テスト種別：実行速度 vs 信頼性
    x-axis 実行速度（遅い） --> 実行速度（速い）
    y-axis 信頼性（低い） --> 信頼性（高い）
    quadrant-1 "TDDの理想ゾーン<br>速い×信頼性高い"
    quadrant-2 "避けるべき<br>遅い×信頼性高い"
    quadrant-3 "使えない<br>遅い×信頼性低い"
    quadrant-4 "補助的に使う<br>速い×信頼性低い"
    純粋関数ユニットテスト: [0.95, 0.9]
    ドメインロジックテスト: [0.9, 0.85]
    インメモリリポジトリテスト: [0.85, 0.8]
    DB統合テスト: [0.3, 0.85]
    E2Eテスト: [0.1, 0.95]
    フラッキーなE2E: [0.15, 0.2]
```

---

## 5. ユニットテストの設計原則

### 5.1 F.I.R.S.T. 原則

```mermaid
graph TD
    FIRST["🎯 F.I.R.S.T. 原則<br>（良いユニットテストの基準）"]

    FIRST --> F["⚡ F: Fast（速い）<br>ミリ秒で完了すること<br>DBやネットワークに依存しない<br>何千件でも高速に実行できる"]

    FIRST --> I["🔒 I: Independent（独立）<br>テスト間の依存関係がない<br>任意の順序で実行できる<br>並列実行が可能"]

    FIRST --> R["🔁 R: Repeatable（再現可能）<br>同じ入力で常に同じ結果<br>日時・乱数・外部APIに依存しない<br>どの環境でも同じ結果"]

    FIRST --> S["✅ S: Self-validating（自己検証）<br>Pass/Failが自動的に判定される<br>手動での結果確認が不要<br>boolean のアサーション"]

    FIRST --> T["⏱️ T: Timely（タイムリー）<br>プロダクションコードの直前に書く<br>TDDではテストを先に書く<br>後回しにしない"]

    style F fill:#e74c3c,color:#fff
    style I fill:#3498db,color:#fff
    style R fill:#27ae60,color:#fff
    style S fill:#f39c12,color:#fff
    style T fill:#8e44ad,color:#fff
```

### 5.2 テスト命名規則

```mermaid
graph TD
    subgraph "✅ 良いテスト名の例"
        G1["test_注文に商品を追加すると合計金額が増える"]
        G2["test_在庫が0の商品はカートに追加できない"]
        G3["test_未認証ユーザーが注文しようとすると401エラーが返る"]
        G4["should_calculate_total_when_multiple_items_added"]
        G5["given_empty_cart_when_checkout_then_error_raised"]
    end

    subgraph "❌ 悪いテスト名の例"
        B1["test_001"]
        B2["test_order"]
        B3["test_it_works"]
        B4["check"]
        B5["order_test_1"]
    end

    subgraph "命名パターン"
        P1["パターン1: 日本語で意図を明確に<br>test_[条件]_[操作]_[期待結果]"]
        P2["パターン2: Given-When-Then形式<br>given_[状態]_when_[操作]_then_[結果]"]
        P3["パターン3: should形式<br>should_[期待する振る舞い]"]
    end

    style G1 fill:#27ae60,color:#fff
    style G2 fill:#27ae60,color:#fff
    style G3 fill:#27ae60,color:#fff
    style G4 fill:#27ae60,color:#fff
    style G5 fill:#27ae60,color:#fff
    style B1 fill:#e74c3c,color:#fff
    style B2 fill:#e74c3c,color:#fff
    style B3 fill:#e74c3c,color:#fff
    style B4 fill:#e74c3c,color:#fff
    style B5 fill:#e74c3c,color:#fff
```

### 5.3 テストの独立性を保つ工夫

```mermaid
flowchart TD
    subgraph "テスト独立性の確保方法"
        S1["🏗️ Setup（前処理）<br>各テスト実行前に<br>クリーンな状態を作る<br>pytest: @pytest.fixture<br>JUnit: @BeforeEach"]
        S2["🧹 Teardown（後処理）<br>各テスト実行後に<br>状態をリセットする<br>DBのロールバックなど"]
        S3["🎭 テスト用の<br>インメモリ実装<br>InMemoryRepository など<br>外部依存を完全に排除"]
        S4["🔀 テスト実行順序を<br>ランダムにする<br>順序依存のバグを発見<br>pytest-randomly などで設定"]
    end

    S1 --> S2 --> S3 --> S4

    style S1 fill:#3498db,color:#fff
    style S2 fill:#3498db,color:#fff
    style S3 fill:#27ae60,color:#fff
    style S4 fill:#f39c12,color:#fff
```

---

## 6. モックとスタブの活用

### 6.1 テストダブルの種類

```mermaid
graph TD
    TD["🎭 テストダブル（Test Double）<br>本物の依存の代替物"]

    TD --> DUMMY["👻 Dummy<br>渡されるが使われない<br>例：nullやダミーオブジェクト<br>使用場面：引数を埋めるだけ"]

    TD --> STUB["📋 Stub<br>固定値を返す偽物<br>例：常に true を返す<br>使用場面：状態の設定"]

    TD --> FAKE["🎪 Fake<br>動作する軽量実装<br>例：InMemoryRepository<br>使用場面：DB不要のテスト"]

    TD --> SPY["🔍 Spy<br>呼び出しを記録するStub<br>例：何回呼ばれたか記録<br>使用場面：副作用の検証"]

    TD --> MOCK["🤖 Mock<br>期待値を事前設定<br>例：特定の引数で呼ばれることを期待<br>使用場面：相互作用テスト"]

    style DUMMY fill:#95a5a6,color:#fff
    style STUB fill:#3498db,color:#fff
    style FAKE fill:#27ae60,color:#fff
    style SPY fill:#f39c12,color:#fff
    style MOCK fill:#e74c3c,color:#fff
```

### 6.2 モックを使う場面・使わない場面

```mermaid
graph TD
    subgraph "✅ モックを使うべき場面"
        USE1["外部APIの呼び出し<br>Stripe, SendGrid, Slack APIなど"]
        USE2["データベースの操作<br>（ユニットテスト内）"]
        USE3["時刻・乱数・UUIDの生成<br>再現性を担保するため"]
        USE4["メール送信・通知<br>副作用を持つ処理"]
        USE5["非決定的な外部サービス<br>レスポンスが変わりうるもの"]
    end

    subgraph "❌ モックを使わないほうが良い場面"
        NO_USE1["ドメインエンティティ<br>（純粋なビジネスロジック）"]
        NO_USE2["値オブジェクト<br>（計算・バリデーション）"]
        NO_USE3["ファクトリ関数<br>（オブジェクト生成）"]
        NO_USE4["状態がないユーティリティ<br>（純粋関数）"]
    end

    style USE1 fill:#27ae60,color:#fff
    style USE2 fill:#27ae60,color:#fff
    style USE3 fill:#27ae60,color:#fff
    style USE4 fill:#27ae60,color:#fff
    style USE5 fill:#27ae60,color:#fff
    style NO_USE1 fill:#e74c3c,color:#fff
    style NO_USE2 fill:#e74c3c,color:#fff
    style NO_USE3 fill:#e74c3c,color:#fff
    style NO_USE4 fill:#e74c3c,color:#fff
```

### 6.3 モックの実装例（Python pytest）

```python
import pytest
from unittest.mock import MagicMock, AsyncMock, patch, call
from datetime import datetime


# ─── テスト対象のクラス ───

class EmailService:
    """メール送信サービス（外部依存）"""
    def send_order_confirmation(self, to: str, order_id: str) -> bool:
        # 実際はSendGrid APIを呼び出す
        raise NotImplementedError("外部API呼び出し")


class OrderService:
    """注文サービス（テスト対象）"""
    def __init__(
        self,
        order_repository,    # リポジトリの依存
        email_service: EmailService,  # メールサービスの依存
        clock=None           # 時刻注入（再現性のため）
    ):
        self._repo = order_repository
        self._email = email_service
        self._clock = clock or datetime.utcnow

    def place_order(self, customer_id: str, items: list) -> dict:
        """注文を確定し確認メールを送る"""
        order = {
            "id": "order_123",
            "customer_id": customer_id,
            "items": items,
            "created_at": self._clock().isoformat(),
            "status": "confirmed"
        }
        self._repo.save(order)
        self._email.send_order_confirmation(
            to=f"{customer_id}@example.com",
            order_id=order["id"]
        )
        return order


# ─── テストコード ───

class TestOrderServiceWithMock:
    """モックを使った OrderService のテスト"""

    @pytest.fixture
    def mock_repo(self):
        """モックリポジトリ"""
        return MagicMock()

    @pytest.fixture
    def mock_email(self):
        """モックメールサービス"""
        mock = MagicMock()
        mock.send_order_confirmation.return_value = True
        return mock

    @pytest.fixture
    def fixed_clock(self):
        """固定時刻（再現性確保）"""
        return lambda: datetime(2024, 1, 15, 10, 30, 0)

    @pytest.fixture
    def order_service(self, mock_repo, mock_email, fixed_clock):
        """テスト対象のOrderService（依存をすべてモックに置き換え）"""
        return OrderService(
            order_repository=mock_repo,
            email_service=mock_email,
            clock=fixed_clock,
        )

    def test_注文確定後にリポジトリに保存される(self, order_service, mock_repo):
        """注文確定後にリポジトリのsaveが呼ばれること"""
        # Act
        order_service.place_order(
            customer_id="cust_001",
            items=[{"product_id": "prod_001", "quantity": 2}]
        )

        # Assert: saveが1回呼ばれたことを検証
        mock_repo.save.assert_called_once()

        # 保存されたデータの検証
        saved_order = mock_repo.save.call_args[0][0]
        assert saved_order["customer_id"] == "cust_001"
        assert saved_order["status"] == "confirmed"

    def test_注文確定後に確認メールが送られる(self, order_service, mock_email):
        """注文確定後にメール送信が呼ばれること"""
        # Act
        result = order_service.place_order(
            customer_id="cust_001",
            items=[{"product_id": "prod_001", "quantity": 1}]
        )

        # Assert: メール送信が正しい引数で呼ばれたことを検証
        mock_email.send_order_confirmation.assert_called_once_with(
            to="cust_001@example.com",
            order_id=result["id"]
        )

    def test_作成日時が固定時刻で設定される(self, order_service):
        """時刻インジェクションにより作成日時が固定になること"""
        # Act
        result = order_service.place_order(
            customer_id="cust_001",
            items=[]
        )

        # Assert
        assert result["created_at"] == "2024-01-15T10:30:00"

    def test_メール送信が失敗しても例外を伝播する(self, mock_repo, fixed_clock):
        """メール送信失敗時に例外が発生すること"""
        # Arrange: メール送信が例外を発生させるモック
        mock_email_fail = MagicMock()
        mock_email_fail.send_order_confirmation.side_effect = ConnectionError("SMTP接続失敗")

        service = OrderService(
            order_repository=mock_repo,
            email_service=mock_email_fail,
            clock=fixed_clock,
        )

        # Act & Assert
        with pytest.raises(ConnectionError, match="SMTP接続失敗"):
            service.place_order(customer_id="cust_001", items=[])
```

---

## 7. AAAパターン（Arrange-Act-Assert）

### 7.1 AAAパターンの構造

```mermaid
graph TD
    AAA["🎯 AAA パターン（テストの基本構造）"]

    AAA --> ARRANGE["📦 Arrange（準備）<br>テストに必要な状態を設定する<br>・テスト対象オブジェクトの生成<br>・依存関係（モック等）の設定<br>・入力データの準備"]

    AAA --> ACT["⚡ Act（実行）<br>テスト対象の処理を実行する<br>・通常は1行だけ<br>・テストしたい操作を実行<br>・戻り値を変数に保存"]

    AAA --> ASSERT["✅ Assert（検証）<br>期待する結果を検証する<br>・戻り値の検証<br>・副作用（DB保存・メール送信）の検証<br>・例外の検証"]

    ARRANGE --> NOTE_A["複雑になった場合は<br>Fixtureに切り出す"]
    ACT --> NOTE_B["1テスト1操作の原則<br>複数のActは危険信号"]
    ASSERT --> NOTE_C["1テスト1アサーションを推奨<br>（関連するものは複数可）"]

    style ARRANGE fill:#3498db,color:#fff
    style ACT fill:#f39c12,color:#fff
    style ASSERT fill:#27ae60,color:#fff
```

### 7.2 AAAパターンの実装例

```python
import pytest
from decimal import Decimal


# ─── テスト対象 ───

class ShoppingCart:
    """ショッピングカート"""

    def __init__(self):
        self._items: list[dict] = []

    def add_item(self, product_id: str, name: str, price: Decimal, quantity: int):
        if quantity <= 0:
            raise ValueError("数量は1以上でなければなりません")
        if price < 0:
            raise ValueError("価格は0以上でなければなりません")

        existing = next((i for i in self._items if i["product_id"] == product_id), None)
        if existing:
            existing["quantity"] += quantity
        else:
            self._items.append({
                "product_id": product_id,
                "name": name,
                "price": price,
                "quantity": quantity,
            })

    def remove_item(self, product_id: str):
        self._items = [i for i in self._items if i["product_id"] != product_id]

    def total(self) -> Decimal:
        return sum(item["price"] * item["quantity"] for item in self._items)

    @property
    def item_count(self) -> int:
        return sum(item["quantity"] for item in self._items)

    @property
    def is_empty(self) -> bool:
        return len(self._items) == 0


# ─── TDDで書くテスト ───

class TestShoppingCart:

    # ─────── ① シンプルなケースから始める ───────

    def test_新規カートは空である(self):
        # Arrange
        cart = ShoppingCart()

        # Act（プロパティ参照も Act）
        result = cart.is_empty

        # Assert
        assert result is True

    def test_新規カートの合計は0円である(self):
        # Arrange
        cart = ShoppingCart()

        # Act
        total = cart.total()

        # Assert
        assert total == Decimal("0")

    # ─────── ② 基本機能のテスト ───────

    def test_商品を追加すると合計金額が増える(self):
        # Arrange
        cart = ShoppingCart()
        price = Decimal("1000")
        quantity = 2

        # Act
        cart.add_item("prod_001", "Tシャツ", price, quantity)

        # Assert
        assert cart.total() == Decimal("2000")

    def test_複数の商品を追加すると合計金額が合算される(self):
        # Arrange
        cart = ShoppingCart()

        # Act
        cart.add_item("prod_001", "Tシャツ",  Decimal("1000"), 2)
        cart.add_item("prod_002", "ジーンズ", Decimal("5000"), 1)

        # Assert
        assert cart.total() == Decimal("7000")

    def test_同じ商品を追加すると数量が増える(self):
        # Arrange
        cart = ShoppingCart()
        cart.add_item("prod_001", "Tシャツ", Decimal("1000"), 1)

        # Act
        cart.add_item("prod_001", "Tシャツ", Decimal("1000"), 2)

        # Assert
        assert cart.item_count == 3

    # ─────── ③ 商品削除のテスト ───────

    def test_商品を削除すると合計金額が減る(self):
        # Arrange
        cart = ShoppingCart()
        cart.add_item("prod_001", "Tシャツ",  Decimal("1000"), 1)
        cart.add_item("prod_002", "ジーンズ", Decimal("5000"), 1)

        # Act
        cart.remove_item("prod_001")

        # Assert
        assert cart.total() == Decimal("5000")

    def test_全商品を削除するとカートが空になる(self):
        # Arrange
        cart = ShoppingCart()
        cart.add_item("prod_001", "Tシャツ", Decimal("1000"), 1)

        # Act
        cart.remove_item("prod_001")

        # Assert
        assert cart.is_empty is True

    # ─────── ④ エッジケース・異常系 ───────

    def test_数量0で商品追加するとValueErrorが発生する(self):
        # Arrange
        cart = ShoppingCart()

        # Act & Assert
        with pytest.raises(ValueError, match="数量は1以上でなければなりません"):
            cart.add_item("prod_001", "Tシャツ", Decimal("1000"), 0)

    def test_マイナス数量で商品追加するとValueErrorが発生する(self):
        # Arrange
        cart = ShoppingCart()

        # Act & Assert
        with pytest.raises(ValueError):
            cart.add_item("prod_001", "Tシャツ", Decimal("1000"), -1)

    def test_マイナス価格で商品追加するとValueErrorが発生する(self):
        # Arrange
        cart = ShoppingCart()

        # Act & Assert
        with pytest.raises(ValueError, match="価格は0以上でなければなりません"):
            cart.add_item("prod_001", "Tシャツ", Decimal("-100"), 1)

    def test_存在しない商品を削除してもエラーにならない(self):
        # Arrange
        cart = ShoppingCart()

        # Act & Assert（例外が発生しないことを確認）
        cart.remove_item("non_existent_product")  # エラーにならない
        assert cart.is_empty is True
```

---

## 8. TDDの実装例：ドメインロジック編

### 8.1 TDDの実践フロー可視化

```mermaid
sequenceDiagram
    participant DEV as 開発者
    participant TEST as テストコード
    participant PROD as プロダクションコード
    participant CI as テストランナー

    Note over DEV,CI: 🔴 RED フェーズ

    DEV->>TEST: test_空の注文に商品を追加できる を書く
    DEV->>CI: pytest を実行
    CI-->>DEV: ❌ FAIL（OrderクラスがImportError）

    Note over DEV,CI: 🟢 GREEN フェーズ

    DEV->>PROD: class Order を最小限実装
    DEV->>CI: pytest を実行
    CI-->>DEV: ✅ PASS

    Note over DEV,CI: 🔵 REFACTOR フェーズ

    DEV->>PROD: コードを整理・改善する
    DEV->>CI: pytest を実行
    CI-->>DEV: ✅ PASS（全テスト）

    Note over DEV,CI: 次のテストへ（繰り返し）

    DEV->>TEST: test_確定済み注文に商品追加するとエラー を書く
    DEV->>CI: pytest を実行
    CI-->>DEV: ❌ FAIL（期待通り）

    DEV->>PROD: confirm() メソッドにバリデーション追加
    DEV->>CI: pytest を実行
    CI-->>DEV: ✅ PASS（全テスト）
```

### 8.2 ドメインロジックのTDD完全実装例

```python
# ──────────────────────────────────────────────────
# Step 1: まずテストを書く（RED）
# ──────────────────────────────────────────────────

import pytest
from decimal import Decimal
from dataclasses import dataclass, field
from enum import Enum
from typing import Optional
from uuid import uuid4


# ─── TDDサイクル1: 注文の作成 ───

class TestOrderCreation:

    def test_注文を作成すると保留中ステータスになる(self):
        # RED: この時点では Order クラスが存在しない → ImportError

        # Arrange & Act
        order = Order.create(customer_id="cust_123")

        # Assert
        assert order.status == OrderStatus.PENDING

    def test_作成した注文は空の明細を持つ(self):
        order = Order.create(customer_id="cust_123")
        assert order.is_empty is True

    def test_作成した注文の合計金額は0円(self):
        order = Order.create(customer_id="cust_123")
        assert order.total == Money(0, "JPY")


# ─── TDDサイクル2: 商品の追加 ───

class TestOrderItemAddition:

    @pytest.fixture
    def empty_order(self):
        return Order.create(customer_id="cust_123")

    def test_商品を追加するとisEmptyがFalseになる(self, empty_order):
        empty_order.add_line("prod_001", "Tシャツ", Money(1000, "JPY"), 1)
        assert empty_order.is_empty is False

    def test_商品追加後に合計金額が計算される(self, empty_order):
        empty_order.add_line("prod_001", "Tシャツ", Money(1000, "JPY"), 2)
        assert empty_order.total == Money(2000, "JPY")

    def test_複数商品の合計金額が正しく計算される(self, empty_order):
        empty_order.add_line("prod_001", "Tシャツ",  Money(1000, "JPY"), 2)
        empty_order.add_line("prod_002", "ジーンズ", Money(5000, "JPY"), 1)
        assert empty_order.total == Money(7000, "JPY")

    def test_数量0で追加しようとするとValueErrorが発生する(self, empty_order):
        with pytest.raises(ValueError, match="数量は1以上"):
            empty_order.add_line("prod_001", "Tシャツ", Money(1000, "JPY"), 0)


# ─── TDDサイクル3: 注文の確定 ───

class TestOrderConfirmation:

    @pytest.fixture
    def order_with_items(self):
        order = Order.create(customer_id="cust_123")
        order.add_line("prod_001", "Tシャツ", Money(1000, "JPY"), 1)
        return order

    def test_商品があれば注文を確定できる(self, order_with_items):
        order_with_items.confirm()
        assert order_with_items.status == OrderStatus.CONFIRMED

    def test_空の注文は確定できない(self):
        order = Order.create(customer_id="cust_123")
        with pytest.raises(ValueError, match="商品が1件もありません"):
            order.confirm()

    def test_確定済み注文を再度確定しようとするとエラー(self, order_with_items):
        order_with_items.confirm()
        with pytest.raises(ValueError, match="保留中の注文のみ確定できます"):
            order_with_items.confirm()

    def test_確定済み注文には商品を追加できない(self, order_with_items):
        order_with_items.confirm()
        with pytest.raises(ValueError, match="確定済みの注文は変更できません"):
            order_with_items.add_line("prod_002", "ジーンズ", Money(5000, "JPY"), 1)


# ──────────────────────────────────────────────────
# Step 2: テストを通す実装（GREEN → REFACTOR）
# ──────────────────────────────────────────────────

class OrderStatus(Enum):
    PENDING   = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"


@dataclass(frozen=True)
class Money:
    amount: int
    currency: str

    def __post_init__(self):
        if self.amount < 0:
            raise ValueError(f"金額は0以上: {self.amount}")

    def __add__(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError(f"通貨不一致: {self.currency} vs {other.currency}")
        return Money(self.amount + other.amount, self.currency)

    def __mul__(self, factor: int) -> "Money":
        return Money(self.amount * factor, self.currency)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Money):
            return False
        return self.amount == other.amount and self.currency == other.currency


@dataclass
class OrderLine:
    product_id:   str
    product_name: str
    unit_price:   Money
    quantity:     int

    @property
    def subtotal(self) -> Money:
        return self.unit_price * self.quantity


@dataclass
class Order:
    id:          str
    customer_id: str
    _lines:      list[OrderLine] = field(default_factory=list)
    _status:     OrderStatus     = OrderStatus.PENDING

    @classmethod
    def create(cls, customer_id: str) -> "Order":
        """ファクトリメソッド"""
        return cls(id=str(uuid4()), customer_id=customer_id)

    def add_line(
        self,
        product_id: str,
        product_name: str,
        unit_price: Money,
        quantity: int,
    ) -> None:
        if self._status != OrderStatus.PENDING:
            raise ValueError("確定済みの注文は変更できません")
        if quantity <= 0:
            raise ValueError(f"数量は1以上でなければなりません: {quantity}")

        existing = next(
            (l for l in self._lines if l.product_id == product_id), None
        )
        if existing:
            existing.quantity += quantity
        else:
            self._lines.append(OrderLine(product_id, product_name, unit_price, quantity))

    def confirm(self) -> None:
        if self._status != OrderStatus.PENDING:
            raise ValueError("保留中の注文のみ確定できます")
        if not self._lines:
            raise ValueError("商品が1件もありません")
        self._status = OrderStatus.CONFIRMED

    def cancel(self) -> None:
        if self._status == OrderStatus.CONFIRMED:
            self._status = OrderStatus.CANCELLED
        else:
            raise ValueError("確定済み注文のみキャンセルできます")

    @property
    def status(self) -> OrderStatus:
        return self._status

    @property
    def is_empty(self) -> bool:
        return len(self._lines) == 0

    @property
    def total(self) -> Money:
        if self.is_empty:
            return Money(0, "JPY")
        totals = [line.subtotal for line in self._lines]
        result = totals[0]
        for t in totals[1:]:
            result = result + t
        return result
```

---

## 9. TDDの実装例：APIエンドポイント編

### 9.1 APIテストのTDDフロー

```mermaid
flowchart TD
    API_RED["🔴 RED: APIテストを先に書く<br>・エンドポイントのURL設計<br>・リクエスト形式の設計<br>・レスポンス形式の設計<br>・ステータスコードの設計"]

    API_GREEN["🟢 GREEN: エンドポイントを実装<br>・ルーティング設定<br>・リクエストのバリデーション<br>・ユースケースの呼び出し<br>・レスポンスの整形"]

    API_REFACTOR["🔵 REFACTOR: コードを整理<br>・バリデーションロジックの整理<br>・エラーハンドリングの統一<br>・レスポンス形式の共通化"]

    API_RED --> API_GREEN --> API_REFACTOR

    style API_RED fill:#e74c3c,color:#fff
    style API_GREEN fill:#27ae60,color:#fff
    style API_REFACTOR fill:#3498db,color:#fff
```

### 9.2 FastAPI エンドポイントのTDD実装例

```python
import pytest
from fastapi.testclient import TestClient
from fastapi import FastAPI
from unittest.mock import MagicMock
from decimal import Decimal


# ──────────────────────────────────────────────────
# 🔴 RED: まずテストを書く
# ──────────────────────────────────────────────────

class TestCreateOrderEndpoint:
    """POST /v1/orders エンドポイントのTDDテスト"""

    @pytest.fixture
    def mock_use_case(self):
        """PlaceOrderUseCaseのモック"""
        mock = MagicMock()
        mock.execute.return_value = {
            "order_id": "order_abc123",
            "status": "confirmed",
            "total_amount": 2000,
            "currency": "JPY",
        }
        return mock

    @pytest.fixture
    def client(self, mock_use_case):
        """テスト用FastAPIクライアント"""
        app = create_app(place_order_use_case=mock_use_case)
        return TestClient(app), mock_use_case

    def test_有効なリクエストで201が返る(self, client):
        test_client, _ = client
        payload = {
            "customer_id": "cust_123",
            "items": [
                {"product_id": "prod_001", "quantity": 2}
            ]
        }

        response = test_client.post("/v1/orders", json=payload)

        assert response.status_code == 201

    def test_有効なリクエストでorder_idが返る(self, client):
        test_client, _ = client
        payload = {
            "customer_id": "cust_123",
            "items": [{"product_id": "prod_001", "quantity": 1}]
        }

        response = test_client.post("/v1/orders", json=payload)

        data = response.json()
        assert "order_id" in data
        assert data["order_id"] == "order_abc123"

    def test_customer_idが空のとき422が返る(self, client):
        test_client, _ = client
        payload = {
            "customer_id": "",   # 空文字はNG
            "items": [{"product_id": "prod_001", "quantity": 1}]
        }

        response = test_client.post("/v1/orders", json=payload)

        assert response.status_code == 422

    def test_itemsが空リストのとき422が返る(self, client):
        test_client, _ = client
        payload = {
            "customer_id": "cust_123",
            "items": []  # 空リストはNG
        }

        response = test_client.post("/v1/orders", json=payload)

        assert response.status_code == 422

    def test_数量が0のとき422が返る(self, client):
        test_client, _ = client
        payload = {
            "customer_id": "cust_123",
            "items": [{"product_id": "prod_001", "quantity": 0}]  # 0はNG
        }

        response = test_client.post("/v1/orders", json=payload)

        assert response.status_code == 422

    def test_存在しない顧客のとき404が返る(self, client):
        test_client, mock_uc = client
        # モックを上書き: 顧客が見つからない場合
        mock_uc.execute.side_effect = EntityNotFoundError("顧客が見つかりません")

        payload = {
            "customer_id": "unknown_customer",
            "items": [{"product_id": "prod_001", "quantity": 1}]
        }

        response = test_client.post("/v1/orders", json=payload)

        assert response.status_code == 404

    def test_ユースケースが正しい引数で呼ばれる(self, client):
        test_client, mock_uc = client
        payload = {
            "customer_id": "cust_123",
            "items": [{"product_id": "prod_001", "quantity": 2}]
        }

        test_client.post("/v1/orders", json=payload)

        # ユースケースが正しい引数で呼ばれたか検証
        mock_uc.execute.assert_called_once()
        call_args = mock_uc.execute.call_args[0][0]
        assert call_args.customer_id == "cust_123"
        assert len(call_args.items) == 1
        assert call_args.items[0]["product_id"] == "prod_001"


# ──────────────────────────────────────────────────
# 🟢 GREEN: エンドポイントを実装
# ──────────────────────────────────────────────────

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List


class OrderItemRequest(BaseModel):
    product_id: str = Field(..., min_length=1)
    quantity:   int = Field(..., ge=1)


class CreateOrderRequest(BaseModel):
    customer_id: str               = Field(..., min_length=1)
    items:       List[OrderItemRequest] = Field(..., min_items=1)


class EntityNotFoundError(Exception):
    pass


class BusinessRuleError(Exception):
    pass


def create_app(place_order_use_case) -> FastAPI:
    """アプリケーションファクトリ（テスト時に依存を注入可能）"""
    app = FastAPI()

    @app.post("/v1/orders", status_code=201)
    async def create_order(request: CreateOrderRequest):
        from dataclasses import dataclass

        @dataclass
        class PlaceOrderCommand:
            customer_id: str
            items: list

        try:
            command = PlaceOrderCommand(
                customer_id=request.customer_id,
                items=[{"product_id": i.product_id, "quantity": i.quantity}
                       for i in request.items],
            )
            result = place_order_use_case.execute(command)
            return result
        except EntityNotFoundError as e:
            raise HTTPException(status_code=404, detail=str(e))
        except BusinessRuleError as e:
            raise HTTPException(status_code=422, detail=str(e))

    return app
```

---

## 10. TDDの実装例：データベース層編

### 10.1 リポジトリのTDD戦略

```mermaid
flowchart TD
    subgraph "リポジトリのTDD戦略"
        S1["🎭 ユニットテスト用<br>InMemoryRepository<br>・外部依存なし<br>・超高速実行<br>・ビジネスロジックのテストで使用"]

        S2["🐳 統合テスト用<br>TestContainersでDB起動<br>・実際のDBで動作確認<br>・クエリのパフォーマンス検証<br>・CI/CDで自動実行"]

        S3["🔄 両方をカバーする<br>インターフェース設計<br>・OrderRepository（抽象）<br>・InMemoryOrderRepository（テスト用）<br>・SQLAlchemyOrderRepository（本番用）"]
    end

    S1 --> S3
    S2 --> S3

    style S1 fill:#27ae60,color:#fff
    style S2 fill:#3498db,color:#fff
    style S3 fill:#8e44ad,color:#fff
```

### 10.2 InMemoryRepositoryの実装例

```python
from abc import ABC, abstractmethod
from typing import Optional
import pytest


# ─── インターフェース定義（Use Cases層）───

class OrderRepository(ABC):
    @abstractmethod
    def save(self, order: dict) -> None: ...

    @abstractmethod
    def find_by_id(self, order_id: str) -> Optional[dict]: ...

    @abstractmethod
    def find_by_customer_id(self, customer_id: str) -> list[dict]: ...

    @abstractmethod
    def exists(self, order_id: str) -> bool: ...


from copy import deepcopy

# ─── InMemory実装（テスト用）───

class InMemoryOrderRepository(OrderRepository):
    """
    テスト専用のインメモリリポジトリ実装
    DBなしで高速にテストを実行できる
    """
    def __init__(self):
        self._store: dict[str, dict] = {}

    def save(self, order: dict) -> None:
        self._store[order["id"]] = deepcopy(order)

    def find_by_id(self, order_id: str) -> Optional[dict]:
        record = self._store.get(order_id)
        return deepcopy(record) if record else None

    def find_by_customer_id(self, customer_id: str) -> list[dict]:
        return [
            deepcopy(o) for o in self._store.values()
            if o.get("customer_id") == customer_id
        ]

    def exists(self, order_id: str) -> bool:
        return order_id in self._store

    def count(self) -> int:
        """テスト用ヘルパー"""
        return len(self._store)

    def clear(self) -> None:
        """テスト間のリセット用"""
        self._store.clear()


# ─── TDDテスト（まずインターフェースを定義するテストを書く）───

class TestOrderRepository:
    """
    OrderRepositoryの契約テスト
    InMemoryとSQLAlchemy両方で動くことを保証
    """

    @pytest.fixture
    def repo(self) -> OrderRepository:
        """テストで使うリポジトリ（派生クラスでオーバーライド可能）"""
        return InMemoryOrderRepository()

    @pytest.fixture
    def sample_order(self) -> dict:
        return {
            "id": "order_001",
            "customer_id": "cust_001",
            "status": "pending",
            "total_amount": 1000,
        }

    def test_注文を保存して取得できる(self, repo, sample_order):
        # Act
        repo.save(sample_order)
        result = repo.find_by_id(sample_order["id"])

        # Assert
        assert result is not None
        assert result["id"] == sample_order["id"]
        assert result["customer_id"] == sample_order["customer_id"]

    def test_存在しないIDで検索するとNoneが返る(self, repo):
        result = repo.find_by_id("non_existent_id")
        assert result is None

    def test_顧客IDで注文一覧を取得できる(self, repo):
        # Arrange
        order1 = {"id": "order_001", "customer_id": "cust_001", "status": "pending"}
        order2 = {"id": "order_002", "customer_id": "cust_001", "status": "confirmed"}
        order3 = {"id": "order_003", "customer_id": "cust_002", "status": "pending"}
        repo.save(order1)
        repo.save(order2)
        repo.save(order3)

        # Act
        results = repo.find_by_customer_id("cust_001")

        # Assert
        assert len(results) == 2
        result_ids = {r["id"] for r in results}
        assert result_ids == {"order_001", "order_002"}

    def test_存在チェックができる(self, repo, sample_order):
        # Arrange: 保存前は存在しない
        assert repo.exists(sample_order["id"]) is False

        # Act: 保存する
        repo.save(sample_order)

        # Assert: 保存後は存在する
        assert repo.exists(sample_order["id"]) is True

    def test_注文を更新できる(self, repo, sample_order):
        # Arrange
        repo.save(sample_order)

        # Act: ステータスを更新して再保存
        updated_order = sample_order.copy()
        updated_order["status"] = "confirmed"
        repo.save(updated_order)

        # Assert
        result = repo.find_by_id(sample_order["id"])
        assert result["status"] == "confirmed"

    def test_保存したデータが変更されても元のデータは変わらない(self, repo, sample_order):
        """保存時にコピーされること（変更防止）"""
        # Arrange
        repo.save(sample_order)

        # Act: 元のdictを変更する
        sample_order["status"] = "cancelled"

        # Assert: リポジトリ内のデータは変わらない
        result = repo.find_by_id(sample_order["id"])
        assert result["status"] == "pending"

    def test_取得したデータを変更しても元のデータは変わらない(self, repo, sample_order):
        """取得時にコピーが返されること（変更防止）"""
        # Arrange
        repo.save(sample_order)
        result = repo.find_by_id(sample_order["id"])

        # Act: 取得したオブジェクトを変更する
        result["status"] = "cancelled"

        # Assert: 再取得したデータは変わっていない
        refetched = repo.find_by_id(sample_order["id"])
        assert refetched["status"] == "pending"
```

---

## 11. BDD（振る舞い駆動開発）との連携

### 11.1 TDD vs BDD の関係

```mermaid
graph TB
    subgraph "TDDとBDDの位置づけ"
        BDD_OUTER["BDD（振る舞い駆動開発）<br>ビジネス視点のシナリオを先に書く<br>Gherkin記法（Given/When/Then）<br>ステークホルダーと合意形成"]

        TDD_INNER["TDD（テスト駆動開発）<br>開発者視点の実装テストを先に書く<br>Pythonコードでテストを書く<br>Red-Green-Refactorサイクル"]

        BDD_OUTER --> |"外側のループ（受け入れテスト）"| TDD_INNER
        TDD_INNER --> |"内側のループ（ユニットテスト）"| TDD_INNER
    end

    style BDD_OUTER fill:#8e44ad,color:#fff
    style TDD_INNER fill:#27ae60,color:#fff
```

### 11.2 BDDシナリオからTDDへの変換

```python
# ─── BDDシナリオ（Gherkin記法）───

"""
Feature: ショッピングカートの操作

  Scenario: 顧客が商品をカートに追加する
    Given 顧客がカートを持っている
    When 顧客が「Tシャツ（1000円）」を2枚カートに追加する
    Then カートの合計金額は2000円になる

  Scenario: 在庫がない商品はカートに追加できない
    Given 「ジーンズ」の在庫が0件である
    When 顧客が「ジーンズ」をカートに追加しようとする
    Then エラーメッセージ「在庫がありません」が表示される
"""

# ─── BDDシナリオをTDD形式に変換 ───

import pytest
from pytest_bdd import given, when, then, scenario, parsers


@scenario("cart.feature", "顧客が商品をカートに追加する")
def test_顧客が商品をカートに追加できる():
    pass


@given("顧客がカートを持っている")
def customer_has_cart():
    return ShoppingCart()


@when(parsers.parse('顧客が「{product_name}（{price:d}円）」を{quantity:d}枚カートに追加する'))
def add_item_to_cart(customer_has_cart, product_name, price, quantity):
    customer_has_cart.add_item(
        product_id="prod_001",
        name=product_name,
        price=Decimal(str(price)),
        quantity=quantity,
    )


@then(parsers.parse("カートの合計金額は{expected_total:d}円になる"))
def verify_total(customer_has_cart, expected_total):
    assert customer_has_cart.total() == Decimal(str(expected_total))
```

---

## 12. テストカバレッジの考え方

### 12.1 カバレッジの種類と使い分け

```mermaid
graph TD
    COVERAGE["📊 テストカバレッジの種類"]

    COVERAGE --> LINE["ライン（行）カバレッジ<br>各行が実行されたか<br>目安：80%以上<br>最も基本的な指標"]

    COVERAGE --> BRANCH["ブランチ（分岐）カバレッジ<br>if/else の両方が実行されたか<br>目安：70%以上<br>条件分岐のカバー率"]

    COVERAGE --> FUNCTION["ファンクションカバレッジ<br>各関数が呼ばれたか<br>目安：90%以上<br>未使用コードの検出"]

    COVERAGE --> MUTATION["ミューテーションカバレッジ<br>コードを意図的に変更して<br>テストが検知するか確認<br>テストの品質を測る"]

    LINE --> NOTE_L["⚠️ 高ければ良いわけではない<br>80%でも品質は保証されない"]
    MUTATION --> NOTE_M["💎 最も信頼性が高い指標<br>ツール：mutmut / Pitest"]

    style LINE fill:#3498db,color:#fff
    style BRANCH fill:#27ae60,color:#fff
    style FUNCTION fill:#f39c12,color:#fff
    style MUTATION fill:#8e44ad,color:#fff
```

### 12.2 カバレッジの正しい使い方

```mermaid
flowchart TD
    subgraph "✅ カバレッジの正しい使い方"
        C1["テストの穴を発見するツールとして使う<br>カバレッジが低い箇所にテストを追加するヒント"]
        C2["チームのベースラインとして設定<br>例：ブランチカバレッジ 70% 以上を維持"]
        C3["段階的に引き上げる<br>レガシーコード：60% → 70% → 80%"]
        C4["コアビジネスロジックは100%を目指す<br>ドメイン層・ユースケース層は徹底的に"]
    end

    subgraph "❌ カバレッジの誤った使い方"
        W1["カバレッジ100%を絶対目標にする<br>→ テストのための無意味なテストが生まれる"]
        W2["カバレッジ率=品質と誤解する<br>→ アサーションのないテストでも上がる"]
        W3["インフラ層も同じ基準を適用する<br>→ 設定ファイル・スキーマは除外すべき"]
    end

    style C1 fill:#27ae60,color:#fff
    style C2 fill:#27ae60,color:#fff
    style C3 fill:#27ae60,color:#fff
    style C4 fill:#27ae60,color:#fff
    style W1 fill:#e74c3c,color:#fff
    style W2 fill:#e74c3c,color:#fff
    style W3 fill:#e74c3c,color:#fff
```

### 12.3 pytest-cov でのカバレッジ計測

```python
# pyproject.toml または setup.cfg での設定

"""
[tool.pytest.ini_options]
addopts = "--cov=src --cov-report=html --cov-report=term-missing --cov-fail-under=80"
testpaths = ["tests"]

[tool.coverage.run]
source = ["src"]
omit = [
    "*/migrations/*",
    "*/tests/*",
    "*/__init__.py",
    "*/settings.py",
    "*/config.py",
]

[tool.coverage.report]
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "if TYPE_CHECKING:",
    "raise NotImplementedError",
    "@abstractmethod",
]

show_missing = true
"""

# 実行コマンド例
"""
# カバレッジレポートを生成
pytest --cov=src --cov-report=html --cov-report=term-missing

# カバレッジが80%未満の場合にCIを失敗させる
pytest --cov=src --cov-fail-under=80

# ブランチカバレッジも計測
pytest --cov=src --cov-branch --cov-report=html
"""
```

---

## 13. CI/CDパイプラインとTDD

### 13.1 TDDとCI/CDの統合

```mermaid
flowchart TD
    subgraph LOCAL["💻 ローカル開発（常時実行）"]
        L1["コードを変更"]
        L2["pytest でテスト実行<br>（変更に関連するテストのみ）"]
        L3["全テスト通過を確認"]
        L4["コミット"]
        L1 --> L2 --> L3 --> L4
    end

    subgraph CI["🔄 CI パイプライン（push時に自動実行）"]
        C1["コードチェックアウト"]
        C2["依存関係インストール"]
        C3["Linting（ruff / flake8）"]
        C4["型チェック（mypy）"]
        C5["ユニットテスト<br>（高速・並列実行）"]
        C6["統合テスト<br>（TestContainers）"]
        C7["カバレッジチェック<br>（80%以上）"]
        C8["セキュリティスキャン"]
        C1 --> C2 --> C3 --> C4 --> C5 --> C6 --> C7 --> C8
    end

    subgraph CD["🚀 CD パイプライン（main merge時）"]
        D1["Dockerイメージビルド"]
        D2["ステージング環境デプロイ"]
        D3["E2Eテスト実行"]
        D4["本番環境デプロイ"]
        D1 --> D2 --> D3 --> D4
    end

    LOCAL --> CI --> CD

    style LOCAL fill:#e8fde8
    style CI fill:#ebf5fb
    style CD fill:#fef9e7
```

### 13.2 GitHub Actions でのTDD自動化

```yaml
# .github/workflows/test.yml

name: TDD Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
  schedule:
    - cron: '0 0 * * 0' # 毎週日曜日に実行

jobs:
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.10", "3.11", "3.12"]

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
          cache: pip

      - name: Install dependencies
        run: pip install -r requirements-dev.txt

      - name: Run linting
        run: |
          ruff check .
          mypy src/

      - name: Run unit tests with coverage
        run: |
          pytest tests/unit/ \
            --cov=src \
            --cov-branch \
            --cov-report=xml \
            --cov-fail-under=80 \
            -v \
            --tb=short \
            -n auto      # 並列実行（pytest-xdist）

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          file: coverage.xml
          fail_ci_if_error: true

  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    needs: unit-tests

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_pass
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: pip

      - name: Install dependencies
        run: pip install -r requirements-dev.txt

      - name: Run integration tests
        env:
          DATABASE_URL: postgresql://test_user:test_pass@localhost/test_db
        run: |
          pytest tests/integration/ \
            -v \
            --tb=short \
            --timeout=60    # 統合テストのタイムアウト設定

  mutation-tests:
    name: Mutation Tests (週次)
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule'

    steps:
      - uses: actions/checkout@v4
      - name: Run mutation tests
        run: |
          mutmut run --paths-to-mutate src/domain/
          mutmut results
```

---

## 14. TDDを阻む壁とその解決策

### 14.1 よくある障壁と解決策

```mermaid
graph TD
    subgraph "❌ 障壁1: 最初は遅く感じる"
        WALL1["「テストを書く時間がもったいない」<br>「コードを直接書いた方が速い」"]
        SOL1["解決：短期的なコスト vs 長期的な利益<br>・バグ修正コストが激減する<br>・慣れると開発速度が逆転する<br>・最初の2週間が正念場"]
    end

    subgraph "❌ 障壁2: 何をテストすればいいかわからない"
        WALL2["テストケースの選定が難しい<br>どこから始めればいいかわからない"]
        SOL2["解決：シンプルなケースから始める<br>・まずハッピーパスを1つ書く<br>・次にエッジケースを追加<br>・最後に異常系を書く"]
    end

    subgraph "❌ 障壁3: 外部依存のテストが難しい"
        WALL3["DBやAPIがないとテストできない<br>インフラが必要な処理のテスト"]
        SOL3["解決：依存性注入でモック化<br>・InMemoryRepositoryを作る<br>・インターフェースに依存する設計<br>・TestContainersで統合テスト"]
    end

    subgraph "❌ 障壁4: レガシーコードにはテストが書けない"
        WALL4["既存の密結合コードには<br>テストが書きにくい"]
        SOL4["解決：Characterization Testから始める<br>・まず現在の動作を記録する<br>・少しずつリファクタリング<br>・Seam（縫い目）を見つける"]
    end

    style WALL1 fill:#e74c3c,color:#fff
    style WALL2 fill:#e74c3c,color:#fff
    style WALL3 fill:#e74c3c,color:#fff
    style WALL4 fill:#e74c3c,color:#fff
    style SOL1 fill:#27ae60,color:#fff
    style SOL2 fill:#27ae60,color:#fff
    style SOL3 fill:#27ae60,color:#fff
    style SOL4 fill:#27ae60,color:#fff
```

### 14.2 テストしにくいコードをテストしやすくする設計

```mermaid
flowchart LR
    subgraph HARD["❌ テストしにくい設計"]
        H1["グローバル変数・シングルトン<br>状態が共有されてテスト間干渉"]
        H2["直接インスタンス化<br>new DatabaseRepository() 内部で生成"]
        H3["時刻・乱数に直接依存<br>datetime.now() を直接呼び出す"]
        H4["巨大なメソッド<br>1メソッドが100行を超える"]
    end

    subgraph EASY["✅ テストしやすい設計"]
        E1["依存性注入（DI）<br>依存を外から注入する"]
        E2["インターフェースへの依存<br>具体クラスに依存しない"]
        E3["時刻・乱数を注入<br>clock=datetime.utcnow を引数で受け取る"]
        E4["小さなメソッドへの分割<br>単一責任原則に従う"]
    end

    H1 --> E1
    H2 --> E2
    H3 --> E3
    H4 --> E4

    style H1 fill:#e74c3c,color:#fff
    style H2 fill:#e74c3c,color:#fff
    style H3 fill:#e74c3c,color:#fff
    style H4 fill:#e74c3c,color:#fff
    style E1 fill:#27ae60,color:#fff
    style E2 fill:#27ae60,color:#fff
    style E3 fill:#27ae60,color:#fff
    style E4 fill:#27ae60,color:#fff
```

---

## 15. レガシーコードへのTDD導入

### 15.1 レガシーコードへのアプローチ

```mermaid
flowchart TD
    LEGACY["🏚️ レガシーコード<br>（テストがない既存コード）"]

    STEP_L1["Step 1: Characterization Test<br>現在の動作をそのまま記録する<br>正しいかどうかは問わない<br>→ まず安全網を作る"]

    STEP_L2["Step 2: Seam（縫い目）の発見<br>テスト可能な分離点を見つける<br>・コンストラクタインジェクション<br>・メソッドパラメータ化<br>・ファクトリメソッドの抽出"]

    STEP_L3["Step 3: 最小限のリファクタリング<br>動作を変えずに構造を改善<br>・長いメソッドの分割<br>・依存性の外部化<br>→ テストが保護している範囲で"]

    STEP_L4["Step 4: 新しい機能はTDDで追加<br>修正部分は必ずTDDで書く<br>既存コードも徐々にTDD化<br>→ Boy Scout Rule（来た時より綺麗に）"]

    LEGACY --> STEP_L1 --> STEP_L2 --> STEP_L3 --> STEP_L4

    style LEGACY fill:#e74c3c,color:#fff
    style STEP_L1 fill:#f39c12,color:#fff
    style STEP_L2 fill:#e67e22,color:#fff
    style STEP_L3 fill:#3498db,color:#fff
    style STEP_L4 fill:#27ae60,color:#fff
```

### 15.2 Characterization Test の例

```python
# ─── レガシーコード（テストなし）───

class LegacyOrderCalculator:
    """
    テストがない複雑なレガシーコード
    何をしているか把握しにくい
    """
    def calculate_final_price(self, base_price, quantity, customer_type, is_sale):
        # 複雑な計算ロジック（何をしているか不明）
        price = base_price * quantity
        if customer_type == "premium":
            price = price * 0.9
        elif customer_type == "vip":
            price = price * 0.8
        if is_sale:
            price = price * 0.95
        if price > 10000:
            price = price - 500  # よくわからない割引
        return round(price)


# ─── Step 1: Characterization Test（動作を記録する）───

class TestLegacyOrderCalculatorCharacterization:
    """
    既存の動作を変えずに記録するテスト
    まず現在の出力を確認してテストにする
    正しいかどうかは後で判断する
    """

    @pytest.fixture
    def calc(self):
        return LegacyOrderCalculator()

    def test_通常顧客セールなし(self, calc):
        # まず実際に実行して結果を確認 → その値をExpectedにする
        result = calc.calculate_final_price(
            base_price=1000, quantity=2,
            customer_type="normal", is_sale=False
        )
        assert result == 2000  # 実際に実行して確認した値

    def test_プレミアム顧客セールなし(self, calc):
        result = calc.calculate_final_price(
            base_price=1000, quantity=2,
            customer_type="premium", is_sale=False
        )
        assert result == 1800  # 10%OFF

    def test_VIP顧客セールあり10000円超(self, calc):
        result = calc.calculate_final_price(
            base_price=1000, quantity=15,
            customer_type="vip", is_sale=True
        )
        # 実際に実行: 1000*15*0.8*0.95 = 11400 → 11400-500 = 10900
        assert result == 10900

    # これで動作が記録できた → 安全にリファクタリングできる
```

---

## 16. TDDのベストプラクティス総まとめ

### 16.1 TDDの実践ベストプラクティス一覧

| カテゴリ | ベストプラクティス | 理由 |
|---------|----------------|------|
| **テストの書き方** | まず失敗を確認してからGREENにする | 誤って通過するテストを防ぐ |
| **テストの書き方** | 1テスト1アサーション（関連は複数可） | 失敗時に原因が特定しやすい |
| **テストの書き方** | テスト名は仕様書として読める日本語に | コードの意図を伝えるドキュメント |
| **設計** | 依存性注入でモック可能に | テストから良い設計が生まれる |
| **設計** | 時刻・乱数を外部注入する | テストの再現性を確保する |
| **サイクル** | サイクルを小さく保つ（5〜15分） | こまめにコミット・フィードバック |
| **リファクタリング** | GREEN後に必ずリファクタリングする | 技術的負債を蓄積させない |
| **カバレッジ** | ドメイン層は90%以上を目指す | ビジネスロジックを徹底的に保護 |
| **CI** | pushのたびに全テスト実行 | 常に動くコードを維持する |

### 16.2 TDD習熟度モデル

```mermaid
graph TD
    LV0["Level 0: テストなし<br>コードを書いてから手動テスト<br>リグレッションに気づかない"]
    LV1["Level 1: テスト後付け<br>実装後にテストを書く<br>動いているコードをカバーするだけ"]
    LV2["Level 2: Red-Green を意識<br>失敗するテストを先に書く<br>まだリファクタリングが足りない"]
    LV3["Level 3: フルRGRサイクル<br>Red-Green-Refactorを徹底<br>テストが設計を駆動する"]
    LV4["Level 4: Inside-Out TDD<br>ドメインモデルからアウトサイドへ<br>設計が自然に疎結合になる"]
    LV5["Level 5: TDD as Design Tool<br>テストが最高のドキュメント<br>チーム全体でTDDが文化になる"]

    LV0 --> LV1 --> LV2 --> LV3 --> LV4 --> LV5

    style LV0 fill:#e74c3c,color:#fff
    style LV1 fill:#e67e22,color:#fff
    style LV2 fill:#f39c12,color:#fff
    style LV3 fill:#27ae60,color:#fff
    style LV4 fill:#3498db,color:#fff
    style LV5 fill:#8e44ad,color:#fff
```

### 16.3 TDD導入ロードマップ

```mermaid
gantt
    title TDD導入・習熟ロードマップ
    dateFormat  YYYY-MM-DD
    section 基礎習得
        TDDの概念理解・書籍学習      :t1, 2025-01-01, 7d
        pytest の基本習得            :t2, after t1, 7d
        AAAパターンの実践            :t3, after t2, 7d
    section 実践開始
        新規コードをTDDで書く練習    :t4, after t3, 14d
        モック・スタブの活用         :t5, after t4, 14d
        カバレッジ計測の導入         :t6, after t5, 7d
    section チーム展開
        CI/CDへのテスト統合          :t7, after t6, 14d
        コードレビューでTDD文化醸成  :t8, after t7, 21d
        レガシーコードへの適用       :t9, after t8, 30d
    section 高度化
        BDDとの連携                  :t10, after t9, 14d
        ミューテーションテスト導入   :t11, after t10, 14d
        全チームへのTDD文化定着      :t12, after t11, 30d
```

---

## 17. TDDのアンチパターン

### 17.1 よくある失敗パターン

```mermaid
graph TD
    subgraph "❌ Anti-Pattern 1: テストを後から書く（Test After）"
        A1["実装してからテストを追加する<br>→ テストが設計を改善しない<br>→ 高カバレッジでも品質が低い"]
        A1_FIX["解決：必ず先にテストを書く<br>実装前にAPIを設計する習慣をつける"]
    end

    subgraph "❌ Anti-Pattern 2: テストが壊れやすい（Fragile Tests）"
        A2["実装の詳細に依存しすぎたテスト<br>内部メソッド・プライベート変数を直接テスト<br>→ 実装変更のたびにテストが壊れる"]
        A2_FIX["解決：振る舞い（ブラックボックス）をテストする<br>インターフェースと出力だけをアサートする"]
    end

    subgraph "❌ Anti-Pattern 3: アサーションなしのテスト（Assertion-Free Tests）"
        A3["assertが1つもないテスト<br>例外が起きなければOKとするテスト<br>→ カバレッジが上がるが何も保証しない"]
        A3_FIX["解決：必ず期待値を明示的にアサートする<br>assert文なしのテストはテストではない"]
    end

    subgraph "❌ Anti-Pattern 4: テストが遅すぎる（Slow Tests）"
        A4["実際のDBや外部APIを使うユニットテスト<br>1テストに数秒〜数十秒かかる<br>→ 開発中に実行しなくなる"]
        A4_FIX["解決：ユニットテストは必ずモック/InMemoryを使う<br>実DBは統合テストで別途実行する"]
    end

    subgraph "❌ Anti-Pattern 5: テスト間の依存（Interdependent Tests）"
        A5["テストの実行順序に依存している<br>あるテストが別のテストの副作用に依存<br>→ 単独で実行すると失敗する"]
        A5_FIX["解決：各テストで独立したフィクスチャを使う<br>前後処理でクリーンな状態に戻す"]
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

### 17.2 TDD健全性チェックフロー

```mermaid
flowchart TD
    CHECK["TDDの健全性チェック"]

    Q1{"テストはプロダクションコードより<br>先に書かれているか？"}
    Q2{"各テストが独立して<br>単独で実行できるか？"}
    Q3{"ユニットテストが<br>ミリ秒で完了するか？"}
    Q4{"テスト名がコードの<br>仕様書として読めるか？"}
    Q5{"全テストがCIで<br>自動実行されているか？"}
    Q6{"ドメイン層の<br>カバレッジが80%以上か？"}

    FIX1["📝 Test-First の習慣を徹底する<br>実装前にテストを書くルールを設ける"]
    FIX2["🔒 独立したフィクスチャを使う<br>グローバル状態を排除する"]
    FIX3["🎭 モック/InMemoryを活用する<br>外部依存を排除する"]
    FIX4["✏️ テスト名を改善する<br>何をテストするか日本語で書く"]
    FIX5["⚙️ GitHub ActionsでCI設定する<br>push時に自動実行する"]
    FIX6["📊 未カバーのビジネスロジックを特定<br>テストを追加する"]
    HEALTHY["✅ 健全なTDDプロジェクト"]

    CHECK --> Q1
    Q1 -->|"No"| FIX1
    Q1 -->|"Yes"| Q2
    Q2 -->|"No"| FIX2
    Q2 -->|"Yes"| Q3
    Q3 -->|"No（遅い）"| FIX3
    Q3 -->|"Yes"| Q4
    Q4 -->|"No"| FIX4
    Q4 -->|"Yes"| Q5
    Q5 -->|"No"| FIX5
    Q5 -->|"Yes"| Q6
    Q6 -->|"No"| FIX6
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

## 18. 参考文献・ソース一覧

### 📚 必読書籍

| タイトル | 著者 | 難易度 | 内容 |
|---------|------|--------|------|
| **Test-Driven Development: By Example** | Kent Beck | ★★★☆☆ | TDD原典・Kent Beckによる決定版 |
| **Clean Code** | Robert C. Martin | ★★★☆☆ | テストしやすいコードの書き方 |
| **The Art of Unit Testing（第3版）** | Roy Osherove | ★★★☆☆ | ユニットテストの実践ガイド |
| **Working Effectively with Legacy Code** | Michael C. Feathers | ★★★★☆ | レガシーコードへのTDD導入 |
| **Growing Object-Oriented Software, Guided by Tests** | Freeman & Pryce | ★★★★☆ | Outside-in TDDの実践 |
| **xUnit Test Patterns** | Gerard Meszaros | ★★★★★ | テストパターンの百科事典 |

### 🌐 公式ドキュメント・URL

#### TDDコア概念

| リソース | URL |
|---------|-----|
| **TDD（Kent Beck / Agile Alliance）** | https://www.agilealliance.org/glossary/tdd/ |
| **Martin Fowler - TestDrivenDevelopment** | https://martinfowler.com/bliki/TestDrivenDevelopment.html |
| **Robert C. Martin - TDDの3つのルール** | https://blog.cleancoder.com/uncle-bob/2014/12/17/TheThreeRulesOfTdd.html |
| **Martin Fowler - テストピラミッド** | https://martinfowler.com/bliki/TestPyramid.html |
| **Martin Fowler - Unit Test** | https://martinfowler.com/bliki/UnitTest.html |
| **Martin Fowler - Mocks Aren't Stubs** | https://martinfowler.com/articles/mocksArentStubs.html |

#### BDD / ATDD 関連

| リソース | URL |
|---------|-----|
| **Behavior-Driven Development（Agile Alliance）** | https://www.agilealliance.org/glossary/bdd/ |
| **Cucumber（BDD公式）** | https://cucumber.io/docs/bdd/ |
| **Given-When-Then（Martin Fowler）** | https://martinfowler.com/bliki/GivenWhenThen.html |

#### Pythonテストツール

| リソース | URL |
|---------|-----|
| **pytest 公式ドキュメント** | https://docs.pytest.org/ |
| **pytest-cov（カバレッジ）** | https://pytest-cov.readthedocs.io/ |
| **pytest-mock（モック）** | https://pytest-mock.readthedocs.io/ |
| **pytest-bdd（BDD統合）** | https://pytest-bdd.readthedocs.io/ |
| **factory_boy（テストデータ生成）** | https://factoryboy.readthedocs.io/ |
| **Hypothesis（プロパティベーステスト）** | https://hypothesis.readthedocs.io/ |
| **mutmut（ミューテーションテスト）** | https://mutmut.readthedocs.io/ |

#### テスト設計・パターン

| リソース | URL |
|---------|-----|
| **F.I.R.S.T. 原則** | https://agileinaflash.blogspot.com/2009/02/first.html |
| **xUnit Test Patterns（Webサイト版）** | https://web.archive.org/web/20231122170327/http://xunitpatterns.com/ |
| **Test Doubles（Martin Fowler）** | https://martinfowler.com/bliki/TestDouble.html |
| **Characterization Test（Michael Feathers）** | https://michaelfeathers.silvrback.com/characterization-testing |

#### CI/CDとTDD

| リソース | URL |
|---------|-----|
| **Continuous Integration（Martin Fowler）** | https://martinfowler.com/articles/continuousIntegration.html |
| **GitHub Actions 公式** | https://docs.github.com/en/actions |
| **Codecov（カバレッジレポート）** | https://codecov.io/ |

#### 動画・コース

| リソース | URL |
|---------|-----|
| **Kent Beck - TDD解説動画（YouTube）** | https://www.youtube.com/watch?v=H4XuJXTJHGU |
| **Udemy - TDD実践コース** | https://www.udemy.com/topic/test-driven-development/ |
| **Coursera - Software Testing and Automation** | https://www.coursera.org/specializations/software-testing-automation |

---

> 📅 最終更新日: 2026-04-17（本ドキュメントは当時の情報に基づいて作成されています）。各ツールのバージョンや仕様は変更される場合があります。実践前に必ず公式ドキュメントをご確認ください。

## 著者情報

- **著者名**: Software Architect Guide
- **所属**: ソフトウェアアーキテクト設計プロジェクト
- **バージョン**: 1.0
- **対象ドキュメント**: TDD Complete Guide
- **連絡先**: architect-guide@example.com
