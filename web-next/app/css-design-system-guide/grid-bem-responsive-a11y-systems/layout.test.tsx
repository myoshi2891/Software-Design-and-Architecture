import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
const { inter, space } = vi.hoisted(() => ({inter: vi.fn(() => ({variable: "inter-font"})), space: vi.fn(() => ({variable: "space-font"}))}));
vi.mock("next/font/google", () => ({ Inter: inter, Space_Grotesk: space }));
import Layout from "./layout";
it("loads original body and heading families through next/font only for this route", () => {
  const { container } = render(<Layout><p>本文</p></Layout>);
  expect(container.firstElementChild).toHaveClass("inter-font", "space-font");
  expect(inter).toHaveBeenCalledWith(expect.objectContaining({variable: "--font-grid-body", display: "swap"}));
  expect(space).toHaveBeenCalledWith(expect.objectContaining({variable: "--font-grid-head", display: "swap"}));
  expect(container.querySelectorAll("link, style")).toHaveLength(0);
});
