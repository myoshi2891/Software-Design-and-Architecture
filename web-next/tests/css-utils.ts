/**
 * Extracts the CSS selector and block for the specified scope class.
 *
 * @param cssContent - The CSS source to search.
 * @param scopeClass - The scope class selector to match.
 * @returns The matching selector and block, or an empty string if no match is found.
 */
export function extractScopedCssBlock(cssContent: string, scopeClass: string): string {
  let searchStart = 0;

  while (true) {
    const scopeStart = cssContent.indexOf(scopeClass, searchStart);
    if (scopeStart === -1) {
      return "";
    }

    // 次回の検索は今回のマッチ箇所の直後から開始する
    searchStart = scopeStart + 1;

    // 1. 直後の文字がセレクターの識別子の一部でないか確認（有効なセレクター境界）
    const nextChar = cssContent[scopeStart + scopeClass.length];
    if (nextChar && /[a-zA-Z0-9_-]/.test(nextChar)) {
      continue;
    }

    // 2. コメント内であるかどうかを確認する
    if (isInComment(cssContent, scopeStart)) {
      continue;
    }

    // 3. scopeStart から次の中括弧（{ または }）を探す
    let foundBrace = false;
    let braceIndex = -1;
    let inComment = false;
    let invalidCandidate = false;

    for (let i = scopeStart + scopeClass.length; i < cssContent.length; i++) {
      if (!inComment && cssContent[i] === "/" && cssContent[i + 1] === "*") {
        inComment = true;
        i++;
        continue;
      }
      if (inComment && cssContent[i] === "*" && cssContent[i + 1] === "/") {
        inComment = false;
        i++;
        continue;
      }
      if (inComment) {
        continue;
      }

      const char = cssContent[i];

      if (char === "{") {
        foundBrace = true;
        braceIndex = i;
        break;
      }
      if (char === "}") {
        // 先に } が見つかった場合は、このセレクターはブロックを持たないため不適合
        break;
      }

      // 空白（スペース、タブ、改行）以外で、かつコメント外の文字があれば
      // この候補は `.scopeClass` 自体のブロックではなく、子孫セレクター等の定義とみなす
      if (!/\s/.test(char)) {
        invalidCandidate = true;
        break;
      }
    }

    if (invalidCandidate || !foundBrace) {
      continue;
    }

    // 4. ブロックの範囲を決定する（既存の中括弧ウォークロジック）
    let depth = 0;
    let endIdx = braceIndex;

    for (let i = braceIndex; i < cssContent.length; i++) {
      if (cssContent[i] === "{") {
        depth++;
      } else if (cssContent[i] === "}" && --depth === 0) {
        endIdx = i + 1;
        break;
      }
    }

    if (depth === 0) {
      return cssContent.slice(scopeStart, endIdx);
    }
  }
}
/**
 * Determines whether a position falls within a CSS comment.
 *
 * @param cssContent - The CSS text to inspect
 * @param index - The position to check
 * @returns `true` if `index` is inside a comment block, `false` otherwise
 */
function isInComment(cssContent: string, index: number): boolean {
  let inComment = false;
  for (let i = 0; i < index; i++) {
    if (!inComment && cssContent[i] === "/" && cssContent[i + 1] === "*") {
      inComment = true;
      i++;
    } else if (inComment && cssContent[i] === "*" && cssContent[i + 1] === "/") {
      inComment = false;
      i++;
    }
  }
  return inComment;
}
