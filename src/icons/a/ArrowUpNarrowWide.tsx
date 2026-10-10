'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -3, 0],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const barVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.3, delay: i * 0.1, ease: 'easeOut' },
	}),
};

const ArrowUpNarrowWide = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m3 8 4-4 4 4"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M7 4v16" />
					<motion.path
						d="M11 12h4"
						variants={barVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M11 16h7"
						variants={barVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M11 20h10"
						variants={barVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArrowUpNarrowWide.displayName = 'ArrowUpNarrowWide';

export { ArrowUpNarrowWide };
