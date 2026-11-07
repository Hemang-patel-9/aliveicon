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

const Grid3x3Off = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M8.656 3H19a2 2 0 012 2v10.343"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20.656 15H21"
						variants={drawVariants}
						custom={0.06}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20.414 20.414A2 2 0 0119 21H5a2 2 0 01-2-2V5a2 2 0 01.586-1.414"
						variants={drawVariants}
						custom={0.12}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 9h6v12"
						variants={drawVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 9h-6.344"
						variants={drawVariants}
						custom={0.26}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 15h12v6"
						variants={drawVariants}
						custom={0.32}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 9.344V3"
						variants={drawVariants}
						custom={0.38}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 3v.344"
						variants={drawVariants}
						custom={0.38}
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

Grid3x3Off.displayName = 'Grid3x3Off';

export { Grid3x3Off };
