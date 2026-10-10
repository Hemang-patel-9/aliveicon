import { useCallback, type KeyboardEvent, type RefObject } from 'react';

export interface NavGroup {
	start: number;
	length: number;
}

interface GridNavOptions {
	slugs: RefObject<string[]>;
	groups: RefObject<NavGroup[]>;
}

const NAV_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']);

function columnCount(tile: HTMLElement) {
	const grid = tile.closest('.g-grid');
	const items = grid ? Array.from(grid.children) : [];
	if (items.length === 0) return 1;
	const top = (items[0] as HTMLElement).offsetTop;
	let count = 0;
	for (const item of items) {
		if ((item as HTMLElement).offsetTop !== top) break;
		count++;
	}
	return Math.max(1, count);
}

export function useGridNav({ slugs, groups }: GridNavOptions) {
	return useCallback(
		(event: KeyboardEvent<HTMLElement>) => {
			if (!NAV_KEYS.has(event.key) || event.altKey || event.ctrlKey || event.metaKey) return;
			const tile = (event.target as HTMLElement).closest<HTMLElement>('[data-tile]');
			if (!tile) return;

			const list = slugs.current;
			const index = list.indexOf(tile.dataset.slug ?? '');
			if (index === -1) return;

			const sections = groups.current;
			const gi = sections.findIndex((g) => index >= g.start && index < g.start + g.length);
			const group = sections[gi];
			const local = index - group.start;
			const cols = columnCount(tile);
			let target = index;

			switch (event.key) {
				case 'ArrowLeft':
					target = Math.max(0, index - 1);
					break;
				case 'ArrowRight':
					target = Math.min(list.length - 1, index + 1);
					break;
				case 'Home':
					target = 0;
					break;
				case 'End':
					target = list.length - 1;
					break;
				case 'ArrowDown': {
					if (local + cols < group.length) {
						target = index + cols;
					} else if (gi < sections.length - 1) {
						const next = sections[gi + 1];
						target = next.start + Math.min(local % cols, next.length - 1);
					}
					break;
				}
				case 'ArrowUp': {
					if (local - cols >= 0) {
						target = index - cols;
					} else if (gi > 0) {
						const prev = sections[gi - 1];
						const lastRow = Math.floor((prev.length - 1) / cols) * cols;
						target = prev.start + Math.min(lastRow + (local % cols), prev.length - 1);
					}
					break;
				}
			}

			event.preventDefault();
			if (target !== index) document.getElementById(`tile-${list[target]}`)?.focus();
		},
		[slugs, groups]
	);
}
