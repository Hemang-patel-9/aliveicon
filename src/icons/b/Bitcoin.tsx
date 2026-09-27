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
			duration: 0.6,
			ease: 'easeInOut',
			staggerChildren: 0.05,
		},
	},
};

export const Bitcoin = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M11.767 19.089L5.86 18.047"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M5.86 18.047l-.347 1.97"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M12.432 11.205c4.924.869 6.14-6.025 1.215-6.893"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M12.432 11.205l-3.94-.694"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M13.647 4.311L8.29 4.26"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M14.195 5.353l.348-1.97"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M7.48 20.364l3.126-17.727"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

Bitcoin.displayName = 'Bitcoin';
