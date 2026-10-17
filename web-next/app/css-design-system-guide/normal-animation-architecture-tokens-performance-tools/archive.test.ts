import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, it } from "vitest";

// source-contract は import 時に原本を読むため、slug はここで直接定義する
const slug = "normal-animation-architecture-tokens-performance-tools";

const hashes = {
  html: "261f9ddb9085a1170ef464841c6f4344c2b09b63bbc5696be28e88bce1df114f",
  md: "8d47d82b33b25365ba3b65f329adbd35979ff83a1b360ea10ab163f46110e055",
};
for (const ext of ["html", "md"] as const)
  it("archives unmodified original " + ext, ({ skip }) => {
    const archive = resolve("..", "archive/css-design-system-guide", slug, slug + "." + ext);
    expect(existsSync(resolve("..", "css-design-system-guide", slug + "." + ext))).toBe(false);
    // archive/ は .gitignore 対象でローカルにのみ存在するため、原本がない環境では照合を省略する
    skip(!existsSync(archive), "local archive/ not found");
    expect(createHash("sha256").update(readFileSync(archive)).digest("hex")).toBe(hashes[ext]);
  });
