"use client";
import { IconPalette } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

export type NavItem = {
  id: string;
  num: string;
  label: string;
  badge?: {
    text: string;
    variant: "g" | "y" | "o" | "r";
  };
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

type Props = {
  groups: NavGroup[];
};

/**
 * Renders the CSS design system guide sidebar navigation.
 *
 * @param groups - Navigation groups to display in the sidebar
 */
export default function CssDesignSystemSidebar({ groups }: Props) {
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
        <div className="sb-brand">
          <div className="sb-brand-title flex items-center gap-1">
            <IconPalette size={20} className="sb-brand-icon" style={{ color: "var(--cyan)" }} />
            <span>
              CSSデザインシステム
              <br />
              完全ガイド
            </span>
          </div>
          <div className="sb-brand-sub">初学者から実践者まで対応</div>
        </div>
        <nav className="sb-nav" aria-label="目次">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="nav-grp-label">{group.title}</div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  className={`nav-item ${activeId === item.id ? "active" : ""}`}
                  href={`#${item.id}`}
                >
                  <span className="nav-num">{item.num}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`nav-badge b-${item.badge.variant}`}>{item.badge.text}</span>
                  )}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
