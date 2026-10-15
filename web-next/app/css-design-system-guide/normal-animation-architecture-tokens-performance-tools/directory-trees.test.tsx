import { readFileSync } from "node:fs";
import { render } from "@testing-library/react";
import postcss from "postcss";
import { expect, it, vi } from "vitest";
import { slug, source } from "./source-contract";

vi.mock("@/components/MermaidDiagram", () => ({ default: () => <div className="mermaid" /> }));

import Page from "./page";

it("keeps both original directory trees while aligning connector cells and comment columns", () => {
  const { container } = render(<Page />);
  const originals = [...source.querySelectorAll("pre")].filter((e) =>
    e.textContent?.includes("├──")
  );
  const trees = [...container.querySelectorAll("pre.directory-tree")];
  expect(trees).toHaveLength(2);
  for (const [index, tree] of trees.entries()) {
    expect(tree.textContent).toBe(originals[index].textContent);
    const lines = tree.textContent!.split("\n");
    expect(tree.querySelectorAll(".tree-path")).toHaveLength(lines.length);
    expect(tree.querySelectorAll(".tree-cell")).toHaveLength(
      lines.reduce((n, line) => n + (line.match(/^[│├└─ ]+/)?.[0].length ?? 0), 0)
    );
    for (const cell of tree.querySelectorAll(".tree-cell"))
      expect(cell.textContent).toMatch(/^[│├└─ ]$/);
    const comments = tree.querySelectorAll(".tree-comment");
    expect(comments).toHaveLength(lines.filter((l) => l.includes("#")).length);
  }
});
it("uses fixed character cells, common path columns and horizontal overflow", () => {
  const css = postcss.parse(readFileSync("app/globals.css", "utf8"));
  const scope = css.nodes.find((n) => n.type === "rule" && n.selector === "." + slug);
  if (scope?.type !== "rule") throw Error("missing page scope");
  const page = scope;
  function value(s: string, p: string) {
    let result: string | undefined;
    page.walkRules(s, (r) => {
      r.walkDecls(p, (d) => {
        result = d.value;
      });
    });
    return result;
  }
  expect(value(".directory-tree .tree-cell", "width")).toBe("1ch");
  expect(value(".directory-tree .tree-cell", "display")).toBe("inline-block");
  expect(value(".directory-tree .tree-path", "width")).toBe("var(--tree-path-width)");
  expect(value(".code-card pre.directory-tree", "font-variant-ligatures")).toBe("none");
  expect(value(".code-card pre.directory-tree", "letter-spacing")).toBe("0");
  expect(value(".code-card pre.directory-tree", "white-space")).toBe("pre");
  expect(value(".code-card pre.directory-tree", "overflow-x")).toBe("auto");
});
