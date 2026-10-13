import type { TogafNavGroup } from "./TogafGuideShell";
export const NAV_GROUPS: TogafNavGroup[] = [
  {
    label: "はじめに",
    items: [
      {
        id: "overview",
        label: "TOGAFとは",
        icon: "building-arch",
      },
      {
        id: "exam",
        label: "試験概要",
        icon: "certificate",
      },
    ],
  },
  {
    label: "コア概念",
    items: [
      {
        id: "adm",
        label: "ADM サイクル",
        icon: "refresh",
      },
      {
        id: "phases",
        label: "各フェーズ詳解",
        icon: "list-details",
      },
      {
        id: "bdat",
        label: "BDATドメイン",
        icon: "layout-grid",
      },
      {
        id: "artifacts",
        label: "成果物・BB",
        icon: "file-description",
      },
    ],
  },
  {
    label: "応用",
    items: [
      {
        id: "repository",
        label: "アーキテクチャリポジトリ",
        icon: "database",
      },
      {
        id: "stakeholder",
        label: "ステークホルダー",
        icon: "users",
      },
      {
        id: "governance",
        label: "ガバナンス",
        icon: "shield-check",
      },
    ],
  },
  {
    label: "試験対策",
    items: [
      {
        id: "strategy",
        label: "合格戦略",
        icon: "target",
      },
      {
        id: "roadmap",
        label: "学習ロードマップ",
        icon: "map",
      },
      {
        id: "references",
        label: "参考文献・URL",
        icon: "link",
      },
    ],
  },
];
