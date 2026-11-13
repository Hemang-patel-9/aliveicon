import type { Locator } from '@playwright/test';

type Watched = Window & { __frameObserver?: MutationObserver; __frames?: number };

export async function countFrames(target: Locator, action: () => Promise<unknown>, settleMs = 800) {
	await target.evaluate((el) => {
		const w = window as Watched;
		w.__frameObserver?.disconnect();
		w.__frames = 0;
		w.__frameObserver = new MutationObserver((records) => {
			w.__frames = (w.__frames ?? 0) + records.length;
		});
		w.__frameObserver.observe(el, { attributes: true, subtree: true });
	});
	await action();
	await target.page().waitForTimeout(settleMs);
	return target.evaluate(() => {
		const w = window as Watched;
		w.__frameObserver?.disconnect();
		return w.__frames ?? 0;
	});
}
