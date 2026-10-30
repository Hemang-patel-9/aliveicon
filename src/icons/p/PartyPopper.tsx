'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const joltVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -8, 6, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

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

const PartyPopper = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g
						variants={joltVariants}
						style={{ originX: '0%', originY: '100%' }}
						initial="normal"
						animate={controls}
					>
						<path d="M5.8 11.3 2 22l10.7-3.79" />
						<path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
					</motion.g>
					<motion.path
						d="M4 3h.01"
						variants={popVariants}
						custom={0.46}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 8h.01"
						variants={popVariants}
						custom={0.38}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M15 2h.01"
						variants={popVariants}
						custom={0.3}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M22 20h.01"
						variants={popVariants}
						custom={0.54}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"
						variants={drawVariants}
						custom={[0.15, 1, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"
						variants={drawVariants}
						custom={[0.15, 1, 0.4]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"
						variants={drawVariants}
						custom={[0.15, 1, 0.4]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

PartyPopper.displayName = 'PartyPopper';

export { PartyPopper };
