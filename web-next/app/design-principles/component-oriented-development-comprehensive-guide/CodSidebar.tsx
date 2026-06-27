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

export default function CodSidebar({ groups }: Props) {
  const progressRef = useScrollProgress();
  const activeId = useScrollSpy("section.section", groups[0]?.items[0]?.id ?? null);

  return (
    <>
      <div className="progress-bar" ref={progressRef} />
      <nav className="sidebar" id="sidebar">
        <div className="sb-brand">
          <a
            className="sb-logo"
            href="/design-principles/component-oriented-development-comprehensive-guide"
          >
            <div className="sb-icon">🧩</div>
            <div className="sb-text">
              COD 完全ガイド
              <span className="sb-sub">Component-Oriented Development</span>
            </div>
          </a>
        </div>
        <div className="sb-nav">
          {groups.map((group) => (
            <div key={group.title} style={{ display: "contents" }}>
              <div className="nav-section-title">{group.title}</div>
              {group.items.map((item) => (
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
            </div>
          ))}
        </div>
        <div className="sb-foot">Software Architect Guide v1.0 &middot; 2024</div>
      </nav>
    </>
  );
}
