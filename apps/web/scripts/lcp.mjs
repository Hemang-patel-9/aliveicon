import { chromium } from '@playwright/test';

const url = process.argv[2] ?? 'http://localhost:3000/aliveicon/';
const runs = Number(process.argv[3] ?? 3);

const browser = await chromium.launch();
for (let i = 0; i < runs; i++) {
	const context = await browser.newContext({ viewport: { width: 412, height: 823 } });
	const page = await context.newPage();
	const cdp = await context.newCDPSession(page);
	await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
	await cdp.send('Network.enable');
	await cdp.send('Network.emulateNetworkConditions', {
		offline: false,
		latency: 150,
		downloadThroughput: (1.6 * 1024 * 1024) / 8,
		uploadThroughput: (750 * 1024) / 8,
	});
	await page.addInitScript(() => {
		window.__lcp = [];
		new PerformanceObserver((list) => {
			for (const e of list.getEntries()) {
				window.__lcp.push({
					t: Math.round(e.startTime),
					size: e.size,
					el: e.element
						? `${e.element.tagName}.${String(e.element.className).slice(0, 20)} "${(e.element.textContent || '').slice(0, 18)}"`
						: '?',
				});
			}
		}).observe({ type: 'largest-contentful-paint', buffered: true });
	});
	await page.goto(url, { waitUntil: 'load' });
	await page.waitForTimeout(7000);
	const lcp = await page.evaluate(() => window.__lcp);
	console.log(`run ${i + 1}:`, lcp.map((c) => `${c.t}ms ${c.el} (${c.size})`).join('  ->  '));
	await context.close();
}
await browser.close();
