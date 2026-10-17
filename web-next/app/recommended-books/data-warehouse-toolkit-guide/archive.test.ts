import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const originalBase = "Data-warehouse-toolkit-guide";
const category = "recommended-books";
const slug = "data-warehouse-toolkit-guide";

const hashes = {
  html: "ccd1e53a764c43506073259497d961ff5a1c08efeb16d33f1b9728ab6cc5ff84",
  md: "2f2541165e40512e6bbd28394ac2168d03cff8f6240ab798d6088acdd07934be",
};

describe("Data Warehouse Toolkit source archival", () => {
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
