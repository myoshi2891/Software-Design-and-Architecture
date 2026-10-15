import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { normalizeChart, SOURCE_DIAGRAMS, source } from "./source-contract";
import { DIAGRAMS } from "./diagrams";
const { draw, run } = vi.hoisted(() => ({
  draw: vi.fn(async (id: string, chart: string) => ({svg: `<svg id="${id}" width="400" height="200" viewBox="0 0 400 200"><text>${chart.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</text></svg>`})),
  run: vi.fn(),
}));
vi.mock("mermaid", () => ({ default: { initialize: vi.fn(), render: draw, run } }));
import Page from "./page";
describe("all sixteen guide diagrams", () => {
  it("keeps every diagram matched to its source ID, normalized labels and connections", () => {
    const ids = Array.from(source.querySelectorAll(".mermaid"), e => e.id);
    expect(Object.keys(DIAGRAMS)).toEqual(ids);
    for (const id of ids) expect(DIAGRAMS[id]).toBe(normalizeChart(SOURCE_DIAGRAMS[id]));
  });
  it("renders sixteen independent SVGs with natural scale, unique IDs and no run API", async () => {
    const { container, rerender } = render(<Page />);
    await waitFor(() => expect(container.querySelectorAll(".mbox .mermaid svg")).toHaveLength(16));
    for (const element of container.querySelectorAll(".mbox .mermaid")) {
      expect(element.textContent).toBe(DIAGRAMS[element.id]);
      const svg = element.querySelector("svg") as SVGSVGElement;
      expect(svg.style.width).toBe("400px");
      expect(svg.style.minWidth).toBe("400px");
      expect(svg.hasAttribute("width")).toBe(false);
      expect(svg.hasAttribute("height")).toBe(false);
      expect(svg.style.overflow).toBe("visible");
      expect(svg.getAttribute("viewBox")).toBe(element.id === "d-state-machine" ? "0 0 400 310" : "0 0 400 215");
    }
    const before = Array.from(container.querySelectorAll(".mermaid svg"));
    rerender(<Page />);
    expect(Array.from(container.querySelectorAll(".mermaid svg"))).toEqual(before);
    expect(draw).toHaveBeenCalledTimes(16);
    expect(new Set(draw.mock.calls.map(([id]) => id)).size).toBe(16);
    expect(run).not.toHaveBeenCalled();
  });
});
