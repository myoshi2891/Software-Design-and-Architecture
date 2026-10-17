"use client";

import { IconFlag2 } from "@tabler/icons-react";
import { useState } from "react";

export const CHECKLIST_ITEMS: readonly string[] = [
  "グラフの基本要素(ノード・リレーションシップ・プロパティ・ラベル)を説明できる",
  "リレーショナルDB・NoSQL集約指向DB・グラフDBの違いを説明できる",
  "ラベル付きプロパティグラフモデルで簡単なドメインをモデリングできる",
  "Cypherの基本文法(MATCH / WHERE / RETURN / CREATE)を読み書きできる",
  "クエリ駆動のデータモデリング(質問からモデルを作る)を説明できる",
  "よくあるモデリングのアンチパターンを2つ以上挙げられる",
  "インデックスフリー隣接の意味と、なぜ性能上有利なのかを説明できる",
  "グラフDBが向いているユースケースを5つ以上挙げられる",
  "BFS・DFS・Dijkstra法・A*アルゴリズムの違いと用途を説明できる",
  "三者閉包やローカルブリッジなど社会ネットワーク分析の基本概念を説明できる",
  "GQL標準化とGraphRAGなど、2024年以降の主要な動向を把握している",
];

export default function GraphDatabasesChecklist() {
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
    <div className="checklist-container">
      <div className="checklist-progress">
        <IconFlag2 style={{ color: "var(--forest)", flex: "0 0 auto" }} size={20} />
        <div className="bar">
          <div className="bar-fill" id="cl-bar" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="count" id="cl-count">
          {doneCount} / {totalCount} 完了
        </div>
      </div>
      <ul className="checklist" id="checklist-list">
        {CHECKLIST_ITEMS.map((item, index) => {
          const isDone = checkedState[index];
          return (
            <li key={item} className={isDone ? "done" : ""}>
              <label>
                <input type="checkbox" checked={isDone} onChange={() => handleToggle(index)} />
                <span className="txt">{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
