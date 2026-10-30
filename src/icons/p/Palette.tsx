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

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const Palette = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
						variants={drawVariants}
						custom={[0, 0, 0.5]}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="13.5"
						cy="6.5"
						r=".5"
						fill="currentColor"
						variants={popVariants}
						custom={0.41}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="17.5"
						cy="10.5"
						r=".5"
						fill="currentColor"
						variants={popVariants}
						custom={0.49}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="6.5"
						cy="12.5"
						r=".5"
						fill="currentColor"
						variants={popVariants}
						custom={0.25}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="8.5"
						cy="7.5"
						r=".5"
						fill="currentColor"
						variants={popVariants}
						custom={0.33}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Palette.displayName = 'Palette';

export { Palette };
