import {createHash} from 'node:crypto';
import {existsSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {expect,it} from 'vitest';
import {slug} from './source-contract';
const hashes={"html":"261f9ddb9085a1170ef464841c6f4344c2b09b63bbc5696be28e88bce1df114f","md":"8d47d82b33b25365ba3b65f329adbd35979ff83a1b360ea10ab163f46110e055"};
for(const ext of ['html','md'] as const)it('archives unmodified original '+ext,()=>{const archive=resolve('..','archive/css-design-system-guide',slug,slug+'.'+ext);expect(existsSync(archive)).toBe(true);expect(existsSync(resolve('..','css-design-system-guide',slug+'.'+ext))).toBe(false);expect(createHash('sha256').update(readFileSync(archive)).digest('hex')).toBe(hashes[ext]);});
