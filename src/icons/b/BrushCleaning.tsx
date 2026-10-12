'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const sweepVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -2, 2, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const BrushCleaning = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m16 22-1-4"
						variants={sweepVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"
						variants={sweepVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"
						variants={sweepVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="m8 22 1-4" variants={sweepVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

BrushCleaning.displayName = 'BrushCleaning';

export { BrushCleaning };
