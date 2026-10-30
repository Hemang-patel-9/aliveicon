'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const studVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		y: [0, -1.5, 0],
		transition: { duration: 0.45, delay, ease: 'easeInOut' },
	}),
};

const ToyBrick = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<rect width="18" height="12" x="3" y="8" rx="1" />
					<motion.path
						d="M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3"
						variants={studVariants}
						custom={0}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3"
						variants={studVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ToyBrick.displayName = 'ToyBrick';

export { ToyBrick };
