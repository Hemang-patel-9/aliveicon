'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const scrubVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 1, -1, 0],
		y: [0, 1, -1, 1, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const ToothbrushSparkles = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={popVariants} custom={0.2} initial="normal" animate={controls}>
						<path d="M10 3H8" />
						<path d="M9 2v2" />
					</motion.g>
					<motion.g variants={scrubVariants} initial="normal" animate={controls}>
						<path d="M14.586 11.414 22 4" />
						<path d="M15 11a8 8 0 01-.429.4" />
						<path d="m2 22 7-7c1.857-1.857 3.714-1.99 5.571-3.6l-1.985-1.986A2 2 0 0114 6a2 2 0 012-2 2 2 0 013.262-1.552l2.152 2.138" />
					</motion.g>
					<motion.g variants={popVariants} custom={0.5} initial="normal" animate={controls}>
						<path d="M20 15v4" />
						<path d="M22 17h-4" />
					</motion.g>
					<motion.g variants={popVariants} custom={0.35} initial="normal" animate={controls}>
						<path d="M4 5v4" />
						<path d="M6 7H2" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ToothbrushSparkles.displayName = 'ToothbrushSparkles';

export { ToothbrushSparkles };
