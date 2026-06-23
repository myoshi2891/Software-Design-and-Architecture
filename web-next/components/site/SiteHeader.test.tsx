// [Red] 契約テスト (SiteHeader / 構造 + active 判定)。Green フェーズで
// components/site/SiteHeader.tsx（usePathname で現在地を読む Client Component）
// を実装するまで失敗する。

/**
 * 固定する契約:
 * - ルート `<nav id="common-header" aria-label="Main Navigation" class="ch-nav">`。
 * - `<a class="ch-brand" href="/general/comprehensive-guide">設計手法ガイド</a>`。
 * - `<ul class="ch-links">` 配下に navLinks 由来の `<li>`。
 * - dropdown 5 個（アーキテクチャ/設計原則/開発手法/プロダクト/CSS）。
 * - pathname=移行済みルートで該当 `<a>` に ch-active + aria-current="page"、
 *   親 dropdown トグルにも ch-active が波及。
 * - GitHub 外部リンクが末尾に target/rel 付きで描画される。
 * - 静的検査: 生 HTML 注入 API を使わない / 先頭に "use client"。
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { SiteHeader as RawSiteHeader } from "@/components/site/SiteHeader";

const SiteHeader = RawSiteHeader as unknown as (props: { pathname: string }) => ReactElement;

const ACTIVE_ROUTE = "/architecture/event-driven-architecture-comprehensive-guide";

describe("SiteHeader root structure", () => {
  it("renders <nav id=common-header aria-label='Main Navigation'>", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const nav = container.querySelector("nav#common-header");
    expect(nav).not.toBeNull();
    expect(nav?.getAttribute("aria-label")).toBe("Main Navigation");
    expect(nav?.className).toContain("ch-nav");
  });

  it("renders .ch-brand anchor pointing to the general comprehensive guide", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const brand = container.querySelector("a.ch-brand");
    expect(brand?.getAttribute("href")).toBe("/general/comprehensive-guide");
    expect(brand?.textContent).toBe("設計手法ガイド");
  });

  it("renders a .ch-links list", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    expect(container.querySelector("ul.ch-links")).not.toBeNull();
  });
});

describe("SiteHeader dropdown rendering", () => {
  it("renders 5 dropdowns as .ch-dropdown <li>", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    expect(container.querySelectorAll("li.ch-dropdown").length).toBe(5);
  });

  it("each dropdown toggle has aria-haspopup=true", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const toggles = container.querySelectorAll("li.ch-dropdown .ch-dropdown-toggle");
    expect(toggles.length).toBe(5);
    toggles.forEach((btn) => {
      expect(btn.getAttribute("aria-haspopup")).toBe("true");
    });
  });

  it("each dropdown has a .ch-submenu <ul> with at least one child", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const submenus = container.querySelectorAll("li.ch-dropdown ul.ch-submenu");
    expect(submenus.length).toBe(5);
    submenus.forEach((ul) => {
      expect(ul.querySelectorAll("li").length).toBeGreaterThan(0);
    });
  });
});

describe("SiteHeader active-path handling", () => {
  it("marks the matching leaf link with ch-active and aria-current=page", () => {
    const { container } = render(<SiteHeader pathname={ACTIVE_ROUTE} />);
    const active = container.querySelector("a.ch-active");
    expect(active).not.toBeNull();
    expect(active?.getAttribute("href")).toBe(ACTIVE_ROUTE);
    expect(active?.getAttribute("aria-current")).toBe("page");
  });

  it("propagates ch-active to the parent dropdown toggle when a child is active", () => {
    const { container } = render(<SiteHeader pathname={ACTIVE_ROUTE} />);
    const toggles = container.querySelectorAll("li.ch-dropdown .ch-dropdown-toggle");
    const activeToggles = Array.from(toggles).filter((t) => t.className.includes("ch-active"));
    expect(activeToggles.length).toBe(1);
    expect(activeToggles[0].textContent).toContain("アーキテクチャ");
  });

  it("does not add ch-active to any link when pathname is unrecognized", () => {
    const { container } = render(<SiteHeader pathname="/not-a-real-page" />);
    expect(container.querySelector("a.ch-active")).toBeNull();
  });
});

describe("SiteHeader GitHub external link", () => {
  it("renders a trailing GitHub anchor with target=_blank and rel=noopener noreferrer", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const items = container.querySelectorAll("ul.ch-links > li");
    const lastItem = items[items.length - 1];
    const anchor = lastItem?.querySelector("a");
    expect(anchor?.getAttribute("href")).toMatch(/github\.com/);
    expect(anchor?.getAttribute("target")).toBe("_blank");
    expect(anchor?.getAttribute("rel")).toBe("noopener noreferrer");
  });
});

describe("SiteHeader static source safety", () => {
  it("source file does not use React unsafe HTML injection API", () => {
    const source = readFileSync(join(__dirname, "SiteHeader.tsx"), "utf8");
    const unsafeApiName = ["danger", "ously", "Set", "Inner", "HTML"].join("");
    expect(source).not.toContain(unsafeApiName);
  });

  it("declares 'use client' on the first effective line", () => {
    const source = readFileSync(join(__dirname, "SiteHeader.tsx"), "utf8");
    const firstStmt = source.replace(/^\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*\n?)*/g, "");
    expect(firstStmt).toMatch(/^["']use client["']/);
  });
});
