'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
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
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const boltVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		scale: [1, 1.2, 1],
		opacity: [1, 0.6, 1],
		transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
	},
};

const BatteryCharging = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { cycleMs: 800 });

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
						d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m11 7-3 5h4l-3 5"
						variants={boltVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="22"
						y1="11"
						x2="22"
						y2="13"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BatteryCharging.displayName = 'BatteryCharging';

export { BatteryCharging };
