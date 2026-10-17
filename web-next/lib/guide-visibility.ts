/**
 * ローカル専用ガイドの表示制御。
 *
 * 著作権リスクのため公開デプロイから除外する書籍ガイドは、ソースを git 追跡外に置き
 * ローカルでのみ閲覧する（.gitignore 参照）。索引とナビは
 * NEXT_PUBLIC_INCLUDE_LOCAL_GUIDES=1 のときだけ `localOnly` を含める。
 *
 * 循環 import を避けるため、本モジュールは型のみを import する純関数に限る。
 */

import type { NavLink } from "@/components/site/nav-links";
import type { GuideCategory } from "@/lib/guide-catalog";

/** フラグ値が厳密に "1" のときだけローカル専用ガイドを含める。 */
export function isLocalGuidesEnabled(value: string | undefined): boolean {
  return value === "1";
}

/** NEXT_PUBLIC_ 変数はビルド時に文字列置換されるため、参照はリテラルで書く。 */
export const localGuidesEnabled = isLocalGuidesEnabled(
  process.env.NEXT_PUBLIC_INCLUDE_LOCAL_GUIDES
);

/** カタログ中の localOnly ガイドの href 一覧。 */
export function localOnlyHrefs(catalog: readonly GuideCategory[]): string[] {
  return catalog.flatMap((c) => c.entries.filter((e) => e.localOnly).map((e) => e.href));
}

/** include=false なら localOnly を除き、空になったカテゴリも落とす。 */
export function filterCatalog(
  catalog: readonly GuideCategory[],
  include: boolean
): readonly GuideCategory[] {
  if (include) return catalog;
  return catalog
    .map((c) => ({ ...c, entries: c.entries.filter((e) => !e.localOnly) }))
    .filter((c) => c.entries.length > 0);
}

/** include=false なら localOnly リンクを除き、子が空になったドロップダウンも落とす。 */
export function filterNavLinks(links: readonly NavLink[], include: boolean): readonly NavLink[] {
  if (include) return links;
  return links.flatMap((link): NavLink[] => {
    if (!("children" in link)) return link.localOnly ? [] : [link];
    const children = link.children.filter((c) => !c.localOnly);
    return children.length > 0 ? [{ ...link, children }] : [];
  });
}
