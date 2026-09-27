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

export const Cast = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 12a9 9 0 0 1 8 8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 16a5 5 0 0 1 4 4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="2"
						y1="20"
						x2="2.01"
						y2="20"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Cast.displayName = 'Cast';
