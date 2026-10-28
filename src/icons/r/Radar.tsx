'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const beamVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0.6, 1],
		transition: { duration: 0.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
	},
};

const Radar = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M19.07 4.93A10 10 0 0 0 6.99 3.34"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M4 6h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M2.29 9.62A10 10 0 1 0 21.31 8.35"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16.24 7.76A6 6 0 1 0 8.23 16.67"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M12 18h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M17.99 11.66A6 6 0 0 1 15.77 16.67"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="12"
						r="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m13.41 10.59 5.66-5.66"
						variants={beamVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Radar.displayName = 'Radar';

export { Radar };
