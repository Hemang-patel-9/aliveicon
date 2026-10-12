'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const upVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const IceCreamCone = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11" />
					<motion.path
						d="M17 7A5 5 0 0 0 7 7"
						variants={upVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"
						variants={upVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

IceCreamCone.displayName = 'IceCreamCone';

export { IceCreamCone };
