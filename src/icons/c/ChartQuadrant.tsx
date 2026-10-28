'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const lineVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: i * 0.12, ease: 'easeOut' },
	}),
};

const dotVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [0.3, 1.6, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: 0.4 + i * 0.1, ease: 'easeOut' },
	}),
};

const ChartQuadrant = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M13 3v18"
						custom={0}
						variants={lineVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 12h18"
						custom={1}
						variants={lineVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M3 3v16a2 2 0 002 2h16" />
					<motion.circle
						cx="17.5"
						cy="5.5"
						r="0.5"
						fill="currentColor"
						custom={0}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="19.5"
						cy="16.5"
						r="0.5"
						fill="currentColor"
						custom={1}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="7.5"
						cy="16.5"
						r="0.5"
						fill="currentColor"
						custom={2}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="7.5"
						cy="7.5"
						r="0.5"
						fill="currentColor"
						custom={3}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartQuadrant.displayName = 'ChartQuadrant';

export { ChartQuadrant };
