import { useEffect, useRef } from "react";

/**
 * Tracks page scroll progress on a progress bar element.
 *
 * @returns A ref for the progress bar element.
 */
export function useScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docH > 0 ? Math.max(0, Math.min(1, window.scrollY / docH)) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${prog})`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progressRef;
}
