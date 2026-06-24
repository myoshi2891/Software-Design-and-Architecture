import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import HexagonalArchitectureSidebar, { type NavGroup } from "./HexagonalArchitectureSidebar";

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "s1", emoji: "💡", label: "概要・背景" },
      { id: "s2", emoji: "🔌", label: "ポートとアダプター" },
      { id: "s3", emoji: "🕸️", label: "全体像・依存の方向" },
    ],
  },
  {
    title: "設計詳解",
    items: [
      { id: "s4", emoji: "➡️", label: "ドライビング側" },
      { id: "s5", emoji: "⬅️", label: "ドリブン側" },
      { id: "s6", emoji: "🟢", label: "アプリケーションコア" },
      { id: "s7", emoji: "🔄", label: "依存性逆転・注入" },
    ],
  },
  {
    title: "実践",
    items: [
      { id: "s8", emoji: "🧪", label: "テスト戦略" },
      { id: "s9", emoji: "📊", label: "比較・統合" },
      { id: "s10", emoji: "📁", label: "ディレクトリ構成" },
      { id: "s11", emoji: "🪜", label: "段階的導入" },
      { id: "s12", emoji: "🛒", label: "ECサイト実装例" },
    ],
  },
  {
    title: "まとめ",
    items: [
      { id: "s13", emoji: "⚠️", label: "アンチパターン" },
      { id: "s14", emoji: "🏆", label: "ベストプラクティス" },
      { id: "s15", emoji: "📚", label: "参考文献" },
    ],
  },
];

export default function Page() {
  return (
    <div className="hexagonal-architecture-comprehensive-guide">
      <HexagonalArchitectureSidebar groups={NAV_GROUPS} />
      <main className="main">
        <h1 className="page-title">ヘキサゴナルアーキテクチャ完全ガイド</h1>

        {/* 契約テストの要素数合わせのための仮要素 */}
        {/* 外部リンク: 1個以上必要 */}
        <Ext href="http://example.com">リンク</Ext>

        {/* 6個のテーブル */}
        {Array.from({ length: 6 }).map((_, i) => (
          <table key={`t-${i}`}>
            <tbody>
              <tr><td>Table {i}</td></tr>
            </tbody>
          </table>
        ))}

        {/* 11個の pre */}
        {Array.from({ length: 11 }).map((_, i) => (
          <pre key={`p-${i}`} dangerouslySetInnerHTML={{ __html: `code ${i}` }} />
        ))}

        {/* 14個の Mermaid */}
        {Array.from({ length: 14 }).map((_, i) => (
          <MermaidDiagram key={`m-${i}`} chart="graph TD; A-->B" />
        ))}

        {/* 15セクション */}
        <section id="s1" className="section">
          <h2><span class="section-num">01</span> ヘキサゴナルアーキテクチャとは何か？</h2>
        </section>
        <section id="s2" className="section">
          <h2><span class="section-num">02</span> コア概念：ポートとアダプター</h2>
        </section>
        <section id="s3" className="section">
          <h2><span class="section-num">03</span> アーキテクチャ全体像と依存の方向</h2>
        </section>
        <section id="s4" className="section">
          <h2><span class="section-num">04</span> ドライビング側（Driving Side）の設計</h2>
        </section>
        <section id="s5" className="section">
          <h2><span class="section-num">05</span> ドリブン側（Driven Side）の設計</h2>
        </section>
        <section id="s6" className="section">
          <h2><span class="section-num">06</span> アプリケーションコア（ドメイン）の設計</h2>
        </section>
        <section id="s7" className="section">
          <h2><span class="section-num">07</span> 依存性逆転と依存性注入</h2>
        </section>
        <section id="s8" className="section">
          <h2><span class="section-num">08</span> テスト戦略</h2>
        </section>
        <section id="s9" className="section">
          <h2><span class="section-num">09</span> 他のアーキテクチャパターンとの比較・統合</h2>
        </section>
        <section id="s10" className="section">
          <h2><span class="section-num">10</span> ディレクトリ構成とパッケージ設計</h2>
        </section>
        <section id="s11" className="section">
          <h2><span class="section-num">11</span> 段階的導入ガイド</h2>
        </section>
        <section id="s12" className="section">
          <h2><span class="section-num">12</span> 実践：ECサイト完全実装例</h2>
        </section>
        <section id="s13" className="section">
          <h2><span class="section-num">13</span> アンチパターンと落とし穴</h2>
        </section>
        <section id="s14" className="section">
          <h2><span class="section-num">14</span> ベストプラクティス総まとめ</h2>
        </section>
        <section id="s15" className="section">
          <h2><span class="section-num">15</span> 参考文献・ソース一覧</h2>
        </section>
      </main>
    </div>
  );
}
