'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const bounceVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -3, 0, -1.5, 0],
		transition: { duration: 0.6, ease: 'easeOut' },
	},
};

const LockKeyhole = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={bounceVariants}
						style={{ originX: '50%', originY: '50%' }}
						initial="normal"
						animate={controls}
					>
						<circle cx="12" cy="16" r="1" />
						<rect x="3" y="10" width="18" height="12" rx="2" />
						<path d="M7 10V7a5 5 0 0 1 10 0v3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

LockKeyhole.displayName = 'LockKeyhole';

export { LockKeyhole };
