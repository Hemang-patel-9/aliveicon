'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const circleVariants: Variants = {
	normal: {
		rotate: 0,
		originX: '50%',
		originY: '50%',
		transition: { duration: 0.4 },
	},
	animate: {
		rotate: [0, 15, -15, 0],
		transition: { duration: 1.2, ease: 'easeInOut' },
	},
};

const bladeVariants: Variants = {
	normal: {
		rotate: 0,
		scale: 1,
		opacity: 1,
		originX: '50%',
		originY: '50%',
		transition: { duration: 0.4 },
	},
	animate: {
		rotate: [0, 10, -10, 0],
		scale: [1, 1.1, 0.9, 1],
		opacity: [1, 0.85, 1, 1],
		transition: { duration: 1.2, ease: 'easeInOut' },
	},
};

const Aperture = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.circle
						cx="12"
						cy="12"
						r="10"
						variants={circleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m14.31 8 5.74 9.94"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9.69 8h11.48"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m7.38 12 5.74-9.94"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9.69 16 3.95 6.06"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14.31 16H2.83"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m16.62 12-5.74 9.94"
						variants={bladeVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Aperture.displayName = 'Aperture';

export { Aperture };
