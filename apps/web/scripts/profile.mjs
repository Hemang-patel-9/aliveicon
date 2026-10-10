import { chromium } from '@playwright/test';

const url = process.argv[2] ?? 'http://localhost:3000/aliveicon/';
const rate = Number(process.argv[3] ?? 4);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 823 } });
const cdp = await page.context().newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate });
await cdp.send('Profiler.enable');
await cdp.send('Profiler.setSamplingInterval', { interval: 500 });
await cdp.send('Profiler.start');
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(6000);
const { profile } = await cdp.send('Profiler.stop');
await browser.close();

const nodes = new Map(profile.nodes.map((n) => [n.id, n]));
const self = new Map();
const deltas = profile.timeDeltas;
profile.samples.forEach((id, i) => self.set(id, (self.get(id) ?? 0) + (deltas[i] ?? 0)));

const byFunction = new Map();
const byFile = new Map();
for (const [id, micros] of self) {
	const { callFrame } = nodes.get(id);
	const file = callFrame.url.split('/').pop() || '(native)';
	const name = `${callFrame.functionName || '(anonymous)'} @ ${file}:${callFrame.lineNumber}`;
	byFunction.set(name, (byFunction.get(name) ?? 0) + micros);
	byFile.set(file, (byFile.get(file) ?? 0) + micros);
}
const top = (map, n) =>
	[...map]
		.sort((a, b) => b[1] - a[1])
		.slice(0, n)
		.map(([k, v]) => `${(v / 1000).toFixed(0).padStart(6)} ms  ${k}`);
console.log(
	`CPU rate ${rate}x, total sampled ${(deltas.reduce((a, b) => a + b, 0) / 1000).toFixed(0)} ms`
);
console.log('--- by file');
console.log(top(byFile, 8).join('\n'));
console.log('--- by function (self time)');
console.log(top(byFunction, 22).join('\n'));
