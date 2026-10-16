"use client";

import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export const CHECKLIST_ITEMS: readonly string[] = [
  "インピーダンス・ミスマッチとクラスタへの対応という、NoSQLが生まれた2つの背景を説明できる",
  "集約（Aggregate）という考え方と、それがクラスタ分散の単位になる理由、およびデータストアの原子性単位が集約全体を覆う場合に限ってACID操作の境界になる理由を説明できる",
  "キーバリュー・ドキュメント・カラムファミリー・グラフという4つのデータモデルの違いと、それぞれの向き不向きを説明できる",
  "シャーディングとレプリケーション（マスター・スレーブ／ピアツーピア）の違いを説明できる",
  "CAP定理の内容と、その単純化しすぎな面について説明できる",
  "結果整合性とクォーラム（W・R・N）の関係を説明できる",
  "バージョンスタンプが楽観的並行性制御にどう使われるかを説明できる",
  "Map-ReduceのMapタスクとReduceタスクの役割の違いを説明できる",
  "スキーマレスであることが「スキーマ不要」を意味しない理由を説明できる",
  "ポリグロット・パーシステンスの考え方と、その運用上のトレードオフを説明できる",
  "自分のプロジェクトのデータに対して、プログラマの生産性とデータアクセス性能の2軸で技術選定を考えられる",
  "本書刊行後にRiakやCAP定理の理解がどう変化したか、大まかに説明できる",
];

export default function NosqlDistilledChecklist() {
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

  return (
    <div>
      <div className="checklist-counter" id="checklistCounter">
        {doneCount} / {totalCount} 完了
      </div>
      <ul className="checklist">
        {CHECKLIST_ITEMS.map((item, index) => {
          const isDone = checkedState[index];
          return (
            <li key={item} className={isDone ? "done" : ""}>
              <button type="button" aria-pressed={isDone} onClick={() => handleToggle(index)}>
                <span className="box" aria-hidden="true">
                  <IconCheck size={14} />
                </span>
                <span className="txt">{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
