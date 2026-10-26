'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.45, delay, ease: 'easeInOut' },
	}),
};

const Grid3x2 = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M15 3v18"
						variants={drawVariants}
						custom={0.4}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 12h18"
						variants={drawVariants}
						custom={0.32}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 3v18"
						variants={drawVariants}
						custom={0.24}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="3"
						y="3"
						width="18"
						height="18"
						rx="2"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Grid3x2.displayName = 'Grid3x2';

export { Grid3x2 };
