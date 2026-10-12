'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pullVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: (direction: number) => ({
		x: [0, direction, 0],
		y: [0, -direction, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	}),
};

const Unplug = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m19 5 3-3"
						variants={pullVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="m2 22 3-3"
						variants={pullVariants}
						initial="normal"
						animate={controls}
						custom={-1}
					/>
					<motion.path
						d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"
						variants={pullVariants}
						initial="normal"
						animate={controls}
						custom={-1}
					/>
					<motion.path
						d="M7.5 13.5 10 11"
						variants={pullVariants}
						initial="normal"
						animate={controls}
						custom={-1}
					/>
					<motion.path
						d="M10.5 16.5 13 14"
						variants={pullVariants}
						initial="normal"
						animate={controls}
						custom={-1}
					/>
					<motion.path
						d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"
						variants={pullVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
				</svg>
			</div>
		);
	}
);

Unplug.displayName = 'Unplug';

export { Unplug };
