"use client";
import { memo, useEffect, useRef } from "react";

type Props = {
  chart: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  /** true のとき viewBox 由来の自然 px 幅を minWidth にも固定し、コンテナ幅による縮小を抑止する。 */
  preserveNaturalScale?: boolean;
};

// 元 HTML の mermaid.initialize 設定（dark テーマ + カスタム themeVariables）を移植。
// themeVariables.fontSize は Mermaid 内部の SVG レイアウト採寸に使われるため絶対 px 値が必須。
// CSS 側で SVG 内部要素の font-size を上書きすることはなく、Mermaid が採寸した 16px の値が
// そのまま描画に使われる（= ルートフォントサイズ 16px、すなわち 1rem と一致する）。
const THEME_VARIABLES = {
  background: "#161b27",
  primaryColor: "#2d1f4e",
  primaryTextColor: "#e8eaf0",
  primaryBorderColor: "#4a2a8a",
  lineColor: "#4a5680",
  secondaryColor: "#0f2e2e",
  tertiaryColor: "#1e2535",
  edgeLabelBackground: "#161b27",
  fontSize: "16px", // Mermaid 採寸用絶対値（= 1rem = ルートフォント 16px）
} as const;

// mermaid.run() は描画 ID を `mermaid-${Date.now()}` でしか採番せず（node_modules/mermaid の
// InitIDGenerator）、同一ミリ秒にマウントされた複数図で ID が衝突する。フローチャート等の
// renderer は document.querySelector('[id="..."]') と文書全体を走査して描画先 SVG を決めるため、
// 衝突すると後発の図が先行図の SVG へ描き込まれ「図の混在」「空枠」が発生する。
// 対策は (1) 呼び出し側で衝突しない ID を採番して mermaid.render() を直接呼ぶ、
//        (2) グローバル設定（initialize）と描画を直列化する、の 2 点。
// import("mermaid") をインスタンスごとに呼ぶと、同時マウント時にモジュール解決と
// initialize（グローバル設定）が競合する。モジュールスコープで 1 本の Promise を共有する。
let mermaidModulePromise: Promise<typeof import("mermaid")> | null = null;
function loadMermaid(): Promise<typeof import("mermaid")> {
  mermaidModulePromise ??= import("mermaid");
  return mermaidModulePromise;
}

let mermaidInitialized = false;
let diagramSeq = 0;
function nextDiagramId(): string {
  diagramSeq += 1;
  return `mermaid-svg-${Date.now()}-${diagramSeq}`;
}

// mermaid は initialize のグローバル設定を描画時に参照するため、描画は 1 件ずつ直列に流す。
let renderQueue: Promise<unknown> = Promise.resolve();
function enqueueRender<T>(task: () => Promise<T>): Promise<T> {
  const result = renderQueue.then(task, task);
  // キューは失敗しても後続を止めない（エラーは呼び出し側で処理する）
  renderQueue = result.catch(() => undefined);
  return result;
}

/**
 * Mermaid ソースから制御行（%%{init:...}%%、--- フロントマター、%% コメント、空行）を
 * 取り除き、最初の図種宣言行を返す。
 */
export function detectDiagramType(chart: string): string {
  const lines = chart.split("\n");
  let i = 0;
  // 先頭の空行・%% コメントを先に読み飛ばす。lines[0] 固定で判定すると、空行が
  // 1 行入っただけでフロントマター判定が外れ "---" を図種として返してしまう。
  while (i < lines.length && (lines[i].trim() === "" || lines[i].trim().startsWith("%%"))) i++;
  // --- で始まる YAML フロントマターをスキップ
  if (lines[i]?.trim() === "---") {
    i++;
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
export function applySvgFixups(
  svgEl: SVGSVGElement,
  chart: string,
  preserveNaturalScale: boolean
): void {
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

  // 表示幅は viewBox 由来の自然 px 幅に固定する（スキル fix-mermaid §SVG 幅の鉄則）。
  // 狭い図を 480px 等へ引き伸ばすと SVG 全体がスケールされ、viewBox 内 16px の文字が
  // 2〜4 倍の巨大文字になる（flowchart TB のような縦直列図で顕著）。
  // width:'100%' / width:'auto' も同じ理由で不可（intrinsic サイズを持たない SVG は
  // コンテナ全幅まで伸びる）。コンテナより広い図は maxWidth: 100% で縮小フィットする。
  svgEl.style.display = "block";
  svgEl.style.width = `${w}px`;
  svgEl.style.maxWidth = "100%";
  svgEl.style.margin = "0 auto";
  if (preserveNaturalScale && w > 0) {
    svgEl.style.minWidth = `${w}px`;
  }
  // 高さ上限は付けない（縦長図に max-height を掛けると横幅と文字まで縮小するため）。
  svgEl.style.maxHeight = "none";
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
    void loadMermaid()
      .then(async (m) => {
        if (!active || !ref.current) return;
        // 設定は全図で共通。描画中に別インスタンスが initialize を呼ぶとグローバル設定が
        // 書き換わるため、初回のみ実行する。
        if (!mermaidInitialized) {
          mermaidInitialized = true;
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
        }
        try {
          // Web フォント読込前に採寸すると日本語ラベルの幅が不足して末尾が切れる
          // （スキル fix-mermaid §可読性・文字切れ対策）。jsdom など FontFaceSet 非対応の
          // 環境では undefined になるため optional chaining で待機を省略する。
          try {
            await document.fonts?.ready;
          } catch (fontErr: unknown) {
            // フォント状態を取得できなくても描画自体は継続する（握りつぶさず記録のみ）
            console.warn("[MermaidDiagram] document.fonts.ready failed:", fontErr);
          }
          if (!active || !ref.current) return;
          // run() ではなく render() を使い、ID を呼び出し側で一意に採番する（ID 衝突対策）。
          // 第 3 引数にコンテナを渡すと採寸がページ内（.mbox スコープ）で行われ、
          // body 直下へ退避した場合のようなフォントサイズ差による文字切れを避けられる。
          const target = ref.current;
          const { svg, bindFunctions } = await enqueueRender(() =>
            m.default.render(nextDiagramId(), chart, target)
          );
          if (!active || !ref.current) return;
          ref.current.innerHTML = svg;
          bindFunctions?.(ref.current);
          // SVG 後処理：innerHTML 注入直後のライブ DOM に対して実施
          const svgEl = ref.current.querySelector("svg");
          if (svgEl instanceof SVGSVGElement) {
            applySvgFixups(svgEl, chart, preserveNaturalScale);
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
      // コンテナは行幅いっぱいを確保し、中の SVG は applySvgFixups の自然幅 + margin auto
      // （CSS 側は justify-content: safe center）で中央寄せする。SVG 自体は引き伸ばさない。
      style={{ width: "100%", maxWidth: "100%", minHeight: "4rem", ...style }}
    />
  );
});

export default MermaidDiagram;
