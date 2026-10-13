import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { expect } from "vitest";

const slug = "design-system-css-fundamentals";
const original = resolve(process.cwd(), "..", "css-design-system-guide", `${slug}.html`);
export const sourcePath = existsSync(original)
  ? original
  : resolve(process.cwd(), "..", "archive", "css-design-system-guide", slug, `${slug}.html`);
export const source = new DOMParser().parseFromString(
  readFileSync(sourcePath, "utf8"),
  "text/html"
);
export const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
export const compact = (text: string | null) => (text ?? "").replace(/\s+/g, "");

// Keep mindmap indentation, since it encodes the parent-child relationships.
export function normalizeChart(chart: string) {
  if (chart.trimStart().startsWith("mindmap")) return chart.trim();
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
        !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) ||
        !ts.isNoSubstitutionTemplateLiteral(property.initializer)
      )
        throw new Error("Expected a static Mermaid definition");
      SOURCE_DIAGRAMS[property.name.text] = property.initializer.getText(syntax).slice(1, -1);
    }
  }
  ts.forEachChild(node, collectDiagrams);
}
collectDiagrams(syntax);

function shape(element: Element): unknown {
  if (element.matches(".mermaid[data-diagram]"))
    return { diagram: element.getAttribute("data-diagram") };
  if (element.tagName === "PRE") return { code: element.textContent };
  const style = (element as HTMLElement).style;
  return {
    tag: element.tagName,
    classes: Array.from(element.classList).filter(
      (value) => value !== "active" && value !== "visible"
    ),
    id: element.id,
    // Progress width is dynamic and is verified independently by Navigation tests.
    style: Object.fromEntries(
      Array.from(style ?? [])
        .filter((property) => element.id !== "progress-fill" || property !== "width")
        .map((property) => [property, style.getPropertyValue(property)])
    ),
    rowSpan: element.getAttribute("rowspan"),
    colSpan: element.getAttribute("colspan"),
    children: Array.from(element.children, shape),
  };
}

export function assertFaithful(actual: Element, expected: Element) {
  expect(shape(actual)).toEqual(shape(expected));
  const actualText = actual.cloneNode(true) as Element;
  const expectedText = expected.cloneNode(true) as Element;
  for (const element of actualText.querySelectorAll(".mermaid[data-diagram]")) element.remove();
  for (const element of expectedText.querySelectorAll(".mermaid[data-diagram]")) element.remove();
  expect(compact(actualText.textContent)).toBe(compact(expectedText.textContent));
  for (const selector of [
    "h1",
    "h2",
    "h3",
    "h4",
    "p",
    "strong",
    "em",
    "th",
    "td",
    ".callout",
    ".card",
    ".comp-card",
    ".code-header",
    ".step-item",
    ".step-num",
    ".spec-box",
    ".ref-link",
    ".mermaid-label",
  ]) {
    expect(
      Array.from(actual.querySelectorAll(selector), (element) => compact(element.textContent)),
      selector
    ).toEqual(
      Array.from(expected.querySelectorAll(selector), (element) => compact(element.textContent))
    );
  }
  expect(Array.from(actual.querySelectorAll("pre"), (element) => element.textContent)).toEqual(
    Array.from(expected.querySelectorAll("pre"), (element) => element.textContent)
  );
  for (const selector of [
    "ul",
    "ol",
    "li",
    "table",
    "tr",
    ".tbl-wrap",
    ".code-wrap",
    ".mermaid-wrap",
  ])
    expect(actual.querySelectorAll(selector).length, selector).toBe(
      expected.querySelectorAll(selector).length
    );
  expect(
    Array.from(actual.querySelectorAll("a"), (element) => [
      element.getAttribute("href"),
      compact(element.textContent),
    ])
  ).toEqual(
    Array.from(expected.querySelectorAll("a"), (element) => [
      element.getAttribute("href"),
      compact(element.textContent),
    ])
  );
  const diagrams = Array.from(actual.querySelectorAll('[data-testid="mermaid-diagram"]'));
  expect(
    diagrams.map((element) => normalizeChart(element.getAttribute("data-chart") ?? ""))
  ).toEqual(
    Array.from(expected.querySelectorAll('.mermaid[data-diagram]:not([data-diagram="learning_path"])'), (element) =>
      normalizeChart(SOURCE_DIAGRAMS[element.getAttribute("data-diagram") ?? ""] ?? "")
    )
  );
  for (const diagram of diagrams) expect(diagram.getAttribute("data-natural-scale")).toBe("true");
  for (const link of actual.querySelectorAll("a")) {
    if (link.getAttribute("href")?.startsWith("http")) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    } else expect(link.getAttribute("href")).not.toContain(".html");
  }
}
