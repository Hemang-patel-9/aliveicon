import { expect, test, type Page } from '@playwright/test';

const icon = (page: Page) => page.locator('#tile-bell .g-icon > *').first();
const frame = (page: Page) => icon(page).evaluate((el) => el.innerHTML);

async function open(page: Page, query: string) {
	await page.goto(`./?${query}`);
	await page.waitForLoadState('networkidle');
	await page.getByRole('searchbox', { name: 'Search icons' }).fill('bell');
	await expect(icon(page).locator('svg')).toBeVisible();
	await page.waitForTimeout(200);
}

async function isMoving(page: Page) {
	const first = await frame(page);
	await page.waitForTimeout(150);
	return (await frame(page)) !== first;
}

test('a click animation finishes after the pointer leaves', async ({ page }) => {
	await open(page, 'oc=1&hv=0');
	const rest = await frame(page);
	await icon(page).click();
	await page.mouse.move(0, 0);
	await page.waitForTimeout(250);
	expect(await frame(page)).not.toBe(rest);
	await expect.poll(() => frame(page), { timeout: 3000 }).toBe(rest);
});

test('the color prop and currentColor reach the svg', async ({ page }) => {
	await open(page, 'color=ff0000');
	const svg = icon(page).locator('svg');
	await expect.poll(() => svg.evaluate((el) => getComputedStyle(el).color)).toBe('rgb(255, 0, 0)');
	expect(await svg.getAttribute('stroke')).toBe('currentColor');
});

test.describe('touch', () => {
	test.use({ hasTouch: true, viewport: { width: 390, height: 800 } });

	test('a tap plays once even with loop on hover', async ({ page, context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		await open(page, 'lp=1');
		const rest = await frame(page);
		await icon(page).tap();
		await expect.poll(() => isMoving(page)).toBe(true);
		await expect.poll(() => frame(page), { timeout: 4000 }).toBe(rest);
		expect(await isMoving(page)).toBe(false);
	});
});
