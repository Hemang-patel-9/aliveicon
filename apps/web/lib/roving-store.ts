import { useSyncExternalStore } from 'react';

let active: string | null = null;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
};

export function setActiveTile(slug: string | null) {
	if (active === slug) return;
	active = slug;
	listeners.forEach((listener) => listener());
}

export function useIsTabbable(slug: string, fallbackSlug: string | undefined) {
	return useSyncExternalStore(
		subscribe,
		() => active === slug || (active === null && slug === fallbackSlug),
		() => slug === fallbackSlug
	);
}
