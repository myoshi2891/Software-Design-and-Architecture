"use client";

import {
  IconArrowsExchange,
  IconBook2,
  IconBulb,
  IconChecklist,
  IconCloudNetwork,
  IconCrown,
  IconDatabase,
  IconFileText,
  IconFlag,
  IconFlag3,
  IconGitBranch,
  IconGitCompare,
  IconHeartbeat,
  IconHierarchy2,
  IconLayersUnion,
  IconLink,
  IconListNumbers,
  IconMap2,
  IconMenu2,
  IconQuote,
  IconRefresh,
  IconRoute,
  IconSearch,
  IconShieldCheck,
  IconSitemap,
  IconStack2,
  IconTable,
  IconTool,
  IconUsersGroup,
  IconX,
} from "@tabler/icons-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly icon: React.ReactNode;
};

export type NavGroup = {
  readonly label: string;
  readonly items: readonly NavItem[];
};

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "はじめに",
    items: [
      { id: "intro", label: "なぜ学ぶのか", icon: <IconBulb size={18} /> },
      { id: "book-info", label: "書籍情報", icon: <IconBook2 size={18} /> },
      { id: "overview", label: "この本の全体像", icon: <IconMap2 size={18} /> },
    ],
  },
  {
    label: "Part I ストレージエンジン",
    items: [
      { id: "step1", label: "STEP1 DBMSアーキテクチャ", icon: <IconStack2 size={18} /> },
      { id: "step2", label: "STEP2 メモリ型とディスク型", icon: <IconDatabase size={18} /> },
      { id: "step3", label: "STEP3 行指向と列指向", icon: <IconTable size={18} /> },
      { id: "step4", label: "STEP4 B-Treeの基礎", icon: <IconHierarchy2 size={18} /> },
      { id: "step5", label: "STEP5 検索と分割", icon: <IconSearch size={18} /> },
      { id: "step6", label: "STEP6 ファイルフォーマット", icon: <IconFileText size={18} /> },
      { id: "step7", label: "STEP7 B-Tree実装の詳細", icon: <IconTool size={18} /> },
      { id: "step8", label: "STEP8 リカバリとWAL", icon: <IconShieldCheck size={18} /> },
      { id: "step9", label: "STEP9 同時実行制御", icon: <IconGitBranch size={18} /> },
      { id: "step10", label: "STEP10 B-Treeバリアント", icon: <IconSitemap size={18} /> },
      { id: "step11", label: "STEP11 LSM-Tree", icon: <IconLayersUnion size={18} /> },
      { id: "part1-summary", label: "Part Iまとめ", icon: <IconFlag size={18} /> },
    ],
  },
  {
    label: "Part II 分散システム",
    items: [
      { id: "step12", label: "STEP12 分散の難しさ", icon: <IconCloudNetwork size={18} /> },
      { id: "step13", label: "STEP13 障害検出", icon: <IconHeartbeat size={18} /> },
      { id: "step14", label: "STEP14 リーダー選出", icon: <IconCrown size={18} /> },
      { id: "step15", label: "STEP15 一貫性モデル", icon: <IconGitCompare size={18} /> },
      { id: "step16", label: "STEP16 アンチエントロピー", icon: <IconRefresh size={18} /> },
      { id: "step17", label: "STEP17 分散トランザクション", icon: <IconArrowsExchange size={18} /> },
      { id: "step18", label: "STEP18 コンセンサス", icon: <IconUsersGroup size={18} /> },
    ],
  },
  {
    label: "まとめと参考資料",
    items: [
      { id: "chapters", label: "全14章一覧", icon: <IconListNumbers size={18} /> },
      { id: "voices", label: "国際的な評価", icon: <IconQuote size={18} /> },
      { id: "roadmap", label: "学習ロードマップ", icon: <IconRoute size={18} /> },
      { id: "checklist", label: "理解度チェック", icon: <IconChecklist size={18} /> },
      { id: "summary", label: "まとめ", icon: <IconFlag3 size={18} /> },
      { id: "references", label: "参考文献", icon: <IconLink size={18} /> },
    ],
  },
];

export default function DatabaseInternalsSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("intro");
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    toggleBtnRef.current?.focus();
  }, []);

  // IntersectionObserver による scroll-spy
  useEffect(() => {
    const allIds = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Escape キーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  return (
    <>
      <nav className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar" aria-label="サイドバー目次">
        <div className="sidebar-brand">
          <IconDatabase size={24} />
          <div className="sidebar-brand-text">
            Database Internals<small>初学者向け完全ガイド</small>
          </div>
        </div>
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="nav-group-title">{group.label}</div>
            <ul className="nav-list">
              {group.items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id} className="nav-item">
                    <a
                      className={`nav-link ${isActive ? "active" : ""}`}
                      href={`#${item.id}`}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div
        className={`scrim ${isOpen ? "open" : ""}`}
        id="scrim"
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div className="mobile-bar">
        <button
          id="menuBtn"
          ref={toggleBtnRef}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="sidebar"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          type="button"
        >
          {isOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </button>
        <div className="brand">Database Internals ガイド</div>
      </div>
    </>
  );
}
