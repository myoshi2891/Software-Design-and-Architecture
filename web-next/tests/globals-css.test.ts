import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { transform } from "lightningcss";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");

describe("global CSS transformation", () => {
  it("transforms the entire stylesheet without dropping invalid rules", () => {
    const result = transform({
      filename: "globals.css",
      code: Buffer.from(css),
      errorRecovery: true,
    });
    expect(result.warnings).toEqual([]);

    const original = postcss.parse(css);
    const transformed = postcss.parse(result.code.toString());
    const originalNames: string[] = [];
    const transformedNames: string[] = [];
    original.walkAtRules("keyframes", (rule) => {
      originalNames.push(rule.params);
    });
    transformed.walkAtRules("keyframes", (rule) => {
      transformedNames.push(rule.params);
    });
    expect(transformedNames.sort()).toEqual(originalNames.sort());

    // 通常ルールも保持されていること（keyframes を使う 3 ガイドの代表ルールのみ確認）
    const retained: string[] = [];
    transformed.walkDecls("animation", (declaration) => {
      const selectors: string[] = [];
      for (
        let parent = declaration.parent;
        parent && parent.type !== "root";
        parent = parent.parent
      )
        if (parent.type === "rule") selectors.unshift((parent as postcss.Rule).selector);
      retained.push(`${selectors.join(" > ")} { animation: ${declaration.value} }`);
    });
    expect(retained).toEqual(
      expect.arrayContaining([
        ".clean-architecture-comprehensive-guide > & .r-fw { animation: 3.6s ease-in-out infinite p-fw }",
        ".microservices-architecture-comprehensive-guide > & .hdot { animation: 2.2s ease-in-out infinite pulse-ms }",
        ".css-color-typography-spacing-systems > & .hero-ew-dot { animation: 2s infinite css-color-typography-pulse }",
      ])
    );
  });

  it("retains the typography hero pulse and its matching animation reference", () => {
    const result = transform({ filename: "globals.css", code: Buffer.from(css) });
    const transformed = postcss.parse(result.code.toString());
    const frames: string[] = [];
    const animations: string[] = [];
    transformed.walkAtRules("keyframes", (rule) => {
      if (rule.params !== "css-color-typography-pulse") return;
      expect(rule.parent?.type).toBe("root");
      rule.walkRules((frame) => {
        frames.push(frame.selector);
      });
    });
    const reducedMotion: string[] = [];
    const insideMedia = (node: postcss.Node) => {
      for (let parent = node.parent; parent; parent = parent.parent)
        if (parent.type === "atrule" && (parent as postcss.AtRule).name === "media") return parent;
      return undefined;
    };
    transformed.walkRules((rule) => {
      if (!rule.selector.includes(".hero-ew-dot")) return;
      const media = insideMedia(rule);
      rule.walkDecls("animation", (declaration) => {
        if (!media) animations.push(declaration.value);
        else if ((media as postcss.AtRule).params.includes("prefers-reduced-motion: reduce"))
          reducedMotion.push(declaration.value);
      });
    });
    expect(frames).toEqual(["0%, 100%", "50%"]);
    expect(animations).toEqual(["2s infinite css-color-typography-pulse"]);
    expect(reducedMotion).toEqual(["none"]);
  });
});
