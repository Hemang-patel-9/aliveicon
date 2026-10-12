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

const ringVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -12, 10, -6, 3, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const BellCheck = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={ringVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '0%' }}
					>
						<path d="M10.268 21a2 2 0 0 0 3.464 0" />
						<path d="M16.8607 4.4824A6 6 0 0 0 6 8C6 12.499 4.589 13.956 3.262 15.326" />
						<path d="M3.262 15.326A1 1 0 0 0 4 17H20A1 1 0 0 0 20.74 15.327C20.209 14.779 19.665 14.218 19.203 13.454" />
					</motion.g>
					<motion.path
						d="m15 8 2 2 4-4"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
				</svg>
			</div>
		);
	}
);

BellCheck.displayName = 'BellCheck';

export { BellCheck };
