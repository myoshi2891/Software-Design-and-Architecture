// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("ai-native-value-architect-guide page contract", () => {
  it("h1 見出しが原本と完全一致する", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.replace(/\s+/g, " ").trim()).toBe(
      "AI-Native Value Architect Certification 学習ガイド"
    );
  });

  it("h2 セクション見出しが 11 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(11);
  });

  it("11 個の主要セクションが原本と完全一致する id と順序を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section.section[id]");
    const ids = Array.from(sections).map((s) => s.id);
    expect(ids).toEqual([
      "prereq",
      "overview",
      "role",
      "domain1",
      "domain2",
      "domain3",
      "domain4",
      "map",
      "glossary",
      "checklist",
      "references",
    ]);
  });

  it("外部リンクすべて (41個) に target=_blank と rel=noopener noreferrer が付く", () => {
    const { container } = render(<Page />);
    const external = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http")
    );
    expect(external.length).toBe(41);
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

  it("Mermaid 図 7 個・table 14 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(7);
    expect(container.querySelectorAll("table")).toHaveLength(14);
  });

  it("チェックリスト項目が 9 個存在する", () => {
    const { container } = render(<Page />);
    const checklistItems = container.querySelectorAll(".checklist li");
    expect(checklistItems).toHaveLength(9);
  });

  it("globals.css に .ai-native-value-architect-guide のスコープ定義が含まれている", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const cssPath = path.resolve(__dirname, "../../globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    expect(cssContent).toContain(".ai-native-value-architect-guide");
    expect(cssContent).toContain("--color-paper");
    expect(cssContent).toContain("--color-indigo");
  });
});
