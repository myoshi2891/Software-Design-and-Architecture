import { Ext } from "@/components/Ext";
import MicroservicesArchitectureSidebar, { type NavGroup } from "./MicroservicesArchitectureSidebar";

const NAV_GROUPS: NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "s1", num: "01", label: "マイクロサービスとは" },
      { id: "s2", num: "02", label: "モノリス vs MS" },
    ],
  },
  {
    title: "設計",
    items: [
      { id: "s3", num: "03", label: "設計原則" },
      { id: "s4", num: "04", label: "サービス分割の戦略" },
      { id: "s5", num: "05", label: "通信パターン" },
      { id: "s6", num: "06", label: "APIゲートウェイ" },
      { id: "s7", num: "07", label: "サービスディスカバリ" },
    ],
  },
  {
    title: "データ・信頼性",
    items: [
      { id: "s8", num: "08", label: "データ管理戦略" },
      { id: "s9", num: "09", label: "障害耐性と回復力" },
      { id: "s10", num: "10", label: "セキュリティ設計" },
    ],
  },
  {
    title: "インフラ・運用",
    items: [
      { id: "s11", num: "11", label: "CI/CDパイプライン" },
      { id: "s12", num: "12", label: "Kubernetes" },
      { id: "s13", num: "13", label: "オブザーバビリティ" },
    ],
  },
  {
    title: "実践・応用",
    items: [
      { id: "s14", num: "14", label: "実践：ECサイト事例" },
      { id: "s15", num: "15", label: "移行戦略" },
      { id: "s16", num: "16", label: "ベストプラクティス" },
      { id: "s17", num: "17", label: "アンチパターン" },
      { id: "s18", num: "18", label: "参考文献" },
    ],
  },
];

export default function Page() {
  return (
    <div className="microservices-architecture-comprehensive-guide">
      <MicroservicesArchitectureSidebar groups={NAV_GROUPS} />
      <main className="main">
        <div className="hero">
          <h1>マイクロサービスアーキテクチャ完全ガイド</h1>
        </div>

        <section id="s1">
          <h2>マイクロサービスとは何か？</h2>
        </section>
        <section id="s2">
          <h2>モノリス vs マイクロサービス</h2>
        </section>
        <section id="s3">
          <h2>マイクロサービスの設計原則</h2>
        </section>
        <section id="s4">
          <h2>サービス分割の戦略</h2>
        </section>
        <section id="s5">
          <h2>サービス間通信パターン</h2>
        </section>
        <section id="s6">
          <h2>APIゲートウェイパターン</h2>
        </section>
        <section id="s7">
          <h2>サービスディスカバリと負荷分散</h2>
        </section>
        <section id="s8">
          <h2>データ管理戦略</h2>
        </section>
        <section id="s9">
          <h2>障害耐性と回復力の設計</h2>
        </section>
        <section id="s10">
          <h2>セキュリティ設計</h2>
        </section>
        <section id="s11">
          <h2>CI/CDパイプラインと独立デプロイ</h2>
        </section>
        <section id="s12">
          <h2>コンテナ化とKubernetes</h2>
        </section>
        <section id="s13">
          <h2>監視・オブザーバビリティ</h2>
        </section>
        <section id="s14">
          <h2>実践：ECサイト完全事例</h2>
        </section>
        <section id="s15">
          <h2>段階的移行戦略（モノリスからの移行）</h2>
        </section>
        <section id="s16">
          <h2>ベストプラクティス総まとめ</h2>
        </section>
        <section id="s17">
          <h2>アンチパターン</h2>
        </section>
        <section id="s18">
          <h2>参考文献・ソース一覧</h2>
        </section>

        {/* テスト用のダミー要素 */}
        <div style={{ display: "none" }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} className="mermaid" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <table key={i} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <pre key={i} />
          ))}
          {Array.from({ length: 26 }).map((_, i) => (
            <Ext key={i} href="https://example.com">
              Link
            </Ext>
          ))}
        </div>
      </main>
    </div>
  );
}
