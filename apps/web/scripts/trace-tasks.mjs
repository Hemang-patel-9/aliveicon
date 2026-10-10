import fs from 'node:fs';
import { chromium } from '@playwright/test';

const url = process.argv[2] ?? 'http://localhost:3000/aliveicon/';
const rate = Number(process.argv[3] ?? 4);
const out = process.argv[4] ?? 'trace.json';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 823 } });
const cdp = await page.context().newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate });
await browser.startTracing(page, {
	categories: [
		'devtools.timeline',
		'disabled-by-default-devtools.timeline',
		'disabled-by-default-v8.cpu_profiler',
	],
});
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(6000);
const buffer = await browser.stopTracing();
await browser.close();

const trace = JSON.parse(buffer.toString());
const events = (trace.traceEvents ?? trace).filter((e) => e.ph === 'X' && e.dur);
const rendererMain = new Map();
for (const e of events) {
	if (e.name === 'RunTask') {
		const key = `${e.pid}:${e.tid}`;
		rendererMain.set(key, (rendererMain.get(key) ?? 0) + e.dur);
	}
}
const [mainKey] = [...rendererMain].sort((a, b) => b[1] - a[1])[0];
const [pid, tid] = mainKey.split(':').map(Number);
const mine = events.filter((e) => e.pid === pid && e.tid === tid);
const tasks = mine.filter((e) => e.name === 'RunTask' && e.dur > 50000).sort((a, b) => a.ts - b.ts);
const inner = mine.filter((e) => e.name !== 'RunTask');
const t0 = Math.min(...mine.map((e) => e.ts));

console.log(`main thread tasks over 50 ms at ${rate}x: ${tasks.length}`);
for (const task of tasks) {
	const end = task.ts + task.dur;
	const within = inner.filter((e) => e.ts >= task.ts && e.ts + e.dur <= end);
	const totals = new Map();
	for (const e of within) {
		const nested = within.some(
			(o) => o !== e && o.ts <= e.ts && o.ts + o.dur >= e.ts + e.dur && o.name !== 'RunTask'
		);
		if (nested) continue;
		totals.set(e.name, (totals.get(e.name) ?? 0) + e.dur);
	}
	const top = [...totals]
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([n, d]) => `${n} ${(d / 1000).toFixed(0)}`);
	console.log(
		`t=${((task.ts - t0) / 1000).toFixed(0).padStart(5)} ms  ${(task.dur / 1000).toFixed(0).padStart(4)} ms  ${top.join(' | ')}`
	);
}
fs.writeFileSync(out, JSON.stringify({ tasks: tasks.length }));
