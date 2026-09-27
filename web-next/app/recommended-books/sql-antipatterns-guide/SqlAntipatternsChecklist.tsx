"use client";

import { useState } from "react";

export type ChecklistItem = {
  readonly id: string;
  readonly label: string;
};

export const CHECKLIST_ITEMS: readonly ChecklistItem[] = [
  {
    id: "c1",
    label: "カンマ区切りの値を1つの列に詰め込んでいる列はないか（2章 ジェイウォーク）",
  },
  {
    id: "c2",
    label:
      "親IDだけに頼った木構造で、先祖・子孫の取得クエリが複雑化していないか（3章 ナイーブツリー）",
  },
  {
    id: "c3",
    label:
      "すべてのテーブルに機械的にid列を追加し、複合主キーが自然なテーブルまで壊していないか（4章 IDリクワイアド）",
  },
  {
    id: "c4",
    label:
      "外部キー制約を敬遠し、参照整合性をアプリケーションコード任せにしていないか（5章 キーレスエントリ）",
  },
  {
    id: "c5",
    label: "汎用的な属性テーブル（EAV）で何にでも対応しようとしていないか（6章 EAV）",
  },
  {
    id: "c6",
    label:
      "1つの外部キー列で複数の親テーブルを指そうとしていないか（7章 ポリモーフィック関連）",
  },
  {
    id: "c7",
    label:
      "繰り返し項目のために列を横に増やし続けていないか（8章 マルチカラムアトリビュート）",
  },
  {
    id: "c8",
    label:
      "スケールのためにテーブルや列を年度・カテゴリごとに複製していないか（9章 メタデータトリブル）",
  },
  {
    id: "c9",
    label: "金額をFLOAT型で扱っていないか（10章 ラウンディングエラー）",
  },
  {
    id: "c10",
    label:
      "許容値を列定義やCHECK制約に直接書き込んでいないか（11章 サーティワンフレーバー）",
  },
  {
    id: "c11",
    label:
      "ファイルとDBレコードの整合性戦略を決めずにファイルシステムだけで運用していないか（12章 ファントムファイル）",
  },
  {
    id: "c12",
    label:
      "根拠のないままインデックスを追加・削除していないか（13章 インデックスショットガン）",
  },
  {
    id: "c13",
    label:
      "NULLを普通の値のように比較・演算していないか（14章 フィア・オブ・ジ・アンノウン）",
  },
  {
    id: "c14",
    label:
      "GROUP BYクエリで非集約列を無自覚に選択していないか（15章 アンビギュアスグループ）",
  },
  {
    id: "c15",
    label:
      "ORDER BY RAND()で全行をソートしてランダム抽出していないか（16章 ランダムセレクション）",
  },
  {
    id: "c16",
    label:
      "全文検索をLIKE '%...%'だけで実装していないか（17章 プアマンズ・サーチエンジン）",
  },
  {
    id: "c17",
    label:
      "1つの巨大なクエリで複雑な問題を解決しようとしていないか（18章 スパゲッティクエリ）",
  },
  {
    id: "c18",
    label:
      "SELECT *や列名省略のINSERTを本番コードで使っていないか（19章 インプリシットカラム）",
  },
  {
    id: "c19",
    label:
      "パスワードを平文や復号可能な形で保存していないか（20章 リーダブルパスワード）",
  },
  {
    id: "c20",
    label:
      "SQL文を文字列連結で組み立てている箇所はないか（21章 SQLインジェクション）",
  },
  {
    id: "c21",
    label:
      "欠番になった連番IDを詰め直そうとしていないか（22章 シュードキー・ニートフリーク）",
  },
  {
    id: "c22",
    label:
      "SQL文の戻り値やエラーをチェックせずに握りつぶしていないか（23章 シー・ノー・エビル）",
  },
  {
    id: "c23",
    label:
      "SQLコードだけレビュー・バージョン管理・テストの対象外になっていないか（24章 ディプロマティック・イミュニティ）",
  },
  {
    id: "c24",
    label:
      "ビジネスロジックを安易にストアドプロシージャへ寄せていないか（25章 スタンダード・オペレーティング・プロシージャ）",
  },
  {
    id: "c25",
    label:
      "外部キー定義自体に、参照方向・列順序・データ型不一致などの誤りがないか（26〜27章 外部キーのミニアンチパターン）",
  },
];

export default function SqlAntipatternsChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const doneCount = CHECKLIST_ITEMS.filter((item) => checked[item.id]).length;
  const progressPercent = Math.round((doneCount / CHECKLIST_ITEMS.length) * 100);

  return (
    <div>
      <div className="checklist-progress">
        <span id="checklistCounter">
          {doneCount} / {CHECKLIST_ITEMS.length} 完了
        </span>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            id="checklistFill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <ul className="checklist" id="checklistItems">
        {CHECKLIST_ITEMS.map((item) => {
          const isDone = !!checked[item.id];
          return (
            <li key={item.id} className={isDone ? "done" : ""}>
              <input
                type="checkbox"
                id={item.id}
                checked={isDone}
                onChange={() => toggle(item.id)}
              />
              <label htmlFor={item.id}>{item.label}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
