import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

import Page from "./page";

describe("extreme-programming-comprehensive-guide page (Category A)", () => {
  it("h1 見出しに XP（エクストリームプログラミング）完全ガイドが含まれる", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("XP（エクストリームプログラミング）完全ガイド");
  });

  it("Hero セクションに説明文とバッジ群が含まれる", () => {
    const { container } = render(<Page />);
    const hero = container.querySelector(".hero");
    expect(hero).not.toBeNull();
    expect(hero?.textContent).toContain("Kent Beck");
    expect(hero?.textContent).toContain("5つの価値");
    expect(hero?.textContent).toContain("13のプラクティス");
    expect(hero?.textContent).toContain("Agile");
    expect(hero?.textContent).toContain("Engineering Practices");
    expect(hero?.textContent).toContain("初学者向け");
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

    expect(s1?.querySelector("h2")?.textContent).toContain("XPとは何か");
    expect(s2?.querySelector("h2")?.textContent).toContain("5つの価値");
    expect(s3?.querySelector("h2")?.textContent).toContain("13のプラクティス");
    expect(s4?.querySelector("h2")?.textContent).toContain("TDD");
  });

  it("Category A の Mermaid 図 (diag-1 〜 diag-5) が描画される", () => {
    const { container } = render(<Page />);
    const mermaids = container.querySelectorAll(".mermaid");
    expect(mermaids.length).toBeGreaterThanOrEqual(5);
  });

  it("内部リンクに .html を含まない", () => {
    const { container } = render(<Page />);
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("http")) continue;
      expect(href).not.toContain(".html");
    }
  });

  it("s4 の Python コードブロックに構文ハイライト用 span が含まれている", () => {
    const { container } = render(<Page />);
    const pres = container.querySelectorAll("pre");
    expect(pres.length).toBeGreaterThanOrEqual(1);
    for (const pre of pres) {
      const spans = pre.querySelectorAll("span.kw, span.cm, span.st, span.fn");
      expect(spans.length).toBeGreaterThan(0);
    }
  });

  describe("Category B: 開発・コーディングプラクティス (s5 - s9)", () => {
    it("Category B のセクション (s5, s6, s7, s8, s9) が存在する", () => {
      const { container } = render(<Page />);
      const s5 = container.querySelector("#s5");
      const s6 = container.querySelector("#s6");
      const s7 = container.querySelector("#s7");
      const s8 = container.querySelector("#s8");
      const s9 = container.querySelector("#s9");

      expect(s5).not.toBeNull();
      expect(s6).not.toBeNull();
      expect(s7).not.toBeNull();
      expect(s8).not.toBeNull();
      expect(s9).not.toBeNull();

      expect(s5?.querySelector("h2")?.textContent).toContain("ペアプログラミング");
      expect(s6?.querySelector("h2")?.textContent).toContain("継続的インテグレーション");
      expect(s7?.querySelector("h2")?.textContent).toContain("リファクタリング");
      expect(s8?.querySelector("h2")?.textContent).toContain("シンプルな設計");
      expect(s9?.querySelector("h2")?.textContent).toContain("小さなリリース");
    });

    it("Category B の Mermaid 図 (diag-6, diag-7) が追加され、合計 7 個以上描画される", () => {
      const { container } = render(<Page />);
      const mermaids = container.querySelectorAll(".mermaid");
      expect(mermaids.length).toBeGreaterThanOrEqual(7);
    });

    it("s6 に YAML コードブロックが存在し、構文ハイライト用 span が含まれている", () => {
      const { container } = render(<Page />);
      const s6 = container.querySelector("#s6");
      expect(s6).not.toBeNull();
      const pres = s6?.querySelectorAll("pre") ?? [];
      expect(pres.length).toBeGreaterThanOrEqual(1);
      const spans = pres[0]?.querySelectorAll("span.kw, span.cm, span.st") ?? [];
      expect(spans.length).toBeGreaterThan(0);
    });
  });

  describe("Category C: 協調・組織・フィードバックプラクティス (s10 - s16)", () => {
    it("Category C のセクション (s10 - s16) が存在する", () => {
      const { container } = render(<Page />);
      const s10 = container.querySelector("#s10");
      const s11 = container.querySelector("#s11");
      const s12 = container.querySelector("#s12");
      const s13 = container.querySelector("#s13");
      const s14 = container.querySelector("#s14");
      const s15 = container.querySelector("#s15");
      const s16 = container.querySelector("#s16");

      expect(s10).not.toBeNull();
      expect(s11).not.toBeNull();
      expect(s12).not.toBeNull();
      expect(s13).not.toBeNull();
      expect(s14).not.toBeNull();
      expect(s15).not.toBeNull();
      expect(s16).not.toBeNull();

      expect(s10?.querySelector("h2")?.textContent).toContain("計画ゲーム");
      expect(s11?.querySelector("h2")?.textContent).toContain("コレクティブオーナーシップ");
      expect(s12?.querySelector("h2")?.textContent).toContain("コーディング規約");
      expect(s13?.querySelector("h2")?.textContent).toContain("オンサイト顧客");
      expect(s14?.querySelector("h2")?.textContent).toContain("週40時間労働");
      expect(s15?.querySelector("h2")?.textContent).toContain("メタファー");
      expect(s16?.querySelector("h2")?.textContent).toContain("システム全体のテスト");
    });

    it("Category C の Mermaid 図 (diag-8 〜 diag-11) が追加され、合計 11 個以上描画される", () => {
      const { container } = render(<Page />);
      const mermaids = container.querySelectorAll(".mermaid");
      expect(mermaids.length).toBeGreaterThanOrEqual(11);
    });

    it("s10 と s12 にテーブルが存在する", () => {
      const { container } = render(<Page />);
      const s10 = container.querySelector("#s10");
      const s12 = container.querySelector("#s12");
      expect(s10?.querySelector("table")).toBeTruthy();
      expect(s12?.querySelector("table")).toBeTruthy();
    });
  });
});
