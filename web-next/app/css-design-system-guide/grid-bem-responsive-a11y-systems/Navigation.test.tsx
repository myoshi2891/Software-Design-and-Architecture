import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Page from "./page";

vi.mock("@/components/MermaidDiagram", () => ({ default: () => <div /> }));
let callback: IntersectionObserverCallback;
const observe = vi.fn();
const disconnect = vi.fn();
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: IntersectionObserverCallback) {
        callback = cb;
      }
      observe = observe;
      disconnect = disconnect;
    }
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
function intersect(target: Element, visible = true) {
  act(() =>
    callback(
      [{ target, isIntersecting: visible } as IntersectionObserverEntry],
      {} as IntersectionObserver
    )
  );
}
describe("guide table of contents", () => {
  it("observes all six sections and twenty-five subsections within this page and disconnects", () => {
    const { container, unmount } = render(<Page />);
    const targets = Array.from(container.querySelectorAll(".section, .sub"));
    expect(observe.mock.calls.map(([target]) => target)).toEqual(targets);
    expect(observe).toHaveBeenCalledTimes(31);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
  it("updates the active link and aria-current for both chapter and subsection intersections", () => {
    const { container } = render(<Page />);
    for (const id of ["s7", "s8-4", "s10-7", "refs"]) {
      const target = container.querySelector(`#${id}`) as Element;
      intersect(target);
      expect(container.querySelectorAll("nav a.active")).toHaveLength(1);
      expect(container.querySelector("nav a.active")).toHaveAttribute("href", `#${id}`);
      expect(container.querySelector("nav a.active")).toHaveAttribute("aria-current", "location");
    }
    intersect(container.querySelector("#s7") as Element, false);
    expect(container.querySelector("nav a.active")).toHaveAttribute("href", "#refs");
  });
  it("keeps a clicked chapter selected during scrolling, then resumes observing and cleans up listeners", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    const { container, unmount } = render(<Page />);
    fireEvent.click(container.querySelector('nav a[href="#s10"]') as Element);
    expect(container.querySelector("nav a.active")).toHaveAttribute("href", "#s10");
    intersect(container.querySelector("#s9-6") as Element);
    expect(container.querySelector("nav a.active")).toHaveAttribute("href", "#s10");
    fireEvent(window, new Event("scrollend"));
    intersect(container.querySelector("#s10-1") as Element);
    expect(container.querySelector("nav a.active")).toHaveAttribute("href", "#s10-1");
    unmount();
    expect(remove).toHaveBeenCalledWith("scrollend", expect.any(Function));
  });
  it("opens the table of contents with a toggle button and closes it after choosing a link", () => {
    // Arrange
    const { container, getByRole } = render(<Page />);
    const toggle = getByRole("button", { name: "目次を開く" });
    const sidebar = container.querySelector("nav.sidebar") as HTMLElement;
    expect(toggle).toHaveAttribute("aria-controls", sidebar.id);
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    // Act
    fireEvent.click(toggle);

    // Assert
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("目次を閉じる");
    expect(sidebar).toHaveClass("open");
    fireEvent.click(sidebar.querySelector('a[href="#s8-4"]') as Element);
    expect(sidebar).not.toHaveClass("open");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
  it("keeps every anchor valid and main focusable for the skip link", () => {
    const { container } = render(<Page />);
    expect(container.querySelector("#main")).toHaveAttribute("tabindex", "-1");
    for (const link of container.querySelectorAll('a[href^="#"]'))
      expect(container.querySelector(link.getAttribute("href") ?? "")).not.toBeNull();
    expect(container.querySelectorAll('nav ul[role="list"]')).toHaveLength(5);
  });
});

it("resumes observing even if clicking an already visible anchor produces no scrollend", () => {
  vi.useFakeTimers();
  try {
    const { container, unmount } = render(<Page />);
    fireEvent.click(container.querySelector('nav a[href="#s7"]') as Element);
    act(() => vi.advanceTimersByTime(1500));
    intersect(container.querySelector("#s7-2") as Element);
    expect(container.querySelector("nav a.active")).toHaveAttribute("href", "#s7-2");
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  } finally {
    vi.useRealTimers();
  }
});
