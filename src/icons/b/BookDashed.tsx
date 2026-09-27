'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: {
		pathLength: 1,
		pathOffset: 0,
		opacity: 1,
		transition: { duration: 0.4 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.7,
			ease: 'easeInOut',
		},
	},
};

export const BookDashed = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

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
					<motion.path d="M12 17h1.5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 22h1.5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M12 2h1.5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path
						d="M17.5 22H19a1 1 0 0 0 1-1"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M17.5 2H19a1 1 0 0 1 1 1v1.5"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M20 14v3h-2.5"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path d="M20 8.5V10" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M4 10V8.5" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path d="M4 19.5V14" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path
						d="M4 4.5A2.5 2.5 0 0 1 6.5 2H8"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M8 22H6.5a1 1 0 0 1 0-5H8"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

BookDashed.displayName = 'BookDashed';
