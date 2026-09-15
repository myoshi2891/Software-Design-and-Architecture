"use client";

import { useState } from "react";

export type ChecklistItem = {
  readonly id: string;
  readonly title: string;
  readonly desc: string;
};

type LaunchChecklistProps = {
  readonly items: readonly ChecklistItem[];
};

export default function LaunchChecklist({ items }: LaunchChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const doneCount = items.filter((item) => checked[item.id]).length;

  return (
    <div>
      <div className="checklist-counter" id="checklistCounter">
        {doneCount} / {items.length} 完了
      </div>
      <ul className="checklist" id="launchChecklist">
        {items.map((item) => {
          const isDone = !!checked[item.id];
          return (
            <li key={item.id} className={isDone ? "done" : ""}>
              <input
                type="checkbox"
                id={item.id}
                checked={isDone}
                onChange={() => toggle(item.id)}
              />
              <label htmlFor={item.id}>
                <span className="chk-title">{item.title}</span>
                <span className="chk-desc">{item.desc}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
