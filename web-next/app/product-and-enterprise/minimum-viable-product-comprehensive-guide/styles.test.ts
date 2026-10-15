import postcss from "postcss";
import { describe, expect, it } from "vitest";
import { css, source } from "./source-contract";

const scope = ".minimum-viable-product-comprehensive-guide";
const sourceCss = postcss.parse(source.querySelector("style")?.textContent ?? "");
const targetCss = postcss.parse(css);
const scoped = targetCss.nodes.find((node) => node.type === "rule" && node.selector === scope);

describe("MVP scoped styles", () => {
  it("retains source baseline declarations beneath page-specific design overrides", () => {
    expect(scoped?.type).toBe("rule");
    if (scoped?.type !== "rule") throw new Error("Missing MVP style scope");
    sourceCss.walkRules((rule) => {
      if (rule.selector === "html") {
        const htmlRules: postcss.Rule[] = [];
        targetCss.walkRules(`html:has(${scope})`, (candidate) => {
          htmlRules.push(candidate);
        });
        expect(htmlRules[0]?.type).toBe("rule");
        const parent = htmlRules[0]?.parent;
        expect(parent?.type === "atrule" ? parent.params : undefined).toBe(
          "(prefers-reduced-motion: no-preference)"
        );
        return;
      }
      const selector = rule.selector.replace(/\.ti-/g, ".icon-").replace(/\.ti\b/g, ".mvp-icon");
      const candidates: postcss.Rule[] = [];
      scoped.walkRules((candidate) => {
        if (candidate.selector === selector) candidates.push(candidate);
      });
      if (rule.selector === ":root" || rule.selector === "body") candidates.push(scoped);
      const originalMedia = rule.parent?.type === "atrule" ? rule.parent.params : undefined;
      const actual = candidates.find(
        (candidate) =>
          (candidate.parent?.type === "atrule" ? candidate.parent.params : undefined) ===
          originalMedia
      );
      expect(actual, selector).toBeDefined();
      rule.walkDecls((decl) => {
        if (
          decl.prop === "font-family" ||
          decl.prop === "--font-sans" ||
          decl.prop === "--font-mono"
        )
          return;
        const matches: string[] = [];
        actual?.each((node) => {
          if (node.type === "decl" && node.prop === decl.prop) matches.push(node.value);
        });
        expect(matches, `${selector}: ${decl.prop}`).toContain(decl.value);
      });
    });
  });
  it("keeps list dots, numbers, responsive layout and code typography explicit", () => {
    expect(scoped?.type).toBe("rule");
    if (scoped?.type !== "rule") throw new Error("Missing MVP style scope");
    const declaration = (selector: string, prop: string) => {
      let value: string | undefined;
      scoped.walkRules((rule) => {
        if (rule.selector === selector)
          rule.walkDecls(prop, (decl) => {
            value = decl.value;
          });
      });
      return value;
    };
    expect(declaration(".sources li::before", "content")).toBe("''");
    expect(declaration(".sources li::before", "width")).toBe("4px");
    expect(declaration(".rule-num", "border-radius")).toBe("50%");
    expect(declaration(".check-list", "list-style")).toBe("none");
    expect(declaration('pre[class*="language-"]', "font-family")).toBe("var(--font-mono)");
    expect(declaration('pre[class*="language-"]', "white-space")).toBe("pre");
    expect(declaration(".mermaid-wrap", "overflow-x")).toBe("auto");
    expect(declaration(".mermaid svg foreignObject", "overflow")).toBe("visible");
  });
});

it("offsets section anchors below the existing fixed common header and disclaimer", () => {
  const selector = `body.has-common-header ${scope} .section`;
  const rule = targetCss.nodes.find((node) => node.type === "rule" && node.selector === selector);
  expect(rule?.type).toBe("rule");
  if (rule?.type !== "rule") throw new Error("Missing common header integration");
  const values: string[] = [];
  rule.walkDecls("scroll-margin-top", (decl) => {
    values.push(decl.value);
  });
  expect(values).toEqual(["calc(var(--ch-height) + var(--ch-disclaimer-height, 0px) + 24px)"]);
});

// Resolve the last page-scoped declaration in the requested media context.
function designValue(selector: string, property: string, media?: string) {
  let value: string | undefined;
  targetCss.walkRules((rule) => {
    if (rule.selector !== selector) return;
    let parent: postcss.Rule | postcss.AtRule | postcss.Root | postcss.Document | undefined =
      rule.parent;
    let pageScoped = rule.selector === scope;
    let mediaParams: string | undefined;
    while (parent) {
      if (parent.type === "rule" && parent.selector === scope) pageScoped = true;
      if (parent.type === "atrule" && parent.name === "media") mediaParams = parent.params;
      parent = parent.parent;
    }
    if (pageScoped && mediaParams === media)
      rule.each((node) => {
        if (node.type === "decl" && node.prop === property) value = node.value;
      });
  });
  return value;
}

describe("MVP fluid layout", () => {
  it("fills the available viewport width without a capped main column", () => {
    expect(designValue(scope, "display")).toBe("grid");
    expect(designValue(scope, "grid-template-columns")).toBe("var(--sidebar-width) minmax(0, 1fr)");
    expect(designValue(".main", "max-width")).toBe("none");
    expect(designValue(".main", "width")).toBe("100%");
    expect(designValue(".main", "min-width")).toBe("0");
    expect(designValue(".page-description", "max-width")).toBe("none");
  });
  it("keeps navigation visible below the fixed header and gives mobile the full width", () => {
    expect(designValue(".sidebar", "position")).toBe("sticky");
    expect(designValue(".sidebar", "top")).toBe(
      "calc(var(--ch-height) + var(--ch-disclaimer-height, 0px))"
    );
    expect(designValue(".sidebar", "overflow-y")).toBe("auto");
    expect(designValue(scope, "grid-template-columns", "(max-width: 768px)")).toBe(
      "minmax(0, 1fr)"
    );
    expect(designValue(".sidebar", "display", "(max-width: 768px)")).toBe("none");
    expect(designValue(".main", "padding", "(max-width: 768px)")).toBe("24px 16px 48px");
  });
});

describe("MVP visual refinement", () => {
  it("improves text contrast and establishes a clear title and section hierarchy", () => {
    expect(designValue(scope, "--color-text-secondary")).toBe("#b4c0d0");
    expect(designValue(scope, "--color-text-tertiary")).toBe("#91a2b8");
    expect(designValue(".page-title", "font-size")).toBe("clamp(28px, 3vw, 44px)");
    expect(designValue(".page-header", "border-radius")).toBe("24px");
    expect(designValue(".section", "border-radius")).toBe("20px");
    expect(designValue("h2", "font-weight")).toBe("700");
    expect(designValue("h3", "font-size")).toBe("18px");
  });
  it("refines cards, tables and diagram framing while preserving reading safeguards", () => {
    expect(designValue(".cards", "grid-template-columns")).toBe(
      "repeat(auto-fit, minmax(min(100%, 240px), 1fr))"
    );
    expect(designValue(".card", "border-radius")).toBe("16px");
    expect(designValue("th", "color")).toBe("var(--color-text-primary)");
    expect(designValue(".mermaid-wrap", "overflow-x")).toBe("auto");
    expect(designValue(".mermaid", "min-width")).toBe("0");
    expect(designValue(".section", "padding", "(max-width: 768px)")).toBe("22px 16px");
    expect(designValue(".card", "transition", "(prefers-reduced-motion: reduce)")).toBe("none");
    expect(css).not.toMatch(/\.minimum-viable-product-comprehensive-guide[^}]*100vw/s);
  });
  it("lets narrow screens reach every chapter through a toggled sidebar overlay", () => {
    expect(designValue(".toc-toggle", "display")).toBe("none");
    expect(designValue(".toc-toggle", "display", "(max-width: 768px)")).toBe("flex");
    expect(designValue(".sidebar.open", "display", "(max-width: 768px)")).toBe("block");
    expect(designValue(".sidebar.open", "position", "(max-width: 768px)")).toBe("fixed");
  });
});
