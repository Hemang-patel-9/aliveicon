'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const Building2 = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					staggerChildren: 0.03,
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
						d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M10 6h4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M10 10h4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M10 14h4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M10 18h4" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

Building2.displayName = 'Building2';
export { Building2 };
