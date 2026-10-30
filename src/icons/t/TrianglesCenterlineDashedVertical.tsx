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

const leftVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1.5, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const rightVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1.5, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const TrianglesCenterlineDashedVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 14v2"
						variants={drawVariants}
						custom={[0.22, 0, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 20v2"
						variants={drawVariants}
						custom={[0.28, 0, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 2v2"
						variants={drawVariants}
						custom={[0.1, 0, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 8v2"
						variants={drawVariants}
						custom={[0.16, 0, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20.288 16.703A1 1 0 0022 16V8a1 1 0 00-1.712-.703l-3.99 3.991a1 1 0 00-.001 1.424z"
						variants={leftVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3.712 16.703A1 1 0 012 16V8a1 1 0 011.712-.703l3.99 3.991a1 1 0 01.001 1.424z"
						variants={rightVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TrianglesCenterlineDashedVertical.displayName = 'TrianglesCenterlineDashedVertical';

export { TrianglesCenterlineDashedVertical };
