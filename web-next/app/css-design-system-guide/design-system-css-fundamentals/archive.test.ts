import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const slug = "design-system-css-fundamentals";
const hashes = {
  html: "ca44a8d8293011a143e044698318ec388bf427bcb273a1c77b4ceb3b60bd14c7",
  md: "66720d65579e2cee6550cbc75fb572c731e9e3288a14f1c5a70d0d53895589d1",
};
describe("CSS fundamentals archival", () => {
  for (const extension of ["html", "md"] as const) {
    it(`moves the original ${extension} without changing a byte`, () => {
      const archived = resolve(
        process.cwd(),
        "..",
        "archive",
        "css-design-system-guide",
        slug,
        `${slug}.${extension}`
      );
      expect(existsSync(archived)).toBe(true);
      expect(
        existsSync(resolve(process.cwd(), "..", "css-design-system-guide", `${slug}.${extension}`))
      ).toBe(false);
      expect(createHash("sha256").update(readFileSync(archived)).digest("hex")).toBe(
        hashes[extension]
      );
    });
  }
  for (const file of ["README.md", "GEMINI.md"]) {
    it(`documents the migrated route and archive in ${file}`, () => {
      const text = readFileSync(resolve(process.cwd(), "..", file), "utf8");
      expect(text).toContain("/css-design-system-guide/design-system-css-fundamentals");
      expect(text).toContain("archive/css-design-system-guide/design-system-css-fundamentals/");
    });
  }
});
