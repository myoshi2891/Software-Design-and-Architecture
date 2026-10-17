// [Red] 契約テスト (guide-visibility)。
//
// 著作権リスクのため公開デプロイから除外する書籍ガイド（localOnly）は、
// ソースを git 追跡外に置きローカルでのみ閲覧する。索引とナビは
// NEXT_PUBLIC_INCLUDE_LOCAL_GUIDES=1 のときだけ localOnly を含める。
//
// 固定する契約:
// - 全件定義 (allGuideCatalog / allNavLinks) は 36 件で、うち localOnly は 9 件。
// - フラグ無しの公開版 (guideCatalog / navLinks) は 27 件で localOnly を含まない。
// - フィルタ関数はフラグ有りで全件を返す。
// - 判定は "1" のみ有効（"true" や空文字は無効）。

import { describe, expect, it } from "vitest";
import { allNavLinks, type NavLink, navLinks } from "@/components/site/nav-links";
import { allGuideCatalog, type GuideCategory, guideCatalog } from "@/lib/guide-catalog";
import {
  filterCatalog,
  filterNavLinks,
  isLocalGuidesEnabled,
  localOnlyHrefs,
} from "@/lib/guide-visibility";

const EXCLUDED_SLUGS = [
  "sql-antipatterns-guide",
  "generative-ai-design-patterns-guide",
  "database-design-for-mere-mortals-guide",
  "architecting-generative-ai-applications-guide",
  "data-warehouse-toolkit-guide",
  "database-internals-guide",
  "high-performance-mysql-guide",
  "nosql-distilled-guide",
  "refactoring-databases-guide",
].map((slug) => `/recommended-books/${slug}`);

const catalogHrefs = (catalog: readonly GuideCategory[]) =>
  catalog.flatMap((c) => c.entries.map((e) => e.href));

const navHrefs = (links: readonly NavLink[]) =>
  links.flatMap((link) => ("children" in link ? link.children.map((c) => c.href) : [link.href]));

describe("isLocalGuidesEnabled", () => {
  it("accepts only the exact value '1'", () => {
    expect(isLocalGuidesEnabled("1")).toBe(true);
    expect(isLocalGuidesEnabled("true")).toBe(false);
    expect(isLocalGuidesEnabled("")).toBe(false);
    expect(isLocalGuidesEnabled(undefined)).toBe(false);
  });
});

describe("localOnlyHrefs", () => {
  it("marks exactly the 9 excluded book guides", () => {
    expect([...localOnlyHrefs(allGuideCatalog)].sort()).toEqual([...EXCLUDED_SLUGS].sort());
  });
});

describe("filterCatalog", () => {
  it("drops localOnly entries when disabled", () => {
    const hrefs = catalogHrefs(filterCatalog(allGuideCatalog, false));
    expect(hrefs.length).toBe(27);
    for (const href of EXCLUDED_SLUGS) expect(hrefs).not.toContain(href);
  });

  it("keeps every entry when enabled", () => {
    expect(catalogHrefs(filterCatalog(allGuideCatalog, true)).length).toBe(36);
  });
});

describe("filterNavLinks", () => {
  it("drops localOnly links when disabled", () => {
    const hrefs = navHrefs(filterNavLinks(allNavLinks, false));
    expect(hrefs.length).toBe(27);
    for (const href of EXCLUDED_SLUGS) expect(hrefs).not.toContain(href);
  });

  it("keeps every link when enabled", () => {
    expect(navHrefs(filterNavLinks(allNavLinks, true)).length).toBe(36);
  });

  it("removes a dropdown that loses all children", () => {
    const links: readonly NavLink[] = [
      { name: "空", children: [{ name: "x", href: EXCLUDED_SLUGS[0] ?? "" }] },
      { name: "残", children: [{ name: "y", href: "/general/comprehensive-guide" }] },
    ];
    expect(filterNavLinks(links, false).map((l) => l.name)).toEqual(["残"]);
  });
});

describe("public exports (flag unset in tests)", () => {
  it("exclude localOnly guides from guideCatalog and navLinks", () => {
    expect(catalogHrefs(guideCatalog).length).toBe(27);
    expect(navHrefs(navLinks).length).toBe(27);
    for (const href of EXCLUDED_SLUGS) {
      expect(catalogHrefs(guideCatalog)).not.toContain(href);
      expect(navHrefs(navLinks)).not.toContain(href);
    }
  });
});
