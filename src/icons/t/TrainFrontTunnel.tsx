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

const TrainFrontTunnel = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M2 22V12a10 10 0 1 1 20 0v10" />
					<motion.g variants={chugVariants} initial="normal" animate={controls}>
						<path d="M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8" />
						<path d="M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z" />
					</motion.g>
					<motion.path
						d="M10 15h.01"
						variants={lightVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M14 15h.01"
						variants={lightVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="m9 19-2 3" />
					<path d="m15 19 2 3" />
				</svg>
			</div>
		);
	}
);

TrainFrontTunnel.displayName = 'TrainFrontTunnel';

export { TrainFrontTunnel };
