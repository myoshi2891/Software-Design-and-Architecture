// [Red] 契約テスト (guide-catalog)。lib/guide-catalog.ts を実装するまで失敗する。
//
// 固定する契約:
// - allGuideCatalog は 7 カテゴリ、合計 36 エントリ。
// - published が 36 件、planned が 0 件。
// - href はすべて "/" 始まりの絶対パスで、重複しない。
// - name / summary は非空（索引画面がこの 2 つで行を組み立てるため）。

import { describe, expect, it } from "vitest";
import { allGuideCatalog, type GuideEntry } from "@/lib/guide-catalog";

function allEntries(): readonly GuideEntry[] {
  return allGuideCatalog.flatMap((category) => category.entries);
}

describe("allGuideCatalog structure", () => {
  it("defines 7 categories", () => {
    expect(allGuideCatalog.length).toBe(7);
  });

  it("holds 36 guides in total", () => {
    expect(allEntries().length).toBe(36);
  });

  it("splits into 36 published and 0 planned guides", () => {
    const entries = allEntries();
    expect(entries.filter((e) => e.status === "published").length).toBe(36);
    expect(entries.filter((e) => e.status === "planned").length).toBe(0);
  });

  it("uses only the two known status values", () => {
    for (const entry of allEntries()) {
      expect(["published", "planned"]).toContain(entry.status);
    }
  });

  it("gives every entry a non-empty name and summary", () => {
    for (const entry of allEntries()) {
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.summary.length).toBeGreaterThan(0);
    }
  });

  it("uses absolute paths for every href", () => {
    for (const entry of allEntries()) {
      expect(entry.href.startsWith("/")).toBe(true);
      expect(entry.href.startsWith("//")).toBe(false);
      expect(entry.href).not.toContain(".html");
    }
  });

  it("never repeats an href", () => {
    const hrefs = allEntries().map((e) => e.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("never repeats a category id", () => {
    const ids = allGuideCatalog.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("files the general comprehensive guide under architecture", () => {
    const architecture = allGuideCatalog.find((c) => c.id === "architecture");
    expect(architecture).toBeDefined();
    expect(architecture?.entries.map((e) => e.href)).toContain("/general/comprehensive-guide");
  });
});

it("publishes the MVP guide under product-and-enterprise", () => {
  const category = allGuideCatalog.find((entry) => entry.id === "product-and-enterprise");
  expect(
    category?.entries.find(
      (entry) => entry.href === "/product-and-enterprise/minimum-viable-product-comprehensive-guide"
    )?.status
  ).toBe("published");
});

it("publishes the TOGAF guide under product-and-enterprise", () => {
  const category = allGuideCatalog.find((entry) => entry.id === "product-and-enterprise");
  expect(
    category?.entries.find(
      (entry) => entry.href === "/product-and-enterprise/togaf-certification-comprehensive-guide"
    )?.status
  ).toBe("published");
});

it("publishes CSS fundamentals under CSS design systems", () => {
  const category = allGuideCatalog.find((entry) => entry.id === "css-design-system-guide");
  expect(
    category?.entries.find(
      (entry) => entry.href === "/css-design-system-guide/design-system-css-fundamentals"
    )?.status
  ).toBe("published");
});
