import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MvpSidebar from "./MvpSidebar";

const items = [
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
});
