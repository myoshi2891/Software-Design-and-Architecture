"use client";
import { useEffect, useRef, useState } from "react";

export type NavItem = {
  id: string;
  num: string;
  label: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
  chNum?: string; // e.g. "Ch.3"
};

type Props = {
  groups: NavGroup[];
};

/**
 * Renders the CSS color, typography, and spacing systems guide sidebar navigation.
 *
 * @param groups - Navigation groups to display in the sidebar
 */
export default function CssColorTypographySpacingSidebar({ groups }: Props) {
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
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section.section"));
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
        <div className="sb-head">
          <div className="sb-logo">
            <div className="sb-icon">CSS</div>
            <div className="sb-title">
              CSSデザインシステム
              <br />
              完全ガイド
            </div>
          </div>
          <span className="sb-badge">初学者〜中級者</span>
        </div>
        <nav className="sb-nav" aria-label="目次">
          {groups.map((group) => (
            <div key={group.title} className="nav-group">
              <div className="nav-ch">
                {group.chNum && <span className="nav-ch-num">{group.chNum}</span>}
                {group.title}
              </div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  className={`nav-item ${activeId === item.id ? "active" : ""}`}
                  href={`#${item.id}`}
                >
                  <span className="nav-num">{item.num}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
