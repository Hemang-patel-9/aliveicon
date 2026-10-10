'use client';

import { memo, type KeyboardEvent } from 'react';
import { CheckGlyph, CopyGlyph } from '@/components/ui/glyphs';
import { useIsCopied } from '@/lib/copy-store';
import { renderIcon } from '@/lib/icon-registry';
import type { Icon } from '@/lib/icons';
import { usePlayNonce } from '@/lib/play-store';
import { setActiveTile, useIsTabbable } from '@/lib/roving-store';

export interface TileIconProps {
	size: number;
	hoverable: boolean;
	loopOnHover: boolean;
	animateOnClick: boolean;
	autoAnimateOnLoad: boolean;
}

interface IconTileProps {
	icon: Icon;
	chunk: string;
	label: string;
	copyLabel: string;
	iconProps: TileIconProps;
	fallbackSlug: string | undefined;
	showNew: boolean;
	onActivate: (icon: Icon) => void;
	onCopy: (icon: Icon) => void;
}

function IconTileView({
	icon,
	chunk,
	label,
	copyLabel,
	iconProps,
	fallbackSlug,
	showNew,
	onActivate,
	onCopy,
}: IconTileProps) {
	const { slug } = icon;
	const nonce = usePlayNonce(slug);
	const copied = useIsCopied(slug);
	const tabbable = useIsTabbable(slug, fallbackSlug);

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onActivate(icon);
		}
	};

	return (
		<li className="g-item" data-letter={icon.letter} data-chunk={chunk}>
			<div
				id={`tile-${slug}`}
				role="button"
				tabIndex={tabbable ? 0 : -1}
				aria-label={icon.target ? `${label}, deprecated name for ${icon.target}` : label}
				className="g-tile"
				data-tile=""
				data-slug={slug}
				data-name={label}
				onClick={() => onActivate(icon)}
				onKeyDown={onKeyDown}
				onFocus={() => setActiveTile(slug)}
			>
				<span className="g-icon">
					{renderIcon(
						icon.name,
						{
							size: iconProps.size,
							hoverable: iconProps.hoverable,
							loopOnHover: iconProps.loopOnHover,
							animateOnClick: iconProps.animateOnClick,
							autoAnimateOnLoad: iconProps.autoAnimateOnLoad || nonce > 0,
						},
						nonce
					)}
				</span>
				<span className="g-name" title={label}>
					{label}
				</span>
			</div>
			{icon.target ? (
				<span className="g-badge">Deprecated</span>
			) : showNew && icon.isNew ? (
				<span className="g-badge">New</span>
			) : null}
			<button
				type="button"
				className="g-copy"
				data-copied={copied}
				aria-label={`Copy ${copyLabel} for ${label}`}
				tabIndex={-1}
				onClick={() => onCopy(icon)}
			>
				{copied ? <CheckGlyph width={14} height={14} /> : <CopyGlyph width={14} height={14} />}
			</button>
		</li>
	);
}

export const IconTile = memo(IconTileView);
