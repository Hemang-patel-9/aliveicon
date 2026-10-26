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

const GlobeOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929"
						variants={drawVariants}
						custom={0.08}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687"
						variants={drawVariants}
						custom={0.16}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17.656 12H22"
						variants={drawVariants}
						custom={0.24}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45"
						variants={drawVariants}
						custom={0.32}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 12h10"
						variants={drawVariants}
						custom={0.4}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m2 2 20 20"
						variants={drawVariants}
						custom={0.5}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GlobeOff.displayName = 'GlobeOff';

export { GlobeOff };
