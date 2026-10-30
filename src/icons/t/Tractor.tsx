'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const driveVariants: Variants = {
	normal: { x: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const wheelVariants: Variants = {
	normal: { x: 0, y: 0, transition: { duration: 0.2 } },
	animate: {
		x: [0, 1, 0],
		y: [0, -0.75, 0, -0.4, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Tractor = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={driveVariants} initial="normal" animate={controls}>
						<path d="m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20" />
						<path d="M16 18h-5" />
						<path d="M18 5a1 1 0 0 0-1 1v5.573" />
						<path d="M3 4h8.129a1 1 0 0 1 .99.863L13 11.246" />
						<path d="M4 11V4" />
						<path d="M8 10.1V4" />
					</motion.g>
					<motion.path d="M7 15h.01" variants={wheelVariants} initial="normal" animate={controls} />
					<motion.circle
						cx="18"
						cy="18"
						r="2"
						variants={wheelVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.circle
						cx="7"
						cy="15"
						r="5"
						variants={wheelVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Tractor.displayName = 'Tractor';

export { Tractor };
