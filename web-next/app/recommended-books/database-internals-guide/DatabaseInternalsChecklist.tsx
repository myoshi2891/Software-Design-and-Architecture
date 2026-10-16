"use client";

import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export const CHECKLIST_ITEMS: readonly string[] = [
  "DBMSのアーキテクチャを層構造として説明できる",
  "B-Treeがなぜディスクベースのインデックスに向いているか説明できる",
  "スロットページの構造とその利点を説明できる",
  "WALとARIESリカバリの3フェーズを説明できる",
  "悲観的・楽観的・MVCCの違いを説明できる",
  "LSM-TreeとB-Treeのトレードオフを説明できる",
  "Two Generals ProblemとFLP不可能性の主張の違いを説明できる",
  "Φ Accrual障害検出器が固定タイムアウト方式より優れている理由を説明できる",
  "CAP定理のConsistencyとAvailabilityの厳密な定義を説明できる",
  "線形化可能性から結果整合性までの一貫性モデルの強弱を説明できる",
  "2PCがブロッキングする状況とその弱点を説明できる",
  "SpannerのTrueTimeとcommit-waitの役割を説明できる",
  "コンセンサスのValidity・Agreement・Terminationの3性質を説明できる",
  "RaftがPaxosに対して重視した設計目標を説明できる",
];

export default function DatabaseInternalsChecklist() {
  const [checkedState, setCheckedState] = useState<boolean[]>(() =>
    new Array(CHECKLIST_ITEMS.length).fill(false)
  );

  const handleToggle = (index: number) => {
    setCheckedState((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const doneCount = checkedState.filter(Boolean).length;
  const totalCount = CHECKLIST_ITEMS.length;
  const progressPercent = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  return (
    <div className="checklist-panel">
      <div className="checklist-progress">
        <div className="checklist-bar">
          <div className="checklist-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="checklist-count" role="status" aria-live="polite">
          {doneCount} / {totalCount} 完了
        </div>
      </div>
      <ul className="checklist">
        {CHECKLIST_ITEMS.map((item, index) => {
          const isDone = checkedState[index];
          return (
            <li key={item}>
              <button
                type="button"
                className={`check-item ${isDone ? "done" : ""}`}
                onClick={() => handleToggle(index)}
                style={{
                  width: "100%",
                  background: "transparent",
                  font: "inherit",
                  textAlign: "left",
                }}
              >
                <span className="check-box" aria-hidden="true">
                  <IconCheck size={14} className="check-icon" />
                </span>
                <span className="check-label">{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
