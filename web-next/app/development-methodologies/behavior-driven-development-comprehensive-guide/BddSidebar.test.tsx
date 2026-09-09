import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BddSidebar, { type NavGroup } from "./BddSidebar";

const GROUPS: NavGroup[] = [
  {
    title: "基礎概念",
    items: [
      { id: "s1", num: "01", label: "BDDとは何か" },
      { id: "s2", num: "02", label: "Given-When-Then" },
    ],
  },
  {
    title: "ツール & 実装",
    items: [{ id: "s5", num: "05", label: "ツールチェーン選定" }],
  },
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
  const entry = {
    isIntersecting: true,
    target,
  } as unknown as IntersectionObserverEntry;
  act(() => ioCallback?.([entry]));
}

describe("BddSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    observedElements = [];
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section class="sec" id="s1"></section>
        <section class="sec" id="s2"></section>
        <section class="sec" id="s5"></section>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    observedElements = [];
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("グループ見出しと nav リンクをソース順で描画する", () => {
    const { container } = render(<BddSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".sb-grp")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["基礎概念", "ツール & 実装"]);

    const links = container.querySelectorAll("nav.sb-nav a");
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual(["#s1", "#s2", "#s5"]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<BddSidebar groups={GROUPS} />);
    const active = container.querySelectorAll("nav.sb-nav a.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#s1");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<BddSidebar groups={GROUPS} />);

    const activeInitial = container.querySelectorAll("nav.sb-nav a.active");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#s1");

    intersect("s5");

    const activeAfter = container.querySelectorAll("nav.sb-nav a.active");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#s5");
  });
});
