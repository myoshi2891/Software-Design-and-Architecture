"use client";

import { IconBook, IconInfoCircle, IconLink, IconMenu2, IconRobot } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly num?: number;
  readonly icon?: "info" | "book" | "link";
};

export type NavGroup = {
  readonly title: string;
  readonly items: readonly NavItem[];
};

type BuildingApplicationsWithAiAgentsSidebarProps = {
  readonly groups: readonly NavGroup[];
};

export default function BuildingApplicationsWithAiAgentsSidebar({
  groups,
}: BuildingApplicationsWithAiAgentsSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(() => {
    return groups[0]?.items[0]?.id ?? "about";
  });

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
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

        if (intersectingEntries.size === 0) return;

        const topmost = [...intersectingEntries.values()].reduce((top, entry) =>
          entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [groups]);

  const renderIcon = (item: NavItem) => {
    if (item.num !== undefined) {
      return <span className="n-num">{item.num}</span>;
    }
    switch (item.icon) {
      case "info":
        return <IconInfoCircle size={17} className="ti" />;
      case "book":
        return <IconBook size={17} className="ti" />;
      case "link":
        return <IconLink size={17} className="ti" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mobile-bar">
        <button
          type="button"
          id="menuToggle"
          aria-expanded={isOpen}
          aria-controls="sidebar"
          onClick={toggleMenu}
        >
          <IconMenu2 size={20} className="ti" /> メニュー
        </button>
        <div className="brand">
          <IconRobot size={22} className="ti" /> AIエージェント構築ガイド
        </div>
      </div>

      {isOpen && (
        <button
          type="button"
          className="scrim show"
          id="scrim"
          onClick={closeMenu}
          aria-label="メニューを閉じる"
        />
      )}

      <nav className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar" aria-label="ガイドの目次">
        <div className="brand">
          <IconRobot size={24} className="ti" /> AIエージェント構築ガイド
        </div>
        <div className="brand-sub">Building Applications with AI Agents 初学者ガイド</div>

        {groups.map((group) => (
          <div key={group.title}>
            <div className="nav-group-label">{group.title}</div>
            <ul className="nav-list">
              {group.items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      className={`nav-a ${isActive ? "active" : ""}`}
                      href={`#${item.id}`}
                      onClick={closeMenu}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {renderIcon(item)}
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}
