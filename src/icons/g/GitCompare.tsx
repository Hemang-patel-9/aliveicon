'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.45, delay, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const GitCompare = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.circle
						cx="18"
						cy="18"
						r="3"
						variants={popVariants}
						custom={0.45}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="6"
						cy="6"
						r="3"
						variants={popVariants}
						custom={0.35}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13 6h3a2 2 0 0 1 2 2v7"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M11 18H8a2 2 0 0 1-2-2V9"
						variants={drawVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GitCompare.displayName = 'GitCompare';

export { GitCompare };
