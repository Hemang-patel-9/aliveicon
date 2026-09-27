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

export const Caravan = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="8"
						cy="19"
						r="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Caravan.displayName = 'Caravan';
