"use client";

import { useState } from "react";

export const CHECKLIST_ITEMS: readonly string[] = [
  "リレーショナルデータベースの利点を自分の言葉で説明できる",
  "Nullが「空文字列」や「ゼロ」と異なる概念であることを説明できる",
  "1対1・1対多・多対多・自己参照の4つのリレーションシップを具体例とともに説明できる",
  "ミッションステートメントとミッションオブジェクティブの違いを説明できる",
  "「理想的フィールド」「理想的テーブル」の基準に沿ってテーブルを見直せる",
  "候補キー・プライマリキー・代替キーの違いを説明できる",
  "1対多・多対多それぞれのリレーションシップを外部キーでどう表現するか説明できる",
  "カスケード削除・削除の制限・Null設定という3つの削除規則の違いを説明できる",
  "フィールド固有のビジネスルールとリレーションシップ固有のビジネスルールを区別できる",
  "データビュー・集計ビュー・検証ビューの違いを説明できる",
  "本書の設計手法と、正規化理論との関係を自分の言葉で説明できる",
];

export default function DatabaseDesignChecklist() {
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
    <div className="checklist-box">
      <div className="checklist-progress">
        <span id="checklistCounter" role="status" aria-live="polite" aria-atomic="true">
          {doneCount} / {totalCount} 完了
        </span>
        <div className="checklist-bar">
          <div
            className="checklist-bar-fill"
            id="checklist-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <div className="checklist-items" id="checklistItems">
        {CHECKLIST_ITEMS.map((item, index) => {
          const isDone = checkedState[index];
          const id = `chk-${index}`;
          return (
            <div key={item} className={`check-item ${isDone ? "done" : ""}`}>
              <input
                type="checkbox"
                id={id}
                checked={isDone}
                onChange={() => handleToggle(index)}
                aria-label={item}
              />
              <label htmlFor={id}>{item}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
