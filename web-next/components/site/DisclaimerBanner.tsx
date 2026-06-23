"use client";

import { useEffect, useRef } from "react";

/**
 * 2 行のディスクレーマーを描画し、ResizeObserver で高さを
 * --ch-disclaimer-height に同期する。body.has-common-header の
 * margin-top 計算に使われる。
 */
export function DisclaimerBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--ch-disclaimer-height", `${h}px`);
    };

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(sync);
      ro.observe(el);
      return () => ro.disconnect();
    }

    requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div ref={ref} className="ch-disclaimer" lang="ja">
      <span className="ch-disclaimer-line">
        ⚠ 本サイトは個人がまとめた学習用の参考資料です。内容の正確性・最新性は保証しません。
      </span>
      <span className="ch-disclaimer-line">
        実際の設計判断は公式ドキュメントや一次情報を必ずご確認ください。本サイトの利用による損害等について一切の責任を負いません。
      </span>
    </div>
  );
}
