'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const BedDouble = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: { duration: 0.7, ease: 'easeInOut' },
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
						d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M12 4v6" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M2 18h20" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

BedDouble.displayName = 'BedDouble';
