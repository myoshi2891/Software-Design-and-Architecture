import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { expect } from "vitest";

const slug = "grid-bem-responsive-a11y-systems";
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
  if (element.matches(".mermaid")) return { diagram: element.id };
  if (element.tagName === "PRE") return { code: element.textContent };
  return {
    tag: element.tagName,
    classes: Array.from(element.classList).filter((value) => value !== "active"),
    id: element.id,
    style: (element as HTMLElement).style.cssText.replace(/\s/g, "").replace(/;$/, ""),
    rowSpan: element.getAttribute("rowspan"),
    colSpan: element.getAttribute("colspan"),
    children: Array.from(element.children, shape),
  };
}
export function assertFaithful(actual: Element, expected: Element) {
  expect(actual).not.toBeNull();
  expect(shape(actual)).toEqual(shape(expected));
  expect(compact(actual.textContent)).toBe(compact(expected.textContent));
  for (const selector of [
    "h1",
    "h2",
    "h3",
    "h4",
    "p",
    "strong",
    "em",
    "td",
    "th",
    ".co",
    ".bp-item",
    ".mk",
    ".n",
    ".sc",
    ".mbox-t",
    "li",
  ]) {
    expect(
      Array.from(actual.querySelectorAll(selector), (e) => compact(e.textContent)),
      selector
    ).toEqual(Array.from(expected.querySelectorAll(selector), (e) => compact(e.textContent)));
  }
  expect(Array.from(actual.querySelectorAll("pre"), (e) => e.textContent)).toEqual(
    Array.from(expected.querySelectorAll("pre"), (e) => e.textContent)
  );
  expect(
    Array.from(actual.querySelectorAll("a"), (e) => [
      e.getAttribute("href"),
      compact(e.textContent),
    ])
  ).toEqual(
    Array.from(expected.querySelectorAll("a"), (e) => [
      e.getAttribute("href"),
      compact(e.textContent),
    ])
  );
}
