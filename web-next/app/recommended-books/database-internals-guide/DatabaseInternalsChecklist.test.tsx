// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DatabaseInternalsChecklist, { CHECKLIST_ITEMS } from "./DatabaseInternalsChecklist";

describe("DatabaseInternalsChecklist", () => {
  it("原本通りの 14 項目が描画される", () => {
    render(<DatabaseInternalsChecklist />);
    expect(CHECKLIST_ITEMS).toHaveLength(14);
    for (const item of CHECKLIST_ITEMS) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("初期状態は 0 / 14 完了で、項目をクリックするとトグルされ進捗バーが更新される", () => {
    const { container } = render(<DatabaseInternalsChecklist />);
    expect(screen.getByText("0 / 14 完了")).toBeInTheDocument();
    const fill = container.querySelector(".checklist-bar-fill") as HTMLElement;
    expect(fill).not.toBeNull();
    expect(fill.style.width).toBe("0%");

    const firstItem = screen.getByText(CHECKLIST_ITEMS[0]);
    fireEvent.click(firstItem);

    expect(screen.getByText("1 / 14 完了")).toBeInTheDocument();
    expect(fill.style.width).toBe(`${(1 / 14) * 100}%`);

    fireEvent.click(firstItem);
    expect(screen.getByText("0 / 14 完了")).toBeInTheDocument();
    expect(fill.style.width).toBe("0%");
  });
});
