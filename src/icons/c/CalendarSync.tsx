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

const rotateVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.3 } },
	animate: {
		rotate: [0, 15, -15, 0],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const CalendarSync = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M3 10h4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M8 2v4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.g variants={rotateVariants} initial="normal" animate={controls}>
						<motion.path
							d="M11 10v4h4"
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
						<motion.path
							d="m11 14 1.535-1.605a5 5 0 0 1 8 1.5"
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
						<motion.path
							d="m21 18-1.535 1.605a5 5 0 0 1-8-1.5"
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
						<motion.path
							d="M21 22v-4h-4"
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
					</motion.g>
				</svg>
			</div>
		);
	}
);

CalendarSync.displayName = 'CalendarSync';

export { CalendarSync };
