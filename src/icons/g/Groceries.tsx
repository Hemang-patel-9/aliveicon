'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bounceVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: ({ x = 0, y = 0, delay = 0 }: { x?: number; y?: number; delay?: number }) => ({
		x: [0, x, 0],
		y: [0, y, 0],
		transition: { duration: 0.5, delay, ease: 'easeInOut' },
	}),
};

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const Groceries = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 15h4"
						variants={drawVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19.424 11.095a2.5 2.5 0 00.471-2.309 2 2 0 00.424-3.286 2 2 0 00-2.143-3.322 2 2 0 00-.676.502 2 2 0 00-3.287.424 2.5 2.5 0 00-3.189 2.06A3 3 0 0012 11l4-4"
						variants={bounceVariants}
						custom={{ y: -1, delay: 0 }}
						initial="normal"
						animate={controls}
					/>
					<path d="M4 12.006A1 1 0 014.994 11H19a1 1 0 011 1v7a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
					<motion.path
						d="M7 11a4 4 0 01-4-4V5a1 1 0 011-1h2a4 4 0 013.584 2.222"
						variants={bounceVariants}
						custom={{ y: -1, delay: 0.1 }}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Groceries.displayName = 'Groceries';

export { Groceries };
