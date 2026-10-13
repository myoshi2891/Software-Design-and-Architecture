import { render } from "@testing-library/react";
import postcss from "postcss";
import { expect, it, vi } from "vitest";
import { css, SOURCE_DIAGRAMS } from "./source-contract";

vi.mock("@/components/MermaidDiagram", () => ({ default: () => <div /> }));

import Page from "./page";

it("presents every original roadmap label in the same six groups without SVG shrinkage", () => {
  const { container } = render(<Page />);
  const roadmap = container.querySelector('[data-diagram="learning_path"]');
  expect(roadmap?.querySelector(".roadmap-title")?.textContent).toBe("CSS設計の学習パス");
  const groups = Array.from(roadmap?.querySelectorAll(".roadmap-stage") ?? []);
  expect(groups).toHaveLength(6);
  const expected = SOURCE_DIAGRAMS.learning_path
    .split("\n")
    .slice(2)
    .filter((line) => line.trim());
  expect(
    groups.flatMap((group) => [
      group.querySelector("dt")?.textContent,
      ...Array.from(group.querySelectorAll("dd"), (item) => item.textContent),
    ])
  ).toEqual(expected.map((line) => line.trim()));
  for (const group of groups) expect(group.querySelectorAll("dd")).toHaveLength(4);
  expect(roadmap?.querySelector("svg, [data-testid='mermaid-diagram']")).toBeNull();
});

it("lays out roadmap cards in three columns with a single-column mobile layout", () => {
  const root = postcss.parse(css);
  const layouts: Array<[string | undefined, string]> = [];
  root.walkRules(".roadmap-grid", (rule) => {
    rule.walkDecls("grid-template-columns", (decl) => {
      layouts.push([rule.parent?.type === "atrule" ? rule.parent.params : undefined, decl.value]);
    });
  });
  expect(layouts).toContainEqual([undefined, "repeat(3, minmax(0, 1fr))"]);
  expect(layouts).toContainEqual(["(max-width: 1100px)", "repeat(2, minmax(0, 1fr))"]);
  expect(layouts).toContainEqual(["(max-width: 600px)", "1fr"]);
});
