import { fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

const { renderDiagram, runDiagram, initializeDiagram } = vi.hoisted(() => ({
  renderDiagram: vi.fn(async (id: string, chart: string) => ({
    svg: `<svg id="${id}" width="480" height="200" viewBox="0 0 480 200"><text>${chart.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</text></svg>`,
  })),
  runDiagram: vi.fn(),
  initializeDiagram: vi.fn(),
}));
vi.mock("mermaid", () => ({
  default: { render: renderDiagram, run: runDiagram, initialize: initializeDiagram },
}));

import Page from "./page";

afterEach(() => vi.restoreAllMocks());

it("renders only selected diagrams, keeps each chart separate and survives rapid navigation and revisits", async () => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  const { container, getByRole } = render(<Page />);
  expect(container.querySelectorAll(".mermaid")).toHaveLength(0);
  expect(renderDiagram).not.toHaveBeenCalled();

  fireEvent.click(getByRole("button", { name: "試験概要" }));
  await waitFor(() => expect(container.querySelectorAll(".mermaid svg")).toHaveLength(2));
  const first = container.querySelector("#diag-1") as Element;
  const second = container.querySelector("#diag-2") as Element;
  expect(first.textContent).toContain("TOGAF 認定資格体系");
  expect(first.textContent).not.toContain("シナリオ問題");
  expect(second.textContent).toContain("シナリオ問題");
  expect(second.textContent).not.toContain("TOGAF 認定資格体系");
  for (const svg of container.querySelectorAll<SVGSVGElement>(".mermaid svg")) {
    expect(svg.hasAttribute("width")).toBe(false);
    expect(svg.hasAttribute("height")).toBe(false);
    expect(svg.style.width).toBe("480px");
    expect(svg.style.minWidth).toBe("480px");
    expect(svg.getAttribute("viewBox")).toBe("0 0 480 215");
  }

  fireEvent.click(getByRole("button", { name: "ADM サイクル" }));
  fireEvent.click(getByRole("button", { name: "各フェーズ詳解" }));
  fireEvent.click(getByRole("button", { name: "TOGAFとは" }));
  expect(container.querySelectorAll(".mermaid")).toHaveLength(0);
  fireEvent.click(getByRole("button", { name: "試験概要" }));
  await waitFor(() => expect(container.querySelectorAll(".mermaid svg")).toHaveLength(2));
  expect(container.querySelector("#diag-1")?.textContent).toContain("TOGAF 認定資格体系");
  expect(container.querySelector("#diag-2")?.textContent).toContain("シナリオ問題");
  expect(container.querySelectorAll(".section")).toHaveLength(1);
  const ids = renderDiagram.mock.calls.map(([id]) => id);
  expect(new Set(ids).size).toBe(ids.length);
  expect(runDiagram).not.toHaveBeenCalled();
  expect(initializeDiagram).toHaveBeenCalledTimes(1);
});
