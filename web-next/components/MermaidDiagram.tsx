"use client";
import { useEffect, useRef } from "react";

type Props = {
  chart: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
};

// 元 HTML の mermaid.initialize 設定（dark テーマ + カスタム themeVariables）を移植。
const THEME_VARIABLES = {
  background: "#161b27",
  primaryColor: "#2d1f4e",
  primaryTextColor: "#e8eaf0",
  primaryBorderColor: "#4a2a8a",
  lineColor: "#4a5680",
  secondaryColor: "#0f2e2e",
  tertiaryColor: "#1e2535",
  edgeLabelBackground: "#161b27",
  fontSize: "14px",
} as const;

/**
 * Mermaid ソース文字列を受け取り、クライアント側で図を描画する。
 *
 * `mermaid` を動的 import して SSR を回避し、`chart` が変わるたびに再描画する。
 * 描画に失敗した場合はコンテナにフォールバックメッセージを表示する。
 *
 * @param chart - Mermaid 記法のソース文字列
 * @param id - コンテナに付与する id 属性（任意）
 * @param style - 既定のスタイルにマージするインラインスタイル（任意）
 * @param className - "mermaid" に追加する CSS クラス（任意）
 */
export default function MermaidDiagram({ chart, id, style, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    void import("mermaid")
      .then(async (m) => {
        if (!active || !ref.current) return;
        m.default.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: THEME_VARIABLES,
          htmlLabels: true,
          flowchart: { curve: "basis", htmlLabels: true, useMaxWidth: true },
          sequence: { useMaxWidth: true },
          gantt: { fontSize: 13 },
          pie: { textPosition: 0.75 },
        });
        ref.current.textContent = chart;
        ref.current.removeAttribute("data-processed");
        try {
          await m.default.run({ nodes: [ref.current] });
        } catch (err) {
          console.error("[MermaidDiagram] render failed:", err);
          if (active && ref.current) {
            ref.current.textContent = "⚠️ ダイアグラムを描画できませんでした";
          }
        }
      })
      .catch((err: unknown) => {
        console.error("[MermaidDiagram] load failed:", err);
      });
    return () => {
      active = false;
    };
  }, [chart]);

  return (
    <div
      id={id}
      className={`mermaid ${className || ""}`}
      ref={ref}
      style={{ width: "100%", minHeight: "4rem", ...style }}
    />
  );
}
