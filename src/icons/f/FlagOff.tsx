'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const waveVariants: Variants = {
	normal: { skewY: 0, transition: { duration: 0.2 } },
	animate: {
		skewY: [0, -6, 4, -2, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
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

const FlagOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g
						variants={waveVariants}
						style={{ originX: '0%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
						<path d="M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347" />
					</motion.g>
					<motion.path
						d="m2 2 20 20"
						variants={drawVariants}
						custom={[0.4, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<path d="M4 22V4" />
				</svg>
			</div>
		);
	}
);

FlagOff.displayName = 'FlagOff';

export { FlagOff };
