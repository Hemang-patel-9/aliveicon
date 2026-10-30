'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const capVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const PillBottle = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					style={{ overflow: 'visible' }}
				>
					<motion.path
						d="M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4"
						variants={drawVariants}
						custom={[0.2, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
					<motion.rect
						width="16"
						height="5"
						x="4"
						y="2"
						rx="1"
						variants={capVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

PillBottle.displayName = 'PillBottle';

export { PillBottle };
