import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// このテストファイル自身が app/ 直下にあるため、そこを基準に解決する。
// process.cwd() 基準だと、呼び出し元の作業ディレクトリ次第でパスがずれる。
const appDir = dirname(fileURLToPath(import.meta.url));

describe("favicon assets", () => {
  it("provides a scalable SVG icon via the App Router file convention", () => {
    const svgPath = join(appDir, "icon.svg");
    expect(existsSync(svgPath)).toBe(true);

    const svg = readFileSync(svgPath, "utf8");
    // 正方形 viewBox でないとタブ表示で歪む
    expect(svg).toContain('viewBox="0 0 32 32"');
    // ダークタブ・ライトタブ双方で視認できるよう背景色を自前で塗る
    expect(svg).toContain("#0f1117");
  });

  it("provides an Apple touch icon at the required 180x180 size", () => {
    const pngPath = join(appDir, "apple-icon.png");
    expect(existsSync(pngPath)).toBe(true);

    // PNG の IHDR から幅・高さを読み取る（16..24 バイト目）
    const png = readFileSync(pngPath);
    expect(png.readUInt32BE(16)).toBe(180);
    expect(png.readUInt32BE(20)).toBe(180);
  });
});
