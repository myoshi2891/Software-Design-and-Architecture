import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const relative =
  "product-and-enterprise/togaf-certification-comprehensive-guide/togaf-certification-comprehensive-guide";
const hashes = {
  html: "7d0bd868868d35fe55c89f79f39169d1bb677fa727313de131a480eb3c7c9253",
  md: "7d3fa6acc0fa65b5faccac9e7444dc2f380fb00a881f19ecfebc7fdaa485990b",
};
describe("TOGAF source archival", () => {
  for (const ext of ["html", "md"] as const) {
    it(`moves the original ${ext} without changing a byte`, () => {
      const archive = resolve(process.cwd(), "..", "archive", `${relative}.${ext}`);
      expect(existsSync(archive)).toBe(true);
      expect(existsSync(resolve(process.cwd(), "..", `${relative}.${ext}`))).toBe(false);
      expect(createHash("sha256").update(readFileSync(archive)).digest("hex")).toBe(hashes[ext]);
    });
  }
  for (const file of ["README.md", "GEMINI.md"]) {
    it(`documents the migrated TOGAF route in ${file}`, () => {
      const text = readFileSync(resolve(process.cwd(), "..", file), "utf8");
      expect(text).toContain("/product-and-enterprise/togaf-certification-comprehensive-guide");
      expect(text).toContain(
        "archive/product-and-enterprise/togaf-certification-comprehensive-guide/"
      );
    });
  }
});
