import { useEffect, useRef } from "react";

/**
 * Custom hook that updates the scaleX transform of a progress bar element based on the page scroll position.
 * Returns a React ref to be attached to the progress bar element.
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
