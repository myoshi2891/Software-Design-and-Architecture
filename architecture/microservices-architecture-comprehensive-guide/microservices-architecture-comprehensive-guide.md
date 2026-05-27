# 🔧 マイクロサービスアーキテクチャ 完全ガイド

## 📚 目次

1. [マイクロサービスとは何か？](#1-マイクロサービスとは何か)
2. [モノリス vs マイクロサービス](#2-モノリス-vs-マイクロサービス)
3. [マイクロサービスの設計原則](#3-マイクロサービスの設計原則)
4. [サービス分割の戦略](#4-サービス分割の戦略)
5. [サービス間通信パターン](#5-サービス間通信パターン)
6. [APIゲートウェイパターン](#6-apiゲートウェイパターン)
7. [サービスディスカバリと負荷分散](#7-サービスディスカバリと負荷分散)
8. [データ管理戦略](#8-データ管理戦略)
9. [障害耐性と回復力の設計](#9-障害耐性と回復力の設計)
10. [セキュリティ設計](#10-セキュリティ設計)
11. [CI/CDパイプラインと独立デプロイ](#11-cicdパイプラインと独立デプロイ)
12. [コンテナ化とKubernetes](#12-コンテナ化とkubernetes)
13. [監視・オブザーバビリティ](#13-監視オブザーバビリティ)
14. [実践：ECサイト完全事例](#14-実践ecサイト完全事例)
15. [段階的移行戦略（モノリスからの移行）](#15-段階的移行戦略モノリスからの移行)
16. [ベストプラクティス総まとめ](#16-ベストプラクティス総まとめ)
17. [アンチパターン](#17-アンチパターン)
18. [参考文献・ソース一覧](#18-参考文献ソース一覧)

---

## 1. マイクロサービスとは何か？

### 1.1 定義

**マイクロサービスアーキテクチャ** とは、アプリケーションを**小さく独立したサービス群**に分割し、各サービスが独自のプロセスで動作し、軽量なAPIで通信するアーキテクチャスタイルです。

> 💡 **核心思想：**「1つの大きなシステムを、独立してデプロイ・スケール・保守できる小さなサービスの集合体として構築する」

### 1.2 マイクロサービスが生まれた背景

```mermaid
timeline
    title マイクロサービスの歴史的背景
    2000年代初頭 : SOA（Service-Oriented Architecture）の登場
                 : 大きなサービスをESBで繋ぐ
    2005〜2010  : Webスケールの時代
                 : Amazon・Google・NetflixがDC規模の課題に直面
    2011〜2012  : マイクロサービスという言葉が登場
                 : Dockerコンテナ技術の普及開始
    2014        : Martin Fowlerがマイクロサービスを定義・体系化
                 : Kubernetes v1.0リリース（2015）
    2015〜現在  : クラウドネイティブの標準アーキテクチャとして確立
                 : CNCF（Cloud Native Computing Foundation）設立
```

### 1.3 マイクロサービスの特徴

```mermaid
mindmap
    root((マイクロサービス<br>の特徴))
        独立性
            独立したデプロイ
            独立したスケール
            独立した障害隔離
        技術的多様性
            サービスごとに最適な言語を選択
            サービスごとに最適なDBを選択
            技術スタックの自由
        チーム自律性
            小さなチームが所有
            Conway's Lawに従う組織設計
            独立した開発サイクル
        ビジネス機能単位
            ドメイン境界に従う分割
            DDDのBounded Contextと対応
            ビジネス価値に直結
```

### 1.4 どんな組織・システムに向いているか

```mermaid
quadrantChart
    title マイクロサービス適用判断マトリクス
    x-axis システム規模（小） --> システム規模（大）
    y-axis 変化の頻度（低） --> 変化の頻度（高）
    quadrant-1 "マイクロサービスを強く推奨<br>大規模×高変化"
    quadrant-2 "モジュラーモノリスを検討<br>小規模×高変化"
    quadrant-3 "モノリスで十分<br>小規模×低変化"
    quadrant-4 "慎重に検討<br>大規模×低変化"
    Netflix規模EC: [0.95, 0.9]
    中規模SaaS: [0.7, 0.75]
    大手金融: [0.85, 0.6]
    スタートアップMVP: [0.15, 0.8]
    社内ツール: [0.1, 0.2]
    大規模レガシー: [0.8, 0.3]
```

---

## 2. モノリス vs マイクロサービス

### 2.1 モノリスアーキテクチャの構造

```mermaid
graph TD
    subgraph MONOLITH["🏢 モノリスアーキテクチャ"]
        UI["プレゼンテーション層<br>Web UI / API"]
        BIZ["ビジネスロジック層<br>注文・在庫・決済・通知・ユーザー<br>すべてが1つのアプリに混在"]
        DATA["データアクセス層<br>共有データベース"]
        DB[("単一DB<br>PostgreSQL")]

        UI --> BIZ --> DATA --> DB
    end

    subgraph PROBLEMS["❌ モノリスの問題点"]
        P1["デプロイのリスクが高い<br>1行変更でも全体をデプロイ"]
        P2["スケールが非効率<br>全体を一緒にスケールアップ"]
        P3["技術的負債が蓄積<br>変更しにくい密結合"]
        P4["チームのボトルネック<br>複数チームが1コードベースに依存"]
    end

    style MONOLITH fill:#fde8e8
    style BIZ fill:#e74c3c,color:#fff
```

### 2.2 マイクロサービスアーキテクチャの構造

```mermaid
graph TD
    CLIENT["🌐 クライアント<br>Web / Mobile"]

    GW["🚪 API Gateway<br>認証・ルーティング"]

    subgraph SERVICES["⚙️ マイクロサービス群"]
        ORDER["📦 注文サービス<br>Order Service"]
        INVENTORY["🏭 在庫サービス<br>Inventory Service"]
        PAYMENT["💳 決済サービス<br>Payment Service"]
        NOTIFY["📧 通知サービス<br>Notification Service"]
        USER["👤 ユーザーサービス<br>User Service"]
    end

    subgraph DBS["🗄️ 独立したデータストア"]
        DB_O[("注文DB<br>PostgreSQL")]
        DB_I[("在庫DB<br>MongoDB")]
        DB_P[("決済DB<br>PostgreSQL")]
        DB_N[("通知DB<br>Redis")]
        DB_U[("ユーザーDB<br>MySQL")]
    end

    subgraph BUS["📨 イベントバス"]
        KAFKA["Apache Kafka"]
    end

    CLIENT --> GW
    GW --> ORDER & INVENTORY & PAYMENT & USER

    ORDER --> DB_O
    INVENTORY --> DB_I
    PAYMENT --> DB_P
    NOTIFY --> DB_N
    USER --> DB_U

    ORDER & PAYMENT & INVENTORY --> KAFKA
    KAFKA --> NOTIFY

    style GW fill:#f39c12,color:#fff
    style ORDER fill:#3498db,color:#fff
    style INVENTORY fill:#27ae60,color:#fff
    style PAYMENT fill:#8e44ad,color:#fff
    style NOTIFY fill:#e67e22,color:#fff
    style USER fill:#1abc9c,color:#fff
    style KAFKA fill:#e74c3c,color:#fff
```

### 2.3 モノリス vs マイクロサービス 詳細比較

| 観点 | モノリス | マイクロサービス |
|------|---------|----------------|
| **デプロイ** | 全体を一括デプロイ | サービス単位で独立デプロイ |
| **スケール** | 全体を一括スケール | サービス単位でスケール |
| **障害影響** | 1つの障害が全体に波及 | 障害がサービス内に局所化 |
| **技術選択** | 統一された技術スタック | サービスごとに最適な技術 |
| **開発速度** | 初期は速い | 初期は遅い（基盤整備が必要） |
| **運用複雑度** | シンプル | 複雑（分散システムの課題） |
| **テスト** | 統合テストが容易 | 分散テストが複雑 |
| **データ整合性** | ACID トランザクション | 結果整合性（Eventually Consistent） |
| **チーム規模** | 小〜中規模向き | 中〜大規模向き |

### 2.4 モジュラーモノリス（中間形態）

```mermaid
graph LR
    subgraph MODULAR["🔵 モジュラーモノリス（推奨の中間形態）"]
        subgraph M1["📦 注文モジュール"]
            OM["OrderService<br>OrderRepository"]
        end
        subgraph M2["🏭 在庫モジュール"]
            IM["InventoryService<br>InventoryRepository"]
        end
        subgraph M3["💳 決済モジュール"]
            PM["PaymentService<br>PaymentRepository"]
        end
        DB2[("共有DB<br>スキーマは分離")]
    end

    M1 --> |"明確なインターフェース<br>経由のみアクセス"| M2
    M1 --> M3
    OM & IM & PM --> DB2

    NOTE["✅ 将来的なマイクロサービス化が容易<br>✅ 複雑さを制御しながら成長できる<br>✅ スタートアップに最適"]

    style MODULAR fill:#e8fde8
    style M1 fill:#3498db,color:#fff
    style M2 fill:#27ae60,color:#fff
    style M3 fill:#8e44ad,color:#fff
```

---

## 3. マイクロサービスの設計原則

### 3.1 8つのコア設計原則

```mermaid
graph TD
    PRINCIPLES["🏗️ マイクロサービス設計の8原則"]

    PRINCIPLES --> P1["1️⃣ 単一責任<br>Single Responsibility<br>1サービス = 1ビジネス機能"]
    PRINCIPLES --> P2["2️⃣ 独立デプロイ可能<br>Independently Deployable<br>他サービスに影響なくデプロイ"]
    PRINCIPLES --> P3["3️⃣ データの所有<br>Data Ownership<br>各サービスが専用DBを持つ"]
    PRINCIPLES --> P4["4️⃣ 疎結合<br>Loose Coupling<br>サービス間の依存を最小化"]
    PRINCIPLES --> P5["5️⃣ 高凝集<br>High Cohesion<br>関連機能をサービス内にまとめる"]
    PRINCIPLES --> P6["6️⃣ 障害隔離<br>Failure Isolation<br>1つの障害が全体に波及しない"]
    PRINCIPLES --> P7["7️⃣ 分散可能<br>Decentralized Governance<br>各チームが独自に技術選択"]
    PRINCIPLES --> P8["8️⃣ 設計の自動化<br>Design for Automation<br>CI/CD・自動テストが前提"]

    style P1 fill:#3498db,color:#fff
    style P2 fill:#27ae60,color:#fff
    style P3 fill:#8e44ad,color:#fff
    style P4 fill:#e74c3c,color:#fff
    style P5 fill:#e67e22,color:#fff
    style P6 fill:#f39c12,color:#fff
    style P7 fill:#1abc9c,color:#fff
    style P8 fill:#2c3e50,color:#fff
```

### 3.2 Twelve-Factor App 原則との対応

```mermaid
graph LR
    subgraph "Twelve-Factor App（マイクロサービスの基盤原則）"
        T1["1. コードベース<br>1リポジトリ = 1サービス"]
        T2["2. 依存関係<br>明示的な依存宣言"]
        T3["3. 設定<br>環境変数で管理"]
        T4["4. バックエンドサービス<br>DBをアタッチリソースとして扱う"]
        T5["5. ビルド・リリース・実行<br>3ステージを厳密に分離"]
        T6["6. プロセス<br>ステートレスに設計"]
        T7["7. ポートバインディング<br>ポート番号で公開"]
        T8["8. 並行性<br>プロセスモデルでスケール"]
        T9["9. 廃棄容易性<br>高速起動・グレースフルシャットダウン"]
        T10["10. 開発・本番の一致<br>環境差異を最小化"]
        T11["11. ログ<br>標準出力へのストリーム出力"]
        T12["12. 管理プロセス<br>1回限りのタスクを分離"]
    end

    style T1 fill:#3498db,color:#fff
    style T3 fill:#27ae60,color:#fff
    style T6 fill:#e74c3c,color:#fff
    style T9 fill:#8e44ad,color:#fff
```

### 3.3 サービスサイズの判断基準

```mermaid
flowchart TD
    SIZE["サービスの適切なサイズを判断する"]

    Q1{"1つのチーム（5〜8人）で<br>所有・保守できるか？"}
    Q2{"2週間以内に<br>最初から書き直せるか？"}
    Q3{"ビジネス機能が<br>明確に1つに絞れるか？"}
    Q4{"独立してデプロイ・<br>スケールできるか？"}

    TOO_BIG["📦 大きすぎる<br>→ さらに分割する"]
    TOO_SMALL["🔧 小さすぎる<br>→ 関連サービスとまとめる<br>（ナノサービス問題）"]
    JUST_RIGHT["✅ 適切なサイズ"]

    SIZE --> Q1
    Q1 -->|"No（大きい）"| TOO_BIG
    Q1 -->|"Yes"| Q2
    Q2 -->|"No（大きい）"| TOO_BIG
    Q2 -->|"Yes"| Q3
    Q3 -->|"No（複数機能混在）"| TOO_BIG
    Q3 -->|"Yes"| Q4
    Q4 -->|"No（依存が多い）"| TOO_SMALL
    Q4 -->|"Yes"| JUST_RIGHT

    style TOO_BIG fill:#e74c3c,color:#fff
    style TOO_SMALL fill:#f39c12,color:#fff
    style JUST_RIGHT fill:#27ae60,color:#fff
```

---

## 4. サービス分割の戦略

### 4.1 DDD（ドメイン駆動設計）によるサービス分割

```mermaid
graph TD
    DOMAIN["🏢 ECサイト全体ドメイン"]

    DOMAIN --> BC1["📦 注文コンテキスト<br>Order Bounded Context<br>→ 注文サービス"]
    DOMAIN --> BC2["🏭 在庫コンテキスト<br>Inventory Bounded Context<br>→ 在庫サービス"]
    DOMAIN --> BC3["💳 決済コンテキスト<br>Payment Bounded Context<br>→ 決済サービス"]
    DOMAIN --> BC4["🚚 配送コンテキスト<br>Shipping Bounded Context<br>→ 配送サービス"]
    DOMAIN --> BC5["👤 顧客コンテキスト<br>Customer Bounded Context<br>→ ユーザーサービス"]
    DOMAIN --> BC6["🛍️ 商品コンテキスト<br>Catalog Bounded Context<br>→ 商品カタログサービス"]

    BC1 --> SVC1["Order Service<br>Python + PostgreSQL"]
    BC2 --> SVC2["Inventory Service<br>Go + MongoDB"]
    BC3 --> SVC3["Payment Service<br>Java + PostgreSQL"]
    BC4 --> SVC4["Shipping Service<br>Node.js + PostgreSQL"]
    BC5 --> SVC5["User Service<br>Python + MySQL"]
    BC6 --> SVC6["Catalog Service<br>Node.js + Elasticsearch"]

    style BC1 fill:#3498db,color:#fff
    style BC2 fill:#27ae60,color:#fff
    style BC3 fill:#8e44ad,color:#fff
    style BC4 fill:#e67e22,color:#fff
    style BC5 fill:#1abc9c,color:#fff
    style BC6 fill:#e74c3c,color:#fff
```

### 4.2 Strangler Fig パターン（段階的分割）

```mermaid
flowchart LR
    subgraph PHASE1["Phase 1: 最初の状態"]
        MON1["モノリス<br>すべての機能"]
    end

    subgraph PHASE2["Phase 2: 新機能を外部に"]
        MON2["モノリス<br>（既存機能）"]
        NEW_SVC["新機能<br>マイクロサービス"]
        PROXY1["プロキシ<br>（ルーティング）"]
        PROXY1 --> MON2
        PROXY1 --> NEW_SVC
    end

    subgraph PHASE3["Phase 3: 機能を段階的に移行"]
        MON3["縮小した<br>モノリス"]
        SVC_A["サービスA"]
        SVC_B["サービスB"]
        PROXY2["プロキシ<br>（ルーティング）"]
        PROXY2 --> MON3
        PROXY2 --> SVC_A
        PROXY2 --> SVC_B
    end

    subgraph PHASE4["Phase 4: 完全移行"]
        SVC_1["サービス1"]
        SVC_2["サービス2"]
        SVC_3["サービス3"]
        SVC_4["サービス4"]
        GW_FINAL["API Gateway"]
        GW_FINAL --> SVC_1 & SVC_2 & SVC_3 & SVC_4
    end

    PHASE1 --> PHASE2 --> PHASE3 --> PHASE4

    style PHASE1 fill:#fde8e8
    style PHASE4 fill:#e8fde8
```

### 4.3 分割時の注意点

```mermaid
graph TD
    subgraph "✅ 良い分割の基準"
        G1["ビジネス機能の境界に沿っている<br>（DDDのBounded Context）"]
        G2["データの所有権が明確<br>（他サービスのDBに直接アクセスしない）"]
        G3["独立してデプロイできる<br>（デプロイ時に他サービスに影響しない）"]
        G4["チームが所有できる規模<br>（Conway's Lawに従う）"]
    end

    subgraph "❌ 悪い分割の例"
        B1["技術レイヤーで分割<br>（フロントエンドサービス/バックエンドサービス）"]
        B2["CRUD操作で分割<br>（読み取りサービス/書き込みサービス）"]
        B3["細かすぎる分割<br>（1エンドポイント = 1サービス）"]
        B4["循環依存が生まれる分割<br>（A→B→C→A の依存関係）"]
    end

    style G1 fill:#27ae60,color:#fff
    style G2 fill:#27ae60,color:#fff
    style G3 fill:#27ae60,color:#fff
    style G4 fill:#27ae60,color:#fff
    style B1 fill:#e74c3c,color:#fff
    style B2 fill:#e74c3c,color:#fff
    style B3 fill:#e74c3c,color:#fff
    style B4 fill:#e74c3c,color:#fff
```

---

## 5. サービス間通信パターン

### 5.1 同期通信 vs 非同期通信

```mermaid
graph TD
    COMM["📡 サービス間通信"]

    COMM --> SYNC["🔄 同期通信<br>Synchronous"]
    COMM --> ASYNC["⚡ 非同期通信<br>Asynchronous"]

    SYNC --> REST_API["REST API<br>・シンプルで実装しやすい<br>・リクエスト-レスポンス型<br>・HTTPステータスで結果確認"]
    SYNC --> GRPC["gRPC<br>・Protocol Buffersで高速<br>・型安全・双方向ストリーミング<br>・マイクロサービス間通信に最適"]
    SYNC --> GRAPHQL["GraphQL<br>・クライアントが必要なデータのみ取得<br>・BFF（Backend for Frontend）に適する"]

    ASYNC --> MQ["メッセージキュー<br>RabbitMQ / SQS<br>・Fire and Forget<br>・ワークキュー処理に適する"]
    ASYNC --> EVENT["イベントストリーミング<br>Apache Kafka / Kinesis<br>・Pub/Sub パターン<br>・イベントソーシングに適する"]

    style SYNC fill:#3498db,color:#fff
    style ASYNC fill:#27ae60,color:#fff
    style REST_API fill:#3498db,color:#fff
    style GRPC fill:#3498db,color:#fff
    style MQ fill:#27ae60,color:#fff
    style EVENT fill:#27ae60,color:#fff
```

### 5.2 同期通信の実装例（REST API）

```python
# ─── 注文サービス（Order Service）───
import httpx
from typing import Optional
import asyncio

class InventoryServiceClient:
    """
    在庫サービスへの同期HTTPクライアント
    サービス間通信にはHTTPXを使用（非同期対応）
    """

    def __init__(self, base_url: str, timeout: float = 5.0):
        self.base_url = base_url
        self.timeout = httpx.Timeout(timeout)

    async def check_availability(
        self, product_id: str, quantity: int
    ) -> dict:
        """在庫確認API呼び出し"""
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.get(
                    f"{self.base_url}/inventory/{product_id}",
                    params={"requested_quantity": quantity},
                    headers={"X-Service-Name": "order-service"},
                )
                response.raise_for_status()
                return response.json()
            except httpx.TimeoutException:
                raise ServiceUnavailableError("在庫サービスがタイムアウトしました")
            except httpx.HTTPStatusError as e:
                if e.response.status_code == 404:
                    raise ProductNotFoundError(f"商品が見つかりません: {product_id}")
                raise ServiceError(f"在庫サービスエラー: {e.response.status_code}")

    async def reserve_stock(self, product_id: str, quantity: int, order_id: str) -> dict:
        """在庫引き当てAPI呼び出し"""
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                f"{self.base_url}/inventory/{product_id}/reserve",
                json={"quantity": quantity, "order_id": order_id},
                headers={
                    "X-Service-Name": "order-service",
                    "Idempotency-Key": f"reserve-{order_id}-{product_id}",
                }
            )
            response.raise_for_status()
            return response.json()
```

### 5.3 非同期通信の実装例（Kafka）

```python
from kafka import KafkaProducer, KafkaConsumer
import json
from dataclasses import dataclass, asdict
from datetime import datetime

# ─── イベント定義 ───

@dataclass
class OrderPlacedEvent:
    """注文確定イベント（過去形で命名）"""
    event_id: str
    event_type: str = "order.placed"
    order_id: str = ""
    customer_id: str = ""
    items: list = None
    total_amount: float = 0.0
    occurred_at: str = ""

    def __post_init__(self):
        if self.occurred_at == "":
            self.occurred_at = datetime.utcnow().isoformat()
        if self.items is None:
            self.items = []


# ─── プロデューサー（注文サービス）───

class OrderEventProducer:
    def __init__(self, bootstrap_servers: list[str]):
        self._producer = KafkaProducer(
            bootstrap_servers=bootstrap_servers,
            value_serializer=lambda v: json.dumps(v).encode("utf-8"),
            acks="all",          # 全レプリカへの書き込みを確認
            retries=3,
        )

    def publish_order_placed(self, event: OrderPlacedEvent):
        """注文確定イベントをKafkaに発行"""
        self._producer.send(
            topic="orders",
            key=event.order_id.encode("utf-8"),  # 同じ注文は同じパーティションへ
            value=asdict(event)
        )
        self._producer.flush()


# ─── コンシューマー（通知サービス）───

class NotificationEventConsumer:
    def __init__(self, bootstrap_servers: list[str]):
        self._consumer = KafkaConsumer(
            "orders",
            bootstrap_servers=bootstrap_servers,
            group_id="notification-service",
            value_deserializer=lambda v: json.loads(v.decode("utf-8")),
            enable_auto_commit=False,  # 手動コミットで確実な処理
        )

    def start(self):
        for message in self._consumer:
            event = message.value
            if event["event_type"] == "order.placed":
                self._send_confirmation_email(event)
                self._consumer.commit()  # 処理成功後にコミット

    def _send_confirmation_email(self, event: dict):
        print(f"確認メール送信: order={event['order_id']}, customer={event['customer_id']}")
```

### 5.4 通信パターンの選択基準

```mermaid
flowchart TD
    START["通信方式を選択する"]

    Q1{"即時応答が<br>必要か？"}
    Q2{"高スループットが<br>必要か？（秒間1万件以上）"}
    Q3{"複数のサービスが<br>同じイベントに反応するか？"}
    Q4{"サービス間の<br>強い結合を避けたいか？"}

    REST_REC["✅ REST API<br>シンプル・標準的"]
    GRPC_REC["✅ gRPC<br>高速・型安全"]
    KAFKA_REC["✅ Kafka / イベントストリーミング<br>高スループット・永続化"]
    MQ_REC["✅ メッセージキュー<br>非同期・信頼性重視"]

    START --> Q1
    Q1 -->|"Yes（同期）"| Q2
    Q1 -->|"No（非同期）"| Q3
    Q2 -->|"Yes"| GRPC_REC
    Q2 -->|"No"| REST_REC
    Q3 -->|"Yes（Pub/Sub）"| KAFKA_REC
    Q3 -->|"No"| Q4
    Q4 -->|"Yes"| MQ_REC
    Q4 -->|"No"| REST_REC

    style REST_REC fill:#27ae60,color:#fff
    style GRPC_REC fill:#3498db,color:#fff
    style KAFKA_REC fill:#e67e22,color:#fff
    style MQ_REC fill:#8e44ad,color:#fff
```

---

## 6. APIゲートウェイパターン

### 6.1 APIゲートウェイの役割と機能

```mermaid
graph TD
    subgraph CLIENTS["クライアント層"]
        WEB["🌐 Web App"]
        MOBILE["📱 Mobile App"]
        THIRD["🤝 サードパーティ"]
    end

    subgraph GW_LAYER["🚪 API Gateway層"]
        GW_MAIN["API Gateway<br>（Kong / AWS API Gateway / Nginx）"]

        subgraph GW_FEATURES["APIゲートウェイの機能"]
            AUTH_F["🔒 認証・認可<br>JWT検証 / OAuth2"]
            RATE_F["⏱️ レート制限<br>Rate Limiting / Throttling"]
            LOG_F["📝 ロギング<br>リクエスト/レスポンスログ"]
            CACHE_F["⚡ キャッシング<br>レスポンスキャッシュ"]
            TRANSFORM_F["🔄 リクエスト変換<br>プロトコル変換・ヘッダー操作"]
            CIRCUIT_F["🔌 サーキットブレーカー<br>障害時のフォールバック"]
            SSL_F["🔐 SSLターミネーション<br>HTTPS終端"]
            LB_F["⚖️ ロードバランシング<br>負荷分散"]
        end
    end

    subgraph MICROSERVICES["マイクロサービス群"]
        SVC_A["注文サービス"]
        SVC_B["商品サービス"]
        SVC_C["ユーザーサービス"]
        SVC_D["決済サービス"]
    end

    WEB & MOBILE & THIRD --> GW_MAIN
    GW_MAIN --> SVC_A & SVC_B & SVC_C & SVC_D

    style GW_MAIN fill:#f39c12,color:#fff
    style AUTH_F fill:#e74c3c,color:#fff
    style RATE_F fill:#3498db,color:#fff
    style CIRCUIT_F fill:#8e44ad,color:#fff
```

### 6.2 BFF（Backend for Frontend）パターン

```mermaid
graph LR
    subgraph CLIENTS2["クライアント種別"]
        WEB_CLI["🌐 Webアプリ<br>React"]
        MOB_IOS["📱 iOSアプリ"]
        MOB_AND["🤖 Androidアプリ"]
        PARTNER_CLI["🤝 パートナーAPI"]
    end

    subgraph BFF_LAYER["BFF レイヤー"]
        WEB_BFF["Web BFF<br>・PC向けデータ最適化<br>・リッチなレスポンス<br>・GraphQL対応"]
        MOB_BFF["Mobile BFF<br>・モバイル向けデータ最適化<br>・軽量なレスポンス<br>・オフライン対応"]
        PARTNER_BFF["Partner API BFF<br>・パートナー向け認証<br>・SLA管理<br>・レート制限"]
    end

    subgraph SVCS["マイクロサービス群"]
        S1["注文"]
        S2["商品"]
        S3["ユーザー"]
        S4["決済"]
    end

    WEB_CLI --> WEB_BFF
    MOB_IOS & MOB_AND --> MOB_BFF
    PARTNER_CLI --> PARTNER_BFF

    WEB_BFF & MOB_BFF & PARTNER_BFF --> S1 & S2 & S3 & S4

    style WEB_BFF fill:#3498db,color:#fff
    style MOB_BFF fill:#27ae60,color:#fff
    style PARTNER_BFF fill:#8e44ad,color:#fff
```

### 6.3 APIゲートウェイ実装例（Kong設定）

```yaml
# Kong APIゲートウェイの設定例（declarative config）

_format_version: "3.0"

services:
  - name: order-service
    url: http://order-service:8001
    connect_timeout: 5000
    read_timeout: 10000
    retries: 3

  - name: inventory-service
    url: http://inventory-service:8002
    connect_timeout: 5000
    read_timeout: 10000

routes:
  - name: order-routes
    service: order-service
    paths:
      - /v1/orders
    methods:
      - GET
      - POST
      - DELETE
    strip_path: false

  - name: inventory-routes
    service: inventory-service
    paths:
      - /v1/inventory

# プラグイン設定
plugins:
  # JWT認証（全サービスに適用）
  - name: jwt
    config:
      secret_is_base64: false
      claims_to_verify:
        - exp
        - nbf

  # レート制限（サービスごとに設定）
  - name: rate-limiting
    service: order-service
    config:
      minute: 100        # 1分あたり100リクエスト
      hour: 5000         # 1時間あたり5000リクエスト
      policy: redis      # Redisで分散管理
      redis_host: redis
      redis_port: 6379

  # リクエストロギング
  - name: http-log
    config:
      http_endpoint: http://logging-service:9200/logs
      method: POST
      timeout: 1000
      keepalive: 1000

  # サーキットブレーカー（Upstream ヘルスチェックによる実装）
upstreams:
  - name: inventory-service
    healthchecks:
      passive:
        healthy:
          http_statuses: [200, 201, 204]
          successes: 5
        unhealthy:
          http_statuses: [429, 500, 503]
          tcp_failures: 2
          timeouts: 3
          http_failures: 5
    targets:
      - target: inventory-service:8080
        weight: 100
```

---

## 7. サービスディスカバリと負荷分散

### 7.1 サービスディスカバリの2方式

```mermaid
graph TD
    subgraph CLIENT_SIDE["クライアントサイドディスカバリ"]
        CS_SVC["サービスA<br>（クライアント）"]
        CS_REG["サービスレジストリ<br>Consul / Eureka"]
        CS_B["サービスB<br>インスタンス1"]
        CS_C["サービスB<br>インスタンス2"]

        CS_SVC -->|"① どこにサービスBがあるか問い合わせ"| CS_REG
        CS_REG -->|"② インスタンスリストを返す"| CS_SVC
        CS_SVC -->|"③ 直接呼び出し（LBロジックを含む）"| CS_B
    end

    subgraph SERVER_SIDE["サーバーサイドディスカバリ（Kubernetes標準）"]
        SS_SVC["サービスA<br>（クライアント）"]
        SS_LB["ロードバランサー<br>/ Kubernetes Service"]
        SS_REG2["サービスレジストリ<br>（etcd）"]
        SS_B["サービスB Pod 1"]
        SS_C["サービスB Pod 2"]
        SS_D["サービスB Pod 3"]

        SS_SVC -->|"① サービス名で呼び出し"| SS_LB
        SS_LB -->|"② レジストリに問い合わせ"| SS_REG2
        SS_REG2 -->|"③ インスタンス返却"| SS_LB
        SS_LB -->|"④ ルーティング"| SS_B & SS_C & SS_D
    end

    style CLIENT_SIDE fill:#fef9e7
    style SERVER_SIDE fill:#e8f8f5
```

### 7.2 Kubernetes Service の設定例

```yaml
# Kubernetesでのサービスディスカバリ設定

---
# 注文サービスのDeployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  labels:
    app: order-service
    version: "2.1.0"
spec:
  replicas: 3                    # 3つのPodを起動
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
        - name: order-service
          image: myregistry/order-service:2.1.0
          ports:
            - containerPort: 8001
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: order-db-secret
                  key: url
            - name: KAFKA_BOOTSTRAP_SERVERS
              value: "kafka:9092"
          # ヘルスチェック設定
          livenessProbe:
            httpGet:
              path: /health/live
              port: 8001
            initialDelaySeconds: 30
            periodSeconds: 10
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /health/ready
              port: 8001
            initialDelaySeconds: 10
            periodSeconds: 5
          # リソース制限
          resources:
            requests:
              cpu: "100m"
              memory: "256Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"

---
# Serviceリソース（内部ロードバランサー）
apiVersion: v1
kind: Service
metadata:
  name: order-service    # この名前でDNS解決される
spec:
  selector:
    app: order-service
  ports:
    - port: 80
      targetPort: 8001
  type: ClusterIP        # 内部通信用

---
# HorizontalPodAutoscaler（自動スケール）
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70   # CPU使用率70%でスケールアウト
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

### 7.3 サービスメッシュ（Istio）の構成

```mermaid
graph TD
    subgraph SERVICE_MESH["🕸️ サービスメッシュ（Istio）"]
        subgraph SVC_A["注文サービス Pod"]
            APP_A["Order App"]
            PROXY_A["Envoy Proxy<br>（Sidecar）"]
        end

        subgraph SVC_B["在庫サービス Pod"]
            APP_B["Inventory App"]
            PROXY_B["Envoy Proxy<br>（Sidecar）"]
        end

        subgraph CONTROL_PLANE["コントロールプレーン（istiod）"]
            ISTIOD["istiod<br>トラフィック管理・証明書管理・設定検証"]
        end

        GRAFANA["📊 Grafana<br>メトリクス可視化"]
        JAEGER["🔍 Jaeger<br>分散トレーシング"]
        KIALI["🗺️ Kiali<br>サービスグラフ"]
    end

    APP_A --> PROXY_A
    PROXY_A -->|"mTLS暗号化通信"| PROXY_B
    PROXY_B --> APP_B

    CONTROL_PLANE --> PROXY_A & PROXY_B
    PROXY_A & PROXY_B --> GRAFANA & JAEGER

    style CONTROL_PLANE fill:#f39c12,color:#fff
    style PROXY_A fill:#3498db,color:#fff
    style PROXY_B fill:#3498db,color:#fff
    style GRAFANA fill:#27ae60,color:#fff
    style JAEGER fill:#8e44ad,color:#fff
```

---

## 8. データ管理戦略

### 8.1 データベース per サービスパターン

```mermaid
graph LR
    subgraph "❌ 共有DBアンチパターン"
        SA["サービスA"]
        SB["サービスB"]
        SC["サービスC"]
        SHARED_DB[("共有DB<br>（密結合の原因）")]

        SA --> SHARED_DB
        SB --> SHARED_DB
        SC --> SHARED_DB
    end

    subgraph "✅ DB per Service パターン"
        SA2["サービスA"]
        SB2["サービスB"]
        SC2["サービスC"]
        DB_A[("DB A<br>PostgreSQL")]
        DB_B[("DB B<br>MongoDB")]
        DB_C[("DB C<br>Redis")]

        SA2 --> DB_A
        SB2 --> DB_B
        SC2 --> DB_C
    end

    style SHARED_DB fill:#e74c3c,color:#fff
    style DB_A fill:#27ae60,color:#fff
    style DB_B fill:#27ae60,color:#fff
    style DB_C fill:#27ae60,color:#fff
```

### 8.2 Sagaパターン（分散トランザクション）

```mermaid
sequenceDiagram
    participant CLIENT as クライアント
    participant ORDER as 注文サービス
    participant STOCK as 在庫サービス
    participant PAYMENT as 決済サービス
    participant SHIP as 配送サービス

    Note over ORDER,SHIP: ✅ 正常フロー（Choreography Saga）

    CLIENT->>ORDER: 注文作成リクエスト
    ORDER->>ORDER: 注文作成（PENDING）
    ORDER-->>STOCK: OrderCreatedEvent

    STOCK->>STOCK: 在庫引き当て
    STOCK-->>PAYMENT: StockReservedEvent

    PAYMENT->>PAYMENT: 決済処理
    PAYMENT-->>SHIP: PaymentCompletedEvent

    SHIP->>SHIP: 配送手配
    SHIP-->>ORDER: ShipmentCreatedEvent

    ORDER->>ORDER: 注文確定（CONFIRMED）
    ORDER-->>CLIENT: 201 Created

    Note over ORDER,SHIP: ❌ 補償トランザクション（決済失敗時）

    PAYMENT-xPAYMENT: 決済失敗！
    PAYMENT-->>STOCK: PaymentFailedEvent
    STOCK->>STOCK: 在庫引き当てを解除
    STOCK-->>ORDER: StockReleasedEvent
    ORDER->>ORDER: 注文キャンセル（CANCELLED）
    ORDER-->>CLIENT: 422 Payment Failed
```

### 8.3 CQRSパターン（読み書き分離）

```mermaid
flowchart TD
    subgraph WRITE["✍️ 書き込みサイド（Command）"]
        CMD["コマンド<br>CreateOrder / CancelOrder"]
        AGG["集約処理<br>（ドメインロジック）"]
        WRITE_DB[("書き込みDB<br>正規化・整合性重視<br>PostgreSQL")]
        EVENT_PUB["イベント発行<br>OrderPlacedEvent"]
        CMD --> AGG --> WRITE_DB
        AGG --> EVENT_PUB
    end

    subgraph MSG["📨 メッセージバス（Kafka）"]
        BUS["イベントバス"]
    end

    subgraph READ["📖 読み取りサイド（Query）"]
        PROJ1["プロジェクション1<br>注文サマリービュー<br>PostgreSQL"]
        PROJ2["プロジェクション2<br>顧客注文履歴<br>Elasticsearch"]
        PROJ3["プロジェクション3<br>分析ダッシュボード<br>Redis"]
        QUERY_API["クエリAPI<br>GET /orders/{id}"]
    end

    EVENT_PUB --> MSG
    MSG --> PROJ1 & PROJ2 & PROJ3
    PROJ1 & PROJ2 & PROJ3 --> QUERY_API

    style WRITE fill:#3498db,color:#fff
    style MSG fill:#f39c12,color:#fff
    style READ fill:#27ae60,color:#fff
```

### 8.4 データ整合性の戦略

```mermaid
graph TD
    subgraph "データ整合性の選択肢"
        ACID["🔒 強整合性（ACID）<br>・即時整合性<br>・単一DBトランザクション<br>・マイクロサービスでは困難"]

        SAGA["🔄 Sagaパターン<br>・分散トランザクション<br>・補償トランザクションによるロールバック<br>・複雑だが実用的"]

        EVENTUAL["⏱️ 結果整合性（Eventual Consistency）<br>・最終的に整合性が保たれる<br>・短時間の不整合を許容<br>・マイクロサービスでの標準"]

        OUTBOX["📤 Outboxパターン<br>・DBとメッセージキューの整合を保証<br>・トランザクショナルアウトボックス<br>・確実なイベント発行"]
    end

    ACID --> |"単一サービス内"| USE_ACID["モジュール内の操作に使用"]
    SAGA --> |"クロスサービス操作"| USE_SAGA["注文→決済→配送などのフロー"]
    EVENTUAL --> |"読み取り系"| USE_EVENTUAL["キャッシュ更新・検索インデックス更新"]
    OUTBOX --> |"確実な発行"| USE_OUTBOX["イベント発行の信頼性保証"]

    style ACID fill:#e74c3c,color:#fff
    style SAGA fill:#f39c12,color:#fff
    style EVENTUAL fill:#27ae60,color:#fff
    style OUTBOX fill:#3498db,color:#fff
```

---

## 9. 障害耐性と回復力の設計

### 9.1 障害耐性パターンの全体像

```mermaid
mindmap
    root((障害耐性<br>パターン))
        サーキットブレーカー
            CLOSED（正常）
            OPEN（障害検出・遮断）
            HALF_OPEN（回復確認）
        タイムアウト
            接続タイムアウト
            読み取りタイムアウト
            リトライタイムアウト
        リトライ
            指数バックオフ
            ジッター追加
            最大リトライ回数
        バルクヘッド
            スレッドプール分離
            コネクションプール分離
            リソース制限
        フォールバック
            キャッシュからの返却
            デフォルト値の返却
            縮退機能での応答
        ヘルスチェック
            Liveness Probe
            Readiness Probe
            スタートアップ Probe
```

### 9.2 サーキットブレーカーの状態遷移

```mermaid
stateDiagram-v2
    [*] --> CLOSED : 初期状態

    CLOSED --> CLOSED : ✅ リクエスト成功
    CLOSED --> OPEN : ❌ 失敗率がしきい値超過\n（例：5秒間で50%失敗）

    OPEN --> OPEN : 🚫 リクエストを即拒否\nフォールバックを返す
    OPEN --> HALF_OPEN : ⏱️ タイムアウト後\n（例：30秒経過）

    HALF_OPEN --> CLOSED : ✅ テストリクエスト成功\nサービス回復確認
    HALF_OPEN --> OPEN : ❌ テストリクエスト失敗\nまだ回復していない
```

### 9.3 障害耐性の実装例（Python）

```python
import asyncio
import time
from enum import Enum
from typing import Callable, Any, Optional
from dataclasses import dataclass
import logging

logger = logging.getLogger(__name__)


class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"


@dataclass
class CircuitBreakerConfig:
    failure_threshold: int = 5       # OPEN になる失敗回数
    success_threshold: int = 2       # CLOSED に戻る成功回数
    timeout_duration: float = 30.0   # OPEN 状態の持続時間（秒）
    half_open_max_calls: int = 3     # HALF_OPEN での最大テスト回数


class CircuitBreaker:
    """
    サーキットブレーカーの実装
    外部サービス呼び出しに使用して障害を局所化する
    """

    def __init__(self, service_name: str, config: CircuitBreakerConfig = None):
        self.service_name = service_name
        self.config = config or CircuitBreakerConfig()
        self._state = CircuitState.CLOSED
        self._failure_count = 0
        self._success_count = 0
        self._last_failure_time: Optional[float] = None
        self._half_open_calls = 0

    @property
    def state(self) -> CircuitState:
        if self._state == CircuitState.OPEN:
            # タイムアウト後にHALF_OPENに遷移
            if time.time() - self._last_failure_time > self.config.timeout_duration:
                self._state = CircuitState.HALF_OPEN
                self._half_open_calls = 0
                logger.info(f"CircuitBreaker[{self.service_name}]: OPEN → HALF_OPEN")
        return self._state

    async def execute(self, func: Callable, *args, fallback: Any = None, **kwargs) -> Any:
        """
        サーキットブレーカーを通じて関数を実行する
        """
        if self.state == CircuitState.OPEN:
            logger.warning(f"CircuitBreaker[{self.service_name}]: OPEN - リクエストを拒否")
            if fallback is not None:
                return fallback() if callable(fallback) else fallback
            raise CircuitBreakerOpenError(f"{self.service_name} は現在利用できません")

        if self.state == CircuitState.HALF_OPEN:
            if self._half_open_calls >= self.config.half_open_max_calls:
                raise CircuitBreakerOpenError("HALF_OPEN: テストリクエスト上限に達しました")
            self._half_open_calls += 1

        try:
            result = await func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise

    def _on_success(self):
        if self._state == CircuitState.HALF_OPEN:
            self._success_count += 1
            if self._success_count >= self.config.success_threshold:
                self._state = CircuitState.CLOSED
                self._failure_count = 0
                self._success_count = 0
                logger.info(f"CircuitBreaker[{self.service_name}]: HALF_OPEN → CLOSED")
        elif self._state == CircuitState.CLOSED:
            self._failure_count = max(0, self._failure_count - 1)

    def _on_failure(self):
        self._failure_count += 1
        self._last_failure_time = time.time()
        if self._state == CircuitState.HALF_OPEN:
            self._state = CircuitState.OPEN
            logger.warning(f"CircuitBreaker[{self.service_name}]: HALF_OPEN → OPEN")
        elif self._failure_count >= self.config.failure_threshold:
            self._state = CircuitState.OPEN
            logger.error(f"CircuitBreaker[{self.service_name}]: CLOSED → OPEN (failures: {self._failure_count})")


# ─── 使用例 ───
inventory_cb = CircuitBreaker(
    service_name="inventory-service",
    config=CircuitBreakerConfig(failure_threshold=3, timeout_duration=30)
)

async def check_inventory_with_cb(product_id: str, quantity: int):
    """サーキットブレーカー付き在庫確認"""
    return await inventory_cb.execute(
        inventory_client.check_availability,
        product_id, quantity,
        fallback={"available": False, "reason": "在庫サービス利用不可"}
    )
```

### 9.4 グレースフルデグラデーション（縮退運転）

```mermaid
flowchart TD
    REQUEST["📥 リクエスト受信"]

    CHECK_FULL["全機能が利用可能か？"]
    FULL_RESP["✅ フル機能レスポンス<br>全データを含む"]

    CHECK_CACHE["キャッシュにデータがあるか？"]
    CACHE_RESP["⚠️ キャッシュから返却<br>多少古いデータ"]

    CHECK_DEFAULT["デフォルト値で対応可能か？"]
    DEFAULT_RESP["⚠️ デフォルト値で応答<br>最低限の機能"]

    ERROR_RESP["❌ エラーレスポンス<br>503 Service Unavailable"]

    REQUEST --> CHECK_FULL
    CHECK_FULL -->|"Yes"| FULL_RESP
    CHECK_FULL -->|"No（外部サービス障害）"| CHECK_CACHE
    CHECK_CACHE -->|"Yes"| CACHE_RESP
    CHECK_CACHE -->|"No"| CHECK_DEFAULT
    CHECK_DEFAULT -->|"Yes"| DEFAULT_RESP
    CHECK_DEFAULT -->|"No"| ERROR_RESP

    style FULL_RESP fill:#27ae60,color:#fff
    style CACHE_RESP fill:#f39c12,color:#fff
    style DEFAULT_RESP fill:#e67e22,color:#fff
    style ERROR_RESP fill:#e74c3c,color:#fff
```

---

## 10. セキュリティ設計

### 10.1 マイクロサービスのセキュリティレイヤー

```mermaid
graph TD
    subgraph EXTERNAL["外部境界"]
        WAF["🛡️ WAF<br>Web Application Firewall"]
        DDOS["🔥 DDoS Protection<br>CloudFlare / AWS Shield"]
    end

    subgraph GW_SEC["APIゲートウェイレイヤー"]
        API_GW["🚪 API Gateway"]
        AUTHN["🔑 認証<br>JWT / OAuth2 / API Key"]
        AUTHZ["🛡️ 認可<br>スコープ・ロール検証"]
        RATE_LIMIT["⏱️ レート制限"]
        SSL_TERM["🔐 TLS終端"]
    end

    subgraph SVC_SEC["サービス間通信セキュリティ"]
        MTLS["🔏 mTLS<br>相互TLS認証<br>（Istio / Linkerd）"]
        ZERO_TRUST["🚫 ゼロトラスト<br>すべての通信を検証"]
    end

    subgraph DATA_SEC["データセキュリティ"]
        ENCRYPT["🔐 保存時暗号化<br>AES-256"]
        TRANSIT["🔐 転送時暗号化<br>TLS 1.3"]
        SECRET["🔑 シークレット管理<br>Vault / AWS Secrets Manager"]
    end

    EXTERNAL --> GW_SEC --> SVC_SEC --> DATA_SEC

    style WAF fill:#e74c3c,color:#fff
    style MTLS fill:#3498db,color:#fff
    style SECRET fill:#8e44ad,color:#fff
```

### 10.2 JWT認証の実装例（Python FastAPI）

```python
from fastapi import FastAPI, Depends, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from pydantic import BaseModel
from typing import Optional
import os
import logging


# ─── JWT設定 ───

# 公開鍵を環境変数またはファイルから読み込む（本番ではRS256必須）
JWT_PUBLIC_KEY = os.getenv("JWT_PUBLIC_KEY")
JWT_ALGORITHM = "RS256"

if not JWT_PUBLIC_KEY:
    # 起動時に公開鍵の存在をチェック（Fail-Fast）
    raise RuntimeError("JWT_PUBLIC_KEY が設定されていません。")

logger = logging.getLogger(__name__)

security = HTTPBearer()

class TokenData(BaseModel):
    sub: str           # ユーザーID
    email: str
    roles: list[str]
    service: Optional[str] = None  # サービス間通信用


def verify_jwt_token(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -> TokenData:
    """JWTトークンの検証（非対称鍵 RS256 を使用）"""
    token = credentials.credentials
    try:
        payload = jwt.decode(
            token,
            JWT_PUBLIC_KEY,
            algorithms=[JWT_ALGORITHM],
            options={"verify_exp": True}
        )
        return TokenData(**payload)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="トークンの有効期限切れ")
    except jwt.InvalidTokenError as e:
        logger.error(f"JWT検証失敗: {str(e)}")
        raise HTTPException(status_code=401, detail="認証に失敗しました")


def require_role(required_role: str):
    """ロールベースアクセス制御（RBAC）デコレーター"""
    def role_checker(token_data: TokenData = Depends(verify_jwt_token)):
        if required_role not in token_data.roles:
            raise HTTPException(
                status_code=403,
                detail=f"権限がありません。必要なロール: {required_role}"
            )
        return token_data
    return role_checker


# ─── サービス間通信用のサービストークン ───

def verify_service_token(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -> TokenData:
    """サービス間通信の認証（サービスアカウント用）"""
    token_data = verify_jwt_token(credentials)
    if not token_data.service:
        raise HTTPException(status_code=403, detail="サービスアカウントが必要です")
    return token_data


# ─── APIエンドポイントへの適用 ───

app = FastAPI()

@app.post("/orders", status_code=201)
async def create_order(
    order_data: dict,
    current_user: TokenData = Depends(verify_jwt_token)
):
    """注文作成（認証が必要）"""
    return {"order_id": "order_123", "customer_id": current_user.sub}


@app.delete("/orders/{order_id}")
async def delete_order(
    order_id: str,
    admin_user: TokenData = Depends(require_role("admin"))
):
    """注文削除（admin権限が必要）"""
    return {"deleted": order_id}


@app.get("/internal/orders/{order_id}")
async def get_order_internal(
    order_id: str,
    service: TokenData = Depends(verify_service_token)
):
    """サービス間通信用内部エンドポイント"""
    return {"order_id": order_id, "called_by": service.service}
```

---

## 11. CI/CDパイプラインと独立デプロイ

### 11.1 マイクロサービスのCI/CDフロー

```mermaid
flowchart TD
    DEV["👨‍💻 開発者<br>コードをプッシュ"]

    subgraph CI["🔄 継続的インテグレーション（CI）"]
        LINT["📝 Linting<br>コード品質チェック"]
        UNIT["🧪 Unit Tests<br>ユニットテスト"]
        INTEGRATION["🔗 Integration Tests<br>統合テスト"]
        CONTRACT["📋 Contract Tests<br>API契約テスト（Pact）"]
        BUILD["🏗️ Docker Build<br>コンテナイメージ作成"]
        SCAN["🔍 Security Scan<br>脆弱性スキャン（Trivy）"]
        PUSH["📤 Registry Push<br>コンテナレジストリに保存"]
    end

    subgraph CD["🚀 継続的デリバリー（CD）"]
        STAGING["🧪 Staging Deploy<br>ステージング環境にデプロイ"]
        E2E["🌐 E2E Tests<br>E2Eテスト実行"]
        CANARY["🐦 Canary Deploy<br>10%のトラフィックを新版へ"]
        MONITOR_CANARY["📊 Canary Monitoring<br>エラー率・レイテンシ監視"]
        FULL_DEPLOY["✅ Full Deploy<br>100%切り替え"]
        ROLLBACK["↩️ Rollback<br>問題時は自動ロールバック"]
    end

    DEV --> LINT --> UNIT --> INTEGRATION --> CONTRACT --> BUILD --> SCAN --> PUSH
    PUSH --> STAGING --> E2E --> CANARY --> MONITOR_CANARY
    MONITOR_CANARY -->|"正常"| FULL_DEPLOY
    MONITOR_CANARY -->|"異常検知"| ROLLBACK

    style CI fill:#ebf5fb
    style CD fill:#eafaf1
    style ROLLBACK fill:#fde8e8
    style FULL_DEPLOY fill:#e8fde8
```

### 11.2 GitHub Actions CI/CDパイプライン例

```yaml
# .github/workflows/order-service.yml

name: Order Service CI/CD

on:
  push:
    branches: [main]
    paths: ['services/order-service/**']
  pull_request:
    paths: ['services/order-service/**']

env:
  SERVICE_NAME: order-service
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}/order-service

jobs:
  # ─── テストジョブ ───
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          cd services/order-service
          pip install -r requirements.txt

      - name: Lint check
        run: |
          cd services/order-service
          ruff check .
          mypy .

      - name: Run unit tests
        run: |
          cd services/order-service
          pytest tests/unit/ -v --cov=. --cov-report=xml

      - name: Run integration tests
        run: |
          cd services/order-service
          pytest tests/integration/ -v
        env:
          DATABASE_URL: postgresql://test:test@localhost/test_db

      - name: Run contract tests (Pact)
        run: |
          cd services/order-service
          pytest tests/contract/ -v

  # ─── ビルド&プッシュジョブ ───
  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}
      image-digest: ${{ steps.build.outputs.digest }}

    steps:
      - uses: actions/checkout@v4

      - name: Docker meta
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=sha-
            type=ref,event=branch

      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: services/order-service
          push: true
          tags: ${{ steps.meta.outputs.tags }}

      - name: Security scan with Trivy
        uses: aquasecurity/trivy-action@57a97c7e7821a5776cebc9bb87c984fa69cba8f1 # v0.35.0
        with:
          image-ref: ${{ steps.meta.outputs.tags }}
          severity: HIGH,CRITICAL
          exit-code: 1   # 重大な脆弱性があればパイプラインを止める

  # ─── デプロイジョブ ───
  deploy-staging:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: staging

    steps:
      - name: Deploy to Staging
        run: |
          kubectl set image deployment/order-service \
            order-service=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:sha-${{ github.sha }} \
            -n staging

      - name: Wait for rollout
        run: kubectl rollout status deployment/order-service -n staging --timeout=5m

      - name: Run E2E tests against staging
        run: pytest tests/e2e/ --base-url=https://api-staging.example.com -v

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production

    steps:
      - name: Canary Deploy (10%)
        run: |
          kubectl set image deployment/order-service-canary \
            order-service=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:sha-${{ github.sha }} \
            -n production

      - name: Monitor canary for 10 minutes
        run: |
          sleep 600  # 10分監視
          # エラー率チェック（実際はPrometheus APIを使用）

      - name: Full Production Deploy
        run: |
          kubectl set image deployment/order-service \
            order-service=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:sha-${{ github.sha }} \
            -n production
```

---

## 12. コンテナ化とKubernetes

### 12.1 Dockerfileのベストプラクティス

```dockerfile
# ─── Multi-stage build でイメージを最小化 ───

# Stage 1: ビルド環境
FROM python:3.11-slim AS builder

WORKDIR /app

# 依存関係を先にコピー（キャッシュ最適化）
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: 実行環境（最小イメージ）
FROM python:3.11-slim AS runtime

# セキュリティ：非rootユーザーで実行
RUN addgroup --system appgroup && adduser --system --group appuser

WORKDIR /app

# ビルド環境から依存関係のみコピー
COPY --from=builder /root/.local /home/appuser/.local

# アプリケーションコードをコピー
COPY --chown=appuser:appgroup . .

# 非rootユーザーに切り替え
USER appuser

# ヘルスチェック設定
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8001/health')" || exit 1

# ポート公開
EXPOSE 8001

# アプリケーション起動
ENV PATH=/home/appuser/.local/bin:$PATH

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--workers", "4"]
```

### 12.2 Kubernetesリソース構成の全体像

```mermaid
graph TD
    subgraph K8S_CLUSTER["☸️ Kubernetesクラスター"]
        subgraph NAMESPACE_PROD["namespace: production"]
            subgraph DEPLOY["Deployments"]
                D1["order-service<br>replicas: 3"]
                D2["inventory-service<br>replicas: 2"]
                D3["payment-service<br>replicas: 3"]
            end

            subgraph SERVICES["Services（内部LB）"]
                S1["order-service:80"]
                S2["inventory-service:80"]
                S3["payment-service:80"]
            end

            subgraph CONFIG["設定管理"]
                CM["ConfigMap<br>アプリ設定"]
                SEC["Secret<br>認証情報（暗号化）"]
            end

            subgraph HPA_["自動スケール"]
                HPA1["HPA: order-service<br>min:2 max:20"]
                HPA2["HPA: inventory-service<br>min:2 max:10"]
            end
        end

        subgraph INGRESS_LAYER["Ingress Layer"]
            ING["Ingress Controller<br>Nginx / Traefik"]
            CERT["Cert-Manager<br>SSL証明書自動更新"]
        end

        subgraph STORAGE["永続化ストレージ"]
            PVC["PersistentVolumeClaims"]
            PV["PersistentVolumes"]
        end
    end

    INTERNET["🌐 インターネット"] --> ING
    ING --> S1 & S2 & S3
    S1 --> D1
    S2 --> D2
    S3 --> D3
    D1 & D2 & D3 --> CM & SEC
    HPA1 --> D1
    HPA2 --> D2

    style K8S_CLUSTER fill:#f0f8ff
    style DEPLOY fill:#e8f5e9
    style INGRESS_LAYER fill:#fff3e0
    style HPA_ fill:#f3e5f5
```

---

## 13. 監視・オブザーバビリティ

### 13.1 オブザーバビリティの3本柱

```mermaid
graph TD
    OBS["🔭 オブザーバビリティ（可観測性）"]

    OBS --> METRICS["📊 メトリクス（Metrics）<br>数値で状態を把握<br>ツール：Prometheus + Grafana"]
    OBS --> LOGS["📝 ログ（Logs）<br>イベントの詳細記録<br>ツール：ELK Stack / Loki"]
    OBS --> TRACES["🔗 トレース（Traces）<br>リクエストの流れを追跡<br>ツール：Jaeger / Zipkin / Tempo"]

    METRICS --> M_ITEMS["・リクエストレート（RPS）<br>・エラーレート（%）<br>・レイテンシ（P50/P95/P99）<br>・リソース使用率（CPU/Memory）<br>・ビジネスメトリクス（注文数など）"]

    LOGS --> L_ITEMS["・構造化ログ（JSON形式）<br>・ログレベル（DEBUG/INFO/ERROR）<br>・相関ID（Correlation ID）<br>・トレースIDとの紐付け"]

    TRACES --> T_ITEMS["・分散トレーシング<br>・スパン（Span）の連鎖<br>・レイテンシのボトルネック特定<br>・サービス依存関係の可視化"]

    style METRICS fill:#3498db,color:#fff
    style LOGS fill:#27ae60,color:#fff
    style TRACES fill:#8e44ad,color:#fff
```

### 13.2 SLI/SLO/SLAの定義

```mermaid
graph LR
    subgraph "指標の階層"
        SLI["📏 SLI<br>Service Level Indicator<br>実際に計測する指標<br>例：過去5分のエラー率 = 0.1%"]
        SLO["🎯 SLO<br>Service Level Objective<br>達成目標値<br>例：エラー率 < 0.1% を99.9%の時間で"]
        SLA["📋 SLA<br>Service Level Agreement<br>顧客との合意・契約<br>例：月次99.9%可用性を保証"]
    end

    SLI --> |"計測結果が"| SLO
    SLO --> |"外部公約として"| SLA

    subgraph "4つのゴールデンシグナル（Google SRE）"
        GS1["⚡ レイテンシ<br>リクエストの処理時間<br>P99 < 500ms"]
        GS2["📈 トラフィック<br>リクエスト数/秒<br>現在のシステム負荷"]
        GS3["❌ エラー率<br>失敗リクエストの割合<br>5xx < 0.1%"]
        GS4["🔥 飽和度<br>システムリソースの使用率<br>CPU < 80%"]
    end

    style SLI fill:#3498db,color:#fff
    style SLO fill:#27ae60,color:#fff
    style SLA fill:#8e44ad,color:#fff
```

### 13.3 分散トレーシングの実装

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.httpx import HTTPXClientInstrumentor
from opentelemetry.propagate import inject, extract
import structlog

# ─── OpenTelemetry 設定 ───

def setup_tracing(service_name: str):
    """分散トレーシングの初期化"""
    # OTLPエクスポーター設定
    otlp_exporter = OTLPSpanExporter(
        endpoint="http://otel-collector:4317",
        insecure=True,
    )

    provider = TracerProvider()
    provider.add_span_processor(BatchSpanProcessor(otlp_exporter))
    trace.set_tracer_provider(provider)

    # FastAPIとHTTPXの自動計装
    FastAPIInstrumentor().instrument()
    HTTPXClientInstrumentor().instrument()

    return trace.get_tracer(service_name)


tracer = setup_tracing("order-service")


# ─── 構造化ログ（Correlation ID付き）───

structlog.configure(
    processors=[
        structlog.stdlib.add_log_level,
        structlog.stdlib.add_logger_name,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),
    ]
)
logger = structlog.get_logger()


# ─── ビジネスロジックでのトレーシング ───

class OrderService:
    async def create_order(self, customer_id: str, items: list) -> dict:
        """注文作成（トレーシング付き）"""
        with tracer.start_as_current_span("create-order") as span:
            # スパンに属性を追加
            span.set_attribute("customer.id", customer_id)
            span.set_attribute("order.item_count", len(items))

            logger.info(
                "注文作成開始",
                customer_id=customer_id,
                item_count=len(items),
                trace_id=format(span.get_span_context().trace_id, "032x")
            )

            # 在庫チェックのサブスパン
            with tracer.start_as_current_span("check-inventory"):
                inventory_result = await self._check_inventory(items)

            # 決済処理のサブスパン
            with tracer.start_as_current_span("process-payment"):
                payment_result = await self._process_payment(customer_id, items)

            order = {"order_id": "order_123", "status": "confirmed"}
            span.set_attribute("order.id", order["order_id"])

            logger.info("注文作成完了", order_id=order["order_id"])
            return order
```

### 13.4 Grafanaダッシュボードの構成

```mermaid
graph TD
    subgraph GRAFANA["📊 Grafana ダッシュボード"]
        subgraph OVERVIEW["サービス概要"]
            RPS["リクエスト数/秒"]
            ERROR_RATE["エラー率 (%)"]
            P99["P99 レイテンシ (ms)"]
            UPTIME["稼働率 (%)"]
        end

        subgraph SERVICE["サービス別メトリクス"]
            SVC_CHART["サービスごとの<br>レスポンスタイム比較"]
            DEP_MAP["サービス依存関係マップ"]
        end

        subgraph INFRA["インフラメトリクス"]
            CPU["CPU使用率"]
            MEM["メモリ使用率"]
            POD_COUNT["Podの数<br>(スケール状況)"]
        end

        subgraph ALERTS["アラート設定"]
            A1["🔴 エラー率 > 1% → PagerDuty"]
            A2["🟡 P99 > 2秒 → Slack"]
            A3["🔴 Pod数が最小値以下 → PagerDuty"]
        end
    end

    PROM["Prometheus<br>メトリクス収集"] --> OVERVIEW & SERVICE & INFRA
    OVERVIEW & SERVICE & INFRA --> ALERTS

    style GRAFANA fill:#1a1a2e,color:#fff
    style ALERTS fill:#e74c3c,color:#fff
```

---

## 14. 実践：ECサイト完全事例

### 14.1 システム全体アーキテクチャ

```mermaid
graph TD
    subgraph CLIENTS["クライアント層"]
        WEB_APP["🌐 Web App<br>(React)"]
        IOS_APP["📱 iOS App"]
        ANDROID_APP["🤖 Android App"]
        PARTNER_SYS["🤝 パートナーシステム"]
    end

    subgraph EDGE["エッジ層"]
        CDN["☁️ CDN<br>(CloudFront)"]
        WAF2["🛡️ WAF"]
        LB["⚖️ Load Balancer"]
    end

    subgraph GW_LAYER["APIゲートウェイ層"]
        API_GW["🚪 API Gateway<br>(Kong)"]
        WEB_BFF_SVC["Web BFF"]
        MOB_BFF_SVC["Mobile BFF"]
    end

    subgraph CORE_SERVICES["コアサービス群"]
        ORDER_SVC["📦 注文サービス<br>Python+FastAPI"]
        INVENTORY_SVC["🏭 在庫サービス<br>Go+Gin"]
        PAYMENT_SVC["💳 決済サービス<br>Java+Spring"]
        USER_SVC["👤 ユーザーサービス<br>Node.js+Express"]
        CATALOG_SVC["🛍️ 商品カタログサービス<br>Node.js+Express"]
        SEARCH_SVC["🔍 検索サービス<br>Python+FastAPI"]
    end

    subgraph SUPPORT_SERVICES["サポートサービス群"]
        NOTIFY_SVC["📧 通知サービス<br>Python+Celery"]
        REVIEW_SVC["⭐ レビューサービス<br>Ruby+Rails"]
        RECOMMEND_SVC["🎯 レコメンドサービス<br>Python+ML"]
        SHIPPING_SVC["🚚 配送サービス<br>Go+Gin"]
    end

    subgraph MESSAGING["メッセージング層"]
        KAFKA2["🔶 Apache Kafka<br>イベントバス"]
    end

    subgraph DATASTORES["データストア層"]
        PG_ORDER[("注文DB<br>PostgreSQL")]
        MONGO_INV[("在庫DB<br>MongoDB")]
        PG_PAY[("決済DB<br>PostgreSQL")]
        MYSQL_USER[("ユーザーDB<br>MySQL")]
        ES_CATALOG[("商品DB<br>Elasticsearch")]
        REDIS_CACHE["⚡ キャッシュ<br>Redis Cluster"]
    end

    WEB_APP & IOS_APP & ANDROID_APP --> CDN --> WAF2 --> LB --> API_GW
    PARTNER_SYS --> API_GW
    API_GW --> WEB_BFF_SVC & MOB_BFF_SVC
    WEB_BFF_SVC & MOB_BFF_SVC --> CORE_SERVICES

    CORE_SERVICES --> KAFKA2
    KAFKA2 --> SUPPORT_SERVICES

    ORDER_SVC --> PG_ORDER
    INVENTORY_SVC --> MONGO_INV
    PAYMENT_SVC --> PG_PAY
    USER_SVC --> MYSQL_USER
    CATALOG_SVC & SEARCH_SVC --> ES_CATALOG
    CORE_SERVICES --> REDIS_CACHE

    style GW_LAYER fill:#f39c12,color:#fff
    style CORE_SERVICES fill:#3498db,color:#fff
    style SUPPORT_SERVICES fill:#27ae60,color:#fff
    style MESSAGING fill:#e74c3c,color:#fff
```

### 14.2 注文処理の完全フロー

```mermaid
sequenceDiagram
    participant USER as ユーザー
    participant GW2 as API Gateway
    participant ORDER2 as 注文サービス
    participant INVENTORY2 as 在庫サービス
    participant PAYMENT2 as 決済サービス
    participant KAFKA3 as Kafka
    participant NOTIFY2 as 通知サービス
    participant SHIPPING2 as 配送サービス

    USER->>GW2: POST /v1/orders<br>（カート情報・配送先）
    GW2->>GW2: JWT認証・レート制限チェック
    GW2->>ORDER2: 注文作成リクエスト転送

    ORDER2->>INVENTORY2: 在庫確認（同期gRPC）
    INVENTORY2-->>ORDER2: 在庫あり ✅

    ORDER2->>ORDER2: 注文レコード作成（PENDING）
    ORDER2->>PAYMENT2: 決済処理（同期REST）
    PAYMENT2-->>ORDER2: 決済成功 ✅

    ORDER2->>ORDER2: 注文確定（CONFIRMED）
    ORDER2-->>GW2: 201 Created {order_id}
    GW2-->>USER: 201 Created（即座に返却）

    Note over ORDER2,SHIPPING2: ここから非同期処理

    ORDER2--)KAFKA3: OrderConfirmedEvent
    par 並行非同期処理
        KAFKA3--)NOTIFY2: OrderConfirmedEvent
        NOTIFY2->>USER: 注文確認メール送信 📧

        KAFKA3--)INVENTORY2: OrderConfirmedEvent
        INVENTORY2->>INVENTORY2: 在庫引き当て確定

        KAFKA3--)SHIPPING2: OrderConfirmedEvent
        SHIPPING2->>SHIPPING2: 配送指示作成
        SHIPPING2--)KAFKA3: ShipmentCreatedEvent
    end

    KAFKA3--)ORDER2: ShipmentCreatedEvent
    ORDER2->>ORDER2: 注文ステータス更新（SHIPPED）
```

---

## 15. 段階的移行戦略（モノリスからの移行）

### 15.1 移行の4ステージ

```mermaid
flowchart TD
    subgraph S1["Stage 1: 現状分析・準備"]
        A1["📊 モノリスの機能マッピング<br>（全機能をリスト化）"]
        A2["🔍 依存関係の分析<br>（どの機能が密結合か）"]
        A3["📏 ドメイン境界の定義<br>（DDDでBounded Contextを特定）"]
        A4["🏗️ 基盤整備<br>（CI/CD・コンテナ化・監視）"]
    end

    subgraph S2["Stage 2: 低リスクサービスの分離"]
        B1["🔆 新規機能をマイクロサービスとして開発"]
        B2["🍃 Strangler Figパターンで段階移行"]
        B3["📧 通知・メール送信などを先に分離<br>（副作用が少ない機能から）"]
    end

    subgraph S3["Stage 3: コアサービスの分離"]
        C1["👤 ユーザー認証サービスの分離"]
        C2["🛍️ 商品カタログサービスの分離"]
        C3["📦 注文サービスの分離"]
        C4["💳 決済サービスの分離"]
    end

    subgraph S4["Stage 4: モノリスの解体完了"]
        D1["🏭 在庫・物流サービスの分離"]
        D2["🔍 検索・レコメンドサービスの分離"]
        D3["🗑️ モノリスの廃止"]
        D4["📊 全サービスの最適化"]
    end

    S1 --> S2 --> S3 --> S4

    style S1 fill:#ebf5fb
    style S2 fill:#eafaf1
    style S3 fill:#fef9e7
    style S4 fill:#fde8e8
```

### 15.2 移行時のデータ分離戦略

```mermaid
flowchart LR
    subgraph PHASE_1["フェーズ1: 同じDB・コード分離"]
        APP_1["新しいサービス<br>（コード分離済み）"]
        SHARED_1[("共有DB<br>（まだ共有）")]
        MON_1["モノリス<br>（縮小中）"]
        APP_1 --> SHARED_1
        MON_1 --> SHARED_1
    end

    subgraph PHASE_2["フェーズ2: スキーマ分離"]
        APP_2["新しいサービス"]
        SCHEMA_A[("スキーマA<br>（専用）")]
        SCHEMA_B[("スキーマB<br>（モノリス用）")]
        MON_2["モノリス"]
        APP_2 --> SCHEMA_A
        MON_2 --> SCHEMA_B
        NOTE["同じDBサーバー<br>スキーマのみ分離"]
    end

    subgraph PHASE_3["フェーズ3: DB完全分離"]
        APP_3["マイクロサービス"]
        DB_3[("専用DB<br>（独立）")]
        APP_3 --> DB_3
    end

    PHASE_1 --> PHASE_2 --> PHASE_3

    style PHASE_1 fill:#fde8e8
    style PHASE_2 fill:#fef9e7
    style PHASE_3 fill:#e8fde8
```

### 15.3 移行ロードマップ（タイムライン）

```mermaid
gantt
    title モノリスからマイクロサービスへの移行ロードマップ
    dateFormat  YYYY-MM-DD
    section Stage 1: 基盤整備
        現状分析・ドメイン境界定義       :s1a, 2025-01-01, 30d
        CI/CD・Docker・Kubernetes整備    :s1b, after s1a, 30d
        監視基盤（Prometheus/Grafana）    :s1c, after s1a, 20d
    section Stage 2: 低リスク分離
        通知サービス分離                  :s2a, after s1b, 21d
        メール送信サービス分離            :s2b, after s2a, 14d
        検索サービス分離                  :s2c, after s2b, 21d
    section Stage 3: コア分離
        ユーザーサービス分離              :s3a, after s2c, 30d
        商品カタログサービス分離          :s3b, after s3a, 30d
        注文サービス分離                  :s3c, after s3b, 45d
        決済サービス分離                  :s3d, after s3c, 30d
    section Stage 4: 完了
        在庫サービス分離                  :s4a, after s3d, 30d
        モノリス廃止・最適化              :s4b, after s4a, 30d
```

---

## 16. ベストプラクティス総まとめ

### 16.1 設計フェーズのベストプラクティス

| カテゴリ | ベストプラクティス | 理由 |
|---------|----------------|------|
| **分割単位** | DDDのBounded Contextに沿って分割 | ビジネス境界が明確になる |
| **サイズ** | 1チーム（5〜8人）が所有できる規模 | Conway's Lawに従った組織設計 |
| **DB** | サービスごとに独立したDBを持つ | データの独立性・スケーラビリティ |
| **通信** | デフォルトは非同期（Kafka/SQS） | 疎結合・耐障害性の向上 |
| **API** | APIゲートウェイ経由でのみ公開 | セキュリティ・可視性の確保 |
| **設定** | 環境変数で外部注入（12-Factor App） | 環境間の差異を最小化 |

### 16.2 運用フェーズのベストプラクティス

```mermaid
mindmap
    root((マイクロサービス<br>運用ベストプラクティス))
        デプロイ戦略
            ブルーグリーンデプロイ
            カナリアデプロイ
            フィーチャーフラグ活用
            自動ロールバック設定
        障害対策
            すべての依存にタイムアウト設定
            サーキットブレーカー必須
            DLQ（デッドレターキュー）設定
            カオスエンジニアリング実施
        監視・アラート
            SLO基準のアラート設定
            P99レイテンシの監視
            ビジネスメトリクスの監視
            オンコール体制の整備
        セキュリティ
            定期的な脆弱性スキャン
            シークレットローテーション
            ゼロトラストネットワーク
            監査ログの保存
```

### 16.3 マイクロサービス成熟度モデル

```mermaid
graph TD
    LV0["Level 0: モノリス<br>単一デプロイメントの大きなアプリ"]
    LV1["Level 1: モジュラーモノリス<br>コードは分離されているがデプロイは一括"]
    LV2["Level 2: 基本的なマイクロサービス<br>サービスは分離、DBは分離、独立デプロイ可能"]
    LV3["Level 3: イベント駆動マイクロサービス<br>Kafkaによる非同期通信・疎結合を実現"]
    LV4["Level 4: クラウドネイティブ<br>Kubernetes・サービスメッシュ・完全自動化"]
    LV5["Level 5: プラットフォームエンジニアリング<br>内部開発者プラットフォーム・セルフサービス基盤"]

    LV0 --> LV1 --> LV2 --> LV3 --> LV4 --> LV5

    style LV0 fill:#e74c3c,color:#fff
    style LV1 fill:#e67e22,color:#fff
    style LV2 fill:#f39c12,color:#fff
    style LV3 fill:#27ae60,color:#fff
    style LV4 fill:#3498db,color:#fff
    style LV5 fill:#8e44ad,color:#fff
```

---

## 17. アンチパターン

### 17.1 主要なアンチパターン

```mermaid
graph TD
    subgraph "❌ Anti-Pattern 1: Distributed Monolith（分散モノリス）"
        A1["見た目はマイクロサービスだが<br>サービス間が密結合<br>→ デプロイを常に一緒にしないと動かない"]
        A1_FIX["解決：Contract Testで独立性を保証<br>サービス間はAPIのみで通信<br>共有DBを排除する"]
    end

    subgraph "❌ Anti-Pattern 2: Chatty Services（過剰な通信）"
        A2["1つのリクエストに対して<br>サービス間で大量の同期通信が発生<br>→ レイテンシ増大・カスケード障害"]
        A2_FIX["解決：BFFパターンでデータを集約<br>非同期通信への移行<br>キャッシュの活用"]
    end

    subgraph "❌ Anti-Pattern 3: Shared Database（共有DB）"
        A3["複数のサービスが同じDBテーブルに<br>直接アクセスしている<br>→ 独立デプロイができない"]
        A3_FIX["解決：DB per Service パターン<br>サービス間はAPIのみで通信<br>データはイベントで同期"]
    end

    subgraph "❌ Anti-Pattern 4: Nano Services（ナノサービス）"
        A4["過度に細かく分割されたサービス<br>1つの機能に10のサービスが必要<br>→ 運用コストが爆発的に増大"]
        A4_FIX["解決：ビジネス機能単位で再統合<br>チームが所有できる規模を基準に<br>モジュラーモノリスへ戻すことも検討"]
    end

    subgraph "❌ Anti-Pattern 5: No Observability（監視なし）"
        A5["ログ・メトリクス・トレーシングが<br>整備されていない<br>→ 障害時の原因特定が不可能"]
        A5_FIX["解決：OpenTelemetry標準の採用<br>構造化ログ+分散トレーシング<br>SLOベースのアラート設定"]
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

### 17.2 アンチパターン健全性チェックフロー

```mermaid
flowchart TD
    CHECK["マイクロサービスの健全性チェック"]

    Q1{"各サービスが独立して<br>デプロイできるか？"}
    Q2{"サービスが直接他サービスの<br>DBにアクセスしていないか？"}
    Q3{"1つのリクエストの処理に<br>5つ以上の同期通信があるか？"}
    Q4{"1チームで<br>所有・運用できるか？"}
    Q5{"ログ・メトリクス・トレーシングが<br>整備されているか？"}

    FIX1["🔧 疎結合を強化する<br>Contract Testを導入する"]
    FIX2["🔧 DB per Serviceパターンに移行<br>APIのみで通信する"]
    FIX3["🔧 BFFまたは集約レイヤーを導入<br>非同期通信への切り替えを検討"]
    FIX4["🔧 サービスを統合・再編成<br>チーム規模に合わせた分割に戻す"]
    FIX5["🔧 OpenTelemetryを導入<br>Prometheus+Grafana+Jaegerを構築"]
    HEALTHY["✅ 健全なマイクロサービス"]

    CHECK --> Q1
    Q1 -->|"No"| FIX1
    Q1 -->|"Yes"| Q2
    Q2 -->|"No（直接アクセスあり）"| FIX2
    Q2 -->|"Yes"| Q3
    Q3 -->|"Yes（多すぎる）"| FIX3
    Q3 -->|"No"| Q4
    Q4 -->|"No（大きすぎる）"| FIX4
    Q4 -->|"Yes"| Q5
    Q5 -->|"No"| FIX5
    Q5 -->|"Yes"| HEALTHY

    style HEALTHY fill:#27ae60,color:#fff
    style FIX1 fill:#3498db,color:#fff
    style FIX2 fill:#3498db,color:#fff
    style FIX3 fill:#3498db,color:#fff
    style FIX4 fill:#3498db,color:#fff
    style FIX5 fill:#3498db,color:#fff
```

---

## 18. 参考文献・ソース一覧

### 📚 必読書籍

| タイトル | 著者 | 難易度 | 内容 |
|---------|------|--------|------|
| **Building Microservices（第2版）** | Sam Newman | ★★★★☆ | マイクロサービスの決定版バイブル |
| **Microservices Patterns** | Chris Richardson | ★★★★☆ | 実践的なマイクロサービスパターン集 |
| **Designing Distributed Systems** | Brendan Burns | ★★★★☆ | 分散システム設計パターン（無料PDF） |
| **Release It!（第2版）** | Michael T. Nygard | ★★★★☆ | 本番環境対応の設計・障害耐性 |
| **Cloud Native Patterns** | Cornelia Davis | ★★★☆☆ | クラウドネイティブアプリの設計 |
| **The DevOps Handbook** | Gene Kim, Patrick Debois他 | ★★★☆☆ | CI/CDとデプロイ戦略 |

### 🌐 公式ドキュメント・URL

#### マイクロサービスコア概念

| リソース | URL |
|---------|-----|
| **Microservices（Martin Fowler 原文）** | https://martinfowler.com/articles/microservices.html |
| **Microservice Trade-Offs（Martin Fowler）** | https://martinfowler.com/articles/microservice-trade-offs.html |
| **Strangler Fig Pattern** | https://martinfowler.com/bliki/StranglerFigApplication.html |
| **Saga Pattern（Chris Richardson）** | https://microservices.io/patterns/data/saga.html |
| **microservices.io（パターン集）** | https://microservices.io/ |
| **Database per Service Pattern** | https://microservices.io/patterns/data/database-per-service.html |

#### 設計パターン・アーキテクチャ

| リソース | URL |
|---------|-----|
| **CQRS（Martin Fowler）** | https://martinfowler.com/bliki/CQRS.html |
| **Event Sourcing（Martin Fowler）** | https://martinfowler.com/eaaDev/EventSourcing.html |
| **Circuit Breaker（Martin Fowler）** | https://martinfowler.com/bliki/CircuitBreaker.html |
| **API Gateway Pattern** | https://microservices.io/patterns/apigateway.html |
| **BFF Pattern** | https://samnewman.io/patterns/architectural/bff/ |
| **Twelve-Factor App** | https://12factor.net/ |

#### Kubernetes・コンテナ

| リソース | URL |
|---------|-----|
| **Kubernetes 公式ドキュメント** | https://kubernetes.io/docs/ |
| **Kubernetes Patterns（O'Reilly）** | https://www.oreilly.com/library/view/kubernetes-patterns/9781492050278/ |
| **Istio サービスメッシュ** | https://istio.io/latest/docs/ |
| **CNCF（Cloud Native Computing Foundation）** | https://www.cncf.io/ |
| **Docker 公式ドキュメント** | https://docs.docker.com/ |

#### メッセージング・イベント

| リソース | URL |
|---------|-----|
| **Apache Kafka 公式** | https://kafka.apache.org/documentation/ |
| **RabbitMQ 公式** | https://www.rabbitmq.com/documentation.html |
| **CloudEvents 仕様（CNCF）** | https://cloudevents.io/ |
| **Enterprise Integration Patterns** | https://www.enterpriseintegrationpatterns.com/ |

#### 監視・オブザーバビリティ

| リソース | URL |
|---------|-----|
| **OpenTelemetry 公式** | https://opentelemetry.io/ |
| **Prometheus 公式** | https://prometheus.io/docs/ |
| **Grafana 公式** | https://grafana.com/docs/ |
| **Jaeger 分散トレーシング** | https://www.jaegertracing.io/ |
| **Google SRE Book（無料）** | https://sre.google/sre-book/table-of-contents/ |

#### セキュリティ

| リソース | URL |
|---------|-----|
| **OWASP Microservices Security** | https://owasp.org/www-project-api-security/ |
| **Zero Trust Architecture（NIST）** | https://www.nist.gov/publications/zero-trust-architecture |
| **HashiCorp Vault（シークレット管理）** | https://www.vaultproject.io/ |

#### 学習リソース

| リソース | URL |
|---------|-----|
| **Microservices.io（Chris Richardson）** | https://microservices.io/ |
| **AWS マイクロサービス解説** | https://aws.amazon.com/microservices/ |
| **Google Cloud マイクロサービス** | https://cloud.google.com/learn/what-is-microservices-architecture |
| **Netflix Tech Blog** | https://netflixtechblog.com/tagged/architecture |

---

> 📅 最終更新日: 2026-04-17（本ドキュメントは当時の情報に基づいて作成されています）。各ツール・フレームワークのバージョンや仕様は変更される場合があります。実装前に必ず公式ドキュメントをご確認ください。

---

*作成者：Software Architect Guide | バージョン 1.0 | Microservices Complete Guide*
