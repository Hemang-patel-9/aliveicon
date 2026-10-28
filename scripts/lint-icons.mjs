import fs from 'node:fs';
import path from 'node:path';

const iconsDir = 'src/icons';

const legacyIcons = [];

const rules = [
	["missing 'use client'", (src) => /^'use client';/.test(src)],
	['has console calls', (src) => !/\bconsole\./.test(src)],
	['defines its own cn()', (src) => !/function cn\(|from '(clsx|tailwind-merge)'/.test(src)],
	[
		'viewBox is not 0 0 24 24',
		(src, name) => name === 'XTwitter' || src.includes('viewBox="0 0 24 24"'),
	],
	['svg is missing aria-hidden', (src) => src.includes('aria-hidden="true"')],
	['stroke is not currentColor', (src) => src.includes('stroke="currentColor"')],
	['missing displayName', (src, name) => src.includes(`${name}.displayName = '${name}'`)],
];

const problems = [];
let count = 0;

for (const letter of fs.readdirSync(iconsDir).sort()) {
	for (const file of fs.readdirSync(path.join(iconsDir, letter)).sort()) {
		const name = path.basename(file, '.tsx');
		const id = `${letter}/${name}`;
		const src = fs.readFileSync(path.join(iconsDir, letter, file), 'utf8');
		const usesHook = src.includes('useAnimatedIcon(');
		count++;

		for (const [message, ok] of rules) {
			if (!ok(src, name)) problems.push(`${id}: ${message}`);
		}
		if (usesHook && legacyIcons.includes(id)) {
			problems.push(`${id}: uses useAnimatedIcon now, remove it from legacyIcons`);
		}
		if (!usesHook && !legacyIcons.includes(id)) {
			problems.push(`${id}: should use useAnimatedIcon`);
		}
		if (usesHook && !/\banimate\s*:/.test(src)) {
			problems.push(`${id}: has no "animate" variant or animate option, so it never plays`);
		}
	}
}

for (const id of legacyIcons) {
	if (!fs.existsSync(path.join(iconsDir, `${id}.tsx`)))
		problems.push(`${id}: in legacyIcons but not found`);
}

if (problems.length) {
	console.error(problems.join('\n'));
	process.exit(1);
}
console.log(`${count} icons ok`);
