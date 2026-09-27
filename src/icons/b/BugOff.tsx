'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const BugOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2"
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
						d="M22 13h-4v-2a4 4 0 0 0-4-4h-1.3"
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
					<motion.path d="m2 2 20 20" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M12 20v-8" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M6 13H2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M3 21c0-2.1 1.7-3.9 3.8-4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BugOff.displayName = 'BugOff';
export { BugOff };
