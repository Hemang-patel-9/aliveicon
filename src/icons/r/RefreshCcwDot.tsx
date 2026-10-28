'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const spinVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0 } },
	animate: {
		rotate: [0, 360],
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.6, delay: 0.8 + i * 0.1, ease: 'easeInOut' },
	}),
};

const dotVariants: Variants = {
	normal: { opacity: 1, scale: 1 },
	animate: {
		opacity: [0, 1],
		scale: [0, 1],
		transition: { duration: 0.3, delay: 1.7, ease: 'easeOut' },
	},
};

const RefreshCcwDot = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<motion.svg
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
					variants={spinVariants}
					initial="normal"
					animate={controls}
				>
					<motion.path
						d="M3 2v6h6"
						custom={0}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 12A9 9 0 0 0 6 5.3L3 8"
						custom={1}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M21 22v-6h-6"
						custom={2}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 12a9 9 0 0 0 15 6.7l3-2.7"
						custom={3}
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="12"
						cy="12"
						r="1"
						variants={dotVariants}
						initial="normal"
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

RefreshCcwDot.displayName = 'RefreshCcwDot';

export { RefreshCcwDot };
