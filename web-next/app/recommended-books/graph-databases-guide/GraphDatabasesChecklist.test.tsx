// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GraphDatabasesChecklist, { CHECKLIST_ITEMS } from "./GraphDatabasesChecklist";

describe("GraphDatabasesChecklist", () => {
  it("原本通りの 11 項目が描画される", () => {
    render(<GraphDatabasesChecklist />);
    expect(CHECKLIST_ITEMS).toHaveLength(11);
    for (const item of CHECKLIST_ITEMS) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("初期状態は 0 / 11 完了で、項目をクリックするとトグルされ進捗バーが更新される", () => {
    const { container } = render(<GraphDatabasesChecklist />);
    expect(screen.getByText("0 / 11 完了")).toBeInTheDocument();
    const fill = container.querySelector("#cl-bar") as HTMLElement;
    expect(fill).not.toBeNull();
    expect(fill.style.width).toBe("0%");

    const firstItem = screen.getByText(CHECKLIST_ITEMS[0]);
    fireEvent.click(firstItem);

    expect(screen.getByText("1 / 11 完了")).toBeInTheDocument();
    expect(fill.style.width).toBe(`${(1 / 11) * 100}%`);

    fireEvent.click(firstItem);
    expect(screen.getByText("0 / 11 完了")).toBeInTheDocument();
    expect(fill.style.width).toBe("0%");
  });
});
