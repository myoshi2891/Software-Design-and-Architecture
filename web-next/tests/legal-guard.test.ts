// [Red] 法務ガード（公開デプロイ前の著作権・商標チェック）。
//
// 固定する契約:
// - 表記チェックはソース文字列ではなく、ページを描画した表示テキストに対して行う
//   （コメントや未描画のコードに文言があるだけでは通らない）。
// - git 追跡下の app/ に、海賊版・違法アップロード・試験問題流出系サイトへの
//   言及やリンクを含めない（著作権法 113 条のリーチサイト規制・受験規約への配慮）。
//   追跡外のローカル専用ガイドと、テスト専用の原本照合ヘルパー (source-contract.ts) は
//   配信されないため対象外。
// - TOGAF: ExamTopics を推奨しない／冒頭にも商標・非公式表記／出題比率は筆者の目安と明記／
//   Zachman® を商標表記に含める／サイドバーバッジが公式ブランド風でない。
// - SAFe®: Scaled Agile, Inc. の商標表記。
// - 多エージェントガイド: 同名書籍と紛らわしい英題と、無関係な書籍の参考文献を置かない。
// - SOLID の引用には提唱者を付記する。
// - SOA: 無関係なブランドアイコン（Cash App）を使わない。
// - Clean Architecture の同心円図は原典の概念に基づく作図と明記する。
// - LLM 書籍の出版社は Packt Publishing（O'Reilly は配信のみ）。

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render, within } from "@testing-library/react";
import { type ComponentType, createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import CleanArchitecturePage from "@/app/architecture/clean-architecture-comprehensive-guide/page";
import HexagonalPage from "@/app/architecture/hexagonal-architecture-comprehensive-guide/page";
import SoaPage from "@/app/architecture/service-oriented-architecture-comprehensive-guide/page";
import AiNativePage from "@/app/certification-exams/ai-native-value-architect-guide/page";
import MultiAgentPage from "@/app/design-principles/designing-multi-agent-systems-guide/page";
import OopPage from "@/app/design-principles/object-oriented-programming-comprehensive-guide/page";
import TogafPage from "@/app/product-and-enterprise/togaf-certification-comprehensive-guide/page";
import LlmBookPage from "@/app/recommended-books/building-llm-powered-applications-guide/page";

// タブ切替時の window.scrollTo は jsdom 未実装のため無効化する。
vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);

const normalize = (text: string | null | undefined) => (text ?? "").replace(/\s+/g, " ");

type Rendered = {
  readonly text: string;
  readonly panels: readonly string[];
  readonly html: string;
};

// ページを描画し、表示テキストを返す。選択中の章だけをマウントするタブ UI は、
// 全タブを順に選択して各章のテキストを panels に集める。
function renderPage(Page: ComponentType): Rendered {
  const { container, unmount } = render(createElement(Page));
  const panels = within(container)
    .queryAllByRole("tab")
    .map((tab) => {
      fireEvent.click(tab);
      return normalize(container.querySelector('[role="tabpanel"]:not([hidden])')?.textContent);
    });
  const text = panels.length > 0 ? panels.join(" ") : normalize(container.textContent);
  const html = container.innerHTML;
  unmount();
  return { text, panels, html };
}

const FORBIDDEN = /flylib\.com|dokumen\.pub|examtopics|archive\.org\/details\/|libgen|z-lib/i;

describe("tracked sources", () => {
  it("never reference pirate or exam-dump sites", () => {
    const files = execFileSync("git", ["ls-files", "app"], { encoding: "utf8" })
      .split("\n")
      .filter((f) => /\.(tsx?|css)$/.test(f) && !/\.test\.tsx?$|source-contract\.ts$/.test(f));
    expect(files.length).toBeGreaterThan(0);
    const hits = files.filter((f) => FORBIDDEN.test(readFileSync(join(process.cwd(), f), "utf8")));
    expect(hits).toEqual([]);
  });
});

describe("TOGAF guide", () => {
  const { text: page, panels, html } = renderPage(TogafPage);

  it("does not recommend ExamTopics", () => {
    expect(page).not.toMatch(/ExamTopics/i);
  });

  it("shows the trademark and unofficial notice in the overview as well as the end", () => {
    const notice = "TOGAF® は The Open Group の登録商標です";
    const overview = panels[0] ?? "";
    expect(page.split(notice).length - 1).toBeGreaterThanOrEqual(2);
    expect(overview).toContain(notice);
    expect(overview.indexOf(notice)).toBeLessThan(overview.indexOf("TOGAF の定義"));
  });

  it("labels exam weight tables as the author's estimate", () => {
    expect(page).toContain("公式発表ではなく、公開情報をもとにした筆者による目安です");
  });

  it("includes Zachman® in the trademark notice", () => {
    expect(page).toContain("Zachman® は Zachman International, Inc. の登録商標です");
  });

  it("does not use an official-looking version badge", () => {
    expect(html).not.toContain(">TOGAF v10<");
  });
});

describe("AI-Native Value Architect guide", () => {
  it("states the SAFe® trademark", () => {
    expect(renderPage(AiNativePage).text).toContain(
      "SAFe® および Scaled Agile Framework® は Scaled Agile, Inc. の登録商標です"
    );
  });
});

describe("multi-agent systems guide", () => {
  const { text: page } = renderPage(MultiAgentPage);

  it("avoids an English title identical to a published book", () => {
    expect(page).not.toContain("（Designing Multi-Agent Systems）");
  });

  it("does not list an unrelated book as a reference", () => {
    expect(page).not.toContain("Designing with Multi-Agent Systems");
  });
});

describe("SOLID quotes", () => {
  const { text: oop } = renderPage(OopPage);

  it.each([
    "「拡張に対して開かれており、修正に対して閉じていなければならない」— Bertrand Meyer",
    "「クライアントが使用しないメソッドへの依存を強制してはならない」— Robert C. Martin",
    "「上位モジュールは下位モジュールに依存してはならない。両者は抽象に依存すべきだ」— Robert C. Martin",
  ])("attributes %s", (quote) => {
    expect(oop).toContain(quote);
  });

  it("attributes DIP in the hexagonal guide", () => {
    expect(renderPage(HexagonalPage).text).toContain("という Robert C. Martin が提唱した原則です");
  });
});

describe("misc attributions", () => {
  it("does not use the Cash App brand icon in the SOA guide", () => {
    // @tabler/icons-react は SVG に tabler-icon-<name> クラスを付与する。
    expect(renderPage(SoaPage).html).not.toContain("tabler-icon-brand-cashapp");
  });

  it("captions the Clean Architecture diagram as a redrawing", () => {
    expect(renderPage(CleanArchitecturePage).text).toContain(
      "Robert C. Martin「The Clean Architecture」(2012) の概念を基に作図"
    );
  });

  it("names Packt as the publisher of Building LLM Powered Applications", () => {
    const { text: page } = renderPage(LlmBookPage);
    expect(page).not.toContain("O'Reilly / Packt Publishing 刊");
    expect(page).toContain("Packt Publishing 刊の書籍");
  });
});
