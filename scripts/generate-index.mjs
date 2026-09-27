import fs from 'node:fs';
import path from 'node:path';

const iconsDir = 'src/icons';
const indexFile = 'src/index.ts';
const check = process.argv.includes('--check');

const errors = [];
const lines = [
	"export type { AnimatedIconHandle, AnimatedIconProps, AnimatedIconTriggers } from './lib/types';",
	"export * from './aliases';",
];
let total = 0;

for (const letter of fs.readdirSync(iconsDir).sort()) {
	const dir = path.join(iconsDir, letter);
	if (!fs.statSync(dir).isDirectory()) {
		errors.push(`${dir}: icons must be inside a letter folder`);
		continue;
	}

	lines.push('', `// ${letter.toUpperCase()}'s icon exports`);

	for (const file of fs.readdirSync(dir).sort()) {
		const name = path.basename(file, '.tsx');
		const src = fs.readFileSync(path.join(dir, file), 'utf8');

		if (!file.endsWith('.tsx') || !/^[A-Z][A-Za-z0-9]*$/.test(name)) {
			errors.push(`${dir}/${file}: file name must be the component name, e.g. BellRing.tsx`);
		} else if (name[0].toLowerCase() !== letter) {
			errors.push(`${dir}/${file}: should be in ${iconsDir}/${name[0].toLowerCase()}`);
		} else if (!new RegExp(`export \\{ ${name} \\}|export (const|function) ${name}\\b`).test(src)) {
			errors.push(`${dir}/${file}: does not export ${name}`);
		}

		lines.push(`export { ${name} } from './icons/${letter}/${name}';`);
		total++;
	}
}

if (errors.length) {
	console.error(errors.join('\n'));
	process.exit(1);
}

const output = lines.join('\n') + '\n';

if (check) {
	const current = fs.readFileSync(indexFile, 'utf8').replace(/\r\n/g, '\n');
	if (current !== output) {
		console.error(`${indexFile} is out of date, run npm run generate`);
		process.exit(1);
	}
	console.log(`${indexFile} is up to date (${total} icons)`);
} else {
	fs.writeFileSync(indexFile, output);
	console.log(`wrote ${indexFile} (${total} icons)`);
}
