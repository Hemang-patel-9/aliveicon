import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const app = path.join(root, 'apps', 'web');
const [command = 'dev', ...rest] = process.argv.slice(2);

const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 18)) {
	console.error(`The website needs Node 22.18 or newer, this is ${process.versions.node}.`);
	process.exit(1);
}

const fromEnv = process.env.npm_execpath;
const npmCli =
	fromEnv && path.basename(fromEnv).startsWith('npm')
		? fromEnv
		: path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');

const run = (cwd, args) => {
	const result = spawnSync(process.execPath, [npmCli, ...args], { cwd, stdio: 'inherit' });
	if (result.status !== 0) process.exit(result.status ?? 1);
};

if (!fs.existsSync(path.join(root, 'node_modules'))) run(root, ['install']);
if (!fs.existsSync(path.join(app, 'node_modules'))) run(app, ['install']);

run(app, ['run', command, ...(rest.length ? ['--', ...rest] : [])]);
