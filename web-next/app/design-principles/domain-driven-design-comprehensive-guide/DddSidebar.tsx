"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export type NavItem = {
  id: string;
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
 * DDD 完全ガイドのサイドバーナビゲーション（進捗バー + scroll-spy 付き）。
 */
export default function DddSidebar({ groups }: Props) {
  const progressRef = useScrollProgress();
  const activeId = useScrollSpy("section.section, div.section", groups[0]?.items[0]?.id ?? null);

  return (
    <>
      <div className="progress-bar" ref={progressRef} />
      <nav id="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">Architecture Guide</div>
          <div className="sidebar-title">DDD 完全ガイド</div>
        </div>
        <div className="sidebar-nav">
          {groups.map((group) => (
            <div className="nav-group" key={group.label}>
              <div className="nav-group-label">{group.label}</div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-item ${activeId === item.id ? "active" : ""}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
