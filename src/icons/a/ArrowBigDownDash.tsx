'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants = {
	initial: { y: 0, scale: 1 },
	animate: {
		y: [0, 4, 0],
		scale: [1, 1.1, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

const dashVariants = {
	initial: { x: 0, scale: 1 },
	animate: {
		y: [0, 2, 0],
		scale: [1, 1.1, 1],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
		},
	},
};

export const ArrowBigDownDash = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M15 5H9" variants={dashVariants} initial="initial" animate={controls} />
					<motion.path
						d="M15 9v3h4l-7 7-7-7h4V9z"
						variants={arrowVariants}
						initial="initial"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArrowBigDownDash.displayName = 'ArrowBigDownDash';
