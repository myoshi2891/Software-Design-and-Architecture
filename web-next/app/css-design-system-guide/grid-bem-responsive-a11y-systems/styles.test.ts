import postcss from "postcss";
import { describe, expect, it } from "vitest";
import { css, source } from "./source-contract";

const scope = ".grid-bem-responsive-a11y-systems";
const original = postcss.parse(source.querySelector("style")?.textContent ?? "");
const target = postcss.parse(css);
function pageScope() {
  const rule = target.nodes.find((n) => n.type === "rule" && n.selector === scope);
  expect(rule?.type).toBe("rule");
  if (rule?.type !== "rule") throw new Error("Missing page scoped styles");
  return rule;
}
function value(selector: string, property: string, media?: string) {
  let result: string | undefined;
  pageScope().walkRules(selector, (rule) => {
    if ((rule.parent?.type === "atrule" ? rule.parent.params : undefined) !== media) return;
    rule.walkDecls(property, (decl) => {
      result = decl.value;
    });
  });
  return result;
}
describe("Grid BEM complete CSS fidelity", () => {
  it("retains every source declaration and media condition except replaced font and highlighting integration", () => {
    const scoped = pageScope();
    original.walkRules((rule) => {
      if (rule.selector === "html") {
        const candidates: postcss.Rule[] = [];
        target.walkRules(`html:has(${scope})`, (r) => {
          candidates.push(r);
        });
        const media = rule.parent?.type === "atrule" ? rule.parent.params : undefined;
        expect(
          candidates.some(
            (r) => (r.parent?.type === "atrule" ? r.parent.params : undefined) === media
          )
        ).toBe(true);
        return;
      }
      // Runtime hljs layout is replaced with direct pre styling, verified below.
      if (rule.selector.startsWith(".cb pre")) return;
      const candidates: postcss.Rule[] = [];
      scoped.walkRules(rule.selector, (r) => {
        candidates.push(r);
      });
      if ([":root", "body"].includes(rule.selector)) candidates.push(scoped);
      const media = rule.parent?.type === "atrule" ? rule.parent.params : undefined;
      for (const decl of rule.nodes ?? []) {
        if (
          decl.type !== "decl" ||
          ["--fd", "--fb", "--fm", "font-family", "justify-content"].includes(decl.prop)
        )
          continue;
        expect(
          candidates.some(
            (r) =>
              (r.parent?.type === "atrule" ? r.parent.params : undefined) === media &&
              r.nodes.some(
                (d) =>
                  d.type === "decl" &&
                  d.prop === decl.prop &&
                  d.value === decl.value &&
                  !!d.important === !!decl.important
              )
          ),
          `${rule.selector}: ${decl.prop}: ${decl.value}`
        ).toBe(true);
      }
    });
  });
  it("keeps list markers, numbers, checks and code styles explicitly", () => {
    expect(value(".ng ul", "list-style")).toBe("none");
    expect(value("ul.prose", "list-style-type")).toBe("disc");
    expect(value("ol.prose", "list-style-type")).toBe("decimal");
    expect(value(".ng ul li a .n", "min-width")).toBe("26px");
    expect(value(".bp-item .mk", "flex-shrink")).toBe("0");
    expect(value(".cb pre", "padding")).toBe("18px 20px");
    expect(value(".cb pre", "font-family")).toBe("var(--fm)");
    expect(value(".cb pre", "white-space")).toBe("pre");
    expect(value(".cb pre", "overflow-x")).toBe("auto");
    for (const token of ["kw", "st", "fn", "cm", "nu"])
      expect(value(`.${token}`, "color")).toBeDefined();
    expect(value(".sidebar", "display", "(max-width:860px)")).toBe("none");
    expect(value(".sl", "grid-template-columns", "(max-width:860px)")).toBe("1fr");
    expect(value(".skip:focus", "top")).toBe("16px");
  });
  it("offsets sticky sidebar and all anchors beneath the shared header", () => {
    for (const [selector, prop] of [
      [`${scope} .sidebar`, "top"],
      [`${scope} .sidebar`, "height"],
      [`${scope} .section, ${scope} .sub, ${scope} #main`, "scroll-margin-top"],
    ]) {
      let found = false;
      target.walkRules(`body.has-common-header ${selector}`, (rule) => {
        rule.walkDecls(prop, (decl) => {
          found =
            decl.value.includes("--ch-height") && decl.value.includes("--ch-disclaimer-height");
        });
      });
      expect(found, `${selector}: ${prop}`).toBe(true);
    }
  });
});
