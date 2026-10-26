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
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const GraphStar = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m12.342 9.316 1.764-3.527"
						variants={drawVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m12.59 14.545 2.35 3.759"
						variants={drawVariants}
						custom={0.15}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m13.982 12.332 4.03.447"
						variants={drawVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5.414 17.586 8.88 14.12"
						variants={drawVariants}
						custom={0.25}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9.025 9.742 5.317 5.505"
						variants={drawVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="11"
						cy="12"
						r="3"
						variants={popVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="15"
						cy="4"
						r="2"
						variants={popVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="16"
						cy="20"
						r="2"
						variants={popVariants}
						custom={0.36}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="20"
						cy="13"
						r="2"
						variants={popVariants}
						custom={0.42}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="4"
						cy="19"
						r="2"
						variants={popVariants}
						custom={0.48}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="4"
						cy="4"
						r="2"
						variants={popVariants}
						custom={0.54}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GraphStar.displayName = 'GraphStar';

export { GraphStar };
