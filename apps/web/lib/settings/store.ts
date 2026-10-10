import { useSyncExternalStore } from 'react';
import {
	decodeParams,
	defaults,
	encodeParams,
	fields,
	hasUrlSettings,
	sanitize,
	sanitizeAll,
	type SettingKey,
	type Settings,
} from './schema';

export const SETTINGS_KEY = 'aliveicon:settings:v1';

const listeners = new Set<() => void>();
let state: Settings = defaults;
let loaded = false;

function readStored(): Partial<Record<SettingKey, unknown>> {
	try {
		const raw = localStorage.getItem(SETTINGS_KEY);
		const parsed: unknown = raw ? JSON.parse(raw) : null;
		return parsed && typeof parsed === 'object' ? (parsed as Record<SettingKey, unknown>) : {};
	} catch {
		return {};
	}
}

function persist() {
	try {
		localStorage.setItem(SETTINGS_KEY, JSON.stringify(state));
	} catch {}
}

function ensureLoaded() {
	if (loaded || typeof window === 'undefined') return;
	loaded = true;
	const params = new URLSearchParams(window.location.search);
	const fromUrl = hasUrlSettings(params) ? decodeParams(params) : {};
	state = sanitizeAll({ ...readStored(), ...fromUrl });
}

function emit() {
	listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export function getSettings() {
	ensureLoaded();
	return state;
}

export function setSettings(patch: Partial<Record<SettingKey, unknown>>) {
	ensureLoaded();
	const next = { ...state } as Record<SettingKey, unknown>;
	let changed = false;
	for (const key of Object.keys(patch) as SettingKey[]) {
		const value = sanitize(key, patch[key]);
		if (next[key] !== value) {
			next[key] = value;
			changed = true;
		}
	}
	if (!changed) return;
	state = next as unknown as Settings;
	persist();
	emit();
}

export function resetSettings(keys?: SettingKey[]) {
	const list = keys ?? fields.map((f) => f.key);
	setSettings(Object.fromEntries(list.map((key) => [key, defaults[key]])));
}

export function shareUrl() {
	const params = encodeParams(getSettings());
	const query = params.toString();
	return `${window.location.origin}${window.location.pathname}${query ? `?${query}` : ''}`;
}

export function useSetting<K extends SettingKey>(key: K): Settings[K] {
	return useSyncExternalStore(
		subscribe,
		() => getSettings()[key],
		() => defaults[key]
	);
}

export function useSettings(): Settings {
	return useSyncExternalStore(subscribe, getSettings, () => defaults);
}
