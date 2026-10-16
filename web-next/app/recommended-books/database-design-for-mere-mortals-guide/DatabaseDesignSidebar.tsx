"use client";

import {
  IconAbc,
  IconAdjustments,
  IconAlertTriangle,
  IconArrowBigRightLines,
  IconArrowsJoin,
  IconBook2,
  IconBulb,
  IconChecklist,
  IconDatabase,
  IconEye,
  IconFlag2,
  IconGavel,
  IconHelpCircle,
  IconHierarchy2,
  IconIdBadge2,
  IconKey,
  IconLink,
  IconListDetails,
  IconMap2,
  IconMenu2,
  IconMessage2,
  IconNotes,
  IconRoute,
  IconSearch,
  IconShieldCheck,
  IconSitemap,
  IconSquareCheck,
  IconTable,
  IconTarget,
  IconUsers,
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
      { id: "overview", label: "この記事について", icon: <IconBook2 className="ti" size={18} /> },
      { id: "book-data", label: "書籍データ", icon: <IconIdBadge2 className="ti" size={18} /> },
      { id: "audience", label: "想定読者", icon: <IconUsers className="ti" size={18} /> },
      { id: "structure", label: "本書の全体構成", icon: <IconSitemap className="ti" size={18} /> },
      { id: "philosophy", label: "設計思想", icon: <IconBulb className="ti" size={18} /> },
      { id: "roadmap", label: "学習ロードマップ", icon: <IconRoute className="ti" size={18} /> },
      {
        id: "step0",
        label: "Step0 なぜ設計を学ぶのか",
        icon: <IconHelpCircle className="ti" size={18} />,
      },
    ],
  },
  {
    label: "Part I 基礎",
    items: [
      {
        id: "step1",
        label: "Step1 リレーショナルDB",
        icon: <IconDatabase className="ti" size={18} />,
      },
      { id: "step2", label: "Step2 設計目標", icon: <IconTarget className="ti" size={18} /> },
      { id: "step3", label: "Step3 用語", icon: <IconAbc className="ti" size={18} /> },
    ],
  },
  {
    label: "Part II 設計プロセス",
    items: [
      { id: "step4", label: "Step4 全体像", icon: <IconMap2 className="ti" size={18} /> },
      { id: "step5", label: "Step5 インタビュー", icon: <IconMessage2 className="ti" size={18} /> },
      { id: "step6", label: "Step6 現行DBの分析", icon: <IconSearch className="ti" size={18} /> },
      { id: "step7", label: "Step7 テーブル構造", icon: <IconTable className="ti" size={18} /> },
      { id: "step8", label: "Step8 キー", icon: <IconKey className="ti" size={18} /> },
      {
        id: "step9",
        label: "Step9 フィールド仕様",
        icon: <IconListDetails className="ti" size={18} />,
      },
      {
        id: "step10",
        label: "Step10 リレーションシップ",
        icon: <IconArrowsJoin className="ti" size={18} />,
      },
      {
        id: "step11",
        label: "Step11 ビジネスルール",
        icon: <IconGavel className="ti" size={18} />,
      },
      { id: "step12", label: "Step12 ビュー", icon: <IconEye className="ti" size={18} /> },
      {
        id: "step13",
        label: "Step13 整合性レビュー",
        icon: <IconChecklist className="ti" size={18} />,
      },
    ],
  },
  {
    label: "Part III その他",
    items: [
      {
        id: "step14",
        label: "Step14 悪いデザイン",
        icon: <IconAlertTriangle className="ti" size={18} />,
      },
      {
        id: "step15",
        label: "Step15 例外を理解する",
        icon: <IconAdjustments className="ti" size={18} />,
      },
      { id: "step16", label: "Step16 結び", icon: <IconFlag2 className="ti" size={18} /> },
    ],
  },
  {
    label: "読みを深める",
    items: [
      {
        id: "normalization",
        label: "正規化についての補足",
        icon: <IconHierarchy2 className="ti" size={18} />,
      },
      { id: "critical", label: "批判的に読む", icon: <IconShieldCheck className="ti" size={18} /> },
      {
        id: "next-steps",
        label: "次のステップ",
        icon: <IconArrowBigRightLines className="ti" size={18} />,
      },
      {
        id: "checklist",
        label: "学習チェックリスト",
        icon: <IconSquareCheck className="ti" size={18} />,
      },
      { id: "summary", label: "まとめ", icon: <IconNotes className="ti" size={18} /> },
      { id: "references", label: "参考文献", icon: <IconLink className="ti" size={18} /> },
    ],
  },
];

export default function DatabaseDesignSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("overview");
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);

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
          // 最もビューポート上部に近い要素をアクティブに
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

  // Escape キーでメニューを閉じる
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
      <a className="skip-link" href="#main-content">
        本文へスキップ
      </a>
      <div
        className={`scrim ${isOpen ? "show" : ""}`}
        id="scrim"
        onClick={closeMenu}
        aria-hidden="true"
      />
      <header className="mobile-bar">
        <span className="brand">DB設計 Mere Mortals</span>
        <button
          id="menuToggle"
          ref={toggleBtnRef}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="sidebar"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          type="button"
        >
          {isOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </button>
      </header>
      <aside
        className={`sidebar ${isOpen ? "open" : ""}`}
        id="sidebar"
        ref={sidebarRef}
        aria-label="目次ナビゲーション"
      >
        <div className="sidebar-brand">
          <IconDatabase className="ti" size={24} />
          <div className="sidebar-brand-text">
            DB設計を学ぶ
            <small>Mere Mortals 解説ガイド</small>
          </div>
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
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {item.icon}
                    {item.label}
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
