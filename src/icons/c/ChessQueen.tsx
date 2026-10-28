'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const ballVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [0.4, 1],
		opacity: [0, 1],
		transition: { duration: 0.4, delay: i * 0.12, ease: 'easeOut' },
	}),
};

const ChessQueen = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="m10.68 5.499-.996 4.982a.65.65 0 01-1.131.295L5.885 7.663" />
					<path d="m13.32 5.5.995 4.98a.65.65 0 001.131.296l2.668-3.113" />
					<path d="M20.428 8.952 17.5 18" />
					<path d="M4 20a2 2 0 012-2h12a2 2 0 012 2v1a1 1 0 01-1 1H5a1 1 0 01-1-1z" />
					<path d="M6.5 18 3.571 8.952" />
					<motion.circle
						cx="12"
						cy="4"
						r="2"
						custom={1}
						variants={ballVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="20"
						cy="7"
						r="2"
						custom={2}
						variants={ballVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="4"
						cy="7"
						r="2"
						custom={0}
						variants={ballVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChessQueen.displayName = 'ChessQueen';

export { ChessQueen };
