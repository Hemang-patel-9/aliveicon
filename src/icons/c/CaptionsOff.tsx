'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

export const CaptionsOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.path
						d="M10.5 5H19a2 2 0 0 1 2 2v8.5"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M17 11h-.5" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="m2 2 20 20" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M7 11h4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M7 15h2.5" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

CaptionsOff.displayName = 'CaptionsOff';
