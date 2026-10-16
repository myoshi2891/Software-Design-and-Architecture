// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import DatabaseInternalsSidebar, { NAV_GROUPS } from "./DatabaseInternalsSidebar";

describe("DatabaseInternalsSidebar", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("4 グループ、合計 28 個のナビゲーションリンクが描画される", () => {
    render(<DatabaseInternalsSidebar />);
    expect(NAV_GROUPS).toHaveLength(4);
    const totalItems = NAV_GROUPS.reduce((acc, g) => acc + g.items.length, 0);
    expect(totalItems).toBe(28);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(28);
  });

  it("モバイルメニューボタンのクリックで sidebar と scrim に open クラスがトグルされる", () => {
    const { container } = render(<DatabaseInternalsSidebar />);
    const menuBtn = container.querySelector("#menuBtn");
    const sidebar = container.querySelector("#sidebar");
    const scrim = container.querySelector("#scrim");

    expect(menuBtn).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(scrim).not.toBeNull();

    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(scrim?.classList.contains("open")).toBe(false);

    if (menuBtn) {
      fireEvent.click(menuBtn);
    }
    expect(sidebar?.classList.contains("open")).toBe(true);
    expect(scrim?.classList.contains("open")).toBe(true);

    if (scrim) {
      fireEvent.click(scrim);
    }
    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(scrim?.classList.contains("open")).toBe(false);
  });

  it("ナビゲーションリンクをクリックするとドロワーが閉じる", () => {
    const { container } = render(<DatabaseInternalsSidebar />);
    const menuBtn = container.querySelector("#menuBtn");
    const sidebar = container.querySelector("#sidebar");
    const firstLink = container.querySelector(".nav-link");

    expect(menuBtn).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(firstLink).not.toBeNull();

    if (menuBtn) {
      fireEvent.click(menuBtn);
    }
    expect(sidebar?.classList.contains("open")).toBe(true);

    if (firstLink) {
      fireEvent.click(firstLink);
    }
    expect(sidebar?.classList.contains("open")).toBe(false);
  });

  it("メニューを開くと最初のナビゲーションリンクへフォーカスが移る", () => {
    // Arrange
    render(<DatabaseInternalsSidebar />);
    const menuBtn = screen.getByRole("button", { name: "メニューを開く" });
    const firstLink = screen.getByRole("link", { name: NAV_GROUPS[0].items[0].label });

    // Act
    fireEvent.click(menuBtn);

    // Assert
    expect(document.activeElement).toBe(firstLink);
  });
});
