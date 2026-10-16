// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// スタイル契約の検証用に globals.css を一度だけ読み込み、各テストで共有する。
const cssContent = readFileSync(resolve(__dirname, "../../globals.css"), "utf-8");

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("data-warehouse-toolkit-guide page contract", () => {
  it("h1 見出しが書籍ガイドのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("The Data Warehouse Toolkit 完全読解ガイド");
  });

  it("h2 セクション見出しが 19 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(19);
  });

  it("ナビゲーション対象となる 19 個のセクションが原本と同じ id・順序を持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section[id]");
    const ids = Array.from(sections).map((s) => s.id);
    expect(ids).toEqual([
      "book-info",
      "authors",
      "roadmap",
      "step0",
      "step1",
      "step2",
      "step3",
      "step4",
      "step5",
      "step6",
      "step7",
      "step8",
      "step9",
      "step10",
      "step11",
      "step12",
      "checklist",
      "glossary",
      "references",
    ]);
  });

  it("サイドバーのリンクがセクション id と同順のフラグメントリンクである", () => {
    const { container } = render(<Page />);
    const ids = Array.from(container.querySelectorAll("section[id]")).map((s) => s.id);
    const hrefs = Array.from(container.querySelectorAll("#sidebar a.nav-a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(ids.map((id) => `#${id}`));
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

  it("Mermaid 図 11 個・table 11 個・コードブロック 1 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(11);
    expect(container.querySelectorAll("table")).toHaveLength(11);
    expect(container.querySelectorAll("pre")).toHaveLength(1);
  });

  it("ヒーローセクションに無駄なフック（hero-eyebrow）が存在しない", () => {
    const { container } = render(<Page />);
    expect(container.querySelector(".hero-eyebrow")).toBeNull();
  });

  it("すべての Mermaid 図にライトテーマ用の初期化設定（%%{init:...}%%）が付与されている", () => {
    const { container } = render(<Page />);
    const diagrams = container.querySelectorAll(".mermaid");
    expect(diagrams).toHaveLength(11);
    for (const diagram of diagrams) {
      const chart = diagram.getAttribute("data-chart") ?? "";
      expect(chart).toContain("%%{init:");
      expect(chart).toContain('"theme": "base"');
    }
  });

  it("globals.css に .data-warehouse-toolkit-guide のスコープ定義が含まれている", () => {
    expect(cssContent).toContain(".data-warehouse-toolkit-guide");
  });

  it("globals.css でヒーローセクションの上部余白ゼロ・マージン相殺防止が定義されている", () => {
    expect(cssContent).toMatch(/\.hero\s*\{[^}]*display:\s*flow-root/);
    expect(cssContent).toMatch(/\.hero\s*h1\s*\{[^}]*margin-top:\s*0/);
  });
});
