import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
// （実描画は MermaidDiagram.test.tsx で担保）
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "@/app/general/comprehensive-guide/page";

const SECTION_IDS = [
  "tdd",
  "bdd",
  "ddd",
  "fdd",
  "atdd",
  "eda",
  "api-first",
  "clean",
  "microservices",
  "comparison",
  "certs",
  "roadmap",
];

describe("comprehensive-guide page", () => {
  it("h1 見出しが完全リファレンスのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("IT業界 主流設計手法・駆動開発");
    expect(h1?.textContent).toContain("完全リファレンス");
  });

  it("h2 セクション見出しが 12 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(12);
  });

  it("12 個のセクションがソースと同じ id を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section.section");
    expect(sections).toHaveLength(12);
    const ids = Array.from(sections).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("TOC リンクが 12 個あり、すべてアンカー (#) を指す", () => {
    const { container } = render(<Page />);
    const tocItems = container.querySelectorAll("a.toc-item");
    expect(tocItems).toHaveLength(12);
    for (const a of tocItems) {
      expect(a.getAttribute("href")?.startsWith("#")).toBe(true);
    }
  });

  it("外部リンクすべてに target=_blank と rel=noopener noreferrer が付く", () => {
    const { container } = render(<Page />);
    const external = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http")
    );
    expect(external.length).toBeGreaterThan(0);
    for (const a of external) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("内部リンクに .html を含む旧 URL がない", () => {
    const { container } = render(<Page />);
    // 外部リンク（http〜）は martinfowler.com/...TestDrivenDevelopment.html のように
    // 正規の .html リソースを指すため対象外。検証は内部リンク（# / 相対パス）に限定する。
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("http")) continue;
      expect(href).not.toContain(".html");
    }
  });

  it("Mermaid 図 13 個・table 12 個・コードブロック 9 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(13);
    expect(container.querySelectorAll("table")).toHaveLength(12);
    expect(container.querySelectorAll("pre")).toHaveLength(9);
  });
});
