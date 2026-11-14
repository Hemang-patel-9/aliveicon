import { useSyncExternalStore } from 'react';

export interface GridMetrics {
	cols: number;
	rowHeight: number;
	gap: number;
}

const FALLBACK_PER_ICON = 24;

let metrics: GridMetrics | null = null;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
};

export function setGridMetrics(next: GridMetrics) {
	if (
		metrics &&
		metrics.cols === next.cols &&
		metrics.rowHeight === next.rowHeight &&
		metrics.gap === next.gap
	) {
		return;
	}
	metrics = next;
	listeners.forEach((listener) => listener());
}

export function useGridMetrics(active: boolean) {
	return useSyncExternalStore(
		subscribe,
		() => (active ? metrics : null),
		() => null
	);
}

export function gridHeight(count: number, current: GridMetrics | null) {
	if (!current) return count * FALLBACK_PER_ICON;
	const rows = Math.ceil(count / current.cols);
	return rows * current.rowHeight + Math.max(0, rows - 1) * current.gap;
}
