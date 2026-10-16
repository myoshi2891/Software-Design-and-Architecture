// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RefactoringDatabasesChecklist, {
  CHECKLIST_ITEMS,
} from "./RefactoringDatabasesChecklist";

describe("RefactoringDatabasesChecklist", () => {
  it("8 個のチェック項目を正しく描画する", () => {
    render(<RefactoringDatabasesChecklist />);
    expect(CHECKLIST_ITEMS).toHaveLength(8);
    for (const item of CHECKLIST_ITEMS) {
      expect(screen.getByText(item)).toBeDefined();
    }
  });

  it("チェックボックスをクリックすると進捗カウントが更新される", () => {
    const { container } = render(<RefactoringDatabasesChecklist />);
    const label = container.querySelector("#checklistLabel");
    expect(label?.textContent).toBe("0 / 8 完了");

    const checkboxes = container.querySelectorAll("input[type='checkbox']");
    expect(checkboxes).toHaveLength(8);

    fireEvent.click(checkboxes[0]);
    expect(label?.textContent).toBe("1 / 8 完了");

    fireEvent.click(checkboxes[1]);
    expect(label?.textContent).toBe("2 / 8 完了");

    fireEvent.click(checkboxes[0]);
    expect(label?.textContent).toBe("1 / 8 完了");
  });
});
