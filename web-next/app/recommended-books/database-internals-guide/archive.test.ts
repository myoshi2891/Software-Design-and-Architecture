import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const originalBase = "Database-internals-guide";
const category = "recommended-books";
const slug = "database-internals-guide";

const hashes = {
  html: "0477246abe1a06a5d6009b98ab0f53f105d047ef9b259cd2ae9163a91ab224c7",
  md: "c2e0669d97d8effd520f6b458c5393bf3edfbd0902a667f605fc7c22ff770638",
};

describe("Database Internals source archival", () => {
  for (const extension of ["html", "md"] as const) {
    it(`moves the original ${extension} without changing a byte`, () => {
      const archived = resolve(
        process.cwd(),
        "..",
        "archive",
        category,
        slug,
        `${originalBase}.${extension}`
      );
      const rootOriginal = resolve(process.cwd(), "..", `${originalBase}.${extension}`);

      expect(existsSync(archived)).toBe(true);
      expect(existsSync(rootOriginal)).toBe(false);
      expect(createHash("sha256").update(readFileSync(archived)).digest("hex")).toBe(
        hashes[extension]
      );
    });
  }

  for (const file of ["README.md", "GEMINI.md"]) {
    it(`documents the migrated route and archive in ${file}`, () => {
      const text = readFileSync(resolve(process.cwd(), "..", file), "utf8");
      expect(text).toContain(`/${category}/${slug}`);
      expect(text).toContain(`archive/${category}/${slug}/`);
    });
  }
});
