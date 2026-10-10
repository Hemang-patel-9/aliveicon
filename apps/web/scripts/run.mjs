import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const appDir = path.resolve(import.meta.dirname, '..');
const [mode, command, ...args] = process.argv.slice(2);

if (!['src', 'package'].includes(mode) || !command) {
	console.error('usage: node scripts/run.mjs <src|package> <next|node> [args]');
	process.exit(1);
}

const isDev = command === 'next' && args[0] === 'dev';
const env = {
	...process.env,
	ALIVEICON_MODE: mode,
	SITE_BASE_PATH: isDev ? '' : (process.env.SITE_BASE_PATH ?? undefined),
};
if (env.SITE_BASE_PATH === undefined) delete env.SITE_BASE_PATH;

const run = (file, fileArgs) => {
	const result = spawnSync(process.execPath, [file, ...fileArgs], {
		cwd: appDir,
		env,
		stdio: 'inherit',
	});
	if (result.status !== 0) process.exit(result.status ?? 1);
};

run(path.join(appDir, 'scripts/generate-meta.mjs'), [mode]);

if (command === 'next') {
	const require = createRequire(path.join(appDir, 'package.json'));
	run(path.join(path.dirname(require.resolve('next/package.json')), 'dist/bin/next'), args);
} else {
	run(args[0], args.slice(1));
}
