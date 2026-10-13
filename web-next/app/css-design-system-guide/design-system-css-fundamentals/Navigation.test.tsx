import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Navigation, { type NavGroup } from "./Navigation";

const groups: NavGroup[] = [
  {
    label: "第1章",
    items: [
      { id: "s1", num: "1", label: "デザインシステムとは", sub: false },
      { id: "s1-1", num: "1.1", label: "定義と目的", sub: true },
    ],
  },
];
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function dimensions(scrollY: number, scrollHeight = 2000, innerHeight = 1000) {
  vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(scrollHeight);
  vi.spyOn(window, "innerHeight", "get").mockReturnValue(innerHeight);
  vi.spyOn(window, "scrollY", "get").mockReturnValue(scrollY);
}

describe("CSS fundamentals navigation", () => {
  it("observes chapters and subsections, updates the active link and cleans up", () => {
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
    const scrollIntoView = vi.fn();
    vi.stubGlobal("HTMLElement", globalThis.HTMLElement);
    const originalScroll = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;
    const remove = vi.spyOn(window, "removeEventListener");
    const { container, unmount } = render(
      <div className="design-system-css-fundamentals">
        <Navigation groups={groups} />
        <main>
          <section id="s1" className="section">
            <div id="s1-1" className="subsection" />
          </section>
        </main>
      </div>
    );
    expect(observe).toHaveBeenCalledTimes(2);
    expect(Observer.mock.calls[0]?.[1]).toEqual({ rootMargin: "-20% 0px -60% 0px" });
    act(() =>
      callback?.(
        [
          {
            isIntersecting: true,
            target: container.querySelector("#s1-1") as Element,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      )
    );
    const link = container.querySelector('a[href="#s1-1"]');
    expect(link).toHaveClass("active");
    expect(link).toHaveAttribute("aria-current", "location");
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest", behavior: "smooth" });
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
    HTMLElement.prototype.scrollIntoView = originalScroll;
  });
  it("shows rounded 0 50 and 100 percent progress and handles a non-scrolling page", () => {
    dimensions(0);
    const { container } = render(<Navigation groups={groups} />);
    const fill = container.querySelector("#progress-fill") as HTMLElement;
    const label = container.querySelector("#progress-label");
    expect(fill.style.width).toBe("0%");
    expect(label).toHaveTextContent("読書進捗: 0%");
    dimensions(500);
    fireEvent.scroll(window);
    expect(fill.style.width).toBe("50%");
    expect(label).toHaveTextContent("読書進捗: 50%");
    dimensions(1000);
    fireEvent.scroll(window);
    expect(fill.style.width).toBe("100%");
    dimensions(0, 1000, 1000);
    fireEvent.scroll(window);
    expect(fill.style.width).toBe("0%");
  });
  it("reveals the top button strictly above 400px and scrolls smoothly on click", () => {
    dimensions(400);
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    const { container, getByTitle } = render(<Navigation groups={groups} />);
    const button = container.querySelector("#top-btn");
    expect(button).not.toHaveClass("visible");
    dimensions(401);
    fireEvent.scroll(window);
    expect(button).toHaveClass("visible");
    fireEvent.click(getByTitle("先頭へ戻る"));
    expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    dimensions(0);
    fireEvent.scroll(window);
    expect(button).not.toHaveClass("visible");
  });
});
