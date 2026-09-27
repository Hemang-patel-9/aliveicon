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

export const CigaretteOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M18 8c0-2.5-2-2.5-2-5"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path d="m2 2 20 20" variants={pathVariants} animate={controls} initial="normal" />
					<motion.path
						d="M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M22 8c0-2.5-2-2.5-2-5"
						variants={pathVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path d="M7 12v4" variants={pathVariants} animate={controls} initial="normal" />
				</svg>
			</div>
		);
	}
);

CigaretteOff.displayName = 'CigaretteOff';
