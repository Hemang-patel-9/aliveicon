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
		transition: { duration: 0.3 },
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};

export const CircleFadingPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 2a10 10 0 0 1 7.38 16.75"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M12 8v8" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M16 12H8" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M2.5 8.875a10 10 0 0 0-.5 3"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M2.83 16a10 10 0 0 0 2.43 3.4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4.636 5.235a10 10 0 0 1 .891-.857"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8.644 21.42a10 10 0 0 0 7.631-.38"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CircleFadingPlus.displayName = 'CircleFadingPlus';
