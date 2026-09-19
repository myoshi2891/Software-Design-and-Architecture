import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BuildingApplicationsWithAiAgentsChecklist, {
  type ChecklistItem,
} from "./BuildingApplicationsWithAiAgentsChecklist";

const TEST_ITEMS: readonly ChecklistItem[] = [
  { id: "chk1", text: "ワークフローとエージェントを適切に使い分け、必要な分だけ複雑さを足す" },
  { id: "chk2", text: "ツール・メモリ・オーケストレーションという基本コンポーネントを丁寧に設計する" },
  { id: "chk3", text: "MCPやA2Aのような標準プロトコルを活用し、相互運用性を確保する" },
  { id: "chk4", text: "評価と監視を開発の初期段階から組み込み、改善のループを回し続ける" },
  { id: "chk5", text: "Lethal TrifectaやMAESTROのような枠組みでセキュリティリスクを体系的に洗い出す" },
  { id: "chk6", text: "人間の説明責任を前提に、自律性のレベルを段階的に調整する" },
];

describe("BuildingApplicationsWithAiAgentsChecklist", () => {
  it("6項目のチェックリストとカウンタを描画する", () => {
    const { container } = render(
      <BuildingApplicationsWithAiAgentsChecklist items={TEST_ITEMS} />
    );
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(6);

    const counter = container.querySelector("#checklistCounter");
    expect(counter?.textContent).toContain("0 / 6 完了");
  });

  it("チェックボックスをクリックすると完了状態とカウンタが更新される", () => {
    const { container } = render(
      <BuildingApplicationsWithAiAgentsChecklist items={TEST_ITEMS} />
    );
    const checkboxes = container.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    const firstBox = checkboxes[0];
    const firstLi = firstBox?.closest("li");

    expect(firstLi?.classList.contains("done")).toBe(false);

    fireEvent.click(firstBox!);
    expect(firstBox?.checked).toBe(true);
    expect(firstLi?.classList.contains("done")).toBe(true);

    const counter = container.querySelector("#checklistCounter");
    expect(counter?.textContent).toContain("1 / 6 完了");

    fireEvent.click(firstBox!);
    expect(firstBox?.checked).toBe(false);
    expect(firstLi?.classList.contains("done")).toBe(false);
    expect(counter?.textContent).toContain("0 / 6 完了");
  });
});
