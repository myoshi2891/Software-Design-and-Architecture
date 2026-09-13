"use client";

import { IconBooks, IconBrain, IconCode, IconHome, IconMap2, IconMenu2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly num?: number;
  readonly icon?: "home" | "code" | "map" | "books";
};

export type NavGroup = {
  readonly title: string;
  readonly items: readonly NavItem[];
};

type BuildingLlmPoweredSidebarProps = {
  readonly groups: readonly NavGroup[];
};

export default function BuildingLlmPoweredSidebar({ groups }: BuildingLlmPoweredSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(() => {
    return groups[0]?.items[0]?.id ?? "intro";
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
      { rootMargin: "-20% 0px -70% 0px" }
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
      case "home":
        return <IconHome size={18} className="ti" />;
      case "code":
        return <IconCode size={18} className="ti" />;
      case "map":
        return <IconMap2 size={18} className="ti" />;
      case "books":
        return <IconBooks size={18} className="ti" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mobile-bar">
        <span className="mobile-bar-title">LLMアプリ構築ガイド</span>
        <button
          type="button"
          id="mobileToggle"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <IconMenu2 size={20} className="ti" />
        </button>
      </div>

      {isOpen && (
        <button
          type="button"
          className="sidebar-overlay open"
          id="sidebarOverlay"
          onClick={closeMenu}
          aria-label="メニューを閉じる"
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        <div className="sidebar-brand">
          <IconBrain size={24} className="ti" />
          <div>
            <div className="sidebar-brand-text">
              LLMパワード
              <br />
              アプリケーション構築ガイド
            </div>
            <div className="sidebar-brand-sub">初学者向けステップバイステップ</div>
          </div>
        </div>

        {groups.map((group) => (
          <div key={group.title}>
            <div className="nav-group-label">{group.title}</div>
            {group.items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  className={`nav-a ${isActive ? "active" : ""}`}
                  href={`#${item.id}`}
                  onClick={closeMenu}
                >
                  {renderIcon(item)}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        ))}
      </aside>
    </>
  );
}
