import fs from 'node:fs';
import path from 'node:path';

const iconsDir = 'src/icons';

const allowedImport = /^(framer-motion|react|\.\.\/\.\.\/lib\/[a-z-]+)$/;

const stripStrings = (src) =>
	src.replace(/'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/g, '""');

const jsxElements = (src, tag) => {
	const elements = [];
	let start = src.indexOf(`<${tag}`);
	while (start !== -1) {
		let depth = 0;
		let end = start + 1;
		for (; end < src.length; end++) {
			const ch = src[end];
			if (ch === '{') depth++;
			else if (ch === '}') depth--;
			else if (ch === '>' && depth === 0 && src[end - 1] !== '=') break;
		}
		elements.push(src.slice(start, end + 1));
		start = src.indexOf(`<${tag}`, end);
	}
	return elements;
};

const rules = [
	["missing 'use client'", (src) => /^'use client';/.test(src)],
	['has console calls', (src) => !/\bconsole\./.test(src)],
	['defines its own cn()', (src) => !/function cn\(|from '(clsx|tailwind-merge)'/.test(src)],
	[
		'imports from somewhere other than framer-motion, react or ../../lib',
		(src) =>
			[...src.matchAll(/(?:from|import)\s+['"]([^'"]+)['"]/g)].every(([, source]) =>
				allowedImport.test(source)
			),
	],
	[
		'is not forwardRef<AnimatedIconHandle, AnimatedIconProps>',
		(src) => /forwardRef<AnimatedIconHandle, AnimatedIconProps>\(\s*\(props, ref\)/.test(src),
	],
	['does not call useAnimatedIcon(ref, props', (src) => src.includes('useAnimatedIcon(ref, props')],
	['wrapper is not <div {...iconProps}>', (src) => src.includes('<div {...iconProps}>')],
	['declares its own props type', (src) => !/\b(interface|type)\s+\w*Props\b/.test(src)],
	['viewBox is not 0 0 24 24', (src) => src.includes('viewBox="0 0 24 24"')],
	['svg is missing aria-hidden', (src) => src.includes('aria-hidden="true"')],
	['stroke is not currentColor', (src) => src.includes('stroke="currentColor"')],
	['svg is not strokeWidth={strokeWidth}', (src) => src.includes('strokeWidth={strokeWidth}')],
	[
		'svg is missing round caps or joins',
		(src) => src.includes('strokeLinecap="round"') && src.includes('strokeLinejoin="round"'),
	],
	[
		'svg is not 100% wide and high',
		(src) => {
			const svg = jsxElements(src.replace('<motion.svg', '<svg'), 'svg')[0] ?? '';
			return svg.includes('width="100%"') && svg.includes('height="100%"');
		},
	],
	[
		'a motion element is animated by something other than controls',
		(src) =>
			src.includes('animate={controls}') &&
			jsxElements(src, 'motion.').every(
				(el) => /animate=\{controls\}/.test(el) || (!/\banimate=/.test(el) && /variants=/.test(el))
			),
	],
	[
		'repeats forever without cycleMs',
		(src) => !/repeat:\s*Infinity/.test(src) || /cycleMs/.test(src),
	],
	['has comments', (src) => !/\/\/|\/\*/.test(stripStrings(src))],
	['missing displayName', (src, name) => src.includes(`${name}.displayName = '${name}'`)],
];

const problems = [];
let count = 0;

for (const letter of fs.readdirSync(iconsDir).sort()) {
	for (const file of fs.readdirSync(path.join(iconsDir, letter)).sort()) {
		const name = path.basename(file, '.tsx');
		const id = `${letter}/${name}`;
		const src = fs.readFileSync(path.join(iconsDir, letter, file), 'utf8').replace(/\r\n/g, '\n');
		count++;

		for (const [message, ok] of rules) {
			if (!ok(src, name)) problems.push(`${id}: ${message}`);
		}
		if (!/\banimate\s*:/.test(src)) {
			problems.push(`${id}: has no "animate" variant or animate option, so it never plays`);
		}
		const rest = src.match(/\brest:\s*'([^']+)'/)?.[1] ?? 'normal';
		for (const [, initial] of src.matchAll(/initial="([^"]+)"/g)) {
			if (initial !== rest && !src.includes(`${initial}:`)) {
				problems.push(`${id}: initial="${initial}" is not a variant`);
			}
		}
	}
}

if (problems.length) {
	console.error(problems.join('\n'));
	process.exit(1);
}
console.log(`${count} icons ok`);
