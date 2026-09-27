'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

export const Citrus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19.65 15.66A8 8 0 0 1 8.35 4.34"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m14 10-5.5 5.5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 17.85V10H6.15"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Citrus.displayName = 'Citrus';
