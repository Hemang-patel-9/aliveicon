'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const cornerVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: ([dx, dy]: number[]) => ({
		x: [0, dx, 0],
		y: [0, dy, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	}),
};

const Expand = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m15 15 6 6"
						variants={cornerVariants}
						initial="normal"
						animate={controls}
						custom={[1, 1]}
					/>
					<motion.path
						d="m15 9 6-6"
						variants={cornerVariants}
						initial="normal"
						animate={controls}
						custom={[1, -1]}
					/>
					<motion.path
						d="M21 16v5h-5"
						variants={cornerVariants}
						initial="normal"
						animate={controls}
						custom={[1, 1]}
					/>
					<motion.path
						d="M21 8V3h-5"
						variants={cornerVariants}
						initial="normal"
						animate={controls}
						custom={[1, -1]}
					/>
					<motion.path
						d="M3 16v5h5"
						variants={cornerVariants}
						initial="normal"
						animate={controls}
						custom={[-1, 1]}
					/>
					<motion.path
						d="m3 21 6-6"
						variants={cornerVariants}
						initial="normal"
						animate={controls}
						custom={[-1, 1]}
					/>
					<motion.path
						d="M3 8V3h5"
						variants={cornerVariants}
						initial="normal"
						animate={controls}
						custom={[-1, -1]}
					/>
					<motion.path
						d="M9 9 3 3"
						variants={cornerVariants}
						initial="normal"
						animate={controls}
						custom={[-1, -1]}
					/>
				</svg>
			</div>
		);
	}
);

Expand.displayName = 'Expand';

export { Expand };
