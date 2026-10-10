import { THEME_KEY } from './theme';

export type ThemeChoice = 'light' | 'dark' | 'system';

const listeners = new Set<() => void>();
let mediaBound = false;

const isChoice = (value: unknown): value is ThemeChoice =>
	value === 'light' || value === 'dark' || value === 'system';

export function resolveTheme(choice: ThemeChoice): 'light' | 'dark' {
	if (choice !== 'system') return choice;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(choice: ThemeChoice) {
	const root = document.documentElement;
	root.setAttribute('data-theme', resolveTheme(choice));
	root.setAttribute('data-theme-choice', choice);
}

function emit() {
	listeners.forEach((listener) => listener());
}

export function setThemeChoice(choice: ThemeChoice) {
	try {
		localStorage.setItem(THEME_KEY, choice);
	} catch {}
	apply(choice);
	emit();
}

export function subscribeTheme(listener: () => void) {
	listeners.add(listener);
	if (!mediaBound) {
		mediaBound = true;
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			const choice = document.documentElement.getAttribute('data-theme-choice');
			if (choice === 'system') apply('system');
			emit();
		});
	}
	return () => {
		listeners.delete(listener);
	};
}

export function getThemeChoice(fallback: ThemeChoice): ThemeChoice {
	const value = document.documentElement.getAttribute('data-theme-choice');
	return isChoice(value) ? value : fallback;
}
