'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const lineVariants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: { duration: 0.4 },
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.18,
			ease: 'easeInOut',
		},
	},
};

const middleRectVariants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: { duration: 0.4 },
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay: 0.2,
		},
	},
};

const topRectVariants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: { duration: 0.4 },
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.2,
			ease: 'easeInOut',
			delay: 0.4,
		},
	},
};

export const AlignVerticalJustifyEnd = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path d="M2 22h20" variants={lineVariants} initial="normal" animate={controls} />

					<motion.rect
						width="14"
						height="6"
						x="5"
						y="12"
						rx="2"
						variants={middleRectVariants}
						initial="normal"
						animate={controls}
					/>

					<motion.rect
						width="10"
						height="6"
						x="7"
						y="2"
						rx="2"
						variants={topRectVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

AlignVerticalJustifyEnd.displayName = 'AlignVerticalJustifyEnd';
