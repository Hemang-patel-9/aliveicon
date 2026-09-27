'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const CarFront = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M7 14h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M17 14h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.rect
						width="18"
						height="8"
						x="3"
						y="10"
						rx="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M5 18v2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M19 18v2" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

CarFront.displayName = 'CarFront';
