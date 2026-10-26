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
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const gatherVariants: Variants = {
	normal: { x: 0, y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (offset: number) => ({
		x: [offset, 0],
		y: [offset, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeOut' },
	}),
};

const Group = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M3 7V5c0-1.1.9-2 2-2h2"
						variants={drawVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17 3h2c1.1 0 2 .9 2 2v2"
						variants={drawVariants}
						custom={0.28}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 17v2c0 1.1-.9 2-2 2h-2"
						variants={drawVariants}
						custom={0.36}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 21H5c-1.1 0-2-.9-2-2v-2"
						variants={drawVariants}
						custom={0.44}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						width="7"
						height="5"
						x="7"
						y="7"
						rx="1"
						variants={gatherVariants}
						custom={-2}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						width="7"
						height="5"
						x="10"
						y="12"
						rx="1"
						variants={gatherVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Group.displayName = 'Group';

export { Group };
