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
			duration: 0.6,
			ease: 'easeInOut',
			staggerChildren: 0.05,
		},
	},
};

export const CircleArrowLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.circle
						cx="12"
						cy="12"
						r="10"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M16 12H8" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="m12 8-4 4 4 4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CircleArrowLeft.displayName = 'CircleArrowLeft';
