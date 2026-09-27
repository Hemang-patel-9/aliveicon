'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const downArrowVariants = {
	normal: { y: 0 },
	animate: {
		y: [0, 3, 0],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

const upArrowVariants = {
	normal: { y: 0 },
	animate: {
		y: [0, -3, 0],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

export const ArrowDownUp = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M3 16l4 4 4-4"
						variants={downArrowVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M7 20V4" />
					<motion.path
						d="M21 8l-4-4-4 4"
						variants={upArrowVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M17 4v16" />
				</svg>
			</div>
		);
	}
);

ArrowDownUp.displayName = 'ArrowDownUp';
