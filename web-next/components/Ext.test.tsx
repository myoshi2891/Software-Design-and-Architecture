import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Ext } from "@/components/Ext";

describe("Ext", () => {
  it("外部リンクに target=_blank と rel=noopener noreferrer を付与する", () => {
    render(<Ext href="https://example.com">リンク</Ext>);
    const link = screen.getByRole("link", { name: "リンク" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("className を引き継ぐ", () => {
    render(
      <Ext href="https://example.com" className="source-item">
        リンク
      </Ext>,
    );
    expect(screen.getByRole("link", { name: "リンク" })).toHaveClass("source-item");
  });
});
