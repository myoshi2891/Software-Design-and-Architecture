/**
 * CSSコンテンツから指定したスコープクラスのブロックを抽出します。
 * ネストされた中カッコ {} のペア数をカウントし、対象スコープが閉じるまでのブロックを返します。
 *
 * @param cssContent 全体のCSS文字列
 * @param scopeClass 抽出対象のスコープクラス（例: ".hexagonal-architecture-comprehensive-guide"）
 * @returns 抽出されたCSSブロック。見つからない場合は空の文字列。
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

      if (cssContent[i] === "{") {
        foundBrace = true;
        braceIndex = i;
        break;
      }
      if (cssContent[i] === "}") {
        // 先に } が見つかった場合は、このセレクターはブロックを持たないため不適合
        break;
      }
    }

    if (!foundBrace) {
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
