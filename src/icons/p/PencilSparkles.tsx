'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const writeVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -5, 4, -2, 0],
		transition: { duration: 0.7, ease: 'easeInOut' },
	},
};

const PencilSparkles = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					style={{ overflow: 'visible' }}
				>
					<motion.g variants={popVariants} custom={0.2} initial="normal" animate={controls}>
						<path d="M10 3H8" />
						<path d="M9 2v2" />
					</motion.g>
					<motion.g
						variants={writeVariants}
						style={{ originX: '0%', originY: '100%' }}
						initial="normal"
						animate={controls}
					>
						<path d="m15.007 5.008 3.987 3.986" />
						<path d="M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
					</motion.g>
					<motion.g variants={popVariants} custom={0.5} initial="normal" animate={controls}>
						<path d="M20 15v4" />
						<path d="M22 17h-4" />
					</motion.g>
					<motion.g variants={popVariants} custom={0.35} initial="normal" animate={controls}>
						<path d="M4 5v4" />
						<path d="M6 7H2" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

PencilSparkles.displayName = 'PencilSparkles';

export { PencilSparkles };
