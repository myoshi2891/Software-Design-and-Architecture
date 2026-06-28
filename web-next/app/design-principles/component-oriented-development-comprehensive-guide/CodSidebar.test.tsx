import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CodSidebar, { type NavGroup } from "./CodSidebar";

const GROUPS: NavGroup[] = [
  {
    title: "基礎編",
    items: [
      { id: "s1", num: "01", label: "コンポーネント指向とは" },
      { id: "s2", num: "02", label: "設計原則" },
    ],
  },
  {
    title: "実装編",
    items: [{ id: "s3", num: "03", label: "分類と粒度" }],
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

describe("CodSidebar", () => {
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
    cleanup();
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("グループ見出しと nav リンクをソース順で描画する", () => {
    const { container } = render(<CodSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".nav-section-title")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["基礎編", "実装編"]);

    const links = container.querySelectorAll(".sb-nav a");
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual(["#s1", "#s2", "#s3"]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<CodSidebar groups={GROUPS} />);
    const active = container.querySelectorAll(".sb-nav a.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#s1");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<CodSidebar groups={GROUPS} />);

    // 初期状態で #s1 がアクティブであることを確認
    const activeInitial = container.querySelectorAll(".sb-nav a.active");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#s1");

    // s3 が交差する
    intersect("s3");

    // 新しいアクティブ項目が #s3 であることを確認
    const activeAfter = container.querySelectorAll(".sb-nav a.active");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#s3");

    // 以前のアクティブ項目 (#s1) がアクティブクラスを失っていることを検証
    const prevActive = container.querySelector(".sb-nav a[href='#s1']");
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
    const { container } = render(<CodSidebar groups={GROUPS} />);
    const bar = container.querySelector<HTMLDivElement>(".progress-bar");
    expect(bar).not.toBeNull();

    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(bar?.style.transform).toBe("scaleX(0.5)");
  });
});
