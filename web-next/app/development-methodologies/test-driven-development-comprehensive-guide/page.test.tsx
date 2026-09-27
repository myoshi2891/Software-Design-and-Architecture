// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("test-driven-development-comprehensive-guide page", () => {
  it("h1 見出しが完全ガイドのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.trim()).toBe("TDD（テスト駆動開発）完全ガイド");
  });

  it("h2 セクション見出しが 18 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(18);
  });

  it("18 個のセクションがソースと同じ id を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section.section");
    expect(sections).toHaveLength(18);
    const ids = Array.from(sections).map((s) => s.id);
    expect(ids).toEqual([
      "s1",
      "s2",
      "s3",
      "s4",
      "s5",
      "s6",
      "s7",
      "s8",
      "s9",
      "s10",
      "s11",
      "s12",
      "s13",
      "s14",
      "s15",
      "s16",
      "s17",
      "s18",
    ]);
  });

  it("外部リンクすべてに target=_blank と rel=noopener noreferrer が付く", () => {
    const { container } = render(<Page />);
    const external = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http")
    );
    expect(external.length).toBe(40);
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

  it("Mermaid 図 12 個・table 4 個・コードブロック 10 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(12);
    expect(container.querySelectorAll("table")).toHaveLength(4);
    expect(container.querySelectorAll("pre")).toHaveLength(10);
  });

  it("globals.css に .test-driven-development-comprehensive-guide のレイアウト定義が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain(".test-driven-development-comprehensive-guide");
    const tddSection = cssContent.slice(
      cssContent.indexOf(".test-driven-development-comprehensive-guide")
    );
    const mainStyleRegex = /\.main\s*\{\s*flex:\s*1;\s*max-width:\s*calc\(100%\s*-\s*260px\);/;
    expect(mainStyleRegex.test(tddSection)).toBe(true);
  });
});
