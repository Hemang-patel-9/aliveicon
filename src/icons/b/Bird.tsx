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

export const Bird = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M16 7h.01" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path
						d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="m20 7 2 .5-2 .5"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path d="M10 18v3" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path
						d="M14 17.75V21"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M7 18a6 6 0 0 0 3.84-10.61"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

Bird.displayName = 'Bird';
