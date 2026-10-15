import { act, fireEvent, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, expect, it, vi } from "vitest";
import Navigation from "./Navigation";

let observers: {
  callback: IntersectionObserverCallback;
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
}[] = [];
let frames = new Map<number, FrameRequestCallback>();
let nextFrame = 0;
const cancelFrame = vi.fn((id: number) => frames.delete(id));
// 予約済みフレームを描画タイミング相当として一括実行する
function flushFrames() {
  const pending = [...frames.values()];
  frames = new Map();
  for (const callback of pending) callback(0);
}
function setup(reduced = false, extraLinks?: ReactNode) {
  observers = [];
  frames = new Map();
  cancelFrame.mockClear();
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn((callback: FrameRequestCallback) => {
      nextFrame += 1;
      frames.set(nextFrame, callback);
      return nextFrame;
    })
  );
  vi.stubGlobal("cancelAnimationFrame", cancelFrame);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: reduced }))
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      constructor(callback: IntersectionObserverCallback) {
        observers.push({
          callback,
          observe: this.observe,
          unobserve: this.unobserve,
          disconnect: this.disconnect,
        });
      }
    }
  );
  return render(
    <div className="normal-animation-architecture-tokens-performance-tools">
      <Navigation>
        {extraLinks}
        <a href="#top" className="toc-link" data-toc="">
          導入
        </a>
        <a href="#ch11" className="toc-link" data-toc="">
          11
        </a>
        <span id="progressPct">0%</span>
        <div id="progressBar" />
      </Navigation>
      <header id="top" className="hero" />
      <main>
        <section id="ch11" className="chapter">
          <div className="sub">本文</div>
        </section>
      </main>
    </div>
  );
}
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
it("tracks active chapters and restores current location without re-rendering body", () => {
  const { container } = setup();
  expect(observers[0].observe).toHaveBeenCalledTimes(2);
  act(() =>
    observers[0].callback(
      [
        {
          isIntersecting: true,
          target: container.querySelector("#ch11")!,
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver
    )
  );
  expect(container.querySelector('a[href="#ch11"]')).toHaveClass("is-active");
  expect(container.querySelector('a[href="#ch11"]')).toHaveAttribute("aria-current", "location");
  act(() =>
    observers[0].callback(
      [
        {
          isIntersecting: true,
          target: container.querySelector("#top")!,
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver
    )
  );
  expect(container.querySelector('a[href="#ch11"]')).not.toHaveAttribute("aria-current");
});
it("updates bounded percentage and bar, including short documents", () => {
  const { container } = setup();
  vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(2000);
  vi.stubGlobal("innerHeight", 1000);
  vi.stubGlobal("scrollY", 500);
  fireEvent.scroll(window);
  flushFrames();
  expect(container.querySelector("#progressPct")).toHaveTextContent("50%");
  expect(container.querySelector("#progressBar")).toHaveStyle({ width: "50%" });
  vi.stubGlobal("scrollY", -100);
  fireEvent.scroll(window);
  flushFrames();
  expect(container.querySelector("#progressPct")).toHaveTextContent("0%");
  vi.stubGlobal("scrollY", 5000);
  fireEvent.scroll(window);
  flushFrames();
  expect(container.querySelector("#progressPct")).toHaveTextContent("100%");
  vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(500);
  fireEvent.scroll(window);
  flushFrames();
  expect(container.querySelector("#progressPct")).toHaveTextContent("0%");
});
it("batches scroll updates into one animation frame and cancels it on unmount", () => {
  // Arrange
  const { container, unmount } = setup();
  vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(2000);
  vi.stubGlobal("innerHeight", 1000);
  vi.stubGlobal("scrollY", 500);

  // Act: 同一フレーム内の連続スクロール
  fireEvent.scroll(window);
  fireEvent.scroll(window);

  // Assert: 予約は 1 件のみで、描画前は DOM を更新しない
  expect(window.requestAnimationFrame).toHaveBeenCalledOnce();
  expect(container.querySelector("#progressPct")).toHaveTextContent("0%");
  flushFrames();
  expect(container.querySelector("#progressPct")).toHaveTextContent("50%");

  // Act & Assert: 予約中にアンマウントするとフレームを取り消す
  fireEvent.scroll(window);
  const pendingId = [...frames.keys()][0];
  unmount();
  expect(cancelFrame).toHaveBeenCalledWith(pendingId);
});
it("reveals once and cleans up observers and scroll listener", () => {
  const remove = vi.spyOn(window, "removeEventListener");
  const { container, unmount } = setup();
  const target = container.querySelector(".sub")!;
  expect(target).toHaveClass("fade-in");
  act(() =>
    observers[1].callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      {} as IntersectionObserver
    )
  );
  expect(target).toHaveClass("is-visible");
  expect(observers[1].unobserve).toHaveBeenCalledWith(target);
  unmount();
  for (const observer of observers) expect(observer.disconnect).toHaveBeenCalledOnce();
  expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
});
it("keeps reduced-motion content visible and skips fade observation", () => {
  const { container } = setup(true);
  expect(container.querySelector(".sub")).not.toHaveClass("fade-in");
  expect(observers).toHaveLength(1);
});
it("skips links whose hash is not a valid selector and keeps observing the rest", () => {
  // Arrange & Act: 数字始まりの ID は CSS セレクタとして不正（querySelector なら DOMException）
  setup(
    false,
    <a href="https://example.com/#1bad" data-toc="">
      外部
    </a>
  );

  // Assert: 後続の正規リンクの監視とスクロール購読が中断されない
  expect(observers[0].observe).toHaveBeenCalledTimes(2);
  expect(observers).toHaveLength(2);
});
