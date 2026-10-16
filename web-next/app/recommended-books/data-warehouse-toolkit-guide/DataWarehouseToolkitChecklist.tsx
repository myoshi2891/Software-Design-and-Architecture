"use client";

import { useState } from "react";

export const CHECKLIST_ITEMS: readonly string[] = [
  "OLTPとOLAPの違いを、自分の言葉で説明できる",
  "KimballとInmonのアーキテクチャの違いを説明できる",
  "4ステップ・ディメンショナルデザインプロセスを、実際の業務プロセスに当てはめて実践できる",
  "「グレインを宣言する」ことの重要性を理解し、自分が扱うデータのグレインを一文で言い表せる",
  "スタースキーマにおけるファクトテーブルとディメンションテーブルの役割の違いを説明できる",
  "サロゲートキーを使う理由を2つ以上挙げられる",
  "ファクトテーブルの3類型（トランザクション／定期スナップショット／累積スナップショット）を区別できる",
  "加算可能・準加算可能・非加算の違いを説明できる",
  "SCD Type 0・1・2・3の違いを、具体例つきで説明できる",
  "コンフォームド・ディメンションとバスマトリクスの役割を説明できる",
  "ETLが「抽出・クレンジング＆コンフォーム・デリバリー・管理」の4工程からなることを理解している",
  "モダンなクラウドDWHの文脈で、Kimball方式に対する主な批判・代替案（OBT、ディメンション・スナップショット、Data Vault）を最低1つずつ説明できる",
];

export default function DataWarehouseToolkitChecklist() {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    () => new Array(CHECKLIST_ITEMS.length).fill(false)
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

  return (
    <div className="prose">
      <div className="checklist-head">
        <p style={{ margin: 0 }}>
          理解度を自己チェックしてみましょう。クリックすると完了扱いになります。
        </p>
        <span className="checklist-counter" id="checklistCounter" role="status">
          {doneCount} / {totalCount} 完了
        </span>
      </div>
      <ul className="checklist" id="checklistItems">
        {CHECKLIST_ITEMS.map((item, index) => {
          const isDone = checkedState[index];
          return (
            <li key={item} className={isDone ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => handleToggle(index)}
                  aria-label={item}
                />
                <span>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
