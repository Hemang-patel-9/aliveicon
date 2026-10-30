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

const nudgeVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const PilcrowRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 3v11"
						variants={drawVariants}
						custom={[0.15, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10 9H7a1 1 0 0 1 0-6h8"
						variants={drawVariants}
						custom={[0, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 3v11"
						variants={drawVariants}
						custom={[0.25, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.g variants={nudgeVariants} initial="normal" animate={controls}>
						<path d="m18 14 4 4H2" />
						<path d="m22 18-4 4" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

PilcrowRight.displayName = 'PilcrowRight';

export { PilcrowRight };
