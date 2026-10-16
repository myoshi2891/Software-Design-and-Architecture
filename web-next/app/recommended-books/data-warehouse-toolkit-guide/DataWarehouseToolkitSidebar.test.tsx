// @vitest-environment jsdom
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DataWarehouseToolkitSidebar from "./DataWarehouseToolkitSidebar";

describe("DataWarehouseToolkitSidebar", () => {
  it("19個の目次ナビゲーションリンクを描画する", () => {
    const { container } = render(<DataWarehouseToolkitSidebar />);
    const links = container.querySelectorAll("#sidebar a.nav-a");
    expect(links).toHaveLength(19);
    expect(links[0]?.getAttribute("href")).toBe("#book-info");
    expect(links[18]?.getAttribute("href")).toBe("#references");
  });

  it("モバイルメニュートグルで open クラスを切り替える", () => {
    const { container } = render(<DataWarehouseToolkitSidebar />);
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

  it("Escape でメニューを閉じ、フォーカスをトグルボタンへ戻す", () => {
    const { container } = render(<DataWarehouseToolkitSidebar />);
    const toggleBtn = container.querySelector<HTMLButtonElement>("#menuToggle");
    const sidebar = container.querySelector("#sidebar");
    const firstLink = container.querySelector<HTMLAnchorElement>("#sidebar a.nav-a");
    if (!toggleBtn || !firstLink) throw new Error("toggle or link not found");

    fireEvent.click(toggleBtn);
    firstLink.focus();
    expect(document.activeElement).toBe(firstLink);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(toggleBtn.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggleBtn);
  });
  it("目次リンク選択時はメニューを閉じるが、フォーカスをトグルボタンへ移さない", () => {
    const { container } = render(<DataWarehouseToolkitSidebar />);
    const toggleBtn = container.querySelector<HTMLButtonElement>("#menuToggle");
    const sidebar = container.querySelector("#sidebar");
    const firstLink = container.querySelector<HTMLAnchorElement>("#sidebar a.nav-a");
    if (!toggleBtn || !firstLink) throw new Error("toggle or link not found");

    fireEvent.click(toggleBtn);
    firstLink.focus();
    fireEvent.click(firstLink);

    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(toggleBtn.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).not.toBe(toggleBtn);
  });
});
