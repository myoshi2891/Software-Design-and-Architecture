import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("api-first-design-comprehensive-guide page", () => {
  it("h1 見出しが完全リファレンスのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("API-First設計");
    expect(h1?.textContent).toContain("完全ガイド");
  });

  it("h2 セクション見出しが 16 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(16);
  });

  it("16 個のセクションがソースと同じ id を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section");
    expect(sections).toHaveLength(16);
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
      "sec15",
      "sec16",
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

  it("Mermaid 図 27 個・table 10 個・コードブロック 7 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(27);
    expect(container.querySelectorAll("table")).toHaveLength(10);
    expect(container.querySelectorAll("pre")).toHaveLength(7);
  });

  it("すべてのコードブロック（pre）にハイライト用 span が含まれている", () => {
    const { container } = render(<Page />);
    const pres = container.querySelectorAll("pre");
    expect(pres).toHaveLength(7);
    for (const pre of pres) {
      const spans = pre.querySelectorAll("span.kw, span.cm, span.st, span.fn, span.nu");
      expect(spans.length).toBeGreaterThan(0);
    }
  });

  it("globals.css に .api-first-design-comprehensive-guide .main のレイアウト調整が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    const scopeClass = ".api-first-design-comprehensive-guide";
    expect(cssContent).toContain(scopeClass);
    const scopeStart = cssContent.indexOf(scopeClass);
    let depth = 0,
      endIdx = scopeStart;
    for (let i = scopeStart; i < cssContent.length; i++) {
      if (cssContent[i] === "{") depth++;
      else if (cssContent[i] === "}" && --depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
    const sectionContent = cssContent.slice(scopeStart, endIdx);

    const mainStyleRegex = /\.main\s*\{\s*flex:\s*1;\s*min-width:\s*0;\s*margin-left:\s*0;\s*\}/;
    expect(mainStyleRegex.test(sectionContent)).toBe(true);
  });
});
