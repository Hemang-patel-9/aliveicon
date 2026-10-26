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
		transition: { duration: 0.45, delay, ease: 'easeInOut' },
	}),
};

const spikeVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [1, 1.4, 1],
		transition: { duration: 0.35, delay, ease: 'easeInOut' },
	}),
};

const GermOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m11 2 .925 1.848"
						variants={spikeVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13 15h.01"
						variants={popVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13.424 7.768a2 2 0 112.808 2.808"
						variants={drawVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m16 21-1-2.472"
						variants={spikeVariants}
						custom={0.15}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16.988 16.988A12 12 0 019 20a5 5 0 01-2.759-9.171 8.8 8.8 0 002.307-2.28"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m19 2-1 1.804"
						variants={spikeVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m2 19 2.746-1.373"
						variants={spikeVariants}
						custom={0.25}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m2 2 20 20"
						variants={drawVariants}
						custom={0.45}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 16-2.474-2.13a12 12 0 001.376-3.786 6 6 0 00-10.313-5.151"
						variants={drawVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 5-1.804 1"
						variants={spikeVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m3 10 2 2"
						variants={spikeVariants}
						custom={0.35}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 16h.01"
						variants={popVariants}
						custom={0.4}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 20v2"
						variants={spikeVariants}
						custom={0.4}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GermOff.displayName = 'GermOff';

export { GermOff };
