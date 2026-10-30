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

const pulseVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.15, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Projector = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M5 7 3 5"
						variants={drawVariants}
						custom={[0.1, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 6V3"
						variants={drawVariants}
						custom={[0.18, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m13 7 2-2"
						variants={drawVariants}
						custom={[0.26, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="9"
						cy="13"
						r="3"
						variants={pulseVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
					<path d="M16 16h2" />
				</svg>
			</div>
		);
	}
);

Projector.displayName = 'Projector';

export { Projector };
