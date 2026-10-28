'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: {
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const scaleVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.3 } },
	animate: {
		scale: [1, 1.15, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const CalendarSearch = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M16 2v4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 22-1.875-1.875"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M3 10h18" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M8 2v4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.circle
						cx="18"
						cy="18"
						r="3"
						variants={scaleVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CalendarSearch.displayName = 'CalendarSearch';

export { CalendarSearch };
