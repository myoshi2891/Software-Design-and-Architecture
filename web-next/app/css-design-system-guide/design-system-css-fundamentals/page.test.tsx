import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { assertFaithful, compact, source } from "./source-contract";

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

describe("CSS fundamentals foundation", () => {
  it("preserves the complete hero, sidebar wording and all 15 links", () => {
    const { container } = render(<Page />);
    for (const selector of [".hero", "#sidebar"]) {
      const actual = container.querySelector(selector);
      expect(actual).not.toBeNull();
      assertFaithful(actual as Element, source.querySelector(selector) as Element);
    }
    expect(container.querySelectorAll(".sb-link")).toHaveLength(15);
    expect(container.querySelector("#top-btn")).toHaveAttribute("title", "先頭へ戻る");
    expect(container.querySelector("#top-btn")).toHaveTextContent("⇧");
  });
  it("provides metadata and keeps the main content on the server", () => {
    expect(metadata.title).toBe(source.title);
    expect(compact(metadata.description as string)).toBe(
      compact(source.querySelector(".hero p")?.textContent ?? "")
    );
    const { container } = render(<Page />);
    expect(container.querySelector(".design-system-css-fundamentals > main#main")).not.toBeNull();
    expect(
      readFileSync(
        resolve(
          process.cwd(),
          "app/css-design-system-guide/design-system-css-fundamentals/page.tsx"
        ),
        "utf8"
      )
    ).not.toMatch(/^["']use client["']/);
    expect(container.querySelectorAll("script, link, [onclick]")).toHaveLength(0);
  });
});

describe("CSS fundamentals design system concepts", () => {
  for (const id of ["s1-1", "s1-2", "s1-3"]) {
    it(`preserves every text code table style and diagram in ${id}`, () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`#${id}`);
      expect(actual).not.toBeNull();
      assertFaithful(actual as Element, source.getElementById(id) as Element);
      for (const pre of actual?.querySelectorAll("pre") ?? []) {
        expect(pre.querySelector("code")).toBeNull();
        expect(
          pre.querySelectorAll("span.kw, span.st, span.fn, span.cm, span.nu").length
        ).toBeGreaterThan(0);
        expect(pre.querySelectorAll("style, script, button")).toHaveLength(0);
      }
    });
    it(`parses all real Mermaid diagrams in ${id}`, async () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`#${id}`);
      expect(actual).not.toBeNull();
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      for (const element of actual?.querySelectorAll('[data-testid="mermaid-diagram"]') ?? []) {
        const chart = element.getAttribute("data-chart") ?? "";
        if (!chart.startsWith("mindmap"))
          expect(chart.split("\n").every((line) => line === line.trim())).toBe(true);
        await expect(mermaid.parse(chart)).resolves.toBeTruthy();
      }
    });
  }
});

describe("CSS fundamentals adoption and best practices", () => {
  for (const id of ["s1-4", "s1-5", "s1-6"]) {
    it(`preserves every text code table style and diagram in ${id}`, () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`#${id}`);
      expect(actual).not.toBeNull();
      assertFaithful(actual as Element, source.getElementById(id) as Element);
      for (const pre of actual?.querySelectorAll("pre") ?? []) {
        expect(pre.querySelector("code")).toBeNull();
        expect(
          pre.querySelectorAll("span.kw, span.st, span.fn, span.cm, span.nu").length
        ).toBeGreaterThan(0);
        expect(pre.querySelectorAll("style, script, button")).toHaveLength(0);
      }
    });
    it(`parses all real Mermaid diagrams in ${id}`, async () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`#${id}`);
      expect(actual).not.toBeNull();
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      for (const element of actual?.querySelectorAll('[data-testid="mermaid-diagram"]') ?? []) {
        const chart = element.getAttribute("data-chart") ?? "";
        if (!chart.startsWith("mindmap"))
          expect(chart.split("\n").every((line) => line === line.trim())).toBe(true);
        await expect(mermaid.parse(chart)).resolves.toBeTruthy();
      }
    });
  }
});

describe("CSS fundamentals cascade specificity and methodologies", () => {
  for (const id of ["s2-1", "s2-2"]) {
    it(`preserves every text code table style and diagram in ${id}`, () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`#${id}`);
      expect(actual).not.toBeNull();
      assertFaithful(actual as Element, source.getElementById(id) as Element);
      for (const pre of actual?.querySelectorAll("pre") ?? []) {
        expect(pre.querySelector("code")).toBeNull();
        expect(
          pre.querySelectorAll("span.kw, span.st, span.fn, span.cm, span.nu").length
        ).toBeGreaterThan(0);
        expect(pre.querySelectorAll("style, script, button")).toHaveLength(0);
      }
    });
    it(`parses all real Mermaid diagrams in ${id}`, async () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`#${id}`);
      expect(actual).not.toBeNull();
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      for (const element of actual?.querySelectorAll('[data-testid="mermaid-diagram"]') ?? []) {
        const chart = element.getAttribute("data-chart") ?? "";
        if (!chart.startsWith("mindmap"))
          expect(chart.split("\n").every((line) => line === line.trim())).toBe(true);
        await expect(mermaid.parse(chart)).resolves.toBeTruthy();
      }
    });
  }
});

describe("CSS fundamentals custom properties and layout", () => {
  for (const id of ["s2-3", "s2-4"]) {
    it(`preserves every text code table style and diagram in ${id}`, () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`#${id}`);
      expect(actual).not.toBeNull();
      assertFaithful(actual as Element, source.getElementById(id) as Element);
      for (const pre of actual?.querySelectorAll("pre") ?? []) {
        expect(pre.querySelector("code")).toBeNull();
        expect(
          pre.querySelectorAll("span.kw, span.st, span.fn, span.cm, span.nu").length
        ).toBeGreaterThan(0);
        expect(pre.querySelectorAll("style, script, button")).toHaveLength(0);
      }
    });
    it(`parses all real Mermaid diagrams in ${id}`, async () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`#${id}`);
      expect(actual).not.toBeNull();
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      for (const element of actual?.querySelectorAll('[data-testid="mermaid-diagram"]') ?? []) {
        const chart = element.getAttribute("data-chart") ?? "";
        if (!chart.startsWith("mindmap"))
          expect(chart.split("\n").every((line) => line === line.trim())).toBe(true);
        await expect(mermaid.parse(chart)).resolves.toBeTruthy();
      }
    });
  }
});

describe("CSS fundamentals responsive design and best practices", () => {
  for (const id of ["s2-5", "s2-6"]) {
    it(`preserves every text code table style and diagram in ${id}`, () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`#${id}`);
      expect(actual).not.toBeNull();
      assertFaithful(actual as Element, source.getElementById(id) as Element);
      for (const pre of actual?.querySelectorAll("pre") ?? []) {
        expect(pre.querySelector("code")).toBeNull();
        expect(
          pre.querySelectorAll("span.kw, span.st, span.fn, span.cm, span.nu").length
        ).toBeGreaterThan(0);
        expect(pre.querySelectorAll("style, script, button")).toHaveLength(0);
      }
    });
    it(`parses all real Mermaid diagrams in ${id}`, async () => {
      const { container } = render(<Page />);
      const actual = container.querySelector(`#${id}`);
      expect(actual).not.toBeNull();
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      for (const element of actual?.querySelectorAll('[data-testid="mermaid-diagram"]') ?? []) {
        const chart = element.getAttribute("data-chart") ?? "";
        if (!chart.startsWith("mindmap"))
          expect(chart.split("\n").every((line) => line === line.trim())).toBe(true);
        await expect(mermaid.parse(chart)).resolves.toBeTruthy();
      }
    });
  }
});
