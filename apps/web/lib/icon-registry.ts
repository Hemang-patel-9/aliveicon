import { createElement, type ReactElement } from 'react';
import type { AnimatedIconProps } from 'aliveicon';
import type { IconComponent } from './icons';
import { loaders } from './generated/letter-loaders';
import { markFulfilled, type Tracked } from './settled';

const components = new Map<string, IconComponent>();
const loaded = new Set<string>();
const pending = new Map<string, Promise<void>>();
const groups = new Map<string, Promise<void>>();

export function isLetterLoaded(letter: string) {
	return loaded.has(letter);
}

export function loadLetter(letter: string): Promise<void> {
	const cached = pending.get(letter);
	if (cached) return cached;

	const load = loaders[letter];
	const promise = (load ? load() : Promise.resolve({ components: {} })).then((module) => {
		for (const [name, component] of Object.entries(module.components)) {
			components.set(name, component as IconComponent);
		}
		loaded.add(letter);
	});
	pending.set(letter, promise);
	return promise;
}

export function loadLetters(letters: string[]): Promise<void> {
	const key = letters.join('');
	const cached = groups.get(key);
	if (cached) return cached;

	const promise: Tracked = Promise.all(letters.map(loadLetter)).then(() => markFulfilled(promise));
	if (letters.every(isLetterLoaded)) markFulfilled(promise);
	groups.set(key, promise);
	return promise;
}

export function renderIcon(name: string, props: AnimatedIconProps, key: number): ReactElement {
	return createElement(components.get(name) as IconComponent, { ...props, key });
}

export function preloadAllLetters(onIdle: () => void = () => {}) {
	const queue = Object.keys(loaders).filter((letter) => !loaded.has(letter));
	const next = () => {
		const letter = queue.shift();
		if (!letter) {
			onIdle();
			return;
		}
		loadLetter(letter).then(() => setTimeout(next, 120));
	};
	next();
}
