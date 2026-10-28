'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: {
		y: 0,
		x: 0,
		transition: { duration: 0.2, type: 'spring', stiffness: 200, damping: 25 },
	},
	animate: {
		y: -1.5,
		x: [-1, 1, -1, 1, -1, 0],
		transition: {
			x: { duration: 0.3, repeat: Infinity, ease: 'linear' },
			y: { duration: 0.2, type: 'spring', stiffness: 200, damping: 25 },
		},
	},
};

const secondaryPathVariants: Variants = {
	normal: {
		y: 0,
		x: 0,
		transition: { duration: 0.2, type: 'spring', stiffness: 200, damping: 25 },
	},
	animate: {
		y: -2.5,
		x: [-2, 2, -2, 2, -2, 0],
		transition: {
			x: { duration: 0.3, repeat: Infinity, ease: 'linear' },
			y: { duration: 0.2, type: 'spring', stiffness: 200, damping: 25 },
		},
	},
};

const AlarmClockPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { cycleMs: 700 });

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
					style={{ overflow: 'visible' }}
				>
					<motion.circle
						cx="12"
						cy="13"
						r="8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 3 2 6"
						variants={secondaryPathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 6-3-3"
						variants={secondaryPathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6.38 18.7 4 21"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17.64 18.67 20 21"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						x1="9"
						y1="13"
						x2="15"
						y2="13"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.line
						y1="10"
						x1="12"
						y2="16"
						x2="12"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

AlarmClockPlus.displayName = 'AlarmClockPlus';

export { AlarmClockPlus };
