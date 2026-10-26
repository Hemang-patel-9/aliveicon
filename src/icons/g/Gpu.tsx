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
		transition: { duration: 0.5, delay, ease: 'easeInOut' },
	}),
};

const Gpu = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M2 17h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2" />
					<path d="M2 21V3" />
					<motion.path
						d="M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="16"
						cy="11"
						r="2"
						variants={drawVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="8"
						cy="11"
						r="2"
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

Gpu.displayName = 'Gpu';

export { Gpu };
