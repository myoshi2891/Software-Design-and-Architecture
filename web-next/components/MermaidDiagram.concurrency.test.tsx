import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MermaidDiagram from "@/components/MermaidDiagram";

// 同時マウント時の描画分離（回帰防止）:
// mermaid.run() は描画 ID を Date.now() のみで採番するため、同一ミリ秒に複数図が描画されると
// ID が衝突する。フローチャート renderer は document.querySelector('[id=...]') と文書全体を
// 走査して描画先 SVG を決めるので、衝突すると後発の図が先行図の SVG に描き込まれ、
// 「1 つの枠に複数の図が混在」「別の枠が空」という症状になる。
const { renderedIds, renderSpy, runSpy, releaseFirstRender } = vi.hoisted(() => {
  const renderedIds: string[] = [];
  let callCount = 0;
  let resolveFirst: (() => void) | undefined;
  // 1回目の render() 呼び出しをこのゲートで意図的に pending のまま止め、
  // 直列化（enqueueRender）が機能していれば 2 回目の呼び出しがそれより先に
  // 発生しないことをテストで検証できるようにする。
  const firstRenderGate = new Promise<void>((resolve) => {
    resolveFirst = resolve;
  });
  return {
    renderedIds,
    renderSpy: vi.fn(async (id: string, chart: string) => {
      callCount += 1;
      if (callCount === 1) {
        await firstRenderGate;
      }
      renderedIds.push(id);
      return { svg: `<svg id="${id}" viewBox="0 0 100 50"><g>${chart}</g></svg>` };
    }),
    runSpy: vi.fn(async () => undefined),
    releaseFirstRender: () => resolveFirst?.(),
  };
});

vi.mock("mermaid", () => ({
  default: { initialize: vi.fn(), render: renderSpy, run: runSpy },
}));

describe("MermaidDiagram の同時描画", () => {
  it("直列化: 1つ目の描画完了前に2つ目は開始されず、解放後は両方が一意な ID で完了する", async () => {
    const { container } = render(
      <>
        <MermaidDiagram chart={"flowchart TD\nA-->B"} id="diag-a" />
        <MermaidDiagram chart={"flowchart LR\nC-->D"} id="diag-b" />
      </>
    );

    // 1つ目の render() 呼び出しが発生し、ゲートにより pending のまま止まるまで待つ
    await waitFor(() => expect(renderSpy).toHaveBeenCalledTimes(1));

    // 直列化されていれば、1つ目が pending のあいだ2つ目はキューで待機するだけで
    // render() を呼び出さない。ここで呼び出し回数が増えていれば enqueueRender の
    // 直列化が壊れている（両方が並行に render() へ入ってしまっている）。
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(renderSpy).toHaveBeenCalledTimes(1);
    expect(renderedIds).toHaveLength(0);

    // 1つ目の描画を解放すると、キューに並んでいた2つ目の render() が続いて発生する
    releaseFirstRender();

    await waitFor(() => expect(renderSpy).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(renderedIds).toHaveLength(2));

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
