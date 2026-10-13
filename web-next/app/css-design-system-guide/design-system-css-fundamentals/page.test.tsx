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
