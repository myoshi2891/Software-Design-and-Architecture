import postcss from "postcss";
import { describe, expect, it } from "vitest";
import { css, source } from "./source-contract";

const scope = ".minimum-viable-product-comprehensive-guide";
const sourceCss = postcss.parse(source.querySelector("style")?.textContent ?? "");
const targetCss = postcss.parse(css);
const scoped = targetCss.nodes.find((node) => node.type === "rule" && node.selector === scope);

describe("MVP scoped styles", () => {
  it("preserves every source CSS declaration and media condition", () => {
    expect(scoped?.type).toBe("rule");
    if (scoped?.type !== "rule") throw new Error("Missing MVP style scope");
    sourceCss.walkRules((rule) => {
      if (rule.selector === "html") {
        const htmlRule = targetCss.nodes.find(
          (node) => node.type === "rule" && node.selector === `html:has(${scope})`
        );
        expect(htmlRule?.type).toBe("rule");
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
