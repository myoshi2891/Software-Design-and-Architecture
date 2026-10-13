import type { Metadata } from "next";
import { NAV_GROUPS } from "./navigation";
import TogafGuideShell, { type TogafPanel } from "./TogafGuideShell";

export const metadata: Metadata = {
  title: "TOGAF 完全解説ガイド",
  description:
    "The Open Group Architecture Framework — ビジネスとITを整合させる世界標準のエンタープライズアーキテクチャフレームワーク。",
};

export default function Page() {
  const panels: TogafPanel[] = [];
  return (
    <div className="togaf-certification-comprehensive-guide">
      <TogafGuideShell groups={NAV_GROUPS} panels={panels} />
    </div>
  );
}
