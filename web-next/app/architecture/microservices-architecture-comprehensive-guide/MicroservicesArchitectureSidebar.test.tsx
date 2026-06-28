import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MicroservicesArchitectureSidebar, {
  type NavGroup,
} from "./MicroservicesArchitectureSidebar";

const GROUPS: NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "s1", num: "01", label: "マイクロサービスとは" },
      { id: "s2", num: "02", label: "モノリス vs MS" },
    ],
  },
  {
    title: "設計",
    items: [{ id: "s3", num: "03", label: "設計原則" }],
  },
];

type IOCallback = (entries: IntersectionObserverEntry[]) => void;
let ioCallback: IOCallback | null = null;
let observedElements: Element[] = [];

class CapturingIO implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn((el: Element) => {
    observedElements.push(el);
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
  const entry = {
    isIntersecting: true,
    target,
  } as unknown as IntersectionObserverEntry;
  act(() => ioCallback?.([entry]));
}

describe("MicroservicesArchitectureSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    observedElements = [];
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section class="section" id="s1"></section>
        <section class="section" id="s2"></section>
        <section class="section" id="s3"></section>
        <section id="s-plain"></section>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    observedElements = [];
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("グループ見出しと nav リンクをソース順で描画する", () => {
    const { container } = render(<MicroservicesArchitectureSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".nav-grp")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["はじめに", "設計"]);

    const links = container.querySelectorAll("nav.sb-nav a");
    expect(links).toHaveLength(3);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual(["#s1", "#s2", "#s3"]);
  });

  it("初期状態では先頭の nav 項目に on が付く", () => {
    const { container } = render(<MicroservicesArchitectureSidebar groups={GROUPS} />);
    const active = container.querySelectorAll("nav.sb-nav a.on");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#s1");
  });

  it("section が交差すると対応する nav 項目だけが on になる", () => {
    const { container } = render(<MicroservicesArchitectureSidebar groups={GROUPS} />);

    const activeInitial = container.querySelectorAll("nav.sb-nav a.on");
    expect(activeInitial).toHaveLength(1);
    expect(activeInitial[0]?.getAttribute("href")).toBe("#s1");

    intersect("s3");

    const activeAfter = container.querySelectorAll("nav.sb-nav a.on");
    expect(activeAfter).toHaveLength(1);
    expect(activeAfter[0]?.getAttribute("href")).toBe("#s3");

    const prevActive = container.querySelector("nav.sb-nav a[href='#s1']");
    expect(prevActive?.classList.contains("on")).toBe(false);
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
    const { container } = render(<MicroservicesArchitectureSidebar groups={GROUPS} />);
    const bar = container.querySelector<HTMLDivElement>("#pb");
    expect(bar).not.toBeNull();

    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(bar?.style.transform).toBe("scaleX(0.5)");
  });

  it("クラスを持たないプレーンな section は IntersectionObserver に登録されない", () => {
    render(<MicroservicesArchitectureSidebar groups={GROUPS} />);

    const plainSection = document.getElementById("s-plain");
    const s1 = document.getElementById("s1");

    expect(plainSection).not.toBeNull();
    expect(s1).not.toBeNull();

    expect(observedElements).not.toContain(plainSection);
    expect(observedElements).toContain(s1);
  });
});
