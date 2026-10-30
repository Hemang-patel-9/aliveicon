'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const TableOfContents = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M16 5H3"
						variants={drawVariants}
						custom={[0, 1, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 12H3"
						variants={drawVariants}
						custom={[0.12, 1, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 19H3"
						variants={drawVariants}
						custom={[0.24, 1, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 5h.01"
						variants={popVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 12h.01"
						variants={popVariants}
						custom={0.42}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 19h.01"
						variants={popVariants}
						custom={0.54}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TableOfContents.displayName = 'TableOfContents';

export { TableOfContents };
