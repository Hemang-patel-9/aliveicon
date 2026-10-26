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

const arrowVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: ({ x = 0, y = 0, delay = 0 }: { x?: number; y?: number; delay?: number }) => ({
		x: [0, x, 0],
		y: [0, y, 0],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const GitPullRequestArrow = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						cx="5"
						cy="6"
						r="3"
						variants={popVariants}
						custom={0.35}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 9v12"
						variants={drawVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="19"
						cy="18"
						r="3"
						variants={popVariants}
						custom={0.45}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m15 9-3-3 3-3"
						variants={arrowVariants}
						custom={{ x: -2, delay: 0.3 }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 6h5a2 2 0 0 1 2 2v7"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GitPullRequestArrow.displayName = 'GitPullRequestArrow';

export { GitPullRequestArrow };
