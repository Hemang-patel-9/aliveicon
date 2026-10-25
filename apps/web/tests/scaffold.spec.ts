import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { siteConfig } from '../site.config';

const meta = JSON.parse(
	fs.readFileSync(path.join(import.meta.dirname, '../lib/generated/meta.json'), 'utf8')
) as { count: number };

test('renders every icon with no console errors', async ({ page }) => {
	const errors: string[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error' || msg.type() === 'warning') errors.push(msg.text());
	});
	page.on('pageerror', (err) => errors.push(err.message));

	await page.goto('./');
	await expect(page.getByText(`${meta.count} icons`)).toBeVisible();
	await expect(page.locator('main li')).toHaveCount(meta.count);
	await page.waitForLoadState('networkidle');
	expect(errors).toEqual([]);
});

test('an icon animates on hover after hydration', async ({ page }) => {
	await page.goto('./');
	await page.waitForLoadState('networkidle');

	const svg = page.locator('main li').first().locator('.g-icon svg');
	const snapshot = () => svg.evaluate((el) => el.innerHTML);
	const before = await snapshot();

	const samples = new Set<string>([before]);
	await svg.hover();
	for (let i = 0; i < 15; i++) {
		samples.add(await snapshot());
		await page.waitForTimeout(30);
	}
	expect(samples.size, 'svg markup never changed while hovering').toBeGreaterThan(1);

	await page.mouse.move(0, 0);
	await page.waitForTimeout(800);
	expect(await snapshot()).toBe(before);
});

test('reduced motion disables mount and hover animations', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('./?am=1');
	await page.waitForLoadState('networkidle');

	const svg = page.locator('main li').first().locator('.g-icon svg');
	const snapshot = () => svg.evaluate((el) => el.innerHTML);
	const before = await snapshot();
	await page.waitForTimeout(500);
	expect(await snapshot()).toBe(before);

	await svg.hover();
	await page.waitForTimeout(500);
	expect(await snapshot()).toBe(before);
});

test('ambulance and book audio stay still until triggered', async ({ page }) => {
	await page.goto('./');
	await page.waitForLoadState('networkidle');
	const search = page.getByRole('searchbox', { name: 'Search icons' });

	for (const [query, slug] of [
		['ambulance', 'ambulance'],
		['book audio', 'book-audio'],
	]) {
		await search.fill(query);
		const svg = page.locator(`#tile-${slug} .g-icon svg`);
		await expect(svg).toBeVisible();
		const before = await svg.evaluate((el) => el.innerHTML);
		await page.waitForTimeout(1400);
		expect(await svg.evaluate((el) => el.innerHTML)).toBe(before);
	}
});

test('static server blocks path traversal and survives malformed URLs', async ({ request }) => {
	const fixtureDir = fs.mkdtempSync(path.join(import.meta.dirname, '../out-escape-'));
	const fixtureName = path.basename(fixtureDir);
	fs.writeFileSync(path.join(fixtureDir, 'secret.txt'), 'outside export');
	const siteUrl = `http://localhost:3100${siteConfig.site.basePath}`;

	try {
		const traversal = await request.get(`${siteUrl}/%2f..%2f${fixtureName}%2fsecret.txt`);
		expect(traversal.status()).toBe(404);
		const malformed = await request.get(`${siteUrl}/%`);
		expect(malformed.status()).toBe(400);
		const healthy = await request.get(`${siteUrl}/`);
		expect(healthy.status()).toBe(200);
	} finally {
		fs.rmSync(fixtureDir, { recursive: true, force: true });
	}
});

test('theme is light first, toggles and persists without a flash', async ({ page }) => {
	await page.goto('./');
	const root = page.locator('html');
	await expect(root).toHaveAttribute('data-theme', 'light');

	await page.getByRole('button', { name: 'Dark theme' }).click();
	await expect(root).toHaveAttribute('data-theme', 'dark');

	await page.reload();
	await expect(root).toHaveAttribute('data-theme', 'dark');
	await expect(page.getByRole('button', { name: 'Dark theme' })).toHaveAttribute(
		'aria-pressed',
		'true'
	);
});

test('first paint already uses the stored theme', async ({ page }) => {
	await page.addInitScript(() => localStorage.setItem('aliveicon:theme', 'dark'));
	await page.route('**/*.js', (route) => route.abort());
	await page.goto('./');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
	expect(bg).toBe('rgb(10, 10, 10)');
});

test('no horizontal scroll on a phone', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 640 });
	await page.goto('./');
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - document.documentElement.clientWidth
	);
	expect(overflow).toBe(0);
});
