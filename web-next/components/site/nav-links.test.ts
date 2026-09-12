// [Red] 契約テスト (nav-links)。Green フェーズで components/site/nav-links.ts
// を実装するまで失敗する想定。zod を使わないプレーン TS 型でナビ定義を固定する。

/**
 * 固定する契約:
 * - navLinks は 5 要素（すべて dropdown。最上位の leaf は持たない）。
 * - dropdown 要素は children を持ち、leaf 要素は href を持つ。
 * - すべての href / children.href は "/" 始まりの絶対パス。
 * - 総合リファレンスは「アーキテクチャ」ドロップダウンの先頭に属する
 *   （ルート "/" が索引画面になったため、Home leaf は廃止）。
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
  it("defines 5 top-level entries", () => {
    expect(navLinks.length).toBe(5);
  });

  it("contains only dropdown groups at the top level", () => {
    const dropdowns = navLinks.filter(isDropdown);
    expect(dropdowns.length).toBe(5);
    expect(dropdowns.length).toBe(navLinks.length);
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

  it("lists the comprehensive reference first under アーキテクチャ", () => {
    const architecture = navLinks.filter(isDropdown).find((d) => d.name === "アーキテクチャ");
    expect(architecture).toBeDefined();
    expect(architecture?.children.length).toBe(7);
    expect(architecture?.children[0]?.href).toBe("/general/comprehensive-guide");
  });
});
