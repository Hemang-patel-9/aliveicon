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
		transition: {
			duration: 0.4,
		},
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.7,
			ease: 'easeInOut',
		},
	},
};

export const AlignCenterHorizontal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M2 12h20" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path
						d="M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

AlignCenterHorizontal.displayName = 'AlignCenterHorizontal';
