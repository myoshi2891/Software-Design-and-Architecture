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
    // Ignore heading ids added only to label tables via aria-labelledby.
    id: element.tagName === "H2" && element.id.startsWith("togaf-table-") ? "" : element.id,
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
if (!script?.textContent) throw new Error("Missing DIAGRAMS script in source HTML");
const scriptText = script.textContent;
const syntax = ts.createSourceFile(
  "source-diagrams.js",
  scriptText,
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

// 原本はバイト固定（archive.test.ts）のため、事実誤りの訂正は正誤表として原本の解析結果へ適用する。
// OGEA-101 の合格基準は 60%（24/40問）、OGEA-102 は 4 択・5/3/1/0 点の段階採点で、
// 資料は持参せず試験画面の REFERENCE ボタンから参照する。各訂正は原本にちょうど 1 回だけ一致する。
const TEXT_ERRATA: readonly (readonly [string, string])[] = [
  ["55%（22/40問）", "60%（24/40問）"],
  ["公式ドキュメント持込可", "試験画面の REFERENCE ボタンで参照可"],
  ["ドキュメント持込", "公式ドキュメント参照"],
  ["Level 2 の持込可について：", "Level 2 の資料参照について："],
  [
    "公式 TOGAF ドキュメントの持込みは可能ですが、試験時間",
    "受験者が文書を持参することはできず、公式 TOGAF ドキュメントは試験画面の REFERENCE ボタンから参照します。ただし試験時間",
  ],
  ["最低 -1点", "最低 0点（減点なし）"],
  ["Level 2 の公式ドキュメントを事前整理する", "Level 2 の REFERENCE 参照に備えて構成を把握する"],
  [
    "タブインデックスを貼り、ADM フェーズ・コンプライアンス定義・ガバナンス構造を素早く参照できるようにする。持込可でも",
    "試験画面の REFERENCE ボタンで参照する公式ドキュメントの章構成（ADM フェーズ・コンプライアンス定義・ガバナンス構造）を事前に把握し、素早く辿れるようにする。参照可でも",
  ],
  ["Level 2 持込用・根拠確認", "Level 2 の REFERENCE 参照対策・根拠確認"],
  ["最新公式テキスト（Level 2 持込）", "最新公式テキスト（Level 2 は試験画面で参照）"],
];
const DIAGRAM_ERRATA: Readonly<Record<string, readonly (readonly [string, string])[]>> = {
  "diag-1": [["合格55%", "合格60%"]],
  "diag-2": [
    ["5つの選択肢\\n(A-E)", "4つの選択肢\\n(A-D)"],
    [
      'OPT --> A4["不適切な回答 0点"]:::s0\nOPT --> A5["最も不適切 -1点"]:::sm1',
      'OPT --> A4["最も不適切 0点"]:::s0',
    ],
    ["\nclassDef sm1 fill:#1f1015,stroke:#f87171,color:#e8eaf0", ""],
  ],
};

function replaceOnce(text: string, before: string, after: string, label: string): string {
  const count = text.split(before).length - 1;
  if (count !== 1)
    throw new Error(`Erratum must match exactly once in ${label}: ${before} (${count})`);
  return text.replace(before, after);
}

for (const [before, after] of TEXT_ERRATA) {
  const walker = source.createTreeWalker(source.body, NodeFilter.SHOW_TEXT);
  const matches: Text[] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode())
    if (node.nodeValue?.includes(before)) matches.push(node as Text);
  const [match] = matches;
  if (matches.length !== 1 || !match)
    throw new Error(`Erratum must match exactly one text node: ${before} (${matches.length})`);
  match.nodeValue = replaceOnce(match.nodeValue ?? "", before, after, "source text");
}
for (const [id, errata] of Object.entries(DIAGRAM_ERRATA)) {
  const chart = SOURCE_DIAGRAMS[id];
  if (chart === undefined) throw new Error(`Missing source diagram for erratum: ${id}`);
  SOURCE_DIAGRAMS[id] = errata.reduce(
    (text, [before, after]) => replaceOnce(text, before, after, id),
    chart
  );
}
