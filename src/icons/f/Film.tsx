'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (delay: number) => ({
		scale: [0, 1.4, 1],
		opacity: [0, 1, 1],
		transition: { duration: 0.4, delay, ease: 'easeInOut' },
	}),
};

const drawVariants: Variants = {
	normal: { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: ([delay, from, duration]: [number, number, number]) => ({
		pathLength: [0, 1],
		pathOffset: [from, 0],
		opacity: [0, 1],
		transition: { duration, delay, ease: 'easeInOut' },
	}),
};

const Film = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<rect width="18" height="18" x="3" y="3" rx="2" />
					<path d="M7 3v18" />
					<motion.path
						d="M3 7.5h4"
						variants={popVariants}
						custom={0.1}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 12h18"
						variants={drawVariants}
						custom={[0, 0, 0.5]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M3 16.5h4"
						variants={popVariants}
						custom={0.2}
						initial="normal"
						animate={controls}
					/>
					<path d="M17 3v18" />
					<motion.path
						d="M17 7.5h4"
						variants={popVariants}
						custom={0.15}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M17 16.5h4"
						variants={popVariants}
						custom={0.25}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Film.displayName = 'Film';

export { Film };
