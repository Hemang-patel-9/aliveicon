'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			staggerChildren: 0.05,
		},
	},
};

export const Biohazard = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.circle
						cx="12"
						cy="11.9"
						r="2"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="m8.9 10.1 1.4.8"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="m15.1 10.1-1.4.8"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M12 13.9v1.6"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M13.5 5.4c-1-.2-2-.2-3 0"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M17 16.4c.7-.7 1.2-1.6 1.5-2.5"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M5.5 13.9c.3.9.8 1.8 1.5 2.5"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

Biohazard.displayName = 'Biohazard';
