'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chugVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0, -0.5, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const lightVariants: Variants = {
	normal: { y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0, -0.5, 0],
		opacity: [1, 0.2, 1, 0.2, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const TrainFront = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={chugVariants} initial="normal" animate={controls}>
						<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1" />
						<path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" />
					</motion.g>
					<motion.path d="m9 15-1-1" variants={lightVariants} initial="normal" animate={controls} />
					<motion.path
						d="m15 15 1-1"
						variants={lightVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="m8 19-2 3" />
					<path d="m16 19 2 3" />
				</svg>
			</div>
		);
	}
);

TrainFront.displayName = 'TrainFront';

export { TrainFront };
