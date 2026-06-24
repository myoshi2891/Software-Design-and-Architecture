"use client";
import { useEffect, useRef, useState } from "react";
import { IconBuilding } from "@tabler/icons-react";

export type NavItem = {
  id: string;
  emoji: string;
  label: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

type Props = {
  groups: NavGroup[];
};

/**
 * Renders the sidebar navigation and scroll progress bar for the guide.
 *
 * @param groups - Navigation groups displayed in the sidebar
 */
export default function SoaSidebar({ groups }: Props) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(groups[0]?.items[0]?.id ?? null);

  // ── 進捗バー: スクロール量に応じて scaleX を更新 ──
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0;
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
        <div className="sb-logo">
          <IconBuilding size={20} className="sb-logo-icon" />
          <div className="sb-logo-title">SOA 完全ガイド</div>
          <div className="sb-logo-sub">サービス指向アーキテクチャ</div>
        </div>
        <nav className="sb-nav">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="sb-label">{group.title}</div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  className={activeId === item.id ? "active" : ""}
                  href={`#${item.id}`}
                >
                  <span className="nav-em">{item.emoji}</span>
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
