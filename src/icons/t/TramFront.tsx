'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const chugVariants: Variants = {
	normal: { y: 0, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0, -0.5, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const lightVariants: Variants = {
	normal: { y: 0, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		y: [0, -1, 0, -0.5, 0],
		opacity: [1, 0.2, 1, 0.2, 1],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const TramFront = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					<motion.g variants={chugVariants} initial="normal" animate={controls}>
						<rect width="16" height="16" x="4" y="3" rx="2" />
						<path d="M4 11h16" />
						<path d="M12 3v8" />
					</motion.g>
					<path d="m8 19-2 3" />
					<path d="m18 22-2-3" />
					<motion.path d="M8 15h.01" variants={lightVariants} initial="normal" animate={controls} />
					<motion.path
						d="M16 15h.01"
						variants={lightVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TramFront.displayName = 'TramFront';

export { TramFront };
