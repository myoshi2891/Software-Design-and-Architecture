import { fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TogafGuideShell, { type TogafNavGroup } from "./TogafGuideShell";

const groups: TogafNavGroup[] = [
  {
    label: "はじめに",
    items: [
      { id: "overview", label: "TOGAFとは", icon: "building-arch" },
      { id: "exam", label: "試験概要", icon: "certificate" },
    ],
  },
];
const panels = [
  { id: "overview", content: <h1>TOGAF とは何か</h1> },
  { id: "exam", content: <h1>試験の種類と概要</h1> },
];
afterEach(() => vi.restoreAllMocks());

describe("TOGAF chapter switching", () => {
  it("mounts only the selected chapter, resets scroll and supports revisiting", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    const { container, getByRole } = render(<TogafGuideShell groups={groups} panels={panels} />);
    expect(container.querySelectorAll(".section")).toHaveLength(1);
    expect(container.querySelector("#overview")).toHaveClass("active");
    expect(container.querySelector("#exam")).toBeNull();
    const exam = getByRole("tab", { name: "試験概要" });
    fireEvent.click(exam);
    expect(scroll).toHaveBeenLastCalledWith({ top: 0 });
    expect(exam).toHaveClass("active");
    expect(exam).toHaveAttribute("aria-selected", "true");
    expect(container.querySelector("#exam")).toHaveTextContent("試験の種類と概要");
    expect(getByRole("tablist", { name: "章" })).toContainElement(exam);
    expect(exam).toHaveAttribute("aria-controls", "exam");
    expect(getByRole("tabpanel", { name: "試験概要" })).toBe(container.querySelector("#exam"));
    expect(container.querySelector("#overview")).toBeNull();
    fireEvent.click(getByRole("tab", { name: "TOGAFとは" }));
    expect(container.querySelector("#overview")).toHaveTextContent("TOGAF とは何か");
    expect(exam).not.toHaveClass("active");
    expect(exam).toHaveAttribute("aria-selected", "false");
    fireEvent.click(exam);
    expect(container.querySelectorAll(".section.active")).toHaveLength(1);
    expect(container.querySelector("#exam")).not.toBeNull();
  });
});
