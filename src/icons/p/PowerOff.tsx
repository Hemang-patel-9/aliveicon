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

const PowerOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
						d="M18.36 6.64A9 9 0 0 1 20.77 15"
						variants={drawVariants}
						custom={[0, 0, 0.45]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M6.16 6.16a9 9 0 1 0 12.68 12.68"
						variants={drawVariants}
						custom={[0.1, 0, 0.45]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M12 2v4"
						variants={drawVariants}
						custom={[0.2, 0, 0.25]}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m2 2 20 20"
						variants={drawVariants}
						custom={[0.45, 0, 0.35]}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

PowerOff.displayName = 'PowerOff';

export { PowerOff };
