'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 1.2, ease: 'easeInOut' },
	},
};

const arrowVariants: Variants = {
	normal: { x: 0, opacity: 1 },
	animate: {
		x: [0, 2, 0, 2, 0],
		opacity: [1, 0.7, 1, 0.7, 1],
		transition: { duration: 1.2, ease: 'easeInOut' },
	},
};

const BetweenHorizontalStart = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						width="13"
						height="7"
						x="8"
						y="3"
						rx="1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m2 9 3 3-3 3"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						width="13"
						height="7"
						x="8"
						y="14"
						rx="1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BetweenHorizontalStart.displayName = 'BetweenHorizontalStart';

export { BetweenHorizontalStart };
