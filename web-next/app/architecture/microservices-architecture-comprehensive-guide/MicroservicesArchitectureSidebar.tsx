"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export type NavItem = {
  id: string;
  num: string;
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
 * Renders the sidebar navigation for the microservices architecture guide.
 *
 * @param groups - Grouped navigation items to display in the sidebar
 */
export default function MicroservicesArchitectureSidebar({ groups }: Props) {
  const progressRef = useScrollProgress();
  const activeId = useScrollSpy("section.section", groups[0]?.items[0]?.id ?? null);

  return (
    <>
      <div id="pb" ref={progressRef} style={{ transformOrigin: "0 50%" }} />
      <aside className="sb" id="sb">
        <div className="sb-hd">
          <div className="sb-logo">
            <div className="sb-icon">⚙️</div>
            <div>
              <div className="sb-title">マイクロサービス</div>
              <div className="sb-sub">完全ガイド 2026</div>
            </div>
          </div>
        </div>
        <nav className="sb-nav">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="nav-grp">{group.title}</div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  className={`nl ${activeId === item.id ? "on" : ""}`}
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "location" : undefined}
                >
                  <span className="nn">{item.num}</span>
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
