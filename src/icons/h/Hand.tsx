'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const waveVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -14, 12, -6, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const Hand = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={waveVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					>
						<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
						<path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
						<path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
						<path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

Hand.displayName = 'Hand';

export { Hand };
