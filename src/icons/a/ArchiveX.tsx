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

export const ArchiveX = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						x="2"
						y="3"
						width="20"
						height="5"
						rx="1"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="m9.5 17 5-5"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="m9.5 12 5 5"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArchiveX.displayName = 'ArchiveX';
