// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HighPerformanceMysqlChecklist, { CHECKLIST_ITEMS } from "./HighPerformanceMysqlChecklist";

describe("HighPerformanceMysqlChecklist", () => {
  it("原本通りの 9 項目が描画される", () => {
    render(<HighPerformanceMysqlChecklist />);
    expect(CHECKLIST_ITEMS).toHaveLength(9);
    for (const item of CHECKLIST_ITEMS) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("初期状態は 0 / 9 完了で、項目をクリックするとトグルされ進捗バーが更新される", () => {
    const { container } = render(<HighPerformanceMysqlChecklist />);
    expect(screen.getByText("0 / 9 完了")).toBeInTheDocument();
    const fill = container.querySelector("#checklistBar") as HTMLElement;
    expect(fill).not.toBeNull();
    expect(fill.style.width).toBe("0%");

    const firstItem = screen.getByText(CHECKLIST_ITEMS[0]);
    fireEvent.click(firstItem);

    expect(screen.getByText("1 / 9 完了")).toBeInTheDocument();
    expect(fill.style.width).toBe(`${(1 / 9) * 100}%`);

    fireEvent.click(firstItem);
    expect(screen.getByText("0 / 9 完了")).toBeInTheDocument();
    expect(fill.style.width).toBe("0%");
  });
});
