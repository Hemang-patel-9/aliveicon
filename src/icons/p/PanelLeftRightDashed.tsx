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

const PanelLeftRightDashed = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M15 10V9"
						variants={drawVariants}
						custom={[0.08, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 15v-1"
						variants={drawVariants}
						custom={[0.16, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 21v-2"
						variants={drawVariants}
						custom={[0.24, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 5V3"
						variants={drawVariants}
						custom={[0, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 10V9"
						variants={drawVariants}
						custom={[0.08, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 15v-1"
						variants={drawVariants}
						custom={[0.16, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 21v-2"
						variants={drawVariants}
						custom={[0.24, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 5V3"
						variants={drawVariants}
						custom={[0, 1, 0.2]}
						initial="normal"
						animate={controls}
					/>
					<rect x="3" y="3" width="18" height="18" rx="2" />
				</svg>
			</div>
		);
	}
);

PanelLeftRightDashed.displayName = 'PanelLeftRightDashed';

export { PanelLeftRightDashed };
