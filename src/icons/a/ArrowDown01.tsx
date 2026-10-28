'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const arrowVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: [0, 3, 0],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

const zeroVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: [0, 10, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const oneVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: [0, -10, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const ArrowDown01 = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m3 16 4 4 4-4"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M7 20V4" />
					<motion.rect
						x="15"
						y="4"
						width="4"
						height="6"
						ry="2"
						variants={zeroVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17 20v-6h-2"
						variants={oneVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M15 20h4" variants={oneVariants} initial="normal" animate={controls} />
				</svg>
			</div>
		);
	}
);

ArrowDown01.displayName = 'ArrowDown01';

export { ArrowDown01 };
