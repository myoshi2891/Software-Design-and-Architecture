import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import ArchitectingGenAiChecklist, { type ChecklistItem } from "./ArchitectingGenAiChecklist";
import ArchitectingGenAiSidebar, { type NavGroup } from "./ArchitectingGenAiSidebar";

export const metadata: Metadata = {
  title: "Architecting Generative AI Applications 徹底解説：プロトタイプから本番運用まで",
  description:
    "Leonid Kuligin著『Architecting Generative AI Applications』を起点に、プロトタイプから本番運用まで生成AIアプリケーション開発ライフサイクル全体を一気通貫で学ぶ包括的学習ガイド。",
};

const NAV_GROUPS: readonly NavGroup[] = [
  {
    title: "第0部：なぜ「プロトタイプ」と「本番運用」はこんなにも違うのか",
    items: [
      {
        id: "part0",
        label: "第0部：なぜ「プロトタイプ」と「本番運用」はこんなにも違うのか",
      },
      {
        id: "01-このガイドが扱う問題",
        label: "0.1 このガイドが扱う問題",
      },
      {
        id: "02-生成aiアプリケーション開発の全体ライフサイクル",
        label: "0.2 生成AIアプリケーション開発の全体ライフサイクル",
      },
      {
        id: "03-前提知識の整理",
        label: "0.3 前提知識の整理",
      },
    ],
  },
  {
    title: "第1部：プロトタイプを構築する",
    items: [
      {
        id: "part1",
        label: "第1部：プロトタイプを構築する",
      },
      {
        id: "11-成功するaiプロトタイプの秘訣",
        label: "1.1 「成功するAIプロトタイプ」の秘訣",
      },
      {
        id: "12-大企業でのpoc立ち上げ-vs-スタートアップでのpoc立ち上げ",
        label: "1.2 大企業でのPoC立ち上げ vs スタートアップでのPoC立ち上げ",
      },
      {
        id: "13-生成aiが何を変えたのか",
        label: "1.3 生成AIが何を変えたのか",
      },
      {
        id: "14-生成ai開発における誤解misconceptions",
        label: "1.4 生成AI開発における誤解（Misconceptions）",
      },
    ],
  },
  {
    title: "第2部：生成AIアプリケーションを評価する",
    items: [
      {
        id: "part2",
        label: "第2部：生成AIアプリケーションを評価する",
      },
      {
        id: "21-なぜ評価がこれほど重要なのか",
        label: "2.1 なぜ評価がこれほど重要なのか",
      },
      {
        id: "22-機械学習における汎化generalizationとmlライフサイクルの復習",
        label: "2.2 機械学習における汎化（Generalization）とMLライフサイクルの復習",
      },
      {
        id: "23-メトリクスベース評価分類問題としての生成ai",
        label: "2.3 メトリクスベース評価：分類問題としての生成AI",
      },
      {
        id: "24-テキスト比較の指標と検索の指標",
        label: "2.4 テキスト比較の指標と検索の指標",
      },
      {
        id: "25-llm-as-a-judgellmに評価させるという発想",
        label: "2.5 LLM-as-a-Judge：LLMに評価させるという発想",
      },
      {
        id: "26-コンセンサス複数審査者の合議",
        label: "2.6 コンセンサス（複数審査者の合議）",
      },
      {
        id: "27-human-in-the-loophitl評価の実装",
        label: "2.7 Human-in-the-Loop（HITL）評価の実装",
      },
      {
        id: "28-より複雑な評価シナリオragとエージェントの評価",
        label: "2.8 より複雑な評価シナリオ：RAGとエージェントの評価",
      },
    ],
  },
  {
    title: "第3部：主要アーキテクチャを理解する",
    items: [
      {
        id: "part3",
        label: "第3部：主要アーキテクチャを理解する",
      },
      {
        id: "31-プロンプトテンプレートの組織化とバージョン管理",
        label: "3.1 プロンプトテンプレートの組織化とバージョン管理",
      },
      {
        id: "32-ベクトルデータベースによる埋め込みの保存と検索",
        label: "3.2 ベクトルデータベースによる埋め込みの保存と検索",
      },
      {
        id: "33-ハイブリッド検索とリランキング",
        label: "3.3 ハイブリッド検索とリランキング",
      },
      {
        id: "34-限られたコンテキストウィンドウへの対処mapreduceパターン",
        label: "3.4 限られたコンテキストウィンドウへの対処：MapReduceパターン",
      },
      {
        id: "35-エージェンティックアーキテクチャの探求",
        label: "3.5 エージェンティックアーキテクチャの探求",
      },
    ],
  },
  {
    title: "第4部：プロトタイプから本番コードへ",
    items: [
      {
        id: "part4",
        label: "第4部：プロトタイプから本番コードへ",
      },
      {
        id: "41-なぜオペレーション化operationalizationが重要なのか",
        label: "4.1 なぜ「オペレーション化（Operationalization）」が重要なのか",
      },
      {
        id: "42-コードの可読性を高める",
        label: "4.2 コードの可読性を高める",
      },
      {
        id: "43-拡張しやすいコードにするsolid原則の中心的な2つ",
        label: "4.3 拡張しやすいコードにする：SOLID原則の中心的な2つ",
      },
      {
        id: "44-テスト戦略単体統合負荷テスト",
        label: "4.4 テスト戦略：単体・統合・負荷テスト",
      },
      {
        id: "45-シンプルに保つことの価値そして近道の代償",
        label: "4.5 シンプルに保つことの価値、そして「近道」の代償",
      },
      {
        id: "46-ユーザーオンボーディング",
        label: "4.6 ユーザーオンボーディング",
      },
    ],
  },
  {
    title: "第5部：DevOps・MLOpsからLLMOpsへ",
    items: [
      {
        id: "part5",
        label: "第5部：DevOps・MLOpsからLLMOpsへ",
      },
      {
        id: "51-devopsの復習cicdとは何か",
        label: "5.1 DevOpsの復習：CI/CDとは何か",
      },
      {
        id: "52-mlops機械学習パイプラインと成功指標",
        label: "5.2 MLOps：機械学習パイプラインと成功指標",
      },
      {
        id: "53-llmopsの誕生何が新しく必要になったのか",
        label: "5.3 LLMOpsの誕生：何が新しく必要になったのか",
      },
      {
        id: "54-llmopsツールの選び方",
        label: "5.4 LLMOpsツールの選び方",
      },
      {
        id: "55-ケーススタディragアプリケーションのためのcicdジョブ",
        label: "5.5 ケーススタディ：RAGアプリケーションのためのCI/CDジョブ",
      },
    ],
  },
  {
    title: "第6部：アプリケーションをデプロイする",
    items: [
      {
        id: "part6",
        label: "第6部：アプリケーションをデプロイする",
      },
      {
        id: "61-ステートレスなアプリケーションとステートフルなアプリケーション",
        label: "6.1 ステートレスなアプリケーションとステートフルなアプリケーション",
      },
      {
        id: "62-デプロイのベストプラクティス",
        label: "6.2 デプロイのベストプラクティス",
      },
      {
        id: "63-アプリケーションのデプロイ方式",
        label: "6.3 アプリケーションのデプロイ方式",
      },
      {
        id: "64-アプリケーションをスケールさせるベストプラクティス",
        label: "6.4 アプリケーションをスケールさせるベストプラクティス",
      },
    ],
  },
  {
    title: "第7部：倫理とセキュリティ",
    items: [
      {
        id: "part7",
        label: "第7部：倫理とセキュリティ",
      },
      {
        id: "71-responsible-aiの基本",
        label: "7.1 Responsible AIの基本",
      },
      {
        id: "72-公平性fairness",
        label: "7.2 公平性（Fairness）",
      },
      {
        id: "73-説明可能性explainability",
        label: "7.3 説明可能性（Explainability）",
      },
      {
        id: "74-安全性とセキュリティ",
        label: "7.4 安全性とセキュリティ",
      },
      {
        id: "75-プライバシー",
        label: "7.5 プライバシー",
      },
    ],
  },
  {
    title: "第8部：可観測性と信頼性",
    items: [
      {
        id: "part8",
        label: "第8部：可観測性と信頼性",
      },
      {
        id: "81-サイト信頼性エンジニアリングsreとは何か",
        label: "8.1 サイト信頼性エンジニアリング（SRE）とは何か",
      },
      {
        id: "82-信頼性の達成slisloslaとエラーバジェット",
        label: "8.2 信頼性の達成：SLI・SLO・SLAとエラーバジェット",
      },
      {
        id: "83-その他のsre原則とトイルの削減",
        label: "8.3 その他のSRE原則とトイルの削減",
      },
      {
        id: "84-本番アプリケーションの管理テレメトリデータの3本柱",
        label: "8.4 本番アプリケーションの管理：テレメトリデータの3本柱",
      },
      {
        id: "85-モニタリングとアラートそしてgenai観測性の標準化",
        label: "8.5 モニタリングとアラート、そしてGenAI観測性の標準化",
      },
      {
        id: "86-genai観測性特有の計装ポイント",
        label: "8.6 GenAI観測性特有の計装ポイント",
      },
    ],
  },
  {
    title: "第9部：アプリケーションを保守する",
    items: [
      {
        id: "part9",
        label: "第9部：アプリケーションを保守する",
      },
      {
        id: "91-デプロイ後の生活プラットフォームチームという発想",
        label: "9.1 デプロイ後の生活：プラットフォームチームという発想",
      },
      {
        id: "92-通常のプラットフォームチームとgenaiプラットフォームチームの違い",
        label: "9.2 通常のプラットフォームチームとGenAIプラットフォームチームの違い",
      },
      {
        id: "93-genaiプラットフォームのビルディングブロック",
        label: "9.3 GenAIプラットフォームのビルディングブロック",
      },
      {
        id: "94-プロダクト戦略とロードマップ",
        label: "9.4 プロダクト戦略とロードマップ",
      },
    ],
  },
  {
    title: "第10部：A/Bテストとオンライン実験",
    items: [
      {
        id: "part10",
        label: "第10部：A/Bテストとオンライン実験",
      },
      {
        id: "101-abテストとは何か",
        label: "10.1 A/Bテストとは何か",
      },
      {
        id: "102-統計的検定の基礎第一種の過誤と第二種の過誤",
        label: "10.2 統計的検定の基礎：第一種の過誤と第二種の過誤",
      },
      {
        id: "103-p値にまつわる誤解myths-about-p-value",
        label: "10.3 p値にまつわる誤解（Myths about p-value）",
      },
      {
        id: "104-オンラインテストのための良い指標とは",
        label: "10.4 オンラインテストのための良い指標とは",
      },
      {
        id: "105-テストの検出力powerを高める",
        label: "10.5 テストの検出力（Power）を高める",
      },
      {
        id: "106-abテストでよくある誤り",
        label: "10.6 A/Bテストでよくある誤り",
      },
    ],
  },
  {
    title: "第11部：2026年9月時点の最新動向",
    items: [
      {
        id: "part11",
        label: "第11部：2026年9月時点の最新動向",
      },
      {
        id: "111-エージェント間相互運用の標準化mcpのlinux-foundation移管",
        label: "11.1 エージェント間相互運用の標準化：MCPのLinux Foundation移管",
      },
      {
        id: "112-llmops評価駆動開発とマルチステップ観測性の主流化",
        label: "11.2 LLMOps：評価駆動開発とマルチステップ観測性の主流化",
      },
      {
        id: "113-セキュリティowasp-top-10-for-llm-applications-2026の変化",
        label: "11.3 セキュリティ：OWASP Top 10 for LLM Applications 2026の変化",
      },
      {
        id: "114-観測性opentelemetryのcncf卒業とgenai意味規約の定着",
        label: "11.4 観測性：OpenTelemetryのCNCF卒業とGenAI意味規約の定着",
      },
      {
        id: "115-ragハイブリッド検索2段階リランキングの実証データ",
        label: "11.5 RAG：ハイブリッド検索+2段階リランキングの実証データ",
      },
      {
        id: "116-マルチエージェント設計トークンコストという制約への意識",
        label: "11.6 マルチエージェント設計：トークンコストという制約への意識",
      },
    ],
  },
  {
    title: "学習ロードマップ",
    items: [
      {
        id: "roadmap",
        label: "学習ロードマップ",
      },
    ],
  },
  {
    title: "実践チェックリスト",
    items: [
      {
        id: "checklist",
        label: "実践チェックリスト",
      },
    ],
  },
  {
    title: "用語集",
    items: [
      {
        id: "glossary",
        label: "用語集",
      },
    ],
  },
  {
    title: "参考文献・ソース一覧",
    items: [
      {
        id: "references",
        label: "参考文献・ソース一覧",
      },
      {
        id: "一次情報源",
        label: "一次情報源",
      },
      {
        id: "二次情報源解説比較記事",
        label: "二次情報源（解説・比較記事）",
      },
    ],
  },
];

const CHECKLIST_ITEMS: readonly ChecklistItem[] = [
  {
    id: "chk-1",
    text: "プロトタイプ着手前に、検証したい仮説と成功・失敗の判定基準を1つに絞って明文化した",
  },
  {
    id: "chk-2",
    text: "メトリクスベース評価・LLM-as-a-Judge・Human-in-the-Loopのどれを使うか、タスクの性質に応じて選定した",
  },
  {
    id: "chk-3",
    text: "LLM審査者の位置バイアス・冗長性バイアス・自己贔屓バイアスを認識し、緩和策（ランダム化、複数審査者の合議など）を組み込んだ",
  },
  {
    id: "chk-4",
    text: "RAGを使う場合、ハイブリッド検索（キーワード+ベクトル）と2段階リランキングの採用を検討した",
  },
  {
    id: "chk-5",
    text: "エージェントを使う場合、単一エージェント・オーケストレーター/ワーカー・評価者/最適化のどのパターンが適しているかを比較検討した",
  },
  {
    id: "chk-6",
    text: "マルチエージェント化を選ぶ前に、トークンコストの増加に見合う並列分解可能性があるかを見極めた",
  },
  {
    id: "chk-7",
    text: "プロンプトをコードから分離し、バージョン管理・レビュー対象にした",
  },
  {
    id: "chk-8",
    text: "LLM呼び出し自体をモック化した単体テストと、パイプライン全体を検証する統合テストを分離して設計した",
  },
  {
    id: "chk-9",
    text: "プロンプト・RAG設定の変更をPull Requestベースで評価パイプラインによる自動ゲートに通す仕組みを作った",
  },
  {
    id: "chk-10",
    text: "アプリケーション層をステートレスに保ち、セッション状態を外部ストアに切り出した",
  },
  {
    id: "chk-11",
    text: "キャッシング戦略（完全一致キャッシュ・セマンティックキャッシュ・プロンプトキャッシュ）を設計した",
  },
  {
    id: "chk-12",
    text: "LLMプロバイダー障害時のグレースフルデグラデーション・サーキットブレーカーを実装した",
  },
  {
    id: "chk-13",
    text: "エージェントのツールアクセス権限を最小化し、高リスク操作には人間の承認ステップを設けた（Lethal Trifectaのリスクを評価した）",
  },
  {
    id: "chk-14",
    text: "OWASP Top 10 for LLM Applications / Agentic Applicationsのリスク項目を自社アーキテクチャに照らして棚卸しした",
  },
  {
    id: "chk-15",
    text: "SLI/SLO/エラーバジェットを定義し、生成AI特有の指標（ハルシネーション率、品質スコア）を含めた",
  },
  {
    id: "chk-16",
    text: "OpenTelemetry GenAI意味規約に沿ったトレーシングを、少なくともLLM呼び出しレベルで導入した",
  },
  {
    id: "chk-17",
    text: "モデルゲートウェイ・プロンプトストア・ツールレジストリなど、複数チームで共有すべき基盤の要否を検討した",
  },
  {
    id: "chk-18",
    text: "A/Bテストのプライマリ指標を事前に1つに絞り込み、ガードレール指標（レイテンシ・コスト・安全性）を独立して監視した",
  },
  {
    id: "chk-19",
    text: "早期終了バイアス・多重比較問題・新奇性効果を避けるための実験期間・サンプルサイズを事前に設計した",
  },
];

const DIAGRAM_1 = `flowchart LR
    A[ユースケース選定] --> B[プロトタイプ構築<br/>第1部]
    B --> C[評価設計<br/>第2部]
    C --> D[アーキテクチャ設計<br/>第3部]
    D --> E[本番コード化<br/>第4部]
    E --> F[LLMOps基盤整備<br/>第5部]
    F --> G[デプロイ<br/>第6部]
    G --> H[倫理・セキュリティ審査<br/>第7部]
    H --> I[可観測性・信頼性確保<br/>第8部]
    I --> J[継続的な保守<br/>第9部]
    J --> K[A/Bテストで効果測定<br/>第10部]
    K -->|改善サイクル| C

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class B,D,G highlightFill`;

const DIAGRAM_2 = `flowchart TB
    subgraph Enterprise[大企業でのPoC]
        E1[既存データ資産・セキュリティ制約の把握]
        E2[法務・コンプライアンス部門との早期連携]
        E3[小規模な社内ユーザーでの限定公開]
        E1 --> E2 --> E3
    end

    subgraph Startup[スタートアップでのPoC]
        S1[最小限のインフラで最速に検証]
        S2[実際の顧客候補に直接見せてフィードバック取得]
        S3[資金調達ストーリーに繋がる指標を計測]
        S1 --> S2 --> S3
    end

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class E1,S1 highlightFill`;

const DIAGRAM_3 = `flowchart TD
    A[評価したい生成AIアプリケーション] --> B{評価アプローチの選択}
    B --> C[メトリクスベース評価]
    B --> D[LLM-as-a-Judge]
    B --> E[Human-in-the-Loop評価]
    C --> F[分類問題の指標<br/>Precision/Recall/F1]
    C --> G[テキスト比較の指標<br/>BLEU/ROUGE/BERTScore]
    C --> H[検索品質の指標<br/>NDCG/MRR/Recall上位k件]
    D --> I[基準なし評価<br/>Reference-free]
    D --> J[基準あり評価<br/>Golden Answer比較]
    D --> K[ペアワイズ比較]
    E --> L[専門家によるレビュー]
    E --> M[コンセンサス形成]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class D highlightFill`;

const DIAGRAM_4 = `flowchart LR
    subgraph P1[基準なし評価<br/>Reference-free]
        A1[質問と回答のみ提示]
        A2[妥当性・有用性を採点]
        A1 --> A2
    end
    subgraph P2[基準あり評価<br/>Golden Answer比較]
        B1[質問・回答・模範解答を提示]
        B2[模範解答との一致度を採点]
        B1 --> B2
    end
    subgraph P3[ペアワイズ比較]
        C1[同じ質問への2つの回答を提示]
        C2[どちらが優れているか判定]
        C1 --> C2
    end

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class P2 highlightFill`;

const DIAGRAM_5 = `flowchart LR
    A[本番トラフィックからサンプリング] --> B[レビュー用キューに投入]
    B --> C[専門家によるアノテーション]
    C --> D{品質基準を満たすか}
    D -->|Yes| E[ゴールデンデータセットに追加]
    D -->|No| F[失敗パターンとして分類]
    F --> G[プロンプト/RAG/モデル改善へフィードバック]
    E --> H[LLM審査者のキャリブレーションに再利用]

    classDef dangerFill fill:#3a1420,stroke:#c05a6e,color:#f5d8de
    class F dangerFill`;

const DIAGRAM_6 = `flowchart LR
    A[プロンプトテンプレート] --> B[プロンプトレジストリ]
    B --> C[バージョン管理・diff表示]
    B --> D[環境別エイリアス<br/>dev/staging/prod]
    B --> E[評価パイプラインとの連携]
    D --> F[アプリケーションコード]
    F -->|再デプロイ不要で切替| D

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class B highlightFill`;

const DIAGRAM_7 = `flowchart TB
    A[ドキュメント群] --> B[チャンク分割]
    B --> C[埋め込みモデルでベクトル化]
    C --> D[(ベクトルデータベース)]
    E[ユーザーの質問] --> F[埋め込みモデルでベクトル化]
    F --> G{近似最近傍探索<br/>ANN検索}
    D --> G
    G --> H[関連チャンクTop-N]
    H --> I[LLMへのプロンプトに挿入]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class D highlightFill`;

const DIAGRAM_8 = `flowchart TB
    Q[ユーザーの質問] --> B1[BM25キーワード検索]
    Q --> B2[密ベクトル検索]
    B1 --> C{Reciprocal Rank Fusion<br/>RRFで統合}
    B2 --> C
    C --> D[候補文書 上位20〜100件]
    D --> E[クロスエンコーダーによるリランキング]
    E --> F[最終文脈 上位5〜20件]
    F --> G[LLMへ]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class C,E highlightFill`;

const DIAGRAM_9 = `flowchart TB
    A[大量の文書群] --> B1[チャンク1]
    A --> B2[チャンク2]
    A --> B3[チャンク3]
    B1 --> C1[Map: 各チャンクをLLMで要約]
    B2 --> C2[Map: 各チャンクをLLMで要約]
    B3 --> C3[Map: 各チャンクをLLMで要約]
    C1 --> D[Reduce: 要約群を統合]
    C2 --> D
    C3 --> D
    D --> E[最終的な統合回答]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class D highlightFill`;

const DIAGRAM_10 = `flowchart TB
    subgraph Single[単一エージェントループ]
        S1[LLM] --> S2{ツールが必要か}
        S2 -->|Yes| S3[ツール呼び出し]
        S3 --> S1
        S2 -->|No、完了| S4[最終回答]
    end

    subgraph Orchestrator[オーケストレーター・ワーカー]
        O1[リードエージェント]
        O2[サブエージェントA]
        O3[サブエージェントB]
        O4[サブエージェントC]
        O1 --> O2
        O1 --> O3
        O1 --> O4
        O2 --> O5[結果を統合]
        O3 --> O5
        O4 --> O5
        O5 --> O1
    end

    subgraph EvalOpt[評価者・最適化ループ]
        E1[生成エージェント] --> E2[評価エージェント]
        E2 --> E3{基準を満たすか}
        E3 -->|No| E1
        E3 -->|Yes| E4[出力確定]
    end

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class O1,E2 highlightFill`;

const DIAGRAM_11 = `flowchart LR
    A[短期メモリ<br/>現在の会話コンテキスト] --> D[エージェントの推論]
    B[エピソード記憶<br/>過去のタスク実行履歴] --> D
    C[長期記憶<br/>ユーザー設定・学習した事実] --> D
    D --> E[応答・行動]
    E -->|重要な情報を書き戻す| B
    E -->|恒久的な事実を書き戻す| C

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class D highlightFill`;

const DIAGRAM_12 = `flowchart TB
    A[拡張しやすいコード] --> B[単一責任の原則<br/>Single Responsibility Principle]
    A --> C[DRY原則<br/>Don't Repeat Yourself]
    A --> D[疎結合<br/>Loose Coupling]
    B --> B1[1つのクラス・関数は1つの理由でのみ変更される]
    C --> C1[同じロジックを複数箇所に重複させない]
    D --> D1[コンポーネント間の依存を最小化し差し替え可能にする]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class D highlightFill`;

const DIAGRAM_13 = `flowchart TB
    A[負荷テスト<br/>本番相当の同時アクセス下での性能検証] --> B[統合テスト<br/>RAGパイプライン全体・外部API連携の検証]
    B --> C[単体テスト<br/>個々の関数・プロンプトテンプレートの検証]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class C highlightFill`;

const DIAGRAM_14 = `flowchart LR
    A[DevOps<br/>コードのCI/CD] --> B[MLOps<br/>+ データ・モデルのパイプライン化]
    B --> C[LLMOps<br/>+ プロンプト管理・評価駆動開発・トークンコスト管理]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class C highlightFill`;

const DIAGRAM_15 = `flowchart TB
    A[プロンプト/RAG設定の変更をPR作成] --> B[静的解析・単体テスト]
    B --> C[オフライン評価データセットで検索品質を検証]
    C --> D{Context Precision/Recallが<br/>閾値を満たすか}
    D -->|No| E[PRをブロックしフィードバック]
    D -->|Yes| F[LLM-as-a-Judgeで生成品質を検証]
    F --> G{Faithfulness/Answer Relevancyが<br/>閾値を満たすか}
    G -->|No| E
    G -->|Yes| H[ステージング環境へデプロイ]
    H --> I[少量のカナリアトラフィックでオンライン評価]
    I --> J{ガードレール指標が正常か}
    J -->|Yes| K[本番へ段階的ロールアウト]
    J -->|No| L[自動ロールバック]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    classDef dangerFill fill:#3a1420,stroke:#c05a6e,color:#f5d8de
    class D,G,J highlightFill
    class E,L dangerFill`;

const DIAGRAM_16 = `flowchart TB
    A[生成AIアプリケーション] --> B[Webサービス層として公開]
    B --> C[コンテナ化しKubernetesへデプロイ]
    B --> D[マネージドサービス経由でデプロイ<br/>例: LangSmith等]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class C highlightFill`;

const DIAGRAM_17 = `flowchart LR
    A[リクエスト] --> K[キャッシュキーを構成<br/>tenant_id + user_id + 認可スコープ + データ版]
    K --> B{完全一致キャッシュ<br/>にヒットするか}
    B -->|Yes| V[再利用前に同じ認可境界を再検証]
    B -->|No| D{セマンティックキャッシュ<br/>同一スコープ内に類似リクエストがあるか}
    D -->|Yes| V
    D -->|No| F[LLMへ新規リクエスト]
    V --> C[キャッシュから応答]
    F --> S{権限依存の生成回答か}
    S -->|Yes| N[キャッシュしない]
    S -->|No| G[スコープ付きキーで保存]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    classDef guardFill fill:#3a1420,stroke:#c05a6e,color:#f5d8de
    class B,D highlightFill
    class K,V,N guardFill`;

const DIAGRAM_18 = `flowchart TB
    A[プライマリLLMプロバイダー呼び出し] --> B{タイムアウト/エラー}
    B -->|正常| C[通常の応答]
    B -->|異常| D[フォールバック用の軽量モデルへ切替]
    D --> E{フォールバックも失敗}
    E -->|正常| F[縮退した応答を返す]
    E -->|異常| G[キャッシュされた汎用回答/静的メッセージを返す]

    classDef dangerFill fill:#3a1420,stroke:#c05a6e,color:#f5d8de
    class B,E dangerFill`;

const DIAGRAM_19 = `flowchart TB
    A[Responsible AI] --> B[公平性<br/>Fairness]
    A --> C[説明可能性<br/>Explainability]
    A --> D[安全性・セキュリティ<br/>Safety and Security]
    A --> E[プライバシー<br/>Privacy]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class A highlightFill`;

const DIAGRAM_20 = `flowchart TB
    A[機密データへの<br/>アクセス能力] --- D{3つが同時に揃うと<br/>プロンプトインジェクションが<br/>構造的リスクになる}
    B[信頼できない<br/>外部コンテンツの処理] --- D
    C[外部への<br/>通信能力] --- D

    classDef dangerFill fill:#3a1420,stroke:#c05a6e,color:#f5d8de
    class D dangerFill`;

const DIAGRAM_21 = `flowchart LR
    A[SLI<br/>Service Level Indicator<br/>実際に計測する指標] --> B[SLO<br/>Service Level Objective<br/>内部的な目標値]
    B --> C[SLA<br/>Service Level Agreement<br/>顧客との契約上の約束]
    B --> D[エラーバジェット<br/>SLOから許容される失敗の余地]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class D highlightFill`;

const DIAGRAM_22 = `flowchart TB
    A[SLO 99.9%達成に設定] --> B[エラーバジェット 0.1%が発生]
    B --> C{バジェットの消費ペース}
    C -->|健全な範囲| D[新機能のリリースを継続]
    C -->|バジェット枯渇が近い| E[リリースを凍結し信頼性改善を優先]

    classDef dangerFill fill:#3a1420,stroke:#c05a6e,color:#f5d8de
    class E dangerFill`;

const DIAGRAM_23 = `sequenceDiagram
    participant User as ユーザー
    participant App as アプリケーション
    participant LLM as LLMプロバイダー
    participant Obs as 可観測性基盤

    User->>App: リクエスト送信
    App->>Obs: トレース開始（Span生成）
    App->>LLM: プロンプト送信
    Obs->>Obs: メトリクス記録<br/>トークン数・レイテンシ
    LLM-->>App: 応答返却
    App->>Obs: ログ記録<br/>入出力・エラー有無
    App-->>User: 最終応答
    Obs->>Obs: トレース完了・保存`;

const DIAGRAM_24 = `flowchart LR
    A[アプリケーションコード] --> B[OpenTelemetry SDK<br/>gen_ai.* 属性で計装]
    B --> C{OTLPエクスポーター}
    C --> D[Datadog]
    C --> E[Grafana]
    C --> F[任意のOTLP対応バックエンド]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class B highlightFill`;

const DIAGRAM_25 = `flowchart TB
    subgraph Platform[GenAIプラットフォーム]
        MG[モデルゲートウェイ]
        PS[プロンプトストア]
        TR[ツールレジストリ]
        ES[実行サンドボックス]
        SS[セッションストア]
        FS[フィードバックサービス]
        HITL[Human-in-the-Loopキュー]
    end

    App[各プロダクトチームのアプリケーション] --> MG
    App --> PS
    App --> TR
    App --> ES
    App --> SS
    App --> FS
    FS --> HITL

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class MG highlightFill`;

const DIAGRAM_26 = `flowchart TB
    A[本番トラフィック] --> B{ランダム割当}
    B --> C[バリアントA<br/>既存のプロンプト/モデル]
    B --> D[バリアントB<br/>新しいプロンプト/モデル]
    C --> E[行動データ収集]
    D --> E
    E --> F[統計的検定]
    F --> G{有意な差があるか}
    G -->|Yes、Bが優位| H[Bを全ユーザーへ展開]
    G -->|有意差なし/Aが優位| I[Aを維持し次の仮説を検証]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class F highlightFill`;

const DIAGRAM_27 = `flowchart TB
    A[2026年9月時点の主要トレンド]
    A --> B[MCPのLinux Foundation移管<br/>エージェント間標準化の加速]
    A --> C[LLMOps: 評価駆動開発の主流化]
    A --> D[OWASP Top10: 過剰な自律性リスクの急浮上]
    A --> E[OpenTelemetry GenAI規約の普及]
    A --> F[ハイブリッド検索+リランキングの標準化]
    A --> G[マルチエージェント設計における<br/>トークンコスト意識の高まり]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class A highlightFill`;

const DIAGRAM_28 = `flowchart TB
    S1["ステップ1<br/>LLM/RAG/エージェントの基礎用語を理解する<br/>（第0部・用語集）"] --> S2
    S2["ステップ2<br/>小さなプロトタイプを作り<br/>評価基準を先に決める習慣をつける<br/>（第1部・第2部）"] --> S3
    S3["ステップ3<br/>RAG・エージェントの代表的な<br/>アーキテクチャパターンを手を動かして試す<br/>（第3部）"] --> S4
    S4["ステップ4<br/>コードの可読性・テスト戦略を整え<br/>CI/CDにプロンプト変更を乗せる<br/>（第4部・第5部）"] --> S5
    S5["ステップ5<br/>本番デプロイとスケーリング設計を学ぶ<br/>（第6部）"] --> S6
    S6["ステップ6<br/>セキュリティ・倫理審査を<br/>設計プロセスに組み込む<br/>（第7部）"] --> S7
    S7["ステップ7<br/>可観測性を仕込み<br/>SLI/SLO/エラーバジェットを運用に乗せる<br/>（第8部）"] --> S8
    S8["ステップ8<br/>プラットフォーム化と<br/>継続的なA/Bテストの文化を根付かせる<br/>（第9部・第10部）"] --> S9
    S9["ステップ9<br/>最新動向を継続的にキャッチアップする<br/>（第11部）"]

    classDef highlightFill fill:#1c3a5e,stroke:#7c9eff,color:#eaf0ff
    class S2,S7 highlightFill`;

const CODE_1 = `<span class="cm"># app/summarize.py</span>
<span class="cm"># 依存: pip install "fastapi[standard]" pydantic anthropic</span>
<span class="cm"># 起動: uvicorn app.summarize:app --reload</span>
<span class="kw">import</span> json
<span class="kw">import</span> os
<span class="kw">from</span> typing <span class="kw">import</span> Protocol

<span class="kw">from</span> fastapi <span class="kw">import</span> Depends, FastAPI, HTTPException
<span class="kw">from</span> pydantic <span class="kw">import</span> BaseModel, Field, ValidationError

<span class="kw">class</span> SummarizeRequest(BaseModel):
    <span class="st">""</span><span class="st">"入力バリデーション。空文字や長すぎる入力はここで422として弾かれる。"</span><span class="st">""</span>

    text: str = Field(min_length=<span class="nu">1</span>, max_length=<span class="nu">5000</span>, description=<span class="st">"要約対象の本文"</span>)

<span class="kw">class</span> SummarizeResponse(BaseModel):
    <span class="st">""</span><span class="st">"出力スキーマ。LLMの生テキストは必ずこの型を通してから返す。"</span><span class="st">""</span>

    summary: str = Field(min_length=<span class="nu">1</span>)
    keywords: list[str] = Field(max_length=<span class="nu">5</span>)

<span class="kw">class</span> LlmClient(Protocol):
    <span class="st">""</span><span class="st">"LLM呼び出しの最小インターフェース。テストではこれを実装したフェイクを注入する。"</span><span class="st">""</span>

    <span class="kw">def</span> complete(self, prompt: str) -&gt; str: ...

<span class="kw">class</span> AnthropicClient:
    <span class="st">""</span><span class="st">"本番用の実装。"</span><span class="st">""</span>

    <span class="kw">def</span> __init__(self) -&gt; None:
        <span class="kw">from</span> anthropic <span class="kw">import</span> Anthropic

        self._client = Anthropic(api_key=os.environ[<span class="st">"ANTHROPIC_API_KEY"</span>])

    <span class="kw">def</span> complete(self, prompt: str) -&gt; str:
        resp = self._client.messages.create(
            model=<span class="st">"claude-sonnet-5"</span>,
            max_tokens=<span class="nu">500</span>,
            messages=[{<span class="st">"role"</span>: <span class="st">"user"</span>, <span class="st">"content"</span>: prompt}],
        )
        <span class="kw">return</span> resp.content[<span class="nu">0</span>].text

<span class="kw">def</span> get_llm() -&gt; LlmClient:
    <span class="st">""</span><span class="st">"DIの入口。テストでは app.dependency_overrides でここを差し替える。"</span><span class="st">""</span>
    <span class="kw">return</span> AnthropicClient()

app = FastAPI()

PROMPT = <span class="st">""</span><span class="st">"次の本文を要約し、{{"</span>summary<span class="st">": "</span>&lt;要約&gt;<span class="st">", "</span>keywords<span class="st">": ["</span>&lt;語&gt;", ...]}} のJSONのみを返してください。

<span class="cm"># 本文</span>
{text}<span class="st">""</span>"

<span class="fn">@app</span>.post(<span class="st">"/summarize"</span>, response_model=SummarizeResponse)
<span class="kw">def</span> summarize(req: SummarizeRequest, llm: LlmClient = Depends(get_llm)) -&gt; SummarizeResponse:
    raw = llm.complete(PROMPT.format(text=req.text))
    <span class="kw">try</span>:
        <span class="cm"># 出力パース: LLMは指示に反した形式を返しうるので、必ず検証してから通す</span>
        <span class="kw">return</span> SummarizeResponse.model_validate(json.loads(raw))
    <span class="kw">except</span> (json.JSONDecodeError, ValidationError) <span class="kw">as</span> exc:
        <span class="cm"># エラーハンドリング: 握りつぶさず、上流の失敗として502で表明する</span>
        <span class="kw">raise</span> HTTPException(status_code=<span class="nu">502</span>, detail=<span class="st">"LLM応答の形式が不正です"</span>) <span class="kw">from</span> exc`;

const CODE_2 = `<span class="cm"># tests/test_summarize.py</span>
<span class="cm"># 依存: pip install pytest httpx</span>
<span class="cm"># 実行: pytest tests/test_summarize.py</span>
<span class="kw">import</span> pytest
<span class="kw">from</span> fastapi.testclient <span class="kw">import</span> TestClient

<span class="kw">from</span> app.summarize <span class="kw">import</span> app, get_llm

<span class="kw">class</span> FakeLlm:
    <span class="st">""</span><span class="st">"決められた文字列だけを返すフェイク。テストが決定的になる。"</span><span class="st">""</span>

    <span class="kw">def</span> __init__(self, response: str) -&gt; None:
        self._response = response

    <span class="kw">def</span> complete(self, prompt: str) -&gt; str:
        <span class="kw">return</span> self._response

<span class="fn">@pytest</span>.fixture
<span class="kw">def</span> client():
    <span class="kw">yield</span> TestClient(app)
    app.dependency_overrides.clear()

<span class="kw">def</span> override_llm(response: str) -&gt; None:
    app.dependency_overrides[get_llm] = <span class="kw">lambda</span>: FakeLlm(response)

<span class="kw">def</span> test_正常なLLM応答を要約レスポンスへ変換する(client: TestClient) -&gt; None:
    <span class="cm"># Arrange</span>
    override_llm(<span class="st">'{"summary": "本文の要点", "keywords": ["設計", "テスト"]}'</span>)

    <span class="cm"># Act</span>
    res = client.post(<span class="st">"/summarize"</span>, json={<span class="st">"text"</span>: <span class="st">"生成AIアプリの設計について"</span>})

    <span class="cm"># Assert</span>
    <span class="kw">assert</span> res.status_code == <span class="nu">200</span>
    <span class="kw">assert</span> res.json() == {<span class="st">"summary"</span>: <span class="st">"本文の要点"</span>, <span class="st">"keywords"</span>: [<span class="st">"設計"</span>, <span class="st">"テスト"</span>]}

<span class="kw">def</span> test_空文字の入力はバリデーションで拒否する(client: TestClient) -&gt; None:
    <span class="cm"># Arrange</span>
    override_llm(<span class="st">'{"summary": "呼ばれないはず", "keywords": []}'</span>)

    <span class="cm"># Act</span>
    res = client.post(<span class="st">"/summarize"</span>, json={<span class="st">"text"</span>: <span class="st">""</span>})

    <span class="cm"># Assert: LLMに到達する前に422で弾かれる</span>
    <span class="kw">assert</span> res.status_code == <span class="nu">422</span>

<span class="kw">def</span> test_LLMがJSON以外を返したら<span class="nu">502</span>を返す(client: TestClient) -&gt; None:
    <span class="cm"># Arrange</span>
    override_llm(<span class="st">"すみません、要約できませんでした。"</span>)

    <span class="cm"># Act</span>
    res = client.post(<span class="st">"/summarize"</span>, json={<span class="st">"text"</span>: <span class="st">"生成AIアプリの設計について"</span>})

    <span class="cm"># Assert</span>
    <span class="kw">assert</span> res.status_code == <span class="nu">502</span>
    <span class="kw">assert</span> res.json()[<span class="st">"detail"</span>] == <span class="st">"LLM応答の形式が不正です"</span>`;

export default function ArchitectingGenerativeAiApplicationsPage() {
  return (
    <div className="architecting-generative-ai-applications-guide">
      <div className="layout">
        <ArchitectingGenAiSidebar groups={NAV_GROUPS} />
        <main className="main">
          <div className="hero">
            <h1>Architecting Generative AI Applications 徹底解説：プロトタイプから本番運用まで</h1>
            <div className="hero-desc">
              <p>
                本ガイドは、O'Reilly（Packt Publishing刊）『
                <Ext href="https://www.oreilly.com/library/view/architecting-generative-ai/9781806678655/">
                  Architecting Generative AI Applications
                </Ext>
                』（著者：Leonid Kuligin、Google Staff AI
                Engineer、2026年3月刊、全10章・278ページ）の目次構成と主題を土台に、初学者が生成AIアプリケーションを「プロトタイプから本番運用」まで一気通貫でアーキテクチャできるようになることを目標として、独自に再構成した学習ガイドです。原著の文章・図版を複製するものではなく、公開されている目次情報と2026年9月時点の業界動向のリサーチに基づいて、独自の説明・図解・具体例を用いて再構成しています。
              </p>
              <p>
                <strong>本ガイドの構成</strong>：第0部（前提知識）→ 原著Chapter
                1〜10に対応する第1部〜第10部 → 独自追加の第11部（2026年9月時点の最新動向）→
                学習ロードマップ → 実践チェックリスト → 用語集 → 参考文献
              </p>
            </div>
            <div className="hero-pills">
              <span className="pill">初学者〜中級者向け</span>
              <span className="pill">図解 28点</span>
              <span className="pill">表 16件</span>
              <span className="pill">チェックリスト 19項目</span>
              <span className="pill">参考文献 10カテゴリ</span>
            </div>
          </div>

          <h2 id="part0">第0部：なぜ「プロトタイプ」と「本番運用」はこんなにも違うのか</h2>
          <h3 id="01-このガイドが扱う問題">0.1 このガイドが扱う問題</h3>
          <p>
            ChatGPTやClaude、Geminiのような大規模言語モデル（LLM）のAPIを使えば、「動くデモ」を作ること自体は数時間でできてしまいます。しかし、そのデモを「実際のユーザーが安心して使い続けられる本番システム」に育てるには、まったく別の種類のエンジニアリングが必要です。
          </p>
          <p>
            原著者のLeonid Kuligin氏はGoogleのStaff AI
            Engineerであり、本書はまさに「バイブコーディング（vibe-coding）ツールやコーディングアシスタントでプロトタイプを作るのは簡単だが、それを本番に持っていく段階でほとんどのチームがつまずく」という問題意識から書かれています。本ガイドもこの問題意識を軸に、生成AIアプリケーションのライフサイクル全体を扱います。
          </p>
          <h3 id="02-生成aiアプリケーション開発の全体ライフサイクル">
            0.2 生成AIアプリケーション開発の全体ライフサイクル
          </h3>
          <p>
            まず、これから学んでいく内容が開発ライフサイクルのどこに位置するのかを俯瞰しましょう。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_1} preserveNaturalScale={true} />
          </div>
          <p>
            このループが示すとおり、生成AIアプリケーション開発は一直線のウォーターフォールではなく、
            <strong>評価とA/Bテストの結果が次の設計にフィードバックされ続ける循環型プロセス</strong>
            です。従来のソフトウェア開発と決定的に違うのは、「入力に対して常に同じ出力が返る」という前提が崩れている点にあります。これが、評価（第2部）、LLMOps（第5部）、観測性（第8部）という3つの柱が本書全体を貫くテーマになっている理由です。
          </p>
          <h3 id="03-前提知識の整理">0.3 前提知識の整理</h3>
          <p>
            本ガイドは中級者（ソフトウェアエンジニア、QAエンジニア、データサイエンティスト）を主な対象としますが、以下の基礎用語だけ先に押さえておきます。
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>用語</th>
                  <th>意味</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>LLM（大規模言語モデル）</td>
                  <td>
                    大量のテキストで訓練され、次に来るトークンを予測することで文章生成・要約・翻訳・コード生成などを行うモデル
                  </td>
                </tr>
                <tr className="even">
                  <td>トークン</td>
                  <td>
                    LLMがテキストを処理する際の最小単位（単語の一部やサブワード）。課金や文脈長の制限はトークン数で決まる
                  </td>
                </tr>
                <tr className="odd">
                  <td>プロンプト</td>
                  <td>
                    LLMに与える入力指示文。システムプロンプト・ユーザープロンプト・Few-shot例などから構成される
                  </td>
                </tr>
                <tr className="even">
                  <td>埋め込み（エンベディング）</td>
                  <td>
                    テキストを高次元のベクトルに変換したもの。意味的な近さをベクトル間の距離で表現できる
                  </td>
                </tr>
                <tr className="odd">
                  <td>RAG（Retrieval-Augmented Generation）</td>
                  <td>LLMの回答生成前に外部知識源から関連情報を検索し、プロンプトに含める手法</td>
                </tr>
                <tr className="even">
                  <td>エージェント</td>
                  <td>
                    LLMが自律的にツール呼び出し・計画・振り返りを繰り返しながらタスクを遂行する仕組み
                  </td>
                </tr>
                <tr className="odd">
                  <td>ハルシネーション</td>
                  <td>LLMが事実に基づかない、もっともらしい誤情報を生成する現象</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            これらの用語は本ガイド全体で繰り返し登場するため、わからなくなったら
            <a href="#glossary">用語集</a>に戻ってください。
          </p>
          <h2 id="part1">第1部：プロトタイプを構築する</h2>
          <h3 id="11-成功するaiプロトタイプの秘訣">1.1 「成功するAIプロトタイプ」の秘訣</h3>
          <p>
            生成AIプロトタイプが失敗する最大の理由は、技術的な問題ではなく「何を検証したいのかが曖昧なまま作り始めてしまう」ことです。成功するプロトタイプには共通して次の特徴があります。
          </p>
          <ul>
            <li>
              <strong>検証したい仮説が1つに絞られている</strong>
              （例：「この業界特有の質問にLLMが十分な精度で答えられるか」）
            </li>
            <li>
              <strong>成功・失敗の判定基準が事前に定義されている</strong>（第2部の評価設計と直結）
            </li>
            <li>
              <strong>スコープが意図的に小さい</strong>
              （全機能を作り込まず、仮説検証に必要な最小限に留める）
            </li>
          </ul>
          <h3 id="12-大企業でのpoc立ち上げ-vs-スタートアップでのpoc立ち上げ">
            1.2 大企業でのPoC立ち上げ vs スタートアップでのPoC立ち上げ
          </h3>
          <p>
            同じ「概念実証（PoC）」でも、組織の置かれた状況によって最適なアプローチは異なります。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_2} preserveNaturalScale={true} />
          </div>
          <p>
            大企業ではガバナンスとスケーラビリティが先に問われる一方、スタートアップでは「そもそも顧客が欲しがるものか」を最速で検証することが優先されます。
          </p>
          <h3 id="13-生成aiが何を変えたのか">1.3 生成AIが何を変えたのか</h3>
          <p>
            従来の機械学習プロダクト開発と比較して、生成AIは開発サイクルの前提を大きく変えました。
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>観点</th>
                  <th>従来の機械学習プロダクト</th>
                  <th>生成AIプロダクト</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>モデル構築の起点</td>
                  <td>自社データでゼロから学習・ファインチューニング</td>
                  <td>汎用の基盤モデルAPIをまず呼び出すだけで動く</td>
                </tr>
                <tr className="even">
                  <td>プロトタイプ着手までの時間</td>
                  <td>数週間〜数ヶ月（データ収集・前処理が先）</td>
                  <td>数時間〜数日（プロンプトだけで検証可能）</td>
                </tr>
                <tr className="odd">
                  <td>出力の性質</td>
                  <td>決定的、または確率分布として扱いやすい</td>
                  <td>非決定的で自由形式のテキスト・マルチモーダル出力</td>
                </tr>
                <tr className="even">
                  <td>評価の難しさ</td>
                  <td>正解ラベルとの比較が容易な場合が多い</td>
                  <td>「良い回答」の定義自体が主観的・文脈依存</td>
                </tr>
                <tr className="odd">
                  <td>主なボトルネック</td>
                  <td>データ収集とモデル学習</td>
                  <td>評価設計・信頼性・コスト管理・ガードレール</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 id="14-生成ai開発における誤解misconceptions">
            1.4 生成AI開発における誤解（Misconceptions）
          </h3>
          <p>初学者やプロトタイプ止まりのチームが陥りがちな誤解を整理します。</p>
          <ul>
            <li>
              <strong>誤解1：「デモがうまくいったから本番でも大丈夫」</strong> →
              デモは往々にして開発者自身が「LLMが得意な入力」だけを選んで見せているため、実際の多様なユーザー入力での挙動を保証しません。
            </li>
            <li>
              <strong>誤解2：「モデルを最新版に上げれば品質は自動的に上がる」</strong>→
              プロンプトや評価データセットとモデルの相性が変わり、既存の挙動が壊れる（レグレッション）ことも珍しくありません。第5部・第10部で扱う継続的評価が必須になる理由です。
            </li>
            <li>
              <strong>誤解3：「評価は最後にまとめてやればいい」</strong> →
              評価基準を後回しにすると、途中の意思決定（プロンプト変更、アーキテクチャ選定）が勘に頼ったものになります。第2部で詳しく扱うように、評価はプロトタイプ段階から並走させるべき活動です。
            </li>
            <li>
              <strong>誤解4：「生成AIだから通常のソフトウェア工学のプラクティスは不要」</strong>→
              実際にはコードの可読性・単体テスト・CI/CDといった標準的なプラクティス（第4部・第5部）がむしろ重要性を増します。
            </li>
          </ul>
          <h2 id="part2">第2部：生成AIアプリケーションを評価する</h2>
          <h3 id="21-なぜ評価がこれほど重要なのか">2.1 なぜ評価がこれほど重要なのか</h3>
          <p>
            従来の機械学習では「テストセットに対する正解率」のようにゴールが明確でした。しかし生成AIでは、同じ質問でも文脈や表現の異なる複数の回答が「どれも正解」でありえます。この曖昧さに向き合うための体系立った評価フレームワークが、本書全体で最も重厚に扱われるテーマの一つです。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_3} preserveNaturalScale={true} />
          </div>
          <h3 id="22-機械学習における汎化generalizationとmlライフサイクルの復習">
            2.2 機械学習における汎化（Generalization）とMLライフサイクルの復習
          </h3>
          <p>
            生成AIの評価を理解する前提として、機械学習の基本ライフサイクル（データ収集→学習→検証→デプロイ→モニタリング）を思い出しておく価値があります。生成AIではこのライフサイクルの「学習」部分の多くを基盤モデル提供者（OpenAI、Anthropic、Googleなど）が担うため、開発者が主に責任を持つのは「検証（評価）」「デプロイ」「モニタリング」の部分に集中します。汎化性能、つまり「訓練時に見ていない入力にどれだけうまく対応できるか」という観点は、プロンプトエンジニアリングやRAGの設計においても変わらず中心的な関心事です。
          </p>
          <h3 id="23-メトリクスベース評価分類問題としての生成ai">
            2.3 メトリクスベース評価：分類問題としての生成AI
          </h3>
          <p>
            生成AIのタスクの一部は、実は分類問題として定式化できます（例：問い合わせのカテゴリ分類、感情分析、意図判定）。
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>指標</th>
                  <th>意味</th>
                  <th>適したタスク例</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>Precision（適合率）</td>
                  <td>「陽性」と予測したうち実際に正しかった割合</td>
                  <td>誤検知のコストが高いタスク（例：不正検知）</td>
                </tr>
                <tr className="even">
                  <td>Recall（再現率）</td>
                  <td>実際の陽性のうち正しく検出できた割合</td>
                  <td>見逃しのコストが高いタスク（例：医療スクリーニング）</td>
                </tr>
                <tr className="odd">
                  <td>F1スコア</td>
                  <td>PrecisionとRecallの調和平均</td>
                  <td>両者のバランスを取りたい場合</td>
                </tr>
                <tr className="even">
                  <td>マクロ平均/マイクロ平均</td>
                  <td>多クラス分類での指標の集約方法</td>
                  <td>クラス数が多い意図分類タスクなど</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            二値分類（Binary
            classification）ではPrecision/Recall/F1がそのまま使えますが、多クラス分類（Multi-class
            classification）では「マクロ平均（各クラスを平等に扱う）」と「マイクロ平均（サンプル数で重み付けする）」のどちらを使うかで結論が変わる点に注意が必要です。クラスの出現頻度に大きな偏りがあるデータセットでは、この選択がプロダクト判断を左右します。
          </p>
          <h3 id="24-テキスト比較の指標と検索の指標">2.4 テキスト比較の指標と検索の指標</h3>
          <p>
            自由形式のテキスト生成タスクでは、BLEU・ROUGE・BERTScoreのような指標で生成文と参照文の類似度を測ります。ただしこれらは表層的な語の一致（BLEU/ROUGE）や埋め込み空間での意味的類似度（BERTScore）を測るものであり、「事実として正しいか」までは保証しません。
          </p>
          <p>検索（Retrieval）コンポーネントの評価には、情報検索分野で確立された指標を使います。</p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>指標</th>
                  <th>意味</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>Recall@k</td>
                  <td>上位k件の検索結果の中に正解文書がどれだけ含まれているか</td>
                </tr>
                <tr className="even">
                  <td>MRR（Mean Reciprocal Rank）</td>
                  <td>最初に正解が現れる順位の逆数の平均。上位に正解が来るほど高スコア</td>
                </tr>
                <tr className="odd">
                  <td>NDCG（Normalized Discounted Cumulative Gain）</td>
                  <td>順位を考慮した関連度スコアの累積。関連度に段階がある場合に有効</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 id="25-llm-as-a-judgellmに評価させるという発想">
            2.5 LLM-as-a-Judge：LLMに評価させるという発想
          </h3>
          <p>
            人手評価はコストが高く、スケールしません。そこで近年主流になっているのが「LLM自身に評価させる（LLM-as-a-Judge）」というアプローチです。2026年時点でこの手法は3つのパターンに整理されています。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_4} preserveNaturalScale={true} />
          </div>
          <ul>
            <li>
              <strong>基準なし評価</strong>
              ：模範解答を用意する手間がない代わりに、判定基準が曖昧になりやすい
            </li>
            <li>
              <strong>基準あり評価</strong>
              ：最も再現性が高いが、模範解答（ゴールデンアンサー）を維持するコストがかかる
            </li>
            <li>
              <strong>ペアワイズ比較</strong>
              ：2つのモデル・プロンプトのA/B比較に強いが、判定順序による位置バイアスが起きやすい
            </li>
          </ul>
          <p>
            2026年の実務知見として、LLM審査者には<strong>位置バイアス</strong>
            （先に提示された回答を好む）、<strong>冗長性バイアス</strong>
            （長い回答を高く評価しがち）、<strong>自己贔屓バイアス</strong>
            （同じモデルファミリーの出力を過大評価する）という3つの系統的な偏りが確認されており、これらを緩和する具体策が定着しています。
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>バイアスの種類</th>
                  <th>内容</th>
                  <th>緩和策</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>位置バイアス</td>
                  <td>提示順序によって評価が変わる</td>
                  <td>回答の提示順をランダム化し、両方向で採点して平均を取る</td>
                </tr>
                <tr className="even">
                  <td>冗長性バイアス</td>
                  <td>長い回答を無条件に高評価する傾向</td>
                  <td>評価基準に「簡潔さ」を明示的な採点軸として含める</td>
                </tr>
                <tr className="odd">
                  <td>自己贔屓バイアス</td>
                  <td>判定に使うモデルと同系統の出力を過大評価</td>
                  <td>判定用モデルを被評価対象と異なるベンダー・世代にする</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            さらに、Chain-of-Thought形式でLLM審査者に採点理由を明示的に書かせてから最終スコアを出させる手法（G-Eval等）は、単純に点数だけを出させる場合と比べて人間の評価との一致度（Cohenのカッパ係数など）を大きく改善することが確認されています。実務では、LLM審査者を導入した後も
            <strong>定期的に人間の専門家によるサンプル抽出評価</strong>
            を行い、審査者自体がドリフトしていないかを検証する「審査者のキャリブレーション」が標準的な運用になっています。
          </p>
          <h3 id="26-コンセンサス複数審査者の合議">2.6 コンセンサス（複数審査者の合議）</h3>
          <p>
            単一のLLM審査者に依存するリスクを下げるため、複数のモデル・複数のプロンプトで採点させて多数決や平均を取る「陪審員（Jury）」方式も広く使われています。1つの審査モデルに強く依存する体制よりコストは上がりますが、系統的バイアスの影響を平均化できるという利点があります。
          </p>
          <h3 id="27-human-in-the-loophitl評価の実装">2.7 Human-in-the-Loop（HITL）評価の実装</h3>
          <p>
            すべてを自動化することはできません。特に、法規制が絡む領域（医療・金融・法務）や、ブランド毀損リスクが大きい出力については、人間によるレビューを組み込む必要があります。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_5} preserveNaturalScale={true} />
          </div>
          <p>
            HITLをスケールさせる（Scaling and operationalizing human
            evaluation）ためには、レビュー担当者向けのガイドラインの明文化、アノテーション者間の一致率（Inter-Annotator
            Agreement）の計測、そしてレビュー結果を継続的に自動評価パイプラインへフィードバックする仕組みが欠かせません。
          </p>
          <h3 id="28-より複雑な評価シナリオragとエージェントの評価">
            2.8 より複雑な評価シナリオ：RAGとエージェントの評価
          </h3>
          <p>
            <strong>RAGアプリケーションの評価</strong>
            は、検索（Retrieval）と生成（Generation）を分けて評価する「コンポーネント分解評価」が定石です。
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>評価軸</th>
                  <th>何を測るか</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>Context Precision（文脈適合率）</td>
                  <td>検索された文脈のうち、実際に回答に必要な情報がどれだけ含まれるか</td>
                </tr>
                <tr className="even">
                  <td>Context Recall（文脈再現率）</td>
                  <td>回答に必要な情報のうち、検索で拾えた割合</td>
                </tr>
                <tr className="odd">
                  <td>Faithfulness（忠実性）</td>
                  <td>
                    生成された回答が検索された文脈にどれだけ忠実か（ハルシネーションの逆指標）
                  </td>
                </tr>
                <tr className="even">
                  <td>Answer Relevancy（回答関連性）</td>
                  <td>生成された回答が元の質問にどれだけ関連しているか</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>エージェントの評価</strong>
            はさらに複雑で、単一のターン評価ではなく「軌跡（Trajectory）」全体を評価する必要があります。具体的には、（1）タスクを最終的に完遂できたかという
            <strong>タスク成功率</strong>、（2）不要なツール呼び出しや遠回りをしていないかという
            <strong>効率性</strong>、（3）各ステップでの<strong>ツール選択の正しさ</strong>
            、（4）途中で誤った判断をしても軌道修正できる<strong>回復力（Resilience）</strong>
            、という4つの軸で評価するのが2026年時点の標準的なアプローチです。
          </p>
          <h2 id="part3">第3部：主要アーキテクチャを理解する</h2>
          <h3 id="31-プロンプトテンプレートの組織化とバージョン管理">
            3.1 プロンプトテンプレートの組織化とバージョン管理
          </h3>
          <p>
            プロンプトは「一度書いたら終わり」のものではなく、コードと同じように
            <strong>バージョン管理・レビュー・A/Bテストの対象</strong>
            として扱うべき成果物です。2026年時点では、プロンプトをアプリケーションコードから切り離し、専用の「プロンプトレジストリ」で一元管理する構成が主流になっています。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_6} preserveNaturalScale={true} />
          </div>
          <p>
            プロンプトをコードから分離しておくメリットは、非エンジニアのプロンプトエンジニアがアプリケーションの再デプロイなしにプロンプトを更新でき、かつすべての変更履歴が追跡可能になる点です。
          </p>
          <h3 id="32-ベクトルデータベースによる埋め込みの保存と検索">
            3.2 ベクトルデータベースによる埋め込みの保存と検索
          </h3>
          <p>
            RAGの中核となるのが、テキストを埋め込みベクトルに変換して保存し、意味的な近さで検索するベクトルデータベースです。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_7} preserveNaturalScale={true} />
          </div>
          <p>
            チャンク分割の粒度（固定長 vs
            見出し・意味単位での分割）、埋め込みモデルの選定、近似最近傍探索（ANN）のアルゴリズム（HNSWなど）はいずれもRAGの検索品質を大きく左右するチューニングポイントです。
          </p>
          <h3 id="33-ハイブリッド検索とリランキング">3.3 ハイブリッド検索とリランキング</h3>
          <p>
            純粋なベクトル検索（意味検索）には弱点があります。製品型番やエラーコードのような「厳密な文字列一致が必要な検索」には向いていません。そこで、キーワード検索（BM25などの疎ベクトル）とベクトル検索（密ベクトル）を組み合わせる
            <strong>ハイブリッド検索</strong>が2026年時点の本番標準になっています。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_8} preserveNaturalScale={true} />
          </div>
          <p>
            Reciprocal Rank
            Fusion（RRF）は、複数の検索結果の「順位」だけを使ってスコアを再計算する軽量な統合手法で、実装が簡単な割に効果が高いことから広く使われています。さらに、候補文書を絞り込んだ後にクロスエンコーダー型のリランカー（質問と文書のペアを直接読んで関連度を再評価するモデル）を通すことで、検索精度が大きく向上することが2026年の複数のベンチマーク研究で確認されています。一方でクロスエンコーダーは1件ずつ計算コストがかかるため、「まず粗く数千件から数十件に絞り込み、その少数だけを精密にリランキングする」という2段階構成が定石です。
          </p>
          <h4 id="インバーテッドインデックス転置インデックス">
            インバーテッドインデックス（転置インデックス）
          </h4>
          <p>
            BM25のようなキーワード検索の裏側では、「単語→その単語を含む文書のリスト」という転置インデックスが使われています。これは検索エンジンの基礎技術であり、ベクトル検索が普及した現在でも、完全一致・部分一致が重要な場面では欠かせない仕組みです。
          </p>
          <h4 id="クエリ拡張query-expansion">クエリ拡張（Query Expansion）</h4>
          <p>
            ユーザーの質問をそのまま検索クエリとして使うのではなく、LLMを使って類義語や関連語を含む複数のクエリに展開してから検索する手法です。ユーザーの語彙と文書の語彙にズレがある場合（専門用語
            vs 平易な言葉など）に有効です。
          </p>
          <h3 id="34-限られたコンテキストウィンドウへの対処mapreduceパターン">
            3.4 限られたコンテキストウィンドウへの対処：MapReduceパターン
          </h3>
          <p>
            大量の文書を一度に要約・分析したいが、LLMのコンテキストウィンドウに収まらない場合、分散処理でおなじみのMapReduceパターンが応用できます。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_9} preserveNaturalScale={true} />
          </div>
          <p>
            長いコンテキストウィンドウを持つモデルが増えた2026年現在でも、コスト・レイテンシ・「干し草の中の針（Needle
            in a
            Haystack）」問題（コンテキストが長くなるほど重要な情報が埋もれて見落とされやすくなる現象）の観点から、MapReduce的な分割統治は依然として有効な設計パターンです。
          </p>
          <h3 id="35-エージェンティックアーキテクチャの探求">
            3.5 エージェンティックアーキテクチャの探求
          </h3>
          <p>
            生成AIアプリケーションの中でも特に設計判断が難しいのが、LLMが自律的にツールを呼び出しながらタスクを遂行する「エージェント」です。Anthropicが公開した"Building
            Effective
            Agents"などの実務知見をもとに、2026年時点で整理されている代表的なパターンを見ていきます。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_10} preserveNaturalScale={true} />
          </div>
          <h4 id="ツール呼び出しtool-calling">ツール呼び出し（Tool Calling）</h4>
          <p>
            エージェントの最も基本的な能力です。LLMに利用可能なツール（関数）の一覧とその引数スキーマを渡すと、LLMは「どのツールを、どんな引数で呼ぶべきか」を構造化データとして返します。呼び出し自体はアプリケーション側のコードが実行し、その結果を再びLLMに渡して次の判断を仰ぐ、というループを繰り返します。
          </p>
          <h4 id="タスク分解とtree-of-thoughts">タスク分解とTree of Thoughts</h4>
          <p>
            複雑なタスクを一度に解こうとせず、サブタスクに分解してから順に取り組む「タスク分解」、さらに複数の解法候補を並行して探索し、有望な枝だけを深掘りする「Tree
            of Thoughts」という推論戦略があります。これらは、単純な逐次推論（Chain of
            Thought）よりも探索的な問題（パズル、複雑な計画立案）で有効です。
          </p>
          <h4 id="マルチエージェントシステムと外部オーケストレーター">
            マルチエージェントシステムと外部オーケストレーター
          </h4>
          <p>
            複数のエージェントを協調させる設計では、「1つのリードエージェントがタスクを分割し、専門特化したサブエージェントに委譲し、結果を統合する」オーケストレーター・ワーカー方式が代表的です。Anthropic自身の研究では、この方式が単一エージェントに対して評価ベンチマークで大幅な性能向上を示した一方、トークン消費量が数倍〜十数倍に増えることも報告されており、
            <strong>
              「タスクが本当に並列分解可能かどうか」を見極めてから採用すべき、コストの高いパターン
            </strong>
            であることが強調されています。
          </p>
          <p>
            エージェント自体にすべての制御ロジックを埋め込むのではなく、LangGraphやTemporalのような
            <strong>外部オーケストレーター</strong>
            （ワークフローエンジン）にリトライ・タイムアウト・人間の承認ステップ・状態管理を任せる設計も広く採用されています。特にTemporalのような「耐久実行（Durable
            Execution）」基盤は、長時間動作するエージェントが途中でクラッシュしても状態を失わずに再開できる点で評価されています。
          </p>
          <h4 id="ツール呼び出しパターンの運用化">ツール呼び出しパターンの運用化</h4>
          <p>
            本番運用では、ツールへのアクセス権限を必要最小限に絞る「最小権限の原則」、高リスクな操作（決済実行、外部送信、破壊的な書き込みなど）には人間の承認を挟む「Human-in-the-Loop」、そしてツールの入出力をすべて監査ログに残すことが必須になります。これは第7部で扱うセキュリティの話題と直結します。
          </p>
          <h4 id="エージェンティックメモリ">エージェンティックメモリ</h4>
          <p>
            エージェントが単発のタスクだけでなく、複数セッションにまたがる文脈を保持するには「メモリ」の設計が必要です。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_11} preserveNaturalScale={true} />
          </div>
          <p>
            短期メモリ（今の会話のコンテキストウィンドウ内）、エピソード記憶（過去のタスク実行の要約）、長期記憶（ユーザーの恒久的な設定や学習した事実）という3層構造で設計するのが一般的です。メモリに何を残すか・いつ要約するかの設計を誤ると、古い誤情報がメモリに固定化されてしまう「メモリ汚染」のリスクがあるため、書き戻しには何らかの検証ステップを挟むことが推奨されます。
          </p>
          <h2 id="part4">第4部：プロトタイプから本番コードへ</h2>
          <h3 id="41-なぜオペレーション化operationalizationが重要なのか">
            4.1 なぜ「オペレーション化（Operationalization）」が重要なのか
          </h3>
          <p>
            Jupyterノートブックに書き殴ったプロトタイプのコードをそのまま本番に持っていくと、他のエンジニアが読めない・保守できない・テストできないという問題に直面します。生成AIアプリケーションであっても、ソフトウェア工学の基本原則が適用されるべき理由がここにあります。
          </p>
          <h3 id="42-コードの可読性を高める">4.2 コードの可読性を高める</h3>
          <p>
            Pythonでコードを読みやすくする基本は、意味のある変数名・関数の単一責任・型ヒントの活用・不要なネストの削減です。生成AI特有の注意点としては、プロンプト文字列をコード中にベタ書きせず、ロジックとプロンプトテンプレートを明確に分離することが挙げられます（3.1節のプロンプトレジストリの考え方と直結します）。
          </p>
          <h3 id="43-拡張しやすいコードにするsolid原則の中心的な2つ">
            4.3 拡張しやすいコードにする：SOLID原則の中心的な2つ
          </h3>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_12} preserveNaturalScale={true} />
          </div>
          <p>
            生成AIアプリケーションにおける<strong>疎結合</strong>
            は特に重要です。例えば「どのLLMプロバイダーを使うか」「どのベクトルデータベースを使うか」をアプリケーションロジックから抽象化しておけば、モデルの入れ替え（GPTからClaudeへ、Pineconeから自社ホスティングのpgvectorへ、など）がアプリケーションコード全体への大改修なしに行えます。これは第3部で触れたLLMゲートウェイの設計思想とも一致します。
          </p>
          <h3 id="44-テスト戦略単体統合負荷テスト">4.4 テスト戦略：単体・統合・負荷テスト</h3>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_13} preserveNaturalScale={true} />
          </div>
          <p>
            生成AIアプリケーションの単体テストでは、「LLM呼び出し自体をモック化し、周辺のビジネスロジック（入力のバリデーション、出力のパース、エラーハンドリング）を決定的にテストする」ことが基本になります。LLMの出力そのものの品質評価は、単体テストではなく第2部で扱った評価パイプライン（オフライン評価・LLM-as-a-Judge）の役割です。この線引きを曖昧にすると、「LLMの気まぐれでテストが落ちたり通ったりする」という不安定なテストスイートになってしまいます。
          </p>
          <p>
            統合テストでは、RAGパイプライン全体（検索→生成→後処理）や外部API（決済、CRMなど）との連携を、実際に近い環境で検証します。負荷テストでは、同時多数のリクエストが来た際のレイテンシ悪化・レート制限への抵触・コスト急増を事前に把握します。
          </p>
          <h4 id="実装例llm呼び出しをモック化した単体テスト">
            実装例：LLM呼び出しをモック化した単体テスト
          </h4>
          <p>
            「LLM呼び出しをモック化して周辺ロジックを決定的に検証する」を、そのまま動かせる形にしたものが以下です。ポイントは
            <strong>LLMクライアントを依存性注入（DI）で受け取ること</strong>
            で、これによりテスト側が実API呼び出しなしで差し替えられます。
          </p>
          <pre className="code-block" dangerouslySetInnerHTML={{ __html: CODE_1 }} />
          <pre className="code-block" dangerouslySetInnerHTML={{ __html: CODE_2 }} />
          <p>
            3つのテストはいずれもLLM
            APIを呼ばないため、ネットワークもAPIキーも不要で、実行時間もミリ秒単位です。「入力バリデーション」「出力パース」「エラーハンドリング」という決定的に検証できる部分をここで固め、確率的な出力品質の検証は評価パイプラインへ分離する、という役割分担がテスト戦略の骨格になります。
          </p>
          <h3 id="45-シンプルに保つことの価値そして近道の代償">
            4.5 シンプルに保つことの価値、そして「近道」の代償
          </h3>
          <p>
            「動くから」という理由だけで応急処置的な実装（クイックフィックス）を重ねると、後から本質的な設計変更をする際の技術的負債になります。特に生成AIプロジェクトでは「とりあえずプロンプトに条件分岐を足す」という近道が繰り返されがちで、これがプロンプトの肥大化・保守不能化を招く典型的な失敗パターンです。複雑なロジックはプロンプトではなくコード側の分岐や、専用のツール呼び出しに切り出す判断が重要になります。
          </p>
          <h3 id="46-ユーザーオンボーディング">4.6 ユーザーオンボーディング</h3>
          <p>
            本番アプリケーションでは、ユーザーが生成AI機能の能力と限界を正しく理解できるようにするオンボーディング設計も欠かせません。何ができて何ができないのかを最初に明示し、ハルシネーションのリスクがある領域では出典表示や確信度の提示を行うことが、ユーザーの信頼構築とプロダクトの継続利用に直結します。
          </p>
          <h2 id="part5">第5部：DevOps・MLOpsからLLMOpsへ</h2>
          <h3 id="51-devopsの復習cicdとは何か">5.1 DevOpsの復習：CI/CDとは何か</h3>
          <p>
            DevOpsは「コード変更を自動的にビルド・テスト・デプロイする仕組み（継続的インテグレーション/継続的デリバリー、CI/CD）」を通じて、開発と運用の壁を取り払う文化・実践の総称です。生成AI時代であっても、この基盤は変わらず必要です。
          </p>
          <h3 id="52-mlops機械学習パイプラインと成功指標">
            5.2 MLOps：機械学習パイプラインと成功指標
          </h3>
          <p>
            MLOpsはDevOpsの考え方を機械学習に拡張したもので、データの前処理・モデル学習・検証・デプロイ・モニタリングを含む「MLパイプライン」を自動化・再現可能にすることを目指します。MLOpsにおける成功指標は、モデル精度だけでなく、パイプラインの再現性、デプロイまでのリードタイム、モデルドリフトの検知速度などを含みます。
          </p>
          <h3 id="53-llmopsの誕生何が新しく必要になったのか">
            5.3 LLMOpsの誕生：何が新しく必要になったのか
          </h3>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_14} preserveNaturalScale={true} />
          </div>
          <p>
            LLMOpsがMLOpsに単純に上乗せする要素として、2026年時点で実務的にコンセンサスが取れているのは次の点です。
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>MLOpsにはなかった新要素</th>
                  <th>内容</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>プロンプトのバージョン管理</td>
                  <td>
                    プロンプトはもはや「ちょっとした指示文」ではなく、テスト・A/Bテスト・継続的最適化の対象となる本番システムの構成要素
                  </td>
                </tr>
                <tr className="even">
                  <td>評価駆動開発（Evaluation-first）</td>
                  <td>
                    「とりあえずデプロイして様子を見る」から、リグレッションを事前に検知する体系的なテストへの転換
                  </td>
                </tr>
                <tr className="odd">
                  <td>マルチステップ・エージェントワークフローの追跡</td>
                  <td>
                    単一の推論ではなく、複数ステップにまたがるエージェントの意思決定過程をトレースする必要性
                  </td>
                </tr>
                <tr className="even">
                  <td>トークン単位のコスト帰属</td>
                  <td>
                    どのユーザー・機能・リクエストがどれだけのトークンコストを消費しているかを可視化する必要性
                  </td>
                </tr>
                <tr className="odd">
                  <td>モデルプロバイダーの多様化への対応</td>
                  <td>
                    複数のLLMプロバイダー・複数世代のモデルを併用しながら、それぞれの評価・ルーティングを管理する必要性
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            2026年の業界調査では、LLMOpsプラットフォーム市場において「評価・観測性・プロンプト管理を1つの統合ワークフローで扱う」ことが差別化の主戦場になっており、これによって開発チームは「本番ログの分析→テストケース作成→評価実行→改善のデプロイ」というサイクルを大幅に高速化できると報告されています。
          </p>
          <h3 id="54-llmopsツールの選び方">5.4 LLMOpsツールの選び方</h3>
          <p>LLMOpsツールを選定する際の主な評価軸を整理します。</p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>評価軸</th>
                  <th>確認すべきポイント</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>トレーシング</td>
                  <td>マルチステップのエージェント実行を1つのトレースとして可視化できるか</td>
                </tr>
                <tr className="even">
                  <td>評価機能</td>
                  <td>
                    オフライン評価（CI連携）とオンライン評価（本番トラフィック）の両方に対応しているか
                  </td>
                </tr>
                <tr className="odd">
                  <td>プロンプト管理</td>
                  <td>プロンプトのバージョン管理・環境別デプロイ・ロールバックができるか</td>
                </tr>
                <tr className="even">
                  <td>ベンダーロックイン</td>
                  <td>OpenTelemetryのような標準規格に準拠し、バックエンドを切り替え可能か</td>
                </tr>
                <tr className="odd">
                  <td>コスト</td>
                  <td>トークン単位のコスト、機能単位のコスト帰属が可視化できるか</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 id="55-ケーススタディragアプリケーションのためのcicdジョブ">
            5.5 ケーススタディ：RAGアプリケーションのためのCI/CDジョブ
          </h3>
          <p>
            RAGアプリケーションのCI/CDパイプラインを具体的に見てみましょう。通常のアプリケーションのCI/CDに加えて、「検索品質」と「生成品質」の両方をゲートにする必要があります。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_15} preserveNaturalScale={true} />
          </div>
          <p>
            このパイプラインのポイントは、
            <strong>
              プロンプトやRAG設定の変更を、通常のコード変更と同じくPull
              Requestベースでレビュー・自動テストの対象にする
            </strong>
            ことです。これにより、「なんとなくプロンプトを直したら精度が落ちた」という事故を、マージ前に機械的に検知できるようになります。
          </p>
          <h2 id="part6">第6部：アプリケーションをデプロイする</h2>
          <h3 id="61-ステートレスなアプリケーションとステートフルなアプリケーション">
            6.1 ステートレスなアプリケーションとステートフルなアプリケーション
          </h3>
          <p>
            デプロイ設計の最初の分岐点は、アプリケーションが「状態（ステート）」をどこに持つかです。
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>特性</th>
                  <th>ステートレス</th>
                  <th>ステートフル</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>リクエスト間の状態保持</td>
                  <td>サーバー側では持たない（各リクエストが独立）</td>
                  <td>サーバー側でセッション状態を保持する</td>
                </tr>
                <tr className="even">
                  <td>スケーリングのしやすさ</td>
                  <td>容易（どのインスタンスにルーティングしてもよい）</td>
                  <td>難しい（同じセッションは同じインスタンスに固定する必要がある場合がある）</td>
                </tr>
                <tr className="odd">
                  <td>典型例</td>
                  <td>単発のプロンプト補完API</td>
                  <td>長時間の会話履歴やエージェントの実行状態を持つセッション</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            生成AIアプリケーション、特にマルチターンの会話やエージェント実行では、状態管理そのものはRedisや専用の「セッションストア」（第9部で詳述）に外出しし、
            <strong>アプリケーションサーバー自体は極力ステートレスに保つ</strong>
            のが2026年時点の定石です。これにより、アプリケーション層は水平スケーリングが容易になります。
          </p>
          <h3 id="62-デプロイのベストプラクティス">6.2 デプロイのベストプラクティス</h3>
          <h4 id="infrastructure-as-codeiac">Infrastructure as Code（IaC）</h4>
          <p>
            インフラをコードとして宣言的に管理することで、環境間の差異（開発・ステージング・本番）をなくし、変更履歴をコードのバージョン管理と同じ仕組みで追跡できます。生成AIアプリケーションでは、ベクトルデータベースのインスタンス、GPU/TPUリソース、モデルサービングエンドポイントの定義もIaCの対象に含めるべきです。
          </p>
          <h4 id="シークレット管理と構成管理">シークレット管理と構成管理</h4>
          <p>
            APIキー・データベース認証情報などのシークレットはコードやコンテナイメージに埋め込まず、専用のシークレット管理サービスから実行時に注入します。構成管理（環境変数、フィーチャーフラグ）も同様に、コードの再デプロイなしに変更できる仕組みにしておくことで、プロンプトやモデルのバージョン切り替えを迅速に行えます。
          </p>
          <h3 id="63-アプリケーションのデプロイ方式">6.3 アプリケーションのデプロイ方式</h3>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_16} preserveNaturalScale={true} />
          </div>
          <p>
            <strong>コードをWeb APIとしてラップする</strong>
            ことで、フロントエンドや他のマイクロサービスから標準的なHTTP/gRPCインターフェースで呼び出せるようになります。
            <strong>Kubernetesへのデプロイ</strong>
            では、通常のマイクロサービスと同様にヘルスチェック・オートスケーリング・ローリングアップデートの仕組みを活用しつつ、GPU/TPUノードプールの扱いや、モデルのロード時間を考慮したReadiness
            Probeの設計が生成AI特有の考慮点になります。一方、
            <strong>マネージドサービス経由のデプロイ</strong>
            は、自前でインフラを持たずに評価・トレーシング・デプロイまでを統合的に扱える利点があり、特に小規模チームやスピード重視のプロダクトで採用が進んでいます。
          </p>
          <h3 id="64-アプリケーションをスケールさせるベストプラクティス">
            6.4 アプリケーションをスケールさせるベストプラクティス
          </h3>
          <h4 id="キャッシングとcap定理">キャッシングとCAP定理</h4>
          <p>
            生成AI呼び出しはレイテンシとコストの両面で高くつくため、キャッシングは最も費用対効果の高い最適化の一つです。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_17} preserveNaturalScale={true} />
          </div>
          <p>
            <strong>キャッシュは認可境界の内側に置く。</strong>
            生成AIのキャッシュで最も危険な失敗は、性能ではなく情報漏洩です。特にセマンティックキャッシュは「文面が似ている」だけで別ユーザーの回答を再利用しうるため、素朴に実装するとテナント間・ユーザー間のデータ漏洩経路になります。最低限、次の3点を設計に組み込んでください。
          </p>
          <ol type="1">
            <li>
              <strong>キーまたは領域を分離する</strong>
              ：キャッシュキー（あるいは名前空間そのもの）に
              <code>tenant_id</code>・<code>user_id</code>
              ・認可スコープ（ロールや許可されたデータ範囲）・参照データの版（インデックスのバージョン等）を含める。セマンティック検索も、この分離された領域の内側だけを探索範囲にする。
            </li>
            <li>
              <strong>安全に分離できないものはキャッシュしない</strong>
              ：閲覧権限によって内容が変わる生成回答は、上記のスコープで確実に分離できると示せない限りキャッシュ対象から外す。キャッシュミスのコストは、他人のデータを返すコストよりはるかに安い。
            </li>
            <li>
              <strong>再利用時にも認可を再検証する</strong>
              ：キャッシュヒットは認可のバイパスではありません。権限は取り消され得るため、保存時に有効だった認可スコープが応答を返す時点でも有効かを毎回確認する。
            </li>
          </ol>
          <p>
            分散システムでキャッシュを持つ場合、古典的な<strong>CAP定理</strong>
            （一貫性・可用性・分断耐性の3つを同時に完全には満たせないという定理）の考え方が再び重要になります。キャッシュが複数リージョンに分散している場合、「常に最新の回答を返す一貫性」と「一部のノードが落ちても応答し続ける可用性」はトレードオフの関係にあり、生成AIのようにやや古いキャッシュでも実用上大きな問題にならないケースでは、可用性を優先する設計が一般的です。
          </p>
          <h4 id="コンテキストキャッシングprompt-caching">
            コンテキストキャッシング（Prompt Caching）
          </h4>
          <p>
            生成AI特有のキャッシング手法として、プロンプトの共通部分（システムプロンプトや長い参考文書など）をモデル提供者側でキャッシュし、同じ接頭辞を持つリクエストの処理コストとレイテンシを削減する「プロンプトキャッシュ（コンテキストキャッシング）」があります。2026年にはこの機能がAnthropic・OpenAI・Googleの主要プロバイダーで標準的に提供されるようになり、コンテキストエンジニアリングの定石そのものを変えるインパクトをもたらしました（詳細は第11部で扱います）。
          </p>
          <h4 id="グレースフルデグラデーション優雅な劣化">
            グレースフルデグラデーション（優雅な劣化）
          </h4>
          <p>
            LLMプロバイダーのAPIが遅延・障害を起こした場合に、アプリケーション全体を停止させるのではなく、機能を段階的に縮退させて動作を継続させる設計です。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_18} preserveNaturalScale={true} />
          </div>
          <h4 id="リクエストスロットリングとカスケード障害の防止">
            リクエストスロットリングとカスケード障害の防止
          </h4>
          <p>
            上流のLLMプロバイダーにはレート制限があり、これを超えると429エラーが返ってきます。アプリケーション側でリクエストレートを制御する「スロットリング」や、下流サービスの障害が上流に連鎖的に波及することを防ぐ「サーキットブレーカー」パターンは、通常の分散システムと同様に生成AIアプリケーションでも必須の防御機構です。ある1つのLLMプロバイダーの障害が、リトライの嵐によってアプリケーション全体を巻き込む「カスケード障害」に発展しないよう、指数バックオフ付きリトライ、リトライ回数の上限設定、タイムアウトの明示的な設定を組み合わせます。
          </p>
          <h2 id="part7">第7部：倫理とセキュリティ</h2>
          <h3 id="71-responsible-aiの基本">7.1 Responsible AIの基本</h3>
          <p>
            責任あるAI（Responsible
            AI）は、単一の技術ではなく「公平性（Fairness）」「説明可能性（Explainability）」「安全性・セキュリティ（Safety
            and
            Security）」「プライバシー（Privacy）」という4本柱で構成される、開発プロセス全体に組み込むべき考え方です。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_19} preserveNaturalScale={true} />
          </div>
          <h3 id="72-公平性fairness">7.2 公平性（Fairness）</h3>
          <p>
            生成AIにおける公平性の問題は、従来の分類モデルにおける「特定の属性グループへの予測精度の偏り」だけでなく、
            <strong>生成される文章そのものに含まれるステレオタイプや偏見</strong>
            という新しい次元を持ちます。公平性を改善する取り組みとしては、訓練データの多様性確保(これは基盤モデル提供者側の責務が大きい)に加え、アプリケーション開発者側でも、プロンプト設計時にステレオタイプを助長しない指示を含める、評価データセットに多様な属性の入力を意図的に含める、といった対策が可能です。
          </p>
          <h3 id="73-説明可能性explainability">7.3 説明可能性（Explainability）</h3>
          <p>
            「なぜモデルがその出力を返したのか」を人間が理解できるようにすることです。従来の機械学習では特徴量重要度のような手法が使われてきましたが、LLMは内部構造が複雑でブラックボックス性が高いため、
            <strong>LLM自身に理由を説明させる（Chain-of-Thought的な説明生成）</strong>、
            <strong>RAGでは根拠となった文書を引用として明示する</strong>
            、といった実務的な代替アプローチが取られます。ただし、LLMが「もっともらしい説明」を後付けで生成しているだけで、実際の内部推論過程とは異なる可能性がある点には注意が必要です。
          </p>
          <h3 id="74-安全性とセキュリティ">7.4 安全性とセキュリティ</h3>
          <p>
            古典的な機械学習時代の安全性（誤分類による実害の防止）に加え、生成AI特有の安全性の課題として、有害コンテンツの生成、脱獄（ジェイルブレイク）攻撃への耐性、そして「エージェントが実世界に対して行動する」ことに伴う新しいリスクが加わりました。
          </p>
          <p>2026年のOWASP Top 10 for LLM Applicationsでは、ランキングに顕著な変化が見られます。</p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>2026年の順位</th>
                  <th>リスク項目</th>
                  <th>2025年からの変化</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>1位</td>
                  <td>プロンプトインジェクション</td>
                  <td>2年連続1位を維持</td>
                </tr>
                <tr className="even">
                  <td>2位</td>
                  <td>機密情報の漏洩</td>
                  <td>順位変わらず</td>
                </tr>
                <tr className="odd">
                  <td>3位</td>
                  <td>過剰な自律性（Excessive Agency）</td>
                  <td>6位から3位へ急上昇</td>
                </tr>
                <tr className="even">
                  <td>4位</td>
                  <td>サプライチェーンの脆弱性</td>
                  <td>3位から後退</td>
                </tr>
                <tr className="odd">
                  <td>5位</td>
                  <td>データ・モデルの汚染（Poisoning）</td>
                  <td>4位から後退</td>
                </tr>
                <tr className="even">
                  <td>6位</td>
                  <td>誤情報（Misinformation）</td>
                  <td>下位から上昇</td>
                </tr>
                <tr className="odd">
                  <td>7位</td>
                  <td>無制限な消費（Unbounded Consumption）</td>
                  <td>下位から上昇</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            特に注目すべきは「過剰な自律性」の急上昇です。これはエージェントに必要以上のツールアクセス権限や広すぎる操作範囲、人間の承認なしでの実行権限を与えることで生じるリスクであり、まさに第3部で扱ったエージェント設計・ツール呼び出しの運用化と直結します。また「無制限な消費」は、単なるトークン量の問題ではなく、1つのエージェントリクエストがネストしたツール呼び出しやサブエージェント呼び出しを通じて予期しないほどのコスト・計算資源を消費してしまうリスクを指しており、第6部のスロットリング・第9部のコスト管理と関連します。
          </p>
          <p>
            さらに、OWASPは2025年末に「OWASP Top 10 for Agentic
            Applications」を新設し、エージェント特有のリスク（ツール権限の濫用、エージェント間通信の悪用、メモリ汚染など）を体系化しています。プロンプトインジェクションについては、セキュリティ研究者のSimon
            Willison氏が提唱した「<strong>Lethal Trifecta（致死の三要素）</strong>
            」という考え方が広く参照されています。これは、（1）機密データへのアクセス、（2）信頼できない外部コンテンツの処理、（3）外部への通信能力、という3つの能力が1つのエージェントに同時に揃うと、原理的にプロンプトインジェクションを完全には防げない構造的リスクが生まれる、という指摘です。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_20} preserveNaturalScale={true} />
          </div>
          <p>
            実務的な緩和策としては、（1）ツールへのアクセス権限を最小化する、（2）信頼できない入力（Webページの内容、メール本文など）とシステム指示を明確に分離して扱う、（3）高リスクな操作には人間の承認を必須にする、（4）Guardrails（NeMo
            GuardrailsやLlama
            Guardなど）による多段的な入出力フィルタリングを組み込む、という多層防御（Defense in
            Depth）の考え方が定着しています。
          </p>
          <h3 id="75-プライバシー">7.5 プライバシー</h3>
          <p>
            生成AIにおけるプライバシーの課題は、（1）訓練データに含まれる個人情報がモデルの出力に漏洩するリスク、（2）RAGで検索対象とするドキュメントに含まれる機密情報が意図しないユーザーに開示されるリスク、（3）ユーザーが入力したプロンプト自体に含まれる個人情報の取り扱い、という3層構造で考える必要があります。改善策としては、PIIの検出・マスキング、RAGにおけるドキュメントレベルのアクセス制御（ユーザーの権限に応じて検索対象を制限する）、ログ保持期間の最小化などが挙げられます。
          </p>
          <h2 id="part8">第8部：可観測性と信頼性</h2>
          <h3 id="81-サイト信頼性エンジニアリングsreとは何か">
            8.1 サイト信頼性エンジニアリング（SRE）とは何か
          </h3>
          <p>
            SRE（Site Reliability
            Engineering）は、Googleが提唱した「ソフトウェアエンジニアリングの手法を運用問題の解決に適用する」考え方です。生成AIアプリケーションは非決定的な出力・外部LLMプロバイダーへの依存・高い計算コストという特性を持つため、従来以上にSREの原則が重要になります。
          </p>
          <h3 id="82-信頼性の達成slisloslaとエラーバジェット">
            8.2 信頼性の達成：SLI・SLO・SLAとエラーバジェット
          </h3>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_21} preserveNaturalScale={true} />
          </div>
          <ul>
            <li>
              <strong>SLI（サービスレベル指標）</strong>
              ：実際に計測する生の数値。生成AIでは「p95レイテンシ」「エラー率」に加えて「ハルシネーション率」「回答品質スコア」もSLIの対象になり得ます。
            </li>
            <li>
              <strong>SLO（サービスレベル目標）</strong>
              ：SLIに対する内部的な目標（例：「p95レイテンシが3秒以内であることが99.9%の時間で成立する」）。
            </li>
            <li>
              <strong>SLA（サービスレベル契約）</strong>
              ：SLOを顧客との契約に落とし込んだもので、通常SLOより緩い基準が設定されます。
            </li>
            <li>
              <strong>エラーバジェット</strong>
              ：SLOが「100%」ではなく「99.9%」のように設定されることで生まれる、意図的に許容された失敗の余地です。
            </li>
          </ul>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_22} preserveNaturalScale={true} />
          </div>
          <p>
            エラーバジェットの考え方の本質は、「信頼性を100%にすることがゴールではなく、ビジネス上合意された信頼性目標の範囲内で、いかに速く機能改善を続けられるか」というバランスを取ることにあります。生成AIプロダクトでは、モデルのアップグレードやプロンプト変更自体がこのバジェットを消費するリスク要因になるため、第5部のCI/CDゲートと密接に連動します。
          </p>
          <h3 id="83-その他のsre原則とトイルの削減">8.3 その他のSRE原則とトイルの削減</h3>
          <p>
            SREのもう一つの重要な考え方が「トイル（Toil）」——手作業で繰り返し発生する、自動化可能なはずの運用作業——の削減です。生成AI運用チームにおけるトイルの典型例は、手動でのプロンプト調整、手動でのハルシネーション事例のレビュー、手動でのモデルバージョン切り替え作業などで、これらを自動化パイプラインに置き換えていくことがSREチームの重要な責務です。
          </p>
          <h3 id="84-本番アプリケーションの管理テレメトリデータの3本柱">
            8.4 本番アプリケーションの管理：テレメトリデータの3本柱
          </h3>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_23} preserveNaturalScale={true} />
          </div>
          <ul>
            <li>
              <strong>ログ（Logs）</strong>
              ：個々のイベントの詳細な記録。入力プロンプト、生成された出力、発生したエラーなど。
            </li>
            <li>
              <strong>メトリクス（Metrics）</strong>
              ：集計された数値データ。リクエスト数、p50/p95/p99レイテンシ、トークン消費量、コストなど。
            </li>
            <li>
              <strong>トレース（Traces）</strong>
              ：1つのリクエストがシステム内をどう伝播したかを示す、複数のスパンから成る因果関係の記録。エージェントのようなマルチステップ処理では特に重要です。
            </li>
          </ul>
          <h3 id="85-モニタリングとアラートそしてgenai観測性の標準化">
            8.5 モニタリングとアラート、そしてGenAI観測性の標準化
          </h3>
          <p>
            2026年時点で最も重要な業界動向の一つが、**OpenTelemetryのGenAI Semantic
            Conventions（GenAI意味規約）**の普及です。これは、LLM呼び出し・エージェントの起動・ツール呼び出しといったイベントに対して、
            <code>gen_ai.*</code>
            から始まる標準化された属性名（モデル名、トークン数、終了理由など）を定義するもので、2024年4月にOpenTelemetryのGenAI
            SIG（特別関心グループ）によって策定が始まりました。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_24} preserveNaturalScale={true} />
          </div>
          <p>
            この標準化以前は、Langfuse・Helicone・LangSmithなどの各ツールが独自のトレーシング形式を使っており、ベンダーロックインの原因になっていました。GenAI意味規約に対応することで、
            <strong>計装は一度書けば、バックエンドをいつでも自由に切り替えられる</strong>
            という利点が生まれます。2026年時点でこの規約はまだ「実験的（Experimental）」ステータスのものが多いものの、GitHub
            Copilot・Codex・Claude
            Codeのようなコーディングエージェント自体がネイティブにOpenTelemetryでトレースを出力するようになるなど、実装は着実に広がっています。
          </p>
          <h3 id="86-genai観測性特有の計装ポイント">8.6 GenAI観測性特有の計装ポイント</h3>
          <p>
            従来のAPM（アプリケーション性能監視）と異なり、生成AIシステムの観測性では次の点を追加で計装する必要があります。
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>計装対象</th>
                  <th>理由</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>プロンプト・完了内容のキャプチャ</td>
                  <td>
                    デバッグ時に「なぜこの出力が返ったか」を再現するために必要（機密情報の扱いには注意）
                  </td>
                </tr>
                <tr className="even">
                  <td>トークン単位のコスト帰属</td>
                  <td>どの機能・ユーザー・エージェントステップがコストを消費しているかを可視化</td>
                </tr>
                <tr className="odd">
                  <td>TTFT（Time To First Token）</td>
                  <td>ストリーミング応答の体感速度を左右する、生成AI特有のレイテンシ指標</td>
                </tr>
                <tr className="even">
                  <td>ツール呼び出しの成否と引数</td>
                  <td>エージェントがどのツールをどう使ったかを追跡し、デバッグと監査に使う</td>
                </tr>
                <tr className="odd">
                  <td>品質スコア（オンライン評価結果）</td>
                  <td>第2部の評価パイプラインの結果を本番トレースと紐づけ、品質の推移を監視する</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 id="part9">第9部：アプリケーションを保守する</h2>
          <h3 id="91-デプロイ後の生活プラットフォームチームという発想">
            9.1 デプロイ後の生活：プラットフォームチームという発想
          </h3>
          <p>
            生成AIアプリケーションが1つや2つのうちは、各プロダクトチームがそれぞれLLM呼び出し・評価・デプロイの仕組みを個別に作ってもなんとかなります。しかし組織内で生成AI活用が広がるにつれ、共通基盤を提供する専任の「プラットフォームチーム」が必要になります。
          </p>
          <h3 id="92-通常のプラットフォームチームとgenaiプラットフォームチームの違い">
            9.2 通常のプラットフォームチームとGenAIプラットフォームチームの違い
          </h3>
          <p>
            通常の社内プラットフォームチーム（Kubernetes基盤、CI/CD基盤など）と比較して、GenAIプラットフォームチームには次のような固有の役割が求められます。
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>観点</th>
                  <th>通常のプラットフォームチーム</th>
                  <th>GenAIプラットフォームチーム</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>主な提供物</td>
                  <td>コンピュート・ネットワーク・CI/CD基盤</td>
                  <td>上記に加え、モデルアクセス・評価基盤・ガードレール</td>
                </tr>
                <tr className="even">
                  <td>変更の性質</td>
                  <td>インフラの構成変更が中心</td>
                  <td>モデルのバージョンアップ・プロンプトの継続的最適化も対象</td>
                </tr>
                <tr className="odd">
                  <td>品質保証の対象</td>
                  <td>デプロイの成否・可用性</td>
                  <td>上記に加え、生成物の品質・安全性・コスト効率</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 id="93-genaiプラットフォームのビルディングブロック">
            9.3 GenAIプラットフォームのビルディングブロック
          </h3>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_25} preserveNaturalScale={true} />
          </div>
          <p>各コンポーネントの役割を整理します。</p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>ビルディングブロック</th>
                  <th>役割</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>モデルゲートウェイ</td>
                  <td>
                    複数のLLMプロバイダーへのアクセスを単一APIに統一し、ルーティング・キャッシング・レート制限・コスト帰属を一元管理する
                  </td>
                </tr>
                <tr className="even">
                  <td>プロンプトストア</td>
                  <td>3.1節で扱ったプロンプトレジストリを全社共通基盤として提供する</td>
                </tr>
                <tr className="odd">
                  <td>ツールレジストリ</td>
                  <td>
                    エージェントが呼び出せるツールをカタログ化し、権限管理・バージョン管理を一元化する
                  </td>
                </tr>
                <tr className="even">
                  <td>実行サンドボックス</td>
                  <td>
                    エージェントが生成したコードやコマンドを、隔離された安全な環境で実行するための基盤
                  </td>
                </tr>
                <tr className="odd">
                  <td>セッションストア</td>
                  <td>
                    マルチターンの会話状態やエージェントの実行状態を、ステートレスなアプリケーション層の外側で保持する
                  </td>
                </tr>
                <tr className="even">
                  <td>フィードバックサービス</td>
                  <td>
                    ユーザーからの評価（高評価/低評価ボタンなど）や暗黙的なシグナル（会話の中断など）を収集する
                  </td>
                </tr>
                <tr className="odd">
                  <td>Human-in-the-Loop</td>
                  <td>
                    第2部で扱ったHITL評価と、高リスクなエージェント操作の承認フローを統合的に扱うキュー
                  </td>
                </tr>
                <tr className="even">
                  <td>サービング/学習インフラ</td>
                  <td>
                    モデルの推論サービング（オートスケーリング、GPU/TPU効率利用）と、必要に応じたファインチューニング基盤
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            2026年のLLMゲートウェイ市場では、単なるAPIルーターにとどまらず、コスト管理・ガードレール・観測性を統合した製品への需要が高まっており、複数のプロバイダー（OpenAI、Anthropic、Google
            Vertex AI、AWS
            Bedrockなど）に対して単一のインターフェースでアクセスできることが標準的な要件になっています。またMCP（Model
            Context
            Protocol、詳細は第11部）のようなツール接続の標準規格の普及に伴い、ツールレジストリの実装もMCPサーバーのカタログ管理へと収斂しつつあります。
          </p>
          <h3 id="94-プロダクト戦略とロードマップ">9.4 プロダクト戦略とロードマップ</h3>
          <p>
            保守フェーズに入ったGenAIプロダクトのロードマップ策定では、「新機能の追加」だけでなく、「モデル世代交代への追従計画」「評価データセットの継続的な拡充」「ガードレールルールの継続的な見直し」といった、生成AI特有の保守項目を計画に組み込む必要があります。これらは往々にして新機能開発と工数を奪い合う関係にあるため、プロダクト戦略レベルで意図的に時間を確保することが、長期的な品質維持の鍵になります。
          </p>
          <h2 id="part10">第10部：A/Bテストとオンライン実験</h2>
          <h3 id="101-abテストとは何か">10.1 A/Bテストとは何か</h3>
          <p>
            A/Bテストは、ユーザートラフィックを複数のバリアント（例：プロンプトA vs
            プロンプトB、モデルX vs モデルY、リトリーバル戦略A vs
            B）にランダムに割り当て、実際のユーザー行動データを使ってどちらが優れているかを統計的に判断する手法です。第2部のオフライン評価が「本番投入前の品質ゲート」であるのに対し、A/Bテストは「実際のユーザーにとって何が本当に価値があるか」を最終的に検証する手段です。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_26} preserveNaturalScale={true} />
          </div>
          <h3 id="102-統計的検定の基礎第一種の過誤と第二種の過誤">
            10.2 統計的検定の基礎：第一種の過誤と第二種の過誤
          </h3>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>用語</th>
                  <th>意味</th>
                  <th>生成AI文脈での具体例</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>第一種の過誤（False Positive）</td>
                  <td>実際には差がないのに「差がある」と誤って判定する</td>
                  <td>実は同等の品質のプロンプトBを「改善した」と誤認しロールアウトしてしまう</td>
                </tr>
                <tr className="even">
                  <td>第二種の過誤（False Negative）</td>
                  <td>実際には差があるのに「差がない」と見逃す</td>
                  <td>本当に優れた新モデルの効果を検出できず、旧モデルを使い続けてしまう</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            生成AIのA/Bテストでは、LLMの出力自体に大きな分散（同じ入力でも毎回微妙に異なる出力）が加わるため、
            <strong>
              通常のWebサイトのA/Bテストよりも検出に必要なサンプルサイズが大きくなりやすい
            </strong>
            という特有の難しさがあります。統計的検定を行う前に、評価に使うLLM審査者自体の「同一入力に対するブレ幅」を事前に計測しておき、観測された差のどこまでが本当のバリアント間の差で、どこまでが審査者自身のノイズなのかを切り分けることが2026年の実務では推奨されています。
          </p>
          <h3 id="103-p値にまつわる誤解myths-about-p-value">
            10.3 p値にまつわる誤解（Myths about p-value）
          </h3>
          <p>
            p値は「バリアント間に本当は差がないという仮定（帰無仮説）のもとで、観測されたデータ（またはそれ以上に極端なデータ）が得られる確率」を意味しますが、しばしば「p値が0.05未満なら効果が証明された」という誤った解釈がされがちです。実際には、p値は効果の大きさやビジネス上の重要性を何も語っておらず、
            <strong>統計的に有意であっても、実務上無視できるほど小さい効果</strong>
            というケースは珍しくありません。逆に、サンプルサイズが不足していると、実際には意味のある効果があっても統計的有意性に達しない（第二種の過誤）ことも起こります。
          </p>
          <h3 id="104-オンラインテストのための良い指標とは">
            10.4 オンラインテストのための良い指標とは
          </h3>
          <p>A/Bテストの成否を左右するのは、統計手法そのものより「何を測るか」の設計です。</p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>指標の種類</th>
                  <th>特徴</th>
                  <th>注意点</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>直接的な行動指標（クリック率、継続利用率など）</td>
                  <td>解釈しやすく、ビジネス目標と直結しやすい</td>
                  <td>短期的な指標がユーザーの長期的な満足度と一致しない場合がある</td>
                </tr>
                <tr className="even">
                  <td>プロキシ指標（LLM審査者による品質スコアなど）</td>
                  <td>収集コストが低くリアルタイムに近い形で計測できる</td>
                  <td>審査者自体のブレ・バイアスが指標に混入する</td>
                </tr>
                <tr className="odd">
                  <td>ガードレール指標（p95レイテンシ、コスト、安全性違反率など）</td>
                  <td>プライマリ指標の改善のために犠牲にされがちな副作用を検知する</td>
                  <td>プライマリ指標と独立して、単独で実験を停止させる権限を持たせるべき</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 id="105-テストの検出力powerを高める">10.5 テストの検出力（Power）を高める</h3>
          <p>
            検出力とは「本当に差がある場合に、それを正しく検出できる確率」のことです。検出力を高める代表的な手法として、（1）サンプルサイズを増やす、（2）分散の小さい指標を選ぶ、（3）ユーザー属性などの共変量で調整して分散を減らす（CUPED法など）、（4）連続的モニタリングに対応した逐次検定手法を使う、といったアプローチがあります。
          </p>
          <h3 id="106-abテストでよくある誤り">10.6 A/Bテストでよくある誤り</h3>
          <ul>
            <li>
              <strong>早期終了バイアス</strong>
              ：統計的有意性に達した時点で実験を早期に打ち切ってしまうと、偶然の変動を「本物の効果」と誤認するリスクが高まります。事前に定めたサンプルサイズ・実験期間を守ることが重要です。
            </li>
            <li>
              <strong>複数指標の多重比較問題</strong>
              ：多数の指標を同時に検定すると、偶然「有意」に見える指標が出やすくなります。プライマリ指標を事前に1つに絞り込むことが推奨されます。
            </li>
            <li>
              <strong>ネットワーク効果・汚染の見落とし</strong>
              ：マルチエージェントシステムやチャット共有機能があるプロダクトでは、バリアントAのユーザーとバリアントBのユーザーが互いに影響し合い、実験結果が歪む可能性があります。
            </li>
            <li>
              <strong>新奇性効果（Novelty Effect）</strong>
              ：新しいプロンプトやUIが一時的に高評価を得るが、慣れとともに効果が消失する現象。十分な実験期間を確保することで検出できます。
            </li>
          </ul>
          <h2 id="part11">第11部：2026年9月時点の最新動向</h2>
          <p>
            本書の原著は2026年3月刊行ですが、生成AIアーキテクチャの実務は数ヶ月単位で更新され続けています。ここでは2026年9月9日時点でのウェブ検索調査に基づき、本ガイドの各部と関連する最新動向を独自に補足します。
          </p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_27} preserveNaturalScale={true} />
          </div>
          <h3 id="111-エージェント間相互運用の標準化mcpのlinux-foundation移管">
            11.1 エージェント間相互運用の標準化：MCPのLinux Foundation移管
          </h3>
          <p>
            2025年12月9日、AnthropicはModel Context Protocol（MCP）をLinux
            Foundation傘下の新設団体「Agentic AI
            Foundation（AAIF）」に寄贈しました。AAIFはAnthropic・Block・OpenAIが共同設立し、Google・Microsoft・AWS・Cloudflare・Bloombergが支援する組織で、MCPに加えてBlockのgoose、OpenAIのAGENTS.mdも創設プロジェクトとして参加しています。2026年3月時点でMCPは月間9,700万回のSDKダウンロードを記録し、公開MCPサーバー数は1万件を超えました。これは第3部で扱ったツールレジストリの実装が、事実上MCPサーバーのカタログ管理へと収斂しつつあることを裏付けています。単一ベンダー依存のリスクが解消されたことで、企業のエージェント基盤投資判断における採用障壁が大きく下がったと報告されています。
          </p>
          <h3 id="112-llmops評価駆動開発とマルチステップ観測性の主流化">
            11.2 LLMOps：評価駆動開発とマルチステップ観測性の主流化
          </h3>
          <p>
            2026年のLLMOpsプラットフォーム動向を見ると、「まずデプロイしてから様子を見る」という姿勢から、CI上でリグレッションを検知する評価駆動開発への転換が明確なトレンドとして確認できます。あわせて、単発のLLM呼び出しのログだけでなく、マルチステップのエージェントワークフロー全体を1つのトレースとして可視化し、トークン単位でコストを帰属させる機能が、LLMOpsプラットフォームの標準機能になりつつあります。
          </p>
          <h3 id="113-セキュリティowasp-top-10-for-llm-applications-2026の変化">
            11.3 セキュリティ：OWASP Top 10 for LLM Applications 2026の変化
          </h3>
          <p>
            第7部で述べたとおり、2026年版OWASP Top 10 for LLM
            Applicationsでは「過剰な自律性（Excessive
            Agency）」が2025年版の6位から3位へ急上昇しました。これは、エージェントに実世界への行動権限を与えるアーキテクチャ（第3部）が急速に普及したことの裏返しであり、ツール権限の最小化・人間承認フローの組み込みが、もはや「あれば良い」ではなく必須の設計要件になったことを意味します。あわせて2025年末にはエージェント特有のリスクを扱う「OWASP
            Top 10 for Agentic
            Applications」が新設され、セキュリティ評価のスコープがアプリケーション単体からエージェントの行動全体へと拡張されています。
          </p>
          <h3 id="114-観測性opentelemetryのcncf卒業とgenai意味規約の定着">
            11.4 観測性：OpenTelemetryのCNCF卒業とGenAI意味規約の定着
          </h3>
          <p>
            2026年5月21日、OpenTelemetryはCNCF（Cloud Native Computing
            Foundation）を「卒業」し、本番インフラの標準的な可観測性基盤としての地位を確立しました。これと歩調を合わせる形で、GenAI意味規約（
            <code>gen_ai.*</code>
            属性によるLLM呼び出し・エージェント・ツール呼び出しの標準化）の実装が広がり、GitHub
            Copilot・Codex・Claude
            Codeのようなコーディングエージェント自身がネイティブにOpenTelemetryトレースを出力するようになりました。第8部で述べたベンダーロックインの回避という利点が、実際のツールチェーンで具体化しつつある段階です。
          </p>
          <h3 id="115-ragハイブリッド検索2段階リランキングの実証データ">
            11.5 RAG：ハイブリッド検索+2段階リランキングの実証データ
          </h3>
          <p>
            2026年に公表された複数のベンチマーク研究（金融文書を対象としたT2-RAGBenchなど）では、キーワード検索と密ベクトル検索を組み合わせたハイブリッド検索に、さらにクロスエンコーダー型リランキングを追加する2段階パイプラインが、単一手法と比べて大幅なRecall@5の改善（研究によっては単一手法比で17〜39%の相対改善）を示すことが報告されています。特筆すべきは、製品型番や表形式データを含む文書では、密ベクトル検索よりもBM25のようなキーワード検索の方が優れているケースが確認されている点で、「セマンティック検索が常に優位」という単純な思い込みへの反証データとして注目されています。
          </p>
          <h3 id="116-マルチエージェント設計トークンコストという制約への意識">
            11.6 マルチエージェント設計：トークンコストという制約への意識
          </h3>
          <p>
            Anthropicの研究では、オーケストレーター・ワーカー型のマルチエージェントシステムが単一エージェントに対して評価ベンチマークで大幅な性能向上を示す一方、トークン消費量が単一エージェント比で約15倍に達することが報告されています。同社の分析によれば「トークン使用量だけで性能の分散の約80%を説明できる」とされており、2026年の実務コミュニティでは「マルチエージェント化は、タスクが本当に独立した並列スレッドに分解できる場合にのみ、コストに見合う」という選別的な採用姿勢が広がっています。第3部で扱ったオーケストレーター・ワーカーパターンを採用する際は、この費用対効果の見極めが設計判断の出発点になります。
          </p>
          <h2 id="roadmap">学習ロードマップ</h2>
          <p>初学者がこのガイドをどの順序で深掘りしていくべきかの目安です。</p>
          <div className="diagram-wrap">
            <MermaidDiagram chart={DIAGRAM_28} preserveNaturalScale={true} />
          </div>
          <p>
            初めて生成AIアプリケーションを構築する場合、ステップ1〜3（基礎理解・プロトタイプ・評価・アーキテクチャ）を1つの小さなプロジェクトで一通り経験することが、以降のステップの理解を大きく助けます。逆に、評価設計（ステップ2）を飛ばしてステップ3以降に進んでしまうと、後になって「何を改善すべきか判断できない」という壁に必ずぶつかります。
          </p>
          <h2 id="checklist">実践チェックリスト</h2>
          <ArchitectingGenAiChecklist items={CHECKLIST_ITEMS} />
          <h2 id="glossary">用語集</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr className="header">
                  <th>用語</th>
                  <th>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td>LLM（大規模言語モデル）</td>
                  <td>
                    大量のテキストで訓練され、文章生成・要約・翻訳・コード生成などを行う基盤モデル
                  </td>
                </tr>
                <tr className="even">
                  <td>プロンプトエンジニアリング</td>
                  <td>LLMから望む出力を引き出すための入力設計技術</td>
                </tr>
                <tr className="odd">
                  <td>RAG（Retrieval-Augmented Generation）</td>
                  <td>外部知識源からの検索結果をプロンプトに含めて回答生成する手法</td>
                </tr>
                <tr className="even">
                  <td>ハイブリッド検索</td>
                  <td>キーワード検索（BM25等）とベクトル検索を組み合わせる検索手法</td>
                </tr>
                <tr className="odd">
                  <td>リランキング</td>
                  <td>一次検索で得た候補集合を、より精密なモデルで並べ替える工程</td>
                </tr>
                <tr className="even">
                  <td>RRF（Reciprocal Rank Fusion）</td>
                  <td>複数の検索結果の順位情報を使ってスコアを統合する手法</td>
                </tr>
                <tr className="odd">
                  <td>エージェント</td>
                  <td>
                    LLMが自律的にツール呼び出し・計画・振り返りを繰り返しながらタスクを遂行する仕組み
                  </td>
                </tr>
                <tr className="even">
                  <td>オーケストレーター・ワーカー</td>
                  <td>
                    リードエージェントがタスクを分割し、複数のサブエージェントに委譲する設計パターン
                  </td>
                </tr>
                <tr className="odd">
                  <td>ツールレジストリ</td>
                  <td>エージェントが利用可能なツールをカタログ化し権限管理する仕組み</td>
                </tr>
                <tr className="even">
                  <td>MCP（Model Context Protocol）</td>
                  <td>AIモデルを外部ツール・データソースに接続するためのオープンな標準規格</td>
                </tr>
                <tr className="odd">
                  <td>LLM-as-a-Judge</td>
                  <td>LLM自身に別のLLMの出力を評価させる評価手法</td>
                </tr>
                <tr className="even">
                  <td>Human-in-the-Loop（HITL）</td>
                  <td>評価・意思決定プロセスに人間のレビューを組み込む仕組み</td>
                </tr>
                <tr className="odd">
                  <td>ハルシネーション</td>
                  <td>LLMが事実に基づかないもっともらしい誤情報を生成する現象</td>
                </tr>
                <tr className="even">
                  <td>LLMOps</td>
                  <td>
                    プロンプト管理・評価駆動開発・トークンコスト管理を含む、LLMアプリケーション運用の専門分野
                  </td>
                </tr>
                <tr className="odd">
                  <td>プロンプトキャッシュ（コンテキストキャッシング）</td>
                  <td>
                    プロンプトの共通部分をモデル提供者側でキャッシュし、コスト・レイテンシを削減する仕組み
                  </td>
                </tr>
                <tr className="even">
                  <td>SLI/SLO/SLA</td>
                  <td>サービスレベルの指標・目標・契約。信頼性エンジニアリングの基本概念</td>
                </tr>
                <tr className="odd">
                  <td>エラーバジェット</td>
                  <td>SLOから逆算される、意図的に許容された失敗の余地</td>
                </tr>
                <tr className="even">
                  <td>OpenTelemetry</td>
                  <td>
                    ログ・メトリクス・トレースを標準化して収集するオープンソースの観測性フレームワーク
                  </td>
                </tr>
                <tr className="odd">
                  <td>GenAI意味規約</td>
                  <td>
                    OpenTelemetryにおける生成AI特有のイベントを標準化した属性の集合（
                    <code>gen_ai.*</code>）
                  </td>
                </tr>
                <tr className="even">
                  <td>プロンプトインジェクション</td>
                  <td>悪意ある入力によってLLMに意図しない指示を実行させる攻撃手法</td>
                </tr>
                <tr className="odd">
                  <td>Lethal Trifecta（致死の三要素）</td>
                  <td>
                    機密データアクセス・信頼できない外部コンテンツ処理・外部通信能力の3つが同時に揃うリスク構造
                  </td>
                </tr>
                <tr className="even">
                  <td>CAP定理</td>
                  <td>
                    分散システムにおいて一貫性・可用性・分断耐性を同時に完全には満たせないという定理
                  </td>
                </tr>
                <tr className="odd">
                  <td>A/Bテスト</td>
                  <td>
                    ユーザートラフィックを複数バリアントにランダム割当し統計的に比較する実験手法
                  </td>
                </tr>
                <tr className="even">
                  <td>p値</td>
                  <td>帰無仮説のもとで観測データ以上に極端な結果が得られる確率</td>
                </tr>
                <tr className="odd">
                  <td>ガードレール指標</td>
                  <td>
                    実験におけるプライマリ指標改善の副作用（レイテンシ悪化、安全性違反など）を監視する指標
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 id="references">参考文献・ソース一覧</h2>
          <p>
            本ガイドの作成にあたり参照した資料です（2026年9月9日時点）。原著者・標準化団体・提供元自身による公式発表を
            <strong>一次情報源</strong>、それらを解説・比較したベンダーブログや第三者記事を
            <strong>二次情報源</strong>
            として区別しています。記述の裏付けを取る際は、まず一次情報源にあたってください。
          </p>
          <h3 id="一次情報源">一次情報源</h3>
          <div className="ref-grid">
            <div className="ref-card">
              <p className="ref-card-label">書籍・原著情報</p>
              <ul className="ref-card-list">
                <li>
                  Leonid Kuligin. <em>Architecting Generative AI Applications</em>. Packt Publishing
                  / O'Reilly, March 2026.{" "}
                  <Ext href="https://www.oreilly.com/library/view/architecting-generative-ai/9781806678655/">
                    <span>
                      https://www.oreilly.com/library/view/architecting-generative-ai/9781806678655/
                    </span>
                  </Ext>
                </li>
              </ul>
            </div>
            <div className="ref-card">
              <p className="ref-card-label">エージェントアーキテクチャ・LLMOps</p>
              <ul className="ref-card-list">
                <li>
                  Anthropic. "Building Effective AI Agents."{" "}
                  <Ext href="https://resources.anthropic.com/building-effective-ai-agents">
                    <span>https://resources.anthropic.com/building-effective-ai-agents</span>
                  </Ext>
                </li>
                <li>
                  Anthropic Engineering. "How we built our multi-agent research system."{" "}
                  <Ext href="https://www.anthropic.com/engineering/multi-agent-research-system">
                    <span>https://www.anthropic.com/engineering/multi-agent-research-system</span>
                  </Ext>
                </li>
                <li>
                  Anthropic. "Donating the Model Context Protocol and establishing the Agentic AI
                  Foundation." Dec 9, 2025.{" "}
                  <Ext href="https://anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation">
                    <span>
                      https://anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
                    </span>
                  </Ext>
                </li>
                <li>
                  Linux Foundation. "Linux Foundation Announces the Formation of the Agentic AI
                  Foundation (AAIF)."{" "}
                  <Ext href="https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation">
                    <span>
                      https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation
                    </span>
                  </Ext>
                </li>
                <li>
                  LangChain. "State of AI Agents."{" "}
                  <Ext href="https://www.langchain.com/state-of-agent-engineering">
                    <span>https://www.langchain.com/state-of-agent-engineering</span>
                  </Ext>
                </li>
                <li>
                  MLflow. "Prompt Registry for LLMs &amp; Agents."{" "}
                  <Ext href="https://mlflow.org/prompt-registry">
                    <span>https://mlflow.org/prompt-registry</span>
                  </Ext>
                </li>
                <li>
                  Datadog. "State of AI Engineering."（Datadog自社テレメトリに基づく調査レポート）{" "}
                  <Ext href="https://www.datadoghq.com/state-of-ai-engineering/">
                    <span>https://www.datadoghq.com/state-of-ai-engineering/</span>
                  </Ext>
                </li>
              </ul>
            </div>
            <div className="ref-card">
              <p className="ref-card-label">セキュリティ</p>
              <ul className="ref-card-list">
                <li>
                  OWASP GenAI Security Project. "OWASP GenAI LLM Top 10 2026."{" "}
                  <Ext href="https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/">
                    <span>https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/</span>
                  </Ext>
                </li>
              </ul>
            </div>
          </div>
          <h3 id="二次情報源解説比較記事">二次情報源（解説・比較記事）</h3>
          <div className="ref-grid">
            <div className="ref-card">
              <p className="ref-card-label">LLMOpsプラットフォーム・ゲートウェイ</p>
              <ul className="ref-card-list">
                <li>
                  Braintrust. "Best LLMOps platforms in 2026 compared."{" "}
                  <Ext href="https://www.braintrust.dev/articles/best-llmops-platforms-2025">
                    <span>https://www.braintrust.dev/articles/best-llmops-platforms-2025</span>
                  </Ext>
                </li>
                <li>
                  Braintrust. "6 best LLM gateways for developers in 2026."{" "}
                  <Ext href="https://www.braintrust.dev/articles/best-llm-gateways-2026">
                    <span>https://www.braintrust.dev/articles/best-llm-gateways-2026</span>
                  </Ext>
                </li>
              </ul>
            </div>
            <div className="ref-card">
              <p className="ref-card-label">評価（Evaluation）</p>
              <ul className="ref-card-list">
                <li>
                  Openlayer. "LLM-as-judge: A complete guide to evaluation best practices in March
                  2026."{" "}
                  <Ext href="https://www.openlayer.com/blog/llm-as-judge-evaluation-guide">
                    <span>https://www.openlayer.com/blog/llm-as-judge-evaluation-guide</span>
                  </Ext>
                </li>
                <li>
                  Future AGI. "LLM-as-Judge Best Practices in 2026: Calibration, Bias, and Cost."{" "}
                  <Ext href="https://futureagi.com/blog/llm-as-judge-best-practices-2026/">
                    <span>https://futureagi.com/blog/llm-as-judge-best-practices-2026/</span>
                  </Ext>
                </li>
                <li>
                  DeepEval. "LLM-as-a-Judge in 2026: Top evaluation techniques and best practices."{" "}
                  <Ext href="https://deepeval.com/blog/llm-as-a-judge">
                    <span>https://deepeval.com/blog/llm-as-a-judge</span>
                  </Ext>
                </li>
                <li>
                  Weights &amp; Biases. "LLM evaluation: Metrics, frameworks, and best practices."{" "}
                  <Ext href="https://wandb.ai/onlineinference/genai-research/reports/LLM-evaluation-Metrics-frameworks-and-best-practices--VmlldzoxMTMxNjQ4NA">
                    <span>
                      https://wandb.ai/onlineinference/genai-research/reports/LLM-evaluation-Metrics-frameworks-and-best-practices--VmlldzoxMTMxNjQ4NA
                    </span>
                  </Ext>
                </li>
              </ul>
            </div>
            <div className="ref-card">
              <p className="ref-card-label">RAG・検索アーキテクチャ</p>
              <ul className="ref-card-list">
                <li>
                  Denser AI. "Hybrid Search for RAG: Combining BM25 and Dense Vector Search (2026
                  Guide)."{" "}
                  <Ext href="https://denser.ai/blog/hybrid-search-for-rag/">
                    <span>https://denser.ai/blog/hybrid-search-for-rag/</span>
                  </Ext>
                </li>
                <li>
                  Digital Applied. "Hybrid Search: BM25, Vector &amp; Reranking Reference 2026."{" "}
                  <Ext href="https://www.digitalapplied.com/blog/hybrid-search-bm25-vector-reranking-reference-2026">
                    <span>
                      https://www.digitalapplied.com/blog/hybrid-search-bm25-vector-reranking-reference-2026
                    </span>
                  </Ext>
                </li>
                <li>
                  jobsbyculture. "RAG Architecture Guide 2026."{" "}
                  <Ext href="https://jobsbyculture.com/blog/rag-architecture-guide-2026">
                    <span>https://jobsbyculture.com/blog/rag-architecture-guide-2026</span>
                  </Ext>
                </li>
              </ul>
            </div>
            <div className="ref-card">
              <p className="ref-card-label">セキュリティ</p>
              <ul className="ref-card-list">
                <li>
                  ReversingLabs. "OWASP Top 10 for LLM Apps 2026: Excessive agency risk on the
                  rise."{" "}
                  <Ext href="https://www.reversinglabs.com/blog/owasp-top-10-for-llm-apps-excessive-agency">
                    <span>
                      https://www.reversinglabs.com/blog/owasp-top-10-for-llm-apps-excessive-agency
                    </span>
                  </Ext>
                </li>
                <li>
                  Aembit. "OWASP Top 10 for LLM Applications (2025)."{" "}
                  <Ext href="https://aembit.io/blog/owasp-top-10-llm-risks-explained/">
                    <span>https://aembit.io/blog/owasp-top-10-llm-risks-explained/</span>
                  </Ext>
                </li>
              </ul>
            </div>
            <div className="ref-card">
              <p className="ref-card-label">観測性（Observability）</p>
              <ul className="ref-card-list">
                <li>
                  Uptrace. "OpenTelemetry for AI Systems: LLM and Agent Observability (2026)."{" "}
                  <Ext href="https://uptrace.dev/blog/opentelemetry-ai-systems">
                    <span>https://uptrace.dev/blog/opentelemetry-ai-systems</span>
                  </Ext>
                </li>
                <li>
                  Greptime. "How OpenTelemetry Traces LLM Calls, Agent Reasoning, and MCP Tools."{" "}
                  <Ext href="https://greptime.com/blogs/2026-05-09-opentelemetry-genai-semantic-conventions">
                    <span>
                      https://greptime.com/blogs/2026-05-09-opentelemetry-genai-semantic-conventions
                    </span>
                  </Ext>
                </li>
                <li>
                  webhani. "OpenTelemetry Graduates CNCF and Brings Standardized LLM Observability
                  with GenAI Conventions."{" "}
                  <Ext href="https://www.webhani.com/blog/opentelemetry-graduation-genai-observability-2026">
                    <span>
                      https://www.webhani.com/blog/opentelemetry-graduation-genai-observability-2026
                    </span>
                  </Ext>
                </li>
                <li>
                  OpenObserve. "OpenTelemetry for LLMs: Complete SRE Guide for 2026."
                  <Ext href="https://openobserve.ai/blog/opentelemetry-for-llms/">
                    <span>https://openobserve.ai/blog/opentelemetry-for-llms/</span>
                  </Ext>
                </li>
              </ul>
            </div>
            <div className="ref-card">
              <p className="ref-card-label">A/Bテスト・オンライン実験</p>
              <ul className="ref-card-list">
                <li>
                  Arize AI. "What Is A/B Testing For LLMs."{" "}
                  <Ext href="https://arize.com/glossary/ab-testing-for-llms/">
                    <span>https://arize.com/glossary/ab-testing-for-llms/</span>
                  </Ext>
                </li>
                <li>
                  Atlan. "LLM A/B Testing: A Production Statistics Framework [2026]."
                  <Ext href="https://atlan.com/know/ab-testing-llm-applications/">
                    <span>https://atlan.com/know/ab-testing-llm-applications/</span>
                  </Ext>
                </li>
              </ul>
            </div>
            <div className="ref-card">
              <p className="ref-card-label">その他 LLMOps／エコシステム動向</p>
              <ul className="ref-card-list">
                <li>
                  Braintrust. "Best AI Agent Orchestration Tools 2026 | Context Studios."{" "}
                  <Ext href="https://www.contextstudios.ai/guides/ai-agent-orchestration-tools-2026">
                    <span>
                      https://www.contextstudios.ai/guides/ai-agent-orchestration-tools-2026
                    </span>
                  </Ext>
                </li>
              </ul>
            </div>
          </div>
          <p>
            <em>
              本ガイドはO'Reilly/Packt Publishing『Architecting Generative AI
              Applications』の目次構成をもとに、公開情報と2026年9月時点のウェブ検索調査に基づいて独自に再構成した学習資料であり、原著の文章・図版の複製ではありません。原著の詳細な内容については、上記O'Reillyの書誌ページからのご購読・ご購入をご検討ください。
            </em>
          </p>
        </main>
      </div>
    </div>
  );
}
