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

  it("moves selection and focus with ArrowUp/ArrowDown (wrapping) and Home/End", () => {
    // Arrange
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    const keyboardGroups: TogafNavGroup[] = [
      ...groups,
      { label: "ADM", items: [{ id: "adm", label: "ADMサイクル", icon: "refresh" }] },
    ];
    const keyboardPanels = [...panels, { id: "adm", content: <h1>ADM の全体像</h1> }];
    const { getByRole } = render(
      <TogafGuideShell groups={keyboardGroups} panels={keyboardPanels} />
    );
    const tab = (name: string) => getByRole("tab", { name });
    const expectActive = (name: string) => {
      expect(tab(name)).toHaveAttribute("aria-selected", "true");
      expect(tab(name)).toHaveAttribute("tabindex", "0");
      expect(tab(name)).toHaveFocus();
    };

    // Act & Assert: グループを跨いで移動し、両端で循環する
    fireEvent.keyDown(tab("TOGAFとは"), { key: "ArrowDown" });
    expectActive("試験概要");
    fireEvent.keyDown(tab("試験概要"), { key: "ArrowDown" });
    expectActive("ADMサイクル");
    fireEvent.keyDown(tab("ADMサイクル"), { key: "ArrowDown" });
    expectActive("TOGAFとは");
    fireEvent.keyDown(tab("TOGAFとは"), { key: "ArrowUp" });
    expectActive("ADMサイクル");
    fireEvent.keyDown(tab("ADMサイクル"), { key: "Home" });
    expectActive("TOGAFとは");
    fireEvent.keyDown(tab("TOGAFとは"), { key: "End" });
    expectActive("ADMサイクル");
    expect(getByRole("tabpanel", { name: "ADMサイクル" })).toHaveTextContent("ADM の全体像");
  });

  it("ignores unrelated keys", () => {
    // Arrange
    const { getByRole } = render(<TogafGuideShell groups={groups} panels={panels} />);
    const overview = getByRole("tab", { name: "TOGAFとは" });

    // Act
    fireEvent.keyDown(overview, { key: "ArrowRight" });

    // Assert
    expect(overview).toHaveAttribute("aria-selected", "true");
  });
});
