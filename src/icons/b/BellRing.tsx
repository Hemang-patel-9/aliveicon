'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const swingVariants: Variants = {
	normal: { rotate: 0 },
	animate: {
		rotate: [0, 12, -10, 8, -6, 4, 0],
		transition: { duration: 1, ease: 'easeInOut' },
	},
};

const ringVariants: Variants = {
	normal: { x: 0, opacity: 1 },
	animate: (direction: number) => ({
		x: [0, direction * 1.5, 0, direction * 1, 0, direction * 0.5, 0],
		opacity: [1, 0.8, 1, 0.9, 1, 0.85, 1],
		transition: { duration: 1, ease: 'easeInOut' },
	}),
};

const BellRing = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={swingVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '0%' }}
					>
						<path d="M10.268 21a2 2 0 0 0 3.464 0" />
						<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
					</motion.g>
					<motion.path
						d="M4 2C2.8 3.7 2 5.7 2 8"
						custom={1}
						variants={ringVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 8c0-2.3-.8-4.3-2-6"
						custom={-1}
						variants={ringVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BellRing.displayName = 'BellRing';

export { BellRing };
