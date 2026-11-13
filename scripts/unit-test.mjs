import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const cwd = fs.realpathSync.native(process.cwd());
const vitest = path.join(cwd, 'node_modules', 'vitest', 'vitest.mjs');

const result = spawnSync(process.execPath, [vitest, 'run', ...process.argv.slice(2)], {
	cwd,
	stdio: 'inherit',
});
process.exit(result.status ?? 1);
