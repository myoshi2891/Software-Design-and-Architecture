"use client";

import { useState } from "react";

export type ChecklistItem = {
  readonly id: string;
  readonly text: string;
};

export const CHECKLIST_ITEMS: readonly ChecklistItem[] = [
  { id: "chk-1", text: "まず単一エージェント＋ツール追加で対応できないかを検討したか" },
  {
    id: "chk-2",
    text: "マルチエージェント化によって得られる価値が、約15倍というトークンコスト増に見合うかを見積もったか",
  },
  {
    id: "chk-3",
    text: "各エージェントの分離境界（何を知らせ、何を知らせないか）を明示的に設計したか",
  },
  { id: "chk-4", text: "「書き込み」を行うエージェントを単一（Single-Writer）に絞ったか" },
  {
    id: "chk-5",
    text: "各サブエージェントへの委任指示に「目的」「出力フォーマット」「使うツール」「タスクの境界」を明記したか",
  },
  { id: "chk-6", text: "コンテキストが肥大化した場合の圧縮・ノートテイキング戦略を用意したか" },
  {
    id: "chk-7",
    text: "エージェント間通信にMCP／A2Aなどの標準プロトコルを活用できないか検討したか",
  },
  { id: "chk-8", text: "長期記憶・共有メモリ・チェックポイントの保存先と保持期間を設計したか" },
  { id: "chk-9", text: "各ツールに最小権限を割り当て、高リスク操作には人間承認ゲートを設けたか" },
  {
    id: "chk-10",
    text: "Lethal Trifecta（プライベートデータ・信頼できない入力・外部通信）が同一セッションに同時に揃っていないかを監査したか",
  },
  { id: "chk-11", text: "OWASP Top 10 for Agentic Applicationsに照らしたリスク評価を行ったか" },
  {
    id: "chk-12",
    text: "OpenTelemetry GenAI Semantic Conventions等でトレース・評価結果を計装したか",
  },
  {
    id: "chk-13",
    text: "評価駆動開発のサイクル（失敗パターンの収集→評価基準の見直し）を回せる体制があるか",
  },
];

export default function MultiAgentChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const doneCount = CHECKLIST_ITEMS.filter((item) => checked[item.id]).length;

  return (
    <div className="checklist-card">
      <div className="checklist-header">
        <span className="checklist-header-title">設計チェックリスト</span>
        <span className="checklist-counter">
          {doneCount} / {CHECKLIST_ITEMS.length} 完了
        </span>
      </div>
      <ul className="checklist">
        {CHECKLIST_ITEMS.map((item) => {
          const isDone = !!checked[item.id];
          return (
            <li key={item.id}>
              <label>
                <input type="checkbox" checked={isDone} onChange={() => toggle(item.id)} />
                <span>{item.text}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
