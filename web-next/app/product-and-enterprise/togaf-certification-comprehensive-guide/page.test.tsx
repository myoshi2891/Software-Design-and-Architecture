import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { assertFaithful, compact, source, TOGAF_LEGAL_NOTE } from "./source-contract";

vi.mock("@/components/MermaidDiagram", () => ({
  default: ({
    chart,
    id,
    preserveNaturalScale,
  }: {
    chart: string;
    id?: string;
    preserveNaturalScale?: boolean;
  }) => (
    <div
      id={id}
      data-testid="mermaid-diagram"
      data-chart={chart}
      data-natural-scale={String(preserveNaturalScale)}
    />
  ),
}));

import Page, { metadata } from "./page";

afterEach(() => vi.restoreAllMocks());

describe("TOGAF foundation", () => {
  it("preserves the sidebar logo, group labels, buttons and icons", () => {
    const { container } = render(<Page />);
    const nav = container.querySelector(".sidebar");
    const original = source.querySelector(".sidebar") as Element;
    expect(compact(nav?.textContent ?? "")).toBe(compact(original.textContent));
    expect(Array.from(nav?.querySelectorAll(".nav-label") ?? [], (el) => el.textContent)).toEqual(
      Array.from(original.querySelectorAll(".nav-label"), (el) => el.textContent)
    );
    expect(
      Array.from(nav?.querySelectorAll("button") ?? [], (el) => compact(el.textContent))
    ).toEqual(Array.from(original.querySelectorAll("button"), (el) => compact(el.textContent)));
    expect(nav?.querySelectorAll("button")).toHaveLength(12);
    expect(nav?.querySelectorAll("svg.tabler-icon")).toHaveLength(12);
    expect(container.querySelector("button.active")).toHaveTextContent("TOGAFとは");
  });
  it("provides route metadata and keeps the content on the server", () => {
    expect(metadata.title).toBe(source.title);
    expect(compact(metadata.description as string)).toBe(
      compact(source.querySelector(".hero p")?.textContent ?? "").replace(
        compact(TOGAF_LEGAL_NOTE),
        ""
      )
    );
    const { container } = render(<Page />);
    expect(
      container.querySelector(".togaf-certification-comprehensive-guide .shell > main.main")
    ).not.toBeNull();
    expect(
      readFileSync(
        resolve(
          process.cwd(),
          "app/product-and-enterprise/togaf-certification-comprehensive-guide/page.tsx"
        ),
        "utf8"
      )
    ).not.toMatch(/^["']use client["']/);
    expect(container.querySelectorAll("script, link, i.ti, [onclick]")).toHaveLength(0);
  });
});

function selectChapter(id: string) {
  vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  const result = render(<Page />);
  const original = Array.from(source.querySelectorAll<HTMLButtonElement>(".nav-item")).find(
    (button) => button.getAttribute("onclick")?.startsWith(`show('${id}'`)
  );
  if (!original) throw new Error(`Missing source navigation: ${id}`);
  fireEvent.click(
    result.getByRole("tab", { name: (original.textContent ?? "").trim().replace(/\s+/g, " ") })
  );
  return result;
}

const CHAPTER_GROUPS = [
  ["TOGAF foundations and examinations", ["overview", "exam"]],
  ["TOGAF ADM cycle and phases", ["adm", "phases"]],
  ["TOGAF architecture structure", ["bdat", "artifacts", "repository"]],
  ["TOGAF stakeholders and governance", ["stakeholder", "governance"]],
  ["TOGAF exam strategy roadmap and references", ["strategy", "roadmap", "references"]],
] as const;

for (const [name, ids] of CHAPTER_GROUPS) {
  describe(name, () => {
    for (const id of ids) {
      it(`preserves all wording structure icons and links in ${id}`, () => {
        const { container } = selectChapter(id);
        const actual = container.querySelector(`.section#${id}`);
        expect(actual).not.toBeNull();
        assertFaithful(actual as Element, source.getElementById(id) as Element);
        expect(container.querySelectorAll(".section")).toHaveLength(1);
      });
      it(`parses all real Mermaid diagrams in ${id}`, async () => {
        const { container } = selectChapter(id);
        const actual = container.querySelector(`.section#${id}`);
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

describe("TOGAF exam facts corrected from the archived original", () => {
  it("states the OGEA-101 pass mark, OGEA-102 gradient scoring and on-screen reference", () => {
    // Arrange
    const { container } = selectChapter("exam");
    const exam = container.querySelector(".section#exam") as Element;
    const chart = (id: string) =>
      exam.querySelector(`[data-testid="mermaid-diagram"]#${id}`)?.getAttribute("data-chart") ?? "";

    // Act
    const text = exam.textContent ?? "";

    // Assert
    expect(text).toContain("60%（24/40問）");
    expect(text).not.toContain("55%");
    expect(chart("diag-1")).toContain("合格60%");
    expect(chart("diag-1")).not.toContain("55%");
    expect(chart("diag-2")).toContain("4つの選択肢<br/>(A-D)");
    expect(chart("diag-2")).toMatch(/\+5点[\s\S]*\+3点[\s\S]*\+1点[\s\S]*最も不適切 0点/);
    expect(chart("diag-2")).not.toContain("-1点");
    expect(text).toContain("最低 0点");
    expect(text).toContain("REFERENCE ボタン");
  });
  it("states the combined exam awards only Practitioner and shows current exam fees", () => {
    // Arrange
    const { container } = selectChapter("exam");
    const exam = container.querySelector(".section#exam") as Element;
    const chart =
      exam.querySelector('[data-testid="mermaid-diagram"]#diag-1')?.getAttribute("data-chart") ??
      "";
    const row = (label: string) =>
      [...exam.querySelectorAll("tr")]
        .find((tr) => tr.firstElementChild?.textContent === label)
        ?.textContent?.slice(label.length) ?? "";

    // Act
    const text = exam.textContent ?? "";

    // Assert
    expect(text).toContain("授与されるのは Practitioner のみ");
    expect(text).not.toContain("両方を一度に取得");
    expect(row("目的")).toContain("両範囲を受験（Practitioner のみ授与）");
    expect(row("目的")).not.toContain("両レベル同時取得");
    expect(chart).toContain("授与は Practitioner のみ");
    expect(chart).not.toContain("両レベルを1回で取得");
    expect(row("受験料")).toBe("約 $395 USD約 $395 USD約 $595 USD");
  });
  it("never advises bringing documents or tabbing them in any chapter", () => {
    // Arrange
    const page = readFileSync(
      resolve(
        process.cwd(),
        "app",
        "product-and-enterprise",
        "togaf-certification-comprehensive-guide",
        "page.tsx"
      ),
      "utf8"
    );

    // Act & Assert
    for (const phrase of ["持込", "持ち込", "タブインデックス", "タブ整理", "-1点", "55%"])
      expect(page, phrase).not.toContain(phrase);
  });
});

it("preserves the complete inventory across all twelve selectable chapters", () => {
  const { container, getByRole } = render(<Page />);
  vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  const inventory: Record<string, number> = {
    h1: 12,
    h2: 38,
    table: 10,
    pre: 0,
    ul: 4,
    ol: 0,
    li: 14,
    ".callout": 7,
    ".card": 6,
    ".bp-item": 25,
    ".phase-item": 9,
    ".domain-card": 4,
    ".week-item": 7,
    ".tl-item": 6,
    ".source-item": 25,
    ".diagram-label": 5,
    '[data-testid="mermaid-diagram"]': 17,
  };
  const totals = Object.fromEntries(Object.keys(inventory).map((selector) => [selector, 0]));
  let iconCount = container.querySelectorAll(".sidebar svg.tabler-icon").length;
  const diagramIds: string[] = [];
  for (const button of source.querySelectorAll("button.nav-item")) {
    const label = (button.textContent ?? "").trim().replace(/\s+/g, " ");
    fireEvent.click(getByRole("tab", { name: label }));
    const selected = container.querySelector("main .section") as Element;
    expect(selected).not.toBeNull();
    expect(selected.id).toBe(button.getAttribute("onclick")?.match(/show\('([^']+)'/)?.[1]);
    assertFaithful(selected, source.getElementById(selected.id) as Element);
    for (const selector of Object.keys(inventory))
      totals[selector] += selected.querySelectorAll(selector).length;
    iconCount += selected.querySelectorAll("svg.tabler-icon").length;
    diagramIds.push(
      ...Array.from(selected.querySelectorAll('[data-testid="mermaid-diagram"]'), (el) => el.id)
    );
  }
  expect(totals).toEqual(inventory);
  expect(iconCount).toBe(50);
  expect(diagramIds).toEqual(Array.from({ length: 17 }, (_, index) => `diag-${index + 1}`));
  expect(container.querySelectorAll("script, link, i.ti, [onclick]")).toHaveLength(0);
});
