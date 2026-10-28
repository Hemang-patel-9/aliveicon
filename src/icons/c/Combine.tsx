'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const targetVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.85, 1],
		transition: { duration: 0.45, delay: 0.4, ease: 'easeInOut' },
	},
};

const Combine = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" />
					<path d="M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" />
					<motion.path
						d="m7 15 3 3"
						custom={0}
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m7 21 3-3H5a2 2 0 0 1-2-2v-2"
						custom={1}
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="14"
						y="14"
						width="7"
						height="7"
						rx="1"
						style={{ originX: '50%', originY: '50%' }}
						variants={targetVariants}
						initial="normal"
						animate={controls}
					/>
					<rect x="3" y="3" width="7" height="7" rx="1" />
				</svg>
			</div>
		);
	}
);

Combine.displayName = 'Combine';

export { Combine };
