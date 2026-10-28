'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const partVariants: Variants = {
	normal: { opacity: 1, scale: 1, y: 0, pathLength: 1 },
	animate: (i: number) => {
		const transition = { duration: 0.6, ease: 'easeInOut', delay: i * 0.05 };
		if (i < 4) return { opacity: [0, 1], scale: [0.6, 1], transition };
		if (i === 4) return { pathLength: [0, 1], opacity: [0, 1], transition };
		if (i === 5) return { y: [-10, 0], opacity: [0, 1], transition };
		return { scale: [0.8, 1], opacity: [0, 1], transition };
	},
};

const Replace = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M14 4a2 2 0 0 1 2-2"
						custom={0}
						variants={partVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 10a2 2 0 0 1-2-2"
						custom={1}
						variants={partVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20 2a2 2 0 0 1 2 2"
						custom={2}
						variants={partVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 8a2 2 0 0 1-2 2"
						custom={3}
						variants={partVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m3 7 3 3 3-3"
						custom={4}
						variants={partVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 10V5a3 3 0 0 1 3-3h1"
						custom={5}
						variants={partVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="2"
						y="14"
						width="8"
						height="8"
						rx="2"
						custom={6}
						variants={partVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Replace.displayName = 'Replace';

export { Replace };
