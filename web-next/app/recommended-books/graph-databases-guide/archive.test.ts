import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const originalBase = "Graph-databases-guide";
const category = "recommended-books";
const slug = "graph-databases-guide";

const hashes = {
  html: "433cd1d5eee78722717b4694ced4ac22bf5d993d9d775d2bd5297a2153010994",
  md: "3ae3f2916e4e1b409c673d2c70085afe882f0a6a4c6bf292ecab4b7462d500d8",
};

describe("Graph Databases source archival", () => {
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
