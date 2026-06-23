import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EdaSidebar, { type NavGroup } from "./EdaSidebar";

// テスト用の最小グループ定義（順序・active 付与の検証に十分な 3 項目）。
const GROUPS: NavGroup[] = [
  {
    title: "基礎知識",
    items: [
      { id: "sec-1", num: "01", label: "EDA とは" },
      { id: "sec-2", num: "02", label: "コンポーネント" },
    ],
  },
  {
    title: "実装パターン",
    items: [{ id: "sec-3", num: "03", label: "イベントソーシング" }],
  },
];

// IntersectionObserver のコールバックをテスト側で捕捉するためのスタブ。
// setup.ts のグローバルスタブは observe が no-op のため、scroll-spy の
// active 切替ロジックを検証できない。本テストでは callback を保持し、
// 任意の交差イベントを手動でディスパッチできるようにする。
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

/** 指定 section が交差した、という IntersectionObserverEntry を最小生成する。 */
function intersect(id: string): void {
  const target = document.getElementById(id);
  if (!target) throw new Error(`section #${id} not found`);
  const entry = {
    isIntersecting: true,
    target,
  } as unknown as IntersectionObserverEntry;
  act(() => ioCallback?.([entry]));
}

describe("EdaSidebar", () => {
  beforeEach(() => {
    ioCallback = null;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    // scroll-spy が監視する本文 section を用意する。
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section class="section" id="sec-1"></section>
        <section class="section" id="sec-2"></section>
        <section class="section" id="sec-3"></section>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("グループ見出しと nav リンクをソース順で描画する", () => {
    const { container } = render(<EdaSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".sb-group")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["基礎知識", "実装パターン"]);

    const links = container.querySelectorAll("a.sl");
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual([
      "#sec-1",
      "#sec-2",
      "#sec-3",
    ]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<EdaSidebar groups={GROUPS} />);
    const active = container.querySelectorAll("a.sl.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#sec-1");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<EdaSidebar groups={GROUPS} />);

    // 初期状態で #sec-1 がアクティブであることを確認
    const activeInitial = container.querySelectorAll("a.sl.active");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#sec-1");

    // sec-3 が交差する
    intersect("sec-3");

    // 新しいアクティブ項目が #sec-3 であることを確認
    const activeAfter = container.querySelectorAll("a.sl.active");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#sec-3");

    // 以前のアクティブ項目 (#sec-1) がアクティブクラスを失っていることを検証
    const prevActive = container.querySelector("a.sl[href='#sec-1']");
    expect(prevActive?.classList.contains("active")).toBe(false);
  });

  it("スクロール量に応じて進捗バーの scaleX を更新する", () => {
    // jsdom はレイアウトを計算しないため、進捗計算に必要な値をモックする。
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
    });
    const { container } = render(<EdaSidebar groups={GROUPS} />);
    const bar = container.querySelector<HTMLDivElement>(".progress-bar");
    expect(bar).not.toBeNull();

    // docH = 2000 - 1000 = 1000、scrollY = 500 → prog = 0.5
    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(bar?.style.transform).toBe("scaleX(0.5)");
  });
});
