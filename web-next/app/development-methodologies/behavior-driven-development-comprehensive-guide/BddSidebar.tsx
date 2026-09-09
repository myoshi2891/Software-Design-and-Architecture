"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export type NavItem = {
  id: string;
  num: string;
  label: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "基礎概念",
    items: [
      { id: "s1", num: "01", label: "BDDとは何か" },
      { id: "s2", num: "02", label: "Given-When-Then" },
      { id: "s3", num: "03", label: "Gherkin記法" },
      { id: "s4", num: "04", label: "BDDの開発フロー" },
    ],
  },
  {
    title: "ツール & 実装",
    items: [
      { id: "s5", num: "05", label: "ツールチェーン選定" },
      { id: "s6", num: "06", label: "Cucumber実装" },
      { id: "s7", num: "07", label: "pytest-bdd実装" },
      { id: "s8", num: "08", label: "ステップ定義" },
      { id: "s9", num: "09", label: "フィクスチャ管理" },
    ],
  },
  {
    title: "高度な実践",
    items: [
      { id: "s10", num: "10", label: "BDD×TDD二重ループ" },
      { id: "s11", num: "11", label: "ATDD" },
      { id: "s12", num: "12", label: "APIテスト" },
      { id: "s13", num: "13", label: "UIテスト" },
    ],
  },
  {
    title: "品質 & 運用",
    items: [
      { id: "s14", num: "14", label: "シナリオ設計" },
      { id: "s15", num: "15", label: "CI/CDパイプライン" },
      { id: "s16", num: "16", label: "実践：EC事例" },
      { id: "s17", num: "17", label: "ベストプラクティス" },
      { id: "s18", num: "18", label: "アンチパターン" },
      { id: "s19", num: "19", label: "参考文献" },
    ],
  },
];

type Props = {
  groups?: NavGroup[];
};

/**
 * BDD包括ガイドの固定サイドバーおよび進捗バーコンポーネント。
 */
export default function BddSidebar({ groups = NAV_GROUPS }: Props) {
  const progressRef = useScrollProgress();
  const activeId = useScrollSpy("section.sec", groups[0]?.items[0]?.id ?? "s1");

  return (
    <>
      <div id="pb" ref={progressRef} style={{ transformOrigin: "0 50%" }} />
      <aside id="sb">
        <div className="sb-head">
          <div className="sb-logo">
            <span className="ico">🥒</span>
            <span className="txt">BDD GUIDE</span>
          </div>
          <div className="sb-sub">Behavior-Driven Development</div>
        </div>
        <nav className="sb-nav">
          {groups.map((grp) => (
            <div key={grp.title}>
              <div className="sb-grp">{grp.title}</div>
              {grp.items.map((item) => (
                <a
                  key={item.id}
                  className={`nav-a ${activeId === item.id ? "active" : ""}`}
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "location" : undefined}
                >
                  <span className="nn">{item.num}</span>
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
