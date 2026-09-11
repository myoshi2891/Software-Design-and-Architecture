// [Red] 契約テスト (ルート索引画面)。旧実装は /general/comprehensive-guide への
// redirect だったが、ルートは全ガイドへ遷移できる索引画面になった。
//
// 固定する契約:
// - リダイレクトしない。
// - カテゴリ見出し (h2) が 5 個。
// - 公開済み 14 本がリンクとして出る。未移行 8 本はリンクにしない。
// - 内部リンクはすべて "/" 始まりで ".html" を含まない。

import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { guideCatalog } from "@/lib/guide-catalog";
import HomePage from "./page";

const redirectMock = vi.fn();
vi.mock("next/navigation", () => ({
  redirect: (...args: unknown[]) => redirectMock(...args),
}));

function renderIndex() {
  return render(<HomePage />).container;
}

describe("HomePage (guide index)", () => {
  it("does not redirect", () => {
    renderIndex();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("renders a single h1", () => {
    const container = renderIndex();
    expect(container.querySelectorAll("h1").length).toBe(1);
  });

  it("renders one h2 per category", () => {
    const container = renderIndex();
    expect(container.querySelectorAll("h2").length).toBe(guideCatalog.length);
  });

  it("links every published guide exactly once", () => {
    const container = renderIndex();
    const published = guideCatalog
      .flatMap((c) => c.entries)
      .filter((e) => e.status === "published");
    const hrefs = [...container.querySelectorAll<HTMLAnchorElement>("a[href^='/']")].map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs.length).toBe(published.length);
    for (const entry of published) {
      expect(hrefs).toContain(entry.href);
    }
  });

  it("does not link planned guides", () => {
    const container = renderIndex();
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    const planned = guideCatalog.flatMap((c) => c.entries).filter((e) => e.status === "planned");
    expect(planned.length).toBe(8);
    for (const entry of planned) {
      expect(hrefs).not.toContain(entry.href);
    }
  });

  it("marks planned rows with a visible status note", () => {
    const container = renderIndex();
    expect(container.querySelectorAll(".guide-row.is-planned").length).toBe(8);
    for (const row of container.querySelectorAll(".guide-row.is-planned")) {
      expect(row.textContent).toContain("準備中");
    }
  });

  it("keeps every internal link free of .html", () => {
    const container = renderIndex();
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("/")) expect(href).not.toContain(".html");
    }
  });

  it("shows the guide counts", () => {
    const container = renderIndex();
    const text = container.textContent ?? "";
    expect(text).toContain("22");
    expect(text).toContain("14");
    expect(text).toContain("8");
  });
});
