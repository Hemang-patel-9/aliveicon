'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: (custom: number) => ({
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			delay: custom,
		},
	}),
};

const Backpack = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn(className)}
				style={{
					width: size,
					height: size,
					display: 'inline-block',
					...style,
				}}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M8 10h8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.1}
					/>
					<motion.path
						d="M8 18h8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.2}
					/>
					<motion.path
						d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.3}
					/>
					<motion.path
						d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.4}
					/>
				</svg>
			</div>
		);
	}
);

Backpack.displayName = 'Backpack';

export { Backpack };
