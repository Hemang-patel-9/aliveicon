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
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const AlignEndHorizontal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						width="6"
						height="16"
						x="4"
						y="2"
						rx="2"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.rect
						width="6"
						height="9"
						x="14"
						y="9"
						rx="2"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path d="M22 22H2" variants={pathVariants} animate={controls} initial="normal" />
				</svg>
			</div>
		);
	}
);

AlignEndHorizontal.displayName = 'AlignEndHorizontal';
