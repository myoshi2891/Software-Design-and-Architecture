# 🏗️ IT業界の主流設計手法・駆動開発 完全ガイド

## 📚 目次

1. [はじめに：なぜ「設計手法」が重要なのか](#1-はじめに)
2. [TDD（テスト駆動開発）](#2-tddテスト駆動開発)
3. [BDD（振る舞い駆動開発）](#3-bdd振る舞い駆動開発)
4. [DDD（ドメイン駆動設計）](#4-dddドメイン駆動設計)
5. [FDD（フィーチャー駆動開発）](#5-fddフィーチャー駆動開発)
6. [ATDD（受け入れテスト駆動開発）](#6-atdd受け入れテスト駆動開発)
7. [EDA（イベント駆動アーキテクチャ）](#7-edaイベント駆動アーキテクチャ)
8. [API-First設計](#8-api-first設計)
9. [クリーンアーキテクチャ](#9-クリーンアーキテクチャ)
10. [マイクロサービスアーキテクチャ](#10-マイクロサービスアーキテクチャ)
11. [各手法の比較・使い分けガイド](#11-各手法の比較使い分けガイド)
12. [国際資格・認定試験ガイド](#12-国際資格認定試験ガイド)
13. [学習ロードマップ](#13-学習ロードマップ)
14. [参考文献・ソース一覧](#14-参考文献ソース一覧)

---

## 1. はじめに

### なぜ「設計手法」が重要なのか？

ソフトウェア開発において「設計手法」とは、**コードをどのように書くか・システムをどのように構築するかの哲学と実践方法**です。

```text
【設計手法なし】        【設計手法あり】
  コードを書く    →      考える → 設計 → 実装 → 検証
  バグが出る             品質が担保され、変更に強い
  修正が困難             保守性・拡張性が高い
  技術的負債が積む       チームの共通言語が生まれる
```

### 設計手法の全体マップ

```text
┌─────────────────────────────────────────────────────────────────┐
│                     ソフトウェア設計手法の世界                      │
├──────────────────┬──────────────────┬──────────────────────────┤
│   テスト駆動系    │   ドメイン/機能系  │     アーキテクチャ系       │
├──────────────────┼──────────────────┼──────────────────────────┤
│ TDD              │ DDD              │ Clean Architecture       │
│ BDD              │ FDD              │ Microservices            │
│ ATDD             │ EDA              │ Serverless               │
│                  │ API-First        │ CQRS / Event Sourcing    │
└──────────────────┴──────────────────┴──────────────────────────┘
```

---

## 2. TDD（テスト駆動開発）

### 2.1 TDDとは？

**Test-Driven Development（テスト駆動開発）** は、「テストを先に書いてから実装する」という開発手法です。

> 💡 **1行で言うと：** 「まず失敗するテストを書き、次にそのテストを通す最小限のコードを書き、最後にコードを整理する」

### 2.2 TDDの3ステップ（Red-Green-Refactor サイクル）

```text
        ┌─────────────────────────────────────┐
        │                                     │
  ┌─────▼─────┐    ┌───────────┐    ┌────────▼──────┐
  │   RED     │    │   GREEN   │    │   REFACTOR    │
  │           │    │           │    │               │
  │ 失敗する  │───▶│ テストを  │───▶│  コードを     │
  │ テストを  │    │ 通す最小  │    │  綺麗にする   │
  │ 書く      │    │ コードを  │    │  (品質向上)   │
  │           │    │ 書く      │    │               │
  └───────────┘    └───────────┘    └───────────────┘
        ▲                                     │
        └─────────────────────────────────────┘
                    繰り返す
```

### 2.3 ステップバイステップ解説

#### Step 1：RED（失敗するテストを書く）

```python
# 例：足し算関数のTDD

# まず存在しない関数のテストを書く（この時点ではエラーになる）
import pytest

def test_add_two_numbers():
    result = add(2, 3)       # add関数はまだ存在しない！
    assert result == 5       # これが失敗する = RED状態

def test_add_negative_numbers():
    result = add(-1, -2)
    assert result == -3
```

#### Step 2：GREEN（テストを通す最小限のコードを書く）

```python
# テストを通すための最小実装
def add(a, b):
    return a + b             # これだけでテストが通る = GREEN状態
```

#### Step 3：REFACTOR（コードを整理する）

```python
# より良いコードに整理（テストは変えない）
def add(a: int | float, b: int | float) -> int | float:
    """二つの数値を加算して返す"""
    return a + b
```

### 2.4 TDDのベストプラクティス

| 原則 | 説明 | 悪い例 | 良い例 |
|------|------|--------|--------|
| **テストは1つの振る舞いのみ検証** | 1テスト＝1概念 | 複数の機能を1テストで検証 | `test_user_can_login()` のみ |
| **テスト名は仕様書として読める** | 何をテストするか明確に | `test_001()` | `test_login_fails_with_wrong_password()` |
| **AAAパターンを守る** | Arrange/Act/Assert | 混在したコード | 明確な3セクション分離 |
| **テストは独立して動く** | 順序依存なし | 他テストに依存 | 各テストが独立して実行可能 |
| **テストコードも本番コードと同品質に** | 技術的負債を避ける | テストコードの手抜き | リファクタリング対象に含める |

#### AAAパターン（推奨構造）

```python
def test_user_registration():
    # ─── Arrange（準備）───
    user_data = {"email": "test@example.com", "password": "SecurePass123"}
    user_service = UserService()

    # ─── Act（実行）───
    result = user_service.register(user_data)

    # ─── Assert（検証）───
    assert result.success == True
    assert result.user.email == "test@example.com"
```

### 2.5 TDDを導入するメリット・デメリット

| メリット | デメリット |
|---------|-----------|
| バグの早期発見 | 初期の開発速度が落ちる感覚がある |
| 設計品質が自然に上がる | テストの書き方を学ぶコストがある |
| リファクタリングが安心してできる | 外部依存（DB・API）のテストが難しい |
| 仕様書としてテストが機能する | チーム全員の習慣化が必要 |

---

## 3. BDD（振る舞い駆動開発）

### 3.1 BDDとは？

**Behavior-Driven Development（振る舞い駆動開発）** は、TDDを発展させた手法で、**ビジネス視点での「振る舞い」を日本語（自然言語）に近い形で記述**します。

> 💡 **TDDとの違い：** TDDは「コードのテスト」、BDDは「ビジネス要件をテスト可能な仕様として記述」

### 3.2 Gherkin記法（BDDの記述言語）

```gherkin
# ファイル名: login.feature

Feature: ユーザーログイン機能
  ユーザーとして
  システムにログインしたい
  なぜなら自分のデータにアクセスしたいから

  Scenario: 正しい認証情報でのログイン
    Given ユーザーが登録されている
    And メールアドレスは "user@example.com" である
    When ユーザーが正しいパスワードでログインする
    Then ダッシュボードにリダイレクトされる
    And "ようこそ" というメッセージが表示される

  Scenario: 間違ったパスワードでのログイン
    Given ユーザーが登録されている
    When ユーザーが間違ったパスワードでログインする
    Then エラーメッセージ "パスワードが正しくありません" が表示される
    And ログインページに留まる
```

### 3.3 BDDのステップ定義（Python/Pytest-BDD例）

```python
# steps/login_steps.py
from pytest_bdd import given, when, then, scenario
from myapp.models import User
from myapp.services import AuthService

@given("ユーザーが登録されている")
def registered_user(db):
    return User.create(email="user@example.com", password="correct_password")

@when("ユーザーが正しいパスワードでログインする")
def login_with_correct_password(browser, registered_user):
    browser.fill("email", "user@example.com")
    browser.fill("password", "correct_password")
    browser.click("ログインボタン")

@then("ダッシュボードにリダイレクトされる")
def redirected_to_dashboard(browser):
    assert browser.current_url == "/dashboard"
```

### 3.4 BDDのベストプラクティス

```text
✅ DO（やるべきこと）
  - シナリオは非技術者でも読めるように書く
  - Given/When/Then の責務を明確に分ける
  - 具体的な値（"user@example.com"）を使う
  - 1シナリオ＝1ビジネスルール

❌ DON'T（避けるべきこと）
  - 技術的な詳細をFeatureファイルに書く
  - UIの操作手順を詳細に書きすぎる
  - 1シナリオに複数のGivenを詰め込みすぎる
```

---

## 4. DDD（ドメイン駆動設計）

### 4.1 DDDとは？

**Domain-Driven Design（ドメイン駆動設計）** は、Eric Evansが2003年に提唱した設計哲学です。「ビジネスの問題領域（ドメイン）を中心に置き、そのモデルをコードに反映させる」アプローチです。

> 💡 **核心思想：** ビジネスの専門家とエンジニアが「同じ言葉」を使って会話し、その言葉をそのままコードにする

### 4.2 DDDの全体構造

```text
┌─────────────────────────────────────────────────────────────────┐
│                        DDD の全体像                              │
├─────────────────────────────┬───────────────────────────────────┤
│      戦略的設計              │         戦術的設計                 │
│  (Strategic Design)         │      (Tactical Design)            │
├─────────────────────────────┼───────────────────────────────────┤
│ • Bounded Context           │ • Entity（エンティティ）            │
│   (境界づけられたコンテキスト) │ • Value Object（値オブジェクト）   │
│ • Ubiquitous Language       │ • Aggregate（集約）                │
│   (ユビキタス言語)           │ • Domain Service（ドメインサービス）│
│ • Context Map               │ • Repository（リポジトリ）         │
│   (コンテキストマップ)       │ • Domain Event（ドメインイベント）  │
│ • Subdomain                 │ • Factory（ファクトリ）            │
└─────────────────────────────┴───────────────────────────────────┘
```

### 4.3 戦略的設計：ユビキタス言語とBounded Context

#### ユビキタス言語の例

```text
【ECサイトの例】

❌ チームによって言葉がバラバラ
  - 営業チーム：「顧客」「発注」「商品」
  - 開発チーム：「User」「Order」「Item」
  - 物流チーム：「荷受け人」「出荷指示」「荷物」

✅ ユビキタス言語で統一
  - 全チーム共通：「顧客(Customer)」「注文(Order)」「商品(Product)」
  - コードにもそのまま反映される
```

#### Bounded Context（境界づけられたコンテキスト）

```text
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   注文コンテキスト  │     │  在庫コンテキスト  │     │  配送コンテキスト  │
│                  │     │                  │     │                  │
│ - Order          │────▶│ - Inventory      │────▶│ - Shipment       │
│ - OrderItem      │     │ - StockLevel     │     │ - DeliveryRoute  │
│ - OrderStatus    │     │ - Warehouse      │     │ - Carrier        │
└──────────────────┘     └──────────────────┘     └──────────────────┘
  「商品」= 注文した内容     「商品」= 在庫管理する物     「商品」= 配送する荷物

※ 同じ「商品」でもコンテキストによって意味が異なる！
```

### 4.4 戦術的設計：コードレベルの実装

#### Entity（エンティティ）

```python
# エンティティ：一意のIDを持ち、同一性が重要なオブジェクト
class Order:
    def __init__(self, order_id: OrderId, customer_id: CustomerId):
        self._id = order_id          # IDで同一性を判断
        self._customer_id = customer_id
        self._items: list[OrderItem] = []
        self._status = OrderStatus.PENDING

    def add_item(self, product: Product, quantity: int) -> None:
        """ドメインロジックはエンティティ内に閉じ込める"""
        if self._status != OrderStatus.PENDING:
            raise DomainException("確定済み注文には商品を追加できません")
        self._items.append(OrderItem(product, quantity))

    def confirm(self) -> None:
        if not self._items:
            raise DomainException("商品が1つも選択されていません")
        self._status = OrderStatus.CONFIRMED
```

#### Value Object（値オブジェクト）

```python
# 値オブジェクト：IDを持たず、値で同一性を判断するオブジェクト
from dataclasses import dataclass

@dataclass(frozen=True)  # イミュータブル（変更不可）
class Money:
    amount: int
    currency: str

    def __post_init__(self):
        if self.amount < 0:
            raise ValueError("金額は0以上でなければなりません")

    def add(self, other: "Money") -> "Money":
        if self.currency != other.currency:
            raise ValueError("通貨単位が一致しません")
        return Money(self.amount + other.amount, self.currency)

# 使い方
price1 = Money(1000, "JPY")
price2 = Money(500, "JPY")
total = price1.add(price2)  # Money(1500, "JPY")
```

#### Aggregate（集約）

```python
# 集約：整合性境界を持つオブジェクト群のまとまり
class Order:  # 集約ルート（Aggregate Root）
    """
    集約のルールを守る:
    1. 外部からはルートを通じてのみアクセス
    2. 集約内の整合性は集約ルートが保証
    """
    def __init__(self, order_id: OrderId):
        self._id = order_id
        self._items: list[OrderItem] = []  # OrderItemは集約内部のみ
        self._events: list[DomainEvent] = []

    def add_item(self, product_id: ProductId, quantity: int) -> None:
        # 整合性チェックはここで行う
        existing = self._find_item(product_id)
        if existing:
            existing.increase_quantity(quantity)
        else:
            self._items.append(OrderItem(product_id, quantity))

        # ドメインイベントを記録
        self._events.append(ItemAddedToOrderEvent(self._id, product_id))
```

### 4.5 DDDのベストプラクティス

| カテゴリ | ベストプラクティス |
|---------|-----------------|
| **モデリング** | ドメインエキスパートと定期的なEvent Stormingセッションを行う |
| **言語** | コードの変数名・クラス名をユビキタス言語と一致させる |
| **集約設計** | 集約は小さく保つ（5〜10オブジェクト以下を目安） |
| **境界** | Bounded Contextを1つのマイクロサービスに対応させる |
| **テスト** | ドメインロジックのユニットテストを徹底する |

---

## 5. FDD（フィーチャー駆動開発）

### 5.1 FDDとは？

**Feature-Driven Development（フィーチャー駆動開発）** は、ユーザーに価値を提供する「機能（フィーチャー）」単位で開発を進める手法です。

### 5.2 FDDの5つのプロセス

```text
Process 1    Process 2    Process 3    Process 4    Process 5
全体モデル  → フィーチャ → フィーチャ → フィーチャ → フィーチャ
の開発      リストの     計画策定    設計         構築
            構築
(一度だけ)  (一度だけ)   (フィーチャごとに繰り返す)
```

### 5.3 フィーチャーの記述形式

`` `<動作> <結果> <オブジェクト>` `` の形式で書く

例：
  ✅ "顧客の注文履歴を表示する"
  ✅ "商品の在庫数を更新する"
  ✅ "メールアドレスでユーザーを検索する"
  ❌ "データベースから取得する"（技術的すぎる）
  ❌ "ユーザー管理"（動作と結果が不明確）

### 5.4 FDDのベストプラクティス

- フィーチャー1つは2週間以内で完成できる粒度に分解する
- 各フィーチャーに「クラスオーナー」を割り当てる
- 進捗は完了したフィーチャー数でトラッキングする

---

## 6. ATDD（受け入れテスト駆動開発）

### 6.1 ATDDとは？

**Acceptance Test-Driven Development（受け入れテスト駆動開発）** は、顧客・ビジネス側が定義する「受け入れ基準」をテストとして先に書き、それを満たすよう開発する手法です。

### 6.2 TDD・BDD・ATDDの関係

```text
┌─────────────────────────────────────────────────────────┐
│              テストピラミッド                              │
│                                                         │
│                    /‾‾‾‾‾\                              │
│                   / ATDD  \  ← 受け入れテスト（顧客視点）  │
│                  /─────────\                            │
│                 /    BDD    \ ← シナリオテスト（振る舞い）  │
│                /─────────────\                          │
│               /     TDD       \ ← ユニットテスト（コード）  │
│              /─────────────────\                        │
└─────────────────────────────────────────────────────────┘
  抽象度：高い ←────────────────────────── 低い
  実行速度：遅い ←───────────────────────── 速い
  数　　量：少ない ←─────────────────────── 多い
```

### 6.3 ATDD実践例

```text
ステップ1: ビジネス側が受け入れ基準を定義
─────────────────────────────────────
  「ユーザーが商品をカートに追加できる」機能の受け入れ基準:
  [ ] 商品詳細ページから「カートに追加」ボタンが押せる
  [ ] カートに追加後、カートアイコンのバッジ数が増える
  [ ] 同じ商品を2回追加すると数量が2になる
  [ ] 在庫なしの商品はカートに追加できない

ステップ2: 受け入れテストをコード化（Selenium/Playwright等）

ステップ3: 開発者がテストを通るよう実装

ステップ4: ビジネス側が動作を確認して承認
```

---

## 7. EDA（イベント駆動アーキテクチャ）

### 7.1 EDAとは？

**Event-Driven Architecture（イベント駆動アーキテクチャ）** は、システムのコンポーネント間の通信を「イベント」で行うアーキテクチャパターンです。

### 7.2 EDAの構成要素

```text
┌──────────────┐    イベント発行    ┌──────────────────────┐
│  Producer    │──────────────────▶│    Event Broker       │
│ (イベント生産者) │                │  (Apache Kafka/       │
│              │                  │   AWS EventBridge等)  │
│ 例：注文サービス│                  └──────────┬───────────┘
└──────────────┘                             │
                                             │ イベント配信
                    ┌────────────────────────┼────────────────────────┐
                    ▼                        ▼                        ▼
             ┌──────────┐          ┌──────────────┐         ┌────────────┐
             │在庫サービス│          │  配送サービス  │         │通知サービス │
             │(Consumer)│          │  (Consumer)  │         │(Consumer) │
             └──────────┘          └──────────────┘         └────────────┘
```

### 7.3 イベントの設計原則

```python
# ✅ 良いイベント設計
@dataclass
class OrderPlacedEvent:
    """注文が確定したことを表すイベント"""
    event_id: str           # 一意のイベントID
    occurred_at: datetime   # 発生日時
    order_id: str           # 何の注文か
    customer_id: str        # 誰の注文か
    total_amount: int       # 合計金額
    items: list[dict]       # 注文内容
    # ✅ イベントは過去形で命名（OrderPlaced = 注文が完了した）
    # ✅ イベントに必要な情報を自己完結的に含める

# ❌ 悪いイベント設計
@dataclass
class OrderEvent:           # 何のイベントか不明確
    order_id: str           # IDだけでは情報不足（受信側がDB参照が必要に）
```

### 7.4 EDAのベストプラクティス

| 原則 | 説明 |
|------|------|
| **イベントのべき等性** | 同じイベントを2回受信しても結果が変わらないようにする |
| **イベントスキーマの管理** | Schema Registry でバージョン管理する |
| **Dead Letter Queue** | 処理失敗したイベントを別キューに退避する |
| **イベントの追跡可能性** | Correlation IDで一連のイベントを追跡できるようにする |

---

## 8. API-First設計

### 8.1 API-Firstとは？

実装より先に**APIの設計仕様（契約）を定義**し、その契約を中心に開発を進める手法。フロントエンドとバックエンドが並行開発できる。

### 8.2 API-First開発フロー

```text
API設計 → レビュー → モック作成 → 並行開発 → 統合
（YAML）   (チーム)  (自動生成)   ↙        ↘
                              フロント   バック
                              エンド     エンド
```

### 8.3 OpenAPI（Swagger）仕様の例

```yaml
# openapi.yaml
openapi: 3.0.3
info:
  title: ECサイト注文API
  version: 1.0.0

paths:
  /orders:
    post:
      summary: 注文を作成する
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
      responses:
        '201':
          description: 注文作成成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
        '400':
          description: リクエスト不正
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

components:
  schemas:
    CreateOrderRequest:
      type: object
      required: [customer_id, items]
      properties:
        customer_id:
          type: string
          example: "cust_12345"
        items:
          type: array
          items:
            type: object
            properties:
              product_id:
                type: string
              quantity:
                type: integer
                minimum: 1
```

### 8.4 API設計のベストプラクティス

```text
✅ URLの設計ルール
  GET    /products          → 商品一覧取得
  GET    /products/{id}     → 特定商品取得
  POST   /products          → 商品新規作成
  PUT    /products/{id}     → 商品全体更新
  PATCH  /products/{id}     → 商品部分更新
  DELETE /products/{id}     → 商品削除

✅ HTTPステータスコードの正しい使い方
  200 OK           → 取得・更新成功
  201 Created      → 新規作成成功
  204 No Content   → 削除成功
  400 Bad Request  → リクエスト不正（バリデーションエラー等）
  401 Unauthorized → 認証エラー
  403 Forbidden    → 権限エラー
  404 Not Found    → リソースが存在しない
  422 Unprocessable Entity → ビジネスルール違反
  500 Internal Server Error → サーバー内部エラー
```

---

## 9. クリーンアーキテクチャ

### 9.1 クリーンアーキテクチャとは？

Robert C. Martin（Uncle Bob）が提唱するアーキテクチャ原則。**ビジネスロジックを技術詳細（DB・フレームワーク・UI）から分離することで、保守性・テスト容易性を高める。**

### 9.2 クリーンアーキテクチャの円

```text
        ┌─────────────────────────────────────────────┐
        │            外側の層（Frameworks & Drivers）    │
        │   ┌─────────────────────────────────────┐   │
        │   │     Interface Adapters（インターフェース│   │
        │   │     ┌─────────────────────────┐     │   │
        │   │     │   Application Business   │     │   │
        │   │     │   Rules（Use Cases）     │     │   │
        │   │     │  ┌─────────────────┐    │     │   │
        │   │     │  │ Enterprise Biz  │    │     │   │
        │   │     │  │ Rules (Entities)│    │     │   │
        │   │     │  └─────────────────┘    │     │   │
        │   │     └─────────────────────────┘     │   │
        │   └─────────────────────────────────────┘   │
        └─────────────────────────────────────────────┘

  依存の方向：外 → 内（内側は外側に依存しない！）
  変更の影響：内側の変更は外側に影響しない
```

### 9.3 レイヤーの役割

| レイヤー | 役割 | 例 |
|---------|------|----|
| Entities | ビジネスルールの核心 | Order, User, Product |
| | 最も変化しない部分 | |
| Use Cases | アプリケーション固有の | PlaceOrderUseCase |
| | ビジネスロジック | RegisterUserUseCase |
| Interface Adapters | データ形式の変換 | Controller, Presenter |
| | | Repository Interface |
| Frameworks & Drivers | 技術的詳細 | Django, FastAPI |
| | DBドライバー | PostgreSQL, Redis |

### 9.4 実装例（Pythonでのクリーンアーキテクチャ）

```python
# ──── Entities層（最も内側）────
class Order:
    """純粋なビジネスエンティティ（フレームワーク依存なし）"""
    def __init__(self, order_id: str, customer_id: str):
        self.order_id = order_id
        self.customer_id = customer_id
        self.items = []

    def add_item(self, item: OrderItem) -> None:
        self.items.append(item)


# ──── Use Cases層 ────
class PlaceOrderUseCase:
    def __init__(
        self,
        order_repository: OrderRepositoryInterface,  # インターフェースに依存
        payment_gateway: PaymentGatewayInterface,    # 実装詳細に依存しない
    ):
        self.order_repository = order_repository
        self.payment_gateway = payment_gateway

    def execute(self, command: PlaceOrderCommand) -> PlaceOrderResult:
        order = Order(order_id=generate_id(), customer_id=command.customer_id)
        for item in command.items:
            order.add_item(item)

        self.payment_gateway.charge(order)        # インターフェース経由
        self.order_repository.save(order)         # インターフェース経由

        return PlaceOrderResult(order_id=order.order_id)


# ──── Interface Adapters層 ────
class OrderController:
    def __init__(self, use_case: PlaceOrderUseCase):
        self.use_case = use_case

    def post(self, request_data: dict) -> dict:
        command = PlaceOrderCommand.from_dict(request_data)
        result = self.use_case.execute(command)
        return {"order_id": result.order_id, "status": "created"}


# ──── Frameworks層（最も外側）────
# SQLAlchemyを使った具体的なRepository実装
class SQLAlchemyOrderRepository(OrderRepositoryInterface):
    def save(self, order: Order) -> None:
        db_record = OrderModel.from_entity(order)
        self.session.add(db_record)
        self.session.commit()
```

---

## 10. マイクロサービスアーキテクチャ

### 10.1 マイクロサービスとは？

アプリケーションを**小さく独立したサービス群に分割**し、それぞれが独立してデプロイ・スケール可能なアーキテクチャ。

### 10.2 モノリスvsマイクロサービス

```text
【モノリス】                    【マイクロサービス】
┌─────────────────────┐        ┌──────┐  ┌──────┐  ┌──────┐
│                     │        │ 注文  │  │ 在庫  │  │ 決済  │
│  注文・在庫・決済・  │        │ SVC  │  │ SVC  │  │ SVC  │
│  通知・ユーザー全て  │  →→→  └──────┘  └──────┘  └──────┘
│  が1つのアプリ      │           ↕           ↕          ↕
│                     │        ┌──────┐  ┌──────┐
└─────────────────────┘        │ 通知  │  │ User │
                                │ SVC  │  │ SVC  │
                                └──────┘  └──────┘

メリット: シンプル              メリット: 独立デプロイ・スケール
デメリット: スケール困難         デメリット: 複雑性・運用コスト増
         変更の影響が全体に及ぶ
```

### 10.3 マイクロサービスの設計原則

| 原則 | 内容 |
|------|------|
| **単一責任** | 1サービス＝1ビジネス機能（DDDのBounded Contextと対応） |
| **独立したデータストア** | サービスごとに専用のDBを持つ（共有DB禁止） |
| **API経由の通信** | サービス間は必ずAPI（REST/gRPC）またはイベントで通信 |
| **障害隔離（Bulkhead）** | 1サービスの障害が他に波及しない設計 |
| **サーキットブレーカー** | 連鎖障害を防ぐ（Resilience4j/Hystrix） |

### 10.4 マイクロサービスのベストプラクティス

```text
# ✅ 推奨事項
- サービスはDDDのBounded Contextに1対1対応させる
- 各サービスは独立したCI/CDパイプラインを持つ
- ヘルスチェックエンドポイント（/health）を必ず実装
- 分散トレーシングを導入（Jaeger/Zipkin/AWS X-Ray）
- API Gateway を使って外部への窓口を一元管理
- サービスメッシュ（Istio/Linkerd）でサービス間通信を制御

# ❌ アンチパターン
- サービス間で直接DBを共有する（データ結合）
- チャッティング（頻繁な同期API呼び出し）→ イベント駆動に
- Distributed Monolith（見た目はマイクロサービスだが密結合）
- すべてのケースにマイクロサービスを適用する（小規模には不適）
```

---

## 11. 各手法の比較・使い分けガイド

### 11.1 プロジェクト特性別の推奨手法

| プロジェクト特性 | 推奨手法 | 理由 |
|---------------|---------|------|
| 複雑なビジネスロジック | DDD + TDD | ドメインの複雑さに対処 |
| 大規模チーム開発 | マイクロサービス + DDD | チーム独立性の確保 |
| 要件が不明確 | BDD + ATDD | ステークホルダーとの合意形成 |
| 高品質・高信頼性が必要 | TDD + ATDD | テスト網羅性の確保 |
| リアルタイム性・高スループット | EDA + マイクロサービス | 非同期処理による性能確保 |
| 中小規模・スタートアップ | クリーンアーキテクチャ + TDD | シンプルさと品質のバランス |

### 11.2 手法の組み合わせパターン

```text
【フルスタック推奨構成】

戦略: DDD（ドメインモデリング）
  └─ 戦術: クリーンアーキテクチャ（層の分離）
       └─ 品質: TDD + BDD（テスト駆動）
            └─ 通信: EDA（サービス間）+ API-First（外部向け）
                 └─ 展開: マイクロサービス（スケール要件時）
```

---

## 12. 国際資格・認定試験ガイド

### 12.1 アーキテクチャ関連の主要資格マップ

```text
┌─────────────────────────────────────────────────────────────────┐
│                    資格レベルマップ                                │
├─────────────┬────────────────────────────────────────────────────┤
│ エンタープライズ│ TOGAF 10 (Level 1/2) | Zachman | FEAF          │
├─────────────┼────────────────────────────────────────────────────┤
│ クラウド    │ AWS SAA/SAP | GCP PCA | Azure Solutions Architect  │
├─────────────┼────────────────────────────────────────────────────┤
│ 開発手法    │ PSM (Scrum) | PMI-ACP | SAFe Architect            │
├─────────────┼────────────────────────────────────────────────────┤
│ セキュリティ │ CISSP | CSSLP | SABSA                            │
└─────────────┴────────────────────────────────────────────────────┘
```

### 12.2 TOGAF（The Open Group Architecture Framework）

#### TOGAFとは？

The Open Groupが策定する、エンタープライズアーキテクチャのための世界標準フレームワーク。2023年時点で世界206カ国・10万人以上の認定者が存在する。

#### TOGAFの構成：ADM（Architecture Development Method）

```text
              ┌──────────────────────┐
              │   準備フェーズ（H）    │
              │  (Architecture Change │
              │      Management)     │
              └──────────┬───────────┘
                         │
              ┌──────────▼───────────┐
              │   フェーズA          │
              │  アーキテクチャビジョン│
              └──────────┬───────────┘
                         │
   ┌─────────────────────┼─────────────────────┐
   │                     │                     │
   ▼                     ▼                     ▼
フェーズB           フェーズC              フェーズD
ビジネス            情報システム           テクノロジー
アーキテクチャ       アーキテクチャ          アーキテクチャ
                   (データ+アプリ)
   │                     │                     │
   └─────────────────────┼─────────────────────┘
                         │
              ┌──────────▼───────────┐
              │   フェーズE/F        │
              │   機会とソリューション │
              │   移行計画           │
              └──────────┬───────────┘
                         │
              ┌──────────▼───────────┐
              │   フェーズG/H        │
              │   実装ガバナンス     │
              │   変更管理           │
              └──────────────────────┘
```

#### TOGAF試験の概要

| 項目 | Level 1 (Foundation) | Level 2 (Practitioner) |
|------|---------------------|----------------------|
| **対象** | TOGAFの理解 | TOGAFの適用能力 |
| **問題数** | 40問（多肢選択） | 8問（複合選択） |
| **合格点** | 55%（22/40問） | 60%（60/100点） |
| **試験時間** | 60分 | 90分 |
| **受験料** | 約$320 USD | Combined試験で約$495 USD |
| **難易度** | ★★★☆☆ | ★★★★☆ |
| **有効期限** | 無期限 | 無期限 |

#### TOGAF学習ロードマップ

```text
Week 1-2: TOGAFの基本概念
  → ADMの各フェーズの理解
  → アーキテクチャドメイン（BDAT）の理解

Week 3-4: 公式スタディガイドの精読
  → The Open Group公式ドキュメント
  → TOGAF Standard Version 10

Week 5-6: 模擬試験の反復
  → 公式練習問題（250問以上）
  → 間違えた問題の反復学習

Week 7: 試験直前対策
  → キーワードの確認
  → ADMフェーズの入出力の暗記
```

### 12.3 AWS認定ソリューションアーキテクト

#### SAA-C03（Associate）の概要

| 項目 | 内容 |
|------|------|
| **対象スキル** | AWSサービスを使ったアーキテクチャ設計 |
| **問題数** | 65問 |
| **合格スコア** | 720/1000 |
| **試験時間** | 130分 |
| **受験料** | $150 USD |
| **有効期限** | 3年 |
| **前提知識** | クラウドの基本 + AWS経験1年以上推奨 |

#### 主要な出題領域

```text
Domain 1: 安全なアーキテクチャの設計（30%）
  - IAMポリシー、KMS暗号化、VPC設計

Domain 2: 弾力性の高いアーキテクチャの設計（26%）
  - Auto Scaling, Multi-AZ, DR設計

Domain 3: 高性能アーキテクチャの設計（24%）
  - ElastiCache, CloudFront, RDSパフォーマンス

Domain 4: コスト最適化アーキテクチャ設計（20%）
  - Reserved Instance, Spot Instance, S3 Tiering
```

#### SAP-C02（Professional）の概要

| 項目 | 内容 |
|------|------|
| **対象スキル** | 複雑なAWSアーキテクチャの設計・評価 |
| **問題数** | 75問 |
| **合格スコア** | 750/1000 |
| **試験時間** | 180分 |
| **受験料** | $300 USD |
| **前提条件** | SAA取得推奨（必須ではない） |

### 12.4 Google Cloud Professional Cloud Architect

| 項目 | 内容 |
|------|------|
| **認定名** | Professional Cloud Architect |
| **問題数** | 50〜60問 |
| **合格スコア** | 非公開（約70%程度） |
| **試験時間** | 120分 |
| **受験料** | $200 USD |
| **有効期限** | 2年 |

### 12.5 Azure Solutions Architect Expert（AZ-305）

| 項目 | 内容 |
|------|------|
| **認定名** | Microsoft Certified: Azure Solutions Architect Expert |
| **前提条件** | AZ-104（Administrator）推奨 |
| **問題数** | 40〜60問 |
| **合格スコア** | 700/1000 |
| **試験時間** | 120分 |
| **受験料** | $165 USD |
| **有効期限** | 1年（無料更新可） |

### 12.6 スクラム関連資格

#### PSM（Professional Scrum Master）

| レベル | 名称 | 合格点 | 特徴 |
|-------|------|--------|------|
| I | PSM I | 85% | スクラムの基礎知識 |
| II | PSM II | 85% | スクラムの実践・応用 |
| III | PSM III | 85% | スクラムマスターとしての最高レベル |

#### SAFe Architect

Scaled Agile Framework（SAFe）におけるアーキテクトの役割に特化した認定資格。企業規模でのアジャイル開発における設計思想を学ぶ。

### 12.7 資格取得の優先度推奨（キャリアステージ別）

```text
【エントリーレベル（0-2年）】
  1. AWS SAA (or Azure AZ-104)     → クラウド基礎
  2. PSM I                          → アジャイル基礎

【ミドルレベル（3-5年）】
  1. AWS SAP / Google PCA          → クラウドアーキテクチャ
  2. TOGAF Level 1                 → エンタープライズアーキテクチャ基礎

【シニアレベル（5年以上）】
  1. TOGAF Level 2                 → エンタープライズアーキテクチャ実践
  2. SAFe Architect                → 組織規模の設計
  3. CISSP（必要に応じて）          → セキュリティアーキテクチャ
```

---

## 13. 学習ロードマップ

### 初学者向け推奨学習順序

```text
Month 1-2: 基礎固め
  ├─ TDDの概念と実践（書籍：テスト駆動開発 / Kent Beck）
  ├─ クリーンコード（書籍：Clean Code / Robert Martin）
  └─ Git/GitHubの習得

Month 3-4: 設計思想
  ├─ SOLID原則の理解
  ├─ デザインパターンの学習（GoFパターン）
  └─ BDDの実践

Month 5-6: アーキテクチャ
  ├─ クリーンアーキテクチャの学習
  ├─ DDDの入門（書籍：エリック・エヴァンスのDDD）
  └─ REST API設計の習得

Month 7-9: 実践と応用
  ├─ マイクロサービスの実装
  ├─ EDAの理解（Kafka等）
  └─ AWS SAA受験

Month 10-12: 資格・応用
  ├─ TOGAF Level 1受験
  └─ 実プロジェクトへの適用
```

---

## 14. 参考文献・ソース一覧

### 📚 書籍

| タイトル | 著者 | 分野 |
|---------|------|------|
| Test-Driven Development: By Example | Kent Beck | TDD |
| Clean Code | Robert C. Martin | コード品質 |
| Clean Architecture | Robert C. Martin | アーキテクチャ |
| Domain-Driven Design | Eric Evans | DDD |
| Implementing Domain-Driven Design | Vaughn Vernon | DDD実践 |
| Building Microservices | Sam Newman | マイクロサービス |
| Designing Data-Intensive Applications | Martin Kleppmann | システム設計 |

### 🌐 公式ドキュメント・URL

#### TDD / テスト関連

- **TDD（Kent Beckによる原文）**: <https://www.agilealliance.org/glossary/tdd/>
- **Martin Fowler - TDD解説**: <https://martinfowler.com/bliki/TestDrivenDevelopment.html>
- **pytest（Python TDDフレームワーク）**: <https://docs.pytest.org/>

#### BDD / ATDD関連

- **Cucumber（BDD公式）**: <https://cucumber.io/docs/bdd/>
- **Gherkin記法リファレンス**: <https://cucumber.io/docs/gherkin/reference/>
- **BDD vs TDD（Martin Fowler）**: <https://martinfowler.com/bliki/GivenWhenThen.html>

#### DDD関連

- **DDD Community（公式）**: <https://www.domainlanguage.com/>
- **DDD Reference（Eric Evans）**: <https://www.domainlanguage.com/ddd/reference/>
- **Martin Fowler - Bounded Context**: <https://martinfowler.com/bliki/BoundedContext.html>
- **Martin Fowler - Ubiquitous Language**: <https://martinfowler.com/bliki/UbiquitousLanguage.html>
- **Event Storming（Alberto Brandolini）**: <https://www.eventstorming.com/>

#### アーキテクチャ関連

- **Clean Architecture（Uncle Bob Blog）**: <https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html>
- **Microservices（Martin Fowler）**: <https://martinfowler.com/articles/microservices.html>
- **Twelve-Factor App**: <https://12factor.net/>
- **Architecture Patterns（Microsoft）**: <https://docs.microsoft.com/en-us/azure/architecture/patterns/>

#### API設計関連

- **OpenAPI Specification（Swagger）**: <https://swagger.io/specification/>
- **REST API Design Best Practices**: <https://restfulapi.net/>
- **Google API Design Guide**: <https://cloud.google.com/apis/design>

#### イベント駆動関連

- **Apache Kafka 公式**: <https://kafka.apache.org/documentation/>
- **CloudEvents 仕様（CNCF）**: <https://cloudevents.io/>
- **EDA（AWS解説）**: <https://aws.amazon.com/event-driven-architecture/>

#### 国際資格関連

- **TOGAF 公式（The Open Group）**: <https://www.opengroup.org/togaf>
- **TOGAF 10 Standard**: <https://www.opengroup.org/togaf/togaf-standard-version-10>
- **AWS認定資格 公式**: <https://aws.amazon.com/certification/>
- **AWS SAA 試験ガイド**: <https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf>
- **Google Cloud認定 公式**: <https://cloud.google.com/learn/certification>
- **Azure認定 公式（Microsoft）**: <https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/>
- **Scrum.org（PSM資格）**: <https://www.scrum.org/professional-scrum-master-assessments>
- **SAFe 公式**: <https://scaledagileframework.com/>

#### 学習プラットフォーム

- **Coursera - Software Architecture**: <https://www.coursera.org/specializations/software-design-architecture>
- **Udemy - Clean Architecture**: <https://www.udemy.com/course/clean-architecture/>
- **TOGAF学習（The Open Group）**: <https://www.opengroup.org/certifications>

---

> 📅 本ドキュメントは2024年時点の情報を基に作成しています。試験情報・受験料は変更される場合があるため、受験前に必ず公式サイトをご確認ください。

---

*作成者：Software Architect Guide | バージョン 1.0*
