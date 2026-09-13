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

type ArchitectingGenAiSidebarProps = {
  readonly groups: readonly NavGroup[];
};

export default function ArchitectingGenAiSidebar({ groups }: ArchitectingGenAiSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(() => {
    return groups[0]?.items[0]?.id ?? "part0";
  });

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
        id="sidebar-toggle"
        aria-label="メニュー"
        onClick={toggleMenu}
      >
        &#9776;
      </button>

      <nav className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        <div className="sidebar-brand">Architecting Generative AI Applications</div>

        {groups.map((group) => (
          <div key={group.title}>
            {group.items.map((item) => {
              const isActive = activeId === item.id;
              const isH2 =
                item.id.startsWith("part") ||
                ["roadmap", "checklist", "glossary", "references"].includes(item.id);
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link ${isH2 ? "nav-h2" : "nav-h3"} ${isActive ? "active" : ""}`}
                  data-target={item.id}
                  onClick={closeMenu}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}
