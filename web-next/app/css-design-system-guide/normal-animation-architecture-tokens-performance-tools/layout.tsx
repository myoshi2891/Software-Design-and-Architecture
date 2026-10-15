import type { ReactNode } from "react";
import { inter, mono, noto } from "./route-fonts";
export default function Layout({ children }: { children: ReactNode }) {
  return <div className={`${inter.variable} ${noto.variable} ${mono.variable}`}>{children}</div>;
}
