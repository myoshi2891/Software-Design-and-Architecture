import { readFileSync } from "node:fs";
import postcss from "postcss";
import { expect, it } from "vitest";
import { slug, source } from "./source-contract";

const css = postcss.parse(readFileSync("app/globals.css", "utf8"));
const original = postcss.parse(source.querySelector("style")!.textContent!);
function scope() {
  const n = css.nodes.find((n) => n.type === "rule" && n.selector === "." + slug);
  expect(n).toBeDefined();
  if (n?.type !== "rule") throw Error("missing page scope");
  return n;
}
function media(n: postcss.ChildNode) {
  return n.parent?.type === "atrule" ? (n.parent as postcss.AtRule).params : undefined;
}
it("preserves every CSS declaration, selector and media condition", () => {
  const page = scope();
  original.walkRules((rule) => {
    if (rule.selector === "html" || rule.selector.startsWith(".code-card pre code")) return;
    const candidates: postcss.Rule[] = [];
    page.walkRules(rule.selector, (r) => {
      candidates.push(r);
    });
    if ([":root", "body"].includes(rule.selector)) candidates.push(page);
    for (const d of rule.nodes) {
      if (
        d.type !== "decl" ||
        ["--font-display", "--font-body", "--font-mono", "justify-content"].includes(d.prop)
      )
        continue;
      expect(
        candidates.some(
          (r) =>
            media(r) === media(rule) &&
            r.nodes.some(
              (n) =>
                n.type === "decl" &&
                n.prop === d.prop &&
                n.value === d.value &&
                !!n.important === !!d.important
            )
        ),
        rule.selector + ": " + d.prop + ": " + d.value
      ).toBe(true);
    }
  });
});
it("explicitly keeps list bullets, numbered steps, syntax colors and readable diagrams", () => {
  const page = scope();
  const value = (s: string, p: string) => {
    let v: string | undefined;
    page.walkRules(s, (r) => {
      r.walkDecls(p, (d) => {
        v = d.value;
      });
    });
    return v;
  };
  expect(value("ul", "list-style-type")).toBe("disc");
  expect(value("ol", "list-style-type")).toBe("decimal");
  expect(value(".refs ul", "list-style")).toBe("none");
  expect(value(".step__num::before", "content")).toBe("counter(step)");
  expect(value(".code-card pre", "font-family")).toBe("var(--font-mono)");
  expect(value(".code-card pre", "white-space")).toBe("pre");
  for (const c of ["kw", "st", "fn", "cm", "nu"]) expect(value("." + c, "color")).toBeDefined();
  expect(value(".mermaid", "justify-content")).toBe("safe center");
  expect(value(".mermaid svg foreignObject", "overflow")).toBe("visible");
  page.walkRules((r) => {
    if (!r.selector.includes("svg")) return;
    r.walkDecls((d) => {
      expect(["max-height", "font-size"], r.selector).not.toContain(d.prop);
    });
  });
});
it("loads source font families through a route layout and offsets shared chrome", () => {
  const layout = readFileSync("app/css-design-system-guide/" + slug + "/layout.tsx", "utf8");
  expect(layout).toContain("inter.variable");
  const fonts = readFileSync("app/css-design-system-guide/" + slug + "/route-fonts.ts", "utf8");
  expect(fonts).toContain("next/font/google");
  expect(fonts).toContain("800");
  let offset = false;
  css.walkRules((r) => {
    if (r.selector.includes(slug) && r.selector.includes("has-common-header"))
      r.walkDecls("top", (d) => {
        offset = d.value.includes("--ch-height") && d.value.includes("--ch-disclaimer-height");
      });
  });
  expect(offset).toBe(true);
});
