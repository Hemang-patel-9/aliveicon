'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const driveVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
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

const wheelVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		y: [0, -0.75, 0, -0.4, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const TruckElectric = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={driveVariants} initial="normal" animate={controls}>
						<path d="M14 19V7a2 2 0 0 0-2-2H9" />
						<path d="M15 19H9" />
						<path d="M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14" />
						<path d="M2 13v5a1 1 0 0 0 1 1h2" />
					</motion.g>
					<motion.path
						d="M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02"
						variants={drawVariants}
						custom={[0.1, 0, 0.45]}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="17"
						cy="19"
						r="2"
						variants={wheelVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="7"
						cy="19"
						r="2"
						variants={wheelVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TruckElectric.displayName = 'TruckElectric';

export { TruckElectric };
