import { IconCalendar, IconClock, IconUser } from "@tabler/icons-react";
import type { Metadata } from "next";
import MvpSidebar from "./MvpSidebar";
import { NAV_ITEMS } from "./navigation";

export const metadata: Metadata = {
  title: "MVP（最小実行可能製品）開発 完全ガイド",
  description:
    "初学者から中級エンジニアまでを対象に、MVP開発の思想・プロセス・実装・測定を網羅的に解説します。リーンスタートアップの原則に基づき、無駄なく素早く学ぶためのロードマップを提供します。",
};

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
      </main>
    </div>
  );
}
