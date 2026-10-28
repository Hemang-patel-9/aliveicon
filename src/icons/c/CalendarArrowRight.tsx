'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 2, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const CalendarArrowRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M21 12.34V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7.35" />
					<path d="M3 9h18" />
					<motion.g variants={arrowVariants} initial="normal" animate={controls}>
						<path d="m18 21 3-3h-6" />
						<path d="m21 18-3-3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

CalendarArrowRight.displayName = 'CalendarArrowRight';

export { CalendarArrowRight };
