"use client";
import { IconHexagon } from "@tabler/icons-react";
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
 * Renders the sidebar navigation for the hexagonal architecture guide.
 *
 * @param groups - Navigation groups to display in the sidebar
 */
export default function HexagonalArchitectureSidebar({ groups }: Props) {
  const progressRef = useScrollProgress();
  const activeId = useScrollSpy("section.section", groups[0]?.items[0]?.id ?? null);

  return (
    <>
      <div className="progress-bar" ref={progressRef} />
      <aside className="sidebar">
        <div className="sb-logo">
          <IconHexagon size={20} className="sb-logo-icon" />
          <div className="sb-logo-title">Hexagonal Architecture</div>
          <div className="sb-logo-sub">完全ガイド — 初学者向け解説</div>
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
