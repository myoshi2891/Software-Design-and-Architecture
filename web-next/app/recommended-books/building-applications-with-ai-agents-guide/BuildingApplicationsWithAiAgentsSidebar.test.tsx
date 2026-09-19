import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BuildingApplicationsWithAiAgentsSidebar, {
  type NavGroup,
} from "./BuildingApplicationsWithAiAgentsSidebar";

const TEST_GROUPS: readonly NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "about", label: "このガイドについて", icon: "info" },
      { id: "step0", num: 0, label: "ガイドの読み方" },
    ],
  },
  {
    title: "概念編",
    items: [
      { id: "step1", num: 1, label: "エージェントとは何か" },
      { id: "step2", num: 2, label: "ワークフローとの違い" },
    ],
  },
  {
    title: "付録",
    items: [
      { id: "glossary", label: "用語集", icon: "book" },
      { id: "references", label: "参考文献・出典", icon: "link" },
    ],
  },
];

type IOCallback = (entries: IntersectionObserverEntry[]) => void;
let ioCallback: IOCallback | null = null;
let observedTargets: Element[] = [];

class CapturingIO implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn((target: Element) => {
    observedTargets.push(target);
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
  if (!observedTargets.includes(target)) {
    throw new Error(`section #${id} was not registered via observe()`);
  }
  const entry = {
    isIntersecting: true,
    target,
    boundingClientRect: { top: 0 } as DOMRectReadOnly,
  } as unknown as IntersectionObserverEntry;
  act(() => ioCallback?.([entry]));
}

describe("BuildingApplicationsWithAiAgentsSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    observedTargets = [];
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section id="about"></section>
        <section id="step0"></section>
        <section id="step1"></section>
        <section id="step2"></section>
        <section id="glossary"></section>
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
    const { container } = render(<BuildingApplicationsWithAiAgentsSidebar groups={TEST_GROUPS} />);
    const labels = Array.from(container.querySelectorAll(".nav-group-label")).map(
      (el) => el.textContent
    );
    expect(labels).toEqual(["はじめに", "概念編", "付録"]);

    const links = container.querySelectorAll("a.nav-a");
    expect(links).toHaveLength(6);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual([
      "#about",
      "#step0",
      "#step1",
      "#step2",
      "#glossary",
      "#references",
    ]);
  });

  it("初期状態では先頭の nav リンクが active になる", () => {
    const { container } = render(<BuildingApplicationsWithAiAgentsSidebar groups={TEST_GROUPS} />);
    const active = container.querySelector("a.nav-a.active");
    expect(active?.getAttribute("href")).toBe("#about");
  });

  it("IntersectionObserver で交差したセクションに active が切り替わる", () => {
    const { container } = render(<BuildingApplicationsWithAiAgentsSidebar groups={TEST_GROUPS} />);
    intersect("step1");
    const active = container.querySelector("a.nav-a.active");
    expect(active?.getAttribute("href")).toBe("#step1");
  });

  it("モバイルトグルでサイドバーの開閉ができる", () => {
    const { container } = render(<BuildingApplicationsWithAiAgentsSidebar groups={TEST_GROUPS} />);
    const toggleBtn = container.querySelector("#menuToggle");
    expect(toggleBtn).not.toBeNull();
    expect(toggleBtn?.getAttribute("aria-expanded")).toBe("false");
    if (!toggleBtn) throw new Error("toggleBtn not found");

    fireEvent.click(toggleBtn);
    expect(toggleBtn.getAttribute("aria-expanded")).toBe("true");

    const sidebar = container.querySelector("#sidebar");
    expect(sidebar?.classList.contains("open")).toBe(true);

    const overlay = container.querySelector("#scrim");
    expect(overlay).not.toBeNull();
    if (!overlay) throw new Error("overlay not found");
    fireEvent.click(overlay);
    expect(toggleBtn.getAttribute("aria-expanded")).toBe("false");
    expect(sidebar?.classList.contains("open")).toBe(false);
  });

  it("Escapeキー押下でサイドバーを閉じ、フォーカスをトグルボタンへ戻す", () => {
    const { container } = render(<BuildingApplicationsWithAiAgentsSidebar groups={TEST_GROUPS} />);
    const toggleBtn = container.querySelector("#menuToggle");
    if (!toggleBtn) throw new Error("toggleBtn not found");

    fireEvent.click(toggleBtn);
    const sidebar = container.querySelector("#sidebar");
    expect(sidebar?.classList.contains("open")).toBe(true);

    const firstLink = container.querySelector("a.nav-a");
    if (!(firstLink instanceof HTMLElement)) throw new Error("firstLink not found");
    firstLink.focus();
    expect(document.activeElement).toBe(firstLink);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(sidebar?.classList.contains("open")).toBe(false);
    expect(document.activeElement).toBe(toggleBtn);
  });
});
