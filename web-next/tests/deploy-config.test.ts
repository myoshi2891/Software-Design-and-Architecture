// [Red] デプロイ設定の契約テスト（Netlify / 静的エクスポート）。
//
// 固定する契約:
// - next.config は output: "export"（out/ を Netlify が静的配信する）。
// - リポジトリルートの netlify.toml: base=web-next / publish=out / npm run build、
//   NODE_VERSION=22、NPM_FLAGS=--legacy-peer-deps（npm 10 の peer 解決不具合の回避）、
//   基本的なセキュリティヘッダ。
// - bun.lock は追跡外のため Netlify は npm で解決する。npm は直接依存と同名の
//   override の指定が異なると EOVERRIDE で失敗するため、両者の指定を一致させる。

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "@/next.config";

const toml = readFileSync(join(process.cwd(), "..", "netlify.toml"), "utf8");
const pkg: unknown = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));

function record(value: unknown, key: string): Record<string, string> {
  if (typeof value !== "object" || value === null || !(key in value)) return {};
  const field: unknown = (value as Record<string, unknown>)[key];
  if (typeof field !== "object" || field === null) return {};
  return Object.fromEntries(
    Object.entries(field).filter((entry): entry is [string, string] => typeof entry[1] === "string")
  );
}

describe("next.config", () => {
  it("builds a static export", () => {
    expect(nextConfig.output).toBe("export");
  });
});

describe("netlify.toml", () => {
  it.each([
    'base = "web-next"',
    'publish = "out"',
    'command = "npm run build"',
    'NODE_VERSION = "22"',
    'NPM_FLAGS = "--legacy-peer-deps"',
  ])("declares %s", (line) => {
    expect(toml).toContain(line);
  });

  it.each([
    'X-Content-Type-Options = "nosniff"',
    'Referrer-Policy = "strict-origin-when-cross-origin"',
    'X-Frame-Options = "DENY"',
    "Permissions-Policy =",
  ])("sets header %s", (header) => {
    expect(toml).toContain(header);
  });
});

describe("package.json overrides", () => {
  it("match the spec of any direct dependency with the same name", () => {
    const direct = { ...record(pkg, "dependencies"), ...record(pkg, "devDependencies") };
    for (const [name, spec] of Object.entries(record(pkg, "overrides"))) {
      if (name in direct) expect(spec, name).toBe(direct[name]);
    }
  });
});
