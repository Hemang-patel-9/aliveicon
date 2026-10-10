import { useEffect } from 'react';
import { openGate } from '@/lib/hydration-gate';
import { preloadAllLetters } from '@/lib/icon-registry';
import { siteConfig } from '@/site.config';

const { hydrateMargin, hydrateGapMs, preloadDelayMs } = siteConfig.performance;
const INTERACTION_EVENTS = ['pointerover', 'pointerdown', 'touchstart', 'focusin'] as const;

interface Pending {
	id: string;
	distance: number;
}

export function useLazyHydration(groups: unknown, prefix: string) {
	useEffect(() => {
		const targets = new Map<Element, string>();
		const chunks = new Map<string, Element[]>();
		document.querySelectorAll<HTMLElement>('[data-chunk]').forEach((el) => {
			const id = el.dataset.chunk ?? '';
			const list = chunks.get(id) ?? [];
			list.push(el);
			chunks.set(id, list);
		});
		for (const [id, list] of chunks) {
			targets.set(list[0], id);
			targets.set(list[list.length - 1], id);
		}

		const queue: Pending[] = [];
		const queued = new Set<string>();
		let timer: ReturnType<typeof setTimeout> | undefined;
		let preloadTimer: ReturnType<typeof setTimeout> | undefined;

		const pump = () => {
			timer = undefined;
			const next = queue.shift();
			if (!next) {
				preloadTimer = setTimeout(() => preloadAllLetters(), preloadDelayMs);
				return;
			}
			openGate(next.id);
			timer = setTimeout(pump, hydrateGapMs);
		};

		const enqueue = (id: string, distance: number) => {
			if (queued.has(id)) return;
			queued.add(id);
			queue.push({ id, distance });
			queue.sort((a, b) => a.distance - b.distance);
			if (timer === undefined) timer = setTimeout(pump, 0);
		};

		const observer = new IntersectionObserver(
			(entries) => {
				const middle = window.innerHeight / 2;
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const id = targets.get(entry.target);
					if (id) enqueue(id, Math.abs(entry.boundingClientRect.top - middle));
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: `${hydrateMargin * 100}% 0px` }
		);
		for (const el of targets.keys()) observer.observe(el);

		const onInteract = (event: Event) => {
			const el = (event.target as Element | null)?.closest?.('[data-chunk]');
			const id = el?.getAttribute('data-chunk');
			if (id) openGate(id);
		};
		for (const name of INTERACTION_EVENTS) {
			document.addEventListener(name, onInteract, { passive: true, capture: true });
		}

		return () => {
			observer.disconnect();
			clearTimeout(timer);
			clearTimeout(preloadTimer);
			for (const name of INTERACTION_EVENTS) {
				document.removeEventListener(name, onInteract, { capture: true });
			}
		};
	}, [groups, prefix]);
}
