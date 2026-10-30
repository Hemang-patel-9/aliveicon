'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const TicTacToe = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<path d="M12 2v20" />
					<motion.path
						d="m21 16-5 5"
						variants={drawVariants}
						custom={[0.4, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m21 21-5-5"
						variants={drawVariants}
						custom={[0.48, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<path d="M22 12H2" />
					<motion.path
						d="M8 3 3 8"
						variants={drawVariants}
						custom={[0, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M8 8 3 3"
						variants={drawVariants}
						custom={[0.08, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="18.5"
						cy="5.5"
						r="2.5"
						variants={drawVariants}
						custom={[0.2, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="5.5"
						cy="18.5"
						r="2.5"
						variants={drawVariants}
						custom={[0.6, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TicTacToe.displayName = 'TicTacToe';

export { TicTacToe };
