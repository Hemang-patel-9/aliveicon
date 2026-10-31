'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const blinkVariants: Variants = {
	normal: { scaleY: 1, transition: { duration: 0.2 } },
	animate: {
		scaleY: [1, 0.15, 1],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const FaceSlightlySmilingPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M13.267 2.08a10 10 0 108.653 8.653" />
					<motion.g variants={blinkVariants} initial="normal" animate={controls}>
						<path d="M15 10V9" />
						<path d="M9 10V9" />
					</motion.g>
					<motion.g variants={popVariants} custom={0.3} initial="normal" animate={controls}>
						<path d="M16 5h6" />
						<path d="M19 2v6" />
					</motion.g>
					<motion.path
						d="M16.472 15a6 6 0 01-8.943 0"
						variants={drawVariants}
						custom={[0.15, 0.5, 0.4]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FaceSlightlySmilingPlus.displayName = 'FaceSlightlySmilingPlus';

export { FaceSlightlySmilingPlus };
