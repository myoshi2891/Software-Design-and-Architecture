// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RefactoringDatabasesSidebar, { NAV_GROUPS } from "./RefactoringDatabasesSidebar";

describe("RefactoringDatabasesSidebar", () => {
  it("26 個のナビゲーションリンクを描画する", () => {
    const { container } = render(<RefactoringDatabasesSidebar />);
    const links = container.querySelectorAll("#sidebar a.nav-a");
    expect(links).toHaveLength(26);
  });

  it("4 つのグループラベルを描画する", () => {
    render(<RefactoringDatabasesSidebar />);
    expect(screen.getByText("はじめに")).toBeDefined();
    expect(screen.getByText("基礎編")).toBeDefined();
    expect(screen.getByText("カタログ編")).toBeDefined();
    expect(screen.getByText("実践とまとめ")).toBeDefined();
    expect(NAV_GROUPS).toHaveLength(4);
  });

  it("モバイルトグルボタンで開閉状態を切り替えられる", () => {
    const { container } = render(<RefactoringDatabasesSidebar />);
    const btn = screen.getByRole("button", { name: "目次メニュー" });
    const sidebar = container.querySelector("#sidebar");
    const overlay = container.querySelector("#sidebarOverlay");

    expect(btn.getAttribute("aria-expanded")).toBe("false");
    expect(sidebar?.classList.contains("open")).toBe(false);

    fireEvent.click(btn);
    expect(btn.getAttribute("aria-expanded")).toBe("true");
    expect(sidebar?.classList.contains("open")).toBe(true);

    if (overlay) fireEvent.click(overlay);
    expect(btn.getAttribute("aria-expanded")).toBe("false");
    expect(sidebar?.classList.contains("open")).toBe(false);
  });
});
