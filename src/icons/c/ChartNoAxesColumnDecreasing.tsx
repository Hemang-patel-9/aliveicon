'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const barVariants = {
	normal: (custom: number) => ({
		y1: custom,
		y2: 20,
		transition: { duration: 0.3 },
	}),
	animate: (custom: number) => ({
		y1: [20, custom],
		y2: 20,
		transition: { duration: 0.6, ease: 'easeInOut' },
	}),
};

export const ChartNoAxesColumnDecreasing = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.line
						x1="6"
						x2="6"
						custom={4}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="12"
						x2="12"
						custom={10}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="18"
						x2="18"
						custom={16}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartNoAxesColumnDecreasing.displayName = 'ChartNoAxesColumnDecreasing';
