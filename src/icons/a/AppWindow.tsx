'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
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
			duration: 0.6,
			ease: 'linear',
		},
	},
};

export const AppWindow = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						x="2"
						y="4"
						width="20"
						height="16"
						rx="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M10 4v4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M2 8h20" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M6 4v4" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

AppWindow.displayName = 'AppWindow';
