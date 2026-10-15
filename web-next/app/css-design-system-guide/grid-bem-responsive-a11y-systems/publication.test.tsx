import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { navLinks } from "@/components/site/nav-links";
import { guideCatalog } from "@/lib/guide-catalog";

vi.mock("@/components/MermaidDiagram", () => ({ default: () => <div /> }));

import Page from "./page";

const href = "/css-design-system-guide/grid-bem-responsive-a11y-systems";
it("publishes this guide in the catalog with the existing navigation destination", () => {
  const entry = guideCatalog
    .flatMap((category) => category.entries)
    .find((entry) => entry.href === href);
  expect(entry?.status).toBe("published");
  expect(JSON.stringify(navLinks)).toContain(href);
});
it("preserves all twenty-five external destinations with safe attributes and valid internal anchors", () => {
  const { container } = render(<Page />);
  const external = container.querySelectorAll('a[href^="http"]');
  expect(external).toHaveLength(25);
  for (const a of external) {
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", "noopener noreferrer");
  }
  for (const a of container.querySelectorAll("a")) {
    const target = a.getAttribute("href") ?? "";
    if (target.startsWith("http")) continue;
    expect(target).not.toContain(".html");
    if (target.startsWith("#")) expect(container.querySelector(target)).not.toBeNull();
  }
});
