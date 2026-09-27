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
		},
	},
};

export const BrickWall = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.rect
						x="3"
						y="3"
						width="18"
						height="18"
						rx="2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					{['M12 9v6', 'M16 15v6', 'M16 3v6', 'M3 15h18', 'M3 9h18', 'M8 15v6', 'M8 3v6'].map(
						(d, i) => (
							<motion.path
								key={i}
								d={d}
								variants={pathVariants}
								initial="normal"
								animate={controls}
							/>
						)
					)}
				</svg>
			</div>
		);
	}
);

BrickWall.displayName = 'BrickWall';
