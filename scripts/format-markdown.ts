import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

/**
 * Formats a Markdown file in-place, enforcing consistent link separation, heading spacing, blank-line collapsing, and trailing newline conventions.
 *
 * The function preserves YAML front matter and fenced code blocks without modification. Outside of these protected regions, it applies formatting rules including separating concatenated links, ensuring headings are preceded by blank lines, collapsing excess blank lines, and normalizing the file to end with exactly one newline.
 *
 * @param filePath - Path to the Markdown file. The file will be overwritten with the formatted content.
 */
async function formatMarkdown(filePath: string): Promise<void> {
    try {
        const absolutePath = resolve(filePath);
        const rawContent = await readFile(absolutePath, 'utf8');

        // 1. Normalize line endings to LF
        const rawContentLF = rawContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        // 2. Process line by line for code blocks, separators, and headings
        const lines = rawContentLF.split('\n');
        const processedLines: string[] = [];
        let frontMatterOpen = false;
        let inFencedCodeBlock = false;
        let activeFenceChar = '';
        let activeFenceLen = 0;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            const trimmed = line.trim();

            // 1. Preserve YAML front matter verbatim
            if (i === 0 && trimmed === '---') {
                frontMatterOpen = true;
                processedLines.push(line);
                continue;
            }

            if (frontMatterOpen) {
                processedLines.push(line);
                if (trimmed === '---') {
                    frontMatterOpen = false;
                }
                continue;
            }

            // 2. Track fenced code blocks (robustly handle nested fences)
            const openingFenceMatch = trimmed.match(/^(`{3,}|~{3,})/);
            if (!inFencedCodeBlock && openingFenceMatch) {
                const fence = openingFenceMatch[1];
                const fenceChar = fence[0];
                const fenceLen = fence.length;
                inFencedCodeBlock = true;
                activeFenceChar = fenceChar;
                activeFenceLen = fenceLen;
                processedLines.push(line);
                continue;
            }

            if (inFencedCodeBlock) {
                const closingFenceMatch = trimmed.match(/^(`{3,}|~{3,})\s*$/);
                if (closingFenceMatch) {
                    const closingFence = closingFenceMatch[1];
                    if (
                        closingFence[0] === activeFenceChar &&
                        closingFence.length >= activeFenceLen
                    ) {
                        inFencedCodeBlock = false;
                        activeFenceChar = '';
                        activeFenceLen = 0;
                    }
                }
                processedLines.push(line);
                continue;
            }

            // 3. Collapse consecutive blank lines (outside protected areas)
            if (
                trimmed === '' &&
                processedLines.length > 0 &&
                processedLines[processedLines.length - 1].trim() === ''
            ) {
                continue;
            }

            // 4. Split concatenated links (outside code blocks/front matter)
            line = line.replace(/\)\[/g, ')\n[');

            // 5. Ensure blank line before headings (MD022)
            if (/^#{1,6}\s+/.test(line)) {
                if (
                    processedLines.length > 0 &&
                    processedLines[processedLines.length - 1].trim() !== ''
                ) {
                    processedLines.push('');
                }
            }

            processedLines.push(line);
        }

        // 5. Normalize spacing (already handled during line processing)
        let content = processedLines.join('\n');

        // 6. Ensure single trailing newline (preserve meaningful spaces)
        if (!content.endsWith('\n')) {
            content += '\n';
        } else {
            content = content.replace(/\n+$/, '\n');
        }

        await writeFile(absolutePath, content, 'utf8');
        console.log(`Successfully formatted: ${filePath}`);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Error formatting ${filePath}:`, message);
        process.exit(1);
    }
}

const targetFile = process.argv[2];
if (!targetFile) {
    console.error('Usage: bun scripts/format-markdown.ts <file-path>');
    process.exit(1);
}

formatMarkdown(targetFile);
