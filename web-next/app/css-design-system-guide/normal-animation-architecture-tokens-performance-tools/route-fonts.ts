import { Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-animation-inter",
  display: "swap",
});
export const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-animation-noto",
  display: "swap",
});
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-animation-mono",
  display: "swap",
});
