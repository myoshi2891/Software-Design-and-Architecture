import { fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { normalizeChart, SOURCE_DIAGRAMS } from "./source-contract";

const { renderDiagram, runDiagram, initializeDiagram } = vi.hoisted(() => ({
  renderDiagram: vi.fn(async (id: string, chart: string) => {
    const width = chart.startsWith("mindmap") ? 880 : 400;
    const text = chart.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    return {
      svg: `<svg id="${id}" width="${width}" height="200" viewBox="0 0 ${width} 200"><text>${text}</text></svg>`,
    };
  }),
  runDiagram: vi.fn(),
  initializeDiagram: vi.fn(),
}));
vi.mock("mermaid", () => ({
  default: { render: renderDiagram, run: runDiagram, initialize: initializeDiagram },
}));

import Page from "./page";

afterEach(() => vi.restoreAllMocks());

it("renders all thirteen separate diagrams at natural scale and keeps them stable during progress updates", async () => {
  vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
  vi.spyOn(window, "innerHeight", "get").mockReturnValue(1000);
  const scrollY = vi.spyOn(window, "scrollY", "get").mockReturnValue(0);
  const { container } = render(<Page />);
  await waitFor(() =>
    expect(container.querySelectorAll(".mermaid[data-diagram] svg")).toHaveLength(13)
  );
  for (const element of container.querySelectorAll(".mermaid[data-diagram]")) {
    const key = element.getAttribute("data-diagram") ?? "";
    expect(element.textContent).toBe(normalizeChart(SOURCE_DIAGRAMS[key]));
    const svg = element.querySelector("svg") as SVGSVGElement;
    const width = key === "learning_path" ? "880px" : "400px";
    expect(svg.style.width).toBe(width);
    expect(svg.style.minWidth).toBe(width);
    expect(svg.hasAttribute("width")).toBe(false);
    expect(svg.hasAttribute("height")).toBe(false);
  }
  const beforeScroll = Array.from(container.querySelectorAll(".mermaid[data-diagram] svg"));
  scrollY.mockReturnValue(2000);
  fireEvent.scroll(window);
  expect(container.querySelector("#progress-label")).toHaveTextContent("読書進捗: 50%");
  expect(Array.from(container.querySelectorAll(".mermaid[data-diagram] svg"))).toEqual(
    beforeScroll
  );
  expect(renderDiagram).toHaveBeenCalledTimes(13);
  expect(new Set(renderDiagram.mock.calls.map(([id]) => id)).size).toBe(13);
  expect(initializeDiagram).toHaveBeenCalledTimes(1);
  expect(runDiagram).not.toHaveBeenCalled();
});
