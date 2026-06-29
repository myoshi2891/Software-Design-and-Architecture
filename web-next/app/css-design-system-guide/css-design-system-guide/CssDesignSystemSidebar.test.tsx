import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CssDesignSystemSidebar, { type NavGroup } from "./CssDesignSystemSidebar";

const GROUPS: NavGroup[] = [
  {
    title: "入門",
    items: [
      { id: "s1", num: "01", label: "デザインシステムとは", badge: { text: "入門", variant: "g" } },
      { id: "s2", num: "02", label: "CSS設計の基礎原則", badge: { text: "入門", variant: "g" } },
    ],
  },
  {
    title: "基礎",
    items: [
      { id: "s3", num: "03", label: "CSS変数システム", badge: { text: "基礎", variant: "y" } },
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

describe("CssDesignSystemSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section class="section" id="s1"></section>
        <section class="section" id="s2"></section>
        <section class="section" id="s3"></section>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("グループ見出しと nav リンクをソース順で描画する", () => {
    const { container } = render(<CssDesignSystemSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".nav-grp-label")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["入門", "基礎"]);

    const links = container.querySelectorAll("nav.sb-nav a.nav-item");
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual([
      "#s1",
      "#s2",
      "#s3",
    ]);

    const activeInitial = container.querySelectorAll("nav.sb-nav a.active");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#s1");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<CssDesignSystemSidebar groups={GROUPS} />);

    intersect("s3");

    const activeAfter = container.querySelectorAll("nav.sb-nav a.active");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#s3");

    const prevActive = container.querySelector("nav.sb-nav a[href='#s1']");
    expect(prevActive?.classList.contains("active")).toBe(false);
  });

  it("スクロール量に応じて進捗バーの scaleX を更新する", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
    });
    const { container } = render(<CssDesignSystemSidebar groups={GROUPS} />);
    const bar = container.querySelector<HTMLDivElement>(".progress-bar");
    expect(bar).not.toBeNull();

    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(bar?.style.transform).toBe("scaleX(0.5)");
  });
});
