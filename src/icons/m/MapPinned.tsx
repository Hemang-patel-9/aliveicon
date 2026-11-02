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

const MapPinned = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 01-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0112 0"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4.474 15h-.197a1 1 0 00-.969.753l-1.097 4.35a1.5 1.5 0 001.444 1.898L20.344 22a1.5 1.5 0 001.446-1.897l-1.098-4.35a1 1 0 00-.969-.753h-.197"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="8"
						r="2"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

MapPinned.displayName = 'MapPinned';

export { MapPinned };
