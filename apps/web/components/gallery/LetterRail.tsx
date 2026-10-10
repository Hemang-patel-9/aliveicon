'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/site.config';

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
const { motion, layout } = siteConfig.theme;

interface LetterRailProps {
	anchors: Record<string, string>;
}

export function LetterRail({ anchors }: LetterRailProps) {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		let frame = 0;
		const update = () => {
			frame = 0;
			const line = layout.headerHeight + layout.toolbarHeight + 24;
			let current: string | null = null;
			for (const letter of LETTERS) {
				const id = anchors[letter];
				const el = id ? document.getElementById(id) : null;
				if (!el) continue;
				if (el.getBoundingClientRect().top <= line) current = letter;
				else break;
			}
			setActive(current);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, [anchors]);

	const jump = (letter: string) => {
		const el = document.getElementById(anchors[letter]);
		if (!el) return;
		const reduce =
			motion.respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const far = Math.abs(el.getBoundingClientRect().top) > window.innerHeight * 2;
		el.scrollIntoView({ behavior: reduce || far ? 'auto' : 'smooth', block: 'start' });
	};

	return (
		<nav aria-label="Jump to letter" className="g-rail">
			{LETTERS.map((letter) => {
				const enabled = Boolean(anchors[letter]);
				return (
					<button
						key={letter}
						type="button"
						disabled={!enabled}
						aria-label={`Jump to ${letter.toUpperCase()}`}
						aria-current={active === letter ? 'true' : undefined}
						onClick={() => jump(letter)}
						className={cn(
							'rounded-sm duration-fast font-mono flex size-6 items-center justify-center text-xs uppercase transition-colors',
							!enabled && 'text-subtle opacity-30',
							enabled && active !== letter && 'text-muted hover:text-text',
							enabled && active === letter && 'bg-accent text-on-accent'
						)}
					>
						{letter}
					</button>
				);
			})}
		</nav>
	);
}
