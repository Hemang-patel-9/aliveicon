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

const ringVariants: Variants = {
	normal: { rotate: 0, transition: { duration: 0.2 } },
	animate: {
		rotate: [0, -12, 10, -8, 6, 0],
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
};

const PhoneCall = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
					style={{ overflow: 'visible' }}
				>
					<motion.path
						d="M13 2a9 9 0 0 1 9 9"
						variants={drawVariants}
						custom={[0.2, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13 6a5 5 0 0 1 5 5"
						variants={drawVariants}
						custom={[0.1, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
						variants={ringVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

PhoneCall.displayName = 'PhoneCall';

export { PhoneCall };
