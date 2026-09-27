// @vitest-environment jsdom
import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TddSidebar, { DEFAULT_GROUPS } from "./TddSidebar";

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

describe("TddSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <div class="section" id="s1"></div>
        <div class="section" id="s2"></div>
        <div class="section" id="s3"></div>
        <div class="section" id="s4"></div>
        <div class="section" id="s5"></div>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("グループ見出しと nav リンクをソース順で描画する", () => {
    const { container } = render(<TddSidebar groups={DEFAULT_GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".nav-section-label")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(DEFAULT_GROUPS.map((g) => g.label));

    const expectedHrefs = DEFAULT_GROUPS.flatMap((g) => g.items.map((item) => `#${item.id}`));
    const links = container.querySelectorAll(".nav-item");
    expect(links).toHaveLength(expectedHrefs.length);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual(expectedHrefs);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<TddSidebar groups={DEFAULT_GROUPS} />);
    const active = container.querySelectorAll(".nav-item.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#s1");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<TddSidebar groups={DEFAULT_GROUPS} />);

    // 初期状態で #s1 がアクティブであることを確認
    const activeInitial = container.querySelectorAll(".nav-item.active");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#s1");

    // s5 が交差する
    intersect("s5");

    // 新しいアクティブ項目が #s5 であることを確認
    const activeAfter = container.querySelectorAll(".nav-item.active");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#s5");

    // 以前のアクティブ項目 (#s1) がアクティブクラスを失っていることを検証
    const prevActive = container.querySelector(".nav-item[href='#s1']");
    expect(prevActive?.classList.contains("active")).toBe(false);
  });

  it("モバイル用索引に 5 グループ・18 項目のリンクを描画する", () => {
    const { container } = render(<TddSidebar />);
    const mobileToc = container.querySelector("nav.mobile-toc");
    expect(mobileToc).not.toBeNull();
    expect(mobileToc?.getAttribute("aria-label")).toBeTruthy();

    const groupTitles = Array.from(
      mobileToc?.querySelectorAll(".mobile-toc-group-label") ?? []
    ).map((el) => el.textContent);
    expect(groupTitles).toEqual(DEFAULT_GROUPS.map((g) => g.label));
    expect(groupTitles).toHaveLength(5);

    const expectedHrefs = DEFAULT_GROUPS.flatMap((g) => g.items.map((item) => `#${item.id}`));
    const links = Array.from(mobileToc?.querySelectorAll("a") ?? []);
    expect(links.map((a) => a.getAttribute("href"))).toEqual(expectedHrefs);
    expect(links).toHaveLength(18);
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
    const { container } = render(<TddSidebar groups={DEFAULT_GROUPS} />);
    const bar = container.querySelector<HTMLDivElement>(".progress-bar");
    expect(bar).not.toBeNull();

    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(bar?.style.transform).toBe("scaleX(0.5)");
  });
});
