"use client";

import { useState } from "react";

export type ChecklistItem = {
  readonly id: string;
  readonly text: string;
};

export const CHECKLIST_ITEMS: readonly ChecklistItem[] = [
  {
    id: "chk-1",
    text: "4つの試験ドメインと出題比率（第1.3節）を暗記し、学習時間を比率に合わせて配分した",
  },
  {
    id: "chk-2",
    text: "5つの失敗モードとFeasibility Filtersの対応関係（第3章）を、図を見ずに説明できる",
  },
  {
    id: "chk-3",
    text: "Value Maximizer Playbookの4段階（Audit/Activate/Optimize/Centralize）を、それぞれの目的とともに順番通りに説明できる（第4.1節）",
  },
  {
    id: "chk-4",
    text: "RAGとFine-Tuningのコスト構造の違いを、経営層向けの言葉で説明できる（第4.2節）",
  },
  {
    id: "chk-5",
    text: "AI-Native Solution Lifecycleの4フェーズ（Sense/Discover/Design/Deliver）と、各フェーズの成果物を対応づけて説明できる（第5.1節）",
  },
  {
    id: "chk-6",
    text: "Solution CharterとValue Blueprintの役割の違いを説明できる（第5.5節）",
  },
  {
    id: "chk-7",
    text: "AI-Powered Story Amplifierの4段階構成（課題／介入／結果／提案）を使って、自分の職場の事例を1つストーリー化してみる（第6.1節）",
  },
  {
    id: "chk-8",
    text: "5つの責任領域（第2.4節）それぞれについて、自分の現在の役割でどう実践できるか具体例を1つずつ挙げられる",
  },
  {
    id: "chk-9",
    text: "公式の練習問題（Practice Test）を、時間を計って本番同様の条件で少なくとも1回受験した",
  },
];

export default function AiNativeChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const doneCount = CHECKLIST_ITEMS.filter((item) => checked[item.id]).length;

  return (
    <div className="checklist-container">
      <div className="checklist-status-bar">
        <span className="checklist-status-text">進捗状況: {doneCount} / {CHECKLIST_ITEMS.length} 完了</span>
      </div>
      <ul className="checklist">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = !!checked[item.id];
          return (
            <li key={item.id} className={isChecked ? "checked" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                />
                <span>{item.text}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
