import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import XpSidebar, { NAV_ITEMS, type NavItem } from "./XpSidebar";

const TEST_ITEMS: NavItem[] = [
  { id: "s1", num: "1", label: "XPとは何か" },
  { id: "s2", num: "2", label: "5つの価値" },
  { id: "s5", num: "5", label: "ペアプログラミング" },
];

type IOCallback = (entries: IntersectionObserverEntry[]) => void;
let ioCallback: IOCallback | null = null;
let observedElements: Element[] = [];

class CapturingIO implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn((el: Element) => {
    observedElements.push(el);
  });
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  constructor(cb: IOCallback) {
    ioCallback = cb;
  }
}

function intersect(id: string): void {
  const target = document.getElementById(id);
  if (!target) throw new Error(`section #${id} not found`);
  // observe 済みでない要素で通知すると、セレクタが壊れてもテストが通ってしまう
  if (!observedElements.includes(target)) {
    throw new Error(`section #${id} is not observed`);
  }
  const entry = {
    isIntersecting: true,
    target,
  } as unknown as IntersectionObserverEntry;
  act(() => ioCallback?.([entry]));
}

describe("XpSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    observedElements = [];
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <div class="section-anchor" id="s1"></div>
        <div class="section-anchor" id="s2"></div>
        <div class="section-anchor" id="s5"></div>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    observedElements = [];
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("ヘッダータイトルとフッターを描画する", () => {
    const { container } = render(<XpSidebar items={TEST_ITEMS} />);
    const logo = container.querySelector(".sidebar-logo");
    expect(logo?.textContent).toContain("XP完全ガイド");
    const sub = container.querySelector(".sidebar-sub");
    expect(sub?.textContent).toContain("Extreme Programming");
    const footer = container.querySelector(".sidebar-footer");
    expect(footer?.textContent).toContain("Kent Beck");
  });

  it("既定の NAV_ITEMS は 23 個の項目を持つ", () => {
    expect(NAV_ITEMS).toHaveLength(23);
    expect(NAV_ITEMS[0]?.id).toBe("s1");
    expect(NAV_ITEMS[22]?.id).toBe("s23");
  });

  it("nav リンクをソース順で描画する", () => {
    const { container } = render(<XpSidebar items={TEST_ITEMS} />);
    const links = container.querySelectorAll("nav.sidebar-nav a");
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual(["#s1", "#s2", "#s5"]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<XpSidebar items={TEST_ITEMS} />);
    const active = container.querySelectorAll("nav.sidebar-nav a.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#s1");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<XpSidebar items={TEST_ITEMS} />);

    const activeInitial = container.querySelectorAll("nav.sidebar-nav a.active");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#s1");

    intersect("s5");

    const activeAfter = container.querySelectorAll("nav.sidebar-nav a.active");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#s5");
  });
});
