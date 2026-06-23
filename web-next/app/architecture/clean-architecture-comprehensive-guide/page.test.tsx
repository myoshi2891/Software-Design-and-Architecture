import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("clean-architecture-comprehensive-guide page", () => {
  it("h1 見出しが完全リファレンスのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("クリーンアーキテクチャ");
    expect(h1?.textContent).toContain("Complete Guide");
  });

  it("h2 セクション見出しが 14 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(14);
  });

  it("14 個のセクションがソースと同じ id を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section.section");
    expect(sections).toHaveLength(14);
    const ids = Array.from(sections).map((s) => s.id);
    // ソースの順序に合わせて検証
    expect(ids).toEqual([
      "intro",
      "layers",
      "dip",
      "entities",
      "usecases",
      "adapters",
      "frameworks",
      "di",
      "directory",
      "testing",
      "solid",
      "antipatterns",
      "bestpractices",
      "references",
    ]);
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
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("http")) continue;
      expect(href).not.toContain(".html");
    }
  });

  it("Mermaid 図 15 個・table 4 個・コードブロック 7 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(15);
    expect(container.querySelectorAll("table")).toHaveLength(4);
    expect(container.querySelectorAll("pre")).toHaveLength(7);
  });
});
