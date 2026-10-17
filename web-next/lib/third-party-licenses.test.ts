// [Red] 契約テスト (third-party-licenses)。/licenses ページのデータ。
//
// 固定する契約:
// - package.json の dependencies をすべて列挙する（依存追加時の記載漏れを検出）。
// - next/font/google で読み込むフォントをすべて SIL OFL 1.1 として列挙する。
// - 各エントリは name / license / copyright / url が非空で、url は https。

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { fontLicenses, packageLicenses } from "@/lib/third-party-licenses";

const pkg: unknown = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));

function dependencyNames(value: unknown): string[] {
  if (typeof value !== "object" || value === null || !("dependencies" in value)) return [];
  const deps = value.dependencies;
  if (typeof deps !== "object" || deps === null) return [];
  return Object.keys(deps);
}

const FONT_SOURCES = [
  "lib/fonts.ts",
  "app/css-design-system-guide/design-system-css-fundamentals/route-fonts.ts",
  "app/css-design-system-guide/grid-bem-responsive-a11y-systems/route-fonts.ts",
  "app/css-design-system-guide/normal-animation-architecture-tokens-performance-tools/route-fonts.ts",
];

function googleFontNames(): string[] {
  const names = new Set<string>();
  for (const file of FONT_SOURCES) {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    const match = source.match(/import \{([^}]+)\} from "next\/font\/google"/);
    for (const name of match?.[1]?.split(",") ?? []) names.add(name.trim().replaceAll("_", " "));
  }
  return [...names].filter(Boolean);
}

describe("packageLicenses", () => {
  it("lists every runtime dependency in package.json", () => {
    const listed = packageLicenses.map((p) => p.name);
    for (const dep of dependencyNames(pkg)) expect(listed).toContain(dep);
  });

  it("gives every entry a license, copyright and https url", () => {
    for (const entry of [...packageLicenses, ...fontLicenses]) {
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.license.length).toBeGreaterThan(0);
      expect(entry.copyright.length).toBeGreaterThan(0);
      expect(entry.url.startsWith("https://")).toBe(true);
    }
  });
});

describe("fontLicenses", () => {
  it("lists every next/font/google family under SIL OFL 1.1", () => {
    const names = googleFontNames();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      const entry = fontLicenses.find((f) => f.name === name);
      expect(entry, name).toBeDefined();
      expect(entry?.license).toBe("SIL Open Font License 1.1");
    }
  });

  // 配布元 (google/fonts の ofl/<family>/OFL.txt) の著作権行をそのまま保持する。
  it.each([
    [
      "Noto Sans JP",
      "Copyright 2014-2021 Adobe (http://www.adobe.com/), with Reserved Font Name 'Source'",
    ],
    [
      "Source Serif 4",
      "Copyright 2014 The Source Serif 4 Project Authors (https://github.com/adobe-fonts/source-serif)",
    ],
  ])("keeps the upstream copyright notice of %s", (name, copyright) => {
    expect(fontLicenses.find((f) => f.name === name)?.copyright).toBe(copyright);
  });
});
