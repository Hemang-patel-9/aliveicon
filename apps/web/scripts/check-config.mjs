import fs from 'node:fs';
import path from 'node:path';
import { validateConfig } from '../lib/config.ts';
import { siteConfig } from '../site.config.ts';
import { toSlug } from '../lib/slug.ts';

const appDir = path.resolve(import.meta.dirname, '..');
const problems = validateConfig(siteConfig);

const RAW_COLOR = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(/;
const scanned = ['app', 'components', 'lib'];
const skip = new Set([path.join('lib', 'config.ts')]);

const walk = (dir) =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) return entry.name === 'generated' ? [] : walk(full);
		return [full];
	});

for (const root of scanned) {
	const dir = path.join(appDir, root);
	if (!fs.existsSync(dir)) continue;
	for (const file of walk(dir)) {
		const rel = path.relative(appDir, file);
		if (skip.has(rel) || !/\.(ts|tsx|css|mdx)$/.test(file)) continue;
		fs.readFileSync(file, 'utf8')
			.split('\n')
			.forEach((line, i) => {
				if (RAW_COLOR.test(line))
					problems.push(`${rel}:${i + 1}: raw color outside site.config.ts`);
			});
	}
}

const sample = ['ArrowUp01', 'ArrowDown10', 'Axis3d', 'ALargeSmall', 'AArrowDown', 'ArrowUpAZ'];
const expected = [
	'arrow-up-0-1',
	'arrow-down-1-0',
	'axis-3d',
	'a-large-small',
	'a-arrow-down',
	'arrow-up-a-z',
];
sample.forEach((name, i) => {
	if (toSlug(name) !== expected[i]) problems.push(`slug for ${name} is ${toSlug(name)}`);
});

if (problems.length > 0) {
	console.error(problems.join('\n'));
	process.exit(1);
}
console.log('config ok');
