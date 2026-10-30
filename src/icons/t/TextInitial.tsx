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

const TextInitial = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M15 5h6"
						variants={drawVariants}
						custom={[0.4, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 12h6"
						variants={drawVariants}
						custom={[0.48, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 19h18"
						variants={drawVariants}
						custom={[0.56, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12"
						variants={drawVariants}
						custom={[0, 0, 0.45]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3.92 10h6.16"
						variants={drawVariants}
						custom={[0.3, 0, 0.3]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TextInitial.displayName = 'TextInitial';

export { TextInitial };
