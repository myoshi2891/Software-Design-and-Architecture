// @vitest-environment jsdom
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DataWarehouseToolkitChecklist, { CHECKLIST_ITEMS } from "./DataWarehouseToolkitChecklist";

describe("DataWarehouseToolkitChecklist", () => {
  it("12個のチェック項目を描画する", () => {
    const { container } = render(<DataWarehouseToolkitChecklist />);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(12);
    expect(CHECKLIST_ITEMS).toHaveLength(12);
  });

  it("チェックボックス操作でカウンターと done クラスが更新される", () => {
    const { container } = render(<DataWarehouseToolkitChecklist />);
    const counter = container.querySelector("#checklistCounter");
    const checkboxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    const listItems = container.querySelectorAll("li");

    expect(counter?.textContent).toContain("0 / 12 完了");
    expect(listItems[0]?.classList.contains("done")).toBe(false);

    const firstCheckbox = checkboxes[0];
    if (firstCheckbox) fireEvent.click(firstCheckbox);

    expect(counter?.textContent).toContain("1 / 12 完了");
    expect(listItems[0]?.classList.contains("done")).toBe(true);
  });

  it("完了件数カウンターが role=status でスクリーンリーダーに通知される", () => {
    const { container } = render(<DataWarehouseToolkitChecklist />);
    const counter = container.querySelector("#checklistCounter");
    expect(counter?.getAttribute("role")).toBe("status");
  });
});
