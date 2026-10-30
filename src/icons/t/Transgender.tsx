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

const pulseVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.1, 1],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const Transgender = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 16v6"
						variants={drawVariants}
						custom={[0.1, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 20h-4"
						variants={drawVariants}
						custom={[0.35, 0.5, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 2h4v4"
						variants={drawVariants}
						custom={[0.35, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m2 2 7.17 7.17"
						variants={drawVariants}
						custom={[0.1, 1, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 5.355V2h3.357"
						variants={drawVariants}
						custom={[0.35, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 2-7.17 7.17"
						variants={drawVariants}
						custom={[0.1, 1, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 5 5 8"
						variants={drawVariants}
						custom={[0.35, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="12"
						r="4"
						variants={pulseVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Transgender.displayName = 'Transgender';

export { Transgender };
