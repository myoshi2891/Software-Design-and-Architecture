import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const originalBase = "Database-design-for-mere-mortals-guide";
const category = "recommended-books";
const slug = "database-design-for-mere-mortals-guide";

const hashes = {
  html: "49acff24b3f886edabfc43b68a21ffbbc95f29fd8bbff027b067851371dbaa48",
  md: "690714f93dae5cf0da218eaa76176dfe77c41346d1f9642a0ee2df4a99da7748",
};

describe("Database Design for Mere Mortals source archival", () => {
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
