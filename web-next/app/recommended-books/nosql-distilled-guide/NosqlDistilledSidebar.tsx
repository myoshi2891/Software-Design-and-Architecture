"use client";

import {
  IconAlertTriangle,
  IconBook,
  IconBook2,
  IconCalendarTime,
  IconChecklist,
  IconDatabase,
  IconFlag,
  IconInfoCircle,
  IconLink,
  IconMenu2,
  IconRoute,
  IconSitemap,
  IconUsers,
} from "@tabler/icons-react";
import type React from "react";
import { useEffect, useState } from "react";

export interface NavItem {
  readonly id: string;
  readonly title: string;
  readonly num?: string;
  readonly icon?: React.ReactNode;
}

export interface NavGroup {
  readonly label: string;
  readonly items: readonly NavItem[];
}

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "はじめに",
    items: [
      { id: "about", title: "この記事について", icon: <IconInfoCircle size={17} /> },
      { id: "book-info", title: "本書について", icon: <IconBook size={17} /> },
      { id: "audience", title: "対象読者", icon: <IconUsers size={17} /> },
      { id: "roadmap", title: "学習ロードマップ", icon: <IconRoute size={17} /> },
      { id: "structure", title: "本書全体の構成", icon: <IconSitemap size={17} /> },
    ],
  },
  {
    label: "Part I 中核概念",
    items: [
      { id: "step0", title: "なぜNoSQLなのか", num: "0" },
      { id: "step1", title: "集約データモデル", num: "1" },
      { id: "step2", title: "データモデルの詳細", num: "2" },
      { id: "step3", title: "分散モデル", num: "3" },
      { id: "step4", title: "一貫性", num: "4" },
      { id: "step5", title: "バージョンスタンプ", num: "5" },
      { id: "step6", title: "Map-Reduce", num: "6" },
    ],
  },
  {
    label: "Part II 実装と選択",
    items: [
      { id: "step7", title: "キーバリューDB", num: "7" },
      { id: "step8", title: "ドキュメントDB", num: "8" },
      { id: "step9", title: "カラムファミリー", num: "9" },
      { id: "step10", title: "グラフDB", num: "10" },
      { id: "step11", title: "スキーマ移行", num: "11" },
      { id: "step12", title: "ポリグロット", num: "12" },
      { id: "step13", title: "NoSQLを超えて", num: "13" },
      { id: "step14", title: "選び方", num: "14" },
    ],
  },
  {
    label: "まとめ",
    items: [
      { id: "updates2026", title: "2026年の補足", icon: <IconCalendarTime size={17} /> },
      { id: "critical", title: "批判的に読む", icon: <IconAlertTriangle size={17} /> },
      { id: "glossary", title: "用語集", icon: <IconBook2 size={17} /> },
      { id: "checklist", title: "学習チェックリスト", icon: <IconChecklist size={17} /> },
      { id: "summary", title: "まとめ", icon: <IconFlag size={17} /> },
      { id: "references", title: "参考文献", icon: <IconLink size={17} /> },
    ],
  },
];

export default function NosqlDistilledSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("about");

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  // 開いている間だけ window で Escape を受け取り、フォーカス位置に関係なく閉じる
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const allIds = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    let ticking = false;
    const updateActive = () => {
      const threshold = window.innerHeight * 0.22;
      let current = allIds[0];
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = el.id;
        }
      }
      setActiveId(current);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActive);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActive();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="mobile-bar">
        <div className="brand">
          <IconDatabase size={24} /> NoSQL Distilled
        </div>
        <button
          type="button"
          id="mobileToggle"
          aria-label="メニュー"
          aria-expanded={isOpen}
          onClick={() => (isOpen ? closeSidebar() : openSidebar())}
        >
          <IconMenu2 size={24} />
        </button>
      </div>
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        id="sidebarOverlay"
        onClick={closeSidebar}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeSidebar();
        }}
        tabIndex={-1}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        <div className="brand">
          <IconDatabase size={24} /> NoSQL Distilled
        </div>
        <div className="brand-sub">初学者向け完全ガイド</div>

        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  className={`nav-a ${isActive ? "active" : ""}`}
                  href={`#${item.id}`}
                  onClick={closeSidebar}
                >
                  {item.num ? (
                    <span className="n-num">{item.num}</span>
                  ) : (
                    <span className="ti">{item.icon}</span>
                  )}
                  <span>{item.title}</span>
                </a>
              );
            })}
          </div>
        ))}
      </aside>
    </>
  );
}
