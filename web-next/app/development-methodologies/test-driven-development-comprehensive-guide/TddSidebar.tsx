"use client";
import {
  IconAlertTriangle,
  IconApi,
  IconBarrierBlock,
  IconBooks,
  IconBuildingArch,
  IconBuildingFactory2,
  IconChartBar,
  IconDatabase,
  IconGitBranch,
  IconInfoCircle,
  IconLayoutColumns,
  IconListNumbers,
  IconRefresh,
  IconRuler,
  IconStack,
  IconTestPipe,
  IconTheater,
  IconTrophy,
  IconUsers,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";

export type NavItem = {
  id: string;
  label: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

const ICON_MAP: Record<
  string,
  ComponentType<{ size?: number; "aria-hidden"?: "true" | "false" }>
> = {
  s1: IconInfoCircle,
  s2: IconRefresh,
  s3: IconListNumbers,
  s4: IconStack,
  s5: IconRuler,
  s6: IconTheater,
  s7: IconLayoutColumns,
  s8: IconBuildingArch,
  s9: IconApi,
  s10: IconDatabase,
  s11: IconUsers,
  s12: IconChartBar,
  s13: IconGitBranch,
  s14: IconBarrierBlock,
  s15: IconBuildingFactory2,
  s16: IconTrophy,
  s17: IconAlertTriangle,
  s18: IconBooks,
};

export const DEFAULT_GROUPS: NavGroup[] = [
  {
    label: "基礎",
    items: [
      { id: "s1", label: "TDDとは何か" },
      { id: "s2", label: "Red-Green-Refactor" },
      { id: "s3", label: "ステップバイステップ実践" },
      { id: "s4", label: "テストの種類と役割" },
    ],
  },
  {
    label: "設計",
    items: [
      { id: "s5", label: "ユニットテスト設計原則" },
      { id: "s6", label: "モックとスタブの活用" },
      { id: "s7", label: "AAAパターン" },
    ],
  },
  {
    label: "実装例",
    items: [
      { id: "s8", label: "ドメインロジック編" },
      { id: "s9", label: "APIエンドポイント編" },
      { id: "s10", label: "データベース層編" },
    ],
  },
  {
    label: "応用",
    items: [
      { id: "s11", label: "BDDとの連携" },
      { id: "s12", label: "テストカバレッジ" },
      { id: "s13", label: "CI/CDパイプライン" },
      { id: "s14", label: "障壁と解決策" },
      { id: "s15", label: "レガシーコード" },
    ],
  },
  {
    label: "まとめ",
    items: [
      { id: "s16", label: "ベストプラクティス" },
      { id: "s17", label: "アンチパターン" },
      { id: "s18", label: "参考文献" },
    ],
  },
];

type Props = {
  groups?: NavGroup[];
};

/**
 * TDD 完全ガイドのサイドバーナビゲーション（進捗バー + scroll-spy 付き）。
 */
export default function TddSidebar({ groups = DEFAULT_GROUPS }: Props) {
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
      <nav className="sidebar" aria-label="セクションナビゲーション">
        <div className="sidebar-logo">
          <div className="sidebar-logo-badge">
            <IconTestPipe size={16} aria-hidden="true" />
            TDD 完全ガイド
          </div>
        </div>
        {groups.map((group) => (
          <div key={group.label}>
            <div className="nav-section-label">{group.label}</div>
            {group.items.map((item) => {
              const IconComp = ICON_MAP[item.id];
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-item ${activeId === item.id ? "active" : ""}`}
                >
                  {IconComp && <IconComp size={16} aria-hidden="true" />}
                  {item.label}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}
