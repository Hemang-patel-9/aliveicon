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

export const Blinds = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M3 3h18" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M20 7H8" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M20 11H8" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M10 19h10" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M8 15h12" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M4 3v14" variants={pathVariants} animate={controls} initial="normal" />
					<motion.circle
						cx="4"
						cy="19"
						r="2"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

Blinds.displayName = 'Blinds';
