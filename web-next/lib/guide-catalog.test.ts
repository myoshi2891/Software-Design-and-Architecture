// [Red] 契約テスト (guide-catalog)。lib/guide-catalog.ts を実装するまで失敗する。
//
// 固定する契約:
// - guideCatalog は 5 カテゴリ、合計 22 エントリ。
// - published が 14 件、planned が 8 件。
// - href はすべて "/" 始まりの絶対パスで、重複しない。
// - name / summary は非空（索引画面がこの 2 つで行を組み立てるため）。

import { describe, expect, it } from "vitest";
import { type GuideEntry, guideCatalog } from "@/lib/guide-catalog";

function allEntries(): readonly GuideEntry[] {
  return guideCatalog.flatMap((category) => category.entries);
}

describe("guideCatalog structure", () => {
  it("defines 5 categories", () => {
    expect(guideCatalog.length).toBe(5);
  });

  it("holds 22 guides in total", () => {
    expect(allEntries().length).toBe(22);
  });

  it("splits into 14 published and 8 planned guides", () => {
    const entries = allEntries();
    expect(entries.filter((e) => e.status === "published").length).toBe(14);
    expect(entries.filter((e) => e.status === "planned").length).toBe(8);
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
    const ids = guideCatalog.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("files the general comprehensive guide under architecture", () => {
    const architecture = guideCatalog.find((c) => c.id === "architecture");
    expect(architecture).toBeDefined();
    expect(architecture?.entries.map((e) => e.href)).toContain("/general/comprehensive-guide");
  });
});
