import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BuildingLlmPoweredSidebar, { type NavGroup } from "./BuildingLlmPoweredSidebar";

const TEST_GROUPS: NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "intro", label: "この記事について", icon: "home" },
      { id: "quickstart", label: "最小のLLMアプリ", icon: "code" },
    ],
  },
  {
    title: "ステップガイド",
    items: [
      { id: "step0", num: 0, label: "全体像をつかむ" },
      { id: "step1", num: 1, label: "LLMの基礎" },
    ],
  },
  {
    title: "まとめ",
    items: [
      { id: "summary", label: "学習ロードマップ", icon: "map" },
      { id: "references", label: "参考文献・ソース一覧", icon: "books" },
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

describe("BuildingLlmPoweredSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section id="intro"></section>
        <section id="quickstart"></section>
        <section id="step0"></section>
        <section id="step1"></section>
        <section id="summary"></section>
        <section id="references"></section>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("グループラベルと nav リンクを描画する", () => {
    const { container } = render(<BuildingLlmPoweredSidebar groups={TEST_GROUPS} />);
    const labels = Array.from(container.querySelectorAll(".nav-group-label")).map(
      (el) => el.textContent
    );
    expect(labels).toEqual(["はじめに", "ステップガイド", "まとめ"]);

    const links = container.querySelectorAll("a.nav-a");
    expect(links).toHaveLength(6);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual([
      "#intro",
      "#quickstart",
      "#step0",
      "#step1",
      "#summary",
      "#references",
    ]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<BuildingLlmPoweredSidebar groups={TEST_GROUPS} />);
    const active = container.querySelectorAll("a.nav-a.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#intro");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<BuildingLlmPoweredSidebar groups={TEST_GROUPS} />);

    intersect("step1");
    const active = container.querySelectorAll("a.nav-a.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#step1");
  });

  it("モバイルトグルでメニューが開閉する", () => {
    const { container } = render(<BuildingLlmPoweredSidebar groups={TEST_GROUPS} />);
    const toggleBtn = container.querySelector("#mobileToggle");
    const sidebar = container.querySelector("#sidebar");
    const overlay = container.querySelector("#sidebarOverlay");

    expect(toggleBtn).not.toBeNull();
    expect(sidebar?.classList.contains("open")).toBe(false);

    if (!toggleBtn || !overlay) {
      throw new Error("toggleBtn or overlay not found");
    }

    fireEvent.click(toggleBtn);
    expect(sidebar?.classList.contains("open")).toBe(true);
    expect(overlay.classList.contains("open")).toBe(true);

    fireEvent.click(overlay);
    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(overlay.classList.contains("open")).toBe(false);
  });
});
