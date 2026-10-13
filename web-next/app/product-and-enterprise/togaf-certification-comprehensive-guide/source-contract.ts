import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { expect } from "vitest";

const relativeSource =
  "product-and-enterprise/togaf-certification-comprehensive-guide/togaf-certification-comprehensive-guide.html";
const original = resolve(process.cwd(), "..", relativeSource);
export const sourcePath = existsSync(original)
  ? original
  : resolve(process.cwd(), "..", "archive", relativeSource);
export const source = new DOMParser().parseFromString(
  readFileSync(sourcePath, "utf8"),
  "text/html"
);
export const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
export const compact = (value: string | null) => (value ?? "").replace(/\s+/g, "");

// Restrict canonicalization to documented Mermaid compatibility changes.
export function normalizeChart(chart: string): string {
  return chart
    .trim()
    .split("\n")
    .map((line) => {
      let normalized = line
        .trim()
        .replaceAll("（", "(")
        .replaceAll("）", ")")
        .replaceAll("：", ":")
        .replaceAll("〜", "から")
        .replaceAll("―", "-")
        .replaceAll("\\n", "<br/>");
      if (normalized.startsWith("subgraph "))
        normalized = normalized
          .replace(/[❌✅]/gu, "")
          .replace(/[()]/g, "")
          .replace(/\["\s+/, '["');
      return normalized;
    })
    .filter(Boolean)
    .join("\n");
}

// Compare element hierarchy and styling hooks, excluding renderer-generated SVG internals.
function shape(element: Element): unknown {
  if (element.matches("i.ti, svg.tabler-icon")) {
    const classes = Array.from(element.classList).filter(
      (value) => value.startsWith("ti-") || value.startsWith("icon-")
    );
    return {
      icon: classes.map((value) => value.replace(/^ti-/, "icon-")),
      style: element.getAttribute("style")?.replace(/[\s;]/g, "") ?? "",
    };
  }
  if (element.matches('.mermaid, [data-testid="mermaid-diagram"]')) return { diagram: true };
  if (element.tagName === "PRE") return { code: element.textContent };
  return {
    tag: element.tagName,
    classes: Array.from(element.classList).filter((value) => value !== "active"),
    id: element.id,
    style: element.getAttribute("style")?.replace(/[\s;]/g, "") ?? "",
    rowSpan: element.getAttribute("rowspan"),
    colSpan: element.getAttribute("colspan"),
    children: Array.from(element.children, shape),
  };
}

export function assertFaithful(actual: Element, expected: Element) {
  expect(shape(actual)).toEqual(shape(expected));
  const actualText = actual.cloneNode(true) as Element;
  const expectedText = expected.cloneNode(true) as Element;
  actualText.querySelectorAll('[data-testid="mermaid-diagram"], svg').forEach((el) => {
    el.remove();
  });
  expectedText.querySelectorAll(".mermaid, i.ti").forEach((el) => {
    el.remove();
  });
  expect(compact(actualText.textContent)).toBe(compact(expectedText.textContent));
  for (const selector of [
    "h1",
    "h2",
    "p",
    "li",
    "strong",
    "em",
    "th",
    "td",
    ".callout",
    ".card",
    ".domain-card",
    ".bp-item",
    ".bp-num",
    ".phase-item",
    ".week-item",
    ".tl-item",
    ".diagram-label",
  ]) {
    expect(
      Array.from(actual.querySelectorAll(selector), (el) => compact(el.textContent)),
      selector
    ).toEqual(Array.from(expected.querySelectorAll(selector), (el) => compact(el.textContent)));
  }
  expect(Array.from(actual.querySelectorAll("pre"), (el) => el.textContent)).toEqual(
    Array.from(expected.querySelectorAll("pre"), (el) => el.textContent)
  );
  for (const selector of [
    "ul",
    "ol",
    "table",
    "tr",
    ".sources",
    ".table-wrap",
    ".mermaid-wrap",
    ".check-list",
  ])
    expect(actual.querySelectorAll(selector).length, selector).toBe(
      expected.querySelectorAll(selector).length
    );
  expect(
    Array.from(actual.querySelectorAll("a"), (el) => [
      el.getAttribute("href"),
      compact(el.textContent),
    ])
  ).toEqual(
    Array.from(expected.querySelectorAll("a"), (el) => [
      el.getAttribute("href"),
      compact(el.textContent),
    ])
  );
  expect(actual.querySelectorAll("svg.tabler-icon").length).toBe(
    expected.querySelectorAll("i.ti").length
  );
  expect(actual.querySelectorAll("i.ti")).toHaveLength(0);
  const diagrams = Array.from(actual.querySelectorAll('[data-testid="mermaid-diagram"]'));
  expect(diagrams.map((el) => normalizeChart(el.getAttribute("data-chart") ?? ""))).toEqual(
    Array.from(expected.querySelectorAll(".mermaid"), (el) =>
      normalizeChart(SOURCE_DIAGRAMS[el.id] ?? "")
    )
  );
  expect(diagrams.map((el) => el.id)).toEqual(
    Array.from(expected.querySelectorAll(".mermaid"), (el) => el.id)
  );
  for (const diagram of diagrams) expect(diagram.getAttribute("data-natural-scale")).toBe("true");
  for (const link of actual.querySelectorAll("a")) {
    if (link.getAttribute("href")?.startsWith("http")) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    } else expect(link.getAttribute("href")).not.toContain(".html");
  }
}

// Parse only static template literals; never execute the original HTML scripts.
export const SOURCE_DIAGRAMS: Record<string, string> = {};
const script = Array.from(source.scripts).find((element) =>
  element.textContent?.includes("const DIAGRAMS")
);
const syntax = ts.createSourceFile(
  "source-diagrams.js",
  script?.textContent ?? "",
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.JS
);
function collectDiagrams(node: ts.Node) {
  if (
    ts.isVariableDeclaration(node) &&
    node.name.getText(syntax) === "DIAGRAMS" &&
    node.initializer &&
    ts.isObjectLiteralExpression(node.initializer)
  ) {
    for (const property of node.initializer.properties) {
      if (
        !ts.isPropertyAssignment(property) ||
        !ts.isStringLiteral(property.name) ||
        !ts.isNoSubstitutionTemplateLiteral(property.initializer)
      )
        throw new Error("Expected a static Mermaid literal");
      SOURCE_DIAGRAMS[property.name.text] = property.initializer.getText(syntax).slice(1, -1);
    }
  }
  ts.forEachChild(node, collectDiagrams);
}
collectDiagrams(syntax);
