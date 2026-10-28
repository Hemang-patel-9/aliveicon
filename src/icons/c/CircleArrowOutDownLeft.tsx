'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { x: 0, y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		x: [1.5, 0],
		y: [-1.5, 0],
		opacity: [0, 1],
		transition: { duration: 0.45, ease: 'easeOut' },
	},
};

const CircleArrowOutDownLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M2 12a10 10 0 1 1 10 10" />
					<motion.g variants={arrowVariants} initial="normal" animate={controls}>
						<path d="m2 22 10-10" />
						<path d="M8 22H2v-6" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

CircleArrowOutDownLeft.displayName = 'CircleArrowOutDownLeft';

export { CircleArrowOutDownLeft };
