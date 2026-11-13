import fs from 'node:fs';
import path from 'node:path';

const iconsDir = 'src/icons';
const readme = fs.readFileSync('README.md', 'utf8');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const aliases = new Set(
	[...fs.readFileSync('src/aliases.ts', 'utf8').matchAll(/^export const (\w+) =/gm)].map(
		([, name]) => name
	)
);

const perLetter = new Map();
const exports = new Set(aliases);
for (const letter of fs.readdirSync(iconsDir).sort()) {
	const names = fs
		.readdirSync(path.join(iconsDir, letter))
		.map((file) => path.basename(file, '.tsx'));
	perLetter.set(letter.toUpperCase(), names.length);
	names.forEach((name) => exports.add(name));
}
const total = [...perLetter.values()].reduce((sum, n) => sum + n, 0);
const rounded = `${Math.floor(total / 100) * 100}+`;

const errors = [];
const expect = (ok, message) => ok || errors.push(message);

expect(readme.includes(`badge/icons-${total}-`), `README badge should say ${total}`);
for (const [, count] of readme.matchAll(/\*\*(\d+) (?:animated SVG )?icons\*\*/g)) {
	expect(Number(count) === total, `README says ${count} icons, there are ${total}`);
}
expect(
	packageJson.description.startsWith(`${rounded} animated`),
	`package.json description should start with "${rounded} animated"`
);

const table = new Map();
for (const [, letter, count, examples] of readme.matchAll(
	/^\| \*\*([A-Z])\*\* \| (\d+) \| (.*) \|$/gm
)) {
	table.set(letter, Number(count));
	for (const [, name] of examples.matchAll(/`(\w+)`/g)) {
		expect(exports.has(name), `README table example ${name} is not an export`);
	}
}
for (const [letter, count] of perLetter) {
	expect(
		table.get(letter) === count,
		`README table: ${letter} should be ${count}, is ${table.get(letter)}`
	);
}
for (const letter of table.keys()) {
	expect(perLetter.has(letter), `README table lists ${letter}, which has no icons`);
}

if (errors.length) {
	console.error(errors.join('\n'));
	process.exit(1);
}
console.log(`README and package.json match ${total} icons`);
