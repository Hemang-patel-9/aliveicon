import { useSyncExternalStore } from 'react';

const nonces = new Map<string, number>();
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
};

export function playSlugs(slugs: string[]) {
	for (const slug of slugs) nonces.set(slug, (nonces.get(slug) ?? 0) + 1);
	listeners.forEach((listener) => listener());
}

export function usePlayNonce(slug: string) {
	return useSyncExternalStore(
		subscribe,
		() => nonces.get(slug) ?? 0,
		() => 0
	);
}
