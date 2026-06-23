import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
// （実描画は MermaidDiagram.test.tsx で担保）
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "@/app/architecture/event-driven-architecture-comprehensive-guide/page";

// 本文 <main> 内のセクションは sec-1 〜 sec-16 の連番で出現する。
const SECTION_IDS = Array.from({ length: 16 }, (_, i) => `sec-${i + 1}`);

// サイドバー nav はカテゴリでグルーピングされ、連番ではない順序で並ぶ（元 HTML 準拠）。
const NAV_ORDER = [
  "#sec-1",
  "#sec-2",
  "#sec-3",
  "#sec-4",
  "#sec-5",
  "#sec-8",
  "#sec-9",
  "#sec-6",
  "#sec-7",
  "#sec-10",
  "#sec-11",
  "#sec-12",
  "#sec-13",
  "#sec-14",
  "#sec-15",
  "#sec-16",
];

describe("event-driven-architecture-comprehensive-guide page", () => {
  it("h1 見出しが EDA 完全ガイドのタイトルである", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("イベント駆動");
    expect(h1?.textContent).toContain("アーキテクチャ完全ガイド");
  });

  it("h2 セクション見出しが 16 個ある", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h2")).toHaveLength(16);
  });

  it("16 個のセクションがソースと同じ id を連番で持つ", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section.section");
    expect(sections).toHaveLength(16);
    const ids = Array.from(sections).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("サイドバー nav が 16 リンクを持ち、グルーピング順でアンカーを指す", () => {
    const { container } = render(<Page />);
    const navLinks = container.querySelectorAll("aside.sidebar a.sl");
    expect(navLinks).toHaveLength(16);
    const hrefs = Array.from(navLinks).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(NAV_ORDER);
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
    // 外部リンク（http〜）は martinfowler.com/...EventSourcing.html のように
    // 正規の .html リソースを指すため対象外。検証は内部リンク（# / 相対）に限定する。
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("http")) continue;
      expect(href).not.toContain(".html");
    }
  });

  it("Mermaid 図 18 個・table 7 個・コードブロック 6 個を描画する", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(18);
    expect(container.querySelectorAll("table")).toHaveLength(7);
    expect(container.querySelectorAll("pre")).toHaveLength(6);
  });
});
