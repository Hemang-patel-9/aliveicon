'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const Bug = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M8 2l1.88 1.88"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14.12 3.88L16 2"
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
					<motion.path
						d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M12 20v-9" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M6.53 9C4.6 8.8 3 7.1 3 5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M6 13H2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M3 21c0-2.1 1.7-3.9 3.8-4"
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
					<motion.path d="M22 13h-4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M17.2 17c2.1.1 3.8 1.9 3.8 4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Bug.displayName = 'Bug';
export { Bug };
