'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const flipVariants: Variants = {
	normal: { scaleX: 1, transition: { duration: 0.2 } },
	animate: {
		scaleX: [1, 0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Coins = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M13.744 17.736a6 6 0 1 1-7.48-7.48" />
					<path d="m6.134 14.768.866-.5 2 3.464" />
					<motion.g
						variants={flipVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M15 6h1v4" />
						<circle cx="16" cy="8" r="6" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Coins.displayName = 'Coins';

export { Coins };
