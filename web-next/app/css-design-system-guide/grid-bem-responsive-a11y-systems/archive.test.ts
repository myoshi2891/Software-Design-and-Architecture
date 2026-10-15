import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, it } from "vitest";

const slug = "grid-bem-responsive-a11y-systems";
const hashes = {
  html: "6dcb1b9177453a2c7102eff5c06a630df3dd12f43096904a46c988c88599e5f2",
  md: "84a886cb288eada40dc49b5f4542bf55a8fd802e942108edf07ece0201bb1c72",
};
for (const extension of ["html", "md"] as const) {
  it(`archives original ${extension} byte for byte and removes the old location`, () => {
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
