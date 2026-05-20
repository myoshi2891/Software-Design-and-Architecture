import * as fs from 'fs';
import * as path from 'path';
import { Glob } from 'bun';
// @ts-ignore
import markdownLinkCheck from 'markdown-link-check';

interface LinkCheckResult {
  link: string;
  status: 'ok' | 'dead' | string;
}

const configPath = path.resolve(__dirname, '../.markdown-link-check.json');
let config: any = {};
if (fs.existsSync(configPath)) {
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (e) {
    console.error('Failed to parse config file:', e);
  }
}

/**
 * Scan all Markdown files (excluding node_modules) and validate links, logging outcomes.
 */
async function run(): Promise<void> {
  const glob = new Glob('**/*.md');
  const files: string[] = [];
  for (const file of glob.scanSync({ cwd: '.', onlyFiles: true })) {
    if (file.startsWith('node_modules/')) continue;
    files.push(file);
  }

  for (const file of files) {
    console.log(`>>> START: ${file}`);
    const content = fs.readFileSync(file, 'utf-8');

    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        console.log(`>>> TIMEOUT / BLOCKED: ${file}`);
        reject(new Error(`Timeout checking links in ${file}`));
      }, 180000);

      markdownLinkCheck(content, config, (err: Error | null, results: LinkCheckResult[]) => {
        clearTimeout(timer);
        if (err) {
          console.error(`Error checking ${file}:`, err);
          reject(new Error(`Error checking ${file}: ${err.message}`));
          return;
        }

        const failedLinks = results.filter((r) => r.status === 'dead' || r.status === 'error');
        if (failedLinks.length > 0) {
          const details = failedLinks.map((r) => `${r.link} (${r.status})`).join(', ');
          reject(new Error(`Dead links found in ${file}: ${details}`));
          return;
        }

        console.log(`>>> SUCCESS: ${file} (found ${results.length} links)`);
        results.forEach((r) => {
          console.log(`  Link: ${r.link} -> ${r.status}`);
        });
        resolve();
      });
    });
  }
}

run().catch((err: Error) => {
  console.error('Link check failed:', err.message);
  process.exit(1);
});
