// @vitest-environment jsdom
import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TddSidebar, { type NavGroup } from "./TddSidebar";

const GROUPS: NavGroup[] = [
  {
    label: "基礎",
    items: [
      { id: "s1", label: "TDDとは何か" },
      { id: "s2", label: "Red-Green-Refactor" },
      { id: "s3", label: "ステップバイステップ実践" },
      { id: "s4", label: "テストの種類と役割" },
    ],
  },
  {
    label: "設計",
    items: [
      { id: "s5", label: "ユニットテスト設計原則" },
      { id: "s6", label: "モックとスタブの活用" },
      { id: "s7", label: "AAAパターン" },
    ],
  },
  {
    label: "実装例",
    items: [
      { id: "s8", label: "ドメインロジック編" },
      { id: "s9", label: "APIエンドポイント編" },
      { id: "s10", label: "データベース層編" },
    ],
  },
  {
    label: "応用",
    items: [
      { id: "s11", label: "BDDとの連携" },
      { id: "s12", label: "テストカバレッジ" },
      { id: "s13", label: "CI/CDパイプライン" },
      { id: "s14", label: "障壁と解決策" },
      { id: "s15", label: "レガシーコード" },
    ],
  },
  {
    label: "まとめ",
    items: [
      { id: "s16", label: "ベストプラクティス" },
      { id: "s17", label: "アンチパターン" },
      { id: "s18", label: "参考文献" },
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
    const { container } = render(<TddSidebar groups={GROUPS} />);
    const groupTitles = Array.from(container.querySelectorAll(".nav-section-label")).map(
      (el) => el.textContent
    );
    expect(groupTitles).toEqual(["基礎", "設計", "実装例", "応用", "まとめ"]);

    const links = container.querySelectorAll(".nav-item");
    expect(links).toHaveLength(18);
    expect(Array.from(links).map((a) => a.getAttribute("href"))).toEqual([
      "#s1",
      "#s2",
      "#s3",
      "#s4",
      "#s5",
      "#s6",
      "#s7",
      "#s8",
      "#s9",
      "#s10",
      "#s11",
      "#s12",
      "#s13",
      "#s14",
      "#s15",
      "#s16",
      "#s17",
      "#s18",
    ]);
  });

  it("初期状態では先頭の nav 項目に active が付く", () => {
    const { container } = render(<TddSidebar groups={GROUPS} />);
    const active = container.querySelectorAll(".nav-item.active");
    expect(active).toHaveLength(1);
    expect(active[0]?.getAttribute("href")).toBe("#s1");
  });

  it("section が交差すると対応する nav 項目だけが active になる", () => {
    const { container } = render(<TddSidebar groups={GROUPS} />);

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

  it("スクロール量に応じて進捗バーの scaleX を更新する", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
    });
    const { container } = render(<TddSidebar groups={GROUPS} />);
    const bar = container.querySelector<HTMLDivElement>(".progress-bar");
    expect(bar).not.toBeNull();

    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(bar?.style.transform).toBe("scaleX(0.5)");
  });
});
