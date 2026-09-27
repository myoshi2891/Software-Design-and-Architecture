"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export type NavItem = {
  id: string;
  num: string;
  label: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

type Props = {
  groups: NavGroup[];
};

/**
 * OOP 完全ガイドのサイドバーナビゲーション（進捗バー + scroll-spy 付き）。
 */
export default function OopSidebar({ groups }: Props) {
  const progressRef = useScrollProgress();
  const activeId = useScrollSpy("section.section, div.section", groups[0]?.items[0]?.id ?? null);

  return (
    <>
      <div className="progress-bar" ref={progressRef} />
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="badge">OOP</span>
          </div>
          <div className="sidebar-title">
            オブジェクト指向
            <br />
            プログラミング
          </div>
          <div className="sidebar-sub">完全ガイド — Python 実装例つき</div>
        </div>
        <nav className="sidebar-nav">
          {groups.map((group) => (
            <div key={group.label} className="nav-group">
              <div className="nav-section-label">{group.label}</div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-item ${activeId === item.id ? "active" : ""}`}
                  aria-current={activeId === item.id ? "location" : undefined}
                >
                  <span className="nav-num">{item.num}</span>
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
