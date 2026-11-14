'use client';

import { Fragment, memo, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { gridHeight, useGridMetrics } from '@/lib/grid-metrics';
import { chunkId } from '@/lib/hydration-gate';
import type { Icon } from '@/lib/icons';
import { useSectionRequested } from '@/lib/section-store';
import { siteConfig } from '@/site.config';
import { ChunkGate } from './ChunkGate';
import { IconTile, type TileIconProps } from './IconTile';

const { hydrateChunkSize, eagerChunks, inlineChunks, revealChunks, revealMargin } =
	siteConfig.performance;

const blocksOf = (chunk: Icon[]) => [...new Set(chunk.map((icon) => icon.block))].sort();

export interface GridData {
	cols: 'auto' | 'fixed';
	style: string;
	preview: string;
	names: 'on' | 'off';
	namePos: string;
}

interface LetterSectionProps {
	letter: string | null;
	sectionKey: string;
	initial: boolean;
	items: Icon[];
	prefix: string;
	chunkOffset: number;
	grid: GridData;
	kebab: boolean;
	copyLabel: string;
	iconProps: TileIconProps;
	fallbackSlug: string | undefined;
	showNew: boolean;
	onActivate: (icon: Icon) => void;
	onCopy: (icon: Icon) => void;
}

function LetterSectionView({
	letter,
	sectionKey,
	initial,
	items,
	prefix,
	chunkOffset,
	grid,
	kebab,
	copyLabel,
	iconProps,
	fallbackSlug,
	showNew,
	onActivate,
	onCopy,
}: LetterSectionProps) {
	const chunks = useMemo(() => {
		const out: Icon[][] = [];
		for (let i = 0; i < items.length; i += hydrateChunkSize) {
			out.push(items.slice(i, i + hydrateChunkSize));
		}
		return out;
	}, [items]);

	const requested = useSectionRequested(sectionKey);
	const full = initial || requested;
	const [revealed, setRevealed] = useState(0);
	const revealedRef = useRef(0);
	const sectionRef = useRef<HTMLElement>(null);
	const shownChunks = full ? chunks.length : Math.min(revealed, chunks.length);
	const pending = shownChunks < chunks.length;
	const metrics = useGridMetrics(pending);

	useEffect(() => {
		revealedRef.current = revealed;
	}, [revealed]);

	useEffect(() => {
		const el = sectionRef.current;
		if (full || !el || revealedRef.current >= chunks.length) return;
		let frame = 0;
		let shown = revealedRef.current;
		const step = () => {
			shown = Math.min(chunks.length, shown + revealChunks);
			setRevealed(shown);
			if (shown < chunks.length) frame = requestAnimationFrame(step);
		};
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return;
				observer.disconnect();
				frame = requestAnimationFrame(step);
			},
			{ rootMargin: `${revealMargin * 100}% 0px` }
		);
		observer.observe(el);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, [full, chunks.length]);

	return (
		<section
			ref={sectionRef}
			id={letter ? `letter-${letter}` : undefined}
			aria-label={letter ? `Icons starting with ${letter.toUpperCase()}` : 'Icons'}
			className="g-section"
			data-section=""
		>
			{letter ? (
				<h2 className="g-heading">
					<span className="text-text text-lg font-medium">{letter.toUpperCase()}</span>
					<span className="text-subtle font-mono text-xs">{items.length}</span>
				</h2>
			) : null}
			<ul
				className="g-grid"
				data-cols={grid.cols}
				data-style={grid.style}
				data-preview={grid.preview}
				data-names={grid.names}
				data-name-pos={grid.namePos}
				style={pending ? { minHeight: gridHeight(items.length, metrics) } : undefined}
			>
				{chunks.slice(0, shownChunks).map((chunk, index) => {
					const id = chunkId(prefix, chunk[0].slug);
					const inline = initial && chunkOffset + index < inlineChunks;
					const body = (
						<ChunkGate
							id={id}
							blocks={blocksOf(chunk)}
							eager={!initial || chunkOffset + index < eagerChunks}
							inline={inline}
						>
							{chunk.map((icon) => (
								<IconTile
									key={icon.name}
									icon={icon}
									chunk={id}
									label={kebab ? icon.slug : icon.name}
									copyLabel={copyLabel}
									iconProps={iconProps}
									fallbackSlug={fallbackSlug}
									showNew={showNew}
									onActivate={onActivate}
									onCopy={onCopy}
								/>
							))}
						</ChunkGate>
					);
					if (inline) return <Fragment key={id}>{body}</Fragment>;

					const placeholders = chunk.map((icon) => (
						<li key={icon.name} className="g-item" data-chunk={id} aria-hidden="true" />
					));
					return (
						<Suspense key={id} fallback={placeholders}>
							{body}
						</Suspense>
					);
				})}
			</ul>
		</section>
	);
}

export const LetterSection = memo(LetterSectionView);
