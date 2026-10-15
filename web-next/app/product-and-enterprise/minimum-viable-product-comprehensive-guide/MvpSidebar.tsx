"use client";
import {
  IconAlertTriangle,
  IconArrowsShuffle,
  IconAward,
  IconBooks,
  IconBuildingArch,
  IconBulb,
  IconChartBar,
  IconCode,
  IconListCheck,
  IconMap,
  IconRecycle,
  IconStack2,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const ICONS = {
  bulb: IconBulb,
  recycle: IconRecycle,
  map: IconMap,
  users: IconUsers,
  "list-check": IconListCheck,
  "building-arch": IconBuildingArch,
  "stack-2": IconStack2,
  code: IconCode,
  "chart-bar": IconChartBar,
  "arrows-shuffle": IconArrowsShuffle,
  "alert-triangle": IconAlertTriangle,
  "trending-up": IconTrendingUp,
  award: IconAward,
  books: IconBooks,
} as const;
export type MvpNavItem = { id: string; label: string; icon: keyof typeof ICONS };
export default function MvpSidebar({ items }: { items: MvpNavItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  // 768px 以下ではサイドバーを隠すため、目次ボタンで開閉する。
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    const sections = document.querySelectorAll(
      ".minimum-viable-product-comprehensive-guide section.section"
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <button
        type="button"
        className="toc-toggle"
        aria-label={open ? "目次を閉じる" : "目次を開く"}
        aria-expanded={open}
        aria-controls="mvp-toc"
        onClick={() => setOpen((value) => !value)}
      >
        ☰
      </button>
      <aside id="mvp-toc" className={`sidebar${open ? " open" : ""}`}>
        <div className="sidebar-title">MVP 完全ガイド</div>
        <div className="sidebar-section">
          <nav aria-label="MVPガイドの目次">
            {items.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={activeId === item.id ? "active" : undefined}
                  aria-current={activeId === item.id ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={14} className={`mvp-icon icon-${item.icon}`} aria-hidden="true" />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
