'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const downRightVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1.5, 0],
		y: [0, 1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const downLeftVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1.5, 0],
		y: [0, 1.5, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Drum = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m2 2 8 8"
						variants={downRightVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 2-8 8"
						variants={downLeftVariants}
						initial="normal"
						animate={controls}
					/>
					<ellipse cx="12" cy="9" rx="10" ry="5" />
					<path d="M7 13.4v7.9" />
					<path d="M12 14v8" />
					<path d="M17 13.4v7.9" />
					<path d="M2 9v8a10 5 0 0 0 20 0V9" />
				</svg>
			</div>
		);
	}
);

Drum.displayName = 'Drum';

export { Drum };
