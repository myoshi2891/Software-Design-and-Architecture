import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./development-methodologies/behavior-driven-development-comprehensive-guide/behavior-driven-development-comprehensive-guide.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. CSSの!importantを修正 (width強制を排除し、JS側の個別サイズ制御を有効化)
const cssTarget = `.mbox svg{width:100% !important;max-width:100% !important;height:auto !important;display:block}`;
const cssReplacement = `.mbox svg{max-width:100% !important;height:auto !important;display:block;margin:0 auto !important}`;

// 2. JSのSVG処理部分の正規化
const jsTargetOld = `  document.querySelectorAll('.mbox svg').forEach(svg => {
    const vb = svg.getAttribute('viewBox');
    if (!vb) {
      const w = svg.getAttribute('width') || svg.getBoundingClientRect().width || 800;
      const h = svg.getAttribute('height') || svg.getBoundingClientRect().height || 400;
      svg.setAttribute('viewBox', \`0 0 \${parseFloat(w)} \${parseFloat(h)}\`);
    }
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.style.width = '100%';
    svg.style.height = 'auto';
  });`;

const jsTargetCurrent = `  document.querySelectorAll('.mbox svg').forEach(svg => {
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

if (content.includes(cssTarget)) {
  content = content.replace(cssTarget, cssReplacement);
  modified = true;
}

if (content.includes(jsTargetOld)) {
  content = content.replace(jsTargetOld, jsReplacement);
  modified = true;
} else if (content.includes(jsTargetCurrent)) {
  // すでにJS側は置換済み
} else {
  console.warn('JS Target content not found (might already be patched).');
}

if (modified) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched the HTML file and resolved CSS conflict!');
} else {
  console.log('No changes needed or targets not found. (CSS conflict may already be resolved)');
}
