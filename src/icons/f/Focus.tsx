'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const cornerVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: ([x, y]: [number, number]) => ({
		x: [0, x, 0],
		y: [0, y, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	}),
};

const Focus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.circle
						cx="12"
						cy="12"
						r="3"
						variants={popVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 7V5a2 2 0 0 1 2-2h2"
						variants={cornerVariants}
						custom={[0.8, 0.8]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17 3h2a2 2 0 0 1 2 2v2"
						variants={cornerVariants}
						custom={[-0.8, 0.8]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 17v2a2 2 0 0 1-2 2h-2"
						variants={cornerVariants}
						custom={[-0.8, -0.8]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 21H5a2 2 0 0 1-2-2v-2"
						variants={cornerVariants}
						custom={[0.8, -0.8]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Focus.displayName = 'Focus';

export { Focus };
