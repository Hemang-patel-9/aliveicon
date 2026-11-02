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

const SignpostBig = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 9H4L2 7l2-2h6"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 5h6l2 2-2 2h-6"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10 22V4a2 2 0 1 1 4 0v18"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 22h8"
						variants={drawVariants}
						custom={3}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

SignpostBig.displayName = 'SignpostBig';

export { SignpostBig };
