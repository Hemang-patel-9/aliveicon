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

const squeezeVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.8, 1],
		transition: { duration: 0.35, ease: 'easeInOut' },
	},
};

const PerfumeBottle = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M 5 22 H 11.072" />
					<path d="M15 5 C 23 4 23.328 12.676 20 14.536" />
					<path d="M15.802 10.308 C 14.776 9.465 14 8.496 14 7" />
					<motion.path
						d="M2 2h.01"
						variants={popVariants}
						custom={0.28}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2 7h.01"
						variants={popVariants}
						custom={0.36}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 4.5h.01"
						variants={popVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<path d="M8.127 22 A 8 8 0 0 1 4 15 3 3 0 0 1 4.879 12.879C 6.879 10.879 10 10 10 7" />
					<motion.circle
						cx="18"
						cy="18"
						r="4"
						variants={squeezeVariants}
						initial="normal"
						animate={controls}
					/>
					<rect x="9" y="2" width="6" height="5" rx="1" />
				</svg>
			</div>
		);
	}
);

PerfumeBottle.displayName = 'PerfumeBottle';

export { PerfumeBottle };
