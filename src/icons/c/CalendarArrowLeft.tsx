'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, -2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const CalendarArrowLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M16 2v3" />
					<path d="M8 2v3" />
					<path d="M3 12.34V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-7.35" />
					<path d="M21 9H3" />
					<motion.g variants={arrowVariants} initial="normal" animate={controls}>
						<path d="M3 18h6" />
						<path d="m6 21-3-3 3-3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

CalendarArrowLeft.displayName = 'CalendarArrowLeft';

export { CalendarArrowLeft };
