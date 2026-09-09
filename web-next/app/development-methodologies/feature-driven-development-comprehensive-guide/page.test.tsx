import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("feature-driven-development-comprehensive-guide page (Category A)", () => {
  it("h1 見出しに FDD（Feature-Driven Development）完全ガイドが含まれる", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("FDD（Feature-Driven Development）完全ガイド");
  });

  it("Page Header に説明文とラベルが含まれる", () => {
    const { container } = render(<Page />);
    const header = container.querySelector(".page-header");
    expect(header).not.toBeNull();
    expect(header?.textContent).toContain("Software Development Methodology");
    expect(header?.textContent).toContain("フィーチャー駆動開発の5つのプロセス");
  });

  it("Category A のセクション (s1, s2, s3, s4) が存在する", () => {
    const { container } = render(<Page />);
    const s1 = container.querySelector("#s1");
    const s2 = container.querySelector("#s2");
    const s3 = container.querySelector("#s3");
    const s4 = container.querySelector("#s4");

    expect(s1).not.toBeNull();
    expect(s2).not.toBeNull();
    expect(s3).not.toBeNull();
    expect(s4).not.toBeNull();

    expect(s1?.querySelector("h2")?.textContent).toContain("FDDとは何か");
    expect(s2?.querySelector("h2")?.textContent).toContain("全体構造と5つのプロセス");
    expect(s3?.querySelector("h2")?.textContent).toContain("全体モデルの開発");
    expect(s4?.querySelector("h2")?.textContent).toContain("フィーチャーリストの構築");
  });

  it("Category A の Mermaid 図が 6 個描画される", () => {
    const { container } = render(<Page />);
    const mermaids = container.querySelectorAll(".mermaid");
    expect(mermaids.length).toBeGreaterThanOrEqual(6);
  });

  it("s2 に 6ヶ月プロジェクトのタイムライン SVG が描画される", () => {
    const { container } = render(<Page />);
    const s2 = container.querySelector("#s2");
    const svg = s2?.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 1100 564");
  });

  it("s4 にフィーチャーリスト記述テンプレートのコードブロック (pre) が存在する", () => {
    const { container } = render(<Page />);
    const s4 = container.querySelector("#s4");
    const pre = s4?.querySelector("pre");
    expect(pre).not.toBeNull();
    expect(pre?.textContent).toContain("フィーチャーID");
    expect(pre?.textContent).toContain("FT-003");
  });

  it("内部リンクに .html を含まない", () => {
    const { container } = render(<Page />);
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("http")) continue;
      expect(href).not.toContain(".html");
    }
  });
});
