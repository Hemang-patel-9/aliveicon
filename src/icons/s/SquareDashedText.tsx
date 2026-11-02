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

const SquareDashedText = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M14 21h1"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 3h1"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 3a2 2 0 0 1 2 2"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 14v1"
						variants={drawVariants}
						custom={3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 19a2 2 0 0 1-2 2"
						variants={drawVariants}
						custom={4}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 9v1"
						variants={drawVariants}
						custom={5}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 14v1"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 9v1"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 21a2 2 0 0 1-2-2"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 3a2 2 0 0 0-2 2"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 12h10"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 16h6"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 8h8"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 21h1"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 3h1"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

SquareDashedText.displayName = 'SquareDashedText';

export { SquareDashedText };
