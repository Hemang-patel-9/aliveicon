'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, delay, ease: 'easeInOut' },
	}),
};

const bracketVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: ({ x = 0, y = 0, delay = 0 }: { x?: number; y?: number; delay?: number }) => ({
		x: [0, x, 0],
		y: [0, y, 0],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const GlobeCode = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M15.5 10 13 7.5 15.5 5"
						variants={bracketVariants}
						custom={{ x: -1.5, delay: 0.35 }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15.861 14A14.5 14.5 0 0112 22a14.48 14.48 0 010-20 10 10 0 109.888 11.5"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19.5 5 22 7.5 19.5 10"
						variants={bracketVariants}
						custom={{ x: 1.5, delay: 0.35 }}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 12h8.5"
						variants={drawVariants}
						custom={0.15}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

GlobeCode.displayName = 'GlobeCode';

export { GlobeCode };
