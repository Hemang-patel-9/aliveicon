'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
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

const Pizza = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m12 14-1 1"
						variants={popVariants}
						custom={0.35}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m13.75 18.25-1.25 1.42"
						variants={popVariants}
						custom={0.45}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12"
						variants={drawVariants}
						custom={[0, 0, 0.45]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18.8 9.3a1 1 0 0 0 2.1 7.7"
						variants={drawVariants}
						custom={[0.1, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<path d="M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z" />
				</svg>
			</div>
		);
	}
);

Pizza.displayName = 'Pizza';

export { Pizza };
