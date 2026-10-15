import mermaid from "mermaid";
import { expect, it } from "vitest";
import { DIAGRAMS } from "./diagrams";
mermaid.initialize({ startOnLoad: false, theme: "dark" });
it("parses exactly sixteen real Mermaid charts without mocks", async () => {
  expect(Object.keys(DIAGRAMS)).toHaveLength(16);
  for (const [id, chart] of Object.entries(DIAGRAMS)) {
    expect(chart.split("\n").every(line => line === line.trim()), id).toBe(true);
    await expect(mermaid.parse(chart)).resolves.toBeTruthy();
  }
});
