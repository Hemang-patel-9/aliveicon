'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [1, 1.2, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const Grape = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M22 5V2l-5.89 5.89"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="16.6"
						cy="15.89"
						r="3"
						variants={popVariants}
						custom={0.35}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="8.11"
						cy="7.4"
						r="3"
						variants={popVariants}
						custom={0.25}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12.35"
						cy="11.65"
						r="3"
						variants={popVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="13.91"
						cy="5.85"
						r="3"
						variants={popVariants}
						custom={0.15}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="18.15"
						cy="10.09"
						r="3"
						variants={popVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="6.56"
						cy="13.2"
						r="3"
						variants={popVariants}
						custom={0.4}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="10.8"
						cy="17.44"
						r="3"
						variants={popVariants}
						custom={0.45}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="5"
						cy="19"
						r="3"
						variants={popVariants}
						custom={0.5}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Grape.displayName = 'Grape';

export { Grape };
