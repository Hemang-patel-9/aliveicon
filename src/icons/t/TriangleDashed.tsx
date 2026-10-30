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

const TriangleDashed = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10.17 4.193a2 2 0 0 1 3.666.013"
						variants={drawVariants}
						custom={[0, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 21h2"
						variants={drawVariants}
						custom={[0.24, 1, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m15.874 7.743 1 1.732"
						variants={drawVariants}
						custom={[0.06, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m18.849 12.952 1 1.732"
						variants={drawVariants}
						custom={[0.12, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21.824 18.18a2 2 0 0 1-1.835 2.824"
						variants={drawVariants}
						custom={[0.18, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4.024 21a2 2 0 0 1-1.839-2.839"
						variants={drawVariants}
						custom={[0.36, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m5.136 12.952-1 1.732"
						variants={drawVariants}
						custom={[0.42, 1, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 21h2"
						variants={drawVariants}
						custom={[0.3, 1, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m8.102 7.743-1 1.732"
						variants={drawVariants}
						custom={[0.48, 1, 0.25]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TriangleDashed.displayName = 'TriangleDashed';

export { TriangleDashed };
