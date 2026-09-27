'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const rectPath = (x: number, y: number, width: number, height: number, rx: number) =>
	`M${x + rx},${y} ` +
	`h${width - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 ${rx},${rx} ` +
	`v${height - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 -${rx},${rx} ` +
	`h-${width - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 -${rx},-${rx} ` +
	`v-${height - 2 * rx} ` +
	`a${rx},${rx} 0 0 1 ${rx},-${rx} ` +
	'z';

export const BetweenHorizontalEnd = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: { duration: 1.2, ease: 'easeInOut' },
			},
		};

		const arrowVariants = {
			normal: { x: 0, opacity: 1 },
			animate: {
				x: [0, -5, 0, 5, 0],
				opacity: [1, 0.7, 1, 0.7, 1],
				transition: { duration: 2, ease: 'easeInOut' },
			},
		};

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
						d={rectPath(3, 3, 13, 7, 1)}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 15-3-3 3-3"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d={rectPath(3, 14, 13, 7, 1)}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BetweenHorizontalEnd.displayName = 'BetweenHorizontalEnd';
