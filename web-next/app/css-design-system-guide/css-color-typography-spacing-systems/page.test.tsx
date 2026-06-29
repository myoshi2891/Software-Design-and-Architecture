import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("css-color-typography-spacing-systems page", () => {
  it("h1 見出しが完全リファレンスのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("CSSデザインシステム");
    expect(h1?.textContent).toContain("完全ガイド");
  });

  it("h2 セクション見出しが 30 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(30);
  });

  it("25 個のセクションがソースと同じ id を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section.section");
    // hero は id なし、または sidebar 対象外だが、
    // ここでは id 付きの section.section を 25 個検証する
    const ids = Array.from(sections)
      .map((s) => s.id)
      .filter((id) => id !== "");
    expect(ids).toEqual([
      "s31", "s32", "s33", "s34", "s35",
      "s41", "s42", "s43", "s44", "s45", "s46",
      "s51", "s52", "s53", "s54", "s55", "s56",
      "s61", "s62", "s63", "s64", "s65", "s66",
      "summary", "refs"
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

  it("Mermaid 図 17 個・table 7 個・コードブロック 42 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(17);
    expect(container.querySelectorAll("table")).toHaveLength(7);
    expect(container.querySelectorAll("pre")).toHaveLength(42);
  });

  it("globals.css に .css-color-typography-spacing-systems .main のレイアウト調整が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    const pageSection = cssContent.slice(
      cssContent.indexOf(".css-color-typography-spacing-systems")
    );
    expect(cssContent).toContain(".css-color-typography-spacing-systems");

    const mainStyleRegex =
      /\.main\s*\{\s*margin-left:\s*var\(--sw\);\s*flex:\s*1;\s*max-width:\s*calc\(100%\s*-\s*var\(--sw\)\);\s*overflow-x:\s*hidden;\s*\}/;
    expect(mainStyleRegex.test(pageSection)).toBe(true);
  });
});
