import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { assertFaithful, compact, css, source } from "./source-contract";

vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart, preserveNaturalScale }: { chart: string; preserveNaturalScale?: boolean }) => (
    <div
      data-testid="mermaid-diagram"
      data-chart={chart}
      data-natural-scale={String(preserveNaturalScale)}
    />
  ),
}));

import Page, { metadata } from "./page";

describe("MVP foundation", () => {
  it("preserves the page header, tags, icons and metadata", () => {
    const { container } = render(<Page />);
    const header = container.querySelector(".page-header");
    expect(header).not.toBeNull();
    assertFaithful(header as Element, source.querySelector(".page-header") as Element);
    expect(metadata.title).toBe(source.title);
    expect(compact(metadata.description as string)).toBe(
      compact(source.querySelector(".page-description")?.textContent ?? "")
    );
  });
  it("preserves all 14 sidebar anchors in order", () => {
    const { container } = render(<Page />);
    const sidebar = container.querySelector(".sidebar");
    expect(sidebar).not.toBeNull();
    assertFaithful(sidebar as Element, source.querySelector(".sidebar") as Element);
    expect(sidebar?.querySelectorAll("a")).toHaveLength(14);
  });
  it("keeps the body on the server and styles scoped", () => {
    const { container } = render(<Page />);
    expect(
      container.querySelector(".minimum-viable-product-comprehensive-guide > main.main")
    ).not.toBeNull();
    expect(
      readFileSync(
        resolve(
          process.cwd(),
          "app/product-and-enterprise/minimum-viable-product-comprehensive-guide/page.tsx"
        ),
        "utf8"
      )
    ).not.toMatch(/^["']use client["']/);
    expect(css).toContain(".minimum-viable-product-comprehensive-guide {");
  });
});

describe("MVP foundations and lean process", () => {
  for (const id of ["intro", "lean", "process"]) {
    it(`preserves every text, list, table, icon and diagram in ${id}`, () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`section#${id}`);
      expect(actual).not.toBeNull();
      assertFaithful(actual as Element, source.getElementById(id) as Element);
    });
    it(`parses every real Mermaid chart in ${id}`, async () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`section#${id}`);
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
