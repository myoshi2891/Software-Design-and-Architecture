import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MermaidDiagram, { detectDiagramType } from "@/components/MermaidDiagram";

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
