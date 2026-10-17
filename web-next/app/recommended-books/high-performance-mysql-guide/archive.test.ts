import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const originalBase = "High-performance-mysql-guide";
const category = "recommended-books";
const slug = "high-performance-mysql-guide";

const hashes = {
  html: "f42b5184547b20b500a39c340263b455ca2028840163c9fa99bd65734c1ae3b1",
  md: "d22a7e0e7098492b3079fe117831a5d5b77c7a2934e720446f3050c34ac5c2d9",
};

describe("High Performance MySQL source archival", () => {
  for (const extension of ["html", "md"] as const) {
    it(`moves the original ${extension} without changing a byte`, ({ skip }) => {
      const archived = resolve(
        process.cwd(),
        "..",
        "archive",
        category,
        slug,
        `${originalBase}.${extension}`
      );
      const rootOriginal = resolve(process.cwd(), "..", `${originalBase}.${extension}`);

      expect(existsSync(rootOriginal)).toBe(false);

      // archive/ は .gitignore 対象でローカルにのみ存在するため、原本がない環境では照合を省略する
      skip(!existsSync(archived), "local archive/ not found");
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
