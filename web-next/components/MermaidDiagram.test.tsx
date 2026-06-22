import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MermaidDiagram from "@/components/MermaidDiagram";

describe("MermaidDiagram", () => {
  it("チャートを mermaid コンテナ div として描画する", () => {
    const { container } = render(<MermaidDiagram chart={"flowchart LR\n  A-->B"} />);
    expect(container.querySelector("div.mermaid")).not.toBeNull();
  });

  it("id と追加 className を付与できる", () => {
    const { container } = render(<MermaidDiagram chart="x" id="diag-1" className="extra" />);
    const el = container.querySelector("#diag-1");
    expect(el).not.toBeNull();
    expect(el?.className).toContain("mermaid");
    expect(el?.className).toContain("extra");
  });
});
