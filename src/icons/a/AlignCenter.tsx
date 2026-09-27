'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathMotion = {
	normal: {
		translateX: 0,
	},
	animate: {
		translateX: [0, 3, -3, 2, -2, 0],
		transition: {
			ease: 'linear',
			duration: 1,
		},
	},
};

export const AlignCenter = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M17 12H7" variants={pathMotion} initial="normal" animate={controls} />
					<motion.path d="M19 18H5" animate={controls} initial="normal" />
					<motion.path d="M21 6H3" animate={controls} initial="normal" />
				</svg>
			</div>
		);
	}
);

AlignCenter.displayName = 'AlignCenter';
