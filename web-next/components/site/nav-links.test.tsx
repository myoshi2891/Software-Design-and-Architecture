// [Red] 契約テスト (nav-links)。Green フェーズで components/site/nav-links.ts
// を実装するまで失敗する想定。zod を使わないプレーン TS 型でナビ定義を固定する。

/**
 * 固定する契約:
 * - navLinks は 7 要素（Home leaf / dropdown 5 / 総合ガイド leaf）。
 * - dropdown 要素は children を持ち、leaf 要素は href を持つ。
 * - すべての href / children.href は "/" 始まりの絶対パス。
 * - 移行済みページ（event-driven / general comprehensive-guide）を含む。
 */

import { describe, expect, it } from "vitest";
import { type NavLink, navLinks } from "@/components/site/nav-links";

function isDropdown(link: NavLink): link is Extract<NavLink, { children: unknown }> {
  return "children" in link;
}

function collectHrefs(links: readonly NavLink[]): string[] {
  const hrefs: string[] = [];
  for (const link of links) {
    if (isDropdown(link)) {
      for (const child of link.children) hrefs.push(child.href);
    } else {
      hrefs.push(link.href);
    }
  }
  return hrefs;
}

describe("nav-links structure", () => {
  it("defines 7 top-level entries", () => {
    expect(navLinks.length).toBe(7);
  });

  it("contains exactly 5 dropdown groups", () => {
    const dropdowns = navLinks.filter(isDropdown);
    expect(dropdowns.length).toBe(5);
  });

  it("every dropdown has at least one child", () => {
    for (const link of navLinks.filter(isDropdown)) {
      expect(link.children.length).toBeGreaterThan(0);
    }
  });

  it("every href is an absolute path starting with /", () => {
    for (const href of collectHrefs(navLinks)) {
      expect(href.startsWith("/")).toBe(true);
      expect(href.startsWith("//")).toBe(false);
    }
  });

  it("includes the migrated guide routes", () => {
    const hrefs = collectHrefs(navLinks);
    expect(hrefs).toContain("/architecture/event-driven-architecture-comprehensive-guide");
    expect(hrefs).toContain("/general/comprehensive-guide");
  });
});
