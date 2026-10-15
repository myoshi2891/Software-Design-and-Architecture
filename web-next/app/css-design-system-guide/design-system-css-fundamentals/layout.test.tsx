import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: vi.fn(() => ({ variable: "inter-variable" })),
  Space_Grotesk: vi.fn(() => ({ variable: "space-variable" })),
}));

import { Inter, Space_Grotesk } from "next/font/google";
import Layout from "./layout";

it("loads source fonts through next/font only for this route", () => {
  const { container } = render(
    <Layout>
      <p>フォント確認</p>
    </Layout>
  );
  expect(container.firstElementChild).toHaveClass("inter-variable", "space-variable");
  expect(Inter).toHaveBeenCalledWith(
    expect.objectContaining({ variable: "--font-css-fundamentals-body", display: "swap" })
  );
  expect(Space_Grotesk).toHaveBeenCalledWith(
    expect.objectContaining({ variable: "--font-css-fundamentals-head", display: "swap" })
  );
});
