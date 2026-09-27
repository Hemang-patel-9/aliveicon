'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	initial: {
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
	},
	draw: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.7,
			ease: 'easeInOut',
		},
	},
};

export const Armchair = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { rest: 'initial' });

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
						d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path d="M5 18v2" variants={pathVariants} initial="initial" animate={controls} />
					<motion.path d="M19 18v2" variants={pathVariants} initial="initial" animate={controls} />
				</svg>
			</div>
		);
	}
);

Armchair.displayName = 'Armchair';
