'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const slashVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.3, ease: 'easeInOut' },
	},
};

const BeefOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M11.771 6.109a2.5 2.5 0 0 1 3.12 3.12"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M17.852 12.185a6.5 6.5 0 0 0-9.035-9.04"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M18.013 18.013C15.029 20.349 10.831 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1-.139 4.393"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
					<motion.path
						d="m2 2 20 20"
						variants={slashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6.355 6.37a7 7 0 0 0-.075.23c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c3.356 0 6.993-1.267 9.85-3.151"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={4}
					/>
				</svg>
			</div>
		);
	}
);

BeefOff.displayName = 'BeefOff';

export { BeefOff };
