"use client";

import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export const CHECKLIST_ITEMS: readonly string[] = [
  "自分のサービスにとっての「SLO」を、可用性・レイテンシ・エラー率の観点で言語化できる",
  "EXPLAINの出力を読み、フルスキャンが起きているかどうかを判断できる",
  "複合インデックスの列順を、等価条件・範囲条件・ソートの観点で設計できる",
  "InnoDBバッファプールのサイジングを、物理メモリと接続数から見積もれる",
  "論理バックアップと物理バックアップの使い分けを説明できる",
  "レプリケーション遅延の主な原因を3つ以上挙げられる",
  "読み取りスケーリングと書き込みシャーディングのどちらを先に検討すべきか説明できる",
  "自社のコンプライアンス要件（GDPR、PCI DSSなど）とデータベース設計の関係を意識できる",
  "利用中のMySQLバージョンの公式リリースノートを確認する習慣がある",
];

export default function HighPerformanceMysqlChecklist() {
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
    <div>
      <div className="checklist-progress">
        <span className="count" id="checklistCount">
          {doneCount} / {totalCount} 完了
        </span>
        <div className="bar">
          <div className="bar-fill" id="checklistBar" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
      <ul className="checklist" id="checklistItems">
        {CHECKLIST_ITEMS.map((item, index) => {
          const isDone = checkedState[index];
          return (
            <li key={item} className={isDone ? "done" : ""}>
              <label>
                <input type="checkbox" checked={isDone} onChange={() => handleToggle(index)} />
                <span className="box" aria-hidden="true">
                  {isDone && <IconCheck size={14} />}
                </span>
                <span className="label">{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
