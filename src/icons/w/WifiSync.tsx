'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const turn180Variants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 180],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const WifiSync = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g
						variants={turn180Variants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5" />
						<path d="M11.965 14.105h4" />
						<path d="M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5" />
						<path d="M21.965 22.105v-4" />
					</motion.g>
					<motion.path
						d="M2 8.82a15 15 0 0 1 20 0"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M5 12.86a10 10 0 0 1 3-2.032"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M8.5 16.429h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
				</svg>
			</div>
		);
	}
);

WifiSync.displayName = 'WifiSync';

export { WifiSync };
