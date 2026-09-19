import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MermaidDiagram, { applySvgFixups, detectDiagramType } from "@/components/MermaidDiagram";

describe("MermaidDiagram", () => {
  it("チャートを mermaid コンテナ div として描画する", () => {
    const { container } = render(<MermaidDiagram chart={"flowchart LR\n  A-->B"} />);
    expect(container.querySelector("div.mermaid")).not.toBeNull();
  });

  it("id と追加 className を付与できる", () => {
    const { container } = render(
      <MermaidDiagram chart="flowchart TD\n  A" id="diag-1" className="extra" />
    );
    const el = container.querySelector("#diag-1");
    expect(el).not.toBeNull();
    expect(el?.className).toContain("mermaid");
    expect(el?.className).toContain("extra");
  });
});

describe("detectDiagramType", () => {
  it("先頭の空行・コメントを読み飛ばして図種を返す", () => {
    expect(detectDiagramType("\n%% コメント\nsequenceDiagram\n  A->>B: x")).toBe("sequenceDiagram");
  });

  it("先頭に空行があってもフロントマターをスキップして図種を返す", () => {
    const chart = "\n---\ntitle: 状態遷移\n---\nstateDiagram-v2\n  [*] --> A";
    expect(detectDiagramType(chart)).toBe("stateDiagram-v2");
  });
});

describe("applySvgFixups", () => {
  function makeSvg(viewBox: string): SVGSVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("width", "1000px");
    svg.setAttribute("height", "2000px");
    return svg;
  }

  it("狭い縦直列フローチャートを引き伸ばさず viewBox 由来の自然幅で表示する", () => {
    const svg = makeSvg("0 0 200 900");
    applySvgFixups(svg, "flowchart TB\n  A --> B", false);
    // 480px 等への強制拡大は文字まで 2〜4 倍に拡大するため禁止
    expect(svg.style.width).toBe("200px");
    expect(svg.style.maxWidth).toBe("100%");
    expect(svg.style.height).toBe("auto");
    expect(svg.hasAttribute("width")).toBe(false);
    expect(svg.hasAttribute("height")).toBe(false);
  });

  it("コンテナより広い図も自然幅 + maxWidth 100% で縮小フィットさせる", () => {
    const svg = makeSvg("0 0 1200 600");
    applySvgFixups(svg, "flowchart LR\n  A --> B", false);
    expect(svg.style.width).toBe("1200px");
    expect(svg.style.maxWidth).toBe("100%");
  });

  it("preserveNaturalScale では minWidth に自然幅を固定する", () => {
    const svg = makeSvg("0 0 200 900");
    applySvgFixups(svg, "flowchart TB\n  A --> B", true);
    expect(svg.style.minWidth).toBe("200px");
    expect(svg.style.width).toBe("200px");
  });

  it("シーケンス図は viewBox 高さを +110、その他は +15 拡張する", () => {
    const seq = makeSvg("0 0 400 300");
    applySvgFixups(seq, "sequenceDiagram\n  A->>B: x", false);
    expect(seq.getAttribute("viewBox")).toBe("0 0 400 410");

    const flow = makeSvg("0 0 400 300");
    applySvgFixups(flow, "flowchart TB\n  A --> B", false);
    expect(flow.getAttribute("viewBox")).toBe("0 0 400 315");
  });
});
