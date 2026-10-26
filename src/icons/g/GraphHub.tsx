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
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const GraphHub = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						cx="12"
						cy="7"
						r="4"
						variants={popVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="4"
						cy="19"
						r="2"
						variants={popVariants}
						custom={0.4}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="19"
						r="2"
						variants={popVariants}
						custom={0.48}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="20"
						cy="19"
						r="2"
						variants={popVariants}
						custom={0.56}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 7a4 4 0 0 0-4 4v6"
						variants={drawVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 11v6"
						variants={drawVariants}
						custom={0.15}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 7a4 4 0 0 1 4 4v6"
						variants={drawVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GraphHub.displayName = 'GraphHub';

export { GraphHub };
