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

const Headset = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"
						variants={bobVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 16v2a4 4 0 0 1-4 4h-5"
						variants={bobVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Headset.displayName = 'Headset';

export { Headset };
