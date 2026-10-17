// [Red] 契約テスト (UnofficialBookNotice)。書籍ガイド冒頭の非公式・非提携の注記。
//
// 固定する契約:
// - <aside class="unofficial-book-notice" aria-label="非公式ガイドに関する注記">。
// - 書名・著者・出版社を表示する。
// - 非公式であること、著者・出版社と提携・承認関係にないこと、原著の購入を勧めること。
// - 公開対象の書籍ガイド 3 本がこの注記を配置している。

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UnofficialBookNotice } from "@/components/site/UnofficialBookNotice";

const props = { title: "Example Book", author: "Jane Doe", publisher: "Example Press" };

describe("UnofficialBookNotice", () => {
  it("renders a labelled aside", () => {
    const { container } = render(<UnofficialBookNotice {...props} />);
    expect(container.querySelector("aside.unofficial-book-notice")).not.toBeNull();
    expect(screen.getByLabelText("非公式ガイドに関する注記")).toBeInTheDocument();
  });

  it("names the book, author and publisher", () => {
    const { container } = render(<UnofficialBookNotice {...props} />);
    expect(container.textContent).toContain("『Example Book』");
    expect(container.textContent).toContain("Jane Doe");
    expect(container.textContent).toContain("Example Press");
  });

  it("states it is unofficial, unaffiliated, and recommends the original", () => {
    const { container } = render(<UnofficialBookNotice {...props} />);
    expect(container.textContent).toContain("非公式の学習ノート");
    expect(container.textContent).toContain("提携・承認関係はありません");
    expect(container.textContent).toContain("原著をお読みください");
  });
});

describe("published book guides", () => {
  it.each([
    "building-applications-with-ai-agents-guide",
    "building-llm-powered-applications-guide",
    "graph-databases-guide",
  ])("%s renders UnofficialBookNotice", (slug) => {
    const page = readFileSync(
      join(process.cwd(), "app/recommended-books", slug, "page.tsx"),
      "utf8"
    );
    expect(page).toContain("<UnofficialBookNotice");
  });
});
