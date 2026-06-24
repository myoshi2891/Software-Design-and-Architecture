// [Red] 契約テスト (DisclaimerBanner)。Green フェーズで
// components/site/DisclaimerBanner.tsx（ResizeObserver で
// --ch-disclaimer-height を同期する Client Component）を実装するまで失敗する。

/**
 * 固定する契約:
 * - ルート `<div class="ch-disclaimer" lang="ja">`。
 * - 2 行の `<span class="ch-disclaimer-line">`。
 * - line1 / line2 は本リポ（学習用参考資料）向けの文面に完全一致。
 * - マウント時に ResizeObserver が observe し、
 *   document.documentElement に --ch-disclaimer-height(px) が設定される。
 * - 静的検査: 先頭に "use client" ディレクティブ。
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DisclaimerBanner as RawBanner } from "@/components/site/DisclaimerBanner";

const DisclaimerBanner = RawBanner as unknown as () => ReactElement;

// jsdom は ResizeObserver 未実装のため最小モックを注入する。
class MockResizeObserver {
  private cb: ResizeObserverCallback;
  constructor(cb: ResizeObserverCallback) {
    this.cb = cb;
  }
  observe(target: Element) {
    this.cb([{ target, contentRect: { height: 64 } } as unknown as ResizeObserverEntry], this);
  }
  unobserve() {
    /* no-op mock */
  }
  disconnect() {
    /* no-op mock */
  }
}

beforeEach(() => {
  document.documentElement.style.removeProperty("--ch-disclaimer-height");
  vi.stubGlobal("ResizeObserver", MockResizeObserver);
});

describe("DisclaimerBanner root structure", () => {
  it("renders a .ch-disclaimer root with lang=ja", () => {
    const { container } = render(<DisclaimerBanner />);
    const root = container.querySelector(".ch-disclaimer");
    expect(root).not.toBeNull();
    expect(root?.getAttribute("lang")).toBe("ja");
  });

  it("renders exactly 2 .ch-disclaimer-line spans", () => {
    const { container } = render(<DisclaimerBanner />);
    expect(container.querySelectorAll(".ch-disclaimer-line").length).toBe(2);
  });
});

describe("DisclaimerBanner text contract", () => {
  it("line 1 matches the repo disclaimer text exactly", () => {
    const { container } = render(<DisclaimerBanner />);
    const lines = container.querySelectorAll(".ch-disclaimer-line");
    expect(lines[0].textContent).toBe(
      "⚠ 本サイトは個人がまとめた学習用の参考資料です。内容の正確性・最新性は保証しません。"
    );
  });

  it("line 2 matches the repo disclaimer text exactly", () => {
    const { container } = render(<DisclaimerBanner />);
    const lines = container.querySelectorAll(".ch-disclaimer-line");
    expect(lines[1].textContent).toBe(
      "実際の設計判断は公式ドキュメントや一次情報を必ずご確認ください。本サイトの利用による損害等について一切の責任を負いません。"
    );
  });
});

describe("DisclaimerBanner ResizeObserver integration", () => {
  it("sets --ch-disclaimer-height on <html> after mount", () => {
    render(<DisclaimerBanner />);
    const val = document.documentElement.style.getPropertyValue("--ch-disclaimer-height");
    expect(val).not.toBe("");
    expect(val).toMatch(/px$/);
  });
});

describe("DisclaimerBanner static source", () => {
  it("declares 'use client' on the first effective line", () => {
    const source = readFileSync(join(__dirname, "DisclaimerBanner.tsx"), "utf8");
    const firstStmt = source.replace(/^\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*\n?)*/g, "");
    expect(firstStmt).toMatch(/^["']use client["']/);
  });
});
