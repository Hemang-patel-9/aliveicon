'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const outlineVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const markVariants: Variants = {
	normal: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		opacity: [0, 1],
		scale: [0.6, 1],
		transition: { duration: 0.25, delay: 0.25 + i * 0.08, ease: 'easeOut' },
	}),
};

const StrokeLineJoinRound = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M3 3h8a10 10 0 0110 10v8"
						variants={outlineVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 13H3"
						variants={markVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 13h1a1 1 0 011 1v1"
						variants={markVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M11 21v-2.002"
						variants={markVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

StrokeLineJoinRound.displayName = 'StrokeLineJoinRound';

export { StrokeLineJoinRound };
