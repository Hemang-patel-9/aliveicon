'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const upperVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -1, 0],
		y: [0, -1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const lowerVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		y: [0, 1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Crop = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M6 2v14a2 2 0 0 0 2 2h14"
						variants={upperVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 22V8a2 2 0 0 0-2-2H2"
						variants={lowerVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Crop.displayName = 'Crop';

export { Crop };
