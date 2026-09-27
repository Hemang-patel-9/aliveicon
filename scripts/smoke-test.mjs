import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

const require = createRequire(import.meta.url);
const esm = await import(pathToFileURL(path.resolve('dist/esm/index.js')).href);
const cjs = require(path.resolve('dist/cjs/index.js'));

const failures = [];

const esmNames = Object.keys(esm).sort();
const cjsNames = Object.keys(cjs)
	.filter((name) => name !== '__esModule')
	.sort();
if (esmNames.join() !== cjsNames.join()) failures.push('esm and cjs builds export different names');

for (const [format, mod] of [
	['esm', esm],
	['cjs', cjs],
]) {
	for (const name of esmNames) {
		try {
			const html = renderToString(createElement(mod[name], { size: 24 }));
			if (!html.includes('<svg')) failures.push(`${format} ${name}: no svg rendered`);
		} catch (err) {
			failures.push(`${format} ${name}: ${err.message.split('\n')[0]}`);
		}
	}
}

const listFiles = (dir) =>
	fs
		.readdirSync(dir, { withFileTypes: true })
		.flatMap((entry) =>
			entry.isDirectory() ? listFiles(path.join(dir, entry.name)) : [path.join(dir, entry.name)]
		);

for (const file of [...listFiles('dist/esm'), ...listFiles('dist/cjs')]) {
	if (file.endsWith('.js') && !fs.readFileSync(file, 'utf8').startsWith("'use client';")) {
		failures.push(`${file}: missing 'use client'`);
	}
}

if (failures.length) {
	console.error(failures.join('\n'));
	process.exit(1);
}
console.log(`rendered ${esmNames.length} exports from esm and cjs`);
