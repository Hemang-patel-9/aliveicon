import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const appDir = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(appDir, '../..');
const packDir = path.join(appDir, '.pack');
const skipBuild = process.argv.includes('--skip-build');

const fromEnv = process.env.npm_execpath;
const npmCli =
	fromEnv && path.basename(fromEnv).startsWith('npm')
		? fromEnv
		: path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');

const run = (cwd, args) => {
	const result = spawnSync(process.execPath, [npmCli, ...args], { cwd, stdio: 'inherit' });
	if (result.status !== 0) process.exit(result.status ?? 1);
};

if (!skipBuild) run(repoRoot, ['run', 'build']);

fs.rmSync(packDir, { recursive: true, force: true });
fs.mkdirSync(packDir, { recursive: true });
run(repoRoot, ['pack', '--pack-destination', packDir, '--ignore-scripts']);

const tarball = fs.readdirSync(packDir).find((f) => f.endsWith('.tgz'));
if (!tarball) {
	console.error('npm pack did not produce a tarball');
	process.exit(1);
}
run(appDir, ['install', '--no-save', '--no-audit', '--no-fund', path.join('.pack', tarball)]);
console.log(`installed ${tarball} into apps/web`);
