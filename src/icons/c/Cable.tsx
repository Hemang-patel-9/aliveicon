'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const Cable = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					duration: 0.6,
					ease: 'easeInOut',
					staggerChildren: 0.08,
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
						d="M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 21v-2h-4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M3 5h4V3" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Cable.displayName = 'Cable';
export { Cable };
