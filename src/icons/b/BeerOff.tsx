'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

export const BeerOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: { duration: 0.8, ease: 'easeInOut' },
			},
		};

		return (
			<div className={className} style={{ width: size, height: size, ...style }} {...iconProps}>
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
					<motion.path d="M13 13v5" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M17 11.47V8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17 11h1a3 3 0 0 1 2.745 4.211"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="m2 2 20 20" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path
						d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M9 14.6V18" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

BeerOff.displayName = 'BeerOff';
