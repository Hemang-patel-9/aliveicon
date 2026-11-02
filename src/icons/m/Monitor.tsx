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

const Monitor = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						width="20"
						height="14"
						x="2"
						y="3"
						rx="2"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="8"
						x2="16"
						y1="21"
						y2="21"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="12"
						x2="12"
						y1="17"
						y2="21"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Monitor.displayName = 'Monitor';

export { Monitor };
