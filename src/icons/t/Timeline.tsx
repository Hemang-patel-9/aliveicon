'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const slideVariants: Variants = {
	normal: { x: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		x: [-1.5, 0],
		opacity: [0, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const Timeline = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M4 12h.01"
						variants={popVariants}
						custom={0.16}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 16h.01"
						variants={popVariants}
						custom={0.24}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 20h.01"
						variants={popVariants}
						custom={0.32}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 4h.01"
						variants={popVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 8h.01"
						variants={popVariants}
						custom={0.08}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9.414 13.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 12z"
						variants={slideVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9.414 21.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 20z"
						variants={slideVariants}
						custom={0.35}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9.414 5.414A2 2 0 0 0 10.828 6H19a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 4z"
						variants={slideVariants}
						custom={0.05}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Timeline.displayName = 'Timeline';

export { Timeline };
