'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chevronVariants: Variants = {
	normal: { x: 0, y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		x: [-1.5, 0],
		y: [0, 0],
		opacity: [0, 1],
		transition: { duration: 0.45, delay: i * 0.1, ease: 'easeOut' },
	}),
};

const CalendarChevronsRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h4" />
					<path d="M3 9h18" />
					<path d="M8 2v3" />
					<motion.path
						d="m19 21 3-3-3-3"
						custom={0}
						variants={chevronVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m13 21 3-3-3-3"
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

CalendarChevronsRight.displayName = 'CalendarChevronsRight';

export { CalendarChevronsRight };
