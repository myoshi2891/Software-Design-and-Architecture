import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const originalBase = "Refactoring-databases-guide";
const category = "recommended-books";
const slug = "refactoring-databases-guide";

const hashes = {
  html: "036bfe0450dd3b4c2e6769201638e5722242235d2ea7f3e8d9bf2ec783f16fe6",
  md: "1e1ea1814043802ab4c1e51cb1178ee83d2cccf260444e47e34bbd40dcb69eec",
};

describe("Refactoring Databases source archival", () => {
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
