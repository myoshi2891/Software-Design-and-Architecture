import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MermaidDiagram from "@/components/MermaidDiagram";

// 同時マウント時の描画分離（回帰防止）:
// mermaid.run() は描画 ID を Date.now() のみで採番するため、同一ミリ秒に複数図が描画されると
// ID が衝突する。フローチャート renderer は document.querySelector('[id=...]') と文書全体を
// 走査して描画先 SVG を決めるので、衝突すると後発の図が先行図の SVG に描き込まれ、
// 「1 つの枠に複数の図が混在」「別の枠が空」という症状になる。
const { renderedIds, renderSpy, runSpy } = vi.hoisted(() => {
  const renderedIds: string[] = [];
  return {
    renderedIds,
    renderSpy: vi.fn(async (id: string, chart: string) => {
      renderedIds.push(id);
      return { svg: `<svg id="${id}" viewBox="0 0 100 50"><g>${chart}</g></svg>` };
    }),
    runSpy: vi.fn(async () => undefined),
  };
});

vi.mock("mermaid", () => ({
  default: { initialize: vi.fn(), render: renderSpy, run: runSpy },
}));

describe("MermaidDiagram の同時描画", () => {
  it("複数インスタンスが一意の描画 ID で自身のコンテナにのみ描画する", async () => {
    const { container } = render(
      <>
        <MermaidDiagram chart={"flowchart TD\nA-->B"} id="diag-a" />
        <MermaidDiagram chart={"flowchart LR\nC-->D"} id="diag-b" />
      </>
    );

    await waitFor(() => expect(renderSpy).toHaveBeenCalledTimes(2));
    // ID が一意であること（Date.now() 単独では同一ミリ秒で衝突する）
    expect(new Set(renderedIds).size).toBe(2);
    // グローバル走査に依存する run() は使わない
    expect(runSpy).not.toHaveBeenCalled();
    // 各コンテナが自分のチャートのみを保持する
    await waitFor(() => {
      expect(container.querySelector("#diag-a")?.innerHTML).toContain("A--&gt;B");
    });
    expect(container.querySelector("#diag-a")?.innerHTML).not.toContain("C--&gt;D");
    expect(container.querySelector("#diag-b")?.innerHTML).toContain("C--&gt;D");
  });
});
