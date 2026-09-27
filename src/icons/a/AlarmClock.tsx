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

const AlarmClock = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { cycleMs: 700 });

		return (
			<div className={cn(className)} {...iconProps}>
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
					style={{ overflow: 'visible' }}
				>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M18 20.5L19.5 22"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M6 20.5L4.5 22"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M21 13C21 17.968 16.968 22 12 22C7.032 22 3 17.968 3 13C3 8.032 7.032 4 12 4C16.968 4 21 8.032 21 13Z"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M15.339 15.862L12.549 14.197C12.063 13.909 11.667 13.216 11.667 12.649V8.95898"
					/>
					<motion.path
						variants={secondaryPathVariants}
						initial="normal"
						animate={controls}
						d="M18 2L21.747 5.31064"
					/>
					<motion.path
						variants={secondaryPathVariants}
						initial="normal"
						animate={controls}
						d="M6 2L2.25304 5.31064"
					/>
				</svg>
			</div>
		);
	}
);

AlarmClock.displayName = 'AlarmClock';
export { AlarmClock };
