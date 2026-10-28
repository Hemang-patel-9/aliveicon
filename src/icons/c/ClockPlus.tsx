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
		transition: { duration: 0.35, delay: i * 0.15, ease: 'easeOut' },
	}),
};

const ClockPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 6v6l3.644 1.822"
						custom={0}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M16 19h6"
						custom={1}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 16v6"
						custom={2}
						variants={drawVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M21.92 13.267a10 10 0 1 0-8.653 8.653" />
				</svg>
			</div>
		);
	}
);

ClockPlus.displayName = 'ClockPlus';

export { ClockPlus };
