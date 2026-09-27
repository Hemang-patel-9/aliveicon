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
		transition: {
			duration: 0.4,
		},
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

const rectVariants = {
	normal: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
		},
	},
	animate: {
		opacity: [0, 1],
		scale: [0.8, 1],
		transition: {
			duration: 0.7,
			ease: 'easeInOut',
		},
	},
};

export const AlignVerticalDistributeCenter = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M22 17h-3" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M22 7h-5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M5 17H2" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M7 7H2" variants={pathVariants} animate={controls} initial="normal" />
					<motion.rect
						x="5"
						y="14"
						width="14"
						height="6"
						rx="2"
						variants={rectVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.rect
						x="7"
						y="4"
						width="10"
						height="6"
						rx="2"
						variants={rectVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

AlignVerticalDistributeCenter.displayName = 'AlignVerticalDistributeCenter';
