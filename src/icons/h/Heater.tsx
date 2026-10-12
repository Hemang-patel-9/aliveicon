'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const riseVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		y: [0, -1, 0],
		transition: { duration: 0.5, delay: i * 0.12, ease: 'easeInOut' },
	}),
};

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const drawVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, delay: i * 0.1, ease: 'easeInOut' },
	}),
};

const Heater = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M11 8c2-3-2-3 0-6"
						variants={riseVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M15.5 8c2-3-2-3 0-6"
						variants={riseVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M6 10h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M6 14h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M10 16v-4"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M14 16v-4"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M18 16v-4"
						variants={drawVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<path d="M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" />
					<path d="M5 20v2" />
					<path d="M19 20v2" />
				</svg>
			</div>
		);
	}
);

Heater.displayName = 'Heater';

export { Heater };
