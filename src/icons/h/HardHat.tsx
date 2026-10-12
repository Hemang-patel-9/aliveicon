'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bobVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0, -0.8, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const HardHat = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"
						variants={bobVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 6a6 6 0 0 1 6 6v3"
						variants={bobVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 15v-3a6 6 0 0 1 6-6"
						variants={bobVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="2"
						y="15"
						width="20"
						height="4"
						rx="1"
						variants={bobVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

HardHat.displayName = 'HardHat';

export { HardHat };
