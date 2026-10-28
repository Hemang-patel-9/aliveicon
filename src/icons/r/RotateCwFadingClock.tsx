'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const spinCwVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 360],
		transition: { duration: 0.9, ease: 'easeInOut' },
	},
};

const RotateCwFadingClock = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					style={{ overflow: 'visible' }}
				>
					<motion.g
						variants={spinCwVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M12 3a9.75 9.75 0 0 1 6.74 2.74" />
						<path d="M18.74 5.74 21 8" />
						<path d="M21 8V3" />
						<path d="M7.5 19.794c-6-3.464-6-12.124 0-15.588" />
						<path d="M7.5 4.206A9 9 0 0 1 12 3" />
						<path d="M14 20.775A9 9 0 0 1 12 21" />
						<path d="M19 17.656a9 9 0 0 1-1.5 1.456" />
						<path d="M21 12a9 9 0 0 1-.228 2" />
						<path d="M21 8h-5" />
					</motion.g>
					<path d="M12 7v5l4 2" />
				</svg>
			</div>
		);
	}
);

RotateCwFadingClock.displayName = 'RotateCwFadingClock';

export { RotateCwFadingClock };
