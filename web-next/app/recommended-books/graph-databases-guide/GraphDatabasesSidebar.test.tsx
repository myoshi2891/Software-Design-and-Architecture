// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import GraphDatabasesSidebar, { NAV_GROUPS } from "./GraphDatabasesSidebar";

describe("GraphDatabasesSidebar", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("4 グループ、合計 21 個のナビゲーションリンクが描画される", () => {
    render(<GraphDatabasesSidebar />);
    expect(NAV_GROUPS).toHaveLength(4);
    const totalItems = NAV_GROUPS.reduce((acc, g) => acc + g.items.length, 0);
    expect(totalItems).toBe(21);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(21);
  });

  it("メニューボタンの aria-label が開閉状態に応じて切り替わる", () => {
    // Arrange
    render(<GraphDatabasesSidebar />);
    const menuBtn = screen.getByRole("button", { name: "メニューを開く" });

    // Act
    fireEvent.click(menuBtn);

    // Assert
    expect(menuBtn.getAttribute("aria-label")).toBe("メニューを閉じる");
    fireEvent.click(menuBtn);
    expect(menuBtn.getAttribute("aria-label")).toBe("メニューを開く");
  });

  it("モバイルメニューボタンのクリックで sidebar と scrim に open/show クラスがトグルされる", () => {
    const { container } = render(<GraphDatabasesSidebar />);
    const menuBtn = container.querySelector("#menuBtn");
    const sidebar = container.querySelector("#sidebar");
    const scrim = container.querySelector("#scrim");

    expect(menuBtn).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(scrim).not.toBeNull();

    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(scrim?.classList.contains("show")).toBe(false);

    if (menuBtn) {
      fireEvent.click(menuBtn);
    }
    expect(sidebar?.classList.contains("open")).toBe(true);
    expect(scrim?.classList.contains("show")).toBe(true);
    expect(menuBtn?.getAttribute("aria-expanded")).toBe("true");

    if (scrim) {
      fireEvent.click(scrim);
    }
    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(scrim?.classList.contains("show")).toBe(false);
    expect(menuBtn?.getAttribute("aria-expanded")).toBe("false");
  });

  it("ナビゲーションリンクをクリックするとドロワーが閉じる", () => {
    const { container } = render(<GraphDatabasesSidebar />);
    const menuBtn = container.querySelector("#menuBtn");
    const sidebar = container.querySelector("#sidebar");
    const firstLink = container.querySelector(".nav-a");

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
});
