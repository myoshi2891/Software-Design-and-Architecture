"use client";

import {
  IconAlertTriangle,
  IconArrowsShuffle,
  IconBook,
  IconBook2,
  IconBuildingArch,
  IconBulb,
  IconCategory,
  IconCheckbox,
  IconCode,
  IconExternalLink,
  IconFlag,
  IconFlask,
  IconFlask2,
  IconGitBranch,
  IconInfoCircle,
  IconLayoutGrid,
  IconLink,
  IconListCheck,
  IconMenu2,
  IconPuzzle,
  IconRocket,
  IconRoute,
  IconScale,
  IconServer,
  IconShieldCheck,
  IconTable,
  IconUsers,
} from "@tabler/icons-react";
import type React from "react";
import { useEffect, useState } from "react";

export interface NavItem {
  readonly id: string;
  readonly title: string;
  readonly icon: React.ReactNode;
}

export interface NavGroup {
  readonly label: string;
  readonly items: readonly NavItem[];
}

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "はじめに",
    items: [
      { id: "intro", title: "この記事について", icon: <IconInfoCircle size={18} /> },
      { id: "book-info", title: "書籍基本情報", icon: <IconBook size={18} /> },
      { id: "authors", title: "著者について", icon: <IconUsers size={18} /> },
    ],
  },
  {
    label: "基礎編",
    items: [
      { id: "step0", title: "Step 0 学習ロードマップ", icon: <IconRoute size={18} /> },
      { id: "step1", title: "Step 1 なぜ必要か", icon: <IconBulb size={18} /> },
      { id: "step2", title: "Step 2 全体構成", icon: <IconLayoutGrid size={18} /> },
      { id: "step3", title: "Step 3 リファクタリングとは", icon: <IconPuzzle size={18} /> },
      { id: "step4", title: "Step 4 データベースの臭い", icon: <IconAlertTriangle size={18} /> },
      { id: "step5", title: "Step 5 プロセス", icon: <IconListCheck size={18} /> },
      { id: "step6", title: "Step 6 移行期間", icon: <IconArrowsShuffle size={18} /> },
      { id: "step7", title: "Step 7 デプロイ戦略", icon: <IconServer size={18} /> },
      { id: "step8", title: "Step 8 戦略の要点", icon: <IconGitBranch size={18} /> },
    ],
  },
  {
    label: "カタログ編",
    items: [
      { id: "step9", title: "Step 9 カタログ全体像", icon: <IconCategory size={18} /> },
      { id: "step10", title: "Step 10 構造", icon: <IconTable size={18} /> },
      { id: "step11", title: "Step 11 データ品質", icon: <IconShieldCheck size={18} /> },
      { id: "step12", title: "Step 12 参照整合性", icon: <IconLink size={18} /> },
      { id: "step13", title: "Step 13 アーキテクチャ", icon: <IconBuildingArch size={18} /> },
      { id: "step14", title: "Step 14 メソッドと変換", icon: <IconCode size={18} /> },
    ],
  },
  {
    label: "実践とまとめ",
    items: [
      { id: "step15", title: "Step 15 実践 ① Split Column", icon: <IconFlask size={18} /> },
      { id: "step16", title: "Step 16 実践 ② Rename Table", icon: <IconFlask2 size={18} /> },
      { id: "step17", title: "Step 17 現代との接続", icon: <IconRocket size={18} /> },
      { id: "critical", title: "批判的に読む", icon: <IconScale size={18} /> },
      { id: "glossary", title: "用語集", icon: <IconBook2 size={18} /> },
      { id: "checklist", title: "理解度チェック", icon: <IconCheckbox size={18} /> },
      { id: "summary", title: "まとめ", icon: <IconFlag size={18} /> },
      { id: "references", title: "参考文献", icon: <IconExternalLink size={18} /> },
    ],
  },
];

export default function RefactoringDatabasesSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("intro");

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  // 開いている間だけ document で Escape を受け取り、フォーカス位置に関係なく閉じる
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const allIds = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    let ticking = false;
    const updateActive = () => {
      const threshold = window.innerHeight * 0.25;
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
      <header className="mobile-bar">
        <span className="brand">Refactoring Databases ガイド</span>
        <button
          type="button"
          id="menuToggle"
          aria-label="目次メニュー"
          aria-expanded={isOpen}
          aria-controls="sidebar"
          onClick={() => (isOpen ? closeSidebar() : openSidebar())}
        >
          <IconMenu2 size={20} />
          目次
        </button>
      </header>
      <div
        className={`scrim ${isOpen ? "open" : ""}`}
        id="sidebarOverlay"
        onClick={closeSidebar}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        <div className="sidebar-brand">
          <span className="eyebrow">Beginner&apos;s Guide</span>
          <h1>
            Refactoring Databases
            <br />
            初学者向け完全ガイド
          </h1>
        </div>
        <nav>
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
                    aria-current={isActive ? "location" : undefined}
                    onClick={closeSidebar}
                  >
                    <i>{item.icon}</i>
                    <span>{item.title}</span>
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
