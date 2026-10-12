'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const squeezeVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 0.9, 1],
		transition: { duration: 0.45, ease: 'easeInOut' },
	},
};

const HandGrab = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						variants={squeezeVariants}
						initial="normal"
						animate={controls}
						style={{ originX: '50%', originY: '100%' }}
					>
						<path d="M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />
						<path d="M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
						<path d="M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" />
						<path d="M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
						<path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

HandGrab.displayName = 'HandGrab';

export { HandGrab };
