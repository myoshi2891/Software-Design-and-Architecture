// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NosqlDistilledChecklist, { CHECKLIST_ITEMS } from "./NosqlDistilledChecklist";

describe("NosqlDistilledChecklist", () => {
  it("原本通りの 12 項目が描画される", () => {
    render(<NosqlDistilledChecklist />);
    expect(CHECKLIST_ITEMS).toHaveLength(12);
    for (const item of CHECKLIST_ITEMS) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("初期状態は 0 / 12 完了で、項目ボタンをクリックするとトグルされカウンターが更新される", () => {
    render(<NosqlDistilledChecklist />);
    expect(screen.getByText("0 / 12 完了")).toBeInTheDocument();

    const firstButton = screen.getByRole("button", { name: CHECKLIST_ITEMS[0] });
    fireEvent.click(firstButton);

    expect(screen.getByText("1 / 12 完了")).toBeInTheDocument();

    fireEvent.click(firstButton);
    expect(screen.getByText("0 / 12 完了")).toBeInTheDocument();
  });

  it("各項目は type=button で、aria-pressed が完了状態を反映する", () => {
    render(<NosqlDistilledChecklist />);
    const firstButton = screen.getByRole("button", { name: CHECKLIST_ITEMS[0] });
    expect(firstButton.getAttribute("type")).toBe("button");
    expect(firstButton.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(firstButton);
    expect(firstButton.getAttribute("aria-pressed")).toBe("true");
  });

  it("初期状態では li に done クラスが付かず、ボタンをクリックすると done クラスが付与される", () => {
    const { container } = render(<NosqlDistilledChecklist />);
    const items = container.querySelectorAll(".checklist li");
    expect(items).toHaveLength(12);
    const firstButton = screen.getByRole("button", { name: CHECKLIST_ITEMS[0] });
    expect(items[0].classList.contains("done")).toBe(false);

    fireEvent.click(firstButton);
    expect(items[0].classList.contains("done")).toBe(true);

    fireEvent.click(firstButton);
    expect(items[0].classList.contains("done")).toBe(false);
  });
});
