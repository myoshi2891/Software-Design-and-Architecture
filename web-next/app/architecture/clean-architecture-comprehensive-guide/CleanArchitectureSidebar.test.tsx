import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CleanArchitectureSidebar, { type NavGroup } from "./CleanArchitectureSidebar";

const GROUPS: NavGroup[] = [
  {
    title: "導入",
    items: [
      { id: "intro", emoji: "💡", label: "クリーンアーキテクチャとは" },
      { id: "layers", emoji: "🔵", label: "4つの同心円レイヤー" },
    ],
  },
  {
    title: "依存性の原則",
    items: [{ id: "dip", emoji: "🔄", label: "依存性の逆転原則（DIP）" }],
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

describe("CleanArchitectureSidebar", () => {
  beforeEach(() => {
    ioCallback = null;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section class="section" id="intro"></section>
        <section class="section" id="layers"></section>
        <section class="section" id="dip"></section>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("グループ見出しと nav リンクをソース順で描画する", () => {
    const { container } = render(<CleanArchitectureSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".sb-label")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["導入", "依存性の原則"]);

    const links = container.querySelectorAll("nav.sb-nav a");
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual([
      "#intro",
      "#layers",
      "#dip",
    ]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<CleanArchitectureSidebar groups={GROUPS} />);
    const active = container.querySelectorAll("nav.sb-nav a.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#intro");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<CleanArchitectureSidebar groups={GROUPS} />);

    // 初期状態で #intro がアクティブであることを確認
    const activeInitial = container.querySelectorAll("nav.sb-nav a.active");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#intro");

    // dip が交差する
    intersect("dip");

    // 新しいアクティブ項目が #dip であることを確認
    const activeAfter = container.querySelectorAll("nav.sb-nav a.active");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#dip");

    // 以前のアクティブ項目 (#intro) がアクティブクラスを失っていることを検証
    const prevActive = container.querySelector("nav.sb-nav a[href='#intro']");
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
    const { container } = render(<CleanArchitectureSidebar groups={GROUPS} />);
    const bar = container.querySelector<HTMLDivElement>(".progress-bar");
    expect(bar).not.toBeNull();

    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(bar?.style.transform).toBe("scaleX(0.5)");
  });
});
