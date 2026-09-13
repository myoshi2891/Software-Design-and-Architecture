"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT_PX = 900;

export type NavSubItem = {
  readonly id: string;
  readonly label: string;
};

export type NavH2Item = {
  readonly id: string;
  readonly label: string;
  readonly isSolo?: boolean;
  readonly subItems?: readonly NavSubItem[];
};

type MultiAgentSidebarProps = {
  readonly items: readonly NavH2Item[];
};

export default function MultiAgentSidebar({ items }: MultiAgentSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeId, setActiveId] = useState<string>(() => {
    return items[0]?.id ?? "top";
  });
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => {
    setIsOpen(false);
    toggleButtonRef.current?.focus();
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const checkIsMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT_PX);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const allIds: string[] = [];
    for (const item of items) {
      allIds.push(item.id);
      if (item.subItems) {
        for (const sub of item.subItems) {
          allIds.push(sub.id);
        }
      }
    }

    const elements = allIds
      .map((id) => document.getElementById(id))
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
  }, [items]);

  return (
    <>
      <button
        ref={toggleButtonRef}
        type="button"
        className="sidebar-toggle"
        id="sidebarToggle"
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
        aria-controls="sidebar"
        onClick={toggleMenu}
      >
        &#9776;
      </button>

      <div
        className={`sidebar-backdrop ${isOpen ? "open" : ""}`}
        id="sidebarBackdrop"
        onClick={closeMenu}
        tabIndex={-1}
        aria-hidden="true"
      />

      <nav
        className={`sidebar ${isOpen ? "open" : ""}`}
        id="sidebar"
        inert={isMobile && !isOpen}
        aria-hidden={isMobile && !isOpen ? "true" : undefined}
      >
        <div className="sidebar-brand">
          <div className="sidebar-brand-label">Guide</div>
          <div className="sidebar-brand-title">マルチエージェントシステムの設計</div>
        </div>

        <ul className="nav-list">
          {items.map((item) => {
            const isH2Active = activeId === item.id;
            return (
              <li key={item.id} className={`nav-item ${item.isSolo ? "nav-h2-solo" : "nav-h2"}`}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${isH2Active ? "active" : ""}`}
                  data-target={item.id}
                  onClick={closeMenu}
                  aria-current={isH2Active ? "location" : undefined}
                >
                  {item.label}
                </a>

                {item.subItems && item.subItems.length > 0 && (
                  <ul className="nav-sub">
                    {item.subItems.map((sub) => {
                      const isSubActive = activeId === sub.id;
                      return (
                        <li key={sub.id} className="nav-item nav-h3">
                          <a
                            href={`#${sub.id}`}
                            className={`nav-link ${isSubActive ? "active" : ""}`}
                            data-target={sub.id}
                            onClick={closeMenu}
                            aria-current={isSubActive ? "location" : undefined}
                          >
                            {sub.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
