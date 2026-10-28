'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const WrapText = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M16 16l-2 2 2 2"
						custom={0}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 12h15a3 3 0 1 1 0 6h-4"
						custom={1}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 18h7"
						custom={2}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 6h18"
						custom={3}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

WrapText.displayName = 'WrapText';

export { WrapText };
