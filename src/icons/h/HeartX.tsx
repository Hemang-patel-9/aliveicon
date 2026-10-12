'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const beatVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.2, 1, 1.12, 1],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const HeartX = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m15.5 12.5 5 5"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="m20.5 12.5-5 5"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M21.955 8.774a5.5 5.5 0 0 0-9.546-2.95.6.6 0 0 1-.818 0A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.508 5.332a2 2 0 0 0 2.57.352"
						variants={beatVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

HeartX.displayName = 'HeartX';

export { HeartX };
