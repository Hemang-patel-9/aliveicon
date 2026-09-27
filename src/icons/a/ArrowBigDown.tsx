'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const groupVariants = {
	initial: { y: 0, scale: 1, opacity: 1 },
	animate: {
		y: [0, 4, 0],
		scale: [1, 1.1, 1],
		opacity: [1, 1, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const ArrowBigDown = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={groupVariants} initial="initial" animate={controls}>
						<path d="M15 6v6h4l-7 7-7-7h4V6h6z" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ArrowBigDown.displayName = 'ArrowBigDown';
