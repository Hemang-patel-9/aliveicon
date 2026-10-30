'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const shiverVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -0.5, 0.5, -0.5, 0.5, 0],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const ThermometerSnowflake = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m10 20-1.25-2.5L6 18"
						variants={drawVariants}
						custom={[0, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10 4 8.75 6.5 6 6"
						variants={drawVariants}
						custom={[0.06, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10.585 15H10"
						variants={drawVariants}
						custom={[0.12, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 12h6.5L10 9"
						variants={drawVariants}
						custom={[0.18, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"
						variants={shiverVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m4 10 1.5 2L4 14"
						variants={drawVariants}
						custom={[0.24, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m7 21 3-6-1.5-3"
						variants={drawVariants}
						custom={[0.3, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m7 3 3 6h2"
						variants={drawVariants}
						custom={[0.36, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ThermometerSnowflake.displayName = 'ThermometerSnowflake';

export { ThermometerSnowflake };
