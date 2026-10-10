import { chromium } from '@playwright/test';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';

const url = process.argv[2] ?? 'http://localhost:3000/aliveicon/';
const preset = process.argv[3] === 'desktop' ? 'desktop' : 'mobile';

const chrome = await launch({
	chromePath: chromium.executablePath(),
	chromeFlags: ['--headless=new', '--no-sandbox'],
});

try {
	const { lhr } = await lighthouse(
		url,
		{
			port: chrome.port,
			output: 'json',
			logLevel: 'error',
			onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
		},
		preset === 'desktop' ? desktopConfig : undefined
	);

	const audits = lhr.audits;
	const value = (id) => audits[id]?.numericValue;
	const report = {
		url,
		preset,
		scores: Object.fromEntries(
			Object.entries(lhr.categories).map(([key, category]) => [
				key,
				Math.round(category.score * 100),
			])
		),
		fcpMs: Math.round(value('first-contentful-paint')),
		lcpMs: Math.round(value('largest-contentful-paint')),
		tbtMs: Math.round(value('total-blocking-time')),
		cls: Number(value('cumulative-layout-shift').toFixed(3)),
		speedIndexMs: Math.round(value('speed-index')),
		transferKb: Math.round(value('total-byte-weight') / 1024),
		domNodes: value('dom-size'),
		bootup: (audits['bootup-time']?.details?.items ?? []).slice(0, 8).map((i) => ({
			url: String(i.url).split('/').pop(),
			total: Math.round(i.total),
			scripting: Math.round(i.scripting),
			parse: Math.round(i.scriptParseCompile),
		})),
		lcpElement: String(
			audits['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet ??
				''
		).slice(0, 120),
		shifts: (audits['layout-shifts']?.details?.items ?? []).slice(0, 6).map((i) => ({
			node: String(i.node?.snippet ?? '').slice(0, 90),
			score: Number(i.score?.toFixed(3)),
		})),
		longTasks: (audits['long-tasks']?.details?.items ?? []).slice(0, 12).map((i) => ({
			url: String(i.url).split('/').pop(),
			start: Math.round(i.startTime),
			ms: Math.round(i.duration),
		})),
		failing: Object.values(audits)
			.filter(
				(a) =>
					a.score !== null &&
					a.score < 0.9 &&
					!['informative', 'notApplicable', 'manual'].includes(a.scoreDisplayMode)
			)
			.map((a) => `${a.id} (${a.score})`),
	};
	if (process.argv.includes('--raw')) {
		const keys = Object.keys(audits).filter((k) => /lcp|largest/.test(k));
		console.log(keys.join(', '));
		for (const k of keys)
			console.log(
				k,
				JSON.stringify(audits[k].details ?? audits[k].displayValue, null, 1)?.slice(0, 1200)
			);
	}
	console.log(JSON.stringify(report, null, 2));
} finally {
	await chrome.kill();
}
