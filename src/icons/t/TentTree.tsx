'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pulseVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.25, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const swayVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -6, 4, -2, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const TentTree = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.circle
						cx="4"
						cy="4"
						r="2"
						variants={pulseVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.g
						variants={swayVariants}
						style={{ originX: '50%', originY: '100%' }}
						initial="normal"
						animate={controls}
					>
						<path d="m14 5 3-3 3 3" />
						<path d="m14 10 3-3 3 3" />
						<path d="M17 14V2" />
					</motion.g>
					<path d="M17 14H7l-5 8h20Z" />
					<path d="M8 14v8" />
					<path d="m9 14 5 8" />
				</svg>
			</div>
		);
	}
);

TentTree.displayName = 'TentTree';

export { TentTree };
