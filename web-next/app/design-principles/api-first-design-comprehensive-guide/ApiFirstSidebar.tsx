"use client";
import { IconApi } from "@tabler/icons-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export type NavItem = {
  id: string;
  emoji: string;
  label: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

type Props = {
  groups: NavGroup[];
};

/**
  Renders the API-First design guide sidebar navigation.
  *
  * @param groups - Navigation groups to display in the sidebar
  */
export default function ApiFirstSidebar({ groups }: Props) {
  const progressRef = useScrollProgress();
  const activeId = useScrollSpy("section.section", groups[0]?.items[0]?.id ?? null);

  return (
    <>
      <div className="progress-bar" ref={progressRef} />
      <aside className="sidebar">
        <div className="sb-logo">
          <IconApi size={20} className="sb-logo-icon" />
          <div className="sb-logo-title">API-First設計</div>
          <div className="sb-logo-sub">完全ガイド — 初学者から実践者まで</div>
        </div>
        <nav className="sb-nav">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="sb-label">{group.title}</div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  className={activeId === item.id ? "active" : ""}
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "location" : undefined}
                >
                  <span className="nav-em">{item.emoji}</span>
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
