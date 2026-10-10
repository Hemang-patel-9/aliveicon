'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shakeVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 1, -1, 1, 0],
		transition: { duration: 0.5, ease: 'linear' },
	},
};

const slashVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.3, ease: 'easeInOut' },
	},
};

const AlarmClockOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M6.87 6.87a8 8 0 1 0 11.26 11.26"
						variants={shakeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19.9 14.25a8 8 0 0 0-9.15-9.15"
						variants={shakeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="m22 6-3-3" variants={shakeVariants} initial="normal" animate={controls} />
					<motion.path
						d="M6.26 18.67 4 21"
						variants={shakeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m2 2 20 20"
						variants={slashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M4 4 2 6" variants={shakeVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

AlarmClockOff.displayName = 'AlarmClockOff';

export { AlarmClockOff };
