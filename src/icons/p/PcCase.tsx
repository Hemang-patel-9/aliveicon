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

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const PcCase = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						width="14"
						height="20"
						x="5"
						y="2"
						rx="2"
						variants={drawVariants}
						custom={[0, 0, 0.6]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 14h.01"
						variants={popVariants}
						custom={0.5}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 6h6"
						variants={drawVariants}
						custom={[0.25, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 10h6"
						variants={drawVariants}
						custom={[0.35, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

PcCase.displayName = 'PcCase';

export { PcCase };
