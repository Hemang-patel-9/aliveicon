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

const SquareCenterlineDashedVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 12H2"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10 12H8"
						variants={drawVariants}
						custom={3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 12h-2"
						variants={drawVariants}
						custom={4}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 12h-2"
						variants={drawVariants}
						custom={5}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

SquareCenterlineDashedVertical.displayName = 'SquareCenterlineDashedVertical';

export { SquareCenterlineDashedVertical };
