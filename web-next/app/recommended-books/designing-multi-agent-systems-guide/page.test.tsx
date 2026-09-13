// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("designing-multi-agent-systems-guide page contract", () => {
  it("h1 見出しが原本と完全一致する", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.replace(/\s+/g, " ").trim()).toBe(
      "マルチエージェントシステムの設計（Designing Multi-Agent Systems）— 初学者向け実践ガイド"
    );
  });

  it("h2 セクション見出しが 16 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(16);
  });

  it("16 個の主要セクションが原本と完全一致する id と順序を持つ", () => {
    const { container } = render(<Page />);
    const h2s = container.querySelectorAll("h2[id]");
    const ids = Array.from(h2s).map((h) => h.id);
    expect(ids).toEqual([
      "本ガイドについて",
      "第0部-前提知識--llmエージェントとは何か",
      "第1部-なぜマルチエージェントなのか--効果とコストそして反論",
      "第2部-基本設計パターン9種",
      "第3部-コンテキストエンジニアリングと状態設計",
      "第4部-エージェント間通信プロトコル",
      "第5部-メモリアーキテクチャ",
      "第6部-ツール利用と権限設計",
      "第7部-評価とオブザーバビリティ",
      "第8部-安全性とセキュリティ設計",
      "第9部-実装フレームワークの選択2026年版",
      "第10部-設計チェックリストとアンチパターン",
      "第11部-2026年9月時点の最新動向",
      "学習ロードマップ",
      "用語集",
      "参考文献",
    ]);
  });

  it("外部リンクすべてに target=_blank と rel=noopener noreferrer が付く", () => {
    const { container } = render(<Page />);
    const external = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http")
    );
    expect(external.length).toBe(26);
    for (const a of external) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("内部リンクに .html を含む旧 URL がない", () => {
    const { container } = render(<Page />);
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("http")) continue;
      expect(href).not.toContain(".html");
    }
  });

  it("Mermaid 図 22 個・table 10 個・コードブロック 1 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(22);
    expect(container.querySelectorAll("table")).toHaveLength(10);
    expect(container.querySelectorAll("pre.code-block")).toHaveLength(1);
  });

  it("globals.css に .designing-multi-agent-systems-guide のスコープ定義が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain(".designing-multi-agent-systems-guide");
    expect(cssContent).toContain("--accent: #2f6fed");
    expect(cssContent).toContain("--accent-soft: #eaf1ff");
  });
});
