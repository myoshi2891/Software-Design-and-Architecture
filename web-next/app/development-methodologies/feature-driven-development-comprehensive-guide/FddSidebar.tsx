"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export type NavItem = {
  id: string;
  num: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "s1", num: "01", label: "FDDとは何か" },
  { id: "s2", num: "02", label: "全体構造と5プロセス" },
  { id: "s3", num: "03", label: "P1: 全体モデルの開発" },
  { id: "s4", num: "04", label: "P2: フィーチャーリスト" },
  { id: "s5", num: "05", label: "P3: 計画策定" },
  { id: "s6", num: "06", label: "P4: フィーチャー設計" },
  { id: "s7", num: "07", label: "P5: フィーチャー構築" },
  { id: "s8", num: "08", label: "ロール定義" },
  { id: "s9", num: "09", label: "フィーチャーの記述" },
  { id: "s10", num: "10", label: "進捗管理と報告" },
  { id: "s11", num: "11", label: "他手法との比較" },
  { id: "s12", num: "12", label: "ECサイト完全事例" },
  { id: "s13", num: "13", label: "ベストプラクティス" },
  { id: "s14", num: "14", label: "アンチパターン" },
  { id: "s15", num: "15", label: "参考文献" },
];

type Props = {
  items?: NavItem[];
};

export default function FddSidebar({ items = NAV_ITEMS }: Props) {
  const progressRef = useScrollProgress();
  const activeId = useScrollSpy("section[id]", items[0]?.id ?? "s1");

  return (
    <>
      <div id="pb" ref={progressRef} style={{ transformOrigin: "0 50%" }} />
      <nav className="sidebar">
        <div className="sidebar-title">FDD 完全ガイド</div>
        {items.map((item) => (
          <a
            key={item.id}
            className={`nav-item ${activeId === item.id ? "active" : ""}`}
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "location" : undefined}
          >
            <span className="nav-num">{item.num}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </>
  );
}
