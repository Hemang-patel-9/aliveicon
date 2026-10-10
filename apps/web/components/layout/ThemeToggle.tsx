'use client';

import { useSyncExternalStore } from 'react';
import {
	getThemeChoice,
	setThemeChoice,
	subscribeTheme,
	type ThemeChoice,
} from '@/lib/theme-store';
import { MonitorGlyph, MoonGlyph, SunGlyph } from '@/components/ui/glyphs';
import { cn } from '@/lib/cn';

interface ThemeToggleProps {
	defaultChoice: ThemeChoice;
	allowSystem: boolean;
}

const options: { value: ThemeChoice; label: string; Glyph: typeof SunGlyph }[] = [
	{ value: 'light', label: 'Light theme', Glyph: SunGlyph },
	{ value: 'dark', label: 'Dark theme', Glyph: MoonGlyph },
	{ value: 'system', label: 'System theme', Glyph: MonitorGlyph },
];

export function ThemeToggle({ defaultChoice, allowSystem }: ThemeToggleProps) {
	const choice = useSyncExternalStore(
		subscribeTheme,
		() => getThemeChoice(defaultChoice),
		() => defaultChoice
	);

	return (
		<div
			role="group"
			aria-label="Theme"
			className="border-hair rounded-control bg-surface flex items-center gap-0.5 p-0.5"
		>
			{options
				.filter((option) => allowSystem || option.value !== 'system')
				.map(({ value, label, Glyph }) => (
					<button
						key={value}
						type="button"
						aria-label={label}
						aria-pressed={choice === value}
						onClick={() => setThemeChoice(value)}
						className={cn(
							'rounded-sm duration-fast flex size-7 items-center justify-center transition-colors',
							choice === value
								? 'bg-raised text-text border-hair'
								: 'text-subtle hover:text-text border border-transparent'
						)}
					>
						<Glyph />
					</button>
				))}
		</div>
	);
}
