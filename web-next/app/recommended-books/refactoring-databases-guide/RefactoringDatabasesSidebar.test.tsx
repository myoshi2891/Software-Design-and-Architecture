// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

  it("トグルボタンにフォーカスがある状態で Escape を押すと閉じる", () => {
    // Arrange
    const { container } = render(<RefactoringDatabasesSidebar />);
    const btn = screen.getByRole("button", { name: "目次メニュー" });
    fireEvent.click(btn);
    btn.focus();

    // Act
    fireEvent.keyDown(btn, { key: "Escape" });

    // Assert
    expect(btn.getAttribute("aria-expanded")).toBe("false");
    expect(container.querySelector("#sidebar")?.classList.contains("open")).toBe(false);
  });

  it("サイドバー内リンクにフォーカスがある状態で Escape を押すと閉じる", () => {
    // Arrange
    const { container } = render(<RefactoringDatabasesSidebar />);
    const btn = screen.getByRole("button", { name: "目次メニュー" });
    fireEvent.click(btn);
    const link = container.querySelector<HTMLAnchorElement>("#sidebar a.nav-a");
    link?.focus();

    // Act
    if (link) fireEvent.keyDown(link, { key: "Escape" });

    // Assert
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });

  it("Escape 以外のキーでは閉じない", () => {
    // Arrange
    render(<RefactoringDatabasesSidebar />);
    const btn = screen.getByRole("button", { name: "目次メニュー" });
    fireEvent.click(btn);

    // Act
    fireEvent.keyDown(btn, { key: "Enter" });

    // Assert
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });

  it("開いている間だけ document の keydown リスナーを登録し、閉じると解除する", () => {
    // Arrange
    const addSpy = vi.spyOn(document, "addEventListener");
    const removeSpy = vi.spyOn(document, "removeEventListener");
    render(<RefactoringDatabasesSidebar />);
    const btn = screen.getByRole("button", { name: "目次メニュー" });
    const keydownCalls = (spy: typeof addSpy) =>
      spy.mock.calls.filter(([type]) => type === "keydown");
    expect(keydownCalls(addSpy)).toHaveLength(0);

    // Act
    fireEvent.click(btn);
    const registered = keydownCalls(addSpy).at(-1)?.[1];
    fireEvent.keyDown(document, { key: "Escape" });

    // Assert
    expect(registered).toBeDefined();
    expect(keydownCalls(removeSpy).some(([, handler]) => handler === registered)).toBe(true);
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
