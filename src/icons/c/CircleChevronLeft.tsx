'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const CircleChevronLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { rest: 'initial' });

		const motionVariants = {
			initial: { x: 0 },
			animate: {
				x: [0, -4, -0],
				transition: {
					duration: 0.5,
					ease: 'easeInOut',
				},
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
					<circle cx="12" cy="12" r="10" />
					<motion.path
						d="m14 16-4-4 4-4"
						variants={motionVariants}
						initial="initial"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CircleChevronLeft.displayName = 'CircleChevronLeft';
