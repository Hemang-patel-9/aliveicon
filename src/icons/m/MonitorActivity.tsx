'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const MonitorActivity = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 17v4"
						variants={drawVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 10h-2.315a1 1 0 00-.932.64l-.787 2.034a.5.5 0 01-.932 0l-2.068-5.348a.5.5 0 00-.932 0l-.787 2.035a1 1 0 01-.932.639H6"
						variants={drawVariants}
						custom={1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 21h8"
						variants={drawVariants}
						custom={2}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="2"
						y="3"
						width="20"
						height="14"
						rx="2"
						variants={drawVariants}
						custom={3}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

MonitorActivity.displayName = 'MonitorActivity';

export { MonitorActivity };
