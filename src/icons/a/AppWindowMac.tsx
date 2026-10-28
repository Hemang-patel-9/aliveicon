'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: { duration: 0.4 },
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: { duration: 0.6, ease: 'linear' },
	},
};

const dotVariants: Variants = {
	normal: { opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		opacity: [1, 0, 1],
		transition: { duration: 0.5, delay: 0.3 + i * 0.15, ease: 'easeInOut' },
	}),
};

const AppWindowMac = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						x="2"
						y="4"
						width="20"
						height="16"
						rx="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 8h.01"
						custom={0}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M10 8h.01"
						custom={1}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 8h.01"
						custom={2}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

AppWindowMac.displayName = 'AppWindowMac';

export { AppWindowMac };
