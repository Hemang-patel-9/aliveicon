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
		transition: { duration: 0.4 },
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

export const AlignCenterVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M12 2v20" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path
						d="M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

AlignCenterVertical.displayName = 'AlignCenterVertical';
