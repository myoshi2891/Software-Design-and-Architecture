import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mermaid 図はクライアント描画のため、契約テストでは軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => (
    <div className="mermaid" data-testid="mermaid-diagram" data-chart={chart} />
  ),
}));

import Page from "./page";

describe("behavior-driven-development-comprehensive-guide page (Category A)", () => {
  it("h1 見出しに BDD 完全ガイドと Behavior-Driven Development が含まれる", () => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("BDD");
    expect(h1?.textContent).toContain("完全ガイド");
    expect(h1?.textContent).toContain("Behavior-Driven Development");
  });

  it("Hero セクションに説明文とチップバッジ群が含まれる", () => {
    const { container } = render(<Page />);
    const hero = container.querySelector(".hero");
    expect(hero).not.toBeNull();
    expect(hero?.textContent).toContain("振る舞い駆動開発");
    expect(hero?.textContent).toContain("2026年版");
    expect(hero?.textContent).toContain("Python / pytest-bdd");
    expect(hero?.textContent).toContain("Java / Cucumber");
  });

  it("Category A のセクション (s1, s2, s3, s4) が存在する", () => {
    const { container } = render(<Page />);
    const s1 = container.querySelector("section#s1");
    const s2 = container.querySelector("section#s2");
    const s3 = container.querySelector("section#s3");
    const s4 = container.querySelector("section#s4");

    expect(s1).not.toBeNull();
    expect(s2).not.toBeNull();
    expect(s3).not.toBeNull();
    expect(s4).not.toBeNull();

    expect(s1?.querySelector("h2")?.textContent).toContain("BDDとは何か？");
    expect(s2?.querySelector("h2")?.textContent).toContain("BDDの基本：Given-When-Then構文");
    expect(s3?.querySelector("h2")?.textContent).toContain("Gherkin記法の完全解説");
    expect(s4?.querySelector("h2")?.textContent).toContain("BDDの開発フロー");
  });

  it("Category A の Mermaid 図 (m-problems, m-levels, m-gwt, m-story, m-keywords, m-cycle, m-amigos, m-sprint) が描画される", () => {
    const { container } = render(<Page />);
    const mermaids = container.querySelectorAll(".mermaid");
    expect(mermaids.length).toBeGreaterThanOrEqual(8);
  });

  it("内部リンクに .html を含まない", () => {
    const { container } = render(<Page />);
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("http")) continue;
      expect(href).not.toContain(".html");
    }
  });

  it("コードブロックに構文ハイライト用 span が含まれている", () => {
    const { container } = render(<Page />);
    const pres = container.querySelectorAll("pre");
    expect(pres.length).toBeGreaterThan(0);
    for (const pre of pres) {
      const spans = pre.querySelectorAll("span.kw, span.cm, span.st, span.fn, span.nu");
      expect(spans.length).toBeGreaterThan(0);
    }
  });

  describe("Category B: ツール & 実装 (s5 - s9)", () => {
    it("Category B のセクション (s5, s6, s7, s8, s9) の見出しが存在する", () => {
      const { container } = render(<Page />);
      const s5 = container.querySelector("section#s5");
      const s6 = container.querySelector("section#s6");
      const s7 = container.querySelector("section#s7");
      const s8 = container.querySelector("section#s8");
      const s9 = container.querySelector("section#s9");

      expect(s5?.querySelector("h2")?.textContent).toContain("ツールチェーンの選定");
      expect(s6?.querySelector("h2")?.textContent).toContain("Cucumber 完全実装ガイド（Java）");
      expect(s7?.querySelector("h2")?.textContent).toContain("pytest-bdd 完全実装ガイド");
      expect(s8?.querySelector("h2")?.textContent).toContain("ステップ定義のベストプラクティス");
      expect(s9?.querySelector("h2")?.textContent).toContain("フィクスチャとコンテキスト管理");
    });

    it("Mermaid 図 m-tools と m-cucumber-arch が追加され、合計 10 個以上描画される", () => {
      const { container } = render(<Page />);
      const mermaids = container.querySelectorAll(".mermaid");
      expect(mermaids.length).toBeGreaterThanOrEqual(10);
    });

    it("s6-s9 に複数のコードブロック（Java, Python, pom.xml等）が存在する", () => {
      const { container } = render(<Page />);
      const s6 = container.querySelector("section#s6");
      const s7 = container.querySelector("section#s7");
      const s8 = container.querySelector("section#s8");
      const s9 = container.querySelector("section#s9");

      const s6Pres = s6?.querySelectorAll("pre") ?? [];
      const s7Pres = s7?.querySelectorAll("pre") ?? [];
      const s8Pres = s8?.querySelectorAll("pre") ?? [];
      const s9Pres = s9?.querySelectorAll("pre") ?? [];

      expect(s6Pres.length + s7Pres.length + s8Pres.length + s9Pres.length).toBeGreaterThanOrEqual(
        6
      );
    });
  });

  describe("Category C: 高度な実践 (s10 - s13)", () => {
    it("Category C のセクション (s10, s11, s12, s13) の見出しが存在する", () => {
      const { container } = render(<Page />);
      const s10 = container.querySelector("section#s10");
      const s11 = container.querySelector("section#s11");
      const s12 = container.querySelector("section#s12");
      const s13 = container.querySelector("section#s13");

      expect(s10?.querySelector("h2")?.textContent).toContain("BDD と TDD の二重ループ");
      expect(s11?.querySelector("h2")?.textContent).toContain("受け入れテスト自動化（ATDD）");
      expect(s12?.querySelector("h2")?.textContent).toContain("BDD による API テスト");
      expect(s13?.querySelector("h2")?.textContent).toContain("BDD による UI テスト");
    });

    it("Mermaid 図 m-doubleloop, m-atdd, m-ui-arch が追加され、合計 13 個以上描画される", () => {
      const { container } = render(<Page />);
      const mermaids = container.querySelectorAll(".mermaid");
      expect(mermaids.length).toBeGreaterThanOrEqual(13);
    });

    it("s10-s13 にコードブロック（Feature, API, Playwright等）が存在する", () => {
      const { container } = render(<Page />);
      const s10 = container.querySelector("section#s10");
      const s11 = container.querySelector("section#s11");
      const s12 = container.querySelector("section#s12");
      const s13 = container.querySelector("section#s13");

      const s10Pres = s10?.querySelectorAll("pre") ?? [];
      const s11Pres = s11?.querySelectorAll("pre") ?? [];
      const s12Pres = s12?.querySelectorAll("pre") ?? [];
      const s13Pres = s13?.querySelectorAll("pre") ?? [];

      expect(
        s10Pres.length + s11Pres.length + s12Pres.length + s13Pres.length
      ).toBeGreaterThanOrEqual(4);
    });
  });

  describe("Category D: 品質・運用・事例・参考文献 (s14-s19 + Footer)", () => {
    it("セクション s14 から s19 までがすべて存在し、正しい見出しを持つ", () => {
      const { container } = render(<Page />);
      const s14 = container.querySelector("section#s14");
      const s15 = container.querySelector("section#s15");
      const s16 = container.querySelector("section#s16");
      const s17 = container.querySelector("section#s17");
      const s18 = container.querySelector("section#s18");
      const s19 = container.querySelector("section#s19");

      expect(s14?.querySelector("h2")?.textContent).toContain("シナリオ設計のベストプラクティス");
      expect(s15?.querySelector("h2")?.textContent).toContain("CI/CD パイプラインと BDD");
      expect(s16?.querySelector("h2")?.textContent).toContain("実践：EC サイト完全事例");
      expect(s17?.querySelector("h2")?.textContent).toContain("BDD ベストプラクティス総まとめ");
      expect(s18?.querySelector("h2")?.textContent).toContain("BDD のアンチパターン");
      expect(s19?.querySelector("h2")?.textContent).toContain("参考文献・ソース一覧");
    });

    it("Mermaid 図（m-cicd, m-maturity, m-health 等）が描画され、合計 17 個以上存在する", () => {
      const { container } = render(<Page />);
      const mermaids = container.querySelectorAll(".mermaid");
      expect(mermaids.length).toBeGreaterThanOrEqual(17);
    });

    it("s16 にチェックアウトフロー Gherkin とシナリオカバレッジマップが存在する", () => {
      const { container } = render(<Page />);
      const s16 = container.querySelector("section#s16");
      expect(s16?.textContent).toContain("@checkout @e2e");
      expect(s16?.textContent).toContain("チェックアウトフロー");
      expect(s16?.querySelector("table")).toBeTruthy();
      expect(s16?.textContent).toContain("@catalog");
    });

    it("s17 に BDD 成熟度モデルと導入ロードマップが存在する", () => {
      const { container } = render(<Page />);
      const s17 = container.querySelector("section#s17");
      expect(s17?.textContent).toContain("Level 0");
      expect(s17?.textContent).toContain("Level 5");
      expect(s17?.querySelector("ol.sl")).toBeTruthy();
      expect(s17?.textContent).toContain("Week 1-2");
    });

    it("s18 に 6 つの主要アンチパターンカードが存在する", () => {
      const { container } = render(<Page />);
      const s18 = container.querySelector("section#s18");
      expect(s18?.textContent).toContain("実装詳細の露出");
      expect(s18?.textContent).toContain("God Scenario");
      expect(s18?.textContent).toContain("シナリオ間の依存");
      expect(s18?.textContent).toContain("技術者だけが書くシナリオ");
      expect(s18?.textContent).toContain("過剰なシナリオ数");
      expect(s18?.textContent).toContain("失敗シナリオの放置");
    });

    it("s19 に必読書籍テーブルと各種外部リンクカードが存在する", () => {
      const { container } = render(<Page />);
      const s19 = container.querySelector("section#s19");
      expect(s19?.textContent).toContain("The Cucumber Book");
      expect(s19?.textContent).toContain("BDD in Action");
      const links = s19?.querySelectorAll("a") ?? [];
      expect(links.length).toBeGreaterThanOrEqual(15);
      const urls = Array.from(links).map((a) => a.getAttribute("href"));
      expect(urls).toContain("https://dannorth.net/introducing-bdd/");
      expect(urls).toContain("https://cucumber.io/docs/");
      expect(urls).toContain("https://pytest-bdd.readthedocs.io/");
    });

    it("フッターが表示され、2026年版の表記が含まれる", () => {
      const { container } = render(<Page />);
      const footer = container.querySelector(".footer");
      expect(footer).toBeTruthy();
      expect(footer?.textContent).toContain("2026年版 — BDD 完全ガイド");
    });
  });
});
