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
		transition: { duration: 0.2 },
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const Rainbow = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M22 17a10 10 0 0 0-20 0"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 17a6 6 0 0 1 12 0"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10 17a2 2 0 0 1 4 0"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Rainbow.displayName = 'Rainbow';
