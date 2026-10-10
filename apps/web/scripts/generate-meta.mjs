import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { toSlug } from '../lib/slug.ts';

const appDir = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(appDir, '../..');
const mode = (process.argv[2] ?? process.env.ALIVEICON_MODE) === 'src' ? 'src' : 'package';

const readNames = async () => {
	if (mode === 'src') {
		const index = fs.readFileSync(path.join(repoRoot, 'src/index.ts'), 'utf8');
		const names = [...index.matchAll(/^export \{ (\w+) \} from '\.\/icons\/\w\/\1';$/gm)].map(
			(m) => m[1]
		);
		const version = JSON.parse(
			fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8')
		).version;
		return { names, version };
	}
	const require = createRequire(path.join(appDir, 'package.json'));
	const pkgJson = require.resolve('aliveicon/package.json');
	const pkgDir = path.dirname(pkgJson);
	const version = JSON.parse(fs.readFileSync(pkgJson, 'utf8')).version;
	const mod = await import(pathToFileURL(path.join(pkgDir, 'dist/esm/index.js')).href);
	const names = Object.keys(mod).filter(
		(n) => /^[A-Z]/.test(n) && ['object', 'function'].includes(typeof mod[n])
	);
	return { names, version };
};

const { names: exported, version } = await readNames();

const aliasSource = fs.readFileSync(path.join(repoRoot, 'src/aliases.ts'), 'utf8');
const aliasPairs = [...aliasSource.matchAll(/^export const (\w+) = (\w+);$/gm)].map((m) => ({
	name: m[1],
	target: m[2],
}));
const exportedSet = new Set(exported);
if (mode === 'src') for (const a of aliasPairs) exportedSet.add(a.name);
const aliases = aliasPairs.filter((a) => exportedSet.has(a.name) && exportedSet.has(a.target));
const aliasNames = new Set(aliases.map((a) => a.name));

const changelog = fs
	.readFileSync(path.join(repoRoot, 'CHANGELOG.md'), 'utf8')
	.replace(/\r\n/g, '\n');
const unreleased = changelog.split(/^## \[Unreleased\]\n/m)[1]?.split(/^## \[/m)[0] ?? '';
const unreleasedNames = new Set(
	mode === 'src' ? [...unreleased.matchAll(/`([A-Z][A-Za-z0-9]*)`/g)].map((m) => m[1]) : []
);

const icons = exported
	.filter((n) => !aliasNames.has(n))
	.sort((a, b) => {
		const x = a.toLowerCase();
		const y = b.toLowerCase();
		return x === y ? (a < b ? -1 : 1) : x < y ? -1 : 1;
	})
	.map((name) => ({
		name,
		slug: toSlug(name),
		letter: name[0].toLowerCase(),
		isNew: unreleasedNames.has(name),
	}));

const slugs = new Map();
for (const icon of icons) {
	if (slugs.has(icon.slug)) {
		throw new Error(`slug collision: ${slugs.get(icon.slug)} and ${icon.name} -> ${icon.slug}`);
	}
	slugs.set(icon.slug, icon.name);
}

const meta = {
	mode,
	version,
	count: icons.length,
	icons,
	aliases: aliases.map((a) => ({ ...a, slug: toSlug(a.name), targetSlug: toSlug(a.target) })),
};

const outDir = path.join(appDir, 'lib/generated');
fs.mkdirSync(outDir, { recursive: true });

const lettersDir = path.join(outDir, 'letters');
fs.rmSync(lettersDir, { recursive: true, force: true });
fs.mkdirSync(lettersDir, { recursive: true });
const byLetter = new Map();
for (const name of [...icons.map((i) => i.name), ...aliases.map((a) => a.name)]) {
	const letter = name[0].toLowerCase();
	byLetter.set(letter, [...(byLetter.get(letter) ?? []), name]);
}
const letters = [...byLetter.keys()].sort();
for (const letter of letters) {
	const names = byLetter.get(letter).sort();
	fs.writeFileSync(
		path.join(lettersDir, `${letter}.ts`),
		`// @ts-nocheck
import { ${names.join(', ')} } from 'aliveicon';

export const components: Record<string, unknown> = { ${names.join(', ')} };
`
	);
}
const loaderLines = letters
	.map((letter) => `\t${letter}: () => import('./letters/${letter}'),`)
	.join('\n');
fs.writeFileSync(
	path.join(outDir, 'letter-loaders.ts'),
	`export const loaders: Record<string, () => Promise<{ components: Record<string, unknown> }>> = {
${loaderLines}
};
`
);
fs.writeFileSync(path.join(outDir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
console.log(
	`meta: ${icons.length} icons, ${aliases.length} aliases (${mode}, aliveicon ${version})`
);
