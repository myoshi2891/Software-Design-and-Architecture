import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MvpSidebar, { type MvpNavItem } from "./MvpSidebar";

const items: MvpNavItem[] = [
  { id: "intro", label: "MVPとは何か", icon: "bulb" },
  { id: "lean", label: "リーンスタートアップ", icon: "recycle" },
];
afterEach(() => vi.unstubAllGlobals());
describe("MVP sidebar", () => {
  it("tracks visible sections and disconnects the observer on unmount", () => {
    let callback: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();
    const Observer = vi.fn(function (
      this: object,
      cb: IntersectionObserverCallback,
      _options: IntersectionObserverInit
    ) {
      callback = cb;
      Object.assign(this, { observe, disconnect });
    });
    vi.stubGlobal("IntersectionObserver", Observer);
    const { container, unmount } = render(
      <div className="minimum-viable-product-comprehensive-guide">
        <MvpSidebar items={items} />
        <main>
          <section className="section" id="intro" />
          <section className="section" id="lean" />
        </main>
      </div>
    );
    expect(observe).toHaveBeenCalledTimes(2);
    expect(Observer.mock.calls[0]?.[1]).toEqual({ rootMargin: "-20% 0px -70% 0px" });
    const target = container.querySelector("#lean") as Element;
    act(() =>
      callback?.(
        [{ isIntersecting: true, target } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    );
    expect(container.querySelector('a[href="#lean"]')).toHaveClass("active");
    expect(container.querySelector('a[href="#lean"]')).toHaveAttribute("aria-current", "location");
    expect(container.querySelector('a[href="#intro"]')).not.toHaveClass("active");
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });
  it("opens the chapter list with a toggle button and closes it after choosing a chapter", () => {
    // Arrange
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn(function (this: object) {
        Object.assign(this, { observe: vi.fn(), disconnect: vi.fn() });
      })
    );
    const { container } = render(<MvpSidebar items={items} />);
    const toggle = screen.getByRole("button", { name: "目次を開く" });
    const sidebar = container.querySelector(".sidebar") as HTMLElement;
    expect(toggle).toHaveAttribute("aria-controls", sidebar.id);
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    // Act
    fireEvent.click(toggle);

    // Assert
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("目次を閉じる");
    expect(sidebar).toHaveClass("open");
    fireEvent.click(container.querySelector('a[href="#lean"]') as Element);
    expect(sidebar).not.toHaveClass("open");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
