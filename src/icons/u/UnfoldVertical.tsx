'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const arrowVariants: Variants = {
	normal: { y: 0, scale: 1 },
	animate: (distance: number) => ({
		y: [0, distance, 0],
		scale: [1, 1.1, 1],
		transition: { duration: 0.6, delay: 0.8, ease: 'easeInOut' },
	}),
};

const UnfoldVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 22v-6"
						custom={0}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 8V2"
						custom={1}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 12H2"
						custom={2}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10 12H8"
						custom={3}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 12h-2"
						custom={4}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 12h-2"
						custom={5}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 5L12 2L9 5"
						custom={2}
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 19L12 22L9 19"
						custom={-2}
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

UnfoldVertical.displayName = 'UnfoldVertical';

export { UnfoldVertical };
