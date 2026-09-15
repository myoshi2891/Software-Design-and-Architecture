import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LaunchChecklist, { type ChecklistItem } from "./LaunchChecklist";

const TEST_ITEMS: ChecklistItem[] = [
  { id: "chk1", title: "評価データセット", desc: "ドメイン固有のテストケースを用意しているか" },
  { id: "chk2", title: "フォールバック", desc: "API障害時の振る舞いを定義しているか" },
  { id: "chk3", title: "ガードレール", desc: "入力・出力両方のガードレールを実装しているか" },
  { id: "chk4", title: "コスト監視", desc: "トークン消費とコストを可視化しているか" },
  { id: "chk5", title: "ロールバック計画", desc: "バージョン切り戻しの仕組みがあるか" },
  { id: "chk6", title: "ログとトレース", desc: "トレースを記録しているか" },
  { id: "chk7", title: "人間参加型の設計", desc: "高リスク操作に承認ステップがあるか" },
];

describe("LaunchChecklist", () => {
  it("7個のチェックボックスと初期カウンターを描画する", () => {
    const { container } = render(<LaunchChecklist items={TEST_ITEMS} />);
    const checkboxes = container.querySelectorAll("input[type=checkbox]");
    expect(checkboxes).toHaveLength(7);

    const counter = container.querySelector("#checklistCounter");
    expect(counter?.textContent).toBe("0 / 7 完了");
  });

  it("チェックボックスを操作するとカウンターと親 li の done クラスが更新される", () => {
    const { container } = render(<LaunchChecklist items={TEST_ITEMS} />);
    const checkboxes = container.querySelectorAll("input[type=checkbox]");
    const counter = container.querySelector("#checklistCounter");

    const firstBox = checkboxes[0] as HTMLInputElement;
    fireEvent.click(firstBox);
    expect(firstBox.checked).toBe(true);
    expect(counter?.textContent).toBe("1 / 7 完了");
    expect(firstBox.closest("li")?.classList.contains("done")).toBe(true);

    const secondBox = checkboxes[1] as HTMLInputElement;
    fireEvent.click(secondBox);
    expect(counter?.textContent).toBe("2 / 7 完了");

    fireEvent.click(firstBox);
    expect(counter?.textContent).toBe("1 / 7 完了");
    expect(firstBox.closest("li")?.classList.contains("done")).toBe(false);
  });
});
