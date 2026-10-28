'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chevronVariants: Variants = {
	normal: { x: 0, y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		x: [1.5, 0],
		y: [0, 0],
		opacity: [0, 1],
		transition: { duration: 0.45, delay: i * 0.1, ease: 'easeOut' },
	}),
};

const CalendarChevronsLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M21 9H3" />
					<path d="M3 11.5V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
					<path d="M8 2v3" />
					<motion.path
						d="m5 21-3-3 3-3"
						custom={0}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m11 21-3-3 3-3"
						custom={1}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CalendarChevronsLeft.displayName = 'CalendarChevronsLeft';

export { CalendarChevronsLeft };
