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

const SquareCenterlineDashedHorizontal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 20v2"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 14v2"
						variants={drawVariants}
						custom={3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 8v2"
						variants={drawVariants}
						custom={4}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 2v2"
						variants={drawVariants}
						custom={5}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

SquareCenterlineDashedHorizontal.displayName = 'SquareCenterlineDashedHorizontal';

export { SquareCenterlineDashedHorizontal };
