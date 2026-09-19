"use client";

import { useEffect, useState } from "react";

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly children?: readonly NavItem[];
};

export type NavGroup = {
  readonly title?: string;
  readonly items: readonly NavItem[];
};

type GenerativeAiDesignPatternsSidebarProps = {
  readonly groups: readonly NavGroup[];
};

export default function GenerativeAiDesignPatternsSidebar({
  groups,
}: GenerativeAiDesignPatternsSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(() => {
    return groups[0]?.items[0]?.id ?? "はじめにこのガイドについて";
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

    const flattenItems = (items: readonly NavItem[]): NavItem[] => {
      const result: NavItem[] = [];
      for (const item of items) {
        result.push(item);
        if (item.children) {
          result.push(...flattenItems(item.children));
        }
      }
      return result;
    };

    const allItems = groups.flatMap((g) => flattenItems(g.items));
    const elements = allItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const intersectingEntries = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersectingEntries.set(entry.target.id, entry);
          } else {
            intersectingEntries.delete(entry.target.id);
          }
        }

        if (intersectingEntries.size === 0) {
          return;
        }

        const topmost = [...intersectingEntries.values()].reduce((top, entry) =>
          entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top
        );
        setActiveId(topmost.target.id);
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
        aria-expanded={isOpen}
        aria-controls="sidebar"
        onClick={toggleMenu}
      >
        &#9776;
      </button>

      <nav className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        <div className="sidebar-brand">Generative AI Design Patterns</div>

        <ul>
          {groups.map((group, gIdx) => (
            <div key={group.title ?? `group-${gIdx}`}>
              {group.title && (
                <li
                  className="sidebar-group-title"
                  style={{
                    padding: "12px 20px 4px",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--text-faint)",
                    fontWeight: 700,
                  }}
                >
                  {group.title}
                </li>
              )}
              {group.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={activeId === item.id ? "active" : ""}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                  {item.children && item.children.length > 0 && (
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a
                            href={`#${child.id}`}
                            className={activeId === child.id ? "active" : ""}
                            onClick={closeMenu}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </div>
          ))}
        </ul>
      </nav>
    </>
  );
}
