import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { compact, source } from "./source-contract";

vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => (
    <div data-testid="mermaid-diagram" data-chart={chart} />
  ),
}));

import Page, { metadata } from "./page";

function shape(e: Element): unknown {
  if (e.matches("script")) return null;
  if (e.matches(".mermaid")) return { tag: "diagram" };
  if (e.tagName === "PRE") return { tag: "PRE", text: e.textContent };
  return {
    tag: e.tagName,
    id: e.id,
    classes: [...e.classList].filter((c) => !["is-visible", "fade-in"].includes(c)),
    style: (e as HTMLElement).style.cssText,
    span: [e.getAttribute("rowspan"), e.getAttribute("colspan")],
    children: [...e.children].filter((c) => !c.matches("script")).map(shape),
  };
}
describe("Animation architecture complete source contract", () => {
  for (const id of ["ch11", "ch12", "ch13", "ch14", "ch15", "ch16", "maturity", "allrefs"])
    it("preserves complete content and structure: " + id, () => {
      const { container } = render(<Page />);
      const actual = container.querySelector("#" + id)!;
      const expected = source.querySelector("#" + id)!.cloneNode(true) as Element;
      expected.querySelectorAll("script").forEach((e) => {
        e.remove();
      });
      // Formatting whitespace is not valid React content in table structure.
      for (const element of expected.querySelectorAll("table, thead, tbody, tfoot, tr, colgroup")) {
        for (const node of [...element.childNodes]) {
          if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) node.remove();
        }
      }
      expect(actual).not.toBeNull();
      expect(shape(actual)).toEqual(shape(expected));
      expect(compact(actual.textContent)).toBe(compact(expected.textContent));
      for (const sel of ["p", "li", "h2", "h3", "h4", "td", "th", "strong", "em", "a"])
        expect(
          [...actual.querySelectorAll(sel)].map((e) => [
            compact(e.textContent),
            e.getAttribute("href"),
          ])
        ).toEqual(
          [...expected.querySelectorAll(sel)].map((e) => [
            compact(e.textContent),
            e.getAttribute("href"),
          ])
        );
    });
  it("preserves inventory, hero, footer, links and metadata", () => {
    const { container } = render(<Page />);
    for (const [s, n] of Object.entries({
      h1: 1,
      h2: 8,
      h3: 31,
      "section.chapter": 8,
      ".mermaid": 19,
      pre: 36,
      table: 7,
      ul: 24,
      li: 115,
      "a[href]": 69,
    }))
      expect(container.querySelectorAll(s), s).toHaveLength(n);
    for (const s of [".hero", ".site-footer"])
      expect(compact(container.querySelector(s)!.textContent)).toBe(
        compact(source.querySelector(s)!.textContent)
      );
    expect(metadata.title).toBe(source.title);
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href")!;
      if (href.startsWith("http")) {
        expect(a).toHaveAttribute("target", "_blank");
        expect(a).toHaveAttribute("rel", "noopener noreferrer");
      } else if (href.startsWith("#")) expect(container.querySelector(href), href).not.toBeNull();
    }
    expect(container.querySelectorAll("script,link,iframe,style")).toHaveLength(0);
    for (const pre of container.querySelectorAll("pre")) {
      expect(pre.querySelector("code")).toBeNull();
      expect(pre.querySelector("span")).not.toBeNull();
    }
  });
});

it("highlights CSS functions and hex colors as syntax rather than comments", () => {
  const { container } = render(<Page />);
  const blocks = [...container.querySelectorAll("pre")];
  expect(
    blocks.some((pre) =>
      [...pre.querySelectorAll(".fn")].some((span) => span.textContent === "cubic-bezier")
    )
  ).toBe(true);
  const colorCode = blocks.find((pre) => pre.textContent?.includes("--color-primary"));
  expect(colorCode).toBeDefined();
  expect(colorCode?.querySelector(".nu")).not.toBeNull();
});

it("has no text nodes beneath table structural elements in all seven tables", () => {
  const { container } = render(<Page />);
  expect(container.querySelectorAll("table")).toHaveLength(7);
  for (const element of container.querySelectorAll("table, thead, tbody, tfoot, tr, colgroup")) {
    expect(
      [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE),
      `${element.tagName} in ${element.closest("section")?.id}`
    ).toHaveLength(0);
  }
});
