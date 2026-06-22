import { JetBrains_Mono, Noto_Sans_JP } from "next/font/google";

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
