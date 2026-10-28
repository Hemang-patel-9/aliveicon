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
	normal: { x: 0, scale: 1 },
	animate: (distance: number) => ({
		x: [0, distance, 0],
		scale: [1, 1.1, 1],
		transition: { duration: 0.6, delay: 0.8, ease: 'easeInOut' },
	}),
};

const UnfoldHorizontal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M16 12h6"
						custom={0}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 12H2"
						custom={1}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 2v2"
						custom={2}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 8v2"
						custom={3}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 14v2"
						custom={4}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 20v2"
						custom={5}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 9l-3 3 3 3"
						custom={2}
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 15l3-3-3-3"
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

UnfoldHorizontal.displayName = 'UnfoldHorizontal';

export { UnfoldHorizontal };
