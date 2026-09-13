import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart, preserveNaturalScale }: { chart: string; preserveNaturalScale?: boolean }) => (
    <div
      className="mermaid"
      data-chart={chart}
      data-preserve-natural-scale={preserveNaturalScale ? "true" : "false"}
    />
  ),
}));

import Page from "./page";

describe("building-llm-powered-applications-guide page contract", () => {
  it("h1 見出しが書籍ガイドのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("LLMパワードアプリケーション構築ガイド");
    expect(h1?.textContent).toContain("初学者のためのステップバイステップ実践入門");
  });

  it("h2 セクション見出しが 18 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(18);
  });

  it("ナビゲーション対象となる 18 個のセクションが原本と同じ id を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section[id]");
    const ids = Array.from(sections).map((s) => s.id);
    expect(ids).toEqual([
      "intro",
      "quickstart",
      "step0",
      "step1",
      "step2",
      "step3",
      "step4",
      "step5",
      "step6",
      "step7",
      "step8",
      "step9",
      "step10",
      "step11",
      "step12",
      "step13",
      "summary",
      "references",
    ]);
  });

  it("外部リンクすべてに target=_blank と rel=noopener noreferrer が付く", () => {
    const { container } = render(<Page />);
    const external = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http")
    );
    expect(external.length).toBe(39);
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

  it("Mermaid 図 15 個・table 7 個・コードブロック 2 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(15);
    expect(container.querySelectorAll("table")).toHaveLength(7);
    expect(container.querySelectorAll("pre")).toHaveLength(2);
  });

  it("globals.css に .building-llm-powered-applications-guide のスコープ定義が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain(".building-llm-powered-applications-guide");
    expect(cssContent).toContain('.category[data-category="recommended-books"]');
    expect(cssContent).toMatch(/--font-display:\s*var\(--font-shippori-mincho\)/);
  });

  it("globals.css に Mermaid 図解の中央寄せと 1rem 文字基準のスタイルが定義されている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain(".diagram-wrap .mermaid");
    expect(cssContent).toContain("justify-content: safe center");
    expect(cssContent).toContain("font-size: 1rem !important");
    expect(cssContent).toContain(".edgeLabel");
  });

  it("コードブロックの行数が原本 HTML と 100% 一致する（二重改行なし）", () => {
    const { container } = render(<Page />);
    const pres = container.querySelectorAll("pre");
    expect(pres).toHaveLength(2);

    // pre 内の改行数を検証（原本: app/main.py は 109 行、tests/test_main.py は 98 行）
    const mainLines = (pres[0]?.innerHTML ?? "").trim().split("\n");
    const testLines = (pres[1]?.innerHTML ?? "").trim().split("\n");
    expect(mainLines.length).toBe(109);
    expect(testLines.length).toBe(98);
  });

  it("すべての Mermaid 図に原本と同じライト紙面調テーマ設定（エッジラベル背景含む）が付与されている", () => {
    const { container } = render(<Page />);
    const diagrams = container.querySelectorAll(".mermaid");
    expect(diagrams).toHaveLength(15);
    for (const d of diagrams) {
      const chart = d.getAttribute("data-chart") ?? "";
      expect(chart).toContain("%%{init:");
      expect(chart).toContain('"theme": "base"');
      expect(chart).toContain('"primaryColor": "#ece9fa"');
      expect(chart).toContain('"edgeLabelBackground": "#f7ecd2"');
    }
  });

  it("すべての Mermaid 図が 1rem 基準の自然幅（preserveNaturalScale）で指定されている", () => {
    const { container } = render(<Page />);
    const diagrams = container.querySelectorAll(".mermaid");
    expect(diagrams).toHaveLength(15);
    for (const d of diagrams) {
      expect(d.getAttribute("data-preserve-natural-scale")).toBe("true");
    }
  });
});
