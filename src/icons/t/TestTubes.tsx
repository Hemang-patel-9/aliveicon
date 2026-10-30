'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shakeVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		x: [0, -0.8, 0.8, -0.5, 0],
		transition: { duration: 0.6, delay, ease: 'easeInOut' },
	}),
};

const liquidVariants: Variants = {
	normal: { x: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		x: [0, -0.8, 0.8, -0.5, 0],
		rotate: [0, -12, 10, -5, 0],
		transition: { duration: 0.6, delay, ease: 'easeInOut' },
	}),
};

const TestTubes = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={shakeVariants} custom={0} initial="normal" animate={controls}>
						<path d="M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2" />
						<path d="M3 2h7" />
					</motion.g>
					<motion.g variants={shakeVariants} custom={0.1} initial="normal" animate={controls}>
						<path d="M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2" />
						<path d="M14 2h7" />
					</motion.g>
					<motion.path
						d="M9 16H4"
						variants={liquidVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20 16h-5"
						variants={liquidVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TestTubes.displayName = 'TestTubes';

export { TestTubes };
