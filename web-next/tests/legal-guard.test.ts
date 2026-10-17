// [Red] 法務ガード（公開デプロイ前の著作権・商標チェック）。
//
// 固定する契約:
// - git 追跡下の app/ に、海賊版・違法アップロード・試験問題流出系サイトへの
//   言及やリンクを含めない（著作権法 113 条のリーチサイト規制・受験規約への配慮）。
//   追跡外のローカル専用ガイドは公開されないため対象外。
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
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(join(process.cwd(), "app", path), "utf8");

const FORBIDDEN = /flylib\.com|dokumen\.pub|examtopics|archive\.org\/details\/|libgen|z-lib/i;

describe("tracked sources", () => {
  it("never reference pirate or exam-dump sites", () => {
    const files = execFileSync("git", ["ls-files", "app"], { encoding: "utf8" })
      .split("\n")
      .filter(
        (f) => /\.(tsx?|css)$/.test(f) && !f.endsWith(".test.ts") && !f.endsWith(".test.tsx")
      );
    expect(files.length).toBeGreaterThan(0);
    const hits = files.filter((f) => FORBIDDEN.test(readFileSync(join(process.cwd(), f), "utf8")));
    expect(hits).toEqual([]);
  });
});

describe("TOGAF guide", () => {
  const dir = "product-and-enterprise/togaf-certification-comprehensive-guide";
  const page = read(`${dir}/page.tsx`);

  it("does not recommend ExamTopics", () => {
    expect(page).not.toMatch(/ExamTopics/i);
  });

  it("shows the trademark and unofficial notice in the overview as well as the end", () => {
    const notice = "TOGAF® は The Open Group の登録商標です";
    expect(page.split(notice).length - 1).toBeGreaterThanOrEqual(2);
    expect(page.indexOf(notice)).toBeLessThan(page.indexOf('<h2>{"TOGAF の定義"}</h2>'));
  });

  it("labels exam weight tables as the author's estimate", () => {
    expect(page).toContain("公式発表ではなく、公開情報をもとにした筆者による目安です");
  });

  it("includes Zachman® in the trademark notice", () => {
    expect(page).toContain("Zachman® は Zachman International, Inc. の登録商標です");
  });

  it("does not use an official-looking version badge", () => {
    expect(read(`${dir}/TogafGuideShell.tsx`)).not.toContain(">TOGAF v10<");
  });
});

describe("AI-Native Value Architect guide", () => {
  it("states the SAFe® trademark", () => {
    expect(read("certification-exams/ai-native-value-architect-guide/page.tsx")).toContain(
      "SAFe® および Scaled Agile Framework® は Scaled Agile, Inc. の登録商標です"
    );
  });
});

describe("multi-agent systems guide", () => {
  const page = read("design-principles/designing-multi-agent-systems-guide/page.tsx");

  it("avoids an English title identical to a published book", () => {
    expect(page).not.toContain("（Designing Multi-Agent Systems）");
  });

  it("does not list an unrelated book as a reference", () => {
    expect(page).not.toContain("Designing with Multi-Agent Systems");
  });
});

describe("SOLID quotes", () => {
  const oop = read("design-principles/object-oriented-programming-comprehensive-guide/page.tsx");

  it.each([
    "「拡張に対して開かれており、修正に対して閉じていなければならない」— Bertrand Meyer",
    "「クライアントが使用しないメソッドへの依存を強制してはならない」— Robert C. Martin",
    "「上位モジュールは下位モジュールに依存してはならない。両者は抽象に依存すべきだ」— Robert C. Martin",
  ])("attributes %s", (quote) => {
    expect(oop).toContain(quote);
  });

  it("attributes DIP in the hexagonal guide", () => {
    expect(read("architecture/hexagonal-architecture-comprehensive-guide/page.tsx")).toContain(
      "という Robert C. Martin が提唱した原則です"
    );
  });
});

describe("misc attributions", () => {
  it("does not use the Cash App brand icon in the SOA guide", () => {
    expect(
      read("architecture/service-oriented-architecture-comprehensive-guide/page.tsx")
    ).not.toContain("IconBrandCashapp");
  });

  it("captions the Clean Architecture diagram as a redrawing", () => {
    expect(read("architecture/clean-architecture-comprehensive-guide/page.tsx")).toContain(
      "Robert C. Martin「The Clean Architecture」(2012) の概念を基に作図"
    );
  });

  it("names Packt as the publisher of Building LLM Powered Applications", () => {
    const page = read("recommended-books/building-llm-powered-applications-guide/page.tsx");
    expect(page).not.toContain("O'Reilly / Packt Publishing 刊");
    expect(page).toContain("Packt Publishing 刊の書籍");
  });
});
