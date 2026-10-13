import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { assertFaithful, compact, source } from "./source-contract";

vi.mock("@/components/MermaidDiagram", () => ({
  default: ({
    chart,
    id,
    preserveNaturalScale,
  }: {
    chart: string;
    id?: string;
    preserveNaturalScale?: boolean;
  }) => (
    <div
      id={id}
      data-testid="mermaid-diagram"
      data-chart={chart}
      data-natural-scale={String(preserveNaturalScale)}
    />
  ),
}));

import Page, { metadata } from "./page";

afterEach(() => vi.restoreAllMocks());

describe("TOGAF foundation", () => {
  it("preserves the sidebar logo, group labels, buttons and icons", () => {
    const { container } = render(<Page />);
    const nav = container.querySelector(".sidebar");
    const original = source.querySelector(".sidebar") as Element;
    expect(compact(nav?.textContent ?? "")).toBe(compact(original.textContent));
    expect(Array.from(nav?.querySelectorAll(".nav-label") ?? [], (el) => el.textContent)).toEqual(
      Array.from(original.querySelectorAll(".nav-label"), (el) => el.textContent)
    );
    expect(
      Array.from(nav?.querySelectorAll("button") ?? [], (el) => compact(el.textContent))
    ).toEqual(Array.from(original.querySelectorAll("button"), (el) => compact(el.textContent)));
    expect(nav?.querySelectorAll("button")).toHaveLength(12);
    expect(nav?.querySelectorAll("svg.tabler-icon")).toHaveLength(12);
    expect(container.querySelector("button.active")).toHaveTextContent("TOGAFとは");
  });
  it("provides route metadata and keeps the content on the server", () => {
    expect(metadata.title).toBe(source.title);
    expect(compact(metadata.description as string)).toBe(
      compact(source.querySelector(".hero p")?.textContent ?? "")
    );
    const { container } = render(<Page />);
    expect(
      container.querySelector(".togaf-certification-comprehensive-guide .shell > main.main")
    ).not.toBeNull();
    expect(
      readFileSync(
        resolve(
          process.cwd(),
          "app/product-and-enterprise/togaf-certification-comprehensive-guide/page.tsx"
        ),
        "utf8"
      )
    ).not.toMatch(/^["']use client["']/);
    expect(container.querySelectorAll("script, link, i.ti, [onclick]")).toHaveLength(0);
  });
});

function selectChapter(id: string) {
  vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  const result = render(<Page />);
  const original = Array.from(source.querySelectorAll<HTMLButtonElement>(".nav-item")).find(
    (button) => button.getAttribute("onclick")?.startsWith(`show('${id}'`)
  );
  if (!original) throw new Error(`Missing source navigation: ${id}`);
  fireEvent.click(
    result.getByRole("button", { name: (original.textContent ?? "").trim().replace(/\s+/g, " ") })
  );
  return result;
}

describe("TOGAF foundations and examinations", () => {
  for (const id of ["overview", "exam"]) {
    it(`preserves all wording structure icons and links in ${id}`, () => {
      const { container } = selectChapter(id);
      const actual = container.querySelector(`.section#${id}`);
      expect(actual).not.toBeNull();
      assertFaithful(actual as Element, source.getElementById(id) as Element);
      expect(container.querySelectorAll(".section")).toHaveLength(1);
    });
    it(`parses all real Mermaid diagrams in ${id}`, async () => {
      const { container } = selectChapter(id);
      const actual = container.querySelector(`.section#${id}`);
      expect(actual).not.toBeNull();
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      for (const diagram of actual?.querySelectorAll('[data-testid="mermaid-diagram"]') ?? []) {
        const chart = diagram.getAttribute("data-chart") ?? "";
        expect(chart.split("\n").every((line) => line === line.trim())).toBe(true);
        await expect(mermaid.parse(chart)).resolves.toBeTruthy();
      }
    });
  }
});

describe("TOGAF ADM cycle and phases", () => {
  for (const id of ["adm", "phases"]) {
    it(`preserves all wording structure icons and links in ${id}`, () => {
      const { container } = selectChapter(id);
      const actual = container.querySelector(`.section#${id}`);
      expect(actual).not.toBeNull();
      assertFaithful(actual as Element, source.getElementById(id) as Element);
      expect(container.querySelectorAll(".section")).toHaveLength(1);
    });
    it(`parses all real Mermaid diagrams in ${id}`, async () => {
      const { container } = selectChapter(id);
      const actual = container.querySelector(`.section#${id}`);
      expect(actual).not.toBeNull();
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      for (const diagram of actual?.querySelectorAll('[data-testid="mermaid-diagram"]') ?? []) {
        const chart = diagram.getAttribute("data-chart") ?? "";
        expect(chart.split("\n").every((line) => line === line.trim())).toBe(true);
        await expect(mermaid.parse(chart)).resolves.toBeTruthy();
      }
    });
  }
});

describe("TOGAF architecture structure", () => {
  for (const id of ["bdat", "artifacts", "repository"]) {
    it(`preserves all wording structure icons and links in ${id}`, () => {
      const { container } = selectChapter(id);
      const actual = container.querySelector(`.section#${id}`);
      expect(actual).not.toBeNull();
      assertFaithful(actual as Element, source.getElementById(id) as Element);
      expect(container.querySelectorAll(".section")).toHaveLength(1);
    });
    it(`parses all real Mermaid diagrams in ${id}`, async () => {
      const { container } = selectChapter(id);
      const actual = container.querySelector(`.section#${id}`);
      expect(actual).not.toBeNull();
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      for (const diagram of actual?.querySelectorAll('[data-testid="mermaid-diagram"]') ?? []) {
        const chart = diagram.getAttribute("data-chart") ?? "";
        expect(chart.split("\n").every((line) => line === line.trim())).toBe(true);
        await expect(mermaid.parse(chart)).resolves.toBeTruthy();
      }
    });
  }
});
