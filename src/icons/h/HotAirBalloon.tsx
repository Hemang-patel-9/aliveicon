'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const floatVariants: Variants = {
	normal: { y: 0, rotate: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0],
		rotate: [0, -3, 2, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const HotAirBalloon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={floatVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					>
						<path d="M11.5 18C10 15 9 12 9 9a3 7 0 0 1 6 0c0 3-1 6-2.5 9" />
						<path d="M15 18c3-3 5-5 5-9A8 7 0 0 0 4 9c0 4 2 6 5 9" />
						<path d="M15 18H9v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1z" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

HotAirBalloon.displayName = 'HotAirBalloon';

export { HotAirBalloon };
