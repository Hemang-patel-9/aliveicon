'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const Birdhouse = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 18v4"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="m17 18 1.956-11.468"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
					<motion.path
						d="m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M4 18h16"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M7 18 5.044 6.532"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
					<motion.circle
						cx="12"
						cy="10"
						r="2"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
				</svg>
			</div>
		);
	}
);

Birdhouse.displayName = 'Birdhouse';

export { Birdhouse };
