// [Red] 契約テスト (SiteFooter)。公開デプロイに必要なサイト共通の法務表記。
//
// 固定する契約:
// - <footer class="site-footer"> (contentinfo) を描画する。
// - 本文の著作権表示「© 2026 myoshi2891. All rights reserved.」。
// - 引用・参考文献の著作権は各権利者に帰属する旨。
// - 会社名・製品名は各社の商標である旨。
// - 書籍の著者・出版社や認定団体の公式資料ではなく無関係である旨。
// - サードパーティライセンス一覧 (/licenses) へのリンク。
// - layout.tsx がサイト全体に配置している。

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site/SiteFooter";

describe("SiteFooter", () => {
  it("renders a contentinfo footer", () => {
    const { container } = render(<SiteFooter />);
    expect(container.querySelector("footer.site-footer")).not.toBeNull();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("states the site copyright", () => {
    const { container } = render(<SiteFooter />);
    expect(container.textContent).toContain("© 2026 myoshi2891. All rights reserved.");
  });

  it("states that quoted and referenced works belong to their owners", () => {
    const { container } = render(<SiteFooter />);
    expect(container.textContent).toContain("引用・参考文献の著作権は各権利者に帰属します");
  });

  it("states that product and company names are trademarks", () => {
    const { container } = render(<SiteFooter />);
    expect(container.textContent).toContain("各社の商標または登録商標です");
  });

  it("disclaims affiliation with authors, publishers and certification bodies", () => {
    const { container } = render(<SiteFooter />);
    expect(container.textContent).toContain("著者・出版社・認定団体とは一切関係ありません");
  });

  it("links to the third-party license list", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "サードパーティライセンス" })).toHaveAttribute(
      "href",
      "/licenses"
    );
  });
});

describe("layout integration", () => {
  it("places SiteFooter in the root layout", () => {
    const layout = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
    expect(layout).toContain("<SiteFooter />");
  });
});
