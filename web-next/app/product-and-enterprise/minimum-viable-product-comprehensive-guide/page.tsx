import {
  IconAlertTriangle,
  IconArrowsShuffle,
  IconAward,
  IconBan,
  IconBooks,
  IconBrandGoogle,
  IconBuildingArch,
  IconBulb,
  IconCalendar,
  IconChartBar,
  IconChartDots,
  IconChartLine,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconCode,
  IconLeaf,
  IconLink,
  IconListCheck,
  IconMap,
  IconMessageCircle,
  IconMinimize,
  IconNotes,
  IconPackage,
  IconRecycle,
  IconRocket,
  IconStack2,
  IconTrendingUp,
  IconUser,
  IconUsers,
  IconWaveSawTool,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import MvpSidebar from "./MvpSidebar";
import { NAV_ITEMS } from "./navigation";

export const metadata: Metadata = {
  title: "MVP（最小実行可能製品）開発 完全ガイド",
  description:
    "初学者から中級エンジニアまでを対象に、MVP開発の思想・プロセス・実装・測定を網羅的に解説します。リーンスタートアップの原則に基づき、無駄なく素早く学ぶためのロードマップを提供します。",
};

const DIAGRAMS = {
  "lean-1":
    'flowchart TD\nIDEAS["💡 アイデア(仮説)"]\nBUILD["🔨 Build(構築)<br/>仮説を検証するMVPを素早く構築"]\nPRODUCT["📦 プロダクト(MVP)"]\nMEASURE["📊 Measure(測定)<br/>実ユーザーの行動データを定量計測"]\nDATA["📈 データ(指標・メトリクス)"]\nLEARN["🧠 Learn(学習)<br/>何が正しく何が間違っていたかを学ぶ"]\n\nIDEAS --> BUILD --> PRODUCT --> MEASURE --> DATA --> LEARN\nLEARN -->|"仮説を更新"| IDEAS\n\nstyle IDEAS fill:#d97706,color:#fff,stroke:none\nstyle BUILD fill:#dc2626,color:#fff,stroke:none\nstyle PRODUCT fill:#2563eb,color:#fff,stroke:none\nstyle MEASURE fill:#7c3aed,color:#fff,stroke:none\nstyle DATA fill:#0d9488,color:#fff,stroke:none\nstyle LEARN fill:#16a34a,color:#fff,stroke:none',
  "lean-2":
    'graph LR\nA["仮説<br/>(Assumption)<br/>「顧客はXという問題を持つ」<br/>「Yという解決策が機能するはず」"]\nB["実験<br/>(Experiment)<br/>最小の労力でこの仮説を<br/>検証できるMVPを構築する"]\nC["結果<br/>(Result)<br/>実際のユーザー行動から<br/>定量的なデータを収集する"]\nD["洞察<br/>(Insight)<br/>仮説は正しかったか？<br/>何を学んだか？"]\n\nA --> B --> C --> D --> A\n\nstyle A fill:#dc2626,color:#fff,stroke:none\nstyle B fill:#2563eb,color:#fff,stroke:none\nstyle C fill:#d97706,color:#fff,stroke:none\nstyle D fill:#16a34a,color:#fff,stroke:none',
  "process-1":
    'flowchart TD\nP1["🔍 Phase 1:問題発見<br/>顧客インタビュー・市場調査・競合分析"]\nP2["🎯 Phase 2:スコープ定義<br/>ユーザーストーリー・機能優先順位・KPI設定"]\nP3["🏗️ Phase 3:アーキテクチャ設計<br/>技術スタック選定・拡張性・セキュリティ"]\nP4["⚙️ Phase 4:実装<br/>コア機能の開発・CI/CD整備・品質保証"]\nP5["🚀 Phase 5:リリース<br/>限定公開・段階的ロールアウト・監視設定"]\nP6["📊 Phase 6:測定<br/>メトリクス収集・ユーザー行動分析・定性フィードバック"]\nP7["🔄 Phase 7:学習・意思決定<br/>ピボット or 継続・次の仮説・機能追加計画"]\n\nP1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7\nP7 -->|"反復"| P1\n\nstyle P1 fill:#2563eb,color:#fff,stroke:none\nstyle P2 fill:#7c3aed,color:#fff,stroke:none\nstyle P3 fill:#ea580c,color:#fff,stroke:none\nstyle P4 fill:#dc2626,color:#fff,stroke:none\nstyle P5 fill:#16a34a,color:#fff,stroke:none\nstyle P6 fill:#0d9488,color:#fff,stroke:none\nstyle P7 fill:#d97706,color:#fff,stroke:none',
  "step1-1":
    'flowchart TD\nH["💡 問題仮説を立てる<br/>「〇〇な人は△△に困っている」"]\nI["👥 顧客インタビューを行う<br/>最低20から50件<br/>ソリューションは話さず問題だけ聞く"]\nP["🔍 パターンを見つける<br/>同じ問題が繰り返し聞かれるか？<br/>痛みのレベルは高いか？"]\nV["✅ 問題が検証できた<br/>20件中15件以上が同じ問題<br/>既存解決策への不満がある<br/>解決にお金を払う意思がある"]\nX["❌ 問題が検証できなかった<br/>問題の重要度が低い<br/>既存解決策で十分<br/>仮説の見直しが必要"]\nN["Step 2へ:スコープ定義"]\n\nH --> I --> P\nP -->|"問題確認"| V\nP -->|"問題なし"| X\nX -->|"仮説修正"| H\nV --> N\n\nstyle H fill:#d97706,color:#fff,stroke:none\nstyle I fill:#2563eb,color:#fff,stroke:none\nstyle P fill:#7c3aed,color:#fff,stroke:none\nstyle V fill:#16a34a,color:#fff,stroke:none\nstyle X fill:#dc2626,color:#fff,stroke:none',
  "step1-2":
    'graph TD\nTAM["🌍 TAM(Total Addressable Market)<br/>全体到達可能市場<br/>理論上の最大市場規模<br/>例:全世界のSaaS市場"]\nSAM["🗾 SAM(Serviceable Addressable Market)<br/>サービス可能市場<br/>自社が届けられる範囲<br/>例:日本のSaaS市場"]\nSOM["🎯 SOM(Serviceable Obtainable Market)<br/>実際に獲得可能な市場<br/>現実的に獲得できる規模<br/>例:中小企業向けSaaS"]\nMVP_T["🚀 MVP ターゲット<br/>最初の100から1000ユーザー<br/>アーリーアダプター<br/>特定のニッチから始める"]\n\nTAM --> SAM --> SOM --> MVP_T\n\nstyle TAM fill:#2563eb,color:#fff,stroke:none\nstyle SAM fill:#16a34a,color:#fff,stroke:none\nstyle SOM fill:#ea580c,color:#fff,stroke:none\nstyle MVP_T fill:#dc2626,color:#fff,stroke:none',
  "step2-1":
    'graph LR\nS["📍 状況<br/>(Situation)<br/>「〇〇なとき」"]\nM["💪 動機<br/>(Motivation)<br/>「△△したい」"]\nO["🏆 期待する結果<br/>(Outcome)<br/>「〇〇できるように」"]\n\nS --> M --> O\n\nstyle S fill:#2563eb,color:#fff,stroke:none\nstyle M fill:#16a34a,color:#fff,stroke:none\nstyle O fill:#dc2626,color:#fff,stroke:none',
  "step2-2":
    'graph TD\nMO["📋 MoSCoW 優先順位付け"]\nMU["🔴 Must Have(必須)<br/>MVPに絶対必要な機能<br/>これがないと製品として成立しない<br/>例:ユーザー登録・コア機能・基本UI"]\nSH["🟡 Should Have(重要)<br/>あれば価値が高い機能<br/>時間があれば第1リリースに含める<br/>例:通知機能・詳細フィルター"]\nCO["🟢 Could Have(あれば良い)<br/>優先度が低い機能<br/>将来のイテレーションに延期<br/>例:テーマ変更・高度な分析"]\nWO["⚫ Won\'t Have(今回は不要)<br/>意図的に除外する機能<br/>スコープを守るために明示的に排除<br/>例:AIレコメンド・多言語対応"]\nSC["🚀 MVP スコープ<br/>= Must Have のみ"]\n\nMO --> MU & SH & CO & WO\nMU --> SC\n\nstyle MU fill:#dc2626,color:#fff,stroke:none\nstyle SH fill:#d97706,color:#fff,stroke:none\nstyle CO fill:#16a34a,color:#fff,stroke:none\nstyle WO fill:#374151,color:#fff,stroke:none\nstyle SC fill:#1e2530,color:#e6edf3,stroke:#0d9488,stroke-width:2px',
  "step2-3":
    'graph TD\nA1["🔵 Acquisition(獲得)<br/>ユーザーをどう獲得するか<br/>指標:訪問者数・登録率・CAC"]\nA2["🟢 Activation(活性化)<br/>最初の価値を体験させられるか<br/>指標:オンボーディング完了率"]\nA3["🟡 Retention(継続)<br/>ユーザーが戻ってくるか<br/>指標:DAU/MAU・チャーンレート"]\nA4["🟠 Revenue(収益)<br/>お金を生み出せるか<br/>指標:MRR・LTV・ARPU"]\nA5["🔴 Referral(紹介)<br/>自発的に広めてくれるか<br/>指標:NPS・紹介率"]\nFO["🎯 MVPフェーズの重点指標<br/>Activation率 と Retention率<br/>「使われているか」を最初に確認"]\n\nA1 --> A2 --> A3 --> A4 --> A5\nA3 --> FO\n\nstyle A1 fill:#2563eb,color:#fff,stroke:none\nstyle A2 fill:#16a34a,color:#fff,stroke:none\nstyle A3 fill:#d97706,color:#fff,stroke:none\nstyle A4 fill:#ea580c,color:#fff,stroke:none\nstyle A5 fill:#dc2626,color:#fff,stroke:none\nstyle FO fill:#1e2530,color:#e6edf3,stroke:#0d9488,stroke-width:2px',
  "step3-1":
    'flowchart TD\nS["MVP アーキテクチャを選ぶ"]\nQ1{"チームサイズは？"}\nQ2{"スケールの必要性は<br/>いつ来るか？"}\nMO["✅ モノリシックアーキテクチャ<br/>【MVPに最も推奨】<br/>開発速度が速い・運用シンプル<br/>チーム:1から5人"]\nMM["✅ モジュラーモノリス<br/>【成長段階のMVPに推奨】<br/>将来の分割を見据えた設計<br/>チーム:5から15人"]\nMS["⚠️ マイクロサービス<br/>【MVPには過剰設計になりがち】<br/>必要になってから移行する<br/>チーム:15人以上"]\n\nS --> Q1\nQ1 -->|"1から5人"| MO\nQ1 -->|"5から15人"| Q2\nQ1 -->|"15人以上"| MS\nQ2 -->|"1年以内は不要"| MO\nQ2 -->|"6ヶ月以内に必要"| MM\n\nstyle MO fill:#16a34a,color:#fff,stroke:none\nstyle MM fill:#2563eb,color:#fff,stroke:none\nstyle MS fill:#ea580c,color:#fff,stroke:none',
  "step3-2":
    'graph TD\nsubgraph CLIENT["クライアント層"]\nWEB["Web アプリ(React / Next.js)"]\nMOBILE["モバイルアプリ(React Native)"]\nend\nsubgraph BACKEND["バックエンドモノリス"]\nAPI["REST API 層<br/>ルーティング・認証"]\nBIZ["ビジネスロジック層<br/>コアドメイン"]\nDATA["データアクセス層<br/>ORM / Repository"]\nend\nsubgraph INFRA["インフラ"]\nDB[("PostgreSQL<br/>メインDB")]\nCACHE["Redis<br/>セッション・キャッシュ"]\nSTORAGE["S3<br/>ファイルストレージ"]\nend\nsubgraph EXTERNAL["外部サービス"]\nAUTH_E["Auth0 / Firebase Auth"]\nEMAIL_E["SendGrid<br/>メール送信"]\nPAY_E["Stripe<br/>決済"]\nMON["Sentry + Datadog<br/>監視・エラー追跡"]\nend\n\nWEB & MOBILE --> API\nAPI --> BIZ --> DATA\nDATA --> DB\nAPI --> CACHE\nDATA --> STORAGE\nAPI --> AUTH_E & EMAIL_E & PAY_E\nBACKEND --> MON',
  "step5-1":
    'flowchart TD\nCODE["コードを書く"]\nLT["ローカルテスト実行<br/>(jest / pytest)"]\nPUSH["git commit & push"]\nLINT["Lint チェック<br/>(ESLint / Ruff)"]\nTYPE["型チェック<br/>(TypeScript / mypy)"]\nTEST["ユニットテスト"]\nBUILD["ビルド確認"]\nSTG["ステージング自動デプロイ<br/>PRごとにプレビューURL生成"]\nSMOKE["スモークテスト<br/>(基本動作確認)"]\nPROD["本番デプロイ<br/>(mainマージ後)"]\nMON["デプロイ後監視<br/>(エラー率・レイテンシ)"]\n\nCODE --> LT --> PUSH\nPUSH --> LINT --> TYPE --> TEST --> BUILD\nBUILD -->|"PR作成時"| STG --> SMOKE\nSMOKE -->|"PRマージ後"| PROD --> MON\n\nstyle STG fill:#d97706,color:#fff,stroke:none\nstyle PROD fill:#16a34a,color:#fff,stroke:none\nstyle MON fill:#2563eb,color:#fff,stroke:none',
  "step5-2":
    'graph TD\nE2E["E2Eテスト(最小限)<br/>重要なユーザーシナリオのみ<br/>Cypress / Playwright<br/>数件程度"]\nINT["統合テスト(中程度)<br/>APIエンドポイントの動作確認<br/>外部サービスとの連携確認"]\nUNIT["ユニットテスト(多め)<br/>ビジネスロジックのコア部分<br/>計算・バリデーション・変換ロジック<br/>MVPで最も価値が高いテスト"]\n\nUNIT --> INT --> E2E\n\nstyle E2E fill:#dc2626,color:#fff,stroke:none\nstyle INT fill:#d97706,color:#fff,stroke:none\nstyle UNIT fill:#16a34a,color:#fff,stroke:none',
  "step6-1":
    'flowchart LR\nD["1️⃣ 測定する指標を<br/>事前に決める<br/>KPIを数値で定義<br/>「良い状態」の閾値を設定"]\nI["2️⃣ 計測コードを<br/>組み込む<br/>イベントトラッキング<br/>ファネル分析の設計"]\nB["3️⃣ ダッシュボードを<br/>作成する<br/>毎日見る習慣をつける<br/>自動レポートを設定"]\nR["4️⃣ 定期レビュー<br/>週次で指標を確認<br/>異常値をすぐに検知"]\n\nD --> I --> B --> R\n\nstyle D fill:#2563eb,color:#fff,stroke:none\nstyle I fill:#16a34a,color:#fff,stroke:none\nstyle B fill:#d97706,color:#fff,stroke:none\nstyle R fill:#7c3aed,color:#fff,stroke:none',
  "step7-1":
    'flowchart TD\nR["📊 定期レビュー(週次/月次)<br/>指標データを確認する"]\nC1{"北極星指標は<br/>目標値を達成しているか？"}\nC2{"ユーザーが<br/>本当の問題を解決できているか？"}\nC3{"ビジネスとして<br/>持続可能か？"}\nPE["✅ 継続(Persevere)<br/>現在の戦略を続ける<br/>機能を深化させる<br/>拡大に集中する"]\nPV["🔄 ピボット(Pivot)<br/>戦略を変える<br/>前提を見直す<br/>何かを根本的に変える"]\nST["🛑 停止<br/>市場がない・解決策がない<br/>リソースを他に向ける"]\n\nR --> C1\nC1 -->|"Yes"| C2\nC1 -->|"No(でも伸びている)"| PE\nC1 -->|"No(止まっている)"| PV\nC2 -->|"Yes"| C3\nC2 -->|"No"| PV\nC3 -->|"Yes"| PE\nC3 -->|"No"| PV\nPV -->|"方向性が見えない"| ST\n\nstyle PE fill:#16a34a,color:#fff,stroke:none\nstyle PV fill:#d97706,color:#fff,stroke:none\nstyle ST fill:#dc2626,color:#fff,stroke:none',
  "failures-1":
    'graph LR\nsubgraph FAIL["失敗パターン"]\nF1["Too Big MVP<br/>「最小限」なのに多機能<br/>→ リリースが遅れ学習も遅れる"]\nF2["Problem-Solution Fit なし<br/>顧客検証なしに作り始める<br/>→ 誰も使わないものができる"]\nF3["間違った指標を追う<br/>バニティメトリクスに集中<br/>→ 本質的な学習ができない"]\nF4["フィードバックを聞かない<br/>批判的意見を無視する<br/>→ 確証バイアスに陥る"]\nF5["技術負債の過剰蓄積<br/>MVPで妥協しすぎる<br/>→ 第2バージョンが作れない"]\nF6["過剰設計<br/>MVPでマイクロサービスを作る<br/>→ 機能より技術に時間をかける"]\nend\n\nsubgraph SOL["対策"]\nS1["機能リストを3回絞り込む<br/>「本当に必要か？」を繰り返す"]\nS2["先にインタビュー20件<br/>コードを書く前に検証する"]\nS3["North Star Metricを1つ決める<br/>Actionable Metricsを使う"]\nS4["毎週ユーザーと話す<br/>批判は宝として扱う"]\nS5["意図的な負債を文書化<br/>期限付きで管理する"]\nS6["モノリスから始める<br/>必要になってから分割する"]\nend\n\nF1 --> S1\nF2 --> S2\nF3 --> S3\nF4 --> S4\nF5 --> S5\nF6 --> S6\n\nstyle F1 fill:#dc2626,color:#fff,stroke:none\nstyle F2 fill:#dc2626,color:#fff,stroke:none\nstyle F3 fill:#dc2626,color:#fff,stroke:none\nstyle F4 fill:#dc2626,color:#fff,stroke:none\nstyle F5 fill:#dc2626,color:#fff,stroke:none\nstyle F6 fill:#dc2626,color:#fff,stroke:none\nstyle S1 fill:#16a34a,color:#fff,stroke:none\nstyle S2 fill:#16a34a,color:#fff,stroke:none\nstyle S3 fill:#16a34a,color:#fff,stroke:none\nstyle S4 fill:#16a34a,color:#fff,stroke:none\nstyle S5 fill:#16a34a,color:#fff,stroke:none\nstyle S6 fill:#16a34a,color:#fff,stroke:none',
  "scale-1":
    'graph LR\nsubgraph MVP["🚀 MVPフェーズ"]\nM1["モノリシックアプリ<br/>(単一サーバー)"]\nM2[("PostgreSQL<br/>(単一DB)")]\nM1 --> M2\nend\nsubgraph GROWTH["📈 成長フェーズ"]\nG1["ロードバランサー"]\nG2["App Server 1"]\nG3["App Server 2"]\nG4["Redis<br/>キャッシュ"]\nG5[("DB Primary")]\nG6[("DB Replica")]\nG1 --> G2 & G3\nG2 & G3 --> G4\nG2 & G3 --> G5\nG5 --> G6\nend\nsubgraph SCALE["🏢 スケールフェーズ"]\nS1["CDN"]\nS2["API Gateway"]\nS3["サービスA"]\nS4["サービスB"]\nS5["メッセージキュー"]\nS1 --> S2\nS2 --> S3 & S4\nS3 --> S5 --> S4\nend\n\nMVP -->|"PMF達成後"| GROWTH\nGROWTH -->|"さらなる成長後"| SCALE',
  "rules-1":
    'flowchart TD\nCH["MVP 健全性チェック"]\nQ1{"顧客インタビューを<br/>最低20件実施したか？"}\nQ2{"MVP機能を<br/>3回以上削減したか？"}\nQ3{"North Star Metricが<br/>1つ定義されているか？"}\nQ4{"2から3ヶ月以内に<br/>リリースできるか？"}\nQ5{"実ユーザーへの<br/>提供ができているか？"}\nQ6{"毎週データを<br/>確認しているか？"}\nOK["✅ 健全なMVP開発<br/>学習のサイクルが回っている"]\n\nF1["まず問題の検証を<br/>コードを書くのを止める"]\nF2["スコープを削る<br/>Must Haveのみに絞る"]\nF3["指標を決める<br/>何を目標にするか合意する"]\nF4["さらに機能を削る<br/>段階的リリースを計画"]\nF5["実ユーザーに届ける<br/>内部テストを超える"]\nF6["ダッシュボードを設定<br/>自動レポートを作る"]\n\nCH --> Q1\nQ1 -->|"No"| F1\nQ1 -->|"Yes"| Q2\nQ2 -->|"No"| F2\nQ2 -->|"Yes"| Q3\nQ3 -->|"No"| F3\nQ3 -->|"Yes"| Q4\nQ4 -->|"No"| F4\nQ4 -->|"Yes"| Q5\nQ5 -->|"No"| F5\nQ5 -->|"Yes"| Q6\nQ6 -->|"No"| F6\nQ6 -->|"Yes"| OK\n\nstyle OK fill:#16a34a,color:#fff,stroke:none\nstyle F1 fill:#dc2626,color:#fff,stroke:none\nstyle F2 fill:#dc2626,color:#fff,stroke:none\nstyle F3 fill:#dc2626,color:#fff,stroke:none\nstyle F4 fill:#dc2626,color:#fff,stroke:none\nstyle F5 fill:#dc2626,color:#fff,stroke:none\nstyle F6 fill:#dc2626,color:#fff,stroke:none',
} as const;

export default function Page() {
  return (
    <div className="minimum-viable-product-comprehensive-guide">
      <MvpSidebar items={NAV_ITEMS} />
      <main className="main">
        <header className="page-header">
          <div className="page-eyebrow">{"Software Architecture Guide"}</div>
          <h1 className="page-title">
            {"MVP（最小実行可能製品）開発"}
            <br />
            {"完全ガイド"}
          </h1>
          <p className="page-description">
            {
              "初学者から中級エンジニアまでを対象に、MVP開発の思想・プロセス・実装・測定を網羅的に解説します。リーンスタートアップの原則に基づき、無駄なく素早く学ぶためのロードマップを提供します。"
            }
          </p>
          <div style={{ marginTop: "20px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span className="tag green">
              <IconClock size={16} className="mvp-icon icon-clock" aria-hidden="true" />
              {"読了目安 30分"}
            </span>
            <span className="tag purple">
              <IconUser size={16} className="mvp-icon icon-user" aria-hidden="true" />
              {"初学者対応"}
            </span>
            <span className="tag coral">
              <IconCalendar size={16} className="mvp-icon icon-calendar" aria-hidden="true" />
              {"2025年版"}
            </span>
          </div>
        </header>
        <section className="section" id="intro">
          <h2>
            <IconBulb size={18} className="mvp-icon icon-bulb" aria-hidden="true" />
            {"1. MVPとは何か"}
          </h2>
          <p>
            {"MVP（Minimum Viable Product / 最小実行可能製品）とは、"}
            <strong style={{ color: "var(--color-text-primary)" }}>
              {"「最小限の機能で最大限の学びを得るために構築するプロダクト」"}
            </strong>
            {
              "です。Eric Riesが著書「The Lean Startup」で提唱し、現代のプロダクト開発における根幹哲学となっています。"
            }
          </p>
          <div className="callout">
            <div className="callout-label">{"一言で言うと"}</div>
            <p>
              {
                "「作りすぎず、学ぶための最小限のプロダクトを素早く届けて、顧客の反応から真実を学ぶ」手法です。"
              }
            </p>
          </div>
          <h3>{"1.1 「M・V・P」それぞれの意味"}</h3>
          <div className="cards">
            <div className="card">
              <div className="card-icon purple">
                <IconMinimize size={18} className="mvp-icon icon-minimize" aria-hidden="true" />
              </div>
              <div className="card-title">{"Minimum（最小限）"}</div>
              <div className="card-desc">
                {"機能を徹底的に絞り込む。余分な機能を一切含めず、必要最低限の機能だけを実装する。"}
              </div>
            </div>
            <div className="card">
              <div className="card-icon teal">
                <IconCircleCheck
                  size={18}
                  className="mvp-icon icon-circle-check"
                  aria-hidden="true"
                />
              </div>
              <div className="card-title">{"Viable（実行可能）"}</div>
              <div className="card-desc">
                {"ユーザーが実際に使える状態。コア価値を体験できる品質を備えている。"}
              </div>
            </div>
            <div className="card">
              <div className="card-icon coral">
                <IconPackage size={18} className="mvp-icon icon-package" aria-hidden="true" />
              </div>
              <div className="card-title">{"Product（製品）"}</div>
              <div className="card-desc">
                {"プロトタイプではなく、実際にユーザーに届ける本物のプロダクト。"}
              </div>
            </div>
          </div>
          <h3>{"1.2 モックアップ・プロトタイプとの違い"}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"種別"}</th>
                  <th>{"動作"}</th>
                  <th>{"対象"}</th>
                  <th>{"目的"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"モックアップ・ワイヤーフレーム"}</td>
                  <td>{"動作しない"}</td>
                  <td>{"内部チーム"}</td>
                  <td>{"デザイン検証"}</td>
                </tr>
                <tr>
                  <td>{"プロトタイプ"}</td>
                  <td>{"限定的に動作"}</td>
                  <td>{"内部向け"}</td>
                  <td>{"技術検証"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"MVP"}</strong>
                  </td>
                  <td>
                    <strong>{"実際に動作"}</strong>
                  </td>
                  <td>
                    <strong>{"実ユーザーへ提供"}</strong>
                  </td>
                  <td>
                    <strong>{"市場検証"}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>{"1.3 MVPが重要な理由：従来型開発との比較"}</h3>
          <div className="two-col">
            <div className="panel">
              <div className="panel-title bad">
                <IconCircleX size={16} className="mvp-icon icon-circle-x" aria-hidden="true" />
                {"MVPなし（従来型）"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"完全な機能を1年かけて開発"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"リリース後に顧客が使わないと判明"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"時間・コスト・機会を大量に損失"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"競合に遅れをとる"}
                </li>
              </ul>
            </div>
            <div className="panel">
              <div className="panel-title good">
                <IconCircleCheck
                  size={16}
                  className="mvp-icon icon-circle-check"
                  aria-hidden="true"
                />
                {"MVPあり（リーン開発）"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"最小機能を2〜3ヶ月で構築"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"実ユーザーのフィードバックを取得"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"必要な方向性が明確になる"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"競合より早く市場参入できる"}
                </li>
              </ul>
            </div>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"Eric Ries公式サイト — "}
                <Ext href="https://theleanstartup.com/">{"https://theleanstartup.com/"}</Ext>
              </li>
              <li>
                {"Lean Startup Wikipedia — "}
                <Ext href="https://en.wikipedia.org/wiki/Lean_startup">
                  {"https://en.wikipedia.org/wiki/Lean_startup"}
                </Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="lean">
          <h2>
            <IconRecycle size={18} className="mvp-icon icon-recycle" aria-hidden="true" />
            {"2. MVPの思想的背景：リーンスタートアップ"}
          </h2>
          <h3>{"2.1 Build-Measure-Learn サイクル"}</h3>
          <p>
            {"MVPの中核にある考え方は、"}
            <span className="hl-teal">{"Build（構築）→ Measure（測定）→ Learn（学習）"}</span>
            {"の高速サイクルです。このサイクルをいかに短くするかが、MVP成功の鍵となります。"}
          </p>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["lean-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"Build-Measure-Learn サイクル：このループを高速で回すことがMVPの本質"}
            </div>
          </div>
          <h3>{"2.2 検証済み学習（Validated Learning）"}</h3>
          <p>
            {
              "MVPでは「作った」ことではなく、「学んだ」ことが成果です。仮説を立て、実験し、データで検証するプロセスを繰り返します。"
            }
          </p>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["lean-2"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">{"検証済み学習のサイクル：仮説→実験→結果→洞察"}</div>
          </div>
          <h3>{"2.3 Innovation Accounting（イノベーション会計）"}</h3>
          <p>{"MVPの成果は従来の財務指標ではなく、「学習の進捗」で測定します。"}</p>
          <div className="two-col">
            <div className="panel">
              <div className="panel-title bad">
                <IconCircleX size={16} className="mvp-icon icon-circle-x" aria-hidden="true" />
                {"従来の指標（避けるべき）"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"総ユーザー数（見栄えが良いだけ）"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"ページビュー（行動に繋がらない）"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"フォロワー数（本質的価値なし）"}
                </li>
              </ul>
            </div>
            <div className="panel">
              <div className="panel-title good">
                <IconCircleCheck
                  size={16}
                  className="mvp-icon icon-circle-check"
                  aria-hidden="true"
                />
                {"リーン指標（Actionable Metrics）"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"顧客獲得コスト（CAC）"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"顧客生涯価値（LTV）"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"リテンション率（継続率）"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"機能の実際の使用率"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"NPS（顧客推奨度）"}
                </li>
              </ul>
            </div>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"Y Combinator — "}
                <Ext href="https://www.youtube.com/watch?v=Do3mS7p6G3A">
                  {"How to Validate Your Startup Idea (YouTube)"}
                </Ext>
              </li>
              <li>
                {"Amplitude North Star Playbook — "}
                <Ext href="https://amplitude.com/books/north-star">
                  {"https://amplitude.com/books/north-star"}
                </Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="process">
          <h2>
            <IconMap size={18} className="mvp-icon icon-map" aria-hidden="true" />
            {"3. MVP開発の全体プロセス"}
          </h2>
          <p>
            {
              "MVP開発は7つのフェーズで構成されます。各フェーズは順番に進みますが、学習サイクルによって前のフェーズに戻ることもあります。"
            }
          </p>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["process-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"MVP開発の7フェーズ：Phase 7が終わったら、学びを元にPhase 1に戻る"}
            </div>
          </div>
          <h3>{"タイムライン目安（2〜3ヶ月）"}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"フェーズ"}</th>
                  <th>{"期間目安"}</th>
                  <th>{"主なアウトプット"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Phase 1 問題発見"}</td>
                  <td>{"2〜3週間"}</td>
                  <td>{"顧客インタビュー20件以上・課題仮説の検証"}</td>
                </tr>
                <tr>
                  <td>{"Phase 2 スコープ定義"}</td>
                  <td>{"1〜2週間"}</td>
                  <td>{"ユーザーストーリー・KPI・MoSCoW優先順位"}</td>
                </tr>
                <tr>
                  <td>{"Phase 3 設計"}</td>
                  <td>{"2週間"}</td>
                  <td>{"アーキテクチャ図・UIプロトタイプ"}</td>
                </tr>
                <tr>
                  <td>{"Phase 4 実装"}</td>
                  <td>{"4〜6週間"}</td>
                  <td>{"動作するMVP・テスト・CI/CD"}</td>
                </tr>
                <tr>
                  <td>{"Phase 5 リリース"}</td>
                  <td>{"1週間"}</td>
                  <td>{"限定ベータ・監視ダッシュボード"}</td>
                </tr>
                <tr>
                  <td>{"Phase 6-7 学習"}</td>
                  <td>{"2〜4週間"}</td>
                  <td>{"データ分析・意思決定・次の計画"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="section" id="step1">
          <div className="step-badge">
            <span className="step-badge-num">{"1"}</span>
            <span className="step-badge-text">{"Step 1"}</span>
          </div>
          <h2>
            <IconUsers size={18} className="mvp-icon icon-users" aria-hidden="true" />
            {"4. 問題発見と顧客検証"}
          </h2>
          <div className="callout warning">
            <div className="callout-label">{"最重要ステップ"}</div>
            <p>
              {
                "MVPを作る前に「本当に解くべき問題があるか」を確認することが最重要です。コードを書く前にインタビューを行うことで、誰も使わないものを作るリスクを大幅に減らせます。"
              }
            </p>
          </div>
          <h3>{"4.1 顧客開発プロセス"}</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step1-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"顧客開発フロー：「問題を見つける」フェーズ。ソリューションの話は禁止"}
            </div>
          </div>
          <h3>{"4.2 顧客インタビューのベストプラクティス"}</h3>
          <div className="two-col">
            <div className="panel">
              <div className="panel-title good">
                <IconCircleCheck
                  size={16}
                  className="mvp-icon icon-circle-check"
                  aria-hidden="true"
                />
                {"やるべきこと（DO）"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"過去の行動について聞く「以前この問題をどう解決しましたか？」"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"具体的な事例を聞く「最後にそれが起きたのはいつですか？」"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"感情を掘り下げる「そのときどう感じましたか？」"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"沈黙を活用する。相手が考える時間を与える"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"「なぜ？」を3〜5回繰り返して根本原因を探る"}
                </li>
              </ul>
            </div>
            <div className="panel">
              <div className="panel-title bad">
                <IconCircleX size={16} className="mvp-icon icon-circle-x" aria-hidden="true" />
                {"やってはいけないこと（DON'T）"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"ソリューションを説明する「こんな機能があったら使いますか？」"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"Yes/Noで答えられる質問をする「この問題は困りますか？」"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"未来の行動を聞く「もし〇〇があったら使いますか？」"}
                </li>
                <li>
                  <IconCircleX size={15} className="mvp-icon icon-circle-x" aria-hidden="true" />
                  {"インタビューで自分のアイデアを正当化しようとする"}
                </li>
              </ul>
            </div>
          </div>
          <h3>{"4.3 市場規模の確認（TAM・SAM・SOM）"}</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step1-2"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"市場規模の3層構造：MVPでは最初に最もニッチなターゲットを狙う"}
            </div>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"The Mom Test（顧客インタビュー方法論）— "}
                <Ext href="https://www.momtestbook.com/">{"https://www.momtestbook.com/"}</Ext>
              </li>
              <li>
                {"Steve Blank Customer Development — "}
                <Ext href="https://steveblank.com/category/customer-development/">
                  {"https://steveblank.com/category/customer-development/"}
                </Ext>
              </li>
              <li>
                {"Superhuman PMF事例 — "}
                <Ext href="https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/">
                  {"First Round Review"}
                </Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="step2">
          <div className="step-badge">
            <span className="step-badge-num">{"2"}</span>
            <span className="step-badge-text">{"Step 2"}</span>
          </div>
          <h2>
            <IconListCheck size={18} className="mvp-icon icon-list-check" aria-hidden="true" />
            {"5. MVPのスコープ定義"}
          </h2>
          <h3>{"5.1 Jobs-to-be-Done（JTBD）フレームワーク"}</h3>
          <p>
            {
              "機能リストではなく、「ユーザーが何を達成しようとしているか」を中心に考えます。JTBDは「状況・動機・期待する結果」の3要素で構成されます。"
            }
          </p>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step2-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {
                "JTBD例：「毎朝の通勤電車で（状況）/ 英語を効率的に学習したい（動機）/ TOEICスコアを上げられるように（結果）」"
              }
            </div>
          </div>
          <h3>{"5.2 機能優先順位付け：MoSCoW法"}</h3>
          <p>
            {"MVPに含める機能を4つのカテゴリで分類し、"}
            <span className="hl-coral">{"Must Have のみ"}</span>
            {"をMVPに含めます。"}
          </p>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step2-2"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"MoSCoW法：MVPに含めるのは「Must Have」だけ。他は意識的に排除する"}
            </div>
          </div>
          <h3>{"5.3 MVP KPI設定：AARRRフレームワーク"}</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step2-3"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"AARRRフレームワーク：MVPフェーズではActivationとRetentionに集中する"}
            </div>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"AARRR フレームワーク — "}
                <Ext href="https://www.startuplessonslearned.com/">
                  {"https://www.startuplessonslearned.com/"}
                </Ext>
              </li>
              <li>
                {"Lean Canvas（Ash Maurya）— "}
                <Ext href="https://leanstack.com/lean-canvas">
                  {"https://leanstack.com/lean-canvas"}
                </Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="step3">
          <div className="step-badge">
            <span className="step-badge-num">{"3"}</span>
            <span className="step-badge-text">{"Step 3"}</span>
          </div>
          <h2>
            <IconBuildingArch
              size={18}
              className="mvp-icon icon-building-arch"
              aria-hidden="true"
            />
            {"6. アーキテクチャ選択"}
          </h2>
          <div className="callout success">
            <div className="callout-label">{"MVPの鉄則"}</div>
            <p>
              {
                "MVPではモノリシックアーキテクチャから始めることを強く推奨します。マイクロサービスは過剰設計になりがちで、学習速度を下げます。「必要になってから分割する」が正しいアプローチです。"
              }
            </p>
          </div>
          <h3>{"6.1 アーキテクチャ選択フロー"}</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step3-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"アーキテクチャ選択フロー：小さなチームはモノリスから始める"}
            </div>
          </div>
          <h3>{"6.2 MVP向けアーキテクチャ全体像"}</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step3-2"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"MVP向けアーキテクチャ：外部サービスを最大活用し、自前実装を最小化する"}
            </div>
          </div>
          <h3>{"6.3 今 vs 将来のトレードオフ"}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"要素"}</th>
                  <th>{"MVPフェーズ（今）"}</th>
                  <th>{"成長フェーズ（将来）"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"サーバー"}</td>
                  <td>{"単一サーバー（EC2 / Heroku）"}</td>
                  <td>{"ロードバランサー＋複数サーバー"}</td>
                </tr>
                <tr>
                  <td>{"データベース"}</td>
                  <td>{"単一DB（PostgreSQL）"}</td>
                  <td>{"リードレプリカ・シャーディング"}</td>
                </tr>
                <tr>
                  <td>{"API構造"}</td>
                  <td>{"モノリシックAPI"}</td>
                  <td>{"マイクロサービス（必要な部分のみ）"}</td>
                </tr>
                <tr>
                  <td>{"認証"}</td>
                  <td>{"シンプルな認証（JWT）"}</td>
                  <td>{"OAuth2 / SSO"}</td>
                </tr>
                <tr>
                  <td>{"デプロイ"}</td>
                  <td>{"手動またはシンプルなCI/CD"}</td>
                  <td>{"完全自動化されたパイプライン"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"Martin Fowler — Monolith First: "}
                <Ext href="https://martinfowler.com/bliki/MonolithFirst.html">
                  {"https://martinfowler.com/bliki/MonolithFirst.html"}
                </Ext>
              </li>
              <li>
                {"Twelve-Factor App（SaaS設計原則）— "}
                <Ext href="https://12factor.net/ja/">{"https://12factor.net/ja/"}</Ext>
              </li>
              <li>
                {"Martin Fowler — Sacrificial Architecture: "}
                <Ext href="https://martinfowler.com/bliki/SacrificialArchitecture.html">
                  {"https://martinfowler.com/bliki/SacrificialArchitecture.html"}
                </Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="step4">
          <div className="step-badge">
            <span className="step-badge-num">{"4"}</span>
            <span className="step-badge-text">{"Step 4"}</span>
          </div>
          <h2>
            <IconStack2 size={18} className="mvp-icon icon-stack-2" aria-hidden="true" />
            {"7. 技術スタック選定"}
          </h2>
          <h3>{"7.1 選定の判断基準（優先順）"}</h3>
          <div className="rule-list">
            <div className="rule-item">
              <div className="rule-num">{"1"}</div>
              <div className="rule-content">
                <div className="rule-title">{"開発速度"}</div>
                <div className="rule-desc">
                  {
                    "チームが最も習熟している技術を選ぶ。新しい技術の習得コストはMVPフェーズでは致命的な遅延になる。"
                  }
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"2"}</div>
              <div className="rule-content">
                <div className="rule-title">{"チームスキル"}</div>
                <div className="rule-desc">
                  {"チーム全員が使えるか、採用市場での人材が豊富かを確認する。"}
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"3"}</div>
              <div className="rule-content">
                <div className="rule-title">{"エコシステムの充実度"}</div>
                <div className="rule-desc">
                  {"ライブラリ・ツールが充実し、コミュニティが活発であること。"}
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"4"}</div>
              <div className="rule-content">
                <div className="rule-title">{"コスト最小化"}</div>
                <div className="rule-desc">
                  {"無料ティアを最大活用。Vercel・Supabase・Railway等はMVPを無料で運用できる。"}
                </div>
              </div>
            </div>
          </div>
          <h3>{"7.2 MVP推奨技術スタック（2025年版）"}</h3>
          <h4>{"フロントエンド"}</h4>
          <div className="stack-row">
            <div className="stack-item recommended">
              <div className="stack-label">{"最推奨"}</div>
              <div className="stack-value">{"Next.js + TypeScript"}</div>
              <div className="stack-note">
                {"SSR/SSG・フルスタック対応。Vercelでゼロ設定デプロイ。"}
              </div>
            </div>
            <div className="stack-item">
              <div className="stack-label">{"選択肢 A"}</div>
              <div className="stack-value">{"React + Vite"}</div>
              <div className="stack-note">{"SPA・高速ビルド。Tailwind CSSと相性良好。"}</div>
            </div>
            <div className="stack-item">
              <div className="stack-label">{"選択肢 B"}</div>
              <div className="stack-value">{"Vue 3 + Nuxt"}</div>
              <div className="stack-note">{"シンプルな構文で習得しやすい。"}</div>
            </div>
          </div>
          <h4>{"バックエンド"}</h4>
          <div className="stack-row">
            <div className="stack-item recommended">
              <div className="stack-label">{"フルスタック推奨"}</div>
              <div className="stack-value">{"Next.js API Routes"}</div>
              <div className="stack-note">{"フロントと同一コードベースで管理できる。"}</div>
            </div>
            <div className="stack-item">
              <div className="stack-label">{"AI/ML連携向け"}</div>
              <div className="stack-value">{"FastAPI（Python）"}</div>
              <div className="stack-note">{"型安全・自動Swagger生成。AI/MLとの相性が良い。"}</div>
            </div>
            <div className="stack-item">
              <div className="stack-label">{"大規模チーム向け"}</div>
              <div className="stack-value">{"NestJS（TypeScript）"}</div>
              <div className="stack-note">{"構造化されたNode.js。大きなチームに向く。"}</div>
            </div>
          </div>
          <h4>{"データベース"}</h4>
          <div className="stack-row">
            <div className="stack-item recommended">
              <div className="stack-label">{"最推奨"}</div>
              <div className="stack-value">{"PostgreSQL"}</div>
              <div className="stack-note">{"信頼性・機能性・無料。99%のMVPにこれで十分。"}</div>
            </div>
            <div className="stack-item">
              <div className="stack-label">{"サーバーレス向け"}</div>
              <div className="stack-value">{"PlanetScale / Neon"}</div>
              <div className="stack-note">{"サーバーレスDB。無料ティアあり。スケールが容易。"}</div>
            </div>
            <div className="stack-item">
              <div className="stack-label">{"スキーマ柔軟性重視"}</div>
              <div className="stack-value">{"MongoDB"}</div>
              <div className="stack-note">
                {"ドキュメントDB。スキーマが頻繁に変わる場合に有効。"}
              </div>
            </div>
          </div>
          <h4>{"デプロイ・インフラ"}</h4>
          <div className="stack-row">
            <div className="stack-item recommended">
              <div className="stack-label">{"最推奨"}</div>
              <div className="stack-value">{"Vercel + Railway"}</div>
              <div className="stack-note">
                {"ゼロ設定・無料ティア充実。Push → デプロイが自動。"}
              </div>
            </div>
            <div className="stack-item recommended">
              <div className="stack-label">{"オールインワン"}</div>
              <div className="stack-value">{"Supabase"}</div>
              <div className="stack-note">
                {"DB + Auth + Storage + Realtime が一体化。MVPに最適。"}
              </div>
            </div>
            <div className="stack-item">
              <div className="stack-label">{"エンタープライズ向け"}</div>
              <div className="stack-value">{"AWS"}</div>
              <div className="stack-note">{"学習コストが高いため、MVPフェーズでは非推奨。"}</div>
            </div>
          </div>
          <h3>{"7.3 「作らずに買う」戦略：外部サービス活用"}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"機能"}</th>
                  <th>{"自前実装の問題点"}</th>
                  <th>{"推奨外部サービス"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"認証"}</td>
                  <td>{"数週間かかる・セキュリティリスクが高い"}</td>
                  <td>
                    <Ext href="https://clerk.com/docs">{"Clerk"}</Ext>
                    {" / Auth0 / Supabase Auth"}
                  </td>
                </tr>
                <tr>
                  <td>{"決済"}</td>
                  <td>{"PCI DSS対応が必要・法的リスク"}</td>
                  <td>
                    <Ext href="https://stripe.com/docs">{"Stripe"}</Ext>
                    {" / Paddle"}
                  </td>
                </tr>
                <tr>
                  <td>{"メール配信"}</td>
                  <td>{"配信率・スパム対策が複雑"}</td>
                  <td>{"SendGrid / Resend"}</td>
                </tr>
                <tr>
                  <td>{"監視・エラー追跡"}</td>
                  <td>{"維持コストが高い・専門知識が必要"}</td>
                  <td>{"Sentry + Datadog"}</td>
                </tr>
                <tr>
                  <td>{"ファイルストレージ"}</td>
                  <td>{"インフラ管理・CDN設定が複雑"}</td>
                  <td>{"Cloudflare R2 / AWS S3"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"Next.js 公式ドキュメント — "}
                <Ext href="https://nextjs.org/docs">{"https://nextjs.org/docs"}</Ext>
              </li>
              <li>
                {"Supabase ドキュメント — "}
                <Ext href="https://supabase.com/docs">{"https://supabase.com/docs"}</Ext>
              </li>
              <li>
                {"Vercel ドキュメント — "}
                <Ext href="https://vercel.com/docs">{"https://vercel.com/docs"}</Ext>
              </li>
              <li>
                {"Railway ドキュメント — "}
                <Ext href="https://railway.app/docs">{"https://railway.app/docs"}</Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="step5">
          <div className="step-badge">
            <span className="step-badge-num">{"5"}</span>
            <span className="step-badge-text">{"Step 5"}</span>
          </div>
          <h2>
            <IconCode size={18} className="mvp-icon icon-code" aria-hidden="true" />
            {"8. MVP実装のベストプラクティス"}
          </h2>
          <h3>{"8.1 コーディング原則"}</h3>
          <div className="cards">
            <div className="card">
              <div className="card-icon purple">
                <IconBan size={18} className="mvp-icon icon-ban" aria-hidden="true" />
              </div>
              <div className="card-title">{"YAGNI原則"}</div>
              <div className="card-desc">
                {
                  "You Aren't Gonna Need It。今必要でない機能は実装しない。将来の妄想より現在の問題を解く。"
                }
              </div>
            </div>
            <div className="card">
              <div className="card-icon teal">
                <IconLeaf size={18} className="mvp-icon icon-leaf" aria-hidden="true" />
              </div>
              <div className="card-title">{"KISS原則"}</div>
              <div className="card-desc">
                {
                  "Keep It Simple, Stupid。複雑な設計より単純な解決策。シンプルなコードが保守しやすい。"
                }
              </div>
            </div>
            <div className="card">
              <div className="card-icon coral">
                <IconRocket size={18} className="mvp-icon icon-rocket" aria-hidden="true" />
              </div>
              <div className="card-title">{"完璧より完成"}</div>
              <div className="card-desc">
                {
                  "Done is Better than Perfect。完成度80%でリリース。残り20%はユーザーが教えてくれる。"
                }
              </div>
            </div>
            <div className="card">
              <div className="card-icon pink">
                <IconNotes size={18} className="mvp-icon icon-notes" aria-hidden="true" />
              </div>
              <div className="card-title">{"意図的な技術負債"}</div>
              <div className="card-desc">
                {
                  "意識的な技術的負債はOK。ただし文書化し、期限を設けて管理すること。無意識の負債は避ける。"
                }
              </div>
            </div>
          </div>
          <h3>{"8.2 CI/CDパイプライン（GitHub Actions例）"}</h3>
          <p>{"早期にCI/CDを整備することで、迅速なイテレーションが可能になります。"}</p>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step5-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"CI/CDパイプライン：コードをpushするだけでテスト・デプロイが自動実行される"}
            </div>
          </div>
          <pre
            className="language-yaml"
            dangerouslySetInnerHTML={{
              __html:
                '<span class="cm"># .github/workflows/ci.yml</span>\n<span class="kw">name</span>: CI/CD Pipeline\n\n<span class="kw">on</span>:\n  <span class="kw">push</span>:\n    <span class="kw">branches</span>: [main]\n  <span class="kw">pull_request</span>:\n    <span class="kw">branches</span>: [main]\n\n<span class="kw">jobs</span>:\n  <span class="kw">test</span>:\n    <span class="kw">runs-on</span>: ubuntu-latest\n    <span class="kw">steps</span>:\n      - <span class="kw">uses</span>: actions/checkout@v4\n      - <span class="kw">uses</span>: actions/setup-node@v4\n        <span class="kw">with</span>:\n          <span class="kw">node-version</span>: <span class="nu">\'20\'</span>\n      - <span class="kw">run</span>: npm ci\n      - <span class="kw">run</span>: npm run lint        <span class="cm"># ESLintチェック</span>\n      - <span class="kw">run</span>: npm run type-check  <span class="cm"># TypeScript型チェック</span>\n      - <span class="kw">run</span>: npm test            <span class="cm"># ユニットテスト実行</span>\n      - <span class="kw">run</span>: npm run build       <span class="cm"># ビルド確認</span>\n\n  <span class="kw">deploy-preview</span>:\n    <span class="kw">if</span>: github.event_name == <span class="st">\'pull_request\'</span>\n    <span class="kw">needs</span>: test\n    <span class="kw">runs-on</span>: ubuntu-latest\n    <span class="kw">steps</span>:\n      - <span class="kw">uses</span>: actions/checkout@v4\n      - <span class="kw">name</span>: Deploy to Vercel Preview\n        <span class="kw">run</span>: npx vercel --token=<span class="fn">${{ secrets.VERCEL_TOKEN }}</span>',
            }}
          />
          <h3>{"8.3 セキュリティ最低限チェックリスト"}</h3>
          <ul className="check-list">
            <li>
              <IconCircleCheck
                size={15}
                className="mvp-icon icon-circle-check"
                aria-hidden="true"
              />
              <div>
                <strong style={{ color: "var(--color-text-primary)" }}>{"HTTPS 必須"}</strong>
                {" — HTTPは絶対に使わない。Let's Encrypt / CDNで無料化できる。"}
              </div>
            </li>
            <li>
              <IconCircleCheck
                size={15}
                className="mvp-icon icon-circle-check"
                aria-hidden="true"
              />
              <div>
                <strong style={{ color: "var(--color-text-primary)" }}>
                  {"環境変数で秘密情報を管理"}
                </strong>
                {" — コードにAPIキーを絶対に書かない。"}
                <code>{".env.local"}</code>
                {" / secrets managerを使う。"}
              </div>
            </li>
            <li>
              <IconCircleCheck
                size={15}
                className="mvp-icon icon-circle-check"
                aria-hidden="true"
              />
              <div>
                <strong style={{ color: "var(--color-text-primary)" }}>
                  {"パスワードハッシュ化"}
                </strong>
                {" — bcrypt / argon2を使用する。MD5・SHA1は禁止。"}
              </div>
            </li>
            <li>
              <IconCircleCheck
                size={15}
                className="mvp-icon icon-circle-check"
                aria-hidden="true"
              />
              <div>
                <strong style={{ color: "var(--color-text-primary)" }}>
                  {"SQLインジェクション対策"}
                </strong>
                {" — ORMを使い、生SQLを避ける。パラメータバインドを徹底する。"}
              </div>
            </li>
            <li>
              <IconCircleCheck
                size={15}
                className="mvp-icon icon-circle-check"
                aria-hidden="true"
              />
              <div>
                <strong style={{ color: "var(--color-text-primary)" }}>{"CORS設定"}</strong>
                {" — 許可するオリジンを明示。ワイルドカード（*）は避ける。"}
              </div>
            </li>
            <li>
              <IconCircleCheck
                size={15}
                className="mvp-icon icon-circle-check"
                aria-hidden="true"
              />
              <div>
                <strong style={{ color: "var(--color-text-primary)" }}>{"レート制限"}</strong>
                {" — APIエンドポイントに上限を設定。DDoS・ブルートフォース対策。"}
              </div>
            </li>
            <li>
              <IconCircleCheck
                size={15}
                className="mvp-icon icon-circle-check"
                aria-hidden="true"
              />
              <div>
                <strong style={{ color: "var(--color-text-primary)" }}>
                  {"依存関係の脆弱性スキャン"}
                </strong>
                {" — "}
                <code>{"npm audit"}</code>
                {" / pip-audit。GitHub Dependabotを活用。"}
              </div>
            </li>
          </ul>
          <h3>{"8.4 テスト戦略：MVPでのテスト優先度"}</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step5-2"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"テストピラミッド：ユニットテストを最も重視し、E2Eテストは最小限に絞る"}
            </div>
          </div>
          <div className="callout info">
            <div className="callout-label">{"MVPのテスト原則"}</div>
            <p>
              {
                "完全なテストカバレッジは求めない。ビジネスロジックの中核だけをカバーし、リグレッション（意図しないバグの再発生）を防ぐための最小限のテストを書くことが目標です。"
              }
            </p>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"OWASP Top 10（Webセキュリティ）— "}
                <Ext href="https://owasp.org/Top10/">{"https://owasp.org/Top10/"}</Ext>
              </li>
              <li>
                {"Stripe 決済SDK公式 — "}
                <Ext href="https://stripe.com/docs">{"https://stripe.com/docs"}</Ext>
              </li>
              <li>
                {"Clerk 認証サービス — "}
                <Ext href="https://clerk.com/docs">{"https://clerk.com/docs"}</Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="step6">
          <div className="step-badge">
            <span className="step-badge-num">{"6"}</span>
            <span className="step-badge-text">{"Step 6"}</span>
          </div>
          <h2>
            <IconChartBar size={18} className="mvp-icon icon-chart-bar" aria-hidden="true" />
            {"9. 測定・学習（Measure & Learn）"}
          </h2>
          <h3>{"9.1 アナリティクス設計の4ステップ"}</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step6-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"アナリティクス設計：「何を測るか」を先に決めることが最重要"}
            </div>
          </div>
          <h3>{"9.2 定量指標 vs 定性フィードバック"}</h3>
          <div className="two-col">
            <div className="panel">
              <div className="panel-title" style={{ color: "var(--c-teal-200)" }}>
                <IconChartLine size={16} className="mvp-icon icon-chart-line" aria-hidden="true" />
                {"定量指標（What）"}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--color-text-tertiary)",
                  marginBottom: "12px",
                }}
              >
                {"何が起きているかを教えてくれる"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"コンバージョン率"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"リテンション率"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"機能使用率"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"エラー発生率"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"平均セッション時間"}
                </li>
              </ul>
            </div>
            <div className="panel">
              <div className="panel-title" style={{ color: "var(--c-purple-200)" }}>
                <IconMessageCircle
                  size={16}
                  className="mvp-icon icon-message-circle"
                  aria-hidden="true"
                />
                {"定性フィードバック（Why）"}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--color-text-tertiary)",
                  marginBottom: "12px",
                }}
              >
                {"なぜそれが起きているかを教えてくれる"}
              </div>
              <ul className="check-list">
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"ユーザーインタビュー"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"サポートチケット分析"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"NPS自由記述欄"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"セッションリプレイ（Hotjar / FullStory）"}
                </li>
                <li>
                  <IconCircleCheck
                    size={15}
                    className="mvp-icon icon-circle-check"
                    aria-hidden="true"
                  />
                  {"ユーザビリティテスト"}
                </li>
              </ul>
            </div>
          </div>
          <h3>{"9.3 North Star Metric（北極星指標）"}</h3>
          <p>
            {"プロダクトの長期的な成功を最もよく表す、"}
            <span className="hl-coral">{"たった1つの指標"}</span>
            {"を設定します。チーム全員がこの指標に向かって動くことで、優先順位の議論を減らせます。"}
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"プロダクト"}</th>
                  <th>{"North Star Metric"}</th>
                  <th>{"その理由"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Slack"}</td>
                  <td>{"DAU（日次アクティブユーザー）"}</td>
                  <td>{"毎日使われることがプロダクト価値の本質"}</td>
                </tr>
                <tr>
                  <td>{"Airbnb"}</td>
                  <td>{"予約された宿泊日数"}</td>
                  <td>{"ホスト・ゲスト双方への価値を1指標で表現"}</td>
                </tr>
                <tr>
                  <td>{"Spotify"}</td>
                  <td>{"1日あたりの楽曲再生時間"}</td>
                  <td>{"継続的なエンゲージメントを測る"}</td>
                </tr>
                <tr>
                  <td>{"あなたのMVP"}</td>
                  <td>{"コア価値が生まれた回数"}</td>
                  <td>{"プロダクトがユーザーにとって本質的な価値を届けた瞬間を数える"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>{"9.4 推奨アナリティクスツール"}</h3>
          <div className="cards">
            <div className="card">
              <div className="card-icon teal">
                <IconChartDots size={18} className="mvp-icon icon-chart-dots" aria-hidden="true" />
              </div>
              <div className="card-title">{"PostHog"}</div>
              <div className="card-desc">
                {
                  "オープンソース・プロダクト分析。セルフホスト可能。プライバシー重視のチームに最適。"
                }
              </div>
            </div>
            <div className="card">
              <div className="card-icon purple">
                <IconTrendingUp
                  size={18}
                  className="mvp-icon icon-trending-up"
                  aria-hidden="true"
                />
              </div>
              <div className="card-title">{"Mixpanel"}</div>
              <div className="card-desc">
                {"イベント分析に特化。無料ティアが充実。ファネル分析とコホート分析が強力。"}
              </div>
            </div>
            <div className="card">
              <div className="card-icon coral">
                <IconWaveSawTool
                  size={18}
                  className="mvp-icon icon-wave-saw-tool"
                  aria-hidden="true"
                />
              </div>
              <div className="card-title">{"Amplitude"}</div>
              <div className="card-desc">
                {"行動分析・コホート分析。スタートアップ向け無料プランあり。"}
              </div>
            </div>
            <div className="card">
              <div className="card-icon pink">
                <IconBrandGoogle
                  size={18}
                  className="mvp-icon icon-brand-google"
                  aria-hidden="true"
                />
              </div>
              <div className="card-title">{"Google Analytics 4"}</div>
              <div className="card-desc">
                {"基本的なWebアナリティクス。完全無料。最初の入り口として最適。"}
              </div>
            </div>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"PostHog（オープンソースプロダクト分析）— "}
                <Ext href="https://posthog.com/">{"https://posthog.com/"}</Ext>
              </li>
              <li>
                {"Mixpanel リソース — "}
                <Ext href="https://mixpanel.com/resources/">
                  {"https://mixpanel.com/resources/"}
                </Ext>
              </li>
              <li>
                {"Amplitude North Star Playbook — "}
                <Ext href="https://amplitude.com/books/north-star">
                  {"https://amplitude.com/books/north-star"}
                </Ext>
              </li>
              <li>
                {"Sean Ellis PMF Survey — "}
                <Ext href="https://pmfsurvey.com/">{"https://pmfsurvey.com/"}</Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="step7">
          <div className="step-badge">
            <span className="step-badge-num">{"7"}</span>
            <span className="step-badge-text">{"Step 7"}</span>
          </div>
          <h2>
            <IconArrowsShuffle
              size={18}
              className="mvp-icon icon-arrows-shuffle"
              aria-hidden="true"
            />
            {"10. ピボットか継続かの判断"}
          </h2>
          <h3>{"10.1 判断フレームワーク"}</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["step7-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"ピボット判断フレームワーク：3つの問いに答えて「継続・ピボット・停止」を決める"}
            </div>
          </div>
          <h3>{"10.2 ピボットの主要な種類"}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"種類"}</th>
                  <th>{"説明"}</th>
                  <th>{"有名な事例"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"ズームイン・ピボット"}</td>
                  <td>{"1機能が製品全体になる"}</td>
                  <td>{"Twitterは元々Odeoというポッドキャスト会社の一機能だった"}</td>
                </tr>
                <tr>
                  <td>{"ズームアウト・ピボット"}</td>
                  <td>{"1製品が1機能になる"}</td>
                  <td>{"他の大きな製品の一部として組み込まれる"}</td>
                </tr>
                <tr>
                  <td>{"顧客セグメント・ピボット"}</td>
                  <td>{"同じ問題を抱える別の顧客層へ"}</td>
                  <td>{"解決策はそのままに対象ユーザーを変える"}</td>
                </tr>
                <tr>
                  <td>{"顧客ニーズ・ピボット"}</td>
                  <td>{"同じ顧客の別の問題を解く"}</td>
                  <td>{"深く知った顧客から別のニーズを発見する"}</td>
                </tr>
                <tr>
                  <td>{"プラットフォーム・ピボット"}</td>
                  <td>{"アプリ↔プラットフォームの転換"}</td>
                  <td>{"サービスをAPIとして提供する形に変える"}</td>
                </tr>
                <tr>
                  <td>{"ビジネスモデル・ピボット"}</td>
                  <td>{"収益化の方法を変える"}</td>
                  <td>{"無料→有料 / B2C→B2B への転換"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout">
            <div className="callout-label">{"ピボットの心得"}</div>
            <p>
              {
                "ピボットは「失敗」ではありません。間違いに気づいたら素早く方向転換することが、MVPの目的そのものです。多くの成功したスタートアップ（Slack, Instagram, YouTube）はピボットによって生まれました。"
              }
            </p>
          </div>
        </section>
        <section className="section" id="failures">
          <h2>
            <IconAlertTriangle
              size={18}
              className="mvp-icon icon-alert-triangle"
              aria-hidden="true"
            />
            {"11. よくある失敗パターンと対策"}
          </h2>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["failures-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"失敗パターン6種と対策：左の失敗を右の対策で防ぐ"}
            </div>
          </div>
          <h3>{"11.2 「スモークテスト」でMVP前に需要を確認する"}</h3>
          <p>{"実際にコードを書く前に、需要があるかを確認する手法です。"}</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"手法"}</th>
                  <th>{"内容"}</th>
                  <th>{"有名な事例"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{"ランディングページ"}</strong>
                  </td>
                  <td>{"機能説明ページ＋メール登録。登録率で需要を測定。"}</td>
                  <td>{"事前登録100件で開発開始"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"動画デモ"}</strong>
                  </td>
                  <td>{"プロダクトなしで動画だけで需要確認。"}</td>
                  <td>{"Dropboxは動画だけで75,000人がサインアップ"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Concierge MVP"}</strong>
                  </td>
                  <td>{"ツールなしで手動でサービスを提供する。"}</td>
                  <td>{"Airbnbは最初手動で写真撮影"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Wizard of Oz MVP"}</strong>
                  </td>
                  <td>{"自動に見えるが裏側は人間が手動で処理する。"}</td>
                  <td>{"技術的検証より価値検証に集中できる"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"フェイクドア"}</strong>
                  </td>
                  <td>{"存在しない機能のボタンを置き、クリック率で関心度を測定。"}</td>
                  <td>{"倫理的に使用すること（後でフォローアップする）"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"Paul Graham — Do Things That Don't Scale: "}
                <Ext href="https://paulgraham.com/ds.html">{"https://paulgraham.com/ds.html"}</Ext>
              </li>
              <li>
                {"Dropbox MVP動画: "}
                <Ext href="https://www.youtube.com/watch?v=7QmCUDHpNzE">
                  {"https://www.youtube.com/watch?v=7QmCUDHpNzE"}
                </Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="scale">
          <h2>
            <IconTrendingUp size={18} className="mvp-icon icon-trending-up" aria-hidden="true" />
            {"12. MVPから本番プロダクトへの移行"}
          </h2>
          <h3>{"12.1 PMF（Product-Market Fit）の確認指標"}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"指標"}</th>
                  <th>{"PMF達成の目安"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{"Sean Ellisテスト"}</strong>
                  </td>
                  <td>
                    {"「このプロダクトが使えなくなったら？」→「非常に残念」が"}
                    <strong style={{ color: "var(--c-teal-200)" }}>{"40%以上"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Net Promoter Score（NPS）"}</strong>
                  </td>
                  <td>
                    <strong style={{ color: "var(--c-teal-200)" }}>{"NPS 50以上"}</strong>
                    {"が目安。顧客が積極的に勧めている状態。"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{"有機的な成長"}</strong>
                  </td>
                  <td>{"広告なしで口コミだけでユーザーが増えている。"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"月次チャーン率"}</strong>
                  </td>
                  <td>
                    <strong style={{ color: "var(--c-teal-200)" }}>{"月次1〜3%以下"}</strong>
                    {"。ユーザーが離れていかない状態。"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{"顧客からの要求"}</strong>
                  </td>
                  <td>{"「もっと使いたい」「早く次の機能を」という声が来る。"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>{"12.2 アーキテクチャの段階的移行"}</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["scale-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"アーキテクチャの段階的移行：PMF達成後に必要に応じてスケールさせる"}
            </div>
          </div>
          <div className="sources">
            <div className="sources-title">
              <IconLink size={16} className="mvp-icon icon-link" aria-hidden="true" />
              {"ソース・参考URL"}
            </div>
            <ul>
              <li>
                {"a16z — Product-Market Fit: "}
                <Ext href="https://a16z.com/12-things-about-product-market-fit/">
                  {"https://a16z.com/12-things-about-product-market-fit/"}
                </Ext>
              </li>
              <li>
                {"Martin Fowler — Strangler Fig Application: "}
                <Ext href="https://martinfowler.com/bliki/StranglerFigApplication.html">
                  {"https://martinfowler.com/bliki/StranglerFigApplication.html"}
                </Ext>
              </li>
            </ul>
          </div>
        </section>
        <section className="section" id="rules">
          <h2>
            <IconAward size={18} className="mvp-icon icon-award" aria-hidden="true" />
            {"13. MVP開発の黄金律 10箇条"}
          </h2>
          <div className="rule-list">
            <div className="rule-item">
              <div className="rule-num">{"1"}</div>
              <div className="rule-content">
                <div className="rule-title">{"コードを書く前に検証する"}</div>
                <div className="rule-desc">
                  {
                    "仮説を立てて→インタビューで確認。問題を確認してからソリューションを作る。コードより対話を先に。"
                  }
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"2"}</div>
              <div className="rule-content">
                <div className="rule-title">{"機能は3回絞り込む"}</div>
                <div className="rule-desc">
                  {
                    "リストを作る→半分にする→さらに半分。本当に必要なものだけが残る。削ることで開発速度が上がる。"
                  }
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"3"}</div>
              <div className="rule-content">
                <div className="rule-title">{"完璧より速さを優先する"}</div>
                <div className="rule-desc">
                  {
                    "完成度80%でリリース。残り20%はユーザーが教えてくれる。完璧を目指すとリリースできない。"
                  }
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"4"}</div>
              <div className="rule-content">
                <div className="rule-title">{"実ユーザーに早く届ける"}</div>
                <div className="rule-desc">
                  {"内部デモは学習にならない。本物のユーザーの反応だけが真実を語る。"}
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"5"}</div>
              <div className="rule-content">
                <div className="rule-title">{"測定できるものだけを作る"}</div>
                <div className="rule-desc">
                  {"何を測るかを先に決める。測れない機能は後回し。データのない改善は勘に過ぎない。"}
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"6"}</div>
              <div className="rule-content">
                <div className="rule-title">{"外部サービスを最大活用する"}</div>
                <div className="rule-desc">
                  {"認証・決済・メールは自分で作らない。差別化ポイントになるコア部分だけを作る。"}
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"7"}</div>
              <div className="rule-content">
                <div className="rule-title">{"モノリスから始める"}</div>
                <div className="rule-desc">
                  {
                    "必要になってから分割する。過剰設計はMVPの最大の敵。シンプルな構成が学習を速める。"
                  }
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"8"}</div>
              <div className="rule-content">
                <div className="rule-title">{"毎週ユーザーと話す"}</div>
                <div className="rule-desc">
                  {
                    "定性フィードバックは定量と同じく重要。顧客の言葉がプロダクトを正しい方向に導く。"
                  }
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"9"}</div>
              <div className="rule-content">
                <div className="rule-title">{"ピボットを恐れない"}</div>
                <div className="rule-desc">
                  {
                    "間違いに気づいたら素早く方向転換。失敗から学ぶのがMVPの目的。ピボットは敗北ではなく進化。"
                  }
                </div>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-num">{"10"}</div>
              <div className="rule-content">
                <div className="rule-title">{"学習を記録する"}</div>
                <div className="rule-desc">
                  {
                    "何を仮説として・何を学んだかをドキュメントに残す。チームの集合知として蓄積する。"
                  }
                </div>
              </div>
            </div>
          </div>
          <h3>{"MVP健全性チェックリスト"}</h3>
          <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS["rules-1"]} preserveNaturalScale={true} />
            <div className="mermaid-caption">
              {"MVP健全性チェック：6つのYes/Noで自分のMVP開発の状態を診断する"}
            </div>
          </div>
        </section>
        <section className="section" id="refs">
          <h2>
            <IconBooks size={18} className="mvp-icon icon-books" aria-hidden="true" />
            {"14. 参考文献・ソース一覧"}
          </h2>
          <h3>{"必読書籍"}</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"タイトル"}</th>
                  <th>{"著者"}</th>
                  <th>{"内容"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{"The Lean Startup"}</strong>
                  </td>
                  <td>{"Eric Ries"}</td>
                  <td>{"MVP・Build-Measure-Learnの原典"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Running Lean"}</strong>
                  </td>
                  <td>{"Ash Maurya"}</td>
                  <td>{"リーンキャンバスとCustomer Developmentの実践書"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"The Mom Test"}</strong>
                  </td>
                  <td>{"Rob Fitzpatrick"}</td>
                  <td>{"顧客インタビューの方法論"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Inspired"}</strong>
                  </td>
                  <td>{"Marty Cagan"}</td>
                  <td>{"プロダクトマネジメントの実践"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Zero to One"}</strong>
                  </td>
                  <td>{"Peter Thiel"}</td>
                  <td>{"スタートアップ戦略と独自性の構築"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Continuous Discovery Habits"}</strong>
                  </td>
                  <td>{"Teresa Torres"}</td>
                  <td>{"継続的な顧客発見の方法論"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>{"公式ドキュメント・参考URL（カテゴリ別）"}</h3>
          <h4>{"MVP・リーンスタートアップの基礎概念"}</h4>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"リソース"}</th>
                  <th>{"URL"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Eric Ries 公式サイト（Lean Startup）"}</td>
                  <td>
                    <Ext href="https://theleanstartup.com/">{"https://theleanstartup.com/"}</Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Lean Startup Wikipedia"}</td>
                  <td>
                    <Ext href="https://en.wikipedia.org/wiki/Lean_startup">
                      {"https://en.wikipedia.org/wiki/Lean_startup"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Lean Canvas（Ash Maurya）"}</td>
                  <td>
                    <Ext href="https://leanstack.com/lean-canvas">
                      {"https://leanstack.com/lean-canvas"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Y Combinator — How to Validate Your Startup Idea"}</td>
                  <td>
                    <Ext href="https://www.youtube.com/watch?v=Do3mS7p6G3A">
                      {"https://www.youtube.com/watch?v=Do3mS7p6G3A"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Paul Graham — Do Things That Don't Scale"}</td>
                  <td>
                    <Ext href="https://paulgraham.com/ds.html">
                      {"https://paulgraham.com/ds.html"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"a16z — Product-Market Fit"}</td>
                  <td>
                    <Ext href="https://a16z.com/12-things-about-product-market-fit/">
                      {"https://a16z.com/12-things-about-product-market-fit/"}
                    </Ext>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>{"顧客開発・インタビュー"}</h4>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"リソース"}</th>
                  <th>{"URL"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"The Mom Test（公式サイト）"}</td>
                  <td>
                    <Ext href="https://www.momtestbook.com/">{"https://www.momtestbook.com/"}</Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Steve Blank — Customer Development"}</td>
                  <td>
                    <Ext href="https://steveblank.com/category/customer-development/">
                      {"https://steveblank.com/category/customer-development/"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Superhuman — How to Find PMF"}</td>
                  <td>
                    <Ext href="https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/">
                      {"First Round Review"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Sean Ellis — PMF Survey"}</td>
                  <td>
                    <Ext href="https://pmfsurvey.com/">{"https://pmfsurvey.com/"}</Ext>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>{"技術的アーキテクチャ"}</h4>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"リソース"}</th>
                  <th>{"URL"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Martin Fowler — Monolith First"}</td>
                  <td>
                    <Ext href="https://martinfowler.com/bliki/MonolithFirst.html">
                      {"https://martinfowler.com/bliki/MonolithFirst.html"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Martin Fowler — Strangler Fig Application"}</td>
                  <td>
                    <Ext href="https://martinfowler.com/bliki/StranglerFigApplication.html">
                      {"https://martinfowler.com/bliki/StranglerFigApplication.html"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Twelve-Factor App（SaaS設計原則）"}</td>
                  <td>
                    <Ext href="https://12factor.net/ja/">{"https://12factor.net/ja/"}</Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Martin Fowler — Sacrificial Architecture"}</td>
                  <td>
                    <Ext href="https://martinfowler.com/bliki/SacrificialArchitecture.html">
                      {"https://martinfowler.com/bliki/SacrificialArchitecture.html"}
                    </Ext>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>{"プロダクト指標・アナリティクス"}</h4>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"リソース"}</th>
                  <th>{"URL"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Amplitude — North Star Playbook"}</td>
                  <td>
                    <Ext href="https://amplitude.com/books/north-star">
                      {"https://amplitude.com/books/north-star"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"PostHog（オープンソースプロダクト分析）"}</td>
                  <td>
                    <Ext href="https://posthog.com/">{"https://posthog.com/"}</Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Mixpanel — Product Analytics Guide"}</td>
                  <td>
                    <Ext href="https://mixpanel.com/resources/">
                      {"https://mixpanel.com/resources/"}
                    </Ext>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>{"セキュリティ"}</h4>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"リソース"}</th>
                  <th>{"URL"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"OWASP Top 10（Webセキュリティ）"}</td>
                  <td>
                    <Ext href="https://owasp.org/Top10/">{"https://owasp.org/Top10/"}</Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Clerk（認証サービス）"}</td>
                  <td>
                    <Ext href="https://clerk.com/docs">{"https://clerk.com/docs"}</Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Stripe（決済SDK公式）"}</td>
                  <td>
                    <Ext href="https://stripe.com/docs">{"https://stripe.com/docs"}</Ext>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>{"著名なMVP成功事例"}</h4>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{"事例"}</th>
                  <th>{"URL"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Dropbox MVP（動画デモで需要検証）"}</td>
                  <td>
                    <Ext href="https://www.youtube.com/watch?v=7QmCUDHpNzE">
                      {"https://www.youtube.com/watch?v=7QmCUDHpNzE"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Airbnb の初期戦略（Paul Graham）"}</td>
                  <td>
                    <Ext href="https://paulgraham.com/growth.html">
                      {"https://paulgraham.com/growth.html"}
                    </Ext>
                  </td>
                </tr>
                <tr>
                  <td>{"Twitter の誕生（ピボット事例）"}</td>
                  <td>
                    <Ext href="https://en.wikipedia.org/wiki/History_of_Twitter">
                      {"Wikipedia: History of Twitter"}
                    </Ext>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout info" style={{ marginTop: "40px" }}>
            <div className="callout-label">{"注記"}</div>
            <p>
              {
                "本ドキュメントは2025年時点の情報を基に作成しています。技術情報は変更される場合があるため、実装前に必ず公式ドキュメントをご確認ください。"
              }
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
