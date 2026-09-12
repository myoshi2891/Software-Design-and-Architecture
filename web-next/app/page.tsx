import {
  IconBuildingSkyscraper,
  IconCompass,
  IconPalette,
  IconRepeat,
  IconStack2,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { JSX } from "react";
import { guideCatalog } from "@/lib/guide-catalog";

export const metadata: Metadata = {
  title: "設計手法とアーキテクチャの資料集",
  description:
    "クリーンアーキテクチャ、マイクロサービス、DDD、TDD、BDD、CSS デザインシステムまで。設計手法と開発手法の日本語ガイド一覧。",
};

/**
 * カテゴリ id とアイコンの対応。
 * カタログ (lib/guide-catalog.ts) を純粋なデータに保つため、表示要素はここで対応づける。
 */
const CATEGORY_ICONS: Record<string, () => JSX.Element> = {
  architecture: () => <IconStack2 aria-hidden="true" />,
  "design-principles": () => <IconCompass aria-hidden="true" />,
  "development-methodologies": () => <IconRepeat aria-hidden="true" />,
  "product-and-enterprise": () => <IconBuildingSkyscraper aria-hidden="true" />,
  "css-design-system-guide": () => <IconPalette aria-hidden="true" />,
};

/**
 * Renders the guide index at the site root.
 *
 * Lists every guide grouped by category. Published guides link to their page; guides that have not
 * been migrated yet are shown as non-interactive rows marked 準備中, so the full inventory stays
 * visible without sending anyone to a 404.
 *
 * @returns The guide index page.
 */
export default function HomePage() {
  const entries = guideCatalog.flatMap((category) => category.entries);
  const total = entries.length;
  const published = entries.filter((entry) => entry.status === "published").length;
  const planned = total - published;

  return (
    <div className="guide-index">
      <div className="page-wrap">
        <header className="index-header">
          <h1>設計手法とアーキテクチャの資料集</h1>
          <p className="index-lede">
            アーキテクチャ、設計原則、開発手法、CSS
            デザインシステムの日本語ガイド。初学者向けの前提説明から現場の判断材料までを 1
            本ずつまとめています。
          </p>
          <p className="index-count">
            全 <span className="num">{total}</span> 本。公開{" "}
            <span className="num">{published}</span>、準備中 <span className="num">{planned}</span>
          </p>
        </header>

        {guideCatalog.map((category) => {
          const Icon = CATEGORY_ICONS[category.id];
          return (
            <section className="category" data-category={category.id} key={category.id}>
              <h2 className="category-head">
                {Icon ? <Icon /> : null}
                <span className="category-name">{category.name}</span>
                <span className="category-count">{category.entries.length} 本</span>
              </h2>
              <ul className="guide-list">
                {category.entries.map((entry) =>
                  entry.status === "published" ? (
                    <li key={entry.href}>
                      <Link className="guide-row" href={entry.href}>
                        <span className="guide-name">{entry.name}</span>
                        <span className="guide-summary">{entry.summary}</span>
                      </Link>
                    </li>
                  ) : (
                    <li key={entry.href}>
                      <div className="guide-row is-planned">
                        <span className="guide-name">{entry.name}</span>
                        <span className="guide-summary">{entry.summary}</span>
                        <span className="status-note">準備中</span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
