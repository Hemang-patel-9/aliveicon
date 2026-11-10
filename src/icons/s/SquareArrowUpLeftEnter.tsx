'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { x: 0, y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		x: [3.5, 0],
		y: [3.5, 0],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeOut' },
	},
};

const SquareArrowUpLeftEnter = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M15.33 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10.33" />
					<motion.g variants={arrowVariants} initial="normal" animate={controls}>
						<path d="M17 11h-6v6" />
						<path d="m20 20-9-9" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

SquareArrowUpLeftEnter.displayName = 'SquareArrowUpLeftEnter';

export { SquareArrowUpLeftEnter };
