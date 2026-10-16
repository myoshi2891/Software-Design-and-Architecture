"use client";

import {
  IconAbc,
  IconActivity,
  IconAffiliate,
  IconAlertTriangle,
  IconArrowUpCircle,
  IconBook2,
  IconBrandDocker,
  IconChecklist,
  IconCloud,
  IconCopy,
  IconCpu,
  IconDatabaseExport,
  IconFlag,
  IconFlagCheck,
  IconGauge,
  IconHierarchy3,
  IconInfoCircle,
  IconLink,
  IconListSearch,
  IconMenu2,
  IconNotebook,
  IconRefresh,
  IconRoute,
  IconServer2,
  IconSettings,
  IconShieldCheck,
  IconTable,
  IconUsers,
  IconX,
  IconZoomCode,
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
    title: "ガイドについて",
    items: [
      { id: "about", label: "この記事について", icon: <IconInfoCircle size={18} /> },
      { id: "book-info", label: "書籍情報", icon: <IconNotebook size={18} /> },
      { id: "audience", label: "対象読者", icon: <IconUsers size={18} /> },
    ],
  },
  {
    title: "全体像",
    items: [
      { id: "structure", label: "本書の全体像", icon: <IconHierarchy3 size={18} /> },
      { id: "roadmap", label: "学習ロードマップ", icon: <IconRoute size={18} /> },
      { id: "step0", label: "Step0 動機", icon: <IconFlag size={18} /> },
    ],
  },
  {
    title: "Part1 基礎",
    items: [
      { id: "step1", label: "Step1 アーキテクチャ", icon: <IconCpu size={18} /> },
      { id: "step2", label: "Step2 監視とSLO", icon: <IconActivity size={18} /> },
      { id: "step3", label: "Step3 Performance Schema", icon: <IconGauge size={18} /> },
    ],
  },
  {
    title: "Part2 サーバ最適化",
    items: [
      { id: "step4", label: "Step4 OSとハードウェア", icon: <IconServer2 size={18} /> },
      { id: "step5", label: "Step5 サーバ設定", icon: <IconSettings size={18} /> },
      { id: "step6", label: "Step6 スキーマ設計", icon: <IconTable size={18} /> },
    ],
  },
  {
    title: "Part3 クエリとインデックス",
    items: [
      { id: "step7", label: "Step7 インデックス設計", icon: <IconListSearch size={18} /> },
      { id: "step8", label: "Step8 クエリ最適化", icon: <IconZoomCode size={18} /> },
    ],
  },
  {
    title: "Part4 運用とスケール",
    items: [
      { id: "step9", label: "Step9 レプリケーション", icon: <IconCopy size={18} /> },
      { id: "step10", label: "Step10 バックアップ", icon: <IconDatabaseExport size={18} /> },
      { id: "step11", label: "Step11 スケーリング", icon: <IconAffiliate size={18} /> },
    ],
  },
  {
    title: "Part5 クラウドと統制",
    items: [
      { id: "step12", label: "Step12 クラウド運用", icon: <IconCloud size={18} /> },
      { id: "step13", label: "Step13 コンプライアンス", icon: <IconShieldCheck size={18} /> },
      { id: "appendix-a", label: "付録A アップグレード", icon: <IconArrowUpCircle size={18} /> },
      { id: "appendix-b", label: "付録B Kubernetes", icon: <IconBrandDocker size={18} /> },
    ],
  },
  {
    title: "補足情報",
    items: [
      { id: "updates2026", label: "2026年アップデート", icon: <IconRefresh size={18} /> },
      { id: "critical", label: "批判的に読む", icon: <IconAlertTriangle size={18} /> },
      { id: "checklist", label: "学習チェックリスト", icon: <IconChecklist size={18} /> },
      { id: "glossary", label: "用語集", icon: <IconAbc size={18} /> },
      { id: "summary", label: "まとめ", icon: <IconFlagCheck size={18} /> },
      { id: "references", label: "参考文献", icon: <IconLink size={18} /> },
    ],
  },
];

export default function HighPerformanceMysqlSidebar() {
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
    const allIds = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));
    const handleScroll = () => {
      const line = window.innerHeight * 0.22;
      let currentId = allIds[0];
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line) {
          currentId = id;
        } else {
          break;
        }
      }
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (nearBottom) {
        currentId = allIds[allIds.length - 1];
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="mobile-toggle"
        id="menuToggle"
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
      </button>

      <div
        className={`scrim ${isOpen ? "show" : ""}`}
        id="scrim"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <nav className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        <div className="brand">
          <span className="kicker">
            <IconBook2 size={16} />
            書籍解説ガイド
          </span>
          <h1>High Performance MySQL 徹底解説</h1>
          <p>第4版を章立てに沿ってステップ解説</p>
        </div>

        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="nav-group">
            <div className="nav-group-title">{group.title}</div>
            {group.items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeId === item.id ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        ))}
      </nav>
    </>
  );
}
