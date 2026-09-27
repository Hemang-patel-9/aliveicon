'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const Building = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						width="16"
						height="20"
						x="4"
						y="2"
						rx="2"
						ry="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 22v-4h6v4"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M8 6h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M16 6h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M12 6h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M12 10h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M12 14h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M16 10h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M16 14h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M8 10h.01" variants={pathVariants} initial="normal" animate={controls} />
					<motion.path d="M8 14h.01" variants={pathVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

Building.displayName = 'Building';
export { Building };
