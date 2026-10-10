'use client';

import { memo, Suspense, useMemo } from 'react';
import { chunkId } from '@/lib/hydration-gate';
import type { Icon } from '@/lib/icons';
import { siteConfig } from '@/site.config';
import { ChunkGate } from './ChunkGate';
import { IconTile, type TileIconProps } from './IconTile';

const { hydrateChunkSize, eagerChunks } = siteConfig.performance;

const lettersOf = (chunk: Icon[]) => [...new Set(chunk.map((icon) => icon.letter))].sort();

export interface GridData {
	cols: 'auto' | 'fixed';
	style: string;
	preview: string;
	names: 'on' | 'off';
	namePos: string;
}

interface LetterSectionProps {
	letter: string | null;
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

	return (
		<section
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
			>
				{chunks.map((chunk, index) => {
					const id = chunkId(prefix, chunk[0].slug);
					const placeholders = chunk.map((icon) => (
						<li key={icon.name} className="g-item" data-chunk={id} aria-hidden="true" />
					));

					return (
						<Suspense key={id} fallback={placeholders}>
							<ChunkGate
								id={id}
								letters={lettersOf(chunk)}
								eager={chunkOffset + index < eagerChunks}
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
						</Suspense>
					);
				})}
			</ul>
		</section>
	);
}

export const LetterSection = memo(LetterSectionView);
