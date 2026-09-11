// [Red] 整合テスト。索引画面のカタログ (lib/guide-catalog.ts) とグローバルナビ
// (components/site/nav-links.ts) は別ファイルだが、扱うページ集合は同一でなければ
// ならない。片方にだけページを足す「ドリフト」をここで検出する。

import { describe, expect, it } from "vitest";
import { type NavLink, navLinks } from "@/components/site/nav-links";
import { guideCatalog } from "@/lib/guide-catalog";

function navHrefs(links: readonly NavLink[]): string[] {
  return links.flatMap((link) =>
    "children" in link ? link.children.map((c) => c.href) : [link.href]
  );
}

describe("guideCatalog / navLinks consistency", () => {
  it("covers exactly the same set of hrefs", () => {
    const fromNav = [...new Set(navHrefs(navLinks))].sort();
    const fromCatalog = [
      ...new Set(guideCatalog.flatMap((c) => c.entries.map((e) => e.href))),
    ].sort();
    expect(fromCatalog).toEqual(fromNav);
  });

  it("groups guides into the same number of categories as nav dropdowns", () => {
    const dropdowns = navLinks.filter((link) => "children" in link);
    expect(guideCatalog.length).toBe(dropdowns.length);
  });
});
