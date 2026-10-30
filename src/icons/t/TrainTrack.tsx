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

const TrainTrack = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M2 17 17 2" />
					<motion.path
						d="m2 14 8 8"
						variants={drawVariants}
						custom={[0, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m5 11 8 8"
						variants={drawVariants}
						custom={[0.08, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m8 8 8 8"
						variants={drawVariants}
						custom={[0.16, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m11 5 8 8"
						variants={drawVariants}
						custom={[0.24, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m14 2 8 8"
						variants={drawVariants}
						custom={[0.32, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<path d="M7 22 22 7" />
				</svg>
			</div>
		);
	}
);

TrainTrack.displayName = 'TrainTrack';

export { TrainTrack };
