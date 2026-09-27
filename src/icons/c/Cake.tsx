'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const Cake = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		const pathVariants = {
			normal: { pathLength: 1, opacity: 1 },
			animate: {
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					duration: 0.7,
					ease: 'easeInOut',
					staggerChildren: 0.08,
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
						d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M2 21h20" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M7 8v3" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M12 8v3" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M17 8v3" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M7 4h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M12 4h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M17 4h.01" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

Cake.displayName = 'Cake';
export { Cake };
