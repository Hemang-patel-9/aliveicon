'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const cornerVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: ([x, y]: [number, number]) => ({
		x: [0, x, 0],
		y: [0, y, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	}),
};

const growVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.08, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Fullscreen = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M3 7V5a2 2 0 0 1 2-2h2"
						variants={cornerVariants}
						custom={[-0.8, -0.8]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17 3h2a2 2 0 0 1 2 2v2"
						variants={cornerVariants}
						custom={[0.8, -0.8]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 17v2a2 2 0 0 1-2 2h-2"
						variants={cornerVariants}
						custom={[0.8, 0.8]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 21H5a2 2 0 0 1-2-2v-2"
						variants={cornerVariants}
						custom={[-0.8, 0.8]}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						width="10"
						height="8"
						x="7"
						y="8"
						rx="1"
						variants={growVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Fullscreen.displayName = 'Fullscreen';

export { Fullscreen };
