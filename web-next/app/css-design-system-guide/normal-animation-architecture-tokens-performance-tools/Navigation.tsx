"use client";
import { type ReactNode, useEffect, useRef } from "react";

/** Hydrates only the guide chrome; chapter content remains server-rendered. */
export default function Navigation({ children }: { children: ReactNode }) {
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = nav.current;
    const root = element?.closest(".normal-animation-architecture-tokens-performance-tools");
    if (!element || !root) return;
    const links = [...element.querySelectorAll<HTMLAnchorElement>("a[data-toc]")];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const link of links) {
            const active = link.hash === "#" + entry.target.id;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    for (const link of links) {
      // ハッシュをセレクタとして解釈すると不正な ID で DOMException になるため ID で直接引く
      const target = link.hash ? document.getElementById(link.hash.slice(1)) : null;
      if (target && root.contains(target)) observer.observe(target);
    }
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        scrollable > 0
          ? Math.max(0, Math.min(100, Math.round((window.scrollY / scrollable) * 100)))
          : 0;
      const bar = element.querySelector<HTMLElement>("#progressBar");
      const label = element.querySelector("#progressPct");
      if (bar) bar.style.width = pct + "%";
      if (label) label.textContent = pct + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    let fade: IntersectionObserver | undefined;
    const targets = [...root.querySelectorAll(".sub,.diagram-card,.bp-box")];
    if (!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      fade = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              fade?.unobserve(entry.target);
            }
        },
        { threshold: 0.08 }
      );
      for (const target of targets) {
        target.classList.add("fade-in");
        fade.observe(target);
      }
    }
    return () => {
      observer.disconnect();
      fade?.disconnect();
      window.removeEventListener("scroll", updateProgress);
      for (const target of targets) target.classList.remove("fade-in", "is-visible");
    };
  }, []);
  return (
    <nav className="sidebar" aria-label="目次" ref={nav}>
      {children}
    </nav>
  );
}
