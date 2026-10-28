'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.12, ease: 'easeOut' },
	}),
};

const ChessRook = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
				>
					<path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
					<motion.path
						d="M10 2v2"
						custom={1}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 2v2"
						custom={2}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="m17 18-1-9" />
					<motion.path
						d="M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2"
						custom={0}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M6 4h12" />
					<path d="m7 18 1-9" />
				</svg>
			</div>
		);
	}
);

ChessRook.displayName = 'ChessRook';

export { ChessRook };
