import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("architecting-generative-ai-applications-guide page contract", () => {
  it("h1 見出しが原本と完全一致する", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.replace(/\s+/g, " ").trim()).toBe(
      "Architecting Generative AI Applications 徹底解説：プロトタイプから本番運用まで"
    );
  });

  it("h2 セクション見出しが 16 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(16);
  });

  it("16 個の主要セクションが原本と完全一致する id と順序を持つ", () => {
    const { container } = render(<Page />);
    const h2s = container.querySelectorAll("h2[id]");
    const ids = Array.from(h2s).map((h) => h.id);
    expect(ids).toEqual([
      "part0",
      "part1",
      "part2",
      "part3",
      "part4",
      "part5",
      "part6",
      "part7",
      "part8",
      "part9",
      "part10",
      "part11",
      "roadmap",
      "checklist",
      "glossary",
      "references",
    ]);
  });

  it("外部リンクすべてに target=_blank と rel=noopener noreferrer が付く", () => {
    const { container } = render(<Page />);
    const external = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http")
    );
    expect(external.length).toBe(28);
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

  it("Mermaid 図 28 個・table 16 個・コードブロック 2 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(28);
    expect(container.querySelectorAll("table")).toHaveLength(16);
    expect(container.querySelectorAll("pre.code-block")).toHaveLength(2);
  });

  it("globals.css に .architecting-generative-ai-applications-guide のスコープ定義が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain(".architecting-generative-ai-applications-guide");
    expect(cssContent).toContain("--bg: #07111e");
    expect(cssContent).toContain("--card: #0d1c30");
  });
});
