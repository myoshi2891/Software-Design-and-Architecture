import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
export const slug = "normal-animation-architecture-tokens-performance-tools";
const original = resolve(process.cwd(), "..", "css-design-system-guide", slug + ".html");
export const source = new DOMParser().parseFromString(
  readFileSync(
    existsSync(original)
      ? original
      : resolve(process.cwd(), "..", "archive/css-design-system-guide", slug, slug + ".html"),
    "utf8"
  ),
  "text/html"
);
export const compact = (s: string | null) => (s ?? "").replace(/\s+/g, " ").trim();
export const normalize = (s: string) =>
  s
    .trim()
    .split("\n")
    .map((l) =>
      l
        .trim()
        .replaceAll("（", "(")
        .replaceAll("）", ")")
        .replaceAll("：", ":")
        .replaceAll("〜", "から")
        .replaceAll("―", "-")
        .replaceAll("\\n", "<br/>")
    )
    .filter(Boolean)
    .join("\n");
