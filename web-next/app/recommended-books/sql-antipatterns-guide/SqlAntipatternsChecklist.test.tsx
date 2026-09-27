// @vitest-environment jsdom
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SqlAntipatternsChecklist, { CHECKLIST_ITEMS } from "./SqlAntipatternsChecklist";

describe("SqlAntipatternsChecklist", () => {
  it("25個のチェック項目を描画する", () => {
    const { container } = render(<SqlAntipatternsChecklist />);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(25);
    expect(CHECKLIST_ITEMS).toHaveLength(25);
  });

  it("チェックボックス操作でカウンターとプログレスバーが更新される", () => {
    const { container } = render(<SqlAntipatternsChecklist />);
    const counter = container.querySelector("#checklistCounter");
    const fill = container.querySelector("#checklistFill");
    const checkboxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

    expect(counter?.textContent).toContain("0 / 25 完了");
    expect(fill?.getAttribute("style")).toContain("width: 0%");

    const firstCheckbox = checkboxes[0];
    if (firstCheckbox) fireEvent.click(firstCheckbox);

    expect(counter?.textContent).toContain("1 / 25 完了");
    expect(fill?.getAttribute("style")).toContain("width: 4%");
  });
});
