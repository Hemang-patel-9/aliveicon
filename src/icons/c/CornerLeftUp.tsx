'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const shaftVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, ease: 'easeOut' },
	},
};

const headVariants: Variants = {
	normal: { x: 0, y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		y: [1.5, 0],
		opacity: [0, 1],
		transition: { duration: 0.35, delay: 0.25, ease: 'easeOut' },
	},
};

const CornerLeftUp = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M14 9 9 4 4 9"
						variants={headVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20 20h-7a4 4 0 0 1-4-4V4"
						variants={shaftVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CornerLeftUp.displayName = 'CornerLeftUp';

export { CornerLeftUp };
