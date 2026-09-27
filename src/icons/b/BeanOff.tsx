'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const BeanOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const pathVariants = {
			normal: {
				pathLength: 1,
				opacity: 1,
			},
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					duration: 0.7,
					ease: 'easeInOut',
				},
			},
		};

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
						d="M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5.341 10.62a4 4 0 0 0 6.487 1.208"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="2"
						y1="2"
						x2="22"
						y2="22"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BeanOff.displayName = 'BeanOff';
