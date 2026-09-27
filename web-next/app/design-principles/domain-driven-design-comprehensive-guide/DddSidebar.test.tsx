// @vitest-environment jsdom
import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DddSidebar, { type NavGroup } from "./DddSidebar";

const GROUPS: NavGroup[] = [
  {
    label: "はじめに",
    items: [
      { id: "intro", label: "DDDとは何か" },
      { id: "structure", label: "DDDの全体構造" },
    ],
  },
  {
    label: "戦略的設計",
    items: [
      { id: "ubiquitous", label: "ユビキタス言語" },
      { id: "domain", label: "ドメインとサブドメイン" },
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

describe("DddSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <div class="section" id="intro"></div>
        <div class="section" id="structure"></div>
        <div class="section" id="ubiquitous"></div>
        <div class="section" id="domain"></div>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("グループ見出しと nav リンクをソース順で描画する", () => {
    const { container } = render(<DddSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".nav-group-label")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["はじめに", "戦略的設計"]);

    const links = container.querySelectorAll(".nav-item");
    expect(links).toHaveLength(4);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual([
      "#intro",
      "#structure",
      "#ubiquitous",
      "#domain",
    ]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<DddSidebar groups={GROUPS} />);
    const active = container.querySelectorAll(".nav-item.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#intro");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<DddSidebar groups={GROUPS} />);

    // 初期状態で #intro がアクティブであることを確認
    const activeInitial = container.querySelectorAll(".nav-item.active");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#intro");

    // domain が交差する
    intersect("domain");

    // 新しいアクティブ項目が #domain であることを確認
    const activeAfter = container.querySelectorAll(".nav-item.active");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#domain");

    // 以前のアクティブ項目 (#intro) がアクティブクラスを失っていることを検証
    const prevActive = container.querySelector(".nav-item[href='#intro']");
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
    const { container } = render(<DddSidebar groups={GROUPS} />);
    const bar = container.querySelector<HTMLDivElement>(".progress-bar");
    expect(bar).not.toBeNull();

    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(bar?.style.transform).toBe("scaleX(0.5)");
  });
});
