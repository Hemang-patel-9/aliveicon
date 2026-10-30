'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const clickVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, 1, 0, 1, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Pointer = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M22 14a8 8 0 0 1-8 8" />
					<path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
					<path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
					<motion.path
						d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"
						variants={clickVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
				</svg>
			</div>
		);
	}
);

Pointer.displayName = 'Pointer';

export { Pointer };
