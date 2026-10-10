'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -3, 0],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const topVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, 10, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const bottomVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -10, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const ArrowUp10 = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m3 8 4-4 4 4"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M7 4v16" />
					<motion.path d="M17 10V4h-2" variants={topVariants} initial="normal" animate={controls} />
					<motion.path d="M15 10h4" variants={topVariants} initial="normal" animate={controls} />
					<motion.rect
						x="15"
						y="14"
						width="4"
						height="6"
						ry="2"
						variants={bottomVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArrowUp10.displayName = 'ArrowUp10';

export { ArrowUp10 };
