"use client";

import { IconFlag3 } from "@tabler/icons-react";
import { useState } from "react";

export type ChecklistItem = {
  readonly id: string;
  readonly text: string;
};

type BuildingApplicationsWithAiAgentsChecklistProps = {
  readonly items: readonly ChecklistItem[];
};

export default function BuildingApplicationsWithAiAgentsChecklist({
  items,
}: BuildingApplicationsWithAiAgentsChecklistProps) {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const doneCount = items.filter((item) => !!checkedState[item.id]).length;

  return (
    <div>
      <ul className="checklist" id="checklist">
        {items.map((item) => {
          const isDone = !!checkedState[item.id];
          return (
            <li key={item.id} className={isDone ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => handleToggle(item.id)}
                />
                <span className="checklist-text">{item.text}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="checklist-counter" id="checklistCounter">
        <IconFlag3 size={18} className="ti" /> {doneCount} / {items.length} 完了
      </div>
    </div>
  );
}
