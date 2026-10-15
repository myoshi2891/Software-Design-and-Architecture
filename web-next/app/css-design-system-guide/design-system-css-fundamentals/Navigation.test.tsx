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
    const windowScroll = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
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
    // サイドバー（表示域 100〜500px）の下端より外にリンク（560〜590px）がある状況を再現する。
    const sidebar = container.querySelector("#sidebar") as HTMLElement;
    sidebar.scrollTop = 40;
    const sidebarScroll = vi.fn(({ top }: ScrollToOptions) => {
      sidebar.scrollTop = top ?? sidebar.scrollTop;
    });
    Object.assign(sidebar, { scrollTo: sidebarScroll });
    vi.spyOn(sidebar, "getBoundingClientRect").mockReturnValue({
      top: 100,
      bottom: 500,
    } as DOMRect);
    vi.spyOn(
      container.querySelector('a[href="#s1-1"]') as HTMLElement,
      "getBoundingClientRect"
    ).mockReturnValue({ top: 560, bottom: 590 } as DOMRect);
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
    // 祖先（ページ）を巻き込まず、サイドバー自身だけを不足分（590 - 500 = 90px）スクロールする。
    expect(sidebarScroll).toHaveBeenCalledWith({ top: 130, behavior: "smooth" });
    expect(sidebar.scrollTop).toBe(130);
    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(windowScroll).not.toHaveBeenCalled();
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
    HTMLElement.prototype.scrollIntoView = originalScroll;
  });
  it("activates a clicked chapter link and keeps it until the scroll ends", () => {
    // Arrange
    let callback: IntersectionObserverCallback | undefined;
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn(function (this: object, cb: IntersectionObserverCallback) {
        callback = cb;
        Object.assign(this, { observe: vi.fn(), disconnect: vi.fn() });
      })
    );
    const { container } = render(
      <div className="design-system-css-fundamentals">
        <Navigation groups={groups} />
        <main>
          <section id="s1" className="section">
            <div id="s1-1" className="subsection" />
          </section>
        </main>
      </div>
    );
    const chapter = container.querySelector('a[href="#s1"]') as HTMLElement;
    const sub = container.querySelector('a[href="#s1-1"]') as HTMLElement;
    const intersect = () =>
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
    intersect();

    // Act: 章見出しへ移動するスムーズスクロール中に小節が判定帯を通過する
    fireEvent.click(chapter);
    intersect();

    // Assert
    expect(chapter).toHaveClass("active");
    expect(chapter).toHaveAttribute("aria-current", "location");
    expect(sub).not.toHaveClass("active");

    // スクロール終了後は通常の追従に戻る
    fireEvent(window, new Event("scrollend"));
    intersect();
    expect(sub).toHaveClass("active");
    expect(chapter).not.toHaveClass("active");
  });
  it("releases a clicked link after a timeout when scrollend never fires, without clearing a newer click", () => {
    // Arrange
    vi.useFakeTimers();
    let callback: IntersectionObserverCallback | undefined;
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn(function (this: object, cb: IntersectionObserverCallback) {
        callback = cb;
        Object.assign(this, { observe: vi.fn(), disconnect: vi.fn() });
      })
    );
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
    const chapter = container.querySelector('a[href="#s1"]') as HTMLElement;
    const sub = container.querySelector('a[href="#s1-1"]') as HTMLElement;
    const intersect = (id: string) =>
      act(() =>
        callback?.(
          [
            {
              isIntersecting: true,
              target: container.querySelector(`#${id}`) as Element,
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver
        )
      );

    // Act: 章をクリック後、別リンクを選び直してから先のタイムアウトが経過する
    fireEvent.click(chapter);
    act(() => vi.advanceTimersByTime(600));
    fireEvent.click(sub);
    act(() => vi.advanceTimersByTime(500));
    intersect("s1");

    // Assert: 先のクリックのタイムアウトは新しい選択を解除しない
    expect(sub).toHaveClass("active");
    expect(chapter).not.toHaveClass("active");

    // scrollend が来なくても新しい選択のタイムアウト後は追従を再開する
    act(() => vi.advanceTimersByTime(600));
    intersect("s1");
    expect(chapter).toHaveClass("active");
    unmount();
    vi.useRealTimers();
  });
  it("opens the table of contents with a toggle button and closes it after choosing a link", () => {
    // Arrange
    const { container, getByRole } = render(<Navigation groups={groups} />);
    const toggle = getByRole("button", { name: "目次を開く" });
    const sidebar = container.querySelector("#sidebar") as HTMLElement;
    expect(toggle).toHaveAttribute("aria-controls", "sidebar");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(sidebar).not.toHaveClass("open");

    // Act
    fireEvent.click(toggle);

    // Assert
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("目次を閉じる");
    expect(sidebar).toHaveClass("open");
    fireEvent.click(container.querySelector('a[href="#s1-1"]') as HTMLElement);
    expect(sidebar).not.toHaveClass("open");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
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
  it("scrolls instantly when the user prefers reduced motion", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
    }));
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    const { getByTitle } = render(<Navigation groups={groups} />);
    fireEvent.click(getByTitle("先頭へ戻る"));
    expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });
  it("gives the inner chapter list a name distinct from the outer table of contents", () => {
    const { getByRole } = render(<Navigation groups={groups} />);
    expect(getByRole("navigation", { name: "目次" })).toContainElement(
      getByRole("navigation", { name: "章とセクション" })
    );
  });
});
