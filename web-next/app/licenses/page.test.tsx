// [Red] 契約テスト (/licenses)。サードパーティライセンス一覧ページ。
//
// 固定する契約:
// - h1「サードパーティライセンス」。
// - packageLicenses / fontLicenses の全エントリの名称とライセンス名を表示する。
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

  it("opens external links with noopener noreferrer", () => {
    const { container } = render(<LicensesPage />);
    const links = container.querySelectorAll('a[href^="https://"]');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
