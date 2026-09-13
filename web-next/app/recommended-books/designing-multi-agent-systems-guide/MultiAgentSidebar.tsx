"use client";

import { useEffect, useState } from "react";

export type NavItem = {
  readonly id: string;
  readonly label: string;
};

export type NavGroup = {
  readonly title: string;
  readonly items: readonly NavItem[];
};

type MultiAgentSidebarProps = {
  readonly groups: readonly NavGroup[];
};

export default function MultiAgentSidebar({ groups }: MultiAgentSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(() => {
    return groups[0]?.items[0]?.id ?? "top";
  });

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const allItems = groups.flatMap((g) => g.items);
    const elements = allItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [groups]);

  return (
    <>
      <button
        type="button"
        className="sidebar-toggle"
        id="sidebarToggle"
        aria-label="メニューを開く"
        onClick={toggleMenu}
      >
        &#9776;
      </button>

      <div
        className={`sidebar-backdrop ${isOpen ? "open" : ""}`}
        id="sidebarBackdrop"
        onClick={closeMenu}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeMenu();
        }}
        tabIndex={-1}
        aria-hidden="true"
      />

      <nav className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-label">Guide</div>
          <div className="sidebar-brand-title">マルチエージェントシステムの設計</div>
        </div>

        <ul className="nav-list">
          {groups.map((group) => (
            <li key={group.title} className="nav-group-item">
              <ul className="nav-sub-list">
                {group.items.map((item) => {
                  const isActive = activeId === item.id;
                  const isH2 = !item.id.includes(".") && !item.id.match(/^\d+\.\d+/);
                  return (
                    <li key={item.id} className={`nav-item ${isH2 ? "nav-h2" : "nav-h3"}`}>
                      <a
                        href={`#${item.id}`}
                        className={`nav-link ${isActive ? "active" : ""}`}
                        data-target={item.id}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
