/**
 * CSSコンテンツから指定したスコープクラスのブロックを抽出します。
 * ネストされた中カッコ {} のペア数をカウントし、対象スコープが閉じるまでのブロックを返します。
 *
 * @param cssContent 全体のCSS文字列
 * @param scopeClass 抽出対象のスコープクラス（例: ".hexagonal-architecture-comprehensive-guide"）
 * @returns 抽出されたCSSブロック。見つからない場合は空の文字列。
 */
export function extractScopedCssBlock(cssContent: string, scopeClass: string): string {
  const scopeStart = cssContent.indexOf(scopeClass);
  if (scopeStart === -1) {
    return "";
  }

  let depth = 0;
  let endIdx = scopeStart;

  for (let i = scopeStart; i < cssContent.length; i++) {
    if (cssContent[i] === "{") {
      depth++;
    } else if (cssContent[i] === "}" && --depth === 0) {
      endIdx = i + 1;
      break;
    }
  }

  return cssContent.slice(scopeStart, endIdx);
}
