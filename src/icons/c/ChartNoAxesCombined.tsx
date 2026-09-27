'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const ChartNoAxesCombined = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { rest: 'initial' });

		const barVariants = {
			initial: (y1: number) => ({ y1, y2: 20 }),
			animate: (y1: number) => ({
				y1: [20, y1],
				y2: 20,
				transition: { duration: 0.5 },
			}),
		};

		const pathVariants = {
			initial: { pathLength: 1 },
			animate: {
				pathLength: [0, 1],
				transition: { duration: 0.6, ease: 'easeInOut' },
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
					<motion.line
						x1="12"
						x2="12"
						custom={16}
						variants={barVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.line
						x1="16"
						x2="16"
						custom={14}
						variants={barVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.line
						x1="20"
						x2="20"
						custom={10}
						variants={barVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.line
						x1="4"
						x2="4"
						custom={18}
						variants={barVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.line
						x1="8"
						x2="8"
						custom={14}
						variants={barVariants}
						initial="initial"
						animate={controls}
					/>

					<motion.path
						d="M22 3L13.354 11.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartNoAxesCombined.displayName = 'ChartNoAxesCombined';
