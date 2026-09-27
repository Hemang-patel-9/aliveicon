'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const circleVariants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		scale: [0, 1.2, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const ChartNetwork = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M3 3v16a2 2 0 0 0 2 2h16"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m13.11 7.664 1.78 2.672"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m14.162 12.788-3.324 1.424"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m20 4-6.06 1.515"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="6"
						r="2"
						variants={circleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="16"
						cy="12"
						r="2"
						variants={circleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="9"
						cy="15"
						r="2"
						variants={circleVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartNetwork.displayName = 'ChartNetwork';
