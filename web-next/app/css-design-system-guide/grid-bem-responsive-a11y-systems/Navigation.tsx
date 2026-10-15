"use client";
import { useEffect, useRef, useState } from "react";
export type NavGroup = { label: string; items: { id: string; num: string; label: string }[] };
export default function Navigation({ groups }: { groups: NavGroup[] }) {
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const clickedId = useRef<string | null>(null);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 狭い画面ではサイドバーを隠すため、目次ボタンで開閉する。
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const root = nav.current?.closest(".grid-bem-responsive-a11y-systems");
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickedId.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    for (const target of root?.querySelectorAll(".section, .sub") ?? []) observer.observe(target);
    const release = () => {
      clickedId.current = null;
      if (clickTimer.current !== null) clearTimeout(clickTimer.current);
      clickTimer.current = null;
    };
    window.addEventListener("scrollend", release);
    return () => {
      observer.disconnect();
      release();
      window.removeEventListener("scrollend", release);
    };
  }, []);
  return (
    <>
      <button
        ref={toggle}
        type="button"
        className="toc-toggle"
        aria-label={open ? "目次を閉じる" : "目次を開く"}
        aria-expanded={open}
        aria-controls="guide-toc"
        onClick={() => setOpen((value) => !value)}
      >
        ☰
      </button>
      <nav
        id="guide-toc"
        className={`sidebar${open ? " open" : ""}`}
        aria-label="ガイド目次"
        ref={nav}
        // 目次外へフォーカスが出たら閉じる。トグルへの移動は直後のクリックで再度開くため除外する。
        onBlur={(event) => {
          const next = event.relatedTarget;
          if (next instanceof Node && (nav.current?.contains(next) || toggle.current === next))
            return;
          setOpen(false);
        }}
        onKeyDown={(event) => {
          // open になるのはトグル表示中（狭い画面）のみなので、広い画面の動作は変わらない。
          if (event.key !== "Escape" || !open) return;
          setOpen(false);
          toggle.current?.focus();
        }}
      >
        <div className="sb-logo">
          <div className="t">CSS Design System</div>
          <div className="s">Ch.7–10 · フロントエンド完全ガイド</div>
        </div>
        {groups.map((group) => (
          <div className="ng" key={group.label}>
            <div className="ng-label">{group.label}</div>
            {/* Safari preserves list semantics when list-style is none. */}
            {/* biome-ignore lint/a11y/noRedundantRoles: Preserve list semantics in Safari. */}
            <ul role="list">
              {group.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={activeId === item.id ? "active" : undefined}
                    aria-current={activeId === item.id ? "location" : undefined}
                    onClick={() => {
                      clickedId.current = item.id;
                      setActiveId(item.id);
                      setOpen(false);
                      // No scrollend fires when the selected anchor is already in place.
                      if (clickTimer.current !== null) clearTimeout(clickTimer.current);
                      clickTimer.current = setTimeout(() => {
                        clickedId.current = null;
                        clickTimer.current = null;
                      }, 1000);
                    }}
                  >
                    <span className="n">{item.num}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}
