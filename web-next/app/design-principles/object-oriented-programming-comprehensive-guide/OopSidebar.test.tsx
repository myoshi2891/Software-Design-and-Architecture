// @vitest-environment jsdom
import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import OopSidebar, { type NavGroup } from "./OopSidebar";

const GROUPS: NavGroup[] = [
  {
    label: "はじめに",
    items: [{ id: "sec1", num: "01", label: "OOPとは何か？" }],
  },
  {
    label: "コア原則",
    items: [
      { id: "sec2", num: "02", label: "4大原則" },
      { id: "sec3", num: "03", label: "SOLID 原則" },
    ],
  },
];

type IOCallback = (entries: IntersectionObserverEntry[]) => void;
let ioCallback: IOCallback | null = null;

class CapturingIO implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
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

describe("OopSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section class="section" id="sec1"></section>
        <section class="section" id="sec2"></section>
        <section class="section" id="sec3"></section>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("グループ見出しと nav リンクをソース順で描画する", () => {
    const { container } = render(<OopSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".nav-section-label")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["はじめに", "コア原則"]);

    const links = container.querySelectorAll(".nav-item");
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual([
      "#sec1",
      "#sec2",
      "#sec3",
    ]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<OopSidebar groups={GROUPS} />);
    const active = container.querySelectorAll(".nav-item.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#sec1");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<OopSidebar groups={GROUPS} />);

    // 初期状態で #sec1 がアクティブ
    let active = container.querySelectorAll(".nav-item.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#sec1");

    // #sec2 と交差
    intersect("sec2");
    active = container.querySelectorAll(".nav-item.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#sec2");

    // #sec3 と交差
    intersect("sec3");
    active = container.querySelectorAll(".nav-item.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#sec3");
  });
});
