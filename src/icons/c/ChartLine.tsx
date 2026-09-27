'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

export const ChartLine = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M3 3v16a2 2 0 0 0 2 2h16"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 9l-5 5-4-4-3 3"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartLine.displayName = 'ChartLine';
