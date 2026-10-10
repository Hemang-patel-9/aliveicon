'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const axesVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const dashVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.2, delay: 0.35 + i * 0.12, ease: 'easeOut' },
	}),
};

const Axis3d = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M13.5 10.5 15 9"
						variants={dashVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 4v15a1 1 0 0 0 1 1h15"
						variants={axesVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4.293 19.707 6 18"
						variants={dashVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m9 15 1.5-1.5"
						variants={dashVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Axis3d.displayName = 'Axis3d';

export { Axis3d };
