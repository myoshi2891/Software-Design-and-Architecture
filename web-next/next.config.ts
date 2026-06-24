import path from "node:path";
import type { NextConfig } from "next";

// ESM / CommonJS 両方のトランスパイル環境で __dirname の未定義エラーを防ぐ
const resolvedDirname = typeof __dirname !== "undefined" ? __dirname : ".";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(resolvedDirname, ".."),
  },
};

export default nextConfig;
