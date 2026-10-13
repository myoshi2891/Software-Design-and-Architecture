import type { Metadata } from "next";
import Navigation from "./Navigation";
import { NAV_GROUPS } from "./navigation-data";

export const metadata: Metadata = {
  title: "デザインシステムとCSS設計の基礎 | フロントエンド入門ガイド",
  description:
    "フロントエンド開発における「再利用可能・保守しやすい・一貫した」UIを構築するための原則と実践パターンをステップバイステップで解説します。",
};

export default function Page() {
  return (
    <div className="design-system-css-fundamentals">
      <Navigation groups={NAV_GROUPS} />
      <main id="main">
        <div className="hero" id="top">
          <div className="hero-badge">{"🎓 入門ガイド"}</div>
          <h1>
            {"デザインシステムと"}
            <br />
            <span>{"CSS設計"}</span>
            {"の基礎"}
          </h1>
          <p>
            {
              "フロントエンド開発における「再利用可能・保守しやすい・一貫した」UIを構築するための原則と実践パターンをステップバイステップで解説します。"
            }
          </p>
          <div className="hero-meta">
            <span>{"対象：フロントエンド初学者"}</span>
            <span>{"難易度：🟢 入門〜中級"}</span>
            <span>{"最終更新：2025年"}</span>
            <span>{"推定読了：45〜60分"}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
