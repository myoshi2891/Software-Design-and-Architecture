import { useEffect, useState } from "react";

/**
 * Tracks the id of the section currently in view.
 *
 * @param sectionSelector - CSS selector used to find the sections to observe.
 * @param initialActiveId - Initial value for the active section id.
 * @returns The id of the section currently considered active, or `null` when none is active.
 */
export function useScrollSpy(sectionSelector: string, initialActiveId: string | null) {
  const [activeId, setActiveId] = useState<string | null>(initialActiveId);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector));
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

    for (const s of sections) {
      observer.observe(s);
    }

    return () => observer.disconnect();
  }, [sectionSelector]);

  return activeId;
}
