'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const rollVariants: Variants = {
	normal: { y: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0],
		rotate: [0, -30, 10, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, delay, ease: 'easeInOut' },
	}),
};

const BallWave = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
						variants={drawVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.g
						variants={rollVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M7.757 13.243a2 6 45 1 0 8.486-8.486 2 6 45 1 0-8.486 8.486" />
						<circle cx="12" cy="9" r="6" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

BallWave.displayName = 'BallWave';

export { BallWave };
