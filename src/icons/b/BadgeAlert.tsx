'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: { duration: 0.3, ease: 'easeInOut' },
	},
	animate: (delay: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: { duration: 0.6, ease: 'easeInOut', delay },
	}),
};

const tiltVariants: Variants = {
	normal: { rotate: 0 },
	animate: {
		rotate: [0, -3, 3, -2, 2, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const BadgeAlert = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={tiltVariants} initial="normal" animate={controls}>
						<motion.path
							d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
							custom={0}
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
						<motion.line
							x1="12"
							y1="8"
							x2="12"
							y2="12"
							custom={0.15}
							variants={pathVariants}
							initial="normal"
							animate={controls}
						/>
						<motion.line
							x1="12"
							y1="16"
							x2="12.01"
							y2="16"
							custom={0.25}
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

BadgeAlert.displayName = 'BadgeAlert';

export { BadgeAlert };
