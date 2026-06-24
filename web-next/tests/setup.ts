import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// jsdom は IntersectionObserver を実装していないため、scroll-spy 等を使う
// クライアントコンポーネント（例: EdaSidebar）のレンダリングを最小スタブで支える。
if (!("IntersectionObserver" in globalThis)) {
  class IntersectionObserverStub implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  }
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver;
}

// 各テスト後に DOM をクリーンアップ（RTL のデフォルト動作を明示化）
afterEach(() => {
  cleanup();
});
