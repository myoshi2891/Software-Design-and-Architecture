"use client";
import { useEffect, useRef, useState } from "react";

export type NavItem = {
  id: string;
  num: string;
  label: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

type Props = {
  groups: NavGroup[];
};

/**
 * OOP 完全ガイドのサイドバーナビゲーション（進捗バー + scroll-spy 付き）。
 */
export default function OopSidebar({ groups }: Props) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(groups[0]?.items[0]?.id ?? null);

  // ── 進捗バー: スクロール量に応じて scaleX を更新 ──
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, docH > 0 ? window.scrollY / docH : 0));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${prog})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── サイドバー現在地: IntersectionObserver で可視 section を追跡 ──
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section.section, div.section")
    );
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          const topmost = intersecting.reduce((prev, curr) => {
            return curr.target.getBoundingClientRect().y < prev.target.getBoundingClientRect().y
              ? curr
              : prev;
          });
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="progress-bar" ref={progressRef} />
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="badge">OOP</span>
          </div>
          <div className="sidebar-title">
            オブジェクト指向
            <br />
            プログラミング
          </div>
          <div className="sidebar-sub">完全ガイド — Python 実装例つき</div>
        </div>
        <nav className="sidebar-nav">
          {groups.map((group) => (
            <div key={group.label} className="nav-group">
              <div className="nav-section-label">{group.label}</div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-item ${activeId === item.id ? "active" : ""}`}
                >
                  <span className="nav-num">{item.num}</span>
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
