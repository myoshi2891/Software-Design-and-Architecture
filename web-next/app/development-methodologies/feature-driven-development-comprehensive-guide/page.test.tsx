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

  describe("Category B: プロセス3〜5・ロール定義 (s5 - s8)", () => {
    it("Category B のセクション (s5, s6, s7, s8) が存在する", () => {
      const { container } = render(<Page />);
      const s5 = container.querySelector("#s5");
      const s6 = container.querySelector("#s6");
      const s7 = container.querySelector("#s7");
      const s8 = container.querySelector("#s8");

      expect(s5).not.toBeNull();
      expect(s6).not.toBeNull();
      expect(s7).not.toBeNull();
      expect(s8).not.toBeNull();

      expect(s5?.querySelector("h2")?.textContent).toContain("計画策定");
      expect(s6?.querySelector("h2")?.textContent).toContain("フィーチャーごとの設計");
      expect(s7?.querySelector("h2")?.textContent).toContain("フィーチャーごとの構築");
      expect(s8?.querySelector("h2")?.textContent).toContain("ロール（役割）定義");
    });

    it("s5 に優先順位付けマトリックス SVG (viewBox='0 0 680 420') と計画策定ベストプラクティス表が存在する", () => {
      const { container } = render(<Page />);
      const s5 = container.querySelector("#s5");
      const svg = s5?.querySelector("svg");
      expect(svg).not.toBeNull();
      expect(svg?.getAttribute("viewBox")).toBe("0 0 680 420");
      const table = s5?.querySelector("table");
      expect(table).not.toBeNull();
    });

    it("s6 に設計インスペクションのチェックリストが存在する", () => {
      const { container } = render(<Page />);
      const s6 = container.querySelector("#s6");
      const listItems = s6?.querySelectorAll("ul.checklist li") ?? [];
      expect(listItems.length).toBe(6);
    });

    it("s7 にコードインスペクション表と Python 実装例コードブロックが存在する", () => {
      const { container } = render(<Page />);
      const s7 = container.querySelector("#s7");
      const table = s7?.querySelector("table");
      expect(table).not.toBeNull();
      const pre = s7?.querySelector("pre");
      expect(pre).not.toBeNull();
      expect(pre?.textContent).toContain("class Order");
      const spans = pre?.querySelectorAll("span.kw, span.fn, span.st") ?? [];
      expect(spans.length).toBeGreaterThan(0);
    });

    it("s8 にキーロールグリッド (6枚のロールカード) が存在する", () => {
      const { container } = render(<Page />);
      const s8 = container.querySelector("#s8");
      const cards = s8?.querySelectorAll(".role-card") ?? [];
      expect(cards.length).toBe(6);
      expect(s8?.textContent).toContain("プロジェクトマネージャー");
      expect(s8?.textContent).toContain("チーフアーキテクト");
      expect(s8?.textContent).toContain("開発マネージャー");
      expect(s8?.textContent).toContain("チーフプログラマー");
      expect(s8?.textContent).toContain("クラスオーナー");
      expect(s8?.textContent).toContain("ドメインエキスパート");
    });

    it("Category B の Mermaid 図が追加され、全体で 11 個以上描画される", () => {
      const { container } = render(<Page />);
      const mermaids = container.querySelectorAll(".mermaid");
      expect(mermaids.length).toBeGreaterThanOrEqual(11);
    });
  });

  describe("Category C: 設計実践・進捗管理・比較 (s9 - s11)", () => {
    it("Category C のセクション (s9, s10, s11) が存在する", () => {
      const { container } = render(<Page />);
      const s9 = container.querySelector("#s9");
      const s10 = container.querySelector("#s10");
      const s11 = container.querySelector("#s11");

      expect(s9).not.toBeNull();
      expect(s10).not.toBeNull();
      expect(s11).not.toBeNull();

      expect(s9?.querySelector("h2")?.textContent).toContain("フィーチャーの記述と分解方法");
      expect(s10?.querySelector("h2")?.textContent).toContain("進捗管理と報告");
      expect(s11?.querySelector("h2")?.textContent).toContain("FDDと他手法との比較・組み合わせ");
    });

    it("s9 にフィーチャー分解ステップリスト (ol.step-list) が存在する", () => {
      const { container } = render(<Page />);
      const s9 = container.querySelector("#s9");
      const steps = s9?.querySelectorAll("ol.step-list li") ?? [];
      expect(steps.length).toBe(4);
    });

    it("s10 に 6段階完了ステータスフロー (.status-flow) と進捗管理ベストプラクティス表が存在する", () => {
      const { container } = render(<Page />);
      const s10 = container.querySelector("#s10");
      const flow = s10?.querySelector(".status-flow");
      expect(flow).not.toBeNull();
      const steps = s10?.querySelectorAll(".status-step") ?? [];
      expect(steps.length).toBe(7);
      expect(s10?.textContent).toContain("未着手");
      expect(s10?.textContent).toContain("設計");
      expect(s10?.textContent).toContain("設計検査完了");
      expect(s10?.textContent).toContain("コーディング");
      expect(s10?.textContent).toContain("コード検査完了");
      expect(s10?.textContent).toContain("プロモーション完了");

      const table = s10?.querySelector("table");
      expect(table).not.toBeNull();
    });

    it("s11 に主要手法比較表とアジャイル関連外部リンクが存在する", () => {
      const { container } = render(<Page />);
      const s11 = container.querySelector("#s11");
      const table = s11?.querySelector("table");
      expect(table).not.toBeNull();
      expect(s11?.textContent).toContain("Scrum");
      expect(s11?.textContent).toContain("XP");
      expect(s11?.textContent).toContain("Kanban");

      const links = s11?.querySelectorAll("a") ?? [];
      expect(links.length).toBeGreaterThanOrEqual(1);
    });

    it("Category C の Mermaid 図が追加され、全体で 14 個以上描画される", () => {
      const { container } = render(<Page />);
      const mermaids = container.querySelectorAll(".mermaid");
      expect(mermaids.length).toBeGreaterThanOrEqual(14);
    });
  });

  describe("Category D: EC事例・ベストプラクティス・アンチパターン・参考文献 (s12 - s15)", () => {
    it("Category D のセクション (s12, s13, s14, s15) が存在する", () => {
      const { container } = render(<Page />);
      expect(container.querySelector("#s12")).not.toBeNull();
      expect(container.querySelector("#s13")).not.toBeNull();
      expect(container.querySelector("#s14")).not.toBeNull();
      expect(container.querySelector("#s15")).not.toBeNull();
    });

    it("s12 にプロジェクト概要表、シーケンス図、OrderService Python実装例コードブロックが存在する", () => {
      const { container } = render(<Page />);
      const s12 = container.querySelector("#s12");
      const table = s12?.querySelector("table");
      expect(table).not.toBeNull();
      expect(s12?.textContent).toContain("大手百貨店ECサイト構築");

      const codeBlock = s12?.querySelector("pre code");
      expect(codeBlock).not.toBeNull();
      expect(codeBlock?.textContent).toContain("class OrderService:");
      expect(codeBlock?.textContent).toContain("create_order");
    });

    it("s13 にFDDベストプラクティス・成熟度モデル・ロードマップの見出しが存在する", () => {
      const { container } = render(<Page />);
      const s13 = container.querySelector("#s13");
      expect(s13?.textContent).toContain("プロセス別ベストプラクティス一覧");
      expect(s13?.textContent).toContain("FDD成熟度モデル");
      expect(s13?.textContent).toContain("FDD導入ロードマップ");
    });

    it("s14 に 4つのアンチパターンカードと健全性チェックフローが存在する", () => {
      const { container } = render(<Page />);
      const s14 = container.querySelector("#s14");
      const cards = s14?.querySelectorAll(".antipattern-card") ?? [];
      expect(cards.length).toBe(4);
      expect(s14?.textContent).toContain("Feature Bloat");
      expect(s14?.textContent).toContain("Absent Domain Expert");
      expect(s14?.textContent).toContain("Ghost Class Owner");
      expect(s14?.textContent).toContain("Skip Inspection");
      expect(s14?.textContent).toContain("健全性チェックフロー");
    });

    it("s15 に必読書籍表、4つのカテゴリ別リソース表、および外部リンクが存在する", () => {
      const { container } = render(<Page />);
      const s15 = container.querySelector("#s15");
      const tables = s15?.querySelectorAll("table") ?? [];
      expect(tables.length).toBe(5); // 必読書籍(1) + 公式ドキュメント(4)
      expect(s15?.textContent).toContain("A Practical Guide to Feature-Driven Development");
      expect(s15?.textContent).toContain("Java Modeling in Color with UML");
      expect(s15?.textContent).toContain("Agile Estimating and Planning");
      expect(s15?.textContent).toContain("Clean Agile");

      const refWraps = s15?.querySelectorAll(".ref-table-wrap") ?? [];
      expect(refWraps.length).toBe(4);

      const links = s15?.querySelectorAll("a.ref-link") ?? [];
      expect(links.length).toBeGreaterThanOrEqual(12);
    });

    it("全15セクションの Mermaid 図がすべて描画され、合計 23 個の mermaid-wrap が存在する", () => {
      const { container } = render(<Page />);
      const wraps = container.querySelectorAll(".mermaid-wrap");
      expect(wraps.length).toBe(23);
    });
  });
});
