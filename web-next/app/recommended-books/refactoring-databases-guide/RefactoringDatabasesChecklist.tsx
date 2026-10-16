"use client";

import { IconTargetArrow } from "@tabler/icons-react";
import { useState } from "react";

export const CHECKLIST_ITEMS: readonly string[] = [
  "データベースリファクタリングが「スキーマ変更・データ移行・アクセスコード変更」の3つを同時に伴う理由を説明できる",
  "データベースの臭いを3つ以上挙げ、それぞれどのリファクタリングで対処できそうか説明できる",
  "「破壊的な変更」と「非破壊的な変更」の違いを説明できる",
  "移行期間(Expand/Contract パターン)がなぜ必要か、Rename Tableの例で説明できる",
  "構造・データ品質・参照整合性・アーキテクチャ・メソッドの5分類それぞれの目的を、自分の言葉で説明できる",
  "Soft DeleteとHard Deleteをどう使い分けるか判断できる",
  "単一アプリケーションDBと共有データベースで、リファクタリングの進め方がどう変わるか説明できる",
  "本書の考え方が、Flyway・LiquibaseなどのCI/CDツールとどうつながっているか説明できる",
];

export default function RefactoringDatabasesChecklist() {
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
    <div className="checklist-wrap">
      <div className="checklist-progress">
        <IconTargetArrow size={20} />
        <div className="progress-track">
          <div
            className="progress-fill"
            id="checklistFill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span id="checklistLabel" role="status" aria-live="polite">
          {doneCount} / {totalCount} 完了
        </span>
      </div>
      {CHECKLIST_ITEMS.map((item, index) => {
        const isChecked = checkedState[index];
        const id = `chk${index + 1}`;
        return (
          <div key={item} className={`check-item ${isChecked ? "done" : ""}`}>
            <input
              type="checkbox"
              id={id}
              checked={isChecked}
              onChange={() => handleToggle(index)}
            />
            <label htmlFor={id}>{item}</label>
          </div>
        );
      })}
    </div>
  );
}
