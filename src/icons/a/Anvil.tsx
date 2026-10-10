'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const dropVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -3, 0, -1, 0],
		transition: { duration: 0.6, times: [0, 0.35, 0.6, 0.8, 1], ease: 'easeInOut' },
	},
};

const Anvil = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4"
						variants={dropVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z"
						variants={dropVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M9 12v5" variants={dropVariants} initial="normal" animate={controls} />
					<motion.path d="M15 12v5" variants={dropVariants} initial="normal" animate={controls} />
					<motion.path
						d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1"
						variants={dropVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Anvil.displayName = 'Anvil';

export { Anvil };
