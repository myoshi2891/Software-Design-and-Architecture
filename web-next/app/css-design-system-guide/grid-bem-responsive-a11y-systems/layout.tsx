import type { ReactNode } from "react";
import { inter, spaceGrotesk } from "./route-fonts";
export default function Layout({ children }: { children: ReactNode }) {
  return <div className={`${inter.variable} ${spaceGrotesk.variable}`}>{children}</div>;
}
