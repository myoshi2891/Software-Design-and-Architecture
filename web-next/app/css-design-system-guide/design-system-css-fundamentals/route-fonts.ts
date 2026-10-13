import { Inter, Space_Grotesk } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-css-fundamentals-body",
  display: "swap",
});
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-css-fundamentals-head",
  display: "swap",
});
