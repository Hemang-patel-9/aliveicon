'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const clefVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const dotVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [0.4, 1.6, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.35, delay: 0.55 + i * 0.12, ease: 'easeOut' },
	}),
};

const ClefBass = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M19 11h.01"
						custom={1}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 6h.01"
						custom={0}
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M5 8c0-4 4-4 4-4 6 0 6 6 6 6 0 7-10 11-10 11"
						variants={clefVariants}
						initial="normal"
						animate={controls}
					/>
					<circle cx="7" cy="8" r="2" />
				</svg>
			</div>
		);
	}
);

ClefBass.displayName = 'ClefBass';

export { ClefBass };
