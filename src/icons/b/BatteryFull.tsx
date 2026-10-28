'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shellVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const barVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => {
		const start = 0.5 + i * 0.3;
		return {
			opacity: [0, 0, 1],
			transition: { duration: start + 0.3, times: [0, start / (start + 0.3), 1] },
		};
	},
};

const BatteryFull = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						x="2"
						y="7"
						width="16"
						height="10"
						rx="2"
						ry="2"
						variants={shellVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="22"
						y1="11"
						x2="22"
						y2="13"
						variants={shellVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="6"
						y1="11"
						x2="6"
						y2="13"
						custom={0}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="10"
						y1="11"
						x2="10"
						y2="13"
						custom={1}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="14"
						y1="11"
						x2="14"
						y2="13"
						custom={2}
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BatteryFull.displayName = 'BatteryFull';

export { BatteryFull };
