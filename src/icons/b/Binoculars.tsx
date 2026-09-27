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
			staggerChildren: 0.1,
		},
	},
};

export const Binoculars = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M10 10h4" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path
						d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M22 16 L2 16"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

Binoculars.displayName = 'Binoculars';
