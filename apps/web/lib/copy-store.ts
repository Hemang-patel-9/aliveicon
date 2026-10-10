import { useSyncExternalStore } from 'react';

interface CopyState {
	slug: string | null;
	message: string;
}

const listeners = new Set<() => void>();
let state: CopyState = { slug: null, message: '' };
let timer: ReturnType<typeof setTimeout> | undefined;

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
};

function emit() {
	listeners.forEach((listener) => listener());
}

async function writeText(text: string) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		const area = document.createElement('textarea');
		area.value = text;
		area.setAttribute('readonly', '');
		area.style.position = 'fixed';
		area.style.opacity = '0';
		document.body.appendChild(area);
		area.select();
		let ok = false;
		try {
			ok = document.execCommand('copy');
		} catch {}
		area.remove();
		return ok;
	}
}

export async function copyText(slug: string, text: string, label: string) {
	const ok = await writeText(text);
	clearTimeout(timer);
	state = ok ? { slug, message: `Copied ${label}` } : { slug: null, message: 'Copy failed' };
	emit();
	timer = setTimeout(() => {
		state = { slug: null, message: '' };
		emit();
	}, 1600);
	return ok;
}

export function useIsCopied(slug: string) {
	return useSyncExternalStore(
		subscribe,
		() => state.slug === slug,
		() => false
	);
}

export function useCopyMessage() {
	return useSyncExternalStore(
		subscribe,
		() => state.message,
		() => ''
	);
}
