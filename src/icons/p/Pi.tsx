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

const Pi = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.line
						x1="9"
						x2="9"
						y1="4"
						y2="20"
						variants={drawVariants}
						custom={[0.2, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 7c0-1.7 1.3-3 3-3h13"
						variants={drawVariants}
						custom={[0, 0, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 20c-1.7 0-3-1.3-3-3V4"
						variants={drawVariants}
						custom={[0.3, 1, 0.35]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Pi.displayName = 'Pi';

export { Pi };
