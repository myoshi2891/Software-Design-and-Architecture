"use client";
import { useEffect, useRef, useState } from "react";
export type NavGroup = {
  label: string;
  items: { id: string; num: string; label: string; sub: boolean }[];
};

// 視差効果を減らす設定ではスムーズスクロールを無効化する。
const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

// scrollIntoView は祖先（ページ）までスクロールし本文のスムーズスクロールを中断するため、
// 表示範囲外のときだけサイドバー自身をスクロールしてリンクを見せる。
function revealInSidebar(nav: HTMLElement | null, id: string) {
  const link = nav?.querySelector<HTMLElement>(`a[href="#${id}"]`);
  if (!nav || !link) return;
  const view = nav.getBoundingClientRect();
  const target = link.getBoundingClientRect();
  const offset =
    target.top < view.top
      ? target.top - view.top
      : target.bottom > view.bottom
        ? target.bottom - view.bottom
        : 0;
  if (offset === 0) return;
  nav.scrollTo?.({ top: nav.scrollTop + offset, behavior: scrollBehavior() });
}

export default function Navigation({ groups }: { groups: NavGroup[] }) {
  const sidebar = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  // クリックで選んだ ID。章 section は小節を内包し交差中のまま通知されないうえ、
  // 移動中に小節が判定帯を通過するため、スクロール終了まで監視による上書きを止める。
  const clickedId = useRef<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        height > 0 ? Math.max(0, Math.min(100, Math.round((window.scrollY / height) * 100))) : 0
      );
      setShowTop(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickedId.current) return;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActiveId(id);
          revealInSidebar(sidebar.current, id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    for (const item of groups.flatMap((group) => group.items)) {
      const target = document.querySelector(`.design-system-css-fundamentals [id="${item.id}"]`);
      if (target) observer.observe(target);
    }
    const release = () => {
      clickedId.current = null;
    };
    window.addEventListener("scrollend", release);
    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", release);
    };
  }, [groups]);
  return (
    <>
      <button
        id="top-btn"
        type="button"
        title="先頭へ戻る"
        aria-label="先頭へ戻る"
        className={showTop ? "visible" : undefined}
        onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
      >
        ⇧
      </button>
      <nav id="sidebar" ref={sidebar} aria-label="目次">
        <div className="sb-logo">
          <h1>🎨 フロントエンド入門</h1>
          <p>デザインシステムとCSS設計の基礎</p>
        </div>
        <div className="sb-progress">
          <div className="sb-progress-bar">
            <div
              className="sb-progress-fill"
              id="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="sb-progress-label" id="progress-label">
            読書進捗: {progress}%
          </div>
        </div>
        <nav className="sb-nav" aria-label="章とセクション">
          {groups.map((group) => (
            <div className="sb-group" key={group.label}>
              <div className="sb-group-label">{group.label}</div>
              {group.items.map((item) => (
                <a
                  href={`#${item.id}`}
                  key={item.id}
                  className={`sb-link${item.sub ? " sub" : ""}${activeId === item.id ? " active" : ""}`}
                  aria-current={activeId === item.id ? "location" : undefined}
                  onClick={() => {
                    clickedId.current = item.id;
                    setActiveId(item.id);
                  }}
                >
                  <span className="num">{item.num}</span>
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </nav>
    </>
  );
}
