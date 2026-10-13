import postcss from "postcss";
import { describe, expect, it } from "vitest";
import { css, source } from "./source-contract";

const scope = ".design-system-css-fundamentals";
const sourceCss = postcss.parse(source.querySelector("style")?.textContent ?? "");
const targetCss = postcss.parse(css);
const scoped = targetCss.nodes.find((node) => node.type === "rule" && node.selector === scope);

function mappedSelector(selector: string) {
  return selector
    .replace(/\.code-wrap pre code/g, ".code-wrap pre")
    .replace(/\.comp-card pre code/g, ".comp-card pre");
}

function value(selector: string, property: string, media?: string) {
  let result: string | undefined;
  if (scoped?.type !== "rule") return result;
  scoped.walkRules((rule) => {
    if (rule.selector !== selector) return;
    const mediaParams = rule.parent?.type === "atrule" ? rule.parent.params : undefined;
    if (mediaParams !== media) return;
    rule.each((node) => {
      if (node.type === "decl" && node.prop === property) result = node.value;
    });
  });
  return result;
}

describe("CSS fundamentals scoped styling", () => {
  it("preserves every source rule and media condition including comparison displays", () => {
    expect(scoped?.type).toBe("rule");
    if (scoped?.type !== "rule") throw new Error("Missing CSS fundamentals scope");
    sourceCss.walkRules((rule) => {
      if (rule.selector === "html") {
        const htmlRules: postcss.Rule[] = [];
        targetCss.walkRules(`html:has(${scope})`, (candidate) => {
          htmlRules.push(candidate);
        });
        expect(htmlRules.length).toBeGreaterThan(0);
        return;
      }
      const selector = mappedSelector(rule.selector);
      const candidates: postcss.Rule[] = [];
      scoped.walkRules((candidate) => {
        if (candidate.selector === selector) candidates.push(candidate);
      });
      if (rule.selector === ":root" || rule.selector === "body") candidates.push(scoped);
      const mediaParams = rule.parent?.type === "atrule" ? rule.parent.params : undefined;
      for (const declaration of rule.nodes ?? []) {
        if (
          declaration.type !== "decl" ||
          ["font-family", "--font-head", "--font-body", "--font-mono"].includes(declaration.prop)
        )
          continue;
        const retained = candidates.some((candidate) => {
          if (
            (candidate.parent?.type === "atrule" ? candidate.parent.params : undefined) !==
            mediaParams
          )
            return false;
          return candidate.nodes.some(
            (node) =>
              node.type === "decl" &&
              node.prop === declaration.prop &&
              node.value === declaration.value &&
              Boolean(node.important) === Boolean(declaration.important)
          );
        });
        expect(retained, `${selector}: ${declaration.prop}: ${declaration.value}`).toBe(true);
      }
    });
  });
  it("styles highlighted pre elements directly, including comparison-card padding", () => {
    expect(value(".code-wrap pre", "font-family")).toBe("var(--font-mono)");
    expect(value(".code-wrap pre", "padding")).toBe("18px 20px");
    expect(value(".code-wrap pre", "overflow-x")).toBe("auto");
    expect(value(".comp-card pre", "padding")).toBe("14px 16px");
    expect(value("pre", "white-space")).toBe("pre");
    for (const token of ["kw", "st", "fn", "cm", "nu"])
      expect(value(`.${token}`, "color"), token).toBeDefined();
  });
  it("keeps number alignment, responsive layout and readable diagram framing", () => {
    expect(value(".step-num", "flex-shrink")).toBe("0");
    expect(value(".spec-visual", "font-family")).toBe("var(--font-mono)");
    expect(value(".mermaid-wrap", "overflow-x")).toBe("auto");
    expect(value(".mermaid-wrap .mermaid", "justify-content")).toBe("safe center");
    expect(value(".mermaid svg foreignObject", "overflow")).toBe("visible");
    expect(value("#main", "margin-left", "(max-width: 900px)")).toBe("0");
    expect(value(".comp-grid", "grid-template-columns", "(max-width: 900px)")).toBe("1fr");
  });
});

it("fits the fixed sidebar and anchors beneath the existing shared header", () => {
  const rule = targetCss.nodes.find(
    (node) => node.type === "rule" && node.selector === `body.has-common-header ${scope} #sidebar`
  );
  expect(rule?.type).toBe("rule");
  if (rule?.type !== "rule") throw new Error("Missing header integration");
  const values: string[] = [];
  rule.walkDecls("top", (decl) => {
    values.push(decl.value);
  });
  expect(values).toEqual(["calc(var(--ch-height) + var(--ch-disclaimer-height, 0px))"]);
  expect(value(".section, .subsection[id]", "scroll-margin-top")).toBe(
    "calc(var(--ch-height) + var(--ch-disclaimer-height, 0px) + 24px)"
  );
});

it("enables smooth scrolling only when reduced motion is not requested", () => {
  const smooth: string[] = [];
  targetCss.walkRules("html:has(.design-system-css-fundamentals)", (rule) => {
    rule.walkDecls("scroll-behavior", (declaration) => {
      const parent = rule.parent;
      smooth.push(`${parent?.type === "atrule" ? parent.params : "root"}|${declaration.value}`);
    });
  });
  expect(smooth).toEqual(["(prefers-reduced-motion: no-preference)|smooth"]);
});
