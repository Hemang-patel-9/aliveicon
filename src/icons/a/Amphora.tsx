'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: { duration: 0.4 },
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'linear',
		},
	},
};

export const Amphora = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10 5H8a2 2 0 0 0 0 4h.68"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 5h2a2 2 0 0 1 0 4h-.68"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M18 22H6" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M9 2h6" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

Amphora.displayName = 'Amphora';
