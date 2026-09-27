'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: {
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const Calculator = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						width="16"
						height="20"
						x="4"
						y="2"
						rx="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="8"
						y1="6"
						x2="16"
						y2="6"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="16"
						y1="14"
						x2="16"
						y2="18"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					{[
						['16', '10'],
						['12', '10'],
						['8', '10'],
						['12', '14'],
						['8', '14'],
						['12', '18'],
						['8', '18'],
					].map(([x, y], i) => (
						<motion.path
							key={i}
							d={`M${x} ${y}h.01`}
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
					))}
				</svg>
			</div>
		);
	}
);

Calculator.displayName = 'Calculator';
