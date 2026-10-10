import { chromium } from '@playwright/test';

const url = process.argv[2] ?? 'http://localhost:3000/aliveicon/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 823 } });
const cdp = await page.context().newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await cdp.send('Profiler.enable');
await cdp.send('Profiler.setSamplingInterval', { interval: 200 });
await cdp.send('Profiler.start');
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(6000);
const { profile } = await cdp.send('Profiler.stop');
await browser.close();

const nodes = new Map(profile.nodes.map((n) => [n.id, n]));
const parent = new Map();
for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
const self = new Map();
profile.samples.forEach((id, i) =>
	self.set(id, (self.get(id) ?? 0) + (profile.timeDeltas[i] ?? 0))
);

const label = (id) => {
	const f = nodes.get(id).callFrame;
	return `${f.functionName || '(anon)'}:${f.url.split('/').pop()}:${f.lineNumber}:${f.columnNumber}`;
};
const inclusive = new Map();
for (const [id, micros] of self) {
	const seen = new Set();
	for (let cur = id; cur !== undefined; cur = parent.get(cur)) {
		const key = label(cur);
		if (seen.has(key)) continue;
		seen.add(key);
		inclusive.set(key, (inclusive.get(key) ?? 0) + micros);
	}
}
const rows = [...inclusive]
	.filter(([k]) => !k.startsWith('(root)') && !k.startsWith('(program)') && !k.startsWith('(idle)'))
	.sort((a, b) => b[1] - a[1])
	.slice(0, 40);
for (const [k, v] of rows) console.log(`${(v / 1000).toFixed(0).padStart(6)} ms  ${k}`);
