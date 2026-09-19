"use client";

import { useState } from "react";

export type ChecklistItem = {
  readonly id: string;
  readonly text: string;
};

type GenerativeAiDesignPatternsChecklistProps = {
  readonly items: readonly ChecklistItem[];
};

export default function GenerativeAiDesignPatternsChecklist({
  items,
}: GenerativeAiDesignPatternsChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const doneCount = items.filter((item) => checked[item.id]).length;

  return (
    <div className="checklist-card">
      <div className="checklist-progress" id="checklist-counter">
        {doneCount} / {items.length} 完了
      </div>
      <ul className="task-list">
        {items.map((item) => {
          const isDone = !!checked[item.id];
          return (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggle(item.id)}
                />
                {item.text}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
