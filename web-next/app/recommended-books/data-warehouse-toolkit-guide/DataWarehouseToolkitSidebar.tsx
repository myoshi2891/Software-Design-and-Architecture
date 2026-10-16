"use client";

import {
  IconBook,
  IconChecklist,
  IconDatabase,
  IconLink,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly num?: string;
  readonly icon?: React.ReactNode;
};

export type NavGroup = {
  readonly label: string;
  readonly items: readonly NavItem[];
};

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "はじめに",
    items: [
      { id: "book-info", num: "01", label: "本書の基本情報" },
      { id: "authors", num: "02", label: "著者について" },
      { id: "roadmap", num: "03", label: "学習ロードマップ" },
    ],
  },
  {
    label: "基礎編",
    items: [
      { id: "step0", num: "00", label: "定番教科書の理由" },
      { id: "step1", num: "01", label: "OLTPとOLAP" },
      { id: "step2", num: "02", label: "Kimball対Inmon" },
      { id: "step3", num: "03", label: "4ステップ設計プロセス" },
      { id: "step4", num: "04", label: "スタースキーマ" },
    ],
  },
  {
    label: "実践編",
    items: [
      { id: "step5", num: "05", label: "ファクトテーブルの3型" },
      { id: "step6", num: "06", label: "ディメンション設計技法" },
      { id: "step7", num: "07", label: "SCD" },
      { id: "step8", num: "08", label: "バスマトリクス" },
      { id: "step9", num: "09", label: "ETLの34サブシステム" },
    ],
  },
  {
    label: "発展編",
    items: [
      { id: "step10", num: "10", label: "全21章の早見表" },
      { id: "step11", num: "11", label: "モダン基盤での位置づけ" },
      { id: "step12", num: "12", label: "批判的に読む" },
    ],
  },
  {
    label: "まとめ",
    items: [
      {
        id: "checklist",
        label: "学習チェックリスト",
        icon: <IconChecklist className="ti" aria-hidden="true" size={17} />,
      },
      {
        id: "glossary",
        label: "用語集",
        icon: <IconBook className="ti" aria-hidden="true" size={17} />,
      },
      {
        id: "references",
        label: "参考文献・出典",
        icon: <IconLink className="ti" aria-hidden="true" size={17} />,
      },
    ],
  },
];

export default function DataWarehouseToolkitSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("book-info");
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
    const sectionIds = NAV_GROUPS.flatMap((group) => group.items.map((item) => item.id));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
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

  // モバイルメニュー外クリックで閉じる
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div className="mobile-bar">
        <button
          ref={toggleBtnRef}
          type="button"
          id="menuToggle"
          aria-label={isOpen ? "目次を閉じる" : "目次を開く"}
          aria-expanded={isOpen}
          aria-controls="sidebar"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <IconX aria-hidden="true" size={20} />
          ) : (
            <IconMenu2 aria-hidden="true" size={20} />
          )}
        </button>
        <div className="mb-title">DWH Toolkit 完全読解ガイド</div>
      </div>

      <nav
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "open" : ""}`}
        id="sidebar"
        aria-label="ドキュメント目次"
      >
        <div className="brand">
          <div className="brand-mark">
            <IconDatabase className="ti" aria-hidden="true" size={22} style={{ color: "var(--indigo)" }} />
            <span>DWH Toolkit ガイド</span>
          </div>
          <div className="brand-sub">
            Kimball &amp; Ross ディメンショナルモデリング
            <br />
            初学者向け完全読解ガイド
          </div>
        </div>

        {NAV_GROUPS.map((group) => (
          <div className="navgroup" key={group.label}>
            <div className="navgroup-label">{group.label}</div>
            {group.items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  className={`nav-a ${isActive ? "active" : ""}`}
                  href={`#${item.id}`}
                  onClick={closeMenu}
                >
                  {item.num && <span className="n-num">{item.num}</span>}
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}
