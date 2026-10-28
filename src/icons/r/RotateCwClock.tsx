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

const RotateCwClock = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M12 7v5l4 2" />
					<motion.g
						variants={spinCwVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '50%' }}
					>
						<path d="M16 8h5V3" />
						<path d="m21 8-2.3-2.3A9.7 9.7 0 0012 3a9 9 0 109 9" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

RotateCwClock.displayName = 'RotateCwClock';

export { RotateCwClock };
