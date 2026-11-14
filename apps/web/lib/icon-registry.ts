import { createElement, type ReactElement } from 'react';
import type { AnimatedIconProps } from 'aliveicon';
import type { IconComponent } from './icons';
import { loaders } from './generated/block-loaders';
import { markFulfilled, type Tracked } from './settled';

const components = new Map<string, IconComponent>();
const loaded = new Set<string>();
const pending = new Map<string, Promise<void>>();
const groups = new Map<string, Promise<void>>();

export function isBlockLoaded(block: string) {
	return loaded.has(block);
}

export function loadBlock(block: string): Promise<void> {
	const cached = pending.get(block);
	if (cached) return cached;

	const load = loaders[block];
	const promise = (load ? load() : Promise.resolve({ components: {} })).then((module) => {
		for (const [name, component] of Object.entries(module.components)) {
			components.set(name, component as IconComponent);
		}
		loaded.add(block);
	});
	pending.set(block, promise);
	return promise;
}

export function loadBlocks(blocks: string[]): Promise<void> {
	const key = blocks.join(' ');
	const cached = groups.get(key);
	if (cached) return cached;

	const promise: Tracked = Promise.all(blocks.map(loadBlock)).then(() => markFulfilled(promise));
	if (blocks.every(isBlockLoaded)) markFulfilled(promise);
	groups.set(key, promise);
	return promise;
}

export function renderIcon(name: string, props: AnimatedIconProps, key: number): ReactElement {
	return createElement(components.get(name) as IconComponent, { ...props, key });
}

export function preloadAllBlocks(onIdle: () => void = () => {}) {
	const queue = Object.keys(loaders).filter((block) => !loaded.has(block));
	const next = () => {
		const block = queue.shift();
		if (!block) {
			onIdle();
			return;
		}
		loadBlock(block).then(() => setTimeout(next, 120));
	};
	next();
}
