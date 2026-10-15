import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, it } from "vitest";

for (const file of ["README.md", "GEMINI.md"]) {
  it(`documents route and archive in ${file}`, () => {
    const text = readFileSync(resolve(process.cwd(), "..", file), "utf8");
    expect(text).toContain("/css-design-system-guide/grid-bem-responsive-a11y-systems");
    expect(text).toContain("archive/css-design-system-guide/grid-bem-responsive-a11y-systems/");
  });
}
