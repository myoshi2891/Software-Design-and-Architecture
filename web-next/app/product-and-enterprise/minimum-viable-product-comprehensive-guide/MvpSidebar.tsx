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
    <aside className="sidebar">
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
              >
                <Icon size={14} className={`mvp-icon icon-${item.icon}`} aria-hidden="true" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
