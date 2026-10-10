'use client';

import { useEffect, useRef } from 'react';
import { PlayGlyph, SearchGlyph, SlidersGlyph, XGlyph } from '@/components/ui/glyphs';
import { preloadAllLetters } from '@/lib/icon-registry';
import { siteConfig } from '@/site.config';

interface ToolbarProps {
	query: string;
	onQuery: (value: string) => void;
	onPlayAll: () => void;
	onOpenSettings: () => void;
}

const { features } = siteConfig;

export function Toolbar({ query, onQuery, onPlayAll, onOpenSettings }: ToolbarProps) {
	const input = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!features.keyboardShortcuts) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
			const target = event.target as HTMLElement | null;
			if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
			event.preventDefault();
			input.current?.focus();
			input.current?.select();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	return (
		<div className="border-b-hair bg-canvas sticky top-(--header-h) z-20 flex h-(--toolbar-h) items-center gap-3 px-4 sm:px-6">
			<div className="border-hair rounded-control bg-surface focus-within:border-border-strong flex h-(--control-h) min-w-0 flex-1 items-center gap-2 px-3 sm:max-w-md">
				<SearchGlyph className="text-subtle shrink-0" />
				<input
					ref={input}
					type="search"
					aria-label="Search icons"
					placeholder="Search icons"
					autoComplete="off"
					spellCheck={false}
					value={query}
					onFocus={() => preloadAllLetters()}
					onChange={(event) => onQuery(event.target.value)}
					onKeyDown={(event) => {
						if (event.key !== 'Escape') return;
						if (query) onQuery('');
						else event.currentTarget.blur();
					}}
					className="text-text placeholder:text-subtle min-w-0 flex-1 bg-transparent text-sm outline-none"
				/>
				{query ? (
					<button
						type="button"
						aria-label="Clear search"
						onClick={() => {
							onQuery('');
							input.current?.focus();
						}}
						className="text-subtle hover:text-text rounded-sm flex size-5 shrink-0 items-center justify-center"
					>
						<XGlyph width={14} height={14} />
					</button>
				) : features.keyboardShortcuts ? (
					<kbd
						aria-hidden="true"
						className="border-hair text-subtle font-mono hidden rounded-sm px-1.5 text-xs sm:block"
					>
						/
					</kbd>
				) : null}
			</div>
			<div className="flex-1" />
			{features.playAll ? (
				<button
					type="button"
					onClick={onPlayAll}
					className="border-hair rounded-control bg-surface text-text hover:border-border-strong duration-fast flex h-(--control-h) shrink-0 items-center gap-2 px-3 text-sm font-medium transition-colors"
				>
					<PlayGlyph width={14} height={14} />
					<span className="hidden sm:inline">Play all visible</span>
					<span className="sm:hidden">Play</span>
				</button>
			) : null}
			<button
				type="button"
				onClick={onOpenSettings}
				className="g-settings-btn border-hair rounded-control bg-surface text-text hover:border-border-strong duration-fast h-(--control-h) shrink-0 items-center gap-2 px-3 text-sm font-medium transition-colors"
			>
				<SlidersGlyph width={14} height={14} />
				Settings
			</button>
		</div>
	);
}
