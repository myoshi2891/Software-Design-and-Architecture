import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configPath = path.resolve(__dirname, '../.markdown-link-check.json');
let ignoreRegexes = [];

if (fs.existsSync(configPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    if (config.ignorePatterns && Array.isArray(config.ignorePatterns)) {
      ignoreRegexes = config.ignorePatterns.map((item) => new RegExp(item.pattern));
    }
  } catch (e) {
    console.error('Failed to parse config file:', e);
  }
}

function shouldIgnore(url) {
  return ignoreRegexes.some((regex) => regex.test(url));
}

function extractUrls(content) {
  let cleanContent = content.replace(/```[\s\S]*?```/g, '');
  cleanContent = cleanContent.replace(/`[^`\n]*`/g, '');
  const urlRegex = /https?:\/\/[a-zA-Z0-9.\-_~%!$&'()*+,;=:@/]+(?:\?[a-zA-Z0-9.\-_~%!$&'()*+,;=:@/?#]*)?/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(cleanContent)) !== null) {
    let url = match[0];
    url = url.replace(/[|`\]\s]+$/, '');
    if (url.endsWith('.') || url.endsWith(',') || url.endsWith(')')) {
      const openCount = (url.match(/\(/g) || []).length;
      const closeCount = (url.match(/\)/g) || []).length;
      if (closeCount > openCount) {
        url = url.replace(/[.,\)]+$/, '');
      }
    }
    urls.push(url);
  }
  return Array.from(new Set(urls));
}

async function verifyUrl(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };
  try {
    let res = await fetch(url, { method: 'HEAD', signal: controller.signal, headers });
    clearTimeout(timeoutId);
    if (!res.ok) {
      const getController = new AbortController();
      const getTimeoutId = setTimeout(() => getController.abort(), timeoutMs);
      try {
        res = await fetch(url, { method: 'GET', signal: getController.signal, headers });
        clearTimeout(getTimeoutId);
      } catch (getErr) {
        clearTimeout(getTimeoutId);
        return { ok: false, status: 0, error: getErr.name === 'AbortError' ? 'Timeout' : getErr.message };
      }
    }
    return { ok: res.ok, status: res.status };
  } catch (err) {
    clearTimeout(timeoutId);
    const getController = new AbortController();
    const getTimeoutId = setTimeout(() => getController.abort(), timeoutMs);
    try {
      const res = await fetch(url, { method: 'GET', signal: getController.signal, headers });
      clearTimeout(getTimeoutId);
      return { ok: res.ok, status: res.status };
    } catch (getErr) {
      clearTimeout(getTimeoutId);
      return { ok: false, status: 0, error: getErr.name === 'AbortError' ? 'Timeout' : getErr.message };
    }
  }
}

async function run() {
  const files = [];
  const allFiles = fs.readdirSync('.', { recursive: true });
  for (const file of allFiles) {
    if (file.endsWith('.md')) {
      if (file.startsWith('node_modules/') || file.includes('/node_modules/')) continue;
      const fullPath = path.resolve('.', file);
      if (fs.statSync(fullPath).isFile()) {
        files.push(file);
      }
    }
  }

  const isDryRun = process.argv.includes('--dry-run');
  let hasErrors = false;

  for (const file of files) {
    console.log(`>>> START: ${file}`);
    const content = fs.readFileSync(file, 'utf-8');
    const urls = extractUrls(content);
    const checkedUrls = [];
    const deadLinks = [];

    for (const url of urls) {
      if (shouldIgnore(url)) {
        console.log(`  Ignore: ${url}`);
        continue;
      }
      checkedUrls.push(url);
      if (isDryRun) {
        console.log(`    Link: ${url} -> skipped (dry-run)`);
      } else {
        console.log(`  Checking: ${url} ...`);
        const result = await verifyUrl(url);
        if (result.ok) {
          console.log(`    Link: ${url} -> ok (${result.status})`);
        } else {
          const errorMsg = result.error ? ` (${result.error})` : '';
          console.log(`    Link: ${url} -> dead/error [Status: ${result.status}]${errorMsg}`);
          deadLinks.push(`${url} [Status: ${result.status}]${errorMsg}`);
        }
      }
    }

    if (deadLinks.length > 0) {
      console.error(`Error checking ${file}: Dead links found: ${deadLinks.join(', ')}`);
      hasErrors = true;
    } else {
      console.log(`>>> SUCCESS: ${file} (checked ${checkedUrls.length} links)`);
    }
  }

  if (hasErrors) {
    throw new Error('Dead links found in one or more files.');
  }
}

run().catch((err) => {
  console.error('Link check failed:', err.message);
  process.exit(1);
});
