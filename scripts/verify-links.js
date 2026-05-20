const fs = require('fs');
const path = require('path');
const { Glob } = require('bun');
const markdownLinkCheck = require('markdown-link-check');

const configPath = path.resolve(__dirname, '../.markdown-link-check.json');
let config = {};
if (fs.existsSync(configPath)) {
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (e) {
    console.error('Failed to parse config file:', e);
  }
}

async function run() {
  const glob = new Glob('**/*.md');
  const files = [];
  for (const file of glob.scanSync({ cwd: '.', onlyFiles: true })) {
    if (file.startsWith('node_modules/')) continue;
    files.push(file);
  }

  for (const file of files) {
    console.log(`>>> START: ${file}`);
    const content = fs.readFileSync(file, 'utf-8');

    await new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.log(`>>> TIMEOUT / BLOCKED: ${file}`);
        resolve();
      }, 3000);

      markdownLinkCheck(content, config, (err, results) => {
        clearTimeout(timer);
        if (err) {
          console.error(`Error checking ${file}:`, err);
        } else {
          console.log(`>>> SUCCESS: ${file} (found ${results.length} links)`);
          results.forEach((r) => {
            console.log(`  Link: ${r.link} -> ${r.status}`);
          });
        }
        resolve();
      });
    });
  }
}

run();
