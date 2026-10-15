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
    // 目次ボタンの aria-controls 参照用に付与した id だけを除いて原本と照合する。
    const faithful = sidebar?.cloneNode(true) as Element;
    faithful.removeAttribute("id");
    assertFaithful(faithful, source.querySelector(".sidebar") as Element);
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
    expect(css).toContain(
      "@media (prefers-reduced-motion: no-preference) {\n  html:has(.minimum-viable-product-comprehensive-guide) { scroll-behavior: smooth; }\n}"
    );
  });
});

const SECTION_GROUPS = [
  ["MVP foundations and lean process", ["intro", "lean", "process"]],
  ["MVP customer validation and design", ["step1", "step2", "step3", "step4"]],
  ["MVP implementation and learning", ["step5", "step6", "step7"]],
  ["MVP growth rules and references", ["failures", "scale", "rules", "refs"]],
] as const;

for (const [heading, ids] of SECTION_GROUPS) {
  describe(heading, () => {
    for (const id of ids) {
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
}

it("preserves YAML whitespace and colors comments keys strings numbers and interpolation", () => {
  const { container } = render(<Page />);
  const pre = container.querySelector("#step5 pre");
  expect(pre?.textContent).toBe(source.querySelector("#step5 pre")?.textContent);
  expect(pre?.textContent).toContain(`\${{ secrets.VERCEL_TOKEN }}`);
  for (const token of ["cm", "kw", "st", "nu", "fn"])
    expect(pre?.querySelector(`span.${token}`), token).not.toBeNull();
  expect(pre?.querySelector("code")).toBeNull();
});

describe("MVP complete inventory", () => {
  it("matches the entire main content including the closing note", () => {
    const { container } = render(<Page />);
    assertFaithful(
      container.querySelector("main") as Element,
      source.querySelector("main") as Element
    );
    const selectors = {
      "section.section": 14,
      h2: 14,
      h3: 35,
      h4: 10,
      table: 15,
      pre: 1,
      ul: 19,
      ol: 0,
      li: 69,
      ".callout": 6,
      ".card": 11,
      ".rule-item": 14,
      ".mermaid-caption": 17,
      '[data-testid="mermaid-diagram"]': 17,
      "svg.tabler-icon": 102,
    };
    for (const [selector, count] of Object.entries(selectors))
      expect(container.querySelectorAll(selector), selector).toHaveLength(count);
    expect(Array.from(container.querySelectorAll("section.section"), (el) => el.id)).toEqual(
      Array.from(source.querySelectorAll("section.section"), (el) => el.id)
    );
    expect(
      Array.from(container.querySelectorAll("#rules .rule-num"), (el) => el.textContent)
    ).toEqual(Array.from({ length: 10 }, (_, i) => String(i + 1)));
    expect(container.querySelectorAll("script, link, i.ti")).toHaveLength(0);
  });
});
