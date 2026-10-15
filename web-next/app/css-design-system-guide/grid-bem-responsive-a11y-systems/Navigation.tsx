"use client";
import { useEffect, useRef, useState } from "react";
export type NavGroup = { label: string; items: { id: string; num: string; label: string }[] };
export default function Navigation({ groups }: { groups: NavGroup[] }) {
  const nav = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const clickedId = useRef<string | null>(null);
  useEffect(() => {
    const root = nav.current?.closest(".grid-bem-responsive-a11y-systems");
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickedId.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    for (const target of root?.querySelectorAll(".section, .sub") ?? []) observer.observe(target);
    const release = () => {
      clickedId.current = null;
    };
    window.addEventListener("scrollend", release);
    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", release);
    };
  }, []);
  return (
    <nav className="sidebar" aria-label="ガイド目次" ref={nav}>
      <div className="sb-logo">
        <div className="t">CSS Design System</div>
        <div className="s">Ch.7–10 · フロントエンド完全ガイド</div>
      </div>
      {groups.map((group) => (
        <div className="ng" key={group.label}>
          <div className="ng-label">{group.label}</div>
          {/* Safari preserves list semantics when list-style is none. */}
          {/* biome-ignore lint/a11y/noRedundantRoles: Preserve list semantics in Safari. */}
          <ul role="list">
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeId === item.id ? "active" : undefined}
                  aria-current={activeId === item.id ? "location" : undefined}
                  onClick={() => {
                    clickedId.current = item.id;
                    setActiveId(item.id);
                  }}
                >
                  <span className="n">{item.num}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
