import { Inter, Space_Grotesk } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-grid-body",
  display: "swap",
});
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grid-head",
  display: "swap",
});
