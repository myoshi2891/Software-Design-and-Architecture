"use client";

import {
  IconArrowUpRight,
  IconBook2,
  IconBuildingSkyscraper,
  IconCertificate,
  IconCompass,
  IconPalette,
  IconRepeat,
  IconSearch,
  IconStack2,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { guideCatalog } from "@/lib/guide-catalog";

const categoryDetails: Record<
  string,
  {
    icon: typeof IconStack2;
    label: string;
    description: string;
  }
> = {
  architecture: {
    icon: IconStack2,
    label: "ARCHITECTURE",
    description: "システムの構造を捉え、適切な分割と依存を考える。",
  },
  "design-principles": {
    icon: IconCompass,
    label: "DESIGN PRINCIPLES",
    description: "変化に強いコードを生む、設計の判断軸を身につける。",
  },
  "development-methodologies": {
    icon: IconRepeat,
    label: "DEVELOPMENT",
    description: "チームの実践を支える、開発の進め方を学ぶ。",
  },
  "product-and-enterprise": {
    icon: IconBuildingSkyscraper,
    label: "PRODUCT & ENTERPRISE",
    description: "プロダクトの価値と、組織全体の設計をつなぐ。",
  },
  "css-design-system-guide": {
    icon: IconPalette,
    label: "DESIGN SYSTEMS",
    description: "一貫した体験をつくる、UI の仕組みとルール。",
  },
  "recommended-books": {
    icon: IconBook2,
    label: "BOOKS & INSIGHTS",
    description: "書籍を起点に、生成 AI 時代の実践知を深める。",
  },
  "certification-exams": {
    icon: IconCertificate,
    label: "CERTIFICATION EXAMS",
    description: "公式ドメインと出題基準に沿って、資格認定の知識を体系的に学ぶ。",
  },
};

const normalize = (value: string) => value.normalize("NFKC").toLocaleLowerCase().trim();

export function GuideExplorer() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("all");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const categories = guideCatalog
    .map((category) => ({
      ...category,
      entries: category.entries.filter((entry) =>
        terms.every((term) =>
          normalize(`${category.name} ${entry.name} ${entry.summary}`).includes(term)
        )
      ),
    }))
    .filter(
      (category) => (selected === "all" || selected === category.id) && category.entries.length > 0
    );
  const count = categories.reduce((sum, category) => sum + category.entries.length, 0);

  return (
    <section className="guide-library" id="guide-library" aria-label="ガイド一覧">
      <div className="library-heading">
        <div>
          <p className="index-eyebrow">EXPLORE THE LIBRARY</p>
          <p className="library-title">いま、学びたいテーマから。</p>
          <p className="library-description">基礎を押さえる一歩から、実践のための深掘りまで。</p>
        </div>
        <div className="guide-search">
          <IconSearch size={18} aria-hidden="true" />
          <input
            ref={searchInputRef}
            type="search"
            aria-label="ガイドを検索"
            placeholder="キーワードで探す…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button
              type="button"
              aria-label="検索をクリア"
              onClick={() => {
                setQuery("");
                searchInputRef.current?.focus();
              }}
            >
              <IconX size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <div className="library-toolbar">
        <fieldset className="category-filters" aria-label="カテゴリで絞り込み">
          <button
            type="button"
            aria-pressed={selected === "all"}
            onClick={() => setSelected("all")}
          >
            すべて{" "}
            <span className="filter-count">
              {guideCatalog.flatMap((category) => category.entries).length}
            </span>
          </button>
          {guideCatalog.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={selected === category.id}
              onClick={() => setSelected(category.id)}
            >
              {category.name}
            </button>
          ))}
        </fieldset>
        <p className="result-count" role="status">
          {count} 本のガイド
        </p>
      </div>
      <div className="category-grid">
        {categories.map((category) => {
          const detail = categoryDetails[category.id as keyof typeof categoryDetails] ?? {
            icon: IconBook2,
            label: category.id,
            description: "",
          };
          const Icon = detail.icon;
          return (
            <section
              className="category"
              data-category={category.id}
              id={category.id}
              key={category.id}
              aria-labelledby={`${category.id}-title`}
            >
              <div className="category-topline">
                <span className="category-icon">
                  <Icon size={23} stroke={1.5} aria-hidden="true" />
                </span>
                <span className="category-english">{detail.label}</span>
                <span className="category-count">
                  {String(category.entries.length).padStart(2, "0")} <span>GUIDES</span>
                </span>
              </div>
              <h2 id={`${category.id}-title`}>{category.name}</h2>
              <p className="category-description">{detail.description}</p>
              <ul className="guide-list">
                {category.entries.map((entry) => (
                  <li key={entry.href}>
                    {entry.status === "published" ? (
                      <Link className="guide-row" href={entry.href}>
                        <span className="guide-row-copy">
                          <span className="guide-name">{entry.name}</span>
                          <span className="guide-summary">{entry.summary}</span>
                        </span>
                        <IconArrowUpRight className="guide-arrow" size={17} aria-hidden="true" />
                      </Link>
                    ) : (
                      <div className="guide-row is-planned">
                        <span className="guide-row-copy">
                          <span className="guide-name">{entry.name}</span>
                          <span className="guide-summary">{entry.summary}</span>
                        </span>
                        <span className="status-note">準備中</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      {count === 0 && (
        <div className="empty-guides">
          <IconSearch size={30} aria-hidden="true" />
          <p>条件に一致するガイドが見つかりませんでした。</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelected("all");
              searchInputRef.current?.focus();
            }}
          >
            検索と絞り込みをリセット
          </button>
        </div>
      )}
    </section>
  );
}
