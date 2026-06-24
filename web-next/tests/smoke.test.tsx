import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

// Phase 0 スモークテスト: vitest + jsdom + Testing Library + jest-dom マッチャが
// 正しく配線されていることを最小構成で確認する（next/font には触れない）。
describe("test toolchain", () => {
  it("renders a React element into jsdom and queries it via Testing Library", () => {
    render(
      <button type="button" aria-label="smoke">
        hello
      </button>
    );
    expect(screen.getByRole("button", { name: "smoke" })).toBeInTheDocument();
  });
});
