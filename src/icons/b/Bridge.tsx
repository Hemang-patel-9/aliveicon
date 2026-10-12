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

const Bridge = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 9.728V16"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M14 9.728V16"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M18 20V4"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="m22 11-4-4A7.5 7.5 0 0 1 6 7l-4 4"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="M22 16H2"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
					<motion.path
						d="M6 20V4"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={4}
					/>
				</svg>
			</div>
		);
	}
);

Bridge.displayName = 'Bridge';

export { Bridge };
