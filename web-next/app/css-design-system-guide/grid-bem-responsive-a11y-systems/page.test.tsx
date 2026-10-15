import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { assertFaithful, compact, source } from "./source-contract";

vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ id }: { id: string }) => <div className="mermaid" id={id} />,
}));

import Page, { metadata } from "./page";

describe("Grid BEM responsive a11y source fidelity", () => {
  for (const id of ["s7", "s8", "s9", "s10", "summary", "refs"]) {
    it(`preserves every element, text, inline style and exact code in ${id}`, () => {
      const { container } = render(<Page />);
      assertFaithful(
        container.querySelector(`#${id}`) as Element,
        source.getElementById(id) as Element
      );
    });
  }
  it("preserves hero, sidebar, inventory and semantic landmarks", () => {
    const { container } = render(<Page />);
    for (const selector of [".hero", ".sidebar"]) {
      // 目次ボタンの aria-controls 参照用に付与した id だけを除いて原本と照合する。
      const faithful = container.querySelector(selector)?.cloneNode(true) as Element;
      faithful.removeAttribute("id");
      assertFaithful(faithful, source.querySelector(selector) as Element);
    }
    for (const [selector, count] of Object.entries({
      "section.section": 6,
      ".sub": 25,
      ".mermaid": 16,
      pre: 37,
      table: 4,
      ".co": 7,
      ".bp-item": 16,
      "nav a": 31,
      "a[href^=http]": 25,
    }))
      expect(container.querySelectorAll(selector), selector).toHaveLength(count);
    expect(Array.from(container.querySelectorAll("section.section"), (e) => e.id)).toEqual([
      "s7",
      "s8",
      "s9",
      "s10",
      "summary",
      "refs",
    ]);
    expect(container.querySelector("main#main")).not.toBeNull();
    expect(container.querySelector("a.skip")).toHaveAttribute("href", "#main");
    expect(container.querySelector("nav")).toHaveAttribute("aria-label", "ガイド目次");
    expect(container.querySelectorAll("script, link, iframe, style, [onclick]")).toHaveLength(0);
    expect(metadata.title).toBe(source.title);
    expect(compact(metadata.description as string)).toBe(
      compact(source.querySelector(".hero p")?.textContent ?? "")
    );
    expect(
      readFileSync(
        resolve(
          process.cwd(),
          "app/css-design-system-guide/grid-bem-responsive-a11y-systems/page.tsx"
        ),
        "utf8"
      )
    ).not.toMatch(/^["']use client["']/);
    for (const pre of container.querySelectorAll("pre")) {
      expect(pre.querySelector("code")).toBeNull();
      expect(pre.querySelectorAll(".kw, .st, .fn, .cm, .nu").length).toBeGreaterThan(0);
    }
  });
});
