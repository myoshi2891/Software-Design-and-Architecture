import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const relative =
  "product-and-enterprise/minimum-viable-product-comprehensive-guide/minimum-viable-product-comprehensive-guide";
const hashes = {
  html: "0b7369b0df6fb55d6492a9a0575a761f989a977d46c67a1ccecefacdfd515262",
  md: "72e6cc067faa5074464aa4011e39f0fd8dfff2fa6d043a2bb26f2b6c1a52ed3f",
};
describe("MVP source archival", () => {
  for (const ext of ["html", "md"] as const) {
    it(`moves the original ${ext} without changing a byte`, () => {
      const archive = resolve(process.cwd(), "..", "archive", `${relative}.${ext}`);
      expect(existsSync(archive)).toBe(true);
      expect(existsSync(resolve(process.cwd(), "..", `${relative}.${ext}`))).toBe(false);
      expect(createHash("sha256").update(readFileSync(archive)).digest("hex")).toBe(hashes[ext]);
    });
  }
  for (const file of ["README.md", "GEMINI.md"]) {
    it(`documents the migrated MVP route in ${file}`, () => {
      const text = readFileSync(resolve(process.cwd(), "..", file), "utf8");
      expect(text).toContain("/product-and-enterprise/minimum-viable-product-comprehensive-guide");
      expect(text).toContain(
        "archive/product-and-enterprise/minimum-viable-product-comprehensive-guide/"
      );
    });
  }
});
