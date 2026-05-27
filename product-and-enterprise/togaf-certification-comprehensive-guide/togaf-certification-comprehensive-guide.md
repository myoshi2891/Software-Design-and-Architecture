# 🏛️ TOGAF 完全試験ガイド

## 📚 目次

1. [TOGAFとは何か？](#1-togafとは何か)
2. [試験の種類と概要](#2-試験の種類と概要)
3. [ADM（アーキテクチャ開発手法）完全解説](#3-adm完全解説)
4. [アーキテクチャドメイン（BDAT）](#4-アーキテクチャドメインbdat)
5. [エンタープライズアーキテクチャの構成要素](#5-エンタープライズアーキテクチャの構成要素)
6. [アーキテクチャリポジトリ](#6-アーキテクチャリポジトリ)
7. [ステークホルダーマネジメント](#7-ステークホルダーマネジメント)
8. [ガバナンスとコンプライアンス](#8-ガバナンスとコンプライアンス)
9. [試験対策・ベストプラクティス](#9-試験対策ベストプラクティス)
10. [学習ロードマップ（7週間プラン）](#10-学習ロードマップ7週間プラン)
11. [参考文献・公式ソース](#11-参考文献公式ソース)

---

## 1. TOGAFとは何か？

### 1.1 TOGAFの定義

**TOGAF（The Open Group Architecture Framework）** は、The Open Groupが策定・維持する**エンタープライズアーキテクチャ（EA）のための世界標準フレームワーク**です。

> 💡 **一言で言うと：**「大企業・組織のIT戦略とビジネス戦略を整合させるための共通言語・方法論」

### 1.2 TOGAFが解決する問題

```mermaid
graph LR
    A["❌ TOGAF導入前"] --> B["IT戦略とビジネス戦略が乖離"]
    A --> C["部門間でシステムが孤立・断絶"]
    A --> D["重複投資・非効率なIT資産"]
    A --> E["変更コストが高く変化に対応困難"]

    F["✅ TOGAF導入後"] --> G["ビジネス目標に整合したIT投資"]
    F --> H["共通言語で部門横断のコミュニケーション"]
    F --> I["アーキテクチャの再利用による効率化"]
    F --> J["変化に対応できる柔軟なアーキテクチャ"]

    style A fill:#ff6b6b,color:#fff
    style F fill:#51cf66,color:#fff
```

### 1.3 TOGAFの歴史と普及

| 年 | 出来事 |
|----|--------|
| 1995 | TOGAF 1.0 リリース（TAFIM from US DoD をベースに） |
| 2002 | TOGAF 8（Enterprise Edition）リリース |
| 2009 | **TOGAF 9** リリース（現在も広く使用） |
| 2018 | TOGAF 9.2 リリース |
| 2022 | **TOGAF Standard Version 10** リリース（最新版） |
| 2023 | 認定者数：世界206カ国・**10万人以上** |

### 1.4 TOGAFの位置づけ

```mermaid
mindmap
  root((エンタープライズ<br>アーキテクチャ))
    TOGAF
      ビジネスアーキテクチャ
      データアーキテクチャ
      アプリケーションアーキテクチャ
      テクノロジーアーキテクチャ
    Zachman Framework
      分類フレームワーク
      What/How/Where/Who/When/Why
    FEAF
      米国連邦政府EA
    SABSA
      セキュリティアーキテクチャ
    ITIL
      ITサービス管理
```

---

## 2. 試験の種類と概要

### 2.1 試験レベル構造

```mermaid
graph TD
    A["🎓 TOGAF認定資格体系"] --> B["Level 1<br>TOGAF Foundation"]
    A --> C["Level 2<br>TOGAF Practitioner"]
    A --> D["Combined<br>Level 1 + Level 2<br>同時受験"]

    B --> E["TOGAFの知識・理解を証明<br>40問 / 60分 / 55%合格"]
    C --> F["TOGAFの実践・適用能力を証明<br>8問複合選択 / 90分 / 60%合格"]
    D --> G["最も効率的な取得方法<br>両レベルを1回の試験で取得"]

    style A fill:#1a1a2e,color:#fff
    style B fill:#16213e,color:#fff
    style C fill:#0f3460,color:#fff
    style D fill:#533483,color:#fff
```

### 2.2 試験詳細比較表

| 項目 | Level 1 (Foundation) | Level 2 (Practitioner) | Combined |
|------|---------------------|----------------------|---------|
| **目的** | 知識・理解の証明 | 実践・適用能力の証明 | 両レベル同時取得 |
| **問題形式** | 多肢選択（1つ選ぶ） | 複合選択（複数選択・重み付け） | 両形式 |
| **問題数** | 40問 | 8問（各12.5点） | 40問＋8問 |
| **試験時間** | 60分 | 90分 | 150分 |
| **合格基準** | 55%（22/40問） | 60%（60/100点） | 両方クリア |
| **受験料** | 約$320 USD | 約$320 USD | 約$495 USD |
| **有効期限** | **無期限** | **無期限** | 無期限 |
| **持込み** | 不可 | **公式ドキュメント持込可** | 混合 |
| **難易度** | ★★★☆☆ | ★★★★☆ | ★★★★☆ |

> ⚠️ **重要：** Level 2は公式TOGAFドキュメントの持込みが可能です。ただし時間が限られるため、知識の内在化が必要です。

### 2.3 Level 2の問題形式（複合選択）

```mermaid
flowchart LR
    A["シナリオ問題<br>（現実の状況設定）"] --> B["5つの選択肢"]
    B --> C{"回答選択"}
    C --> D["最も適切な回答<br>（5点）"]
    C --> E["2番目に適切<br>（3点）"]
    C --> F["3番目に適切<br>（1点）"]
    C --> G["不適切な回答<br>（0点）"]
    C --> H["最も不適切<br>（-1点）"]

    style D fill:#2ecc71,color:#fff
    style E fill:#f39c12,color:#fff
    style F fill:#e67e22,color:#fff
    style G fill:#e74c3c,color:#fff
    style H fill:#c0392b,color:#fff
```

---

## 3. ADM完全解説

### 3.1 ADM（Architecture Development Method）とは

ADMはTOGAFの中核となる**反復的・循環的なアーキテクチャ開発プロセス**です。

```mermaid
flowchart TD
    PRELIM["🔧 準備フェーズ<br>Preliminary Phase<br>アーキテクチャ能力の確立"]

    A["📋 フェーズA<br>Architecture Vision<br>アーキテクチャビジョン"]

    B["🏢 フェーズB<br>Business Architecture<br>ビジネスアーキテクチャ"]

    C["💾 フェーズC<br>Information Systems Architecture<br>情報システムアーキテクチャ<br>（データ＋アプリケーション）"]

    D["⚙️ フェーズD<br>Technology Architecture<br>テクノロジーアーキテクチャ"]

    E["🔍 フェーズE<br>Opportunities & Solutions<br>機会とソリューション"]

    F["📅 フェーズF<br>Migration Planning<br>移行計画"]

    G["🛡️ フェーズG<br>Implementation Governance<br>実装ガバナンス"]

    H["🔄 フェーズH<br>Architecture Change Management<br>アーキテクチャ変更管理"]

    REQ["📌 要求管理<br>Requirements Management<br>全フェーズを通じた要求の管理"]

    PRELIM --> A
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> A

    REQ -.-> A
    REQ -.-> B
    REQ -.-> C
    REQ -.-> D
    REQ -.-> E
    REQ -.-> F
    REQ -.-> G
    REQ -.-> H

    style PRELIM fill:#8e44ad,color:#fff
    style A fill:#2980b9,color:#fff
    style B fill:#27ae60,color:#fff
    style C fill:#27ae60,color:#fff
    style D fill:#27ae60,color:#fff
    style E fill:#e67e22,color:#fff
    style F fill:#e67e22,color:#fff
    style G fill:#e74c3c,color:#fff
    style H fill:#e74c3c,color:#fff
    style REQ fill:#7f8c8d,color:#fff
```

### 3.2 各フェーズの詳細解説

#### 準備フェーズ（Preliminary Phase）

```mermaid
graph LR
    subgraph "準備フェーズのアウトプット"
        A["アーキテクチャ原則の定義"]
        B["アーキテクチャフレームワークの確立"]
        C["アーキテクチャチームの組成"]
        D["ガバナンスフレームワークの確立"]
        E["組織のアーキテクチャ成熟度評価"]
    end

    subgraph "主要な作業"
        F["組織のビジネスコンテキスト理解"]
        G["既存フレームワーク・手法の確認"]
        H["TOGAFの適用範囲の定義"]
    end

    F --> A
    G --> B
    H --> C
    H --> D
    H --> E

    style A fill:#3498db,color:#fff
    style B fill:#3498db,color:#fff
    style C fill:#3498db,color:#fff
    style D fill:#3498db,color:#fff
    style E fill:#3498db,color:#fff
```

#### フェーズA：アーキテクチャビジョン

```mermaid
graph TD
    IN["📥 インプット"] --> A
    subgraph A["フェーズA: Architecture Vision"]
        B["ステークホルダーの特定"]
        C["ビジネス目標・ドライバーの確認"]
        D["スコープの定義"]
        E["制約・前提条件の把握"]
        F["Statement of Architecture Work作成"]
        B --> C --> D --> E --> F
    end
    A --> OUT["📤 アウトプット"]

    IN --> |"リクエストfor Architecture Work"| A
    OUT --> |"アーキテクチャビジョン文書"| NEXT["フェーズBへ"]
    OUT --> |"Statement of Architecture Work"| NEXT
    OUT --> |"改訂されたアーキテクチャ原則"| NEXT

    style A fill:#2980b9,color:#fff
```

#### フェーズB・C・D：3つのアーキテクチャ開発

```mermaid
graph LR
    subgraph B["📋 フェーズB：ビジネスアーキテクチャ"]
        B1["ビジネスプロセスの現状分析"]
        B2["目標ビジネスアーキテクチャの設計"]
        B3["ギャップ分析の実施"]
    end

    subgraph C["💾 フェーズC：情報システムアーキテクチャ"]
        C1["データアーキテクチャ"]
        C2["アプリケーションアーキテクチャ"]
        C3["データモデルの設計"]
        C4["アプリケーションポートフォリオ整理"]
    end

    subgraph D["⚙️ フェーズD：テクノロジーアーキテクチャ"]
        D1["インフラ現状の分析"]
        D2["目標テクノロジーアーキテクチャの設計"]
        D3["クラウド・オンプレ選定"]
    end

    B --> C --> D

    style B fill:#27ae60,color:#fff
    style C fill:#16a085,color:#fff
    style D fill:#1abc9c,color:#fff
```

#### フェーズE・F：実装計画

```mermaid
flowchart LR
    subgraph E["🔍 フェーズE：機会とソリューション"]
        E1["実装プロジェクトの特定"]
        E2["移行アーキテクチャの検討"]
        E3["ワークパッケージの定義"]
        E4["Architecture Roadmapの作成"]
        E1 --> E2 --> E3 --> E4
    end

    subgraph F["📅 フェーズF：移行計画"]
        F1["実装マイグレーション計画の策定"]
        F2["優先順位付け"]
        F3["コスト・ベネフィット分析"]
        F4["Transition Architecturesの定義"]
        F1 --> F2 --> F3 --> F4
    end

    E --> F

    style E fill:#e67e22,color:#fff
    style F fill:#d35400,color:#fff
```

#### フェーズG・H：ガバナンスと変更管理

```mermaid
flowchart LR
    subgraph G["🛡️ フェーズG：実装ガバナンス"]
        G1["実装プロジェクトのモニタリング"]
        G2["アーキテクチャコンプライアンスの確認"]
        G3["Architecture Compliance Reviewの実施"]
        G4["変更リクエストへの対応"]
    end

    subgraph H["🔄 フェーズH：変更管理"]
        H1["変更ドライバーの監視"]
        H2["アーキテクチャへの影響評価"]
        H3["フォーマル変更管理プロセス"]
        H4["次のADMサイクルへの引き継ぎ"]
    end

    G --> H
    H --> |"新しいADMサイクル開始"| NEXT["フェーズAへ戻る"]

    style G fill:#e74c3c,color:#fff
    style H fill:#c0392b,color:#fff
```

### 3.3 ADM各フェーズの入出力（試験頻出）

```mermaid
graph TD
    subgraph "準備フェーズ"
        P_IN["インプット: 組織のビジネス戦略・原則"] --> P_OUT["アウトプット: アーキテクチャ原則・ガバナンスフレームワーク"]
    end

    subgraph "フェーズA"
        A_IN["インプット: RfAW・ビジネス戦略"] --> A_OUT["アウトプット: アーキテクチャビジョン・SoAW"]
    end

    subgraph "フェーズB/C/D"
        BCD_IN["インプット: アーキテクチャビジョン・原則"] --> BCD_OUT["アウトプット: 現状AS-IS・目標TO-BEアーキテクチャ・ギャップ分析"]
    end

    subgraph "フェーズE/F"
        EF_IN["インプット: ギャップ分析・ロードマップ"] --> EF_OUT["アウトプット: 実装・移行計画・優先順位付き移行アーキテクチャ"]
    end

    subgraph "フェーズG/H"
        GH_IN["インプット: 実装・移行計画"] --> GH_OUT["アウトプット: アーキテクチャコンプライアンスレポート・変更管理記録"]
    end

    P_OUT --> A_IN
    A_OUT --> BCD_IN
    BCD_OUT --> EF_IN
    EF_OUT --> GH_IN

    style P_IN fill:#8e44ad,color:#fff
    style A_IN fill:#2980b9,color:#fff
    style BCD_IN fill:#27ae60,color:#fff
    style EF_IN fill:#e67e22,color:#fff
    style GH_IN fill:#e74c3c,color:#fff
```

### 3.4 ギャップ分析（Gap Analysis）

TOGAFの中核技術の一つ。**AS-IS（現状）**から**TO-BE（目標）**へのギャップを特定します。

```mermaid
quadrantChart
    title ギャップ分析マトリクス（アプリケーション例）
    x-axis "現状(AS-IS)なし" --> "現状(AS-IS)あり"
    y-axis "目標(TO-BE)なし" --> "目標(TO-BE)あり"
    quadrant-1 "維持・改善<br>Retain/Improve"
    quadrant-2 "新規開発<br>New Development"
    quadrant-3 "廃止<br>Retire/Eliminate"
    quadrant-4 "廃止計画<br>Phase Out"
    受注管理システム: [0.8, 0.9]
    顧客ポータル: [0.2, 0.85]
    レガシー在庫システム: [0.75, 0.2]
    古い請求システム: [0.85, 0.3]
    AIレコメンドエンジン: [0.1, 0.95]
```

---

## 4. アーキテクチャドメイン（BDAT）

### 4.1 4つのアーキテクチャドメイン

```mermaid
graph TB
    EA["🏛️ エンタープライズアーキテクチャ"] --> B["B: Business Architecture<br>ビジネスアーキテクチャ"]
    EA --> D["D: Data Architecture<br>データアーキテクチャ"]
    EA --> A["A: Application Architecture<br>アプリケーションアーキテクチャ"]
    EA --> T["T: Technology Architecture<br>テクノロジーアーキテクチャ"]

    B --> B1["ビジネスプロセス"]
    B --> B2["組織構造"]
    B --> B3["ビジネス機能・サービス"]
    B --> B4["ビジネスルール"]

    D --> D1["データエンティティ"]
    D --> D2["データモデル"]
    D --> D3["データ管理・ガバナンス"]

    A --> A1["アプリケーションコンポーネント"]
    A --> A2["アプリケーション間インタラクション"]
    A --> A3["アプリケーションポートフォリオ"]

    T --> T1["技術プラットフォーム"]
    T --> T2["ネットワーク・インフラ"]
    T --> T3["クラウド・物理基盤"]

    style B fill:#3498db,color:#fff
    style D fill:#2ecc71,color:#fff
    style A fill:#e74c3c,color:#fff
    style T fill:#f39c12,color:#fff
    style EA fill:#2c3e50,color:#fff
```

### 4.2 BDATの関係性と依存性

```mermaid
flowchart TD
    B["🏢 ビジネスアーキテクチャ<br>ビジネスニーズ・プロセス・組織"] 
    |-->|"ビジネス要件を定義"| 
    DA["💾 データアーキテクチャ<br>どんなデータが必要か"]
    
    B |-->|"機能要件を定義"| AP["📱 アプリケーションアーキテクチャ<br>どんなシステムが必要か"]
    
    DA |-->|"データストレージ要件"| T["⚙️ テクノロジーアーキテクチャ<br>どんな技術基盤が必要か"]
    
    AP |-->|"システム稼働要件"| T

    style B fill:#3498db,color:#fff
    style DA fill:#2ecc71,color:#fff
    style AP fill:#e74c3c,color:#fff
    style T fill:#f39c12,color:#fff
```

### 4.3 アーキテクチャビューとビューポイント

```mermaid
graph LR
    subgraph "ステークホルダーとビューの対応"
        CEO["CEO・役員"] --> |"関心事"| BV["ビジネスビュー<br>Business View"]
        CIO["CIO・IT部門長"] --> |"関心事"| AV["アプリケーションビュー<br>Application View"]
        CDO["CDO・データ部門"] --> |"関心事"| DV["データビュー<br>Data View"]
        CTO["CTO・インフラ部門"] --> |"関心事"| TV["テクノロジービュー<br>Technology View"]
    end

    subgraph "アーキテクチャ成果物"
        BV --> BM["ビジネスプロセスモデル<br>組織構造図"]
        AV --> AM["アプリケーションカタログ<br>統合マップ"]
        DV --> DM["データモデル<br>データフロー図"]
        TV --> TM["インフラカタログ<br>ネットワーク図"]
    end

    style CEO fill:#2c3e50,color:#fff
    style CIO fill:#2c3e50,color:#fff
    style CDO fill:#2c3e50,color:#fff
    style CTO fill:#2c3e50,color:#fff
```

---

## 5. エンタープライズアーキテクチャの構成要素

### 5.1 アーキテクチャビルディングブロック（ABB）とソリューションビルディングブロック（SBB）

```mermaid
graph TD
    subgraph "アーキテクチャビルディングブロック（ABB）"
        ABB["抽象的・技術中立的<br>例：『認証サービス』<br>例：『データウェアハウス』<br>例：『API Gateway』"]
    end

    subgraph "ソリューションビルディングブロック（SBB）"
        SBB["具体的・製品/技術指定<br>例：『AWS Cognito』<br>例：『Snowflake』<br>例：『Kong Gateway』"]
    end

    ABB --> |"具体化・実装"| SBB

    subgraph "使い分けのポイント"
        P1["ABB: アーキテクチャ設計フェーズで使用<br>ベンダー非依存の要件定義"]
        P2["SBB: 実装フェーズで使用<br>具体的な製品・技術の選定後"]
    end

    style ABB fill:#3498db,color:#fff
    style SBB fill:#e74c3c,color:#fff
```

### 5.2 アーキテクチャ原則（Architecture Principles）

```mermaid
mindmap
    root((アーキテクチャ原則))
        ビジネス原則
            プライマリは事業に奉仕する
            ITは戦略的資産である
            情報はすべての人のもの
        データ原則
            データは資産である
            データは共有される
            データはアクセス可能である
            データの信頼性を保つ
        アプリケーション原則
            技術非依存性
            使いやすさ
        テクノロジー原則
            変化への対応
            相互運用性
            セキュリティ優先
```

### 5.3 アーキテクチャ原則の構成要素（試験頻出）

```mermaid
graph LR
    P["📌 アーキテクチャ原則"] --> N["名前<br>Name<br>短く記憶しやすい名称"]
    P --> S["ステートメント<br>Statement<br>原則の1文での表現"]
    P --> R["根拠<br>Rationale<br>なぜこの原則が必要か"]
    P --> I["示唆<br>Implications<br>この原則を採用した場合の影響"]

    style P fill:#8e44ad,color:#fff
    style N fill:#3498db,color:#fff
    style S fill:#27ae60,color:#fff
    style R fill:#e67e22,color:#fff
    style I fill:#e74c3c,color:#fff
```

---

## 6. アーキテクチャリポジトリ

### 6.1 リポジトリの全体構造

```mermaid
graph TD
    AR["🗄️ アーキテクチャリポジトリ<br>Architecture Repository"] --> AL["アーキテクチャランドスケープ<br>Architecture Landscape"]
    AR --> REF["リファレンスライブラリ<br>Reference Library"]
    AR --> STAN["標準情報ベース<br>Standards Information Base"]
    AR --> CONT["ガバナンスログ<br>Governance Log"]
    AR --> CAP["アーキテクチャ能力<br>Architecture Capability"]
    AR --> SOL["ソリューションランドスケープ<br>Solution Landscape"]

    AL --> AL1["戦略アーキテクチャ<br>Strategic Architecture"]
    AL --> AL2["セグメントアーキテクチャ<br>Segment Architecture"]
    AL --> AL3["能力アーキテクチャ<br>Capability Architecture"]

    AL1 --> |"長期（5-10年）"| LT["組織全体の方向性"]
    AL2 --> |"中期（2-5年）"| MT["ビジネスエリア単位"]
    AL3 --> |"短期（1-2年）"| ST["具体的な変更・プロジェクト"]

    style AR fill:#2c3e50,color:#fff
    style AL fill:#8e44ad,color:#fff
    style REF fill:#3498db,color:#fff
    style STAN fill:#27ae60,color:#fff
    style CONT fill:#e67e22,color:#fff
    style CAP fill:#e74c3c,color:#fff
    style SOL fill:#1abc9c,color:#fff
```

### 6.2 アーキテクチャランドスケープの3層構造

```mermaid
graph BT
    subgraph "戦略アーキテクチャ（Strategic）"
        S["組織全体の長期ビジョン（5〜10年）<br>変化の少ない大方針"]
    end

    subgraph "セグメントアーキテクチャ（Segment）"
        SEG["事業単位・部門レベル（2〜5年）<br>部門横断の整合性"]
    end

    subgraph "能力アーキテクチャ（Capability）"
        CAP["個別プロジェクト・能力単位（1〜2年）<br>具体的な実装・変更"]
    end

    CAP --> |"具体化"| SEG --> |"具体化"| S

    style S fill:#2c3e50,color:#fff
    style SEG fill:#34495e,color:#fff
    style CAP fill:#7f8c8d,color:#fff
```

---

## 7. ステークホルダーマネジメント

### 7.1 ステークホルダーマップ

```mermaid
quadrantChart
    title ステークホルダー管理マトリクス
    x-axis 影響力（低い） --> 影響力（高い）
    y-axis 関心度（低い） --> 関心度（高い）
    quadrant-1 "密接に管理<br>Manage Closely"
    quadrant-2 "継続的な情報提供<br>Keep Informed"
    quadrant-3 "モニタリング<br>Monitor"
    quadrant-4 "満足を維持<br>Keep Satisfied"
    CEO: [0.9, 0.9]
    CIO: [0.85, 0.8]
    現場マネージャー: [0.4, 0.85]
    IT運用チーム: [0.5, 0.7]
    エンドユーザー: [0.3, 0.6]
    規制当局: [0.8, 0.3]
    ベンダー: [0.5, 0.4]
    株主: [0.9, 0.35]
```

### 7.2 ステークホルダーの関心事（Concerns）マッピング

```mermaid
graph LR
    subgraph "経営層"
        C_EXEC["コスト削減<br>ROI・競争優位性<br>リスク管理<br>規制対応"]
    end

    subgraph "IT部門"
        C_IT["技術的負債の解消<br>システム信頼性<br>セキュリティ<br>保守性・拡張性"]
    end

    subgraph "ビジネス部門"
        C_BIZ["業務効率化<br>使いやすさ<br>データアクセス<br>プロセス改善"]
    end

    subgraph "エンドユーザー"
        C_USER["使いやすいUI<br>システム速度<br>データの正確性<br>サポート"]
    end

    EA["🏛️ エンタープライズ<br>アーキテクチャ"] --> C_EXEC
    EA --> C_IT
    EA --> C_BIZ
    EA --> C_USER

    style EA fill:#2c3e50,color:#fff
```

---

## 8. ガバナンスとコンプライアンス

### 8.1 アーキテクチャガバナンスの構造

```mermaid
graph TD
    subgraph "ガバナンス組織階層"
        BOARD["経営委員会・取締役会"] --> IT_GOV["IT投資委員会"]
        IT_GOV --> ARCH_BOARD["アーキテクチャボード<br>Architecture Board"]
        ARCH_BOARD --> PROJ["プロジェクト・プログラム"]
    end

    subgraph "アーキテクチャボードの役割"
        AB1["アーキテクチャ方針の策定・維持"]
        AB2["コンプライアンスレビューの実施"]
        AB3["例外申請の承認・却下"]
        AB4["アーキテクチャ原則の管理"]
        AB5["アーキテクチャ成果物の承認"]
    end

    ARCH_BOARD --> AB1
    ARCH_BOARD --> AB2
    ARCH_BOARD --> AB3
    ARCH_BOARD --> AB4
    ARCH_BOARD --> AB5

    style BOARD fill:#2c3e50,color:#fff
    style IT_GOV fill:#34495e,color:#fff
    style ARCH_BOARD fill:#8e44ad,color:#fff
```

### 8.2 アーキテクチャコンプライアンスの種類

```mermaid
graph LR
    subgraph "コンプライアンスレベル"
        CONF["✅ Conformant<br>適合<br>アーキテクチャに完全準拠"]
        PART["⚠️ Partially Conformant<br>部分適合<br>一部準拠・改善計画あり"]
        NON["❌ Non-Conformant<br>不適合<br>アーキテクチャに準拠していない"]
        IRR["📋 Irrelevant<br>対象外<br>このアーキテクチャは適用外"]
    end

    REQ["プロジェクト要件"] --> CONF
    REQ --> PART
    REQ --> NON
    REQ --> IRR

    CONF --> OK["そのまま進行可能"]
    PART --> ACT["改善計画の策定が必要"]
    NON --> ESC["例外申請またはアーキテクチャ変更"]
    IRR --> EXC["対象外として記録"]

    style CONF fill:#27ae60,color:#fff
    style PART fill:#f39c12,color:#fff
    style NON fill:#e74c3c,color:#fff
    style IRR fill:#95a5a6,color:#fff
```

### 8.3 アーキテクチャコントラクト

```mermaid
flowchart LR
    A["アーキテクチャチーム"] <--> |"アーキテクチャコントラクト<br>Architecture Contract"| B["実装チーム<br>（プロジェクト）"]

    subgraph "コントラクトの内容"
        C1["アーキテクチャ要件・制約"]
        C2["適合性の基準"]
        C3["成果物の承認基準"]
        C4["変更管理プロセス"]
        C5["ガバナンス要件"]
    end

    B --> C1
    B --> C2
    B --> C3
    B --> C4
    B --> C5

    style A fill:#3498db,color:#fff
    style B fill:#e74c3c,color:#fff
```

---

## 9. 試験対策・ベストプラクティス

### 9.1 Level 1 試験の頻出テーマ

```mermaid
pie title Level 1 出題比率（目安）
    "ADMの各フェーズ理解" : 35
    "アーキテクチャドメインBDAT" : 20
    "TOGAFの基本概念・用語" : 20
    "アーキテクチャリポジトリ" : 10
    "ガバナンス・コンプライアンス" : 10
    "ステークホルダーマネジメント" : 5
```

### 9.2 Level 2 試験の頻出テーマ

```mermaid
pie title Level 2 出題比率（目安）
    "ADMの適用・シナリオ分析" : 40
    "ガバナンスの実践" : 20
    "ステークホルダーマネジメント" : 15
    "変更管理の実践" : 15
    "アーキテクチャコントラクト" : 10
```

### 9.3 必ず覚えるべき重要用語 TOP 20

```mermaid
mindmap
    root((TOGAF必須用語))
        ADM関連
            Architecture Vision
            Statement of Architecture Work
            Architecture Definition Document
            Architecture Requirements Specification
            Architecture Roadmap
            Transition Architecture
        組織・ガバナンス
            Architecture Board
            Architecture Contract
            Architecture Compliance
            Architecture Governance
            Architecture Capability
        成果物
            Architecture Building Block（ABB）
            Solution Building Block（SBB）
            Architecture Landscape
            Architecture Repository
        手法
            Gap Analysis
            Ubiquitous Language
            Stakeholder Map
            Architecture Principle
            Requirements Management
```

### 9.4 Level 2 問題の解き方フレームワーク

```mermaid
flowchart TD
    Q["問題文を読む"] --> S["シナリオの状況を把握する<br>• 何の組織か<br>• 何の問題が起きているか<br>• 現在のフェーズはどこか"]
    S --> R["TOGAFのどの概念が<br>適用されるか特定する"]
    R --> C["各選択肢を評価する<br>• TOGAFのベストプラクティスに合致するか<br>• ADMのシーケンスを守っているか<br>• ガバナンスを尊重しているか"]
    C --> A["最適な選択肢を選ぶ<br>（公式ドキュメントで確認）"]

    subgraph "陥りやすい罠"
        T1["直感に頼りすぎる（TOGAF視点で考える）"]
        T2["ADMのフェーズ順序を無視する"]
        T3["ステークホルダー関与を軽視する"]
        T4["ガバナンスプロセスをスキップする答えを選ぶ"]
    end

    A --> T1

    style Q fill:#2c3e50,color:#fff
    style A fill:#27ae60,color:#fff
    style T1 fill:#e74c3c,color:#fff
    style T2 fill:#e74c3c,color:#fff
    style T3 fill:#e74c3c,color:#fff
    style T4 fill:#e74c3c,color:#fff
```

### 9.5 ベストプラクティス：合格のための10箇条

| # | ベストプラクティス | 詳細 |
|---|----------------|------|
| 1 | **ADMのフロー完全暗記** | 準備フェーズ〜フェーズHまでの順序と目的を暗記する |
| 2 | **各フェーズの入出力を理解** | どのフェーズで何を作成し、何を次に渡すか |
| 3 | **BDAT を体系的に理解** | ビジネス→データ→アプリ→テクノロジーの依存関係 |
| 4 | **ギャップ分析の手法をマスター** | AS-ISとTO-BEの差分特定が試験で頻出 |
| 5 | **ABBとSBBの違いを完全理解** | 抽象（ABB）vs具体（SBB）の区別 |
| 6 | **ガバナンスプロセスを重視** | TOGAFは必ずガバナンスを通すことを前提とする |
| 7 | **公式ドキュメント（Level 2）の活用** | タブインデックスを貼り、素早く参照できるようにする |
| 8 | **模擬試験を最低200問解く** | 問題のパターンと罠を把握する |
| 9 | **ステークホルダー視点で考える** | 誰の関心事（Concerns）に答えているかを常に考える |
| 10 | **TOGAFの「考え方」を内在化** | 暗記でなく、なぜそうするかの論理を理解する |

---

## 10. 学習ロードマップ（7週間プラン）

### 10.1 全体スケジュール

```mermaid
gantt
    title TOGAF試験合格 7週間学習プラン
    dateFormat  YYYY-MM-DD
    section 基礎理解
        TOGAFとは・歴史・背景          :a1, 2025-01-01, 3d
        BDATアーキテクチャドメイン      :a2, after a1, 4d
    section ADM習得
        ADM準備〜フェーズD             :b1, after a2, 7d
        ADM フェーズE〜H・要求管理      :b2, after b1, 7d
    section 発展学習
        アーキテクチャリポジトリ        :c1, after b2, 4d
        ガバナンス・コンプライアンス     :c2, after c1, 3d
        ステークホルダーマネジメント     :c3, after c2, 3d
    section 試験対策
        模擬試験（100問）・弱点洗い出し  :d1, after c3, 3d
        模擬試験（150問以上）・復習      :d2, after d1, 4d
        最終確認・キーワード整理         :d3, after d2, 3d
```

### 10.2 週ごとの学習目標

```mermaid
graph LR
    W1["Week 1<br>🎯 TOGAF概要・BDAT<br>TOGAFとは何か<br>4つのドメイン理解"]
    W2["Week 2<br>🎯 ADM前半<br>準備〜フェーズD<br>各フェーズの目的・入出力"]
    W3["Week 3<br>🎯 ADM後半<br>フェーズE〜H<br>要求管理・反復サイクル"]
    W4["Week 4<br>🎯 成果物・リポジトリ<br>ABB/SBB・3層構造<br>アーキテクチャ原則"]
    W5["Week 5<br>🎯 ガバナンス<br>アーキテクチャボード<br>コンプライアンス4種"]
    W6["Week 6<br>🎯 模擬試験①<br>100問 + 弱点分析<br>間違えた箇所の再学習"]
    W7["Week 7<br>🎯 模擬試験②<br>150問 + 直前対策<br>キーワード・用語確認"]

    W1 --> W2 --> W3 --> W4 --> W5 --> W6 --> W7

    style W1 fill:#3498db,color:#fff
    style W2 fill:#3498db,color:#fff
    style W3 fill:#27ae60,color:#fff
    style W4 fill:#27ae60,color:#fff
    style W5 fill:#e67e22,color:#fff
    style W6 fill:#e74c3c,color:#fff
    style W7 fill:#e74c3c,color:#fff
```

### 10.3 学習リソースの優先順位

```mermaid
graph TD
    subgraph "必須リソース（Must）"
        M1["📘 TOGAF Standard Version 10<br>The Open Group公式"]
        M2["📝 公式サンプル問題（Level 1/2）<br>The Open Group提供"]
        M3["🎓 認定トレーニングプログラム<br>Accredited Training Course"]
    end

    subgraph "推奨リソース（Should）"
        S1["📚 TOGAF公式スタディガイド<br>The Open Group著"]
        S2["💻 模擬試験プラットフォーム<br>Whizlabs / ExamTopics等"]
        S3["🎥 動画コース<br>Udemy / Coursera等"]
    end

    subgraph "補足リソース（Nice-to-Have）"
        N1["🌐 TOGAF Wiki<br>コミュニティ解説"]
        N2["📖 関連書籍<br>EA関連の書籍"]
        N3["👥 学習コミュニティ<br>フォーラム・勉強会"]
    end

    M1 --> |"最重要"| M2
    M2 --> |"理解深化"| S1
    S1 --> |"補足"| N1

    style M1 fill:#e74c3c,color:#fff
    style M2 fill:#e74c3c,color:#fff
    style M3 fill:#e74c3c,color:#fff
    style S1 fill:#e67e22,color:#fff
    style S2 fill:#e67e22,color:#fff
    style S3 fill:#e67e22,color:#fff
    style N1 fill:#27ae60,color:#fff
    style N2 fill:#27ae60,color:#fff
    style N3 fill:#27ae60,color:#fff
```

---

## 11. 参考文献・公式ソース

### 📋 公式ドキュメント・URL

#### TOGAF公式

| リソース | URL |
|---------|-----|
| **TOGAF公式サイト（The Open Group）** | <https://www.opengroup.org/togaf> |
| **TOGAF Standard Version 10（公式標準）** | <https://www.opengroup.org/togaf> |
| **TOGAF認定資格プログラム** | <https://www.opengroup.org/certifications/togaf> |
| **公式サンプル試験問題** | <https://www.opengroup.org/certifications/togaf> |
| **認定トレーニングプロバイダー一覧** | <https://www.opengroup.org/certifications/togaf> |
| **TOGAF学習ポータル（The Open Group）** | <https://www.opengroup.org/certifications> |
| **TOGAF認定者検索** | <https://www.opengroup.org/certifications/professional-register> |

#### エンタープライズアーキテクチャ関連

| リソース | URL |
|---------|-----|
| **The Open Group Architecture Forum** | <https://www.opengroup.org/architecture> |
| **TOGAF ADM リファレンスガイド** | <https://pubs.opengroup.org/architecture/togaf9-doc/arch/> |
| **Zachman Framework** | <https://www.zachman.com/about-the-zachman-framework> |
| **FEAF（米国連邦政府EA）** | <https://www.cio.gov/> |

#### 学習プラットフォーム

| リソース | URL |
|---------|-----|
| **Udemy - TOGAF試験対策コース** | <https://www.udemy.com/topic/togaf/> |
| **Coursera - Enterprise Architecture** | <https://www.coursera.org/> |
| **LinkedIn Learning - TOGAF** | <https://www.linkedin.com/learning/topics/togaf> |
| **Whizlabs 模擬試験** | <https://www.whizlabs.com/togaf/> |

#### 試験申込・受験

| リソース | URL |
|---------|-----|
| **Pearson VUE 試験申込** | <https://home.pearsonvue.com/opengroup> |
| **試験センター検索（日本）** | <https://home.pearsonvue.com/Test-takers/Find-a-test-center.aspx> |
| **オンライン受験（OnVUE）** | <https://home.pearsonvue.com/opengroup/onvue> |

### 📚 推薦書籍

| タイトル | 著者 | 出版社 | 用途 |
|---------|------|--------|------|
| TOGAF® Standard, Version 9.2 | The Open Group | The Open Group | 公式テキスト |
| TOGAF® Standard, Version 10 | The Open Group | The Open Group | 最新公式テキスト |
| TOGAF® Version 9.1 Pocket Guide | Andrew Josey | Van Haren | 試験直前対策 |
| The Enterprise Architect's Handbook | Andrew Josey | The Open Group | 実践ガイド |
| Enterprise Architecture As Strategy | Ross, Weill, Robertson | Harvard Business Review | EA戦略理論 |

---

> 📅 本ドキュメントは2024年時点の情報を基に作成しています。試験情報・受験料・試験形式は変更される場合があります。受験前に必ず公式サイト（<https://www.opengroup.org/togaf>）をご確認ください。

---

*作成者： Software Architect Guide | バージョン 2.0 | TOGAF® Complete Exam Guide*

> ⚠️ **免責事項：** TOGAF® はThe Open
 Groupの登録商標です。本ドキュメントはThe Open Groupの公式資料ではありません。公式情報は必ず公式サイトでご確認ください。
