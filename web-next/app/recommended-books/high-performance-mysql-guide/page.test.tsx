// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("high-performance-mysql-guide page contract", () => {
  it("h1 見出しが書籍ガイドのタイトルである", () => {
    const { container } = render(<Page />);
    // サイドバーの h1 を除外し、本文ヒーローのタイトル見出しのみを検証する
    const h1s = Array.from(container.querySelectorAll("main .hero h1")).map((h) =>
      h.textContent?.trim()
    );
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toContain("High Performance MySQL");
  });

  it("h2 セクション見出しとパートディバイダー見出しが合計 34 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(34);
  });

  it("ナビゲーション対象となる 27 個のセクションが原本と同じ id・順序を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section[id]");
    const ids = Array.from(sections).map((s) => s.id);
    expect(ids).toEqual([
      "about",
      "book-info",
      "audience",
      "structure",
      "roadmap",
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
      "appendix-a",
      "appendix-b",
      "updates2026",
      "critical",
      "checklist",
      "glossary",
      "summary",
      "references",
    ]);
  });

  it("サイドバーのリンクがセクション id と同順のフラグメントリンク 27 個である", () => {
    const { container } = render(<Page />);
    const expectedIds = [
      "about",
      "book-info",
      "audience",
      "structure",
      "roadmap",
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
      "appendix-a",
      "appendix-b",
      "updates2026",
      "critical",
      "checklist",
      "glossary",
      "summary",
      "references",
    ];
    const hrefs = Array.from(container.querySelectorAll("#sidebar a.nav-link")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(expectedIds.map((id) => `#${id}`));
  });

  it("外部リンクすべてに target=_blank と rel=noopener noreferrer が付く", () => {
    const { container } = render(<Page />);
    const external = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http")
    );
    expect(external.length).toBe(19);
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

  it("Mermaid 図 13 個・table 16 個・コードブロック 1 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(13);
    expect(container.querySelectorAll("table")).toHaveLength(16);
    expect(container.querySelectorAll("pre")).toHaveLength(1);
  });

  it("すべての Mermaid 図にライトテーマ用の初期化設定（%%{init:...}%%）が付与されている", () => {
    const { container } = render(<Page />);
    const diagrams = container.querySelectorAll(".mermaid");
    expect(diagrams).toHaveLength(13);
    for (const diagram of diagrams) {
      const chart = diagram.getAttribute("data-chart") ?? "";
      expect(chart).toMatch(/^%%\{init:\s*\{.*"theme":\s*"base"/s);
      expect(chart).toContain('"edgeLabelBackground": "#faf4e6"');
    }
  });
});
