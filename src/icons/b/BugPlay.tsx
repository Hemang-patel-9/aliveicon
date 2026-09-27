'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const BugPlay = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					duration: 0.5,
					ease: 'easeInOut',
					staggerChildren: 0.05,
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
						d="M12.765 21.522a.5.5 0 0 1-.765-.424v-8.196a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.696z"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14.12 3.88 16 2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 11a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v3a6.1 6.1 0 0 0 2 4.5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20.97 5c0 2.1-1.6 3.8-3.5 4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 21c0-2.1 1.7-3.9 3.8-4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M6 13H2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M6.53 9C4.6 8.8 3 7.1 3 5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m8 2 1.88 1.88"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BugPlay.displayName = 'BugPlay';
export { BugPlay };
