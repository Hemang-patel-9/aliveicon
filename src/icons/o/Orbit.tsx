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
			duration: 1,
			ease: 'easeInOut',
		},
	},
};

const circleVariants = {
	normal: {
		scale: 1,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		scale: [0, 1.2, 1],
		opacity: [0, 1, 1],
		transition: {
			duration: 1,
			ease: 'easeInOut',
		},
	},
};

export const Orbit = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M20.341 6.484A10 10 0 0 1 10.266 21.85"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3.659 17.516A10 10 0 0 1 13.74 2.152"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="12"
						r="3"
						variants={circleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="19"
						cy="5"
						r="2"
						variants={circleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="5"
						cy="19"
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

Orbit.displayName = 'Orbit';
