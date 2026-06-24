import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("service-oriented-architecture-comprehensive-guide page", () => {
  it("h1 見出しが完全リファレンスのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("SOA（サービス指向アーキテクチャ）完全ガイド");
  });

  it("h2 セクション見出しが 17 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(17);
  });

  it("17 個のセクションがソースと同じ id を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section.section");
    expect(sections).toHaveLength(17);
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
    ]);
  });

  it("外部リンクすべてに target=_blank と rel=noopener noreferrer が付く", () => {
    const { container } = render(<Page />);
    const external = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http")
    );
    expect(external.length).toBe(36);
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

  it("Mermaid 図 20 個・table 8 個・コードブロック 5 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(20);
    expect(container.querySelectorAll("table")).toHaveLength(8);
    expect(container.querySelectorAll("pre")).toHaveLength(5);
  });

  it("globals.css に .service-oriented-architecture-comprehensive-guide .main のレイアウト調整が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    const cssSection = cssContent.slice(
      cssContent.indexOf(".service-oriented-architecture-comprehensive-guide")
    );
    expect(cssContent).toContain(".service-oriented-architecture-comprehensive-guide");

    const mainStyleRegex =
      /\.main\s*\{\s*margin-left:\s*var\(--sw\);\s*flex:\s*1;\s*max-width:\s*calc\(100%\s*-\s*var\(--sw\)\);\s*overflow-x:\s*hidden;\s*\}/;
    expect(mainStyleRegex.test(cssSection)).toBe(true);
  });
});
