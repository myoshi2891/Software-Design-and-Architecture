"use client";

import {
  IconAlertTriangle,
  IconBook2,
  IconBulb,
  IconChecklist,
  IconDatabase,
  IconFlag,
  IconFlagCheck,
  IconGift,
  IconInfoSquareRounded,
  IconKey,
  IconLink,
  IconListDetails,
  IconMenu2,
  IconMessageCircle2,
  IconRefresh,
  IconRoute,
  IconServer2,
  IconShieldLock,
  IconSitemap,
  IconStack2,
  IconTerminal2,
  IconUsers,
} from "@tabler/icons-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly icon: React.ReactNode;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "book-info", label: "書籍情報", icon: <IconInfoSquareRounded className="ti" size={17} /> },
  { id: "about", label: "この本は何のための本か", icon: <IconBulb className="ti" size={17} /> },
  { id: "audience", label: "対象読者・使い方", icon: <IconUsers className="ti" size={17} /> },
  { id: "overview", label: "本書の全体像", icon: <IconSitemap className="ti" size={17} /> },
  { id: "chapter-list", label: "全27章 一覧表", icon: <IconListDetails className="ti" size={17} /> },
  { id: "step0", label: "Step0 アンチパターンとは何か", icon: <IconFlag className="ti" size={17} /> },
  { id: "step1", label: "Step1 論理設計（2〜9章）", icon: <IconDatabase className="ti" size={17} /> },
  { id: "step2", label: "Step2 物理設計（10〜13章）", icon: <IconServer2 className="ti" size={17} /> },
  { id: "step3", label: "Step3 クエリ（14〜19章）", icon: <IconTerminal2 className="ti" size={17} /> },
  {
    id: "step4",
    label: "Step4 アプリ開発（20〜25章）",
    icon: <IconShieldLock className="ti" size={17} />,
  },
  { id: "step5", label: "Step5 外部キー（26〜27章）", icon: <IconKey className="ti" size={17} /> },
  { id: "step6", label: "Step6 付録A 正規化", icon: <IconStack2 className="ti" size={17} /> },
  { id: "step7", label: "Step7 日本語版限定付録", icon: <IconGift className="ti" size={17} /> },
  { id: "editions", label: "初版から第2版への変化", icon: <IconRefresh className="ti" size={17} /> },
  { id: "voices", label: "国際的な評価", icon: <IconMessageCircle2 className="ti" size={17} /> },
  { id: "critical", label: "批判的に読む", icon: <IconAlertTriangle className="ti" size={17} /> },
  { id: "roadmap", label: "学習ロードマップ", icon: <IconRoute className="ti" size={17} /> },
  { id: "checklist", label: "チェックリスト", icon: <IconChecklist className="ti" size={17} /> },
  { id: "summary", label: "まとめ", icon: <IconFlagCheck className="ti" size={17} /> },
  { id: "references", label: "参考文献・出典", icon: <IconLink className="ti" size={17} /> },
];

export default function SqlAntipatternsSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("book-info");
  const toggleRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        ticking = false;
        const targets = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
          (el): el is HTMLElement => el !== null
        );
        let currentIdx = 0;
        const threshold = window.innerHeight * 0.25;
        for (let i = 0; i < targets.length; i++) {
          const rect = targets[i].getBoundingClientRect();
          if (rect.top <= threshold) {
            currentIdx = i;
          }
        }
        if (NAV_ITEMS[currentIdx]) {
          setActiveId(NAV_ITEMS[currentIdx].id);
        }
      });
      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`scrim ${isOpen ? "show" : ""}`}
        id="scrim"
        onClick={closeMenu}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") closeMenu();
        }}
        tabIndex={-1}
        role="presentation"
      />

      <div className="mobile-bar">
        <button
          id="menuToggle"
          ref={toggleRef}
          type="button"
          aria-label="メニュー"
          onClick={toggleMenu}
        >
          <IconMenu2 size={20} className="ti" />
        </button>
        <span className="brand">SQLアンチパターン 第2版</span>
      </div>

      <nav className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar" aria-label="ページ内目次">
        <div className="sidebar-brand">
          <IconBook2 size={24} className="ti" />
          <div>
            <div className="sidebar-brand-text">SQLアンチパターン 第2版</div>
            <div className="sidebar-brand-sub">初学者向けステップバイステップガイド</div>
          </div>
        </div>
        <div className="nav-group-label">目次</div>
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="nav-item">
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? "active" : ""}
                onClick={closeMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
