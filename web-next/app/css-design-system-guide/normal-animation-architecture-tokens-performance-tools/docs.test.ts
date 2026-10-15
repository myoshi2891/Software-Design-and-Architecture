import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {expect,it} from 'vitest';
import {guideCatalog} from '@/lib/guide-catalog';
import {slug} from './source-contract';
for(const name of ['README.md','GEMINI.md'])it('documents migration and archive in '+name,()=>{const text=readFileSync(resolve('..',name),'utf8');expect(text).toContain('/css-design-system-guide/'+slug);expect(text).toContain('archive/css-design-system-guide/'+slug+'/');expect(text).toContain('19');});
it('publishes the existing catalog route',()=>{expect(guideCatalog.flatMap(c=>c.entries).some(link=>link.href==='/css-design-system-guide/'+slug)).toBe(true);expect(guideCatalog.flatMap(c=>c.entries).find(link=>link.href==='/css-design-system-guide/'+slug)?.status).toBe('published');expect(existsSync('app/css-design-system-guide/'+slug+'/page.tsx')).toBe(true);});
