// @vitest-environment jsdom
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SqlAntipatternsSidebar from "./SqlAntipatternsSidebar";

describe("SqlAntipatternsSidebar", () => {
  it("20個の目次ナビゲーションリンクを描画する", () => {
    const { container } = render(<SqlAntipatternsSidebar />);
    const links = container.querySelectorAll(".nav-item a");
    expect(links).toHaveLength(20);
    expect(links[0]?.getAttribute("href")).toBe("#book-info");
    expect(links[19]?.getAttribute("href")).toBe("#references");
  });

  it("モバイルメニュートグルで open クラスを切り替える", () => {
    const { container } = render(<SqlAntipatternsSidebar />);
    const toggleBtn = container.querySelector("#menuToggle");
    const sidebar = container.querySelector("#sidebar");
    expect(toggleBtn).not.toBeNull();
    expect(sidebar).not.toBeNull();

    expect(sidebar?.classList.contains("open")).toBe(false);
    if (toggleBtn) fireEvent.click(toggleBtn);
    expect(sidebar?.classList.contains("open")).toBe(true);
    if (toggleBtn) fireEvent.click(toggleBtn);
    expect(sidebar?.classList.contains("open")).toBe(false);
  });
});
