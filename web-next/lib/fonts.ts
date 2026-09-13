import { JetBrains_Mono, Noto_Sans_JP, Shippori_Mincho, Source_Serif_4 } from "next/font/google";

// 本文用: Noto Sans JP（元 HTML の Hiragino/Noto Sans JP 指定を next/font で読み込み）
export const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

// コードブロック用: JetBrains Mono（元 HTML の --font-mono 先頭指定）
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// 見出し用明朝体: Shippori Mincho（Building LLM Powered Applications ガイド）
export const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

// 見出し用欧文セリフ体: Source Serif 4
export const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-serif-4",
  display: "swap",
});
