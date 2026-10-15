import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DIAGRAMS } from "./diagrams";
import { normalizeChart, SOURCE_DIAGRAMS, source } from "./source-contract";

const { draw, run } = vi.hoisted(() => ({
  draw: vi.fn(async (id: string, chart: string) => ({
    svg: `<svg id="${id}" width="400" height="200" viewBox="0 0 400 200"><text>${chart.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</text></svg>`,
  })),
  run: vi.fn(),
}));
vi.mock("mermaid", () => ({ default: { initialize: vi.fn(), render: draw, run } }));

import Page from "./page";

// 原本の B2 はランドマーク移動とキーボード操作を混同しているため、移植側で訂正する。
const SEMANTIC_B2_SOURCE = 'B2["キーボードナビゲーションが<br/>自動で機能する"]';
const SEMANTIC_B2_CORRECTED =
  'B2["header・nav・main・footer の<br/>ランドマークで支援技術が<br/>領域間を直接移動できる<br/>(キーボード操作は button・a 等の<br/>ネイティブ操作要素が担う)"]';

describe("all sixteen guide diagrams", () => {
  it("keeps every diagram matched to its source ID, normalized labels and connections", () => {
    const ids = Array.from(source.querySelectorAll(".mermaid"), (e) => e.id);
    expect(Object.keys(DIAGRAMS)).toEqual(ids);
    for (const id of ids) {
      const chart =
        id === "d-state-machine"
          ? DIAGRAMS[id]
              .replace('state "Default" as DefaultState\n', "")
              .replaceAll("DefaultState", "Default")
          : DIAGRAMS[id];
      const expected = normalizeChart(SOURCE_DIAGRAMS[id]);
      expect(chart).toBe(
        id === "d-semantic" ? expected.replace(SEMANTIC_B2_SOURCE, SEMANTIC_B2_CORRECTED) : expected
      );
    }
  });
  it("separates landmark navigation from native keyboard operation in the semantic diagram", () => {
    expect(normalizeChart(SOURCE_DIAGRAMS["d-semantic"])).toContain(SEMANTIC_B2_SOURCE);
    expect(DIAGRAMS["d-semantic"]).toContain(SEMANTIC_B2_CORRECTED);
    expect(DIAGRAMS["d-semantic"]).not.toContain("自動で機能する");
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
      expect(svg.getAttribute("viewBox")).toBe(
        element.id === "d-state-machine" ? "0 0 400 310" : "0 0 400 215"
      );
    }
    const before = Array.from(container.querySelectorAll(".mermaid svg"));
    rerender(<Page />);
    expect(Array.from(container.querySelectorAll(".mermaid svg"))).toEqual(before);
    expect(draw).toHaveBeenCalledTimes(16);
    expect(new Set(draw.mock.calls.map(([id]) => id)).size).toBe(16);
    expect(run).not.toHaveBeenCalled();
  });
});
