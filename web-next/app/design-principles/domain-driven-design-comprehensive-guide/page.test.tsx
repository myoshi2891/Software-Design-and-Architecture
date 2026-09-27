// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("domain-driven-design-comprehensive-guide page", () => {
  it("h1 見出しが完全ガイドのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("DDD 完全ガイド");
  });

  it("h2 セクション見出しが 19 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(19);
  });

  it("19 個のセクションがソースと同じ id を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section.section");
    expect(sections).toHaveLength(19);
    const ids = Array.from(sections).map((s) => s.id);
    expect(ids).toEqual([
      "intro",
      "structure",
      "ubiquitous",
      "domain",
      "bounded",
      "contextmap",
      "entity",
      "valueobject",
      "aggregate",
      "domainevent",
      "repository",
      "domainservice",
      "factory",
      "architecture",
      "eventstorming",
      "implementation",
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

  it("Mermaid 図 23 個・table 9 個・コードブロック 8 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(23);
    expect(container.querySelectorAll("table")).toHaveLength(9);
    expect(container.querySelectorAll("pre")).toHaveLength(8);
  });

  it("globals.css に .domain-driven-design-comprehensive-guide のレイアウト定義が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    const dddSection = cssContent.slice(
      cssContent.indexOf(".domain-driven-design-comprehensive-guide")
    );
    expect(cssContent).toContain(".domain-driven-design-comprehensive-guide");

    const mainStyleRegex =
      /\.main\s*\{\s*flex:\s*1;\s*max-width:\s*calc\(100%\s*-\s*260px\);/;
    expect(mainStyleRegex.test(dddSection)).toBe(true);
  });
});
