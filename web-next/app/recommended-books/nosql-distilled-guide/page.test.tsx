// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("nosql-distilled-guide page contract", () => {
  it("h1 見出しが書籍ガイドのタイトルである", () => {
    const { container } = render(<Page />);
    const h1s = Array.from(container.querySelectorAll("h1")).map((h) => h.textContent?.trim());
    expect(h1s.some((t) => t?.includes("NoSQL Distilled"))).toBe(true);
    expect(h1s.some((t) => t?.includes("ポリグロット・パーシステンスの世界へ"))).toBe(true);
  });

  it("h2 セクション見出しが合計 26 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(26);
  });

  it("ナビゲーション対象となる 26 個のセクションが原本と同じ id・順序を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section[id]");
    const ids = Array.from(sections).map((s) => s.id);
    expect(ids).toEqual([
      "about",
      "book-info",
      "audience",
      "roadmap",
      "structure",
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
      "step14",
      "updates2026",
      "critical",
      "glossary",
      "checklist",
      "summary",
      "references",
    ]);
  });

  it("サイドバーのリンクがセクション id と同順のフラグメントリンク 26 個である", () => {
    const { container } = render(<Page />);
    const expectedIds = [
      "about",
      "book-info",
      "audience",
      "roadmap",
      "structure",
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
      "step14",
      "updates2026",
      "critical",
      "glossary",
      "checklist",
      "summary",
      "references",
    ];
    const hrefs = Array.from(container.querySelectorAll("#sidebar a.nav-a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(expectedIds.map((id) => `#${id}`));
  });

  it("外部リンクすべてに target=_blank と rel=noopener noreferrer が付く", () => {
    const { container } = render(<Page />);
    const external = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http")
    );
    expect(external.length).toBe(24);
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

  it("Mermaid 図 16 個・table 9 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(16);
    expect(container.querySelectorAll("table")).toHaveLength(9);
  });

  it("すべての Mermaid 図にライトテーマ用の初期化設定（%%{init:...}%%）が付与されている", () => {
    const { container } = render(<Page />);
    const diagrams = container.querySelectorAll(".mermaid");
    expect(diagrams).toHaveLength(16);
    for (const diagram of diagrams) {
      const chart = diagram.getAttribute("data-chart") ?? "";
      expect(chart).toMatch(/^%%\{init:\s*\{.*"theme":\s*"base"/s);
      expect(chart).toContain('"edgeLabelBackground": "#f8f4ea"');
    }
  });
});
