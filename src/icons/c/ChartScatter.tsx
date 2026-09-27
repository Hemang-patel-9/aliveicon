'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const ChartScatter = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { rest: 'initial' });

		const pathVariants = {
			initial: { pathLength: 1 },
			animate: {
				pathLength: [0, 1],
				transition: { duration: 0.4, ease: 'easeInOut' },
			},
		};

		const dotVariants = {
			initial: { scale: 1, opacity: 1 },
			animate: {
				scale: [0, 1.2, 1],
				opacity: [0, 1],
				transition: { duration: 0.4, ease: 'easeOut' },
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
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.circle
						cx="7.5"
						cy="7.5"
						r="0.5"
						fill="currentColor"
						variants={dotVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.circle
						cx="18.5"
						cy="5.5"
						r="0.5"
						fill="currentColor"
						variants={dotVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.circle
						cx="11.5"
						cy="11.5"
						r="0.5"
						fill="currentColor"
						variants={dotVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.circle
						cx="7.5"
						cy="16.5"
						r="0.5"
						fill="currentColor"
						variants={dotVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.circle
						cx="17.5"
						cy="14.5"
						r="0.5"
						fill="currentColor"
						variants={dotVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="M3 3v16a2 2 0 0 0 2 2h16"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartScatter.displayName = 'ChartScatter';
