"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export type NavItem = {
  id: string;
  num: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "s1", num: "1", label: "XPとは何か" },
  { id: "s2", num: "2", label: "5つの価値" },
  { id: "s3", num: "3", label: "13のプラクティス" },
  { id: "s4", num: "4", label: "TDD" },
  { id: "s5", num: "5", label: "ペアプログラミング" },
  { id: "s6", num: "6", label: "継続的インテグレーション" },
  { id: "s7", num: "7", label: "リファクタリング" },
  { id: "s8", num: "8", label: "シンプルな設計" },
  { id: "s9", num: "9", label: "小さなリリース" },
  { id: "s10", num: "10", label: "計画ゲーム" },
  { id: "s11", num: "11", label: "コレクティブオーナーシップ" },
  { id: "s12", num: "12", label: "コーディング規約" },
  { id: "s13", num: "13", label: "オンサイト顧客" },
  { id: "s14", num: "14", label: "週40時間労働" },
  { id: "s15", num: "15", label: "メタファー" },
  { id: "s16", num: "16", label: "システム全体テスト" },
  { id: "s17", num: "17", label: "ロールと責務" },
  { id: "s18", num: "18", label: "イテレーションサイクル" },
  { id: "s19", num: "19", label: "XP vs Scrum" },
  { id: "s20", num: "20", label: "導入ロードマップ" },
  { id: "s21", num: "21", label: "アンチパターン" },
  { id: "s22", num: "22", label: "ベストプラクティス" },
  { id: "s23", num: "23", label: "参考文献" },
];

type Props = {
  items?: NavItem[];
};

/**
 * XP包括ガイドの固定サイドバーおよび進捗バーコンポーネント。
 */
export default function XpSidebar({ items = NAV_ITEMS }: Props) {
  const progressRef = useScrollProgress();
  const activeId = useScrollSpy(".section-anchor", items[0]?.id ?? "s1");

  return (
    <>
      <div id="pb" ref={progressRef} style={{ transformOrigin: "0 50%" }} />
      <aside id="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">XP完全ガイド</div>
          <div className="sidebar-sub">Extreme Programming</div>
        </div>
        <nav className="sidebar-nav" id="nav" aria-label="セクションナビゲーション">
          {items.map((item) => (
            <a
              key={item.id}
              className={`nav-btn ${activeId === item.id ? "active" : ""}`}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
            >
              {item.num}. {item.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">Kent Beck, 1999 — 2004</div>
      </aside>
    </>
  );
}
