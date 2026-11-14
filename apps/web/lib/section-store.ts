import { useSyncExternalStore } from 'react';

const requested = new Set<string>();
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
};

export function requestSection(key: string) {
	if (requested.has(key)) return;
	requested.add(key);
	listeners.forEach((listener) => listener());
}

export function useSectionRequested(key: string) {
	return useSyncExternalStore(
		subscribe,
		() => requested.has(key),
		() => false
	);
}
