'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const BusFront = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					staggerChildren: 0.04,
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
					<motion.path d="M4 6 2 7" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M10 6h4" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="m22 7-2-1" variants={pathVariants} initial="normal" animate={controls} />
					<motion.rect
						width="16"
						height="16"
						x="4"
						y="3"
						rx="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M4 11h16" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M8 15h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M16 15h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M6 19v2" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M18 21v-2" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

BusFront.displayName = 'BusFront';
export { BusFront };
