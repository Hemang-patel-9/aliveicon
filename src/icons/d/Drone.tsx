'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const hoverVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0, -0.5, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const Drone = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M10 10 7 7"
						variants={hoverVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m10 14-3 3"
						variants={hoverVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m14 10 3-3"
						variants={hoverVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m14 14 3 3"
						variants={hoverVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14.205 4.139a4 4 0 1 1 5.439 5.863"
						variants={hoverVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19.637 14a4 4 0 1 1-5.432 5.868"
						variants={hoverVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M4.367 10a4 4 0 1 1 5.438-5.862"
						variants={hoverVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9.795 19.862a4 4 0 1 1-5.429-5.873"
						variants={hoverVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.rect
						x="10"
						y="8"
						width="4"
						height="8"
						rx="1"
						variants={hoverVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Drone.displayName = 'Drone';

export { Drone };
