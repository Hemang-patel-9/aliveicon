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

const Package = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"
						variants={drawVariants}
						custom={[0, 0, 0.6]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 22V12"
						variants={drawVariants}
						custom={[0.3, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.polyline
						points="3.29 7 12 12 20.71 7"
						variants={drawVariants}
						custom={[0.25, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m7.5 4.27 9 5.15"
						variants={drawVariants}
						custom={[0.4, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Package.displayName = 'Package';

export { Package };
