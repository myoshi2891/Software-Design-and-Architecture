import path from "node:path";
import type { NextConfig } from "next";

// ESM / CommonJS 両方のトランスパイル環境で __dirname の未定義エラーを防ぐ
const resolvedDirname = typeof __dirname !== "undefined" ? __dirname : ".";

const nextConfig: NextConfig = {
  // Netlify で out/ を静的配信する（動的機能・next/image・proxy は未使用）
  output: "export",
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(resolvedDirname, ".."),
  },
};

export default nextConfig;
