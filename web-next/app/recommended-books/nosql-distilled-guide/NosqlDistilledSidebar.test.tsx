// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import NosqlDistilledSidebar, { NAV_GROUPS } from "./NosqlDistilledSidebar";

describe("NosqlDistilledSidebar", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("4 グループ、合計 26 個のナビゲーションリンクが描画される", () => {
    render(<NosqlDistilledSidebar />);
    expect(NAV_GROUPS).toHaveLength(4);
    const totalItems = NAV_GROUPS.reduce((acc, g) => acc + g.items.length, 0);
    expect(totalItems).toBe(26);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(26);
  });

  it("モバイルメニューボタンのクリックで sidebar と sidebarOverlay に open クラスがトグルされる", () => {
    const { container } = render(<NosqlDistilledSidebar />);
    const mobileToggle = container.querySelector("#mobileToggle");
    const sidebar = container.querySelector("#sidebar");
    const overlay = container.querySelector("#sidebarOverlay");

    expect(mobileToggle).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(overlay).not.toBeNull();

    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(overlay?.classList.contains("open")).toBe(false);

    if (mobileToggle) {
      fireEvent.click(mobileToggle);
    }
    expect(sidebar?.classList.contains("open")).toBe(true);
    expect(overlay?.classList.contains("open")).toBe(true);
    expect(mobileToggle?.getAttribute("aria-expanded")).toBe("true");

    if (overlay) {
      fireEvent.click(overlay);
    }
    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(overlay?.classList.contains("open")).toBe(false);
    expect(mobileToggle?.getAttribute("aria-expanded")).toBe("false");
  });

  it("ナビゲーションリンクをクリックするとドロワーが閉じる", () => {
    const { container } = render(<NosqlDistilledSidebar />);
    const mobileToggle = container.querySelector("#mobileToggle");
    const sidebar = container.querySelector("#sidebar");
    const firstLink = container.querySelector(".nav-a");

    expect(mobileToggle).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(firstLink).not.toBeNull();

    if (mobileToggle) {
      fireEvent.click(mobileToggle);
    }
    expect(sidebar?.classList.contains("open")).toBe(true);

    if (firstLink) {
      fireEvent.click(firstLink);
    }
    expect(sidebar?.classList.contains("open")).toBe(false);
  });

  it("メニューボタンにフォーカスがある状態で Escape を押すと閉じる", () => {
    // Arrange
    render(<NosqlDistilledSidebar />);
    const btn = screen.getByRole("button", { name: "メニュー" });
    fireEvent.click(btn);
    btn.focus();

    // Act
    fireEvent.keyDown(btn, { key: "Escape" });

    // Assert
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });

  it("ナビゲーションリンクにフォーカスがある状態で Escape を押すと閉じる", () => {
    // Arrange
    render(<NosqlDistilledSidebar />);
    const btn = screen.getByRole("button", { name: "メニュー" });
    fireEvent.click(btn);
    const link = screen.getByRole("link", { name: NAV_GROUPS[0].items[0].title });
    link.focus();

    // Act
    fireEvent.keyDown(link, { key: "Escape" });

    // Assert
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });
});
