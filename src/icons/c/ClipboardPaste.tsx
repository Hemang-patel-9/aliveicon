'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

export const ClipboardPaste = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path d="M11 14h10" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M16 4h2a2 2 0 0 1 2 2v1.344"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m17 18 4-4-4-4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="8"
						y="2"
						width="8"
						height="4"
						rx="1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ClipboardPaste.displayName = 'ClipboardPaste';
