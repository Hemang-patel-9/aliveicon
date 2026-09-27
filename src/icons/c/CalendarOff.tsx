'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
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
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const CalendarOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 15.5V6a2 2 0 0 0-2-2H9.5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M16 2v4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M3 10h7" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M21 10h-5.5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M2 2l20 20" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

CalendarOff.displayName = 'CalendarOff';
