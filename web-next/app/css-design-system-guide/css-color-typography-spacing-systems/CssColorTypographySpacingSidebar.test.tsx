import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CssColorTypographySpacingSidebar, {
  type NavGroup,
} from "./CssColorTypographySpacingSidebar";

const GROUPS: NavGroup[] = [
  {
    title: "CSSカスタムプロパティ",
    chNum: "Ch.3",
    items: [
      { id: "s31", num: "3.1", label: "カスタムプロパティとは" },
      { id: "s32", num: "3.2", label: "定義・参照・スコープ" },
    ],
  },
  {
    title: "カラーシステム",
    chNum: "Ch.4",
    items: [{ id: "s41", num: "4.1", label: "カラーシステムの目的" }],
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

describe("CssColorTypographySpacingSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section class="section" id="s31"></section>
        <section class="section" id="s32"></section>
        <section class="section" id="s41"></section>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("グループ見出しと nav リンクをソース順で描画する", () => {
    const { container } = render(<CssColorTypographySpacingSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".nav-ch")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["Ch.3CSSカスタムプロパティ", "Ch.4カラーシステム"]);

    const links = container.querySelectorAll("nav.sb-nav a.nav-item");
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual(["#s31", "#s32", "#s41"]);

    const activeInitial = container.querySelectorAll("nav.sb-nav a.active");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#s31");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<CssColorTypographySpacingSidebar groups={GROUPS} />);

    intersect("s41");

    const activeAfter = container.querySelectorAll("nav.sb-nav a.active");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#s41");

    const prevActive = container.querySelector("nav.sb-nav a[href='#s31']");
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
    const { container } = render(<CssColorTypographySpacingSidebar groups={GROUPS} />);
    const bar = container.querySelector<HTMLDivElement>(".progress-bar");
    expect(bar).not.toBeNull();

    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(bar?.style.transform).toBe("scaleX(0.5)");
  });
});
