'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const SolarPanel = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M11 2h2"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m14.28 14-4.56 8"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m21 22-1.558-4H4.558"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 10v2"
						variants={drawVariants}
						custom={3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z"
						variants={drawVariants}
						custom={4}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 2a4 4 0 0 1-4 4"
						variants={drawVariants}
						custom={5}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m8.66 7.66 1.41 1.41"
						variants={drawVariants}
						custom={6}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

SolarPanel.displayName = 'SolarPanel';

export { SolarPanel };
