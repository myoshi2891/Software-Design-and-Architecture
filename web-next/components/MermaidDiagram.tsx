"use client";
import { memo, useEffect, useRef } from "react";

type Props = {
  chart: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  /** true のとき viewBox 由来の自然 px 幅で表示（縮小なし）。false（既定）のとき狭い図を最小 480px まで拡大。 */
  preserveNaturalScale?: boolean;
};

// 元 HTML の mermaid.initialize 設定（dark テーマ + カスタム themeVariables）を移植。
// fontSize は採寸と実描画を一致させるため絶対値 16px で明示する（スキル fix-mermaid §採寸値と CSS 文字サイズを一致させる）。
const THEME_VARIABLES = {
  background: "#161b27",
  primaryColor: "#2d1f4e",
  primaryTextColor: "#e8eaf0",
  primaryBorderColor: "#4a2a8a",
  lineColor: "#4a5680",
  secondaryColor: "#0f2e2e",
  tertiaryColor: "#1e2535",
  edgeLabelBackground: "#161b27",
  fontSize: "16px",
} as const;

/**
 * Mermaid ソースから制御行（%%{init:...}%%、--- フロントマター、%% コメント、空行）を
 * 取り除き、最初の図種宣言行を返す。
 */
function detectDiagramType(chart: string): string {
  const lines = chart.split("\n");
  let i = 0;
  // --- で始まる YAML フロントマターをスキップ
  if (lines[0]?.trim() === "---") {
    i = 1;
    while (i < lines.length && lines[i].trim() !== "---") i++;
    i++;
  }
  for (; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "" || line.startsWith("%%")) continue;
    return line;
  }
  return "";
}

/**
 * SVG 後処理：viewBox 由来の自然幅を設定し、下部見切れを防ぐ高さ拡張を行う。
 * スキル fix-mermaid §SVG 後処理は「文字列加工」ではなく「ライブ DOM 操作」で行う に準拠。
 */
function applySvgFixups(svgEl: SVGSVGElement, chart: string, preserveNaturalScale: boolean): void {
  svgEl.removeAttribute("width");
  svgEl.removeAttribute("height");
  svgEl.style.height = "auto";
  svgEl.style.overflow = "visible"; // viewBox から数px はみ出す描画の途切れ防止
  svgEl.style.marginBottom = "10px";
  // 再処理時に前回の minWidth が残ると固定幅のまま横スクロールが発生するため先にクリア
  svgEl.style.minWidth = "";

  const viewBox = svgEl.getAttribute("viewBox");
  if (!viewBox) return;
  const parts = viewBox.split(/\s+/).map(Number);
  if (parts.length !== 4 || !parts.every((n) => Number.isFinite(n))) return;

  // 先頭の %%{init:...}%% ディレクティブ・--- フロントマター・%% コメント・空行を
  // 読み飛ばしてから図種を判定する（単純な先頭一致では判定が外れる）
  const isSequenceOrState = /^(sequenceDiagram|stateDiagram)/.test(detectDiagramType(chart));
  const extraHeight = isSequenceOrState ? 110 : 15;
  const [x, y, w, h] = parts as [number, number, number, number];

  let targetWidth: number;
  if (preserveNaturalScale && w > 0) {
    // 自然幅モード: Mermaid の採寸倍率をそのまま維持
    targetWidth = w;
  } else if (!preserveNaturalScale && w > 0 && w < 550) {
    // 狭い図を最小 480px まで拡大（文字を潰さない範囲）
    targetWidth = Math.min(650, Math.max(Math.round(w * 1.35), 480));
  } else {
    targetWidth = w;
  }

  svgEl.style.width = `${targetWidth}px`;
  svgEl.style.maxWidth = "100%";
  if (preserveNaturalScale && targetWidth > 0) {
    svgEl.style.minWidth = `${targetWidth}px`;
  }
  svgEl.style.maxHeight = preserveNaturalScale ? "none" : h > 550 ? "580px" : "none";
  svgEl.setAttribute("viewBox", `${x} ${y} ${w} ${h + extraHeight}`);
}

/**
 * Renders a Mermaid diagram from source text on the client.
 *
 * The diagram is re-rendered whenever `chart` changes. If Mermaid cannot be loaded or the diagram
 * cannot be rendered, the container shows a fallback message.
 *
 * @param chart - Mermaid source text
 * @param id - The `id` attribute for the container div
 * @param style - Inline styles merged with the default container styles
 * @param className - Additional CSS classes applied to the container
 * @param preserveNaturalScale - When true, display at viewBox natural width without upscaling
 */
const MermaidDiagram = memo(function MermaidDiagram({
  chart,
  id,
  style,
  className,
  preserveNaturalScale = false,
}: Props) {
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
          flowchart: { curve: "basis", htmlLabels: true, useMaxWidth: false },
          sequence: { useMaxWidth: false },
          gantt: { fontSize: 16 },
          pie: { textPosition: 0.75 },
        });
        ref.current.textContent = chart;
        ref.current.removeAttribute("data-processed");
        try {
          await m.default.run({ nodes: [ref.current] });
          // SVG 後処理：run() が innerHTML を SVG に置き換えた直後に実施
          if (active && ref.current) {
            const svgEl = ref.current.querySelector("svg");
            if (svgEl instanceof SVGSVGElement) {
              applySvgFixups(svgEl, chart, preserveNaturalScale);
            }
          }
        } catch (err) {
          console.error("[MermaidDiagram] render failed:", err);
          if (active && ref.current) {
            ref.current.textContent = "⚠️ ダイアグラムを描画できませんでした";
          }
        }
      })
      .catch((err: unknown) => {
        console.error("[MermaidDiagram] load failed:", err);
        if (active && ref.current) {
          ref.current.textContent = "⚠️ ダイアグラムを描画できませんでした";
        }
      });
    return () => {
      active = false;
    };
  }, [chart, preserveNaturalScale]);

  return (
    <div
      id={id}
      className={`mermaid ${className || ""}`}
      ref={ref}
      style={{ width: "100%", minHeight: "4rem", ...style }}
    />
  );
});

export default MermaidDiagram;
