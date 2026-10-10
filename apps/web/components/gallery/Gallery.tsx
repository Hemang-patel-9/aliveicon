'use client';

import {
	Suspense,
	useCallback,
	useDeferredValue,
	useEffect,
	useMemo,
	useRef,
	useState,
	type CSSProperties,
} from 'react';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { SettingsSheet } from '@/components/settings/SettingsSheet';
import { copyText, useCopyMessage } from '@/lib/copy-store';
import { CLIENT_PREFIX, SERVER_PREFIX } from '@/lib/hydration-gate';
import { icons, iconsWithAliases, type Icon } from '@/lib/icons';
import { playSlugs } from '@/lib/play-store';
import { setActiveTile } from '@/lib/roving-store';
import { searchItems, tokenize } from '@/lib/search';
import { matchesDefaults } from '@/lib/settings/schema';
import { getSettings, useSettings } from '@/lib/settings/store';
import { copySnippet } from '@/lib/snippets';
import { siteConfig } from '@/site.config';
import type { TileIconProps } from './IconTile';
import { LetterRail } from './LetterRail';
import { LetterSection, type GridData } from './LetterSection';
import { Toolbar } from './Toolbar';
import { useGridNav, type NavGroup } from './useGridNav';
import { useLazyHydration } from './useLazyHydration';

const { layout } = siteConfig.theme;
const { features, site } = siteConfig;
const { hydrateChunkSize } = siteConfig.performance;

const COPY_LABELS = { import: 'import line', jsx: 'JSX', name: 'name' } as const;

interface Group {
	letter: string | null;
	items: Icon[];
}

function groupByLetter(items: Icon[]): Group[] {
	const groups: Group[] = [];
	for (const item of items) {
		const last = groups[groups.length - 1];
		if (last && last.letter === item.letter) last.items.push(item);
		else groups.push({ letter: item.letter, items: [item] });
	}
	return groups;
}

export function Gallery() {
	const settings = useSettings();
	const [query, setQuery] = useState('');
	const deferredQuery = useDeferredValue(query);
	const [sheetOpen, setSheetOpen] = useState(false);
	const copyMessage = useCopyMessage();

	const pool = settings.showAliases ? iconsWithAliases : icons;
	const searching = tokenize(deferredQuery).length > 0;
	const results = useMemo(() => searchItems(pool, deferredQuery), [pool, deferredQuery]);

	const groups = useMemo<Group[]>(
		() =>
			settings.groupByLetter && !searching
				? groupByLetter(results)
				: [{ letter: null, items: results }],
		[settings.groupByLetter, searching, results]
	);

	const slugsRef = useRef<string[]>([]);
	const navGroupsRef = useRef<NavGroup[]>([]);

	useEffect(() => {
		slugsRef.current = results.map((icon) => icon.slug);
		let start = 0;
		navGroupsRef.current = groups.map((group) => {
			const entry = { start, length: group.items.length };
			start += group.items.length;
			return entry;
		});
		setActiveTile(null);
	}, [results, groups]);

	const prefix = !searching && matchesDefaults(settings) ? SERVER_PREFIX : CLIENT_PREFIX;
	const chunkOffsets = useMemo(() => {
		const offsets: number[] = [];
		for (let i = 0; i < groups.length; i++) {
			const before =
				i === 0 ? 0 : offsets[i - 1] + Math.ceil(groups[i - 1].items.length / hydrateChunkSize);
			offsets.push(before);
		}
		return offsets;
	}, [groups]);

	const onKeyDown = useGridNav({ slugs: slugsRef, groups: navGroupsRef });
	useLazyHydration(groups, prefix);

	const iconProps = useMemo<TileIconProps>(
		() => ({
			size: settings.iconSize,
			hoverable: settings.hoverable,
			loopOnHover: settings.loopOnHover,
			animateOnClick: settings.animateOnClick,
			autoAnimateOnLoad: settings.autoAnimateOnLoad,
		}),
		[
			settings.iconSize,
			settings.hoverable,
			settings.loopOnHover,
			settings.animateOnClick,
			settings.autoAnimateOnLoad,
		]
	);
	const deferredIconProps = useDeferredValue(iconProps);

	const grid = useMemo<GridData>(
		() => ({
			cols: settings.columnsMode,
			style: settings.tileStyle,
			preview: settings.preview,
			names: settings.showNames ? 'on' : 'off',
			namePos: settings.namePosition,
		}),
		[
			settings.columnsMode,
			settings.tileStyle,
			settings.preview,
			settings.showNames,
			settings.namePosition,
		]
	);

	const shellStyle = {
		'--g-gap': `${settings.gap}px`,
		'--g-tile-w': `${settings.tileWidth}px`,
		'--g-aspect': settings.tileAspect,
		'--g-cols-phone': settings.colsPhone,
		'--g-cols-tablet': settings.colsTablet,
		'--g-cols-desktop': settings.colsDesktop,
		'--g-icon-color': settings.iconColor === 'theme' ? undefined : settings.iconColor,
	} as CSSProperties;

	const copyIcon = useCallback((icon: Icon) => {
		const current = getSettings();
		void copyText(icon.slug, copySnippet(icon.name, current), icon.name);
	}, []);

	const activate = useCallback(
		(icon: Icon) => {
			copyIcon(icon);
		},
		[copyIcon]
	);

	const playAll = useCallback(() => {
		const top = layout.headerHeight + layout.toolbarHeight;
		const slugs: string[] = [];
		document.querySelectorAll<HTMLElement>('[data-tile]').forEach((el) => {
			const rect = el.getBoundingClientRect();
			if (rect.width > 0 && rect.bottom > top && rect.top < window.innerHeight) {
				slugs.push(el.dataset.slug ?? '');
			}
		});
		playSlugs(slugs);
	}, []);

	const closeSheet = useCallback(() => setSheetOpen(false), []);

	const anchors = useMemo(() => {
		const out: Record<string, string> = {};
		for (const group of groups) {
			if (group.letter) {
				out[group.letter] = `letter-${group.letter}`;
				continue;
			}
			for (const item of group.items) {
				if (!out[item.letter]) out[item.letter] = `tile-${item.slug}`;
			}
		}
		return out;
	}, [groups]);

	const fallbackSlug = results[0]?.slug;
	const showRail = settings.letterRail && !searching;
	const count = results.length;
	const summary = searching
		? `${count} ${count === 1 ? 'result' : 'results'} for “${deferredQuery.trim()}”`
		: `${count} icons`;

	return (
		<div className="g-shell" style={shellStyle}>
			<aside className="g-sidebar" aria-label="Gallery settings">
				<SettingsPanel />
			</aside>
			<div className="min-w-0">
				<Toolbar
					query={query}
					onQuery={setQuery}
					onPlayAll={playAll}
					onOpenSettings={() => setSheetOpen(true)}
				/>
				<div className="flex px-4 sm:px-6">
					<div className="min-w-0 flex-1 py-6" onKeyDown={onKeyDown}>
						<p role="status" className="text-muted mb-6 text-sm">
							{summary}
						</p>
						{count === 0 ? (
							<div className="flex flex-col items-center gap-3 py-24 text-center">
								<p className="text-text text-base font-medium">No icons match “{query.trim()}”</p>
								<p className="text-muted text-sm">
									Try a shorter word, or search by part of a name.
								</p>
								<div className="flex items-center gap-4 pt-2 text-sm">
									<button
										type="button"
										onClick={() => setQuery('')}
										className="text-text hover:text-muted rounded-sm underline underline-offset-4"
									>
										Clear search
									</button>
									<a
										href={`${site.repoUrl}/issues/new/choose`}
										target="_blank"
										rel="noreferrer"
										className="text-text hover:text-muted rounded-sm underline underline-offset-4"
									>
										Request this icon
									</a>
								</div>
							</div>
						) : (
							<div className="flex flex-col gap-10">
								{groups.map((group, index) => (
									<Suspense key={group.letter ?? 'all'} fallback={null}>
										<LetterSection
											letter={group.letter}
											items={group.items}
											prefix={prefix}
											chunkOffset={chunkOffsets[index]}
											grid={grid}
											kebab={settings.nameFormat === 'kebab'}
											copyLabel={COPY_LABELS[settings.copyFormat]}
											iconProps={deferredIconProps}
											fallbackSlug={fallbackSlug}
											showNew={features.newBadge}
											onActivate={activate}
											onCopy={copyIcon}
										/>
									</Suspense>
								))}
							</div>
						)}
					</div>
					{showRail ? <LetterRail anchors={anchors} /> : null}
				</div>
			</div>
			<SettingsSheet open={sheetOpen} onClose={closeSheet} />
			<div aria-live="polite" className="sr-only">
				{copyMessage}
			</div>
		</div>
	);
}
