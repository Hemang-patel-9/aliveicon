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
		transition: { duration: 0.5, delay: i * 0.12, ease: 'easeInOut' },
	}),
};

const RemoveFormatting = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M4 7V4h16v3"
						custom={0}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 20h6"
						custom={1}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13 4L8 20"
						custom={2}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 15l5 5"
						custom={3}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20 15l-5 5"
						custom={4}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

RemoveFormatting.displayName = 'RemoveFormatting';

export { RemoveFormatting };
