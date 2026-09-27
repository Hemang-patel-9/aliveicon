'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: {
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: { duration: 0.4 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

export const CircleDivide = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.line
						x1="8"
						x2="16"
						y1="12"
						y2="12"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="12"
						x2="12"
						y1="16"
						y2="16"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="12"
						x2="12"
						y1="8"
						y2="8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="12"
						r="10"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CircleDivide.displayName = 'CircleDivide';
