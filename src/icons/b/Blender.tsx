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

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const Blender = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M8 14a2 2 0 0 0-1.963 1.615l-1.018 5.193A1 1 0 0 0 6 22h12a1 1 0 0 0 .981-1.192l-1.018-5.193A2 2 0 0 0 16 14z"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="m17 2-1 12"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M8.006 14 7 2"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="M7.565 8.787A5 5 0 0 0 12 8a5 5 0 0 1 4.56-.75"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
					<motion.path
						d="M19 2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 .688 1.5"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={4}
					/>
					<motion.path
						d="M12 18h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
				</svg>
			</div>
		);
	}
);

Blender.displayName = 'Blender';

export { Blender };
