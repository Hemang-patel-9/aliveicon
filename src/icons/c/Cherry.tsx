'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const Cherry = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props, { rest: 'initial' });

		const pathVariants = {
			initial: { pathLength: 1 },
			animate: {
				pathLength: [0, 1],
				transition: { duration: 0.5, ease: 'easeInOut' },
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
					<motion.path
						d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
					<motion.path
						d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"
						variants={pathVariants}
						initial="initial"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Cherry.displayName = 'Cherry';
