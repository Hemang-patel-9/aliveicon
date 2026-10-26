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

const cardVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const GalleryVerticalEnd = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M7 2h10"
						variants={drawVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 6h14"
						variants={drawVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						width="18"
						height="12"
						x="3"
						y="10"
						rx="2"
						variants={cardVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GalleryVerticalEnd.displayName = 'GalleryVerticalEnd';

export { GalleryVerticalEnd };
