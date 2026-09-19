import { IconArrowDown, IconArrowUpRight, IconStack2 } from "@tabler/icons-react";
import type { Metadata } from "next";
import { guideCatalog } from "@/lib/guide-catalog";
import { ArchitectureScene } from "./ArchitectureScene";
import { GuideExplorer } from "./GuideExplorer";
import "./home.css";

export const metadata: Metadata = {
  title: "設計手法とアーキテクチャの資料集",
  description:
    "クリーンアーキテクチャ、マイクロサービス、DDD、TDD、BDD、CSS デザインシステムまで。設計手法と開発手法の日本語ガイド一覧。",
};

export default function HomePage() {
  const entries = guideCatalog.flatMap((category) => category.entries);
  const published = entries.filter((entry) => entry.status === "published").length;

  return (
    <main className="guide-index" id="top">
      <div className="index-shell">
        <header className="index-hero">
          <div className="hero-copy">
            <p className="index-eyebrow">
              <span className="live-dot" /> SOFTWARE DESIGN LIBRARY
            </p>
            <h1>
              設計を知る。
              <br />
              選択に、<span>根拠を。</span>
            </h1>
            <p className="hero-description">
              よいソフトウェアは、よい設計から。
              <br />
              アーキテクチャから開発手法まで、考え方と実践をつなぐ
              <br className="desktop-break" />
              日本語ガイド。次の設計判断のヒントを、ここから。
            </p>
            <div className="hero-actions">
              <a className="index-primary" href="#guide-library">
                ガイドを探索する <IconArrowDown size={17} aria-hidden="true" />
              </a>
              <a className="index-secondary" href="#architecture">
                全体像から学ぶ <IconArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-footnote">
              <IconStack2 size={15} aria-hidden="true" /> 設計手法とアーキテクチャの資料集{" "}
              <span>日本語 / 無料公開</span>
            </div>
          </div>
          <ArchitectureScene />
        </header>
        <div className="index-overview">
          <div className="overview-intro">
            <span className="index-eyebrow">A MAP FOR BETTER DESIGN</span>
            <p>知識をつなぎ、設計の視野を広げる。</p>
            <p className="overview-planned">
              公開中 {published} 本 / 準備中 {entries.length - published} 本
            </p>
          </div>
          <dl className="index-stats">
            <div>
              <dt>収録ガイド</dt>
              <dd>
                {String(entries.length).padStart(2, "0")}
                <span className="stat-unit">本</span>
              </dd>
            </div>
            <div>
              <dt>公開中</dt>
              <dd>
                {String(published).padStart(2, "0")}
                <span className="live-dot" />
              </dd>
            </div>
            <div>
              <dt>カテゴリ</dt>
              <dd>{String(guideCatalog.length).padStart(2, "0")}</dd>
            </div>
          </dl>
        </div>
        <GuideExplorer />
        <footer className="index-footer">
          <div>
            <IconStack2 size={18} aria-hidden="true" />
            <span>設計を学ぶ。よりよく、つくる。</span>
          </div>
          <span>SOFTWARE DESIGN & ARCHITECTURE</span>
          <a href="#top">ページの先頭へ ↑</a>
        </footer>
      </div>
    </main>
  );
}
