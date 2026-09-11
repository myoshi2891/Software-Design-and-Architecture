import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import FddSidebar, { NAV_ITEMS, type NavItem } from "./FddSidebar";

const TEST_ITEMS: NavItem[] = [
  { id: "s1", num: "01", label: "FDDとは何か" },
  { id: "s2", num: "02", label: "全体構造と5プロセス" },
  { id: "s3", num: "03", label: "P1: 全体モデルの開発" },
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

describe("FddSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    observedElements = [];
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section id="s1"></section>
        <section id="s2"></section>
        <section id="s3"></section>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    observedElements = [];
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("サイドバーのタイトルを描画する", () => {
    const { container } = render(<FddSidebar items={TEST_ITEMS} />);
    const title = container.querySelector(".sidebar-title");
    expect(title?.textContent).toContain("FDD 完全ガイド");
  });

  it("既定の NAV_ITEMS は 15 個の項目を持つ", () => {
    expect(NAV_ITEMS).toHaveLength(15);
    expect(NAV_ITEMS[0]?.id).toBe("s1");
    expect(NAV_ITEMS[14]?.id).toBe("s15");
  });

  it("nav リンクをソース順で描画し、ナビゲーションに aria-label を持つ", () => {
    const { container } = render(<FddSidebar items={TEST_ITEMS} />);
    const nav = container.querySelector("nav.sidebar");
    expect(nav?.getAttribute("aria-label")).toBe("セクションナビゲーション");
    const links = container.querySelectorAll("nav.sidebar a.nav-item");
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual(["#s1", "#s2", "#s3"]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<FddSidebar items={TEST_ITEMS} />);
    const active = container.querySelectorAll("nav.sidebar a.nav-item.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#s1");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<FddSidebar items={TEST_ITEMS} />);

    const activeInitial = container.querySelectorAll("nav.sidebar a.nav-item.active");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#s1");

    intersect("s3");

    const activeAfter = container.querySelectorAll("nav.sidebar a.nav-item.active");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#s3");
  });
});
