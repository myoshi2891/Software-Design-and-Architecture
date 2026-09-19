// @vitest-environment jsdom
import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AiNativeValueArchitectSidebar, { type NavGroup } from "./AiNativeValueArchitectSidebar";

const GROUPS: NavGroup[] = [
  {
    title: "はじめに",
    items: [
      { id: "prereq", label: "前提知識のおさらい" },
      { id: "overview", label: "認定資格の全体像" },
      { id: "role", label: "役割とは何か" },
    ],
  },
  {
    title: "試験ドメイン",
    items: [
      { id: "domain1", label: "Change Agentの育成" },
      { id: "domain2", label: "戦略・整合・ガバナンス" },
      { id: "domain3", label: "ソリューション設計と提供" },
      { id: "domain4", label: "価値実現と組織変革" },
    ],
  },
  {
    title: "まとめ",
    items: [
      { id: "map", label: "全体統合マップ" },
      { id: "glossary", label: "用語集" },
      { id: "checklist", label: "学習チェックリスト" },
      { id: "references", label: "参考文献・ソース一覧" },
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

describe("AiNativeValueArchitectSidebar", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    ioCallback = null;
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = CapturingIO as unknown as typeof IntersectionObserver;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<main>
        <section class="section" id="prereq"></section>
        <section class="section" id="overview"></section>
        <section class="section" id="domain1"></section>
      </main>`
    );
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("グループ見出しと nav リンクをソース順で 11 個描画する", () => {
    const { container } = render(<AiNativeValueArchitectSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".nav-group-label")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["はじめに", "試験ドメイン", "まとめ"]);

    const links = container.querySelectorAll("nav a");
    expect(links).toHaveLength(11);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual([
      "#prereq",
      "#overview",
      "#role",
      "#domain1",
      "#domain2",
      "#domain3",
      "#domain4",
      "#map",
      "#glossary",
      "#checklist",
      "#references",
    ]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<AiNativeValueArchitectSidebar groups={GROUPS} />);
    const active = container.querySelectorAll("nav a.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#prereq");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<AiNativeValueArchitectSidebar groups={GROUPS} />);

    intersect("domain1");

    const active = container.querySelectorAll("nav a.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#domain1");
  });
});
