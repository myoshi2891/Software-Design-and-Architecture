// [Red] 契約テスト (SiteHeaderClient / インタラクション)。Green フェーズで
// components/site/SiteHeaderClient.tsx（hamburger/dropdown 開閉・Escape・
// 外側クリックのハンドラ）を実装するまで失敗する。

/**
 * 固定する契約:
 * - 先頭に "use client" ディレクティブ。
 * - hamburger click で .ch-links に ch-open 付与/除去、aria-expanded 同期。
 * - dropdown toggle click で aria-expanded false ↔ true。
 * - Escape で dropdown が閉じる。
 * - 外側クリックで menu と dropdown の両方が閉じる。
 * - hamburger 内に .ch-bar が 3 本。
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { SiteHeaderClient as RawClient } from "@/components/site/SiteHeaderClient";

const SiteHeaderClient = RawClient as unknown as (props: { children: ReactNode }) => ReactElement;

const minimalNavDom = (
  <nav id="common-header" className="ch-nav" aria-label="Main Navigation">
    <button
      type="button"
      className="ch-hamburger"
      aria-controls="ch-menu"
      aria-expanded="false"
      aria-label="Toggle menu"
    >
      <span className="ch-bar" />
      <span className="ch-bar" />
      <span className="ch-bar" />
    </button>
    <ul id="ch-menu" className="ch-links">
      <li className="ch-dropdown">
        <button
          type="button"
          className="ch-dropdown-toggle"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span>アーキテクチャ</span>
        </button>
        <ul className="ch-submenu">
          <li>
            <a href="/architecture/event-driven-architecture-comprehensive-guide">EDA</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

describe("SiteHeaderClient directive", () => {
  it("declares 'use client' on the first effective line", () => {
    const source = readFileSync(join(__dirname, "SiteHeaderClient.tsx"), "utf8");
    const firstStmt = source.replace(/^\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*\n?)*/g, "");
    expect(firstStmt).toMatch(/^["']use client["']/);
  });
});

describe("SiteHeaderClient hamburger toggle", () => {
  it("renders 3 .ch-bar spans inside the hamburger", () => {
    const { container } = render(<SiteHeaderClient>{minimalNavDom}</SiteHeaderClient>);
    expect(container.querySelectorAll(".ch-hamburger .ch-bar").length).toBe(3);
  });

  it("adds ch-open to .ch-links when hamburger is clicked", () => {
    const { container } = render(<SiteHeaderClient>{minimalNavDom}</SiteHeaderClient>);
    const hamburger = container.querySelector(".ch-hamburger") as HTMLElement;
    const links = container.querySelector(".ch-links") as HTMLElement;
    fireEvent.click(hamburger);
    expect(links.className).toContain("ch-open");
  });

  it("syncs hamburger aria-expanded with menu state", () => {
    const { container } = render(<SiteHeaderClient>{minimalNavDom}</SiteHeaderClient>);
    const hamburger = container.querySelector(".ch-hamburger") as HTMLElement;
    expect(hamburger.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(hamburger);
    expect(hamburger.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(hamburger);
    expect(hamburger.getAttribute("aria-expanded")).toBe("false");
  });
});

describe("SiteHeaderClient dropdown toggle", () => {
  it("flips dropdown aria-expanded false -> true on click", () => {
    const { container } = render(<SiteHeaderClient>{minimalNavDom}</SiteHeaderClient>);
    const toggle = container.querySelector(".ch-dropdown-toggle") as HTMLElement;
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
  });

  it("closes dropdown on Escape keydown", () => {
    const { container } = render(<SiteHeaderClient>{minimalNavDom}</SiteHeaderClient>);
    const toggle = container.querySelector(".ch-dropdown-toggle") as HTMLElement;
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});

describe("SiteHeaderClient outside click", () => {
  it("closes menu and dropdown when clicking outside the nav", () => {
    const { container } = render(<SiteHeaderClient>{minimalNavDom}</SiteHeaderClient>);
    const hamburger = container.querySelector(".ch-hamburger") as HTMLElement;
    const toggle = container.querySelector(".ch-dropdown-toggle") as HTMLElement;
    const links = container.querySelector(".ch-links") as HTMLElement;

    fireEvent.click(hamburger);
    fireEvent.click(toggle);
    expect(links.className).toContain("ch-open");
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(document.body);
    expect(links.className).not.toContain("ch-open");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});
