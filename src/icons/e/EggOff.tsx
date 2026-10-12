'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const slashVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: 0.3, ease: 'easeInOut' },
	},
};

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const EggOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="m2 2 20 20"
						variants={slashVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
				</svg>
			</div>
		);
	}
);

EggOff.displayName = 'EggOff';

export { EggOff };
