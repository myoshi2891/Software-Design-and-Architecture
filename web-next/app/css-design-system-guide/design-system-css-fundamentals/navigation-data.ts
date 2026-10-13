import type { NavGroup } from "./Navigation";
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "第1章",
    items: [
      {
        id: "s1",
        num: "1",
        label: "デザインシステムとは",
        sub: false,
      },
      {
        id: "s1-1",
        num: "1.1",
        label: "定義と目的",
        sub: true,
      },
      {
        id: "s1-2",
        num: "1.2",
        label: "なぜ必要か",
        sub: true,
      },
      {
        id: "s1-3",
        num: "1.3",
        label: "構成要素",
        sub: true,
      },
      {
        id: "s1-4",
        num: "1.4",
        label: "代表的な事例",
        sub: true,
      },
      {
        id: "s1-5",
        num: "1.5",
        label: "構築ステップ",
        sub: true,
      },
      {
        id: "s1-6",
        num: "1.6",
        label: "ベストプラクティス",
        sub: true,
      },
    ],
  },
  {
    label: "第2章",
    items: [
      {
        id: "s2",
        num: "2",
        label: "CSS設計の基礎原則",
        sub: false,
      },
      {
        id: "s2-1",
        num: "2.1",
        label: "カスケードと詳細度",
        sub: true,
      },
      {
        id: "s2-2",
        num: "2.2",
        label: "主要CSS設計手法",
        sub: true,
      },
      {
        id: "s2-3",
        num: "2.3",
        label: "CSS変数",
        sub: true,
      },
      {
        id: "s2-4",
        num: "2.4",
        label: "レイアウト設計",
        sub: true,
      },
      {
        id: "s2-5",
        num: "2.5",
        label: "レスポンシブデザイン",
        sub: true,
      },
      {
        id: "s2-6",
        num: "2.6",
        label: "ベストプラクティス",
        sub: true,
      },
    ],
  },
  {
    label: "付録",
    items: [
      {
        id: "s3",
        num: "3",
        label: "まとめと参考リソース",
        sub: false,
      },
    ],
  },
];
