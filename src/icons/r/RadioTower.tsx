'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

export const RadioTower = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="9"
						r="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16.2 4.8c2 2 2.26 5.11.8 7.47"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M9.5 18h5" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="m8 22 4-11 4 11"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

RadioTower.displayName = 'RadioTower';
