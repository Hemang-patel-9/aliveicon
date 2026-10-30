'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const liftVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1.5, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
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

const Tickets = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8"
						variants={liftVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 10V8"
						variants={drawVariants}
						custom={[0.1, 1, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 14v1"
						variants={drawVariants}
						custom={[0.2, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 19v2"
						variants={drawVariants}
						custom={[0.3, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<rect x="2" y="8" width="20" height="13" rx="2" />
				</svg>
			</div>
		);
	}
);

Tickets.displayName = 'Tickets';

export { Tickets };
