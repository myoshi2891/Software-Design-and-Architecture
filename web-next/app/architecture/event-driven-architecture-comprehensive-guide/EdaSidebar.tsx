"use client";
import { useEffect, useRef, useState } from "react";

export type NavItem = {
  /** 対応する section の id（例: "sec-1"） */
  id: string;
  /** サイドバーに表示する 2 桁番号（例: "01"） */
  num: string;
  /** リンクラベル */
  label: string;
};

export type NavGroup = {
  /** グループ見出し（例: "基礎知識"） */
  title: string;
  items: NavItem[];
};

type Props = {
  groups: NavGroup[];
};

/**
 * EDA ガイドの固定サイドバー + スクロール進捗バー。
 *
 * 元 HTML のインライン script（progress-bar の scaleX 更新と
 * IntersectionObserver によるサイドバー現在地ハイライト）を React 化する。
 * 本文（section 群）は Server Component 側に残し、本コンポーネントは
 * chrome（サイドバー・進捗バー）の interactivity のみを担う。
 */
export default function EdaSidebar({ groups }: Props) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(groups[0]?.items[0]?.id ?? null);

  // ── 進捗バー: スクロール量に応じて scaleX を更新 ──
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docH > 0 ? window.scrollY / docH : 0;
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
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section.section"));
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
        <div className="sb-logo">
          <span className="sb-logo-icon">⚡</span>
          <div className="sb-logo-title">EDA 完全ガイド</div>
          <div className="sb-logo-sub">イベント駆動アーキテクチャ</div>
        </div>
        <nav className="sb-nav">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="sb-group">{group.title}</div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  className={`sl${activeId === item.id ? " active" : ""}`}
                  href={`#${item.id}`}
                >
                  <span className="sl-num">{item.num}</span>
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="sb-footer">
          Software Architect Guide
          <br />
          Version 2.0 | 2025年版
        </div>
      </aside>
    </>
  );
}
