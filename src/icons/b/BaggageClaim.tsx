'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: (custom: number) => ({
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
};

const BaggageClaim = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn(className)}
				style={{
					width: size,
					height: size,
					display: 'inline-block',
					...style,
				}}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.15}
					/>
					<motion.rect
						width="13"
						height="8"
						x="8"
						y="6"
						rx="1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.3}
					/>
					<motion.circle
						cx="18"
						cy="20"
						r="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.45}
					/>
					<motion.circle
						cx="9"
						cy="20"
						r="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.6}
					/>
				</svg>
			</div>
		);
	}
);

BaggageClaim.displayName = 'BaggageClaim';

export { BaggageClaim };
