// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import HighPerformanceMysqlSidebar, { NAV_GROUPS } from "./HighPerformanceMysqlSidebar";

describe("HighPerformanceMysqlSidebar", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("8 グループ、合計 27 個のナビゲーションリンクが描画される", () => {
    render(<HighPerformanceMysqlSidebar />);
    expect(NAV_GROUPS).toHaveLength(8);
    const totalItems = NAV_GROUPS.reduce((acc, g) => acc + g.items.length, 0);
    expect(totalItems).toBe(27);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(27);
  });

  it("モバイルメニューボタンのクリックで sidebar と scrim に open/show クラスがトグルされる", () => {
    const { container } = render(<HighPerformanceMysqlSidebar />);
    const menuToggle = container.querySelector("#menuToggle");
    const sidebar = container.querySelector("#sidebar");
    const scrim = container.querySelector("#scrim");

    expect(menuToggle).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(scrim).not.toBeNull();

    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(scrim?.classList.contains("show")).toBe(false);

    if (menuToggle) {
      fireEvent.click(menuToggle);
    }
    expect(sidebar?.classList.contains("open")).toBe(true);
    expect(scrim?.classList.contains("show")).toBe(true);
    expect(menuToggle?.getAttribute("aria-expanded")).toBe("true");

    if (scrim) {
      fireEvent.click(scrim);
    }
    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(scrim?.classList.contains("show")).toBe(false);
    expect(menuToggle?.getAttribute("aria-expanded")).toBe("false");
  });

  it("ナビゲーションリンクをクリックするとドロワーが閉じる", () => {
    const { container } = render(<HighPerformanceMysqlSidebar />);
    const menuToggle = container.querySelector("#menuToggle");
    const sidebar = container.querySelector("#sidebar");
    const firstLink = container.querySelector(".nav-link");

    expect(menuToggle).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(firstLink).not.toBeNull();

    if (menuToggle) {
      fireEvent.click(menuToggle);
    }
    expect(sidebar?.classList.contains("open")).toBe(true);

    if (firstLink) {
      fireEvent.click(firstLink);
    }
    expect(sidebar?.classList.contains("open")).toBe(false);
  });
});
