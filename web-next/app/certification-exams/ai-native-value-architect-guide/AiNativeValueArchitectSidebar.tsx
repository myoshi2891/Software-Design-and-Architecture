"use client";

import {
  IconAbc,
  IconBook2,
  IconCertificate,
  IconChecklist,
  IconLink,
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconNumber4,
  IconTopologyStar3,
  IconUserStar,
} from "@tabler/icons-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly icon?: React.ComponentType<{ size?: number; className?: string }>;
};

export type NavGroup = {
  readonly title: string;
  readonly items: readonly NavItem[];
};

export const DEFAULT_NAV_GROUPS: readonly NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "prereq", label: "前提知識のおさらい", icon: IconBook2 },
      { id: "overview", label: "認定資格の全体像", icon: IconCertificate },
      { id: "role", label: "役割とは何か", icon: IconUserStar },
    ],
  },
  {
    title: "試験ドメイン",
    items: [
      { id: "domain1", label: "Change Agentの育成", icon: IconNumber1 },
      { id: "domain2", label: "戦略・整合・ガバナンス", icon: IconNumber2 },
      { id: "domain3", label: "ソリューション設計と提供", icon: IconNumber3 },
      { id: "domain4", label: "価値実現と組織変革", icon: IconNumber4 },
    ],
  },
  {
    title: "まとめ",
    items: [
      { id: "map", label: "全体統合マップ", icon: IconTopologyStar3 },
      { id: "glossary", label: "用語集", icon: IconAbc },
      { id: "checklist", label: "学習チェックリスト", icon: IconChecklist },
      { id: "references", label: "参考文献・ソース一覧", icon: IconLink },
    ],
  },
];

type Props = {
  readonly groups?: readonly NavGroup[];
};

export default function AiNativeValueArchitectSidebar({ groups = DEFAULT_NAV_GROUPS }: Props) {
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
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section.section[id]"));
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
        <div className="brand">
          <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="22" cy="22" r="20" fill="#EEF1F8" stroke="#2E3F72" strokeWidth="1.5" />
            <circle cx="22" cy="22" r="15" fill="none" stroke="#B8802A" strokeWidth="1" />
            <path d="M22 10 L27 24 L22 21 L17 24 Z" fill="#2E3F72" />
            <circle cx="22" cy="30" r="2.4" fill="#B8802A" />
          </svg>
          <div>
            <div className="brand-title">AI-Native Value Architect</div>
            <div className="brand-sub">認定資格 学習ガイド</div>
          </div>
        </div>
        <nav>
          {groups.map((group) => (
            <div key={group.title} className="nav-group">
              <div className="nav-group-label">{group.title}</div>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={activeId === item.id ? "active" : ""}
                  >
                    {Icon ? <Icon size={18} /> : null}
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
