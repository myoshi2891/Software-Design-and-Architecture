import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArchitectingGenAiChecklist, { type ChecklistItem } from "./ArchitectingGenAiChecklist";

const testItems: readonly ChecklistItem[] = [
  { id: "chk-1", text: "プロトタイプ着手前に仮説を明文化した" },
  { id: "chk-2", text: "評価手法をタスクの性質に応じて選定した" },
  { id: "chk-3", text: "プロンプトをバージョン管理対象にした" },
];

describe("ArchitectingGenAiChecklist", () => {
  it("初期状態で 0 / 3 完了と表示される", () => {
    render(<ArchitectingGenAiChecklist items={testItems} />);
    expect(screen.getByText("0 / 3 完了")).toBeInTheDocument();
  });

  it("チェックボックスをクリックすると完了カウンターが更新される", () => {
    render(<ArchitectingGenAiChecklist items={testItems} />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);

    fireEvent.click(checkboxes[0]);
    expect(screen.getByText("1 / 3 完了")).toBeInTheDocument();

    fireEvent.click(checkboxes[1]);
    expect(screen.getByText("2 / 3 完了")).toBeInTheDocument();

    fireEvent.click(checkboxes[0]);
    expect(screen.getByText("1 / 3 完了")).toBeInTheDocument();
  });
});
