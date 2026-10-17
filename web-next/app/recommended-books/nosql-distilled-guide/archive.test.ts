import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const originalBase = "Nosql-distilled-guide";
const category = "recommended-books";
const slug = "nosql-distilled-guide";

const hashes = {
  html: "bf523918cfd6953922d805766a9b28fde7d1a870e55fd3f8d4741aaafba0a40b",
  md: "767e81ba382dab44ccd55e69d0d6b782c1884bda9a5ec78b8aa0ab3b62946f93",
};

describe("NoSQL Distilled source archival", () => {
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
