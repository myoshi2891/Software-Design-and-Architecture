// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("object-oriented-programming-comprehensive-guide page", () => {
  it("h1 見出しが完全ガイドのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("OOP 完全ガイド");
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
    expect(ids).toEqual([
      "sec1",
      "sec2",
      "sec3",
      "sec4",
      "sec5",
      "sec6",
      "sec7",
      "sec8",
      "sec9",
      "sec10",
      "sec11",
      "sec12",
      "sec13",
      "sec14",
    ]);
  });

  it("サイドバー非表示幅でも全 14 章へ到達できる本文内目次がある", () => {
    const { container } = render(<Page />);
    const toc = container.querySelector("main nav.toc-grid");
    expect(toc).not.toBeNull();
    const hrefs = Array.from(toc?.querySelectorAll("a") ?? []).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(Array.from({ length: 14 }, (_, i) => `#sec${i + 1}`));
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

  it("Mermaid 図 26 個・table 8 個・コードブロック 26 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(26);
    expect(container.querySelectorAll("table")).toHaveLength(8);
    expect(container.querySelectorAll("pre")).toHaveLength(26);
  });

  it("globals.css に .object-oriented-programming-comprehensive-guide のレイアウト定義が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    const oopSection = cssContent.slice(
      cssContent.indexOf(".object-oriented-programming-comprehensive-guide")
    );
    expect(cssContent).toContain(".object-oriented-programming-comprehensive-guide");

    const mainStyleRegex = /\.main\s*\{\s*margin-left:\s*var\(--sidebar-w\);/;
    expect(mainStyleRegex.test(oopSection)).toBe(true);
  });
});
