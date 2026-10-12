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

const upSmallVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const EarthLock = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M7 3.34V5a3 3 0 0 0 3 3"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M21.54 15H17a2 2 0 0 0-2 2v4.54"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<path d="M12 2a10 10 0 1 0 9.54 13" />
					<motion.path
						d="M20 6V4a2 2 0 1 0-4 0v2"
						variants={upSmallVariants}
						initial="normal"
						animate={controls}
					/>
					<rect width="8" height="5" x="14" y="6" rx="1" />
				</svg>
			</div>
		);
	}
);

EarthLock.displayName = 'EarthLock';

export { EarthLock };
