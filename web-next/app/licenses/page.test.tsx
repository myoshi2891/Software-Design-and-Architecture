// [Red] 契約テスト (/licenses)。サードパーティライセンス一覧ページ。
//
// 固定する契約:
// - h1「サードパーティライセンス」。
// - packageLicenses / fontLicenses の全エントリの名称とライセンス名を表示する。
// - MIT の許諾文（MIT 対象の著作権表示を併記）と OFL 1.1 全文を静的に同梱する。
// - mermaid が同梱する Apache-2.0 / EPL-2.0 / BSD-3-Clause の本文も著作権表示と併せて同梱し、
//   EPL-2.0 はソースコードの入手先を示す。
// - 外部リンクは Ext 経由（rel="noopener noreferrer"）。

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LicensesPage from "@/app/licenses/page";
import { fontLicenses, packageLicenses } from "@/lib/third-party-licenses";

describe("/licenses page", () => {
  it("renders the heading", () => {
    render(<LicensesPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "サードパーティライセンス" })
    ).toBeInTheDocument();
  });

  it("lists every package and font with its license", () => {
    const { container } = render(<LicensesPage />);
    for (const entry of [...packageLicenses, ...fontLicenses]) {
      expect(container.textContent).toContain(entry.name);
      expect(container.textContent).toContain(entry.license);
    }
  });

  it("names each license table with a caption", () => {
    render(<LicensesPage />);
    expect(screen.getByRole("table", { name: "ソフトウェアのライセンス一覧" })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "フォントのライセンス一覧" })).toBeInTheDocument();
  });

  it("includes the MIT permission notice and the OFL 1.1 full text", () => {
    const { container } = render(<LicensesPage />);
    const text = container.textContent ?? "";
    expect(text).toContain("Permission is hereby granted, free of charge");
    expect(text).toContain('THE SOFTWARE IS PROVIDED "AS IS"');
    expect(text).toContain("SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007");
    expect(text).toContain("TERMINATION");
  });

  it("lists every MIT copyright notice alongside the permission notice", () => {
    render(<LicensesPage />);
    const notice = screen.getByRole("region", { name: "MIT License" });
    for (const entry of packageLicenses.filter((e) => e.license === "MIT")) {
      expect(notice.textContent).toContain(entry.copyright);
    }
  });

  it.each([
    [
      "Apache License 2.0",
      "Apache-2.0",
      "TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION",
    ],
    ["Eclipse Public License 2.0", "EPL-2.0", "Eclipse Public License - v 2.0"],
    ["BSD 3-Clause License", "BSD-3-Clause", "Neither the name of the author nor the names"],
  ])("includes the %s text with its copyright notices", (name, license, excerpt) => {
    render(<LicensesPage />);
    const section = screen.getByRole("region", { name });
    expect(section.textContent).toContain(excerpt);
    for (const entry of packageLicenses.filter((e) => e.license.includes(license))) {
      expect(section.textContent).toContain(entry.copyright);
    }
  });

  it("tells where to obtain the EPL-2.0 source code", () => {
    render(<LicensesPage />);
    const section = screen.getByRole("region", { name: "Eclipse Public License 2.0" });
    expect(section.textContent).toContain("https://github.com/kieler/elkjs");
  });

  it("opens external links with noopener noreferrer", () => {
    const { container } = render(<LicensesPage />);
    const links = container.querySelectorAll('a[href^="https://"]');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
