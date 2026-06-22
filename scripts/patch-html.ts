import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./development-methodologies/behavior-driven-development-comprehensive-guide/behavior-driven-development-comprehensive-guide.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. CSSの!importantを修正 (width強制を排除し、JS側の個別サイズ制御を有効化)
// 正規表現パターンを定義して、改行やスペースの揺れに強くする
const cssTargetRegex = /\.mbox\s+svg\s*\{\s*width\s*:\s*100%\s*!important\s*;\s*max-width\s*:\s*100%\s*!important\s*;\s*height\s*:\s*auto\s*!important\s*;\s*display\s*:\s*block\s*\}/g;
const cssReplacement = `.mbox svg{max-width:100% !important;height:auto !important;display:block;margin:0 auto !important}`;

// 2. JSのSVG処理部分の正規化
// document.querySelectorAll('.mbox svg').forEach(...) ブロック全体を検索する正規表現
const jsBlockRegex = /document\.querySelectorAll\(\s*(['"])\.mbox\s+svg\1\s*\)\.forEach\(\s*svg\s*=>\s*\{[\s\S]*?\}\s*\);/g;

const jsReplacement = `  document.querySelectorAll('.mbox svg').forEach(svg => {
    const vb = svg.getAttribute('viewBox');
    if (!vb) {
      const w = svg.getAttribute('width') || svg.getBoundingClientRect().width || 800;
      const h = svg.getAttribute('height') || svg.getBoundingClientRect().height || 400;
      svg.setAttribute('viewBox', \`0 0 \${parseFloat(w)} \${parseFloat(h)}\`);
    }
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.style.height = 'auto';
    svg.style.overflow = 'visible';
    svg.style.marginBottom = '10px';
    svg.style.maxWidth = '100%';
    svg.style.display = 'block';
    svg.style.marginLeft = 'auto';
    svg.style.marginRight = 'auto';

    const currentVb = svg.getAttribute('viewBox');
    if (currentVb) {
      const parts = currentVb.split(/\\s+/).map(Number);
      if (parts.length === 4 && parts.every(Number.isFinite)) {
        const [,, w,] = parts;
        svg.style.width = w + 'px';
      } else {
        svg.style.width = '100%';
      }
    } else {
      svg.style.width = '100%';
    }
  });`;

let modified = false;

// CSSの置換処理
if (cssTargetRegex.test(content)) {
  content = content.replace(cssTargetRegex, cssReplacement);
  modified = true;
}

// JSの置換処理
const jsMatch = content.match(jsBlockRegex);
if (jsMatch) {
  const matchedJsBlock = jsMatch[0];
  
  // ブロック内に svg.style.display = 'block' や svg.style.marginLeft = 'auto' があるか確認
  const hasCentering = matchedJsBlock.includes("svg.style.display = 'block'") && 
                       matchedJsBlock.includes("svg.style.marginLeft = 'auto'");
                       
  if (hasCentering) {
    // 【分岐 1】すでに中央寄せスタイルを含む jsReplacement でパッチが適用済みの場合
    // これ以上の処理は不要であるため何もしない
    console.log('JS Block already fully patched with alignment styles.');
  } else if (matchedJsBlock.includes('preserveAspectRatio') || matchedJsBlock.includes('currentVb')) {
    // 【分岐 2】古い実装 (jsTargetOld) または中間実装 (jsTargetCurrent) が見つかった場合
    // いずれも svg.style.marginLeft = 'auto' などの必要な中央寄せ用スタイルが欠如しているため、
    // jsReplacement に置換してパッチを適用し、modified を true に設定する
    content = content.replace(matchedJsBlock, jsReplacement);
    modified = true;
    console.log('Found outdated JS block. Patching with centering support...');
  } else {
    // 【分岐 3】それ以外の未知のパターンの場合
    // 安全のため警告した上で、正しくアライメントを制御するために jsReplacement に置換する
    console.warn('Unknown JS block format found, replacing with clean jsReplacement.');
    content = content.replace(matchedJsBlock, jsReplacement);
    modified = true;
  }
} else {
  console.warn('JS Block matching document.querySelectorAll(\'.mbox svg\') not found.');
}

if (modified) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched the HTML file and resolved CSS conflict!');
} else {
  console.log('No changes needed or targets not found. (CSS conflict may already be resolved)');
}
