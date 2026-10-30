'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const armVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, 18, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const Turntable = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M10 12.01h.01" />
					<motion.path
						d="M18 8v4a8 8 0 0 1-1.07 4"
						variants={armVariants}
						style={{ originX: '100%', originY: '0%' }}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="10"
						cy="12"
						r="4"
						variants={drawVariants}
						custom={[0.1, 0, 0.6]}
						initial="normal"
						animate={controls}
					/>
					<rect x="2" y="4" width="20" height="16" rx="2" />
				</svg>
			</div>
		);
	}
);

Turntable.displayName = 'Turntable';

export { Turntable };
