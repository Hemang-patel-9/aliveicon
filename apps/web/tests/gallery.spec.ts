import fs from 'node:fs';
import path from 'node:path';
import { expect, test, type Page } from '@playwright/test';

const meta = JSON.parse(
	fs.readFileSync(path.join(import.meta.dirname, '../lib/generated/meta.json'), 'utf8')
) as { count: number; icons: { name: string; slug: string; letter: string }[] };

const firstIcon = meta.icons[0];
const lastIcon = meta.icons[meta.icons.length - 1];
const letters = new Set(meta.icons.map((i) => i.letter));
const missingLetter = 'abcdefghijklmnopqrstuvwxyz'.split('').find((l) => !letters.has(l));

const tiles = (page: Page) => page.locator('[data-tile]');
const tile = (page: Page, slug: string) => page.locator(`#tile-${slug}`);
const iconWidth = (page: Page, slug: string) =>
	tile(page, slug)
		.locator('.g-icon > *')
		.first()
		.evaluate((el) => getComputedStyle(el).width);
const columns = (page: Page) =>
	page
		.locator('.g-grid')
		.first()
		.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);

async function ready(page: Page) {
	await page.goto('./');
	await page.waitForLoadState('networkidle');
	await expect(tile(page, firstIcon.slug)).toBeVisible();
}

test.describe('search', () => {
	test('narrows results, reports the count and clears with Escape', async ({ page }) => {
		await ready(page);
		const search = page.getByRole('searchbox', { name: 'Search icons' });
		await search.fill('arrow up');
		await expect(page.getByText(/\d+ results? for “arrow up”/)).toBeVisible();
		const count = await tiles(page).count();
		expect(count).toBeGreaterThan(0);
		expect(count).toBeLessThan(meta.count);
		await expect(tile(page, 'arrow-up')).toBeVisible();

		await search.press('Escape');
		await expect(search).toHaveValue('');
		await expect(page.getByText(`${meta.count} icons`)).toBeVisible();
	});

	test('shows an empty state with a way out', async ({ page }) => {
		await ready(page);
		await page.getByRole('searchbox', { name: 'Search icons' }).fill('qqqzzzxxx');
		await expect(page.getByText('No icons match “qqqzzzxxx”')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Request this icon' })).toBeVisible();
		await page.getByRole('button', { name: 'Clear search', exact: true }).first().click();
		await expect(page.getByText(`${meta.count} icons`)).toBeVisible();
	});

	test('the / key focuses the search box', async ({ page }) => {
		await ready(page);
		await page.keyboard.press('/');
		await expect(page.getByRole('searchbox', { name: 'Search icons' })).toBeFocused();
	});
});

test.describe('settings', () => {
	test('size applies to the icons, persists and resets', async ({ page }) => {
		await ready(page);
		expect(await iconWidth(page, firstIcon.slug)).toBe('32px');

		await page.getByRole('slider', { name: 'Size' }).fill('48');
		await expect.poll(() => iconWidth(page, firstIcon.slug)).toBe('48px');

		await page.reload();
		await page.waitForLoadState('networkidle');
		await expect.poll(() => iconWidth(page, firstIcon.slug)).toBe('48px');

		await page.getByRole('button', { name: 'Reset all' }).click();
		await expect.poll(() => iconWidth(page, firstIcon.slug)).toBe('32px');
		await expect(page.getByRole('button', { name: 'Reset all' })).toBeDisabled();
	});

	test('a shared link restores the settings', async ({ page }) => {
		await page.goto('./?style=hairline&names=0&size=40&bg=dark');
		await page.waitForLoadState('networkidle');
		const grid = page.locator('.g-grid').first();
		await expect(grid).toHaveAttribute('data-style', 'hairline');
		await expect(grid).toHaveAttribute('data-names', 'off');
		await expect(grid).toHaveAttribute('data-preview', 'dark');
		await expect.poll(() => iconWidth(page, firstIcon.slug)).toBe('40px');
		await expect(page.getByRole('slider', { name: 'Size' })).toHaveValue('40');
	});

	test('copy link builds a url with only the changed values', async ({ page, context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		await ready(page);
		await page.getByRole('slider', { name: 'Size' }).fill('44');
		await page.getByText('Minimal', { exact: true }).click();
		await page.getByRole('button', { name: 'Copy link' }).click();
		const url = new URL(await page.evaluate(() => navigator.clipboard.readText()));
		expect(url.searchParams.get('size')).toBe('44');
		expect(url.searchParams.get('style')).toBe('minimal');
		expect([...url.searchParams.keys()].sort()).toEqual(['size', 'style']);
	});

	test('the tile style, background and name options change the grid', async ({ page }) => {
		await ready(page);
		const grid = page.locator('.g-grid').first();
		await expect(grid).toHaveAttribute('data-style', 'card');
		await page.getByText('Hairline', { exact: true }).click();
		await expect(grid).toHaveAttribute('data-style', 'hairline');
		await page.getByText('Checker', { exact: true }).click();
		await expect(grid).toHaveAttribute('data-preview', 'checker');
		await page.getByText('Tooltip', { exact: true }).click();
		await expect(grid).toHaveAttribute('data-name-pos', 'tooltip');
		await page.getByRole('switch', { name: 'Show names' }).click();
		await expect(grid).toHaveAttribute('data-names', 'off');
	});

	test('kebab-case names replace the PascalCase ones', async ({ page }) => {
		await ready(page);
		await expect(tile(page, firstIcon.slug).locator('.g-name')).toHaveText(firstIcon.name);
		await page.getByText('kebab-case', { exact: true }).click();
		await expect(tile(page, firstIcon.slug).locator('.g-name')).toHaveText(firstIcon.slug);
	});

	test('a custom color reaches the icons', async ({ page }) => {
		await ready(page);
		await page.getByLabel('Hex color').fill('#ff0000');
		await page.getByLabel('Hex color').press('Enter');
		await expect
			.poll(() =>
				tile(page, firstIcon.slug)
					.locator('.g-icon > *')
					.first()
					.evaluate((el) => getComputedStyle(el).color)
			)
			.toBe('rgb(255, 0, 0)');
	});

	test('per group reset only touches that group', async ({ page }) => {
		await ready(page);
		await page.getByRole('slider', { name: 'Size' }).fill('60');
		await page.getByRole('slider', { name: 'Gap' }).fill('20');
		const iconSection = page.getByRole('region', { name: 'Icon', exact: true });
		await iconSection.getByRole('button', { name: 'Reset' }).click();
		await expect(page.getByRole('slider', { name: 'Size' })).toHaveValue('32');
		await expect(page.getByRole('slider', { name: 'Gap' })).toHaveValue('20');
	});

	test('number fields accept typed values and clamp them', async ({ page }) => {
		await ready(page);
		const input = page.getByLabel('Size value');
		await input.fill('900');
		await input.press('Enter');
		await expect(page.getByRole('slider', { name: 'Size' })).toHaveValue('128');
	});

	test('the theme control changes the page theme', async ({ page }) => {
		await ready(page);
		await page
			.getByRole('radiogroup', { name: 'Theme' })
			.getByText('Dark', { exact: true })
			.click();
		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	});
});

test.describe('columns', () => {
	test('auto mode fits more columns for narrower tiles', async ({ page }) => {
		await ready(page);
		const normal = await columns(page);
		await page.getByRole('slider', { name: 'Tile width' }).fill('200');
		await expect.poll(() => columns(page)).toBeLessThan(normal);
	});

	test('fixed mode uses one count per screen size', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 900 });
		await page.goto('./?cols=fixed&c1=2&c2=3&c3=5');
		await page.waitForLoadState('networkidle');
		await expect.poll(() => columns(page)).toBe(5);

		await page.setViewportSize({ width: 800, height: 900 });
		await expect.poll(() => columns(page)).toBe(3);

		await page.setViewportSize({ width: 400, height: 900 });
		await expect.poll(() => columns(page)).toBe(2);
	});

	test('the fixed controls appear only in fixed mode', async ({ page }) => {
		await ready(page);
		await expect(page.getByRole('slider', { name: 'Desktop columns' })).toHaveCount(0);
		await page
			.getByRole('radiogroup', { name: 'Columns' })
			.getByText('Fixed', { exact: true })
			.click();
		await expect(page.getByRole('slider', { name: 'Desktop columns' })).toBeVisible();
		await expect(page.getByRole('slider', { name: 'Tile width' })).toHaveCount(0);
	});
});

test.describe('actions', () => {
	test('clicking a tile copies its import line', async ({ page, context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		await ready(page);
		await tile(page, firstIcon.slug).click();
		expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
			`import { ${firstIcon.name} } from 'aliveicon';`
		);
		await expect(page.locator('[aria-live="polite"]')).toHaveText(`Copied ${firstIcon.name}`);
	});

	test('copy as JSX uses the current settings', async ({ page, context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		await ready(page);
		await page.getByText('JSX', { exact: true }).click();
		await page.getByRole('switch', { name: 'Play on click' }).click();
		await tile(page, firstIcon.slug).click();
		expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
			`<${firstIcon.name} size={32} animateOnClick />`
		);
	});

	test('the copy button and the keyboard both copy', async ({ page, context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		await ready(page);
		await tile(page, firstIcon.slug).hover();
		await page.getByRole('button', { name: `Copy import line for ${firstIcon.name}` }).click();
		expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(firstIcon.name);

		await page.evaluate(() => navigator.clipboard.writeText('x'));
		await tile(page, meta.icons[1].slug).focus();
		await page.keyboard.press('Enter');
		expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(meta.icons[1].name);
	});

	test('play all restarts the visible animations', async ({ page }) => {
		await ready(page);
		const svg = tile(page, firstIcon.slug).locator('svg');
		const before = await svg.evaluate((el) => el.innerHTML);
		await page.getByRole('button', { name: /Play all/ }).click();
		const seen = new Set<string>([before]);
		for (let i = 0; i < 15; i++) {
			seen.add(await svg.evaluate((el) => el.innerHTML));
			await page.waitForTimeout(30);
		}
		expect(seen.size).toBeGreaterThan(1);
	});
});

test.describe('keyboard', () => {
	test('arrow keys move through the grid in reading order', async ({ page }) => {
		await ready(page);
		await tile(page, firstIcon.slug).focus();
		await page.keyboard.press('ArrowRight');
		await expect(tile(page, meta.icons[1].slug)).toBeFocused();
		await page.keyboard.press('ArrowLeft');
		await expect(tile(page, firstIcon.slug)).toBeFocused();

		const cols = await columns(page);
		await page.keyboard.press('ArrowDown');
		await expect(tile(page, meta.icons[cols].slug)).toBeFocused();
		await page.keyboard.press('ArrowUp');
		await expect(tile(page, firstIcon.slug)).toBeFocused();
	});

	test('End and Home jump to the ends', async ({ page }) => {
		await ready(page);
		await tile(page, firstIcon.slug).focus();
		await page.keyboard.press('End');
		await expect(tile(page, lastIcon.slug)).toBeFocused();
		await page.keyboard.press('Home');
		await expect(tile(page, firstIcon.slug)).toBeFocused();
	});

	test('only one tile is in the tab order', async ({ page }) => {
		await ready(page);
		await expect(page.locator('[data-tile][tabindex="0"]')).toHaveCount(1);
	});
});

test.describe('letter rail', () => {
	test('jumps to a letter and disables letters without icons', async ({ page }) => {
		await ready(page);
		const letter = meta.icons.find((i) => i.letter > 'b')?.letter ?? 'c';
		await page.getByRole('button', { name: `Jump to ${letter.toUpperCase()}` }).click();
		await expect
			.poll(() =>
				page
					.locator(`#letter-${letter}`)
					.evaluate((el) => Math.round(el.getBoundingClientRect().top))
			)
			.toBeLessThan(200);
		await expect(
			page.getByRole('button', { name: `Jump to ${letter.toUpperCase()}` })
		).toHaveAttribute('aria-current', 'true');

		if (missingLetter) {
			await expect(
				page.getByRole('button', { name: `Jump to ${missingLetter.toUpperCase()}` })
			).toBeDisabled();
		}
	});

	test('can be switched off', async ({ page }) => {
		await ready(page);
		await expect(page.getByRole('navigation', { name: 'Jump to letter' })).toBeVisible();
		await page.getByRole('switch', { name: 'Letter rail' }).click();
		await expect(page.getByRole('navigation', { name: 'Jump to letter' })).toHaveCount(0);
	});

	test('grouping can be turned off', async ({ page }) => {
		await ready(page);
		await page.getByRole('switch', { name: 'Group by letter' }).click();
		await expect(page.locator('[data-section]')).toHaveCount(1);
		await expect(page.locator('.g-heading')).toHaveCount(0);
	});
});

test.describe('lazy hydration', () => {
	test('far tiles become interactive when they are reached', async ({ page }) => {
		await ready(page);
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		const svg = tile(page, lastIcon.slug).locator('svg');
		await expect(svg).toBeVisible();
		await page.waitForTimeout(1500);
		const before = await svg.evaluate((el) => el.innerHTML);
		await svg.hover();
		const seen = new Set<string>([before]);
		for (let i = 0; i < 15; i++) {
			seen.add(await svg.evaluate((el) => el.innerHTML));
			await page.waitForTimeout(30);
		}
		expect(seen.size).toBeGreaterThan(1);
	});

	test('saved settings never cause hydration errors', async ({ page }) => {
		const problems: string[] = [];
		page.on('console', (msg) => {
			if (['error', 'warning'].includes(msg.type())) problems.push(msg.text());
		});
		page.on('pageerror', (err) => problems.push(err.message));
		await page.addInitScript(() =>
			localStorage.setItem(
				'aliveicon:settings:v1',
				JSON.stringify({ iconSize: 48, tileStyle: 'hairline', showNames: false, gap: 4 })
			)
		);
		await ready(page);
		for (let y = 0; y <= 40000; y += 1500) {
			await page.evaluate((top) => window.scrollTo(0, top), y);
			await page.waitForTimeout(120);
		}
		await page.waitForTimeout(1500);
		await expect.poll(() => iconWidth(page, firstIcon.slug)).toBe('48px');
		expect(problems).toEqual([]);
	});

	test('search results render with their icons', async ({ page }) => {
		await ready(page);
		await page.getByRole('searchbox', { name: 'Search icons' }).fill('a');
		await expect(tile(page, firstIcon.slug).locator('svg').first()).toBeVisible();
		await page.getByRole('searchbox', { name: 'Search icons' }).fill('');
		await expect(page.getByText(`${meta.count} icons`)).toBeVisible();
		await expect(tile(page, firstIcon.slug).locator('svg').first()).toBeVisible();
	});
});

test.describe('phone', () => {
	test.use({ viewport: { width: 390, height: 800 } });

	test('settings open in a bottom sheet and close with Escape', async ({ page }) => {
		await ready(page);
		await expect(page.locator('.g-sidebar')).toBeHidden();
		await page.getByRole('button', { name: 'Settings' }).click();
		const sheet = page.getByRole('dialog', { name: 'Settings' });
		await expect(sheet).toBeVisible();
		await expect(sheet.getByRole('slider', { name: 'Size' })).toBeVisible();
		await sheet.getByRole('slider', { name: 'Size' }).fill('50');
		await page.keyboard.press('Escape');
		await expect(sheet).toBeHidden();
		await expect.poll(() => iconWidth(page, firstIcon.slug)).toBe('50px');
	});

	test('the rail is hidden and nothing scrolls sideways', async ({ page }) => {
		await ready(page);
		await expect(page.getByRole('navigation', { name: 'Jump to letter' })).toBeHidden();
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth
		);
		expect(overflow).toBe(0);
	});
});
