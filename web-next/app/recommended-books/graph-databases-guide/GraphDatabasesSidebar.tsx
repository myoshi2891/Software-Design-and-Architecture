"use client";

import {
  IconAlertTriangle,
  IconAlphabetLatin,
  IconBook2,
  IconChartDots3,
  IconChecklist,
  IconCpu,
  IconFlag2,
  IconHierarchy3,
  IconInfoCircle,
  IconLink,
  IconListDetails,
  IconMenu2,
  IconQuestionMark,
  IconRoute,
  IconScale,
  IconShare3,
  IconStack2,
  IconTerminal2,
  IconTool,
  IconTrendingUp,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";
import type React from "react";
import { useEffect, useState } from "react";

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly icon: React.ReactNode;
};

export type NavGroup = {
  readonly title: string;
  readonly items: readonly NavItem[];
};

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "about", label: "この記事について", icon: <IconInfoCircle size={18} /> },
      { id: "audience", label: "対象読者", icon: <IconUsers size={18} /> },
      { id: "book-info", label: "書籍情報", icon: <IconBook2 size={18} /> },
      { id: "toc", label: "章立て", icon: <IconListDetails size={18} /> },
      { id: "roadmap", label: "学習ロードマップ", icon: <IconRoute size={18} /> },
    ],
  },
  {
    title: "ステップで学ぶ",
    items: [
      { id: "step0", label: "Step0 グラフとは何か", icon: <IconShare3 size={18} /> },
      { id: "step1", label: "Step1 なぜグラフDBか", icon: <IconQuestionMark size={18} /> },
      { id: "step2", label: "Step2 プロパティグラフモデル", icon: <IconHierarchy3 size={18} /> },
      { id: "step3", label: "Step3 Cypher入門", icon: <IconTerminal2 size={18} /> },
      { id: "step4", label: "Step4 アプリケーション構築", icon: <IconTool size={18} /> },
      { id: "step5", label: "Step5 実世界の活用事例", icon: <IconWorld size={18} /> },
      { id: "step6", label: "Step6 内部構造", icon: <IconCpu size={18} /> },
      { id: "step7", label: "Step7 グラフ理論と予測分析", icon: <IconChartDots3 size={18} /> },
    ],
  },
  {
    title: "発展",
    items: [
      { id: "appendix", label: "付録 NoSQL全体像", icon: <IconStack2 size={18} /> },
      { id: "update2026", label: "2026年アップデート", icon: <IconTrendingUp size={18} /> },
      { id: "comparison", label: "主要グラフDB比較", icon: <IconScale size={18} /> },
      { id: "glossary", label: "用語集", icon: <IconAlphabetLatin size={18} /> },
    ],
  },
  {
    title: "まとめ",
    items: [
      { id: "critique", label: "批判的に読む", icon: <IconAlertTriangle size={18} /> },
      { id: "checklist", label: "学習チェックリスト", icon: <IconChecklist size={18} /> },
      { id: "summary", label: "まとめ", icon: <IconFlag2 size={18} /> },
      { id: "references", label: "参考文献", icon: <IconLink size={18} /> },
    ],
  },
];

export default function GraphDatabasesSidebar() {
  const [activeId, setActiveId] = useState<string>("about");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    const sections = document.querySelectorAll("section[id]");
    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <div className="mobile-bar">
        <div className="m-title">Graph Databases 初学者ガイド</div>
        <button
          type="button"
          id="menuBtn"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="sidebar"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <IconMenu2 size={18} aria-hidden="true" />
          メニュー
        </button>
      </div>

      <div
        className={`sidebar-scrim ${isOpen ? "show" : ""}`}
        id="scrim"
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        <div className="brand">
          <IconShare3 size={24} style={{ color: "var(--indigo)" }} />
          <div className="brand-title">Graph Databases</div>
          <div className="brand-sub">初学者ガイド &mdash; Robinson / Webber / Eifrem</div>
        </div>
        <nav>
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <div className="nav-group-label">{group.title}</div>
              {group.items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    className={`nav-a ${isActive ? "active" : ""}`}
                    href={`#${item.id}`}
                    onClick={closeSidebar}
                  >
                    <span className="nav-icon" style={{ display: "inline-flex", flex: "0 0 auto" }}>
                      {item.icon}
                    </span>
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
