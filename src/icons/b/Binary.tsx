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

export const Binary = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						x="14"
						y="14"
						width="4"
						height="6"
						rx="2"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.rect
						x="6"
						y="4"
						width="4"
						height="6"
						rx="2"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path d="M6 20h4" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M14 10h4" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M6 14h2v6" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M14 4h2v6" variants={pathVariants} animate={controls} initial="normal" />
				</svg>
			</div>
		);
	}
);

Binary.displayName = 'Binary';
