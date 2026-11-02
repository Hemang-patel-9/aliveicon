'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const Snail = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="10"
						cy="13"
						r="8"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 3 19.1 5.2"
						variants={drawVariants}
						custom={3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 3 20.9 5.2"
						variants={drawVariants}
						custom={4}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Snail.displayName = 'Snail';

export { Snail };
